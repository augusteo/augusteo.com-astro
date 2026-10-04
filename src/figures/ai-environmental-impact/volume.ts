import { palette } from '../shared';
import { label, line, dot } from './chart';
import { volume, number } from './model';

export interface VolumeState { people: number; daily: number }
export function draw(ctx: CanvasRenderingContext2D, s: VolumeState) {
  const left = 80, right = 370, top = 55, bottom = 185;
  const maximum = Math.ceil(volume(s.people, 50).householdYears / 50) * 50;
  const x = (v: number) => left + (v - 50) / 100 * (right - left);
  const y = (v: number) => bottom - v / maximum * (bottom - top);
  label(ctx, 'Household-years of water', 18, 25, 17);
  for (const v of [0, maximum / 2, maximum]) {
    line(ctx, left, y(v), right, y(v));
    label(ctx, number(v, 0), left - 8, y(v) + 6, 17, 'right');
  }
  for (const v of [50, 100, 150]) {
    label(ctx, String(v), x(v), bottom + 25, 18, 'center');
  }
  ctx.beginPath();
  for (let v = 50; v <= 150; v++) {
    const py = y(volume(s.people, v).householdYears);
    if (v === 50) ctx.moveTo(x(v), py); else ctx.lineTo(x(v), py);
  }
  ctx.strokeStyle = palette.primary;
  ctx.lineWidth = 3;
  ctx.stroke();
  dot(ctx, x(s.daily), y(volume(s.people, s.daily).householdYears));
  label(ctx, 'Gallons / person / day at home', 215, 239, 17, 'center');
}
