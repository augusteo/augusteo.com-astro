import { palette, font, drawLabel } from "@figures/shared";

export type TpMode = "column" | "columnrow";

export interface TpMatmulData {
  mode: TpMode;
}

export function drawTpMatmul(
  ctx: CanvasRenderingContext2D,
  data: TpMatmulData,
): void {
  const cw = 580;
  const fullRow = data.mode === "columnrow";

  const xBoxW = 280;
  const xBoxH = 30;
  const xBoxX = (cw - xBoxW) / 2;
  const xBoxY = 24;

  ctx.fillStyle = palette.paperDark;
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1.2;
  ctx.fillRect(xBoxX, xBoxY, xBoxW, xBoxH);
  ctx.strokeRect(xBoxX, xBoxY, xBoxW, xBoxH);
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("X  (full, replicated)", xBoxX + xBoxW / 2, xBoxY + xBoxH / 2);

  const r0X = 90;
  const r1X = cw - 90;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("rank 0", r0X, 70);
  ctx.fillText("rank 1", r1X, 70);

  const boxW = 150;
  const stepH = 38;
  const stepGap = 14;

  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(xBoxX + 60, xBoxY + xBoxH);
  ctx.lineTo(r0X, 86);
  ctx.moveTo(xBoxX + xBoxW - 60, xBoxY + xBoxH);
  ctx.lineTo(r1X, 86);
  ctx.stroke();

  function step(rx: number, y: number, fill: string, label: string, sub?: string): void {
    ctx.fillStyle = fill;
    ctx.strokeStyle = palette.stroke;
    ctx.fillRect(rx - boxW / 2, y, boxW, stepH);
    ctx.strokeRect(rx - boxW / 2, y, boxW, stepH);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (sub) {
      ctx.fillText(label, rx, y + stepH / 2 - 7);
      ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
      ctx.fillText(sub, rx, y + stepH / 2 + 8);
    } else {
      ctx.fillText(label, rx, y + stepH / 2);
    }
  }

  function arrow(rx: number, fromY: number, toY: number): void {
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(rx, fromY);
    ctx.lineTo(rx, toY - 6);
    ctx.stroke();
    ctx.fillStyle = palette.stroke;
    ctx.beginPath();
    ctx.moveTo(rx, toY);
    ctx.lineTo(rx - 4, toY - 6);
    ctx.lineTo(rx + 4, toY - 6);
    ctx.closePath();
    ctx.fill();
  }

  let y = 90;
  step(r0X, y, palette.accentYellow, "X · A₁", "column-shard");
  step(r1X, y, palette.accentYellow, "X · A₂", "column-shard");
  y += stepH + stepGap;
  arrow(r0X, y - stepGap, y);
  arrow(r1X, y - stepGap, y);
  step(r0X, y, palette.paperDark, "GeLU(Y₁)");
  step(r1X, y, palette.paperDark, "GeLU(Y₂)");

  y += stepH + stepGap;

  if (fullRow) {
    arrow(r0X, y - stepGap, y);
    arrow(r1X, y - stepGap, y);
    step(r0X, y, palette.accentBlueLight, "Y₁ · B₁ = Z₁", "row-shard");
    step(r1X, y, palette.accentBlueLight, "Y₂ · B₂ = Z₂", "row-shard");
    y += stepH + stepGap;

    const arBoxX = (cw - 240) / 2;
    const arBoxY = y + 6;
    const arBoxH = 44;

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(r0X, y - stepGap);
    ctx.quadraticCurveTo(r0X, arBoxY, arBoxX + 60, arBoxY);
    ctx.moveTo(r1X, y - stepGap);
    ctx.quadraticCurveTo(r1X, arBoxY, arBoxX + 240 - 60, arBoxY);
    ctx.stroke();

    ctx.fillStyle = palette.primary;
    ctx.fillRect(arBoxX, arBoxY, 240, arBoxH);
    ctx.strokeStyle = palette.primary;
    ctx.strokeRect(arBoxX, arBoxY, 240, arBoxH);
    ctx.fillStyle = "white";
    ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ALL-REDUCE", arBoxX + 120, arBoxY + arBoxH / 2 - 7);
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText("Z = Z₁ + Z₂", arBoxX + 120, arBoxY + arBoxH / 2 + 8);

    drawLabel(ctx, "every rank ends with full Z", cw / 2, arBoxY + arBoxH + 16, {
      align: "center",
      color: palette.tertiary,
    });
  } else {
    const warnX = (cw - 320) / 2;
    const warnY = y + 8;
    ctx.strokeStyle = palette.secondary;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(r0X, y - stepGap + 4);
    ctx.lineTo(r0X, warnY + 6);
    ctx.lineTo(warnX + 40, warnY + 6);
    ctx.moveTo(r1X, y - stepGap + 4);
    ctx.lineTo(r1X, warnY + 6);
    ctx.lineTo(warnX + 320 - 40, warnY + 6);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = palette.accentYellow;
    ctx.strokeStyle = palette.secondary;
    ctx.lineWidth = 1.4;
    ctx.fillRect(warnX, warnY, 320, 44);
    ctx.strokeRect(warnX, warnY, 320, 44);
    ctx.fillStyle = palette.secondary;
    ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("each rank holds half of Y, not Z", warnX + 160, warnY + 22 - 7);
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillStyle = palette.text;
    ctx.fillText(
      "next layer needs the full activation: incoherent",
      warnX + 160,
      warnY + 22 + 8,
    );
  }
}

export const TP_MATMUL_W = 580;
export const TP_MATMUL_H = 320;
