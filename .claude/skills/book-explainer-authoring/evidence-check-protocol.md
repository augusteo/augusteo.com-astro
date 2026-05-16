# Evidence-check protocol

For each claim in the matrix, the skill runs a current-state-of-evidence check. This file is the protocol: which databases to consult, how to weight evidence types, what recency bar applies, and how to classify the result.

The protocol runs in Phase 2, per claim. Output goes to the `## Claim matrix` `Current state` column and the post's part 7 ("What the evidence says today").

## The decision tree

For each claim from the Phase 1 candidate list:

```
1. Identify the book's own cited source. (From endnotes / footnotes / inline citations.)
   - If the book cites a specific paper/study → use that as the seed.
   - If the book cites a general literature → seed with the most-cited paper in that literature.
   - If the book makes no citation → seed with the claim's plain English.

2. Search for the seed in primary databases (see "Databases" below).
   For empirical claims, prefer:
     - meta-analyses and systematic reviews (highest weight)
     - large-N replication studies
     - pre-registered direct replications
     - original RCTs (the book's seed)
     - observational studies
     - expert-blog analyses
   For conceptual / historical / moral claims, see "Claim-type-specific rules" below.

3. Apply the recency bar (see "Recency bars" below) and exclude sources older than the bar
   UNLESS they are the book's own seed citation or a foundational source the field still
   cites.

4. Classify the current state (see "Classification" below).

5. Capture in the matrix row + the part-7 prose. Inline-link every cited source.
```

The protocol is followed per claim, not per chapter. Some claims need 1 search; some need 5. The Phase 2 time budget is generous; do not skimp.

## Databases (in priority order)

The agent uses WebSearch and WebFetch tools to query these. None require special access for the URL-level work, though paywalled papers may need the agent to summarize from the abstract.

### Tier 1 (primary)

- **PubMed** (`https://pubmed.ncbi.nlm.nih.gov/`) — biomedical, psychology, health.
- **Google Scholar** (`https://scholar.google.com/`) — broad coverage. Use citation count + recency.
- **Semantic Scholar** (`https://www.semanticscholar.org/`) — better filtering for ML / CS / interdisciplinary.
- **arXiv** (`https://arxiv.org/`) — physics, math, CS, increasing ML / behavioral econ.
- **bioRxiv** / **psyarxiv** / **socarxiv** — preprints in their respective fields. Note: not peer-reviewed.

### Tier 2 (replication-specific)

- **Retraction Watch** (`https://retractionwatch.com/`) — retraction tracker. **Always search this** for the book's seed citations. A retracted study cited as current consensus is the canonical Gate B finding.
- **Data Colada** (`https://datacolada.org/`) — Uri Simonsohn, Joe Simmons, Leif Nelson. Statistics-focused replication critiques in social science.
- **Reproducibility Project: Psychology** — the canonical large-N replication project. See OSF for the dataset.
- **Many Labs** projects — coordinated multi-site replication studies.
- **Cochrane Reviews** — systematic reviews in health / medicine.

### Tier 3 (interpretive)

- **Andrew Gelman's blog** (`statmodeling.stat.columbia.edu`) — for statistics-heavy critiques.
- **Stuart Ritchie's writing** — for psychology replication critiques.
- **Slate Star Codex / Astral Codex Ten** — for behavioral science book reviews. (Note: opinionated; cite for argument, not as a primary source.)
- **The Atlantic / NYRB / LRB / Substack long-form** — for cultural / contextual critique. (Cite as critic in part 8, not as evidence in part 7.)

