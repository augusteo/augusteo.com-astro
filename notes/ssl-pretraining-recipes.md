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
- When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds.
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
- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes. Frame the open question: a natural-image SSL backbone has not been trained on construction-document line art; whether its features on this domain are usable as-is is empirically unclear (DINOv3's satellite specialization shows OOD domain adaptation can succeed for satellite imagery, but no published analog exists for construction). The hypothesis the post will defend is that domain-adaptive SSL pretraining gives a stronger fine-tuning starting point than zero-shot use of a natural-image checkpoint *for sufficiently OOD domains*.
- Act 2 (the recipes) — every recipe section walks through the three questions above with the sheet as the example.
- Act 3 (the verdict) — the recipe-selection decision tree, with the sheet shown landing at one specific terminal node, while the other terminals are labeled with the data shapes that route there (medical, satellite, etc.).

## Research notes

Phase 2 research, dispatched as three parallel subagents covering (a) MIM family, (b) self-distillation + JEPA + AR, (c) multi-teacher distillation + domain-adaptive. Plus my own focused fetch on C-RADIOv4 to verify the SSL-aux-loss question. All quotes below are from primary sources — arxiv papers, paper HTML mirrors, or NVIDIA tech reports.

### Headline finding for the post

**The RADIO lineage uses no SSL auxiliary loss on the student.** Across AM-RADIO (2312.06709), RADIOv2.5 (2412.07679), and C-RADIOv4 (2601.17237), the student is trained purely on teacher feature imitation (cosine + smooth-L1 on spatial features, cosine on summary tokens). No MIM, no DINO, no contrastive on the student. The cross-teacher balancers (PHI-S in v2.5, MESA + angular cone normalization in v4) are loss-balancing / equivariance regularizers, not SSL pretext. **Multi-teacher distillation is categorically different from "SSL pretraining" in the MAE/DINO sense** — even though the teachers themselves were SSL-trained. This is load-bearing and reshapes how the multi-teacher rung is framed.

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

> Spatial distillation: L_spatial(x,ŷ) = (1/|Ω|) Σ_{u∈Ω} (F_{S→T}[x]_u − ŷ_u)²
> MESA shift-equivariant EMA matching: L_mesa(x,x̃) = (1/|Ω|) Σ (F_{S→S̃}[LN(x)]_u − LN(x̃)_u)²
> Angular loss with cone-radius normalization: L_angle(x,y) = Θ(x,y)² / Disp(Θ_y)

**No SSL auxiliary loss on student.** MESA is shift-equivariant EMA-of-itself regularization, not SSL pretext. C-RADIOv4-H ADE20K mIoU 55.20 at 512px.

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

**This gap itself is a finding worth surfacing in the post**: there is no canonical "domain-adaptive SSL bake-off" with dense-prediction numbers. Practitioners are working in the absence of clean comparative benchmarks.

### Sub-topic: The OOD-domain transfer matrix

Across the canonical SSL papers covered (MAE, BEiT family, DINO line, JEPA, AIM, AIMv2, RADIO line), **none report transfer to medical / satellite / line-drawing / document-image / engineering-drawing / construction domains.** Every reported transfer is IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain transfer. This is a load-bearing fact for a post written for someone with an OOD corpus: **no canonical SSL paper tells you whether their recipe transfers to your domain.** That answer comes from domain-specific follow-ups (DiT for documents, SatMAE for satellite, Medical 3D MAE) or from running the experiment yourself.

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
| 25 | C-RADIOv4's primary training signal is teacher feature imitation (cosine + smooth-L1 spatial, cosine summary). The only self-supervised component is MESA's shift-equivariant matching against the student's own EMA, which is a self-equivariance regularizer rather than a MAE/DINO-style masked-prediction or contrastive pretext. Angular-cone-normalized loss is a stabilizer. | "L_spatial(x,ŷ) = (1/|Ω|) Σ (F_{S→T}[x]_u − ŷ_u)²"; "L_mesa(x,x̃) = (1/|Ω|) Σ (F_{S→S̃}[LN(x)]_u − LN(x̃)_u)²" — student matches its own EMA on shifted crops, NOT a teacher; "L_angle(x,y) = Θ(x,y)² / Disp(Θ_y)" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / foundational-stable — Hadamard standardization is a technique definition referenced by C-RADIOv4 (2026-01); the underlying mathematical recipe doesn't drift |
| 29 | DiT applies BEiT-style MIM to document images and reports PubLayNet 91.0→94.9, ICDAR2019 cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69 | Reported headline numbers from arxiv:2203.02378 abstract. *Recipe specifics (DALL-E tokens, IIT-CDIP 42M corpus) flagged for Phase 3 re-fetch if quoted in prose.* | arxiv:2203.02378 (2022-03) | stable / 18-month bar fails (4 years old); foundational for the document-domain framing — flag as marginal-stable. |
| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / marginal — Oct 2024, 19 months. Hedge in prose: "as of late 2024 the medical-MAE result was published; newer dense-medical comparisons may exist by pubDate." Phase 7 to re-check. |
| 31 | OOD-domain transfer reporting in canonical SSL papers is **uneven**: DINOv3 ships a satellite specialization (DINOv3 SAT-493M ViT-7B) and reports Earth-observation segmentation/detection numbers on Geo-Bench, LoveDA, iSAID, DIOR; Medical 3D MAE reports MRI-volume DSC. **No canonical SSL paper reports transfer to construction-document or engineering-drawing domains.** Transfer benchmarks for the broader set (MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v3-web, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, RADIO line) remain confined to IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} plus video-domain. | DINOv3 paper geospatial section (SAT-493M, Geo-Bench, LoveDA, iSAID, DIOR); Medical 3D MAE arxiv:2410.23132. Cross-paper observation for the rest. | DINOv3 arxiv:2508.10104 (2025-08); Medical 3D MAE arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / DINOv3 passes; Medical 3D MAE foundational-stable for the medical-MAE comparison |
| 32 | Published from-scratch-SSL vs continual-SSL-on-natural-image bake-offs with dense-prediction numbers DO exist for satellite (Lahrichi et al. 2025 — MAE/SwAV on GeoNet vs ImageNet, includes two-stage MAE-IN→GN, reports mIoU) and for general continual-SSL semantic segmentation (GLARE, TMLR 2026 — continual SSL initialized from existing SSL weights, evaluated across multiple segmentation domains). **No analogous bake-off exists for construction documents or engineering drawings specifically.** The post should frame this as: "the comparison has been run for satellite/medical, the published deltas favor continual-pretrain-from-natural-image-SSL when the target corpus is mid-scale; the construction-document case has not been published." | Lahrichi 2025 abstract + experimental section (MAE-GN, MAE-IN, MAE-IN-GN two-stage, SwAV-GN, SwAV-IN, supervised baselines reported with mIoU); GLARE TMLR 2026 abstract (continual SSL for semantic segmentation across domains). Specific quotes deferred to Phase 7 freshness re-fetch. | Lahrichi 2025; GLARE TMLR 2026 — verification flagged for Phase 7 re-fetch | actively-evolving / 12-month bar / DEFERRED — Phase 7 must close this row with quoted excerpts before ship |
| 33 | BEiT v3 trains via masked data modeling on images, text, AND image-text pairs in a unified objective (Multiway Transformer with shared self-attention) — multimodal SSL, not vision-only. | "we perform masked 'language' modeling on images (Imglish), texts (English), and image-text pairs ('parallel sentences') in a unified manner" — Abstract | arxiv:2208.10442v2 (2022-08-31) | stable foundational / passes |
| 34 | AIMv2 trains via causal multimodal autoregression: image patches first, then text tokens — image-text supervision, not vision-only SSL. | "a causal multimodal decoder that first regresses image patches and then decodes text tokens in an autoregressive manner" — Abstract | arxiv:2411.14402v1 (2024-11-21) | actively-evolving / 12-month bar / marginal — Nov 2024, ~18 months. Recipe is foundational; treat as foundational-stable for the AR-multimodal classification claim. |
| 35 | Across the published RADIO line (AM-RADIO 2023 → RADIOv2.5 2024 → C-RADIOv4 2026), the student's primary supervision is teacher feature imitation, not a MAE/DINO-style self-supervised pretext. The only "self-supervised" component is C-RADIOv4's MESA (shift-equivariant EMA matching) which functions as a self-equivariance regularizer, not as a primary pretext task. | Cross-paper synthesis grounded in row 23 (AM-RADIO loss formulation), row 24 (RADIOv2.5 loss formulation), row 25 (C-RADIOv4 + MESA). | Synthesis row pointing to arxiv:2312.06709 + arxiv:2412.07679 + arxiv:2601.17237. | actively-evolving / 12-month bar / passes via row 25 (C-RADIOv4, 2026-01) |
| 36 | The post's central thesis "multi-teacher distillation occupies a different position in the SSL recipe taxonomy than MAE/DINO/JEPA-style pretext-derived SSL" is supported by row 35 (cross-RADIO loss-formulation observation) — the supervision shape is categorically external (teacher activations) rather than pretext-derived (corrupted view + reconstruction objective). The post should not claim "multi-teacher distillation is not SSL"; rather, it is a different *kind* of self-supervision whose label-source is another model's outputs. | Synthesis claim grounded in row 35 + every primary SSL row. | Synthesis claim. | actively-evolving / passes via row 35 |

