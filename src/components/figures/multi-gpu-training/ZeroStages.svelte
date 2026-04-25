<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import {
    drawZeroStages,
    ZERO_STAGES_W,
    ZERO_STAGES_H,
    type ZeroStage,
  } from "@figures/multi-gpu-training/zero-stages";

  let n = $state(8);
  let stage: ZeroStage = $state("3");
</script>

<Canvas2D
  draw={drawZeroStages}
  data={{ n, stage }}
  width={ZERO_STAGES_W}
  height={ZERO_STAGES_H}
  ariaLabel="Three side-by-side stacked bars for ZeRO stages 1, 2, and 3, scaled in bytes per parameter against the DDP baseline of 16Ψ. Stage 1 partitions optimizer state only; Stage 2 also partitions gradients; Stage 3 partitions all three. The active stage is outlined; the slider drives N from 4 to 32."
/>

<div class="controls">
  <Slider
    label="ranks"
    bind:value={n}
    min={4}
    max={32}
    step={1}
    format={(v) => `${v}×`}
  />
  <Toggle
    label="highlight"
    bind:value={stage}
    options={[
      { value: "1", label: "Stage 1" },
      { value: "2", label: "Stage 2" },
      { value: "3", label: "Stage 3" },
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
