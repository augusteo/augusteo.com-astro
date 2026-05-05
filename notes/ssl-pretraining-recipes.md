# Self-supervised pretraining when your data isn't natural images

## Spec

**Slug:** `ssl-pretraining-recipes`
**Working title:** "Self-supervised pretraining when your data isn't natural images"
**Standalone post** (not a sequel to the vision trilogy, though it touches the same backbone landscape).
**Topic-evolution classification:** actively-evolving — 12-month freshness bar applies. DINOv3 (Aug 2025), V-JEPA 2 (2025), C-RADIOv4 (Jan 2026), and ongoing JEPA / multi-teacher work all fall inside the bar.

**One-paragraph summary.** A taxonomy of self-supervised pretraining recipes for vision backbones, organized around one practitioner-centric question: you have a large unlabeled corpus in a domain whose pretraining corpus the canonical SSL backbones (MAE on ImageNet, DINOv3 web on LVD-1689M, C-RADIOv4 on NV-CC-Img-Text) have not been trained on — construction documents, line drawings, scanned reports, niche scientific imagery — and a small labeled set for downstream **dense prediction (semantic + instance segmentation primary; detection secondary; layout/classification tertiary)**. Some natural-image-trained backbones DO ship domain-adapted variants (DINOv3 has a SAT-493M satellite specialization with Earth-observation benchmark numbers), but no analogous specialization exists for construction documents or line-art-heavy engineering drawings. Which SSL recipe gives the best fine-tuning starting point in that case, and is it better to train from scratch, continue-pretrain on top of a natural-image checkpoint, or run a hybrid? The post walks through seven recipe families, evaluates each against the dense-feature-quality lens, and closes with a recipe-selection decision tree gated on (corpus scale × domain distance from natural images × downstream task density). The motivating use case in the throughline is construction documents at a scale of several hundred thousand unlabeled + 10–20k labeled, but the decision tree generalizes.

**Reader walks away knowing:**

- The seven SSL recipe families and how each generates its training signal.
- Why dense-feature quality is the load-bearing axis for segmentation downstreams (the "dense-feature collapse" failure mode generalized to recipe selection).
- What the published satellite-domain bake-off (Lahrichi 2025: MAE/SwAV on GeoNet vs ImageNet) and the published continual-adapter SSL evidence (GLARE 2026: adapter-based continual SSL from UDI initialization across natural + satellite segmentation domains) do and don't tell us about construction documents. The two studies test different recipe shapes, not the same comparison.
- Where multi-teacher distillation (C-RADIOv4) fits and why it isn't a recipe you can use without teachers.
- Where JEPA-style "predict in latent space" sits relative to MIM-style "predict in pixel/feature space."
- A decision tree mapping (corpus scale, domain distance, task density) → recipe pick.

**Audience.** ML practitioners with a domain-specific image corpus and a dense downstream task. Density bar: same as the trilogy. Assumes ViT, knows what dense features and CLS tokens are, hasn't necessarily implemented MAE.

**Length:** ~35-min target read.

**Figure mix:** start 100% static (trilogy convention). Two interactive candidates flagged for possible Phase 3 unlock if Gate 1 demands: mask-ratio sweep for MIM behavior, augmentation toggle for DINO behavior. Default-static unless the recipe's behavior genuinely requires sweep.

**Recipe families to cover (seven plus a closing rung):**

1. Pixel-reconstruction MIM — MAE, SimMIM, MIM-Refiner
2. Feature-prediction MIM — MaskFeat (HOG), data2vec, data2vec 2.0
3. Masked-token MIM — BEiT v1/v2/v3, PeCo
4. Self-distillation — DINO, iBOT, DINOv2, DINOv2-with-registers, DINOv3 (Gram anchoring)
5. JEPA family — I-JEPA, V-JEPA, V-JEPA 2
6. Autoregressive image pretraining — iGPT, AIM
7. Multi-teacher distillation as pretraining — AM-RADIO, RADIOv2.5, C-RADIOv4, PHI-S
8. (Closing rung) Domain-adaptive specialization — DiT, EVA-02, document-AI variants. Phase 2 will pin specifics.

Note on MEP: search returned no hit for "Masked Element Prediction" as a named method; closest is MaskFeat (Masked Feature Prediction). Vic deprioritized this confusion — covered as part of the feature-prediction MIM family, not as a stand-alone rung.

## Throughline

A single construction sheet (a floor plan or section detail — chosen at Phase 2) used as the persistent visual anchor through every recipe section. Each section asks the same three questions of its recipe:

1. What training signal does the recipe extract from this sheet?
2. Where does that signal break down on this kind of data (whitespace-heavy, line-art, low-color, repetitive symbols)?
3. How does the recipe rank against the others on a downstream segmentation fine-tune?

The persistent image gives every figure a concrete reference point. The closing decision tree is the deliverable.

**Throughline rhythm.** The construction sheet appears in:
- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes. Frame the open question: a natural-image SSL backbone has not been trained on construction-document line art; whether its features on this domain are usable as-is is empirically unclear. DINOv3's satellite specialization (SAT-493M) and the published continual-SSL-on-satellite comparisons (Lahrichi 2025, GLARE 2026) provide adjacent evidence. The post does **not** assert a generalized "domain-adaptive SSL beats zero-shot natural-image checkpoint for sufficiently OOD domains" thesis (that synthesis is not in the matrix). It explores the question for construction documents specifically, and the closing decision tree reflects what published recipes can and cannot tell us.
- Act 2 (the recipes) — every recipe section walks through the three questions above with the sheet as the example.
- Act 3 (the verdict) — the recipe-selection decision tree, with the sheet shown landing at one specific terminal node, while the other terminals are labeled with the data shapes that route there (medical, satellite, etc.).

## Research notes

Phase 2 research, dispatched as three parallel subagents covering (a) MIM family, (b) self-distillation + JEPA + AR, (c) multi-teacher distillation + domain-adaptive. Plus my own focused fetch on C-RADIOv4 to verify the SSL-aux-loss question. All quotes below are from primary sources — arxiv papers, paper HTML mirrors, or NVIDIA tech reports.

### Headline finding for the post

**The RADIO lineage's primary supervision signal is teacher feature imitation, not a MAE/DINO/contrastive pretext.** Across AM-RADIO (2312.06709), RADIOv2.5 (2412.07679), and C-RADIOv4 (2601.17237), the student is primarily trained to match teacher features. AM-RADIO uses cosine + smooth-L1 spatial losses with cosine summary; RADIOv2.5 introduces PHI-S loss balancing; C-RADIOv4 uses PHI-S-normalized squared-error spatial loss, drops cosine for an angular-cone-normalized summary loss, and adds MESA (shift-equivariant EMA matching). **MESA is a self-supervised regularizer** — student matches its own EMA on shifted crops — but it is not a MAE/DINO-style masked-prediction or contrastive pretext task. **The categorical observation:** multi-teacher distillation occupies a different position in the SSL recipe taxonomy than pretext-derived SSL — supervision shape is external (teacher activations) rather than pretext-derived (reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs). This is load-bearing for the multi-teacher rung and is a different *kind* of self-supervision, not "not SSL".

### Headline finding on domain transfer

**Recent published evidence suggests natural-image SSL transfers surprisingly well to satellite imagery — the "domain-adaptive SSL strictly beats natural-image SSL" intuition does not hold uniformly.** DINOv3 Web ViT-7B (frozen, no satellite fine-tune) sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (its own satellite specialization) and prior satellite-specialized models on those tasks. Lahrichi et al. 2025 directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks and reported "no consistent advantage to pre-training with GeoNet as compared to ImageNet." GLARE (TMLR-formatted submission, arxiv:2509.17816, Jan 2026) reports modest +0.2 to +0.6 mIoU continual-pretraining gains on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA. **For construction documents specifically, no analogous published comparison exists.** The post explores what the recipe taxonomy can and cannot tell us in that absence; it does not assert a generalized continual-pretraining-wins thesis.

### Sub-topic: Pixel-reconstruction MIM

**MAE** (arxiv:2111.06377v3, 2021-12-19; v1 2021-11-11). He et al., FAIR.

> "It is based on two core designs. First, we develop an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens), along with a lightweight decoder that reconstructs the original image from the latent representation and mask tokens. Second, we find that masking a high proportion of the input image, e.g., 75%, yields a nontrivial and meaningful self-supervisory task." — Abstract.

> "Our loss function computes the mean squared error (MSE) between the reconstructed and original images in the pixel space. We compute the loss only on masked patches, similar to BERT." — §3, Reconstruction target.

ADE20K mIoU (UperNet, IN1K-pretrained): ViT-B 48.1; ViT-L 53.6 (Table 5). COCO Mask R-CNN: ViT-B AP^box 50.3 / AP^mask 44.9; ViT-L AP^box 53.3 / AP^mask 47.2 (Table 4).

Limitation acknowledged in §6: "Images are merely recorded light without a semantic decomposition into the visual analogue of words. Instead of attempting to remove objects, we remove random patches that most likely do *not* form a semantic segment. Likewise, our MAE reconstructs pixels, which are *not* semantic entities."

**SimMIM** (arxiv:2111.09886v1, 2021-11-18). Xie et al., MSRA.

> "1) random masking of the input image with a moderately large masked patch size (e.g., 32) makes a strong pre-text task; 2) predicting raw pixels of RGB values by direct regression performs no worse than the patch classification approaches with complex designs; 3) the prediction head can be as light as a linear layer, with no worse performance than heavier ones." — Abstract.

> "We adopt a masking ratio of 0.6 on patch size of 32 by default, due to its stable performance." — §4.1.2.

> "The effects to other more fine-grained down-stream tasks such as object detection or semantic segmentation will be explored in our future study." — §4.1.4. *SimMIM defers ViT-scale dense-prediction transfer.*

The paper's headline 59.9 mIoU on ADE20K is from **SwinV2-G 3B-parameter co-trained variant**, not standalone SimMIM ViT-B/L.

**MIM-Refiner** (arxiv:2402.10093v4, 2025-02-20, ICLR 2025). Alkin et al.

The block-regime analysis is the cleanest published explanation of why off-the-shelf MAE features underperform on dense tasks:

> "1. In early ViT blocks, general purpose features are learned, which improve the reconstruction loss and the k-NN accuracy simultaneously. 2. In middle ViT blocks, abstractions are formed. The reconstruction loss improves only slightly, while the k-NN accuracy improves drastically. 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases." — §2.

