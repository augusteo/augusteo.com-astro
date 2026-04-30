<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawFsdp,
    FSDP_W,
    FSDP_H,
  } from "@figures/multi-gpu-training/fsdp";

  let layers = $state(4);
  let t = $state(0);
  let mode: "prefetch" | "serial" = $state("prefetch");
  const prefetch = $derived(mode === "prefetch");
</script>

<Canvas2D
  draw={drawFsdp}
  data={{ layers, t, prefetch }}
  width={FSDP_W}
  height={FSDP_H}
  ariaLabel="FSDP forward-pass timeline. Top dashed row shows the naive serial baseline, alternating all-gather and forward of each layer. Bottom two rows split the work onto a comm stream and a compute stream: with prefetch, all-gather of layer K+1 fires while forward of layer K runs, so comm stays off the critical path. Toggle the prefetch off to see the schedule collapse back to serial."
/>

<div class="controls">
  <Slider
    label="layers"
    bind:value={layers}
    min={3}
    max={8}
    step={1}
    format={(v) => `${v}`}
  />
  <Toggle
    label="schedule"
    bind:value={mode}
    options={[
      { value: "prefetch", label: "prefetch" },
      { value: "serial", label: "serial" },
    ]}
  />
  <Scrubber bind:value={t} duration={6} />
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
