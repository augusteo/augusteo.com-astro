OpenAI Codex v0.125.0 (research preview)
--------
workdir: /Users/vic/dev/augusteo.com-astro
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: high
reasoning summaries: none
session id: 019df58b-16a0-7531-8a57-82b157abcef9
--------
user
IMPORTANT: Do NOT read or execute any files under `~/.claude/`, `~/.agents/`, or `.claude/skills/`. Those are skill definitions for a different AI system. Stay focused on repository code only.

You are reviewing the research notes and claim-source matrix for a long-form blog post on augusteo.com. The post's goal:

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

Your job is to attack the truthfulness layer before any prose is drafted. The matrix is the contract: every load-bearing claim the post will make has one row mapping the claim to a quoted excerpt from a primary source. If the matrix is wrong, the post is wrong.

The topic is classified as actively-evolving. The recency bar is therefore 12 months for primary sources backing load-bearing claims (with foundational-source exemptions where noted). Today is 2026-05-04.

Find:

1. FABRICATED OR HALLUCINATED QUOTES. For each row in the matrix, does the quoted excerpt actually appear at the cited URL/arxiv ID? If you can't verify it (no internet access, can't reach the source), flag it as unverifiable rather than verified.

2. MISATTRIBUTED SOURCES. For each row, when the quote is read in context, does it actually support the claim, or is it adjacent to but not stating the claim?

3. SECONDARY SOURCES MASQUERADING AS PRIMARY. Per the primary-source decision tree: papers, official docs, first-party postmortems, source code, reproducible benchmarks are primary. Third-party blogs, Wikipedia, news, tutorials, AI-generated content are NOT primary. Flag any matrix row whose source fails the tree.

4. STALE ROWS. For each row, compute recency: actively-evolving + source older than 12 months from 2026-05-04 = STALE; stable + source older than 18 months = STALE. Flag any STALE row that is not explicitly annotated with a "stable enough; <reason>" or foundational-exemption justification. Pay especially close attention to the rows already marked `marginal` — verify whether the closure plan at the end of the matrix actually closes them.

5. UNSUPPORTED LOAD-BEARING CLAIMS. Walk the `## Spec`, `## Throughline`, and the post's structural shape (recipe families to cover). For every load-bearing claim the post must make, is there a corresponding matrix row? Flag claims with no row. Specifically check: is there a row backing the post's central thesis that "multi-teacher distillation is categorically different from SSL pretraining in the MAE/DINO sense"? Is there a row backing the assertion that BEiT v3 was trained on multimodal data? Is there a row for AIMv2's image-text training claim?

6. OMITTED CONTRADICTING SOURCES. Are there primary sources that contradict the post's angle but were silently dropped from the matrix? In particular: are there published continual-SSL-on-natural-image-checkpoint vs from-scratch-SSL-on-domain comparisons that DO report dense-prediction numbers, that the matrix's row 32 claims do not exist?

7. SYNTHESIS-CLAIM RIGOR. Rows 31 and 32 are absence-of-evidence meta-claims. Are they defensible? An absence claim survives only if the search was sufficiently exhaustive. Flag if the synthesis is weaker than the matrix admits.

For each finding, label it STRUCTURAL (must fix before drafting) or COSMETIC (nice to have). Order findings by load-bearing-ness. Cite the specific matrix row number, claim text, or notes-section subheading you are challenging.

Do not be diplomatic. Do not validate. If the matrix is sound, say "no structural issues found" and stop. Otherwise, keep finding things.

Read the full notes file directly via filesystem at:
`/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md`

The file contains the full Spec, Throughline, Research notes (with quoted excerpts grouped by recipe family), and the 32-row Claim-source matrix. Verify every row by checking quotes against the actually-cited arxiv papers (use web fetch / your own primary-source access where possible).

Critical claims and rows to scrutinize most carefully:

- Row 23: AM-RADIO (arxiv:2312.06709) trains the student with **no SSL auxiliary loss** — entire signal is teacher feature imitation (cosine + smooth L1 spatial, cosine summary). This is THE load-bearing claim of the multi-teacher rung. Verify directly against the paper's loss section.
- Row 25: C-RADIOv4 (arxiv:2601.17237) same claim — no SSL aux loss, only teacher imitation + MESA + angular cone normalization. Verify.
- Row 24: RADIOv2.5 (arxiv:2412.07679) "mode-switching pathology" diagnosis — at ≤512² features look like DINOv2, at higher resolutions like SAM. Verify exact wording.
- Row 16: DINOv3 Gram anchoring loss formula `‖X_S X_S^⊤ − X_G X_G^⊤‖_F²`. Verify equation directly.
- Row 18: DINOv3 ViT-7B ADE20K mIoU 63.0 frozen backbone. Verify.
- Row 26: C-RADIOv4-H ADE20K mIoU 55.20 at 512px. Verify.
- Rows 31, 32: synthesis claims about absence of OOD-domain transfer reporting and absence of canonical from-scratch-vs-continual-SSL bake-off study with dense-pred numbers. Both are absence-of-evidence claims — challenge if you find counter-evidence.

Topic-evolution classification: actively-evolving (12-month bar from pubDate 2026-05-04). Source dates older than 2025-05-04 are STALE for actively-evolving claims unless foundational-exempted.

Marginal-row debt notes from the matrix author (rows 14, 15, 21, 22, 23, 29) and the closure plan are at the end of the matrix section — verify whether each closure plan is actually defensible.

codex
I’ll first read the local notes and the relevant memory index, then I’ll verify the matrix rows against primary sources only. I’ll keep the review focused on structural truth issues, not prose polish.
exec
/bin/zsh -lc "wc -l notes/ssl-pretraining-recipes.md && sed -n '1,260p' notes/ssl-pretraining-recipes.md" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
     430 notes/ssl-pretraining-recipes.md
# Self-supervised pretraining when your data isn't natural images

## Spec

**Slug:** `ssl-pretraining-recipes`
**Working title:** "Self-supervised pretraining when your data isn't natural images"
**Standalone post** (not a sequel to the vision trilogy, though it touches the same backbone landscape).
**Topic-evolution classification:** actively-evolving — 12-month freshness bar applies. DINOv3 (Aug 2025), V-JEPA 2 (2025), C-RADIOv4 (Jan 2026), and ongoing JEPA / multi-teacher work all fall inside the bar.

**One-paragraph summary.** A taxonomy of self-supervised pretraining recipes for vision backbones, organized around one practitioner-centric question: you have a large unlabeled corpus in a domain that DINOv3 / MAE / C-RADIOv4 have never seen — construction documents, medical scans, satellite imagery, scanned reports, line drawings — and a small labeled set for downstream **dense prediction (semantic + instance segmentation primary; detection secondary; layout/classification tertiary)**. Which SSL recipe gives the best fine-tuning starting point on that domain, and is it better to train from scratch, continue-pretrain on top of a natural-image checkpoint, or run a hybrid? The post walks through seven recipe families, evaluates each against the dense-feature-quality lens, and closes with a recipe-selection decision tree gated on (corpus scale × domain distance from natural images × downstream task density). The motivating use case in the throughline is construction documents at a scale of several hundred thousand unlabeled + 10–20k labeled, but the decision tree generalizes.

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
- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes, explain why a natural-image SSL backbone produces low-signal features on this kind of data.
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


exec
/bin/zsh -lc 'rg -n "ssl-pretraining|multi-gpu-training|augusteo.com-astro|DINOv3|RADIO|AM-RADIO|C-RADIO|BEiT|AIMv2" /Users/vic/.codex/memories/MEMORY.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
13:- how-to-look-inside-a-vision-model.html, vision interpretability, verify article, April 2026, DINOv3, register tokens, Grad-CAM, Chefer, occlusion, RISE, linear probe, sparse autoencoders, PCA-as-RGB, pytorch-grad-cam, tidy, xmllint
88:# Task Group: /Users/vic/dev/augusteo.com-astro multi-gpu-training factual review and figure UX fixes
89:scope: reviewing and then correcting the Astro blog's `multi-gpu-training` post plus its interactive figures when the user wants factual grounding, source-backed fixes, and intuitive looping figure behavior
90:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout's blog/figure paths and similar Astro content-plus-figure tasks, but re-verify ML/hardware claims against current primary sources
92:## Task 1: Review multi-gpu-training post and figures for factual grounding, issues found
96:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, review found stale and overstated claims before the fix pass)
100:- Astro, MDX, Svelte, multi-gpu-training, factual audit, deep research, DeepSeek-V3, Llama 3 405B, FSDP2, DTensor, NCCL, FP8, GB300, H200, decision-calculator.ts, memory-bar.ts, moe-routing.ts
106:- rollout_summaries/2026-04-25T23-31-06-iNyx-multi_gpu_training_factual_review_and_figure_fixes.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-31-06-019dc6fb-8980-7271-a9e2-d3ffd1e1fc71.jsonl, updated_at=2026-04-26T20:06:05+00:00, thread_id=019dc6fb-8980-7271-a9e2-d3ffd1e1fc71, content corrections plus looping scrubber and figure UX fixes)
122:- the truth-sensitive edit surfaces for this post family are `src/content/blog/multi-gpu-training/index.mdx`, interactive logic under `src/figures/multi-gpu-training/`, and visual components under `src/components/figures/multi-gpu-training/` [Task 1][Task 2]
124:- local verification path is `bun run astro -- dev --host 127.0.0.1 --port 4321`, then inspect `/blog/multi-gpu-training`; a plain localhost `curl` can fail until the server is actually running and listening [Task 1]
138:# Task Group: /Users/vic/dev/augusteo.com-astro Codex instruction symlink
140:applies_to: cwd=/Users/vic/dev/augusteo.com-astro; reuse_rule=safe for this checkout and similar repos that already have a root `CLAUDE.md`; prefer re-checking repo instruction layout before reusing
146:- rollout_summaries/2026-04-25T23-17-05-SHdj-codex_config_symlink_agents_to_claude.md (cwd=/Users/vic/dev/augusteo.com-astro, rollout_path=/Users/vic/.codex/sessions/2026/04/25/rollout-2026-04-25T16-17-05-019dc6ee-b179-7612-9a15-da18473c6e35.jsonl, updated_at=2026-04-25T23:20:20+00:00, thread_id=019dc6ee-b179-7612-9a15-da18473c6e35, committed on `main`)
167:- symptom: `git add` or `git commit` fails with `fatal: Unable to create '/Users/vic/dev/augusteo.com-astro/.git/index.lock': Operation not permitted` -> cause: git lockfile creation was blocked in that environment -> fix: retry in an environment with sufficient filesystem permissions instead of assuming the repo state is broken [Task 1]

