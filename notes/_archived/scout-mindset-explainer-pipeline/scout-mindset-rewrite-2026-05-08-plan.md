# Scout-mindset rewrite implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `src/content/blog/scout-mindset/index.mdx` from a literature-tour essay into an applied explainer threaded through the running belief "AI-assisted quantity takeoff cuts estimator hours by ~40% on commercial bid packages, and the gain holds across estimators." 10 sections → 7. 10 figures → 7 redrawn around the belief. In-body author-year stitching demoted to footnotes / refs.

**Architecture:** Single-file rewrite (the existing MDX). Section-by-section prose drafts first (locked with Vic before moving on), then figures redrawn in order, then a footnote/refs cleanup pass. No new files. No worktree (single-author blog, work on `main`, commit per locked section).

**Spec:** `notes/scout-mindset-rewrite-2026-05-08-design.md` (commit `6a4b8b3`).

**Tracker:** `notes/scout-mindset.md` — updated at task 0 and task 17.

**Tech stack:** Astro 5, MDX, inline SVG, Tailwind 4. `bun run dev` for live preview, `bun run build` for parse-validation.

---

## Files

- **Modify:** `src/content/blog/scout-mindset/index.mdx` (currently 1209 lines, 56k tokens). Each prose task replaces a contiguous line range. Each figure task replaces an inline `<figure>...</figure>` block.
- **Modify:** `notes/scout-mindset.md` (the tracker). Tasks 0 and 17 update it.
- **No new files.**

---

## Conventions used in every task

- **Build verification.** After every prose or figure change, run `bun run build` once to verify the MDX still parses. Expected: build succeeds with no MDX errors. If it fails, fix syntax before showing Vic.
- **Live preview.** Vic reviews changes in `bun run dev` (port 4321) at `http://localhost:4321/blog/scout-mindset`. Reviewer responsibility.
- **Voice rules** (apply to every prose task): no em dashes; sentence-case headings; no "the post" as third-person actor; first-person Vic where it helps; second-person to the reader; banned-words list per `MEMORY.md → reference_writing_guide.md`.
- **In-body author refs allowed:** Darwin (his quote IS the section), Tetlock-and-Mellers (named once at GJP intro), Galef (her tests). Everyone else demotes to caption / refs / link-on-noun-phrase.
- **Figure placeholder pattern.** During prose tasks 1-7, replace existing figures with a comment placeholder: `{/* FIGURE: §N — short description; rendered in task NN */}`. Tasks 9-15 swap each placeholder for the redrawn SVG.
- **Commits.** One commit per locked section (after Vic approval). Commit format: `scout-mindset rewrite: §N — <short description>`. Co-author trailer per CLAUDE.md pattern.

---

## Task 0: Prep — tracker stub and figure-placeholder convention

**Files:**
- Modify: `notes/scout-mindset.md` — append a "Phase 5.5: rewrite" section
- No code changes yet

- [ ] **Step 1: Read the current tracker resume-here block**

Run: `grep -n "## Resume here" notes/scout-mindset.md` to locate. Read the Resume here block + the immediately surrounding phase notes.

- [ ] **Step 2: Append Phase 5.5 to the tracker**

Insert below the existing Phase-5 record and above the Phase-6 resume pointer:

```markdown
## Phase 5.5 — narrative rewrite (in flight)

Triggered 2026-05-08 by Vic feedback ("too researchy and not enough narrative or intuition"). Spec: `notes/scout-mindset-rewrite-2026-05-08-design.md`. Plan: `notes/scout-mindset-rewrite-2026-05-08-plan.md`. Codex consult chose option B (compress to 7 sections around a running belief); adversarial follow-up integrated as spine v2.

Running belief: "AI-assisted quantity takeoff cuts estimator hours by ~40% on commercial bid packages, and that gain holds across estimators rather than just the early adopters."

10 sections → 7. 10 figures → 7 redrawn. Section-by-section prose first, then figures, then refs cleanup. Resume points get updated as each task lands.
```

Update the `## Resume here` pointer to: "Phase 5.5 task 1 — draft §1 prose."

- [ ] **Step 3: Commit**

```bash
git add notes/scout-mindset.md
git commit -m "$(cat <<'EOF'
scout-mindset: tracker — open Phase 5.5 rewrite

Phase 5.5 is the narrative rewrite triggered by Vic feedback. Spec and
plan committed under notes/scout-mindset-rewrite-2026-05-08-{design,plan}.md.
Resume points get updated as each task lands.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 1: §1 prose draft — "A Tuesday morning, and the belief I keep losing arguments about"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx:15-138` (current §1 from `## Act 1` heading through end of §1 reader-can-now comment, *minus* the figure)
- Modify: `src/content/blog/scout-mindset/index.mdx` figure block lines 23-129 — replace with placeholder

**Spec for this section** (from design doc §"Spine v2 §1"):

> Open with a scene framed as "picture the demo I've shown a hundred times": Boon's AI takeoff overlay highlighting walls in a PDF viewer, an estimator comparing AI counts to manual takeoff, finding six walls that are wrong. The 40% claim is named in paragraph two, owned as the author's belief, directional-goal problem named immediately ("I sell this software"). The "two updates" thought experiment lands here as: how would I update if the same evidence reached me with the labels stripped off?
>
> Closing beat (restored per codex): "One person's read on this is a noisy estimate. The interesting question is what a less-noisy procedure even looks like — section 4."

**Required structural beats:**
1. Opening scene paragraph: "the demo I've shown a hundred times" (PDF viewer, AI overlay, six walls wrong). Concrete enough to picture, honest about being a demo construct.
2. Belief is named in paragraph 2: the 40% claim verbatim. Author owns it. Directional-goal disclosure: "I sell this software."
3. Two-updates thought experiment: same evidence reaches me with labels stripped off vs. labels attached. How does my update change?
4. Closing bridge: one person's read is noisy; section 4 is what a less-noisy procedure looks like.

