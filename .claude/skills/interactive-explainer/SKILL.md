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

## When NOT to use

- Pre-baked HTML to convert: use `html-explainer-to-post`.
- Short Obsidian-vault posts: use `bun run sync` (the existing Obsidian pipeline).
- Topic where Vic can't name 3 primary sources newer than 18 months. Halt and ask.

## The six phases

Each phase becomes a TaskCreate when the skill runs. Phases are gates; do not skip ahead.

### Phase 1: topic and audience lock-in

Goal: a one-paragraph spec that says what the post is about, who it's for, and what the reader walks away knowing.

1. **First action of this phase: invoke the Skill tool with `skill: superpowers:brainstorming`.** Do not skip this step. The brainstorming skill enforces the question-at-a-time discipline that the rest of the phase depends on. Announce the invocation so Vic sees it.
2. Inside brainstorming, ask one at a time: who is the reader (engineers? researchers? curious newcomers?), what is the smallest claim they should walk away believing, what's the title sketch, what existing posts on the site set tone (default: `unified-vision-stack`).
3. Output: `notes/<post-slug>.md` opens with a "## Spec" section containing this paragraph plus the title sketch, target audience, target length, and 3–5 starter resources from Vic.

### Phase 2: deep research

Goal: a research notes file that the prose will draw from. Density and correctness depend on this phase being thorough.

1. Read every starter resource Vic provided. Quote the parts that matter.
2. For each starter resource, follow at least three citation tails: papers it cites, repos it links, official docs it references.
3. Run targeted web searches for primary sources newer than 18 months on the topic. Refer to `research-protocol.md` for what counts as primary, what doesn't, and how to verify recency.
4. **Hard rule:** if fewer than three primary sources newer than 18 months turn up after honest searching, halt and ask Vic whether to proceed with older sources or pick a different angle. Do not silently lower the bar.
5. Where possible, run a small reference implementation in code. For ML topics: a 50-line PyTorch script that demonstrates the mechanism is worth more than a thousand words of paper summary.
6. Output: append a "## Research notes" section to `notes/<post-slug>.md` with quoted excerpts, links, paper titles + arxiv IDs, and any code snippets used for verification. Group by sub-topic, not by source.
7. Show Vic the notes file. Ask if anything is missing or wrong before phase 3.

### Phase 3: narrative outline and figure list

Goal: a section structure plus a numbered figure table modelled on the multi-GPU table in `~/.claude/plans/can-you-check-websites-fizzy-knuth.md`.

1. Sketch the section list using the concept-then-decompose pattern in `narrative-template.md`. Start from the problem the topic solves, decompose into isolated mechanisms, reassemble at the end.
2. For each section, list the figures it needs. For each figure, write a one-line spec: **mechanism it isolates**, **what the reader controls**, **what they should walk away noticing**.
3. Mark figures as `static-svg`, `interactive-canvas`, or `plot`. Aim for the ratio Vic chose for the multi-GPU essay: ~80% interactive at the v1-flagship tier.
4. Append the outline + figure table to `notes/<post-slug>.md` under a "## Outline" section.
5. Show Vic the outline. Iterate until the figure list is locked.

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
5. Commit at each section boundary so Vic can review and revert cleanly.

### Phase 5: implement figures

Goal: every figure placeholder replaced with a working Svelte component using the kit primitives.

1. For each figure, create `src/figures/<post-slug>/<figure-name>.ts` containing a pure `draw(ctx, data, t)` function. Pull palette tokens from `@figures/shared`.
2. In MDX, import primitives from `@components/figure/...` and the draw function from `@figures/<post-slug>/...`. Wrap in `<Figure caption="..." figNum={N}>`.
3. Use only the seven kit primitives (`Figure`, `Slider`, `Toggle`, `Scrubber`, `DragArea`, `Canvas2D`, `Plot`). **If a new primitive seems needed, halt and propose it explicitly to Vic.** Do not silently add to the kit.
4. Test each figure in `bun run dev` before moving to the next. Confirm the controls drive the canvas at 60fps. Confirm the cream palette shows. Confirm `prefers-reduced-motion` freezes any auto-loops.
5. Commit per figure so each one is reviewable in isolation.

### Phase 6: wire up and publish

Goal: the post ships.

1. Set frontmatter: confirm `description` reads well in the post-card listing, confirm `tags` overlap the existing site vocabulary (grep `src/content/blog/*/index.mdx` for prior tags).
2. Hand off the hero image step to Vic, same handoff as `html-explainer-to-post` (Vic picks the image, you copy it to `src/assets/blog/<post-slug>/hero.<ext>` and propose a `heroAlt` after viewing).
3. Flip `draft: false`.
4. Verify in dev: `bun run dev`, walk every figure, read the post end-to-end. Lighthouse: largest contentful paint under 2.5s on cold load.
5. Commit the publish flip with a message naming the post.

## Hard rules

- Three primary sources newer than 18 months minimum. Otherwise halt and ask.
- `scripts/voice-check.sh` exits clean before showing any draft section to Vic. Em dashes: zero. Banned words: justify or rewrite.
- Density is fine. Correctness of intuition is the bar. Don't soften technical claims.
- Kit primitives are exhaustive. New primitives need explicit user approval.
- Each figure is committed alone. Each section is committed alone. Safe resume points.
- Heading style is sentence case, no exceptions. Numbered sections like `### 3. The all-reduce sub-problem` match the existing `unified-vision-stack` post.

## Composition with other skills

- Phase 1's first action is to invoke `superpowers:brainstorming` via the Skill tool. Required, not optional.
- Does not call `superpowers:writing-plans`. The figure list is the plan.
- `html-explainer-to-post` is the sister skill for HTML conversion. Stays untouched.

## Output structure

```
notes/<post-slug>.md                              # spec, research, outline (single file, growing through phases 1–3)
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
