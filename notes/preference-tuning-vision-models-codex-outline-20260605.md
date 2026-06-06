# Gate 1 (outline) — codex findings, 2026-06-05

Model: gpt-5.5, internet-enabled. 9 STRUCTURAL + 1 TYPE-CHANGE STRUCTURAL + 1 cosmetic. All addressed.

## Findings (verbatim summary) + resolution

1. STRUCTURAL — **β backwards/unsupported** (§5, Fig 6). Outline said "high β fits preferences hard, low β barely moves"; the leash direction was inverted. → FIXED: corrected to high β = tight leash = stays near SFT reference (small deviation); low β = loose leash = drifts far / can overfit. Matches row 9's quoted "β controls deviation from π_ref." Added an explicit drafting warning against the inverted intuition.

2. STRUCTURAL — **GRPO breaks the throughline.** GRPO doesn't convert an A/B click into a reward; it estimates advantage downstream of a reward. → FIXED: §6 + throughline now state GRPO sits in the advantage-estimation slot, downstream of the reward source (preference RM or rule-based check, as in R1).

3. STRUCTURAL — **§3 overloaded for an RL novice; doesn't set up §4.** → FIXED: §3 now introduces SFT/reward-model/rollout/critic-advantage/PPO-clip/KL-leash as six explicit rungs with metaphors, and seeds "everything is measured relative to a frozen reference" so DPO's "secretly a reward model" lands.

4. STRUCTURAL — **§10/Fig 10 conflates generic data engine with SAM 3D's SFT+DPO** (rows 17/28 vs 19). → FIXED: Fig 10 is now the GENERIC loop (propose → verify/correct/rate → dataset improves → retrain), no SFT+DPO box. SFT+DPO reserved for §11/Fig 12.

5. STRUCTURAL — **§12 "across CVPR 2026" overclaim** (one example). → FIXED: narrowed to "fresh examples keep appearing" (Pref-GRPO, reward-guided I2V), not "routine/across the field."

6. STRUCTURAL — **§8 LLM→vision two-rung leap.** → FIXED: §8 now bridges in 4 rungs (DPO needs a likelihood ratio → image has no token log-probs → diffusion exposes an ELBO/trajectory proxy → Diffusion-DPO swaps the term). Fig 8 explicitly maps Fig 5's log-ratio onto the trajectory-vs-reference.

7. STRUCTURAL — **claims without rows.** KL leash → added row 30 (InstructGPT §3.5 verbatim KL-penalty quote). "3D hardest data barrier" → re-attributed to SAM 3D's own "breaking the 3D data barrier" (row 18), not asserted as "hardest." §1 "SFT can't capture taste" + "finicky stability" → framed as argument/attribution (DPO paper's stability framing), not cited fact.

8. TYPE-CHANGE STRUCTURAL — **Fig 6 should be static.** → ACCEPTED: re-typed interactive-canvas → static-svg (three-state low/med/high β panel). Auto-accepted per Vic's standing autonomous mandate (re-type is toward the skill's static default + codex-recommended); unlock-count 1. Recorded in figure table.

9. STRUCTURAL — **Fig 12 duplicates Fig 10** unless Fig 10 is generic. → FIXED by #4: Fig 10 generic loop; Fig 12 SAM 3D-specific assembly (synthetic pretrain + verify/rank/rate + DPO + scale + win-rate).

10. COSMETIC — 12 figures OK given #8/#9 fixed. Kept 12 (now all static).

Net: matrix grew to 30 rows (added row 30 KL penalty). Outline corrected; β direction fix is the highest-value catch.
