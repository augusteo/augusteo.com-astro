# TL;DR template — `## What you can use from this book`

The TL;DR is the **index** of the post, not its argument. Codex flagged the risk that a synthesis-style TL;DR pulls the body prose away from book order (thesis-arc gravity). This file is the contract that prevents that failure mode.

## Goal

A reader who scrolls only the TL;DR walks away with the load-bearing claims of the book, in the agent's plain-English framing, with `[See §N]` jumps to each deep section. No new synthesis. No claim that isn't owned by a later section.

## Hard rules

1. **Every lesson cites its book-order section.** Each lesson ends with `[See §N]` (or `[See §N, §M]` if two sections combine to support it). No orphans.
2. **No TL;DR-only synthesis.** Every claim the TL;DR makes must be supported by a body section. If a synthesis insight emerges from connecting two body sections, it belongs in `## Where I'd disagree with the book` (the post-level synthesis), not in the TL;DR.
3. **5-8 lessons.** Fewer than 5 means the book doesn't have enough load-bearing claims for a long-form post; more than 8 means lessons are over-fragmented.
4. **Reader-first framing per lesson.** Each lesson opens with the claim and names why it matters for the reader's life. No bullet-list of bare topic names.
5. **35-90 words per lesson.** Keep tight. The TL;DR is for skim-and-decide; bloated lessons defeat the index purpose.
6. **Lessons appear in book order.** The TL;DR mirrors the book's spine, not a synthesis order. If lesson 3 in the book comes before lesson 5, lesson 3 comes first in the TL;DR.

## Shape per lesson

```markdown
**The lesson title (one-line).** Plain-English claim, then the reader-usefulness
framing. If the evidence changes how to apply it, that warning lives here too.
[See §N]
```

**Good example:**

```markdown
**Calibrate yourself, but expect the practice to transfer narrowly.** Forecasting
practice in your specific domain (project estimates, hiring odds) actually works;
the book's hope that this turns into a general "thinking clearly" skill is weaker
than the evidence supports. Calibrate in the spots you care about, and don't
oversell it to yourself elsewhere. [See §6]
```

**Bad example:**

```markdown
- Calibration training [See §6]
```

Bare topic names are not lessons. The TL;DR is where the reader decides whether the deep section is worth their time; it has to do that work.

## What the TL;DR is NOT

- Not a chapter-by-chapter summary. It picks the 5-8 most reader-useful claims from the book and surfaces them. Some chapters won't be represented in the TL;DR (illustrative chapters, chapters that exist as scaffolding for later claims).
- Not a synthesis. The TL;DR is faithful to the book's claims; the synthesis lives in `## Where I'd disagree with the book`.
- Not a marketing pitch. It tells the reader honestly what the book offers, including where its claims have aged.

## When the book is genuinely thin on takeaways

If after Phase 2 the claim matrix yields fewer than 5 reader-useful claims, the book may not warrant a long-form explainer. Halt and surface to Vic with the candidate list.

## Generation order

Phase 4 step 6 (after the body sections are drafted):

1. Walk the body sections in order.
2. For each section: extract the claim in 1-line form, the operational-layer sentence, and the local stance.
3. Compose the lesson: title + claim + reader-usefulness + caveat (if any) + `[See §N]`.
4. Skip sections that are illustrative scaffolding (centrality: illustrative).
5. If the result is 5-8 lessons, ship. If outside that range, halt and reconsider the book's section list.

## Codex Gate C check

Gate C verifies:
- 5-8 lessons.
- Every lesson has a `[See §N]` citation.
- Every claim in the TL;DR maps to a body-section claim (no orphans).
- Lessons in book order.
- Each lesson is 35-90 words.