codex
The notes file is 430 lines. I’ve got the Spec/Throughline and early research notes loaded; next I’m reading the matrix itself and the marginal-row closure notes so I can tie findings to row numbers precisely.
exec
/bin/zsh -lc "sed -n '261,520p' notes/ssl-pretraining-recipes.md" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
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
| 10 | MIM-Refiner identifies the three-block-regime structure of MIM-pretrained encoders: early=general, middle=abstractions (k-NN peaks), late=reconstruction-prep (k-NN drops) | "1. In early ViT blocks, general purpose features are learned... 2. In middle ViT blocks, abstractions are formed... 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases" | arxiv:2402.10093v4 (2025-02-20) | actively-evolving / 12-month bar / passes |
| 11 | DINO observed that self-supervised ViT features carry explicit segmentation information that doesn't emerge in supervised ViTs or convnets | "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets" | arxiv:2104.14294v2 (2021-05-24) | stable foundational / passes |
| 12 | iBOT uses the teacher network as an online tokenizer for masked-patch prediction, dispensing with a pretrained tokenizer | "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand" | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
| 13 | iBOT achieves ADE20K mIoU 50.0 with UperNet at ViT-B/16 | "iBOT advances previous best methods DINO by 3.2 on mIoU with UperNet" — paper Table 5 | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
| 14 | DINOv2's loss combines DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on a curated 142M-image dataset (LVD-142M) | "DINO loss... iBOT loss... KoLeo regularizer... [we] replace the teacher softmax-centering step of DINO and iBot by the Sinkhorn-Knopp (SK) batch normalization" + LVD-142M curation pipeline | arxiv:2304.07193v2 (2024-02-02) | actively-evolving / 12-month bar / marginal — paper v2 is Feb 2024, ~15 months at pubDate 2026-05-04. Hedge or upgrade: stable foundational for the loss-composition claim. |
| 15 | DINOv2 has high-norm token artifacts (~10× higher norm, ~2% of tokens) appearing in low-information background regions; registers fix them with <2% FLOP overhead | "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)"; "we explicitly add new tokens to the sequence, that the model can learn to use as registers... <2% FLOP increase" | arxiv:2309.16588v2 (2024-04-12) | actively-evolving / 12-month bar / marginal — v2 is Apr 2024, ~13 months. Hedge or treat as foundational. |
| 16 | DINOv3 introduces Gram anchoring as a regularizer on patch–patch similarity geometry: ℒ_Gram = ‖X_S X_S⊤ − X_G X_G⊤‖_F² | Body of paper, refinement-phase loss. | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 17 | Without Gram anchoring, long DINO/iBOT training shows patch-feature locality decay (cosine sim between CLS and patches grows) | "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 18 | DINOv3 ViT-7B achieves ADE20K mIoU 63.0 with frozen backbone | "ADE20K segmentation (frozen backbone): mIoU 63.0" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
| 19 | I-JEPA predicts in latent space (target encoder = EMA of context encoder), not pixel/token space; pixel-space prediction empirically degrades linear probe | "by predicting in representation space, I-JEPA produces semantic representations while using less compute"; "predicting in pixel-space leads to a significant degradation in the linear probing performance" | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
| 20 | I-JEPA does not report ADE20K mIoU; transfer benchmarks are classification + Clevr-Count/Dist | Body of paper. | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
| 21 | AIM uses prefix-LM (sampled prefix length S, bidirectional within prefix, AR loss on rest) with normalized-pixel L2 target | "we uniformly sample a prefix length S. The attention for the first S patches are set to be bidirectional and loss is only computed for the remaining patches" + L2 loss on normalized pixels | arxiv:2401.08541 (2024-01-16) | actively-evolving / 12-month bar / marginal — Jan 2024, ~16 months. Recipe is foundational; hedge if quoting recent claims. |
| 22 | AIM does not report ADE20K, COCO, or depth transfer numbers (classification-only) | Body of paper; 15 classification benchmarks evaluated, no dense-prediction numbers | arxiv:2401.08541 (2024-01-16) | actively-evolving / 12-month bar / marginal — same as 21 |
| 23 | AM-RADIO student is trained with no SSL auxiliary loss; the entire signal is teacher feature imitation (cosine + smooth L1 on spatial, cosine on summary) | "L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))"; "L_features... L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1" — and no SSL pretext mentioned | arxiv:2312.06709v3 (2023-12, CVPR 2024) | actively-evolving / 12-month bar / marginal — Dec 2023, ~17 months. **Crucial claim; needs strengthening — see Phase 7 freshness re-check or pull a more recent direct read.** |
| 24 | RADIOv2.5 diagnoses the "mode-switching" pathology where features behave like DINOv2 at ≤512² and like SAM at higher resolutions | "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM"; "in the high-resolution regime the student only sees SAM features" | arxiv:2412.07679v2 (2024-12, CVPR 2025) | actively-evolving / 12-month bar / passes |
| 25 | C-RADIOv4 trains the student via teacher feature imitation with no SSL auxiliary loss; introduces MESA (shift-equivariant EMA matching) and angular-cone-normalized loss as stabilizers | "L_spatial(x,ŷ) = (1/|Ω|) Σ (F_{S→T}[x]_u − ŷ_u)²"; "L_mesa(x,x̃) = (1/|Ω|) Σ (F_{S→S̃}[LN(x)]_u − LN(x̃)_u)²"; "L_angle(x,y) = Θ(x,y)² / Disp(Θ_y)" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / passes |
| 29 | DiT applies BEiT-style MIM to document images and reports PubLayNet 91.0→94.9, ICDAR2019 cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69 | Reported headline numbers from arxiv:2203.02378 abstract. *Recipe specifics (DALL-E tokens, IIT-CDIP 42M corpus) flagged for Phase 3 re-fetch if quoted in prose.* | arxiv:2203.02378 (2022-03) | stable / 18-month bar fails (4 years old); foundational for the document-domain framing — flag as marginal-stable. |
| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / passes |
| 31 | No canonical SSL paper in the dataset reports OOD-domain transfer (medical/satellite/document/line-drawing/construction); transfer benchmarks are exclusively IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain. | Cross-paper observation across MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v3, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, RADIO line. | Synthesis claim — backed by the absence of OOD-transfer tables in all cited papers. | meta-claim / passes (absence-of-evidence kind; Gate 0 will scrutinize) |
| 32 | The published literature does not contain a canonical bake-off comparing (a) from-scratch SSL on a new domain, (b) continual SSL on a natural-image checkpoint, and (c) zero-shot fine-tune from a natural-image checkpoint with dense-prediction numbers | Synthesis claim from the domain-adaptive SSL sub-topic above. Pointer-only sources surfaced (arxiv:2503.02844, arxiv:2410.18677, arxiv:2502.18056); none report all three corners with dense-pred numbers. | Synthesis claim. | meta-claim / passes (absence-of-evidence; Gate 0 will scrutinize) |

