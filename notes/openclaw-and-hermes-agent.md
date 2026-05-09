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

**Act 1 failure-case sourcing (annotation per Gate 0 Run 1 finding 6).** Each dial in Act 1 gets a "concrete failure case from a degenerate position" to motivate the axis. These failure cases are **author-constructed pedagogical examples** (toy-but-realistic per `research-protocol.md`'s throughline ladder rung 3) — illustrations, not primary-sourced operational incidents about specific systems. They do not earn matrix rows because they are not load-bearing primary-source claims; they are mechanism-illustration scaffolding. Prose will frame them as such ("imagine an agent that…", "consider what happens when…") rather than asserting them as documented incidents.

**Alternate (fallback per `research-protocol.md`):** same-task walkthrough across N agents. Used only if Phase 2 discovers the three-dial framing can't be primary-sourced cleanly.

## Research notes

Phase 2 deliverable, 2026-05-08. Three parallel general-purpose research subagents dispatched per `superpowers:dispatching-parallel-agents`. Each was given the primary-source decision tree from `research-protocol.md` inlined verbatim plus a list of specific claims to verify, refute, or flag UNSUPPORTED. The three sub-topics: (a) OpenClaw architecture / security / history; (b) Hermes Agent self-improvement loop and architecture; (c) Claw family primary-source verification (the highest-risk sub-topic per the pre-Phase-1-lock codex flag).

### Sub-topic A — OpenClaw: control-plane architecture, security model, project history

**Self-framing.** The README opens with "**OpenClaw** is a *personal AI assistant* you run on your own devices. It answers you on the channels you already use." Highlights section: "**Local-first Gateway** — single control plane for sessions, channels, tools, and events." (`https://github.com/openclaw/openclaw/blob/91ed160/README.md` at commit 91ed1604, 2026-05-07.)

The architecture docs reinforce: "A single long-lived Gateway owns all messaging surfaces … exposes a typed WS API (requests, responses, server-push events)" and "emits events like `agent`, `chat`, `presence`, `health`, `heartbeat`, `cron`." Gateway docs: "One always-on process for routing, control plane, and channel connections." (`https://docs.openclaw.ai/gateway` accessed 2026-05-08.)

**Multi-agent routing.** README highlights: "**Multi-agent routing** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." Configuration docs show concrete routing rules — e.g., separate `home` and `work` agents bound to distinct workspaces (`~/.openclaw/workspace-home`, `~/.openclaw/workspace-work`) by channel + accountId. (`https://docs.openclaw.ai/gateway/configuration`.)

**Security model.** README "Security model" section verbatim:

> "Default: tools run on the host for the `main` session, so the agent has full access when it is just you. Group/channel safety: set `agents.defaults.sandbox.mode: \"non-main\"` to run non-`main` sessions inside sandboxes. Docker is the default sandbox backend; SSH and OpenShell backends are also available. Typical sandbox default: allow `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`."

(`https://github.com/openclaw/openclaw/blob/91ed160/README.md` and `https://docs.openclaw.ai/gateway/sandboxing`.)

**Three layered concepts.** Workspaces are per-agent filesystem roots (configurable, default `~/.openclaw/workspace`); sessions are conversation contexts routed by origin (DM, group, cron); sandboxes are optional execution-isolation backends (Docker / SSH / OpenShell) wrapping non-`main` sessions with three workspace-access modes (`none` = isolated workspace under `~/.openclaw/sandboxes`, `ro` = mount workspace read-only at `/agent`, `rw` = read-write at `/workspace`). Session transcripts persist as JSONL at `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`. (`https://docs.openclaw.ai/concepts/agent` and `https://docs.openclaw.ai/concepts/session` accessed 2026-05-08.)

**Release cadence.** README "Development channels" section: stable = tagged `vYYYY.M.D` or `vYYYY.M.D-<patch>` (npm dist-tag `latest`); beta = `vYYYY.M.D-beta.N` (npm dist-tag `beta`); dev = moving head of `main`. The date-based scheme began with `v2026.1.5` on 2026-01-05. **Latest stable at research time: `v2026.5.7` (2026-05-07).**

**Project naming history.** VISION.md in the repo states: "OpenClaw started as a personal playground to learn AI and build something genuinely useful... It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw." The git history adds one stage VISION.md collapses for brevity:

| Stage | Renamed to | Date | First release evidence |
|---|---|---|---|
| 1 | Warelay | 2025-11-24 | Repo init commit; `warelay 0.1.1` published 2025-11-25 |
| 2 | Clawdis | ~2025-12-19 | `clawdis 2.0.0-beta1` published 2025-12-19 |
| 3 | Clawdbot | 2026-01-04 | commit 246adaa1 "chore: rename project to clawdbot"; `clawdbot 2026.1.5` published 2026-01-05 |
| 4 | Moltbot | late 2026-01 | internal rename; visible in commit history |
| 5 | OpenClaw | ~2026-01-29 | `openclaw 2026.1.29` published 2026-01-30 |

(Sources: `https://github.com/openclaw/openclaw/blob/main/VISION.md`, the repo's git log via `gh api repos/openclaw/openclaw/commits`, and the GitHub releases list.)

**Author / nationality.** Peter Steinberger, well-known in the iOS dev community as Austrian. README does not directly state nationality; cross-confirmed via Euronews and steipete.me.

**OpenAI / foundation announcement.** Steinberger's first-party blog post (`https://steipete.me/posts/2026/openclaw`, 2026-02-14): "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." The post is **forward-looking**; as of 2026-05-08, no GOVERNANCE.md or FOUNDATION.md exists in the repo, and CONTRIBUTING.md still names Steinberger as "Benevolent Dictator." OpenAI does appear in the README sponsor table (alongside GitHub, NVIDIA, Vercel, Blacksmith, Convex). **Therefore the foundation is announced-as-forthcoming, not formally established.**

**Star count milestone.** Star History blog post (**third-party analysis, NOT primary** — Star History is run by Bytebase, not by OpenClaw / Steinberger; the date snapshot AND the "non-aggregator software project" ranking framing both originate at Star History; per Gate 0 Run 1 + Run 2 findings, this can be quoted as third-party analysis but cannot back a primary star-ranking claim): `https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software/` (2026-03-01) — "OpenClaw has now crossed 250K+ stars, overtaking React to become the most-starred non-aggregator software project on GitHub." If prose uses the comparison, it must attribute to Star History as analysis. The qualifier "non-aggregator software project" comes from Star History's methodology — GitHub's overall most-starred repos include awesome-list aggregators in the millions (freeCodeCamp, EbookFoundation/free-programming-books, sindresorhus/awesome). **Primary fact for stars is the gh API live count: `gh api repos/openclaw/openclaw` on 2026-05-08 returns 369,860.**

### Sub-topic B — Hermes Agent: closed learning loop, tool model, terminal backends

**Version pinning.** Marketing label "v0.13.0" maps to git tag `v2026.5.7` ("The Tenacity Release," published 2026-05-07T16:23:08Z). Date-based tags are uncommon enough to warrant explicit footnoting if the post quotes the SemVer label. Pinned source: `https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md`. (Repo case is `NousResearch/hermes-agent`, not `nousresearch/hermes-agent`.)

**Closed learning loop.** README at v2026.5.7 verbatim:

> "**A closed learning loop** — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall."

Body framing later in the README: "it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening **model of who you are** across sessions." Note: README phrasing is "**closed**" learning loop and "model of who you are," not the briefing's "built-in" / "user model" wording.

**FTS5.** README states "FTS5 session search with LLM summarization." FTS5 is SQLite's full-text-search v5 module — that is an inference from the name (FTS5 is a well-known SQLite feature) but the README does not explicitly say "SQLite." If the prose names SQLite, footnote the inference.

**Honcho.** Hermes README: "Honcho dialectic user modeling." Honcho is a real external library by **Plastic Labs** (not Nous Research): `https://github.com/plastic-labs/honcho`, license **AGPL-3.0**, version 3.0.6 (last pushed 2026-05-07). Honcho's own README: "Honcho is an open source memory library with a managed service for building stateful agents. Use it with any model, framework, or architecture." Honcho exposes a "Dialectic API" — endpoint `/peers/{peer_id}/chat` — designed to function as "an oracle to the Peer" for personalization. **Licensing nuance (per Gate 0 Run 1 + Run 2 + Run 3 fixes):** Hermes is MIT, and Honcho is AGPL-3.0. **Honcho is not a core dependency**; it is packaged as the optional `honcho` extra in Hermes's `pyproject.toml` under `[project.optional-dependencies]` (`honcho = ["honcho-ai>=2.0.1,<3"]`). However, **aggregate extras such as `all` and `termux` include `hermes-agent[honcho]`** — so any install path that pulls those aggregate extras will bring AGPL-3.0 Honcho along without a separate Honcho-specific opt-in (per Gate 0 Run 3 finding). Worth a footnote if the post discusses dialectic user modeling. Prose must say "Honcho ships as an optional extra; aggregate `all`/`termux` extras include it," NOT "Hermes depends on AGPL-3.0 Honcho" and NOT "users must explicitly opt in to Honcho."

**40+ tools.** README feature list: "40+ tools, toolset system, terminal backends." The official docs at `/docs/user-guide/features/tools` enumerate **8 toolset categories** (Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations) but do not list 40+ individual tools. Treat the "40+" as the README's own marketing-flavored summary, not an audited count.

**Seven terminal backends.** README at v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Docs corroborate persistence semantics: "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." Surface inconsistency: marketing landing page (`hermes-agent.nousresearch.com/`) still says **5** backends; docs index says **6**; README says **7**. **README is authoritative.** Vercel Sandbox is the most recently added; if the prose leans on backend evolution, walk CHANGELOG.md for the exact "Vercel Sandbox added in v…" commit.

**Subagents.** README: "Spawn isolated subagents for parallel workstreams." Two distinct mechanisms exist in the codebase: (1) process / context isolation via the `delegate_task` tool (within the Docker backend); (2) filesystem isolation via git worktrees (`hermes -w` launches isolated agent sessions in worktrees, added in release `v2026.3.12`).

**Python RPC scripting.** README: "Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns." The phrase "zero-context-cost" is the README's own framing — no docs page fully specifies the transport / protocol. If the prose treats it as load-bearing, walk the source code.

**agentskills.io.** Hermes README: "Compatible with the agentskills.io open standard." agentskills.io is a real published format. The lineage statement — "**The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products**" — appears on the **agentskills.io overview/home page** (`https://agentskills.io/`), NOT on the spec page (`https://agentskills.io/specification`, which describes the file format itself). Per Gate 0 Run 2, the previous research-notes count of "30+ products" is unsupported in the published spec or clients page; **drop the count from prose**. Adopters mentioned across various agentskills.io collateral include Claude Code, Cursor, GitHub Copilot, Goose, OpenHands, Letta, Roo Code, but a specific enumerated count is not primary-backed. **Implication for the post:** Hermes's `agentskills.io` compatibility is broad-industry table stakes, not a Hermes-specific moat.

**License + author + launch.** Hermes is MIT-licensed (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`), built by Nous Research. Repo `created_at` per gh API: 2025-07-22T22:22:28Z (private dev period). **First public release: tag `v2026.3.12` (v0.2.0) published 2026-03-12** — release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." A Nous Research X post is reported to date 2026-02-25 (announcement); could not be directly fetched (X returned HTTP 402). **Defensible single date: "first public tagged release on 2026-03-12 (v0.2.0)."**

**Install.** README Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`. Docs add: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." **Platforms in v0.13.0 (tag v2026.5.7, 2026-05-07): Linux / macOS / WSL2 / Android via Termux.** Per Gate 0 Run 1 + Run 2 fixes: native Windows is **NOT** in v0.13.0 — the v2026.5.7 README directs Windows users to WSL2. A native-Windows installer commit (`b7fe7ed7bd1740b01315c4bd15b254aa738124e5`, "feat(windows-install): bundle portable MinGit instead of relying on winget") landed **post-release** on 2026-05-08 and is not yet in any tagged release. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, awaiting next tagged release," not "added in v0.13.0."

**Star count.** Live via `gh api repos/NousResearch/hermes-agent` on 2026-05-08: **139,109**. Third-party blogs cite "110K stars in 10 weeks" (no primary source) and "95.6K in April" — neither has primary backing. If the post cites a star number, pin to today + access date.

**OpenClaw migration.** First-party migration tooling exists: `hermes claw migrate` imports OpenClaw / legacy `~/.clawdbot/` / `~/.moltbot/` setups. Existence of the tooling is solid evidence Nous expected migration traffic; "wave" as a quantitative claim originates in third-party blogs and has no primary backing. Soften any "migration wave" framing to "Hermes ships first-party migration tooling for OpenClaw users."

**v0.13.0 release scale.** Release notes: 864 commits, 588 merged PRs, 282 issues closed (13 P0, 36 P1), 295 community contributors. Citable for "active development" framing.

### Sub-topic C — Claw family: primary-source verification of the peterwoods.online taxonomy

**Headline finding.** The peterwoods.online "Claw family" taxonomy (`https://peterwoods.online/blog/the-claw-ai-agent-family`, 2026-02-19) is **substantially contradicted by the projects' own primary sources on 3 of 4 role-assignments**. The taxonomy retroactively groups four independently-authored OpenClaw alternatives along an "autonomy spectrum" the projects themselves never adopt — and in the most flagrant case (ZeptoClaw), the project's own README says nearly the opposite of what the taxonomy claims.

**NanoClaw — `github.com/qwibitai/nanoclaw`.** README:

> "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs."
>
> "Agents run in containers...they can only see what's explicitly mounted."
>
> "One process, a few source files and no microservices."

NanoClaw uses per-session databases (`inbound.db`, `outbound.db`) and "recurring jobs that run Claude and can message you back" — a session-plus-cron model, not "continuous lifespan." The word "autonomous" does not appear in the README's self-description. NanoClaw's framing is **container isolation + minimalism**, explicitly positioned against OpenClaw's "nearly half a million lines of code, 53 config files, and 70+ dependencies." **peterwoods.online's "autonomous worker / continuous lifespan / high agency" framing → CONTRADICTED.**

**PicoClaw disambiguation.** Two repos share the name; they are **distinct projects** that happen to collide on naming.

- **`github.com/sipeed/picoclaw` v0.2.8 (2026-04-30) — canonical** (peterwoods links to this). README: "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot... An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project." Targets "$10 hardware with <10MB RAM" with "<1s" boot times on 0.6GHz single-core processors. RISC-V / ARM / MIPS / x86 via single Go binary. Supports 16+ chat platforms (always-on multi-channel).
- **`github.com/breakcafe/picoclaw` v1.2.23 — name-collision fork.** README: "Fork of NanoClaw — replaces the always-on multi-channel orchestrator with a single-container, per-request execution model designed for AWS Lambda, Alibaba Cloud FC, and similar platforms."

**peterwoods.online's "PicoClaw = session-scoped persistent assistant for interactive tasks/coding/exploration" → PARTIALLY-ACCURATE.** "Personal assistant" matches sipeed's framing. "Session-scoped / interactive coding" doesn't — sipeed's emphasis is overwhelmingly hardware portability + always-on multi-channel.

**ZeroClaw — `github.com/zeroclaw-labs/zeroclaw`.** v0.7.5 released 2026-05-08 (day-of investigation). Repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." Deploys as systemd / launchctl / Windows Service — i.e., continuous always-on. **peterwoods.online's "structured task runner / per-task lifespan / low autonomy" framing → CONTRADICTED.**

**ZeptoClaw — `github.com/qhkm/zeptoclaw`.** v0.9.2 released 2026-04-07. README:

> "Fast, small, secure, and local-first personal AI assistant infrastructure."
>
> "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in."

State explicitly maintained: "Workspace memory, long-term key-value store, conversation history." Agent swarms: "Delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." Plus plugins, multi-channel gateway, sandboxed autonomy, a single ~6MB binary. There is a batch mode ("process hundreds of prompts from text/JSONL files") — a feature, not the project's identity. **peterwoods.online's "stateless function operating on single actions / no autonomy / high-volume transformations" → DIRECTLY CONTRADICTED. This was the codex-flagged claim, and codex was right.**

**Family-coordination question.** **Not a coordinated family.** Distinct authors (qwibitai / sipeed / zeroclaw-labs / qhkm). Distinct languages (TypeScript / Go / Rust / Rust). Distinct inspirations (NanoClaw forks OpenClaw; PicoClaw inspired by NanoBot; ZeroClaw self-positions as standalone; ZeptoClaw is part of the **Zepto Stack** with ZeptoPM, ZeptoCapsule, ZeptoRT — a real coordinated sub-family, but intra-Zepto, not Claw). No cross-references between the four READMEs except in ZeptoClaw's COMPARISON.md (which explicitly contrasts against NanoClaw, PicoClaw, OpenClaw, NemoClaw — but **omits ZeroClaw entirely**). ZeroClaw's README warns: "other repositories claiming affiliation are unauthorized" — actively disclaiming "family" membership. The `machinae/awesome-claws` curated list catalogs ~34 `*Claw` projects with no taxonomy — evidence that the namespace is highly fragmented around a meme-style branding pattern, not a shared design lineage.

**Recommended editorial posture (per Sub-topic C subagent's recommendation, adopted):** Cite peterwoods.online once, as "the framing under test." Use each project's own README / homepage at a specific commit or release tag for every architectural claim. Make the contradiction itself part of the story — the post can use the Claw family as a case study in how third-party taxonomies fill the vacuum when an ecosystem shares a name pattern but no maintainership.

### Subagent transcripts

The full subagent JSONL transcripts are preserved in the runtime task output files (paths surfaced in the task notifications); the verbatim findings are condensed into the matrix below. If codex Gate 0 needs to re-trace a quote, the subagent ran the queries against the listed primary URLs.

## Claim-source matrix

Every load-bearing claim the post will make has one row mapping the claim to a quoted excerpt from a primary source. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row. Recency: actively-evolving (12-month bar). Today: 2026-05-08; bar cutoff: 2025-05-08.

| # | Claim (load-bearing assertion) | Quoted source (excerpt) | Source ID (URL + commit/tag + date) | Recency status |
|---|---|---|---|---|
| 1 | OpenClaw is "a personal AI assistant you run on your own devices" with the Gateway as a control plane | "**OpenClaw** is a *personal AI assistant* you run on your own devices… The Gateway is just the control plane — the product is the assistant." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
| 2 | OpenClaw's Gateway is a "single control plane for sessions, channels, tools, and events" | "**Local-first Gateway** — single control plane for sessions, channels, tools, and events." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
| 3 | OpenClaw runs as an always-on user-service process (launchd / systemd) | "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."; gateway docs: "One always-on process for routing, control plane, and channel connections." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/gateway accessed 2026-05-08 | passes |
| 4 | Multi-agent routing: "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)" | "**Multi-agent routing** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07); docs.openclaw.ai/gateway/configuration accessed 2026-05-08 | passes |
| 5 | OpenClaw security: tools run on host for `main` session by default | "Default: tools run on the host for the `main` session, so the agent has full access when it is just you." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
| 6 | OpenClaw security: non-`main` sessions can sandbox via Docker / SSH / OpenShell | "set `agents.defaults.sandbox.mode: \"non-main\"` to run non-`main` sessions inside sandboxes. Docker is the default sandbox backend; SSH and OpenShell backends are also available." | github.com/openclaw/openclaw README @ 91ed160 — Security model section; docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
| 7 | OpenClaw sandbox typical defaults: allow `bash`, `process`, `read`, `write`, `edit`, session-management; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway` | "Typical sandbox default: allow `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
| 8 | OpenClaw release cadence: stable `vYYYY.M.D`, beta `vYYYY.M.D-beta.N`, dev = main HEAD | "**stable**: tagged releases (`vYYYY.M.D` or `vYYYY.M.D-<patch>`)… **beta**: prerelease tags (`vYYYY.M.D-beta.N`)… **dev**: moving head of `main`" | github.com/openclaw/openclaw README @ 91ed160 — Development channels section | passes |
| 9 | Latest stable OpenClaw release at research time: v2026.5.7 (2026-05-07) | gh API release tag `v2026.5.7` published_at 2026-05-07 | github.com/openclaw/openclaw/releases/tag/v2026.5.7 | passes |
| 10 | OpenClaw was first published on 2025-11-24 under the name **Warelay** (not Clawdbot — that's a later rename) | "OpenClaw started as a personal playground… It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw." Repo first-commit 2025-11-24T10:16:47Z; first release `warelay 0.1.1` published 2025-11-25T13:24:35Z. | github.com/openclaw/openclaw/blob/main/VISION.md (commit 11abe5e, 2026-04-24); gh API repos/openclaw/openclaw; releases/tag/v0.1.1 | passes |
| 11 | The full naming sequence is Warelay → Clawdis → Clawdbot → Moltbot → OpenClaw (VISION.md collapses Clawdis for brevity) | clawdis-stage release: `clawdis 2.0.0-beta1` published 2025-12-19. Clawdbot rename: commit 246adaa1 "chore: rename project to clawdbot" (2026-01-04). OpenClaw rename: `openclaw 2026.1.29` published 2026-01-30. | gh API repos/openclaw/openclaw releases + commits | passes |
| 12 | Project author: Peter Steinberger (Austrian developer, well-known in iOS dev community) | Steinberger's first-party blog (steipete.me) is the author profile; nationality cross-confirmed via Euronews. README does not state nationality; flag as inferred if prose names it. | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw author metadata | passes |
| 13 | 2026-02-14: Steinberger announced he was joining OpenAI; OpenClaw will move to a foundation (announced as forthcoming, not formally established) | "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of 2026-05-08, no GOVERNANCE.md / FOUNDATION.md in repo; CONTRIBUTING.md still names Steinberger "Benevolent Dictator." | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw repo state on 2026-05-08 | passes |
| 14 | OpenClaw exceeded 250K stars by ~2026-03-01 (per Star History blog, **secondary attribution** — Star History is a third-party analytics blog; the date snapshot AND the "most-starred non-aggregator software project" ranking framing both originate there, not in any first-party OpenClaw / Steinberger artifact). Prose must say "per Star History's analysis" if it uses the comparison. | "OpenClaw has now crossed 250K+ stars, overtaking React to become the most-starred non-aggregator software project on GitHub." (Star History — quoted as third-party analysis, not as primary fact) | star-history.com/blog/openclaw-surpasses-react-most-starred-software/ (2026-03-01) | **secondary-attribution-only** — Star History is third-party; can be quoted as analysis but cannot back a primary star-ranking claim. The primary fact for stars is gh API live count (row 15). |
| 15 | OpenClaw live star count on 2026-05-08 (publication-date snapshot): 369,860 | gh API `repos/openclaw/openclaw` field `stargazers_count: 369860` | api.github.com/repos/openclaw/openclaw accessed 2026-05-08 | passes |
| 16 | OpenClaw workspaces are per-agent filesystem roots (default `~/.openclaw/workspace`); sessions are conversation contexts; sandboxes are optional execution-isolation backends | "Workspace root: `~/.openclaw/workspace` (configurable via `agents.defaults.workspace`)." "OpenClaw organizes conversations into **sessions**. Each message is routed to a session based on where it came from -- DMs, group chats, cron jobs, etc." "a **single embedded agent runtime** - one agent process per Gateway, with its own workspace, bootstrap files, and session store." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/concepts/agent and /concepts/session accessed 2026-05-08 | passes |
| 17 | OpenClaw sandbox workspace-access modes: `none` (isolated workspace under `~/.openclaw/sandboxes`), `ro` (mount workspace read-only at `/agent`), `rw` (read-write at `/workspace`) | docs.openclaw.ai/gateway/sandboxing access-mode table: "**`none`** — sandbox gets an isolated workspace under `~/.openclaw/sandboxes/<sessionId>/workspace`; the agent's `~/.openclaw/workspace` is not mounted. **`ro`** — workspace mounted read-only at `/agent` inside the sandbox. **`rw`** — workspace mounted read-write at `/workspace`; tool-side writes propagate back to the host." | docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
| 18 | NanoClaw (qwibitai) self-frames as container-isolation + minimalism, not autonomy | "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." "Agents run in containers...they can only see what's explicitly mounted." "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes |
| 19 | NanoClaw operates on a session-plus-cron model (per-session DBs `inbound.db` / `outbound.db`; "recurring jobs that run Claude and can message you back") — NOT continuous-lifespan-with-high-agency. **Note:** the architectural-detail summary here (per-session DB names, cron-jobs phrasing) was the Phase 2 research subagent's paraphrase of the README architecture section; Phase 4 drafting MUST re-quote the actual README phrasing verbatim before any prose claim about NanoClaw architecture details lands in the post. The verbatim quotes confirmed in Phase 2 are: "An AI assistant that runs agents securely in their own containers"; "Agents run in containers...they can only see what's explicitly mounted"; "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes (with Phase-4 verbatim-re-quote requirement) |
| 20 | Two distinct projects use the name `picoclaw`: sipeed/picoclaw (canonical, Go, IoT-targeted) and breakcafe/picoclaw (declared fork of NanoClaw, AWS-Lambda serverless) | sipeed README: "An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project." breakcafe README: "Fork of NanoClaw — replaces the always-on multi-channel orchestrator with a single-container, per-request execution model designed for AWS Lambda…" | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/breakcafe/picoclaw README v1.2.23 accessed 2026-05-08 | passes |
| 21 | sipeed/PicoClaw self-frames around hardware portability (sub-$10 hardware, <10MB RAM, <1s boot, RISC-V/ARM/MIPS/x86) — not session-lifespan | sipeed README architecture and platform sections; "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot." Targets "$10 hardware with <10MB RAM" with "<1s" boot times on 0.6GHz single-core processors. | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30) | passes |
| 22 | ZeroClaw (zeroclaw-labs) v0.7.5 released 2026-05-08; single Rust binary; deploys as continuous always-on (systemd / launchctl / Windows Service); supervised-default autonomy — NOT per-task structured task runner | Repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." | github.com/zeroclaw-labs/zeroclaw README + repo description accessed 2026-05-08; release v0.7.5 published 2026-05-08 | passes |
| 23 | ZeptoClaw (qhkm) v0.9.2 released 2026-04-07; full personal-AI-assistant infrastructure (workspace memory, conversation history, agent swarms, plugins, multi-channel gateway, sandboxed autonomy) — NOT a stateless function | "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." "Delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes |
| 24a | peterwoods.online's NanoClaw role-assignment ("autonomous worker, continuous lifespan, high agency") is contradicted by NanoClaw's own README. peterwoods is the framing under test, NOT a primary source for any architectural claim about NanoClaw. | peterwoods.online (2026-02-19): NanoClaw "acts as an autonomous worker, possessing a continuous lifespan and high agency." qwibitai/nanoclaw README (2026-05-08): "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." Architecture is per-session DBs (`inbound.db`, `outbound.db`) plus cron jobs — session-plus-cron, not continuous-lifespan-with-high-agency. The word "autonomous" does not appear in the README's self-description. | peterwoods.online/blog/the-claw-ai-agent-family (2026-02-19, **secondary**); github.com/qwibitai/nanoclaw README accessed 2026-05-08 (primary) | passes — peterwoods explicitly secondary; primary contradiction is verbatim |
| 24b | peterwoods.online's PicoClaw role-assignment ("session-scoped persistent assistant for interactive coding/exploration") is partially-accurate against canonical sipeed/PicoClaw, which self-frames around hardware portability rather than session lifespan. | peterwoods.online: PicoClaw "functions as a persistent assistant" for "Interactive tasks, coding assistance, exploration." sipeed/picoclaw README v0.2.8 (2026-04-30): "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot... An independent open-source project initiated by Sipeed, written entirely in Go from scratch." Targets <$10 hardware, RISC-V/ARM/MIPS/x86, 16+ chat platforms (always-on multi-channel). | peterwoods.online (2026-02-19, secondary); github.com/sipeed/picoclaw v0.2.8 (primary) | passes — "personal assistant" framing matches; "session-scoped / interactive coding" framing is editorial overlay not present in primary |
| 24c | peterwoods.online's ZeroClaw role-assignment ("structured task runner, per-task lifespan, low autonomy") is contradicted by ZeroClaw's own README and repo description. | peterwoods.online: ZeroClaw "operates as a structured task runner" with "per task" lifespan and "low" autonomy, designed for "Reproducible pipelines, workflow automation." zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08) repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." Continuous always-on (systemd / launchctl / Windows Service). | peterwoods.online (2026-02-19, secondary); github.com/zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08, primary) | passes — direct contradiction |
| 24d | peterwoods.online's ZeptoClaw role-assignment ("stateless function operating on single actions, no autonomy") is **directly contradicted** by ZeptoClaw's own README. (codex-flagged at pre-Phase-1-lock; primary contradiction confirmed in Phase 2.) | peterwoods.online: ZeptoClaw "is 'closer to a stateless function call' with 'per action' lifespan and 'none' autonomy, serving 'High-volume transformations, deterministic actions.'" qhkm/zeptoclaw README v0.9.2 (2026-04-07): "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." | peterwoods.online (2026-02-19, secondary); github.com/qhkm/zeptoclaw v0.9.2 (primary) | passes — direct contradiction |
| 25 | The four Claw projects are NOT a coordinated family — distinct authors (qwibitai / sipeed / zeroclaw-labs / qhkm), distinct languages (TS / Go / Rust / Rust), no mutual cross-references in their READMEs | Direct quotes confirmed by Phase 2 subagent: ZeroClaw repo (`zeroclaw-labs/zeroclaw`) explicitly disclaims sibling-project membership: **"other repositories claiming affiliation are unauthorized"** (ZeroClaw README, accessed 2026-05-08). sipeed/picoclaw README: **"An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project."** ZeptoClaw COMPARISON.md contrasts against NanoClaw, PicoClaw, OpenClaw, NemoClaw — but **omits ZeroClaw entirely** (corroborates non-coordination). NanoClaw README cites only OpenClaw as predecessor; no mention of PicoClaw, ZeroClaw, ZeptoClaw. | github.com/qwibitai/nanoclaw README; github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/zeroclaw-labs/zeroclaw README v0.7.5 (2026-05-08); github.com/qhkm/zeptoclaw COMPARISON.md v0.9.2 (2026-04-07) | passes |
| 26 | ZeptoClaw is part of "Zepto Stack" (ZeptoPM orchestrator, ZeptoCapsule sandboxer, ZeptoRT durable runtime) — a real coordinated sub-family, separate from "Claw" | qhkm/zeptoclaw README explicitly identifies the Zepto Stack as a coordinated sub-family: ZeptoPM (orchestrator), ZeptoCapsule (sandboxer), ZeptoRT (durable runtime). **Note:** Phase 2 subagent identified the Zepto Stack as a real coordinated sub-family but did not capture a single verbatim README sentence enumerating the four members; Phase 4 drafting MUST re-quote the README's actual phrasing of the Zepto Stack lineup before any prose claim. | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes (with Phase-4 verbatim-re-quote requirement) |
| 27 | Hermes Agent v0.13.0 (git tag `v2026.5.7`) "The Tenacity Release" published 2026-05-07 | gh API release tag `v2026.5.7`, name "Hermes Agent v0.13.0 (2026.5.7) — The Tenacity Release", published_at 2026-05-07T16:23:08Z | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
| 28 | Hermes "closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search with LLM summarization for cross-session recall | "**A closed learning loop** — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
| 29 | Hermes builds "a deepening model of who you are across sessions" via the closed loop | "it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions" | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
| 30 | Hermes uses external library Honcho (Plastic Labs, AGPL-3.0) for "dialectic user modeling" — exposed via Honcho's `/peers/{peer_id}/chat` endpoint | Hermes README: "Honcho dialectic user modeling." Honcho README: "Honcho is an open source memory library with a managed service for building stateful agents." Honcho version 3.0.6 (2026-05-07). | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/plastic-labs/honcho accessed 2026-05-08 | passes |
| 31 | Hermes's own code is MIT-licensed; Honcho is AGPL-3.0 and packaged as the optional `honcho` extra in Hermes's `pyproject.toml`, NOT as an unconditional core dependency. **However**, aggregate extras `all` and `termux` include `hermes-agent[honcho]` — so install paths using those aggregates bring Honcho along without a Honcho-specific opt-in. (Per Gate 0 Run 1 finding 3 + Run 3 finding 1.) Prose must say "Honcho ships as an optional extra; aggregate `all`/`termux` extras include it," NOT "Hermes depends on AGPL Honcho" and NOT "users must explicitly opt in to Honcho." | Hermes LICENSE = MIT (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`). Honcho LICENSE = AGPL-3.0 (`gh api repos/plastic-labs/honcho` returns `license.spdx_id: AGPL-3.0`). Hermes `pyproject.toml` `[project.optional-dependencies]` (codex Runs 1+3 verified): `honcho = ["honcho-ai>=2.0.1,<3"]`; `all` and `termux` extras both include `hermes-agent[honcho]`. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE; github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml; gh API repos/plastic-labs/honcho | passes |
| 32 | Hermes README claims "40+ tools, toolset system, terminal backends" — README is the source; docs page enumerates 8 toolset *categories* not 40+ items | README at v2026.5.7 verbatim "40+ tools…" Docs `/docs/user-guide/features/tools` lists 8 categories: Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/user-guide/features/tools | marginal — README is authoritative on the count but unaudited at docs layer; quote the README's exact phrasing rather than extrapolating |
| 33 | Hermes runs on **seven** terminal backends per README (local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox); marketing site says 5, docs index says 6 — README is authoritative | README v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Open issue #5995 corroborates Daytona, SSH, Singularity, Modal as the four remote backends. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/NousResearch/hermes-agent/issues/5995 | passes (with surface-inconsistency note) |
| 34 | Daytona and Modal offer "serverless persistence — your agent's environment hibernates when idle and wakes on demand" | "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." | hermes-agent.nousresearch.com/docs/user-guide/configuration accessed 2026-05-08 | passes |
| 35 | Hermes can spawn isolated subagents (process / context isolation via `delegate_task`); separately, `hermes -w` provides git-worktree filesystem isolation | README: "Spawn isolated subagents for parallel workstreams." v0.2.0 release notes: "Git Worktree Isolation — `hermes -w` launches isolated agent sessions in git worktrees for safe parallel work on the same repo." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; releases/tag/v2026.3.12 | passes |
| 36 | Python RPC scripting: "Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns" (README's own framing) | README v2026.5.7 verbatim | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes (quote README; do not over-extrapolate "zero-context-cost") |
| 37 | Hermes's Skills Hub is compatible with the agentskills.io open standard (originally developed by Anthropic; released as an open standard; adopted by **multiple** AI agent products — specific adopter count NOT primary-backed in agentskills.io spec or Hermes docs; Run 1 codex finding dropped the "30+" number; Run 2 codex finding fixed the source page from `/specification` to `/` overview). | Hermes README: "Compatible with the agentskills.io open standard." agentskills.io overview/home page (`https://agentskills.io/`): "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." (Note: the lineage quote lives on the overview/home page; `/specification` is a separate page describing the file-format spec; `/clients` shows adopters but does not enumerate to a specific 30+ count.) | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; agentskills.io/ (overview/home) accessed 2026-05-08 | passes — count claim removed; Anthropic-origin and open-standard claims primary-backed; correct page cited |
| 38 | First public Hermes Agent release: v0.2.0 (git tag `v2026.3.12`) on 2026-03-12; pre-public v0.1.0 internal phase preceded it | Release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." Repo created_at 2025-07-22 (private dev). | github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12; gh API repos/NousResearch/hermes-agent | passes |
| 39a | Hermes v0.13.0 (tag v2026.5.7) single-curl install supports Linux / macOS / WSL2 / Android (Termux). **Native Windows is NOT supported in v0.13.0 — the README directs Windows users to WSL2.** (Per Gate 0 Run 1 finding 1: the original row claimed Windows was added in v0.13.0; codex verified it isn't.) | README v2026.5.7 Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh \| bash`. Docs Installation: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." Per the v2026.5.7 README, Windows users are directed to WSL2; native Windows is not in the release. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/getting-started/installation accessed 2026-05-08 | passes |
| 39b | A native Windows installer commit landed **post-v0.13.0** on 2026-05-08 (commit `b7fe7ed7bd1740b01315c4bd15b254aa738124e5`) — NOT in any tagged release as of today. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, not yet in a tagged release." | Commit `b7fe7ed7bd` message: "feat(windows-install): bundle portable MinGit instead of relying on winget" — committed 2026-05-08, AFTER the v2026.5.7 release tag of 2026-05-07. | github.com/NousResearch/hermes-agent/commit/b7fe7ed7bd1740b01315c4bd15b254aa738124e5 | passes (post-release commit; will become a tagged-release fact at the next Hermes release) |
| 40 | Hermes live star count on 2026-05-08 (publication-date snapshot): 139,109 | gh API `repos/NousResearch/hermes-agent` field `stargazers_count: 139109` | api.github.com/repos/NousResearch/hermes-agent accessed 2026-05-08 | passes |
| 41 | First-party migration tooling: `hermes claw migrate` imports OpenClaw / `~/.clawdbot/` / `~/.moltbot/` setups (settings, memories, skills, API keys) | "If you're coming from OpenClaw, Hermes can automatically import your settings, memories, skills, and API keys." "`hermes claw migrate` imports your OpenClaw (or legacy Clawdbot/Moldbot) setup into Hermes." "Reads from `~/.openclaw/` by default. Legacy `~/.clawdbot/` or `~/.moltbot/` directories are detected automatically." | hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw; github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
| 42 | The "110K stars in 10 weeks" / "migration wave" framing originates in third-party blogs and has no primary backing — Hermes ships first-party migration tooling but the *quantitative* migration claim is unsupported | Star count of 139,109 on 2026-05-08 vs unsourced "110K in 10 weeks." Migration tooling is first-party (row 41); the *wave* framing is third-party. | gh API live count; absence in Nous Research first-party announcements | UNSUPPORTED — quantitative wave claim; if the post mentions adoption velocity, cite the live count + access date and avoid the "wave" framing |
| 43 | v0.13.0 release scale: 864 commits, 588 merged PRs, 282 issues closed (13 P0, 36 P1), 295 community contributors | Release notes for `v2026.5.7` | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |

**Marginal-row / non-passes-row closure** (per `research-protocol.md` "Marginal-source closure rule" + Gate 0 Run 1 fixes):

- **Row 14** (OpenClaw "passed React" framing): closure plan is **Attribute as secondary**. Star History blog is third-party analysis, not primary; row recency-status is `secondary-attribution-only`. Prose must say "per Star History's analysis" if it uses the comparison; otherwise fall back to live star count via gh API (row 15) as the primary fact.
- **Row 32** (40+ tools): closure plan is **Hedge**. Phase 4 prose will quote the README's "40+ tools" verbatim and footnote the docs-layer 8-category enumeration; will not state the count as audited fact.
- **Row 42** (110K-in-10-weeks / wave): closure plan is **Drop the unsourced quantitative claim**. The post will cite live star count + access date for adoption velocity. The "migration wave" phrasing will not appear in prose; the first-party migration *tooling* (row 41) is what the post will discuss.

**Splits / additions from Gate 0 Run 1:**

- **Row 24** was a verdict-not-claim row; now split into **rows 24a / 24b / 24c / 24d**, one per Claw project, each pairing peterwoods.online's quoted role-assignment with the project's quoted primary contradiction.
- **Row 39** was an over-broad single row claiming Windows landed in v0.13.0; now split into **row 39a** (the four platforms actually in v0.13.0) and **row 39b** (the post-release Windows installer commit awaiting next tag).

No fabricated quotes (every quote was returned by a research subagent against a real URL, and codex Run 1 spot-checked a sample). No misattributed sources (the "self-frames as" rows are explicitly framed as quoted self-description). No stale rows (codex Run 1: "No stale-row issue found in the sampled sources: the cited dated sources I checked are within the 2025-05-08 cutoff").

## Related posts on augusteo.com

Phase 2 step 8 corpus scan (2026-05-08) over `src/content/blog/`. The existing corpus is largely ML-systems / vision-stack / book-review heavy; the strongest topical adjacencies for an open-source agentic-frameworks post are two recent (Feb 2026) Vic posts on AI coding tooling.

### 1. [The Claude Code Plugins I Use Every Day](/blog/claude-code-plugin-stack)

**Slug:** `claude-code-plugin-stack`. **Pubdate:** 2026-02-09. (Note: a near-identical second slug `claude-code-plugins-i-use-every-day` exists with the same content; the canonical is `claude-code-plugin-stack` — the one with a hero image and sharper title.)

**One-line summary:** Vic's curated Claude Code plugin stack with a security argument for sticking to the official store; references Snyk's ToxicSkills study, prompt-injection attacks via injected marketplace plugins, and the Superpowers skills framework.

**Why it's relevant to this post:** Claude Code is itself an open-source agentic coding framework, and the post is built around the *adaptation* dial in microcosm — how plugins / skills extend the agent's capability surface. The post quotes the agentskills.io standard's lineage indirectly (Superpowers, the official store), which lines up with Hermes Agent's `agentskills.io` compatibility (matrix row 37).

**Anchor points in the new post:**
- **Act 1 — adaptation dial setup.** When introducing the *adaptation* axis (stateless → persistent memory → skill creation / self-improvement), inline-link to "[Vic's Claude Code plugin stack](/blog/claude-code-plugin-stack)" as a concrete adaptation-axis example: skills + plugins as the lever for extending agent capability.
- ~~**Act 3 — Hermes `agentskills.io` callback.**~~ **SUPERSEDED** — Gate 1 Run 1 finding 7 flagged the "same agentskills.io standard" claim as unsupported by both the matrix and the Claude Code plugin post itself (verified independently — that post does not invoke `agentskills.io` by name). Run 1 weakened the wording; Run 2 finding 5 then dropped the §13 cross-reference entirely. Run 3 finding 2 caught that this anchor-point instruction was still live and could reintroduce the bad claim during Phase 4 drafting. **Drafters: do NOT add a second inline link to the Claude Code plugin post in §13 or anywhere else in Act 3.** The §4 callback (adaptation dial setup) is the only inline link; the post still appears in `## References`.

### 2. [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate)

**Slug:** `hand-tools-power-tools-ai-coding-debate`. **Pubdate:** 2026-02-08.

**One-line summary:** A meditation on the AI coding debate framed through hand tools vs power tools woodworking — argues code is a liability and AI lets you focus on outcomes; cites Y Combinator stat that 25% of the latest cohort has codebases 95% AI-generated.

**Why it's relevant to this post:** Sets up the *category* the new post lives within. The agent-frameworks ecosystem is the substrate the AI coding debate plays out on; choosing OpenClaw vs Hermes is choosing a *power-tool shape*. Vic's existing post argues *that* AI coding matters; the new post examines *which AI agent* and *why the differences matter*.

**Anchor points in the new post:**
- **Act 1 — opening setup**, after introducing the three dials but before diving into OpenClaw: a one-sentence inline-link callback that names the post and what it established (the AI-coding category as load-bearing for engineering practice). Pattern matches `omni-modal-stack` ↔ `unified-vision-stack` cross-references.
- **Optional closing italic line**, if the post wraps with a "where this fits" coda: a sequel-flavored callback to the AI coding debate — "if you accept the [hand-tools-power-tools framing](/blog/hand-tools-power-tools-ai-coding-debate), the next question is which power tool to grab."

### Posts considered but not chosen

- **`ms-dos-to-llms-computing-next-transition`** (2025-06-18) — older (~11 months), more about Karpathy's "LLMs as new OS" framing. Topic adjacency is real but tangential; Karpathy's framing is at a different altitude than this post. Skipped.
- **`claude-ignored-my-instructions`**, **`chatgpt-fails-task`**, **`enforcing-bun-with-hooks`** — short anecdote / how-to posts. No load-bearing anchor point in the new post's structure.

### URL-form rule (per Phase 4 step 7)

In-prose links use root-relative form: `[Title](/blog/<slug>)`. The `## References` section uses full https URL form: `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` This is the canonical pattern at `src/content/blog/omni-modal-stack/index.mdx:1431`.

## Outline

Phase 3 deliverable, 2026-05-08; **revised after Gate 1 Run 1** (8 findings: 7 STRUCTURAL + 1 COSMETIC; all closed). Three-act narrative with the three-dial map as the throughline artifact, plus a **single running scenario** in Act 1 (the team's coding-agent rollout v1 → v4) that fails at each rung in turn so the dial map feels earned rather than declared. Each act opens with a dial-map reference and closes by re-pointing at the dial map. **18 numbered sections; 7 figures, all `static-svg`** under the static-default rule. Section sizes target 300–800 words each; total target ~10K words / ~35-min read per spec.

### Section list

#### Act 1 — The three dials

##### 1. Why the single ladder breaks

Setup pivot. peterwoods.online's "Claw family" ladder is the framing under test (rows 24a-d): one axis from "stateless function" (ZeptoClaw) to "autonomous worker" (NanoClaw). Why it fails: Hermes's distinctive bet is *learning loop*, not "more autonomous"; OpenClaw's distinctive bet is *gateway/control-plane*, not "less than Hermes." The fix: three dials, not one ladder.

- Throughline open: name the three dials by name. Promise to walk a single concrete scenario through their failure modes in §2-§4 so the map feels earned.
- No figure. The pivot is prose.
- Reader can now: see why a single-axis ranking hides Hermes's and OpenClaw's distinctive design bets.
- Matrix rows touched: 24a-d.

##### 2. The first failure: lifespan

Open with the running scenario. **An engineer is rolling out an AI coding agent for their team.** v1 is a CLI script: invoke it with a prompt, it returns a patch. Each invocation is fresh — no memory of the codebase's conventions, no awareness of the previous PR. Every code review starts the agent at zero. **That's a lifespan problem.**

- Walk lifespan rungs: one-shot → session → daemon/continuous → scheduled/event-driven.
- Frame the v1 → v2 transition (CLI script → long-lived per-PR session) as the lifespan rung climb.
- Failure-case framing remains author-constructed-pedagogical per spec § "Act 1 failure-case sourcing." The single running scenario aggregates the three previously-separate pedagogical examples (per Gate 1 Run 1 finding 5).
- No standalone figure (the dial map in §5 collects all three dials with the running scenario annotated; per Gate 1 Run 1 finding 8).
- Reader can now: tell when "longer-lived" is a different rung vs an artifact of deployment topology.
- Matrix rows touched: none load-bearing per-framework yet.

##### 3. The second failure: surface and control plane

Continue the running scenario. **v2 is sessioned: per-PR memory survives between turns.** But the team uses Slack and GitHub for review traffic, not CLIs. Engineers can't reach the agent without context-switching to a terminal, so usage drops. **That's a surface problem.**

- Walk surface rungs: CLI/API → gateway → multi-channel assistant.
- Frame the v2 → v3 transition (sessioned CLI → multi-channel Gateway with Slack + GitHub bots) as the surface rung climb.
- No figure.
- Reader can now: see why "a single Gateway as control plane" is a specific design decision, not table stakes.
- Matrix rows touched: row 2 preview.

##### 4. The third failure: adaptation

Continue the running scenario. **v3 has multi-channel reach: anyone on the team can invoke the agent via the channels they already use.** But the agent makes the same mistakes weekly. It doesn't learn that the team prefers explicit error types over `errors.New`, or that the codebase's tests live in `_test/` not `tests/`. Each session is its own island. **That's an adaptation problem.**

- Walk adaptation rungs: stateless → persistent memory → skill creation / self-improvement.
- Frame the v3 → v4 transition (multi-channel-but-stateless → skills + memory) as the adaptation rung climb.
- Inline link to [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack) — Vic's curated skill stack is one concrete example of the adaptation lever in practice. (Per Phase 2 anchor point #1 §4.)
- No figure.
- Reader can now: see why "skills" and "memory" sit on different rungs.
- Matrix rows touched: row 28 preview.

##### 5. The dial map

Act 1 close. Combine the three dials into one orthogonal map; annotate the running scenario's path through them.

- Figure 1: **ThreeDialMap** — three orthogonal axes (lifespan, surface, adaptation) drawn together; v1 / v2 / v3 / v4 placed at the failing rung on each axis; small annotations at each rung climb explain "what broke that motivated this rung." Replaces the four-figure stack of LifespanDial / SurfaceDial / AdaptationDial / ThreeDialMap from the pre-Run-1 outline.
- Throughline close (revised per Gate 1 Run 3 finding 1): "We will now place OpenClaw, the Claw variants, and Hermes on this map. None of them sits where v4 does — but the placements scatter, and several Claw variants' distinctive bets sit *off* the three dials entirely. We'll annotate those off-axis concerns where they appear; the dial map handles what it can. Tool choice falls out of which dial — or which off-axis concern — your use case actually needs."
- Reader can now: predict that each architecture's distinctive bet is one specific dial, not all three.
- Matrix rows touched: callbacks to 24a-d (peterwoods's ladder shown failing on the multi-axis map).

#### Act 2 — OpenClaw and the gateway problem

##### 6. OpenClaw frames itself as a personal AI assistant with a control-plane Gateway

Throughline open: "Let's place OpenClaw. Start with how the project frames itself."

- Inline link to [Hand tools, power tools, and the AI coding debate](/blog/hand-tools-power-tools-ai-coding-debate) as the category-setup callback (per Phase 2 anchor point #2 §6 opening).
- Verbatim quote from README (rows 1, 2): "personal AI assistant you run on your own devices" + "Local-first Gateway — single control plane for sessions, channels, tools, and events."
- Always-on: "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running" (row 3).
- Multi-agent routing (row 4): "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)."
- Figure 2: **OpenClawArchitecture** — Gateway as the architectural center; channels feeding in, labeled only with the matrix-backed session-routing categories from row 16 (DM, group chat, cron job; per Gate 1 Run 2 finding 4 — Discord dropped because row 7's sandbox deny-list mention isn't first-class evidence Discord is an inbound channel adapter); sessions branching out per channel routing rule; workspaces (per-agent filesystem roots) shown; tools layer below.
- Reader can now: see why OpenClaw's Gateway is the architectural center, and why "channels" are first-class.
- Matrix rows touched: 1, 2, 3, 4.

##### 7. Workspaces, sessions, sandboxes — three layered concepts

Claim: OpenClaw organizes execution along three layers, each owning a different decision.

- **Workspaces** = per-agent filesystem roots (default `~/.openclaw/workspace`).
- **Sessions** = conversation contexts routed by origin (DM, group, cron, etc.). Persisted as JSONL at `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`.
- **Sandboxes** = optional execution-isolation backends wrapping non-`main` sessions.
- Verbatim quotes per row 16 (workspaces / sessions framing) and row 17 (sandbox workspace-access modes none / ro / rw).
- No figure (the architecture figure carries the visual; this section is naming).
- Reader can now: tell which decision lives at which layer.
- Matrix rows touched: 16, 17.

##### 8. The security model: host-by-default for `main`, sandbox tiers for non-`main`

Claim: OpenClaw's security model is "host execution for `main`, sandbox for non-`main`."

- Verbatim quote of README's Security model section (rows 5, 6, 7).
- Typical sandbox default's allow/deny lists (row 7) shown as a quoted block.
- Figure 3: **OpenClawSandboxTiers** — three-panel side-by-side: (a) host execution for `main` (full host access); (b) Docker default sandbox (typical allow/deny defaults inset); (c) SSH and OpenShell alternate backends. Workspace-access modes `none` / `ro` / `rw` shown as a small inset table.
- Reader can now: tell when OpenClaw will sandbox a tool call vs run it on the host.
- Matrix rows touched: 5, 6, 7.

##### 9. A short note on naming history

Tight context-setting for §10. **Two paragraphs max** (per Gate 1 Run 1 finding 3 — trimmed from the pre-Run-1 history-and-scale dump).

- Naming sequence (rows 10, 11): Warelay → Clawdis → Clawdbot → Moltbot → OpenClaw, with publication dates.
- Single sentence on the foundation announcement (row 13): in Feb 2026, Steinberger announced he was joining OpenAI and that OpenClaw would move to a foundation. As of pubDate, the foundation is announced-as-forthcoming — no GOVERNANCE.md/FOUNDATION.md exists in the repo, and CONTRIBUTING.md still names Steinberger "Benevolent Dictator." Both the rename history and the ongoing governance flux are why third-party taxonomies (peterwoods.online, Feb 2026) had room to slot in.
- **Dropped from prose** (per Gate 1 Run 1 finding 3): nationality (row 12), live star count (row 15), Star History attribution (row 14). Matrix retains all three rows for traceability — they're available evidence for any reader auditing the post but they don't make the Claw-family contradiction land.
- No figure.
- Reader can now: contextualize the OpenClaw vacuum that the Claw-family taxonomy filled.
- Matrix rows touched: 10, 11, 13.

##### 10. The Claw family as a vacuum-filling taxonomy

Claim: peterwoods.online's "Claw family" ladder is contradicted by 3 of 4 projects' primary self-framing. The ladder is a useful editorial cut, not a sourced taxonomy. **The matrix-supported claim is "the shared `*Claw` namespace invites bad taxonomy"** (per Gate 1 Run 1 finding 1) — not "these are gateway-centered variants." The variants scatter across the dial map; that scatter is the load-bearing fact.

- Walk each variant's primary self-framing:
  - **NanoClaw** (qwibitai, row 18): container isolation + minimalism. peterwoods's "autonomous worker / continuous lifespan / high agency" → contradicted (row 24a).
  - **breakcafe/picoclaw** (row 20): name collision; serverless fork of NanoClaw, distinct project from sipeed/picoclaw. Brief disambiguation.
  - **sipeed/PicoClaw** (row 21): hardware portability (sub-$10 hardware, <10MB RAM, RISC-V/ARM/MIPS/x86, 16+ chat platforms). peterwoods's "session-scoped persistent assistant for interactive coding" → partially-accurate (row 24b).
  - **ZeroClaw** (zeroclaw-labs, row 22): continuous always-on (systemd / launchctl / Windows Service); supervised-default autonomy. peterwoods's "structured task runner / per-task lifespan / low autonomy" → contradicted (row 24c).
  - **ZeptoClaw** (qhkm, row 23): full personal-AI-assistant infrastructure (workspace memory, conversation history, agent swarms, multi-channel gateway, sandboxed autonomy). peterwoods's "stateless function / no autonomy" → directly contradicted (row 24d). **Phase 4 must verbatim re-quote** the ZeptoClaw README's actual phrasing of architectural details (row 19 / row 26 paraphrase-pending-verbatim flag).
  - **Family-coordination question** (row 25): not a coordinated family. Distinct authors / languages; ZeroClaw's README explicitly disclaims "other repositories claiming affiliation are unauthorized"; sipeed/PicoClaw's README disclaims being a fork of any Claw project; ZeptoClaw's COMPARISON.md contrasts against NanoClaw / PicoClaw / OpenClaw / NemoClaw but omits ZeroClaw.
  - **ZeptoClaw is part of the real coordinated Zepto Stack** (row 26): ZeptoPM, ZeptoCapsule, ZeptoRT — a coordinated sub-family separate from "Claw." Phase 4 must verbatim re-quote.
  - **Migration tooling callback** (row 41): even Nous Research expected migration traffic from OpenClaw — Hermes ships first-party migration tooling (`hermes claw migrate` reads from `~/.openclaw/`, with legacy `~/.clawdbot/` / `~/.moltbot/` detection). The "wave" framing (row 42) is third-party and unsupported; prose mentions tooling, not wave. (Per Gate 1 Run 1 finding 2 — folded in from the dropped §17.)
- **Off-axis distinctive bets** (per Gate 1 Run 2 finding 1): several Claw variants' distinctive concerns are *not on the three dials* at all. NanoClaw's container minimalism (row 18), sipeed/PicoClaw's hardware portability (row 21), ZeroClaw's deploy-anywhere posture (row 22), and ZeptoClaw's feature-breadth (row 23) are footprint / runtime / deployment concerns the three-dial framework doesn't capture. Prose names this honestly — the three-dial map is necessary but not sufficient for the Claw ecosystem; some variants' distinctive bets simply live off-map. That mismatch is part of the taxonomy-failure story: peterwoods's ladder forced everything onto one axis, but even a richer three-dial framework can't place every variant's distinctive concern.
- Figure 4: **ClawFamilyOnDials** — three-dial map (reusing #1) with OpenClaw + NanoClaw + sipeed/PicoClaw + ZeroClaw + ZeptoClaw placed at their best-fit lifespan / surface / adaptation positions. **Each variant placement carries an explicit "off-axis bet" annotation where its distinctive concern lives off the map**: NanoClaw → "container minimalism," sipeed/PicoClaw → "hardware portability," ZeroClaw → "deploy-anywhere posture," ZeptoClaw → "feature breadth." Small annotations also mark the three contradictions and one partial-accuracy where peterwoods's role-assignments disagree. The placements scatter across the in-axis dimensions; the off-axis annotations make the framework's coverage gap honest (per Gate 1 Run 2 finding 1).
- Reader can now: see how third-party taxonomies fill a vacuum when an ecosystem shares a name pattern but no maintainership; recognize that the three-dial framework itself doesn't explain every variant's distinctive bet (and that's part of the taxonomy-failure story).
- Matrix rows touched: 18, 19, 20, 21, 22, 23, 24a-d, 25, 26, 41, 42.

##### 11. Where OpenClaw and the Claw family land on the dial map

Act 2 close.

- Throughline close (revised per Gate 1 Run 1 finding 1 + Run 2 findings 1 and 3): "OpenClaw is gateway-centered with persistent sessions and continuous lifespan. The four Claw variants don't share that center — and several of their distinctive bets sit off the three-dial map entirely: sipeed/PicoClaw on hardware portability, NanoClaw on container minimalism, ZeroClaw on deploy-anywhere posture, ZeptoClaw on feature breadth. The Claw namespace is shared; the architectures aren't, and not all of them are even on the same axes. That's another reason a single ladder always misranks them. Hermes will land somewhere else entirely — on the adaptation axis."
- No figure. Callback to Figure 4 + the dial map.
- Reader can now: predict that the next act will introduce a different distinctive-dial design.

#### Act 3 — Hermes Agent and the learning-loop problem

##### 12. Hermes's distinctive bet is a closed learning loop

Throughline open: "Now Hermes. The dial Hermes was designed around isn't surface — it's adaptation."

- Verbatim quote from README v0.13.0 / tag v2026.5.7 (rows 27, 28): "A closed learning loop — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall."
- "Model of who you are" framing (row 29).
- Figure 5: **HermesClosedLoop** — circular flow diagram: task → autonomous skill creation → mid-use refinement → FTS5 cross-session recall → Honcho user model → next task. Honcho box annotated as external (Plastic Labs, AGPL-3.0).
- Reader can now: see the loop's shape; predict that the rest of Act 3 will examine each arc.
- Matrix rows touched: 27, 28, 29.

##### 13. Skill creation from experience and mid-use self-improvement

Claim: Hermes builds skills from experience and refines them while running.

- Implementation evidence per row 28's quoted README phrasing.
- agentskills.io compatibility (row 37): originally Anthropic-developed, released as open standard, adopted by multiple agent products. **Drop the "30+ adopters" count** (Gate 0 Run 1 finding) — quote the lineage from agentskills.io's overview/home page (Gate 0 Run 2 finding fixed the source URL).
- Cross-reference dropped per Gate 1 Run 2 finding 5: the §13 callback to [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack) is removed. The §4 callback (adaptation dial setup) is the only inline link to that post in the new outline. The §13 callback was already weakened to "the natural skill/plugin counterpart in the adaptation lane" after Run 1 finding 7 dropped its standard-identity claim; codex Run 2 then flagged that the weakened version doesn't earn its place — it just repeats §4's role. Cleanest fix is to drop the second link entirely. The post still appears in `## References` per the related-posts rule.
- No figure. Mechanism is verbal; the closed-loop figure carries it.
- Reader can now: see that "skills" in Hermes is the agentskills.io-compatible expression of a broader skill / plugin pattern across agent frameworks.
- Matrix rows touched: 28, 37.

##### 14. Cross-session recall via FTS5 search and LLM summarization

Claim: Hermes recalls past tasks by searching its own session history with FTS5 and summarizing matches with an LLM.

- Quote per row 28. **SQLite-name inference footnoted** — README says "FTS5"; the README does not explicitly write "SQLite," and FTS5 being SQLite's full-text-search v5 module is a well-known fact treated as inference per the matrix annotation.
- No figure (the closed-loop figure carries the recall arc).
- Reader can now: see why "session boundaries" are soft in Hermes — recall crosses them.
- Matrix rows touched: 28 (FTS5 detail; SQLite-name inference footnoted).

##### 15. The user model: Honcho dialectic modeling

Claim: Hermes uses Honcho — an external library by Plastic Labs, AGPL-3.0 — to build a "model of who you are" via the dialectic API.

- Honcho repo + license + version per row 30.
- License nuance per row 31: Hermes itself is MIT; Honcho is AGPL-3.0; Honcho is packaged as the optional `honcho` extra in `pyproject.toml` (`honcho = ["honcho-ai>=2.0.1,<3"]`), NOT an unconditional core dependency. **However**, aggregate extras `all` and `termux` include `hermes-agent[honcho]` — so install paths using those aggregates pull AGPL-3.0 Honcho along without a separate Honcho-specific opt-in. Footnote.
- No figure.
- Reader can now: distinguish Hermes's MIT codebase from the AGPL Honcho dependency tree, and see why aggregate extras matter for licensing.
- Matrix rows touched: 30, 31.

##### 16. Tools, terminal backends, and subagent isolation

Claim: Hermes ships a toolset system + seven terminal backends + two subagent-isolation mechanisms.

- README at v2026.5.7 (row 33): "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox."
- Surface inconsistency note: marketing site says 5; docs index says 6; README says 7. README is authoritative. Footnote.
- "40+ tools" claim (row 32): treated as marginal — quote the README's exact wording verbatim and footnote the docs-layer 8-category enumeration.
- Daytona and Modal "serverless persistence" per row 34 verbatim.
- **Subagent isolation** (row 35, folded in from the dropped §17 per Gate 1 Run 1 finding 2): two distinct mechanisms — `delegate_task` (process / context isolation) and `hermes -w` (git worktree filesystem isolation, added in v2026.3.12). Brief paragraph; not a separate section.
- Figure 6: **HermesTerminalBackends** — simple 1D backend list in README order (per Gate 1 Run 2 finding 2: the prior 2D execution-surface × persistence grid overclaimed the matrix; row 33 backs the 7-backend list, row 34 backs only the Daytona+Modal serverless-persistence semantic, and the matrix doesn't establish per-backend execution-location or persistence categorization for the other five). The figure now lists the seven backends in README order — local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox — with a single annotated callout grouping Daytona + Modal as the matrix-backed serverless-persistence niche per row 34. No editorial 2D axes; no "remote-ephemeral" / "remote-persistent" labels for backends the matrix doesn't characterize that way.
- Reader can now (revised per Gate 1 Run 3 finding 3): identify the seven README-listed backends and the documented Daytona/Modal serverless-persistence niche per row 34. (The prior wording "tell which backend they want for which tradeoff" was tightened because the matrix doesn't characterize per-backend execution-location or persistence semantics for the other five backends.)
- Matrix rows touched: 32, 33, 34, 35.

##### 17. Where Hermes lands on the dial map

Act 3 close. (Was §18 in the pre-Run-1 outline; renumbered after §17 was dropped per Gate 1 Run 1 finding 2.)

- Throughline close (revised per Gate 1 Run 2 finding 3): "Hermes sits at daemon/continuous lifespan, gateway-with-skills surface, and most importantly the skill-creation/self-improvement adaptation rung — that's the adaptation rung the team's coding-agent rollout reached at v4. OpenClaw, by contrast, sits at continuous lifespan with a gateway surface and persistent **sessions** (not adaptation memory). The dial Hermes was designed around is adaptation. That makes Hermes a different question from OpenClaw — not a rung above."
- No figure. Callback to Figure 5 + the dial map.
- Reader can now: predict that the closing matrix will place all frameworks on the same map and that the placements will not collapse to a ladder.

#### Closing — The matrix

##### 18. All three frameworks on one map

The reassembly. Reader overlays use case → tool falls out. (Was §19 in the pre-Run-1 outline.)

- Figure 7: **FinalDialMap** — three-dial map (reusing #1) with **all** frameworks placed: OpenClaw, NanoClaw, sipeed/PicoClaw, ZeroClaw, ZeptoClaw, Hermes. **Two-tier annotation per placement** (per Gate 1 Run 2 finding 1): the in-axis label names where each architecture lives on lifespan / surface / adaptation; a small "off-axis bet: <X>" annotation names the distinctive concern that lives off the three-dial map (NanoClaw → container minimalism; sipeed/PicoClaw → hardware portability; ZeroClaw → deploy-anywhere posture; ZeptoClaw → feature breadth). OpenClaw and Hermes have no off-axis annotation because their distinctive bets *are* on the three dials (gateway/control-plane and adaptation, respectively). The placements scatter — none of them is "above" or "below" the others on a single ladder.
- Closing italic-line callback: sequel-flavored callback to [Hand tools, power tools, and the AI coding debate](/blog/hand-tools-power-tools-ai-coding-debate). (Per Phase 2 anchor point #2.)
- Reader can now: overlay their own use case on the map and see which architecture matches the dial they care about.
- Matrix rows touched: callbacks to all matrix rows; no new claims.

### Figure table

7 figures total. All `static-svg` per the static-default rule (justification below). Renumbered after Gate 1 Run 1 collapsed Figures 1-3 into Figure 4 per finding 8.

| # | Figure | Type | Mechanism | Reader notices | Section |
|---|---|---|---|---|---|
| 1 | ThreeDialMap | static-svg | Three orthogonal axes (lifespan, surface, adaptation) drawn together; v1 / v2 / v3 / v4 of the team's coding-agent rollout placed at the failing rung on each axis; small annotations explain "what broke that motivated this rung" at each rung climb. Replaces the pre-Run-1 quartet of LifespanDial / SurfaceDial / AdaptationDial / ThreeDialMap. | The three dials are orthogonal; the running scenario climbs one rung per dial in sequence; the failure points are the *reason* each rung exists. | §5 |
| 2 | OpenClawArchitecture | static-svg | Gateway as control-plane center; channels feeding in, labeled only with matrix-backed routing categories per row 16 (DM, group chat, cron job — Discord dropped per Gate 1 Run 2 finding 4); sessions branching out per channel routing rule; workspaces (per-agent filesystem roots) shown; tools layer below. | OpenClaw's Gateway is the architectural center; channels are first-class; sessions route by origin. | §6 |
| 3 | OpenClawSandboxTiers | static-svg | Three-panel side-by-side: (a) host execution for `main` session — full host access, allow-everything; (b) Docker default sandbox — typical allow/deny defaults inset; (c) SSH/OpenShell alternate backends. Workspace-access modes `none`/`ro`/`rw` shown as a small inset table. | When OpenClaw will sandbox a tool call vs run it on the host. | §8 |
| 4 | ClawFamilyOnDials | static-svg | Three-dial map (reuse of #1) with OpenClaw + NanoClaw + sipeed/PicoClaw + ZeroClaw + ZeptoClaw placed at their best-fit lifespan / surface / adaptation positions. **Each variant carries a two-tier annotation**: in-axis label naming the framework's three-dial position, plus a small "off-axis bet: <X>" annotation naming the distinctive concern that lives off the map (per Gate 1 Run 2 finding 1) — NanoClaw → container minimalism; sipeed/PicoClaw → hardware portability; ZeroClaw → deploy-anywhere; ZeptoClaw → feature breadth. Small annotations also mark the three contradictions + one partial-accuracy where peterwoods.online's role-assignments disagree. | The four Claw variants scatter across the dial map's in-axis dimensions, and several have distinctive bets that live off the three-dial map entirely; peterwoods's taxonomy diverges from primary self-framings; the shared name doesn't imply a shared distinctive dial OR a shared off-axis concern. | §10 |
| 5 | HermesClosedLoop | static-svg | Circular flow diagram: task → autonomous skill creation → mid-use refinement → FTS5 cross-session recall → Honcho user model → next task. Honcho box annotated as external (Plastic Labs, AGPL-3.0). | The post's spine for Act 3 — Hermes's distinctive bet is the loop's existence. | §12 |
| 6 | HermesTerminalBackends | static-svg | Simple 1D backend list in README order: local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox. A single annotated callout groups Daytona + Modal as the matrix-backed serverless-persistence niche per row 34. No editorial 2D axes (per Gate 1 Run 2 finding 2 — the prior 2D execution-surface × persistence grid overclaimed the matrix). | The README enumerates seven backends in a specific order; Daytona + Modal occupy a uniquely-documented serverless-persistence niche per row 34; the other backends' execution-location semantics aren't characterized in the matrix and aren't claimed in the figure. | §16 |
| 7 | FinalDialMap | static-svg | Three-dial map (reuse of #1) with **all** frameworks placed: OpenClaw, NanoClaw, sipeed/PicoClaw, ZeroClaw, ZeptoClaw, Hermes. **Two-tier annotation per placement** (per Gate 1 Run 2 finding 1): in-axis label naming each framework's lifespan / surface / adaptation position; small "off-axis bet: <X>" annotation for variants whose distinctive concern lives off the map. OpenClaw + Hermes have no off-axis annotation because their distinctive bets *are* on the three dials (gateway/control-plane and adaptation, respectively). The placements scatter; no ladder collapse. | Tool choice falls out of "which dial do you actually need?" — and recognizing when a candidate's distinctive bet lives off the framework's axes. | §18 |

### Static-default rule justification

All 7 figures are `static-svg`. None of the four interactive override clauses applies:

- **Continuous parameter sweep:** none of the post's intuition-value figures depends on a continuous parameter — the dials are categorical (rungs), the architectures are static schematics, and the loop diagram is a fixed flow.
- **Animated time evolution:** the closed-loop diagram is a flow, not a time evolution that needs scrubbing. A reader's mental model of "task → skill creation → refinement → recall" does not need frame-by-frame stepping.
- **Drag-based spatial reasoning:** none. There is no spatial intuition that requires the reader's hand-eye.
- **Multi-state toggle across more than 3 states:** the closest candidate is the 7 terminal backends, but they fit cleanly in a single 2D static layout with annotations. The Claw family placements (5 frameworks) similarly fit in a single annotated dial map.

The Phase 1 figure-list sketch tentatively included `DialMapInteractive` (click-to-expand each framework's architecture). On the four-clause check, this is "would feel nicer interactive" rather than "intuition value depends on interactivity" — the same insight is delivered by Figures 4, 2, 5 as separate static figures. Static-default wins; interactive carries hidden cost (Svelte wrapper, hydration, playwright check, mobile fallback, accessibility) that the post doesn't need to pay.

Codex Gate 1 Run 1 confirmed: "No TYPE-CHANGE STRUCTURAL findings. The static-svg choice is defensible for every listed figure under the stated override rules."

### Throughline thread check

Three-dial map is the throughline artifact, and the team's coding-agent rollout (v1 → v4) is the running scenario that motivates it in Act 1. Per-act callbacks per `narrative-template.md`'s "Throughline rhythm":

- **Act 1 sequence** (§§2-§4): each section opens with the next rung of the running scenario and closes with the next rung's failure motivating the dial below it.
- **Act 1 close** (§5): Figure 1 — first complete render of the dial map with the running scenario annotated. Promise to fill the rest of the map with OpenClaw, the Claw variants, and Hermes in Acts 2 and 3.
- **Act 2 open** (§6): "Let's place OpenClaw. Start with how the project frames itself."
- **Act 2 close** (§11): "OpenClaw is gateway-centered with persistent **sessions** and continuous lifespan. The four Claw variants don't share that center — and several of their distinctive bets sit off the three-dial map entirely. The Claw namespace is shared; the architectures aren't, and not all of them are even on the same axes. Hermes will land somewhere else entirely — on the adaptation axis." (Per Gate 1 Run 2 findings 1 and 3.)
- **Act 3 open** (§12): "Now Hermes. The dial Hermes was designed around isn't surface — it's adaptation."
- **Act 3 close** (§17): "Hermes sits at daemon/continuous lifespan, gateway-with-skills surface, and most importantly the skill-creation/self-improvement adaptation rung."
- **Closing** (§18): Figure 7 — full dial map with all frameworks placed. "Tool choice falls out of which dial you actually need."

Each act both opens and closes with an explicit dial-map reference; Act 1 additionally threads the running scenario through every section. Throughline rhythm clean.

### Cross-references to existing augusteo.com posts

Per `## Related posts on augusteo.com`:

- **§4** (Adaptation dial setup): inline link to [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack) as a concrete adaptation-axis example — Vic's curated skill stack as the adaptation lever in practice. (This is now the **only** inline link to the Claude Code plugin post in the new outline — the §13 callback was dropped per Gate 1 Run 2 finding 5; the post still appears in `## References`.)
- **§6 opening** (Act 2 setup): inline link to [Hand tools, power tools, and the AI coding debate](/blog/hand-tools-power-tools-ai-coding-debate) as the category-setup callback.
- **§18 closing italic line**: sequel-flavored callback to the AI coding debate post.

Phase 4 step 5: References section will list both as the *first* entries using full https URL form (`https://augusteo.com/blog/<slug>`), per the `omni-modal-stack` ↔ `unified-vision-stack` canonical pattern.

### Section-to-matrix-row coverage check

Every load-bearing matrix row is covered by at least one section. Walk:

- Rows 1, 2, 3, 4 → §6.
- Rows 5, 6, 7 → §8.
- Rows 10, 11, 13 → §9.
- Rows 16, 17 → §7.
- Rows 18, 19, 20, 21, 22, 23, 24a-d, 25, 26, 41, 42 → §10. (Rows 41/42 folded in from the dropped §17 per Gate 1 Run 1 finding 2.)
- Rows 27, 28, 29 → §12.
- Rows 28 (skill creation) + 37 → §13.
- Row 28 (FTS5) revisited → §14.
- Rows 30, 31 → §15.
- Rows 32, 33, 34, 35 → §16. (Row 35 folded in from the dropped §17.)

**Matrix rows retained for traceability but no longer load-bearing in prose** (per Gate 1 Run 1 findings 2 and 3): rows 12 (Steinberger nationality), 14 (Star History attribution), 15 (live OpenClaw star count), 36 (Python RPC zero-context-cost), 38 (first public Hermes release), 39a (install platforms), 39b (post-release Windows commit), 40 (live Hermes star count), 43 (release scale). These rows stay in the matrix as evidence available to any reader auditing the post but are deliberately not surfaced in prose because they don't make the intuition land. Phase 7 Gate 2's "every prose claim has a matrix row" check is unaffected (matrix is a superset of prose claims, not a one-to-one map).

All 43 matrix rows accounted for. No load-bearing claim in the outline lacks a row.

## Codex research review

**Gate 0 Run 1 (2026-05-08).** Codex consult fired against Spec + Throughline + Research notes + 43-row Claim-source matrix. **Findings: 6 STRUCTURAL, 1 COSMETIC.** Codex did not find any stale rows (every dated source within the 2025-05-08 12-month bar) and did not find fabricated quotes; the issues were attribution-discipline issues. Run 1 findings (truncated; see findings file for verbatim): row 14 was Star-History laundering; row 31 overstated the Honcho dependency (Honcho is an optional extra, not core); row 37 had unsupported "30+ adopters" count; row 39 falsely placed native Windows in v0.13.0; row 24 was a verdict not a claim-source mapping; Act 1 promised author-constructed failure-case examples that should be annotated as such. All 6 STRUCTURAL fixes applied to matrix and throughline.

**Gate 0 Run 2 (2026-05-08).** Re-fired against the fixed matrix. **Findings: 5 STRUCTURAL + 1 COSMETIC.** All 5 STRUCTURAL findings were **research-notes prose drift** — i.e., the matrix rows were correctly fixed in Run 1, but the original wording survived in `## Research notes` and contradicted the fixed rows. Codex correctly identified this as a Phase-4-drafting contamination risk (the prose would inherit the un-fixed wording even if the matrix was right). Plus codex's Run 2 finding 3 caught that row 37's source cell cited `agentskills.io/specification` but the lineage quote actually lives at `agentskills.io/` overview/home. All 5 Run 2 STRUCTURAL fixes applied to research notes prose; Run 3 pending.

**Run-1 + Run-2 finding summary:** **6 STRUCTURAL Run 1 + 5 STRUCTURAL Run 2 = 11 STRUCTURAL findings closed; 2 COSMETIC findings partially closed** (rows 17 and 25 fully expanded with verbatim quotes; rows 19 and 26 acknowledged as paraphrase-pending-Phase-4-verbatim-re-quote with explicit annotation in the cell, since the Phase 2 subagent did not capture a verbatim primary excerpt for those specific structural details).

**Gate 0 Run 3 (2026-05-08).** Re-fired with Run 2 fixes applied. Codex returned **1 STRUCTURAL** finding: a wording precision issue on row 31 / line 109 — the Run 2 fix said "users opt in" but aggregate extras `all` and `termux` include `hermes-agent[honcho]`, so install paths using those aggregates pull Honcho without a separate Honcho-specific opt-in. Codex's recommended wording: "Honcho is not a core dependency; it is packaged as an optional extra, though aggregate extras such as `all` / `termux` include it." Fix applied to research notes line 109 and matrix row 31. **Run 3 was the third invocation under the gate-runner cap-of-3.** Re-running for Run 4 would fire the Step-6 escape hatch; the Run 3 finding was a wording-precision fix (not a content disagreement), the fix is direct and inspection-verifiable, so the cleanest path is to apply the fix and close the gate rather than burn the Step-6 escape hatch on a wording iteration.

**Gate 0 final state:** 12 STRUCTURAL findings closed across 3 runs (6 Run 1 + 5 Run 2 + 1 Run 3); 2 COSMETIC findings closed or honestly annotated. **Gate 0 closes on cosmetic-only / structural-fixed.** Phase 2 done; Phase 3 next.

[full findings: notes/openclaw-and-hermes-agent-codex-research-20260508.md] — Run 1 + Run 2 + Run 3 verbatim outputs all archived there.

## Codex outline review

**Gate 1 Run 1 (2026-05-08).** Codex consult fired against Spec + Throughline + Research notes + 43-row Claim-source matrix + Related posts + Outline + figure table. **Findings: 7 STRUCTURAL + 1 COSMETIC, 0 TYPE-CHANGE STRUCTURAL.** Output 118.7 KB (>8 KB size threshold), so verbatim findings live in `notes/openclaw-and-hermes-agent-codex-outline-20260508.md`; one-paragraph summary follows. Static-svg choice for all figures was explicitly endorsed: "the static-svg choice is defensible for every listed figure under the stated override rules."

Findings (one-line summary each):
1. **STRUCTURAL §10/§11/Fig 4/Fig 7:** the "Claw variants cluster on gateway axis" framing is unsupported by the matrix. Each variant has a different distinctive bet (NanoClaw container minimalism; PicoClaw hardware portability; ZeroClaw deploy-anywhere autonomy; ZeptoClaw everything-at-once). Supported claim is "the shared `*Claw` namespace invites bad taxonomy" — the variants scatter, they don't cluster.
2. **STRUCTURAL §17:** "The rest" is dead-weight bundling. §18 lands without it. Move to appendix or redistribute.
3. **STRUCTURAL §9:** mostly dead-weight for §10. Author nationality, OpenAI/foundation, star count, Star History don't make the Claw contradiction land. Trim to naming-history context only.
4. **STRUCTURAL §16/Fig 6 (was Fig 9):** the "cost / portability" axis is unsourced. Matrix only backs the backend list and persistence semantics. Re-axis to sourced dimensions.
5. **STRUCTURAL §2-§5:** three separate author-constructed failure cases ≠ one escalating motivating case. Missing rung in the intuition ramp. Use a single running scenario that fails on each dial in turn.
6. **STRUCTURAL Fig 2 (was Fig 5):** OpenClaw architecture figure names channel adapters (Discord, Telegram, terminal, web) not all of which are matrix-backed. Use generic / matrix-backed labels only.
7. **STRUCTURAL §13 cross-reference:** "Vic's existing setup uses the same agentskills.io standard" is unsupported by the matrix or by the related post itself (verified independently: Claude Code plugin post does not invoke "agentskills.io" by name). Weaken the claim.
8. **COSMETIC:** Figures 1-4 risk feeling like four versions of the same setup diagram. Suggested merging Figs 1-3 into Fig 4 with failure annotations attached.

**Fixes applied** (all 7 STRUCTURAL + the COSMETIC merge — the COSMETIC fix is the natural complement to fix 5):

- **F1**: rewrote §10/§11 prose and Figure 4/Figure 7 specs to reflect "scatter, not cluster." Updated Act 2 close line accordingly.
- **F2**: dropped §17. Subagents (row 35) folded into §16; migration tooling (row 41) folded into §10's family-coordination beat. Other claims dropped from prose; matrix retains rows for traceability.
- **F3**: trimmed §9 to two paragraphs (rename sequence + foundation-flux as the vacuum that third-party taxonomies filled). Dropped nationality, star count, Star History attribution from prose.
- **F4**: revised Figure 6's axes to **execution surface (local vs remote) × persistence semantics (ephemeral vs serverless-persistent)** — both matrix-backed.
- **F5**: collapsed Act 1 into one running scenario (team's coding-agent rollout v1 → v4) that fails at each rung in turn. §2-§5 each pick up the next rung.
- **F6**: changed Figure 2's channel labels to matrix-backed only — Discord (per row 7's deny-list mention) plus generic categorical labels (DM / group chat / cron) drawn from row 16's enumerated session-routing categories.
- **F7**: weakened §13 cross-reference from "uses the same agentskills.io standard" to "the natural skill/plugin counterpart in the adaptation lane." Drops the unsupported standard-identity claim while preserving the Phase 2 anchor point.
- **F8 (COSMETIC)**: merged Figures 1, 2, 3 into Figure 4. Total figures: 10 → 7. All renumbered.

Section count: 19 → 18. Figure count: 10 → 7. Outline updated in place.

Re-running Gate 1 (Run 2) against the revised outline per the gate-runner protocol; cap of 3 invocations.

**Gate 1 Run 2 (2026-05-08).** Re-fired against the Run-1-fixed outline. **Findings: 4 STRUCTURAL + 1 COSMETIC, 0 TYPE-CHANGE STRUCTURAL.** All 4 STRUCTURAL findings were precision tightening on Run 1's fixes — none touched the post's spine. The COSMETIC (drop §13 cross-reference) was applied at the same time since the fix is a one-line edit. Codex reaffirmed the static-svg choice for every figure: "Static SVG still holds; the issues are claim/mapping precision, not figure type."

Run 2 findings (one-line summary each):
1. **STRUCTURAL §10/§11/§18, Figs 4 & 7 — three-dial map can't fully explain every variant's distinctive bet.** The Run-1 "scatter not cluster" reframing closed the false-cluster claim, but several Claw variants' distinctive concerns (NanoClaw container minimalism, sipeed/PicoClaw hardware portability, ZeroClaw deploy-anywhere, ZeptoClaw feature breadth) live *off* the three-dial map entirely. Saying "Figure 7 places each framework at the dial it was designed around" is false for those variants.
2. **STRUCTURAL §16/Fig 6 — 2D backend grid still overclaims the matrix.** Row 33 backs the 7-backend list and row 34 backs Daytona+Modal serverless persistence; the matrix doesn't establish other backends as "ephemeral" or Docker / Singularity / Vercel Sandbox as "remote-ephemeral." Drop the 2D grid; use only matrix-backed labels.
3. **STRUCTURAL §11/§17, Fig 7 — "persistent memory" overclaims row 16.** Row 16 backs persisted *session transcripts* (JSONL) and conversation/session context, not "persistent memory" in the adaptation-dial sense (which is a rung toward skills/self-improvement). Replace with "persistent sessions" wording.
4. **STRUCTURAL Fig 2 — "Discord" channel label still under-backed.** Row 7's sandbox-deny-list mention isn't first-class evidence Discord is a first-class inbound channel adapter. Drop "Discord" or add a primary-source row.
5. **COSMETIC §13 cross-reference — too weak after Run 1's weakening.** "Natural skill/plugin counterpart in the adaptation lane" no longer makes a concrete technical connection; mostly repeats §4. Either rewrite to do real contrast work or drop.

**Run 2 fixes applied** (4 STRUCTURAL + 1 COSMETIC; all closed):
- **R2-F1**: §10 prose + Figure 4 caption + §11 close + §18 close + Figure 7 caption now honestly name the off-axis bets. Each Claw variant carries a two-tier annotation on Figs 4 & 7 — in-axis label plus "off-axis bet: <X>" callout for variants whose distinctive concern lives off the three-dial map. The off-axis honesty is itself part of the taxonomy-failure point.
- **R2-F2**: Figure 6 simplified to a 1D backend list in README order (local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox) with a single annotated callout grouping Daytona + Modal as the matrix-backed serverless-persistence niche per row 34. No editorial 2D axes.
- **R2-F3**: §11, §17 (Hermes-lands), Figure 7 caption — every "persistent memory" reference applied to OpenClaw rewritten as "persistent sessions" or "persistent session transcripts" per row 16's actual support.
- **R2-F4**: Figure 2's channel labels reduced to row 16's matrix-backed categorical labels only (DM, group chat, cron job). "Discord" dropped.
- **R2-F5 (COSMETIC)**: §13 cross-reference dropped entirely; the §4 callback is now the only inline link to the Claude Code plugin post in the outline. The post still appears in `## References` per the related-posts rule.

Run 2 fixes are precision tightening — none touches the post's spine. Re-running Gate 1 (Run 3, **third and final invocation under the gate-runner cap**) per the protocol.

**Gate 1 Run 3 (2026-05-08).** Re-fired with Run 2 fixes applied. **Findings: 3 STRUCTURAL, 0 COSMETIC, 0 TYPE-CHANGE STRUCTURAL.** All three were residual wording gaps from Run 2 fixes (places where Run 2 fixed the new wording but adjacent older wording survived):

1. **STRUCTURAL §5** — the throughline close still said "each was designed around a different distinctive dial," contradicting the Run-2 off-axis honesty applied in §10/§11/§18/Figs 4 & 7.
2. **STRUCTURAL Related-posts §13 anchor** — the `## Related posts on augusteo.com` Claude Code plugin entry's anchor point #2 still instructed drafters to link at §13 with the "same agentskills.io standard" framing. That was the unsupported Run 1 finding, weakened in Run 1, dropped in Run 2 — but the related-posts instruction lived on and could reintroduce the bad claim during Phase 4 drafting.
3. **STRUCTURAL §16/Fig 6 residual grid echoes** — §16's "Reader can now" still said "tell which backend they want for which tradeoff" and the Phase 5 figure-progress table still labeled Figure 6 as "execution-surface × persistence axes" — both resurrecting the Run 2 overclaim.

All 3 STRUCTURAL findings are direct + inspection-verifiable wording-precision fixes (not content disagreements). **Per the Gate 0 Run 3 precedent: the cleanest path is to apply the fixes and close the gate rather than burn the Step-6 escape hatch on a wording iteration.** Run 3 was the third invocation under the gate-runner cap-of-3; re-running for Run 4 would fire the Step-6 escape hatch.

**Run 3 fixes applied** (all 3 STRUCTURAL closed):
- **R3-F1**: §5 throughline-close rewritten — "the placements scatter, and several Claw variants' distinctive bets sit *off* the three dials entirely. We'll annotate those off-axis concerns where they appear; the dial map handles what it can."
- **R3-F2**: `## Related posts on augusteo.com` anchor point #2 (the §13 / agentskills.io instruction) struck through and explicitly marked **SUPERSEDED**, with a "do NOT add a second inline link to the Claude Code plugin post in §13 or anywhere else in Act 3" instruction for Phase 4 drafters.
- **R3-F3**: §16's "Reader can now" rewritten to "identify the seven README-listed backends and the documented Daytona/Modal serverless-persistence niche per row 34" with footnote noting why the prior tradeoff wording was tightened. Phase 5 figure-progress table label for Figure 6 changed from "execution-surface × persistence axes" to "1D README-order list + Daytona/Modal persistence callout."

**Cap-of-3 hit. Gate 1 closes on structural-fixed.** Phase 3 is now complete; Phase 4 (draft prose) starts next.

**Gate 1 final state:** 14 STRUCTURAL findings closed across 3 runs (7 Run 1 + 4 Run 2 + 3 Run 3); 2 COSMETIC findings closed (1 Run 1 + 1 Run 2); 0 TYPE-CHANGE STRUCTURAL — static-svg choice for every figure was reaffirmed in all three runs. The post's spine — three-dial framing with the running-scenario in Act 1, OpenClaw + Claw family in Act 2, Hermes in Act 3, closing matrix — was endorsed structurally by codex. Run 1 fixes substantively reframed the Claw family (scatter, not cluster) and Act 1 (single running scenario, not three separate failure cases); Runs 2 + 3 tightened wording precision around the Run 1 reframings. The outline is locked.

[full findings: `notes/openclaw-and-hermes-agent-codex-outline-20260508.md` — Run 1 + Run 2 + Run 3 verbatim outputs all archived there]

## Codex final review

*Populates after Gate 2 fires (Phase 7).*

## Resume here

Last touched: 2026-05-09 (Phase 5 done: all 7 static-svg figures landed; one figure per commit per skill rule #7; voice-check clean apart from the 3 exempt act-divider em-dashes; visual smoke-test via playwright across all figures; one rendering bug fixed mid-Phase-5 — `~/code` paths in Fig 3 were being parsed as GFM strikethrough, fixed via `{"..."}` JSX expression wrap — and one cosmetic fix to Fig 5 — EXTERNAL · PLASTIC LABS · AGPL-3.0 badge moved below Honcho box and tightened so the text fits its width).

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check + Gate 0 | done (3 runs; 12 STRUCTURAL + 2 COSMETIC closed) | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com`, `## Codex research review` |
| 3. Outline + figure list | done (Gate 1 closed at cap-of-3 on structural-fixed; 14 STRUCTURAL + 2 COSMETIC across 3 runs) | `## Outline`, `## Codex outline review` |
| 4. Draft prose | done (18 sections + References + inline hyperlinks; one section per commit; voice-check clean) | `src/content/blog/openclaw-and-hermes-agent/index.mdx` (~401 lines, 7 figure TODOs awaiting Phase 5) |
| 5. Implement figures | done (7/7; static-svg only; one figure per commit; visual smoke-test passed; 1 MDX-strikethrough fix + 1 layout polish) | `src/content/blog/openclaw-and-hermes-agent/index.mdx` (~828 lines, 0 figure TODOs) |
| 6. Playwright review | pending | per-figure-type playwright checks per `playwright-checks.md` |
| 7. Freshness pass + Gate 2 + ship | pending | hero image, dev verification, ship |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
| 2026-05-08 | Spec consult (pre-Phase-1-lock) | structural fixes applied — single-axis lifespan ladder rejected, three-dial framing locked | section `## Codex spec consult` below |
| 2026-05-08 | 0 Run 1 (research) | 6 STRUCTURAL + 1 COSMETIC; structural fixes applied | `notes/openclaw-and-hermes-agent-codex-research-20260508.md` |
| 2026-05-08 | 0 Run 2 (research) | 5 STRUCTURAL (research-notes drift from Run 1 matrix fixes) + 1 COSMETIC (rows 17/19/25/26 quote cells); structural fixes applied | `notes/openclaw-and-hermes-agent-codex-research-20260508.md` (Run 2 appended) |
| 2026-05-08 | 0 Run 3 (research) | 1 STRUCTURAL (row 31 / line 109 wording-precision: aggregate `all`/`termux` extras include `hermes-agent[honcho]`); fix applied. Cap-of-3 hit; Gate 0 closes on structural-fixed. | `notes/openclaw-and-hermes-agent-codex-research-20260508.md` (Run 3 appended) |
| 2026-05-08 | 1 Run 1 (outline) | 7 STRUCTURAL + 1 COSMETIC, 0 TYPE-CHANGE STRUCTURAL; all 7 STRUCTURAL fixes applied (scatter-not-cluster reframing of §10/§11/Figs 4 & 7; §17 dropped + content redistributed; §9 trimmed to naming history; Fig 6 axes resourced; Act 1 collapsed to single running scenario; Fig 2 channel labels matrix-backed; §13 cross-reference weakened); COSMETIC fix applied (Figs 1-3 merged into Fig 4). 19 sections → 18; 10 figures → 7. | `notes/openclaw-and-hermes-agent-codex-outline-20260508.md` |
| 2026-05-08 | 1 Run 2 (outline) | 4 STRUCTURAL + 1 COSMETIC, 0 TYPE-CHANGE STRUCTURAL; all precision-tightening on Run 1 fixes. R2-F1 off-axis bets honestly named (§10/§11/§18, Figs 4 & 7); R2-F2 Fig 6 simplified to 1D README-order list; R2-F3 "persistent memory" → "persistent sessions" for OpenClaw (§11/§17/Fig 7); R2-F4 "Discord" dropped from Fig 2. COSMETIC R2-F5 §13 cross-reference dropped entirely. Static-svg choice reaffirmed by codex. | `notes/openclaw-and-hermes-agent-codex-outline-20260508.md` (Run 2 appended) |
| 2026-05-08 | 1 Run 3 (outline) | 3 STRUCTURAL, 0 COSMETIC, 0 TYPE-CHANGE STRUCTURAL; all residual wording gaps from Run 2 fixes. R3-F1 §5 throughline-close rewritten (the off-axis honesty hadn't propagated to §5 from §10/§11/§18); R3-F2 related-posts §13 anchor superseded (drafter instruction still live); R3-F3 §16 "Reader can now" + Phase 5 figure-progress label tightened (residual tradeoff-grid echoes). All direct + inspection-verifiable wording fixes. **Cap-of-3 hit; Gate 1 closes on structural-fixed.** Static-svg choice reaffirmed for all 7 figures. | `notes/openclaw-and-hermes-agent-codex-outline-20260508.md` (Run 3 appended) |

### Phase 5 figure progress

Figure list locked at end of Phase 3 (2026-05-08), then **revised after Gate 1 Run 1** which collapsed Figures 1-3 into Figure 4 per finding 8 (10 figures → 7) and revised Figure 6 (was 9) axes per finding 4. All 7 are `static-svg`; static-default rule justification appears in `## Outline` → "Static-default rule justification." Section anchors are locked here so figure-implementation commits can land per-figure without re-deriving placement.

| # | Figure | Type | Section | Status | Commit |
|---|---|---|---|---|---|
| 1 | ThreeDialMap (with running-scenario annotation) | static-svg | §5 (Act 1 close) | done | 39e328b |
| 2 | OpenClawArchitecture (matrix-backed channel labels) | static-svg | §6 | done | 291ec8c |
| 3 | OpenClawSandboxTiers | static-svg | §8 | done | c1a8106 (+ 5cb9048 strikethrough fix) |
| 4 | ClawFamilyOnDials (scatter, not cluster) | static-svg | §10 | done | f112012 |
| 5 | HermesClosedLoop | static-svg | §12 | done | 0de57f6 (+ 6bb29cf badge polish) |
| 6 | HermesTerminalBackends (1D README-order list + Daytona/Modal persistence callout) | static-svg | §16 | done | a34cce9 |
| 7 | FinalDialMap (all frameworks placed; scatter) | static-svg | §18 (closing) | done | 2b534cb |

Codex Gate 1 Run 1 explicitly endorsed the static-svg choice for every figure: "the static-svg choice is defensible for every listed figure under the stated override rules." No TYPE-CHANGE STRUCTURAL findings; per-figure-type unlock protocol did not fire.

### Suggested next batch

**Phase 5 done. Phase 6 (playwright per-figure visual review) starts next.**

All 7 static-svg figures are landed and committed. Visual smoke-test via the playwright MCP server passed across all figures at the post route (`http://localhost:4321/blog/openclaw-and-hermes-agent`). Two issues caught and fixed during smoke-test:
1. Fig 3's `~/code, ~/Documents` and `~/.ssh, ~/.aws, ~/.cache` triggered MDX/GFM strikethrough parsing (single-tilde pairs). Wrapped in `{"..."}` JSX expressions to bypass markdown parsing inside the SVG `<text>` elements.
2. Fig 5's `EXTERNAL · PLASTIC LABS · AGPL-3.0` badge above the Honcho box overlapped with the "next task arrives" loop annotation, AND the badge text overflowed its 140px width. Moved badge below the Honcho box; widened to 174px; reduced to font-size 8 with no letter-spacing.

Phase 6 step-by-step:

1. **Phase 6 step 1** — read `playwright-checks.md` to load the per-figure-type checks (universal + static-svg specific).
2. **Phase 6 step 2** — `bun run dev` and navigate to `http://localhost:4321/blog/openclaw-and-hermes-agent` via the playwright MCP server.
3. **Phase 6 step 3** — for each of the 7 figures: scroll into view, snapshot, run universal checks (no overflow, no clipping, labels legible at column width, captions render, no console errors) AND static-svg checks (palette adherence, font stack, viewBox aspect, figcaption shape).
4. **Phase 6 step 4** — if a figure fails a check, edit the SVG inline in the MDX; re-snapshot. Halt if any single figure fails three times in a row (skill halt rule).
5. **Phase 6 step 5** — when all 7 pass, mark Phase 6 done; proceed to Phase 7.

**Already smoke-tested in Phase 5** (catches above already address the obvious failure modes):
- Fig 1 ThreeDialMap: v1/v2/v3/v4 markers at correct rungs; arrows point right way; all three columns aligned. ✓
- Fig 2 OpenClawArchitecture: gateway-as-center renders; channels feed in correctly; agents/sessions/tools layered correctly. ✓
- Fig 3 OpenClawSandboxTiers: three-panel side-by-side; allow/deny lists legible; workspace-modes inset table renders post-fix. ✓
- Fig 4 ClawFamilyOnDials: 5 frameworks scatter (no cluster); legend with peterwoods contradictions in red/rust; *sessions footnote on OpenClaw adaptation. ✓
- Fig 5 HermesClosedLoop: circular flow; 5 nodes; Honcho purple-bordered with EXTERNAL badge below post-fix; 5 arrows clockwise. ✓
- Fig 6 HermesTerminalBackends: 7 backends in README order; Modal+Daytona highlighted with bracket+callout; no 2D grid. ✓
- Fig 7 FinalDialMap: 6 frameworks placed; Hermes alone at skill creation; legend with on-dial vs off-axis bets distinguished. ✓

Phase 6's incremental value over Phase 5's smoke-test is per-figure-type rigor (the static-svg checklist in `playwright-checks.md` is more thorough than what I ran by eye), and a final pass across all 7 figures in one playwright session.

### How to resume from a fresh context

1. Read this file end-to-end. Spec / Throughline / Research notes / Claim-source matrix / Outline / Codex review sections carry every locked-in choice.
2. Run resume-mode migration if any v2 sections are missing (this file was written under v2 so should be canonical).
3. `git log --oneline | head -30` to see commits since the spec commit.
4. `grep -n TODO src/content/blog/openclaw-and-hermes-agent/index.mdx` for remaining placeholders (8 TODOs as of 2026-05-08: 1 hero image in frontmatter awaiting Phase 7, 7 figure placeholders awaiting Phase 5).
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
