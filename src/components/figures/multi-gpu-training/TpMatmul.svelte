<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import {
    drawTpMatmul,
    TP_MATMUL_W,
    TP_MATMUL_H,
    type TpMode,
  } from "@figures/multi-gpu-training/tp-matmul";

  let mode: TpMode = $state("columnrow");
</script>

<Canvas2D
  draw={drawTpMatmul}
  data={{ mode }}
  width={TP_MATMUL_W}
  height={TP_MATMUL_H}
  ariaLabel="Two-rank tensor-parallel matmul. Input X is full and replicated. The first weight A is column-sharded so each rank computes a partial Y. In column-only mode, the partial Y halves are incoherent for the next layer. In column+row mode, the second weight B is row-sharded so each rank computes a partial Z, and an all-reduce sums them, giving every rank the full Z."
/>

<div class="controls">
  <Toggle
    label="mode"
    bind:value={mode}
    options={[
      { value: "column", label: "column-only" },
      { value: "columnrow", label: "column + row" },
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
