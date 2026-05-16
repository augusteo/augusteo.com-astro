# Codex gate prompts (book-explainer-authoring)

Exact prompts for the four codex gates in the book-explainer-authoring pipeline. All gates invoke the project-local `codex` skill in consult mode.

**Runner mechanics** (build-prompt → invoke-codex → size-policy → Codex history row → parse findings → 3-rerun cap → Step-6a override safeguard → proof-of-fire) live in `../../explainer-shared/codex-runner.md`. This file is just the per-gate inputs.

Per-gate inputs at a glance:

| Gate | When | Inputs embedded | Gate label | `<gate-key>` | Notes section |
|---|---|---|---|---|---|
| A | end of Phase 1 | Spec + Chapter summaries + Candidate claim list + Boundary conditions + ledger preview (book metadata entry + ALL chapter entries + stratified sample of claim entries from beginning/middle/end of book) | `A (ingestion)` | `ingestion` | `## Codex ingestion audit` |
| B | end of Phase 2 | above + Claim matrix + Critics + book-source ledger | `B (matrix)` | `matrix` | `## Codex matrix review` |
| C | end of Phase 3 | above + Outline + figure table | `C (spine)` | `spine` | `## Codex spine review` |
| D | Phase 7, after freshness pass | above + full MDX + ledger-integrity report + freshness diff | `D (final)` | `final` | `## Codex final review` |

Skill-specific finding subtypes the runner forks to:

- **Gate A**: `LOW-CONFIDENCE INGESTION` → halt and surface a ledger preview to Vic. This is the only Gate A subtype that surfaces mid-run.
- **Gate C**: `ANTI-CLEANUP STRUCTURAL` → drop or simplify the offending figure. Re-runs against the cap.
- **Gate D**: `LEDGER-INTEGRITY STRUCTURAL` → **declared non-overridable** per the shared runner's Step-6 hook (see `../../explainer-shared/codex-runner.md` "Skill-declared non-overridable finding subtypes"). On a 4th-invocation halt with `LEDGER-INTEGRITY STRUCTURAL` findings, the Step-6 AskUserQuestion excludes "accept-and-proceed" and "override-on-specific-finding" for those findings. Vic's only path forward is to fix the broken `[L#]` markers (the post halts until fixed) — broken book anchors cannot be overridden because the post's faithfulness claim collapses without them.

The Goal statement is quoted into every gate prompt:

> Take a book and produce a published-ready MDX post on augusteo.com that **faithfully represents the book's argument in book order**, with every claim, quote, and paraphrase traceable to a chapter/section anchor in the book-source ledger; and that **holds the book scientifically accountable** by tracking the current state of evidence for each cited research claim and surfacing credible tiered critics. **Faithfulness to the source is the first bar; current-state-of-evidence accuracy is the second; credible critic surfacing is the third; visual polish is the fourth.**

---

## Gate A: ingestion audit

**When to run:** end of Phase 1, after ledger initialization + chapter summaries + candidate claim list are written.

**What you provide to codex:**

- `## Spec` (title, author, edition, source format, detected genre, one-paragraph thesis).
- `## Chapter summaries` (2–4 paragraphs per chapter).
- `## Candidate claim list` (5–12 major claims with chapter anchors).
- `## Boundary conditions` (what the book explicitly does NOT claim, from Phase 1 reading).
- **Ledger preview**: book metadata entry (id 0); ALL chapter entries (one per chapter, regardless of book length); a **stratified sample** of claim entries — at least one claim from the first third, middle third, and last third of the book. For books with 5–7 chapters, include all claims; for longer books, sample 3 claims per third (9 minimum). Anchor excerpts are included on every sampled claim. Sampling-only-the-first-20-entries is explicitly insufficient for long books because the first 20 may consist of metadata + early chapters only, hiding bad late-chapter ingestion.

**The prompt:**

