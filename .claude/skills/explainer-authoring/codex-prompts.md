# Codex prompts (explainer-authoring)

Exact prompts for the three codex gates in the `explainer-authoring` pipeline. All gates invoke the project-local `codex` skill in consult mode.

All three gates apply regardless of figure type or entry mode (topic vs HTML-import). They auto-fire at phase boundaries; Vic does not need to type `/codex`.

The **shared runner mechanics** (build-prompt → invoke-codex → size-policy → history-table → parse-findings → 3-rerun cap → override safeguard → proof-of-fire) live in `../../explainer-shared/codex-runner.md`. This file is just the per-gate inputs: prompt template, what to embed, gate label, gate-key, halt rule, and notes-section name.

Per-gate inputs at a glance:

| Gate | When | Inputs embedded | Gate label | `<gate-key>` | Notes section |
|---|---|---|---|---|---|
| 0 | end of Phase 2 | Spec + Throughline + Research notes + Matrix + topic-evolution | `0 (research)` | `research` | `## Codex research review` |
| 1 | end of Phase 3 | above + Outline + figure table | `1 (outline)` | `outline` | `## Codex outline review` |
| 2 | Phase 7 | above + full MDX + Related posts + all prior `## Codex … review` | `2 (final)` | `final` | `## Codex final review` |

Skill-specific subtypes the runner forks to:

- **Gate 1** may return `TYPE-CHANGE STRUCTURAL` → fires the per-figure-type unlock protocol (see `SKILL.md`).

The Goal statement gets quoted into every gate prompt so codex's review pulls in the same direction:

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

## Gate 0: research-notes + claim-source matrix truthfulness pass

**When to run:** end of Phase 2, before Phase 3 outline drafting.

**What you provide to codex:**

- The full `notes/<post-slug>.md` file (`## Spec`, `## Throughline`, `## Research notes`, `## Claim-source matrix`).
- The post slug, target audience, target length, topic-evolution classification (actively-evolving / stable).

**The prompt:**

```
You are reviewing the research notes and claim-source matrix for a long-form blog post on
augusteo.com. The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the truthfulness layer before any prose is drafted. The matrix is the
contract: every load-bearing claim the post will make has one row mapping the claim to a
quoted excerpt from a primary source. If the matrix is wrong, the post is wrong.

The topic is classified as <actively-evolving | stable>. The recency bar is therefore
<12 | 18> months for primary sources backing load-bearing claims.

Find:

1. FABRICATED OR HALLUCINATED QUOTES. For each row in the matrix, does the quoted excerpt
   actually appear at the cited URL/arxiv ID? If you can't verify it (no internet
   access, can't reach the source), flag it as unverifiable rather than verified.

2. MISATTRIBUTED SOURCES. For each row, when the quote is read in context, does it
   actually support the claim, or is it adjacent to but not stating the claim?

3. SECONDARY SOURCES MASQUERADING AS PRIMARY. Per the primary-source decision tree in
   `research-protocol.md`: papers, official docs, first-party postmortems, source code,
   reproducible benchmarks are primary. Third-party blogs, Wikipedia, news, tutorials,
   AI-generated content are NOT primary. Flag any matrix row whose source fails the tree.

4. STALE ROWS. For each row, compute recency: actively-evolving + source older than 12
   months = STALE; stable + source older than 18 months = STALE. Flag any STALE row that
   is not explicitly annotated by Vic with a "stable enough; <reason>" justification.

5. UNSUPPORTED LOAD-BEARING CLAIMS. Walk the `## Spec`, `## Throughline`, and the post's
   structural shape (section list if present in the notes). For every load-bearing claim
   the post must make, is there a corresponding matrix row? Flag claims with no row.

6. OMITTED CONTRADICTING SOURCES. Are there primary sources that contradict the post's
   angle but were silently dropped from the matrix? Search the `## Research notes` section
   for any source that was quoted but not added to the matrix. Flag asymmetric source
   inclusion.

For each finding, label it STRUCTURAL (must fix before drafting) or COSMETIC (nice to
have). Order findings by load-bearing-ness. Cite the specific matrix row number, claim
text, or notes-section subheading you are challenging.

Do not be diplomatic. Do not validate. If the matrix is sound, say "no structural
issues found" and stop. Otherwise, keep finding things.
```

**Halt rule (expanded from v1):** halt and surface to Vic on any of:

- Fabricated quote.
- Misattributed source.
- Unsupported load-bearing claim that survived Phase 2 repair (HTML-import mode).
- Secondary source masquerading as primary.
- Stale row not annotated by Vic.
- Omitted contradicting source.

**What to do with codex's output:**

- Append the verbatim output to `notes/<post-slug>.md` under `## Codex research review`.
- Append a row to the `### Codex history` table.
- For STRUCTURAL findings: fix. Edit the matrix, the research notes, or both. Re-run Gate 0 if substantial.
- Stop when only cosmetic findings remain.

## Gate 1: outline + research structural pass

**When to run:** end of Phase 3, before Phase 4 drafting.

**What you provide to codex:**

