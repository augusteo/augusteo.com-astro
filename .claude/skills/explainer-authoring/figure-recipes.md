# Figure recipes

Cookbook patterns for the figure shapes that come up repeatedly in technical explainers. Use these as templates, not as a contract. Adapt for each figure's specific concept.

## Static-default rule

**Default to `static-svg` for every new figure.** Switch to `interactive-canvas` or `plot` only if the figure's intuition value depends on at least one of:

1. **A continuous parameter sweep** the reader can't simulate mentally (e.g., temperature → token distribution shape across 50+ values; learning rate → loss landscape across 100+ steps).
2. **An animated time evolution** where stepping through frames is the load-bearing insight (e.g., gradient accumulation across micro-batches; one DDP step's forward → backward → all-reduce → optimizer phase rhythm).
3. **Drag-based spatial reasoning** where the reader's hand-eye gives them the intuition (e.g., dragging a query token to see attention weights light up; dragging an observer position to see what they see).
4. **Comparison-by-toggle across more states than a 3-panel side-by-side static figure can show** (e.g., 6+ tensor-parallel layouts; routing patterns across 8+ MoE experts).

"It would feel nicer interactive" is not a justification. If two static panels and a one-line caption deliver the insight, ship the static figure. Interactive carries hidden cost (Svelte wrapper, hydration, playwright check, mobile fallback, accessibility) — that cost must buy intuition the reader can't get otherwise.

### For HTML-import mode

The static-default rule applies to **new figures**. Imported figures are auto-classified at extraction time:

- Inline `<svg>` with no scripts/handlers → `static-svg`. Preserve as-is.
- `<canvas>`, `<script>`, or event handlers → `imported-interactive`. Preserve as-is unless Gate 1 demands otherwise.

`imported-interactive` is a distinct figure type from `interactive-canvas`. It bypasses Phase 5's static-default rule (the figure was authored elsewhere) and bypasses the kit-primitive constraint (it doesn't need to use the kit). Phase 6 (playwright) still verifies it renders cleanly.

## Per-figure-type unlock protocol

Phase 3 locks each figure's type. Phase 5 implements them. **The lock has one exception:** a Gate 1 STRUCTURAL finding labeled `TYPE-CHANGE STRUCTURAL` can demand a re-type.

When Gate 1 fires a TYPE-CHANGE finding:

1. Codex's finding is recorded in the `### Codex history` table.
2. Vic is shown the proposed re-type via `AskUserQuestion`. Options: "approve re-type", "keep current type and ignore the finding (Vic's call)", "drop the figure entirely".
3. On approval, the figure table is updated and a "(re-typed at Gate 1, <date>)" annotation is added.
4. Re-type is then locked again; no further changes without another Gate 1 finding.

This applies in both topic mode and HTML-import mode. Without this protocol, "type locked at Phase 3" + "Gate 1 can demand changes" would be a contradiction.

The protocol does NOT fire for cosmetic improvements ("the figure could be tighter"); only for findings labeled STRUCTURAL by codex. The lock-with-one-exception keeps Phase 5 implementation cost predictable.

Every recipe follows the per-figure-wrapper pattern documented in `figure-kit.md` under "Astro hydration." Each interactive figure is three pieces:

1. **Pure draw function** at `src/figures/<post-slug>/<figure-name>.ts`
2. **Wrapper Svelte component** at `src/components/figures/<post-slug>/<FigureName>.svelte`
3. **MDX usage** that imports the wrapper and drops it inside `<Figure>` with `client:visible`

The `.controls` strip CSS shows up at the bottom of every wrapper that has controls. The canonical block is repeated in each recipe so future-you can copy-paste rather than hunt.

## Recipe 1: slider-driven mechanism

The most common figure shape. A slider controls one parameter; the canvas redraws on input. Used for "show me what happens when N changes."

**Draw function** (`src/figures/<post-slug>/all-reduce.ts`):

```ts
import { palette, drawLabel } from "@figures/shared";

export interface AllReduceData {
  gpus: number;
  step: number;
}

export function drawRingAllReduce(
  ctx: CanvasRenderingContext2D,
  data: AllReduceData,
): void {
  const cx = 240, cy = 110, r = 80;
  for (let i = 0; i < data.gpus; i++) {
    const angle = (i / data.gpus) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    drawLabel(ctx, `GPU ${i}`, x, y + 32, { align: "center" });
  }
  // ...arrows for current step, using data.step
}
```

The draw function is **pure**. No closures over reactive state, no DOM access. It receives everything it needs as `data`.

**Wrapper component** (`src/components/figures/<post-slug>/RingAllReduce.svelte`):

