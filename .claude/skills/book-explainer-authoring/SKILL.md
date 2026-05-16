---
name: book-explainer-authoring
description: Long-form blog post on augusteo.com that explains a book faithfully and holds it scientifically accountable. Takes an EPUB / PDF / text input and produces a single claim-by-claim post in book order, with each claim tagged by type/centrality/source-quality, current-state-of-evidence research, and tiered critics. Mostly autonomous — runs end-to-end through a full prose draft before Vic reviews; a low-confidence ingestion is the only mid-run surface. Faithfulness enforced by a book-source ledger (every claim/quote/paraphrase needs a locator anchor). Triggers include "explainer post on the book X", "deep prose post on the book X", any path to a `*.epub` / `*.pdf` / `*.mobi` book file, "explain this book", "summarize this book as a long-form post", "fact-check the book X", "continue the X book post", "pick up the X book explainer". For research-topic explainers (not books), use `explainer-authoring`. For short Obsidian-vault posts, use `bun run sync`.
---

# Book-explainer authoring pipeline

## Goal

> Take a book and produce a published-ready MDX post on augusteo.com that **faithfully represents the book's argument in book order**, with every claim, quote, and paraphrase traceable to a chapter/section anchor in the book-source ledger; and that **holds the book scientifically accountable** by tracking the current state of evidence for each cited research claim and surfacing credible tiered critics. **Faithfulness to the source is the first bar; current-state-of-evidence accuracy is the second; credible critic surfacing is the third; visual polish is the fourth.**

This goal statement gets quoted into all four codex gate prompts so adversarial review pulls in the same direction.

## When to use

- Vic gives a path to an EPUB / PDF / MOBI / text file and asks for a post about the book.
- Vic gives a book title (and optionally author/edition) and asks for an explainer; the skill obtains the book file via Vic or refuses to run.
- Vic says "continue the X book post", "pick up the X book explainer", or names a book that already has a `notes/<book-slug>.md` file with a book-source ledger.

## When NOT to use

- Research-topic explainers (not books): use `explainer-authoring`.
- Short Obsidian-vault posts: use `bun run sync`.
- Book reviews that aren't long-form explainers: use `blog-write` after `blog-brainstorm`.

## Why this skill exists (and why not `explainer-authoring`)

The Scout Mindset post shipped via `explainer-authoring` and departed too far from the book — the existing skill optimizes for a thesis-led narrative arc, which actively pulls book posts away from the source. The book skill inverts the priorities:

| | `explainer-authoring` | `book-explainer-authoring` |
|---|---|---|
| Spine | three-act narrative (problem → mechanisms → reassembly) | claim-by-claim in book order |
| Source | external research (papers, docs, postmortems) | the book itself + external evidence-check |
| Faithfulness | claim-source matrix (claim ↔ external source) | book-source ledger (claim ↔ chapter anchor) + claim matrix (claim ↔ current-state-of-evidence + critics) |
| Approval cadence | gate-by-gate (Vic at every Codex gate) | mostly autonomous — single user gate at full prose draft |
| Codex gates | three (research / outline / final) | four (ingestion / matrix / spine / final) |
| Voice | essayistic, throughline-rhythm | citation-forward, locator-dense |
| Figures | mechanism diagrams + interactive widgets | concept diagrams illustrating book ideas (anti-cleanup rule) |

Both skills produce MDX with `essay: true`, `draft: true` (Vic flips to false on ship), in `src/content/blog/<slug>/index.mdx`. The output collection schema is identical (see `../../explainer-shared/mdx-output-spec.md`).

## Mode detection (precedence)

```
1. Vic's message contains a filesystem path matching `*.epub`, `*.pdf`,
   or `*.mobi` (anywhere in the string) → book-from-file mode.
   Validate the path:
   - Path doesn't exist on disk → halt and ask Vic to confirm the path.
   - Path is a URL (https://) → halt and ask Vic to download it locally first.
   - Path exists but is unreadable → halt and ask Vic to fix permissions.
   File-path beats every keyword once validation passes.

   Special collision case: book file provided AND notes/<slug>.md already
   exists for the slug derivable from the book's title. Halt with one
   AskUserQuestion: "resume the existing post (ignore file)", "abandon the
   in-flight post and re-ingest", or "use a different slug for the import".

2. No book path AND notes/<slug>.md exists for a slug derivable from
   Vic's message → resume mode.

3. Vic names a book title without a file path AND no notes/<slug>.md
   exists for it → title-only mode. The skill halts and asks Vic to
   supply the book file (EPUB / PDF / MOBI / plain text), since the
   ledger requires a verifiable source.

4. Otherwise → halt and ask Vic for the book.
```