- The full `notes/<post-slug>.md` (`## Spec`, `## Throughline`, `## Research notes`, `## Claim-source matrix`, `## Outline`, figure table).
- The post slug, target audience, target length.

**The prompt:**

```
You are reviewing the outline and figure list for a long-form blog post on augusteo.com.
The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the structural layer before any prose is drafted. The matrix has
already passed Gate 0; this gate is about whether the outline + figure list actually
delivers an end-to-end intuition that connects, with the throughline threading through
every act.

Find:

1. CLAIMS WITHOUT MATRIX ROWS. For each load-bearing claim implied by the outline, is
   there a matrix row that backs it? Flag any outline claim that would require a new row.

2. MISSING RUNGS IN THE INTUITION RAMP. The outline should move from a small motivating
   case to a larger one, each rung motivated by a failure of the rung below. Flag any
   place where the reader is expected to leap two rungs at once.

3. DEAD-WEIGHT SECTIONS. For each section N: if you removed section N entirely, would
   section N+1's intuition still land? If yes, section N is dead weight. Flag it.

4. THROUGHLINE THREAD HOLES. The `## Throughline` section names a concrete real-world
   scenario the post returns to in every act. Walk the outline. For each act, is there
   an explicit throughline reference? Flag acts that drop the throughline.

5. FIGURES THAT DON'T CARRY WEIGHT. Each figure should isolate a specific mechanism the
   reader can walk away noticing. Flag figures whose spec is too vague to implement, or
   whose role duplicates an earlier figure.

6. FIGURE-TYPE MISFITS. For each figure, does its type match its mechanism?
   - static-svg should be the default; flag any figure whose mechanism doesn't actually
     justify being interactive (per the four override clauses: continuous parameter sweep,
     animated time evolution, drag-based spatial reasoning, multi-state toggle).
   - interactive-canvas / plot should ONLY be used when one of the four clauses applies.
     Flag any interactive figure that could ship as static without losing intuition.
   - imported-interactive (HTML-import mode) figures should be reviewed for "does this
     figure actually carry weight, or is it decoration?" If decoration, flag for re-type
     (delete or convert to static-svg).
   When demanding a re-type, label the finding "TYPE-CHANGE STRUCTURAL" so the unlock
   protocol fires.

7. TOPIC SCOPE PROBLEMS. If the topic decomposition leaves out a piece that the post's
   core claim depends on, surface it as a rescoping issue.

For each finding, label it STRUCTURAL (must fix before drafting), TYPE-CHANGE STRUCTURAL
(triggers per-figure-type unlock protocol), or COSMETIC. Order findings by load-bearing-
ness. Cite the specific section number, figure number, or matrix row.

Do not be diplomatic. Do not validate. If the outline is sound, say "no structural issues
found" and stop. Otherwise, keep finding things.
```

**Halt rules:**

- TYPE-CHANGE STRUCTURAL → fire the per-figure-type unlock protocol (AskUserQuestion to Vic for explicit approval).
- STRUCTURAL implying rescoping (the intuition ramp is fundamentally wrong, the topic decomposition leaves a key piece out) → halt and surface to Vic before continuing.

**What to do with codex's output:**

- Append the verbatim output to `notes/<post-slug>.md` under `## Codex outline review`.
- Append a row to the `### Codex history` table.
- For STRUCTURAL findings: fix the outline. Edit the figure table. Re-run Gate 1 if substantial.
- For TYPE-CHANGE: fire the unlock protocol.
- Stop when only cosmetic findings remain.

## Gate 2: final-draft pass

**When to run:** Phase 7, after the freshness re-check has fired and updated stale rows, after voice-check is clean, before final commit.

**What you provide to codex:**

- The full `src/content/blog/<post-slug>/index.mdx`.
- The full `notes/<post-slug>.md` (`## Spec`, `## Throughline`, `## Research notes`, `## Claim-source matrix` with freshness-pass updates, `## Related posts on augusteo.com`, all prior `## Codex … review` sections).

**The prompt:**

```
You are reviewing the final draft of a long-form blog post on augusteo.com. The post's goal:

[QUOTE THE GOAL STATEMENT]

Your job is to attack the final draft for technical accuracy, claim-matrix drift, and any
freshness regression since Phase 2 research. The post's pubDate has been forced to today;
every matrix row's source must pass the recency bar as of today.

Find:

1. CLAIMS WITHOUT MATRIX ROWS. Walk every prose claim in the MDX. For each load-bearing
   claim, find the matrix row that supports it. Flag any claim with no row. The reader
   must be able to trace every load-bearing claim back to a quoted primary source.

2. CLAIMS THAT DRIFT FROM THEIR MATRIX ROW. For each claim, locate the matrix row
   supporting it. Flag any claim where the prose says more than the source supports,
   paraphrases in a way that changes the meaning, or asserts a number / mechanism /
   detail that the source does not contain.

3. FRESHNESS REGRESSION. For each matrix row, compute recency as of pubDate (today). Flag
   any row where the source date now fails the recency bar (12 months actively-evolving,
   18 months stable). The freshness pass in Phase 7 should have caught these; if it
   didn't, the gate catches them now.

4. WEAK OR HAND-WAVING ARGUMENTS. Sentences that gesture at a mechanism without explaining
   it. "Roughly," "essentially," "in some sense" are tells. If a sentence would not
   survive a domain expert's scrutiny, flag it.

5. SUBTLY WRONG MENTAL MODELS. The post is intuition-first. Flag any place where the
   intuition the prose builds is technically misleading even if it sounds right. Example:
   a claim about scaling that holds at one regime but breaks at another the post will
   eventually discuss.

6. THROUGHLINE FAILURES. The post's `## Throughline` names a recurring scenario. Walk the
   prose. Does each act explicitly reference the throughline? Flag acts that drop it. Did
   the prose introduce a different real-world scenario that competes with the throughline?
   Flag scenario contamination.

