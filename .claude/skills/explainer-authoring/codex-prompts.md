# Codex prompts

Exact prompts for the three codex gates in the `explainer-authoring` pipeline. All gates invoke the project-local `codex` skill in consult mode (multi-doc context that's awkward to pass via diff).

All three gates apply regardless of figure type or entry mode (topic vs HTML-import). They auto-fire at phase boundaries; Vic does not need to type `/codex`.

Operating principle: **codex is doing a hostile, truth-seeking pass.** It is not here to validate. It is here to find what is wrong. Treat its findings as adversarial signal: if codex says "this claim is unsupported," default to assuming codex is right and re-check the source.

Stop iterating when codex's last critique is **cosmetic, not structural**. Cosmetic = "the figcaption could be tighter." Structural = "section 3's main claim cites a paper that doesn't say that," or "claim X has no row in the matrix."

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
- The full `notes/<post-slug>.md` (`## Spec`, `## Throughline`, `## Research notes`, `## Claim-source matrix` with freshness-pass updates, all prior `## Codex … review` sections).

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
   matrix must appear in the post's `### References` section so the reader can trace any
   claim back to its source. Flag missing entries. Each entry must be a markdown
   hyperlink (`[title](url)`), not a bare title-and-author string.

8. INLINE NAMED-SOURCE LINKS. For every inline mention that names a specific external
   writeup, paper, post, postmortem, or report (e.g. "Andres Freund's writeup", "the
   Mattermost postmortem"), the named source must be a markdown hyperlink to the same URL
   used in the References section. Flag any plain-text inline named source.

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

## A note on tone

Codex is doing the hostile pass so the post can ship clean. The pipeline expects codex to find things; that's the point. Don't argue with codex on structural findings without checking the source. The cost of fixing is low; the cost of shipping a wrong claim is high.

If you genuinely think codex is wrong on a structural finding (it misread a source, it claimed a section was missing context that's actually present), say so explicitly in the notes file under the relevant `## Codex … review` section, with the reasoning. Don't silently dismiss.

## Per-gate runner (executable contract)

Each gate is invoked from the SKILL.md pipeline using this runner. The runner is the same code path for all three gates; the per-gate inputs (prompt template, notes-file sections to embed) are the only thing that differ.

### Step 1: Build the prompt

For Gate <N>:

1. Take the prompt template from this file's "Gate <N>" section verbatim.
2. Substitute `[QUOTE THE GOAL STATEMENT]` with the literal Goal text from `SKILL.md`'s Goal section.
3. Append the gate's "What you provide to codex" content as inline embedded sections:
   - Gate 0: `## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + topic-evolution classification.
   - Gate 1: above + `## Outline` + figure table.
   - Gate 2: above + full MDX content + all prior `## Codex … review` sections.
4. The result is a single string ready to pass to the codex skill.

### Step 2: Invoke the codex skill

```
Skill tool call:
  skill: codex
  args: consult <full prompt string built in Step 1>
```

The codex skill's `consult` mode handles the heavy lifting (boundary instructions, prompt safety, output capture). Do not attempt to invoke `codex exec` directly from this skill; route through the codex skill.

### Step 3: Apply size policy to codex's output

Capture codex's verbatim output (let `OUTPUT_BYTES` = its byte length).

```
If OUTPUT_BYTES <= 8192 (≈ 8 KB):
  Paste the output verbatim into notes/<slug>.md under
  ## Codex <gate-name> review.

If OUTPUT_BYTES > 8192:
  Write the full output to a findings file:
    notes/<slug>-codex-<gate-key>-<YYYYMMDD>.md
  where <gate-key> is one of: research / outline / final.
  
  In notes/<slug>.md under ## Codex <gate-name> review, paste:
  - A one-paragraph summary (you write this; ≤ 6 sentences).
  - A relative-link line: `[full findings: notes/<slug>-codex-<gate-key>-<YYYYMMDD>.md]`.
  - The labeled finding count: `Findings: N STRUCTURAL, M COSMETIC.`
```

This keeps `notes/<slug>.md` browsable (the file is meant to be read end-to-end on resume); large gate outputs go to dated findings files where they're still discoverable but don't bloat the resume tracker.

### Step 4: Append a row to the Codex history table

Inside `## Resume here` → `### Codex history`:

```
| <YYYY-MM-DD> | <N> (<gate-name>) | <outcome> | <findings ref> |
```

Where:
- `<outcome>`: `clean` (no findings) / `cosmetic-only` / `structural-fixed` (after re-run loop closed) / `halted` (loop limit hit or halt-rule fired).
- `<findings ref>`: either `## Codex <gate-name> review` (notes-file section) or the relative path to the findings file.

### Step 5: Parse findings and act

Walk codex's output. For each finding labeled STRUCTURAL or TYPE-CHANGE STRUCTURAL:

```
For each STRUCTURAL finding:
  Apply the fix as described by codex (edit matrix / outline / prose /
  figure table / freshness annotation). Commit the fix per the "one
  thing per commit" rule. Annotate the commit message with the gate
  number and the finding label.

For each TYPE-CHANGE STRUCTURAL (Gate 1 only):
  Fire the per-figure-type unlock protocol from SKILL.md. This is NOT
  a regular re-run; it requires Vic AskUserQuestion approval. Do not
  silently re-type the figure.

After fixes are committed, re-run from Step 1 with the fixed inputs.
```

### Step 6: Re-run loop limit

A gate may re-run up to **3 times** (initial + 2 re-runs). On the 4th invocation:

```
Halt the gate.
Surface to Vic:
- "Gate <N> on <slug> has not closed after 3 re-runs."
- The full codex output from the latest run.
- A summary of fixes attempted across the 3 runs.
- An AskUserQuestion: "(a) accept current state and proceed (codex
  override; recorded in notes); (b) halt the post and surface the
  blockers as next steps; (c) override codex on a specific finding
  only and continue (you specify which)."
```

This cap exists because if codex has surfaced STRUCTURAL findings 4 times in a row, either codex is wrong (and Vic has to override) or the post itself is in fundamental trouble (and a re-run won't fix it). Don't loop forever.

**Gate 1 unlock-protocol fires count against this cap.** Each TYPE-CHANGE STRUCTURAL → unlock protocol → re-run cycle uses one of the 3 invocation slots. See SKILL.md "Per-figure-type unlock protocol → Interaction with the gate-runner loop cap" for the concrete invocation sequence.

### Step 6a: Override does NOT mean Gate 0 acceptance for HTML mode

**Critical safeguard for HTML-import mode.** If Vic picks `accept-and-proceed` or `override-on-specific-finding` at Step 6 for **Gate 0** in HTML-import mode, this is NOT the same as Gate 0 acceptance. The MDX's `draft: true` flag does NOT flip to `draft: false` automatically.

Instead:

1. The Step-6 override is recorded in `## Codex research review` and the Codex history table with the explicit annotation `Step-6 override; not Gate 0 acceptance`.
2. The MDX stays `draft: true`.
3. Vic must take a **separate, explicit action** to flip `draft: false` for the post to ship: either say "flip draft to false; I accept the unresolved findings X, Y, Z" or run a single-purpose commit that sets `draft: false` with a commit message naming the override-accepted findings.
4. The single-purpose commit message must include the literal phrase `Step-6 override on Gate 0 — overridden findings:` followed by the list, so the audit trail is searchable in `git log`.

This rule exists because Step 6 is the gate-runner's escape hatch from infinite re-runs; it is NOT a truthfulness override. "Truthfulness first" (hard rule #1) means publishing with unresolved STRUCTURAL findings requires a deliberate second action by Vic, not a single AskUserQuestion answer. The two-step structure is the friction that catches a tired agent's "Vic said proceed → publish" misread.

For Gates 1 and 2, Step 6 override has the same recording requirements (record in notes + Codex history with `Step-6 override` annotation) but does not gate `draft: false` (Gates 1 and 2 don't change the draft flag — only Gate 0 acceptance in HTML mode does that).

### Step 7: Proof-of-fire

A gate is only marked `done` in `## Resume here` → `### Phase status` if Step 4's row was actually appended to the Codex history table. The phase-transition status print (printed to chat at end of every phase) is the audit trail Vic uses to verify gates fired. If a phase status says "done" but no Codex history row exists for that phase's gate, the phase is not actually done — re-run from Step 1.
