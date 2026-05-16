# Resume tracker

The book skill's autonomous-run state model. Maintained in `notes/<book-slug>.md` under `## Resume here`. Initialized in Phase 1; updated at every phase boundary and after every commit during Phases 5–7.

Companion artifact: `notes/<book-slug>.ledger.jsonl` (the book-source ledger). Both files are co-equal; resume reads both.

## Canonical section order for `notes/<book-slug>.md`

```
# <Post title>

## Spec
   - Book: title, author, edition, ISBN, year, publisher
   - Source format: epub / pdf / mobi / txt
   - Source file: path, sha256
   - Genre detected (book skill heuristic): pop-science / framework / memoir / historical / textbook / other
   - One-paragraph thesis
   - Topic-evolution classification (for the research base): actively-evolving / stable / unsettled

## Chapter summaries
   ### Chapter 1: <chapter title>
   <2–4 paragraph summary>
   ### Chapter 2: ...

## Candidate claim list
   1. <claim text> — chapter N, [L#…]
   2. ...

## Claim matrix
   | # | Claim | Type | Centrality | Book locator | Source quality | Current state | Critics | Anchor verified |
   |---|---|---|---|---|---|---|---|---|

## Critics
   ### Claim 1
   - **T1: <name>** — <argument> [link]
   - ...

## Boundary conditions
   - <Book explicitly does NOT claim ...>

## Outline
   | # | Section | Figure | Type | Concept illustrated | Reader notices |
   |---|---|---|---|---|---|

## Related posts on augusteo.com
   - slug — one-line summary — anchor points in prose

## Codex ingestion audit       (appears after Gate A fires)
## Codex matrix review         (appears after Gate B fires)
## Codex spine review          (appears after Gate C fires)
## Codex final review          (appears after Gate D fires)

## Resume here
   Last touched: YYYY-MM-DD.

   ### Phase status
   | Phase | Status | Output |
   |---|---|---|
   | 1. Ingestion | done / in_progress / pending | ledger.jsonl, chapter summaries, candidate claims |
   | 2. Per-claim fact-check | ... | claim matrix + critics |
   | 3. Outline + figure list | ... | outline + figure table |
   | 4. Draft prose | ... | src/content/blog/<book-slug>/index.mdx |
   | 5. Implement figures | n of N | per-figure table below |
   | 6. Playwright review | n of N passed | playwright snapshots reviewed |
   | 7. Freshness + Gate D + hero + ship | ... | hero image, dev verification, ship |

   ### Codex history
   | Date | Gate | Outcome | Findings ref |
   |---|---|---|---|

   ### Phase 5 figure progress
   | # | Figure | Type | Status | Commit |
   |---|---|---|---|---|

   ### User gate status (Phase 4 → Phase 5 boundary)
   | Date | Status | Vic's critique summary |
   |---|---|---|
   <one row per Phase 4 review pass; status = pending / approved / revision-requested>

   ### Suggested next batch
   Three to five lines naming the next concrete action. Order from low complexity to high.

   ### How to resume from a fresh context
   1. Read this file end-to-end. Spec / chapter summaries / claim matrix / outline /
      critics / Codex review sections carry every locked-in choice.
   2. Read notes/<book-slug>.ledger.jsonl (just the headers + sample entries) to
      understand the ledger structure for this book.
   3. Run any v1 → v2 migration if missing sections (see migration rules below).
   4. `git log --oneline | head -30` to see commits since the spec commit.
   5. `grep -n TODO src/content/blog/<book-slug>/index.mdx` for remaining placeholders.
   6. Pick the next batch above; implement, voice-check, commit, update this tracker.

   ### Hard rules to keep applying
   [Quote the Hard Rules section from SKILL.md verbatim here so a fresh-context
   agent doesn't have to context-switch.]
```

The schema lives in this file. Phase 1 initializes the structure; subsequent phases populate.

## Phase status taxonomy

For each phase, status is one of:

- `pending` — not started.
- `in_progress` — started, not yet at a clean break.
- `done` — completed AND any gate at this phase boundary has fired (Codex history row exists).
- `halted` — phase encountered a halt condition; see the Suggested next batch for what to fix.
- `skipped` — phase intentionally skipped (rare; e.g., Phase 4 user gate may auto-skip if Vic approves without revision).

A phase moves to `done` ONLY when the gate's row appears in the Codex history table. Phase 1's status moves to `done` when Gate A has a clean row (or a `Step-6 override` row); Phase 2 → `done` only when Gate B has a row; etc.

## Codex history table

Append-only. One row per gate invocation:

```
| Date       | Gate         | Outcome           | Findings ref                              |
|------------|--------------|-------------------|-------------------------------------------|
| 2026-05-16 | A (ingestion)| clean             | ## Codex ingestion audit                  |
| 2026-05-16 | B (matrix)   | structural-fixed  | notes/scout-mindset-codex-matrix-20260516.md |
| 2026-05-16 | C (spine)    | cosmetic-only     | ## Codex spine review                     |
```

