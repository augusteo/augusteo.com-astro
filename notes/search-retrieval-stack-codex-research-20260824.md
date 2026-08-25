# Gate 0 verdict: HALT

The matrix is not sound. It contains a fabricated or obsolete Qdrant quotation, a false negative claim, systematic recency-policy violations, and no evidence capable of supporting the post’s universal thesis.

## Findings

1. **STRUCTURAL — The thesis is unsupported and contradicted.**

The Spec claims:

> every generation of search index was announced as a replacement … not one of them replaced anything … each new capability became one more candidate source or feature … the index was never where relevance came from.

No matrix row supports any of those universal claims. C1, M15, C31, C36 and C35 are individual examples of integration. They cannot establish “every,” “not one,” or “never.”

Worse, OneRec v4 explicitly describes retrieval and ranking being integrated into a single-stage generative system. It reports 25% of QPS in Kuaishou’s main surfaces and 100% of QPS in its Local Life Service business scenario. The paper says the latter system “has now taken over 100% of QPS.” That is published replacement evidence, not absorption. [OneRec v4](https://arxiv.org/html/2506.13695v4)

The matrix selected OnePiece and UniPinRec because they retained cascades, while suppressing the contrary OneRec deployment. [OnePiece](https://arxiv.org/abs/2509.18091) and [UniPinRec](https://arxiv.org/abs/2606.00422) are valid examples, but the selection is asymmetric.

The thesis must become something defensible, such as:

> New retrieval techniques usually enter production as additional candidate generators, representations, or ranking features, but genuine stage replacement also occurs. Relevance therefore belongs to the end-to-end system, not to any index alone.

“The index is not the whole system” is defensible. “No replacement ever happened” is not.

There is also a category error: OneRec is a recommender-system funnel replacement, not a generation of search index. The post currently shifts among web search, RAG, product search, ads, and recommendation whenever one domain supplies a convenient anecdote. Either narrow the thesis or state exactly which system class each example covers.

2. **STRUCTURAL — C39 is false, refuted by a source already in the matrix.**

C39 says no first-party production web-scale LLM-reranker latency or deployment description exists.

Pailitao-VL, already cited in M21–M22, reports exactly that:

- A multimodal large-language-model reranker in Alibaba’s live e-commerce search.
- Hundred-scale candidates per query.
- Average production latency of 76 ms/query.
- Online A/B deployment under high concurrency.
- +6% GMV in standardized categories and +20% in the SKU-price-comparison scenario.

The separate benchmark reports 75.01 ms/query on an A800; the online section reports 76 ms/query in production. [Pailitao-VL §§6.3–6.4](https://arxiv.org/html/2602.13704)

Whether 76 ms is called an “SLA” is irrelevant because C39 is disjunctive: “SLA **or deployment description**.” The deployment description exists.

Delete C39. The honest replacement is: “Published production examples exist, but their roughly 76 ms latency is far outside the 10–20 ms budget reported for older pre-ranking/ranking stages.”

3. **STRUCTURAL — V41’s quotation does not appear on the cited Qdrant page.**

The matrix quotes:

> “Planner + ACORN … holds 99.9% to 100% recall on all four filters, at 7.2ms to 10.9ms … and 1.5ms on the 1% filter…”

That string is not on the current cited page, and its numbers disagree with the published tables. The current default-configuration table reports seven filter shapes and latencies of 5.7, 4.4, 1.6, 4.2, 7.3, 2.5, and 1.2 ms. The fixed-strategy intersection table reports still different numbers. [Qdrant benchmark](https://qdrant.tech/articles/filtered-vector-search-acorn/)

Unless the author has a dated archived version proving the quotation, V41 is fabricated or unverifiable and must be removed. A live URL without a pinned revision is insufficient for a verbatim contract.

V38, V40 and V42 do match the current article. V39 changes the source’s backticked `AND` to `[AND]`, so it is not verbatim as printed.

4. **STRUCTURAL — The 12-month rule has been silently replaced by an invented 18-month rule.**

The Spec says 12 months. The matrix repeatedly says “18-month bar / passes.” That invalidates the declared freshness contract.

At minimum, the following are stale unless explicitly justified as method-defining historical sources rather than current-practice evidence:

- L18, L21: current Lucene/Anserini implementation claims sourced from 2020.
- V20–V23: July 3, 2025 revision, more than 12 months old.
- V25: November 2024 Elastic implementation benchmark.
- V31–V36: filtered-search taxonomy and ACORN claims from 2024–2025.
- R3–R4, R6, R15: evolving model standings or latency from 2022–early 2025.
- M7–M9, M15–M19: 2024–April 2025 model and production claims.
- C17, C30–C34: 2022–June 2025 current-production claims.

C33–C34’s June 2025 annotation is honest dating but does not make the rows pass. Keep them only as explicitly historical evidence. More importantly, v4 contains the omitted 100%-QPS deployment, so the dated account is materially incomplete.

M12’s February 3, 2026 leaderboard statement is acceptable: it is within 12 months and explicitly dated. It must never become a present-tense leaderboard claim.

5. **STRUCTURAL — Several Throughline claims have no supporting row.**

- “`under $150` is not a query” has no row. L31–L32 concern BM25F field aggregation, not numeric range predicates. Add a primary range-query/planner source or make this a clearly identified toy example.
- “Vector catches `roomy forefoot`” is inferred from DPR QA results. V2 does not demonstrate product-attribute paraphrase retrieval.
- “Keep exact SKUs” is mapped to V4’s Wikidata entity questions. That is an analogy, not direct evidence about SKU retrieval.
- Act 6 says the query “finally” gains an order. BM25 already orders results. The cascade supplies a final, business-aware order, not the first order.
- “The index was never where relevance came from” conflicts with the matrix itself. BM25 scoring, embedding geometry, ANN candidate recall, filtering connectivity, and pruning all affect whether relevant documents reach the ranker. A downstream ranker cannot recover a document excluded upstream.

6. **STRUCTURAL — Material claim/source mismatches remain.**

- **L13:** “they are fitted” is not supported by “the model provides no guidance.” Parameters may be tuned, copied from defaults, or otherwise selected.
- **L31:** “scoring fields separately … is wrong” overstates a source that calls it “a little unreasonable” under a specific eliteness assumption.
- **V15:** drops the prerequisite “when the number of candidates is large enough.”
- **V16:** “without it search sticks at cluster boundaries” is not in the quotation.
- **V22:** conflates scopes. Latency/recall was studied over 13 datasets; the 38–39% construction-memory result was measured on two BigANN datasets. [FlatNav paper](https://arxiv.org/html/2412.01940v3)
- **V25:** “only ships because” is stronger than Elastic’s evidence. The source shows oversampling and reranking in particular benchmarks, not a universal necessity. The blog is legitimate first-party engineering evidence, but stale and overgeneralized. [Elastic BBQ](https://www.elastic.co/search-labs/blog/better-binary-quantization-lucene-elasticsearch)
- **R8:** “and never revisited” is false extrapolation. The RRF paper says `k=60` was not altered during that paper’s subsequent validation, not that nobody revisited it after 2009. [Original RRF paper](https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf)
- **M7:** SigLIP 2 says it surrounded the objective with additional techniques. It does not claim those techniques “fixed” Winoground-style attribute binding or order sensitivity.
- **C8:** “out of distribution” and “trained on old retrieval’s logs” are plausible interpretations, but not what the quoted source states.
- **C11:** dividing a 10–20 ms batch-stage budget by 10,000 candidates does not create a 1–2 µs executable per-candidate budget. It is an amortized quotient across vectorized and parallel work. Do not call it “wall-clock per candidate.”
- **C28:** using two index scales does not establish that no single index can measure both recall and precision.
- **C34:** the quoted excerpt does not support the claim that more than half of resources went to communication and storage, although OneRec’s body does. Quote that passage.
- **C35:** “kept the cascade” is true, but not supported by the quoted gains excerpt. The relevant support is the title and abstract’s statement that OnePiece integrates into retrieval and ranking models of industrial cascaded pipelines. [OnePiece abstract](https://arxiv.org/abs/2509.18091)

7. **STRUCTURAL — Source traceability is still incomplete.**

- V14 cites mutable `master` with no commit SHA. Pin a commit. The current source confirms `maxM0_ = M_ * 2`, allocation of the level-0 block, and additional storage for the link-list header, vector and label. [hnswlib source](https://github.com/nmslib/hnswlib/blob/master/hnswlib/hnswalg.h)
- V5 was not read and contains no verifiable quotation. It cannot be marked “passes”; mark it unverifiable or obtain a clean primary copy.
- L30 identifies MaxScore from another paper’s reference list. That verifies bibliographic attribution, not any algorithmic claim from Turtle and Flood.
- C19 lacks a title, DOI, arXiv ID or URL. The quote is from Zhao et al., *Recommending What Video to Watch Next*, DOI `10.1145/3298689.3346997`. Fix the source identity.
- L34 and M10 are dropped claims, not contract rows. Remove them from the matrix instead of counting “closed by drop” as sourced claims.

8. **STRUCTURAL — Vendor sources are being used inconsistently.**

- **Qdrant:** acceptable first-party, reproducible evidence for this Qdrant version and benchmark. It publishes the dataset, 500-query exact-recall methodology, build variation, pinned version and reproduction kit. It is not evidence for universal HNSW behavior.
- **turbopuffer:** acceptable first-party architecture evidence. The 874/14 ms figures are service-specific operational observations, not reproducible general latency laws. [turbopuffer architecture](https://turbopuffer.com/docs/architecture)
- **Elastic:** genuine first-party implementation and benchmark detail, not mere marketing. The problem is age and generalization, not source class.
- The Qdrant article was mined for V38–V42 while its inconvenient opening result, roughly 21 realized layer-0 links at `m=16`, was declared unsourceable. That is asymmetric source inclusion.

9. **COSMETIC — Related-posts omission is reasonable.**

The local candidates described in the notes concern in-context attention retrieval, not document search. An empty related-posts section is better than a misleading link.

## The five judgment calls

| Call | Verdict |
|---|---|
| **(a) M=16 arithmetic** | **Partly wrong.** `32 + 16/ln(16) = 37.77` slots and `×4 = 151.1 B` is correct under the paper’s average connection-ID formula. But call it approximately 151 bytes of connection-ID capacity per object, not total bytes per vector; hnswlib also stores headers, vector data and labels. The allocated-versus-realized distinction is honest, but pin the source commit. Removing 21 as universally unsourced was wrong: Qdrant reports about 21 realized layer-0 links for its specific one-million-point benchmark at `m=16`. [Qdrant](https://qdrant.tech/articles/filtered-vector-search-acorn/) |
| **(b) Percolation demotion** | **Correct demotion, incomplete replacement.** No transferable HNSW theorem justifies `s≈1/d`. Random-graph or random-geometric-graph thresholds do not automatically apply to RNG-pruned, hub-heavy HNSW under correlated predicates. But V36 must retain ACORN’s assumptions: no predicate clustering, expected degree rather than guaranteed degree, and no general connectivity guarantee. ACORN also gives the more relevant path-disconnection bound `O(log n · (1-s)^(Mγ))`; use that. [ACORN §6.3.1](https://arxiv.org/html/2403.04871) |
| **(c) Furnas drop** | **Wrong.** A full scan of the original paper is available through a legitimate scholarly mirror, and the abstract contains the `<0.20` sentence verbatim. Re-add it with its actual scope: spontaneous naming across five application-related domains, not a universal claim about modern search queries. [Primary-paper scan](https://citeseerx.ist.psu.edu/document?doi=27fa6ede8c9ffc305d06c9307e47321b41540e11&repid=rep1&type=pdf) |
| **(d) Related posts** | **Right.** No forced link. |
| **(e) C39 negative** | **Wrong.** Pailitao-VL is the counterexample. Delete C39. |

Do not proceed to outlining. The thesis, C39, V41, OneRec treatment, recency statuses, and unsupported Throughline claims must be repaired first.