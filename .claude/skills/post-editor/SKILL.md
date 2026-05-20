---
name: post-editor
description: Edit a long-form blog post on augusteo.com for tightness, voice, reader-usefulness, and faithfulness. Use after a writer skill produces a draft (book-explainer-authoring, explainer-authoring) or on existing Obsidian-synced posts that need an editorial pass. Primary output is direct edits to the MDX file; a short punch-list surfaces gaps that need Vic's hand (interview-sourced personal stories, hero image selection, deeper restructuring). Triggers include "/post-editor <path>", "edit this post", "polish this draft", "tighten this", "do a final editor pass on this MDX".
---

# Post-editor skill

## Goal

> Take a draft MDX post on augusteo.com and return it shippable. The editor is not just a reviewer — it makes direct edits to the file (tightness, voice, lead-landing) and produces a short punch-list of items it cannot fix without Vic's input. The reader-usefulness lens drives every decision: the editor cuts anything that doesn't serve someone reading to think better or decide something.

The editor is general-purpose: it works on book explainers, research explainers, and Obsidian-synced posts. It is **ledger-aware when a ledger is present** (book and research explainers in `notes/<slug>.ledger.jsonl` + `notes/<slug>.md`), and degrades gracefully when not.

## When to use

- After `book-explainer-authoring` Phase 4 + `post-interview` finish, before Phase 5 figures + ship.
- After `explainer-authoring` finishes the draft prose phase.
- On an existing published Obsidian-synced post that Vic flags for a polish pass.
- Anytime Vic says "edit this", "tighten this", "polish this", "do a final editor pass".

## When NOT to use

- Brand-new posts with no draft yet — invoke a writer skill first.
- Posts being actively drafted by a writer skill — the writer's gates handle structural checks; the editor runs at the end.
- One-off Slack replies, social posts, or short content — too heavy for the job.

## Inputs

- **Required:** an MDX file path under `src/content/blog/<slug>/index.mdx`.
- **Optional (auto-detected):**
  - `notes/<slug>.md` (claim matrix, codex review notes, resume tracker — book and research explainers)
  - `notes/<slug>.ledger.jsonl` (book-source ledger — book explainers only)
  - `notes/<slug>.interview.md` (interview answers — if `post-interview` ran)

If the optional inputs exist, the editor uses them for faithfulness checks and interview-coverage. If not, the editor degrades to MDX-only mode.

## The contract

The editor produces **two outputs**:

1. **Direct edits to the MDX file** — committed as one or more commits with messages like `editor: tighten section 6 lead` or `editor: cut 3-paragraph preamble`. Vic reviews via `git diff`.
2. **A punch-list** at the end of the run, surfaced to chat. Items that the editor cannot fix without Vic's input: interview gaps, hero image selection, evidence that needs Vic's domain knowledge to weigh.

## The eight passes

The editor runs eight passes in order. The pipeline does NOT halt mid-pass on STRUCTURAL findings — instead, it direct-fixes what it can, collects the rest into the punch-list, and reports the post's final ship-gate status at the end:

