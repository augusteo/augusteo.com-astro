Prompt size:
   58068 /tmp/codex-prompt-d7e8f9a012c3b4d5e6f7081923a4b5c6.txt
Running codex...
OpenAI Codex v0.125.0 (research preview)
--------
workdir: /Users/vic/dev/augusteo.com-astro
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: medium
reasoning summaries: none
session id: 019deb6f-34c6-7913-baef-bee5c256fd8c
--------
user
IMPORTANT: Do NOT read or execute any files under `~/.claude/`, `~/.agents/`, or `.claude/skills/`. Those are skill definitions for a different AI system. Stay focused on repository code only.

You are reviewing the outline and figure list for a long-form blog post on augusteo.com (slug: generative-vision-stack), Gate 1 invocation 1 of 3. The post's goal:

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

The matrix passed Gate 0 cosmetic-only on run 3 of 3. You are not re-auditing the matrix; you are auditing whether the outline + figure list actually delivers an end-to-end intuition that connects, with the throughline threading through every act.

Find:

1. **CLAIMS WITHOUT MATRIX ROWS.** For each load-bearing claim implied by the outline, is there a matrix row that backs it? Flag any outline claim that would require a new row.

2. **MISSING RUNGS IN THE INTUITION RAMP.** The outline should move from a small motivating case to a larger one, each rung motivated by a failure of the rung below. Flag any place where the reader is expected to leap two rungs at once.

3. **DEAD-WEIGHT SECTIONS.** For each section N: if you removed section N entirely, would section N+1's intuition still land? If yes, section N is dead weight. Flag it.

