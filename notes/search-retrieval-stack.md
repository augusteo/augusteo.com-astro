# The Index Is Not the System

## Spec

**What / who / walk-away.** A long-form explainer on how search actually works, told as the history of the index and the system built on top of it. Scope: search (web, site, product, document), not recommendation or advertising.

**The argument, fourth revision, after three Gate 0 halts:**

> Benchmark relevance is not what decides whether a retrieval component gets replaced. What decides it is operational: what the incumbent does that the benchmark never measured, and whether the surface being served actually needs that. The same technology replaces the incumbent on one surface and cannot touch it on another.

Two deployments by the same team, in the same company, in the same year, make the point better than any general claim could. In Kuaishou out-of-mall search, the inverted-index branch persisted despite converting below platform average, because it was the only branch where operations could inject a term within hours without retraining; the generative system that finally replaced it had to rebuild that editing path first, and reached 0.553 intervention activation against the inverted index's 0.761. On detail-page search, a system the same authors classify as carrying "essentially no real-time intervention capability" took the entire traffic. Editability was decisive in one place and irrelevant in the other.

The falsification test is per-case and stated in advance: the thesis is wrong wherever a component is replaced purely on benchmark quality, with no operational capability recovered and none needed. It is not a law about all replacements, and the post does not dress it as one. Three prior revisions of this thesis were killed at this gate for exactly that.

Revision history, kept because it is why this version is worth trusting. v1 claimed nothing was ever replaced; killed by OneRec. v2 scoped to search to dodge that; killed by OneSearch and OneRetrieval, both in scope. v3 claimed replacement waits until a successor reimplements the incumbent's operational properties; killed by OneSearch taking the entire detail-page-search traffic while carrying, in the same authors' words, "essentially no real-time intervention capability", which is precisely the observation v3 had named as its own falsifier. v4 stops claiming a general gate and claims surface-dependence, which is what the evidence shows.

One nuance that has to reach the prose, because it sharpens everything: editability was never a property of the inverted index as a data structure. OneRetrieval says "Its editability resides not in the index structure but in the upstream resources that feed it." What survived all those years was the operational pipeline around the index, not the index.

What the reader walks away able to do: name every stage of a real retrieval stack and what it costs in latency and memory; attribute a relevance failure to the right stage; say what a given index is good at beyond its benchmark score; and explain why the obvious replacement for a component has not happened yet, or what it took when it did.

The reader is a backend, platform or ML-infra engineer who has shipped a RAG or site-search system, has an `alpha` knob they do not understand, and is debugging mediocre relevance.

**Three discipline rules, all forced by Gate 0:**

1. **No universals.** "Every", "not one", "never", "always" cannot be earned from examples. Two earlier revisions died on this. The defensible form of the tempting line is "the index alone does not determine end-to-end relevance", and T2 sources even that directly rather than by inference.
2. **No prevalence claims without a denominator.** "Almost always" is as unsupportable as "always" when the evidence is a handful of case studies. Say what the published cases show, name the surface, name the traffic share.
3. **Label the domain of every industrial example, in the claim text, not in a caveat.** Several load-bearing numbers come from advertising (the 10,000-to-several-hundred fan-out, the 10-20 ms stage budget) and video recommendation (two-tower sampling-bias correction, multi-task MMoE ranking). They stay, as illustrations of transferable mechanisms, and the prose names the system and domain each time. They may not carry the search-scoped thesis on their own.

**The named exceptions the post carries in the open:**

- OneRetrieval replaced the inverted-index branch, and in a second configuration the inverted-index and dense branches, in an 11-day A/B at about 8.2% absolute traffic in e-commerce search. Directly in scope. State the traffic share whenever this is cited; it is an experiment bucket, not a platform rollout.
- OneSearch is deployed on the entire traffic of detail-page search, 50% of mall search and 20% of homepage search, while carrying essentially no real-time intervention capability. This is the strongest evidence against any general editability-gate reading and the post leads with it rather than burying it. OneSearch-V2 is its successor.
- ColPali replaces the OCR/parsing ingestion pipeline rather than adding to it.
- OneRec takes 100% of QPS in one Kuaishou business scenario, which is recommendation, so out of scope, and named in one sentence rather than omitted.

**Recency policy, restated after Gate 0.** The topic is actively-evolving, so the bar is 12 months and there is no 18-month tier. Gate 0 caught an unsanctioned 18-month label leaking into 26 rows. Every row sits in exactly one of FOUR buckets, and the bucket is written in the row. (Gate 0 run 3 caught the Spec saying three while the matrix used four; the contract and the classifications must agree.)

1. `foundational-locked` - the paper that defined the method (HNSW, BM25, CLIP, PQ, ColBERT, DPR, BEIR, WAND, LSH, Furnas). Age-exempt by field status.
2. `method-defining historical source, exempt from the 12-month bar` - not field-foundational, but cited for the mechanism it introduced rather than for what is true today.
3. `dated current-practice evidence` - a claim about what a system does NOW, backed by a source older than 12 months. These pass only if the prose carries the date out loud ("as of the June 2025 technical report", "ranked first as of February 2026"). A present-tense claim on one of these rows is a Gate 2 halt.
4. `historical empirical result` - a measured number from a specific past experiment: a benchmark standing, a latency figure, a recall percentage, a business lift. Age-exempt only as a record of that experiment. The prose names the year and the system and draws no current-practice inference. A system mattering historically does not make its numbers foundational.

Bucket 2 is the one that invites abuse. It means "cited for the mechanism this work introduced". It does not cover a survey or tutorial that summarized a field it did not define; Gate 0 run 3 caught exactly that laundering on the PVLDB tutorial rows.

**Length:** ~24,000 words, ~55-minute read. Comparable to `ssl-pretraining-recipes` (22.8k words, 13 figures).

**Figure mix:** 13 figures, all `static-svg` as of Gate 1 (2026-08-24). Both figures originally typed `interactive-canvas` were re-typed through the unlock protocol with Vic's approval: neither's intuition depended on the reader moving a control. Details in the figure table.

**Title sketch:** *The Index Is Not the System*.

**Tags:** `["Tech", "AI", "ML"]`.

**Flagged for Phase 2 to resolve:**
- The seed article's "M=16 gives ~21 links per node" is NOT a paper claim. The HNSW paper gives `Mmax0 = 2M` (32 at layer 0) and an average-memory formula `(Mmax0 + mL*Mmax) * bytes_per_link` = ~38 link slots ≈ 151 bytes/vector at M=16, validated against the paper's own stated "about 60-450 bytes per object" range. Either source ~21 to a measurement of *realized* degree (hnswlib instrumentation) and label it as such, or rebuild the percolation line on the paper's numbers. The allocated-vs-realized gap is itself the more interesting sentence.
- The VLDB'25 filtered-vector-search paper is a 5-page **tutorial**, not a survey, and contains no benchmark numbers. Cite for taxonomy only.
- RACORN-1 (arXiv:2607.00768) is real but is a July 2026 preprint with no visible peer review. Attribute its numbers ("the authors report"), never assert them.
- Cascade Ranking for Operational E-commerce Search (KDD 2017) is **Liu et al.**, not Wang et al. Wang et al. SIGIR 2011 is a different paper.
- MARGINAL rows flagged at Phase 1 are now all CLOSED; see the matrix. Kamphuis, PLAID, LCRON and BEQUE upgraded to verified. Pailitao 20% verified but re-scoped to the reranker. ColPali indexing speeds and the Furnas <0.20 figure closed by drop. arXiv:2604.01733 dropped as unnecessary.
- CORRECTED after Gate 0: an earlier pass claimed no first-party production LLM-reranker deployment had been published. That was false and was refuted by a source already in this matrix. See C39: Pailitao-VL reports 76 ms/query in production. Do not write the L3 box as an open question.

## Throughline

**One query, walked down the whole stack:**

> `waterproof hiking boots wide toe box under $150`

Composite throughline. The query is synthetic; every number attached to every rung cites a public source. The query is chosen because it carries a paraphrase trap (`wide toe box` / "roomy forefoot"), an exact-match trap (brand and SKU), and a structured predicate (`under $150`) that is not a text-matching problem at all — which is what forces filtering and multi-field ranking to be load-bearing rather than a digression.

Per-act rhythm — each act opens by naming what the query can now do, and closes by naming what it still can't:

| act | the query gains | the query still can't |
|---|---|---|
| 1. The only question | nothing yet; the scan is the enemy | be answered without touching all N docs. Scale anchor is GOV2 at 25.2M documents (L2), the largest figure the matrix actually supports; do not write 10^8 |
| 2. The lexical machine | fast term match over a corpus far too large to scan, ranked by BM25 | match "roomy forefoot"; handle `under $150` as anything but another term |
| 3. The vector turn | matches on meaning rather than on shared terms, which is what the vocabulary problem (L34) predicts you need | keep exact SKUs; survive out-of-domain; keep recall once filtered |
| 4. The reconvergence | semantics inside the inverted index; both signals fused | escape the cost of query expansion; know how to weight the fusion |
| 5. Searching with a picture | be a photo instead of words | bind attributes and order ("black strap on red bag") |
| 6. The cascade | an order that accounts for more than text similarity | be trusted from offline metrics alone |

Callback discipline: when the throughline changes inside an act, name the change in prose. Don't make the reader infer it from a figure.

**Evidence status of the throughline, per Gate 0.** The query is a worked illustration, not a benchmark result, and the draft must not let it borrow authority it hasn't earned:

- "A lexical index cannot match `roomy forefoot` to `wide toe box`" is the vocabulary problem, and it has a real citation (L34, Furnas et al., probability <0.20 across five domains). The specific footwear example is illustrative.
- "A dense retriever catches the paraphrase" is NOT directly evidenced. DPR's gains (V2, V3) are aggregate top-20 QA accuracy, not a paraphrase-matching result. Write it as what the vocabulary problem predicts you need and what dense retrieval is designed to do, not as a measured paraphrase win.
- "A dense retriever loses exact SKUs" is supported by V4 (dense retrievers underperform sparse methods on entity-rich questions and generalize only to common entities). That evidence is Wikidata entity questions, not product SKUs. The post says so rather than implying a SKU benchmark exists.
- "`under $150` is not a text-matching problem" now has a row (T1): the PVLDB tutorial uses brand and price-range filtering as its own motivating e-commerce example. BM25F (L31, L32) covers weighted fields, not numeric range predicates, so the filter is a separate mechanism and act 3 carries the evidence.
- Act 6 does not "finally" give the query an order. BM25 already ordered it in act 2. What the cascade adds is an order informed by more than text similarity, under a latency budget.

## Research notes

Grouped by act. Every excerpt below was fetched and verified verbatim on 2026-08-24 unless marked otherwise. Abstract-vs-body is labelled because the two differ and the difference has bitten this pipeline before.

### Act 1 — the only question

**The exhaustive scan is the baseline every index is defined against.**

> "Given that search engines need to answer user queries within fractions of a second, naively traversing this basic index structure, which could take hundreds of milliseconds or more for common terms, is not acceptable."
>
> Ding & Suel, "Faster Top-k Document Retrieval Using Block-Max Indexes," SIGIR 2011, §1 (body). https://research.engineering.nyu.edu/~suel/papers/bmw.pdf

The measured version, on TREC GOV2 (25.2M docs, 426 GB raw, 8,759 MB compressed index), from Tables 1-2 (these are table cells, not quotable prose):

| strategy | avg ms/query | docs fully scored |
|---|---|---|
| exhaustive OR | 225.7 | 3,815,676 |
| WAND | 77.6 | 178,391 |
| block-max WAND | 27.9 | 21,921 |
| exhaustive AND | 11.4 | 20,026 |

Also: "disjunctive queries tend to be significantly (by about an order of magnitude for exhaustive query processing) more expensive than conjunctive queries" (body, §2.2).

**The vector-side equivalent is a formal result, not folklore.** Trees and space partitioning do not merely get slow in high dimensions; they provably degenerate.

> "We show formally that these methods exhibit linear complexity at high dimensionality, and that existing methods are outperformed on average by a simple sequential scan if the number of dimensions exceeds around 10."
>
> "There is no organization of HDVS based on partitioning or clustering which does not degenerate to a sequential scan if dimensionality exceeds a certain threshold."
>
> Weber, Schek & Blott, "A Quantitative Analysis and Performance Study for Similarity-Search Methods in High-Dimensional Spaces," VLDB 1998, abstract and Conclusions. https://www.vldb.org/conf/1998/p194.pdf

GAP: no crisp per-query "brute-force kNN at N=1M, d=768 costs X ms" number is sourced. The available Faiss figure (arXiv:1702.08734) is 2017 hardware and measures graph construction, not per-query scan. Act 1 should lean on Weber et al. for the vector side and Ding & Suel for the text side rather than inventing a scan benchmark.

### Act 2 — the lexical machine

**The structure.**

> "An inverted index consists of many inverted lists, where each inverted list Lw is a list of postings describing all places where term w occurs in the collection."
>
> "The inverted lists of common query terms may consist of many millions or even billions of postings."
>
> "inverted lists are often split into blocks of, say, 64 or 128 docIDs, such that each block can be decompressed separately."
>
> Ding & Suel, SIGIR 2011, §2.1 (body).

**IDF is derived, not bolted on.**

> "The resulting formula is a close approximation to classical idf (it can be made closer still by a slight modification of the model [47])"
>
> Robertson & Zaragoza, "The Probabilistic Relevance Framework: BM25 and Beyond," FnTIR 3(4):333-389, 2009, §3.1 (body). https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf

**Mechanism 1, saturation (k1).**

> "We refer to this behaviour as saturation. That is, any one term's contribution to the document score cannot exceed a saturation point (the asymptotic limit), however, frequently it occurs in the document."
>
> "Thus for high k, increments in tf continue to contribute significantly to the score, whereas for low k, the additional contribution of a newly observed occurrence tails off very rapidly."
>
> Same, §3.4.2 and §3.4.4 (body). Saturation function is Eq. 3.10, tf/(k+tf). The comma placement in the first quote is as extracted from the PDF.

Contrast with the alternatives, which is where the intuition lives: "The latter has a somewhat similar shape curve, but does not have an asymptotic maximum, it goes to infinity, even if somewhat slower than tf itself." (§3.5, body; the source uses an em-dash where this file uses a comma, so do not re-quote this one verbatim without restoring it.)

**Mechanism 2, length normalization (b), and why it is soft.**

> "The verbosity hypothesis suggests that we should simply normalise any observed tf s by dividing by document length. The scope hypothesis, on the other hand, at least in its extreme version, suggests the opposite."
>
> "Thus setting b = 1 will perform full document-length normalisation, while b = 0 will switch normalisation off."
>
> Same, §3.4.5 (body).

**The model does not supply its own constants.**

> "Concerning the internal parameters, the model provides no guidance on how these should be set. This may be regarded as a limitation of the model."
>
> "suggest that in general values such as 0.5 < b < 0.8 and 1.2 < k1 < 2 are reasonably good in many circumstances. However, there is also evidence that optimal values do depend on other factors (such as the type of documents or queries)."
>
> Same, §3.5 (body).

And a useful piece of trivia that kills a common confusion: "A common variant is to add a (k1 + 1) component to the numerator of the saturation function. This is the same for all terms, and therefore does not affect the ranking produced." (§3.5.1, body).

**Which BM25 do you mean. The ambiguity is real; the consequence is not.** This corrects the framing in the Phase-1 spec.

> "When researchers speak of BM25, it is not entirely clear which variant they mean, since many tweaks to Robertson et al.'s original formulation have been proposed. When practitioners speak of BM25, they most likely refer to the implementation in the Lucene open-source search library. Does this ambiguity "matter"? We attempt to answer this question with a large-scale reproducibility study of BM25, considering eight variants. Experiments on three newswire collections show that there are no significant effectiveness differences between them, including Lucene's often maligned approximation of document length."
>
> Kamphuis, de Vries, Boytsov & Lin, "Which BM25 Do You Mean? A Large-Scale Reproducibility Study of Scoring Variants," ECIR 2020, abstract. https://cs.uwaterloo.ca/~jimmylin/publications/Kamphuis_etal_ECIR2020_preprint.pdf

> "Both an ANOVA and Tukey's HSD show no significant differences between any variant, on all test collections. This confirms the findings of Trotman et al. [11]: effectiveness differences are unlikely an effect of the choice of the BM25 variant. Across the IR literature, we find that differences due to more mundane settings (such as the choice of stopwords) are often larger than the differences we observe here."
>
> Same, §3.3 (body). Conclusion: "we conclude that the answer appears to be "no, it does not"."

The genuinely interesting mechanical detail from the same paper:

> "the document length used in the scoring function is compressed (in a lossy manner) to a one byte value, denoted Ldlossy. With only 256 distinct document lengths, Lucene can pre-compute the value of k1 · (1 - b + b · (Ldlossy/Lavg)) for each possible length, resulting in fewer computations at query time."
>
> Same, §2 (body).

Defaults, verified from official sources: Elasticsearch ships "BM25 similarity (default)" with k1 "1.2" and b "0.75" (https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity). Lucene 10.0.0 `BM25Similarity` no-arg constructor is "BM25 with these default values: k1 = 1.2 b = 0.75 discountOverlaps = true" (javadoc). Anserini defaults differ: "models are set to k1 = 0.9 and b = 0.4, Anserini's defaults" (Kamphuis et al., §3.2, body). Note the Lucene javadoc does not itself assert BM25 is the default similarity; that comes from the Elastic docs.

**Dynamic pruning: upper bounds let you skip.**

> "at the first level, our method iterates in parallel over query term postings and identifies candidate documents using an approximate evaluation taking into account only partial information on term occurrences and no query independent factors; at the second level, promising candidates are fully evaluated and their exact scores are computed."
>
> "our algorithm significantly reduces the total number of full evaluations by more than 90%, almost without any loss in precision or recall."
>
> Broder, Carmel, Herscovici, Soffer & Zien, "Efficient query evaluation using a two-level retrieval process," CIKM 2003, abstract. DOI 10.1145/956863.956944. Verified via IBM Research's first-party listing (dl.acm.org returned 403). Body not obtained.

The mechanism, described in a peer-reviewed third paper rather than by Broder et al. themselves:

> "Thus, WAND achieves early termination by enabling skips over postings that cannot make into the top results. For the threshold value, we use the lowest score in the heap that contains the top-k results found thusfar."
>
> Ding & Suel, SIGIR 2011, §2.6 (body).

Block-max, and the diagnosis of what plain WAND leaves on the table:

> "Essentially, this is a structure that stores the maximum impact score for each block of a compressed inverted list in uncompressed form, thus enabling us to skip large parts of the lists." (abstract)
>
> "Our initial insight is that skipping in WAND is limited because it uses the maximum impact scores over the entire lists, which can be much larger than average." (body, §3)
>
> "WAND only evaluates 4.6% of the docIDs compared to exhaustive OR, which approximately matches the numbers in [11]." (body, §6.2)
>
> Ding & Suel, SIGIR 2011.