7. REFERENCES SECTION COMPLETENESS AND HYPERLINKING. Every primary source quoted in the
   matrix must appear in the post's `## References` section so the reader can trace any
   claim back to its source. Flag missing entries. Each entry must be a markdown
   hyperlink (`[title](url)`), not a bare title-and-author string.

8. INLINE NAMED-SOURCE LINKS. For every inline mention that names a specific external
   writeup, paper, post, postmortem, or report (e.g. "Andres Freund's writeup", "the
   Mattermost postmortem"), the named source must be a markdown hyperlink to the same URL
   used in the References section. Flag any plain-text inline named source.

9. CROSS-REFERENCES TO RELATED augusteo.com POSTS. The notes file's `## Related posts on
   augusteo.com` section names existing posts the new post should link to (the blog is
   meant to be interconnected; newer posts link to older relevant ones). For each entry
   in that section, verify: (a) the prose links to the related post at one of the named
   anchor points using a ROOT-RELATIVE `[Title](/blog/<slug>)` markdown link (no
   `https://augusteo.com` prefix in prose), AND (b) the related post appears as an entry
   in the post's `## References` section using the FULL HTTPS URL form
   `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` Flag any
   related-post entry that the notes file recorded but the prose / References don't carry,
   AND flag any URL-form mismatch (root-relative inside `## References`, or
   `https://augusteo.com` inside prose links). This check is a no-op only in two narrow
   cases: (1) the section body is genuinely empty (no content between the heading and the
   next heading), OR (2) the section body is EXACTLY the resume-mode forward-looking stub
   line `*Pre-rule post; related-posts scan not retroactively run.*` and nothing else. If
   real entries are present below the stub, the no-op does NOT apply — walk every entry.

10. UNEXPLAINED MATH. The post is intuition-first for a reader who is NOT fluent in this
    subfield's math (see the audience line in `## Spec`). Walk every formula, equation, and
    named mathematical object in the prose AND in the figures (a Greek symbol, a log-ratio,
    a sigmoid, a KL penalty, an ELBO, an expectation, an argmax, a norm). For each, check:
    is every symbol named in plain words at first appearance; is the equation read out in
    plain English; is each non-obvious operation (log, ratio, exp, expectation, argmax)
    given a one-clause working intuition; is the behavior at the extremes explained? Flag
    any formula dropped in raw, any symbol left unglossed, any place the prose assumes math
    fluency the stated audience does not have, and any equation whose only copy lives inside
    a figure SVG with no plain-language read in prose or caption. Calibrate to the Spec's
    audience: an ML-researcher audience needs only symbol-naming; an "engineers without much
    X" audience needs the full intuitive treatment. Do not demand derivations — intuition,
    not proof, is the bar.

For each finding, label it STRUCTURAL (must fix before shipping) or COSMETIC. Order by
load-bearing-ness. Cite specific paragraph / sentence / matrix row.

Do not be diplomatic. Do not validate. If the draft is sound, say "no structural issues
found" and stop. Otherwise, keep finding things.
```

**Halt rule:** if codex finds a claim with no matrix row that no source can be added to support, halt and surface to Vic. Don't ship a post with claims the matrix doesn't back.

**What to do with codex's output:**

- Append the verbatim output to `notes/<post-slug>.md` under `## Codex final review`.
- Append a row to the `### Codex history` table.
- For STRUCTURAL findings: fix the prose, fix the matrix, fix the freshness annotations. If a fix requires new research, do it. Re-run Gate 2 if substantial.
- Stop when only cosmetic findings remain.

## Runner mechanics

All three gates use the shared runner in `../../explainer-shared/codex-runner.md` (build-prompt → invoke-codex → size-policy → Codex history row → parse findings → 3-rerun cap → Step-6a override safeguard → proof-of-fire). The gate-specific inputs above plug into the runner's Step 1 (prompt + embedded sections), Step 4 (gate label), and Step 5 (the TYPE-CHANGE fork for Gate 1).

The per-figure-type unlock protocol for Gate 1 lives in `SKILL.md` under "Per-figure-type unlock protocol"; its re-invocations count against the runner's Step-6 3-rerun cap.
