# Appendix table — `## Appendix: claim-source-evidence table`

The audit layer. Moved here so the body prose can read naturally; readers who want to verify the book's source quality or check the current state can scan this in one place.

## Goal

A scannable table that lets a reader (or a future Vic) answer in seconds:

- What does the book claim, and which body section discusses it?
- What kind of source does the book cite (RCT, single study, meta-analysis, anecdote)?
- What's the current state of evidence (replicated, refined, weakened, disproven)?
- Which critics are most worth reading, and what's their argument?

## Shape

```markdown
## Appendix: claim-source-evidence table

| § | Claim | Book locator | Source quality | Current state | Critics (tier ‖ argument) |
|---|---|---|---|---|---|
| 1 | Scout / soldier as two reasoning postures | Ch 1 [L20] | expert-frame (Kunda 1990, Gilovich 1991) | replicated (conceptual) | T2: deBoer (Substack 2021) ‖ martial metaphor is loose |
| 2 | Six functions of soldier mindset; trainings fail | Ch 2 [L21, L35] | assertion + cited-single-study | refined (debiasing trainings DO transfer; Morewedge 2015) | T1: Morewedge/Sellier ‖ debiasing game transfers to field |
| 4 | Knowledge amplifies polarization | Ch 4 [L23] | cited-single-study (Kahan 2017) | weakened (motivated-numeracy failed several preregistered replications) | T1: Persson 2021 ‖ failed preregistered replication |
```

## Column rules

- **§** — section number in the post.
- **Claim** — one-line claim, plain English, agent's framing.
- **Book locator** — chapter number + `[L#]` markers.
- **Source quality** — one of: `cited-RCT`, `cited-single-study`, `cited-meta-analysis`, `cited-replicated-body`, `expert-frame`, `anecdote`, `personal-experience`, `assertion`.
- **Current state** — one of: `replicated`, `refined`, `weakened`, `disputed`, `disproven`, `unsettled`, `no-update-found`, `n/a` (for purely conceptual claims).
- **Critics** — top 1-2 critics by tier, with their specific argument in `tier ‖ argument` form. `T1` (academic), `T2` (long-form essay), `T3` (replication-tracker).

## What goes in the appendix vs. the body

From `claim-spine.md` Part 4 (Color):

- **If current evidence changes how a reader should apply the idea → it goes inline in the body prose.**
- **If evidence only supports traceability → it goes in this appendix table.**

The source-quality column always lives here, not in the body. The current-state column always lives here. The body mentions source quality only when it changes the argument; the body mentions critics only when the critic's argument changes the reader's stance.

## Generation

Phase 4 step 8 (after body sections + TL;DR are drafted):

1. Walk the claim matrix from `notes/<book-slug>.md` `## Claim matrix`.
2. For each major claim, emit one row.
3. Order rows by section number.
4. Skip illustrative-centrality claims that don't get their own body section (they don't appear in the post; they don't appear in the appendix).

## Gate D check

Gate D's ledger-marker cross-check additionally verifies:
- Every body section has a corresponding appendix row.
- Every appendix row's `Book locator` resolves to a ledger entry.
- The `Current state` column matches the `Today's evidence` inline color in the body where present.
