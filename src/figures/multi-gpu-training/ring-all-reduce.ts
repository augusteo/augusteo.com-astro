import { palette, font, drawLabel } from "@figures/shared";

export interface RingData {
  n: number;
  t: number;
}

interface StepState {
  chunks: number[][];
  arrowChunkIdx: number | null;
  phase: "INITIAL" | "REDUCE-SCATTER" | "ALL-GATHER";
  stepLabel: string;
}

function simulate(n: number): StepState[] {
  let chunks: number[][] = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 1),
  );
  const history: StepState[] = [
    {
      chunks: chunks.map((r) => [...r]),
      arrowChunkIdx: null,
      phase: "INITIAL",
      stepLabel: "—",
    },
  ];
  for (let k = 0; k < n - 1; k++) {
    const next = chunks.map((r) => [...r]);
    for (let r = 0; r < n; r++) {
      const ci = (((r - k) % n) + n) % n;
      const recv = (r + 1) % n;
      next[recv][ci] += chunks[r][ci];
    }
    history.push({
      chunks: next,
      arrowChunkIdx: (((0 - k) % n) + n) % n,
      phase: "REDUCE-SCATTER",
      stepLabel: `step ${k + 1} of ${n - 1}`,
    });
    chunks = next;
  }
  for (let k = 0; k < n - 1; k++) {
    const next = chunks.map((r) => [...r]);
    for (let r = 0; r < n; r++) {
      const ci = (((r + 1 - k) % n) + n) % n;
      const recv = (r + 1) % n;
      next[recv][ci] = chunks[r][ci];
    }
    history.push({
      chunks: next,
      arrowChunkIdx: (((0 + 1 - k) % n) + n) % n,
      phase: "ALL-GATHER",
      stepLabel: `step ${k + 1} of ${n - 1}`,
    });
    chunks = next;
  }
  return history;
}

export function drawRingAllReduce(
  ctx: CanvasRenderingContext2D,
  data: RingData,
): void {
  const history = simulate(data.n);
  const stepIdx = Math.min(
    history.length - 1,
    Math.floor(data.t * history.length),
  );
  const state = history[stepIdx];

  const cx = 200;
  const cy = 152;
  const ringR = 96;
  const rectW = 36;
  const cellH = 52 / data.n;
  const rectH = cellH * data.n;

  for (let i = 0; i < data.n; i++) {
    const angle = (i / data.n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * ringR - rectW / 2;
    const y = cy + Math.sin(angle) * ringR - rectH / 2;

    for (let c = 0; c < data.n; c++) {
      const count = state.chunks[i][c];
      if (count === data.n) {
        ctx.fillStyle = palette.tertiary;
      } else {
        const ratio = count / data.n;
        const alpha = 0.18 + 0.72 * ratio;
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
      }
      ctx.fillRect(x, y + c * cellH, rectW, cellH);
    }

    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, rectW, rectH);

    const labX = cx + Math.cos(angle) * (ringR - 32);
    const labY = cy + Math.sin(angle) * (ringR - 32);
    drawLabel(ctx, `r${i}`, labX, labY + 3, { align: "center" });
  }

  if (state.arrowChunkIdx !== null) {
    for (let i = 0; i < data.n; i++) {
      const fromAngle = (i / data.n) * Math.PI * 2 - Math.PI / 2;
      const toAngle = ((i + 1) / data.n) * Math.PI * 2 - Math.PI / 2;
      const arcR = ringR + 28;
      const fromX = cx + Math.cos(fromAngle) * arcR;
      const fromY = cy + Math.sin(fromAngle) * arcR;
      const toX = cx + Math.cos(toAngle) * arcR;
      const toY = cy + Math.sin(toAngle) * arcR;
      const midAngle = (fromAngle + toAngle) / 2;
      const midX = cx + Math.cos(midAngle) * (arcR + 8);
      const midY = cy + Math.sin(midAngle) * (arcR + 8);
      const highlight = i === 0;

      ctx.strokeStyle = highlight ? palette.secondary : palette.strokeMid;
      ctx.lineWidth = highlight ? 1.8 : 0.9;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.quadraticCurveTo(midX, midY, toX, toY);
      ctx.stroke();

      const tipAng = Math.atan2(toY - midY, toX - midX);
      ctx.fillStyle = highlight ? palette.secondary : palette.strokeMid;
      const headLen = highlight ? 7 : 5;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - Math.cos(tipAng) * headLen + Math.sin(tipAng) * (headLen * 0.5),
        toY - Math.sin(tipAng) * headLen - Math.cos(tipAng) * (headLen * 0.5),
      );
      ctx.lineTo(
        toX - Math.cos(tipAng) * headLen - Math.sin(tipAng) * (headLen * 0.5),
        toY - Math.sin(tipAng) * headLen + Math.cos(tipAng) * (headLen * 0.5),
      );
      ctx.closePath();
      ctx.fill();

      if (highlight) {
        const tagX = cx + Math.cos(midAngle) * (arcR + 26);
        const tagY = cy + Math.sin(midAngle) * (arcR + 26);
        drawLabel(ctx, `chunk ${state.arrowChunkIdx}`, tagX, tagY + 3, {
          align: "center",
          color: palette.secondary,
        });
      }
    }
  }

  const panelX = 358;
  let py = 36;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("phase", panelX, py);
  py += 22;
  ctx.font = `bold 16px ${font.mono}`;
  ctx.fillStyle =
    state.phase === "REDUCE-SCATTER"
      ? palette.primary
      : state.phase === "ALL-GATHER"
        ? palette.tertiary
        : palette.text;
  ctx.fillText(state.phase, panelX, py);
  py += 22;
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText(state.stepLabel, panelX, py);
  py += 36;

  ctx.fillText("blue = partial sum", panelX, py);
  py += 16;
  ctx.fillText("green = fully summed", panelX, py);
  py += 22;
  for (let k = 0; k < 4; k++) {
    const ratio = k / 3;
    const alpha = 0.18 + 0.72 * ratio;
    ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
    ctx.fillRect(panelX + k * 22, py, 18, 14);
  }
  ctx.fillStyle = palette.tertiary;
  ctx.fillRect(panelX + 4 * 22 + 8, py, 18, 14);
  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillText("1", panelX + 4, py + 26);
  ctx.fillText(`${data.n - 1}`, panelX + 22 * 3 + 6, py + 26);
  ctx.fillText(`${data.n}`, panelX + 4 * 22 + 12, py + 26);
}

export const RING_AR_W = 540;
export const RING_AR_H = 300;
