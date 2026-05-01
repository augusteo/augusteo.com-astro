# Playwright visual checks

Per-figure-type failure modes to look for during Phase 7 of the `narrative-explainer` pipeline. The visual review is the only thing that proves a figure renders cleanly; SVG that looks right in your head can still ship overlapping labels, illegible contrast, or a clipped viewBox.

## Setup

1. Start the dev server in the background:
   ```bash
   bun run dev
   ```
   Use `Bash` with `run_in_background: true`. The server takes ~3-5 seconds to come up. Wait for the "ready" log line before navigating, or retry once on a failed first navigation.
2. Navigate to the post route via the playwright MCP server:
   ```
   mcp__plugin_playwright_playwright__browser_navigate { url: "http://localhost:4321/blog/<post-slug>" }
   ```
   Confirm the page loads with no console errors via `mcp__plugin_playwright_playwright__browser_console_messages`.

## Per-figure loop

For each figure, in order:

1. Scroll the figure into view. Use `mcp__plugin_playwright_playwright__browser_evaluate` with a small `scrollIntoView()` snippet on the figure's element if it isn't already visible.
2. Snapshot. Use `mcp__plugin_playwright_playwright__browser_take_screenshot`. Don't snapshot the whole viewport for narrow figures; pass an element selector or clip box when feasible.
3. Read the screenshot back. Verify against the figcaption: does the figure visibly communicate what the caption claims?
4. Run the type-specific checks below.
5. If anything fails, edit the SVG in MDX, save, wait for the dev server to reload (~1 second), re-snapshot. Repeat until clean.
6. **Halt rule.** If the same figure fails three iterations in a row, stop and surface to Vic. Don't churn on a figure whose design isn't converging.

## Universal checks (every figure)

Before running type-specific checks, verify these on every figure:

- **No clipped viewBox.** Nothing extends past the edges of the SVG canvas. Labels at the edges have at least 4px of padding inside the viewBox.
- **No overlapping text.** Labels don't sit on top of each other or on top of strokes that make them hard to read.
- **Contrast.** Text is `#1A1A1A` (or white on a dark fill), not `#6B6258` on a similar-toned background. Labels read at body font size when the figure is at column width.
- **Caption matches figure.** The figcaption's claim is something the figure actually shows. If the caption says "the curve peaks early," the curve in the figure should visibly peak early.
- **Palette compliance.** All fills and strokes are from the palette in `illustration-style.md`. No off-brand colors.

## Type-specific checks

### Image-stand-in tile (Fig 1 pattern)

The colored-band tile that represents an input image.

Check:

- Bands are stacked vertically (sky / ground / grass), not horizontally.
- Band proportions are realistic (sky < ground+grass usually, though scene-dependent).
- The yellow sun (`#FEF3C7`) circle, if present, sits in the sky band, not on a band edge.
- Border `#8F8578` is visible on a `#EDE5D4` substrate.
- Tile is approximately square; the next element starts to its right with an arrow.

### Plot with two contrasting curves (Fig 2 pattern)

X-axis time / iterations, Y-axis a metric.

Check:

- Both axis lines render. Axis tick labels are present and legible at body font size.
- Dashed gridlines are visible but recessed (`#C9BEAA` at `0.5` width).
- Curves are at `2` or `2.5` width and clearly distinguishable by color.
- Curve labels are placed off the curve, with a thin connector at `0.8` width. Labels match curve color.
- The visual story of the plot is unmistakable: if one curve "rises and keeps rising" and the other "rises, peaks, collapses," that should be obvious from the curve shapes alone, before reading any label.

### Architecture / training diagram (Fig 3 pattern)

Boxes representing components, arrows for data flow, dashed lines for feedback.

Check:

- Boxes for "student" and "teacher" (or analogous components) are clearly distinguished by color (`#2563EB` and `#B8651A`).
- Arrows have visible heads (the marker definition rendered correctly). If the arrow ends in a flat line with no triangle, the marker `id` was not unique to this figure or `marker-end` isn't pointing to the right `url(#...)`.
- Dashed feedback lines (`stroke-dasharray="3,3"`) are visually distinct from solid forward arrows.
- The loss block, if present, has a dark fill (`#1A1A1A`) with light text (`#F4EEE3`).
- The flow direction (left-to-right or top-to-bottom) is consistent through the whole diagram.

### Matrix / heatmap with cell values (Fig 4 pattern)

Square grid of cells, values inside each cell.

Check:

- Cell values are centered in their cells.
- Opacity-based shading is monotonic with the value (higher value = more opaque, or vice versa, but consistent).
- Diagonal cells (if a Gram-matrix-style figure) read as the visual extreme (full opacity if values are normalized to 1.0).
- Headers row and column are clearly weighted heavier than cell values.
- The overall pattern (high values on diagonal, off-diagonal values gradient) is visible at a glance, not requiring close reading of every number.

### Embedding-space scatter (DINOv3-vs-SAM3 pattern)

Recessed panel containing one or two ellipse "clusters" with scattered point markers.

Check:

- Recessed panel `#F9F5EB` with `#C9BEAA` border is visible against the figure background.
- Cluster ellipse fill is translucent enough that points inside are still visible (`opacity="0.9"` on the ellipse, points fully opaque).
- Two-color point classes are clearly distinguishable. Color legend (above or beside the panel) names what each color means.
- For "merged into one cluster" panels: points of both colors are scattered through one ellipse and the visual claim "the two classes are blurred together" is unmistakable.
- For "separated into two clusters" panels: there are two ellipses, with a visible gap between them, and points of each color stay inside their own ellipse.

### Equation or symbol diagram

Inline LaTeX-like equation rendered with text elements.

Check:

- Symbols don't collide. Subscripts and superscripts are at half-size and offset correctly.
- Greek letters and operators render via the font, not as boxes (a missing-glyph box looks like a square; if you see one, the font fallback failed).
- Color-coding (when an equation has annotated terms in different colors) matches the colors used elsewhere in the figure or post.

### Before / after comparison

Two side-by-side panels showing the same scene under different conditions.

Check:

- Panels are visibly the same size and use the same coordinate scale.
- The "after" panel's change is unmistakable. If the difference is subtle, the figure is failing its job.
- Captions / labels under each panel say "before" / "after" or the equivalent (the specific terms matter; use the post's vocabulary).

## Common failure patterns and fixes

| Failure | Likely cause | Fix |
|---|---|---|
| Arrow ends in a flat line | Marker `id` reused across figures, or `marker-end` URL is wrong | Make `id` unique within the SVG (`a1`, `a2`, …) and confirm `marker-end="url(#a1)"` matches |
| Label sits on a stroke | Text placed directly on a line | Move the label off the line or add a short connector and reposition the text |
| Numbers overflow cells in a matrix | Cell width too small for `font-size="11"` | Increase cell width (e.g. 30 → 36) or reduce font size to `10` |
| Curve looks straight when it should curve | Path points lack control points | Use a Bezier (`Q` or `C`) instead of `L`, with control points that produce the intended shape |
| Sky / ground / grass bands are the same height | Default rect heights all equal | Vary the height parameters; a typical scene is sky 70 / ground 50 / grass 60 in a 180 px tile |
| Cream background looks white | The figure's outer rect is missing or has the wrong fill | Add an outer `<rect>` or a parent `fill="#EDE5D4"` |
| One color from the palette looks wrong | A near-but-not-exact hex was used | Cross-check against `illustration-style.md` palette tokens; replace with the exact value |
| Text is gray on light cream | `fill="#6B6258"` on a `#EDE5D4` or `#F9F5EB` background | Switch to `#1A1A1A` for primary text; reserve `#6B6258` for italic descriptive captions only |
