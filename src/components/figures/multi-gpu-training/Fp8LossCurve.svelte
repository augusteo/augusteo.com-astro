<script lang="ts">
  import Canvas2D from "../../figure/Canvas2D.svelte";
  import { drawFp8LossCurve } from "../../../figures/multi-gpu-training/fp8-loss-curve";
</script>

<Canvas2D
  draw={drawFp8LossCurve}
  data={{}}
  width={540}
  height={260}
  ariaLabel="Two-panel chart. Top: training loss vs tokens (log scale), with BF16 and FP8 curves overlapping. Bottom: relative error in percent, staying under a dashed 0.25% bound across the run."
/>