4. **THROUGHLINE THREAD HOLES.** The throughline names a concrete recurring object (the paper's zero-shot benchmark tables: Cityscapes mIoU column, four-dataset depth column, three-benchmark normals column). Walk the outline. For each act, is there an explicit throughline reference? Flag acts that drop the throughline.

5. **FIGURES THAT DON'T CARRY WEIGHT.** Each figure should isolate a specific mechanism the reader can walk away noticing. Flag figures whose spec is too vague to implement, or whose role duplicates an earlier figure.

6. **FIGURE-TYPE MISFITS.** For each figure, does its type match its mechanism?
   - static-svg should be the default; flag any figure whose mechanism doesn't actually justify being interactive (per the four override clauses: continuous parameter sweep, animated time evolution, drag-based spatial reasoning, multi-state toggle).
   - interactive-canvas / plot should ONLY be used when one of the four clauses applies.
   When demanding a re-type, label the finding "TYPE-CHANGE STRUCTURAL" so the unlock protocol fires.

7. **TOPIC SCOPE PROBLEMS.** If the topic decomposition leaves out a piece that the post's core claim depends on, surface it as a rescoping issue.

For each finding, label it STRUCTURAL (must fix before drafting), TYPE-CHANGE STRUCTURAL (triggers per-figure-type unlock protocol), or COSMETIC. Order findings by load-bearing-ness. Cite the specific section number, figure number, or matrix row.

Do not be diplomatic. Do not validate. If the outline is sound, say "no structural issues found" and stop. Otherwise, keep finding things.

==================================================================
INLINE EMBEDDED NOTES FILE (Spec + Throughline + Research notes + Claim-source matrix + Outline + figure table only — Codex review section omitted by design):
==================================================================

# The Generative Vision Stack

## Spec

**Title (sketch):** The Generative Vision Stack
**Slug:** `generative-vision-stack`
**Mode entered as:** topic
**Length target:** ~40-min read (matches trilogy)
**Essay flag:** true (3-tier headings)
**Topic-evolution classification:** actively-evolving (12-month bar)

### What / who / walk-away

A deep walk through the paradigm flip in computer vision introduced by the April 2026 Vision Banana paper. Posts 1 and 2 of the series ([Unified Vision Stack](/blog/unified-vision-stack), [Omni-Modal Stack](/blog/omni-modal-stack)) explained the discriminative paradigm: encode an image into a feature, attach a head, read off a label or mask. This third post explains the inversion: take a pretrained image generator (Google's Nano Banana Pro), instruction-tune it on a small mix of vision tasks, and read perception off the generator's output as RGB images. Mask-as-image. Depth-as-image. Same model, no specialist heads. The paper reports zero-shot results that *rival or beat* recent specialists across 2D and 3D dense tasks: zero-shot Cityscapes mIoU **0.699 vs SAM 3 0.652** (a 4.7-point edge; the non-zero-shot ceiling is SegMan-L at 0.842); metric depth δ₁ **0.929 vs Depth Anything 3 0.918** on the four-dataset overlap (NYU / ETH3D / DIODE / KITTI); surface-normal mean angular error **15.549° vs Lotus-2 16.558°** on the project-page three-benchmark average. The narrative isn't "the generator routs the discriminator" — it's "one generative model gets respectable, often best-in-class numbers on a wide spread of perception tasks, by treating each task's output as an image to paint."

The reader walks away with:

1. Why generative pretraining is the candidate for what next-token-prediction was for language.
2. The 5-year arc from MAE through Painter / SegGPT / DIFT to Vision Banana that made it inevitable.
3. What the trilogy of vision posts on this site collectively argues about the future shape of vision foundation models.

### Audience

Same as the trilogy: ML engineers and vision researchers with 45-min reading tolerance. Treats posts 1 and 2 as priors; doesn't re-explain ViTs, dense feature collapse, or the SigLIP / decoder split.

### Connection to trilogy (the spine)

- **Post 1:** the encoder is the spinal cord; many small heads read it.
- **Post 2:** feed that encoder into a text decoder for a multimodal agent.
- **Post 3:** drop the encoder. The *generator* is the spinal cord, and "perception" is what you read off it when you ask for the right kind of image.

### Figure mix

100% static SVG (default; no override clauses apply). Target ~10-12 figures.

### Resolved-during-Phase-2 (kept as audit trail)

All Phase-1 flagged items are now closed:

- ~~Verify "Depth Anything V3"~~ → Resolved: arxiv:2511.10647 (v1 2025-11-13). Vision Banana's paper Table 3 directly compares VB 0.929 vs DA3 0.918 on a four-dataset average; the project-page six-benchmark chart uses different competitors. Both rows in matrix.
- ~~Confirm zero-shot vs fine-tuned framing~~ → Resolved via paper PDF Methods + Table 2 caption: explicitly zero-shot transfer; non-zero-shot baselines marked.
- ~~Instruction-tuning recipe~~ → Closed at the granularity the paper publishes ("very low ratio"); specific hyperparameters absent and the post will hedge.
- ~~Nano Banana Pro release date / scale~~ → Resolved: 2025-11-20, Gemini 3 Pro Image, deployed across Gemini app / Gemini API / Google AI Studio / Vertex AI.
- ~~SAM3 comparison apples-to-apples~~ → Resolved: paper Table 2(a) is the canonical per-table primary; both VB and SAM3 are zero-shot on Cityscapes mIoU; SegMan-L is the lone non-zero-shot baseline at 0.842.

### Top starter sources

| # | Source | Date | Role |
|---|---|---|---|
| 1 | [Vision Banana paper](https://arxiv.org/abs/2604.20329) | 2026-04-22 | the focus |
| 2 | [vision-banana.github.io](https://vision-banana.github.io/) | 2026-04-22 | project site, benchmarks |
| 3 | [SAM3](https://arxiv.org/abs/2511.16719) | 2025-11-20 | competitor baseline (5 mo) |
| 4 | [Depth Anything V2](https://arxiv.org/abs/2406.09414) | 2024-06-13 | historical depth baseline / lineage context (NOT a competitor on the project-page chart; paper compares against DA3, see row 9b/23) |
| 5 | [SegGPT](https://arxiv.org/abs/2304.03284) | 2023-04-16 | foundational for the lineage |
| 6 | [Painter](https://arxiv.org/abs/2212.02499) | 2022-12-05 | foundational for the lineage |
| 7 | [MAE](https://arxiv.org/abs/2111.06377) | 2021-11-11 | foundational; He/Xie predecessor |
| 8 | [DIFT (Emergent Correspondence)](https://arxiv.org/abs/2306.03881) | 2023-06-06 | foundational; generators-as-feature-extractors |
| 9 | [Songyou Peng author thread](https://x.com/songyoupeng/status/2047312019976785944) | 2026-04-23 | first-party announcement |
| 10 | [Google DeepMind announcement (Soricut RT)](https://x.com/GoogleDeepMind/status/2047239487445438545) | 2026-04-23 | org-level first-party |
| 11 | [DeepMind research publication page](https://deepmind.google/research/publications/240658/) | 2026-04-22 | official record |

## Throughline

The recurring object is **the paper's own zero-shot benchmark table** (Table 2(a) for Cityscapes, Table 3 for monocular metric depth, plus the project-page chart for surface normals). The recurring question is: "*how well does a generator-with-instructions hold up against the dedicated specialists in this column?*" The answer is "competitive, often best, never crushing." Figures showing a single street-scene image are illustrative SVG drawings (drawn-not-evaluated), with figcaptions making the illustrative-vs-measured distinction explicit. (Per Gate 0 finding #4: the matrix backs aggregate benchmark numbers, not any specific same-image side-by-side, so the prose / figures must not invent a concrete reproducible photo run.)

- **Act 1 — the puzzle.** Discriminative segmentation is the standard recipe: build a strong encoder, attach a per-pixel head, read off categorical masks. SAM 3 is the most recent prompt-based segmentation foundation model in this lineage (2025-11-20). On zero-shot Cityscapes mIoU it scores **0.652** — a strong specialist number that still lags the in-domain non-zero-shot SegMan-L baseline at **0.842**. Posts 1 and 2 of this series explained how those encoders are built and wired into a multimodal agent.
- **Act 2 — the flip.** Vision Banana, instruction-tuned from Nano Banana Pro, scores **0.699** on the same zero-shot Cityscapes mIoU column — beating SAM 3 by 4.7 points (per the paper's own phrasing) while still trailing the non-zero-shot SegMan-L ceiling. The recipe: parameterize each task's output space as RGB, then prompt the generator to paint it. The same model also reports **δ₁ 0.929 vs Depth Anything 3 0.918** on the paper's four-dataset depth overlap (NYU / ETH3D / DIODE / KITTI), and **15.549° vs Lotus-2 16.558°** on the project-page three-benchmark surface-normals average. The deltas are small per-benchmark; the load-bearing claim is *the same model wins (or rivals) across the spread*.
- **Act 3 — why it works.** We back into the paper's own *argued* explanation through the lineage: MAE in 2021 (reconstruct masked pixels = pretraining); Painter in 2022 (output space = images); SegGPT in 2023 (segmentation as in-context coloring); DIFT in 2023 (correspondence falls out of diffusion features); Nano Banana Pro in 2025 (production generator at internet scale). Vision Banana is the synthesis: instruction-tune the production generator on a small vision-task mixture, and the dense-prediction heads come for free. The post must say "the paper argues / suggests" because Vision Banana publishes no random-init ablation. Closing: what the trilogy argues.

Throughline is **canonical-real**: every concrete number cites a public primary source (paper Table 1 / Table 2(a) / Table 3 / project page; named arxiv competitor papers). The Cityscapes evaluation protocol itself is a foundational reference.

## Research notes

### Sub-topic A: Vision Banana methods + Nano Banana Pro substrate

**Generative pretraining as the unified interface.** The paper's central claim is that image generation pretraining serves a role analogous to LLM next-token pretraining.

> "image generation serves as a unified and universal interface for vision tasks, similar to text generation's role in language understanding and reasoning. We could be witnessing a major paradigm shift for computer vision, where generative vision pretraining takes a central role in building Foundational Vision Models for both generation and understanding."
>
> Source: [Vision Banana abstract](https://arxiv.org/abs/2604.20329) (v1, 2026-04-22); accessed 2026-05-02.

**Instruction-tuning recipe.** Vision Banana = instruction-tune Nano Banana Pro on a mixture.

> "instruction-tuning Nano Banana Pro on a mixture of its original training data alongside a small amount of vision task data."
>
> Source: [Vision Banana abstract](https://arxiv.org/abs/2604.20329) (v1, 2026-04-22); accessed 2026-05-02.

**Mix ratio (paper Methods, accessed via direct PDF fetch).**

> "We mix vision task data into Nano Banana Pro's own training mixture at a very low ratio."
>
> Source: [Vision Banana paper PDF, Methods](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

The exact loss function, learning rate, batch size, and step count are not disclosed in the publicly-accessible Methods section. The post should describe the recipe at the "very low mix-in ratio" level of granularity and hedge anything more specific.

**Per-task parameterization as RGB.** Each vision task's output is encoded as an image the generator can paint.

For segmentation the model is prompted with class-to-color JSON:

> "we assign pixels to classes by matching its color according to the prompt" (using JSON like `{"cat": "red", "lock": "pink"}`)
>
> "instruct Vision Banana to produce segmentation masks for only one class, allowing the model to dynamically assign colors to different instances."
>
> Source: [Vision Banana paper PDF, Methods](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

For depth:

> "we instruct the model to output a carefully constructed false-color visualization of depth values…using those curved distances to produce a false-color visualization."
>
> (Power transform λ=−3 plus piecewise-linear interpolation along edges of the RGB cube.)
>
> Source: [Vision Banana paper PDF, Methods](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

For surface normals:

> "the directional vector components map directly to RGB channels: Facing Left (−1,0,0): Encoded as Pinkish Red…"
>
> (Direct xyz-to-RGB mapping.)
>
> Source: [Vision Banana paper PDF, Methods](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

**Zero-shot transfer is the evaluation protocol.**

> "We mainly compare with other methods that have not been trained on in-domain data…denote them as 'Zero-Shot Transfer'…Non zero-shot transfer methods are marked in gray."
>
> Source: [Vision Banana paper PDF, Table 2 caption](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

**Vision tasks evaluated.**

> "we evaluate our framework on two fundamental categories of visual understanding: 2D scene understanding and 3D structure inference. The 2D suite consists of referring expression, semantic, and instance segmentation…For 3D understanding, we focus on monocular metric depth and surface normal estimation."
>
> Source: [Vision Banana paper PDF, §Experiments](https://arxiv.org/pdf/2604.20329v1); accessed 2026-05-02.

**Reported numbers (paper Tables; cited as primary load-bearing source).**

Cityscapes mIoU (zero-shot transfer), paper Table 2(a):

> "Vision Banana surpasses SAM 3 by 4.7 points in mIoU." (Vision Banana 0.699; SAM 3 0.652; SegMan-L (Non Zero-Shot) 0.842 as the in-domain ceiling.)
>
> Source: [Vision Banana paper, Table 2(a) "Cityscapes val"](https://arxiv.org/html/2604.20329v1); accessed 2026-05-02.

Metric depth (paper Section 3.2 / Table 3), four-dataset average vs Depth Anything 3:

> "Vision Banana achieves an average δ₁ accuracy of 0.882, outperforming…Depth Anything V3 on average across the four datasets (NYU, ETH3D, DIODE, KITTI) on which it was evaluated (0.929 v.s. 0.918)."
>
> Source: [Vision Banana paper, §3.2](https://arxiv.org/html/2604.20329v1); accessed 2026-05-02. Note: 0.882 is Vision Banana's average across the project-page six-benchmark depth chart; 0.929 is its average on the four datasets where DA3 was evaluated; the 1.1-point delta vs DA3 (0.918) is the per-paper comparison.

Surface normals (project-page three-benchmark average):

Project page chart values: Marigold 19.606° / StableNormal 17.168° / DSINE 17.017° / Lotus-2 16.558° / Vision Banana 15.549°.

> Source: [vision-banana.github.io](https://vision-banana.github.io/) chart; accessed 2026-05-02. (Note: paper Table 1 reports a separate four-dataset normals comparison: Vision Banana 18.928° vs Lotus-2 19.642°; the post should distinguish these two averages if it cites both.)

**Source-primacy correction (logged in `## Codex research review` run-2):** the earlier "Semantic Segmentation (Cityscapes): 0.842 mIoU, significantly outperforming comparable models" prose quote and the "Depth Anything V2 at 0.823" attribution were drawn from a WebFetch summarizer that misread bar-chart positions and synthesized prose that does not exist on the project page. Codex Gate 0 caught this. The narrower correct rule (refined per Gate 0 run-3 finding): **for paper-table values (Cityscapes mIoU, four-dataset DA3 depth comparison, four-dataset normals comparison), cite the paper's tables directly; do not cite the project-page chart for those values.** The project page itself remains a first-party primary source for **its own chart values** — specifically the six-benchmark depth average (row 9a) and the three-benchmark surface-normal average (row 10). What's been excised is reliance on WebFetch-synthesized prose that the project page does not actually contain.

**Lightweight tuning preserves generation.**

> "without sacrificing the base model's image generation capabilities."
>
> Source: [Vision Banana abstract](https://arxiv.org/abs/2604.20329) (v1, 2026-04-22); accessed 2026-05-02.

**Nano Banana Pro substrate.** Google released Nano Banana Pro (= Gemini 3 Pro Image) on 2025-11-20.

> "Nano Banana Pro (Gemini 3 Pro Image) is Google DeepMind's production image generation model… built on Gemini 3 Pro… deployed across Google products including the Gemini app, Google AI Studio, and Vertex AI Studio."
>
> Source: [blog.google/technology/ai/nano-banana-pro/](https://blog.google/technology/ai/nano-banana-pro/) (2025-11-20); accessed 2026-05-02.

**Gap to flag for prose.** The paper does not include an ablation against a randomly-initialized generator (i.e., "does the image-generation pretraining actually matter?"). The post should not make a load-bearing causal claim about pretraining being necessary; it should report that Vision Banana wins as-published and frame the lineage (sub-topic B) as the conceptual rather than ablation-controlled argument.

### Sub-topic B: Lineage — MAE → Painter → SegGPT → DIFT

**MAE (2021).** Masked autoencoders pretrain ViTs at scale by reconstructing masked patches.

> "This paper shows that masked autoencoders (MAE) are scalable self-supervised learners for computer vision… We mask random patches of the input image and reconstruct the missing pixels… an asymmetric encoder-decoder design that is key to the method… accelerate training (by 3x or more) and improve accuracy."
>
> Source: [MAE abstract](https://arxiv.org/abs/2111.06377) (v1, 2021-11-11); accessed 2026-05-02. Authors: Kaiming He, Xinlei Chen, Saining Xie, Yanghao Li, Piotr Dollár, Ross Girshick.

**Author arc.** Kaiming He and Saining Xie co-author both MAE (2021) and Vision Banana (2026), establishing a 5-year continuous research arc from "reconstruct masked patches" to "instruction-tune a generator."

**Painter (2022).** First paper to redefine the output of vision tasks as images.

> "We propose Painter, a generalist vision model by redefining the output of core vision tasks as images… Our training process is extremely simple, which performs standard masked image modeling on the stitch of input and output image pairs."
>
> Source: [Painter abstract](https://arxiv.org/abs/2212.02499) (v1, 2022-12-05); accessed 2026-05-02.

**SegGPT (2023).** Segmentation as in-context coloring with random color mapping per data sample.

> "We propose SegGPT, an alternative route to generalist segmentation models… the training uses an in-context coloring problem with random color mapping for each data sample."
>
> Source: [SegGPT abstract](https://arxiv.org/abs/2304.03284) (v1, 2023-04-06); accessed 2026-05-02.

**DIFT (2023).** Correspondence emerges in diffusion features without supervision.

> "DIFT from Stable Diffusion is able to outperform DINO and OpenCLIP by 19 and 14 accuracy points respectively on the challenging SPair-71k benchmark… diffusion models encode valuable geometric and semantic relationship information during training."
>
> Source: [DIFT abstract](https://arxiv.org/abs/2306.03881) (v1, 2023-06-06); accessed 2026-05-02.

### Sub-topic C: Competitor baselines + benchmark protocols

**SAM3 (2025-11-20).** Concept-prompted segmentation; doubles accuracy of prior systems on prompt-based concept segmentation.

> "SAM 3 is a unified model for detecting, segmenting, and tracking objects in images and videos. The system accepts 'concept prompts' defined as 'short noun phrases (e.g., yellow school bus), image exemplars, or a combination of both.'"
>
> "The architecture features a decoupled recognition and localization approach through a 'presence head, which boosts detection accuracy.'"
>
> "SAM 3 doubles the accuracy of existing systems in both image and video promptable concept segmentation."
>
> Source: [SAM 3 paper](https://arxiv.org/abs/2511.16719) (v1, 2025-11-20); accessed 2026-05-02.

The SAM3 paper does not report a Cityscapes mIoU directly. Vision Banana's reported 0.699 figure for SAM3 appears to be a Vision-Banana-side zero-shot evaluation; the paper's evaluation methodology section (which we have only partial access to) is the definitive source.

**Depth Anything V2 (2024-06-13).** Foundational competitor benchmark; ~22 months old at pubDate but cited as the comparison baseline in Vision Banana.

> "Three key improvements: (1) Synthetic Data: Replaced all labeled real images with synthetic ones; (2) Scaled Teacher Model: Increased the capacity of the teacher model; (3) Pseudo-Labeled Bridge: Trained student models using large-scale pseudo-labeled real images."
>
> "On KITTI, Depth Anything V2 (ViT-L) achieved an AbsRel of 0.074 and δ₁ of 0.946."
>
> Source: [Depth Anything V2](https://arxiv.org/abs/2406.09414) (v1, 2024-06-13); accessed 2026-05-02.

**Depth Anything V3 (2025-11-13).** *Critical finding.* Published 5 months before Vision Banana; supersedes V2 on monocular depth.

> "Depth Anything 3: Recovering the Visual Space from Any Views… predicts spatially consistent geometry from an arbitrary number of visual inputs, with or without known camera poses… outperforming its predecessor (DA2) in monocular depth estimation."
>
> Source: [Depth Anything 3](https://arxiv.org/abs/2511.10647) (v1, 2025-11-13); accessed 2026-05-02.

**Implication for the post.** The Vision Banana paper compares directly against Depth Anything 3 in Table 3 / §3.2: VB 0.929 vs DA3 0.918 on the four-dataset overlap (NYU / ETH3D / DIODE / KITTI). The project-page six-benchmark chart is a *separate* aggregation that uses Depth Pro, MoGe-2, and UniK3D as competitors and does not include either DAv2 or DA3. The post can claim two distinct things, both backed: (1) on the project-page six-benchmark depth chart, VB 0.882 leads UniK3D 0.823 by 5.9 points; (2) on the paper's four-dataset overlap with DA3, VB 0.929 edges DA3 0.918 by 1.1 points. The post must distinguish these two averages explicitly, not merge them into a "VB wins depth" headline.

**Lotus-2 (2025-12-01).** Surface-normals competitor.

> "Lotus-2 is a two-stage framework designed for geometric dense prediction tasks like depth estimation and surface normal prediction from single images… achieves state-of-the-art performance in monocular depth estimation while being 'highly competitive' in surface normal prediction using only 59,000 training samples."
>
> Source: [Lotus-2](https://arxiv.org/abs/2512.01030) (v1, 2025-12-01); accessed 2026-05-02.

**Cityscapes evaluation protocol.** The Cityscapes benchmark uses a fixed test set with pixel-level annotations across 19 evaluation classes.

> "5000 of these images have high quality pixel-level annotations; 20000 additional images have coarse annotations."
>
> Source: [Cityscapes Dataset paper](https://arxiv.org/abs/1604.01685) (foundational, 2016) + [official benchmark site](https://www.cityscapes-dataset.com/benchmarks/); accessed 2026-05-02. Foundational reference (dataset spec; locked by the field).

## Claim-source matrix

| # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID + date | Recency status |
|---|---|---|---|---|
| 1 | The Vision Banana paper *argues* that image-generation pretraining plays a role for vision analogous to next-token pretraining for language. (Hedge per Gate 0 finding #6: this is the paper's own claim, not an externally-validated result; the paper has no random-init ablation. The post must say "the paper argues / suggests".) | "image generation serves as a unified and universal interface for vision tasks, similar to text generation's role in language understanding and reasoning." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 2 | Vision Banana is built by instruction-tuning Nano Banana Pro on a mixture of its own training data + vision-task data. | "instruction-tuning Nano Banana Pro on a mixture of its original training data alongside a small amount of vision task data." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 3 | The mixture ratio is "very low" — vision-task data is a small fraction of the instruction-tuning mix. | "We mix vision task data into Nano Banana Pro's own training mixture at a very low ratio." | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 4 | Vision Banana reframes perception as image generation by parameterizing each task's output space as RGB. | "parameterizing the output space of vision tasks as RGB images." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 5 | Segmentation is parameterized via JSON class-to-color prompts; pixels are assigned to classes by matching color. | "instruct Vision Banana to produce segmentation masks for only one class, allowing the model to dynamically assign colors to different instances." / "we assign pixels to classes by matching its color according to the prompt" using `{"cat": "red", "lock": "pink"}`. | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 6 | Depth is parameterized as a power-transformed (λ=−3) false-color visualization, interpolated along RGB-cube edges. | "we instruct the model to output a carefully constructed false-color visualization of depth values…using those curved distances to produce a false-color visualization." | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 7 | Surface normals are parameterized as direct xyz-to-RGB mapping. | "the directional vector components map directly to RGB channels: Facing Left (−1,0,0): Encoded as Pinkish Red…" | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 8 | Zero-shot Cityscapes mIoU (paper Table 2(a)): Vision Banana 0.699; SAM 3 0.652. The paper states VB surpasses SAM 3 by 4.7 points. The lone non-zero-shot baseline in the same table is SegMan-L at 0.842 (the in-domain ceiling). **Retraction note:** the run-1 framing "VB 0.842 vs SAM 3 0.699" was based on a misread of the project-page chart bars and was rejected as the override; on run-2 codex re-anchored on the paper's table text. The paper's text is the authoritative source. | "Vision Banana surpasses SAM 3 by 4.7 points in mIoU." (paper Table 2(a) "Cityscapes val": SegMan-L Non Zero-Shot 0.842; SAM 3 0.652; Vision Banana 0.699.) | [arxiv:2604.20329 Table 2(a)](https://arxiv.org/html/2604.20329v1) (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 9a | Project-page six-benchmark metric-depth δ₁ average: Vision Banana 0.882; UniK3D 0.823; MoGe-2 0.802; Depth Pro 0.715. The project-page chart does **not** include Depth Anything V2 or V3. | Project-page chart values. | https://vision-banana.github.io/ (accessed 2026-05-02) | actively-evolving / 12-month bar / passes |
| 9b | Paper Section 3.2 / Table 3 four-dataset metric-depth comparison vs Depth Anything 3: Vision Banana 0.929 vs DA3 0.918 (1.1-point edge) on NYU / ETH3D / DIODE / KITTI. | "Vision Banana achieves an average δ₁ accuracy of 0.882, outperforming…Depth Anything V3 on average across the four datasets (NYU, ETH3D, DIODE, KITTI) on which it was evaluated (0.929 v.s. 0.918)." | [arxiv:2604.20329 §3.2 / Table 3](https://arxiv.org/html/2604.20329v1) (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 10 | Surface-normal mean angular error: project-page three-benchmark average lists Vision Banana 15.549°; Lotus-2 16.558°; DSINE 17.017°; StableNormal 17.168°; Marigold 19.606°. (Paper Table 1 also reports a four-dataset normals comparison: Vision Banana 18.928° vs Lotus-2 19.642° — the post should distinguish these two averages when citing.) | Project-page chart values + paper Table 1 (per codex run-2 verification). | https://vision-banana.github.io/ + [arxiv:2604.20329 Table 1](https://arxiv.org/html/2604.20329v1) (accessed 2026-05-02) | actively-evolving / 12-month bar / passes |
| 11 | Comparisons in Vision Banana are zero-shot transfer; baselines that were fine-tuned in-domain are excluded or marked. | "We mainly compare with other methods that have not been trained on in-domain data…denote them as 'Zero-Shot Transfer'…Non zero-shot transfer methods are marked in gray." | arxiv:2604.20329 PDF, Table 2 caption (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 12 | Vision Banana's vision-task suite: 2D = referring-expression / semantic / instance segmentation; 3D = monocular metric depth + surface normals. | "we evaluate our framework on two fundamental categories of visual understanding: 2D scene understanding and 3D structure inference. The 2D suite consists of referring expression, semantic, and instance segmentation…For 3D understanding, we focus on monocular metric depth and surface normal estimation." | arxiv:2604.20329 PDF, §Experiments (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 13 | The paper *reports* that the instruction-tuning preserves the base model's image-generation capabilities ("lightweight"). (Hedged per Gate 0 finding #6.) | "without sacrificing the base model's image generation capabilities." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 14 | Nano Banana Pro (= Gemini 3 Pro Image) is Google's production image-generation model, released 2025-11-20. Rolled out via the Gemini app, the Gemini API / Google AI Studio, and Vertex AI. | Article body of [blog.google/innovation-and-ai/products/nano-banana-pro/](https://blog.google/innovation-and-ai/products/nano-banana-pro/), confirmed by codex run-2 direct fetch (rollout channels: Gemini app, Gemini API / Google AI Studio, Vertex AI). | blog.google/innovation-and-ai/products/nano-banana-pro/ (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 15 | MAE: masked patches reconstructed by an asymmetric encoder–decoder; 3× training speedup. | "We mask random patches of the input image and reconstruct the missing pixels… an asymmetric encoder-decoder design… accelerate training (by 3x or more) and improve accuracy." | arxiv:2111.06377 abstract (2021-11-11); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 16 | Kaiming He and Saining Xie are co-authors on both MAE (2021) and Vision Banana (2026). | MAE author list: "Kaiming He, Xinlei Chen, Saining Xie, Yanghao Li, Piotr Dollár, Ross Girshick." Vision Banana includes both names in the 25-author list. | arxiv:2111.06377 + arxiv:2604.20329 (accessed 2026-05-02) | actively-evolving / 12-month bar / foundational reference (lineage continuity) |
| 17 | Painter introduced the "task output as image" formulation, trained via masked image modeling on stitched input/output pairs. | "We propose Painter, a generalist vision model by redefining the output of core vision tasks as images… Our training process is extremely simple, which performs standard masked image modeling on the stitch of input and output image pairs." | arxiv:2212.02499 abstract (2022-12-05); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 18 | SegGPT trained segmentation as in-context coloring with random color mapping per sample. | "the training uses an in-context coloring problem with random color mapping for each data sample." | arxiv:2304.03284 abstract (2023-04-06); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 19 | DIFT showed correspondence emerges in diffusion features; outperforms DINO by 19 pts and OpenCLIP by 14 pts on SPair-71k. | "DIFT from Stable Diffusion is able to outperform DINO and OpenCLIP by 19 and 14 accuracy points respectively on the challenging SPair-71k benchmark." | arxiv:2306.03881 abstract (2023-06-06); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 20 | SAM3 is a concept-prompted unified segmentation/tracking model; doubles accuracy of prior systems on prompt-based concept segmentation. | "SAM 3 is a unified model for detecting, segmenting, and tracking objects." / "SAM 3 doubles the accuracy of existing systems in both image and video promptable concept segmentation." | arxiv:2511.16719 (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 21 | SAM3 introduces a "presence head" decoupling recognition from localization. | "presence head, which boosts detection accuracy." | arxiv:2511.16719 (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 22 | Depth Anything V2 training recipe (synthetic-only labels, scaled teacher, pseudo-labeled real bridge). *Lineage / context only — DAv2 is NOT one of the depth competitors on the Vision Banana project page chart per Gate 0 finding #2.* The post can mention DAv2 as historical context for monocular depth but cannot claim Vision Banana beats it from the project-page chart alone. | "Replaced all labeled real images with synthetic ones; (2) Scaled Teacher Model… (3) Trained student models using large-scale pseudo-labeled real images." | arxiv:2406.09414 (2024-06-13); accessed 2026-05-02 | foundational reference (lineage / historical context; not a load-bearing comparison) |
| 23 | Depth Anything V3 was released 2025-11-13. The Vision Banana paper Section 3.2 / Table 3 *does* compare against DA3 directly on a 4-dataset average (NYU / ETH3D / DIODE / KITTI), reporting VB 0.929 vs DA3 0.918 (see row 9b). The project-page six-benchmark chart (row 9a) does not list DA3, but the paper itself does. | "outperforming…Depth Anything V3 on average across the four datasets (NYU, ETH3D, DIODE, KITTI) on which it was evaluated (0.929 v.s. 0.918)." (paper); "Depth Anything 3… outperforming its predecessor (DA2) in monocular depth estimation." (DA3 paper) | [arxiv:2604.20329 §3.2](https://arxiv.org/html/2604.20329v1) + [arxiv:2511.10647](https://arxiv.org/abs/2511.10647) (DA3 v1 2025-11-13); accessed 2026-05-02 | actively-evolving / 12-month bar / passes (per Gate 0 run-2 finding #3) |
| 24 | Lotus-2 is one of the surface-normals baselines on the Vision Banana project page (16.558° MAE; the next-best after VB's 15.549°). Trained on ~59k samples. | "Lotus-2 is a two-stage framework… achieves state-of-the-art performance in monocular depth estimation while being 'highly competitive' in surface normal prediction using only 59,000 training samples." | arxiv:2512.01030 (v1 submitted 2025-11-30, v2 2025-12-04); accessed 2026-05-02 | actively-evolving / 12-month bar / passes (date corrected per Gate 0 finding #9) |
| 25 | Cityscapes benchmark uses ~5000 high-quality pixel-annotated images for evaluation. | "5000 of these images have high quality pixel-level annotations; 20000 additional images have coarse annotations." | arxiv:1604.01685 + https://www.cityscapes-dataset.com/benchmarks/ (accessed 2026-05-02) | foundational reference (dataset spec; locked by the field) |
| 26 | Depth competitors named on the project-page six-benchmark chart: Depth Pro, MoGe-2, UniK3D. Per-paper primaries verified per codex run-2 finding #4. | Project-page chart values (see row 9a). Per-paper primaries: Depth Pro (Bochkovskii et al., Apple, [arxiv:2410.02073](https://arxiv.org/abs/2410.02073), 2024-10-02); **MoGe-2** (Wang et al., Microsoft, [arxiv:2507.02546](https://arxiv.org/abs/2507.02546), v1 2025-07-03; "MoGe-2: Accurate Monocular Geometry with Metric Scale and Sharp Details"); UniK3D (Piccinelli et al., ETH / Politecnico di Milano, [arxiv:2503.16591](https://arxiv.org/abs/2503.16591), 2025-03-20). | three arxiv IDs above (accessed 2026-05-02) | mixed: MoGe-2 + UniK3D in-bar; Depth Pro is 19 months at pubDate, foundational competitor reference. (MoGe-2 ID corrected from prior 2509.02866; codex run-2 caught the misattribution.) |
| 27 | Surface-normal competitors named on the project-page chart: Marigold, StableNormal, DSINE, Lotus-2. The chart citation is the project page (row 10); per-paper primaries below for context. | Project-page chart values (see row 10). Per-paper primaries: **Marigold** (Ke et al., [arxiv:2505.09358](https://arxiv.org/abs/2505.09358), v1 2025-05-14; "Marigold: Affordable Adaptation of Diffusion-Based Image Generators for Image Analysis" — explicitly covers surface-normals prediction); StableNormal (Ye et al., [arxiv:2406.16864](https://arxiv.org/abs/2406.16864), 2024-06-24); DSINE (Bae & Davison, [arxiv:2403.00712](https://arxiv.org/abs/2403.00712), 2024-03-01). | three arxiv IDs above (accessed 2026-05-02) | mixed: Marigold + StableNormal in-bar; DSINE is 14 months (marginal — annotated as 14-month-near-bar competitor reference). (Marigold ID corrected from prior 2312.02145 which is depth-only; codex run-2 caught the misattribution.) |
| 28 | Vision Banana's *zero-shot transfer* claim is the paper's own evaluation framing. The matrix backs the per-benchmark aggregate numbers; it does **not** back any specific same-image side-by-side ("the Cityscapes-style city-street photo run through SAM3 and Vision Banana"). Per Gate 0 finding #4, any concrete same-image figure in the post must either (a) cite a reproducible source for the exact image + prompts + outputs, or (b) be drawn explicitly as illustrative-not-evaluative with a figcaption disclaimer. | (Negative claim — flagged for Phase 4 prose discipline.) | (No source needed; this is a constraint on the post itself.) | constraint, not a claim |

## Outline

Three acts, ~16 numbered sections + a coda, ~40-min read. Throughline = "the paper's zero-shot benchmark tables (Cityscapes mIoU column, four-dataset depth column, three-benchmark normals column)." Each act opens by returning to one column and asks the next question.

### Act 1 — the puzzle (where the discriminative line ends)

1. **Where the trilogy left off.** Recap: post 1 ended at C-RADIOv4 (encoder-as-spinal-cord with three teachers); post 2 ended at Nemotron 3 Nano Omni (encoder + text decoder). The state of the art at the end of post 2 was: encoder front, text decoder back. *Throughline anchor: SAM 3's 0.652 mIoU column is one specific instance of "the encoder front."* **Fig 1 (TrilogyState):** static-svg. Two horizontal lanes — top lane = encoder-with-heads (post 1); middle lane = encoder + text decoder (post 2); bottom lane = ?? (post 3, blank, awaiting answer). Reader notices: the question is "what goes in the bottom lane?"
2. **Two ways to read what's in an image.** The paradigm contrast: discriminative read-off (image → encoder → head → integers) vs generative paint (image + prompt → generator → RGB output → decode-as-mask). The crucial move is *what the model emits*. Discriminator: a small grid of integers. Generator: another image. **Fig 2 (ParadigmFlip):** static-svg. Top half: image → encoder block → head → mask (integers). Bottom half: image + prompt JSON → generator block → RGB output → decode lookup → mask (still integers, but generated as colors first). Same input, same output, different middle. Reader notices: the model's output stops being a label grid and starts being a picture.
3. **The dedicated specialists.** Naming the lineup VB will be compared against on the paper's benchmark tables: SAM 3 (concept-prompted segmentation, 2025-11-20); Depth Pro / MoGe-2 / UniK3D (monocular metric depth, on the project-page chart); Marigold / StableNormal / DSINE / Lotus-2 (surface normals, on the project-page chart); Depth Anything 3 (the specialist VB compares against in Table 3, 2025-11-13). Each one is a strong, dedicated, published-this-year specialist. Each one wins (or rivals) its specific benchmark. **Fig 3 (SpecialistLineup):** static-svg. Top row: six specialist boxes (SAM 3 / Depth Pro / MoGe-2 / UniK3D / Lotus-2 / Marigold), each with its task icon and best published benchmark. Bottom row: a single Vision Banana box covering the same span. Reader notices: "One box, six tasks. The question is whether one model can hold up across all six columns."

### Act 2 — the flip (how Vision Banana works)

4. **Meet Vision Banana.** The architecture overview: Nano Banana Pro (Google's production image generator, released 2025-11-20, = Gemini 3 Pro Image) is the substrate. Vision Banana is built by *instruction-tuning* NBP on a mix that adds vision-task data at "a very low ratio" — the paper's exact phrasing. The base model's image-generation capabilities are reportedly preserved. **Fig 4 (VisionBananaArch):** static-svg. NBP at the center as a deep stack; a small instruction-tune layer wrapped around it; the vision-task data shown as a thin sliver of the training mix; output is an RGB image. Reader notices: the base generator is most of the way there before vision-task training; the tune is light.
5. **Segmentation as in-context coloring.** The specific recipe: a JSON class-to-color prompt (`{"cat": "red", "lock": "pink"}`); the model paints an RGB image where each class's pixels carry that color; decode = pixel-color-to-class lookup. The technique is the SegGPT (2023) lineage made production. *Throughline thread:* this is how VB scores 0.699 zero-shot mIoU on Cityscapes Table 2(a). **Fig 5 (SegmentationAsColoring):** static-svg. Input image of a street scene; JSON prompt to the right; output: RGB-painted image with car/sidewalk/sky/etc. as distinct colors; decode arrow → mask of class labels. Figcaption disclaimer: drawn schematically; backed by aggregate Cityscapes mIoU, not this specific image. Reader notices: the mask is just an image; the class labels are colors; decode is a hash-table lookup.
6. **Depth as power-transformed false-color.** A more elaborate parameterization: depth values are re-scaled with a power transform (λ=−3), then mapped onto a piecewise-linear path along edges of the RGB cube — the paper's "carefully constructed false-color visualization." The result is an image whose hue at each pixel encodes that pixel's metric distance from the camera. *Throughline thread:* this is how VB scores 0.882 (six-benchmark avg) and 0.929 (four-dataset DA3 overlap, vs 0.918). **Fig 6 (DepthAsFalseColor):** static-svg. Three panels: (a) input image; (b) the power-transform curve plotted as input depth → output color-position-along-cube-edge; (c) the resulting false-color depth image. Reader notices: the "depth map" is just a carefully chosen colormap baked into the model's image output.
7. **Surface normals as direct xyz→RGB.** The simplest of the three reframings: a unit-vector direction in 3D maps directly to an RGB triple. The paper's example: "Facing Left (−1, 0, 0) is encoded as Pinkish Red." No transform; the geometry IS the color. *Throughline thread:* 15.549° MAE on the project-page three-benchmark average, beating Lotus-2 by 1.0°. **Fig 7 (NormalsAsXYZ):** static-svg. Left: a 3D unit sphere with axis labels (X right, Y up, Z out). Right: the RGB cube. Arrows mapping (−1, 0, 0) → pinkish red; (0, 1, 0) → green; etc. The same arrow set drawn on a normal map of a small object so the reader sees the encoding live. Reader notices: direction in space and color are literally the same thing here.
8. **The benchmark spread, honestly.** The full picture: zero-shot Cityscapes mIoU (Table 2(a)) — VB 0.699 vs SAM 3 0.652 (4.7-pt edge), with the non-zero-shot SegMan-L ceiling at 0.842 still well above; six-benchmark depth (project page) — VB 0.882 vs UniK3D 0.823 (5.9-pt edge); four-dataset depth vs DA3 (Table 3) — VB 0.929 vs DA3 0.918 (1.1-pt edge); three-benchmark normals (project page) — VB 15.549° vs Lotus-2 16.558° (1.0° edge). The story is "wins or rivals across the spread," not "crushes any one." **Fig 8 (BenchmarkSpread):** static-svg. Four side-by-side bar groups, one per benchmark. Vision Banana bars highlighted; specialists shown alongside; the SegMan-L NZS ceiling drawn as a dashed line on the Cityscapes group. Reader notices: every column has VB at or near the top; the deltas are real but modest; this is a generalist-across-a-spread argument, not a specialist-replacement argument.

### Act 3 — why it works (the lineage and the paradigm shift)

9. **MAE (2021): reconstruction as pretraining.** The starting point of the arc. He, Chen, Xie, Li, Dollár, Girshick: mask random patches of a ViT input, train an asymmetric encoder–decoder to reconstruct the missing pixels. The pretraining task is *generation*, even though everyone called it "self-supervised learning." The 3× training speedup made the recipe practical at scale. **Fig 9 (MAEDiagram):** static-svg. Standard MAE schematic: image with masked patches → encoder over visible only → decoder reconstructs full image. Mirrors the DINOv3 figure shape from post 1 for visual continuity. Reader notices: reconstruction was always pretraining; we just didn't know yet that the *output* it learned was useful for *perception*.
10. **Painter (2022): output space as image.** Wang et al.'s contribution: redefine the output of every vision task as an image. Train via masked image modeling on the *stitch* of input and output image pairs. The model learns to paint the answer, not predict it. **Fig 10 (PainterStitched):** static-svg. An input image stitched horizontally to its output (e.g., RGB photo + segmentation map drawn as colors); a mask diagonally crossing both halves; the model trained to fill in the masked pixels. Reader notices: the output stopped being a different *kind* of thing than the input. Both are images.
11. **SegGPT (2023): in-context coloring with random color mapping.** Same group's follow-up: drop the fixed task vocabulary; let the colors be arbitrary per sample. The model learns "match-this-color-pattern" not "label-as-class-N." This is the exact mechanism Vision Banana lifts into production — every Vision Banana segmentation prompt rebrands the colors. (No new figure; lean on Fig 5 callback.) Reader notices: the JSON prompt in Fig 5 is just SegGPT's idea wrapped in a JSON.
12. **DIFT (2023): correspondence emerges in diffusion.** Tang et al.: pretrained diffusion models contain features that match the same object across images, with no explicit supervision. DIFT outperformed DINO and OpenCLIP on SPair-71k by 19 and 14 points respectively. The implication: the generator already knows. The information was in the gradients all along. **Fig 11 (DIFTCorrespondence):** static-svg. Two images of the same animal in different poses; matched correspondence pairs marked with the same color across the pair; an arrow back into the diffusion model showing where these matches come from (some intermediate UNet layer's features). Reader notices: a model trained only to denoise pictures *also* knows what's the same across pictures.
13. **Nano Banana Pro (2025): production generator at scale.** Released 2025-11-20 by Google as Gemini 3 Pro Image. Trained on web-scale image-text data. Available via the Gemini app, Gemini API / Google AI Studio, Vertex AI. Vision Banana's substrate is not a research artifact; it's a deployed product. (No separate figure; one paragraph contextualizing.) Reader notices: this is the "internet-scale generator" rung the lineage was waiting for.
14. **Vision Banana (2026): the synthesis.** Glue: lift SegGPT's coloring trick + Painter's output-as-image + DIFT's "the generator already knows" + MAE's "reconstruction is pretraining" + Nano Banana Pro's web-scale capacity. Add a "very low ratio" of vision-task instruction data on top. Read perception off the generator's RGB output. The paper's own argument: image-generation pretraining serves a role analogous to LLM next-token pretraining. **Fig 12 (VisionBananaSynthesis):** static-svg. A horizontal timeline with five icons (MAE / Painter / SegGPT / DIFT / Nano Banana Pro) and arrows converging on the Vision Banana node at 2026. Each arrow labeled with what that paper contributed (reconstruct / output-as-image / coloring / generators-have-features / production-scale). Reader notices: nothing here is a leap. Every step is a small decision someone has been pushing toward for five years.
15. **What the paper does NOT prove.** Honesty section: Vision Banana publishes no random-init ablation. The "image-generation pretraining is the right pretraining" claim is *argued from results*, not isolated. The benchmark deltas are real but modest (4.7pt zero-shot Cityscapes, 1.1pt over DA3, 5.9pt over UniK3D, 1° over Lotus-2). The non-zero-shot SegMan-L ceiling at 0.842 still sits well above zero-shot VB at 0.699. Specialists fine-tuned in-domain still win their column. What VB shows is that *one model* gets close-to-or-above zero-shot specialists across the whole spread, which is a different (and possibly more useful) thing than crushing any one. (No separate figure; this section is prose discipline.) Reader notices: the paradigm flip is real; the magnitude of the win is small; the post should not overstate the latter.
16. **What the trilogy collectively argues.** Step back: post 1 said the encoder is the spinal cord; post 2 said feed it into a text decoder; post 3 says the generator might be the spinal cord. All three are coherent; each one widens the scope of what one foundation model has to do. The arc is "fewer, larger, more general models doing more dense-prediction work from a single forward pass." **Fig 13 (TrilogyMeta):** static-svg. Three rows, top to bottom — Post 1: encoder + many heads; Post 2: encoder + text decoder + speech head; Post 3: generator + RGB-output → decode. The same image flows through each row. Reader notices: the same input has three different valid spinal cords, depending on what year you ask.

### Coda

A two-or-three-sentence ending. No "in summary." Borrowed shape from posts 1 and 2: end on a small, concrete point. Candidate close: *We used to ask the encoder for a label, and it gave us numbers. Now we ask the generator for a picture, and it gives us numbers. Either way, somebody else's softmax is what makes the picture mean something — and the question of where the softmax sits is what the trilogy has been about.*

### Figure summary table

| # | Figure | Type | Section(s) | Mechanism | Reader notices |
|---|---|---|---|---|---|
| 1 | TrilogyState | static-svg | §1 | Post 1 / Post 2 / Post 3 lanes; bottom lane unfilled. | The post is going to fill the bottom lane. |
| 2 | ParadigmFlip | static-svg | §2 | Discriminative top half vs generative bottom half; same input → same output via different middle. | The model's *output* stops being integers and starts being pixels. |
| 3 | SpecialistLineup | static-svg | §3 | Six specialist boxes top row; one VB box bottom row covering the same span. | One box vs six. |
| 4 | VisionBananaArch | static-svg | §4 | NBP substrate + thin instruction-tune layer + tiny vision-task slice in the training mix. | Most of VB is already-trained NBP; tuning is light. |
| 5 | SegmentationAsColoring | static-svg | §5, §11 (callback) | JSON prompt → input image → RGB-painted output → decode lookup → mask. | Mask = image; class labels = colors; decode = lookup. |
| 6 | DepthAsFalseColor | static-svg | §6 | Power-transform curve λ=−3 → RGB cube edge path → false-color depth image. | A "depth map" is a carefully chosen colormap baked into image output. |
| 7 | NormalsAsXYZ | static-svg | §7 | Unit sphere ↔ RGB cube; example axis-aligned mappings; sphere overlaid on a normal-map. | Direction in 3D space and color are the same thing here. |
| 8 | BenchmarkSpread | static-svg | §8, §15 (callback) | Four side-by-side bar groups (Cityscapes / 6-bench depth / 4-bench depth vs DA3 / 3-bench normals); SegMan-L NZS ceiling shown as dashed line. | VB at or near the top everywhere; modest deltas; generalist-across-spread argument. |
| 9 | MAEDiagram | static-svg | §9 | Image → masked patches → encoder over visible → decoder reconstructs missing. | Reconstruction has always been pretraining. |
| 10 | PainterStitched | static-svg | §10 | Stitched I/O image; diagonal mask; masked-image-modeling fills it in. | Output stopped being a different *kind* of thing than input. |
| 11 | DIFTCorrespondence | static-svg | §12 | Two images of same object in different poses; matched correspondence pairs colored; arrow back into diffusion features. | A denoising model learns what's the same across images, no labels. |
| 12 | VisionBananaSynthesis | static-svg | §14 | Horizontal lineage timeline (MAE → Painter → SegGPT → DIFT → NBP → Vision Banana) with arrows converging. | Nothing here is a leap. Five years of small steps. |
| 13 | TrilogyMeta | static-svg | §16 | Three rows — Post 1 / Post 2 / Post 3 — with the same input flowing through three different spinal cords. | The same image has three valid spinal cords, depending on the year. |

13 figures total. **All static-svg.** None of the four interactive override clauses fires (no continuous parameter sweep that aids intuition; no animated time evolution; no drag-based spatial reasoning; no toggle that needs more than a 3-panel side-by-side). The post can ship as 100% static SVG.

### Throughline-thread audit

Per `narrative-template.md` rhythm — each act opens with a throughline reference, runs the mechanism, closes with what the throughline now looks like differently:

- **Act 1 opens** with "the trilogy state at end of post 2" (§1) and lands at "here are the columns SAM 3 and the depth/normals specialists each occupy" (§3 names the columns). **Closes** with the question: "what does the column look like if we replace the encoder with a generator?"
- **Act 2 opens** by answering the column-by-column question: VB scores 0.699 / 0.929 / 0.882 / 15.549 across the four columns (§§4–7 explain *how*; §8 lays out *the chart*). **Closes** with the honest framing: VB wins or rivals across the spread; deltas are modest.
- **Act 3 opens** with "why a generator was the candidate" — backing into the lineage (§§9–14). **Closes** with what the paper does *not* prove (§15) and what the trilogy collectively argues (§16). Final coda returns to "where the softmax sits" — the question that has been threading the whole trilogy.

Throughline references appear in §1, §3, §5, §6, §7, §8, §15. Every act carries it. Gate 1 should not flag throughline-thread holes.

### Section-connection audit (one-line "Reader can now" per section)

```
§1  → Reader can now: see the trilogy's state and the question post 3 is answering.
§2  → Reader can now: distinguish discriminative read-off from generative paint as the paradigm choice.
§3  → Reader can now: name the dedicated specialists VB will be compared against and locate them on the benchmark tables.
§4  → Reader can now: see Vision Banana's architecture: NBP substrate + thin instruction-tune layer + very-low mix ratio.
§5  → Reader can now: predict what segmentation output looks like (RGB image where pixel colors encode class).
§6  → Reader can now: predict what depth output looks like (power-transformed false-color along RGB cube edges).
§7  → Reader can now: predict what surface-normal output looks like (xyz mapped directly to RGB).
§8  → Reader can now: read the four benchmark tables and see where VB wins, rivals, or trails.
§9  → Reader can now: place MAE in the lineage (reconstruction = pretraining, 2021).
§10 → Reader can now: see Painter's contribution (output space as image).
§11 → Reader can now: see SegGPT's contribution (in-context coloring as the specific reframe for segmentation).
§12 → Reader can now: see DIFT's contribution (generators contain features, no supervision needed).
§13 → Reader can now: see Nano Banana Pro's role as the production substrate (2025).
§14 → Reader can now: trace the full arc from MAE to Vision Banana.
§15 → Reader can now: list what the paper does NOT prove and why the deltas, while real, are modest.
§16 → Reader can now: state the trilogy's collective thesis about where the softmax sits.
```

Every "Reader can now" chains forward without a gap. Gate 1 should not flag missing rungs.


codex
I’ll do this as a Gate 1 structural review only, using the embedded notes as the source of truth and not touching the other AI skill directories you excluded. I’m doing a quick memory check for prior augusteo.com context, then I’ll focus on outline/figure connectivity rather than re-verifying the matrix.
exec
/bin/zsh -lc 'rg -n "generative-vision-stack|multi-gpu-training|augusteo.com-astro|Vision Banana|Gate 1|outline|figure" /Users/vic/.codex/memories/MEMORY.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
47:- symptom: the visuals look good but do not increase reader trust -> cause: the post relies on schematic SVGs without real outputs or a running example across methods -> fix: call out the evidence gap and ask for empirical figures early in the critique [Task 2]
88:# Task Group: /Users/vic/dev/augusteo.com-astro multi-gpu-training factual review and figure UX fixes
89:scope: reviewing and then correcting the Astro blog's `multi-gpu-training` post plus its interactive figures when the user wants factual grounding, source-backed fixes, and intuitive looping figure behavior
90:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout's blog/figure paths and similar Astro content-plus-figure tasks, but re-verify ML/hardware claims against current primary sources
92:## Task 1: Review multi-gpu-training post and figures for factual grounding, issues found
96:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, review found stale and overstated claims before the fix pass)
100:- Astro, MDX, Svelte, multi-gpu-training, factual audit, deep research, DeepSeek-V3, Llama 3 405B, FSDP2, DTensor, NCCL, FP8, GB300, H200, decision-calculator.ts, memory-bar.ts, moe-routing.ts
102:## Task 2: Fix post claims and make the multi-GPU figures more intuitive, success
106:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, content corrections plus looping scrubber and figure UX fixes)
110:- intuitive figures, play button should loop instead of just going one time, Scrubber.svelte, autoLoop, play looping animation, DdpStep.svelte, DualPipe.svelte, Fsdp.svelte, MoeLoad.svelte, RingAllReduce.svelte, RingAttention.svelte, heroAlt
117:- when the user asked to "make sure the design of the figures is good too. should be intuitive" -> future figure edits should optimize for intuitive framing and readable labels, not only factual correctness [Task 2]
118:- when the user said the play button should "loop instead of just going one time" -> future scrubbable figures should default to looping playback unless the user asks for one-shot animation [Task 2]
122:- the truth-sensitive edit surfaces for this post family are `src/content/blog/multi-gpu-training/index.mdx`, interactive logic under `src/figures/multi-gpu-training/`, and visual components under `src/components/figures/multi-gpu-training/` [Task 1][Task 2]
123:- `bun run astro -- build` succeeded before and after the fix pass, so future work can distinguish factual/content issues from compile/runtime issues; the build emitted only the pre-existing `untrack` warning in `src/components/figure/Canvas2D.svelte` [Task 1][Task 2]
124:- local verification path is `bun run astro -- dev --host 127.0.0.1 --port 4321`, then inspect `/blog/multi-gpu-training`; a plain localhost `curl` can fail until the server is actually running and listening [Task 1]
127:- `src/components/figure/Scrubber.svelte` already supported looping; the practical fix was changing the default `autoLoop` to `true` and removing `autoLoop={false}` from the multi-GPU figure components that opted out [Task 2]
128:- the memory-bar follow-up edits were concrete and reusable: add `GB300`, correct `H200` to `141 GB`, and label the readout as a coarse state estimate that omits activations when the figure is illustrative rather than exact [Task 2]
132:- symptom: teaching figure or calculator disagrees with the prose's "production examples" -> cause: interactive logic drifted from the article narrative -> fix: cross-check `decision-calculator.ts` against each named example before signing off on factual accuracy [Task 1][Task 2]
135:- symptom: hardware-capacity labels read as "updated truth" but are stale -> cause: figure values were not checked against current vendor pages -> fix: verify current NVIDIA naming/capacity before leaving memory-figure labels unchanged [Task 1]
138:# Task Group: /Users/vic/dev/augusteo.com-astro Codex instruction symlink
140:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout and similar repos that already have a root `CLAUDE.md`; prefer re-checking repo instruction layout before reusing
146:- rollout_summaries/2026-04-25T23-17-05-SHdj-codex_config_symlink_agents_to_claude.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-17-05-019dc6ee-b179-7612-9a15-da18473c6e35.jsonl, updated_at=2026-04-25T23:20:20+00:00, thread_id=019dc6ee-b179-7612-9a15-da18473c6e35, committed on `main`)
167:- symptom: `git add` or `git commit` fails with `fatal: Unable to create '/Users/vic/dev/augusteo.com-astro/.git/index.lock': Operation not permitted` -> cause: git lockfile creation was blocked in that environment -> fix: retry in an environment with sufficient filesystem permissions instead of assuming the repo state is broken [Task 1]

codex
STRUCTURAL findings:

1. **§16 / Coda: “single forward pass” and “where the softmax sits” are unsupported and probably wrong for the generative side.**  
   Matrix rows 4–7 support RGB parameterization and decode-by-color, not a single forward pass. A production image generator is not naturally described as one forward pass, and the coda’s “somebody else’s softmax” does not match the described Vision Banana decoding path. This is not a polish issue; it corrupts the trilogy thesis.

2. **§3: “each one is a strong, dedicated, published-this-year specialist” is contradicted by the matrix.**  
   Rows 26–27 explicitly include Depth Pro 2024, StableNormal 2024, and DSINE 2024. The section can say “recent specialist baselines,” but “published-this-year” is false.

3. **§3: “each one wins (or rivals) its specific benchmark” needs rows or narrowing.**  
   Rows 26–27 identify competitors and chart membership; they do not establish that each named specialist wins or rivals its own benchmark. This claim would require new rows per specialist or should be deleted.

4. **§4: “the base generator is most of the way there before vision-task training” is not backed.**  
   Rows 2–3 support instruction-tuning with a very low ratio. Row 13 says the paper reports preserved generation capability. None of that proves the base generator was “most of the way there.” This needs hedging as inference, or a new source/row.

5. **§13: “trained on web-scale image-text data” has no matrix row.**  
   Row 14 backs Nano Banana Pro as a production model released through Google channels. It does not back training-data scale or composition. Add a row or cut “web-scale image-text.”

6. **§1: trilogy recap imports unsupported claims from prior posts.**  
   “C-RADIOv4 with three teachers,” “Nemotron 3 Nano Omni,” and “state of the art at the end of post 2 was encoder front, text decoder back” have no rows in this matrix. If these are load-bearing bridge claims, they need rows or explicit “as argued in post 1/2” treatment with links.

7. **§9: MAE is overloaded into a hindsight claim.**  
   Row 15 backs masked-patch reconstruction and the asymmetric encoder-decoder. It does not back “the pretraining task is generation” in the same paradigm sense as Vision Banana, nor “we just didn’t know yet that the output it learned was useful for perception.” This risks making the lineage feel inevitable by assertion.

8. **§12: “the information was in the gradients all along” is not backed and muddles the mechanism.**  
   Row 19 backs diffusion features containing correspondence signal. It does not say gradients contain the information. Replace with features/intermediate representations or add a source.

9. **Missing rung: §3 → §4 jumps from benchmark lineup to architecture without a motivating failure.**  
   The stated ramp is “each rung motivated by a failure of the rung below.” §3 lists specialists, but does not show what fails: separate heads? separate models? lack of shared output interface? §4 then introduces Vision Banana as the answer. Add the failure explicitly before “Meet Vision Banana.”

10. **Missing rung: §8 → §9 jumps from results to lineage without a mechanism question.**  
   §8 lands “generalist across spread.” §9 begins MAE. The reader needs the hinge: “why would a generator have the representations needed for dense prediction before task tuning?” Without that, the lineage reads like history after the fact.

11. **Dead weight: §11 is redundant unless it adds a new segmentation intuition beyond §5.**  
   §5 already explains JSON class-to-color prompting and explicitly names SegGPT lineage. §11 says the JSON prompt is SegGPT wrapped in JSON and has no figure. If removed, §12 still lands. Merge §11 into §5 or make it carry a distinct mechanism.

12. **Dead weight: §13 is too thin as a standalone section.**  
   §4 already introduces Nano Banana Pro as the substrate, release date, and production identity. §13 repeats this with “web-scale” added unsupported. If removed, §14 synthesis still lands. Merge §13 into §4 or §14.

13. **Throughline hole: Act 3 drops the benchmark-table object until §15.**  
   The audit claims every act carries the throughline, but §§9–14 do not explicitly return to Cityscapes / depth / normals columns. Act 3 should keep asking how each lineage step explains one of those columns, otherwise the throughline becomes history rather than the recurring object.

14. **Figure 3 duplicates Figure 8’s “one model across columns” role.**  
   Fig 3 says “one box vs six”; Fig 8 says “VB at or near top everywhere.” Fig 3 does not isolate a mechanism, only prefigures the benchmark spread. Either make Fig 3 a concrete benchmark-table orientation figure or cut it.

15. **Figure 12 duplicates the Act 3 section structure instead of carrying new visual weight.**  
   A horizontal lineage timeline with labels repeats §§9–14. Unless it shows the mechanism handoff from each predecessor into a specific Vision Banana component, it is a recap slide, not a figure.

16. **Figure 1 is likely cosmetic.**  
   The blank bottom lane establishes “post 3 will answer this,” but §2 and Fig 2 already establish the paradigm question. If removed, §2 still lands. Keep only if it materially connects to the trilogy’s prior visual grammar.

No TYPE-CHANGE STRUCTURAL findings. The all-static choice is correct; none of the figure mechanisms requires continuous sweep, time evolution, drag spatial reasoning, or multi-state toggle.


2026-05-03T01:24:31.471555Z ERROR codex_core::session: failed to record rollout items: thread 019deb6f-34c6-7913-baef-bee5c256fd8c not found
tokens used
43,841
STRUCTURAL findings:

1. **§16 / Coda: “single forward pass” and “where the softmax sits” are unsupported and probably wrong for the generative side.**  
   Matrix rows 4–7 support RGB parameterization and decode-by-color, not a single forward pass. A production image generator is not naturally described as one forward pass, and the coda’s “somebody else’s softmax” does not match the described Vision Banana decoding path. This is not a polish issue; it corrupts the trilogy thesis.

2. **§3: “each one is a strong, dedicated, published-this-year specialist” is contradicted by the matrix.**  
   Rows 26–27 explicitly include Depth Pro 2024, StableNormal 2024, and DSINE 2024. The section can say “recent specialist baselines,” but “published-this-year” is false.

3. **§3: “each one wins (or rivals) its specific benchmark” needs rows or narrowing.**  
   Rows 26–27 identify competitors and chart membership; they do not establish that each named specialist wins or rivals its own benchmark. This claim would require new rows per specialist or should be deleted.

4. **§4: “the base generator is most of the way there before vision-task training” is not backed.**  
   Rows 2–3 support instruction-tuning with a very low ratio. Row 13 says the paper reports preserved generation capability. None of that proves the base generator was “most of the way there.” This needs hedging as inference, or a new source/row.

5. **§13: “trained on web-scale image-text data” has no matrix row.**  
   Row 14 backs Nano Banana Pro as a production model released through Google channels. It does not back training-data scale or composition. Add a row or cut “web-scale image-text.”

6. **§1: trilogy recap imports unsupported claims from prior posts.**  
   “C-RADIOv4 with three teachers,” “Nemotron 3 Nano Omni,” and “state of the art at the end of post 2 was encoder front, text decoder back” have no rows in this matrix. If these are load-bearing bridge claims, they need rows or explicit “as argued in post 1/2” treatment with links.

7. **§9: MAE is overloaded into a hindsight claim.**  
   Row 15 backs masked-patch reconstruction and the asymmetric encoder-decoder. It does not back “the pretraining task is generation” in the same paradigm sense as Vision Banana, nor “we just didn’t know yet that the output it learned was useful for perception.” This risks making the lineage feel inevitable by assertion.

8. **§12: “the information was in the gradients all along” is not backed and muddles the mechanism.**  
   Row 19 backs diffusion features containing correspondence signal. It does not say gradients contain the information. Replace with features/intermediate representations or add a source.

9. **Missing rung: §3 → §4 jumps from benchmark lineup to architecture without a motivating failure.**  
   The stated ramp is “each rung motivated by a failure of the rung below.” §3 lists specialists, but does not show what fails: separate heads? separate models? lack of shared output interface? §4 then introduces Vision Banana as the answer. Add the failure explicitly before “Meet Vision Banana.”

10. **Missing rung: §8 → §9 jumps from results to lineage without a mechanism question.**  
   §8 lands “generalist across spread.” §9 begins MAE. The reader needs the hinge: “why would a generator have the representations needed for dense prediction before task tuning?” Without that, the lineage reads like history after the fact.

11. **Dead weight: §11 is redundant unless it adds a new segmentation intuition beyond §5.**  
   §5 already explains JSON class-to-color prompting and explicitly names SegGPT lineage. §11 says the JSON prompt is SegGPT wrapped in JSON and has no figure. If removed, §12 still lands. Merge §11 into §5 or make it carry a distinct mechanism.

12. **Dead weight: §13 is too thin as a standalone section.**  
   §4 already introduces Nano Banana Pro as the substrate, release date, and production identity. §13 repeats this with “web-scale” added unsupported. If removed, §14 synthesis still lands. Merge §13 into §4 or §14.

13. **Throughline hole: Act 3 drops the benchmark-table object until §15.**  
   The audit claims every act carries the throughline, but §§9–14 do not explicitly return to Cityscapes / depth / normals columns. Act 3 should keep asking how each lineage step explains one of those columns, otherwise the throughline becomes history rather than the recurring object.

14. **Figure 3 duplicates Figure 8’s “one model across columns” role.**  
   Fig 3 says “one box vs six”; Fig 8 says “VB at or near top everywhere.” Fig 3 does not isolate a mechanism, only prefigures the benchmark spread. Either make Fig 3 a concrete benchmark-table orientation figure or cut it.

15. **Figure 12 duplicates the Act 3 section structure instead of carrying new visual weight.**  
   A horizontal lineage timeline with labels repeats §§9–14. Unless it shows the mechanism handoff from each predecessor into a specific Vision Banana component, it is a recap slide, not a figure.

16. **Figure 1 is likely cosmetic.**  
   The blank bottom lane establishes “post 3 will answer this,” but §2 and Fig 2 already establish the paradigm question. If removed, §2 still lands. Keep only if it materially connects to the trilogy’s prior visual grammar.

No TYPE-CHANGE STRUCTURAL findings. The all-static choice is correct; none of the figure mechanisms requires continuous sweep, time evolution, drag spatial reasoning, or multi-state toggle.


