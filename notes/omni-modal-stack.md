# Omni-Modal Stack — explainer notes

## Spec

**Slug:** `omni-modal-stack` (mirrors prequel `unified-vision-stack`).

**Working title:** *The Unified Multimodal Stack*. Backup: *Adding Ears to One Eye*.

**Description:** An end-to-end, intuition-first explanation of how modern multimodal models are wired, and why moving from a vision backbone to a four-modality model is harder, and more interesting, than "plug in more encoders."

**Audience:** Engineers new to multimodal/agent stacks, technically literate (comfortable with transformer attention, embeddings, contrastive losses), but not specialists. Reader has either read the prequel `unified-vision-stack` or can be pointed back to it for the C-RADIOv4 setup.

**Target length:** ~45-minute read. Density over coverage. `essay: true` for 3-tier heading hierarchy.

**Hook:** Pick up where the prequel ended. C-RADIOv4 is a unified vision backbone whose teachers include SigLIP2, and its SigLIP-aligned head can produce features that live in the same geometry as caption embeddings. So why does Nemotron 3 Nano Omni still ship a separate text tokenizer and a 30B autoregressive decoder? Cracking that puzzle surfaces the central design choice: SigLIP-style alignment is contrastive over caption-shaped pairs; it ranks captions, it does not generate language. The text decoder is doing a job SigLIP was never trained for. Once that lands, the rest of the architecture falls out naturally.

**Load-bearing claim the reader walks away with:** Wiring a multimodal model from a vision backbone takes three architectural moves, in order:

1. **A text-centric autoregressive decoder.** The LLM sits in the middle. Every other modality is encoded into a sequence of tokens that flows into the decoder's context. Why this beats the alternatives (multi-decoder fusion, encoder-only contrastive stacks, stitched chains).
2. **Modality-specific encoders, because a pixel grid is not a spectrogram is not a video clip.** Why audio needs Parakeet (or a Whisper-style encoder), why video needs 3D conv plus a learned temporal sampler, why those cannot just be more SigLIPs.
3. **Token-budget mechanisms, because raw multimodal context blows the inference math.** EVS for video, expert routing for compute, Mamba layers for long-sequence memory, NVFP4 for memory bandwidth. The cost discipline is what makes the whole thing shippable.

**Structural shape (high level; figure list is locked at Phase 3):**