```svelte
<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import { drawRingAllReduce } from "@figures/<post-slug>/all-reduce";

  let gpus = $state(4);
  let step = $state(0);
  // Tie one slider's max to another value with $derived if needed.
  const stepMax = $derived(2 * (gpus - 1));
</script>

<Canvas2D
  draw={drawRingAllReduce}
  data={{ gpus, step }}
  width={480}
  height={220}
  ariaLabel="Ring all-reduce: N GPUs in a circle, one chunk passed per step."
/>

<div class="controls">
  <Slider label="GPUs" bind:value={gpus} min={2} max={8} />
  <Slider label="step" bind:value={step} min={0} max={stepMax} />
</div>

<style>
  .controls {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
  }
</style>
```

**MDX**:

```mdx
import Figure from "@components/figure/Figure.svelte";
import RingAllReduce from "@components/figures/<post-slug>/RingAllReduce.svelte";

<Figure caption="Ring all-reduce. Each GPU sends one chunk per step." figNum={4}>
  <RingAllReduce client:visible />
</Figure>
```

## Recipe 2: toggle compares two variants

Two configurations of the same mechanism, side by side or alternating. Used for "column-parallel vs row-parallel," "ring vs tree all-reduce," "naive vs 1F1B pipeline."

**Wrapper** (controls strip uses one Toggle):

```svelte
<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import { drawTensorParallel } from "@figures/<post-slug>/tensor-parallel";

  let split: "column" | "row" = $state("column");
</script>

<Canvas2D
  draw={drawTensorParallel}
  data={{ split }}
  width={520}
  height={220}
  ariaLabel="Tensor parallelism: column-split vs row-split for X·A·B."
/>

<div class="controls">
  <Toggle
    label="split"
    bind:value={split}
    options={[
      { value: "column", label: "column" },
      { value: "row",    label: "row" },
    ]}
  />
</div>

<style>/* same .controls block as recipe 1 */</style>
```

**MDX**:

```mdx
<Figure caption="Tensor parallelism splits a matmul. Column-split keeps all output, row-split keeps all input." figNum={6}>
  <TensorParallel client:visible />
</Figure>
```

The draw function branches on `data.split`. Both branches share the same coordinate frame so the eye can compare. Don't change colors between modes; let layout do the talking.

## Recipe 3: scrubber for an animated mechanism

The scrubber is for fast-moving sequences the reader needs to slow down or pause. Pipeline schedules, all-reduce step-by-step, end-to-end training step.

**Wrapper**:

```svelte
<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import { drawDDPStep } from "@figures/<post-slug>/ddp-step";

  let t = $state(0);
</script>

<Canvas2D
  draw={drawDDPStep}
  data={{ t }}
  width={520}
  height={220}
  ariaLabel="One DDP step: forward, backward, all-reduce, optimizer."
/>

<div class="controls">
  <Scrubber bind:value={t} duration={6} autoLoop={false} />
</div>

<style>/* same .controls block */</style>
```

Inside the draw function, divide `t` into named phases and label them so the reader sees what they're watching:

```ts
const phase = data.t < 0.25 ? "forward"
            : data.t < 0.50 ? "backward"
            : data.t < 0.85 ? "all-reduce"
            : "optimizer";
drawLabel(ctx, phase.toUpperCase(), 260, 20, { align: "center" });
```

## Recipe 4: drag overlay for spatial selection

A drag point that selects a focal location. Used for "pick a GPU in the mesh," "drag the eclipse position," "place the observer."

**Wrapper** (DragArea always sits in a relative-positioned div over Canvas2D):

```svelte
<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import DragArea from "@components/figure/DragArea.svelte";
  import { drawMesh } from "@figures/<post-slug>/mesh";

  let focusX = $state(0.5);
  let focusY = $state(0.5);
</script>

<div class="overlay">
  <Canvas2D
    draw={drawMesh}
    data={{ x: focusX, y: focusY }}
    width={480}
    height={240}
    ariaLabel="Click any GPU. Highlighted GPUs share its DP, TP, or PP comm group."
  />
  <div class="overlay-drag">
    <DragArea
      width={480}
      height={240}
      bind:x={focusX}
      bind:y={focusY}
      label="select a GPU"
    />
  </div>
</div>

<style>
  .overlay { position: relative; }
  .overlay-drag { position: absolute; inset: 0; }
</style>
```

**MDX**:

```mdx
<Figure caption="Click any GPU. Highlighted GPUs share its DP, TP, or PP comm group." figNum={12}>
  <Mesh client:visible />
</Figure>
```

The draw function reads `data.x` and `data.y` (both 0..1) and translates to grid coordinates. Highlight the selected cell and any cells in its comm group. Fade the rest. DragArea has no keyboard support yet (see `figure-kit.md` known limitations); for keyboard parity, pair the figure with a sibling Slider or Toggle.

## Recipe 5: comparison plot

Two or more curves on the same axes. Used for "compute per GPU vs comm overhead as N grows," "memory vs batch size," anything where the punch is the crossing point.

**Wrapper** (Plot is a kit primitive that wraps Canvas2D; no separate draw function needed for simple line plots):