**Drop from current §1:** the "[Dan Kahan and colleagues] reported that, on a politically loaded contingency table, more numerate subjects polarized *more* than less numerate ones, not less" paragraph (lines 131-135). Kahan moves to §3.

**Drop:** the second-half "Two things follow from the small case" pair (lines 133-135). The "smart-and-careful is not a defense" point gets folded into §3; the "single update is noisy" point becomes the closing bridge.

**Section heading:** `### 1. A Tuesday morning, and the belief I keep losing arguments about` (no Act 1 wrapper — see task 1.5 below for act removal).

- [ ] **Step 1: Read current §1**

Read `src/content/blog/scout-mindset/index.mdx` lines 13-138.

- [ ] **Step 2: Re-read the spec block above; confirm the structural beats**

- [ ] **Step 3: Draft §1 prose**

Following the four structural beats. Keep to ~half a page (~400-500 words). Replace existing lines 13-138 with the new section, leaving a figure placeholder where the existing Fig 1 was:

```markdown
{/* FIGURE: §1 — two-updates sketch with 40% takeoff belief as loaded framing; rendered in task 9 */}
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: build succeeds. If MDX parse error, fix syntax.

- [ ] **Step 5: Show Vic; await approval**

Vic reviews at `http://localhost:4321/blog/scout-mindset`. Iterate on prose until approved. The figure will render as the placeholder comment until task 9.

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §1 — Tuesday morning + the 40% belief

Replaces the Kahan-led §1 with a Tuesday-morning demo scene that names
the AI-takeoff productivity belief in paragraph two and discloses the
directional-goal conflict. Two-updates thought experiment retained;
closing bridge restored to "one person's read is noisy → section 4."
Figure rendered later in task 9.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 1.5: Remove the three-act `## Act` wrappers

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — remove the three `## Act N — …` headings

The new spine has 7 flat sections, no acts. The act wrappers from current lines 15, 495, 759 must go. Section headings stay `###`.

- [ ] **Step 1: Locate the act headings**

Run: `grep -n "^## Act" src/content/blog/scout-mindset/index.mdx`
Expected: three matches at the existing act boundaries.

- [ ] **Step 2: Delete each line and any blank-line separator**

Use Edit to remove `## Act 1 — The puzzle`, `## Act 2 — The scout's measurable side`, `## Act 3 — Personal scout mode (with the systems layer)` and the surrounding blank lines that lose meaning.

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: drop three-act wrappers

The spine v2 has 7 flat sections; the Act 1/2/3 headings no longer
match the structure. Removing them now so subsequent section drafts
land into a flat heading hierarchy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: §2 prose draft — "Why I am not a neutral observer"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §2 (lines ~139-217 of the original; line numbers shift after task 1 — locate by `### 2.` heading)

**Spec:**

