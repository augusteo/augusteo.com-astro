# `REVISE-WHERE-I-LAND` placeholder convention

The old "Where I land" template was load-bearing in the 9-part contract: the writer drafted a stance in the agent's neutral voice, Vic rewrote it in his voice during a manual review pass. The new reader-first contract changes that:

- **The body's local stance** (1-2 sentence agent judgment per section) ships as-is in the section prose. The writer owns this. It does NOT need a wrapper, Vic does NOT need to rewrite it — the agent's read of the evidence is a fine layer for the post.
- **`<!-- REVISE-WHERE-I-LAND -->` wrappers** are reserved for a different layer: the **personal-application paragraph** that the `post-interview` skill fills with Vic's stories, experience, and failure modes. The writer emits empty placeholders; the interview skill fills them.

This file documents the new contract.

## Where the writer emits placeholders

After the local stance of each **major-claim** section (centrality `core` or `supporting`), the writer emits:

```markdown
<!-- REVISE-WHERE-I-LAND -->
<!-- /REVISE-WHERE-I-LAND -->
```

Empty between the markers. No preamble. No agent-drafted stance text.

Illustrative-centrality sections do NOT get a placeholder — the interview skill won't ask about them by default.

## Terminal states (Gate D check)

The marker namespace stays `REVISE-WHERE-I-LAND` on both opening and closing so a single regex catches all states. The opening marker carries a state suffix; the closing marker is always `<!-- /REVISE-WHERE-I-LAND -->`.

Every block must resolve to one of these terminal states before Gate D will allow ship:

### State 1: filled-by-interview

The `post-interview` skill asked Vic, drafted a 1-3 sentence paragraph from his answer, showed it to Vic for approval, and inserted it.

```markdown
<!-- REVISE-WHERE-I-LAND: INTERVIEW-SOURCED 2026-05-16 -->
I've used the scout/soldier vocabulary to monitor my own framing during product
decisions. When I notice myself reaching for "we don't have time to test this",
I ask whether I'd accept the same argument from a teammate proposing the opposite.
About 60% of the time, I wouldn't, and the test gets scheduled.
<!-- /REVISE-WHERE-I-LAND -->
```

### State 2: explicitly skipped

Vic said "skip" when the interview skill asked. Body stays empty.

```markdown
<!-- REVISE-WHERE-I-LAND: SKIPPED 2026-05-16 -->
<!-- /REVISE-WHERE-I-LAND -->
```

### State 3: removed entirely

For sections where Vic decides the personal layer adds nothing, both markers can be deleted entirely. This is equivalent to State 2 in effect; the difference is stylistic.

## What Gate D refuses

- **Bare `<!-- REVISE-WHERE-I-LAND -->` opening** (no `INTERVIEW-SOURCED:` or `SKIPPED` state suffix). Interview hasn't been run for that section, or was interrupted.
- **Mismatched closing markers** (e.g., `<!-- /KEEP-AS-IS -->` instead of `<!-- /REVISE-WHERE-I-LAND -->`). All closings must match the namespace.
- **Filled body without state suffix.** A personal-application paragraph is present but the opening marker is still bare — Gate D treats this as STRUCTURAL.

Editor's regex contract: `^<!-- REVISE-WHERE-I-LAND(: (INTERVIEW-SOURCED|SKIPPED) \d{4}-\d{2}-\d{2})? -->$`. Bare (no state suffix) → block ship.

The post cannot ship with unresolved REVISE-WHERE-I-LAND blocks. Vic owns the resolution by running `/post-interview`; the skill is what protects this layer.

## Why this shape

The old shape (writer drafts Vic-voice stance → Vic rewrites manually) had two failure modes:

1. **Drafts in Vic's voice.** The agent doesn't have Vic's voice precisely enough. Vic ended up rewriting most blocks, which made the draft a waste of tokens.
2. **Vic owned both the stance and the personal application.** Two separate jobs got bundled into "Where I land" — the agent's read of the evidence (which the agent CAN do) and the personal-application story (which the agent CANNOT do without Vic's input).

The new shape separates them:

- **Local stance** is the agent's job, ships as-is, lives in body prose.
- **Personal application** is Vic's job, gets a placeholder, gets filled by the interview skill (with Vic's actual answers, via AskUserQuestion).

## Resume-mode behavior

If a post is in resume mode and existing `REVISE-WHERE-I-LAND` blocks exist from a prior writer run, the writer does NOT touch them. The interview skill handles them when run.

If the resume-mode draft has the OLD shape (writer-drafted `*Draft stance...*` preamble + agent-voice body), the editor skill's `post-editor` tightness pass flags them for migration. Vic decides per block whether to (a) keep the draft as inline local stance + add an empty placeholder for interview, or (b) discard and run interview from scratch.

## What the writer does NOT do

- Does NOT draft anything in Vic's voice.
- Does NOT include `*Draft stance, generated from parts 5-8 above...*`-style preambles.
- Does NOT fabricate Vic-specific examples or experiences.
- Does NOT auto-resolve placeholders to `SKIPPED` (only Vic, via the interview skill, can mark SKIPPED).
