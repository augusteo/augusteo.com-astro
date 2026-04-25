import { palette, font, drawLabel, fmt } from "@figures/shared";

export type LoadMode = "aux-loss" | "aux-free";

export interface MoeLoadData {
  step: number;
  mode: LoadMode;
}

const E = 16;
const STEPS = 40;
const TOKENS = 64;

interface Snapshot {
  loads: number[];
  std: number;
}

function stdev(arr: number[], mean: number): number {
  const sumSq = arr.reduce((s, v) => s + (v - mean) ** 2, 0);
  return Math.sqrt(sumSq / arr.length);
}

function skewVector(): number[] {
  return Array.from({ length: E }, (_, i) => {
    const a = (i / E) * Math.PI * 2;
    return 0.6 * Math.cos(a + 0.4) + 0.25 * Math.cos(2 * a + 0.9);
  });
}

function simulateLoads(mode: LoadMode): Snapshot[] {
  const target = TOKENS / E;
  const skew = skewVector();
  const result: Snapshot[] = [];
  for (let s = 0; s < STEPS; s++) {
    let loads: number[];
    if (mode === "aux-loss") {
      const decay = Math.exp(-s / 12);
      const osc =
        1 + 0.45 * Math.cos((s / 4.5) * Math.PI * 2) * Math.exp(-s / 22);
      loads = skew.map((sk) => Math.max(0, target * (1 + sk * decay * osc)));
    } else {
      const decay = Math.exp(-s / 4);
      loads = skew.map((sk) => Math.max(0, target * (1 + sk * decay)));
    }
    const sum = loads.reduce((a, b) => a + b, 0);
    const normalized = sum > 0 ? loads.map((l) => (l * TOKENS) / sum) : loads;
    result.push({ loads: normalized, std: stdev(normalized, target) });
  }
  return result;
}

export function drawMoeLoad(
  ctx: CanvasRenderingContext2D,
  data: MoeLoadData,
): void {
  const { step, mode } = data;
  const history = simulateLoads(mode);
  const stepIdx = Math.min(STEPS - 1, Math.floor(step * STEPS));
  const snap = history[stepIdx];
  const target = TOKENS / E;

  const plotX = 44;
  const plotY = 64;
  const plotW = 410;
  const plotH = 188;
  const yMax = target * 2.4;

  const barGap = 3;
  const barW = (plotW - barGap * (E - 1)) / E;
  const accent = mode === "aux-loss" ? palette.secondary : palette.tertiary;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    `per-expert load · step ${stepIdx + 1} of ${STEPS}`,
    plotX,
    32,
  );

  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(plotX, plotY, plotW, plotH);
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(plotX, plotY, plotW, plotH);

  const targetY = plotY + plotH - (target / yMax) * plotH;
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(plotX, targetY);
  ctx.lineTo(plotX + plotW, targetY);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel(ctx, "uniform", plotX + plotW + 4, targetY + 3, {
    color: palette.text,
  });

  for (let i = 0; i < E; i++) {
    const load = snap.loads[i];
    const h = (Math.min(yMax, load) / yMax) * plotH;
    const bx = plotX + i * (barW + barGap);
    const by = plotY + plotH - h;

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(bx, by, barW, h);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 0.25, by + 0.25, barW - 0.5, h - 0.25);
  }

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(`${fmt(yMax, 0)}`, plotX - 6, plotY + 4);
  ctx.fillText(`${fmt(target, 0)}`, plotX - 6, targetY);
  ctx.fillText("0", plotX - 6, plotY + plotH);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  drawLabel(ctx, "tokens / expert", plotX - 4, plotY - 8, { align: "left" });
  drawLabel(ctx, `expert 0..${E - 1} →`, plotX, plotY + plotH + 18, {
    align: "left",
  });

  const panelX = plotX + plotW + 60;
  let py = plotY + 4;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.fillStyle = accent;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(mode === "aux-loss" ? "aux-loss" : "aux-loss-free", panelX, py);
  py += 22;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("load std-dev", panelX, py);
  py += 16;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.fillStyle = accent;
  ctx.fillText(`${fmt(snap.std, 2)}`, panelX, py + 6);
  py += 30;

  const maxL = Math.max(...snap.loads);
  const minL = Math.min(...snap.loads);
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`max ${fmt(maxL, 1)}`, panelX, py);
  py += 14;
  ctx.fillText(`min ${fmt(minL, 1)}`, panelX, py);
  py += 22;

  ctx.fillText("std-dev over time:", panelX, py);
  py += 6;

  const sparkW = 96;
  const sparkH = 36;
  const stdMax = Math.max(0.01, ...history.map((h) => h.std));

  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(panelX, py + sparkH);
  ctx.lineTo(panelX + sparkW, py + sparkH);
  ctx.stroke();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let s = 0; s < STEPS; s++) {
    const x = panelX + (s / (STEPS - 1)) * sparkW;
    const y = py + sparkH - (history[s].std / stdMax) * sparkH;
    if (s === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const cx = panelX + (stepIdx / (STEPS - 1)) * sparkW;
  const cy = py + sparkH - (snap.std / stdMax) * sparkH;
  ctx.fillStyle = palette.text;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();
}

export const MOE_LOAD_W = 620;
export const MOE_LOAD_H = 300;
