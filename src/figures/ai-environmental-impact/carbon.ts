import { palette } from '../shared';
import { label, line, dot } from './chart';
import { carbon, number } from './model';

export interface CarbonState { load: number; pue: number; intensity: number }
export function draw(ctx: CanvasRenderingContext2D, s: CarbonState) {
  const left = 80, right = 370, top = 70, bottom = 190;
  const high = carbon(s.load, s.pue, 800).millionTonnes;
  const maximum = Math.ceil(high);
  const x = (v: number) => left + v / 800 * (right - left);
  const y = (v: number) => bottom - v / maximum * (bottom - top);
  label(ctx, 'Electricity inventory', 18, 25, 18);
  label(ctx, 'Million tonnes CO2e / year', 18, 51, 16);
  for (const v of [0, maximum / 2, maximum]) {
    line(ctx, left, y(v), right, y(v));
    label(ctx, number(v), left - 8, y(v) + 6, 18, 'right');
  }
  for (const v of [0, 400, 800]) label(ctx, String(v), x(v), 215, 18, 'center');
  line(ctx, left, bottom, right, y(high), palette.primary, 3);
  dot(ctx, x(s.intensity), y(carbon(s.load, s.pue, s.intensity).millionTonnes));
  label(ctx, 'Chosen grams CO2e / kWh', 215, 243, 17, 'center');
}
