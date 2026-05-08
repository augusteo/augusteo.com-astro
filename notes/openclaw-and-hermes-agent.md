# How OpenClaw and Hermes Agent work — and how the Claw lifespan family fills in between

*Working title; alts: "Lifespan, gateways, and learning loops" / "The architecture dials behind open-source agents".*

Slug: `openclaw-and-hermes-agent`. Phase 1 locked 2026-05-08 (v2 — three-dial framing after pre-lock codex consult). Topic-evolution class: actively-evolving (12-month source bar, every claim pinned to commit hash / release tag / dated doc snapshot).

## Spec

**What / who / walk-away.** A long-form architecture explainer for engineers using or evaluating open-source agent frameworks. Maps the design space along three architectural dials — lifespan, surface / control plane, and adaptation — and places OpenClaw, Hermes Agent, and the Claw family variants on that map. By the end the reader can explain *why* these frameworks differ along each dial; tool choice falls out as a byproduct.

**The architectural fault line that organizes the post.** OpenClaw asks: how do you make an always-available assistant *reachable across real-world channels*? Hermes asks: how do you make one *improve from its own task history*? Those are different questions, not opposite endpoints of one continuum.

**The three dials.**
1. **Lifespan.** one-shot → session → daemon/continuous → scheduled/event-driven.
2. **Surface / control plane.** CLI / API → gateway → multi-channel assistant.
3. **Adaptation.** stateless → persistent memory → skill creation / self-improvement.

**Topic-evolution class.** Actively-evolving, 12-month source bar. Reinforced sourcing rule: every load-bearing claim pins to a specific commit hash, release tag, or dated doc snapshot. Hermes's release cadence (v0.13.0 May 7 2026, weekly-ish) makes Phase 7 freshness re-check non-optional.

**Target length.** ~35 min.

**Top starter sources** (≥3 viable, bar met; full primary-source list populated in Phase 2):
1. `github.com/openclaw/openclaw` — README + AGENTS.md + skills/coding-agent/SKILL.md
2. `docs.openclaw.ai` — official OpenClaw docs
3. `github.com/nousresearch/hermes-agent` — README at v0.13.0 release tag (May 7 2026, "Tenacity Release")
4. `hermes-agent.nousresearch.com` — official Hermes site
5. `github.com/qwibitai/nanoclaw`
6. `github.com/sipeed/picoclaw` (Go rebuild) **and** `github.com/breakcafe/picoclaw` (serverless fork) — Phase 2 disambiguates which is canonical or whether both are covered
7. `peterwoods.online/blog/the-claw-ai-agent-family` — **secondary only**; never load-bearing for role-assignment claims
8. NVIDIA Nemotron Labs / NemoClaw blog — governance and foundation context
9. ZeptoClaw and ZeroClaw primary sources — Phase 2 finds them or the spec drops them from named coverage

**Open questions deferred to Phase 2.**
- Two `picoclaw` repos — pick canonical or cover both.
- ZeroClaw / ZeptoClaw — find primary repos/docs or downgrade to passing mention. Codex flagged that ZeptoClaw's *own* site describes a multi-feature personal AI assistant, contradicting the "stateless function" role-assignment from peterwoods.online.
- IronClaw / TinyClaw / Nanobot / Moltis — out of scope unless surfacing as load-bearing.

**Cross-references to existing augusteo.com posts.** Phase 2 step 8 scans `src/content/blog/` for topic-adjacent posts. None pre-identified; the existing corpus is ML-systems / vision-stack heavy. Closest framing-pattern match is the multi-architecture / "different shapes, one mental model" pattern in the vision-stack posts.

## Throughline

**Three architectural dials, not one ladder.** (Locked v2 after codex consult flagged that single-axis lifespan collapses because Hermes's distinctive bet is *learning loop* and OpenClaw's distinctive bet is *gateway/control-plane* — they are not endpoints of one continuum.)

**Per-act shape.**

