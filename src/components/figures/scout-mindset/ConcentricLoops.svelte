<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawConcentricLoops,
    CONCENTRIC_LOOPS_W,
    CONCENTRIC_LOOPS_H,
  } from "@figures/scout-mindset/concentric-loops";

  let t = $state(0);
</script>

<Canvas2D
  draw={drawConcentricLoops}
  data={{ t }}
  width={CONCENTRIC_LOOPS_W}
  height={CONCENTRIC_LOOPS_H}
  ariaLabel="Three concentric loops showing the same record-disconfirming-evidence move at three scales. Inner ring (blue): Darwin's notebook in 1876. Middle ring (orange): the 2026 takeoff log. Outer ring (grey): the published literature record. Each ring shows four steps: notice, judge threat, write same day, review later. A scrubber animates a highlighted observation moving from the inner ring outward as time advances."
/>

<div class="controls">
  <Scrubber label="observation" bind:value={t} duration={6} autoLoop={true} />
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