The skill does NOT run from a book title alone. The ledger is the load-bearing constraint; without a verifiable source, "faithfulness" becomes a vibe check (see [`book-ingestion.md`](book-ingestion.md) for why).

## Slug derivation rule

```
1. Take the book title (from file metadata or Vic's message).
2. Lowercase, strip articles ("the", "a", "an"), strip subtitle (anything
   after a colon), strip punctuation, join with hyphens.
3. Cap at 6 words.
4. If the resulting slug already exists at notes/<slug>.md OR
   src/content/blog/<slug>/, halt and ask Vic for an alternative.
```

Examples:
- "The Scout Mindset: Why Some People See Things Clearly" → `scout-mindset`
- "Thinking, Fast and Slow" → `thinking-fast-and-slow`
- "Stubborn Attachments" → `stubborn-attachments`

## Companions to read

Read these in order before starting any phase. Files marked **(shared)** live in `.claude/explainer-shared/` and are referenced via `../../explainer-shared/<file>`; the rest are local to this skill.

- [`book-ingestion.md`](book-ingestion.md) — EPUB / PDF / MOBI extraction toolchain, edition capture, ledger schema + initialization, OCR confidence handling, footnote/endnote linking, fair-use bounds.
- [`claim-spine.md`](claim-spine.md) — the 9-part section template, drafting rules per part, ledger-anchor enforcement.
- [`evidence-check-protocol.md`](evidence-check-protocol.md) — per-claim search rules across PubMed, Google Scholar, Semantic Scholar, Retraction Watch, Data Colada, replication-project DBs. Recency bars. Evidence-type integrity.
- [`critic-finding-protocol.md`](critic-finding-protocol.md) — tiered sources, credibility ranking, "argument first, credential second", critic-balance rule.
- `../../explainer-shared/voice-rules.md` **(shared)** — the base "Write Like a Human, Not an AI" guide.
- [`book-voice-overrides.md`](book-voice-overrides.md) — book-specific voice tilt (citation-forward, locator-dense) layered on top of the shared base.
- `../../explainer-shared/illustration-style.md` **(shared)** — base palette / typography / SVG conventions.
- [`book-illustration-overrides.md`](book-illustration-overrides.md) — the anti-cleanup rule.
- `../../explainer-shared/figure-kit.md` **(shared)** — the seven Svelte primitives + Astro hydration pattern.
- `../../explainer-shared/figure-recipes.md` **(shared)** — static-default rule + four override clauses + per-figure-wrapper pattern.
- [`book-figure-recipes.md`](book-figure-recipes.md) — concept-diagram patterns for books-and-ideas explainers.
- [`codex-gate-prompts.md`](codex-gate-prompts.md) — exact prompts for Gates A / B / C / D.
- `../../explainer-shared/codex-runner.md` **(shared)** — shared runner mechanics.
- `../../explainer-shared/playwright-checks.md` **(shared)** — per-figure-type visual review failure modes.
- [`where-i-land-template.md`](where-i-land-template.md) — what the skill drafts vs. what Vic owns; `<!-- REVISE-WHERE-I-LAND -->` wrapper.
- [`resume-tracker.md`](resume-tracker.md) — autonomous-run state model.

## The seven phases

The pipeline runs **mostly autonomously**. Phases 1–4 fire end-to-end without user approval; the only mid-run surface is Gate A's low-confidence path. You read the full prose draft once (after Phase 4), give critique, and Phases 5–7 run autonomously to ship-ready.

