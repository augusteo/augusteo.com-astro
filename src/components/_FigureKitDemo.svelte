<script lang="ts">
  import Figure from "./figure/Figure.svelte";
  import Slider from "./figure/Slider.svelte";
  import Toggle from "./figure/Toggle.svelte";
  import Scrubber from "./figure/Scrubber.svelte";
  import DragArea from "./figure/DragArea.svelte";
  import Canvas2D from "./figure/Canvas2D.svelte";
  import Plot from "./figure/Plot.svelte";
  import { palette, drawArrow, drawLabel, font } from "../figures/shared";

  // Demo 1: sine wave slider
  let amplitude = $state(40);
  let frequency = $state(2);

  function drawSine(
    ctx: CanvasRenderingContext2D,
    s: { amp: number; freq: number },
  ) {
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < 480; x++) {
      const y = 90 + s.amp * Math.sin((x / 480) * s.freq * Math.PI * 2);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawLabel(ctx, "OUTPUT", 10, 20, { color: palette.text });
  }

  // Demo 2: toggle color
  type ColorChoice = "primary" | "secondary" | "tertiary";
  let colorChoice = $state<ColorChoice>("primary");

  function drawCircle(
    ctx: CanvasRenderingContext2D,
    s: { color: ColorChoice },
  ) {
    const c = palette[s.color];
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(150, 90, 50, 0, Math.PI * 2);
    ctx.fill();
    drawLabel(ctx, s.color.toUpperCase(), 150, 90, {
      color: palette.paper,
      align: "center",
    });
  }

  // Demo 3: scrubber dot
  let scrub = $state(0);

  function drawScrub(ctx: CanvasRenderingContext2D, s: { t: number }) {
    // line
    ctx.strokeStyle = palette.strokeMid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 90);
    ctx.lineTo(440, 90);
    ctx.stroke();
    // ticks
    for (let i = 0; i <= 10; i++) {
      const x = 40 + i * 40;
      ctx.beginPath();
      ctx.moveTo(x, 86);
      ctx.lineTo(x, 94);
      ctx.stroke();
    }
    // dot
    const x = 40 + s.t * 400;
    ctx.fillStyle = palette.secondary;
    ctx.beginPath();
    ctx.arc(x, 90, 8, 0, Math.PI * 2);
    ctx.fill();
    // arrow trace
    if (s.t > 0.02) {
      drawArrow(ctx, 40, 90, x - 10, 90, {
        color: palette.secondary,
        width: 2,
      });
    }
    drawLabel(ctx, `t = ${s.t.toFixed(2)}`, 240, 30, {
      color: palette.text,
      align: "center",
    });
  }

  // Demo 4: drag area (over canvas)
  let dragX = $state(0.5);
  let dragY = $state(0.5);

  function drawDrag(
    ctx: CanvasRenderingContext2D,
    s: { x: number; y: number },
  ) {
    // grid
    ctx.strokeStyle = palette.strokeMid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const xi = (i / 10) * 480;
      const yi = (i / 10) * 180;
      ctx.beginPath();
      ctx.moveTo(xi, 0);
      ctx.lineTo(xi, 180);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, yi);
      ctx.lineTo(480, yi);
      ctx.stroke();
    }
    // crosshair lines
    const cx = s.x * 480;
    const cy = s.y * 180;
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, 180);
    ctx.moveTo(0, cy);
    ctx.lineTo(480, cy);
    ctx.stroke();
    ctx.setLineDash([]);
    // dot
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    // readout
    ctx.fillStyle = palette.text;
    ctx.font = `11px ${font.mono}`;
    ctx.textAlign = "left";
    ctx.fillText(
      `x: ${s.x.toFixed(2)}  y: ${s.y.toFixed(2)}`,
      10,
      18,
    );
  }

  // Demo 5: plot — fake compute vs comm scaling
  let n = $state(8);
  const series = $derived([
    {
      points: Array.from({ length: 32 }, (_, i) => ({
        x: i + 1,
        y: 100 / (i + 1),
      })),
      color: palette.primary,
      label: "compute / GPU",
    },
    {
      points: Array.from({ length: 32 }, (_, i) => ({
        x: i + 1,
        y: 4 * Math.log2(i + 2),
      })),
      color: palette.secondary,
      label: "comm overhead",
    },
  ]);
</script>

<div class="kit-demo">
  <h2>Figure kit primitives — demo page</h2>
  <p>If every figure below renders and reacts to its controls, the kit works.</p>

  <Figure caption="Slider drives sine amplitude and frequency." figNum="1">
    <Canvas2D
      draw={drawSine}
      data={{ amp: amplitude, freq: frequency }}
      width={480}
      height={180}
      ariaLabel="sine wave"
    />
    {#snippet controls()}
      <Slider label="amp" bind:value={amplitude} min={0} max={80} />
      <Slider
        label="freq"
        bind:value={frequency}
        min={1}
        max={8}
        step={0.5}
      />
    {/snippet}
  </Figure>

  <Figure caption="Toggle picks the fill color." figNum="2">
    <Canvas2D
      draw={drawCircle}
      data={{ color: colorChoice }}
      width={300}
      height={180}
      ariaLabel="filled circle"
    />
    {#snippet controls()}
      <Toggle
        label="color"
        bind:value={colorChoice}
        options={[
          { value: "primary", label: "blue" },
          { value: "secondary", label: "red" },
          { value: "tertiary", label: "green" },
        ]}
      />
    {/snippet}
  </Figure>

  <Figure
    caption="Scrubber moves a dot along a track. Pause/play with the round button."
    figNum="3"
  >
    <Canvas2D
      draw={drawScrub}
      data={{ t: scrub }}
      width={480}
      height={140}
      ariaLabel="scrubber demo"
    />
    {#snippet controls()}
      <Scrubber bind:value={scrub} duration={3} />
    {/snippet}
  </Figure>

  <Figure
    caption="Drag area sits over a canvas. The dot follows the pointer."
    figNum="4"
  >
    <div class="overlay">
      <Canvas2D
        draw={drawDrag}
        data={{ x: dragX, y: dragY }}
        width={480}
        height={180}
        ariaLabel="drag target"
      />
      <div class="overlay-drag">
        <DragArea
          width={480}
          height={180}
          bind:x={dragX}
          bind:y={dragY}
          label="drag the crosshair"
        />
      </div>
    </div>
  </Figure>

  <Figure
    caption="Plot shows two series. Slider doesn't change them here; it's a kit smoke-test."
    figNum="5"
  >
    <Plot
      width={480}
      height={220}
      {series}
      xLabel="GPUs"
      yLabel="time"
      xTicks={[1, 8, 16, 24, 32]}
      yTicks={[0, 25, 50, 75, 100]}
    />
    {#snippet controls()}
      <Slider label="ignored" bind:value={n} min={1} max={32} />
    {/snippet}
  </Figure>
</div>

<style>
  .kit-demo {
    max-width: 720px;
    margin: 2rem auto;
    padding: 0 1rem;
    color: #2a2620;
    font-family:
      "Source Serif 4", "Source Serif Pro", Iowan Old Style, Georgia, serif;
  }
  h2 {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: #4a4239;
    text-transform: uppercase;
  }
  .overlay {
    position: relative;
  }
  .overlay-drag {
    position: absolute;
    inset: 0;
  }
</style>
