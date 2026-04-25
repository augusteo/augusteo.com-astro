import { palette, font, fmt } from "@figures/shared";

export interface TpSpData {
  seqK: number;
}

const TP = 8;
const HIDDEN = 8192;
const HEADS = 64;
const FFN_MULT = 4;
const BYTES = 2;

const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;

interface Bytes {
  matmul: number;
  elem: number;
  attn: number;
  total: number;
}

function computeBars(seq: number): { tpOnly: Bytes; tpSp: Bytes } {
  const matmul = (BYTES * seq * HIDDEN * (FFN_MULT + 2)) / TP;
  const elemFull = BYTES * seq * HIDDEN * 4;
  const elemShard = elemFull / TP;
  const attn = BYTES * (HEADS / TP) * seq * seq;
  const tpOnly = {
    matmul,
    elem: elemFull,
    attn,
    total: matmul + elemFull + attn,
  };
  const tpSp = {
    matmul,
    elem: elemShard,
    attn,
    total: matmul + elemShard + attn,
  };
  return { tpOnly, tpSp };
}

function fmtSize(bytes: number): string {
  if (bytes >= GB) return `${fmt(bytes / GB, 2)} GB`;
  if (bytes >= MB) return `${fmt(bytes / MB, 0)} MB`;
  return `${fmt(bytes / KB, 0)} KB`;
}

export function drawTpSp(
  ctx: CanvasRenderingContext2D,
  data: TpSpData,
): void {
  const seq = data.seqK * 1024;
  const { tpOnly, tpSp } = computeBars(seq);

  const baseline = 248;
  const maxBarPx = 196;
  const cap = Math.max(tpOnly.total, tpSp.total);

  const colW = 64;
  const colGap = 80;
  const groupX = 92;
  const cols = [
    { x: groupX, label: "TP only", b: tpOnly, faded: false },
    { x: groupX + colW + colGap, label: "TP + SP", b: tpSp, faded: false },
  ];

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(groupX - 24, baseline);
  ctx.lineTo(cols[1].x + colW + 24, baseline);
  ctx.stroke();

  for (const col of cols) {
    const sMatmul = (col.b.matmul / cap) * maxBarPx;
    const sElem = (col.b.elem / cap) * maxBarPx;
    const sAttn = (col.b.attn / cap) * maxBarPx;

    let yTop = baseline;
    ctx.fillStyle = palette.tertiary;
    ctx.fillRect(col.x, yTop - sMatmul, colW, sMatmul);
    yTop -= sMatmul;

    ctx.fillStyle = palette.accentTan;
    ctx.fillRect(col.x, yTop - sElem, colW, sElem);
    yTop -= sElem;

    ctx.fillStyle = palette.primary;
    ctx.fillRect(col.x, yTop - sAttn, colW, sAttn);
    yTop -= sAttn;

    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1;
    const totalPx = sMatmul + sElem + sAttn;
    ctx.strokeRect(col.x, baseline - totalPx, colW, totalPx);

    ctx.fillStyle = palette.text;
    ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(col.label, col.x + colW / 2, baseline + 18);
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText(fmtSize(col.b.total), col.x + colW / 2, baseline + 32);
  }

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText(fmtSize(cap), groupX - 28, baseline - maxBarPx);
  ctx.fillText("0", groupX - 28, baseline);

  const readX = cols[1].x + colW + 60;
  let py = 36;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("per rank, per layer", readX, py);
  py += 22;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText(`70B model • TP=${TP} • BF16`, readX, py);
  py += 18;
  ctx.fillText(`sequence ${data.seqK}k tokens`, readX, py);
  py += 26;

  const saved = tpOnly.total - tpSp.total;
  const savedPct = (saved / tpOnly.total) * 100;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillText("SP saves", readX, py);
  py += 22;
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillStyle = palette.tertiary;
  ctx.fillText(fmtSize(saved), readX, py);
  py += 18;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText(`${fmt(savedPct, 0)}% of TP-only budget`, readX, py);
  py += 26;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  const attnShareSp = (tpSp.attn / tpSp.total) * 100;
  if (attnShareSp > 60) {
    ctx.fillStyle = palette.secondary;
    ctx.fillText(
      `attention is ${fmt(attnShareSp, 0)}% of TP+SP`,
      readX,
      py,
    );
    py += 14;
    ctx.fillText(`SP can't shrink it`, readX, py);
  } else {
    ctx.fillStyle = palette.text;
    ctx.fillText(`attention: ${fmt(attnShareSp, 0)}% of TP+SP`, readX, py);
  }

  const legendX = groupX;
  let ly = baseline + 60;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const items: { color: string; label: string }[] = [
    { color: palette.primary, label: "attention scores  (O(s²))" },
    { color: palette.accentTan, label: "element-wise  (LN, dropout, residual)" },
    { color: palette.tertiary, label: "matmul activations  (sharded by TP)" },
  ];
  for (const it of items) {
    ctx.fillStyle = it.color;
    ctx.fillRect(legendX, ly - 6, 12, 12);
    ctx.fillStyle = palette.text;
    ctx.fillText(it.label, legendX + 18, ly);
    ly += 16;
  }
}

export const TP_SP_W = 580;
export const TP_SP_H = 360;
