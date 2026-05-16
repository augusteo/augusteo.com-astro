# "Where I land" template

Part 9 of every claim-spine section is "Where I land" — Vic's stance on the claim, given the evidence and critics surveyed in parts 7 and 8. The skill drafts this part as a placeholder; Vic rewrites it during the Phase 4 review.

This file is the contract between the skill and Vic for this handoff.

## The wrapper convention

Every "Where I land" block is initially wrapped in HTML comments:

```markdown
**Where I land.**

<!-- REVISE-WHERE-I-LAND -->
*Draft stance, generated from parts 5–8 above. Vic to rewrite in his voice.*

[draft body — 1-3 short paragraphs]
<!-- /REVISE-WHERE-I-LAND -->
```

Vic scans the MDX for `REVISE-WHERE-I-LAND` markers post-Phase-4. **Every block must resolve to one of two terminal states before Gate D will allow ship:**

### Terminal state 1: rewritten

Vic replaces the body with his own prose. Both `<!-- REVISE-WHERE-I-LAND -->` and `<!-- /REVISE-WHERE-I-LAND -->` markers are removed. The `*Draft stance...*` italic preamble is removed. What remains is Vic's prose, no markers, no preamble.

```markdown
**Where I land.**

[Vic's prose, in his voice. 1-3 paragraphs.]
```

### Terminal state 2: kept-as-is

Vic accepts the draft body as-is. He REPLACES both markers and removes the preamble:

- `<!-- REVISE-WHERE-I-LAND -->` → `<!-- KEEP-AS-IS: YYYY-MM-DD -->` (date Vic accepted the draft).
- `<!-- /REVISE-WHERE-I-LAND -->` → `<!-- /KEEP-AS-IS -->`.
- The `*Draft stance...*` italic preamble is removed.

```markdown
**Where I land.**

<!-- KEEP-AS-IS: 2026-05-16 -->
[the original draft body, unchanged]
<!-- /KEEP-AS-IS -->
```

### Why both markers must change

A half-replaced block (e.g., `<!-- KEEP-AS-IS: ... -->` opening with `<!-- /REVISE-WHERE-I-LAND -->` closing) produces ambiguous scans. Gate D treats any mixed wrapper as STRUCTURAL.

### Gate D's enforcement

Gate D treats any remaining `REVISE-WHERE-I-LAND` opening marker as STRUCTURAL. The block has not been resolved, and the post cannot ship with a scaffolded agent-voice stance in place of Vic's actual stance.

A `KEEP-AS-IS` block is fine. A fully-rewritten block (no markers at all) is fine. Anything in between is not.

## What the skill drafts

The drafted body should:

