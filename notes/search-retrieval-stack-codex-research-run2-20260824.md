# HALT

The repairs do not hold. The matrix still contains unsupported thesis claims, omitted counterevidence, false recency classifications, and two newly added rows that overstate their sources.

## Structural findings

1. **STRUCTURAL — The revised thesis is still unsupported; it has been softened into an unfalsifiable prevalence claim.**

   Spec claim:

   > “new retrieval technology almost always enters production as an addition rather than a replacement”

   No matrix row establishes “almost always.” C1, M15, C35 and C36 are examples, not a population or prevalence estimate. The named exceptions do not create a denominator.

   Worse, the same Spec says “No universals” and then immediately asserts:

   > “relevance was never a property of the index on its own”

   That is another universal. It is also muddled: an index’s candidate coverage, approximation error and scoring machinery plainly affect relevance. The defensible claim is narrower: “the index alone does not determine end-to-end relevance.”

   Replace “almost always” with a falsifiable, evidence-shaped thesis such as: “Across several published production search systems, new retrieval methods were integrated beside or inside existing machinery; recent generative-search deployments provide explicit counterexamples.”

2. **STRUCTURAL — The source selection still hides the strongest in-scope replacement evidence.**

   OneRec is recommendation, so naming it does not cure the omission. There are now direct counterexamples in e-commerce search:

   - **OneSearch** describes an industrial end-to-end generative framework deployed in Kuaishou e-commerce search, contrasting it with traditional multistage retrieval and ranking. [OneSearch](https://arxiv.org/abs/2509.03236)
   - **OneSearch-V2** explicitly describes generative retrieval as replacing the traditional multistage cascading architecture. [OneSearch-V2](https://arxiv.org/pdf/2603.24422)
   - **OneRetrieval** reports production experiments replacing the inverted-index branch and then nearly all lexical and dense retrieval branches in out-of-mall e-commerce search. [OneRetrieval](https://arxiv.org/pdf/2606.13533)

   These are current, primary and inside the thesis’s stated search scope. Omitting them while spending multiple rows on an out-of-scope recommendation exception is asymmetric sourcing. At minimum, OneSearch and OneRetrieval need matrix rows and prominent treatment as named exceptions.

3. **STRUCTURAL — The deleted false negative remains in the notes twice.**

   C39 correctly establishes a live production multimodal LLM reranker at 76 ms/query. But the notes still say:

   - Spec, “Flagged for Phase 2”: “No first-party web-scale LLM-reranker latency SLA was found.”
   - Research notes, “The open question, answered in the negative”: “there is no first-party, production, web-scale published latency SLA or deployment description…”

   Both are refuted by C39 and [Pailitao-VL §6.4](https://arxiv.org/pdf/2602.13704). The correction was added to the matrix but not propagated through the source notes. Delete the negative passages and the proposed “open question” box.

4. **STRUCTURAL — C42 manufactures certainty from an internally inconsistent source.**

   C42 says the 25% figure is “25% of the cached/degraded traffic slice, not 25% of all serving.” The OneRec paper does not resolve the accounting that cleanly:

   - The abstract says 25% of total QPS.
   - The main experiment discussion describes expansion to roughly 25% of total QPS.
   - Appendix B says the experimental group was 5%, with OneRec applied to 25% of degraded traffic inside that group.
   - The conclusion says it replaced the caching mechanism and serves 25% of traffic in main scenarios.

   Those statements are unreconciled. C42 chooses the appendix interpretation and presents it as settled fact. [OneRec](https://arxiv.org/pdf/2506.13695)

   Rewrite C42 as an explicit source inconsistency. Consequently, C33’s “25% of total QPS with no cascade” is also unsupported and must be removed. The separate 100%-of-QPS Local Life scenario in C41 is supported.

5. **STRUCTURAL — C40 is a cross-domain causal hallucination.**

   C40 compares:

   - Pailitao e-commerce search: 76 ms over a hundred-scale shortlist.
   - COLD display advertising: a 10–20 ms ranking/pre-ranking limit.

   It then concludes:

   > “which is why an LLM reranker sits on a top slice rather than the full candidate set”

   Neither paper establishes that causal relationship. The domains, hardware, stage definitions and service budgets differ. Pailitao itself says its latency satisfies its production requirements.

   The numerical contrast may remain as a labeled cross-paper anecdote. The “which is why” conclusion must go unless backed by a search-specific source connecting shortlist size to the latency constraint.

6. **STRUCTURAL — Domain labels do not cure cross-domain smuggling elsewhere.**

   Several rows remain worded as general search-system claims even though their evidence is advertising or recommendation:

   - **C9–C11:** The 10,000→hundreds fan-out and 10–20 ms budget are advertising figures. They cannot become the post’s default search cascade merely because “display advertising” appears in a caveat.
   - **C15:** Streaming frequency correction establishes a sampling-bias remedy for a highly skewed video-recommendation corpus. It does not establish the standard fix for search retrievers.
   - **C19:** “Production rankers handle competing objectives with MMoE” generalizes from one 2019 video-recommendation system.

   These can illustrate transferable mechanisms, but their claim text must identify the system and domain: “Yi et al.’s recommendation retriever…”, “YouTube’s 2019 ranking system…”. They cannot bear the search-scoped thesis or the promised “default architecture with published numbers.”

7. **STRUCTURAL — The 12-month policy is still being violated by rows marked as passing.**

   With a cutoff of 2025-08-24, these are already outside the bar even using their latest revisions:

   - **V20–V23:** last revised 2025-07-03. [HNSW hierarchy critique](https://arxiv.org/abs/2412.01940)
   - **R15:** last revised 2025-07-06. [WARP](https://arxiv.org/abs/2501.17788)
   - **M7:** 2025-02-20. [SigLIP 2](https://arxiv.org/abs/2502.14786)
   - **C18:** last revised 2025-06-04. [LCRON](https://arxiv.org/abs/2503.09492)
   - **M19:** 2025-04-14. [MIEB](https://arxiv.org/abs/2504.10471)

   Their statuses say “actively-evolving / 12-month bar / passes.” That is simply false.

   The larger loophole is widespread misuse of `foundational-locked`. Old empirical speedups and production A/B results are not foundational merely because the systems became historically important. Examples include R7, R10, R13–R14, M13–M14, C1–C13 and C20–C26. Historical mechanism descriptions may be age-exempt, but benchmark standings, latency results and business lifts must be dated as historical evidence.

   The deliberate annotations are mixed:

   - M12’s “as of February 2026” leaderboard wording is sufficient.
   - C34’s June 2025 figures can survive as explicitly historical figures.
   - C33 cannot survive because its traffic scope is unresolved, regardless of dating.

8. **STRUCTURAL — Several load-bearing Throughline and thesis claims still have no matching row.**

   Missing or mismatched claims include:

   - Throughline Act 2: “fast term match over \(10^8\) docs.” L2 covers 25.2 million GOV2 documents, not \(10^8\).
   - Throughline Act 3: dense retrieval “catches the paraphrase.” DPR’s aggregate QA gains do not specifically establish paraphrase matching.
   - Spec: “recall lost upstream cannot be recovered downstream.” Plausible, but it is a load-bearing causal statement and has no row.
   - Spec: older machinery remains load-bearing for “exact match, freshness, filtering, query planning and cost.” The matrix contains examples, not evidence for this general causal list.
   - Throughline: `under $150` is dismissed as an unsourced “structural observation.” The PVLDB tutorial already uses price-range filtering as an e-commerce example; add the actual source row instead of declaring the claim outside the contract.
   - V4 supports rare Wikidata entities, not the broad claim that dense retrieval “loses exact match” or product SKUs.

9. **STRUCTURAL — V36b drops the assumptions that make its bound meaningful.**

   The quoted ACORN bound is real, but the row calls it a general “connectivity argument.” It occurs inside an analysis assuming no predicate clustering and an ACORN construction/search model. It is not a connectivity theorem for arbitrary HNSW graphs or correlated production filters. The paper immediately says neither HNSW nor ACORN guarantees connectivity for arbitrary datasets. [ACORN §6.3.1](https://arxiv.org/pdf/2403.04871)

   V36b needs the same assumption guard as V36. V36c does not retroactively constrain an overbroad use of V36b elsewhere.

   The planned figure is also still named “Filter-selectivity percolation.” That title teaches the rejected model. Recast it as a toy random-removal analogy or, preferably, visualize ACORN’s expected-degree and disconnection analyses with their assumptions visible.

10. **STRUCTURAL — V14’s exact source pin remains unverifiable.**

    Current hnswlib source supports the allocation claim, but I could not verify the claimed commit `34fe8ff1eab7` through an exact resolvable source URL. Until that pin resolves, mark the pin unverifiable or replace it with a reachable immutable commit link. A floating `master` view is not equivalent to the matrix’s pinned-source claim.

## New-row verdicts

| Row | Verdict |
|---|---|
| V13 | **Verified.** The Qdrant article reports about 21 realized layer-0 links on its specified 1M-point benchmark. Keep it benchmark-specific. [Qdrant benchmark](https://qdrant.tech/articles/filtered-vector-search-acorn/) |
| V36b | **STRUCTURAL.** Quote exists; claim omits the no-predicate-clustering/model assumptions. |
| V36c | **Verified.** The no-connectivity-guarantee statement appears as quoted. |
| V41b | **Verified.** Default table values and configuration distinction hold. Vendor-primary for that benchmark, not general evidence. |
| C39 | **Verified.** The online 76 ms claim and hundred-scale reranker input are present. |
| C40 | **STRUCTURAL.** Unsupported cross-domain causal inference. |
| C41 | **Verified.** OneRec v4 says 100% of QPS for the Local Life business scenario. |
| C42 | **STRUCTURAL.** It falsely resolves contradictory traffic accounting. |
| L34 | **Verified.** The Bellcore typescript states probability below 0.20; its scope guards are correct. [Furnas et al.](https://citeseerx.ist.psu.edu/document?doi=27fa6ede8c9ffc305d06c9307e47321b41540e11&repid=rep1&type=pdf) |

No new fabricated quotation was found in those nine rows. Their failures are assumption, scope and attribution failures. V14’s exact pin remains unverifiable.

## Five judgment calls

- **(a) HNSW arithmetic:** Correct. At \(M=16\), \(32 + 16/\ln(16) = 37.77\) average connection-ID slots, or about 151.1 bytes at four bytes per ID. It is honest only when called average connection-ID capacity, not total bytes per vector or 37.77 realized links on every node. [HNSW paper](https://arxiv.org/pdf/1603.09320)

- **(b) Percolation demotion:** Correct. There are primary percolation results for planar relative-neighborhood graphs, but not a transferable \(s\approx1/d\) theorem for finite, high-dimensional, degree-capped, insertion-dependent HNSW under correlated filtering. [Continuum percolation in the RNG](https://arxiv.org/abs/1004.5292) does not rescue the original argument.

- **(c) Furnas:** Dropping it was wrong; reinstating L34 through the primary Bellcore typescript is correct.

- **(d) Related posts:** Reasonable. The apparent matches use retrieval in a materially different sense. Do not force a link.

- **(e) Production LLM reranker negative:** False. Pailitao is the counterexample. C39 repairs the matrix, but the contradictory negative prose remains and must be removed.

The post is not ready for outlining. The thesis needs to absorb the in-scope generative-search replacement evidence, the recency classifications need a complete audit, and C40/C42 must be rewritten before drafting.