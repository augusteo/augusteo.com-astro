# The scout mindset, applied

A mechanism-first take on Julia Galef's 2021 book *The Scout Mindset*. Not a book review. The post tries to make the reader feel *why* soldier mode is the default — by walking the empirical literature on motivated reasoning, identity-protective cognition, and prediction tournaments — then hands over a small toolkit of moves that operationalize scout mode on a belief they actually hold.

## Spec

**Audience.** Numerate knowledge workers who have to decide under uncertainty: engineers, founders, analysts, researchers. Already sympathetic to the rationalist-adjacent vocabulary (calibration, base rates, updating), but not steeped in it. The post should reward someone who has read Kahneman or Tetlock once and wants the *moves*, not the motivation. Lean technical; do not soften.

**Walk-away.** By the end the reader can:

1. Name the **three empirical asymmetries** in evidence-processing the soldier mode rests on (Lord/Ross/Lepper biased assimilation, Ditto/Lopez asymmetric evidentiary thresholds, Kahan identity-protective cognition) **plus the social-architectural roots** that explain *why* the asymmetries are the default (Mercier/Sperber argumentative theory, Trivers self-deception). The post does not claim "four asymmetries" — that flattens two different kinds of finding.
2. Explain why a *more* numerate person can be a *less* accurate reasoner on politicized topics (Kahan 2017 motivated-numeracy framework). The post carries the Kahan replication caveat: Persson et al. 2021 (preregistered replication) found weak evidence for motivated numeracy as a general phenomenon, and Connor et al. 2024 replicated the basic effect in a European sample but did *not* find the high-numeracy-amplifies-polarization pattern from the original Kahan study. The mechanism is real; its dose-response is contested.
3. Run the **five self-tests Galef proposes in Chapter 5** ("Noticing Bias") on a real belief they hold: the Double Standard Test, the Outsider Test, the Conformity Test, the Selective Skeptic Test, and the Status Quo Bias Test. Earlier drafts incorrectly called this a four-test set in Chapter 6.
4. State the GJP-AOMT result honestly in one sentence: in the IARPA Good Judgment Project, *actively open-minded thinking* (alongside fluid intelligence and political knowledge) was a dispositional predictor of forecasting accuracy (Mellers et al. 2015 *JEP: Applied*); the GJP's elite teams outperformed the U.S. Intelligence Community Prediction Market by roughly 25-30% (Goldstein et al. / Tetlock public statements). Whether the *interventions* (training, teaming) caused additional gains versus selecting for already-skilled forecasters is contested by Hauenstein et al. 2025.
5. Write down the smallest scout-mode habit they could keep this week, knowing it's the one move every primary source agrees on: record disconfirming evidence the moment it shows up. Darwin called it his golden rule.

**Walk-away test.** If a reader who finishes the post can't articulate the difference between "I disagree with X" and "I rate the evidence for X at p=0.4", the post failed.

**Topic-evolution classification.** Stable for the foundational mechanism citations (Lord/Ross/Lepper 1979, Kunda 1990, Ditto/Lopez 1992, Trivers 2011, Mercier/Sperber 2017). Recency bar is 18 months for *current-state* applied claims. Newer current-state material in the matrix: Hauenstein et al. 2025 (December 2024, contests Mellers 2014 training/teaming causal interpretation), Connor et al. 2024 (Kahan replication). Foundational citations are exempt from the strict 18-month bar but are explicitly annotated as such per row.

**Honest sourcing gap.** Three areas the matrix flags rather than overclaims:

- No recent (≤ 18 months) RCT specifically validating *scout-mindset training* as a package. The post leans on AOMT-predicts-Brier (Mellers 2015 *JEP:Applied*) and the Morewedge-family debiasing-trainability work (Morewedge 2015, Sellier 2019), neither of which is exactly a scout-mindset RCT.
- Multiple Galef-2021 quotes are verified via secondary outlines (publisher excerpts, EA Forum, LessWrong) rather than via direct primary text. Phase 7 should re-verify against the published book; if any quote can't be primary-located, the prose either drops it or marks it.
- The Mellers-2015 GJP-edge framing ("25-30% over Intelligence Community", "15-30% over markets") is in Tetlock public statements and the Goldstein et al. GJP-vs-ICPM technical paper; it is *not* in the body of either Mellers 2015 paper. The post sources the number to Goldstein and Tetlock public statements explicitly.

**Length.** Roughly a 30-minute read. About 7,000-9,000 words including figure captions.

**Figure mix.** 100% static SVG. Eight to ten candidates listed in the Outline section once Phase 3 locks them. None currently meet the four interactive override clauses (continuous sweep / animation / drag / multi-state toggle) per `figure-recipes.md`; reconsider only if Gate 1 surfaces a STRUCTURAL finding requiring a re-type.

**Voice anchors.** Density over accessibility-padding. Concrete nouns. No hedge-and-balance on claims the literature actually settles. Sentence-case headings. Em dashes: zero. Match the rhythm of `unified-vision-stack` and `omni-modal-stack`.

## Throughline

**Lead candidate (locked, post-Gate-0 corrected):** Phil Tetlock's Good Judgment Project. The IARPA forecasting tournament (2011-2015) and its successor program at Good Judgment Inc. The named, public, citable scenario is: in a multi-year tournament with thousands of forecasters competing on hundreds of geopolitical questions, the GJP's elite teams outperformed the U.S. Intelligence Community Prediction Market (ICPM) by roughly 25-30% in Brier-score accuracy (Goldstein et al., GJP technical paper) and team aggregates beat external prediction markets by 15-30%. AOMT, alongside fluid intelligence and political knowledge, was a dispositional predictor of individual forecaster accuracy (Mellers et al. 2015 *JEP:Applied*).