> "As models increase in size, the decoder eventually reaches a point where it cannot further improve the pre-training objective on its own. Consequently, it begins to delegate a portion of the reconstruction task back to the last encoder blocks. This transfer adversely affects the feature quality for downstream tasks associated with those blocks." — §2.

ADE20K linear probe: MAE-Refined ViT-L/16 37.3, MAE-Refined ViT-H/14 39.4, MAE-Refined ViT-2B/14 40.3 (Table 4). Full UperNet ADE20K: D2V2 ViT-L/16 54.4 (Table 5).

### Sub-topic: Feature-prediction MIM

**MaskFeat** (arxiv:2112.09133v2, 2023-01-12; v1 2021-12-16). Wei et al., FAIR. *Closest hit to the user's "MEP" term.*

> "We present Masked Feature Prediction (MaskFeat) for self-supervised pre-training of video models... We study five different types of features and find Histograms of Oriented Gradients (HOG), a hand-crafted feature descriptor, works particularly well in terms of both performance and efficiency." — Abstract.

> "(ii) The discretization (tokenization) of visual signals is not necessary for masked visual prediction, and continuous *feature regression* (i.e. MaskFeat) can work well." — §1.

> "(iii) Semantic knowledge from human annotations is not always helpful for MaskFeat, but characterizing local patterns seems important. For example, predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance." — §1.

**No image dense-prediction transfer is reported by the paper.** Image transfer is ImageNet classification only (ViT-B 84.0 / ViT-L 85.7 at 1600 epochs). Headline numbers are video (Kinetics-400 86.7%, AVA action detection 39.8 mAP).

**data2vec** (arxiv:2202.03555v3, 2022-10-25). Baevski et al., FAIR.

> "The core idea is to predict latent representations of the full input data based on a masked view of the input in a self-distillation setup using a standard Transformer architecture. Instead of predicting modality-specific targets such as words, visual tokens or units of human speech which are local in nature, data2vec predicts contextualized latent representations that contain information from the entire input." — Abstract.

Loss: Smooth L1 on the average of the top K teacher-network FFN block outputs at masked positions, where the teacher is an EMA of the student. ImageNet ViT-B 84.2, ViT-L 86.6 (Table 1). **No image dense-prediction transfer reported.**

> "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low which leads to student model collapse and is then propagated to the teacher. Third, we found collapse to be more likely for modalities where adjacent targets are very correlated and where longer spans need to be masked, e.g., speech." — §6.

**data2vec 2.0** (arxiv:2212.07525v2, 2023-06-15). Same family, efficiency-focused. ImageNet ViT-L 86.8 in 16.4× lower training time than MAE. **No dense-prediction transfer reported.**

### Sub-topic: Masked-token MIM

**BEiT v1** (arxiv:2106.08254v2, 2022-09-03; v1 2021-06-15). Bao et al., MSRA.

> "We first 'tokenize' the original image into visual tokens. Then we randomly mask some image patches and fed them into the backbone Transformer. The pre-training objective is to recover the original visual tokens based on the corrupted image patches." — Abstract.

Tokenizer = DALL-E's pretrained dVAE (vocabulary 8192). Block-wise masking, 40% mask ratio. ADE20K SETR-PUP: ViT-B 45.6, ViT-B with intermediate fine-tuning 47.7 (Table 3).

Ablation (Table 4): predicting pixels with the BEiT recipe drops ADE20K 44.65 → 41.38, supporting "tokens > pixels" *when other recipe choices favor tokens*.

**BEiT v2** (arxiv:2208.06366v2, 2022-10-03). Peng et al.

VQ-KD tokenizer trained by knowledge-distilling CLIP features. ADE20K UperNet ViT-B 53.1 (1600 epochs), ViT-L 56.7 (1600 epochs) — paper's main strength is dense prediction.

> "After quantizing the image to visual tokens, we feed the ℓ₂-normalized codebook embeddings to the decoder... The output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP. During training, we maximize the cosine similarity between the decoder output o_i and the teacher guidance t_i." — §2.2.

Crucial: BEiT v2's tokenizer is itself distilled from CLIP, so BEiT v2 inherits CLIP's web-pretraining (often glossed in headline comparisons).

**BEiT v3** (arxiv:2208.10442v2, 2022-08-31). Multiway transformer with shared self-attention, masked modeling on images, text, and image-text pairs.

ADE20K mIoU 62.8 (Mask2Former + IN-21K intermediate fine-tuning). COCO box AP 63.7, mask AP 54.8 (Table 1). *Caveat: numbers use heavier task heads than MAE/BEiT v2 standards.*

### Sub-topic: Self-distillation lineage

**DINO** (arxiv:2104.14294v2, 2021-05-24). Caron et al., FAIR.

> "Our study... underlines the importance of momentum encoder, multi-crop training, and the use of small patches with ViTs." — Abstract.

> "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets." — Abstract. *This emergent-segmentation observation is the seed for treating the DINO line as the dense-feature SSL family.*

ImageNet ViT-Base linear 80.1%, k-NN 78.3% (small ViT).

**iBOT** (arxiv:2111.07832v3, 2022-01-27). Zhou et al.

> "we perform self-distillation on masked patch tokens and take the teacher network as the online tokenizer, along with self-distillation on the class token to acquire visual semantics." — Abstract.

> "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand." — Abstract.

ADE20K: 38.3 (linear) / 50.0 (UperNet, ViT-B/16). COCO Cascade Mask R-CNN ViT-B/16: AP^b 51.2 / AP^m 44.2.

**DINOv2** (arxiv:2304.07193v2, 2024-02-02). Oquab et al., Meta.

Loss = DINO + iBOT + KoLeo regularizer (uniform feature span via Kozachenko-Leonenko entropy estimator) + Sinkhorn-Knopp centering (replaces DINO/iBOT softmax-centering). Heads untied between DINO and iBOT objectives.

Dataset: LVD-142M built via deduplication and inverted-file-index retrieval from a 1.2B-image pile. ViT-g (1.1B params) distilled into smaller students.

ADE20K linear ViT-g: 49.0 (single-scale), 53.0 (multi-scale).

**DINOv2 with registers** (arxiv:2309.16588v2, 2024-04-12). Darcet et al.

> "artifacts in feature maps of both supervised and self-supervised ViT networks. The artifacts correspond to high-norm tokens appearing during inference primarily in low-informative background areas of images, that are repurposed for internal computations." — Abstract.

> "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)." — Quantification.

> Artifacts emerge "after one third of training" and "only the three largest models exhibit outliers." All affected: DeiT-III (supervised), OpenCLIP (text-supervised), DINOv2 (self-supervised). Original DINO does not show them.

Fix: 4 register tokens added after patch embedding, discarded at output. <2% FLOP increase. ADE20K linear DINOv2: 46.6 → 47.9 with registers. Object discovery (LOST corloc on VOC2007): 35.3 → 55.4 (+20.1).

**DINOv3** (arxiv:2508.10104, 2025-08). Meta. **Critical entry — Gram anchoring is load-bearing for the post.**

Failure mode that motivated Gram anchoring:

> "a notable decline in performance on dense prediction tasks" during long training. Diagnosis: "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes."

Gram anchoring loss:

> ℒ_Gram = ‖X_S · X_S^⊤ − X_G · X_G^⊤‖_F²

> "Compares the Gram matrix (all pairwise dot products) of student patch features against those from an earlier model, referred to as the Gram teacher... local features [are allowed] to move, provided the structure of similarities remains the same."

Refinement-phase combined loss: ℒ_Ref = w_D · ℒ_DINO + ℒ_iBOT + w_DK · ℒ_DKoleo + w_Gram · ℒ_Gram.

Dataset: LVD-1689M (≈1.7B images) via hierarchical k-means with balanced sampling, mixed with ImageNet-1k as 10% of batches. Largest model: ViT-7B (6.7B params) distilled into ViT-S/B/L students. ADE20K segmentation frozen backbone: **63.0 mIoU**. NYU depth RMSE: 0.281 (high-res Gram anchoring).

### Sub-topic: JEPA family

**I-JEPA** (arxiv:2301.08243v3, 2023-04-13). Assran et al., Meta.

Architecture: context encoder θ (gradient), predictor ϕ (gradient), target encoder θ̄ (EMA of θ). Same image, different blocks. The predictor maps from context features to target features at given spatial positions.

> "JEPAs do not seek representations invariant to a set of hand-crafted data augmentations, but instead seek representations that are predictive of each other." — vs DINO's invariance-to-augmentations bias.

> "Compared to generative methods that predict in pixel/token space, I-JEPA makes use of abstract prediction targets for which unnecessary pixel-level details are potentially eliminated."

> "predicting in pixel-space leads to a significant degradation in the linear probing performance." — empirical confirmation of the latent-space-is-better argument.

> "a huge I-JEPA model (ViT-H/14) requires less compute than a small iBOT model (ViT-S/16)."

ImageNet linear ViT-H/14 79.3%, ViT-H/16₄₄₈ 81.1%. Clevr/Count 86.7, Clevr/Dist 72.4 (vs DINO ViT-B/8 53.4, iBOT ViT-L/16 62.8). **No ADE20K mIoU reported.**

**V-JEPA** (arxiv:2404.08471v1, 2024-02-15). Bardes et al., Meta. Spatiotemporal feature prediction on video. Kinetics-400 81.9%, SSv2 72.2%, ImageNet 77.9% from video-only pretraining. **No image dense-prediction transfer reported.**

**V-JEPA 2** (arxiv:2506.09985v1, 2025-06-11). Two-phase: phase 1 mask-denoising feature prediction on VideoMix22M (22M samples / >1M hours) + 1M ImageNet; phase 2 action-conditioned post-training on 62 hours of robot videos. ViT-L 300M, ViT-H 600M, ViT-g 1B. ImageNet attentive probe ViT-g384 85.1%. **No image dense-prediction transfer reported.**

### Sub-topic: Autoregressive image pretraining

**iGPT** (Chen et al., ICML 2020). No arxiv ID; cite proceedings.mlr.press/v119/chen20s. Sequence Transformer trained AR on pixels, no 2D inductive bias. Trained at 32²/48²/64² resolutions due to sequence-length cost. iGPT-L 1.4B params, ImageNet linear ~72% (best-layer), CIFAR-10 linear 96.3%. **No dense-prediction transfer.**

