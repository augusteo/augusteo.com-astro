# Reference: html-explainer-to-post

This file is companion material to `SKILL.md`. It exists so the main skill stays scannable while still providing concrete before/after examples.

## Canonical files

| Role | Path |
|---|---|
| Representative input HTML | `~/Downloads/vision_stack_explainer-new.html` |
| Gold-standard MDX output | `src/content/blog/unified-vision-stack/index.mdx` |
| Schema | `src/content.config.ts` |
| Styles that target the MDX | `src/styles/global.css` (lines ~97–425, the `.prose` and `.essay` rules) |

**Always read both the canonical input and the gold-standard output before starting a conversion.** Pattern-matching against a real example is faster and more reliable than re-deriving the rules from the conversion table.

## Format-defining commits

The MDX format crystallized over three commits — read these to understand *why* each rule is what it is:

| Commit | What it established |
|---|---|
| `d25fc02` | Initial conversion. Set the basic shape: frontmatter, `<figure>`/`<svg>`/`<figcaption>` preserved, `>` blockquotes for asides/callouts, fenced code blocks. |
| `61cbace` | Introduced `essay: true` frontmatter flag. Demoted numbered section headings from `##` to `###`, sub-headings from `###` to `####`, so `essay: true` could give h2 the chapter-level styling (large handwriting + watercolor wash). |
| `ab6ce1d` | SVG layout fix to the pipeline diagram. Hand-tweaked vertical spacing — a reminder that *some* SVG adjustments are post-conversion polish and should not be reproduced by the skill. |

## Worked example: callout block

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

## Worked example: act divider

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
- The em-dash separator (`—`, U+2014) between act number and title.
- The `<em>` in the title is dropped — the act-divider's title becomes a plain markdown heading.
- The `.sub` paragraph becomes an italicized line directly under the heading, separated by a blank line.

## Worked example: SVG normalization

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
13. `<figure>` → `<figure>` (drop `class="wide"`, normalize `<svg>`)
14. `<footer>` `<div class="refs">` → `### References` with markdown links
15. Strip: `<head>`, `<style>`, `<script>`, `<div class="toc">`, `<div class="progress">`, `<header class="masthead">`, `▪ ▪ ▪`, footer chrome