**Important honest framing change post-Gate-0.** The throughline is no longer "AOMT + frequent updating + team aggregation = the recipe." Hauenstein et al. 2025 specifically contests whether *team aggregation* (and probability training) caused the gain or merely selected for already-skilled forecasters. The throughline keeps the dispositional finding (AOMT-as-predictor) and the empirical edge (GJP > ICPM) as the named load-bearing claims; the *causal* status of teaming and training is treated as an open scientific question and used as a teaching moment in Act 3 about how scout-mode behavior plays out at the field-research level (a critical reanalysis is published, no defensive rebuttal yet, the question remains open).

The throughline threads as follows:

- **Act 1 opens** on the GJP result as a paradox: how does an open tournament beat the U.S. Intelligence Community? Set up the puzzle by walking what the soldier defaults look like (the three asymmetries + social architecture) — these explain why intelligence professionals, who are smart, can lose to a calibrated amateur.
- **Act 2 returns** to the GJP repeatedly to ground each mechanism. AOMT is the dispositional finding (one of several predictors). Brier score is the metric that makes "calibration" a measurable thing. Frequent updating is the behavior superforecasters share. Each Act-2 section closes by saying "and this is one piece of why GJP forecasters outperformed".
- **Act 3 reassembles** at personal scale: what one belief, one calibration habit, one update routine gets you, even if you'll never join a tournament. Closes with the open question (Hauenstein) as a model of scout-mode behavior at the field level, then pivots to the smallest individual move that survives every primary source: write the disconfirming thing down the moment you see it. Darwin in 1887, GJP forecasters in 2026, you on Monday.

**Recurring vignette inside Act 1:** Charles Darwin's "golden rule," verbatim from his 1887 autobiography. Darwin and the GJP superforecasters built the same kind of system, separated by 130 years.

**Throughline number watchlist** (each gets a matrix row; sources updated post-Gate-0):

- "GJP elite teams outperformed the ICPM by ~25-30%" → Goldstein et al. GJP technical paper + Tetlock public statements (NOT Mellers 2015 paper body).
- "Top forecasters tracked into elite teams from Year 1 (top 2%)" → Mellers et al. 2014 *Psychological Science*.
- "AOMT predicted forecasting accuracy alongside fluid intelligence and political knowledge" → Mellers et al. 2015 *JEP:Applied* (NOT *Perspectives on Psychological Science*).
- "Whether training and teaming *caused* the gain is contested" → Hauenstein et al. 2025 *Psychological Science*.

If Phase 7 re-verification finds any number drifted from the source, the prose updates with the source.

## Research notes

Grouped by sub-topic, not by source. Every quoted excerpt below is verbatim from a primary source unless explicitly marked otherwise. Access date: 2026-05-07 throughout.

### Sub-topic 1: why soldier mode is the default — three asymmetries plus the social architecture

The empirical literature decomposes soldier-mode reasoning into two distinct kinds of claim: (a) **three asymmetries** in how evidence is processed, and (b) the **evolutionary/social-architectural roots** that explain why the asymmetries are the default. The post does not flatten these into a single "four asymmetries" list — they're not the same kind of finding.

**Asymmetry A — directional goals bias which information is retrieved (Kunda 1990).** Not just *how* we weight evidence; which evidence the search even surfaces.

> "Directional goals affect reasoning by affecting which information will be considered in the reasoning process."
>
> — Kunda, Z. (1990). "The Case for Motivated Reasoning." *Psychological Bulletin* 108(3): 480-498. PubMed PMID 2270237. Open PDF at fbaum.unc.edu/teaching/articles/Psych-Bulletin-1990-Kunda.pdf.

**Asymmetry B — identical evidence polarizes rather than converges (Lord, Ross, Lepper 1979).** The classic capital-punishment study. Two cohorts read the same pair of fictional studies. Both updated *toward* their priors.

> "The result of exposing contending factions in a social dispute to an identical body of relevant empirical evidence may be not a narrowing of disagreement but rather an increase in polarization."
>
> — Lord, C. G., Ross, L., & Lepper, M. R. (1979). "Biased Assimilation and Attitude Polarization." *JPSP* 37(11): 2098-2109. Open PDF at fbaum.unc.edu/teaching/articles/jpsp-1979-Lord-Ross-Lepper.pdf.

**Asymmetry C — preferred conclusions face lower evidentiary thresholds (Ditto & Lopez 1992).** Subjects given an unfavorable medical "test result" took longer to accept it, retested more, produced more confounding hypotheses than subjects given a favorable result.

> "Information consistent with a preferred conclusion is examined less critically than information inconsistent with a preferred conclusion, and consequently, less information is required to reach the former than the latter."
>
> — Ditto, P. H. & Lopez, D. F. (1992). "Motivated Skepticism: Use of Differential Decision Criteria for Preferred and Nonpreferred Conclusions." *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568.

*Verbatim numerical effect sizes did not surface in the budget.* Phase 7 retries; if specific numbers stay out of reach the prose asserts the qualitative result without claiming a specific %.

**Identity-protective cognition (Kahan et al. 2017) — and its replication caveats.** On a politically loaded contingency table, the *most* numerate subjects showed *more* polarized interpretation, not less. The mechanism: quantitative skill deployed selectively to reach the politically congenial conclusion.