- **Act 1 — The three dials.** Introduce lifespan, surface/control-plane, adaptation. For each dial: a concrete failure case from a degenerate position to motivate the axis. Reader walks out of Act 1 with a 2D-or-3D mental map and the question "where does each tool sit?"
- **Act 2 — OpenClaw and the gateway problem.** Deep-dive OpenClaw's control-plane architecture: channels, sessions, workspaces, tool routing, sandbox tiers (host vs Docker / SSH / OpenShell). Place Nano / Pico / Zepto / Zero variants here as **footprint and portability tradeoffs around the same control-plane axis** — not lifespan rungs. Honest hedge: the family taxonomy Peter Woods proposes is one editorial cut among several; we use it only as secondary framing.
- **Act 3 — Hermes Agent and the learning-loop problem.** Deep-dive Hermes's closed loop: skill creation from experience, mid-use skill refinement, FTS5 cross-session recall, Honcho-based dialectic user model, the seven terminal backends. Frame as a *different question* than OpenClaw, not a "rung above."
- **Closing — The matrix.** Re-show the three-dial map with all frameworks placed; reader overlays their own use case and tool choice falls out.

**Throughline rhythm.** Each act lands by re-pointing at the dial map and saying "here's where this architecture sits, and here's the dial this architecture was designed around." That callback rhythm is what threads the three acts.

**Alternate (fallback per `research-protocol.md`):** same-task walkthrough across N agents. Used only if Phase 2 discovers the three-dial framing can't be primary-sourced cleanly.

## Research notes

*Populates in Phase 2.*

## Claim-source matrix

*Populates in Phase 2 — every load-bearing claim gets a row with quoted source, source ID (arxiv / URL / commit + date), and recency status against the 12-month bar.*

## Related posts on augusteo.com

*Populates in Phase 2 step 8 (corpus scan over `src/content/blog/`).*

## Outline

*Populates in Phase 3.*

## Codex research review

*Populates after Gate 0 fires (end of Phase 2).*

## Codex outline review

*Populates after Gate 1 fires (end of Phase 3).*

## Codex final review

*Populates after Gate 2 fires (Phase 7).*

## Resume here

Last touched: 2026-05-08.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check | pending | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com` |
| 3. Outline + figure list | pending | `## Outline` |
| 4. Draft prose | pending | `src/content/blog/openclaw-and-hermes-agent/index.mdx` |
| 5. Implement figures | pending | per-figure table below |
| 6. Playwright review | pending | playwright snapshots reviewed |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-08 | Spec consult (pre-Phase-1-lock) | structural fixes applied — single-axis lifespan ladder rejected, three-dial framing locked | section `## Codex spec consult` below |

### Phase 5 figure progress

