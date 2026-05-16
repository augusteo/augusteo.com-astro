# Scout-mindset rewrite — design

Date: 2026-05-08
Post: `src/content/blog/scout-mindset/index.mdx`
Tracker: `notes/scout-mindset.md`
Status: spec, awaiting Vic review before writing-plans

## Goal

Rewrite the post so it reads like the multi-gpu / generative-vision / SSL-pretraining posts: applied explainer with a running mechanism, intuition first, citations underneath. Same fidelity to the source literature, different center of gravity. Target read time stays ~30 minutes.

The user's complaint: "too researchy and not enough narrative or intuition." Concrete tells in the current draft:

- Author-year-journal stitching in body prose ("Persson 2021", "Hauenstein et al. 2025", "F(1, 169) = 20.7, p < 0.001, partial η² of 0.109").
- Meta-narration about the post itself ("the post takes the narrower claim", "Section 7 will return to").
- Dissents and methodological hedges woven into body.
- Figures look like academic-paper panels (Brier bar charts, Hedges-g forest pieces).
- The "pick a belief" thread is set up in §1 and dropped until §7.

Codex consult on structural shape (2026-05-08) recommended option B: compress to ~7 sections around a running belief. Adversarial follow-up on the spine flagged seven concrete weaknesses; this design integrates them.

## Locked decisions

1. **Four levers, all four pulled.** De-academic prose; thread one running belief; add scene/character anchors; restructure each section to lead with intuition then evidence.
2. **Running belief.** "AI-assisted quantity takeoff cuts estimator hours by ~40% on commercial bid packages, and that gain holds across estimators rather than just the early adopters." Self-implicating (the author runs Boon, which sells AI takeoff). The post visibly runs adversarial moves on its own prior.
3. **Structural shape.** 7 sections, codex's option B with the v2 revisions below.
4. **Voice.** First-person where it helps; second-person to the reader. Drop "the post" as a third-person actor. Keep Vic's writing-voice rules (no em dashes, sentence-case headings, banned-words list).
5. **Frontmatter.** Stays `draft: true`. Vic flips when ready.

## Spine v2 (post-codex-pushback)

### §1 — A Tuesday morning, and the belief I keep losing arguments about

Open with a scene framed as "picture the demo I've shown a hundred times": Boon's AI takeoff overlay highlighting walls in a PDF viewer, an estimator comparing AI counts to manual takeoff, finding six walls that are wrong. The 40% claim is named in paragraph two, owned as the author's belief, directional-goal problem named immediately ("I sell this software"). The "two updates" thought experiment lands here as: how would I update if the same evidence reached me with the labels stripped off?

Closing beat (restored per codex): "One person's read on this is a noisy estimate. The interesting question is what a less-noisy procedure even looks like — section 4."

Figure: two-updates sketch redone with takeoff belief as the loaded framing.

### §2 — Why I am not a neutral observer