> Half-page personal-conflict section. *Drops* the LRL/Ditto-Lopez machinery (those move to §3, where they're not duplicated). *Adds*: I see demo wins forwarded; I see failed pilots two layers later; my comp moves with the metric; my Twitter thread is calibrated to convince the next investor not the next reader. Seeds the §6 promise: "Section 6 will say what I'm going to do about it."

**Required structural beats:**
1. The position the author is in: company founder, comp tied to the metric, demo wins forwarded, failed pilots two layers downstream.
2. The information environment: what I see vs. what an estimator sees vs. what an estimator's manager sees.
3. Twitter / public-writing dynamic: my thread is calibrated for the next investor, not the next reader.
4. Closing seed for §6: "Section 6 will say what I'm going to do about it. The rest of this post is what I learned trying to figure out what to do."

**Drop entirely from current draft:** all of current §2 (Goldstein/ICPM puzzle setup) — it moves to §4. The current §2 also frames "the result that shouldn't be possible"; the new §4 owns that beat.

**Drop:** the "ICPM about 0.23, GJP about 0.15" body sentences (current lines 207-213) — they reappear in §4 as a one-paragraph beat.

**Section heading:** `### 2. Why I am not a neutral observer`

- [ ] **Step 1: Read current §2 (Goldstein puzzle)**

Locate via `grep -n "^### 2\." src/content/blog/scout-mindset/index.mdx`. Read the section.

- [ ] **Step 2: Re-read spec block above**

- [ ] **Step 3: Draft §2 prose**

Half-page (~300-400 words). No figure (placeholder optional; spec says "no figure or shared frame with §3" — leave no placeholder, the section is figure-free).

- [ ] **Step 4: Replace the located §2 block in index.mdx**

- [ ] **Step 5: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 6: Show Vic; await approval**

- [ ] **Step 7: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §2 — why I am not a neutral observer

Replaces the Goldstein/ICPM puzzle setup with a personal-conflict
section: founder position, metric-tied comp, asymmetric information
environment, the public-writing dynamic. Seeds §6's precommitment
move. The Goldstein result moves to §4.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: §3 prose draft — "What's actually happening inside the head"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §3 (Three asymmetries) AND current §4 (Architecture beneath) with one merged section

**Spec:**

> The only section that walks the studies. Three settled asymmetries (Kunda retrieval bias, LRL polarization, Ditto-Lopez thresholds), each one paragraph anchored to the takeoff belief. Contested Kahan fourth case: one paragraph for the case, one for the contestation, dissents in figure caption + refs. Mercier-Sperber + Trivers restored to a stronger paragraph (codex flagged folding them too tight): "the architecture that produces these patterns is social, which is why the rest of the post can't end with five thought experiments." This seeds §6 as non-optional.
>
> Darwin's notebook arrives at the end of §3, framed as artifact-not-quote. The artifact framing governs every subsequent move: §4 calibration log, §6 precommitment register, §7 takeoff log are all artifacts.

**Required structural beats:**
1. Opening: "If the architecture is built this way, here's what your brain does with the takeoff data." One-paragraph framing.
2. Three settled asymmetries, one paragraph each, each anchored to the takeoff belief:
   - Kunda directional retrieval: which estimator-hours studies my brain surfaces depends on my goal.
   - LRL polarization: two estimators with opposite priors read the same case study and walk away more confident.
   - Ditto-Lopez asymmetric thresholds: I scrutinize a study showing AI takeoff fails harder than I scrutinize one showing it works.
3. Kahan contested fourth case: one paragraph for the result (high-numeracy estimators polarize *more*); one paragraph for the contestation in plain prose ("the dramatic high-numeracy amplification didn't replicate in two preregistered studies; the basic effect did"). Specific dissents (Persson / Connor / Glüer-Pagin) move to figure caption.
4. Mercier-Sperber + Trivers paragraph: reasoning is built for argument, self-deception serves outward deception. Closing line: "the architecture that produces these patterns is social, which is why the rest of this post can't end with five thought experiments." Seeds §6 as non-optional.
5. Darwin's notebook beat: full quote (current line 487 — verbatim). Framed as **artifact, not thought experiment**. The artifact idea governs every subsequent move (foreshadow §4 calibration log, §6 precommitment register, §7 takeoff log).

**Drop from current draft:**
- The "smart-and-careful isn't a defense" sentence (current line 133) — fold into the opening paragraph here.
- The current §3 "the literature has been arguing about for a decade" framing — replace with "here's what your brain does with the takeoff data."
- The current §4 paragraph that previews §7, §9, §8 (current line 372) — pure meta-structure, drop entirely.

**Section heading:** `### 3. What's actually happening inside the head`

**Figure placeholder:** at the end of §3 (after Darwin's notebook), insert:
```markdown
{/* FIGURE: §3 — three-plus-one asymmetries operating on takeoff evidence; rendered in task 10 */}
```

- [ ] **Step 1: Read current §3 and §4 (the merge sources)**

Locate via `grep -n "^### [34]\." src/content/blog/scout-mindset/index.mdx`. Read both sections.

- [ ] **Step 2: Re-read spec block above; note all five required beats**

- [ ] **Step 3: Locate Darwin's quote in current §4**

Run: `grep -n "I had, also, during many years" src/content/blog/scout-mindset/index.mdx`
Quote starts at the located line; read 6-8 lines from there to get the verbatim block.

- [ ] **Step 4: Draft §3 prose**

Aim for 700-900 words. Five beats, in order. Use Darwin's quote verbatim.

- [ ] **Step 5: Replace current §3 + §4 block in index.mdx**

Remove both `### 3.` and `### 4.` sections in their entirety; insert the new merged §3.

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 7: Show Vic; await approval**

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §3 — what's actually happening (merged §3+§4)

Merges asymmetries and architecture into one mechanism section. Three
asymmetries each anchored to the takeoff belief; Kahan compressed with
dissents demoted to figure caption. Mercier-Sperber/Trivers restored
to a load-bearing paragraph that seeds §6 as non-optional. Darwin's
notebook lands here as artifact (not quote) and governs subsequent
artifact moves.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: §4 prose draft — "How would I know if my belief is getting more accurate?"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §5 + §6 with one merged section. Pull the Goldstein-vs-ICPM beat from former §2 (now removed) into this section's body.

**Spec:**

> Lede rewritten per codex: "What would count as being right about the 40% claim?" IARPA enters only as the best available machinery for answering it.
>
> Triaged content:
> - *Brier and the calibration plot:* in body, walked using takeoff forecasts as the worked example.
> - *GJP-vs-ICPM:* one-paragraph beat. "Calibrated aggregation beat a market on shared questions; that's the proof of concept that a procedure can do this."
> - *AOMT:* in body, framed explicitly as "one predictor among seven, not the predictor" (codex: don't let §4 imply scout-mindset caused GJP).
> - *Aggregation funnel:* in body, walked using "ten estimators" as the worked example.
> - *Hauenstein-vs-Mellers:* moves out of §4 entirely. Lives in §6.

**Required structural beats:**
1. Lede: "What would count as being right about the 40% claim?" — open on the belief, not on IARPA.
2. Brier definition with worked example: "if I forecast 0.7 that this estimator saves 40% on the next package and they save 32%…" Use the verbatim "(0.7 - 1)² = 0.09" worked example from current §5 line 505.
3. Calibration plot description: pool forecasts by stated probability, ask what fraction of those events happened. The plot is the picture; the score is its summary number.
4. AOMT: one paragraph. Explicit "one predictor among seven, not the predictor." Cite Tetlock-and-Mellers by name (allowed in body).
5. GJP-vs-ICPM beat: one paragraph. "An IARPA tournament let calibrated aggregation procedures and a CIA-run prediction market answer the same questions for a year. The aggregation procedure won, on Brier, by a clear margin." Numbers: 0.15 vs 0.23 (0-to-2 scale). Caveat: the "best method" was selected ex post.
6. Aggregation funnel walked with 10 estimators: independent estimators with the same bias get √n variance reduction; correlated estimators eat the gain.
7. Closing bridge: "Which is exactly what §6 will operationalize for a small team."

**Drop from current §5+§6:**
- The "Brier on the 0-to-2 scale" methodological aside (current line 507) — keep one explicit-scale sentence with the GJP numbers; everything else goes.
- The "All Surveys Logit caveat" methodological paragraph (current line 745) — compress to "the GJP team flagged that comparison as partly an ex-post selection."
- All Hauenstein-vs-Mellers material (current lines 749-755) — moves to §6 entirely.
- The "Mellers/Stone/Atanasov 2015 lists seven predictors" sentence with the full quote (current line 503) — paraphrase: "AOMT was one of seven predictors the GJP team identified; it isn't the predictor."

**Section heading:** `### 4. How would I know if my belief is getting more accurate?`

**Figure placeholders:**
```markdown
{/* FIGURE: §4 Fig A — calibration plot with takeoff-forecast inset; rendered in task 11 */}
{/* FIGURE: §4 Fig B — aggregation funnel with ten estimators; rendered in task 12 */}
```

Place them at the natural break-points in the prose (after the calibration-plot paragraph and after the aggregation-funnel paragraph).

- [ ] **Step 1: Read current §5 and §6**

- [ ] **Step 2: Read the surviving beats from former §2 (lines 207-213) for the GJP-vs-ICPM numbers and the ex-post-selection caveat**

- [ ] **Step 3: Re-read spec block; confirm seven beats and the Hauenstein-removal rule**

- [ ] **Step 4: Draft §4 prose**

Aim for 800-1000 words. Seven beats in order. Two figure placeholders inserted.

- [ ] **Step 5: Replace current §5 + §6 block**

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 7: Show Vic; await approval**

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §4 — how would I know (merged §5+§6, GJP folded in)

Merged calibration/AOMT and aggregation/Hauenstein into one applied
section. Lede starts on the belief, not on IARPA. AOMT framed as
"one predictor among seven, not the predictor." GJP-vs-ICPM beat
preserved as one paragraph. Hauenstein-vs-Mellers moved out entirely
(lands in §6). Two figure placeholders for tasks 11 and 12.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: §5 prose draft — "Galef's five tests, run on the takeoff belief"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §7

**Spec:**

> Five tests applied to the running belief in five concrete passes, not introduced as a list. Each test gets a one-paragraph "here's what running it on the 40% claim actually surfaces" example. Asymmetry-mapping survives in figure caption only, not body.
>
> *Trainability paragraph removed from this section per codex* (it gets its own beat in §7).

**Required structural beats:**
1. Opening framing: "Pick the belief from §1. We're going to run five passes on it."
2. Galef test names verbatim. Each test gets one paragraph that is a concrete *application* to the 40% takeoff belief, not a definition. Order:
   - **Double Standard Test.** Running it on takeoff: would I judge a competitor's 40% claim with the same scrutiny I gave Boon's? What study design would I demand of them that I haven't demanded of us?
   - **Outsider Test.** Running it on takeoff: if a stranger were in this position, holding the evidence I currently hold and not my history with the company, what would I advise them?
   - **Conformity Test.** Running it on takeoff: if my YC batch and my construction-tech peer group no longer believed the 40% claim, would I still hold it on the strength of the evidence alone?
   - **Selective Skeptic Test.** Running it on takeoff: do I scrutinize a pilot that under-delivered as harshly as I celebrate one that over-delivered?
   - **Status Quo Bias Test.** Running it on takeoff: if I were starting from scratch in 2026 with the evidence I have now, and not the path-dependent commitment to selling this software, would I still adopt the 40% claim?
3. Closing bridge: "The tests are useful at running them on a single belief in five minutes. The next section is what to do at the team scale, where the architecture from §3 says the individual tests can't reach on their own."

**Drop from current §7:**
- The "Galef does not formally map" caveat in body prose (current lines 849-853) — moves to figure caption.
- The "the post's recommendation to run them on a belief is a 'reasonable, cheap to try' call" methodological hedge (current line 853) — drop entirely; the spec voice rules don't permit this kind of meta-hedge in body.
- The trainability paragraph at the end of current §7 — does not appear in this section. The trainability evidence belongs to §7 first beat.

**Section heading:** `### 5. Galef's five tests, run on the takeoff belief`

**Figure placeholder:**
```markdown
{/* FIGURE: §5 — Galef tests applied to the 40% belief, with what each surfaces; rendered in task 13 */}
```

- [ ] **Step 1: Read current §7**

- [ ] **Step 2: Re-read spec block; confirm the five-applications-not-five-definitions rule**

- [ ] **Step 3: Draft §5 prose**

Aim for 600-800 words. Test names are verbatim from Galef. Each application paragraph names a *specific concrete consequence* of running that test on the 40% belief, not a generic restatement.

- [ ] **Step 4: Replace current §7 block**

- [ ] **Step 5: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 6: Show Vic; await approval**

- [ ] **Step 7: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §5 — Galef's five tests, applied to takeoff

Five tests run as five concrete applications to the 40% belief,
not introduced as a list of definitions. Asymmetry-mapping demoted
to figure caption. Trainability paragraph removed (moves to §7).
Closing bridge to §6 on the architectural reason individual tests
need a team-scale complement.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: §6 prose draft — "Make it social: precommitment, outside review, blinded estimator trials"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §8

**Spec:**

> Systems-layer moves applied to the takeoff belief specifically.
>
> - *Precommitment:* the post writes out a dated 2026-05-08 entry in the body. "What would update me toward 'the gain doesn't generalize'": specific qualitative criteria the reader can hold the author to in 2027. This is the COI demonstration. No Boon press release; a paragraph in the post is the public record.
> - *Outside review:* a competitor's estimator, or an independent estimating consultancy, runs the same package blind. Described as a worked example, not a Boon promise.
> - *Aggregation:* the funnel from §4 generalized to "ten estimators, blind first-pass, then discuss" rather than "the ten Boon employees in the demo room."
> - *Hauenstein-vs-Mellers:* the literature-scale instance of the same family of move. Body of §6 is where the dispute is litigated; §7 references it only in the closing rhyme.

**Required structural beats:**
1. Opening: §3 said the architecture is social; §5 ran five thought experiments; this section is what the architecture-shaped problem actually demands. Five thought experiments alone leave most of the §3 failure surface in place.
2. **Precommitment, with the dated artifact.** Frame as: "The bureaucracy is the point." Then write out a literal precommitment paragraph, dated 2026-05-08, addressed to the future reader:

> *As of 2026-05-08, here's what would update me toward "the 40% gain doesn't generalize beyond early adopters": [Vic's actual qualitative criteria — e.g., median estimator-hours saved below 25% across three blinded pilots on $2M+ packages with non-volunteer estimators; or no statistically distinguishable improvement in re-takeoff-after-revision time for estimators in their second year on the platform vs. their first month; etc. The exact criteria are Vic's call during draft.]*

This is the COI demonstration. The post body is the public record.

3. **Outside review** (one paragraph). A competitor's estimator, or an independent estimating consultancy, runs the same package blind. The point is structural: the test is not "show the customer the AI overlay and ask if they're impressed."
4. **Blinded aggregation** (one paragraph). The funnel from §4 generalized: ten independent estimators do a first-pass blind, then discuss. Tying conversation correlates the errors; the blind-first-pass is the structural move that preserves the independence the funnel needs.
5. **Hauenstein-vs-Mellers** (one paragraph). The literature-scale instance of the same family of move. Mellers 2014 made a causal claim about training-and-teaming as drivers of GJP forecaster gains. Hauenstein 2025's reanalysis re-tested it under controls and the effects shrank, vanished, or in some cases reversed. The aggregation-result holds; the causal-mechanism claim is still being argued, in print. That's what literature-scale post-publication critique looks like, and it's the same shape as the precommitment-and-publish move at the team scale.
6. Closing: §7 is what the smallest version of all of this looks like at the personal scale.

**Drop from current §8:**
- The "the post will not claim a specific decision-architecture move is empirically validated" methodological hedge (current line 869) — drop; spec rules don't permit this in body.
- The "structural moves match the section-4 diagnosis" meta-comment (current line 863) — drop.
- The current §8 list framing (precommitment / calibration tracking / outside review / post-publication critique) — current §8 has *four* moves; the new §6 has *four* too but the order and emphasis change: precommitment FIRST and most, then outside-review, then aggregation, then literature-scale. Calibration-tracking moves to §7 (the personal-habit beat).

**Section heading:** `### 6. Make it social: precommitment, outside review, blinded estimator trials`

**Figure placeholder:**
```markdown
{/* FIGURE: §6 — two-tier diagram (individual / systems / literature-scale) with takeoff-belief tile contents; rendered in task 14 */}
```

- [ ] **Step 1: Read current §8**

- [ ] **Step 2: Re-read spec block; the precommitment paragraph IS the COI demonstration**

- [ ] **Step 3: Draft §6 prose**

Aim for 700-900 words. The precommitment paragraph (beat 2) is the load-bearing one. Vic's actual qualitative criteria go inside the dated quote block — the executor must ASK Vic during draft what those criteria are; the plan can't pre-fill them.

- [ ] **Step 4: Replace current §8 block**

- [ ] **Step 5: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 6: Show Vic; await approval**

- [ ] **Step 7: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §6 — make it social, with the precommitment artifact

Replaces the systems-layer section with the four moves applied to
the takeoff belief specifically. The precommitment beat writes out
a dated 2026-05-08 paragraph in the body — the post itself is the
COI demonstration the reader can hold the author to. Hauenstein-
vs-Mellers lands here as the literature-scale instance of the same
family of move; §7 will only rhyme with it, not re-litigate.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: §7 prose draft — "The smallest habit that survives the evidence"

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — replace current §9 and §10 with one merged section

**Spec:**

> Two beats.
>
> *First beat (trainability, restored per codex):* ~250-word paragraph. Morewedge / Sellier-corrected-19% / Swaryandini meta-analysis / analyst study compressed but present. Conclusion: "small but real, transfer unresolved." Load-bearing for the next beat.
>
> *Second beat (prescription):* "When evidence arrives that argues against a belief you hold, write it down the same day. Date it. Re-read every quarter. That's the move." Then Darwin's notebook quote in full. Closing rhyme: Darwin (1876) → the takeoff log (2026) → the published-record discipline of a literature. Hauenstein-vs-Mellers gets one sentence: "a public record prevents silent absorption."

**Required structural beats:**
1. **Trainability paragraph (~250 words).** The honest answer: can you train the scout disposition? Studies say small but real, with unresolved transfer. Compress: Morewedge's bias-reduction game (~30% immediate, ~20% at two months); Sellier's 2019 field-transfer with the 2020 corrigendum that lowered 29% to 19%; the systematic-review/meta-analysis Hedges *g* of 0.26 (95% CI 0.14-0.39, "small but real"); the 2025 risk-analyst study (40-min intervention reduced confirmation bias on the post-test). Limitation that runs through all of it: real-world long-term transfer is unresolved. Conclusion: "small but real, transfer unresolved." This caps the ambition of the prescription that follows.
2. **Prescription beat.** Open with the prescription, not the hedge: "When evidence arrives that argues against a belief you hold, write it down the same day. Date it. Re-read every quarter. That's the move." Three numbered steps (verbatim from current §10 lines 1083-1086). Honest hedge: this is the smallest habit consistent with what the literature supports. Anything more ambitious would be promising more than the trainability evidence delivers.
3. **Darwin quote in full** (verbatim from current line 487 — the same quote moved earlier to §3 but reused here in full form for the closing rhyme).
4. **Closing rhyme:** Darwin (1876) → the takeoff log (2026) → the published-record discipline of a literature (Hauenstein-vs-Mellers gets ONE SENTENCE here: "a public record prevents silent absorption"). The three structural-analog ring move ends the post.
5. **Final line.** "Pick the belief from §1 and start your version of it this week."

**Drop from current §9+§10:**
- All effect-size detail beyond the headlines (`Hedges g`, `F`, `η²`, `p` values) — keep "small but real" qualitative.
- The "Hedge first, before the prescription" opener of current §10 (line 1079) — codex flagged this as the wrong posture for the close.
- The current §10 "the GJP individual-level findings list 'frequency of belief updating'" stitch (line 1079) — drop.

**Section heading:** `### 7. The smallest habit that survives the evidence`

**Figure placeholder:**
```markdown
{/* FIGURE: §7 — three concentric loops; middle ring = takeoff log; rendered in task 15 */}
```

- [ ] **Step 1: Read current §9 (trainability) and §10 (prescription)**

- [ ] **Step 2: Read current line 487 for Darwin's quote (will appear in both §3 and §7)**

- [ ] **Step 3: Re-read spec block; confirm two beats with trainability load-bearing**

- [ ] **Step 4: Draft §7 prose**

Aim for 600-800 words. First beat ~250 words, second beat ~350-450, plus closing. Darwin quote verbatim.

- [ ] **Step 5: Replace current §9 + §10 block**

- [ ] **Step 6: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 7: Show Vic; await approval**

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: §7 — smallest habit (merged §9+§10)

Two beats. Trainability paragraph compressed but load-bearing:
"small but real, transfer unresolved." Then the prescription, opened
on the move not the hedge. Darwin's quote in full. Closing rhyme of
Darwin (1876) → takeoff log (2026) → literature, with Hauenstein-
vs-Mellers reduced to one sentence on public-record discipline. Post
ends on "pick the belief from §1 and start your version this week."

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: References section update

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — `## References` section (current lines 1180-1208 of original; line numbers shifted)

**Spec for refs strategy** (from design doc §"Footnotes and refs strategy"):

> 1. **In-body author-year removed** except Darwin / Tetlock-and-Mellers / Galef.
> 2. **Demoted citations land in figure captions or refs.** Where a paragraph points at a study, the link goes on a noun-phrase ("the preregistered replication") not an author-year string.
> 3. **Dissent blocks compress.** The Persson / Connor / Glüer-Pagin trio becomes one body sentence ("the dramatic high-numeracy amplification didn't replicate; the basic effect did") plus a figure-caption pointer.
>
> The end-of-post References section largely survives, reorganized to support the demoted-citation pattern. Sources don't change.

**Required changes to the References section:**
1. **Reorganize by section** — group entries under subheadings matching the new spine (`§1`, `§3`, `§4`, `§5`, `§6`, `§7`). Currently the refs are flat. The reorganization makes each section's footnote-equivalent easier to find.
2. **Tag each entry** — append a small `[in figure caption]` or `[in body link]` or `[demoted from body]` tag where useful. Optional polish; skip if it makes the section ugly.
3. **Sources don't change.** No additions or removals to the source list. Same papers, same books, same secondary-verification corpus.

- [ ] **Step 1: Read the current References section**

Run: `grep -n "^## References" src/content/blog/scout-mindset/index.mdx` to locate. Read from there to end of file.

- [ ] **Step 2: Draft the reorganized References section**

Group entries under §-subheadings. Keep entry text identical to current.

- [ ] **Step 3: Replace the References section in index.mdx**

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 5: Show Vic; await approval**

- [ ] **Step 6: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: References — reorganize by section

Refs grouped under §-subheadings to support the demoted-citation
pattern. Sources unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Tasks 9-15: figures (revised 2026-05-09 after Vic + codex review)

The original figure tasks 9-15 in this plan reused the existing chart aesthetic of the post. Vic flagged on 2026-05-09 that those still felt academic because they charted research data rather than illustrating book concepts. Codex consult re-ran the figure plan; spec doc §"Figure plan" has the locked replacement.

**Direction summary** (full visual specs in design doc):

- All figures stay in the chart/diagram visual genre. No cartoons or silhouettes.
- Each figure illustrates a *book concept* and helps the reader understand it quickly.
- Three figures are interactive (§1 toggle, §4 sliders, §7 scrubber) using the existing Svelte 5 island + Canvas 2D widget pattern. The other four are static SVG.
- §1 figure is the post's visual thesis: scout vs. soldier as side-by-side processors.
- §2 gains a figure (originally none): the evidence pipeline that distorts what reaches attention.
- §3 reframes the four-panel asymmetry diagram as an *operational* diagnostic map (gates, not academic literature).
- §4 collapses the two planned figures into one combined two-part systems diagram.
- §5 worksheet matrix gains a "pressure map" sub-panel.
- §6 becomes a clean three-layer architecture (personal / team / literature).
- §7 keeps the three-ring loops but with the takeoff log as the middle ring.

For each figure task below, the executor should:
1. Read the design doc's "Figure plan" table for the locked visual spec on this section.
2. Locate the figure placeholder in the post (`{/* FIGURE: §N — ... */}`).
3. For static figures: read an existing static SVG figure in the post (or in `multi-gpu-training`/`generative-vision-stack`/`ssl-pretraining-recipes`) for color palette, typography, and viewbox conventions. Author the new SVG inline. The captions follow voice rules: sentence-case, no em dashes, no "the post."
4. For interactive figures: read `notes/multi-gpu-training.md` and the existing interactive-figure islands in `src/components/` (search for `.svelte` files referenced from blog MDX) to learn the pattern. Author a new island with the same conventions.
5. Verify build (`bun run build`) and dev render (`bun run dev`).
6. Take a playwright screenshot if browser is available; otherwise rely on Vic's local dev render.
7. Show Vic, iterate, commit.

### Task 9: Figure §1 — scout vs. soldier as the visual thesis (interactive)

**Concept:** the two orientations toward the same threatening evidence.

**Visual:** split-panel diagram, full width. Same input strip on the left side: `missed walls`, `false positives`, `40% faster package`, `slow estimator`. Forks into two processors. Soldier-mode gates: `defend`, `explain away`, `raise burden of proof`. Output: nearly flat credence line near "40% still true." Scout-mode gates: `record`, `separate signal/noise`, `update`. Output: stepped credence line that moves with the evidence. Axes: x = evidence events, y = confidence in the 40% claim.

**Interaction:** toggle `preferred / dispreferred evidence`. Soldier trace updates asymmetrically (large jumps for preferred, small for dispreferred). Scout trace updates by evidential weight regardless of valence.

**Implementation notes:** Svelte 5 island. Look at `multi-gpu-training/index.mdx` and `generative-vision-stack/index.mdx` for the existing interactive-figure pattern. Replace the `{/* FIGURE: §1 — ... */}` placeholder with the island import + component invocation.

**Steps:** read spec → read existing interactive-figure pattern in repo → author island → wire into MDX → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §1 — scout vs. soldier (interactive)`

### Task 10: Figure §2 — evidence pipeline (static, optional interactive)

**Concept:** directional incentives distort which evidence reaches attention.

**Visual:** evidence pipeline diagram. Left side: world events. Middle filters labeled `demo wins`, `support escalations`, `sales calls`, `failed pilots two layers away`, `investor narrative`. Right side: "my working belief." Filter thickness shows visibility (not truth) — wide for demo wins, narrow for failed pilots two layers away.

**Interaction:** ship as static for now. Optional follow-up: slider for `distance from customer failure`; farther failures fade before reaching the belief box.

**Steps:** read spec → locate `{/* FIGURE: §2 — ... */}` placeholder (added in Task 2's prose draft) → author static SVG → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §2 — evidence pipeline (static)`

### Task 11: Figure §3 — biased assimilation as an operational map (static)

**Concept:** motivated reasoning as a behavior pattern: same evidence, different operations.

**Visual:** four small operational panels. Each panel is a small flow diagram with the takeoff-belief evidence going in and being processed differently depending on whether it's preferred or threatening. Panels: `retrieve examples`, `weigh evidence`, `set acceptance threshold`, `identity alarm`. Author names removed from the graphic body — sources go in the figcaption only.

**Interaction:** none. Fast diagnostic map.

**Steps:** read spec → locate `{/* FIGURE: §3 — ... */}` placeholder → author static SVG → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §3 — biased assimilation operational map`

### Task 12: Figure §4 — calibration and aggregation as one systems diagram (interactive)

**Concept:** accuracy requires an external scoring loop plus independent estimates.

**Visual:** combined two-part systems diagram, side by side. Left: calibration grid, x = forecast probability, y = observed frequency, dots from takeoff forecasts ("40% hours saved by Q4"). Right: aggregation funnel with ten blind estimator estimates entering, correlated estimates shrink less, independent estimates shrink more. Shared bottom label: "one mind is noisy; scored records and independent estimates reduce different errors."

**Interaction:** sliders for `bias`, `variance`, `correlation`. Aggregate band widens / narrows; calibration dots reposition.

**Implementation notes:** Svelte 5 island. Combines two concepts in one figure — make sure the components share visual rhythm (same axis style, same dot conventions). The two original §4 figures (calibration plot, aggregation funnel) become one combined widget.

**Steps:** read spec → locate `{/* FIGURE: §4 — ... */}` placeholder → author island → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §4 — calibration + aggregation (interactive)`

### Task 13: Figure §5 — Galef worksheet + pressure map (static, optional click)

**Concept:** scout questions are instruments for locating where the belief is protected.

**Visual:** worksheet matrix. Rows = five Galef tests. Columns = `question asked`, `what it attacks`, `what the 40% claim would have to answer`. Compact cells, not prose blocks. Right-side "pressure map" shows which parts of the belief each test hits: `effect size`, `generalizes`, `non-adopters`, `measurement`. Visual link between row and pressure-map cell.

**Interaction:** ship static for now. Optional follow-up: click a test row, highlight the belief component it pressures.

**Steps:** read spec → locate `{/* FIGURE: §5 — ... */}` placeholder → author static SVG → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §5 — Galef worksheet + pressure map`

### Task 14: Figure §6 — three-layer architecture (static)

**Concept:** scout mode scales by moving updates out of one person's head.

**Visual:** layered architecture diagram. Personal layer at the top: `notebook`, `forecast log`. Team layer in the middle: `blind first-pass estimates`, `outside reviewer`, `precommitment register`. Literature layer at the bottom: `published claim`, `published critique`, `shared record`. Arrows showing evidence becoming harder to silently absorb as it moves outward.

**Interaction:** none.

**Steps:** read spec → locate `{/* FIGURE: §6 — ... */}` placeholder → author static SVG → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §6 — three-layer architecture`

### Task 15: Figure §7 — concentric loops with takeoff log middle ring (interactive scrubber)

**Concept:** the smallest trainable unit is a dated disconfirming-evidence loop.

**Visual:** concentric or stacked loops. Four explicit steps run around the loop: `notice` → `judge threat` → `write same day` → `review later`. Inner ring: Darwin (1876). Middle ring: the author's takeoff log (2026). Outer ring: public literature record. Caption explicit that these are analogous records, not identical mechanisms (codex flagged the family-resemblance honesty as a feature).

**Interaction:** small. A scrubber that steps through one disconfirming observation entering the loop and becoming a later update. The same observation reappears in the middle and outer rings as it scales.

**Implementation notes:** Svelte 5 island. Smaller scope than §1 / §4 — the interaction is a single scrubber. Reuse Canvas 2D widget conventions if applicable.

**Steps:** read spec → locate `{/* FIGURE: §7 — ... */}` placeholder → author island → verify build → render → show Vic → commit.

Commit message: `scout-mindset rewrite: Figure §7 — concentric loops with takeoff log (interactive scrubber)`

---

## Task 16: Footnote / refs cleanup pass

**Files:**
- Modify: `src/content/blog/scout-mindset/index.mdx` — full-file sweep

**Goal:** verify no in-body author-year stitching survives outside the allowed list (Darwin, Tetlock-and-Mellers, Galef). Verify no in-body effect-size formulas survive. Verify all hyperlinks resolve.

- [ ] **Step 1: Sweep for forbidden in-body author-year patterns**

Run:
```bash
grep -nE "(Persson|Connor|Glüer|Hauenstein|Mellers et al|Goldstein|Mercier|Sperber|Trivers|Kahan|Stanovich|West|Brier|Kunda|Lord|Ross|Lepper|Ditto|Lopez|Morewedge|Sellier|Swaryandini|Heerma|Baron) [12][09]" src/content/blog/scout-mindset/index.mdx
```
Expected: zero hits in body prose. Hits inside `<figcaption>` blocks or under `## References` are allowed.

If hits in body prose: edit each to demote to a noun-phrase link (`[the preregistered replication](URL)`) or move the source name to the figcaption.

- [ ] **Step 2: Sweep for in-body effect-size formulas**

Run:
```bash
grep -nE "([Ff]\(|η²|partial η|Hedges|95%? CI|p < 0\.|p<0\.|squared error)" src/content/blog/scout-mindset/index.mdx
```
Expected: hits only inside `<figcaption>` or `## References`. The Brier "(0.7 - 1)² = 0.09" worked example IS allowed in body — that's the definition, not a study reading.

If body hits remain: demote to caption or paraphrase ("small but real" instead of "Hedges *g* of 0.26").

- [ ] **Step 3: Sweep for "the post" as a third-person actor**

Run: `grep -n "the post" src/content/blog/scout-mindset/index.mdx`
Expected: zero hits.

If hits: rewrite each as first-person ("I will…") or second-person ("you can…").

- [ ] **Step 4: Sweep for "Section N returns / Section N will" meta-pointers**

Run: `grep -nE "[Ss]ection [0-9]+ (returns|will|comes back|covers|takes|introduces)" src/content/blog/scout-mindset/index.mdx`
Expected: at most 1-2 hits (the §1→§4 bridge, the §5→§6 bridge, the §6→§7 bridge — all of which are intended).

If excess hits: rewrite to remove the meta-pointer.

- [ ] **Step 5: Sweep for em dashes**

Run: `grep -n "—" src/content/blog/scout-mindset/index.mdx`
Expected: hits only inside `<figcaption>` (which preserve em dashes from existing captions if present) and the `*A mechanism-first take on Julia Galef's…*` opening italic block (verify with Vic — the original had em dashes here; the rewrite voice rule says no em dashes).

If body hits in new prose: replace with sentence rewrite or commas.

- [ ] **Step 6: Verify all hyperlinks resolve**

Run: `bun run build`
Expected: build succeeds with no link warnings.

- [ ] **Step 7: Show Vic the cleaned file**

- [ ] **Step 8: Commit**

```bash
git add src/content/blog/scout-mindset/index.mdx
git commit -m "$(cat <<'EOF'
scout-mindset rewrite: footnote/refs cleanup pass

Verified: no in-body author-year stitching outside allowed list
(Darwin / Tetlock-and-Mellers / Galef); no in-body effect-size
formulas; no "the post" third-person actor; em-dash rule honored;
intended Section→Section bridges preserved.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Tracker close-out + handoff to Phase 6

**Files:**
- Modify: `notes/scout-mindset.md`

- [ ] **Step 1: Read the current tracker, locate Phase 5.5**

Run: `grep -n "Phase 5.5" notes/scout-mindset.md`

- [ ] **Step 2: Mark Phase 5.5 complete**

Update the Phase 5.5 block: change "in flight" to "done YYYY-MM-DD" with a one-line summary (e.g., "10 sections → 7; 10 figures → 7 redrawn; refs reorganized; spec at notes/scout-mindset-rewrite-2026-05-08-design.md, plan at notes/scout-mindset-rewrite-2026-05-08-plan.md").

- [ ] **Step 3: Update the `## Resume here` pointer**

Change to: "Phase 6 — playwright per-figure review. The 7 redrawn figures need browser-rendering review, same protocol as the openclaw-and-hermes-agent post's Phase 6."

- [ ] **Step 4: Commit**

```bash
git add notes/scout-mindset.md
git commit -m "$(cat <<'EOF'
scout-mindset: Phase 5.5 done — narrative rewrite landed

7-section spine around the AI-takeoff running belief; 7 figures
redrawn; in-body author-year stitching demoted; refs reorganized
by section. Resume points to Phase 6 (playwright per-figure
review).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-review

**Spec coverage:** Every spec section mapped to a task.
- Goal & locked decisions → tasks 1-7 (the seven section drafts).
- Spine v2 §1 → task 1; §2 → task 2; §3 → task 3; §4 → task 4; §5 → task 5; §6 → task 6; §7 → task 7.
- Figure plan (10→7) → tasks 9-15 (one figure per section, except §4 has two).
- Footnotes/refs strategy → task 8 (References reorganization) + task 16 (cleanup sweep).
- Drafting cadence → task 0 (open) + task 17 (close).
- Voice rules → enforced as conventions in every prose task and verified in task 16.
- Out-of-scope items respected (no new sources, no new figures beyond the seven listed, no Boon-side public commitments outside the post body).

**Placeholder scan:** No "TBD" / "TODO" / "implement later" in task steps. Two intentional executor decisions are flagged explicitly: (a) Vic's actual qualitative precommitment criteria in task 6 step 3 — must be asked at draft time, not pre-filled; (b) the executor's prose is the prose, not pre-written here.

**Type / spec consistency:** Section headings consistent across spec and plan. Line numbers in the original draft cited as "current line N" with the warning that they shift as tasks complete (locate-by-grep pattern used throughout).

**One known adaptation:** The writing-plans skill's "if a step changes code, show the code" rule is partially relaxed for prose. The plan describes what each section's prose must contain (structural beats, voice rules, drop-list) but cannot pre-write a 5,000-word essay. The executor produces the prose during step 3 of each prose task. Same for figures: the plan describes the visual changes needed but cannot pre-write the SVG.
