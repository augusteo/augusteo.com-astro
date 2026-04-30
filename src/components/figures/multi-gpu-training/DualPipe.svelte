<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawDualPipe,
    DUALPIPE_W,
    DUALPIPE_H,
  } from "@figures/multi-gpu-training/dualpipe";

  let k = $state(8);
  let m = $state(12);
  let t = $state(1);
</script>

<Canvas2D
  draw={drawDualPipe}
  data={{ k, m, t }}
  width={DUALPIPE_W}
  height={DUALPIPE_H}
  ariaLabel="Two stacked pipeline-parallel Gantt grids: 1F1B reference on top, DualPipe on the bottom. DualPipe's warm-up triangle is half as wide because two streams of micro-batches feed the pipeline from both ends. Cells are colored by stream: blue and green for the left-going stream, lighter shades for the right-going stream. Scrubber walks a vertical cursor through one step on both charts."
/>

<div class="controls">
  <Slider
    label="stages"
    bind:value={k}
    min={4}
    max={16}
    step={1}
    format={(v) => `K=${v}`}
  />
  <Slider
    label="micro-batches"
    bind:value={m}
    min={4}
    max={32}
    step={2}
    format={(v) => `M=${v}`}
  />
  <Scrubber bind:value={t} duration={8} />
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
