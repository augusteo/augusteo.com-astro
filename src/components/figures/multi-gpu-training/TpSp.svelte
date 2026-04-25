<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import {
    drawTpSp,
    TP_SP_W,
    TP_SP_H,
  } from "@figures/multi-gpu-training/tp-sp";

  let seqK = $state(8);
</script>

<Canvas2D
  draw={drawTpSp}
  data={{ seqK }}
  width={TP_SP_W}
  height={TP_SP_H}
  ariaLabel="Per-rank, per-layer activation memory under TP-only and TP+SP, stacked into matmul activations, element-wise activations, and the attention-score subblock. Slider drives sequence length from 1k to 32k tokens. At short context, the element-wise band is the fattest and TP+SP shrinks it to 1/t. At long context, attention scores grow as O(s²) and dominate, leaving SP with little to do."
/>

<div class="controls">
  <Slider
    label="sequence"
    bind:value={seqK}
    min={1}
    max={32}
    step={1}
    format={(v) => `${v}k`}
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
