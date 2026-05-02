<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import {
    drawVideoTokenExplosion,
    VIDEO_TOKEN_EXPLOSION_W,
    VIDEO_TOKEN_EXPLOSION_H,
  } from "@figures/omni-modal-stack/video-token-explosion";

  let duration = $state(10);
  let fps = $state(12);
  let patches = $state(512);
</script>

<Canvas2D
  draw={drawVideoTokenExplosion}
  data={{ duration, fps, patches }}
  width={VIDEO_TOKEN_EXPLOSION_W}
  height={VIDEO_TOKEN_EXPLOSION_H}
  ariaLabel="Three stacked horizontal bars compare vision-token counts under three video-encoding strategies (naive per-frame ViT, Conv3D tubelet, Conv3D plus EVS pruning) against a 262K-context reference. Sliders below set clip duration, frame rate, and patches per frame."
/>

<div class="controls">
  <Slider
    label="duration"
    bind:value={duration}
    min={1}
    max={120}
    step={1}
    format={(v) => `${v}s`}
  />
  <Slider
    label="FPS"
    bind:value={fps}
    min={1}
    max={30}
    step={1}
  />
  <Slider
    label="patches/frame"
    bind:value={patches}
    min={256}
    max={1024}
    step={256}
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
