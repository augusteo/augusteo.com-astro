# HTML import — companion to explainer-authoring

This file is the conversion playbook for HTML-import mode. The main `SKILL.md` directs the pipeline; this file holds the mechanical rules for turning a standalone explainer HTML into the initial MDX + notes file.

Read this file before running Phase 1 in HTML-import mode. Read both of these in full so the patterns are loaded into context:

- Source HTML reference: `~/Downloads/vision_stack_explainer-new.html` (representative input)
- Gold-standard output: `src/content/blog/unified-vision-stack/index.mdx`
- Schema: `src/content.config.ts`
- Styles that target the MDX: `src/styles/global.css` (lines ~97–425, the `.prose` and `.essay` rules)

**Pattern-matching against a real example is faster than re-deriving the rules from this table.** Always open both before starting a conversion.

## Format-defining commits

The MDX format crystallized over three commits — read these to understand *why* each rule is what it is:

| Commit | What it established |
|---|---|
| `d25fc02` | Initial conversion. Set the basic shape: frontmatter, `<figure>`/`<svg>`/`<figcaption>` preserved, `>` blockquotes for asides/callouts, fenced code blocks. |
| `61cbace` | Introduced `essay: true` frontmatter flag. Demoted numbered section headings from `##` to `###`, sub-headings from `###` to `####`, so `essay: true` could give h2 the chapter-level styling (large handwriting + watercolor wash). |
| `ab6ce1d` | SVG layout fix to the pipeline diagram. Hand-tweaked vertical spacing — a reminder that *some* SVG adjustments are post-conversion polish and should not be reproduced by the skill. |

## Input validation (first thing in Phase 1)

Before any conversion:

- The HTML must have an `<h1>` (title source). If missing, halt and ask Vic for a title.
- The `<style>` block should contain at least one of `.callout`, `.aside`, `.act-divider`, `.lead`, or `.keyterm`. If none exist, the file is probably not a Vic-style explainer — halt and report.
- If `<h1>` exists but `<p class="dek">` is missing, proceed but flag that the description will come from the first body paragraph.
- Slug-collision check: if `src/content/blog/<slug>/` already exists, halt and ask Vic for an alternative slug.

## Frontmatter derivation

The full frontmatter schema, file-path conventions, slug rules, and `essay: true` heading hierarchy live in `../../explainer-shared/mdx-output-spec.md`. Read it before writing the MDX.

HTML-import-specific defaults at write time:

| Field | Source |
|---|---|
| `title` | `<h1>` text content. Strip `<em>` markers entirely (YAML frontmatter does not render markdown). Example: `<h1>Image generators are <em>quietly</em> becoming the best vision models</h1>` → `"Image generators are quietly becoming the best vision models"`. |
| `description` | `<p class="dek">` text, plain. If no dek: first body paragraph, truncated to ~200 chars. |
| `pubDate` | Today's ISO date. Phase 7 freshness pass will force-update this to publication day before ship. |
| `heroAlt` | `""` initially; replaced in Phase 7's hero hand-off. |
| `heroImage` | Omitted; added in Phase 7's hero hand-off. |
| `tags` | Infer 1–3 tags per `mdx-output-spec.md` rules. Default `["Tech"]` if uncertain. |
| `featured` | `false`. |
| `draft` | `true`. Vic flips to `false` explicitly when ready to ship; the skill never auto-flips. |
| `essay` | `true`. |
| `slug` | Per the unified slug-derivation rule in the main SKILL.md (kebab-case, drop articles, cap at 6 words, halt on collision). |

## Conversion table

