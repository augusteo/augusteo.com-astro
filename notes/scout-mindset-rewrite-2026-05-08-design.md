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

## Figure plan

10 → 7. Three drop, seven redrawn around the takeoff belief.

**Drop:**
- Current Fig 2 (GJP/ICPM Brier bar chart) — becomes a sentence in §4.
- Current Fig 4 (architecture-beneath panel + Darwin notebook) — content moves to §3 prose.
- Current Fig 9 (trainability bar chart + Hedges-g forest) — becomes a paragraph in §7.

**Redraw around takeoff belief:**
| New | Was | Job |
|---|---|---|
| §1 Fig | Fig 1 | Two-updates sketch with 40% takeoff claim as loaded framing |
| §3 Fig | Fig 3 | Three-plus-one asymmetries operating on takeoff evidence |
| §4 Fig A | Fig 5 | Calibration plot; inset = forecast log instead of AOMT items |
| §4 Fig B | Fig 6 | Aggregation funnel with "ten estimators" as the worked example |
| §5 Fig | Fig 7 | Galef tests applied to the 40% belief, with what each surfaces |
| §6 Fig | Fig 8 | Two-tier diagram with takeoff-belief tile contents |
| §7 Fig | Fig 10 | Three concentric loops; middle ring = takeoff log |

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
