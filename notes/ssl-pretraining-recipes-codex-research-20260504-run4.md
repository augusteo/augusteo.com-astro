OpenAI Codex v0.125.0 (research preview)
--------
workdir: /Users/vic/dev/augusteo.com-astro
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: high
reasoning summaries: none
session id: 019df5ba-fe04-7211-a358-0afcaca1b892
--------
user
IMPORTANT: Do NOT read or execute any files under `~/.claude/`, `~/.agents/`, or `.claude/skills/`. Those are skill definitions for a different AI system. Stay focused on repository code only.

You are reviewing the (further-revised) research notes and claim-source matrix for a long-form blog post on augusteo.com. This is **Gate 0 run 4** — the gate-runner cap. Author has applied the run-3 stale-prose cleanup fixes. Verify whether structural issues remain.

The post's goal:

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

The matrix is the contract: every load-bearing claim has one row mapping the claim to a quoted excerpt from a primary source. Topic-evolution: actively-evolving (12-month bar from pubDate 2026-05-04).

Read the full revised notes file at:
`/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md`

Run 3 left these 3 STRUCTURAL + 2 COSMETIC issues. Verify each is now closed:

1. **STRUCTURAL: Spec line 16 stale promise**: was "When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds." Now: rewritten to "The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (Lahrichi 2025; GLARE 2026) and what it does and doesn't tell us about construction documents." Is the rewritten bullet defensible against the matrix?

2. **STRUCTURAL: Research-notes line 304 stale "no canonical bake-off"**: was contradicting row 32. Now: narrowed to "no published all-three-corners bake-off (from-scratch SSL on domain vs continual SSL from natural-image SSL vs zero-shot fine-tune from natural-image SSL) exists for construction documents or engineering drawings specifically." Is the narrowed claim defensible?

3. **STRUCTURAL: Research-notes C-RADIOv4 line 263 stale "No SSL auxiliary loss on student"**: was contradicting row 25 + revised Headline. Now: line removed; replaced with "No MAE/DINO/JEPA-style pretext task on the student. MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext — its role is stability + equivariance." Loss equations updated to PHI-S spatial / angular-cone summary / MESA. Is this consistent with row 25 and the Headline?

4. **COSMETIC: Row 36 parenthetical narrowness**: was "corrupted view + reconstruction objective." Now: "reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs."

5. **COSMETIC: Row 32 recency bookkeeping**: was "just inside bar (~14 months)." Now: "Lahrichi 2025-02-15 is OUTSIDE the strict 12-month bar (14 months at pubDate 2026-05-04) — foundational-stable for the historical 'Lahrichi found X' claim."

Beyond verifying these closures, do a fresh adversarial pass. Are any **new** structural issues introduced by the run-3 fixes? Look specifically at:
- The rewritten "Reader walks away knowing" bullet in Spec.
- The rewritten "no all-three-corners bake-off" sentence in Research notes.
- The rewritten C-RADIOv4 prose paragraph + loss equations.
- Internal consistency between Headline finding paragraph(s), row 25, row 35, and the C-RADIOv4 prose paragraph.

For each finding, label STRUCTURAL or COSMETIC. If the matrix is now sound, say "no structural issues found" and stop. Otherwise, list findings ordered by load-bearing-ness with row/paragraph references.

Do not be diplomatic. Do not validate. The bar is whether the matrix is actually defensible at pubDate against an adversarial reader who knows the SSL literature.

codex
I’ll inspect the local notes and the relevant prior memory for this repo, staying out of `.claude/skills/` as requested. This pass is review-only: I’m checking whether the source matrix still supports the revised structural claims.
exec
/bin/zsh -lc 'wc -l notes/ssl-pretraining-recipes.md && rg -n "Reader walks away|continual|all-three-corners|canonical bake-off|C-RADIO|MESA|PHI-S|angular|row 25|Row 25|Lahrichi|GLARE|DINOv3|reconstruction, invariance|12-month|foundational-stable|Headline|Finding|research notes|matrix|Claim-source" notes/ssl-pretraining-recipes.md' in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc 'rg -n "ssl-pretraining|multi-gpu-training|grounded in reality|augusteo.com-astro|C-RADIO|Lahrichi|GLARE" /Users/vic/.codex/memories/MEMORY.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
88:# Task Group: /Users/vic/dev/augusteo.com-astro multi-gpu-training factual review and figure UX fixes
89:scope: reviewing and then correcting the Astro blog's `multi-gpu-training` post plus its interactive figures when the user wants factual grounding, source-backed fixes, and intuitive looping figure behavior
90:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout's blog/figure paths and similar Astro content-plus-figure tasks, but re-verify ML/hardware claims against current primary sources
92:## Task 1: Review multi-gpu-training post and figures for factual grounding, issues found
96:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, review found stale and overstated claims before the fix pass)
100:- Astro, MDX, Svelte, multi-gpu-training, factual audit, deep research, DeepSeek-V3, Llama 3 405B, FSDP2, DTensor, NCCL, FP8, GB300, H200, decision-calculator.ts, memory-bar.ts, moe-routing.ts
106:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, content corrections plus looping scrubber and figure UX fixes)
114:- when reviewing content, the user asked to "review the post and the illustration and interactive boxes" and make sure they were "grounded in reality and updated truth" -> default to fact-checking prose plus interactive visuals, not just build health or copy style [Task 1]
122:- the truth-sensitive edit surfaces for this post family are `src/content/blog/multi-gpu-training/index.mdx`, interactive logic under `src/figures/multi-gpu-training/`, and visual components under `src/components/figures/multi-gpu-training/` [Task 1][Task 2]
124:- local verification path is `bun run astro -- dev --host 127.0.0.1 --port 4321`, then inspect `/blog/multi-gpu-training`; a plain localhost `curl` can fail until the server is actually running and listening [Task 1]
138:# Task Group: /Users/vic/dev/augusteo.com-astro Codex instruction symlink
140:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout and similar repos that already have a root `CLAUDE.md`; prefer re-checking repo instruction layout before reusing
146:- rollout_summaries/2026-04-25T23-17-05-SHdj-codex_config_symlink_agents_to_claude.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-17-05-019dc6ee-b179-7612-9a15-da18473c6e35.jsonl, updated_at=2026-04-25T23:20:20+00:00, thread_id=019dc6ee-b179-7612-9a15-da18473c6e35, committed on `main`)
167:- symptom: `git add` or `git commit` fails with `fatal: Unable to create '/Users/vic/dev/augusteo.com-astro/.git/index.lock': Operation not permitted` -> cause: git lockfile creation was blocked in that environment -> fix: retry in an environment with sufficient filesystem permissions instead of assuming the repo state is broken [Task 1]

 succeeded in 0ms:
     525 notes/ssl-pretraining-recipes.md
