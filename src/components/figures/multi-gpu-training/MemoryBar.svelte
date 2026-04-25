<script lang="ts">
  import Canvas2D from "../../figure/Canvas2D.svelte";
  import Slider from "../../figure/Slider.svelte";
  import Toggle from "../../figure/Toggle.svelte";
  import {
    drawMemoryBar,
    MEMORY_BAR_W,
    MEMORY_BAR_H,
    type MemHw,
  } from "../../../figures/multi-gpu-training/memory-bar";

  let paramsB = $state(70);
  let n = $state(8);
  let hw: MemHw = $state("H100");
</script>

<Canvas2D
  draw={drawMemoryBar}
  data={{ paramsB, n, hw }}
  width={MEMORY_BAR_W}
  height={MEMORY_BAR_H}
  ariaLabel="Stacked memory bar showing weights, gradients, and optimizer state per DDP rank, against the selected GPU's HBM capacity. Per-rank, hardware capacity, overshoot ratio, and total cluster memory readouts on the right."
/>

<div class="controls">
  <Slider
    label="model"
    bind:value={paramsB}
    min={1}
    max={405}
    step={1}
    format={(v) => `${v}B`}
  />
  <Slider
    label="ranks"
    bind:value={n}
    min={1}
    max={32}
    step={1}
    format={(v) => `${v}×`}
  />
  <Toggle
    label="GPU"
    bind:value={hw}
    options={[
      { value: "H100", label: "H100" },
      { value: "H200", label: "H200" },
      { value: "B200", label: "B200" },
    ]}
  />
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
