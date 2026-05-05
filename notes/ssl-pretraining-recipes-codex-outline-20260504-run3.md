# Codex Gate 1 (outline) findings — 2026-05-04 run 3

Run 3. Codex 0.125.0, gpt-5.5, reasoning-effort high. 80k tokens used.

Findings: 5 STRUCTURAL + 0 TYPE-CHANGE + 0 COSMETIC. Trajectory: 16 → 6 → 5 (runs 1 → 2 → 3).

(Codex emitted the same block twice — session-end rendering artifact. Deduplicated below.)

---

Found 5 STRUCTURAL issues. No TYPE-CHANGE STRUCTURAL issues found.

1. **STRUCTURAL: Fig 11's "matched protocol" labels are still not true.** §6 and §12 / Fig 11 put BEiT v1 53.3 inside "ViT-L UperNet IN1K matched," but row 37 says BEiT-L is SETR-PUP, not UperNet. That breaks both the §6 MIM-family ranking and Fig 11 bin (a). Also, Fig 11 bin (d) says "RADIO-line frozen-backbone paper protocol," but rows 26 and 40 back the numbers, not the "frozen-backbone" protocol label. Fix: either downgrade bin labels to "published ADE20K, protocol-adjacent" where needed, or add matrix rows that explicitly back protocol/head/pretraining matches.

2. **STRUCTURAL: The teacher-availability gate is not matrix-backed.** §10 says no canonical teacher set ships with domain-tested construction-document weights, and §14 uses that as the gate that routes construction documents away from RADIO. Rows 23-28 / 35-36 establish RADIO's teacher-imitation mechanism and teacher families. They do not establish checkpoint availability or the absence of domain-tested construction-document teachers. Row 32 backs "no bake-off," not "no teacher set ships." This is load-bearing because the decision tree's RADIO branch depends on it.

3. **STRUCTURAL: The decision-tree baseline does not fit all four leaves.** §14 says the tree assumes "moderate compute, ViT backbone, frozen or linear-probe evaluation as the dense-quality test." But the medical leaf is backed by row 30, a 3D nnU-Net / MAE result measured by DSC against no-pretraining, not a ViT frozen/linear dense-feature probe. The document-corpus leaf is backed by row 29, which mixes layout/table/classification deltas, not the same dense-quality baseline either. The satellite continuation also leans on GLARE deltas from UDI initialization in row 32, not DINOv3 Web as the starting point named in §14. The tree either needs leaf-specific baseline disclaimers or a narrower tree scope.

4. **STRUCTURAL: The §4 → §5 intuition ramp still overclaims what §5 answers.** §4 correctly says the construction-sheet MAE failure is only a plausible concern and this post does not measure it. Then §5 says MIM-Refiner "answers" whether MAE produces useful per-patch features "on this kind of data." Row 10 backs a generic MIM block-regime analysis, not construction-sheet feature usefulness. Fix the rung motivation: §5 answers where MIM features tend to live, not whether construction whitespace makes MAE low-signal.

5. **STRUCTURAL: Act 3 still loses the construction sheet in §12.** The throughline contract says Act 3 keeps the sheet visible in the verdict path. §13, §14, and §15 do that. §12 / Fig 11 does not. It is an ADE20K/RADIO protocol chart with no construction-sheet implication beyond generic dense prediction. Add an explicit "the construction sheet has no bar here; these are proxy dense-feature tests" annotation or route marker.

Codex's verbatim closing: **"No dead-weight section issue found: §3 earns its place by naming the unanswerable bake-off before the recipe ramp. Fig 11 and Fig 12 carry distinct jobs once Fig 11's protocol labels are fixed: Fig 11 is cross-recipe dense benchmark context; Fig 12 is OOD-domain evidence coverage. No static figure needs an interactive unlock."**
