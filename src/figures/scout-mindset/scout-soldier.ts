import { palette, font, drawLabel, clamp } from "@figures/shared";

export type EvidenceStream = "preferred" | "dispreferred";

export interface ScoutSoldierData {
  stream: EvidenceStream;
}

// -------------------------------------------------------------------
// Evidence events: label, base weight for preferred / dispreferred
// Each event has a "weight": positive = supporting the 40% claim,
// negative = threatening it. magnitudes are symmetric in base form;
// stream bias changes the mix (which events appear more, which less).
// -------------------------------------------------------------------

interface EvidenceEvent {
  label: string;
  // weight > 0: supports the claim; weight < 0: threatens it
  weight: number;
}

const EVENTS_BASE: EvidenceEvent[] = [
  { label: "missed walls", weight: -0.14 },
  { label: "false positives", weight: -0.12 },
  { label: "40% faster pkg", weight: +0.18 },
  { label: "slow estimator", weight: -0.10 },
  { label: "pilot under-delivered", weight: -0.16 },
  { label: "competitor matched", weight: -0.08 },
];

// "preferred" stream: replace two threatening events with supportive ones
const EVENTS_PREFERRED: EvidenceEvent[] = [
  { label: "clean pilot data", weight: +0.15 },
  { label: "estimator trained", weight: +0.12 },
  { label: "40% faster pkg", weight: +0.18 },
  { label: "second win", weight: +0.14 },
  { label: "pilot under-delivered", weight: -0.08 },
  { label: "competitor matched", weight: -0.06 },
];

// "dispreferred" stream: all events are threatening
const EVENTS_DISPREFERRED: EvidenceEvent[] = [
  { label: "missed walls", weight: -0.14 },
  { label: "false positives", weight: -0.12 },
  { label: "bad pilot data", weight: -0.16 },
  { label: "slow estimator", weight: -0.10 },
  { label: "pilot under-delivered", weight: -0.16 },
  { label: "competitor matched", weight: -0.12 },
];

function getEvents(stream: EvidenceStream): EvidenceEvent[] {
  if (stream === "preferred") return EVENTS_PREFERRED;
  if (stream === "dispreferred") return EVENTS_DISPREFERRED;
  return EVENTS_BASE;
}

// -------------------------------------------------------------------
// Credence update rules
// -------------------------------------------------------------------

const PRIOR = 0.62; // starting belief in the 40% claim

/** Scout: updates symmetrically by evidential weight */
function scoutTrace(events: EvidenceEvent[]): number[] {
  const trace: number[] = [PRIOR];
  let c = PRIOR;
  for (const ev of events) {
    c = clamp(c + ev.weight, 0.05, 0.97);
    trace.push(c);
  }
  return trace;
}

/**
 * Soldier: updates asymmetrically — small jumps for supporting (preferred)
 * evidence, very small / near-zero jumps for threatening evidence.
 * This models the soldier protecting the prior against attack.
 */
function soldierTrace(events: EvidenceEvent[]): number[] {
  const trace: number[] = [PRIOR];
  let c = PRIOR;
  for (const ev of events) {
    let delta: number;
    if (ev.weight > 0) {
      // supporting: soldier takes ~60% of the full update
      delta = ev.weight * 0.6;
    } else {
      // threatening: soldier takes only ~10% of the full update (explains away)
      delta = ev.weight * 0.10;
    }
    c = clamp(c + delta, 0.05, 0.97);
    trace.push(c);
  }
  return trace;
}

// -------------------------------------------------------------------
// Draw helpers
// -------------------------------------------------------------------

const GATE_COLORS = {
  soldier: ["#7C3AED", "#9333EA", "#A855F7"] as const, // violet series
  scout: ["#059669", "#0D9488", "#0891B2"] as const,   // teal series
};

