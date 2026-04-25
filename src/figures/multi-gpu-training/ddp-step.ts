import { palette, font, drawLabel, fmt } from "@figures/shared";

export interface DdpStepData {
  n: number;
  t: number;
}

export function drawDdpStep(
  ctx: CanvasRenderingContext2D,
  data: DdpStepData,
): void {
  const H = 240;

  const fwdW = 22;
  const bwdW = 26;
  const arW = 8 + 1.6 * data.n;
  const optW = 8;
  const totalW = fwdW + bwdW + arW + optW;

  const chartX = 60;
  const chartY = 58;
  const chartW = 360;
  const chartH = 150;
  const rowH = chartH / data.n;

  const sx = (u: number) => chartX + (u / totalW) * chartW;
  const cursorU = data.t * totalW;
  const cursorX = sx(cursorU);

  let phase: string;
  let phaseColor: string;
  if (cursorU < fwdW) {
    phase = "FORWARD";
    phaseColor = palette.primary;
  } else if (cursorU < fwdW + bwdW) {
    phase = "BACKWARD";
    phaseColor = palette.tertiary;
  } else if (cursorU < fwdW + bwdW + arW) {
    phase = "ALL-REDUCE";
    phaseColor = palette.secondary;
  } else {
    phase = "OPTIMIZER";
    phaseColor = palette.accentBrown;
  }

  ctx.fillStyle = phaseColor;
  ctx.font = `bold 18px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(phase, chartX + chartW / 2, 30);

  for (let r = 0; r < data.n; r++) {
    const y = chartY + r * rowH;
    const inset = Math.min(1, rowH * 0.08);
    ctx.fillStyle = palette.primary;
    ctx.fillRect(chartX, y + inset, sx(fwdW) - chartX, rowH - inset * 2);
    ctx.fillStyle = palette.tertiary;
    ctx.fillRect(sx(fwdW), y + inset, sx(fwdW + bwdW) - sx(fwdW), rowH - inset * 2);
    ctx.fillStyle = palette.secondary;
    ctx.fillRect(
      sx(fwdW + bwdW),
      y + inset,
      sx(fwdW + bwdW + arW) - sx(fwdW + bwdW),
      rowH - inset * 2,
    );
    ctx.fillStyle = palette.accentBrown;
    ctx.fillRect(
      sx(fwdW + bwdW + arW),
      y + inset,
      sx(totalW) - sx(fwdW + bwdW + arW),
      rowH - inset * 2,
    );
  }

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  if (data.n <= 8) {
    for (let r = 0; r < data.n; r++) {
      ctx.fillText(`rank ${r}`, chartX - 6, chartY + r * rowH + rowH / 2);
    }
  } else {
    ctx.fillText(`rank 0`, chartX - 6, chartY + rowH / 2);
    ctx.fillText(
      `rank ${data.n - 1}`,
      chartX - 6,
      chartY + (data.n - 1) * rowH + rowH / 2,
    );
    ctx.fillText("…", chartX - 14, chartY + chartH / 2);
  }

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(chartX, chartY + chartH);
  ctx.lineTo(chartX + chartW, chartY + chartH);
  ctx.stroke();

  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("F", (sx(0) + sx(fwdW)) / 2, chartY + chartH + 6);
  ctx.fillText("B", (sx(fwdW) + sx(fwdW + bwdW)) / 2, chartY + chartH + 6);
  ctx.fillText("AR", (sx(fwdW + bwdW) + sx(fwdW + bwdW + arW)) / 2, chartY + chartH + 6);
  ctx.fillText("O", (sx(fwdW + bwdW + arW) + sx(totalW)) / 2, chartY + chartH + 6);

  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cursorX, chartY - 4);
  ctx.lineTo(cursorX, chartY + chartH + 2);
  ctx.stroke();

  const commPct = (arW / totalW) * 100;
  const readX = chartX + chartW + 24;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("all-reduce", readX, chartY + 8);
  ctx.fillText("share", readX, chartY + 22);
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillStyle = commPct > 30 ? palette.secondary : palette.text;
  ctx.fillText(`${fmt(commPct, 0)}%`, readX, chartY + 50);
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`of one step`, readX, chartY + 66);

  drawLabel(ctx, "time →", chartX + chartW / 2, H - 6, { align: "center" });
}

export const DDP_STEP_W = 540;
export const DDP_STEP_H = 240;