> "Contrary to the prediction of SCT [science comprehension thesis], such polarization did not abate among subjects highest in numeracy; instead, it increased, supporting ICT [identity-protective cognition], which predicted that more numerate subjects would use their quantitative-reasoning capacity selectively to conform their interpretation of the data to the result most consistent with their political outlooks."
>
> — Kahan, D. M., Peters, E., Dawson, E., & Slovic, P. (2017). "Motivated Numeracy and Enlightened Self-Government." *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992.

The Kahan motivated-numeracy effect has weaker recent replication than the original. **Persson et al. 2021** (preregistered replication, *Cognition*) reports no good evidence for motivated numeracy as a general phenomenon and concludes the cumulative evidence is weaker than previously thought. **Connor et al. 2024** (*Behavioural Public Policy*, online 2020-09 / pub. 2024) replicated the basic motivated-numeracy effect in a Western European sample but specifically did *not* find the high-numeracy-amplifies-polarization pattern. The post will cite Kahan as the foundational frame for *identity-protective cognition* (the broader mechanism), but will hedge the specific "high numeracy amplifies polarization" claim with the replication results.

> "We did not find good evidence for motivated numeracy; there are distinct patterns in our data at odds with the core predictions of the theory."
>
> — Persson, E., Andersson, D., Koppel, L., et al. (2021). "A preregistered replication of motivated numeracy." *Cognition* 214 (September 2021): 104768. PubMed PMID 34051421. DOI 10.1016/j.cognition.2021.104768.

> "We replicate the basic motivated numeracy effect, but we do not find evidence of increased polarization among high-numeracy participants."
>
> — Connor, P., Sullivan, E., Alfano, M., & Tintarev, N. (2020/2024). "Motivated numeracy and active reasoning in a Western European sample." *Behavioural Public Policy*. DOI 10.1017/bpp.2020.32. *(Online publication 2020-09; the published-issue dating circulates as 2024.)*

**Social-architectural root A — self-deception serves outward deception (Trivers 2011).** The evolutionary framing: if the false belief is genuinely held, the deceiver transmits no involuntary tells.

> "The primary reason we fool ourselves is to fool others."
>
> — Trivers, R. L. (2011). *The Folly of Fools: The Logic of Deceit and Self-Deception in Human Life.* Basic Books. *(Page locator not surfaced in budget; book-level citation only.)*

**Social-architectural root B — reason is built for argument (Mercier & Sperber 2017).** The argumentative theory.

> "Reason is not geared to solitary use, to arriving at better beliefs and decisions on our own. What reason does, rather, is help us justify our beliefs and actions to others, convince them through argumentation, and evaluate the justifications and arguments that others address to us."
>
> — Mercier, H. & Sperber, D. (2017). *The Enigma of Reason*. Harvard University Press. *(Page locator not surfaced in budget; book-level citation only.)*

These six together — three asymmetries plus two social/evolutionary frames plus Kunda's directional-goals scaffolding — explain why being smart, well-read, or careful isn't enough on its own. Soldier mode is the architecture, not a glitch.

### Sub-topic 2: the scout's measurable trait

**Actively open-minded thinking (AOMT) is operationalizable.** Baron's scale and its successors define AOMT as a willingness to seek contrary evidence, weigh new information against held beliefs, tolerate complexity, and update in proportion to evidence.

> "Actively open-minded thinking is characterized by a willingness to seek out and reflect on contrary evidence and an openness to changing one's mind in the face of contrary evidence. This style of thinking includes the tendency to weigh new evidence against a favored belief, to spend sufficient time on a problem before giving up, and to consider carefully the opinions of others in forming one's own."
>
> — Baron, J. *Thinking and Deciding* (4th ed., Cambridge University Press, 2008). The AOMT scale itself originates with Baron (1985, 1988) and was operationalized as a published instrument by Stanovich & West (1997). *(Page locator not surfaced in budget; book-level citation only.)*

**Brier score is the standard accuracy metric.** A forecast probability *p* of an event that did or didn't happen yields a squared error (*p* − *o*)² where *o* ∈ {0, 1}. Average across forecasts; lower is better.

The original Brier 1950 paper is paywalled at AMS at journals.ametsoc.org and Phase 2 verification could not pull verbatim text. **Convention note:** Brier's original 1950 formulation gives a range of 0 to 2 for two-outcome forecasts; modern GJP usage (Mellers et al. 2014, 2015) reports Brier as a 0-to-1 mean of (*p* − *o*)² over binary outcomes. The post will use the 0-to-1 binary form and explicitly say so the first time the metric appears.

