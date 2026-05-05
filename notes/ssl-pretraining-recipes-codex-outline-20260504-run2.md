# Codex Gate 1 (outline) findings — 2026-05-04 run 2

Run 2. Codex 0.125.0, gpt-5.5, reasoning-effort high. 86k tokens used.

Findings: 6 STRUCTURAL + 0 TYPE-CHANGE + 0 COSMETIC. Trajectory: 16 → 6 (run 1 → run 2).

(Codex emitted the same block twice — session-end rendering artifact. Deduplicated below.)

---

Reviewed `notes/ssl-pretraining-recipes.md`. Findings:

1. **STRUCTURAL: §15 / Fig 13 is still not actually reviewable.** It says every leaf cites a matrix row, but the outline only spells out the construction-document terminal. The other satellite / medical / document terminals are promised, not enumerated, so the claim "every leaf cites a row" cannot be verified. The `X/Y/Z` thresholds also have no matrix backing. Teacher availability is treated as a confounder, but §11 makes it a real gate for RADIO-style training.

2. **STRUCTURAL: §13's protocol stratification is not closed for RADIO.** Fig 11 groups DINOv2, DINOv3, RADIOv2.5, and C-RADIOv4 under "frozen-backbone multi-scale" / "matched protocol," but rows 26 and 40 only back the mIoU numbers, not that protocol label. This reintroduces the run-1 apples-to-oranges problem.

3. **STRUCTURAL: §10's "AR scales like LLMs for image classification" claim is still not matrix-backed.** Rows 21, 22, and 34 cover AIM's prefix-LM recipe, AIM's lack of dense transfer, and AIMv2's multimodal recipe. They do not back iGPT history or the scaling-laws claim. The research notes mention AIM scaling, but the matrix contract requires a row.

4. **STRUCTURAL: §6 → §7 overstates the MIM target lesson.** The outline says BEiT v2 "only works because it borrows CLIP," but row 9 supports "CLIP-distilled tokenizer + strong ADE20K," not causal dependence. Also row 37 now adds BEiT v1 ViT-L at 53.3, so "only BEiT v2 reports strong dense-prediction numbers" is no longer clean.

5. **STRUCTURAL: §4's construction-sheet MAE hypothesis is still not actually tested by §5 or §13.** Reframing "whitespace-heavy reconstruction is low-information" as a hypothesis helps, but §5 tests generic MIM block regimes and §13 tests ADE20K-style published numbers, not construction-sheet whitespace. The reader is still told this hypothesis will be tested when it will not be.

6. **STRUCTURAL: §10 remains dead weight as a standalone rung.** It has no figure, no dense-transfer evidence, and its construction-sheet throughline is just "modeled as a sequence." The ramp loses nothing if this becomes a short negative-control paragraph before §11 or inside §13's "no published number" landing.

No **TYPE-CHANGE STRUCTURAL** findings: the remaining figures can be static SVGs. Fig 1 / Fig 5 / Fig 6 are doing different jobs; Fig 11 carries weight only if the protocol backing problem above is fixed.
