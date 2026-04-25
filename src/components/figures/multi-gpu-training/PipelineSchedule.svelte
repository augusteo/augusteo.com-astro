<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import {
    drawPipelineSchedule,
    PIPE_W,
    PIPE_H,
    type PpSchedule,
  } from "@figures/multi-gpu-training/pipeline-schedule";

  let k = $state(8);
  let m = $state(8);
  let schedule: PpSchedule = $state("1f1b");
</script>

<Canvas2D
  draw={drawPipelineSchedule}
  data={{ k, m, schedule }}
  width={PIPE_W}
  height={PIPE_H}
  ariaLabel="Pipeline-parallel Gantt grid: K stages on the y-axis, time on the x-axis. Forward and backward cells are colored by phase; empty cells are bubble. Toggle between GPipe (full forward then full backward, large warm-up and drain triangles), 1F1B (forwards and backwards interleaved with bounded activation memory), and Interleaved 1F1B (warm-up triangle shorter by v=2 because each stage owns v chunks of layers). Sliders drive K and the micro-batch count M."
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
    min={2}
    max={32}
    step={1}
    format={(v) => `M=${v}`}
  />
  <Toggle
    label="schedule"
    bind:value={schedule}
    options={[
      { value: "gpipe", label: "GPipe" },
      { value: "1f1b", label: "1F1B" },
      { value: "interleaved", label: "Interleaved" },
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