> Brier, G. W. (1950). "Verification of Forecasts Expressed in Terms of Probability." *Monthly Weather Review* 78(1): 1-3. AMS journals.ametsoc.org/view/journals/mwre/78/1/1520-0493_1950_078_0001_vofeit_2_0_co_2.xml. *(Verbatim text not directly accessed in Phase 2 budget; modern GJP convention used as the post's operational definition.)*

### Sub-topic 3: GJP findings and throughline numbers (post-Gate-0 sourcing corrections)

The Good Judgment Project (2011-2015 IARPA tournament; ongoing as Good Judgment Inc.) is the post's empirical anchor. **Gate-0 finding: my earlier Mellers 2015 attribution was wrong.** Two distinct Mellers et al. 2015 papers exist:

- Mellers, B., Stone, E., Atanasov, P., Rohrbaugh, N., Metz, S. E., Ungar, L., Bishop, M., Horowitz, M., Merkle, E., & Tetlock, P. E. (2015). **"The psychology of intelligence analysis: drivers of prediction accuracy in world politics."** *Journal of Experimental Psychology: Applied* 21(1): 1-14. DOI 10.1037/xap0000040. PubMed PMID 25581088. **This is the paper that contains the "Key predictors of accuracy were dispositional variables..." passage.**
- Mellers, B., Tetlock, P. E., Arkes, H. R. (2015). **"Identifying and cultivating superforecasters as a method of improving probabilistic predictions."** *Perspectives on Psychological Science* 10(3): 267-281. DOI 10.1177/1745691615577794. PubMed PMID 25987508. *(Different paper; the matrix's earlier attribution was wrong.)*

The post's "Key predictors..." quote and the AOMT-predicts-Brier finding are anchored in the *JEP: Applied* paper, not the *PPS* paper.

**Drivers of forecasting accuracy.** AOMT did not stand alone as the strongest predictor. The Mellers JEP:Applied 2015 paper lists multiple predictors at comparable strength.

> "Key predictors of accuracy were dispositional variables of cognitive ability, political knowledge, and open-mindedness; situational variables of training in probabilistic reasoning and participation in collaborative teams that shared information and discussed rationales; and behavioral variables of deliberation time and frequency of belief updating."
>
> — Mellers et al. 2015, *JEP: Applied* 21(1): 1-14.

The post will frame AOMT as *one of* several dispositional predictors, not as "the strongest dispositional predictor". An earlier draft of the matrix overstated this; corrected.

**GJP edge over the Intelligence Community Prediction Market.** The "25-30% over IC" / "15-30% over prediction markets" framing comes from Tetlock public statements and the GJP-vs-ICPM technical paper at Good Judgment Inc. (Goldstein, D. G., Hartman, R., Comey, R. H., Tetlock, P. E., & Mellers, B. A. — internal GJP paper at goodjudgment.com/wp-content/uploads/2020/11/Goldstein-et-al-GJP-vs-ICPM.pdf). The Mellers 2015 papers do not contain this exact framing in their abstracts. The post will source the GJP-vs-ICPM number explicitly to Goldstein et al. and Tetlock public statements rather than Mellers 2015. **The comparison was to an internal Intelligence Community prediction market populated by intelligence analysts**, not to "CIA analysts" directly; the post will use "Intelligence Community Prediction Market" as the precise object of comparison, with one prose line noting that ICPM participants were intelligence analysts with access to classified information.

**Top 2% of forecasters were designated "superforecasters" (Mellers 2014).** Per-year ranking; tracking these into elite teams was one of the four trainable levers tested.

> "The research tested and found support for three psychological drivers of accuracy: training, teaming, and tracking. Probability training corrected cognitive biases, encouraged forecasters to use reference classes, and provided forecasters with heuristics, such as averaging when multiple estimates were available. Teaming allowed forecasters to share information and discuss the rationales behind their beliefs. Tracking placed the highest performers (top 2% from Year 1) in elite teams that worked together."
>
> — Mellers, B., Ungar, L., Baron, J., et al. (2014). "Psychological Strategies for Winning a Geopolitical Forecasting Tournament." *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255.

**The Mellers 2014 causal claim is contested by Hauenstein et al. 2025.** A methodological reanalysis using item response theory: once method-variance variables were controlled, the training/teaming effect sizes shrank, vanished, or in some cases reversed. The post treats this as a teaching moment about scout-mode behavior at the field-research level (not as a footnote).

> "Using data from a geopolitical forecasting tournament, Mellers et al. (2014) concluded that forecasting ability was improved by allowing participants to work in teams and providing them with probability training. The authors reevaluated Mellers et al.'s conclusions using an item response theory framework that models latent ability from forecasting choices. They found that the relationship between latent ability estimates and forecast accuracy differed from the interpretation of the original findings once key extraneous variables were statistically controlled."
>
> — Hauenstein, C. E., Thomas, R. P., Illingworth, D. A., & Dougherty, M. R. (2025). "Rethinking the Role of Teams and Training in Geopolitical Forecasting: The Effect of Uncontrolled Method Variance on Statistical Conclusions." *Psychological Science* 36(1): 3-18. Online publication 2024-12-04. DOI 10.1177/09567976241266481. Open PDF at gwern.net/doc/statistics/prediction/2024-hauenstein.pdf.

*No published Mellers/Tetlock response to Hauenstein has been located as of 2026-05-07.* The post should describe the state honestly: critique published December 2024, no published reply yet, still active in the literature. If a response surfaces during the Phase 7 freshness pass, the prose updates.

### Sub-topic 4: trainability of debiasing (post-Gate-0 corrections)

**Single-session debiasing-training results, broken out by intervention type (Morewedge 2015).** The earlier matrix entry conflated games and videos into one "30%+ / 20%+" claim. The actual paper reports them separately:

- **Computer game** (with personalized feedback + practice): immediate effect ≥ 31.94% bias reduction; at 2-month follow-up ≥ 23.57% reduction.
- **Video** (passive instructional content): immediate effect ≥ 18.60% reduction; at 2-month follow-up ≥ 19.20% reduction.

Six biases were tested: anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, representativeness.

> "Training with interactive computer games that provided players with personalized feedback, mitigating strategies, and practice, reduced six cognitive biases by more than 30% immediately and by more than 20% as long as three months later."
>
> — Morewedge, C. K., Yoon, H., Scopelliti, I., Symborski, C. W., Korris, J. H., & Kassam, K. S. (2015). "Debiasing Decisions: Improved Decision Making With a Single Training Intervention." *Policy Insights from the Behavioral and Brain Sciences* 2(1): 129-140. DOI 10.1177/2372732215600886.

The "one-hour" duration claim my earlier draft made is **not directly stated in the abstract** and could not be verified within Phase 2 budget. The matrix drops the "one-hour" wording and uses "single-session training" until Phase 7 verifies the duration against the full paper.

**Effect transfers to field decisions (Sellier 2019).** A follow-up showed the training transferred to a Shuttle-Challenger-modeled business case. The reported effect-size figure has been variously reported as **19% to 29%** in summaries; the matrix's earlier "29%" framing is hedged here pending verbatim PDF access.

> "Trained participants were [reported as 19-29% across summaries] less likely to choose the inferior hypothesis-confirming solution than untrained participants...The results provide promising evidence that debiasing training effects transfer to field settings and can improve consequential decisions in professional and private life."
>
> — Sellier, A.-L., Scopelliti, I., & Morewedge, C. K. (2019). "Debiasing Training Improves Decision Making in the Field." *Psychological Science* 30(9): 1371-1379. DOI 10.1177/0956797619861429.

*Phase 2 verification could not confirm a published corrigendum at the URL Codex pointed to (10.1177/0956797620930211 redirects to a different paper).* The matrix flags this as `marginal-but-stable-enough — verbatim figure pending Phase 7 PDF access`. If the published corrigendum is real, Phase 7 catches it.

These two together back the post's claim that scout-mode practices are *trainable* without overclaiming RCT-level evidence specifically on Galef-style scout-mindset training.

*No 2024-2026 RCT specifically validating scout-mindset training as a package was located in budget.* The post hedges: AOMT predicts accuracy (Mellers 2015 *JEP:Applied*), debiasing transfers (Morewedge / Sellier with effect-size hedge), GJP intervention claims are themselves contested (Hauenstein 2025), Kahan motivated-numeracy has weaker recent replication (Persson 2021, Connor 2024). The honest version is sharper than an overclaimed version anyway.

### Sub-topic 5: Galef's operationalization (post-Gate-0 corrections)

**Scout / soldier dichotomy.** Galef's central frame. *(Phase 2 caveat: verbatim text verified across multiple secondary outlines, not pulled directly from the published book within the budget. Phase 7 should re-verify against the book itself.)*

> "[Scout mindset is] the motivation to see things as they are, not as you wish they were."
>
> — Galef, J. (2021). *The Scout Mindset: Why Some People See Things Clearly and Others Don't*. Portfolio / Penguin Random House. *(Verified across publisher and interview citations.)*

> "[Soldier mindset is] the motivation to defend your pre-existing beliefs against threatening evidence...motivated reasoning, in which our subconscious goal is to defend our beliefs."
>
> — Galef 2021, ibid. *(Same verification status.)*

**The five self-tests in Chapter 5 — corrected count and chapter.** My earlier draft incorrectly described "four self-tests in Chapter 6". Galef's set is **five thought experiments in Chapter 5 ("Noticing Bias")**. Names and operational definitions verified across multiple secondary outlines (publisher excerpts, EA Forum, LessWrong):

- **Double Standard Test:** would I judge this evidence the same way if it pointed to a different conclusion?
- **Outsider Test:** if a stranger were in this situation, what would I advise them?
- **Conformity Test:** if other people no longer held this view, would I still hold it?
- **Selective Skeptic Test:** would I scrutinize this evidence as harshly if it supported the other side?
- **Status Quo Bias Test:** if I didn't already hold this position, would I adopt it?

> — Galef 2021, Chapter 5. *(Names and prompts verified via publisher previews and corroborating outlines on EA Forum and LessWrong; verbatim book text not directly accessed in Phase 2 budget.)*

**Scout mindset framed as trainable, not innate.** Galef's three-pronged development strategy in the Introduction: recognise alignment (truth doesn't conflict with goals), build practical skills (thought experiments, probabilistic reasoning, ways of engaging disagreement), appreciate emotional rewards (the satisfaction of facing reality). My earlier draft attributed a specific verbatim quote ("actual behavioral change—not self-perception—indicates genuine scout mindset development") to the book's Introduction; **Phase 2 verification could not locate this exact quote in any primary source**, so the matrix drops the verbatim quote and keeps only the paraphrased claim, hedged.

> — Galef 2021, Introduction. *(Three-pronged framing verified via EA Forum / LessWrong outlines; specific verbatim quote not located primary; matrix row hedged accordingly.)*

**TED talk (2016).** The Dreyfus Affair opening (Esterhazy / Picquart) is the canonical setup Galef uses to frame the dichotomy publicly.

> "Soldier" mindset = "defends your viewpoint at all costs"; "Scout" mindset = "spurred by curiosity"; central question = "Do you yearn to defend your own beliefs or do you yearn to see the world as clearly as you possibly can?"
>
> — Galef, J. (2016). "Why you think you're right — even if you're wrong." TED2016. ted.com/talks/julia_galef_why_you_think_you_re_right_even_if_you_re_wrong. *(Full transcript not pulled verbatim in budget; key framings confirmed via TED summary and corroborating coverage.)*

**Verified podcast appearances (for cross-reference, not primary citation).** Sean Carroll's Mindscape #143 (2021-04-19), EconTalk (Russ Roberts), ClearerThinking podcast #36. Sam Harris / Lex Fridman / Tyler Cowen / Ezra Klein dedicated episodes were not confirmed to exist in budget.

### Sub-topic 6: the historical seed (Darwin, post-Gate-0 ID correction)

The single best historical primary source for the scout-mode operating procedure. Verbatim from Darwin's autobiography:

> "I had, also, during many years, followed a golden rule, namely, that whenever a published fact, a new observation or thought came across me, which was opposed to my general results, to make a memorandum of it without fail and at once; for I had found by experience that such facts and thoughts were far more apt to escape from memory than favourable ones. Owing to this habit, very few objections were raised against my views which I had not at least noticed and attempted to answer."
>
> — Darwin, C. *The Autobiography of Charles Darwin, 1809-1882*, ed. Nora Barlow (Collins, 1958), originally written 1876-1881, published posthumously in *The Life and Letters of Charles Darwin* (Francis Darwin, ed., 1887). **Project Gutenberg eText #2010** (corrected from #2087 in the Gate-0 review). Open at gutenberg.org/cache/epub/2010/pg2010-images.html and at darwin-online.org.uk.

This passage compresses the entire scout-mode operating procedure into one move: write the disconfirming thing down the moment it shows up, because the brain will lose it otherwise. The post returns to it as the closing image.

## Claim-source matrix

Every load-bearing claim the post will make traces to a row below. Format: `# | Claim | Quoted source | Source ID + date | Recency status`. All sources accessed 2026-05-07. The post's topic-evolution classification is *stable* for the foundational mechanism citations (annotated explicitly per row); current-state applied claims meet the 18-month bar.

| # | Claim | Quoted source | Source ID + date | Recency status |
|---|---|---|---|---|
| 1 | Galef defines scout mindset as "the motivation to see things as they are, not as you wish they were". | "the motivation to see things as they are, not as you wish they were" | Galef 2021, *The Scout Mindset* (Portfolio/PRH); verified via publisher excerpts and Galef interview transcripts. | foundational (terminology of the book itself); secondary-outline verification only — Phase 7 to re-verify against book |
| 2 | Galef defines soldier mindset as motivated reasoning whose subconscious goal is to defend pre-existing beliefs against threatening evidence. | "[Soldier mindset is] the motivation to defend your pre-existing beliefs against threatening evidence...motivated reasoning, in which our subconscious goal is to defend our beliefs." | Galef 2021, ibid. | foundational; secondary-outline verification only — Phase 7 to re-verify |
| 3 | Galef proposes **five** self-tests in **Chapter 5 ("Noticing Bias")**: Double Standard, Outsider, Conformity, Selective Skeptic, and Status Quo Bias. | Five-test list verified across multiple secondary outlines (EA Forum, LessWrong, publisher previews). | Galef 2021, Ch. 5 | foundational (terminology); secondary-outline verification — Phase 7 to confirm chapter and exact prompts |
| 4 | Galef frames scout mindset as a learned set of practiced habits, not an innate temperament. | *(No verbatim quote located primary; the matrix carries the paraphrased claim only, sourced to Galef 2021's Introduction via secondary outlines.)* | Galef 2021, Introduction | foundational; secondary-outline verification only |
| 5 | Galef's TED 2016 opens on the Dreyfus Affair (Esterhazy / Picquart) as the canonical contrast between soldier and scout. | TED.com summary + corroborating coverage; talk title "Why you think you're right — even if you're wrong" | Galef 2016, TED2016 | foundational (talk content); summary-level verification |
| 6 | Darwin's stated practice for many years: record any fact opposed to his general results "without fail and at once," because such facts "were far more apt to escape from memory than favourable ones." | Full passage quoted in Research notes Sub-topic 6. | Darwin 1887, *Autobiography*, written 1876-1881; Project Gutenberg eText #2010 | foundational (historical primary, field-canonical) |
| 7 | Darwin reported that his golden rule meant "very few objections were raised against my views which I had not at least noticed and attempted to answer." | "Owing to this habit, very few objections were raised against my views which I had not at least noticed and attempted to answer." | Darwin 1887, ibid. | foundational |
| 8 | Directional goals bias *which* information is retrieved during reasoning, not just how it is weighted. | "Directional goals affect reasoning by affecting which information will be considered in the reasoning process." | Kunda 1990, *Psychological Bulletin* 108(3): 480-498. PMID 2270237. | foundational (field-canonical, 9k+ citations) |
| 9 | Subjects reading identical mixed evidence on a contested topic polarize further rather than converging — biased assimilation. | "The result of exposing contending factions in a social dispute to an identical body of relevant empirical evidence may be not a narrowing of disagreement but rather an increase in polarization." | Lord, Ross, Lepper 1979, *JPSP* 37(11): 2098-2109. | foundational (field-canonical paradigm) |
| 10 | Preferred conclusions face a lower evidentiary threshold than non-preferred ones; less information is required to reach the former. | "Information consistent with a preferred conclusion is examined less critically than information inconsistent with a preferred conclusion, and consequently, less information is required to reach the former than the latter." | Ditto & Lopez 1992, *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568. | foundational |
| 11 | Kahan 2017 introduces the *identity-protective cognition* mechanism: more numerate subjects, on a politically loaded contingency table, showed *greater* polarized interpretation than less numerate ones. | "Contrary to the prediction of SCT, such polarization did not abate among subjects highest in numeracy; instead, it increased, supporting ICT [identity-protective cognition]..." | Kahan, Peters, Dawson, Slovic 2017, *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992. | foundational *for the ICT framework*; the high-numeracy-amplifies-polarization specific effect has weaker replication (see rows 22, 23) |
| 12 | Self-deception evolved to make outward deception more credible: the deceiver genuinely holds the false belief, transmitting no involuntary tells. | "The primary reason we fool ourselves is to fool others." | Trivers 2011, *The Folly of Fools*. Basic Books. *(Page locator not surfaced in budget; book-level citation only.)* | foundational |
| 13 | Reasoning evolved primarily for social justification and persuasion in argument, not for solo truth-seeking. | "Reason is not geared to solitary use, to arriving at better beliefs and decisions on our own. What reason does, rather, is help us justify our beliefs and actions to others, convince them through argumentation, and evaluate the justifications and arguments that others address to us." | Mercier & Sperber 2017, *The Enigma of Reason*. Harvard UP. *(Page locator not surfaced; book-level citation only.)* | foundational |
| 14 | AOMT is operationally a willingness to seek contrary evidence, weigh new evidence against held beliefs, tolerate complexity, and update accordingly. | "Actively open-minded thinking is characterized by a willingness to seek out and reflect on contrary evidence and an openness to changing one's mind in the face of contrary evidence...weigh new evidence against a favored belief...consider carefully the opinions of others in forming one's own." | Baron, *Thinking and Deciding* 4th ed. (Cambridge UP, 2008). *(Page locator not surfaced.)* | foundational |
| 15 | Brier score for a binary forecast in modern GJP usage is the mean squared error between forecast probability and outcome (1 if event occurred, 0 if not), in a 0-to-1 range; lower is better. The original Brier 1950 formulation gives a 0-to-2 range for two-outcome forecasts. The post uses the 0-to-1 binary form. | Original 1950 paper paywalled; modern convention sourced to Mellers 2014/2015 reporting. | Brier 1950, *Monthly Weather Review* 78(1): 1-3 (paywalled at AMS); modern usage from Mellers et al. 2014 / 2015. | foundational metric (75+ years canonical); convention note explicit |
| 16 | In the GJP, the strongest dispositional predictors of forecasting accuracy were cognitive ability, political knowledge, and open-mindedness; the strongest situational predictors were probabilistic-reasoning training and team participation. AOMT is one of these predictors, not "the strongest". | "Key predictors of accuracy were dispositional variables of cognitive ability, political knowledge, and open-mindedness; situational variables of training in probabilistic reasoning and participation in collaborative teams." | Mellers et al. 2015, ***Journal of Experimental Psychology: Applied*** 21(1): 1-14. DOI 10.1037/xap0000040. PMID 25581088. *(Corrected from earlier draft's PPS attribution.)* | foundational; current-state but heavily cited |
| 17 | The top 2% of forecasters in the GJP after Year 1, designated "superforecasters," were tracked into elite teams that worked together across years. | "Tracking placed the highest performers (top 2% from Year 1) in elite teams that worked together." | Mellers et al. 2014, *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255. | foundational |
| 18 | GJP elite teams outperformed the U.S. Intelligence Community Prediction Market (ICPM, populated by intelligence analysts with classified-information access) by approximately 25-30% in Brier-score terms, and team aggregates beat external prediction markets by 15-30%. | Goldstein et al. GJP-vs-ICPM technical paper at goodjudgment.com/wp-content/uploads/2020/11/Goldstein-et-al-GJP-vs-ICPM.pdf; corroborating Tetlock public statements. *(Sourcing corrected post-Gate-0: not in Mellers 2015 paper bodies as previously claimed.)* | Goldstein et al. (Good Judgment Inc. technical paper); Tetlock public statements 2015-2024. | current-state applied; sourced to first-party GJP team paper; passes |
| 19 | The Mellers 2014 claim that probability training and team participation directly *cause* gains in forecasting ability is contested by Hauenstein et al. 2025: an IRT reanalysis found the effects shrank, vanished, or in some cases reversed once method-variance variables were controlled. | "...the relationship between latent ability estimates and forecast accuracy differed from the interpretation of the original findings once key extraneous variables were statistically controlled." | Hauenstein, Thomas, Illingworth, Dougherty 2025, *Psychological Science* 36(1): 3-18. Online 2024-12-04. DOI 10.1177/09567976241266481. | active-debate / 18-month / passes (recently published critique within bar) |
| 20 | A single-session debiasing-training intervention (game with personalized feedback + practice) reduced six biases by 31.94%+ immediately and 23.57%+ at 2-month follow-up. The video-based version reduced biases by 18.60%+ immediately and 19.20%+ at 2-month follow-up. Six biases tested: anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, representativeness. | "Training with interactive computer games that provided players with personalized feedback, mitigating strategies, and practice, reduced six cognitive biases by more than 30% immediately and by more than 20% as long as three months later." Plus per-modality effect sizes from the abstract body. | Morewedge et al. 2015, *Policy Insights from BBS* 2(1): 129-140. DOI 10.1177/2372732215600886. | applied / current-state; field-cited foundational status for "single intervention can debias" |
| 21 | The Morewedge debiasing-training effect transferred to a Shuttle-Challenger-modeled field business case. Trained participants were 19-29% less likely to pick the hypothesis-confirming inferior solution than untrained participants. (Specific figure varies across summaries; verbatim from the source-paper PDF body pending Phase 7.) | "Trained participants were [19-29%] less likely to choose the inferior hypothesis-confirming solution than untrained participants." | Sellier, Scopelliti, Morewedge 2019, *Psychological Science* 30(9): 1371-1379. DOI 10.1177/0956797619861429. | applied / 7-year-old foundational; verbatim figure pending Phase 7 verification |
| 22 | A preregistered replication of Kahan's motivated-numeracy effect found no good evidence for it as a general phenomenon (Persson et al. 2021). | "We did not find good evidence for motivated numeracy; there are distinct patterns in our data at odds with the core predictions of the theory." | Persson, E., Andersson, D., Koppel, L., et al. (2021). "A preregistered replication of motivated numeracy." *Cognition* 214: 104768. PMID 34051421. DOI 10.1016/j.cognition.2021.104768. | current-state (5 years old); 18-month bar exempt as foundational replication-pressure cite; passes |
| 23 | A modified replication in a Western European sample reproduced the basic motivated-numeracy effect but did NOT find the high-numeracy-amplifies-polarization pattern (Connor et al. 2024). | "We replicate the basic motivated numeracy effect, but we do not find evidence of increased polarization among high-numeracy participants." | Connor, P., Sullivan, E., Alfano, M., & Tintarev, N. (2020/2024). "Motivated numeracy and active reasoning in a Western European sample." *Behavioural Public Policy*. DOI 10.1017/bpp.2020.32. | current-state; passes |

Two specific numerical claims remain flagged as needing Phase 7 re-verification against original PDFs:

- Row 16/Throughline (Mellers JEP:Applied): the *exact ranking* among predictors (cognitive ability vs political knowledge vs AOMT) requires the paper-body PDF; Phase 7 should pull and the prose updates if AOMT ranks lower than the matrix currently implies.
- Row 21 (Sellier 2019 percentage): the 19-29% range needs to collapse to a single verbatim figure from the paper's PDF body in Phase 7. Codex's claim of a published corrigendum (29 → 19%) was not verified by the verification subagent at the cited corrigendum URL; if a real corrigendum surfaces in Phase 7, the matrix updates.

Both are flagged as `marginal-but-stable-enough` until closure.

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

*Populated in Phase 3.*

## Codex research review

Run 1, Gate 0, 2026-05-07. Findings file at `notes/scout-mindset-codex-research-20260507.md`.

**Findings: 12 STRUCTURAL (one labeled cosmetic in body), 0 cosmetic-only.**

Codex's hostile pass surfaced substantive sourcing problems my Phase 2 sweep missed. Summary of dispositions:

| # | Codex finding | Action taken |
|---|---|---|
| 1 | Galef rows 1-5 have only secondary-outline verification | Matrix rows annotated as "secondary-outline verification only — Phase 7 to re-verify against book"; not dropped, but their status is now explicit |
| 2 | Galef has FIVE self-tests in Chapter 5, not four in Chapter 6 | Matrix Row 3 corrected; Spec walk-away point #3 corrected; Sub-topic 5 in Research notes lists all five with names |
| 3 | "Four asymmetries" in Spec is a category error (Mercier/Sperber + Trivers aren't asymmetries) | Spec walk-away point #1 reframed: "three asymmetries + social-architectural roots"; Research notes Sub-topic 1 restructured to the same shape |
| 4 | Mellers 2015 mis-sourced — quote is from *JEP:Applied*, not *PPS* | Matrix Row 16 corrected to *JEP:Applied* 21(1):1-14, DOI 10.1037/xap0000040. AOMT-as-strongest claim hedged |
| 5 | Row 18: "CIA analysts" wrong; 25-30% not in Mellers paper | Matrix Row 18 corrected to "Intelligence Community Prediction Market (ICPM)"; sourced to Goldstein et al. GJP-team paper + Tetlock public statements, not Mellers 2015 |
| 6 | Row 19 / throughline contradiction with Hauenstein | Throughline rewritten: drops "team aggregation" from the recipe; treats the causal status of teaming/training as an open question; uses Hauenstein as Act-3 teaching moment |
| 7 | Row 21 Sellier 29% may have been corrected to 19% | **DISAGREE in part.** Verification subagent could NOT find a published corrigendum at the URL Codex cited (10.1177/0956797620930211 redirects to a different paper). Matrix hedges as "19-29% across summaries; verbatim pending Phase 7 PDF access." If the corrigendum is real, Phase 7 catches it |
| 8 | Row 20 Morewedge games vs videos conflated; "one-hour" not supported | Matrix Row 20 corrected to per-modality effect sizes (game ≥31.94/23.57%, video ≥18.60/19.20%); "one-hour" wording dropped pending verification |
| 9 | Row 11 Kahan needs replication caveat | Two new matrix rows added: 22 (Persson 2021) and 23 (Connor 2024); Spec walk-away point #2 hedged to acknowledge replication pressure |
| 10 | Rows 12-14 lack page locators | Annotated as "page locator not surfaced; book-level citation only"; not dropped |
| 11 | Row 15 Brier 1950 needs convention cleanup | Matrix Row 15 expanded with explicit convention note (0-1 binary in modern GJP usage; 0-2 in Brier's original two-outcome form); Sub-topic 2 in Research notes adds the convention |
| 12 | Darwin Gutenberg ID #2087 wrong | Corrected to **#2010**; Sub-topic 6 in Research notes and Matrix Row 6 updated |

The two rows where I disagree partially with Codex: Sellier corrigendum (handled above as hedge pending verification), and the Galef-rows secondary-outline-only criticism (kept the rows but explicitly annotated, since the post would be unwriteable without Galef terminology and the secondary-outline corroboration is consistent across multiple independent outlines).

Re-running Gate 0 with corrections applied as Run 2.

## Resume here

Last touched: 2026-05-07.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | in progress (Gate 0 Run 1 done with 12 STRUCTURAL findings; corrections applied; Run 2 next) | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com`, `## Codex research review` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/scout-mindset/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-07 | 0 (research) Run 1 | structural findings (12); fixes applied; re-run pending | `notes/scout-mindset-codex-research-20260507.md` + summary in `## Codex research review` |

### Phase 5 figure progress

*Populated at end of Phase 3.*

### Suggested next batch

1. Re-run codex Gate 0 (Run 2) on the corrected matrix and research notes to verify structural findings are closed.
2. If Run 2 returns cosmetic-only or "no structural issues found", proceed to Phase 3 (outline + figure list).
3. If Run 2 surfaces new structural findings, apply fixes; max 2 more Gate 0 invocations before halt-and-surface.

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