```
You are reviewing the ingestion output for a long-form book-explainer blog post on
augusteo.com. The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the ingestion layer before any fact-checking or drafting
happens. If the ingestion is wrong — if the claim extraction missed the book's
central arguments, or the chapter coverage is uneven, or the anchor excerpts
don't actually appear in the book — then every later phase builds on a wrong
foundation.

Find:

1. CHAPTER COVERAGE GAPS. The ledger preview should have chapter entries for
   every chapter in the book. If the book has 12 chapters but the ledger has 7,
   flag the gap. If a chapter has no candidate claims extracted from it, flag
   that too (some chapters are summary chapters and may legitimately have no
   load-bearing claims; the agent should note which case applies).

2. AUTHOR-EMPHASIS PRESERVATION. Read the spec's one-paragraph thesis. Read the
   chapter summaries. Read the candidate claim list. Does the candidate claim
   list preserve what the author treats as load-bearing? Or does the list
   over-represent peripheral / anecdotal claims while missing the core
   argument? Flag any major book-thesis claim that has no corresponding
   candidate.

3. CANDIDATE CLAIM TYPE BALANCE. The candidate list should reflect the kinds
   of claims the book actually makes. A book that argues mostly empirical
   claims (cited studies) shouldn't have a candidate list dominated by
   anecdotes; a book that's mostly conceptual shouldn't have a list of
   pseudo-empirical claims with no book-cited sources. Flag mismatch.

4. OMITTED COUNTERCLAIMS. The book itself may name counterclaims it argues
   against. The candidate list should include these as boundary conditions
   in the boundary-conditions section. Flag any place the book explicitly
   counterargues but the candidate list / boundary section silently drops the
   counterargument.

5. SAMPLED ANCHOR VERIFICATION. For each sample claim entry in the ledger
   preview, the entry has an `anchor_excerpt` that should be a verbatim
   fragment from the book. Are the anchors specific enough to grep-verify?
   (An anchor like "The book says calibration is important" is too generic;
   "Studies of weather forecasters find that with focused feedback..." is
   verifiable.) Flag generic / vague anchors.

6. EDITION + METADATA. The ledger's id=0 entry must have title, author,
   edition (or "Edition unknown" + a flag), ISBN, year, publisher. Flag any
   missing required field.

7. OCR CONFIDENCE FLAGS (PDF inputs only). If the ingestion was PDF + OCR,
   the candidate list should have excluded entries from low-confidence pages
   (< 0.85). Flag any candidate entry whose ledger row has ocr_confidence
   below threshold.

8. CANDIDATE COUNT SANITY. The candidate list should be 5–12 entries. Outside
   that range is a flag: too few = the book is thin and a long-form post may
   not be warranted; too many = candidate splitting that should be merged.

For each finding, label it STRUCTURAL (must fix before Phase 2) or COSMETIC.
For the most severe ingestion failures, additionally label as
LOW-CONFIDENCE INGESTION — this triggers the skill's halt-and-surface fork.

LOW-CONFIDENCE INGESTION specifically: use this label when (a) chapter coverage
is < 80%, (b) anchor verification fails for > 20% of sampled entries, (c)
candidate count is outside 3–20, or (d) major book-thesis claims are missing
from the candidate list. These are the cases where the ingestion is too
unreliable to proceed silently.

Do not be diplomatic. Do not validate. If the ingestion is sound, say "no
structural issues found" and stop. Otherwise, keep finding things.
```

**Halt rule:** any `LOW-CONFIDENCE INGESTION` finding triggers a mid-run surface. The runner halts, writes `notes/<book-slug>.ingestion-preview.md` (ledger excerpt + Codex findings + ranked fix list), and prompts Vic. Other STRUCTURAL findings run through the runner's normal Step-5 fix loop.

**What goes in the surface file** (when low-confidence fires):

```markdown
# Ingestion preview — <book title>

## Codex findings

[verbatim codex output]

## Ledger excerpt

[first 20 entries from ledger.jsonl, pretty-printed]

## Suggested fixes

[ranked list — agent's recommendation, e.g.:
 1. Re-extract chapters 4 and 7 (no candidate claims found there)
 2. Verify anchor excerpts for claims #3, #5, #11 (failed grep verification)
 3. Add boundary condition for the [specific framing] the book disclaims]
```