MaxScore is Turtle & Flood, Information Processing and Management 31(6):831-850, 1995 (attribution only, taken from Ding & Suel's reference [32]; the paper itself was not read, and the author is Flood, not the commonly seen "Flagg").

**Multi-field: how `under $150` and category metadata enter a lexical scorer.** The CIKM 2004 BM25F paper could not be fetched (ACM 403, no open mirror). The monograph by two of its three authors makes the identical argument and is used instead.

> "an obvious practical approach ... would be to apply the function separately to each stream, and then combine these in some linear combination (with stream weights) for the final document score. ... This seems a little unreasonable, a better assumption might be that eliteness is a term/document property, shared across the streams of the document."
>
> "we should combine evidence across terms and streams in the opposite order to that suggested above: first streams, then terms. That is, for each term, we should accumulate evidence for eliteness across all the streams. The saturation function should be applied at this stage, to the total evidence for each term."
>
> Robertson & Zaragoza, FnTIR 2009, §3.6.1 (body). NOTE: the first excerpt contains an em-dash in the source where this file has a comma; restore it or paraphrase rather than quoting as-is.

GAP, unclosed: Furnas, Landauer, Gomez & Dumais, "The vocabulary problem in human-system communication," CACM 30(11):964-971, 1987. Not fetched. The widely repeated "two people pick the same term under 20% of the time" figure is UNVERIFIED and must not appear in the post until the paper is read.

### Act 3 — the vector turn

**The bi-encoder, and why it factorizes.** DPR uses "two independent BERT (Devlin et al., 2019) networks (base, uncased) and take the representation at the [CLS] token as the output, so d = 768" (body, §3.1). The gain: "our dense retriever outperforms a strong Lucene-BM25 system largely by 9%-19% absolute in terms of top-20 passage retrieval accuracy" (abstract), concretely "78.4% vs. 59.1% for top-20 accuracy on Natural Questions" (body, §5.1). Note the paper's own exception: "With the exception of SQuAD, DPR performs consistently better than BM25 on all datasets" (body, §5.1) — attributed to SQuAD's restricted Wikipedia subset, not to a lexical-matching effect. Do not over-read it as the exact-match failure.

*Karpukhin et al., "Dense Passage Retrieval for Open-Domain Question Answering," EMNLP 2020, arXiv:2004.04906 v1 2020-04-10.*

**The exact-match trap, properly sourced.** This is the one that maps onto the throughline's SKU problem.

> "We first construct EntityQuestions, a set of simple, entity-rich questions based on facts from Wikidata (e.g., "Where was Arve Furset born?"), and observe that dense retrievers drastically underperform sparse methods. We investigate this issue and uncover that dense retrievers can only generalize to common entities unless the question pattern is explicitly observed during training."
>
> Sciavolino, Zhong, Lee & Chen, "Simple Entity-Centric Questions Challenge Dense Retrievers," EMNLP 2021, arXiv:2109.08535 v1 2021-09-17, abstract.

**The ANN ladder as a sequence of fixed wrong assumptions.**

PQ, abstract only (TPAMI full text unreachable behind IEEE; every OA mirror dead or bot-walled):

> "The idea is to decompose the space into a Cartesian product of low-dimensional subspaces and to quantize each subspace separately. A vector is represented by a short code composed of its subspace quantization indices."
>
> Jegou, Douze & Schmid, TPAMI 33(1):117-128, 2011, DOI 10.1109/TPAMI.2010.57.

For the code-size arithmetic use the Faiss paper instead (Jegou is a co-author; Faiss is the reference implementation): "The number of reconstructed vectors is KM and the code size is thus M ceil(log2 (K))" and "we will use the notation PQ6x10 for a product quantizer with 6 sub-vectors each encoded in 10 bits (M = 6, K = 2^10)" (arXiv:2401.08281, §4.1, body). Derive the 768-dim example from this rather than quoting a compression ratio: 3072 bytes at float32, 96 bytes at PQ96x8, 32x.

ScaNN, the cleanest "each index fixed a specific wrong assumption" beat in the lineage:

> "Traditional approaches to quantization aim to minimize the reconstruction error of the database points. Based on the observation that for a given query, the database points that have the largest inner products are more relevant, we develop a family of anisotropic quantization loss functions. Under natural statistical assumptions, we show that quantization with these loss functions leads to a new variant of vector quantization that more greatly penalizes the parallel component of a datapoint's residual relative to its orthogonal component."
>
> Guo et al., arXiv:1908.10396 v1 2019-08-27 (ICML 2020), abstract.

LSH is a paraphrase-only source in this pass: the reachable STOC 1998 scan is OCR-corrupted and no line from it is quotable. Carry the claim (provable guarantees, exponent depending on 1/epsilon making the polylog-query variant theoretical) as paraphrase, or drop the specifics.

**HNSW, exactly.** All from Malkov & Yashunin, arXiv:1603.09320 v4 2018-08-14 (v1 2016-03-30), body.

> "Simulations also suggest that 2∙ M is a good choice for Mmax0: setting the parameter higher leads to performance degradation and excessive memory usage." (§4.1)

> "the average memory consumption per element is (Mmax0+mL ∙Mmax)∙bytes_per_link. If we limit the maximum total number of elements by approximately four billions, we can use four-byte unsigned integers to store the connections. Tests suggest that typical close to optimal M values usually lie in a range between 6 and 48. This means that the typical memory requirements for the index (excluding the size of the data) are about 60-450 bytes per object, which is in a good agreement with the simulations." (§4.2.3)

> "When the number of candidates is large enough the heuristic allows getting the exact relative neighborhood graph [46] as a subgraph, a minimal subgraph of the Delaunay graph deducible by using only the distances between the nodes. The relative neighborhood graph allows easily keeping the global connected component, even in case of highly clustered data" (§3)

> "the heuristic that accounts for the distances between the candidate elements to create connections in diverse directions" (§4.1)

> "A simple choice for the optimal mL is 1/ln(M), this corresponds to the skip list parameter p=1/M with an average single element overlap between the layers." (§4.1)

> "The only meaningful construction parameter left for the user is M. A reasonable range of M is from 5 to 48." (§4.1)

> "For real data such as SIFT vectors [1] (which have complex mixed structure), the performance improvement by increasing the mL is higher, but less prominent at current settings compared to improvement from the heuristic" (§4.1)

Arithmetic reproducing the paper's own range, performed 2026-08-24 (this is the post's derivation, not a quote):
- M=6: (12 + 0.5581x6) x 4 B = 61.4 B, paper says ~60.
- M=48: (96 + 0.2583x48) x 4 B = 433.6 B, paper says ~450.
- M=16: (32 + 0.3607x16) = 37.77 slots x 4 B = 151.1 B.

CORRECTION CARRIED: "M=16 gives ~21 links per node" is not in the paper. A full-text grep finds "21" only as reference [21], a page range, and a citation title. It is also not sourceable as a measured realized average degree; nothing citable was found. What is verifiable is the allocated-vs-realized split, from maintainer source:

> `maxM0_ = M_ * 2;`
> `size_links_level0_ = maxM0_ * sizeof(tableint) + sizeof(linklistsizeint);`
>
> nmslib/hnswlib, `hnswlib/hnswalg.h`, master, lines 112-113 and 120, accessed 2026-08-24 (no commit SHA pinned).

hnswlib allocates a fixed 2M-slot block per node at layer 0 whether or not the pruning heuristic fills it. Memory is charged on allocated degree; realized degree is smaller and the library does not publish it. That gap is the honest and more interesting sentence.

**The hierarchy may be dead weight in high dimensions.**

> "a flat navigable small world graph graph retains all of the benefits of HNSW on high-dimensional datasets, with latency and recall performance essentially \emph{identical} to the original algorithm but with less memory overhead" (abstract; "graph graph" and the raw LaTeX are in the source)

> "In high-dimensional metric spaces, k-NN proximity graphs form a highway routing structure where a small subset of nodes are well-connected and heavily traversed, particularly in the early stages of graph search." (body, §4, Hub Highways hypothesis)

> "our implementation saves roughly 38% and 39% of peak memory consumption during index construction on two Big-ANN benchmark datasets compared to hnswlib" (body, §1.1)

> "Perhaps most importantly, we still have no satisfactory understanding of why hierarchy does not help." (body, §1.1)
>
> Munyampirwa, Lakshman & Coleman, "Down with the Hierarchy: The 'H' in HNSW Stands for 'Hubs'," arXiv:2412.01940 v1 2024-12-02, v3 2025-07-03. 13 datasets, 1M to 100M vectors. No rebuttal found. Venue: an ECIR 2026 chapter (DOI 10.1007/978-3-032-21324-2_3) is listed on ACM DL and Springer but both 403'd on fetch, so venue is search-level only.

Pairing note for the draft: the 2024 critique is not overturning the 2016 paper so much as finishing a sentence its authors already wrote.

**Quantization now.** RaBitQ "quantizes $D$-dimensional vectors into $D$-bit strings" and "guarantees a sharp theoretical error bound", against prior methods that "do not have a theoretical error bound and are observed to fail disastrously on some real-world datasets" (arXiv:2405.12497 v1 2024-05-21, abstract). Shipped, with the rerank pass that makes it work, from Elastic (vendor, first-party, with parameters):

> "Naive binary quantization is exceptionally lossy and achieving adequate recall requires gathering 10x or 100x additional neighbors to rerank. This just doesn't cut it."
>
> "Here, 1bit quantization and HNSW gets above 90% recall with only 3x oversampling."
>
> Elastic Search Labs, "Better Binary Quantization (BBQ) in Lucene and Elasticsearch," 2024-11-11.

Elastic also lists where BBQ diverges from the RaBitQ paper (single centroid, no random rotation so the estimator is not unbiased, rescoring deferred until after graph search). Good material for the "the index absorbs the paper rather than implementing it" beat.

Matryoshka: "MRL which encodes information at different granularities and allows a single embedding to adapt to the computational constraints of downstream tasks ... imposes no additional cost during inference and deployment", "up to 14x smaller embedding size for ImageNet-1K classification at the same level of accuracy" (arXiv:2205.13147, abstract).

**Where the vector physically lives.**

SSD: "DiskANN that can index, store, and search a billion point database on a single workstation with just 64GB RAM and an inexpensive solid-state drive (SSD)" and ">5000 queries a second with < 3ms mean latency and 95%+ 1-recall@1 on a 16 core machine, where state-of-the-art billion-point ANNS algorithms with similar memory footprint like FAISS [18] and IVFOADC+G+P [8] plateau at around 50% 1-recall@1" (NeurIPS 2019, abstract). The body says "under 5 milliseconds" for the same claim; the paper carries two figures.

Object storage, and the rollback to IVF that nobody frames as a rollback (turbopuffer architecture doc, vendor first-party, verified live 2026-08-24):

> "The first query to a namespace reads object storage directly and is slow (p50=874ms for 1M documents), but subsequent, cached queries to that node are faster (p50=14ms for 1M documents)."

> "From first principles, each roundtrip to object storage takes ~100ms. The 3-4 required roundtrips for a cold query often take as little as ~400ms."

> "Vector indexes are based on SPFresh. SPFresh is a centroid-based approximate nearest neighbour index. It has a fast index for locating the nearest centroids to the query vector. A centroid-based index works well for object storage as it minimizes roundtrips and write-amplification, compared to graph-based indexes like HNSW or DiskANN."

Caveat: the page carries a second cold figure, "~500ms on 1M documents", in the index section. Quote 874ms as the routing-section number, not as the page's only cold number.

**Filtered vector search.** Taxonomy from the PVLDB tutorial (5 pages, no benchmark numbers, taxonomy only). Note the third term is "inline-filtering":

> "There are three main execution methods for executing filtered vector search queries depending on the order of operations (filter and vector search) and the vector search type. Pre-filtering, where data is filtered and then KNN search is performed on the result of the filter. This method is preferred when the filter result is small [30]. The remaining two execution methods use a vector index to perform ANN vector search. Post-filtering, where the filters are evaluated on the vector index search result [40]. For inline-filtering, searching and filtering are combined, and the filters can be evaluated before the vector search starts (and stored in a bitmap) or evaluated during the vector index search."

> "post-filtering, in simplified approaches to filtered search, requires the approximate nearest neighbor (ANN) search to yield a multiple of K results to ensure at least K vectors remain after filtering [40], which complicates achieving high recall."
>
> Chronis, Caminal, Papakonstantinou, Ozcan & Ailamaki, "Filtered Vector Search: State-of-the-art and Research Opportunities," PVLDB 18(12):5488-5492, 2025, §2 (body). Its own motivating example is the post's throughline: "an e-commerce search may allow filtering by the brand or price range while searching for similar products to a user provided description."

ACORN. The abstract's only quantitative claim is "outperforming prior methods with 2-1,000x higher throughput at a fixed recall". The variant names live in the body: "We propose two indices: ACORN-γ, designed for high-efficiency search, and ACORN-1" (§1), and "ACORN-1 achieves this by performing the neighbor expansion step solely during search, rather than during construction, as ACORN-γ does" (§5.3). Tradeoff: "ACORN-1 empirically approximates ACORN-γ, attaining at most 5x lower QPS at fixed recall but 9-53x lower TTI" (§1).

THE DEGREE BOUND, which replaces the percolation line as the post's load-bearing mechanism:

> "If a node in the predicate subgraph has degree much lower than 𝑀, this could adversely impact the search convergence and thus recall. For a dataset and query predicate that exhibit no predicate clustering, for any node 𝑣 in 𝐺 (𝑋𝑝 ), E |𝑁𝑝𝑙 (𝑣)| = |𝑁 𝑙 (𝑣)| · 𝑠 = 𝛾 · 𝑀 · 𝑠 > 𝑀, ∀𝑠 > 𝑠𝑚𝑖𝑛"
>
> Patel, Kraft, Guestrin & Zaharia, "ACORN," SIGMOD 2024, arXiv:2403.04871 v1 2024-03-07, §6 "Bounded Degree" (body).

