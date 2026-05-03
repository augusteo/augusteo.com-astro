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

1. **Where the trilogy left off.** Recap: [post 1 (Unified Vision Stack)](/blog/unified-vision-stack) ended at C-RADIOv4 (encoder-as-spinal-cord with three teachers, as argued there); [post 2 (Omni-Modal Stack)](/blog/omni-modal-stack) ended at Nemotron 3 Nano Omni (encoder + text decoder, as argued there). The recap claims here are cross-references to the prior posts; the linked posts carry the matrix-backed details, this section just establishes the starting state for post 3. The shape: encoder front, decoder back. *Throughline anchor:* SAM 3's 0.652 mIoU on the Cityscapes Table 2(a) column is one specific instance of "the encoder front." (No figure — the trilogy state is established in two paragraphs of recap with explicit links; Gate 1 finding #16 cut the original Fig 1 as cosmetic.)
2. **Two ways to read what's in an image.** The paradigm contrast: discriminative read-off (image → encoder → head → integers) vs generative paint (image + prompt → generator → RGB output → decode-as-mask). The crucial move is *what the model emits*. Discriminator: a small grid of integers, sampled from a head's softmax. Generator: another image, decoded back to integers by a per-pixel color → class lookup. **Fig 1 (ParadigmFlip):** static-svg. Top half: image → encoder block → head → mask (integers). Bottom half: image + prompt JSON → generator block → RGB output → decode lookup → mask (integers). Same input, same output, different middle. Reader notices: the model's output stops being a label grid and starts being a picture; the integers come from a lookup at the end, not a head's softmax.
3. **The dedicated specialists.** Naming the lineup VB will be compared against on the paper's benchmark tables: SAM 3 (concept-prompted segmentation, 2025-11-20); Depth Pro (2024-10) / MoGe-2 (2025-07) / UniK3D (2025-03) for monocular metric depth, on the project-page chart; Marigold / StableNormal / DSINE / Lotus-2 for surface normals; Depth Anything 3 (2025-11-13) as the specialist VB compares against in Table 3. Each is a recent specialist baseline. Each model emits a different output format (binary masks for SAM 3; raw float depth for Depth Pro; raw float normals for DSINE; etc.); each has its own training pipeline; each requires its own integration in any system that wants to use it. *The failure mode of this lineup is the interface mismatch:* six APIs, six output formats, six independent training stories. The implicit promise of any "generalist vision model" is to collapse all six into one model with one output format and one training pipeline. **Fig 2 (SpecialistLineup):** static-svg. Six specialist boxes side-by-side — each with a different output-format icon (mask grid for SAM 3; float-grid for depth/normals; etc.). Below them, an arrow pointing down to a single Vision Banana box that emits one output format (RGB image) for all six tasks. Reader notices: today's specialists each have a different shape of output; the question is whether one shape (RGB image) can take over all six columns.

### Act 2 — the flip (how Vision Banana works)

