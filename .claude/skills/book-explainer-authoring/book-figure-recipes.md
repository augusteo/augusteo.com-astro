# Book figure recipes

The shared `../../explainer-shared/figure-recipes.md` covers the static-default rule, the four override clauses for interactive figures, and the per-figure-wrapper pattern. Those apply to book posts unchanged.

This file adds **book-specific recipes** — concept-diagram patterns that show up repeatedly in books-and-ideas explainers. Each recipe respects the anti-cleanup rule from `book-illustration-overrides.md`.

The patterns are deliberately conservative. The book skill is not figure-heavy; most sections rely on prose + ledger anchors alone. A book post might ship with figures on only 2-3 of its 5-12 sections.

## Recipe 1: Two-axis concept map

**When to use:** the book uses a two-axis framing repeatedly. Examples: Galef's `scout / soldier` (one axis) crossed with `confidence / humility` (another), Kahneman's `system 1 / system 2` extended to a second axis the book actually draws.

**Anti-cleanup constraint:** the book must itself use both axes. Don't invent a second axis to "complete" a 1-D framing the book gave you.

**Shape:**
- 680 × 400 static SVG.
- Two perpendicular axes with labeled endpoints (text labels at the axis ends).
- Region labels at corners or quadrants, sourced from the book.
- If the book uses fuzzy boundaries, render them as gradients or overlapping regions, not crisp lines.
- Optional: 1-2 marker dots positioned where the book locates a specific example.

