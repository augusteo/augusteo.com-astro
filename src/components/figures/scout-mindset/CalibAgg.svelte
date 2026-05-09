<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import {
    drawCalibAgg,
    CALIB_AGG_W,
    CALIB_AGG_H,
  } from "@figures/scout-mindset/calib-agg";

  let bias = $state(0);
  let variance = $state(0.15);
  let correlation = $state(0.3);
</script>

<Canvas2D
  draw={drawCalibAgg}
  data={{ bias, variance, correlation }}
  width={CALIB_AGG_W}
  height={CALIB_AGG_H}
  ariaLabel="Two-panel interactive diagram. Left: calibration grid showing takeoff-forecast dots against the perfect-calibration diagonal. Overconfident dots appear in orange, underconfident in green. Right: aggregation funnel showing ten estimators' forecasts as a density band centered on the truth value. Adjust bias to shift the band off the truth value; adjust variance to widen or narrow the per-estimator distribution; adjust correlation to control how much aggregation actually buys you. At zero correlation, ten independent forecasts shrink the band by roughly the square root of ten. At correlation 1, the band stays at the per-estimator width."
/>

<div class="controls">
  <Slider
    label="bias"
    bind:value={bias}
    min={-0.2}
    max={0.2}
    step={0.05}
    format={(v) => (v >= 0 ? `+${v.toFixed(2)}` : v.toFixed(2))}
  />
  <Slider
    label="variance"
    bind:value={variance}
    min={0.05}
    max={0.3}
    step={0.025}
    format={(v) => v.toFixed(3)}
  />
  <Slider
    label="correlation"
    bind:value={correlation}
    min={0}
    max={1}
    step={0.1}
    format={(v) => v.toFixed(1)}
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
