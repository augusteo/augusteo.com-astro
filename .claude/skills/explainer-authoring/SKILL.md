---
name: explainer-authoring
description: Long-form research-and-write blog post on augusteo.com for research topics (NOT books — see routing). Drives a seven-phase pipeline (lock-in, research + claim-source matrix, outline, draft, figures, playwright, ship) with three auto-firing codex gates (research truthfulness, outline structure, final draft). Handles three entry modes: topic-from-scratch, HTML-import, and resume. Triggers include "narrative post on X", "deep prose post on X" (X = research topic, not a book title), "interactive explainer", "ciechanow.ski-style", "post with sliders / scrubbers / drag", "research X and write a post", "let's plan a new flagship", "continue the X explainer", "pick up the X post", "convert this html to a post", "import this explainer", or any path to a `*_explainer.html` / `vision_*.html` file. **For book-based posts (EPUB / PDF / MOBI input, or any request to explain / summarize / fact-check a specific book), use `book-explainer-authoring` instead.** For short Obsidian-vault posts, use `bun run sync`.
---

# Explainer authoring pipeline

## Goal

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

This goal statement gets quoted into all three codex gate prompts so adversarial review pulls in the same direction.

## When to use

- Vic gives a topic and asks for a deep post (whether static or interactive figures).
- Vic gives a path to a `*_explainer.html` file or says "convert this html to a post".
- Vic says "continue the X explainer", "pick up the X post", or names a topic that already has a `notes/<post-slug>.md` file.
- Vic asks to implement specific figures from a post that's already drafted.

## When NOT to use

- Short Obsidian-vault posts: use `bun run sync` (the existing Obsidian pipeline).
- Topics that fail Phase 1's source bar (fewer than 3 viable primary sources after the research budget is exhausted): halt and ask Vic.

## Mode detection (precedence)

**Pre-rule (route to a different skill):** if Vic's message contains a path to a `*.epub`, `*.pdf`, or `*.mobi` file, OR explicitly asks to explain / summarize / fact-check a specific book by title, route to `book-explainer-authoring` instead. The book skill enforces faithfulness to source via a book-source ledger; this skill optimizes for narrative arc and would drift on book content (the Scout Mindset failure). Halt this skill and invoke the book skill.

Otherwise, detect the entry mode from Vic's first message using **this precedence; the first rule that matches wins:**

```
1. Vic's message contains a filesystem path matching `*.html` (anywhere in
   the string, even inside a sentence like "convert /Users/vic/Downloads/foo.html
   to a post") → HTML-import mode candidate.
   Validate the path:
   - Path doesn't exist on disk → halt and ask Vic to confirm the path.
   - Path is a URL (https://) → halt and ask Vic to download it locally first.
   - Path exists but is unreadable → halt and ask Vic to fix permissions.
   - Path exists but doesn't match Vic-style explainer (no <h1> + signature
     class) → halt and ask Vic whether to import anyway, treat as topic, or
     abandon. See html-import.md "Input validation".
   File-path beats every keyword once validation passes.

   Special collision case: HTML path provided AND notes/<slug>.md already
   exists for the slug derivable from the HTML's <h1>. This means Vic is
   either (a) re-importing the same HTML over an in-flight post, or (b)
   importing a different HTML whose slug happens to collide. Halt with one
   AskUserQuestion: "resume the existing post (ignore HTML)", "abandon the
   in-flight post and re-import", or "use a different slug for the import"
   (slug-derivation halts on collision; this is the only place Vic can
   pick a manual slug).

2. No HTML path AND notes/<slug>.md exists for a slug derivable from Vic's
   message (apply slug derivation rule below) → resume mode.

3. Otherwise → topic mode.
```

Tie cases (e.g. "write a post about this HTML explainer" with no path): treat as topic mode. The Phase 1 ambiguity probe will catch genuinely ambiguous intent.

## Slug derivation rule (unified for all modes)

```
1. Take the strongest noun phrase from the topic / HTML <h1> / Vic's message.
2. Lowercase, strip articles ("the", "a", "an"), strip filler ("how does",
   "an introduction to"), join with hyphens.
3. Cap at 6 words.
4. If the resulting slug already exists at notes/<slug>.md OR
   src/content/blog/<slug>/, halt and ask Vic for an alternative.
```

## Companions to read

Read these in order before starting any phase. Files marked **(shared)** live in `.claude/explainer-shared/` and are referenced via `../../explainer-shared/<file>`; the rest are local to this skill.

- `../../explainer-shared/voice-rules.md` **(shared)** — the full "Write Like a Human, Not an AI" guide. Apply during drafting, not as cleanup.
- `research-protocol.md` — primary-source decision tree, per-claim recency rule, throughline ladder, fact-check mode, Phase 7 freshness pass.
- `narrative-template.md` — three-act section scaffold, throughline rhythm, section-connection check.
- `../../explainer-shared/illustration-style.md` **(shared)** — inline SVG conventions for static figures (palette, typography, figcaption shape, viewBox).
- `../../explainer-shared/figure-kit.md` **(shared)** — the seven Svelte primitives, palette tokens, when to use Canvas2D vs SVG vs Plot.
- `../../explainer-shared/figure-recipes.md` **(shared)** — cookbook patterns + the static-default rule + per-figure-type unlock protocol.
- `codex-prompts.md` — explainer-specific gate prompts. Uses `../../explainer-shared/codex-runner.md` for the shared runner mechanics.
- `../../explainer-shared/playwright-checks.md` **(shared)** — per-figure-type failure modes for the visual review phase.
- `html-import.md` — HTML-to-MDX conversion playbook (HTML-import mode only).

## The seven phases

Each phase becomes a TaskCreate when the skill runs. Phases are gates; do not skip ahead. A run may complete in one session (typical for short static posts) or span multiple (typical for interactive flagships); the `## Resume here` tracker is mandatory either way.

