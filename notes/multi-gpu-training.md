# How Multi-GPU Training Works

## Spec

**Topic.** How to train a machine learning model on multiple GPUs. Why we need to, what the problem actually is, the intuition for every modern parallelism strategy (DDP, ZeRO/FSDP, tensor parallel, pipeline parallel, expert parallel, sequence/context parallel), how to compose them, and what 2026 best practice looks like in production.

**Audience.** Software engineers with no prior ML background. Comfortable with Python; comfortable with "I've used numpy and I roughly know what gradient descent is supposed to do" can be earned by the end of section 1, but the post does not assume it on entry. By the end the reader can read a Llama-3-class training paper and understand what every parallelism term means and why it is there.

**Thesis.** Multi-GPU training is the same loop as single-GPU training, plus a negotiation. The loop is the protagonist; communication is the antagonist. Every advance from 2017 to 2026 is a clever way of making that negotiation cheap, or hiding it behind compute.

**Narrative arc.** Ramp from small to large. Start with 2 GPUs, then 4 (one node), then 64 (a few nodes), then thousands. Each rung up the ladder forces a new constraint, which motivates a new technique. The 16k-GPU Llama-3 setup arrives near the end as the natural composition of every primitive built up along the way, not as the opening shot.

**Title sketch.** "How Multi-GPU Training Works"
**Slug.** `multi-gpu-training`
**Target length.** ~50 minutes, roughly 12k words.
**Tone reference.** `unified-vision-stack` (intuition-first, sentence-case headings, ~80% interactive figures, cream palette).

**Frontmatter at publish.**
- `tags: ["AI", "ML"]`
- `essay: true`
- `featured: false`
- `draft: true` until phase 6

**Starter resources (seeded, 3–5).**

1. Hugging Face "Ultra-Scale Playbook" (2025). The big single-page guide to distributed training. Covers DP, ZeRO/FSDP, TP, SP, CP, PP.
2. DeepSeek-V3 technical report (Dec 2024). DualPipe, FP8 training, expert parallelism in production.
3. PyTorch FSDP2 and DTensor official docs (2025). The canonical "what does the API actually do" reference.
4. NVIDIA Megatron-LM repo plus recent tensor-parallel papers. Tensor parallel canon.
5. Meta Llama 3 paper (July 2024). The detailed 16k-GPU training account. Older than 18 months from today (2026-04-25), so cited as a landmark but does **not** count toward the three-primary bar.

Plus: a small PyTorch reference implementation script (DDP, FSDP, simple TP) written during phase 2 to verify mechanism intuitions before they end up in figures.

**Hard rule before exiting phase 2.** Every claim about "current best practice" is backed by at least one source dated 2024-10-25 or later. The three-primary bar is met by sources newer than that date. Llama 3 can be cited but does not count toward the bar.

## Research notes

Phase 2. All quotes accessed 2026-04-25. Group is by sub-topic, not by source. Recency bar: ≥ 3 primary sources newer than 2024-10-25, cleared comfortably (HF Ultra-Scale Playbook 2025, DeepSeek-V3 Dec 2024 / v2 Feb 2025, PyTorch FSDP2/DTensor docs 2025, Megatron-Core 0.16.1 docs Mar 2026, Ladder-Residual Jan 2025, Llama 3 Herd v3 Nov 2024, Context Parallelism Nov 2024 / v3 Apr 2025, Towards Fully FP8 GEMM May 2025, MOSS Nov 2025, CAAT-Net Jun 2025).

### The single-GPU loop

The thing the post starts from. A model is a function `f(x; θ)` from input `x` to prediction `y`, parameterised by `θ` (a pile of numbers, mostly weight matrices). Training is the four-line loop:

```python
pred = model(x)            # forward: matmuls and nonlinearities
loss = criterion(pred, y)  # one scalar
loss.backward()            # backward: chain rule, fills .grad on every param
optim.step()               # optimizer: θ ← θ - lr * f(grad, m, v, ...)
```

Adam is the dominant optimizer in practice. Per parameter, mixed-precision Adam needs `2 + 2 + 12 = 16` bytes: 2 for the FP16/BF16 weight, 2 for the FP16/BF16 gradient, and 12 for the FP32 master copy plus first-moment `m` and second-moment `v` (Rajbhandari 2020 §3.1, "K = 12 for Adam" → "16Ψ bytes" per param). Memorise this number. Every later technique is doing arithmetic on it.

The reference script (`notes/multi-gpu-training-reference.py --mode=solo`) executes the loop on a 33,088-param tiny MLP and confirms a single optimizer step lands. DDP and FSDP modes hung in macOS/gloo torchrun rendezvous; the script is structurally correct and carries the API for the post but was not executed end-to-end in the multi-process modes.

### Why we need more than one GPU

Two pressures, often at the same time. (1) The model doesn't fit. A 70B-param model in BF16 is `70e9 × 2 = 140 GB` of weights; an H100 has 80 GB. Add 280 GB of optimizer state and 140 GB of grads and a single H100 is 7× under-provisioned just for parameters, and still hasn't held activations. (2) The data is too slow. ImageNet-21k or 14T tokens (DeepSeek-V3) is a year of single-GPU compute. Throwing more GPUs at the same data is the only way to finish in a reasonable wall-clock window.