8:**Topic-evolution classification:** actively-evolving — 12-month freshness bar applies. DINOv3 (Aug 2025), V-JEPA 2 (2025), C-RADIOv4 (Jan 2026), and ongoing JEPA / multi-teacher work all fall inside the bar.
10:**One-paragraph summary.** A taxonomy of self-supervised pretraining recipes for vision backbones, organized around one practitioner-centric question: you have a large unlabeled corpus in a domain whose pretraining corpus the canonical SSL backbones (MAE on ImageNet, DINOv3 web on LVD-1689M, C-RADIOv4 on NV-CC-Img-Text) have not been trained on — construction documents, line drawings, scanned reports, niche scientific imagery — and a small labeled set for downstream **dense prediction (semantic + instance segmentation primary; detection secondary; layout/classification tertiary)**. Some natural-image-trained backbones DO ship domain-adapted variants (DINOv3 has a SAT-493M satellite specialization with Earth-observation benchmark numbers), but no analogous specialization exists for construction documents or line-art-heavy engineering drawings. Which SSL recipe gives the best fine-tuning starting point in that case, and is it better to train from scratch, continue-pretrain on top of a natural-image checkpoint, or run a hybrid? The post walks through seven recipe families, evaluates each against the dense-feature-quality lens, and closes with a recipe-selection decision tree gated on (corpus scale × domain distance from natural images × downstream task density). The motivating use case in the throughline is construction documents at a scale of several hundred thousand unlabeled + 10–20k labeled, but the decision tree generalizes.
12:**Reader walks away knowing:**
16:- The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (satellite via Lahrichi 2025; cross-domain segmentation via GLARE 2026) and what it does and doesn't tell us about construction documents.
17:- Where multi-teacher distillation (C-RADIOv4) fits and why it isn't a recipe you can use without teachers.
32:4. Self-distillation — DINO, iBOT, DINOv2, DINOv2-with-registers, DINOv3 (Gram anchoring)
35:7. Multi-teacher distillation as pretraining — AM-RADIO, RADIOv2.5, C-RADIOv4, PHI-S
51:- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes. Frame the open question: a natural-image SSL backbone has not been trained on construction-document line art; whether its features on this domain are usable as-is is empirically unclear. DINOv3's satellite specialization (SAT-493M) and the published continual-SSL-on-satellite comparisons (Lahrichi 2025, GLARE 2026) provide adjacent evidence. The post does **not** assert a generalized "domain-adaptive SSL beats zero-shot natural-image checkpoint for sufficiently OOD domains" thesis (that synthesis is not in the matrix). It explores the question for construction documents specifically, and the closing decision tree reflects what published recipes can and cannot tell us.
57:Phase 2 research, dispatched as three parallel subagents covering (a) MIM family, (b) self-distillation + JEPA + AR, (c) multi-teacher distillation + domain-adaptive. Plus my own focused fetch on C-RADIOv4 to verify the SSL-aux-loss question. All quotes below are from primary sources — arxiv papers, paper HTML mirrors, or NVIDIA tech reports.
59:### Headline finding for the post
61:**The RADIO lineage's primary supervision signal is teacher feature imitation, not a MAE/DINO/contrastive pretext.** Across AM-RADIO (2312.06709), RADIOv2.5 (2412.07679), and C-RADIOv4 (2601.17237), the student is primarily trained to match teacher features. AM-RADIO uses cosine + smooth-L1 spatial losses with cosine summary; RADIOv2.5 introduces PHI-S loss balancing; C-RADIOv4 uses PHI-S-normalized squared-error spatial loss, drops cosine for an angular-cone-normalized summary loss, and adds MESA (shift-equivariant EMA matching). **MESA is a self-supervised regularizer** — student matches its own EMA on shifted crops — but it is not a MAE/DINO-style masked-prediction or contrastive pretext task. **The categorical observation:** multi-teacher distillation occupies a different position in the SSL recipe taxonomy than pretext-derived SSL — supervision shape is external (teacher activations) rather than pretext-derived (corrupted-view + reconstruction or invariance objective). This is load-bearing for the multi-teacher rung and is a different *kind* of self-supervision, not "not SSL".
63:### Headline finding on domain transfer
65:**Recent published evidence suggests natural-image SSL transfers surprisingly well to satellite imagery — the "domain-adaptive SSL strictly beats natural-image SSL" intuition does not hold uniformly.** DINOv3 Web ViT-7B (frozen, no satellite fine-tune) sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (its own satellite specialization) and prior satellite-specialized models on those tasks. Lahrichi et al. 2025 directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks and reported "no consistent advantage to pre-training with GeoNet as compared to ImageNet." GLARE (TMLR-formatted submission, arxiv:2509.17816, Jan 2026) reports modest +0.2 to +0.6 mIoU continual-pretraining gains on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA. **For construction documents specifically, no analogous published comparison exists.** The post explores what the recipe taxonomy can and cannot tell us in that absence; it does not assert a generalized continual-pretraining-wins thesis.
109:**No image dense-prediction transfer is reported by the paper.** Image transfer is ImageNet classification only (ViT-B 84.0 / ViT-L 85.7 at 1600 epochs). Headline numbers are video (Kinetics-400 86.7%, AVA action detection 39.8 mAP).
179:**DINOv3** (arxiv:2508.10104, 2025-08). Meta. **Critical entry — Gram anchoring is load-bearing for the post.**
189:> "Compares the Gram matrix (all pairwise dot products) of student patch features against those from an earlier model, referred to as the Gram teacher... local features [are allowed] to move, provided the structure of similarities remains the same."
253:**C-RADIOv4** (arxiv:2601.17237v1, 2026-01-24). NVIDIA.
255:Teachers: SigLIP2, DINOv3, SAM3 (paper-confirmed; specific variants like "SigLIP2-g-384, DINOv3-7B" appear in research summaries but my abstract-only WebFetch could not verify the variant suffixes — Phase 7 freshness pass should re-confirm).
259:> Spatial loss: L_spatial(x, ŷ) = (1/|Ω|) Σ_{u∈Ω} (𝓕_{S→T}[x]_u − ŷ_u)² with ŷ_u = PHI-S-normalized teacher output (Eq. 1, §2.3.1)
261:> MESA: L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)² — student matches its own EMA on shifted crops (Eq. 2, §2.3.2)
263:**No MAE/DINO/JEPA-style pretext task on the student.** MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext — its role is stability + equivariance. C-RADIOv4-H ADE20K mIoU 55.20 at 512px.
265:**PHI-S** (arxiv:2410.01680, 2024-10). Loss-balancing for multi-teacher distillation via Hadamard isotropic standardization.
267:> "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices.
269:> "PHI-S produces the best student model across the suite of methods studied"
287:S3D average DSC 72.37 vs no-pretraining nnU-Net 70.40 (Δ ≈ +1.97 DSC). *Compares from-scratch SSL on the medical domain vs from-scratch supervised. Does not compare to continual SSL on a natural-image checkpoint.*
293:The literature does not contain a canonical bake-off study comparing all three corners of the question that motivates this post:
300:- arxiv:2503.02844 ("Beyond Cosine Decay: On the effectiveness of Infinite Learning Rate Schedule for Continual Pre-training", 2025) — directly studies continual SSL with MAE, summary says "CPT mitigates catastrophic forgetting." *Pointer; not directly fetched.*
301:- arxiv:2410.18677 ("Enhancing pretraining efficiency for medical image segmentation via transferability metrics", 2024) — summary suggests an intermediate continual-pretraining sweet spot. *Pointer.*
306:### Sub-topic: The OOD-domain transfer matrix
308:OOD-domain transfer reporting in the covered set is uneven and partly favors natural-image SSL more than the early framing assumed. **DINOv3 (2025-08, §8.3, Tables 18 & 19) reports satellite-domain transfer for both DINOv3 Web (no satellite fine-tune) and DINOv3 Sat-493M (satellite specialization).** DINOv3 Web ViT-7B sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating DINOv3 Sat-493M and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. DINOv3 explicitly cites Lahrichi 2025 in support: "domain-agnostic pretraining can offer strong generalization even in specialized downstream domains."
310:**Lahrichi 2025 (arxiv:2502.10669) directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks** and reports "no consistent advantage to pre-training with GeoNet as compared to ImageNet." Two-stage MAE-IN-GN beats from-scratch MAE-GN on 5 of 6 benchmarks but the advantage is modest (1-2%).
312:**GLARE (arxiv:2509.17816v2, 2026-01-29) reports modest +0.2 to +0.6 mIoU continual-pretraining gains** on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA at ViT-S/16.
314:**Medical 3D MAE (arxiv:2410.23132)** reports MRI-volume DSC +1.97 on average over a non-pretrained nnU-Net. *The medical paper does not compare to continual SSL on a natural-image checkpoint.*
316:The other canonical SSL papers in the covered set (MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v2-with-registers, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, AM-RADIO/RADIOv2.5/C-RADIOv4) confine their reported transfer to IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain. **No published all-three-corners bake-off (from-scratch SSL on domain vs continual SSL from natural-image SSL vs zero-shot fine-tune from natural-image SSL) exists for construction documents or engineering drawings specifically.** Satellite/medical answers come from DINOv3 Web's frozen-backbone results, Lahrichi 2025, GLARE 2026, Medical 3D MAE, and DiT for documents; whether their conclusions generalize to line-art-heavy construction documents is not established and is the post's open question.
335:- DINOv3 ViT-7B **63.0** ← highest reported in the dataset
339:- C-RADIOv4-H 55.20
343:## Claim-source matrix
358:| 10 | MIM-Refiner identifies the three-block-regime structure of MIM-pretrained encoders: early=general, middle=abstractions (k-NN peaks), late=reconstruction-prep (k-NN drops) | "1. In early ViT blocks, general purpose features are learned... 2. In middle ViT blocks, abstractions are formed... 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases" | arxiv:2402.10093v4 (2025-02-20) | actively-evolving / 12-month bar / foundational-stable — block-regime analysis is a structural/analytical contribution about MIM encoders; not a time-sensitive benchmark number |
362:| 14 | DINOv2's loss combines DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on a curated 142M-image dataset (LVD-142M) | "DINO loss... iBOT loss... KoLeo regularizer... [we] replace the teacher softmax-centering step of DINO and iBot by the Sinkhorn-Knopp (SK) batch normalization" + LVD-142M curation pipeline | arxiv:2304.07193v2 (2024-02-02) | foundational-stable — DINOv2 loss composition is the recipe definition; the post uses it as a reference, not as a fresh benchmark claim |
363:| 15 | DINOv2 has high-norm token artifacts (~10× higher norm, ~2% of tokens) appearing in low-information background regions; registers fix them with <2% FLOP overhead | "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)"; "we explicitly add new tokens to the sequence, that the model can learn to use as registers... <2% FLOP increase" | arxiv:2309.16588v2 (2024-04-12) | foundational-stable — registers are an established architectural fix referenced by DINOv3 (rows 16-18, 2025-08); the artifact diagnosis is the load-bearing analytical content |
364:| 16 | DINOv3 introduces Gram anchoring as a regularizer on patch–patch similarity geometry: ℒ_Gram = ‖X_S X_S⊤ − X_G X_G⊤‖_F² | Body of paper, refinement-phase loss. | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
365:| 17 | Without Gram anchoring, long DINO/iBOT training shows patch-feature locality decay (cosine sim between CLS and patches grows) | "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
366:| 18 | DINOv3 ViT-7B achieves ADE20K mIoU 63.0 with frozen backbone | "ADE20K segmentation (frozen backbone): mIoU 63.0" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
369:| 21 | AIM uses prefix-LM (sampled prefix length S, bidirectional within prefix, AR loss on rest) with normalized-pixel L2 target | "we uniformly sample a prefix length S. The attention for the first S patches are set to be bidirectional and loss is only computed for the remaining patches" + L2 loss on normalized pixels | arxiv:2401.08541 (2024-01-16) | foundational-stable — AIM's prefix-LM recipe is the origin definition for the AR-vision branch; AIMv2 (row 34, 2024-11) is the recent extension |
370:| 22 | AIM does not report ADE20K, COCO, or depth transfer numbers (classification-only) | Body of paper; 15 classification benchmarks evaluated, no dense-prediction numbers | arxiv:2401.08541 (2024-01-16) | foundational-stable — same as row 21 |
371:| 23 | AM-RADIO student is trained with no SSL auxiliary loss; the entire signal is teacher feature imitation (cosine + smooth L1 on spatial, cosine on summary) | "L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))"; "L_features... L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1" — and no SSL pretext mentioned | arxiv:2312.06709 (current arxiv version v5 revised 2024-04-30) | actively-evolving / 12-month bar / foundational-stable — AM-RADIO's loss formulation is foundational for the RADIO line; the "no SSL aux loss on student" architectural decision is the recipe's defining choice and doesn't drift with arxiv revisions. C-RADIOv4 row 25 (2026-01) is the recent corroboration for the lineage claim. |
372:| 24 | RADIOv2.5 diagnoses the "mode-switching" pathology where features behave like DINOv2 at ≤512² and like SAM at higher resolutions | "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM"; "in the high-resolution regime the student only sees SAM features" | arxiv:2412.07679v2 (2025-02-09) | actively-evolving / 12-month bar / foundational-stable — mode-switching is an analytical diagnosis specific to the RADIO architecture; the diagnosis is the load-bearing content, not a benchmark number that drifts. |
373:| 25 | C-RADIOv4's primary spatial loss is squared error against PHI-S-normalized teacher outputs (NOT cosine + smooth-L1, which is the AM-RADIO formulation). The summary loss is angular-cone-normalized (Θ²/Disp) — the paper explicitly states "we no longer use cosine distance as our summary loss." MESA is a self-supervised shift-equivariant regularizer where the student matches its own EMA on shifted crops (not a teacher); it is not a MAE/DINO-style pretext. | "we adopt a new loss formulation as follows: L_spatial(x, ŷ) = (1/|Ω|) Σ (𝓕_{S→T}[x]_u − ŷ_u)²" with "ŷ_u [is] the PHI-S normalized teacher output" — Eq. 1 §2.3.1; "we no longer use cosine distance as our summary loss, and instead adopt the following: L_angle(x, y) = Θ(x, y)² / Disp(Θ_y)" — Eq. 7 §2.5; "L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)²" with "matching the exponential moving average (EMA) of the student model, but with the added twist of introducing different crops for the student and its EMA" — Eq. 2 §2.3.2 | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
374:| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
375:| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
376:| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / foundational-stable — Hadamard standardization is a technique definition referenced by C-RADIOv4 (2026-01); the underlying mathematical recipe doesn't drift |
378:| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / marginal — Oct 2024, 19 months. Hedge in prose: "as of late 2024 the medical-MAE result was published; newer dense-medical comparisons may exist by pubDate." Phase 7 to re-check. |
379:| 31 | OOD-domain transfer reporting in canonical SSL papers is uneven and partly *favors natural-image SSL*: DINOv3 Web ViT-7B (frozen, no satellite-specific fine-tune) reports state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (the satellite specialization) and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. Medical 3D MAE reports MRI-volume DSC for the medical case. **No canonical SSL paper reports transfer to construction-document or engineering-drawing domains.** | "We compare the performance of different methods for Earth observation tasks ... The frozen DINOv3 satellite and web models set new state-of-the-art results on 12 out of 15 classification, segmentation, and horizontal object detection tasks ... the frozen DINOv3 web model establishes new leading results [on] Geo-Bench tasks as well as for segmentation and detection tasks on the LoveDA and DIOR datasets" — DINOv3 §8.3, Tables 18 & 19; Table 19 numbers: DINOv3 Web ViT-7B LoveDA 56.2 / iSAID 71.4 / DIOR 80.5 vs Prev. SotA 54.4 / 71.9 / 79.5. | DINOv3 arxiv:2508.10104 (2025-08); Medical 3D MAE arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / DINOv3 passes; Medical 3D MAE foundational-stable for the medical-MAE comparison |
380:| 32 | Published from-scratch-SSL vs from-natural-image-SSL bake-offs with dense-prediction numbers do exist for satellite (Lahrichi 2025) and for continual-SSL semantic segmentation across natural + satellite domains (GLARE 2026). The published verdict is **NOT** "domain-adaptive SSL clearly wins": Lahrichi found "no consistent advantage to pre-training with GeoNet as compared to ImageNet" across six benchmarks; GLARE's gains on top of UDI initialization are modest (+0.2 to +0.6 mIoU). **No analogous bake-off exists for construction documents or engineering drawings specifically.** | Lahrichi: "we pre-train models on ImageNet and GeoNet, respectively, using two different SSL pre-training strategies: SwAV and MAE" — §5; "the results showed no consistent advantage to pre-training with GeoNet as compared to ImageNet, regardless of whether SwAV or MAE was used" — §8 Conclusions; "MAE-IN-GN outperforms the MAE-GN on five of the six downstream benchmarks, however, the performance advantage in each of these cases is modest (usually 1-2%)" — §6. GLARE: "Given an encoder trained via SSL ... we are interested in improving the output feature embedding by training only the adapter parameters θA via SSL" — §4; "GLARE continual pre-training from UDI consistently shows improvements over the other pre-training strategies" — Table 1 caption; UDI→GLARE deltas (ViT-S/16): ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5. | Lahrichi arxiv:2502.10669v1 (2025-02-15); GLARE arxiv:2509.17816v2 (2026-01-29) | actively-evolving / 12-month bar / Lahrichi 2025-02-15 is OUTSIDE the strict 12-month bar (14 months at pubDate 2026-05-04) — foundational-stable for the historical "Lahrichi found X" claim, since "no consistent advantage" is a recipe-comparison verdict that doesn't drift with paper revisions; GLARE 2026-01-29 passes the bar |
382:| 34 | AIMv2 trains via causal multimodal autoregression: image patches first, then text tokens — image-text supervision, not vision-only SSL. | "a causal multimodal decoder that first regresses image patches and then decodes text tokens in an autoregressive manner" — Abstract | arxiv:2411.14402v1 (2024-11-21) | foundational-stable — AIMv2's recipe definition is the load-bearing claim; ~18 months puts it past the strict 12-month bar but the recipe-classification claim doesn't drift |
383:| 35 | Across the published RADIO line (AM-RADIO 2023 → RADIOv2.5 2024 → C-RADIOv4 2026), the student's primary supervision is teacher feature imitation, not a MAE/DINO-style self-supervised pretext. The only "self-supervised" component is C-RADIOv4's MESA (shift-equivariant EMA matching) which functions as a self-equivariance regularizer, not as a primary pretext task. | Cross-paper synthesis grounded in row 23 (AM-RADIO loss formulation), row 24 (RADIOv2.5 loss formulation), row 25 (C-RADIOv4 + MESA). | Synthesis row pointing to arxiv:2312.06709 + arxiv:2412.07679 + arxiv:2601.17237. | actively-evolving / 12-month bar / passes via row 25 (C-RADIOv4, 2026-01) |
384:| 36 | The post's central thesis "multi-teacher distillation occupies a different position in the SSL recipe taxonomy than MAE/DINO/JEPA-style pretext-derived SSL" is supported by row 35 (cross-RADIO loss-formulation observation) — the supervision shape is categorically external (teacher activations) rather than pretext-derived (reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs). The post should not claim "multi-teacher distillation is not SSL"; rather, it is a different *kind* of self-supervision whose label-source is another model's outputs. | Synthesis claim grounded in row 35 + every primary SSL row. | Synthesis claim. | actively-evolving / passes via row 35 |
386:**Marginal-row debt closure (post-Gate-0-fix-v2).** Row-32 deferral lifted with quoted excerpts from Lahrichi 2025 and GLARE 2026. Remaining marginal:
390:Foundational-stable annotations applied to rows 10, 14, 15, 21, 22, 23, 24, 28, 32 (Lahrichi only — GLARE passes), 34 — recent papers whose load-bearing content is a technique definition or a recipe-classification claim that doesn't drift with arxiv revisions.
394:Active sources within the 12-month bar (passing on date): DINOv3 (rows 16, 17, 18, 31; 2025-08), C-RADIOv4 (rows 25, 26, 27; 2026-01-24), GLARE (row 32; 2026-01-29).
398:**Gate 0 run 1, 2026-05-04.** Findings: 8 STRUCTURAL, 0 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504.md](./ssl-pretraining-recipes-codex-research-20260504.md).
402:1. STRUCTURAL: Row 31 was false. DINOv3 paper has a geospatial section (SAT-493M, Geo-Bench, LoveDA, iSAID, DIOR segmentation/detection numbers); the "no canonical SSL paper reports OOD transfer" claim was wrong. Spec/Throughline claim "DINOv3 has never seen satellite imagery" was also wrong.
403:2. STRUCTURAL: Row 32's absence claim was false. Lahrichi et al. 2025 directly compares MAE/SwAV on GeoNet vs ImageNet with mIoU; includes a two-stage MAE-IN→GN condition. GLARE TMLR 2026 is a directly relevant continual-SSL-for-segmentation source.
404:3. STRUCTURAL: Row 25 overstated C-RADIOv4 as "no SSL auxiliary loss / entire signal teacher imitation" — MESA matches the student's own EMA on shifted crops, which IS a self-supervised regularizer (just not a MAE/DINO-style pretext).
405:4. STRUCTURAL: The central thesis "multi-teacher distillation is categorically different from SSL pretraining in the MAE/DINO sense" had no matrix row.
406:5. STRUCTURAL: The matrix was missing rows for BEiT v3 multimodal training and AIMv2 multimodal training, both required by the Spec.
408:7. STRUCTURAL: Throughline claim "natural-image SSL backbone produces low-signal features on this kind of data" was unsupported by any matrix row and partly contradicted by DINOv3's satellite results.
409:8. STRUCTURAL: The synthesis search behind rows 31, 32 was not exhaustive enough. DINOv3 alone invalidates row 31; Lahrichi 2025 and GLARE 2026 invalidate the confidence level of row 32.
413:- Spec one-paragraph summary rewritten to acknowledge DINOv3's satellite specialization and narrow the OOD claim to construction documents specifically.
414:- Throughline Act 1 description rewritten to a hypothesis tied to construction-document line-art specifically; explicit acknowledgment that DINOv3-satellite shows OOD adaptation can succeed.
415:- Row 25 (C-RADIOv4) reworded: "primary training signal is teacher feature imitation; the only self-supervised component is MESA's shift-equivariant matching against the student's own EMA, which is a self-equivariance regularizer rather than a MAE/DINO-style pretext."
416:- Row 31 reframed: OOD reporting is *uneven*; DINOv3 ships satellite specialization with Earth-observation numbers; Medical 3D MAE reports MRI-volume DSC; *no* canonical SSL paper reports construction-document or engineering-drawing transfer.
417:- Row 32 reframed: bake-offs DO exist for satellite (Lahrichi 2025) and continual-SSL semantic seg (GLARE 2026); none for construction documents specifically. Phase 7 must close this row with quoted excerpts before ship.
419:- Recency: foundational-stable annotations added to rows 10, 14, 15, 21, 22, 23, 24, 28; row 30 hedged to marginal pending Phase 7 re-check; row 32 explicitly DEFERRED to Phase 7 quote-fetch.
425:Findings: 4 STRUCTURAL, 1 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run2.md](./ssl-pretraining-recipes-codex-research-20260504-run2.md). Down from 8 STRUCTURAL on run 1.
427:**Findings (verbatim summary):**
429:1. STRUCTURAL: Row 32 not closed — quote-deferral failed the matrix contract; "satellite/medical" framing was wrong because the medical paper does not run continual SSL.
430:2. STRUCTURAL: Row 31 still false in the broader claim — DINOv3 Web reports LoveDA + DIOR + iSAID and that contradicts "the broader set remains confined to IN1K/ADE20K/COCO/iNat/Places/VTAB/video."
431:3. STRUCTURAL: Row 25 only half-fixed — C-RADIOv4's actual loss formulation is PHI-S-normalized squared-error spatial + angular-cone-normalized summary (the paper explicitly drops cosine for summary). The Headline finding still claimed "no SSL aux loss on student" which conflicts with the corrected MESA wording.
432:4. STRUCTURAL: Throughline Act 1 still asserted a thesis the matrix didn't yet support ("post will defend domain-adaptive SSL gives stronger fine-tuning starting point for sufficiently OOD domains").
437:- Dispatched a focused fetch agent to surface verbatim quotes from Lahrichi 2025, GLARE 2026 (arxiv:2509.17816v2), DINOv3 Table 19, and C-RADIOv4 §2.3.1 / §2.3.2 / §2.5.
438:- Row 32 closed with quoted excerpts from Lahrichi (verdict: "no consistent advantage to pre-training with GeoNet as compared to ImageNet") and GLARE (UDI→GLARE deltas: ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5). The "satellite/medical" framing dropped — Medical 3D MAE doesn't run continual SSL.
439:- Row 31 reframed: DINOv3 Web ViT-7B *favors natural-image SSL* on satellite (LoveDA 56.2 mIoU SOTA, DIOR 80.5 mAP SOTA; iSAID 71.4 < SkySense V2 71.9). The "broader set confined to IN1K → {…}" sub-claim removed.
440:- Row 25 corrected: spatial loss is squared error against PHI-S-normalized teacher outputs (Eq. 1 §2.3.1), summary loss is angular-cone-normalized (Eq. 7 §2.5; cosine explicitly dropped), MESA is shift-equivariant EMA matching of student against itself (Eq. 2 §2.3.2).
441:- Headline finding rewritten: removed "no SSL aux loss on student"; reframed multi-teacher distillation as a different *kind* of self-supervision (external teacher activations) rather than a pretext-derived one. Added a second Headline finding on domain transfer: published evidence (DINOv3 Web SOTA on satellite, Lahrichi's "no consistent advantage", GLARE's modest deltas) does not support a simple "domain-adaptive SSL beats natural-image SSL" thesis.
444:- Row 34 set to foundational-stable; marginal-debt-closure list updated.
450:Findings: 3 STRUCTURAL + 2 COSMETIC. Down from 8 → 4 → 3 STRUCTURAL across runs 1, 2, 3. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run3.md](./ssl-pretraining-recipes-codex-research-20260504-run3.md).
452:**Findings (verbatim summary):**
454:1. STRUCTURAL: Spec line 16 still promised "When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds" but the matrix doesn't support that specific comparison (DINOv3 reports Web-vs-Sat frozen-backbone transfer; GLARE Table 1 is UDI-init not DINOv3-init).
455:2. STRUCTURAL: Research-notes line 304-area "no canonical bake-off" sentence stale and contradicted row 32. Narrow to "no all-three-corners bake-off for construction documents specifically."
456:3. STRUCTURAL: Research-notes line 263-area "No SSL auxiliary loss on student" prose still stale, contradicting the corrected row 25 + revised Headline finding.
457:4. COSMETIC: Row 36 parenthetical too narrow ("corrupted view + reconstruction objective") — should be "reconstruction, invariance, or latent-prediction."
458:5. COSMETIC: Row 32 recency bookkeeping incorrect — Lahrichi 2025-02-15 is OUTSIDE the 12-month bar at pubDate 2026-05-04; should be foundational-stable for the historical claim.
462:- Spec "Reader walks away knowing" bullet rewritten: "The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (Lahrichi 2025; GLARE 2026) and what it does and doesn't tell us about construction documents."
463:- Research-notes "no all-three-corners bake-off" sentence narrowed to construction documents / engineering drawings specifically; satellite/medical answers explicitly named (DINOv3 Web, Lahrichi, GLARE, Medical 3D MAE, DiT).
464:- C-RADIOv4 prose section: stale "No SSL auxiliary loss on student" line removed; replaced with "No MAE/DINO/JEPA-style pretext task on the student. MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext." Loss equations updated to PHI-S spatial / angular-cone summary / MESA wording.
465:- Row 36 parenthetical broadened to "reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs."
466:- Row 32 recency: relabeled to foundational-stable for the Lahrichi historical-claim (the "no consistent advantage" verdict is a fixed recipe-comparison result that doesn't drift), with the 14-month-outside-bar fact stated explicitly.
483:| 2. Research / fact-check | in progress (Gate 0 firing) | `## Research notes`, `## Claim-source matrix` |
492:| Date | Gate | Outcome | Findings file |
501:2. Read NVIDIA's RADIO line papers myself (AM-RADIO, RADIOv2.5, C-RADIOv4) to verify whether they include any SSL auxiliary loss alongside teacher distillation, since this is a load-bearing claim of section 7.
503:4. Build the `## Claim-source matrix` from Phase 2 outputs.
504:5. Run Gate 0 (codex truthfulness pass) on the matrix.
508:1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
516:1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the claim-source matrix with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness.
519:4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final).

