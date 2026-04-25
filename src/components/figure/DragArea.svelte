<script lang="ts">
  interface Props {
    width: number;
    height: number;
    x: number;
    y: number;
    label?: string;
    showCrosshair?: boolean;
    onchange?: (x: number, y: number) => void;
  }

  let {
    width,
    height,
    x = $bindable(),
    y = $bindable(),
    label,
    showCrosshair = false,
    onchange,
  }: Props = $props();

  let area: HTMLDivElement;
  let dragging = $state(false);

  function update(e: PointerEvent) {
    const rect = area.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    x = Math.max(0, Math.min(1, nx));
    y = Math.max(0, Math.min(1, ny));
    onchange?.(x, y);
  }

  function start(e: PointerEvent) {
    dragging = true;
    area.setPointerCapture(e.pointerId);
    update(e);
  }

  function move(e: PointerEvent) {
    if (dragging) update(e);
  }

  function end(e: PointerEvent) {
    dragging = false;
    if (area.hasPointerCapture(e.pointerId)) area.releasePointerCapture(e.pointerId);
  }
</script>

<div
  bind:this={area}
  class="drag"
  class:dragging
  style:width="{width}px"
  style:height="{height}px"
  role="application"
  aria-label={label ?? "draggable area"}
  onpointerdown={start}
  onpointermove={move}
  onpointerup={end}
  onpointercancel={end}
>
  {#if showCrosshair}
    <div class="dot" style:left="{x * 100}%" style:top="{y * 100}%"></div>
  {/if}
</div>

<style>
  .drag {
    position: relative;
    cursor: grab;
    background: transparent;
    user-select: none;
    touch-action: none;
  }
  .drag.dragging {
    cursor: grabbing;
  }
  .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;
    border-radius: 50%;
    background: #2563eb;
    border: 2px solid #f4eee3;
    pointer-events: none;
  }
</style>
