# Gate 0 (research) — codex findings, 2026-06-05

Model: gpt-5.5, reasoning_effort=medium. Codex had internet access (pulled the CVPR 2026 PDF + a Nature DeepSeek-R1 record). Full raw transcript: session tool-results/b12n61omf.txt.

## Structural findings (verbatim)

1. **Central climax is overclaimed: SAM 3D is not fully backed as "yes/no" annotation.** (Spec line 5, Throughline 51-52, rows 16, 19-20.) Matrix supports SAM 3D using human preference data, SFT+DPO, verify/rank/rate, model-in-the-loop — NOT "annotators who can only say yes or no" for 3D. Row 16 is 2D semantic segmentation, not 3D. Row 20 supports verify/rank/rate, not binary-only. Reframe throughline to "preference/quality verdicts get cheaper and more structured" unless a primary SAM 3D source says binary yes/no was the primitive.

2. **Row 20 cites wrong source identity.** "verifying or ranking meshes is a more accessible skill" came from Meta's blog, but the matrix source ID was arxiv-only. Cite the blog directly.

3. **Elo climb too strong unless explicitly schematic.** (Throughline 51-52, row 23.) Can't publish per-version Elo; "yes/no verdicts retrain the model and Elo climbs version over version" over-compresses several mechanisms. Keep: data-engine iterations + post-training improve Elo; no per-version numbers.

4. **Row 6 misattributed and overstrong.** "PPO requires a value function ~size of policy" quote is DeepSeek's description of what GRPO removes, not from PPO-2017. Split: Schulman = clipped objective; DeepSeek = GRPO removes the value model.

5. **Row 11 fails recency.** arxiv:2501.12948 is Jan 2025 (>12mo as of June 2026). Cite the Nature version (Sept 2025, inside bar) which carries the same GRPO claim.

6. **Row 16 abuses "foundational."** Benenson 2022 is real but not field-locked for the SAM 3D climax; it's a stale analogy source for 2D sparse annotation. Background only.

7. **Row 15 too broad.** RN-DPO is medical segmentation under noisy judges, not general proof DPO crossed into dense vision via human preferences. Narrow it; don't imply broad adoption from one fresh preprint.

8. **Matrix missing counterweights on DPO/RLHF.** Leans "DPO is the clean shortcut." Add caveat rows: DPO instability/underperformance vs PPO (Xu 2404.10719), method-depends-on-misspecification (Shi 2505.19770), GRPO normalization bias (Dr. GRPO 2503.20783).

## Cosmetic
- Linear-DPO 2605.21123 + RN-DPO 2601.23222 confirmed real (not fabricated).
- Row 23 figure-number mismatch (Fig 9 / 10 / 10b across extracts) — don't cite a figure number.
- Row 3 fine as "33k reward-model prompts."

## Resolution (all 8 fixed, 2026-06-05)
1. Reframed Spec walk-away + Throughline to "cheap verify/rank/rate verdicts, not author ground truth"; yes/no kept only as Gkioxari's talk framing, attributed. 2. Row 20 now cites the Meta blog URL. 3. Throughline + row 23 softened to schematic, no per-version numbers, no figure number. 4. Row 6 reframed as the GRPO-vs-PPO comparison, sourced to DeepSeek. 5. Row 11 now cites Nature 2025 (DOI 10.1038/s41586-025-09422-z), within bar. 6. Row 16 downgraded to background analogy. 7. Row 15 narrowed to medical-seg-under-noisy-judges. 8. Added rows 24 (Xu 2404.10719), 25 (Shi 2505.19770), 26 (Dr. GRPO 2503.20783) — all verified.
