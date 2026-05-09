import { palette, font, drawLabel, clamp } from "@figures/shared";

export interface CalibAggData {
  bias: number;       // -0.2 to +0.2 — shifts aggregate band off truth
  variance: number;   // 0.05 to 0.3  — per-estimator std dev
  correlation: number; // 0 to 1       — between-estimator correlation
}

export const CALIB_AGG_W = 580;
export const CALIB_AGG_H = 340;

// -------------------------------------------------------------------
// Deterministic pseudo-random: LCG seeded on a hash of the data state
// -------------------------------------------------------------------

function hashData(data: CalibAggData): number {
  // Map to a small integer for the seed
  const b = Math.round((data.bias + 0.2) * 20);    // 0..8
  const v = Math.round((data.variance - 0.05) * 40); // 0..10
  const c = Math.round(data.correlation * 10);       // 0..10
  return b * 110 + v * 11 + c;
}

function makeLCG(seed: number): () => number {
  let s = (seed + 1) * 1_664_525 + 1_013_904_223;
  return () => {
    s = Math.imul(s, 1_664_525) + 1_013_904_223;
    return ((s >>> 0) / 4_294_967_296);
  };
}

// -------------------------------------------------------------------
// Calibration grid (left region)
// -------------------------------------------------------------------

/**
 * Generate 10 calibration dots at evenly spaced forecast probabilities.
 * Observed frequency = forecast + calibration error.
 *
 * When bias ≠ 0: the center of the scatter shifts (systematic over/under-confidence).
 * When variance is high: scatter in observed freq is larger (noisier history).
 *
 * The dots are deterministic for a given (bias, variance) pair (correlation
 * doesn't affect the calibration grid visually — only the funnel cares about it).
 */
function calibDots(
  data: CalibAggData,
  rng: () => number,
): Array<{ fx: number; oy: number }> {
  const N = 10;
  const dots: Array<{ fx: number; oy: number }> = [];

  for (let i = 0; i < N; i++) {
    // Evenly spaced forecast probabilities from 0.08 to 0.92
    const fx = 0.08 + (i / (N - 1)) * 0.84;

    // Base calibration error: overconfident tails, random scatter
    // High forecast (0.7+): observed freq tends to be lower (overconfidence sag)
    // Low forecast (0.3-): observed freq tends to be higher (overconfidence sag)
    const tailBias = -0.15 * Math.sin(Math.PI * fx);  // sags the ends toward center
    const noise = (rng() - 0.5) * data.variance * 2.2; // noisy scatter
    const oy = clamp(fx + tailBias + data.bias + noise, 0.02, 0.98);

    dots.push({ fx, oy });
  }
  return dots;
}