**AIM** (arxiv:2401.08541, 2024-01-16). El-Nouby et al., Apple.

Prefix LM (not pure causal). Pixel target (normalized per-patch L2). Loss: min_θ (1/K) Σ ‖x̂_k(θ) − x_k‖₂².

> "performance of the visual features scale with both the model capacity and the quantity of data" + "the value of the objective function correlates with the performance of the model on downstream tasks." — paper's main claim: pretraining loss is a usable proxy for downstream quality, like LLMs.

Frozen attentive probe IN-1k: AIM-7B 82.4%, AIM-7B† (layer 20) 84.0%. **No ADE20K, COCO, or depth numbers.** AIM is a scaling-laws paper for *classification*, not dense prediction.

**AIMv2** (arxiv:2411.14402v1, 2024-11-21). Multimodal causal AR (image patches then text tokens). AIMv2-3B@448 IN-1k 89.5%. Open-vocab COCO det 60.2 AP (vs DINOv2 60.1). **No dense semantic seg reported in body.**

### Sub-topic: Multi-teacher distillation as pretraining

**AM-RADIO** (arxiv:2312.06709v3, 2023-12, CVPR 2024). Ranzinger et al., NVIDIA.

Loss formulation (no SSL on student):

> Summary: L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))
> Spatial: L_features(x) = Σ_i γ_i L_match(h_i^(v)(x'|Θ_i^(v)), t_i^(v)(x|Φ_i^(v)))
> L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1

Teachers (best published RADIOv1 config): DFN CLIP ViT-H/14, OpenAI CLIP ViT-L/14, DINOv2 ViT-g/14. SAM ViTDet-H in ablations.

ADE20K mIoU (linear probe) RADIO-ViT-H/14: 50.32. COCO inst-seg as drop-in SAM replacement: 75.17–75.42.

**RADIOv2.5** (arxiv:2412.07679v2, 2024-12, CVPR 2025). Heinrich, Ranzinger et al.

Mode-switching pathology (load-bearing):

> "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM." — §3.1.

> Cause: "in the high-resolution regime the student only sees SAM features."

Loss: L = Σ_t λ_t L_t, L_t = ℓ_s(ẑ_s^(t), z_s^(t)) + Σ_{i=1}^N ℓ_p(ẑ_p^(t,i), z_p^(t,i)). **No SSL auxiliary loss.** ADE20K mIoU: B 48.94, L 52.95, H 53.97, g 54.56 (Table 8).

**C-RADIOv4** (arxiv:2601.17237v1, 2026-01-24). NVIDIA.

Teachers: SigLIP2, DINOv3, SAM3 (paper-confirmed; specific variants like "SigLIP2-g-384, DINOv3-7B" appear in research summaries but my abstract-only WebFetch could not verify the variant suffixes — Phase 7 freshness pass should re-confirm).

Loss formulation:

> Spatial loss: L_spatial(x, ŷ) = (1/|Ω|) Σ_{u∈Ω} (𝓕_{S→T}[x]_u − ŷ_u)² with ŷ_u = PHI-S-normalized teacher output (Eq. 1, §2.3.1)
> Summary loss (cosine explicitly dropped): L_angle(x, y) = Θ(x, y)² / Disp(Θ_y) (Eq. 7, §2.5)
> MESA: L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)² — student matches its own EMA on shifted crops (Eq. 2, §2.3.2)

**No MAE/DINO/JEPA-style pretext task on the student.** MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext — its role is stability + equivariance. C-RADIOv4-H ADE20K mIoU 55.20 at 512px.

**PHI-S** (arxiv:2410.01680, 2024-10). Loss-balancing for multi-teacher distillation via Hadamard isotropic standardization.

> "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices.

> "PHI-S produces the best student model across the suite of methods studied"

### Sub-topic: Domain-adaptive specialization

**DiT** (arxiv:2203.02378, 2022-03). Microsoft. BEiT-style MIM on document images. Document layout PubLayNet 91.0 → 94.9 mAP, table detection ICDAR2019 cTDaR 94.23 → 96.55 F1, doc classification RVL-CDIP 91.11 → 92.69%. *Recipe details (DALL-E tokens, IIT-CDIP 42M corpus) are widely cited but I could not surface verbatim from the paper HTML in this Phase-2 pass — flagged for Phase 3 if recipe is quoted in prose.*

**EVA-02** (arxiv:2303.11331, 2023-03). MIM target = EVA-CLIP features (feature-distillation-via-MIM, not pixel/token MIM). ADE20K ~61.7 mIoU_ss reported via search summaries; *direct Table 16 quote not surfaced — flagged.*

**LayoutLMv3** (arxiv:2204.08387, 2022-04). MLM + masked image + word-patch alignment. **Not pure SSL** — requires OCR-extracted text alongside images. Listed for completeness; out of scope for vision-only SSL.

**Donut** (arxiv:2111.15664, 2021-11). NAVER. "OCR-free VDU"; pretraining objective is cross-entropy on text outputs given synthetic document images. **Weakly supervised generative pretraining**, not SSL. Listed for completeness.

**Medical 3D MAE** (arxiv:2410.23132, 2024-10). 39,168 unlabeled 3D brain MRI volumes; MAE with sparsification on a Residual Encoder U-Net within nnU-Net.

> "the first work to demonstrate that SSL pretraining with a fixed architecture can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline"

> "surpasses previous SSL methods but also outperforms the strong nnU-Net baseline by an average of approximately 3 Dice points"

S3D average DSC 72.37 vs no-pretraining nnU-Net 70.40 (Δ ≈ +1.97 DSC). *Compares from-scratch SSL on the medical domain vs from-scratch supervised. Does not compare to continual SSL on a natural-image checkpoint.*

**SatMAE** (arxiv:2207.08051, NeurIPS 2022). MAE with temporal patch masking and spectral positional encodings on fMoW. "Up to ↑ 7%" supervised benchmarks, "up to ↑ 14%" land cover classification transfer. *Specific deltas not surfaced in this pass.*

### Sub-topic: Continual SSL pretraining (cross-cutting gap)

The literature does not contain a canonical bake-off study comparing all three corners of the question that motivates this post:
- (a) From-scratch SSL on a new domain
- (b) Continual SSL on a natural-image checkpoint
- (c) Zero-shot fine-tune from a natural-image checkpoint

Domain-adaptive SSL papers (DiT, SatMAE, Medical 3D MAE) tend to compare (a) vs (a-supervised); they generally do not include (b) as a head-to-head condition. Pointer-only sources surfaced in the sweep:

- arxiv:2503.02844 ("Beyond Cosine Decay: On the effectiveness of Infinite Learning Rate Schedule for Continual Pre-training", 2025) — directly studies continual SSL with MAE, summary says "CPT mitigates catastrophic forgetting." *Pointer; not directly fetched.*
- arxiv:2410.18677 ("Enhancing pretraining efficiency for medical image segmentation via transferability metrics", 2024) — summary suggests an intermediate continual-pretraining sweet spot. *Pointer.*
- arxiv:2502.18056 ("Escaping the big data paradigm in self-supervised representation learning", 2025) — for narrow target domains, in-domain SSL on tiny corpora can rival ImageNet-init at much smaller scale. Classification-only. *Pointer.*

**This gap is a finding worth surfacing in the post**: domain-adaptive SSL bake-offs with dense-prediction numbers DO exist for satellite (Lahrichi 2025) and continual-adapter SSL across natural + satellite segmentation domains (GLARE 2026); medical 3D MAE reports DSC vs no-pretraining baseline. **No analogous all-three-corners bake-off exists for construction documents or engineering drawings specifically** — practitioners working on those domains are doing so without clean comparative benchmarks for their data shape.

### Sub-topic: The OOD-domain transfer matrix

OOD-domain transfer reporting in the covered set is uneven and partly favors natural-image SSL more than the early framing assumed. **DINOv3 (2025-08, §8.3, Tables 18 & 19) reports satellite-domain transfer for both DINOv3 Web (no satellite fine-tune) and DINOv3 Sat-493M (satellite specialization).** DINOv3 Web ViT-7B sets state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating DINOv3 Sat-493M and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. DINOv3 explicitly cites Lahrichi 2025 in support: "domain-agnostic pretraining can offer strong generalization even in specialized downstream domains."

**Lahrichi 2025 (arxiv:2502.10669) directly compared MAE/SwAV pretraining on GeoNet vs ImageNet across six segmentation benchmarks** and reports "no consistent advantage to pre-training with GeoNet as compared to ImageNet." Two-stage MAE-IN-GN beats from-scratch MAE-GN on 5 of 6 benchmarks but the advantage is modest (1-2%).

**GLARE (arxiv:2509.17816v2, 2026-01-29) reports modest +0.2 to +0.6 mIoU continual-pretraining gains** on top of UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA at ViT-S/16.

**Medical 3D MAE (arxiv:2410.23132)** reports MRI-volume DSC +1.97 on average over a non-pretrained nnU-Net. *The medical paper does not compare to continual SSL on a natural-image checkpoint.*

The other canonical SSL papers in the covered set (MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v2-with-registers, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, AM-RADIO/RADIOv2.5/C-RADIOv4) confine their reported transfer to IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain. **No published all-three-corners bake-off (from-scratch SSL on domain vs continual SSL from natural-image SSL vs zero-shot fine-tune from natural-image SSL) exists for construction documents or engineering drawings specifically.** Satellite/medical answers come from DINOv3 Web's frozen-backbone results, Lahrichi 2025, GLARE 2026, Medical 3D MAE, and DiT for documents; whether their conclusions generalize to line-art-heavy construction documents is not established and is the post's open question.

### Cross-method ADE20K mIoU summary (where reported)

ViT-L IN1K-pretrained, UperNet head:
- MAE 53.6
- BEiT v1 53.3 (800 ep)
- BEiT v2 56.7 (1600 ep)
- D2V2-Refined (MIM-Refiner) 54.4

ViT-B IN1K-pretrained, UperNet head:
- MAE 48.1
- BEiT v1 45.6
- BEiT v2 53.1
- iBOT 50.0
- CAE 50.2

Frozen-backbone (linear or DPT-style):
- DINOv2 ViT-g 53.0 (multi-scale)
- DINOv3 ViT-7B **63.0** ← highest reported in the dataset

Multi-teacher distillation:
- RADIOv2.5-g 54.56
- C-RADIOv4-H 55.20

These numbers are the empirical spine of section "Where each recipe lands on dense prediction." They will be tabulated in a figure.

## Claim-source matrix

Every load-bearing claim the post will make has a row here with a quoted primary source and a recency status.

| # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID (arxiv / URL + date) | Recency status |
|---|---|---|---|---|
| 1 | MAE uses an asymmetric encoder/decoder where the encoder operates only on the visible (~25%) subset of patches, with mask ratio 75% | "an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens)... masking a high proportion of the input image, e.g., 75%" | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
| 2 | MAE achieves ADE20K mIoU 53.6 with ViT-L (UperNet, IN1K-pretrained) | "MAE / IN1K: ViT-B 48.1, ViT-L 53.6" — Table 5 | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
| 3 | SimMIM uses 60% mask ratio with 32×32 patches and a single linear prediction head | "we adopt a masking ratio of 0.6 on patch size of 32 by default... the prediction head can be made extremely lightweight, as light as a linear layer" | arxiv:2111.09886v1 (2021-11-18) | stable foundational / passes |
| 4 | MaskFeat predicts HOG features at masked positions and shows that semantic-feature targets (from supervised CNNs/ViTs) degrade performance | "Histograms of Oriented Gradients (HOG)... works particularly well... Semantic knowledge from human annotations is not always helpful for MaskFeat... predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance" | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
| 5 | MaskFeat does not report image dense-prediction transfer (ADE20K / COCO seg) | Image transfer in the paper is ImageNet classification only; video transfers are AVA/SSv2. "MaskFeat opens the door for directly pre-training on unlabeled videos." | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
| 6 | data2vec and data2vec 2.0 do not report image dense-prediction transfer | data2vec evaluates ImageNet-1K + Librispeech + GLUE only; data2vec 2.0 same | arxiv:2202.03555v3 (2022-10-25); arxiv:2212.07525v2 (2023-06-15) | stable foundational / passes |
| 7 | data2vec is vulnerable to representation collapse; the paper documents three failure modes | "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low... Third, ... longer spans need to be masked" | arxiv:2202.03555v3 (2022-10-25) | stable foundational / passes |
| 8 | BEiT v1 uses DALL-E's pretrained dVAE tokenizer (vocab 8192) as targets | "we directly use the publicly available image tokenizer described in [Ramesh et al. 2021]"; "vocabulary size of visual tokens is 8192" | arxiv:2106.08254v2 (2022-09-03) | stable foundational / passes |
| 9 | BEiT v2 trains a VQ-KD tokenizer by knowledge-distilling CLIP/DINO features and achieves ADE20K mIoU 53.1 (ViT-B) / 56.7 (ViT-L) at 1600 epochs | "the output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP"; "BEiT v2 (ours), 1600 epochs: ImageNet 85.5, ADE20K 53.1... ViT-L: ImageNet 87.3, ADE20K 56.7" | arxiv:2208.06366v2 (2022-10-03) | stable foundational / passes |
| 10 | MIM-Refiner identifies the three-block-regime structure of MIM-pretrained encoders: early=general, middle=abstractions (k-NN peaks), late=reconstruction-prep (k-NN drops) | "1. In early ViT blocks, general purpose features are learned... 2. In middle ViT blocks, abstractions are formed... 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases" | arxiv:2402.10093v4 (2025-02-20) | actively-evolving / 12-month bar / foundational-stable — block-regime analysis is a structural/analytical contribution about MIM encoders; not a time-sensitive benchmark number |
| 11 | DINO observed that self-supervised ViT features carry explicit segmentation information that doesn't emerge in supervised ViTs or convnets | "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets" | arxiv:2104.14294v2 (2021-05-24) | stable foundational / passes |
| 12 | iBOT uses the teacher network as an online tokenizer for masked-patch prediction, dispensing with a pretrained tokenizer | "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand" | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
| 13 | iBOT achieves ADE20K mIoU 50.0 with UperNet at ViT-B/16 | "iBOT advances previous best methods DINO by 3.2 on mIoU with UperNet" — paper Table 5 | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
| 14 | DINOv2's loss combines DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on a curated 142M-image dataset (LVD-142M) | "DINO loss... iBOT loss... KoLeo regularizer... [we] replace the teacher softmax-centering step of DINO and iBot by the Sinkhorn-Knopp (SK) batch normalization" + LVD-142M curation pipeline | arxiv:2304.07193v2 (2024-02-02) | foundational-stable — DINOv2 loss composition is the recipe definition; the post uses it as a reference, not as a fresh benchmark claim |
| 15 | DINOv2 has high-norm token artifacts (~10× higher norm, ~2% of tokens) appearing in low-information background regions; registers fix them with <2% FLOP overhead | "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)"; "we explicitly add new tokens to the sequence, that the model can learn to use as registers... <2% FLOP increase" | arxiv:2309.16588v2 (2024-04-12) | foundational-stable — registers are an established architectural fix referenced by DINOv3 (rows 16-18, 2025-08); the artifact diagnosis is the load-bearing analytical content |
| 16 | DINOv3 introduces Gram anchoring as a regularizer on patch–patch similarity geometry: ℒ_Gram = ‖X_S X_S⊤ − X_G X_G⊤‖_F² | Body of paper, refinement-phase loss. | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 17 | Without Gram anchoring, long DINO/iBOT training shows patch-feature locality decay (cosine sim between CLS and patches grows) | "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 18 | DINOv3 ViT-7B achieves ADE20K mIoU 63.0 with frozen backbone | "ADE20K segmentation (frozen backbone): mIoU 63.0" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 19 | I-JEPA predicts in latent space (target encoder = EMA of context encoder), not pixel/token space; pixel-space prediction empirically degrades linear probe | "by predicting in representation space, I-JEPA produces semantic representations while using less compute"; "predicting in pixel-space leads to a significant degradation in the linear probing performance" | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
| 20 | I-JEPA does not report ADE20K mIoU; transfer benchmarks are classification + Clevr-Count/Dist | Body of paper. | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
| 21 | AIM uses prefix-LM (sampled prefix length S, bidirectional within prefix, AR loss on rest) with normalized-pixel L2 target | "we uniformly sample a prefix length S. The attention for the first S patches are set to be bidirectional and loss is only computed for the remaining patches" + L2 loss on normalized pixels | arxiv:2401.08541 (2024-01-16) | foundational-stable — AIM's prefix-LM recipe is the origin definition for the AR-vision branch; AIMv2 (row 34, 2024-11) is the recent extension |
| 22 | AIM does not report ADE20K, COCO, or depth transfer numbers (classification-only) | Body of paper; 15 classification benchmarks evaluated, no dense-prediction numbers | arxiv:2401.08541 (2024-01-16) | foundational-stable — same as row 21 |
| 23 | AM-RADIO student is trained with no SSL auxiliary loss; the entire signal is teacher feature imitation (cosine + smooth L1 on spatial, cosine on summary) | "L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))"; "L_features... L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1" — and no SSL pretext mentioned | arxiv:2312.06709 (current arxiv version v5 revised 2024-04-30) | actively-evolving / 12-month bar / foundational-stable — AM-RADIO's loss formulation is foundational for the RADIO line; the "no SSL aux loss on student" architectural decision is the recipe's defining choice and doesn't drift with arxiv revisions. C-RADIOv4 row 25 (2026-01) is the recent corroboration for the lineage claim. |
| 24 | RADIOv2.5 diagnoses the "mode-switching" pathology where features behave like DINOv2 at ≤512² and like SAM at higher resolutions | "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM"; "in the high-resolution regime the student only sees SAM features" | arxiv:2412.07679v2 (2025-02-09) | actively-evolving / 12-month bar / foundational-stable — mode-switching is an analytical diagnosis specific to the RADIO architecture; the diagnosis is the load-bearing content, not a benchmark number that drifts. |
| 25 | C-RADIOv4's primary spatial loss is squared error against PHI-S-normalized teacher outputs (NOT cosine + smooth-L1, which is the AM-RADIO formulation). The summary loss is angular-cone-normalized (Θ²/Disp) — the paper explicitly states "we no longer use cosine distance as our summary loss." MESA is a self-supervised shift-equivariant regularizer where the student matches its own EMA on shifted crops (not a teacher); it is not a MAE/DINO-style pretext. | "we adopt a new loss formulation as follows: L_spatial(x, ŷ) = (1/|Ω|) Σ (𝓕_{S→T}[x]_u − ŷ_u)²" with "ŷ_u [is] the PHI-S normalized teacher output" — Eq. 1 §2.3.1; "we no longer use cosine distance as our summary loss, and instead adopt the following: L_angle(x, y) = Θ(x, y)² / Disp(Θ_y)" — Eq. 7 §2.5; "L_mesa(x, x̃) = (1/|Ω|) Σ (𝓕_{S→S̃}[LN(x)]_u − LN(x̃)_u)²" with "matching the exponential moving average (EMA) of the student model, but with the added twist of introducing different crops for the student and its EMA" — Eq. 2 §2.3.2 | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / foundational-stable — Hadamard standardization is a technique definition referenced by C-RADIOv4 (2026-01); the underlying mathematical recipe doesn't drift |
| 29 | DiT applies BEiT-style MIM to document images and reports PubLayNet 91.0→94.9, ICDAR2019 cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69 | Reported headline numbers from arxiv:2203.02378 abstract. *Recipe specifics (DALL-E tokens, IIT-CDIP 42M corpus) flagged for Phase 3 re-fetch if quoted in prose.* | arxiv:2203.02378 (2022-03) | stable / 18-month bar fails (4 years old); foundational for the document-domain framing — flag as marginal-stable. |
| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / marginal — Oct 2024, 19 months. Hedge in prose: "as of late 2024 the medical-MAE result was published; newer dense-medical comparisons may exist by pubDate." Phase 7 to re-check. |
| 31 | OOD-domain transfer reporting in canonical SSL papers is uneven and partly *favors natural-image SSL*: DINOv3 Web ViT-7B (frozen, no satellite-specific fine-tune) reports state-of-the-art on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating both DINOv3 Sat-493M (the satellite specialization) and prior satellite-specialized models. iSAID is a notable hedge: DINOv3 Web 71.4 < SkySense V2 71.9. Medical 3D MAE reports MRI-volume DSC for the medical case. **No canonical SSL paper reports transfer to construction-document or engineering-drawing domains.** | "We compare the performance of different methods for Earth observation tasks ... The frozen DINOv3 satellite and web models set new state-of-the-art results on 12 out of 15 classification, segmentation, and horizontal object detection tasks ... the frozen DINOv3 web model establishes new leading results [on] Geo-Bench tasks as well as for segmentation and detection tasks on the LoveDA and DIOR datasets" — DINOv3 §8.3, Tables 18 & 19; Table 19 numbers: DINOv3 Web ViT-7B LoveDA 56.2 / iSAID 71.4 / DIOR 80.5 vs Prev. SotA 54.4 / 71.9 / 79.5. | DINOv3 arxiv:2508.10104 (2025-08); Medical 3D MAE arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / DINOv3 passes; Medical 3D MAE foundational-stable for the medical-MAE comparison |
| 32 | Published from-scratch-SSL vs from-natural-image-SSL bake-offs with dense-prediction numbers do exist for satellite (Lahrichi 2025) and for continual-SSL semantic segmentation across natural + satellite domains (GLARE 2026). The published verdict is **NOT** "domain-adaptive SSL clearly wins": Lahrichi found "no consistent advantage to pre-training with GeoNet as compared to ImageNet" across six benchmarks; GLARE's gains on top of UDI initialization are modest (+0.2 to +0.6 mIoU). **No analogous bake-off exists for construction documents or engineering drawings specifically.** | Lahrichi: "we pre-train models on ImageNet and GeoNet, respectively, using two different SSL pre-training strategies: SwAV and MAE" — §5; "the results showed no consistent advantage to pre-training with GeoNet as compared to ImageNet, regardless of whether SwAV or MAE was used" — §8 Conclusions; "MAE-IN-GN outperforms the MAE-GN on five of the six downstream benchmarks, however, the performance advantage in each of these cases is modest (usually 1-2%)" — §6. GLARE: "Given an encoder trained via SSL ... we are interested in improving the output feature embedding by training only the adapter parameters θA via SSL" — §4; "GLARE continual pre-training from UDI consistently shows improvements over the other pre-training strategies" — Table 1 caption; UDI→GLARE deltas (ViT-S/16): ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5. | Lahrichi arxiv:2502.10669v1 (2025-02-15); GLARE arxiv:2509.17816v2 (2026-01-29) | actively-evolving / 12-month bar / Lahrichi 2025-02-15 is OUTSIDE the strict 12-month bar (14 months at pubDate 2026-05-04) — foundational-stable for the historical "Lahrichi found X" claim, since "no consistent advantage" is a recipe-comparison verdict that doesn't drift with paper revisions; GLARE 2026-01-29 passes the bar |
| 33 | BEiT v3 trains via masked data modeling on images, text, AND image-text pairs in a unified objective (Multiway Transformer with shared self-attention) — multimodal SSL, not vision-only. | "we perform masked 'language' modeling on images (Imglish), texts (English), and image-text pairs ('parallel sentences') in a unified manner" — Abstract | arxiv:2208.10442v2 (2022-08-31) | stable foundational / passes |
| 34 | AIMv2 trains via causal multimodal autoregression: image patches first, then text tokens — image-text supervision, not vision-only SSL. | "a causal multimodal decoder that first regresses image patches and then decodes text tokens in an autoregressive manner" — Abstract | arxiv:2411.14402v1 (2024-11-21) | foundational-stable — AIMv2's recipe definition is the load-bearing claim; ~18 months puts it past the strict 12-month bar but the recipe-classification claim doesn't drift |
| 35 | Across the published RADIO line (AM-RADIO 2023 → RADIOv2.5 2024 → C-RADIOv4 2026), the student's primary supervision is teacher feature imitation, not a MAE/DINO-style self-supervised pretext. The only "self-supervised" component is C-RADIOv4's MESA (shift-equivariant EMA matching) which functions as a self-equivariance regularizer, not as a primary pretext task. | Cross-paper synthesis grounded in row 23 (AM-RADIO loss formulation), row 24 (RADIOv2.5 loss formulation), row 25 (C-RADIOv4 + MESA). | Synthesis row pointing to arxiv:2312.06709 + arxiv:2412.07679 + arxiv:2601.17237. | actively-evolving / 12-month bar / passes via row 25 (C-RADIOv4, 2026-01) |
| 36 | The post's central thesis "multi-teacher distillation occupies a different position in the SSL recipe taxonomy than MAE/DINO/JEPA-style pretext-derived SSL" is supported by row 35 (cross-RADIO loss-formulation observation) — the supervision shape is categorically external (teacher activations) rather than pretext-derived (reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs). The post should not claim "multi-teacher distillation is not SSL"; rather, it is a different *kind* of self-supervision whose label-source is another model's outputs. | Synthesis claim grounded in row 35 + every primary SSL row. | Synthesis claim. | actively-evolving / passes via row 35 |

**Marginal-row debt closure (post-Gate-0-fix-v2).** Row-32 deferral lifted with quoted excerpts from Lahrichi 2025 and GLARE 2026. Remaining marginal:

- **Row 30** (Medical 3D MAE, 19 months old): hedged in prose. Phase 7 to re-check whether newer medical-MAE comparisons land before pubDate.

Foundational-stable annotations applied to rows 10, 14, 15, 21, 22, 23, 24, 28, 32 (Lahrichi only — GLARE passes), 34 — recent papers whose load-bearing content is a technique definition or a recipe-classification claim that doesn't drift with arxiv revisions.

Foundational-source annotations applied to: MAE 2021 (rows 1, 2), SimMIM 2021 (row 3), MaskFeat 2021/2023 (rows 4, 5), data2vec 2022 (rows 6, 7), BEiT v1 2021 (row 8), BEiT v2 2022 (row 9), DINO 2021 (row 11), iBOT 2021 (rows 12, 13), I-JEPA 2023 (rows 19, 20). These are the origin papers for the recipes; the recipe definitions are stable references.

Active sources within the 12-month bar (passing on date): DINOv3 (rows 16, 17, 18, 31; 2025-08), C-RADIOv4 (rows 25, 26, 27; 2026-01-24), GLARE (row 32; 2026-01-29).

## Codex research review

**Gate 0 run 1, 2026-05-04.** Findings: 8 STRUCTURAL, 0 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504.md](./ssl-pretraining-recipes-codex-research-20260504.md).

