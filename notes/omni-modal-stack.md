# Omni-Modal Stack — explainer notes

## Spec

**Slug:** `omni-modal-stack` (mirrors prequel `unified-vision-stack`).

**Working title:** *The Unified Multimodal Stack*. Backup: *Adding Ears to One Eye*.

**Description:** An end-to-end, intuition-first explanation of how modern multimodal models are wired, and why moving from a vision backbone to a four-modality model is harder, and more interesting, than "plug in more encoders."

**Audience:** Engineers new to multimodal/agent stacks, technically literate (comfortable with transformer attention, embeddings, contrastive losses), but not specialists. Reader has either read the prequel `unified-vision-stack` or can be pointed back to it for the C-RADIOv4 setup.

**Target length:** ~45-minute read. Density over coverage. `essay: true` for 3-tier heading hierarchy.

**Hook:** Pick up where the prequel ended. C-RADIOv4 is a unified vision backbone with SigLIP2 baked in as one of its teachers, so its features already share a space with caption embeddings. So why does Nemotron 3 Nano Omni still ship a separate text tokenizer and a 30B autoregressive decoder? Cracking that puzzle surfaces the central design choice: SigLIP-style alignment is contrastive over caption-shaped pairs; it ranks captions, it does not generate language. The text decoder is doing a job SigLIP was never trained for. Once that lands, the rest of the architecture falls out naturally.

**Load-bearing claim the reader walks away with:** Wiring a multimodal model from a vision backbone takes three architectural moves, in order:

1. **A text-centric autoregressive decoder.** The LLM sits in the middle. Every other modality is encoded into a sequence of tokens that flows into the decoder's context. Why this beats the alternatives (multi-decoder fusion, encoder-only contrastive stacks, stitched chains).
2. **Modality-specific encoders, because a pixel grid is not a spectrogram is not a video clip.** Why audio needs Parakeet (or a Whisper-style encoder), why video needs 3D conv plus a learned temporal sampler, why those cannot just be more SigLIPs.
3. **Token-budget mechanisms, because raw multimodal context blows the inference math.** EVS for video, expert routing for compute, Mamba layers for long-sequence memory, NVFP4 for memory bandwidth. The cost discipline is what makes the whole thing shippable.

**Structural shape (high level; figure list is locked at Phase 3):**

