# Figure kit reference

The seven Svelte primitives, the palette, and the rendering decision tree. Read this before drafting figure specs in phase 3 or implementing figures in phase 5.

## Where things live

```
src/components/figure/Figure.svelte         # caption wrapper
src/components/figure/Slider.svelte         # single range, labelled
src/components/figure/Toggle.svelte         # button group
src/components/figure/Scrubber.svelte       # play/pause/seek
src/components/figure/DragArea.svelte       # 2D drag handle (overlay)
src/components/figure/Canvas2D.svelte       # reactive canvas with draw callback
src/components/figure/Plot.svelte           # line/bar plot, built on Canvas2D
src/figures/shared.ts                        # palette, font, geometry helpers
src/figures/<post-slug>/<figure-name>.ts    # one draw function per figure
```

Aliases configured in `astro.config.mjs`:

```
@components → /src/components
@figures    → /src/figures
@assets     → /src/assets
```

Use these in MDX imports.

## Decision tree: which renderer?

1. Is the figure animated, or driven by a continuous slider that redraws on every input event? Use **Canvas 2D** via `Canvas2D.svelte`.
2. Is the figure a static schematic with maybe one toggle and 5–50 elements? Use inline **`<svg>`** in MDX. No island needed. Cheaper, accessible, and consistent with the existing `unified-vision-stack` figures.
3. Is it a chart with axes, gridlines, and one or more series? Use **`Plot.svelte`** (which composes Canvas2D).
4. WebGL or 3D? Not for this site. Stick with 2D.

## Canvas2D contract

```svelte
<Canvas2D
  draw={(ctx, data, time) => {...}}
  data={{ ...reactive state... }}
  width={480}
  height={180}
  autoplay={false}        // optional; honors prefers-reduced-motion
  background="#F4EEE3"    // optional override
  ariaLabel="..."         // describe the figure for screen readers
/>
```

The `draw` function is **pure**. It receives the canvas context, the current `data` object, and the elapsed time in seconds (zero unless `autoplay`). Every reactive change to `data` triggers a redraw; auto-play loops via `requestAnimationFrame`.

The prop name is **`data`**, not `state`. Svelte 5 reserves `state` because of the `$state` rune.

## Slider contract

```svelte
<Slider
  label="GPUs"
  bind:value={numGpus}
  min={1}
  max={32}
  step={1}
  format={(v) => `${v}×`}   // optional readout formatter
/>
```

Two-way binding via `bind:value`. The label text and value readout sit on either side of the track. Width is fixed at 140px so multiple sliders line up.

## Toggle contract

```svelte
<Toggle
  label="split"
  bind:value={splitMode}
  options={[
    { value: "column", label: "column" },
    { value: "row",    label: "row" },
  ]}
/>
```

Generic over the value type. Use string literals if you want type safety.

## Scrubber contract

```svelte
<Scrubber
  label="t"
  bind:value={t}     // 0..1
  duration={4}       // seconds for one play-through
  autoLoop={false}
/>
```