**Example figcaption:**
> The two axes Galef draws in chapter 1: scout-vs-soldier (horizontal) and confident-vs-humble (vertical). The four corners are labeled with the cognitive postures Galef names; the *fuzzy* gradient in the center reflects that Galef treats the categories as a continuum, not a clean 2x2. [L#34]

## Recipe 2: Before/after mental model swap

**When to use:** the book argues that one way of thinking should be replaced by another. The figure shows the swap concretely.

**Anti-cleanup constraint:** the swap must be what the book argues, not a generalized "old vs. new" framing. If the book is more careful ("X is sometimes useful, Y is often better"), the figure must reflect that nuance.

**Shape:**
- 680 × 320 static SVG, split into two halves.
- Left side: the "before" mental model — labeled "Common framing" or quote the book's framing-of-it.
- Right side: the "after" mental model — labeled with what the book proposes.
- A horizontal arrow between them, labeled with the swap's mechanism if the book describes one.
- The two sides should be visually equivalent in weight — neither is dismissed.

**Example figcaption:**
> *Left:* the framing the book argues against — "deciding what to believe based on what you want to be true." *Right:* the framing the book proposes — "deciding what to believe based on what's actually true, even when it's costly." The arrow is labeled with Galef's claim that calibration training enables the swap. [L#67]

## Recipe 3: Claim-source-evidence chain

**When to use:** to show how a claim traces from the book through to current evidence and back. Especially useful when the chain is long or the evidence has shifted.

**Anti-cleanup constraint:** the chain must reflect what the agent's evidence-check actually found. Don't draw a clean chain that ends in `replicated` if the actual state is `weakened`.

**Shape:**
- 680 × 240 static SVG, linear left-to-right chain.
- Nodes: `Book claim` → `Book's cited source (year)` → `Replication landscape (year)` → `Current state`.
- Arrows between nodes labeled with what each step adds.
- Node colors / fills reflect the current-state classification: `replicated` = greens, `weakened` = warm tones, `disputed` = mixed, `disproven` = red.
- Final node is the part-7 classification.

**Example figcaption:**
> Calibration training as Galef cites it: chapter 5's claim traces to Murphy & Winkler (1977); subsequent meta-analyses (Bröcker & Smith 2007) replicate within-domain, but generalization remains contested per Mellers et al. (2014). The current state is `refined`. [L#42]

## Recipe 4: Replication-status timeline

**When to use:** the book cites a body of work where the replication landscape has clearly evolved. Especially relevant for psychology / behavioral books published before / during / after the replication crisis (2011 onward).

**Anti-cleanup constraint:** must include the actual studies the book cites, not a generic timeline. If the book cites Power Posing (Carney 2010) → show that specific study and Many Labs replication outcomes for it.

**Shape:**
- 680 × 320 static SVG with a horizontal timeline.
- Time axis: book's publication year as a reference marker, plus markers for the book's seed citation and subsequent replications.
- Each study as a node on the timeline, labeled with year + first-author + result classification.
- Color-coded by status: original studies (neutral), replications-that-succeeded (success palette), failed replications (warm), retractions (red).
- A vertical band showing the book's publication window.

**Example figcaption:**
> The replication landscape for studies Galef cites in chapter 4. Pre-2011 (the start of the replication crisis): original effects are taken at face value. Post-2011: Many Labs 2 (2018) and follow-ups have failed to replicate several. The book was published in 2021, so the failures were public when the book was written — but the book treats some as still-canonical. [L#88]

## Recipe 5: Source-quality decomposition

**When to use:** a section has multiple sub-claims each backed by different source-quality tiers. Useful for showing that a book argues from a mix of solid evidence + anecdote without separating them.

**Anti-cleanup constraint:** must accurately weight each sub-claim by the book's own evidence tier. Don't make an anecdote look like an RCT.

**Shape:**
- 680 × 280 static SVG with a vertical stack.
- One row per sub-claim, full width.
- Each row labeled with the sub-claim text + a color-coded tag for source quality (`cited-RCT`, `cited-single-study`, `cited-meta-analysis`, `expert-quote`, `anecdote`, `personal-experience`, `assertion`).
- Visual weight (bar length) reflects the book's relative reliance on that sub-claim.

**Example figcaption:**
> Decomposition of Galef's chapter 5 claim that "calibration training works." Three sub-claims with different evidence weights: (1) within-domain forecaster calibration (RCT-supported); (2) cross-domain transfer (single study + assertion); (3) practical applicability for non-experts (anecdote + personal example). [L#94]

## Recipe 6: Boundary diagram (what the book does / does not claim)

**When to use:** a section's part 6 ("Boundary conditions") names an important scope condition. The figure makes the scope visual.

**Anti-cleanup constraint:** the boundary must be what the book itself draws or implies, not what the agent thinks the boundary should be.

**Shape:**
- 680 × 320 static SVG.
- A central region labeled with what the book claims (e.g., "Calibration training works in domains with focused feedback").
- Surrounding regions labeled with what the book explicitly does not claim (e.g., "doesn't transfer", "doesn't apply without feedback", "doesn't replace expertise").
- Visual cue: the central region is solid; the surrounding regions are hatched or muted, to signal "out of scope".

**Example figcaption:**
> The scope Galef explicitly draws around her calibration claim. The book argues only for within-domain calibration with focused feedback; it explicitly does NOT claim cross-domain transfer, intuition-based calibration, or general "thinking probabilistically" skill. [L#46]

## When to invoke an interactive figure

Per the shared `../../explainer-shared/figure-recipes.md`, interactive figures require one of the four override clauses (continuous sweep, animation, drag, multi-state toggle). For book posts these clauses apply when the chapter is about a *practice* the reader can rehearse, not just a *concept* to read about.

Common cases:

- **Calibration practice** (the chapter walks through how to calibrate confidence) → an interactive widget where the reader makes guesses, marks confidence, and sees their calibration plot. Continuous-sweep + multi-state-toggle.
- **Double-standard test** (the chapter argues that you should ask "would I accept this argument if it pointed the other way?") → an interactive widget where the reader sees a scenario, makes a judgment, then sees the mirror scenario. Multi-state toggle.
- **Bet on your beliefs** (the chapter reframes confidence as expected value) → an interactive widget where the reader sets a bet and sees the EV under different probability assumptions. Continuous sweep.
- **Ideological Turing test** (the chapter says you should try to write the strongest version of the opposing view) → an interactive widget where the reader writes their version, then sees a model version. Multi-state toggle (write / reveal / compare).
- **Replication-status timeline** (the chapter cites studies that have failed to replicate) → an interactive timeline with a year-slider; the reader sees which studies were available when. Continuous sweep over time.

These widgets are reusable and live at `src/components/figures/<book-slug>/<Widget>.svelte`. Anti-cleanup rule still applies — the widget must illustrate a practice the book itself describes, not a practice the agent invented to "round out" the book.

Default to static SVG when the chapter is conceptual (definitions, vocabulary, historical narrative, one-off framings). Default to interactive when the chapter is about something the reader is meant to *do*.

## Figcaption locator format

Every book figure's figcaption ends with `[L#…]` resolving to a `kind: figure-caption` ledger entry. The ledger entry carries:

```jsonc
{
  "id": 211,
  "kind": "figure-caption",
  "concept": "<short name for the concept the figure depicts>",
  "anchor_excerpt": "<short verbatim fragment from the book the figure derives from>",
  "locator": { "chapter": N, "section": M, "paragraph": P }
}
```

This is so Phase 7's ledger-marker cross-check verifies figures the same way it verifies prose claims.

## Anti-recipe (do not do)

❌ **A 2x2 matrix invented by the agent to "organize" the book's concepts.** Anti-cleanup rule fails immediately.

❌ **A Venn diagram with three overlapping circles, when the book only contrasts two concepts.** Inventing a third concept for visual completeness violates faithfulness.

❌ **A clean flowchart of "steps" when the book describes a fuzzy process.** Faithfulness > clarity. If the process is fuzzy, the figure must reflect that.

❌ **A "the book's argument in one image" hero-figure that summarizes the whole thesis.** The post itself is the summary; the figure should illuminate a specific concept, not replace the prose.

❌ **An animation that "demonstrates" a claim the book asserts without evidence.** Animation amplifies — and amplifying an unsupported claim makes it land harder than it should.

## Gate C check for figures

Gate C (spine + figure-list coverage) specifically checks:

- Does every figure either (a) illustrate a book concept the book itself renders, or (b) chart **book-cited-study evidence** per one of the recipes above (replication-status timeline, claim-source-evidence chain)?
- Does any figure impose structure beyond the book's framing (steps, 2x2s, clean Venns, hero summaries)?
- Does the figure list include a figure for the post's most-conceptual claims (typically the core / supporting claims), not the illustrative anecdotes?
- Are there any figures that don't have a clear `[L#…]` figcaption locator?

Figures that fail Gate C return `ANTI-CLEANUP STRUCTURAL` — the runner Step-5 fork is: drop the figure or simplify until the check passes.
