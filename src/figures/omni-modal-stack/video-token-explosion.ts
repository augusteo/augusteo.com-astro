import { palette, font, drawLabel, fmt } from "@figures/shared";

export interface VideoTokenExplosionData {
  duration: number;
  fps: number;
  patches: number;
}

export const VIDEO_TOKEN_EXPLOSION_W = 620;
export const VIDEO_TOKEN_EXPLOSION_H = 250;

const CONTEXT_LIMIT = 262_144;

const BAR_X = 200;
const BAR_MAX_W = 314;
const BAR_H = 32;
const BAR_GAP = 50;
const BASE_Y = 50;

interface BarSpec {
  name: string;
  expr: string;
  factor: number;
}

const BARS: BarSpec[] = [
  { name: "naive (per-frame ViT)", expr: "P × F × t", factor: 1 },
  { name: "+ Conv3D tubelet", expr: "× 0.5 (frame pairs fused)", factor: 0.5 },
  { name: "+ EVS @ q = 0.75", expr: "× 0.25 (top quartile kept)", factor: 0.5 * 0.25 },
];

function fmtTokens(n: number): string {
  if (n >= 1_000_000) return `${fmt(n / 1_000_000, 2)} M`;
  if (n >= 1000) return `${fmt(n / 1000, 0)} K`;
  return `${n}`;
}

export function drawVideoTokenExplosion(
  ctx: CanvasRenderingContext2D,
  data: VideoTokenExplosionData,
): void {
  const naive = data.duration * data.fps * data.patches;
  const refX = BAR_X + BAR_MAX_W;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("vision tokens vs the 262K context window", 14, 22);

  for (let i = 0; i < BARS.length; i++) {
    const bar = BARS[i];
    const count = naive * bar.factor;
    const ratio = count / CONTEXT_LIMIT;
    const barPx = Math.min(ratio, 1) * BAR_MAX_W;
    const overflow = ratio > 1;
    const y = BASE_Y + i * BAR_GAP;

    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabel}px ${font.mono}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(bar.name, 14, y + 14);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText(bar.expr, 14, y + 28);

    ctx.fillStyle = palette.paperDark;
    ctx.fillRect(BAR_X, y, BAR_MAX_W, BAR_H);

    ctx.fillStyle = overflow ? palette.secondary : palette.tertiary;
    ctx.fillRect(BAR_X, y, barPx, BAR_H);

    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1;
    ctx.strokeRect(BAR_X, y, BAR_MAX_W, BAR_H);

    if (overflow) {
      ctx.fillStyle = palette.paper;
      ctx.font = `bold ${font.sizeLabelSmall}px ${font.mono}`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(`↑ ${fmt(ratio, 1)}× over`, BAR_X + BAR_MAX_W - 8, y + BAR_H / 2);
    }

    ctx.fillStyle = overflow ? palette.secondary : palette.text;
    ctx.font = `bold 16px ${font.mono}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(fmtTokens(count), BAR_X + BAR_MAX_W + 14, y + 14);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillText("tokens", BAR_X + BAR_MAX_W + 14, y + 28);
  }

  ctx.strokeStyle = palette.secondary;
  ctx.lineWidth = 1.4;
  ctx.setLineDash([4, 3]);
  const refTop = BASE_Y - 8;
  const refBottom = BASE_Y + (BARS.length - 1) * BAR_GAP + BAR_H + 8;
  ctx.beginPath();
  ctx.moveTo(refX, refTop);
  ctx.lineTo(refX, refBottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = palette.secondary;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("262K", refX, refTop - 4);

  drawLabel(
    ctx,
    `current: ${data.duration} s · ${data.fps} FPS · ${data.patches} patches/frame`,
    14,
    BASE_Y + (BARS.length - 1) * BAR_GAP + BAR_H + 28,
  );
}
