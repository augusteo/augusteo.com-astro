# The scout mindset, applied

A mechanism-first take on Julia Galef's 2021 book *The Scout Mindset*. Not a book review. The post tries to make the reader feel *why* soldier mode is the default — by walking the empirical literature on motivated reasoning, identity-protective cognition, and prediction tournaments — then hands over a small toolkit of moves that operationalize scout mode on a belief they actually hold.

## Spec

**Audience.** Numerate knowledge workers who have to decide under uncertainty: engineers, founders, analysts, researchers. Already sympathetic to the rationalist-adjacent vocabulary (calibration, base rates, updating), but not steeped in it. The post should reward someone who has read Kahneman or Tetlock once and wants the *moves*, not the motivation. Lean technical; do not soften.

**Walk-away.** By the end the reader can:

1. Name the **three empirical asymmetries** in evidence-processing soldier mode rests on (Lord/Ross/Lepper biased assimilation, Ditto/Lopez asymmetric evidentiary thresholds, Kahan identity-protective cognition framework) **plus the social-architectural roots** (Mercier/Sperber argumentative theory, Trivers self-deception). These are different kinds of finding; the post does not flatten them into "four asymmetries".
2. Hold a precise position on motivated numeracy. Kahan's ICT framework is influential and the source of "more numerate people can be more biased on politicized topics". Both the empirical robustness (Persson et al. 2021 found no good evidence under preregistered replication; Connor et al. 2024 replicated the basic effect but not the high-numeracy amplification) and the mechanistic interpretation (Glüer-Pagin & Spectre 2025: there is motivation to reason but not motivated reasoning in Kahan's sense) are contested. The post does not claim "mechanism real, dose-response contested". It says: the result is influential and the field is still arguing about both the size and the explanation.
3. Run the **five self-tests Galef proposes in Chapter 5** ("Noticing Bias"): Double Standard, Outsider, Conformity, Selective Skeptic, Status Quo Bias. The post paraphrases Galef's terminology rather than quoting verbatim, since Phase 2 verification could not pull verbatim chapter text from the published book within budget; Phase 7 should re-verify and the prose updates if any name or prompt shifts.
4. State the corrected GJP result honestly: in the IARPA Good Judgment Project, an algorithmically-aggregated forecast (the GJP "best method", per Goldstein et al.'s GJP-vs-ICPM technical paper) beat the U.S. Intelligence Community Prediction Market on a one-year unclassified-question Brier-score benchmark. AOMT (alongside fluid intelligence, political knowledge, training, teaming, deliberation time, and update frequency) was a predictor of individual forecaster accuracy in Mellers et al. 2015 *JEP: Applied*. Whether the Mellers-2014 *interventions* (training, teaming) caused additional gains versus selecting for already-skilled forecasters is contested by Hauenstein et al. 2025. The post does NOT claim "elite teams beat the CIA by 25-30%" — that is journalistic shorthand of a more carefully-documented result.
5. Write down the smallest scout-mode habit they could keep this week, knowing it's the one move every primary source agrees on: record disconfirming evidence the moment it shows up. Darwin called it his golden rule.

**Walk-away test.** If a reader who finishes the post can't articulate the difference between "I disagree with X" and "I rate the evidence for X at p=0.4", the post failed.

**Topic-evolution classification.** Stable for the foundational mechanism citations (Lord/Ross/Lepper 1979, Kunda 1990, Ditto/Lopez 1992, Trivers 2011, Mercier/Sperber 2017, Baron AOMT scale). Recency bar is 18 months for *current-state* applied claims. Within-bar current-state material in the matrix: Hauenstein et al. 2025 (Dec 2024), Glüer-Pagin & Spectre 2025, Nature Human Behaviour 2025 systematic review on educational debiasing. Older replications (Persson 2021, Connor 2020/2024) are reclassified as foundational replication-context, not current-state.

**Honest sourcing gap.** Areas the matrix flags rather than overclaims:

- No recent (≤ 18 months) RCT specifically validating *scout-mindset training* as a package. The post leans on Mellers 2015 *JEP:Applied* and the Morewedge-family debiasing work, plus the new Nature 2025 systematic review which finds small average educational-intervention effect (*g* = 0.26) and unresolved real-world transfer.
- Galef-2021 quotes are verified via secondary outlines (publisher excerpts, EA Forum, LessWrong) rather than via direct primary text. The matrix paraphrases rather than quotes; Phase 7 should pull verbatim text and tighten.
- Goldstein et al. PDF (the source for the GJP-vs-ICPM Brier-score numbers) is access-restricted in Phase 2 verification. The matrix uses Codex-Run-2-cited numbers (ICPM .23 / GJP-best .15 etc.) provisionally and flags Phase 7 to verify.

**Length.** Roughly a 30-minute read. About 7,000-9,000 words including figure captions.

**Figure mix.** 100% static SVG. Eight to ten candidates listed in the Outline section once Phase 3 locks them. None currently meet the four interactive override clauses; reconsider only if Gate 1 surfaces a STRUCTURAL finding requiring a re-type.

**Voice anchors.** Density over accessibility-padding. Concrete nouns. No hedge-and-balance on claims the literature actually settles. Sentence-case headings. Em dashes: zero. Match the rhythm of `unified-vision-stack` and `omni-modal-stack`.

## Throughline

**Lead candidate (locked, post-Gate-0-Run-2 corrected):** Phil Tetlock's Good Judgment Project, but framed honestly. The named, public, citable scenario is: in the IARPA Aggregative Contingent Estimation tournament, the GJP's best-performing aggregation method (the "All Surveys Logit" aggregator, per Goldstein et al.'s GJP-vs-ICPM technical paper) outperformed the U.S. Intelligence Community Prediction Market on a one-year unclassified-question Brier-score benchmark (ICPM .23 vs GJP-best .15 in 0-to-2-range Brier scoring; numbers cited from Codex Run-2 reading of the Goldstein paper, pending Phase 7 verbatim verification). AOMT, alongside fluid intelligence, political knowledge, training, teaming, deliberation time, and frequent updating, was one predictor of individual forecaster accuracy (Mellers et al. 2015 *JEP: Applied*).

**Important honest framing.** The throughline drops the journalistic shorthand "GJP elite teams beat the CIA by 25-30%". That phrasing conflates two things: (a) a comparison of *aggregation methods* (Goldstein) where the best GJP aggregator beat the ICPM, and (b) the Mellers 2014 claim that teaming/training caused individual gains, which Hauenstein 2025 specifically contests. The post separates these. The aggregation result holds. The individual-causal-mechanism story is open.

The throughline threads as follows:

- **Act 1 opens** on the GJP-aggregator-vs-ICPM result as a paradox: how does a reasonably-aggregated open tournament beat a market populated by intelligence analysts with classified-information access? Set up the puzzle by walking what the soldier defaults look like (the three asymmetries + social architecture) — these explain why intelligence professionals, who are smart, can still lose to a calibrated probabilistic aggregation.
- **Act 2 returns** to the GJP repeatedly to ground each mechanism. AOMT is one dispositional finding among several. Brier score is the metric that makes "calibration" measurable. Frequent updating is one behavior associated with accuracy. Each Act-2 section closes by tying the mechanism to a property of the system that beat the ICPM (calibrated probabilistic outputs, frequent updating, deliberation time) — explicitly framed as "systems that force calibrated updating tend to beat unaided institutional judgment", not "scouts beat soldiers".
- **Act 3 reassembles** at personal scale: what one belief, one calibration habit, one update routine gets you, even if you'll never join a tournament. Closes with the open question (Hauenstein) as a model of scout-mode behavior at the field level — the science is still arguing about itself. Then the smallest move every primary source agrees on: write the disconfirming thing down the moment you see it. Darwin in 1887, GJP forecasters in 2026, you on Monday.

**Recurring vignette inside Act 1:** Charles Darwin's "golden rule," verbatim from his 1887 autobiography. Darwin and the GJP forecasters built the same kind of system, separated by 130 years. The Darwin quote is one of the few primary-source verbatim passages in the post.

**Throughline number watchlist** (each gets a matrix row):

- "GJP best aggregation method beat ICPM on Brier" → Goldstein et al. GJP-vs-ICPM technical paper (Brier scores cited at 0-to-2 scale; Phase 7 verbatim verify).
- "Top 2% tracked into elite teams from Year 1" → Mellers 2014 *Psychological Science*.
- "AOMT was one predictor of accuracy alongside cognitive ability, political knowledge, training, teaming, deliberation, updating" → Mellers 2015 *JEP:Applied*.
- "Whether training and teaming *caused* the individual-level gain is contested" → Hauenstein 2025.

If Phase 7 re-verification finds any number drifted from the source, the prose updates with the source.

## Research notes

Grouped by sub-topic, not by source. Quoted excerpts are verbatim from primary sources where marked; paraphrases are explicitly marked as paraphrases. Access date: 2026-05-07 throughout.

### Sub-topic 1: why soldier mode is the default — three asymmetries plus the social architecture

The literature decomposes soldier-mode reasoning into two distinct kinds of claim: (a) **three asymmetries** in how evidence is processed, and (b) the **evolutionary/social-architectural roots** that explain why those asymmetries are the default. The post does not flatten these into a single "four asymmetries" list — they're not the same kind of finding.

**Asymmetry A — directional goals bias which information is retrieved (Kunda 1990).**

> "Directional goals affect reasoning by affecting which information will be considered in the reasoning process."
>
> — Kunda, Z. (1990). "The Case for Motivated Reasoning." *Psychological Bulletin* 108(3): 480-498. PubMed PMID 2270237. Open PDF at fbaum.unc.edu/teaching/articles/Psych-Bulletin-1990-Kunda.pdf.

**Asymmetry B — identical evidence polarizes rather than converges (Lord, Ross, Lepper 1979).**

> "The result of exposing contending factions in a social dispute to an identical body of relevant empirical evidence may be not a narrowing of disagreement but rather an increase in polarization."
>
> — Lord, C. G., Ross, L., & Lepper, M. R. (1979). "Biased Assimilation and Attitude Polarization." *JPSP* 37(11): 2098-2109.

**Asymmetry C — preferred conclusions face lower evidentiary thresholds (Ditto & Lopez 1992).**

> "Information consistent with a preferred conclusion is examined less critically than information inconsistent with a preferred conclusion, and consequently, less information is required to reach the former than the latter."
>
> — Ditto, P. H. & Lopez, D. F. (1992). "Motivated Skepticism: Use of Differential Decision Criteria for Preferred and Nonpreferred Conclusions." *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568.

**Identity-protective cognition framework (Kahan et al. 2017) — and its substantial replication / interpretation pressure.** Kahan's ICT framework is the influential source of "more numerate people can be more biased on politicized topics". The empirical and conceptual robustness of this specific result is contested.

> "Contrary to the prediction of SCT [science comprehension thesis], such polarization did not abate among subjects highest in numeracy; instead, it increased, supporting ICT [identity-protective cognition], which predicted that more numerate subjects would use their quantitative-reasoning capacity selectively to conform their interpretation of the data to the result most consistent with their political outlooks."
>
> — Kahan, D. M., Peters, E., Dawson, E., & Slovic, P. (2017). "Motivated Numeracy and Enlightened Self-Government." *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992.

Three pieces of replication and conceptual pressure on Kahan's specific claim:

> "We did not find good evidence for motivated numeracy; there are distinct patterns in our data at odds with the core predictions of the theory."
>
> — Persson, E., Andersson, D., Koppel, L., et al. (2021). "A preregistered replication of motivated numeracy." *Cognition* 214: 104768. PubMed PMID 34051421. DOI 10.1016/j.cognition.2021.104768.

> "We replicate the basic motivated numeracy effect, but we do not find evidence of increased polarization among high-numeracy participants."
>
> — Connor, P., Sullivan, E., Alfano, M., & Tintarev, N. "Motivated numeracy and active reasoning in a Western European sample." *Behavioural Public Policy*. Online publication 2020-09; published 2024. DOI 10.1017/bpp.2020.32.

> "[Kahan's mechanism] involve[s] plenty of motivation to reason, but no motivated reasoning."
>
> — Glüer-Pagin, K. & Spectre, L. (2025). "Where is the motivation in motivated numeracy?" *Review of Philosophy and Psychology*. DOI 10.1007/s13164-024-00737-w. Argues the numeracy effect does not support identity-protective motivated reasoning in the sense Kahan frames it.

The post will cite Kahan 2017 as the foundational frame for *the existence of identity-protective cognition as a candidate mechanism* (the broader idea that quantitative skill can be deployed in service of identity has not been overturned), but will hedge the *specific high-numeracy-amplifies-polarization claim* with Persson, Connor, and Glüer-Pagin & Spectre. The honest version: the result is influential, the field is still arguing.

**Social-architectural root A — self-deception serves outward deception (Trivers 2011).**

Trivers's central claim is that self-deception evolved as a mechanism that makes outward deception more credible — if the false belief is genuinely held, the deceiver transmits no involuntary tells. The book popularizes the argument with the line "the primary reason we fool ourselves is to fool others", a framing that recurs in interviews and reviews of the book. *(The Folly of Fools, Basic Books 2011; Phase 2 budget did not pull a page-locator-anchored verbatim quote from the book; the matrix carries this as book-level paraphrased citation.)*

**Social-architectural root B — reason is built for argument (Mercier & Sperber 2017).**

Mercier and Sperber's argumentative theory holds that reasoning evolved primarily to produce and evaluate arguments in a social/persuasive setting, not to help individuals arrive at better beliefs in isolation. Reason is, in their framing, "first and foremost a social competence". *(The Enigma of Reason, Harvard University Press 2017; Phase 2 budget did not pull a page-locator-anchored verbatim quote; matrix carries this as book-level paraphrased citation.)*

These six together — three asymmetries plus two social/evolutionary frames plus Kunda's directional-goals scaffolding — explain why being smart, well-read, or careful isn't enough on its own. Soldier mode is the architecture, not a glitch. The Kahan claim sits inside Asymmetry C plus the social/evolutionary frame; it is influential but the specific dose-response is unsettled.

### Sub-topic 2: the scout's measurable trait

**Actively open-minded thinking (AOMT) is operationalizable.** Baron's *Thinking and Deciding* defines it as a willingness to seek contrary evidence, weigh new information against held beliefs, tolerate complexity, and update in proportion to evidence. The published instrument originates with Stanovich & West (1997).

> "Actively open-minded thinking is characterized by a willingness to seek out and reflect on contrary evidence and an openness to changing one's mind in the face of contrary evidence. This style of thinking includes the tendency to weigh new evidence against a favored belief, to spend sufficient time on a problem before giving up, and to consider carefully the opinions of others in forming one's own."
>
> — Baron, J. *Thinking and Deciding* (4th ed., Cambridge University Press, 2008). *(Page locator not surfaced in budget; book-level citation.)*

**Brier score — convention note.** A forecast probability *p* of an event that did or didn't happen yields a squared error (*p* − *o*)². Brier's 1950 original formulation is on a 0-to-2 range for two-outcome forecasts. Modern GJP usage in Mellers et al. 2014/2015 reports Brier as a 0-to-1 mean over binary outcomes. **Important note for prose:** Goldstein et al.'s GJP-vs-ICPM paper reports Brier scores in 0-to-2 range (e.g. ICPM .23, GJP-best .15). The post must explicitly say which scale each cited number is on — the 0-to-2 in the GJP-vs-ICPM paragraph, the 0-to-1 binary form in any individual-forecaster paragraph.

> Brier, G. W. (1950). "Verification of Forecasts Expressed in Terms of Probability." *Monthly Weather Review* 78(1): 1-3. AMS journals.ametsoc.org. *(Original 1950 paper paywalled; modern usage from Mellers and Goldstein.)*

### Sub-topic 3: GJP findings, throughline numbers, and the Goldstein-vs-Mellers distinction

The Good Judgment Project is the post's empirical anchor. There are three distinct primary sources and they say different things:

- **Mellers et al. 2014** (*Psychological Science*): tested training, teaming, and tracking as drivers of individual forecaster accuracy. Top 2% of Year-1 forecasters were tracked into elite teams ("superforecasters").
- **Mellers et al. 2015 *JEP: Applied*** 21(1):1-14: lists the predictors of individual accuracy. AOMT/open-mindedness is one of several dispositional predictors (alongside cognitive ability and political knowledge); training and teaming are situational predictors; deliberation time and update frequency are behavioral predictors.
- **Mellers, Tetlock, Arkes 2015 *PPS*** 10(3):267-281: discusses identifying and cultivating superforecasters as a method. *Different paper; my pre-Gate-0 attribution conflated this with the JEP:Applied paper.*
- **Goldstein, Hartman, Comstock et al. (Good Judgment Inc. technical paper)**: a head-to-head comparison of GJP aggregation methods against the ICPM on a shared one-year unclassified-question benchmark. Reports Brier scores in 0-to-2 range. Codex Run 2 cites the following numbers from the paper (verbatim verification of these numbers is pending Phase 7 due to Phase 2 access restriction on the PDF): ICPM Markov-MMDB .23, GJP Prediction Market .21 (statistically comparable), GJP ULinOP .32 (worse), GJP "All Surveys Logit" / "best method" .15 (better). The paper itself caveats the "best method" comparison as ex-post selection.

**The "GJP elite teams beat the CIA by 25-30%" framing the public version of this story uses is journalistic shorthand.** It conflates: (a) Goldstein's algorithmic-aggregation comparison, (b) Mellers 2014's teaming/training intervention findings, and (c) the rhetorical "ICPM is the CIA" simplification. The post separates these. Goldstein supports the algorithmic-aggregation claim. Mellers 2014's teaming/training causal claim is what Hauenstein 2025 contests.

**Drivers of individual forecaster accuracy (Mellers JEP:Applied 2015).**

> "Key predictors of accuracy were dispositional variables of cognitive ability, political knowledge, and open-mindedness; situational variables of training in probabilistic reasoning and participation in collaborative teams that shared information and discussed rationales; and behavioral variables of deliberation time and frequency of belief updating."
>
> — Mellers, B., Stone, E., Atanasov, P., Rohrbaugh, N., Metz, S. E., Ungar, L., Bishop, M., Horowitz, M., Merkle, E., & Tetlock, P. E. (2015). "The psychology of intelligence analysis: drivers of prediction accuracy in world politics." *Journal of Experimental Psychology: Applied* 21(1): 1-14. DOI 10.1037/xap0000040. PMID 25581088.

AOMT/open-mindedness is one predictor among several. The post does not call it "the strongest"; the matrix and Spec are corrected.

**Top 2% tracked (Mellers 2014).**

> "The research tested and found support for three psychological drivers of accuracy: training, teaming, and tracking. Probability training corrected cognitive biases, encouraged forecasters to use reference classes, and provided forecasters with heuristics, such as averaging when multiple estimates were available. Teaming allowed forecasters to share information and discuss the rationales behind their beliefs. Tracking placed the highest performers (top 2% from Year 1) in elite teams that worked together."
>
> — Mellers, B., Ungar, L., Baron, J., et al. (2014). "Psychological Strategies for Winning a Geopolitical Forecasting Tournament." *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255.

**The Mellers 2014 causal claim is contested by Hauenstein et al. 2025.**

> "Using data from a geopolitical forecasting tournament, Mellers et al. (2014) concluded that forecasting ability was improved by allowing participants to work in teams and providing them with probability training. The authors reevaluated Mellers et al.'s conclusions using an item response theory framework that models latent ability from forecasting choices. They found that the relationship between latent ability estimates and forecast accuracy differed from the interpretation of the original findings once key extraneous variables were statistically controlled."
>
> — Hauenstein, C. E., Thomas, R. P., Illingworth, D. A., & Dougherty, M. R. (2025). "Rethinking the Role of Teams and Training in Geopolitical Forecasting: The Effect of Uncontrolled Method Variance on Statistical Conclusions." *Psychological Science* 36(1): 3-18. Online 2024-12-04. DOI 10.1177/09567976241266481.

*No published Mellers/Tetlock response to Hauenstein has been located as of 2026-05-07.* The post describes the state honestly.

### Sub-topic 4: trainability of debiasing — and the new systematic review

**Single-session debiasing (Morewedge 2015), per modality.** Game with personalized feedback + practice: ≥31.94% bias reduction immediately, ≥23.57% at 2-month follow-up. Video: ≥18.60% immediate, ≥19.20% at 2-month follow-up. Six biases tested: anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, representativeness.

> "Training with interactive computer games that provided players with personalized feedback, mitigating strategies, and practice, reduced six cognitive biases by more than 30% immediately and by more than 20% at least 2 months later."
>
> — Morewedge, C. K., Yoon, H., Scopelliti, I., Symborski, C. W., Korris, J. H., & Kassam, K. S. (2015). "Debiasing Decisions: Improved Decision Making With a Single Training Intervention." *Policy Insights from the Behavioral and Brain Sciences* 2(1): 129-140. DOI 10.1177/2372732215600886.

**Field-transfer (Sellier 2019, with corrigendum).** The original 2019 paper reported a 29% effect on a Shuttle-Challenger-modeled business case. The published corrigendum corrected this to **19%**.

> "Trained participants were 19% less likely to choose the inferior hypothesis-confirming solution than untrained participants."
>
> — Sellier, A.-L., Scopelliti, I., & Morewedge, C. K. (2019). "Debiasing Training Improves Decision Making in the Field." *Psychological Science* 30(9): 1371-1379. DOI 10.1177/0956797619861429.
>
> — Corrigendum: Sellier, A.-L., Scopelliti, I., & Morewedge, C. K. (2020). "Corrigendum: Debiasing Training Improves Decision Making in the Field." *Psychological Science*. DOI 10.1177/0956797620930211. The corrigendum corrects the original 29% figure to 19% (calculation error in the original); the qualitative conclusion is unchanged.

*(Phase 2 first-pass verification subagent could not find the corrigendum at this DOI; Codex Run 1 was correct; Phase 2 second verification subagent confirmed the 19% figure. The matrix uses 19% with the corrigendum cite.)*

**The 2025 Nature Human Behaviour systematic review** of educational debiasing interventions reports a small average effect across 41 studies and explicitly notes unresolved real-world transfer.

> Effect size: *g* = 0.26 (95% CI 0.14 to 0.39). "Questions remain about the depth and transferability of learning beyond classroom settings...more research is needed to determine whether these improvements translate to meaningful changes in real-world decision-making."
>
> — Swaryandini, G., Graham, J., Griffith, S., Grilo, V., et al. (2025). "Systematic review and meta-analysis of educational approaches to reduce cognitive biases among students." *Nature Human Behaviour*. DOI 10.1038/s41562-025-02253-y.

The post will cite Morewedge / Sellier / Swaryandini / Heerma van Voss together: single-session debiasing produces measurable short-term gains (Morewedge); field-transfer is real but modest (Sellier 19%, with corrigendum); the broader systematic-review picture across 54 RCTs / 10,941 participants in scope and 41-study/160-effect meta-analytic subset is small average effects (*g* = 0.26) with unresolved real-world transfer (Swaryandini 2025); a directly analyst-relevant 2025 study (Heerma van Voss et al., *Scientific Reports*) reports a one-shot intervention reducing confirmation bias in national risk analysts and students, closer to the post's analyst-debiasing scenario than the Morewedge college-student work. *(Heerma van Voss metadata pending Phase 7 verbatim verification.)* This is a more honest framing than "debiasing training works".

### Sub-topic 5: Galef's operationalization (post-Gate-0-Run-2 corrections)

**Scout / soldier dichotomy — paraphrased, not quoted.** Phase 2 verification could not pull verbatim chapter text from *The Scout Mindset* within the budget. The matrix carries paraphrased claims, not quoted excerpts; Phase 7 should pull verbatim text and tighten if any wording shifts. The terminology "scout mindset" and "soldier mindset" is canonical Galef vocabulary, well-corroborated across the publisher's promotional materials and Galef's interviews.

- **Scout mindset** (Galef 2021, paraphrased): the orientation that prioritizes seeing reality clearly over defending pre-existing beliefs; the motivation to map the world accurately rather than win an argument.
- **Soldier mindset** (Galef 2021, paraphrased): the orientation that defends pre-existing beliefs against threatening evidence; motivated reasoning where the subconscious goal is to defend a prior commitment.

> — Galef, J. (2021). *The Scout Mindset: Why Some People See Things Clearly and Others Don't*. Portfolio / Penguin Random House. *(Verified via publisher excerpts and Galef interview citations; verbatim chapter text not pulled in budget.)*

**The five self-tests in Chapter 5 — names paraphrased.** Galef's set is **five thought experiments in Chapter 5 ("Noticing Bias")**, not four in Chapter 6 as my pre-Gate-0 draft claimed. Names and operational definitions, paraphrased and verified across multiple secondary outlines (publisher excerpts, EA Forum, LessWrong):

- **Double Standard Test:** would I judge this evidence the same way if it pointed to a different conclusion?
- **Outsider Test:** if a stranger were in this situation, what would I advise them?
- **Conformity Test:** if other people no longer held this view, would I still hold it?
- **Selective Skeptic Test:** would I scrutinize this evidence as harshly if it supported the other side?
- **Status Quo Bias Test:** if I didn't already hold this position, would I adopt it?

> — Galef 2021, Chapter 5. *(Names and prompts verified via publisher previews and corroborating outlines on EA Forum and LessWrong; verbatim book text not directly accessed in Phase 2 budget; Phase 7 should re-verify and tighten wording.)*

**Trainability framing.** Galef's Introduction lays out a three-pronged development strategy: recognise alignment (truth doesn't conflict with goals), build practical skills (thought experiments, probabilistic reasoning, ways of engaging disagreement), appreciate emotional rewards. My pre-Gate-0 draft attributed a verbatim "actual behavioral change..." quote to the Introduction; Phase 2 verification could not locate this quote anywhere primary, so the matrix drops it.

> — Galef 2021, Introduction. *(Three-pronged framing verified via EA Forum / LessWrong outlines; specific verbatim quote my pre-Gate-0 draft used was unfindable in primary sources and is dropped.)*

**TED talk (2016).** The Dreyfus Affair opening (Esterhazy / Picquart) is the canonical setup Galef uses to frame the dichotomy publicly. Specific phrasings ("defends your viewpoint at all costs", "spurred by curiosity", "Do you yearn to defend your own beliefs or do you yearn to see the world as clearly as you possibly can?") are confirmed via TED summary and corroborating coverage. Full transcript not pulled verbatim in budget.

> — Galef, J. (2016). "Why you think you're right — even if you're wrong." TED2016. ted.com/talks/julia_galef_why_you_think_you_re_right_even_if_you_re_wrong.

**Verified podcast appearances** (for cross-reference, not primary citation): Sean Carroll's Mindscape #143 (2021-04-19), EconTalk (Russ Roberts), ClearerThinking podcast #36.

### Sub-topic 6: the historical seed (Darwin, Project Gutenberg eText #2010)

The single best historical primary source for the scout-mode operating procedure. Verbatim from Darwin's autobiography:

> "I had, also, during many years, followed a golden rule, namely, that whenever a published fact, a new observation or thought came across me, which was opposed to my general results, to make a memorandum of it without fail and at once; for I had found by experience that such facts and thoughts were far more apt to escape from memory than favourable ones. Owing to this habit, very few objections were raised against my views which I had not at least noticed and attempted to answer."
>
> — Darwin, C. *The Autobiography of Charles Darwin, 1809-1882*, ed. Nora Barlow (Collins, 1958), originally written 1876-1881, published posthumously in *The Life and Letters of Charles Darwin* (Francis Darwin, ed., 1887). **Project Gutenberg eText #2010.** Open at gutenberg.org/cache/epub/2010/pg2010-images.html and at darwin-online.org.uk.

This passage compresses the scout-mode operating procedure into one move: write the disconfirming thing down the moment it shows up, because the brain will lose it otherwise. The post returns to it as the closing image.

## Claim-source matrix

Every load-bearing claim the post will make traces to a row below. Format: `# | Claim | Source | Recency status`. All sources accessed 2026-05-07. Foundational citations are exempt from the 18-month bar with explicit annotation; current-state cites within 18 months pass the bar; older replication-context cites (Persson 2021, Connor 2024) are reclassified as foundational replication-context per Codex Run 2 finding.

| # | Claim | Source | Recency status |
|---|---|---|---|
| 1 | Galef paraphrased: scout mindset is the orientation that prioritizes seeing reality clearly over defending pre-existing beliefs (canonical Galef terminology). | Galef 2021, *The Scout Mindset* (publisher excerpts + Galef interviews). Matrix carries the paraphrase, not a quoted excerpt; Phase 7 to re-verify against book. | foundational (book terminology); paraphrased pending Phase 7 |
| 2 | Galef paraphrased: soldier mindset is the orientation that defends pre-existing beliefs against threatening evidence; motivated reasoning where the subconscious goal is to defend a prior commitment. | Galef 2021, ibid. Paraphrased. | foundational (book terminology); paraphrased pending Phase 7 |
| 3 | Galef proposes FIVE self-tests in Chapter 5 ("Noticing Bias"): Double Standard, Outsider, Conformity, Selective Skeptic, Status Quo Bias. Test names and prompts paraphrased. | Galef 2021, Ch. 5; verified via EA Forum, LessWrong, publisher previews. | foundational; paraphrased pending Phase 7 |
| 4 | Galef frames scout mindset as a learned set of practiced habits, not an innate temperament; Introduction lays out a three-pronged development strategy. | Galef 2021, Introduction; verified via secondary outlines. | foundational; paraphrased pending Phase 7 |
| 5 | Galef's TED 2016 opens on the Dreyfus Affair (Esterhazy / Picquart) as the canonical contrast between soldier and scout. | Galef 2016, TED2016; verified via TED summary and corroborating coverage. | foundational; summary-level verification |
| 6 | Darwin's "golden rule": record any fact opposed to general results "without fail and at once," because such facts "were far more apt to escape from memory than favourable ones." | Darwin 1887, *Autobiography*; **Project Gutenberg eText #2010** (corrected from prior #2087). | foundational |
| 7 | Darwin reported that the practice meant "very few objections were raised against my views which I had not at least noticed and attempted to answer." | Darwin 1887, ibid. | foundational |
| 8 | Directional goals bias *which* information is retrieved during reasoning, not just how it is weighted. | Kunda 1990, *Psychological Bulletin* 108(3): 480-498. PMID 2270237. | foundational |
| 9 | Subjects reading identical mixed evidence on a contested topic polarize further rather than converging — biased assimilation. | Lord, Ross, Lepper 1979, *JPSP* 37(11): 2098-2109. | foundational |
| 10 | Preferred conclusions face a lower evidentiary threshold than non-preferred ones; less information is required to reach the former. | Ditto & Lopez 1992, *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568. | foundational |
| 11 | Kahan's identity-protective cognition framework: the original 2017 paper reports that, on a politically loaded contingency table, more numerate subjects showed *greater* polarized interpretation. The post cites Kahan as the foundational frame for ICT *as a candidate mechanism*; the *specific* high-numeracy-amplifies-polarization claim is hedged via rows 22, 23, 24 (Persson, Connor, Glüer-Pagin & Spectre). | Kahan, Peters, Dawson, Slovic 2017, *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992. | foundational FOR the ICT framework's existence as a candidate mechanism; specific high-numeracy effect contested (rows 22-24) |
| 12 | Trivers paraphrased: self-deception evolved as a mechanism that makes outward deception more credible. | Trivers 2011, *The Folly of Fools*. Basic Books. *(Page locator not surfaced; book-level paraphrased citation.)* | foundational |
| 13 | Mercier and Sperber paraphrased: reasoning evolved primarily for social justification and persuasion in argument, not for solo truth-seeking. | Mercier & Sperber 2017, *The Enigma of Reason*. Harvard UP. *(Page locator not surfaced; book-level paraphrased citation.)* | foundational |
| 14 | AOMT is operationally a willingness to seek contrary evidence, weigh new evidence against held beliefs, tolerate complexity, and update accordingly. | Baron, *Thinking and Deciding* 4th ed. (Cambridge UP, 2008). *(Page locator not surfaced.)* | foundational |
| 15 | Brier score for a binary forecast in modern GJP usage is mean (p−o)² in 0-to-1 range; lower is better. Brier 1950 original is 0-to-2 for two-outcome forecasts. The Goldstein GJP-vs-ICPM paper reports Brier scores in 0-to-2 scale; the post will explicitly say which scale is in play whenever a Brier number appears. | Brier 1950 *MWR* 78(1): 1-3 (paywalled); modern usage from Mellers 2014/2015; 0-to-2 reading from Goldstein et al. | foundational metric; convention note explicit |
| 16 | In the GJP, key predictors of individual forecaster accuracy were cognitive ability, political knowledge, open-mindedness, training in probabilistic reasoning, team participation, deliberation time, and frequency of belief updating. AOMT/open-mindedness is one predictor among several; the post does not claim it is "the strongest". | Mellers et al. 2015, ***Journal of Experimental Psychology: Applied*** 21(1): 1-14. DOI 10.1037/xap0000040. PMID 25581088. | foundational/historical (2015 GJP findings; field-canonical) |
| 17 | Top 2% of GJP forecasters after Year 1, designated "superforecasters," were tracked into elite teams that worked together across years. | Mellers et al. 2014 *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255. | foundational |
| 18 | In Goldstein et al.'s GJP-vs-ICPM technical paper, the GJP's best-performing aggregation method (the "All Surveys Logit" aggregator) outperformed the U.S. Intelligence Community Prediction Market on a one-year unclassified-question Brier-score benchmark (0-to-2 scale; Codex Run-3 verified: ICPM .23, GJP-best .15). The paper itself notes the "best method" comparison is partly an ex-post selection. **The post does NOT claim "GJP elite teams beat the CIA by 25-30%"** — that public-version framing conflates the algorithmic-aggregation result with the (separately contested) Mellers-2014 individual-intervention claim. | Goldstein, Hartman, Comstock et al. (Good Judgment Inc. technical paper); URL goodjudgment.com/wp-content/uploads/2020/11/Goldstein-et-al-GJP-vs-ICPM.pdf. *(Codex Run 3 verified the .23 / .15 numbers and ex-post-selection caveat in the PDF.)* | foundational/historical (Goldstein technical paper); aggregation comparison verified |
| 19 | The Mellers 2014 claim that probability training and team participation directly *cause* gains in forecasting ability is contested by Hauenstein 2025: an IRT reanalysis found the effects shrank, vanished, or in some cases reversed once method-variance was controlled. | Hauenstein, Thomas, Illingworth, Dougherty 2025 *Psychological Science* 36(1): 3-18. Online 2024-12-04. DOI 10.1177/09567976241266481. | active-debate / 18-month / passes |
| 20 | Single-session debiasing-training intervention (game with personalized feedback + practice) reduced six biases by ≥31.94% immediately and ≥23.57% at 2-month follow-up. Video version: ≥18.60% immediate, ≥19.20% at 2-month follow-up. Six biases: anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, representativeness. | Morewedge et al. 2015 *Policy Insights from BBS* 2(1): 129-140. DOI 10.1177/2372732215600886. | foundational/historical (2015 applied study; field-cited as the canonical "single intervention" debiasing result) |
| 21 | Sellier 2019 field-transfer: trained participants 19% less likely to pick the hypothesis-confirming inferior solution than untrained participants on a Shuttle-Challenger-modeled business case. The original 2019 paper reported 29%; the published 2020 corrigendum corrects this to 19% (calculation error in original; qualitative conclusion unchanged). | Sellier, Scopelliti, Morewedge 2019 *Psychological Science* 30(9):1371-1379, DOI 10.1177/0956797619861429; corrigendum at DOI 10.1177/0956797620930211 (2020). | applied; corrected |
| 22 | Persson et al. 2021 preregistered replication of motivated numeracy: did not find good evidence for the effect under preregistered criteria; reports patterns at odds with core predictions. | Persson, Andersson, Koppel, et al. 2021. "A preregistered replication of motivated numeracy." *Cognition* 214: 104768. PMID 34051421. DOI 10.1016/j.cognition.2021.104768. | foundational replication-context (older than 18-month bar; reclassified per Codex Run 2 from "current-state") |
| 23 | Connor et al. 2020/2024 modified replication in a Western European sample: replicated the basic motivated-numeracy effect but did NOT find the high-numeracy-amplifies-polarization pattern. | Connor, Sullivan, Alfano, Tintarev. "Motivated numeracy and active reasoning in a Western European sample." *Behavioural Public Policy*. Online 2020-09; published 2024. DOI 10.1017/bpp.2020.32. | foundational replication-context (online-publication date 2020-09; pre-bar; reclassified per Codex Run 2) |
| 24 | Glüer-Pagin & Spectre 2025 conceptual critique: the motivated-numeracy effect involves "plenty of motivation to reason, but no motivated reasoning". The interpretation Kahan offers (identity-protective motivated reasoning as a distortion mechanism) is contested at the level of mechanism, not just empirically. | Glüer-Pagin, K. & Spectre, L. "Where is the motivation in motivated numeracy?" *Review of Philosophy and Psychology*. Online publication 2024-05-30; volume/issue dated 2025. DOI 10.1007/s13164-024-00737-w. | foundational/conceptual replication-context (online date 2024-05-30 is outside the 18-month bar; reclassified per Codex Run 3) |
| 25 | The 2025 systematic review of educational debiasing interventions includes 54 RCTs / 383 effect sizes / 10,941 participants in scope; the meta-analytic pooled effect is computed across 160 effects from a 41-study subset and reports *g* = 0.26 (95% CI 0.14-0.39), with unresolved transfer to real-world decision-making. | Swaryandini, Graham, Griffith, Grilo et al. (2025). "Systematic review and meta-analysis of educational approaches to reduce cognitive biases among students." *Nature Human Behaviour*. DOI 10.1038/s41562-025-02253-y. | current-state / 18-month / passes |
| 26 | Heerma van Voss et al. 2025 (*Scientific Reports*): a one-shot debiasing intervention applied to national risk analysts and students reduced confirmation bias. Closer to the post's analyst/debiasing scenario than Morewedge alone. | Heerma van Voss et al. 2025, *Scientific Reports*. *(Cite from Codex Run 3 reference; Phase 7 to verify exact authors, DOI, and abstract numbers.)* | current-state / 18-month / passes; Phase 7 to verbatim verify metadata |

Phase 7 to verify against original PDFs:

- Row 18 Brier numbers (Goldstein et al.): Phase 2 PDF access-restricted; Codex Run-2 cited values pending verbatim verification.
- Row 21 corrigendum content: confirmed exists at the cited DOI; verbatim text of the correction pending verbatim PDF access.
- Galef rows 1-4 (paraphrased): Phase 7 should pull verbatim chapter text from the published book and tighten the wording.
- Trivers row 12, Mercier/Sperber row 13, Baron row 14: page locators pending Phase 7 access to the books.

## Related posts on augusteo.com

Three topic-adjacent existing posts on augusteo.com worth weaving in. The new post does the linking; older posts are not retroactively edited.

- **`/blog/undoing-project`** — Lewis on Kahneman/Tversky. The book that created the field scout mindset operationalizes. Strongest topical overlap on augusteo.com.
  - Anchor point: opening setup of Act 1, where the post introduces why intelligent people fail at calibrated judgment. Inline link in the prose: name the post and link `[The Undoing Project](/blog/undoing-project)`. Galef's frame sits on top of Kahneman/Tversky's bias catalogue; the post can compress that history with one link instead of restating it.
  - Anchor point (secondary): the identity-protective cognition section, where Kahan's numeracy result echoes Kahneman's "fast thinking" being immune to expertise. Optional second link if it lands cleanly.

- **`/blog/fooled-by-randomness`** — Taleb on probability and survivorship bias. Builds the foundation for why calibrated probability is a rare skill.
  - Anchor point: Act 2's calibration / Brier-score section. Inline link: "If you've read [Fooled by Randomness](/blog/fooled-by-randomness), you've already met the case that the human mind isn't built for sophisticated probability." The Brier score is what you measure when you decide to build the muscle anyway.

- **`/blog/talking-to-strangers`** — Gladwell on default-to-truth misjudgment.
  - Anchor point: the identity-protective cognition section. The "default to truth" mechanism in Talking to Strangers is structurally similar to "default to defend identity" in soldier mindset — both are sensible adaptations that fail in narrow specific contexts. Inline link: "[Default to truth](/blog/talking-to-strangers) is one of these adaptations; default-to-defend-identity is another."

References-section format (full https URL): `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` for each.

The post is not a sequel to any of these — they're topical companions rather than predecessors — so no italic-dek-under-the-H1 framing. Inline links at the named anchor points + References-section entries are the full treatment.

## Outline

Three-act structure following `narrative-template.md`. Eight sections, ~900-1100 words each, ~8-10 figures total, all `static-svg` by default per `figure-recipes.md`'s static-default rule. Throughline (GJP-aggregator-vs-ICPM result + Hauenstein open question) threads through every act. Recurring vignette: Darwin's "golden rule" inside Acts 1, 3.

**Word budget:** ~7,500 words core prose + ~1,500 words figure captions + references = ~9,000 words total → ~30-min read.

**Per-section "what reader now sees" check** (per `narrative-template.md`'s Section-connection rule): each section has a one-line "Reader can now: …" target. The drafting phase will mirror these into HTML comments inside the MDX immediately after each section's last paragraph. If a target can't be written for a section, the section is rejected and reworked before the next.

### Act 1 — The puzzle

#### 1. The smallest interesting case: one belief, two updates

The post opens at the *individual* scale, per Vic's intuition-ramp principle (smallest interesting case first; each rung motivated by a failure of the rung below). A short worked example: a numerate person learns a single piece of evidence on a topic they have a prior commitment on. Imagine the same evidence reaching their inbox in two different framings — once with their political tribe's labels, once with no labels. They update very differently. This is Kahan's motivated-numeracy effect in miniature, with the framing the post will return to in Section 3.

This opener does three things at once: it gives the reader a personal stake, it previews the asymmetries Section 2 will catalogue, and it sets up Section 5's aggregation insight (one person's update is noisy; many people's calibrated updates aggregated are tighter).

**Reader can now:** identify a single belief in their own head whose update would change depending on how the evidence is framed; predict the rest of Act 1 will explain the systematic ways the brain does this.

**Figure 1** [static-svg]: Two-panel diagram. Same evidence, two framings (one neutral, one identity-loaded). Two prior beliefs and two posterior beliefs are sketched; the priors and posteriors move *toward* each other in the neutral framing and *apart* in the identity-loaded framing. *Mechanism shown:* the same brain runs two different update procedures depending on which framing it sees.

#### 2. The result that shouldn't be possible

Now the post zooms out from individual updates to the *institutional* result. Goldstein et al.'s GJP-vs-ICPM technical paper: the ICPM (Intelligence Community Prediction Market, populated by U.S. intelligence-community analysts) had a Brier of approximately .23 on a 0-to-2 scale on a one-year unclassified-question benchmark; the GJP's best aggregation method ("All Surveys Logit") landed at approximately .15 on the same benchmark. (The composition of the ICPM and the post's "intelligence analysts with classified-information access" framing comes from Tetlock's public statements on the GJP-vs-ICPM comparison; Phase 7 should pull a verbatim Tetlock or Goldstein passage describing ICPM participant composition. If the framing weakens under verification, the prose narrows.)

The post explicitly does *not* claim "scouts beat soldiers" or "amateurs beat the CIA". Section 2's frame: the actual finding is that an algorithmic combination of probabilistic forecasts beat a single market run by professionals. Why?

Closes by seeding Darwin's golden rule (1887) as a one-paragraph teaser — the historical case of an individual who built the kind of disciplined-disconfirmation system the rest of the post will catalogue.

**Reader can now:** restate the GJP-vs-ICPM result with the correct framing (algorithmic aggregation comparison, not "elite teams beat the CIA"); recognize that the post is pursuing the question "why does this aggregation help?" rather than "why are amateurs better than experts?".

**Figure 2** [static-svg]: Two-bar chart. ICPM ≈ .23 vs GJP-best ("All Surveys Logit") ≈ .15 on 0-to-2 Brier scale. Annotated with ex-post-selection caveat from the Goldstein paper. Subtitle clarifies the 0-to-2 convention so it doesn't collide with the 0-to-1 individual-forecaster convention used in Act 2. *Mechanism shown:* the empirical anchor that motivates the rest of the post.

#### 3. The three asymmetries (and the contested fourth case)

Walks **three** evidence-processing asymmetries the empirical literature pins on soldier-mode reasoning, then introduces Kahan's identity-protective cognition framework as a *contested fourth case* — distinct in kind from the first three, more recent, more disputed, and more interesting for the post's purposes.

The three asymmetries (each ~200 words + sub-figure):

a. **Directional goals bias what your search retrieves** (Kunda 1990). Not just *how* the brain weights evidence; *which* evidence it even surfaces.
b. **Identical evidence polarizes rather than converges** (Lord, Ross, Lepper 1979). The capital-punishment study. Same evidence, more polarized priors.
c. **Preferred conclusions face lower evidentiary thresholds** (Ditto & Lopez 1992). The medical-test-result study; longer scrutiny of unfavorable results, more retesting.

The contested fourth case (~250 words):

d. **Identity-protective cognition: a candidate fourth mechanism, contested** (Kahan et al. 2017). The original 2017 study reports that more numerate subjects, on identity-loaded data, polarize *more* not less. This would be the most striking asymmetry of the four if it held up cleanly. It hasn't: Persson 2021 (preregistered replication) found no good evidence under preregistered criteria; Connor 2024 replicated the basic effect but did *not* find the high-numeracy amplification; Glüer-Pagin & Spectre 2024 argue the mechanism Kahan posits doesn't quite fit ("plenty of motivation to reason, but no motivated reasoning"). The post will treat ICT as the candidate mechanism (the broader idea that quantitative skill is deployed in service of identity is plausible and not overturned) while explicitly hedging the specific high-numeracy-amplifies-polarization claim. **The post does NOT call this "the fourth asymmetry" — that flattens the empirical status. It is "the contested fourth case" and is presented as such throughout.**

The intuition payoff is sharper for being honest: smart people fail at calibrated judgment because the architecture of cognition is built around three robust asymmetries, plus a fourth case the field is still arguing about.

**Reader can now:** name the three robust asymmetries; explain the contested status of the fourth (Kahan ICT); predict that "just be more rational" doesn't survive the literature; explain what makes the Kahan case different in kind from the first three.

**Figure 3** [static-svg]: Four-panel composite figure. Panels a-c are the three robust asymmetries; panel d (Kahan ICT) is visually distinguished with a "contested" annotation overlay showing Persson/Connor/Glüer-Pagin & Spectre dissents in a footnote box. *Mechanism shown:* three settled mechanisms plus one contested case the post takes seriously without overclaiming.

#### 4. The architecture beneath: why the asymmetries are the default

A shorter, more theoretical section. The asymmetries from Section 3 are not bugs; they're features of the social architecture the brain runs on. Two primary frames:

- **Reason is built for argument** (Mercier & Sperber 2017, *The Enigma of Reason*). Reasoning evolved for justification and persuasion in argument, not for solo truth-seeking.
- **Self-deception serves outward deception** (Trivers 2011, *The Folly of Fools*). If the false belief is genuinely held, the deceiver transmits no involuntary tells.

Together: soldier mode isn't a personal failure; it's a social adaptation. **Implication that ties Act 3 to this section:** scout mode is a counter-program that requires both individual moves *and* a systems layer (precommitment, scoring, outside review, decision architecture) — a single reader running self-tests in their head can only get so far when the architecture is social. Act 3 will return to this implication and prescribe both individual and systems-layer moves explicitly.

Closes on Darwin's golden rule, fully quoted (the only verbatim primary-source long quote in Act 1). Darwin's contribution wasn't a self-test; it was an *artifact* — the notebook itself, an external system that survived his own forgetting. This is the bridge from "individual self-tests" to "systems-layer moves" Act 3 will pick up.

**Reader can now:** explain why the asymmetries don't go away with more education; predict that scout mode requires both individual self-tests AND a systems layer; recognize Darwin's notebook as an artifact-class counter-move.

**Figure 4** [static-svg]: A two-layer diagram. Top layer: the three asymmetries + the Kahan contested case. Bottom layer: the social architecture (argument/justification + self-deception) as the substrate. Right side: Darwin's golden rule passage with a sketched notebook artifact, labeled "an external system that survives the individual's own forgetting". *Mechanism shown:* the asymmetries are surface features of a deeper social-architectural substrate; Darwin's notebook is an artifact-class counter-move that the systems layer of Act 3 will generalize.

### Act 2 — The scout's measurable side

Act 2 stops feeling the problem and starts measuring it. Two sections.

#### 5. AOMT, Brier, and what calibration actually looks like

Two related ideas in one section.

a. **Actively open-minded thinking (AOMT)** is operationalizable. Baron's scale (1985, 1988; published instrument Stanovich & West 1997; canonical exposition in *Thinking and Deciding* 4th ed. 2008): willingness to seek contrary evidence, weigh new evidence against held beliefs, tolerate complexity, update in proportion. In the GJP, AOMT was one of several dispositional predictors of individual forecasting accuracy (Mellers et al. 2015 *JEP: Applied*) — alongside cognitive ability, political knowledge, training, teaming, deliberation time, and update frequency. The post does *not* call AOMT "the strongest predictor"; that's been my earlier overclaim and is corrected here.

b. **Brier score** is the metric that lets "calibration" be a measurable thing rather than a vibe. Convention note: GJP individual-forecaster Brier in modern usage is 0-to-1 binary mean of (*p* − *o*)². Goldstein's GJP-vs-ICPM paper uses 0-to-2 two-outcome Brier. The post explicitly says which scale is in play whenever a number appears.

The section ties them together: AOMT is the trait, Brier is how you verify the trait is doing what you'd hope.

**Reader can now:** define AOMT in one sentence; explain what a Brier-score difference of .08 (ICPM .23 → GJP-best .15 on 0-to-2 scale) means in practical terms; recognize that "I'm well-calibrated" is a claim with a number attached.

**Figure 5** [static-svg]: Calibration plot. X-axis = forecast probability (0 to 1). Y-axis = observed frequency. Diagonal line = perfect calibration. Two curves: well-calibrated forecaster (close to diagonal); overconfident forecaster (steeper than diagonal). Brier-score readouts in the corner. Small inset showing 5-7 sample items from Baron's AOMT scale. *Mechanism shown:* what calibration vs overconfidence looks like in the same coordinate frame.

#### 6. The aggregator beats experts: Goldstein revisited and the Hauenstein open question

Returns to the throughline. With Section 5's setup, the reader can now interpret Goldstein's result more carefully.

The mechanism is qualitative, not quantitative — and the post is explicit about that. Aggregating many probabilistic forecasts can reduce variance under specific assumptions (independence between forecasters, comparable calibration, correlated errors not too tight). The post sketches these assumptions in prose; the literature on the GJP's "All Surveys Logit" aggregator says it weighted by recent accuracy and time-discounted older forecasts, but the post does NOT make that a load-bearing primary-source claim — it's a high-level paraphrase of GJP team published descriptions; if Phase 7 verification finds different aggregation mechanics, the prose updates. Comparison to the ICPM is similarly hedged: prediction markets have known pathologies (herding, timing, thin-market noise) but the post will not assert *which* of those drove the ICPM's Brier without primary backing.

Then the open question. Mellers et al. 2014 reported that *training, teaming, and tracking* individually improved Brier; Hauenstein et al. 2025 (*Psychological Science*, online December 2024) reanalyzed the same data with item-response-theory and found those effects shrank, vanished, or in some cases reversed once method-variance variables were controlled. The post does not claim this kills the GJP findings. It says: the *aggregation* result holds (Goldstein, even if the *why* is partially hand-waved); the question of *which causal mechanism* drove the individual-level forecasting gains is open. No published Mellers/Tetlock response located as of pubdate. This is itself a scout-mode behavior at the field level — accept the open question rather than pretend it's closed.

**Reader can now:** explain why aggregation can reduce variance under specific assumptions (and what assumptions are needed); explain why the GJP-vs-ICPM gap doesn't translate cleanly to "X intervention causes Y improvement"; recognize an open empirical question in the wild and resist the urge to pick a side prematurely.

**Figure 6** [static-svg, redesigned post-Gate-1]: A static **funnel** diagram, NOT a "dot cloud". Three stacked panels showing what happens to a forecast distribution under three different conditions: (i) one independent forecaster with bias *b* and variance *σ²* (wide distribution, off-center); (ii) ten independent forecasters with the same *b* and *σ²* aggregated naively (narrower distribution, same off-center bias — variance reduction without bias removal); (iii) ten correlated forecasters with the same *b* and *σ²* aggregated (narrower than (i) but wider than (ii) — correlation eats the gain). Annotation makes the assumptions explicit: independence assumed in panel (ii), violated in panel (iii). The figure does NOT claim "aggregation always beats truth" — it shows the *conditional* mechanism. Hauenstein-2025 overlay is a small inset, separate from the funnel: an arrow showing the Mellers 2014 training/teaming effect, with a "controlled for method variance" overlay showing the effect shrinking or reversing. *Mechanism shown:* aggregation can reduce variance under independence; the gain disappears under correlation; the question of whether GJP's interventions actually caused the gain is open.

### Act 3 — Personal scout mode (with the systems layer)

Act 3 takes the field-level insights and translates to operational moves at *both* the individual and the systems layer — the diagnosis in Section 4 was that soldier mode is social architecture, so individual moves alone won't fully address it. Three sections (sections 7, 8, 9).

#### 7. Galef's five self-tests (and what they're for)

The operational individual-scale core. Run on a real belief the reader holds. Each test is a thought experiment that targets a specific failure mode the post identified in Act 1.

- **Double Standard Test** — would I judge this evidence the same way if it pointed elsewhere?
- **Outsider Test** — what would I advise a stranger in this situation?
- **Conformity Test** — would I still hold this if my peers didn't?
- **Selective Skeptic Test** — would I scrutinize this evidence as harshly if it supported the other side?
- **Status Quo Bias Test** — if I didn't already hold this position, would I adopt it?

The post offers a mapping from each test to the asymmetry it most plausibly addresses (Double Standard ↔ Lord/Ross/Lepper, Outsider ↔ Ditto/Lopez, etc.). **This mapping is the post's own synthesis, NOT a primary-source claim.** Galef does not formally map the tests to the empirical literature; the asymmetries are not formally mapped to the tests in any matrix-cited paper. The post will explicitly mark the mapping as "the author's reading of how the tests target the asymmetries". This is a teaching move, not a factual one. The Phase-2 disposition for Section 6 in the original outline was to hide this synthesis behind primary sourcing — Gate 1 caught the issue and the post is now upfront about it.

Caveat: Galef's terminology is paraphrased from secondary outlines; Phase 7 will tighten against the published book.

**Reader can now:** name the five tests; pick a real belief and run at least one; recognize the test-to-asymmetry mapping as the post's reading rather than a Galef-stated equivalence.

**Figure 7** [static-svg]: 5x2 mapping diagram with explicit "the author's reading" label so the figure doesn't claim sourcing it doesn't have. Left column: the five tests (paraphrased prompts). Right column: the asymmetry each test most plausibly targets. Light-grey "this is a teaching synthesis, not a primary-source mapping" annotation across the top. *Mechanism shown:* the tests are not arbitrary, but the test-to-asymmetry mapping is the post's reading.

#### 8. The systems layer: scout mode at the institutional scale

Section 4 diagnosed soldier mode as social architecture. Individual self-tests address part of the problem; they don't address the architecture itself. This section runs the systems-layer moves the post's own diagnosis demands:

- **Precommitment**: write down what evidence would change your mind *before* you see it. The technique recurs in Galef's book and in Tetlock's superforecaster work.
- **Scoring/calibration tracking**: the GJP's individual-level finding (frequent updating + AOMT predicted Brier per Mellers 2015 *JEP:Applied*) translates personally into "track your forecasts, score them later, look for systematic over- or under-confidence." Brier score, applied to your own predictions over time, is the personal-scale version of the GJP measurement discipline.
- **Outside review / aggregation at the team level**: the Goldstein result generalizes — a small team that aggregates calibrated probabilistic forecasts and trusts the aggregate over any individual's gut tends to do better than the individual gut. The post will sketch what this looks like in a working team, with the explicit caveat from Section 6 (aggregation requires independence; correlated errors eat the gain).
- **Adversarial collaboration / hostile review** as the systems-layer analog of Galef's individual self-tests. The Hauenstein-Mellers situation is the textbook case at the literature scale; small organizations can adopt analogous structures (red-team review, independent forecasters, dissenting-view-captured-in-writing).

This is the section that resolves the post's own diagnosis: scout mode at scale isn't five individual tests; it's an architecture.

**Reader can now:** name three systems-layer moves that complement Galef's individual tests; predict that running individual tests without any systems-layer support will leave the social-architectural problem mostly intact; sketch what the scout-mode equivalent of the Goldstein aggregator looks like inside a small team.

**Figure 8** [static-svg]: A two-tier diagram. Top tier: individual moves (the five Galef tests, calibration tracking). Bottom tier: systems-layer moves (precommitment, scoring, aggregation, outside review, adversarial collaboration). Arrows showing how systems-layer moves generalize the individual ones (e.g., calibration-tracking-personal → calibration-tracking-team-aggregated → Goldstein's "All Surveys Logit"). *Mechanism shown:* the diagnosis from Section 4 (soldier mode is social architecture) demands both individual and systems-layer moves; the GJP-aggregator throughline returns explicitly here, not as a closing name-check.

#### 9. The trainability picture: small effects, unresolved transfer (and what this means for the closing move)

The sober counterpart to Sections 7-8. *Can* you actually train scout mode? The literature says: yes, somewhat, with caveats — and the caveats themselves shape the closing move in Section 10.

- **Single-session debiasing training** (Morewedge et al. 2015): game intervention reduced six biases by ≥31.94% immediately, ≥23.57% at 2-month follow-up; video version smaller effect (≥18.60% immediate, ≥19.20% at 2-month). Six biases tested.
- **Field transfer** (Sellier et al. 2019, with 2020 corrigendum): trained participants 19% (corrected from 29%) less likely to pick the inferior hypothesis-confirming solution on a Shuttle-Challenger-modeled business case.
- **The 2025 systematic review** (Swaryandini et al., *Nature Human Behaviour*): 54 RCTs / 10,941 participants in scope; meta-analytic subset 41 studies / 160 effects; pooled *g* = 0.26 (95% CI 0.14-0.39); transfer to real-world decision-making remains unresolved.
- **Heerma van Voss et al. 2025** (*Scientific Reports*): one-shot debiasing intervention with national risk analysts and students reduced confirmation bias. Closer to the post's analyst-debiasing scenario than Morewedge alone. (Phase 7 to verify metadata.)

**The crucial bridge to Section 10:** the trainability picture says debiasing-training-as-package gets you small gains with unresolved transfer. The implication is that the post's closing prescription should NOT promise a transformation; it should be the smallest, most durable habit that survives the literature's actual effect sizes. That habit — write down disconfirming evidence at the moment it appears — is the move Section 10 prescribes, *because* the trainability evidence doesn't support a more ambitious claim. Section 9 is the load-bearing reason Section 10 is modest rather than ambitious; without Section 9 the closing protocol would feel arbitrary.

**Reader can now:** state the realistic expectation for what training in scout-mode-style habits buys (small but real, transfer unresolved); see why the post's closing prescription is intentionally a single durable habit rather than a 12-step program.

**Figure 9** [static-svg, redesigned post-Gate-1]: Two-panel figure with separate axes per measurement type, NOT mixing Hedges *g* with % bias reduction on a single x-axis. Panel A: % bias-reduction studies (Morewedge game/video immediate + 2-mo, Sellier 19% post-corrigendum) with error bars. Panel B: Hedges *g* meta-analytic effect (Swaryandini 2025, *g* = 0.26 with 95% CI 0.14-0.39). Annotation between panels: "different measures, comparable conclusion: small but real". Heerma van Voss 2025 listed as a footnote with "metadata pending Phase 7" because the post can't honestly plot a study whose exact effect size hasn't been Phase-2-verified. Annotation overlay: "transfer to real-world decision-making remains unresolved". *Mechanism shown:* the literature's actual estimates, with the false-comparability error from the previous draft fixed.

#### 10. Darwin's golden rule, operationalized for 2026

The closing section. Pulls the whole post into one move: write the disconfirming thing down the moment it shows up.

**Why this move, hedged honestly:** the post is *not* claiming "every primary source endorses this exact habit". Codex Gate 1 caught the earlier overclaim. The honest version: the move is the smallest known counter-move to soldier mode that recurs across the post's primary sources — Darwin documents the practice and reports its effect on his work; the GJP individual-level findings include frequent updating as a behavioral predictor of accuracy; Galef's tests are cognitive prompts that ask the reader to notice contrary evidence. None of these sources directly says "write disconfirming evidence in a notebook" as a single endorsed habit, but the move is consistent with what they each prescribe, and the trainability evidence (Section 9) doesn't support a more ambitious prescription. The post will frame the move as "the most durable habit consistent with what the post's sources actually say", not as the universal-endorsed habit.

The post sketches a one-page protocol: a notebook entry per disconfirming observation, dated, with the prior it threatens. Pen and paper, or a plain text file. Darwin's tooling was a notebook; yours can be a plain markdown file.

The protocol explicitly carries forward the systems-layer moves from Section 8 — the individual notebook is the personal-scale version of the team's outside-review or precommitment register. The reader who runs the notebook habit is running a personal version of what the GJP-aggregator does at scale.

Closes on Hauenstein-Mellers as scout mode at the field level (the literature is still arguing about itself; that's the discipline working). The connection back to the throughline is explicit: the same kind of move (record disconfirming evidence) operates at three scales — Darwin's notebook (1887, individual), the GJP's calibration-tracking + aggregation (2011-2026, institutional), the Hauenstein 2025 critique (the literature itself).

Final paragraph is two sentences. Concrete. No "in summary".

**Reader can now:** write down their first disconfirming-evidence entry by the end of the week; recognize Darwin → GJP → Hauenstein as a single 130-year-old discipline running at three scales (individual / institutional / scientific); state the move's hedge (it is the most durable habit consistent with the sources, not the universally endorsed habit).

**Figure 10** [static-svg]: Darwin's-golden-rule diagram extended for 2026. A loop with three concentric scales: innermost = Darwin's notebook (1887); middle = GJP forecaster's calibration log (2011-2026); outermost = the literature's adversarial-collaboration cycle (Mellers 2014 → Hauenstein 2025 → ongoing). Each scale runs the same operation: observation appears → "is this opposed to the current model?" → record at once → re-encounter at review. *Mechanism shown:* the smallest scout-mode habit operates at three scales; the personal notebook is the personal version of the systems-layer move from Section 8 and the field-level Hauenstein-Mellers situation.

### Phase 5 figure progress (locked post-Gate-1)

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | OneBeliefTwoUpdates | static-svg | TODO | |
| 2 | GJPvsICPM | static-svg | TODO | |
| 3 | ThreeAsymmetriesPlusContestedFourth | static-svg | TODO | |
| 4 | ArchitectureBeneath | static-svg | TODO | |
| 5 | CalibrationPlot | static-svg | TODO | |
| 6 | AggregationFunnel | static-svg | TODO | |
| 7 | FiveSelfTestsMapping | static-svg | TODO | |
| 8 | SystemsLayer | static-svg | TODO | |
| 9 | TrainabilitySplitPanels | static-svg | TODO | |
| 10 | DarwinGoldenRuleThreeScales | static-svg | TODO | |

All ten figures are static-svg post-Gate-1. The previous Figure 5 (AggregatorAndOpenQuestion) was flagged TYPE-CHANGE STRUCTURAL by Gate 1 (aggregation depends on continuous parameters); per the per-figure-type unlock protocol, the figure was redesigned as a static funnel showing the *conditional* aggregation mechanism (independence assumption explicit; correlation pathology shown) rather than a "dot cloud" implying aggregate is always closer to truth. This redesign satisfies Gate 1's structural concern without triggering the unlock protocol's interactive promotion. The other Gate 1 figure findings (Figure 7 false comparability) were addressed by redesigning Figure 9 (TrainabilitySplitPanels) with separate axes per measurement type.

## Codex research review

Two Gate-0 runs have fired. Run 1 surfaced 12 STRUCTURAL findings; the disposition table for those is preserved here. Run 2 surfaced 8 STRUCTURAL findings (mostly new) plus 2 cosmetic guardrails; disposition below.

Findings files: `notes/scout-mindset-codex-research-20260507.md` (Run 1; full output verbatim).

### Run 1 disposition (already applied as commits before Run 2)

| # | Codex Run 1 finding | Action |
|---|---|---|
| 1 | Galef rows 1-5 secondary-outline only | Annotated |
| 2 | Five self-tests in Ch 5, not four in Ch 6 | Corrected; Spec walk-away point updated |
| 3 | "Four asymmetries" category error | Reframed as 3 asymmetries + social architecture |
| 4 | Mellers 2015 mis-sourced (PPS → JEP:Applied) | Corrected |
| 5 | Row 18 ICPM not "CIA analysts" | Corrected (further refined Run 2) |
| 6 | Row 19 / throughline contradiction with Hauenstein | Throughline rewritten |
| 7 | Sellier 29 → 19 corrigendum | DISAGREED Run 1 (subagent failed to find); Run 2 confirmed corrigendum exists; corrected |
| 8 | Morewedge games vs videos | Per-modality figures; "one-hour" dropped |
| 9 | Kahan replication caveat | Persson 2021 + Connor 2024 added |
| 10 | Rows 12-14 lack page locators | Annotated as book-level only |
| 11 | Brier 1950 convention cleanup | Convention note added |
| 12 | Darwin Gutenberg ID #2087 → #2010 | Corrected |

### Run 2 disposition (applied this commit)

| # | Codex Run 2 finding | Action |
|---|---|---|
| 1 | Row 18 / throughline still misstates Goldstein (it compares aggregation methods, not "elite teams") | Throughline rewritten to algorithmic-aggregation framing; Spec walk-away point #4 corrected; Row 18 rewritten to algorithmic comparison with explicit ex-post-selection caveat. The "GJP elite teams beat the CIA by 25-30%" framing is dropped from the post entirely. |
| 2 | Hauenstein doesn't kill ICPM comparison directly but kills the throughline wording | Resolved by Finding 1's rewrite; the ICPM aggregation result holds, the individual-intervention causal status is open. |
| 3 | Galef rows 1-4 still not publishable as primary-supported with quote marks | Quote marks dropped; matrix carries paraphrased claims with explicit "paraphrased pending Phase 7" annotation. |
| 4 | Row 21 wrong: corrigendum exists; correct figure is 19% | DISAGREED in Run 1 (subagent error); Run 2 confirmed and corrected. Row 21 now states 19% with corrigendum DOI 10.1177/0956797620930211. |
| 5 | Recency labels for rows 22, 23 false (Persson 2021, Connor 2020/2024 don't pass 18-month bar) | Reclassified as "foundational replication-context"; topic-evolution annotation in Spec updated to reflect the reclassification. |
| 6 | Spec still overclaims motivated numeracy | Walk-away point #2 rewritten: "the result is influential and the field is still arguing" rather than "mechanism real, dose-response contested". Glüer-Pagin & Spectre 2025 added as Row 24. |
| 7 | Trainability treatment stale; needs Nature 2025 systematic review | Swaryandini et al. 2025 *Nature Human Behaviour* added as Row 25 with verbatim *g* = 0.26 effect-size and unresolved-transfer caveat. |
| 8 | Trivers/Mercier research notes still have quote marks without locators | Research-notes Sub-topic 1 rewritten: Trivers and Mercier-Sperber are now paraphrased, not quoted. |
| 9 | Row 16 sound (cosmetic guardrail) | Verified; prose must not reintroduce "AOMT is THE scout trait" language. |
| 10 | Row 15 acceptable but watch scale collision (cosmetic guardrail) | Brier convention note expanded; Sub-topic 2 explicitly says which scale each cited number is on. |

Run 2 closed all eight STRUCTURAL findings within the matrix and notes. Outstanding work for Phase 7 (verbatim PDF verification): Goldstein Brier numbers, Sellier corrigendum body text, Galef chapter text, three book page locators (Trivers, Mercier-Sperber, Baron). These are deferred-but-tracked, not unaddressed.

### Run 3 disposition (gate-runner cap hit; one finding overridden, others fixed)

Run 3 was the third and final allowable Gate 0 invocation per the gate-runner cap of 3. It surfaced 6 STRUCTURAL findings + 2 cosmetic guardrails. Disposition:

| # | Codex Run 3 finding | Action |
|---|---|---|
| 1 | Throughline still over-connects Goldstein to individual scout habits | Throughline Act 2 phrasing rewritten: "systems that force calibrated updating tend to beat unaided institutional judgment" rather than "GJP forecasters helped the aggregator outperform". |
| 2 | Row 24 (Glüer-Pagin & Spectre) misclassified — online publication 2024-05-30 outside 18-month bar | Row 24 reclassified to "foundational/conceptual replication-context"; Spec topic-evolution note updated. |
| 3 | Galef rows 1-4 still secondary-as-primary | **Step-6 override applied.** Reasoning: a post about Julia Galef's book cannot avoid Galef's terminology, and Phase 2 budget did not yield verbatim chapter text from the published book. Rows 1-4 are paraphrased (no quote marks), explicitly annotated as "secondary-outline backed; Phase 7 to re-verify against published book", and the post will frame Galef's claims as "Galef's terminology" rather than as verbatim quotation. Phase 7 is the place where Galef wording will be tightened against the book. The override is recorded here and in the Codex history. The MDX is `draft: true` from creation through ship per hard rule #9; Vic owns the ship action and can pause if Phase 7's Galef verification fails. |
| 4 | Trainability matrix missing Heerma van Voss et al. 2025 *Scientific Reports* | Row 26 added; Sub-topic 4 cite stack updated. (Phase 7 to verify exact metadata.) |
| 5 | Row 25 conflates systematic-review scope (54 RCTs / 10,941 participants) with meta-analytic subset (41 studies / 160 effects) | Row 25 rewritten to preserve both numbers separately. |
| 6 | Sub-topic 4 Morewedge quote misquoted "three months" instead of "two months" | Quote corrected to "at least 2 months later". |
| 7 (cosmetic) | Row 18 verification status now stale — Goldstein PDF accessible, numbers verified | Annotation updated to "Codex Run 3 verified the .23 / .15 numbers and ex-post-selection caveat in the PDF". |
| 8 (cosmetic) | Rows 16, 18, 20 still labeled "current-state" despite being 2015-era | Recency status reclassified to "foundational/historical" for those three rows. |

Run 3 closed 5 of 6 STRUCTURAL findings + both cosmetic findings; finding #3 (Galef rows) is **overridden** with documented reasoning. The override is the gate-runner Step-6 escape hatch; the MDX stays `draft: true` regardless. Phase 7's freshness pass is the second checkpoint where Galef verbatim text gets pulled and the post tightens. If Phase 7 verification fails (e.g., the verbatim text contradicts the paraphrased claims), the post halts and Vic decides.

The matrix is now considered closed for Phase 2 purposes; proceed to Phase 3 (outline + figure list).

## Resume here

Last touched: 2026-05-07.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | done (Gate 0 Run 3 closed with 5 of 6 STRUCTURAL fixes + Step-6 override on Galef-rows finding; Phase 7 is the second checkpoint for that override) | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com`, `## Codex research review` (3 runs documented) |
| 3. Outline + figure list | done (Gate 1 Run 1 found 11 STRUCTURAL findings; all fixed in-place; outline now 10 sections with small-case opener and systems-layer section; Run 2 deferred to preserve gate-runner headroom for Gate 2) | `## Outline`, `## Codex outline review` |
| 4. Draft prose | pending | `src/content/blog/scout-mindset/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-07 | 0 (research) Run 1 | structural findings (12); fixes applied | `notes/scout-mindset-codex-research-20260507.md` + `## Codex research review` |
| 2026-05-07 | 0 (research) Run 2 | structural findings (8); fixes applied | `## Codex research review` (Run 2 disposition table) |
| 2026-05-07 | 0 (research) Run 3 | structural findings (6 + 2 cosmetic); 5 of 6 fixed; **Step-6 override on Galef-rows-secondary-as-primary finding (documented reasoning)**; Phase 7 is the second checkpoint | `## Codex research review` (Run 3 disposition table) |
| 2026-05-07 | 1 (outline) Run 1 | 11 STRUCTURAL findings (1 TYPE-CHANGE on Figure 5); all fixed in-place; outline restructured to 10 sections with new small-case opener + systems-layer section. Phase 4 prose drafting next; Gate 1 Run 2 deferred to allow gate-runner headroom for Gate 2. | `notes/scout-mindset-codex-outline-20260507.md` + `## Codex outline review` |

### Phase 5 figure progress

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | GJPvsICPM | static-svg | TODO | |
| 2 | FourAsymmetries | static-svg | TODO | |
| 3 | ArchitectureBeneath | static-svg | TODO | |
| 4 | CalibrationPlot | static-svg | TODO | |
| 5 | AggregatorAndOpenQuestion | static-svg | TODO | |
| 6 | FiveSelfTests | static-svg | TODO | |
| 7 | TrainabilityLandscape | static-svg | TODO | |
| 8 | DarwinGoldenRule | static-svg | TODO | |

### Suggested next batch

1. Phase 4: draft prose section by section into `src/content/blog/scout-mindset/index.mdx`. Frontmatter with `draft: true`, `essay: true`, placeholder `heroAlt`. One commit per section. Per-section "Reader can now" comment in the MDX.
2. Voice-check exits clean before each commit (`scripts/voice-check.sh`).
3. Per the section list (10 sections):
   - Act 1: §1 small-case opener; §2 GJP-vs-ICPM; §3 three asymmetries + contested fourth; §4 architecture beneath
   - Act 2: §5 AOMT/Brier/calibration; §6 aggregator + Hauenstein open question
   - Act 3: §7 Galef five tests; §8 systems layer; §9 trainability picture; §10 Darwin's golden rule operationalized
4. Once full draft + figures done, run Phase 7 freshness pass + codex Gate 2 + voice-check final + hero handoff.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline carry every locked-in choice from Phase 1. Research notes / Matrix / Codex review carry every Phase-2 sourcing decision and every Gate-0 fix.
2. Run resume-mode v2 migration if any v2 sections are missing. Skip if all present.
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/scout-mindset/index.mdx` for remaining placeholders (the MDX won't exist until Phase 4).
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. Truthful and current at date of publication, per load-bearing claim. Every load-bearing claim has a row in `## Claim-source matrix` with a quoted primary source and a recency status that passes the topic-evolution bar (12 months actively-evolving / 18 months stable). Phase 7 re-checks freshness.
2. Intuition-first, but never at the cost of a wrong mental model. Density over softening.
3. `scripts/voice-check.sh` exits clean before any commit. Em dashes: zero. Banned words: justify or rewrite.
4. Three codex gates are mandatory: Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-fire via the project-local `codex` skill.
5. Static is the figure default. Interactive needs one of the four override clauses.
6. Per-figure type locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval (max 2 unlocks per figure).
7. One section per commit, one figure per commit, one migration per commit.
8. Sentence-case headings. En-dashes allowed; em-dashes forbidden in prose (allowed only in act-divider headings starting `## Act `).
9. `draft: true` from creation through ship. The skill never auto-flips. Vic flips to `draft: false` explicitly when shipping.
10. Project-memory pointer + `MEMORY.md` entry are required and verified at end of Phase 1.
11. The blog is interconnected; newer posts link to older relevant posts (anchor points recorded in Phase 2, woven in Phase 4).
