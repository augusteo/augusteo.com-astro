import { palette, font, drawLabel } from "@figures/shared";

export interface FsdpData {
  layers: number;
  t: number;
  prefetch: boolean;
}

export function drawFsdp(
  ctx: CanvasRenderingContext2D,
  data: FsdpData,
): void {
  const L = data.layers;
  const slotsPrefetch = L + 1;
  const slotsNaive = 2 * L;
  const slotsAxis = Math.max(slotsPrefetch, slotsNaive);

  const chartX = 96;
  const chartY = 56;
  const chartW = 360;
  const slotW = chartW / slotsAxis;
  const rowH = 26;
  const rowGap = 10;

  const naiveY = chartY;
  const commY = chartY + rowH + 36;
  const compY = commY + rowH + rowGap;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("naive", chartX - 10, naiveY + rowH / 2);
  ctx.fillText("comm", chartX - 10, commY + rowH / 2);
  ctx.fillText("compute", chartX - 10, compY + rowH / 2);

  for (let k = 0; k < L; k++) {
    const agX = chartX + 2 * k * slotW;
    ctx.fillStyle = palette.accentTan;
    ctx.fillRect(agX + 1, naiveY + 2, slotW - 2, rowH - 4);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`AG${k + 1}`, agX + slotW / 2, naiveY + rowH / 2);

    const fX = chartX + (2 * k + 1) * slotW;
    ctx.fillStyle = palette.primary;
    ctx.fillRect(fX + 1, naiveY + 2, slotW - 2, rowH - 4);
    ctx.fillStyle = "white";
    ctx.fillText(`F${k + 1}`, fX + slotW / 2, naiveY + rowH / 2);
  }

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.strokeRect(chartX, naiveY, slotsNaive * slotW, rowH);
  ctx.setLineDash([]);

  for (let k = 0; k < L; k++) {
    const agSlot = data.prefetch ? k : 2 * k;
    const fSlot = data.prefetch ? k + 1 : 2 * k + 1;

    const agX = chartX + agSlot * slotW;
    const fX = chartX + fSlot * slotW;

    ctx.fillStyle = palette.accentTan;
    ctx.fillRect(agX + 1, commY + 2, slotW - 2, rowH - 4);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`AG${k + 1}`, agX + slotW / 2, commY + rowH / 2);

    ctx.fillStyle = palette.primary;
    ctx.fillRect(fX + 1, compY + 2, slotW - 2, rowH - 4);
    ctx.fillStyle = "white";
    ctx.fillText(`F${k + 1}`, fX + slotW / 2, compY + rowH / 2);
  }

  const slotsActive = data.prefetch ? slotsPrefetch : slotsNaive;
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.4;
  ctx.strokeRect(chartX, commY, slotsActive * slotW, rowH);
  ctx.strokeRect(chartX, compY, slotsActive * slotW, rowH);

  const cursorSlot = data.t * slotsActive;
  const cursorX = chartX + cursorSlot * slotW;
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cursorX, commY - 6);
  ctx.lineTo(cursorX, compY + rowH + 6);
  ctx.stroke();

  const slotIdx = Math.min(slotsActive - 1, Math.floor(cursorSlot));
  let commLabel = "—";
  let compLabel = "—";
  if (data.prefetch) {
    if (slotIdx < L) commLabel = `AG${slotIdx + 1}`;
    if (slotIdx >= 1 && slotIdx <= L) compLabel = `F${slotIdx}`;
  } else {
    if (slotIdx % 2 === 0 && slotIdx / 2 < L) {
      commLabel = `AG${slotIdx / 2 + 1}`;
    } else if (slotIdx % 2 === 1 && (slotIdx - 1) / 2 < L) {
      compLabel = `F${(slotIdx - 1) / 2 + 1}`;
    }
  }

  for (let s = 0; s <= slotsAxis; s++) {
    ctx.strokeStyle = palette.strokeMid;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(chartX + s * slotW, compY + rowH);
    ctx.lineTo(chartX + s * slotW, compY + rowH + 4);
    ctx.stroke();
  }
  drawLabel(ctx, "time →", chartX + chartW / 2, compY + rowH + 22, {
    align: "center",
  });

  const readX = chartX + chartW + 30;
  let py = chartY + 8;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("step length", readX, py);
  py += 22;
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillText(`${slotsActive} slots`, readX, py);
  py += 24;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = data.prefetch ? palette.tertiary : palette.secondary;
  ctx.fillText(
    data.prefetch
      ? `${(((slotsNaive - slotsPrefetch) / slotsNaive) * 100).toFixed(0)}% saved`
      : `serial baseline`,
    readX,
    py,
  );
  py += 30;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillText("at cursor", readX, py);
  py += 18;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText(`comm: ${commLabel}`, readX, py);
  py += 16;
  ctx.fillText(`compute: ${compLabel}`, readX, py);
}

export const FSDP_W = 580;
export const FSDP_H = 230;
