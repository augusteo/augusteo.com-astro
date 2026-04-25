<script lang="ts" generics="S">
  import { onMount, onDestroy, untrack } from "svelte";
  import { setupHiDPI, clear, palette, prefersReducedMotion } from "../../figures/shared";

  interface Props<S> {
    draw: (ctx: CanvasRenderingContext2D, data: S, time: number) => void;
    data: S;
    width: number;
    height: number;
    autoplay?: boolean;
    background?: string;
    ariaLabel?: string;
  }

  let {
    draw,
    data,
    width,
    height,
    autoplay = false,
    background = palette.paper,
    ariaLabel,
  }: Props<S> = $props();

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | undefined = $state(undefined);
  let mounted = $state(false);
  let rafId: number | undefined;

  onMount(() => {
    ({ ctx } = setupHiDPI(canvas, width, height));
    mounted = true;
  });

  onDestroy(() => {
    if (rafId !== undefined) cancelAnimationFrame(rafId);
  });

  $effect(() => {
    if (!mounted || !ctx) return;
    // touch deps to subscribe
    void data;
    void width;
    void height;

    const c = ctx;
    const shouldAnimate = autoplay && !prefersReducedMotion();
    const start = performance.now();

    if (rafId !== undefined) cancelAnimationFrame(rafId);

    const renderOnce = (t: number) => {
      clear(c, width, height, background);
      untrack(() => draw(c, data, t));
    };

    if (shouldAnimate) {
      const loop = (now: number) => {
        renderOnce((now - start) / 1000);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    } else {
      renderOnce(0);
    }

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  });
</script>

<canvas bind:this={canvas} aria-label={ariaLabel}></canvas>

<style>
  canvas {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
