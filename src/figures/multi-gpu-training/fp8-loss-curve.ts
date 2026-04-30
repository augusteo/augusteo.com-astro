import { palette, font, drawLabel, clamp } from "@figures/shared";

const TOKEN_RANGE_T: [number, number] = [0.1, 14.8];

function bf16Loss(t: number): number {
  return 2.05 + 7.0 * Math.exp(-t / 1.8);
}

function fp8Bias(t: number): number {
  const lt = Math.log10(t);
  return 0.0015 + 0.0007 * Math.sin(lt * 3.0 + 0.4) + 0.0003 * Math.cos(lt * 7.0);
}

function fp8Loss(t: number): number {
  return bf16Loss(t) * (1 + fp8Bias(t));
}

export function drawFp8LossCurve(
  ctx: CanvasRenderingContext2D,
  _data: Record<string, never>,
): void {
  const W = 540;
  const H = 260;

  const padL = 56;
  const padR = 80;
  const w = W - padL - padR;

  const topY = 18;
  const topH = 124;
  const gap = 28;
  const botY = topY + topH + gap;
  const botH = 60;

  const logTMin = Math.log10(TOKEN_RANGE_T[0]);
  const logTMax = Math.log10(TOKEN_RANGE_T[1]);
  const sx = (tT: number) =>
    padL + ((Math.log10(tT) - logTMin) / (logTMax - logTMin)) * w;

  const lossRange: [number, number] = [2.0, 9.0];
  const yLoss = (loss: number) =>
    topY + topH - ((loss - lossRange[0]) / (lossRange[1] - lossRange[0])) * topH;

  const errRange: [number, number] = [0, 0.32];
  const yErr = (errPct: number) =>
    botY + botH -
    ((clamp(errPct, errRange[0], errRange[1]) - errRange[0]) /
      (errRange[1] - errRange[0])) *
      botH;

  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 3]);
  for (const t of [3, 5, 7]) {
    ctx.beginPath();
    ctx.moveTo(padL, yLoss(t));
    ctx.lineTo(padL + w, yLoss(t));
    ctx.stroke();
  }
  for (const e of [0.1]) {
    ctx.beginPath();
    ctx.moveTo(padL, yErr(e));
    ctx.lineTo(padL + w, yErr(e));
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padL, topY);
  ctx.lineTo(padL, topY + topH);
  ctx.lineTo(padL + w, topY + topH);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(padL, botY);
  ctx.lineTo(padL, botY + botH);
  ctx.lineTo(padL + w, botY + botH);
  ctx.stroke();

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(padL, yErr(0.25));
  ctx.lineTo(padL + w, yErr(0.25));
  ctx.stroke();
  ctx.setLineDash([]);

  const samples = 140;
  const tokens: number[] = [];
  for (let i = 0; i < samples; i++) {
    const lt = logTMin + (i / (samples - 1)) * (logTMax - logTMin);
    tokens.push(Math.pow(10, lt));
  }

  ctx.strokeStyle = palette.primary;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  tokens.forEach((tT, i) => {
    const X = sx(tT);
    const Y = yLoss(bf16Loss(tT));
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  ctx.stroke();

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  tokens.forEach((tT, i) => {
    const X = sx(tT);
    const Y = yLoss(fp8Loss(tT));
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = palette.accentBrown;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  tokens.forEach((tT, i) => {
    const X = sx(tT);
    const Y = yErr(fp8Bias(tT) * 100);
    if (i === 0) ctx.moveTo(X, Y);
    else ctx.lineTo(X, Y);
  });
  ctx.stroke();

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "right";
  for (const t of [3, 5, 7, 9]) {
    ctx.fillText(t.toFixed(0), padL - 6, yLoss(t));
  }
  for (const e of [0, 0.1]) {
    ctx.fillText(`${e.toFixed(2)}%`, padL - 6, yErr(e));
  }
  ctx.fillStyle = palette.secondary;
  ctx.fillText(`0.25%`, padL - 6, yErr(0.25));
  ctx.fillStyle = palette.text;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const xTickPositions = [0.1, 0.5, 1, 5, 10];
  const xTickLabels = ["100B", "500B", "1T", "5T", "10T"];
  xTickPositions.forEach((v, i) => {
    ctx.fillText(xTickLabels[i], sx(v), botY + botH + 6);
  });

  ctx.save();
  ctx.translate(14, topY + topH / 2);
  ctx.rotate(-Math.PI / 2);
  drawLabel(ctx, "training loss", 0, 0, { align: "center" });
  ctx.restore();
  ctx.save();
  ctx.translate(14, botY + botH / 2);
  ctx.rotate(-Math.PI / 2);
  drawLabel(ctx, "FP8 vs BF16", 0, 0, { align: "center" });
  ctx.restore();
  drawLabel(ctx, "tokens trained", padL + w / 2, H - 6, { align: "center" });
  drawLabel(ctx, "stylized validation curve", padL + w - 4, topY + topH - 4, {
    align: "right",
  });

  const legX = padL + w + 10;
  ctx.strokeStyle = palette.primary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(legX, topY + 14);
  ctx.lineTo(legX + 14, topY + 14);
  ctx.stroke();
  drawLabel(ctx, "BF16", legX + 18, topY + 17);

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(legX, topY + 32);
  ctx.lineTo(legX + 14, topY + 32);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel(ctx, "FP8", legX + 18, topY + 35);

  ctx.strokeStyle = palette.accentBrown;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(legX, botY + 14);
  ctx.lineTo(legX + 14, botY + 14);
  ctx.stroke();
  drawLabel(ctx, "rel. err", legX + 18, botY + 17);

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(legX, botY + 32);
  ctx.lineTo(legX + 14, botY + 32);
  ctx.stroke();
  ctx.setLineDash([]);
  drawLabel(ctx, "0.25%", legX + 18, botY + 35, { color: palette.secondary });
}

export const FP8_LOSS_CURVE_W = 540;
export const FP8_LOSS_CURVE_H = 260;
