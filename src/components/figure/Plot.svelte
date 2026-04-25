<script lang="ts">
  import Canvas2D from "./Canvas2D.svelte";
  import { palette, font, drawLabel } from "../../figures/shared";

  interface Series {
    points: { x: number; y: number }[];
    color?: string;
    label?: string;
  }

  interface Props {
    width: number;
    height: number;
    series: Series[];
    xRange?: [number, number];
    yRange?: [number, number];
    xLabel?: string;
    yLabel?: string;
    yTicks?: number[];
    xTicks?: number[];
  }

  let {
    width,
    height,
    series,
    xRange,
    yRange,
    xLabel,
    yLabel,
    xTicks,
    yTicks,
  }: Props = $props();

  const defaultColors = [palette.primary, palette.secondary, palette.tertiary];

  function draw(ctx: CanvasRenderingContext2D, s: { series: Series[] }) {
    const flat = s.series.flatMap((sr) => sr.points);
    if (flat.length === 0) return;
    const xs = flat.map((p) => p.x);
    const ys = flat.map((p) => p.y);
    const [xMin, xMax] = xRange ?? [Math.min(...xs), Math.max(...xs)];
    const [yMin, yMax] = yRange ?? [Math.min(...ys), Math.max(...ys)];

    const padL = 50,
      padR = 20,
      padT = 18,
      padB = 36;
    const w = width - padL - padR;
    const h = height - padT - padB;

    const sx = (x: number) =>
      padL + ((x - xMin) / (xMax - xMin || 1)) * w;
    const sy = (y: number) =>
      padT + h - ((y - yMin) / (yMax - yMin || 1)) * h;

    // gridlines
    ctx.strokeStyle = palette.strokeMid;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 3]);
    if (yTicks) {
      for (const t of yTicks) {
        ctx.beginPath();
        ctx.moveTo(padL, sy(t));
        ctx.lineTo(padL + w, sy(t));
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);

    // axes
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + h);
    ctx.lineTo(padL + w, padT + h);
    ctx.stroke();

    // ticks
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    if (yTicks) {
      for (const t of yTicks) {
        ctx.fillText(String(t), padL - 6, sy(t));
      }
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (xTicks) {
      for (const t of xTicks) {
        ctx.fillText(String(t), sx(t), padT + h + 6);
      }
    }

    // series
    s.series.forEach((sr, i) => {
      ctx.strokeStyle = sr.color ?? defaultColors[i % defaultColors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();
      sr.points.forEach((p, j) => {
        const X = sx(p.x);
        const Y = sy(p.y);
        if (j === 0) ctx.moveTo(X, Y);
        else ctx.lineTo(X, Y);
      });
      ctx.stroke();
    });

    // axis labels
    if (xLabel) {
      drawLabel(ctx, xLabel, padL + w / 2, height - 6, { align: "center" });
    }
    if (yLabel) {
      ctx.save();
      ctx.translate(14, padT + h / 2);
      ctx.rotate(-Math.PI / 2);
      drawLabel(ctx, yLabel, 0, 0, { align: "center" });
      ctx.restore();
    }
  }
</script>

<Canvas2D
  draw={(ctx, st) => draw(ctx, st)}
  data={{ series }}
  {width}
  {height}
/>
