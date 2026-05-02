# Codex prompts

Exact prompts for the two `/codex` adversarial gates in the `explainer-authoring` pipeline. Use the `codex` skill in challenge mode (the skill's "challenge" mode is documented as "200 IQ adversarial developer that tries to break your code").

Both gates apply regardless of figure type — a post with all-static SVG figures and a post with interactive Canvas/Plot figures get the same hostile-research pass. The five attack categories per gate target prose, claims, and sources, not implementation.

Both prompts share the same operating principle: **codex is doing a hostile, truth-seeking pass.** It is not here to validate. It is here to find what is wrong. Treat its findings as adversarial signal: if codex says "this claim is unsupported," default to assuming codex is right and re-check the source.

Stop iterating when codex's last critique is **cosmetic, not structural**. Cosmetic = "the figcaption could be tighter" or "you used 'core' twice in two paragraphs." Structural = "section 3's main claim cites a paper that doesn't say that" or "the intuition ramp from section 5 to section 6 skips the load-bearing step."

## Gate 1: outline + research

**When to run:** after the outline and figure list are locked and the research notes are merged. Before any prose is written. (In the eight-phase pipeline, this is the boundary between Phase 3 and Phase 5.)

**What you provide to codex:**

- The full `notes/<post-slug>.md` file (Spec, Research notes, Outline, figure table).
- The post slug, target audience, and target length.

**The prompt:**

```
You are reviewing the outline and research notes for a long-form blog post on
augusteo.com. The post is meant to be deeply researched and truth-seeking. Your job is to
attack the outline before any prose is written.

Find:

1. CLAIMS WITHOUT QUOTED SOURCES. For each load-bearing claim in the outline or research
   notes, is there a quoted excerpt from a primary source that actually supports it? Flag
   anything where the quote, when read in context, doesn't say what the post claims.

2. STALE OR NON-PRIMARY SOURCES. The bar is at least three primary sources newer than 18
   months for an actively-researched topic. Flag any source that is older, secondary
   (Wikipedia, anonymous tutorials, vendor marketing), or where the v1 arxiv date is more
   than 18 months ago even if the v2 date is recent.

3. MISSING RUNGS IN THE INTUITION RAMP. The outline should move from a small, motivating
   case to a larger one, each rung motivated by a failure of the rung below. Find any
   place where the reader is expected to leap two rungs at once.

4. FIGURES THAT DON'T CARRY WEIGHT. Each figure should isolate a specific mechanism the
   reader can walk away noticing. Flag any figure whose spec is too vague to implement,
   or whose role in the post duplicates an earlier figure.

5. TOPIC SCOPE PROBLEMS. If the topic decomposition leaves out a piece that the post's
   core claim depends on, surface it as a rescoping issue.

For each finding, label it STRUCTURAL (must fix before drafting) or COSMETIC (nice to
have). Order findings by load-bearing-ness. Cite the specific section, claim, or figure
number you are challenging.

Do not be diplomatic. Do not validate. If the outline is sound, say "no structural
issues found" and stop. Otherwise, keep finding things.
```

**What to do with codex's output:**

- For every STRUCTURAL finding: fix it. Edit the outline. Re-do the relevant part of the research phase if needed (more sources, more quotes, different angle).
- For COSMETIC findings: note them in `notes/<post-slug>.md` under `## Codex outline review`. Apply during drafting if cheap.
- Re-run codex if structural fixes were substantial. Stop when the only findings are cosmetic.
- If codex finds a topic-scope problem (the post can't be written as drafted), halt and surface to Vic.

## Gate 2: final draft

**When to run:** after all sections are drafted, all figures are implemented (static or interactive), and playwright review has signed off on each figure. Before final commit. (In the eight-phase pipeline, this is Phase 8.)

**What you provide to codex:**

- The full `src/content/blog/<post-slug>/index.mdx`.
- The full `notes/<post-slug>.md` (so codex can cross-check claims against quoted sources).

**The prompt:**

```
You are reviewing the final draft of a long-form narrative blog post on augusteo.com.
Your job is to attack the draft for technical accuracy, weak arguments, and any drift
between claims in the prose and the quoted sources in the notes file.

Find:

1. CLAIMS THAT DRIFT FROM THE QUOTED SOURCES. For each technical claim in the prose,
   locate the quoted excerpt in the notes file that backs it. Flag any claim where the
   prose says more than the source supports, paraphrases in a way that changes the
   meaning, or asserts a number / mechanism / detail that the source does not contain.

2. UNSUPPORTED ASSERTIONS. Flag any technical claim that has no corresponding quoted
   excerpt in the notes file at all. The reader should be able to trace every load-
   bearing claim back to a primary source.

3. WEAK OR HAND-WAVING ARGUMENTS. Sentences that gesture at a mechanism without
   explaining it. "Roughly," "essentially," "in some sense" are tells. If a sentence
   would not survive a domain expert's scrutiny, flag it.

4. SUBTLY WRONG MENTAL MODELS. The post is intuition-first. Flag any place where the
   intuition the prose builds is technically misleading even if it sounds right.
   Example: a claim about scaling that holds at one regime but breaks at another the
   post will eventually discuss.

5. REFERENCES SECTION COMPLETENESS AND HYPERLINKING. Every primary source quoted
   in the notes file must appear in the post's References section so the reader
   can trace any claim back to its source. Flag missing entries. If the post has
   no References section at all, that is itself a STRUCTURAL finding. The audit
   chain requires the reader to be able to verify every load-bearing claim, and
   a private notes file does not satisfy that.

   Each References-section entry must be a markdown hyperlink (`[title](url)`),
   not a bare title-and-author string. Flag any entry without a URL.

   Additionally, for every inline mention in the prose that names a specific
   external writeup, paper, post, or report (e.g. "Andres Freund's writeup",
   "the Mattermost postmortem", "JP Camara's writeup"), the named source must
   be a markdown hyperlink to the same URL used in the References section.
   Flag any inline named source that is plain text. Generic mentions like
   "the Postgres docs" without a specific page are exempt.

For each finding, label it STRUCTURAL (must fix before shipping) or COSMETIC (nice to
have). Order findings by load-bearing-ness. Cite the specific paragraph or sentence,
and reference the relevant entry in the notes file.

Do not be diplomatic. Do not validate. If the draft is sound, say "no structural issues
found" and stop. Otherwise, keep finding things.
```

**What to do with codex's output:**

- For every STRUCTURAL finding: fix the prose. If the fix requires going back to the research phase (no source actually supports the claim), do that. Halt and surface to Vic if the issue implies a load-bearing claim cannot be backed at all.
- For COSMETIC findings: apply the fix if cheap, skip if not.
- Re-run codex if structural fixes were substantial.
- **Halt rule:** if codex finds a claim that no quoted source supports and no source can be found, halt. Don't ship a post with claims the research doesn't back.

## A note on tone

Codex is doing the hostile pass so the post can ship clean. The pipeline expects codex to find things; that's the point. Don't argue with codex on structural findings without checking the source. The cost of fixing is low; the cost of shipping a wrong claim is high.

If you genuinely think codex is wrong on a structural finding (it misread a source, it claimed a section was missing context that's actually present), say so explicitly in the notes file under `## Codex outline review` or a parallel "Codex final review" section, with the reasoning. Don't silently dismiss.