```
Phase 1: ingestion
   ├─ book-from-file mode: extract → ledger.jsonl + chapter summaries + candidate claim list
   ├─ resume mode: read notes file + run migration → continue from tracker
   └─ Gate A (ingestion audit)  [auto, surfaces ONLY if low-confidence]

Phase 2: per-claim fact-check + critic search
   → claim matrix anchored to ledger + tiered critic list
   → Gate B (matrix truthfulness + faithfulness + quote/page audit)

Phase 3: outline + figure list
   → claim-by-claim sections + figure specs (concept diagrams)
   → Gate C (spine structure + figure-list coverage + anti-cleanup check)

Phase 4: draft prose
   → full MDX with [L#] markers + <!-- REVISE-WHERE-I-LAND --> blocks

>>>  USER GATE: Vic reads full draft, gives critique  <<<

Phase 5: implement figures
   → static-SVG default per shared figure-kit + book-figure-recipes

Phase 6: playwright visual review
   → per-figure-type checks

Phase 7: pre-ship pass
   → ledger-marker cross-check + freshness re-check on cited research
   → Gate D (drift + freshness + ledger integrity)
   → hero hand-off
```

Each phase becomes a TaskCreate when the skill runs. Phases are gates; do not skip ahead.

## Phase 1: ingestion (mode-specific)

Goal: a `notes/<book-slug>.ledger.jsonl` exists with edition metadata + per-chapter entries, and a `notes/<book-slug>.md` file exists with `## Spec`, `## Chapter summaries`, `## Candidate claim list`, and `## Resume here` sections.

### Phase 1 — book-from-file mode

1. **Read `book-ingestion.md` end-to-end** before starting. The toolchain choice (pandoc / pdftotext / pdfplumber / ocrmypdf / calibre fallback) and ledger schema live there.
2. **Capture edition metadata** as the first ledger entry: title, author, edition, ISBN, year, publisher, source format (epub / pdf / mobi / txt), and source-file SHA-256.
3. **Extract chapter structure.** Parse TOC + heading hierarchy. For each chapter: record `chapter_number`, `chapter_title`, `start_locator`, `end_locator`.
4. **Walk every chapter end-to-end.** For each chapter:
   - Write a 2–4 paragraph summary in `## Chapter summaries`.
   - Extract candidate claims (one per major assertion) with chapter/section/paragraph anchors. Each candidate has an `id`, `kind: claim`, the claim text, and the **anchor excerpt** (a short verbatim fragment ≤ 50 words; this is what downstream grep verifies). Save to `ledger.jsonl`.
   - For PDF inputs: capture `ocr_confidence` per page if OCR was used. Pages below threshold (0.85) are flagged; their claims are excluded from the candidate list.
   - Parse footnotes/endnotes and link each to its referencing passage. Endnote entries get `kind: endnote` in the ledger.
5. **Synthesize candidate claim list.** From the per-chapter candidates, identify the 5–12 major claims (one section each in the final post). Apply book-skill heuristics from `claim-spine.md`:
   - Empirical claims (cited studies, RCTs, meta-analyses) get priority.
   - Conceptual / framework claims that the book repeatedly returns to.
   - Practical / action-oriented claims the book explicitly recommends.
   - Anecdotes promoted to claim ONLY if the book itself treats them as load-bearing (not illustrative).