function drawCalibGrid(
  ctx: CanvasRenderingContext2D,
  data: CalibAggData,
  rng: () => number,
  gx: number,
  gy: number,
  gw: number,
  gh: number,
): void {
  // Panel background
  ctx.fillStyle = "#F0F7FF";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#93C5FD";
  ctx.lineWidth = 1;
  ctx.strokeRect(gx, gy, gw, gh);

  // Panel label
  ctx.save();
  ctx.font = `bold 10px ${font.mono}`;
  ctx.fillStyle = "#1E40AF";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("CALIBRATION GRID", gx + 7, gy + 13);
  ctx.restore();

  // Chart area margins (inside panel)
  const marginL = 38;
  const marginR = 14;
  const marginT = 24;
  const marginB = 32;
  const cx = gx + marginL;
  const cy = gy + marginT;
  const cw = gw - marginL - marginR;
  const ch = gh - marginT - marginB;

  // Helper: map unit [0,1] to pixel coords
  const toX = (f: number) => cx + f * cw;
  const toY = (o: number) => cy + (1 - o) * ch;

  // Grid lines (light)
  ctx.save();
  ctx.strokeStyle = "#DBEAFE";
  ctx.lineWidth = 0.5;
  for (const t of [0.25, 0.5, 0.75]) {
    ctx.beginPath();
    ctx.moveTo(toX(t), cy);
    ctx.lineTo(toX(t), cy + ch);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, toY(t));
    ctx.lineTo(cx + cw, toY(t));
    ctx.stroke();
  }
  ctx.restore();

  // Perfect calibration diagonal
  ctx.save();
  ctx.strokeStyle = "#93C5FD";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(0));
  ctx.lineTo(toX(1), toY(1));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Diagonal label
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = "#93C5FD";
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("perfect calibration", toX(0.92), toY(0.95));
  ctx.restore();

  // Axes
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + ch);
  ctx.lineTo(cx + cw, cy + ch);
  ctx.stroke();

  // Axis ticks + labels
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    // X ticks
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(t.toFixed(2), toX(t), cy + ch + 4);
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(toX(t), cy + ch);
    ctx.lineTo(toX(t), cy + ch + 3);
    ctx.stroke();

    // Y ticks
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(t.toFixed(2), cx - 4, toY(t));
    ctx.beginPath();
    ctx.moveTo(cx, toY(t));
    ctx.lineTo(cx - 3, toY(t));
    ctx.stroke();
  }
  ctx.restore();

  // Axis labels
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("forecast probability", cx + cw / 2, gy + gh - 4);

  ctx.save();
  ctx.translate(gx + 9, cy + ch / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("observed freq", 0, 0);
  ctx.restore();

  ctx.restore();

  // Dots
  const dots = calibDots(data, rng);
  for (const { fx, oy } of dots) {
    // Dot fill: above diagonal = overconfident (orange), below = underconfident (green)
    const isOver = oy < fx;
    ctx.beginPath();
    ctx.arc(toX(fx), toY(oy), 4, 0, Math.PI * 2);
    ctx.fillStyle = isOver ? "#F59E0B" : "#059669";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Dot legend
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const legY = gy + gh - 10;
  // orange dot
  ctx.beginPath();
  ctx.arc(gx + gw - 90, legY, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#F59E0B";
  ctx.fill();
  ctx.fillStyle = palette.text;
  ctx.fillText("over-confident", gx + gw - 84, legY);
  ctx.restore();
}

// -------------------------------------------------------------------
// Aggregation funnel (right region)
// -------------------------------------------------------------------

/**
 * The aggregation band shows the 80% credible interval for the mean of
 * n=10 correlated estimators.
 *
 * Band center: truth + bias
 *
 * Band half-width (std error of mean of n correlated draws):
 *   SE = σ · sqrt((1 + (n−1)·ρ) / n)
 * where σ = variance, ρ = correlation, n = 10.
 *
 * We display the ±1.28·SE band (roughly 80%).
 *
 * The per-estimator spread is ±1.28·σ (shown as thin translucent cloud).
 */
function bandParams(data: CalibAggData, n = 10): { center: number; se: number; sigmaInd: number } {
  const { bias, variance: sigma, correlation: rho } = data;
  const center = bias; // relative to truth (truth = 0 in the plot)
  const seVar = sigma * sigma * (1 + (n - 1) * rho) / n;
  const se = Math.sqrt(seVar);
  return { center, se, sigmaInd: sigma };
}

function drawAggFunnel(
  ctx: CanvasRenderingContext2D,
  data: CalibAggData,
  rng: () => number,
  gx: number,
  gy: number,
  gw: number,
  gh: number,
): void {
  // Panel background
  ctx.fillStyle = "#F0FFF4";
  ctx.fillRect(gx, gy, gw, gh);
  ctx.strokeStyle = "#6EE7B7";
  ctx.lineWidth = 1;
  ctx.strokeRect(gx, gy, gw, gh);

  // Panel label
  ctx.save();
  ctx.font = `bold 10px ${font.mono}`;
  ctx.fillStyle = "#065F46";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("AGGREGATION FUNNEL", gx + 7, gy + 13);
  ctx.restore();

  // Chart area
  const marginL = 42;
  const marginR = 14;
  const marginT = 24;
  const marginB = 32;
  const cx = gx + marginL;
  const cy = gy + marginT;
  const cw = gw - marginL - marginR;
  const ch = gh - marginT - marginB;

  // Y-axis represents the estimate value relative to truth.
  // Range: -0.5 to +0.5 (centered around truth=0)
  const YMIN = -0.5;
  const YMAX = 0.5;
  const toY = (v: number) => cy + (1 - (v - YMIN) / (YMAX - YMIN)) * ch;
  const centerX = cx + cw / 2;

  // Grid lines
  ctx.save();
  ctx.strokeStyle = "#D1FAE5";
  ctx.lineWidth = 0.5;
  for (const v of [-0.25, 0, 0.25]) {
    ctx.beginPath();
    ctx.moveTo(cx, toY(v));
    ctx.lineTo(cx + cw, toY(v));
    ctx.stroke();
  }
  ctx.restore();

  // Truth line at 0
  ctx.save();
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(cx, toY(0));
  ctx.lineTo(cx + cw, toY(0));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#059669";
  ctx.font = `9px ${font.mono}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("truth", cx - 4, toY(0));
  ctx.restore();

  // Axes
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + ch);
  ctx.lineTo(cx + cw, cy + ch);
  ctx.stroke();

  // Y-axis ticks
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  for (const v of [YMIN, -0.25, 0, 0.25, YMAX]) {
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const label = v === 0 ? "0.0" : v.toFixed(2);
    ctx.fillText(label, cx - 4, toY(v));
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(cx, toY(v));
    ctx.lineTo(cx - 3, toY(v));
    ctx.stroke();
  }
  ctx.restore();

  // Axis label
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.save();
  ctx.translate(gx + 9, cy + ch / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("estimate value", 0, 0);
  ctx.restore();
  ctx.restore();

  const { center, se, sigmaInd } = bandParams(data);
  const Z80 = 1.282; // z-score for 80% interval

  // --- Per-estimator cloud (individual dots, thin scatter) ---
  const N_DOTS = 10;
  const dotX = centerX;
  for (let i = 0; i < N_DOTS; i++) {
    // Box-Muller for normal-ish distribution
    const u1 = rng();
    const u2 = rng();
    const z = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-9))) * Math.cos(2 * Math.PI * u2);
    const val = center + z * sigmaInd;
    // Jitter x slightly per dot so they don't stack
    const jitter = (rng() - 0.5) * cw * 0.3;
    const dotScreenY = toY(clamp(val, YMIN, YMAX));
    ctx.beginPath();
    ctx.arc(dotX + jitter, dotScreenY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
    ctx.fill();
    ctx.strokeStyle = "rgba(6, 95, 70, 0.25)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // --- Aggregate band ---
  const bandHalfH = Z80 * se;
  const bandTop = toY(center + bandHalfH);
  const bandBot = toY(center - bandHalfH);
  const bandH = bandBot - bandTop;

  // Band fill with gradient
  const grad = ctx.createLinearGradient(centerX - cw * 0.18, 0, centerX + cw * 0.18, 0);
  grad.addColorStop(0, "rgba(16, 185, 129, 0)");
  grad.addColorStop(0.4, "rgba(16, 185, 129, 0.45)");
  grad.addColorStop(0.6, "rgba(16, 185, 129, 0.45)");
  grad.addColorStop(1, "rgba(16, 185, 129, 0)");

  ctx.save();
  ctx.fillStyle = grad;
  ctx.fillRect(centerX - cw * 0.18, bandTop, cw * 0.36, Math.max(bandH, 2));
  ctx.restore();

  // Band border lines
  ctx.save();
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 1.5;
  // Top edge
  ctx.beginPath();
  ctx.moveTo(centerX - cw * 0.18, bandTop);
  ctx.lineTo(centerX + cw * 0.18, bandTop);
  ctx.stroke();
  // Bottom edge
  ctx.beginPath();
  ctx.moveTo(centerX - cw * 0.18, bandBot);
  ctx.lineTo(centerX + cw * 0.18, bandBot);
  ctx.stroke();
  ctx.restore();

  // Center line (mean of aggregate)
  ctx.save();
  ctx.strokeStyle = "#047857";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - cw * 0.18, toY(center));
  ctx.lineTo(centerX + cw * 0.18, toY(center));
  ctx.stroke();
  ctx.restore();

  // Band width annotation (with arrows)
  const annotX = centerX + cw * 0.22;
  if (bandH > 10) {
    ctx.save();
    ctx.strokeStyle = "#059669";
    ctx.lineWidth = 1;
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(annotX, bandTop);
    ctx.lineTo(annotX, bandBot);
    ctx.stroke();
    // Tick caps
    ctx.beginPath();
    ctx.moveTo(annotX - 4, bandTop);
    ctx.lineTo(annotX + 4, bandTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(annotX - 4, bandBot);
    ctx.lineTo(annotX + 4, bandBot);
    ctx.stroke();
    // Label
    ctx.font = `9px ${font.mono}`;
    ctx.fillStyle = "#059669";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(`±${(Z80 * se).toFixed(3)}`, annotX + 6, (bandTop + bandBot) / 2);
    ctx.restore();
  }

  // X-axis label (single column label)
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("aggregate (n=10)", centerX, gy + gh - 4);
  ctx.restore();

  // Correlation annotation at bottom right
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  const seRatio = se / data.variance;
  ctx.fillText(
    `SE/σ = ${seRatio.toFixed(2)}  (ideal: ${(1 / Math.sqrt(10)).toFixed(2)})`,
    gx + gw - 6,
    gy + gh - 4,
  );
  ctx.restore();
}

// -------------------------------------------------------------------
// Main draw export
// -------------------------------------------------------------------

export function drawCalibAgg(
  ctx: CanvasRenderingContext2D,
  data: CalibAggData,
): void {
  const W = CALIB_AGG_W;
  const H = CALIB_AGG_H;

  const seed = hashData(data);
  const rng = makeLCG(seed);

  const margin = 14;
  const gap = 12;
  const halfW = Math.floor((W - margin * 2 - gap) / 2);
  const panelH = H - margin * 2 - 22; // leave room for bottom label

  const leftX = margin;
  const rightX = margin + halfW + gap;
  const panelY = margin;

  // Draw two regions
  drawCalibGrid(ctx, data, rng, leftX, panelY, halfW, panelH);
  drawAggFunnel(ctx, data, rng, rightX, panelY, halfW, panelH);

  // Bottom label
  ctx.save();
  ctx.font = `10px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    "one mind is noisy; scored records and independent estimates reduce different errors",
    W / 2,
    H - 5,
  );
  ctx.restore();
}
