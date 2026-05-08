# The scout mindset, applied

A mechanism-first take on Julia Galef's 2021 book *The Scout Mindset*. Not a book review. The post tries to make the reader feel *why* soldier mode is the default — by walking the empirical literature on motivated reasoning, identity-protective cognition, and prediction tournaments — then hands over a small toolkit of moves that operationalize scout mode on a belief they actually hold.

## Spec

**Audience.** Numerate knowledge workers who have to decide under uncertainty: engineers, founders, analysts, researchers. Already sympathetic to the rationalist-adjacent vocabulary (calibration, base rates, updating), but not steeped in it. The post should reward someone who has read Kahneman or Tetlock once and wants the *moves*, not the motivation. Lean technical; do not soften.

**Walk-away.** By the end the reader can:

1. Name the four asymmetries the empirical lit pins on soldier mode: selective scrutiny of disconfirming evidence (Lord/Ross/Lepper), asymmetric evidentiary thresholds (Ditto/Lopez), identity-protective cognition (Kahan), and reasoning-as-justification (Mercier & Sperber, Trivers).
2. Explain why a *more* numerate person can be a *less* accurate reasoner on politicized topics (Kahan motivated-numeracy result), and why this isn't a bug in intelligence but a feature of identity.
3. Run four concrete self-tests on a real belief they hold: the selective skeptic test, the outsider test, the conformity test, the status-quo bias test (Galef's operationalization).
4. State the GJP-AOMT result in one sentence: actively open-minded thinking, plus deliberate updating, plus team aggregation, beats CIA analysts on geopolitical forecasting by 25-30% (Mellers 2015).
5. Write down the smallest scout-mode habit they could keep this week, knowing it's the one move every primary source agrees on: record disconfirming evidence the moment it shows up. Darwin called it his golden rule.

**Walk-away test.** If a reader who finishes the post can't articulate the difference between "I disagree with X" and "I rate the evidence for X at p=0.4", the post failed.

**Topic-evolution classification.** Stable. 18-month recency bar. The book is 2021; foundational empirical work (Lord/Ross/Lepper 1979, Kunda 1990, Ditto/Lopez 1992) is field-canonical; the GJP findings (Mellers 2015) are 11 years old but heavily replicated and uncontested. Recency-bar enforcement applies to "current state of the field" claims (e.g., recent debiasing replications) rather than the foundational mechanism citations.

**Honest sourcing gap.** Phase 1 research did not surface a recent (≤ 18 months from 2026-05-07) RCT specifically validating scout-mindset *training* on real-world judgment outcomes. The post must NOT claim "RCTs validate scout-mindset training". It can claim, with primary backing: (a) AOMT predicts forecasting accuracy (Mellers 2015); (b) single debiasing-training interventions show ~20% bias reduction persisting at least 2 months across domains (Morewedge 2015). Phase 2 should look once more for a 2024-2026 replication or critique; if none surfaces, hedge the prose explicitly.

**Length.** Roughly a 30-minute read. About 7,000-9,000 words including figure captions.

**Figure mix.** 100% static SVG. Eight candidates listed in the Outline section once Phase 3 locks them. None of the eight currently meet the four interactive override clauses (continuous sweep / animation / drag / multi-state toggle) per `figure-recipes.md`; reconsider only if Gate 1 surfaces a STRUCTURAL finding requiring a re-type.

**Voice anchors.** Density over accessibility-padding. Concrete nouns. No hedge-and-balance on claims the literature actually settles. Sentence-case headings. Em dashes: zero. Match the rhythm of `unified-vision-stack` and `omni-modal-stack`.

## Throughline

**Lead candidate (locked):** Phil Tetlock's Good Judgment Project. Specifically the IARPA forecasting tournament (2011-2015) and its successor program at Good Judgment Inc. The named, public, citable scenario is: in a multi-year tournament with thousands of forecasters competing on hundreds of geopolitical questions, the top 2% of forecasters (Tetlock's "superforecasters") beat US intelligence community analysts (who had access to classified information) by roughly 25-30% on Brier-score accuracy, and beat prediction markets by 15-30%. The single strongest dispositional predictor of forecaster accuracy was actively open-minded thinking (AOMT) — a measurable trait whose definition reads almost word-for-word like Galef's scout mindset.

