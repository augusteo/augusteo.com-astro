Gate 1 verdict: **HALT**. This is currently a retrieval-method survey with a replacement thesis attached in the coda. The 21 sections do not earn the coda.

1. **STRUCTURAL — The thesis appears in §1 and §22 but is absent from the argument between them.**

Sections 2–16 primarily compare retrieval mechanisms and benchmark results. Sections 17–21 explain cascades and evaluation. Neither sequence repeatedly asks what operational capability the incumbent provides, whether the new component preserves it, or why that capability matters on one surface but not another.

The matrix contains exactly the evidence needed, but the outline strands it:

- C1–C4: ANN implemented inside the existing inverted-index engine to inherit updates, planning, multi-hop queries, and Boolean constraints.
- C30–C31: an LLM rewrite is kept offline and re-enters through the inverted index.
- C43–C46: opposite replacement outcomes on different search surfaces.
- M15–M17: one embedding serves multiple stages, while caching absorbs almost all encoder traffic.

C1–C4 do not appear anywhere in the outline. That is fatal for a post titled *The Index Is Not the System*. The most direct example of the system dominating the index has been omitted.

Either thread an explicit operational ledger through every act, or change the thesis. The ledger should track at least update path, filtering/query-planning integration, memory/build cost, cache dependence, latency budget, and intervention capability. As written, §22 introduces a different organizing principle after roughly 20,000 words organized by model family.

2. **STRUCTURAL — The claimed weight shift did not happen.**

Act 3 contains five of 22 sections, or 22.7% of the section count. At the stated 800–1,100 words per section, it consumes roughly 4,000–5,500 words, not 11% of a 24,000-word post.

Act 6 plus the coda has nominal space, six sections, but only §22 directly develops the surface-dependent replacement thesis. Sections 18 and 20 spend that space on sampling bias, multi-task ranking, position bias, and adjacent-domain lifts.

Act 3 does not earn five sections. Fold or cut §7 and §10. Reassign that space to:

- C1–C4 and operational integration.
- The C43–C46 surface comparison before the coda.
- A real bridge between stage quality, operational constraints, and replacement.

3. **STRUCTURAL — The throughline is functional through Act 3, then disappears.**

Act-by-act:

- **Act 1:** carries it.
- **Act 2:** partly carries it, principally in §5. Sections 2–4 do not specify the promised opening and closing callbacks.
- **Act 3:** carries the paraphrase and price-filter problems, although the exact-match trap is defective.
- **Act 4:** drops it completely. None of §§11–13 runs the boot query through learned sparse retrieval, fusion, or reranking.
- **Act 5:** replaces it with unrelated caption-order examples, PDFs, Pinterest, and generic unified embeddings.
- **Act 6:** drops it completely in favor of advertising, recommendation, Airbnb, and Walmart systems.
- **Coda:** introduces Kuaishou as a new scenario rather than resolving the worked query.

The exact-match trap is also fictional: `waterproof hiking boots wide toe box under $150` contains neither a brand nor an SKU. §6 claims the throughline demonstrates a dense retriever losing exact SKUs, but the query never asks for one. Add an explicitly named reformulation containing a SKU, or remove that claimed property.

Act 5 cannot silently turn this text query into “a photo.” Specify what the photo depicts and what remains as text or structured metadata. A boot photograph cannot itself encode `under $150`, and likely cannot establish “wide toe box” without an illustrative inference. This can become useful if Act 5 demonstrates that changing the input modality does not remove the need for filters, lexical constraints, and ranking. Currently it is decorative.

4. **STRUCTURAL — The lexical-to-dense transition skips the mechanism that creates semantic matching.**

§5 establishes vocabulary mismatch. §6 immediately says the bi-encoder “buys the paraphrase,” but V1 only establishes two encoders, `[CLS]`, and dimensionality. V2–V3 are aggregate QA retrieval results, and the notes explicitly admit they do not measure the footwear paraphrase.

The reader is missing the rung between “two people use different words” and “nearby vectors recover meaning”: the training objective that makes semantically corresponding queries and documents score closely. Add a matrix row for that mechanism and teach it, or describe the example strictly as a design intention rather than an achieved result.

The structured-predicate failure must also remain visibly unresolved: dense retrieval is the response to vocabulary mismatch, not to `under $150`.

5. **STRUCTURAL — The multimodal-to-cascade transition is a hard discontinuity.**