- Recap (one short section). Hand the reader C-RADIOv4 from the prequel. Re-introduce SigLIP2 inside it.
- **Act 1 — The puzzle.** Why C-RADIOv4 plus a text head is not enough. Contrastive vs autoregressive. What "alignment" actually means. The text decoder as a generative organ, not a similarity scorer.
- **Act 2 — The decoder-centric architecture.** Three ways to wire vision into a language model: stitched (Whisper plus LLM), parallel adapters (LLaVA, BLIP-2, Flamingo), unified-encoders-into-one-decoder (Nemotron 3 Nano Omni's choice). Walk tradeoffs. Land worked example.
- **Act 3 — The other modalities.** Audio: why Parakeet, what spectrogram encoders give you, why Whisper's stitched approach hurts agent loops. Video: why 3D convolutions, the frame-budget problem, EVS as the load-bearing trick that makes long video viable in one decoder context.
- **Act 4 — The inference math.** Hybrid Mamba+Transformer MoE. Token-level expert routing (and why "per-modality routing" is a marketing simplification). NVFP4 quantization. The Nemotron-specific efficiency receipts (Nemotron-H 2.9× vs Qwen-2.5-72B / Llama-3.1-70B; Nemotron 3 Nano Omni vs Qwen3-Omni 30B-A3B; NVFP4 weight footprint). What that means for production agents — without overclaiming a general "unified beats fragmented" theorem the primary sources don't actually prove.
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

## Throughline

*Pre-v2 post; throughline added retroactively after the v2 skill rewrite (2026-05-02). Throughline thread for this post is implicit rather than explicit: the recurring real-world scenario is **Nemotron 3 Nano Omni** (NVIDIA's April 2026 omni-modal model), which surfaces in every act as the worked example.*

**How it threads (post-hoc analysis):**
- Recap: hand the reader C-RADIOv4 from the prequel (the vision spine that Nemotron 3 Nano Omni still uses).
- Act 1 (the puzzle): Nemotron 3 Nano Omni ships a 30B autoregressive decoder despite having a SigLIP-aligned C-RADIOv4 head. Why?
- Act 2 (decoder-centric architecture): walk the three wiring options, land on Nemotron 3 Nano Omni's choice (unified-encoders-into-one-decoder).
- Act 3 (other modalities): Parakeet for audio, EVS for video — both are Nemotron 3 Nano Omni's specific picks.
- Act 4 (inference math): Nemotron-H 2.9× receipts, NVFP4 weight footprint, Nemotron 3 Nano Omni vs Qwen3-Omni 30B-A3B.
- Coda: what's still missing in Nemotron 3 Nano Omni (no tool-use evals, no native planning).

The post is not Nemotron-centric in framing (architecture-centric, with Nemotron as the most recent worked example), but the throughline analysis post-v2 confirms the scenario is the through-line whether or not it was named that way during Phase 1.

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

Citation: *Speech is More Than Words: Do Speech-to-Text Translation Systems Leverage Prosody?*, Tsiamas, Sperber, Finch, Garg, 2024, arXiv:2410.24019 (v1 2024-10-31), accessed 2026-05-01. **(One day older than the 18-month cutoff of 2024-11-01; counts as foundational background, not as one of the recent primary sources for the 3-recent-primary bar.)**

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

(*Tsiamas et al. prosody*, arXiv:2410.24019, v1 2024-10-31 is one day older than the cutoff — used as foundational background only, not counted in the recent-primary-source bar per codex's catch.)

Foundational sources exempt from the 18-month rule because they introduce a concept: CLIP, SigLIP, Whisper, Flamingo, BLIP-2, LLaVA/LLaVA-1.5, Chameleon, Gemini, Mamba v1, Mamba-2, Mixtral, Jamba, Switch Transformer, FP8 Formats, ViViT, TimeSformer, VideoMAE/VideoMAE V2, Tsiamas et al. prosody.

Three-recent-primary-source bar: passed comfortably (six recent primaries listed above).

## Claim-source matrix

*Pre-v2 post; matrix not retroactively populated. The post predates the v2 skill rewrite (2026-05-02) which makes the claim-source matrix a Phase 2 deliverable. Claim-to-source backing for this post is captured implicitly in the `## Research notes` section above (every load-bearing claim has a quoted primary source under one of the 17 sub-topic headings). For Phase 7 freshness re-check and Gate 2, the source list to walk is the union of the sub-topics' primary citations plus the post's `### References` section.*

## Outline

Three-act structure plus a recap and a coda, mirroring the prequel's shape (set up the problem → decompose into mechanisms → reassemble). Section numbering matches the prequel convention: numbered sections (`### 1.`, `### 2.`, …) with act dividers between major narrative turns.

Total: 18 sections, 14 figures. **12 static-svg, 2 interactive-canvas.** ~80% static / 20% interactive matches the spec's "mostly static, lean static" preference. Interactive figures are reserved for the two places where a parameter sweep is the load-bearing intuition: video-token explosion (the cost is so counterintuitive a static plot understates it) and EVS pruning (the q-percentile sweep IS the mechanism).

### Section structure

#### Recap

**1. A single eye, three teachers.** Hand the reader C-RADIOv4 from the prequel: a vision backbone that distilled DINOv3 + SigLIP2 + SAM3 into one student. Re-establish the SigLIP2 inheritance specifically — the student carries a SigLIP-aligned head that produces caption-geometry features when called. The unified backbone embedding is the agglomerative summary; the SigLIP alignment is read through the head, not the backbone directly. Set up the puzzle for Act 1.

#### Act 1 — The puzzle

*Why a vision backbone with SigLIP-aligned features still isn't enough to talk to.*

**2. The SigLIP puzzle.** SigLIP2 was one of C-RADIOv4's teachers, and the SigLIP-aligned head on top of the backbone produces caption-geometry features on demand. Surely we just bolt on a text head and we're done? No. SigLIP scores; it doesn't generate.

**3. Contrastive vs autoregressive.** What CLIP and SigLIP actually do (cosine similarity between pooled embeddings; symmetric cross-entropy over a similarity matrix). The text encoder collapses sentences to one vector. SigLIP 2 added a caption-decoding loss but threw the decoder away. There is no per-token next-token distribution exposed by these towers.

**4. The text decoder is a different organ.** What the LLM brings that contrastive towers cannot: tokenizer, learned token embeddings, autoregressive generation, full vocabulary. The vision encoder is a perception summary; the decoder is a language generator. This is the central design choice the rest of the post is structured around.

#### Act 2 — Three ways to wire it up

*Once you know you need a generative LLM, the question is how you feed it.*

**5. The adapter zoo: Flamingo, BLIP-2, LLaVA.** Frozen LLM, vision bolted on as a side-loaded computation. Flamingo's gated cross-attention with `tanh(α=0)` initialization; BLIP-2's Q-Former bottleneck; LLaVA's MLP projection that re-embeds vision features as soft tokens. Each kept the LLM frozen at training; each treats vision as a translated side-channel that the LLM never learns to consume during its own pretraining. (Qwen2.5-VL is a bridge case — it inherits the MLP projector pattern from LLaVA but trains the LLM jointly with a from-scratch ViT, so it sits between this section and the next. We'll handle it where it actually belongs in §6.)

**6. Native multimodal: one decoder, one sequence.** The structural alternative — one decoder consumes a single token stream containing every modality, and the LLM is trained jointly on the joint distribution rather than reading a translated side-channel. Two flavors: discrete-token shared vocabulary (Chameleon) and continuous *projected* encoder embeddings concatenated into the LLM's hidden space (Gemini, Qwen2.5-Omni, Nemotron 3 Nano Omni). Note "projected" — the LLM never sees raw pixels, raw waveform, or raw video frames; it sees the output of modality-specific encoders that have been MLP-projected into the LLM's embedding dimension. Qwen2.5-VL fits here as a vision-only special case where the projector pattern is preserved but the LLM is jointly trained.

**7. The tradeoff.** Adapter style: cheap to train, swaps any LLM in, but the language model never learns the joint distribution. Unified-decoder style: native multimodal reasoning, but full retraining, much more data, much more compute. Where Nemotron 3 Nano Omni sits ("encoder-projector-decoder," tech report §2). Hand off: "now let's add the other senses."

#### Act 3 — The other senses

*Why audio and video aren't more SigLIPs.*

**8. Audio is time-frequency, not pixel grid.** Modern audio encoders consume a log-mel spectrogram (16 kHz, 25 ms windows, 80-channel mel — Whisper §2.2). A vision-style 2D ViT can't be reused — the inductive biases are wrong (frequency channels aren't pixels, time isn't a 2D direction). This is what the "more SigLIPs" framing collapses.

**9. Parakeet: a token-emitting audio encoder.** What Nemotron actually uses. FastConformer encoder + TDT decoder, 600M params, 8× temporal subsampling. In Nemotron 3 Nano Omni, Parakeet's encoder activations feed the LLM via a 2-layer MLP projector — *not* a transcript. This is the "ingest audio tokens directly" path of the unified-decoder design.

**10. The cost of stitched chains.** Whisper-then-LLM is the alternative. Whisper §3.8 documents repetition loops in greedy decoding and window-to-window error propagation. Tsiamas et al. construct a controlled benchmark and find that cascade systems with text-only intermediate representations transmit prosody to a *lesser* extent than end-to-end systems, with the gap depending on transcript surface form ("GERMAN teachers" vs "German TEACHERS" is one of their stress examples). The post should frame this as a degree-of-loss claim, not an absolute "cannot transmit." Qwen2.5-Omni's Thinker/Talker hidden-state coupling is the structural answer: the speech generator never sees a transcript, only the LLM's hidden states. Latency claims kept qualitative — no controlled benchmark at the primary-source bar.

**11. Video is spatiotemporal redundancy.** EVS framing: a two-minute video at 24 FPS produces over two million vision tokens, far past any LLM's context. ViViT's tubelet idea (fuse pairs of frames at extraction). TimeSformer's cost ceiling: joint full space-time attention OOMs at 32 frames or 448 px. VideoMAE: 90-95% mask ratios reconstruct cleanly — temporal redundancy is structural.

**12. Efficient Video Sampling.** The load-bearing trick of Nemotron 3 Nano Omni's video path. Build the intuition first with the simplest case the EVS paper presents — RGB-space L1 difference between corresponding patches at consecutive frames (`D_{p,t} = ‖p_t − p_{t−1}‖_1`, threshold at the q-th percentile, mask out patches below threshold). That's the conceptual move. Then surface the production detail: in Nemotron 3 Nano Omni, EVS runs *after* the vision encoder, so the similarity is computed on encoded patch features rather than raw RGB. The EVS paper itself uses feature-level similarity in its uptraining tables; the algorithm's structure is identical, only the input space changes. Position-preserving (selected patches keep their original spatial-temporal indices so M-RoPE / RoPE still works). Training-time stochastic compression: q sampled from a beta distribution, so the model is invariant to inference-time q. Reported results, kept separate because they measure different things: "up to 4× LLM TTFT speedup with minimal accuracy loss" (EVS paper, abstract-level claim, varies by model and q); and "Video-MME at 32 frames drops 1.23% (65.50 → 64.70) with q=0.75 uptraining" (EVS paper, specific uptraining table). Do not bundle these into a single "4× at q=0.75" sentence.

**13. Conv3D + EVS in Nemotron.** The two-stage video reduction Nemotron 3 Nano Omni actually ships. Conv3D tubelet path that fuses pairs of frames before the ViT (a 2× reduction at extraction). EVS at inference time on top (typically another 2-4×). Image-side patch range: 1,024 to 13,312 patches per image, depending on resolution. Hand off: "the model can now see, hear, and watch. What does it cost to run?"

#### Act 4 — The inference math

*The Nemotron-specific efficiency receipts, and what they actually show.*

The honest framing: there is no controlled benchmark at the primary-source bar that proves "unified-decoder beats fragmented chains" in general. What we *do* have are three separate measured efficiency wins on specific models against specific baselines, plus the architectural reasons each one shows up. The post reports the numbers, names the baselines, and stops there.

**14. The hybrid backbone.** Nemotron 3 Nano 30B-A3B layer composition: **23 Mamba-2 + 6 grouped-query attention + 23 MoE = 52 layers; 128 routed experts + 1 shared per MoE layer; top-6 routing; 30B total, 3.5B active per token.** The "A3B" naming convention rounds 3.5B down. The model card states the layer counts and routing top-k directly; the exact placement of attention layers within the stack (interleaved vs grouped) is not stated in any quoted primary source — Nemotron-H's "evenly dispersed" quote is for a different model. The post should report the counts and top-k as stated, and avoid claiming a specific placement pattern unless we find a config file or quote that backs it. Same caution applies to the GQA group count — the HF blog mentions GQA without naming the KV-group count, so this should be read off the published config.json (link to it) rather than asserted in prose. **Anti-claim explicitly handled:** routing is token-level top-k, *not* per-modality. Experts specialize and the router learns to send modality-specific tokens to them; that's how token-level routing on multimodal data behaves, but it isn't a modality-conditioned gate.

**15. Why Mamba: selection plus linear-time inference.** Mamba v1 makes SSM state-update matrices functions of the input, breaking the convolutional fast-path and adding hardware-aware parallel scan. Mamba-2 SSD: 2-8× faster core layer. Nemotron-H: 2.9× output tokens/sec/GPU at 64K input vs Qwen-2.5-72B and Llama-3.1-70B on H100. Hybrid is forced because pure-Mamba is weak on retrieval and pure-Transformer is quadratic. Nemotron-H's 8% attention vs Nemotron 3 Nano's ~11.5% reflect the same tradeoff dial.

**16. MoE expert routing: total vs active.** Switch + Mixtral set the template — top-k routing, decouple parameters from compute. Mixtral's 47B total / 13B active per token is the closest direct precedent for "A3B" naming. Nemotron 3 Nano's 30B / 3.5B active works the same way at a smaller scale.

**17. NVFP4: 4-bit weights, mixed-precision recipe.** Format: E2M1 values + per-block FP8 E4M3 micro-scale + per-tensor FP32 global scale, 16-element blocks (finer than MXFP4's 32). Mixed precision in Nemotron 3 Nano Omni: only routed MoE experts are 4-bit; Mamba projections, shared experts, and attention `o_proj` stay FP8; vision/audio encoders stay BF16. **Memory: BF16 = 61.5 GB, FP8 = 32.8 GB, NVFP4 = 20.9 GB. Accuracy delta: 65.43 vs 65.80 on the 9-benchmark mean (0.38 point drop).** Anti-claim explicitly handled: the "4× memory and compute efficiency" line in the dev blog has no single-statement primary anchor; we'll cite Nemotron-H's measured 2.9× and the NVFP4 weight footprint instead.

#### Coda

**18. What's still missing.** No tool-use evals (no AgentBench / BFCL / GAIA in the report). The "agent reasoning" framing is mostly perception — Nemotron 3 Nano Omni positions itself as a "multimodal perception-and-context sub-agent within larger agentic systems," not a planner. What a follow-up post might cover: native tool use, structured planning, multi-step reasoning traces. Closing on the small concrete point: the post just walked through how to wire perception. The reasoning loop is still being built.

### Figure list

Per-figure type is **locked here**. Cannot be silently re-typed in Phase 6. If a figure's mechanism turns out to need a different type during implementation, halt and discuss before re-typing.

| # | Figure | Type | Mechanism / what to show | Reader notices |
|---|---|---|---|---|
| 1 | C-RADIOv4 with three teachers | static-svg | Three-teacher distillation diagram (DINOv3, SigLIP2, SAM3 → C-RADIOv4 student). Mirror prequel Fig 7 layout. | The student inherits SigLIP2's text alignment as one of three signals, not all of them. |
| 2 | Contrastive vs autoregressive panel | static-svg | Left: SigLIP-style scoring (image vector ↔ caption vector, dot product, top-N matched captions). Right: LLM autoregressive generation (token sequence with conditional next-token softmax). | One produces a number; the other produces a token stream. They are different operations, not different sizes of the same operation. |
| 3 | The decoder zoo: Flamingo / BLIP-2 / LLaVA | static-svg | Three-panel side-by-side. Flamingo: gated cross-attention into frozen LLM with `tanh(α=0)` annotation. BLIP-2: Q-Former with learned queries between two frozen models. LLaVA: linear projection from CLIP features straight into LLM token space. | The shapes are different but the principle is the same — LLM is frozen, vision is bolted on. |
| 4 | The information-flow boundary | static-svg | Narrowed to a single contrast (Fig 3 already covers the adapter shapes). Left: side-channel projection — the LLM's pretraining loss is text-only and the projected vision tokens enter at inference / fine-tune time only. Right: one decoder context — projected modality embeddings flow into the LLM's input sequence and the LLM's loss is computed jointly over the multimodal stream during training. The pixels-vs-projected-tokens distinction is annotated explicitly: in both panels the LLM sees *projected* embeddings, never raw modality data. | The boundary that actually separates adapter-style from unified-decoder is whether the LLM's training loss saw multimodal sequences, not whether the encoder is bolted on or hardwired. |
| 5 | Audio as a log-mel spectrogram tile | static-svg | A 1-second audio waveform on the left → an 80-channel × 100-frame log-mel spectrogram tile on the right, with axes labeled (time, frequency channel). | Audio's natural representation is a 2D matrix where one axis is time and the other is frequency — not pixels and not 1D. |
| 6 | Parakeet pipeline + integration | static-svg | Two stacked diagrams. Top: Whisper-style cascade — audio → mel → encoder → autoregressive decoder → text → LLM. Bottom: Nemotron-style — audio → mel → FastConformer encoder → MLP projector → LLM (no transcript hop). | The transcript bottleneck is the architectural difference. The bottom path keeps the encoder activations alive; the top path collapses them to text. |
| 7 | Video token explosion | **interactive-canvas** | Sliders for clip duration (1 s to 5 min), FPS (1-30), and patches-per-frame (256-1024). Live token count on the right, displayed against a horizontal "context window" bar (262K tokens for Nemotron). The bar overflows fast. Annotation: "naive: N×F", "tubelet: N×F/2", "tubelet+EVS: 0.25×N×F/2" curves overlaid as colored lines. | The cost grows so fast that compression isn't optional — even modest durations blow the context. The three lines show why each compression stage exists. |
| 8 | EVS patch pruning | **interactive-canvas** | A side-by-side "frame t-1 / frame t" view. A slider for q (0.0 to 0.95). At q=0.0 all patches are kept; as q rises, patches with low patch-similarity (RGB L1 used as the visual intuition; in production the similarity is computed on encoded features) grey out and drop. A small live counter: "kept N of M patches" + "LLM prefill tokens reduced by (1−q)×". The figure shows token-count reduction, not full-system TTFT — the EVS paper separates LLM prefill speedup from full-VLM TTFT (which includes vision-encoder overhead), and figcaption should make this distinction explicit. | The dropped patches are the static parts of the scene. What survives is exactly the motion — which is what the model needs to reason about temporally. |
| 9 | Conv3D + EVS pipeline in Nemotron | static-svg | Five-stage pipeline: raw frames → Conv3D tubelet (pairs fused) → ViT → EVS pruning → LLM. Annotated with the reduction factor at each stage (×0.5 from tubelet, ×0.25 from EVS at q=0.75). | Two compounding compressions, not one. Each sits in a different place in the pipeline (extraction vs post-encoder). |
| 10 | Hybrid backbone layer composition | static-svg | A vertical stack of 52 layers, each colored by type: Mamba-2 (23, blue), GQA (6, rust), MoE (23, green). Layer arrangement shown is illustrative — the published model card and HF blog state the counts and the top-k routing but do not state the exact within-stack ordering of attention layers; the figure should annotate this honestly ("counts from the model card; placement is illustrative — the exact within-stack ordering is not stated in primary sources for this model"). Side annotations limited to what *is* sourced: "30B total / 3.5B active per token", "128 experts + 1 shared per MoE layer, top-6 routing", "~11.5% of layers are attention". | ~11.5% of layers are attention. The rest is Mamba or MoE. The exact placement is left as configuration the reader can look up. |
| 11 | Mamba vs Transformer compute scaling | static-svg | Two curves on a context-length x-axis (1K to 1M tokens). Transformer: quadratic. Mamba: linear (with a small offset). Italic curve labels matching the prequel's Fig 2 style. Reference points marked: 16K, 49K, 262K (Nemotron context-scaling stages). | The crossover is well below the model's max context — by the time you're at 49K tokens, Mamba is already a large win. |
| 12 | MoE expert routing on a token | static-svg | A single token's pass through one MoE layer. Router scores 128 experts; top-6 selected (highlighted); shared expert always-on. Output is the weighted sum. | Routing is per-token, not per-modality. The same router sees all modality tokens and learns specialization through training, not architecture. |
| 13 | NVFP4 layout | static-svg | One row of 16 weights laid out as E2M1 4-bit values, with the per-block FP8 E4M3 scale annotation above and the per-tensor FP32 scale at the side. Memory accounting at the bottom: BF16 → FP8 → NVFP4 sizes for the 30B model (61.5 / 32.8 / 20.9 GB). | Two levels of scaling. The micro-scale is FP8 because Blackwell already has E4M3 hardware; the global scale is FP32 to keep tensor-wide range. |
| 14 | Evidence ledger | static-svg | A four-row table, not another architecture diagram. Each row: claim, mechanism that delivers it, source-backed number with baseline, and limitation. Row 1: "Long-context throughput" / "Mamba layers replace quadratic attention" / "Nemotron-H 2.9× output tokens/sec/GPU vs Qwen-2.5-72B and Llama-3.1-70B at 64K input on H100 (arXiv:2504.03624)" / "Different model from Nemotron 3 Nano Omni; cited as architectural evidence." Row 2: "System throughput at fixed interactivity" / "Token-level expert routing keeps active params small" / "Nemotron 3 Nano Omni 9× output tokens/sec/GPU vs Qwen3-Omni 30B-A3B on B200 (HF blog)" / "Concurrency and prompt distribution not single-statement-quoted." Row 3: "Memory footprint" / "NVFP4 mixed-precision recipe" / "61.5 GB BF16 → 32.8 GB FP8 → 20.9 GB NVFP4; 9-benchmark mean drops only 0.38 points" / "Routed experts only; encoders stay BF16." Row 4: "Prosody preservation" / "Hidden-state coupling vs transcript bottleneck (Qwen2.5-Omni Talker)" / "Tsiamas et al. 2024 controlled benchmark on cascade prosody loss" / "Degree-of-loss claim, not absolute; no controlled benchmark for end-to-end agent latency hop." | Three architectural moves from Acts 2–4 each buy one specific, source-backed efficiency win. None of them prove "unified beats fragmented" as a theorem; together they explain why the Nemotron-specific numbers come out where they do. |

### Figure-type rationale

Two interactive figures are load-bearing where a slider sweep teaches the mechanism:

- **Fig 7 (video token explosion):** the cost of video tokens is so counterintuitive that a static plot understates it. With the figure's slider range (1024 patches/frame), a 5-second clip at 12 FPS produces 5 × 12 × 1024 = **61,440 tokens**; cross to 30 FPS at the same patch count and you're at 153,600 tokens — *that's* where the seed-blog "230K" framing came from for the higher-FPS case. Watching the live token count tick past the 262K context bar as the slider crosses ~14 seconds at 30 FPS is the moment the reader internalizes why compression isn't optional. The caption should also point out that the EVS paper's primary-sourced framing — "a two-minute video at 24 FPS produces more than two million vision tokens" — is reproducible with the slider's higher range.
- **Fig 8 (EVS):** the q parameter IS the mechanism. Showing patches drop as q rises is what makes the algorithm visible. A static three-panel "q=0.5 / 0.75 / 0.9" works but loses the continuous-sweep intuition.

Everything else is static SVG. Justifications for why specific candidates stayed static:

- Fig 11 (Mamba vs Transformer scaling): two curves with a clear crossover. Same shape as prequel's Fig 2 and prequel didn't make that interactive either. Static earns it.
- Fig 12 (top-k MoE routing): structural diagram, not a parameter sweep. A slider for k would be a gimmick — k is fixed at 6.
- Fig 14 (the cost story): comparison panel with a few annotated numbers. No parameter to sweep.

### Section-to-figure mapping

| Section | Figure(s) |
|---|---|
| 1. A single eye, three teachers | Fig 1 |
| 2. The SigLIP puzzle | Fig 2 |
| 3. Contrastive vs autoregressive | (covered by Fig 2) |
| 4. The text decoder is a different organ | (no figure, prose) |
| 5. The adapter zoo | Fig 3 |
| 6. Native multimodal | Fig 4 |
| 7. The tradeoff | (no figure, prose) |
| 8. Audio is time-frequency | Fig 5 |
| 9. Parakeet | Fig 6 |
| 10. The cost of stitched chains | (covered by Fig 6) |
| 11. Video is spatiotemporal redundancy | Fig 7 (interactive) |
| 12. Efficient Video Sampling | Fig 8 (interactive) |
| 13. Conv3D + EVS in Nemotron | Fig 9 |
| 14. The hybrid backbone | Fig 10 |
| 15. Why Mamba | Fig 11 |
| 16. MoE expert routing | Fig 12 |
| 17. NVFP4 | Fig 13 |
| 18. What's still missing (coda) | Fig 14 (closing reassembly) |

### Anti-claims baked into the outline

The following marketing framings from the seed blog are explicitly excluded by the outline:

1. **"Experts activate per modality"** — Section 14 names the correction in prose. Routing is token-level top-k. Spec text under the structural shape now says "token-level expert routing (and why 'per-modality routing' is a marketing simplification)" rather than "Expert routing per modality."
2. **"4× improved memory and compute efficiency"** — Section 17 cites Nemotron-H's 2.9× and the NVFP4 footprint instead.
3. **30s/30fps/256-tokens-per-frame ≈ 230k tokens math** — Section 11 uses EVS's primary-sourced framing ("two-minute video at 24 FPS produces more than two million vision tokens"). Fig 7's interactive slider lets the reader rederive any version of this number themselves at the correct arithmetic (5s × 12fps × 1024 = 61,440 tokens, etc.).
4. **"Stitched chains add latency"** without a number — Section 10 keeps latency claims qualitative; prosody loss is framed as a degree-of-loss claim per Tsiamas, not as an absolute "cannot transmit."
5. **"Unified loop is cheaper than fragmented chains"** as a general theorem — the post does not prove this. It reports three Nemotron-specific efficiency numbers against named baselines. Fig 14 is an evidence ledger that surfaces the limitations of each number alongside the win.
6. **"The LLM sees raw modality tokens"** — wrong mental model. The LLM sees *projected* embeddings via MLP projectors after modality-specific encoders. Fig 4 caption and §6 description fixed.
7. **C-RADIOv4 backbone "lives in caption space"** — overstated. C-RADIOv4 produces a unified embedding from which a SigLIP-aligned head can predict caption-geometry features; the alignment lives in the head, not the backbone. Hook and §1, §2 framing tightened accordingly.
8. **EVS as RGB pruning in production** — wrong production path. The simple RGB-space L1 algorithm is the intuition; in Nemotron, EVS runs *after* the vision encoder on feature similarity. Section 12 now separates the two.

### Codex gate-1 status

Codex gate 1 ran on 2026-05-01 and returned 11 STRUCTURAL + 3 COSMETIC findings. All 11 structural findings have been applied to the spec, outline, and figure table above. The 3 cosmetic findings (Fig 14 evidence ledger, Fig 3 / Fig 4 narrowing, 17-vs-18 section count) have also been applied. See `## Codex outline review` below for the verbatim findings and resolution log.

## Codex outline review

Codex challenge run on 2026-05-01 against the spec + research notes + outline.

### Findings (verbatim from codex)

**Structural:**

1. **The post's final cost claim is not sourced.** Notes claim "Why the unified loop is cheaper than fragmented chains, with the receipts" and Fig 14 says the earlier pieces "make the unified loop cheaper." The notes do not have receipts for that comparison. They have Nemotron-H vs Qwen/Llama throughput, Nemotron Omni vs Qwen3-Omni system-capacity claims, and NVFP4 footprint. They also admit "Cascade ASR-LLM latency-hop cost in agent loops — no controlled benchmark." Rewrite the conclusion as Nemotron-specific efficiency evidence, not a proved unified-vs-fragmented cost theorem.

2. **The anti-claim "experts per modality" leaks into the spec.** Notes say Act 4 covers "Expert routing per modality." Later anti-claims correctly say that is wrong. This contradiction will leak into drafting. Kill the phrase everywhere except as a thing being refuted.

3. **Qwen2.5-VL is misfiled as a frozen-adapter model.** Section 5 says: "Qwen2.5-VL's dynamic resolution + M-RoPE. Each kept the LLM frozen; each treats vision as a translated side-channel." The Qwen2.5-VL report says it trains a native dynamic-resolution ViT and preserves Qwen2.5 language capability, not that it is in the Flamingo/BLIP-2/LLaVA frozen-adapter bucket. Remove Qwen2.5-VL from the adapter zoo or handle it as a bridge case.

4. **EVS performance claim conflates different measurements.** Section 12 says: "Reported result: 4× TTFT speedup at q=0.75 with 1.23% Video-MME drop." The EVS paper supports "up to 4×" for LLM TTFT generally, separately reports VLM TTFT, and the q=0.75/Video-MME numbers are from a specific uptraining table, not a single "4× at q=0.75" result.

5. **EVS algorithm framing overstates L1 RGB pruning as the production/Nemotron path.** The EVS paper distinguishes RGB-space L1 pruning from embedding-space pruning, and its uptraining tables use feature-level similarity. The post needs to separate "simple RGB intuition" from "post-encoder/feature-level production path."

6. **The Tsiamas prosody claim is too absolute and stale by the stated rule.** Notes claim Tsiamas shows "text-only intermediate representations cannot transmit stress, intonation, or rhythm even with a perfect transcript." The paper says cascades capture prosody to a lesser extent depending on transcript surface form, not "cannot." Also v1 is 2024-10-31, one day older than the 2024-11-01 cutoff. Use it but do not count as recent and weaken the claim.

7. **The hook overstates C-RADIO's SigLIP-space inheritance.** Notes say C-RADIOv4's "features already share a space with caption embeddings." The prequel says C-RADIO learns a unified embedding from which all teachers' output features can be predicted, and text alignment is read through the SigLIP2 head. Say C-RADIO can produce SigLIP-aligned features via its head, not that the backbone representation itself simply lives in caption space.

8. **Fig 8's speed formula is false as written.** "TTFT speedup ≈ 1.0 / (1−q)" is at best an idealized LLM-prefill token-count heuristic. The EVS paper explicitly separates LLM TTFT from full VLM TTFT. Label it as "LLM prefill token reduction" or remove it.

9. **Fig 7 arithmetic is wrong.** "5-second clip at 12 FPS = ~150K tokens" — actually 5 × 12 × 1024 = 61,440 tokens, not 150K. 150K requires ~30 FPS at 1024 patches/frame.

10. **Fig 10 asserts layer placement without a quoted source.** "Shown evenly distributed (not grouped)" needs a source for Nemotron 3 Nano Omni specifically. Nemotron-H's "evenly dispersed" quote is for a different model. "2 KV groups" also unsourced.

11. **"Raw modality tokens" is the wrong mental model for Nemotron.** Fig 4's "the LLM sees raw modality tokens during training" is wrong — Nemotron's report says modality-specific encoders connect through MLP projectors and the LLM sees *projected* modality embeddings/tokens.

**Cosmetic:**

12. Fig 14 is still a vague "everything together" figure unless rewritten as an evidence ledger.
13. Fig 3 and Fig 4 duplicate unless Fig 4 is narrowed to information-flow boundary only.
14. Outline says 17 sections but contains 18.

### Resolution

All 11 structural and 3 cosmetic findings applied to the spec, outline, and figure table on 2026-05-01. Specifically:

- **Hook (Spec, §1, §2):** Reframed C-RADIOv4's SigLIP inheritance — alignment lives in the head, not the backbone.
- **Spec structural shape:** "Expert routing per modality" replaced with "Token-level expert routing (and why 'per-modality routing' is a marketing simplification)." The Act 4 subtitle reframed from "Why the unified loop is cheaper than fragmented chains" to "The Nemotron-specific efficiency receipts, and what they actually show," with an explicit honesty note that there is no general-theorem benchmark.
- **§5 (adapter zoo):** Qwen2.5-VL removed from the adapter zoo and noted as a bridge case to be handled in §6.
- **§6 (native multimodal):** Updated to make explicit that the LLM sees *projected* embeddings from modality encoders, never raw modality data. Qwen2.5-VL handled as the joint-training, MLP-projector special case.
- **§10 (stitched chains):** Tsiamas claim weakened from "cannot transmit prosody" to "transmits prosody to a lesser extent than end-to-end systems." Prosody framed as degree-of-loss.
- **§12 (EVS):** Split into "RGB-space intuition" + "post-encoder feature-level production path." Two reported results separated: "up to 4× LLM TTFT speedup" (general claim) and "Video-MME at 32 frames drops 1.23% with q=0.75 uptraining" (specific table).
- **§14 (hybrid backbone):** Layer placement claim dropped; counts and top-k retained as the only sourced facts. GQA group count flagged as needing config-file lookup, not asserted in prose.
- **Fig 4:** Narrowed to information-flow boundary contrast only. "Raw modality tokens" replaced with "projected modality embeddings."
- **Fig 7:** Rationale arithmetic corrected (5s × 12fps × 1024 = 61,440; reaching 150K needs 30 FPS).
- **Fig 8:** Speed formula relabeled as "LLM prefill tokens reduced by (1−q)×"; figcaption notes the LLM-prefill vs full-VLM-TTFT distinction.
- **Fig 10:** Layer placement annotation set to "illustrative, not stated in primary sources for this model"; only count and top-k claims kept.
- **Fig 14:** Rewritten as a four-row evidence ledger (claim / mechanism / source-backed number / limitation).
- **Outline header:** "17 sections" corrected to "18 sections."
- **Recency check:** Tsiamas removed from the recent-source count (one day past 18-month cutoff). Six recent primary sources remain — bar still passed comfortably.

Iteration stops here: codex's findings are addressed. No structural fixes implied a rescoping of the post. Ready to proceed to Phase 5 drafting.

## Resume here

Last touched: 2026-05-02 (post shipped at commit 8a83041).

**Migrated to v2 skill format on 2026-05-02.** v1 had 8 phases; v2 has 7 phases (no missing slot). The mapping is: v1 Phase 1 = v2 Phase 1; v1 Phase 2 = v2 Phase 2; v1 Phase 3 = v2 Phase 3; v1 Phase 4 (codex gate 1) = v2 Gate 1 at end of Phase 3; v1 Phase 5 = v2 Phase 4; v1 Phase 6 = v2 Phase 5; v1 Phase 7 = v2 Phase 6; v1 Phase 8 = v2 Phase 7 (now also includes the freshness re-check before Gate 2 fires). Tracker tables below use the v2 numbering.

### Phase status (v2 numbering)

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | this file's `## Spec` + `## Throughline` (added at migration) |
| 2. Research / fact-check | done | this file's `## Research notes` (claim-source matrix not retroactively populated; see `## Claim-source matrix` note) |
| 3. Outline + figure list (incl. Gate 1) | done | this file's `## Outline` + `## Codex outline review` |
| 4. Draft prose | done | `src/content/blog/omni-modal-stack/index.mdx` (18 sections, References) |
| 5. Implement figures | 14 of 14 done | per-figure table below |
| 6. Playwright review | done | 14 of 14 passed (Fig 2 had a label-overlap fix at commit 2d6483e) |
| 7. Freshness pass + Gate 2 + hero + ship | done | 11 codex rounds → no structural issues; hero shipped at commit 8a83041 |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| (pre-v2) | 1 (outline) | structural fixes applied, then closed | this file's `## Codex outline review` |
| 2026-05-02 | 2 (final) | 11 rounds total. R1: 13 STRUCTURAL + 1 COSMETIC → fixed (References format, narrowing claims, audio mental model, EVS/MoE/megapixel arithmetic, Fig 14 attribution). R2: 4 STRUCTURAL + 1 COSMETIC → fixed (Fig 10 placement claim, MoE batch math, adapter-vs-unified narrowing, EVS embedding rationale). R3: 3 STRUCTURAL → fixed (training-loss claim, audio token rate 12.5/sec not 150, pixel-shuffle 4× added to cascade). R4: 1 STRUCTURAL → fixed (717B-token figure framed as SFT not pretraining). R5: 2 STRUCTURAL → fixed (Fig 4 unified-decoder retitled, 467B vs 717B token-figure distinction). R6: 1 STRUCTURAL → fixed (EVS at q=0.5 not q=0.75 for Nemotron deployment). R7: 2 STRUCTURAL → fixed (0.80 vs 1.23 EVS drop arithmetic, M-RoPE source attribution). R8: 2 STRUCTURAL → fixed (uptraining recipe attribution, EVS placement). R9: 1 STRUCTURAL → fixed (post-adapter EVS placement consistency across post). R10: 1 STRUCTURAL → fixed (Nemotron-H-47B not 56B for the 2.9× speedup). R11: no structural issues found. Total 30 structural fixes across rounds. |

Note: this post predates v2's Gate 0 (research-notes truthfulness pass) — Gate 0 was not run because the v1 skill only had two gates. Given research is already locked and Gate 1 already passed, Gate 0 is not retroactively required for ship; the existing research notes were re-attacked under Gate 2's expanded "walk every prose claim, find its matrix row" check (see codex round-by-round above).

### Phase 5 figure progress (v2 numbering — was Phase 6 under v1)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | UnifiedEyeRecap (C-RADIOv4 with three teachers) | static-svg | done | 1be30a6 |
| 2 | ContrastiveVsAutoregressive | static-svg | done | fd710b5 |
| 3 | DecoderZooFlamingoBlipLlava | static-svg | done | 584fc0a |
| 4 | AdapterVsUnifiedDecoder | static-svg | done | 928bd76 |
| 5 | LogMelSpectrogramTile | static-svg | done | 0583ff2 |
| 6 | ParakeetPipeline | static-svg | done | fafc8cb |
| 7 | VideoTokenExplosion | interactive-canvas | done | 3f954db |
| 8 | EvsPatchPruning | interactive-canvas | done | 868b9e2 |
| 9 | Conv3dEvsPipeline | static-svg | done | 3dd51d4 |
| 10 | HybridBackboneLayers | static-svg | done | 2b9ae57 |
| 11 | MambaVsTransformerScaling | static-svg | done | 225733f |
| 12 | MoeTopKRouting | static-svg | done | 9d71fb8 |
| 13 | Nvfp4Layout | static-svg | done | 1f1c3ab |
| 14 | UnifiedLoopReassembly | static-svg | done | fe19539 |

### Suggested next batch

Phase 7 (v2 numbering) — pre-ship freshness pass + Gate 2 + hero hand-off + ship.

**Step-by-step:**

1. **Freshness re-check** on every primary source cited in `## Research notes`. Per `research-protocol.md`'s Phase 7 procedure: re-query arxiv IDs for v-bumps, re-fetch blog/docs URLs for "updated" dates newer than the cited access date, check repos for substantive commits since cited hash. For each row: if the source has moved AND the claim is affected, halt and update the prose; otherwise bump the access date.
2. **Force `pubDate := today`** in the MDX frontmatter so the publication date matches the freshness check's reference point.
3. **Run Gate 2** (challenge mode against the full MDX + this notes file) per `codex-prompts.md`. Codex must walk every prose claim and find its supporting source. Halt if any claim has no source.
4. **Final `scripts/voice-check.sh`** pass on the full file. Em dashes: zero. Banned words: zero or justified.
5. **Hero hand-off** per `../../explainer-shared/hero-handoff.md` — replace the `heroAlt: "TODO: hero image not yet selected"` placeholder once Vic picks the image.
6. **Ship commit** + update this tracker (Phase 7 → done).

### Notes from phase 7

- All 14 figures passed playwright review at `http://localhost:4326/blog/omni-modal-stack/` (port shifted from the tracker's 4324 because of other dev servers; the post slug is what matters).
- Fig 2 had a real overlap bug discovered during review: the per-bar token labels (`beach`, `grass`, `floor`, …) sat horizontally at 17 px column spacing while each label was ~27 px wide at font-size 9, so they collided on top of each other. Fix at commit 2d6483e: rotate each label 35° below its bar (text-anchor="start", transform="rotate(35 cx cy)") and slide the sampled-token box from y=271 to y=285 so the rotated labels clear it. Lesson: when packing per-bar labels into narrow columns, rotate before shrinking the font; rotation keeps full legibility while a smaller font sacrifices it.
- Interactive figures (Fig 7, Fig 8) hydrated without errors and responded correctly to slider input. Fig 7 cross-tested the overflow state at 30 s × 30 FPS × 1024 patches: naive 922K (3.5× over 262K), Conv3D 461K (1.8× over), EVS 115K — bars correctly switched from green to rust-red with "↑ Nx over" indicators inside the over-context bars. Fig 8 verified at q=0.95: 13 of 256 patches kept, concentrated at the rust disc's edge where the gradient is steepest.
- The 12 pre-existing `height="auto"` Chrome warnings are unchanged. Not blocking; Chrome still renders the SVGs at the correct intrinsic ratio.

### Notes from batch 4

- Fig 7 (`VideoTokenExplosion`): three stacked horizontal bars (one per encoding strategy) against a 262K reference, with secondary-color overflow bars and a "↑ Nx over" white-text indicator inside the bar. The stacked-bars layout absorbs the brief's "three overlaid curves" by giving the reader all three counts at the current input simultaneously — adding a separate inset plot would have been redundant. Default state: 10 s × 12 FPS × 512 patches, all three modes green (under 262K). Cross to 30 FPS at 1024 patches and naive overflows past 7×.
- Fig 8 (`EvsPatchPruning`): two 16×16 patch grids with a deterministic synthetic two-frame scene (smooth bg gradient + a rust disc that shifts ~4 patches between frames). Critical fix during build: the first version used a frame-independent `bgColor(i, j)` so all bg patches had diff = 0 between frames. The percentile threshold algo then collapsed to threshold = 0 and "diff >= threshold" kept everything until q crossed ~0.7, even though the label said "50% pruned". Fix was per-frame deterministic noise of ±2.4 RGB units injected into the bg color so every patch has a unique non-zero diff and the percentile actually bisects. With the noise: q=0 → 256 kept (clean view, disc shift visible); q=0.5 → 128 kept (motion region intact + speckled bg); q=0.75 → 64 kept (only the motion swath); q=0.95 → 13 kept (the steepest gradient patches at the disc edges).
- The MDX file uses raw `<figure>` HTML for the 12 static SVG figures from earlier batches but the proper `<Figure caption=... figNum=...>` Svelte wrapper for the two interactive figures (which need `client:visible`). The two patterns coexist fine in the same MDX. Adding `import Figure from "@components/figure/Figure.svelte"` and per-figure wrapper imports near the frontmatter is the same convention multi-gpu-training uses.

### Notes from batch 3

- Generating large repetitive SVG content (e.g., 128 expert columns in Fig 12) by hand is brittle. Used a one-shot Python script to compute the inactive-expert heights via a deterministic period-14 pattern, then pasted the generated `<rect>` elements. The figure source still has the data inline (no JSX/Svelte expansion needed); the generator is just for typing.
- Voice-check caught two em-dashes inside SVG `<text>` labels in Fig 13 ("32 bits" and "8 bits" qualifiers). The script greps the raw file so SVG strings count. Use parentheticals or commas in figure labels instead.

### Notes from batch 2

- §9 (Parakeet) had no Fig 6 placeholder during phase 5 drafting; the figure was inserted between the closing 2-layer-MLP quote and the "this is the architectural counterpart" hand-off. If any further figures are missing placeholders, place them at the natural visual beat rather than back-shoehorning a `{/* TODO */}` comment.
- A pre-existing MDX parse failure (commit 2d9fa5f) was blocking the build before any figure work could be visually verified: the §12 EVS quote contained `0<t≤T` that MDX2 was parsing as JSX. Fix was wrapping each math expression in inline-code backticks.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Research notes / Outline / Codex review carry every locked-in choice.
2. `git log --oneline | head -30` to see commits since the spec commit.
3. `grep -n TODO src/content/blog/omni-modal-stack/index.mdx` for remaining placeholders.
4. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

Voice-check exits clean before each commit. Em dashes: zero. Banned words: justify or rewrite. Kit primitives are exhaustive (no new primitives without explicit user approval). Per-figure type is locked at Phase 3. One section per commit, one figure per commit. `draft: false` from Phase 1 onward; do not flip it between commits.
