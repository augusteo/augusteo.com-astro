import { palette, font, drawLabel, fmt } from "@figures/shared";

export type PpSchedule = "gpipe" | "1f1b" | "interleaved";

export interface PipelineScheduleData {
  k: number;
  m: number;
  schedule: PpSchedule;
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

const V = 2;

function makeGrid(K: number, T: number): (Cell | null)[][] {
  return Array.from({ length: K }, () => Array<Cell | null>(T).fill(null));
}

function simulateGPipe(K: number, M: number): Sim {
  const T = 2 * (M + K - 1);
  const grid = makeGrid(K, T);
  for (let m = 0; m < M; m++) {
    for (let d = 0; d < K; d++) grid[d][m + d] = { type: "F", mb: m };
  }
  const fEnd = M + K - 1;
  for (let m = 0; m < M; m++) {
    for (let d = K - 1; d >= 0; d--) {
      grid[d][fEnd + m + (K - 1 - d)] = { type: "B", mb: m };
    }
  }
  const work = K * 2 * M;
  const total = K * T;
  return { grid, totalT: T, bubbleSlots: total - work };
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
  const work = K * 2 * M;
  const total = K * T;
  return { grid, totalT: T, bubbleSlots: total - work };
}

function simulateInterleaved(K: number, M: number): Sim {
  const warmupBase = Math.ceil((K - 1) / V) + 1;
  const T = 2 * M + Math.ceil((K - 1) / V);
  const grid = makeGrid(K, T);
  for (let d = 0; d < K; d++) {
    const dWarmup = Math.min(M, Math.max(1, Math.ceil((K - d) / V)));
    const events: Cell[] = [];
    for (let m = 0; m < dWarmup; m++) events.push({ type: "F", mb: m });
    let fNext = dWarmup;
    let bNext = 0;
    while (events.length < 2 * M) {
      if (bNext < M) {
        events.push({ type: "B", mb: bNext++ });
        if (events.length >= 2 * M) break;
      }
      if (fNext < M) events.push({ type: "F", mb: fNext++ });
    }
    const offset = Math.min(d, warmupBase);
    for (let i = 0; i < events.length; i++) {
      const t = offset + i;
      if (t < T) grid[d][t] = events[i];
    }
  }
  const work = K * 2 * M;
  const total = K * T;
  return { grid, totalT: T, bubbleSlots: total - work };
}

function simulate(schedule: PpSchedule, K: number, M: number): Sim {
  if (schedule === "gpipe") return simulateGPipe(K, M);
  if (schedule === "1f1b") return simulate1F1B(K, M);
  return simulateInterleaved(K, M);
}

export function drawPipelineSchedule(
  ctx: CanvasRenderingContext2D,
  data: PipelineScheduleData,
): void {
  const { k: K, m: M, schedule } = data;
  const sim = simulate(schedule, K, M);

  const chartX = 56;
  const chartY = 60;
  const chartW = 460;
  const chartH = 180;

  const cellW = chartW / sim.totalT;
  const rowH = chartH / K;

  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(chartX, chartY, chartW, chartH);
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.6;
  for (let d = 1; d < K; d++) {
    ctx.beginPath();
    ctx.moveTo(chartX, chartY + d * rowH);
    ctx.lineTo(chartX + chartW, chartY + d * rowH);
    ctx.stroke();
  }
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(chartX, chartY, chartW, chartH);

  for (let d = 0; d < K; d++) {
    for (let t = 0; t < sim.totalT; t++) {
      const cell = sim.grid[d][t];
      if (!cell) continue;
      const x = chartX + t * cellW;
      const y = chartY + d * rowH;
      const inset = Math.max(0.5, Math.min(1, rowH * 0.06));
      ctx.fillStyle = cell.type === "F" ? palette.primary : palette.tertiary;
      ctx.fillRect(x + 0.5, y + inset, Math.max(1, cellW - 1), rowH - inset * 2);
    }
  }

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  if (K <= 8) {
    for (let d = 0; d < K; d++) {
      ctx.fillText(`s${d}`, chartX - 6, chartY + d * rowH + rowH / 2);
    }
  } else {
    ctx.fillText(`s0`, chartX - 6, chartY + rowH / 2);
    ctx.fillText(`s${K - 1}`, chartX - 6, chartY + (K - 1) * rowH + rowH / 2);
    ctx.fillText("…", chartX - 12, chartY + chartH / 2);
  }

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("0", chartX, chartY + chartH + 6);
  ctx.fillText(`${sim.totalT}`, chartX + chartW, chartY + chartH + 6);
  drawLabel(ctx, "time →", chartX + chartW / 2, chartY + chartH + 22, {
    align: "center",
  });

  const scheduleName =
    schedule === "gpipe"
      ? "GPipe"
      : schedule === "1f1b"
        ? "1F1B"
        : "Interleaved 1F1B";
  ctx.fillStyle = palette.text;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(scheduleName, chartX, 30);
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText(`K = ${K}   M = ${M}`, chartX, 46);

  const bubbleFrac = sim.bubbleSlots / (K * sim.totalT);
  const readX = chartX + chartW + 28;
  let py = 30;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("bubble", readX, py);
  py += 22;
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillStyle = bubbleFrac > 0.3 ? palette.secondary : palette.text;
  ctx.fillText(`${fmt(bubbleFrac * 100, 0)}%`, readX, py);
  py += 22;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`${sim.totalT} slots`, readX, py);
  py += 30;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.primary;
  ctx.fillRect(readX, py - 9, 12, 12);
  ctx.fillStyle = palette.text;
  ctx.fillText("forward", readX + 18, py);
  py += 16;
  ctx.fillStyle = palette.tertiary;
  ctx.fillRect(readX, py - 9, 12, 12);
  ctx.fillStyle = palette.text;
  ctx.fillText("backward", readX + 18, py);
  py += 16;
  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(readX, py - 9, 12, 12);
  ctx.strokeStyle = palette.stroke;
  ctx.strokeRect(readX, py - 9, 12, 12);
  ctx.fillStyle = palette.text;
  ctx.fillText("idle", readX + 18, py);
}

export const PIPE_W = 620;
export const PIPE_H = 280;
