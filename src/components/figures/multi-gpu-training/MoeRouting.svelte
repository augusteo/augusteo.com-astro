<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import DragArea from "@components/figure/DragArea.svelte";
  import {
    drawMoeRouting,
    MOE_ROUTING_W,
    MOE_ROUTING_H,
  } from "@figures/multi-gpu-training/moe-routing";

  let e = $state(8);
  let cfPct = $state(125);
  let dragX = $state(0.55);
  let dragY = $state(0.05);

  const cf = $derived(cfPct / 100);
</script>

<div class="overlay">
  <Canvas2D
    draw={drawMoeRouting}
    data={{ e, cf, dragX, dragY }}
    width={MOE_ROUTING_W}
    height={MOE_ROUTING_H}
    ariaLabel="MoE routing across four GPU ranks. Drag x picks the expert for the focused token; drag y picks the home rank where the token lives. When home and target ranks differ, two arcs are drawn: a blue dispatch arc over the top of the rank row, and a green return arc under the bottom. The right panel shows the selected expert, its rank, the per-expert capacity in tokens, hot experts, and capacity overflow for this generic capped-routing demonstration."
  />
  <div class="overlay-drag">
    <DragArea
      width={MOE_ROUTING_W}
      height={MOE_ROUTING_H}
      bind:x={dragX}
      bind:y={dragY}
      label="drag to pick an expert and a home rank"
    />
  </div>
</div>

<div class="controls">
  <Slider
    label="experts"
    bind:value={e}
    min={4}
    max={32}
    step={4}
    format={(v) => `E=${v}`}
  />
  <Slider
    label="capacity"
    bind:value={cfPct}
    min={50}
    max={200}
    step={5}
    format={(v) => `${(v / 100).toFixed(2)}x`}
  />
</div>

<style>
  .overlay {
    position: relative;
  }
  .overlay-drag {
    position: absolute;
    inset: 0;
  }
  .controls {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
  }
</style>
