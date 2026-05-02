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

(Phase 2 — pending.)

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
| 2. Deep research | pending | this file's `## Research notes` |
| 3. Outline + figure list | pending | this file's `## Outline` (incl. per-figure type) |
| 4. Codex gate 1 | pending | this file's `## Codex outline review` |
| 5. Draft prose | pending | `src/content/blog/omni-modal-stack/index.mdx` |
| 6. Implement figures | pending | per-figure table below (populate at end of Phase 3) |
| 7. Playwright visual review | pending | playwright snapshots reviewed |
| 8. Codex gate 2 + ship | pending | hero image, dev verification, ship |

### Phase 6 figure progress

(Populate at end of Phase 3.)

### Suggested next batch

Phase 2: dispatch three parallel research subagents — (a) text decoder vs SigLIP-style contrastive alignment plus the adapter-contrast literature (CLIP / SigLIP / Flamingo / BLIP-2 / LLaVA); (b) audio + video encoders (Parakeet, Whisper, 3D-conv video models, EVS paper); (c) Nemotron 3 Nano Omni architecture, hybrid Mamba+Transformer MoE, expert routing, NVFP4, inference-cost claims. Each subagent runs from repo root and returns quoted excerpts with arxiv IDs / commit hashes / publication dates.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Research notes / Outline / Codex review carry every locked-in choice.
2. `git log --oneline | head -30` to see commits since the spec commit.
3. `grep -n TODO src/content/blog/omni-modal-stack/index.mdx` for remaining placeholders.
4. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

Voice-check exits clean before each commit. Em dashes: zero. Banned words: justify or rewrite. Kit primitives are exhaustive (no new primitives without explicit user approval). Per-figure type is locked at Phase 3. One section per commit, one figure per commit. `draft: false` from Phase 1 onward; do not flip it between commits.
