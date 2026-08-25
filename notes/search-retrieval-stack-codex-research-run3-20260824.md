HALT. Four structural issues remain.

1. STRUCTURAL — Thesis v3 is false under its strong reading and unfalsifiable under its weak reading

The thesis says replacement waits until a successor reimplements exact match, freshness, filtering, editability, and cost. The evidence establishes nothing that broad.

OneRetrieval establishes one narrow causal claim: in Kuaishou out-of-mall search, the inverted-index branch persisted because of same-day operational editability. It does not establish that all five properties generally gate replacement.

Worse, the same team’s earlier OneSearch paper reports:

- 100% of detail-page-search traffic
- 50% of mall-search traffic
- 20% of homepage-search traffic

Yet OneRetrieval explicitly classifies OneSearch as a non-editable closed-codebook system. That contradicts “replacement waits for editability” across search. If the thesis retreats to “replacement waits for whichever operational property mattered in that deployment,” it becomes retrospective and compatible with every outcome: any successful replacement can be credited afterward with solving cost, quality, operability, or some newly named property. [OneSearch reports the traffic shares in its body](https://arxiv.org/html/2509.03236v5); [OneRetrieval classifies OneSearch as non-editable](https://arxiv.org/html/2606.13533v2).

A falsifiable version must predeclare:

- one search surface;
- one incumbent capability and measurable threshold;
- what counts as replacement;
- the predicted traffic ceiling before that capability is met.

Example: “In Kuaishou out-of-mall search, a retriever without same-day deterministic term intervention will not replace the lexical branch above X% traffic.” It would be falsified by a non-editable retriever taking more than X% for a declared period while satisfying the intervention SLA without a lexical fallback.

The defensible thesis is narrower: benchmark relevance does not determine deployment; operational capabilities can gate replacement, and OneRetrieval is a direct case where editability did. Treat OneSearch as a counterexample showing that the gate depends on the surface.

2. STRUCTURAL — C44 is inflated while C45 omits the strongest counterevidence

C44’s quote is verbatim, but the claim “that replacement shipped … then extended to nearly the entire retrieval stage” overstates the result.

The body says:

- the first configuration was an 11-day A/B test on about 8.2% absolute traffic;
- the second configuration, at the same traffic share, replaced the inverted-index and dense branches;
- the collaborative branch remained;
- “nearly all” is the authors’ architectural characterization, not evidence of a platform-wide rollout.

The generic statement that OneRetrieval is deployed and serves hundreds of millions of PVs does not establish that the nearly-all replacement configuration serves all those PVs. [The experiment scope is explicit in §4.6](https://arxiv.org/html/2606.13533v2).

Meanwhile C45 omits OneSearch’s full/50%/20% traffic shares even though they appear twice in the paper. This is precisely asymmetric inclusion: the thesis-friendly experiment is presented as shipped replacement, while the anti-thesis deployment’s strongest replacement evidence is excluded.

Required repair:

- Rewrite C44 as an A/B result, including 8.2% absolute traffic, duration, and the two branches replaced.
- Add OneSearch’s full/50%/20% deployment figures to C45 or a new row.
- Stop calling OneRetrieval the first actual replacement without defining whether “replacement” means an experiment bucket, one complete search surface, or platform-wide traffic.

C43’s quote itself is accurate, but the Spec misreads what was preserved. OneRetrieval explicitly says editability resides in the upstream dictionary and incremental refresh, “not in the index structure.” The team recreated the incumbent branch’s operational editing path, not a property intrinsic to inverted indexing. That distinction directly serves the title and must survive into the thesis.

Also, OneRetrieval did not reach parity on intervention effectiveness: its reported activation rate was 0.553 versus 0.761 for the inverted index. Say it recovered the capability and most of the measured activation, not that it reproduced the property without qualification.

C46 is accurate against the current v2 abstract, including +2.07% buyer volume. [OneSearch-V2 v2](https://arxiv.org/abs/2603.24422).

3. STRUCTURAL — T2’s “own reasoning” label hides a source mismatch

The conclusion is valid, but its two cited excerpts do not establish it:

- EBR says each model should be optimized for the preceding distribution.
- Airbnb says logged reranking could not evaluate the whole inventory.

Neither says that an item dropped upstream is unavailable downstream. Calling that “the post’s own reasoning” does not repair a load-bearing row whose sources are merely adjacent.

There is no reason to derive it. OneSearch states the proposition directly: downstream ranking cannot present an intended item filtered out earlier. [OneSearch §1](https://arxiv.org/html/2509.03236v5).

Replace T2’s evidence with that current, direct, in-scope source. The claim is an architectural invariant, not a speculative causal explanation.

4. STRUCTURAL — The recency audit still has loopholes

“Historical empirical result” is legitimate only when the claim is explicitly a dated record of that experiment. Rows such as L2, V2, and C21 can use it if the prose names the year/system and draws no current-practice inference.

The scheme is nevertheless still broken:

- The Spec says every row occupies exactly one of three buckets, but the matrix uses four. The enforcement contract and the actual classifications disagree.
- T1, V31, and V32 call a five-page tutorial “method-defining.” It did not define filtered vector search or post-filtering. That label is exemption laundering.
- T1 makes a present production-requirement claim from an August 2025 source outside the 12-month cutoff, while its excerpt says only that e-commerce search “may allow” brand or price filtering. “First-class requirement of production vector search” is stronger than the quotation. [Official PVLDB paper](https://www.vldb.org/pvldb/vol18/p5488-caminal.pdf).
- Several empirical findings remain incorrectly marked `foundational-locked`: L17, V4, R10, and M3–M5. These concern particular evaluated variants, retrievers, fusion experiments, and model cohorts. They are historical results, not field-locked definitions. Date them in prose or replace them with current evidence.

T1 therefore fails both support and recency. A defensible row would say that the August 2025 tutorial treats price-range filtering as a motivating e-commerce example. A current “first-class production requirement” claim needs a current first-party system or paper.

Judgement calls

- (a) Right. At M=16, 37.77 average connection-ID slots and about 151.1 bytes are arithmetically correct. “Connection-ID capacity,” not total vector memory, is honest. The separately sourced Qdrant ~21 figure must remain scoped to realized layer-0 degree on that one benchmark.
- (b) Right. The percolation demotion is necessary. ACORN’s guarded expected-degree and disconnection analyses are the load-bearing evidence; they are not general HNSW connectivity theorems.
- (c) Dropping Furnas would have been wrong. Reinstatement through the primary Bellcore typescript scan is legitimate.
- (d) Reasonable. The candidate posts share terminology, not the search-retrieval concept.
- (e) The negative was false. Pailitao-VL is the counterexample, and removing the negative was required.

The new issue not previously challenged is the C44/C45 traffic asymmetry. It changes the thesis, not merely the wording.