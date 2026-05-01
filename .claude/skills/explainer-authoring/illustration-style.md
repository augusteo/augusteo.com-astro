# Illustration style

Inline-SVG conventions for `narrative-explainer`. Mirror `src/content/blog/unified-vision-stack/index.mdx` figure-for-figure. No new design language.

## Palette tokens

All colors from the figures in `unified-vision-stack`. Use these exact hex values; do not pick "close" alternatives.

### Background and structure

- `#EDE5D4` : primary cream / parchment (figure backgrounds, image stand-ins)
- `#F9F5EB` : lighter cream (recessed panels, "feature space" canvases)
- `#F4EEE3` : palest cream (thin strokes between cells, breath inside dark backgrounds)
- `#C9BEAA` : border tan (recessed panel borders)
- `#8F8578` : outline tan (figure outlines, image stand-in borders)
- `#1A1A1A` : near-black (prominent text, dark fill rectangles)

### Prose colors

- `#6B6258` : muted brown (italic descriptive text inside SVGs, subtle labels)

### Primary accents

- `#2563EB` : blue (the "main" accent, used for student/global feature/global accuracy curve)
- `#93C5FD` : light sky blue (regions, soft fills, sky patches)
- `#DBEAFE` : pale blue (translucent cluster fill in embedding-space scatters; soft block backgrounds for blue-class boxes)
- `#0E7490` : deep teal (instance-1 markers, secondary cool accent)
- `#CFF0F6` : pale teal (translucent block fill behind teal strokes; dataset / sample tile fill)

### Warm accents

- `#B8651A` : rust orange (teacher/EMA, output highlights)
- `#D1AE7A` : sand / dune (warm fill, ground patches)
- `#92400E` : fur brown (deeper warm fill)
- `#FEF3C7` : pale yellow (highlight dots, sun)
- `#FBE9CE` : warm cream (translucent block fill behind rust strokes; output column backgrounds)

### Cool / status accents

- `#059669` : emerald green (grass, third-class accent)
- `#15803D` : deep green (paired with `#059669` for "dense features restored" / heavier-weight green strokes and headers)
- `#D1FAE5` : mint (translucent cluster / block fill behind emerald-green strokes; SigLIP-style head boxes)
- `#B91C1C` : red (warning, dense-precision-collapses curve)
- `#9333EA` : purple (instance separation regions, third primary)
- `#EDE0FC` : pale lavender (purple region fills)

### Choosing colors per figure

- Two-class diagram (student vs teacher, global vs dense): `#2563EB` and `#B8651A`.
- Three-class diagram (sky / fur / grass): `#93C5FD`, `#92400E`, `#059669`.
- "Healthy / collapsed" plot: `#2563EB` (healthy curve) and `#B91C1C` (collapsing curve).
- Embedding scatter: `#0E7490` and `#B8651A` for two instances; cluster fill `#DBEAFE`.

## Typography

### Inside SVG

- Body / italic descriptive text: `font-family="serif"` (browser default serif), `font-size="11"` or `font-size="12"`, `font-style="italic"`, `fill="#6B6258"`.
- Plain serif labels (axis titles, figure-internal callouts): `font-family="serif"`, weight `600` for emphasis or default for normal.
- Technical labels (matrix headers, vector values, small caps overlines, tick numbers): `font-family="JetBrains Mono"`, `font-size="10"` or `font-size="11"`, `fill="#6B6258"`, `letter-spacing="1.5"` for the small-caps overline pattern (see `unified-vision-stack` Fig 1: `GLOBAL FEATURE`, `DENSE FEATURES`).

### In MDX prose around the figure

The post's site stylesheet handles the body text; the figure should not try to match prose typography. The figcaption is rendered by the site, not the SVG.

## Figcaption shape

Always:

```mdx
<figure>
  <svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto">
    ...
  </svg>
  <figcaption><strong>Fig N.</strong> Sentence describing what the figure shows. Maybe a second sentence pointing at what to notice.</figcaption>
</figure>
```

- Open the figcaption with `<strong>Fig N.</strong>` (period, not colon).
- One or two sentences. Don't restate the prose; point at what to see in the figure.
- Italicize a key term inside the caption (e.g. `<em>dense feature collapse</em>`) when the figure introduces it.

## viewBox conventions

- Default width: `680`. Height varies by figure complexity (180-320 typical, up to 480 for tall stacks).
- Always `width="100%" height="auto"`. The site renders these scaled to column width.
- `xmlns="http://www.w3.org/2000/svg"` is required for inline SVG to render correctly outside an HTML document.
- Origin top-left, y increases downward (SVG default).

## Stroke widths

- Default outline: `stroke-width="1"` or `1.5`.
- Emphasized line (curve in a plot, key boundary): `stroke-width="2"` or `2.5`.
- Hairline (tick marks, faint gridlines): `stroke-width="0.5"` or `0.8`.
- Always specify; never let strokes inherit.

