import { palette, font } from "@figures/shared";

export type MeshMode = "5d" | "4d";

export interface MeshData {
  mode: MeshMode;
  dragX: number;
  dragY: number;
}

interface Axes {
  tp: number;
  cp: number;
  pp: number;
  ep: number;
  dp: number;
}

const ROWS = 8;
const COLS = 8;

function axesAt(mode: MeshMode, i: number, j: number): Axes {
  const tp = j % 2;
  const cp = i % 2;
  const pp = Math.floor(j / 2);
  if (mode === "4d") {
    return { tp, cp, pp, ep: 0, dp: Math.floor(i / 2) };
  }
  return {
    tp,
    cp,
    pp,
    ep: Math.floor(i / 2) % 2,
    dp: Math.floor(i / 4),
  };
}

interface StripeDef {
  name: "TP" | "CP" | "PP" | "EP" | "DP";
  color: string;
  matches: (a: Axes, s: Axes) => boolean;
  size: number;
}

function stripesFor(mode: MeshMode): StripeDef[] {
  if (mode === "4d") {
    return [
      {
        name: "TP",
        color: palette.accentBrown,
        size: 2,
        matches: (a, s) => a.cp === s.cp && a.pp === s.pp && a.dp === s.dp,
      },
      {
        name: "CP",
        color: palette.tertiary,
        size: 2,
        matches: (a, s) => a.tp === s.tp && a.pp === s.pp && a.dp === s.dp,
      },
      {
        name: "PP",
        color: palette.primary,
        size: 4,
        matches: (a, s) => a.tp === s.tp && a.cp === s.cp && a.dp === s.dp,
      },
      {
        name: "DP",
        color: palette.secondary,
        size: 4,
        matches: (a, s) => a.tp === s.tp && a.cp === s.cp && a.pp === s.pp,
      },
    ];
  }
  return [
    {
      name: "TP",
      color: palette.accentBrown,
      size: 2,
      matches: (a, s) =>
        a.cp === s.cp && a.pp === s.pp && a.ep === s.ep && a.dp === s.dp,
    },
    {
      name: "CP",
      color: palette.tertiary,
      size: 2,
      matches: (a, s) =>
        a.tp === s.tp && a.pp === s.pp && a.ep === s.ep && a.dp === s.dp,
    },
    {
      name: "PP",
      color: palette.primary,
      size: 4,
      matches: (a, s) =>
        a.tp === s.tp && a.cp === s.cp && a.ep === s.ep && a.dp === s.dp,
    },
    {
      name: "EP",
      color: palette.accentTan,
      size: 2,
      matches: (a, s) =>
        a.tp === s.tp && a.cp === s.cp && a.pp === s.pp && a.dp === s.dp,
    },
    {
      name: "DP",
      color: palette.secondary,
      size: 2,
      matches: (a, s) =>
        a.tp === s.tp && a.cp === s.cp && a.pp === s.pp && a.ep === s.ep,
    },
  ];
}

export function drawFiveDMesh(
  ctx: CanvasRenderingContext2D,
  data: MeshData,
): void {
  const { mode, dragX, dragY } = data;
  const W = MESH_W;
  const H = MESH_H;
  const gridX = 28;
  const gridY = 60;
  const cellSize = 26;
  const gap = 4;
  const gridW = COLS * cellSize + (COLS - 1) * gap;
  const gridH = ROWS * cellSize + (ROWS - 1) * gap;

  const scaledX = Math.min(
    0.999,
    Math.max(0, (dragX * W - gridX) / gridW),
  );
  const scaledY = Math.min(
    0.999,
    Math.max(0, (dragY * H - gridY) / gridH),
  );
  const gj = Math.min(COLS - 1, Math.floor(scaledX * COLS));
  const gi = Math.min(ROWS - 1, Math.floor(scaledY * ROWS));
  const sel = axesAt(mode, gi, gj);

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    mode === "5d"
      ? "5D mesh: TP × CP × PP × EP × DP · 64 GPUs · drag any cell"
      : "4D mesh: TP × CP × PP × DP · 64 GPUs · drag any cell",
    gridX,
    36,
  );

  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(gridX - 4, gridY - 4, gridW + 8, gridH + 8);
  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(gridX - 4, gridY - 4, gridW + 8, gridH + 8);

  const stripes = stripesFor(mode);
  const stripeCount = stripes.length;
  const stripeH = cellSize / stripeCount;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const axes = axesAt(mode, i, j);
      const cx = gridX + j * (cellSize + gap);
      const cy = gridY + i * (cellSize + gap);
      const isSelected = i === gi && j === gj;

      let lit = 0;
      for (const st of stripes) if (st.matches(axes, sel)) lit++;

      ctx.globalAlpha = isSelected || lit > 0 ? 1 : 0.55;

      ctx.fillStyle = palette.paper;
      ctx.fillRect(cx, cy, cellSize, cellSize);

      for (let k = 0; k < stripeCount; k++) {
        const sy = cy + k * stripeH;
        const st = stripes[k];
        const isMatch = st.matches(axes, sel);
        if (isMatch) {
          ctx.fillStyle = st.color;
          ctx.fillRect(cx, sy, cellSize, stripeH + 0.5);
        }
      }

      ctx.lineWidth = isSelected ? 1.8 : 0.4;
      ctx.strokeStyle = isSelected ? palette.text : palette.strokeMid;
      ctx.strokeRect(cx, cy, cellSize, cellSize);

      ctx.globalAlpha = 1;
    }
  }

  const panelX = gridX + gridW + 28;
  let py = gridY + 4;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.fillStyle = palette.text;
  ctx.fillText("selected GPU", panelX, py);
  py += 16;
  ctx.font = `bold 13px ${font.mono}`;
  if (mode === "4d") {
    ctx.fillText(
      `tp=${sel.tp} cp=${sel.cp} pp=${sel.pp} dp=${sel.dp}`,
      panelX,
      py,
    );
  } else {
    ctx.fillText(
      `tp=${sel.tp} cp=${sel.cp} pp=${sel.pp}`,
      panelX,
      py,
    );
    py += 14;
    ctx.fillText(`ep=${sel.ep} dp=${sel.dp}`, panelX, py);
  }
  py += 24;

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`comm groups (${stripeCount})`, panelX, py);
  py += 14;

  for (const st of stripes) {
    ctx.fillStyle = st.color;
    ctx.fillRect(panelX, py - 8, 14, 11);
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 0.4;
    ctx.strokeRect(panelX, py - 8, 14, 11);
    ctx.fillStyle = palette.text;
    ctx.font = `${font.sizeLabel}px ${font.mono}`;
    ctx.fillText(`${st.name}`, panelX + 22, py);
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillStyle = palette.text;
    ctx.fillText(
      `${st.size} ranks`,
      panelX + 56,
      py,
    );
    py += 18;
  }

  py += 10;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("each cell = one GPU", panelX, py);
  py += 14;
  ctx.fillText("colored stripe = group-mate of selected", panelX, py);
}

export const MESH_W = 620;
export const MESH_H = 340;