4. **Meet Vision Banana.** The architecture overview: Nano Banana Pro (Google's production image generator, released 2025-11-20, = Gemini 3 Pro Image; reached production scale across the Gemini app, Gemini API / Google AI Studio, and Vertex AI) is the substrate. Vision Banana is built by *instruction-tuning* NBP on a mix that adds vision-task data at "a very low ratio" — the paper's exact phrasing. The paper *reports* that the base model's image-generation capabilities are preserved through the tune. The recipe is "minimal task-data uplift on top of an already-deployed generator," which we can frame as inference (not as a sourced causal claim about pretraining sufficiency): if a tiny instruction-tune mix produces the benchmark spread we'll see in §8, then most of the relevant capacity must already be in the substrate. The matrix backs the recipe (rows 2, 3, 13); the "most of the way there" framing is honestly inferred, not directly sourced. **Fig 3 (VisionBananaArch):** static-svg. NBP at the center as a deep stack with annotation "production generator, deployed via Gemini app / API / Vertex AI"; a small instruction-tune layer wrapped around it; the vision-task data shown as a thin sliver of the training mix; output is an RGB image. Reader notices: the tune is light; if the spread in §8 holds up, the substrate must be pulling most of the weight.
5. **Segmentation as in-context coloring.** The specific recipe: a JSON class-to-color prompt (`{"cat": "red", "lock": "pink"}`); the model paints an RGB image where each class's pixels carry that color; decode = pixel-color-to-class lookup. The technique is a direct lift from SegGPT (2023, see §11). *Throughline thread:* this is how VB scores 0.699 zero-shot mIoU on Cityscapes Table 2(a) — the prompt makes the 19 Cityscapes classes the chart's *output palette*, the model paints the scene with those classes' colors, and the decode reduces to a per-pixel lookup against the prompt. **Fig 4 (SegmentationAsColoring):** static-svg. Input image of a street scene; JSON prompt to the right; output: RGB-painted image with car/sidewalk/sky/etc. as distinct colors; decode arrow → mask of class labels. Figcaption disclaimer: drawn schematically; backed by aggregate Cityscapes mIoU, not this specific image. Reader notices: the mask is just an image; the class labels are colors; decode is a hash-table lookup.
6. **Depth as power-transformed false-color.** A more elaborate parameterization: depth values are re-scaled with a power transform (λ=−3), then mapped onto a piecewise-linear path along edges of the RGB cube — the paper's "carefully constructed false-color visualization." The result is an image whose hue at each pixel encodes that pixel's metric distance from the camera. *Throughline thread:* this is how VB scores 0.882 on the project-page six-benchmark average (vs UniK3D 0.823) and 0.929 on the four-dataset DA3 overlap (vs DA3 0.918). The paper's specific numbers come from this specific colormap. **Fig 5 (DepthAsFalseColor):** static-svg. Three panels: (a) input image; (b) the power-transform curve plotted as input depth → output color-position-along-cube-edge; (c) the resulting false-color depth image. Reader notices: the "depth map" is just a carefully chosen colormap baked into the model's image output.
7. **Surface normals as direct xyz→RGB.** The simplest of the three reframings: a unit-vector direction in 3D maps directly to an RGB triple. The paper's example: "Facing Left (−1, 0, 0) is encoded as Pinkish Red." No transform; the geometry IS the color. *Throughline thread:* 15.549° MAE on the project-page three-benchmark normals average, beating Lotus-2 by 1.0°. **Fig 6 (NormalsAsXYZ):** static-svg. Left: a 3D unit sphere with axis labels (X right, Y up, Z out). Right: the RGB cube. Arrows mapping (−1, 0, 0) → pinkish red; (0, 1, 0) → green; etc. The same arrow set drawn on a normal map of a small object so the reader sees the encoding live. Reader notices: direction in space and color are literally the same thing here.
8. **The benchmark spread, honestly.** The full picture: zero-shot Cityscapes mIoU (Table 2(a)) — VB 0.699 vs SAM 3 0.652 (4.7-pt edge), with the non-zero-shot SegMan-L ceiling at 0.842 still well above; six-benchmark depth (project page) — VB 0.882 vs UniK3D 0.823 (5.9-pt edge); four-dataset depth vs DA3 (Table 3) — VB 0.929 vs DA3 0.918 (1.1-pt edge); three-benchmark normals (project page) — VB 15.549° vs Lotus-2 16.558° (1.0° edge). The story is "wins or rivals across the spread," not "crushes any one." **The hinge to Act 3:** the spread holds up, but the paper publishes no random-init ablation. So the question Act 3 has to answer is — *why would a model trained only to paint pictures already have the representations needed for dense prediction, before any vision-task tuning?* The answer is the lineage. **Fig 7 (BenchmarkSpread):** static-svg. Four side-by-side bar groups, one per benchmark. Vision Banana bars highlighted; specialists shown alongside; the SegMan-L NZS ceiling drawn as a dashed line on the Cityscapes group. Reader notices: every column has VB at or near the top; the deltas are real but modest; this is a generalist-across-a-spread argument, not a specialist-replacement argument.

### Act 3 — why it works (the lineage and the paradigm shift)

9. **MAE (2021): reconstruction as pretraining.** The starting point of the arc. He, Chen, Xie, Li, Dollár, Girshick: mask random patches of a ViT input, train an asymmetric encoder–decoder to reconstruct the missing pixels. Reconstruction is the pretraining objective; the asymmetric encoder–decoder is the architecture; the 3× training speedup made the recipe practical at scale. *Throughline thread:* this is the rung where "training a model to recover pixels" first established itself as a credible pretraining recipe. The Cityscapes / depth / normals columns we'll re-examine downstream all sit downstream of "is reconstruction enough?" Whether the *output* learned during reconstruction also carries dense-prediction signal is the question Painter and SegGPT will answer in 2022 and 2023. **Fig 8 (MAEDiagram):** static-svg. Standard MAE schematic: image with masked patches → encoder over visible only → decoder reconstructs full image. Mirrors the DINOv3 figure shape from post 1 for visual continuity. Reader notices: reconstruction is the pretraining objective. The output is an image.
10. **Painter (2022): output space as image.** Wang et al.'s contribution: redefine the output of every vision task as an image. Train via masked image modeling on the *stitch* of input and output image pairs. The model learns to paint the answer. *Throughline thread:* Painter is the rung where "the segmentation column has the same output type as the input column" first happens. Vision Banana's Cityscapes mIoU 0.699 inherits this contract — the output is RGB, it always was. **Fig 9 (PainterStitched):** static-svg. An input image stitched horizontally to its output (e.g., RGB photo + segmentation map drawn as colors); a mask diagonally crossing both halves; the model trained to fill in the masked pixels. Reader notices: the output stopped being a different *kind* of thing than the input. Both are images.
11. **SegGPT (2023): random color mapping per sample.** Same group's follow-up adds a specific mechanism that goes beyond Painter: drop the *fixed* task vocabulary. The training corpus randomly recolors the same segmentation masks across samples — the model never sees a stable "red-means-cat" pairing. It learns "match-this-color-pattern" instead of "label-as-class-N." That's what makes a JSON prompt at inference time work for *any* class set, not just the canonical 19 Cityscapes classes. *Throughline thread:* SegGPT's random-recoloring trick is exactly what allows Vision Banana to swap class palettes per benchmark — the same VB checkpoint scores 0.699 on Cityscapes (19 classes) and gets used on RefCOCOg's referring-expression segmentation (open vocabulary) without retraining the segmentation head. The JSON prompt of §5 is SegGPT's contract made explicit. (No new figure; carries Fig 4 callback in prose.) Reader notices: the prompt isn't decoration; it's the mechanism that makes the same checkpoint work for any class set.
12. **DIFT (2023): correspondence emerges in diffusion features.** Tang et al.: pretrained diffusion models contain *intermediate features* that match the same object across images, with no explicit correspondence supervision. DIFT outperformed DINO and OpenCLIP on SPair-71k by 19 and 14 points respectively. The implication: the generator already learned dense per-pixel representations as a side-effect of denoising — and they transfer. *Throughline thread:* DIFT is the rung where the depth / normals columns first become plausible *without* per-task pretraining. If a denoising model can ship dense correspondences out-of-the-box, the path to Vision Banana's δ₁ 0.929 four-dataset depth is "scale this up." **Fig 10 (DIFTCorrespondence):** static-svg. Two images of the same animal in different poses; matched correspondence pairs marked with the same color across the pair; an arrow back into the diffusion model showing where these matches come from (intermediate UNet layer features). Reader notices: a model trained only to denoise pictures *also* knows what's the same across pictures.
13. **Vision Banana (2026): the synthesis.** Final rung. Lift SegGPT's random-color mechanism + Painter's stitched-I/O contract + DIFT's "features-already-have-correspondence" + MAE's "reconstruction is the pretraining" + Nano Banana Pro's production-scale substrate (released 2025-11-20, the deployed Gemini 3 Pro Image). Add a "very low ratio" of vision-task instruction data on top. Read perception off the generator's RGB output. The paper *argues* that image-generation pretraining serves a role analogous to LLM next-token pretraining; the benchmark spread of §8 is the evidence offered. *Throughline thread:* every column we touched in §8 traces back to a specific contribution in this lineage — Cityscapes mIoU rides on SegGPT's coloring, depth δ₁ rides on DIFT's features-as-correspondence, normals MAE rides on Painter's image-as-output. **Fig 11 (VisionBananaSynthesis):** static-svg. Five contribution arrows, each labeled with the *specific Vision Banana mechanism it lands in*: MAE → "reconstruction objective"; Painter → "stitched-image training contract"; SegGPT → "JSON prompt's color mapping"; DIFT → "dense per-pixel features in the substrate"; Nano Banana Pro → "production-scale substrate." Each arrow terminates at the corresponding Vision Banana component in §§4–7 (substrate / segmentation prompt / depth colormap / normals xyz→RGB). Reader notices: the timeline isn't decoration; each predecessor *has a specific component VB is reusing*.
14. **What the paper does NOT prove.** Honesty section: Vision Banana publishes no random-init ablation. The "image-generation pretraining is the right pretraining" claim is *argued from results*, not isolated. The benchmark deltas are real but modest (4.7pt zero-shot Cityscapes, 1.1pt over DA3, 5.9pt over UniK3D, 1° over Lotus-2). The non-zero-shot SegMan-L ceiling at 0.842 still sits well above zero-shot VB at 0.699. Specialists fine-tuned in-domain still win their column. What VB shows is that *one model* gets close-to-or-above zero-shot specialists across the whole spread, which is a different (and possibly more useful) thing than crushing any one. (No separate figure; this section is prose discipline + Fig 7 callback.) Reader notices: the paradigm flip is real; the magnitude of the win is small; the post should not overstate the latter.
15. **What the trilogy collectively argues.** Step back: post 1 said the encoder is the spinal cord; post 2 said feed it into a text decoder; post 3 says the generator might be the spinal cord. All three are coherent; each one widens the scope of what one foundation model has to do. The arc is "fewer, larger, more general models doing more dense-prediction work from one model invocation, with whatever decode lookup at the back is needed to read the answer out." **Fig 12 (TrilogyMeta):** static-svg. Three rows, top to bottom — Post 1: encoder + many heads; Post 2: encoder + text decoder + speech head; Post 3: generator + RGB-output → decode. The same image flows through each row. Reader notices: the same input has three different valid spinal cords, depending on what year you ask.

### Coda

A two-or-three-sentence ending. No "in summary." Borrowed shape from posts 1 and 2: end on a small, concrete point. Candidate close: *We used to ask the encoder for a label and it gave us integers from a head. Now we ask the generator for a picture and we read the integers back out of the colors. The model emits a different shape; the lookup at the back of the system is what makes the picture mean a class.*

### Figure summary table

| # | Figure | Type | Section(s) | Mechanism | Reader notices |
|---|---|---|---|---|---|
| 1 | ParadigmFlip | static-svg | §2 | Discriminative top half vs generative bottom half; same input → same output via different middle. | The model's *output* stops being integers from a head and becomes pixels read by a lookup. |
| 2 | SpecialistLineup | static-svg | §3 | Six specialist boxes (different output formats: mask grid, float grid, etc.); arrow down to one VB box that emits a single output format (RGB image) for all six tasks. | Today's specialists each have a different output shape; VB's claim is "one shape (RGB image) for all six columns." |
| 3 | VisionBananaArch | static-svg | §4 | NBP substrate (deployed via Gemini app / API / Vertex AI) + thin instruction-tune layer + tiny vision-task slice in the training mix. | The tune is light; if §8's spread holds, the substrate is pulling most of the weight. |
| 4 | SegmentationAsColoring | static-svg | §5, §11 (callback) | JSON prompt → input image → RGB-painted output → decode lookup → mask. | Mask = image; class labels = colors; decode = lookup. |
| 5 | DepthAsFalseColor | static-svg | §6 | Power-transform curve λ=−3 → RGB cube edge path → false-color depth image. | A "depth map" is a carefully chosen colormap baked into image output. |
| 6 | NormalsAsXYZ | static-svg | §7 | Unit sphere ↔ RGB cube; example axis-aligned mappings; sphere overlaid on a normal-map. | Direction in 3D space and color are the same thing here. |
| 7 | BenchmarkSpread | static-svg | §8, §14 (callback) | Four side-by-side bar groups (Cityscapes / 6-bench depth / 4-bench depth vs DA3 / 3-bench normals); SegMan-L NZS ceiling shown as dashed line. | VB at or near the top everywhere; modest deltas; generalist-across-spread argument. |
| 8 | MAEDiagram | static-svg | §9 | Image → masked patches → encoder over visible → decoder reconstructs missing. | Reconstruction is the pretraining objective. The output is an image. |
| 9 | PainterStitched | static-svg | §10 | Stitched I/O image; diagonal mask; masked-image-modeling fills it in. | Output stopped being a different *kind* of thing than input. |
| 10 | DIFTCorrespondence | static-svg | §12 | Two images of same object in different poses; matched correspondence pairs colored; arrow back into diffusion intermediate features. | A denoising model learns what's the same across images, no labels. |
| 11 | VisionBananaSynthesis | static-svg | §13 | Five contribution arrows from lineage papers, each terminating at a *specific* VB component (substrate / segmentation prompt / depth colormap / normals xyz mapping / etc.). | Each predecessor ships a specific mechanism; VB is the reuse. |
| 12 | TrilogyMeta | static-svg | §15 | Three rows — Post 1 / Post 2 / Post 3 — with the same input flowing through three different spinal cords. | The same image has three valid spinal cords, depending on the year. |

12 figures total (down from 13 — Gate 1 finding #16 cut the original Fig 1 TrilogyState as cosmetic; finding #12 merged §13 NBP into §13 synthesis). **All static-svg.** None of the four interactive override clauses fires (no continuous parameter sweep that aids intuition; no animated time evolution; no drag-based spatial reasoning; no toggle that needs more than a 3-panel side-by-side). The post can ship as 100% static SVG.

### Throughline-thread audit

Per `narrative-template.md` rhythm — each act opens with a throughline reference, runs the mechanism, closes with what the throughline now looks like differently:

- **Act 1 opens** with "the trilogy state at end of post 2" (§1, with explicit links back to posts 1 and 2) and lands at "here are the columns SAM 3 and the depth/normals specialists each occupy, and here is the failure mode of that lineup — six APIs, six output formats" (§3). **Closes** with: "the implicit promise of any generalist is to collapse all six into one output format. What if RGB image is that format?"
- **Act 2 opens** by answering the column-by-column question: VB scores 0.699 / 0.929 / 0.882 / 15.549 across the four columns (§§4–7 explain *how*; §8 lays out *the chart*). **Closes** with the honest framing AND the hinge to Act 3: VB wins or rivals across the spread, deltas are modest, and the paper publishes no random-init ablation — so what's loaded into the substrate that makes this possible? (§8 last paragraph hands off explicitly to Act 3.)
- **Act 3 opens** by answering: trace the substrate's load through the lineage (§§9–13), with each rung tied back to a specific column of §8's spread — MAE establishes "reconstruction is the pretraining objective"; Painter establishes "output is RGB" (Cityscapes column); SegGPT adds the random-color mechanism (Cityscapes prompt-coloring); DIFT adds dense-correspondence-from-features (depth + normals columns); NBP adds production-scale substrate (the deployed generator VB instruction-tunes from). §13's synthesis figure (Fig 11) ties each predecessor to the *specific Vision Banana component* it lands in. **Closes** with what the paper does *not* prove (§14) and what the trilogy collectively argues (§15). Final coda returns to the read-off mechanic — the integers come from a lookup at the end now, not from a softmax in the middle.

Throughline references appear in §1, §3, §5, §6, §7, §8, §9 (closing), §10 (closing), §11 (closing), §12 (closing), §13, §14. Every act carries it; every Act 3 lineage section now ties back to a column of §8's benchmark spread. Per Gate 1 finding #13, Act 3's throughline thread is no longer dropped between §9 and §14.

### Section-connection audit (one-line "Reader can now" per section)

```
§1  → Reader can now: see the trilogy's state at end of post 2 (encoder front, decoder back) and the question post 3 is answering.
§2  → Reader can now: distinguish discriminative read-off (head softmax) from generative paint + decode-lookup as the paradigm choice.
§3  → Reader can now: name the recent specialists VB compares against and identify the failure mode of the lineup (six output formats; one VB output format).
§4  → Reader can now: see Vision Banana's architecture: NBP substrate + thin instruction-tune layer + very-low vision-task mix ratio; understand "most of the way there" as inference, not sourced.
§5  → Reader can now: predict what segmentation output looks like (RGB image where pixel colors encode class) and connect it to the 0.699 mIoU.
§6  → Reader can now: predict what depth output looks like (power-transformed false-color along RGB cube edges) and connect it to the 0.882 / 0.929 numbers.
§7  → Reader can now: predict what surface-normal output looks like (xyz mapped directly to RGB) and connect it to the 15.549° MAE.
§8  → Reader can now: read the four benchmark tables, see where VB wins / rivals / trails, AND see the hinge question: why would a generator already have these representations?
§9  → Reader can now: place MAE in the lineage (reconstruction objective + asymmetric encoder–decoder + 3× speedup).
§10 → Reader can now: see Painter's contribution (output is RGB; the segmentation column inherits this contract).
§11 → Reader can now: see SegGPT's contribution (random color mapping per sample → JSON prompt works for any class set).
§12 → Reader can now: see DIFT's contribution (intermediate diffusion features carry dense correspondence; depth/normals columns become plausible without per-task pretraining).
§13 → Reader can now: trace the full arc from MAE → Painter → SegGPT → DIFT → NBP → Vision Banana, with each predecessor mapped to a specific VB component.
§14 → Reader can now: list what the paper does NOT prove and why the deltas, while real, are modest.
§15 → Reader can now: state the trilogy's collective thesis (encoder spinal cord → encoder + text decoder → generator spinal cord) and the read-off mechanic that connects them.
```

Every "Reader can now" chains forward without a gap. Gate 1 finding #9 (rung between §3 and §4 — interface mismatch as failure mode) and #10 (rung between §8 and §9 — "what's in the substrate?") are now explicit. Gate 1 finding #11 (§11 dead-weight) addressed by sharpening §11 around the *random color mapping per sample* mechanism that distinguishes it from §5. Gate 1 finding #12 (§13 dead-weight) addressed by merging the standalone NBP section into §13 synthesis. Gate 1 finding #13 (Act 3 throughline drops) addressed by tying each lineage section to a column of §8's spread.

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

**Gate 1 outline review (separate gate; same date).** Full transcript: [notes/generative-vision-stack-codex-outline-20260502.md](generative-vision-stack-codex-outline-20260502.md). Codex returned 16 STRUCTURAL findings, 0 TYPE-CHANGE, 0 COSMETIC. All 16 accepted and applied. Categorized: 8 language/overclaim hedges (§16/coda single-forward-pass, §3 published-this-year, §3 wins-or-rivals, §4 most-of-the-way-there, §13 web-scale, §1 trilogy-recap-imports, §9 MAE-hindsight, §12 gradients-vs-features); 2 missing-rung insertions (§3→§4 interface-mismatch failure mode; §8→§9 substrate-content hinge); 2 dead-weight rationalizations (§11 sharpened with random-color-mapping mechanism distinct from §5; §13 NBP merged into §13 synthesis); 1 Act 3 throughline-thread fix (each lineage section now ties back to a column of §8's spread); 3 figure cuts/sharpenings (Fig 1 TrilogyState cut as cosmetic; Fig 2 SpecialistLineup reframed as interface-mismatch rather than "one box vs six"; Fig 11 VisionBananaSynthesis sharpened to mechanism-handoff arrows). Total figures dropped from 13 to 12; total sections dropped from 16 to 15. Re-run Gate 1 still pending (this is invocation 1 of 3).

**Run 3 — 2026-05-02.** Final invocation in the Gate-runner cap of 3 (for Gate 0). Codex confirmed the matrix is sound: *"row 8 is now correct; 9a and 9b are distinct in the matrix; row 23 plus row 9b no longer overclaim the DA3 comparison; the Spec / Throughline headline numbers match the matrix; and the run-1 override retraction is explicit enough to prevent a silent re-flip."* It surfaced 2 STRUCTURAL findings that were stale text in non-matrix sections (Sub-topic C "Implication for the post" still claimed "the paper does not include DA3"; Research-notes "Source-primacy correction" overcorrected by saying the project page is no longer cited at all when in fact rows 9a + 10 cite it for chart-only values) plus 2 COSMETIC. All four were applied: stale paragraphs rewritten or narrowed; "Flagged-for-Phase-2" section converted to a "Resolved" audit trail; starter-source #4 re-labeled as historical lineage context. **Gate 0 closes cosmetic-only** — the matrix passes; remaining run-3 findings were editorial cleanup of inconsistent text rather than load-bearing claim errors.

## Resume here

Last touched: 2026-05-02.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` (this file) + project memory |
| 2. Research / fact-check | done (Gate 0 passed cosmetic-only on run 3 of 3) | `## Research notes`, `## Claim-source matrix`, `## Codex research review` |
| 3. Outline + figure list | done (Gate 1 next) | `## Outline` (above), figure summary table, throughline-thread audit, section-connection audit |
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
| 2026-05-02 | 1 (outline) — run 1 | structural-fixes-applied (16 of 16 STRUCTURAL accepted; 0 TYPE-CHANGE; 0 COSMETIC). Findings categorized: 8 language/overclaim hedges, 2 missing-rung insertions (§3→§4 interface mismatch; §8→§9 substrate hinge), 2 dead-weight rationalizations (§11 sharpened with random-color-mapping mechanism; §13 NBP merged into §13 synthesis), 1 throughline thread fix in Act 3, 3 figure cuts/sharpenings (Fig 1 cut as cosmetic; Fig 3 reframed as interface mismatch; Fig 11/synthesis sharpened to mechanism handoffs). Gate-runner re-run pending. | `### Codex outline review` section pending below; full transcript at `/Users/vic/.claude/projects/-Users-vic-dev-augusteo-com-astro/2afdff51-5714-43ca-9eee-9080739a2dae/tool-results/br23yd93t.txt` (local persisted output) |

### Phase 5 figure progress

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | ParadigmFlip | static-svg | TODO | — |
| 2 | SpecialistLineup | static-svg | TODO | — |
| 3 | VisionBananaArch | static-svg | TODO | — |
| 4 | SegmentationAsColoring | static-svg | TODO | — |
| 5 | DepthAsFalseColor | static-svg | TODO | — |
| 6 | NormalsAsXYZ | static-svg | TODO | — |
| 7 | BenchmarkSpread | static-svg | TODO | — |
| 8 | MAEDiagram | static-svg | TODO | — |
| 9 | PainterStitched | static-svg | TODO | — |
| 10 | DIFTCorrespondence | static-svg | TODO | — |
| 11 | VisionBananaSynthesis | static-svg | TODO | — |
| 12 | TrilogyMeta | static-svg | TODO | — |

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