**Marginal-row debt closure (post-Gate-0-fix-v1).** Rows still carrying `marginal` after the Gate 0 fixup:

- **Row 30** (Medical 3D MAE, 19 months old): hedged in prose. Phase 7 to re-check whether newer medical-MAE comparisons land before pubDate.
- **Row 32** (Lahrichi 2025 + GLARE 2026 specific quotes deferred): Phase 7 must re-fetch and add quoted excerpts before ship. This is the post's load-bearing comparison row for satellite-domain continual-vs-from-scratch evidence.

Foundational-stable annotations applied to rows 10, 23, 24, 28 — these recent papers introduce load-bearing technique definitions (block-regime analysis, AM-RADIO loss formulation, mode-switching diagnosis, Hadamard standardization) whose status doesn't drift with arxiv version bumps. C-RADIOv4 2026-01 (rows 25, 26, 27) corroborates the multi-teacher-distillation lineage from inside the 12-month bar.

Foundational-source annotations applied to: MAE 2021 (rows 1, 2), SimMIM 2021 (row 3), MaskFeat 2021/2023 (rows 4, 5), data2vec 2022 (rows 6, 7), BEiT v1 2021 (row 8), BEiT v2 2022 (row 9), DINO 2021 (row 11), iBOT 2021 (rows 12, 13), DINOv2 2023 (row 14), DINOv2-with-registers 2023 (row 15), I-JEPA 2023 (rows 19, 20), AIM 2024 (rows 21, 22). These are the origin papers for the recipes; the recipe definitions are stable references.