---

## Gate B: matrix truthfulness + faithfulness pass

**When to run:** end of Phase 2, before Phase 3 outline drafting.

**What you provide to codex:**

- All Gate A inputs PLUS
- `## Claim matrix` (full, with all 8 columns: Claim / Type / Centrality / Book locator / Source quality / Current state / Critics / Anchor verified)
- `## Critics` section (tiered critic list per claim)
- Full book-source ledger (`notes/<book-slug>.ledger.jsonl`)
- Topic-evolution classification for the book's research base (actively-evolving vs stable)

**The prompt:**

```
You are reviewing the claim matrix + critic list for a book-explainer blog post on
augusteo.com. The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the truthfulness + faithfulness layers before any prose is
drafted. The claim matrix and book-source ledger together form the contract: every
claim the post will make has one row mapping the book's claim to a ledger anchor
AND to current-state-of-evidence + critics.

Find:

1. ANCHOR MISMATCH. For each matrix row, the Book locator is a [L#…] marker
   resolving to a ledger entry. The ledger entry has an `anchor_excerpt` — a
   short verbatim fragment from the book. For each sampled row, does the claim
   text actually match what the anchor excerpt asserts? Flag rows where the
   anchor doesn't support the claim, or supports a different / narrower /
   broader claim than what the matrix says.

2. FABRICATED OR HALLUCINATED QUOTES. The ledger has `kind: direct-quote`
   entries. For each sampled direct-quote entry, check internal coherence:
   does the quote text plausibly match the `anchor_excerpt` (which is the
   book's wording at that locator), and does the locator make sense given
   the chapter summary? You do NOT have direct source-file access in this
   review — verification is ledger-internal plus coherence against the
   embedded chapter summaries and Phase-2 anchor-verification status (the
   matrix's `Anchor verified` column). If a row's `Anchor verified` is
   `failed` or `pending`, flag it. If a quote is internally inconsistent
   with its anchor (different topic, different scope), flag it as
   STRUCTURAL. If a quote merely cannot be confirmed without the source
   file, flag it as `unverifiable` (not structural), prompting Phase 2 to
   re-verify before ship.

3. PARAPHRASE DRIFT. The ledger has `kind: paraphrase` entries — agent prose
   that summarizes a book passage. The `anchor_excerpt` is the book's wording;
   the `paraphrase` field is the agent's. For each sampled paraphrase, does
   the paraphrase faithfully render the anchor? Or does the paraphrase add
   claims, strengthen claims, or shift framing? Flag drift.

4. SOURCE-QUALITY MISTAGGING. Each matrix row has a Source-quality tag (`cited-RCT`
   / `cited-single-study` / `cited-meta-analysis` / `expert-quote` / `anecdote` /
   `personal-experience` / `assertion`). For each row, does the tag accurately
   reflect what the book actually cites? An expert quote tagged as `cited-RCT`
   is the canonical failure. Flag mismatches.

5. EVIDENCE-TYPE INTEGRITY. The matrix's Current-state column should reflect
   appropriate weighting. Specifically:
   - Don't classify as `replicated` based on a single blog post.
   - Don't classify as `disputed` based on a single failed replication.
   - Don't classify as `disproven` based on a non-direct conceptual replication.
   - A pre-registered Many Labs replication outweighs an unpublished follow-up.
   Flag rows where the Current-state classification is over- or under-strong
   given the cited evidence.

6. QUOTE/PAGE AUDIT. Every direct-quote and paraphrase ledger entry must have
   a locator. Flag any ledger entry missing chapter/section/paragraph anchor.
   For paraphrases that derive from a multi-paragraph passage, the locator
   should be the start paragraph; flag if no specific anchor exists.

7. CRITIC BALANCE. The Critics column should reflect the actual ratio of
   credible critique to credible support in the search. If the search found
   5 critics and 1 supporter, the column should say so; if it found 3:3, both
   should appear. Flag one-sided dunk piles when the field is genuinely mixed.
   Also flag critics whose argument is "vague disagreement" rather than a
   specific identifiable claim — those don't make the bar.

8. UNSUPPORTED LOAD-BEARING CLAIMS. Walk the candidate claim list (from Phase 1)
   and the matrix. Does every load-bearing claim have a matrix row with a
   resolved Book locator? Flag claims with no row, or rows where Book locator
   is null / unverified.

9. OMITTED CONTRADICTING EVIDENCE. For each claim where the Current-state is
   `replicated` / `refined`, did the search miss credible failed replications
   or critical meta-analyses? (You may not have access to all sources, but if
   the search summary references only confirmatory studies, flag the asymmetry.)

10. CITED STUDY RETRACTIONS. For each row where the book's source is a specific
    study, has the study been retracted? Retraction Watch is the canonical
    source. If the matrix doesn't reflect a retraction, flag it as a STRUCTURAL
    finding of the highest severity.

For each finding, label it STRUCTURAL (must fix before drafting) or COSMETIC.
Order findings by load-bearing-ness. Cite the specific matrix row number,
ledger entry id, or critic entry.

Do not be diplomatic. Do not validate. If the matrix is sound, say "no structural
issues found" and stop. Otherwise, keep finding things.
```