**Summary of findings (codex's verbatim summary at end of findings file):**

1. STRUCTURAL: Row 31 was false. DINOv3 paper has a geospatial section (SAT-493M, Geo-Bench, LoveDA, iSAID, DIOR segmentation/detection numbers); the "no canonical SSL paper reports OOD transfer" claim was wrong. Spec/Throughline claim "DINOv3 has never seen satellite imagery" was also wrong.
2. STRUCTURAL: Row 32's absence claim was false. Lahrichi et al. 2025 directly compares MAE/SwAV on GeoNet vs ImageNet with mIoU; includes a two-stage MAE-IN→GN condition. GLARE TMLR 2026 is a directly relevant continual-SSL-for-segmentation source.
3. STRUCTURAL: Row 25 overstated C-RADIOv4 as "no SSL auxiliary loss / entire signal teacher imitation" — MESA matches the student's own EMA on shifted crops, which IS a self-supervised regularizer (just not a MAE/DINO-style pretext).
4. STRUCTURAL: The central thesis "multi-teacher distillation is categorically different from SSL pretraining in the MAE/DINO sense" had no matrix row.
5. STRUCTURAL: The matrix was missing rows for BEiT v3 multimodal training and AIMv2 multimodal training, both required by the Spec.
6. STRUCTURAL: Recency status was wrong on rows 10, 24, 28, 30 (and row 23 just outside bar) — marked "passes" without foundational-exemption annotation.
7. STRUCTURAL: Throughline claim "natural-image SSL backbone produces low-signal features on this kind of data" was unsupported by any matrix row and partly contradicted by DINOv3's satellite results.
8. STRUCTURAL: The synthesis search behind rows 31, 32 was not exhaustive enough. DINOv3 alone invalidates row 31; Lahrichi 2025 and GLARE 2026 invalidate the confidence level of row 32.

**Fixes applied (this commit + immediately following commits):**

- Spec one-paragraph summary rewritten to acknowledge DINOv3's satellite specialization and narrow the OOD claim to construction documents specifically.
- Throughline Act 1 description rewritten to a hypothesis tied to construction-document line-art specifically; explicit acknowledgment that DINOv3-satellite shows OOD adaptation can succeed.
- Row 25 (C-RADIOv4) reworded: "primary training signal is teacher feature imitation; the only self-supervised component is MESA's shift-equivariant matching against the student's own EMA, which is a self-equivariance regularizer rather than a MAE/DINO-style pretext."
- Row 31 reframed: OOD reporting is *uneven*; DINOv3 ships satellite specialization with Earth-observation numbers; Medical 3D MAE reports MRI-volume DSC; *no* canonical SSL paper reports construction-document or engineering-drawing transfer.
- Row 32 reframed: bake-offs DO exist for satellite (Lahrichi 2025) and continual-SSL semantic seg (GLARE 2026); none for construction documents specifically. Phase 7 must close this row with quoted excerpts before ship.
- Added rows: 33 (BEiT v3 multimodal), 34 (AIMv2 multimodal), 35 (cross-RADIO no-SSL-pretext synthesis), 36 (central thesis backed by row 35).
- Recency: foundational-stable annotations added to rows 10, 14, 15, 21, 22, 23, 24, 28; row 30 hedged to marginal pending Phase 7 re-check; row 32 explicitly DEFERRED to Phase 7 quote-fetch.

**Closure status:** structural fixes applied; ready to re-run Gate 0 to confirm cosmetic-only.

### Gate 0 run 2, 2026-05-04

Findings: 4 STRUCTURAL, 1 COSMETIC. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run2.md](./ssl-pretraining-recipes-codex-research-20260504-run2.md). Down from 8 STRUCTURAL on run 1.

