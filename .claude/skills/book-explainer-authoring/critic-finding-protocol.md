# Critic-finding protocol

For each claim, the skill surfaces credible critics of the book's claim. Per Vic: "find critics of the book as well, whether the book is good or not, and if the critic is reliable and credible." This file is the protocol.

The output goes to the matrix's `Critics` column and the post's part 8 ("Credible critics").

## Source tiers

Three tiers, in order of weight when surfacing critics:

### Tier 1 (T1): Academic / domain-expert critique

- Peer-reviewed responses in the same / adjacent journals where the book's seed citations appeared.
- Domain-expert blogs with track records: Andrew Gelman (statistics), Stuart Ritchie (psychology / replication), Phil Tetlock (forecasting), Andrew Sullivan / Adam Mastroianni (psychology). For the specific book's domain, identify the analogous experts.
- University talks / panels where the book is critiqued by name.
- Citations of the book inside subsequent peer-reviewed papers — these often include critique embedded in literature reviews.

**Search approach for T1:**
- Google Scholar with the book title as a query, filtered to articles citing it.
- Search the author's name + "critique" or "response" in Google Scholar.
- Search domain-expert blogs by name + book title.

### Tier 2 (T2): Long-form review essays

- London Review of Books, New York Review of Books, The Atlantic, Harper's, The New Yorker, The Baffler, The Point.
- Substack long-form: Adam Mastroianni's Experimental History, Slime Mold Time Mold, Scott Alexander's Astral Codex Ten, Astral Codex Ten / Slate Star Codex archives.
- Newspaper book reviews from the NYT / WSJ / Guardian / FT, but only the long-form analyses (not "Here's a 600-word summary").
- Specialist magazines in the book's domain (e.g., Quanta, Aeon, MIT Tech Review for tech-adjacent books).

**Search approach for T2:**
- Google: `<book title> review site:nybooks.com OR site:lrb.co.uk OR site:theatlantic.com`.
- Google: `<book title> "critical review"`.
- Substack search for the book title.

### Tier 3 (T3): Replication-tracker hits / community critique

- **Retraction Watch entries** mentioning the book's seed studies.
- **Data Colada posts** critiquing studies the book cites.
- **PubPeer threads** on the book's seed papers (PubPeer is a post-publication peer-review platform).
- **Reproducibility Project: Psychology** result pages for studies the book cites.

Tier 3 is the most rigorous form of "the science doesn't hold up," and it's the cleanest evidence in part 8. If a study the book treats as canonical has a Data Colada post critiquing the analysis, that goes straight into part 8 with the link.

T3 also includes Goodreads / popular-critic critique BUT only when (a) the critic identifies a specific, factual flaw, and (b) the critic has a track record (e.g., is a domain expert moonlighting on Goodreads). Pure preference-of-taste reviews don't qualify.

## Credibility ranking rule (tiered)

When surfacing critics in part 8 of a section, tier them in this order:

```
T1 (academic / domain-expert) > T2 (long-form essay) > T3 (replication tracker / community)
```

The post's part 8 lists critics by tier, lower-numbered tiers first:

```
**Credible critics.**

- **T1: Gelman (2019)**, "Calibration is overrated as a general thinking skill" [link].
- **T1: Tetlock**, "Calibration without ongoing forecasting practice degrades" [link].
- **T2: The Atlantic (2023)**, "The Limits of the Scout Mindset" [link].
- **T3: Data Colada #80**, "The Murphy & Winkler design is underpowered for the claimed effect size" [link].
```

If no T1 critique exists, lead with T2. If no T1 or T2, lead with T3. **If no credible critique at any tier exists, say so:** "No credible critics found in search; the claim appears to stand under scrutiny." Don't manufacture critics to seem balanced.

## "Argument first, credential second" — the load-bearing rule

The post leads each critic entry with the **specific argument**, not the credential. The reader should see what the critic actually claims is wrong before knowing who they are.

Compare:

❌ **Wrong** (credential first, vague argument):
> "Andrew Gelman, professor at Columbia, has criticized the book."

✅ **Right** (argument first, credential as metadata):
> "Calibration training doesn't transfer across domains — that's [Andrew Gelman's argument](link), and it lands because the book's own evidence is single-domain (weather forecasting)."

The credential ("T1: Andrew Gelman, Columbia statistician") is metadata: it tells the reader how to weight the argument, not what the argument is.

