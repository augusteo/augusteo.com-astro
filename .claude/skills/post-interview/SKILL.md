---
name: post-interview
description: Interview Vic about a draft long-form blog post on augusteo.com to capture personal stories, lessons applied to his life, and where the book's frameworks have been useful or failed. Asks 1-3 questions per major claim via AskUserQuestion (one at a time), weaves Vic's answers into the post's `{/* REVISE-WHERE-I-LAND */}` blocks, and marks each block with `{/* INTERVIEW-SOURCED: YYYY-MM-DD */}`. Supports top-N mode (default N=5), skip-all, and paste-import. Use after a writer skill produces a draft, before the post-editor runs. Triggers include "/post-interview <path>", "interview me on this draft", "let's add my stories to this post", "where have I applied this in my life".
---

# Post-interview skill

## Goal

> Take a draft MDX post that has empty `{/* REVISE-WHERE-I-LAND */}` placeholders, interview Vic about his personal application of the book's frameworks, and fill those placeholders with Vic's actual stories, lessons, and failure modes. Each answer ships as a short personal-application paragraph (1-3 sentences) inside the body section, sourced from Vic via AskUserQuestion in real time.

The interview skill is the *personal layer* of the pipeline. The writer skill writes faithfully about the book; the interview captures Vic's lived experience and weaves it into the post; the editor polishes the result.

## When to use

- After `book-explainer-authoring` Phase 4 finishes a draft with empty `{/* REVISE-WHERE-I-LAND */}` placeholders.
- After `explainer-authoring` if Vic wants a personal-application layer.
- On any existing MDX where Vic adds `{/* REVISE-WHERE-I-LAND */}` markers and asks to fill them.
- Anytime Vic says "interview me on this", "add my stories to this draft", "where have I applied this".

## When NOT to use

- Posts without `{/* REVISE-WHERE-I-LAND */}` markers — there's nothing for the interview to fill. Surface the missing markers; do not invent placeholders.
- Posts that Vic explicitly wants to keep impersonal (some research explainers).
- After `post-editor` has already run — order is `writer → interview → editor`. Running interview after editor invalidates the editor's coverage check; re-run editor afterward.

## Inputs

- **Required:** an MDX file path with at least one `{/* REVISE-WHERE-I-LAND */}` placeholder.
- **Optional (auto-detected):**
  - `notes/<slug>.md` (claim matrix — used to identify the major claim per placeholder)
  - `notes/<slug>.ledger.jsonl` (book-source ledger — used to look up the framework + quote per claim)

If the optional inputs exist, the interview can phrase questions specifically ("Have you applied Galef's *scout / soldier* distinction at work?"). If not, the interview reads the section's H3 heading and lead to derive a topic, but the questions are more generic.

## Modes (Vic picks at the start)

The skill opens with one AskUserQuestion to pick the mode:

```
question: "How much interview do you want for this post?"
options:
- "Top-5 claims" (default) — interview the 5 most central claims by centrality
  in the matrix. **Fallback if no claim matrix:** the first 5 `{/* REVISE-WHERE-I-LAND */}` placeholders in book order. The skill names which fallback applied before starting.
- "All major claims" — every major-claim section gets the interview
- "Specific sections" — Vic names section numbers, e.g. "§3, §7, §11"
- "Skip all" — mark every REVISE-WHERE-I-LAND as SKIPPED; no questions asked
- "Paste-import" — Vic pastes a block of notes; skill maps notes to sections
  without further questions
```

After Vic picks, the skill runs the chosen mode and exits.

## Top-5 / All / Specific modes — the question loop

For each selected section (in order):

1. **Read context:** the H3 heading, the lead, the operational sentence, and the local stance. Identify the named framework (or mental model, or quote) that this section centers on.
2. **Ask 1-3 questions**, ONE AT A TIME, via AskUserQuestion. Prefer multiple choice with an open-ended slot. Questions should be:
   - **Q1 (always):** "Have you applied [framework] in your life?" with options like "Yes, frequently"; "Yes, occasionally"; "Tried it, didn't stick"; "No, haven't tried it"; (free text "Other").
   - **Q2 (if Q1 is yes-shaped):** "Where? (Pick the closest context.)" with options like "Product / engineering decisions"; "Hiring decisions"; "Conversations with family / partner"; "Reading / consuming media"; (free text "Other").
   - **Q3 (if Q1 or Q2 surfaces a concrete situation):** "Tell me one specific moment. What happened, and what did the framework do for you (or what did it fail to do)?" — free text.