**Halt rules:**

- Retraction of a cited study not reflected in the matrix → STRUCTURAL of highest severity. Fix immediately; don't proceed without updating Current-state.
- Anchor mismatch on > 20% of sampled rows → halt and surface to Vic. The ingestion needs review.
- Critic dunk-pile on a claim where the field is mixed → STRUCTURAL; rewrite the Critics column to surface both sides.

**What to do with codex's output:** runner mechanics. Notes section: `## Codex matrix review`.

---

## Gate C: outline + figure-list pass

**When to run:** end of Phase 3, before Phase 4 drafting.

**What you provide to codex:**

- All Gate B inputs PLUS
- `## Outline` (claim-by-claim section list in book order, with H3 numbered headings)
- Figure table (columns: # / Section / Figure name / Type / Concept illustrated / Reader notices)

**The prompt:**

```
You are reviewing the outline + figure list for a book-explainer blog post on
augusteo.com. The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the structural layer before any prose is drafted. The matrix
has passed Gate B; this gate is about whether the outline + figure list actually
delivers a faithful, accountable, well-illustrated rendering of the book.

Find:

1. SECTION COVERAGE. Every major claim in the matrix should have exactly one
   section in the outline. Flag matrix rows with no section, or sections that
   don't correspond to a matrix row.

2. SECTION ORDER MATCHES BOOK ORDER. The outline sections should appear in the
   order the book introduces the claims. Flag any reordering. (The agent may
   note in the outline "moved out of book order because X" — if so, evaluate
   the rationale. Reordering for narrative effect is the canonical Scout
   Mindset failure; flag aggressively.)

3. SECTION TEMPLATE CONFORMANCE. Each section should be designed to render the
   9-part template from `claim-spine.md`: Claim / Type / Centrality / What the
   book says / Where the book gets it / Boundary conditions / Today's evidence /
   Critics / Where I land. The outline should make clear what content goes in
   each part for each section. Flag sections where the outline doesn't allocate
   content per the template.

4. CENTRALITY-LENGTH MATCH. The Centrality tag on each section drives section
   length (core: ~600–900 words; supporting: ~300–500; illustrative: ~150–300).
   The outline should reflect this allocation. Flag sections where the planned
   length doesn't match centrality.

5. FIGURES THAT IMPOSE STRUCTURE BEYOND THE BOOK'S FRAMING. The anti-cleanup
   rule allows figures to chart **book-cited-study evidence** (e.g., a
   replication-status timeline showing how the book's seed citations have
   evolved, or a claim-source-evidence chain tying a book claim to its
   current state of evidence). What it disallows is figures that impose
   structure (steps, 2x2s, clean Venns, "hero figures" summarizing the
   thesis) beyond what the book itself renders. Flag figures whose concept
   column doesn't map to a specific book framing OR a documented book-cited
   evidence pattern from `book-figure-recipes.md`.

6. ANTI-CLEANUP VIOLATIONS. For each figure, ask: does the figure make the
   book seem cleaner, more systematic, or more rigorous than the prose
   supports? Look specifically for:
   - 2x2 matrices invented by the agent
   - Clean flowcharts of "steps" when the book describes a fuzzy process
   - Venn diagrams with manufactured overlaps
   - "Hero figures" that summarize the whole thesis
   Label any such finding ANTI-CLEANUP STRUCTURAL.

7. FIGURE COUNT SANITY. The book skill is not figure-heavy by design. A typical
   post should have figures on 2-3 of its 5-12 sections — usually the most
   concept-rich claims. Flag if (a) every section has a figure (suggests
   over-illustration / cleanup risk), or (b) the figure list is missing
   figures for the most concept-rich claims.

8. FIGURE-TYPE MISFITS. For each figure, does its type match? Default is
   static-svg; interactive-canvas/plot only if one of the four override clauses
   applies (continuous sweep / animation / drag / multi-state toggle). The book
   skill's override-clause matches are rare; flag any interactive figure
   whose override clause is weak.

9. FIGCAPTION LOCATOR. Every figure's figcaption should end with [L#…] resolving
   to a ledger figure-caption entry. Flag any figure missing this anchor.

10. CROSS-REFERENCES BETWEEN SECTIONS. If section N depends on a concept
    established in section N-1, the outline should plan an explicit
    cross-reference. Implicit dependencies create reader friction. Flag.

For each finding, label it STRUCTURAL (must fix before drafting),
ANTI-CLEANUP STRUCTURAL (specific subset — fires the figure drop/simplify
fork), or COSMETIC. Order findings by load-bearing-ness.

Do not be diplomatic. Do not validate. If the outline is sound, say "no structural
issues found" and stop. Otherwise, keep finding things.
```

**Halt rules:**

- `ANTI-CLEANUP STRUCTURAL` → drop or simplify the offending figure. Doesn't halt; the runner Step-5 fork handles it.
- A figure list dominated by cleanup violations (3+ ANTI-CLEANUP STRUCTURAL findings on a single figure-list pass) → halt and surface to Vic. The figure approach needs a re-think.
- Section ordering doesn't match book order without justification → STRUCTURAL. Fix the outline.

**What to do with codex's output:** runner mechanics. Notes section: `## Codex spine review`.

---

## Gate D: final-draft pass

**When to run:** Phase 7, after the freshness re-check + ledger-marker cross-check, before final commit.

**What you provide to codex:**

- All Gate C inputs PLUS
- Full `src/content/blog/<book-slug>/index.mdx` content
- Ledger-integrity report from Phase 7 (every `[L#…]` marker → resolution status, anchor grep verification result)
- Freshness diff (matrix rows where Current-state changed since Phase 2)
- All prior `## Codex … review` sections

**The prompt:**

```
You are reviewing the final draft of a book-explainer blog post on augusteo.com.
The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the final draft for faithfulness drift, ledger integrity,
and freshness regression. The post's pubDate has been forced to today; every
external source must pass its recency bar as of today.

Find:

1. LEDGER-INTEGRITY VIOLATIONS. Walk the MDX. For each [L#…] marker:
   (a) Does it resolve to a ledger entry?
   (b) Does the ledger entry's anchor_excerpt grep-match the source file (per
       the Phase 7 ledger-integrity report)?
   (c) Does the prose near the marker faithfully render the ledger entry's
       excerpt?
   Flag any marker that fails any of these as LEDGER-INTEGRITY STRUCTURAL
   (highest severity; halts ship).

2. PROSE-MATRIX DRIFT. For each claim section, the prose should faithfully
   render the matrix row's contents: parts 4–7 of the section should match
   the corresponding matrix columns. Flag prose that strengthens claims
   beyond what the matrix supports.

3. SECTION-TEMPLATE COMPLETENESS. Each section should have all 9 parts (Claim /
   Type / Centrality / Book says / Source / Boundary / Today / Critics / Land).
   Flag any missing part.

4. WHERE-I-LAND BLOCK STATUS. Every section has a part 9 "Where I land". At
   ship time, every block must be in one of two terminal states:
   - REWRITTEN: no `REVISE-WHERE-I-LAND` markers, no `KEEP-AS-IS` markers,
     no `*Draft stance...*` italic preamble. Just Vic's prose.
   - KEPT-AS-IS: opening `<!-- KEEP-AS-IS: YYYY-MM-DD -->` and closing
     `<!-- /KEEP-AS-IS -->` wrap the body. No preamble.
   Flag as STRUCTURAL: any block with a remaining `<!-- REVISE-WHERE-I-LAND -->`
   opening marker (unresolved draft), OR any mixed wrapper (e.g., `KEEP-AS-IS`
   opening with `/REVISE-WHERE-I-LAND` closing), OR a `*Draft stance...*`
   preamble still present.

5. FRESHNESS REGRESSION. The freshness diff shows matrix rows where
   Current-state changed since Phase 2 (newer evidence published). For each
   such row, does the prose in part 7 reflect the new state? Flag prose that
   still cites the older state.

6. CRITIC LIST COMPLETENESS + TIER LABELS. Every critic in part 8 should have:
   (a) name or org, (b) tier label (T1 / T2 / T3), (c) specific argument
   quoted/paraphrased, (d) link. Flag entries missing any of these.

7. CITED STUDY RETRACTIONS (re-check). Has any external source cited in the
   "Today's evidence" sections been retracted since Phase 2? Cross-check
   Retraction Watch for the most recent set of cited papers. Flag any
   retraction not yet reflected in the prose.

8. QUOTATION BUDGET. The fair-use cap is ≤ 50 words per direct quote and
   ≤ 200 words per chapter total of direct quotation. Walk the MDX and count.
   Flag overages.

9. REFERENCES SECTION. The post's References section should have three blocks:
   The book / Current-state-of-evidence sources / Critics. Every external
   source cited inline should appear in the appropriate References block.
   Flag missing entries, broken links, or wrong block.

10. RELATED POSTS LINKING. If the post's notes file has a `## Related posts on
    augusteo.com` section, the prose should link to those posts at the named
    anchor points, AND the References section should include them. Flag missing
    cross-references.

11. VOICE / BANNED WORDS / EM-DASHES. The voice-check script catches most of
    these mechanically, but you should also flag any case where the prose
    crosses into editorial / stance language in parts 1–8 (which should be
    descriptive). Stance belongs in part 9.

12. SUBTLE WRONG MODELS. The post is intuition-second to faithfulness-first,
    but it still has to be technically accurate. Flag any sentence where the
    prose builds an intuition that's misleading even if it sounds right.

For each finding, label it STRUCTURAL (must fix before shipping),
LEDGER-INTEGRITY STRUCTURAL (highest severity — halts ship), or COSMETIC.
Order by load-bearing-ness.

Do not be diplomatic. Do not validate. If the draft is sound, say "no structural
issues found" and stop. Otherwise, keep finding things.
```

**Halt rules:**

- Any `LEDGER-INTEGRITY STRUCTURAL` finding → halt before ship. The runner cannot Step-6 override this; broken anchors must be fixed.
- A retraction of a cited study not reflected in the prose → STRUCTURAL of highest severity.
- More than 3 STRUCTURAL findings on the first invocation → halt and surface to Vic; the draft isn't ready, gate-rerun won't fix it.

**What to do with codex's output:** runner mechanics. Notes section: `## Codex final review`.

---

## A note on tone

(See `../../explainer-shared/codex-runner.md` "A note on tone" — same posture for the book skill. Codex is doing the hostile pass so the post can ship clean. Don't argue with codex on structural findings without checking the ledger / matrix / prose.)
