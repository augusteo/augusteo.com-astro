# Claim spine: the reader-first section template

Every major claim in the book gets one section in the post. Sections appear in the order the book introduces the claims (no reorganization into a thesis arc — that constraint stays absolute). Each section is **flowing prose, 250-400 words, no bold-labeled scaffolding**, in this order:

```
1. Lead          — claim + why it matters for the reader's life (1-2 sentences)
2. Book summary  — faithful summary with [L#] anchor and (optionally) a short quote
3. Operational   — one "try this" or "watch for this" sentence; the action layer
4. Color         — current evidence woven inline, ONLY when it changes how the reader applies the idea
5. Local stance  — 1-2 sentences ("still holds up" / "useful but overclaimed" / "skip this one")
6. Figure        — one figure if a visual beats prose for this claim
```

The reader's lens drives every part: claim → why I care → what to do → what's changed → trust level. Audit detail (source-quality tags, current-state classifications, critic tier labels) moves out of the body prose and into the appendix table (`appendix-table.md`).

This file is the contract for Phase 4 drafting. Gate C verifies conformance.

## What moved to notes/appendix, not deleted

The old 9-part template fields — claim type, centrality, boundary conditions (extended), source quality, current state, critic tier+argument — are **removed from body prose**, not removed from the pipeline. They still live in:

- The claim matrix in `notes/<book-slug>.md` (used by Phase 2 + Gates B/D).
- The appendix table in the post (`## Appendix: claim-source-evidence table`, per `appendix-table.md`).
- The ledger (`notes/<book-slug>.ledger.jsonl`).

Body prose drops them; the audit-system retains them. Don't conflate the two.

## Why this template, not the 9-part labeled one