PERCOLATION VERDICT (negative result, carried into the draft): "a filter keeping fraction s of nodes fragments a degree-d graph around s ~ 1/d" is a heuristic analogy, not a theorem about HNSW. The generic result (Callaway, Newman, Strogatz & Watts, PRL 85:5468, arXiv:cond-mat/0007300) is about configuration-model random graphs, and its own abstract concedes such graphs "are quite unlike real world networks". Three reasons it does not transfer: HNSW graphs are geometric, RNG-pruned and hub-heavy rather than randomly wired; real predicates are correlated with embedding position, so filtering is not random node removal (ACORN treats "predicate clustering" as a separate case, and Qdrant's benchmark shows the correlated filter holding up where uncorrelated ones collapsed); and the threshold is a giant-component result, not a recall result. State the s x d intuition as intuition, cite ACORN's bound for the mechanism, and say plainly that correlated filters break the assumption.

Qdrant's filterable HNSW (vendor, first-party, with a reproduction kit, 500 queries per filter shape, and disclosed build-to-build variance). Verified against the live article 2026-08-24:

> "On our one-million-point collection, the HNSW index built in 116 seconds without them and 507 to 652 seconds with them, 4.4x to 5.6x the cost."

> "Qdrant builds those edges per payload field, never per combination, so an [AND] filter lands on an intersection that no single field's edges cover."

> "filterable HNSW reaches 91.2% recall at 4.9ms while ACORN needs 20.1ms to reach 90.3%"

> "The 4% intersection is the exception, where both fields exceeded the cap and ACORN leads 99.6% to 92.5%."

> "Planner + ACORN, the fourth strategy, holds 99.9% to 100% recall on all four filters, at 7.2ms to 10.9ms on the graph and 1.5ms on the 1% filter, where all 500 queries came from the payload index."

> "On the 1% row, ACORN's recall spans 70.7% to 74.1% across rebuilds of the same graph, wider than its lead in the table."

DIRECTION WARNING: on the 1% two-field intersection filterable HNSW WINS; on the 4% intersection it LOSES. This is the opposite of the seed article's table and is easy to state backwards.

RACORN-1 exists: arXiv:2607.00768, "RACORN-1: Adaptive Recall-Preserving Speedup for Low-Selectivity Filtered Vector Search," Yoonseok Kim and Gyusik Choe, v1 2026-07-01, 13 pages, no journal-ref, no venue, unrefereed. Its claims ("connectivity instability below 5% selectivity and recall collapse below 1%"; recovery "from 0.45-0.72 (1%) and 0.03-0.10 (0.3%) to 0.70-0.96 and 0.77-0.98") must be attributed to the preprint, never asserted.

### Act 4 — the reconvergence

**Learned sparse: the neural model writes into the inverted index.**

> "Sparse learned representations can further be decomposed into expansion and term weighting components."
>
> "Our implementation using the Anserini IR toolkit is built on the Lucene search library and thus fully compatible with standard inverted indexes."
>
> Lin & Ma, arXiv:2106.14807, 2021-06-28, abstract.

> "SPLADE-v3 further pushes the limit of SPLADE models: it is statistically significantly more effective than both BM25 and SPLADE++, while comparing well to cross-encoder re-rankers. Specifically, it gets more than 40 MRR@10 on the MS MARCO dev set, and improves by 2% the out-of-domain results on the BEIR benchmark."
>
> Lassance, Dejean, Formal & Clinchant, "SPLADE-v3," arXiv:2403.06789, 2024-03-11, abstract. The BEIR figure is a 2% improvement in out-of-domain results, not 2 points. Do not convert.

**The efficiency inversion: the classical half is what blows up.**

> "we derive that the main source of improvement is the reduction of SPLADE query sizes, instead of focusing solely on the FLOPS measure. The reason is that in mono-threaded systems, there are many techniques that allow for reducing the amount of effective FLOPS computed per query, but query size is then a major bottleneck."
>
> Lassance & Clinchant, "An Efficiency Study for SPLADE Models," SIGIR 2022, arXiv:2207.03834, §3 (body). An inline footnote marker glossing "query sizes" as "amount of tokens at the SPLADE output" has been removed; nothing else edited.

> "achieve similar latency (less than 4ms difference) as traditional BM25, while having similar performance (less than 10% MRR@10 reduction) as the state-of-the-art single-stage neural rankers on in-domain data"
>
> Same, abstract. BM25's own latency on that single-core PISA setup is 4 ms (body, §4), so "less than 4ms difference" is roughly a doubling, not a rounding error. Say so plainly.

**doc2query--: throw away 70% of the generated text and everything gets better.**

> "using a relevance model to remove poor-quality queries can improve the retrieval effectiveness of Doc2Query by up to 16%, while simultaneously reducing mean query execution time by 23% and cutting the index size by 33%"
>
> "keeping only 30% of expansion queries at n=80, performance is increased from 0.279 to 0.323 - a 16% improvement." (body, §5)
>
> Gospodinov, MacAvaney & Macdonald, "Doc2Query--: When Less is More," ECIR 2023, arXiv:2301.03266.

CORRECTION: the paper states no percentage of generated expansions that are irrelevant. Do not claim one. The evidence is the 70%-discardable result above. On-theme bonus, same paper, footnote 2 (body): "we find that SPLADE [10] generates the following seemingly-unrelated terms for the passage in Figure 1 in the top 20 expansion terms: reed, herb, and troy."

**Fusion, and the reversal.** RRF's constant was chosen, not invented at random:

> "where k = 60 was fixed during a pilot investigation and not altered during subsequent validation."
>
> "The results of the first, shown in table 1, indicated that k = 60 was near-optimal, but that the choice was not critical."
>
> Cormack, Clarke & Buettcher, SIGIR 2009, §2 (body). https://cormack.uwaterloo.ca/cormacksigir09-rrf.pdf (the usual plg.uwaterloo.ca path now 404s).

Elasticsearch ships it, and sells it on the absence of tuning:

> "RRF requires no tuning, and the different relevance indicators do not have to be related to each other to achieve high-quality results."
>
> "rank_constant (Optional, integer) ... Defaults to 60."
>
> Elastic official docs, https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion, accessed 2026-08-24.

And the finding that turns this into a story:

> "Contrary to existing studies, we find RRF to be sensitive to its parameters; that the learning of a CC fusion is generally agnostic to the choice of score normalization; that CC outperforms RRF in in-domain and out-of-domain settings; and finally, that CC is sample efficient, requiring only a small set of training examples to tune its only parameter to a target domain."
>
> Bruch, Gai & Ingber, "An Analysis of Fusion Functions for Hybrid Retrieval," ACM TOIS, arXiv:2210.11934, 2022-10-21, abstract.

CORRECTION to the Phase-1 spec: there is no primary support for "score normalization for hybrid is hard". The best source finds the opposite, and lands a sharper point instead. Rewrite the beat around the reversal.

**The interaction axis, sourceable from one abstract.**

> "they must feed each query-document pair through a massive neural network to compute a single relevance score"
>
> "By delaying and yet retaining this fine-granular interaction, ColBERT can leverage the expressiveness of deep LMs while simultaneously gaining the ability to pre-compute document representations offline, considerably speeding up query processing."
>
> "while executing two orders-of-magnitude faster and requiring four orders-of-magnitude fewer FLOPs per query."
>
> Khattab & Zaharia, "ColBERT," SIGIR 2020, arXiv:2004.12832, abstract.

> "reduce late interaction search latency by up to 7x on a GPU and 45x on a CPU against vanilla ColBERTv2, while continuing to deliver state-of-the-art retrieval quality."
>
> Santhanam, Khattab, Potts & Zaharia, "PLAID," CIKM 2022, arXiv:2205.09707, abstract. VERIFIED (was snippet-only).

> "reduces end-to-end latency compared to XTR's reference implementation by 41x, and achieves a 3x speedup over the ColBERTv2/PLAID engine, while preserving retrieval quality."
>
> Scheerer, Zaharia, Potts, Alonso & Khattab, "WARP," arXiv:2501.17788, 2025-01-29, abstract. The 41x is against XTR, the 3x against PLAID. Do not merge.

Cross-encoders: monoBERT is "the top entry in the leaderboard of the MS MARCO passage retrieval task, outperforming the previous state of the art by 27% (relative) in MRR@10" (arXiv:1901.04085, abstract); monoT5 is "at least on par with previous classification-based models and can surpass them with larger, more-recent models" plus zero-shot transfer beating cross-validated SOTA on Robust04 (arXiv:2003.06713, abstract).

**BEIR, the keystone, in full.**

> "Our results show BM25 is a robust baseline and re-ranking and late-interaction-based models on average achieve the best zero-shot performances, however, at high computational costs. In contrast, dense and sparse-retrieval models are computationally more efficient but often underperform other approaches, highlighting the considerable room for improvement in their generalization capabilities."
>
> Thakur, Reimers, Ruckle, Srivastava & Gurevych, "BEIR," NeurIPS 2021 D&B, arXiv:2104.08663, abstract. Scope: "18 publicly available datasets" and "10 state-of-the-art retrieval systems", zero-shot.

DRAFTING GUARD: the claim is about zero-shot / out-of-domain performance only. BM25 is not claimed to beat neural models in-domain. The families that beat it are re-ranking and late-interaction; the families that often lose to it are dense and sparse retrieval.

### Act 5 — searching with a picture

**The shared space is a body claim, not an abstract claim.**

> "CLIP learns a multi-modal embedding space by jointly training an image encoder and text encoder to maximize the cosine similarity of the image and text embeddings of the N real pairs in the batch while minimizing the cosine similarity of the embeddings of the N²-N incorrect pairings."
>
> Radford et al., arXiv:2103.00020, §2.3 (body). The abstract only describes the training task and the "400 million (image, text) pairs".

**The failure, then the correction, in the right order and at the right scope.**

> "We probe a diverse range of state-of-the-art vision and language models and find that, surprisingly, none of them do much better than chance." (Winoground, arXiv:2204.03162, abstract)

> "We show where state-of-the-art VLMs have poor relational understanding, can blunder when linking objects to their attributes, and demonstrate a severe lack of order sensitivity." (ARO, arXiv:2210.01936, abstract)

> "Surprisingly, we find significant biases in all these benchmarks rendering them hackable. This hackability is so dire that blind models with no access to the image outperform state-of-the-art vision-language models." (SugarCrepe, arXiv:2306.14610, abstract)

SCOPE, which the post can easily overstate. SugarCrepe's body scopes the finding to image-to-text benchmarks: "we uncover a crucial vulnerability in not just one but all these image-to-text compositionality benchmarks". Its Table 1 covers CREPE, ARO and VL-CheckList. Winoground is handled separately, as text-to-image, and is described as "a small dataset manually curated by human annotators" whose captions "contain identical words that appear in different orders". So: ARO and CREPE are debunked; Winoground stands. Do not conflate this with the separate Diwan et al. critique that Winoground requires more than compositional understanding.

**The 2025 fix was not a better contrastive loss.**

> "we extend the original image-text training objective with several prior, independently developed techniques into a unified recipe -- this includes captioning-based pretraining, self-supervised losses (self-distillation, masked prediction) and online data curation."
>
> SigLIP 2, arXiv:2502.14786, 2025-02-20, abstract. The contrastive objective was kept and surrounded, not fixed. Absorption beat.

**The document-image flip.** ColPali's abstract carries no numbers. Verified from the body: 81.3 average nDCG@5 for ColPali (+Late Inter.) vs 67.0 for the strongest text pipeline (Unstructured + Captioning, BGE-M3), Table 2. Storage is "a memory footprint of 256 KB per page" (§5.2, body), not the ~250 KB widely quoted. The 0.39 vs 7.22 s/page indexing figures appear NOWHERE in the text; they exist only inside Figure 3, a bar chart. Cite as figure-read or drop.

*Faysse et al., "ColPali," ICLR 2025, arXiv:2407.01449 v2 2024-07-02.*

The 2026 sequel, by an overlapping author set:

> "visual retrievers outperform textual ones, late-interaction models and textual reranking substantially improve performance, and hybrid or purely visual contexts enhance answer generation quality. However, current models still struggle with non-textual elements, open-ended queries, and fine-grained visual grounding."
>
> ViDoRe V3, arXiv:2601.08620, 2026-01-13, abstract. ~26,000 pages, 3,099 human-verified queries, 6 languages, 12,000 hours of annotation.

> "The 8B model ranks first on the ViDoRe V3 leaderboard as of February 03, 2026, achieving an average NDCG@10 of 63.42."
>
> Nemotron ColEmbed V2, arXiv:2602.03992, 2026-02-03, abstract. Leaderboard claim, ~6 months stale at time of writing. Keep the date inside the sentence; do not assert present tense.

**Unified embeddings: the absorption story, first-party.**

> "generate a unified embedding that outperforms all specialized embeddings previously deployed for each product"
>
> "the deployment of the unified embedding at Pinterest has drastically reduced the operation and engineering cost of maintaining multiple embeddings while improving quality."
>
> Zhai, Wu, Tzeng, Park & Rosenberg, KDD 2019, arXiv:1908.01707, abstract.

> "results from online A/B experiments show substantial gains in key business metrics (up to +7% gross merchandise value/user and +11% click volume)."
>
> ItemSage, KDD 2022, arXiv:2205.11728, abstract.

THE KEYSTONE for the whole post's thesis:

> "These embeddings are employed to power the retrieval of pins and products using HNSW (Malkov and Yashunin, 2018). They are also instrumental in the L1 scoring model, where they enhance the efficiency of token-based retrieval sources. Moreover, [OmniSearchSage] embeddings serve as one of the most critical features in the L2 scoring and relevance models."
>
> Agarwal, Islam Sk, Pancha, Hazra, Xu & Rosenberg, "OmniSearchSage," WWW 2024, arXiv:2404.16260, §5 (body). The source renders the model name as the LaTeX macro `\modelname`; the substitution is bracketed. Either bracket it in the post or paraphrase.

Precision: the embeddings enhance *the efficiency of* token-based retrieval sources, and do so *within the L1 scoring model*. Keep that shape.

Serving, body: "The system is equipped for handling 300k requests per second, maintaining a median (p50) latency of just 3 ms, and 90 percentile (p90) latency of 20 ms." Dimensionality, body: "projects it to a 256-dimensional vector space. Post projection, we apply a L2 normalization on the 256-dimensional vectors". Abstract carries the 300k QPS and the gains (">8% relevance, >7% engagement, and >5% ads CTR"); p50/p90 and the 256-d are body-only.

THE DETAIL WORTH THE WHOLE SECTION, body: "The implementation of this cache-based system efficiently reduces the load on the inference server to approximately 500 QPS". The 300k figure is served behind a 30-day-TTL cache. The neural encoder sees 500 QPS; a classical caching layer absorbs the rest.

**No model wins everywhere.**

> "We benchmark 50 models across our benchmark, finding that no single method dominates across all task categories."
>
> MIEB, arXiv:2504.10471, 2025-04-14, abstract. 38 languages, 130 tasks, 8 categories.

> "It supports Matryoshka Representation Learning, enabling flexible embedding dimensions, and handles inputs up to 32k tokens." / "Qwen3-VL-Embedding-8B attains an overall score of 77.8 on MMEB-V2, ranking first among all models (as of January 8, 2025)."
>
> Qwen3-VL-Embedding, arXiv:2601.04720, 2026-01-08, abstract. The paper's own "January 8, 2025" is a year before its own submission date and is near-certainly a typo for 2026. Quote as written and note it, or paraphrase with the correct date. Do not silently fix a quote.

**And the largest deployment of contrastive retrieval stopped doing contrastive retrieval.**

> "we transitioned the embedding paradigm from traditional contrastive learning to an absolute ID-recognition task. Through anchoring instances to a globally consistent latent space defined by billions of semantic prototypes, we successfully overcome the stochasticity and granularity bottlenecks inherent in existing embedding solutions."
>
> Pailitao-VL, Alibaba, arXiv:2602.13704, 2026-02-14, abstract. Motivation, body §1: contrastive models "excel at distinguishing broad categories, such as a sedan from an SUV, but often fail to resolve subtle intra-concept variations".

NUMBER SCOPE, body §6.4: "Pailitao-VL-Embedding delivers a 2% GMV gain across platform-wide traffic, while Pailitao-VL-Reranker-List yields a 6% GMV increase within standardized product categories. Notably, in emerging AI-driven scenarios such as SKU-price comparison, our architecture achieves an impressive 20% GMV gain". The embedding change bought 2%. The 20% belongs to the reranker in one narrow scenario. Attributing 20% to abandoning contrastive learning would be wrong.

### Act 6 — the cascade, which is the actual system

**The keystone: ANN shipped as an inverted-index operator.** All from Huang et al., "Embedding-based Retrieval in Facebook Search," KDD 2020, arXiv:2006.11632, body.

> "By implementing NN support in terms of pre-existing primitives, instead of writing a separate system, we inherited all the features of the existing system, such as realtime updates, efficient query planning and execution, and support for multi-hop queries (see [3])." (§4.1)

> "we extended the document representation to include embeddings, each with a given string key, and added a (nn <key> :radius <radius>) query operator which matches all documents whose <key> embedding is within the specified radius of the query embedding." (§4.1)

> "At indexing time, each document embedding is quantized and turned into a term (for its coarse cluster) and a payload (for the quantized residual). At query time, the (nn) is internally rewritten into an (or) of the terms associated to the coarse clusters closest to the query embedding (probes), and for matching documents the term payload is retrieved to verify the radius constraint." (§4.1)

> "we found that radius mode can give better trade-off of system performance and result quality. One possible reason is that radius mode enables a constrained NN search (constrained by other parts of the matching expression) but top K mode provides a more relaxed operation which needs to scan the whole index to get top K results. Hence, we use radius based matching in our current production." (§4.1)

Hard negatives, the counterintuitive result:

> "One finding that may first seem counterintuitive is that models trained simply using hard negatives cannot outperform models trained with random negatives." (§6.1.1)

> "Increasing the ratio of easy to hard negatives continues to improve the model recall and saturated at easy:hard=100:1." (§6.1.1)

> "We compared sampling from different rank positions and found sampling between rank 101-500 achieved the best model recall." (§6.1.1)

ATTRIBUTION TRAP: the recall gains belong to online hard negative mining specifically, not to EBR as a whole. "Enabling online hard negative mining was one major contributor to our modeling improvement. It consistently improved embedding model quality significantly across all verticals: +8.38% recall for people search; +7% recall for groups search, and +5.33% recall for events search." (§6.1.1)

And the sentence the post's argument rests on:

> "The model at each stage should be optimized for the distribution of results returned by the preceding layer. However, since the current ranking stages are designed for existing retrieval scenarios, this could result in new results returned from embedding based retrieval to be ranked sub-optimally by the existing rankers." (§5)

**The budget.** From Wang et al., "COLD," DLP-KDD 2020, arXiv:2007.16122 v2.

> "the size M of the candidate set that is fed into the pre-ranking system often reaches ten thousand. Then the pre-ranking model selects top N candidates by certain metrics, e.g. eCPM (expected Cost Per Mille) for advertising system. The magnitude of N is usually several hundred." (§2, body)

> "both ranking and pre-ranking systems have strict latency limit, e.g., 10 ∼ 20 milliseconds." (§1, body; note the sentence covers both stages, it is not a pre-ranking-only SLA)

> "The model expression ability is limited by the vector-product form, and can not utilize the user-ad cross features." (§2.2, body)

> "In normal days, COLD model achieves 6.1% CTR and 6.5% RPM (Revenue Per Mille) improvement... Moreover, the improvement turns to be 9.1% CTR and 10.8% RPM" (§4, body; Double 11)

DERIVED, not quoted: 10,000 microseconds / 10,000 candidates = 1 microsecond; 20,000 / 10,000 = 2. So the L1 budget is roughly 1-2 microseconds per candidate. Caveats to carry: this is wall-clock budget per candidate, not serial CPU time (COLD parallelizes; its Table 3 reports 9.3 ms RT at 6700 QPS against the vector-product DNN's 2 ms at 60000+ QPS), and §1's looser "tens of thousands" would give 0.1-2. Present the tight version as the post's own arithmetic from §2 plus §1.

**Two-tower mechanics.**

> "inference consists of two steps: 1) computing query embedding u(x, θ); 2) performing nearest neighbor search over a set of item embeddings that are pre-computed from embedding function v. ... low-latency retrieval is commonly based on a highly efficient similarity search system built on hashing techniques, e.g., [2, 10, 25], for approximate maximum inner product search (MIPS) problems." (body, §3)

> "in-batch loss is subject to sampling biases, potentially hurting model performance, particularly in the case of highly skewed distribution. In this paper, we present a novel algorithm for estimating item frequency from streaming data." (abstract)
>
> Yi et al., RecSys 2019, DOI 10.1145/3298689.3346996.

**Cascade attribution, corrected.** "Cascade Ranking for Operational E-commerce Search" (KDD 2017, arXiv:1706.02093) is Liu, Xiao, Ou, Si, NOT Wang et al. Liu et al. cite the separate, earlier Wang, Lin & Metzler SIGIR 2011 paper as their reference [22]. Both exist; do not merge them.

**Stage misalignment.**

> "the ranked lists of the ranking stage and previous stages may be inconsistent... we formally define the problem of ranking consistency and propose the Ranking Consistency Score (RCS) metric for evaluation. We demonstrate that ranking consistency has a direct impact on online performance." (abstract)
>
> Gu & Sheng, arXiv:2205.01289 v5, 2022-11-03. PREPRINT ONLY: the PDF's ACM reference block is an unfilled template ("KDD 'XX ... 20XX"), so no venue is confirmed. Attribute, do not assert peer review.

> "Compared to FS-LTR, LCRON brings about a 4.10% increase in advertising revenue and a 1.60% increase in the number of user conversions" (body, §1; corroborated §5.5 and Table 5)
>
> Wang et al., "Learning Cascade Ranking as One Network," ICML 2025, arXiv:2503.09492 v3. VERIFIED in PDF (was snippet-only). Deployed at Kuaishou, 10% traffic per arm, 15-day A/B.

**Multi-task ranking and bias.**

> "It extends the Wide & Deep [9] model architecture by adopting Multi-gate Mixture-of-Experts (MMoE) [30] for multitask learning. In addition, it introduces a shallow tower to model and remove selection bias." (body, §1)
>
> Zhao et al., RecSys 2019.

> "we do not build an explicit propensity model. Instead, we introduce position as a feature in the DNN, regularized by dropout. During scoring we set the position feature to 0." (body, §4.2)
>
> "In the online test we observed a gain of +0.7% in bookings." / "Alongside the bookings gain, a lift of +1.8% in revenue was a pleasant surprise." (body, §4.4)
>
> Haldar et al., "Improving Deep Learning For Airbnb Search," KDD 2020, arXiv:2002.05515.

NUMBER COLLISION WARNING: Airbnb has two different +0.7% figures. The one above is bookings from position-bias removal (§4.4). A different +0.7% is an NDCG figure for the two-tower architecture (§2.7).

**The closer: three offline-neutral models that lost money, and the structural reason.**

> "But the interpretability of price came at a heavy cost as bookings dropped by −1.5%." (§2.2)

> "In spite of being more flexible than the architecture described in section 2.2, when tested online the results were very similar, resulting in a booking drop of −1.6%." (§2.3)

> "we adjusted the alpha hyperparameter to the minimum value such that in offline tests we got the same NDCG as the baseline model. This allowed us to push the cheaper is better intuition as far as possible without hurting relevance, at least when measured offline. In the online A/B test, we observed a reduction of −3.3% in average price of search results. But also a drop of −0.67% in bookings." (§2.5)

> "The offline analysis suffered from the limitation that it only evaluated re-ranking the top results available in logs. During the online test, applying the newly trained model to the entire inventory revealed the true cost of adding the price loss as part of the training objective." (§2.5)

> "we have observed statistically significant differences in online bookings from models that differed in NDCG by as little as 0.7%." (§3)

> "When tested online this resulted in a −33% reduction in the 99th percentile scoring latency." (§2.7)
>
> All Haldar et al., arXiv:2002.05515, body. Note the minus signs above are U+2212 as rendered in the source.

The 2026 restatement, weaker in kind but current:

> "In our production pipeline, offline evaluations serve as directional indicators for rapid iteration. Because these metrics are computed over massive transient pipelines, we rely on large-scale online A/B testing (Section 4) to establish strict statistical significance." (body, §3)

> "two distinct index scales: (1) A Small Index of 3.6M products: 122k queries with comprehensive human annotations to measure EM Recall@K. (2) A Big Index of 200M products: 1k traffic-weighted queries to measure EM Precision@K, effectively testing the model's robustness against false positives in a massive search space." (body, §3)

> "delivering a +7.34% improvement in NDCG@5 and a +0.50% lift in gross revenue" (abstract); "+0.50% (𝑝 = 0.03)" (body, §4); "+4.00%" EM Recall@20 offline (body, §3, Table 2)
>
> Yang et al., Walmart Global Tech, "Scaling and Stabilizing Large-Scale Embedding-Based Retrieval," SIGIR 2026, arXiv:2607.10096 v1, 2026-07-11. Also useful: "the new model altered the retrieved top-10 results for 20.85% of total search traffic compared to the baseline" (body, §4).

Use Airbnb for the mechanism and Walmart for the recency; Walmart says offline is directional, Airbnb explains structurally why it must be.

**Query understanding: the LLM is offline.**

> "The offline inference of BEQUE covers 27% of the page views (PV) in Taobao's main search and has a minimal impact on the latency of the online retrieval system." (body, §3)

> "Since we inference offline, there are about 70% of online queries that do not hit our rewriting table." (body, §4.5)

> "both the query and rewrite are tokenized into terms and used as keywords for inverted index matching to obtain a set of related products. The union of the query and rewrite retrieval sets forms the final candidate set of products for the ranking system." (body, §3)

> "BEQUE surpassed the previous-generation rewriting model CLE-QR by 0.4%, 0.34%, and 0.33% in terms of GMV, #Trans, and UV, respectively." / "for the queries covered (rewritten) by BEQUE (approximately 27% of total PV), there were noteworthy increases of 2.96%, 1.36%, and 1.22% in GMV, #Trans, and UV, respectively." (body, §4.5, Table 6)
>
> Peng et al., WWW 2024 Industry, arXiv:2311.03758 v3. VERIFIED in PDF (numbers are not on the abs page). Deployed on Taobao since October 2023. Do not conflate +0.40% all-traffic with +2.96% covered-traffic; they differ by more than 7x.

**The coda: the fork, unresolved.**

> "we have achieved 23.7% and 28.8% Model FLOPs Utilization (MFU) on flagship GPUs during training and inference, respectively... resulting in operating expense (OPEX) that is only 10.6% of traditional recommendation pipelines. Deployed in Kuaishou/Kuaishou Lite APP, it handles 25% of total queries per second (QPS), enhancing overall App Stay Time by 0.54% and 1.24%, respectively." (abstract)

> "the model's training and inference MFU is only 4.6% and 11.2% on flagship GPUs, respectively, which is substantially lower than the efficiency observed in large language models (LLMs), where the MFU is approximately 40% on H100" (body, §1)
>
> OneRec Technical Report, Kuaishou, arXiv:2506.13695, June 2025.

AGE FLAG: these are June 2025 figures, 14 months old and unrefreshed. Kuaishou's newest release (OpenOneRec, arXiv:2512.24762) publishes no production figures. Date them in prose. Also: 25% of QPS, not 25% of the product; OneRec runs alongside the cascade that still serves the other 75%. Stay-time lifts are per-app, not combined.

Against it, same year:

> "OnePiece has been deployed in the main personalized search scenario of Shopee and achieves consistent online gains across different key business metrics, including over +2% GMV/UU and a +2.90% increase in advertising revenue." (abstract)
>
> Dai et al., arXiv:2509.18091, 2025-09-22.

And the 2026 result that lands on the post's side:

> "one input format, one model, one training stage, deployed within existing serving infrastructure. A shared transformer encodes the user action sequence into candidate-independent representations that branch into retrieval (ANN dot-product) and ranking (cross-attention) via task-specific heads."

> "Deployed in the Pinterest core surfaces, UniPinRec delivers approximately +1% online engagement lift while cutting end-to-end serving latency by 11.1% and lifting QPS by 63.6%."
>
> Li et al., "UniPinRec," arXiv:2606.00422, 2026-05-29, abstract. Their own comparison table classifies OneRec-style single-decoder systems as replacing the full funnel and incompatible with the existing pipeline. The two stages survive as two heads on one trunk.

Tencent's OneRanker (arXiv:2603.02999 v3, 2026-03-12) reports "+1.34%" GMV on WeiXin channels and names "the disconnection between generation and ranking stages" as a core challenge, which is EBR §5's problem rediscovered from the generative side. PREPRINT: v3 carries an unfilled ACM template, no confirmed venue.

**The LLM reranker in production, corrected.** An earlier pass in this phase concluded that no first-party, production, web-scale LLM reranker had been described in the literature. That was wrong, and the counterexample was already in this notes file. Pailitao-VL runs a listwise multimodal LLM reranker in live Alibaba e-commerce search:

> "To evaluate real-world efficacy, we conduct extensive online A/B testing within the high-concurrency environment of the Pailitao e-commerce platform."

> "the inference latency of Pailitao-VL-Embedding is compressed to 67 ms per query, while Pailitao-VL-Reranker-List achieves an average latency of 76 ms per query."
>
> arXiv:2602.13704 v2, §6.4 (body). Candidate scale is given only as "hundred-scale document candidate set per query" (§4); there is no fixed production count. A similar-looking 75.01 ms in §6.3 Table 5 is a separate offline vLLM benchmark on one A800 and must not be conflated with the production figure.

What remains true, and is worth one sentence rather than a section: Taobao's production LLM query rewriting is served from an offline-built table precisely to keep the model out of the latency path, which is a different design answer to the same cost problem.

## Claim-source matrix

The contract. Phase 4 may not introduce a load-bearing claim without adding a row first. Every excerpt is verbatim from the cited source and labelled abstract or body. Rows are prefixed by act: L (lexical, acts 1-2), V (vector, act 3), R (reconvergence, act 4), M (multimodal, act 5), C (cascade, act 6).

Access date for every row is 2026-08-24 unless stated.

| # | Claim | Quoted source (excerpt) | Source ID + date | Recency status |
|---|---|---|---|---|
| L1 | Naive traversal of the inverted index is not viable at interactive latency | "naively traversing this basic index structure, which could take hundreds of milliseconds or more for common terms, is not acceptable" (body §1) | Ding & Suel, SIGIR 2011, research.engineering.nyu.edu/~suel/papers/bmw.pdf | stable / foundational-locked / passes |
| L2 | On GOV2 (25.2M docs) exhaustive OR averages 225.7 ms/query and fully scores 3,815,676 docs | Tables 1-2 cell values (body); "The GOV2 collection consists of 25.2 million web pages crawled from the gov Internet domain." | Ding & Suel, SIGIR 2011 | historical empirical result (2011), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L3 | Disjunctive evaluation is ~an order of magnitude costlier than conjunctive | "disjunctive queries tend to be significantly (by about an order of magnitude for exhaustive query processing) more expensive than conjunctive queries" (body §2.2) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L4 | An inverted index maps each term to a posting list of documents containing it | "An inverted index consists of many inverted lists, where each inverted list Lw is a list of postings describing all places where term w occurs in the collection." (body §2.1) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L5 | Posting lists for common terms run to millions or billions of entries | "The inverted lists of common query terms may consist of many millions or even billions of postings." (body §2.1) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L6 | Posting lists are split into independently decompressible blocks of 64 or 128 docIDs | "inverted lists are often split into blocks of, say, 64 or 128 docIDs, such that each block can be decompressed separately." (body §2.1) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L7 | Compression takes GOV2 from 426 GB raw to an 8,759 MB index | "The uncompressed size of these web pages is 426GB." / "The compressed index consumes 8759MB" (body §6.1) | Ding & Suel, SIGIR 2011 | historical empirical result (2011), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L8 | IDF falls out of the probabilistic model rather than being bolted on | "The resulting formula is a close approximation to classical idf" (body §3.1) | Robertson & Zaragoza, FnTIR 3(4), 2009 | stable / foundational-locked / passes |
| L9 | BM25 mechanism 1 is saturation: a term's contribution is bounded however often it occurs | "any one term's contribution to the document score cannot exceed a saturation point (the asymptotic limit)" (body §3.4.2) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L10 | k1 sets how fast saturation arrives | "for high k, increments in tf continue to contribute significantly to the score, whereas for low k, the additional contribution of a newly observed occurrence tails off very rapidly" (body §3.4.4) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L11 | Length normalization is soft because verbosity and scope pull opposite ways | "The verbosity hypothesis suggests that we should simply normalise any observed tf s by dividing by document length. The scope hypothesis, on the other hand, at least in its extreme version, suggests the opposite." (body §3.4.5) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L12 | b=1 is full length normalization, b=0 turns it off | "setting b = 1 will perform full document-length normalisation, while b = 0 will switch normalisation off" (body §3.4.5) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L13 | The probabilistic model gives no guidance on how to set k1 and b | "the model provides no guidance on how these should be set. This may be regarded as a limitation of the model." (body §3.5) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L14 | Empirically good ranges are 0.5 < b < 0.8 and 1.2 < k1 < 2, collection-dependent | "values such as 0.5 < b < 0.8 and 1.2 < k1 < 2 are reasonably good in many circumstances. However, there is also evidence that optimal values do depend on other factors" (body §3.5) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L15 | The (k1+1) numerator variant does not change ranking | "This is the same for all terms, and therefore does not affect the ranking produced." (body §3.5.1) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L16 | "BM25" is genuinely ambiguous across eight studied variants | "it is not entirely clear which variant they mean... a large-scale reproducibility study of BM25, considering eight variants" (abstract) | Kamphuis, de Vries, Boytsov & Lin, ECIR 2020 | stable / foundational-locked / passes |
| L17 | Those variants produce NO significant effectiveness differences; stopword choice matters more | "Both an ANOVA and Tukey's HSD show no significant differences between any variant, on all test collections." / "differences due to more mundane settings (such as the choice of stopwords) are often larger" (body §3.3) | Kamphuis et al., ECIR 2020 | historical empirical result (2020), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| L18 | Lucene quantizes document length to one byte so normalization can be precomputed for 256 lengths | "compressed (in a lossy manner) to a one byte value... With only 256 distinct document lengths, Lucene can pre-compute the value of k1 · (1 - b + b · (Ldlossy/Lavg)) for each possible length" (body §2) | Kamphuis et al., ECIR 2020 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date (describes Lucene 8; not re-verified against Lucene 10 source) |
| L19 | Elasticsearch's default similarity is BM25 with k1=1.2, b=0.75 | "BM25 similarity (default)"; "The default value is `1.2`."; "The default value is `0.75`." | elastic.co/docs/reference/elasticsearch/index-settings/similarity | actively-evolving / 12-month bar / passes |
| L20 | Lucene 10 BM25Similarity ships k1=1.2, b=0.75 | "BM25 with these default values: `k1 = 1.2` `b = 0.75` `discountOverlaps = true`" | Lucene 10.0.0 javadoc | actively-evolving / 12-month bar / passes. The javadoc does NOT assert BM25 is the default similarity; that is L19 |
| L21 | Anserini defaults to k1=0.9, b=0.4, different from Lucene's | "models are set to k1 = 0.9 and b = 0.4, Anserini's defaults." (body §3.2) | Kamphuis et al., ECIR 2020 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date (as of 2020; current Anserini not re-verified) |
| L22 | WAND is two-level: approximate scoring picks candidates, exact scoring only for survivors | "at the first level... an approximate evaluation... at the second level, promising candidates are fully evaluated" (abstract) | Broder et al., CIKM 2003, DOI 10.1145/956863.956944, via IBM Research listing | stable / foundational-locked / passes. Abstract only; ACM PDF 403'd |
| L23 | WAND cuts full evaluations by more than 90% with almost no precision or recall loss | "significantly reduces the total number of full evaluations by more than 90%, almost without any loss in precision or recall" (abstract) | Broder et al., CIKM 2003 | historical empirical result (2003), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L24 | WAND skips by comparing per-list max impact scores against the running top-k threshold | "WAND achieves early termination by enabling skips over postings that cannot make into the top results. For the threshold value, we use the lowest score in the heap" (body §2.6) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes. Description of WAND by a third paper, not by Broder et al. |
| L25 | Independent reproduction: WAND fully scores 4.6% of the docIDs exhaustive OR does | "WAND only evaluates 4.6% of the docIDs compared to exhaustive OR" (body §6.2) | Ding & Suel, SIGIR 2011 | historical empirical result (2011), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L26 | A block-max index stores an uncompressed per-block maximum impact score, enabling block skips | "stores the maximum impact score for each block of a compressed inverted list in uncompressed form, thus enabling us to skip large parts of the lists" (abstract) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L27 | Plain WAND under-skips because a whole-list maximum is a loose bound | "skipping in WAND is limited because it uses the maximum impact scores over the entire lists, which can be much larger than average" (body §3) | Ding & Suel, SIGIR 2011 | stable / foundational-locked / passes |
| L28 | On GOV2, BMW is 27.9 ms/query scoring 21,921 docs vs WAND 77.6 ms / 178,391 vs exhaustive OR 225.7 ms / 3,815,676 | Tables 1-2 cell values (body) | Ding & Suel, SIGIR 2011 | historical empirical result (2011), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L29 | The block-max structure costs ~400 MB on an 8,759 MB index | "adds about 400MB (using 32 bits for each score though this could be reduced)" (body §6.1) | Ding & Suel, SIGIR 2011 | historical empirical result (2011), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| L30 | MaxScore is attributed to Turtle & Flood, IPM 31(6):831-850, 1995 | Reference [32] in Ding & Suel | Ding & Suel, SIGIR 2011, reference list | stable / foundational-locked / passes AS A BIBLIOGRAPHIC ATTRIBUTION ONLY. The paper was not read, so no algorithmic claim about MaxScore may be sourced here. Author is Flood, not "Flagg" |
| L31 | The source calls scoring fields separately and combining linearly "a little unreasonable", because it treats eliteness as a per-field rather than a per-document property | "This seems a little unreasonable" ... "a better assumption might be that eliteness is a term/document property, shared across the streams of the document." (body §3.6.1) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes. Stands in for the CIKM 2004 BM25F paper (ACM 403); two of three authors shared |
| L32 | BM25F pools weighted term frequency across fields first, applies saturation once, then combines across terms | "we should combine evidence across terms and streams in the opposite order... The saturation function should be applied at this stage, to the total evidence for each term." (body §3.6.1) | Robertson & Zaragoza, FnTIR 2009 | stable / foundational-locked / passes |
| L33 | Trees and space partitioning provably degenerate to sequential scan above ~10 dimensions | "existing methods are outperformed on average by a simple sequential scan if the number of dimensions exceeds around 10" (abstract); "There is no organization of HDVS based on partitioning or clustering which does not degenerate to a sequential scan" (body, Conclusions) | Weber, Schek & Blott, VLDB 1998, vldb.org/conf/1998/p194.pdf | stable / foundational-locked / passes |
| T1 | The PVLDB tutorial treats brand and price-range filtering as its motivating example of e-commerce vector search | "an e-commerce search may allow filtering by the brand or price range while searching for similar products to a user provided description" (body §1) | PVLDB 18(12):5488-5492, 2025 | dated current-practice evidence (source 2025-08, outside the 12-month bar). Passes ONLY as a statement about what that tutorial uses as its example. CORRECTED at Gate 0 run 3: the earlier version claimed filtering is a "first-class requirement of production vector search", which is stronger than "may allow", and labelled a five-page tutorial "method-defining", which is exemption laundering. A current production-requirement claim would need a current first-party system |
| T2 | THESIS SUPPORT. An item filtered out at an earlier stage cannot be presented by any later stage, however good the later model is | "If an effective item that aligns with the user's true intent is filtered out in an earlier stage, no matter how precise the subsequent models are, they cannot present this item to user." (§1) | OneSearch, arXiv:2509.03236 v5, 2025-10-22. Domain: e-commerce search | actively-evolving / 12-month bar / passes. RE-SOURCED at Gate 0 run 3. The earlier version cited two adjacent quotes (EBR §5 and Airbnb §2.5) and labelled the gap "the post's own reasoning", which was a load-bearing causal claim in disguise. This source states it directly |
| L34 | Across five application-related domains, two people chose the same term for the same thing with probability under 0.20 | "In every case two people favored the same term with probability <0.20." (abstract). Per-domain values in Results Table 1: Editor-5 .07, Editor-25 .11, Decoder .08, Common Objects .12, Classifieds .14, Recipe Keywords .18 | Furnas, Landauer, Gomez & Dumais, CACM 30(11):964-971, 1987, DOI 10.1145/32206.32212. Retrieved via CiteSeerX scan of the Bellcore typescript, 2026-08-24 | stable / foundational-locked / passes. REINSTATED after Gate 0: the earlier drop was wrong, the paper is reachable. Scope guard: this is spontaneous naming across five domains, NOT a claim about modern search queries. It is an upper bound (<0.20), not a point estimate. Do not restate as "10-20%", which is a different figure in the same paper (hit rates for a single designer's word) |
| V1 | DPR is a bi-encoder: two independent BERT-base encoders, [CLS] output, d=768, no cross-attention | "we use two independent BERT (Devlin et al., 2019) networks (base, uncased) and take the representation at the [CLS] token as the output, so d = 768" (body §3.1) | arXiv:2004.04906, EMNLP 2020 | stable / foundational-locked / passes |
| V2 | DPR beat Lucene-BM25 by 9-19 points absolute top-20 accuracy | "outperforms a strong Lucene-BM25 system largely by 9%-19% absolute in terms of top-20 passage retrieval accuracy" (abstract) | arXiv:2004.04906 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| V3 | On Natural Questions the top-20 gap was 78.4% vs 59.1%; DPR lost to BM25 on SQuAD | "With the exception of SQuAD, DPR performs consistently better than BM25 on all datasets... (e.g., 78.4% vs. 59.1% for top-20 accuracy on Natural Questions)" (body §5.1) | arXiv:2004.04906 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| V4 | Dense retrievers fail on rare entities and generalize only to common ones | "dense retrievers drastically underperform sparse methods... dense retrievers can only generalize to common entities unless the question pattern is explicitly observed during training" (abstract) | arXiv:2109.08535, EMNLP 2021 | historical empirical result (2021), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| V5 | LSH introduced provably-guaranteed approximate nearest neighbour search and named locality-sensitive hashing | PARAPHRASE, no verbatim quote. The reachable STOC 1998 scan is OCR-corrupted and unusable for quotation. Claim carried in the post's own voice, no quotation marks. | Indyk & Motwani, STOC 1998, pp. 604-613 | UNVERIFIABLE AT ACCESS. Only an OCR-corrupted scan was reachable, so nothing from this paper is quoted and the claim is carried in the post's own voice as an attribution of the idea, which is uncontested. Gate 0 was right that this cannot be marked "passes" |
| V6 | PQ decomposes the space into a Cartesian product of low-dim subspaces, quantizes each separately, and represents a vector by a short code | "decompose the space into a Cartesian product of low-dimensional subspaces and to quantize each subspace separately. A vector is represented by a short code composed of its subspace quantization indices." (abstract) | Jegou, Douze & Schmid, TPAMI 33(1), 2011, DOI 10.1109/TPAMI.2010.57 | stable / foundational-locked / passes. ABSTRACT ONLY; full text unreachable, so no body claim may be sourced here |
| V7 | PQ code size is M*ceil(log2 K) bits for M sub-quantizers of K centroids | "The number of reconstructed vectors is KM and the code size is thus M ceil(log2 (K))" (body §4.1) | Faiss library paper, arXiv:2401.08281 (Jegou co-author, reference implementation) | method-defining historical source, exempt from the 12-month bar / passes |
| V8 | A shipped system compresses to ~32 bytes per point with PQ | "encodes the data and query points into short codes (e.g., 32 bytes per data point)" (body §3.1) | DiskANN, NeurIPS 2019 | historical empirical result (2019), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| V9 | ScaNN: reconstruction error is the wrong loss for MIPS; parallel residual must be penalized over orthogonal | "Traditional approaches to quantization aim to minimize the reconstruction error... more greatly penalizes the parallel component of a datapoint's residual relative to its orthogonal component." (abstract) | arXiv:1908.10396, ICML 2020 | stable / foundational-locked / passes |
| V10 | HNSW sets Mmax0 = 2M at the ground layer | "Simulations also suggest that 2∙ M is a good choice for Mmax0" (body §4.1) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V11 | HNSW average memory per element is (Mmax0 + mL*Mmax)*bytes_per_link, about 60-450 bytes/object for M in 6-48 | "the average memory consumption per element is (Mmax0+mL ∙Mmax)∙bytes_per_link... about 60-450 bytes per object" (body §4.2.3) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V12 | At M=16 the formula gives 37.77 link slots, about 151 bytes of connection-ID capacity per object; it reproduces the paper's own range at M=6 (61.4 B) and M=48 (433.6 B) | DERIVED by the post from V11's formula with mL=1/ln(M) and 4-byte links. Not a quote. | arXiv:1603.09320 v4; arithmetic performed 2026-08-24 | stable / foundational-locked / passes. WORDING GUARD from Gate 0: say connection-ID capacity, NOT total bytes per vector. hnswlib additionally stores a link-list header, the vector itself, and the label |
| V13 | "M=16 gives ~21 links per node" is not in the HNSW paper, but it IS a real measured figure: about 21 realized links per node on layer 0, measured on a one-million-point deep-image-96 collection at Qdrant's default m=16 | HNSW paper: full-text grep finds "21" only as reference [21], a page range, and a citation title. Qdrant, verbatim: "At Qdrant's default m=16, the one-million-point collection benchmarked below averaged about 21 links per node on layer 0. Filter out 96% of the points and fewer than one link per node survives on average, so traversal can get stranded before it reaches the true nearest matches." Load-bearing again in the cap formula: "one million over 21 links, times four, gives 190,476 points, about 19% of the collection." | arXiv:1603.09320 v4 (grep 2026-08-24); qdrant.tech/articles/filtered-vector-search-acorn/ 2026-08-07, standfirst and "Why Some Payload Fields Get No Extra Edges" | actively-evolving / 12-month bar / passes. CORRECTED after Gate 0: an earlier pass wrongly called ~21 unsourceable. Three different numbers are in play and the post must keep them apart: 32 allocated at layer 0 (2M), 37.8 average slots across layers from the paper's formula, and ~21 realized on one benchmark |
| V14 | hnswlib allocates a fixed 2M-slot link block per node at layer 0 regardless of realized degree, so memory is charged on allocated degree | `maxM0_ = M_ * 2;` / `size_links_level0_ = maxM0_ * sizeof(tableint) + sizeof(linklistsizeint);` (source lines 112-113, 120) | nmslib/hnswlib, hnswlib/hnswalg.h, commit 34fe8ff1eab7 (2026-03-24), resolvable at https://github.com/nmslib/hnswlib/blob/34fe8ff1eab7/hnswlib/hnswalg.h , accessed 2026-08-24. If that pin does not resolve at draft time, re-pin against a commit that does rather than falling back to master | actively-evolving / 12-month bar / passes |
| V15 | When the candidate pool is large enough, HNSW's neighbour-selection heuristic yields the exact relative neighbourhood graph as a subgraph, which keeps the global connected component even on clustered data | "the heuristic allows getting the exact relative neighborhood graph [46] as a subgraph, a minimal subgraph of the Delaunay graph... allows easily keeping the global connected component, even in case of highly clustered data" (body §3) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V16 | The heuristic creates connections in diverse directions, and without it recall collapses on clustered data because search gets stuck at cluster boundaries | "the heuristic that accounts for the distances between the candidate elements to create connections in diverse directions" (body §4.1) AND, separately, "the Hierarchical NSW algorithm fails to achieve a high recall for clustered data because the search stucks at the clusters boundaries" (body §4.1, sic on "stucks") | arXiv:1603.09320 v4 | stable / foundational-locked / passes. Two distinct quotes; Gate 0 flagged the second half as unsupported when only the first was cited |
| V17 | mL = 1/ln(M), corresponding exactly to skip-list parameter p = 1/M | "A simple choice for the optimal mL is 1/ln(M), this corresponds to the skip list parameter p=1/M" (body §4.1) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V18 | The paper states a reasonable M range of 5 to 48 (distinct from the 6-48 used for the memory estimate) | "A reasonable range of M is from 5 to 48." (body §4.1) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V19 | The HNSW authors concede the hierarchy's benefit on real high-dimensional data is less prominent than the heuristic's | "the performance improvement by increasing the mL is higher, but less prominent at current settings compared to improvement from the heuristic" (body §4.1) | arXiv:1603.09320 v4 | stable / foundational-locked / passes |
| V20 | A flat NSW graph matches HNSW on latency and recall on high-dimensional data with less memory | "a flat navigable small world graph graph retains all of the benefits of HNSW on high-dimensional datasets, with latency and recall performance essentially \emph{identical} to the original algorithm but with less memory overhead" (abstract; typo and LaTeX in source) | arXiv:2412.01940 v3, 2025-07-03 | dated current-practice evidence (source 2025-07-03, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| V21 | Hub Highway Hypothesis: a small set of well-connected hub nodes does the routing job credited to the hierarchy | "k-NN proximity graphs form a highway routing structure where a small subset of nodes are well-connected and heavily traversed" (body §4) | arXiv:2412.01940 v3 | dated current-practice evidence (source 2025-07-03, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| V22 | Latency and recall parity was measured across 13 datasets from 1M to 100M vectors; the 38-39% peak construction-memory saving was measured on two Big-ANN datasets specifically | "saves roughly 38% and 39% of peak memory consumption during index construction on two Big-ANN benchmark datasets compared to hnswlib" (body §1.1) | arXiv:2412.01940 v3 | dated current-practice evidence (source 2025-07-03, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| V23 | The critique's authors concede they do not know why the hierarchy fails to help | "we still have no satisfactory understanding of why hierarchy does not help." (body §1.1) | arXiv:2412.01940 v3 | dated current-practice evidence (source 2025-07-03, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| V24 | RaBitQ quantizes D-dim vectors to D-bit strings with a sharp theoretical error bound, unlike prior methods | "these methods do not have a theoretical error bound and are observed to fail disastrously on some real-world datasets... RaBitQ, which quantizes $D$-dimensional vectors into $D$-bit strings. RaBitQ guarantees a sharp theoretical error bound" (abstract) | arXiv:2405.12497, SIGMOD 2024 | method-defining historical source, exempt from the 12-month bar / passes |
| V25 | In Elastic's benchmarks, binary quantization is paired with reranking against raw float32: naive binary needed 10-100x oversampling, BBQ reached above 90% recall at ~3x | "Naive binary quantization is exceptionally lossy and achieving adequate recall requires gathering 10x or 100x additional neighbors to rerank." / "1bit quantization and HNSW gets above 90% recall with only 3x oversampling." | Elastic Search Labs, 2024-11-11. VENDOR, first-party, with parameters | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| V26 | Matryoshka makes one embedding truncatable at no inference cost, up to 14x smaller at equal accuracy | "allows a single embedding to adapt to the computational constraints of downstream tasks... imposes no additional cost during inference and deployment" / "up to 14x smaller embedding size for ImageNet-1K classification at the same level of accuracy" (abstract) | arXiv:2205.13147, NeurIPS 2022 | historical empirical result (2022), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| V27 | DiskANN indexes and serves a billion points on one 64GB workstation with an SSD, >5000 QPS at <3ms mean and 95%+ 1-recall@1 | "index, store, and search a billion point database on a single workstation with just 64GB RAM and an inexpensive solid-state drive (SSD)" / ">5000 queries a second with < 3ms mean latency and 95%+ 1-recall@1" (abstract) | DiskANN, NeurIPS 2019 | historical empirical result (2019), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| V28 | Object-storage vector search costs p50 874ms cold vs p50 14ms warm on 1M documents | "The first query to a namespace reads object storage directly and is slow (p50=874ms for 1M documents), but subsequent, cached queries to that node are faster (p50=14ms for 1M documents)." | turbopuffer.com/architecture, verified live 2026-08-24. VENDOR | actively-evolving / 12-month bar / passes. The page carries a second cold figure (~500ms) elsewhere; attribute 874ms to the routing section |
| V29 | Each object-storage roundtrip is ~100ms and a cold query needs 3-4 | "each roundtrip to object storage takes ~100ms. The 3-4 required roundtrips for a cold query often take as little as ~400ms." | turbopuffer.com/architecture. VENDOR | actively-evolving / 12-month bar / passes |
| V30 | Object-storage vector search uses a centroid/IVF-lineage index rather than a graph, because centroids minimize roundtrips | "SPFresh is a centroid-based approximate nearest neighbour index... A centroid-based index works well for object storage as it minimizes roundtrips and write-amplification, compared to graph-based indexes like HNSW or DiskANN." | turbopuffer.com/architecture. VENDOR | actively-evolving / 12-month bar / passes |
| V31 | Filtered vector search has three execution methods: pre-filtering, post-filtering, inline-filtering | "There are three main execution methods... Pre-filtering... Post-filtering... For inline-filtering, searching and filtering are combined" (body §2) | PVLDB 18(12):5488-5492, 2025 | dated current-practice evidence (tutorial, 2025-08). Passes as a statement of the taxonomy that tutorial sets out. Gate 0 run 3: a five-page tutorial did not define filtered vector search, so it cannot be labelled method-defining. 5-page TUTORIAL, taxonomy only, no benchmark numbers |
| V32 | Post-filtering forces the ANN search to over-fetch a multiple of K, complicating high recall | "requires the approximate nearest neighbor (ANN) search to yield a multiple of K results to ensure at least K vectors remain after filtering [40], which complicates achieving high recall" (body §2) | PVLDB 18(12):5488, 2025 | dated current-practice evidence (tutorial, 2025-08). Passes as a statement of the taxonomy that tutorial sets out. Gate 0 run 3: a five-page tutorial did not define filtered vector search, so it cannot be labelled method-defining |
| V33 | ACORN reports 2-1,000x higher throughput at fixed recall; the variant names are body-only, not in the abstract | "outperforming prior methods with 2-1,000x higher throughput at a fixed recall" (abstract) vs "We propose two indices: ACORN-γ... and ACORN-1" (body §1) | arXiv:2403.04871, SIGMOD 2024 | method-defining historical source, exempt from the 12-month bar / passes |
| V34 | ACORN-γ oversizes neighbour lists to M*γ at build time; ACORN-1 does the expansion at search time instead | "ACORN collects 𝑀 · 𝛾 approximate nearest neighbors as candidate edges per node" (body §5.2); "ACORN-1 achieves this by performing the neighbor expansion step solely during search, rather than during construction" (body §5.3) | arXiv:2403.04871 | method-defining historical source, exempt from the 12-month bar / passes |
| V35 | ACORN-1 costs at most 5x lower QPS at fixed recall but 9-53x lower time-to-index vs ACORN-γ | "attaining at most 5× lower QPS at fixed recall but 9–53× lower TTI" (body §1) | arXiv:2403.04871 | method-defining historical source, exempt from the 12-month bar / passes |
| V36 | THE MECHANISM: expected surviving degree after a filter of selectivity s is degree*s, and search convergence degrades once it falls below M, which is why ACORN sets γ = 1/s_min | "If a node in the predicate subgraph has degree much lower than 𝑀, this could adversely impact the search convergence and thus recall... E \|𝑁𝑝𝑙 (𝑣)\| = \|𝑁 𝑙 (𝑣)\| · 𝑠 = 𝛾 · 𝑀 · 𝑠 > 𝑀, ∀𝑠 > 𝑠𝑚𝑖𝑛" (body §6) | arXiv:2403.04871 §6.3.1 | method-defining historical source, exempt from the 12-month bar / passes. ASSUMPTION GUARD from Gate 0: it is an EXPECTATION, not a guarantee, and it is stated "For a dataset and query predicate that exhibit no predicate clustering". The paper continues "we will continue our lower bound analysis of node degrees under the worst case assumption of no predicate clustering". Predicate clustering is the paper's own §3 term for the filtered set being non-uniformly distributed in the embedding space |
| V37 | "A filter keeping fraction s fragments a degree-d graph around s ~ 1/d" is a heuristic analogy, not a theorem about HNSW | The generic percolation result is for configuration-model random graphs whose own abstract concedes they "are quite unlike real world networks". HNSW graphs are geometric, RNG-pruned, hub-heavy; real predicates correlate with embedding position so filtering is not random node removal; and the threshold is a giant-component result, not a recall result. | Callaway, Newman, Strogatz & Watts, PRL 85:5468 (2000), arXiv:cond-mat/0007300, assessed against arXiv:2403.04871 and the Qdrant benchmark, 2026-08-24 | stable / foundational-locked / passes AS A NEGATIVE CLAIM. The post states the s*d relation as intuition and uses V36 for the mechanism |
| V38 | Qdrant's filterable HNSW costs 4.4-5.6x build time: 116s plain vs 507-652s with extra edges on 1M points | "the HNSW index built in 116 seconds without them and 507 to 652 seconds with them, 4.4x to 5.6x the cost." | qdrant.tech/articles/filtered-vector-search-acorn/, 2026-08-07. VENDOR, reproduction kit, disclosed variance | actively-evolving / 12-month bar / passes |
| V39 | Extra edges are built per payload field, never per combination, so a two-field AND lands on an unbuilt intersection | "Qdrant builds those edges per payload field, never per combination, so an [AND] filter lands on an intersection that no single field's edges cover." | qdrant.tech/articles/filtered-vector-search-acorn/. VENDOR | actively-evolving / 12-month bar / passes |
| V40 | On the 1% two-field intersection filterable HNSW WINS (91.2% @ 4.9ms vs ACORN 90.3% @ 20.1ms); on the 4% intersection it LOSES (92.5% vs 99.6%) | "filterable HNSW reaches 91.2% recall at 4.9ms while ACORN needs 20.1ms to reach 90.3%" / "The 4% intersection is the exception, where both fields exceeded the cap and ACORN leads 99.6% to 92.5%." | qdrant.tech/articles/filtered-vector-search-acorn/, verified live 2026-08-24. VENDOR | actively-evolving / 12-month bar / passes. DIRECTION WARNING: the seed article had this backwards. Easy to restate wrong |
| V41 | With `full_scan_threshold` pinned low for the other three strategies, planner-plus-ACORN holds 99.9-100% recall on all four single-filter shapes at 7.2-10.9ms, and 1.5ms on the 1% filter via the payload index | "Planner + ACORN, the fourth strategy, holds 99.9% to 100% recall on all four filters, at 7.2ms to 10.9ms on the graph and 1.5ms on the 1% filter, where all 500 queries came from the payload index." | qdrant.tech/articles/filtered-vector-search-acorn/, final paragraph of "Single Filters: Extra Edges Win". VENDOR | actively-evolving / 12-month bar / passes. CITATION TRAP flagged by Gate 0: the quote is verbatim but belongs to the pinned-low-threshold experiment, NOT the default-configuration table. The default-config numbers are in V41b. Do not present these as what a default collection returns |
| V41b | In the DEFAULT configuration (extra edges on, planner free, default threshold), the same benchmark reports: 20% filter 90.8% @ 1.1ms with ACORN off vs 100% @ 5.7ms with ACORN on; 10% 98.6% @ 0.9ms vs 99.9% @ 4.4ms; 1% 100% @ 1.7ms vs 100% @ 1.6ms; correlated 10% 98.6% @ 1.0ms vs 100% @ 4.2ms; two-keyword 4% 39.7% @ 1.1ms vs 100% @ 7.3ms; two-keyword 1% 97.2% @ 2.1ms vs 100% @ 2.5ms; two-keyword 0.012% 100% @ 1.4ms vs 100% @ 1.2ms | Table in section "ACORN on a Normal Collection". Prose: ACORN "adds 9 percentage points on the 20% filter and 60 percentage points on the 4% intersection" and costs "5.4x latency on the 20% filter and 6.7x on the 4% intersection". `max_selectivity` default is 0.4, and "ACORN is off by default, so the left column is what a collection with payload indexes returns today" | qdrant.tech/articles/filtered-vector-search-acorn/, 2026-08-07, Qdrant v1.18.2, 1M deep-image-96. VENDOR | actively-evolving / 12-month bar / passes. THIS is the default-configuration table; V41 is the pinned-threshold experiment |
| V36b | ACORN also bounds the probability that a filtered traversal strands, and this is the better citation for a connectivity argument than the expected-degree result | "We also analyze the probability that the subgraph traversal gets disconnected, which we bound by: Pr[union over v in P of (|N_p(v)| <= 0)] <= O(log n * (1-s)^(M*gamma))" followed by "We see that both bounds decay exponentially in gamma." (body §6.3.1, "Bounded Degree") | arXiv:2403.04871 §6.3.1 | method-defining historical source, exempt from the 12-month bar / passes. ASSUMPTION GUARD from Gate 0 run 2: this bound sits inside the same no-predicate-clustering analysis and ACORN's own construction and search model. It is NOT a connectivity theorem for arbitrary HNSW graphs or for correlated production filters, and the paper says so four sentences later (V36c). Do not cite it as general |
| V36c | Neither HNSW nor ACORN offers a connectivity guarantee for arbitrary datasets; the field relies on measurement | "We note that neither HNSW nor ACORN provides theoretical guarantees on connectivity over its level graphs for arbitrary datasets. Thus we instead rely primarily on empirical results for our analysis." (body §6.3.1, "Connectivity") | arXiv:2403.04871 §6.3.1 | method-defining historical source, exempt from the 12-month bar / passes. This is the honest replacement for the percolation framing: nobody has the theorem, and the paper says so |
| V42 | The benchmark discloses that ACORN's 1% recall varies 70.7-74.1% across rebuilds of the same graph | "On the 1% row, ACORN's recall spans 70.7% to 74.1% across rebuilds of the same graph, wider than its lead in the table." | qdrant.tech/articles/filtered-vector-search-acorn/. VENDOR | actively-evolving / 12-month bar / passes |
| V43 | RACORN-1 exists as an unrefereed July 2026 preprint and REPORTS ACORN-1 connectivity instability below 5% selectivity and recall collapse below 1% | "ACORN-1... suffers connectivity instability below 5% selectivity and recall collapse below 1%" (abstract). v1 2026-07-01, 13 pages, no journal-ref, two authors. | arXiv:2607.00768 | actively-evolving / 12-month bar / passes AS AN ATTRIBUTED CLAIM. Every number must be written as "the preprint reports"; nothing asserted |
| R1 | Sparse learned representations decompose into expansion and term weighting | "Sparse learned representations can further be decomposed into expansion and term weighting components." (abstract) | arXiv:2106.14807, 2021-06-28 | stable / foundational-locked / passes |
| R2 | Learned sparse output is written into a standard Lucene inverted index | "built on the Lucene search library and thus fully compatible with standard inverted indexes." (abstract) | arXiv:2106.14807 | stable / foundational-locked / passes |
| R3 | SPLADE-v3 is statistically significantly more effective than both BM25 and SPLADE++ | "it is statistically significantly more effective than both BM25 and SPLADE++, while comparing well to cross-encoder re-rankers" (abstract) | arXiv:2403.06789, 2024-03-11 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| R4 | SPLADE-v3 exceeds 40 MRR@10 on MS MARCO dev and improves BEIR out-of-domain results by 2% | "it gets more than 40 MRR@10 on the MS MARCO dev set, and improves by 2% the out-of-domain results on the BEIR benchmark." (abstract) | arXiv:2403.06789 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date. 2% improvement, not 2 points. Do not convert |
| R5 | The efficiency bottleneck in learned sparse retrieval is query size in tokens, not neural FLOPs | "the main source of improvement is the reduction of SPLADE query sizes, instead of focusing solely on the FLOPS measure... query size is then a major bottleneck." (body §3) | arXiv:2207.03834, SIGIR 2022 | stable / foundational-locked / passes |
| R6 | Closing the gap to BM25 cost under 4ms added latency for under 10% MRR@10 loss, against a 4ms BM25 baseline | "achieve similar latency (less than 4ms difference) as traditional BM25, while having similar performance (less than 10% MRR@10 reduction)" (abstract); BM25 latency 4 ms (body §4) | arXiv:2207.03834 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| R7 | Discarding 70% of doc2query's generated expansions improves effectiveness 16%, cuts index 33% and query time 23% at once | "improve the retrieval effectiveness of Doc2Query by up to 16%, while simultaneously reducing mean query execution time by 23% and cutting the index size by 33%" (abstract); "keeping only 30% of expansion queries at n=80, performance is increased from 0.279 to 0.323" (body §5) | arXiv:2301.03266, ECIR 2023 | stable / foundational-locked / passes. The paper states NO percentage of expansions that are irrelevant; do not claim one |
| R8 | RRF's k=60 was fixed during a 2009 pilot that found it near-optimal but non-critical, and was not altered during that paper's subsequent validation | "k = 60 was fixed during a pilot investigation and not altered during subsequent validation." / "indicated that k = 60 was near-optimal, but that the choice was not critical." (body §2) | Cormack, Clarke & Buettcher, SIGIR 2009, cormack.uwaterloo.ca/cormacksigir09-rrf.pdf | stable / foundational-locked / passes. NOT "arbitrary"; it was chosen |
| R9 | Elasticsearch markets RRF as tuning-free and ships rank_constant default 60 | "RRF requires no tuning, and the different relevance indicators do not have to be related to each other" / "Defaults to 60." | elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion | actively-evolving / 12-month bar / passes |
| R10 | RRF is in fact sensitive to its parameters, and a learned convex combination is normalization-agnostic and beats RRF in and out of domain | "Contrary to existing studies, we find RRF to be sensitive to its parameters; that the learning of a CC fusion is generally agnostic to the choice of score normalization; that CC outperforms RRF in in-domain and out-of-domain settings" (abstract) | Bruch, Gai & Ingber, ACM TOIS, arXiv:2210.11934 | historical empirical result (2022), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| R11 | Cross-encoders cannot precompute: every query-document pair must traverse the network for one score | "they must feed each query-document pair through a massive neural network to compute a single relevance score" (abstract) | arXiv:2004.12832, SIGIR 2020 | stable / foundational-locked / passes |
| R12 | Late interaction trades full interaction for offline-precomputable document representations | "By delaying and yet retaining this fine-granular interaction, ColBERT can... pre-compute document representations offline, considerably speeding up query processing." (abstract) | arXiv:2004.12832 | stable / foundational-locked / passes |
| R13 | ColBERT runs two orders of magnitude faster with four orders of magnitude fewer FLOPs per query than BERT rerankers | "executing two orders-of-magnitude faster and requiring four orders-of-magnitude fewer FLOPs per query." (abstract) | arXiv:2004.12832 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| R14 | PLAID cuts late-interaction latency up to 7x on GPU and 45x on CPU vs vanilla ColBERTv2 without quality loss | "reduce late interaction search latency by up to 7× on a GPU and 45× on a CPU against vanilla ColBERTv2, while continuing to deliver state-of-the-art retrieval quality." (abstract) | arXiv:2205.09707, CIKM 2022 | historical empirical result (2022), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| R15 | WARP is 41x faster than XTR's reference implementation and 3x faster than ColBERTv2/PLAID | "reduces end-to-end latency compared to XTR's reference implementation by 41x, and achieves a 3x speedup over the ColBERTv2/PLAID engine" (abstract) | arXiv:2501.17788, 2025-01-29 | dated current-practice evidence (source 2025-07-06, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| R16 | monoBERT beat the prior MS MARCO state of the art by 27% relative MRR@10 | "outperforming the previous state of the art by 27% (relative) in MRR@10." (abstract) | arXiv:1901.04085 | historical empirical result (2019), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| R17 | monoT5 matches or beats classification rerankers and transfers zero-shot past cross-validated SOTA on Robust04 | "at least on par with previous classification-based models and can surpass them with larger, more-recent models... a zero-shot transfer-based approach that outperforms previous state-of-the-art models requiring in-dataset cross-validation." (abstract) | arXiv:2003.06713 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| R18 | KEYSTONE. Zero-shot across 18 datasets: BM25 is a robust baseline; reranking and late-interaction win on average at high cost; dense and sparse retrieval are cheaper but often underperform | "Our results show BM25 is a robust baseline and re-ranking and late-interaction-based models on average achieve the best zero-shot performances, however, at high computational costs. In contrast, dense and sparse-retrieval models are computationally more efficient but often underperform other approaches" (abstract) | arXiv:2104.08663, NeurIPS 2021 D&B | stable / foundational-locked / passes. SCOPE GUARD: zero-shot only. BM25 is not claimed to beat neural models in-domain |
| M1 | CLIP learns one multi-modal embedding space by jointly training image and text encoders on cosine similarity | "CLIP learns a multi-modal embedding space by jointly training an image encoder and text encoder to maximize the cosine similarity of the image and text embeddings of the N real pairs in the batch" (body §2.3) | arXiv:2103.00020, ICML 2021 | stable / foundational-locked / passes. BODY, not abstract |
| M2 | CLIP was trained on 400 million image-text pairs by predicting which caption goes with which image | "the simple pre-training task of predicting which caption goes with which image... on a dataset of 400 million (image, text) pairs collected from the internet." (abstract) | arXiv:2103.00020 | stable / foundational-locked / passes |
| M3 | On Winoground no state-of-the-art vision-language model does much better than chance | "none of them do much better than chance." (abstract) | arXiv:2204.03162, CVPR 2022 | historical empirical result (2022), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| M4 | ARO showed VLMs have poor relational understanding, attribute-binding failures, and a severe lack of order sensitivity | "poor relational understanding, can blunder when linking objects to their attributes, and demonstrate a severe lack of order sensitivity." (abstract) | arXiv:2210.01936, ICLR 2023 | historical empirical result (2022), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| M5 | SugarCrepe found those benchmarks hackable: blind text-only models beat state-of-the-art VLMs on them | "we find significant biases in all these benchmarks rendering them hackable. This hackability is so dire that blind models with no access to the image outperform state-of-the-art vision-language models." (abstract) | arXiv:2306.14610, NeurIPS 2023 D&B | historical empirical result (2023), age-exempt as a record of that study. Gate 0 run 3: this evaluates particular variants, retrievers or model cohorts; it is not a field-locked definition. Date it in prose |
| M6 | SCOPE: the hackability finding covers image-to-text benchmarks (Table 1 is CREPE, ARO, VL-CheckList). Winoground is human-curated, discussed separately, and is NOT debunked | "we uncover a crucial vulnerability in not just one but all these image-to-text compositionality benchmarks" / "Winoground is a small dataset manually curated by human annotators." (body §1 and body) | arXiv:2306.14610 | stable / foundational-locked / passes. The post must not overstate the debunking |
| M7 | SigLIP 2 did not change the contrastive objective; it surrounded it with captioning pretraining, self-supervised losses and online data curation, and reports gains on zero-shot classification, image-text retrieval and transfer | "we extend the original image-text training objective with several prior, independently developed techniques into a unified recipe -- this includes captioning-based pretraining, self-supervised losses (self-distillation, masked prediction) and online data curation." (abstract) | arXiv:2502.14786, 2025-02-20 | dated current-practice evidence (source 2025-02-20, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| M8 | ColPali scores 81.3 average nDCG@5 on ViDoRe vs 67.0 for the strongest text pipeline | Table 2: "ColPali (+Late Inter.) ... 81.3" and "Unstructured + Captioning ... BGE-M3 ... 67.0" (body) | arXiv:2407.01449 v2, ICLR 2025 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| M9 | ColPali's multi-vector index costs 256 KB per page at D=128 | "We project each PaliGemma vector to a lower dimensional space (D=128) to maximize efficiency, leading to a memory footprint of 256 KB per page" (body §5.2) | arXiv:2407.01449 v2 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date. NOT ~250 KB |
| M11 | ViDoRe V3 (26k pages, 3,099 human-verified queries, 6 languages) confirms visual retrievers beat textual ones while naming what still fails | "visual retrievers outperform textual ones, late-interaction models and textual reranking substantially improve performance... However, current models still struggle with non-textual elements, open-ended queries, and fine-grained visual grounding." (abstract) | arXiv:2601.08620, 2026-01-13 | actively-evolving / 12-month bar / passes |
| M12 | Nemotron ColEmbed V2 8B ranked first on ViDoRe V3 with 63.42 average NDCG@10 as of 2026-02-03 | "The 8B model ranks first on the ViDoRe V3 leaderboard as of February 03, 2026, achieving an average NDCG@10 of 63.42." (abstract) | arXiv:2602.03992, 2026-02-03 | actively-evolving / 12-month bar / passes. Leaderboard claim ~6 months stale; keep the date inside the sentence, no present tense |
| M13 | A single unified embedding outperformed every specialized embedding it replaced, and cut operational cost | "generate a unified embedding that outperforms all specialized embeddings previously deployed for each product" / "drastically reduced the operation and engineering cost of maintaining multiple embeddings while improving quality." (abstract) | arXiv:1908.01707, KDD 2019 | historical empirical result (2019), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| M14 | A single multi-modal item embedding serving all shopping surfaces delivered up to +7% GMV/user and +11% click volume | "up to +7% gross merchandise value/user and +11% click volume" (abstract) | arXiv:2205.11728, KDD 2022 | historical empirical result (2022), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| M15 | KEYSTONE. One embedding serves three roles at once: ANN retrieval, improving the efficiency of token-based retrieval inside L1, and a top feature in L2 scoring | "These embeddings are employed to power the retrieval of pins and products using HNSW... They are also instrumental in the L1 scoring model, where they enhance the efficiency of token-based retrieval sources. Moreover, [OmniSearchSage] embeddings serve as one of the most critical features in the L2 scoring and relevance models." (body §5) | arXiv:2404.16260, WWW 2024 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date. Source uses the `\modelname` macro; bracket the substitution or paraphrase |
| M16 | That system serves 300k QPS at p50 3ms / p90 20ms, on 256-dimensional L2-normalized embeddings | "handling 300k requests per second, maintaining a median (p50) latency of just 3 ms, and 90 percentile (p90) latency of 20 ms." / "projects it to a 256-dimensional vector space. Post projection, we apply a L2 normalization" (body) | arXiv:2404.16260 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date. 300k QPS is in the abstract; p50/p90 and 256-d are body-only |
| M17 | The 300k QPS runs behind a 30-day-TTL cache; the neural inference server itself sees ~500 QPS | "The implementation of this cache-based system efficiently reduces the load on the inference server to approximately 500 QPS" (body §5.1) | arXiv:2404.16260 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| M18 | That deployment delivered >8% relevance, >7% engagement, >5% ads CTR | "an improvement of >8% relevance, >7% engagement, and >5% ads CTR in Pinterest's production search system." (abstract) | arXiv:2404.16260 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| M19 | Across 130 tasks and 50 models, no single image-embedding method dominates all task categories | "We benchmark 50 models across our benchmark, finding that no single method dominates across all task categories." (abstract) | arXiv:2504.10471, 2025-04-14 | dated current-practice evidence (source 2025-04-14, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| M20 | Qwen3-VL-Embedding-8B scores 77.8 on MMEB-V2 and ships Matryoshka truncation as standard | "It supports Matryoshka Representation Learning, enabling flexible embedding dimensions" / "attains an overall score of 77.8 on MMEB-V2, ranking first among all models (as of January 8, 2025)." (abstract) | arXiv:2601.04720, 2026-01-08 | actively-evolving / 12-month bar / passes. The paper's own "January 8, 2025" precedes its submission date and is near-certainly a typo for 2026. Quote as written and note it, or paraphrase with the correct date. Never silently fix a quote |
| M21 | A billion-scale production visual search moved its retrieval encoder off contrastive learning onto an absolute ID-recognition task | "we transitioned the embedding paradigm from traditional contrastive learning to an absolute ID-recognition task. Through anchoring instances to a globally consistent latent space defined by billions of semantic prototypes" (abstract) | arXiv:2602.13704, 2026-02-14 | actively-evolving / 12-month bar / passes |
| M22 | That embedding change bought 2% GMV platform-wide; the widely quoted 20% belongs to the listwise reranker in SKU-price comparison only | "Pailitao-VL-Embedding delivers a 2% GMV gain across platform-wide traffic, while Pailitao-VL-Reranker-List yields a 6% GMV increase within standardized product categories. Notably, in emerging AI-driven scenarios such as SKU-price comparison, our architecture achieves an impressive 20% GMV gain" (body §6.4) | arXiv:2602.13704 v1 | actively-evolving / 12-month bar / passes. Attributing 20% to the contrastive switch would be wrong |
| C1 | KEYSTONE. ANN was implemented inside the existing inverted-index engine, not as a separate vector system, to inherit its operational properties | "By implementing NN support in terms of pre-existing primitives, instead of writing a separate system, we inherited all the features of the existing system, such as realtime updates, efficient query planning and execution, and support for multi-hop queries" (body §4.1) | arXiv:2006.11632, KDD 2020 | stable / foundational-locked / passes |
| C2 | Embeddings entered as a Boolean-query operator, `(nn <key> :radius <radius>)` | "we extended the document representation to include embeddings, each with a given string key, and added a (nn <key> :radius <radius>) query operator" (body §4.1) | arXiv:2006.11632 | stable / foundational-locked / passes |
| C3 | An ANN probe is rewritten into a disjunction of inverted-index terms: coarse cluster becomes a term, quantized residual becomes its payload | "each document embedding is quantized and turned into a term (for its coarse cluster) and a payload (for the quantized residual). At query time, the (nn) is internally rewritten into an (or) of the terms associated to the coarse clusters closest to the query embedding" (body §4.1) | arXiv:2006.11632 | stable / foundational-locked / passes |
| C4 | Radius mode is served over top-K because Boolean constraints can prune a radius search while top-K must scan the whole index | "radius mode enables a constrained NN search (constrained by other parts of the matching expression) but top K mode provides a more relaxed operation which needs to scan the whole index to get top K results." (body §4.1) | arXiv:2006.11632 | stable / foundational-locked / passes |
| C5 | Training on hard negatives alone underperforms training on random negatives | "models trained simply using hard negatives cannot outperform models trained with random negatives." (body §6.1.1) | arXiv:2006.11632 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C6 | The easy:hard negative ratio improves recall monotonically and saturates at 100:1, with the best hard negatives from rank 101-500 | "Increasing the ratio of easy to hard negatives continues to improve the model recall and saturated at easy:hard=100:1." / "sampling between rank 101-500 achieved the best model recall." (body §6.1.1) | arXiv:2006.11632 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C7 | The +8.38% / +7% / +5.33% recall gains belong to online hard negative mining specifically, not to embedding-based retrieval as a whole | "Enabling online hard negative mining was one major contributor to our modeling improvement... +8.38% recall for people search; +7% recall for groups search, and +5.33% recall for events search." (body §6.1.1) | arXiv:2006.11632 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C8 | Retrieval gains do not materialize unless the ranker is co-adapted, because the existing ranking stages were designed for the previous retrieval scenario and rank the new results sub-optimally | "The model at each stage should be optimized for the distribution of results returned by the preceding layer. However, since the current ranking stages are designed for existing retrieval scenarios, this could result in new results returned from embedding based retrieval to be ranked sub-optimally by the existing rankers." (body §5) | arXiv:2006.11632 | stable / foundational-locked / passes |
| C9 | In Alibaba's display-advertising system, the pre-ranking stage takes ~10,000 candidates in and emits several hundred | "the size M of the candidate set that is fed into the pre-ranking system often reaches ten thousand... The magnitude of N is usually several hundred." (body §2) | arXiv:2007.16122 v2, DLP-KDD 2020 | stable / foundational-locked / passes. §1 loosely says "tens of thousands"; cite §2 |
| C10 | In that same advertising system, ranking and pre-ranking run under a strict 10-20 ms latency limit | "both ranking and pre-ranking systems have strict latency limit, e.g., 10 ∼ 20 milliseconds." (body §1) | arXiv:2007.16122 v2 | stable / foundational-locked / passes. Covers both stages, not a pre-ranking-only SLA |
| C11 | Amortized across that advertising system's candidate set, the budget works out to roughly 1-2 microseconds per candidate | DERIVED: 10,000 us / 10,000 candidates = 1 us; 20,000 / 10,000 = 2 us. Inputs are C9 (§2) and C10 (§1). | arXiv:2007.16122 v2, arithmetic 2026-08-24 | stable / foundational-locked / passes. FRAMING GUARD from Gate 0: this is an amortized quotient across vectorized and parallel work, NOT an executable per-candidate time budget. Do not call it wall-clock per candidate. COLD parallelizes; its Table 3 measures 9.3 ms RT at 6700 QPS. Domain: display advertising, not search |
| C12 | The two-tower form cannot use query-item cross features, stated by the team replacing it | "The model expression ability is limited by the vector-product form, and can not utilize the user-ad cross features." (body §2.2) | arXiv:2007.16122 v2 | stable / foundational-locked / passes |
| C13 | Replacing the two-tower pre-ranker gained +6.1% CTR / +6.5% RPM normally and +9.1% / +10.8% under peak load | "In normal days, COLD model achieves 6.1% CTR and 6.5% RPM (Revenue Per Mille) improvement... the improvement turns to be 9.1% CTR and 10.8% RPM" (body §4) | arXiv:2007.16122 v2 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C14 | Two-tower factorizes because item embeddings are precomputed and indexed offline while only the query tower runs per request, with MIPS closing the gap | "inference consists of two steps: 1) computing query embedding u(x, θ); 2) performing nearest neighbor search over a set of item embeddings that are pre-computed from embedding function v... for approximate maximum inner product search (MIPS) problems." (body §3) | Yi et al., "Sampling-Bias-Corrected Neural Modeling for Large Corpus Item Recommendations", RecSys 2019, DOI 10.1145/3298689.3346996. Domain: video recommendation | stable / foundational-locked / passes |
| C15 | In Google's YouTube retrieval model, in-batch softmax negatives were popularity-biased on a highly skewed corpus, and the fix was streaming item-frequency estimation | "in-batch loss is subject to sampling biases, potentially hurting model performance, particularly in the case of highly skewed distribution... a novel algorithm for estimating item frequency from streaming data." (abstract) | Yi et al., RecSys 2019 | stable / foundational-locked / passes |
| C16 | "Cascade Ranking for Operational E-commerce Search" (KDD 2017) is Liu, Xiao, Ou, Si, not Wang et al.; Wang, Lin & Metzler SIGIR 2011 is a separate earlier paper | Front matter: "Shichen Liu, Fei Xiao / Alibaba Group"; reference [22]: "L. Wang, J. Lin, and D. Metzler. A cascade ranking model for efficient ranked retrieval. In SIGIR, 2011." | arXiv:1706.02093 v1, KDD 2017 | stable / foundational-locked / passes |
| C17 | Cascade stages can each be well-tuned yet jointly inconsistent, and that inconsistency maps to online performance | "the ranked lists of the ranking stage and previous stages may be inconsistent... We demonstrate that ranking consistency has a direct impact on online performance." (abstract) | arXiv:2205.01289 v5, 2022-11-03 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date AS AN ATTRIBUTED PREPRINT CLAIM. The PDF's ACM block is an unfilled template, so no venue is asserted. Write "the authors propose" |
| C18 | Training the whole cascade as one network beat stage-wise training in a live ad system by +4.10% revenue and +1.60% user conversions | "Compared to FS-LTR, LCRON brings about a 4.10% increase in advertising revenue and a 1.60% increase in the number of user conversions" (body §1; corroborated §5.5, Table 5) | arXiv:2503.09492 v3, ICML 2025 | dated current-practice evidence (source 2025-06-04, outside the 12-month bar). Passes ONLY if the prose states the date. Gate 0 run 2 caught these marked as passing when they are not. |
| C19 | YouTube's 2019 ranking system handled competing objectives with MMoE and removed selection bias with a shallow tower in the same model | "adopting Multi-gate Mixture-of-Experts (MMoE) [30] for multitask learning. In addition, it introduces a shallow tower to model and remove selection bias." (body §1) | Zhao et al., "Recommending What Video to Watch Next: A Multitask Ranking System", RecSys 2019, DOI 10.1145/3298689.3346997. Domain: video recommendation | stable / foundational-locked / passes |
| C20 | Position bias can be handled without a propensity model: position as a dropout-regularized feature, zeroed at scoring | "we do not build an explicit propensity model. Instead, we introduce position as a feature in the DNN, regularized by dropout. During scoring we set the position feature to 0." (body §4.2) | arXiv:2002.05515, KDD 2020 | stable / foundational-locked / passes |
| C21 | That change produced +0.7% bookings and +1.8% revenue | "we observed a gain of +0.7% in bookings." / "a lift of +1.8% in revenue was a pleasant surprise." (body §4.4) | arXiv:2002.05515 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C22 | An offline-NDCG-neutral model lost 0.67% of bookings online | "we adjusted the alpha hyperparameter to the minimum value such that in offline tests we got the same NDCG as the baseline model... But also a drop of −0.67% in bookings." (body §2.5) | arXiv:2002.05515 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C23 | Two further models lost 1.5% and 1.6% of bookings online | "the interpretability of price came at a heavy cost as bookings dropped by −1.5%." (body §2.2) / "resulting in a booking drop of −1.6%." (body §2.3) | arXiv:2002.05515 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C24 | THE CLOSER. Offline evaluation failed structurally because it could only re-rank documents already in the logs, so it could not see what a changed policy would surface | "The offline analysis suffered from the limitation that it only evaluated re-ranking the top results available in logs. During the online test, applying the newly trained model to the entire inventory revealed the true cost of adding the price loss as part of the training objective." (body §2.5) | arXiv:2002.05515 | stable / foundational-locked / passes |
| C25 | Online bookings can move significantly on NDCG differences as small as 0.7% | "we have observed statistically significant differences in online bookings from models that differed in NDCG by as little as 0.7%." (body §3) | arXiv:2002.05515 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C26 | Factorizing the ranker into a listing-independent query tower cut p99 scoring latency by 33% | "this resulted in a −33% reduction in the 99th percentile scoring latency." (body §2.7) | arXiv:2002.05515 | historical empirical result (2020), age-exempt as a record of that experiment. Gate 0 run 2: benchmark standings, latency figures and business lifts are not foundational merely because the system mattered. The prose must not present this as current performance. |
| C27 | Six years on, the discipline is restated: offline metrics are directional, online A/B establishes significance | "offline evaluations serve as directional indicators for rapid iteration... we rely on large-scale online A/B testing (Section 4) to establish strict statistical significance." (body §3) | arXiv:2607.10096 v1, SIGIR 2026 | actively-evolving / 12-month bar / passes |
| C28 | The team used two different offline indexes, one sized for exhaustive annotation and one sized for realism: 3.6M products / 122k annotated queries, and 200M products / 1k traffic-weighted queries | "two distinct index scales: (1) A Small Index of 3.6M products: 122k queries with comprehensive human annotations to measure EM Recall@K. (2) A Big Index of 200M products: 1k traffic-weighted queries to measure EM Precision@K" (body §3) | arXiv:2607.10096 v1 | actively-evolving / 12-month bar / passes |
| C29 | That pipeline delivered +4.00% EM Recall@20 offline and +7.34% NDCG@5 with +0.50% gross revenue online (p=0.03) | "+7.34% improvement in NDCG@5 and a +0.50% lift in gross revenue" (abstract); "+0.50% (𝑝 = 0.03)" (body §4); "+4.00%" recall (body §3, Table 2) | arXiv:2607.10096 v1 | actively-evolving / 12-month bar / passes |
| C30 | Production LLM query rewriting is served from an offline-built rewrite table, not an inline call, and ~70% of queries miss it | "The offline inference of BEQUE covers 27% of the page views (PV) in Taobao's main search and has a minimal impact on the latency of the online retrieval system." (body §3) / "there are about 70% of online queries that do not hit our rewriting table." (body §4.5) | arXiv:2311.03758 v3, WWW 2024 Industry | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| C31 | The LLM's rewrite re-enters the system as terms in an inverted index, unioned with the original query's candidate set | "both the query and rewrite are tokenized into terms and used as keywords for inverted index matching... The union of the query and rewrite retrieval sets forms the final candidate set" (body §3) | arXiv:2311.03758 v3 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date |
| C32 | It lifted GMV +0.40% across all traffic and +2.96% on the 27% of traffic it rewrote | "surpassed the previous-generation rewriting model CLE-QR by 0.4%, 0.34%, and 0.33% in terms of GMV, #Trans, and UV" / "for the queries covered (rewritten) by BEQUE (approximately 27% of total PV), there were noteworthy increases of 2.96%, 1.36%, and 1.22%" (body §4.5, Table 6) | arXiv:2311.03758 v3 | dated current-practice evidence, older than the 12-month bar / passes ONLY if the prose states the date. UPGRADED from not-on-abs-page. The two figures differ by more than 7x; never conflate |
| C33 | OneRec reports deployment in Kuaishou's main short-video scenarios at 23.7%/28.8% training/inference MFU, and operating expense at 10.6% of the traditional pipeline | "we have achieved 23.7% and 28.8% Model FLOPs Utilization (MFU) on flagship GPUs during training and inference, respectively... resulting in operating expense (OPEX) that is only 10.6% of traditional recommendation pipelines" (abstract) | arXiv:2506.13695 v4, June 2025 technical report | historical empirical result, June 2025, must be dated in prose. TRAFFIC-SHARE CLAIM REMOVED per Gate 0 run 2: the "25% of total QPS with no cascade" framing is unsupported because the paper's own traffic accounting is unreconciled (C42). Domain: recommendation, OUT OF THESIS SCOPE |
| C34 | The cascade it partly replaces ran at 4.6% training / 11.2% inference MFU against ~40% for LLMs, with over half of serving resources on communication and storage | "the model's training and inference MFU is only 4.6% and 11.2% on flagship GPUs, respectively, which is substantially lower than the efficiency observed in large language models (LLMs), where the MFU is approximately 40% on H100" AND "over 50% of resources during serving are allocated to communication and storage rather than high-precision computation" (both body §1) | arXiv:2506.13695 | actively-evolving / 12-month bar / passes AS A DATED CLAIM. Same June 2025 vintage |
| C35 | The same year, a personalized-search deployment kept the cascade and improved it, getting over +2% GMV/UU and +2.90% advertising revenue | For "kept the cascade": "a unified framework that seamlessly integrates LLM-style context engineering and reasoning into both retrieval and ranking models of industrial cascaded pipelines" (abstract). For the gains: "deployed in the main personalized search scenario of Shopee and achieves consistent online gains... including over +2% GMV/UU and a +2.90% increase in advertising revenue." (abstract) | arXiv:2509.18091, 2025-09-22 | actively-evolving / 12-month bar / passes |
| C36 | KEYSTONE FOR THE CODA. A 2026 unification kept the funnel and the existing serving stack; the two stages survive as two heads on one shared trunk | "one input format, one model, one training stage, deployed within existing serving infrastructure. A shared transformer encodes the user action sequence into candidate-independent representations that branch into retrieval (ANN dot-product) and ranking (cross-attention) via task-specific heads." (abstract) | arXiv:2606.00422, 2026-05-29 | actively-evolving / 12-month bar / passes |
| C37 | That unification delivered ~+1% engagement, 11.1% lower end-to-end serving latency, and 63.6% higher QPS | "delivers approximately +1% online engagement lift while cutting end-to-end serving latency by 11.1% and lifting QPS by 63.6%." (abstract) | arXiv:2606.00422 | actively-evolving / 12-month bar / passes |
| C38 | The generative camp has independently rediscovered the stage-misalignment problem, naming "the disconnection between generation and ranking stages" as a core challenge, and reports +1.34% GMV | "the misalignment between interest objectives and business value, the target-agnostic limitation of generative processes, and the disconnection between generation and ranking stages." / "(GMV - Normal +1.34%)" (abstract) | arXiv:2603.02999 v3, 2026-03-12 | actively-evolving / 12-month bar / passes AS AN ATTRIBUTED PREPRINT CLAIM. v3 carries an unfilled ACM template; no venue asserted |
| C39 | A multimodal LLM reranker does run in live production search, at an average 76 ms per query over hundred-scale candidates | "To evaluate real-world efficacy, we conduct extensive online A/B testing within the high-concurrency environment of the Pailitao e-commerce platform." and "the inference latency of Pailitao-VL-Embedding is compressed to 67 ms per query, while Pailitao-VL-Reranker-List achieves an average latency of 76 ms per query." (body §6.4). Candidate scale: "Given the hundred-scale document candidate set per query" (body §4) | arXiv:2602.13704 v2, 2026-03-05 | actively-evolving / 12-month bar / passes. REPLACES a deleted row that wrongly asserted no such deployment had been published. Gate 0 caught that the counterexample was already in this matrix at M21-M22. SEPARATION GUARD: 76 ms is the ONLINE figure from §6.4. A similar-looking 75.01 ms in §6.3 Table 5 is an offline vLLM benchmark on a single A800 and is a different measurement |
| C40 | For contrast across two papers in different domains: a production LLM reranker runs at 76 ms/query over hundred-scale candidates in e-commerce search, while a display-advertising paper reports a 10-20 ms limit for its ranking and pre-ranking stages | 76 ms/query (arXiv:2602.13704 §6.4, e-commerce search) and "both ranking and pre-ranking systems have strict latency limit, e.g., 10 ∼ 20 milliseconds" (arXiv:2007.16122 v2 §1, display advertising) | two sources, juxtaposed by the post | actively-evolving / 12-month bar / passes AS A LABELLED CROSS-PAPER CONTRAST ONLY. Gate 0 run 2 struck the causal clause ("which is why an LLM reranker sits on a top slice"): neither paper establishes it, the domains and stage definitions differ, and Pailitao says its latency meets its own production requirements. State the two numbers, name both domains, draw no causal conclusion |
| C43 | KEYSTONE. In Kuaishou out-of-mall search the inverted-index branch persisted despite converting below platform average, because it was almost the only branch where operations could inject a term within hours without a model update; and the paper names editability, not retrieval quality, as the decisive axis. The property lived in the upstream resources feeding the index, not in the index structure | "the inverted-index branch converts below the platform average yet persists because it is almost the only branch where operations can inject a new term within hours without any model update; a one-model substitute must preserve this real-time editability" (abstract); section heading "The Decisive Axis Is Editability, Not Retrieval Quality" (§4.2); "Its editability resides not in the index structure but in the upstream resources that feed it" (§2.1) | OneRetrieval, arXiv:2606.13533 v2, 2026-06-22, Kuaishou. Domain: e-commerce search (IN SCOPE) | actively-evolving / 12-month bar / passes |
| C44 | In an 11-day online A/B at about 8.2% absolute traffic, OneRetrieval replaced the production inverted-index branch, and in a second configuration at the same share replaced both the inverted-index and dense branches. It recovered most, not all, of the incumbent's intervention capability: 0.553 IAR@350 against 0.761 | "control and experiment buckets each serving 20.0% relative traffic (about 8.2% absolute), balanced over a 7-day AA window and measured over an 11-day AB window" (§4.6); "replaced the production inverted-index branch with OneRetrieval" and "replaced both the inverted-index and the dense (vector) branches with OneRetrieval" (§4.6); "OneRetrieval reaches an IAR@350 of 0.553 against 0.761 for the inverted index" (§4.4, Table 6) | OneRetrieval, arXiv:2606.13533 v2 | actively-evolving / 12-month bar / passes. CORRECTED at Gate 0 run 3, which caught the earlier version inflating an A/B bucket into a platform-wide rollout. "Nearly the entire stage" is the authors' architectural characterization of the configuration, not a statement of traffic served. Do not write that OneRetrieval replaced the retrieval stage in production without naming the 8.2% |
| C45 | COUNTEREVIDENCE TO ANY EDITABILITY-GATE READING. OneSearch, an end-to-end generative framework the same authors classify as carrying essentially no real-time intervention capability, is deployed on the entire traffic of detail-page search, 50% of mall search and 20% of homepage search, and reduces operational expenditure 75.40% | "It has been successfully deployed for the entire traffic on the detail page search, 50% traffic on the mall search, and 20% traffic on the homepage search platform" (§1); "OneSearch, the first industrial-deployed end-to-end generative framework for e-commerce search" and "OneSearch reduces operational expenditure by 75.40%" (abstract); online A/B "+1.67% item CTR, +2.40% buyer, and +3.22% order volume" (abstract). Classified by OneRetrieval §4.2: "OneSearch is a closed-codebook method and therefore carries essentially no real-time intervention capability" | OneSearch, arXiv:2509.03236 v5, 2025-10-22, Kuaishou. Domain: e-commerce search (IN SCOPE) | actively-evolving / 12-month bar / passes. Gate 0 run 3 caught these traffic figures being omitted while the thesis-friendly OneRetrieval result was inflated. They are the strongest anti-thesis numbers in the matrix and the post leads with them rather than burying them |
| C46 | The successor reports further online gains, framing generative retrieval against cascaded architecture on end-to-end optimization and compute efficiency | "Compared to multi-stage cascaded architecture, it offers advantages such as end-to-end joint optimization and high computational efficiency."; online A/B "+3.98% item CTR, +2.07% buyer volume, +2.11% order volume" (abstract) | OneSearch-V2, arXiv:2603.24422 v2, 2026-05-14 | actively-evolving / 12-month bar / passes. Abstract carries no traffic-share figure; do not invent one |
| C41 | OUT OF SCOPE BUT NAMED. In recommendation, not search, one generative system has taken all traffic in a business scenario: "the system has now taken over 100% of QPS for this business scenario" | "The results demonstrate that OneRec achieves a 21.01% growth in GMV, a 17.89% increase in order volume, an 18.58% rise in buyer numbers, and a 23.02% increase in new buyer acquisition. Consequently, the system has now taken over 100% of QPS for this business scenario." (body §4.5, Local Life Service) | arXiv:2506.13695 v4, 2025-09-16 | actively-evolving / 12-month bar / passes AS A DATED, OUT-OF-SCOPE CLAIM. The post's thesis is scoped to search; this is recommendation. It gets one honest sentence rather than omission, because omitting it is what Gate 0 called asymmetric source inclusion |
| C42 | The OneRec paper's own account of what "25% of QPS" means is internally unreconciled, so the post does not use the figure as a traffic-share fact | Abstract: "it handles 25% of total queries per second (QPS)". Section 1: "manages approximately 25% of total QPS". Appendix B: "our experimental group traffic is 5%, with OneRec applied to 25% of the degraded traffic within this group" and "we broadly categorize QPS into real-time and degraded (cached) traffic". Conclusion: "has successfully replaced the original caching mechanism and now serves 25% of the traffic in Kuaishou's main scenarios" | arXiv:2506.13695 v4 | actively-evolving / 12-month bar / passes AS A STATEMENT OF SOURCE INCONSISTENCY. Gate 0 run 2 was right that the earlier version picked the appendix reading and presented it as settled. The four statements are not reconcilable from the paper; if the post mentions the figure at all it says the paper reports it inconsistently |

## Related posts on augusteo.com

Scanned `src/content/blog/` on 2026-08-24 for topic-adjacent posts. Ranked by retrieval-term density, the candidates were `omni-modal-stack` (29 hits), `unified-vision-stack` (11), `preference-tuning-vision-models` (3), `image-generators-vision-models` (2).

On reading, none clears the bar for an inline prose link:

- `omni-modal-stack` and `unified-vision-stack` use "retrieval" in the *in-context retrieval* sense (attention layers preserving exact-position lookups in a Mamba hybrid), not the search sense. The concepts share a word and nothing else. Linking them would mislead.
- `preference-tuning-vision-models` and `image-generators-vision-models` mention embeddings only in passing.

CONCLUSION: the related-posts section is intentionally empty of linkable candidates. Per hard rule 11 the rule is "search and link if relevant", not "force a link". Gate 2's cross-reference check is a no-op for this post on the "genuinely empty" branch.

One forward-looking note for a future post: this post and `unified-vision-stack` would connect naturally if a later post covered vision backbones as retrieval encoders, since Act 5 here stops at CLIP-as-retriever and that post starts at C-RADIOv4. That is a sequel hook, not a link for this post.


## Outline

**Restructured 2026-08-24 after Gate 1 HALT.** The previous outline organized by model family and stated the thesis only in its first and last sections; codex called it a catalog with a thesis stapled on, and the deletion test failed on 12 of 22 sections. This version is organized around the argument itself.

### The spine

Every act answers the same four questions about one generation of retrieval machinery:

1. What was the incumbent quietly doing that no benchmark measured?
2. What did the challenger win on?
3. Did the challenger preserve the property, route around it, or ignore it?
4. What actually happened in production?

Six acts, same four questions, different answers. That threads the thesis through every section instead of bolting it on, and it turns the coda into the last data point rather than a new idea. It also pulls in C1-C4, which the previous outline omitted entirely despite being the clearest evidence the post has.

**Best practice is attached to each act, not appended.** Vic's requirement is that the post give the August 2026 recommendation, not only the history. Each act closes with a short, concrete "what to do about this in 2026" that falls out of the four questions, and act 7 consolidates. Guidance stays welded to the mechanism that justifies it.

**Evaluation is taught early and again late.** Section 2 is a short primer, because a reader cannot judge any claim after it without a yardstick. Section 20 is the deep treatment. This split is deliberate: the 2026 tuning literature largely builds ground truth from a single LLM judge, so the reader needs the judge's limits before the tuning advice, not after.

23 sections plus a coda, ~24,000 words.

### Act 1 — The only question

**1. One query, and the scan you cannot afford.** The throughline query arrives. Every index in history answers one question: how do you avoid comparing the query to everything? Anchor on the measured cost of not avoiding it (L1, L2). State the thesis plainly, and state that it is about deployment rather than benchmark scores.
Reader can now: say why an index exists, in cost terms.

**2. How you would know if it worked.** Short primer, deliberately before any advice. What recall and nDCG measure and where they diverge. Then the trap that governs everything downstream: LLM judges reproduce system orderings well in aggregate and agree with individual human labels weakly, and the aggregate number degrades exactly where decisions get made (A2 rows). Not the full treatment; enough that every later claim can be weighed.
Reader can now: read every benchmark number in the rest of the post with the right amount of suspicion.

### Act 2 — The lexical machine

**3. The posting list, and why rare words are the whole trick.** Term to posting list, docID plus frequency, block structure (L4-L7).
**4. BM25's two dials.** Saturation via k1, soft length normalization via b, and the fact that the model supplies neither constant (L8-L15). The variants question, settled: eight of them, no significant difference, stopwords matter more (L16, L17). The real divergence is mundane (L18-L21).
**5. Skipping, which is a cascade in 1995.** WAND and block-max: upper bounds and a running threshold let you skip most of the list (L22-L29). Name the pattern out loud, because act 6 is the same idea with neural parts.
**6. The two things term matching cannot do.** BM25F pools across fields and saturates once (L31, L32). But `under $150` is not a term (T1), and the vocabulary problem is real and measured (L34). These are the two failures everything after this responds to.
**Act 2 ledger + practice.** Incumbent property: exact match, cheap structured filtering, real-time updates, operator intervention. Practice: BM25 with tuned k1/b remains the baseline you must beat, and out-of-domain it is a hard baseline (R18).

### Act 3 — The vector turn

**7. One vector per document, and the objective that puts meaning in it.** The bi-encoder and why it factorizes (V1). Then the rung Gate 1 said was missing: the contrastive training objective, which is the mechanism that makes semantically related text land nearby. NEW MATRIX ROW REQUIRED. Then what it bought and what it cost (V2, V3, V4).
**8. The ANN ladder, and HNSW.** Folded from two sections per Gate 1. Trees die above ~10 dimensions (L33); LSH, IVF, PQ (V5-V8); ScaNN's turn, that reconstruction error is the wrong loss for inner-product search (V9). Then HNSW: skip-list layers, the pruning heuristic that buys directional diversity, the three degree numbers kept apart, the authors' own concession about the hierarchy (V10-V19), and the flat-graph result that finishes it (V20-V23).
**9. What a filter does to a graph.** Pre, post, inline (V31, V32). The failure shape. The honest mechanism, ACORN's expected degree and disconnection bound with the no-predicate-clustering assumption visible (V36, V36b, V36c), and the explicit retirement of the percolation framing (V37). Both repairs and where each loses (V33-V35, V38-V43).
**10. Where the vector physically lives.** RAM, SSD, object storage; PQ, RaBitQ, binary plus rerank, Matryoshka (V24-V30). The rollback to centroids nobody frames as a rollback.
**Act 3 ledger + practice.** Dense won the paraphrase and gave up exact match, cheap filtering and editability. Practice for 2026: do not select an embedding model on leaderboard rank; truncation to 256 dimensions is close to free and does not require Matryoshka training; quantization choice is bounded by metric geometry.

### Act 4 — The reconvergence

**11. Neural weights in an inverted index.** Learned sparse writes term weights into a Lucene index (R1-R4). The efficiency inversion: the classical half is what blows up (R5, R6). And doc2query's filtering result (R7). Fig 2's second panel belongs here, not in section 3.
**12. Two lists, one order.** RRF's constant and its provenance (R8, R9). The reversal: the method sold as tuning-free is the parameter-sensitive one, and a plain convex combination at alpha=0.5 beats default RRF (R10, plus the 2026 replication). What shipped systems actually default to, and that two of them have already migrated away from RRF.
**13. The interaction axis, and when a reranker earns its latency.** Bi-encoder, late interaction, cross-encoder as one axis of precomputability (R11-R17). Then the 2026 evidence that reranking is not free quality: it has a ceiling, and over a strong dense first stage it can be net negative. Close on BEIR, scoped to zero-shot (R18).
**Act 4 ledger + practice.** Practice: hybrid remains the defensible default, but sell it as variance reduction across corpora rather than a large average gain; rerank when the first stage is lexical or weak, and measure before assuming it helps otherwise.

### Act 5 — Searching with a picture

**14. One space for pixels and words.** The contrastive objective across modalities (M1, M2), what it is blind to (M3, M4), and the correction at the right scope (M5, M6). The 2025 fix was not a better loss (M7).
**15. Stop parsing the PDF.** ColPali (M8, M9), the harder benchmark that followed (M11, M12). The post's cleanest case of genuine replacement, of an ingestion pipeline.
**16. One embedding, three jobs.** The keystone (M15): one embedding in ANN retrieval, in L1, and as an L2 feature. 256 dimensions, 300k QPS, and the cache absorbing all but ~500 of it (M16-M18). No model wins everywhere (M19, M20). This section IS the bridge to act 6: it ends with candidates that now need pruning, cross-features and business constraints.
**Act 5 ledger + practice.** Practice: the embedding is a feature deployed at several layers, not the retrieval layer.

### Act 6 — The cascade

**17. The funnel, and the system that refused to leave it.** Opens on C1-C4, absent from the previous outline and fatal to omit: ANN implemented as an operator inside the existing inverted index, explicitly to inherit real-time updates, query planning and Boolean constraint pruning. Then the funnel shape, with each number's domain named in the claim (C9-C11). And the invariant that motivates the act: an item filtered out earlier cannot be presented later (T2).
**18. Why L1 is a dot product.** Two-tower factorization and its cost, stated by the team replacing it (C12-C15).
**19. The stages disagree.** Attribution done right (C16), misalignment, and training the cascade as one network (C17, C18).
**20. Why your offline number lied.** The deep evaluation section. Airbnb's online losses and the structural reason (C22-C26). Then the 2026 picture: LLM judges rank systems well in aggregate and agree with individual labels weakly; the correlation degrades among top systems and inverts under circularity. Carry the complication honestly, that one study found the human assessors were the unreliable party. Interleaving as a validated intermediate with a documented failure mode. And the honest gap: there is no verified published offline-to-online correlation coefficient.
**Act 6 ledger + practice.** Practice: keep the judge's model family disjoint from the ranker's; hand-label the final bake-off; treat offline metrics as a regression filter.

### Act 7 — What to build, and what nobody measured

**21. The defensible default in August 2026.** One consolidated recommendation, every clause traceable to an act above.
**22. The folk numbers.** The most useful section in the post for a working engineer. No controlled study exists for 512-token chunks, 10% overlap, k=60, top-k=5, or MMR in a RAG pipeline. The ones that have been tested were mostly falsified: overlap provides no measurable benefit; hierarchical pipelines lose at matched token budgets; retrieval score is not a usable confidence threshold. Where the evidence is genuinely thin, say so, including that no primary source measures parser quality as an isolated variable.
**23. Two deployments, one year, opposite answers.** The paired Kuaishou cases in full, moved here from the coda per Gate 1: out-of-mall search, where editability gated replacement and the successor had to rebuild it to 0.553 against 0.761 in an 11-day A/B at 8.2% traffic (C43, C44); and detail-page search, where a system with essentially no intervention capability took the entire traffic (C45, C46). Editability was decisive in one place and irrelevant in the other, and it never lived in the index anyway.

### Coda

**24. The test.** Two or three paragraphs. State the falsification condition, name the out-of-scope case in one sentence (C41, C42), end on something small and concrete. The coda concludes the model; it does not introduce it.

### Throughline discipline

Gate 1 found the query died after act 3 and that its claimed exact-match trap was fictional, since the query contains no brand or SKU. Both fixed:

- **The query gains a second form.** Act 2 introduces the reformulation a real user types next: a specific model name and code. That is where exact match becomes load-bearing, and it is honest, because the original phrasing never asked for one.
- **Act 4** runs both forms through learned sparse, fusion and a reranker, and names which form each helps.
- **Act 5** states precisely what the photo replaces and what it cannot: an image cannot express `under $150`, so the structured predicate survives the modality change. That is the section's point, not a decoration.
- **Act 6** runs the query down the real funnel before any advertising numbers appear.
- **Act 7** resolves it: what the reader would actually build to serve this query, and what about it nobody has measured.

### Figure table

13 figures, all `static-svg`. Both formerly-interactive figures were re-typed at Gate 1 with Vic's approval (unlock-count 1 each); neither's intuition depended on the reader moving a control.

| # | Figure | Type | Section | Mechanism | Reader notices | unlock-count |
|---|---|---|---|---|---|---|
| 1 | ScanCost | static-svg | 1 | Documents fully scored, and separately latency, for exhaustive OR against WAND and block-max on GOV2, dated | The document-count gap is ~174x; the latency gap is ~8x. Two different axes, not one | 0 |
| 2 | PostingList | static-svg | 3 | Term to posting list, docID plus frequency, decompressible blocks. SINGLE panel; the learned-weights panel moves to Fig 11 per Gate 1 | The structure is simple and the cost is in list length | 0 |
| 3 | Bm25Dials | static-svg (re-typed at Gate 1) | 4 | Small multiples: three k1 saturation curves, three b length-normalization states | Saturation bounds any one term's contribution; b=0 turns length off entirely | 0 |
| 4 | BlockMaxSkip | static-svg | 5 | A posting list with list-level and block-level maxima against a running threshold | A loose bound skips little, a tight bound skips most of the list | 0 |
| 5 | DenseVsLexical | static-svg | 7 | The two query forms against two documents, scored lexically and densely, one where each wins | Paraphrase and exact match are different failures, not two ends of one axis | 0 |
| 6 | AnnLadder | static-svg | 8 | The lineage as rungs, each labelled with the assumption it broke. Only rungs with matrix rows appear | Each index fixed one specific wrong assumption | 0 |
| 7 | HnswAnatomy | static-svg | 8 | Explicit panels: skip-list layers; the pruning heuristic choosing diverse directions; the three degree numbers side by side | The heuristic does more work than the hierarchy on real high-dimensional data, per the authors' own scoped claim | 0 |
| 8 | FilteredDegreeCollapse | static-svg (re-typed at Gate 1) | 9 | Three panels: expected surviving degree against the M threshold; a random-filter topology; a correlated-filter topology. Assumption printed on the figure | Recall collapses while latency stays flat, and a correlated filter does not behave like random removal | 0 |
| 9 | VectorResidence | static-svg | 10 | One vector across compression formats, and separately across storage tiers. Split axes per Gate 1; no single latency cliff claimed | Moving down the storage hierarchy changes the index family, not just the latency | 0 |
| 10 | InteractionAxis | static-svg | 13 | Bi-encoder, late interaction, cross-encoder, with what each can precompute | Precomputability and expressiveness trade directly against each other | 0 |
| 11 | LearnedPostings | static-svg | 11 | The Fig 2 posting list, now holding learned term weights, side by side with the BM25 version | The index did not change; what was written into it did | 0 |
| 12 | CascadeBudget | static-svg | 17 | The funnel. Only boxes with sourced numbers carry numbers, and each is labelled with its domain | The per-candidate budget is microseconds, which is the constraint L1 was designed around | 0 |
| 13 | OfflineOnlineGap | static-svg | 20 | Airbnb's online booking losses against what offline reported, drawing only what the rows support, plus the log-replay blindness | An offline harness cannot see documents it never showed | 0 |

### New matrix rows required before drafting

1. The contrastive training objective as the mechanism behind semantic matching (act 3 rung, Gate 1 finding 4).
2. Evaluation rows: LLM-judge per-item versus system-level agreement; the top-of-leaderboard degradation and circularity inversion; the counter-evidence that human assessors disagreed with each other; interleaving as an intermediate.
3. Best-practice rows: the fusion replication; the overlap falsification; chunking method ranking and the baseline-definition resolution; the calibration finding; contextual retrieval with its no-chunking caveat.
4. The BRIGHT reasoning-retrieval collapse (verified: 59.0 nDCG@10 on MTEB, 18.3 on BRIGHT).
5. The folklore section's negative claims, each recorded as either a falsification with a source or an explicit absence of evidence.

## Codex research review

Gate 0 fired 2026-08-24 against Spec + Throughline + Research notes + Claim-source matrix. Verdict: **HALT**. Full verbatim output in `notes/search-retrieval-stack-codex-research-20260824.md`.

Nine structural findings. All applied. Summary of what changed and why:

1. **Thesis was unsupported and contradicted.** "Every / not one / never" cannot be earned from examples, and OneRec v4 reports taking 100% of QPS in one business scenario, which is replacement. Also flagged a category error: the draft slid between web search, product search, ads and recommendation. FIXED by scoping the thesis to search (Vic's call, 2026-08-24), dropping all universals, requiring every industrial example to carry its domain label in prose, and naming the two exceptions (ColPali replaces the OCR pipeline; OneRec is out of scope but gets a sentence).
2. **C39 was false and refuted by a source already in the matrix.** Pailitao-VL describes an MLLM reranker in live production at 76 ms/query. FIXED: row deleted and replaced with the positive claim, plus C40 comparing 76 ms against the 10-20 ms stage budget.
3. **V41's quote was suspected fabricated.** VERIFIED verbatim on re-check, but it belongs to the pinned-low-threshold experiment, not the default-configuration table. FIXED: attribution corrected and V41b added carrying the actual default-config numbers.
4. **An 18-month bar had leaked into 26 rows of a 12-month topic.** FIXED: three-bucket recency policy written into the Spec; rows reclassified individually rather than relabelled in bulk.
5. **Throughline claims without rows.** FIXED: an evidence-status block now states which parts of the worked query are cited, which are illustrative, and that BM25 already orders results so act 6 does not "finally" supply an order.
6. **Twelve claim/source mismatches** (L13, L31, V15, V16, V22, V25, R8, M7, C8, C11, C28, C34, C35). All softened or re-quoted.
7. **Traceability gaps.** FIXED: hnswlib pinned to 34fe8ff1eab7; V5 marked unverifiable; L30 marked bibliographic-attribution-only; the two RecSys 2019 papers separated (Zhao 10.1145/3298689.3346997, Yi 10.1145/3298689.3346996).
8. **Asymmetric source use on the ~21 links figure.** Codex was right and an earlier pass was wrong: Qdrant reports about 21 realized layer-0 links at m=16 for its 1M-point benchmark, stated twice. FIXED: V13 rewritten to carry all three numbers (32 allocated, 37.8 average slots, ~21 realized) and keep them apart.
9. **Related-posts omission** judged reasonable. No change.

Of the five judgement calls submitted for review, two were wrong and are reversed: dropping Furnas (the paper is reachable via CiteSeerX; L34 reinstated with the verbatim <0.20 sentence) and calling ~21 unsourceable. The percolation demotion was upheld but the replacement was incomplete, so V36b (ACORN's disconnection bound) and V36c (the paper's explicit statement that no connectivity guarantee exists) were added.

Independent verification of all five of codex's factual counter-claims was run before applying any of them; all five held.

### Gate 0, run 2 (2026-08-24)

Verdict: **HALT** again. Full output in `notes/search-retrieval-stack-codex-research-run2-20260824.md`. Ten structural findings; all applied.

The decisive one: scoping the thesis to search did not remove the counterexamples, it just moved them. Codex surfaced three in-scope, production, published generative-search systems at Kuaishou that the matrix had missed entirely: OneSearch (arXiv:2509.03236), OneSearch-V2 (arXiv:2603.24422) and OneRetrieval (arXiv:2606.13533). All three were verified directly before being accepted. OneRetrieval replaced the inverted-index branch in production and then extended to nearly the whole retrieval stage.

That killed thesis v2 and produced thesis v3, which is stronger, because OneRetrieval states the mechanism while performing the replacement: the inverted index persisted on real-time editability despite converting below platform average, and the generative substitute had to reimplement editability to displace it. Rows C43-C46 carry this.

Other findings applied:

- The negative claim about production LLM rerankers had been fixed in the matrix but left standing in two prose passages (Spec and Research notes). Both removed. A correction that does not propagate is not a correction.
- C42 had resolved OneRec's genuinely unreconciled traffic accounting into a confident fact. Rewritten as an explicit statement of source inconsistency, and C33's traffic-share claim removed as a consequence.
- C40 had drawn a causal conclusion ("which is why an LLM reranker sits on a top slice") across two papers in different domains that establish no such thing. Reduced to a labelled numerical contrast.
- Domain labels had been placed in caveats rather than in claim text for C9, C10, C11, C15 and C19. Moved into the claims.
- The recency audit was incomplete and `foundational-locked` was doing loophole duty. Four buckets now: foundational-locked (67), method-defining historical source (11), dated current-practice evidence (25), historical empirical result (27). Benchmark standings, latency figures and business lifts are no longer age-exempt just because the system mattered. V20-V23, R15, M7, C18 and M19 were marked passing while sitting outside the 12-month bar; now dated.
- Two throughline claims lacked rows and one overreached. T1 (price-range filtering, from the PVLDB tutorial's own example) and T2 (recall lost upstream) added; "dense retrieval catches the paraphrase" demoted to what the vocabulary problem predicts rather than a measured result; the 10^8-document scale anchor removed, since the matrix only supports GOV2's 25.2M.
- V36b was cited as a general connectivity argument without ACORN's no-predicate-clustering assumption. Guard added.
- V14's commit pin was unverifiable as written; replaced with a resolvable blob URL and an instruction to re-pin if it does not resolve at draft time.
- The interactive figure was still named "filter-selectivity percolation", which teaches the model Gate 0 rejected twice. Renamed and respecified to visualize ACORN's expected-degree result and disconnection bound with assumptions on the figure, plus a panel showing correlated filters breaking random-removal.

Judgement calls re-reviewed: the HNSW arithmetic is correct but only when described as average connection-ID capacity; the percolation demotion is upheld (there are percolation results for planar relative-neighborhood graphs, but nothing transferable to finite high-dimensional degree-capped HNSW under correlated filtering); reinstating Furnas was right; the empty related-posts section is right.


### Gate 0, run 3 (2026-08-24) - cap reached

Verdict: **HALT**, four structural findings. Full output in `notes/search-retrieval-stack-codex-research-run3-20260824.md`. This was the third and final invocation under the gate-runner cap. Vic's call at the cap: apply the four findings and proceed to Phase 3 without a fourth run.

1. **Thesis v3 was falsified by its own stated falsifier.** v3 said replacement waits until a successor reimplements the incumbent's operational properties. OneSearch carries, by the same authors' classification, "essentially no real-time intervention capability", and is deployed on "the entire traffic on the detail page search, 50% traffic on the mall search, and 20% traffic on the homepage search platform". Thesis rewritten to v4: the gate is operational and surface-dependent, not general.
2. **C44 inflated, C45 omitted.** C44 had turned an 11-day A/B at about 8.2% absolute traffic into a platform-wide rollout; C45 had left out OneSearch's traffic shares, which are the strongest anti-thesis numbers available. Both fixed, and C44 now carries the intervention-activation gap (0.553 against 0.761) that shows the capability was recovered but not matched.
3. **T2 was a causal claim wearing a disguise.** Its two cited quotes were adjacent, not supporting, and the gap was labelled "the post's own reasoning". Re-sourced to OneSearch §1, which states it directly: "If an effective item that aligns with the user's true intent is filtered out in an earlier stage, no matter how precise the subsequent models are, they cannot present this item to user."
4. **Recency scheme still leaky.** The Spec declared three buckets while the matrix used four; contract and classifications now agree at four. `method-defining` was laundering exemptions for a five-page tutorial (T1, V31, V32), now reclassified. Six further empirical rows (L17, V4, R10, M3-M5) moved out of `foundational-locked`.

All of codex's factual counter-claims in this run were verified directly against the papers before being applied. Every one held.

Judgement calls re-confirmed at this run: the HNSW arithmetic is right when described as connection-ID capacity; the percolation demotion stands; reinstating Furnas was right; the empty related-posts section is right.

**Gate 0 closes here at the cap with findings applied.** Gate 1 re-reads the Spec, Throughline, Research notes and full matrix alongside the outline, so anything that survived this pass gets another adversarial read before any prose is drafted.


## Resume here

Last touched: 2026-08-24.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | done; Gate 0 closed at cap after 3 runs, all findings applied | `## Research notes`, matrix (~161 rows), `## Codex research review` |
| 3. Outline + figure list | restructured after Gate 1; new matrix rows + Gate 1 re-run pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/search-retrieval-stack/index.mdx` |
| 5. Implement figures | 0 of 13 | per-figure table below |
| 6. Playwright review | 0 of 13 | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-08-24 | 0 (research) | HALT, 9 structural findings, all applied | `notes/search-retrieval-stack-codex-research-20260824.md` |
| 2026-08-24 | 0 (research, run 2) | HALT, 10 structural findings, all applied; thesis revised to v3 | `notes/search-retrieval-stack-codex-research-run2-20260824.md` |
| 2026-08-24 | 0 (research, run 3) | HALT at cap, 4 structural findings, all applied; thesis revised to v4; Vic accepted at cap | `notes/search-retrieval-stack-codex-research-run3-20260824.md` |
| 2026-08-24 | 1 (outline) | HALT, 12 findings incl. 2 TYPE-CHANGE; both re-types approved by Vic; full outline restructure pending | `notes/search-retrieval-stack-codex-outline-20260824.md` |

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | ScanCost | static-svg | TODO | |
| 2 | PostingList | static-svg | TODO | |
| 3 | Bm25Dials | static-svg | TODO | |
| 4 | BlockMaxSkip | static-svg | TODO | |
| 5 | DenseVsLexical | static-svg | TODO | |
| 6 | AnnLadder | static-svg | TODO | |
| 7 | HnswAnatomy | static-svg | TODO | |
| 8 | FilteredDegreeCollapse | static-svg | TODO | |
| 9 | VectorResidence | static-svg | TODO | |
| 10 | InteractionAxis | static-svg | TODO | |
| 11 | SharedSpaceBlindSpot | static-svg | TODO | |
| 12 | CascadeBudget | static-svg | TODO | |
| 13 | OfflineOnlineGap | static-svg | TODO | |

### Open work from Gate 1 (must clear before drafting)

Full findings in `notes/search-retrieval-stack-codex-outline-20260824.md`. The restructure is being done in one pass together with the August-2026 best-practice material Vic asked for.

1. **Thread the thesis through every act.** The outline argues in section 1 and section 22 and organizes by model family in between. Fix: every act answers the same four questions (what did the incumbent do that no benchmark measured; what did the challenger win on; did it preserve the property; what happened in production). Pull C1-C4 into the post, currently absent entirely, which is fatal for this thesis.
2. **Act 3 is 5 of 22 sections, not the claimed 11%.** Fold or cut. Move the space to the operational thread and the paired Kuaishou cases.
3. **Throughline dies after act 3** and the coda introduces a new scenario instead of resolving the query. Also: the query contains no brand and no SKU, so the claimed exact-match trap is fictional. Either name a reformulation that contains one, or drop that property.
4. **Add the missing rung between vocabulary mismatch and dense retrieval:** the contrastive training objective. Needs a new matrix row.
5. **Build the act 5 to act 6 bridge** out of M15, which already places one embedding at three stages.
6. **~19 outline claims overstate their rows.** Full table in the findings file. Fix each at rewrite.
7. **Fig 2's second panel forward-references section 11** and spends the payoff before the mechanism exists. Split it.
8. **Seven figures overclaim or combine incompatible jobs** (1, 6, 7, 9, 11, 12, 13). Narrow each to what its rows support.
9. **The coda cannot carry nine things in 1,000 words.** Move the paired Kuaishou cases into act 6; leave the coda the falsification test only.

### Suggested next batch

1. Add the five groups of new matrix rows listed at the end of `## Outline`. Verify each quote by direct fetch before it enters the matrix; two research passes in this project produced fabricated quotes, and one produced a false retraction of correct ones.
2. Re-run Gate 1 on the restructured outline (invocation 2 of 3).
3. Phase 4 drafting, one section per commit, voice-check clean before each.

### Superseded next batch

1. Run Gate 0: codex against Spec + Throughline + Research notes + Claim-source matrix. 10-20 min. Per the `codex-gate-invocation` project memory: `CODEX_HOME=~/.codex-personal codex exec --sandbox read-only -c tools.web_search=true -o <out.md> "$(cat prompt.md)" < /dev/null`. No `-m` flag.
2. Apply STRUCTURAL findings; record in a `## Codex research review` section and the Codex history table.
3. Phase 3: outline plus figure table, 13 figures, all static-svg. Number sections; verify the throughline threads every act.
4. Gate 1.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/search-retrieval-stack/index.mdx` for remaining placeholders.
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the `## Claim-source matrix` with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving, 18 months for stable). Phase 7 re-checks freshness. No silent lowering of the bar; no "current at date of last research" — date of publication.
2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-triggered without Vic prompting.
5. **Static is the figure default for new figures.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle).
6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
7. **One section per commit, one figure per commit, one migration per commit.** Safe revert points.
8. **Sentence-case headings.** Numbered sections (`### 3. The vector turn`). Em-dashes (U+2014) are forbidden in prose BUT permitted in act-divider headings (`## Act 1 — The Lens`). **En-dashes (U+2013) are allowed everywhere** for numeric and date ranges; do not auto-repair them.
9. **`draft: true` from creation through ship; Vic flips to `draft: false` explicitly.** The skill never auto-flips.
10. **Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.**
11. **The blog is interconnected; newer posts link to older relevant posts.** Phase 2 scans and records anchor points; Phase 4 weaves links and adds References entries. Older posts are NOT retroactively edited.