The throughline threads as follows:

- **Act 1 opens** on the GJP result as a paradox: how does "anyone with a laptop" beat the CIA? Set up the puzzle by walking what the soldier defaults look like (the four asymmetries) — these explain why intelligence professionals, who are smart, can lose to a calibrated amateur.
- **Act 2 returns** to the GJP repeatedly to ground each mechanism. AOMT is the dispositional finding. Brier score is how we measure. Frequent updating + team aggregation are the two situational levers. Each Act-2 section closes by saying "and this is why the GJP forecasters do X".
- **Act 3 reassembles** the GJP recipe at the personal scale: what one belief, one calibration habit, one update routine gets you, even if you'll never join a tournament. Closes on the smallest move that survives every primary source: write the disconfirming thing down the moment you see it. Darwin in 1887, GJP in 2026, you on Monday.

**Alternate (recurring vignette inside Act 1):** Charles Darwin's "golden rule" of recording observations against his own theory, verbatim from his 1887 autobiography. The line — "I had, also, during many years, followed a golden rule, namely, that whenever a published fact, a new observation or thought came across me, which was opposed to my general results, to make a memorandum of it without fail and at once; for I had found by experience that such facts and thoughts were far more apt to escape from memory than favorable ones." — is one of the cleanest historical primary sources for the scout-mode operating procedure. It pairs with the GJP result: Darwin and Tetlock's superforecasters built the same kind of system, separated by 130 years.

**Why this combination beats Darwin-only.** Darwin alone is vivid but small-stakes — one naturalist, one notebook. The GJP throughline gives the post hard numbers that survive Gate 0, plus an active program (`goodjudgment.com`) the reader can join. The Darwin vignette gives the post a concrete *move* — "write it down at once" — that compresses the entire mechanism into a single behavior the reader can copy without joining any tournament.

**Why this combination beats GJP-only.** GJP without Darwin makes the post feel like it's about forecasting tournaments. The Darwin vignette resets the scale: this isn't a tournament technique, it's a 19th-century working scientist's habit, and the GJP just measured what it does to your accuracy.

**Throughline number watchlist** (these specific numbers anchor the throughline; each gets its own claim-source matrix row):

- "Top 2% of forecasters" → superforecaster designation in Mellers et al. 2015.
- "25-30% better than CIA analysts" → GJP edge over IC, Mellers 2015 / Tetlock public statements.
- "15-30% better than prediction markets" → GJP team edge over markets, Mellers 2015.
- "AOMT predicted Brier score" → core dispositional finding, Mellers 2015.

If Phase 2 fact-checks any of these and finds the number drifted from the source, the prose updates with the source.

## Research notes

Grouped by sub-topic, not by source. Every quoted excerpt below is verbatim from a primary source unless explicitly marked otherwise. Access date: 2026-05-07 throughout.

### Sub-topic 1: why soldier mode is the default

The empirical literature pins soldier-mode reasoning on four interlocking mechanisms. The post will use these as the four asymmetries that explain why "just be more rational" doesn't work.

**Directional goals bias which information is considered (Kunda 1990).** Not just *how* we weight evidence — which evidence we even *retrieve*.

> "Directional goals affect reasoning by affecting which information will be considered in the reasoning process."
>
> — Kunda, Z. (1990). "The Case for Motivated Reasoning." *Psychological Bulletin* 108(3): 480-498. PubMed PMID 2270237. Open PDF at fbaum.unc.edu/teaching/articles/Psych-Bulletin-1990-Kunda.pdf.

The deeper reading: people don't notice the search is biased, because the searched-and-rejected items never reach awareness.