3. **Skip cleanly:** every question has an explicit "Skip this section" option. If Vic picks Skip on Q1, the section's placeholder becomes `{/* REVISE-WHERE-I-LAND: SKIPPED YYYY-MM-DD */}`.
4. **Draft + approve + insert.**
   - Compose a 1-3 sentence paragraph in Vic's voice (using the captured Q1-Q3 answers as raw material).
   - **Show Vic the drafted paragraph via AskUserQuestion** with options: "Looks good, insert"; "Regenerate (give me hints)"; "Skip this section after all". Personal stories are sensitive — never insert unapproved prose.
   - On "Looks good", insert between the markers and change the opening to `{/* REVISE-WHERE-I-LAND: INTERVIEW-SOURCED YYYY-MM-DD */}`. Closing stays `{/* /REVISE-WHERE-I-LAND */}`.
   - On "Regenerate", capture Vic's hint and try once more (one regeneration round, then offer Skip).
   - On "Skip after all", mark as `{/* REVISE-WHERE-I-LAND: SKIPPED YYYY-MM-DD */}`.
5. **Persist to interview notes file.** Append the section's Q+A to `notes/<slug>.interview.md`:

   ```markdown
   ## §6: Calibrate yourself, but narrowly

   **Framework:** Galef's calibration practice

   Q1: Have you applied this in your life?
   A1: Yes, frequently — in project estimates and hiring odds.

   Q2: Where?
   A2: Product / engineering decisions.

   Q3: One specific moment?
   A3: When estimating Boon's ETA on the takeoff feature, I started tracking my
   90% confidence intervals on shipping dates. After 3 months I noticed I was
   hitting 70% — wider intervals, but better-calibrated than my initial gut.
   The skill transferred narrowly: I'm still bad at calibrating hiring odds.

   Inserted at MDX line 312.
   ```

6. **Commit per section.** `interview: §6 personal-application from Vic`.

## Paste-import mode

When Vic picks "Paste-import":

1. The skill asks one open-ended question: "Paste your notes. I'll map them to sections."
2. Vic pastes a block of text (organized however he wants — bullet points, paragraphs, section headings).
3. The skill parses the pasted text:
   - If headings/labels (§N, "section 6", "calibration") map cleanly to sections, use them.
   - Otherwise, the skill proposes a mapping (one AskUserQuestion per ambiguous chunk) and waits for Vic to confirm.
4. For each mapped chunk, the skill drafts a 1-3 sentence paragraph in Vic's voice, **shows it to Vic for approval (same approval gate as the question-loop flow)**, and inserts on approval.
5. Sections **not mentioned in the paste** stay as bare `{/* REVISE-WHERE-I-LAND */}` markers. The skill does NOT aggressively mark them SKIPPED — they're left for Vic to either run an interview pass later or explicitly skip via a separate `/post-interview <path>` run with the "Skip all" mode. Aggressive auto-skipping in paste-import would silently lose Vic-pending sections.

Paste-import is faster than top-5 when Vic already has notes; the trade-off is less ad-hoc nuance (no follow-up Q3-style probing).

## Skip-all mode

For each `{/* REVISE-WHERE-I-LAND */}` opening marker in the MDX:

- Replace with `{/* REVISE-WHERE-I-LAND: SKIPPED YYYY-MM-DD */}`.
- Leave the body empty.

This is the path when Vic wants to ship without the personal layer. Editor and Gate D will treat SKIPPED as a terminal state, not a structural failure.

## What the skill writes

Vic sees and approves every interview-sourced paragraph before it's committed (one regeneration round, then offer Skip). The paragraph is **1-3 sentences**, in Vic's voice, capturing:

- The specific application context (where Vic used the framework).
- What happened (concrete situation, not generic).
- The outcome — useful, partial, failure mode, surprising.

Examples of good interview-sourced paragraphs:

```markdown
{/* INTERVIEW-SOURCED: 2026-05-16 */}
I use the scout / soldier check during product reviews. When I notice myself reaching
for "we don't have time to test this", I ask whether I'd accept the same argument
from a teammate proposing the opposite. About 60% of the time, I wouldn't, and the
test gets scheduled.
{/* /REVISE-WHERE-I-LAND */}
```

```markdown
{/* INTERVIEW-SOURCED: 2026-05-16 */}
The Ideological Turing Test is my journaling exercise, not a credential. I tried
writing the strongest version of the position I disagreed with on a hiring debate
last quarter; what surprised me was how much I had to read to get past parody,
which was its own update.
{/* /REVISE-WHERE-I-LAND */}
```

Bad interview-sourced paragraphs:

- **Generic** ("I've found this framework useful in many situations"). Specificity is the whole point.
- **Multi-paragraph** (> 3 sentences). Keep it tight; the body section's local stance covers the broader take.
- **Speaks for Vic without his answer** (the skill never fabricates a story; if Vic doesn't have one, SKIP).
- **Promotional** ("This is one of the most powerful frameworks in the book"). Vic is reporting, not selling.

## Hard rules

1. **One question at a time.** AskUserQuestion never bundles multiple questions per call. Vic picks an answer, the skill processes, then the next question fires.
2. **Skip is always an option.** Every question has an implicit skip path. The skill never traps Vic into answering when he doesn't have a story.
3. **Vic's voice, not the agent's.** The 1-3 sentence paragraph uses Vic's words from the Q3 answer; the agent's job is to compose them into prose, not to elaborate or summarize.
4. **One marker change per section.** The opening `{/* REVISE-WHERE-I-LAND */}` becomes either `{/* INTERVIEW-SOURCED: YYYY-MM-DD */}` (filled) or `{/* REVISE-WHERE-I-LAND: SKIPPED YYYY-MM-DD */}` (skipped). The closing marker stays unchanged. No other marker states.
5. **Top-5 is the default to reduce friction.** Asking 15 questions per post is a tax; top-5 catches the highest-load-bearing claims.
6. **The skill does NOT auto-run after the writer.** Vic invokes `/post-interview` when he's ready. The writer handoff prints the suggested invocation.
7. **Sectioned commits.** One commit per section so Vic can review via `git log`. Commit messages follow `interview: §N personal-application from Vic`.

## Halt-and-ask conditions

- No `{/* REVISE-WHERE-I-LAND */}` placeholders in the MDX → halt, surface to Vic ("nothing to interview — the writer may not have emitted placeholders").
- Vic's Q3 answer is non-specific or empty → ask a follow-up clarifying question once; if still vague, mark SKIPPED rather than fabricate.
- Paste-import parsing fails to map ≥50% of chunks → halt, ask Vic to add section labels or re-paste.
- The MDX uses the legacy 9-part contract (writer-drafted `*Draft stance...*` preambles in `{/* REVISE-WHERE-I-LAND */}` blocks) → halt, suggest running the editor's Pass 3 first to clean the scaffolding, OR ask Vic whether to interview anyway (his answers replace the old draft prose).

## Composition with other skills

- Runs between `book-explainer-authoring` Phase 4 and `post-editor`.
- May run between `explainer-authoring` final draft and `post-editor`.
- Uses AskUserQuestion for every Vic-facing question.
- Reads `notes/<slug>.md` claim matrix if present.
- Does NOT invoke other skills directly.

## Output structure

```
src/content/blog/<slug>/index.mdx        # edited in place; markers updated
notes/<slug>.interview.md                # Q+A persisted (new file)
git history                              # one commit per section
chat                                     # the interview itself (one question at a time)
```

## Verification

After the run:

- Every `{/* REVISE-WHERE-I-LAND */}` opening marker is in a terminal state (`INTERVIEW-SOURCED:` or `REVISE-WHERE-I-LAND: SKIPPED`).
- `notes/<slug>.interview.md` exists with one section per interviewed claim.
- Each interview-sourced paragraph is 1-3 sentences, specific, in Vic's voice.
- No fabricated stories (every paragraph traces to a Q3 answer captured in `notes/<slug>.interview.md`).
