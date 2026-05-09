<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Toggle from "@components/figure/Toggle.svelte";
  import {
    drawScoutSoldier,
    SCOUT_SOLDIER_W,
    SCOUT_SOLDIER_H,
    type EvidenceStream,
  } from "@figures/scout-mindset/scout-soldier";

  let stream: EvidenceStream = $state("dispreferred");
</script>

<Canvas2D
  draw={drawScoutSoldier}
  data={{ stream }}
  width={SCOUT_SOLDIER_W}
  height={SCOUT_SOLDIER_H}
  ariaLabel="Split-panel diagram showing soldier mode (top) and scout mode (bottom) processing the same evidence stream about a 40% AI takeoff productivity claim. Soldier mode routes events through defend, explain away, and raise-burden-of-proof gates, keeping credence nearly flat. Scout mode routes through record, separate signal/noise, and update gates, letting credence move with the evidence. Toggle switches the stream between preferred and dispreferred evidence."
/>

<div class="controls">
  <Toggle
    label="evidence stream"
    bind:value={stream}
    options={[
      { value: "preferred", label: "preferred" },
      { value: "dispreferred", label: "dispreferred" },
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
