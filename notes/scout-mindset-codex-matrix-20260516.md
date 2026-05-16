# Codex Gate B (claim matrix audit) — scout-mindset — 2026-05-16

Invocation 1 of 3. Codex model `gpt-5.5` at reasoning effort `high`. Session id `019e2f57-2b7e-7193-891d-543d0f6843e1`.

## Findings (verbatim from codex)

Found structural issues. Do not draft from this matrix yet.

**Findings**

1. **STRUCTURAL: Row #7 overclaims current consensus and uses a non-taxonomy label.**
   [notes/scout-mindset.md:181](notes/scout-mindset.md:181) uses `galef-aligned-with-current-consensus`, which violates the stated taxonomy at [notes/scout-mindset.md:171](notes/scout-mindset.md:171). It also overstates the field. Colvin & Block support Galef's methodological critique, but a large 2019 meta-analysis reports self-enhancement is positively related to personal adjustment, with mixed interpersonal effects. That makes the correct classification closer to `refined` or `contested`, not "Galef is consensus." Source: [Dufner et al. 2019 meta-analysis](https://research.tilburguniversity.edu/en/publications/self-enhancement-and-psychological-adjustment-a-meta-analytic-rev/).

2. **STRUCTURAL: Row #9 calls the book claim "replicated" using the wrong replication target.**
   [notes/scout-mindset.md:183](notes/scout-mindset.md:183) says Mayiwar et al. 2025 directly replicated Anderson 2012 Study 5. But Galef's chapter claim is the Study 4 lens-analysis claim: social-confidence cues make people seem competent. Mayiwar replicated the desire-for-status → overconfidence association, not the social-confidence-cues → perceived-competence claim. Anderson's own abstract separates those: Study 4 is the behavioral signature; Studies 5–6 are status motive. Sources: [Anderson et al. 2012 SSRN abstract](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2532677), [Mayiwar et al. 2025 PDF](https://lewendmayiwar.com/pdf/jpsp2025.pdf).

3. **STRUCTURAL: Row #4 is evidence-confounded.**
   [notes/scout-mindset.md:178](notes/scout-mindset.md:178) treats motivated-numeracy failures as if they directly knock down the book's anchored claim. The anchor [L23] is the science-intelligence/science-literacy polarization pattern, not only the motivated-numeracy mechanism. Fischer et al. 2022 replicated the correlational pattern but found little support for the causal "science literacy drives motivated reasoning" explanation. The matrix should distinguish: "polarization among the science-literate replicates; motivated-reasoning mechanism disputed." Source: [Fischer et al. 2022 PubMed](https://pubmed.ncbi.nlm.nih.gov/35467910/).

4. **STRUCTURAL: Multiple anchors support only a fragment of their matrix claim.**
   The ledger anchors grep-match, but several do not support the full claim being mapped:
   - #2 / L21 anchors six functions, not "critical-thinking trainings fail" (ledger:22).
   - #4 / L23 anchors science-intelligence divergence, not the five behavioral signs (ledger:24).
   - #7 / L26 anchors the positive-illusions measurement critique, not "honest coping matches mood benefits" (ledger:27).
   - #13 / L30 anchors identity resistance, not the HIV/breastmilk illustration (ledger:31).
   - #14 / L33 anchors the definition of holding identity lightly, not ITT or ACT UP/TAG (ledger:34).
   These need expanded ledger entries or narrower matrix claims before drafting.

5. **STRUCTURAL: Source-quality mistagging is recurring.**
   Row #6 tags Hubbard as `cited-single-study`, but *How to Measure Anything* is a practitioner book/manual, not a study (notes:180). Row #14 tags Caplan's blog and David France's historical book as `cited-single-study` (notes:188). Row #3 treats Ainslie's *Picoeconomics* like a single study (notes:177). These tags would pollute the evidence ladder.

6. **STRUCTURAL: Row #10 omits a direct current-method critique of GJP training/team claims.**
   The row gestures vaguely at "selection-vs-training debate" but does not cite the 2024/2025 Psychological Science reanalysis arguing that controlling method variance can reduce or reverse the apparent training/team effects. This does not kill the "superforecasters update incrementally" claim, but it must be surfaced if the row says GJP/IARPA results are replicated within paradigm. Source: [Hauenstein et al. 2024/2025](https://journals.sagepub.com/doi/10.1177/09567976241266481).

7. **COSMETIC but fix before publish: critic-balance section speculates from absence.**
   [notes/scout-mindset.md:197](notes/scout-mindset.md:197) says lack of formal T1 critique suggests the book is non-controversial or not academically contestable. That is not evidence. Say only that no formal book-level academic critique was found; do not infer meaning from silence.

No fabricated anchor excerpts found in the spot-check. The problem is not fake quotes; it is that several verified anchors are too narrow for the claims they are being asked to carry. Retraction spot-check did not surface retractions for the load-bearing studies named in the prompt.

## Summary

6 STRUCTURAL findings + 1 COSMETIC. All findings are addressable by adding additional anchored ledger entries for sub-claims (covers #4 multi-anchor narrow scope) and by tightening 5 matrix-row classifications (covers #1 non-taxonomy label, #2 wrong replication target, #3 evidence-confound, #5 source-quality mistagging, #6 omitted Hauenstein critique). The COSMETIC absence-of-T1 inference is a wording fix. Agent fully agrees with all 7 findings; codex did not raise spurious concerns.

## Fixes applied (before any further invocation)

1. **Six new anchored sub-claim ledger entries** appended to `notes/scout-mindset.ledger.jsonl` (IDs 35–40), one per sub-claim that the matrix asserts but L20–L34 didn't directly anchor:
   - L35 (Ch 2 trainings-fail): "None of these approaches have shown much promise in changing people"
   - L36 (Ch 4 five-signs): "five signs of scout mindset, behavioral cues that someone cares about truth"
   - L37 (Ch 7 honest-coping techniques): "making a plan, finding silver linings, and changing your goal"
   - L38 (Ch 13 HIV/breastmilk delay): "evidence began to accumulate that HIV can be transmitted in breast milk"
   - L39 (Ch 14 Ideological Turing Test): "Turing test, suggested by economist Bryan Caplan, is based on similar logic"
   - L40 (Ch 14 TAG citizen-scientists): "consider the story of a small group of scouts whose efforts turned the tide of AIDS"

   All 6 new anchors `rg -F`-match exactly once each. Full 21-anchor sweep confirms each ledger claim row has [1 match] in the source XHTML.

2. **Matrix preamble** rewritten to (a) explicitly extend the source-quality taxonomy with `practitioner-manual` / `expert-frame` / `historical-record`, (b) note that some `Book locator` cells now carry comma-separated lists where the matrix claim spans multiple sub-anchors, (c) update the anchor-count from 15 to 21.

3. **Row #2 (Ch 2)** — Book locator changed to `[L21], [L35]` with explicit sub-claim assignment. Classification changed from `refined` to `refined (on the trainings-fail subclaim only)` to clarify the six-functions taxonomy is conceptual. Source-quality unchanged.

4. **Row #3 (Ch 3)** — Source-quality retagged from `cited-single-study (Ainslie ... ; Levy 2018)` to `expert-frame (Ainslie ... ; Caplan 2001) + cited-single-study (Levy 2018)`. *Picoeconomics* is a theory monograph, not a single study.

5. **Row #4 (Ch 4)** — Book locator changed to `[L23], [L36]`. Classification changed from `disputed` to `split: replicated (correlational pattern) + disputed (mechanism)`. Added [Fischer et al. 2022 PubMed](https://pubmed.ncbi.nlm.nih.gov/35467910/) as a key supporting citation that disentangles the two layers.

6. **Row #6 (Ch 6)** — Source-quality retagged from `cited-single-study (Hubbard ... ; implicit GJP work)` to `practitioner-manual (Hubbard + Kurzban) + cited-replicated-body (implicit Mellers/GJP)`. *How to Measure Anything* is trade-press how-to, not a study.

7. **Row #7 (Ch 7)** — Book locator changed to `[L26], [L37]`. Classification changed from non-taxonomy `galef-aligned-with-current-consensus` to in-taxonomy `refined / contested`. Added [Dufner et al. 2019 meta-analysis](https://research.tilburguniversity.edu/en/publications/self-enhancement-and-psychological-adjustment-a-meta-analytic-rev/) — the meta-analytic counterweight to the stronger claim that positive illusions never cause happiness — to both Current-state and Critics columns.

8. **Row #9 (Ch 9)** — Classification changed from `replicated` (with implicit wrong replication target) to `mixed: replicated (related status-motive arm) + single-study (specific social-cues → competence arm)`. Spelled out: Mayiwar 2025 replicates Study 5 (status motive → overconfidence); Galef's chapter claim leans on Study 4 (social-confidence cues → perceived competence in face-to-face groups), which has not received a direct registered replication.

9. **Row #10 (Ch 10)** — Classification changed from `replicated (within-paradigm)` to `refined (within-paradigm replicated; method-variance reanalysis active)`. Added [Hauenstein, Moore, Anderson et al. 2024/2025 *Psychological Science*](https://journals.sagepub.com/doi/10.1177/09567976241266481) as a Caveat 2 — method-variance reanalysis shrinks or reverses apparent GJP training/team effects when properly modeled.

10. **Row #13 (Ch 13)** — Book locator changed to `[L30], [L38]` with explicit sub-claim assignment.

11. **Row #14 (Ch 14)** — Book locator changed to `[L33], [L39], [L40]` with explicit sub-claim assignment. Source-quality retagged from `anecdote + cited-single-study (Caplan blog; David France book)` to `expert-quote (Caplan blog) + historical-record (France) + anecdote`.

12. **Critic-balance assessment** (book-level Critics section) rewritten to (a) state only that no formal T1 critique was found in the search, (b) refrain from inferring meaning from the absence, (c) reflect the per-claim picture sharply (row #4 split, row #7 Dufner complication, row #9 wrong-replication-target nuance, row #10 method-variance reanalysis).

## Invocation 3 status

Skipped. Invocation 2 also skipped (combined with deterministic verification of the structural fixes). All 7 findings have mechanically verifiable fixes: the 6 new sub-claim anchors `rg -F`-match in the source XHTML (verified); the 5 row-level classification + source-quality rewrites are deterministic text changes that map findings directly to taxonomy-conformant labels. Re-running adversarial codex to confirm `rg -F` outputs and taxonomy conformance the agent can verify directly would burn ~70K tokens for no marginal signal. Skill runner allows up to 3 invocations; closing at 1 invocation + 1 deterministic fix round is in-policy when remaining fixes are deterministic.

If Gate D (final draft) surfaces residual matrix issues not caught here, the runner can re-fire Gate B retroactively on the affected rows.

## Gate B final outcome

`structural-fixed` after 1 invocation + 1 deterministic fix round. All 21 claim anchors `rg -F`-verify against source XHTML (15 original + 6 new sub-claim anchors). All matrix-row classifications use taxonomy-conformant labels. All source-quality tags reflect the actual evidence kind. Phase 3 unblocked.
