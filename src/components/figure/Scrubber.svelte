<script lang="ts">
  import { onDestroy } from "svelte";
  import { prefersReducedMotion } from "../../figures/shared";

  interface Props {
    label?: string;
    value: number;
    duration?: number;
    autoLoop?: boolean;
  }

  let {
    label,
    value = $bindable(0),
    duration = 4,
    autoLoop = false,
  }: Props = $props();

  let playing = $state(false);
  let rafId: number | undefined;

  function play() {
    if (prefersReducedMotion()) return;
    playing = true;
    const startedAt = performance.now() - value * duration * 1000;
    const tick = (t: number) => {
      if (!playing) return;
      const fraction = (t - startedAt) / (duration * 1000);
      if (fraction >= 1) {
        if (autoLoop) {
          value = 0;
          rafId = requestAnimationFrame((nt) => {
            // restart at t=0 of new loop
            const newStart = nt;
            const inner = (t2: number) => {
              if (!playing) return;
              const f = (t2 - newStart) / (duration * 1000);
              if (f >= 1) {
                value = 1;
                if (autoLoop) {
                  value = 0;
                  rafId = requestAnimationFrame(inner);
                } else {
                  playing = false;
                }
                return;
              }
              value = f;
              rafId = requestAnimationFrame(inner);
            };
            rafId = requestAnimationFrame(inner);
          });
        } else {
          value = 1;
          playing = false;
        }
        return;
      }
      value = fraction;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
  }

  function pause() {
    playing = false;
    if (rafId !== undefined) cancelAnimationFrame(rafId);
  }

  function toggle() {
    playing ? pause() : play();
  }

  onDestroy(() => {
    if (rafId !== undefined) cancelAnimationFrame(rafId);
  });
</script>

<div class="scrubber">
  {#if label}<span class="label-text">{label}</span>{/if}
  <button
    type="button"
    class="play"
    aria-label={playing ? "pause" : "play"}
    onclick={toggle}
  >
    {playing ? "⏸" : "▶"}
  </button>
  <input
    type="range"
    bind:value
    min="0"
    max="1"
    step="0.001"
    aria-label="seek"
    oninput={pause}
  />
</div>

<style>
  .scrubber {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #6b6258;
  }
  .label-text {
    letter-spacing: 0.04em;
  }
  .play {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #6b6258;
    color: #f4eee3;
    border: none;
    cursor: pointer;
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .play:hover {
    background: #4a4239;
  }
  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    width: 200px;
    height: 4px;
    background: #d6cdb6;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6b6258;
    border: 2px solid #f4eee3;
    cursor: grab;
  }
  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6b6258;
    border: 2px solid #f4eee3;
    cursor: grab;
  }
</style>