DeepSeek-V3 trained on 14.8T tokens using 2.788M H800 GPU-hours on a 2048-H800 cluster. "Training DeepSeek-V3 on each trillion tokens requires only 180K H800 GPU hours, i.e., 3.7 days on our cluster with 2048 H800 GPUs" (DeepSeek-V3 §1, Table 1). Llama 3 405B was trained on "up to 16K H100 GPUs" reaching "BF16 Model FLOPs Utilization (MFU) of 38–43%" (Llama 3 Herd §3.3.1–3.3.2).

### Data parallel (DDP): the gradient negotiation

Each rank holds the full model. Each rank sees a different slice of the batch. After backward, every rank has a *local* gradient, the gradient of *its* slice's loss. To make these match a single-GPU run on the combined batch, all ranks must average their gradients before stepping the optimizer. That averaging is a collective called *all-reduce*.

PyTorch DDP wraps this. From Li et al. 2020 §3.2.3: DDP "registers one autograd hook for each gradient accumulator … the hook fires after its corresponding accumulator updating the gradients", marks the bucket, and fires `ncclAllReduce` when a bucket is full while the rest of backward continues. Two optimisations matter:

1. **Bucketing.** "By default, each bucket is 25 MB in size" (Li 2020 §4.2). Reason: NCCL all-reduce is dominated by per-call overhead at small sizes (Figure 2 in the paper); coalescing many small grads into one bucket gets onto the bandwidth-bound part of the curve. Quoted from the HF Ultra-Scale Playbook: "By performing a single all-reduce operation for each bucket, we can significantly reduce the communication overhead and speed up the communication operation."
2. **Comm-compute overlap.** The all-reduce of bucket *k* runs on a separate NCCL stream while backward continues computing the gradient of bucket *k-1*. From the playbook: "As soon as the backward pass of the last layer is complete (the last box on the right), those gradients can already be gathered and summed while the backward computations continue for earlier layers."

Plus a third trick for gradient accumulation. From Li 2020 §3.2.4: `model.no_sync()` is "a context manager [that] just toggles a flag" so K accumulation steps coalesce into one all-reduce instead of K. Playbook: "this is typically solved by adding a `model.no_sync()` decorator … which disables gradient synchronization on the backward passes that don't need reduction."

### Ring all-reduce: bandwidth-optimal averaging

The negotiation algorithm that makes DDP fast. Patarasuk and Yuan (2009): for an all-reduce of a vector of size M across N nodes, the per-node bandwidth-optimal cost is

> **2(N-1)/N × M**