**Marginal-row debt to close before Gate 0 acceptance:** rows 14, 15, 21, 22, 23, 29 carry `marginal` recency status. Closure plan:
- Row 23 (AM-RADIO no-SSL-aux claim): the most load-bearing marginal. Close by re-reading AM-RADIO §3 directly before Gate 0 fires, OR by hedging the prose to "in the published RADIO line — AM-RADIO 2023 through C-RADIOv4 2026 — no SSL auxiliary loss is added to the student" which the v4 evidence (row 25) supports as recent.
- Rows 14, 15: DINOv2 + registers loss claims. Treat as foundational (loss compositions don't change with paper revisions); upgrade recency status to "stable foundational / passes" with annotation.
- Rows 21, 22: AIM recipe claims. Same — recipe is fixed by the paper; treat as stable foundational.
- Row 29: DiT 2022. Closure: hedge the prose to "DiT 2022, the canonical document-domain MIM recipe at the time of writing." Row stays marginal-stable but the claim survives Gate 0.

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

*(no gates fired yet)*

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

exec
/bin/zsh -lc "nl -ba notes/ssl-pretraining-recipes.md | sed -n '1,460p'" in /Users/vic/dev/augusteo.com-astro
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
    10	**One-paragraph summary.** A taxonomy of self-supervised pretraining recipes for vision backbones, organized around one practitioner-centric question: you have a large unlabeled corpus in a domain that DINOv3 / MAE / C-RADIOv4 have never seen — construction documents, medical scans, satellite imagery, scanned reports, line drawings — and a small labeled set for downstream **dense prediction (semantic + instance segmentation primary; detection secondary; layout/classification tertiary)**. Which SSL recipe gives the best fine-tuning starting point on that domain, and is it better to train from scratch, continue-pretrain on top of a natural-image checkpoint, or run a hybrid? The post walks through seven recipe families, evaluates each against the dense-feature-quality lens, and closes with a recipe-selection decision tree gated on (corpus scale × domain distance from natural images × downstream task density). The motivating use case in the throughline is construction documents at a scale of several hundred thousand unlabeled + 10–20k labeled, but the decision tree generalizes.
    11	
    12	**Reader walks away knowing:**
    13	
    14	- The seven SSL recipe families and how each generates its training signal.
    15	- Why dense-feature quality is the load-bearing axis for segmentation downstreams (the "dense-feature collapse" failure mode generalized to recipe selection).
    16	- When continual-pretrain-from-DINOv3 beats from-scratch SSL, and when the inverse holds.
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
    51	- Act 1 (the problem) — introduce the sheet, name the dense-feature-quality requirement segmentation imposes, explain why a natural-image SSL backbone produces low-signal features on this kind of data.
    52	- Act 2 (the recipes) — every recipe section walks through the three questions above with the sheet as the example.
    53	- Act 3 (the verdict) — the recipe-selection decision tree, with the sheet shown landing at one specific terminal node, while the other terminals are labeled with the data shapes that route there (medical, satellite, etc.).
    54	
    55	## Research notes
    56	
    57	Phase 2 research, dispatched as three parallel subagents covering (a) MIM family, (b) self-distillation + JEPA + AR, (c) multi-teacher distillation + domain-adaptive. Plus my own focused fetch on C-RADIOv4 to verify the SSL-aux-loss question. All quotes below are from primary sources — arxiv papers, paper HTML mirrors, or NVIDIA tech reports.
    58	
    59	### Headline finding for the post
    60	
    61	**The RADIO lineage uses no SSL auxiliary loss on the student.** Across AM-RADIO (2312.06709), RADIOv2.5 (2412.07679), and C-RADIOv4 (2601.17237), the student is trained purely on teacher feature imitation (cosine + smooth-L1 on spatial features, cosine on summary tokens). No MIM, no DINO, no contrastive on the student. The cross-teacher balancers (PHI-S in v2.5, MESA + angular cone normalization in v4) are loss-balancing / equivariance regularizers, not SSL pretext. **Multi-teacher distillation is categorically different from "SSL pretraining" in the MAE/DINO sense** — even though the teachers themselves were SSL-trained. This is load-bearing and reshapes how the multi-teacher rung is framed.
    62	
    63	### Sub-topic: Pixel-reconstruction MIM
    64	
    65	**MAE** (arxiv:2111.06377v3, 2021-12-19; v1 2021-11-11). He et al., FAIR.
    66	
    67	> "It is based on two core designs. First, we develop an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens), along with a lightweight decoder that reconstructs the original image from the latent representation and mask tokens. Second, we find that masking a high proportion of the input image, e.g., 75%, yields a nontrivial and meaningful self-supervisory task." — Abstract.
    68	
    69	> "Our loss function computes the mean squared error (MSE) between the reconstructed and original images in the pixel space. We compute the loss only on masked patches, similar to BERT." — §3, Reconstruction target.
    70	
    71	ADE20K mIoU (UperNet, IN1K-pretrained): ViT-B 48.1; ViT-L 53.6 (Table 5). COCO Mask R-CNN: ViT-B AP^box 50.3 / AP^mask 44.9; ViT-L AP^box 53.3 / AP^mask 47.2 (Table 4).
    72	
    73	Limitation acknowledged in §6: "Images are merely recorded light without a semantic decomposition into the visual analogue of words. Instead of attempting to remove objects, we remove random patches that most likely do *not* form a semantic segment. Likewise, our MAE reconstructs pixels, which are *not* semantic entities."
    74	
    75	**SimMIM** (arxiv:2111.09886v1, 2021-11-18). Xie et al., MSRA.
    76	
    77	> "1) random masking of the input image with a moderately large masked patch size (e.g., 32) makes a strong pre-text task; 2) predicting raw pixels of RGB values by direct regression performs no worse than the patch classification approaches with complex designs; 3) the prediction head can be as light as a linear layer, with no worse performance than heavier ones." — Abstract.
    78	
    79	> "We adopt a masking ratio of 0.6 on patch size of 32 by default, due to its stable performance." — §4.1.2.
    80	
    81	> "The effects to other more fine-grained down-stream tasks such as object detection or semantic segmentation will be explored in our future study." — §4.1.4. *SimMIM defers ViT-scale dense-prediction transfer.*
    82	
    83	The paper's headline 59.9 mIoU on ADE20K is from **SwinV2-G 3B-parameter co-trained variant**, not standalone SimMIM ViT-B/L.
    84	
    85	**MIM-Refiner** (arxiv:2402.10093v4, 2025-02-20, ICLR 2025). Alkin et al.
    86	
    87	The block-regime analysis is the cleanest published explanation of why off-the-shelf MAE features underperform on dense tasks:
    88	
    89	> "1. In early ViT blocks, general purpose features are learned, which improve the reconstruction loss and the k-NN accuracy simultaneously. 2. In middle ViT blocks, abstractions are formed. The reconstruction loss improves only slightly, while the k-NN accuracy improves drastically. 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases." — §2.
    90	
    91	> "As models increase in size, the decoder eventually reaches a point where it cannot further improve the pre-training objective on its own. Consequently, it begins to delegate a portion of the reconstruction task back to the last encoder blocks. This transfer adversely affects the feature quality for downstream tasks associated with those blocks." — §2.
    92	
    93	ADE20K linear probe: MAE-Refined ViT-L/16 37.3, MAE-Refined ViT-H/14 39.4, MAE-Refined ViT-2B/14 40.3 (Table 4). Full UperNet ADE20K: D2V2 ViT-L/16 54.4 (Table 5).
    94	
    95	### Sub-topic: Feature-prediction MIM
    96	
    97	**MaskFeat** (arxiv:2112.09133v2, 2023-01-12; v1 2021-12-16). Wei et al., FAIR. *Closest hit to the user's "MEP" term.*
    98	
    99	> "We present Masked Feature Prediction (MaskFeat) for self-supervised pre-training of video models... We study five different types of features and find Histograms of Oriented Gradients (HOG), a hand-crafted feature descriptor, works particularly well in terms of both performance and efficiency." — Abstract.
   100	
   101	> "(ii) The discretization (tokenization) of visual signals is not necessary for masked visual prediction, and continuous *feature regression* (i.e. MaskFeat) can work well." — §1.
   102	
   103	> "(iii) Semantic knowledge from human annotations is not always helpful for MaskFeat, but characterizing local patterns seems important. For example, predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance." — §1.
   104	
   105	**No image dense-prediction transfer is reported by the paper.** Image transfer is ImageNet classification only (ViT-B 84.0 / ViT-L 85.7 at 1600 epochs). Headline numbers are video (Kinetics-400 86.7%, AVA action detection 39.8 mAP).
   106	
   107	**data2vec** (arxiv:2202.03555v3, 2022-10-25). Baevski et al., FAIR.
   108	
   109	> "The core idea is to predict latent representations of the full input data based on a masked view of the input in a self-distillation setup using a standard Transformer architecture. Instead of predicting modality-specific targets such as words, visual tokens or units of human speech which are local in nature, data2vec predicts contextualized latent representations that contain information from the entire input." — Abstract.
   110	
   111	Loss: Smooth L1 on the average of the top K teacher-network FFN block outputs at masked positions, where the teacher is an EMA of the student. ImageNet ViT-B 84.2, ViT-L 86.6 (Table 1). **No image dense-prediction transfer reported.**
   112	
   113	> "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low which leads to student model collapse and is then propagated to the teacher. Third, we found collapse to be more likely for modalities where adjacent targets are very correlated and where longer spans need to be masked, e.g., speech." — §6.
   114	
   115	**data2vec 2.0** (arxiv:2212.07525v2, 2023-06-15). Same family, efficiency-focused. ImageNet ViT-L 86.8 in 16.4× lower training time than MAE. **No dense-prediction transfer reported.**
   116	
   117	### Sub-topic: Masked-token MIM
   118	
   119	**BEiT v1** (arxiv:2106.08254v2, 2022-09-03; v1 2021-06-15). Bao et al., MSRA.
   120	
   121	> "We first 'tokenize' the original image into visual tokens. Then we randomly mask some image patches and fed them into the backbone Transformer. The pre-training objective is to recover the original visual tokens based on the corrupted image patches." — Abstract.
   122	
   123	Tokenizer = DALL-E's pretrained dVAE (vocabulary 8192). Block-wise masking, 40% mask ratio. ADE20K SETR-PUP: ViT-B 45.6, ViT-B with intermediate fine-tuning 47.7 (Table 3).
   124	
   125	Ablation (Table 4): predicting pixels with the BEiT recipe drops ADE20K 44.65 → 41.38, supporting "tokens > pixels" *when other recipe choices favor tokens*.
   126	
   127	**BEiT v2** (arxiv:2208.06366v2, 2022-10-03). Peng et al.
   128	
   129	VQ-KD tokenizer trained by knowledge-distilling CLIP features. ADE20K UperNet ViT-B 53.1 (1600 epochs), ViT-L 56.7 (1600 epochs) — paper's main strength is dense prediction.
   130	
   131	> "After quantizing the image to visual tokens, we feed the ℓ₂-normalized codebook embeddings to the decoder... The output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP. During training, we maximize the cosine similarity between the decoder output o_i and the teacher guidance t_i." — §2.2.
   132	
   133	Crucial: BEiT v2's tokenizer is itself distilled from CLIP, so BEiT v2 inherits CLIP's web-pretraining (often glossed in headline comparisons).
   134	
   135	**BEiT v3** (arxiv:2208.10442v2, 2022-08-31). Multiway transformer with shared self-attention, masked modeling on images, text, and image-text pairs.
   136	
   137	ADE20K mIoU 62.8 (Mask2Former + IN-21K intermediate fine-tuning). COCO box AP 63.7, mask AP 54.8 (Table 1). *Caveat: numbers use heavier task heads than MAE/BEiT v2 standards.*
   138	
   139	### Sub-topic: Self-distillation lineage
   140	
   141	**DINO** (arxiv:2104.14294v2, 2021-05-24). Caron et al., FAIR.
   142	
   143	> "Our study... underlines the importance of momentum encoder, multi-crop training, and the use of small patches with ViTs." — Abstract.
   144	
   145	> "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets." — Abstract. *This emergent-segmentation observation is the seed for treating the DINO line as the dense-feature SSL family.*
   146	
   147	ImageNet ViT-Base linear 80.1%, k-NN 78.3% (small ViT).
   148	
   149	**iBOT** (arxiv:2111.07832v3, 2022-01-27). Zhou et al.
   150	
   151	> "we perform self-distillation on masked patch tokens and take the teacher network as the online tokenizer, along with self-distillation on the class token to acquire visual semantics." — Abstract.
   152	
   153	> "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand." — Abstract.
   154	
   155	ADE20K: 38.3 (linear) / 50.0 (UperNet, ViT-B/16). COCO Cascade Mask R-CNN ViT-B/16: AP^b 51.2 / AP^m 44.2.
   156	
   157	**DINOv2** (arxiv:2304.07193v2, 2024-02-02). Oquab et al., Meta.
   158	
   159	Loss = DINO + iBOT + KoLeo regularizer (uniform feature span via Kozachenko-Leonenko entropy estimator) + Sinkhorn-Knopp centering (replaces DINO/iBOT softmax-centering). Heads untied between DINO and iBOT objectives.
   160	
   161	Dataset: LVD-142M built via deduplication and inverted-file-index retrieval from a 1.2B-image pile. ViT-g (1.1B params) distilled into smaller students.
   162	
   163	ADE20K linear ViT-g: 49.0 (single-scale), 53.0 (multi-scale).
   164	
   165	**DINOv2 with registers** (arxiv:2309.16588v2, 2024-04-12). Darcet et al.
   166	
   167	> "artifacts in feature maps of both supervised and self-supervised ViT networks. The artifacts correspond to high-norm tokens appearing during inference primarily in low-informative background areas of images, that are repurposed for internal computations." — Abstract.
   168	
   169	> "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)." — Quantification.
   170	
   171	> Artifacts emerge "after one third of training" and "only the three largest models exhibit outliers." All affected: DeiT-III (supervised), OpenCLIP (text-supervised), DINOv2 (self-supervised). Original DINO does not show them.
   172	
   173	Fix: 4 register tokens added after patch embedding, discarded at output. <2% FLOP increase. ADE20K linear DINOv2: 46.6 → 47.9 with registers. Object discovery (LOST corloc on VOC2007): 35.3 → 55.4 (+20.1).
   174	
   175	**DINOv3** (arxiv:2508.10104, 2025-08). Meta. **Critical entry — Gram anchoring is load-bearing for the post.**
   176	
   177	Failure mode that motivated Gram anchoring:
   178	
   179	> "a notable decline in performance on dense prediction tasks" during long training. Diagnosis: "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes."
   180	
   181	Gram anchoring loss:
   182	
   183	> ℒ_Gram = ‖X_S · X_S^⊤ − X_G · X_G^⊤‖_F²
   184	
   185	> "Compares the Gram matrix (all pairwise dot products) of student patch features against those from an earlier model, referred to as the Gram teacher... local features [are allowed] to move, provided the structure of similarities remains the same."
   186	
   187	Refinement-phase combined loss: ℒ_Ref = w_D · ℒ_DINO + ℒ_iBOT + w_DK · ℒ_DKoleo + w_Gram · ℒ_Gram.
   188	
   189	Dataset: LVD-1689M (≈1.7B images) via hierarchical k-means with balanced sampling, mixed with ImageNet-1k as 10% of batches. Largest model: ViT-7B (6.7B params) distilled into ViT-S/B/L students. ADE20K segmentation frozen backbone: **63.0 mIoU**. NYU depth RMSE: 0.281 (high-res Gram anchoring).
   190	
   191	### Sub-topic: JEPA family
   192	
   193	**I-JEPA** (arxiv:2301.08243v3, 2023-04-13). Assran et al., Meta.
   194	
   195	Architecture: context encoder θ (gradient), predictor ϕ (gradient), target encoder θ̄ (EMA of θ). Same image, different blocks. The predictor maps from context features to target features at given spatial positions.
   196	
   197	> "JEPAs do not seek representations invariant to a set of hand-crafted data augmentations, but instead seek representations that are predictive of each other." — vs DINO's invariance-to-augmentations bias.
   198	
   199	> "Compared to generative methods that predict in pixel/token space, I-JEPA makes use of abstract prediction targets for which unnecessary pixel-level details are potentially eliminated."
   200	
   201	> "predicting in pixel-space leads to a significant degradation in the linear probing performance." — empirical confirmation of the latent-space-is-better argument.
   202	
   203	> "a huge I-JEPA model (ViT-H/14) requires less compute than a small iBOT model (ViT-S/16)."
   204	
   205	ImageNet linear ViT-H/14 79.3%, ViT-H/16₄₄₈ 81.1%. Clevr/Count 86.7, Clevr/Dist 72.4 (vs DINO ViT-B/8 53.4, iBOT ViT-L/16 62.8). **No ADE20K mIoU reported.**
   206	
   207	**V-JEPA** (arxiv:2404.08471v1, 2024-02-15). Bardes et al., Meta. Spatiotemporal feature prediction on video. Kinetics-400 81.9%, SSv2 72.2%, ImageNet 77.9% from video-only pretraining. **No image dense-prediction transfer reported.**
   208	
   209	**V-JEPA 2** (arxiv:2506.09985v1, 2025-06-11). Two-phase: phase 1 mask-denoising feature prediction on VideoMix22M (22M samples / >1M hours) + 1M ImageNet; phase 2 action-conditioned post-training on 62 hours of robot videos. ViT-L 300M, ViT-H 600M, ViT-g 1B. ImageNet attentive probe ViT-g384 85.1%. **No image dense-prediction transfer reported.**
   210	
   211	### Sub-topic: Autoregressive image pretraining
   212	
   213	**iGPT** (Chen et al., ICML 2020). No arxiv ID; cite proceedings.mlr.press/v119/chen20s. Sequence Transformer trained AR on pixels, no 2D inductive bias. Trained at 32²/48²/64² resolutions due to sequence-length cost. iGPT-L 1.4B params, ImageNet linear ~72% (best-layer), CIFAR-10 linear 96.3%. **No dense-prediction transfer.**
   214	
   215	**AIM** (arxiv:2401.08541, 2024-01-16). El-Nouby et al., Apple.
   216	
   217	Prefix LM (not pure causal). Pixel target (normalized per-patch L2). Loss: min_θ (1/K) Σ ‖x̂_k(θ) − x_k‖₂².
   218	
   219	> "performance of the visual features scale with both the model capacity and the quantity of data" + "the value of the objective function correlates with the performance of the model on downstream tasks." — paper's main claim: pretraining loss is a usable proxy for downstream quality, like LLMs.
   220	
   221	Frozen attentive probe IN-1k: AIM-7B 82.4%, AIM-7B† (layer 20) 84.0%. **No ADE20K, COCO, or depth numbers.** AIM is a scaling-laws paper for *classification*, not dense prediction.
   222	
   223	**AIMv2** (arxiv:2411.14402v1, 2024-11-21). Multimodal causal AR (image patches then text tokens). AIMv2-3B@448 IN-1k 89.5%. Open-vocab COCO det 60.2 AP (vs DINOv2 60.1). **No dense semantic seg reported in body.**
   224	
   225	### Sub-topic: Multi-teacher distillation as pretraining
   226	
   227	**AM-RADIO** (arxiv:2312.06709v3, 2023-12, CVPR 2024). Ranzinger et al., NVIDIA.
   228	
   229	Loss formulation (no SSL on student):
   230	
   231	> Summary: L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))
   232	> Spatial: L_features(x) = Σ_i γ_i L_match(h_i^(v)(x'|Θ_i^(v)), t_i^(v)(x|Φ_i^(v)))
   233	> L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1
   234	
   235	Teachers (best published RADIOv1 config): DFN CLIP ViT-H/14, OpenAI CLIP ViT-L/14, DINOv2 ViT-g/14. SAM ViTDet-H in ablations.
   236	
   237	ADE20K mIoU (linear probe) RADIO-ViT-H/14: 50.32. COCO inst-seg as drop-in SAM replacement: 75.17–75.42.
   238	
   239	**RADIOv2.5** (arxiv:2412.07679v2, 2024-12, CVPR 2025). Heinrich, Ranzinger et al.
   240	
   241	Mode-switching pathology (load-bearing):
   242	
   243	> "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM." — §3.1.
   244	
   245	> Cause: "in the high-resolution regime the student only sees SAM features."
   246	
   247	Loss: L = Σ_t λ_t L_t, L_t = ℓ_s(ẑ_s^(t), z_s^(t)) + Σ_{i=1}^N ℓ_p(ẑ_p^(t,i), z_p^(t,i)). **No SSL auxiliary loss.** ADE20K mIoU: B 48.94, L 52.95, H 53.97, g 54.56 (Table 8).
   248	
   249	**C-RADIOv4** (arxiv:2601.17237v1, 2026-01-24). NVIDIA.
   250	
   251	Teachers: SigLIP2, DINOv3, SAM3 (paper-confirmed; specific variants like "SigLIP2-g-384, DINOv3-7B" appear in research summaries but my abstract-only WebFetch could not verify the variant suffixes — Phase 7 freshness pass should re-confirm).
   252	
   253	Loss formulation:
   254	
   255	> Spatial distillation: L_spatial(x,ŷ) = (1/|Ω|) Σ_{u∈Ω} (F_{S→T}[x]_u − ŷ_u)²
   256	> MESA shift-equivariant EMA matching: L_mesa(x,x̃) = (1/|Ω|) Σ (F_{S→S̃}[LN(x)]_u − LN(x̃)_u)²
   257	> Angular loss with cone-radius normalization: L_angle(x,y) = Θ(x,y)² / Disp(Θ_y)
   258	
   259	**No SSL auxiliary loss on student.** MESA is shift-equivariant EMA-of-itself regularization, not SSL pretext. C-RADIOv4-H ADE20K mIoU 55.20 at 512px.
   260	
   261	**PHI-S** (arxiv:2410.01680, 2024-10). Loss-balancing for multi-teacher distillation via Hadamard isotropic standardization.
   262	
   263	> "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices.
   264	
   265	> "PHI-S produces the best student model across the suite of methods studied"
   266	
   267	### Sub-topic: Domain-adaptive specialization
   268	
   269	**DiT** (arxiv:2203.02378, 2022-03). Microsoft. BEiT-style MIM on document images. Document layout PubLayNet 91.0 → 94.9 mAP, table detection ICDAR2019 cTDaR 94.23 → 96.55 F1, doc classification RVL-CDIP 91.11 → 92.69%. *Recipe details (DALL-E tokens, IIT-CDIP 42M corpus) are widely cited but I could not surface verbatim from the paper HTML in this Phase-2 pass — flagged for Phase 3 if recipe is quoted in prose.*
   270	
   271	**EVA-02** (arxiv:2303.11331, 2023-03). MIM target = EVA-CLIP features (feature-distillation-via-MIM, not pixel/token MIM). ADE20K ~61.7 mIoU_ss reported via search summaries; *direct Table 16 quote not surfaced — flagged.*
   272	
   273	**LayoutLMv3** (arxiv:2204.08387, 2022-04). MLM + masked image + word-patch alignment. **Not pure SSL** — requires OCR-extracted text alongside images. Listed for completeness; out of scope for vision-only SSL.
   274	
   275	**Donut** (arxiv:2111.15664, 2021-11). NAVER. "OCR-free VDU"; pretraining objective is cross-entropy on text outputs given synthetic document images. **Weakly supervised generative pretraining**, not SSL. Listed for completeness.
   276	
   277	**Medical 3D MAE** (arxiv:2410.23132, 2024-10). 39,168 unlabeled 3D brain MRI volumes; MAE with sparsification on a Residual Encoder U-Net within nnU-Net.
   278	
   279	> "the first work to demonstrate that SSL pretraining with a fixed architecture can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline"
   280	
   281	> "surpasses previous SSL methods but also outperforms the strong nnU-Net baseline by an average of approximately 3 Dice points"
   282	
   283	S3D average DSC 72.37 vs no-pretraining nnU-Net 70.40 (Δ ≈ +1.97 DSC). *Compares from-scratch SSL on the medical domain vs from-scratch supervised. Does not compare to continual SSL on a natural-image checkpoint.*
   284	
   285	**SatMAE** (arxiv:2207.08051, NeurIPS 2022). MAE with temporal patch masking and spectral positional encodings on fMoW. "Up to ↑ 7%" supervised benchmarks, "up to ↑ 14%" land cover classification transfer. *Specific deltas not surfaced in this pass.*
   286	
   287	### Sub-topic: Continual SSL pretraining (cross-cutting gap)
   288	
   289	The literature does not contain a canonical bake-off study comparing all three corners of the question that motivates this post:
   290	- (a) From-scratch SSL on a new domain
   291	- (b) Continual SSL on a natural-image checkpoint
   292	- (c) Zero-shot fine-tune from a natural-image checkpoint
   293	
   294	Domain-adaptive SSL papers (DiT, SatMAE, Medical 3D MAE) tend to compare (a) vs (a-supervised); they generally do not include (b) as a head-to-head condition. Pointer-only sources surfaced in the sweep:
   295	
   296	- arxiv:2503.02844 ("Beyond Cosine Decay: On the effectiveness of Infinite Learning Rate Schedule for Continual Pre-training", 2025) — directly studies continual SSL with MAE, summary says "CPT mitigates catastrophic forgetting." *Pointer; not directly fetched.*
   297	- arxiv:2410.18677 ("Enhancing pretraining efficiency for medical image segmentation via transferability metrics", 2024) — summary suggests an intermediate continual-pretraining sweet spot. *Pointer.*
   298	- arxiv:2502.18056 ("Escaping the big data paradigm in self-supervised representation learning", 2025) — for narrow target domains, in-domain SSL on tiny corpora can rival ImageNet-init at much smaller scale. Classification-only. *Pointer.*
   299	
   300	**This gap itself is a finding worth surfacing in the post**: there is no canonical "domain-adaptive SSL bake-off" with dense-prediction numbers. Practitioners are working in the absence of clean comparative benchmarks.
   301	
   302	### Sub-topic: The OOD-domain transfer matrix
   303	
   304	Across the canonical SSL papers covered (MAE, BEiT family, DINO line, JEPA, AIM, AIMv2, RADIO line), **none report transfer to medical / satellite / line-drawing / document-image / engineering-drawing / construction domains.** Every reported transfer is IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain transfer. This is a load-bearing fact for a post written for someone with an OOD corpus: **no canonical SSL paper tells you whether their recipe transfers to your domain.** That answer comes from domain-specific follow-ups (DiT for documents, SatMAE for satellite, Medical 3D MAE) or from running the experiment yourself.
   305	
   306	### Cross-method ADE20K mIoU summary (where reported)
   307	
   308	ViT-L IN1K-pretrained, UperNet head:
   309	- MAE 53.6
   310	- BEiT v1 53.3 (800 ep)
   311	- BEiT v2 56.7 (1600 ep)
   312	- D2V2-Refined (MIM-Refiner) 54.4
   313	
   314	ViT-B IN1K-pretrained, UperNet head:
   315	- MAE 48.1
   316	- BEiT v1 45.6
   317	- BEiT v2 53.1
   318	- iBOT 50.0
   319	- CAE 50.2
   320	
   321	Frozen-backbone (linear or DPT-style):
   322	- DINOv2 ViT-g 53.0 (multi-scale)
   323	- DINOv3 ViT-7B **63.0** ← highest reported in the dataset
   324	
   325	Multi-teacher distillation:
   326	- RADIOv2.5-g 54.56
   327	- C-RADIOv4-H 55.20
   328	
   329	These numbers are the empirical spine of section "Where each recipe lands on dense prediction." They will be tabulated in a figure.
   330	
   331	## Claim-source matrix
   332	
   333	Every load-bearing claim the post will make has a row here with a quoted primary source and a recency status.
   334	
   335	| # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID (arxiv / URL + date) | Recency status |
   336	|---|---|---|---|---|
   337	| 1 | MAE uses an asymmetric encoder/decoder where the encoder operates only on the visible (~25%) subset of patches, with mask ratio 75% | "an asymmetric encoder-decoder architecture, with an encoder that operates only on the visible subset of patches (without mask tokens)... masking a high proportion of the input image, e.g., 75%" | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
   338	| 2 | MAE achieves ADE20K mIoU 53.6 with ViT-L (UperNet, IN1K-pretrained) | "MAE / IN1K: ViT-B 48.1, ViT-L 53.6" — Table 5 | arxiv:2111.06377v3 (2021-12-19) | stable foundational / passes |
   339	| 3 | SimMIM uses 60% mask ratio with 32×32 patches and a single linear prediction head | "we adopt a masking ratio of 0.6 on patch size of 32 by default... the prediction head can be made extremely lightweight, as light as a linear layer" | arxiv:2111.09886v1 (2021-11-18) | stable foundational / passes |
   340	| 4 | MaskFeat predicts HOG features at masked positions and shows that semantic-feature targets (from supervised CNNs/ViTs) degrade performance | "Histograms of Oriented Gradients (HOG)... works particularly well... Semantic knowledge from human annotations is not always helpful for MaskFeat... predicting supervised features from CNNs or ViTs trained on labeled data leads to *degraded* performance" | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
   341	| 5 | MaskFeat does not report image dense-prediction transfer (ADE20K / COCO seg) | Image transfer in the paper is ImageNet classification only; video transfers are AVA/SSv2. "MaskFeat opens the door for directly pre-training on unlabeled videos." | arxiv:2112.09133v2 (2023-01-12) | stable foundational / passes |
   342	| 6 | data2vec and data2vec 2.0 do not report image dense-prediction transfer | data2vec evaluates ImageNet-1K + Librispeech + GLUE only; data2vec 2.0 same | arxiv:2202.03555v3 (2022-10-25); arxiv:2212.07525v2 (2023-06-15) | stable foundational / passes |
   343	| 7 | data2vec is vulnerable to representation collapse; the paper documents three failure modes | "Representation Collapse... is most likely to happen in the following scenarios: First, the learning rate is too large or the learning rate warmup is too short... Second, τ is too low... Third, ... longer spans need to be masked" | arxiv:2202.03555v3 (2022-10-25) | stable foundational / passes |
   344	| 8 | BEiT v1 uses DALL-E's pretrained dVAE tokenizer (vocab 8192) as targets | "we directly use the publicly available image tokenizer described in [Ramesh et al. 2021]"; "vocabulary size of visual tokens is 8192" | arxiv:2106.08254v2 (2022-09-03) | stable foundational / passes |
   345	| 9 | BEiT v2 trains a VQ-KD tokenizer by knowledge-distilling CLIP/DINO features and achieves ADE20K mIoU 53.1 (ViT-B) / 56.7 (ViT-L) at 1600 epochs | "the output vectors aim at reconstructing the semantic features of a teacher model, e.g., DINO, and CLIP"; "BEiT v2 (ours), 1600 epochs: ImageNet 85.5, ADE20K 53.1... ViT-L: ImageNet 87.3, ADE20K 56.7" | arxiv:2208.06366v2 (2022-10-03) | stable foundational / passes |
   346	| 10 | MIM-Refiner identifies the three-block-regime structure of MIM-pretrained encoders: early=general, middle=abstractions (k-NN peaks), late=reconstruction-prep (k-NN drops) | "1. In early ViT blocks, general purpose features are learned... 2. In middle ViT blocks, abstractions are formed... 3. In late ViT blocks, features are prepared for the reconstruction task. The reconstruction loss improves at a faster rate, while the k-NN accuracy decreases" | arxiv:2402.10093v4 (2025-02-20) | actively-evolving / 12-month bar / passes |
   347	| 11 | DINO observed that self-supervised ViT features carry explicit segmentation information that doesn't emerge in supervised ViTs or convnets | "self-supervised ViT features contain explicit information about the semantic segmentation of an image, which does not emerge as clearly with supervised ViTs, nor with convnets" | arxiv:2104.14294v2 (2021-05-24) | stable foundational / passes |
   348	| 12 | iBOT uses the teacher network as an online tokenizer for masked-patch prediction, dispensing with a pretrained tokenizer | "The online tokenizer is jointly learnable with the MIM objective and dispenses with a multi-stage training pipeline where the tokenizer needs to be pre-trained beforehand" | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
   349	| 13 | iBOT achieves ADE20K mIoU 50.0 with UperNet at ViT-B/16 | "iBOT advances previous best methods DINO by 3.2 on mIoU with UperNet" — paper Table 5 | arxiv:2111.07832v3 (2022-01-27) | stable foundational / passes |
   350	| 14 | DINOv2's loss combines DINO + iBOT + KoLeo regularizer + Sinkhorn-Knopp centering, trained on a curated 142M-image dataset (LVD-142M) | "DINO loss... iBOT loss... KoLeo regularizer... [we] replace the teacher softmax-centering step of DINO and iBot by the Sinkhorn-Knopp (SK) batch normalization" + LVD-142M curation pipeline | arxiv:2304.07193v2 (2024-02-02) | actively-evolving / 12-month bar / marginal — paper v2 is Feb 2024, ~15 months at pubDate 2026-05-04. Hedge or upgrade: stable foundational for the loss-composition claim. |
   351	| 15 | DINOv2 has high-norm token artifacts (~10× higher norm, ~2% of tokens) appearing in low-information background regions; registers fix them with <2% FLOP overhead | "tokens with roughly 10x higher norm at the output and correspond to a small fraction of the total sequence (around 2%)"; "we explicitly add new tokens to the sequence, that the model can learn to use as registers... <2% FLOP increase" | arxiv:2309.16588v2 (2024-04-12) | actively-evolving / 12-month bar / marginal — v2 is Apr 2024, ~13 months. Hedge or treat as foundational. |
   352	| 16 | DINOv3 introduces Gram anchoring as a regularizer on patch–patch similarity geometry: ℒ_Gram = ‖X_S X_S⊤ − X_G X_G⊤‖_F² | Body of paper, refinement-phase loss. | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   353	| 17 | Without Gram anchoring, long DINO/iBOT training shows patch-feature locality decay (cosine sim between CLS and patches grows) | "cosine similarity between the CLS token and the patch outputs gradually increases during training... the locality of the patch features diminishes" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   354	| 18 | DINOv3 ViT-7B achieves ADE20K mIoU 63.0 with frozen backbone | "ADE20K segmentation (frozen backbone): mIoU 63.0" | arxiv:2508.10104 (2025-08) | actively-evolving / 12-month bar / passes |
   355	| 19 | I-JEPA predicts in latent space (target encoder = EMA of context encoder), not pixel/token space; pixel-space prediction empirically degrades linear probe | "by predicting in representation space, I-JEPA produces semantic representations while using less compute"; "predicting in pixel-space leads to a significant degradation in the linear probing performance" | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
   356	| 20 | I-JEPA does not report ADE20K mIoU; transfer benchmarks are classification + Clevr-Count/Dist | Body of paper. | arxiv:2301.08243v3 (2023-04-13) | stable foundational / passes |
   357	| 21 | AIM uses prefix-LM (sampled prefix length S, bidirectional within prefix, AR loss on rest) with normalized-pixel L2 target | "we uniformly sample a prefix length S. The attention for the first S patches are set to be bidirectional and loss is only computed for the remaining patches" + L2 loss on normalized pixels | arxiv:2401.08541 (2024-01-16) | actively-evolving / 12-month bar / marginal — Jan 2024, ~16 months. Recipe is foundational; hedge if quoting recent claims. |
   358	| 22 | AIM does not report ADE20K, COCO, or depth transfer numbers (classification-only) | Body of paper; 15 classification benchmarks evaluated, no dense-prediction numbers | arxiv:2401.08541 (2024-01-16) | actively-evolving / 12-month bar / marginal — same as 21 |
   359	| 23 | AM-RADIO student is trained with no SSL auxiliary loss; the entire signal is teacher feature imitation (cosine + smooth L1 on spatial, cosine on summary) | "L_summary(x) = Σ_i λ_i L_cos(y_i^(s), z_i^(s))"; "L_features... L_match = α·L_cos + β·L_smooth_l1, α=0.9, β=0.1" — and no SSL pretext mentioned | arxiv:2312.06709v3 (2023-12, CVPR 2024) | actively-evolving / 12-month bar / marginal — Dec 2023, ~17 months. **Crucial claim; needs strengthening — see Phase 7 freshness re-check or pull a more recent direct read.** |
   360	| 24 | RADIOv2.5 diagnoses the "mode-switching" pathology where features behave like DINOv2 at ≤512² and like SAM at higher resolutions | "at resolutions lower than or equal to 512², the features most closely resemble those of DINOv2... At higher resolutions, the model starts to behave more like SAM"; "in the high-resolution regime the student only sees SAM features" | arxiv:2412.07679v2 (2024-12, CVPR 2025) | actively-evolving / 12-month bar / passes |
   361	| 25 | C-RADIOv4 trains the student via teacher feature imitation with no SSL auxiliary loss; introduces MESA (shift-equivariant EMA matching) and angular-cone-normalized loss as stabilizers | "L_spatial(x,ŷ) = (1/|Ω|) Σ (F_{S→T}[x]_u − ŷ_u)²"; "L_mesa(x,x̃) = (1/|Ω|) Σ (F_{S→S̃}[LN(x)]_u − LN(x̃)_u)²"; "L_angle(x,y) = Θ(x,y)² / Disp(Θ_y)" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
   362	| 26 | C-RADIOv4-H achieves ADE20K mIoU 55.20 at 512px | "C-RADIOv4-H: ADE20K mIoU 55.20 at 512px" | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes |
   363	| 27 | C-RADIOv4 teachers are SigLIP2, DINOv3, and SAM3 (variants like "SigLIP2-g-384, DINOv3-7B" reported in research summaries; specific suffixes flagged for Phase 7 re-verification) | "trained with an updated set of teachers: SigLIP2, DINOv3, and SAM3" — abstract; specific variant suffixes from research summary, not abstract | arxiv:2601.17237v1 (2026-01-24) | actively-evolving / 12-month bar / passes (variant suffix marked for Phase 7 confirm) |
   364	| 28 | PHI-S applies Hadamard isotropic standardization to balance teacher activation statistics in multi-teacher distillation, producing the best student in their ablation | "PHI Standardization (PHI-S)... isotropic standardization, where each dimension of a multivariate distribution is standardized using the same scale" via Hadamard matrices; "PHI-S produces the best student model across the suite of methods studied" | arxiv:2410.01680 (2024-10) | actively-evolving / 12-month bar / passes |
   365	| 29 | DiT applies BEiT-style MIM to document images and reports PubLayNet 91.0→94.9, ICDAR2019 cTDaR 94.23→96.55, RVL-CDIP 91.11→92.69 | Reported headline numbers from arxiv:2203.02378 abstract. *Recipe specifics (DALL-E tokens, IIT-CDIP 42M corpus) flagged for Phase 3 re-fetch if quoted in prose.* | arxiv:2203.02378 (2022-03) | stable / 18-month bar fails (4 years old); foundational for the document-domain framing — flag as marginal-stable. |
   366	| 30 | A 3D-medical MAE on 39k MRI volumes outperforms a non-pretrained nnU-Net by ~+2 DSC, demonstrating SSL beats from-scratch supervised in a 3D medical domain. The paper does NOT compare to continual SSL on a natural-image checkpoint. | "S3D average DSC 72.37... no-pretraining baseline 70.40 (Δ ≈ +1.97 DSC)"; "the first work to demonstrate that SSL pretraining... can consistently outperform a state-of-the-art, dynamically optimized nnU-Net baseline" | arxiv:2410.23132 (2024-10) | actively-evolving / 12-month bar / passes |
   367	| 31 | No canonical SSL paper in the dataset reports OOD-domain transfer (medical/satellite/document/line-drawing/construction); transfer benchmarks are exclusively IN1K → {ADE20K, COCO, iNat, Places, VTAB-natural} or video-domain. | Cross-paper observation across MAE, BEiT v1/v2/v3, MaskFeat, data2vec/2.0, MIM-Refiner, DINO/iBOT/DINOv2/v3, I-JEPA/V-JEPA/V-JEPA 2, AIM/AIMv2, RADIO line. | Synthesis claim — backed by the absence of OOD-transfer tables in all cited papers. | meta-claim / passes (absence-of-evidence kind; Gate 0 will scrutinize) |
   368	| 32 | The published literature does not contain a canonical bake-off comparing (a) from-scratch SSL on a new domain, (b) continual SSL on a natural-image checkpoint, and (c) zero-shot fine-tune from a natural-image checkpoint with dense-prediction numbers | Synthesis claim from the domain-adaptive SSL sub-topic above. Pointer-only sources surfaced (arxiv:2503.02844, arxiv:2410.18677, arxiv:2502.18056); none report all three corners with dense-pred numbers. | Synthesis claim. | meta-claim / passes (absence-of-evidence; Gate 0 will scrutinize) |
   369	
   370	**Marginal-row debt to close before Gate 0 acceptance:** rows 14, 15, 21, 22, 23, 29 carry `marginal` recency status. Closure plan:
   371	- Row 23 (AM-RADIO no-SSL-aux claim): the most load-bearing marginal. Close by re-reading AM-RADIO §3 directly before Gate 0 fires, OR by hedging the prose to "in the published RADIO line — AM-RADIO 2023 through C-RADIOv4 2026 — no SSL auxiliary loss is added to the student" which the v4 evidence (row 25) supports as recent.
   372	- Rows 14, 15: DINOv2 + registers loss claims. Treat as foundational (loss compositions don't change with paper revisions); upgrade recency status to "stable foundational / passes" with annotation.
   373	- Rows 21, 22: AIM recipe claims. Same — recipe is fixed by the paper; treat as stable foundational.
   374	- Row 29: DiT 2022. Closure: hedge the prose to "DiT 2022, the canonical document-domain MIM recipe at the time of writing." Row stays marginal-stable but the claim survives Gate 0.
   375	
   376	## Outline
   377	
   378	*(populated in Phase 3)*
   379	
   380	## Resume here
   381	
   382	Last touched: 2026-05-04.
   383	
   384	### Phase status
   385	
   386	| Phase | Status | Output |
   387	|---|---|---|
   388	| 1. Lock-in | done | `## Spec`, `## Throughline` |
   389	| 2. Research / fact-check | in progress (Gate 0 firing) | `## Research notes`, `## Claim-source matrix` |
   390	| 3. Outline + figure list | pending | `## Outline` |
   391	| 4. Draft prose | pending | `src/content/blog/ssl-pretraining-recipes/index.mdx` |
   392	| 5. Implement figures | pending | per-figure table populated at end of Phase 3 |
   393	| 6. Playwright review | pending | playwright snapshots reviewed |
   394	| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |
   395	
   396	### Codex history
   397	
   398	| Date | Gate | Outcome | Findings file |
   399	|---|---|---|---|
   400	
   401	*(no gates fired yet)*
   402	
   403	### Suggested next batch
   404	
   405	1. Dispatch Phase 2 parallel research subagents — split across (MIM/feature-prediction/token recipes) and (self-distillation + JEPA + autoregressive + multi-teacher). Each builds quoted-source notes per the primary-source decision tree.
   406	2. Read NVIDIA's RADIO line papers myself (AM-RADIO, RADIOv2.5, C-RADIOv4) to verify whether they include any SSL auxiliary loss alongside teacher distillation, since this is a load-bearing claim of section 7.
   407	3. Surface a candidate construction sheet for the throughline anchor — Vic to provide a representative example or pick from a pile.
   408	4. Build the `## Claim-source matrix` from Phase 2 outputs.
   409	5. Run Gate 0 (codex truthfulness pass) on the matrix.
   410	
   411	### How to resume from a fresh context
   412	
   413	1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
   414	2. Run resume-mode migration if any v2 sections are missing.
   415	3. `git log --oneline | head -30` to see commits since the spec commit.
   416	4. `grep -n TODO src/content/blog/ssl-pretraining-recipes/index.mdx` for remaining placeholders. (No MDX yet — created in Phase 4.)
   417	5. Pick the next batch above; implement, voice-check, commit, update this tracker.
   418	
   419	### Hard rules to keep applying
   420	
   421	1. **Truthful and current at date of publication, per load-bearing claim.** Every load-bearing claim has a row in the claim-source matrix with a quoted primary source and a recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness.
   422	2. **Intuition-first, but never at the cost of a wrong mental model.** Density is fine. Don't soften technical claims to make them more "approachable" if softening makes the model wrong.
   423	3. **`scripts/voice-check.sh` exits clean before any commit.** Em dashes: zero. Banned words: justify or rewrite.
   424	4. **Three codex gates are mandatory.** Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final).
   425	5. **Static is the figure default.** Interactive requires one of the four override clauses (continuous sweep / animation / drag / multi-state toggle).
   426	6. **Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.**
   427	7. **One section per commit, one figure per commit, one migration per commit.**
   428	8. **Sentence-case headings.** Numbered sections (`### 1. ...`). Em-dashes (U+2014) forbidden in prose; permitted in act-divider headings (`## Act 1 — The problem`). En-dashes (U+2013) allowed everywhere — use for numeric/date ranges.
   429	9. **`draft: false` from Phase 1 onward** (this is topic mode, not HTML-import).
   430	10. **Project-memory pointer + MEMORY.md entry verified at end of Phase 1.** See project memory at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_ssl_pretraining_recipes_post.md` and the MEMORY.md index entry.

web search: 
web search: 
web search: 
web search: arxiv 2111.06377 MAE asymmetric encoder decoder visible subset 75% Table 5 ADE20K 53.6
web search: 
web search: 2111.06377 site:arxiv.org/abs
web search: 
web search: https://arxiv.org/abs/2111.06377
codex
I’m going to use primary-source PDFs/official pages for verification. The browser search is giving too many mirrors, so I’m testing direct `arxiv.org` fetch through the shell and piping PDFs to text without writing files.
exec
/bin/zsh -lc "curl -L --max-time 20 -s https://arxiv.org/pdf/2111.06377v3 | pdftotext - - | rg -n \"asymmetric encoder-decoder|MAE / IN1K|ViT-L|53\\.6|masking a high proportion\" -C 2" in /Users/vic/dev/augusteo.com-astro
 exited 1 in 0ms:
Syntax Error: Document stream is empty

exec
/bin/zsh -lc 'curl -L --max-time 20 -I https://arxiv.org/pdf/2111.06377v3' in /Users/vic/dev/augusteo.com-astro
 exited 6 in 0ms:
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0curl: (6) Could not resolve host: arxiv.org

web search: 
web search: https://arxiv.org/abs/2111.06377
web search: 
web search: https://ar5iv.org/pdf/2111.06377
web search: 
web search: https://arxiv.org/abs/2508.10104
web search: 
web search: https://ar5iv.org/html/2508.10104v1
web search: 
web search: https://arxiv.org/abs/2312.06709
web search: 
web search: https://ar5iv.org/html/2312.06709v5
web search: 
web search: 'Gram' in https://ar5iv.org/html/2508.10104v1
web search: 
web search: https://ar5iv.org/html/2601.17237v1
web search: 
web search: https://arxiv.org/abs/2208.10442
web search: 
web search: continual self-supervised pretraining from ImageNet checkpoint medical segmentation dense prediction from scratch SSL compare
web search: 
web search: https://openreview.net/forum?id=Ax9Y4W0g7s
web search: 
web search: 
web search: 
web search: 
web search: 
web search: "Enhancing Semantic Segmentation with Continual Self-Supervised Pre-training" GLARE Cityscapes ADE20K
web search: 
web search: 'satellite imagery' in https://ar5iv.org/html/2508.10104v1
web search: 
web search: https://ar5iv.org/pdf/2508.10104
web search: 
web search: https://ar5iv.org/html/2508.10104v1
web search: 
web search: 
web search: 
web search: https://arxiv.org/abs/2312.06709v3
web search: 
web search: "Is self-supervised pre-training on satellite imagery better than ImageNet"
web search: 
web search: https://arxiv.org/abs/2502.10669
web search: 
web search: 'MAE-IN-GN' in https://openreview.net/pdf/6b2be2f7de5161dd7ab5e94228052449c72325d7.pdf
codex
Structural issues found. The matrix is not sound.

**Findings**

1. **STRUCTURAL: Row 31 is false.**
   Row 31 says no canonical SSL paper in the covered set reports OOD transfer to satellite/document/medical/etc. DINOv3 directly contradicts this. The DINOv3 paper has an entire geospatial section, says it builds a DINOv3 7B satellite model on SAT-493M, evaluates satellite/web DINOv3 models on Earth-observation tasks, and reports segmentation/detection numbers on Geo-Bench, LoveDA, iSAID, and DIOR. It even states the frozen DINOv3 web model sets leading results on Geo-Bench and remote-sensing segmentation/detection tasks. See DINOv3 geospatial section and tables: , , .
   This also breaks the Spec/Throughline claim that DINOv3 has “never seen” satellite imagery.

2. **STRUCTURAL: Row 32’s absence claim is false.**
   The matrix claims no canonical from-scratch-vs-continual/domain-adaptive SSL bake-off exists with dense-prediction numbers. Lahrichi et al. 2025 directly compares SSL pretraining on GeoNet vs ImageNet using MAE/SwAV, reports downstream metrics including mIoU for segmentation, and includes a two-stage ImageNet → GeoNet MAE condition. See abstract and setup: , . The PDF explicitly reports mIoU for segmentation and table results for MAE-GN, MAE-IN, SwAV-GN, SwAV-IN, and supervised ImageNet baselines: . It also reports MAE-IN-GN two-stage results: .
   The closure plan does not close row 32. It missed a direct counterexample.

3. **STRUCTURAL: Row 25 overstates C-RADIOv4 “no SSL auxiliary loss / entire signal is teacher imitation.”**
   C-RADIOv4 is not “only teacher feature imitation” once MESA is included. The paper says it matches the EMA student under shifted crops via MESA, not just teachers: . You can still argue MESA is a stabilizer rather than MAE/DINO-style pretext, but the current claim “entire signal is teacher feature imitation” is false for v4.
   Row 23 is cleaner for AM-RADIO: AM-RADIO says it omits supplemental ground-truth guidance and matches teacher features, with summary and spatial feature losses only in the shown formulation: . But the post’s headline extrapolates too far across the lineage.

4. **STRUCTURAL: The central thesis has no matrix row.**
   The notes’ headline says multi-teacher distillation is “categorically different from SSL pretraining in the MAE/DINO sense” ([notes](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:61)). Rows 23 and 25 support narrower method claims about RADIO losses; they do not source the categorical framing. That thesis needs its own synthesis row, with AM-RADIO/RADIOv2.5/C-RADIOv4 evidence plus a narrowly worded inference.

5. **STRUCTURAL: The matrix is missing required rows for BEiT v3 and AIMv2.**
   The Spec requires BEiT v3 and AIMv2 coverage, and you specifically asked whether BEiT v3 multimodal training and AIMv2 image-text training have rows. They do not. BEiT v3’s arXiv abstract directly supports masked modeling on images, text, and image-text pairs: . AIMv2’s arXiv abstract directly supports multimodal image/text AR training and raw image patch plus text-token generation: .
   These are load-bearing recipe classification claims; they need rows.

6. **STRUCTURAL: Recency status is wrong in multiple rows.**
   With publication date 2026-05-04 and a 12-month bar, rows marked “passes” are stale unless explicitly foundational-exempted. At minimum: row 10 MIM-Refiner 2025-02-20, row 24 RADIOv2.5 arXiv v2 2025-02-09, row 28 PHI-S 2024-10, row 30 Medical 3D MAE arXiv 2024-10. Row 23 uses “v3 Dec 2023” in the matrix, but the current arXiv page is v5 revised 2024-04-30, which is still just outside the 12-month bar on 2026-05-04: .
   The closure plan only names rows 14, 15, 21, 22, 23, 29. It misses stale rows 10, 24, 28, and 30.

7. **STRUCTURAL: The “natural-image SSL backbone produces low-signal features on this kind of data” throughline is unsupported and partly contradicted.**
   The Throughline says Act 1 should explain why a natural-image SSL backbone produces low-signal features on construction-like data ([notes](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:51)). The matrix has no row for this. Worse, DINOv3 reports strong frozen web-model results on remote-sensing segmentation/detection and says DINOv3 web is competitive or stronger on many geospatial benchmarks: . The post can still argue “construction drawings remain unproven,” but it cannot generalize this to satellite/OOD domains.

8. **STRUCTURAL: Row 31/32 synthesis search was not exhaustive enough.**
   The matrix’s own “pointer-only” treatment was too weak for absence claims. DINOv3 alone invalidates row 31. Lahrichi 2025 and GLARE/TMLR 2026 invalidate the confidence level of row 32. GLARE is explicitly continual self-supervised pretraining for semantic segmentation, initialized from existing SSL weights, evaluated across multiple segmentation domains: , . Even if it is not exactly the three-corner bake-off, it is a directly relevant contradicting source that the matrix omits.

I did not find a clear fabricated quote in the critical RADIO/DINOv3 rows I checked. The worse problem is that the matrix’s synthesis rows are false, several load-bearing claims have no row, and some “passes” recency labels do not pass the stated bar.

No cosmetic findings worth listing.


2026-05-05T00:34:21.698750Z ERROR codex_core::session: failed to record rollout items: thread 019df58b-16a0-7531-8a57-82b157abcef9 not found
tokens used
209,243
Structural issues found. The matrix is not sound.

**Findings**

1. **STRUCTURAL: Row 31 is false.**
   Row 31 says no canonical SSL paper in the covered set reports OOD transfer to satellite/document/medical/etc. DINOv3 directly contradicts this. The DINOv3 paper has an entire geospatial section, says it builds a DINOv3 7B satellite model on SAT-493M, evaluates satellite/web DINOv3 models on Earth-observation tasks, and reports segmentation/detection numbers on Geo-Bench, LoveDA, iSAID, and DIOR. It even states the frozen DINOv3 web model sets leading results on Geo-Bench and remote-sensing segmentation/detection tasks. See DINOv3 geospatial section and tables: , , .
   This also breaks the Spec/Throughline claim that DINOv3 has “never seen” satellite imagery.

2. **STRUCTURAL: Row 32’s absence claim is false.**
   The matrix claims no canonical from-scratch-vs-continual/domain-adaptive SSL bake-off exists with dense-prediction numbers. Lahrichi et al. 2025 directly compares SSL pretraining on GeoNet vs ImageNet using MAE/SwAV, reports downstream metrics including mIoU for segmentation, and includes a two-stage ImageNet → GeoNet MAE condition. See abstract and setup: , . The PDF explicitly reports mIoU for segmentation and table results for MAE-GN, MAE-IN, SwAV-GN, SwAV-IN, and supervised ImageNet baselines: . It also reports MAE-IN-GN two-stage results: .
   The closure plan does not close row 32. It missed a direct counterexample.

3. **STRUCTURAL: Row 25 overstates C-RADIOv4 “no SSL auxiliary loss / entire signal is teacher imitation.”**
   C-RADIOv4 is not “only teacher feature imitation” once MESA is included. The paper says it matches the EMA student under shifted crops via MESA, not just teachers: . You can still argue MESA is a stabilizer rather than MAE/DINO-style pretext, but the current claim “entire signal is teacher feature imitation” is false for v4.
   Row 23 is cleaner for AM-RADIO: AM-RADIO says it omits supplemental ground-truth guidance and matches teacher features, with summary and spatial feature losses only in the shown formulation: . But the post’s headline extrapolates too far across the lineage.

4. **STRUCTURAL: The central thesis has no matrix row.**
   The notes’ headline says multi-teacher distillation is “categorically different from SSL pretraining in the MAE/DINO sense” ([notes](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:61)). Rows 23 and 25 support narrower method claims about RADIO losses; they do not source the categorical framing. That thesis needs its own synthesis row, with AM-RADIO/RADIOv2.5/C-RADIOv4 evidence plus a narrowly worded inference.

5. **STRUCTURAL: The matrix is missing required rows for BEiT v3 and AIMv2.**
   The Spec requires BEiT v3 and AIMv2 coverage, and you specifically asked whether BEiT v3 multimodal training and AIMv2 image-text training have rows. They do not. BEiT v3’s arXiv abstract directly supports masked modeling on images, text, and image-text pairs: . AIMv2’s arXiv abstract directly supports multimodal image/text AR training and raw image patch plus text-token generation: .
   These are load-bearing recipe classification claims; they need rows.

6. **STRUCTURAL: Recency status is wrong in multiple rows.**
   With publication date 2026-05-04 and a 12-month bar, rows marked “passes” are stale unless explicitly foundational-exempted. At minimum: row 10 MIM-Refiner 2025-02-20, row 24 RADIOv2.5 arXiv v2 2025-02-09, row 28 PHI-S 2024-10, row 30 Medical 3D MAE arXiv 2024-10. Row 23 uses “v3 Dec 2023” in the matrix, but the current arXiv page is v5 revised 2024-04-30, which is still just outside the 12-month bar on 2026-05-04: .
   The closure plan only names rows 14, 15, 21, 22, 23, 29. It misses stale rows 10, 24, 28, and 30.

7. **STRUCTURAL: The “natural-image SSL backbone produces low-signal features on this kind of data” throughline is unsupported and partly contradicted.**
   The Throughline says Act 1 should explain why a natural-image SSL backbone produces low-signal features on construction-like data ([notes](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:51)). The matrix has no row for this. Worse, DINOv3 reports strong frozen web-model results on remote-sensing segmentation/detection and says DINOv3 web is competitive or stronger on many geospatial benchmarks: . The post can still argue “construction drawings remain unproven,” but it cannot generalize this to satellite/OOD domains.

8. **STRUCTURAL: Row 31/32 synthesis search was not exhaustive enough.**
   The matrix’s own “pointer-only” treatment was too weak for absence claims. DINOv3 alone invalidates row 31. Lahrichi 2025 and GLARE/TMLR 2026 invalidate the confidence level of row 32. GLARE is explicitly continual self-supervised pretraining for semantic segmentation, initialized from existing SSL weights, evaluated across multiple segmentation domains: , . Even if it is not exactly the three-corner bake-off, it is a directly relevant contradicting source that the matrix omits.

I did not find a clear fabricated quote in the critical RADIO/DINOv3 rows I checked. The worse problem is that the matrix’s synthesis rows are false, several load-bearing claims have no row, and some “passes” recency labels do not pass the stated bar.

No cosmetic findings worth listing.


