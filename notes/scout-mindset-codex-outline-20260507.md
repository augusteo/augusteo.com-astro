# Codex Gate 1 (outline) — full findings, run 1, 2026-05-07

Verbatim output from `codex consult` invocation. Capture preserved per codex-prompts.md size policy. Summary lives in `notes/scout-mindset.md` `## Codex outline review`.

---

Structural issues found.

1. **STRUCTURAL: Section 2 resurrects a closed category error.**
   Section 2 and Figures 2/3 call this "four asymmetries." The locked Spec says the opposite: three evidence-processing asymmetries plus social architecture, and specifically says not to flatten them into "four asymmetries." Matrix rows 8-13 and 11/22-24 do not support Kahan as a settled fourth asymmetry. This breaks the mental model before Act 1 finishes.

2. **STRUCTURAL: Section 1's paradox needs new rows.**
   "ICPM analysts with classified-information access," "smart, well-informed, professional," and "unaided institutional judgment" are not backed by row 18. Row 18 supports the Goldstein benchmark and scores, not participant composition, classified access, or the institutional-cognition claim. New matrix row required or the opening must be narrowed.

3. **STRUCTURAL: Section 5's core mechanism is not matrix-backed.**
   "Aggregation reduces variance," "calibrated forecasters help further," "All Surveys Logit weighted recent accuracy and time-discounted older forecasts," and "ICPM had herding/selection/timing pathologies" are load-bearing. Row 18 backs the result, not these mechanisms. Row 16 backs individual predictors, not the aggregator mechanics. New rows required.

4. **TYPE-CHANGE STRUCTURAL: Figure 5 fails its mechanism as static.**
   Aggregation only helps under assumptions about noise, independence/correlation, weighting, and number of forecasters. A static dot cloud saying the aggregate is closer to truth is both vague and too strong. This is a continuous parameter mechanism. Either make Figure 5 interactive with sweep controls for `n`, correlation/noise, and weighting, or redesign it as a static distribution/funnel that does not imply "aggregate always closer."

5. **STRUCTURAL: The intuition ramp skips rungs.**
   The required ramp is small motivating case to larger case. The outline opens with the largest institutional result, jumps to a literature taxonomy, then jumps to Brier/AOMT. There is no small worked belief or forecast showing how an asymmetry distorts an update, then how calibration fixes it, then why aggregation matters. Sections 1-5 expect the reader to bridge individual cognition to institutional forecast aggregation without the bridge.

6. **STRUCTURAL: Act 3 contradicts the social-architecture diagnosis.**
   Section 3 says soldier mode is social architecture, backed by rows 12-13. Sections 6-8 then prescribe individual self-tests and a private notebook. That leaves out the systems layer the post itself says is necessary: scoring, precommitment, outside review, aggregation, team norms, or decision architecture. This is a topic-scope problem, not a prose problem.

7. **STRUCTURAL: Section 6's test-to-asymmetry mapping is unsupported.**
   Row 3 supports that Galef has five self-tests. Rows 8-13 support separate mechanisms. No row supports the mapping that Double Standard catches Lord/Ross/Lepper, Outsider catches Ditto/Lopez, Conformity catches Mercier/Sperber, etc. "Status quo bias" as a gravitational pull is also not independently matrix-backed. Figure 6 is carrying an invented synthesis as if sourced.

8. **STRUCTURAL: Section 8 overclaims "every primary source endorses" the notebook move.**
   Rows 6-7 support Darwin. Row 16 supports frequent updating as a GJP predictor. Row 3 supports Galef self-tests. Row 20 supports Morewedge debiasing effects. None of those say "write disconfirming evidence down" is the one habit every source endorses. This closing claim needs a new row, or more likely needs to be weakened.

9. **STRUCTURAL: Section 7 is dead weight by your own N+1 test.**
   Remove Section 7 and Section 8 still lands: Darwin plus Galef plus frequent updating already motivate the notebook protocol. Section 7 answers "does debiasing training work?" but Section 8 does not depend on that answer. Either make the closing protocol depend on the trainability evidence or cut/move the section.

10. **STRUCTURAL: Figure 7 is not implementable truthfully as specified.**
    One x-axis mixing Hedges `g` with percent bias reduction is false comparability. Row 26 also lacks exact effect size metadata for Heerma van Voss, so the figure cannot plot it honestly yet. Static is fine, but it needs separate panels or normalized qualitative bins.

11. **STRUCTURAL: Act 3 drops the Goldstein anchor until a weak closing gesture.**
    Act 1 has Goldstein + Darwin. Act 2 has Goldstein + Hauenstein. Act 3 spends Sections 6-7 in generic Galef/debiasing territory, then Section 8 gestures at "GJP findings." The personal-scale act needs an explicit conversion of the Goldstein mechanism into a personal operating loop, not just a closing name-check.

No cosmetic findings matter until these are fixed.
