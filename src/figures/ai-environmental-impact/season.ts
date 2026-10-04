import { palette } from '../shared';
import { label, line } from './chart';
import { season, number } from './model';

export interface SeasonState { annual: number; peak: number; headroom: number }
export function draw(ctx: CanvasRenderingContext2D, s: SeasonState) {
  const values = season(s.annual, s.peak, s.headroom);
  const left = 65, right = 370, top = 80, bottom = 205;
  const maximum = Math.ceil(Math.max(values.summer, s.headroom) * 1.15 * 2) / 2;
  const y = (v: number) => bottom - v / maximum * (bottom - top);
  label(ctx, 'Million US gallons / day', 18, 25, 19);
  line(ctx, 18, 51, 38, 51, palette.primary, 3);
  label(ctx, 'Utility demand', 45, 57, 16);
  line(ctx, 225, 51, 245, 51, palette.accentBrown, 2);
  label(ctx, 'Headroom', 252, 57, 16);
  for (const v of [0, maximum / 2, maximum]) {
    line(ctx, left, y(v), right, y(v));
    label(ctx, number(v, 2), left - 8, y(v) + 6, 17, 'right');
  }
  ctx.beginPath();
  ctx.moveTo(left, bottom);
  const block = (right - left) / 12;
  values.monthly.forEach((v, i) => {
    ctx.lineTo(left + i * block, y(v));
    ctx.lineTo(left + (i + 1) * block, y(v));
  });
  ctx.lineTo(right, bottom);
  ctx.closePath();
  ctx.fillStyle = palette.primary;
  ctx.globalAlpha = 0.12;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  values.monthly.forEach((v, i) => {
    if (i === 0) ctx.moveTo(left, y(v)); else ctx.lineTo(left + i * block, y(v));
    ctx.lineTo(left + (i + 1) * block, y(v));
  });
  ctx.strokeStyle = palette.primary;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.setLineDash([6, 4]);
  line(ctx, left, y(s.headroom), right, y(s.headroom), palette.accentBrown, 2);
  ctx.setLineDash([]);
  ['Jan', 'Apr', 'Jul', 'Oct'].forEach((name, i) => label(ctx, name, left + (i * 3 + 0.5) * block, 235, 18, 'center'));
}
