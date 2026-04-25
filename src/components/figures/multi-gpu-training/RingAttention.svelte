<script lang="ts">
  import Canvas2D from "@components/figure/Canvas2D.svelte";
  import Slider from "@components/figure/Slider.svelte";
  import Scrubber from "@components/figure/Scrubber.svelte";
  import {
    drawRingAttention,
    RING_ATTN_W,
    RING_ATTN_H,
  } from "@figures/multi-gpu-training/ring-attention";

  const seqValues = [
    32 * 1024,
    64 * 1024,
    128 * 1024,
    256 * 1024,
    512 * 1024,
    1024 * 1024,
  ];
  const seqLabels = ["32k", "64k", "128k", "256k", "512k", "1M"];

  let sIdx = $state(3);
  let step = $state(0);

  const s = $derived(seqValues[sIdx]);
</script>

<Canvas2D
  draw={drawRingAttention}
  data={{ s, step }}
  width={RING_ATTN_W}
  height={RING_ATTN_H}
  ariaLabel="Ring attention with eight GPUs arranged in a circle. Each GPU box shows two stacked rectangles: a fixed Q block on top and a rotating KV block on the bottom. The active rotation arrow between adjacent GPUs is highlighted at each step. The center reads the current step out of eight. The right panel shows the chosen sequence length, per-rank token count, local KV cache size in bytes, a progress bar of KV blocks seen so far, and a status line that flips to 'every Q has seen every K,V' once all eight rotations complete."
/>

<div class="controls">
  <Slider
    label="sequence"
    bind:value={sIdx}
    min={0}
    max={5}
    step={1}
    format={(v) => seqLabels[v]}
  />
  <Scrubber bind:value={step} duration={6} autoLoop={false} />
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
