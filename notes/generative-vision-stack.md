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

## Codex research review

**Run 1 — 2026-05-02.** Findings: 7 STRUCTURAL, 2 COSMETIC. Full transcript: [notes/generative-vision-stack-codex-research-20260502.md](generative-vision-stack-codex-research-20260502.md).

**One-paragraph summary.** Codex audited the matrix against the Vision Banana project page, the arxiv abstract, and the Google Nano Banana Pro blog post. It found that several matrix rows had drift between the cited claim and what the source actually says: the depth chart competitors were misnamed (0.823 belongs to UniK3D, not DAv2); the DA3 framing implied that Vision Banana benchmarked against the Depth Anything line when in fact the project page chart benchmarks against Depth Pro / MoGe-2 / UniK3D and includes neither V2 nor V3; the Nano Banana Pro citation drew from the page's AI-generated summary (which violates the no-AI-content primary rule); the throughline narrated a "city-street photo run through SAM3 and Vision Banana" that the matrix does not back with any reproducible same-image source; and the post's framing of the paper's central thesis leaned on the paper's own causal language without saying "the paper argues / suggests." Codex also flagged six PDF-method rows (3, 5, 6, 7, 11, 12) as not independently verified through accessible primary text in this pass. **One finding (#1, "central payoff numbers are wrong") was rejected on re-fetch:** codex misread the chart bar values; the project page actually shows Vision Banana 0.842 vs SAM 3 0.699 on Cityscapes (codex inverted the values, putting 0.842 on the SegMan-L Non-Zero-Shot bar). The original matrix row 8 was correct; rebuilt with the full chart spread to make the source-clean reading explicit.

**Findings table.**

| # | Codex label | Claim type | Outcome |
|---|---|---|---|
| 1 | STRUCTURAL — Cityscapes payoff numbers wrong | Source-misreading challenge | **Rejected** on re-fetch. Project page actually shows VB 0.842, SAM 3 0.699 (codex inverted the chart). Row 8 rebuilt to enumerate every bar so the reading is unambiguous. |
| 2 | STRUCTURAL — depth row attributes wrong baseline (0.823 ≠ DAv2) | Mis-attribution | **Accepted.** Row 9 fixed: depth chart competitors are Depth Pro / MoGe-2 / UniK3D (Depth Anything not in chart). Row 22 (DAv2 recipe) demoted to lineage-only. New row 26 added for the actual depth competitors. |
| 3 | STRUCTURAL — DA3 framing under-specified | Framing error | **Accepted.** Row 23 rewritten: project-page chart includes neither V2 nor V3; post cannot claim "VB beats the Depth Anything line." |
| 4 | STRUCTURAL — "city-street photo run through SAM3 and VB" not backed | Unsupported throughline | **Accepted.** Throughline rewritten so the recurring object is the Cityscapes mIoU benchmark (a citable chart), not a specific photo. New row 28 added as a constraint flag for Phase 4: any single-image figure must be illustrative-not-evaluative with explicit figcaption disclaimer. |
| 5 | STRUCTURAL — "SAM3 strongest dedicated segmenter" overclaimed | Overclaim | **Accepted.** Throughline softened to "the most recent prompt-based segmentation foundation model in this lineage." |
| 6 | STRUCTURAL — pretraining causality not fenced hard enough | Causal overclaim | **Accepted.** Rows 1 and 13 hedged to "the paper *argues* / *reports*"; throughline Act 3 carries the same hedge. The "no random-init ablation" gap is a documented constraint. |
| 7 | STRUCTURAL — Nano Banana Pro row 14 cites AI-generated summary | Source primacy | **Accepted.** Row 14 re-pointed at the article body of [blog.google/innovation-and-ai/products/nano-banana-pro/](https://blog.google/innovation-and-ai/products/nano-banana-pro/); marked pending body-text re-fetch to lock the exact wording. |
| 8 | COSMETIC — PDF-method rows 3, 5, 6, 7, 11, 12 unverified | Verification gap | **Acknowledged.** These cite a direct WebFetch of the Vision Banana PDF that returned the relevant Methods section verbatim. The PDF text is not independently accessible to codex (no internet PDF fetch). Treating as marginal-near-bar; hedge to "as reported in the paper's Methods section" in the prose. |
| 9 | COSMETIC — Lotus-2 date off by UTC submission | Date precision | **Accepted.** Row 24 updated to "v1 submitted 2025-11-30, v2 2025-12-04." |

**Disagreement on finding #1 (initially recorded; later RETRACTED — see run-2 below).** Run-1 codex's claim was that VB scores 0.699 and SAM 3 scores 0.652 on Cityscapes (with SegMan-L 0.842 as the non-zero-shot ceiling). I rejected this on the basis of a direct WebFetch of the project page that returned VB=0.842, SAM 3=0.699. **That rejection was wrong.** See run-2 retraction below.

**Run 2 — 2026-05-02 (same day; same codex consult skill, fresh session).** Codex pulled the arxiv HTML version of the paper directly and surfaced unambiguous textual evidence: Table 2(a) "Cityscapes val" reports Vision Banana 0.699, SAM 3 0.652, SegMan-L (Non Zero-Shot) 0.842; the paper's prose says "Vision Banana surpasses SAM 3 by 4.7 points in mIoU" — and 0.699 − 0.652 = 0.047 (4.7 points), which is the smoking gun. The 0.842 vs 0.699 reading produces 14.3 points, which is not what the paper claims. **Run-1 finding #1 was correct; my override was wrong.** Likely cause: WebFetch's chart-bar summarizer mis-associated bar heights with model labels twice (consistently in the same wrong direction). The paper's table text is unambiguous and authoritative. Retraction logged: matrix row 8 rewritten to cite the paper Table 2(a), not the project-page chart.

**Run 2 findings (5 STRUCTURAL + 1 COSMETIC), all accepted.**

| # | Codex label | Outcome |
|---|---|---|
| run-2 #1 | STRUCTURAL — row 8 still wrong (the rebuilt enumeration was based on the misread project page) | **Accepted (retraction).** Row 8 rewritten to cite paper Table 2(a) primary text; VB 0.699, SAM 3 0.652, SegMan-L (NZS) 0.842. |
| run-2 #2 | STRUCTURAL — throughline depends on the false Cityscapes payoff | **Accepted.** Throughline rewritten with corrected numbers; the framing pivot from "VB routs SAM 3 by 14 points" to "VB edges SAM 3 by 4.7 points zero-shot, the in-domain SegMan-L ceiling sits at 0.842" is the new payoff. The thesis (one model rivals or beats specialists across the spread) is stronger than the broken framing. |
| run-2 #3 | STRUCTURAL — rows 9 / 23 omit the paper's direct DA3 comparison | **Accepted.** Row 9 split into 9a (project-page six-benchmark chart, no DA3) and 9b (paper §3.2 / Table 3 four-dataset average vs DA3, VB 0.929 vs DA3 0.918). Row 23 rewritten to point at the paper's own DA3 comparison; the prior "VB does not benchmark against DA3" framing was wrong — the paper does benchmark against DA3, just not on the six-dataset chart. |
| run-2 #4 | STRUCTURAL — row 26 cites wrong MoGe-2 arxiv ID (2509.02866 is an optics paper) | **Accepted.** Row 26 fixed: MoGe-2 = arxiv:2507.02546 (Wang et al., Microsoft, v1 2025-07-03; verified by direct fetch of the abstract page). |
| run-2 #5 | STRUCTURAL — row 27 cites wrong Marigold arxiv ID for surface normals (2312.02145 is depth-only) | **Accepted.** Row 27 fixed: Marigold (with surface-normals coverage) = arxiv:2505.09358 (Ke et al., v1 2025-05-14; verified by direct fetch of the abstract page; abstract explicitly mentions "surface normals prediction"). |
| run-2 #6 | COSMETIC — row 14 "pending body-text re-fetch" annotation is stale; codex confirmed body content | **Accepted.** Row 14 updated: rollout via Gemini app, Gemini API / Google AI Studio, Vertex AI; pending annotation removed; "Vertex AI" used (not "Vertex AI Studio"). |

Run-2 also confirmed: rows 1 and 13 (causality hedging) are now acceptable; row 28 (single-image-figure constraint) is well-formed.

**Lessons recorded for the resume agent.** When the matrix relies on a bar-chart presentation, do NOT trust a WebFetch summarizer's reading of which bar maps to which label. Either (a) cite the paper's table text directly (always preferable when available), (b) verify with two independent reading sources that produce the same model→value mapping, or (c) cite the chart in a way that doesn't load-bear on which bar corresponds to which label.

**Run 3 — 2026-05-02.** Final invocation in the Gate-runner cap of 3. Codex confirmed the matrix is sound: *"row 8 is now correct; 9a and 9b are distinct in the matrix; row 23 plus row 9b no longer overclaim the DA3 comparison; the Spec / Throughline headline numbers match the matrix; and the run-1 override retraction is explicit enough to prevent a silent re-flip."* It surfaced 2 STRUCTURAL findings that were stale text in non-matrix sections (Sub-topic C "Implication for the post" still claimed "the paper does not include DA3"; Research-notes "Source-primacy correction" overcorrected by saying the project page is no longer cited at all when in fact rows 9a + 10 cite it for chart-only values) plus 2 COSMETIC. All four were applied: stale paragraphs rewritten or narrowed; "Flagged-for-Phase-2" section converted to a "Resolved" audit trail; starter-source #4 re-labeled as historical lineage context. **Gate 0 closes cosmetic-only** — the matrix passes; remaining run-3 findings were editorial cleanup of inconsistent text rather than load-bearing claim errors.

## Resume here

Last touched: 2026-05-02.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` (this file) + project memory |
| 2. Research / fact-check | done (Gate 0 passed cosmetic-only on run 3 of 3) | `## Research notes`, `## Claim-source matrix`, `## Codex research review` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/generative-vision-stack/index.mdx` |
| 5. Implement figures | pending | per-figure table below (populated end of Phase 3) |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-02 | 0 (research) — run 1 | structural-fixes-applied (6 of 7 STRUCTURAL accepted; 1 initially rejected on re-fetch — that override was later RETRACTED in run 2 below); 2 COSMETIC accepted. | [notes/generative-vision-stack-codex-research-20260502.md](generative-vision-stack-codex-research-20260502.md) + `## Codex research review` summary in this file |
| 2026-05-02 | 0 (research) — run 2 | structural-fixes-applied (5 of 5 STRUCTURAL accepted, including retraction of run-1 finding #1 override; 1 COSMETIC accepted). | `## Codex research review` Run 2 section in this file |
| 2026-05-02 | 0 (research) — run 3 | **GATE 0 PASSES (cosmetic-only)**. Codex explicitly confirmed the matrix is sound; 2 STRUCTURAL findings on stale non-matrix text (Sub-topic C implication paragraph + Source-primacy correction overcorrection) + 2 COSMETIC (stale Phase-2 flag + DAv2 starter-source label). All four applied as editorial cleanup. | `## Codex research review` Run 3 section in this file |

### Phase 5 figure progress

*(populated at end of Phase 3 once figure list is locked)*

### Suggested next batch

1. Phase 3: draft `## Outline` — three-act section structure, numbered figures, throughline-thread check (per `narrative-template.md` and `figure-recipes.md`).
2. Per-figure type lock: default 100% static-svg; only override on the four-clause rule.
3. Run Gate 1 (outline + figure list structural pass via codex consult).
4. Resolve any STRUCTURAL findings; advance to Phase 4 drafting.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/generative-vision-stack/index.mdx` for remaining placeholders (file does not yet exist; Phase 4 creates it).
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in `## Claim-source matrix` with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness. Date of publication, not date of last research.
2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero (except in `## Act ` headings). Banned words: justify or rewrite.
4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-triggered without Vic prompting; all use the project-local `codex` skill.
5. **Static is the figure default for new figures.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle). For this post: 100% static unless a clause obviously fires.
6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
7. **One section per commit, one figure per commit, one migration per commit.** Safe revert points.
8. **Sentence-case headings.** Numbered sections (`### 3. ...`) match the trilogy. Em dashes (U+2014) forbidden in prose; permitted in `## Act ` headings; en dashes (U+2013) allowed everywhere.
9. **`draft: false` from Phase 1 onward** (topic mode). No flipping back.
10. **Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.**
