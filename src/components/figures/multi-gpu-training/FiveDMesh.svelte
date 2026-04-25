<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import DragArea from "@components/figure/DragArea.svelte";
  import {
    drawFiveDMesh,
    MESH_W,
    MESH_H,
    type MeshMode,
  } from "@figures/multi-gpu-training/five-d-mesh";

  let mode: MeshMode = $state("5d");
  let dragX = $state(0.18);
  let dragY = $state(0.5);
</script>

<div class="overlay">
  <Canvas2D
    draw={drawFiveDMesh}
    data={{ mode, dragX, dragY }}
    width={MESH_W}
    height={MESH_H}
    ariaLabel="A 64-GPU mesh laid out as an 8 by 8 grid of cells. Each cell is one GPU and is sliced into horizontal stripes, one per parallelism axis (TP, CP, PP, DP, plus EP in the 5D mode). The stripe lights up in that axis's color when the cell shares that axis's group with the dragged selection. Drag a cell; the selection's outline thickens, and 8 to 12 other cells light a single colored stripe each, naming which comm group they share with the selection. The right panel labels the selected GPU's coordinates and lists the comm groups with their sizes."
  />
  <div class="overlay-drag">
    <DragArea
      width={MESH_W}
      height={MESH_H}
      bind:x={dragX}
      bind:y={dragY}
      label="drag to pick a GPU"
    />
  </div>
</div>

<div class="controls">
  <Toggle
    label="mode"
    bind:value={mode}
    options={[
      { value: "5d", label: "5D (with EP)" },
      { value: "4d", label: "4D (Llama 3)" },
    ]}
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
