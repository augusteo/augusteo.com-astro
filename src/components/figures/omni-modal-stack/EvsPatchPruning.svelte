<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import {
    drawEvsPatchPruning,
    EVS_PATCH_PRUNING_W,
    EVS_PATCH_PRUNING_H,
  } from "@figures/omni-modal-stack/evs-patch-pruning";

  let q = $state(0.5);
</script>

<Canvas2D
  draw={drawEvsPatchPruning}
  data={{ q }}
  width={EVS_PATCH_PRUNING_W}
  height={EVS_PATCH_PRUNING_H}
  ariaLabel="Two side-by-side 16-by-16 patch grids representing consecutive video frames. The left frame is always kept whole. In the right frame, patches whose change relative to the previous frame falls below the q-th percentile are greyed out. A live counter below reports the kept patch count and the prefill-token reduction."
/>

<div class="controls">
  <Slider
    label="q"
    bind:value={q}
    min={0}
    max={0.95}
    step={0.05}
    format={(v) => v.toFixed(2)}
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
