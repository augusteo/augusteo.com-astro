import { palette, font, drawLabel, fmt } from "@figures/shared";

export type ZeroStage = "1" | "2" | "3";

export interface ZeroStagesData {
  n: number;
  stage: ZeroStage;
}

interface StageBreakdown {
  weights: number;
  grads: number;
  opt: number;
}

function breakdown(stage: ZeroStage, n: number): StageBreakdown {
  const W = 2;
  const G = 2;
  const O = 12;
  if (stage === "1") return { weights: W, grads: G, opt: O / n };
  if (stage === "2") return { weights: W, grads: G / n, opt: O / n };
  return { weights: W / n, grads: G / n, opt: O / n };
}

export function drawZeroStages(
  ctx: CanvasRenderingContext2D,
  data: ZeroStagesData,
): void {
  const ddpTotal = 16;
  const baseline = 240;
  const psiPx = 9;
  const ddpPx = ddpTotal * psiPx;

  const cols: ZeroStage[] = ["1", "2", "3"];
  const colW = 70;
  const colGap = 28;
  const groupW = cols.length * colW + (cols.length - 1) * colGap;
  const groupX = 64;
  const colXs = cols.map((_, i) => groupX + i * (colW + colGap));

  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(groupX - 18, baseline - ddpPx);
  ctx.lineTo(groupX + groupW + 18, baseline - ddpPx);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("DDP 16Ψ", groupX - 24, baseline - ddpPx);
  ctx.fillText("0", groupX - 24, baseline);

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(groupX - 18, baseline);
  ctx.lineTo(groupX + groupW + 18, baseline);
  ctx.stroke();

  for (let i = 0; i < cols.length; i++) {
    const stage = cols[i];
    const x = colXs[i];
    const b = breakdown(stage, data.n);
    const total = b.weights + b.grads + b.opt;
    const wPx = b.weights * psiPx;
    const gPx = b.grads * psiPx;
    const oPx = b.opt * psiPx;
    const isActive = stage === data.stage;

    ctx.fillStyle = palette.tertiary;
    ctx.fillRect(x, baseline - wPx, colW, wPx);
    ctx.fillStyle = palette.accentTan;
    ctx.fillRect(x, baseline - wPx - gPx, colW, gPx);
    ctx.fillStyle = palette.primary;
    ctx.fillRect(x, baseline - wPx - gPx - oPx, colW, oPx);

    ctx.strokeStyle = isActive ? palette.text : palette.strokeMid;
    ctx.lineWidth = isActive ? 1.8 : 1;
    ctx.strokeRect(x, baseline - total * psiPx, colW, total * psiPx);

    ctx.fillStyle = isActive ? palette.text : palette.strokeMid;
    ctx.font = `${isActive ? "bold " : ""}${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`Stage ${stage}`, x + colW / 2, baseline + 18);

    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText(`${fmt(total, 2)}Ψ`, x + colW / 2, baseline + 32);
  }

  const active = breakdown(data.stage, data.n);
  const activeTotal = active.weights + active.grads + active.opt;
  const savings = ((ddpTotal - activeTotal) / ddpTotal) * 100;

  const readX = groupX + groupW + 64;
  let py = 36;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(`Stage ${data.stage} per rank`, readX, py);
  py += 24;
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillText(`${fmt(activeTotal, 2)}Ψ`, readX, py);
  py += 22;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.tertiary;
  ctx.fillText(`${fmt(savings, 0)}% less than DDP`, readX, py);
  py += 28;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(`N = ${data.n}`, readX, py);
  py += 22;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  const items: { color: string; label: string; val: number }[] = [
    { color: palette.primary, label: "optimizer", val: active.opt },
    { color: palette.accentTan, label: "grads", val: active.grads },
    { color: palette.tertiary, label: "weights", val: active.weights },
  ];
  for (const it of items) {
    ctx.fillStyle = it.color;
    ctx.fillRect(readX, py - 9, 12, 12);
    ctx.fillStyle = palette.text;
    ctx.fillText(`${it.label}  ${fmt(it.val, 2)}Ψ`, readX + 18, py);
    py += 16;
  }

  drawLabel(ctx, "bytes per parameter (Ψ)", groupX + groupW / 2, baseline + 50, {
    align: "center",
  });
}

export const ZERO_STAGES_W = 540;
export const ZERO_STAGES_H = 290;
