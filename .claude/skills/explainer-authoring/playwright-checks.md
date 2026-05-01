# Playwright visual checks

Per-figure-type failure modes to look for during the playwright visual review phase of the `explainer-authoring` pipeline. The visual review is the only thing that proves a figure renders cleanly: an SVG that looks right in your head can still ship overlapping labels, illegible contrast, or a clipped viewBox; an interactive Canvas figure that compiles can still drop frames, ignore reduced-motion, or fail to hydrate.

This file covers both static SVG figures and interactive Canvas/Plot figures. Setup, the per-figure loop, and universal checks apply to both. Type-specific checks branch into a static-SVG section and an interactive-figure section.

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

## Type-specific checks: static SVG figures

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

## Type-specific checks: interactive figures

Interactive figures (Canvas2D, Plot, anything with sliders, scrubbers, toggles, drag overlays) need behavioral checks on top of the visual ones above. The dev server has hot reload, so iterate in place.

### Hydration

Check:

- No console errors after the figure scrolls into view. Hydrated islands log nothing in a clean run; a `Cannot read properties of undefined` or `[svelte] hydration_mismatch` is a structural failure.
- The wrapper component renders before its first interaction. Take a screenshot before touching any control; the canvas should already show the initial draw, not a blank rectangle.
- The kit primitive imports resolve. If a `Slider` or `Canvas2D` is missing, the figure renders as an empty `<div>` with no controls — visible in the snapshot as a blank gap.

### Slider / scrubber / toggle responsiveness

Check:

- Move the slider via `mcp__plugin_playwright_playwright__browser_fill_form` (or `browser_evaluate` on the input element) and snapshot at multiple values. The canvas redraw should be visible at each step; a frozen canvas means the wrapper isn't passing state into `data` correctly, or the draw function is reading stale closure values.
- Scrubber play/pause toggles state. Click play, wait one second, snapshot — the canvas should advance. Click pause, snapshot again — it should hold.
- Toggle button groups change the visible state of the figure. The active variant should be styled differently and the canvas content should reflect the choice.
- No layout shift when interacting. The figure's bounding box stays the same width/height across slider values; if the SVG/canvas reflows, the controls strip jumps.

### Reduced motion

Check:

- With `prefers-reduced-motion: reduce` set (use `mcp__plugin_playwright_playwright__browser_evaluate` to set the media query, or run a separate Playwright context with the reduced-motion option), auto-loop scrubbers do not auto-play. Manual scrubbing still works.
- Auto-rotating Canvas animations (camera orbits, particle drifts) freeze on the first frame. The user can still scrub forward manually.

### Touch / drag

Check (only for figures with `DragArea`):

- The drag overlay accepts pointer events. Drag from the center to a corner via `browser_evaluate` dispatching `pointerdown` / `pointermove` / `pointerup`, snapshot mid-drag — the figure should update.
- Touch events do not scroll the page during a drag. If the page scrolls behind the figure, `touch-action: none` is missing on the drag layer.

### Frame budget (sanity check, not blocking)

Not every figure needs profiling, but for canvas figures with 60fps loops, a quick check via `browser_evaluate`:

```js
const t0 = performance.now();
for (let i = 0; i < 60; i++) {
  // trigger one draw
  document.querySelector('input[type="range"]').valueAsNumber += 0.01;
  document.querySelector('input[type="range"]').dispatchEvent(new Event('input'));
}
performance.now() - t0;
```

If the loop takes > ~1000ms, the draw function is doing too much per frame. Investigate before shipping.

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