- **READY** — no structural findings; all direct edits complete.
- **READY_WITH_VIC_REVIEW** — direct edits complete; punch-list contains items only Vic can resolve (interview gaps, hero handoff, evidence judgment calls). Vic can ship after working through them.
- **BLOCKED** — punch-list contains items that block ship (faithfulness drift not yet adjustable, ledger anchor broken, voice-check failures the editor couldn't fix). Editor cannot declare READY until these are addressed.

The editor only halts mid-pass on ambiguity that requires Vic's input to proceed (see "Halt-and-ask conditions" below). STRUCTURAL is not synonymous with halt; it's synonymous with "must appear on the punch-list and block READY."

Structural-finding taxonomy (the categories the editor labels findings with):

- `faithfulness-drift` — prose claims something the ledger doesn't support.
- `ledger-anchor-broken` — `[L#]` marker doesn't resolve.
- `claim-not-owned` — TL;DR lesson introduces a claim not owned by a body section.
- `material-evidence-flip` — newer source flips `weakened` → `disproven` or similar.
- `interview-bare-marker` — REVISE-WHERE-I-LAND placeholder still bare.
- `voice-check-failure` — voice-check.sh failure the editor couldn't auto-fix.
- `coverage-gap-operational` — major-claim section missing operational sentence/note.
- `coverage-gap-figure` — major-claim section missing figure decision.

Each pass is tracked as a task when the skill runs; the exact orchestration is runtime-dependent (use TaskCreate where available, otherwise a flat checklist).

### Pass 1: Above-the-fold tightness

Read the first ~50 lines of the MDX (frontmatter + lede + TL;DR + "where it gets complicated"). Cut:

- **Meta-preamble** — any sentence about "this post is a re-read of X", "the book divides into N parts", "the author runs a workshop at Y", "a note on the form". The reader didn't ask for the methodology.
- **Throat-clearing setup paragraphs** — "Before we dive in...", "Let's start by saying...", "I want to be careful to note...". Cut.
- **Self-references to the post's structure** — "in the following sections we'll...", "as we'll see below...". The reader can see what's below.
- **Hedge stacks** — "It's important to note that, in general, mostly, perhaps, sometimes...". Pick the strongest hedge that's still accurate; cut the rest.

**Direct-edit rule:** when in doubt, cut. The reader can re-add nuance from the body sections. Above-the-fold real estate is for utility, not throat-clearing.

### Pass 2: Lead-landing per section

For each H3-numbered body section:

- Read the first 1-2 sentences (the "lead" per `claim-spine.md`).
- Does the lead open with the claim + why-it-matters-for-the-reader's-life? If not, rewrite.
- Bad signatures to flag: opens with `*Type: empirical. Centrality: core.*` (kill the line); opens with `**What the book says.**` (kill the bold label); opens with "In chapter N, the author discusses..." (rewrite to claim-first).
- After rewriting the lead, verify the section still has all 6 reader-first parts (lead → book summary → operational → color → local stance → figure). If a part is missing, add to the punch-list.

**Operational layer check:** every major-claim section must have either an operational sentence ("try this when X") OR an explicit "no operational layer; conceptual scaffolding" note. Missing → add to the punch-list.

### Pass 3: Body-prose scaffolding removal

Scan the body for:

- `**What the book says.**`, `**Where the book gets it.**`, `**Boundary conditions.**`, `**What the evidence says today.**`, `**Credible critics.**`, `**Where I land.**` (legacy 9-part labels). Remove the labels; let the prose flow without them.
- `*Source quality: ...*`, `*Current state: ...*`, `*Source quality + Current state lines as italic appendices*`. Move these to the appendix table (Pass 6); remove from the body.
- Inline `- **T1:** ...` / `- **T2:** ...` bulleted critic lists in body prose. If the critic's argument changes the reader's stance, keep one inline as a flowing sentence. Otherwise move to the appendix table's Critics column.

### Pass 4: Voice + banned words + em-dashes

Run `scripts/voice-check.sh <path>`. For each failure:

- Em-dashes (outside act-divider headings) → rewrite the sentence to use commas, periods, or parentheses.
- Banned words ("foster", "delve", "tapestry", etc. per the project's voice rules) → swap for plain alternatives.
- Recursively re-run until the voice-check exits clean.

Document any unavoidable exceptions (verbatim citation titles that contain banned words) with `{/* voice-check exception: ... */}` comments.

### Pass 5: Faithfulness re-verify (ledger-aware mode only)

If `notes/<slug>.ledger.jsonl` exists:

1. Walk every `[L#…]` marker in the MDX.
2. For each marker, confirm the ledger entry exists. If not → `ledger-anchor-broken` punch-list item.
3. For each ledger entry with an `anchor_excerpt`, grep-verify the excerpt against the source file if the source file is on disk.
   - **If the source file is missing at the recorded path**: do NOT silently degrade. Add `faithfulness-verification-incomplete` to the punch-list with the missing path. Vic decides whether to point at the new path (and re-run editor) or ship with verification incomplete.
4. Read the prose surrounding the marker and the ledger entry's excerpt; flag any case where the prose has drifted (a claim has been strengthened, a hedge has been dropped, an attribution has shifted) as `faithfulness-drift`.

If the prose drift is fixable by tightening the wording without changing the claim, the editor direct-fixes it. If it requires Vic's judgment (e.g., the agent appears to have invented a quote), surface as a punch-list item and continue with the remaining passes.

### Pass 6: Audit-layer migration (appendix table)

If the MDX has body-prose audit lines (`*Source quality: ...*`, `*Current state: ...*`, inline critic bullets) AND the post does not yet have `## Appendix: claim-source-evidence table`:

1. Build the appendix table per `appendix-table.md` shape from the migrated content.
2. Insert the appendix table immediately before `## References`.
3. Remove the inline audit lines from the body prose.
4. Commit as `editor: migrate audit layer to appendix table`.

If the appendix table already exists, verify it has one row per major-claim section and that source-quality + current-state values match between body inline color and the table. Fix discrepancies.

### Pass 7: Evidence freshness re-check

For each external source cited in the body's color paragraphs OR in the appendix table:

- If it's a PubMed / preprint / journal link: check the source's record for retractions, replication notes, newer meta-analyses on the same topic.
- If it's a blog post / news article: check for edits since the cited access date.
- If it's a Retraction Watch / Data Colada citation: check for new entries on the cited research.

A material change in the current state of evidence (newer meta-analysis flips `weakened` → `disproven`, retraction appears) is STRUCTURAL — add to the punch-list. The editor cannot decide whether to incorporate; Vic does.

### Pass 8: Coverage checks (reader-utility gates)

Walk the post and verify:

1. **TL;DR is index, not synthesis.** Each lesson in `## What you can use from this book` cites `[See §N]`. No orphan-synthesis claims (every TL;DR claim is owned by a body section).
2. **Operational layer coverage.** Every major-claim section has an operational sentence OR explicit "no operational layer" note.
3. **Takeaway-artifact coverage.** Every major-claim section contributes ≥1 entry to one of the three reference layers (quote bank, vocabulary glossary, practical-model list). Walk the `## Reference layer` subheads and confirm.
4. **Illustration coverage.** Every major-claim section should have either a figure OR an explicit "no figure; prose carries this" note in the outline (`notes/<slug>.md`). Do NOT silently infer the note: if the outline lacks a per-section figure decision, surface as `coverage-gap-figure` for Vic. The only exception: if the prose itself reads as definitionally non-visual (a vocabulary distinction, a one-sentence framing) AND the editor is confident, add the explicit note as a direct edit and flag in the punch-list "added 'no figure' note for §N — verify".
5. **Interview coverage.** Walk every `{/* REVISE-WHERE-I-LAND */}` opening marker. Each must match `^\{/\* REVISE-WHERE-I-LAND(: (INTERVIEW-SOURCED|SKIPPED) \d{4}-\d{2}-\d{2})? \*/\}$` — and a bare opening (no state suffix) is `interview-bare-marker`. Add to punch-list as "interview needed for §N".
6. **Frontmatter sanity.** `draft: true` (must stay `true` until Vic flips). `essay: true` (for long-form posts). `pubDate` not in the future. `heroAlt` non-empty (or in the punch-list if hero hasn't been added yet).

## The punch-list

After the eight passes, the editor surfaces a punch-list to chat with this shape:

```
## Editor punch-list — <slug>

Direct edits made:
- Cut 3-paragraph preamble (lines 18-24 → lines 18-19)
- Migrated 12 audit-italic lines to appendix table (Pass 6)
- Fixed 4 voice-check failures (em-dashes in sections 3, 7, 9, 14)
- Tightened TL;DR (lines 26-95, ~600 words → ~480 words)
- Removed 9-part bold-label scaffolding from sections 1-15
Commits: <hashes>

Needs Vic's hand:
- §3, §7, §11: REVISE-WHERE-I-LAND blocks are bare. Run `/post-interview` to fill.
- §10: 2024 meta-analysis (link) flips Current-state from `weakened` to `disproven`. Decide whether to update prose or appendix.
- Hero image: heroAlt still placeholder. Run hero handoff or supply path.
- §6 operational sentence missing (no figure either). Decide whether the section is conceptual scaffolding (add the explicit note) or needs an action sentence.

Ready to ship after these resolve. Editor done.
```

The editor does NOT auto-resolve punch-list items. Vic addresses each, then optionally re-runs the editor for a follow-up pass.

## Hard rules

1. **Direct edits, not just reviews.** The editor commits direct changes to the MDX for anything it can fix without Vic's input. The punch-list is the leftover.
2. **Reader-usefulness drives most decisions, UNLESS cutting weakens fidelity, boundary conditions, or Vic's voice.** When in doubt, cut — but never cut a boundary condition that changes how the reader applies the idea, never cut a faithfulness-anchored quote, never cut Vic's interview-sourced prose.
3. **Faithfulness drift goes on the punch-list, doesn't halt mid-pass.** The post cannot ship while drift is unresolved (BLOCKED status), but the editor continues collecting findings across all passes before reporting.
4. **`draft: true` stays `true`.** The editor never flips draft to false; that's Vic's gesture only.
5. **No structural rewrites without Vic.** The editor tightens, removes scaffolding, migrates audit detail, fixes voice. It does NOT reorganize sections, swap chapter ordering, or rewrite the post's argument. Structural rewrites are Vic's call (or a re-run of the writer skill).
6. **Ledger-aware when ledger present; graceful degradation when not.** A non-ledger MDX still gets Passes 1-4 and 7-8 (faithfulness pass and appendix-migration pass become no-ops).
7. **Commit cadence: default is one commit per pass with non-trivial changes**, but tiny edits across many sections may be batched into a single "editor: tightness sweep" commit to avoid noise. The editor decides per run; Vic can rebase if he prefers different granularity.
8. **Idempotency.** Re-running the editor on an already-edited MDX must be safe: no double-migration of audit lines, no duplicate appendix tables, no rewriting prose the editor already canonicalized. The editor reads the MDX state first and only edits what needs editing.
9. **Citations re-validation after edits.** When the editor rewrites a sentence with an inline source link, it must verify the link still supports the rewritten claim. If the rewrite materially changes the claim, flag for Vic as `citation-mismatch`.
10. **Major-claim detection fallback.** When no claim matrix exists, the editor treats every H3 numbered section (`### N. ...`) as a major-claim section. The skill names this assumption when running in MDX-only mode.

## Halt-and-ask conditions

The editor only halts mid-run on ambiguity that requires Vic's input to make any further progress. All other findings go on the punch-list and the editor continues.

- Pass 6 can't infer which body claim a stray audit line belongs to → halt, surface (the editor literally cannot place the line otherwise).
- Pass 8 finds the post has no claim matrix AND no H3 numbered sections (so the fallback also fails) → halt, ask Vic which sections are major.
- Pass 4 (voice) recursively re-runs and still fails after 3 attempts → halt, surface the residual failures; Vic decides whether to add `voice-check exception` comments or rewrite manually.

Faithfulness drift, retractions, evidence flips, bare interview markers, and figure-coverage gaps do NOT halt mid-run. They go on the punch-list and the editor continues to the next pass.

## Composition with other skills

- Runs after `book-explainer-authoring` Phase 4 + `post-interview`.
- Runs after `explainer-authoring` final draft.
- May run on existing Obsidian-synced posts.
- Reuses `scripts/voice-check.sh` for voice checks.
- Reuses the `codex` skill for an optional second-opinion pass on the punch-list before declaring ship-ready. Default: do NOT auto-codex; Vic invokes it explicitly if wanted.
- Does NOT invoke figures or interviews — surfaces gaps for those skills.

## Output structure

```
src/content/blog/<slug>/index.mdx   # edited in place
notes/<slug>.md                     # if it exists, appended `## Editor pass YYYY-MM-DD` with the punch-list
git history                         # one commit per pass with non-trivial changes
chat                                # the punch-list, printed for Vic's review
```

## Verification

After the eight passes:

- `scripts/voice-check.sh src/content/blog/<slug>/index.mdx` exits clean.
- No `**What the book says.**`-style bold-label scaffolding remains in body prose.
- No inline `*Source quality: ...*` / `*Current state: ...*` italic audit lines remain in body prose.
- All `[L#…]` markers resolve to ledger entries (if a ledger exists).
- The frontmatter has `draft: true`, real `pubDate`, valid `heroAlt` (or it's on the punch-list).
- The punch-list is surfaced to chat with all unresolved items.