**Findings (verbatim summary):**

1. STRUCTURAL: Row 32 not closed — quote-deferral failed the matrix contract; "satellite/medical" framing was wrong because the medical paper does not run continual SSL.
2. STRUCTURAL: Row 31 still false in the broader claim — DINOv3 Web reports LoveDA + DIOR + iSAID and that contradicts "the broader set remains confined to IN1K/ADE20K/COCO/iNat/Places/VTAB/video."
3. STRUCTURAL: Row 25 only half-fixed — C-RADIOv4's actual loss formulation is PHI-S-normalized squared-error spatial + angular-cone-normalized summary (the paper explicitly drops cosine for summary). The Headline finding still claimed "no SSL aux loss on student" which conflicts with the corrected MESA wording.
4. STRUCTURAL: Throughline Act 1 still asserted a thesis the matrix didn't yet support ("post will defend domain-adaptive SSL gives stronger fine-tuning starting point for sufficiently OOD domains").
5. COSMETIC: Row 34 recency bookkeeping inconsistent.

**Fixes applied (this commit):**

- Dispatched a focused fetch agent to surface verbatim quotes from Lahrichi 2025, GLARE 2026 (arxiv:2509.17816v2), DINOv3 Table 19, and C-RADIOv4 §2.3.1 / §2.3.2 / §2.5.
- Row 32 closed with quoted excerpts from Lahrichi (verdict: "no consistent advantage to pre-training with GeoNet as compared to ImageNet") and GLARE (UDI→GLARE deltas: ADE20K 41.2→41.6, Pascal Context 49.1→49.3, Cityscapes 74.7→75.3, LoveDA 50.9→51.5). The "satellite/medical" framing dropped — Medical 3D MAE doesn't run continual SSL.
- Row 31 reframed: DINOv3 Web ViT-7B *favors natural-image SSL* on satellite (LoveDA 56.2 mIoU SOTA, DIOR 80.5 mAP SOTA; iSAID 71.4 < SkySense V2 71.9). The "broader set confined to IN1K → {…}" sub-claim removed.
- Row 25 corrected: spatial loss is squared error against PHI-S-normalized teacher outputs (Eq. 1 §2.3.1), summary loss is angular-cone-normalized (Eq. 7 §2.5; cosine explicitly dropped), MESA is shift-equivariant EMA matching of student against itself (Eq. 2 §2.3.2).
- Headline finding rewritten: removed "no SSL aux loss on student"; reframed multi-teacher distillation as a different *kind* of self-supervision (external teacher activations) rather than a pretext-derived one. Added a second Headline finding on domain transfer: published evidence (DINOv3 Web SOTA on satellite, Lahrichi's "no consistent advantage", GLARE's modest deltas) does not support a simple "domain-adaptive SSL beats natural-image SSL" thesis.
- Throughline Act 1 rewritten: post does not "defend" domain-adaptive SSL > zero-shot natural-image SSL; explores the question for construction documents specifically.
- OOD-domain transfer paragraph in Research notes rewritten to match the new framing.
- Row 34 set to foundational-stable; marginal-debt-closure list updated.