The earlier 9-part shape (claim / type / centrality / what the book says / where the book gets it / boundary / today's evidence / critics / where I land) produced 13,835-word posts that read like forms being filled out. Codex flagged on revision that:

- **Bold-labeled scaffolding fights the reader.** "**What the book says.**" ... "**Where the book gets it.**" ... makes every section a transcript, not prose.
- **Audit detail in the body buries the usable parts.** Source-quality tags and current-state classifications belong somewhere scannable, not in italic lines under every paragraph.
- **Per-section "Where I land" repeats 15 times.** Better: a 1-2 sentence local stance per section + a final synthesis section at the end.
- **No "operational" layer.** Reader usefulness is not summary + evidence; it is summary + evidence + *what to do with it*. Add this explicitly.

The new template enforces reader-first sequencing. Structure exists only insofar as it serves the reader.

## Part 1: Lead (claim + why it matters)

One or two sentences. The first sentence states the book's claim in plain English. The second states why it matters for the reader's life — what kind of decision, situation, or habit it touches.

**Good:**
> Galef argues that calibration training reliably improves probability estimation in narrow domains. If you make forecasts at work — project estimates, hiring odds, investment confidence — this is the chapter with the most actionable practice in the book.

**Bad:**
> *Type: empirical. Centrality: core.* Galef discusses calibration in chapter 6.

The H3 heading itself does heavy lifting; phrase it as a one-line takeaway, not a topic label:

```markdown
### 6. Calibration is learnable in narrow domains; transfer is weaker than the book hopes (Ch 6)
```

The "; weaker than the book hopes" hangs off because the local stance is part of the section's load. The H3 may include the agent's view; it must still represent the book's claim faithfully.

## Part 2: Book summary

Faithful prose summary of the chapter's argument. Includes:

- An MDX-style ledger anchor `[L#…]` on the first sentence that asserts what the book says, resolving to a `kind: claim` or `kind: paraphrase` ledger entry.
- An optional short direct quote (≤ 30 words) if one captures the claim cleanly. Quote gets its own `[L#…]` marker resolving to a `kind: direct-quote` ledger entry.
- The chapter the claim appears in, so the reader can pick up the book and find it.

**Anchor rule.** Every sentence that asserts something the book said needs an anchor. Sentences that paraphrase the agent's framing of the book's argument do not need anchors but should not put words in the author's mouth.

**Length.** 80-150 words. The summary stays tight; readers needing more go to the book.

**Drop the bold label.** Do NOT write `**What the book says.** ...`. Write flowing prose.

## Part 3: Operational layer

**One sentence**, conversational, action-shaped. "Try this when X." "Watch for this signature." "Use this as a journaling prompt." This is the bridge from the book's idea to the reader's life — the operational version, not the abstract one.

**When the book scopes the action (boundary condition):** the operational sentence MUST name the boundary. "Calibrate yourself, but only in domains where you get feedback." "Try the scout questions on yourself; don't use them as a club on someone else." A reader who walks away with the action but not its boundary will misapply the idea — that's the failure mode this rule prevents.

**Good:**
> When you catch yourself reaching for a comfortable belief, ask the two scout questions in sequence: of supportive evidence, "must I believe this?"; of contrary evidence, "can I believe this?" Both reversed from the soldier default.

**Good (with boundary):**
> Calibrate your confidence in narrow domains where you get feedback (project ETAs, hiring odds). Don't expect the practice to generalize into a "thinking-clearly" skill across domains — the evidence on that transfer is weak.

**Bad:**
> One practical implication of the chapter is the use of cognitive vocabulary to monitor one's own reasoning postures.

If the chapter is genuinely non-operational (a historical anecdote, a definitional move), say so explicitly: "*This one is conceptual scaffolding for later chapters; nothing to apply directly.*" That counts as discharging the operational layer.

**Hard rule (Gate C check):** every section has either an operational sentence OR an explicit "no operational layer" note. No section silently lacks it. AND if the book scopes the action, the boundary lands in the operational sentence (or in the local stance) — not silently dropped.

## Part 4: Color (evidence woven inline)

Current state of research, **as woven prose, not a labeled block**. The evidence-routing rule:

- **If current evidence changes how a reader should apply the idea → it goes inline.** "However, the 2018 Many Labs follow-up found the effect halved in better-powered samples, so calibrate yourself in your domain but don't expect general thinking-skill transfer."
- **If evidence only supports traceability → it goes in the appendix table.** Source-quality tags, current-state classifications, critic tier labels.

The body prose names quality only when it matters to the argument ("the book's single 1988 study has been overtaken by..."). Critics named in the prose only when the critic's specific argument changes the reader's stance.

**Length.** 50-150 words per section. Many sections won't need much color — the book holds up and the inline color is one sentence. That's fine.

## Part 5: Local stance

One or two sentences. The agent's judgment, in plain language. Examples:

- "This still holds up."
- "Useful as a checklist, but the supporting study is weak."
- "The framing is right; the prescription is overconfident."
- "Skip this one; the evidence has aged out."

Local stance is NOT wrapped in `{/* REVISE-WHERE-I-LAND */}` comments — those markers are reserved for the per-claim stance that the interview skill replaces with Vic's personal application. The local stance is the agent's read of the evidence; it ships as-is.

The post's final `## Where I'd disagree with the book` section consolidates the cross-claim synthesis. Per-section local stances stay local.

## Part 6: Figure (if a visual beats prose)

A figure goes here **only if a visual beats prose** for this claim. Not every section gets a figure; not every major claim gets one either. The rule from `book-illustration-overrides.md` applies:

- Static SVG is the default.
- Interactive widgets only when one of the four override clauses applies AND the book's framing supports interaction.
- Anti-cleanup rule: no figure may impose structure the book doesn't itself render.

A figure-light post is fine. Forcing a figure where prose carries the idea is its own failure mode.

## What goes ABOVE the body sections

A reader-first post leads with utility, not metadata:

1. **Lede.** 2-3 sentences. Name the book, the author, what the post does. Nothing about workshops, the book's part structure, or methodology. Reader gets the useful claim immediately.

2. **One "how to use this post" line.** "Read the top lessons first; use the sections when you want the book's reasoning, evidence, and caveats." Frames the post as a tool, not an essay.

3. **`## What you can use from this book` — the TL;DR.** See `tldr-template.md`. Each lesson is an index entry with a `[See §N]` jump. **Hard rule: TL;DR may not introduce a synthesis claim that isn't owned by a later section.** That prevents thesis-arc gravity.

4. **`## Where it gets complicated` — short editor's note.** 1 paragraph naming the 2-3 most-aged or most-contested claims so the reader knows what's coming.

## What goes BELOW the body sections

1. **`## Where I'd disagree with the book` — consolidated synthesis.** The cross-claim stance. Each per-section local stance is a sentence; this section connects them into Vic's overall read of the book. 2-4 paragraphs.

2. **`## Reference layer`** — three short subheads:
   - `### Galef's vocabulary` — one-line definitions of named frameworks.
   - `### Quote bank` — ≤15 verbatim quotes, each with `[L#]` anchor.
   - `### Practical-model list` — the "try this" sentences from the operational layers, gathered into a usable list.

3. **`## Conclusion`** — book-faithful closing if the book itself has one (Galef's 8 habits, etc.) with one-line takes per item.

4. **`## Appendix: claim-source-evidence table`** — the audit layer. One row per claim with `Section | Book locator | Source quality | Current state | Critics tier ‖ argument`. Replaces the inline italic lines that used to live in every section.

5. **`## References`** — block-level citation list: the book itself, current-state-of-evidence sources, critics (with tier).

## Takeaway-artifact rule

Not every major claim needs the rigid (quote, framework, mental model) triple. The relaxed rule:

- **Per-section: ≥1 takeaway artifact is the target, not a hard gate.** Could be a verbatim quote, a named framework, or a mental model — whichever lands for that claim. Some claims are usefully bare and forcing an artifact creates filler. The editor surfaces thin sections; doesn't block ship for missing one artifact.
- **Post-level: all three reference layers exist and are non-empty.** The post must have a quote bank, a vocabulary glossary, and a practical-model list under `## Reference layer`. Each layer must have at least 3 entries (a single-entry layer is just noise).

The reference layer is what the reader pastes into their notes app. Most major claims will contribute ≥1 entry across the three layers; the editor reports coverage but doesn't force per-section artifacts.

## Section ordering rules

- Sections appear in the order the book introduces the claims. The agent re-reads the chapter sequence to determine order; doesn't reorder for "narrative flow".
- Within a section, the 6 parts (lead → book summary → operational → color → local stance → figure) appear in this order. Don't shuffle.
- Use H3 numbered headings (`### 1. ...`, `### 2. ...`) for sections.
- Bold inline labels (`**What the book says.**`) are NOT used. The parts are prose, not form fields.
- Optional H2 chapter dividers (`## Chapter N: <chapter title>`) only if the book has 3+ claims per part AND the parts are thematically distinct. Default is no chapter dividers.

## Ledger anchor enforcement

Every claim/quote/paraphrase about the book gets a `[L#…]` marker resolving to a ledger entry. Phase 7's ledger-marker cross-check verifies every marker resolves; Gate D additionally verifies the prose near each marker faithfully renders the entry's excerpt.

External evidence (today's evidence, critics) uses inline markdown links to primary sources — not `[L#]` markers.

## When the template doesn't fit

Rare cases:

- **The book doesn't make discrete claims; it weaves an argument.** Halt after Phase 1 candidate-claim extraction and ask Vic whether to (a) extract claims anyway with low confidence, or (b) switch tools (use `explainer-authoring` for a thesis-led narrative).
- **Two claims are deeply intertwined; the book treats them as one.** Merge into one section. The H3 is the combined claim.
- **A claim is impossible to evaluate without the surrounding chapter.** Lead the section with a 1-paragraph chapter summary BEFORE part 1 (using `> ` blockquote styling). Then proceed with the 6 parts.

In all other cases, the template is the contract. Conformance is checked by Gate C.
