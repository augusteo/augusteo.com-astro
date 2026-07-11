# Preference tuning, from chatbots to 3D

## Spec

**What / who / walk-away.** An explainer on preference optimization: the RLHF → DPO → GRPO lineage that came out of the LLM world, and how the same trick crossed over into vision — first into image generation (Diffusion-DPO), then into the model-in-the-loop data engine behind SAM 3D, where annotators give cheap preference verdicts (verify / rank / rate model-generated options) instead of authoring 3D ground truth, and that breaks the 3D data barrier. The reader is an AI engineer who is comfortable with deep learning and supervised fine-tuning but has little or no reinforcement-learning background. They walk away able to: read the DPO loss and say what each term does; explain why DPO removes the reward model and the RL loop that PPO needs (and where DPO is NOT a free win — PPO can still beat it); see why the same preference signal adapts to a diffusion/flow-matching generator; and explain why a cheap-verdict + model-in-the-loop loop is the data engine that produced SAM 3D.

**Gate-0 reframe (2026-06-05):** the strict "annotators only say yes or no" is Gkioxari's *talk* framing and is paper-backed only for 2D sparse annotation (Benenson). For SAM 3D the paper-backed primitive is "verify / rank / rate model-generated meshes rather than author ground truth." The post may quote the talk's yes/no framing explicitly (attributed to Gkioxari), but must not assert binary-yes/no as the SAM 3D annotation primitive in its own voice. The title can keep "yes or no" as a hook; the prose stays precise.

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
- **Act 2 (the methods):** the same verdict feeds Bradley-Terry → the DPO loss directly (no reward model). GRPO is a different piece of the machine: it's an advantage-estimator that sits DOWNSTREAM of whatever produces the reward (a preference-trained reward model, or a rule-based "is the answer correct" check, as in DeepSeek-R1) — it does not itself turn an A/B click into a reward. The throughline still runs through it (the reward it consumes can be the preference signal), but the post must say plainly that GRPO's job is dropping the critic, not converting verdicts to rewards. Act 2 also says where the verdict is NOT enough: DPO can overfit and PPO-style RLHF can still win (Xu 2024), the method that wins depends on misspecification (Shi 2025), and GRPO's normalization has a length bias (Dr. GRPO 2025).
- **Act 3 (crossover to vision):** the verdict is now "which generated image looks better" (Diffusion-DPO, Pick-a-Pic pairs), then a cheap quality verdict on a model-generated 3D mesh — verify / rank / rate, not author the ground truth (SAM 3D annotators). The talk's "yes or no" phrasing is Gkioxari's, quoted as such.
- **Climax:** the SAM 3D model-in-the-loop data engine, where those cheap verdicts feed SFT + DPO, the model retrains, and preference/Elo evaluation improves as the engine runs longer. No per-version Elo numbers asserted (Fig values not extractable); the climb is shown schematically.

Ladder rung: **canonical-real** (named, public, citable at both ends: InstructGPT at the LLM end, SAM 3D at the vision end). The data-engine climb is shown as a schematic of the reported monotonic improvement, not as extracted per-version values.

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

### Sub-topic: where preference tuning is NOT a free win (counterweights, added at Gate 0)

The post must not present preference tuning as a monotonic improvement path. Three verified counterweights:

DPO is not strictly better than PPO — PPO-style RLHF can win:

> "we first conduct both theoretical and empirical studies on the algorithmic properties of DPO and show that DPO may have fundamental limitations."
> "Experiment results demonstrate that PPO is able to surpass other alignment methods in all cases and achieve state-of-the-art results in challenging code competitions."
> Source: Xu et al, "Is DPO Superior to PPO for LLM Alignment? A Comprehensive Study," arxiv:2404.10719 (v1 2024-04-16). (ICLR 2025 per author claims; venue not independently confirmed.)

Which method wins depends on the setting (a theory result):

> "We show that RLHF, DPO, or online DPO can outperform one another depending on type of model mis-specifications."
> "we provide a concrete construction where the ground-truth reward is sparse and show that RLHF requires significantly fewer samples than DPO to recover an effective reward model, highlighting a statistical advantage of two-stage learning."
> Source: Shi et al, "Understanding the Performance Gap in Preference Learning: A Dichotomy of RLHF and DPO," arxiv:2505.19770 (v1 2025-05-26).

GRPO has its own bias:

> "we identify an optimization bias in Group Relative Policy Optimization (GRPO), which artificially increases response length (especially for incorrect outputs) during training. To address this, we introduce Dr. GRPO, an unbiased optimization method..."
> Source: Liu et al, "Understanding R1-Zero-Like Training: A Critical Perspective" (introduces Dr. GRPO), arxiv:2503.20783 (v1 2025-03-26).

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
> The "verify/rank/rate" framing is from Meta's official SAM 3D blog (https://ai.meta.com/blog/sam-3d/), first-party engineering content: "verifying or ranking meshes is a more accessible skill. We can thus scale by building a data engine asking annotators to rate multiple options generated by a suite of models in the loop." Scale (blog): "almost 1 million distinct images and generating approximately 3.14 million model-in-the-loop meshes." (Cited as the Meta blog, not the arxiv abstract — see matrix rows 20-21.)
> NOTE (Gate 0): the paper/blog do NOT say annotators give strictly binary yes/no verdicts for 3D. They verify/rank/rate. The strict "yes or no" is Gkioxari's talk framing; attribute it to the talk, don't assert it in the post's own voice for SAM 3D.
> Recipe: "SAM 3D collects training samples and preference data from humans and uses them in both supervised finetuning (SFT) and direct preference optimization (DPO). This alignment can be repeated... creating a virtuous cycle."
> Elo definition: "a 400 point Elo difference corresponds to 10:1 odds in a preference test." The paper reports a data-engine ablation showing performance improves "as the data engine runs longer" (figure number varies across PDF/extract versions — do NOT cite a figure number).
> Source: SAM 3D Team (Meta), arxiv:2511.16624 (v1 2025-11-20).