## Common patterns

### Image-stand-in tile

A schematic image, simplified into colored bands.

```svg
<rect x="30" y="40" width="180" height="180" fill="#EDE5D4" stroke="#8F8578"/>
<rect x="30" y="40"  width="180" height="70" fill="#93C5FD" opacity=".7"/>
<rect x="30" y="110" width="180" height="50" fill="#D1AE7A" opacity=".8"/>
<rect x="30" y="160" width="180" height="60" fill="#059669" opacity=".6"/>
<circle cx="155" cy="75" r="12" fill="#FEF3C7"/>
```

Sky band on top, ground band middle, grass band bottom, optional sun. Border `#8F8578` on a `#EDE5D4` substrate.

### Arrow with marker

```svg
<defs>
  <marker id="a1" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>
<line x1="225" y1="130" x2="265" y2="130"
      stroke="#6B6258" stroke-width="1.5" marker-end="url(#a1)"/>
```

Marker IDs unique per figure (`a1`, `a2`, …). Arrowhead `#6B6258` to match plain stroke color.

### Plot axes

```svg
<line x1="60" y1="260" x2="620" y2="260" stroke="#8F8578"/>
<line x1="60" y1="260" x2="60"  y2="40"  stroke="#8F8578"/>
<g stroke="#C9BEAA" stroke-width=".5" stroke-dasharray="2,3">
  <line x1="60" y1="100" x2="620" y2="100"/>
  <line x1="60" y1="160" x2="620" y2="160"/>
</g>
```

X axis bottom, Y axis left, tan strokes. Dashed gridlines `#C9BEAA` at `0.5` width with `2,3` dash pattern.

Tick labels `font-family="JetBrains Mono" font-size="10" fill="#6B6258"`. Axis title under the X axis, centered, `font-size="11"`.

### Curve labels

Place the label off the curve with a thin connector:

```svg
<text x="425" y="28" font-family="serif" font-size="12" font-style="italic" fill="#2563EB">
  global accuracy (ImageNet)
</text>
<line x1="450" y1="34" x2="478" y2="54" stroke="#2563EB" stroke-width=".8"/>
```

Match label color to curve color. Italic. Connector at `0.8` width.

### Matrix / heatmap cell

```svg
<rect x="40" y="32" width="30" height="22" fill="#2563EB" opacity=".85"/>
<text x="55" y="48" text-anchor="middle"
      font-family="JetBrains Mono" font-size="11" fill="#FFFFFF">0.89</text>
```

Use `opacity` to encode value (0.15 to 1.0). Headers and row labels use weight `600`. `#FFFFFF` text on dark fills, `#1A1A1A` on light.

### Embedding-space scatter

```svg
<rect x="0" y="0" width="290" height="200"
      fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<ellipse cx="145" cy="95" rx="92" ry="48"
         fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5" opacity="0.9"/>
<circle cx="100" cy="78" r="3.5" fill="#0E7490"/>
<circle cx="118" cy="85" r="3.5" fill="#B8651A"/>
```

Recessed panel `#F9F5EB` with `#C9BEAA` border, rounded `rx="4"`. Cluster as ellipse with translucent fill (`#DBEAFE` or `#EDE0FC`) and a 1.5 stroke. Points at radius 3.5.

## What to avoid

- New colors not in the palette. If you need one, propose it to Vic and add it to this doc.
- Drop shadows. The aesthetic is flat-watercolor, not material.
- Gradients except for plain opacity ramps in matrix cells.
- Non-`viewBox` sizing. Always include the `viewBox` and let the SVG scale.
- Title-case labels inside SVGs. Match prose style: sentence case, lowercase for technical terms.
- Em dashes inside text labels. Use commas, periods, or parentheses (same rule as prose).

## Reference figures by type (in `unified-vision-stack`)

When implementing a figure, find the closest existing pattern and copy its structure:

| Figure type | Look at | Why |
|---|---|---|
| Image-to-output transform with arrow | Fig 1 (lines 35-58) | Image stand-in left, output blocks right, arrow between |
| Curves on time axis with two contrasting trends | Fig 2 (lines 101-122) | Plot scaffold, dashed gridlines, italic curve labels |
| Student/teacher EMA training diagram | Fig 3 (lines 163-208) | Two-stack architecture, dashed feedback lines |
| Matrix with header rows / cells | Fig 4 (lines 234-300) | Cells with opacity-encoded values |
| Embedding-space scatter | DINOv3 vs SAM3 panels (lines 365+) | Recessed panel, ellipse cluster, dot scatter |

If a new figure type is needed, halt and propose the new pattern to Vic before adding it. Don't silently extend the kit.
