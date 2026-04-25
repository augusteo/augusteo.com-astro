---
name: interactive-explainer
description: Use when planning, researching, drafting, or shipping a long-form ciechanow.ski-style interactive explainer post for augusteo.com. Triggers include "let's plan a new explainer", "I want to write an interactive post about X", "start a new flagship", "brainstorm a new explainer on Y", or being given a topic and asked to outline. Drives a six-phase pipeline (topic lock-in, deep research, narrative + figure list, draft prose, implement figures, wire up + publish) using the Svelte 5 figure kit at `src/components/figure/`. Companion to `html-explainer-to-post`, which converts pre-baked HTML; this one creates from a topic.
---

# Interactive explainer pipeline

## What this is

A six-phase pipeline that takes a topic ("how multi-GPU training works", "how DNS resolves a name", "how attention works inside a transformer") and ends with a published MDX post on augusteo.com containing 10+ working interactive figures, written in Vic's voice.

Read these companions in order before starting any phase:

- `voice-rules.md`: the full "Write Like a Human, Not an AI" guide. Apply during drafting, not as cleanup.
- `figure-kit.md`: the seven primitives, palette tokens, when to use Canvas 2D vs SVG.
- `figure-recipes.md`: cookbook patterns for the most common figure types.
- `research-protocol.md`: what counts as a primary source, recency requirement, citation format.
- `narrative-template.md`: section scaffold and reader-direction phrasing.

## When to use

- Vic says "let's plan a new explainer", "start a new flagship", "I want to write a deep post on X".
- Vic gives a topic and asks for an outline.
- Vic seeds 3–5 starter resources (papers, repos, blog posts) and says "write the explainer."
- Vic says "continue the X explainer", "pick up the X post", "keep working on the X explainer", or names a topic that already has a `notes/<post-slug>.md` file. (See "Resuming an in-progress run" below.)
- Vic asks to implement specific figures from a post that's already drafted.

## When NOT to use

- Pre-baked HTML to convert: use `html-explainer-to-post`.
- Short Obsidian-vault posts: use `bun run sync` (the existing Obsidian pipeline).
- Topic where Vic can't name 3 primary sources newer than 18 months. Halt and ask.

## Resuming an in-progress run

A flagship explainer spans multiple sessions. **Before invoking `superpowers:brainstorming` or starting any phase, check whether work on the topic Vic named is already in progress.** Re-litigating settled choices wastes a session and risks contradicting commitments Vic already approved.

The resume gate:

1. **Look for `notes/<post-slug>.md`.** Guess likely slugs from Vic's topic (e.g. "multi-GPU training" → `multi-gpu-training`). Also check `MEMORY.md` for any `project_*.md` entry referencing an in-flight explainer.
2. **If the notes file exists, read it end-to-end before doing anything else.** The `## Spec`, `## Research notes`, and `## Outline` sections carry every locked-in choice. Treat them as ground truth.
3. **Look for the `## Resume here` section.** It carries the phase-status table, per-figure progress tracker (Phase 5), and a suggested next batch. Format is documented under "## The `## Resume here` tracker" below.
4. **`git log --oneline | head -30`** to see commits since the spec commit. Each section and figure was committed alone, so the working tree should match the tracker.
5. **`grep -n TODO src/content/blog/<post-slug>/index.mdx`** for remaining figure placeholders. Cross-reference against the tracker.
6. **Pick the next batch from the tracker and continue from that phase.** Do NOT re-invoke `superpowers:brainstorming` if Phase 1 has already shipped. Do NOT re-run research if Phase 2 is done.

If no notes file exists, this is a new run: start Phase 1 normally.

## The six phases

Each phase becomes a TaskCreate when the skill runs. Phases are gates; do not skip ahead.

### Phase 1: topic and audience lock-in

Goal: a one-paragraph spec that says what the post is about, who it's for, and what the reader walks away knowing.

**Skip this entire phase if `notes/<post-slug>.md` already has a `## Spec` section.** The spec is locked once Vic approved it; re-litigating wastes a session and risks contradicting commitments Vic already gave.

1. **First action of this phase: invoke the Skill tool with `skill: superpowers:brainstorming`.** Do not skip this step. The brainstorming skill enforces the question-at-a-time discipline that the rest of the phase depends on. Announce the invocation so Vic sees it.
2. Inside brainstorming, ask one at a time: who is the reader (engineers? researchers? curious newcomers?), what is the smallest claim they should walk away believing, what's the title sketch, what existing posts on the site set tone (default: `unified-vision-stack`).
3. Output: `notes/<post-slug>.md` opens with a "## Spec" section containing this paragraph plus the title sketch, target audience, target length, and 3–5 starter resources from Vic.
4. Initialise a `## Resume here` section at the bottom of the notes file. See "The `## Resume here` tracker" below for format.
5. Drop a project-memory entry at `~/.claude/projects/<project>/memory/project_<slug>_post.md` and add a one-line pointer to `MEMORY.md` so a fresh conversation context sees the in-flight explainer on session start. Keep this pointer until the post ships.

