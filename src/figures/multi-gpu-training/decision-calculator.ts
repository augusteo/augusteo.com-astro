import { palette, font, fmt } from "@figures/shared";

export type Arch = "dense" | "moe";
export type Hardware = "h100" | "h800";

export interface DecisionData {
  modelIdx: number;
  totalIdx: number;
  arch: Arch;
  hardware: Hardware;
}

export const MODEL_OPTIONS: { b: number; activeB: number; label: string }[] = [
  { b: 1, activeB: 1, label: "1B" },
  { b: 8, activeB: 8, label: "8B" },
  { b: 32, activeB: 32, label: "32B" },
  { b: 70, activeB: 70, label: "70B" },
  { b: 200, activeB: 200, label: "200B" },
  { b: 405, activeB: 405, label: "405B" },
  { b: 671, activeB: 37, label: "671B-MoE" },
];

export const TOTAL_OPTIONS: number[] = [8, 32, 128, 512, 2048, 8192, 16384];

interface Recipe {
  tp: number;
  cp: number;
  pp: number;
  ep: number;
  dp: number;
  memPerGpu: number;
  fits: boolean;
  matches: string;
  notes: string[];
}

function pow2Floor(x: number): number {
  if (x < 1) return 1;
  return Math.pow(2, Math.floor(Math.log2(x)));
}

function recommend(
  bTotal: number,
  bActive: number,
  total: number,
  arch: Arch,
  hardware: Hardware,
): Recipe {
  const gpn = 8;
  const memCap = 80;
  const memTotal = bTotal * 16;
  const memActive = bActive * 16;
  const fastNvlink = hardware === "h100";
  const isMoe = arch === "moe";

  let tp = 1;
  let cp = 1;
  let pp = 1;
  let ep = 1;
  let dp = 1;
  const notes: string[] = [];

  if (isMoe) {
    tp = 1;
    notes.push("no TP for MoE; EP replaces it");
    const epCap = Math.min(64, total);
    ep = pow2Floor(Math.max(gpn, Math.min(epCap, total / 4)));
    ep = Math.min(ep, total);
    pp = Math.min(
      16,
      Math.max(1, Math.ceil((memActive * ep) / total / memCap)),
    );
    pp = Math.min(pp, Math.max(1, Math.floor(total / ep)));
    dp = Math.max(1, Math.floor(total / (tp * pp * ep)));
    if (fastNvlink === false) notes.push("FP8 + DualPipe to hide all-to-all");
  } else {
    if (total <= gpn) {
      tp = Math.min(total, fastNvlink ? 8 : 2);
      pp = 1;
      dp = Math.max(1, Math.floor(total / tp));
      if (memTotal <= memCap * total)
        notes.push("FSDP across the single node");
      else notes.push("model overflows the node — add more GPUs");
    } else if (memTotal <= memCap * total) {
      tp = fastNvlink ? Math.min(8, gpn) : 1;
      pp = 1;
      dp = Math.max(1, Math.floor(total / tp));
      notes.push("FSDP shards the rest across DP");
      if (!fastNvlink) notes.push("slow NVLink: drop TP, FSDP only");
    } else {
      tp = fastNvlink ? Math.min(8, gpn) : 1;
      const dpAvail = Math.max(1, Math.floor(total / tp));
      pp = Math.min(
        16,
        Math.max(1, Math.ceil(memTotal / tp / dpAvail / memCap)),
      );
      dp = Math.max(1, Math.floor(total / (tp * pp)));
      notes.push("PP added because FSDP alone cannot fit");
    }
  }

  const allocated = tp * cp * pp * ep * dp;
  const denom = Math.max(1, tp * pp * ep);
  let memPerGpu: number;
  if (isMoe) {
    const paramGrad = (memTotal / denom) * 0.25;
    const optState = (memTotal / (denom * Math.max(1, dp))) * 0.75;
    memPerGpu = paramGrad + optState;
  } else {
    memPerGpu = memTotal / (denom * Math.max(1, dp));
  }
  const fits = memPerGpu <= memCap * 1.05;

  let matches = "";
  if (bTotal === 671 && isMoe && total >= 1024)
    matches = "DeepSeek-V3 territory";
  else if (bTotal === 405 && !isMoe && total >= 4096)
    matches = "Llama 3 405B territory";
  else if (bTotal === 70 && !isMoe && total >= 64)
    matches = "Llama 3 70B class";
  else if (bTotal <= 8 && total <= 8 && !isMoe) matches = "single-node 8B";
  else if (bTotal === 1 && total === 1) matches = "solo training";

  if (allocated !== total)
    notes.push(`${allocated} of ${total} GPUs allocated · rest idle`);

  return { tp, cp, pp, ep, dp, memPerGpu, fits, matches, notes };
}

