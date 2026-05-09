# Codex Phase 6.5 review — openclaw-and-hermes-agent

Out-of-band quality pass invoked 2026-05-09 between Phase 5 (figures landed) and Phase 6 (playwright per-figure review). Vic asked codex to review the rendered post for (a) where new figures would EARN their place, (b) narrative-flow improvements, (c) accuracy / claim-drift risks not yet caught by Gates 0/1.

Codex output verbatim below. Findings: 3 STRUCTURAL illustration adds + 2 COSMETIC illustration calls; 3 STRUCTURAL narrative gaps + 2 COSMETIC; 6 STRUCTURAL accuracy regressions + 1 COSMETIC.

Most-load-bearing finding: Fig 5's SVG annotation contradicts row 31's prose rule (resurrects the closed Gate 0 wording bug); Fig 6's SVG subtitles re-introduce the per-backend overclaim Gate 1 closed in Run 2; §10 still has paraphrase where rows 19 + 26 demanded verbatim re-quote.

```
**1. Illustration Gaps**

1. **STRUCTURAL — §7 Workspaces / sessions / sandboxes.** A figure earns its place here because the prose asks readers to keep three independent boundaries straight before §8. Figure type: static layered stack. Sketch: Gateway at top, agent workspace as filesystem root, sessions as JSONL transcript lanes inside the agent, sandbox wrapper optionally surrounding tool execution with `none` / `ro` / `rw`.

2. **COSMETIC — §13 Skill creation + mid-use self-improvement.** No new figure earned. Fig 5 already carries the loop; a second inner-loop SVG would restate "experience → skill → refinement" without unlocking a new distinction.

3. **STRUCTURAL — §14 FTS5 cross-session recall.** A figure would unlock the key intuition that session boundaries become searchable rather than erased. Figure type: static retrieval pipeline. Sketch: current task query → FTS5 index over prior session transcripts → matched transcript snippets → LLM summary → current context, with "not a named skill" called out.

4. **STRUCTURAL — §15 Honcho licensing surface.** The install-path nuance is easy to misread, and Fig 5 currently worsens it by saying "opt-in via `[honcho]` extra" while omitting aggregate extras. Figure type: small dependency fork / install-path strip. Sketch: base install → MIT/no Honcho; `[honcho]` → Honcho AGPL; `[all]` / `[termux]` → includes `[honcho]` indirectly.

5. **COSMETIC — §17 Hermes lands.** A standalone comparison panel is not earned because Fig 7 immediately follows. The need is prose: make the OpenClaw-vs-Hermes contrast explicit before the final map.

6. **COSMETIC — Existing Fig 6.** It is close to over-engineered for a seven-item list; if retained, strip it to names plus the Daytona/Modal bracket. The current per-backend subtitles create accuracy risk.

**2. Narrative Flow Improvements**

1. **STRUCTURAL — §6 drops the running scenario too abruptly.** Act 1 ends with the team needing reach; §6 opens with a callback to the "Hand Tools" post instead of carrying that failure into OpenClaw. Start §6 from "v3 needed a reachable control plane; OpenClaw is the concrete architecture for that problem," then place the external callback later or delete it.

2. **STRUCTURAL — §11 → §12 pivot mostly lands, but the handoff is too thin.** "Hermes will land somewhere else" is directionally right; it needs one sharper bridge: OpenClaw persists sessions so routing stays coherent, while Hermes mutates future behavior from task history. That distinction is the Act 3 door.

3. **STRUCTURAL — §17 is underpowered for the closing weight.** "gateway-with-skills" is not one of the established surface rungs, and the section does not fully reconcile Hermes's gateway/multi-channel surface with its adaptation-centered bet. Replace with a three-dial compare against §11: same neighborhood on lifespan/surface, decisive split on adaptation.

4. **COSMETIC — The running scenario reappears late but not gracefully.** §17 references the v4 rollout after disappearing for all of Act 2 and most of Act 3. Add light callbacks at §6 and §12 so the §17 callback feels like payoff, not retrieval from cold storage.

5. **COSMETIC — §16 feels like a side annex.** The backend/tool stack is relevant, but the first sentence should say why it belongs in the learning-loop act: these are the execution substrates where skills, recall, and subagents run.

**3. Accuracy / Claim-Drift Risks**

1. **STRUCTURAL — Row 19 NanoClaw re-quote requirement is not closed.** §10 still paraphrases `inbound.db` / `outbound.db` flow instead of re-quoting the architecture wording. Current NanoClaw README has usable primary text: "When a message arrives…" and "Two SQLite files per session…" ([source](https://raw.githubusercontent.com/qwibitai/nanoclaw/main/README.md)).

2. **STRUCTURAL — Row 26 Zepto Stack re-quote requirement is not closed.** §10 says the stack is a "modular local-first system for running on-device AI agents," but the current v0.9.2 README text says "a modular system for running AI agents in production"; the "local-first/on-device" phrasing should be removed or re-sourced. The lineup should quote the README table/diagram directly ([source](https://docs.rs/crate/zeptoclaw/latest/source/README.md)).

3. **STRUCTURAL — Honcho prose is mostly right; Fig 5 is not.** §15 correctly says aggregate `all` and `termux` include `hermes-agent[honcho]`, but Fig 5's visible SVG text says "opt-in via Hermes's `[honcho]` extra." That resurrects the closed Gate 0 wording bug. Hermes `pyproject.toml` confirms both aggregate extras include `[honcho]` ([source](https://raw.githubusercontent.com/NousResearch/hermes-agent/v2026.5.7/pyproject.toml)).

4. **STRUCTURAL — Fig 6 reintroduces the backend overclaim Gate 1 tried to close.** The caption disclaims per-backend semantics, but the SVG labels still assert "no isolation," "HPC container," "serverless edge," etc. Rows 33–34 only back the seven names and Daytona/Modal serverless persistence ([Hermes README](https://raw.githubusercontent.com/NousResearch/hermes-agent/v2026.5.7/README.md)).

5. **STRUCTURAL — Surface-dial placement is internally unstable.** OpenClaw and Hermes are both described as multi-channel through a gateway, but the maps place them at "gateway," not "multi-channel." Either define "gateway" as the architectural bet even when channels exist, or move the markers; current OpenClaw README explicitly lists many supported channels ([source](https://raw.githubusercontent.com/openclaw/openclaw/main/README.md)).

6. **STRUCTURAL — Two broad ecosystem claims lack matrix support.** "Hermes is the framework most engineers are actually evaluating against OpenClaw in 2026" and "Most agent products run as one monolithic process per user" are not sourced like load-bearing claims. Weaken to observed comparison framing, or add primary/traceable evidence.

7. **COSMETIC — §14's SQLite inference needs a footnote.** The prose admits Hermes says FTS5 but not SQLite; that inference is reasonable, but the notes explicitly say to footnote it. Add an official SQLite FTS5 citation or soften to "FTS5, SQLite's FTS module."
```