**Closure status:** structural fixes applied (run 2); ready to re-run Gate 0 (run 3) to confirm cosmetic-only.

### Gate 0 run 3, 2026-05-04

Findings: 3 STRUCTURAL + 2 COSMETIC. Down from 8 → 4 → 3 STRUCTURAL across runs 1, 2, 3. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run3.md](./ssl-pretraining-recipes-codex-research-20260504-run3.md).

**Findings (verbatim summary):**

1. STRUCTURAL: Spec line 16 still promised "When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds" but the matrix doesn't support that specific comparison (DINOv3 reports Web-vs-Sat frozen-backbone transfer; GLARE Table 1 is UDI-init not DINOv3-init).
2. STRUCTURAL: Research-notes line 304-area "no canonical bake-off" sentence stale and contradicted row 32. Narrow to "no all-three-corners bake-off for construction documents specifically."
3. STRUCTURAL: Research-notes line 263-area "No SSL auxiliary loss on student" prose still stale, contradicting the corrected row 25 + revised Headline finding.
4. COSMETIC: Row 36 parenthetical too narrow ("corrupted view + reconstruction objective") — should be "reconstruction, invariance, or latent-prediction."
5. COSMETIC: Row 32 recency bookkeeping incorrect — Lahrichi 2025-02-15 is OUTSIDE the 12-month bar at pubDate 2026-05-04; should be foundational-stable for the historical claim.

**Fixes applied (this commit):**