```
Phase 1: lock-in
   ├─ topic mode: ambiguity probe → research sweep → spec synthesis → one approval gate
   ├─ HTML-import mode: validate HTML → convert to MDX → extract spec/throughline/outline
   └─ resume mode: read notes file + run migration → continue from tracker

Phase 2: research / fact-check
   ├─ topic mode: parallel subagents build research notes from sources
   ├─ HTML-import mode: parallel subagents fact-check imported claims
   └─ Both produce a ## Claim-source matrix as a required deliverable
   → Gate 0 (codex on research notes + matrix)

Phase 3: outline + figure list
   → Gate 1 (codex on outline + matrix + throughline)

Phase 4: draft prose
   ├─ topic mode: section by section, with per-section "what reader now sees" check
   └─ HTML-import mode: SKIPPED. Imported MDX is the draft. Voice-check still runs;
                       skill auto-repairs failures.

Phase 5: implement figures
   ├─ NEW figures: static-default rule with four override clauses
   └─ IMPORTED figures: preserved as auto-classified (static-svg or imported-interactive)

Phase 6: playwright per-figure visual review

Phase 7: pre-ship freshness pass + link/citation audit + Gate 2 + hero hand-off + ship
   → link + citation audit (fetch every link; verify identity, verbatim quotes,
     number attribution, claim support, relevance clarity — see research-protocol.md)
   → Gate 2 (codex on full draft, walks every claim against the matrix)
```

Phase 1's first action is to detect the mode, then enter the appropriate phase-1 sub-flow.

## Phase 1: lock-in (mode-specific)

Goal: a `notes/<post-slug>.md` file exists with `## Spec`, `## Throughline`, `## Outline` (HTML-import only at this phase), and `## Resume here` sections; a project-memory pointer + MEMORY.md entry are verified to exist; the next phase is unambiguous.

### Phase 1 — topic mode

1. **Ambiguity probe (NARROWED — only fires on truth-blocking ambiguity).** Parse Vic's first message for two **truth-blocking** dimensions only:
   - (a) **Topic identity**: is the topic itself ambiguous? ("write about caching" → which caching? memory? CDN? L2? Halt and ask.) ("how attention works in transformers" → unambiguous; proceed.)
   - (b) **Sourcing feasibility**: is the topic so niche or proprietary that the research sweep cannot plausibly find primary sources? ("write about our internal X service" → halt and ask: do you have docs to seed? does it have a public-facing component?)

   Audience, angle, and scope are NOT truth-blocking — research can infer them from how the topic is discussed in primary sources. Don't ask Vic about audience/angle just because it's not stated; let research return its inference and Vic adjusts at the spec-approval gate.

   If neither (a) nor (b) is ambiguous, skip the probe entirely. Vic's "less questions for me" mandate means inference > interrogation. If both are ambiguous, halt with **one** consolidated `AskUserQuestion` (max 2 fields, the truth-blocking ones).

2. **Research sweep (budgeted).** Dispatch parallel research per `superpowers:dispatching-parallel-agents`. Hard budget:
   - max 2 Explore agents in parallel
   - max 12 web queries total across both
   - max 8 candidate sources returned
   - max 8-min wall clock

   Each subagent's prompt names the topic, requests:
   - 5-8 candidate primary sources (per the decision tree in `research-protocol.md`) with arxiv IDs / commit hashes / publication dates.
   - 2-3 candidate real-world throughlines (concrete scenarios that recur).
   - Inferred audience shape (engineers / researchers / infra ops).
   - Intuition-ramp shape: smallest interesting case → natural top end.

3. **Synthesize candidate spec:**
   - One-paragraph "what / who / walk-away".
   - Topic-evolution classification: actively-evolving (12-month bar) vs stable (18-month bar). Locked.
   - Throughline pick (lead candidate + one alternate per the fallback ladder in `research-protocol.md`).
   - Target length (default ~30-min read; override only if research suggests it).
   - Title sketch.
   - Figure-style mix (default 100% static; only flag interactive candidates that meet one of the four override clauses in `../../explainer-shared/figure-recipes.md`).
   - Top 5-8 starter sources with arxiv IDs / dates.

