# The Generative Vision Stack

## Spec

**Title (sketch):** The Generative Vision Stack
**Slug:** `generative-vision-stack`
**Mode entered as:** topic
**Length target:** ~40-min read (matches trilogy)
**Essay flag:** true (3-tier headings)
**Topic-evolution classification:** actively-evolving (12-month bar)

### What / who / walk-away

A deep walk through the paradigm flip in computer vision introduced by the April 2026 Vision Banana paper. Posts 1 and 2 of the series ([Unified Vision Stack](/blog/unified-vision-stack), [Omni-Modal Stack](/blog/omni-modal-stack)) explained the discriminative paradigm: encode an image into a feature, attach a head, read off a label or mask. This third post explains the inversion: take a pretrained image generator (Google's Nano Banana Pro), instruction-tune it on a small mix of vision tasks, and read perception off the generator's output as RGB images. Mask-as-image. Depth-as-image. Same model, no specialist heads. Beats SAM3 on segmentation (0.842 mIoU vs 0.699) and Depth Anything V2 on metric depth (0.882 δ₁ vs 0.823).

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

### Flagged-for-Phase-2 items

- Verify "Depth Anything V3" reference seen in marktechpost coverage; agent did not find an arxiv ID. May be hype or pre-release.
- Confirm Vision Banana's zero-shot vs fine-tuned framing on each benchmark — paper abstract is not explicit; need PDF.
- Pull the actual instruction-tuning recipe from the paper PDF (data mix ratio, loss function, training hyperparameters).
- Identify Nano Banana Pro's release date, scale, and architecture (autoregressive image tokenizer? diffusion? Google blog should clarify).
- Confirm SAM3 zero-shot setup the paper compares against; the SAM3 paper itself dates 2025-11-20, only 5 months before Vision Banana. Is the comparison apples-to-apples?

### Top starter sources

| # | Source | Date | Role |
|---|---|---|---|
| 1 | [Vision Banana paper](https://arxiv.org/abs/2604.20329) | 2026-04-22 | the focus |
| 2 | [vision-banana.github.io](https://vision-banana.github.io/) | 2026-04-22 | project site, benchmarks |
| 3 | [SAM3](https://arxiv.org/abs/2511.16719) | 2025-11-20 | competitor baseline (5 mo) |
| 4 | [Depth Anything V2](https://arxiv.org/abs/2406.09414) | 2024-06-13 | competitor baseline (22 mo, foundational) |
| 5 | [SegGPT](https://arxiv.org/abs/2304.03284) | 2023-04-16 | foundational for the lineage |
| 6 | [Painter](https://arxiv.org/abs/2212.02499) | 2022-12-05 | foundational for the lineage |
| 7 | [MAE](https://arxiv.org/abs/2111.06377) | 2021-11-11 | foundational; He/Xie predecessor |
| 8 | [DIFT (Emergent Correspondence)](https://arxiv.org/abs/2306.03881) | 2023-06-06 | foundational; generators-as-feature-extractors |
| 9 | [Songyou Peng author thread](https://x.com/songyoupeng/status/2047312019976785944) | 2026-04-23 | first-party announcement |
| 10 | [Google DeepMind announcement (Soricut RT)](https://x.com/GoogleDeepMind/status/2047239487445438545) | 2026-04-23 | org-level first-party |
| 11 | [DeepMind research publication page](https://deepmind.google/research/publications/240658/) | 2026-04-22 | official record |

## Throughline

A single Cityscapes-style city-street photo, threaded across every act.

- **Act 1 — the puzzle.** "Here is one street scene. SAM3 — the strongest dedicated segmenter — gives us a categorical mask. The mask is a per-pixel grid of integers. The state of the art has been: build the best discriminator you can, attach a head, read off the integers. Posts 1 and 2 of this series explained how that works and how to wire it into a multimodal agent."
- **Act 2 — the flip.** "Here is the same street scene. Vision Banana, instruction-tuned from Google's Nano Banana Pro generator, returns an RGB image. Cars are one color, sidewalk another, sky a third. The 'mask' was generated as if it were a picture. We trace the recipe: how the paper turns segmentation, depth, surface normals, and edges all into 'paint me an image where pixel values encode X.' Same model. Same forward pass. The numbers: 0.842 mIoU on Cityscapes vs SAM3's 0.699; δ₁ 0.882 on metric depth vs Depth Anything V2's 0.823."
- **Act 3 — why it works.** "We back into the answer through the lineage: MAE in 2021 (reconstruct masked pixels = pretraining); Painter in 2022 (output space = images); SegGPT in 2023 (segmentation as in-context coloring); DIFT in 2023 (correspondence falls out of diffusion features); Nano Banana Pro in 2025 (production generator at internet scale). Vision Banana is the synthesis: instruction-tune the production generator on a small vision-task mixture and the dense-prediction heads come for free. Closing: the trilogy's argument."

Throughline is **canonical-real**: every concrete number cites a public source (vision-banana.github.io project page; SAM3 paper; Depth Anything V2 paper). Cityscapes is a public benchmark with a published evaluation protocol.

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

**Reported numbers (project page table).**

> "Semantic Segmentation (Cityscapes): 0.842 mIoU, significantly outperforming comparable models" (vs SAM3 at 0.699).
> "Depth Estimation: 0.882 δ₁ average across six benchmarks" (vs Depth Anything V2 at 0.823).
> "Surface Normals: 15.549° mean angular error, the lowest among tested approaches" (vs Lotus-2 at 16.558°).
>
> Source: [vision-banana.github.io](https://vision-banana.github.io/); accessed 2026-05-02.

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

**Implication for the post.** The Vision Banana paper compares against "Depth Anything series" generically; the project page lists 0.823 δ₁ for the V2 row. V3 was current at Vision Banana's submission. The post must explicitly frame: "Vision Banana's depth comparison is published against V2; V3 had landed five months earlier and the paper does not include it." This is a hedge, not a refutation — the load-bearing claim "Vision Banana wins on metric depth as Vision Banana ran the comparison" is still backed; the load-bearing claim "Vision Banana is the SOTA on metric depth at pubDate" cannot be made.

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
| 1 | Vision Banana proposes that image-generation pretraining plays a role for vision analogous to next-token pretraining for language. | "image generation serves as a unified and universal interface for vision tasks, similar to text generation's role in language understanding and reasoning." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 2 | Vision Banana is built by instruction-tuning Nano Banana Pro on a mixture of its own training data + vision-task data. | "instruction-tuning Nano Banana Pro on a mixture of its original training data alongside a small amount of vision task data." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 3 | The mixture ratio is "very low" — vision-task data is a small fraction of the instruction-tuning mix. | "We mix vision task data into Nano Banana Pro's own training mixture at a very low ratio." | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 4 | Vision Banana reframes perception as image generation by parameterizing each task's output space as RGB. | "parameterizing the output space of vision tasks as RGB images." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 5 | Segmentation is parameterized via JSON class-to-color prompts; pixels are assigned to classes by matching color. | "instruct Vision Banana to produce segmentation masks for only one class, allowing the model to dynamically assign colors to different instances." / "we assign pixels to classes by matching its color according to the prompt" using `{"cat": "red", "lock": "pink"}`. | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 6 | Depth is parameterized as a power-transformed (λ=−3) false-color visualization, interpolated along RGB-cube edges. | "we instruct the model to output a carefully constructed false-color visualization of depth values…using those curved distances to produce a false-color visualization." | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 7 | Surface normals are parameterized as direct xyz-to-RGB mapping. | "the directional vector components map directly to RGB channels: Facing Left (−1,0,0): Encoded as Pinkish Red…" | arxiv:2604.20329 PDF, Methods (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 8 | Vision Banana's reported benchmark numbers come from the project page: Cityscapes mIoU 0.842 (vs SAM3 0.699). | "Semantic Segmentation (Cityscapes): 0.842 mIoU, significantly outperforming comparable models" (SAM3 listed at 0.699). | https://vision-banana.github.io/ (accessed 2026-05-02) | actively-evolving / 12-month bar / passes |
| 9 | Vision Banana metric depth: δ₁ 0.882 (vs Depth Anything V2 at 0.823). | "Depth Estimation: 0.882 δ₁ average across six benchmarks" (DAv2 listed at 0.823). | https://vision-banana.github.io/ (accessed 2026-05-02) | actively-evolving / 12-month bar / passes |
| 10 | Vision Banana surface normals: 15.549° MAE (vs Lotus-2 at 16.558°). | "Surface Normals: 15.549° mean angular error, the lowest among tested approaches." | https://vision-banana.github.io/ (accessed 2026-05-02) | actively-evolving / 12-month bar / passes |
| 11 | Comparisons in Vision Banana are zero-shot transfer; baselines that were fine-tuned in-domain are excluded or marked. | "We mainly compare with other methods that have not been trained on in-domain data…denote them as 'Zero-Shot Transfer'…Non zero-shot transfer methods are marked in gray." | arxiv:2604.20329 PDF, Table 2 caption (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 12 | Vision Banana's vision-task suite: 2D = referring-expression / semantic / instance segmentation; 3D = monocular metric depth + surface normals. | "we evaluate our framework on two fundamental categories of visual understanding: 2D scene understanding and 3D structure inference. The 2D suite consists of referring expression, semantic, and instance segmentation…For 3D understanding, we focus on monocular metric depth and surface normal estimation." | arxiv:2604.20329 PDF, §Experiments (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 13 | Instruction-tuning preserves the base model's image-generation capabilities ("lightweight"). | "without sacrificing the base model's image generation capabilities." | arxiv:2604.20329 abstract (2026-04-22); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 14 | Nano Banana Pro (= Gemini 3 Pro Image) is Google's production image-generation model, released 2025-11-20. | "Nano Banana Pro (Gemini 3 Pro Image)… built on Gemini 3 Pro… deployed across Google products including the Gemini app, Google AI Studio, and Vertex AI Studio." | blog.google/technology/ai/nano-banana-pro/ (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 15 | MAE: masked patches reconstructed by an asymmetric encoder–decoder; 3× training speedup. | "We mask random patches of the input image and reconstruct the missing pixels… an asymmetric encoder-decoder design… accelerate training (by 3x or more) and improve accuracy." | arxiv:2111.06377 abstract (2021-11-11); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 16 | Kaiming He and Saining Xie are co-authors on both MAE (2021) and Vision Banana (2026). | MAE author list: "Kaiming He, Xinlei Chen, Saining Xie, Yanghao Li, Piotr Dollár, Ross Girshick." Vision Banana includes both names in the 25-author list. | arxiv:2111.06377 + arxiv:2604.20329 (accessed 2026-05-02) | actively-evolving / 12-month bar / foundational reference (lineage continuity) |
| 17 | Painter introduced the "task output as image" formulation, trained via masked image modeling on stitched input/output pairs. | "We propose Painter, a generalist vision model by redefining the output of core vision tasks as images… Our training process is extremely simple, which performs standard masked image modeling on the stitch of input and output image pairs." | arxiv:2212.02499 abstract (2022-12-05); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 18 | SegGPT trained segmentation as in-context coloring with random color mapping per sample. | "the training uses an in-context coloring problem with random color mapping for each data sample." | arxiv:2304.03284 abstract (2023-04-06); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 19 | DIFT showed correspondence emerges in diffusion features; outperforms DINO by 19 pts and OpenCLIP by 14 pts on SPair-71k. | "DIFT from Stable Diffusion is able to outperform DINO and OpenCLIP by 19 and 14 accuracy points respectively on the challenging SPair-71k benchmark." | arxiv:2306.03881 abstract (2023-06-06); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (lineage; pre-bar by design) |
| 20 | SAM3 is a concept-prompted unified segmentation/tracking model; doubles accuracy of prior systems on prompt-based concept segmentation. | "SAM 3 is a unified model for detecting, segmenting, and tracking objects." / "SAM 3 doubles the accuracy of existing systems in both image and video promptable concept segmentation." | arxiv:2511.16719 (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 21 | SAM3 introduces a "presence head" decoupling recognition from localization. | "presence head, which boosts detection accuracy." | arxiv:2511.16719 (2025-11-20); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 22 | Depth Anything V2 training recipe: synthetic-only labels, scaled teacher, pseudo-labeled real bridge. | "Replaced all labeled real images with synthetic ones; (2) Scaled Teacher Model… (3) Trained student models using large-scale pseudo-labeled real images." | arxiv:2406.09414 (2024-06-13); accessed 2026-05-02 | actively-evolving / 12-month bar / foundational reference (competitor benchmark; pre-bar by ~22 months but the comparison baseline cited in Vision Banana's project page) |
| 23 | Depth Anything V3 was released 2025-11-13, five months before Vision Banana, and supersedes V2 on monocular depth. | "Depth Anything 3… outperforming its predecessor (DA2) in monocular depth estimation." | arxiv:2511.10647 (2025-11-13); accessed 2026-05-02 | actively-evolving / 12-month bar / passes — drives a hedge in the post: Vision Banana benchmarks against V2; V3 is current SOTA at pubDate. |
| 24 | Lotus-2 is the surface-normals baseline Vision Banana compares against; trained on ~59k samples. | "Lotus-2 is a two-stage framework… achieves state-of-the-art performance in monocular depth estimation while being 'highly competitive' in surface normal prediction using only 59,000 training samples." | arxiv:2512.01030 (2025-12-01); accessed 2026-05-02 | actively-evolving / 12-month bar / passes |
| 25 | Cityscapes benchmark uses ~5000 high-quality pixel-annotated images for evaluation. | "5000 of these images have high quality pixel-level annotations; 20000 additional images have coarse annotations." | arxiv:1604.01685 + https://www.cityscapes-dataset.com/benchmarks/ (accessed 2026-05-02) | foundational reference (dataset spec; locked by the field) |

## Resume here

Last touched: 2026-05-02.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` (this file) + project memory |
| 2. Research / fact-check | in progress | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/generative-vision-stack/index.mdx` |
| 5. Implement figures | pending | per-figure table below (populated end of Phase 3) |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress

*(populated at end of Phase 3 once figure list is locked)*

### Suggested next batch

1. Phase 2: dispatch parallel subagents to build research notes for sub-topics (Vision Banana methods + Nano Banana Pro substrate + lineage papers + competitor baselines).
2. Build the `## Claim-source matrix` mapping every load-bearing claim to a quoted primary source.
3. Run Gate 0 (research-truthfulness pass via codex consult).
4. Resolve any STRUCTURAL findings; advance to Phase 3 outline.

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