codex
The current notes already include the run-3 closure log, and the live file has the rewritten lines the user called out. I’m reading the file in chunks now so I can check the actual surrounding context, not just the grep hits.
exec
/bin/zsh -lc "nl -ba notes/ssl-pretraining-recipes.md | sed -n '1,140p'" in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc "nl -ba notes/ssl-pretraining-recipes.md | sed -n '141,280p'" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
   141	ADE20K mIoU 62.8 (Mask2Former + IN-21K intermediate fine-tuning). COCO box AP 63.7, mask AP 54.8 (Table 1). *Caveat: numbers use heavier task heads than MAE/BEiT v2 standards.*
   142	
   143	### Sub-topic: Self-distillation lineage
   144	
   145	**DINO** (arxiv:2104.14294v2, 2021-05-24). Caron et al., FAIR.
   146	
   147	> "Our study... underlines the importance of momentum encoder, multi-crop training, and the use of small patches with ViTs." — Abstract.
   148	
   149	> "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets." — Abstract. *This emergent-segmentation observation is the seed for treating the DINO line as the dense-feature SSL family.*
   150	
   151	ImageNet ViT-Base linear 80.1%, k-NN 78.3% (small ViT).
   152	
   153	**iBOT** (arxiv:2111.07832v3, 2022-01-27). Zhou et al.
   154	
   155	> "we perform self-distillation on masked patch tokens and take the teacher network as the online tokenizer, along with self-distillation on the class token to acquire visual semantics." — Abstract.
   156	
   157	> "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand." — Abstract.
   158	
   159	ADE20K: 38.3 (linear) / 50.0 (UperNet, ViT-B/16). COCO Cascade Mask R-CNN ViT-B/16: AP^b 51.2 / AP^m 44.2.
   160	
   161	**DINOv2** (arxiv:2304.07193v2, 2024-02-02). Oquab et al., Meta.
   162	
   163	Loss = DINO + iBOT + KoLeo regularizer (uniform feature span via Kozachenko-Leonenko entropy estimator) + Sinkhorn-Knopp centering (replaces DINO/iBOT softmax-centering). Heads untied between DINO and iBOT objectives.
   164	
   165	Dataset: LVD-142M built via deduplication and inverted-file-index retrieval from a 1.2B-image pile. ViT-g (1.1B params) distilled into smaller students.
   166	
   167	ADE20K linear ViT-g: 49.0 (single-scale), 53.0 (multi-scale).
   168	
   169	**DINOv2 with registers** (arxiv:2309.16588v2, 2024-04-12). Darcet et al.
   170	
   171	> "artifacts in feature maps of both supervised and self-supervised ViT networks. The artifacts correspond to high-norm tokens appearing during inference primarily in low-informative background areas of images, that are repurposed for internal computations." — Abstract.
   172	
   173	> "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)." — Quantification.
   174	
   175	> Artifacts emerge "after one third of training" and "only the three largest models exhibit outliers." All affected: DeiT-III (supervised), OpenCLIP (text-supervised), DINOv2 (self-supervised). Original DINO does not show them.
   176	
   177	Fix: 4 register tokens added after patch embedding, discarded at output. <2% FLOP increase. ADE20K linear DINOv2: 46.6 → 47.9 with registers. Object discovery (LOST corloc on VOC2007): 35.3 → 55.4 (+20.1).
   178	
   179	**DINOv3** (arxiv:2508.10104, 2025-08). Meta. **Critical entry — Gram anchoring is load-bearing for the post.**
   180	
   181	Failure mode that motivated Gram anchoring:
   182	
   183	> "a notable decline in performance on dense prediction tasks" during long training. Diagnosis: "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes."
   184	
   185	Gram anchoring loss:
   186	
   187	> ℒ_Gram = ‖X_S · X_S^⊤ − X_G · X_G^⊤‖_F²
   188	
   189	> "Compares the Gram matrix (all pairwise dot products) of student patch features against those from an earlier model, referred to as the Gram teacher... local features [are allowed] to move, provided the structure of similarities remains the same."
   190	
   191	Refinement-phase combined loss: ℒ_Ref = w_D · ℒ_DINO + ℒ_iBOT + w_DK · ℒ_DKoleo + w_Gram · ℒ_Gram.
   192	
   193	Dataset: LVD-1689M (≈1.7B images) via hierarchical k-means with balanced sampling, mixed with ImageNet-1k as 10% of batches. Largest model: ViT-7B (6.7B params) distilled into ViT-S/B/L students. ADE20K segmentation frozen backbone: **63.0 mIoU**. NYU depth RMSE: 0.281 (high-res Gram anchoring).
   194	
   195	### Sub-topic: JEPA family
   196	
   197	**I-JEPA** (arxiv:2301.08243v3, 2023-04-13). Assran et al., Meta.
   198	
   199	Architecture: context encoder θ (gradient), predictor ϕ (gradient), target encoder θ̄ (EMA of θ). Same image, different blocks. The predictor maps from context features to target features at given spatial positions.
   200	
   201	> "JEPAs do not seek representations invariant to a set of hand-crafted data augmentations, but instead seek representations that are predictive of each other." — vs DINO's invariance-to-augmentations bias.
   202	
   203	> "Compared to generative methods that predict in pixel/token space, I-JEPA makes use of abstract prediction targets for which unnecessary pixel-level details are potentially eliminated."
   204	
   205	> "predicting in pixel-space leads to a significant degradation in the linear probing performance." — empirical confirmation of the latent-space-is-better argument.
   206	
   207	> "a huge I-JEPA model (ViT-H/14) requires less compute than a small iBOT model (ViT-S/16)."
   208	
   209	ImageNet linear ViT-H/14 79.3%, ViT-H/16₄₄₈ 81.1%. Clevr/Count 86.7, Clevr/Dist 72.4 (vs DINO ViT-B/8 53.4, iBOT ViT-L/16 62.8). **No ADE20K mIoU reported.**
   210	
   211	**V-JEPA** (arxiv:2404.08471v1, 2024-02-15). Bardes et al., Meta. Spatiotemporal feature prediction on video. Kinetics-400 81.9%, SSv2 72.2%, ImageNet 77.9% from video-only pretraining. **No image dense-prediction transfer reported.**
   212	
   213	**V-JEPA 2** (arxiv:2506.09985v1, 2025-06-11). Two-phase: phase 1 mask-denoising feature prediction on VideoMix22M (22M samples / >1M hours) + 1M ImageNet; phase 2 action-conditioned post-training on 62 hours of robot videos. ViT-L 300M, ViT-H 600M, ViT-g 1B. ImageNet attentive probe ViT-g384 85.1%. **No image dense-prediction transfer reported.**
   214	
   215	### Sub-topic: Autoregressive image pretraining
   216	
   217	**iGPT** (Chen et al., ICML 2020). No arxiv ID; cite proceedings.mlr.press/v119/chen20s. Sequence Transformer trained AR on pixels, no 2D inductive bias. Trained at 32²/48²/64² resolutions due to sequence-length cost. iGPT-L 1.4B params, ImageNet linear ~72% (best-layer), CIFAR-10 linear 96.3%. **No dense-prediction transfer.**
   218	
   219	**AIM** (arxiv:2401.08541, 2024-01-16). El-Nouby et al., Apple.
   220	
   221	Prefix LM (not pure causal). Pixel target (normalized per-patch L2). Loss: min_θ (1/K) Σ ‖x̂_k(θ) − x_k‖₂².
   222	
   223	> "performance of the visual features scale with both the model capacity and the quantity of data" + "the value of the objective function correlates with the performance of the model on downstream tasks." — paper's main claim: pretraining loss is a usable proxy for downstream quality, like LLMs.
   224	
   225	Frozen attentive probe IN-1k: AIM-7B 82.4%, AIM-7B† (layer 20) 84.0%. **No ADE20K, COCO, or depth numbers.** AIM is a scaling-laws paper for *classification*, not dense prediction.
   226	
   227	**AIMv2** (arxiv:2411.14402v1, 2024-11-21). Multimodal causal AR (image patches then text tokens). AIMv2-3B@448 IN-1k 89.5%. Open-vocab COCO det 60.2 AP (vs DINOv2 60.1). **No dense semantic seg reported in body.**
   228	
   229	### Sub-topic: Multi-teacher distillation as pretraining
   230	
   231	**AM-RADIO** (arxiv:2312.06709v3, 2023-12, CVPR 2024). Ranzinger et al., NVIDIA.
   232	
   233	Loss formulation (no SSL on student):
   234	
   235	> Summary: L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))
   236	> Spatial: L_features(x) = Σ_i γ_i L_match(h_i^(v)(x'|Θ_i^(v)), t_i^(v)(x|Φ_i^(v)))
   237	> L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1
   238	
   239	Teachers (best published RADIOv1 config): DFN CLIP ViT-H/14, OpenAI CLIP ViT-L/14, DINOv2 ViT-g/14. SAM ViTDet-H in ablations.
   240	
   241	ADE20K mIoU (linear probe) RADIO-ViT-H/14: 50.32. COCO inst-seg as drop-in SAM replacement: 75.17–75.42.
   242	
   243	**RADIOv2.5** (arxiv:2412.07679v2, 2024-12, CVPR 2025). Heinrich, Ranzinger et al.
   244	
   245	Mode-switching pathology (load-bearing):
   246	
   247	> "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM." — §3.1.
   248	
   249	> Cause: "in the high-resolution regime the student only sees SAM features."
   250	
   251	Loss: L = Σ_t λ_t L_t, L_t = ℓ_s(ẑ_s^(t), z_s^(t)) + Σ_{i=1}^N ℓ_p(ẑ_p^(t,i), z_p^(t,i)). **No SSL auxiliary loss.** ADE20K mIoU: B 48.94, L 52.95, H 53.97, g 54.56 (Table 8).
   252	
   253	**C-RADIOv4** (arxiv:2601.17237v1, 2026-01-24). NVIDIA.
   254	
   255	Teachers: SigLIP2, DINOv3, SAM3 (paper-confirmed; specific variants like "SigLIP2-g-384, DINOv3-7B" appear in research summaries but my abstract-only WebFetch could not verify the variant suffixes — Phase 7 freshness pass should re-confirm).
   256	
   257	Loss formulation:
   258	
   259	> Spatial loss: L_spatial(x, ŷ) = (1/|Ω|) Σ_{u∈Ω} (𝓕_{S→T}[x]_u − ŷ_u)² with ŷ_u = PHI-S-normalized teacher output (Eq. 1, §2.3.1)
   260	> Summary loss (cosine explicitly dropped): L_angle(x, y) = Θ(x, y)² / Disp(Θ_y) (Eq. 7, §2.5)
   261	> MESA: L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)² — student matches its own EMA on shifted crops (Eq. 2, §2.3.2)
   262	
   263	**No MAE/DINO/JEPA-style pretext task on the student.** MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext — its role is stability + equivariance. C-RADIOv4-H ADE20K mIoU 55.20 at 512px.
   264	
   265	**PHI-S** (arxiv:2410.01680, 2024-10). Loss-balancing for multi-teacher distillation via Hadamard isotropic standardization.
   266	
   267	> "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices.
   268	
   269	> "PHI-S produces the best student model across the suite of methods studied"
   270	
   271	### Sub-topic: Domain-adaptive specialization
   272	
   273	**DiT** (arxiv:2203.02378, 2022-03). Microsoft. BEiT-style MIM on document images. Document layout PubLayNet 91.0 → 94.9 mAP, table detection ICDAR2019 cTDaR 94.23 → 96.55 F1, doc classification RVL-CDIP 91.11 → 92.69%. *Recipe details (DALL-E tokens, IIT-CDIP 42M corpus) are widely cited but I could not surface verbatim from the paper HTML in this Phase-2 pass — flagged for Phase 3 if recipe is quoted in prose.*
   274	
   275	**EVA-02** (arxiv:2303.11331, 2023-03). MIM target = EVA-CLIP features (feature-distillation-via-MIM, not pixel/token MIM). ADE20K ~61.7 mIoU_ss reported via search summaries; *direct Table 16 quote not surfaced — flagged.*
   276	
   277	**LayoutLMv3** (arxiv:2204.08387, 2022-04). MLM + masked image + word-patch alignment. **Not pure SSL** — requires OCR-extracted text alongside images. Listed for completeness; out of scope for vision-only SSL.
   278	
   279	**Donut** (arxiv:2111.15664, 2021-11). NAVER. "OCR-free VDU"; pretraining objective is cross-entropy on text outputs given synthetic document images. **Weakly supervised generative pretraining**, not SSL. Listed for completeness.
   280	

 succeeded in 0ms:
     1	# Self-supervised pretraining when your data isn't natural images
     2	
     3	## Spec
     4	
     5	**Slug:** `ssl-pretraining-recipes`
     6	**Working title:** "Self-supervised pretraining when your data isn't natural images"
     7	**Standalone post** (not a sequel to the vision trilogy, though it touches the same backbone landscape).
     8	**Topic-evolution classification:** actively-evolving — 12-month freshness bar applies. DINOv3 (Aug 2025), V-JEPA 2 (2025), C-RADIOv4 (Jan 2026), and ongoing JEPA / multi-teacher work all fall inside the bar.
     9	
    10	**One-paragraph summary.** A taxonomy of self-supervised pretraining recipes for vision backbones, organized around one practitioner-centric question: you have a large unlabeled corpus in a domain whose pretraining corpus the canonical SSL backbones (MAE on ImageNet, DINOv3 web on LVD-1689M, C-RADIOv4 on NV-CC-Img-Text) have not been trained on — construction documents, line drawings, scanned reports, niche scientific imagery — and a small labeled set for downstream **dense prediction (semantic + instance segmentation primary; detection secondary; layout/classification tertiary)**. Some natural-image-trained backbones DO ship domain-adapted variants (DINOv3 has a SAT-493M satellite specialization with Earth-observation benchmark numbers), but no analogous specialization exists for construction documents or line-art-heavy engineering drawings. Which SSL recipe gives the best fine-tuning starting point in that case, and is it better to train from scratch, continue-pretrain on top of a natural-image checkpoint, or run a hybrid? The post walks through seven recipe families, evaluates each against the dense-feature-quality lens, and closes with a recipe-selection decision tree gated on (corpus scale × domain distance from natural images × downstream task density). The motivating use case in the throughline is construction documents at a scale of several hundred thousand unlabeled + 10–20k labeled, but the decision tree generalizes.
    11	
    12	**Reader walks away knowing:**
    13	
    14	- The seven SSL recipe families and how each generates its training signal.
    15	- Why dense-feature quality is the load-bearing axis for segmentation downstreams (the "dense-feature collapse" failure mode generalized to recipe selection).
    16	- The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (satellite via Lahrichi 2025; cross-domain segmentation via GLARE 2026) and what it does and doesn't tell us about construction documents.
    17	- Where multi-teacher distillation (C-RADIOv4) fits and why it isn't a recipe you can use without teachers.
    18	- Where JEPA-style "predict in latent space" sits relative to MIM-style "predict in pixel/feature space."
    19	- A decision tree mapping (corpus scale, domain distance, task density) → recipe pick.
    20	
    21	**Audience.** ML practitioners with a domain-specific image corpus and a dense downstream task. Density bar: same as the trilogy. Assumes ViT, knows what dense features and CLS tokens are, hasn't necessarily implemented MAE.
    22	
    23	**Length:** ~35-min target read.
    24	
    25	**Figure mix:** start 100% static (trilogy convention). Two interactive candidates flagged for possible Phase 3 unlock if Gate 1 demands: mask-ratio sweep for MIM behavior, augmentation toggle for DINO behavior. Default-static unless the recipe's behavior genuinely requires sweep.
    26	
    27	**Recipe families to cover (seven plus a closing rung):**
    28	
    29	1. Pixel-reconstruction MIM — MAE, SimMIM, MIM-Refiner
    30	2. Feature-prediction MIM — MaskFeat (HOG), data2vec, data2vec 2.0
    31	3. Masked-token MIM — BEiT v1/v2/v3, PeCo
    32	4. Self-distillation — DINO, iBOT, DINOv2, DINOv2-with-registers, DINOv3 (Gram anchoring)
    33	5. JEPA family — I-JEPA, V-JEPA, V-JEPA 2
    34	6. Autoregressive image pretraining — iGPT, AIM
    35	7. Multi-teacher distillation as pretraining — AM-RADIO, RADIOv2.5, C-RADIOv4, PHI-S
    36	8. (Closing rung) Domain-adaptive specialization — DiT, EVA-02, document-AI variants. Phase 2 will pin specifics.
    37	
    38	Note on MEP: search returned no hit for "Masked Element Prediction" as a named method; closest is MaskFeat (Masked Feature Prediction). Vic deprioritized this confusion — covered as part of the feature-prediction MIM family, not as a stand-alone rung.
    39	
    40	## Throughline
    41	
    42	A single construction sheet (a floor plan or section detail — chosen at Phase 2) used as the persistent visual anchor through every recipe section. Each section asks the same three questions of its recipe:
    43	
    44	1. What training signal does the recipe extract from this sheet?
    45	2. Where does that signal break down on this kind of data (whitespace-heavy, line-art, low-color, repetitive symbols)?
    46	3. How does the recipe rank against the others on a downstream segmentation fine-tune?
    47	
    48	The persistent image gives every figure a concrete reference point. The closing decision tree is the deliverable.
    49	
    50	**Throughline rhythm.** The construction sheet appears in:
    51	- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes. Frame the open question: a natural-image SSL backbone has not been trained on construction-document line art; whether its features on this domain are usable as-is is empirically unclear. DINOv3's satellite specialization (SAT-493M) and the published continual-SSL-on-satellite comparisons (Lahrichi 2025, GLARE 2026) provide adjacent evidence. The post does **not** assert a generalized "domain-adaptive SSL beats zero-shot natural-image checkpoint for sufficiently OOD domains" thesis (that synthesis is not in the matrix). It explores the question for construction documents specifically, and the closing decision tree reflects what published recipes can and cannot tell us.
    52	- Act 2 (the recipes) — every recipe section walks through the three questions above with the sheet as the example.
    53	- Act 3 (the verdict) — the recipe-selection decision tree, with the sheet shown landing at one specific terminal node, while the other terminals are labeled with the data shapes that route there (medical, satellite, etc.).
    54	
    55	## Research notes
    56	
    57	Phase 2 research, dispatched as three parallel subagents covering (a) MIM family, (b) self-distillation + JEPA + AR, (c) multi-teacher distillation + domain-adaptive. Plus my own focused fetch on C-RADIOv4 to verify the SSL-aux-loss question. All quotes below are from primary sources — arxiv papers, paper HTML mirrors, or NVIDIA tech reports.
    58	
    59	### Headline finding for the post
    60	
    61	**The RADIO lineage's primary supervision signal is teacher feature imitation, not a MAE/DINO/contrastive pretext.** Across AM-RADIO (2312.06709), RADIOv2.5 (2412.07679), and C-RADIOv4 (2601.17237), the student is primarily trained to match teacher features. AM-RADIO uses cosine + smooth-L1 spatial losses with cosine summary; RADIOv2.5 introduces PHI-S loss balancing; C-RADIOv4 uses PHI-S-normalized squared-error spatial loss, drops cosine for an angular-cone-normalized summary loss, and adds MESA (shift-equivariant EMA matching). **MESA is a self-supervised regularizer** — student matches its own EMA on shifted crops — but it is not a MAE/DINO-style masked-prediction or contrastive pretext task. **The categorical observation:** multi-teacher distillation occupies a different position in the SSL recipe taxonomy than pretext-derived SSL — supervision shape is external (teacher activations) rather than pretext-derived (corrupted-view + reconstruction or invariance objective). This is load-bearing for the multi-teacher rung and is a different *kind* of self-supervision, not "not SSL".
    62	
    63	### Headline finding on domain transfer
    64	
    65	**Recent published evidence suggests natural-image SSL transfers surprisingly well to satellite imagery — the "domain-adaptive SSL strictly beats natural-image SSL" intuition does not hold uniformly.** DINOv3 Web ViT-7B (frozen, no satellite fine-tune) sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (its own satellite specialization) and prior satellite-specialized models on those tasks. Lahrichi et al. 2025 directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks and reported "no consistent advantage to pre-training with GeoNet as compared to ImageNet." GLARE (TMLR-formatted submission, arxiv:2509.17816, Jan 2026) reports modest +0.2 to +0.6 mIoU continual-pretraining gains on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA. **For construction documents specifically, no analogous published comparison exists.** The post explores what the recipe taxonomy can and cannot tell us in that absence; it does not assert a generalized continual-pretraining-wins thesis.
    66	
    67	### Sub-topic: Pixel-reconstruction MIM
    68	
    69	**MAE** (arxiv:2111.06377v3, 2021-12-19; v1 2021-11-11). He et al., FAIR.
    70	
    71	> "It is based on two core designs. First, we develop an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens), along with a lightweight decoder that reconstructs the original image from the latent representation and mask tokens. Second, we find that masking a high proportion of the input image, e.g., 75%, yields a nontrivial and meaningful self-supervisory task." — Abstract.
    72	
    73	> "Our loss function computes the mean squared error (MSE) between the reconstructed and original images in the pixel space. We compute the loss only on masked patches, similar to BERT." — §3, Reconstruction target.
    74	
    75	ADE20K mIoU (UperNet, IN1K-pretrained): ViT-B 48.1; ViT-L 53.6 (Table 5). COCO Mask R-CNN: ViT-B AP^box 50.3 / AP^mask 44.9; ViT-L AP^box 53.3 / AP^mask 47.2 (Table 4).
    76	
    77	Limitation acknowledged in §6: "Images are merely recorded light without a semantic decomposition into the visual analogue of words. Instead of attempting to remove objects, we remove random patches that most likely do *not* form a semantic segment. Likewise, our MAE reconstructs pixels, which are *not* semantic entities."
    78	
    79	**SimMIM** (arxiv:2111.09886v1, 2021-11-18). Xie et al., MSRA.
    80	
    81	> "1) random masking of the input image with a moderately large masked patch size (e.g., 32) makes a strong pre-text task; 2) predicting raw pixels of RGB values by direct regression performs no worse than the patch classification approaches with complex designs; 3) the prediction head can be as light as a linear layer, with no worse performance than heavier ones." — Abstract.
    82	
    83	> "We adopt a masking ratio of 0.6 on patch size of 32 by default, due to its stable performance." — §4.1.2.
    84	
    85	> "The effects to other more fine-grained down-stream tasks such as object detection or semantic segmentation will be explored in our future study." — §4.1.4. *SimMIM defers ViT-scale dense-prediction transfer.*
    86	
    87	The paper's headline 59.9 mIoU on ADE20K is from **SwinV2-G 3B-parameter co-trained variant**, not standalone SimMIM ViT-B/L.
    88	
    89	**MIM-Refiner** (arxiv:2402.10093v4, 2025-02-20, ICLR 2025). Alkin et al.
    90	
    91	The block-regime analysis is the cleanest published explanation of why off-the-shelf MAE features underperform on dense tasks:
    92	
    93	> "1. In early ViT blocks, general purpose features are learned, which improve the reconstruction loss and the k-NN accuracy simultaneously. 2. In middle ViT blocks, abstractions are formed. The reconstruction loss improves only slightly, while the k-NN accuracy improves drastically. 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases." — §2.
    94	
    95	> "As models increase in size, the decoder eventually reaches a point where it cannot further improve the pre-training objective on its own. Consequently, it begins to delegate a portion of the reconstruction task back to the last encoder blocks. This transfer adversely affects the feature quality for downstream tasks associated with those blocks." — §2.
    96	
    97	ADE20K linear probe: MAE-Refined ViT-L/16 37.3, MAE-Refined ViT-H/14 39.4, MAE-Refined ViT-2B/14 40.3 (Table 4). Full UperNet ADE20K: D2V2 ViT-L/16 54.4 (Table 5).
    98	
    99	### Sub-topic: Feature-prediction MIM
   100	
   101	**MaskFeat** (arxiv:2112.09133v2, 2023-01-12; v1 2021-12-16). Wei et al., FAIR. *Closest hit to the user's "MEP" term.*
   102	
   103	> "We present Masked Feature Prediction (MaskFeat) for self-supervised pre-training of video models... We study five different types of features and find Histograms of Oriented Gradients (HOG), a hand-crafted feature descriptor, works particularly well in terms of both performance and efficiency." — Abstract.
   104	
   105	> "(ii) The discretization (tokenization) of visual signals is not necessary for masked visual prediction, and continuous *feature regression* (i.e. MaskFeat) can work well." — §1.
   106	
   107	> "(iii) Semantic knowledge from human annotations is not always helpful for MaskFeat, but characterizing local patterns seems important. For example, predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance." — §1.
   108	
   109	**No image dense-prediction transfer is reported by the paper.** Image transfer is ImageNet classification only (ViT-B 84.0 / ViT-L 85.7 at 1600 epochs). Headline numbers are video (Kinetics-400 86.7%, AVA action detection 39.8 mAP).
   110	
   111	**data2vec** (arxiv:2202.03555v3, 2022-10-25). Baevski et al., FAIR.
   112	
   113	> "The core idea is to predict latent representations of the full input data based on a masked view of the input in a self-distillation setup using a standard Transformer architecture. Instead of predicting modality-specific targets such as words, visual tokens or units of human speech which are local in nature, data2vec predicts contextualized latent representations that contain information from the entire input." — Abstract.
   114	
   115	Loss: Smooth L1 on the average of the top K teacher-network FFN block outputs at masked positions, where the teacher is an EMA of the student. ImageNet ViT-B 84.2, ViT-L 86.6 (Table 1). **No image dense-prediction transfer reported.**
   116	
   117	> "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low which leads to student model collapse and is then propagated to the teacher. Third, we found collapse to be more likely for modalities where adjacent targets are very correlated and where longer spans need to be masked, e.g., speech." — §6.
   118	
   119	**data2vec 2.0** (arxiv:2212.07525v2, 2023-06-15). Same family, efficiency-focused. ImageNet ViT-L 86.8 in 16.4× lower training time than MAE. **No dense-prediction transfer reported.**
   120	
   121	### Sub-topic: Masked-token MIM
   122	
   123	**BEiT v1** (arxiv:2106.08254v2, 2022-09-03; v1 2021-06-15). Bao et al., MSRA.
   124	
   125	> "We first 'tokenize' the original image into visual tokens. Then we randomly mask some image patches and fed them into the backbone Transformer. The pre-training objective is to recover the original visual tokens based on the corrupted image patches." — Abstract.
   126	
   127	Tokenizer = DALL-E's pretrained dVAE (vocabulary 8192). Block-wise masking, 40% mask ratio. ADE20K SETR-PUP: ViT-B 45.6, ViT-B with intermediate fine-tuning 47.7 (Table 3).
   128	
   129	Ablation (Table 4): predicting pixels with the BEiT recipe drops ADE20K 44.65 → 41.38, supporting "tokens > pixels" *when other recipe choices favor tokens*.
   130	
   131	**BEiT v2** (arxiv:2208.06366v2, 2022-10-03). Peng et al.
   132	
   133	VQ-KD tokenizer trained by knowledge-distilling CLIP features. ADE20K UperNet ViT-B 53.1 (1600 epochs), ViT-L 56.7 (1600 epochs) — paper's main strength is dense prediction.
   134	
   135	> "After quantizing the image to visual tokens, we feed the ℓ₂-normalized codebook embeddings to the decoder... The output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP. During training, we maximize the cosine similarity between the decoder output o_i and the teacher guidance t_i." — §2.2.
   136	
   137	Crucial: BEiT v2's tokenizer is itself distilled from CLIP, so BEiT v2 inherits CLIP's web-pretraining (often glossed in headline comparisons).
   138	
   139	**BEiT v3** (arxiv:2208.10442v2, 2022-08-31). Multiway transformer with shared self-attention, masked modeling on images, text, and image-text pairs.
   140	

exec
/bin/zsh -lc "nl -ba notes/ssl-pretraining-recipes.md | sed -n '281,420p'" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
   281	**Medical 3D MAE** (arxiv:2410.23132, 2024-10). 39,168 unlabeled 3D brain MRI volumes; MAE with sparsification on a Residual Encoder U-Net within nnU-Net.
   282	
   283	> "the first work to demonstrate that SSL pretraining with a fixed architecture can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline"
   284	
   285	> "surpasses previous SSL methods but also outperforms the strong nnU-Net baseline by an average of approximately 3 Dice points"
   286	
   287	S3D average DSC 72.37 vs no-pretraining nnU-Net 70.40 (Δ ≈ +1.97 DSC). *Compares from-scratch SSL on the medical domain vs from-scratch supervised. Does not compare to continual SSL on a natural-image checkpoint.*
   288	
   289	**SatMAE** (arxiv:2207.08051, NeurIPS 2022). MAE with temporal patch masking and spectral positional encodings on fMoW. "Up to ↑ 7%" supervised benchmarks, "up to ↑ 14%" land cover classification transfer. *Specific deltas not surfaced in this pass.*
   290	
   291	### Sub-topic: Continual SSL pretraining (cross-cutting gap)
   292	
   293	The literature does not contain a canonical bake-off study comparing all three corners of the question that motivates this post:
   294	- (a) From-scratch SSL on a new domain
   295	- (b) Continual SSL on a natural-image checkpoint
   296	- (c) Zero-shot fine-tune from a natural-image checkpoint
   297	
   298	Domain-adaptive SSL papers (DiT, SatMAE, Medical 3D MAE) tend to compare (a) vs (a-supervised); they generally do not include (b) as a head-to-head condition. Pointer-only sources surfaced in the sweep:
   299	
   300	- arxiv:2503.02844 ("Beyond Cosine Decay: On the effectiveness of Infinite Learning Rate Schedule for Continual Pre-training", 2025) — directly studies continual SSL with MAE, summary says "CPT mitigates catastrophic forgetting." *Pointer; not directly fetched.*
   301	- arxiv:2410.18677 ("Enhancing pretraining efficiency for medical image segmentation via transferability metrics", 2024) — summary suggests an intermediate continual-pretraining sweet spot. *Pointer.*
   302	- arxiv:2502.18056 ("Escaping the big data paradigm in self-supervised representation learning", 2025) — for narrow target domains, in-domain SSL on tiny corpora can rival ImageNet-init at much smaller scale. Classification-only. *Pointer.*
   303	
   304	**This gap itself is a finding worth surfacing in the post**: there is no canonical "domain-adaptive SSL bake-off" with dense-prediction numbers. Practitioners are working in the absence of clean comparative benchmarks.
   305	
   306	### Sub-topic: The OOD-domain transfer matrix
   307	
   308	OOD-domain transfer reporting in the covered set is uneven and partly favors natural-image SSL more than the early framing assumed. **DINOv3 (2025-08, §8.3, Tables 18 & 19) reports satellite-domain transfer for both DINOv3 Web (no satellite fine-tune) and DINOv3 Sat-493M (satellite specialization).** DINOv3 Web ViT-7B sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating DINOv3 Sat-493M and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. DINOv3 explicitly cites Lahrichi 2025 in support: "domain-agnostic pretraining can offer strong generalization even in specialized downstream domains."
   309	
   310	**Lahrichi 2025 (arxiv:2502.10669) directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks** and reports "no consistent advantage to pre-training with GeoNet as compared to ImageNet." Two-stage MAE-IN-GN beats from-scratch MAE-GN on 5 of 6 benchmarks but the advantage is modest (1-2%).
   311	
   312	**GLARE (arxiv:2509.17816v2, 2026-01-29) reports modest +0.2 to +0.6 mIoU continual-pretraining gains** on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA at ViT-S/16.
   313	
   314	**Medical 3D MAE (arxiv:2410.23132)** reports MRI-volume DSC +1.97 on average over a non-pretrained nnU-Net. *The medical paper does not compare to continual SSL on a natural-image checkpoint.*
   315	
   316	The other canonical SSL papers in the covered set (MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v2-with-registers, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, AM-RADIO/RADIOv2.5/C-RADIOv4) confine their reported transfer to IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain. **No published all-three-corners bake-off (from-scratch SSL on domain vs continual SSL from natural-image SSL vs zero-shot fine-tune from natural-image SSL) exists for construction documents or engineering drawings specifically.** Satellite/medical answers come from DINOv3 Web's frozen-backbone results, Lahrichi 2025, GLARE 2026, Medical 3D MAE, and DiT for documents; whether their conclusions generalize to line-art-heavy construction documents is not established and is the post's open question.
   317	
   318	### Cross-method ADE20K mIoU summary (where reported)
   319	
   320	ViT-L IN1K-pretrained, UperNet head:
   321	- MAE 53.6
   322	- BEiT v1 53.3 (800 ep)
   323	- BEiT v2 56.7 (1600 ep)
   324	- D2V2-Refined (MIM-Refiner) 54.4
   325	
   326	ViT-B IN1K-pretrained, UperNet head:
   327	- MAE 48.1
   328	- BEiT v1 45.6
   329	- BEiT v2 53.1
   330	- iBOT 50.0
   331	- CAE 50.2
   332	
   333	Frozen-backbone (linear or DPT-style):
   334	- DINOv2 ViT-g 53.0 (multi-scale)
   335	- DINOv3 ViT-7B **63.0** ← highest reported in the dataset
   336	
   337	Multi-teacher distillation:
   338	- RADIOv2.5-g 54.56
   339	- C-RADIOv4-H 55.20
   340	
   341	These numbers are the empirical spine of section "Where each recipe lands on dense prediction." They will be tabulated in a figure.
   342	
   343	## Claim-source matrix
   344	
   345	Every load-bearing claim the post will make has a row here with a quoted primary source and a recency status.
   346	
   347	| # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID (arxiv / URL + date) | Recency status |
   348	|---|---|---|---|---|
   349	| 1 | MAE uses an asymmetric encoder/decoder where the encoder operates only on the visible (~25%) subset of patches, with mask ratio 75% | "an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens)... masking a high proportion of the input image, e.g., 75%" | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
   350	| 2 | MAE achieves ADE20K mIoU 53.6 with ViT-L (UperNet, IN1K-pretrained) | "MAE / IN1K: ViT-B 48.1, ViT-L 53.6" — Table 5 | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
   351	| 3 | SimMIM uses 60% mask ratio with 32×32 patches and a single linear prediction head | "we adopt a masking ratio of 0.6 on patch size of 32 by default... the prediction head can be made extremely lightweight, as light as a linear layer" | arxiv:2111.09886v1 (2021-11-18) | stable foundational / passes |
   352	| 4 | MaskFeat predicts HOG features at masked positions and shows that semantic-feature targets (from supervised CNNs/ViTs) degrade performance | "Histograms of Oriented Gradients (HOG)... works particularly well... Semantic knowledge from human annotations is not always helpful for MaskFeat... predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance" | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
   353	| 5 | MaskFeat does not report image dense-prediction transfer (ADE20K / COCO seg) | Image transfer in the paper is ImageNet classification only; video transfers are AVA/SSv2. "MaskFeat opens the door for directly pre-training on unlabeled videos." | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
   354	| 6 | data2vec and data2vec 2.0 do not report image dense-prediction transfer | data2vec evaluates ImageNet-1K + Librispeech + GLUE only; data2vec 2.0 same | arxiv:2202.03555v3 (2022-10-25); arxiv:2212.07525v2 (2023-06-15) | stable foundational / passes |
   355	| 7 | data2vec is vulnerable to representation collapse; the paper documents three failure modes | "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low... Third, ... longer spans need to be masked" | arxiv:2202.03555v3 (2022-10-25) | stable foundational / passes |
   356	| 8 | BEiT v1 uses DALL-E's pretrained dVAE tokenizer (vocab 8192) as targets | "we directly use the publicly available image tokenizer described in [Ramesh et al. 2021]"; "vocabulary size of visual tokens is 8192" | arxiv:2106.08254v2 (2022-09-03) | stable foundational / passes |
   357	| 9 | BEiT v2 trains a VQ-KD tokenizer by knowledge-distilling CLIP/DINO features and achieves ADE20K mIoU 53.1 (ViT-B) / 56.7 (ViT-L) at 1600 epochs | "the output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP"; "BEiT v2 (ours), 1600 epochs: ImageNet 85.5, ADE20K 53.1... ViT-L: ImageNet 87.3, ADE20K 56.7" | arxiv:2208.06366v2 (2022-10-03) | stable foundational / passes |
   358	| 10 | MIM-Refiner identifies the three-block-regime structure of MIM-pretrained encoders: early=general, middle=abstractions (k-NN peaks), late=reconstruction-prep (k-NN drops) | "1. In early ViT blocks, general purpose features are learned... 2. In middle ViT blocks, abstractions are formed... 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases" | arxiv:2402.10093v4 (2025-02-20) | actively-evolving / 12-month bar / foundational-stable — block-regime analysis is a structural/analytical contribution about MIM encoders; not a time-sensitive benchmark number |
   359	| 11 | DINO observed that self-supervised ViT features carry explicit segmentation information that doesn't emerge in supervised ViTs or convnets | "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets" | arxiv:2104.14294v2 (2021-05-24) | stable foundational / passes |
   360	| 12 | iBOT uses the teacher network as an online tokenizer for masked-patch prediction, dispensing with a pretrained tokenizer | "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand" | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
   361	| 13 | iBOT achieves ADE20K mIoU 50.0 with UperNet at ViT-B/16 | "iBOT advances previous best methods DINO by 3.2 on mIoU with UperNet" — paper Table 5 | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
   362	| 14 | DINOv2's loss combines DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on a curated 142M-image dataset (LVD-142M) | "DINO loss... iBOT loss... KoLeo regularizer... [we] replace the teacher softmax-centering step of DINO and iBot by the Sinkhorn-Knopp (SK) batch normalization" + LVD-142M curation pipeline | arxiv:2304.07193v2 (2024-02-02) | foundational-stable — DINOv2 loss composition is the recipe definition; the post uses it as a reference, not as a fresh benchmark claim |
   363	| 15 | DINOv2 has high-norm token artifacts (~10× higher norm, ~2% of tokens) appearing in low-information background regions; registers fix them with <2% FLOP overhead | "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)"; "we explicitly add new tokens to the sequence, that the model can learn to use as registers... <2% FLOP increase" | arxiv:2309.16588v2 (2024-04-12) | foundational-stable — registers are an established architectural fix referenced by DINOv3 (rows 16-18, 2025-08); the artifact diagnosis is the load-bearing analytical content |
   364	| 16 | DINOv3 introduces Gram anchoring as a regularizer on patch–patch similarity geometry: ℒ_Gram = ‖X_S X_S⊤ − X_G X_G⊤‖_F² | Body of paper, refinement-phase loss. | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   365	| 17 | Without Gram anchoring, long DINO/iBOT training shows patch-feature locality decay (cosine sim between CLS and patches grows) | "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   366	| 18 | DINOv3 ViT-7B achieves ADE20K mIoU 63.0 with frozen backbone | "ADE20K segmentation (frozen backbone): mIoU 63.0" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   367	| 19 | I-JEPA predicts in latent space (target encoder = EMA of context encoder), not pixel/token space; pixel-space prediction empirically degrades linear probe | "by predicting in representation space, I-JEPA produces semantic representations while using less compute"; "predicting in pixel-space leads to a significant degradation in the linear probing performance" | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
   368	| 20 | I-JEPA does not report ADE20K mIoU; transfer benchmarks are classification + Clevr-Count/Dist | Body of paper. | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
   369	| 21 | AIM uses prefix-LM (sampled prefix length S, bidirectional within prefix, AR loss on rest) with normalized-pixel L2 target | "we uniformly sample a prefix length S. The attention for the first S patches are set to be bidirectional and loss is only computed for the remaining patches" + L2 loss on normalized pixels | arxiv:2401.08541 (2024-01-16) | foundational-stable — AIM's prefix-LM recipe is the origin definition for the AR-vision branch; AIMv2 (row 34, 2024-11) is the recent extension |
   370	| 22 | AIM does not report ADE20K, COCO, or depth transfer numbers (classification-only) | Body of paper; 15 classification benchmarks evaluated, no dense-prediction numbers | arxiv:2401.08541 (2024-01-16) | foundational-stable — same as row 21 |
   371	| 23 | AM-RADIO student is trained with no SSL auxiliary loss; the entire signal is teacher feature imitation (cosine + smooth L1 on spatial, cosine on summary) | "L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))"; "L_features... L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1" — and no SSL pretext mentioned | arxiv:2312.06709 (current arxiv version v5 revised 2024-04-30) | actively-evolving / 12-month bar / foundational-stable — AM-RADIO's loss formulation is foundational for the RADIO line; the "no SSL aux loss on student" architectural decision is the recipe's defining choice and doesn't drift with arxiv revisions. C-RADIOv4 row 25 (2026-01) is the recent corroboration for the lineage claim. |
   372	| 24 | RADIOv2.5 diagnoses the "mode-switching" pathology where features behave like DINOv2 at ≤512² and like SAM at higher resolutions | "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM"; "in the high-resolution regime the student only sees SAM features" | arxiv:2412.07679v2 (2025-02-09) | actively-evolving / 12-month bar / foundational-stable — mode-switching is an analytical diagnosis specific to the RADIO architecture; the diagnosis is the load-bearing content, not a benchmark number that drifts. |
   373	| 25 | C-RADIOv4's primary spatial loss is squared error against PHI-S-normalized teacher outputs (NOT cosine + smooth-L1, which is the AM-RADIO formulation). The summary loss is angular-cone-normalized (Θ²/Disp) — the paper explicitly states "we no longer use cosine distance as our summary loss." MESA is a self-supervised shift-equivariant regularizer where the student matches its own EMA on shifted crops (not a teacher); it is not a MAE/DINO-style pretext. | "we adopt a new loss formulation as follows: L_spatial(x, ŷ) = (1/|Ω|) Σ (𝓕_{S→T}[x]_u − ŷ_u)²" with "ŷ_u [is] the PHI-S normalized teacher output" — Eq. 1 §2.3.1; "we no longer use cosine distance as our summary loss, and instead adopt the following: L_angle(x, y) = Θ(x, y)² / Disp(Θ_y)" — Eq. 7 §2.5; "L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)²" with "matching the exponential moving average (EMA) of the student model, but with the added twist of introducing different crops for the student and its EMA" — Eq. 2 §2.3.2 | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
   374	| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
   375	| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
   376	| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / foundational-stable — Hadamard standardization is a technique definition referenced by C-RADIOv4 (2026-01); the underlying mathematical recipe doesn't drift |
   377	| 29 | DiT applies BEiT-style MIM to document images and reports PubLayNet 91.0→94.9, ICDAR2019 cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69 | Reported headline numbers from arxiv:2203.02378 abstract. *Recipe specifics (DALL-E tokens, IIT-CDIP 42M corpus) flagged for Phase 3 re-fetch if quoted in prose.* | arxiv:2203.02378 (2022-03) | stable / 18-month bar fails (4 years old); foundational for the document-domain framing — flag as marginal-stable. |
   378	| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / marginal — Oct 2024, 19 months. Hedge in prose: "as of late 2024 the medical-MAE result was published; newer dense-medical comparisons may exist by pubDate." Phase 7 to re-check. |
   379	| 31 | OOD-domain transfer reporting in canonical SSL papers is uneven and partly *favors natural-image SSL*: DINOv3 Web ViT-7B (frozen, no satellite-specific fine-tune) reports state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (the satellite specialization) and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. Medical 3D MAE reports MRI-volume DSC for the medical case. **No canonical SSL paper reports transfer to construction-document or engineering-drawing domains.** | "We compare the performance of different methods for Earth observation tasks ... The frozen DINOv3 satellite and web models set new state-of-the-art results on 12 out of 15 classification, segmentation, and horizontal object detection tasks ... the frozen DINOv3 web model establishes new leading results [on] Geo-Bench tasks as well as for segmentation and detection tasks on the LoveDA and DIOR datasets" — DINOv3 §8.3, Tables 18 & 19; Table 19 numbers: DINOv3 Web ViT-7B LoveDA 56.2 / iSAID 71.4 / DIOR 80.5 vs Prev. SotA 54.4 / 71.9 / 79.5. | DINOv3 arxiv:2508.10104 (2025-08); Medical 3D MAE arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / DINOv3 passes; Medical 3D MAE foundational-stable for the medical-MAE comparison |
   380	| 32 | Published from-scratch-SSL vs from-natural-image-SSL bake-offs with dense-prediction numbers do exist for satellite (Lahrichi 2025) and for continual-SSL semantic segmentation across natural + satellite domains (GLARE 2026). The published verdict is **NOT** "domain-adaptive SSL clearly wins": Lahrichi found "no consistent advantage to pre-training with GeoNet as compared to ImageNet" across six benchmarks; GLARE's gains on top of UDI initialization are modest (+0.2 to +0.6 mIoU). **No analogous bake-off exists for construction documents or engineering drawings specifically.** | Lahrichi: "we pre-train models on ImageNet and GeoNet, respectively, using two different SSL pre-training strategies: SwAV and MAE" — §5; "the results showed no consistent advantage to pre-training with GeoNet as compared to ImageNet, regardless of whether SwAV or MAE was used" — §8 Conclusions; "MAE-IN-GN outperforms the MAE-GN on five of the six downstream benchmarks, however, the performance advantage in each of these cases is modest (usually 1-2%)" — §6. GLARE: "Given an encoder trained via SSL ... we are interested in improving the output feature embedding by training only the adapter parameters θA via SSL" — §4; "GLARE continual pre-training from UDI consistently shows improvements over the other pre-training strategies" — Table 1 caption; UDI→GLARE deltas (ViT-S/16): ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5. | Lahrichi arxiv:2502.10669v1 (2025-02-15); GLARE arxiv:2509.17816v2 (2026-01-29) | actively-evolving / 12-month bar / Lahrichi 2025-02-15 is OUTSIDE the strict 12-month bar (14 months at pubDate 2026-05-04) — foundational-stable for the historical "Lahrichi found X" claim, since "no consistent advantage" is a recipe-comparison verdict that doesn't drift with paper revisions; GLARE 2026-01-29 passes the bar |
   381	| 33 | BEiT v3 trains via masked data modeling on images, text, AND image-text pairs in a unified objective (Multiway Transformer with shared self-attention) — multimodal SSL, not vision-only. | "we perform masked 'language' modeling on images (Imglish), texts (English), and image-text pairs ('parallel sentences') in a unified manner" — Abstract | arxiv:2208.10442v2 (2022-08-31) | stable foundational / passes |
   382	| 34 | AIMv2 trains via causal multimodal autoregression: image patches first, then text tokens — image-text supervision, not vision-only SSL. | "a causal multimodal decoder that first regresses image patches and then decodes text tokens in an autoregressive manner" — Abstract | arxiv:2411.14402v1 (2024-11-21) | foundational-stable — AIMv2's recipe definition is the load-bearing claim; ~18 months puts it past the strict 12-month bar but the recipe-classification claim doesn't drift |
   383	| 35 | Across the published RADIO line (AM-RADIO 2023 → RADIOv2.5 2024 → C-RADIOv4 2026), the student's primary supervision is teacher feature imitation, not a MAE/DINO-style self-supervised pretext. The only "self-supervised" component is C-RADIOv4's MESA (shift-equivariant EMA matching) which functions as a self-equivariance regularizer, not as a primary pretext task. | Cross-paper synthesis grounded in row 23 (AM-RADIO loss formulation), row 24 (RADIOv2.5 loss formulation), row 25 (C-RADIOv4 + MESA). | Synthesis row pointing to arxiv:2312.06709 + arxiv:2412.07679 + arxiv:2601.17237. | actively-evolving / 12-month bar / passes via row 25 (C-RADIOv4, 2026-01) |
   384	| 36 | The post's central thesis "multi-teacher distillation occupies a different position in the SSL recipe taxonomy than MAE/DINO/JEPA-style pretext-derived SSL" is supported by row 35 (cross-RADIO loss-formulation observation) — the supervision shape is categorically external (teacher activations) rather than pretext-derived (reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs). The post should not claim "multi-teacher distillation is not SSL"; rather, it is a different *kind* of self-supervision whose label-source is another model's outputs. | Synthesis claim grounded in row 35 + every primary SSL row. | Synthesis claim. | actively-evolving / passes via row 35 |
   385	
   386	**Marginal-row debt closure (post-Gate-0-fix-v2).** Row-32 deferral lifted with quoted excerpts from Lahrichi 2025 and GLARE 2026. Remaining marginal:
   387	
   388	- **Row 30** (Medical 3D MAE, 19 months old): hedged in prose. Phase 7 to re-check whether newer medical-MAE comparisons land before pubDate.
   389	
   390	Foundational-stable annotations applied to rows 10, 14, 15, 21, 22, 23, 24, 28, 32 (Lahrichi only — GLARE passes), 34 — recent papers whose load-bearing content is a technique definition or a recipe-classification claim that doesn't drift with arxiv revisions.
   391	
   392	Foundational-source annotations applied to: MAE 2021 (rows 1, 2), SimMIM 2021 (row 3), MaskFeat 2021/2023 (rows 4, 5), data2vec 2022 (rows 6, 7), BEiT v1 2021 (row 8), BEiT v2 2022 (row 9), DINO 2021 (row 11), iBOT 2021 (rows 12, 13), I-JEPA 2023 (rows 19, 20). These are the origin papers for the recipes; the recipe definitions are stable references.
   393	
   394	Active sources within the 12-month bar (passing on date): DINOv3 (rows 16, 17, 18, 31; 2025-08), C-RADIOv4 (rows 25, 26, 27; 2026-01-24), GLARE (row 32; 2026-01-29).
   395	
   396	## Codex research review
   397	
   398	**Gate 0 run 1, 2026-05-04.** Findings: 8 STRUCTURAL, 0 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504.md](./ssl-pretraining-recipes-codex-research-20260504.md).
   399	
   400	**Summary of findings (codex's verbatim summary at end of findings file):**
   401	
   402	1. STRUCTURAL: Row 31 was false. DINOv3 paper has a geospatial section (SAT-493M, Geo-Bench, LoveDA, iSAID, DIOR segmentation/detection numbers); the "no canonical SSL paper reports OOD transfer" claim was wrong. Spec/Throughline claim "DINOv3 has never seen satellite imagery" was also wrong.
   403	2. STRUCTURAL: Row 32's absence claim was false. Lahrichi et al. 2025 directly compares MAE/SwAV on GeoNet vs ImageNet with mIoU; includes a two-stage MAE-IN→GN condition. GLARE TMLR 2026 is a directly relevant continual-SSL-for-segmentation source.
   404	3. STRUCTURAL: Row 25 overstated C-RADIOv4 as "no SSL auxiliary loss / entire signal teacher imitation" — MESA matches the student's own EMA on shifted crops, which IS a self-supervised regularizer (just not a MAE/DINO-style pretext).
   405	4. STRUCTURAL: The central thesis "multi-teacher distillation is categorically different from SSL pretraining in the MAE/DINO sense" had no matrix row.
   406	5. STRUCTURAL: The matrix was missing rows for BEiT v3 multimodal training and AIMv2 multimodal training, both required by the Spec.
   407	6. STRUCTURAL: Recency status was wrong on rows 10, 24, 28, 30 (and row 23 just outside bar) — marked "passes" without foundational-exemption annotation.
   408	7. STRUCTURAL: Throughline claim "natural-image SSL backbone produces low-signal features on this kind of data" was unsupported by any matrix row and partly contradicted by DINOv3's satellite results.
   409	8. STRUCTURAL: The synthesis search behind rows 31, 32 was not exhaustive enough. DINOv3 alone invalidates row 31; Lahrichi 2025 and GLARE 2026 invalidate the confidence level of row 32.
   410	
   411	**Fixes applied (this commit + immediately following commits):**
   412	
   413	- Spec one-paragraph summary rewritten to acknowledge DINOv3's satellite specialization and narrow the OOD claim to construction documents specifically.
   414	- Throughline Act 1 description rewritten to a hypothesis tied to construction-document line-art specifically; explicit acknowledgment that DINOv3-satellite shows OOD adaptation can succeed.
   415	- Row 25 (C-RADIOv4) reworded: "primary training signal is teacher feature imitation; the only self-supervised component is MESA's shift-equivariant matching against the student's own EMA, which is a self-equivariance regularizer rather than a MAE/DINO-style pretext."
   416	- Row 31 reframed: OOD reporting is *uneven*; DINOv3 ships satellite specialization with Earth-observation numbers; Medical 3D MAE reports MRI-volume DSC; *no* canonical SSL paper reports construction-document or engineering-drawing transfer.
   417	- Row 32 reframed: bake-offs DO exist for satellite (Lahrichi 2025) and continual-SSL semantic seg (GLARE 2026); none for construction documents specifically. Phase 7 must close this row with quoted excerpts before ship.
   418	- Added rows: 33 (BEiT v3 multimodal), 34 (AIMv2 multimodal), 35 (cross-RADIO no-SSL-pretext synthesis), 36 (central thesis backed by row 35).
   419	- Recency: foundational-stable annotations added to rows 10, 14, 15, 21, 22, 23, 24, 28; row 30 hedged to marginal pending Phase 7 re-check; row 32 explicitly DEFERRED to Phase 7 quote-fetch.
   420	

exec
/bin/zsh -lc "nl -ba notes/ssl-pretraining-recipes.md | sed -n '421,525p'" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
   421	**Closure status:** structural fixes applied; ready to re-run Gate 0 to confirm cosmetic-only.
   422	
   423	### Gate 0 run 2, 2026-05-04
   424	
   425	Findings: 4 STRUCTURAL, 1 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run2.md](./ssl-pretraining-recipes-codex-research-20260504-run2.md). Down from 8 STRUCTURAL on run 1.
   426	
   427	**Findings (verbatim summary):**
   428	
   429	1. STRUCTURAL: Row 32 not closed — quote-deferral failed the matrix contract; "satellite/medical" framing was wrong because the medical paper does not run continual SSL.
   430	2. STRUCTURAL: Row 31 still false in the broader claim — DINOv3 Web reports LoveDA + DIOR + iSAID and that contradicts "the broader set remains confined to IN1K/ADE20K/COCO/iNat/Places/VTAB/video."
   431	3. STRUCTURAL: Row 25 only half-fixed — C-RADIOv4's actual loss formulation is PHI-S-normalized squared-error spatial + angular-cone-normalized summary (the paper explicitly drops cosine for summary). The Headline finding still claimed "no SSL aux loss on student" which conflicts with the corrected MESA wording.
   432	4. STRUCTURAL: Throughline Act 1 still asserted a thesis the matrix didn't yet support ("post will defend domain-adaptive SSL gives stronger fine-tuning starting point for sufficiently OOD domains").
   433	5. COSMETIC: Row 34 recency bookkeeping inconsistent.
   434	
   435	**Fixes applied (this commit):**
   436	
   437	- Dispatched a focused fetch agent to surface verbatim quotes from Lahrichi 2025, GLARE 2026 (arxiv:2509.17816v2), DINOv3 Table 19, and C-RADIOv4 §2.3.1 / §2.3.2 / §2.5.
   438	- Row 32 closed with quoted excerpts from Lahrichi (verdict: "no consistent advantage to pre-training with GeoNet as compared to ImageNet") and GLARE (UDI→GLARE deltas: ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5). The "satellite/medical" framing dropped — Medical 3D MAE doesn't run continual SSL.
   439	- Row 31 reframed: DINOv3 Web ViT-7B *favors natural-image SSL* on satellite (LoveDA 56.2 mIoU SOTA, DIOR 80.5 mAP SOTA; iSAID 71.4 < SkySense V2 71.9). The "broader set confined to IN1K → {…}" sub-claim removed.
   440	- Row 25 corrected: spatial loss is squared error against PHI-S-normalized teacher outputs (Eq. 1 §2.3.1), summary loss is angular-cone-normalized (Eq. 7 §2.5; cosine explicitly dropped), MESA is shift-equivariant EMA matching of student against itself (Eq. 2 §2.3.2).
   441	- Headline finding rewritten: removed "no SSL aux loss on student"; reframed multi-teacher distillation as a different *kind* of self-supervision (external teacher activations) rather than a pretext-derived one. Added a second Headline finding on domain transfer: published evidence (DINOv3 Web SOTA on satellite, Lahrichi's "no consistent advantage", GLARE's modest deltas) does not support a simple "domain-adaptive SSL beats natural-image SSL" thesis.
   442	- Throughline Act 1 rewritten: post does not "defend" domain-adaptive SSL > zero-shot natural-image SSL; explores the question for construction documents specifically.
   443	- OOD-domain transfer paragraph in Research notes rewritten to match the new framing.
   444	- Row 34 set to foundational-stable; marginal-debt-closure list updated.
   445	
   446	**Closure status:** structural fixes applied (run 2); ready to re-run Gate 0 (run 3) to confirm cosmetic-only.
   447	
   448	### Gate 0 run 3, 2026-05-04
   449	
   450	Findings: 3 STRUCTURAL + 2 COSMETIC. Down from 8 → 4 → 3 STRUCTURAL across runs 1, 2, 3. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run3.md](./ssl-pretraining-recipes-codex-research-20260504-run3.md).
   451	
   452	**Findings (verbatim summary):**
   453	
   454	1. STRUCTURAL: Spec line 16 still promised "When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds" but the matrix doesn't support that specific comparison (DINOv3 reports Web-vs-Sat frozen-backbone transfer; GLARE Table 1 is UDI-init not DINOv3-init).
   455	2. STRUCTURAL: Research-notes line 304-area "no canonical bake-off" sentence stale and contradicted row 32. Narrow to "no all-three-corners bake-off for construction documents specifically."
   456	3. STRUCTURAL: Research-notes line 263-area "No SSL auxiliary loss on student" prose still stale, contradicting the corrected row 25 + revised Headline finding.
   457	4. COSMETIC: Row 36 parenthetical too narrow ("corrupted view + reconstruction objective") — should be "reconstruction, invariance, or latent-prediction."
   458	5. COSMETIC: Row 32 recency bookkeeping incorrect — Lahrichi 2025-02-15 is OUTSIDE the 12-month bar at pubDate 2026-05-04; should be foundational-stable for the historical claim.
   459	
   460	**Fixes applied (this commit):**
   461	
   462	- Spec "Reader walks away knowing" bullet rewritten: "The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (Lahrichi 2025; GLARE 2026) and what it does and doesn't tell us about construction documents."
   463	- Research-notes "no all-three-corners bake-off" sentence narrowed to construction documents / engineering drawings specifically; satellite/medical answers explicitly named (DINOv3 Web, Lahrichi, GLARE, Medical 3D MAE, DiT).
   464	- C-RADIOv4 prose section: stale "No SSL auxiliary loss on student" line removed; replaced with "No MAE/DINO/JEPA-style pretext task on the student. MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext." Loss equations updated to PHI-S spatial / angular-cone summary / MESA wording.
   465	- Row 36 parenthetical broadened to "reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs."
   466	- Row 32 recency: relabeled to foundational-stable for the Lahrichi historical-claim (the "no consistent advantage" verdict is a fixed recipe-comparison result that doesn't drift), with the 14-month-outside-bar fact stated explicitly.
   467	
   468	**Closure status:** structural fixes applied (run 3); ready to re-run Gate 0 (run 4 — the gate-runner cap).
   469	
   470	## Outline
   471	
   472	*(populated in Phase 3)*
   473	
   474	## Resume here
   475	
   476	Last touched: 2026-05-04.
   477	
   478	### Phase status
   479	
   480	| Phase | Status | Output |
   481	|---|---|---|
   482	| 1. Lock-in | done | `## Spec`, `## Throughline` |
   483	| 2. Research / fact-check | in progress (Gate 0 firing) | `## Research notes`, `## Claim-source matrix` |
   484	| 3. Outline + figure list | pending | `## Outline` |
   485	| 4. Draft prose | pending | `src/content/blog/ssl-pretraining-recipes/index.mdx` |
   486	| 5. Implement figures | pending | per-figure table populated at end of Phase 3 |
   487	| 6. Playwright review | pending | playwright snapshots reviewed |
   488	| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |
   489	
   490	### Codex history
   491	
   492	| Date | Gate | Outcome | Findings file |
   493	|---|---|---|---|
   494	| 2026-05-04 | 0 (research) | structural-fixes-applied (run 1, 8 STRUCTURAL → fixes committed) | `notes/ssl-pretraining-recipes-codex-research-20260504.md` |
   495	| 2026-05-04 | 0 (research, run 2) | structural-fixes-applied (4 STRUCTURAL + 1 COSMETIC → fixes committed) | `notes/ssl-pretraining-recipes-codex-research-20260504-run2.md` |
   496	| 2026-05-04 | 0 (research, run 3) | structural-fixes-applied (3 STRUCTURAL + 2 COSMETIC; stale-prose cleanup → fixes committed; run 4 pending — gate-runner cap) | `notes/ssl-pretraining-recipes-codex-research-20260504-run3.md` |
   497	
   498	### Suggested next batch
   499	
   500	1. Dispatch Phase 2 parallel research subagents — split across (MIM/feature-prediction/token recipes) and (self-distillation + JEPA + autoregressive + multi-teacher). Each builds quoted-source notes per the primary-source decision tree.
   501	2. Read NVIDIA's RADIO line papers myself (AM-RADIO, RADIOv2.5, C-RADIOv4) to verify whether they include any SSL auxiliary loss alongside teacher distillation, since this is a load-bearing claim of section 7.
   502	3. Surface a candidate construction sheet for the throughline anchor — Vic to provide a representative example or pick from a pile.
   503	4. Build the `## Claim-source matrix` from Phase 2 outputs.
   504	5. Run Gate 0 (codex truthfulness pass) on the matrix.
   505	
   506	### How to resume from a fresh context
   507	
   508	1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
   509	2. Run resume-mode migration if any v2 sections are missing.
   510	3. `git log --oneline | head -30` to see commits since the spec commit.
   511	4. `grep -n TODO src/content/blog/ssl-pretraining-recipes/index.mdx` for remaining placeholders. (No MDX yet — created in Phase 4.)
   512	5. Pick the next batch above; implement, voice-check, commit, update this tracker.
   513	
   514	### Hard rules to keep applying
   515	
   516	1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the claim-source matrix with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness.
   517	2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
   518	3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
   519	4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final).
   520	5. **Static is the figure default.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle).
   521	6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
   522	7. **One section per commit, one figure per commit, one migration per commit.**
   523	8. **Sentence-case headings.** Numbered sections (`### 1. ...`). Em-dashes (U+2014) forbidden in prose; permitted in act-divider headings (`## Act 1 — The problem`). En-dashes (U+2013) allowed everywhere — use for numeric/date ranges.
   524	9. **`draft: false` from Phase 1 onward** (this is topic mode, not HTML-import).
   525	10. **Project-memory pointer + MEMORY.md entry verified at end of Phase 1.** See project memory at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_ssl_pretraining_recipes_post.md` and the MEMORY.md index entry.

web search: 
web search: arXiv 2509.17816 GLARE continual pre-training UDI Table 1
web search: 
web search: arXiv 2601.17237 C-RADIOv4 MESA PHI-S angular cone summary loss
web search: 
web search: https://arxiv.org/abs/2509.17816
web search: 
web search: 
web search: 
web search: https://ar5iv.org/html/2601.17237v1
web search: 
web search: https://openreview.net/pdf?id=Ax9Y4W0g7s
web search: 
web search: 'Table 1: Comparison of SSL pre-trained models' in https://openreview.net/pdf?id=Ax9Y4W0g7s
codex
STRUCTURAL findings remain.

1. STRUCTURAL: Spec bullet still over-claims GLARE’s comparison shape.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:16) frames GLARE as evidence for “continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain.” The matrix row supports Lahrichi for that contrast, but GLARE is adapter-based continual SSL from UDI/ImageNet initialization, compared against UDI, UDI→UDI, UDI→FLSL, and random init after finetuning. It is not a clean “continual natural-image checkpoint vs from-scratch SSL on target domain” bake-off. Rewrite to separate Lahrichi’s satellite bake-off from GLARE’s continual-adapter evidence.

2. STRUCTURAL: The stale “no canonical bake-off” claim is still present.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:304) says there is no canonical “domain-adaptive SSL bake-off” with dense-prediction numbers. That still contradicts row 32 at [notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:380), which explicitly says such bake-offs/evidence exist for satellite and GLARE-style continual segmentation. The narrowed sentence at line 316 is defensible, but line 304 must also be narrowed to “no all-three-corners bake-off for construction documents / engineering drawings specifically.”

COSMETIC: Headline parenthetical still lags row 36.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:61) still defines pretext-derived SSL as “corrupted-view + reconstruction or invariance objective,” while row 36 now correctly includes latent prediction at [notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:384). Not structural, but it is stale cleanup residue.

C-RADIOv4 closure is sound. The revised paragraph at line 263 is consistent with row 25, row 35, and the C-RADIOv4 primary source: MESA is self-supervised EMA matching on shifted crops, but the primary RADIO supervision remains teacher feature imitation. Row 36 and row 32 cosmetic fixes are closed.

Sources spot-checked: arXiv GLARE abstract/revision lines and OpenReview table, Lahrichi arXiv abstract/results, C-RADIOv4 arXiv HTML method sections.  
https://arxiv.org/abs/2509.17816  
https://openreview.net/pdf?id=Ax9Y4W0g7s  
https://arxiv.org/abs/2502.10669  
https://ar5iv.labs.arxiv.org/html/2601.17237v1


2026-05-05T01:24:40.708025Z ERROR codex_core::session: failed to record rollout items: thread 019df5ba-fe04-7211-a358-0afcaca1b892 not found
tokens used
121,267
STRUCTURAL findings remain.

1. STRUCTURAL: Spec bullet still over-claims GLARE’s comparison shape.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:16) frames GLARE as evidence for “continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain.” The matrix row supports Lahrichi for that contrast, but GLARE is adapter-based continual SSL from UDI/ImageNet initialization, compared against UDI, UDI→UDI, UDI→FLSL, and random init after finetuning. It is not a clean “continual natural-image checkpoint vs from-scratch SSL on target domain” bake-off. Rewrite to separate Lahrichi’s satellite bake-off from GLARE’s continual-adapter evidence.

2. STRUCTURAL: The stale “no canonical bake-off” claim is still present.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:304) says there is no canonical “domain-adaptive SSL bake-off” with dense-prediction numbers. That still contradicts row 32 at [notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:380), which explicitly says such bake-offs/evidence exist for satellite and GLARE-style continual segmentation. The narrowed sentence at line 316 is defensible, but line 304 must also be narrowed to “no all-three-corners bake-off for construction documents / engineering drawings specifically.”

COSMETIC: Headline parenthetical still lags row 36.
[notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:61) still defines pretext-derived SSL as “corrupted-view + reconstruction or invariance objective,” while row 36 now correctly includes latent prediction at [notes/ssl-pretraining-recipes.md](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:384). Not structural, but it is stale cleanup residue.

C-RADIOv4 closure is sound. The revised paragraph at line 263 is consistent with row 25, row 35, and the C-RADIOv4 primary source: MESA is self-supervised EMA matching on shifted crops, but the primary RADIO supervision remains teacher feature imitation. Row 36 and row 32 cosmetic fixes are closed.

Sources spot-checked: arXiv GLARE abstract/revision lines and OpenReview table, Lahrichi arXiv abstract/results, C-RADIOv4 arXiv HTML method sections.  
https://arxiv.org/abs/2509.17816  
https://openreview.net/pdf?id=Ax9Y4W0g7s  
https://arxiv.org/abs/2502.10669  
https://ar5iv.labs.arxiv.org/html/2601.17237v1