4. **Approval gate.** Present the candidate spec to Vic as a single `AskUserQuestion` with options: "approve as-is", "approve with edits" (Vic's edit text comes back as one structured response and is applied wholesale), "redirect" (back to step 1), "I'll seed sources" (Vic provides sources, restart at step 2 with those as inputs).

5. **Persist.** On approval: write `notes/<post-slug>.md` with `## Spec`, `## Throughline`, and `## Resume here` sections. Initialise the resume tracker per the format below.

6. **Project-memory verification (REQUIRED, halt if missing).** Drop project-memory entry at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_post.md` AND add a one-line MEMORY.md pointer at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/MEMORY.md`. **Verify both files exist** with `ls` before moving to Phase 2; halt if either is missing. (This is the discovery mechanism for fresh-context resume; the path coupling is intentional.)

7. **Phase 1 fallback (gradient, not binary).** Apply the source-quality gradient from `research-protocol.md`'s "Viable primary source" section:
   - 3+ viable sources: proceed to spec synthesis (happy path).
   - 2 viable + 1 marginal: proceed; the marginal-backed claim is flagged in `## Spec` for Phase 2 to upgrade or hedge.
   - 2 viable, no marginal: invoke `superpowers:brainstorming` to ask Vic for seed sources, then re-run the sweep with those as starting points.
   - 3+ marginal, 0 viable: invoke `superpowers:brainstorming`. Three weak sources do not compound to one strong one.

   The fallback path is the only place chained Q&A can re-enter outside the ambiguity probe.

### Phase 1 — HTML-import mode

Read `html-import.md` end-to-end before starting. The full conversion playbook lives there.

1. **Validate input.** HTML must have `<h1>` and at least one signature class (`.callout`, `.aside`, `.act-divider`, `.lead`, `.keyterm`).
2. **Strip chrome** per `html-import.md`.
3. **Walk body** applying the conversion table.
4. **Normalize SVGs** per the rules in `html-import.md`.
5. **Auto-classify each `<figure>`:** `static-svg` (inline SVG, no scripts/handlers) or `imported-interactive` (has `<canvas>`, `<script>`, `on*=` handlers, or JS-lib references). For `imported-interactive`, run the safety review checklist in `html-import.md` before accepting.
6. **Slug-collision check** against `src/content/blog/<slug>/`. Halt if exists (mode-detection layer should have caught most cases; this is the belt-and-suspenders check).
7. **Write** `src/content/blog/<slug>/index.mdx` **with `draft: true`**. Both skill modes always create posts as `draft: true` (see hard rule #9). The flag stays `true` for the entire pipeline; Vic flips it to `false` as an explicit ship action.
8. **Write** `notes/<slug>.md` with:
   - `## Spec` extracted from `<h1>` + `<p class="dek">`.
   - `## Throughline` per the extraction-or-synthesis flow in `html-import.md`. Halt and ask Vic if neither extraction nor fallback-ladder synthesis works.
   - `## Outline` extracted from `<h2 id="sN">` headings.
   - Initial figure table with auto-classified types.
   - `## Resume here` initialized at "Phase 1 done, Phase 2 (fact-check) next. MDX is `draft: true` (stays `true` until Vic ships)."
9. **Project-memory verification (REQUIRED, halt if missing).** Same as topic-mode step 6.

### Phase 1 — resume mode

1. **Read `notes/<slug>.md` end-to-end** before any other action. The Spec, Throughline, Research notes, Outline, and Codex review sections carry every locked-in choice. Treat them as ground truth.
2. **Run migration if needed.** The v2 canonical section order is:

   ```
   # <Post Title>
   ## Spec
   ## Throughline
   ## Research notes
   ## Claim-source matrix
   ## Related posts on augusteo.com
   ## Outline
   ## Codex research review     (appears after Gate 0 fires)
   ## Codex outline review      (appears after Gate 1 fires)
   ## Codex final review        (appears after Gate 2 fires)
   ## Resume here
       ### Phase status
       ### Codex history
       ### Phase 5 figure progress
       ### Suggested next batch
       ### How to resume from a fresh context
       ### Hard rules to keep applying
   ```

   For each section in the canonical order, check whether it exists. If missing, insert at the canonical position with a stub:

   - `## Throughline` — `*Pre-v2 post; throughline added retroactively or skipped.*` Inserted between `## Spec` and `## Research notes`.
   - `## Claim-source matrix` — `*Pre-v2 post; matrix not retroactively populated.*` Inserted between `## Research notes` and `## Outline`.
   - `## Related posts on augusteo.com` — `*Pre-rule post; related-posts scan not retroactively run.*` Inserted between `## Claim-source matrix` and `## Outline`. The stub is treated as forward-looking; Gate 2's cross-reference check is a no-op when this stub is the entire body of the section. (If the resumed post is past Phase 4 already, retroactive scanning + linking would force prose / References edits the post wasn't built around. Forward-looking is the right call; new posts under the rule do the work in Phase 2.)
   - `### Codex history` — empty table header `| Date | Gate | Outcome | Findings file |\n|---|---|---|---|`. Inserted as the first sub-section under `## Resume here`, after the "Last touched" line and before any other `### …` section.

   Other v2 fields (topic-evolution classification, per-row recency status, figure type locks, imported-interactive classification, Gate 1 unlock state, freshness metadata) are NOT retroactively populated; they are forward-looking — only required for posts started under v2. The migration only needs to add the section stubs so the post file matches the canonical shape and a fresh-context agent doesn't trip on missing sections.

   **Idempotency and structural validation:** if all v2 sections already exist (e.g., a second resume), the migration is a no-op. Don't append duplicate stubs. Beyond presence, also validate structure:

   - **No duplicate sections.** Walk the file looking for headings that appear twice (`## Spec` appearing twice, `## Resume here` appearing twice). If a duplicate exists, halt and surface to Vic — don't silently merge or pick one. Likely cause: a previous run or hand-edit created a malformed file.
   - **Canonical order.** The sections must appear in the canonical order listed above. If sections are present but out of order (e.g., `## Outline` before `## Research notes`), halt and surface to Vic. Re-ordering automatically risks losing content; let Vic make the call.
   - **Required tables have valid headers.** `## Resume here` → `### Phase status` must have a header row matching `| Phase | Status | Output |`. `### Codex history` must have a header row matching `| Date | Gate | Outcome | Findings file |`. `### Phase 5 figure progress` (if present) must match `| # | Figure | Type | Status | Commit |`. If any required table has a malformed or missing header, repair only the header (don't touch table body rows). Commit the header fix as a separate `fix tracker table header` commit before proceeding.
   - **`## Resume here` has a `Last touched: YYYY-MM-DD` line.** If missing, add today's date.
   - **No empty Phase status table.** If `### Phase status` exists but has zero body rows, halt and surface to Vic — the resume tracker has been wiped and needs reconstruction, not migration.

   Validation runs BEFORE the missing-section migration. If validation halts, the migration commit is not made; the file is left as-is for Vic to fix.

   Commit the migration as a single-purpose commit (`migrate notes/<slug>.md to v2 canonical shape`) only if validation passed AND at least one stub was inserted. Skip the commit if the migration was a no-op.

3. **Read the `## Resume here` tracker.** Pick the next batch from the tracker.
4. **`git log --oneline | head -30`** to see commits since the spec commit.
5. **`grep -n TODO src/content/blog/<post-slug>/index.mdx`** for remaining figure placeholders.
6. **Continue from the phase named in the tracker.** Do NOT re-run any earlier phase.

## Phase 2: research / fact-check (with claim-source matrix)

Goal: a `## Research notes` section with primary sources quoted directly, AND a `## Claim-source matrix` mapping every load-bearing claim to a quoted excerpt + source ID + recency status. This phase determines whether the post can stand up to scrutiny.

### Phase 2 — topic mode

1. Read `research-protocol.md` for the primary-source decision tree, per-claim recency rule, and search strategy.
2. **Decompose the topic into 2-3 sub-topics.**
3. **Dispatch the subagents in parallel** per `superpowers:dispatching-parallel-agents`. Each subagent's prompt:
   - Names the sub-topic and the specific claims that need backing.
   - Inlines the primary-source decision tree verbatim from `research-protocol.md` (subagents run from the repo root and would not resolve a bare filename).
   - Required output: quoted excerpts with arxiv IDs, commit hashes, publication dates, access dates, grouped by claim. Bare URLs are not enough.
4. Read every starter resource Vic provided yourself (do not delegate this).
5. **Build the claim-source matrix** as a required deliverable. For every load-bearing assertion the post will make:

   ```markdown
   ## Claim-source matrix

   | # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID (arxiv / URL / commit + date) | Recency status |
   |---|---|---|---|---|
   | 1 | "Llama 3 70B was trained on 1024 H100s" | "...trained on 1024 NVIDIA H100 GPUs..." | arxiv:2407.21783 (2024-07-31) | actively-evolving / 12-month bar / passes |
   | 2 | "FSDP shards optimizer state across DP ranks" | "...optimizer state is sharded across data-parallel ranks..." | arxiv:2304.11277 (2023-04-22) | stable / 18-month bar / passes |
   ```

   The matrix is the contract. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row.

6. Merge subagent outputs into `notes/<post-slug>.md` under `## Research notes`. Group by sub-topic, not by source.
7. Where a small reference implementation is feasible, run it. Save to `notes/<post-slug>-reference.<ext>`.
8. **Scan augusteo.com for related existing posts.** `ls src/content/blog/` and pick topic-adjacent slugs by name; for the strongest 1-3 candidates, read the post and note (a) what it covers that this post can build on or contrast with, and (b) one or two natural **prose** anchor points in the new post's outline where an inline link or callback fits (typical anchor points: the dek, the opening setup paragraph of Act 1, a section that reuses a concept defined in the prior post, the closing italic line). The `## References` block is NOT an anchor point — every related post automatically gets a References entry in Phase 4 step 5; anchor points are for inline prose links only. Record findings under a `## Related posts on augusteo.com` subsection in the notes file with: slug, link path (`/blog/<slug>`), one-line summary of what it covers, and the prose anchor points. The newer post does the linking; older posts are NOT retroactively edited.
9. Show Vic the notes file + matrix. Ask if anything is missing or wrong.
10. Update the `## Resume here` tracker: phase 2 → done.
11. **Run Gate 0** (see Codex gates below).

### Phase 2 — HTML-import mode (fact-check)

Same deliverables (`## Research notes` + `## Claim-source matrix`), different subagent framing. Subagents are seeded with the imported claims:

> "Here is a draft post making claims X, Y, Z. For each claim, find a primary source that backs or refutes it. If no primary source can be found, classify the claim as UNSUPPORTED."

For each claim, status is one of:
- **SUPPORTED:** primary source quoted in the matrix.
- **UNSUPPORTED:** no primary source found.
- **CONTRADICTED:** primary source disagrees with the imported claim.

For UNSUPPORTED or CONTRADICTED claims, run the **unsupported-claim repair workflow** in `html-import.md`. The skill repairs the prose; Vic does not. Each repair is its own commit. Voice-check exits clean before each commit.

**Also run the augusteo.com related-posts scan + apply** (HTML-import mode does the work inline because Phase 4 is skipped; there's no later phase that would weave links). Procedure:

1. Same scan as topic-mode step 8: `ls src/content/blog/`, pick topic-adjacent slugs, read the strongest 1-3 candidates, record `## Related posts on augusteo.com` in the notes file with slug, `/blog/<slug>` link path, one-line summary, and the prose anchor points. The `## References` block is NOT an anchor point.
2. **Apply the rule directly to the imported MDX:**
   - For each recorded related post, edit the imported `src/content/blog/<post-slug>/index.mdx` to add inline markdown links at each named prose anchor point using `[Title](/blog/<slug>)` (root-relative).
   - Add each related post to the imported MDX's `## References` section as a top entry using `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` (full https URL — matches the canonical `omni-modal-stack` ↔ `unified-vision-stack` pattern).
   - If the import is a sequel/follow-up, add the italic dek under the H1 and the optional closing italic line per the Phase 4 step 7 pattern (use root-relative `/blog/<slug>` paths).
3. Each related-post application is its own commit (same shape as the unsupported-claim repair commits). Voice-check exits clean before each commit.

Run Gate 0 after the matrix is populated and repairs are committed (related-post applications included).

**On Gate 0 acceptance** (no STRUCTURAL findings, or all STRUCTURAL findings fixed): record the acceptance in `## Codex research review` and the Codex history table, and proceed to Phase 3. **Do NOT flip the draft flag.** The MDX stays `draft: true` for the rest of the pipeline; Vic flips to `draft: false` explicitly when shipping (see hard rule #9). The post is now in the same shape as a topic-mode post post-Phase-2: drafted, fact-checked, ready for outline review.

## Phase 3: outline + figure list

Goal: a section structure plus a numbered figure table where every figure carries its implementation type, and the throughline threads through every act.

1. Read `narrative-template.md` for the three-act shape, throughline rhythm, and per-section rhythm.
2. Sketch the section list. Number sections (`### 1. ...`, `### 2. ...`). Use act dividers between major narrative turns.
3. For each section, list the figures it needs. Per-figure spec: mechanism, what the reader should walk away noticing, **and the figure type:**
   - `static-svg` — inline `<svg>` in MDX, no JavaScript. **Default.**
   - `interactive-canvas` — Canvas2D wrapper with kit primitives. Use only if one of the four override clauses applies (see `../../explainer-shared/figure-recipes.md`).
   - `plot` — multi-curve line chart via the kit's `<Plot>` primitive. Use for comparisons across time/iterations/scale.
   - `imported-interactive` — HTML-import mode only; preserved as-is.
4. Verify the throughline threads through every act (see `narrative-template.md`'s "Throughline rhythm").
5. Append the outline + figure table to `notes/<post-slug>.md` under `## Outline`. Columns: `# | Figure | Type | Mechanism | Reader notices`.
6. Show Vic the outline. Iterate until the figure list is locked.
7. Update the `## Resume here` tracker: phase 3 → done; populate the per-figure status table.
8. **Run Gate 1** (see Codex gates below).

For HTML-import mode, this phase is light: confirm the extracted outline + figure table from Phase 1; if Gate 1 finds figure-list problems, apply the per-figure-type unlock protocol.

## Phase 4: draft prose (topic mode only)

Goal: a working MDX file with section prose and figure placeholders.

**HTML-import mode skips this phase.** The imported MDX is the draft. Voice-check runs against it; the skill auto-repairs any failures (em-dashes replaced with appropriate punctuation; banned words rewritten unless they're real technical terms with a one-line comment naming why they stay).

1. Create `src/content/blog/<post-slug>/index.mdx` with frontmatter per `src/content.config.ts` and `../../explainer-shared/mdx-output-spec.md`:
   - `title`, `description`, `pubDate`, `tags`, `featured: false`, `draft: true`, `essay: true`.
   - `heroAlt: "TODO: hero image not yet selected"` placeholder so the content collection validates.
   - Omit `heroImage` (Phase 7 adds it).
2. Draft section by section. For each section: state the claim, drop a figure placeholder (`{/* TODO: Fig N: <mechanism> */}` for static, `{/* TODO: <FigureName /> */}` for interactive), tell the reader what to notice, then explain the mechanism, then hand off.
3. **Per-section "what reader now sees" check.** After each section, write a one-line HTML comment in the MDX: `{/* Reader can now: <one-line description of what they can predict/see/do that they couldn't before> */}`. If the line can't be written, halt and rework before the next section.
4. **Apply voice rules during drafting** (see `../../explainer-shared/voice-rules.md`). After each section, run `scripts/voice-check.sh src/content/blog/<post-slug>/index.mdx`. Re-run until clean.
5. **Emit a `## References` section** at the end of the post by transcribing every quoted primary source from the matrix. One Markdown link per source: title, authors (or org), year, arxiv ID or URL. Every entry must be a real `[title](url)` hyperlink — never a bare title-and-author string. **Also include the related posts** identified in Phase 2's `## Related posts on augusteo.com` subsection — list each as the FIRST entry / entries in `## References` using the form `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` (full https URL, matching the canonical `omni-modal-stack` ↔ `unified-vision-stack` pattern at `src/content/blog/omni-modal-stack/index.mdx:1431`: `## References` always uses absolute https URLs because the section is a bibliography that may be consumed off-site; in-post prose links use root-relative `/blog/<slug>` per step 7). Prequel/sequel/companion entries appear at the top of References alongside primary sources, not in a separate block.
6. **Hyperlink inline named-source mentions.** Whenever the prose names a specific external writeup, paper, post, postmortem, or report, wrap the named phrase in a markdown link to the same URL used in the References section.
7. **Cross-reference related augusteo.com posts in prose.** From the `## Related posts on augusteo.com` notes-file section, weave links at the anchor points identified in Phase 2. Pattern (per `omni-modal-stack`): if the new post is a sequel/follow-up, lead with an italic dek line under the H1 (`*A sequel to [The Title](/blog/slug). <one-line setup of what's picked up>. About a <N>-minute read.*`); add at least one inline link in the opening setup of Act 1 that names the prior post and what it established; close with an optional italic line at the very end (`*Sequel to [The Title](/blog/slug), written <Month Year>.*`). For non-sequel topical overlaps, just inline-link at the anchor point — no dek framing. Use root-relative paths (`/blog/<slug>`) for in-post links; full `https://augusteo.com/...` URLs only inside `## References`.
8. **Throughline callbacks** per `narrative-template.md`'s "Throughline rhythm".
9. Commit per section. After each commit, update the `## Resume here` tracker.
10. When all sections are drafted, update the tracker: phase 4 → done.

## Phase 5: implement figures

Goal: every figure placeholder replaced with a working implementation.

The implementation path forks by figure type.

### For NEW figures (topic mode + HTML-import mode where Gate 1 demanded a new figure)

Apply the **static-default rule** from `../../explainer-shared/figure-recipes.md`. Default to `static-svg`; switch to `interactive-canvas` or `plot` only if one of the four override clauses applies.

#### Static-SVG figures

1. Read `../../explainer-shared/illustration-style.md` for palette, typography, figcaption shape, viewBox conventions.
2. Replace the placeholder with `<figure><svg viewBox="0 0 680 ...">...</svg><figcaption>...</figcaption></figure>` directly in the MDX.
3. Mirror the existing post's design language (palette, font stack, stroke widths, figcaption shape). No new design language without proposing it to Vic first.

#### Interactive-canvas / plot figures

A reactive figure is **two files plus an MDX import**: a pure draw function in TS, a per-figure Svelte wrapper that owns reactive state, and an MDX import that places the wrapper inside `<Figure>`. Read `../../explainer-shared/figure-kit.md`'s "Astro hydration" section before starting your first interactive figure of the post.

1. **Draw function** at `src/figures/<post-slug>/<figure-name>.ts`. Pure `draw(ctx, data, t)`. Pull palette from `@figures/shared`.
2. **Wrapper component** at `src/components/figures/<post-slug>/<FigureName>.svelte`. Owns `$state`, renders `<Canvas2D>` or `<Plot>` plus `<div class="controls">`.
3. **MDX usage:** import the wrapper, place inside `<Figure caption=".." figNum={N}>` with `client:visible`.
4. Use only the seven kit primitives. New primitives need explicit Vic approval.

### For IMPORTED figures (HTML-import mode)

`imported-interactive` figures are kept as-is. Phase 5 is light: spot-check imported SVG against `../../explainer-shared/illustration-style.md` rules (palette, font swaps, viewBox); fix violations.

### For all figures

5. Test each figure in `bun run dev` before moving to the next. View at `http://localhost:4321/blog/<post-slug>` (or 4322 if 4321 is busy).
6. Commit per figure. After each commit, update the `## Resume here` tracker.
7. **Batch by session.** Aim for 2-4 interactive figures per session, more for static. After each batch, update the tracker and stop.

## Phase 6: playwright visual review (per-figure)

Goal: every figure renders cleanly at the actual post route.

1. Start `bun run dev` in the background.
2. Use the playwright MCP server (`mcp__plugin_playwright_playwright__*`) to navigate to `http://localhost:4321/blog/<post-slug>`.
3. For each figure: scroll into view, snapshot, read the screenshot back. Run universal checks plus type-specific checks from `../../explainer-shared/playwright-checks.md`.
4. If a figure fails: edit the SVG or wrapper, re-snapshot. Stop when it passes.
5. **Halt rule.** If a single figure fails review three times in a row, halt and surface to Vic.
6. Update the `## Resume here` tracker as figures pass.

## Phase 7: pre-ship freshness pass + Gate 2 + hero hand-off + ship

Goal: the post ships with current sources, no claim drift, and a real hero image.

1. **Freshness re-check.** Re-query every source in `## Claim-source matrix`:
   - For arxiv: check for v-bumps newer than the cited version.
   - For blog posts / docs: check for edits since the cited access date.
   - For repos / commits: check for substantive commits since the cited hash.
   For each row: if a newer version exists AND the claim is affected, halt and update the matrix + prose. If the newer version doesn't change the claim, just bump the access date.
2. **Force `pubDate := today`** in the frontmatter so publication date matches reality.
3. **Run Gate 2** (see Codex gates below).
4. **Final `voice-check.sh` pass** on the full file. Em dashes: zero. Banned words: zero or justified.
5. **Hero hand-off.** Follow `../../explainer-shared/hero-handoff.md`: compose the prompt with every slot filled in, wait for Vic to paste a path or say "skip", validate, copy to `src/assets/blog/<slug>/hero.<ext>`, view via Read, propose `heroAlt`, edit frontmatter.
6. **Verify.** Confirm `draft: true` (it stays `true` — Vic flips to `false` himself when shipping; see hard rule #9), `essay: true`, real `heroImage`, real `heroAlt`. Walk every figure, read the post end-to-end at `http://localhost:4321/blog/<post-slug>`. Lighthouse: LCP under 2.5s on cold load.
7. **Final commit** naming the post.
8. **Update the `## Resume here` tracker:** phase 7 → done. Optionally remove the MEMORY.md "in progress" pointer (the project memory entry can stay as a build record).

## Three codex gates (auto-firing)

All gates invoke the project-local `codex` skill. They auto-fire at phase boundaries; Vic does not need to type `/codex`. Per-gate inputs (prompt template, embedded notes sections, gate label, halt rule, notes-section name) live in [`codex-prompts.md`](codex-prompts.md). Shared runner mechanics (build-prompt → invoke-codex → size-policy → Codex history row → parse findings → 3-rerun cap → Step-6a override safeguard → proof-of-fire) live in [`../../explainer-shared/codex-runner.md`](../../explainer-shared/codex-runner.md).

Each phase that has a gate calls the runner with the gate's per-gate inputs. The runner's Step-5 fork for `TYPE-CHANGE STRUCTURAL` (Gate 1 only) routes to the per-figure-type unlock protocol below.

### Gate 0: research-notes + claim-source matrix truthfulness pass

**When:** end of Phase 2.

**Input:** `## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + topic-evolution classification.

**Halt rule (expanded):** halt on any of: fabricated quote, misattributed source, unsupported load-bearing claim that survived Phase 2 repair, secondary source masquerading as primary, stale row not annotated by Vic, omitted contradicting source.

### Gate 1: outline + research structural pass

**When:** end of Phase 3.

**Input:** `## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + `## Outline` + figure table.

**Focus:** unsupported claims, structural gaps, missing rungs, dead-weight figures, dead-weight sections (if section N were removed, would N+1 still land?), throughline-thread holes, figure-type misfits (triggers unlock protocol).

### Gate 2: final-draft pass

**When:** Phase 7, after freshness re-check, before ship.

**Input:** full MDX + full notes file (`## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + `## Related posts on augusteo.com` + all prior `## Codex … review` sections).

**Focus:** drift between prose and matrix, weak arguments, subtly wrong models, References-section completeness + hyperlinking. PLUS:
- Walk every prose claim. Find the matrix row that supports it. Flag any claim with no matrix row.
- Verify the freshness re-check from Phase 7 actually fired. Flag any matrix row whose source date is older than the topic-evolution bar.
- **Verify cross-references to related augusteo.com posts.** For every entry in the notes file's `## Related posts on augusteo.com` section, confirm: (a) it appears as a real `[Title](/blog/<slug>)` **root-relative** link in the prose at one of the anchor points the notes file named, AND (b) it appears as an entry in the post's `## References` section using the **full https URL form** `[Title](https://augusteo.com/blog/<slug>)`. Flag any related-post entry that the notes file recorded but the prose / References don't carry, AND flag any URL-form mismatch (root-relative inside References, or full https inside prose). The check is a no-op only in two narrow cases: (1) the section is genuinely empty (Phase 2 scan returned no relevant candidates) — i.e., no body content at all between the heading and the next heading, OR (2) the section's body is **exactly** the resume-mode forward-looking stub line `*Pre-rule post; related-posts scan not retroactively run.*` and nothing else. If real entries are added below the stub, the no-op does NOT apply — every entry gets walked.

## The `## Resume here` tracker

Mandatory regardless of run length. Initialise in Phase 1; update at the end of every phase and after every section/figure commit.

```markdown
## Resume here

Last touched: YYYY-MM-DD.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done / in progress / pending | `## Spec`, `## Throughline` |
| 2. Research / fact-check | ... | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | ... | `## Outline` |
| 4. Draft prose | ... | `src/content/blog/<post-slug>/index.mdx` |
| 5. Implement figures | n of N done | per-figure table below |
| 6. Playwright review | n of N passed | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | ... | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| YYYY-MM-DD | 0 (research) | structural fixes applied / cosmetic / clean | notes section `## Codex research review` |

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | <PascalCaseName> | static-svg / interactive-canvas / plot / imported-interactive | done / TODO | <hash> |

### Suggested next batch

Three to five lines naming the next concrete action. Order from low complexity to high.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/<post-slug>/index.mdx` for remaining placeholders.
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

[Quote the hard-rules section from the main SKILL.md verbatim here so a fresh-context agent doesn't have to context-switch.]
```

**Phase-transition status print.** At the end of each phase, print the current `## Resume here` tracker state to chat (phase-status table + suggested-next-batch line). Vic sees state without opening the notes file.

## Hard rules

1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the `## Claim-source matrix` with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving, 18 months for stable). Phase 7 re-checks freshness. No silent lowering of the bar; no "current at date of last research" — date of publication.
2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-triggered without Vic prompting; all use the project-local `codex` skill.
5. **Static is the figure default for new figures.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle). Imported figures preserved as auto-classified (static-svg or imported-interactive).
6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
7. **One section per commit, one figure per commit, one migration per commit.** Safe revert points.
8. **Sentence-case headings.** Numbered sections (`### 3. The all-reduce sub-problem`) match `unified-vision-stack`. Em-dashes (U+2014) are forbidden in prose (`../../explainer-shared/voice-rules.md`) BUT permitted in act-divider headings (`## Act 1 — The Lens`); voice-check exempts heading-line em-dashes when the line starts with `## Act `. **En-dashes (U+2013) are allowed everywhere** — use them for numeric ranges (`5–10 GPUs`), date ranges (`2023–2024`), and other span notations. Voice-check does not flag en-dashes; do not auto-repair them.
9. **`draft: true` from creation through ship; Vic flips to `draft: false` explicitly.** Both modes write the MDX with `draft: true` at creation (topic mode in Phase 4, HTML-import mode in Phase 1) and the flag stays `true` for every commit the skill makes. The skill never auto-flips to `draft: false` — not on Gate 0 acceptance, not after the freshness pass, not at "ship." Vic owns the flip as an explicit, separate action (a single-purpose commit `flip draft to false; ship` is the canonical shape). Do not toggle the flag between figure / section commits during development; it stays `true` until Vic's explicit ship action.
10. **Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.** Schema, format, and failure-repair procedure in `research-protocol.md` "Project-memory schema". Halt if missing or malformed and repair fails. (Intentional coupling to the discovery mechanism for fresh-context resume.)
11. **The blog is interconnected; newer posts link to older relevant posts.** Phase 2 scans `src/content/blog/` for topic-adjacent posts and records anchor points in the notes file under `## Related posts on augusteo.com`. Phase 4 weaves inline links at those anchor points and adds the related posts as top entries in `## References` (matching the `omni-modal-stack` ↔ `unified-vision-stack` pattern). Older posts are NOT retroactively edited — only the newer post does the linking. If the related-posts scan returns zero candidates that meet the bar, that's fine; the rule is "search and link if relevant", not "force a link".

## Halt-and-ask conditions

The skill must explicitly halt and surface the issue when:

- Phase 1 ambiguity probe finds 2+ missing spec dimensions and the message can't be inferred.
- Phase 1 research sweep returns fewer than 3 viable primary sources after the budget is exhausted.
- Phase 1 HTML-import: throughline can't be extracted or synthesized.
- Phase 2 claim-source matrix has any row that can't be supported even after the repair workflow.
- Phase 3 hits a figure whose mechanism doesn't fit any of the four types.
- Gate 0 finds any of: fabricated quote, misattributed source, unsupported load-bearing claim, secondary-as-primary, stale unannotated row, omitted contradicting source.
- Gate 1 finds an issue that implies rescoping the post.
- Gate 1 demands a figure-type re-type (triggers unlock protocol → AskUserQuestion to Vic).
- Phase 5 needs a figure type or palette color not covered by `unified-vision-stack` / `../../explainer-shared/illustration-style.md` / the kit.
- Phase 6 a single figure fails playwright review three times in a row.
- Phase 7 freshness re-check finds a newer source version that changes a claim.
- Gate 2 finds a claim with no matrix row, OR a matrix row whose source has gone stale since Phase 2.

### Halt-state housekeeping

When the skill halts at any phase:

1. Append a `Status: halted-phase-<N>-<YYYY-MM-DD>` line to the project memory file at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_post.md` along with a one-paragraph note on what triggered the halt.
2. **Leave the MEMORY.md pointer in place.** It is the resume signal for fresh-context discovery. Only Phase 7 (post shipped) removes it.
3. Surface the halt explicitly to Vic in the chat.

## Per-figure-type unlock protocol

The "type locked at Phase 3" rule has one exception: a Gate 1 STRUCTURAL finding can demand a re-type. When this happens:

1. Codex's finding is recorded in the `### Codex history` table.
2. Vic is shown the proposed re-type and approves it explicitly via `AskUserQuestion` (options: "approve re-type" / "keep current type" / "drop figure").
3. The figure table is updated and a "(re-typed at Gate 1, <date>)" annotation is added, with an `unlock-count` cell incremented.
4. Re-type is then locked again; no further changes without another Gate 1 finding.

**Loop limit (per figure):** a single figure may be re-typed at most TWICE via this protocol. On a third TYPE-CHANGE STRUCTURAL finding for the same figure (`unlock-count` would go to 3):

- Halt the gate-rerun loop.
- Surface the situation to Vic with a single `AskUserQuestion` framed as: "Codex has demanded a third re-type for `<FigureName>`. Options: (a) accept this re-type and lock it permanently; (b) drop the figure entirely; (c) override codex on this figure (record the override in the notes file with reasoning)."
- Whichever Vic picks, the figure is locked permanently for the rest of this run; subsequent gate runs ignore TYPE-CHANGE findings for that specific figure.

This applies in both topic mode and HTML-import mode. The cap exists because three disagreements is a signal that codex and the spec are in fundamental conflict on this figure's role; thrashing the type doesn't resolve that.

### Interaction with the gate-runner loop cap

The unlock protocol and the shared runner's Step-6 cap (in `../../explainer-shared/codex-runner.md`) interact as follows:

**Each unlock-protocol fire counts as one Gate 1 invocation against the gate-runner cap of 3** (initial + 2 re-runs). After Vic approves a re-type via unlock protocol, Gate 1 MUST be re-run from Step 1 (build prompt with the updated figure table) to verify the re-type closed the structural gap and to surface any other findings the re-type may have triggered. The re-run is not optional; the matrix may have shifted because the figure's role in the post may have changed.

```
Concrete invocation sequence on a TYPE-CHANGE STRUCTURAL:

Gate 1 invocation N → finds TYPE-CHANGE STRUCTURAL on figure F (unlock-count for F goes from 0 to 1).
Apply unlock protocol: AskUserQuestion → Vic approves re-type → figure table updated.
Re-run Gate 1 from Step 1 (this is invocation N+1).
  - If invocation N+1 is clean: Gate 1 passes, proceed to Phase 4.
  - If invocation N+1 finds another TYPE-CHANGE STRUCTURAL on F (unlock-count goes to 2):
    Apply unlock protocol again → Vic approves → re-run Gate 1 (invocation N+2).
  - If invocation N+2 finds yet another TYPE-CHANGE STRUCTURAL on F (would go to 3):
    Halt the unlock loop. AskUserQuestion (lock / drop / override).
    After Vic picks, F is permanently locked. Re-run Gate 1 once more (invocation N+3 = the 4th invocation overall) with F frozen — this hits the gate-runner cap of 3.
    On the 4th invocation:
      - If clean: Gate 1 passes (the unlock cap absorbed F's debt; Vic's call carries forward).
      - If still STRUCTURAL on something else: gate-runner Step 6 fires (accept / halt / override).
      - If STRUCTURAL on F again (cosmetic-style critique despite F being locked): codex's finding on F is recorded but ignored for type purposes; Vic's permanent lock holds.
```

**Counter precedence:** the gate-runner cap of 3 invocations is a hard ceiling. Unlock-protocol re-runs count against it. If Gate 1 hits 3 invocations without the unlock loop closing (e.g., 3 different figures each demanding TYPE-CHANGE), Step 6 fires regardless and Vic gets the gate-runner-level AskUserQuestion (accept / halt / override). The unlock protocol does not get extra re-runs beyond the gate-runner cap.

## Composition with other skills

- **REQUIRED:** Phase 2 dispatches parallel subagents per `superpowers:dispatching-parallel-agents`.
- Gates 0, 1, 2 invoke the project-local `codex` skill (consult mode for matrix-heavy reviews; exact prompts in `codex-prompts.md`).
- Phase 6 uses the playwright MCP server.
- Phase 1 fallback (only if research returns < 3 sources AND ambiguity probe didn't fire) invokes `superpowers:brainstorming`.
- Does not call `superpowers:writing-plans`. The figure list is the plan.

## Output structure

```
notes/<post-slug>.md                              # spec, throughline, research, matrix, outline, codex review, resume tracker
notes/<post-slug>-reference.<ext>                 # optional reference implementation from Phase 2
src/content/blog/<post-slug>/index.mdx            # the post
src/figures/<post-slug>/<figure-name>.ts          # one file per interactive figure draw function
src/components/figures/<post-slug>/<FigureName>.svelte   # one wrapper per interactive figure
src/assets/blog/<post-slug>/hero.<ext>            # added in Phase 7 by Vic
~/.claude/projects/<project>/memory/project_<slug>_post.md  # required project-memory pointer
```

## Verification

After Phase 7:

- Post renders at `http://localhost:4321/blog/<post-slug>` with no console errors.
- Every figure displays cleanly: no overlap, no clipping, labels legible. Interactive figures: controls drive the canvas, no hydration warnings.
- `grep -nP '\x{2014}'` on the MDX returns zero results outside act-divider headings.
- `scripts/voice-check.sh` exits clean on the final file.
- Tag list overlaps existing site vocabulary.
- Hero image present, `heroAlt` describes what's visible.
- `draft: true` (stays `true` — Vic flips to `false` himself as the ship action), `essay: true`, `pubDate` is today.
- **Every load-bearing claim in the post traces back to a row in `## Claim-source matrix`.** Walk and verify.
- **Every matrix row's source passes the freshness check** as of `pubDate`.
- **Every entry in `## Related posts on augusteo.com` appears in the prose AND in `## References`** (or the section is intentionally empty).
- The notes file's `## Codex … review` sections all close on cosmetic rather than structural issues.

## Common rationalizations to refuse

| Excuse | Reality |
|---|---|
| "Codex is being pedantic" | Codex's job is to be pedantic. Structural findings get fixed. |
| "I'll skip the playwright review" | The screenshot is the only thing that proves it renders. Run the check. |
| "Two sources are 19 months old, basically the same" | The recency rule per claim is the rule. Halt and ask if you can't meet it. |
| "I can paraphrase the source instead of quoting" | Quote the part that supports the claim. Paraphrase rots; quotes don't. |
| "Voice-check is failing on a real technical term" | Leave a one-line comment naming why the term stays. The check stays on. |
| "This figure should be interactive after all" | Halt at Phase 3 boundary. Don't quietly re-type a figure mid-Phase-5 without Gate 1 + Vic approval. |
| "The codex final gate found one issue, I'll fix it next session" | Phase 7 is the last gate. Fix it now or halt with a write-up. |
| "Phase 7 freshness pass is overkill, the sources can't have moved that fast" | Run it anyway. arxiv v-bumps and blog edits happen. |
| "The HTML import has a claim no source backs, but it sounds right" | Run the repair workflow. Imported claims aren't grandfathered. |
