<script lang="ts" generics="S">
  import { onMount, onDestroy, untrack } from "svelte";
  import { clear, palette, prefersReducedMotion } from "../../figures/shared";

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
  let resizeObserver: ResizeObserver | undefined;
  let displayW = $state(0);
  let displayH = $state(0);

  function resizeBuffer() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const newBufW = Math.floor(rect.width * dpr);
    const newBufH = Math.floor(rect.height * dpr);
    // Skip if buffer is already correctly sized — re-assigning canvas.width
    // would clear pixels and we'd lose the current frame.
    if (canvas.width === newBufW && canvas.height === newBufH && ctx) return;
    displayW = rect.width;
    displayH = rect.height;
    canvas.width = newBufW;
    canvas.height = newBufH;
    const c = canvas.getContext("2d")!;
    // Map logical coords (0..width, 0..height) onto the full device-pixel buffer.
    c.setTransform(newBufW / width, 0, 0, newBufH / height, 0, 0);
    ctx = c;
  }

  onMount(() => {
    resizeBuffer();
    mounted = true;
    resizeObserver = new ResizeObserver(() => resizeBuffer());
    resizeObserver.observe(canvas);
  });

  onDestroy(() => {
    if (rafId !== undefined) cancelAnimationFrame(rafId);
    resizeObserver?.disconnect();
  });

  $effect(() => {
    if (!mounted || !ctx) return;
    // touch deps to subscribe
    void data;
    void width;
    void height;
    void displayW;
    void displayH;

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

<canvas
  bind:this={canvas}
  style="aspect-ratio: {width} / {height};"
  aria-label={ariaLabel}
></canvas>

<style>
  canvas {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
</style>