| Source HTML | MDX output |
|---|---|
| `<p class="dek">…</p>` (masthead tagline) | **Two destinations:** (1) plain text → frontmatter `description`. (2) Italicized kicker `*…*` as the first line of the MDX body, immediately after frontmatter and before the first heading. The unified-vision-stack post does exactly this. |
| `<h2 id="sN">N. Heading</h2>` (numbered section) | `### N. Heading` |
| `<h2 id="sN">…<em>x</em>…</h2>` | `### N. … *x* …` |
| `<div class="act-divider"><div class="act-label">Act One</div><h2><em>The</em> Lens</h2><p class="sub">subtitle.</p></div>` | `## Act 1 — The Lens` then blank line then `*subtitle.*` |
| `<h3>Ingredient 1: …</h3>` or `<h3>1. Match the model's medium.</h3>` (subsection inside an essay) | `#### Ingredient 1: …` (every body `<h3>` becomes `####` because `essay: true` makes h2=chapter, h3=section, h4=subsection) |
| `<h2>Epilogue</h2>` (bare, non-numbered, non-act-divider) | `## Epilogue` (chapter level) |
| `<p class="lead">…</p>` (first body paragraph with CSS drop-cap) | Regular markdown paragraph. Drop the `class="lead"`; the drop-cap is CSS-only on the source. Do **not** italicize. |
| `<p>` regular | regular markdown paragraph |
| `<span class="keyterm">x</span>` | `*x*` |
| `<em>x</em>` | `*x*` |
| `<strong>x</strong>` | `**x**` |
| `<code>x</code>` | `` `x` `` |
| `<div class="aside"><p>…</p></div>` | `> …` (one blockquote line per paragraph; blank `>` between paragraphs) |
| `<div class="callout [variant]"><span class="label">Title</span><p>…</p>…</div>` | `> **Title.**` then `>` then each `<p>` as `> body` joined by `>` blank lines. Inline `<strong>x</strong>` stays as `**x**`. **Append a period to the label only if it doesn't already end in `.!?:`** (so `Checkpoint: what you know now` → `**Checkpoint: what you know now.**`). The variant suffix (`.dino`/`.radio`/`.feat`/etc.) carries color in the source; **that color is intentionally lost** — every callout collapses to a plain `>` blockquote. |
| `<div class="codeblock">…</div>` (with custom span coloring) | fenced ` ```<lang> ` block; strip span tags, infer language from content (see heuristics below) |
| `<blockquote>quote</blockquote>` (pull quote, no class) | `> *quote*` |
| `<ol class="numbered"><li>…</li></ol>` | `1. …` markdown numbered list |
| `<ul>`/`<ol>` | standard markdown lists |
| `<figure>` or `<figure class="wide">` containing `<svg>…</svg><figcaption><span class="fignum">FIG N</span>caption</figcaption>` | preserve as `<figure>` (drop `class="wide"`) + normalized `<svg>` + `<figcaption><strong>Fig N.</strong> caption</figcaption>` |
| `<a href="https://…">text</a>` (external link) | `[text](https://…)` |
| `<a href="#sN">text</a>` (in-page cross-reference) | drop the link, keep the text |
| `<footer>` containing `<div class="refs">` | Convert to a final `## References` section in the MDX (heading depth 2, matching topic-mode posts and the canonical `omni-modal-stack` ↔ `unified-vision-stack` pair). Preserve `<a>` links as `[text](url)`. Drop the `<a>Top</a>` / `<a>Contents</a>` nav and the "Prepared for …" tagline (post chrome). Strip the `<strong>References.</strong>` prefix since the heading replaces it. |
| `<footer>` with no `.refs` block | strip entirely |
| `<div class="progress">…</div>` (the JS scroll progress bar near `<body>`) | strip |
| `<p style="text-align:center;…">▪ ▪ ▪</p>` (decorative end-of-content separator) | strip |
| `<span class="tag">x</span>` | drop the wrapper, keep the text |

Strip wholesale: `<head>`, `<style>`, `<script>`, `<div class="toc">…</div>`, `<header class="masthead">…</header>` (after extracting title/dek), the outer `<article>` wrapper, the `▪ ▪ ▪` decorative separator, and `<footer>` content *except* `<div class="refs">`.

## SVG normalization

For every `<svg>` inside a `<figure>`:

- **Sizing:** ensure `width="100%" height="auto"` exist as attributes on the `<svg>` tag. If `style="..."` *only* contains `max-width:NNNpx`, drop the entire `style` attribute. If `style` contains other CSS properties beyond `max-width`, drop only the `max-width` rule and keep the rest. Don't blindly delete `style`.
- **Font swaps:** `font-family="Source Serif 4"` → `font-family="serif"`. `font-family="Fraunces"` → `font-family="serif"`. Any other named display font (`Source Serif`, etc.) → `serif`.
- **Leave alone:** `font-family="JetBrains Mono"` (intentional — design system uses it for figure labels). All paths, rects, circles, lines, gradients, markers, viewBox, defs.
- Don't touch anything inside `<figcaption>` (handled separately by the conversion table).

## Code block language detection

- `def `, `class `, `import `, `self.`, lines ending with `:` → `python`
- `function `, `const `, `let `, `=>`, `{ … }` → `javascript` or `typescript`
- `SELECT`, `FROM`, `WHERE` → `sql`
- `$ ` prefix or `cd `, `git `, `ls ` → `bash`
- Otherwise omit the language fence label

## Auto-classifying imported figures

Every `<figure>` block in the imported HTML gets typed at extraction time. The classifier inspects the figure's contents:

| Figure contents | Type assigned |
|---|---|
| Inline `<svg>` only (no `<script>`, no `on*=` event handlers, no `<canvas>`, no JS libs referenced) | `static-svg` |
| Has `<canvas>` element OR `<script>` block OR any `on*=` handler attribute OR references a JS library (`d3`, `chart.js`, `plotly`, `vega`) | `imported-interactive` (run safety review before accepting) |
| `<img>` with no SVG (rare in Vic's templates) | `static-image` (halt — out of scope; ask Vic before proceeding) |

`imported-interactive` is a distinct figure type from the kit's `interactive-canvas`. It means: "preserved as-imported, not rewritten to use the kit." These figures bypass Phase 5's static-default rule and bypass the kit-primitive constraint. Phase 6 (playwright) still verifies they render cleanly.

### Imported-interactive safety review

Before accepting an `imported-interactive` figure, walk this checklist. Halt and surface to Vic on any check that fails. Preserving arbitrary JS uncritically is how the post grows attack surface and maintenance debt.

**Check 1 — External dependencies.** Does the figure load JS from a CDN via `<script src="https://...">`? If yes, halt. The post must not depend on third-party CDNs at runtime; either inline the JS or convert the figure to static-svg.

**Check 2 — Inline script integrity.** Does the inline `<script>` block contain anything beyond rendering and event handling? Scan for these red-flag tokens (any one is grounds to halt and ask Vic):

- Network calls: `fetch`, `XMLHttpRequest`, `WebSocket`, `navigator.sendBeacon`.
- Storage access: `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`.
- Navigation: `location.href`, `window.open`, `history.pushState`.
- Dynamic code execution: any of the standard "string-as-code" entry points (the `eval` global, the `Function` constructor, `setTimeout` / `setInterval` called with a string first argument).

These are foreign patterns for figures and should not pass through silently.

**Check 3 — Global side effects.** Does the script attach handlers to `window`, `document`, or `body` rather than to its own figure container? If yes, halt — global handlers leak into the rest of the post.

**Check 4 — Style leakage.** Does the figure's `<style>` block target selectors outside the figure itself (no `.figure-N` scoping, raw `body`, `*`, `p`, etc.)? If yes, halt — figure styles must not bleed into prose styling.

**Check 5 — Accessibility.** Does the figure have at least one of: an `aria-label` on the root, a `role` attribute, or a sibling text description? If none, flag for Phase 6 playwright review (don't halt; this is a quality gate, not a safety gate).

**Check 6 — Astro/Svelte integration.** Will this script execute correctly when embedded in MDX rendered by Astro? Specifically: (a) does it use any global it expects to be available before its own script runs? (b) does it require a particular DOM structure that MDX's wrapping may break? Run `bun run dev` and verify the figure renders and behaves before committing the import.

If checks 1-4 fail and Vic insists on keeping the figure, rewrite it as a kit-primitive `interactive-canvas` (under the static-default override clauses) rather than preserve it as `imported-interactive`. Don't let "preserved as-imported" become a backdoor for non-vetted JS.

### Gate 1 demand for imported-interactive re-type

If Gate 1 finds an `imported-interactive` figure that doesn't carry weight, the per-figure-type unlock protocol fires (see main SKILL.md): Vic approves a re-type explicitly, then the figure is rewritten as static-svg or removed.

## Throughline extraction from imported prose

Phase 1 must produce a `## Throughline` section in `notes/<slug>.md`. For HTML-import mode, try in order:

1. **Scan for a recurring concrete scenario** in the imported prose. Look for:
   - A specific named entity that appears in 3+ acts (a company, a model, a system).
   - A specific number repeated across acts (e.g., "1024 H100s" appears in §1, §3, §5).
   - A specific incident (a postmortem, a benchmark, a release).
   If found, propose it as the candidate throughline.
2. **If no recurring scenario found, synthesize per the fallback ladder** from `research-protocol.md`'s "Find the throughline" section: canonical real → composite-with-public-numbers → toy-but-realistic.
3. **If neither works, halt and ask Vic** for a candidate before proceeding to Phase 2.

Record the chosen throughline + how it was found ("extracted from imported prose: §1, §3, §5 reference 1024-H100 cluster" or "synthesized: composite based on public Llama 3 + DeepSeek numbers") in the `## Throughline` section.

## Voice-check auto-repair (HTML mode skips Phase 4 drafting)

HTML-import mode does not draft prose; the imported MDX is the draft. But `voice-rules.md` still applies, and `scripts/voice-check.sh` runs before any commit. When voice-check fails on imported prose, the skill auto-repairs it. Vic does not.

### Em-dash repairs (zero tolerance in prose; one allowed location)

Voice-check exits non-zero on any em-dash (U+2014) outside the act-divider headings. The repair rule:

```
For each em-dash hit in the imported MDX:

1. If the line starts with `## Act ` (an act-divider heading):
   the em-dash is allowed; voice-check exempts these. Leave it.

2. Otherwise, replace the em-dash with the appropriate alternative
   based on its grammatical role:

   a. Pause/break that could be a period or semicolon:
      → period or semicolon (pick the one that preserves rhythm).
      "X — but Y" → "X. But Y." or "X; but Y."

   b. Parenthetical aside ("X — like Y — Z"):
      → comma-bracketed parenthetical: "X, like Y, Z."

   c. Range or interval ("5–10" using em-dash by mistake):
      → en-dash (U+2013): "5–10". Voice-check allows en-dashes.

3. Re-read the rewritten sentence. If the rewrite is awkward (the
   original em-dash was load-bearing for the prose's rhythm), commit
   it anyway and flag the line in the commit message:
   `voice-repair: em-dash → period; rhythm changed at <file>:<line>`.
   Vic can polish later. Don't introduce a banned word in the
   process.
```

### Banned-word repairs

Voice-check flags every word in the banned-word list defined in `voice-rules.md`. For each hit:

```
1. Read the surrounding sentence. Is the banned word being used as a
   real technical term in this context, where no plain-English
   substitute would be precise enough?

   Examples of justified technical use:
   - "leverage" applied to financial leverage in a markets post.
   - "delve" applied to a literal cave/mine context.
   - "navigate" applied to actual map / spatial navigation.

   Examples that are NOT technical:
   - "leverage your existing infrastructure" (generic; rewrite as "use" or "build on").
   - "navigate the trade-offs" (metaphor; rewrite as "weigh the trade-offs").

2. If the use IS justified-technical:
   - Leave the word in place.
   - Add an HTML comment immediately after the line:
     {/* voice-justify: <word> is technical here because <reason> */}
   - voice-check.sh must be updated to recognize this exemption pattern,
     OR the line is grandfathered with a comment annotation that voice-
     check ignores. (Mechanism is voice-check's responsibility; this
     skill just emits the comment.)

3. If the use is NOT justified-technical:
   - Rewrite the sentence with a plain-English substitute. Use the
     suggestions in voice-rules.md's banned-word table.
   - Do not introduce a different banned word in the rewrite. Re-run
     voice-check after each rewrite.

4. If the agent cannot decide whether the use is justified — i.e., the
   call requires domain expertise the agent doesn't have — DO NOT
   silently justify. Halt and surface the line to Vic with the
   sentence quoted. Over-justifying is the failure mode the rule
   exists to prevent.
```

The default leans toward rewrite, not justify. Justification is the exception. If the auto-repair pass produces more than 3 voice-justify comments per 10 banned-word hits, halt and surface the pattern to Vic — too many "technical" exemptions usually means the imported prose is genericist, not domain-precise.

Each voice-repair (em-dash or banned-word) is its own commit, named `voice-repair: <one-line summary>`. voice-check exits clean before the next commit.

## Unsupported-claim repair workflow (Phase 2 in HTML mode)

After fact-check subagents return, every load-bearing claim has one of three statuses:
- **SUPPORTED:** primary source quoted in the matrix.
- **UNSUPPORTED:** no primary source found.
- **CONTRADICTED:** primary source disagrees with the imported claim.

For each UNSUPPORTED or CONTRADICTED claim, the skill repairs the prose. Vic does not. Steps:

1. **Try once more.** Dispatch a single follow-up subagent with the claim text and the constraint "find a primary source or confirm none exists." Budget: 1 agent, max 5 queries, 3 min.
2. **If still unsupported, repair:**
   - **Non-load-bearing claim** (decoration, color, a sentence the post would survive without): delete it. Commit message: `remove unsupported claim: <text snippet>`.
   - **Load-bearing claim, hedgeable:** rewrite from a strong assertion to a hedged one if hedging reflects the available evidence ("X is the standard pattern" → "X is a common pattern"). Source the hedge — even a hedged claim needs a primary source for the weaker version.
   - **Load-bearing claim, contradicted:** rewrite to match the primary source. The primary source wins; the imported HTML loses.
   - **Load-bearing claim, neither hedgeable nor rewriteable:** delete the surrounding sentence/paragraph and rebuild the section so the rest still flows.
3. **Only if rewrite would require deleting an entire section,** halt and surface the section to Vic with a proposed rewrite.

Each repair is its own commit. Voice-check exits clean before each commit.

## Worked examples

### Callout block

**Source HTML:**
```html
<div class="callout dino">
<span class="label">Checkpoint: what you know now</span>
<p><strong>Vision models produce two kinds of features:</strong> a global summary and a per-patch dense map. Both matter.</p>
<p><strong>The failure mode is called dense feature collapse:</strong> the pressure to group patches by semantic content ends up dissolving the per-patch distinctions that dense tasks need.</p>
<p>DINOv3 is now the single strongest vision backbone in the world.</p>
</div>
```

**MDX output:**
```markdown
> **Checkpoint: what you know now.**
>
> **Vision models produce two kinds of features:** a global summary and a per-patch dense map. Both matter.
>
> **The failure mode is called dense feature collapse:** the pressure to group patches by semantic content ends up dissolving the per-patch distinctions that dense tasks need.
>
> DINOv3 is now the single strongest vision backbone in the world.
```

Notes:
- Period appended to the label because it didn't already end in `.!?:`.
- The `.dino` color variant is dropped — every callout becomes a plain `>`.
- Each `<p>` becomes its own `>` line; paragraphs are separated by a blank `>`.
- Inline `<strong>` stays as `**bold**`.

### Act divider

**Source HTML:**
```html
<div class="act-divider act1">
<div class="act-label">Act One</div>
<h2><em>The</em> Lens</h2>
<p class="sub">DINOv3, self-supervised learning at scale, and the trick that saved dense features.</p>
</div>
```

**MDX output:**
```markdown
## Act 1 — The Lens

*DINOv3, self-supervised learning at scale, and the trick that saved dense features.*
```

Notes:
- The em-dash separator (`—`, U+2014) between act number and title. (This is the one place an em-dash is allowed in MDX output; voice-check exempts act-divider headings.)
- The `<em>` in the title is dropped — the act-divider's title becomes a plain markdown heading.
- The `.sub` paragraph becomes an italicized line directly under the heading, separated by a blank line.

### SVG normalization

**Source HTML:**
```html
<figure class="wide">
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="max-width:620px">
<text x="60" y="190" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#6B6258">source</text>
<text x="290" y="75" text-anchor="middle" font-family="Fraunces" font-size="14" fill="#2563EB" font-weight="600">student</text>
<text x="290" y="95" text-anchor="middle" font-family="Source Serif 4" font-size="10" font-style="italic" fill="#6B6258">being trained</text>
</svg>
<figcaption><span class="fignum">FIG 1</span>The same image produces two kinds of output.</figcaption>
</figure>
```

**MDX output:**
```mdx
<figure>
<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto">
<text x="60" y="190" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#6B6258">source</text>
<text x="290" y="75" text-anchor="middle" font-family="serif" font-size="14" fill="#2563EB" font-weight="600">student</text>
<text x="290" y="95" text-anchor="middle" font-family="serif" font-size="10" font-style="italic" fill="#6B6258">being trained</text>
</svg>
<figcaption><strong>Fig 1.</strong> The same image produces two kinds of output.</figcaption>
</figure>
```

Notes:
- `class="wide"` dropped from `<figure>`.
- `style="max-width:620px"` (the only CSS property) replaced with `width="100%" height="auto"` attributes.
- `font-family="Fraunces"` → `serif`. `font-family="Source Serif 4"` → `serif`. `font-family="JetBrains Mono"` left alone.
- All paths, coordinates, fills, and viewBox preserved untouched.
- `<span class="fignum">FIG 1</span>` becomes `<strong>Fig 1.</strong> ` (note the trailing space and period).

## Quick conversion checklist

When converting, scan the source HTML for these markers in order:

1. `<h1>` → frontmatter title (drop `<em>`)
2. `<p class="dek">` → frontmatter description AND italic kicker at body top
3. `<div class="act-divider">` → `## Act N — Title` + `*subtitle*`
4. `<h2 id="sN">N. …</h2>` → `### N. …`
5. `<h2>` (bare, non-numbered) → `## …`
6. `<h3>` (anywhere in body) → `#### …`
7. `<p class="lead">` → plain paragraph
8. `<span class="keyterm">` → `*…*`
9. `<div class="aside">` → `> …`
10. `<div class="callout …">` → `> **Label.**` then `> body`
11. `<div class="codeblock">` → fenced code with inferred language
12. `<blockquote>` (no class) → `> *…*`
13. `<figure>` → `<figure>` (drop `class="wide"`, normalize `<svg>`, auto-classify type)
14. `<footer>` `<div class="refs">` → `## References` with markdown links (heading depth 2)
15. Strip: `<head>`, `<style>`, `<script>`, `<div class="toc">`, `<div class="progress">`, `<header class="masthead">`, `▪ ▪ ▪`, footer chrome

## Edge cases

- **Slug already exists** at `src/content/blog/<slug>/`: do NOT overwrite. Halt and ask Vic for an alternative.
- **No `<p class="dek">`:** use first body paragraph as `description` (truncated to ~200 chars). Don't add the italic kicker line at the top of the body in this case.
- **No act dividers:** fine — the post just has no chapter h2s, only `### N.` sections.
- **Multiple act dividers:** number them sequentially (Act 1, Act 2, …) regardless of class suffix.
- **Inline `<sup>` / footnotes / `<table>`:** preserve `<sup>` as-is (MDX accepts it); convert `<table>` to GFM markdown tables.
- **Source has its own hero `<img>` near the top:** flag and skip — Phase 7's hero hand-off still runs.
- **Imported HTML has interactive figures:** auto-classify as `imported-interactive`; preserve as-is unless Gate 1 demands re-type.

## Phase 1 output structure (HTML mode)

After Phase 1 completes in HTML-import mode, the working tree should have:

```
src/content/blog/<slug>/index.mdx          # converted MDX, draft: true, essay: true
notes/<slug>.md                            # ## Spec, ## Throughline, ## Outline (extracted),
                                           # initial figure table with auto-classified types,
                                           # ## Resume here pointing at Phase 2 (fact-check)
~/.claude/projects/<project>/memory/project_<slug>_post.md   # required pointer
~/.claude/projects/<project>/memory/MEMORY.md                # one-line index entry
```

If any of these are missing, halt before Phase 2.
