# Codex gate runner (shared harness)

Generic runner for codex gates used by the explainer-family skills (`explainer-authoring`, `book-explainer-authoring`). Each skill defines its own gates and prompts; this file is the shared mechanics for invoking them and recording outcomes.

The runner is referenced from each skill's `codex-prompts.md` (explainer) or `codex-gate-prompts.md` (book skill). The skill provides the per-gate inputs; the runner provides the shared loop, size policy, history-table contract, re-run cap, override safeguard, and proof-of-fire.

## Operating principle

**Codex is doing a hostile, truth-seeking pass.** It is not here to validate. It is here to find what is wrong. Treat its findings as adversarial signal: if codex says "this claim is unsupported," default to assuming codex is right and re-check the source.

Stop iterating when codex's last critique is **cosmetic, not structural**. Cosmetic = "the figcaption could be tighter." Structural = "section 3's main claim cites a paper that doesn't say that," or "claim X has no row in the matrix / no anchor in the ledger."

## Per-gate runner steps

Each gate in the calling skill has:

- A **prompt template** (in the skill's gate-prompts file).
- A set of **inputs to embed** (notes-file sections, MDX content, ledger excerpts, etc., named by the calling skill).
- A **notes-file section name** where verbatim output goes (e.g., `## Codex research review` for explainer-authoring, `## Codex ingestion audit` for book-explainer-authoring).
- A **gate label** for the Codex history table (e.g., `0 (research)`, `A (ingestion)`).
- A **`<gate-key>`** for findings-file naming (e.g., `research`, `outline`, `final`, `ingestion`, `matrix`, `spine`, `draft`).

The runner executes these steps in order for any gate.

### Step 1: Build the prompt

1. Take the prompt template from the skill's gate-prompts file verbatim.
2. Substitute `[QUOTE THE GOAL STATEMENT]` with the literal Goal text from the skill's `SKILL.md` Goal section.
3. Append the gate's "What you provide to codex" content as inline embedded sections (named by the skill).
4. The result is a single string ready to pass to the codex skill.

### Step 2: Invoke the codex skill

```
Skill tool call:
  skill: codex
  args: consult <full prompt string built in Step 1>
```

The codex skill's `consult` mode handles the heavy lifting (boundary instructions, prompt safety, output capture). Do not invoke `codex exec` directly from any explainer-family skill; route through the codex skill.

### Step 3: Apply size policy to codex's output

Capture codex's verbatim output (let `OUTPUT_BYTES` = its byte length).

```
If OUTPUT_BYTES <= 8192 (≈ 8 KB):
  Paste the output verbatim into notes/<slug>.md under
  the skill's gate-output section name.

If OUTPUT_BYTES > 8192:
  Write the full output to a findings file:
    notes/<slug>-codex-<gate-key>-<YYYYMMDD>.md
  In notes/<slug>.md under the skill's gate-output section, paste:
  - A one-paragraph summary (you write this; ≤ 6 sentences).
  - A relative-link line:
      [full findings: notes/<slug>-codex-<gate-key>-<YYYYMMDD>.md]
  - The labeled finding count: `Findings: N STRUCTURAL, M COSMETIC.`
```

This keeps `notes/<slug>.md` browsable (the file is meant to be read end-to-end on resume); large gate outputs go to dated findings files where they remain discoverable but don't bloat the resume tracker.

### Step 4: Append a row to the Codex history table

Inside `## Resume here` → `### Codex history`:

```
| <YYYY-MM-DD> | <gate-label> | <outcome> | <findings ref> |
```

Where:

- `<gate-label>`: the skill's name for the gate (e.g., `0 (research)` for explainer-authoring; `A (ingestion)` for book-explainer-authoring).
- `<outcome>`: `clean` (no findings) / `cosmetic-only` / `structural-fixed` (after re-run loop closed) / `halted` (loop limit hit or halt-rule fired).
- `<findings ref>`: the notes-file section name (e.g., `## Codex research review`) OR a relative path to the findings file.

### Step 5: Parse findings and act

Walk codex's output. For each finding labeled `STRUCTURAL`:

```
For each STRUCTURAL finding:
  Apply the fix as described by codex (edit matrix / outline / prose /
  ledger / figure table / freshness annotation — per the calling skill).
  Commit the fix per the "one thing per commit" rule. Annotate the
  commit message with the gate label and the finding category.

After fixes are committed, re-run from Step 1 with the fixed inputs.
```

For findings labeled with **skill-specific subtypes** (e.g., `TYPE-CHANGE STRUCTURAL` for explainer-authoring's Gate 1; `LOW-CONFIDENCE INGESTION` for book-skill's Gate A), follow the skill-specific fork described in the calling skill. The runner does NOT handle subtypes; those are the calling skill's responsibility, and any sub-protocol re-invocation counts against the Step-6 cap below.

### Step 6: Re-run loop limit

A gate may run up to **3 invocations total** (initial + 2 re-runs). On the 4th invocation:

```
Halt the gate.
Surface to Vic:
- "Gate <gate-label> on <slug> has not closed after 3 invocations."
- The full codex output from the latest run.
- A summary of fixes attempted across the 3 invocations.
- An AskUserQuestion: "(a) accept current state and proceed (codex
  override; recorded in notes); (b) halt the post and surface the
  blockers as next steps; (c) override codex on a specific finding
  only and continue (you specify which)."
```

This cap exists because if codex has surfaced STRUCTURAL findings 4 times in a row, either codex is wrong (and Vic has to override) or the post itself is in fundamental trouble. Don't loop forever.

**Skill-specific subprotocols count against this cap.** The cap is on TOTAL gate invocations, not on independent fix paths. If a skill's subprotocol (e.g., the explainer-authoring unlock protocol, the book-skill ingestion-rerun protocol) re-invokes the gate, those re-invocations consume Step-6 slots.

#### Skill-declared non-overridable finding subtypes

The calling skill may declare specific finding subtypes as **non-overridable**. When such a subtype is among the unresolved findings on the 4th-invocation halt, the AskUserQuestion options above are restricted:

- **Option (a) accept-and-proceed** is REMOVED.
- **Option (c) override-on-specific-finding** is RESTRICTED — Vic may override other findings but not the non-overridable ones; the prompt must enumerate which findings are overridable.
- **Option (b) halt the post** remains the only path forward if all unresolved findings are non-overridable.

The skill declares non-overridable subtypes in its `codex-prompts.md` / `codex-gate-prompts.md` per-gate section. Example: book-explainer-authoring's Gate D marks `LEDGER-INTEGRITY STRUCTURAL` as non-overridable (broken ledger anchors must be fixed, not overridden).

The runner reads the declaration as part of the per-gate inputs and applies the restriction automatically. If no non-overridable subtypes are declared, Step-6 runs with the full three-option AskUserQuestion as above.

### Step 6a: Override never auto-ships; Vic owns the draft flip

**Critical safeguard, shared across all explainer-family skills.** The MDX is `draft: true` from creation through ship — neither gate acceptance nor a Step-6 override flips it. The skill never writes `draft: false`. What Step 6 controls is whether the gate-runner proceeds to the next phase, not whether the post is shippable.

Recording requirements when Vic picks `accept-and-proceed` or `override-on-specific-finding`:

1. The Step-6 outcome is recorded in the skill's gate-output section AND in the `### Codex history` table.
2. For overrides specifically, annotate the entry as `Step-6 override` and list the unresolved findings being overridden. For clean acceptance, annotate as `accepted (no STRUCTURAL findings)` or `accepted (all STRUCTURAL findings fixed)`.
3. The MDX stays `draft: true` regardless.
4. When Vic is ready to ship, Vic flips the flag himself in a single-purpose commit. If the ship is happening with unresolved STRUCTURAL findings (Step-6 override on a final-pass gate), the commit message must include the literal phrase `Step-6 override on Gate <gate-label> — overridden findings:` followed by the list, so the audit trail is searchable in `git log`. A clean ship needs no special commit-message annotation.

This safeguard exists because Step 6 is the gate-runner's escape hatch from infinite re-runs; it is NOT a truthfulness override. Publishing with unresolved STRUCTURAL findings requires a deliberate, separate action by Vic — never a single AskUserQuestion answer that the skill silently turns into a publish. The two-step structure (override now + Vic's explicit ship commit later) is the friction that catches a tired agent's "Vic said proceed → publish" misread.

### Step 7: Proof-of-fire

A gate is only marked `done` in `## Resume here` → `### Phase status` if Step 4's row was actually appended to the Codex history table. The phase-transition status print (printed to chat at end of every phase) is the audit trail Vic uses to verify gates fired. If a phase status says `done` but no Codex history row exists for that phase's gate, the phase is not actually done — re-run from Step 1.

## A note on tone

Codex is doing the hostile pass so the post can ship clean. The pipeline expects codex to find things; that's the point. Don't argue with codex on structural findings without checking the source. The cost of fixing is low; the cost of shipping a wrong claim is high.

If you genuinely think codex is wrong on a structural finding (it misread a source, it claimed a section was missing context that's actually present), say so explicitly in the notes file under the relevant gate-output section, with the reasoning. Don't silently dismiss.
