import { palette, font, clamp } from "@figures/shared";

export interface ConcentricLoopsData {
  t: number; // [0, 1]
}

// -------------------------------------------------------------------
// Ring definitions
// -------------------------------------------------------------------

interface Ring {
  label: string;
  sublabel: string;
  radius: number;
  color: string;
  colorDim: string;
  observation: string;
}

const RINGS: Ring[] = [
  {
    label: "Darwin, 1876",
    sublabel: "inner",
    radius: 80,
    color: "#2563EB",
    colorDim: "#BFDBFE",
    observation: "fossil record contradicts simple gradualism",
  },
  {
    label: "takeoff log, 2026",
    sublabel: "middle",
    radius: 150,
    color: "#C2410C",
    colorDim: "#FED7AA",
    observation: "package #112 saved 22%, not the 40% claim",
  },
  {
    label: "literature record, 2025",
    sublabel: "outer",
    radius: 220,
    color: "#6B6258",
    colorDim: "#D6CDB6",
    observation: "training/teaming effects shrank under stricter controls",
  },
];

// Four-step backbone labels placed at approximate cardinal angles
// 0 = top (12 o'clock), clockwise
const STEPS = [
  { label: "notice", angle: -Math.PI / 2 },           // top
  { label: "judge threat", angle: 0 },                 // right
  { label: "write same day", angle: Math.PI / 2 },     // bottom
  { label: "review later", angle: Math.PI },            // left
];

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function activeRingIndex(t: number): number {
  if (t < 0.33) return 0;
  if (t < 0.66) return 1;
  return 2;
}

/** Local "micro-t" within each ring's zone [0..1]. */
function microT(t: number): number {
  if (t < 0.33) return t / 0.33;
  if (t < 0.66) return (t - 0.33) / 0.33;
  return (t - 0.66) / 0.34;
}

// -------------------------------------------------------------------
// Draw step labels around a ring
// -------------------------------------------------------------------

function drawStepLabels(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  active: boolean,
): void {
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.textBaseline = "middle";
  const alpha = active ? 1.0 : 0.45;
  ctx.globalAlpha = alpha;

  for (const step of STEPS) {
    const labelR = radius + 18;
    const lx = cx + Math.cos(step.angle) * labelR;
    const ly = cy + Math.sin(step.angle) * labelR;

    // Tiny tick on the ring
    const tickInner = cx + Math.cos(step.angle) * (radius - 5);
    const tickOuter = cx + Math.cos(step.angle) * (radius + 5);
    const tickInnerY = cy + Math.sin(step.angle) * (radius - 5);
    const tickOuterY = cy + Math.sin(step.angle) * (radius + 5);
    ctx.strokeStyle = color;
    ctx.lineWidth = active ? 1.5 : 1;
    ctx.beginPath();
    ctx.moveTo(tickInner, tickInnerY);
    ctx.lineTo(tickOuter, tickOuterY);
    ctx.stroke();

    // Step text
    ctx.fillStyle = active ? color : palette.text;
    ctx.textAlign = "center";
    ctx.fillText(step.label, lx, ly);
  }
  ctx.globalAlpha = 1.0;
  ctx.restore();
}

// -------------------------------------------------------------------
// Draw a single ring
// -------------------------------------------------------------------

function drawRing(
  ctx: CanvasRenderingContext2D,
  ring: Ring,
  cx: number,
  cy: number,
  isActiveRing: boolean,
): void {
  const color = isActiveRing ? ring.color : ring.colorDim;
  const lineWidth = isActiveRing ? 2.5 : 1.2;

  // Ring circle
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = isActiveRing ? 1.0 : 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // Ring label (title above, at top of ring)
  const labelX = cx;
  const labelY = cy - ring.radius - 28;
  ctx.save();
  ctx.font = `bold 10px ${font.mono}`;
  ctx.fillStyle = isActiveRing ? ring.color : palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.globalAlpha = isActiveRing ? 1.0 : 0.4;
  ctx.fillText(ring.label, labelX, labelY);
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // Step labels
  drawStepLabels(ctx, cx, cy, ring.radius, color, isActiveRing);
}