## Critic-balance rule (no dunk pile)

When the field on a claim is genuinely mixed, the part 8 list reflects that mix. Don't curate a one-sided dunk pile.

**Two failure modes** the rule prevents:

1. **Selection bias toward critics.** The agent finds 4 critical reviews and 4 supportive reviews; surfaces only the critical ones. This makes the book look uniformly criticized when it isn't.
2. **False balance toward the book.** The agent finds 6 credible critiques and 1 weak defense; lists them as 1-for-1 to seem balanced. This understates the critique.

**How to apply the rule:**

- For each claim, after searching all three tiers, **count credible critiques vs. credible supports**.
- If the ratio is heavily skewed (e.g., 5:1 critique), the post's part 8 says so explicitly: "Credible critique outnumbers credible support roughly 5:1 in my search."
- If the ratio is mixed (e.g., 2:3 or 3:3), surface both sides with their tiers. Use a sub-heading or paragraph break:

```markdown
**Credible critics.**

*Critique:*
- **T1: Gelman**, "[argument]" [link]
- **T2: Atlantic**, "[argument]" [link]

*Support:*
- **T1: Tetlock**, "[argument]" [link]
- **T2: Quanta**, "[argument]" [link]
```

- If no credible critique exists: "No credible critics found." (Stand-alone single-line sentence.)
- If no credible support exists either (the claim is just unsupported): part 5 ("Where the book gets it") should flag it as `assertion`. Part 8 lists the critics; the absence of support is also data.

## When critics disagree about what's wrong

It's common for T1 critics to converge on "this study didn't replicate" while T2 critics focus on "the book overgeneralizes". Both are valid critiques and the post can surface both.

Use the critic's own framing. Don't merge two different critiques into a "summary." Each entry stands on its own:

```markdown
- **T1: Many Labs 2 (Klein et al., 2018)** failed to replicate the priming effect Galef's chapter 4 cites [link]. Effect size ~0.05, originally claimed ~0.4.
- **T2: Atlantic 2022** argues the scout / soldier framing is itself a soldier-mindset gesture — defending the value of truth-seeking against the implied alternative [link].
```

These are two different objections; both go in part 8.

## Search budget per claim

| Centrality | Budget |
|---|---|
| Core empirical claim | up to 30 min: T1 (15) + T2 (10) + T3 (5) |
| Supporting empirical | up to 15 min total |
| Illustrative / anecdote | up to 5 min total |
| Conceptual / framework | up to 20 min: T1 (10) + T2 (10) |
| Practical / moral | up to 10 min: T2 (5) + T1 (5) |

These are wall-clock budgets, not source counts. A single high-signal T1 critique is worth more than five low-signal Goodreads takes.

## Quality bar per tier

For a critic to make it into part 8, the entry needs:

1. **Identifiable critic**: name, publication, or org. "Reddit user" doesn't count.
2. **Specific argument**: a quoted or paraphrased claim about what's wrong. Vague "I didn't like the book" doesn't count.
3. **Stable URL**: the link works as of the post's `pubDate`. Phase 7's freshness pass re-checks.
4. **Tier-appropriate authority**: T1 needs an academic / domain expert. T2 needs the publication credential. T3 needs a tracker entry.

If a critic flunks one of these, exclude. If many critics flunk because the book is too recent / too niche for serious critique to have landed, surface that fact: "Book is recent; serious critique has not yet developed."

## When the book has no critics

Some books — particularly memoirs, niche technical works, well-respected synthesis works — have no credible critics. The protocol's output is then: "No credible critics found in [duration] search."

This is a genuine outcome and is not a failure of the protocol. The post's part 8 says so plainly. Don't fabricate critics to seem balanced; the absence of critique is itself meaningful information.

## When to halt and ask

- **The critique surfaced is itself contested** (e.g., a study claiming the book's claim doesn't replicate has itself been critiqued). Lay out both sides; if Vic should weigh in on which to lead, ask.
- **A T1 critic has a serious conflict of interest** (e.g., the critic is a competitor in the book's market). Surface this as metadata; let Vic decide whether to include.
- **The critique is a Twitter / X take from a named expert with no longer-form follow-up.** Generally exclude (tier requires more than a tweet), but flag to Vic if the take is high-signal and there's no other critic.
