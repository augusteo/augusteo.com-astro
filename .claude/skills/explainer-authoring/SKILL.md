---
name: explainer-authoring
description: Long-form research-and-write blog post on augusteo.com. Drives an eight-phase pipeline (topic + audience, deep research, outline + figure list, codex gate 1, draft prose, implement figures, playwright visual review, codex gate 2 + ship). Each figure is decided per-post as `static-svg` (inline `<svg>` in MDX, no client-side state) or `interactive-canvas`/`plot` (Svelte 5 wrapper + Canvas2D draw fn + MDX import with `client:visible`). Triggers include "narrative post on X", "deep prose post on X", "interactive explainer", "ciechanow.ski-style", "post with sliders / scrubbers / drag", "research X and write a post", "let's plan a new flagship", "continue the X explainer", "pick up the X post". When ambiguous about static-vs-interactive, halt at Phase 1 brainstorm and ask. If a pre-baked HTML file exists, use `html-explainer-to-post` instead. For short Obsidian-vault posts, use `bun run sync` (the existing Obsidian pipeline).
---

# Explainer authoring pipeline

## What this is

A research-and-write pipeline that takes a topic ("how attention works inside a transformer", "how multi-GPU training scales") and ends with a published-ready MDX post on augusteo.com. The post contains 8-15 figures, written in Vic's voice, every load-bearing claim traceable to a primary source.

Figures are decided per-post (and often per-figure within a post):

- **Static SVG** — inline `<figure><svg>...</svg></figure>` in MDX, zero client-side state. Cheap, fast, ships in one session for short posts. Pattern source: `src/content/blog/unified-vision-stack/`.
- **Interactive Canvas / Plot** — Svelte 5 wrapper component that owns reactive `$state`, renders kit primitives (`<Slider>`, `<Toggle>`, `<Scrubber>`, `<DragArea>`), drives a Canvas2D draw function. MDX imports the wrapper with `client:visible`. Pattern source: `src/content/blog/multi-gpu-training/`.

A post can mix the two: an interactive flagship typically has ~80% interactive figures with a few static schematics; a deep prose post may be 100% static. The decision is made in Phase 3 (per figure) and the implementation forks in Phase 6.

Read these companions in order before starting any phase:

- `voice-rules.md` — the full "Write Like a Human, Not an AI" guide. Apply during drafting, not as cleanup.
- `research-protocol.md` — what counts as a primary source, recency requirement, citation format.
- `narrative-template.md` — three-act section scaffold and reader-direction phrasing.
- `illustration-style.md` — inline SVG conventions for static figures (palette, typography, figcaption shape, viewBox).
- `figure-kit.md` — the seven Svelte primitives, palette tokens, when to use Canvas2D vs SVG vs Plot. Read before implementing the first interactive figure.
- `figure-recipes.md` — cookbook patterns for the most common interactive figure types.
- `codex-prompts.md` — exact prompts for the two `/codex` adversarial gates.
- `playwright-checks.md` — per-figure-type failure modes for the visual review phase, covering both static SVG and interactive figures.

## When to use

- Vic gives a topic and asks for a deep post (whether static or interactive figures).
- Vic seeds 3-5 starter resources (papers, repos, blog posts) and says "write the post".
- Vic says "continue the X explainer", "pick up the X post", or names a topic that already has a `notes/<post-slug>.md` file. (See "Resuming an in-progress run" below.)
- Vic asks to implement specific figures from a post that's already drafted.

## When NOT to use

- Pre-baked HTML to convert: use `html-explainer-to-post`.
- Short Obsidian-vault posts: use `bun run sync` (the existing Obsidian pipeline).
- Topic where Vic can't name 3 primary sources newer than 18 months. Halt and ask.

## Resuming an in-progress run

A flagship explainer often spans multiple sessions. Before invoking `superpowers:brainstorming` or starting any phase, check whether work on the topic Vic named is already in progress. Re-litigating settled choices wastes a session and risks contradicting commitments Vic already approved.

The resume gate:

1. **Look for `notes/<post-slug>.md`.** Guess likely slugs from Vic's topic (e.g. "multi-GPU training" → `multi-gpu-training`). Also check `MEMORY.md` for any `project_*.md` entry referencing an in-flight explainer.
2. **If the notes file exists, read it end-to-end before doing anything else.** The `## Spec`, `## Research notes`, `## Outline`, and any `## Codex outline review` sections carry every locked-in choice. Treat them as ground truth.
3. **Look for the `## Resume here` section.** It carries the phase-status table, per-figure progress tracker (Phase 6), and a suggested next batch.
4. **`git log --oneline | head -30`** to see commits since the spec commit. Each section and figure was committed alone, so the working tree should match the tracker.
5. **`grep -n TODO src/content/blog/<post-slug>/index.mdx`** for remaining figure placeholders. Cross-reference against the tracker.
6. **Pick the next batch from the tracker and continue from that phase.** Do NOT re-invoke `superpowers:brainstorming` if Phase 1 has already shipped. Do NOT re-run research if Phase 2 is done.

If no notes file exists, this is a new run: start Phase 1 normally.

## The eight phases

Each phase becomes a `TaskCreate` when the skill runs. Phases are gates; do not skip ahead. A run may complete in one session (typical for ~30-minute static-SVG posts) or span multiple (typical for interactive flagships); the `## Resume here` tracker is mandatory either way.

### Phase 1: topic + audience lock-in

Goal: a one-paragraph spec that says what the post is about, who it's for, and what the reader walks away knowing.

**Skip this entire phase if `notes/<post-slug>.md` already has a `## Spec` section.** The spec is locked once Vic approved it; re-litigating wastes a session and risks contradicting commitments Vic already gave.

1. **First action: invoke the Skill tool with `skill: superpowers:brainstorming`.** Do not skip. Announce the invocation so Vic sees it.
2. Inside brainstorming, ask one at a time: who is the reader (engineers? researchers? curious newcomers?), what is the smallest claim they walk away believing, target length (default ~30 minute read), title sketch, 3-5 starter resources from Vic, and **whether figures should lean static, interactive, or mixed.** The static-vs-interactive question is part of brainstorming; don't defer it. If Vic doesn't have a strong preference, default to static for ~30-minute posts and propose interactive only when a specific mechanism would benefit from a slider/scrubber.
3. Output: `notes/<post-slug>.md` opens with a `## Spec` section containing the paragraph, target audience, target length, title sketch, the figure-style preference, and the starter resources.
4. Initialise a `## Resume here` section at the bottom of the notes file. See "The `## Resume here` tracker" below for format.
5. Drop a project-memory entry at `~/.claude/projects/<project>/memory/project_<slug>_post.md` and add a one-line pointer to `MEMORY.md` so a fresh conversation context sees the in-flight explainer on session start. Keep this pointer until Phase 8 ships.

### Phase 2: deep research (parallel subagents)

Goal: a research notes file the prose can draw from, with primary sources quoted directly. This phase determines whether the post can stand up to scrutiny.