- Recap (one short section). Hand the reader C-RADIOv4 from the prequel. Re-introduce SigLIP2 inside it.
- **Act 1 — The puzzle.** Why C-RADIOv4 plus a text head is not enough. Contrastive vs autoregressive. What "alignment" actually means. The text decoder as a generative organ, not a similarity scorer.
- **Act 2 — The decoder-centric architecture.** Three ways to wire vision into a language model: stitched (Whisper plus LLM), parallel adapters (LLaVA, BLIP-2, Flamingo), unified-encoders-into-one-decoder (Nemotron 3 Nano Omni's choice). Walk tradeoffs. Land worked example.
- **Act 3 — The other modalities.** Audio: why Parakeet, what spectrogram encoders give you, why Whisper's stitched approach hurts agent loops. Video: why 3D convolutions, the frame-budget problem, EVS as the load-bearing trick that makes long video viable in one decoder context.
- **Act 4 — The inference math.** Hybrid Mamba+Transformer MoE. Expert routing per modality. NVFP4 quantization. Why the unified loop is cheaper than fragmented chains. What that means for production agents.
- Coda. What is still missing (no tool-use evals, no native planning) and where a follow-up could land.

**Figure-style preference:** Mixed, lean static. ~80% static SVG matching the prequel's palette and figcaption shape; interactive Canvas/Plot reserved for places where a slider/scrubber genuinely teaches the mechanism. Per-figure type is locked at Phase 3, not now.

**Framing posture:** Architecture-centric, not Nemotron-centric. Nemotron 3 Nano Omni is the most recent worked example, but the post earns its claims by walking the design space. Other approaches (Flamingo, BLIP-2, Qwen-VL, Whisper-stitched stacks) surface as contrast.

**Starter resources for Phase 2 research:**

1. NVIDIA blog: *NVIDIA Nemotron 3 Nano Omni Powers Multimodal Agent Reasoning in a Single Efficient Open Model* (April 2026 seed URL).
2. Nemotron 3 Nano Omni technical report (research.nvidia.com).
3. EVS paper, arxiv 2510.14624 (Efficient Video Sampling).
4. Parakeet release / paper (NVIDIA audio encoder).
5. Nemotron Nano VL V2 technical report (prior generation, accuracy comparison baseline).
6. Mamba (Gu & Dao 2023) for hybrid SSM context.
7. SigLIP 2 paper (Zhai et al.) and the original SigLIP for the contrastive-vs-generative distinction.
8. CLIP (Radford et al. 2021) for the foundational contrastive objective.
9. Adapter-contrast set: Flamingo (Alayrac et al. 2022), BLIP-2 (Li et al. 2023), LLaVA (Liu et al. 2023). Phase 2 picks the most load-bearing subset.
10. Whisper (Radford et al. 2022) for the stitched-audio contrast.

**Hard rules to apply throughout:** voice rules (no em dashes, banned-word list), sentence-case headings, no fabricated benchmark numbers, every load-bearing claim quotes a primary source in the `## Research notes` section, `essay: true`, `draft: false` from Phase 1 onward.

## Research notes

Merged from three parallel subagents on 2026-05-01. Grouped by sub-topic, not by source. Every quoted excerpt is from a primary source that has been read directly.

### Sub-topic 1 — CLIP and SigLIP are contrastive embedders, not text generators

**CLIP (Radford et al., 2021).** Trains an image encoder and a text encoder to maximize cosine similarity for matched (image, text) pairs and minimize it for the N²−N mismatched pairs in a batch, via symmetric cross-entropy. The text encoder collapses a sentence into a single vector taken from the activation at the `[EOS]` token. CLIP cannot generate free-form text — it scores whether a given caption matches a given image.

> "Given a batch of N (image, text) pairs, CLIP is trained to predict which of the N × N possible (image, text) pairings across a batch actually occurred. To do this, CLIP learns a multi-modal embedding space by jointly training an image encoder and text encoder to maximize the cosine similarity of the image and text embeddings of the N real pairs in the batch while minimizing the cosine similarity of the embeddings of the N² − N incorrect pairings. We optimize a symmetric cross entropy loss over these similarity scores." (§2.3)

> "The text sequence is bracketed with [SOS] and [EOS] tokens and the activations of the highest layer of the transformer at the [EOS] token are treated as the feature representation of the text which is layer normalized and then linearly projected into the multi-modal embedding space." (§2.4)

> "A simple idea worth trying is joint training of a contrastive and generative objective with the hope of combining the efficiency of CLIP with the flexibility of a caption model." (§6, anticipating BLIP and SigLIP 2.)

Citation: *Learning Transferable Visual Models From Natural Language Supervision*, Radford et al., OpenAI, 2021, arXiv:2103.00020, accessed 2026-05-01.

**SigLIP (Zhai et al., 2023).** Swaps the softmax InfoNCE for a pairwise sigmoid binary-classification loss over all (i, j) image-text pairs. Same dual-tower contrastive embedder shape, more efficient training. Still no autoregressive head.

> "Instead of the softmax-based contrastive loss, we propose a simpler alternative that does not require computing global normalization factors. The sigmoid-based loss processes every image-text pair independently, effectively turning the learning problem into the standard binary classification on the dataset of all pair combinations, with a positive labels for the matching pairs (Iᵢ, Tᵢ) and negative labels for all other pairs (Iᵢ, Tⱼ≠ᵢ)." (§3.2)

Citation: *Sigmoid Loss for Language Image Pre-Training*, Zhai, Mustafa, Kolesnikov, Beyer (Google DeepMind), 2023, arXiv:2303.15343, accessed 2026-05-01.

**SigLIP 2 (Tschannen et al., 2025).** Extended SigLIP with a LocCa caption-decoding auxiliary loss plus self-distillation and masked prediction. **The decoder is thrown away — only the vision encoder is shipped**, so the released artifact is still a contrastive embedder that feeds other VLMs.

> "We combine the original SigLIP training recipe with decoder-based pretraining, in addition to self-distillation and masked prediction as in the DINO line of work."

> "For LocCa, we attach a standard transformer decoder with cross-attention to the un-pooled vision encoder representation (before applying the MAP head). The decoder follows the shapes of the text encoder except that we add cross-attention layers and reduce the number of layers by a factor of two. Besides image captioning, LocCa also trains for automatic referring expression prediction and grounded captioning." (§2.2)

> "Finally, we note that the decoder only serves for representation learning here and is not part of the model release." (§2.2)

> "SigLIP 2 models outperform their SigLIP counterparts at all model scales in core capabilities, including zero-shot classification, image-text retrieval, and transfer performance when extracting visual representations for Vision-Language Models (VLMs)." (Abstract)

Citation: *SigLIP 2: Multilingual Vision-Language Encoders with Improved Semantic Understanding, Localization, and Dense Features*, Tschannen et al. (Google DeepMind), v1 2025-02-20, arXiv:2502.14786, accessed 2026-05-01. **(Recent.)**

**Implication for the post.** A SigLIP/CLIP text tower pools entire sentences into one vector with no per-token conditional distribution. To generate language, a multimodal model needs a separate autoregressive LLM with its own tokenizer, learned token embeddings, and a softmax head over the vocabulary. Every multimodal generator (Flamingo, BLIP-2, LLaVA, Qwen-VL, Gemini, Chameleon, Nemotron-Omni) bolts one on. **This is the cracked-puzzle answer for the post's hook.**

### Sub-topic 2 — How prior multimodal models actually wired vision into a language model

**Flamingo: perceiver resampler + gated cross-attention into a frozen LLM.** Three pieces — frozen NFNet-F6 vision encoder, Perceiver Resampler that compresses any-length spatio-temporal feature grid into 64 fixed visual tokens, `GATED XATTN-DENSE` blocks interleaved between frozen Chinchilla LM blocks. The gating starts as a no-op via `tanh(α=0)`, preventing catastrophic forgetting.

> "Perceiver Resampler: from varying-size large feature maps to few visual tokens. This module connects the vision encoder to the frozen language model… It takes as input a variable number of image or video features from the vision encoder and produces a fixed number of visual outputs (64), reducing the computational complexity of the vision-text cross-attention." (§2.1)

> "We freeze the pretrained LM blocks, and insert gated cross-attention dense blocks (Figure 4) between the original layers, trained from scratch. To ensure that at initialization, the conditioned model yields the same results as the original language model, we use a tanh-gating mechanism. This multiplies the output of a newly added layer by tanh(α) before adding it to the input representation from the residual connection, where α is a layer-specific learnable scalar initialized to 0." (§2.2)

Pseudocode (Figure 4):
> `y = y + tanh(alpha_xattn) * attention(q=y, kv=x)`
> `y = y + tanh(alpha_dense) * ffw(y)`

Ablation row (iii): "Without it, we see a drop of 4.2% in our overall score… disabling the 0-initialized tanh gating leads to training instabilities." (§3.3)

Citation: *Flamingo: a Visual Language Model for Few-Shot Learning*, Alayrac et al. (DeepMind), NeurIPS 2022, arXiv:2204.14198, accessed 2026-05-01.

**BLIP-2: Q-Former bridges frozen vision encoder and frozen LLM.** A 188M-parameter Querying Transformer (initialized from BERT-base, cross-attention every other block). A learned set of query vectors attends to the frozen image encoder's features and produces a fixed-length sequence that the frozen LLM consumes via a linear projection.

> "We propose Q-Former as the trainable module to bridge the gap between a frozen image encoder and a frozen LLM. It extracts a fixed number of output features from the image encoder, independent of input image resolution. As shown in Figure 2, Q-Former consists of two transformer submodules that share the same self-attention layers: (1) an image transformer that interacts with the frozen image encoder for visual feature extraction, (2) a text transformer that can function as both a text encoder and a text decoder. We create a set number of learnable query embeddings as input to the image transformer. The queries interact with each other through self-attention layers, and interact with frozen image features through cross-attention layers (inserted every other transformer block)." (§3.1)

Citation: *BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models*, Li, Li, Savarese, Hoi (Salesforce), ICML 2023, arXiv:2301.12597, accessed 2026-05-01.

**LLaVA: a single linear projection (then a 2-layer MLP) into LLM token space.** Throws away the entire Q-Former / cross-attention apparatus. CLIP ViT-L/14 features `Zᵥ = g(Xᵥ)` are mapped through a single trainable matrix `W` into the LLM's word-embedding space, then prepended to the prompt as if they were ordinary tokens.

> "We consider a simple linear layer to connect image features into the word embedding space. Specifically, we apply a trainable projection matrix W to convert Zᵥ into language embedding tokens Hᵥ, which have the same dimensionality as the word embedding space in the language model: Hᵥ = W · Zᵥ, with Zᵥ = g(Xᵥ)" (§4.1)

> "Note that our simple projection scheme is lightweight, which allows us to iterate data centric experiments quickly. More sophisticated schemes to connect the image and language representations can also be considered, such as gated cross-attention in Flamingo and Q-former in BLIP-2." (§4.1)

LLaVA-1.5 upgraded to a 2-layer MLP:

> "MLP vision-language connector. Inspired by the improved performance in self-supervised learning by changing from a linear projection to an MLP, we find that improving the vision-language connector's representation power with a two-layer MLP can improve LLaVA's multimodal capabilities, compared with the original linear projection." (§3.3)

Citations: *Visual Instruction Tuning*, Liu, Li, Wu, Lee, NeurIPS 2023, arXiv:2304.08485. *Improved Baselines with Visual Instruction Tuning*, Liu, Li, Li, Lee, CVPR 2024, arXiv:2310.03744. Both accessed 2026-05-01.

**Qwen2.5-VL: native dynamic resolution + M-RoPE.** Replaces fixed-resolution tile-stitching with native any-size processing. The ViT uses 2D-RoPE; a 2-layer MLP merger compresses each 2×2 patch group to one token before LLM ingestion. Position info for text/image/video unified via 3-component (temporal, height, width) M-RoPE.

> "MLP-based Vision-Language Merger. To address the efficiency challenges posed by long sequences of image features… we first group spatially adjacent sets of four patch features. These grouped features are then concatenated and passed through a two-layer multi-layer perceptron (MLP) to project them into a dimension that aligns with the text embeddings used in the LLM." (§2.1)

> "Vision Encoder. The vision encoder of Qwen2.5-VL employs a redesigned Vision Transformer (ViT) architecture. Structurally, we incorporate 2D-RoPE and window attention to support native input resolutions while accelerating the computation of the entire visual encoder… we introduce windowed attention in most layers, which ensures that computational cost scales linearly with the number of patches rather than quadratically. In our architecture, only four layers employ full self-attention, while the remaining layers utilize windowed attention with a maximum window size of 112×112 (corresponding to 8×8 patches)." (§2.1.1)

Citation: *Qwen2.5-VL Technical Report*, Bai et al. (Qwen team, Alibaba), v1 2025-02-19, arXiv:2502.13923, accessed 2026-05-01. **(Recent.)**

**Whisper-stitched audio chains: encoder-decoder ASR with documented failure modes.** Whisper is self-contained encoder-decoder Transformer; downstream LLM only sees the transcript. The paper itself flags long-form failure modes:

> "Whisper models are trained on 30-second audio chunks and cannot consume longer audio inputs at once… Transcribing long-form audio using Whisper relies on accurate prediction of the timestamp tokens to determine the amount to shift the model's 30-second audio context window by, and inaccurate transcription in one window may negatively impact transcription in the subsequent windows. We have developed a set of heuristics that help avoid failure cases of long-form transcription… we use beam search with 5 beams using the log probability as the score function, to reduce repetition looping which happens more frequently in greedy decoding." (§§3.8, 4.5)

When Whisper is the front-half of an agent (Whisper → text → LLM), all paralinguistic information (prosody, speaker identity, disfluency, overlap, timing within a chunk) collapses to a transcript before the LLM ever sees it. Window-to-window error propagates as documented above.

Citation: *Robust Speech Recognition via Large-Scale Weak Supervision*, Radford, Kim, Xu, Brockman, McLeavey, Sutskever (OpenAI), 2022, arXiv:2212.04356, accessed 2026-05-01.

### Sub-topic 3 — Adapter-style vs unified-decoder multimodal: the actual architectural distinction

**Adapter-style** (Flamingo, BLIP-2, LLaVA, early Qwen-VL): keep a frozen-or-finetuned text-only LLM, bolt vision in via a separate module — gated cross-attention (Flamingo), Q-Former bottleneck (BLIP-2), linear/MLP projector that re-embeds vision features as soft tokens (LLaVA, Qwen-VL). Common signature: the LLM never sees raw modality embeddings during pretraining; the visual subgraph is a side-loaded computation.

**Unified-decoder** (Gemini, Nemotron 3 Nano Omni, Qwen2.5-Omni, Chameleon): one decoder, one token stream, modalities arrive as either projected encoder embeddings concatenated into the LLM's hidden space, or as fully discrete tokens in a shared vocabulary. The LLM is trained on the joint distribution rather than learning to read a translated visual side-channel.

**Chameleon — discrete-token unified vocabulary:**

> "Our unified approach uses fully token-based representations for both image and textual modalities. By quantizing images into discrete tokens, analogous to words in text, we can apply the same transformer architecture to sequences of both image and text tokens, without the need for separate image/text encoders or domain-specific decoders. This early-fusion approach, where all modalities are projected into a shared representational space from the start, allows for seamless reasoning and generation across modalities." (§1)

Citation: *Chameleon: Mixed-Modal Early-Fusion Foundation Models*, Chameleon Team (FAIR at Meta), 2024, arXiv:2405.09818, accessed 2026-05-01.

**Gemini — continuous encoder embeddings into one decoder, native from scratch:**

> "Gemini models are trained to accommodate textual input interleaved with a wide variety of audio and visual inputs… The visual encoding of Gemini models is inspired by our own foundational work on Flamingo, CoCa, and PaLI, with the important distinction that the models are multimodal from the beginning and can natively output images using discrete image tokens." (§2)

> "The Gemini models are natively multimodal, as they are trained jointly across text, image, audio, and video." (§5)

Citation: *Gemini: A Family of Highly Capable Multimodal Models*, Gemini Team (Google), 2023, arXiv:2312.11805, accessed 2026-05-01.

**Nemotron 3 Nano Omni — encoder-projector-decoder, the most explicit primary-source naming:**

> "Our model follows an encoder-projector-decoder design, combining the Nemotron 3 Nano 30B-A3B language model with modality-specific encoders for vision and audio, connected via MLP projectors. An overview of the architecture is shown in Figure 1. The vision encoder is based on C-RADIOv4-H, while the audio encoder is initialized with Parakeet-TDT-0.6B-v2." (§2)

> "For multimodal inputs containing both visual and audio streams (e.g., videos with audio), modality tokens are interleaved in temporal order during sequence construction to enable joint temporal reasoning across modalities." (§2)

> "Visual, audio, and text tokens are concatenated and fed to the LLM." (Figure 1 caption)

Citation: *Nemotron 3 Nano Omni: Efficient and Open Multimodal Intelligence*, NVIDIA, 2026-04-27, https://research.nvidia.com/labs/nemotron/files/NVIDIA-Nemotron-3-Omni-report.pdf, accessed 2026-05-01.

**Qwen2.5-Omni — Thinker/Talker, hidden-state coupling for streaming speech:**

> "Thinker is a Transformer decoder, accompanied by encoders for audio and image that facilitate information extraction. In contrast, Talker is designed as a dual-track autoregressive Transformer Decoder architecture… During both training and inference, Talker directly receives high-dimensional representations from Thinker and shares all of Thinker's historical context information. Consequently, the entire architecture operates as a cohesive single model, enabling end-to-end training and inference." (§2.1)

> "Talker receives both high-level representations and embeddings of the text tokens sampled by Thinker. The integration of high-dimensional representations and discrete sampling tokens is essential in this context. As a streaming algorithm, voice generation must anticipate the content's tone and attitude before the entire text is fully generated. The high-dimensional representations provided by Thinker implicitly convey this information." (§2.3)

The hidden-state coupling is the structural alternative to a transcribed-string bottleneck — prosody and intent never go through text. Citation: *Qwen2.5-Omni Technical Report*, Xu et al. (Qwen team, Alibaba Cloud), v1 2025-03-26, arXiv:2503.20215, accessed 2026-05-01. **(Recent.)**

### Sub-topic 4 — Audio is a time-frequency signal

Modern audio encoders consume a log-mel spectrogram (a 2D time × frequency representation), not a raw waveform or an image. Whisper sets the de-facto convention now shared by Parakeet, AudioLM-style encoders, and multimodal speech adapters.

> "All audio is re-sampled to 16,000 Hz, and an 80-channel log-magnitude Mel spectrogram representation is computed on 25-millisecond windows with a stride of 10 milliseconds." (Whisper §2.2)

> "The encoder processes this input representation with a small stem consisting of two convolution layers with a filter width of 3 and the GELU activation function where the second convolution layer has a stride of two. Sinusoidal position embeddings are then added to the output of the stem." (Whisper §2.2)

A 30-second chunk reduces to 1500 frames in Whisper (3000 spectrogram frames downsampled by 2). Citation: arXiv:2212.04356, accessed 2026-05-01.

### Sub-topic 5 — Parakeet-TDT-0.6B-v2 (what Nemotron 3 Nano Omni actually uses)

A FastConformer encoder (a Conformer variant with 8× temporal subsampling) paired with a TDT (Token-and-Duration Transducer) decoder. 600M params. In Nemotron 3 Nano Omni, used as a token-emitting audio encoder — its encoder activations feed an MLP projector into the LLM, not a transcript.

> "Architecture Type: FastConformer-TDT… This model was developed based on FastConformer encoder architecture and TDT decoder. This model has 600 million model parameters." (model card)

> "training uses full attention, enabling efficient transcription of audio segments up to 24 minutes in a single pass" (model card)

Citation: *parakeet-tdt-0.6b-v2 model card*, NVIDIA, release 2025-05-01, https://huggingface.co/nvidia/parakeet-tdt-0.6b-v2, accessed 2026-05-01.

Underlying papers:
- *Fast Conformer with Linearly Scalable Attention for Efficient Speech Recognition*, Rekesh et al. (NVIDIA), 2023, arXiv:2305.05084.
- *Efficient Sequence Transduction by Jointly Predicting Tokens and Durations*, Xu et al., 2023, arXiv:2304.06795.

Integration in Nemotron 3 Nano Omni:

> "The audio side is powered by Parakeet-TDT-0.6B-v2, connected to the backbone through its own 2-layer MLP projector. Audio is sampled at 16 kHz, and the model is trained with inputs up to 1,200 seconds (20 minutes), while the LLM max context length supports 5+ hours."

Citation: *Introducing NVIDIA Nemotron 3 Nano Omni*, NVIDIA, 2026-04-28, https://huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence, accessed 2026-05-01.

### Sub-topic 6 — What "transcribe then read" actually loses

Tsiamas et al. construct a controlled benchmark for prosody loss in cascade speech systems, showing that text-only intermediate representations cannot transmit stress, intonation, or rhythm even with a perfect transcript.

> "The prosody of a spoken utterance, including features like stress, intonation and rhythm, can significantly affect the underlying semantics, and as a consequence can also affect its textual translation."

Canonical example: "These are GERMAN teachers" (teachers from Germany) versus "These are German TEACHERS" (teachers of German language) are semantically distinct but map to the same transcript.

Citation: *Speech is More Than Words: Do Speech-to-Text Translation Systems Leverage Prosody?*, Tsiamas, Sperber, Finch, Garg, 2024, arXiv:2410.24019 (v1 2024-10-31), accessed 2026-05-01. **(Recent, just barely.)**

In addition to prosody loss, a cascade pays an autoregressive-decode latency hop (ASR must finish a chunk before the LLM sees anything) and compounds errors silently. **No primary-source benchmark of agent-loop latency-hop cost found at this source bar — keep latency claims qualitative.**

### Sub-topic 7 — Video is spatiotemporal; per-frame tokenization explodes

**ViViT — tubelet tokenization** that fuses spatial and temporal information at the token-extraction step, instead of treating frames independently.

> "Extract non-overlapping, spatio-temporal 'tubes' from the input volume, and to linearly project this to ℝ^d… nt=⌊T/t⌋, nh=⌊H/h⌋ and nw=⌊W/w⌋, tokens are extracted from the temporal, height, and width dimensions respectively." (§3)

ViViT's Model 2 (Factorised Encoder) is the cheap-architecture template: per-frame spatial encoder feeding a small temporal encoder.

Citation: *ViViT: A Video Vision Transformer*, Arnab, Dehghani, Heigold et al. (Google), 2021, arXiv:2103.15691, accessed 2026-05-01.

**TimeSformer — divided attention is forced by the cost of joint full attention.**

> "In practice, joint space-time attention causes a GPU memory overflow once the spatial frame resolution reaches 448 pixels, or once the number of frames is increased to 32."

> "Within each block, we first compute temporal attention by comparing each patch with all the patches at the same spatial location in the other frames"

Divided attention turns O((NF)²) per-block into O(N² + F²).

Citation: *Is Space-Time Attention All You Need for Video Understanding?*, Bertasius, Wang, Torresani (Facebook AI), 2021, arXiv:2102.05095, accessed 2026-05-01.

**VideoMAE — temporal redundancy is so high you can mask 90-95%.** Foundational evidence that video is structurally token-redundant.

> "Temporal tube masking enforces a mask to expand over the whole temporal axis, namely, different frames sharing the same masking map."

> "VideoMAE is in favor of extremely high masking ratios (e.g. 90% to 95%) compared with the ImageMAE."

This is the load-bearing observation that justifies all later compression schemes (Conv3D tubelets, EVS): if 90-95% of video patches are reconstructable from neighbors, you can drop them at inference too.

Citations: *VideoMAE*, Tong, Song, Wang, Wang, 2022, arXiv:2203.12602. *VideoMAE V2*, Wang et al., CVPR 2023, arXiv:2303.16727. Both accessed 2026-05-01.

### Sub-topic 8 — Efficient Video Sampling (EVS)

The load-bearing trick the post should center on. Framing-of-the-problem quote nails the token-budget motivation:

> "a two-minute video at 24 FPS produces more than two million vision tokens, far beyond the effective context length of most language models" (Introduction)

> "Vision-language models (VLMs) have recently expanded from static image understanding to video reasoning, but their scalability is fundamentally limited by the quadratic cost of processing dense frame sequences." (Abstract)

The algorithm itself is brutally simple — L1 difference between corresponding patches at consecutive frames, threshold by a percentile:

> "For every patch p at time 0<t≤T, compute D_{p,t}=‖p_t − p_{t−1}‖_1, and denote {D_t} as the differences of all patches between frames t−1 and t."

> "For each frame collect {D_t}_{t=1}^T and compute sequence-level cut-off threshold d as q-th percentile, where q is a user-selected pruning rate."

> "For all patches in the consecutive frames, keep those that satisfy {D_{p,t}} ≥ d; this defines the binary mask M_t."

Position preservation — selected patches keep their original spatial-temporal indices so M-RoPE / RoPE still works:

> "EVS preserves positional identity, requires no architectural changes or retraining."

> "we call it Position-preserving encoding… the selected embeddings and their original positional indices based on the computed retention mask"

Training-time stochastic compression, so the model is invariant to inference-time q values:

> "the pruning rate q is sampled from a beta distribution for every mini-batch. The model thus learns to be invariant to a continuum of compression ratios"

Reported benefit:

> "EVS reduces large language model (LLM) time-to-first-token (TTFT) by up to 4× with minimal accuracy loss"

> "For q=0.8, the difference in overall VLM TTFT speedup between Qwen 2.5B 7B and Qwen 2.5 14B is 50% (191% and 245% accordingly)"

At q=0.75 (keep top 25% of changing patches), Video-MME at 32 frames drops only 1.23% (65.50 → 64.70) with uptraining. Note: EVS paper itself runs experiments on Qwen2.5-7B/14B + C-RADIO-H, not Nemotron — the Nemotron 3 Nano Omni connection comes from the launch material below.

Citation: *Efficient Video Sampling*, Bagrov, Khvedchenia, Tymchenko, Aharon, Kadoch, Keren, Masad, Geifman, Zilberstein, Rintamaki, Le, Tao (NVIDIA + Deci), 2025, arXiv:2510.14624, accessed 2026-05-01. **(Recent.)**

### Sub-topic 9 — Conv3D tubelet + EVS in Nemotron 3 Nano Omni

Two-stage video token reduction: a Conv3D tubelet path that fuses pairs of frames before the ViT (a 2× reduction), then EVS on top to drop static post-encoder patches (typically another 2-4×).

> "For video, Nemotron 3 Nano Omni uses a dedicated Conv3D tubelet embedding path. Instead of embedding each frame independently, every pair of consecutive frames is fused into a single 'tubelet' before the ViT, halving the number of vision tokens the language model has to attend to."

> "EVS is an important feature, enabled during inference time, that drops redundant video tokens after the vision encoder… The first frame of the video is kept entirely, then for each subsequent frame, EVS keeps the 'dynamic' tokens where the video is changing and drops the 'static' ones where nothing has changed from the previous frame."

> "Each image can be represented using a variable number of 16 x 16 patches, with a minimum of 1,024 to a maximum of 13,312 visual patches per image."

Citation: HF blog as above (https://huggingface.co/blog/nvidia/nemotron-3-nano-omni-multimodal-intelligence). Companion technical report: research.nvidia.com Nemotron 3 Omni report (full PDF — primary source).

### Sub-topic 10 — Nemotron 3 Nano Omni: backbone composition

Hybrid Mamba2-Transformer-MoE stack. **23 Mamba-2 layers, 6 grouped-query attention layers (2 KV groups), 23 MoE layers — 52 layers total. Each MoE layer: 128 routed experts + 1 always-on shared expert, top-6 routing. 30B total params, 3.5B active per token** (the marketing "A3B" rounds 3.5B down).

> "The model employs a hybrid Mixture-of-Experts (MoE) architecture, consisting of 23 Mamba-2 and MoE layers, along with 6 Attention layers. Each MoE layer includes 128 experts plus 1 shared expert, with 6 experts activated per token. The model has 3.5B active parameters and 30B parameters in total."
> — *NVIDIA-Nemotron-3-Nano-30B-A3B-BF16 model card*, NVIDIA, 2026, https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16, accessed 2026-05-01.

> "The model backbone interleaves three key components: 23 Mamba selective state-space layers for efficient long-context processing; 23 MoE layers with 128 experts, top-6 routing, and a shared expert for conditional capacity; and 6 grouped-query attention layers to preserve strong global interaction and expressivity."
> — *Introducing NVIDIA Nemotron 3 Nano Omni* (HF blog), NVIDIA, 2026, accessed 2026-05-01.

### Sub-topic 11 — Routing is token-level, not modality-level (anti-claim)

**No primary source backs "experts activate per modality" as a structural property of the router.** Across all primary sources read in full, every routing description is standard token-level top-k. The closest claim in NVIDIA's marketing language is "activates the expert required for each task and modality, for high throughput", which is consistent with token-level routing learning to specialize on tokens drawn from different modality streams — not a modality-conditioned gate.

**The post must say:** "experts specialize and the router learns to send modality-specific tokens to them," not "there is a per-modality gate." This is a load-bearing correction; the seed blog's framing overstates what the report actually claims.

### Sub-topic 12 — Nemotron training pipeline numbers

Omni model card SFT totals (larger than the seed blog's "127B/124M" framing because the model card sums all SFT data):

> "354,587,705 data points (~717.0B tokens) … text+audio: 259,178,821 samples (~143,533.1M tokens); text+image: 70,143,901 samples (~180,347.1M tokens); text+video: 15,837,673 samples (~239,631.5M tokens); text+video+audio: 8,720,044 samples (~152,499.2M tokens); text: 707,187 samples (~958.4M tokens)."
> — *Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16 model card*, NVIDIA, 2026, accessed 2026-05-01.

Tech report: staged SFT (~467B tokens / 434M samples across stages 0-6); stages 0-3 do vision+audio alignment, 4-6 do joint omni SFT. RL on ~120K prompts.

> "we generated approximately 11.4M synthetic QA pairs (~45B tokens) from a large corpus of real-world PDFs"
> — HF blog, accessed 2026-05-01.

**Context scaling**: 16K → 49K → 262K progression maps onto staged SFT — stage 1 at 16,384; stage 5 at 49,152; stage 6 at 262,144. The base Nano model card claims a 1M ceiling but ships 256K HF configs by default for VRAM.

> "16384 → 49,152 tokens → 262,144 tokens across Stages 1, 5, and 6 respectively." — tech report.

**License**: NVIDIA Nemotron Open Model License (model-family primary). Per-checkpoint cards may downgrade to NVIDIA Open Model Agreement.

### Sub-topic 13 — Mamba and the SSM rationale

**Mamba v1: selection + linear-time inference.** Selection makes the SSM's state-update matrices functions of the input, breaking the convolutional fast-path; the paper introduces a hardware-aware parallel scan to keep training fast.

> "Letting the SSM parameters be functions of the input addresses their weakness with discrete modalities, allowing the model to selectively propagate or forget information."
> "Mamba enjoys fast inference (5× higher throughput than Transformers) and linear scaling in sequence length."

Citation: *Mamba: Linear-Time Sequence Modeling with Selective State Spaces*, Gu & Dao, 2023, arXiv:2312.00752, accessed 2026-05-01. **(Foundational, exempt from 18-month rule.)**

**Mamba-2: state-space duality (SSD).** Selective SSMs and a restricted form of attention turn out to be two faces of the same matmul structure. Mamba-2's layer maps cleanly onto matmul hardware:

> "Our state space duality (SSD) framework allows us to design a new architecture (Mamba-2) whose core layer is a refinement of Mamba's selective SSM that is 2-8X faster, while continuing to be competitive with Transformers."

Citation: *Transformers are SSMs*, Dao & Gu, 2024, arXiv:2405.21060, accessed 2026-05-01.

**Why hybrid: Nemotron-H quantifies the rationale and the layer ratio.** ~8% attention layers (the rest Mamba-2) because pure-Mamba models suffer on certain in-context retrieval tasks.

> "Roughly 8% of the total layers in the model are self-attention layers; these layers are evenly dispersed throughout the model."
> "Nemotron-H-56B-Base can generate 2.4× more output tokens per second per GPU compared to Qwen-2.5-72B and Llama-3.1-70B."
> — *Nemotron-H: A Family of Accurate and Efficient Hybrid Mamba-Transformer Models*, NVIDIA, 2025, arXiv:2504.03624, accessed 2026-05-01. **(Recent.)**

The 56B base reports "54 Mamba-2, 54 MLP, and 10 Self-Attention layers" with the long-context measurement explicit:

> "On longer contexts (65536 input sequence length, 1024 output tokens) with NVIDIA H100 GPUs, we measure a 2.9x speedup for the 47B compared to Qwen-2.5-72B and Llama-3.1-70B."
> — Nemotron-H research page, NVIDIA ADLR, 2025, accessed 2026-05-01.

Nemotron 3 Nano's 6 attention / 46 non-attention pattern is ~11.5%, slightly higher than Nemotron-H's 8% — consistent with the "preserve strong global interaction" framing on the HF blog.

**Jamba — independent confirmation of the hybrid pattern.**

> "Jamba interleaves blocks of Transformer and Mamba layers, enjoying the benefits of both model families."
> — *Jamba: A Hybrid Transformer-Mamba Language Model*, AI21 Labs, 2024, arXiv:2403.19887, accessed 2026-05-01.

### Sub-topic 14 — MoE expert routing

**Switch Transformer — k=1 routing, decouple params from compute.**

> "We simplify the MoE routing algorithm and design intuitive improved models with reduced communication and computational costs."
> "The result is a sparsely-activated model — with outrageous numbers of parameters — but a constant computational cost."

Citation: *Switch Transformers*, Fedus, Zoph, Shazeer, 2021, arXiv:2101.03961. *(Foundational.)*

**Mixtral 8x7B — top-2 routing, 47B total / 13B active. The closest direct analogue for "A3B" naming.**

> "For every token, at each layer, a router network selects two experts to process the current state and combine their outputs."
> "Each token has access to 47B parameters, but only uses 13B active parameters during inference."

Citation: *Mixtral of Experts*, Mistral AI, 2024, arXiv:2401.04088, accessed 2026-05-01.

Nemotron 3 Nano scales the same idea: top-6 of 128 routed experts + 1 shared expert. Per-token, just like Mixtral.

### Sub-topic 15 — NVFP4 quantization

**Format: E2M1 + per-block FP8 E4M3 micro-scale + per-tensor FP32 global scale.** Two-level scaling at a 16-element block — finer than MXFP4's 32-element block.

> "NVFP4 employs a dual-tier approach: 1 shared FP8 scale per 16 value block (E4M3) and 1 FP32 per tensor second-level scaling factor … applies a fine-grained E4M3 scaling factor to each 16-value micro-block, a compact subset of the larger tensor, while also leveraging a second-level FP32 scalar applied per tensor."
> "NVFP4 reduces the model memory footprint by approximately 3.5x relative to FP16, and approximately 1.8x compared to FP8."

Accuracy:
> "1% or less accuracy degradation on key language modeling tasks … when [DeepSeek-R1-0528 is] quantized from its original FP8 format to NVFP4."

Citation: *Introducing NVFP4 for Efficient and Accurate Low-Precision Inference*, NVIDIA Developer Blog (primary author technical post), 2025, https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/, accessed 2026-05-01.

**NVFP4 in Nemotron 3 Nano Omni — mixed-precision recipe.** Only routed MoE experts are 4-bit; Mamba projections, shared experts, and attention `o_proj` stay FP8; vision/audio encoders stay BF16.

> "The NVFP4 variant uses a mixed-precision recipe inspired by Nemotron 3 Super: routed MoE experts are quantized to NVFP4 (FP4 E2M1 values with per-block FP8 E4M3 scales over groups of 16 elements and an additional per-tensor FP32 global scale), while the Mamba in_proj / out_proj, shared experts, and attention o_proj are quantized to FP8, yielding 4.98 effective bits per weight (20.9 GB). In both variants the vision and audio encoders and their MLP projectors are kept in BF16."
> "Across 9 multimodal benchmarks, both quantized variants stay within 1 point of BF16 on average." [BF16: 65.80, NVFP4: 65.43]

Citation: *Nemotron-3-Nano-Omni-30B-A3B-Reasoning-NVFP4 model card*, NVIDIA, 2026, https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-NVFP4, accessed 2026-05-01.

**Load-bearing fact for the post:** BF16 is 61.5 GB, FP8 is 32.8 GB, NVFP4 is **20.9 GB**, and the multimodal accuracy delta is −0.38 points on average.

**FP8 background.** Two formats: E4M3 (activations/weights), E5M2 (gradients).

> "E4M3 (4-bit exponent and 3-bit mantissa) and E5M2 (5-bit exponent and 2-bit mantissa). … E5M2 adheres to IEEE 754 standards for special values, E4M3 omits infinities and uses a single NaN representation to maximize dynamic range."

Citation: *FP8 Formats for Deep Learning*, Micikevicius et al. (NVIDIA, Arm, Intel), 2022, arXiv:2209.05433. *(Foundational.)*

NVFP4 reuses E4M3 *as the per-block scale factor* — Blackwell already has hardware for E4M3, so the micro-scale is free.

### Sub-topic 16 — Inference cost claims that hold up vs ones that don't

**Hold up:**
1. Nemotron-H, NVIDIA, 2025: 2.9× output-tokens/sec/GPU vs Qwen-2.5-72B and Llama-3.1-70B at 64K input + 1K output on H100.
2. Nemotron 3 Nano Omni model card / HF blog: 9× output tokens/sec/GPU and 3× single-stream output token throughput vs Qwen3-Omni 30B-A3B on B200, at fixed interactivity target.
3. NVFP4 vs BF16 on Nemotron 3 Nano Omni reasoning: 20.9 GB vs 61.5 GB weights, 65.43 vs 65.80 on the 9-benchmark mean.

> "Compared to other open omni models with the same interactivity, Nemotron 3 Nano Omni delivers 7.4x higher system efficiency for multi-document use cases and 9.2x higher system efficiency for video use cases. … leading another open-weights omni model, Qwen3-Omni 30B-A3B, in many domains."
> — HF blog, accessed 2026-05-01.

**Don't hold up at primary-source bar:**
- The "4× improved memory and compute efficiency" line in the developer-launch post — no single-statement primary anchor. Treat as marketing rollup; cite Nemotron-H's 2.9× speedup numbers when concretely needed.
- Exact concurrency or prompt-length distribution behind the 7.4×/9.2× system-throughput claims — the technical report's Figure 1 caption commits only to "fixed per-user interactivity threshold (tokens/sec/user)" without nailing concurrency.
- Cascade ASR-LLM latency-hop cost in agent loops — no controlled benchmark. Latency claims must stay qualitative.

### Sub-topic 17 — Anti-claims to avoid in the draft

These are false or unbacked-at-primary-source claims that the post must not silently propagate from the marketing material:

1. **"Experts activate per modality."** Wrong shape. Routing is token-level top-k. Phrase as "experts specialize and the router learns to send modality-specific tokens to them."
2. **"4× improved memory and compute efficiency."** No primary anchor. Use Nemotron-H's measured 2.9× output-tokens/sec/GPU number, or the NVFP4 weight footprint (61.5 → 20.9 GB).
3. **30s/30fps/256-tokens-per-frame ≈ 230k tokens math.** Replace with EVS's primary-sourced framing: "a two-minute video at 24 FPS produces more than two million vision tokens" (arXiv:2510.14624).
4. **"Stitched chains add latency"** without a number. The Tsiamas paper backs *prosody loss* in cascade speech systems; latency-hop cost has no controlled-benchmark primary source. Keep it qualitative.

### Recency check (18-month rule, today 2026-05-01, cutoff 2024-11-01)

Sources newer than the cutoff:
1. *SigLIP 2*, arXiv:2502.14786, **v1 2025-02-20**.
2. *Qwen2.5-VL*, arXiv:2502.13923, **v1 2025-02-19**.
3. *Qwen2.5-Omni*, arXiv:2503.20215, **v1 2025-03-26**.
4. *Nemotron 3 Nano Omni* technical report and model cards, **2026-04-27/28**.
5. *Nemotron-H*, arXiv:2504.03624, **v1 2025-04-04**.
6. *EVS*, arXiv:2510.14624, **v1 2025-10-16**.
7. *Tsiamas et al. prosody*, arXiv:2410.24019, **v1 2024-10-31** (just barely past cutoff).

Foundational sources exempt from the 18-month rule because they introduce a concept: CLIP, SigLIP, Whisper, Flamingo, BLIP-2, LLaVA/LLaVA-1.5, Chameleon, Gemini, Mamba v1, Mamba-2, Mixtral, Jamba, Switch Transformer, FP8 Formats, ViViT, TimeSformer, VideoMAE/VideoMAE V2.

Three-recent-primary-source bar: passed comfortably.

## Outline

(Phase 3 — pending.)

## Codex outline review

(Phase 4 — pending.)

## Resume here

Last touched: 2026-05-01.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Topic + audience lock-in | done | this file's `## Spec` |
| 2. Deep research | done | this file's `## Research notes` |
| 3. Outline + figure list | in progress | this file's `## Outline` (incl. per-figure type) |
| 4. Codex gate 1 | pending | this file's `## Codex outline review` |
| 5. Draft prose | pending | `src/content/blog/omni-modal-stack/index.mdx` |
| 6. Implement figures | pending | per-figure table below (populate at end of Phase 3) |
| 7. Playwright visual review | pending | playwright snapshots reviewed |
| 8. Codex gate 2 + ship | pending | hero image, dev verification, ship |

### Phase 6 figure progress

(Populate at end of Phase 3.)

### Suggested next batch

Phase 3: write `## Outline` with per-figure type. Then Phase 4: codex gate 1 challenge against spec + research notes + outline. Outline must thread through the 17 research sub-topics in narrative order, lock per-figure type for ~10-14 figures, and bake in the four anti-claims from Sub-topic 17 so the draft doesn't quietly propagate marketing framing.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Research notes / Outline / Codex review carry every locked-in choice.
2. `git log --oneline | head -30` to see commits since the spec commit.
3. `grep -n TODO src/content/blog/omni-modal-stack/index.mdx` for remaining placeholders.
4. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

Voice-check exits clean before each commit. Em dashes: zero. Banned words: justify or rewrite. Kit primitives are exhaustive (no new primitives without explicit user approval). Per-figure type is locked at Phase 3. One section per commit, one figure per commit. `draft: false` from Phase 1 onward; do not flip it between commits.
