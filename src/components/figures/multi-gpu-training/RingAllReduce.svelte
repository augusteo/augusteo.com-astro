<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawRingAllReduce,
    RING_AR_W,
    RING_AR_H,
  } from "@figures/multi-gpu-training/ring-all-reduce";

  let n = $state(4);
  let t = $state(0);
</script>

<Canvas2D
  draw={drawRingAllReduce}
  data={{ n, t }}
  width={RING_AR_W}
  height={RING_AR_H}
  ariaLabel="A ring of N rectangles, one per rank, each subdivided into N cells (one per chunk). Cell fill grows with the number of contributions accumulated. Scrubbing through reduce-scatter then all-gather walks the algorithm; one chunk per rank lights up green when fully summed."
/>

<div class="controls">
  <Slider
    label="ranks"
    bind:value={n}
    min={4}
    max={8}
    step={1}
    format={(v) => `${v}×`}
  />
  <Scrubber bind:value={t} duration={8} autoLoop={false} />
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