function drawPanel(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pw: number,
  ph: number,
  events: EvidenceEvent[],
  trace: number[],
  mode: "soldier" | "scout",
  gateLabels: string[],
  lineColor: string,
  labelColor: string,
): void {
  const n = events.length;
  const chartX = px + 14;
  const chartW = pw - 28;
  const chartY = py + 34;
  const chartH = ph - 50;

  // Panel background
  ctx.fillStyle = mode === "soldier" ? "#F9F5FF" : "#F0FFF4";
  ctx.fillRect(px, py, pw, ph);
  ctx.strokeStyle = mode === "soldier" ? "#C4B5FD" : "#6EE7B7";
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py, pw, ph);

  // Mode label
  ctx.save();
  ctx.font = `bold 11px ${font.mono}`;
  ctx.fillStyle = labelColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(mode === "soldier" ? "SOLDIER MODE" : "SCOUT MODE", px + 8, py + 13);
  ctx.restore();

  // Gate labels (inline, right-aligned in the panel header area)
  const gateColors = mode === "soldier" ? GATE_COLORS.soldier : GATE_COLORS.scout;
  const gateStartX = px + pw - 8;
  const gateY = py + 13;

  ctx.save();
  ctx.font = `10px ${font.mono}`;
  ctx.textBaseline = "alphabetic";
  let gx = gateStartX;
  for (let i = gateLabels.length - 1; i >= 0; i--) {
    ctx.fillStyle = gateColors[i % gateColors.length];
    ctx.textAlign = "right";
    const w = ctx.measureText(gateLabels[i]).width;
    ctx.fillText(gateLabels[i], gx, gateY);
    // separator
    if (i > 0) {
      gx -= w + 4;
      ctx.fillStyle = palette.strokeMid;
      ctx.fillText("→", gx, gateY);
      gx -= ctx.measureText("→").width + 4;
    }
  }
  ctx.restore();

  // Y-axis ticks
  const yTicks = [0.0, 0.25, 0.5, 0.75, 1.0];
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const t of yTicks) {
    const ty = chartY + chartH - t * chartH;
    ctx.fillText(t.toFixed(2), chartX - 4, ty);
    ctx.strokeStyle = palette.strokeMid;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(chartX, ty);
    ctx.lineTo(chartX + chartW, ty);
    ctx.stroke();
  }
  ctx.restore();

  // X-axis event labels
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let i = 0; i < n; i++) {
    const ex = chartX + ((i + 1) / n) * chartW;
    ctx.fillText(events[i].label, ex, chartY + chartH + 4);
  }
  ctx.restore();

  // X-axis line
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(chartX, chartY + chartH);
  ctx.lineTo(chartX + chartW, chartY + chartH);
  ctx.stroke();

  // Credence trace — plot trace[0..n] points; trace[i] is after event i-1
  // trace[0] = prior (before any events), trace[i] = after event i
  // x positions: trace[0] at chartX, trace[i] at chartX + (i/n)*chartW
  const toX = (i: number) => chartX + (i / n) * chartW;
  const toY = (c: number) => chartY + chartH - c * chartH;

  // Reference line at PRIOR
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.8;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(chartX, toY(PRIOR));
  ctx.lineTo(chartX + chartW, toY(PRIOR));
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw the credence line
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(trace[0]));
  for (let i = 1; i <= n; i++) {
    ctx.lineTo(toX(i), toY(trace[i]));
  }
  ctx.stroke();

  // Draw dots at each event point
  ctx.fillStyle = lineColor;
  for (let i = 0; i <= n; i++) {
    ctx.beginPath();
    ctx.arc(toX(i), toY(trace[i]), 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Final credence label
  const finalC = trace[n];
  ctx.save();
  ctx.font = `bold 10px ${font.mono}`;
  ctx.fillStyle = lineColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`${(finalC * 100).toFixed(0)}%`, toX(n) + 4, toY(finalC));
  ctx.restore();
}

// -------------------------------------------------------------------
// Input strip at top
// -------------------------------------------------------------------