**Identical evidence polarizes rather than converges (Lord, Ross, Lepper 1979).** The classic capital-punishment study. Two cohorts read the same pair of fictional studies (one supporting the death penalty's deterrent effect, one refuting it). Both groups updated *toward* their priors.

> "The result of exposing contending factions in a social dispute to an identical body of relevant empirical evidence may be not a narrowing of disagreement but rather an increase in polarization."
>
> — Lord, C. G., Ross, L., & Lepper, M. R. (1979). "Biased Assimilation and Attitude Polarization." *JPSP* 37(11): 2098-2109. Open PDF at fbaum.unc.edu/teaching/articles/jpsp-1979-Lord-Ross-Lepper.pdf.

**Preferred conclusions face lower evidentiary thresholds (Ditto & Lopez 1992).** Subjects given an unfavorable medical "test result" took longer to accept it, retested more, and produced more confounding hypotheses than subjects given the favorable result.

> "Information consistent with a preferred conclusion is examined less critically than information inconsistent with a preferred conclusion, and consequently, less information is required to reach the former than the latter."
>
> — Ditto, P. H. & Lopez, D. F. (1992). "Motivated Skepticism: Use of Differential Decision Criteria for Preferred and Nonpreferred Conclusions." *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568.

*Verbatim numerical effect sizes did not surface in the budget.* Phase 7 freshness pass should retry; if the specific numbers stay out of reach, the post asserts the qualitative result without claiming a specific %.

**Numeracy *amplifies* polarization on identity-loaded data (Kahan et al. 2017).** The most surprising and load-bearing mechanism for the post. Subjects were shown a 2x2 contingency table either as a skin-rash treatment study (politically neutral) or as a gun-control study (politically loaded). On the neutral framing, higher numeracy meant higher accuracy. On the politicized framing, the *most* numerate were the *most* polarized — they deployed their quantitative skill selectively to reach the conclusion that matched their political identity.

> "Contrary to the prediction of SCT [science comprehension thesis], such polarization did not abate among subjects highest in numeracy; instead, it increased, supporting ICT [identity-protective cognition], which predicted that more numerate subjects would use their quantitative-reasoning capacity selectively to conform their interpretation of the data to the result most consistent with their political outlooks."
>
> — Kahan, D. M., Peters, E., Dawson, E., & Slovic, P. (2017). "Motivated Numeracy and Enlightened Self-Government." *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992.

*The exact accuracy comparison numbers (numerate vs less-numerate, neutral vs politicized) did not surface verbatim in the budget.* The post can describe the directional finding without claiming specific %s; if the numbers surface in Phase 7, add them.

**Self-deception serves outward deception (Trivers 2011).** The evolutionary framing: if you genuinely believe the false thing, you transmit no involuntary tells.

> "The primary reason we fool ourselves is to fool others."
>
> — Trivers, R. L. (2011). *The Folly of Fools: The Logic of Deceit and Self-Deception in Human Life.* Basic Books.

**Reason is built for argument, not for solo truth-seeking (Mercier & Sperber 2017).** The argumentative theory.

> "Reason is not geared to solitary use, to arriving at better beliefs and decisions on our own. What reason does, rather, is help us justify our beliefs and actions to others, convince them through argumentation, and evaluate the justifications and arguments that others address to us."
>
> — Mercier, H. & Sperber, D. (2017). *The Enigma of Reason*. Harvard University Press.

These six together are why being smart, well-read, or careful isn't enough on its own. Soldier mode is the architecture, not a glitch.

### Sub-topic 2: the scout's measurable trait

**Actively open-minded thinking (AOMT) is operationalizable.** Baron's scale and its successors define AOMT as a willingness to consider contrary evidence, weigh new information against held beliefs, tolerate complexity, and update in proportion to evidence.

> "Actively open-minded thinking is characterized by a willingness to seek out and reflect on contrary evidence and an openness to changing one's mind in the face of contrary evidence. This style of thinking includes the tendency to weigh new evidence against a favored belief, to spend sufficient time on a problem before giving up, and to consider carefully the opinions of others in forming one's own."
>
> — Baron, J. *Thinking and Deciding* (4th ed., Cambridge University Press, 2008). The AOMT scale itself originates with Baron (1985, 1988) and was operationalized as a published instrument by Stanovich & West (1997).

**Brier score is the standard accuracy metric.** A forecast probability *p* of an event that did or didn't happen yields a squared error (*p* − *o*)² where *o* ∈ {0, 1}. Average across forecasts; lower is better.

> "Verification of forecasts expressed in terms of probability has long been a difficult problem...the suggested verification score has the desirable properties that it is strictly proper [in modern terminology, of all forecasts equally accurate the only one minimising score is the truthful one], and it can be calculated from the probability assignments alone."
>
> — Brier, G. W. (1950). "Verification of Forecasts Expressed in Terms of Probability." *Monthly Weather Review* 78(1): 1-3. Open access at journals.ametsoc.org. *(Closing clause is the modern operational reading; Brier's own statement is on p. 1 of the original.)*

Modern Brier-score practice computes mean squared error over a forecaster's set of probabilistic predictions; the formula reduces to (*p* − *o*)² for binary events. Range 0 to 1 (or 0 to 2 in Brier's original two-class formulation).

### Sub-topic 3: GJP findings and the throughline numbers

The Good Judgment Project (2011-2015 IARPA tournament; ongoing as Good Judgment Inc.) is the post's empirical anchor. Key results:

**Top forecasters beat the CIA's market by 25-30% (Mellers 2015).** GJP's elite teams — selected from the top performers in the first tournament year — outperformed an internal prediction market populated by US intelligence analysts with classified-information access.

> "Key predictors of accuracy were dispositional variables of cognitive ability, political knowledge, and open-mindedness; situational variables of training in probabilistic reasoning and participation in collaborative teams that shared information and discussed rationales; and behavioral variables of deliberation time and frequency of belief updating."
>
> — Mellers, B., Stone, E., Atanasov, P., Rohrbaugh, N., Metz, S. E., Ungar, L., Bishop, M., Horowitz, M., Merkle, E., & Tetlock, P. E. (2015). "The Psychology of Intelligence Analysis: Drivers of Prediction Accuracy in World Politics." *Perspectives on Psychological Science* 10(3): 267-281.

The "25-30% over IC analysts" and "15-30% over prediction markets" framing is the standard public summary attributed to Tetlock and the GJP team based on the Mellers 2015 results. The verbatim "25-30%" number circulates in Tetlock public statements and AI Impacts summaries, but the *exact* percentage in the source paper requires PDF access I couldn't obtain in budget. *Phase 7 freshness pass: re-verify the "25-30%" number against the original PDF; if I find a different figure, the matrix and prose update.*

**Top 2% of forecasters were designated "superforecasters" (Mellers 2014).** Per-year ranking; tracking these into elite teams was one of the four trainable levers.

> "The research tested and found support for three psychological drivers of accuracy: training, teaming, and tracking. Probability training corrected cognitive biases, encouraged forecasters to use reference classes, and provided forecasters with heuristics, such as averaging when multiple estimates were available. Teaming allowed forecasters to share information and discuss the rationales behind their beliefs. Tracking placed the highest performers (top 2% from Year 1) in elite teams that worked together."
>
> — Mellers, B., Ungar, L., Baron, J., Ramos, J., Gurcay, B., Fincher, K., Scott, S., Moore, D., Atanasov, P., Swift, S., Murray, T., Stone, E., & Tetlock, P. E. (2014). "Psychological Strategies for Winning a Geopolitical Forecasting Tournament." *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255.

**The "training and teaming additively improve Brier score" claim is contested as of late 2024 (Hauenstein 2025).** A methodological reanalysis using item response theory found that, once method-variance variables were controlled, the training and teaming effect sizes shrank, vanished, or reversed.

> "Using data from a geopolitical forecasting tournament, Mellers et al. (2014) concluded that forecasting ability was improved by allowing participants to work in teams and providing them with probability training. The authors reevaluated Mellers et al.'s conclusions using an item response theory framework that models latent ability from forecasting choices. They found that the relationship between latent ability estimates and forecast accuracy differed from the interpretation of the original findings once key extraneous variables were statistically controlled."
>
> — Hauenstein, C. E., Thomas, R. P., Illingworth, D. A., & Dougherty, M. R. (2025). "Rethinking the Role of Teams and Training in Geopolitical Forecasting: The Effect of Uncontrolled Method Variance on Statistical Conclusions." *Psychological Science* 36(1): 3-18. Online publication 2024-12-04. DOI 10.1177/09567976241266481. Open PDF at gwern.net/doc/statistics/prediction/2024-hauenstein.pdf.

The claim *the post will not make:* "training and teaming additively boost Brier score by X%". The claim *the post will make instead:* "the GJP results showed AOMT and frequent updating predicted accuracy; whether the training and teaming interventions caused the gain (vs. selecting for already-high-AOMT participants) is contested by Hauenstein 2025 and the question is unresolved." This is itself a scout-mode behavior — accept the open question rather than pretend it's closed.

*No published Mellers/Tetlock response to Hauenstein has been located as of 2026-05-07.* The post should describe the state honestly: critique published December 2024, no published reply yet, still active in the literature. If a response surfaces during the Phase 7 freshness pass, the prose updates.

### Sub-topic 4: trainability of debiasing

**Single-session debiasing training reduces six biases ~30% immediately, ~20% at 2+ months (Morewedge 2015).** The most-cited recent evidence that a one-shot intervention can produce durable bias reduction.

> "Training with interactive computer games that provided players with personalized feedback, mitigating strategies, and practice, reduced six cognitive biases by more than 30% immediately and by more than 20% as long as three months later. The biases reduced were anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, and representativeness."
>
> — Morewedge, C. K., Yoon, H., Scopelliti, I., Symborski, C. W., Korris, J. H., & Kassam, K. S. (2015). "Debiasing Decisions: Improved Decision Making With a Single Training Intervention." *Policy Insights from the Behavioral and Brain Sciences* 2(1): 129-140. DOI 10.1177/2372732215600886.

**Effect transfers to field decisions (Sellier 2019).** A follow-up showed the training transferred to a Shuttle-Challenger-modeled business case.

> "Trained participants were 29% less likely to choose the inferior hypothesis-confirming solution than untrained participants...The results provide promising evidence that debiasing training effects transfer to field settings and can improve consequential decisions in professional and private life."
>
> — Sellier, A.-L., Scopelliti, I., & Morewedge, C. K. (2019). "Debiasing Training Improves Decision Making in the Field." *Psychological Science* 30(9): 1371-1379. DOI 10.1177/0956797619861429.

These two together back the post's claim that scout-mode practices are *trainable* without overclaiming RCT-level evidence specifically on Galef-style scout-mindset training.

*No 2024-2026 RCT specifically validating scout-mindset training as a package was located in budget.* The post will hedge: AOMT predicts accuracy (Mellers 2015), debiasing transfers (Morewedge / Sellier), the GJP intervention claims are themselves contested (Hauenstein 2025). The honest version is sharper than an overclaimed version anyway.

### Sub-topic 5: Galef's operationalization

**Scout / soldier dichotomy.** Galef's central frame.

> "[Scout mindset is] the motivation to see things as they are, not as you wish they were."
>
> — Galef, J. (2021). *The Scout Mindset: Why Some People See Things Clearly and Others Don't*. Portfolio / Penguin Random House. Verified across publisher and interview citations; full chapter-1 verbatim text not directly accessed in budget.

> "[Soldier mindset is] the motivation to defend your pre-existing beliefs against threatening evidence...motivated reasoning, in which our subconscious goal is to defend our beliefs."
>
> — Galef 2021, ibid. Verified across publisher and interview citations.

**The four self-tests (Chapter 6).** Galef proposes four thought experiments the reader can run on a real belief. The canonical names verified across multiple secondary sources (publisher pages, EA Forum and LessWrong outlines):

- **Selective Skeptic Test:** "Imagine this evidence supported the other side. How credible would you find it then?" *(Some secondary sources also call this the "Double Standard Test"; Phase 7 should confirm the name in the published book.)*
- **Outsider Test:** "Imagine someone else stepped into your shoes — what would you expect they would do in your situation?"
- **Conformity Test:** "If other people no longer held this view, would you still hold it?"
- **Status Quo Bias Test:** "Imagine your current situation was no longer the status quo. Would you actively choose it?"

> — Galef 2021, Chapter 6. Verified via publisher previews and corroborating outlines on EA Forum and LessWrong.

**Scout mindset framed as trainable, not innate.** Galef's three-pronged development strategy: recognise alignment (truth doesn't conflict with goals), build practical skills (thought experiments, probabilistic reasoning, ways of engaging disagreement), appreciate emotional rewards (the satisfaction of facing reality).

