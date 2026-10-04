import { palette } from '../shared';
import { label, line, dot } from './chart';

export interface GrowthState { tasks: number; fraction: number }
export function draw(ctx: CanvasRenderingContext2D, s: GrowthState) {
  const left = 65, right = 370, top = 65, bottom = 200;
  const x = (v: number) => left + (v - 1) / 9 * (right - left);
  const y = (v: number) => bottom - v * (bottom - top);
  label(ctx, 'Same-total-electricity threshold', 18, 25, 17);
  label(ctx, 'Energy / task (baseline = 1)', 18, 51, 16);
  for (const v of [0, 0.5, 1]) {
    line(ctx, left, y(v), right, y(v));
    label(ctx, v.toFixed(1), left - 8, y(v) + 6, 18, 'right');
  }
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  for (let v = 1; v <= 10.001; v += 0.05) ctx.lineTo(x(v), y(1 / v));
  ctx.lineTo(right, bottom);
  ctx.closePath();
  ctx.fillStyle = palette.tertiary;
  ctx.globalAlpha = 0.14;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  for (let v = 1; v <= 10.001; v += 0.05) {
    if (v === 1) ctx.moveTo(x(v), y(1 / v)); else ctx.lineTo(x(v), y(1 / v));
  }
  ctx.strokeStyle = palette.tertiary;
  ctx.lineWidth = 3;
  ctx.stroke();
  dot(ctx, x(s.tasks), y(s.fraction), palette.primary);
  for (const v of [1, 3, 5, 10]) label(ctx, String(v), x(v), 225, 18, 'center');
  label(ctx, 'Task count / baseline task count', 215, 254, 16, 'center');
}