Half-page personal-conflict section. *Drops* the LRL/Ditto-Lopez machinery (those move to §3, where they're not duplicated). *Adds*: I see demo wins forwarded; I see failed pilots two layers later; my comp moves with the metric; my Twitter thread is calibrated to convince the next investor not the next reader. Seeds the §6 promise: "Section 6 will say what I'm going to do about it."

No figure (or shared frame with §3).

### §3 — What's actually happening inside the head

The only section that walks the studies. Three settled asymmetries (Kunda retrieval bias, LRL polarization, Ditto-Lopez thresholds), each one paragraph anchored to the takeoff belief. Contested Kahan fourth case: one paragraph for the case, one for the contestation, dissents in figure caption + refs. Mercier-Sperber + Trivers restored to a stronger paragraph (codex flagged folding them too tight): "the architecture that produces these patterns is social, which is why the rest of the post can't end with five thought experiments." This seeds §6 as non-optional.

Darwin's notebook arrives at the end of §3, framed as artifact-not-quote. The artifact framing governs every subsequent move: §4 calibration log, §6 precommitment register, §7 takeoff log are all artifacts.

Figure: three-plus-one asymmetries panel, redrawn around the takeoff belief.

### §4 — How would I know if my belief is getting more accurate?

Lede rewritten per codex: "What would count as being right about the 40% claim?" IARPA enters only as the best available machinery for answering it.

Triaged content:
- *Brier and the calibration plot:* in body, walked using takeoff forecasts as the worked example.
- *GJP-vs-ICPM:* one-paragraph beat. "Calibrated aggregation beat a market on shared questions; that's the proof of concept that a procedure can do this."
- *AOMT:* in body, framed explicitly as "one predictor among seven, not the predictor" (codex: don't let §4 imply scout-mindset caused GJP).
- *Aggregation funnel:* in body, walked using "ten estimators" as the worked example.
- *Hauenstein-vs-Mellers:* moves out of §4 entirely. Lives in §6.

Figures (2): calibration plot redone with takeoff forecasts in the inset; aggregation funnel redone with 10 estimators.

### §5 — Galef's five tests, run on the takeoff belief

Five tests applied to the running belief in five concrete passes, not introduced as a list. Each test gets a one-paragraph "here's what running it on the 40% claim actually surfaces" example. Asymmetry-mapping survives in figure caption only, not body.

*Trainability paragraph removed from this section per codex* (it gets its own beat in §7).

Figure: Galef-tests-applied-to-takeoff worksheet.

### §6 — Make it social: precommitment, outside review, blinded estimator trials

Systems-layer moves applied to the takeoff belief specifically.

- *Precommitment:* the post writes out a dated 2026-05-08 entry in the body. "What would update me toward 'the gain doesn't generalize'": specific qualitative criteria the reader can hold the author to in 2027. This is the COI demonstration. No Boon press release; a paragraph in the post is the public record.
- *Outside review:* a competitor's estimator, or an independent estimating consultancy, runs the same package blind. Described as a worked example, not a Boon promise.
- *Aggregation:* the funnel from §4 generalized to "ten estimators, blind first-pass, then discuss" rather than "the ten Boon employees in the demo room."
- *Hauenstein-vs-Mellers:* the literature-scale instance of the same family of move. Body of §6 is where the dispute is litigated; §7 references it only in the closing rhyme.

Figure: two-tier diagram (individual / systems / literature-scale), tile contents rewritten in takeoff-belief terms.

### §7 — The smallest habit that survives the evidence

Two beats.

*First beat (trainability, restored per codex):* ~250-word paragraph. Morewedge / Sellier-corrected-19% / Swaryandini meta-analysis / analyst study compressed but present. Conclusion: "small but real, transfer unresolved." Load-bearing for the next beat.

*Second beat (prescription):* "When evidence arrives that argues against a belief you hold, write it down the same day. Date it. Re-read every quarter. That's the move." Then Darwin's notebook quote in full. Closing rhyme: Darwin (1876) → the takeoff log (2026) → the published-record discipline of a literature. Hauenstein-vs-Mellers gets one sentence: "a public record prevents silent absorption."

Figure: three concentric loops, captioned around the takeoff log as the middle ring.

## Figure plan (locked 2026-05-09 after Vic + codex revision)

10 → 7. The figures stay in the chart/diagram/graph genre that the rest of the blog uses (no cartoons / silhouettes / illustrative scenes). Each figure illustrates a *book concept* and helps the reader understand it quickly, rather than charting the underlying research data.

**Drop:**
- Current Fig 1 (two-updates Kahan sketch) — becomes prose only in §1; the §1 figure slot now holds scout-vs-soldier instead.
- Current Fig 2 (GJP/ICPM Brier bar chart) — becomes a sentence in §4. The aggregation *mechanism* is what §4's figure illustrates.
- Current Fig 4 (architecture-beneath panel + Darwin notebook) — content moves to §3 prose. Darwin's notebook reappears in §7's three-loop figure.
- Current Fig 5 (calibration plot + AOMT inset) — collapses into the new combined §4 figure.
- Current Fig 6 (aggregation funnel + Hauenstein inset) — collapses into the new combined §4 figure; Hauenstein content moves to §6's literature layer.
- Current Fig 9 (trainability bar chart + Hedges-g forest) — becomes a paragraph in §7.

**New figure plan (book-concept-anchored, three interactive):**

| Section | Book concept illustrated | Visual | Interactive? |
|---|---|---|---|
| §1 | **Scout mode vs. soldier mode** (Galef's central distinction; the visual thesis of the post) | Split-panel diagram. Same input strip on the left (`missed walls`, `false positives`, `40% faster package`, `slow estimator`). Forks into two processors. Soldier-mode gates: `defend`, `explain away`, `raise burden of proof` → flat credence line near "40% still true." Scout-mode gates: `record`, `separate signal/noise`, `update` → stepped credence line that moves with the evidence. Axes: x = evidence events, y = confidence in the 40% claim. | Yes. Toggle `preferred / dispreferred evidence`; soldier trace updates asymmetrically, scout trace updates by evidential weight. |
| §2 | **Directional incentives distort which evidence reaches attention** (the personal-conflict layer) | Evidence pipeline diagram. Left side: world events. Middle filters labeled `demo wins`, `support escalations`, `sales calls`, `failed pilots two layers away`, `investor narrative`. Right side: "my working belief." Filter thickness shows visibility, not truth. | Optional. Slider for `distance from customer failure`; farther failures fade before reaching the belief box. |
| §3 | **Motivated reasoning as a behavior pattern: same evidence, different operations** (the §3 mechanism layer) | Four operational panels: `retrieve examples`, `weigh evidence`, `set acceptance threshold`, `identity alarm`. Each panel uses the takeoff claim and shows preferred vs. threatening evidence moving through different gates. Author names removed from graphic body (move to caption). Fast diagnostic map. | No. Static. |
| §4 | **Accuracy requires an external scoring loop plus independent estimates** (calibration + aggregation as one systems concept) | Two-part systems diagram, side by side. Left: calibration grid, x = forecast probability, y = observed frequency, dots from takeoff forecasts ("40% hours saved by Q4"). Right: aggregation funnel, ten blind estimator estimates entering, correlated estimates shrink less, independent estimates shrink more. Bottom label: "one mind is noisy; scored records and independent estimates reduce different errors." | Yes. Sliders for `bias`, `variance`, `correlation`; aggregate band widens / narrows. |
| §5 | **Scout questions are instruments for locating where the belief is protected** (Galef's five tests as a worksheet) | Worksheet matrix. Rows = five tests. Columns = `question asked`, `what it attacks`, `what the 40% claim would have to answer`. Compact cells, not prose blocks. Right-side "pressure map" showing which parts of the belief each test hits: `effect size`, `generalizes`, `non-adopters`, `measurement`. | Optional. Click a test row, highlight the belief component it pressures. |
| §6 | **Scout mode scales by moving updates out of one person's head** (the systems-layer architecture) | Layered architecture diagram. Personal layer: `notebook`, `forecast log`. Team layer: `blind first-pass estimates`, `outside reviewer`, `precommitment register`. Literature layer: `published claim`, `published critique`, `shared record`. Arrows show evidence becoming harder to silently absorb as it moves outward. | No. Static hierarchy is enough. |
| §7 | **The smallest trainable unit is a dated disconfirming-evidence loop** (the prescription) | Concentric or stacked loops. Four explicit steps: `notice` → `judge threat` → `write same day` → `review later`. Inner ring: Darwin (1876). Middle ring: the author's takeoff log (2026). Outer ring: public literature record. Caption explicit that these are analogous records, not identical mechanisms. | Yes (small). Scrubber steps through one disconfirming observation becoming a later update. |

The visual thesis of the post is the §1 scout-vs-soldier figure; everything else stems from there. The Goldstein research-data chart is replaced by the §4 *aggregation mechanism* (with the GJP-vs-ICPM result preserved as one prose sentence). The Hauenstein-vs-Mellers content lives in §6 as the literature-scale row of the architecture, not as its own data chart. The Hedges-g forest is replaced by §7's "smallest habit" framing.

## Footnotes and refs strategy

Two layers:

1. **In-body author-year removed** except Darwin (the quote IS the section), Tetlock-and-Mellers (named once at GJP intro), Galef (her tests are §5).
2. **Demoted citations land in figure captions or refs.** Where a paragraph points at a study, the link goes on a noun-phrase ("the preregistered replication") not an author-year string. Effect sizes (F, η², Hedges g, p-values) move out of body entirely; "small but real, transfer unresolved" survives.
3. **Dissent blocks compress.** The Persson / Connor / Glüer-Pagin trio becomes one body sentence ("the dramatic high-numeracy amplification didn't replicate; the basic effect did") plus a figure-caption pointer.

The end-of-post References section largely survives, reorganized to support the demoted-citation pattern. Sources don't change.

## What's preserved verbatim or near-verbatim from current draft

- Darwin's full quote (current line 487).
- The Galef test names (verbatim from her Chapter 5).
- The Brier definition with the 0.7-and-event-happens worked example (current §5).
- The "precommitment is bureaucratic on purpose" framing (current §8).
- The closing line about the failure mode of the system being less likely to be silently absorbed (current §10 end).

The structural rhyme of Darwin / GJP-log / Hauenstein-vs-Mellers also survives, just with the takeoff log replacing the GJP-forecaster log as the middle ring.

## Drafting cadence

1. **Spec lock.** This document → Vic reviews → adjusted if needed.
2. **Section-by-section prose draft.** §1 → §7 in order. Each section locked with Vic before moving on. Inline link placeholders for refs; figures as TODO.
3. **Figure redo.** All seven redrawn after prose is locked. Figure dependence order: §1 (depends on §1 belief framing), §3, §4A, §4B, §5, §6, §7.
4. **Footnote/refs cleanup.** Single pass: demote remaining stitches, verify link targets, prune Refs to what the post loads.
5. **Phase 6 (tracker).** Playwright per-figure review.
6. **Phase 7 (tracker).** Freshness pass + draft flip.

## Out of scope

- New sources. The post's source matrix is locked; the rewrite is foregrounding only.
- New figures beyond the seven listed. If a section ends up needing a small inset (e.g., a Darwin-notebook-page sketch), discuss before drawing.
- Changes to other blog posts. Cross-references to undoing-project / fooled-by-randomness / talking-to-strangers stay, but no retroactive edits.
- Boon-specific public commitments outside the post. The §6 precommitment artifact lives inside the body of the post; no external press release or formal pre-registration.

## Risks and how the spec mitigates them

- **The Tuesday-morning scene reads staged.** Codex flagged this. Mitigated by framing the scene as "picture the demo I've shown a hundred times" — owning that it's the demo-day construct, not in-the-trenches reporting. The author lived the demo even if not the user-side experience.
- **The §6 COI demonstration is weak.** Codex flagged disclosure-vs-demonstration. Mitigated by writing the precommitment artifact directly into the body of §6, dated, with criteria the reader can hold the author to. The post itself is the artifact.
- **§4 still reads like a literature tour.** Codex flagged the IARPA lede. Mitigated by rewriting the lede to "what would count as being right about the 40% claim?" — IARPA enters as machinery for the question, not as the question.
- **Hauenstein-vs-Mellers double-dipping.** Codex flagged this. Mitigated by moving the dispute fully out of §4 and into §6, with §7 keeping only one sentence as a closing rhyme.
- **Trainability paragraph too small.** Codex flagged the parachute. Mitigated by giving §7 two beats: the trainability evidence first, then the prescription, with the trainability beat load-bearing for the prescription beat.