§16 contains the raw material for the bridge because M15 places one embedding in ANN retrieval, L1, and L2. The outline fails to use it. It closes on “no single embedding model wins across tasks,” then §17 jumps to an advertising funnel.

The required handoff is:

1. The boot image or text query creates retrieval candidates.
2. Lexical, dense, visual, and structured-filter branches contribute different candidates.
3. The same embedding can participate at several stages without becoming “the retrieval layer.”
4. Those candidates now need pruning, cross-features, business constraints, and calibrated blending.
5. Therefore the cascade exists.

Run the throughline through that funnel before importing Alibaba’s advertising counts. Otherwise Act 6 is a second article.

6. **STRUCTURAL — Multiple outline claims have no adequate matrix row.**

| Section | Unsupported or overstated claim |
|---|---|
| §2 | “Query terms are rare” and query cost can be predicted “from term frequency alone.” L4–L6 describe posting lists; they do not establish that simplification, especially after §4 introduces dynamic pruning. |
| §5 | “No amount of field weighting makes `under $150` a term.” T1 provides a filtering example, not this categorical impossibility claim. |
| §6 | The dense system “buys the paraphrase.” The notes explicitly classify this footwear result as illustrative. |
| §7 | “LSH gives guarantees and bad constants.” V5 only carries the attribution and guarantee. “IVF partitions” has no row. |
| §7 | “Eight years of quantization optimized the wrong quantity.” V9 criticizes reconstruction loss; it does not support that field-wide historical generalization. |
| §9 | “Filtered recall collapses while latency stays flat.” No row establishes that combined failure shape generally. |
| §9 | The reader can “predict which filter selectivities break their index.” V36/V36b are expectation/bound results under no predicate clustering; V36c explicitly denies a general connectivity guarantee. |
| §10 | Graph traversal is “serial pointer-chasing” and therefore object storage changes index type. V30 supports a vendor’s centroid choice and rationale, not the full causal generalization. |
| §10 | The reader can choose RAM, SSD, or object storage from query volume and cache hit rate. The matrix contains examples, not a placement decision rule. |
| §11 | Inverted-index traversal is “roughly linear in query terms.” R5 says query size is a major bottleneck; it does not state this complexity claim. |
| §14 / Fig. 11 | The embedding “encodes a bag of concepts, not a structured scene.” M3–M6 establish measured failures, not that internal mechanism. |
| §15 | ColPali is a “genuine replacement” of a production OCR pipeline. M8–M9 establish benchmark performance and storage, not a deployed replacement. |
| §15 | “The best model in the world scores 63.42.” M12 says first on one leaderboard as of a date. |
| §17 / Fig. 12 | The microsecond quotient is “why L1 was a dot product.” C11 explicitly forbids treating the quotient as an executable per-candidate budget, and no row supplies that causal conclusion. |
| §19 | Measuring stage misalignment “needs a shadow stack.” No row supports this mechanism. |
| §20 | Retrieval gains “evaporate” unless the ranker is co-adapted. C8 says new results may be ranked suboptimally, not that gains disappear. |
| §21 | All three Airbnb models were “offline-neutral or better.” C22 supports neutrality for one model; C23 only supplies the other two online losses. |
| §21 | “99% unfiltered recall and 0.1% filtered recall.” No matrix row contains this example. Label it hypothetical or source it. |
| §22 | “Two deployments, one year.” C44 is a 2026 report and C45 a 2025 report; neither row establishes that the deployments occurred in the same year. |

There is also a factual reference error in §19: C17 is Gu and Sheng, not Liu et al. C16 is the row that distinguishes Liu et al. 2017 from Wang et al. 2011.

7. **STRUCTURAL — The literal deletion test exposes a catalog, not a ramp.**

These sections can currently be removed without preventing the next section from landing:

| Section | Why it fails |
|---|---|
| §4 | §5 needs posting lists and BM25, not dynamic pruning. Its cascade callback is not used later. |
| §7 | §8 can follow §6 directly once ANN is motivated; the LSH/IVF/PQ/ScaNN catalog is not needed to understand HNSW. |
| §9 | §10 is unrelated to filtering. §9 is important, but structurally misplaced rather than dispensable. |
| §10 | §11 lands directly from the lexical/dense contrast. |
| §11 | §12 can fuse lexical and dense lists without learned sparse retrieval. |
| §12 | §13’s interaction axis does not depend on RRF. |
| §13 | Act 5 starts independently; text-model interaction does not motivate multimodality. |
| §15 | §16 follows naturally from CLIP/shared embeddings without the PDF detour. |
| §16 | §17 can introduce a generic funnel without it; this is exactly the missing Act 5–6 bridge. |
| §18 | Stage disagreement in §19 follows from §17 without the negative-sampling discussion. |
| §19 | Production ranking objectives in §20 do not depend on cascade-consistency training. |
| §20 | Offline evaluation failure in §21 lands without the multi-task and position-bias examples. |

Do not necessarily delete §9, §13, §16, or §19; make the next rung depend on them. Cut or fold §7, §10, §15, §18, and most of §20 unless they are rewritten around the operational thesis.

8. **STRUCTURAL — Figure 2 is doing two jobs nine sections apart.**

The first panel teaches posting lists in §2. The second panel teaches reconvergence in §11 before the reader knows what learned sparse weights are. That forward reference does not create anticipation; it spends the payoff before establishing the mechanism.

Keep Figure 2 as the posting-list figure in §2. Reprise or extend the visual in §11 after learned sparse retrieval has been explained. Reusing the visual grammar is useful; displaying the neural panel nine sections early is not.

9. **TYPE-CHANGE STRUCTURAL — Figure 3 does not justify interaction.**

`k1` and `b` produce smooth, monotonic effects that a reader can understand from static small multiples: several saturation curves for low/default/high `k1`, plus length-normalization states at `b=0`, `0.75`, and `1`.

The continuous sweep is not load-bearing, and the reader can simulate the intermediate states. Retype `Bm25Dials` from `interactive-canvas` to `static-svg`.

10. **TYPE-CHANGE STRUCTURAL — Figure 8 does not justify interaction and its current control cannot teach its second panel.**

Expected surviving degree is linear in selectivity: `degree × s`. A static curve crossing the `M` line shows the complete mechanism. The correlated-filter panel is about spatial arrangement, not another value of `s`; a selectivity slider does not expose the violated assumption.

Retype `FilteredDegreeCollapse` to `static-svg`: one expected-degree plot, one random-filter topology, and one correlated-filter topology. State “no predicate clustering” and V36c’s absence of a general connectivity guarantee directly on the figure.

11. **STRUCTURAL — Figures 1, 6, 7, 9, 11, 12, and 13 overclaim or combine incompatible jobs.**

- **Fig. 1:** “orders of magnitude” is true for documents scored, not latency: 225.7 ms to 27.9 ms is about 8×. Separate the two axes and date the GOV2 experiment.
- **Fig. 6:** cannot label IVF or “LSH bad constants” until corresponding matrix rows exist.
- **Fig. 7:** hierarchy, pruning geometry, three degree numbers, and the flat-graph critique are four mechanisms. At minimum use explicit panels and soften “the heuristic, not the hierarchy, makes routing work” to the scoped evidence in V19–V23.
- **Fig. 9:** compression format, storage tier, cache state, and index family are separate axes. There are no comparable RAM/SSD/object-storage latency measurements supporting a single “latency cliff.” Split or narrow it.
- **Fig. 11:** show measured order/attribute-binding failures, not an unsourced “bag of concepts” internal mechanism. Label any embedding layout schematic.
- **Fig. 12:** C9–C11 do not provide counts and latency for every box in a generic search funnel. Either draw only the sourced advertising pre-ranking transition or add search-specific rows. Remove the claim that the quotient proves why L1 is a dot product.
- **Fig. 13:** C22 supports offline neutrality for only one of the three models. The other two points cannot be drawn as “offline flat or better” from C23.

12. **STRUCTURAL — The coda is too small to perform the post’s actual argument.**

One 800–1,100-word coda cannot responsibly establish:

- the out-of-mall operational need;
- upstream-resource editability;
- the 8.2% experiment scope;
- the incomplete 0.553 versus 0.761 capability recovery;
- the detail-page counterexample;
- surface dependence;
- OneSearch-V2;
- the out-of-scope OneRec exception; and
- the falsification test.

Move the paired Kuaishou cases into Act 6 and let the coda state only the final test. The coda should conclude the model, not introduce it.

Because findings 1, 3, 4, 5, and 12 require rescoping, drafting must not start. Figures 3 and 8 also require explicit type-unlock approval before their table entries change.