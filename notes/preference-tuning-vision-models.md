# Preference tuning, from chatbots to 3D

## Spec

**What / who / walk-away.** An explainer on preference optimization: the RLHF → DPO → GRPO lineage that came out of the LLM world, and how the same trick crossed over into vision — first into image generation (Diffusion-DPO), then into the model-in-the-loop data engine behind SAM 3D, where annotators who can only say "yes or no" break the 3D data barrier. The reader is an AI engineer who is comfortable with deep learning and supervised fine-tuning but has little or no reinforcement-learning background. They walk away able to: read the DPO loss and say what each term does; explain why DPO removes the reward model and the RL loop that PPO needs; see why the same preference signal adapts to a diffusion/flow-matching generator; and explain why binary preference annotation plus a model-in-the-loop loop is the data engine that produced SAM 3D.

**Topic-evolution classification:** actively-evolving (12-month bar). DPO (2023), GRPO (2025), Diffusion-DPO (2023), SAM 3D (2025) are all recent and the practice is moving. Foundational references locked by the field: PPO (Schulman 2017), Bradley-Terry (1952), SAM data engine (2023).

**Angle (resolved from Vic's message):** lead with the LLM preference-tuning primer (where the idea is clearest), bridge to generative vision, climax on the SAM 3D data engine (the CVPR 2026 talk by Georgia Gkioxari that Vic attended). NOT a comprehensive survey; a single throughline.

**Target length:** ~30-35 min read.

**Title sketch (decide at draft):**
- "Yes or no: preference tuning, from chatbots to 3D"
- "From RLHF to SAM 3D: teaching vision models taste"
- "Preference tuning escapes the language model"

**Figure-style mix:** default 100% static SVG. Flagged interactive/plot candidates (decide at Phase 3, default static unless an override clause fires):
- Bradley-Terry sigmoid (preference prob vs reward gap) — `plot` candidate.
- DPO beta sweep (preference-fit vs stay-near-reference tradeoff) — `interactive-canvas` candidate (continuous-sweep override clause).
- SAM 3D Shape-Elo climbing over data-engine versions — `plot` candidate (comparison across versions).
- Rest static: RLHF 3-stage pipeline, DPO-collapses-the-loop, DPO loss anatomy, GRPO group-relative advantage, Diffusion-DPO winner/loser on the denoise trajectory, model-in-the-loop data-engine loop, yes/no-vs-dense-annotation, "negatives are informative".

**Starter sources (to verify + quote in Phase 2; arxiv IDs from scouting, NOT yet confirmed):**
- PPO — Schulman et al, arxiv:1707.06347 (2017-07-20) [foundational]
- Learning to summarize from human feedback — Stiennon et al, arxiv:2009.01325 (2020-09)
- InstructGPT — Ouyang et al, arxiv:2203.02155 (2022-03)
- DPO — Rafailov et al, arxiv:2305.18290 (2023-05)
- DeepSeekMath (GRPO origin) — arxiv:2402.03300 (2024-02) [VERIFY ID]
- DeepSeek-R1 — arxiv:2501.12948 (2025-01)
- Bradley & Terry 1952, Biometrika 39:324-345 [foundational]
- Diffusion-DPO — Wallace et al, arxiv:2311.12908 (2023-11)
- Segment Anything (SAM) — Kirillov et al, arxiv:2304.02643 (2023-04) [foundational data-engine ref]
- SAM 3D — Meta, arxiv:2511.16624 (2025-11) [VERIFY ID + Elo/win-rate numbers]
- Benenson & Ferrari, "From colouring-in to pointillism" — arxiv:2210.14142 (2022-10) [VERIFY ID]

**SUSPECT — do not cite unless Phase 2 confirms they exist:**
- "Linear-DPO" arxiv:2605.21123 — scouting agent said "submitted May 2026"; future-dated, unverified. Likely hallucinated. Drop unless resolved.
- "Region-Normalized DPO for Medical Image Segmentation" arxiv:2601.23222 — scouting agent literally said "inferred from search results". Likely hallucinated. Drop unless resolved.

**Primary-talk source:** Georgia Gkioxari CVPR 2026 talk (attended by Vic 2026-06-04). Slides photographed (8 images). Talk is not itself a citable primary source; every claim it makes must be backed by SAM 3D / Diffusion-DPO / SAM papers. Gkioxari offered to give feedback on the process (per Vic).

## Throughline

**A single human preference judgment — "this one, not that one" — and what each method does with it.**

The concrete atom that threads every act is one human verdict on a pair (or a single sample): *which output is better?* We follow that one signal across the whole post:

- **Act 1 (LLM origin):** the verdict is a chatbot A/B click. A labeler reads two completions of the same prompt and picks one. InstructGPT turns ~tens of thousands of these into a reward model, then RL. (Citable numbers from InstructGPT/Stiennon.)
- **Act 2 (the methods):** the same verdict feeds Bradley-Terry → the DPO loss directly (no reward model), → GRPO (group-relative, no critic).
- **Act 3 (crossover to vision):** the verdict is now "which generated image looks better" (Diffusion-DPO, Pick-a-Pic pairs), then "is this reconstructed 3D shape good — yes or no" (SAM 3D annotators).
- **Climax:** the SAM 3D model-in-the-loop data engine, where those yes/no verdicts retrain the model and the shape-quality Elo climbs version over version. (Citable Elo/win-rate numbers from SAM 3D paper — to confirm.)

Ladder rung: **canonical-real** (named, public, citable at both ends: InstructGPT at the LLM end, SAM 3D at the vision end). Alternate if SAM 3D Elo numbers don't cite cleanly: fall back to composite-with-public-numbers for the data-engine climb.

## Research notes

*(populated in Phase 2)*

## Claim-source matrix

*(populated in Phase 2)*

## Related posts on augusteo.com

*(populated in Phase 2 — strong candidates by slug: generative-vision-stack, unified-vision-stack, omni-modal-stack, ssl-pretraining-recipes, image-generators-vision-models, til-gemini-agentic-vision)*

## Outline

*(populated in Phase 3)*

## Resume here

Last touched: 2026-06-05.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | in progress | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/preference-tuning-vision-models/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|

### Suggested next batch

1. Phase 2: verify every starter source by fetching it and pulling a direct quote; kill the two SUSPECT arxiv IDs if they don't resolve.
2. Dispatch parallel fact-check subagents grouped by sub-topic (LLM preference tuning / generative-vision DPO / SAM 3D data engine).
3. Build the claim-source matrix; scan src/content/blog for related posts; run Gate 0.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/preference-tuning-vision-models/index.mdx` for remaining placeholders.
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. Truthful and current per load-bearing claim; every load-bearing claim has a matrix row with a quoted primary source passing the 12-month bar. Phase 7 re-checks freshness.
2. Intuition-first, but never a wrong mental model. Density is fine; don't soften a claim into being wrong.
3. `scripts/voice-check.sh` exits clean before any commit. Em dashes: zero. Banned words: justify or rewrite.
4. Three codex gates mandatory: Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). Auto-fired.
5. Static is the figure default. Interactive needs one of the four override clauses.
6. Per-figure type locked at Phase 3; unlock only via Gate 1 STRUCTURAL + Vic approval.
7. One section per commit, one figure per commit, one migration per commit.
8. Sentence-case headings. Em-dashes forbidden in prose (allowed in `## Act N — ...` dividers). En-dashes allowed everywhere.
9. `draft: true` from creation through ship; Vic flips to `draft: false` himself.
10. Project-memory pointer + MEMORY.md entry verified at end of Phase 1.
11. Blog is interconnected; newer post links older relevant posts (scan in Phase 2, weave in Phase 4).
