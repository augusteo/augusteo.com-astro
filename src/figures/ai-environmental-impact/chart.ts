import { palette, font } from '../shared';

export function label(ctx: CanvasRenderingContext2D, text: string, x: number,
  y: number, size = 18, align: CanvasTextAlign = 'left', color = '#1A1A1A') {
  ctx.font = `${Math.max(size, 20)}px ${font.mono}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

export function line(ctx: CanvasRenderingContext2D, x1: number, y1: number,
  x2: number, y2: number, color: string = palette.strokeMid, width = 1) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function dot(ctx: CanvasRenderingContext2D, x: number, y: number,
  color: string = palette.primary) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, 6, 0, 2 * Math.PI);
  ctx.fill();
}