Tier 3 sources go in part 8 (Credible critics), not part 7 (Today's evidence). Part 7 is about scientific accountability; part 8 is about credible disagreement. Keep them separate.

## Recency bars

| Claim type | Field state | Recency bar | Rationale |
|---|---|---|---|
| `empirical`, well-studied / replication-relevant | actively-evolving | 5 years | Replication landscape changes fast |
| `empirical`, established / classical | stable | 10 years | Older meta-analyses still authoritative |
| `empirical`, niche / underseached | unsettled | use any quality source | Field may have moved little |
| `conceptual` | (any) | 10 years | Frameworks change slowly; cite original + recent commentary |
| `historical` | (any) | no bar, prefer scholarship | Primary sources don't expire |
| `practical` | (any) | 5 years for outcome data | Best practices shift |
| `moral` | (any) | no bar | Arguments don't replicate; weigh on internal merit |
| `autobiographical` | (any) | n/a | Don't fact-check lived experience |

For replication-crisis casualties (the marshmallow test, power posing, ego depletion, etc.), there is no recency bar — the failure-to-replicate is canonical and the post must flag it regardless of when the failed replication was published.

## Classification

After the search, classify the claim's current state:

### `replicated`

Multiple independent direct replications confirm the original effect. Meta-analyses show a robust effect size. The book's claim survives unaltered.

Example: "Sleep deprivation impairs cognitive performance" — replicated robustly.

### `refined`

The effect holds, but with adjustments: smaller effect size, narrower scope, different moderators. The book's framing is broadly correct but oversells.

Example: "Mindfulness reduces stress" — holds, but smaller effect than popular accounts suggest, and the effect depends on practice intensity + dosage.

### `weakened`

Failed direct replications exist; meta-analyses show small or borderline effects; the original effect may be partly due to publication bias.

Example: "Implicit bias tests predict discriminatory behavior" — weakened; tests have low test-retest reliability and predictive validity is contested.

### `disputed`

Field is genuinely mixed. Credible studies in both directions. No clear consensus.

Example: "The minimum wage causes (or doesn't cause) unemployment" — disputed; depends heavily on study design and context.

### `disproven`

The effect did not survive direct replication; the original study has been retracted; the field has substantially moved on from the original claim.

Examples:
- "Power posing changes hormones" — disproven; original effect failed to replicate in pre-registered studies. Original author Dana Carney has publicly disavowed.
- "Ego depletion limits self-control across the day" — disproven; large pre-registered Many Labs failure.
- The Stanford Prison Experiment as evidence about human nature — disputed at minimum, with substantial methodological critiques.

### `unsettled`

Original studies stand alone; no replication attempts; the question is open.

Example: a niche behavioral econ finding from 2018 that hasn't drawn replication interest.

### `no-update-found`

After a budgeted search (15-20 minutes per claim), the agent finds no newer evidence one way or the other. Treat the original as the state. This is NOT a default — it's a tracked outcome; if a Phase 2 sweep classifies > 30% of claims as `no-update-found`, halt and flag to Vic.

## Evidence-type integrity rules

These rules prevent the most common protocol failures:

1. **A single blog post is not "the field disagrees".** If the only critique is one expert blog, the current state is `unsettled` or `refined`, not `disputed`. `disputed` requires multiple credible studies in tension.

2. **A failed replication doesn't disprove unless it's a direct replication.** Conceptual replications can fail for reasons unrelated to the original effect. Read the replication's methodology before classifying.

3. **Pre-registered replication > non-pre-registered.** Weight pre-registered direct replications heavily; weight underpowered conceptual replications less.

4. **Meta-analyses > single studies.** A 2024 meta-analysis covering 40 studies outweighs the 1977 original. Always check for meta-analyses first.

5. **Publication bias is real.** If the original effect was striking and only one or two follow-ups exist, suspect publication bias. Classify as `unsettled` or `weakened` accordingly.

6. **Don't confuse "doesn't generalize" with "doesn't exist".** Many findings hold in their original context but don't generalize broadly. Use `refined` for those, not `disproven`.

7. **Don't treat one country / WEIRD-sample study as the whole story.** If the original was a 30-undergrad study at a US university, the existence of replications in other contexts is itself a meaningful update.

## Search depth budget

Per claim:

- **Tier 1 (empirical, core, replication-relevant):** up to 30 minutes search budget.
- **Tier 1 (empirical, supporting):** up to 15 minutes.
- **Tier 2 (conceptual, historical):** up to 10 minutes.
- **Tier 3 (practical, moral, autobiographical):** up to 5 minutes (just confirm there's no obvious contrary evidence).

A claim's Phase 2 budget is the centrality (core / supporting / illustrative) crossed with claim type. Empirical-core gets the most time. Don't sandbag.

## What goes in the claim matrix

Per claim row:

| Column | Source |
|---|---|
| Claim | Phase 1 candidate list |
| Type | `claim-spine.md`'s "Claim type" |
| Centrality | Phase 1 |
| Book locator | Phase 1 (ledger anchor) |
| Source quality | Phase 1 ledger entry's `source_quality` field, set per book-cited evidence |
| Current state | This file's classification |
| Critics | `critic-finding-protocol.md` |
| Anchor verified | Phase 2 grep-verifies the ledger anchor against the source file: `yes` (matched), `pending` (not checked yet), `failed` (anchor doesn't match — STRUCTURAL for Gate B) |

The matrix becomes the prose in part 7 (current state) + part 8 (critics) of the section template.

## When the book is too old

For older books (10+ years), the recency bar is more lax in one direction (the original literature is older) but stricter in another (more time for replication critiques to land). Treat older books as a special case:

- The book's seed citations are no longer "current evidence" — they are historical context. Cite them, but reach for newer evidence on the same question.
- If a claim from a 2005 book holds up unchanged in 2026, that is itself an interesting fact — say so explicitly: "Twenty years on, the [Cohen 2003] finding has been replicated in [Smith 2019] and a 2022 meta-analysis."
- Don't penalize an old book for being old. Penalize an old book whose claims have been refuted but the book hasn't been retracted (this is a real phenomenon in pop-science).

## When the protocol fails

- **No primary source can be found for the book's claim**: classify `no-update-found` and flag in part 5 ("the book asserts this without citation; no clear primary source found in search").
- **Search returns conflicting meta-analyses**: classify `disputed`, surface both meta-analyses, say what each found.
- **The book's seed citation has been retracted**: classify `disproven`. Flag the retraction prominently in part 7. This is the highest-stakes finding; do not bury it.
