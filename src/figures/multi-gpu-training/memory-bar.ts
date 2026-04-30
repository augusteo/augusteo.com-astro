import { palette, font, drawLabel, fmt } from "@figures/shared";

export type MemHw = "H100" | "H200" | "B200" | "GB300";

const HBM_GB: Record<MemHw, number> = {
  H100: 80,
  H200: 141,
  B200: 192,
  GB300: 288,
};

export interface MemoryBarData {
  paramsB: number;
  n: number;
  hw: MemHw;
}

export function drawMemoryBar(
  ctx: CanvasRenderingContext2D,
  data: MemoryBarData,
): void {
  const wGb = 2 * data.paramsB;
  const gGb = 2 * data.paramsB;
  const oGb = 12 * data.paramsB;
  const perRank = wGb + gGb + oGb;
  const totalCluster = perRank * data.n;
  const hbm = HBM_GB[data.hw];
  const ratio = perRank / hbm;

  const barX = 88;
  const barW = 64;
  const baseline = 196;
  const oneHbmPx = 76;
  const maxBarPx = 152;
  const fullBarPx = Math.min((perRank / hbm) * oneHbmPx, maxBarPx);
  const overflow = (perRank / hbm) * oneHbmPx > maxBarPx;

  const wPx = perRank > 0 ? (wGb / perRank) * fullBarPx : 0;
  const gPx = perRank > 0 ? (gGb / perRank) * fullBarPx : 0;
  const oPx = perRank > 0 ? (oGb / perRank) * fullBarPx : 0;

  ctx.fillStyle = palette.tertiary;
  ctx.fillRect(barX, baseline - wPx, barW, wPx);
  ctx.fillStyle = palette.accentTan;
  ctx.fillRect(barX, baseline - wPx - gPx, barW, gPx);
  ctx.fillStyle = palette.primary;
  ctx.fillRect(barX, baseline - wPx - gPx - oPx, barW, oPx);

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, baseline - fullBarPx, barW, fullBarPx);

  if (overflow) {
    ctx.fillStyle = palette.secondary;
    ctx.font = `${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`↑ ${fmt(ratio, 1)}× HBM`, barX + barW / 2, baseline - maxBarPx - 6);
  }

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(barX - 14, baseline - oneHbmPx);
  ctx.lineTo(barX + barW + 14, baseline - oneHbmPx);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(barX - 14, baseline);
  ctx.lineTo(barX + barW + 14, baseline);
  ctx.stroke();

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = palette.secondary;
  ctx.fillText(`${data.hw} HBM`, barX - 18, baseline - oneHbmPx);
  ctx.fillStyle = palette.text;
  ctx.fillText("0", barX - 18, baseline);

  const labelX = barX + barW + 8;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = palette.text;
  if (oPx > 14) {
    ctx.fillText("optimizer  12Ψ", labelX, baseline - wPx - gPx - oPx / 2);
  }
  if (gPx > 12) {
    ctx.fillText("grads  2Ψ", labelX, baseline - wPx - gPx / 2);
  }
  if (wPx > 12) {
    ctx.fillText("weights  2Ψ", labelX, baseline - wPx / 2);
  }

  const readX = 290;
  let y = 28;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Per rank (16Ψ)", readX, y);
  y += 22;
  ctx.font = `bold 20px ${font.mono}`;
  ctx.fillStyle = ratio > 1 ? palette.secondary : palette.text;
  const perRankStr =
    perRank >= 1000 ? `${fmt(perRank / 1000, 2)} TB` : `${fmt(perRank, 0)} GB`;
  ctx.fillText(perRankStr, readX, y);
  y += 26;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(`${data.hw} HBM`, readX, y);
  y += 22;
  ctx.font = `bold 20px ${font.mono}`;
  ctx.fillText(`${hbm} GB`, readX, y);
  y += 26;

  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  if (ratio <= 1) {
    ctx.fillStyle = palette.tertiary;
    ctx.fillText(
      `fits, ${fmt((1 - ratio) * 100, 0)}% headroom`,
      readX,
      y,
    );
  } else {
    ctx.fillStyle = palette.secondary;
    ctx.fillText(`${fmt(ratio, 1)}× over single-GPU budget`, readX, y);
  }
  y += 22;

  ctx.fillStyle = palette.text;
  ctx.fillText(`Cluster (${data.n} ranks, replicated)`, readX, y);
  y += 17;
  ctx.font = `bold 14px ${font.mono}`;
  const totStr =
    totalCluster >= 1000
      ? `${fmt(totalCluster / 1000, 2)} TB`
      : `${fmt(totalCluster, 0)} GB`;
  ctx.fillText(totStr, readX, y);

  drawLabel(
    ctx,
    "replicated DDP state only · activations not shown",
    barX + barW / 2,
    baseline + 16,
    { align: "center" },
  );
}

export const MEMORY_BAR_W = 540;
export const MEMORY_BAR_H = 230;