CAUTION: the per-version shape-Elo numbers (pretrain→v6) live in a data-engine ablation figure in the PDF and could NOT be extracted from any accessible text (PDF too large, no HTML mirror yet). DO NOT publish specific per-version Elo values as fact, and do NOT cite a figure number (numbering drifts across PDF/extract versions). The Elo-climb figure is a SCHEMATIC of the reported monotonic climb above the retrieval baseline (sourced to the talk slide + the paper's data-engine ablation), with no asserted numeric values. Only "400 Elo = 10:1 odds" and the combined "at least 5:1 ... on objects and scenes" win rate are quoted as hard numbers (the separate 6:1-scenes figure is from the unfetchable PDF body and does NOT ship; see the link-audit comment above matrix row 23).

### Sub-topic: mid-2026 SOTA / where the field is going (added 2026-06-05 per Vic's "check CVPR 2026 SOTA")

The post should land its coda on what's current in mid-2026, not stop at GRPO/SAM 3D.

GSPO (the "post-GRPO" note) — sequence-level instead of token-level importance ratios; diagnoses and fixes GRPO's instability; trained Qwen3:

> "GSPO defines the importance ratio based on sequence likelihood and performs sequence-level clipping, rewarding, and optimization."
> "The instability of GRPO stems from the fundamental misapplication and invalidation of importance sampling weights in its algorithmic design, which introduces high-variance training noise that progressively accumulates with increased response length..."
> Source: Zheng et al (Qwen Team / Alibaba), "Group Sequence Policy Optimization," arxiv:2507.18071 (v1 2025-07-24).

SAM 3 (the data engine as a NAMED 2026 pattern — model proposes AND verifies). This is the cleanest cite for "the loop now uses AI annotators + AI verifiers," distinct from SAM 3D:

> uses "multimodal LLMs as 'AI annotators'" and fine-tunes MLLMs into "effective 'AI verifiers' that achieve near-human accuracy"; "By delegating certain tasks to AI annotators... the throughput is more than doubled compared to a human-only annotation pipeline."
> Source: SAM 3 ("Segment Anything with Concepts"), arxiv:2511.16719 (v1 2025-11). Lineage: SAM (2304.02643, 1B masks) → SAM 2 (arxiv:2408.00714, model-in-loop video, 35.5M masks) → SAM 3 (AI annotators + verifiers) → SAM 3D (2511.16624).

Pref-GRPO (fresh vision-RL example + a fresh GRPO critique in one): pairwise-preference T2I RL, and a sharp diagnosis of pointwise-reward normalization:

> "minimal score differences between images are amplified after normalization, creating illusory advantages that drive the model to over-optimize"; shifts "the optimization objective from score maximization to preference fitting, ensuring more stable training."
> Source: Pref-GRPO, arxiv:2508.20751 (v1 2025-08-28).

MO-GRPO (fresh reward-hacking critique, sharper than Dr. GRPO on the multi-objective angle):

> "we identify that GRPO is vulnerable to reward hacking, optimizing only one of the objectives at the cost of the others."
> Source: MO-GRPO, arxiv:2509.22047 (v1 2025-09-26).

CVPR 2026 vision-RL beyond SAM 3D: "Identity-Preserving Image-to-Video Generation via Reward-Guided Optimization" (CVPR 2026, OpenAccess PDF confirmed; no arxiv quote extractable). Use only as one concrete data point that preference/reward optimization appears in multiple CVPR 2026 vision papers (alongside Pref-GRPO) — NOT as a claim that it is "routine" or field-normalized, which the two examples don't support.

NOTE: the agent's claim "nothing supersedes Xu et al's DPO<PPO headline" stands — the 2024-2025 counterweights remain the canonical references; the 2026 critiques are narrower/mechanistic (length bias, reward hacking, importance-sampling instability), so cite the canonical ones for the headline caveat and the fresh ones for the specific mechanism.

### Sub-topic: SAO — the critic comes back for async agentic RL (added 2026-07-10 per Vic's "add the GLM-team paper")

Read from the PRIMARY PDF directly (arxiv:2607.07508v1, pages 1-10; the WebFetch auto-summary hallucinated the advantage mechanism and mis-stated the model size, so all quotes below are from the PDF pages read via Read tool). Two automated-summary errors were caught and discarded: (1) WebFetch first said "SAO uses a value model" but with no basis, then a second WebFetch flagged the PDF as "corrupted" and gave an "approximate from async RL literature" advantage formula — a hallucination; (2) WebFetch said "GLM-5.2B". The PDF abstract says GLM-5.2 (750B-A40B). Only PDF-sourced facts are used.

**Paper:** "Single-Rollout Asynchronous Optimization for Agentic Reinforcement Learning." Zhenyu Hou*, Yujiang Li*, Jie Tang, Yuxiao Dong. Tsinghua University. "*Equal Contribution. Work done while ZH and YL interned at Z.AI." Header: "arXiv:2607.07508v1 [cs.LG] 8 Jul 2026"; footer "Under review, Feb 2026."

**The problem SAO targets (async RL + GRPO mismatch), verbatim:**
> "Previous RL pipelines for LLMs were mostly synchronous and batch-interleaved, which is inefficient for long-horizon agentic tasks. Recently, asynchronous RL has emerged as a more efficient alternative by updating the model as rollouts arrive. However, existing asynchronous RL systems often emphasize throughput, while leaving training stability and task effectiveness largely underexplored. For example, a key challenge is that group-wise sampling in the widely-used GRPO framework does not naturally fit asynchronous agentic training." (Abstract)
> "GRPO samples a group of responses for each prompt and uses the group-level average for advantage estimation. The group-wise sampling induces latency-driven off-policy behavior because the group has to wait for the slower one to finish before fed into training. In addition, group-wise sampling is incompatible with online or complex agentic settings where the environment often provides only a single trajectory feedback per prompt." (§1 Introduction)

**The core move (single rollout + value model), verbatim:**
> "To reduce off-policy effects and improve generalization, we replace group-wise sampling with single-rollout sampling, that is, using one rollout per prompt. We further improve this single-rollout strategy with practical value-model training designs." (Abstract)
> "Instead of group-wise sampling, such as GRPO, SAO uses single-rollout updates. To make this setting practical, it also introduces effective value-model training strategies." (§1)
> "However, single-rollout optimization inherently suffers from high variance in gradient estimation, similar to REINFORCE. To reduce variance requires a sufficiently good value model." (§3.2)

CRITICAL FRAMING FOR THE POST: SAO is the counter-swing to §5 of the post. §5 celebrated GRPO *dropping the critic*. SAO argues that for single-rollout async agentic RL you must *bring the value-model critic back* (and make it cheap). This is the honest "the pendulum swings back" beat — exactly the kind of counterweight the post already values (§6). The critic never was strictly obsolete; GRPO's group baseline replaced it only when you can afford a group.

**Value-model training designs (the "practical" part), verbatim:**
> Faster Value Update (TTUR-style): "we decouple the optimization frequencies of the policy and the value model. Specifically, for every single gradient update applied to the policy $\pi_\theta$, we enforce $K$ updates to the value network $V_\phi$ (where $K>1$). In our experiments, we set $K=2$." (§3.2)
> Frozen-Attention: "we employ a 'Frozen-Attention' training strategy for the value model. During the RL training, we freeze the parameters of the attention modules in $V_\phi$ and optimize the MoE projections." Rationale: value-model gradient norms "originate primarily from the Full Attention layers, whereas the Mixture-of-Experts (MoE) layers remain relatively stable." (§3.2)
> Value pretraining: "the 'cold start' problem in value estimation is a major bottleneck. By significantly increasing the scale of the value pretraining corpus, we provide a robust initialization point..." (§3.2)

**Double-sided token-level importance sampling / clipping (DIS), verbatim:**
> "To stabilize training under varied policy lag, we use token-level importance sampling strategy. It directly uses the log-probabilities from the rollout engine and applies stricter double-sided token-level clipping and masking." (§1 contributions)
> "we directly use $\pi_{\text{rollout}}$ as the behavior proxy and $\pi_\theta$ for importance sampling, i.e., $r_t(\theta) = \frac{\pi_\theta}{\pi_{\text{rollout}}}$, while dropping the inaccurate $\pi_{\theta_{\text{old}}}$. This eliminates the computational overhead of separate old-policy inference by utilizing the log-probabilities generated during the rollout phase." (§3.1)
> "we restrict the trust region to the interval $[1-\epsilon_\ell, 1+\epsilon_h]$, while tokens falling outside this range are masked from gradient computation to prevent instabilities arising from extreme policy divergence. This shares similarities with the IcePop mechanism [Team et al. 2025], yet our strategy is simpler by further removing $\pi_{\theta_{\text{old}}}$." (§3.1)
> DIS objective (Eq 1): $L(\theta) = \hat{\mathbb{E}}_t [ f(r_t(\theta), \epsilon_\ell, \epsilon_h) \hat{A}_t \log \pi_\theta(a_t|s_t) ]$; ratio (Eq 2): $r_t(\theta) = \exp(\log \pi_\theta(a_t|s_t) - \log \pi_{\text{rollout}}(a_t|s_t))$; calibration (Eq 3): $f(x;\epsilon_\ell,\epsilon_h) = x$ if $1-\epsilon_\ell < x < 1+\epsilon_h$, else $0$ (mask).
> LINK TO §11 (GSPO): DIS is the SAME importance-sampling thread as GSPO. GSPO moved the ratio to sequence level; SAO keeps it token level but drops π_θold and masks (rather than clips) out-of-range tokens. Both are "fix importance sampling for stability." Good throughline callback.

**Skip-Observation GAE (the agentic piece), verbatim:**
> "Standard Generalized Advantage Estimation (GAE) attempts to calculate the value difference between adjacent tokens. However, the transition from the end of an action $a_{i,\text{end}}$ to the start of an observation $o_{i,\text{start}}$ is discontinuous from the model's perspective, as the model does not generate $o_i$. Calculating advantage across this boundary introduces noise... To resolve this, we derive a 'Skip-Observation' GAE. We explicitly modify the Bellman target to bypass environment feedback tokens, linking the value of the current action directly to the value of the subsequent action." (§3, Skip-Observation section)
> Eq 4: $\hat{A}(a_{i,N}) = \delta + \gamma\lambda \hat{A}(a_{i+1,0})$; Eq 5: $\delta = r_t + \gamma V(a_{i+1,0}) - V(a_{i,N})$.
> (Secondary detail for the post; the load-bearing point is single-rollout + value-model comeback + DIS. Skip-Obs GAE can be a one-line mention.)

**Results, verbatim (Table 1, math reasoning, Qwen3-30B-A3B, Accuracy %):**
> SAO (ours): AIME2025 97.3, BeyondAIME 74.8, HMMT Nov 2025 88.3, IMOAnswerBench 74.0.
> GRPO (w/ python): AIME2025 84.2, BeyondAIME 54.8, HMMT Nov 2025 76.0, IMOAnswerBench 55.8.
> Baselines for reference: Claude-Sonnet-4.5 AIME2025 87.0; GPT-5 High 94.6; GLM-4.7 95.7.
> Table 2 (SWE-Bench Verified, Accuracy %): Qwen3-30B-A3B 23.0; +GRPO (w/ DIS) 27.0; +SAO (ours) 29.8.
> Ablation Table 4: SAO AIME2025 97.3 / BeyondAIME 74.8; SAO w/o Faster value 95.0 / 69.8; SAO w/o Frozen attention 90.6 / 74.5; Vanilla VAPO (w/o DIS) 91.3 / 69.0; Running mean baseline 79.8 / 55.3.

**Stability / collapse claim, verbatim (§4.2 Main Results):**
> "SAO consistently outperforms all baselines on both agentic reasoning and coding benchmarks. Standard GRPO suffers from a performance collapse at approximately 160 training steps. The scores reported for these models represent their final valid performance before collapsing."
> "our asynchronous RL design can stably train for around one thousand steps and achieves consistently better performance than improved GRPO."
> CAUTION: "GRPO collapses at ~160 steps" is THEIR result on THEIR setup (async, Qwen3-30B-A3B). State it as reported-by-SAO, not as a universal fact about GRPO. GRPO trained DeepSeek-R1 fine in the synchronous setting — the collapse is specific to the aggressive async off-policy regime SAO studies. Do NOT let the post imply GRPO is broken in general; §5/§11 already establish GRPO works.

**Deployment / GLM-5.2, verbatim (Abstract):**
> "SAO is successfully deployed in the agentic RL pipeline for training the open GLM-5.2 model (750B-A40B)."
> Note: abstract says "open GLM-5.2 model". Whether the weights are actually released is a separate question — the external-analysis agent is checking. Attribute "open ... model" to the paper's own claim; do not independently assert public availability unless the agent confirms a release.

**Online-learning result (single-rollout's unique fit), verbatim (§4.5):**
> "In real-world online learning environments, feedback is typically restricted to a single trajectory per prompt. This constraint is inherently incompatible with group-based optimization strategies like GRPO... In contrast, SAO utilizes a value-based critic to provide advantage estimation, allowing for effective policy updates from individual trajectories."
> The online writing-style experiment (reward preference shifts between cute / chuunibyou / classical; SAO realigns faster than a running-mean baseline). Good optional flavor; the load-bearing claim is "single-rollout fits online/agentic where a group is unavailable."

**Where SAO sits in the throughline:** it is an OPTIMIZER-side frontier development (same slot as GSPO §11), NOT a preference-signal development. Its reward in the experiments is rule-based correctness (math) or an LLM-judge binary (r = r_quality × r_style, §4.5) — NOT pairwise human preference. So it belongs in the coda's "part one" optimizer thread (with GSPO), BEFORE the Pref-GRPO landing (§12→§13), which is the designed throughline close (the pairwise verdict returns). Placing SAO after the close would undercut the landing. Decision: new §12 (SAO), Pref-GRPO becomes §13.

CONFLICT RESOLVED (2026-06-05): a SOTA-scout agent claimed "SAM 3D does NOT use DPO internally." This is WRONG and overruled by stronger evidence: (a) the row-19 verbatim quote "uses them in both supervised finetuning (SFT) and direct preference optimization (DPO)"; (b) Gkioxari's own talk slides photographed by Vic — slide 2 (Stage 2: "3D Shape/Texture Preference", x⁺≻x⁻), slide 3 (a DPO loss written over the conditional-flow-matching objective, citing Wallace 2023), slides 4-5 ("Impact of DPO", "Train on MITL Preference" +32.8% human-preference rate). SAM 3D unambiguously trains with DPO. (Phase 7 freshness will re-confirm the row-19 paper quote directly.)

### Gkioxari talk (framing only, not citable)

Vic attended CVPR 2026, 2026-06-04. Talk takeaways (use as narrative framing, back each substantive claim with the papers above):
- "The negatives are informative" — losing samples carry signal (this is just what the DPO loss does with y_l / x−).
- "Annotators only say yes or no" — they verify/rank, don't create ground truth. Strong guideline: 70%-correct is still a "no"; the rubric is iterative; early on mostly "no", later more "yes." (Backed by SAM 3D's verify/rank framing + Benenson yes/no annotation.)
- Two takeaways slide: (1) model-in-the-loop data engines (virtuous cycle), (2) model steering (steer pretrained representations; data-efficient but watch for local optima).
- Gkioxari offered to give Vic feedback on the process.

## Claim-source matrix

Recency: topic is actively-evolving (12-month bar; cutoff ~2025-06-05). Sources older than the bar are marked "foundational/canonical — field-locked" per the research-protocol exception (the post's currency is earned on the 2025-2026 vision-crossover claims, all fresh). No unclosed marginal rows.

**Phase 7 freshness re-check (2026-06-05 = pubDate):** all sources were fetched on pubDate, so no research-to-publication drift is possible for any row. One targeted re-check: SAM 3D (rows 18-23) bumped to **v2 (2026-06-02)** — verified the three load-bearing claims (human- and model-in-the-loop pipeline, "breaking the 3D data barrier", "at least a 5:1 win rate") are UNCHANGED from v1. Access date bumped to 2026-06-05; claims intact. All rows pass freshness as of pubDate.

| # | Claim (load-bearing assertion) | Quoted source (excerpt) | Source ID (+ date) | Recency status |
|---|---|---|---|---|
| 1 | RLHF aligns a model in three stages: SFT, then a reward model trained on human comparisons, then RL (PPO) against that reward. | "Step 2: Collect comparison data, and train a reward model... Step 3: Optimize a policy against the reward model using PPO." | arxiv:2203.02155 (2022-03-04) | foundational/canonical (RLHF pipeline) / passes |
| 2 | A 1.3B InstructGPT model's outputs are preferred over 175B GPT-3's, despite 100x fewer params. | "outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters." | arxiv:2203.02155 (2022-03-04) | foundational/canonical / passes |
| 3 | InstructGPT's reward model was trained on ~33k prompts of human comparison data. | "the RM dataset has 33k training prompts" | arxiv:2203.02155 (2022-03-04) | foundational/canonical / passes |
| 4 | The first clean RLHF result: a reward model from human comparisons beats the supervised/ROUGE objective for summarization. | "train a model to predict the human-preferred summary, and use that model as a reward function to fine-tune a summarization policy using reinforcement learning." | arxiv:2009.01325 (2020-09-02) | foundational (RLHF origin) / passes |
| 5 | PPO optimizes a clipped surrogate objective that removes the incentive to move the policy ratio outside [1−ε,1+ε]. | "clip(rt(θ),1−ε,1+ε)Ât... removes the incentive for moving rt outside of the interval [1−ε,1+ε]." | arxiv:1707.06347 (2017-07-20) | foundational (RL algorithm) / passes |
| 6 | PPO-style LLM RLHF trains a separate value model (critic), usually about the size of the policy; this is the overhead GRPO removes. (Stated as the GRPO-vs-PPO comparison, not a claim about PPO-2017 in the abstract.) | "[GRPO] obviates the need for additional value function approximation as in PPO"; "the value model is usually of similar size as the policy model, it introduces a significant memory and computational overhead." | arxiv:2402.03300 (2024-02-05); Nature 2025 DeepSeek-R1 (DOI 10.1038/s41586-025-09422-z) | foundational/canonical (GRPO-vs-PPO) / passes |
| 7 | Human preference is modeled as a sigmoid of a score difference (Bradley-Terry): P(A≻B)=σ(s_A−s_B). | Bradley-Terry paired-comparison model: P(i beats j)=exp(s_i)/(exp(s_i)+exp(s_j)). | Bradley & Terry, Biometrika 39:324-345 (1952) | foundational / passes |
| 8 | DPO eliminates the reward model and the RL sampling loop by mapping reward→policy analytically, leaving a simple classification loss. | "eliminating the need for fitting a reward model, sampling from the LM during fine-tuning, or performing significant hyperparameter tuning." | arxiv:2305.18290 (2023-05-29) | foundational/canonical (the topic's core method) / passes |
| 9 | The DPO loss is log-σ of β times the difference of policy-vs-reference log-ratios on the chosen vs rejected response; β controls deviation from the SFT reference. | "β is a parameter controlling the deviation from the base reference policy π_ref, namely the initial SFT model." (loss eqn confirmed in body) | arxiv:2305.18290 (2023-05-29) | foundational/canonical / passes |
| 10 | GRPO drops PPO's value network and uses the mean reward of a sampled group as the baseline, reducing training resources. | "GRPO foregoes the value model, instead estimating the baseline from group scores, significantly reducing training resources." | arxiv:2402.03300 (2024-02-05) | foundational/canonical / passes |
| 11 | GRPO was used to train DeepSeek-R1 at scale (peer-reviewed in Nature, Sept 2025). | "we build on DeepSeek-V3 Base and use Group Relative Policy Optimization (GRPO) as our RL framework." | Nature 645:633-638 (2025-09-17), DOI 10.1038/s41586-025-09422-z (preprint arxiv:2501.12948) | actively-evolving / 12-mo / passes (Nature version within bar) |
| 12 | Diffusion-DPO reformulates DPO for diffusion via the ELBO and aligns SDXL on 851K Pick-a-Pic preference pairs, beating base SDXL on human preference. | "We re-formulate DPO to account for a diffusion model notion of likelihood, utilizing the evidence lower bound..."; "851K crowdsourced pairwise preferences"; "significantly outperforms both base SDXL-1.0 and the larger SDXL-1.0 model... in human evaluation." | arxiv:2311.12908 (2023-11-21) | foundational/canonical (first DPO-for-diffusion) / passes |
| 13 | Pick-a-Pic is an open dataset of real users' pairwise preferences over text-to-image generations. | "a large, open dataset of text-to-image prompts and real users' preferences over generated images." | arxiv:2305.01569 (2023-05-02) | foundational (dataset ref) / passes |
| 14 | Standard (sigmoid) DPO is mismatched to the regression nature of diffusion/flow-matching; its margin-maximization causes a pseudo-convergence trap. | "this 'margin-maximization' behavior is fundamentally ill-suited for the regression nature of diffusion and flow-matching models"; "rapid gradient decay... creates a 'pseudo-convergence' trap." | arxiv:2605.21123 (2026-05-20) | actively-evolving / 12-mo / passes |
| 15 | DPO has been applied to medical image segmentation under noisy/weak judges (RN-DPO), where how preference pairs are mined strongly affects outcomes — one fresh preprint, not broad field adoption. | "We study Direct Preference Optimization (DPO) for segmentation... selecting the judge's top-ranked proposal can improve peak performance when the judge is reliable, but can amplify harmful errors under weaker judges." | arxiv:2601.23222 (2026-01-30) | actively-evolving / 12-mo / passes (single fresh preprint; do not generalize) |
| 16 | (Background analogy, not load-bearing for the SAM 3D climax.) In 2D semantic segmentation, dense annotation can be replaced by point-wise yes/no questions, scaling to 22.6M point labels across 4,171 classes on Open Images. | annotation "where only point-wise yes/no questions are answered"; "22.6M point labels," "4,171 classes." | arxiv:2210.14142 (2022-10-25) | background analogy, NOT a load-bearing claim (12-mo bar N/A for non-load-bearing background); not a bridge for the SAM 3D climax |
| 17 | SAM built its dataset with a model-in-the-loop data engine, yielding over 1 billion masks on 11M images. | "the largest segmentation dataset to date (by far), with over 1 billion masks on 11M licensed and privacy respecting images." | arxiv:2304.02643 (2023-04-05) | foundational (data-engine origin) / passes |
| 18 | SAM 3D reconstructs 3D object shape/texture/pose from a single image, combining synthetic pretraining with real-world alignment to break the 3D "data barrier." | "...combines synthetic pretraining with real-world alignment, breaking the 3D 'data barrier'." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 19 | SAM 3D's real-world alignment uses SFT + DPO on human preference data, repeated as a virtuous cycle (the data engine). | "uses them in both supervised finetuning (SFT) and direct preference optimization (DPO). This alignment can be repeated... creating a virtuous cycle." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
| 20 | SAM 3D's data engine scales because annotators verify/rank/rate model-generated meshes rather than author 3D ground truth. | "verifying or ranking meshes is a more accessible skill. We can thus scale by building a data engine asking annotators to rate multiple options generated by a suite of models in the loop." | Meta SAM 3D blog https://ai.meta.com/blog/sam-3d/ (first-party, accessed 2026-06-05) | actively-evolving / 12-mo / passes (first-party blog, not arxiv abstract) |
| 21 | SAM 3D produced its data at scale: ~1M images and ~3.14M model-in-the-loop meshes. | "almost 1 million distinct images and generating approximately 3.14 million model-in-the-loop meshes." | Meta SAM 3D blog https://ai.meta.com/blog/sam-3d/ (first-party, accessed 2026-06-05) | actively-evolving / 12-mo / passes (first-party blog, not arxiv abstract) |
| 22 | SAM 3D beats recent work by at least 5:1 in human preference tests on real-world objects and scenes. | "at least a 5:1 win rate in human preference tests on real-world objects and scenes." | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes |
<!-- 2026-06-06 link audit: dropped the separate "6:1 scenes" figure. It was a Phase-2 body annotation; the abstract + first-party Meta blog give only a COMBINED "at least 5:1 ... on objects and scenes," and the paper body is currently unfetchable (oversized PDF, broken HTML/ar5iv conversions). Publishing only the verbatim-traceable 5:1 to stay on the truthfulness bar. Re-add 6:1-scenes only if confirmed against the PDF body. -->

| 23 | SAM 3D measures preference with Elo; a 400-point Elo gap equals 10:1 odds, and preference performance improves as the data engine runs longer. | "a 400 point Elo difference corresponds to 10:1 odds in a preference test." (data-engine ablation: performance improves over rounds; exact figure number unverified — do not cite a figure number) | arxiv:2511.16624 (2025-11-20) | actively-evolving / 12-mo / passes (NO per-version values; climb shown schematically) |
| 24 | DPO is not strictly better than PPO: DPO has fundamental limitations and PPO-style RLHF can outperform it. | "DPO may have fundamental limitations"; "PPO is able to surpass other alignment methods in all cases and achieve state-of-the-art results in challenging code competitions." | arxiv:2404.10719 (2024-04-16) | canonical DPO-vs-PPO critique; field-locked (still THE reference per 2026 SOTA scan; nothing supersedes the headline result) / passes |
| 25 | Which preference method wins (RLHF / DPO / online-DPO) depends on model misspecification; RLHF can need fewer samples under sparse reward. | "RLHF, DPO, or online DPO can outperform one another depending on type of model mis-specifications"; "RLHF requires significantly fewer samples than DPO" under sparse reward. | arxiv:2505.19770 (2025-05-26) | canonical counterweight, field-locked (the RLHF-vs-DPO dichotomy result; ~12mo, at boundary) / passes |
| 26 | GRPO carries its own optimization bias (it inflates response length, especially for wrong outputs); fixes have been proposed (Dr. GRPO; reward-hacking diagnosed by MO-GRPO). | "we identify an optimization bias in Group Relative Policy Optimization (GRPO), which artificially increases response length (especially for incorrect outputs)..."; (MO-GRPO:) "GRPO is vulnerable to reward hacking, optimizing only one of the objectives at the cost of the others." | arxiv:2503.20783 (2025-03-26); arxiv:2509.22047 (2025-09-26) | MO-GRPO (2025-09) fresh / passes; Dr. GRPO is the canonical GRPO-bias critique, field-locked |
| 27 | The "post-GRPO" frontier (mid-2026): GSPO uses sequence-level (not token-level) importance ratios to fix GRPO's importance-sampling instability, and trained Qwen3. | "GSPO defines the importance ratio based on sequence likelihood and performs sequence-level clipping, rewarding, and optimization"; GRPO instability "stems from the fundamental misapplication and invalidation of importance sampling weights." | arxiv:2507.18071 (2025-07-24) | actively-evolving / 12-mo / passes |
| 28 | The model-in-the-loop data engine is now a named multi-generation pattern: SAM 3 uses MLLMs as "AI annotators" plus "AI verifiers" at near-human accuracy, more than doubling annotation throughput. | "multimodal LLMs as 'AI annotators'"; "effective 'AI verifiers' that achieve near-human accuracy"; "the throughput is more than doubled compared to a human-only annotation pipeline." | arxiv:2511.16719 (2025-11) | actively-evolving / 12-mo / passes |
| 29 | A fresh (2025) example of preference optimization in generative vision: Pref-GRPO reformulates text-to-image RL from pointwise score-maximization to pairwise preference fitting, fixing "illusory advantages" from reward normalization. | "minimal score differences between images are amplified after normalization, creating illusory advantages that drive the model to over-optimize"; shifts "the optimization objective from score maximization to preference fitting." | arxiv:2508.20751 (2025-08-28) | actively-evolving / 12-mo / passes (single example; do not generalize to "routine") |
| 30 | RLHF keeps the policy near the SFT model with a per-token KL penalty, so chasing reward doesn't drift the model into gibberish. | "In addition, we add a per-token KL penalty from the SFT model at each token to mitigate over-optimization of the reward model." | arxiv:2203.02155 (2022-03-04), §3.5 | foundational/canonical (RLHF objective) / passes |
| 31 | GSPO traces GRPO instability to per-token importance weights: each is "based on a single sample from each next-token distribution," so it "fails to perform the intended distribution-correction role," producing "high-variance training noise that progressively accumulates with increased response length... ultimately precipitating model collapse." | (quoted phrases) | arxiv:2507.18071 (2025-07-24) | actively-evolving / 12-mo / passes (mechanism rows backing §11 expansion) |
| 32 | GSPO uses a single sequence-level importance ratio (length-normalized sequence likelihood = geometric mean of token ratios), motivated by "since the reward is granted to the entire sequence, applying off-policy correction at the token level appears problematic." Ratio form s_i(θ)=(π_θ(y_i\|x)/π_old(y_i\|x))^(1/\|y_i\|) confirmed in HTML body; abstract confirms "based on sequence likelihood" + length normalization. | "since the reward is granted to the entire sequence, applying off-policy correction at the token level appears problematic"; "notably stabilizes Mixture-of-Experts (MoE) RL training"; "contributed to the remarkable improvements in the latest Qwen3 models." | arxiv:2507.18071 (2025-07-24) | actively-evolving / 12-mo / passes (geometric-mean reading is exact math of the length-normalized-likelihood form, not a verbatim phrase) |
| 33 | DAPO is GRPO plus four fixes (clip-higher, dynamic sampling, token-level loss, soft length penalty); most-reproduced GRPO successor. | "achieves 50 points on AIME 2024 using Qwen2.5-32B base model." | arxiv:2503.14476 (2025-03-18) | actively-evolving / 12-mo / passes (named as a sibling repair in §11) |
| 34 | CISPO (MiniMax-M1) clips the importance-sampling weight rather than the token update, so rare reasoning tokens keep contributing a gradient. | "CISPO clips importance sampling weights rather than token updates, outperforming other competitive RL variants." | arxiv:2506.13585 (2025-06-16) | actively-evolving / 12-mo / passes (named as a sibling repair in §11; production-grounded in MiniMax-M1) |
| 35 | Flow-GRPO is the bridge that puts GRPO onto a flow/diffusion model: it converts the deterministic ODE sampler to an SDE so one prompt yields a group of different images to compare. | "the first method to integrate online policy gradient reinforcement learning (RL) into flow matching models"; "an ODE-to-SDE conversion that transforms a deterministic Ordinary Differential Equation (ODE) into an equivalent Stochastic Differential Equation (SDE) that matches the original model's marginal distribution at all timesteps." | arxiv:2505.05470 (2025-05-08) | actively-evolving / 12-mo / passes (closes the DPO→GRPO-variant gap in §13) |
| 36 | Pref-GRPO mechanism: GRPO's group-std normalization Â=(r−mean)/std blows up tiny score gaps when std is small ("illusory advantage"); Pref-GRPO replaces the score with each image's pairwise win rate w_i=(1/(G−1))Σ_{j≠i}1(i≻j), which spreads across [0,1] giving real std. | "even minor score gaps are disproportionately magnified after normalization"; "scores keep rising while image quality deteriorates, manifesting as oversaturation or unnaturally dark artifacts"; "reformulates the GRPO objective to pairwise preference fitting: image pairs within a group are compared by a Pairwise Preference Reward Model (PPRM), and each image's win rate serves as the reward"; "directly suppress[es] the illusory-advantage amplification mechanism." | arxiv:2508.20751 (2025-08-28) | actively-evolving / 12-mo / passes (win-rate formula = Eq 12 verified in HTML body; advantage-normalization formula is standard GRPO) |
| 37 | Asynchronous RL updates the model as rollouts arrive (more efficient for long-horizon agentic tasks than synchronous batch-interleaved RL), but GRPO's group-wise sampling does not fit it: the group must wait for the slowest rollout, and online/agentic settings often give only one trajectory per prompt. | "group-wise sampling in the widely-used GRPO framework does not naturally fit asynchronous agentic training"; "The group-wise sampling induces latency-driven off-policy behavior because the group has to wait for the slower one to finish before fed into training. In addition, group-wise sampling is incompatible with online or complex agentic settings where the environment often provides only a single trajectory feedback per prompt." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes (fresh, 2 days old at pubDate) |
| 38 | SAO replaces GRPO's group-wise sampling with single-rollout sampling (one rollout per prompt) to reduce off-policy effects. | "To reduce off-policy effects and improve generalization, we replace group-wise sampling with single-rollout sampling, that is, using one rollout per prompt." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes |
| 39 | A single rollout has no group baseline, so SAO reintroduces a value-model critic (the thing GRPO dropped) to cut variance; single-rollout gradients are otherwise high-variance like REINFORCE. | "single-rollout optimization inherently suffers from high variance in gradient estimation, similar to REINFORCE. To reduce variance requires a sufficiently good value model."; "We further improve this single-rollout strategy with practical value-model training designs." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes |
| 40 | SAO makes the critic cheap enough to be practical via two designs: faster value updates (K>1 critic steps per policy step, K=2 used) and "Frozen-Attention" (freeze the value model's attention, train only its MoE projections). | "for every single gradient update applied to the policy π_θ, we enforce K updates to the value network V_φ (where K>1). In our experiments, we set K=2."; "we employ a 'Frozen-Attention' training strategy for the value model. During the RL training, we freeze the parameters of the attention modules in V_φ and optimize the MoE projections." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes |
| 41 | For stability under policy lag, SAO uses token-level importance sampling that drops the old policy π_θold and uses rollout log-probs directly, with double-sided clipping that MASKS out-of-range tokens (r_t = π_θ/π_rollout). | "we directly use π_rollout as the behavior proxy and π_θ for importance sampling, i.e., r_t(θ) = π_θ / π_rollout, while dropping the inaccurate π_θold. This eliminates the computational overhead of separate old-policy inference..."; "we restrict the trust region to the interval [1−ε_ℓ, 1+ε_h], while tokens falling outside this range are masked from gradient computation." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes |
| 42 | On the SAO paper's own async setup (Qwen3-30B-A3B), SAO trains stably ~1000 steps and beats GRPO on math + coding (AIME2025 97.3 vs 84.2; SWE-Bench Verified 29.8 vs 27.0), while standard GRPO collapses at ~160 steps. NOTE: the collapse is SAO's reported result in the aggressive async regime, not a claim GRPO is broken in general. | "SAO is able to train stably for one thousand steps and consistently outperform GRPO and its variants on agentic coding and reasoning benchmarks, such as SWE-Bench Verified, BeyondAIME, and IMOAnswerBench."; "Standard GRPO suffers from a performance collapse at approximately 160 training steps." (Table 1: SAO AIME2025 97.3 vs GRPO 84.2; Table 2: SAO 29.8 vs GRPO w/DIS 27.0) | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes (numbers are the paper's own async-setup results; framed as reported, not universal) |
| 43 | SAO was deployed in the agentic RL pipeline that trained GLM-5.2 (750B-A40B). | "SAO is successfully deployed in the agentic RL pipeline for training the open GLM-5.2 model (750B-A40B)." | arxiv:2607.07508 (2026-07-08) | actively-evolving / 12-mo / passes (deployment claim attributed to the paper) |

## Related posts on augusteo.com

Scanned `src/content/blog/`. Strongest topical overlaps (will link inline in Phase 4, and as top entries in `## References`). NOTE: the scout over-editorialized; I'll link only at honest anchor points and confirm each post actually says what I cite at draft time.

- **image-generators-vision-models** (`/blog/image-generators-vision-models`) — STRONGEST companion. The generative-vision / Vision Banana paradigm: instruction-tuned image generators doing perception tasks. Anchor points: (a) Act-3 opening, when the post pivots from "align an image generator's taste" to "vision generators as the substrate preference tuning sits on top of"; (b) where I note that a generator is instruction-tuned but not yet preference-tuned. Honest framing: companion in the vision cluster, not a strict sequel.
- **generative-vision-stack** (`/blog/generative-vision-stack`) — discusses the generator-at-the-center thesis and references Diffusion-DPO / SAM 3. Anchor point: where Diffusion-DPO is introduced (Act 3 crossover) — link as "the generator-at-the-center story."
- **unified-vision-stack** (`/blog/unified-vision-stack`) — the discriminative encoder stack (DINOv3), and SAM 3's mask supervision. Anchor point: when first describing what a segmentation model outputs / SAM, link for the encoder-side background.
- **ssl-pretraining-recipes** (`/blog/ssl-pretraining-recipes`) — choosing an SSL pretraining recipe; synthetic-vs-real / out-of-distribution data theme. Anchor point: where SAM 3D's "synthetic pretraining + real-world alignment" appears — link to the pretraining-recipe discussion (the sim-to-real gap motivation). Verify the post actually frames synthetic-vs-real before linking.
- **omni-modal-stack** (`/blog/omni-modal-stack`) — moderate; multimodal wiring. Link only if a clean anchor appears; otherwise References-only or skip.

## Outline

Three acts + coda. Throughline (one human preference verdict, "this one, not that one") opens and closes every act. Audience: AI engineer, little RL background — so every RL term is introduced from zero (reward model, advantage, critic, rollout, KL leash) the first time it appears, with a metaphor.

### Act 1 — The thing you can't demonstrate

**1. The gap: you can't write the perfect answer, but you can pick the better of two.** (Opens on the throughline atom.) SFT teaches by imitation: show the model a good answer, it copies. But for "good taste" — a helpful reply, an appealing image, a clean 3D mesh — nobody can author the perfect target, yet anyone can look at two and point. State the whole post in two sentences: preference tuning is how you train on "this one, not that one." Metaphor: teaching by grading, not by dictating. Throughline close: that one verdict is what we follow from a chatbot A/B click all the way to a 3D-shape verdict.
- Fig 1 (static): imitation (copy one demonstration) vs preference (pick between two candidates). [rows: framing; no number claim]
- {/* Reader can now: say why SFT can't capture "good taste" and why a pairwise verdict can. */}

### Act 2 — The methods (LLM lineage)

**2. Turning a verdict into a number (Bradley-Terry).** A single "A beats B" is binary; learning needs a gradient. Bradley-Terry: give each candidate a hidden score, and the probability A wins is the sigmoid of the score gap. Small gap → coin flip; big gap → near-certain. This one equation is the seed of every method that follows. [rows 7]
- Fig 2 (static): the Bradley-Terry sigmoid, P(A≻B) vs score gap, two marked points (gap≈0 → 0.5; large gap → ~1). 
- {/* Reader can now: read "preference = sigmoid of a score difference" and predict the curve's shape. */}

**3. The first recipe: RLHF and PPO.** The three-stage pipeline (InstructGPT). Introduce the RL vocabulary one rung at a time, each with a metaphor, because section 4 (DPO) depends on the reader holding all of it:
  1. SFT (the starting model, the "reference" we'll keep coming back to).
  2. Reward model = a learned judge: it watches the human's picks and learns to predict which output the human would prefer (a stand-in grader so we don't need a human in the loop for every step).
  3. Rollout = the model tries answers; the judge scores them.
  4. Critic / advantage = a second network guessing the expected score from a state, so "advantage" is the extra credit an answer earned over what was expected. (This is the piece GRPO later deletes.)
  5. PPO's clipped step = take a bounded step uphill on reward so one update can't blow up the model.
  6. KL leash = a penalty for drifting from the SFT model, so the model doesn't chase reward into gibberish (InstructGPT: "a per-token KL penalty from the SFT model"). Seed here the idea that matters for DPO: the model is always measured RELATIVE TO a frozen reference (the SFT model).
  The payoff/throughline number: a 1.3B RLHF model beat 175B GPT-3. The cost: two extra networks (reward model + critic), online sampling, and a process the DPO authors describe as needing careful tuning to stay stable. [rows 1,2,3,4,5,6,30]
- Fig 3 (static): RLHF three-stage pipeline, human sits in stage 2 (the comparison), PPO loop with the reward model, the critic, and the KL leash to the SFT model all drawn.
- {/* Reader can now: name the three RLHF stages, define reward model / critic / advantage / KL leash, and see that everything is measured against a frozen reference. */}

**4. The shortcut: DPO.** The key insight (the "secretly a reward model" trick): the optimal RLHF policy is itself an implicit reward model — the implicit reward is β·log(π/π_ref). So you can skip the reward model AND the RL loop and train directly on preference pairs with one classification loss. Collapse the whole apparatus into a single gradient step. [rows 8,9]
- Fig 4 (static): DPO collapses the loop — left: RLHF's reward-model + PPO-rollout loop; right: DPO's single classification step on (chosen, rejected). Same inputs, far less machinery.
- Fig 5 (static): DPO loss anatomy — the annotated equation. Label the log-sigmoid (Bradley-Terry, callback to Fig 2), β (how hard to move), the chosen/rejected log-ratios, the frozen reference π_ref, the implicit reward.
- {/* Reader can now: read the DPO loss term by term and say what β and π_ref do. */}

**5. The β leash (direction matters — get it right).** β is the same KL-strength dial from RLHF, now living inside the DPO loss. The literature's direction (and how to state it): **high β = strong leash = the model stays close to the SFT reference (small deviation); low β = loose leash = the model is free to drift far to fit the preferences, and can overfit or degrade.** This matches the quoted "β controls deviation from the base reference policy π_ref" (row 9): more weight on the leash → less deviation. (Note for drafting: do NOT say "high β fits preferences harder" — that's the inverted, wrong intuition Gate 1 caught. The implicit reward is β·log(π/π_ref), so a higher β means a small policy change already produces a big reward signal, so the model needs to move LESS.) [rows 8,9; sets up the caveat section] 
- Fig 6 (static-svg, re-typed from interactive at Gate 1): three side-by-side panels — low β (policy drifts far from the reference, chosen/rejected pushed wide apart, "overfit risk"), medium β (balanced), high β (policy hugs the reference, barely moves). The leash length shrinks left-to-right as β grows. Static three-state teaches low/med/high without a slider implying a precise dynamic simulation.
- {/* Reader can now: state correctly which way β moves the model relative to the SFT reference. */}

**6. Dropping the critic: GRPO.** First, place GRPO correctly: it lives in the advantage-estimation slot from section 3, downstream of the reward. It does NOT convert a verdict into a reward (that's the reward model / DPO's job); it assumes some reward already exists. PPO's critic is a second network roughly the size of the policy — expensive. GRPO removes it: sample a group of answers to the same prompt, score each, and use the group's mean as the baseline, so "advantage" is just how much better than your siblings you did. (In DeepSeek-R1 the reward is often a rule-based correctness check, not a preference model — a clean example that the reward source and the advantage estimator are separate choices.) This is what trained DeepSeek-R1 (peer-reviewed in Nature, 2025). [rows 6,10,11]
- Fig 7 (static): PPO (policy + separate critic estimating value) vs GRPO (one policy, sample a group, advantage = reward − group mean). The critic box is crossed out on the GRPO side; a small "reward source" box feeds both (label: reward model OR rule-based check).
- {/* Reader can now: explain how GRPO estimates advantage without a value network, and that GRPO is downstream of wherever the reward comes from. */}

**7. Where the verdict is not enough (the honest section).** Preference tuning is not a free lunch. DPO can overfit and PPO-style RLHF can still win (Xu 2024); which method wins depends on the setting (Shi 2025); GRPO has its own bias — it inflates response length, especially for wrong answers (Dr. GRPO; MO-GRPO reward hacking). No figure (prose; avoids dead weight). [rows 24,25,26]
- {/* Reader can now: name three concrete ways preference tuning can go wrong. */}

### Act 3 — The crossover to vision

**8. The same verdict, now on images (Diffusion-DPO).** Bridge the leap in explicit rungs (Gate 1 flagged this as a two-rung jump): (a) DPO's loss needs a likelihood ratio of chosen vs rejected under the policy and the reference (callback to Fig 5); (b) an image generator has no token log-probs to plug in there; (c) but a diffusion/flow model does expose a likelihood proxy — the training objective itself (the ELBO / the denoising-trajectory loss); (d) Diffusion-DPO swaps DPO's token-likelihood term for that ELBO term, so the winning image x⁺ has its denoising trajectory made more likely than the reference's and the loser x⁻ less likely. Trained on 851K Pick-a-Pic pairs, it beat base SDXL on human preference. Subtlety: standard DPO's sigmoid margin is mismatched to the regression nature of image generation (Linear-DPO) — it's not the clean mode-drop you see in LLMs. [rows 12,13,14]
- Fig 8 (static): explicitly map Fig 5's "chosen/rejected log-ratio vs π_ref" onto "winner/loser denoising trajectory vs the frozen reference model" — same skeleton, token-likelihood term replaced by the ELBO term. The mapping IS the figure.
- {/* Reader can now: say exactly which term in the DPO loss gets swapped to make it work on an image generator. */}

**9. The annotation insight: a cheap verdict beats authoring ground truth.** The expensive part of vision data is authoring the target (drawing a mask, modeling a 3D mesh). The cheap part is judging a model's proposal. In 2D, this already showed up as point-wise yes/no annotation at huge scale (Benenson, background analogy). The principle generalizes: don't make the human author the answer; make the model propose and the human give a cheap verdict (verify/rank/rate). In Gkioxari's CVPR 2026 talk she put it as "annotators only say yes or no" (her framing; the SAM 3D paper says verify/rank/rate). [rows 15 (narrow), 16 (background), 20]
- Fig 9 (static): left, an annotator painstakingly authoring a dense target (expensive); right, an annotator giving a thumbs verdict on model proposals (cheap). The asymmetry is the whole point.
- {/* Reader can now: explain why "judge a proposal" scales where "author the target" doesn't. */}

**10. The model-in-the-loop data engine (the GENERIC loop).** Tie the verdict to a loop, kept generic here — no SFT+DPO yet (that's SAM 3D-specific, section 11). SAM's original data engine (model proposes masks → humans verify/correct → dataset improves → model retrains) produced 1B masks. By 2026 it's a named pattern: SAM 3 uses MLLMs as AI annotators AND AI verifiers, more than doubling throughput. The model now both proposes and checks. [rows 17, 28]
- Fig 10 (static): the generic virtuous cycle — model proposes → human (and now AI) verifies/corrects/rates → dataset improves → model retrains → back to propose. NO "SFT+DPO" box here (reserved for Fig 12); this figure is purely the loop shape.
- {/* Reader can now: trace the generic data-engine loop and say what each arrow carries. */}

**11. The climax: SAM 3D.** Everything assembled, and the SFT+DPO recipe appears HERE for the first time on the data engine. 3D has a data barrier — you can't crowdsource 3D ground truth (SAM 3D's own framing: "breaking the 3D 'data barrier'", row 18; don't assert "hardest" in our voice). SAM 3D's answer: synthetic pretraining, then real-world alignment via SFT + DPO on cheap human verdicts (verify/rank/rate) over model-generated meshes, repeated as a data engine. Result: ~1M images / ~3.14M meshes, and at least a 5:1 human-preference win over prior work on real-world objects and scenes. (NOTE 2026-06-06 link audit: ship ONLY the combined "at least 5:1 ... on objects and scenes" — the separate 6:1-scenes figure is from the unfetchable PDF body and must NOT ship; see the audit comment above matrix row 23.) The throughline lands: one verdict — "this mesh, not that one" — scaled into a 3D foundation model. [rows 18,19,20,21,22,23]
- Fig 11 (static, SCHEMATIC): shape-quality preference (Elo) climbing across data-engine rounds, above a "retrieval baseline" line. Explicitly schematic — no numbers on the y-axis, caption says "schematic of the reported monotonic improvement; per-round values not published."
- Fig 12 (static): SAM 3D assembled — synthetic pretrain → SFT → DPO on verify/rank/rate verdicts → data-engine loop → at least 5:1 win. The reassembly figure; every earlier mechanism appears as a labeled block.
- {/* Reader can now: explain how the LLM preference-tuning loop became a 3D foundation model's data engine. */}

### Coda — where it's going (mid-2026)

**EXPANDED 2026-06-06** (Vic: "expand GSPO and Pref-GRPO instead of just mentioning... explain the math formula... search for better RL techniques and why better than GRPO"). The one-paragraph coda became two real sections, each with a figure and KaTeX math:

**11. The frontier, part one: GSPO.** Importance-sampling intuition (reuse stale samples, correct with a ratio) → GRPO applies it per token, variance compounds over length → collapse → GSPO uses one sequence-level ratio (length-normalized likelihood = geometric mean of token ratios). Each formula now an annotated color-coded SVG (Fig-5 style), not display KaTeX: Fig 13 = ratio anatomy (πθ/πold/exponent color-coded). Then a sibling-repairs paragraph: DAPO (clip-higher + dynamic sampling, "50 points on AIME 2024"), CISPO ("clips importance sampling weights rather than token updates"), Dr. GRPO (length bias, already in §6). [rows 31,32,33,34] Fig 13 (ratio anatomy) + Fig 14 (token-vs-sequence concept). {/* Reader can now: explain why per-token importance weighting destabilizes GRPO and how GSPO fixes it at sequence granularity. */}

**12. The frontier, part two: when the critic comes back (SAO).** ADDED 2026-07-10 (Vic: "add the GLM-team paper"). The post has been a story of REMOVING machinery: RLHF → DPO drops the reward model + RL loop → GRPO drops the critic. SAO (Hou et al, Tsinghua/Z.AI, arxiv:2607.07508, used to train GLM-5.2 750B-A40B) is the honest counter-beat: for the newest hardest setting, async agentic RL at scale, some machinery comes BACK. Rungs: (a) async RL trains as rollouts arrive, more efficient for long-horizon agentic tasks; (b) but GRPO's group-wise sampling is a synchronization barrier — the group waits for the slowest rollout, and many online/agentic settings only ever give ONE trajectory per prompt; (c) so SAO uses single-rollout sampling; (d) but one rollout has no group mean, so the section-5 baseline is gone and gradients are high-variance like REINFORCE; (e) SAO's answer: the value-model critic RETURNS (the thing §5's GRPO deleted), kept cheap via faster value updates (K=2) and Frozen-Attention; (f) plus DIS — token-level importance sampling that drops π_old and masks out-of-range tokens (a callback to §11's GSPO importance-sampling thread). Result on SAO's own async setup: stable ~1000 steps and beats GRPO (AIME2025 97.3 vs 84.2; SWE-Bench Verified 29.8 vs 27.0) while standard GRPO collapses ~160 steps. CAUTION: the collapse is SAO's reported async-regime result, NOT a claim GRPO is broken in general (§5/§11 established GRPO works). Ties back to §5 (dropping the critic) and §6 (not a free win). [rows 37-43] Fig 18 (async timeline: GRPO group barrier vs SAO streaming) + Fig 19 (the baseline's round trip: PPO critic → GRPO group mean → SAO critic returns, cheap). {/* Reader can now: explain why single-rollout async RL brings the critic back, and that GRPO's group baseline is a liability under aggressive async off-policy training. */}

**13. The frontier, part three: Pref-GRPO closes the loop.** (Renumbered from §12; the designed throughline LANDING stays last.) Flow-GRPO bridge first (ODE→SDE so a diffusion model yields a comparable group at all — closes the DPO→GRPO-variant gap a research sweep flagged) → GRPO advantage Â=(r−mean)/std → illusory advantage (tiny std blows up gaps → reward hacking) → Pref-GRPO swaps score for pairwise win rate w_i (Eq 12), std becomes real. Annotated SVG (Fig-5 style): Fig 15 = advantage anatomy (rᵢ/mean/std color-coded), Fig 16 = win-rate anatomy (indicator/Σ/normalizer color-coded). Throughline LANDS: the frontier threw the score away and went back to comparing two things, Bradley-Terry as referee. [rows 35,36] Fig 15 (advantage anatomy) + Fig 16 (win-rate anatomy) + Fig 17 (illusory-advantage concept). {/* Reader can now: explain how GRPO reaches a diffusion model and why pairwise win-rate beats pointwise score. */}

Research sweep (2026-06-06) covered DAPO, Dr.GRPO, CISPO, VAPO, GMPO, ProRL, Lite-PPO, REINFORCE++/RLOO (LLM) and DDPO, DPOK, D3PO, SPO, Diffusion-KTO, Flow-GRPO, DanceGRPO, MixGRPO, T2I-R1, DiffusionNFT (vision). Decision: GSPO stays the LLM headline (trains Qwen3); DAPO+CISPO named as siblings; Flow-GRPO added as the vision bridge. Skipped (would dilute): VAPO (value-based tangent), GMPO/ProRL/Lite-PPO (niche), DanceGRPO (video, post is image), DiffusionNFT (forward-looking ICLR'26 oral — candidate for a future note, not added). Closing throughline paragraph retained.
- {/* Reader can now: name what replaced GRPO at the frontier and why. */}

### Figure table

| # | Figure | Type | Mechanism | Reader notices |
|---|---|---|---|---|
| 1 | ImitationVsPreference | static-svg | SFT copies one demonstration; preference picks between two candidates | you can't author "taste" but you can compare |
| 2 | BradleyTerrySigmoid | static-svg | P(A≻B) = σ(score gap) | small gap → coin flip; big gap → near-certain |
| 3 | RlhfPipeline | static-svg | SFT → reward model → PPO, with KL leash; human in stage 2 | RLHF needs two extra networks + online sampling |
| 4 | DpoCollapsesLoop | static-svg | RLHF's RM+PPO loop vs DPO's single classification step | same inputs, far less machinery |
| 5 | DpoLossAnatomy | static-svg | annotated DPO loss: log-σ, β (reference-leash strength), chosen/rejected log-ratios, frozen π_ref, implicit reward | what each term in the loss does |
| 6 | BetaLeash | static-svg (re-typed at Gate 1, 2026-06-05: interactive→static, codex TYPE-CHANGE, auto-accepted per autonomous mandate; unlock-count 1) | three β panels: low β drifts far / high β hugs reference | which way β moves the model vs the SFT reference |
| 7 | GrpoDropsCritic | static-svg | PPO (policy + critic) vs GRPO (group mean as baseline) | advantage without a value network |
| 8 | DiffusionDpoTrajectory | static-svg | winner x⁺ pulled up / loser x⁻ pushed down over the denoise trajectory vs frozen reference | DPO adapted to a generator with no token log-probs |
| 9 | CheapVerdictVsGroundTruth | static-svg | authoring a dense target (expensive) vs judging a proposal (cheap) | judge-a-proposal scales; author-the-target doesn't |
| 10 | DataEngineLoop | static-svg | GENERIC loop: model proposes → human/AI verifies/corrects/rates → dataset improves → model retrains → loop (NO SFT+DPO box — that's Fig 12) | the virtuous cycle, arrow by arrow |
| 11 | SamThreeDEloClimb | static-svg (schematic) | preference/Elo rising across data-engine rounds above retrieval baseline | the loop compounds; SCHEMATIC, no numbers |
| 12 | SamThreeDAssembled | static-svg | synthetic pretrain → SFT → DPO on verdicts → data engine → at least 5:1 win | every earlier mechanism in one picture |
| 13 | GspoRatioAnatomy | static-svg (annotated equation, Fig-5 style) | color-coded GRPO per-token ratio vs GSPO sequence ratio: πθ (current model), πold (old model), ^(1/length) = geometric mean | what each symbol in the two ratios means |
| 14 | GspoTokenVsSequence | static-svg | GRPO's per-token ratios, each clipped, variance accumulates → collapse; GSPO's single length-normalized sequence ratio stays stable | why token-level correction destabilizes; sequence-level fixes it |
| 15 | SaoAsyncTimeline | static-svg | GRPO's group barrier (fast rollouts wait for the slowest before any training) vs SAO's single-rollout streaming (each trajectory trains the instant it finishes) | why group-wise sampling stalls async RL and single-rollout doesn't |
| 16 | SaoCriticRoundTrip | static-svg | the baseline's round trip: PPO learns a critic → GRPO deletes it for a group mean → SAO (single rollout, no group) brings the critic back, kept cheap (faster updates K=2, frozen attention) | the removed machinery returns for one of the hardest settings |
| 17 | GrpoAdvantageAnatomy | static-svg (annotated equation, Fig-5 style) | color-coded Â=(r−mean)/std: rᵢ (this reward), mean(r) (baseline), std(r) (spread, the divisor that backfires) | what each term in the GRPO advantage means; why ÷std is the trap |
| 18 | PrefGrpoWinRateAnatomy | static-svg (annotated equation, Fig-5 style) | color-coded wᵢ=1/(G−1)·Σ1(i≻j): indicator (pairwise verdict), Σ (count wins), 1/(G−1) (normalizer) | what each term in the win-rate means; ties to the §1 verdict |
| 19 | PrefGrpoIllusoryAdvantage | static-svg | near-identical pointwise scores ÷ tiny std → blown-up "illusory" advantages (reward hacking); pairwise win rates spread 0-1 → honest advantages | the pairwise verdict returns to settle the frontier |

NOTE (2026-07-11): figures renumbered into reading order after §12 SAO insertion. SAO figs are 15/16 (were 18/19); Pref-GRPO §13 figs are 17/18/19 (were 15/16/17). Internal SVG marker IDs (f18a, f19a) left as-is — they are unique and not reader-visible.

Figure-type locks: 19 static-svg, 0 interactive (Fig 6 re-typed interactive→static at Gate 1 — codex TYPE-CHANGE STRUCTURAL; a three-state static panel teaches low/med/high β without a slider implying a precise dynamic sim that could make the reader "feel" the wrong direction). Fig 11 is static-svg NOT plot — it's a schematic with no real per-round data, so the Plot primitive (which implies plotted data) would imply false precision. No `plot` figures: the Bradley-Terry curve (Fig 2) is a single fixed curve, cleaner as static SVG.

## Codex research review

**Gate 0 fired 2026-06-05** (codex consult, gpt-5.5, internet-enabled). Outcome: **8 STRUCTURAL findings, all fixed**; 3 cosmetic notes. Codex confirmed both originally-suspect IDs are real and found no fabricated quotes. The two highest-value findings: (1) the "annotators only say yes/no" climax was overclaimed for SAM 3D (paper supports verify/rank/rate, not binary-only) — reframed, with yes/no kept only as Gkioxari's attributed talk framing; (8) the matrix was one-sided on DPO/GRPO — added three verified counterweight rows (DPO can underperform PPO; method-wins-depends-on-misspecification; GRPO length bias). Also: row 11 re-cited to the Nature 2025 DeepSeek-R1 (within the 12-month bar), row 6 reattributed to the GRPO-vs-PPO comparison, row 20 re-cited to the Meta blog, rows 15/16 narrowed, Elo climb locked to schematic with no per-version or figure numbers.

Full findings + resolution: [notes/preference-tuning-vision-models-codex-research-20260605.md](preference-tuning-vision-models-codex-research-20260605.md). Findings: 8 STRUCTURAL (fixed), 3 COSMETIC.

**Gate 0 ran 3 invocations (the cap), now CLOSED.** Inv 2: 7/8 closed, caught row-21 source mismatch (fixed). Inv 3: all substantive items confirmed closed (row 21, counterweight recency, row 19 SAM-3D-uses-DPO consistency, new rows 27-29 GSPO/SAM 3/Pref-GRPO all sound); one last structural — row 29's "now routine in generative vision" overclaim — narrowed to "a fresh example" per codex's prescribed fix, plus the final stray figure-number reference removed. No 4th adversarial pass run (at cap; remaining items were trivial wording fixes codex itself specified). Matrix is sound for drafting: 29 rows, every load-bearing claim quoted, counterweights present so the post can't read as "preference tuning is monotonically dominant."

## Codex outline review

**Gate 1 fired 2026-06-05** (codex consult, gpt-5.5, internet-enabled). Outcome: **9 STRUCTURAL + 1 TYPE-CHANGE STRUCTURAL, all addressed**; 1 cosmetic. Highest-value catch: the β direction was inverted in §5/Fig 6 (I had "high β fits preferences harder" — wrong; corrected to high β = tight leash = stays near the SFT reference). Other fixes: GRPO placed correctly downstream of the reward (it doesn't convert verdicts to rewards); §3's RL vocabulary broken into six metaphor-rungs that set up DPO; Fig 10 made the GENERIC data-engine loop with SFT+DPO reserved for the SAM 3D-specific Fig 12; §8's LLM→vision leap bridged in 4 rungs; §12's CVPR overclaim narrowed; "3D data barrier" re-attributed to SAM 3D. Added matrix row 30 (InstructGPT KL penalty) to back the "KL leash." TYPE-CHANGE: Fig 6 re-typed interactive→static (three-state β panel), auto-accepted per the autonomous mandate (re-type is toward the static default + codex-recommended).

Full findings + resolution: [notes/preference-tuning-vision-models-codex-outline-20260605.md](preference-tuning-vision-models-codex-outline-20260605.md). Findings: 9 STRUCTURAL + 1 TYPE-CHANGE (addressed), 1 COSMETIC.

## Codex final review

**Gate 2 fired 2026-06-05** (codex consult, gpt-5.5, internet-enabled, full MDX + notes). Outcome: **11 STRUCTURAL + 4 COSMETIC, all addressed**; re-run pending. Highest-value catch: a genuine DPO implicit-reward inconsistency (Fig 5 labeled the bare log-ratio as "the implicit reward" and the caption said "log-prob divided by log-prob" — both wrong; the implicit reward is β·log-ratio). Also fixed: the SAM 3D "exact DPO" overclaim (it's the pattern adapted to a generative objective), an unsourced CVPR video-gen claim in the coda (cut), the reward-model-is-policy-sized drift (only the critic is), the "InstructGPT was first" conflict with Stiennon, the causal "bought a 100x scale-up" overclaim, "hardest data gap" (re-attributed), three matrix freshness annotations, the bare Bradley-Terry citation (hyperlinked), and an unsupported human-allocation clause. Cosmetic: added the missing image-generators-vision-models prose link (hard rule 11), softened binary-SAM-3D wording in the dek/§1.

Full findings + resolution: [notes/preference-tuning-vision-models-codex-final-20260605.md](preference-tuning-vision-models-codex-final-20260605.md). Findings: 11 STRUCTURAL + 4 COSMETIC (all addressed).

## Resume here

Last touched: 2026-07-10.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | done (Gate 0 closed; +2026-06-06 sweep rows 31-36; +2026-07-10 SAO paper rows 37-43, primary PDF + external-analysis scan) | `## Research notes`, `## Claim-source matrix` |
| 3. Outline + figure list | done (Gate 1 closed; coda §11 GSPO + §13 Pref-GRPO; +2026-07-10 new §12 SAO, Pref-GRPO renumbered §12→§13, +Figs 18-19) | `## Outline` |
| 4. Draft prose | done (+2026-07-10 §12 SAO: single-rollout async RL brings the critic back; the counter-beat to §5) | `src/content/blog/preference-tuning-vision-models/index.mdx` |
| 5. Implement figures | done (19/19, all static; +2026-07-10 Fig 18 async timeline, Fig 19 critic round trip) | per-figure table below |
| 6. Playwright review | done (19/19 pass; Figs 18-19 verified clean, on-palette, no overflow) | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | Gates done; +2026-07-10 SAO-section codex review CLEAN after fixes; awaiting hero + Vic's draft flip | hero image, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-06-05 | 0 (research) | structural-fixed, CLOSED after 3 invocations (8+1 STRUCTURAL fixed) | `## Codex research review` / notes/preference-tuning-vision-models-codex-research-20260605.md |
| 2026-06-05 | 1 (outline) | structural-fixed, CLOSED after 2 invocations (9 STRUCTURAL + 1 TYPE-CHANGE; β direction confirmed correct by codex on re-run; last Fig-10-table-row dedup fixed) | `## Codex outline review` / notes/preference-tuning-vision-models-codex-outline-20260605.md |
| 2026-06-05 | 2 (final) | structural-fixed, CLOSED after 2 invocations (11 STRUCTURAL + 4 cosmetic; inv 2 confirmed MDX fully clean incl. DPO math consistency; only a notes-only stale line remained, fixed) | `## Codex final review` / notes/preference-tuning-vision-models-codex-final-20260605.md |
| 2026-06-06 | post-publish link audit follow-up (base 3e7a8d9) | 2 P2 fixed (851K attributed to Diffusion-DPO not Pick-a-Pic; stale "6:1 scenes" purged from notes Outline) | inline, commit 50aaf57 |
| 2026-06-06 | coda-expansion review (base 50aaf57) | 2 P2 fixed (GRPO does not "multiply" token ratios → reworded §11 + reworked Fig 13 to per-token clipped ratios; Flow-GRPO bridge reason corrected from "no group" to "deterministic ODE is not a stochastic policy" → rewrote bridge); RE-REVIEW CLEAN (commit 02d035e): "factual claims internally consistent... math/SVG parses successfully" | inline, commits c8f0d8f→02d035e |
| 2026-06-06 | math-anatomy review (base 50aaf57) | CLEAN, no findings (commit bd09a97): "added MDX and note updates are internally consistent, bun run build completes... no discrete correctness issue." Replaced 4 display-KaTeX formulas with color-coded annotated SVG equation figures (Figs 13/15/16, Fig-5 style); concept figures renumbered 13→14, 14→17 | inline, commit bd09a97 |
| 2026-06-06 | formula re-verification vs papers (Vic: "make sure we are representing the correct one") | All 4 coda formulas confirmed EXACT against sources: GSPO ratio = Eq 7 of 2507.18071 (sᵢ=(πθ(yᵢ\|x)/πθold)^(1/\|yᵢ\|), written by the paper as exp((1/\|yᵢ\|)Σlog[...]) = geometric mean, paper does NOT use term "geometric mean" so we state it as a math fact only); GRPO advantage = DeepSeekMath §4.1.2 ((r−mean)/std, std-division is standard not optional); win rate = Pref-GRPO Eq 12; win-rate advantage = Eq 13. FIX: §5+Fig 7 had simplified GRPO advantage to "score−mean" (dropped /std) → corrected to "(score−mean)/spread" for consistency with the verified coda | inline, commit db073c0 |
| 2026-06-06 | consistency-fix codex double-check (base 50aaf57) | CLEAN, no findings (commit db073c0): "builds successfully... no discrete correctness issues... would not break the site or materially mislead readers." Both passes complete (paper-verify + codex). | inline, commit db073c0 |
| 2026-07-10 | SAO-section review (codex exec, gpt-5.5 via Bedrock, base HEAD~1) | 4 findings, all fixed: (1) "GPUs idle" softened to "fast rollouts stalled" / "no group barrier"; (2) Frozen-Attention drift — "freezes most of the critic"/"expert layers" → "freezes part"/"attention modules"/"MoE projections" (matches paper); (3) exact model ID Qwen3-30B → Qwen3-30B-A3B; (4) stale notes §12→§13 Flow-GRPO row. Codex confirmed GRPO caveat present + not undercut, Fig 18/19 labels match, bun run build passes. | inline, commit a5f11ea |
| 2026-07-11 | Fable adversarial review (whole post, focus §12 SAO) | 9 findings, all applied. CORRECTNESS: C1 "pushes it further" mischaracterized SAO-vs-GSPO (rewrote to parallel token-level treatment); C2 ELBO "closely" → "lower bound"; C3 "twelve orders of magnitude" false precision → "worlds apart"; C4 misquote "can stably train" → exact "is able to train stably"; C5 SAM 3D verify/rank quote linked to blog not arxiv. CLARITY: I1 figures renumbered into reading order (SAO 18/19→15/16, Pref-GRPO 15/16/17→17/18/19); I2 added throughline anchor to §12 ("none of this touched the verdict... furthest from the pairwise verdict"); I3 added running-mean ablation (79.8 vs 97.3) to justify full critic; I4 "across the board" → "strongest GRPO baseline on both". NITS: "hardest"→"one of the hardest", "GLM team's" reattributed, clip/mask disambiguated. Fable confirmed §5→§12 critic round-trip sound + well-sourced. bun run build passes; voice-check clean. | inline, commit (this turn) |

### Phase 5 figure progress (populate at end of phase 3)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | ImitationVsPreference | static-svg | done | figs 1-6 |
| 2 | BradleyTerrySigmoid | static-svg | done | figs 1-6 |
| 3 | RlhfPipeline | static-svg | done | figs 1-6 |
| 4 | DpoCollapsesLoop | static-svg | done | figs 1-6 |
| 5 | DpoLossAnatomy | static-svg | done | figs 1-6 |
| 6 | BetaLeash | static-svg (re-typed at Gate 1) | done | figs 1-6 |
| 7 | GrpoDropsCritic | static-svg | done | figs 7-12 |
| 8 | DiffusionDpoTrajectory | static-svg | done | figs 7-12 |
| 9 | CheapVerdictVsGroundTruth | static-svg | done | figs 7-12 |
| 10 | DataEngineLoop | static-svg | done | figs 7-12 |
| 11 | SamThreeDEloClimb | static-svg (schematic) | done | figs 7-12 |
| 12 | SamThreeDAssembled | static-svg | done | figs 7-12 |
| 13 | GspoRatioAnatomy | static-svg (annotated eqn) | done | math-anatomy figures 2026-06-06 |
| 14 | GspoTokenVsSequence | static-svg | done | coda expansion 2026-06-06 |
| 15 | SaoAsyncTimeline | static-svg | done | SAO section 2026-07-10 (renumbered 18→15 on 2026-07-11) |
| 16 | SaoCriticRoundTrip | static-svg | done | SAO section 2026-07-10 (renumbered 19→16 on 2026-07-11) |
| 17 | GrpoAdvantageAnatomy | static-svg (annotated eqn) | done | math-anatomy figures 2026-06-06 (renumbered 15→17) |
| 18 | PrefGrpoWinRateAnatomy | static-svg (annotated eqn) | done | math-anatomy figures 2026-06-06 (renumbered 16→18) |
| 19 | PrefGrpoIllusoryAdvantage | static-svg | done | coda expansion 2026-06-06 (renumbered 17→19) |

### Suggested next batch

Phases 1-6 + all Gates DONE. Draft + all 19 figures landed; playwright review passed (figures on-palette, legible, no overlap; only benign height="auto" console notices, matching house convention). SAO section (§12) added + codex-reviewed CLEAN 2026-07-10. Next: Phase 7 ship steps (Vic-owned).
1. Hero hand-off: compose the hero prompt, surface to Vic (post stays draft:true; Vic supplies image + ships).
2. Final voice-check (passes clean as of 2026-07-10). Vic flips draft:false himself.

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
