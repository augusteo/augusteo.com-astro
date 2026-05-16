# Claim spine: the 9-part section template

Every claim in the book gets one section in the post. Sections appear in the order the book introduces the claims (no reorganization into a thesis arc). Each section follows this fixed 9-part template:

```
1. Claim                — one-sentence statement
2. Claim type           — empirical / conceptual / historical / practical / moral / autobiographical
3. Centrality           — core / supporting / illustrative
4. What the book says   — faithful summary with [L#…] ledger anchor + short quote
5. Where the book gets it  — book's own source, tagged with source-quality-inside-the-book
6. Boundary conditions  — what the book explicitly does NOT claim
7. What the evidence says today  — current state of research with primary-source links
8. Credible critics     — tiered list with specific arguments
9. Where I land         — Vic's stance, wrapped in <!-- REVISE-WHERE-I-LAND -->
```

This file is the contract for Phase 4 drafting. Every section in the post conforms; deviations halt and surface to Vic.

## Why 9 parts (not 5, not 12)

The earlier 5-part shape (book / source / today / critics / land) was incomplete. Codex flagged on the plan that non-fiction needs:

- **Claim type** — the evidence standard for an empirical claim ("X improves outcomes by 50%") differs from a conceptual one ("Two modes of reasoning"). The post must hold each kind to its appropriate bar.
- **Centrality** — without an explicit weight, every claim gets the same section length, which makes a supporting anecdote sound as load-bearing as a core empirical claim. Centrality drives section length and emphasis.
- **Source-quality-inside-the-book** — an RCT and a memoir anecdote should NOT enter "today's evidence" as equivalent. Tagging it forces the prose to weight them differently.
- **Boundary conditions** — without "what the book does NOT claim," the post slides into overextension and dunk-on-strawman failures.

12 would be too many; 9 is the minimum that catches the failure modes.

## Part 1: Claim

One sentence. Plain English. The book's claim in the agent's words, faithfully.

**Good:** "Calibration training reliably improves probability estimation in a few weeks."
**Bad:** "Galef discusses calibration."

The claim is the section's H3 heading (numbered). Examples:

```markdown
### 4. Calibration training works, but in a narrower way than the book suggests
### 5. The soldier mindset is a recognizable cognitive pattern, not a moral failing
```

The H3 may include the agent's stance (e.g. "but in a narrower way than the book suggests") because the section's job is faithful-summary + scientific-accountability. The stance reflects what parts 7+8 will support; it is not a thesis the book imposed.

## Part 2: Claim type

Choose one. Tags the evidence standard for parts 7 and 8.

| Type | What it means | Evidence bar |
|---|---|---|
| `empirical` | Claim about how the world is, backed (or claimed to be) by data | Primary studies, replications, meta-analyses |
| `conceptual` | A framework, distinction, or mental model | Coherence + utility; not strictly empirical, but check if the framework predicts anything |
| `historical` | A claim about events / people / past | Primary historical sources, scholarship, dates |
| `practical` | A how-to / "you should X" recommendation | Outcome data on the practice when available; otherwise expert opinion + plausibility |
| `moral` | A value claim ("X is good / bad / right") | Argument structure; not falsifiable, but check internal consistency + counterarguments |
| `autobiographical` | The author's own experience | Internal consistency + plausibility; don't fact-check the author's lived experience |

Rendered in the MDX as a sentence: `*Type: empirical. Centrality: core.*` immediately under the H3.

## Part 3: Centrality

Choose one:

- `core` — the book's argument fails without this claim. Section gets ~600–900 words.
- `supporting` — the claim reinforces a core claim or extends it to a new domain. Section gets ~300–500 words.
- `illustrative` — anecdotal / example. The book uses it to illustrate; the post should rarely promote one to a section. Section gets ~150–300 words.

Centrality is set during Phase 2's claim-matrix-building, by reading how the book treats the claim (returned to repeatedly = core; mentioned once as example = illustrative).

## Part 4: What the book says

Faithful prose summary of the claim as the book makes it. Includes:

- An MDX-style ledger anchor `[L#…]` on the very first sentence of this part, resolving to a `kind: claim` or `kind: paraphrase` ledger entry.
- A short direct quote from the book if one captures the claim cleanly. The quote is wrapped in `<blockquote>` or styled as a callout, and has its own `[L#…]` marker resolving to a `kind: direct-quote` ledger entry. Quote ≤ 50 words.
- The chapter the claim appears in (e.g., "In chapter 3..."), so the reader can pick up the book and find it.

