# Codex Gate 1 (outline) findings — 2026-05-04

Run 1. Codex 0.125.0, gpt-5.5, reasoning-effort high.

Findings: 14 STRUCTURAL + 1 TYPE-CHANGE STRUCTURAL + 1 COSMETIC.

(Codex emitted the same block twice — session-end rendering artifact. Deduplicated below.)

---

Found structural issues. Gate 1 should not pass.

1. **STRUCTURAL: §15 / Fig 15 is not matrix-backed.**
   "Synthesis from every prior matrix row" is not enough. The decision tree makes new prescriptive claims: corpus-scale thresholds, domain-distance thresholds, task-density routing, "prefer self-distillation with collapse fixes over pure MIM," and "start with continual self-distillation on top of DINOv3." No matrix row supports those decision rules. Rows 31–32 support uncertainty and adjacent OOD evidence, not this recipe prescription.

2. **STRUCTURAL: §13 ranks recipes from non-comparable numbers.**
   The outline says DINOv3 "wins outright," multi-teacher is "competitive at smaller compute," MIM is "mid," and AR/JEPA do not compete. But §13 mixes frozen-backbone, UperNet, linear/DPT-style, different model scales, different data scale, and different task heads. Rows 2, 9, 13, 18, 26 do not support an apples-to-apples ranking. Fig 13 needs protocol/model-scale normalization or the ranking language must be downgraded.

3. **STRUCTURAL: §13 has quantitative claims without matrix rows.**
   BEiT v1 53.3, D2V2-Refined 54.4, DINOv2-g 53.0, RADIOv2.5-g 54.56, and possibly MAE ViT-B 48.1 are in the outline/Fig 13 but not as load-bearing matrix rows. "Cross-method summary in research notes" does not satisfy the matrix contract.

4. **STRUCTURAL: §15 omits load-bearing axes for the actual decision.**
   The core decision tree is gated on corpus scale × domain distance × task density, but the outline itself uses compute as a condition. It also needs encoder size, evaluation protocol, available teacher models, and backbone/head constraints. Without those, the tree will recommend recipes using evidence that mostly varies by scale and protocol.

5. **STRUCTURAL: §4's construction-sheet MAE failure is unsupported.**
   "Most masked patches are whitespace, so reconstruction is trivial" is a load-bearing intuition claim. Rows 1–2 support MAE mechanics and ADE20K, not construction-sheet patch statistics or trivial reconstruction on line-art documents. Add a row/source or state it as a hypothesis to be tested.

6. **STRUCTURAL: §1 overclaims "canonical SSL backbones haven't seen it."**
   Rows 31–32 support "no published construction-document bake-off / no reported transfer," not "the training corpora did not contain construction sheets." Web-scale corpora can include line drawings, scans, and plans. Rephrase to "not specialized for or evaluated on construction documents" unless a source backs exclusion.

7. **STRUCTURAL: The intuition ramp breaks after §8.**
   §4→§6 is a real ladder: pixel MIM fails, target choice changes the signal. §7→§8 is also coherent. But §9 JEPA, §10 AIM, §11 RADIO, and §12 domain-adaptive specialization become a generic recipe march, not failures of the prior rung. §3 also does not introduce the three decision axes early enough, so §15's tree appears late rather than being built rung by rung.

8. **STRUCTURAL: §13→§14→§15 lands on a stronger recommendation than the evidence permits.**
   §14 says published OOD evidence does not show domain-adaptive SSL strictly wins and construction documents have no bake-off. §15 then recommends continual self-distillation on DINOv3. That recommendation is not the natural consequence of rows 31–32. The defensible leaf is "start from DINOv3; continual pretraining is an experiment," unless a new row supports the stronger pick.

9. **STRUCTURAL: Act 2 drops the construction sheet in multiple recipe sections.**
   The throughline promises every recipe section asks what signal the recipe extracts from the sheet and where it breaks. §5 has no sheet reference, §7 is only implicit through Fig 7, §10 only uses the sheet in the figure, and §12 becomes generic domain-adaptive evidence. Act 2 is not currently threading the construction sheet through every recipe section.

10. **STRUCTURAL: Recipe sections still have missing matrix support.**
    §9 claims V-JEPA and V-JEPA 2 have no image dense-prediction transfer, but row 20 only covers I-JEPA. §10 claims AIM scaling/loss-correlation and iGPT small-resolution AR history, but rows 21–22 do not cover those. §12 mentions SatMAE and corpus-scale requirements, but rows 29–30 do not cover SatMAE or scale thresholds.

11. **STRUCTURAL: Fig 11 is overloaded.**
    One AM-RADIO architecture diagram cannot carry student/teacher mechanics, RADIO lineage loss evolution, PHI-S, angular summary loss, MESA, and the central taxonomy thesis in row 36. Either make Fig 11 a signal-source taxonomy comparison, or keep it architectural and move the central thesis into prose or a separate comparison figure.

12. **STRUCTURAL: Fig 3 and Fig 14 duplicate the same visual job.**
    Both are domains × strategies grids whose main takeaway is "no construction-document bake-off." Fig 3 can frame the missing cell, or Fig 14 can summarize deltas, but as specified they repeat the same matrix with slightly different cell contents.

13. **TYPE-CHANGE STRUCTURAL: Fig 5 should not be `plot` if `plot` means an interactive/kit primitive.**
    The mechanism is a static two-curve line chart over layer index. It does not need continuous sweep, animation, drag, or multi-state toggle. Re-type to `static-svg` unless the repo's `plot` type is strictly static and noninteractive.

14. **STRUCTURAL: §10 is dead weight at current resolution.**
    If §10 is removed, §11 still lands. AIM has no dense-prediction transfer and does not feed the decision tree except as "do not use this for dense tasks yet." It belongs as a short negative-control paragraph or an absence marker in §13, not a full rung, unless new matrix rows make AR load-bearing.

15. **STRUCTURAL: §16 does not earn its place as written.**
    A coda about the missing bake-off is useful, but this one repeats the unsupported §15 prescription: "try continual self-distillation with Gram anchoring on top of DINOv3." Remove that or back it with a new row. Otherwise the post should end at a hedged decision tree.

16. **COSMETIC: Fig table row 6 is malformed Markdown.**
    The unescaped pipes in "pixel target | feature target | token target" will split the table columns.

§5 earns its place against §4 and §6 because row 10 is the bridge from pixel reconstruction to dense-feature quality. It still needs a construction-sheet hook and less overclaiming about dense-task underperformance. No static figure currently needs to become interactive.