function drawInputStrip(
  ctx: CanvasRenderingContext2D,
  events: EvidenceEvent[],
  sx: number,
  sy: number,
  sw: number,
  sh: number,
): void {
  // Background
  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(sx, sy, sw, sh);
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 1;
  ctx.strokeRect(sx, sy, sw, sh);

  // Label
  ctx.save();
  ctx.font = `bold 10px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("EVIDENCE STREAM", sx + 6, sy + 13);
  ctx.restore();

  // Event pills
  const n = events.length;
  const pillW = Math.floor((sw - 12) / n) - 4;
  const pillH = sh - 26;
  const pillY = sy + 18;

  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    const ev = events[i];
    const pillX = sx + 6 + i * (pillW + 4);
    const isSupporting = ev.weight > 0;

    ctx.fillStyle = isSupporting ? "#D1FAE5" : "#FEE2E2";
    ctx.strokeStyle = isSupporting ? "#6EE7B7" : "#FCA5A5";
    ctx.lineWidth = 1;
    ctx.fillRect(pillX, pillY, pillW, pillH);
    ctx.strokeRect(pillX, pillY, pillW, pillH);

    ctx.fillStyle = isSupporting ? "#065F46" : "#991B1B";
    ctx.textAlign = "center";

    // Wrap long labels
    const cx = pillX + pillW / 2;
    const cy = pillY + pillH / 2;
    const words = ev.label.split(" ");
    if (words.length <= 1) {
      ctx.fillText(ev.label, cx, cy);
    } else {
      // Two lines
      const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
      const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
      ctx.fillText(line1, cx, cy - 5);
      ctx.fillText(line2, cx, cy + 5);
    }
  }
  ctx.restore();
}

// -------------------------------------------------------------------
// Fork arrows from strip to panels
// -------------------------------------------------------------------

function drawForkArrows(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toSoldierX: number,
  toSoldierY: number,
  toScoutX: number,
  toScoutY: number,
): void {
  ctx.save();
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;

  // Left branch to soldier
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toSoldierX, toSoldierY);
  ctx.stroke();

  // Right branch to scout
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toScoutX, toScoutY);
  ctx.stroke();
  ctx.restore();
}

// -------------------------------------------------------------------
// Main draw export
// -------------------------------------------------------------------

export function drawScoutSoldier(
  ctx: CanvasRenderingContext2D,
  data: ScoutSoldierData,
): void {
  const W = SCOUT_SOLDIER_W;
  const H = SCOUT_SOLDIER_H;

  const events = getEvents(data.stream);
  const scoutT = scoutTrace(events);
  const soldierT = soldierTrace(events);

  // Layout constants
  const margin = 16;
  const stripY = 14;
  const stripH = 54;
  const stripW = W - margin * 2;

  const gapY = stripY + stripH + 14; // midpoint between strip and panels
  const panelTop = gapY + 10;
  const panelH = Math.floor((H - panelTop - margin) / 2) - 6;
  const panelW = W - margin * 2;

  const soldierY = panelTop;
  const scoutY = panelTop + panelH + 12;

  // Draw the input strip
  drawInputStrip(ctx, events, margin, stripY, stripW, stripH);

  // Fork arrows from strip center to each panel
  drawForkArrows(
    ctx,
    W / 2,
    stripY + stripH,
    margin + panelW * 0.25,
    soldierY,
    margin + panelW * 0.75,
    soldierY,
  );

  // Draw soldier panel (top)
  drawPanel(
    ctx,
    margin,
    soldierY,
    panelW,
    panelH,
    events,
    soldierT,
    "soldier",
    ["defend", "explain away", "raise burden of proof"],
    "#7C3AED",
    "#6D28D9",
  );

  // Draw scout panel (bottom)
  drawPanel(
    ctx,
    margin,
    scoutY,
    panelW,
    panelH,
    events,
    scoutT,
    "scout",
    ["record", "separate signal/noise", "update"],
    "#059669",
    "#065F46",
  );

  // Prior reference legend
  ctx.save();
  ctx.font = `9px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = palette.strokeMid;
  ctx.lineWidth = 0.8;
  const legX = W - 90;
  const legY = soldierY - 6;
  ctx.beginPath();
  ctx.moveTo(legX, legY);
  ctx.lineTo(legX + 18, legY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillText(`prior ${(PRIOR * 100).toFixed(0)}%`, legX + 22, legY + 3);
  ctx.restore();

  // Title label
  drawLabel(
    ctx,
    "confidence in 40% takeoff claim",
    margin + 2,
    soldierY - 6,
    { size: 9, align: "left" },
  );
}

export const SCOUT_SOLDIER_W = 560;
export const SCOUT_SOLDIER_H = 480;
