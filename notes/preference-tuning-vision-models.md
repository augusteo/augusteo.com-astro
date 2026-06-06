# Preference tuning, from chatbots to 3D

## Spec

**What / who / walk-away.** An explainer on preference optimization: the RLHF → DPO → GRPO lineage that came out of the LLM world, and how the same trick crossed over into vision — first into image generation (Diffusion-DPO), then into the model-in-the-loop data engine behind SAM 3D, where annotators who can only say "yes or no" break the 3D data barrier. The reader is an AI engineer who is comfortable with deep learning and supervised fine-tuning but has little or no reinforcement-learning background. They walk away able to: read the DPO loss and say what each term does; explain why DPO removes the reward model and the RL loop that PPO needs; see why the same preference signal adapts to a diffusion/flow-matching generator; and explain why binary preference annotation plus a model-in-the-loop loop is the data engine that produced SAM 3D.

**Topic-evolution classification:** actively-evolving (12-month bar). DPO (2023), GRPO (2025), Diffusion-DPO (2023), SAM 3D (2025) are all recent and the practice is moving. Foundational references locked by the field: PPO (Schulman 2017), Bradley-Terry (1952), SAM data engine (2023).

**Angle (resolved from Vic's message):** lead with the LLM preference-tuning primer (where the idea is clearest), bridge to generative vision, climax on the SAM 3D data engine (the CVPR 2026 talk by Georgia Gkioxari that Vic attended). NOT a comprehensive survey; a single throughline.

**Target length:** ~30-35 min read.

**Title sketch (decide at draft):**
- "Yes or no: preference tuning, from chatbots to 3D"
- "From RLHF to SAM 3D: teaching vision models taste"
- "Preference tuning escapes the language model"

**Figure-style mix:** default 100% static SVG. Flagged interactive/plot candidates (decide at Phase 3, default static unless an override clause fires):
- Bradley-Terry sigmoid (preference prob vs reward gap) — `plot` candidate.
- DPO beta sweep (preference-fit vs stay-near-reference tradeoff) — `interactive-canvas` candidate (continuous-sweep override clause).
- SAM 3D Shape-Elo climbing over data-engine versions — `plot` candidate (comparison across versions).
- Rest static: RLHF 3-stage pipeline, DPO-collapses-the-loop, DPO loss anatomy, GRPO group-relative advantage, Diffusion-DPO winner/loser on the denoise trajectory, model-in-the-loop data-engine loop, yes/no-vs-dense-annotation, "negatives are informative".

**Starter sources (to verify + quote in Phase 2; arxiv IDs from scouting, NOT yet confirmed):**
- PPO — Schulman et al, arxiv:1707.06347 (2017-07-20) [foundational]
- Learning to summarize from human feedback — Stiennon et al, arxiv:2009.01325 (2020-09)
- InstructGPT — Ouyang et al, arxiv:2203.02155 (2022-03)
- DPO — Rafailov et al, arxiv:2305.18290 (2023-05)
- DeepSeekMath (GRPO origin) — arxiv:2402.03300 (2024-02) [VERIFY ID]
- DeepSeek-R1 — arxiv:2501.12948 (2025-01)
- Bradley & Terry 1952, Biometrika 39:324-345 [foundational]
- Diffusion-DPO — Wallace et al, arxiv:2311.12908 (2023-11)
- Segment Anything (SAM) — Kirillov et al, arxiv:2304.02643 (2023-04) [foundational data-engine ref]
- SAM 3D — Meta, arxiv:2511.16624 (2025-11) [VERIFY ID + Elo/win-rate numbers]
- Benenson & Ferrari, "From colouring-in to pointillism" — arxiv:2210.14142 (2022-10) [VERIFY ID]

**SUSPECT — do not cite unless Phase 2 confirms they exist:**
- "Linear-DPO" arxiv:2605.21123 — scouting agent said "submitted May 2026"; future-dated, unverified. Likely hallucinated. Drop unless resolved.
- "Region-Normalized DPO for Medical Image Segmentation" arxiv:2601.23222 — scouting agent literally said "inferred from search results". Likely hallucinated. Drop unless resolved.

**Primary-talk source:** Georgia Gkioxari CVPR 2026 talk (attended by Vic 2026-06-04). Slides photographed (8 images). Talk is not itself a citable primary source; every claim it makes must be backed by SAM 3D / Diffusion-DPO / SAM papers. Gkioxari offered to give feedback on the process (per Vic).

## Throughline

**A single human preference judgment — "this one, not that one" — and what each method does with it.**

The concrete atom that threads every act is one human verdict on a pair (or a single sample): *which output is better?* We follow that one signal across the whole post:

- **Act 1 (LLM origin):** the verdict is a chatbot A/B click. A labeler reads two completions of the same prompt and picks one. InstructGPT turns ~tens of thousands of these into a reward model, then RL. (Citable numbers from InstructGPT/Stiennon.)
- **Act 2 (the methods):** the same verdict feeds Bradley-Terry → the DPO loss directly (no reward model), → GRPO (group-relative, no critic).
- **Act 3 (crossover to vision):** the verdict is now "which generated image looks better" (Diffusion-DPO, Pick-a-Pic pairs), then "is this reconstructed 3D shape good — yes or no" (SAM 3D annotators).
- **Climax:** the SAM 3D model-in-the-loop data engine, where those yes/no verdicts retrain the model and the shape-quality Elo climbs version over version. (Citable Elo/win-rate numbers from SAM 3D paper — to confirm.)

Ladder rung: **canonical-real** (named, public, citable at both ends: InstructGPT at the LLM end, SAM 3D at the vision end). Alternate if SAM 3D Elo numbers don't cite cleanly: fall back to composite-with-public-numbers for the data-engine climb.

## Research notes

All arxiv IDs below were fetched and verified in Phase 2 (verbatim quotes pulled from the abstract pages; body quotes flagged). The two Phase-1 SUSPECT IDs (Linear-DPO 2605.21123, RN-DPO 2601.23222) both turned out to be REAL — cross-checked via multiple independent retrievals.

### Sub-topic: the RLHF / PPO origin (LLM preference tuning)

The canonical pipeline is InstructGPT (Ouyang et al, 2022). Three stages, verbatim:

> "Step 1: Collect demonstration data, and train a supervised policy... we fine-tune a pretrained GPT-3 model on this data using supervised learning."
> "Step 2: Collect comparison data, and train a reward model. We collect a dataset of comparisons between model outputs, where labelers indicate which output they prefer for a given input. We then train a reward model to predict the human-preferred output."
> "Step 3: Optimize a policy against the reward model using PPO."
> Source: Ouyang et al, arxiv:2203.02155 (v1 2022-03-04).

The headline result (the "small-model-wins" hook):

> "outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters."

NUANCE: the paper does NOT state a single "N comparison labels collected" number. The closest is "the RM dataset has 33k training prompts." Cite "33k reward-model prompts," not a fabricated comparison count.

Origin before InstructGPT — Stiennon et al (summarization), the first clean "reward model from human comparisons beats the supervised metric" result:

> "We collect a large, high-quality dataset of human comparisons between summaries, train a model to predict the human-preferred summary, and use that model as a reward function to fine-tune a summarization policy using reinforcement learning."
> Source: Stiennon et al, arxiv:2009.01325 (v1 2020-09-02).

PPO itself (the RL algorithm in step 3) — the clip trick and the critic:

> "We propose a new family of policy gradient methods... which alternate between sampling data through interaction with the environment, and optimizing a 'surrogate' objective function using stochastic gradient ascent."
> "The second term, clip(rt(θ),1−ε,1+ε)Ât, modifies the surrogate objective by clipping the probability ratio, which removes the incentive for moving rt outside of the interval [1−ε,1+ε]."
> Source: Schulman et al, arxiv:1707.06347 (v1 2017-07-20).

PPO needs a learned value function (critic) to estimate advantages via GAE — this is the cost GRPO later removes.

Bradley-Terry (the statistical spine under all of this): P(i beats j) = exp(s_i)/(exp(s_i)+exp(s_j)) = σ(s_i − s_j). Confirmed real reference: Bradley & Terry, "Rank Analysis of Incomplete Block Designs I: The Method of Paired Comparisons," Biometrika 39(3-4):324-345 (1952). The whole field reduces a preference to a sigmoid of a score difference; that single equation is what DPO optimizes directly.

### Sub-topic: DPO (the closed-form shortcut)

DPO's central claim, verbatim:

> "Our key insight is to leverage an analytical mapping from reward functions to optimal policies, which enables us to transform a loss function over reward functions into a loss function over policies."
> "The resulting algorithm, which we call Direct Preference Optimization (DPO), is stable, performant, and computationally lightweight, eliminating the need for fitting a reward model, sampling from the LM during fine-tuning, or performing significant hyperparameter tuning."
> Source: Rafailov et al, arxiv:2305.18290 (v1 2023-05-29).

The loss (confirmed in words + equation from the body):

L_DPO = −E_(x,y_w,y_l) [ log σ( β·log(π_θ(y_w|x)/π_ref(y_w|x)) − β·log(π_θ(y_l|x)/π_ref(y_l|x)) ) ]

β controls deviation from the reference policy π_ref (the initial SFT model), verbatim: "β is a parameter controlling the deviation from the base reference policy π_ref, namely the initial SFT model." The implicit reward is β·log(π_θ/π_ref); the loss is just Bradley-Terry cross-entropy on that implicit reward. No reward model, no rollouts.

### Sub-topic: GRPO (drop the critic)

GRPO origin is DeepSeekMath, not DeepSeek-R1:

> "we introduce Group Relative Policy Optimization (GRPO), a variant of Proximal Policy Optimization (PPO), that enhances mathematical reasoning abilities while concurrently optimizing the memory usage of PPO."
> "[GRPO] obviates the need for additional value function approximation as in PPO, and instead uses the average reward of multiple sampled outputs, produced in response to the same question, as the baseline."
> Fig 4 caption: "GRPO foregoes the value model, instead estimating the baseline from group scores, significantly reducing training resources."
> Source: Shao et al (DeepSeek-AI), arxiv:2402.03300 (v1 2024-02-05).

DeepSeek-R1 is the scale proof:

> "To facilitate large-scale RL efficiency, we adopt Group Relative Policy Optimization (GRPO)."
> "[GRPO] was originally proposed to simplify the training process and reduce the resource consumption of Proximal Policy Optimization (PPO)." Body: "Since the value model is usually of similar size as the policy model, it introduces a significant memory and computational overhead."
> Source: DeepSeek-AI, arxiv:2501.12948 (v1 2025-01-22).

### Sub-topic: DPO crosses into generative vision

Diffusion-DPO (the bridge — cited on Gkioxari's slide as "Wallace et al, 2023"):

> "We re-formulate DPO to account for a diffusion model notion of likelihood, utilizing the evidence lower bound to derive a differentiable objective."
> "Using the Pick-a-Pic dataset of 851K crowdsourced pairwise preferences, we fine-tune the base model of the state-of-the-art Stable Diffusion XL (SDXL)-1.0 model with Diffusion-DPO."
> "Our fine-tuned base model significantly outperforms both base SDXL-1.0 and the larger SDXL-1.0 model... in human evaluation, improving visual appeal and prompt alignment."
> Source: Wallace et al (Salesforce/Stanford), arxiv:2311.12908 (v1 2023-11-21).

Pick-a-Pic (the preference dataset):

> "we create a web app that enables text-to-image users to generate images and specify their preferences. Using this web app we build Pick-a-Pic, a large, open dataset of text-to-image prompts and real users' preferences over generated images." (abstract: "over half-a-million examples"; the 851K pairwise figure is reported in Diffusion-DPO.)
> Source: Kirstain et al, arxiv:2305.01569 (v1 2023-05-02).

Why DPO behaves DIFFERENTLY on vision than on LLMs (Linear-DPO — backs the "it's not just mode-dropping" framing without parroting the talk's exact words):

> "Existing studies are confined to denoising diffusion models while overlooking flow-matching, and suffer from an objective mismatch when applying discrete NLP-based DPO to regression-based generative tasks."
> "this 'margin-maximization' behavior is fundamentally ill-suited for the regression nature of diffusion and flow-matching models" / "the rapid gradient decay in standard DPO creates a 'pseudo-convergence' trap."
> Source: Li et al, arxiv:2605.21123 (v1 2026-05-20). REAL (cross-checked). Org affiliation lower-confidence; method/claims confirmed.

NOTE on the talk's "mode sharpening / reduces hallucinations / enforces symmetry" slide: those exact phrasings are NOT in any verified paper. Attribute them to Gkioxari's talk explicitly if used, or hedge to the Linear-DPO regression-mismatch framing (which IS paper-backed). Do not assert them as established results.

### Sub-topic: DPO reaches dense segmentation; yes/no annotation

RN-DPO — DPO applied directly to segmentation (dense prediction), the proof DPO isn't only for generation:

> "We study Direct Preference Optimization (DPO) for segmentation from such noisy judges using proposals generated by a supervised base segmenter... selecting the judge's top-ranked proposal can improve peak performance when the judge is reliable, but can amplify harmful errors under weaker judges. We propose Region-Normalized DPO (RN-DPO), a segmentation-aware objective which normalizes preference updates by the size of the disagreement region between masks."
> Source: Kalisch et al, arxiv:2601.23222 (v1 2026-01-30). REAL (cross-checked). Fresh preprint, no peer review yet; flag as such.

Yes/no annotation beats dense labeling (Benenson & Ferrari, the research foundation for "annotators only say yes or no"):

> annotation "where only point-wise yes/no questions are answered" instead of dense mask drawing; "22.6M point labels," "4,171 classes," on Open Images.
> Source: Benenson & Ferrari, arxiv:2210.14142 (v1 2022-10-25).

### Sub-topic: the model-in-the-loop data engine (SAM, then SAM 3D)

The original SAM data engine:

> "the largest segmentation dataset to date (by far), with over 1 billion masks on 11M licensed and privacy respecting images." (Three-stage engine — assisted-manual → semi-automatic → fully-automatic — is in the body, not the abstract.)
> Source: Kirillov et al, arxiv:2304.02643 (v1 2023-04-05).

SAM 3D (the climax). Authors include Georgia Gkioxari, Piotr Dollár, Jitendra Malik (Meta):

> "We achieve this with a human- and model-in-the-loop pipeline for annotating object shape, texture, and pose, providing visually grounded 3D reconstruction data at unprecedented scale."
> "...combines synthetic pretraining with real-world alignment, breaking the 3D 'data barrier'."
> "we obtain significant gains over recent work, with at least a 5:1 win rate in human preference tests on real-world objects and scenes." (Body: at least 5:1 objects, 6:1 scenes.)
> Body (via Meta blog): "verifying or ranking meshes is a more accessible skill. We can thus scale by building a data engine asking annotators to rate multiple options generated by a suite of models in the loop." Scale: "almost 1 million distinct images and generating approximately 3.14 million model-in-the-loop meshes."
> Recipe: "SAM 3D collects training samples and preference data from humans and uses them in both supervised finetuning (SFT) and direct preference optimization (DPO). This alignment can be repeated... creating a virtuous cycle."
> Elo definition: "a 400 point Elo difference corresponds to 10:1 odds in a preference test." Data-engine improvement curve is Fig 10b ("as the data engine runs longer, model performance steadily improves").
> Source: SAM 3D Team (Meta), arxiv:2511.16624 (v1 2025-11-20).

CAUTION: the per-version shape-Elo numbers (pretrain→v6) live in Fig 10b of the PDF and could NOT be extracted from any accessible text (PDF too large, no HTML mirror yet). DO NOT publish specific per-version Elo values as fact. The Elo-climb figure is a SCHEMATIC of the reported monotonic climb above the retrieval baseline (sourced to the talk slide + Fig 10b), with no asserted numeric values. Only "400 Elo = 10:1 odds" and "5:1/6:1 win rates" are quoted as hard numbers.

### Gkioxari talk (framing only, not citable)

Vic attended CVPR 2026, 2026-06-04. Talk takeaways (use as narrative framing, back each substantive claim with the papers above):
- "The negatives are informative" — losing samples carry signal (this is just what the DPO loss does with y_l / x−).
- "Annotators only say yes or no" — they verify/rank, don't create ground truth. Strong guideline: 70%-correct is still a "no"; the rubric is iterative; early on mostly "no", later more "yes." (Backed by SAM 3D's verify/rank framing + Benenson yes/no annotation.)
- Two takeaways slide: (1) model-in-the-loop data engines (virtuous cycle), (2) model steering (steer pretrained representations; data-efficient but watch for local optima).
- Gkioxari offered to give Vic feedback on the process.

## Claim-source matrix

Recency: topic is actively-evolving (12-month bar; cutoff ~2025-06-05). Sources older than the bar are marked "foundational/canonical — field-locked" per the research-protocol exception (the post's currency is earned on the 2025-2026 vision-crossover claims, all fresh). No unclosed marginal rows.

| # | Claim (load-bearing assertion) | Quoted source (excerpt) | Source ID (+ date) | Recency status |
|---|---|---|---|---|
| 1 | RLHF aligns a model in three stages: SFT, then a reward model trained on human comparisons, then RL (PPO) against that reward. | "Step 2: Collect comparison data, and train a reward model... Step 3: Optimize a policy against the reward model using PPO." | arxiv:2203.02155 (2022-03-04) | foundational/canonical (RLHF pipeline) / passes |
| 2 | A 1.3B InstructGPT model's outputs are preferred over 175B GPT-3's, despite 100x fewer params. | "outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters." | arxiv:2203.02155 (2022-03-04) | foundational/canonical / passes |
| 3 | InstructGPT's reward model was trained on ~33k prompts of human comparison data. | "the RM dataset has 33k training prompts" | arxiv:2203.02155 (2022-03-04) | foundational/canonical / passes |
| 4 | The first clean RLHF result: a reward model from human comparisons beats the supervised/ROUGE objective for summarization. | "train a model to predict the human-preferred summary, and use that model as a reward function to fine-tune a summarization policy using reinforcement learning." | arxiv:2009.01325 (2020-09-02) | foundational (RLHF origin) / passes |
| 5 | PPO optimizes a clipped surrogate objective that removes the incentive to move the policy ratio outside [1−ε,1+ε]. | "clip(rt(θ),1−ε,1+ε)Ât... removes the incentive for moving rt outside of the interval [1−ε,1+ε]." | arxiv:1707.06347 (2017-07-20) | foundational (RL algorithm) / passes |
| 6 | PPO requires a separate learned value function (critic), roughly the size of the policy, to estimate advantages. | (DeepSeekMath, on what GRPO removes:) "obviates the need for additional value function approximation as in PPO"; (R1:) "the value model is usually of similar size as the policy model" | arxiv:2402.03300 (2024-02-05); arxiv:2501.12948 (2025-01-22) | foundational/canonical / passes |
| 7 | Human preference is modeled as a sigmoid of a score difference (Bradley-Terry): P(A≻B)=σ(s_A−s_B). | Bradley-Terry paired-comparison model: P(i beats j)=exp(s_i)/(exp(s_i)+exp(s_j)). | Bradley & Terry, Biometrika 39:324-345 (1952) | foundational / passes |
| 8 | DPO eliminates the reward model and the RL sampling loop by mapping reward→policy analytically, leaving a simple classification loss. | "eliminating the need for fitting a reward model, sampling from the LM during fine-tuning, or performing significant hyperparameter tuning." | arxiv:2305.18290 (2023-05-29) | foundational/canonical (the topic's core method) / passes |
| 9 | The DPO loss is log-σ of β times the difference of policy-vs-reference log-ratios on the chosen vs rejected response; β controls deviation from the SFT reference. | "β is a parameter controlling the deviation from the base reference policy π_ref, namely the initial SFT model." (loss eqn confirmed in body) | arxiv:2305.18290 (2023-05-29) | foundational/canonical / passes |
| 10 | GRPO drops PPO's value network and uses the mean reward of a sampled group as the baseline, reducing training resources. | "GRPO foregoes the value model, instead estimating the baseline from group scores, significantly reducing training resources." | arxiv:2402.03300 (2024-02-05) | foundational/canonical / passes |
| 11 | GRPO was adopted to train DeepSeek-R1 at scale for RL efficiency. | "To facilitate large-scale RL efficiency, we adopt Group Relative Policy Optimization (GRPO)." | arxiv:2501.12948 (2025-01-22) | canonical (GRPO-at-scale ref); 17mo, field-locked / passes |
| 12 | Diffusion-DPO reformulates DPO for diffusion via the ELBO and aligns SDXL on 851K Pick-a-Pic preference pairs, beating base SDXL on human preference. | "We re-formulate DPO to account for a diffusion model notion of likelihood, utilizing the evidence lower bound..."; "851K crowdsourced pairwise preferences"; "significantly outperforms both base SDXL-1.0 and the larger SDXL-1.0 model... in human evaluation." | arxiv:2311.12908 (2023-11-21) | foundational/canonical (first DPO-for-diffusion) / passes |
| 13 | Pick-a-Pic is an open dataset of real users' pairwise preferences over text-to-image generations. | "a large, open dataset of text-to-image prompts and real users' preferences over generated images." | arxiv:2305.01569 (2023-05-02) | foundational (dataset ref) / passes |
| 14 | Standard (sigmoid) DPO is mismatched to the regression nature of diffusion/flow-matching; its margin-maximization causes a pseudo-convergence trap. | "this 'margin-maximization' behavior is fundamentally ill-suited for the regression nature of diffusion and flow-matching models"; "rapid gradient decay... creates a 'pseudo-convergence' trap." | arxiv:2605.21123 (2026-05-20) | actively-evolving / 12-mo / passes |
| 15 | DPO has been applied directly to image segmentation (dense prediction), where how preference pairs are mined strongly affects outcomes. | "We study Direct Preference Optimization (DPO) for segmentation... selecting the judge's top-ranked proposal can improve peak performance when the judge is reliable, but can amplify harmful errors under weaker judges." | arxiv:2601.23222 (2026-01-30) | actively-evolving / 12-mo / passes (fresh preprint, flagged) |
| 16 | Dense annotation can be replaced by point-wise yes/no questions; this scaled to 22.6M point labels across 4,171 classes on Open Images. | annotation "where only point-wise yes/no questions are answered"; "22.6M point labels," "4,171 classes." | arxiv:2210.14142 (2022-10-25) | foundational (annotation-method ref) / passes |
| 17 | SAM built its dataset with a model-in-the-loop data engine, yielding over 1 billion masks on 11M images. | "the largest segmentation dataset to date (by far), with over 1 billion masks on 11M licensed and privacy respecting images." | arxiv:2304.02643 (2023-04-05) | foundational (data-engine origin) / passes |
| 18 | SAM 3D reconstructs 3D object shape/texture/pose from a single image, combining synthetic pretraining with real-world alignment to break the 3D "data barrier." | "...combines synthetic pretraining with real-world alignment, breaking the 3D 'data barrier'." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 19 | SAM 3D's real-world alignment uses SFT + DPO on human preference data, repeated as a virtuous cycle (the data engine). | "uses them in both supervised finetuning (SFT) and direct preference optimization (DPO). This alignment can be repeated... creating a virtuous cycle." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 20 | SAM 3D's data engine scales because annotators verify/rank model-generated meshes rather than author 3D ground truth. | "verifying or ranking meshes is a more accessible skill. We can thus scale by building a data engine asking annotators to rate multiple options generated by a suite of models in the loop." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 21 | SAM 3D produced its data at scale: ~1M images and ~3.14M model-in-the-loop meshes. | "almost 1 million distinct images and generating approximately 3.14 million model-in-the-loop meshes." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 22 | SAM 3D beats recent work by at least 5:1 (objects) / 6:1 (scenes) in human preference tests. | "at least a 5:1 win rate in human preference tests on real-world objects and scenes." (body: 6:1 scenes) | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 23 | SAM 3D measures preference with Elo; a 400-point Elo gap equals 10:1 odds, and Elo rises as the data engine runs longer. | "a 400 point Elo difference corresponds to 10:1 odds in a preference test." (Fig 10b: improvement over rounds) | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes (per-version values NOT cited; schematic only) |

## Related posts on augusteo.com

Scanned `src/content/blog/`. Strongest topical overlaps (will link inline in Phase 4, and as top entries in `## References`). NOTE: the scout over-editorialized; I'll link only at honest anchor points and confirm each post actually says what I cite at draft time.

- **image-generators-vision-models** (`/blog/image-generators-vision-models`) — STRONGEST companion. The generative-vision / Vision Banana paradigm: instruction-tuned image generators doing perception tasks. Anchor points: (a) Act-3 opening, when the post pivots from "align an image generator's taste" to "vision generators as the substrate preference tuning sits on top of"; (b) where I note that a generator is instruction-tuned but not yet preference-tuned. Honest framing: companion in the vision cluster, not a strict sequel.
- **generative-vision-stack** (`/blog/generative-vision-stack`) — discusses the generator-at-the-center thesis and references Diffusion-DPO / SAM 3. Anchor point: where Diffusion-DPO is introduced (Act 3 crossover) — link as "the generator-at-the-center story."
- **unified-vision-stack** (`/blog/unified-vision-stack`) — the discriminative encoder stack (DINOv3), and SAM 3's mask supervision. Anchor point: when first describing what a segmentation model outputs / SAM, link for the encoder-side background.
- **ssl-pretraining-recipes** (`/blog/ssl-pretraining-recipes`) — choosing an SSL pretraining recipe; synthetic-vs-real / out-of-distribution data theme. Anchor point: where SAM 3D's "synthetic pretraining + real-world alignment" appears — link to the pretraining-recipe discussion (the sim-to-real gap motivation). Verify the post actually frames synthetic-vs-real before linking.
- **omni-modal-stack** (`/blog/omni-modal-stack`) — moderate; multimodal wiring. Link only if a clean anchor appears; otherwise References-only or skip.

## Outline

*(populated in Phase 3)*

## Resume here

Last touched: 2026-06-05.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | done (Gate 0 pending) | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/preference-tuning-vision-models/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|

### Suggested next batch

1. Phase 2: verify every starter source by fetching it and pulling a direct quote; kill the two SUSPECT arxiv IDs if they don't resolve.
2. Dispatch parallel fact-check subagents grouped by sub-topic (LLM preference tuning / generative-vision DPO / SAM 3D data engine).
3. Build the claim-source matrix; scan src/content/blog for related posts; run Gate 0.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/preference-tuning-vision-models/index.mdx` for remaining placeholders.
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. Truthful and current per load-bearing claim; every load-bearing claim has a matrix row with a quoted primary source passing the 12-month bar. Phase 7 re-checks freshness.
2. Intuition-first, but never a wrong mental model. Density is fine; don't soften a claim into being wrong.
3. `scripts/voice-check.sh` exits clean before any commit. Em dashes: zero. Banned words: justify or rewrite.
4. Three codex gates mandatory: Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). Auto-fired.
5. Static is the figure default. Interactive needs one of the four override clauses.
6. Per-figure type locked at Phase 3; unlock only via Gate 1 STRUCTURAL + Vic approval.
7. One section per commit, one figure per commit, one migration per commit.
8. Sentence-case headings. Em-dashes forbidden in prose (allowed in `## Act N — ...` dividers). En-dashes allowed everywhere.
9. `draft: true` from creation through ship; Vic flips to `draft: false` himself.
10. Project-memory pointer + MEMORY.md entry verified at end of Phase 1.
11. Blog is interconnected; newer post links older relevant posts (scan in Phase 2, weave in Phase 4).
