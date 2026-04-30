---
name: narrative-explainer
description: Long-form blog post with STATIC inline-SVG figures (no Svelte, no Canvas, no client-side state) for augusteo.com, single-session pipeline. Use ONLY when the user names static figures, wants prose-first, or doesn't need interactivity. Triggers include "narrative post on X", "deep prose post on X", "explainer with static illustrations", "research X and write a single-session post", "write a deep post on X" (when interactivity is NOT mentioned). Drives an eight-phase pipeline (topic + audience, deep research with parallel subagents, outline + figure list, codex gate 1, draft prose, implement static SVG, playwright visual review, codex gate 2 + ship). If the user names sliders / scrubbers / Canvas / Svelte / interactivity, use `interactive-explainer` instead. If a pre-baked HTML file exists, use `html-explainer-to-post`. When ambiguous, halt at Phase 1 brainstorm and ask static-vs-interactive before proceeding.
---

# Narrative explainer pipeline

## What this is

A single-session pipeline that takes a topic ("how WebGPU compute shaders dispatch", "how attention computes inside a transformer") and ends with a published-ready MDX post on augusteo.com containing 8-15 static SVG figures, written in Vic's voice.

The skill is a sibling of `interactive-explainer`. Same research bar, same voice rules, same narrative shape. The difference: figures are static SVG (no Svelte, no Canvas, no client-side state), the run is one session from Vic's perspective, and there are two adversarial gates (`/codex` outline review, `/codex` final-draft review) plus a per-figure playwright visual gate.

Read these companions in order before starting any phase:

- `../../explainer-shared/voice-rules.md`: the full "Write Like a Human, Not an AI" guide. Apply during drafting, not as cleanup. (Shared with `interactive-explainer`.)
- `../../explainer-shared/research-protocol.md`: what counts as a primary source, recency requirement, citation format. (Shared.)
- `../../explainer-shared/narrative-template.md`: section scaffold and reader-direction phrasing. (Shared.)
- `illustration-style.md`: inline SVG conventions (palette tokens, typography, figcaption shape, viewBox conventions).
- `codex-prompts.md`: the exact prompts for the two `/codex` challenge gates.
- `playwright-checks.md`: per-figure-type failure modes to look for during the visual review phase.

## When to use

- Vic gives a topic and asks for a deep narrative post (no Svelte interactivity needed).
- Vic says "write me a single-session explainer on X", "research and write a narrative post on Y".
- Vic seeds 3-5 starter resources and says "write the post, single session."

## When NOT to use

- Vic wants interactive figures with sliders, scrubbers, or Canvas plots: use `interactive-explainer`.
- A pre-baked HTML file already exists: use `html-explainer-to-post`.
- A topic where Vic can't name 3 primary sources newer than 18 months. Halt and ask.
- A short Obsidian-vault post: use `bun run sync` (the existing Obsidian pipeline).

## The eight phases

Each phase becomes a `TaskCreate` when the skill runs. Phases are gates; do not skip ahead. The whole run is a single session from Vic's perspective, but the phase boundaries are real and visible in the task list.

### Phase 1: topic + audience lock-in

Goal: a one-paragraph spec that says what the post is about, who it's for, and what the reader walks away knowing.

1. **First action: invoke the Skill tool with `skill: superpowers:brainstorming`.** Do not skip. Announce the invocation so Vic sees it. Same discipline as `interactive-explainer` Phase 1.
2. Inside brainstorming, ask one at a time: who is the reader (engineers? researchers? curious newcomers?), what is the smallest claim they walk away believing, target length (default ~30 minute read), title sketch, 3-5 starter resources from Vic.
3. Output: `notes/<post-slug>.md` opens with a `## Spec` section containing the paragraph, target audience, target length, title sketch, and the starter resources.
4. Drop a project-memory entry at `~/.claude/projects/<project>/memory/project_<slug>_post.md` and add a one-line `MEMORY.md` pointer so a fresh context sees the in-flight post on session start. Remove the `MEMORY.md` pointer after Phase 8 ships.

### Phase 2: deep research (parallel subagents)

Goal: a research notes file the prose can draw from, with primary sources quoted directly. This phase determines whether the post can stand up to scrutiny.

