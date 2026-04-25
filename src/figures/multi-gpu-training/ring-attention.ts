import { palette, font } from "@figures/shared";

export interface RingAttentionData {
  s: number;
  step: number;
}

const C = 8;
const KV_BYTES_PER_TOKEN = 4096;

function formatSeq(s: number): string {
  if (s >= 1024 * 1024) return `${(s / (1024 * 1024)).toFixed(2)}M`;
  if (s >= 1024) return `${Math.round(s / 1024)}k`;
  return `${Math.round(s)}`;
}

function formatBytes(b: number): string {
  if (b >= 1024 * 1024 * 1024)
    return `${(b / 1024 / 1024 / 1024).toFixed(1)} GB`;
  if (b >= 1024 * 1024) return `${(b / 1024 / 1024).toFixed(0)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${Math.round(b)} B`;
}

export function drawRingAttention(
  ctx: CanvasRenderingContext2D,
  data: RingAttentionData,
): void {
  const { s, step } = data;
  const stepIdx = Math.min(C - 1, Math.floor(step * C));
  const seenCount = stepIdx + 1;

  const cx = 200;
  const cy = 150;
  const ringR = 92;
  const boxW = 60;
  const boxH = 60;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("ring of 8 GPUs · KV blocks rotate one slot per step", 32, 28);

  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < C; i++) {
    const a1 = (i / C) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / C) * Math.PI * 2 - Math.PI / 2;
    const arcR = ringR + 22;
    const x1 = cx + Math.cos(a1) * arcR;
    const y1 = cy + Math.sin(a1) * arcR;
    const x2 = cx + Math.cos(a2) * arcR;
    const y2 = cy + Math.sin(a2) * arcR;
    const midA = (a1 + a2) / 2;
    const mx = cx + Math.cos(midA) * (arcR + 6);
    const my = cy + Math.sin(midA) * (arcR + 6);

    const isCurrent = i === ((stepIdx - 1 + C) % C);
    ctx.strokeStyle = isCurrent ? palette.tertiary : palette.strokeMid;
    ctx.lineWidth = isCurrent ? 1.6 : 0.8;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(mx, my, x2, y2);
    ctx.stroke();

    const tipAng = Math.atan2(y2 - my, x2 - mx);
    ctx.fillStyle = isCurrent ? palette.tertiary : palette.strokeMid;
    const headLen = isCurrent ? 6 : 4;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - Math.cos(tipAng) * headLen + Math.sin(tipAng) * (headLen * 0.5),
      y2 - Math.sin(tipAng) * headLen - Math.cos(tipAng) * (headLen * 0.5),
    );
    ctx.lineTo(
      x2 - Math.cos(tipAng) * headLen - Math.sin(tipAng) * (headLen * 0.5),
      y2 - Math.sin(tipAng) * headLen + Math.cos(tipAng) * (headLen * 0.5),
    );
    ctx.closePath();
    ctx.fill();
  }

  for (let i = 0; i < C; i++) {
    const angle = (i / C) * Math.PI * 2 - Math.PI / 2;
    const bx = cx + Math.cos(angle) * ringR - boxW / 2;
    const by = cy + Math.sin(angle) * ringR - boxH / 2;

    ctx.fillStyle = palette.paperDark;
    ctx.fillRect(bx, by, boxW, boxH);
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, boxW, boxH);

    const qH = Math.round(boxH * 0.45);
    ctx.fillStyle = palette.primary;
    ctx.fillRect(bx + 1, by + 1, boxW - 2, qH - 1);
    ctx.fillStyle = palette.paper;
    ctx.font = `bold ${font.sizeLabelSmall}px ${font.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Q${i}`, bx + boxW / 2, by + qH / 2 + 1);

    const kvBlockIdx = ((i - stepIdx) % C + C) % C;
    const kvY = by + qH + 1;
    const kvH = boxH - qH - 2;
    const home = kvBlockIdx === i;
    ctx.fillStyle = home ? palette.tertiary : palette.accentTan;
    ctx.fillRect(bx + 1, kvY, boxW - 2, kvH);

    ctx.fillStyle = home ? palette.paper : palette.text;
    ctx.font = `bold ${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText(`KV${kvBlockIdx}`, bx + boxW / 2, kvY + kvH / 2);
  }

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.fillText("step", cx, cy - 8);
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillStyle = palette.tertiary;
  ctx.fillText(`${stepIdx + 1}/${C}`, cx, cy + 18);

  const panelX = 380;
  let py = 60;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.fillStyle = palette.text;
  ctx.fillText("sequence length", panelX, py);
  py += 16;
  ctx.font = `bold 22px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`${formatSeq(s)} tok`, panelX, py + 6);
  py += 32;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("per-rank tokens", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(`s/c = ${formatSeq(s / C)}`, panelX, py + 4);
  py += 26;

  const localTokens = s / C;
  const kvBytes = localTokens * KV_BYTES_PER_TOKEN;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("local KV cache", panelX, py);
  py += 16;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(`${formatBytes(kvBytes)}`, panelX, py + 4);
  py += 26;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`KV blocks seen ${seenCount} of ${C}`, panelX, py);
  py += 8;
  const barW = 110;
  const barH = 8;
  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(panelX, py, barW, barH);
  ctx.fillStyle = palette.tertiary;
  ctx.fillRect(panelX, py, (barW * seenCount) / C, barH);
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 0.6;
  ctx.strokeRect(panelX, py, barW, barH);
  py += 22;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  if (seenCount === C) {
    ctx.fillStyle = palette.tertiary;
    ctx.fillText("every Q has seen every K,V", panelX, py);
  } else {
    ctx.fillText(`${C - seenCount} more rotation${C - seenCount === 1 ? "" : "s"}`, panelX, py);
  }

  const legendY = 302;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  let lx = 32;
  const items = [
    { color: palette.primary, label: "Q (fixed at home)" },
    { color: palette.tertiary, label: "KV at home rank" },
    { color: palette.accentTan, label: "KV passed in" },
  ];
  for (const it of items) {
    ctx.fillStyle = it.color;
    ctx.fillRect(lx, legendY - 6, 12, 12);
    ctx.fillStyle = palette.text;
    ctx.fillText(it.label, lx + 18, legendY);
    lx += 160;
  }
}

export const RING_ATTN_W = 620;
export const RING_ATTN_H = 320;