1. **Cite parts 5, 7, 8** (the book's source, the current evidence, the critics) by their specific findings, not as generalizations.
2. **Land a position** — agree, partially agree, disagree, "this is more nuanced than the book". Don't no-op with "the evidence is mixed and the reader can decide".
3. **Be one to three short paragraphs**, ~80-200 words. Not an essay; not a sentence.
4. **Match the book-voice-overrides.md tilt**: citation-forward, locator-dense, author-by-name where the book itself is being referenced.

Specifically, the drafted body should answer:

- **Where does the book hold up?** What part of the claim survives the evidence + critics?
- **Where does it not?** What part of the claim is weakened, refined, or refuted?
- **What's the actionable takeaway** for someone who's reading both the book and this post? (Not always "do X" — sometimes "don't draw the strong inference the book invites".)

The skill draft is a starting point. Vic's rewrite typically:

- Adds personal experience or domain knowledge that the skill doesn't have.
- Sharpens the position (the draft is often too even-handed).
- Adjusts emphasis based on what's interesting to Vic, not what's load-bearing for the matrix.
- Adds connective tissue between this section and adjacent sections.

## Drafting rules

When the skill writes a "Where I land" block, follow these:

### 1. Position-first

Lead the first sentence with the position, not the setup.

❌ "There's been a lot of debate about whether calibration training generalizes, and after looking at the evidence, I think..."
✅ "Calibration training is real but narrower than Galef suggests."

### 2. Specific, not generic

Reference the specific findings cited in parts 5, 7, 8. Not "the evidence is mixed" but "the Mellers 2014 result is the load-bearing critique of the book's framing".

### 3. Acknowledge what's right

When the book holds up on a claim, say so. The book skill is not adversarial by default — it's accountable. Don't draft a critique-only stance when the evidence supports the book.

### 4. Hedging only when warranted

The draft can be hedged when the evidence is genuinely unsettled (Current-state = `unsettled` or `disputed`). It should not be hedged when the evidence is clear (Current-state = `replicated` or `disproven`).

### 5. Don't write Vic's voice

The draft is in the **agent's neutral voice**, marked as a draft. The italic preamble (`*Draft stance, generated from parts 5–8 above. Vic to rewrite in his voice.*`) tells Vic this is scaffolding. Don't try to mimic Vic's voice from prior posts; the agent doesn't have Vic's voice precisely enough.

### 6. Don't summarize parts 4–8

Where I land is a *judgment on* parts 4–8, not a *summary of* them. The summary should already be readable in those parts. Drafted text that just recaps the section above adds nothing.

## Examples

### Good draft (calibration claim)

```markdown
<!-- REVISE-WHERE-I-LAND -->
*Draft stance, generated from parts 5–8 above. Vic to rewrite in his voice.*

Calibration training is real but narrower than Galef suggests. The Murphy & Winkler
foundation [link] holds up — weather forecasters do become well-calibrated with
focused feedback. The problem is transfer: Mellers et al. (2014) [link] find that
without ongoing forecasting practice, calibration degrades and doesn't generalize
to new domains.

Practical takeaway: if you care about calibration in some specific domain (your
estimates of project completion time, say), train in that domain with feedback.
Don't treat "calibration training" as a generic thinking-skill upgrade. The book
sometimes elides this scope.
<!-- /REVISE-WHERE-I-LAND -->
```

### Good draft (claim that holds up well)

```markdown
<!-- REVISE-WHERE-I-LAND -->
*Draft stance, generated from parts 5–8 above. Vic to rewrite in his voice.*

This is the part of the book that holds up best. The scout/soldier framing is
empirically grounded in motivated-cognition research [link to recent meta-analysis],
the book's chapter-5 examples are specific and accurate, and the critics in
part 8 mostly disagree about emphasis rather than substance.

For a reader, the right move is to take this distinction seriously without
expecting it to be a magic key. The book doesn't claim it's a magic key, either —
the framing is most useful as cognitive vocabulary, less so as a behavior change
intervention.
<!-- /REVISE-WHERE-I-LAND -->
```

### Good draft (claim that's been refuted)

```markdown
<!-- REVISE-WHERE-I-LAND -->
*Draft stance, generated from parts 5–8 above. Vic to rewrite in his voice.*

The chapter-7 claim about [specific finding] doesn't survive the replication
landscape. Many Labs 2 (2018) [link] found effect sizes close to zero where the
original study found ~0.4; Carney (the original author) has publicly disavowed
the effect [link]. Galef's chapter cites the original (2010) without flagging the
2016+ replication failures.

I'd treat this section as outdated rather than wrong-on-purpose. The book was
written in 2021 — the replications were public by then — but pop-science books
often lag the replication literature by several years. Read the chapter as a
cultural artifact of the pre-replication-crisis psychology canon.
<!-- /REVISE-WHERE-I-LAND -->
```

### Bad draft (over-hedged, generic)

❌ ```markdown
<!-- REVISE-WHERE-I-LAND -->
The evidence on this claim is mixed and reasonable people can disagree. Some
studies support the book's framing while others don't. The reader can weigh
the considerations and decide for themselves.
<!-- /REVISE-WHERE-I-LAND -->
```

This is no stance. It doesn't help the reader; it doesn't anchor to anything specific in parts 5–8; it gives Vic nothing to react to. Rewrite as one of the example shapes above.

### Bad draft (writes Vic's voice without his input)

❌ ```markdown
<!-- REVISE-WHERE-I-LAND -->
When I think about this in my own work at Boon, I often run into [specific
situation Vic hasn't described to the skill]. The book's framing has helped me
[claim about Vic's experience the skill can't verify].
<!-- /REVISE-WHERE-I-LAND -->
```

The skill doesn't have Vic's lived experience. Drafts that fabricate Vic-specific examples create a different drift problem (Vic now has to delete the fake examples in addition to rewriting). Keep the draft in the agent's neutral voice.

## What Vic owns

After the Phase 4 user gate, Vic:

1. Reads the full draft.
2. For each `REVISE-WHERE-I-LAND` block, either:
   - Rewrites the block in his voice and removes both markers.
   - Marks it `KEEP-AS-IS: YYYY-MM-DD` if the draft stands.
3. Removes the `*Draft stance...*` italic preamble lines once a section is finalized.
4. (Optional) Adjusts parts 5, 7, 8 if the rewrite reveals a gap (e.g., Vic knows about a critic the skill missed).

The skill does NOT auto-rewrite Where-I-land blocks based on Vic's feedback. Vic owns this part of the post. The skill's draft is the floor, not the ceiling.

## Gate D verification

Gate D's checks:

- Every section has a "Where I land" part 9.
- Every "Where I land" block is in one of the two terminal states:
  - **Rewritten**: no markers, no `*Draft stance...*` preamble. Just Vic's prose.
  - **Kept-as-is**: both markers replaced — `<!-- KEEP-AS-IS: YYYY-MM-DD -->` open and `<!-- /KEEP-AS-IS -->` close. No preamble.
- **Any block with a `<!-- REVISE-WHERE-I-LAND -->` opening marker is STRUCTURAL.** The block has not been resolved.
- **Mixed wrappers are STRUCTURAL.** E.g., `KEEP-AS-IS` opening with `/REVISE-WHERE-I-LAND` closing.

The post cannot ship with unresolved Where-I-land blocks. Gate D blocks ship on the first invocation. This is the only Vic-owned editorial handoff in the pipeline; the skill protects it by treating unresolved blocks as blockers.

## When the section is about an unverifiable claim

For claims classified as `unsettled` or `no-update-found`, the Where-I-land draft should reflect the uncertainty rather than force a position:

> The evidence on this claim is too thin to update much from the book's framing. The original [year] study stands alone; I'd treat this as a credible but unverified piece of the book's argument. If a replication appears, this section's stance should be revisited.

This is a different shape from "the evidence is mixed" — it's specific about *what's missing* (no replication attempts) and what would change the stance.