**Anchor rule.** Every sentence that asserts something the book said needs an anchor. Sentences that paraphrase the agent's framing of the book's argument do not need anchors but should not put words in the author's mouth.

Example:

```markdown
**What the book says.** Galef opens chapter 3 [L#42] by introducing the *scout* /
*soldier* split: scouts seek truth, soldiers defend territory. She writes:

> The scout's job is not to attack or defend. The scout's job is to understand. [L#73]

The chapter [L#44] develops this as a recognizable cognitive pattern...
```

## Part 5: Where the book gets it

The book's own cited source for the claim. Tag the source quality:

- `cited-RCT` — book points at a randomized controlled trial.
- `cited-single-study` — book points at one observational / correlational study.
- `cited-meta-analysis` — book points at a meta-analysis or systematic review.
- `cited-replicated-body` — book points at a literature where the finding has been replicated multiple times.
- `expert-quote` — book quotes an authority figure as evidence.
- `anecdote` — book gives an illustrative story.
- `personal-experience` — book reports the author's own experience.
- `assertion` — book asserts without citation (very common in pop-science).

Source-quality is captured in the ledger's claim entry AND in the prose:

```markdown
**Where the book gets it.** Galef cites Murphy & Winkler (1977) [L#198] on weather-
forecaster calibration as the main empirical support — a single study from 1977.
The book also nods at Lichtenstein et al. (1982) on calibration training generally.
*Source quality: cited-single-study, with a supporting citation to an older literature.*
```

The italic source-quality line at the end of part 5 is mandatory. It's how the reader can scan for "is this an RCT or an anecdote?"

## Part 6: Boundary conditions

What the book explicitly does NOT claim. This part exists to prevent two failure modes:

1. **Overextension by the post.** The agent reads the claim, generalizes it more than the book did, then "what evidence says today" critiques the over-generalization. That's a strawman.
2. **Overextension by the reader.** The book carefully scopes the claim, but the prose summary in part 4 drops the scoping, and the reader walks away with a stronger claim than the author made.

**How to write part 6:**

- Re-read the chapter the claim appears in. Look for the book's hedges, scope conditions, "this only applies when..." language.
- State the boundary explicitly. Use the book's own framing.
- If the book makes no boundary statement, write "The book asserts this without scope conditions" — that's its own kind of signal.

Example:

```markdown
**Boundary conditions.** Galef explicitly does not claim that calibration training
transfers across domains [L#46]. The weather-forecaster example is about
*forecasters becoming better at forecasting weather*, not about generic
"thinking probabilistically" skill. She also flags that the training requires
focused feedback — not just "try harder to be calibrated."
```

When the boundary is the load-bearing part of the section's critique in parts 7 and 8, surface it here even if it took digging to find.

## Part 7: What the evidence says today

Current state of research, as of the post's `pubDate`. The work happens in Phase 2 (evidence-check-protocol.md); part 7 renders the results to prose.

Classify the current state:

- `replicated` — finding holds in subsequent studies / meta-analyses.
- `refined` — finding holds with adjustments (smaller effect size, narrower scope).
- `weakened` — finding survives but is less robust than originally claimed.
- `disputed` — credible critiques exist; field genuinely mixed.
- `disproven` — finding does not survive replication / has been retracted.
- `unsettled` — no clear current consensus; original evidence stands alone.
- `no-update-found` — the agent couldn't find newer evidence; treat the original as the state. (Use this when search is exhausted, not as a lazy default.)

**Evidence-type integrity rule.** Do not treat:

- A single replication blog post as "the field disagrees".
- A pop-science writeup as a primary source.
- A failed-to-replicate study as proof the original was fraud.

Each source you cite has a type; respect the hierarchy (meta-analyses > replication studies > original RCTs > observational studies > expert blog posts > journalism > Twitter takes).

Example:

```markdown
**What the evidence says today.** Calibration of weather forecasters has held up
[link to Bröcker & Smith 2007 meta-analysis]: trained forecasters do achieve good
calibration in their domain. But generalization is weaker than the book implies
[link to Mellers et al. 2014 on the Good Judgment Project, which found
calibration training improved geopolitical forecasting only modestly without
ongoing feedback]. *Current state: refined.*
```

The italic current-state line at the end of part 7 is mandatory.

## Part 8: Credible critics

Critics by tier (see `critic-finding-protocol.md`). Each critic gets:

- **Name** (or org / publication if no individual author).
- **Tier label** — `T1` (academic / domain-expert), `T2` (long-form essay), `T3` (replication-tracker / community).
- **Specific argument** — quoted or paraphrased. Vague disagreement doesn't count.

