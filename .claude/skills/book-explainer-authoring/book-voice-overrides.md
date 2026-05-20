# Book-skill voice overrides

The base voice rules live in `../../explainer-shared/voice-rules.md` — Vic's "Write Like a Human, Not an AI" guide. Those rules apply to every post on augusteo.com.

This file is a thin overlay for book posts only. It tilts the voice toward **reader-first + citation-forward** — faithful summary, scientific accountability, AND reader utility. The post should read like a useful tool, not a critical-edition annotation; the locators are present because the reader can verify, not because the prose is decorated with them.

The base wins on style; the overlay wins on emphasis.

## Tilt 0: Reader first, structure second

Each body section opens with what the claim means for someone trying to think better, before any audit detail. The book-summary content follows the reader-usefulness lead, not the other way around. Source-quality tags, current-state classifications, and critic tier labels do NOT appear as inline italic lines in body prose — they live in the appendix table.

**Apply by:**
- Section leads name a real situation (deciding, hiring, forecasting, arguing) that the claim touches.
- Operational sentence ("try this when X" / "watch for Y") is the bridge from idea to action; each major-claim section has one OR an explicit "no operational layer" note.
- Inline italic audit lines like `*Source quality: cited-single-study. Current state: refined.*` are FORBIDDEN in body prose. That detail moves to the appendix table.
- The body's local stance is plain language, not jargon: "this still holds up", "useful but overclaimed", "skip this one".

## Tilt 1: Citations as audit anchors, not decoration

Every claim from the book has a `[L#…]` marker. Every claim about current evidence has an inline link to a primary source. The reader should be able to verify any sentence about the book without leaving the post.

This is an audit discipline, not a voice flourish. The prose should still feel like prose — anchors at sentence boundaries where they don't break rhythm, never crammed into the middle of a clause.

**Apply by:**
- Don't bury anchors in awkward places. Put `[L#…]` at sentence boundaries where they don't break the rhythm.
- Don't combine two book claims into one anchor-light sentence to feel less cluttered. Two claims = two anchors, period.
- Inline `[link](url)` for every external source on first mention. Repeating the link on second mention is fine but not required.
- Use `> ` blockquote callouts for direct quotes from the book. Quote ≤ 50 words. Anchor the quote with a `[L#…]` marker at the end of the quote.

## Tilt 2: Fewer rhetorical flourishes

The base voice-rules.md bans em-dashes, lists-of-three, and several rhetorical patterns. Book posts go further:

- **No "the question is..."** as a transition. Cut to the question.
- **No "and yet..."** as a paragraph-opener. The contrast can usually be stated directly.
- **No "the truth is..."** or "in reality..." — the prose is already constructing what's true via evidence. Saying "in reality" telegraphs that the previous sentences weren't reality.
- **No throat-clearing setup paragraphs** at the top of a section. Sections lead with the claim (part 1 of the template), not with framing.
- **Sparing use of analogy.** Analogies clean up the book's argument; the book skill's anti-cleanup posture extends here. If an analogy is used, it must illustrate the book's framing, not introduce a new framing.

## Tilt 3: The author by name, not by pronoun

In the explainer skill, sources are typically referred to by paper / org / project. In the book skill, the author is named repeatedly and explicitly:

> "Galef argues..."
> "Galef cites Murphy & Winkler..."
> "Galef does not claim..."

Why: pronouns ("she", "they", "the author") drift over a long post; named references stay precise. The reader can scan the post and see "this is what Galef said vs. this is what the evidence says" without parsing antecedents.

Acceptable variations:
- First mention in a section: full name + book year ("Galef (2021)...").
- Subsequent mentions in the same section: last name only ("Galef").
- "The author" is acceptable when the focus is on the act of authorship itself ("the author's framing here..."), but use sparingly.

## Tilt 4: Don't speak for the author

This is the failure mode the Scout Mindset post hit, in voice form. Don't write sentences like:

❌ "Galef would probably agree that..."
❌ "What Galef really means here is..."
❌ "Reading between the lines..."

