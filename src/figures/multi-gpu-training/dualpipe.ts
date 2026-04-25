import { palette, font, drawLabel, fmt } from "@figures/shared";

export interface DualPipeData {
  k: number;
  m: number;
  t: number;
}

interface Cell {
  type: "F" | "B";
  mb: number;
}

interface Sim {
  grid: (Cell | null)[][];
  totalT: number;
  bubbleSlots: number;
}

function makeGrid(K: number, T: number): (Cell | null)[][] {
  return Array.from({ length: K }, () => Array<Cell | null>(T).fill(null));
}

function simulate1F1B(K: number, M: number): Sim {
  const T = 2 * M + K - 1;
  const grid = makeGrid(K, T);
  for (let d = 0; d < K; d++) {
    const warmup = Math.min(M, K - d);
    const events: Cell[] = [];
    for (let m = 0; m < warmup; m++) events.push({ type: "F", mb: m });
    let fNext = warmup;
    let bNext = 0;
    while (events.length < 2 * M) {
      if (bNext < M) {
        events.push({ type: "B", mb: bNext++ });
        if (events.length >= 2 * M) break;
      }
      if (fNext < M) events.push({ type: "F", mb: fNext++ });
    }
    for (let i = 0; i < events.length; i++) grid[d][d + i] = events[i];
  }
  return { grid, totalT: T, bubbleSlots: K * T - K * 2 * M };
}

function simulateDualPipe(K: number, M: number): Sim {
  const halfK = Math.ceil((K - 1) / 2);
  const T = 2 * M + halfK;
  const grid = makeGrid(K, T);
  for (let d = 0; d < K; d++) {
    const warmup = Math.min(M, Math.max(1, Math.ceil((K - d) / 2)));
    const events: Cell[] = [];
    for (let m = 0; m < warmup; m++) events.push({ type: "F", mb: m });
    let fNext = warmup;
    let bNext = 0;
    while (events.length < 2 * M) {
      if (bNext < M) {
        events.push({ type: "B", mb: bNext++ });
        if (events.length >= 2 * M) break;
      }
      if (fNext < M) events.push({ type: "F", mb: fNext++ });
    }
    const offset = Math.min(d, halfK);
    for (let i = 0; i < events.length; i++) {
      const t = offset + i;
      if (t < T) grid[d][t] = events[i];
    }
  }
  return { grid, totalT: T, bubbleSlots: K * T - K * 2 * M };
}

function drawGantt(
  ctx: CanvasRenderingContext2D,
  sim: Sim,
  M: number,
  x: number,
  y: number,
  w: number,
  h: number,
  cursorT: number,
): void {
  const K = sim.grid.length;
  const cellW = w / sim.totalT;
  const rowH = h / K;
  const Mh = Math.max(1, Math.floor(M / 2));

  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.6;
  for (let d = 1; d < K; d++) {
    ctx.beginPath();
    ctx.moveTo(x, y + d * rowH);
    ctx.lineTo(x + w, y + d * rowH);
    ctx.stroke();
  }
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);

  for (let d = 0; d < K; d++) {
    for (let t = 0; t < sim.totalT; t++) {
      const cell = sim.grid[d][t];
      if (!cell) continue;
      const cx = x + t * cellW;
      const cy = y + d * rowH;
      const inset = Math.max(0.4, Math.min(1, rowH * 0.06));
      const isLeft = cell.mb < Mh;
      let fill: string;
      if (cell.type === "F") {
        fill = isLeft ? palette.primary : palette.accentBlueLight;
      } else {
        fill = isLeft ? palette.tertiary : palette.accentTan;
      }
      const dimmed = t > cursorT;
      if (dimmed) {
        ctx.globalAlpha = 0.35;
      }
      ctx.fillStyle = fill;
      ctx.fillRect(cx + 0.4, cy + inset, Math.max(1, cellW - 0.8), rowH - inset * 2);
      ctx.globalAlpha = 1;
    }
  }
}

export function drawDualPipe(
  ctx: CanvasRenderingContext2D,
  data: DualPipeData,
): void {
  const { k: K, m: M, t } = data;
  const ref = simulate1F1B(K, M);
  const dp = simulateDualPipe(K, M);

  const chartX = 56;
  const chartW = 460;

  const refY = 50;
  const refH = 100;

  const dpY = refY + refH + 56;
  const dpH = 100;

  const cursorRefT = t * ref.totalT;
  const cursorDpT = t * dp.totalT;

  ctx.fillStyle = palette.text;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("1F1B (reference)", chartX, refY - 8);

  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillText("DualPipe (bidirectional, halved warm-up)", chartX, dpY - 8);

  drawGantt(ctx, ref, M, chartX, refY, chartW, refH, cursorRefT);
  drawGantt(ctx, dp, M, chartX, dpY, chartW, dpH, cursorDpT);

  const refScale = chartW / ref.totalT;
  const dpScale = chartW / dp.totalT;

  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(chartX + cursorRefT * refScale, refY - 4);
  ctx.lineTo(chartX + cursorRefT * refScale, refY + refH + 4);
  ctx.moveTo(chartX + cursorDpT * dpScale, dpY - 4);
  ctx.lineTo(chartX + cursorDpT * dpScale, dpY + dpH + 4);
  ctx.stroke();

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(`s0`, chartX - 6, refY + refH / (2 * K));
  ctx.fillText(`s${K - 1}`, chartX - 6, refY + refH - refH / (2 * K));
  ctx.fillText(`s0`, chartX - 6, dpY + dpH / (2 * K));
  ctx.fillText(`s${K - 1}`, chartX - 6, dpY + dpH - dpH / (2 * K));

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("0", chartX, dpY + dpH + 6);
  ctx.fillText(`${dp.totalT}`, chartX + chartW, dpY + dpH + 6);
  drawLabel(ctx, "time →", chartX + chartW / 2, dpY + dpH + 22, {
    align: "center",
  });

  const refBubble = ref.bubbleSlots / (K * ref.totalT);
  const dpBubble = dp.bubbleSlots / (K * dp.totalT);
  const reduction = ((refBubble - dpBubble) / Math.max(refBubble, 0.0001)) * 100;

  const readX = chartX + chartW + 28;
  let py = refY + 6;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("1F1B", readX, py);
  py += 14;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("bubble", readX, py);
  py += 18;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.fillStyle = refBubble > 0.3 ? palette.secondary : palette.text;
  ctx.fillText(`${fmt(refBubble * 100, 0)}%`, readX, py);

  py = dpY + 6;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillText("DualPipe", readX, py);
  py += 14;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("bubble", readX, py);
  py += 22;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.fillStyle = dpBubble > 0.3 ? palette.secondary : palette.text;
  ctx.fillText(`${fmt(dpBubble * 100, 0)}%`, readX, py);
  py += 22;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.tertiary;
  ctx.fillText(`-${fmt(reduction, 0)}% vs 1F1B`, readX, py);

  const legendY = dpY + dpH + 50;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let lx = chartX;
  const items = [
    { color: palette.primary, label: "F left-stream" },
    { color: palette.accentBlueLight, label: "F right-stream" },
    { color: palette.tertiary, label: "B left-stream" },
    { color: palette.accentTan, label: "B right-stream" },
  ];
  for (const it of items) {
    ctx.fillStyle = it.color;
    ctx.fillRect(lx, legendY - 6, 12, 12);
    ctx.fillStyle = palette.text;
    ctx.fillText(it.label, lx + 18, legendY);
    lx += 130;
  }
}

export const DUALPIPE_W = 620;
export const DUALPIPE_H = 360;
