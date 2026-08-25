# The Index Is Not the System

## Spec

**What / who / walk-away.** A long-form explainer on how search actually works, told as the history of the index and the system that grew on top of it. The argument: every generation of search index was announced as a replacement for the last one, and not one of them replaced anything. What happened instead is *absorption* — each new capability became one more candidate source, or one more feature inside a ranker, running on machinery inherited from the previous era. The reader is a backend / platform / ML-infra engineer who has already shipped a RAG or site-search system, has an `alpha` knob they don't understand, and is debugging why relevance is mediocre. They walk away able to name every stage of a real retrieval stack, say what each one costs in latency and memory, predict which stage is responsible for a given relevance failure, and defend a default architecture in a design review with published numbers.

**Topic-evolution classification: actively-evolving. 12-month recency bar.** Foundational papers (BM25/Robertson, LSH, PQ, HNSW, CLIP, ColBERT, DPR) are locked by field status and exempt. Every claim about *current practice* — production stacks, 2026 benchmark standings, what displaced what — needs a source inside 12 months of publication.

**Length:** ~24,000 words, ~55-minute read. Comparable to `ssl-pretraining-recipes` (22.8k words, 13 figures).

**Figure mix:** 13 figures. 11 `static-svg`, 2 `interactive-canvas`. The two interactive figures clear the override rule under clause 1 (continuous parameter sweep the reader cannot simulate mentally):
- BM25 `k1` / `b` saturation and length-normalization sweep.
- Filter-selectivity percolation: watch the filtered subgraph fragment as `s` falls.

**Title sketch:** *The Index Is Not the System*.

**Tags:** `["Tech", "AI", "ML"]`.

**Flagged for Phase 2 to resolve:**
- The seed article's "M=16 gives ~21 links per node" is NOT a paper claim. The HNSW paper gives `Mmax0 = 2M` (32 at layer 0) and an average-memory formula `(Mmax0 + mL*Mmax) * bytes_per_link` = ~38 link slots ≈ 151 bytes/vector at M=16, validated against the paper's own stated "about 60-450 bytes per object" range. Either source ~21 to a measurement of *realized* degree (hnswlib instrumentation) and label it as such, or rebuild the percolation line on the paper's numbers. The allocated-vs-realized gap is itself the more interesting sentence.
- The VLDB'25 filtered-vector-search paper is a 5-page **tutorial**, not a survey, and contains no benchmark numbers. Cite for taxonomy only.
- RACORN-1 (arXiv:2607.00768) is real but is a July 2026 preprint with no visible peer review. Attribute its numbers ("the authors report"), never assert them.
- Cascade Ranking for Operational E-commerce Search (KDD 2017) is **Liu et al.**, not Wang et al. Wang et al. SIGIR 2011 is a different paper.
- MARGINAL rows to upgrade or hedge in Phase 2: Kamphuis et al. "Which BM25 Do You Mean?" (quote unverified); PLAID 7x/45x numbers (snippet only); Pailitao-VL 20% GMV (snippet only); LCRON online A/B (snippet only); BEQUE numeric lift (not on abs page); arXiv:2604.01733 BM25-vs-text-embedding-3-large (venue unknown).
- No first-party web-scale LLM-reranker latency SLA was found. Write the L3 box as an open question rather than claiming a number.

## Throughline

**One query, walked down the whole stack:**

> `waterproof hiking boots wide toe box under $150`

Composite throughline. The query is synthetic; every number attached to every rung cites a public source. The query is chosen because it carries a paraphrase trap (`wide toe box` / "roomy forefoot"), an exact-match trap (brand and SKU), and a structured predicate (`under $150`) that is not a text-matching problem at all — which is what forces filtering and multi-field ranking to be load-bearing rather than a digression.

Per-act rhythm — each act opens by naming what the query can now do, and closes by naming what it still can't:

| act | the query gains | the query still can't |
|---|---|---|
| 1. The only question | nothing yet; the scan is the enemy | be answered without touching all N docs |
| 2. The lexical machine | fast term match over 10^8 docs | match "roomy forefoot"; `under $150` is not a query |
| 3. The vector turn | catches the paraphrase | keep exact SKUs; survive out-of-domain; keep recall once filtered |
| 4. The reconvergence | semantics inside the inverted index; both signals fused | escape the cost of query expansion; know how to weight the fusion |
| 5. Searching with a picture | be a photo instead of words | bind attributes and order ("black strap on red bag") |
| 6. The cascade | finally, an *order* | be trusted from offline metrics alone |

Callback discipline: when the throughline changes inside an act, name the change in prose. Don't make the reader infer it from a figure.

## Resume here

Last touched: 2026-08-24.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | pending | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/search-retrieval-stack/index.mdx` |
| 5. Implement figures | 0 of 13 | per-figure table below |
| 6. Playwright review | 0 of 13 | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|

### Suggested next batch

1. Phase 2: dispatch parallel subagents to build `## Research notes` grouped by the six acts, converting the Phase-1 sweep output into quoted excerpts with dates.
2. Phase 2: close every MARGINAL row flagged in `## Spec` (upgrade, hedge, Vic-accept, or drop). Gate 0 halts on unclosed marginal debt.
3. Phase 2: run the augusteo.com related-posts scan; candidates are thin (nearest are `omni-modal-stack` and `unified-vision-stack`, both on in-context retrieval rather than search retrieval) so an empty section is an acceptable outcome.
4. Phase 2: build `## Claim-source matrix`. Expect 60-90 rows at this length.
5. Gate 0.

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
