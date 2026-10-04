import { palette } from '../shared';
import { label, line, dot } from './chart';
import { campus, number } from './model';

export interface SizeState { mw: number; load: number; wue: number }
export function draw(ctx: CanvasRenderingContext2D, s: SizeState) {
  const left = 65, right = 370, top = 70, bottom = 190;
  const rawMaximum = campus(s.mw, s.load, 3).gallons / 1e9;
  const magnitude = 10 ** Math.floor(Math.log10(rawMaximum));
  const maximum = Math.ceil(rawMaximum / magnitude) * magnitude;
  const x = (v: number) => left + v / 3 * (right - left);
  const y = (v: number) => bottom - v / maximum * (bottom - top);
  label(ctx, 'Site withdrawal scenario', 18, 25, 20);
  label(ctx, 'Billion US gallons / year', 18, 51, 17);
  for (const v of [0, maximum / 2, maximum]) {
    line(ctx, left, y(v), right, y(v));
    label(ctx, number(v, 3), left - 8, y(v) + 6, 17, 'right');
  }
  for (const v of [0, 1, 2, 3]) label(ctx, String(v), x(v), 216, 18, 'center');
  line(ctx, left, bottom, x(3), y(rawMaximum), palette.primary, 3);
  dot(ctx, x(s.wue), y(campus(s.mw, s.load, s.wue).gallons / 1e9));
  label(ctx, 'Liters withdrawn / IT kWh', 215, 243, 17, 'center');
}