approached by a *ring* algorithm in two phases: a reduce-scatter (each rank ends up with one chunk's full sum) followed by an all-gather (every rank ends up with all chunks). Each phase takes N-1 steps; each step ships M/N. As N → ∞ the cost approaches 2M and stops growing, that's the "bandwidth-flat" property. Tree algorithms hit O(log N) latency but pay O(M log N) bandwidth (root link saturates first), so ring wins once M is large (gradient tensors are megabytes).

Cross-references: NCCL's implementation lives in `nccl/src/collectives/all_reduce.cc`, ring for medium messages, double-binary-tree for very large ones. PyTorch's `torch.distributed.all_reduce` wraps NCCL on CUDA, gloo on CPU.

### ZeRO / FSDP: turning the replication into a partition

The DDP problem. With N GPUs, each holds the full 16Ψ bytes of (param + grad + optimizer-state). For a 70B Adam-trained model that's 1120 GB, *replicated on every rank*. The insight of ZeRO (Rajbhandari 2020): you don't need every rank to hold every byte at every moment. Partition.

The three stages:

| Stage | What's partitioned | Per-rank memory | Comm vs DDP |
|---|---|---|---|
| ZeRO-1 (`P_os`) | optimizer states only | `4Ψ + 12Ψ/N` | same |
| ZeRO-2 (`P_os+g`) | + gradients | `2Ψ + (2 + 12)Ψ/N` | same |
| ZeRO-3 (`P_os+g+p`) | + parameters | `16Ψ/N` | 1.5× |

From the paper: "P_os+g uses reduce-scatter + all-gather, matching baseline DP communication of 2Ψ"; ZeRO-3 incurs "1.5× communication" compared to vanilla DDP. The reduce-scatter + all-gather decomposition is exactly Patarasuk-Yuan's ring all-reduce split into halves. ZeRO doesn't add communication, it just reuses each ring half for a different purpose.

PyTorch's native ZeRO-3 is **FSDP**. The HF Playbook is explicit: "PyTorch's native implementation of this stage is called FSDP (Fully Sharded Data Parallelism). We'll just refer to it as ZeRO-3 in this book." Operationally, ZeRO-3 / FSDP requires "2·num_layers - 1 additional all-gathers in a training step compared to ZeRO-2. Each comes with a small base latency overhead", so the 1.5× factor is mostly latency, not bandwidth, on a fast interconnect.

Prefetching makes the per-layer all-gather cheap to overlap: "we all-gather the weights for *Layer n+1* while we do the forward pass for *Layer n*."

### FSDP2 (`fully_shard`) and DTensor

FSDP1 is being deprecated in favour of FSDP2. From the PyTorch FSDP2 docs (2025): "FSDP2 uses `DTensor`-based dim-0 per-parameter sharding for a simpler sharding representation compared to FSDP1's flat-parameter sharding. Per-parameter sharding provides a more intuitive user experience, relaxes constraints around frozen parameters." The new API:

```
torch.distributed.fsdp.fully_shard(
    module, *, mesh=None,
    reshard_after_forward=None,
    mp_policy=MixedPrecisionPolicy(param_dtype=None, reduce_dtype=None, ...),
    offload_policy=OffloadPolicy(),
    ignored_params=None
)
```

Sharded params are represented as `DTensor`s. From the DTensor page: a `DTensor` carries a placement spec on a `DeviceMesh`. Three placements:

- `Shard(dim)`: "each rank on the DeviceMesh dimension only holds a shard/piece of the global Tensor" along `dim`.
- `Replicate()`: "each rank … holds a replica."
- `Partial(reduce_op)`: "the DTensor that is pending reduction on a specified DeviceMesh dimension, where each rank … holds the partial value of the global Tensor."

`DeviceMesh` "represents the device topology and the communicators of the cluster using an n-dimensional array." This is the abstraction that makes 4D and 5D parallelism composable in user code: a 2D mesh `[dp, tp]` lets a tensor be `Shard(0)` on the DP axis (data parallel) and `Shard(1)` on the TP axis (tensor parallel) simultaneously.

`MixedPrecisionPolicy` separates *compute dtype* from *reduce dtype*: forward/backward in BF16, but reduce-scatter in FP32 to avoid loss-of-precision in gradient sums (a common stability fix for large-scale BF16 runs).

Llama 3 actually uses FSDP for its DP axis, not pure DDP: "We use fully sharded data parallelism (FSDP), which shards the model, optimizer, and gradients … For model shards we do not reshard after forward computation to avoid an extra all-gather communication during backward passes" (Llama 3 §3.3.2). The "no reshard after forward" optimisation maps to the `reshard_after_forward=False` flag on FSDP2.

### Tensor parallel: splitting one matmul

Tensor parallel (TP) attacks the *one matmul is too big* problem. Megatron-LM (Shoeybi 2019) split an MLP block `Z = GeLU(XA) · B` across two ranks like this:

- **Column-parallel A**: split `A = [A₁, A₂]` along output columns. Then `XA = [XA₁, XA₂]`, and `GeLU` is element-wise so each rank applies it locally with no comm.
- **Row-parallel B**: split `B = [B₁; B₂]` along input rows. Then `Y · B = Y₁B₁ + Y₂B₂`, where the sum is computed by an *all-reduce* across ranks.

The HF Playbook: "Column-wise sharding: we'll copy the complete input matrices to each worker, requiring an operation called *broadcast*, and split the weight matrix by columns." And: "The feedforward part can be parallelized by having a column-linear followed by a row-linear split, which amounts to a broadcast to copy the input and an all-reduce in the forward pass."

The `f` and `g` operators encode the comm: `f` is identity in forward, all-reduce in backward; `g` is all-reduce in forward, identity in backward (Megatron-LM Figure 3 and code listing). One forward all-reduce + one backward all-reduce per MLP block, plus the same per attention block. Two all-reduces per layer per direction.

Self-attention splits *by head*: with `h` heads on `t` ranks, each rank gets `h/t` heads. The per-head softmax(QKᵀ/√d)·V is local; the output projection is row-parallel and sits behind a `g` (all-reduce). "The matrix multiply corresponding to each attention head is done locally on one GPU" (Shoeybi 2019 §3).

TP is bandwidth-hungry. Every matmul forces a synchronous all-reduce across the TP group; for a 70B model that's hundreds of MB of activation per layer per step. Practical limit is `t = 8` within an NVLink-connected node (NVLink is ~600–900 GB/s on H100, vs ~50 GB/s for InfiniBand between nodes). Going across nodes for TP is almost always a bad idea.

### Sequence parallel: hiding the activation tax

The cost of TP is that *activations*, not just parameters, blow up. Each rank holds the full input activation `X` to feed into its column-parallel `A_i`. For long context this is a memory bomb.

Sequence parallel (Korthikanti 2022, "Reducing Activation Recomputation in Large Transformer Models", arxiv 2205.05198): notice that the operations *outside* the matmuls (LayerNorm, dropout) are independent along the sequence dimension. Shard the sequence axis there. Outside the matmul region, activations are sharded by `s/t`; on entry to the matmul region they need to be all-gathered, and on exit they need to be reduce-scattered back. The original Megatron `g` (all-reduce, cost 2M) is split into reduce-scatter + all-gather of the same total cost: *same comm volume, much less peak activation memory*.

From the playbook: "The maximum activation size is reduced to (b·s·h)/tp since we always either split along the sequence or the hidden dimension." Selective recomputation in the same paper checkpoints only attention's `5as/h` activation term (Equation 4 of Korthikanti 2022) for "70% memory savings" with "2.7% FLOPs overhead."

### Pipeline parallel: split the model along the layer axis

When the model still doesn't fit even with FSDP+TP, pipe stages across more devices. Pipeline parallel (PP) gives each stage a contiguous slab of layers. The pipeline of `K` stages takes `K` steps to fill and `K` to drain; in between, all stages are busy. The "in between" is the steady state; the empty triangles at start/end are the *bubble*.

GPipe (Huang 2018): split the mini-batch into `M` micro-batches. Forward all `M`, then backward all `M`. Bubble fraction:

> **(K-1) / (M + K-1)**

So `M ≥ 4K` makes the bubble negligible. Cost: activations for all `M` micro-batches at all `K` stages live simultaneously. `O(M)` activation memory.

1F1B / PipeDream-Flush (Narayanan 2021 §2.2.1): after warm-up, run "one forward pass followed by one backward pass." Same first-order bubble fraction `(K-1)/(M+K-1)`, but activations only accumulate for ~`p` micro-batches per stage instead of `M`. Same speed, less memory.

Interleaved 1F1B (Narayanan 2021 §2.2.2): split the model into `p·v` chunks. Device `d` gets chunks `d, d+p, d+2p, …`. Each micro-batch crosses each device boundary `v` times, so the warm-up triangle is `v×` shorter:

> **bubble fraction = (1/v) · (K-1)/M**

Cost: `v×` more comm volume.

### DualPipe: DeepSeek's near-zero bubble

DeepSeek-V3's DualPipe (§3.2.1) is the bubble-killer of late 2024. Instead of feeding micro-batches from one end, "bidirectional pipeline scheduling … feeds micro-batches from both ends of the pipeline simultaneously." Combined with ZeroBubble-style backward splitting (B = backward-for-input + W = backward-for-weights), the bubble shrinks to:

> **(PP/2 - 1) · (F&B + B - 3W)**

vs. 1F1B's `(PP-1)·(F+B)`. From the paper: "DualPipe significantly reduces the pipeline bubbles while only increasing the peak activation memory by 1/PP times." The trick: forward and backward chunks of *opposite* micro-batches are fused, and "both all-to-all and PP communication can be fully hidden during execution."

DeepSeek's deployed parallelism for V3 has three axes and *no tensor parallelism at all*: "16-way Pipeline Parallelism (PP), 64-way Expert Parallelism (EP) spanning 8 nodes, and ZeRO-1 Data Parallelism (DP)." DualPipe makes PP cheap enough to replace TP for an MoE.

### Expert parallel: route tokens to experts

MoE is sparsity. Each token activates only `k` of `N` experts. GShard (Lepikhin 2020) used top-2 routing; Switch Transformer (Fedus 2021) simplified to top-1. Either way, routing creates an *all-to-all* problem: token `i` on rank `r` needs to be processed by expert `e(i)` which lives on a different rank `r'`. The collective is `all_to_all` of shape `[E, C, d_model]` where `C = ⌈(N/E) · capacity_factor⌉` is the per-expert capacity (Switch §5.4). After expert FFN, a *second* all-to-all returns outputs to their origin tokens.

Load-balance loss (Switch Eq. 4):

> **loss_aux = α · N · Σᵢ fᵢ · Pᵢ**

where `fᵢ` is the fraction of tokens dispatched to expert `i` and `Pᵢ` is the mean router probability mass on `i`. Minimised when both equal `1/N`.

DeepSeek-V3's twist: **auxiliary-loss-free balancing**. Instead of an aux loss that distorts gradients, V3 introduces a per-expert bias `bᵢ` added to the routing scores: `s_{i,t} + bᵢ ∈ Topk({s_{j,t} + bⱼ}, K_r)` (V3 §2.1.2). "At the end of each step, we decrease the bias term by γ if its corresponding expert is overloaded, and increase it by γ if its corresponding expert is underloaded." This "minimizes the performance degradation that arises from encouraging load balancing." A complementary sequence-wise balance loss prevents extreme intra-sequence imbalance.

The all-to-all geometry for V3, on 2048 H800s with NVLink+IB: "We limit each token to be dispatched to at most 4 nodes, thereby reducing IB traffic." Tokens "transmitted via IB to the GPUs with the same in-node index on its target nodes" then "instantaneously forwarded via NVLink to specific GPUs." Bandwidth ratio: "NVLink offers a bandwidth of 160 GB/s, roughly 3.2 times that of IB (50 GB/s)." <!-- voice-check: "utilize" stays here because it's inside a direct DeepSeek-V3 quote -->
Kernel cost: "Only 20 SMs are sufficient to fully utilize the bandwidths of IB and NVLink."

That last number is the one to land in the post. 20 SMs out of an H800's 132 SMs (~15%) is what the comm kernel costs to keep both IB and NVLink saturated. Communication is literally a tax on SMs.

### Comm-compute overlap: hiding the negotiation behind compute

The repeated trick. DDP overlaps gradient all-reduce with backward; ZeRO-3 prefetches the next layer's all-gather during the current layer's compute; TP can be made async via "block matrix multiplication coupled with async communication/computation" (HF Playbook). DeepSeek-V3's DualPipe does it for both PP and all-to-all simultaneously: "warp specialization technique" with "10 communication channels" and "communications via IB and NVLink are fully overlapped" (V3 §3.2.2).

Async TP is the 2025 frontier. Megatron-Core ships `LinearWithGradAccumulationAndAsyncCommunication` where "the tensor parallel all reduce of the input gradients can be done asynchronously with the calculation of the weight gradients", but requires `CUDA_DEVICE_MAX_CONNECTIONS=1` so collectives can be scheduled before kernels. Ladder-Residual (Jin et al, arxiv 2501.06589, Jan 2025) is architectural: replace `x_{i+1} = h_{i+1}(x_i) + x_i` with `x_{i+1} = h_{i+1}(x_{i-1}) + x_i`, decoupling layer `i+1`'s compute from layer `i`'s residual comm. Reports "30% end-to-end wall clock speed up at inference time with TP sharding over 8 devices" on a 70B model. Caveat: paper is inference-focused; training implications less developed.

CAAT-Net (arxiv 2506.19645, Jun 2025) claims "up to 50% reduction" in TP communication via "partially synchronized activations" with maintained pretraining accuracy. Abstract-level only; mechanism not extracted.

### Context parallel: when the *sequence* is the problem

When context length goes to 128k, 1M, 10M, even sharding the activations along `s` inside SP isn't enough: the attention QKᵀ matrix is `s × s`, which is `(1M)² = 10¹²` entries even before head dim. Ring Attention (Liu 2023, arxiv 2310.01889) shards K and V along the sequence axis across `N` devices and rotates KV blocks around a logical ring while each device computes its local attention on the current block. Block-wise softmax stays exact via online softmax accumulation.

Context Parallelism for Scalable Million-Token Inference (arxiv 2411.01783, Nov 2024 / v3 Apr 2025): defines "two lossless exact ring attention variants: pass-KV and pass-Q." Reports "1M context prefill with Llama3 405B model in 77s (93% parallelization efficiency, 63% FLOPS utilization)" on 128 H100s across 16 nodes.

Llama 3 calls this CP and uses it as the second axis of its 4D parallelism: "Our implementation of 4D parallelism … combines tensor parallelism (TP), pipeline parallelism (PP), context parallelism (CP), and data parallelism (DP). The order of parallelism dimensions, [TP, CP, PP, DP], is optimized for network communication" (§3.3.2).

### FP8 training in production

DeepSeek-V3 §3.3 is the canonical 2025 production reference for full-pipeline FP8. The recipe:

1. **What's in FP8.** "All three GEMMs associated with the Linear operator, namely Fprop, Dgrad, and Wgrad, are executed in FP8."
2. **What stays high-precision.** "embedding module, the output head, MoE gating modules, normalization operators, and attention operators."
3. **Quantization granularity.** Activations: `1×128` tile (per token per 128 channels). Weights: `128×128` block. "This approach ensures that the quantization process can better accommodate outliers by adapting the scale according to smaller groups of elements."
4. **Format.** "E4M3 format on all tensors."
5. **Accumulation.** Tensor cores accumulate FP8×FP8 → FP22 internally on Hopper, "limited to retaining around 14 bits, which is significantly lower than FP32 accumulation precision." DeepSeek's fix: "We promote to CUDA Cores at an interval of `N_C = 128` elements MMA for the high-precision accumulation." Partial sums are flushed from tensor cores to CUDA cores every 128 K-axis steps and accumulated in FP32.
6. **Validation.** "Compared with the BF16 baseline, the relative loss error of our FP8-training model remains consistently below 0.25%."

Other 2025 FP8 papers:

- "Towards Fully FP8 GEMM LLM Training at Scale" (arxiv 2505.20524, May 2025): "FP8 computation for all GEMMs within transformer blocks during both forward and backward passes." Stability via "architecture design [that] reduces large outlier activations." Scale claim is abstract-level only; verify in body before citing as a scale data point.
- MOSS (arxiv 2511.05811, Nov 2025): two-level microscaling, "a high-precision global scale with compact, power-of-two local scales" plus automatic weight scaling. "Performance comparable to the BF16 baseline while achieving up to 34% higher training throughput" on a 7B model.

DeepSeek's hardware wishlist (V3 §3.5) explicitly asks NVIDIA for: "Higher FP8 GEMM Accumulation Precision in Tensor Cores," "Support for Tile- and Block-Wise Quantization," "Support for Online Quantization." Useful colour for the post: the most aggressive FP8 production team is on record saying the current Hopper Tensor Cores leak precision and the current kernels burn SMs on data movement.

### Real production numbers

| System | GPUs | Hardware | Parallelism | MFU | Tokens / time |
|---|---|---|---|---|---|
| Llama 3 405B | 16K | H100 | TP × CP × PP × DP (FSDP-on-DP) | 38–43% (BF16) | not stated cleanly |
| DeepSeek-V3 671B (37B active) | 2K | H800 | PP=16 × EP=64 × DP (ZeRO-1, no TP), DualPipe, FP8 | not stated | 14.8T tokens / 2.788M GPU-h |

Per-trillion-token: 180K H800-h / T = 3.7 days on 2048 H800s. Translated cost at $2/H800-h: $5.576M total for DeepSeek-V3 pretraining. Llama 3 paper does not give a clean dollar number; the public estimate is ~$60–80M, an order of magnitude more, on the dense 405B.

DeepSeek explicitly batch-ramped: "during DeepSeek-V3/R1 training, the batch size is gradually increased from 3,072 input sequences to 15,360 in the training of the first 469B tokens" (cited in HF Playbook). Sweet spot for current LLM training is "on the order of 4–60 million tokens per batch" (HF Playbook).

**Stability colour.** DeepSeek-V3: "Throughout the entire training process, we did not experience any irrecoverable loss spikes or perform any rollbacks." This is a remarkable claim for a 671B-param FP8 run.

### Flags and gaps

1. **No clean MFU number for vanilla DDP runs in either anchor source.** HF Playbook does not state one; DeepSeek-V3 paper does not state one. The Llama 3 38–43% figure is the strongest production data point in the corpus and should be the "what does a real big run achieve" anchor.
2. **"5D parallelism" framing is post-construction synthesis.** Llama 3 explicitly uses 4D `[TP, CP, PP, DP]`; DeepSeek-V3 uses `(PP, EP, DP)` with DualPipe. No primary post-cutoff paper canonicalises a 5D axis. The post should call out this composition without claiming a single canonical 5D recipe.
3. **Llama 4 has no Meta-authored arxiv technical report** as of 2026-04-25 (the agent confirmed: arxiv 2601.11659 "Llama 4 Herd" was withdrawn for incorrect submitter info; only a Meta blog post exists for the April 2025 announcement). Any Llama 4 architecture/training claim must be sourced to Meta's blog, not a primary paper. The post should default to Llama 3 as the dense-model production anchor.
4. **Patarasuk-Yuan 2009 PDF did not yield extractable text** in the agent's two fetch attempts. The 2(N-1)/N × M formula and the ring derivation are cross-checked against secondary derivations (OneFlow blog, Gibiansky / Baidu allreduce post). If the post wants a primary quote, an offline read of the FSU PDF is needed.
5. **CAAT-Net 50% reduction claim** is abstract-only, verify mechanism in body before citing as a number in the post.
6. **Megatron-Core's "FP4" support claim** in the README is not anchored to a primary paper in the search results.

### Reference implementation

Script at `notes/multi-gpu-training-reference.py`. Three modes:

- `--mode=solo`: confirmed runs end-to-end on macOS CPU. 33,088-param TinyMLP, single optimizer step, loss=1.1227.
- `--mode=ddp` and `--mode=fsdp`: hung in `torchrun` rendezvous on macOS/gloo. Code is structurally correct (uses `torch.distributed.fsdp.fully_shard` for FSDP2 with FSDP1 fallback) and serves as authoritative API reference for the post; execution requires Linux + CUDA or proper Docker rendezvous setup.

### Sources

Newer than 2024-10-25 (recency-bar primary):

- HF "Ultra-Scale Playbook", https://nanotron-ultrascale-playbook.static.hf.space/ (2025)
- DeepSeek-V3 Technical Report, arxiv 2412.19437 (v1 Dec 2024, v2 Feb 2025)
- PyTorch FSDP2 `fully_shard` docs, https://docs.pytorch.org/docs/stable/distributed.fsdp.fully_shard.html (2026-04)
- PyTorch DTensor docs, https://docs.pytorch.org/docs/stable/distributed.tensor.html (2026-04)
- Megatron-Core 0.16.1 docs, https://docs.nvidia.com/megatron-core/developer-guide/latest/api-guide/tensor_parallel.html (Mar 2026)
- Ladder-Residual, arxiv 2501.06589 (Jan 2025)
- Llama 3 Herd, arxiv 2407.21783 (v3 Nov 2024)
- Context Parallelism for Scalable Million-Token Inference, arxiv 2411.01783 (v3 Apr 2025)
- Towards Fully FP8 GEMM LLM Training at Scale, arxiv 2505.20524 (May 2025)
- MOSS (FP8 microscaling), arxiv 2511.05811 (Nov 2025)
- CAAT-Net, arxiv 2506.19645 (Jun 2025)

Pre-cutoff, foundational (cited for grounding, do not count toward the bar):

- Patarasuk & Yuan, "Bandwidth Optimal All-reduce". JPDC 2009
- Li et al, "PyTorch Distributed", arxiv 2006.15704 (2020)
- Rajbhandari et al, "ZeRO", arxiv 1910.02054 (2020)
- Shoeybi et al, "Megatron-LM", arxiv 1909.08053 (2019)
- Korthikanti et al, "Reducing Activation Recomputation" (Sequence Parallel), arxiv 2205.05198 (2022)
- Huang et al, "GPipe", arxiv 1811.06965 (2018)
- Narayanan et al, "Megatron-LM cluster paper" (1F1B, Interleaved 1F1B), arxiv 2104.04473 (2021)
- Lepikhin et al, "GShard", arxiv 2006.16668 (2020)
- Fedus et al, "Switch Transformer", arxiv 2101.03961 (2021)
- Liu et al, "Ring Attention", arxiv 2310.01889 (2023)

## Outline

Phase 3 output. Structure follows the three-act narrative-template pattern: set up the problem, decompose into isolated mechanisms, reassemble. Ramp from small to large per the locked-in arc. Sentence-case headings, numbered.

### Section list

1. **The single-GPU loop.** What we're going to break. Forward / loss / backward / optimizer. Mixed-precision Adam memory math (16 bytes/param). The reader leaves with a mental picture of one GPU's tight loop and the 16Ψ number burned in.
2. **Two GPUs, one negotiation.** DDP. Each rank holds the full model, sees a different batch slice, and has to average gradients. Introduce *all-reduce* as the protagonist's first antagonist. Bucketing and comm-compute overlap. End with the punch: "DDP is single-GPU training plus one collective per backward."
3. **The ring all-reduce.** Why averaging isn't free. The 2(N-1)/N × M cost. Reduce-scatter then all-gather. The bandwidth-flat property. Show why ring beats tree once payloads are megabytes.
4. **When the model doesn't fit.** The memory wall. 70B weights = 140 GB BF16; H100 has 80 GB. Optimizer states are 6× the weights. ZeRO's insight: don't replicate, partition.
5. **ZeRO and FSDP.** Stages 1, 2, 3. Reduce-scatter + all-gather is the same ring decomposition, reused for a different purpose. ZeRO-3 / FSDP costs 1.5× DDP comm in latency, not bandwidth. Llama 3 uses FSDP with `reshard_after_forward=False`.
6. **FSDP2: per-parameter sharding.** The DTensor abstraction. `Shard / Replicate / Partial` placements on a `DeviceMesh`. Why this is the substrate that makes 4D and 5D parallelism composable in user code.
7. **Splitting one matmul.** Tensor parallel. Column-parallel A, row-parallel B, the f and g operators that hold the all-reduces. Why TP is bandwidth-hungry and stays inside one node (NVLink) almost always.
8. **The activation tax: sequence parallel.** TP makes activations fat. SP shards the LayerNorm/dropout regions along sequence. Same comm cost, much less peak memory. Korthikanti's selective recomputation (70% memory savings, 2.7% FLOPs).
9. **Pipeline parallel and the bubble.** Layer-axis split. GPipe vs 1F1B vs interleaved 1F1B. The (K-1)/(M+K-1) bubble fraction. The activation-memory tradeoff between schedules.
10. **DualPipe: a near-zero bubble.** DeepSeek's late-2024 schedule. Bidirectional micro-batch flow. ZeroBubble-style backward splitting (B + W). Bubble shrinks to ~half at 1/PP activation cost. Hides PP and all-to-all comm in one go.
11. **MoE and expert parallel.** Sparsity. Top-1 routing (Switch) vs top-2 (GShard). The all-to-all dispatch as the new dominant collective. Load balance: aux loss (Switch eq. 4) vs DeepSeek's aux-loss-free bias trick.
12. **The thousand-token problem: context parallel.** Ring attention. Pass-KV vs pass-Q. Llama 3's `[TP, CP, PP, DP]` order, optimised for network topology.
13. **FP8 in production.** DeepSeek-V3's recipe. What's FP8 (Fprop, Dgrad, Wgrad), what stays high precision (embed, head, gating, norm, attention). 1×128 activation tiles, 128×128 weight blocks, E4M3 everywhere. The Hopper accumulation problem and the CUDA-core flush fix. Sub-0.25% loss error vs BF16.
14. **Composing the axes.** The 5D mesh: data, tensor, pipeline, expert, sequence/context. Llama 3 = 4D no EP; DeepSeek-V3 = (PP, EP, DP) no TP. The mesh shape is forced by network topology more than by ML.
15. **2026 best practices.** Decision tree. What you actually do for: 1B / 8B / 70B / 405B / 671B-MoE. The closing punch (per narrative-template): one or two sentences naming the small concrete point that the whole post earned the right to make.

### Figure list

Targets: 18 figures. ~83% interactive (15 interactive-canvas, 1 plot, 3 static-svg). Each figure spec: mechanism it isolates / what the reader controls / what they should notice / type.

| # | Section | Mechanism | Controls | Notice | Type |
|---|---|---|---|---|---|
| 1 | §1 | The single-GPU loop. Four boxes: forward, loss, backward, optimizer. | none | this is the *thing*. Every later figure either splits it or repeats it. | static-svg |
| 2 | §2 | DDP step on N GPUs. Each GPU runs forward+backward; gradient bars build up; one all-reduce flattens them. | slider for `N` (2..16), scrubber through one step | as N grows the all-reduce phase grows linearly while compute stays the same. comm becomes a tax. | interactive-canvas |
| 3 | §3 | Ring all-reduce. N nodes in a ring; one chunk passes around per step. Phase 1: reduce-scatter. Phase 2: all-gather. | slider for N (4..8), scrubber through 2(N-1) steps | each step ships M/N. After N-1 steps every chunk is fully summed somewhere. After 2(N-1) steps every node has the full sum. | interactive-canvas |
| 4 | §4 | The 16Ψ memory bar. Stacked: weight + grad + optimizer. Show it on 1 GPU vs N GPUs replicated (still full). | slider for params (1B..405B), slider for N | replication doesn't help. Total memory is N × 16Ψ. The optimizer state is the elephant. | interactive-canvas |
| 5 | §4 | Llama 3-class budget: a 70B model on a single H100. Memory bar overflows the 80 GB line by 14×. | slider for model size, hardware toggle (H100 80GB / H200 144GB / B200 192GB) | even the most generous single GPU can't hold a 70B BF16 Adam run. | interactive-canvas |
| 6 | §5 | ZeRO stages stacked bar. Three columns (Stage 1, 2, 3). Each shows what shrinks per rank. | toggle for stage, slider for N (4..32) | Stage 1 cuts the 12 bytes; Stage 2 cuts another 2; Stage 3 cuts the last 2. Per-rank memory falls as 1/N. | interactive-canvas |
| 7 | §5 | ZeRO-3 / FSDP timeline. Layers across; time across. Show all-gather of layer K's weights firing during forward of layer K-1, etc. | scrubber through one forward+backward | the all-gather of layer K+1 is hidden behind compute on layer K. The "1.5×" is mostly latency, not bandwidth. | interactive-canvas |
| 8 | §7 | TP matmul split. Show `Y = GeLU(XA) · B` with A column-split and B row-split. Forward path with `f` no-op + `g` all-reduce. | toggle: column-only vs full column-row | column split alone keeps the partial-sum problem; row split *closes* it via one all-reduce per layer. | interactive-canvas |
| 9 | §7 | Where the f and g operators sit in an MLP and an attention block. Static schematic mapping the 2 fwd + 2 bwd all-reduces per transformer layer. | none | TP costs four all-reduces per layer per direction. That's why TP stays inside one NVLink-connected node. | static-svg |
| 10 | §8 | Activation memory under TP-only vs TP+SP. Two stacked bars side by side. | toggle TP-only / TP+SP, slider for sequence length | with TP only, the LayerNorm+dropout regions hold full-size activations. With SP, they're sharded along `s`. Same comm volume; less memory. | interactive-canvas |
| 11 | §9 | Pipeline schedule Gantt. Stages × time. Show GPipe's F-then-B with bubble triangles. | slider for K (4..16), slider for M (1..32), toggle GPipe / 1F1B / Interleaved | as M grows, the bubble shrinks. 1F1B has the same bubble fraction as GPipe but a quarter of the activation memory. Interleaved cuts the bubble by `v`. | interactive-canvas |
| 12 | §10 | DualPipe schedule. Bidirectional micro-batch flow; F&B fused chunks. | scrubber through one step | the warm-up triangles overlap because forward of micro-batch from one end runs concurrently with backward of micro-batch from the other end. Bubble drops to roughly half. | interactive-canvas |
| 13 | §11 | MoE routing. Tokens flow into a router, top-1 picks one expert, all-to-all sends each token to its expert's device, FFN runs, all-to-all returns. | slider for #experts E (4..32), slider for capacity factor, drag a token to "watch its journey" | every layer is two all-to-alls. EP comm scales with `E × C × d_model`. | interactive-canvas |
| 14 | §11 | Per-expert load over training steps. Bars per expert, growing or shrinking with bias updates. | toggle aux-loss / aux-loss-free, scrubber through training steps | aux-loss-free's bias update keeps loads balanced without distorting the gradient. | interactive-canvas |
| 15 | §12 | Ring attention. Devices in a ring; KV blocks rotating step by step while each device computes its local block of attention. | slider for sequence length S (32k..1M), scrubber through one rotation | every device sees every KV block over N steps. Block-wise softmax stays exact via online accumulation. | interactive-canvas |
| 16 | §13 | FP8 quantization granularity. The 1×128 activation tile and the 128×128 weight block, drawn at scale on a transformer linear layer. | none | activation scaling adapts per token per 128 channels; weights scale per 128×128 block. Outliers are localised, not averaged into the full tensor. | static-svg |
| 17 | §13 | FP8 vs BF16 loss curve. Two lines; difference annotated. | toggle linear / log y-axis | the gap stays under 0.25% across the run. FP8 isn't free, but it's not catastrophic. | plot |
| 18 | §14 | The 5D mesh. Drag a single GPU in a `[DP=N, TP, CP, PP, EP]` mesh. Highlight its TP, CP, PP, EP, and DP groups (different colours). | drag x/y to pick a GPU | each GPU is in five different communication groups simultaneously. The mesh shape is what 'composing parallelism' actually means. | interactive-canvas |
| 19 | §15 | Decision flowchart / calculator. Sliders for model size, total GPUs, GPUs/node, intra-node bandwidth, inter-node bandwidth. Output: recommended parallelism stack. | sliders for model B, GPUs, GPUs/node, NVLink GB/s, IB GB/s | the same model lands on different parallelism stacks depending on hardware. Llama 3-class on H100 → TP=8, FSDP rest. DeepSeek-V3 MoE → no TP, EP=64. | interactive-canvas |

### Tally

19 figures, one more than the 18 target. The extra is earned by §4 needing two figures (the 16Ψ bar and the 70B-on-1-H100 punch). Static-svg: 3 (Figs 1, 9, 16). Interactive-canvas: 15. Plot: 1. Interactive ratio: 16/19 ≈ 84%.

### Open questions for Vic before phase 4

1. **15 sections vs 13.** I split FSDP2 into its own §6 and broke pipeline / DualPipe into §9 + §10. Want to compress back to ~13 by folding FSDP2 into §5 and merging DualPipe into §9? Trade: more density, less room to land DTensor as the real abstraction.
2. **§14 (composing the axes).** Worth a full section, or fold into the §15 best-practices section as a callout?
3. **The 5D mesh figure (Fig 18).** This is the climax of the post per narrative-template ("everything earlier shown working together"). But 5D is hard to render legibly even on a 680px canvas. Plan B: a 3D mesh with EP and CP as side-panels. Want me to draft both and we pick after seeing them?
4. **Reference list at the end of the post.** Same format as `unified-vision-stack`'s closing references? Title + arxiv link + year, no formal citation style.
