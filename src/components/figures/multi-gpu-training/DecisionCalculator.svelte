<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import {
    drawDecisionCalculator,
    DECISION_W,
    DECISION_H,
    MODEL_OPTIONS,
    TOTAL_OPTIONS,
    type Arch,
    type Hardware,
  } from "@figures/multi-gpu-training/decision-calculator";

  let modelIdx = $state(3);
  let totalIdx = $state(3);
  let arch: Arch = $state("dense");
  let hardware: Hardware = $state("h100");
</script>

<Canvas2D
  draw={drawDecisionCalculator}
  data={{ modelIdx, totalIdx, arch, hardware }}
  width={DECISION_W}
  height={DECISION_H}
  ariaLabel="Decision calculator. Picks a parallelism mesh from model size, GPU count, dense or MoE architecture, and hardware bandwidth class. The recommended mesh is shown as TP × CP × PP × EP × DP with each axis colored if it is greater than one. The per-GPU memory budget is drawn as a horizontal bar with a dashed cap at 80 GB; bar fills green when it fits and red when it does not. A 'matches' line names the closest production-class config (Llama 3, DeepSeek-V3, etc.) and short notes explain the reasoning."
/>

<div class="controls">
  <Slider
    label="model"
    bind:value={modelIdx}
    min={0}
    max={MODEL_OPTIONS.length - 1}
    step={1}
    format={(v) => MODEL_OPTIONS[v]?.label ?? ""}
  />
  <Slider
    label="GPUs"
    bind:value={totalIdx}
    min={0}
    max={TOTAL_OPTIONS.length - 1}
    step={1}
    format={(v) => `${TOTAL_OPTIONS[v]}`}
  />
  <Toggle
    label="arch"
    bind:value={arch}
    options={[
      { value: "dense", label: "dense" },
      { value: "moe", label: "MoE" },
    ]}
  />
  <Toggle
    label="hw"
    bind:value={hardware}
    options={[
      { value: "h100", label: "H100" },
      { value: "h800", label: "H800" },
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