> — Galef 2021, Introduction; verified via EA Forum outline.

**TED talk (2016).** The Dreyfus Affair opening (Esterhazy/Picquart) is the canonical setup Galef uses to frame the dichotomy publicly.

> "Soldier" mindset = "defends your viewpoint at all costs"; "Scout" mindset = "spurred by curiosity"; central question = "Do you yearn to defend your own beliefs or do you yearn to see the world as clearly as you possibly can?"
>
> — Galef, J. (2016). "Why you think you're right — even if you're wrong." TED2016. ted.com/talks/julia_galef_why_you_think_you_re_right_even_if_you_re_wrong. *Full transcript not pulled verbatim in budget; key framings confirmed via TED summary and corroborating coverage.*

**Verified podcast appearances (for cross-reference, not primary citation).** Sean Carroll's Mindscape #143 (2021-04-19), EconTalk (Russ Roberts), ClearerThinking podcast #36. Sam Harris / Lex Fridman / Tyler Cowen / Ezra Klein dedicated episodes were not confirmed to exist in budget.

### Sub-topic 6: the historical seed (Darwin)

The single best historical primary source for the scout-mode operating procedure. Verbatim from Darwin's autobiography:

> "I had, also, during many years, followed a golden rule, namely, that whenever a published fact, a new observation or thought came across me, which was opposed to my general results, to make a memorandum of it without fail and at once; for I had found by experience that such facts and thoughts were far more apt to escape from memory than favourable ones. Owing to this habit, very few objections were raised against my views which I had not at least noticed and attempted to answer."
>
> — Darwin, C. *The Autobiography of Charles Darwin, 1809-1882*, ed. Nora Barlow (Collins, 1958), originally written 1876-1881, published posthumously in *The Life and Letters of Charles Darwin* (Francis Darwin, ed., 1887). Open at Project Gutenberg eText #2087 and at darwin-online.org.uk.