// -------------------------------------------------------------------
// Draw the "observation dot" that travels around the active ring
// -------------------------------------------------------------------

function drawObservationDot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  mt: number, // micro-t in [0, 1] — how far around the ring this observation is
): void {
  // The dot travels clockwise starting from the "notice" point (top)
  const startAngle = -Math.PI / 2; // notice = top
  const angle = startAngle + mt * Math.PI * 2;
  const dx = cx + Math.cos(angle) * radius;
  const dy = cy + Math.sin(angle) * radius;

  // Glow
  ctx.save();
  ctx.beginPath();
  ctx.arc(dx, dy, 9, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.15;
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Dot
  ctx.beginPath();
  ctx.arc(dx, dy, 5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = palette.paper;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

// -------------------------------------------------------------------
// Draw the observation label box below the canvas center
// -------------------------------------------------------------------

function drawObservationLabel(
  ctx: CanvasRenderingContext2D,
  ring: Ring,
  cx: number,
  labelY: number,
  isActiveRing: boolean,
): void {
  if (!isActiveRing) return;

  const boxW = 320;
  const boxH = 30;
  const bx = cx - boxW / 2;
  const by = labelY;

  // Box
  ctx.save();
  ctx.fillStyle = palette.paperDark;
  ctx.strokeStyle = ring.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(bx, by, boxW, boxH, 4);
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.font = `10px ${font.mono}`;
  ctx.fillStyle = ring.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ring.observation, cx, by + boxH / 2);
  ctx.restore();
}

// -------------------------------------------------------------------
// Main draw export
// -------------------------------------------------------------------

export function drawConcentricLoops(
  ctx: CanvasRenderingContext2D,
  data: ConcentricLoopsData,
): void {
  const W = CONCENTRIC_LOOPS_W;
  const H = CONCENTRIC_LOOPS_H;

  const t = clamp(data.t, 0, 1);
  const activeIdx = activeRingIndex(t);
  const mt = microT(t);

  // Center slightly above midpoint to leave room for labels/observation box
  const cx = W / 2;
  const cy = H / 2 - 10;

  // Draw rings from outermost to innermost (so inner appears on top)
  for (let i = RINGS.length - 1; i >= 0; i--) {
    const ring = RINGS[i];
    const isActiveRing = i === activeIdx;
    drawRing(ctx, ring, cx, cy, isActiveRing);
  }

  // Draw the moving observation dot on the active ring
  const activeRing = RINGS[activeIdx];
  drawObservationDot(ctx, cx, cy, activeRing.radius, activeRing.color, mt);

  // Observation label box below the rings
  const labelY = cy + RINGS[2].radius + 18;
  for (let i = 0; i < RINGS.length; i++) {
    drawObservationLabel(ctx, RINGS[i], cx, labelY, i === activeIdx);
  }

  // Scale legend at top-left
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("scale →", 14, H - 12);

  // Tiny color swatches
  const swatchY = H - 22;
  const swatchX = 14;
  for (let i = 0; i < RINGS.length; i++) {
    const r = RINGS[i];
    const isActive = i === activeIdx;
    const sx = swatchX + i * 110;
    ctx.fillStyle = isActive ? r.color : r.colorDim;
    ctx.globalAlpha = isActive ? 1.0 : 0.5;
    ctx.beginPath();
    ctx.arc(sx + 5, swatchY + 5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.font = isActive ? `bold 9px ${font.mono}` : `9px ${font.mono}`;
    ctx.fillStyle = isActive ? r.color : palette.text;
    ctx.fillText(r.sublabel, sx + 12, swatchY + 9);
  }
  ctx.restore();
}

export const CONCENTRIC_LOOPS_W = 560;
export const CONCENTRIC_LOOPS_H = 520;
