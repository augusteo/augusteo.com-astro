<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawDdpStep,
    DDP_STEP_W,
    DDP_STEP_H,
  } from "@figures/multi-gpu-training/ddp-step";

  let n = $state(4);
  let t = $state(0.15);
</script>

<Canvas2D
  draw={drawDdpStep}
  data={{ n, t }}
  width={DDP_STEP_W}
  height={DDP_STEP_H}
  ariaLabel="Per-rank Gantt chart for one DDP step. Each rank has bars for forward, backward, all-reduce, and optimizer phases. Slider sets rank count; scrubber moves a vertical cursor through the step. The all-reduce bar grows with rank count."
/>

<div class="controls">
  <Slider
    label="ranks"
    bind:value={n}
    min={2}
    max={16}
    step={1}
    format={(v) => `${v}×`}
  />
  <Scrubber bind:value={t} duration={6} autoLoop={false} />
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
