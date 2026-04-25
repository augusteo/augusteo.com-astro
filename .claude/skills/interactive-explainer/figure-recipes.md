# Figure recipes

Cookbook patterns for the figure shapes that come up repeatedly in technical explainers. Use these as templates, not as a contract. Adapt for each figure's specific concept.

## Recipe 1: slider-driven mechanism

The most common figure shape. A slider controls one parameter; the canvas redraws on input. Used for "show me what happens when N changes."

**MDX:**

```mdx
import Figure from '@components/figure/Figure.svelte';
import Canvas2D from '@components/figure/Canvas2D.svelte';
import Slider from '@components/figure/Slider.svelte';
import { drawRingAllReduce } from '@figures/multi-gpu-training/all-reduce';

<Figure caption="Ring all-reduce. Each GPU sends one chunk per step." figNum={4}>
  <Canvas2D
    draw={drawRingAllReduce}
    data={{ gpus: numGpus, step }}
    width={480}
    height={220}
    ariaLabel="ring all-reduce visualization"
  />

  {#snippet controls()}
    <Slider label="GPUs" bind:value={numGpus} min={2} max={8} />
    <Slider label="step" bind:value={step} min={0} max={2 * (numGpus - 1)} />
  {/snippet}
</Figure>
```

**Draw function (`src/figures/multi-gpu-training/all-reduce.ts`):**

```ts
import { palette, font, drawArrow, drawLabel } from "@figures/shared";

export function drawRingAllReduce(
  ctx: CanvasRenderingContext2D,
  data: { gpus: number; step: number },
) {
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
  // ...arrows for current step
}
```

Two important rules:

- The draw function is pure. No closures over reactive state, no DOM access. Receives everything as `data`.
- Tie slider min/max to other state if needed (notice `step` max depends on `numGpus`). Use `$derived` in the parent component if needed.

## Recipe 2: toggle compares two variants

Two configurations of the same mechanism, side by side or alternating. Used for "column-parallel vs row-parallel," "ring vs tree all-reduce," "naive vs 1F1B pipeline."

```mdx
<Figure caption="Tensor parallelism splits a matmul. Column-split keeps all output, row-split keeps all input." figNum={6}>
  <Canvas2D
    draw={drawTensorParallel}
    data={{ split: splitMode }}
    width={520}
    height={220}
  />

  {#snippet controls()}
    <Toggle
      label="split"
      bind:value={splitMode}
      options={[
        { value: "column", label: "column" },
        { value: "row",    label: "row" },
      ]}
    />
  {/snippet}
</Figure>
```

The draw function branches on `data.split`. Both branches share the same coordinate frame so the eye can compare. Don't change colors between modes; let layout do the talking.

## Recipe 3: scrubber for an animated mechanism

The scrubber is for fast-moving sequences the reader needs to slow down or pause. Pipeline schedules, all-reduce step-by-step, end-to-end training step.

```mdx
<Figure caption="One DDP step: forward, backward, all-reduce, optimizer." figNum={3}>
  <Canvas2D
    draw={drawDDPStep}
    data={{ t }}
    width={520}
    height={220}
  />

  {#snippet controls()}
    <Scrubber bind:value={t} duration={6} autoLoop={false} />
  {/snippet}
</Figure>
```

Tip: divide `t` into named phases inside the draw function:

```ts
const phase = data.t < 0.25 ? "forward"
            : data.t < 0.50 ? "backward"
            : data.t < 0.85 ? "all-reduce"
            : "optimizer";
drawLabel(ctx, phase.toUpperCase(), 260, 20, { align: "center" });
```

Showing the phase label as the scrubber moves is what makes the figure read.

## Recipe 4: drag overlay for spatial selection

A drag point that selects a focal location. Used for "pick a GPU in the mesh," "drag the eclipse position," "place the observer."

```mdx
<Figure caption="Click any GPU. Highlighted GPUs share its DP, TP, or PP comm group." figNum={12}>
  <div class="overlay">
    <Canvas2D
      draw={drawMesh}
      data={{ x: focusX, y: focusY }}
      width={480}
      height={240}
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
</Figure>
```

The draw function reads `data.x` and `data.y` (both 0..1) and translates to grid coordinates. Highlight the selected cell and any cells in its comm group. Fade the rest.

## Recipe 5: comparison plot

Two or more curves on the same axes. Used for "compute per GPU vs comm overhead as N grows," "memory vs batch size," anything where the punch is the crossing point.

```mdx
<Figure caption="Past about 16 GPUs the all-reduce dominates the compute on this model." figNum={16}>
  <Plot
    width={480}
    height={220}
    series={[
      { points: computeCurve, color: '#2563EB' },
      { points: commCurve,    color: '#B91C1C' },
    ]}
    xRange={[1, 32]}
    yRange={[0, 100]}
    xLabel="GPUs"
    yLabel="time per step (ms)"
    xTicks={[1, 8, 16, 24, 32]}
    yTicks={[0, 25, 50, 75, 100]}
  />
</Figure>
```

If the plot is interactive (slider for batch size, scrubber for step number), build the curves with `$derived`:

```ts
const computeCurve = $derived(
  Array.from({ length: 32 }, (_, i) => ({
    x: i + 1,
    y: baseFlops / (i + 1) / batchSize,
  })),
);
```

## Recipe 6: live calculator

Inputs on the controls strip; a derived readout in big mono text on the canvas. Used for "MFU calculator," "memory budget calculator," "time-to-train estimator."

```mdx
<Figure caption="Sliders set the model and hardware. The number is your achieved MFU." figNum={14}>
  <Canvas2D
    draw={drawMFUReadout}
    data={{ tflops, peak, batch, comm, mfu }}
    width={480}
    height={140}
  />

  {#snippet controls()}
    <Slider label="model TFLOPs" bind:value={tflops} min={5} max={500} />
    <Slider label="peak TFLOPs"  bind:value={peak}   min={300} max={3000} step={100} />
    <Slider label="batch"        bind:value={batch}  min={1}   max={64} />
    <Slider label="comm %"       bind:value={comm}   min={0}   max={50} />
  {/snippet}
</Figure>
```

The math:

```ts
const mfu = $derived(((tflops * batch) / peak / (1 + comm / 100)) * 100);
```

Render `mfu.toFixed(0) + "%"` at 48px JetBrains Mono in the center of the canvas. Add a small bar showing where on the 0–100 scale this lands.

## Anti-patterns

- **A slider that doesn't change anything visible.** Either it should obviously affect the figure, or remove it.
- **Three sliders without labels.** Always label, always show the value.
- **A scrubber with no phase labels.** The reader needs to know what they're seeing.
- **Animation by default.** Honor `prefers-reduced-motion`. The Scrubber and Canvas2D primitives already do this. Don't add `autoplay` unless the figure genuinely benefits from it.
- **More than four controls on one figure.** Split into two figures. Decompose.