| # | Figure | Type | Status | Commit |
|---|---|---|---|---|
| 1 | DialMapOpener (lifespan × adaptation, gateway as tint) | static-svg | pending | — |
| 2 | LifespanDial (one-shot → session → continuous → scheduled) | static-svg | pending | — |
| 3 | ControlPlaneDial (CLI → gateway → multi-channel) | static-svg | pending | — |
| 4 | AdaptationDial (stateless → memory → self-improvement) | static-svg | pending | — |
| 5 | OpenClawArchitecture (gateway → channels → sessions → tools/sandbox) | static-svg | pending | — |
| 6 | OpenClawSandboxTiers (host vs Docker/SSH/OpenShell) | static-svg | pending | — |
| 7 | HermesLoop (task → skill creation → refinement → user model → FTS5 recall) | static-svg | pending | — |
| 8 | HermesBackendLattice (7 terminal backends, cost/capability) | static-svg | pending | — |
| 9 | DialMapClosing (all frameworks placed) | static-svg | pending | — |
| 10 | DialMapInteractive (click-to-expand each framework's architecture) | interactive-canvas (Phase 3 four-clause check) | pending | — |

Figure list is locked at Phase 3, not now. The above is the Phase 1 sketch — Phase 3 may add, drop, or relabel.

### Suggested next batch

1. Phase 2 step 1 — re-read `research-protocol.md` for the primary-source decision tree, per-claim recency rule, search strategy.
2. Phase 2 step 2 — decompose into 2-3 sub-topics. Likely cut: (a) OpenClaw control-plane architecture (channels, sessions, sandbox, tool routing); (b) Hermes self-improvement loop (skills, FTS5, Honcho, terminal backends); (c) Claw family — primary-source verification of NanoClaw / PicoClaw / ZeroClaw / ZeptoClaw role assignments and footprint/runtime claims.
3. Phase 2 step 3 — dispatch parallel subagents (`superpowers:dispatching-parallel-agents`). Inline the primary-source decision tree verbatim from `research-protocol.md` into each subagent's prompt.
4. Phase 2 step 8 — scan `src/content/blog/` for topic-adjacent posts; record anchor points under `## Related posts on augusteo.com`.
5. Run Gate 0 once research notes + claim-source matrix are populated.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing (this file was written under v2 so should be canonical).
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/openclaw-and-hermes-agent/index.mdx` for remaining placeholders (file does not exist yet — Phase 4 creates it).
5. Pick the next batch above; implement, voice-check, commit, update this tracker.

### Hard rules to keep applying

1. Every load-bearing claim has a row in `## Claim-source matrix` with a quoted primary source and recency status that passes the topic-evolution bar (12 months for actively-evolving). Phase 7 re-checks freshness.
2. Intuition-first, never at the cost of a wrong mental model. Density is fine.
3. `scripts/voice-check.sh` exits clean before any commit. Em dashes: zero in prose. Banned words: justify or rewrite.
4. Three codex gates are mandatory: Gate 0 (research + matrix), Gate 1 (outline), Gate 2 (final). All auto-triggered.
5. Static-svg is the figure default for new figures. Interactive requires one of the four override clauses.
6. Per-figure type is locked at Phase 3, unlock only via Gate 1 STRUCTURAL finding + Vic approval.
7. One section per commit, one figure per commit, one migration per commit.
8. Sentence-case headings. Em-dashes (U+2014) forbidden in prose; permitted in act-divider headings (`## Act 1 — The Lens`). En-dashes (U+2013) allowed everywhere.
9. `draft: true` from creation through ship; Vic flips to `draft: false` explicitly. The skill never auto-flips.
10. Project-memory pointer + MEMORY.md entry are required and verified at end of Phase 1.
11. Blog is interconnected; newer posts link to older relevant posts. Phase 2 step 8 scans the corpus.

## Codex spec consult (pre-Phase-1-lock, 2026-05-08)

Verbatim output from `codex consult` invoked at end of Phase 1, before locking. Findings drove the v1 → v2 spec revision (lifespan-ladder rejected, three-dial framing adopted).

```
**Bottom Line**

The spec is not good as-is. The topic is strong, but the current ladder is carrying more than the sources seem able to support. The biggest risk is that "lifespan dial" collapses because several named rungs do not appear to map cleanly to lifespan, and Hermes/OpenClaw are not simply opposite endpoints of one continuum.

I would keep the post, but reframe Phase 1 before locking.

**1. Throughline Coherence**

The lifespan dial works as a useful entry metaphor, but not as the whole architecture.

Hermes breaks the single-axis model. Its distinctive claim is not just "longer-lived"; its README frames it around a "built-in learning loop," skill creation from experience, self-improving skills, cross-session recall, and user modeling. That is an adaptation/learning axis, not merely lifespan. OpenClaw also is not just "one rung above Nano." Its own docs frame it as a self-hosted assistant and multi-channel gateway/control plane for agents, with sessions, channel routing, workspaces, and skills. That makes it more of an orchestration/surface layer than a lifespan rung.

Concrete fix: replace the ladder with a two- or three-axis model:

- **Lifespan:** one-shot → session → daemon/continuous → scheduled/event-driven
- **Surface/control plane:** CLI/API → gateway → multi-channel assistant
- **Adaptation:** stateless → persistent memory → skill creation/self-improvement

Then place each framework in that space. You can still use "lifespan" as Act 1, but not as the master scaffold for the whole essay.

**2. Audience / Scope Pull**

"Pick the right tool" and "understand the design space" are in tension. For a 35-minute explainer, the design-space goal should win.

If you optimize for tool-picking, the piece becomes a buyer's guide and will age badly. If you optimize for architecture, the reader can still pick a tool, but the recommendation becomes a byproduct of understanding the axes.

Concrete fix: make the walk-away:

> By the end, the reader can explain why agent frameworks differ: lifespan, control surface, memory, autonomy, and learning loop. Tool choice falls out of those tradeoffs.

Then include a short "selection matrix" near the end, not as the spine.

**3. Source Quality**

This is the highest-risk part. If the only source that arranges Zepto → Zero → Pico → Nano into a clean "family ladder" is a personal blog, the ladder should not be treated as primary-source truth.

Also, the initial role assignments look shaky. ZeptoClaw's own site describes it as an ultra-lightweight personal AI assistant with providers, channels, swarms, tools, plugins, batch mode, and container isolation, not merely a stateless function. ZeroClaw sources likewise describe an autonomous runtime/daemon/gateway, not obviously "per-task lifespan." That means the proposed rung labels may be editorial compression rather than sourced architecture.

Concrete fix:

- Treat "Claw family" as an ecosystem label, not a canonical taxonomy, unless Phase 2 finds primary sources for each rung.
- Do not publish Zepto/Zero/Pico/Nano as a strict ordered family unless each has a primary repo/doc supporting its claimed role.
- If ZeroClaw/ZeptoClaw repos or docs exist but do not match the ladder, let the ladder change rather than forcing the sources into it.
- Use the Peter Woods taxonomy only as "a useful secondary framing," never as the basis for load-bearing claims.

**4. Premise Check**

The premise "OpenClaw + Hermes are opposing architectures, with the Claw family filling the middle" is probably wrong.

A better comparison is:

- **OpenClaw:** assistant/gateway/session/control-plane architecture.
- **Nano/Zero/Pico/Zepto variants:** smaller or differently scoped implementations/reimplementations around footprint, runtime, security, portability, and simplicity.
- **Hermes:** continuous agent with gateway features plus an explicit learning/self-improvement loop.

Hermes seems more comparable to "continuous autonomous assistant with memory and gateway" systems than to OpenClaw as an opposite pole. The real contrast is likely:

> OpenClaw asks: how do you make an always-available assistant reachable through real-world channels?
> Hermes asks: how do you make an always-available assistant improve from its own task history?

That is a much stronger architectural fault line.

**5. Other Structural Risks**

The title is too entity-heavy. "How OpenClaw and Hermes Agent work — and how the Claw lifespan family fills in between" assumes the reader already accepts the taxonomy. I would not lead with that.

Better title direction:

> The Architecture Dials Behind Open-Source Agents
> or
> Lifespan, Memory, and Gateways: A Field Guide to Open-Source Agents

The "actively-evolving 12-month source bar" is right, but I would make it stricter: pin every claim to a commit, release tag, or dated doc snapshot. For Hermes especially, the release cadence appears fast enough that "current" claims can go stale between draft and publish.

The figure plan should change with the structure. A single lifespan slider may accidentally encode the flawed ladder. Use a 2D/3D matrix instead: lifespan on one axis, learning/adaptation on another, with gateway/control-plane as color or layer. The interactive can still be simple, but it should teach the actual model.

**Recommended Phase 1 Lock**

I would lock this revised thesis instead:

> Open-source agent frameworks are not arranged on one ladder. They vary along three architectural dials: how long the agent lives, where users reach it, and whether it learns from prior work. OpenClaw is best understood as a gateway-centered assistant/control plane; Hermes as a continuous assistant with an explicit learning loop; the Claw-family variants explore footprint, runtime, portability, and scope tradeoffs around that design space.

That throughline can survive Phase 4. The current Zepto → Zero → Pico → Nano → OpenClaw → Hermes ladder probably cannot without heavy hedging.

Sources checked: OpenClaw README/docs on GitHub and docs pages, Hermes Agent README/release materials, ZeptoClaw docs/site, ZeroClaw site/search results, NVIDIA NemoClaw docs/newsroom references.
```