### Phase 2: deep research

Goal: a research notes file that the prose will draw from. Density and correctness depend on this phase being thorough.

1. Read every starter resource Vic provided. Quote the parts that matter.
2. For each starter resource, follow at least three citation tails: papers it cites, repos it links, official docs it references.
3. Run targeted web searches for primary sources newer than 18 months on the topic. Refer to `research-protocol.md` for what counts as primary, what doesn't, and how to verify recency.
4. **Hard rule:** if fewer than three primary sources newer than 18 months turn up after honest searching, halt and ask Vic whether to proceed with older sources or pick a different angle. Do not silently lower the bar.
5. Where possible, run a small reference implementation in code. For ML topics: a 50-line PyTorch script that demonstrates the mechanism is worth more than a thousand words of paper summary. The script lives at `notes/<post-slug>-reference.<ext>` (or under `notes/<post-slug>/` for multi-file references).
6. Output: append a "## Research notes" section to `notes/<post-slug>.md` with quoted excerpts, links, paper titles + arxiv IDs, and any code snippets used for verification. Group by sub-topic, not by source.
7. Show Vic the notes file. Ask if anything is missing or wrong before phase 3.
8. Update the `## Resume here` tracker: phase 2 → done; if the reference script wasn't executable in this environment, note that under the script's location.

### Phase 3: narrative outline and figure list

Goal: a section structure plus a numbered figure table modelled on the multi-GPU table in `~/.claude/plans/can-you-check-websites-fizzy-knuth.md`.

1. Sketch the section list using the concept-then-decompose pattern in `narrative-template.md`. Start from the problem the topic solves, decompose into isolated mechanisms, reassemble at the end.
2. For each section, list the figures it needs. For each figure, write a one-line spec: **mechanism it isolates**, **what the reader controls**, **what they should walk away noticing**.
3. Mark figures as `static-svg`, `interactive-canvas`, or `plot`. Aim for the ratio Vic chose for the multi-GPU essay: ~80% interactive at the v1-flagship tier.
4. Append the outline + figure table to `notes/<post-slug>.md` under a "## Outline" section.
5. Show Vic the outline. Iterate until the figure list is locked.
6. Update the `## Resume here` tracker: phase 3 → done; populate the per-figure status table with every figure number and a `TODO` status. The tracker now reflects the locked figure list.

### Phase 4: draft prose

Goal: a working MDX file with figure placeholders and prose around them, written in Vic's voice.

1. Create `src/content/blog/<post-slug>/index.mdx` with frontmatter set per `src/content.config.ts`:
   - `title`, `description`, `pubDate`, `tags`, `featured: false`, `draft: true`, `essay: true`.
   - `heroImage` and `heroAlt` left for phase 6.
2. Write prose section by section. For each section: state the claim, drop a figure placeholder (`{/* TODO: <FigureName /> */}`), tell the reader what to manipulate, then explain what they should see.
3. **Apply voice rules during drafting.** Don't write a "polished" pass and clean up. Write plain. Read each paragraph out loud in your head; if it sounds like a press release, rewrite it.
4. After each section, run the voice-check script via the Bash tool:
   ```bash
   scripts/voice-check.sh src/content/blog/<post-slug>/index.mdx
   ```
   The script implements the full banned-word list from `voice-rules.md` plus the em dash and curly quote checks. It exits non-zero on any hit. Any em dashes: zero allowed. Any banned words: rewrite, or if the word is a real technical term in this context (statistical or domain jargon that happens to overlap the banned list), leave a one-line comment in the source naming why it stays. Re-run until clean before showing the section to Vic.
5. Commit at each section boundary so Vic can review and revert cleanly. After each commit, update the `## Resume here` tracker's phase-status row.
6. When all sections are drafted, update the tracker: phase 4 → done.

### Phase 5: implement figures

Goal: every figure placeholder replaced with a working Svelte component using the kit primitives.

1. For each figure, create `src/figures/<post-slug>/<figure-name>.ts` containing a pure `draw(ctx, data, t)` function. Pull palette tokens from `@figures/shared`.
2. In MDX, import primitives from `@components/figure/...` and the draw function from `@figures/<post-slug>/...`. Wrap in `<Figure caption="..." figNum={N}>`.
3. Use only the seven kit primitives (`Figure`, `Slider`, `Toggle`, `Scrubber`, `DragArea`, `Canvas2D`, `Plot`). **If a new primitive seems needed, halt and propose it explicitly to Vic.** Do not silently add to the kit.
4. Test each figure in `bun run dev` before moving to the next. Confirm the controls drive the canvas at 60fps. Confirm the cream palette shows. Confirm `prefers-reduced-motion` freezes any auto-loops. **The dev-view draft gate:** the post has `draft: true`, so `src/pages/blog/[slug].astro` and `index.astro` filter it out. To view a figure in dev: temporarily flip the frontmatter to `draft: false`, view at `http://localhost:4321/blog/<post-slug>` (or 4322 if 4321 is busy), then flip back to `true` *before committing*. Never commit `draft: false` until phase 6.
5. Commit per figure so each one is reviewable in isolation. After each figure commit, update the `## Resume here` tracker: mark that figure done, record the commit hash, advance the "next batch" suggestion.
6. **Batch by session.** Phase 5 typically spans 2-6 sessions for an 18-figure essay; pushing 10+ figures in one session degrades quality. Aim for 2-4 figures per session. After each batch, update the tracker, commit, and stop. The next session's agent will resume from the tracker.