1. Read `../../explainer-shared/research-protocol.md` for the source bar (primary only, 18-month recency rule, what does and does not count).
2. **Decompose the topic into 2-3 sub-topics.** Example: for "how attention works", decompose into tokenization + embedding, multi-head structure, positional encoding. Each sub-topic must be answerable independently.
3. **Dispatch the subagents in parallel.** One message, multiple `Agent` tool calls, `subagent_type: Explore` or `general-purpose`. **REQUIRED:** follow `superpowers:dispatching-parallel-agents` for the convention. Each subagent's prompt:
   - Names the sub-topic and the specific claims that need backing.
   - Inlines the source bar (primary only, 18-month rule, what doesn't count) verbatim into the prompt body. The parent has already read `../../explainer-shared/research-protocol.md` in step 1; copy the relevant rules straight into the subagent prompt so the subagent has them without needing to read the file (subagents run from the repo root and would not resolve a bare filename).
   - Required output: quoted excerpts with arxiv IDs, commit hashes, publication dates, access dates, grouped by claim. Bare URLs are not enough; the subagent must quote the part of the source that supports the claim.
4. Read every starter resource Vic provided yourself (do not delegate this; the starter resources are Vic's signal of what matters).
5. Merge subagent outputs into `notes/<post-slug>.md` under `## Research notes`. Group by sub-topic, not by source.
6. **Halt rule.** If after honest searching the merged notes have fewer than three primary sources newer than 18 months, **halt and ask Vic**. Two paths: proceed with older sources and put a "this reflects best practice as of <date>" note in the post, or pick a different angle. Do not silently lower the bar.
7. Where a small reference implementation is feasible (50 lines of code that demonstrates the mechanism), run it. Save to `notes/<post-slug>-reference.<ext>` (or `notes/<post-slug>/` for multi-file). The point is to catch confused intuition before drafting, not to publish the script.
8. Show Vic the notes file. Ask if anything is missing or wrong before Phase 3.

### Phase 3: outline + figure list

Goal: a section structure plus a numbered figure table.

1. Read `../../explainer-shared/narrative-template.md` for the three-act shape (set up the problem → decompose into mechanisms → reassemble) and the per-section rhythm.
2. Sketch the section list. Number sections (`### 1. ...`, `### 2. ...`) as in `unified-vision-stack`. Use act dividers between major narrative turns; copy the divider format the post uses verbatim.
3. For each section, list the figures it needs. **Per-figure spec:** mechanism it isolates, what the reader should walk away noticing. All figures are static inline SVG.
4. Append the outline + figure table to `notes/<post-slug>.md` under `## Outline`.

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
   - `heroAlt` is required by the schema (`z.string()`, not optional). Set it to a placeholder string like `"TODO: hero image not yet selected"` so the content collection validates and Phase 7's `bun run dev` can render the route. Phase 8 replaces the placeholder with a real description after Vic picks the hero.
   - `heroImage` is `image().optional()`, so omit the key entirely. Phase 8 adds it.
2. Draft section by section. For each section: state the claim, drop a figure placeholder (`{/* TODO: Fig N: <mechanism> */}`), tell the reader what to notice in the figure, then explain the mechanism, then hand off.
3. **Apply voice rules during drafting.** Don't write a "polished" pass and clean up. After each section, run the voice-check script:
   ```bash
   scripts/voice-check.sh src/content/blog/<post-slug>/index.mdx
   ```
   It exits non-zero on any hit. Em dashes: zero. Banned words: rewrite, or if the word is a real technical term in this context, leave a one-line comment in the source naming why it stays. Re-run until clean.
4. **Emit a `## References` section at the end of the post** by transcribing every quoted primary source from `notes/<post-slug>.md`'s `## Research notes` section. One Markdown link per source: title, authors (or org), year, arxiv ID or URL. The reader must be able to trace every load-bearing claim back to a source without reading the private notes file. (Gate 2 in Phase 8 will halt the post if this section is missing.)
5. Commit per section so each one is reviewable in isolation.

### Phase 6: implement static SVG figures

Goal: every figure placeholder replaced with an inline `<figure><svg>...</svg><figcaption>...</figcaption></figure>`.

1. Read `illustration-style.md` for the palette tokens (cream background, navy and rust accents, the watercolor-manuscript aesthetic of `unified-vision-stack`), typography (serif for prose, JetBrains Mono for technical labels), figcaption shape (`<strong>Fig N.</strong> <description>`), viewBox conventions.
2. For each figure: write the inline figure block in MDX, replacing the `{/* TODO: Fig N */}` placeholder.
3. Use the same palette, font stack, stroke widths, and figcaption shape as `unified-vision-stack`. **No new design language; mirror the existing post.** If a figure type isn't covered by the existing post, propose the new pattern to Vic before adding it.
4. Commit per figure so each is reviewable in isolation.

### Phase 7: playwright visual review (iterate per figure)

Goal: every figure renders cleanly at the actual post route. No overlapping text, no clipped viewBox, no illegible contrast, no layout overflow.

1. Start `bun run dev` in the background (use `Bash` with `run_in_background: true`).
2. Use the playwright MCP server (`mcp__plugin_playwright_playwright__*`) to navigate to `http://localhost:4321/blog/<post-slug>`.
3. For each figure: scroll into view, snapshot, read the screenshot back. Ask: does this figure communicate what its caption claims? Are labels legible? Is there overlap or clipping?
4. If the figure fails: edit the SVG in MDX, re-snapshot. Stop when it passes.
5. `playwright-checks.md` lists per-figure-type failure modes (bar plots, schematics, equation diagrams, before/after).
6. **Halt rule.** If a single figure fails review three times in a row, halt and surface to Vic. Don't keep churning on a figure that isn't converging; the design might need rethinking.

### Phase 8: codex gate 2 + voice check + hero hand-off

Goal: the post ships.

1. Run `/codex` in challenge mode against the full MDX draft. Use the gate-2 prompt from `codex-prompts.md`. Codex attacks technical accuracy, weak arguments, and any claim that drifts from a quoted source in the notes.
2. Iterate until critique is cosmetic. **Halt rule.** If codex finds a claim that no quoted source in the notes file actually supports, halt and surface to Vic. The post must not ship with claims the research doesn't back.
3. Final `voice-check.sh` pass on the full file. Em dashes: zero. Banned words: zero or justified.
4. Hand off the hero image step to Vic. Same handoff as `html-explainer-to-post`: Vic picks the image, the skill copies it to `src/assets/blog/<post-slug>/hero.<ext>` and proposes a `heroAlt` after viewing.
5. Confirm `draft: false` and `essay: true`. Verify in dev: walk every figure, read the post end-to-end at `http://localhost:4321/blog/<post-slug>`.
6. Final commit naming the post. Remove the `MEMORY.md` "in progress" pointer that Phase 1 created.

## Hard rules

- **Three primary sources newer than 18 months minimum.** Otherwise halt and ask. No silent lowering of the bar.
- **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
- **Two codex gates and a playwright per-figure gate are mandatory.** Skipping any gate violates the spirit of this skill. The skill exists because gates catch what the model misses.
- **Density is fine. Correctness of intuition is the bar.** Don't soften technical claims to make them more "approachable."
- **Static SVG only.** No Svelte, no Canvas, no client-side state. If interactivity is needed, this is the wrong skill: switch to `interactive-explainer`.
- **One section per commit, one figure per commit.** Safe revert points.
- **Heading style is sentence case**, no exceptions. Numbered sections (`### 3. The all-reduce sub-problem`) match `unified-vision-stack`.

## Halt-and-ask conditions

The skill must explicitly halt and surface the issue (no silent proceed) when:

- Phase 2 turns up fewer than three primary sources newer than 18 months.
- Phase 4 codex finds an issue that implies rescoping the post.
- Phase 6 needs a figure type or palette color not covered by `unified-vision-stack` / `illustration-style.md` (propose the new pattern to Vic; do not silently extend).
- Phase 7 a single figure fails playwright review three times in a row.
- Phase 8 codex finds a claim that no quoted source in the notes file supports.
- Any phase: realizing mid-pipeline that interactivity is needed (this is the wrong skill; switch to `interactive-explainer`).

### Halt-state housekeeping

When the skill halts at any phase, do this before stopping:

1. Append a `Status: halted-phase-<N>-<YYYY-MM-DD>` line to the top of the project memory file at `~/.claude/projects/<project>/memory/project_<slug>_post.md` along with a one-paragraph note on what triggered the halt and what would unblock it.
2. **Leave the `MEMORY.md` pointer in place.** It is the resume signal: a future session needs it to discover the in-flight post. Do not remove it on halt; only Phase 8 (post shipped) removes it.
3. Surface the halt explicitly to Vic in the chat. Do not silently park the post.

## Composition with other skills

- **REQUIRED:** Phase 1's first action is to invoke `superpowers:brainstorming`.
- **REQUIRED:** Phase 2 dispatches parallel subagents per `superpowers:dispatching-parallel-agents`.
- Phase 4 and Phase 8 invoke the project-local `codex` skill (challenge mode).
- Phase 7 uses the playwright MCP server.
- Does not call `superpowers:writing-plans`. The figure list is the plan.
- `interactive-explainer` is the sibling skill for interactive figures. `html-explainer-to-post` is the sibling skill for HTML conversion.

## Output structure

```
notes/<post-slug>.md                              # spec, research, outline, codex review (single file)
notes/<post-slug>-reference.<ext>                 # optional reference implementation from Phase 2
src/content/blog/<post-slug>/index.mdx            # the post
src/assets/blog/<post-slug>/hero.<ext>            # added in Phase 8 by Vic
```

## Verification

After Phase 8:

- Post renders at `http://localhost:4321/blog/<post-slug>` with no console errors.
- Every figure displays cleanly: no overlap, no clipping, labels legible.
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
| "I'll skip the playwright review, the SVG looks right in my head" | The screenshot is the only thing that proves it renders. Run the check. |
| "Two of the sources are 19 months old, that's basically the same" | The 18-month rule is the rule. Halt and ask if you can't meet it. |
| "I can paraphrase the source instead of quoting" | Quote the part that supports the claim. Paraphrase rots; quotes don't. |
| "Voice-check is failing on a real technical term, I'll just disable the check" | Leave a one-line comment naming why the term stays. The check stays on. |
| "The codex final gate found one issue, I'll fix it next session" | The skill is single-session by design. Fix it now or halt with a clear write-up. |