1. Read `research-protocol.md` for the source bar (primary only, 18-month recency rule, what does and does not count).
2. **Decompose the topic into 2-3 sub-topics.** Example: for "how attention works", decompose into tokenization + embedding, multi-head structure, positional encoding. Each sub-topic must be answerable independently.
3. **Dispatch the subagents in parallel.** One message, multiple `Agent` tool calls, `subagent_type: Explore` or `general-purpose`. **REQUIRED:** follow `superpowers:dispatching-parallel-agents` for the convention. Each subagent's prompt:
   - Names the sub-topic and the specific claims that need backing.
   - Inlines the source bar (primary only, 18-month rule, what doesn't count) verbatim into the prompt body. The parent has already read `research-protocol.md` in step 1; copy the relevant rules straight into the subagent prompt so the subagent has them without needing to read the file (subagents run from the repo root and would not resolve a bare filename).
   - Required output: quoted excerpts with arxiv IDs, commit hashes, publication dates, access dates, grouped by claim. Bare URLs are not enough; the subagent must quote the part of the source that supports the claim.
4. Read every starter resource Vic provided yourself (do not delegate this; the starter resources are Vic's signal of what matters).
5. Merge subagent outputs into `notes/<post-slug>.md` under `## Research notes`. Group by sub-topic, not by source.
6. **Halt rule.** If after honest searching the merged notes have fewer than three primary sources newer than 18 months, halt and ask Vic. Two paths: proceed with older sources and put a "this reflects best practice as of <date>" note in the post, or pick a different angle. Do not silently lower the bar.
7. Where a small reference implementation is feasible (50 lines that demonstrates the mechanism), run it. Save to `notes/<post-slug>-reference.<ext>` (or `notes/<post-slug>/` for multi-file). The point is to catch confused intuition before drafting, not to publish the script.
8. Show Vic the notes file. Ask if anything is missing or wrong before Phase 3.
9. Update the `## Resume here` tracker: phase 2 → done.

### Phase 3: outline + figure list (with per-figure type decision)

Goal: a section structure plus a numbered figure table where every figure carries its implementation type.

1. Read `narrative-template.md` for the three-act shape (set up the problem → decompose into mechanisms → reassemble) and the per-section rhythm.
2. Sketch the section list. Number sections (`### 1. ...`, `### 2. ...`) as in `unified-vision-stack`. Use act dividers between major narrative turns; copy the divider format the post uses verbatim.
3. For each section, list the figures it needs. **Per-figure spec:** mechanism it isolates, what the reader should walk away noticing, **and the figure type:**
   - `static-svg` — inline `<svg>` in MDX, no JavaScript. Use for schematics, equations, before/after panels, frozen scenes, anything where reader interaction wouldn't add value.
   - `interactive-canvas` — Canvas2D wrapper with `<Slider>` / `<Toggle>` / `<Scrubber>` / `<DragArea>`. Use when a parameter sweep, animation, or spatial selection is the load-bearing mechanism.
   - `plot` — Multi-curve line chart via the kit's `<Plot>` primitive. Use for comparisons across time/iterations/scale.
4. Append the outline + figure table to `notes/<post-slug>.md` under `## Outline`. The figure table has columns: `# | Figure | Type | Mechanism | Reader notices`.
5. Show Vic the outline. Iterate until the figure list is locked. **The type decisions are part of the lock; don't change them after Phase 4.**
6. Update the `## Resume here` tracker: phase 3 → done; populate the per-figure status table with every figure number, its type, and a `TODO` status.

### Phase 4: codex gate 1 (outline + research)

Goal: catch unsupported claims, structural gaps, and missing rungs in the intuition ramp before drafting wastes effort.

1. Run the `/codex` skill in challenge mode against the spec, research notes, outline, and figure list. Use the gate-1 prompt from `codex-prompts.md`.
2. Codex's job is to attack: are there claims with no quoted source, sources that don't actually say what we claim, missing rungs between sections, figures that don't carry their weight?
3. Iterate. Fix what codex finds, re-run if needed. **Stop when codex's last critique is cosmetic, not structural.** "The figure caption could be tighter" is cosmetic. "Section 3 cites a paper that doesn't support its main claim" is structural; fix it.
4. Append codex's accepted critiques and the changes made to `notes/<post-slug>.md` under `## Codex outline review`.
5. **Halt rule.** If codex finds an issue that implies rescoping the post (the intuition ramp is fundamentally wrong, the topic decomposition leaves a key piece out), halt and surface to Vic before continuing.

### Phase 5: draft prose

Goal: a working MDX file with section prose and figure placeholders.

1. Create `src/content/blog/<post-slug>/index.mdx` with frontmatter per `src/content.config.ts`:
   - `title`, `description`, `pubDate`, `tags`, `featured: false`, `draft: false`, `essay: true`.
   - `heroAlt` is required by the schema (`z.string()`, not optional). Set it to a placeholder like `"TODO: hero image not yet selected"` so the content collection validates and Phase 7's `bun run dev` can render the route. Phase 8 replaces the placeholder with a real description after Vic picks the hero.
   - `heroImage` is `image().optional()`, so omit the key entirely. Phase 8 adds it.
   - See `../../explainer-shared/mdx-output-spec.md` for the full frontmatter schema, file-path conventions, and slug rules (shared with `html-explainer-to-post`).
2. Draft section by section. For each section: state the claim, drop a figure placeholder (`{/* TODO: Fig N: <mechanism> */}` for static, or `{/* TODO: <FigureName /> */}` for interactive — keep them recognizable so Phase 6 can find them), tell the reader what to notice, then explain the mechanism, then hand off.
3. **Apply voice rules during drafting** (see `voice-rules.md`). Don't write a polished pass and clean up. After each section, run the voice-check script:
   ```bash
   scripts/voice-check.sh src/content/blog/<post-slug>/index.mdx
   ```
   It exits non-zero on any hit. Em dashes: zero. Banned words: rewrite, or if the word is a real technical term in this context, leave a one-line comment in the source naming why it stays. Re-run until clean.
4. **Emit a `## References` section at the end of the post** by transcribing every quoted primary source from `notes/<post-slug>.md`'s `## Research notes`. One Markdown link per source: title, authors (or org), year, arxiv ID or URL. The reader must be able to trace every load-bearing claim to a source without reading the private notes file. (Gate 2 in Phase 8 will halt the post if this section is missing.)
5. Commit per section so each one is reviewable in isolation. After each commit, update the `## Resume here` tracker.
6. When all sections are drafted, update the tracker: phase 5 → done.

### Phase 6: implement figures (forks by figure type)

Goal: every figure placeholder replaced with a working implementation.

The implementation path forks by the type recorded in Phase 3.

#### For static-SVG figures

1. Read `illustration-style.md` for the palette tokens (cream background, navy and rust accents, the watercolor-manuscript aesthetic of `unified-vision-stack`), typography (serif for prose, JetBrains Mono for technical labels), figcaption shape (`<strong>Fig N.</strong> <description>`), viewBox conventions.
2. Replace the placeholder with `<figure><svg viewBox="0 0 680 ...">...</svg><figcaption>...</figcaption></figure>` directly in the MDX.
3. Use the same palette, font stack, stroke widths, and figcaption shape as `unified-vision-stack`. **No new design language; mirror the existing post.** If a figure type isn't covered by the existing post, propose the new pattern to Vic before adding it.

#### For interactive-canvas / plot figures

A reactive figure (anything with a slider, toggle, scrubber, drag overlay, or a static figure that uses `Canvas2D`) is **two files plus an MDX import**: a pure draw function in TS, a per-figure Svelte wrapper that owns reactive state and renders the kit primitives, and an MDX import that places the wrapper inside `<Figure>`. The wrapper exists because Astro JSON-serializes hydrated-island props, and a `draw` function passed straight from MDX lands on the client as `undefined`. Read `figure-kit.md`'s "Astro hydration" section before starting your first interactive figure of the post.

1. **Draw function.** Create `src/figures/<post-slug>/<figure-name>.ts` containing a pure `draw(ctx, data, t)` function. Pull palette tokens from `@figures/shared`.
2. **Wrapper component.** Create `src/components/figures/<post-slug>/<FigureName>.svelte`. Inside the wrapper, import the draw fn and the kit primitives via aliases, declare any `$state` for sliders/toggles/scrubbers, render `<Canvas2D>` (or `<Plot>`) with `data={{ ...state }}`, and below it render a `<div class="controls">` strip of `<Slider>` / `<Toggle>` / `<Scrubber>` controls. Copy the `.controls` CSS from `figure-kit.md` so spacing matches the rest of the post.
3. **MDX usage.** In the post MDX, import the wrapper and place it inside `<Figure caption=".." figNum={N}>` with `client:visible`: `<FigureName client:visible />`. Do not import `Canvas2D` or the draw function in MDX directly.
4. Use only the seven kit primitives (`Figure`, `Slider`, `Toggle`, `Scrubber`, `DragArea`, `Canvas2D`, `Plot`). **If a new primitive seems needed, halt and propose it explicitly to Vic.** Do not silently add to the kit.

#### For all figures

5. Test each figure in `bun run dev` before moving to the next. View at `http://localhost:4321/blog/<post-slug>` (or 4322 if 4321 is busy).
6. Commit per figure so each is reviewable in isolation. After each commit, update the `## Resume here` tracker: mark that figure done, record the commit hash, advance the "next batch" suggestion.
7. **Batch by session.** For 18-figure flagships, Phase 6 typically spans 2-6 sessions; pushing 10+ figures in one session degrades quality. Aim for 2-4 figures per session for interactive work, more for static. After each batch, update the tracker, commit, and stop. The next session resumes from the tracker.

### Phase 7: playwright visual review (per-figure)

Goal: every figure renders cleanly at the actual post route. No overlapping text, no clipped viewBox, no illegible contrast, no layout overflow; for interactive figures, controls drive the canvas, hydration succeeds, reduced-motion is respected.

1. Start `bun run dev` in the background (use `Bash` with `run_in_background: true`).
2. Use the playwright MCP server (`mcp__plugin_playwright_playwright__*`) to navigate to `http://localhost:4321/blog/<post-slug>`.
3. For each figure: scroll into view, snapshot, read the screenshot back. Run the universal checks plus the type-specific checks from `playwright-checks.md` (static-SVG section for static figures; interactive-figure section for interactive — covering hydration, slider/scrubber response, reduced-motion, touch/drag, frame budget).
4. If a figure fails: edit the SVG or the wrapper, re-snapshot. Stop when it passes.
5. **Halt rule.** If a single figure fails review three times in a row, halt and surface to Vic. Don't keep churning on a figure that isn't converging; the design might need rethinking.
6. Update the `## Resume here` tracker as figures pass.

### Phase 8: codex gate 2 + voice check + hero hand-off + ship

Goal: the post ships.

1. Run `/codex` in challenge mode against the full MDX draft. Use the gate-2 prompt from `codex-prompts.md`. Codex attacks technical accuracy, weak arguments, and any claim that drifts from a quoted source in the notes.
2. Iterate until critique is cosmetic. **Halt rule.** If codex finds a claim that no quoted source in the notes file actually supports, halt and surface to Vic. The post must not ship with claims the research doesn't back.
3. Final `voice-check.sh` pass on the full file. Em dashes: zero. Banned words: zero or justified.
4. Hand off the hero image step to Vic. See `../../explainer-shared/hero-handoff.md` for the full flow (prompt template, copy + view, propose `heroAlt`, edit frontmatter). Same flow as `html-explainer-to-post`.
5. Confirm `draft: false` and `essay: true`. Verify in dev: walk every figure, read the post end-to-end at `http://localhost:4321/blog/<post-slug>`. Lighthouse: largest contentful paint under 2.5s on cold load (interactive posts especially).
6. Final commit naming the post.
7. Update the `## Resume here` tracker: phase 8 → done. Optionally remove the `MEMORY.md` "in progress" pointer that Phase 1 created (the project memory entry can stay as a record of how the post was built).

## Hard rules

- **Three primary sources newer than 18 months minimum.** Otherwise halt and ask. No silent lowering of the bar.
- **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
- **Two codex gates and a playwright per-figure gate are mandatory** regardless of figure type. Skipping any gate violates the spirit of this skill. The skill exists because gates catch what the model misses.
- **Density is fine. Correctness of intuition is the bar.** Don't soften technical claims to make them more "approachable."
- **Per-figure type is locked at Phase 3.** If a figure needs to switch type after Phase 4, halt and discuss; quietly re-typing changes the implementation cost and the QA path.
- **Kit primitives are exhaustive.** New primitives need explicit user approval.
- **One section per commit, one figure per commit.** Safe revert points.
- **Heading style is sentence case**, no exceptions. Numbered sections (`### 3. The all-reduce sub-problem`) match `unified-vision-stack`.
- **`draft: false` from Phase 1 onward.** Do not flip between commits; the site is not deployed during active development, so the flag has no production effect.

## Halt-and-ask conditions

The skill must explicitly halt and surface the issue (no silent proceed) when:

- Phase 2 turns up fewer than three primary sources newer than 18 months.
- Phase 3 hits a figure whose mechanism doesn't fit any of the three types (`static-svg` / `interactive-canvas` / `plot`).
- Phase 4 codex finds an issue that implies rescoping the post.
- Phase 6 needs a figure type or palette color not covered by `unified-vision-stack` / `illustration-style.md` / the kit. (Propose the new pattern to Vic; do not silently extend.)
- Phase 7 a single figure fails playwright review three times in a row.
- Phase 8 codex finds a claim that no quoted source in the notes file supports.
- Any phase: realizing mid-pipeline that interactivity (or its absence) is wrong for the post — halt, discuss, re-decide at Phase 3 if needed.

### Halt-state housekeeping

When the skill halts at any phase, do this before stopping:

1. Append a `Status: halted-phase-<N>-<YYYY-MM-DD>` line to the top of the project memory file at `~/.claude/projects/<project>/memory/project_<slug>_post.md` along with a one-paragraph note on what triggered the halt and what would unblock it.
2. **Leave the `MEMORY.md` pointer in place.** It is the resume signal: a future session needs it to discover the in-flight post. Do not remove it on halt; only Phase 8 (post shipped) removes it.
3. Surface the halt explicitly to Vic in the chat. Do not silently park the post.

## The `## Resume here` tracker

A `## Resume here` section in `notes/<post-slug>.md` is mandatory regardless of run length. Initialise it in Phase 1; update it at the end of every phase and after every section/figure commit. The tracker is what lets a fresh conversation context pick up the work without re-litigating settled choices.

Standard format:

```markdown
## Resume here

Last touched: YYYY-MM-DD.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Topic + audience lock-in | done / in progress / pending | this file's `## Spec` |
| 2. Deep research | ... | this file's `## Research notes`, plus reference script if any |
| 3. Outline + figure list | ... | this file's `## Outline` (incl. per-figure type) |
| 4. Codex gate 1 | ... | this file's `## Codex outline review` |
| 5. Draft prose | ... | `src/content/blog/<post-slug>/index.mdx` |
| 6. Implement figures | n of N done | per-figure table below |
| 7. Playwright visual review | n of N passed | playwright snapshots reviewed |
| 8. Codex gate 2 + ship | ... | hero image, dev verification, ship |

### Phase 6 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | <PascalCaseName> | static-svg / interactive-canvas / plot | done / TODO | <hash> |
| ... | ... | ... | ... | ... |

### Suggested next batch

Three to five lines naming the next concrete action, e.g. "implement Fig 4 (memory bar, interactive-canvas) + Fig 16 (FP8 plot, plot). Both tractable, each lands a punch from the draft." Order from low complexity to high.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Research notes / Outline / Codex review carry every locked-in choice.
2. `git log --oneline | head -30` to see commits since the spec commit.
3. `grep -n TODO src/content/blog/<post-slug>/index.mdx` for remaining placeholders.
4. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

Voice-check exits clean before each commit. Em dashes: zero. Banned words: justify or rewrite. Kit primitives are exhaustive (no new primitives without explicit user approval). Per-figure type is locked at Phase 3. One section per commit, one figure per commit. `draft: false` from Phase 1 onward; do not flip it between commits.
```

When updating, keep the format consistent across posts. A future agent should not have to learn a new shape per post.

## Composition with other skills

- **REQUIRED:** Phase 1's first action is to invoke `superpowers:brainstorming` via the Skill tool — *unless* the resume gate detects a `## Spec` section already exists in the notes file (in which case skip to the next pending phase).
- **REQUIRED:** Phase 2 dispatches parallel subagents per `superpowers:dispatching-parallel-agents`.
- Phase 4 and Phase 8 invoke the project-local `codex` skill (challenge mode).
- Phase 7 uses the playwright MCP server.
- Does not call `superpowers:writing-plans`. The figure list is the plan.
- `html-explainer-to-post` is the sibling skill for converting pre-baked HTML.

## Output structure

```
notes/<post-slug>.md                              # spec, research, outline, codex review, resume tracker (single file)
notes/<post-slug>-reference.<ext>                 # optional reference implementation from Phase 2
src/content/blog/<post-slug>/index.mdx            # the post
src/figures/<post-slug>/<figure-name>.ts          # one file per interactive figure draw function
src/components/figures/<post-slug>/<FigureName>.svelte   # one wrapper per interactive figure
src/assets/blog/<post-slug>/hero.<ext>            # added in Phase 8 by Vic
```

## Verification

After Phase 8:

- Post renders at `http://localhost:4321/blog/<post-slug>` with no console errors.
- Every figure displays cleanly: no overlap, no clipping, labels legible. Interactive figures: controls drive the canvas, no hydration warnings.
- `grep -nP '\x{2014}'` on the MDX returns zero results (no em dashes).
- `scripts/voice-check.sh` exits clean on the final file.
- Tag list overlaps existing site vocabulary (grep `src/content/blog/*/index.mdx` for prior tags).
- Hero image present, `heroAlt` describes what's visible.
- `draft: false`, `essay: true` in the frontmatter.
- Every load-bearing claim in the post traces back to a quoted source in `notes/<post-slug>.md`.
- The notes file's `## Codex outline review` and the final-draft codex critique both close on cosmetic rather than structural issues.

## Common rationalizations to refuse

| Excuse | Reality |
|---|---|
| "Codex is being pedantic, the outline is fine" | Codex's job is to be pedantic. If the critique is structural, fix it. |
| "I'll skip the playwright review, the figure looks right in my head" | The screenshot is the only thing that proves it renders. Run the check. |
| "Two of the sources are 19 months old, that's basically the same" | The 18-month rule is the rule. Halt and ask if you can't meet it. |
| "I can paraphrase the source instead of quoting" | Quote the part that supports the claim. Paraphrase rots; quotes don't. |
| "Voice-check is failing on a real technical term, I'll just disable the check" | Leave a one-line comment naming why the term stays. The check stays on. |
| "This figure should be interactive after all, I'll just rewrite it" | Halt at Phase 3 boundary. Don't quietly re-type a figure mid-Phase-6. |
| "The codex final gate found one issue, I'll fix it next session" | Phase 8 is the last gate. Fix it now or halt with a clear write-up. |