```svelte
<script lang="ts">
  import Plot from "@components/figure/Plot.svelte";
  import { palette } from "@figures/shared";

  // Static curves: just declare them inline.
  // For interactive curves, use $state for inputs and $derived for the points array.
  const computeCurve = Array.from({ length: 32 }, (_, i) => ({
    x: i + 1,
    y: 800 / (i + 1),
  }));
  const commCurve = Array.from({ length: 32 }, (_, i) => ({
    x: i + 1,
    y: 4 * Math.log2(i + 2),
  }));
</script>

<Plot
  width={480}
  height={220}
  series={[
    { points: computeCurve, color: palette.primary, label: "compute" },
    { points: commCurve, color: palette.secondary, label: "comm" },
  ]}
  xRange={[1, 32]}
  yRange={[0, 100]}
  xLabel="GPUs"
  yLabel="time per step (ms)"
  xTicks={[1, 8, 16, 24, 32]}
  yTicks={[0, 25, 50, 75, 100]}
/>
```

**MDX**:

```mdx
<Figure caption="Past about 16 GPUs the all-reduce dominates the compute on this model." figNum={16}>
  <ComputeVsComm client:visible />
</Figure>
```

`Plot.svelte` doesn't support log axes or custom tick labels. If the figure needs either of those (training loss vs tokens, FP8 microscaling), build a custom Canvas2D draw function instead and bypass `Plot.svelte`. That's still within the seven kit primitives because Canvas2D is one of them.

If the plot has interactive inputs (sliders for batch size, scrubber for step number), build the curves with `$derived`:

```ts
let batchSize = $state(8);
const computeCurve = $derived(
  Array.from({ length: 32 }, (_, i) => ({
    x: i + 1,
    y: baseFlops / (i + 1) / batchSize,
  })),
);
```

Note: do not pass `autoplay` to `Plot.svelte`; see `figure-kit.md` known limitations.

## Recipe 6: live calculator

Inputs on the controls strip; a derived readout in big mono text on the canvas. Used for "MFU calculator," "memory budget calculator," "time-to-train estimator."

**Wrapper** (multiple sliders + a derived readout):

```svelte
<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import { drawMFUReadout } from "@figures/<post-slug>/mfu";

  let tflops = $state(160);
  let peak = $state(989);
  let batch = $state(16);
  let comm = $state(15);

  const mfu = $derived(
    ((tflops * batch) / peak / (1 + comm / 100)) * 100,
  );
</script>

<Canvas2D
  draw={drawMFUReadout}
  data={{ tflops, peak, batch, comm, mfu }}
  width={480}
  height={140}
  ariaLabel="MFU calculator with sliders for model TFLOPs, peak TFLOPs, batch, and comm percentage."
/>

<div class="controls">
  <Slider label="model TFLOPs" bind:value={tflops} min={5} max={500} />
  <Slider label="peak TFLOPs"  bind:value={peak}   min={300} max={3000} step={100} />
  <Slider label="batch"        bind:value={batch}  min={1}   max={64} />
  <Slider label="comm %"       bind:value={comm}   min={0}   max={50} format={(v) => `${v}%`} />
</div>

<style>/* same .controls block */</style>
```

Inside `drawMFUReadout`, render `data.mfu.toFixed(0) + "%"` at 48px JetBrains Mono in the centre of the canvas. Add a small bar showing where on the 0–100 scale this lands. The `format` callback on Slider is the cleanest way to render units in the readout — `(v) => "${v}%"`, `(v) => "${v}B"`, `(v) => "${v}×"`.

## Static SVG figures

When a figure is a fixed schematic with maybe a label or two and no controls, skip the wrapper entirely. Inline `<svg>` directly inside `<Figure>` in MDX:

```mdx
<Figure caption="..." figNum={1}>
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" role="img" aria-label="...">
  <!-- shapes here -->
</svg>
</Figure>
```

No hydration, no wrapper component, no draw function. The `unified-vision-stack` figures and Figs 1, 8, 15 of the multi-GPU post are the canonical examples.

## Anti-patterns

- **Importing `Canvas2D` directly into MDX.** Use a wrapper component. Functions don't survive Astro's island JSON serialization.
- **Putting `{#snippet controls()}` inside MDX `<Figure>` for hydrated figures.** Snippets don't compose across the cross-island boundary either. Render controls inside the wrapper, with the `.controls` CSS strip from recipe 1.
- **A slider that doesn't change anything visible.** Either it should obviously affect the figure, or remove it.
- **Three sliders without labels or value readouts.** Always label, always show the value (use the `format` callback for units).
- **A scrubber with no phase labels.** The reader needs to know what they're seeing; print the current phase on the canvas.
- **Animation by default.** Honor `prefers-reduced-motion`. The Scrubber and Canvas2D primitives already do this. Don't add `autoplay` unless the figure genuinely benefits from it.
- **More than four controls on one figure.** Split into two figures. Decompose.