Outcome values match the runner contract (see `../../explainer-shared/codex-runner.md` Step 4): `clean` / `cosmetic-only` / `structural-fixed` / `halted` / `accepted (Step-6 override)`.

## User gate status table

Phase 4 ends with a user gate. Vic reads the draft, gives critique, and either approves or requests revision. Track each pass:

```
| Date       | Status              | Vic's critique summary                                            |
|------------|---------------------|-------------------------------------------------------------------|
| 2026-05-16 | pending             | -                                                                 |
| 2026-05-17 | revision-requested  | rewrite Where-I-land for §3; add critic for §5 (Adam Mastroianni) |
| 2026-05-18 | approved            | OK as-is.                                                         |
```

`revision-requested` triggers a Phase 4 revision pass (the skill processes Vic's critique, makes edits, then re-surfaces the updated MDX). `approved` unlocks Phase 5.

## Phase 5 figure progress table

Populated at end of Phase 3 with the planned figures, updated as each is implemented:

```
| # | Figure              | Type       | Status   | Commit  |
|---|---------------------|------------|----------|---------|
| 1 | ScoutSoldierAxes    | static-svg | done     | a3f5... |
| 2 | CalibrationTimeline | static-svg | in_progress | -       |
```

## Migration rules (resume mode)

If on resume, the notes file is from an earlier version of the skill OR has missing sections, run a one-time migration:

1. **Walk the canonical section order above.** For each section, check whether it exists.
2. **If missing, insert at the canonical position with a stub:**
   - `## Boundary conditions` → `*Pre-v2 book post; boundary conditions not retroactively populated.*`
   - `## Related posts on augusteo.com` → `*Pre-rule post; related-posts scan not retroactively run.*`
   - `## Critics` → `*Pre-v2; critics section not retroactively populated.*` (very rare since v1 had critics from the start)
   - `### User gate status` (inside Resume here) → empty header.
   - `### Codex history` → empty header.
3. **Validate structure** before migrating:
   - No duplicate sections.
   - Canonical order.
   - Required tables have valid headers (`| Phase | Status | Output |`; `| Date | Gate | Outcome | Findings ref |`; `| # | Figure | Type | Status | Commit |`).
   - `Last touched: YYYY-MM-DD` line in `## Resume here`.
4. **Idempotent**: if all v2 sections already exist, the migration is a no-op.
5. **Commit as a single migration commit** (`migrate notes/<book-slug>.md to v2 canonical shape`) ONLY if at least one stub was inserted AND validation passed.

## Halt-state housekeeping

When the skill halts:

1. Append `Status: halted-phase-<N>-<YYYY-MM-DD>` to the project-memory file at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_book.md` with a one-paragraph note on what triggered the halt.
2. Leave the MEMORY.md pointer in place — it's the resume signal.
3. Surface to Vic in chat.
4. Update `### Phase status` for the halted phase to `halted`.

## Phase-transition status print

At the end of each phase (autonomous or after a user gate), the skill prints to chat:

```
## Phase <N> done: <phase name>

### Phase status
| Phase | Status | Output |
|---|---|---|
[updated table]

### Suggested next batch
[3-5 lines]

### Codex history (latest)
[most recent 3 rows]
```

This gives Vic a quick read on autonomous progress without opening the notes file. For mid-Phase commits (per-section in Phase 4; per-figure in Phase 5), the skill does NOT print to chat — only at phase boundaries.

## Per-section commit + tracker update (Phase 4)

After each section commit during Phase 4:

1. Write the section to the MDX.
2. Run voice-check; fix until clean.
3. Commit (`draft <slug> §N: <claim summary>`).
4. Update `### Phase status` row for Phase 4: status = `in_progress`, output = "N of M sections drafted".
5. Don't print to chat (Phase 4 is autonomous; chat output comes at end-of-phase).

## Per-figure commit + tracker update (Phase 5)

After each figure commit during Phase 5:

1. Write the figure (static-SVG or interactive component).
2. Test locally with `bun run dev`.
3. Commit (`<slug>: fig N <figure-name>`).
4. Update `### Phase 5 figure progress` row: status = `done`, commit = hash.
5. Don't print to chat.

## When Vic resumes from a fresh context

The `### How to resume from a fresh context` block above is the canonical entry point. A fresh-context agent reads it, follows the steps, and continues from `### Suggested next batch`.

The block is included in every notes file. It's a small amount of duplication, but the alternative — making the fresh-context agent read the SKILL.md AND the notes file AND figure out where in the workflow we are — is fragile. Inlining the resume instructions is the contract.