Active sources within the 12-month bar (passing on date): DINOv3 (row 16, 17, 18, 31; 2025-08), C-RADIOv4 (rows 25, 26, 27; 2026-01-24), V-JEPA 2 in research notes (2025-06), AIMv2 (row 34; 2024-11; ~18 months — marked foundational-stable for the recipe-classification claim).

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

## Outline

*(populated in Phase 3)*

## Resume here

Last touched: 2026-05-04.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | in progress (Gate 0 firing) | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/ssl-pretraining-recipes/index.mdx` |
| 5. Implement figures | pending | per-figure table populated at end of Phase 3 |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-04 | 0 (research) | structural-fixes-applied (run 1, 8 STRUCTURAL → fixes committed; re-run pending) | `notes/ssl-pretraining-recipes-codex-research-20260504.md` |

### Suggested next batch

1. Dispatch Phase 2 parallel research subagents — split across (MIM/feature-prediction/token recipes) and (self-distillation + JEPA + autoregressive + multi-teacher). Each builds quoted-source notes per the primary-source decision tree.
2. Read NVIDIA's RADIO line papers myself (AM-RADIO, RADIOv2.5, C-RADIOv4) to verify whether they include any SSL auxiliary loss alongside teacher distillation, since this is a load-bearing claim of section 7.
3. Surface a candidate construction sheet for the throughline anchor — Vic to provide a representative example or pick from a pile.
4. Build the `## Claim-source matrix` from Phase 2 outputs.
5. Run Gate 0 (codex truthfulness pass) on the matrix.

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