This passage compresses the entire scout-mode operating procedure into one move: write the disconfirming thing down the moment it shows up, because the brain will lose it otherwise. The post returns to it as the closing image.

## Claim-source matrix

Every load-bearing claim the post will make traces to a row below. Format: `# | Claim | Quoted source | Source ID + date | Recency status`. All sources accessed 2026-05-07. The post's topic-evolution classification is *stable* (18-month bar); foundational citations are marked `passes (foundational)` because the field treats them as canonical.

| # | Claim | Quoted source | Source ID + date | Recency status |
|---|---|---|---|---|
| 1 | Galef defines scout mindset as "the motivation to see things as they are, not as you wish they were". | "the motivation to see things as they are, not as you wish they were" | Galef 2021, *The Scout Mindset* (publisher page, interviews) | stable / 18-month / passes (foundational) |
| 2 | Galef defines soldier mindset as motivated reasoning whose subconscious goal is to defend pre-existing beliefs. | "[Soldier mindset is] the motivation to defend your pre-existing beliefs against threatening evidence...motivated reasoning, in which our subconscious goal is to defend our beliefs." | Galef 2021, ibid. | stable / 18-month / passes (foundational) |
| 3 | Galef proposes four self-tests in Chapter 6: Selective Skeptic, Outsider, Conformity, Status Quo Bias. | Test names + canonical phrasings verified across multiple secondary outlines (EA Forum, LessWrong, publisher previews); see Research notes Sub-topic 5. | Galef 2021, Ch. 6 | stable / 18-month / passes (foundational) |
| 4 | Galef frames scout mindset as a learned set of practiced habits, not an innate temperament. | "actual behavioral change—not self-perception—indicates genuine scout mindset development" | Galef 2021, Introduction | stable / 18-month / passes (foundational) |
| 5 | Galef's TED 2016 opens on the Dreyfus Affair (Esterhazy / Picquart) as the canonical contrast between soldier and scout. | TED.com summary + corroborating coverage; talk title "Why you think you're right — even if you're wrong" | Galef 2016, TED2016 | stable / 18-month / passes (foundational) |
| 6 | Darwin's stated practice for many years: record any fact opposed to his general results "without fail and at once," because such facts "were far more apt to escape from memory than favourable ones." | Full passage quoted in Research notes Sub-topic 6. | Darwin 1887, *Autobiography*, written 1876-1881; Gutenberg eText #2087 | stable / passes (foundational, field-canonical historical primary) |
| 7 | Darwin reported that his golden rule meant "very few objections were raised against my views which I had not at least noticed and attempted to answer." | "Owing to this habit, very few objections were raised against my views which I had not at least noticed and attempted to answer." | Darwin 1887, ibid. | stable / passes (foundational) |
| 8 | Directional goals bias *which* information is retrieved during reasoning, not just how it is weighted. | "Directional goals affect reasoning by affecting which information will be considered in the reasoning process." | Kunda 1990, *Psychological Bulletin* 108(3): 480-498. PubMed PMID 2270237. | stable / passes (foundational) |
| 9 | Subjects reading identical mixed evidence on a contested topic polarize further rather than converging — biased assimilation. | "The result of exposing contending factions in a social dispute to an identical body of relevant empirical evidence may be not a narrowing of disagreement but rather an increase in polarization." | Lord, Ross, Lepper 1979, *JPSP* 37(11): 2098-2109. | stable / passes (foundational) |
| 10 | Preferred conclusions face a lower evidentiary threshold than non-preferred ones; less information is required to reach the former. | "Information consistent with a preferred conclusion is examined less critically than information inconsistent with a preferred conclusion, and consequently, less information is required to reach the former than the latter." | Ditto & Lopez 1992, *JPSP* 63(4): 568-584. DOI 10.1037/0022-3514.63.4.568. | stable / passes (foundational) |
| 11 | On a politically loaded contingency table, more numerate subjects show *more* polarized interpretation, not less; numeracy amplifies identity-protective cognition. | "Contrary to the prediction of SCT, such polarization did not abate among subjects highest in numeracy; instead, it increased, supporting ICT [identity-protective cognition], which predicted that more numerate subjects would use their quantitative-reasoning capacity selectively to conform their interpretation of the data to the result most consistent with their political outlooks." | Kahan, Peters, Dawson, Slovic 2017, *Behavioural Public Policy* 1(1): 54-86. SSRN 2319992. | stable / passes (foundational) |
| 12 | Self-deception evolved to make outward deception more credible: the deceiver genuinely holds the false belief. | "The primary reason we fool ourselves is to fool others." | Trivers 2011, *The Folly of Fools*. Basic Books. | stable / passes (foundational) |
| 13 | Reasoning evolved primarily for social justification and persuasion, not for solo truth-seeking. | "Reason is not geared to solitary use, to arriving at better beliefs and decisions on our own. What reason does, rather, is help us justify our beliefs and actions to others, convince them through argumentation, and evaluate the justifications and arguments that others address to us." | Mercier & Sperber 2017, *The Enigma of Reason*. Harvard UP. | stable / passes (foundational) |
| 14 | Actively open-minded thinking (AOMT) is operationally a willingness to seek contrary evidence, weigh new evidence against held beliefs, tolerate complexity, and update accordingly. | "Actively open-minded thinking is characterized by a willingness to seek out and reflect on contrary evidence and an openness to changing one's mind in the face of contrary evidence...weigh new evidence against a favored belief...consider carefully the opinions of others in forming one's own." | Baron, *Thinking and Deciding* 4th ed. (Cambridge UP, 2008); scale origins in Baron 1985, 1988; published instrument in Stanovich & West 1997. | stable / passes (foundational) |
| 15 | Brier score for a binary forecast is the squared difference between forecast probability and outcome (1 if event occurred, 0 if not), averaged across forecasts; lower is better. | Brier 1950 introduces the score and its strict-properness; modern operational form is the mean of (*p* − *o*)². | Brier 1950, *Monthly Weather Review* 78(1): 1-3. Open access at journals.ametsoc.org. | stable / passes (foundational, 75+ years canonical) |
| 16 | In the GJP, the strongest dispositional predictors of forecasting accuracy were cognitive ability, political knowledge, and open-mindedness; the strongest situational predictors were probabilistic-reasoning training and team participation. | "Key predictors of accuracy were dispositional variables of cognitive ability, political knowledge, and open-mindedness; situational variables of training in probabilistic reasoning and participation in collaborative teams." | Mellers et al. 2015, *Perspectives on Psychological Science* 10(3): 267-281. | stable / passes (foundational) |
| 17 | The top 2% of forecasters in the GJP, designated "superforecasters," were tracked into elite teams that worked together across years. | "Tracking placed the highest performers (top 2% from Year 1) in elite teams that worked together." | Mellers et al. 2014, *Psychological Science* 25(5): 1106-1115. DOI 10.1177/0956797614524255. | stable / passes (foundational) |
| 18 | GJP-trained forecasters outperformed an internal US intelligence-community prediction market by approximately 25-30% in Brier-score terms; team aggregates beat prediction markets by 15-30%. | Public summary attributed to Tetlock and the GJP team based on Mellers 2015 results; verbatim "25-30%" wording in the source paper requires PDF body access. | Mellers et al. 2015, ibid. + Tetlock public statements | stable / passes (foundational) — *Phase 7 to re-verify exact percentage against original PDF; if different, update prose.* |
| 19 | The Mellers 2014 claim that probability training and team participation directly *cause* gains in forecasting ability is contested by a December 2024 IRT reanalysis (Hauenstein et al. 2025) which found the effects shrank, vanished, or reversed once method-variance variables were controlled. | "They found that the relationship between latent ability estimates and forecast accuracy differed from the interpretation of the original findings once key extraneous variables were statistically controlled." | Hauenstein, Thomas, Illingworth, Dougherty 2025, *Psychological Science* 36(1): 3-18. Online 2024-12-04. DOI 10.1177/09567976241266481. | active-debate / 18-month / passes (within bar; recently published critique) |
| 20 | A single one-hour debiasing-training intervention reduced six specific biases (anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, representativeness) by more than 30% immediately and more than 20% at 2+ month follow-up. | "Training with interactive computer games that provided players with personalized feedback, mitigating strategies, and practice, reduced six cognitive biases by more than 30% immediately and by more than 20% as long as three months later. The biases reduced were anchoring, bias blind spot, confirmation bias, fundamental attribution error, projection bias, and representativeness." | Morewedge et al. 2015, *Policy Insights from the Behavioral and Brain Sciences* 2(1): 129-140. DOI 10.1177/2372732215600886. | stable / passes (foundational) |
| 21 | The Morewedge debiasing-training effect transferred to a Shuttle-Challenger-modeled field business case: trained participants were 29% less likely to pick the hypothesis-confirming inferior solution. | "Trained participants were 29% less likely to choose the inferior hypothesis-confirming solution than untrained participants...debiasing training effects transfer to field settings and can improve consequential decisions in professional and private life." | Sellier, Scopelliti, Morewedge 2019, *Psychological Science* 30(9): 1371-1379. DOI 10.1177/0956797619861429. | stable / passes (foundational) |

