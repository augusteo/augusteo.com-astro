import { palette, font, drawLabel, fmt, lerp } from "@figures/shared";

export interface EvsPatchPruningData {
  q: number;
}

export const EVS_PATCH_PRUNING_W = 580;
export const EVS_PATCH_PRUNING_H = 320;

const GRID = 16;
const PATCH_PX = 12;
const FRAME_PX = GRID * PATCH_PX;

const FRAME_X_LEFT = 56;
const FRAME_GAP = 60;
const FRAME_X_RIGHT = FRAME_X_LEFT + FRAME_PX + FRAME_GAP;
const FRAME_Y = 48;

const TOTAL_PATCHES = GRID * GRID;

type RGB = [number, number, number];

function frameNoise(i: number, j: number, f: 0 | 1): number {
  const key = Math.sin(i * 12.9898 + j * 78.233 + f * 53.117) * 43758.5453;
  return (key - Math.floor(key) - 0.5) * 2.4;
}

function bgColor(i: number, j: number, f: 0 | 1): RGB {
  const r = 232 - i * 1.6 + Math.sin(i * 0.7 + j * 0.4) * 4 + frameNoise(i, j, f);
  const g = 222 - j * 0.9 + Math.cos(i * 0.5 + j * 0.3) * 3 + frameNoise(i, j, f) * 0.7;
  const b = 204 - i * 0.4 + Math.sin(i * 0.3 - j * 0.6) * 3 + frameNoise(i, j, f) * 0.5;
  return [r, g, b];
}

function discAlpha(i: number, j: number, cx: number, cy: number, r: number): number {
  const dx = i + 0.5 - cx;
  const dy = j + 0.5 - cy;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < r) return 1;
  if (d < r + 1.1) return 1 - (d - r) / 1.1;
  return 0;
}

const DISC_T0 = { cx: 5.5, cy: 8.2, r: 2.4 };
const DISC_T1 = { cx: 9.6, cy: 8.6, r: 2.4 };
const DISC_RGB: RGB = [185, 90, 25];

function frameColor(i: number, j: number, frame: 0 | 1): RGB {
  const bg = bgColor(i, j, frame);
  const disc = frame === 0 ? DISC_T0 : DISC_T1;
  const a = discAlpha(i, j, disc.cx, disc.cy, disc.r);
  if (a === 0) return bg;
  return [
    lerp(bg[0], DISC_RGB[0], a),
    lerp(bg[1], DISC_RGB[1], a),
    lerp(bg[2], DISC_RGB[2], a),
  ];
}

function patchDiff(i: number, j: number): number {
  const a = frameColor(i, j, 0);
  const b = frameColor(i, j, 1);
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

function rgbCss([r, g, b]: RGB): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function dim([r, g, b]: RGB): RGB {
  return [lerp(r, 244, 0.85), lerp(g, 238, 0.85), lerp(b, 227, 0.85)];
}

export function drawEvsPatchPruning(
  ctx: CanvasRenderingContext2D,
  data: EvsPatchPruningData,
): void {
  const q = data.q;

  const allDiffs: number[] = [];
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      allDiffs.push(patchDiff(i, j));
    }
  }
  const sorted = [...allDiffs].sort((a, b) => a - b);
  const cutoffIdx = Math.min(sorted.length - 1, Math.floor(q * sorted.length));
  const threshold = sorted[cutoffIdx];

  let kept = 0;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("frame t−1", FRAME_X_LEFT + FRAME_PX / 2, FRAME_Y - 14);
  ctx.fillText("frame t", FRAME_X_RIGHT + FRAME_PX / 2, FRAME_Y - 14);

  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const c = frameColor(i, j, 0);
      ctx.fillStyle = rgbCss(c);
      ctx.fillRect(
        FRAME_X_LEFT + i * PATCH_PX,
        FRAME_Y + j * PATCH_PX,
        PATCH_PX,
        PATCH_PX,
      );
    }
  }
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(FRAME_X_LEFT, FRAME_Y, FRAME_PX, FRAME_PX);

  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const isKept = patchDiff(i, j) >= threshold;
      const base = frameColor(i, j, 1);
      const drawn = isKept ? base : dim(base);
      ctx.fillStyle = rgbCss(drawn);
      ctx.fillRect(
        FRAME_X_RIGHT + i * PATCH_PX,
        FRAME_Y + j * PATCH_PX,
        PATCH_PX,
        PATCH_PX,
      );
      if (!isKept) {
        ctx.fillStyle = palette.strokeMid;
        ctx.beginPath();
        ctx.arc(
          FRAME_X_RIGHT + i * PATCH_PX + PATCH_PX / 2,
          FRAME_Y + j * PATCH_PX + PATCH_PX / 2,
          1.1,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      } else {
        kept++;
      }
    }
  }
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(FRAME_X_RIGHT, FRAME_Y, FRAME_PX, FRAME_PX);

  const tagY = FRAME_Y + FRAME_PX + 22;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "center";
  ctx.fillStyle = palette.tertiary;
  ctx.fillText("always kept", FRAME_X_LEFT + FRAME_PX / 2, tagY);
  ctx.fillStyle = q > 0 ? palette.secondary : palette.tertiary;
  const droppedFrac = q > 0 ? `${Math.round(q * 100)}% pruned` : "all kept";
  ctx.fillText(droppedFrac, FRAME_X_RIGHT + FRAME_PX / 2, tagY);

  const counterY1 = tagY + 26;
  const counterY2 = counterY1 + 18;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.fillText(
    `kept ${kept} of ${TOTAL_PATCHES} patches in frame t`,
    EVS_PATCH_PRUNING_W / 2,
    counterY1,
  );
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(
    `frame-t prefill tokens × (1 − q) = ${fmt((1 - q) * 100, 0)}% of baseline`,
    EVS_PATCH_PRUNING_W / 2,
    counterY2,
  );

  drawLabel(
    ctx,
    "RGB-space intuition; production EVS runs on encoded features",
    EVS_PATCH_PRUNING_W / 2,
    counterY2 + 22,
    { align: "center" },
  );
}
