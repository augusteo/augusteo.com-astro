import { palette, font, drawLabel, fmt } from "@figures/shared";

export interface MoeRoutingData {
  e: number;
  cf: number;
  dragX: number;
  dragY: number;
}

const NUM_RANKS = 4;
const SEQ_TOKENS = 64;

function tokenLoad(expIdx: number, e: number): number {
  const base = SEQ_TOKENS / e;
  const phase = (expIdx / e) * Math.PI * 2;
  const skew =
    Math.sin(phase * 2) * base * 0.6 + Math.cos(phase + 0.4) * base * 0.4;
  return Math.max(0, Math.round(base + skew));
}

export function drawMoeRouting(
  ctx: CanvasRenderingContext2D,
  data: MoeRoutingData,
): void {
  const W = MOE_ROUTING_W;
  const H = MOE_ROUTING_H;
  const { e, cf, dragX, dragY } = data;

  const chartX = 32;
  const chartW = 440;
  const chartY = 70;
  const chartH = 180;

  const scaledX = Math.min(
    1,
    Math.max(0, (dragX * W - chartX) / chartW),
  );
  const scaledY = Math.min(
    1,
    Math.max(0, (dragY * H - chartY) / chartH),
  );

  const expertIdx = Math.min(e - 1, Math.max(0, Math.floor(scaledX * e)));
  const expertsPerRank = Math.max(1, Math.ceil(e / NUM_RANKS));
  const targetRank = Math.min(
    NUM_RANKS - 1,
    Math.floor(expertIdx / expertsPerRank),
  );
  const homeRank = Math.min(
    NUM_RANKS - 1,
    Math.max(0, Math.floor(scaledY * NUM_RANKS)),
  );

  const capacity = Math.max(1, Math.ceil((SEQ_TOKENS / e) * cf));
  let hotExperts = 0;
  let droppedTokens = 0;
  for (let i = 0; i < e; i++) {
    const load = tokenLoad(i, e);
    if (load > capacity) {
      hotExperts++;
      droppedTokens += load - capacity;
    }
  }
  const dropPct = (droppedTokens / SEQ_TOKENS) * 100;

  const rankGap = 12;
  const rankW = (chartW - (NUM_RANKS - 1) * rankGap) / NUM_RANKS;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    "drag x picks expert · drag y picks home rank",
    chartX,
    32,
  );

  for (let r = 0; r < NUM_RANKS; r++) {
    const rx = chartX + r * (rankW + rankGap);
    const isHome = r === homeRank;
    const isTarget = r === targetRank;

    ctx.fillStyle = palette.paperDark;
    ctx.fillRect(rx, chartY, rankW, chartH);

    ctx.lineWidth = isHome || isTarget ? 1.6 : 0.8;
    ctx.strokeStyle = isHome
      ? palette.tertiary
      : isTarget
        ? palette.primary
        : palette.stroke;
    ctx.strokeRect(rx, chartY, rankW, chartH);

    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillStyle = palette.text;
    ctx.textAlign = "left";
    ctx.fillText(`GPU ${r}`, rx + 6, chartY + 14);

    if (isHome) {
      ctx.fillStyle = palette.tertiary;
      ctx.beginPath();
      ctx.arc(rx + rankW - 12, chartY + 12, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = palette.tertiary;
      ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
      ctx.textAlign = "right";
      ctx.fillText("token", rx + rankW - 22, chartY + 15);
    }

    const innerY = chartY + 24;
    const innerH = chartH - 32;
    const expH = innerH / expertsPerRank;
    const expInset = 4;
    const ew = rankW - 2 * expInset;

    for (let i = 0; i < expertsPerRank; i++) {
      const globalE = r * expertsPerRank + i;
      if (globalE >= e) break;
      const ey = innerY + i * expH;
      const eh = expH - 3;

      const load = tokenLoad(globalE, e);
      const overCap = load > capacity;
      const fillRatio = Math.min(1, load / Math.max(1, capacity));
      const isSelected = globalE === expertIdx;

      ctx.fillStyle = palette.paper;
      ctx.fillRect(rx + expInset, ey, ew, eh);

      ctx.fillStyle = overCap
        ? palette.secondary
        : isSelected
          ? palette.primary
          : palette.accentTan;
      ctx.fillRect(rx + expInset, ey, ew * fillRatio, eh);

      ctx.lineWidth = isSelected ? 1.6 : 0.5;
      ctx.strokeStyle = isSelected ? palette.primary : palette.strokeMid;
      ctx.strokeRect(rx + expInset, ey, ew, eh);

      if (eh > 12) {
        ctx.fillStyle = isSelected ? palette.paper : palette.text;
        ctx.font = `${font.sizeLabelSmall - 1}px ${font.mono}`;
        ctx.textAlign = "left";
        ctx.fillText(`e${globalE}`, rx + expInset + 3, ey + eh / 2 + 3);
      }
    }
  }

  const homeCx = chartX + homeRank * (rankW + rankGap) + rankW / 2;
  const targetCx = chartX + targetRank * (rankW + rankGap) + rankW / 2;

  if (homeRank !== targetRank) {
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    const arcY = chartY - 22;
    ctx.moveTo(homeCx, chartY);
    ctx.bezierCurveTo(homeCx, arcY, targetCx, arcY, targetCx, chartY);
    ctx.stroke();

    ctx.fillStyle = palette.primary;
    const dir = targetCx > homeCx ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(targetCx, chartY);
    ctx.lineTo(targetCx - dir * 6, chartY - 6);
    ctx.lineTo(targetCx - dir * 10, chartY - 1);
    ctx.closePath();
    ctx.fill();

    drawLabel(ctx, "all-to-all dispatch", (homeCx + targetCx) / 2, arcY - 6, {
      align: "center",
      color: palette.primary,
    });

    ctx.strokeStyle = palette.tertiary;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    const arcY2 = chartY + chartH + 22;
    ctx.moveTo(targetCx, chartY + chartH);
    ctx.bezierCurveTo(
      targetCx,
      arcY2,
      homeCx,
      arcY2,
      homeCx,
      chartY + chartH,
    );
    ctx.stroke();

    ctx.fillStyle = palette.tertiary;
    const dir2 = homeCx > targetCx ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(homeCx, chartY + chartH);
    ctx.lineTo(homeCx - dir2 * 6, chartY + chartH + 6);
    ctx.lineTo(homeCx - dir2 * 10, chartY + chartH + 1);
    ctx.closePath();
    ctx.fill();

    drawLabel(ctx, "all-to-all return", (homeCx + targetCx) / 2, arcY2 + 14, {
      align: "center",
      color: palette.tertiary,
    });
  } else {
    drawLabel(ctx, "local · no comm", homeCx, chartY - 12, {
      align: "center",
      color: palette.text,
    });
  }

  const panelX = chartX + chartW + 32;
  let py = chartY;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.fillStyle = palette.text;
  ctx.fillText("expert", panelX, py);
  py += 16;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.fillStyle = palette.primary;
  ctx.fillText(`e${expertIdx}`, panelX, py + 6);
  py += 30;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("on rank", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(
    homeRank === targetRank ? `${targetRank} · local` : `${targetRank} · remote`,
    panelX,
    py,
  );
  py += 24;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("capacity / expert", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(`${capacity} tokens`, panelX, py);
  py += 24;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("hot experts", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillStyle = hotExperts > 0 ? palette.secondary : palette.text;
  ctx.fillText(`${hotExperts} of ${e}`, panelX, py);
  py += 24;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("dropped", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillStyle = dropPct > 1 ? palette.secondary : palette.text;
  ctx.fillText(`${fmt(dropPct, 0)}%`, panelX, py);
}

export const MOE_ROUTING_W = 620;
export const MOE_ROUTING_H = 320;
