# Book-skill illustration overrides

The base illustration style lives in `../../explainer-shared/illustration-style.md` — palette, typography, viewBox conventions, figcaption shape. Those rules apply to every post.

This file is a thin overlay for book posts. The single load-bearing rule:

## The anti-cleanup rule

**No figure may impose structure beyond what the book itself renders.** The rule is about cleanup, not about data — figures may chart book-cited-study evidence (e.g., a replication-status timeline tying the book's seed citations to current evidence; a claim-source-evidence chain). What they may NOT do is impose structure (steps, 2x2s, clean Venns, hero summaries) that the book's prose doesn't itself support.

This is the hard rule. It applies to every figure in every book post, regardless of figure type (static-SVG, interactive-canvas, plot, imported-interactive).

### What this protects against

Book figures fail in two characteristic ways:

1. **The diagram does a job the book itself doesn't do.** Example: the book hand-waves a 3-step process, but the figure renders it as a clean numbered flow chart with arrows. The reader walks away thinking the book is more methodical than it is.

2. **The diagram resolves an ambiguity the book leaves open.** Example: the book has a fuzzy distinction between two concepts ("scout vs. soldier mindset"); the figure draws them as two non-overlapping circles. The reader walks away with a binary the book didn't draw.

Both failures are forms of *over-systematization*: the figure cleans up what the prose left messy, and the post inherits the cleaned-up version as canon.

### How to apply

When sketching a figure during Phase 3 outlining, ask:

1. **Does the book itself depict or systematize this concept?** If yes, anchor the figure to the book's framing. If no, be cautious — drawing it adds structure the book didn't.
2. **Could a reader walk away from the figure with a stronger / cleaner version of the claim than the prose supports?** If yes, redesign the figure or drop it.
3. **Does the figure resolve a genuine ambiguity the book leaves open?** If yes, halt — the resolution is the agent's interpretation, not the book's argument.

### What to do when a concept resists clean illustration

Many book concepts genuinely resist clean illustration. The book skill's posture is: **leave them as prose**, don't reach for a figure to "help the reader."

Specifically:

- A concept that's defined fuzzy in the book → prose, not figure. Or, figure with explicit fuzz (overlapping regions, gradient transitions, labeled "blurry boundary").
- A concept the book uses inconsistently → prose with a paragraph noting the inconsistency. Don't draw a figure that imposes consistency.
- A claim about a process where the book doesn't describe the steps → no figure with steps.

### When a figure IS appropriate

- The book uses a specific framing repeatedly that the reader will recognize (e.g., the scout / soldier dichotomy in Galef's book). A figure can render that framing as the book uses it.
- A claim involves a clear empirical relationship (e.g., a chart of replication outcomes for studies the book cites). The figure shows the data, not the interpretation.
- A concept benefits from spatial reasoning (e.g., a hierarchy or sequence) AND the book itself uses that spatial structure.

The shared `../../explainer-shared/figure-recipes.md` static-default rule applies: prefer static SVG unless one of the four override clauses applies (continuous parameter sweep, animated time evolution, drag-based spatial reasoning, multi-state toggle). For book posts, the override clauses rarely apply — most book figures should be static concept diagrams.

### Figcaption discipline

When the figure renders a book-specific framing, the figcaption should:

- Name what the figure shows.
- Locate it in the book (e.g., "Galef's framing from chapter 1 [L#3]").
- If the agent is interpreting the framing (e.g., the figure clarifies something the book hand-waves), say so: "*Figure based on chapter 3, with [specific element] inferred from the surrounding prose.*"

The figcaption is the place to be honest about how much the figure is "the book's idea visualized" vs. "the agent's interpretation of the book's idea". Don't bury that distinction.

### Examples

✅ **Good** — a figure showing the **replication-status timeline** for the studies the book cites in chapter 4: bar chart with `replicated` / `refined` / `weakened` / `disproven`, one bar per study. The figure shows the agent's research output, not the book's argument; figcaption is clear about this.

✅ **Good** — a figure rendering the book's own analogy: "the scout's terrain map vs. the soldier's defensive line". The figure illustrates a specific framing the book uses repeatedly; figcaption locates it in chapter 1.

❌ **Bad** — a flowchart for "how to be more scout-mindset" with 4 steps. The book doesn't list 4 steps; the figure manufactures them. Anti-cleanup rule applies.

❌ **Bad** — a Venn diagram of "scout" vs. "soldier" with the overlap labeled "balanced thinking". The book doesn't define an overlap or a third state; the figure invents one.

❌ **Bad** — a 2x2 matrix of "concrete vs. abstract" × "active vs. passive" applied to the book's concepts. If the book doesn't use a 2x2 matrix, the figure imposes one.

## Figcaption format (override on base)

Base illustration-style.md says figcaptions are short, sentence-case, end with a period. Book posts add:

- **Locator**: figcaption ends with `[L#…]` resolving to a `kind: figure-caption` ledger entry. The ledger entry holds the concept name and a short anchor excerpt from the book.
- **Interpretation flag**: if the figure goes beyond what the book renders, the figcaption explicitly says so (see "Figcaption discipline" above).

Example:

```html
<figure>
  <svg viewBox="0 0 680 360">...</svg>
  <figcaption>
    Galef's scout / soldier framing as used in chapter 1: scouts seek to understand
    the territory; soldiers defend a position. *Figure renders Galef's analogy directly.* [L#211]
  </figcaption>
</figure>
```

## Palette / typography / viewBox

No overrides on these. The base `../../explainer-shared/illustration-style.md` rules apply unchanged. Book posts use the same palette as explainer posts.

## When the figure list is too thin

If after Phase 3 the figure list is small (1-2 figures for a 5-12-section post), that's fine. The book skill is not figure-heavy by design. A post can ship with figures only on the 2-3 most concept-rich claims; other sections rely on prose + ledger anchors alone.

Gate C will not flag a thin figure list as STRUCTURAL — it only flags figures that violate the anti-cleanup rule or chart research data inappropriately.

## When the agent isn't sure

If the agent is uncertain whether a figure violates the anti-cleanup rule, halt and surface to Vic with the figure sketch + a one-paragraph note on the uncertainty. Over-cleaning the book is the canonical failure; under-illustrating is recoverable.