6. **Persist.** Write `notes/<book-slug>.md` with `## Spec` (title / author / edition / publisher / year / one-paragraph thesis / book-skill detected genre), `## Chapter summaries`, `## Candidate claim list`, `## Boundary conditions` (what the book explicitly does NOT claim), and `## Resume here`.
7. **Project-memory verification (REQUIRED, halt if missing).** Drop project-memory entry at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_book.md` AND add a one-line MEMORY.md pointer. **Verify both files exist** with `ls` before moving to Gate A.
8. **Run Gate A** (ingestion audit). Codex sanity-checks ledger coverage, anchor verifiability, claim-extraction quality. If Gate A returns `LOW-CONFIDENCE INGESTION`, halt and surface a ledger preview at `notes/<slug>.ingestion-preview.md`. Otherwise proceed silently to Phase 2.

### Phase 1 — resume mode

1. **Read `notes/<book-slug>.md` end-to-end** AND `notes/<book-slug>.ledger.jsonl` headers before any other action.
2. Verify ledger integrity: every claim/quote in the existing notes file has a `[L#]` marker that resolves to a ledger entry. If not, halt and surface to Vic.
3. Read the `## Resume here` tracker. Pick the next batch.
4. `git log --oneline | head -30` to see commits since the spec commit.
5. `grep -n TODO src/content/blog/<book-slug>/index.mdx` if the MDX exists, for remaining placeholders.
6. Continue from the phase named in the tracker. Do NOT re-run any earlier phase.

## Phase 2: per-claim fact-check + critic search

Goal: a `## Claim matrix` with one row per major claim, each anchored to the ledger AND tracking current state of evidence, AND a `## Critics` section with tiered credible critics of the book.

1. Read `evidence-check-protocol.md` and `critic-finding-protocol.md`.
2. For each candidate claim from the ledger:
   - Identify the book's own cited source (from endnotes / inline citations). Tag with **source-quality-inside-the-book**: `cited-RCT`, `cited-single-study`, `cited-meta-analysis`, `expert-quote`, `anecdote`, `personal-experience`, `assertion`.
   - Search current state of research per the protocol (PubMed, Google Scholar, Semantic Scholar, Retraction Watch, Data Colada, replication-project DBs). Apply recency bars by claim type.
   - Classify current state: `replicated`, `refined`, `weakened`, `disputed`, `disproven`, `unsettled`, `no-update-found`.
   - Capture **boundary conditions**: what the book explicitly does not claim, where the claim does and doesn't hold per the current evidence.
3. **Search for critics** per `critic-finding-protocol.md`:
   - Tier 1: academic / domain-expert reviews (peer-reviewed journals, expert blogs like Andrew Gelman, Stuart Ritchie, Slate Star Codex for behavioral books).
   - Tier 2: long-form review essays (LRB / NYRB / The Atlantic / Substack).
   - Tier 3: replication-tracker hits (specific failed-replication citations).
   - For each critic, capture the **specific argument** (not vague disagreement) and the critic's tier/credibility.
4. **Critic balance check.** If the field is genuinely mixed (some studies support, some refute), the critic section reflects that. Don't curate a one-sided dunk pile.
5. Build the **claim matrix** in `notes/<book-slug>.md` under `## Claim matrix`:

   ```markdown
   ## Claim matrix

   | # | Claim | Type | Centrality | Book locator | Source quality | Current state | Critics (tier ‖ argument) | Anchor verified |
   |---|---|---|---|---|---|---|---|---|
   | 1 | "X improves outcomes by 50%" | empirical | core | [L#42] | cited-single-study | weakened (2 failed replications) | T1: Gelman, "small sample, no preregistration"; T2: Atlantic 2023 "effect size shrunk in larger RCTs" | yes (grep-matched 2026-05-16) |
   ```

   The `Anchor verified` column tracks whether the ledger anchor for the Book locator has been grep-verified against the source file. Phase 2 sets `yes` after verification; `pending` if not yet checked; `failed` if the anchor doesn't match. Gate B reads this column; rows with `failed` are STRUCTURAL findings.

6. Update `## Resume here`: phase 2 done. **Run Gate B** (matrix truthfulness + faithfulness + quote/page audit). Codex checks anchor mismatch, fabricated quotes, evidence-type integrity, critic balance.

## Phase 3: outline + figure list

Goal: a section list (one per major claim, in book order) and a numbered figure table where every figure illustrates a book CONCEPT, not research data.

1. Read `book-figure-recipes.md` and `book-illustration-overrides.md`.
2. **Sketch the section list.** One section per claim from the matrix, in the order the book introduces them. Use chapter dividers (`## Chapter N: <chapter title>`) if the post benefits from book-structure mirroring.
3. Number sections (`### 1. <claim summary>`, `### 2. ...`).
4. **For each section, list figures.** Apply the book figure recipes:
   - Two-axis concept map
   - Before/after mental model swap
   - Claim-source-evidence chain
   - Replication-status timeline
   - Other concept diagrams per `book-figure-recipes.md`
5. **Anti-cleanup check.** For each figure, ask: does this diagram make the book seem cleaner / more systematic than the prose actually supports? If yes, simplify or drop. The anti-cleanup rule from `book-illustration-overrides.md` is hard.
6. Per-figure spec: mechanism (what concept it illustrates), what the reader walks away noticing, figure type (default `static-svg`).
7. Append the outline + figure table to `notes/<book-slug>.md` under `## Outline`. Columns: `# | Section | Figure | Type | Concept illustrated | Reader notices`.
8. Update `## Resume here`: phase 3 done; populate the per-figure progress table. **Run Gate C** (spine structure + figure-list coverage + anti-cleanup check).

## Phase 4: draft prose

Goal: a complete MDX draft with every section following the 9-part claim-spine template, every claim/quote anchored to the ledger via `[L#]` markers, and `<!-- REVISE-WHERE-I-LAND -->` blocks isolated to "Where I land" sections.

1. Read `claim-spine.md` end-to-end. The 9-part template is the contract.
2. Read `book-voice-overrides.md` for the citation-forward voice tilt.
3. Create `src/content/blog/<book-slug>/index.mdx` with frontmatter per `../../explainer-shared/mdx-output-spec.md`:
   - `title` (post title, not book title verbatim — frame as "What [Book Title] says, and what the evidence says back").
   - `description`, `pubDate`, `tags` (include `"Books"` as primary tag plus topic tags), `featured: false`, `draft: true`, `essay: true`.
   - `heroAlt: "TODO: hero image not yet selected"` placeholder.
   - Omit `heroImage` (Phase 7 adds it).
4. **Lead with a short setup** (1–2 paragraphs): what book this is, who wrote it, why it's worth engaging with, what this post does (faithfully summarize + scientifically account + surface credible critics). Lead with a `[L#0]` reference to the book itself in the ledger.
5. **Draft section by section using the 9-part template** from `claim-spine.md`. For each section:
   - Write parts 1–9 in order.
   - Every direct quote from the book gets a `[L#…]` marker resolving to a `kind: direct-quote` ledger entry. **Phase 1 only created `kind: claim` entries; you append new `direct-quote` entries to `notes/<book-slug>.ledger.jsonl` here, with monotonically increasing IDs.** Each new entry needs `id`, `kind`, `quote`, `locator`, `anchor_excerpt`, `word_count` per the schema in `book-ingestion.md`.
   - Every paraphrase of the book gets a `[L#…]` marker resolving to a `kind: paraphrase` ledger entry. Append these to the ledger the same way as direct-quote entries.
   - Every figure caption that anchors to the book gets a `[L#…]` marker resolving to a `kind: figure-caption` ledger entry. Append in Phase 5 when figures are implemented.
   - Every claim about **current evidence** (Today's evidence sections) gets an inline markdown link to the primary source — NOT a `[L#…]` marker. External evidence is not in the ledger.
   - Every critic is named, tiered, and quoted on the specific argument (not vague disagreement). Inline-link to the critic's piece.
   - "Where I land" is drafted by the skill from the assembled evidence + critics, wrapped in `<!-- REVISE-WHERE-I-LAND -->` ... `<!-- /REVISE-WHERE-I-LAND -->`. See `where-i-land-template.md` for the drafting rules and ship-time resolution requirements.
6. **Apply voice rules during drafting** per `../../explainer-shared/voice-rules.md` + `book-voice-overrides.md`. After each section, run `scripts/voice-check.sh src/content/blog/<book-slug>/index.mdx`. Re-run until clean.
7. **References section** at the end. Three blocks:
   - `### The book` — the book itself, full citation with edition + ISBN.
   - `### Current-state-of-evidence sources` — every external source cited in the "Today's evidence" parts.
   - `### Critics` — every critic cited, with their tier label.
8. **Inter-post linking.** Scan `src/content/blog/` for topic-adjacent posts and add inline links at natural anchor points. Add related posts to `### Related posts on augusteo.com` block at the top of References (matching the explainer-skill pattern).
9. Commit per section. After each commit, update `## Resume here`.

>>>  USER GATE: Vic reads full draft, gives critique. Phase 4 ends here.  <<<

The skill prints the full draft path to chat and explicitly waits for Vic's review. Vic's critique (text, paths, comments, anything) becomes the input to a Phase 4 revision cycle, OR Vic says "looks good, proceed" and the skill enters Phase 5.

## Phase 5: implement figures

Goal: every figure placeholder replaced with a working static-SVG (or interactive-canvas/plot under one of the four override clauses) implementation.

1. Read `book-figure-recipes.md` and `../../explainer-shared/illustration-style.md` + `book-illustration-overrides.md`.
2. **Static-SVG default.** Replace each placeholder with `<figure><svg viewBox="0 0 680 ...">...</svg><figcaption>...</figcaption></figure>` directly in the MDX.
3. For interactive-canvas / plot figures (rare in book posts; only justified by one of the four override clauses in `../../explainer-shared/figure-recipes.md`):
   - Draw function at `src/figures/<book-slug>/<figure-name>.ts`.
   - Wrapper component at `src/components/figures/<book-slug>/<FigureName>.svelte`.
   - MDX usage: import the wrapper, place inside `<Figure caption=".." figNum={N}>` with `client:visible`.
4. **Anti-cleanup re-check.** Before committing each figure, ask: does this figure make the book seem cleaner than the prose supports? If yes, simplify.
5. Test each figure in `bun run dev` at `http://localhost:4321/blog/<book-slug>` before moving to the next.
6. Commit per figure. Update `## Resume here` after each.

## Phase 6: playwright visual review

Goal: every figure renders cleanly.

1. Start `bun run dev` in the background.
2. Use the playwright MCP server to navigate to `http://localhost:4321/blog/<book-slug>`.
3. For each figure: scroll into view, snapshot, read the screenshot back. Run universal + type-specific checks from `../../explainer-shared/playwright-checks.md`.
4. If a figure fails: edit and re-snapshot. Halt if a single figure fails three times in a row.

## Phase 7: pre-ship freshness pass + Gate D + hero hand-off + ship

Goal: the post ships with current evidence, ledger integrity verified, no claim drift, hero image present.

1. **Ledger-marker cross-check.** Walk every `[L#…]` marker in the MDX. For each marker, confirm:
   - The ledger entry exists.
   - The entry's anchor excerpt grep-matches the source (if the source file is still on disk).
   - The post text near the marker faithfully renders the entry's excerpt (no drift).
   Halt and fix any failures.
2. **Freshness re-check.** Re-query every external source cited in the "Today's evidence" sections:
   - For PubMed / preprints: check for newer studies, meta-analyses, retractions.
   - For Retraction Watch / Data Colada: check for new entries on the cited research.
   - For blog posts / news: check for edits since the cited access date.
   If a newer source materially changes the current-state classification, halt, update the matrix + prose, then continue.
3. **Force `pubDate := today`** in the frontmatter.
4. **Run Gate D** (drift + freshness + ledger integrity).
5. **Final `voice-check.sh` pass.** Em-dashes: zero. Banned words: zero or justified.
6. **Hero hand-off.** Follow `../../explainer-shared/hero-handoff.md`. Compose the prompt; wait for Vic to paste a path or say "skip"; copy to `src/assets/blog/<book-slug>/hero.<ext>`; propose `heroAlt`; edit frontmatter.
7. **Verify.** Confirm `draft: true` (stays `true` — Vic flips to `false` himself), `essay: true`, real `heroImage`, real `heroAlt`. Walk every figure at `http://localhost:4321/blog/<book-slug>`.
8. **Final commit** naming the post.
9. Update `## Resume here`: phase 7 done.

## Four codex gates (auto-firing)

All gates invoke the project-local `codex` skill via the shared runner in `../../explainer-shared/codex-runner.md`. Gates A–D auto-fire at phase boundaries; the only mid-run surface to Vic is Gate A's `LOW-CONFIDENCE INGESTION` halt path. Gates B, C, D fire and run their re-run loops without bothering Vic — Vic only sees the work at the Phase 4 user gate (full prose draft).

| Gate | Phase | Inputs embedded | Gate label | `<gate-key>` | Notes section |
|---|---|---|---|---|---|
| A | end of Phase 1 | Spec + chapter summaries + ledger preview + candidate claim list | `A (ingestion)` | `ingestion` | `## Codex ingestion audit` |
| B | end of Phase 2 | above + Claim matrix + Critics + Boundary conditions | `B (matrix)` | `matrix` | `## Codex matrix review` |
| C | end of Phase 3 | above + Outline + figure table | `C (spine)` | `spine` | `## Codex spine review` |
| D | Phase 7 | above + full MDX + ledger verification report + freshness diff | `D (final)` | `final` | `## Codex final review` |

Per-gate prompts: [`codex-gate-prompts.md`](codex-gate-prompts.md). Runner mechanics: `../../explainer-shared/codex-runner.md`.

Skill-specific subtypes:

- **Gate A** may return `LOW-CONFIDENCE INGESTION` → the only mid-run surface. The runner Step-5 fork is: halt, write `notes/<slug>.ingestion-preview.md` (ledger excerpt + Codex findings + a ranked list of what to fix), and surface to Vic.
- **Gate C** may return `ANTI-CLEANUP STRUCTURAL` → drop / simplify the offending figure. Re-runs against the cap.
- **Gate D** may return `LEDGER-INTEGRITY STRUCTURAL` → halt before ship; broken `[L#]` markers must be fixed, not overridden.

## Hard rules

1. **Faithfulness first, per book claim/quote/paraphrase.** Every claim, quote, or paraphrase **about the book** in the post has a `[L#…]` marker resolving to a ledger entry whose anchor excerpt grep-verifies against the source. No anchor → cannot ship. External-evidence claims (current state of research, critics) use inline markdown links to primary sources instead; they do NOT need ledger anchors.
2. **Spine follows book order.** Sections appear in the order the book introduces the claims. No reorganization into a thesis arc.
3. **Source-quality-inside-the-book is tagged on every claim.** An RCT and a memoir anecdote do NOT enter "today's evidence" as equivalent.
4. **Boundary conditions are explicit.** Every claim section names what the book does NOT claim, to prevent overextension.
5. **Critics get arguments, not vague disagreement.** Each critic in `## Critics` has a quoted specific argument and a tier label. Field genuinely mixed → no dunk pile.
6. **Replication-crisis casualties get flagged.** When the book cites a study that has failed to replicate (marshmallow test, power posing, ego depletion, etc.), the post says so explicitly in "What the evidence says today".
7. **Four codex gates are mandatory.** All four (A: ingestion / B: matrix / C: spine / D: final) auto-fire. Only Gate A's `LOW-CONFIDENCE` surfaces mid-run.
8. **Single user gate at full prose draft.** Phases 1–4 are autonomous. Vic reads the full MDX after Phase 4, gives critique, and Phases 5–7 run autonomously.
9. **`draft: true` from creation through ship; Vic flips to `draft: false` explicitly.** Per the explainer-family convention; see `../../explainer-shared/codex-runner.md` Step-6a.
10. **Static is the figure default.** Interactive only if one of the four override clauses applies. Anti-cleanup rule applies to every figure regardless of type.
11. **Fair-use bounded excerpts.** Direct quotes in the MDX max ~50 words each; per-chapter cap ~200 words total. The ledger stores excerpts (short, fair-use bounded) and locators — never large copied chunks of the book.
12. **Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.** Halt if missing.
13. **Inter-post linking applies.** Newer book posts link to older relevant posts (book or explainer); older posts are NOT retroactively edited.
14. **`scripts/voice-check.sh` exits clean before any commit.** Em-dashes: zero (outside act-divider headings). Banned words: zero or justified per the override rule in `book-voice-overrides.md`.

## Halt-and-ask conditions

- Phase 1 mode detection: no book file provided AND no resume tracker found.
- Phase 1 ingestion: book file unreadable / OCR confidence below threshold for most pages.
- Phase 1 candidate claim list: fewer than 3 viable claims (the book is too short or too thin to warrant a long-form post).
- Phase 1 boundary conditions: the book explicitly disclaims a major framing the post would otherwise impose.
- Gate A returns `LOW-CONFIDENCE INGESTION`.
- Phase 2: a claim has no findable source inside the book despite Phase 1 tagging it (the candidate was mis-extracted).
- Gate B finds an unfixable anchor mismatch (ledger excerpt does not grep-match the source).
- Gate C finds figures that systematically clean up the book (anti-cleanup violation that can't be repaired).
- Phase 4 user gate: Vic says "scrap and restart" — halt with a write-up of what landed and what didn't.
- Phase 7 ledger-marker cross-check: a `[L#…]` marker doesn't resolve to a ledger entry, OR the ledger entry's anchor excerpt doesn't grep-match the source (book file was edited / replaced).
- Phase 7 freshness re-check: a new replication or retraction materially changes a current-state classification.
- Gate D finds `LEDGER-INTEGRITY STRUCTURAL`.

When the skill halts:

1. Append `Status: halted-phase-<N>-<YYYY-MM-DD>` to the project-memory file with a one-paragraph note on what triggered the halt.
2. Leave the MEMORY.md pointer in place. It's the resume signal.
3. Surface the halt explicitly to Vic in the chat.

## Composition with other skills

- Gates A–D invoke the project-local `codex` skill (consult mode).
- Phase 6 uses the playwright MCP server.
- Phase 1 ingestion may use the Bash tool to invoke `pandoc`, `pdftotext`, `pdfplumber`, `ocrmypdf`, `calibre` per `book-ingestion.md`.
- Does NOT call `superpowers:brainstorming` — the book is the spec.
- Does NOT call `superpowers:writing-plans` — the claim matrix is the plan.

## Output structure

```
notes/<book-slug>.md                              # spec, chapter summaries, candidate claims, matrix, critics, outline, codex review, resume tracker
notes/<book-slug>.ledger.jsonl                    # the book-source ledger (one JSON object per line)
notes/<book-slug>.ingestion-preview.md            # written only if Gate A surfaces low-confidence
src/content/blog/<book-slug>/index.mdx            # the post
src/figures/<book-slug>/<figure-name>.ts          # one file per interactive figure (rare for book posts)
src/components/figures/<book-slug>/<FigureName>.svelte
src/assets/blog/<book-slug>/hero.<ext>            # added in Phase 7
~/.claude/projects/<project>/memory/project_<slug>_book.md
```

## Verification

After Phase 7:

- Post renders at `http://localhost:4321/blog/<book-slug>` with no console errors.
- Every figure displays cleanly: no overlap, no clipping, labels legible.
- `grep -nP '\x{2014}'` returns zero results outside act-divider headings.
- `scripts/voice-check.sh` exits clean on the final file.
- Hero image present, `heroAlt` describes what's visible.
- `draft: true` (stays `true` until Vic ships), `essay: true`, `pubDate` is today.
- **Every `[L#…]` marker in the MDX resolves to a `notes/<slug>.ledger.jsonl` entry.** Verify with `grep -oP '\[L#\d+\]' src/content/blog/<book-slug>/index.mdx | sort -u` and cross-check each against the ledger.
- **Every claim section has all 9 parts** from the claim-spine template.
- **Zero remaining `<!-- REVISE-WHERE-I-LAND -->` markers in the MDX.** Every block must be in one of two terminal states: rewritten (no markers, no `*Draft stance...*` preamble) OR kept-as-is (both markers replaced with `<!-- KEEP-AS-IS: YYYY-MM-DD -->` ... `<!-- /KEEP-AS-IS -->`, no preamble). See `where-i-land-template.md` for the convention.
- **Every critic in `## Critics` has a tier label and a specific argument.**
- Notes-file `## Codex … review` sections all close on cosmetic rather than structural issues.

## Common rationalizations to refuse

| Excuse | Reality |
|---|---|
| "I can paraphrase without an anchor; it's basically what the book says" | If it's load-bearing prose, it needs a `[L#]` marker. Skill won't ship without it. |
| "This figure makes the book's argument easier to grasp" | Easier than what the prose supports? If yes, anti-cleanup rule applies. Simplify or drop. |
| "The book cited it, that's good enough" | The book cited a single study from 2008 that failed to replicate. "What evidence says today" is required. |
| "The critic is too obscure to bother surfacing" | If the critic identifies a specific flaw with a credible argument, tier them and include them. Argument > credential. |
| "I can skip Gate A's confidence check; ingestion looked fine" | Gate A is the protection against wrong-spine failure. If it surfaces, halt and review. |
| "Vic said 'looks good' — I can flip to draft: false" | No. Vic flips draft himself. Always. |
| "The book is short; I can do without the ledger" | The ledger is the load-bearing constraint. No book skill run is exempt. |
| "Three of the book's claims are essentially the same; I'll merge them" | Don't. The book introduces them as distinct; respect the book's order and granularity. Merge only if the book itself does. |
