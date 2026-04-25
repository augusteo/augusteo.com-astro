---
name: html-explainer-to-post
description: Use when converting a long-form standalone HTML explainer (typically saved to ~/Downloads/, with custom CSS classes like .callout, .aside, .act-divider, .lead, .keyterm, and inline SVG figures) into a new MDX post under src/content/blog/ on this Astro blog. Triggers include "convert this html to a post", "import this explainer", or being given a path to a vision_*.html / *_explainer.html file.
---

# HTML Explainer → Astro MDX Post

## Overview

Vic produces long-form "explainer" HTML files (Fraunces / Source Serif, 800–1000 lines, 14–17 numbered sections, lots of inline SVG illustrations) by chatting with an LLM, saves them to `~/Downloads/`, and converts each one into an MDX post for this blog. This skill is the canonical playbook for that conversion. It is the second of two content pipelines for this site — the other is the Obsidian sync at `scripts/sync-content.ts`.

**Before doing anything else,** read both of these files in full so the patterns are loaded into context:
- Source HTML: `~/Downloads/vision_stack_explainer-new.html` (representative input)
- Gold-standard output: `src/content/blog/unified-vision-stack/index.mdx`

Then read `reference.md` in this directory for worked snippet examples of the trickiest transforms.

## When to use

- Vic gives you a path to a `*_explainer.html` or similar long-form HTML file.
- Vic says "convert this to a post" / "import this explainer" / "make this an MDX post".
- The HTML has a `<style>` block with `.callout`, `.aside`, `.act-divider`, `.lead`, or `.keyterm` classes (Vic's signature explainer template).

## When NOT to use

- Short posts that belong in the Obsidian vault (use `bun run sync` instead).
- HTML from random websites without Vic's template — the conversion rules won't apply.
- If input fails the validation step below, halt and report; do not guess.

## Workflow

### Phase 1 — HTML to MDX draft

1. **Read the source HTML file.**
2. **Validate input** (see "Input validation" below). If it fails, halt with a clear message.
3. **Strip chrome:** remove `<head>`, `<style>`, `<script>`, `<div class="toc">…</div>`, `<div class="progress">…</div>`, `<header class="masthead">…</header>` (after extracting the title/dek), the outer `<article>` wrapper, the `▪ ▪ ▪` decorative separator, and `<footer>` content *except* `<div class="refs">` (which becomes a References section).
4. **Extract frontmatter** per the rules below.
5. **Walk the body** applying the conversion table below.
6. **Normalize every SVG** in `<figure>` blocks per the SVG rules.
7. **Check slug collision:** if `src/content/blog/<slug>/` already exists, halt and ask Vic for an alternative slug.
8. **Write** to `src/content/blog/<slug>/index.mdx`. Do NOT include `heroImage` yet — Phase 2 adds it.
9. **Report** Phase 1 result: file path, slug, tags, pubDate, count of figures, count of code blocks (with their inferred languages), and any ambiguous decisions.

### Phase 2 — Hero image (skippable)

10. **Compose the hero prompt** by filling in the canonical template (below). Output it as a fenced code block so Vic can copy-paste cleanly. Tell Vic he can also say "skip" to leave the post heroless.
11. **Wait** for Vic to either (a) paste a path to a generated image, or (b) say "skip". On skip: report Phase 2 skipped and stop.
12. **Copy the image** to `src/assets/blog/<slug>/<original-filename>`. Preserve the original filename (matches `sync-content.ts` convention). Validate the source path exists before copying.
13. **View the destination image** with the `Read` tool — Claude Code reads PNG/JPG files visually. Propose a one-sentence `heroAlt` based on what is actually visible in the image.
14. **Edit the MDX frontmatter:** add `heroImage: "@assets/blog/<slug>/<filename>"` and update `heroAlt` with the proposed text.
15. **Report** final result: post path, asset path, hero filename, proposed alt, and `http://localhost:4321/blog/<slug>` as the preview URL.

## Input validation

Before any conversion:

- The HTML must have an `<h1>` (title source). If missing, halt and ask Vic for a title.
- The `<style>` block should contain at least one of `.callout`, `.aside`, `.act-divider`, `.lead`, or `.keyterm`. If none exist, the file is probably not a Vic-style explainer — halt and report.
- If `<h1>` exists but `<p class="dek">` is missing, proceed but flag that the description will come from the first body paragraph.

## Frontmatter derivation

| Field | Source |
|---|---|
| `title` | `<h1>` text content. **Strip `<em>` markers entirely** (YAML frontmatter does not render markdown). Example: `<h1>Image generators are <em>quietly</em> becoming the best vision models</h1>` → `"Image generators are quietly becoming the best vision models"`. |
| `description` | `<p class="dek">` text, plain. If no dek: first body paragraph, truncated to ~200 chars. |
| `pubDate` | Today (ISO date, e.g. `2026-04-24`). |
| `heroAlt` | `""` in Phase 1; replaced in Phase 2 if a hero is supplied. |
| `heroImage` | Omitted in Phase 1; added in Phase 2 as `"@assets/blog/<slug>/<filename>"`. |
| `tags` | Infer 1–3 tags. **First grep `src/content/blog/*/index.mdx` for the existing tag vocabulary** and prefer tags Vic has used before (commonly `"AI"`, `"ML"`, `"Tech"`). Only invent a new tag if no existing one fits. If genuinely uncertain, use `["Tech"]`. |
| `featured` | `false`. |
| `draft` | `true`. |
| `essay` | `true` (every long-form explainer of this format gets the 3-tier heading hierarchy). |
| `slug` | Kebab-case the title, drop articles ("the", "a", "and", "is", "are", "of"), cap at ~6 words. Aim for 3–4 words to match Vic's existing convention (`unified-vision-stack`, `claude-code-plugin-stack`, `claude-code-workflow-planning`). |

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
| `<footer>` containing `<div class="refs">` | Convert to a final `### References` section in the MDX. Preserve `<a>` links as `[text](url)`. Drop the `<a>Top</a>` / `<a>Contents</a>` nav and the "Prepared for …" tagline (post chrome). Strip the `<strong>References.</strong>` prefix since the heading replaces it. |
| `<footer>` with no `.refs` block | strip entirely |
| `<div class="progress">…</div>` (the JS scroll progress bar near `<body>`) | strip |
| `<p style="text-align:center;…">▪ ▪ ▪</p>` (decorative end-of-content separator) | strip |
| `<span class="tag">x</span>` | drop the wrapper, keep the text |

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

## Hero image prompt template (Phase 2 step 10)

Output this verbatim with the three slots filled in. Use a fenced code block in the chat so Vic can copy cleanly:

```
You are a "Blog Post Hero Image Generator"

[STYLE DESCRIPTION]: Hero image with the style of watercolor and ink line and wash illustration, rendered in the style of a loose, expressive urban sketch or travel journal entry. The artwork features sketchy black ink pen outlines with visible hatching and scribbles for texture. Translucent, blended watercolor washes in soft, earthy greens, browns, blues, and warm orange-pinks fill the forms, showing wet-on-wet bleed and paper texture.

Write the title of the blog post with Hand-lettered, casual sans-serif text, written with the same ink pen, is integrated into the upper middle portion of the composition. The overall feel is organic, atmospheric, and captured in the moment.

Add 'augusteo.com' below the title in smaller size font.

[TITLE]: <post title verbatim>

[ASPECT RATIO]: 16:9 (landscape)

[CONTENT]: <2–4 sentences describing a metaphorical / symbolic scene that captures the post's central idea. Lean abstract for technical posts (ML / AI / engineering — picture the *concept* as a sketch, not a literal screenshot or UI). Name 1–3 concrete objects to anchor the composition. Do NOT request specific real people, brand logos, or copyrighted imagery.>
```

## Edge cases

- **Slug already exists** at `src/content/blog/<slug>/`: do NOT overwrite. Halt and ask Vic for an alternative.
- **No `<p class="dek">`:** use first body paragraph as `description` (truncated to ~200 chars). Don't add the italic kicker line at the top of the body in this case.
- **No act dividers:** fine — the post just has no chapter h2s, only `### N.` sections.
- **Multiple act dividers:** number them sequentially (Act 1, Act 2, …) regardless of class suffix.
- **Inline `<sup>` / footnotes / `<table>`:** preserve `<sup>` as-is (MDX accepts it); convert `<table>` to GFM markdown tables.
- **Source has its own hero `<img>` near the top:** flag and skip — Phase 2 still runs.

## Verification

After writing the MDX:

1. Confirm `bun run dev` is running, or tell Vic to start it. Default URL: `http://localhost:4321/blog/<slug>`.
2. Spot-check: figures render, every `### N.` heading appears in section order, no raw HTML class attributes leaked through (`class="keyterm"`, `class="callout"`, etc.), no `<span class="…">` leftovers.
3. Report decisions Vic might want to override: tags, slug, code-block languages.

## Reference

Worked before/after snippets and pointers to the canonical example: see `reference.md` in this directory.