These insert agent interpretation as authorial intent. If the agent thinks the book implies something the book didn't explicitly say, that goes in part 9 ("Where I land") wrapped in `REVISE-WHERE-I-LAND` for Vic. Not in parts 4–6.

## Tilt 5: Hedge less, locate more

The base voice rules already discourage hedging ("perhaps", "roughly", "essentially"). The book skill goes further: where hedging is tempting, anchor instead.

Compare:

❌ "Galef seems to suggest that calibration training mostly works."
✅ "Galef writes that calibration training reliably improves probability estimation in a few weeks of feedback [L#42]." (Specific quote, specific anchor.)

❌ "The current research is somewhat mixed."
✅ "Two pre-registered replications [link 1][link 2] find smaller effects than Galef's seed cite; one meta-analysis [link 3] finds the original effect intact." (Specific findings, specific sources.)

The locator does the work the hedge was trying to do.

## Tilt 6: The post's stance is in part 9, not in parts 1–8

Parts 1–8 are descriptive: what the book says, where it came from, what the evidence is, who critiques it. The agent's stance — what Vic thinks — lives in part 9 ("Where I land"), and is wrapped in `<!-- REVISE-WHERE-I-LAND -->` for Vic to own.

Voice in parts 1–8 should be **reportorial**, not editorial. Avoid:

- "This argument is weak." (Editorial.) → State the evidence and let the reader weigh it.
- "Critically, the book overlooks..." (Editorial.) → "The book does not address X" (descriptive).
- "The replications are damning." (Editorial.) → "The Many Labs replication found effect size ~0.05 vs. original ~0.4" (specific).

This isn't false objectivity — Vic's stance does land, in part 9, with the agent's draft as a starting point. The discipline is to keep stance and description separate so the reader can see both.

## Tilt 7: Numbered claims feel different from prose claims

Book posts use H3 numbered headings (`### 1. ...`, `### 2. ...`) for sections. Within a section, the 9 parts appear in order with bold labels (`**What the book says.** ...`).

The numbered structure tells the reader: this post has a fixed shape, and we are step N of N. The voice should respect that shape:

- Don't make claims that span multiple sections without explicit cross-references. If claim 3 depends on something established in claim 2, write "Per section 2, ..." or "Building on the calibration claim above, ...".
- Don't add narrative connective tissue between sections that doesn't itself belong to one of the 9 parts. The H3 header is the transition; no "Now let's turn to..." paragraphs.
- If a chapter divider (`## Chapter N: <title>`) is used, the divider gets a short (1-paragraph) intro setting up the chapter's role in the book — but this is the only place such intros live.

## Voice-check integration

The base voice-rules.md voice-check (`scripts/voice-check.sh`) runs unchanged. This file's tilts are NOT enforced by the script (they're stylistic, not pattern-matchable). The agent self-checks them per section.

What the script catches:
- Em-dashes outside act-divider headings (zero tolerance).
- Banned words from voice-rules.md.

What the agent checks (per this file):
- No "the question is..." / "and yet..." / "the truth is..." / "in reality...".
- Citation density per claim (every book claim has `[L#…]`; every evidence claim has inline link).
- Author by name (`Galef`, not `she`).
- Parts 1–8 are descriptive; stance is isolated to part 9 with `REVISE-WHERE-I-LAND` wrappers.

If the agent isn't sure a sentence respects the tilt, halt and ask Vic. Over-applying the tilt (becoming dry and unreadable) is its own failure mode.

## When the tilt fights the base rules

If a base voice rule and a book tilt conflict, the **base rule wins** for mechanics (em-dashes, banned words), and the **tilt wins** for stance / emphasis. Specifically:

- If a banned word would be the natural way to say something locator-dense, rewrite both: replace the banned word AND keep the locator density.
- If the base rule says "use plain English" and the tilt says "be locator-dense", both apply: plain-English sentences with citations is the target.

There is no case where a base rule and a tilt are in irreconcilable conflict. The base is the substrate; the tilt is the emphasis.
