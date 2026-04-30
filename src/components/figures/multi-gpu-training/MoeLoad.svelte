<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawMoeLoad,
    MOE_LOAD_W,
    MOE_LOAD_H,
    type LoadMode,
  } from "@figures/multi-gpu-training/moe-load";

  let mode: LoadMode = $state("aux-loss");
  let step = $state(0);
</script>

<Canvas2D
  draw={drawMoeLoad}
  data={{ step, mode }}
  width={MOE_LOAD_W}
  height={MOE_LOAD_H}
  ariaLabel="Per-expert token load across 16 experts plotted as a bar chart, with a dashed line at the uniform target. Toggle the controls between aux-loss and aux-loss-free routing; scrub through 40 training steps. Aux-loss bars decay toward uniform with visible oscillation; aux-loss-free bars converge faster and tighter. The right panel shows the current load standard deviation, the max and min loads, and a sparkline of std-dev over the full training window with a dot marking the current step."
/>

<div class="controls">
  <Toggle
    label="balancing"
    bind:value={mode}
    options={[
      { value: "aux-loss", label: "aux-loss" },
      { value: "aux-free", label: "aux-loss-free" },
    ]}
  />
  <Scrubber bind:value={step} duration={6} />
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