export function drawDecisionCalculator(
  ctx: CanvasRenderingContext2D,
  data: DecisionData,
): void {
  const { modelIdx, totalIdx, arch, hardware } = data;
  const model = MODEL_OPTIONS[modelIdx];
  const total = TOTAL_OPTIONS[totalIdx];
  const recipe = recommend(model.b, model.activeB, total, arch, hardware);

  const left = 32;
  const memCap = 80;

  ctx.fillStyle = palette.text;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    `${model.label} · ${total} GPUs · ${arch === "moe" ? "MoE" : "dense"} · ${
      hardware === "h100" ? "H100 (NVLink 900 / IB 400)" : "H800 (NVLink 160 / IB 50)"
    }`,
    left,
    32,
  );

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText("recommended mesh", left, 60);

  const meshY = 88;
  const axes = [
    { name: "TP", val: recipe.tp, color: palette.accentBrown },
    { name: "CP", val: recipe.cp, color: palette.tertiary },
    { name: "PP", val: recipe.pp, color: palette.primary },
    { name: "EP", val: recipe.ep, color: palette.accentTan },
    { name: "DP", val: recipe.dp, color: palette.secondary },
  ];

  let mx = left;
  ctx.textBaseline = "alphabetic";
  for (let i = 0; i < axes.length; i++) {
    const a = axes[i];
    const isActive = a.val > 1;
    ctx.fillStyle = isActive ? a.color : palette.strokeMid;
    ctx.font = `bold 28px ${font.mono}`;
    const txt = `${a.val}`;
    ctx.fillText(txt, mx, meshY);
    const tw = ctx.measureText(txt).width;
    ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
    ctx.fillStyle = isActive ? a.color : palette.strokeMid;
    ctx.fillText(a.name, mx, meshY + 16);
    mx += tw + 14;
    if (i < axes.length - 1) {
      ctx.fillStyle = palette.strokeMid;
      ctx.font = `bold 22px ${font.mono}`;
      ctx.fillText("×", mx, meshY - 4);
      mx += 18;
    }
  }

  const allocated = recipe.tp * recipe.cp * recipe.pp * recipe.ep * recipe.dp;
  ctx.font = `${font.sizeLabel}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(`= ${allocated} GPUs`, mx + 8, meshY);

  const memY = 152;
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.fillText(
    arch === "moe"
      ? "per-GPU memory (params + grads + opt, ZeRO-1)"
      : "per-GPU memory (FSDP shards across TP × PP × DP)",
    left,
    memY,
  );

  const barX = left;
  const barY = memY + 10;
  const barW = 360;
  const barH = 16;
  ctx.fillStyle = palette.paperDark;
  ctx.fillRect(barX, barY, barW, barH);

  const pxPerGB = barW / (memCap * 1.4);
  const fillW = Math.min(barW, recipe.memPerGpu * pxPerGB);
  ctx.fillStyle = recipe.fits ? palette.tertiary : palette.secondary;
  ctx.fillRect(barX, barY, fillW, barH);

  ctx.strokeStyle = palette.stroke;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(barX, barY, barW, barH);

  const capX = barX + memCap * pxPerGB;
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(capX, barY - 2);
  ctx.lineTo(capX, barY + barH + 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "center";
  ctx.fillText("80 GB H100 cap", capX, barY + barH + 14);

  ctx.textAlign = "left";
  ctx.fillStyle = recipe.fits ? palette.text : palette.secondary;
  ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
  ctx.fillText(
    `${fmt(recipe.memPerGpu, 1)} GB`,
    barX + fillW + 8,
    barY + 12,
  );

  let py = 210;
  if (recipe.matches) {
    ctx.font = `bold ${font.sizeLabel}px ${font.mono}`;
    ctx.fillStyle = palette.tertiary;
    ctx.fillText(`matches: ${recipe.matches}`, left, py);
    py += 18;
  }
  ctx.font = `${font.sizeLabelSmall}px ${font.mono}`;
  ctx.fillStyle = palette.text;
  for (const n of recipe.notes) {
    ctx.fillText(`· ${n}`, left, py);
    py += 14;
  }
}

export const DECISION_W = 620;
export const DECISION_H = 280;