Two specific numerical claims are flagged as needing Phase 7 re-verification against original PDFs:

- Row 11 (Kahan): the directional finding is verbatim quoted; the exact accuracy *percentages* by numeracy level on neutral vs politicized framing are not in the matrix verbatim. The prose will state the direction without naming a specific %. Phase 7 should pull the numbers if surfaceable.
- Row 18 (Mellers 2015 GJP edge): the "25-30%" framing circulates in Tetlock public statements; the *exact* number in the original PDF body needs Phase 7 re-verification. If different, update.

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

## Resume here

Last touched: 2026-05-07.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | in progress | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/scout-mindset/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|

### Phase 5 figure progress

*Populated at end of Phase 3.*

### Suggested next batch

1. Run the Phase-2 parallel research subagents to fact-check matrix candidates and dig deeper on any source the Phase-1 sweep flagged as not directly accessed (e.g., Sellier/Scopelliti/Morewedge 2019 field-transfer paper, Mellers 2015 verbatim numbers from PDF body).
2. Scan augusteo.com blog for related posts (`undoing-project`, `think-like-a-freak`, `fooled-by-randomness`, `talking-to-strangers`, `how-emotions-are-made-summary` are likely candidates) and record anchor points in `## Related posts on augusteo.com`.
3. Build `## Claim-source matrix` end-to-end, flagging marginal rows for closure.
4. Run codex Gate 0 on research notes + matrix.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline carry every locked-in choice from Phase 1.
2. Run resume-mode v2 migration if any v2 sections are missing (`## Throughline` / `## Claim-source matrix` / `## Related posts on augusteo.com` / `### Codex history`). Skip if all present.
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
