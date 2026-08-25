HALT. Eight structural findings remain. Drafting should not begin.

1. STRUCTURAL — Section 22 rests on a false negative claim

P9 is false. “No primary source measures parser or layout-extraction quality as an isolated variable in retrieval effectiveness” is contradicted by current primary work:

- ACL 2026 evaluates multiple OCR models inside a controlled OCR-first RAG pipeline and measures retrieval failures caused by extraction errors. [Sun et al., ACL Industry 2026](https://aclanthology.org/2026.acl-industry.60/)
- arXiv:2604.12047 explicitly “systematically examine[s] multiple PDF parsers and chunking strategies” for downstream QA. [El Bachyr et al., 2026](https://arxiv.org/abs/2604.12047)
- SCAN reports end-to-end retrieval effects from a layout-analysis intervention. [Ueda et al., EACL Findings 2026](https://aclanthology.org/2026.findings-eacl.82/)

The broader paragraph is also argument from ignorance. There are no matrix rows supporting the claimed absence of controlled evidence for 512-token chunks, top-k=5, MMR, or the full list as a class. R8 even records a pilot investigation of `k=60`; adding “in a RAG pipeline” does not turn that into evidence of universal absence.

P4 supports only: no measurable overlap benefit on Natural Questions using SPLADE, Mistral-8B, and no reranker. It does not falsify overlap generally. P6 is similarly bounded to the tested retrievers and BRIGHT tasks.

The “hierarchical pipelines lose at matched token budgets” claim does have a source, but no matrix row: Laitenberger et al. compare RAPTOR and ReadAgent against simpler baselines under matched budgets. [EMNLP 2025](https://aclanthology.org/2025.emnlp-main.1656/)

Cut Section 22’s universal absence framing. Replace it with “what controlled studies have actually tested,” with explicit scope per result.

2. STRUCTURAL — The four-question spine is still a label on a catalog

Three-section spot check:

- Section 4, rows L8–L21: explains BM25 and implementation defaults. It supplies no incumbent capability omitted by benchmarks, no preservation decision, and no production replacement outcome.
- Section 12, rows R8–R10 and P2: compares fusion methods. It does not identify an unmeasured operational property or show what happened in production.
- Section 18, rows C12–C15: explains factorization and cross-feature loss across advertising and recommendation examples. It does not establish that the challenger preserved the incumbent’s latency/serving property on a search surface.

Zero of the three fully answers the four questions. Section 16 comes closest, but one successful section does not establish a spine.

Worse, the Act 2 ledger attributes “cheap structured filtering, real-time updates, operator intervention” to the lexical incumbent. C43 explicitly says editability lived in upstream resources, not the index. The outline is rebuilding the exact wrong mental model the thesis claims to correct.

Either add explicit four-answer ledgers with row IDs and surface labels to every act, or stop claiming every act answers those questions. Acts 2–4 remain primarily a technology history; the operational argument begins in Section 17.

3. STRUCTURAL — Multiple outline and figure claims still have no matrix row

| Location | Unsupported or overstated claim |
|---|---|
| Section 2 | What recall and nDCG measure and “where they diverge.” E1–E4 concern assessors, not definitions or divergence of the metrics. |
| Section 8 / Figure 6 | IVF as a historical rung and the specific “wrong assumption” it fixed. V30 describes one present centroid-based deployment; it is not an IVF method/history row. |
| Section 10 | “The rollback to centroids nobody frames as a rollback.” The prevalence claim “nobody” has no row. |
| Act 3 practice | “Truncation to 256 dimensions is close to free and does not require Matryoshka training.” V26 does not support this. M16 merely reports a 256-dimensional deployment. |
| Act 3 practice | “Quantization choice is bounded by metric geometry.” V9 supports a narrower MIPS result, not this general recommendation. |
| Section 12 | “Two [shipped systems] have already migrated away from RRF.” No row identifies either migration. |
| Section 13 | Reranking has a ceiling and can be net-negative over a strong dense first stage. No row supports this. P7 is about reasoning augmentation for bi-encoders, not reranking. P2 reports a large positive reranking result in its narrow benchmark. |
| Act 4 practice | Hybrid as “variance reduction across corpora rather than a large average gain.” No cross-corpus row establishes that characterization. |
| Section 15 | ColPali as a “genuine replacement” of an ingestion pipeline. M8–M9 establish an evaluated architecture and benchmark result, not production replacement. |
| Section 20 | Human assessors being the unreliable party. The notes explicitly mark this source unverified and pending. |
| Figure 8 | “Recall collapses while latency stays flat.” The rows support scoped recall failures, not a general flat-latency relationship. |
| Figure 12 | “The per-candidate budget is microseconds, which is the constraint L1 was designed around.” C11 expressly forbids treating the amortized quotient as an executable per-candidate budget; no row supplies the causal L1-design clause. |

P2 also overstates its source by calling α=0.5 “untuned.” The paper varies α and reports 0.5 as optimal on that benchmark; that is an ablation result, not evidence that equal weighting was never selected against the evaluation set. [arXiv:2604.01733](https://arxiv.org/html/2604.01733v1)

D1 is sound. E2 and E3 are correctly separate: E2 subsets the original systems; E3 applies the judge as a reranker to every run in a hypothetical circularity experiment. Do not narrate them as one naturally observed degradation curve. [Clarke and Dietz](https://arxiv.org/html/2412.17156v3)

4. STRUCTURAL — The throughline is load-bearing for mechanics, but decorative for the thesis

Act-by-act:

- Act 1: carries it.
- Act 2: carries it incompletely. The “specific model name and code” still has no actual model name or code.
- Act 3: carries it through paraphrase, exact match, and filtering, although Figure 5 cannot show unsupported numerical “scores.”
- Act 4: the separate discipline note promises both query forms, but Sections 11–13 do not say where either appears.
- Act 5: the price-predicate point is useful, but the photo is unspecified. What is photographed, and which textual constraints does it replace?
- Act 6: the note promises that the query runs through the funnel, but Section 17 does not enumerate its candidates, filter, L1 features, or stage losses.
- Act 7: Section 21 vaguely “resolves” it; Sections 22–23 drop it.

The illustrative status is not the problem. A worked example can carry intuition without pretending to be measured. The problem is that the query explains component mechanics while Kuaishou carries the replacement thesis. Those are two different argumentative jobs. State that explicitly instead of pretending the query evidences the production thesis.

Lock the second query form and the photo now, then put the exact callback into each relevant section bullet.

5. STRUCTURAL — Eight of 23 sections still fail the deletion test

Pass: 1, 3, 4, 6–8, 11–12, 14, 16–20, 23.

Fail:

- Section 2: Section 3 lands without it. Fold the short primer into Section 1 or introduce each metric at first use.
- Section 5: Section 6 needs term matching, not dynamic pruning. Strengthen “pruning fixed cost but could not fix meaning,” or fold pruning closer to Section 3/4.
- Section 9: Section 10 is independent. Reordering the storage section before filtered search would produce a stronger chain.
- Section 10: Section 11 does not depend on physical residence. Current act boundary is a reset.
- Section 13: multimodal retrieval can begin without the interaction-axis section. Add the missing handoff: every mechanism so far still assumes the query and candidate are text.
- Section 15: unified production embeddings do not depend on the ColPali case. Make Section 15 the scoped pipeline-substitution case and Section 16 the contrasting “usually absorbed as a feature” case, or merge 15 into 14.
- Section 21: Section 22 lands without the recommendation.
- Section 22: Section 23 lands better without it.

That is down from twelve to eight, but the final two failures damage the climax most.

6. STRUCTURAL — Act 7 spends its space on the wrong section

Section 23 is being asked to carry both Kuaishou deployments, traffic scope, intervention capability, the 0.553/0.761 result, operational attribution, and thesis synthesis in one section. Section 22 then spends an entire section on weak or false literature-absence claims.

Cut or absorb Section 22. Use the recovered slot for:

- Section 22: OneRetrieval and the surface where editability mattered.
- Section 23: OneSearch and the surface where it did not, followed by the direct comparison.

That gives the thesis two full production cases instead of one compressed closer.

7. STRUCTURAL — Act 3 is still over-weighted in figures and still contains a catalog

Four of 23 sections is defensible. Five of 13 figures and the contents of Section 8 are not.

Section 8 jumps through trees, LSH, IVF, PQ, ScaNN, HNSW anatomy, degree accounting, neighbour pruning, hierarchy criticism, and flat graphs. Section 9 only requires the HNSW graph and its degree/connectivity model. The LSH–IVF–PQ–ScaNN ladder is still model-family catalog material.

Cut Figure 6 and the broad ladder. Keep the high-dimensional failure, HNSW mechanism, and flat-graph qualification. Move PQ and current quantization into Section 10, where they are operationally relevant.

8. STRUCTURAL — The figure handoff is internally inconsistent and Act 5 lost its mechanism figure

The locked figure table calls Figure 11 `LearnedPostings`. The Phase 5 tracker calls Figure 11 `SharedSpaceBlindSpot`. Those are different figures, and Act 5 now has no figure at all.

The likely repair is clean:

- Cut Figure 6 `AnnLadder`.
- Keep `LearnedPostings`.
- Restore a static `SharedSpaceBlindSpot` figure in Act 5 using the freed slot.

Other figure findings:

- Figure 2 now works as a single job; splitting the forward reference was correct.
- Figure 5 must show qualitative match structure, not invented lexical/dense scores.
- Figure 9 must say object storage can change the index family, not imply every storage-tier move does.
- Figures 3 and 8 are correctly static. Three small multiples carry their mechanisms.
- No static figure needs to become interactive.

There are no TYPE-CHANGE STRUCTURAL findings.

The coda now concludes rather than introduces. Its problem is upstream: Section 23 has not been given enough space, and Section 22 currently poisons the approach to it.