## Vic's decisions on Phase 6.5 scope (2026-05-09)

- **Figure scope:** all 6 candidates (codex's 3 STRUCTURAL adds plus 3 stretch adds I floated). 7 → 13 figures total.
- **Sequencing:** Pass A (accuracy fixes, 8 commits) → Pass B (narrative fixes, 5 commits) → Pass C (figure additions, 6 commits + 1 renumbering commit).
- **Surface-dial inconsistency fix:** define "gateway" rung as the architectural bet (one always-on routing surface for sessions/channels/tools), separate from "multi-channel assistant" (where channel breadth itself IS the architecture). Update §1 prose; OpenClaw + Hermes stay at gateway. Minimal map changes.

## Pass A — Accuracy fixes (8)

A1. §1 surface-dial definition update (gateway rung = architectural bet, not just "fewer channels").
A2. §1 weaken "framework most engineers are actually evaluating" (unsourced ecosystem claim).
A3. §6 weaken "Most agent products run as one monolithic process per user" (unsourced ecosystem claim).
A4. §10 NanoClaw — re-fetch primary, drop paraphrase, quote verbatim per row 19.
A5. §10 Zepto Stack — re-fetch primary, fix "local-first / on-device" drift, quote lineup verbatim per row 26.
A6. §14 SQLite FTS5 footnote (codex finding 7).
A7. Fig 5 SVG annotation — replace "opt-in via Hermes's `[honcho]` extra" with row-31-faithful wording.
A8. Fig 6 SVG — strip the 7 per-backend subtitles; keep names + Daytona/Modal bracket only.

## Pass B — Narrative fixes (5)

B1. §6 open — restart from "v3 needed reach"; relocate Hand Tools callback later.
B2. §11 → §12 bridge — sharper handoff: routing-coherence vs behavior-mutation.
B3. §17 rewrite — drop "gateway-with-skills" non-rung; replace with three-dial side-by-side against §11.
B4. §6 + §12 light v4-rollout callbacks (so §17's payoff isn't cold).
B5. §16 first sentence — frame backends as "the substrates skills/recall/subagents run on."

## Pass C — Figure additions (6 new + renumbering)

C0 (renumbering). 7 → 13 figures; all in-prose figure references update.
C1. NEW Fig 1 §4 adaptation rungs anchor (small dial-rung visual: stateless / persistent memory / skill creation).
C2. NEW Fig 4 §7 layered concept stack (workspace / session / sandbox decomposition).
C3. NEW Fig 7 §10 Zepto Stack contrast inset.
C4. NEW Fig 9 §14 FTS5 retrieval pipeline.
C5. NEW Fig 10 §15 Honcho install-path / licensing strip.
C6. NEW Fig 12 §16 subagent isolation pair (delegate_task vs hermes -w).

Final figure numbering after Pass C:
- Fig 1 (NEW) AdaptationRungs §4
- Fig 2 (was 1) ThreeDialMap §5
- Fig 3 (was 2) OpenClawArchitecture §6
- Fig 4 (NEW) WorkspaceSessionSandboxStack §7
- Fig 5 (was 3) OpenClawSandboxTiers §8
- Fig 6 (was 4) ClawFamilyOnDials §10
- Fig 7 (NEW) ZeptoStackContrast §10
- Fig 8 (was 5) HermesClosedLoop §12
- Fig 9 (NEW) FTS5RecallPipeline §14
- Fig 10 (NEW) HonchoInstallPaths §15
- Fig 11 (was 6) HermesTerminalBackends §16
- Fig 12 (NEW) SubagentIsolationPair §16
- Fig 13 (was 7) FinalDialMap §18