- Spec "Reader walks away knowing" bullet rewritten: "The published evidence on continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain (Lahrichi 2025; GLARE 2026) and what it does and doesn't tell us about construction documents."
- Research-notes "no all-three-corners bake-off" sentence narrowed to construction documents / engineering drawings specifically; satellite/medical answers explicitly named (DINOv3 Web, Lahrichi, GLARE, Medical 3D MAE, DiT).
- C-RADIOv4 prose section: stale "No SSL auxiliary loss on student" line removed; replaced with "No MAE/DINO/JEPA-style pretext task on the student. MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA, not a teacher), but it is not a masked-prediction or contrastive pretext." Loss equations updated to PHI-S spatial / angular-cone summary / MESA wording.
- Row 36 parenthetical broadened to "reconstruction, invariance, or latent-prediction objectives over corrupted/multi-view inputs."
- Row 32 recency: relabeled to foundational-stable for the Lahrichi historical-claim (the "no consistent advantage" verdict is a fixed recipe-comparison result that doesn't drift), with the 14-month-outside-bar fact stated explicitly.

**Closure status:** structural fixes applied (run 3); ready to re-run Gate 0 (run 4 — the gate-runner cap).

### Gate 0 run 4, 2026-05-04 — Vic-extended budget; Step-6 acceptance override

Findings: 2 STRUCTURAL + 1 COSMETIC. Trajectory: 8 → 4 → 3 → 2 STRUCTURAL across runs 1–4. Full output: [notes/ssl-pretraining-recipes-codex-research-20260504-run4.md](./ssl-pretraining-recipes-codex-research-20260504-run4.md).

**Findings (verbatim summary):**

1. STRUCTURAL: Spec bullet "Reader walks away knowing" still over-attributed GLARE's comparison shape — GLARE is adapter-based continual SSL from UDI initialization, not a clean continual-natural-image-vs-from-scratch-on-target bake-off. Lahrichi is the satellite bake-off; GLARE is continual-adapter evidence — distinct shapes.
2. STRUCTURAL: Second "no canonical bake-off" sentence at the Continual SSL sub-topic still stale (I'd narrowed line 316 in run 3 but missed the earlier sentence).
3. COSMETIC: Headline finding parenthetical defined pretext-derived SSL as "corrupted-view + reconstruction or invariance objective"; row 36 (line 384) had broader phrasing that included latent prediction.

Codex's verbatim closing: **"C-RADIOv4 closure is sound. The revised paragraph at line 263 is consistent with row 25, row 35, and the C-RADIOv4 primary source: MESA is self-supervised EMA matching on shifted crops, but the primary RADIO supervision remains teacher feature imitation. Row 36 and row 32 cosmetic fixes are closed."**

**Step-6 acceptance override applied (Vic-approved 2026-05-04).** Per the codex-prompts.md per-gate runner Step 6: gate-runner cap is 3 invocations (initial + 2 re-runs). Vic extended the budget for invocation 4 with the explicit conditional "if STRUCTURAL → halt back to you." Codex run 4 surfaced 2 small stale-prose STRUCTURAL contradictions of already-fixed rows (not deep matrix issues). Vic chose option (a) — apply the 2 fixes, accept Gate 0 as cosmetic-converging without a 5th codex run, recording the acceptance as a Step-6 override. Reasoning recorded:

- Trajectory cleanly converging (8 → 4 → 3 → 2 STRUCTURAL across runs 1–4).
- Both run-4 STRUCTURAL findings were minor stale-prose contradictions of already-fixed matrix rows, not deep matrix issues.
- Codex confirmed in the run-4 closing paragraph that the matrix itself is sound: "C-RADIOv4 closure is sound … row 36 and row 32 cosmetic fixes are closed."
- The 2 STRUCTURAL fixes were applied surgically (Spec bullet rewritten to separate Lahrichi's bake-off from GLARE's continual-adapter evidence; second "no canonical bake-off" sentence narrowed to construction documents).
- The 1 COSMETIC fix was also applied (Headline parenthetical broadened to match row 36).

**Outcome:** Gate 0 closed via Step-6 override after 4 codex invocations. Phase 2 deliverable accepted; advancing to Phase 3 (outline + figure list).

## Outline

16 sections across three acts. 15 figures (14 × static-svg + 1 × plot). No interactive figures: none of the mechanisms meet the four override clauses (continuous sweep / animation / drag / multi-state toggle), and the post's deliverable is a recipe taxonomy + decision tree, which static SVG handles cleanly. Construction-sheet throughline carries every act.

### Act 1 — The problem

**§1. The construction sheet that won't pretrain itself**
- Throughline open: introduce the sheet — a single floor plan or section detail. What it looks like; what makes it unlike LVD-1689M / NV-CC-Img-Text.
- Claim: this corpus exists; the canonical SSL backbones haven't seen it; the practitioner has to pick a recipe.
- Figure 1: annotated construction sheet — whitespace, line-art strokes, repetitive symbols, low color, mostly-empty patches.
- Reader walks away knowing what makes this corpus distinct from natural images and why "download a checkpoint and fine-tune" needs a closer look.
- Backed by: the corpus shape is descriptive scene-setting, not a load-bearing assertion.

**§2. Dense-feature quality is the load-bearing axis**
- Claim: segmentation needs per-patch features, not a single CLS token. Different SSL recipes produce different dense-feature qualities; classification benchmarks alone don't predict segmentation transfer.
- Figure 2: CLS vs per-patch — same image, two heads, class probability vs per-patch label heatmap.
- Reader walks away knowing why the recipe-selection question can't be reduced to "best ImageNet number wins."
- Backed by: row 11 (DINO's emergent segmentation observation), row 17 (DINOv3's patch-locality-decay diagnosis), row 10 (MIM-Refiner's block regime).

**§3. The question we can't answer head-on**
- Claim: there is no canonical bake-off for construction-document SSL. Adjacent evidence — DINOv3 Web ViT-7B SOTA on LoveDA / DIOR; Lahrichi 2025's "no consistent advantage to GeoNet over ImageNet"; GLARE 2026's modest continual-pretraining deltas; Medical 3D MAE's +1.97 DSC over no-pretraining — exists for satellite / medical / documents (DiT). Construction-document line-art is not in any published comparison.
- Figure 3: bake-off coverage matrix — rows = domains (natural / satellite / medical / docs / construction-drawings); columns = strategies (zero-shot natural-init / continual SSL on natural / from-scratch SSL on domain); cells = citation or "no published bake-off."
- Throughline close (act 1): we'll walk seven recipe families across the construction sheet and end at a decision tree where the sheet lands at one terminal node.
- Reader walks away with the post's open question explicit: the answer for line-art-heavy engineering documents has to come from the recipe taxonomy plus what each recipe's signal can extract from this kind of data.
- Backed by: row 31 (DINOv3 Web SOTA on satellite + Medical 3D MAE), row 32 (Lahrichi + GLARE), row 30 (Medical 3D MAE).

### Act 2 — The recipes

**§4. Pixel-reconstruction MIM (MAE)**
- Throughline open: feed the construction sheet to MAE — 75% mask, asymmetric encoder, lightweight pixel decoder.
- Claim: MAE generates supervision by reconstructing held-out pixel patches; the encoder operates only on the visible 25%; the decoder is small.
- Figure 4: MAE forward pass on the construction sheet — visible patches → encoder → mask tokens injected → decoder → pixel reconstruction.
- Reader walks away predicting where the loss collapses on whitespace-heavy data: most masked patches are themselves whitespace, so reconstruction is trivial.
- Backed by: rows 1 (architecture), 2 (ADE20K 53.6 ViT-L).

**§5. The MIM block regime**
- Claim: MIM-Refiner shows MAE features peak in mid-encoder layers; late layers are pre-allocated to the reconstruction task and lose semantic structure.
- Figure 5: MIM-Refiner block-regime plot — k-NN accuracy + reconstruction loss vs layer index; three regimes shaded (general / abstractions / reconstruction-prep).
- Type: plot (multi-curve quantitative comparison; legitimate kit-primitive use, not an interactive override).
- Reader walks away knowing the dense-feature signal lives in the middle of the encoder, not at the last block — and why off-the-shelf MAE features under-perform on dense tasks without head-tuning.
- Backed by: row 10 (block-regime analysis).

**§6. Changing the MIM target — features and tokens**
- Throughline open: the same masked construction sheet, but the prediction target isn't pixels.
- Claim: MaskFeat predicts HOG; data2vec predicts EMA-teacher latent features; BEiT predicts discrete tokens from a pretrained dVAE / VQ-KD codebook. None of MaskFeat / data2vec / data2vec 2.0 report image dense-prediction transfer in their headline tables. BEiT v2's strong ADE20K numbers come via a CLIP-distilled tokenizer — i.e. inheriting CLIP's web pretraining.
- Figure 6: three-panel target comparison on the same masked sheet — pixel target (MAE) | feature target (HOG cells / EMA latents) | token target (dVAE / VQ-KD codebook).
- Reader walks away knowing the choice of target shifts what the encoder keeps; only BEiT v2 reports strong dense-prediction numbers, and that's partly a CLIP-distillation result.
- Backed by: rows 4 (MaskFeat HOG), 5 (MaskFeat no image dense transfer), 6 (data2vec no image dense transfer), 7 (collapse failure modes), 8 (BEiT dVAE), 9 (BEiT v2 VQ-KD + ADE20K).

**§7. Self-distillation (DINO → iBOT → DINOv2)**
- Claim: a student matches a teacher's output distribution under different augmentations; iBOT extends this to masked-patch self-distillation; DINOv2 = DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on 142M curated images. DINO's emergent-segmentation observation is what makes this lineage the dense-feature SSL family.
- Figure 7: DINO/iBOT loss flow on the construction sheet — student sees global+local crops, teacher EMA sees a global crop, KL on class probs; iBOT adds masked-patch self-distillation.
- Reader walks away knowing invariance-to-augmentation is the trick that produces patch-level structure without explicit reconstruction.
- Backed by: rows 11 (DINO emergent segmentation), 12 (iBOT online tokenizer), 13 (iBOT ADE20K 50.0), 14 (DINOv2 loss + LVD-142M).

**§8. Dense-feature collapse and how the latest recipes fix it**
- Throughline open: by DINOv2 the dense features on the construction sheet had artifact tokens — high-norm "spikes" concentrated in low-information regions like whitespace patches.
- Claim: large self-distilled ViTs develop ~2% artifact tokens with ~10× output norm; registers fix them with <2% FLOP overhead; long DINO/iBOT training also leaks CLS-like signal into patches (cosine sim between CLS and patches grows); DINOv3's Gram anchoring loss preserves the patch-patch similarity geometry across training.
- Figure 8: artifact-token heatmaps before/after registers (left half) + Gram anchoring schematic (right half: X·X⊤ vs X_G·X_G⊤).
- Reader walks away knowing dense-feature collapse is a real failure mode of long-training self-distillation, and the most recent SSL recipes engineer specifically against it.
- Backed by: rows 15 (registers diagnosis), 16 (Gram anchoring loss), 17 (locality-decay observation), 18 (DINOv3 ADE20K 63.0).

**§9. JEPA — predicting in latent space**
- Throughline open: same construction sheet; predict the encoder's own latent features at masked target positions, not pixels or HOG.
- Claim: I-JEPA uses a context encoder + predictor + EMA target encoder; pixel-space prediction empirically degrades the linear probe; V-JEPA / V-JEPA 2 extend this shape to video. No published image dense-prediction transfer in any of these.
- Figure 9: side-by-side of MAE pixel prediction and I-JEPA latent prediction on the sheet.
- Reader walks away knowing latent-space prediction is a different bet (skip pixel detail), but the JEPA family hasn't produced an image dense-prediction story.
- Backed by: rows 19 (I-JEPA representation-space prediction), 20 (no I-JEPA ADE20K).

**§10. Autoregressive image pretraining (AIM)**
- Claim: prefix-LM with normalized-pixel L2 target; pretraining loss correlates with downstream classification performance, scaling with model + data like LLMs; transfer benchmarks are classification-only. iGPT predates this with pure-AR pixel modeling at small resolution. AIMv2 is multimodal causal AR (image + text), not vision-only SSL.
- Figure 10: AIM prefix-LM masking schematic on the construction sheet — bidirectional prefix, AR loss on the rest.
- Reader walks away knowing AR is a classification scaling-laws story; the dense-prediction numbers don't yet exist for this family.
- Backed by: rows 21 (AIM prefix-LM), 22 (AIM no dense transfer), 34 (AIMv2 multimodal — listed for completeness, not load-bearing).

**§11. Multi-teacher distillation (RADIO line)**
- Throughline open: the construction sheet is fed to a student that imitates an ensemble of foundation models, not to a pretext task.
- Claim: AM-RADIO → RADIOv2.5 → C-RADIOv4 train a student to match teacher activations (DFN/OpenAI CLIP, DINOv2 / DINOv3, SAM / SAM3, SigLIP2 across versions). Loss formulations evolved (cosine + smooth-L1 → PHI-S balancing → PHI-S-normalized squared error spatial + angular-cone summary). MESA is a self-supervised regularizer (shift-equivariant matching against the student's own EMA), not a primary pretext task. **Central thesis:** this is a different *kind* of self-supervision — the supervision signal is external teacher activations rather than a pretext-derived signal over corrupted/multi-view inputs.
- Figure 11: AM-RADIO architecture — student + N teachers, summary + spatial losses; C-RADIOv4 deltas annotated (PHI-S spatial, angular-cone summary, MESA EMA-matching).
- Reader walks away knowing multi-teacher distillation is a *compression* of foundation models; without teachers, there's no recipe to use. The categorical observation matters for taxonomy: this rung doesn't compete with MAE/DINO on supervision shape — it's a different position.
- Backed by: rows 23 (AM-RADIO loss), 24 (RADIOv2.5 mode-switching), 25 (C-RADIOv4 PHI-S/angular/MESA), 26 (C-RADIOv4-H ADE20K 55.20), 27 (teachers), 28 (PHI-S), 35 (cross-RADIO synthesis), 36 (central thesis).

**§12. Domain-adaptive specialization**
- Claim: from-scratch SSL on the domain when the corpus is large enough — DiT (BEiT-style on document images, IIT-CDIP 42M, layout / table / classification gains), Medical 3D MAE (39k MRI volumes, +1.97 DSC over from-scratch nnU-Net), SatMAE (fMoW). The published comparisons are usually domain-SSL vs domain-supervised, not domain-SSL vs continual-from-natural-image — so the question this post is asking is mostly missing from the canonical results.
- Figure 12: domain-adaptive bar chart — DiT PubLayNet 91.0→94.9, ICDAR cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69; Medical 3D MAE Δ +1.97 DSC.
- Reader walks away knowing domain-adaptive recipes work for documents and medical at scale, but the corpus scale required to make them work isn't always reachable, and the head-to-head against continual-from-natural is rarely reported.
- Backed by: rows 29 (DiT), 30 (Medical 3D MAE).

### Act 3 — The verdict

**§13. Where each recipe lands on dense prediction**
- Throughline open: the cross-recipe ADE20K mIoU table — the empirical spine of the post.
- Claim: ViT-L IN1K + UperNet — MAE 53.6, BEiT v1 53.3, BEiT v2 56.7 (CLIP-distilled tokenizer), D2V2-Refined 54.4. ViT-B IN1K + UperNet — MAE 48.1, iBOT 50.0, BEiT v2 53.1. Frozen-backbone — DINOv2-g 53.0, **DINOv3-7B 63.0**. Multi-teacher — RADIOv2.5-g 54.56, C-RADIOv4-H 55.20.
- Figure 13: cross-recipe ADE20K mIoU bar chart, grouped by recipe family. DINOv3-7B bar towers; multi-teacher cluster competitive at smaller scale; MIM family in the middle; JEPA / AR absent (no published number).
- Reader walks away knowing on natural-image ADE20K the self-distillation lineage with dense-feature-collapse fixes wins outright; multi-teacher distillation is competitive at much smaller compute; pure-MIM is mid; pure-AR doesn't compete on this axis.
- Backed by: rows 2, 9, 13, 18, 26 + cross-method summary in research notes.

**§14. The published OOD evidence**
- Claim: the published OOD evidence we have — DINOv3 Web ViT-7B (frozen, no satellite-specific fine-tune) sets SOTA on LoveDA (56.2 mIoU) and DIOR (80.5 mAP), beating DINOv3 Sat-493M and prior satellite-specialized models; iSAID is a hedge (DINOv3 Web 71.4 < SkySense V2 71.9). Lahrichi 2025: "no consistent advantage to pre-training with GeoNet as compared to ImageNet" across six segmentation benchmarks; two-stage MAE-IN→GN beats from-scratch MAE-GN on 5 of 6 benchmarks but the advantage is modest (1-2%). GLARE 2026: modest +0.2 to +0.6 mIoU continual-pretraining (adapter-based) gains over UDI initialization across ADE20K / Pascal Context / Cityscapes / LoveDA. Medical 3D MAE: +1.97 DSC over no-pretraining nnU-Net; the medical paper does NOT compare to continual SSL on a natural-image checkpoint. **No published bake-off exists for construction documents or engineering drawings specifically.**
- Figure 14: published OOD evidence summary — domains (satellite, medical, docs, construction-drawings) × strategies (zero-shot natural-init / continual SSL on natural / from-scratch SSL on domain); cells filled with the best published delta + paper, or "—" for absent.
- Reader walks away knowing the published evidence does not support a simple "domain-adaptive SSL strictly wins" thesis; for construction documents specifically there is no measured bake-off, and the recipe choice is an empirical question for the practitioner.
- Backed by: rows 31, 32.

**§15. The decision tree**
- Throughline close (act 3): the construction sheet lands at one terminal node, with other terminals labeled by data shape.
- Claim: a decision tree gated on three axes — corpus scale × domain distance from natural images × downstream task density — maps each leaf to a recipe pick. Internal nodes use what the recipe taxonomy tells us (e.g., "if downstream task is dense and compute is fixed: prefer self-distillation with collapse fixes over pure MIM"); the leaf for the construction-sheet case is empirical, hedged with "no measured bake-off; start with continual self-distillation on top of a DINOv3 checkpoint."
- Figure 15: the decision tree as static SVG. Branches by corpus scale → domain distance → task density. Leaves labeled with recipe + when-to-use. Construction sheet shown landing at one specific terminal; satellite, medical, and document terminals also labeled.
- Reader walks away with the deliverable: a defensible answer for "what should I pretrain on?" given the practitioner's data shape.
- Backed by: synthesis from every prior matrix row.

**§16. Coda — what we don't know**
- The construction-document SSL bake-off is the figure this post couldn't include. The decision tree's construction-sheet leaf is an extrapolation from satellite/medical evidence + recipe-taxonomy reasoning, not a measured number. The next 12 months — more domain-adaptive RADIO-style training, JEPA on more domains, specialized DINOv3 variants — could close this gap. Concrete pointer: if you're sitting on a million unlabeled construction sheets, the paper to read first is DINOv3; the recipe to try first is continual self-distillation with Gram anchoring on top of a DINOv3 checkpoint; the figure to make sure you publish is the one this post can't.
- No figure (per narrative-template.md, codas typically close on a small concrete point without a final figure).

### Figure table

| # | Figure | Type | Mechanism | Reader notices |
|---|---|---|---|---|
| 1 | ConstructionSheet | static-svg | Annotated construction sheet — whitespace, line-art strokes, repetitive symbols, low color, mostly-empty patches | What makes this corpus distinct from natural images |
| 2 | DenseVsCLS | static-svg | Per-patch label heatmap vs CLS class probability on the same image | Why CLS-quality and dense-feature-quality are different axes |
| 3 | OODCoverageMatrix | static-svg | Domains × init-strategies grid; cells = citation or "no published bake-off" | The bake-off coverage gap for construction documents |
| 4 | MAEForwardPass | static-svg | Asymmetric encoder; visible 25%; lightweight pixel decoder; 75% mask | Pixel reconstruction collapses on whitespace-heavy data |
| 5 | MIMBlockRegime | plot | k-NN accuracy + reconstruction loss vs layer index; three regimes shaded | Best MIM features are mid-encoder, not last |
| 6 | MIMTargetComparison | static-svg | Three panels: pixel target | feature target (HOG / EMA latents) | token target (dVAE / VQ-KD) | Target choice shifts what the encoder learns to keep |
| 7 | DINOiBOTLossFlow | static-svg | Student multi-crop, EMA teacher, KL on class probs; iBOT adds masked-patch self-distillation | Invariance-to-augmentation produces emergent segmentation |
| 8 | RegistersGramFix | static-svg | Artifact tokens before/after registers + Gram anchoring schematic (X·X⊤ vs X_G·X_G⊤) | Latest SSL recipes engineer against dense-feature collapse |
| 9 | JEPAvsMAE | static-svg | MAE pixel target vs I-JEPA latent target on the sheet | Latent prediction sidesteps pixel-detail cost |
| 10 | AIMPrefixLM | static-svg | Bidirectional prefix + AR rest, normalized pixel L2 target | AR is a classification scaling-laws story |
| 11 | RADIOArchitecture | static-svg | Student + N teachers; summary + spatial losses; PHI-S, MESA, angular-cone summary annotated | Multi-teacher distillation is foundation-model compression, not a pretext |
| 12 | DomainAdaptiveResults | static-svg | DiT PubLayNet/ICDAR/RVL-CDIP deltas + Medical 3D MAE Δ DSC | Domain-adaptive recipes work at scale |
| 13 | ADE20KCrossRecipe | static-svg | Bar chart of ADE20K mIoU by recipe family | Self-distillation + collapse fixes towers; multi-teacher competitive; MIM mid; AR / JEPA absent |
| 14 | OODEvidenceSummary | static-svg | Domains × strategies grid; cells = best published delta + paper, or "—" | No measured bake-off for construction documents |
| 15 | DecisionTree | static-svg | Branches: corpus scale → domain distance → task density; leaves = recipe pick + when-to-use | The deliverable |

## Resume here

Last touched: 2026-05-04.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | done (Gate 0 closed via Step-6 override after 4 codex runs; trajectory 8→4→3→2 STRUCTURAL) | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | in progress (draft outline + 15-figure table written; awaiting Vic approval before Gate 1) | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/ssl-pretraining-recipes/index.mdx` |
| 5. Implement figures | pending (table populated below) | per-figure table |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-04 | 0 (research) | structural-fixes-applied (run 1, 8 STRUCTURAL → fixes committed) | `notes/ssl-pretraining-recipes-codex-research-20260504.md` |
| 2026-05-04 | 0 (research, run 2) | structural-fixes-applied (4 STRUCTURAL + 1 COSMETIC → fixes committed) | `notes/ssl-pretraining-recipes-codex-research-20260504-run2.md` |
| 2026-05-04 | 0 (research, run 3) | structural-fixes-applied (3 STRUCTURAL + 2 COSMETIC; stale-prose cleanup → fixes committed) | `notes/ssl-pretraining-recipes-codex-research-20260504-run3.md` |
| 2026-05-04 | 0 (research, run 4) | Step-6-acceptance-override (2 STRUCTURAL + 1 COSMETIC; converging trajectory 8→4→3→2; small stale-prose contradictions of already-fixed rows, fixes applied; Vic-approved override per AskUserQuestion) | `notes/ssl-pretraining-recipes-codex-research-20260504-run4.md` |

### Phase 5 figure progress

Locked at end of Phase 3 (after Gate 1 acceptance).

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | ConstructionSheet | static-svg | TODO | — |
| 2 | DenseVsCLS | static-svg | TODO | — |
| 3 | OODCoverageMatrix | static-svg | TODO | — |
| 4 | MAEForwardPass | static-svg | TODO | — |
| 5 | MIMBlockRegime | plot | TODO | — |
| 6 | MIMTargetComparison | static-svg | TODO | — |
| 7 | DINOiBOTLossFlow | static-svg | TODO | — |
| 8 | RegistersGramFix | static-svg | TODO | — |
| 9 | JEPAvsMAE | static-svg | TODO | — |
| 10 | AIMPrefixLM | static-svg | TODO | — |
| 11 | RADIOArchitecture | static-svg | TODO | — |
| 12 | DomainAdaptiveResults | static-svg | TODO | — |
| 13 | ADE20KCrossRecipe | static-svg | TODO | — |
| 14 | OODEvidenceSummary | static-svg | TODO | — |
| 15 | DecisionTree | static-svg | TODO | — |

### Suggested next batch

1. **Vic reviews the outline + 15-figure table.** Iterate until locked. Specifically: confirm 16-section / 15-figure shape; confirm the merge of feature-prediction MIM + masked-token MIM into a single §6 (rather than two sections); confirm Fig 5 as `plot` (only non-static figure); confirm act 1 has 3 sections (some posts compress to 2). Throughline check: construction sheet visible in §1, §3, §4, §6, §7 (implicit), §8, §9, §11, §13, §15.
2. Vic to surface a representative construction sheet for Phase 5 figure work (floor plan or section detail; high enough resolution that Fig 1 / Fig 4 / Fig 6 / Fig 7 / Fig 9 can show patches at MAE-scale).
3. Run Gate 1 (codex on `## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + `## Outline` + figure table). Per the gate-runner cap, accept on cosmetic-only or apply STRUCTURAL fixes and re-run (cap = 3 invocations, with possible Step-6 override on the 4th).
4. After Gate 1 passes: lock per-figure types; advance to Phase 4 (draft prose).
5. Phase 4 first batch: §1 + §2 + §3 (Act 1) — three commits, voice-check between each.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/ssl-pretraining-recipes/index.mdx` for remaining placeholders. (No MDX yet — created in Phase 4.)
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the claim-source matrix with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness.
2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final).
5. **Static is the figure default.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle).
6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
7. **One section per commit, one figure per commit, one migration per commit.**
8. **Sentence-case headings.** Numbered sections (`### 1. ...`). Em-dashes (U+2014) forbidden in prose; permitted in act-divider headings (`## Act 1 — The problem`). En-dashes (U+2013) allowed everywhere — use for numeric/date ranges.
9. **`draft: false` from Phase 1 onward** (this is topic mode, not HTML-import).
10. **Project-memory pointer + MEMORY.md entry verified at end of Phase 1.** See project memory at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_ssl_pretraining_recipes_post.md` and the MEMORY.md index entry.