### Phase 6: wire up and publish

Goal: the post ships.

1. Set frontmatter: confirm `description` reads well in the post-card listing, confirm `tags` overlap the existing site vocabulary (grep `src/content/blog/*/index.mdx` for prior tags).
2. Hand off the hero image step to Vic, same handoff as `html-explainer-to-post` (Vic picks the image, you copy it to `src/assets/blog/<post-slug>/hero.<ext>` and propose a `heroAlt` after viewing).
3. Flip `draft: false`.
4. Verify in dev: `bun run dev`, walk every figure, read the post end-to-end. Lighthouse: largest contentful paint under 2.5s on cold load.
5. Commit the publish flip with a message naming the post.
6. Update the `## Resume here` tracker: phase 6 → done. The tracker now reads as a complete record of the run. Optionally remove the `MEMORY.md` "in progress" pointer that Phase 1 created (the project memory entry can stay as a record of how the post was built).

## Hard rules

- Three primary sources newer than 18 months minimum. Otherwise halt and ask.
- `scripts/voice-check.sh` exits clean before showing any draft section to Vic. Em dashes: zero. Banned words: justify or rewrite.
- Density is fine. Correctness of intuition is the bar. Don't soften technical claims.
- Kit primitives are exhaustive. New primitives need explicit user approval.
- Each figure is committed alone. Each section is committed alone. Safe resume points.
- Heading style is sentence case, no exceptions. Numbered sections like `### 3. The all-reduce sub-problem` match the existing `unified-vision-stack` post.

## Composition with other skills

- Phase 1's first action is to invoke `superpowers:brainstorming` via the Skill tool. Required, not optional, *unless* the resume gate detects a `## Spec` section already exists in the notes file (in which case skip to the next pending phase).
- Does not call `superpowers:writing-plans`. The figure list is the plan.
- `html-explainer-to-post` is the sister skill for HTML conversion. Stays untouched.

## The `## Resume here` tracker

A `## Resume here` section in `notes/<post-slug>.md` is mandatory. Initialise it in Phase 1; update it at the end of every phase and after every section/figure commit. The tracker is what lets a fresh conversation context pick up the work without re-litigating settled choices.

Standard format:

```markdown
## Resume here

Last touched: YYYY-MM-DD.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Topic + audience lock-in | done / in progress / pending | this file's `## Spec` |
| 2. Deep research | ... | this file's `## Research notes`, plus reference script if any |
| 3. Outline + figure list | ... | this file's `## Outline` |
| 4. Draft prose | ... | `src/content/blog/<post-slug>/index.mdx` |
| 5. Implement figures | n of N done | per-figure table below |
| 6. Wire up + publish | ... | hero, draft flip, dev verification |

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | <PascalCaseName> | static-svg / interactive-canvas / plot | done / TODO | <hash> |
| ... | ... | ... | ... | ... |

### Suggested next batch

Three to five lines naming the next concrete action, e.g. "implement Fig 4 (memory bar) + Fig 16 (FP8 plot). Both tractable, each lands a punch from the draft." Order from low complexity to high.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Research notes / Outline carry every locked-in choice.
2. `git log --oneline | head -30` to see commits since the spec commit.
3. `grep -n TODO src/content/blog/<post-slug>/index.mdx` for remaining placeholders.
4. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

Voice-check exits clean before each commit. Em dashes: zero. Banned words: justify or rewrite. Kit primitives are exhaustive (no new primitives without explicit user approval). One section per commit, one figure per commit. Never commit `draft: false` until phase 6.
```

When updating, keep the format consistent across posts. A future agent should not have to learn a new shape per post.

## Output structure

```
notes/<post-slug>.md                              # spec, research, outline, resume tracker (single file)
notes/<post-slug>-reference.<ext>                 # optional reference implementation from phase 2
src/content/blog/<post-slug>/index.mdx            # the post
src/figures/<post-slug>/<figure-name>.ts          # one file per figure draw function
src/assets/blog/<post-slug>/hero.<ext>            # added in phase 6 by Vic
```

## Verification

After phase 6:

- Post renders at `http://localhost:4321/blog/<post-slug>` (or 4322 if port shifted) with no console errors.
- Every figure's controls function. Slider input redraws canvas. Scrubber play button works. Toggles switch state.
- `grep -nP '\x{2014}'` on the MDX returns zero results.
- `grep -niE` for banned words returns zero results, or every result is justified in a comment.
- Tag list overlaps existing site vocabulary.
- Hero image present, `heroAlt` describes what's visible.
- `draft: false`, `essay: true`.