**Critic balance rule.** If the field is genuinely mixed, the critics list reflects that. Do not curate a one-sided dunk pile. If the book stands up under scrutiny on a claim, part 8 says so explicitly: "No credible critics found in the search; the claim appears to hold."

Example:

```markdown
**Credible critics.**

- **T1 (academic): Andrew Gelman** has argued [link to Statistical Modeling blog
  post 2019] that "calibration is overrated as a general thinking skill" — his
  point is that domain-specific calibration doesn't transfer.
- **T1: Phil Tetlock** (originator of the Good Judgment Project) writes [link]
  that calibration without active forecasting practice degrades, which the book
  underplays.
- **T2 (long-form): The Atlantic 2023 piece** "[Title]" [link] takes the book's
  framing seriously but flags that the soldier / scout distinction is fuzzier
  than presented.
- **No T3 hits.** Retraction Watch and Data Colada have no entries on Murphy & Winkler.
```

If a tier has no entries, state it. Don't omit the tier silently.

## Part 9: Where I land

Vic's stance. The skill drafts placeholder text from the evidence + critics in parts 5–8 — see `where-i-land-template.md` for the drafting rules. The drafted text is wrapped in HTML comments:

```markdown
**Where I land.**

<!-- REVISE-WHERE-I-LAND -->
*Draft stance, generated from the evidence + critics above. Vic to rewrite in his voice.*

The book's framing of calibration is useful as a cognitive vocabulary but oversells
the practical transfer. The Murphy & Winkler evidence is real but narrow; the
Mellers et al. work suggests that what generalizes is the practice, not the
underlying skill. I'd take from this: calibrate yourself in the specific domains
you care about, and don't expect that to make you generally less biased.
<!-- /REVISE-WHERE-I-LAND -->
```

Vic scans the post for `REVISE-WHERE-I-LAND` comments after the Phase 4 user gate. For each block, he either:

1. **Rewrites in his own voice.** Replace the body with his prose, then remove both `<!-- REVISE-WHERE-I-LAND -->` and `<!-- /REVISE-WHERE-I-LAND -->` markers AND the `*Draft stance...*` italic preamble.

2. **Keeps the draft as-is.** Replace `<!-- REVISE-WHERE-I-LAND -->` with `<!-- KEEP-AS-IS: YYYY-MM-DD -->` AND replace `<!-- /REVISE-WHERE-I-LAND -->` with `<!-- /KEEP-AS-IS -->`. Remove the `*Draft stance...*` italic preamble. The body stays.

Both terminal states are valid for ship. **Gate D blocks ship on any remaining `REVISE-WHERE-I-LAND` markers** — they signal an unresolved Vic-owned section that cannot ship.

## Section ordering rules

- Sections appear in the order the book introduces the claims. The agent re-reads the chapter sequence to determine order; doesn't reorder for "narrative flow".
- Within a section, the 9 parts appear in the order above. Don't shuffle.
- Use H3 numbered headings (`### 1. ...`, `### 2. ...`) for sections; H4 (`#### Part name`) is NOT used for the 9 parts. Parts are inline bold labels in prose (`**What the book says.** ...`).
- Optional H2 chapter dividers (`## Chapter N: <chapter title>`) if the book has long parts and the post benefits from book-structure mirroring. Only use if the book has 3+ claims per part and the parts are thematically distinct.

## Ledger anchor enforcement

Every line in parts 4, 5, 6, and 7 that asserts something the book said or the evidence shows must have a citation:

- `[L#…]` markers for book content (resolving to ledger entries).
- Inline markdown links for external evidence and critics.

Phase 7's ledger-marker cross-check walks the MDX and verifies every `[L#…]` resolves. Phase 7's Gate D additionally verifies the prose near each marker faithfully renders the ledger entry's excerpt.

## When the template doesn't fit

Rare cases:

- **The book doesn't make discrete claims; it weaves an argument.** Example: a narrative-driven historical book. In this case, the agent halts after Phase 1 candidate-claim extraction and asks Vic whether to (a) extract claims anyway with low confidence, or (b) switch tools (use `explainer-authoring` to write a thesis-led narrative).
- **Two claims are deeply intertwined; the book treats them as one.** Merge into one section. The H3 is the combined claim; part 4 covers both.
- **A claim is impossible to evaluate without the surrounding chapter.** Lead the section with a 1-paragraph chapter summary BEFORE part 1 (using `> ` blockquote styling). Then proceed with the 9 parts.

In all other cases, the template is the contract. Conformance is checked by Gate C.