The `value` is normalized to `[0, 1]`. The play button sits left of the seek track. Dragging the seek pauses auto-play. Honors `prefers-reduced-motion` (won't auto-advance).

## DragArea contract

```svelte
<DragArea
  width={480}
  height={180}
  bind:x={dragX}    // 0..1
  bind:y={dragY}    // 0..1
  label="drag the focal point"
  showCrosshair={false}     // built-in dot, off by default
  onchange={(x, y) => {}}   // optional callback
/>
```

Always overlays a Canvas2D underneath. Pattern in MDX:

```svelte
<div class="overlay">
  <Canvas2D draw={drawX} data={...} width={480} height={180} />
  <div class="overlay-drag">
    <DragArea width={480} height={180} bind:x={px} bind:y={py} />
  </div>
</div>

<style>
  .overlay { position: relative; }
  .overlay-drag { position: absolute; inset: 0; }
</style>
```

The `aria-label` is required.

## Plot contract

```svelte
<Plot
  width={480}
  height={220}
  series={[
    { points: [{x:1,y:100},{x:2,y:50}], color: "#2563EB", label: "compute" },
    { points: [{x:1,y:5},  {x:2,y:9}],  color: "#B91C1C", label: "comm" },
  ]}
  xRange={[0, 32]}      // optional
  yRange={[0, 100]}     // optional
  xLabel="GPUs"
  yLabel="time"
  xTicks={[1, 8, 16, 24, 32]}
  yTicks={[0, 25, 50, 75, 100]}
/>
```

Currently line plots only. Bar plots can be added if a figure needs them; halt and propose if so.

## Figure wrapper contract

```svelte
<Figure caption="..." figNum={4}>
  <Canvas2D ... />

  {#snippet controls()}
    <Slider ... />
    <Toggle ... />
  {/snippet}
</Figure>
```

The optional `controls` snippet renders below the canvas, above the caption. Use it for sliders/toggles tied to the figure. Caption is in italic serif; the `Fig N.` prefix is bold non-italic.

## Palette tokens (from `@figures/shared`)

```ts
import { palette, font } from "@figures/shared";

palette.paper          // "#F4EEE3"  background
palette.paperDark      // "#EDE5D4"  alternate cream
palette.stroke         // "#8F8578"  default outline
palette.strokeMid      // "#C9BEAA"  gridlines, secondary stroke
palette.text           // "#6B6258"  body labels
palette.primary        // "#2563EB"  primary series, primary accent
palette.secondary      // "#B91C1C"  secondary series, contrast accent
palette.tertiary       // "#059669"  tertiary series
palette.accentTan      // "#D1AE7A"
palette.accentBrown    // "#92400E"
palette.accentBlueLight// "#93C5FD"
palette.accentYellow   // "#FEF3C7"

font.mono              // JetBrains Mono stack
font.serif             // Source Serif 4 stack
font.sizeLabel         // 11
font.sizeLabelSmall    // 10
font.sizeCaption       // 12
```

Use `palette.primary` for "the thing the reader is currently focused on." Reserve `secondary` and `tertiary` for contrast and additional series. Don't introduce new colors without checking against the existing `unified-vision-stack` SVGs first.

## Helpers in `@figures/shared`

- `setupHiDPI(canvas, width, height)`: DPR-aware canvas init. `Canvas2D.svelte` calls this for you; only call it directly if you ever bypass the wrapper.
- `clear(ctx, w, h, color?)`: paint the paper background. `Canvas2D.svelte` calls this every frame.
- `drawLabel(ctx, text, x, y, opts?)`: small mono label.
- `drawArrow(ctx, x1, y1, x2, y2, opts?)` and `drawArrowhead(...)`: thin labelled arrows in the same weight as the existing static SVGs.
- `lerp`, `clamp`, `fmt` (number formatter): the usual.
- `prefersReducedMotion()`: SSR-safe media query check.

## Adding a new primitive

Don't, without explicit user approval. The kit is exhaustive on purpose. If you think a figure needs something new, halt and propose it in chat: what the new primitive does, why a composition of existing primitives doesn't work, what the contract would be.

## Known limitations

These are documented constraints of the v1 kit. Each is a real bite if you hit it; check whether your figure is affected before designing around it.

- **Canvas2D does not observe resize or DPR changes.** `setupHiDPI` runs once at mount with the prop-supplied dimensions. CSS `max-width: 100%` lets the canvas shrink visually on narrow viewports, but the backing store stays at desktop size, so figures will look soft on phones and after zoom. Workaround for now: pick widths (480, 520) that look acceptable when scaled down; long-form figures can use `width={680}` to match the existing `unified-vision-stack` SVG viewBoxes. A `ResizeObserver`-based fix is tracked as a follow-up.
- **DragArea has no keyboard support.** Pointer-only. `role="application"` plus `aria-label` is the current accessibility surface; arrow-key nudging and Home/End are not yet implemented. Workaround: pair any drag-overlay figure with a sibling `Slider` or `Toggle` so keyboard users have a path to all the relevant states. A keyboard contract is tracked as a follow-up.
- **Plot under autoplay would over-render.** `Plot.svelte` constructs a fresh `data={{ series }}` object on every render, so the wrapped Canvas2D's `$effect` keys on identity and re-runs even when `series` is unchanged. Fine for the static-input plots the multi-GPU essay uses. Do not add `autoplay` to a Plot until this is fixed; the RAF would restart per parent render.
- **Source Serif 4 is referenced but not loaded.** Captions and demo body text fall through to Iowan Old Style → Georgia. Confirm the existing site loads Source Serif 4 globally, or accept the fallback.
- **Toggle's `role="radiogroup"` is not associated with its `label-text`.** Screen readers will announce "radio group" without the label text. Either provide an `aria-labelledby` association in a follow-up, or only use Toggle inside a `<Figure caption>` whose caption already names the choice.
- **Scrubber pause is one-way.** Dragging the seek bar pauses auto-play and the user has to click play again to resume. Document this in the figure caption if it matters for the figure's flow.

