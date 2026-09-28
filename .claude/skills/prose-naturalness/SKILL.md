---
name: prose-naturalness
description: Lightweight ad-hoc prose edit for naturalness. Use when Vic says "make this sound natural", "fix the prose", "it sounds like AI", "this sounds like Claude". Lighter than post-editor (no ledger, no faithfulness pass, no appendix migration). Focuses on anti-AI patterns, cadence, and voice-check compliance. Edits in place; commits per section.
---

# Prose-naturalness skill

## Goal

> Take an existing MDX post and edit its prose so it reads like a specific person wrote it, not an
> LLM. Every edit preserves technical accuracy and existing citations. The skill never introduces
> new claims, never strengthens or softens existing claims, and never removes citations.

This skill is the lightweight counterpart to `post-editor`. It runs when Vic asks for naturalness
fixes without wanting the full 9-pass editorial pipeline.

## Routing: when to use this skill vs. others

| Trigger | Skill |
|---|---|
| "Make this sound natural" / "fix the prose" / "it sounds like AI" / "this sounds like Claude" / "go paragraph by paragraph and make it flow better" | **prose-naturalness** (this skill) |
| "Review this post" / "coach me on this draft" / "what's working, what's not" (feedback, no direct edits in first pass) | **writing-coach** |
| "Edit this" / "tighten this" / "polish this" / "do a final editor pass" (full ship pass: structure, evidence, voice, ancillary) | **post-editor** |

If the request is ambiguous, ask Vic which skill to use.

## Pipeline detection

Before editing, detect which pipeline owns the post:

- **Obsidian-synced posts.** The MDX under `src/content/blog/` is overwritten by `bun run sync`.
  Check whether the post has a matching source in the Obsidian vault
  (`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/published/`).
  If yes, edit the vault source and run `bun run sync` afterward. Never edit the generated MDX
  directly for these posts.
- **Explainer/book-explainer posts.** The MDX is authoritative (`essay: true` in frontmatter, or
  `notes/<slug>.md` exists). Edit the MDX directly.

If unsure, ask Vic.

## Required reading before ANY edit

Read these files before touching prose. Not "skim"; read.

1. `../../explainer-shared/voice-rules.md` — the canonical "Write Like a Human, Not an AI" guide.
   The generation contract (five constraints) and Gold pairs table are the parts to hold while
   editing. The banned rhetorical moves catalogue (1-23) is the review checklist.
2. `scripts/voice-check.sh` — know what it checks so you don't introduce things it will flag.

All anti-AI detection patterns live in voice-rules.md. This skill does not duplicate them. The
checklist below names the sections to enforce; the rules themselves are in voice-rules.md.

## The three gates

Every editing session has three mandatory gates.

### Gate 1: Pre-edit voice-check baseline

Run `scripts/voice-check.sh <path>` before making any edit. Record the output (failures and
candidate warnings). This is your baseline. If the baseline has failures unrelated to the sections
you are editing, fix them in a separate first commit (`prose: fix baseline voice-check failures`)
before starting section edits.

### Gate 2: Per-section voice-check

After editing each section (or batch of 2-3 short sections), run `scripts/voice-check.sh <path>`.
Check both the exit status and the candidate warnings:

- **Failures (exit code 1):** fix before moving to the next section.
- **Candidate warnings:** inspect each one. For each, record "rewritten" or "kept because [reason]"
  in a scratch note. Do not ignore warnings.

### Gate 3: Final voice-check

After all edits, run `scripts/voice-check.sh <path>`. It must exit clean (zero failures). All
remaining candidate warnings must have a recorded "kept because" reason.

## The editing workflow

### Step 1: Read the whole post

Read the full MDX file. Note:
- What voice register is the post using? (Direct address? Impersonal technical? Mixed?)
- Where does it already sound good? Don't touch those parts.
- Where does it sound generated? Mark those sections.

### Step 2: Run Gate 1

Baseline voice-check. Fix baseline failures if any (separate commit).

### Step 3: Edit section by section

For each section that needs work:

1. Read the section aloud in your head. Flag sentences that sound like a press release or a
   conference abstract.
2. Apply the generation contract (voice-rules.md, top section):
   - Name the thing. No placeholder nouns.
   - "I" only for real judgment. "You" only for real reader consequence.
   - Let the mechanism be the subject when explaining a mechanism.
   - Never buy a shape with a noun.
3. Check against the voice-rules.md catalogue (banned moves 1-23). Pay special attention to:
   - Em dashes (zero tolerance, punctuation rules section)
   - Qualifier stacking (move #21)
   - Borrowed-authority framing (move #22)
   - Semantic echo (move #23)
   - Thesis-shaped abstractions (move #3)
   - Collocation narrowing ("Prefer the precise word" in What to do instead)
   - Uniform paragraph length (structural habits section)
4. Make the edit.
5. Run Gate 2.
6. Commit.

### Step 4: Final pass

Run Gate 3. Report results including disposition of all candidate warnings.

## What to do about missing experiential specificity

Voice-rules.md names this as a pattern (concrete over abstract, precise over likely). When a
paragraph is fluent but empty of specific details (no numbers, no named tools, no concrete failure
modes), the skill **cannot** fix it by inventing details. Instead:

- If the general claim is accurate, keep it as-is. Plain general prose is better than fake-specific
  window dressing.
- If the paragraph would benefit from a concrete example only Vic can provide, add it to the
  punch-list reported at the end. Do not fabricate experience.

## Commit discipline

- One commit per section or per batch of 2-3 short sections.
- Commit message shape: `prose: <what changed>` (e.g., `prose: tighten section 6 lead`,
  `prose: replace em dashes in sections 3 and 7`).
- Gate 2 must pass (exit code 0) before each commit.

## What NOT to do

- **Don't rewrite everything.** Most prose in a post is fine. Touch only what sounds generated.
- **Don't introduce new claims.** You are editing voice, not content.
- **Don't remove citations or weaken sourced claims.** If a sentence has a citation, the rewrite
  must still support the same claim.
- **Don't add em dashes.** Not one. Not ever.
- **Don't add "small idiosyncrasies" as texture.** voice-rules.md explicitly warns against this.
  "I'll be honest" and cute parentheticals are model costumes.
- **Don't make technical claims less specific to sound casual.** "An amount somebody wrote down" is
  worse than "225.7 ms per query." Plain means ordinary words for the real thing.
- **Don't vary sentence length mechanically.** Cadence follows the reasoning, not a noise chart.

## Verification

After the final pass:

- `scripts/voice-check.sh` exits clean (exit code 0).
- All candidate warnings have documented disposition.
- No new em dashes introduced (grep for U+2014 outside act-divider headings).
- No new banned words introduced.
- The post still builds (`bun run build` or verify at localhost).
- Technical claims are unchanged in substance.
- Citations are intact.
- If Obsidian-synced: vault source was edited and `bun run sync` was run.
