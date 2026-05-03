# The Generative Vision Stack

## Spec

**Title (sketch):** The Generative Vision Stack
**Slug:** `generative-vision-stack`
**Mode entered as:** topic
**Length target:** ~40-min read (matches trilogy)
**Essay flag:** true (3-tier headings)
**Topic-evolution classification:** actively-evolving (12-month bar)

### What / who / walk-away

A deep walk through the paradigm flip in computer vision introduced by the April 2026 Vision Banana paper. Posts 1 and 2 of the series ([Unified Vision Stack](/blog/unified-vision-stack), [Omni-Modal Stack](/blog/omni-modal-stack)) explained the discriminative paradigm: encode an image into a feature, attach a head, read off a label or mask. This third post explains the inversion: take a pretrained image generator (Google's Nano Banana Pro), instruction-tune it on a small mix of vision tasks, and read perception off the generator's output as RGB images. Mask-as-image. Depth-as-image. Same model, no specialist heads. Beats SAM3 on segmentation (0.842 mIoU vs 0.699) and Depth Anything V2 on metric depth (0.882 δ₁ vs 0.823).

The reader walks away with:

1. Why generative pretraining is the candidate for what next-token-prediction was for language.
2. The 5-year arc from MAE through Painter / SegGPT / DIFT to Vision Banana that made it inevitable.
3. What the trilogy of vision posts on this site collectively argues about the future shape of vision foundation models.

### Audience

Same as the trilogy: ML engineers and vision researchers with 45-min reading tolerance. Treats posts 1 and 2 as priors; doesn't re-explain ViTs, dense feature collapse, or the SigLIP / decoder split.

### Connection to trilogy (the spine)

- **Post 1:** the encoder is the spinal cord; many small heads read it.
- **Post 2:** feed that encoder into a text decoder for a multimodal agent.
- **Post 3:** drop the encoder. The *generator* is the spinal cord, and "perception" is what you read off it when you ask for the right kind of image.

### Figure mix

100% static SVG (default; no override clauses apply). Target ~10-12 figures.

### Flagged-for-Phase-2 items

- Verify "Depth Anything V3" reference seen in marktechpost coverage; agent did not find an arxiv ID. May be hype or pre-release.
- Confirm Vision Banana's zero-shot vs fine-tuned framing on each benchmark — paper abstract is not explicit; need PDF.
- Pull the actual instruction-tuning recipe from the paper PDF (data mix ratio, loss function, training hyperparameters).
- Identify Nano Banana Pro's release date, scale, and architecture (autoregressive image tokenizer? diffusion? Google blog should clarify).
- Confirm SAM3 zero-shot setup the paper compares against; the SAM3 paper itself dates 2025-11-20, only 5 months before Vision Banana. Is the comparison apples-to-apples?

### Top starter sources

| # | Source | Date | Role |
|---|---|---|---|
| 1 | [Vision Banana paper](https://arxiv.org/abs/2604.20329) | 2026-04-22 | the focus |
| 2 | [vision-banana.github.io](https://vision-banana.github.io/) | 2026-04-22 | project site, benchmarks |
| 3 | [SAM3](https://arxiv.org/abs/2511.16719) | 2025-11-20 | competitor baseline (5 mo) |
| 4 | [Depth Anything V2](https://arxiv.org/abs/2406.09414) | 2024-06-13 | competitor baseline (22 mo, foundational) |
| 5 | [SegGPT](https://arxiv.org/abs/2304.03284) | 2023-04-16 | foundational for the lineage |
| 6 | [Painter](https://arxiv.org/abs/2212.02499) | 2022-12-05 | foundational for the lineage |
| 7 | [MAE](https://arxiv.org/abs/2111.06377) | 2021-11-11 | foundational; He/Xie predecessor |
| 8 | [DIFT (Emergent Correspondence)](https://arxiv.org/abs/2306.03881) | 2023-06-06 | foundational; generators-as-feature-extractors |
| 9 | [Songyou Peng author thread](https://x.com/songyoupeng/status/2047312019976785944) | 2026-04-23 | first-party announcement |
| 10 | [Google DeepMind announcement (Soricut RT)](https://x.com/GoogleDeepMind/status/2047239487445438545) | 2026-04-23 | org-level first-party |
| 11 | [DeepMind research publication page](https://deepmind.google/research/publications/240658/) | 2026-04-22 | official record |

## Throughline

A single Cityscapes-style city-street photo, threaded across every act.

- **Act 1 — the puzzle.** "Here is one street scene. SAM3 — the strongest dedicated segmenter — gives us a categorical mask. The mask is a per-pixel grid of integers. The state of the art has been: build the best discriminator you can, attach a head, read off the integers. Posts 1 and 2 of this series explained how that works and how to wire it into a multimodal agent."
- **Act 2 — the flip.** "Here is the same street scene. Vision Banana, instruction-tuned from Google's Nano Banana Pro generator, returns an RGB image. Cars are one color, sidewalk another, sky a third. The 'mask' was generated as if it were a picture. We trace the recipe: how the paper turns segmentation, depth, surface normals, and edges all into 'paint me an image where pixel values encode X.' Same model. Same forward pass. The numbers: 0.842 mIoU on Cityscapes vs SAM3's 0.699; δ₁ 0.882 on metric depth vs Depth Anything V2's 0.823."
- **Act 3 — why it works.** "We back into the answer through the lineage: MAE in 2021 (reconstruct masked pixels = pretraining); Painter in 2022 (output space = images); SegGPT in 2023 (segmentation as in-context coloring); DIFT in 2023 (correspondence falls out of diffusion features); Nano Banana Pro in 2025 (production generator at internet scale). Vision Banana is the synthesis: instruction-tune the production generator on a small vision-task mixture and the dense-prediction heads come for free. Closing: the trilogy's argument."

Throughline is **canonical-real**: every concrete number cites a public source (vision-banana.github.io project page; SAM3 paper; Depth Anything V2 paper). Cityscapes is a public benchmark with a published evaluation protocol.

## Resume here

Last touched: 2026-05-02.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` (this file) + project memory |
| 2. Research / fact-check | in progress | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/generative-vision-stack/index.mdx` |
| 5. Implement figures | pending | per-figure table below (populated end of Phase 3) |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress

*(populated at end of Phase 3 once figure list is locked)*

### Suggested next batch

1. Phase 2: dispatch parallel subagents to build research notes for sub-topics (Vision Banana methods + Nano Banana Pro substrate + lineage papers + competitor baselines).
2. Build the `## Claim-source matrix` mapping every load-bearing claim to a quoted primary source.
3. Run Gate 0 (research-truthfulness pass via codex consult).
4. Resolve any STRUCTURAL findings; advance to Phase 3 outline.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/generative-vision-stack/index.mdx` for remaining placeholders (file does not yet exist; Phase 4 creates it).
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in `## Claim-source matrix` with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness. Date of publication, not date of last research.
2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero (except in `## Act ` headings). Banned words: justify or rewrite.
4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-triggered without Vic prompting; all use the project-local `codex` skill.
5. **Static is the figure default for new figures.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle). For this post: 100% static unless a clause obviously fires.
6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
7. **One section per commit, one figure per commit, one migration per commit.** Safe revert points.
8. **Sentence-case headings.** Numbered sections (`### 3. ...`) match the trilogy. Em dashes (U+2014) forbidden in prose; permitted in `## Act ` headings; en dashes (U+2013) allowed everywhere.
9. **`draft: false` from Phase 1 onward** (topic mode). No flipping back.
10. **Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.**
