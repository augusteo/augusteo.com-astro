/**
 * Shared palette, typography, and 2D helpers for interactive figures.
 *
 * All figure components and draw functions pull from this module so the look
 * stays consistent with the static SVGs in `unified-vision-stack`.
 */

export const palette = {
  paper: "#F4EEE3",
  paperDark: "#EDE5D4",
  stroke: "#8F8578",
  strokeMid: "#C9BEAA",
  text: "#6B6258",

  primary: "#2563EB",
  secondary: "#B91C1C",
  tertiary: "#059669",

  accentTan: "#D1AE7A",
  accentBrown: "#92400E",
  accentBlueLight: "#93C5FD",
  accentYellow: "#FEF3C7",
} as const;

export const font = {
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  serif:
    'Source Serif 4, "Source Serif Pro", Iowan Old Style, Apple Garamond, Baskerville, Georgia, serif',
  sizeLabel: 11,
  sizeLabelSmall: 10,
  sizeCaption: 12,
} as const;

/** Set up a canvas for HiDPI drawing. Returns the logical (CSS-pixel) size. */
export function setupHiDPI(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
): { ctx: CanvasRenderingContext2D; width: number; height: number } {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return { ctx, width, height };
}

/** Clear the canvas to the paper color. */
export function clear(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string = palette.paper,
): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

/** Draw a small uppercase label in JetBrains Mono. Used for figure callouts. */
export function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  opts: { color?: string; size?: number; align?: CanvasTextAlign; letterSpacing?: number } = {},
): void {
  const { color = palette.text, size = font.sizeLabelSmall, align = "left" } = opts;
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${size}px ${font.mono}`;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x, y);
  ctx.restore();
}

/** Draw an arrow head at (x, y) pointing in the direction of `angle` (radians). */
export function drawArrowhead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number = 6,
  color: string = palette.text,
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size * 0.5);
  ctx.lineTo(-size, size * 0.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/** Draw a thin arrow from (x1, y1) to (x2, y2) with an arrowhead at the end. */
export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  opts: { color?: string; width?: number; headSize?: number } = {},
): void {
  const { color = palette.text, width = 1.5, headSize = 6 } = opts;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - Math.cos(angle) * headSize * 0.6, y2 - Math.sin(angle) * headSize * 0.6);
  ctx.stroke();
  ctx.restore();
  drawArrowhead(ctx, x2, y2, angle, headSize, color);
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamp `x` to [min, max]. */
export function clamp(x: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, x));
}

/** Round a number to a fixed precision. Useful for label text. */
export function fmt(x: number, precision: number = 1): string {
  if (Number.isInteger(x) && precision === 0) return `${x}`;
  return x.toFixed(precision);
}

/** Returns true if the user prefers reduced motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
