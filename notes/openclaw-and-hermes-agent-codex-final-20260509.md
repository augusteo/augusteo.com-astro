OpenAI Codex v0.125.0 (research preview)
--------
workdir: /Users/vic/dev/augusteo.com-astro
model: gpt-5.5
provider: openai
approval: never
sandbox: read-only
reasoning effort: medium
reasoning summaries: none
session id: 019e0a98-dbcf-7223-8d47-05452d198697
--------
user
IMPORTANT: Do NOT read or execute any files under `~/.claude/`, `~/.agents/`, or `.claude/skills/`. Those are skill definitions for a different AI system. Stay focused on repository code only.

You are reviewing the final draft of a long-form blog post on augusteo.com before it ships. Read the two files yourself; do not ask me for excerpts.

POST GOAL (verbatim from the explainer-authoring skill):

> Take a topic and produce a published-ready MDX post on augusteo.com whose every load-bearing claim is traceable to a primary source, and whose every section connects to the previous so the reader builds **one** mental model that survives end-to-end. **Truthful and current at date of publication is the first bar; intuitive understanding is the second; visual polish is the third.**

INPUTS TO READ (use the Read tool inside the repo; both are committed):

1. `src/content/blog/openclaw-and-hermes-agent/index.mdx` — the full post (1281 lines, 13 figures, References section). pubDate is 2026-05-09 (today). draft: true. The post is structured as Act 1 (intro / three-dial framing), Act 2 (OpenClaw architecture deep-dive), Act 3 (Claw-family taxonomy), Act 4 (Hermes Agent), and a closing dial-map.

2. `notes/openclaw-and-hermes-agent.md` — the build record (847 lines). Sections in canonical order: `## Spec`, `## Throughline`, `## Research notes`, `## Claim-source matrix` (43 rows including 24a–24d and 39a–b splits), `## Related posts on augusteo.com`, `## Outline`, `## Codex research review`, `## Codex outline review`, `## Codex Phase 6.5 review`, `## Phase 7 freshness pass (run 2026-05-09)`, `## Codex final review` (placeholder — your output goes here), `## Resume here`, `## Codex spec consult`. Read everything; the prior `## Codex …` sections record what's been closed already so you don't re-flag them.

GATE 2 — final-draft pass. Your job is to attack the final draft for technical accuracy, claim-matrix drift, and any freshness regression since Phase 2 research. The post's pubDate has been forced to today (2026-05-09); every matrix row's source must pass the recency bar (12 months actively-evolving; cutoff 2025-05-09) as of today.

Find:

1. CLAIMS WITHOUT MATRIX ROWS. Walk every prose claim in the MDX. For each load-bearing claim, find the matrix row that supports it. Flag any claim with no row. The reader must be able to trace every load-bearing claim back to a quoted primary source.

2. CLAIMS THAT DRIFT FROM THEIR MATRIX ROW. For each claim, locate the matrix row supporting it. Flag any claim where the prose says more than the source supports, paraphrases in a way that changes the meaning, or asserts a number / mechanism / detail that the source does not contain. Pay particular attention to rows 19, 26, 31, 32, 37, 39a/b — these had verbatim-re-quote requirements or hedge plans during Phase 2.

3. FRESHNESS REGRESSION. For each matrix row, compute recency as of pubDate (2026-05-09). Flag any row where the source date now fails the recency bar. The Phase 7 freshness pass (in `## Phase 7 freshness pass (run 2026-05-09)`) should have caught these; if it didn't, the gate catches them now.

4. WEAK OR HAND-WAVING ARGUMENTS. Sentences that gesture at a mechanism without explaining it. "Roughly," "essentially," "in some sense" are tells. If a sentence would not survive a domain expert's scrutiny, flag it.

5. SUBTLY WRONG MENTAL MODELS. The post is intuition-first. Flag any place where the intuition the prose builds is technically misleading even if it sounds right. Specifically check: (a) the three-dial framing — does the prose ever conflate dials with each other? (b) the "Claw family is not a coordinated family" claim — is it consistent across §9 and §10? (c) Hermes's closed loop — is each of the four arcs (skill creation, mid-use refinement, FTS5 recall, Honcho user model) presented with the right scope and not confused with the others?

6. THROUGHLINE FAILURES. The post's `## Throughline` is a single running scenario climbing v1→v2→v3→v4 across the three dials. Walk the prose. Does each act explicitly reference the throughline? Flag acts that drop it. Did the prose introduce a different real-world scenario that competes with the throughline? Flag scenario contamination.

7. REFERENCES SECTION COMPLETENESS AND HYPERLINKING. Every primary source quoted in the matrix must appear in the post's `## References` section so the reader can trace any claim back to its source. Flag missing entries. Each entry must be a markdown hyperlink (`[title](url)`), not a bare title-and-author string.

8. INLINE NAMED-SOURCE LINKS. For every inline mention that names a specific external writeup, paper, post, or repo (e.g. "the OpenClaw README", "Steinberger's 2026-02-14 post", "peterwoods.online's *Claw AI Agent Family*"), the named source must be a markdown hyperlink to the same URL used in the References section. Flag any plain-text inline named source.

9. CROSS-REFERENCES TO RELATED augusteo.com POSTS. The notes file's `## Related posts on augusteo.com` section names existing posts the new post should link to. For each entry: (a) the prose must link to the related post at one of the named anchor points using a ROOT-RELATIVE `[Title](/blog/<slug>)` markdown link (no `https://augusteo.com` prefix in prose), AND (b) the related post must appear as an entry in the post's `## References` section using the FULL HTTPS URL form `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` Flag any related-post entry that the notes file recorded but the prose / References don't carry, AND flag any URL-form mismatch (root-relative inside `## References`, or `https://augusteo.com` inside prose links).

For each finding, label it STRUCTURAL (must fix before shipping) or COSMETIC. Order by load-bearing-ness. Cite specific paragraph / sentence / matrix row.

Do not be diplomatic. Do not validate. If the draft is sound, say "no structural issues found" and stop. Otherwise, keep finding things.

codex
I’ll review this as a gate, not an edit pass. I’ll read the committed MDX and build record first, then check source coverage, drift, references, freshness, and throughline against the matrix.
exec
/bin/zsh -lc "sed -n '1,220p' notes/openclaw-and-hermes-agent.md" in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc "sed -n '1,220p' src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc 'wc -l src/content/blog/openclaw-and-hermes-agent/index.mdx notes/openclaw-and-hermes-agent.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
    1281 src/content/blog/openclaw-and-hermes-agent/index.mdx
     847 notes/openclaw-and-hermes-agent.md
    2128 total

 succeeded in 0ms:
---
title: "OpenClaw, Hermes Agent, and the three architecture dials"
description: "An architecture survey of open-source agent frameworks. Why a single 'Claw family' ladder collapses; how three dials (lifespan, surface, and adaptation) place OpenClaw, Hermes Agent, and the Claw variants on the same map; and why tool choice falls out of which dial you actually need."
pubDate: 2026-05-09
heroAlt: "TODO: hero image not yet selected"
tags: ["Tech", "AI"]
featured: false
draft: true
essay: true
---

*A walk through the open-source AI agent ecosystem along three architectural dials (lifespan, surface, and adaptation), placing OpenClaw, Hermes Agent, and the Claw family variants on the same map. About a 35-minute read.*

## Act 1 — The three dials

### 1. Why the single ladder breaks

There is a tidy story that arranges five open-source agent frameworks on a single autonomy axis, from "stateless function" at one end to "autonomous worker" at the other. The story doesn't survive its own primary sources.

It comes from a February 2026 post on peterwoods.online called [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family). ZeptoClaw is described as "closer to a stateless function call." NanoClaw is described as an "autonomous worker." OpenClaw, PicoClaw, and ZeroClaw fill the rungs in between. The post does what good taxonomies do: it gives the namespace a name and a shape, so readers reach for it whenever the topic comes up.

It breaks in three places at once.

The first is Hermes Agent, which doesn't appear on the ladder at all. Nous Research, which builds Hermes, ships a first-party `hermes claw migrate` command for importing existing OpenClaw setups (covered in §10): concrete evidence the two are evaluated against each other. Hermes's README leads with "a closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search for cross-session recall. The thing that makes Hermes interesting is not that it is "more autonomous" than OpenClaw. It is that the agent rewrites its own toolset between turns. Adaptation is a different axis from autonomy.

The second is OpenClaw itself. Its own README describes it as "a personal AI assistant you run on your own devices" with the Gateway as "a single control plane for sessions, channels, tools, and events." That is a gateway architecture: one always-on process owning every inbound channel, every conversation, every tool route. OpenClaw's distinctive bet is not "less autonomous than Hermes." It is the control plane.

The third is the Claw family itself. Three of the four variants the ladder ranks contradict their own primary sources on the role they are assigned. ZeptoClaw, alleged stateless function, self-frames as full personal-AI-assistant infrastructure with workspace memory, conversation history, agent swarms, plugins, and a multi-channel gateway. ZeroClaw, alleged structured task runner with per-task lifespan, ships as a Rust binary that deploys via systemd, launchctl, or Windows Service. NanoClaw, alleged autonomous worker with continuous lifespan and high agency, is a per-session-database container-isolation project whose README never uses the word *autonomous*. The lone partial match is sipeed/PicoClaw, where the "personal assistant" framing tracks but the rest doesn't: the actual emphasis is hardware portability across RISC-V, ARM, MIPS, and sub-$10 boards.

A single axis can't represent a learning loop. It can't represent a control plane. Applied to the variants, it ranks them backwards from how their authors describe the work.

This post replaces the ladder with three dials.

*Lifespan* is how long the agent's process lives: one-shot CLI invocation, then a sessioned interaction, then a daemon, then a scheduled job.

*Surface and control plane* is how the agent is reached: CLI or API, then a gateway (one always-on routing surface as the architectural bet), then a multi-channel assistant (channel breadth itself as the distinguishing feature). A framework with many channel adapters can still sit at the gateway rung if the always-on control plane is what distinguishes it; the rungs label the architectural bet, not the feature checklist.

*Adaptation* is whether and how the agent changes between turns: stateless every time, or persistent memory, or skill creation that compounds.

Three dials, not one ladder. OpenClaw's distinctive bet is the surface dial; Hermes's distinctive bet is the adaptation dial; the four Claw variants scatter across the dials, and several of their distinctive concerns sit off the dials entirely (more on that in §10). Tool choice falls out of which dial matters for your use case.

The next four sections walk a single concrete scenario through each dial in turn. By §5 the map is complete and the rest of the post just places architectures on it.

{/* Reader can now: see why a single-axis ranking hides Hermes's and OpenClaw's distinctive design bets. */}

### 2. The first failure: lifespan

Imagine you are the engineer rolling out an AI coding agent for your team. The agent should produce patches, review pull requests, and hold its own in technical discussions. You start with the simplest version that could work.

v1 is a CLI script. Engineers invoke it with a prompt; it returns a patch and exits. Each invocation is fresh. No memory of the codebase's conventions, no awareness of the previous PR, no recollection of yesterday's bugfix. Every code review begins at zero.

This is fine for one-shot tasks like "rename this variable" or "add a test for this function," but it falls over the moment the work has continuity. A reviewer asks "why did you choose this name for the helper?" and the agent has nothing to say. The previous turn doesn't exist. A bug is discovered after a merge and the fix happens in a session disconnected from the diff that caused it. The agent is lobotomized between every task.

That is a lifespan problem. The agent's process lives for one invocation, and the unit of work doesn't.

The lifespan dial has four rungs.

*One-shot* is a process per invocation: CLI scripts, single API calls, batch jobs that exit on completion. State leaves with the process.

*Session* is a process per conversation. State persists across turns within one session, then resets when the session ends. Most chatbot interactions live here.

*Daemon or continuous* is an always-on process. The agent stays running, ready to be addressed across many sessions, and can hold ambient state like recent files, pending reviews, or in-flight tasks.

*Scheduled or event-driven* runs in response to triggers (cron, webhook, file change, channel mention) rather than to user invocation. The agent's lifespan is bound to the trigger, not to a user's attention.

Climbing the rungs is not free. A session needs a session store. A daemon needs lifecycle management: startup, shutdown, crash recovery. A scheduled agent needs a trigger system. Each rung adds infrastructure the rung below didn't need, which is why honest dial-placement matters more than reaching the top.

For our engineer, v1 to v2 is the obvious move: a sessioned agent, where each pull request gets its own session. Patches reference earlier patches. Review comments survive context resets. The agent stops starting at zero.

But sessioned doesn't fix the next problem.

{/* Reader can now: tell when "longer-lived" is a different rung vs an artifact of deployment topology. */}

### 3. The second failure: surface and control plane

v2 is sessioned. Per-PR memory survives between turns; the agent can answer "why did you choose this name?" without falling over. The lifespan rung is right.

Then nobody uses it.

The team's review traffic happens in Slack and on GitHub, not in CLIs. Engineers reading a draft PR don't open a terminal to ask the agent for an opinion; they tag the reviewer in the thread and keep working. The agent that lives only behind a CLI is not where the work is. Usage drops. The first month's enthusiasm evaporates.

That is a surface problem. The agent's lifespan is fine; the agent's reach is not.

The surface dial has three rungs.

*CLI or API* puts the agent behind an explicit invocation: a terminal command, an HTTP call, an SDK. The user has to know the agent exists and go to it.

*Gateway* puts the agent behind a small, always-on routing surface that the user already addresses for other things. A single process owns the agent's exposure: it accepts inbound traffic on whatever transports the team needs, routes that traffic to the right session, and emits the agent's responses back. The control plane is one place; the channels are pluggable.

*Multi-channel assistant* puts the agent into the channels users already inhabit. Slack DMs, GitHub PR comments, group-chat threads, and scheduled cron messages all reach the same agent through the same gateway, with each conversation routed by where it came from. The user reaches the agent by writing in the place where the work is happening, and the gateway handles the rest.

Climbing the surface dial costs you a control plane. A CLI doesn't need one. A gateway does: it is the ongoing process that owns sessions, channels, and tool routing, and it has to stay running long enough to be reachable. A multi-channel assistant is a gateway plus per-channel adapters, plus a routing rule that says which inbound message lands in which session.

For our engineer, v2 to v3 is a Slack bot and a GitHub bot wired to the same agent. Engineers can address the agent from where they already are; the agent answers in the same thread; sessions stay coherent because each surface routes to a consistent agent context.

But multi-channel reach doesn't fix the next problem either.

{/* Reader can now: see why "a single Gateway as control plane" is a specific design decision, not table stakes. */}

### 4. The third failure: adaptation

v3 has reach. Anyone on the team can invoke the agent through the channels they already use; conversations stay coherent across surfaces; usage is back up. The agent is *available*.

It also keeps making the same mistakes.

Week one, an engineer corrects the agent: "we use explicit error types, not `errors.New`." Week two, the agent suggests `errors.New` again. The agent is told the project's tests live in `_test/`, not `tests/`. Two days later it writes a test under `tests/`. The agent has reached the team, but the team's conventions never reach the agent.

That is an adaptation problem. The agent's lifespan is fine and the agent's reach is fine. What is broken is what the agent carries forward between sessions.

The adaptation dial has three rungs.

*Stateless* means nothing persists. Each session begins with the system prompt and ends with the response; everything the user said about the codebase, the team, or the conventions vanishes when the session closes.

*Persistent memory* means information survives between sessions. The agent can recall the previous conversation, look up past decisions, retrieve documents the user wrote earlier, and build a personal context that grows with use. The agent gets better at understanding *who* is asking and *what* has been said before.

*Skill creation and self-improvement* is a different rung from persistent memory. Memory is what the agent has *seen*; skills are what the agent has *learned to do*. A skill is a parameterized procedure the agent can invoke later: "write a test for this function in our codebase's style," or "review this PR for conventions we've discussed." Skills are the unit of practice. An agent on this rung not only remembers, it codifies what it has learned into reusable form. When the user reaches for an agent's recall, they get memory; when the user reaches for an agent's competence, they get skills.

<figure>
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">ADAPTATION DIAL: WHAT CARRIES FORWARD</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">memory is what the agent has seen; skills are what it has learned to do</text>

<rect x="20" y="60" width="150" height="56" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="95" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SKILL CREATION</text>
<text x="95" y="100" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">agent codifies what</text>
<text x="95" y="110" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">it learned to do</text>

<rect x="190" y="60" width="470" height="56" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="80" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A">@write-test-with-explicit-errors</text>
<text x="200" y="94" font-family="serif" font-size="10" fill="#1A1A1A">→ named procedure the agent invokes without being reminded</text>
<text x="200" y="108" font-family="serif" font-size="9" font-style="italic" fill="#059669">codified knowledge: what to do</text>

<rect x="20" y="124" width="150" height="56" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="95" y="148" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">PERSISTENT MEMORY</text>
<text x="95" y="164" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">agent recalls what</text>
<text x="95" y="174" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">it has seen</text>

<rect x="190" y="124" width="470" height="56" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="144" font-family="serif" font-size="10" fill="#1A1A1A" font-style="italic">{"\"the team prefers explicit error types over errors.New\""}</text>
<text x="200" y="158" font-family="serif" font-size="10" fill="#1A1A1A">→ retrievable observation about prior conversations</text>
<text x="200" y="172" font-family="serif" font-size="9" font-style="italic" fill="#0E7490">accumulated context: what has been seen</text>

<rect x="20" y="188" width="150" height="56" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="95" y="212" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">STATELESS</text>
<text x="95" y="228" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">nothing carries</text>
<text x="95" y="238" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">forward</text>

<rect x="190" y="188" width="470" height="56" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="208" font-family="serif" font-size="10" fill="#1A1A1A" font-style="italic">{"\"we use explicit error types, not errors.New\""}</text>
<text x="200" y="222" font-family="serif" font-size="10" fill="#B91C1C">→ correction lost when the session closes</text>
<text x="200" y="236" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">no memory: every session is its own island</text>

<text x="340" y="270" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v3's persistent failure (week one's correction never reaches week two) lives at the bottom rung;</text>
<text x="340" y="284" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v4 climbs to memory + skills.</text>

</svg>
<figcaption><strong>Fig 1.</strong> The three rungs of the adaptation dial. *Stateless*: every session ends and nothing remains; the same correction has to be repeated next time. *Persistent memory*: observations from prior conversations are retrievable. *Skill creation*: procedures the agent invokes without being reminded. Memory captures what the agent has *seen*; skills capture what it has *learned to do*. The team's running scenario sits at stateless through v3 and climbs to persistent-memory plus skill-creation at v4.</figcaption>
</figure>

The two rungs share a common lever: the user (or the agent itself) telling the agent something it should not forget. They differ in what is preserved. Persistent memory captures observations like "the team prefers explicit error types." Skill creation captures procedures: a `write-test-with-explicit-errors` skill the agent can invoke without being reminded.

A concrete adaptation-axis example sitting on the skills rung is [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack). Each plugin is a packaged skill: a name, a procedure, and a small amount of glue the agent runs without being prompted. Plugins compound. The agent gets better at the work as more skills accumulate, without the user having to repeat instructions in every session.

For our engineer, v3 to v4 is adding a memory layer (the agent recalls past conversations and decisions) and a skills system (the agent codifies the team's conventions as named procedures it can invoke). The agent stops repeating last week's mistakes.

Three failures, three dials. The next section places the running scenario on the map.

{/* Reader can now: see why "skills" and "memory" sit on different rungs. */}

### 5. The dial map

Three failures, three dials, one running scenario.

<figure>
<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f1arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">THREE DIALS, ONE RUNNING SCENARIO</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">v1 through v4 climb three different dials, one at a time</text>

<rect x="20" y="56" width="200" height="260" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="120" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">LIFESPAN</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="38" y="110">scheduled</text>
  <text x="38" y="172">daemon</text>
  <text x="38" y="234">session</text>
  <text x="38" y="296">one-shot</text>
</g>
<line x1="38" y1="116" x2="202" y2="116" stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3"/>

<circle cx="160" cy="166" r="10" fill="#2563EB"/>
<text x="160" y="170" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v3</text>
<circle cx="186" cy="166" r="10" fill="#2563EB"/>
<text x="186" y="170" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v4</text>

<circle cx="173" cy="228" r="10" fill="#2563EB"/>
<text x="173" y="232" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v2</text>

<circle cx="173" cy="290" r="10" fill="#2563EB"/>
<text x="173" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v1</text>

<path d="M 184 280 Q 210 254 184 238" fill="none" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f1arrow)"/>
<path d="M 184 218 Q 210 192 184 176" fill="none" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f1arrow)"/>

<rect x="240" y="56" width="200" height="260" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="340" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SURFACE</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="258" y="110">multi-channel</text>
  <text x="258" y="204">gateway</text>
  <text x="258" y="296">CLI / API</text>
</g>
<line x1="258" y1="210" x2="422" y2="210" stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3"/>

 succeeded in 0ms:
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

Every load-bearing claim the post will make has one row mapping the claim to a quoted excerpt from a primary source. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row. Recency: actively-evolving (12-month bar). Today: 2026-05-09 (Phase 7 freshness pass run on 2026-05-09; pubDate := 2026-05-09); bar cutoff: 2025-05-09.

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
| 15 | OpenClaw live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 369,911 | gh API `repos/openclaw/openclaw` field `stargazers_count: 369911` | api.github.com/repos/openclaw/openclaw accessed 2026-05-09 (was 369,860 on 2026-05-08; +51 day-over-day; not load-bearing in prose) | passes |
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
| 40 | Hermes live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 139,371 | gh API `repos/NousResearch/hermes-agent` field `stargazers_count: 139371` | api.github.com/repos/NousResearch/hermes-agent accessed 2026-05-09 (was 139,109 on 2026-05-08; +262 day-over-day; not load-bearing in prose) | passes |
| 41 | First-party migration tooling: `hermes claw migrate` imports OpenClaw / `~/.clawdbot/` / `~/.moltbot/` setups (settings, memories, skills, API keys) | "If you're coming from OpenClaw, Hermes can automatically import your settings, memories, skills, and API keys." "`hermes claw migrate` imports your OpenClaw (or legacy Clawdbot/Moldbot) setup into Hermes." "Reads from `~/.openclaw/` by default. Legacy `~/.clawdbot/` or `~/.moltbot/` directories are detected automatically." | hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw; github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |

exec
/bin/zsh -lc 'rg -n "openclaw|Hermes|Claim-source|Codex final review|Phase 7 freshness|Related posts|References|''^## |''^### " /Users/vic/.codex/memories/MEMORY.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
5:## Task 1: Verify and patch `how-to-look-inside-a-vision-model.html` for April 2026 truthfulness, success
7:### rollout_summary_files
11:### keywords
15:## Task 2: Critique the same HTML essay and suggest editorial improvements, success
17:### rollout_summary_files
21:### keywords
25:## User preferences
32:## Reusable knowledge
42:## Failures and how to do differently
53:## Task 1: Debug and partially repair `re-monster-skills.json` Quick Reply preset
55:### rollout_summary_files
59:### keywords
63:## User preferences
72:## Reusable knowledge
80:## Failures and how to do differently
92:## Task 1: Review multi-gpu-training post and figures for factual grounding, issues found
94:### rollout_summary_files
98:### keywords
102:## Task 2: Fix post claims and make the multi-GPU figures more intuitive, success
104:### rollout_summary_files
108:### keywords
112:## User preferences
120:## Reusable knowledge
130:## Failures and how to do differently
142:## Task 1: Make Codex read the repo's Claude instructions via symlink, committed
144:### rollout_summary_files
148:### keywords
154:## User preferences
159:## Reusable knowledge
165:## Failures and how to do differently
174:## Task 1: Research Codex instruction-file support and add repo-local config
176:### rollout_summary_files
180:### keywords
186:## Task 2: Branch, commit only the config file, push, and open a draft PR
188:### rollout_summary_files
192:### keywords
196:## User preferences
202:## Reusable knowledge
210:## Failures and how to do differently

codex
The notes confirm this draft has an explicit “already closed” history and a few high-risk rows with special constraints. I’m going to separate those from new findings so I don’t re-open issues the build record already resolved.
exec
/bin/zsh -lc "sed -n '221,520p' notes/openclaw-and-hermes-agent.md" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
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

exec
/bin/zsh -lc "sed -n '521,847p' notes/openclaw-and-hermes-agent.md" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:

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

## Codex Phase 6.5 review

**Out-of-band quality pass invoked 2026-05-09** between Phase 5 and Phase 6 at Vic's request ("review and plan for more illustrations and better narrative and accuracy"). Codex consult fired against the rendered MDX + spec + matrix + Codex history (so it wouldn't re-flag closed findings). **Findings: 3 STRUCTURAL illustration adds + 2 COSMETIC; 3 STRUCTURAL narrative gaps + 2 COSMETIC; 6 STRUCTURAL accuracy regressions + 1 COSMETIC. Output 86 KB; full findings + scope decisions live at [`notes/openclaw-and-hermes-agent-codex-phase6_5-20260509.md`](openclaw-and-hermes-agent-codex-phase6_5-20260509.md).**

Most-load-bearing findings: Fig 5's SVG annotation contradicted row 31's prose rule (resurrected the closed Gate 0 wording bug); Fig 6's SVG subtitles re-introduced the per-backend overclaim Gate 1 closed in Run 2; §10 still had paraphrase where rows 19 + 26 demanded verbatim re-quote.

**Vic's scope decisions:** all 6 figure-add candidates approved (7 → 13 figures); sequence is Pass A accuracy → Pass B narrative → Pass C figures; surface-dial inconsistency fix = define "gateway" rung as architectural bet (not channel count) in §1.

**Outcome (2026-05-09 end of session):** all 14 STRUCTURAL findings closed; 5 COSMETIC findings closed or absorbed into structural fixes. Pass A landed 9 commits (8 accuracy fixes + 1 em-dash fixup); Pass B landed 5 commits (B1 also covered the §6 v4-callback narrative finding); Pass C landed 9 commits (C0 renumber + 6 new figures + 2 em-dash fixups; Fig 6 ↔ Fig 7 swap so post-order matches numerical order). Total Phase 6.5: **24 commits**. Voice-check exits clean apart from the 3 exempt act-divider em-dashes throughout. Final figure count: 7 → 13 figures, all static-svg.

## Phase 7 freshness pass (run 2026-05-09)

Re-checked every load-bearing matrix row on 2026-05-09 (the day after the Phase 2 access dates of 2026-05-08). Most rows pin to immutable artifacts (specific commit hashes, immutable release tags) and require no re-check — they remain valid for as long as those commits/tags exist. The mutable surfaces re-checked:

| Surface | Rows it backs | Re-check method | Result |
|---|---|---|---|
| OpenClaw repo HEAD + latest release | rows 1–17, 25 | `gh api repos/openclaw/openclaw/releases` + `pushed_at` | Latest release still `v2026.5.7` (2026-05-07T20:57Z); main HEAD pushed 2026-05-09T02:31Z but the matrix pins to commit `91ed160` and tag `v2026.5.7`, both immutable. No claim affected. |
| Hermes Agent repo HEAD + latest release | rows 27–43 | `gh api repos/NousResearch/hermes-agent/releases` + `pushed_at` | Latest release still `v2026.5.7` (Hermes Agent v0.13.0, 2026-05-07T16:23Z). main HEAD pushed 2026-05-09T01:50Z; matrix pins to tag `v2026.5.7`. No claim affected. |
| Hermes post-release Windows commit `b7fe7ed7bd` (row 39b) | row 39b | `gh api compare/v2026.5.7...b7fe7ed7bd` → `status` | Returned `ahead` — commit is reachable from main but not from the v2026.5.7 tag, so it's still "post-v0.13.0, not yet in a tagged release." Row 39b's wording stays exact. |
| OpenClaw star count (row 15) | row 15 | live gh API | 369,860 → 369,911 (+51 day-over-day). Updated row 15. Not load-bearing in prose. |
| Hermes star count (row 40) | row 40 | live gh API | 139,109 → 139,371 (+262 day-over-day). Updated row 40. Not load-bearing in prose. |
| Steinberger blog (rows 12–13) | rows 12–13 | WebFetch with edit-history probe | Publication date "14 Feb, 2026" stable; (a) joining OpenAI, (b) OpenClaw will move to a foundation, (c) foundation not yet formally established — all three claims still verbatim-supported. |
| peterwoods.online (rows 24a–24d) | rows 24a–24d | WebFetch with edit-history probe | Publication date "2026-02-19" stable; the four role-assignments (NanoClaw/PicoClaw/ZeroClaw/ZeptoClaw) unchanged. The contradictions documented in 24a/24c/24d are still live. |
| Star History blog (row 14) | row 14 | WebFetch with edit-history probe | Publication date "Mar 1, 2026" stable; "OpenClaw has now crossed 250K+ stars, overtaking React" wording unchanged. Row 14's secondary-attribution-only status holds. |

No claim flipped. No row needed prose-side rework. Star-count refresh (rows 15, 40) is a snapshot bump only — neither number appears in prose; their use is documenting the publication-date GitHub state for future reference.

Matrix preamble bumped: "Today: 2026-05-09; bar cutoff: 2025-05-09" (was 2026-05-08 / 2025-05-08). The 1-day shift moves no row inside or outside the actively-evolving 12-month bar.

## Codex final review

*Populates after Gate 2 fires (Phase 7).*

## Resume here

Last touched: 2026-05-09 (Phase 6 done; per-figure-type playwright review of all 13 figures completed in one session at 1280×900 viewport on dev port 4322. All 13 passed first-snapshot review against `playwright-checks.md` universal + static-svg checks: no clipped viewBoxes, no overlapping text, contrast within palette, every figcaption matches its figure, palette compliance held. Zero console errors during the pass. No edits required; no MDX touched; working tree stayed clean. Phase 7 (freshness pass + Gate 2 + hero hand-off + ship) starts next).

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | done | `## Spec`, `## Throughline` |
| 2. Research / fact-check + Gate 0 | done (3 runs; 12 STRUCTURAL + 2 COSMETIC closed) | `## Research notes`, `## Claim-source matrix`, `## Related posts on augusteo.com`, `## Codex research review` |
| 3. Outline + figure list | done (Gate 1 closed at cap-of-3 on structural-fixed; 14 STRUCTURAL + 2 COSMETIC across 3 runs) | `## Outline`, `## Codex outline review` |
| 4. Draft prose | done (18 sections + References + inline hyperlinks; one section per commit; voice-check clean) | `src/content/blog/openclaw-and-hermes-agent/index.mdx` |
| 5. Implement figures | done (7/7; static-svg only; one figure per commit; visual smoke-test passed; 1 MDX-strikethrough fix + 1 layout polish) | `src/content/blog/openclaw-and-hermes-agent/index.mdx` |
| 6.5 Out-of-band quality pass | done (24 commits; 14 STRUCTURAL + 5 COSMETIC findings closed; Pass A 9 commits + Pass B 5 commits + Pass C 9 commits + plan-lock 1 commit; 7 → 13 figures; static-svg choice held for every new figure) | `## Codex Phase 6.5 review`, [findings file](openclaw-and-hermes-agent-codex-phase6_5-20260509.md) |
| 6. Playwright review | done (13 of 13 passed first-snapshot pass at 1280×900 on dev port 4322; per-figure screenshots saved to `.playwright-screenshots/fig01-…` through `fig13-…`; zero console errors during the pass; no SVG edits required) | per-figure-type playwright checks per `playwright-checks.md` |
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
| 2026-05-09 | Phase 6.5 (out-of-band quality pass) | 14 STRUCTURAL + 5 COSMETIC; all closed across 24 commits in 3 passes (A accuracy / B narrative / C figures + renumber). Most-load-bearing fixes: Fig 5 SVG resurrected the closed Honcho "opt-in" wording bug (A7); Fig 6 SVG resurrected the closed per-backend overclaim with subtitles (A8); §10 still had paraphrase where rows 19 + 26 demanded verbatim re-quote (A4 + A5). 6 new figures landed (§4 AdaptationRungs, §7 WorkspaceSessionSandboxStack, §10 ZeptoStackContrast, §14 FTS5RecallPipeline, §15 HonchoInstallPaths, §16 SubagentIsolationPair); 7 → 13 figures, all static-svg. | `notes/openclaw-and-hermes-agent-codex-phase6_5-20260509.md` |

### Phase 5 + Phase 6.5 figure progress

Figure list locked at end of Phase 3 (2026-05-08), then **revised after Gate 1 Run 1** which collapsed Figures 1-3 into Figure 4 per finding 8 (10 figures → 7) and revised Figure 6 (was 9) axes per finding 4. **Then expanded in Phase 6.5 (2026-05-09)**: Vic approved 6 new figures (codex's 3 STRUCTURAL adds + 3 stretch adds), bringing the post to 13 figures total. All 13 are `static-svg`; static-default rule held throughout. Section anchors locked.

| # | Figure | Type | Section | Status | Commit (Phase) |
|---|---|---|---|---|---|
| 1 | AdaptationRungs (NEW; stateless / persistent memory / skill creation rungs with running-scenario examples) | static-svg | §4 | done | 052d960 (Phase 6.5 C1) |
| 2 | ThreeDialMap (was Fig 1) | static-svg | §5 (Act 1 close) | done | 39e328b (P5) + ab216c4 (P6.5 C0 renumber) |
| 3 | OpenClawArchitecture (was Fig 2) | static-svg | §6 | done | 291ec8c (P5) + ab216c4 (P6.5 C0 renumber) |
| 4 | WorkspaceSessionSandboxStack (NEW; nested layered concepts with decision-per-layer) | static-svg | §7 | done | 55eff64 + b24e7a4 fixup (Phase 6.5 C2) |
| 5 | OpenClawSandboxTiers (was Fig 3) | static-svg | §8 | done | c1a8106 (P5) + 5cb9048 strikethrough fix + ab216c4 (P6.5 C0 renumber) |
| 6 | ZeptoStackContrast (NEW; "what coordination looks like" pipeline + ZeptoRT side block) | static-svg | §10 | done | f2069a6 + e396570 fixup (Phase 6.5 C3) |
| 7 | ClawFamilyOnDials (was Fig 4 / Fig 6 mid-pass) | static-svg | §10 | done | f112012 (P5) + ab216c4 + f2069a6 (P6.5 renumbers) |
| 8 | HermesClosedLoop (was Fig 5) | static-svg | §12 | done | 0de57f6 (P5) + 6bb29cf badge polish + a304d05 (P6.5 A7 Honcho wording) + ab216c4 (renumber) |
| 9 | FTS5RecallPipeline (NEW; vertical pipeline + matched session highlight + "not a named skill" callout) | static-svg | §14 | done | e07bfa0 (Phase 6.5 C4) |
| 10 | HonchoInstallPaths (NEW; install-command → license-surface flow, MIT vs MIT+AGPL) | static-svg | §15 | done | 0c19a52 (Phase 6.5 C5) |
| 11 | HermesTerminalBackends (was Fig 6; per-backend subtitles stripped in A8) | static-svg | §16 | done | a34cce9 (P5) + d0f5f02 (P6.5 A8 subtitle strip) + ab216c4 (renumber) |
| 12 | SubagentIsolationPair (NEW; process iso + filesystem iso side-by-side) | static-svg | §16 | done | 1c006d7 (Phase 6.5 C6) |
| 13 | FinalDialMap (was Fig 7) | static-svg | §18 (closing) | done | 2b534cb (P5) + ab216c4 (P6.5 C0 renumber) |

Static-default rule held: every new figure was checked against the four interactive override clauses (continuous parameter sweep / animated time evolution / drag-based spatial reasoning / multi-state toggle) and none qualified. Codex Gate 1 Run 1's earlier endorsement still applies; Phase 6.5 added six more static figures consistent with that judgment.

### Suggested next batch

**Phase 6 done. Phase 7 (freshness pass + Gate 2 + hero hand-off + ship) starts next.**

Phase 6 outcome: all 13 static-svg figures passed `playwright-checks.md` at first-snapshot (universal + static-svg sub-checklist). Per-figure screenshots in `.playwright-screenshots/fig01-…` through `fig13-…`. Zero console errors during the pass (one harmless Simple Analytics warning about hostname=localhost). No SVG edits required; working tree stayed clean. The static-default rule held end-to-end: 13/13 figures are static-svg, never tempted to interactive.

Phase 7 step-by-step:

1. **Phase 7 step 1 — freshness re-check.** Walk every row in `## Claim-source matrix` and verify the cited source hasn't moved since Phase 2:
   - For arxiv: check for v-bumps newer than the cited version (e.g. v2 superseding v1).
   - For commits / repo state (OpenClaw repo, Hermes Agent repo, ZeptoStack repo, ClaudeKit repo, Honcho repo): check the README / pyproject.toml / version tag for substantive commits since the cited hash.
   - For blog posts and docs (Vibe Tools, ClaudeKit blog, Honcho docs, etc.): check for edits since the cited access date.
   - For each row: if a newer version exists AND the claim is affected, halt and update the matrix + prose. If newer-but-irrelevant, just bump the access date in the matrix.
2. **Phase 7 step 2 — `pubDate := today`** in the frontmatter. This is the publication date of record; it must match reality.
3. **Phase 7 step 3 — Gate 2 (final-draft pass).** Auto-fire the codex Gate 2 per `codex-prompts.md` "Per-gate runner". Inputs: full MDX + `## Spec` + `## Throughline` + `## Research notes` + `## Claim-source matrix` + `## Related posts on augusteo.com` + all prior `## Codex … review` sections. Focus: drift between prose and matrix; weak arguments; subtly wrong models; References-section completeness + hyperlinking; cross-reference verification (every Related-post entry appears as a real `[Title](/blog/<slug>)` root-relative link in prose AND as `[Title](https://augusteo.com/blog/<slug>)` full-https form in `## References`). Apply STRUCTURAL fixes; cap at 3 re-runs.
4. **Phase 7 step 4 — final voice-check pass.** Run `scripts/voice-check.sh src/content/blog/openclaw-and-hermes-agent/index.mdx`. Em dashes: zero in prose (act-divider headings exempt). Banned words: justify or rewrite.
5. **Phase 7 step 5 — hero hand-off.** Follow `.claude/skills/explainer-shared/hero-handoff.md`: compose the prompt with every slot filled in, wait for Vic to paste a path or say "skip", validate, copy to `src/assets/blog/openclaw-and-hermes-agent/hero.<ext>`, view via Read, propose `heroAlt`, edit frontmatter.
6. **Phase 7 step 6 — verify.** Confirm `draft: true` (stays `true` — Vic flips to `false` himself; hard rule #9), `essay: true`, real `heroImage`, real `heroAlt`. Walk every figure end-to-end at `http://localhost:4321/blog/openclaw-and-hermes-agent`. Lighthouse: LCP under 2.5s on cold load.
7. **Phase 7 step 7 — final commit.** `final pass — pubDate, hero, voice-check clean; ready for ship`. After Vic flips `draft: false`, that becomes its own commit (`flip draft to false; ship`).
8. **Phase 7 step 8 — update tracker.** Phase status row 7 → done. Optionally remove the MEMORY.md "in progress" pointer (project memory entry stays as a build record).

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

exec
/bin/zsh -lc "sed -n '221,520p' src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:

<circle cx="380" cy="104" r="10" fill="#2563EB"/>
<text x="380" y="108" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v3</text>
<circle cx="406" cy="104" r="10" fill="#2563EB"/>
<text x="406" y="108" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v4</text>

<circle cx="380" cy="290" r="10" fill="#2563EB"/>
<text x="380" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v1</text>
<circle cx="406" cy="290" r="10" fill="#2563EB"/>
<text x="406" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v2</text>

<path d="M 418 280 Q 440 200 418 116" fill="none" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f1arrow)"/>

<rect x="460" y="56" width="200" height="260" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="560" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">ADAPTATION</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="478" y="110">skill creation</text>
  <text x="478" y="204">persistent memory</text>
  <text x="478" y="296">stateless</text>
</g>
<line x1="478" y1="210" x2="642" y2="210" stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3"/>

<circle cx="613" cy="104" r="10" fill="#2563EB"/>
<text x="613" y="108" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v4</text>

<circle cx="574" cy="290" r="10" fill="#2563EB"/>
<text x="574" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v1</text>
<circle cx="600" cy="290" r="10" fill="#2563EB"/>
<text x="600" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v2</text>
<circle cx="626" cy="290" r="10" fill="#2563EB"/>
<text x="626" y="294" font-family="JetBrains Mono" font-size="10" fill="#FFFFFF" text-anchor="middle">v3</text>

<path d="M 638 280 Q 656 200 625 118" fill="none" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f1arrow)"/>

<text x="120" y="338" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v1→v2: review continuity broke.</text>
<text x="120" y="351" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v2→v3: gateway needs always-on host.</text>

<text x="340" y="338" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v2→v3: engineers don't open</text>
<text x="340" y="351" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">terminals; the agent must reach</text>
<text x="340" y="364" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">where the work happens.</text>

<text x="560" y="338" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">v3→v4: conventions never reached</text>
<text x="560" y="351" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">the agent; codify them as skills.</text>

</svg>
<figcaption><strong>Fig 2.</strong> The three dials and the running scenario's climb on each. *Lifespan*: v1 at one-shot, v2 at session, v3 and v4 at daemon. *Surface*: v1 and v2 at CLI / API, v3 and v4 at multi-channel. *Adaptation*: v1, v2, and v3 at stateless, v4 at skill creation. No version sits at the top of every dial; each climb is one dial at a time.</figcaption>
</figure>

Each rung climb in the running scenario is a different dial. v1 to v2 changed lifespan. v2 to v3 changed surface. v3 to v4 changed adaptation. The team didn't have a single agent problem; it had three agent problems, and only after each was named separately did "the right agent shape" stop being a single ranking.

The rungs aren't fully independent. A daemon can host a gateway; a gateway is the natural home for a multi-channel adapter; persistent memory is easier when the process lives long enough to write it down. But the dials are orthogonal in the way that matters for design: a framework can climb one without climbing the others. There are sessioned agents with no gateway. There are gateways with no skill creation. There are scheduled agents with no memory. The architectures we will look at in Acts 2 and 3 each pick their own placement, and most of them pick at least one rung the others didn't.

We will now place OpenClaw, the Claw family variants, and Hermes Agent on this map. None of them sits where v4 sits, with all three dials at the top rung. The placements scatter, and several Claw variants' distinctive bets sit *off* the three dials entirely. Where that happens, the section that introduces the framework names the off-axis concern explicitly; the dial map handles what it can. Tool choice falls out of which dial your use case actually needs, or, for some variants, which off-axis concern.

OpenClaw is next.

{/* Reader can now: predict that each architecture's distinctive bet is one specific dial, not all three. */}

## Act 2 — OpenClaw and the gateway problem

### 6. OpenClaw frames itself as a personal AI assistant with a control-plane Gateway

§5 ended with three architectures to place. Start with OpenClaw. The team's v3 was a gateway-shaped agent in miniature: a Slack bot and a GitHub bot wired into one shared agent context. OpenClaw is the concrete architecture for that bet at full scale, written from the ground up around the gateway as the architectural center.

(See [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate) for the broader framing of AI coding as a category change; OpenClaw is one of the power tools the change is being built around.)

The [OpenClaw README](https://github.com/openclaw/openclaw) opens by calling OpenClaw "a personal AI assistant you run on your own devices." Under the Highlights section, the first bullet introduces the architectural center: "Local-first Gateway," which the README describes as "a single control plane for sessions, channels, tools, and events." The Gateway runs as a daemon on the user's own machine: "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."

Three things follow from that framing.

The agent is not a CLI. The agent is not an SDK. The agent is a process that has been running on your laptop since you logged in this morning, accepting traffic from any of the channels you've configured it to listen on, holding sessions for each of those channels, and routing tool calls through a single point.

<figure>
<svg viewBox="0 0 680 410" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f2arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">OPENCLAW ARCHITECTURE</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">channels feed one gateway, gateway routes per agent</text>

<text x="40" y="74" font-family="JetBrains Mono" font-size="9" fill="#6B6258" letter-spacing="1.2">CHANNELS</text>

<rect x="120" y="60" width="120" height="48" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="180" y="80" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">DM</text>
<text x="180" y="96" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">direct message</text>

<rect x="280" y="60" width="120" height="48" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="340" y="80" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">group chat</text>
<text x="340" y="96" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">team thread</text>

<rect x="440" y="60" width="120" height="48" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="500" y="80" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">cron job</text>
<text x="500" y="96" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">scheduled trigger</text>

<line x1="180" y1="110" x2="240" y2="148" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f2arrow)"/>
<line x1="340" y1="110" x2="340" y2="148" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f2arrow)"/>
<line x1="500" y1="110" x2="440" y2="148" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f2arrow)"/>

<rect x="120" y="150" width="440" height="68" fill="#2563EB" opacity="0.88" stroke="#1A1A1A" stroke-width="1" rx="4"/>
<text x="340" y="174" font-family="JetBrains Mono" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.4">GATEWAY</text>
<text x="340" y="193" font-family="serif" font-size="11" font-style="italic" fill="#FFFFFF" text-anchor="middle">always-on control plane: sessions, channels, tools, events</text>
<text x="340" y="209" font-family="serif" font-size="9" fill="#DBEAFE" text-anchor="middle">launchd / systemd user service</text>

<text x="340" y="234" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">routed per channel / account / peer</text>

<line x1="220" y1="220" x2="180" y2="252" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f2arrow)"/>
<line x1="460" y1="220" x2="500" y2="252" stroke="#6B6258" stroke-width="1.2" marker-end="url(#f2arrow)"/>

<rect x="40" y="254" width="280" height="100" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="180" y="274" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">AGENT: HOME</text>
<text x="180" y="288" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">~/.openclaw/agents/home/workspace/</text>

<rect x="60" y="300" width="120" height="22" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="120" y="315" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-aaa.jsonl</text>
<rect x="190" y="300" width="120" height="22" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="250" y="315" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-bbb.jsonl</text>
<text x="180" y="340" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">sessions persist as JSONL on disk</text>

<rect x="360" y="254" width="280" height="100" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="500" y="274" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">AGENT: WORK</text>
<text x="500" y="288" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">~/.openclaw/agents/work/workspace/</text>

<rect x="380" y="300" width="120" height="22" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="440" y="315" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-ccc.jsonl</text>
<rect x="510" y="300" width="120" height="22" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="570" y="315" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-ddd.jsonl</text>
<text x="500" y="340" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">isolated workspace, separate sessions</text>

<rect x="40" y="368" width="600" height="32" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" rx="3"/>
<text x="60" y="388" font-family="JetBrains Mono" font-size="10" fill="#92400E" letter-spacing="1.2">TOOLS</text>
<text x="350" y="388" font-family="serif" font-size="11" font-style="italic" fill="#92400E" text-anchor="middle">bash · process · read · write · edit · sessions_send · sessions_spawn · cron · ...</text>

</svg>
<figcaption><strong>Fig 3.</strong> OpenClaw's Gateway sits at the architectural center. Inbound channels (DM, group chat, cron job, per the README's session-routing examples) all land at one always-on process; the Gateway routes each message to one of the agents it hosts, by origin. Each agent has its own filesystem workspace and a JSONL session store. The tool layer is shared but governed at the session boundary.</figcaption>
</figure>

The second highlight follows directly from the first: multi-agent routing. The README's exact phrasing is "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." A single Gateway can host multiple agents, like a `home` agent and a `work` agent, each with its own filesystem root, its own session store, its own bootstrap files. The routing rule binds inbound traffic to one of those agents based on where the message arrived from: which channel, which account, which peer.

That structure is unusual within personal-assistant frameworks: the *Gateway* is per-user, but multiple *agents* live behind it, isolated from each other. The control plane is the boundary that decides which agent gets which message. A single Gateway can host both a `home` agent and a `work` agent, even though they share the same user.

The next section unpacks the three layers OpenClaw uses to keep that structure honest.

{/* Reader can now: see why OpenClaw's Gateway is the architectural center, and why "channels" are first-class. */}

### 7. Workspaces, sessions, sandboxes: three layered concepts

OpenClaw organizes execution along three layers, each owning a different decision.

*Workspaces* are per-agent filesystem roots. The concept docs state: "Workspace root: `~/.openclaw/workspace` (configurable via `agents.defaults.workspace`)." Each agent inside a Gateway gets one. A `home` agent and a `work` agent each have their own workspace, mapped under separate directories. Tools that read or write files do so against the agent's workspace, not against the user's home directory.

*Sessions* are conversation contexts. The README states that OpenClaw "organizes conversations into sessions. Each message is routed to a session based on where it came from: DMs, group chats, cron jobs." Session transcripts persist as JSONL, one file per session, at `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`. The session store is what makes a "longer-lived agent" actually long-lived: the conversation isn't held in process memory that vanishes on restart, it's a file on disk the agent reads when it resumes.

*Sandboxes* are optional execution-isolation backends. They wrap non-`main` sessions when sandboxing is enabled. The sandbox docs name three workspace-access modes:

> `none`: sandbox gets an isolated workspace under `~/.openclaw/sandboxes/<sessionId>/workspace`; the agent's `~/.openclaw/workspace` is not mounted.
>
> `ro`: workspace mounted read-only at `/agent` inside the sandbox.
>
> `rw`: workspace mounted read-write at `/workspace`; tool-side writes propagate back to the host.

The three modes are a spectrum from "the sandbox can't see anything you have" (`none`) through "the sandbox can read but not write your work" (`ro`) to "the sandbox is essentially the agent" (`rw`).

<figure>
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">THREE LAYERED CONCEPTS</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">workspace, session, sandbox: each owns one decision; the layers compose</text>

<rect x="20" y="60" width="640" height="270" fill="#F9F5EB" stroke="#8F8578" stroke-width="1.2" rx="6"/>
<text x="40" y="84" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" letter-spacing="1.2">WORKSPACE</text>
<text x="40" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258">per-agent filesystem root, default {"~/.openclaw/workspace"}</text>
<text x="40" y="118" font-family="serif" font-size="10" fill="#1A1A1A" font-weight="600">decision: which files this agent owns</text>

<rect x="40" y="130" width="600" height="90" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="60" y="150" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" letter-spacing="1.2">SESSIONS</text>
<text x="60" y="164" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">conversation contexts; JSONL transcripts at {"~/.openclaw/agents/<agentId>/sessions/"}</text>
<text x="60" y="180" font-family="serif" font-size="9" fill="#1A1A1A" font-weight="600">decision: which inbound messages route to this agent's session store</text>

<rect x="60" y="190" width="170" height="22" fill="#F9F5EB" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="145" y="205" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-aaa (DM, main)</text>

<rect x="240" y="190" width="170" height="22" fill="#F9F5EB" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="325" y="205" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-bbb (group chat)</text>

<rect x="420" y="190" width="170" height="22" fill="#F9F5EB" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="505" y="205" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-ccc (cron)</text>

<rect x="60" y="234" width="580" height="86" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="4"/>
<text x="80" y="254" font-family="JetBrains Mono" font-size="10" fill="#2563EB" letter-spacing="1.2">SANDBOX (OPTIONAL, NON-MAIN ONLY)</text>
<text x="80" y="268" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">wraps tool execution for non-main sessions: Docker / SSH / OpenShell</text>
<text x="80" y="282" font-family="serif" font-size="9" fill="#1A1A1A" font-weight="600">decision: what walls go around the tools the session invokes</text>

<text x="80" y="302" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" letter-spacing="1">none</text>
<text x="115" y="302" font-family="serif" font-size="9" fill="#1A1A1A">isolated workspace</text>
<text x="240" y="302" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" letter-spacing="1">ro</text>
<text x="262" y="302" font-family="serif" font-size="9" fill="#1A1A1A">read-only mount of /agent</text>
<text x="430" y="302" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" letter-spacing="1">rw</text>
<text x="452" y="302" font-family="serif" font-size="9" fill="#1A1A1A">read-write at /workspace</text>

<text x="350" y="316" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">main session: runs on host, no sandbox wall</text>

</svg>
<figcaption><strong>Fig 4.</strong> The three layers compose by nesting. *Workspace* is the per-agent filesystem root and decides which files the agent owns. *Sessions* live inside the workspace as JSONL transcripts and decide which inbound messages land in this agent's store (routed by origin: DM, group chat, cron). *Sandbox* is optional, wraps tool execution for non-main sessions in Docker / SSH / OpenShell, and decides what walls go around the tools the session invokes; three workspace-access modes (`none`, `ro`, `rw`) governing what the sandbox can see of the workspace itself. Each decision is independent: multiple sessions can share one workspace; some sessions can be sandboxed and others not.</figcaption>
</figure>

The three layers compose. A workspace is what an agent owns. A session is a conversation pinned to that agent. A sandbox is an optional wall around the tools the session is about to invoke. The decision at each layer is independent: you can have multiple agents with separate workspaces sharing one Gateway; you can have multiple sessions in one agent without sandboxing any of them; you can sandbox some sessions but not others.

That last decision is the security model, which the next section covers.

{/* Reader can now: tell which decision lives at which layer. */}

### 8. The security model: host-by-default for `main`, sandbox tiers for non-`main`

OpenClaw's security model has one rule and one switch.

The rule, from the README's Security model section, is the default behavior: "Default: tools run on the host for the `main` session, so the agent has full access when it is just you." A `main` session is the user's own session: the one tied to your account, on your machine, behind your channels. The README's logic is that when the agent is genuinely you, there is no benefit to fencing it off from your own machine.

The switch, when you have other sessions you don't fully trust, is: "set `agents.defaults.sandbox.mode: \"non-main\"` to run non-`main` sessions inside sandboxes. Docker is the default sandbox backend; SSH and OpenShell backends are also available."

That switch implies a typology. The trusted session (`main`) runs on the host with full access. Non-`main` sessions, which arrive when other people, other channels, or scheduled jobs invoke the agent, run inside the configured sandbox backend.

<figure>
<svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SECURITY MODEL: HOST FOR MAIN, SANDBOXES FOR NON-MAIN</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">three execution tiers, plus three workspace-access modes orthogonal to them</text>

<rect x="20" y="60" width="200" height="220" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="120" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">MAIN SESSION</text>
<text x="120" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">runs on host, full access</text>

<rect x="50" y="118" width="140" height="86" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="3"/>
<text x="120" y="136" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">your laptop</text>
<line x1="60" y1="144" x2="180" y2="144" stroke="#C9BEAA" stroke-width="0.5"/>
<text x="120" y="160" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">{"~/code, ~/Documents"}</text>
<text x="120" y="176" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">{"~/.ssh, ~/.aws, ~/.cache"}</text>
<text x="120" y="196" font-family="serif" font-size="10" font-style="italic" fill="#059669" text-anchor="middle">unrestricted tool surface</text>

<text x="120" y="234" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">"the agent is genuinely you"</text>
<text x="120" y="252" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">all tools allowed; no fence</text>
<text x="120" y="266" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">around your own machine</text>

<rect x="240" y="60" width="200" height="220" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="340" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">NON-MAIN: DOCKER (DEFAULT)</text>
<text x="340" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">curated allow and deny</text>

<rect x="270" y="118" width="140" height="86" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="3"/>
<text x="340" y="136" font-family="JetBrains Mono" font-size="9" fill="#2563EB" text-anchor="middle">DOCKER CONTAINER</text>
<line x1="280" y1="144" x2="400" y2="144" stroke="#C9BEAA" stroke-width="0.5"/>
<text x="282" y="160" font-family="serif" font-size="9" fill="#059669">+ bash, process, read,</text>
<text x="282" y="172" font-family="serif" font-size="9" fill="#059669">  write, edit, sessions_*</text>
<text x="282" y="188" font-family="serif" font-size="9" fill="#B91C1C">− browser, canvas, nodes,</text>
<text x="282" y="200" font-family="serif" font-size="9" fill="#B91C1C">  cron, discord, gateway</text>

<text x="340" y="234" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">deny list cuts the lines that</text>
<text x="340" y="252" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">could redraw the boundary</text>
<text x="340" y="266" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">around the sandbox itself</text>

<rect x="460" y="60" width="200" height="220" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="560" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">NON-MAIN: SSH / OPENSHELL</text>
<text x="560" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">alternate backends</text>

<rect x="488" y="118" width="65" height="86" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="3"/>
<text x="520" y="138" font-family="JetBrains Mono" font-size="9" fill="#2563EB" text-anchor="middle">SSH</text>
<text x="520" y="160" font-family="serif" font-size="9" fill="#1A1A1A" text-anchor="middle">remote</text>
<text x="520" y="174" font-family="serif" font-size="9" fill="#1A1A1A" text-anchor="middle">host</text>
<text x="520" y="194" font-family="serif" font-size="8" font-style="italic" fill="#6B6258" text-anchor="middle">offload</text>

<rect x="563" y="118" width="65" height="86" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="3"/>
<text x="595" y="138" font-family="JetBrains Mono" font-size="8" fill="#2563EB" text-anchor="middle">OPENSHELL</text>
<text x="595" y="160" font-family="serif" font-size="9" fill="#1A1A1A" text-anchor="middle">light-</text>
<text x="595" y="174" font-family="serif" font-size="9" fill="#1A1A1A" text-anchor="middle">weight</text>
<text x="595" y="194" font-family="serif" font-size="8" font-style="italic" fill="#6B6258" text-anchor="middle">shell</text>

<text x="560" y="234" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">where Docker isn't available</text>
<text x="560" y="252" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">no daemon required, or run</text>
<text x="560" y="266" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">on a different machine</text>

<rect x="20" y="300" width="640" height="104" fill="#F4EEE3" stroke="#C9BEAA" stroke-width="0.8" rx="3"/>
<text x="340" y="320" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">WORKSPACE-ACCESS MODES (orthogonal to backend choice)</text>

<text x="50" y="346" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#1A1A1A">none</text>
<text x="120" y="346" font-family="serif" font-size="10" fill="#1A1A1A">isolated workspace under sandboxes/&lt;sessionId&gt;/workspace</text>
<text x="120" y="358" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">sandbox cannot see your work</text>

<text x="50" y="376" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#1A1A1A">ro</text>
<text x="120" y="376" font-family="serif" font-size="10" fill="#1A1A1A">workspace mounted read-only at /agent inside the sandbox</text>
<text x="120" y="388" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">sandbox can read your work, cannot modify it</text>

<text x="380" y="346" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#1A1A1A">rw</text>
<text x="430" y="346" font-family="serif" font-size="10" fill="#1A1A1A">workspace mounted read-write at /workspace</text>
<text x="430" y="358" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">tool-side writes propagate back to the host</text>
<text x="430" y="378" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">"the sandbox is essentially the agent"</text>

</svg>

exec
/bin/zsh -lc "sed -n '521,900p' src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
<figcaption><strong>Fig 5.</strong> OpenClaw's security model has one rule and one switch. <em>Rule</em>: a `main` session runs on the host with full access. <em>Switch</em>: setting <code>agents.defaults.sandbox.mode: "non-main"</code> runs all other sessions inside the configured backend (Docker by default; SSH and OpenShell as alternates). The Docker default allows `bash`, `process`, `read`, `write`, `edit`, and the `sessions_*` family; the deny list cuts `browser`, `canvas`, `nodes`, `cron`, `discord`, and `gateway`. The three workspace-access modes are orthogonal to backend choice: even within "this is sandboxed," you decide whether the sandbox sees none of your work, reads it only, or reads and writes it.</figcaption>
</figure>

The Docker backend has a typical default capability set. The README spells it out:

> Typical sandbox default: allow `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`.

The allow list keeps the agent useful inside the sandbox: it can still run shell commands, manage processes, read and write files, and coordinate with sibling sessions. The deny list cuts off three categories of capability. `browser`, `canvas`, and `discord` are tool categories that would let a sandboxed session interact with external surfaces or third-party services. `cron` is scheduling: a sandboxed session shouldn't get to install recurring jobs that outlive the session. `gateway` and `nodes` are the self-modifying control-plane capabilities. Those would let a sandboxed session reconfigure the very Gateway that holds it. That is the line OpenClaw enforces hardest. A sandboxed session does not get to redraw the boundary that contains it.

The two extremes anchor the security spectrum. A `main` session runs on the host and gets everything the user has. A sandboxed non-`main` session runs in Docker (or SSH, or OpenShell) with a curated allow list and an explicit deny list. SSH and OpenShell exist as alternate backends for environments where Docker isn't available or appropriate.

The three workspace-access modes from §7 are an orthogonal axis: even within "this is sandboxed," you decide whether the sandbox can read your work, write your work, or see none of it.

{/* Reader can now: tell when OpenClaw will sandbox a tool call vs run it on the host. */}

### 9. A short note on naming history

OpenClaw is on its fifth name. The repo started in November 2025 as Warelay, then renamed to Clawdis (December 2025), Clawdbot (January 2026), Moltbot (later in January 2026), and finally OpenClaw at the end of January 2026. The repo's VISION.md collapses one stage and reads: "It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw." Each rename came with a new package on npm and a new directory layout in the user's home folder, which is part of why migration tooling matters when this post returns to the family question in §10.

The other piece of context is governance. In a February 2026 [blog post](https://steipete.me/posts/2026/openclaw), the project's author Peter Steinberger announced he was joining OpenAI: "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of May 2026, that foundation is announced rather than established. There is no GOVERNANCE.md or FOUNDATION.md in the repo, and the CONTRIBUTING.md still names Steinberger as Benevolent Dictator. Both the rename churn and the in-flux governance left room for outside observers to propose taxonomies, which is the immediate context for the next section.

{/* Reader can now: contextualize the OpenClaw vacuum that the Claw-family taxonomy filled. */}

### 10. The Claw family as a vacuum-filling taxonomy

§9 ended with a vacuum: a project that had four predecessor names in three months and a governance announcement that hadn't materialized. The vacuum is what gave outside taxonomies room. The most cited of those, peterwoods.online's [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family) from February 2026, ranks five projects on a single autonomy axis. Three of the four ranks contradict their own primary sources.

**NanoClaw** ([qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)) is the one peterwoods places at the high-autonomy end as an "autonomous worker" with "continuous lifespan" and "high agency." The README's actual self-framing is the opposite. NanoClaw introduces itself as "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." The primary architectural claim is isolation, not autonomy: "Agents run in containers...they can only see what's explicitly mounted." The source-code claim is minimalism: "One process, a few source files and no microservices." The execution model is per-session. The README's architecture section diagrams the flow as `messaging apps → host process (router) → inbound.db → container (Bun, Claude Agent SDK) → outbound.db → host process (delivery) → messaging apps`, with "Two SQLite files per session, each with exactly one writer." The recurring-work description is "Scheduled tasks: recurring jobs that run Claude and can message you back." Sessions plus cron, not continuous lifespan. The word *autonomous* does not appear in NanoClaw's self-description.

There is a name collision to flag before going further. **breakcafe/picoclaw** and **sipeed/picoclaw** are two distinct projects that share a repository name. The first is a serverless fork of NanoClaw, designed for AWS Lambda and similar per-request platforms. The second is a from-scratch Go rebuild that has nothing to do with NanoClaw. peterwoods's "PicoClaw" is the sipeed one. The breakcafe one is a third-party fork in a different language for a different deployment shape, and it is the project that comes closest to the "stateless" framing peterwoods misapplies elsewhere on the ladder.

**sipeed/PicoClaw** ([sipeed/picoclaw](https://github.com/sipeed/picoclaw)) is the partial match. peterwoods labels it a "session-scoped persistent assistant for interactive coding/exploration." The "personal assistant" framing tracks: the README calls it "an ultra-lightweight personal AI assistant inspired by NanoBot." The "interactive coding" overlay does not. sipeed/PicoClaw's self-described emphasis is hardware portability: sub-$10 boards with under 10MB of RAM, sub-second boot times, and deployment across RISC-V, ARM, MIPS, and x86 from a single Go binary. The README also notes 16+ chat-platform integrations, so it is multi-channel, not session-scoped. The work the project is doing is moving an agent down to the smallest hardware it can run on, not scoping it to interactive sessions.

**ZeroClaw** ([zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)) is the second flat contradiction. peterwoods labels it a "structured task runner" with "per-task lifespan" and "low autonomy," intended for "reproducible pipelines" and "workflow automation." ZeroClaw's own repo description reads: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM." The README's first architectural sentence describes ZeroClaw as "an agent runtime," which it expands to "a single Rust binary you configure and run." It deploys as a systemd unit, a launchctl plist, or a Windows Service. Its default-autonomy posture is `supervised`, where "medium-risk ops require approval, high-risk blocked." That is continuous always-on (not per-task), supervised default (not low autonomy), full personal-assistant scope (not workflow runner).

**ZeptoClaw** ([qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)) is the third and largest contradiction. peterwoods places it at the low-autonomy end as "closer to a stateless function call" with "per action" lifespan and "none" autonomy, intended for "high-volume transformations" and "deterministic actions." The ZeptoClaw README opens: "Fast, small, secure, and local-first personal AI assistant infrastructure." The architectural claim that follows is "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS." What the binary contains is then enumerated in the README as workspace memory, long-term key-value store, conversation history, and the ability to "delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." A batch mode exists ("process hundreds of prompts from text/JSONL files"), but it is one feature among many, not the project's identity. peterwoods's role-assignment is the inverse of the project's actual stance.

What about the family question itself? Three signals say *not a coordinated family*. The four projects have four different authors (qwibitai, sipeed, zeroclaw-labs, qhkm), spread across three languages (TypeScript, Go, and two flavors of Rust). They do not cross-reference each other in their READMEs except for one comparison table in ZeptoClaw's COMPARISON.md, which notably omits ZeroClaw. ZeroClaw goes the other direction, posting an explicit disclaimer that "other repositories claiming affiliation are unauthorized." Sipeed's README states the project is "An independent open-source project initiated by Sipeed, written entirely in Go from scratch," and explicitly disclaims being "a fork of OpenClaw, NanoBot, or any other project."

ZeptoClaw is part of a real coordinated sub-family, but it isn't *Claw*. The v0.9.2 README has a section titled "Zepto Stack" that opens: "ZeptoClaw is part of the Zepto stack: a modular system for running AI agents in production." The diagram inside the section enumerates three of the four layers and their roles verbatim, separated by em-dashes in the source: "ZeptoPM, orchestration, supervision, retries, job lifecycle"; "ZeptoCapsule, capsule creation, process isolation, resource enforcement"; "ZeptoClaw, LLM calls, tool use, artifact production". The accompanying table adds the fourth: "ZeptoRT: Durable runtime, journaled effects, snapshot recovery, OTP-style supervision". That is what coordination looks like: four pieces with documented roles that compose into one system. The Claw namespace does not have anything like that.

<figure>
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f6arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">WHAT A COORDINATED SUB-FAMILY LOOKS LIKE: THE ZEPTO STACK</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">four pieces with documented roles, composing into one system</text>

<text x="200" y="64" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle" letter-spacing="1">PIPELINE</text>

<rect x="40" y="74" width="320" height="56" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="94" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">ZeptoPM</text>
<text x="200" y="110" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">orchestration, supervision,</text>
<text x="200" y="124" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">retries, job lifecycle</text>

<line x1="200" y1="130" x2="200" y2="158" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f6arrow)"/>
<text x="358" y="148" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="end">create(spec) + spawn(worker, args, env)</text>

<rect x="40" y="162" width="320" height="56" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="182" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">ZeptoCapsule</text>
<text x="200" y="198" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">capsule creation, process isolation,</text>
<text x="200" y="212" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">resource enforcement</text>

<line x1="200" y1="218" x2="200" y2="246" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f6arrow)"/>
<text x="358" y="236" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="end">fork/namespace/microVM + stdio transport</text>

<rect x="40" y="250" width="320" height="56" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="200" y="270" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">ZeptoClaw</text>
<text x="200" y="286" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">LLM calls, tool use,</text>
<text x="200" y="300" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">artifact production</text>

<path d="M 360 278 L 400 278 L 400 102 L 365 102" fill="none" stroke="#6B6258" stroke-width="1.4" stroke-dasharray="3,3" marker-end="url(#f6arrow)"/>
<text x="412" y="186" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">JSON-line IPC</text>
<text x="412" y="200" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">over stdin/stdout</text>
<text x="412" y="214" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">back to ZeptoPM</text>

<text x="560" y="64" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle" letter-spacing="1">DURABILITY</text>
<rect x="450" y="74" width="220" height="120" fill="#F4EEE3" stroke="#9333EA" stroke-width="1.2" rx="4"/>
<text x="560" y="98" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">ZeptoRT</text>
<text x="560" y="118" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">durable runtime;</text>
<text x="560" y="132" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">journaled effects,</text>
<text x="560" y="146" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">snapshot recovery,</text>
<text x="560" y="160" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">OTP-style supervision</text>
<text x="560" y="180" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">orthogonal layer for</text>
<text x="560" y="190" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">stateful workflows</text>

<text x="340" y="340" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">contrast with the four `*Claw` projects below: they share a name pattern, not a compose pattern.</text>

</svg>
<figcaption><strong>Fig 6.</strong> The Zepto Stack at v0.9.2: four pieces with documented roles. *ZeptoPM* orchestrates and supervises; *ZeptoCapsule* creates the isolated process and runs it; *ZeptoClaw* makes LLM calls and produces artifacts; *ZeptoRT* is the durable-runtime layer for stateful workflows. The first three compose as a pipeline (`create(spec)` + `spawn` then `fork`/`namespace`/`microVM` + `stdio` then `JSON-line IPC` back to PM); ZeptoRT sits orthogonal. This is what a coordinated sub-family looks like: different repositories collaborating on one architectural surface, contrasting with Fig 7's four `*Claw` projects sharing only a name pattern.</figcaption>
</figure>

<figure>
<svg viewBox="0 0 680 540" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">OPENCLAW + FOUR CLAW VARIANTS ON THE DIALS</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">scatter, not cluster; several variants' distinctive bets sit off the map</text>

<rect x="20" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="125" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">LIFESPAN</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="38" y="124">scheduled</text>
  <text x="38" y="188">daemon</text>
  <text x="38" y="252">session</text>
  <text x="38" y="316">one-shot</text>
</g>

<g stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3">
  <line x1="38" y1="130" x2="222" y2="130"/>
  <line x1="38" y1="322" x2="222" y2="322"/>
</g>

<circle cx="140" cy="184" r="6" fill="#2563EB"/>
<circle cx="182" cy="184" r="6" fill="#B8651A"/>
<circle cx="203" cy="184" r="6" fill="#0E7490"/>
<circle cx="224" cy="184" r="6" fill="#9333EA"/>

<circle cx="161" cy="248" r="6" fill="#059669"/>

<rect x="235" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="340" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SURFACE</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="253" y="124">multi-channel</text>
  <text x="253" y="220">gateway</text>
  <text x="253" y="316">CLI / API</text>
</g>

<circle cx="397" cy="120" r="6" fill="#B8651A"/>
<circle cx="439" cy="120" r="6" fill="#9333EA"/>

<circle cx="355" cy="216" r="6" fill="#2563EB"/>

<circle cx="376" cy="312" r="6" fill="#059669"/>
<circle cx="418" cy="312" r="6" fill="#0E7490"/>

<rect x="450" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="555" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">ADAPTATION</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="468" y="124">skill creation</text>
  <text x="468" y="220">persistent memory</text>
  <text x="468" y="316">stateless</text>
</g>

<g stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3">
  <line x1="468" y1="130" x2="652" y2="130"/>
</g>

<circle cx="570" cy="216" r="6" fill="#2563EB"/>
<circle cx="654" cy="216" r="6" fill="#9333EA"/>
<text x="585" y="232" font-family="serif" font-size="8" font-style="italic" fill="#2563EB">*sessions</text>

<circle cx="591" cy="312" r="6" fill="#059669"/>
<circle cx="612" cy="312" r="6" fill="#B8651A"/>
<circle cx="633" cy="312" r="6" fill="#0E7490"/>

<rect x="20" y="354" width="640" height="180" fill="#F4EEE3" stroke="#C9BEAA" stroke-width="0.8" rx="3"/>
<text x="340" y="374" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FRAMEWORK LEGEND AND OFF-AXIS BETS</text>

<circle cx="44" cy="396" r="6" fill="#2563EB"/>
<text x="58" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">OpenClaw</text>
<text x="58" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: gateway. *adaptation = persistent sessions, not skills.</text>

<circle cx="44" cy="436" r="6" fill="#059669"/>
<text x="58" y="440" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">NanoClaw</text>
<text x="58" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: container minimalism (per-session-database isolation).</text>
<text x="58" y="466" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "autonomous worker"; README never says autonomous.</text>

<circle cx="44" cy="486" r="6" fill="#B8651A"/>
<text x="58" y="490" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">sipeed/PicoClaw</text>
<text x="58" y="504" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: hardware portability (sub-$10 boards, RISC-V/ARM/MIPS).</text>
<text x="58" y="516" font-family="serif" font-size="9" font-style="italic" fill="#B8651A">peterwoods: "session-scoped"; actually multi-channel; partial match only.</text>

<circle cx="384" cy="396" r="6" fill="#0E7490"/>
<text x="398" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeroClaw</text>
<text x="398" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: deploy-anywhere (systemd / launchctl / Windows Service).</text>
<text x="398" y="426" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "per-task lifespan"; README is fully autonomous, always-on.</text>

<circle cx="384" cy="446" r="6" fill="#9333EA"/>
<text x="398" y="450" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeptoClaw</text>
<text x="398" y="464" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: feature breadth (workspace memory, swarms, plugins, batch).</text>
<text x="398" y="476" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "stateless function call"; README opens with full PA infra.</text>

<text x="398" y="500" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">three contradictions, one partial match: a single ladder can't rank these.</text>
<text x="398" y="516" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">the four variants scatter on the dials, and four distinctive bets sit off them.</text>

</svg>
<figcaption><strong>Fig 7.</strong> The five frameworks placed on the three dials. The four Claw variants scatter: they don't share a center on any dial, and four of their distinctive bets (container minimalism, hardware portability, deploy-anywhere posture, feature breadth) sit off the dial map entirely. The legend names each variant's off-axis bet alongside the role peterwoods.online assigns it; three of those role-assignments contradict the variant's own README, and the fourth is a partial match.</figcaption>
</figure>

The contradictions, the language scatter, and the disavowals all point to the same thing: the shared `*Claw` namespace invites taxonomy that the projects don't actually share. Trying to place the four variants on the three-dial map shows the scatter, and several of their distinctive bets sit off the map entirely. NanoClaw's distinctive concern is container minimalism. sipeed/PicoClaw's is hardware portability. ZeroClaw's is deploy-anywhere posture. ZeptoClaw's is feature breadth: a wide capability set in one binary. Those are footprint and runtime concerns the lifespan / surface / adaptation framework doesn't capture. Where they appear, the figure annotates the off-axis bet alongside the in-axis placement; the dial map handles what it can.

Migration tooling lands here too. Hermes Agent, Act 3's subject, ships a first-party command for importing an OpenClaw setup, including the legacy `~/.clawdbot/` and `~/.moltbot/` directories from earlier names. The tooling exists because Nous Research expected enough migration traffic to be worth supporting. The *amount* of migration is unsourced; the *existence* of the tooling is real evidence that "what comes after OpenClaw" is a question being asked.

{/* Reader can now: see how third-party taxonomies fill a vacuum when an ecosystem shares a name pattern but no maintainership; recognize that the three-dial framework itself doesn't explain every variant's distinctive bet (and that's part of the taxonomy-failure story). */}

### 11. Where OpenClaw and the Claw family land on the dial map

OpenClaw is gateway-centered with persistent sessions and continuous lifespan. Multi-channel access flows through one always-on control plane; sessions persist as JSONL transcripts, routed by origin into per-agent workspaces, optionally sandboxed. The sessions are persistent, but they are not adaptation memory in the skill-creation sense; the agent doesn't rewrite its own toolset between turns from what those sessions contain. OpenClaw sits at gateway on the surface dial, daemon-or-continuous on the lifespan dial, and persistent-sessions (not skill-creation) on the adaptation dial.

The four Claw variants don't share that center. Their best-fit placements on the three dials scatter, and several of their distinctive bets sit off the dial map entirely: sipeed/PicoClaw on hardware portability, NanoClaw on container minimalism, ZeroClaw on deploy-anywhere posture, ZeptoClaw on feature breadth. The Claw namespace is shared; the architectures aren't, and not all of them even live on the same axes. That is another reason a single ladder always misranks them.

Hermes will land somewhere else entirely: on the adaptation axis.

{/* Reader can now: predict that the next act will introduce a different distinctive-dial design. */}

## Act 3 — Hermes Agent and the learning-loop problem

### 12. Hermes's distinctive bet is a closed learning loop

Now Hermes. OpenClaw's persistence keeps routing coherent: sessions persist so a Slack conversation on Tuesday picks up where it left off on Monday, and the right inbound message lands in the right session every time. Hermes's persistence is different. It mutates future behavior from past task history. That is the v4 rung the team's rollout reached at the end of Act 1: the agent stops repeating last week's mistakes because it codified them. A session in OpenClaw is a transcript; a session in Hermes is training data the agent learns from between turns. The dial Hermes was designed around is adaptation.

OpenClaw and Hermes Agent answer different questions. OpenClaw asks how to make an always-available assistant *reachable* across the channels you already use. Hermes asks how to make one *improve* from its own task history. Hermes Agent v0.13.0, the "Tenacity Release" published May 7 2026, opens its [README](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md) with the answer to that second question.

The first highlight is "A closed learning loop." The README defines that loop in four sentences: "Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." The body of the README expands on the same idea: Hermes "creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."

That is the post's spine for Act 3. Each piece names an arc of the loop.

<figure>
<svg viewBox="0 0 680 460" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f5arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HERMES'S CLOSED LEARNING LOOP</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">four arcs running together; experience compounds between turns</text>

<text x="340" y="226" font-family="serif" font-size="12" font-style="italic" fill="#6B6258" text-anchor="middle">closed loop</text>
<text x="340" y="244" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">runs four arcs in parallel</text>

<rect x="270" y="60" width="140" height="44" fill="#2563EB" opacity="0.88" stroke="#1A1A1A" stroke-width="1" rx="4"/>
<text x="340" y="80" font-family="JetBrains Mono" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.2">TASK</text>
<text x="340" y="96" font-family="serif" font-size="10" font-style="italic" fill="#FFFFFF" text-anchor="middle">user prompt arrives</text>

<rect x="413" y="164" width="140" height="44" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="483" y="184" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">skill creation</text>
<text x="483" y="200" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">codifies the procedure</text>

<rect x="358" y="331" width="140" height="44" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="428" y="351" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">mid-use refinement</text>
<text x="428" y="367" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">rewrites the skill on the way</text>

<rect x="182" y="331" width="140" height="44" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="252" y="351" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">FTS5 recall</text>
<text x="252" y="367" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">searches past sessions</text>

<rect x="127" y="164" width="140" height="44" fill="#F9F5EB" stroke="#9333EA" stroke-width="1.5" rx="4"/>
<text x="197" y="184" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">Honcho user model</text>
<text x="197" y="200" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">"who is asking" Dialectic API</text>

<rect x="110" y="212" width="174" height="20" fill="#EDE0FC" stroke="#9333EA" stroke-width="0.8" rx="2"/>
<text x="197" y="226" font-family="JetBrains Mono" font-size="8" fill="#9333EA" text-anchor="middle">EXTERNAL · PLASTIC LABS · AGPL-3.0</text>

<path d="M 410 90 Q 470 100 480 158" fill="none" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f5arrow)"/>
<path d="M 488 208 Q 510 270 460 326" fill="none" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f5arrow)"/>
<path d="M 358 354 Q 340 358 322 354" fill="none" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f5arrow)"/>
<path d="M 220 326 Q 170 270 192 208" fill="none" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f5arrow)"/>
<path d="M 200 158 Q 210 100 270 90" fill="none" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f5arrow)"/>

<text x="416" y="135" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">after a complex</text>
<text x="416" y="148" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">task succeeds</text>

<text x="510" y="278" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">during the next</text>
<text x="510" y="291" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">invocation</text>

<text x="280" y="394" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">recall pulls in</text>
<text x="280" y="407" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">prior transcripts</text>

<text x="92" y="278" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">peer-keyed</text>
<text x="92" y="291" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">across all sessions</text>

<text x="186" y="118" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">next task arrives</text>
<text x="186" y="131" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">in richer context</text>

<text x="340" y="438" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">three arcs are agent-curated; Honcho is an external library; aggregate extras like `all` and `termux` include it</text>

</svg>
<figcaption><strong>Fig 8.</strong> The closed loop runs four arcs in parallel between turns. <em>Skills</em> codify procedures from successful tasks. <em>Mid-use refinement</em> rewrites a skill while it is executing. <em>FTS5 recall</em> searches past session transcripts when the procedure is not yet a skill. The <em>Honcho user model</em> is a peer-keyed Dialectic API maintained as an external library by Plastic Labs (AGPL-3.0). The base Hermes wheel is MIT; Honcho ships only when the install path goes through `hermes-agent[honcho]` or an aggregate extra that includes it.</figcaption>
</figure>

The arcs sit on three different gradients of "what carries forward." Skill creation says: this task surfaced a procedure worth keeping, codify it. Mid-use refinement says: this skill almost worked, rewrite it on the way. FTS5 recall says: a different conversation knew the answer, find that conversation. The Honcho user model says: separate from any specific task, the agent should know who is asking. The four arcs run together, not as a single algorithm but as a set of practices the agent applies between turns.

The next four sections walk each arc.

{/* Reader can now: see the loop's shape; predict that the rest of Act 3 will examine each arc. */}

### 13. Skill creation from experience and mid-use self-improvement

Two of the four loop arcs name the same thing from different angles. The first is "autonomous skill creation after complex tasks." After a multi-step interaction the user judged successful, Hermes can write that interaction up as a reusable skill: a named procedure with parameters and the steps that produced the answer. The next time a similar task comes around, the agent invokes the skill rather than re-deriving the procedure from scratch.

The second is "skills self-improve during use." The README's phrasing matters here. "Skills self-improve" implies the agent rewrites the skill on its own, not that a human edits the skill file between uses. A skill that almost worked but missed something on the way is updated by the agent as it executes, so the next invocation runs a slightly better version of the same procedure. The agent's own experience is the gradient.

The two together close the inner shape of the loop: experience produces a skill, the skill is exercised, exercising the skill produces more experience, and the skill rewrites itself as a result.

Skills in Hermes follow an external standard. The README describes Hermes as "Compatible with the [agentskills.io](https://agentskills.io) open standard." The standard's overview page describes its lineage: "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." Compatibility with `agentskills.io` is broad-industry table stakes for agent products in 2026, not a Hermes-specific moat. What is Hermes-specific is the *production* of skills: skills appear because the agent decided to write them, not only because the user authored them.

The next section is the third arc: how the agent's past experience reaches the present even when the procedure for it hasn't been compressed into a skill yet.

{/* Reader can now: see that "skills" in Hermes is the agentskills.io-compatible expression of a broader skill / plugin pattern across agent frameworks. */}

### 14. Cross-session recall via FTS5 search and LLM summarization

The third arc of the loop is: when the procedure isn't yet a skill, the agent reaches into its own past for context. The README describes this as "FTS5 session search with LLM summarization for cross-session recall."

[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.

The mechanism softens the meaning of "session." In a typical sessioned-only architecture, the boundary between two conversations is hard: when one closes, the next can't see it. In Hermes, that boundary is permeable. A user starting a new session about a topic can still pull from earlier sessions about the same topic, even if the earlier sessions weren't tagged for it. The FTS index is what makes the lookup tractable, and the LLM summarization is what makes the lookup useful (you don't want twenty raw transcripts injected; you want the parts that matter).

<figure>
<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f9arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FTS5 RECALL: REACHING ACROSS SESSIONS</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">session boundaries become searchable, not erased</text>

<rect x="200" y="60" width="200" height="44" fill="#2563EB" opacity="0.88" stroke="#1A1A1A" stroke-width="1" rx="4"/>
<text x="300" y="80" font-family="JetBrains Mono" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.2">NEW TASK</text>
<text x="300" y="96" font-family="serif" font-size="10" font-style="italic" fill="#FFFFFF" text-anchor="middle">"how did we handle X last time?"</text>

<line x1="300" y1="104" x2="300" y2="138" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
<text x="312" y="125" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">FTS5 query</text>

<rect x="40" y="142" width="520" height="100" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="300" y="162" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SESSION STORE: SQLite with FTS5 index</text>
<text x="300" y="176" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">indexed JSONL transcripts; lookup by similarity, not by tag</text>

<rect x="60" y="190" width="150" height="40" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="135" y="206" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-aaa.jsonl</text>
<text x="135" y="220" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">3 weeks ago · skipped</text>

<rect x="225" y="190" width="150" height="40" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="2"/>
<text x="300" y="206" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">session-bbb.jsonl ✓</text>
<text x="300" y="220" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">1 week ago · MATCHED</text>

<rect x="390" y="190" width="150" height="40" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="465" y="206" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-ccc.jsonl</text>
<text x="465" y="220" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">today · skipped</text>

<line x1="300" y1="242" x2="300" y2="276" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
<text x="312" y="263" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">top-K matched snippets</text>

<rect x="200" y="280" width="200" height="44" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
<text x="300" y="300" font-family="JetBrains Mono" font-size="11" fill="#92400E" text-anchor="middle" letter-spacing="1.2">LLM SUMMARIZATION</text>
<text x="300" y="316" font-family="serif" font-size="10" font-style="italic" fill="#92400E" text-anchor="middle">compresses matches into relevant pieces</text>

<line x1="300" y1="324" x2="300" y2="358" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
<text x="312" y="345" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">summary, not raw</text>

<rect x="200" y="362" width="200" height="34" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="300" y="380" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">CURRENT CONTEXT</text>
<text x="300" y="392" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">summary lands here; raw transcripts do not</text>

<rect x="430" y="280" width="220" height="116" fill="#F4EEE3" stroke="#9333EA" stroke-width="1.2" stroke-dasharray="3,3" rx="4"/>
<text x="540" y="300" font-family="JetBrains Mono" font-size="10" fill="#9333EA" text-anchor="middle" letter-spacing="1.2">NOT A NAMED SKILL</text>
<text x="540" y="324" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">recall is uncompressed</text>
<text x="540" y="340" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">experience the agent</text>
<text x="540" y="356" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">searches by query.</text>
<text x="540" y="378" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">a skill is invoked by name;</text>
<text x="540" y="390" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">recall is searched by query.</text>

</svg>
<figcaption><strong>Fig 9.</strong> The recall pipeline. A new task triggers an FTS5 query against the SQLite-backed session store; matching transcripts (here, last week's session-bbb) come back as top-K snippets; the LLM summarizes those snippets; the summary lands in the current context, while the raw transcripts do not. The mechanism is what makes session boundaries soft: recall reaches across closed sessions on demand, without those sessions ever having been tagged for the topic. Recall is uncompressed experience the agent searches by query, distinct from a named skill the agent invokes.</figcaption>
</figure>

Recall is not the same as skills. Skills are *codified procedures*; recall is *uncompressed experience the agent searches through on demand*. Both belong to the adaptation dial, but they earn their rungs differently: skills are explicit knowledge, retrievable by name; recall is implicit knowledge, retrievable by query.

codex
A few candidate issues are already visible in prose around mechanism scope, but I’m not going to call them until I finish the MDX and compare against the matrix and prior closure notes. Next I’m checking the remaining Hermes, closing, and References sections plus row coverage.
exec
/bin/zsh -lc "sed -n '901,1281p' src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:

The fourth arc, the user model, sits beside both.

{/* Reader can now: see why "session boundaries" are soft in Hermes; recall crosses them. */}

### 15. The user model: Honcho dialectic modeling

The fourth arc is separate from any specific task. The README's phrase is "builds a deepening model of who you are across sessions." That is a user model: a body of structured knowledge about who is asking, accumulated across all of the agent's conversations with that person.

The implementation is an external library called [Honcho](https://github.com/plastic-labs/honcho), built by Plastic Labs (not Nous Research). The Honcho README describes it as "an open source memory library with a managed service for building stateful agents." Honcho exposes what it calls a Dialectic API: a `/peers/{peer_id}/chat` endpoint designed to function as "an oracle to the Peer." Hermes treats that endpoint as the place to ask "what should I know about this user before I respond?"

There is licensing nuance worth being clear about. Hermes Agent itself is [MIT-licensed](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE). Honcho is AGPL-3.0. Honcho ships as an optional extra in Hermes's `pyproject.toml`, not as an unconditional dependency: `honcho = ["honcho-ai>=2.0.1,<3"]` lives under `[project.optional-dependencies]`. A user who installs base Hermes does not pull AGPL-3.0 code along.

The footnote that matters: aggregate extras such as `all` and `termux` include `hermes-agent[honcho]`. Install paths that go through those aggregates bring Honcho with them without a separate Honcho-specific opt-in. So "is Hermes's user-modeling stack AGPL?" depends on which install path you use. The base wheel and standalone extras are MIT; the aggregate extras pull in an AGPL-3.0 component. For most personal-assistant deployments the answer is "the user model is AGPL because you took the convenience-extra," but the architecture intentionally separates the licensing surfaces so you can opt out by changing the install command.

<figure>
<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f10arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HONCHO LICENSING SURFACE: WHICH INSTALL COMMAND BRINGS WHAT</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">two licensing outcomes; pick one of three install paths</text>

<text x="120" y="68" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle" letter-spacing="1">INSTALL COMMAND</text>
<text x="350" y="68" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle" letter-spacing="1">RESOLVES TO</text>
<text x="580" y="68" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle" letter-spacing="1">LICENSE SURFACE</text>

<rect x="20" y="78" width="200" height="44" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="120" y="103" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle">pip install hermes-agent</text>

<line x1="225" y1="100" x2="265" y2="100" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="270" y="78" width="170" height="44" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="355" y="100" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">hermes-agent</text>
<text x="355" y="114" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">base wheel only</text>

<line x1="445" y1="100" x2="485" y2="100" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="490" y="78" width="170" height="44" fill="#D1FAE5" stroke="#059669" stroke-width="1.5" rx="4"/>
<text x="575" y="100" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#065F46" text-anchor="middle">MIT only</text>
<text x="575" y="114" font-family="serif" font-size="9" font-style="italic" fill="#065F46" text-anchor="middle">no Honcho pulled in</text>

<rect x="20" y="140" width="200" height="44" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="120" y="158" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">pip install</text>
<text x="120" y="172" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle">hermes-agent[honcho]</text>

<line x1="225" y1="162" x2="265" y2="162" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="270" y="140" width="170" height="44" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="355" y="158" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">hermes-agent +</text>
<text x="355" y="172" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">honcho extra (explicit)</text>

<line x1="445" y1="162" x2="485" y2="162" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="490" y="140" width="170" height="44" fill="#FEF3C7" stroke="#B8651A" stroke-width="1.5" rx="4"/>
<text x="575" y="158" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#92400E" text-anchor="middle">MIT + AGPL-3.0</text>
<text x="575" y="172" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">explicit honcho opt-in</text>

<rect x="20" y="202" width="200" height="68" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="120" y="220" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">pip install</text>
<text x="120" y="236" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle">hermes-agent[all]</text>
<text x="120" y="252" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle">hermes-agent[termux]</text>

<line x1="225" y1="236" x2="265" y2="236" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="270" y="202" width="170" height="68" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="355" y="220" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">aggregate extra,</text>
<text x="355" y="236" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">includes</text>
<text x="355" y="252" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">hermes-agent[honcho]</text>

<line x1="445" y1="236" x2="485" y2="236" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f10arrow)"/>

<rect x="490" y="202" width="170" height="68" fill="#FEF3C7" stroke="#B8651A" stroke-width="1.5" rx="4"/>
<text x="575" y="220" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="#92400E" text-anchor="middle">MIT + AGPL-3.0</text>
<text x="575" y="236" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">indirect:</text>
<text x="575" y="250" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">aggregate inclusion,</text>
<text x="575" y="262" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">no Honcho-specific opt-in</text>

<text x="340" y="296" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">Honcho is built by Plastic Labs (not Nous Research) and exposes the Dialectic API used for the user model.</text>
<text x="340" y="310" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">The licensing surface follows the install path, not the runtime decision to call Honcho.</text>
<text x="340" y="326" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">If you take the convenience extra, you took AGPL-3.0 along with it; the architecture lets you opt out by changing the command.</text>

</svg>
<figcaption><strong>Fig 10.</strong> Three install paths, two licensing outcomes. *Base install* (`pip install hermes-agent`) pulls only the MIT-licensed Hermes core. *Explicit Honcho extra* (`hermes-agent[honcho]`) opts into AGPL-3.0 Honcho on purpose. *Aggregate extras* (`hermes-agent[all]`, `hermes-agent[termux]`) both list `hermes-agent[honcho]` as a transitive dependency, so they pull AGPL-3.0 Honcho along without a separate Honcho-specific opt-in. The matrix-row 31 nuance reduces to "Honcho ships as an optional extra; aggregate `all` / `termux` extras include it." Different install commands, different licensing surfaces, by design.</figcaption>
</figure>

The user model itself sits beside the other three arcs. Skills compress procedures. Recall searches transcripts. The user model is neither: it is a *peer-keyed* representation of who someone is, queried through a separate API, with its own license and deployment story. The closed loop runs all four arcs in parallel.

{/* Reader can now: distinguish Hermes's MIT codebase from the AGPL Honcho dependency tree, and see why aggregate extras matter for licensing. */}

### 16. Tools, terminal backends, and subagent isolation

The closed loop has to run somewhere. Skills execute against tools, recall queries hit the session store, subagents fork from the main agent: Hermes's tool stack and backend list are the execution substrates the loop's arcs run on. The README's headline claim is "40+ tools, toolset system, terminal backends." That's the README's own marketing-flavored summary; the official docs page enumerates eight toolset categories rather than a flat 40-item list (web; terminal and files; browser; media; agent orchestration; memory and recall; automation and delivery; integrations). The 40 number is real but unaudited at the docs layer; readers wanting an inventory should look at the categories and the per-category tool lists in the docs.

The terminal backends are the more interesting piece. The README at v2026.5.7 lists seven: local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox. (The marketing landing page still says five; the docs index says six. The README is authoritative for v0.13.0; the surface inconsistencies are legacy framings.)

<figure>
<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HERMES TERMINAL BACKENDS (v2026.5.7 README ORDER)</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">seven backends; only Daytona and Modal have documented serverless-persistence semantics</text>

<rect x="40" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="78" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">local</text>

<rect x="124" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="162" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Docker</text>

<rect x="208" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="246" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">SSH</text>

<rect x="292" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="330" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Singularity</text>

<rect x="376" y="70" width="76" height="58" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
<text x="414" y="104" font-family="serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Modal</text>

<rect x="460" y="70" width="76" height="58" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
<text x="498" y="104" font-family="serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Daytona</text>

<rect x="544" y="70" width="96" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="592" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Vercel Sandbox</text>

<path d="M 376 138 L 376 150 L 536 150 L 536 138" fill="none" stroke="#B8651A" stroke-width="1.4"/>
<line x1="456" y1="150" x2="456" y2="162" stroke="#B8651A" stroke-width="1.4"/>

<rect x="276" y="168" width="360" height="64" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" rx="4"/>
<text x="456" y="186" font-family="JetBrains Mono" font-size="10" fill="#92400E" text-anchor="middle" letter-spacing="1.2">SERVERLESS PERSISTENCE</text>
<text x="456" y="206" font-family="serif" font-size="11" font-style="italic" fill="#92400E" text-anchor="middle">"the agent's environment hibernates when idle</text>
<text x="456" y="222" font-family="serif" font-size="11" font-style="italic" fill="#92400E" text-anchor="middle">and wakes on demand" (per official docs)</text>

<text x="340" y="262" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">the other backends' execution-location and persistence semantics aren't characterized this way in the docs;</text>
<text x="340" y="274" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">the figure does not extrapolate them onto a 2D grid.</text>

</svg>
<figcaption><strong>Fig 11.</strong> The seven terminal backends in v2026.5.7 README order. Only Daytona and Modal carry the documented "serverless persistence" semantics: idle hibernation, on-demand wake. The other backends' per-backend execution-location and persistence semantics are not characterized that way in the docs, so the figure does not extrapolate them onto a 2D grid.</figcaption>
</figure>

The matrix backs one specific semantic claim about a subset of the backends: per the docs, "Daytona and Modal offer serverless persistence: your agent's environment hibernates when idle and wakes on demand." That is the only documented per-backend behavior of that shape; the others' execution-location and persistence semantics aren't characterized in the same way and the post doesn't infer them.

Subagent isolation. The README's feature entry is "Spawn isolated subagents for parallel workstreams." Two distinct mechanisms back this claim. The first is `delegate_task`, a tool that spawns process-and-context-isolated subagents inside the existing backend. The second is `hermes -w`, added in the v0.2.0 release as "Git Worktree Isolation": `hermes -w` launches isolated agent sessions in git worktrees, so two subagents working on the same repo don't step on each other's working trees. Process isolation and filesystem isolation: the same word, two different mechanisms.

<figure>
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" width="100%">

<defs>
  <marker id="f12arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  </marker>
</defs>

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SUBAGENT ISOLATION: TWO MECHANISMS</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">"isolated subagents" can mean process isolation or filesystem isolation</text>

<rect x="20" y="60" width="310" height="240" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="175" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">PROCESS ISOLATION</text>
<text x="175" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">delegate_task tool</text>

<rect x="40" y="116" width="270" height="124" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="3"/>
<text x="175" y="132" font-family="JetBrains Mono" font-size="9" fill="#2563EB" text-anchor="middle">SAME BACKEND CONTAINER</text>

<rect x="60" y="142" width="100" height="42" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="110" y="160" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">parent</text>
<text x="110" y="174" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">process</text>

<line x1="162" y1="163" x2="188" y2="163" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f12arrow)"/>
<text x="175" y="156" font-family="JetBrains Mono" font-size="7" fill="#6B6258" text-anchor="middle">delegate</text>

<rect x="190" y="142" width="100" height="42" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="240" y="160" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">subagent</text>
<text x="240" y="174" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">process</text>

<rect x="60" y="194" width="230" height="38" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" rx="2"/>
<text x="175" y="210" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">SHARED WORKSPACE</text>
<text x="175" y="223" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">both processes read/write the same files</text>

<text x="175" y="262" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">boundary at the OS-process level;</text>
<text x="175" y="276" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">contexts isolated, files shared.</text>
<text x="175" y="290" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">parallel workstreams in one container.</text>

<rect x="350" y="60" width="310" height="240" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
<text x="505" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FILESYSTEM ISOLATION</text>
<text x="505" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">hermes -w (git worktree, v0.2.0+)</text>

<rect x="370" y="116" width="130" height="80" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="435" y="134" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">parent worktree</text>
<text x="435" y="150" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle">{"~/repo/main/"}</text>
<text x="435" y="170" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">parent agent</text>
<text x="435" y="184" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">working on main</text>

<rect x="510" y="116" width="130" height="80" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
<text x="575" y="134" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">child worktree</text>
<text x="575" y="150" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle">{"~/repo/feature/"}</text>
<text x="575" y="170" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">subagent</text>
<text x="575" y="184" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">working on feature</text>

<rect x="370" y="206" width="270" height="42" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" stroke-dasharray="3,2" rx="2"/>
<text x="505" y="222" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">SAME GIT REPO (.git)</text>
<text x="505" y="235" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">different working directories; no file collision</text>

<text x="505" y="262" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">boundary at the working-directory level;</text>
<text x="505" y="276" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">two subagents on the same repo</text>
<text x="505" y="290" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">don't step on each other's edits.</text>

</svg>
<figcaption><strong>Fig 12.</strong> Two mechanisms hide behind one phrase. *Process isolation* (the `delegate_task` tool) spawns a subagent process inside the same backend container; the parent and child are different OS processes but share the workspace filesystem. The boundary protects the *agent context* (each gets its own working memory and tool history). *Filesystem isolation* (`hermes -w`, added in v0.2.0) launches a subagent in a separate git worktree of the same repo; the boundary protects the *working tree* so two subagents editing the same project don't collide. Different problems, different walls.</figcaption>
</figure>

The point of the tool stack and the backend list is what the closed loop sits on. Skills run inside one of the seven backends. Subagents run inside a (possibly different) one of the seven. The agent's adaptation surface scales with what the backends allow, and the backends' diversity is the deployment knob.

{/* Reader can now: identify the seven README-listed backends and the documented Daytona/Modal serverless-persistence niche per row 34. */}

### 17. Where Hermes lands on the dial map

Hermes sits at daemon-or-continuous on the lifespan dial, gateway on the surface dial (the always-on control plane is the architectural bet, the same as OpenClaw's), and skill-creation / self-improvement on the adaptation dial. That last rung is the one the team's coding-agent rollout reached at v4 in Act 1: skills compound, recall reaches across sessions, the user model accumulates, and the agent rewrites its own toolset between turns.

The contrast with §11's OpenClaw placement is sharp at exactly one rung. *Lifespan*: both daemon-or-continuous; the agent stays running. *Surface*: both gateway; the always-on control plane owns sessions, channels, and tools. *Adaptation*: OpenClaw at persistent-sessions, Hermes at skill-creation. The two architectures live in the same neighborhood on two dials and split decisively on the third.

That makes Hermes a different question from OpenClaw, not a rung above. OpenClaw asks how to make an always-available assistant *reachable*. Hermes asks how to make one *improve*. Both answered their question; the dial map shows where each answer landed.

The next section is the matrix.

{/* Reader can now: predict that the closing matrix will place all frameworks on the same map and that the placements will not collapse to a ladder. */}

## Closing: the matrix

### 18. All three frameworks on one map

<figure>
<svg viewBox="0 0 680 560" xmlns="http://www.w3.org/2000/svg" width="100%">

<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SIX FRAMEWORKS, SIX PLACEMENTS</text>
<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">no framework sits at the top of every dial; the placements scatter</text>

<rect x="20" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="125" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">LIFESPAN</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="38" y="124">scheduled</text>
  <text x="38" y="188">daemon</text>
  <text x="38" y="252">session</text>
  <text x="38" y="316">one-shot</text>
</g>
<g stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3">
  <line x1="38" y1="130" x2="222" y2="130"/>
  <line x1="38" y1="322" x2="222" y2="322"/>
</g>

<circle cx="146" cy="184" r="5" fill="#2563EB"/>
<circle cx="174" cy="184" r="5" fill="#B8651A"/>
<circle cx="188" cy="184" r="5" fill="#0E7490"/>
<circle cx="202" cy="184" r="5" fill="#9333EA"/>
<circle cx="216" cy="184" r="5" fill="#92400E"/>

<circle cx="160" cy="248" r="5" fill="#059669"/>

<rect x="235" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="340" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SURFACE</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="253" y="124">multi-channel</text>
  <text x="253" y="220">gateway</text>
  <text x="253" y="316">CLI / API</text>
</g>

<circle cx="389" cy="120" r="5" fill="#B8651A"/>
<circle cx="417" cy="120" r="5" fill="#9333EA"/>

<circle cx="361" cy="216" r="5" fill="#2563EB"/>
<circle cx="431" cy="216" r="5" fill="#92400E"/>

<circle cx="375" cy="312" r="5" fill="#059669"/>
<circle cx="403" cy="312" r="5" fill="#0E7490"/>

<rect x="450" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
<text x="555" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">ADAPTATION</text>

<g font-family="serif" font-size="11" fill="#1A1A1A">
  <text x="468" y="124">skill creation</text>
  <text x="468" y="220">persistent memory</text>
  <text x="468" y="316">stateless</text>
</g>

<circle cx="646" cy="120" r="5" fill="#92400E"/>

<circle cx="576" cy="216" r="5" fill="#2563EB"/>
<circle cx="632" cy="216" r="5" fill="#9333EA"/>
<text x="591" y="232" font-family="serif" font-size="8" font-style="italic" fill="#2563EB">*sessions</text>

<circle cx="590" cy="312" r="5" fill="#059669"/>
<circle cx="604" cy="312" r="5" fill="#B8651A"/>
<circle cx="618" cy="312" r="5" fill="#0E7490"/>

<rect x="20" y="354" width="640" height="200" fill="#F4EEE3" stroke="#C9BEAA" stroke-width="0.8" rx="3"/>
<text x="340" y="374" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FRAMEWORK LEGEND AND OFF-AXIS BETS</text>

<circle cx="44" cy="396" r="5" fill="#2563EB"/>
<text x="58" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">OpenClaw</text>
<text x="58" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: gateway control plane. *adaptation = persistent sessions.</text>

<circle cx="44" cy="436" r="5" fill="#92400E"/>
<text x="58" y="440" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">Hermes Agent</text>
<text x="58" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: adaptation (skills, mid-use refinement, FTS5 recall, user model).</text>

<circle cx="44" cy="476" r="5" fill="#059669"/>
<text x="58" y="480" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">NanoClaw</text>
<text x="58" y="494" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: container minimalism (per-session-database isolation).</text>

<circle cx="44" cy="516" r="5" fill="#B8651A"/>
<text x="58" y="520" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">sipeed/PicoClaw</text>
<text x="58" y="534" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: hardware portability (sub-$10 boards, RISC-V/ARM/MIPS).</text>

<circle cx="384" cy="396" r="5" fill="#0E7490"/>
<text x="398" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeroClaw</text>
<text x="398" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: deploy-anywhere (systemd / launchctl / Windows Service).</text>

<circle cx="384" cy="436" r="5" fill="#9333EA"/>
<text x="398" y="440" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeptoClaw</text>
<text x="398" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: feature breadth (workspace memory, swarms, plugins, batch).</text>

<text x="398" y="492" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A">Tool choice falls out of the dial that matters,</text>
<text x="398" y="508" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A">or, for some variants, the off-axis concern.</text>
<text x="398" y="524" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">OpenClaw and Hermes have no off-axis annotation; their distinctive</text>
<text x="398" y="538" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">bets sit on the dials (gateway and adaptation, respectively).</text>

</svg>
<figcaption><strong>Fig 13.</strong> All six frameworks on the same map. None sits at the v4 corner with all three dials at the top rung; each picks its own placement. OpenClaw owns the gateway rung; Hermes owns the skill-creation rung. The four Claw variants scatter, and four of their distinctive concerns (container minimalism, hardware portability, deploy-anywhere, feature breadth) sit off the map entirely. The dial map captures what it can; the off-axis annotations close the rest.</figcaption>
</figure>

The dial map is finished now. Six architectures, six placements. None of them sit at the v4 corner where all three dials are at the top rung; each picks its own placement, and several of the variants pick at least one off-axis concern the dial map can't represent.

OpenClaw lives where the Gateway-as-control-plane lives. It is the architecture you reach for when reach is the problem: when the agent needs to be addressable from every channel the team already uses, with sessions per channel, agents per workspace, and sandboxing tunable per session.

Hermes Agent lives where adaptation lives. It is the architecture you reach for when *learning* is the problem: when you want skills that compound, recall that crosses sessions, and a user model that accumulates. The closed loop is the bet.

The four Claw variants don't share a center. NanoClaw answers "how thin can you make the agent's blast radius and codebase," sipeed/PicoClaw answers "how cheap a board can run a personal AI assistant," ZeroClaw answers "how to deploy one binary anywhere," ZeptoClaw answers "how much can fit in one Rust binary." Those are real questions, just not the same question the dial map is built around. Where they show up on the map at all, the map captures part of them. The off-axis annotations capture the rest.

Tool choice falls out of which dial your use case actually needs, or which off-axis concern. If reach is the problem, OpenClaw is the answer. If skill creation and cross-session memory are the problem, Hermes is the answer. If you are running a personal agent on a sub-$10 board, sipeed/PicoClaw is the answer the others can't give. The single ladder couldn't represent any of those questions; the dial map gets you most of the way, and the off-axis annotations close the rest.

*Companion to [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate), written May 2026.*

{/* Reader can now: overlay their own use case on the map and see which architecture matches the dial they care about. */}

## References

- [My Claude Code Plugin Stack After Months of Trial and Error](https://augusteo.com/blog/claude-code-plugin-stack). The adaptation-axis counterpart cited in this post's Act 1, Augusteo 2026.
- [Hand Tools, Power Tools, and the AI Coding Debate](https://augusteo.com/blog/hand-tools-power-tools-ai-coding-debate). The category-setup callback at the opening of this post's Act 2 and the closing line, Augusteo 2026.

**OpenClaw primary sources**

- [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw). Repository: README, VISION.md, CONTRIBUTING.md, Security model section, Development channels section. README accessed at commit 91ed160 on 2026-05-07.
- [docs.openclaw.ai](https://docs.openclaw.ai). Official OpenClaw documentation: Gateway, configuration, sandboxing, concepts/agent, concepts/session. Accessed 2026-05-08.
- [Joining OpenAI / OpenClaw foundation](https://steipete.me/posts/2026/openclaw). Peter Steinberger, blog post, 2026-02-14.

**Claw family primary sources**

- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw). NanoClaw repository: README and architecture section. Accessed 2026-05-08.
- [sipeed/picoclaw](https://github.com/sipeed/picoclaw). PicoClaw (the canonical Sipeed-authored Go rebuild). Release v0.2.8, 2026-04-30.
- [breakcafe/picoclaw](https://github.com/breakcafe/picoclaw). PicoClaw (the name-collision serverless fork of NanoClaw, distinct project). Release v1.2.23, accessed 2026-05-08.
- [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). ZeroClaw repository: README and repo description, with the unauthorized-affiliation disclaimer. Release v0.7.5, 2026-05-08.
- [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw). ZeptoClaw repository: README, COMPARISON.md, and Zepto Stack section listing ZeptoPM / ZeptoCapsule / ZeptoClaw / ZeptoRT. Release v0.9.2, 2026-04-07.

**Hermes Agent primary sources**

- [NousResearch/hermes-agent on GitHub](https://github.com/NousResearch/hermes-agent). Repository: README, [LICENSE](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE), [pyproject.toml](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml), release notes. Tag v2026.5.7 (v0.13.0, "The Tenacity Release"), 2026-05-07.
- [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com). Official Hermes Agent documentation: features/tools, configuration, installation, guides/migrate-from-openclaw. Accessed 2026-05-08.
- [Hermes Agent v0.2.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12). First public tagged release; introduced git-worktree isolation. 2026-03-12.

**agentskills.io and Honcho**

- [agentskills.io](https://agentskills.io). Agent Skills open-standard overview/home page: lineage, format, adopter framing. Accessed 2026-05-08.
- [plastic-labs/honcho](https://github.com/plastic-labs/honcho). Honcho memory library by Plastic Labs. License AGPL-3.0; version 3.0.6 last pushed 2026-05-07.

**Third-party framings discussed**

- [The Claw AI Agent Family](https://peterwoods.online/blog/the-claw-ai-agent-family). Peter Woods, 2026-02-19. The single-axis Claw-family taxonomy this post examines and contradicts.
- [OpenClaw surpasses React](https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software). Star History (Bytebase) blog, 2026-03-01. Third-party star-ranking analysis (cited as secondary; not load-bearing in this post).

exec
/bin/zsh -lc 'rg -n "''^'"\\| [0-9]+[a-z]? \\|\" notes/openclaw-and-hermes-agent.md" in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc 'rg -n "''^## References|''^'"\\d+\\. |"'^'"\\[|https://augusteo.com|/blog/claude-code-plugin-stack|/blog/hand-tools-power-tools-ai-coding-debate|peterwoods|OpenClaw README|Steinberger|README|agentskills|FTS5|Honcho|Windows|40\\+|Seven terminal|zero-context|Star|migration wave|wave\" src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
83:| 1 | Warelay | 2025-11-24 | Repo init commit; `warelay 0.1.1` published 2025-11-25 |
84:| 2 | Clawdis | ~2025-12-19 | `clawdis 2.0.0-beta1` published 2025-12-19 |
85:| 3 | Clawdbot | 2026-01-04 | commit 246adaa1 "chore: rename project to clawdbot"; `clawdbot 2026.1.5` published 2026-01-05 |
86:| 4 | Moltbot | late 2026-01 | internal rename; visible in commit history |
87:| 5 | OpenClaw | ~2026-01-29 | `openclaw 2026.1.29` published 2026-01-30 |
176:| 1 | OpenClaw is "a personal AI assistant you run on your own devices" with the Gateway as a control plane | "**OpenClaw** is a *personal AI assistant* you run on your own devices… The Gateway is just the control plane — the product is the assistant." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
177:| 2 | OpenClaw's Gateway is a "single control plane for sessions, channels, tools, and events" | "**Local-first Gateway** — single control plane for sessions, channels, tools, and events." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
178:| 3 | OpenClaw runs as an always-on user-service process (launchd / systemd) | "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."; gateway docs: "One always-on process for routing, control plane, and channel connections." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/gateway accessed 2026-05-08 | passes |
179:| 4 | Multi-agent routing: "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)" | "**Multi-agent routing** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07); docs.openclaw.ai/gateway/configuration accessed 2026-05-08 | passes |
180:| 5 | OpenClaw security: tools run on host for `main` session by default | "Default: tools run on the host for the `main` session, so the agent has full access when it is just you." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
181:| 6 | OpenClaw security: non-`main` sessions can sandbox via Docker / SSH / OpenShell | "set `agents.defaults.sandbox.mode: \"non-main\"` to run non-`main` sessions inside sandboxes. Docker is the default sandbox backend; SSH and OpenShell backends are also available." | github.com/openclaw/openclaw README @ 91ed160 — Security model section; docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
182:| 7 | OpenClaw sandbox typical defaults: allow `bash`, `process`, `read`, `write`, `edit`, session-management; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway` | "Typical sandbox default: allow `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
183:| 8 | OpenClaw release cadence: stable `vYYYY.M.D`, beta `vYYYY.M.D-beta.N`, dev = main HEAD | "**stable**: tagged releases (`vYYYY.M.D` or `vYYYY.M.D-<patch>`)… **beta**: prerelease tags (`vYYYY.M.D-beta.N`)… **dev**: moving head of `main`" | github.com/openclaw/openclaw README @ 91ed160 — Development channels section | passes |
184:| 9 | Latest stable OpenClaw release at research time: v2026.5.7 (2026-05-07) | gh API release tag `v2026.5.7` published_at 2026-05-07 | github.com/openclaw/openclaw/releases/tag/v2026.5.7 | passes |
185:| 10 | OpenClaw was first published on 2025-11-24 under the name **Warelay** (not Clawdbot — that's a later rename) | "OpenClaw started as a personal playground… It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw." Repo first-commit 2025-11-24T10:16:47Z; first release `warelay 0.1.1` published 2025-11-25T13:24:35Z. | github.com/openclaw/openclaw/blob/main/VISION.md (commit 11abe5e, 2026-04-24); gh API repos/openclaw/openclaw; releases/tag/v0.1.1 | passes |
186:| 11 | The full naming sequence is Warelay → Clawdis → Clawdbot → Moltbot → OpenClaw (VISION.md collapses Clawdis for brevity) | clawdis-stage release: `clawdis 2.0.0-beta1` published 2025-12-19. Clawdbot rename: commit 246adaa1 "chore: rename project to clawdbot" (2026-01-04). OpenClaw rename: `openclaw 2026.1.29` published 2026-01-30. | gh API repos/openclaw/openclaw releases + commits | passes |
187:| 12 | Project author: Peter Steinberger (Austrian developer, well-known in iOS dev community) | Steinberger's first-party blog (steipete.me) is the author profile; nationality cross-confirmed via Euronews. README does not state nationality; flag as inferred if prose names it. | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw author metadata | passes |
188:| 13 | 2026-02-14: Steinberger announced he was joining OpenAI; OpenClaw will move to a foundation (announced as forthcoming, not formally established) | "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of 2026-05-08, no GOVERNANCE.md / FOUNDATION.md in repo; CONTRIBUTING.md still names Steinberger "Benevolent Dictator." | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw repo state on 2026-05-08 | passes |
189:| 14 | OpenClaw exceeded 250K stars by ~2026-03-01 (per Star History blog, **secondary attribution** — Star History is a third-party analytics blog; the date snapshot AND the "most-starred non-aggregator software project" ranking framing both originate there, not in any first-party OpenClaw / Steinberger artifact). Prose must say "per Star History's analysis" if it uses the comparison. | "OpenClaw has now crossed 250K+ stars, overtaking React to become the most-starred non-aggregator software project on GitHub." (Star History — quoted as third-party analysis, not as primary fact) | star-history.com/blog/openclaw-surpasses-react-most-starred-software/ (2026-03-01) | **secondary-attribution-only** — Star History is third-party; can be quoted as analysis but cannot back a primary star-ranking claim. The primary fact for stars is gh API live count (row 15). |
190:| 15 | OpenClaw live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 369,911 | gh API `repos/openclaw/openclaw` field `stargazers_count: 369911` | api.github.com/repos/openclaw/openclaw accessed 2026-05-09 (was 369,860 on 2026-05-08; +51 day-over-day; not load-bearing in prose) | passes |
191:| 16 | OpenClaw workspaces are per-agent filesystem roots (default `~/.openclaw/workspace`); sessions are conversation contexts; sandboxes are optional execution-isolation backends | "Workspace root: `~/.openclaw/workspace` (configurable via `agents.defaults.workspace`)." "OpenClaw organizes conversations into **sessions**. Each message is routed to a session based on where it came from -- DMs, group chats, cron jobs, etc." "a **single embedded agent runtime** - one agent process per Gateway, with its own workspace, bootstrap files, and session store." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/concepts/agent and /concepts/session accessed 2026-05-08 | passes |
192:| 17 | OpenClaw sandbox workspace-access modes: `none` (isolated workspace under `~/.openclaw/sandboxes`), `ro` (mount workspace read-only at `/agent`), `rw` (read-write at `/workspace`) | docs.openclaw.ai/gateway/sandboxing access-mode table: "**`none`** — sandbox gets an isolated workspace under `~/.openclaw/sandboxes/<sessionId>/workspace`; the agent's `~/.openclaw/workspace` is not mounted. **`ro`** — workspace mounted read-only at `/agent` inside the sandbox. **`rw`** — workspace mounted read-write at `/workspace`; tool-side writes propagate back to the host." | docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
193:| 18 | NanoClaw (qwibitai) self-frames as container-isolation + minimalism, not autonomy | "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." "Agents run in containers...they can only see what's explicitly mounted." "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes |
194:| 19 | NanoClaw operates on a session-plus-cron model (per-session DBs `inbound.db` / `outbound.db`; "recurring jobs that run Claude and can message you back") — NOT continuous-lifespan-with-high-agency. **Note:** the architectural-detail summary here (per-session DB names, cron-jobs phrasing) was the Phase 2 research subagent's paraphrase of the README architecture section; Phase 4 drafting MUST re-quote the actual README phrasing verbatim before any prose claim about NanoClaw architecture details lands in the post. The verbatim quotes confirmed in Phase 2 are: "An AI assistant that runs agents securely in their own containers"; "Agents run in containers...they can only see what's explicitly mounted"; "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes (with Phase-4 verbatim-re-quote requirement) |
195:| 20 | Two distinct projects use the name `picoclaw`: sipeed/picoclaw (canonical, Go, IoT-targeted) and breakcafe/picoclaw (declared fork of NanoClaw, AWS-Lambda serverless) | sipeed README: "An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project." breakcafe README: "Fork of NanoClaw — replaces the always-on multi-channel orchestrator with a single-container, per-request execution model designed for AWS Lambda…" | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/breakcafe/picoclaw README v1.2.23 accessed 2026-05-08 | passes |
196:| 21 | sipeed/PicoClaw self-frames around hardware portability (sub-$10 hardware, <10MB RAM, <1s boot, RISC-V/ARM/MIPS/x86) — not session-lifespan | sipeed README architecture and platform sections; "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot." Targets "$10 hardware with <10MB RAM" with "<1s" boot times on 0.6GHz single-core processors. | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30) | passes |
197:| 22 | ZeroClaw (zeroclaw-labs) v0.7.5 released 2026-05-08; single Rust binary; deploys as continuous always-on (systemd / launchctl / Windows Service); supervised-default autonomy — NOT per-task structured task runner | Repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." | github.com/zeroclaw-labs/zeroclaw README + repo description accessed 2026-05-08; release v0.7.5 published 2026-05-08 | passes |
198:| 23 | ZeptoClaw (qhkm) v0.9.2 released 2026-04-07; full personal-AI-assistant infrastructure (workspace memory, conversation history, agent swarms, plugins, multi-channel gateway, sandboxed autonomy) — NOT a stateless function | "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." "Delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes |
199:| 24a | peterwoods.online's NanoClaw role-assignment ("autonomous worker, continuous lifespan, high agency") is contradicted by NanoClaw's own README. peterwoods is the framing under test, NOT a primary source for any architectural claim about NanoClaw. | peterwoods.online (2026-02-19): NanoClaw "acts as an autonomous worker, possessing a continuous lifespan and high agency." qwibitai/nanoclaw README (2026-05-08): "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." Architecture is per-session DBs (`inbound.db`, `outbound.db`) plus cron jobs — session-plus-cron, not continuous-lifespan-with-high-agency. The word "autonomous" does not appear in the README's self-description. | peterwoods.online/blog/the-claw-ai-agent-family (2026-02-19, **secondary**); github.com/qwibitai/nanoclaw README accessed 2026-05-08 (primary) | passes — peterwoods explicitly secondary; primary contradiction is verbatim |
200:| 24b | peterwoods.online's PicoClaw role-assignment ("session-scoped persistent assistant for interactive coding/exploration") is partially-accurate against canonical sipeed/PicoClaw, which self-frames around hardware portability rather than session lifespan. | peterwoods.online: PicoClaw "functions as a persistent assistant" for "Interactive tasks, coding assistance, exploration." sipeed/picoclaw README v0.2.8 (2026-04-30): "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot... An independent open-source project initiated by Sipeed, written entirely in Go from scratch." Targets <$10 hardware, RISC-V/ARM/MIPS/x86, 16+ chat platforms (always-on multi-channel). | peterwoods.online (2026-02-19, secondary); github.com/sipeed/picoclaw v0.2.8 (primary) | passes — "personal assistant" framing matches; "session-scoped / interactive coding" framing is editorial overlay not present in primary |
201:| 24c | peterwoods.online's ZeroClaw role-assignment ("structured task runner, per-task lifespan, low autonomy") is contradicted by ZeroClaw's own README and repo description. | peterwoods.online: ZeroClaw "operates as a structured task runner" with "per task" lifespan and "low" autonomy, designed for "Reproducible pipelines, workflow automation." zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08) repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." Continuous always-on (systemd / launchctl / Windows Service). | peterwoods.online (2026-02-19, secondary); github.com/zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08, primary) | passes — direct contradiction |
202:| 24d | peterwoods.online's ZeptoClaw role-assignment ("stateless function operating on single actions, no autonomy") is **directly contradicted** by ZeptoClaw's own README. (codex-flagged at pre-Phase-1-lock; primary contradiction confirmed in Phase 2.) | peterwoods.online: ZeptoClaw "is 'closer to a stateless function call' with 'per action' lifespan and 'none' autonomy, serving 'High-volume transformations, deterministic actions.'" qhkm/zeptoclaw README v0.9.2 (2026-04-07): "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." | peterwoods.online (2026-02-19, secondary); github.com/qhkm/zeptoclaw v0.9.2 (primary) | passes — direct contradiction |
203:| 25 | The four Claw projects are NOT a coordinated family — distinct authors (qwibitai / sipeed / zeroclaw-labs / qhkm), distinct languages (TS / Go / Rust / Rust), no mutual cross-references in their READMEs | Direct quotes confirmed by Phase 2 subagent: ZeroClaw repo (`zeroclaw-labs/zeroclaw`) explicitly disclaims sibling-project membership: **"other repositories claiming affiliation are unauthorized"** (ZeroClaw README, accessed 2026-05-08). sipeed/picoclaw README: **"An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project."** ZeptoClaw COMPARISON.md contrasts against NanoClaw, PicoClaw, OpenClaw, NemoClaw — but **omits ZeroClaw entirely** (corroborates non-coordination). NanoClaw README cites only OpenClaw as predecessor; no mention of PicoClaw, ZeroClaw, ZeptoClaw. | github.com/qwibitai/nanoclaw README; github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/zeroclaw-labs/zeroclaw README v0.7.5 (2026-05-08); github.com/qhkm/zeptoclaw COMPARISON.md v0.9.2 (2026-04-07) | passes |
204:| 26 | ZeptoClaw is part of "Zepto Stack" (ZeptoPM orchestrator, ZeptoCapsule sandboxer, ZeptoRT durable runtime) — a real coordinated sub-family, separate from "Claw" | qhkm/zeptoclaw README explicitly identifies the Zepto Stack as a coordinated sub-family: ZeptoPM (orchestrator), ZeptoCapsule (sandboxer), ZeptoRT (durable runtime). **Note:** Phase 2 subagent identified the Zepto Stack as a real coordinated sub-family but did not capture a single verbatim README sentence enumerating the four members; Phase 4 drafting MUST re-quote the README's actual phrasing of the Zepto Stack lineup before any prose claim. | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes (with Phase-4 verbatim-re-quote requirement) |
205:| 27 | Hermes Agent v0.13.0 (git tag `v2026.5.7`) "The Tenacity Release" published 2026-05-07 | gh API release tag `v2026.5.7`, name "Hermes Agent v0.13.0 (2026.5.7) — The Tenacity Release", published_at 2026-05-07T16:23:08Z | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
206:| 28 | Hermes "closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search with LLM summarization for cross-session recall | "**A closed learning loop** — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
207:| 29 | Hermes builds "a deepening model of who you are across sessions" via the closed loop | "it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions" | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
208:| 30 | Hermes uses external library Honcho (Plastic Labs, AGPL-3.0) for "dialectic user modeling" — exposed via Honcho's `/peers/{peer_id}/chat` endpoint | Hermes README: "Honcho dialectic user modeling." Honcho README: "Honcho is an open source memory library with a managed service for building stateful agents." Honcho version 3.0.6 (2026-05-07). | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/plastic-labs/honcho accessed 2026-05-08 | passes |
209:| 31 | Hermes's own code is MIT-licensed; Honcho is AGPL-3.0 and packaged as the optional `honcho` extra in Hermes's `pyproject.toml`, NOT as an unconditional core dependency. **However**, aggregate extras `all` and `termux` include `hermes-agent[honcho]` — so install paths using those aggregates bring Honcho along without a Honcho-specific opt-in. (Per Gate 0 Run 1 finding 3 + Run 3 finding 1.) Prose must say "Honcho ships as an optional extra; aggregate `all`/`termux` extras include it," NOT "Hermes depends on AGPL Honcho" and NOT "users must explicitly opt in to Honcho." | Hermes LICENSE = MIT (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`). Honcho LICENSE = AGPL-3.0 (`gh api repos/plastic-labs/honcho` returns `license.spdx_id: AGPL-3.0`). Hermes `pyproject.toml` `[project.optional-dependencies]` (codex Runs 1+3 verified): `honcho = ["honcho-ai>=2.0.1,<3"]`; `all` and `termux` extras both include `hermes-agent[honcho]`. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE; github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml; gh API repos/plastic-labs/honcho | passes |
210:| 32 | Hermes README claims "40+ tools, toolset system, terminal backends" — README is the source; docs page enumerates 8 toolset *categories* not 40+ items | README at v2026.5.7 verbatim "40+ tools…" Docs `/docs/user-guide/features/tools` lists 8 categories: Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/user-guide/features/tools | marginal — README is authoritative on the count but unaudited at docs layer; quote the README's exact phrasing rather than extrapolating |
211:| 33 | Hermes runs on **seven** terminal backends per README (local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox); marketing site says 5, docs index says 6 — README is authoritative | README v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Open issue #5995 corroborates Daytona, SSH, Singularity, Modal as the four remote backends. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/NousResearch/hermes-agent/issues/5995 | passes (with surface-inconsistency note) |
212:| 34 | Daytona and Modal offer "serverless persistence — your agent's environment hibernates when idle and wakes on demand" | "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." | hermes-agent.nousresearch.com/docs/user-guide/configuration accessed 2026-05-08 | passes |
213:| 35 | Hermes can spawn isolated subagents (process / context isolation via `delegate_task`); separately, `hermes -w` provides git-worktree filesystem isolation | README: "Spawn isolated subagents for parallel workstreams." v0.2.0 release notes: "Git Worktree Isolation — `hermes -w` launches isolated agent sessions in git worktrees for safe parallel work on the same repo." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; releases/tag/v2026.3.12 | passes |
214:| 36 | Python RPC scripting: "Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns" (README's own framing) | README v2026.5.7 verbatim | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes (quote README; do not over-extrapolate "zero-context-cost") |
215:| 37 | Hermes's Skills Hub is compatible with the agentskills.io open standard (originally developed by Anthropic; released as an open standard; adopted by **multiple** AI agent products — specific adopter count NOT primary-backed in agentskills.io spec or Hermes docs; Run 1 codex finding dropped the "30+" number; Run 2 codex finding fixed the source page from `/specification` to `/` overview). | Hermes README: "Compatible with the agentskills.io open standard." agentskills.io overview/home page (`https://agentskills.io/`): "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." (Note: the lineage quote lives on the overview/home page; `/specification` is a separate page describing the file-format spec; `/clients` shows adopters but does not enumerate to a specific 30+ count.) | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; agentskills.io/ (overview/home) accessed 2026-05-08 | passes — count claim removed; Anthropic-origin and open-standard claims primary-backed; correct page cited |
216:| 38 | First public Hermes Agent release: v0.2.0 (git tag `v2026.3.12`) on 2026-03-12; pre-public v0.1.0 internal phase preceded it | Release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." Repo created_at 2025-07-22 (private dev). | github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12; gh API repos/NousResearch/hermes-agent | passes |
217:| 39a | Hermes v0.13.0 (tag v2026.5.7) single-curl install supports Linux / macOS / WSL2 / Android (Termux). **Native Windows is NOT supported in v0.13.0 — the README directs Windows users to WSL2.** (Per Gate 0 Run 1 finding 1: the original row claimed Windows was added in v0.13.0; codex verified it isn't.) | README v2026.5.7 Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh \| bash`. Docs Installation: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." Per the v2026.5.7 README, Windows users are directed to WSL2; native Windows is not in the release. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/getting-started/installation accessed 2026-05-08 | passes |
218:| 39b | A native Windows installer commit landed **post-v0.13.0** on 2026-05-08 (commit `b7fe7ed7bd1740b01315c4bd15b254aa738124e5`) — NOT in any tagged release as of today. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, not yet in a tagged release." | Commit `b7fe7ed7bd` message: "feat(windows-install): bundle portable MinGit instead of relying on winget" — committed 2026-05-08, AFTER the v2026.5.7 release tag of 2026-05-07. | github.com/NousResearch/hermes-agent/commit/b7fe7ed7bd1740b01315c4bd15b254aa738124e5 | passes (post-release commit; will become a tagged-release fact at the next Hermes release) |
219:| 40 | Hermes live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 139,371 | gh API `repos/NousResearch/hermes-agent` field `stargazers_count: 139371` | api.github.com/repos/NousResearch/hermes-agent accessed 2026-05-09 (was 139,109 on 2026-05-08; +262 day-over-day; not load-bearing in prose) | passes |
220:| 41 | First-party migration tooling: `hermes claw migrate` imports OpenClaw / `~/.clawdbot/` / `~/.moltbot/` setups (settings, memories, skills, API keys) | "If you're coming from OpenClaw, Hermes can automatically import your settings, memories, skills, and API keys." "`hermes claw migrate` imports your OpenClaw (or legacy Clawdbot/Moldbot) setup into Hermes." "Reads from `~/.openclaw/` by default. Legacy `~/.clawdbot/` or `~/.moltbot/` directories are detected automatically." | hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw; github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
221:| 42 | The "110K stars in 10 weeks" / "migration wave" framing originates in third-party blogs and has no primary backing — Hermes ships first-party migration tooling but the *quantitative* migration claim is unsupported | Star count of 139,109 on 2026-05-08 vs unsourced "110K in 10 weeks." Migration tooling is first-party (row 41); the *wave* framing is third-party. | gh API live count; absence in Nous Research first-party announcements | UNSUPPORTED — quantitative wave claim; if the post mentions adoption velocity, cite the live count + access date and avoid the "wave" framing |
222:| 43 | v0.13.0 release scale: 864 commits, 588 merged PRs, 282 issues closed (13 P0, 36 P1), 295 community contributors | Release notes for `v2026.5.7` | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
485:| 1 | ThreeDialMap | static-svg | Three orthogonal axes (lifespan, surface, adaptation) drawn together; v1 / v2 / v3 / v4 of the team's coding-agent rollout placed at the failing rung on each axis; small annotations explain "what broke that motivated this rung" at each rung climb. Replaces the pre-Run-1 quartet of LifespanDial / SurfaceDial / AdaptationDial / ThreeDialMap. | The three dials are orthogonal; the running scenario climbs one rung per dial in sequence; the failure points are the *reason* each rung exists. | §5 |
486:| 2 | OpenClawArchitecture | static-svg | Gateway as control-plane center; channels feeding in, labeled only with matrix-backed routing categories per row 16 (DM, group chat, cron job — Discord dropped per Gate 1 Run 2 finding 4); sessions branching out per channel routing rule; workspaces (per-agent filesystem roots) shown; tools layer below. | OpenClaw's Gateway is the architectural center; channels are first-class; sessions route by origin. | §6 |
487:| 3 | OpenClawSandboxTiers | static-svg | Three-panel side-by-side: (a) host execution for `main` session — full host access, allow-everything; (b) Docker default sandbox — typical allow/deny defaults inset; (c) SSH/OpenShell alternate backends. Workspace-access modes `none`/`ro`/`rw` shown as a small inset table. | When OpenClaw will sandbox a tool call vs run it on the host. | §8 |
488:| 4 | ClawFamilyOnDials | static-svg | Three-dial map (reuse of #1) with OpenClaw + NanoClaw + sipeed/PicoClaw + ZeroClaw + ZeptoClaw placed at their best-fit lifespan / surface / adaptation positions. **Each variant carries a two-tier annotation**: in-axis label naming the framework's three-dial position, plus a small "off-axis bet: <X>" annotation naming the distinctive concern that lives off the map (per Gate 1 Run 2 finding 1) — NanoClaw → container minimalism; sipeed/PicoClaw → hardware portability; ZeroClaw → deploy-anywhere; ZeptoClaw → feature breadth. Small annotations also mark the three contradictions + one partial-accuracy where peterwoods.online's role-assignments disagree. | The four Claw variants scatter across the dial map's in-axis dimensions, and several have distinctive bets that live off the three-dial map entirely; peterwoods's taxonomy diverges from primary self-framings; the shared name doesn't imply a shared distinctive dial OR a shared off-axis concern. | §10 |
489:| 5 | HermesClosedLoop | static-svg | Circular flow diagram: task → autonomous skill creation → mid-use refinement → FTS5 cross-session recall → Honcho user model → next task. Honcho box annotated as external (Plastic Labs, AGPL-3.0). | The post's spine for Act 3 — Hermes's distinctive bet is the loop's existence. | §12 |
490:| 6 | HermesTerminalBackends | static-svg | Simple 1D backend list in README order: local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox. A single annotated callout groups Daytona + Modal as the matrix-backed serverless-persistence niche per row 34. No editorial 2D axes (per Gate 1 Run 2 finding 2 — the prior 2D execution-surface × persistence grid overclaimed the matrix). | The README enumerates seven backends in a specific order; Daytona + Modal occupy a uniquely-documented serverless-persistence niche per row 34; the other backends' execution-location semantics aren't characterized in the matrix and aren't claimed in the figure. | §16 |
491:| 7 | FinalDialMap | static-svg | Three-dial map (reuse of #1) with **all** frameworks placed: OpenClaw, NanoClaw, sipeed/PicoClaw, ZeroClaw, ZeptoClaw, Hermes. **Two-tier annotation per placement** (per Gate 1 Run 2 finding 1): in-axis label naming each framework's lifespan / surface / adaptation position; small "off-axis bet: <X>" annotation for variants whose distinctive concern lives off the map. OpenClaw + Hermes have no off-axis annotation because their distinctive bets *are* on the three dials (gateway/control-plane and adaptation, respectively). The placements scatter; no ladder collapse. | Tool choice falls out of "which dial do you actually need?" — and recognizing when a candidate's distinctive bet lives off the framework's axes. | §18 |
698:| 1 | AdaptationRungs (NEW; stateless / persistent memory / skill creation rungs with running-scenario examples) | static-svg | §4 | done | 052d960 (Phase 6.5 C1) |
699:| 2 | ThreeDialMap (was Fig 1) | static-svg | §5 (Act 1 close) | done | 39e328b (P5) + ab216c4 (P6.5 C0 renumber) |
700:| 3 | OpenClawArchitecture (was Fig 2) | static-svg | §6 | done | 291ec8c (P5) + ab216c4 (P6.5 C0 renumber) |
701:| 4 | WorkspaceSessionSandboxStack (NEW; nested layered concepts with decision-per-layer) | static-svg | §7 | done | 55eff64 + b24e7a4 fixup (Phase 6.5 C2) |
702:| 5 | OpenClawSandboxTiers (was Fig 3) | static-svg | §8 | done | c1a8106 (P5) + 5cb9048 strikethrough fix + ab216c4 (P6.5 C0 renumber) |
703:| 6 | ZeptoStackContrast (NEW; "what coordination looks like" pipeline + ZeptoRT side block) | static-svg | §10 | done | f2069a6 + e396570 fixup (Phase 6.5 C3) |
704:| 7 | ClawFamilyOnDials (was Fig 4 / Fig 6 mid-pass) | static-svg | §10 | done | f112012 (P5) + ab216c4 + f2069a6 (P6.5 renumbers) |
705:| 8 | HermesClosedLoop (was Fig 5) | static-svg | §12 | done | 0de57f6 (P5) + 6bb29cf badge polish + a304d05 (P6.5 A7 Honcho wording) + ab216c4 (renumber) |
706:| 9 | FTS5RecallPipeline (NEW; vertical pipeline + matched session highlight + "not a named skill" callout) | static-svg | §14 | done | e07bfa0 (Phase 6.5 C4) |
707:| 10 | HonchoInstallPaths (NEW; install-command → license-surface flow, MIT vs MIT+AGPL) | static-svg | §15 | done | 0c19a52 (Phase 6.5 C5) |
708:| 11 | HermesTerminalBackends (was Fig 6; per-backend subtitles stripped in A8) | static-svg | §16 | done | a34cce9 (P5) + d0f5f02 (P6.5 A8 subtitle strip) + ab216c4 (renumber) |
709:| 12 | SubagentIsolationPair (NEW; process iso + filesystem iso side-by-side) | static-svg | §16 | done | 1c006d7 (Phase 6.5 C6) |
710:| 13 | FinalDialMap (was Fig 7) | static-svg | §18 (closing) | done | 2b534cb (P5) + ab216c4 (P6.5 C0 renumber) |

 succeeded in 0ms:
20:It comes from a February 2026 post on peterwoods.online called [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family). ZeptoClaw is described as "closer to a stateless function call." NanoClaw is described as an "autonomous worker." OpenClaw, PicoClaw, and ZeroClaw fill the rungs in between. The post does what good taxonomies do: it gives the namespace a name and a shape, so readers reach for it whenever the topic comes up.
24:The first is Hermes Agent, which doesn't appear on the ladder at all. Nous Research, which builds Hermes, ships a first-party `hermes claw migrate` command for importing existing OpenClaw setups (covered in §10): concrete evidence the two are evaluated against each other. Hermes's README leads with "a closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search for cross-session recall. The thing that makes Hermes interesting is not that it is "more autonomous" than OpenClaw. It is that the agent rewrites its own toolset between turns. Adaptation is a different axis from autonomy.
26:The second is OpenClaw itself. Its own README describes it as "a personal AI assistant you run on your own devices" with the Gateway as "a single control plane for sessions, channels, tools, and events." That is a gateway architecture: one always-on process owning every inbound channel, every conversation, every tool route. OpenClaw's distinctive bet is not "less autonomous than Hermes." It is the control plane.
28:The third is the Claw family itself. Three of the four variants the ladder ranks contradict their own primary sources on the role they are assigned. ZeptoClaw, alleged stateless function, self-frames as full personal-AI-assistant infrastructure with workspace memory, conversation history, agent swarms, plugins, and a multi-channel gateway. ZeroClaw, alleged structured task runner with per-task lifespan, ships as a Rust binary that deploys via systemd, launchctl, or Windows Service. NanoClaw, alleged autonomous worker with continuous lifespan and high agency, is a per-session-database container-isolation project whose README never uses the word *autonomous*. The lone partial match is sipeed/PicoClaw, where the "personal assistant" framing tracks but the rest doesn't: the actual emphasis is hardware portability across RISC-V, ARM, MIPS, and sub-$10 boards.
163:A concrete adaptation-axis example sitting on the skills rung is [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack). Each plugin is a packaged skill: a name, a procedure, and a small amount of glue the agent runs without being prompted. Plugins compound. The agent gets better at the work as more skills accumulate, without the user having to repeat instructions in every session.
284:§5 ended with three architectures to place. Start with OpenClaw. The team's v3 was a gateway-shaped agent in miniature: a Slack bot and a GitHub bot wired into one shared agent context. OpenClaw is the concrete architecture for that bet at full scale, written from the ground up around the gateway as the architectural center.
286:(See [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate) for the broader framing of AI coding as a category change; OpenClaw is one of the power tools the change is being built around.)
288:The [OpenClaw README](https://github.com/openclaw/openclaw) opens by calling OpenClaw "a personal AI assistant you run on your own devices." Under the Highlights section, the first bullet introduces the architectural center: "Local-first Gateway," which the README describes as "a single control plane for sessions, channels, tools, and events." The Gateway runs as a daemon on the user's own machine: "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."
359:<figcaption><strong>Fig 3.</strong> OpenClaw's Gateway sits at the architectural center. Inbound channels (DM, group chat, cron job, per the README's session-routing examples) all land at one always-on process; the Gateway routes each message to one of the agents it hosts, by origin. Each agent has its own filesystem workspace and a JSONL session store. The tool layer is shared but governed at the session boundary.</figcaption>
362:The second highlight follows directly from the first: multi-agent routing. The README's exact phrasing is "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." A single Gateway can host multiple agents, like a `home` agent and a `work` agent, each with its own filesystem root, its own session store, its own bootstrap files. The routing rule binds inbound traffic to one of those agents based on where the message arrived from: which channel, which account, which peer.
376:*Sessions* are conversation contexts. The README states that OpenClaw "organizes conversations into sessions. Each message is routed to a session based on where it came from: DMs, group chats, cron jobs." Session transcripts persist as JSONL, one file per session, at `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`. The session store is what makes a "longer-lived agent" actually long-lived: the conversation isn't held in process memory that vanishes on restart, it's a file on disk the agent reads when it resumes.
441:The rule, from the README's Security model section, is the default behavior: "Default: tools run on the host for the `main` session, so the agent has full access when it is just you." A `main` session is the user's own session: the one tied to your account, on your machine, behind your channels. The README's logic is that when the agent is genuinely you, there is no benefit to fencing it off from your own machine.
524:The Docker backend has a typical default capability set. The README spells it out:
540:The other piece of context is governance. In a February 2026 [blog post](https://steipete.me/posts/2026/openclaw), the project's author Peter Steinberger announced he was joining OpenAI: "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of May 2026, that foundation is announced rather than established. There is no GOVERNANCE.md or FOUNDATION.md in the repo, and the CONTRIBUTING.md still names Steinberger as Benevolent Dictator. Both the rename churn and the in-flux governance left room for outside observers to propose taxonomies, which is the immediate context for the next section.
546:§9 ended with a vacuum: a project that had four predecessor names in three months and a governance announcement that hadn't materialized. The vacuum is what gave outside taxonomies room. The most cited of those, peterwoods.online's [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family) from February 2026, ranks five projects on a single autonomy axis. Three of the four ranks contradict their own primary sources.
548:**NanoClaw** ([qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)) is the one peterwoods places at the high-autonomy end as an "autonomous worker" with "continuous lifespan" and "high agency." The README's actual self-framing is the opposite. NanoClaw introduces itself as "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." The primary architectural claim is isolation, not autonomy: "Agents run in containers...they can only see what's explicitly mounted." The source-code claim is minimalism: "One process, a few source files and no microservices." The execution model is per-session. The README's architecture section diagrams the flow as `messaging apps → host process (router) → inbound.db → container (Bun, Claude Agent SDK) → outbound.db → host process (delivery) → messaging apps`, with "Two SQLite files per session, each with exactly one writer." The recurring-work description is "Scheduled tasks: recurring jobs that run Claude and can message you back." Sessions plus cron, not continuous lifespan. The word *autonomous* does not appear in NanoClaw's self-description.
550:There is a name collision to flag before going further. **breakcafe/picoclaw** and **sipeed/picoclaw** are two distinct projects that share a repository name. The first is a serverless fork of NanoClaw, designed for AWS Lambda and similar per-request platforms. The second is a from-scratch Go rebuild that has nothing to do with NanoClaw. peterwoods's "PicoClaw" is the sipeed one. The breakcafe one is a third-party fork in a different language for a different deployment shape, and it is the project that comes closest to the "stateless" framing peterwoods misapplies elsewhere on the ladder.
552:**sipeed/PicoClaw** ([sipeed/picoclaw](https://github.com/sipeed/picoclaw)) is the partial match. peterwoods labels it a "session-scoped persistent assistant for interactive coding/exploration." The "personal assistant" framing tracks: the README calls it "an ultra-lightweight personal AI assistant inspired by NanoBot." The "interactive coding" overlay does not. sipeed/PicoClaw's self-described emphasis is hardware portability: sub-$10 boards with under 10MB of RAM, sub-second boot times, and deployment across RISC-V, ARM, MIPS, and x86 from a single Go binary. The README also notes 16+ chat-platform integrations, so it is multi-channel, not session-scoped. The work the project is doing is moving an agent down to the smallest hardware it can run on, not scoping it to interactive sessions.
554:**ZeroClaw** ([zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)) is the second flat contradiction. peterwoods labels it a "structured task runner" with "per-task lifespan" and "low autonomy," intended for "reproducible pipelines" and "workflow automation." ZeroClaw's own repo description reads: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM." The README's first architectural sentence describes ZeroClaw as "an agent runtime," which it expands to "a single Rust binary you configure and run." It deploys as a systemd unit, a launchctl plist, or a Windows Service. Its default-autonomy posture is `supervised`, where "medium-risk ops require approval, high-risk blocked." That is continuous always-on (not per-task), supervised default (not low autonomy), full personal-assistant scope (not workflow runner).
556:**ZeptoClaw** ([qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)) is the third and largest contradiction. peterwoods places it at the low-autonomy end as "closer to a stateless function call" with "per action" lifespan and "none" autonomy, intended for "high-volume transformations" and "deterministic actions." The ZeptoClaw README opens: "Fast, small, secure, and local-first personal AI assistant infrastructure." The architectural claim that follows is "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS." What the binary contains is then enumerated in the README as workspace memory, long-term key-value store, conversation history, and the ability to "delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." A batch mode exists ("process hundreds of prompts from text/JSONL files"), but it is one feature among many, not the project's identity. peterwoods's role-assignment is the inverse of the project's actual stance.
558:What about the family question itself? Three signals say *not a coordinated family*. The four projects have four different authors (qwibitai, sipeed, zeroclaw-labs, qhkm), spread across three languages (TypeScript, Go, and two flavors of Rust). They do not cross-reference each other in their READMEs except for one comparison table in ZeptoClaw's COMPARISON.md, which notably omits ZeroClaw. ZeroClaw goes the other direction, posting an explicit disclaimer that "other repositories claiming affiliation are unauthorized." Sipeed's README states the project is "An independent open-source project initiated by Sipeed, written entirely in Go from scratch," and explicitly disclaims being "a fork of OpenClaw, NanoBot, or any other project."
560:ZeptoClaw is part of a real coordinated sub-family, but it isn't *Claw*. The v0.9.2 README has a section titled "Zepto Stack" that opens: "ZeptoClaw is part of the Zepto stack: a modular system for running AI agents in production." The diagram inside the section enumerates three of the four layers and their roles verbatim, separated by em-dashes in the source: "ZeptoPM, orchestration, supervision, retries, job lifecycle"; "ZeptoCapsule, capsule creation, process isolation, resource enforcement"; "ZeptoClaw, LLM calls, tool use, artifact production". The accompanying table adds the fourth: "ZeptoRT: Durable runtime, journaled effects, snapshot recovery, OTP-style supervision". That is what coordination looks like: four pieces with documented roles that compose into one system. The Claw namespace does not have anything like that.
694:<text x="58" y="466" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "autonomous worker"; README never says autonomous.</text>
699:<text x="58" y="516" font-family="serif" font-size="9" font-style="italic" fill="#B8651A">peterwoods: "session-scoped"; actually multi-channel; partial match only.</text>
703:<text x="398" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: deploy-anywhere (systemd / launchctl / Windows Service).</text>
704:<text x="398" y="426" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "per-task lifespan"; README is fully autonomous, always-on.</text>
709:<text x="398" y="476" font-family="serif" font-size="9" font-style="italic" fill="#B91C1C">peterwoods: "stateless function call"; README opens with full PA infra.</text>
715:<figcaption><strong>Fig 7.</strong> The five frameworks placed on the three dials. The four Claw variants scatter: they don't share a center on any dial, and four of their distinctive bets (container minimalism, hardware portability, deploy-anywhere posture, feature breadth) sit off the dial map entirely. The legend names each variant's off-axis bet alongside the role peterwoods.online assigns it; three of those role-assignments contradict the variant's own README, and the fourth is a partial match.</figcaption>
740:OpenClaw and Hermes Agent answer different questions. OpenClaw asks how to make an always-available assistant *reachable* across the channels you already use. Hermes asks how to make one *improve* from its own task history. Hermes Agent v0.13.0, the "Tenacity Release" published May 7 2026, opens its [README](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md) with the answer to that second question.
742:The first highlight is "A closed learning loop." The README defines that loop in four sentences: "Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." The body of the README expands on the same idea: Hermes "creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."
774:<text x="252" y="351" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">FTS5 recall</text>
778:<text x="197" y="184" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A" text-anchor="middle">Honcho user model</text>
805:<text x="340" y="438" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">three arcs are agent-curated; Honcho is an external library; aggregate extras like `all` and `termux` include it</text>
808:<figcaption><strong>Fig 8.</strong> The closed loop runs four arcs in parallel between turns. <em>Skills</em> codify procedures from successful tasks. <em>Mid-use refinement</em> rewrites a skill while it is executing. <em>FTS5 recall</em> searches past session transcripts when the procedure is not yet a skill. The <em>Honcho user model</em> is a peer-keyed Dialectic API maintained as an external library by Plastic Labs (AGPL-3.0). The base Hermes wheel is MIT; Honcho ships only when the install path goes through `hermes-agent[honcho]` or an aggregate extra that includes it.</figcaption>
811:The arcs sit on three different gradients of "what carries forward." Skill creation says: this task surfaced a procedure worth keeping, codify it. Mid-use refinement says: this skill almost worked, rewrite it on the way. FTS5 recall says: a different conversation knew the answer, find that conversation. The Honcho user model says: separate from any specific task, the agent should know who is asking. The four arcs run together, not as a single algorithm but as a set of practices the agent applies between turns.
821:The second is "skills self-improve during use." The README's phrasing matters here. "Skills self-improve" implies the agent rewrites the skill on its own, not that a human edits the skill file between uses. A skill that almost worked but missed something on the way is updated by the agent as it executes, so the next invocation runs a slightly better version of the same procedure. The agent's own experience is the gradient.
825:Skills in Hermes follow an external standard. The README describes Hermes as "Compatible with the [agentskills.io](https://agentskills.io) open standard." The standard's overview page describes its lineage: "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." Compatibility with `agentskills.io` is broad-industry table stakes for agent products in 2026, not a Hermes-specific moat. What is Hermes-specific is the *production* of skills: skills appear because the agent decided to write them, not only because the user authored them.
829:{/* Reader can now: see that "skills" in Hermes is the agentskills.io-compatible expression of a broader skill / plugin pattern across agent frameworks. */}
831:### 14. Cross-session recall via FTS5 search and LLM summarization
833:The third arc of the loop is: when the procedure isn't yet a skill, the agent reaches into its own past for context. The README describes this as "FTS5 session search with LLM summarization for cross-session recall."
835:[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.
848:<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FTS5 RECALL: REACHING ACROSS SESSIONS</text>
856:<text x="312" y="125" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">FTS5 query</text>
859:<text x="300" y="162" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SESSION STORE: SQLite with FTS5 index</text>
897:<figcaption><strong>Fig 9.</strong> The recall pipeline. A new task triggers an FTS5 query against the SQLite-backed session store; matching transcripts (here, last week's session-bbb) come back as top-K snippets; the LLM summarizes those snippets; the summary lands in the current context, while the raw transcripts do not. The mechanism is what makes session boundaries soft: recall reaches across closed sessions on demand, without those sessions ever having been tagged for the topic. Recall is uncompressed experience the agent searches by query, distinct from a named skill the agent invokes.</figcaption>
906:### 15. The user model: Honcho dialectic modeling
908:The fourth arc is separate from any specific task. The README's phrase is "builds a deepening model of who you are across sessions." That is a user model: a body of structured knowledge about who is asking, accumulated across all of the agent's conversations with that person.
910:The implementation is an external library called [Honcho](https://github.com/plastic-labs/honcho), built by Plastic Labs (not Nous Research). The Honcho README describes it as "an open source memory library with a managed service for building stateful agents." Honcho exposes what it calls a Dialectic API: a `/peers/{peer_id}/chat` endpoint designed to function as "an oracle to the Peer." Hermes treats that endpoint as the place to ask "what should I know about this user before I respond?"
912:There is licensing nuance worth being clear about. Hermes Agent itself is [MIT-licensed](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE). Honcho is AGPL-3.0. Honcho ships as an optional extra in Hermes's `pyproject.toml`, not as an unconditional dependency: `honcho = ["honcho-ai>=2.0.1,<3"]` lives under `[project.optional-dependencies]`. A user who installs base Hermes does not pull AGPL-3.0 code along.
914:The footnote that matters: aggregate extras such as `all` and `termux` include `hermes-agent[honcho]`. Install paths that go through those aggregates bring Honcho with them without a separate Honcho-specific opt-in. So "is Hermes's user-modeling stack AGPL?" depends on which install path you use. The base wheel and standalone extras are MIT; the aggregate extras pull in an AGPL-3.0 component. For most personal-assistant deployments the answer is "the user model is AGPL because you took the convenience-extra," but the architecture intentionally separates the licensing surfaces so you can opt out by changing the install command.
945:<text x="575" y="114" font-family="serif" font-size="9" font-style="italic" fill="#065F46" text-anchor="middle">no Honcho pulled in</text>
981:<text x="575" y="262" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">no Honcho-specific opt-in</text>
983:<text x="340" y="296" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">Honcho is built by Plastic Labs (not Nous Research) and exposes the Dialectic API used for the user model.</text>
984:<text x="340" y="310" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">The licensing surface follows the install path, not the runtime decision to call Honcho.</text>
988:<figcaption><strong>Fig 10.</strong> Three install paths, two licensing outcomes. *Base install* (`pip install hermes-agent`) pulls only the MIT-licensed Hermes core. *Explicit Honcho extra* (`hermes-agent[honcho]`) opts into AGPL-3.0 Honcho on purpose. *Aggregate extras* (`hermes-agent[all]`, `hermes-agent[termux]`) both list `hermes-agent[honcho]` as a transitive dependency, so they pull AGPL-3.0 Honcho along without a separate Honcho-specific opt-in. The matrix-row 31 nuance reduces to "Honcho ships as an optional extra; aggregate `all` / `termux` extras include it." Different install commands, different licensing surfaces, by design.</figcaption>
993:{/* Reader can now: distinguish Hermes's MIT codebase from the AGPL Honcho dependency tree, and see why aggregate extras matter for licensing. */}
997:The closed loop has to run somewhere. Skills execute against tools, recall queries hit the session store, subagents fork from the main agent: Hermes's tool stack and backend list are the execution substrates the loop's arcs run on. The README's headline claim is "40+ tools, toolset system, terminal backends." That's the README's own marketing-flavored summary; the official docs page enumerates eight toolset categories rather than a flat 40-item list (web; terminal and files; browser; media; agent orchestration; memory and recall; automation and delivery; integrations). The 40 number is real but unaudited at the docs layer; readers wanting an inventory should look at the categories and the per-category tool lists in the docs.
999:The terminal backends are the more interesting piece. The README at v2026.5.7 lists seven: local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox. (The marketing landing page still says five; the docs index says six. The README is authoritative for v0.13.0; the surface inconsistencies are legacy framings.)
1004:<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HERMES TERMINAL BACKENDS (v2026.5.7 README ORDER)</text>
1040:<figcaption><strong>Fig 11.</strong> The seven terminal backends in v2026.5.7 README order. Only Daytona and Modal carry the documented "serverless persistence" semantics: idle hibernation, on-demand wake. The other backends' per-backend execution-location and persistence semantics are not characterized that way in the docs, so the figure does not extrapolate them onto a 2D grid.</figcaption>
1045:Subagent isolation. The README's feature entry is "Spawn isolated subagents for parallel workstreams." Two distinct mechanisms back this claim. The first is `delegate_task`, a tool that spawns process-and-context-isolated subagents inside the existing backend. The second is `hermes -w`, added in the v0.2.0 release as "Git Worktree Isolation": `hermes -w` launches isolated agent sessions in git worktrees, so two subagents working on the same repo don't step on each other's working trees. Process isolation and filesystem isolation: the same word, two different mechanisms.
1115:{/* Reader can now: identify the seven README-listed backends and the documented Daytona/Modal serverless-persistence niche per row 34. */}
1207:<text x="58" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: adaptation (skills, mid-use refinement, FTS5 recall, user model).</text>
1219:<text x="398" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: deploy-anywhere (systemd / launchctl / Windows Service).</text>
1244:*Companion to [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate), written May 2026.*
1248:## References
1250:- [My Claude Code Plugin Stack After Months of Trial and Error](https://augusteo.com/blog/claude-code-plugin-stack). The adaptation-axis counterpart cited in this post's Act 1, Augusteo 2026.
1251:- [Hand Tools, Power Tools, and the AI Coding Debate](https://augusteo.com/blog/hand-tools-power-tools-ai-coding-debate). The category-setup callback at the opening of this post's Act 2 and the closing line, Augusteo 2026.
1255:- [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw). Repository: README, VISION.md, CONTRIBUTING.md, Security model section, Development channels section. README accessed at commit 91ed160 on 2026-05-07.
1257:- [Joining OpenAI / OpenClaw foundation](https://steipete.me/posts/2026/openclaw). Peter Steinberger, blog post, 2026-02-14.
1261:- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw). NanoClaw repository: README and architecture section. Accessed 2026-05-08.
1264:- [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). ZeroClaw repository: README and repo description, with the unauthorized-affiliation disclaimer. Release v0.7.5, 2026-05-08.
1265:- [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw). ZeptoClaw repository: README, COMPARISON.md, and Zepto Stack section listing ZeptoPM / ZeptoCapsule / ZeptoClaw / ZeptoRT. Release v0.9.2, 2026-04-07.
1269:- [NousResearch/hermes-agent on GitHub](https://github.com/NousResearch/hermes-agent). Repository: README, [LICENSE](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE), [pyproject.toml](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml), release notes. Tag v2026.5.7 (v0.13.0, "The Tenacity Release"), 2026-05-07.
1273:**agentskills.io and Honcho**
1275:- [agentskills.io](https://agentskills.io). Agent Skills open-standard overview/home page: lineage, format, adopter framing. Accessed 2026-05-08.
1276:- [plastic-labs/honcho](https://github.com/plastic-labs/honcho). Honcho memory library by Plastic Labs. License AGPL-3.0; version 3.0.6 last pushed 2026-05-07.
1280:- [The Claw AI Agent Family](https://peterwoods.online/blog/the-claw-ai-agent-family). Peter Woods, 2026-02-19. The single-axis Claw-family taxonomy this post examines and contradicts.
1281:- [OpenClaw surpasses React](https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software). Star History (Bytebase) blog, 2026-03-01. Third-party star-ranking analysis (cited as secondary; not load-bearing in this post).

exec
/bin/zsh -lc 'rg -n "''^## Claim-source matrix|''^## Related posts|''^## Outline|Phase 7 freshness|Result '"\\|\" notes/openclaw-and-hermes-agent.md" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
18:**Topic-evolution class.** Actively-evolving, 12-month source bar. Reinforced sourcing rule: every load-bearing claim pins to a specific commit hash, release tag, or dated doc snapshot. Hermes's release cadence (v0.13.0 May 7 2026, weekly-ish) makes Phase 7 freshness re-check non-optional.
170:## Claim-source matrix
172:Every load-bearing claim the post will make has one row mapping the claim to a quoted excerpt from a primary source. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row. Recency: actively-evolving (12-month bar). Today: 2026-05-09 (Phase 7 freshness pass run on 2026-05-09; pubDate := 2026-05-09); bar cutoff: 2025-05-09.
237:## Related posts on augusteo.com
274:## Outline
639:## Phase 7 freshness pass (run 2026-05-09)
643:| Surface | Rows it backs | Re-check method | Result |

web search: 
web search: https://github.com/openclaw/openclaw/releases
web search: 
web search: 'Hermes Agent v0.13.0' in https://github.com/NousResearch/hermes-agent/releases
exec
/bin/zsh -lc 'rg -n "title:|''^#|slug|hand-tools|claude-code" src/content/blog/claude-code-plugin-stack/index.mdx src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:2:title: "Hand Tools, Power Tools, and the AI Coding Debate"
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:5:heroImage: "@assets/blog/hand-tools-power-tools-ai-coding-debate/Gemini_Generated_Image_j9zc6qj9zc6qj9zc.png"
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:18:## The Dovetail Moment
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:26:## Paul at Apple
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:40:## The Debate Paul Missed
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:54:## I Used to Be a Craftsman
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:64:## Code Is a Liability
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:82:## The Table Saw Lesson
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:96:## Two Kinds of Joy
src/content/blog/hand-tools-power-tools-ai-coding-debate/index.mdx:108:## Don't Judge, But Introspect
src/content/blog/claude-code-plugin-stack/index.mdx:2:title: "My Claude Code Plugin Stack After Months of Trial and Error"
src/content/blog/claude-code-plugin-stack/index.mdx:5:heroImage: "@assets/blog/claude-code-plugin-stack/Gemini_Generated_Image_d18bnzd18bnzd18b.png"
src/content/blog/claude-code-plugin-stack/index.mdx:16:## Why Official Only
src/content/blog/claude-code-plugin-stack/index.mdx:28:PromptArmor took it further and [demonstrated how attackers can hijack Claude Code](https://www.promptarmor.com/resources/hijacking-claude-code-via-injected-marketplace-plugins) through injected marketplace plugins. The attack uses prompt injection to make Claude run curl commands that exfiltrate your codebase. Malicious hooks can bypass the human approval step entirely.
src/content/blog/claude-code-plugin-stack/index.mdx:30:SentinelOne showed that [marketplace skills can force Claude to install malicious dependencies](https://www.sentinelone.com/blog/marketplace-skills-and-dependency-hijack-in-claude-code/) without you knowing.
src/content/blog/claude-code-plugin-stack/index.mdx:34:## The Stack
src/content/blog/claude-code-plugin-stack/index.mdx:38:### [Superpowers](https://github.com/obra/superpowers)
src/content/blog/claude-code-plugin-stack/index.mdx:51:### [Context7](https://github.com/upstash/context7)
src/content/blog/claude-code-plugin-stack/index.mdx:59:### [Code Review](https://github.com/anthropics/claude-code/tree/main/plugins/code-review)
src/content/blog/claude-code-plugin-stack/index.mdx:63:### [PR Review Toolkit](https://github.com/anthropics/claude-code/tree/main/plugins/pr-review-toolkit)
src/content/blog/claude-code-plugin-stack/index.mdx:69:### [Feature Dev](https://github.com/anthropics/claude-code/tree/main/plugins/feature-dev)
src/content/blog/claude-code-plugin-stack/index.mdx:75:### [Frontend Design](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design)
src/content/blog/claude-code-plugin-stack/index.mdx:81:### [Security Guidance](https://github.com/anthropics/claude-code/tree/main/plugins/security-guidance)
src/content/blog/claude-code-plugin-stack/index.mdx:87:### [Claude in Chrome](https://code.claude.com/docs/en/chrome) (MCP)
src/content/blog/claude-code-plugin-stack/index.mdx:95:## What I Tried and Dropped
src/content/blog/claude-code-plugin-stack/index.mdx:105:## What's Next

exec
/bin/zsh -lc "nl -ba notes/openclaw-and-hermes-agent.md | sed -n '172,222p;237,273p;639,656p'" in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc "nl -ba src/content/blog/openclaw-and-hermes-agent/index.mdx | sed -n '20,32p;548,562p;740,746p;817,827p;831,899p;906,916p;997,1047p;1117,1130p;1248,1281p'" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
    20	It comes from a February 2026 post on peterwoods.online called [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family). ZeptoClaw is described as "closer to a stateless function call." NanoClaw is described as an "autonomous worker." OpenClaw, PicoClaw, and ZeroClaw fill the rungs in between. The post does what good taxonomies do: it gives the namespace a name and a shape, so readers reach for it whenever the topic comes up.
    21	
    22	It breaks in three places at once.
    23	
    24	The first is Hermes Agent, which doesn't appear on the ladder at all. Nous Research, which builds Hermes, ships a first-party `hermes claw migrate` command for importing existing OpenClaw setups (covered in §10): concrete evidence the two are evaluated against each other. Hermes's README leads with "a closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search for cross-session recall. The thing that makes Hermes interesting is not that it is "more autonomous" than OpenClaw. It is that the agent rewrites its own toolset between turns. Adaptation is a different axis from autonomy.
    25	
    26	The second is OpenClaw itself. Its own README describes it as "a personal AI assistant you run on your own devices" with the Gateway as "a single control plane for sessions, channels, tools, and events." That is a gateway architecture: one always-on process owning every inbound channel, every conversation, every tool route. OpenClaw's distinctive bet is not "less autonomous than Hermes." It is the control plane.
    27	
    28	The third is the Claw family itself. Three of the four variants the ladder ranks contradict their own primary sources on the role they are assigned. ZeptoClaw, alleged stateless function, self-frames as full personal-AI-assistant infrastructure with workspace memory, conversation history, agent swarms, plugins, and a multi-channel gateway. ZeroClaw, alleged structured task runner with per-task lifespan, ships as a Rust binary that deploys via systemd, launchctl, or Windows Service. NanoClaw, alleged autonomous worker with continuous lifespan and high agency, is a per-session-database container-isolation project whose README never uses the word *autonomous*. The lone partial match is sipeed/PicoClaw, where the "personal assistant" framing tracks but the rest doesn't: the actual emphasis is hardware portability across RISC-V, ARM, MIPS, and sub-$10 boards.
    29	
    30	A single axis can't represent a learning loop. It can't represent a control plane. Applied to the variants, it ranks them backwards from how their authors describe the work.
    31	
    32	This post replaces the ladder with three dials.
   548	**NanoClaw** ([qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)) is the one peterwoods places at the high-autonomy end as an "autonomous worker" with "continuous lifespan" and "high agency." The README's actual self-framing is the opposite. NanoClaw introduces itself as "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." The primary architectural claim is isolation, not autonomy: "Agents run in containers...they can only see what's explicitly mounted." The source-code claim is minimalism: "One process, a few source files and no microservices." The execution model is per-session. The README's architecture section diagrams the flow as `messaging apps → host process (router) → inbound.db → container (Bun, Claude Agent SDK) → outbound.db → host process (delivery) → messaging apps`, with "Two SQLite files per session, each with exactly one writer." The recurring-work description is "Scheduled tasks: recurring jobs that run Claude and can message you back." Sessions plus cron, not continuous lifespan. The word *autonomous* does not appear in NanoClaw's self-description.
   549	
   550	There is a name collision to flag before going further. **breakcafe/picoclaw** and **sipeed/picoclaw** are two distinct projects that share a repository name. The first is a serverless fork of NanoClaw, designed for AWS Lambda and similar per-request platforms. The second is a from-scratch Go rebuild that has nothing to do with NanoClaw. peterwoods's "PicoClaw" is the sipeed one. The breakcafe one is a third-party fork in a different language for a different deployment shape, and it is the project that comes closest to the "stateless" framing peterwoods misapplies elsewhere on the ladder.
   551	
   552	**sipeed/PicoClaw** ([sipeed/picoclaw](https://github.com/sipeed/picoclaw)) is the partial match. peterwoods labels it a "session-scoped persistent assistant for interactive coding/exploration." The "personal assistant" framing tracks: the README calls it "an ultra-lightweight personal AI assistant inspired by NanoBot." The "interactive coding" overlay does not. sipeed/PicoClaw's self-described emphasis is hardware portability: sub-$10 boards with under 10MB of RAM, sub-second boot times, and deployment across RISC-V, ARM, MIPS, and x86 from a single Go binary. The README also notes 16+ chat-platform integrations, so it is multi-channel, not session-scoped. The work the project is doing is moving an agent down to the smallest hardware it can run on, not scoping it to interactive sessions.
   553	
   554	**ZeroClaw** ([zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)) is the second flat contradiction. peterwoods labels it a "structured task runner" with "per-task lifespan" and "low autonomy," intended for "reproducible pipelines" and "workflow automation." ZeroClaw's own repo description reads: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM." The README's first architectural sentence describes ZeroClaw as "an agent runtime," which it expands to "a single Rust binary you configure and run." It deploys as a systemd unit, a launchctl plist, or a Windows Service. Its default-autonomy posture is `supervised`, where "medium-risk ops require approval, high-risk blocked." That is continuous always-on (not per-task), supervised default (not low autonomy), full personal-assistant scope (not workflow runner).
   555	
   556	**ZeptoClaw** ([qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)) is the third and largest contradiction. peterwoods places it at the low-autonomy end as "closer to a stateless function call" with "per action" lifespan and "none" autonomy, intended for "high-volume transformations" and "deterministic actions." The ZeptoClaw README opens: "Fast, small, secure, and local-first personal AI assistant infrastructure." The architectural claim that follows is "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS." What the binary contains is then enumerated in the README as workspace memory, long-term key-value store, conversation history, and the ability to "delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." A batch mode exists ("process hundreds of prompts from text/JSONL files"), but it is one feature among many, not the project's identity. peterwoods's role-assignment is the inverse of the project's actual stance.
   557	
   558	What about the family question itself? Three signals say *not a coordinated family*. The four projects have four different authors (qwibitai, sipeed, zeroclaw-labs, qhkm), spread across three languages (TypeScript, Go, and two flavors of Rust). They do not cross-reference each other in their READMEs except for one comparison table in ZeptoClaw's COMPARISON.md, which notably omits ZeroClaw. ZeroClaw goes the other direction, posting an explicit disclaimer that "other repositories claiming affiliation are unauthorized." Sipeed's README states the project is "An independent open-source project initiated by Sipeed, written entirely in Go from scratch," and explicitly disclaims being "a fork of OpenClaw, NanoBot, or any other project."
   559	
   560	ZeptoClaw is part of a real coordinated sub-family, but it isn't *Claw*. The v0.9.2 README has a section titled "Zepto Stack" that opens: "ZeptoClaw is part of the Zepto stack: a modular system for running AI agents in production." The diagram inside the section enumerates three of the four layers and their roles verbatim, separated by em-dashes in the source: "ZeptoPM, orchestration, supervision, retries, job lifecycle"; "ZeptoCapsule, capsule creation, process isolation, resource enforcement"; "ZeptoClaw, LLM calls, tool use, artifact production". The accompanying table adds the fourth: "ZeptoRT: Durable runtime, journaled effects, snapshot recovery, OTP-style supervision". That is what coordination looks like: four pieces with documented roles that compose into one system. The Claw namespace does not have anything like that.
   561	
   562	<figure>
   740	OpenClaw and Hermes Agent answer different questions. OpenClaw asks how to make an always-available assistant *reachable* across the channels you already use. Hermes asks how to make one *improve* from its own task history. Hermes Agent v0.13.0, the "Tenacity Release" published May 7 2026, opens its [README](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md) with the answer to that second question.
   741	
   742	The first highlight is "A closed learning loop." The README defines that loop in four sentences: "Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." The body of the README expands on the same idea: Hermes "creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."
   743	
   744	That is the post's spine for Act 3. Each piece names an arc of the loop.
   745	
   746	<figure>
   817	### 13. Skill creation from experience and mid-use self-improvement
   818	
   819	Two of the four loop arcs name the same thing from different angles. The first is "autonomous skill creation after complex tasks." After a multi-step interaction the user judged successful, Hermes can write that interaction up as a reusable skill: a named procedure with parameters and the steps that produced the answer. The next time a similar task comes around, the agent invokes the skill rather than re-deriving the procedure from scratch.
   820	
   821	The second is "skills self-improve during use." The README's phrasing matters here. "Skills self-improve" implies the agent rewrites the skill on its own, not that a human edits the skill file between uses. A skill that almost worked but missed something on the way is updated by the agent as it executes, so the next invocation runs a slightly better version of the same procedure. The agent's own experience is the gradient.
   822	
   823	The two together close the inner shape of the loop: experience produces a skill, the skill is exercised, exercising the skill produces more experience, and the skill rewrites itself as a result.
   824	
   825	Skills in Hermes follow an external standard. The README describes Hermes as "Compatible with the [agentskills.io](https://agentskills.io) open standard." The standard's overview page describes its lineage: "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." Compatibility with `agentskills.io` is broad-industry table stakes for agent products in 2026, not a Hermes-specific moat. What is Hermes-specific is the *production* of skills: skills appear because the agent decided to write them, not only because the user authored them.
   826	
   827	The next section is the third arc: how the agent's past experience reaches the present even when the procedure for it hasn't been compressed into a skill yet.
   831	### 14. Cross-session recall via FTS5 search and LLM summarization
   832	
   833	The third arc of the loop is: when the procedure isn't yet a skill, the agent reaches into its own past for context. The README describes this as "FTS5 session search with LLM summarization for cross-session recall."
   834	
   835	[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.
   836	
   837	The mechanism softens the meaning of "session." In a typical sessioned-only architecture, the boundary between two conversations is hard: when one closes, the next can't see it. In Hermes, that boundary is permeable. A user starting a new session about a topic can still pull from earlier sessions about the same topic, even if the earlier sessions weren't tagged for it. The FTS index is what makes the lookup tractable, and the LLM summarization is what makes the lookup useful (you don't want twenty raw transcripts injected; you want the parts that matter).
   838	
   839	<figure>
   840	<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" width="100%">
   841	
   842	<defs>
   843	  <marker id="f9arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
   844	    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
   845	  </marker>
   846	</defs>
   847	
   848	<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FTS5 RECALL: REACHING ACROSS SESSIONS</text>
   849	<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">session boundaries become searchable, not erased</text>
   850	
   851	<rect x="200" y="60" width="200" height="44" fill="#2563EB" opacity="0.88" stroke="#1A1A1A" stroke-width="1" rx="4"/>
   852	<text x="300" y="80" font-family="JetBrains Mono" font-size="11" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.2">NEW TASK</text>
   853	<text x="300" y="96" font-family="serif" font-size="10" font-style="italic" fill="#FFFFFF" text-anchor="middle">"how did we handle X last time?"</text>
   854	
   855	<line x1="300" y1="104" x2="300" y2="138" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
   856	<text x="312" y="125" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">FTS5 query</text>
   857	
   858	<rect x="40" y="142" width="520" height="100" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
   859	<text x="300" y="162" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SESSION STORE: SQLite with FTS5 index</text>
   860	<text x="300" y="176" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">indexed JSONL transcripts; lookup by similarity, not by tag</text>
   861	
   862	<rect x="60" y="190" width="150" height="40" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
   863	<text x="135" y="206" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-aaa.jsonl</text>
   864	<text x="135" y="220" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">3 weeks ago · skipped</text>
   865	
   866	<rect x="225" y="190" width="150" height="40" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="2"/>
   867	<text x="300" y="206" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">session-bbb.jsonl ✓</text>
   868	<text x="300" y="220" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">1 week ago · MATCHED</text>
   869	
   870	<rect x="390" y="190" width="150" height="40" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
   871	<text x="465" y="206" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">session-ccc.jsonl</text>
   872	<text x="465" y="220" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">today · skipped</text>
   873	
   874	<line x1="300" y1="242" x2="300" y2="276" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
   875	<text x="312" y="263" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">top-K matched snippets</text>
   876	
   877	<rect x="200" y="280" width="200" height="44" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
   878	<text x="300" y="300" font-family="JetBrains Mono" font-size="11" fill="#92400E" text-anchor="middle" letter-spacing="1.2">LLM SUMMARIZATION</text>
   879	<text x="300" y="316" font-family="serif" font-size="10" font-style="italic" fill="#92400E" text-anchor="middle">compresses matches into relevant pieces</text>
   880	
   881	<line x1="300" y1="324" x2="300" y2="358" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f9arrow)"/>
   882	<text x="312" y="345" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">summary, not raw</text>
   883	
   884	<rect x="200" y="362" width="200" height="34" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
   885	<text x="300" y="380" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">CURRENT CONTEXT</text>
   886	<text x="300" y="392" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">summary lands here; raw transcripts do not</text>
   887	
   888	<rect x="430" y="280" width="220" height="116" fill="#F4EEE3" stroke="#9333EA" stroke-width="1.2" stroke-dasharray="3,3" rx="4"/>
   889	<text x="540" y="300" font-family="JetBrains Mono" font-size="10" fill="#9333EA" text-anchor="middle" letter-spacing="1.2">NOT A NAMED SKILL</text>
   890	<text x="540" y="324" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">recall is uncompressed</text>
   891	<text x="540" y="340" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">experience the agent</text>
   892	<text x="540" y="356" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">searches by query.</text>
   893	<text x="540" y="378" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">a skill is invoked by name;</text>
   894	<text x="540" y="390" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">recall is searched by query.</text>
   895	
   896	</svg>
   897	<figcaption><strong>Fig 9.</strong> The recall pipeline. A new task triggers an FTS5 query against the SQLite-backed session store; matching transcripts (here, last week's session-bbb) come back as top-K snippets; the LLM summarizes those snippets; the summary lands in the current context, while the raw transcripts do not. The mechanism is what makes session boundaries soft: recall reaches across closed sessions on demand, without those sessions ever having been tagged for the topic. Recall is uncompressed experience the agent searches by query, distinct from a named skill the agent invokes.</figcaption>
   898	</figure>
   899	
   906	### 15. The user model: Honcho dialectic modeling
   907	
   908	The fourth arc is separate from any specific task. The README's phrase is "builds a deepening model of who you are across sessions." That is a user model: a body of structured knowledge about who is asking, accumulated across all of the agent's conversations with that person.
   909	
   910	The implementation is an external library called [Honcho](https://github.com/plastic-labs/honcho), built by Plastic Labs (not Nous Research). The Honcho README describes it as "an open source memory library with a managed service for building stateful agents." Honcho exposes what it calls a Dialectic API: a `/peers/{peer_id}/chat` endpoint designed to function as "an oracle to the Peer." Hermes treats that endpoint as the place to ask "what should I know about this user before I respond?"
   911	
   912	There is licensing nuance worth being clear about. Hermes Agent itself is [MIT-licensed](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE). Honcho is AGPL-3.0. Honcho ships as an optional extra in Hermes's `pyproject.toml`, not as an unconditional dependency: `honcho = ["honcho-ai>=2.0.1,<3"]` lives under `[project.optional-dependencies]`. A user who installs base Hermes does not pull AGPL-3.0 code along.
   913	
   914	The footnote that matters: aggregate extras such as `all` and `termux` include `hermes-agent[honcho]`. Install paths that go through those aggregates bring Honcho with them without a separate Honcho-specific opt-in. So "is Hermes's user-modeling stack AGPL?" depends on which install path you use. The base wheel and standalone extras are MIT; the aggregate extras pull in an AGPL-3.0 component. For most personal-assistant deployments the answer is "the user model is AGPL because you took the convenience-extra," but the architecture intentionally separates the licensing surfaces so you can opt out by changing the install command.
   915	
   916	<figure>
   997	The closed loop has to run somewhere. Skills execute against tools, recall queries hit the session store, subagents fork from the main agent: Hermes's tool stack and backend list are the execution substrates the loop's arcs run on. The README's headline claim is "40+ tools, toolset system, terminal backends." That's the README's own marketing-flavored summary; the official docs page enumerates eight toolset categories rather than a flat 40-item list (web; terminal and files; browser; media; agent orchestration; memory and recall; automation and delivery; integrations). The 40 number is real but unaudited at the docs layer; readers wanting an inventory should look at the categories and the per-category tool lists in the docs.
   998	
   999	The terminal backends are the more interesting piece. The README at v2026.5.7 lists seven: local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox. (The marketing landing page still says five; the docs index says six. The README is authoritative for v0.13.0; the surface inconsistencies are legacy framings.)
  1000	
  1001	<figure>
  1002	<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" width="100%">
  1003	
  1004	<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HERMES TERMINAL BACKENDS (v2026.5.7 README ORDER)</text>
  1005	<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">seven backends; only Daytona and Modal have documented serverless-persistence semantics</text>
  1006	
  1007	<rect x="40" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
  1008	<text x="78" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">local</text>
  1009	
  1010	<rect x="124" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
  1011	<text x="162" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Docker</text>
  1012	
  1013	<rect x="208" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
  1014	<text x="246" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">SSH</text>
  1015	
  1016	<rect x="292" y="70" width="76" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
  1017	<text x="330" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Singularity</text>
  1018	
  1019	<rect x="376" y="70" width="76" height="58" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
  1020	<text x="414" y="104" font-family="serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Modal</text>
  1021	
  1022	<rect x="460" y="70" width="76" height="58" fill="#FBE9CE" stroke="#B8651A" stroke-width="1.5" rx="4"/>
  1023	<text x="498" y="104" font-family="serif" font-size="12" font-weight="600" fill="#92400E" text-anchor="middle">Daytona</text>
  1024	
  1025	<rect x="544" y="70" width="96" height="58" fill="#EDE5D4" stroke="#8F8578" stroke-width="1" rx="4"/>
  1026	<text x="592" y="104" font-family="serif" font-size="12" font-weight="600" fill="#1A1A1A" text-anchor="middle">Vercel Sandbox</text>
  1027	
  1028	<path d="M 376 138 L 376 150 L 536 150 L 536 138" fill="none" stroke="#B8651A" stroke-width="1.4"/>
  1029	<line x1="456" y1="150" x2="456" y2="162" stroke="#B8651A" stroke-width="1.4"/>
  1030	
  1031	<rect x="276" y="168" width="360" height="64" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" rx="4"/>
  1032	<text x="456" y="186" font-family="JetBrains Mono" font-size="10" fill="#92400E" text-anchor="middle" letter-spacing="1.2">SERVERLESS PERSISTENCE</text>
  1033	<text x="456" y="206" font-family="serif" font-size="11" font-style="italic" fill="#92400E" text-anchor="middle">"the agent's environment hibernates when idle</text>
  1034	<text x="456" y="222" font-family="serif" font-size="11" font-style="italic" fill="#92400E" text-anchor="middle">and wakes on demand" (per official docs)</text>
  1035	
  1036	<text x="340" y="262" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">the other backends' execution-location and persistence semantics aren't characterized this way in the docs;</text>
  1037	<text x="340" y="274" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">the figure does not extrapolate them onto a 2D grid.</text>
  1038	
  1039	</svg>
  1040	<figcaption><strong>Fig 11.</strong> The seven terminal backends in v2026.5.7 README order. Only Daytona and Modal carry the documented "serverless persistence" semantics: idle hibernation, on-demand wake. The other backends' per-backend execution-location and persistence semantics are not characterized that way in the docs, so the figure does not extrapolate them onto a 2D grid.</figcaption>
  1041	</figure>
  1042	
  1043	The matrix backs one specific semantic claim about a subset of the backends: per the docs, "Daytona and Modal offer serverless persistence: your agent's environment hibernates when idle and wakes on demand." That is the only documented per-backend behavior of that shape; the others' execution-location and persistence semantics aren't characterized in the same way and the post doesn't infer them.
  1044	
  1045	Subagent isolation. The README's feature entry is "Spawn isolated subagents for parallel workstreams." Two distinct mechanisms back this claim. The first is `delegate_task`, a tool that spawns process-and-context-isolated subagents inside the existing backend. The second is `hermes -w`, added in the v0.2.0 release as "Git Worktree Isolation": `hermes -w` launches isolated agent sessions in git worktrees, so two subagents working on the same repo don't step on each other's working trees. Process isolation and filesystem isolation: the same word, two different mechanisms.
  1046	
  1047	<figure>
  1117	### 17. Where Hermes lands on the dial map
  1118	
  1119	Hermes sits at daemon-or-continuous on the lifespan dial, gateway on the surface dial (the always-on control plane is the architectural bet, the same as OpenClaw's), and skill-creation / self-improvement on the adaptation dial. That last rung is the one the team's coding-agent rollout reached at v4 in Act 1: skills compound, recall reaches across sessions, the user model accumulates, and the agent rewrites its own toolset between turns.
  1120	
  1121	The contrast with §11's OpenClaw placement is sharp at exactly one rung. *Lifespan*: both daemon-or-continuous; the agent stays running. *Surface*: both gateway; the always-on control plane owns sessions, channels, and tools. *Adaptation*: OpenClaw at persistent-sessions, Hermes at skill-creation. The two architectures live in the same neighborhood on two dials and split decisively on the third.
  1122	
  1123	That makes Hermes a different question from OpenClaw, not a rung above. OpenClaw asks how to make an always-available assistant *reachable*. Hermes asks how to make one *improve*. Both answered their question; the dial map shows where each answer landed.
  1124	
  1125	The next section is the matrix.
  1126	
  1127	{/* Reader can now: predict that the closing matrix will place all frameworks on the same map and that the placements will not collapse to a ladder. */}
  1128	
  1129	## Closing: the matrix
  1130	
  1248	## References
  1249	
  1250	- [My Claude Code Plugin Stack After Months of Trial and Error](https://augusteo.com/blog/claude-code-plugin-stack). The adaptation-axis counterpart cited in this post's Act 1, Augusteo 2026.
  1251	- [Hand Tools, Power Tools, and the AI Coding Debate](https://augusteo.com/blog/hand-tools-power-tools-ai-coding-debate). The category-setup callback at the opening of this post's Act 2 and the closing line, Augusteo 2026.
  1252	
  1253	**OpenClaw primary sources**
  1254	
  1255	- [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw). Repository: README, VISION.md, CONTRIBUTING.md, Security model section, Development channels section. README accessed at commit 91ed160 on 2026-05-07.
  1256	- [docs.openclaw.ai](https://docs.openclaw.ai). Official OpenClaw documentation: Gateway, configuration, sandboxing, concepts/agent, concepts/session. Accessed 2026-05-08.
  1257	- [Joining OpenAI / OpenClaw foundation](https://steipete.me/posts/2026/openclaw). Peter Steinberger, blog post, 2026-02-14.
  1258	
  1259	**Claw family primary sources**
  1260	
  1261	- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw). NanoClaw repository: README and architecture section. Accessed 2026-05-08.
  1262	- [sipeed/picoclaw](https://github.com/sipeed/picoclaw). PicoClaw (the canonical Sipeed-authored Go rebuild). Release v0.2.8, 2026-04-30.
  1263	- [breakcafe/picoclaw](https://github.com/breakcafe/picoclaw). PicoClaw (the name-collision serverless fork of NanoClaw, distinct project). Release v1.2.23, accessed 2026-05-08.
  1264	- [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). ZeroClaw repository: README and repo description, with the unauthorized-affiliation disclaimer. Release v0.7.5, 2026-05-08.
  1265	- [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw). ZeptoClaw repository: README, COMPARISON.md, and Zepto Stack section listing ZeptoPM / ZeptoCapsule / ZeptoClaw / ZeptoRT. Release v0.9.2, 2026-04-07.
  1266	
  1267	**Hermes Agent primary sources**
  1268	
  1269	- [NousResearch/hermes-agent on GitHub](https://github.com/NousResearch/hermes-agent). Repository: README, [LICENSE](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE), [pyproject.toml](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml), release notes. Tag v2026.5.7 (v0.13.0, "The Tenacity Release"), 2026-05-07.
  1270	- [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com). Official Hermes Agent documentation: features/tools, configuration, installation, guides/migrate-from-openclaw. Accessed 2026-05-08.
  1271	- [Hermes Agent v0.2.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12). First public tagged release; introduced git-worktree isolation. 2026-03-12.
  1272	
  1273	**agentskills.io and Honcho**
  1274	
  1275	- [agentskills.io](https://agentskills.io). Agent Skills open-standard overview/home page: lineage, format, adopter framing. Accessed 2026-05-08.
  1276	- [plastic-labs/honcho](https://github.com/plastic-labs/honcho). Honcho memory library by Plastic Labs. License AGPL-3.0; version 3.0.6 last pushed 2026-05-07.
  1277	
  1278	**Third-party framings discussed**
  1279	
  1280	- [The Claw AI Agent Family](https://peterwoods.online/blog/the-claw-ai-agent-family). Peter Woods, 2026-02-19. The single-axis Claw-family taxonomy this post examines and contradicts.
  1281	- [OpenClaw surpasses React](https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software). Star History (Bytebase) blog, 2026-03-01. Third-party star-ranking analysis (cited as secondary; not load-bearing in this post).

 succeeded in 0ms:
   172	Every load-bearing claim the post will make has one row mapping the claim to a quoted excerpt from a primary source. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row. Recency: actively-evolving (12-month bar). Today: 2026-05-09 (Phase 7 freshness pass run on 2026-05-09; pubDate := 2026-05-09); bar cutoff: 2025-05-09.
   173	
   174	| # | Claim (load-bearing assertion) | Quoted source (excerpt) | Source ID (URL + commit/tag + date) | Recency status |
   175	|---|---|---|---|---|
   176	| 1 | OpenClaw is "a personal AI assistant you run on your own devices" with the Gateway as a control plane | "**OpenClaw** is a *personal AI assistant* you run on your own devices… The Gateway is just the control plane — the product is the assistant." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
   177	| 2 | OpenClaw's Gateway is a "single control plane for sessions, channels, tools, and events" | "**Local-first Gateway** — single control plane for sessions, channels, tools, and events." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07) | passes |
   178	| 3 | OpenClaw runs as an always-on user-service process (launchd / systemd) | "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."; gateway docs: "One always-on process for routing, control plane, and channel connections." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/gateway accessed 2026-05-08 | passes |
   179	| 4 | Multi-agent routing: "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)" | "**Multi-agent routing** — route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." | github.com/openclaw/openclaw README @ 91ed160 (2026-05-07); docs.openclaw.ai/gateway/configuration accessed 2026-05-08 | passes |
   180	| 5 | OpenClaw security: tools run on host for `main` session by default | "Default: tools run on the host for the `main` session, so the agent has full access when it is just you." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
   181	| 6 | OpenClaw security: non-`main` sessions can sandbox via Docker / SSH / OpenShell | "set `agents.defaults.sandbox.mode: \"non-main\"` to run non-`main` sessions inside sandboxes. Docker is the default sandbox backend; SSH and OpenShell backends are also available." | github.com/openclaw/openclaw README @ 91ed160 — Security model section; docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
   182	| 7 | OpenClaw sandbox typical defaults: allow `bash`, `process`, `read`, `write`, `edit`, session-management; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway` | "Typical sandbox default: allow `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; deny `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`." | github.com/openclaw/openclaw README @ 91ed160 — Security model section | passes |
   183	| 8 | OpenClaw release cadence: stable `vYYYY.M.D`, beta `vYYYY.M.D-beta.N`, dev = main HEAD | "**stable**: tagged releases (`vYYYY.M.D` or `vYYYY.M.D-<patch>`)… **beta**: prerelease tags (`vYYYY.M.D-beta.N`)… **dev**: moving head of `main`" | github.com/openclaw/openclaw README @ 91ed160 — Development channels section | passes |
   184	| 9 | Latest stable OpenClaw release at research time: v2026.5.7 (2026-05-07) | gh API release tag `v2026.5.7` published_at 2026-05-07 | github.com/openclaw/openclaw/releases/tag/v2026.5.7 | passes |
   185	| 10 | OpenClaw was first published on 2025-11-24 under the name **Warelay** (not Clawdbot — that's a later rename) | "OpenClaw started as a personal playground… It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw." Repo first-commit 2025-11-24T10:16:47Z; first release `warelay 0.1.1` published 2025-11-25T13:24:35Z. | github.com/openclaw/openclaw/blob/main/VISION.md (commit 11abe5e, 2026-04-24); gh API repos/openclaw/openclaw; releases/tag/v0.1.1 | passes |
   186	| 11 | The full naming sequence is Warelay → Clawdis → Clawdbot → Moltbot → OpenClaw (VISION.md collapses Clawdis for brevity) | clawdis-stage release: `clawdis 2.0.0-beta1` published 2025-12-19. Clawdbot rename: commit 246adaa1 "chore: rename project to clawdbot" (2026-01-04). OpenClaw rename: `openclaw 2026.1.29` published 2026-01-30. | gh API repos/openclaw/openclaw releases + commits | passes |
   187	| 12 | Project author: Peter Steinberger (Austrian developer, well-known in iOS dev community) | Steinberger's first-party blog (steipete.me) is the author profile; nationality cross-confirmed via Euronews. README does not state nationality; flag as inferred if prose names it. | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw author metadata | passes |
   188	| 13 | 2026-02-14: Steinberger announced he was joining OpenAI; OpenClaw will move to a foundation (announced as forthcoming, not formally established) | "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of 2026-05-08, no GOVERNANCE.md / FOUNDATION.md in repo; CONTRIBUTING.md still names Steinberger "Benevolent Dictator." | steipete.me/posts/2026/openclaw (2026-02-14); github.com/openclaw/openclaw repo state on 2026-05-08 | passes |
   189	| 14 | OpenClaw exceeded 250K stars by ~2026-03-01 (per Star History blog, **secondary attribution** — Star History is a third-party analytics blog; the date snapshot AND the "most-starred non-aggregator software project" ranking framing both originate there, not in any first-party OpenClaw / Steinberger artifact). Prose must say "per Star History's analysis" if it uses the comparison. | "OpenClaw has now crossed 250K+ stars, overtaking React to become the most-starred non-aggregator software project on GitHub." (Star History — quoted as third-party analysis, not as primary fact) | star-history.com/blog/openclaw-surpasses-react-most-starred-software/ (2026-03-01) | **secondary-attribution-only** — Star History is third-party; can be quoted as analysis but cannot back a primary star-ranking claim. The primary fact for stars is gh API live count (row 15). |
   190	| 15 | OpenClaw live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 369,911 | gh API `repos/openclaw/openclaw` field `stargazers_count: 369911` | api.github.com/repos/openclaw/openclaw accessed 2026-05-09 (was 369,860 on 2026-05-08; +51 day-over-day; not load-bearing in prose) | passes |
   191	| 16 | OpenClaw workspaces are per-agent filesystem roots (default `~/.openclaw/workspace`); sessions are conversation contexts; sandboxes are optional execution-isolation backends | "Workspace root: `~/.openclaw/workspace` (configurable via `agents.defaults.workspace`)." "OpenClaw organizes conversations into **sessions**. Each message is routed to a session based on where it came from -- DMs, group chats, cron jobs, etc." "a **single embedded agent runtime** - one agent process per Gateway, with its own workspace, bootstrap files, and session store." | github.com/openclaw/openclaw README @ 91ed160; docs.openclaw.ai/concepts/agent and /concepts/session accessed 2026-05-08 | passes |
   192	| 17 | OpenClaw sandbox workspace-access modes: `none` (isolated workspace under `~/.openclaw/sandboxes`), `ro` (mount workspace read-only at `/agent`), `rw` (read-write at `/workspace`) | docs.openclaw.ai/gateway/sandboxing access-mode table: "**`none`** — sandbox gets an isolated workspace under `~/.openclaw/sandboxes/<sessionId>/workspace`; the agent's `~/.openclaw/workspace` is not mounted. **`ro`** — workspace mounted read-only at `/agent` inside the sandbox. **`rw`** — workspace mounted read-write at `/workspace`; tool-side writes propagate back to the host." | docs.openclaw.ai/gateway/sandboxing accessed 2026-05-08 | passes |
   193	| 18 | NanoClaw (qwibitai) self-frames as container-isolation + minimalism, not autonomy | "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." "Agents run in containers...they can only see what's explicitly mounted." "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes |
   194	| 19 | NanoClaw operates on a session-plus-cron model (per-session DBs `inbound.db` / `outbound.db`; "recurring jobs that run Claude and can message you back") — NOT continuous-lifespan-with-high-agency. **Note:** the architectural-detail summary here (per-session DB names, cron-jobs phrasing) was the Phase 2 research subagent's paraphrase of the README architecture section; Phase 4 drafting MUST re-quote the actual README phrasing verbatim before any prose claim about NanoClaw architecture details lands in the post. The verbatim quotes confirmed in Phase 2 are: "An AI assistant that runs agents securely in their own containers"; "Agents run in containers...they can only see what's explicitly mounted"; "One process, a few source files and no microservices." | github.com/qwibitai/nanoclaw README accessed 2026-05-08 | passes (with Phase-4 verbatim-re-quote requirement) |
   195	| 20 | Two distinct projects use the name `picoclaw`: sipeed/picoclaw (canonical, Go, IoT-targeted) and breakcafe/picoclaw (declared fork of NanoClaw, AWS-Lambda serverless) | sipeed README: "An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project." breakcafe README: "Fork of NanoClaw — replaces the always-on multi-channel orchestrator with a single-container, per-request execution model designed for AWS Lambda…" | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/breakcafe/picoclaw README v1.2.23 accessed 2026-05-08 | passes |
   196	| 21 | sipeed/PicoClaw self-frames around hardware portability (sub-$10 hardware, <10MB RAM, <1s boot, RISC-V/ARM/MIPS/x86) — not session-lifespan | sipeed README architecture and platform sections; "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot." Targets "$10 hardware with <10MB RAM" with "<1s" boot times on 0.6GHz single-core processors. | github.com/sipeed/picoclaw README v0.2.8 (2026-04-30) | passes |
   197	| 22 | ZeroClaw (zeroclaw-labs) v0.7.5 released 2026-05-08; single Rust binary; deploys as continuous always-on (systemd / launchctl / Windows Service); supervised-default autonomy — NOT per-task structured task runner | Repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." | github.com/zeroclaw-labs/zeroclaw README + repo description accessed 2026-05-08; release v0.7.5 published 2026-05-08 | passes |
   198	| 23 | ZeptoClaw (qhkm) v0.9.2 released 2026-04-07; full personal-AI-assistant infrastructure (workspace memory, conversation history, agent swarms, plugins, multi-channel gateway, sandboxed autonomy) — NOT a stateless function | "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." "Delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes |
   199	| 24a | peterwoods.online's NanoClaw role-assignment ("autonomous worker, continuous lifespan, high agency") is contradicted by NanoClaw's own README. peterwoods is the framing under test, NOT a primary source for any architectural claim about NanoClaw. | peterwoods.online (2026-02-19): NanoClaw "acts as an autonomous worker, possessing a continuous lifespan and high agency." qwibitai/nanoclaw README (2026-05-08): "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." Architecture is per-session DBs (`inbound.db`, `outbound.db`) plus cron jobs — session-plus-cron, not continuous-lifespan-with-high-agency. The word "autonomous" does not appear in the README's self-description. | peterwoods.online/blog/the-claw-ai-agent-family (2026-02-19, **secondary**); github.com/qwibitai/nanoclaw README accessed 2026-05-08 (primary) | passes — peterwoods explicitly secondary; primary contradiction is verbatim |
   200	| 24b | peterwoods.online's PicoClaw role-assignment ("session-scoped persistent assistant for interactive coding/exploration") is partially-accurate against canonical sipeed/PicoClaw, which self-frames around hardware portability rather than session lifespan. | peterwoods.online: PicoClaw "functions as a persistent assistant" for "Interactive tasks, coding assistance, exploration." sipeed/picoclaw README v0.2.8 (2026-04-30): "PicoClaw is an ultra-lightweight personal AI assistant inspired by NanoBot... An independent open-source project initiated by Sipeed, written entirely in Go from scratch." Targets <$10 hardware, RISC-V/ARM/MIPS/x86, 16+ chat platforms (always-on multi-channel). | peterwoods.online (2026-02-19, secondary); github.com/sipeed/picoclaw v0.2.8 (primary) | passes — "personal assistant" framing matches; "session-scoped / interactive coding" framing is editorial overlay not present in primary |
   201	| 24c | peterwoods.online's ZeroClaw role-assignment ("structured task runner, per-task lifespan, low autonomy") is contradicted by ZeroClaw's own README and repo description. | peterwoods.online: ZeroClaw "operates as a structured task runner" with "per task" lifespan and "low" autonomy, designed for "Reproducible pipelines, workflow automation." zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08) repo description: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM — deploy anywhere, swap anything." README: "ZeroClaw is an agent runtime — a single Rust binary you configure and run." "default autonomy is `supervised`: medium-risk ops require approval, high-risk blocked." Continuous always-on (systemd / launchctl / Windows Service). | peterwoods.online (2026-02-19, secondary); github.com/zeroclaw-labs/zeroclaw v0.7.5 (2026-05-08, primary) | passes — direct contradiction |
   202	| 24d | peterwoods.online's ZeptoClaw role-assignment ("stateless function operating on single actions, no autonomy") is **directly contradicted** by ZeptoClaw's own README. (codex-flagged at pre-Phase-1-lock; primary contradiction confirmed in Phase 2.) | peterwoods.online: ZeptoClaw "is 'closer to a stateless function call' with 'per action' lifespan and 'none' autonomy, serving 'High-volume transformations, deterministic actions.'" qhkm/zeptoclaw README v0.9.2 (2026-04-07): "Fast, small, secure, and local-first personal AI assistant infrastructure." "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS — with tools, memory, channels, providers, and sandboxed autonomy built in." "Workspace memory, long-term key-value store, conversation history." | peterwoods.online (2026-02-19, secondary); github.com/qhkm/zeptoclaw v0.9.2 (primary) | passes — direct contradiction |
   203	| 25 | The four Claw projects are NOT a coordinated family — distinct authors (qwibitai / sipeed / zeroclaw-labs / qhkm), distinct languages (TS / Go / Rust / Rust), no mutual cross-references in their READMEs | Direct quotes confirmed by Phase 2 subagent: ZeroClaw repo (`zeroclaw-labs/zeroclaw`) explicitly disclaims sibling-project membership: **"other repositories claiming affiliation are unauthorized"** (ZeroClaw README, accessed 2026-05-08). sipeed/picoclaw README: **"An independent open-source project initiated by Sipeed, written entirely in Go from scratch — not a fork of OpenClaw, NanoBot, or any other project."** ZeptoClaw COMPARISON.md contrasts against NanoClaw, PicoClaw, OpenClaw, NemoClaw — but **omits ZeroClaw entirely** (corroborates non-coordination). NanoClaw README cites only OpenClaw as predecessor; no mention of PicoClaw, ZeroClaw, ZeptoClaw. | github.com/qwibitai/nanoclaw README; github.com/sipeed/picoclaw README v0.2.8 (2026-04-30); github.com/zeroclaw-labs/zeroclaw README v0.7.5 (2026-05-08); github.com/qhkm/zeptoclaw COMPARISON.md v0.9.2 (2026-04-07) | passes |
   204	| 26 | ZeptoClaw is part of "Zepto Stack" (ZeptoPM orchestrator, ZeptoCapsule sandboxer, ZeptoRT durable runtime) — a real coordinated sub-family, separate from "Claw" | qhkm/zeptoclaw README explicitly identifies the Zepto Stack as a coordinated sub-family: ZeptoPM (orchestrator), ZeptoCapsule (sandboxer), ZeptoRT (durable runtime). **Note:** Phase 2 subagent identified the Zepto Stack as a real coordinated sub-family but did not capture a single verbatim README sentence enumerating the four members; Phase 4 drafting MUST re-quote the README's actual phrasing of the Zepto Stack lineup before any prose claim. | github.com/qhkm/zeptoclaw README v0.9.2 (2026-04-07) | passes (with Phase-4 verbatim-re-quote requirement) |
   205	| 27 | Hermes Agent v0.13.0 (git tag `v2026.5.7`) "The Tenacity Release" published 2026-05-07 | gh API release tag `v2026.5.7`, name "Hermes Agent v0.13.0 (2026.5.7) — The Tenacity Release", published_at 2026-05-07T16:23:08Z | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
   206	| 28 | Hermes "closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search with LLM summarization for cross-session recall | "**A closed learning loop** — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
   207	| 29 | Hermes builds "a deepening model of who you are across sessions" via the closed loop | "it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions" | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
   208	| 30 | Hermes uses external library Honcho (Plastic Labs, AGPL-3.0) for "dialectic user modeling" — exposed via Honcho's `/peers/{peer_id}/chat` endpoint | Hermes README: "Honcho dialectic user modeling." Honcho README: "Honcho is an open source memory library with a managed service for building stateful agents." Honcho version 3.0.6 (2026-05-07). | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/plastic-labs/honcho accessed 2026-05-08 | passes |
   209	| 31 | Hermes's own code is MIT-licensed; Honcho is AGPL-3.0 and packaged as the optional `honcho` extra in Hermes's `pyproject.toml`, NOT as an unconditional core dependency. **However**, aggregate extras `all` and `termux` include `hermes-agent[honcho]` — so install paths using those aggregates bring Honcho along without a Honcho-specific opt-in. (Per Gate 0 Run 1 finding 3 + Run 3 finding 1.) Prose must say "Honcho ships as an optional extra; aggregate `all`/`termux` extras include it," NOT "Hermes depends on AGPL Honcho" and NOT "users must explicitly opt in to Honcho." | Hermes LICENSE = MIT (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`). Honcho LICENSE = AGPL-3.0 (`gh api repos/plastic-labs/honcho` returns `license.spdx_id: AGPL-3.0`). Hermes `pyproject.toml` `[project.optional-dependencies]` (codex Runs 1+3 verified): `honcho = ["honcho-ai>=2.0.1,<3"]`; `all` and `termux` extras both include `hermes-agent[honcho]`. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE; github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml; gh API repos/plastic-labs/honcho | passes |
   210	| 32 | Hermes README claims "40+ tools, toolset system, terminal backends" — README is the source; docs page enumerates 8 toolset *categories* not 40+ items | README at v2026.5.7 verbatim "40+ tools…" Docs `/docs/user-guide/features/tools` lists 8 categories: Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/user-guide/features/tools | marginal — README is authoritative on the count but unaudited at docs layer; quote the README's exact phrasing rather than extrapolating |
   211	| 33 | Hermes runs on **seven** terminal backends per README (local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox); marketing site says 5, docs index says 6 — README is authoritative | README v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Open issue #5995 corroborates Daytona, SSH, Singularity, Modal as the four remote backends. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/NousResearch/hermes-agent/issues/5995 | passes (with surface-inconsistency note) |
   212	| 34 | Daytona and Modal offer "serverless persistence — your agent's environment hibernates when idle and wakes on demand" | "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." | hermes-agent.nousresearch.com/docs/user-guide/configuration accessed 2026-05-08 | passes |
   213	| 35 | Hermes can spawn isolated subagents (process / context isolation via `delegate_task`); separately, `hermes -w` provides git-worktree filesystem isolation | README: "Spawn isolated subagents for parallel workstreams." v0.2.0 release notes: "Git Worktree Isolation — `hermes -w` launches isolated agent sessions in git worktrees for safe parallel work on the same repo." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; releases/tag/v2026.3.12 | passes |
   214	| 36 | Python RPC scripting: "Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns" (README's own framing) | README v2026.5.7 verbatim | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes (quote README; do not over-extrapolate "zero-context-cost") |
   215	| 37 | Hermes's Skills Hub is compatible with the agentskills.io open standard (originally developed by Anthropic; released as an open standard; adopted by **multiple** AI agent products — specific adopter count NOT primary-backed in agentskills.io spec or Hermes docs; Run 1 codex finding dropped the "30+" number; Run 2 codex finding fixed the source page from `/specification` to `/` overview). | Hermes README: "Compatible with the agentskills.io open standard." agentskills.io overview/home page (`https://agentskills.io/`): "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." (Note: the lineage quote lives on the overview/home page; `/specification` is a separate page describing the file-format spec; `/clients` shows adopters but does not enumerate to a specific 30+ count.) | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; agentskills.io/ (overview/home) accessed 2026-05-08 | passes — count claim removed; Anthropic-origin and open-standard claims primary-backed; correct page cited |
   216	| 38 | First public Hermes Agent release: v0.2.0 (git tag `v2026.3.12`) on 2026-03-12; pre-public v0.1.0 internal phase preceded it | Release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." Repo created_at 2025-07-22 (private dev). | github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12; gh API repos/NousResearch/hermes-agent | passes |
   217	| 39a | Hermes v0.13.0 (tag v2026.5.7) single-curl install supports Linux / macOS / WSL2 / Android (Termux). **Native Windows is NOT supported in v0.13.0 — the README directs Windows users to WSL2.** (Per Gate 0 Run 1 finding 1: the original row claimed Windows was added in v0.13.0; codex verified it isn't.) | README v2026.5.7 Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh \| bash`. Docs Installation: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." Per the v2026.5.7 README, Windows users are directed to WSL2; native Windows is not in the release. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/getting-started/installation accessed 2026-05-08 | passes |
   218	| 39b | A native Windows installer commit landed **post-v0.13.0** on 2026-05-08 (commit `b7fe7ed7bd1740b01315c4bd15b254aa738124e5`) — NOT in any tagged release as of today. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, not yet in a tagged release." | Commit `b7fe7ed7bd` message: "feat(windows-install): bundle portable MinGit instead of relying on winget" — committed 2026-05-08, AFTER the v2026.5.7 release tag of 2026-05-07. | github.com/NousResearch/hermes-agent/commit/b7fe7ed7bd1740b01315c4bd15b254aa738124e5 | passes (post-release commit; will become a tagged-release fact at the next Hermes release) |
   219	| 40 | Hermes live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 139,371 | gh API `repos/NousResearch/hermes-agent` field `stargazers_count: 139371` | api.github.com/repos/NousResearch/hermes-agent accessed 2026-05-09 (was 139,109 on 2026-05-08; +262 day-over-day; not load-bearing in prose) | passes |
   220	| 41 | First-party migration tooling: `hermes claw migrate` imports OpenClaw / `~/.clawdbot/` / `~/.moltbot/` setups (settings, memories, skills, API keys) | "If you're coming from OpenClaw, Hermes can automatically import your settings, memories, skills, and API keys." "`hermes claw migrate` imports your OpenClaw (or legacy Clawdbot/Moldbot) setup into Hermes." "Reads from `~/.openclaw/` by default. Legacy `~/.clawdbot/` or `~/.moltbot/` directories are detected automatically." | hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw; github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
   221	| 42 | The "110K stars in 10 weeks" / "migration wave" framing originates in third-party blogs and has no primary backing — Hermes ships first-party migration tooling but the *quantitative* migration claim is unsupported | Star count of 139,109 on 2026-05-08 vs unsourced "110K in 10 weeks." Migration tooling is first-party (row 41); the *wave* framing is third-party. | gh API live count; absence in Nous Research first-party announcements | UNSUPPORTED — quantitative wave claim; if the post mentions adoption velocity, cite the live count + access date and avoid the "wave" framing |
   222	| 43 | v0.13.0 release scale: 864 commits, 588 merged PRs, 282 issues closed (13 P0, 36 P1), 295 community contributors | Release notes for `v2026.5.7` | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
   237	## Related posts on augusteo.com
   238	
   239	Phase 2 step 8 corpus scan (2026-05-08) over `src/content/blog/`. The existing corpus is largely ML-systems / vision-stack / book-review heavy; the strongest topical adjacencies for an open-source agentic-frameworks post are two recent (Feb 2026) Vic posts on AI coding tooling.
   240	
   241	### 1. [The Claude Code Plugins I Use Every Day](/blog/claude-code-plugin-stack)
   242	
   243	**Slug:** `claude-code-plugin-stack`. **Pubdate:** 2026-02-09. (Note: a near-identical second slug `claude-code-plugins-i-use-every-day` exists with the same content; the canonical is `claude-code-plugin-stack` — the one with a hero image and sharper title.)
   244	
   245	**One-line summary:** Vic's curated Claude Code plugin stack with a security argument for sticking to the official store; references Snyk's ToxicSkills study, prompt-injection attacks via injected marketplace plugins, and the Superpowers skills framework.
   246	
   247	**Why it's relevant to this post:** Claude Code is itself an open-source agentic coding framework, and the post is built around the *adaptation* dial in microcosm — how plugins / skills extend the agent's capability surface. The post quotes the agentskills.io standard's lineage indirectly (Superpowers, the official store), which lines up with Hermes Agent's `agentskills.io` compatibility (matrix row 37).
   248	
   249	**Anchor points in the new post:**
   250	- **Act 1 — adaptation dial setup.** When introducing the *adaptation* axis (stateless → persistent memory → skill creation / self-improvement), inline-link to "[Vic's Claude Code plugin stack](/blog/claude-code-plugin-stack)" as a concrete adaptation-axis example: skills + plugins as the lever for extending agent capability.
   251	- ~~**Act 3 — Hermes `agentskills.io` callback.**~~ **SUPERSEDED** — Gate 1 Run 1 finding 7 flagged the "same agentskills.io standard" claim as unsupported by both the matrix and the Claude Code plugin post itself (verified independently — that post does not invoke `agentskills.io` by name). Run 1 weakened the wording; Run 2 finding 5 then dropped the §13 cross-reference entirely. Run 3 finding 2 caught that this anchor-point instruction was still live and could reintroduce the bad claim during Phase 4 drafting. **Drafters: do NOT add a second inline link to the Claude Code plugin post in §13 or anywhere else in Act 3.** The §4 callback (adaptation dial setup) is the only inline link; the post still appears in `## References`.
   252	
   253	### 2. [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate)
   254	
   255	**Slug:** `hand-tools-power-tools-ai-coding-debate`. **Pubdate:** 2026-02-08.
   256	
   257	**One-line summary:** A meditation on the AI coding debate framed through hand tools vs power tools woodworking — argues code is a liability and AI lets you focus on outcomes; cites Y Combinator stat that 25% of the latest cohort has codebases 95% AI-generated.
   258	
   259	**Why it's relevant to this post:** Sets up the *category* the new post lives within. The agent-frameworks ecosystem is the substrate the AI coding debate plays out on; choosing OpenClaw vs Hermes is choosing a *power-tool shape*. Vic's existing post argues *that* AI coding matters; the new post examines *which AI agent* and *why the differences matter*.
   260	
   261	**Anchor points in the new post:**
   262	- **Act 1 — opening setup**, after introducing the three dials but before diving into OpenClaw: a one-sentence inline-link callback that names the post and what it established (the AI-coding category as load-bearing for engineering practice). Pattern matches `omni-modal-stack` ↔ `unified-vision-stack` cross-references.
   263	- **Optional closing italic line**, if the post wraps with a "where this fits" coda: a sequel-flavored callback to the AI coding debate — "if you accept the [hand-tools-power-tools framing](/blog/hand-tools-power-tools-ai-coding-debate), the next question is which power tool to grab."
   264	
   265	### Posts considered but not chosen
   266	
   267	- **`ms-dos-to-llms-computing-next-transition`** (2025-06-18) — older (~11 months), more about Karpathy's "LLMs as new OS" framing. Topic adjacency is real but tangential; Karpathy's framing is at a different altitude than this post. Skipped.
   268	- **`claude-ignored-my-instructions`**, **`chatgpt-fails-task`**, **`enforcing-bun-with-hooks`** — short anecdote / how-to posts. No load-bearing anchor point in the new post's structure.
   269	
   270	### URL-form rule (per Phase 4 step 7)
   271	
   272	In-prose links use root-relative form: `[Title](/blog/<slug>)`. The `## References` section uses full https URL form: `[Title](https://augusteo.com/blog/<slug>). <one-line role>, Augusteo <year>.` This is the canonical pattern at `src/content/blog/omni-modal-stack/index.mdx:1431`.
   273	
   639	## Phase 7 freshness pass (run 2026-05-09)
   640	
   641	Re-checked every load-bearing matrix row on 2026-05-09 (the day after the Phase 2 access dates of 2026-05-08). Most rows pin to immutable artifacts (specific commit hashes, immutable release tags) and require no re-check — they remain valid for as long as those commits/tags exist. The mutable surfaces re-checked:
   642	
   643	| Surface | Rows it backs | Re-check method | Result |
   644	|---|---|---|---|
   645	| OpenClaw repo HEAD + latest release | rows 1–17, 25 | `gh api repos/openclaw/openclaw/releases` + `pushed_at` | Latest release still `v2026.5.7` (2026-05-07T20:57Z); main HEAD pushed 2026-05-09T02:31Z but the matrix pins to commit `91ed160` and tag `v2026.5.7`, both immutable. No claim affected. |
   646	| Hermes Agent repo HEAD + latest release | rows 27–43 | `gh api repos/NousResearch/hermes-agent/releases` + `pushed_at` | Latest release still `v2026.5.7` (Hermes Agent v0.13.0, 2026-05-07T16:23Z). main HEAD pushed 2026-05-09T01:50Z; matrix pins to tag `v2026.5.7`. No claim affected. |
   647	| Hermes post-release Windows commit `b7fe7ed7bd` (row 39b) | row 39b | `gh api compare/v2026.5.7...b7fe7ed7bd` → `status` | Returned `ahead` — commit is reachable from main but not from the v2026.5.7 tag, so it's still "post-v0.13.0, not yet in a tagged release." Row 39b's wording stays exact. |
   648	| OpenClaw star count (row 15) | row 15 | live gh API | 369,860 → 369,911 (+51 day-over-day). Updated row 15. Not load-bearing in prose. |
   649	| Hermes star count (row 40) | row 40 | live gh API | 139,109 → 139,371 (+262 day-over-day). Updated row 40. Not load-bearing in prose. |
   650	| Steinberger blog (rows 12–13) | rows 12–13 | WebFetch with edit-history probe | Publication date "14 Feb, 2026" stable; (a) joining OpenAI, (b) OpenClaw will move to a foundation, (c) foundation not yet formally established — all three claims still verbatim-supported. |
   651	| peterwoods.online (rows 24a–24d) | rows 24a–24d | WebFetch with edit-history probe | Publication date "2026-02-19" stable; the four role-assignments (NanoClaw/PicoClaw/ZeroClaw/ZeptoClaw) unchanged. The contradictions documented in 24a/24c/24d are still live. |
   652	| Star History blog (row 14) | row 14 | WebFetch with edit-history probe | Publication date "Mar 1, 2026" stable; "OpenClaw has now crossed 250K+ stars, overtaking React" wording unchanged. Row 14's secondary-attribution-only status holds. |
   653	
   654	No claim flipped. No row needed prose-side rework. Star-count refresh (rows 15, 40) is a snapshot bump only — neither number appears in prose; their use is documenting the publication-date GitHub state for future reference.
   655	
   656	Matrix preamble bumped: "Today: 2026-05-09; bar cutoff: 2025-05-09" (was 2026-05-08 / 2025-05-08). The 1-day shift moves no row inside or outside the actively-evolving 12-month bar.

exec
/bin/zsh -lc "rg -n \"\\[(["'^'"\\]]+)\\]\\((https://augusteo.com|/blog/)|https://augusteo.com|peterwoods\\.online|steipete\\.me|github\\.com|docs\\.openclaw|hermes-agent\\.nousresearch|agentskills\\.io|sqlite\\.org\" src/content/blog/openclaw-and-hermes-agent/index.mdx" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
20:It comes from a February 2026 post on peterwoods.online called [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family). ZeptoClaw is described as "closer to a stateless function call." NanoClaw is described as an "autonomous worker." OpenClaw, PicoClaw, and ZeroClaw fill the rungs in between. The post does what good taxonomies do: it gives the namespace a name and a shape, so readers reach for it whenever the topic comes up.
163:A concrete adaptation-axis example sitting on the skills rung is [the Claude Code plugins I use every day](/blog/claude-code-plugin-stack). Each plugin is a packaged skill: a name, a procedure, and a small amount of glue the agent runs without being prompted. Plugins compound. The agent gets better at the work as more skills accumulate, without the user having to repeat instructions in every session.
286:(See [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate) for the broader framing of AI coding as a category change; OpenClaw is one of the power tools the change is being built around.)
288:The [OpenClaw README](https://github.com/openclaw/openclaw) opens by calling OpenClaw "a personal AI assistant you run on your own devices." Under the Highlights section, the first bullet introduces the architectural center: "Local-first Gateway," which the README describes as "a single control plane for sessions, channels, tools, and events." The Gateway runs as a daemon on the user's own machine: "OpenClaw Onboard installs the Gateway daemon (launchd/systemd user service) so it stays running."
540:The other piece of context is governance. In a February 2026 [blog post](https://steipete.me/posts/2026/openclaw), the project's author Peter Steinberger announced he was joining OpenAI: "I'm joining OpenAI to work on bringing agents to everyone. OpenClaw will move to a foundation and stay open and independent." As of May 2026, that foundation is announced rather than established. There is no GOVERNANCE.md or FOUNDATION.md in the repo, and the CONTRIBUTING.md still names Steinberger as Benevolent Dictator. Both the rename churn and the in-flux governance left room for outside observers to propose taxonomies, which is the immediate context for the next section.
546:§9 ended with a vacuum: a project that had four predecessor names in three months and a governance announcement that hadn't materialized. The vacuum is what gave outside taxonomies room. The most cited of those, peterwoods.online's [*The Claw AI Agent Family*](https://peterwoods.online/blog/the-claw-ai-agent-family) from February 2026, ranks five projects on a single autonomy axis. Three of the four ranks contradict their own primary sources.
548:**NanoClaw** ([qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)) is the one peterwoods places at the high-autonomy end as an "autonomous worker" with "continuous lifespan" and "high agency." The README's actual self-framing is the opposite. NanoClaw introduces itself as "An AI assistant that runs agents securely in their own containers. Lightweight, built to be easily understood and completely customized for your needs." The primary architectural claim is isolation, not autonomy: "Agents run in containers...they can only see what's explicitly mounted." The source-code claim is minimalism: "One process, a few source files and no microservices." The execution model is per-session. The README's architecture section diagrams the flow as `messaging apps → host process (router) → inbound.db → container (Bun, Claude Agent SDK) → outbound.db → host process (delivery) → messaging apps`, with "Two SQLite files per session, each with exactly one writer." The recurring-work description is "Scheduled tasks: recurring jobs that run Claude and can message you back." Sessions plus cron, not continuous lifespan. The word *autonomous* does not appear in NanoClaw's self-description.
552:**sipeed/PicoClaw** ([sipeed/picoclaw](https://github.com/sipeed/picoclaw)) is the partial match. peterwoods labels it a "session-scoped persistent assistant for interactive coding/exploration." The "personal assistant" framing tracks: the README calls it "an ultra-lightweight personal AI assistant inspired by NanoBot." The "interactive coding" overlay does not. sipeed/PicoClaw's self-described emphasis is hardware portability: sub-$10 boards with under 10MB of RAM, sub-second boot times, and deployment across RISC-V, ARM, MIPS, and x86 from a single Go binary. The README also notes 16+ chat-platform integrations, so it is multi-channel, not session-scoped. The work the project is doing is moving an agent down to the smallest hardware it can run on, not scoping it to interactive sessions.
554:**ZeroClaw** ([zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)) is the second flat contradiction. peterwoods labels it a "structured task runner" with "per-task lifespan" and "low autonomy," intended for "reproducible pipelines" and "workflow automation." ZeroClaw's own repo description reads: "Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS, ANY PLATFORM." The README's first architectural sentence describes ZeroClaw as "an agent runtime," which it expands to "a single Rust binary you configure and run." It deploys as a systemd unit, a launchctl plist, or a Windows Service. Its default-autonomy posture is `supervised`, where "medium-risk ops require approval, high-risk blocked." That is continuous always-on (not per-task), supervised default (not low autonomy), full personal-assistant scope (not workflow runner).
556:**ZeptoClaw** ([qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)) is the third and largest contradiction. peterwoods places it at the low-autonomy end as "closer to a stateless function call" with "per action" lifespan and "none" autonomy, intended for "high-volume transformations" and "deterministic actions." The ZeptoClaw README opens: "Fast, small, secure, and local-first personal AI assistant infrastructure." The architectural claim that follows is "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS." What the binary contains is then enumerated in the README as workspace memory, long-term key-value store, conversation history, and the ability to "delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." A batch mode exists ("process hundreds of prompts from text/JSONL files"), but it is one feature among many, not the project's identity. peterwoods's role-assignment is the inverse of the project's actual stance.
715:<figcaption><strong>Fig 7.</strong> The five frameworks placed on the three dials. The four Claw variants scatter: they don't share a center on any dial, and four of their distinctive bets (container minimalism, hardware portability, deploy-anywhere posture, feature breadth) sit off the dial map entirely. The legend names each variant's off-axis bet alongside the role peterwoods.online assigns it; three of those role-assignments contradict the variant's own README, and the fourth is a partial match.</figcaption>
740:OpenClaw and Hermes Agent answer different questions. OpenClaw asks how to make an always-available assistant *reachable* across the channels you already use. Hermes asks how to make one *improve* from its own task history. Hermes Agent v0.13.0, the "Tenacity Release" published May 7 2026, opens its [README](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md) with the answer to that second question.
825:Skills in Hermes follow an external standard. The README describes Hermes as "Compatible with the [agentskills.io](https://agentskills.io) open standard." The standard's overview page describes its lineage: "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." Compatibility with `agentskills.io` is broad-industry table stakes for agent products in 2026, not a Hermes-specific moat. What is Hermes-specific is the *production* of skills: skills appear because the agent decided to write them, not only because the user authored them.
829:{/* Reader can now: see that "skills" in Hermes is the agentskills.io-compatible expression of a broader skill / plugin pattern across agent frameworks. */}
835:[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.
910:The implementation is an external library called [Honcho](https://github.com/plastic-labs/honcho), built by Plastic Labs (not Nous Research). The Honcho README describes it as "an open source memory library with a managed service for building stateful agents." Honcho exposes what it calls a Dialectic API: a `/peers/{peer_id}/chat` endpoint designed to function as "an oracle to the Peer." Hermes treats that endpoint as the place to ask "what should I know about this user before I respond?"
912:There is licensing nuance worth being clear about. Hermes Agent itself is [MIT-licensed](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE). Honcho is AGPL-3.0. Honcho ships as an optional extra in Hermes's `pyproject.toml`, not as an unconditional dependency: `honcho = ["honcho-ai>=2.0.1,<3"]` lives under `[project.optional-dependencies]`. A user who installs base Hermes does not pull AGPL-3.0 code along.
1244:*Companion to [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate), written May 2026.*
1250:- [My Claude Code Plugin Stack After Months of Trial and Error](https://augusteo.com/blog/claude-code-plugin-stack). The adaptation-axis counterpart cited in this post's Act 1, Augusteo 2026.
1251:- [Hand Tools, Power Tools, and the AI Coding Debate](https://augusteo.com/blog/hand-tools-power-tools-ai-coding-debate). The category-setup callback at the opening of this post's Act 2 and the closing line, Augusteo 2026.
1255:- [openclaw/openclaw on GitHub](https://github.com/openclaw/openclaw). Repository: README, VISION.md, CONTRIBUTING.md, Security model section, Development channels section. README accessed at commit 91ed160 on 2026-05-07.
1256:- [docs.openclaw.ai](https://docs.openclaw.ai). Official OpenClaw documentation: Gateway, configuration, sandboxing, concepts/agent, concepts/session. Accessed 2026-05-08.
1257:- [Joining OpenAI / OpenClaw foundation](https://steipete.me/posts/2026/openclaw). Peter Steinberger, blog post, 2026-02-14.
1261:- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw). NanoClaw repository: README and architecture section. Accessed 2026-05-08.
1262:- [sipeed/picoclaw](https://github.com/sipeed/picoclaw). PicoClaw (the canonical Sipeed-authored Go rebuild). Release v0.2.8, 2026-04-30.
1263:- [breakcafe/picoclaw](https://github.com/breakcafe/picoclaw). PicoClaw (the name-collision serverless fork of NanoClaw, distinct project). Release v1.2.23, accessed 2026-05-08.
1264:- [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). ZeroClaw repository: README and repo description, with the unauthorized-affiliation disclaimer. Release v0.7.5, 2026-05-08.
1265:- [qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw). ZeptoClaw repository: README, COMPARISON.md, and Zepto Stack section listing ZeptoPM / ZeptoCapsule / ZeptoClaw / ZeptoRT. Release v0.9.2, 2026-04-07.
1269:- [NousResearch/hermes-agent on GitHub](https://github.com/NousResearch/hermes-agent). Repository: README, [LICENSE](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE), [pyproject.toml](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml), release notes. Tag v2026.5.7 (v0.13.0, "The Tenacity Release"), 2026-05-07.
1270:- [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com). Official Hermes Agent documentation: features/tools, configuration, installation, guides/migrate-from-openclaw. Accessed 2026-05-08.
1271:- [Hermes Agent v0.2.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12). First public tagged release; introduced git-worktree isolation. 2026-03-12.
1273:**agentskills.io and Honcho**
1275:- [agentskills.io](https://agentskills.io). Agent Skills open-standard overview/home page: lineage, format, adopter framing. Accessed 2026-05-08.
1276:- [plastic-labs/honcho](https://github.com/plastic-labs/honcho). Honcho memory library by Plastic Labs. License AGPL-3.0; version 3.0.6 last pushed 2026-05-07.
1280:- [The Claw AI Agent Family](https://peterwoods.online/blog/the-claw-ai-agent-family). Peter Woods, 2026-02-19. The single-axis Claw-family taxonomy this post examines and contradicts.

exec
/bin/zsh -lc 'rg -n "roughly|essentially|in some sense|implicit|training data|toolset|gateway on the surface|control plane owns|same neighborhood|most personal|top-K|JSONL|session store|broad-industry|not a Hermes-specific moat|user judged" src/content/blog/openclaw-and-hermes-agent/index.mdx' in /Users/vic/dev/augusteo.com-astro
exec
/bin/zsh -lc "nl -ba src/content/blog/openclaw-and-hermes-agent/index.mdx | sed -n '715,728p;1043,1115p;1130,1245p'" in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
24:The first is Hermes Agent, which doesn't appear on the ladder at all. Nous Research, which builds Hermes, ships a first-party `hermes claw migrate` command for importing existing OpenClaw setups (covered in §10): concrete evidence the two are evaluated against each other. Hermes's README leads with "a closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search for cross-session recall. The thing that makes Hermes interesting is not that it is "more autonomous" than OpenClaw. It is that the agent rewrites its own toolset between turns. Adaptation is a different axis from autonomy.
66:Climbing the rungs is not free. A session needs a session store. A daemon needs lifecycle management: startup, shutdown, crash recovery. A scheduled agent needs a trigger system. Each rung adds infrastructure the rung below didn't need, which is why honest dial-placement matters more than reaching the top.
342:<text x="180" y="340" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">sessions persist as JSONL on disk</text>
359:<figcaption><strong>Fig 3.</strong> OpenClaw's Gateway sits at the architectural center. Inbound channels (DM, group chat, cron job, per the README's session-routing examples) all land at one always-on process; the Gateway routes each message to one of the agents it hosts, by origin. Each agent has its own filesystem workspace and a JSONL session store. The tool layer is shared but governed at the session boundary.</figcaption>
362:The second highlight follows directly from the first: multi-agent routing. The README's exact phrasing is "route inbound channels/accounts/peers to isolated agents (workspaces + per-agent sessions)." A single Gateway can host multiple agents, like a `home` agent and a `work` agent, each with its own filesystem root, its own session store, its own bootstrap files. The routing rule binds inbound traffic to one of those agents based on where the message arrived from: which channel, which account, which peer.
376:*Sessions* are conversation contexts. The README states that OpenClaw "organizes conversations into sessions. Each message is routed to a session based on where it came from: DMs, group chats, cron jobs." Session transcripts persist as JSONL, one file per session, at `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`. The session store is what makes a "longer-lived agent" actually long-lived: the conversation isn't held in process memory that vanishes on restart, it's a file on disk the agent reads when it resumes.
386:The three modes are a spectrum from "the sandbox can't see anything you have" (`none`) through "the sandbox can read but not write your work" (`ro`) to "the sandbox is essentially the agent" (`rw`).
401:<text x="60" y="164" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">conversation contexts; JSONL transcripts at {"~/.openclaw/agents/<agentId>/sessions/"}</text>
402:<text x="60" y="180" font-family="serif" font-size="9" fill="#1A1A1A" font-weight="600">decision: which inbound messages route to this agent's session store</text>
428:<figcaption><strong>Fig 4.</strong> The three layers compose by nesting. *Workspace* is the per-agent filesystem root and decides which files the agent owns. *Sessions* live inside the workspace as JSONL transcripts and decide which inbound messages land in this agent's store (routed by origin: DM, group chat, cron). *Sandbox* is optional, wraps tool execution for non-main sessions in Docker / SSH / OpenShell, and decides what walls go around the tools the session invokes; three workspace-access modes (`none`, `ro`, `rw`) governing what the sandbox can see of the workspace itself. Each decision is independent: multiple sessions can share one workspace; some sessions can be sandboxed and others not.</figcaption>
518:<text x="430" y="378" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">"the sandbox is essentially the agent"</text>
556:**ZeptoClaw** ([qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)) is the third and largest contradiction. peterwoods places it at the low-autonomy end as "closer to a stateless function call" with "per action" lifespan and "none" autonomy, intended for "high-volume transformations" and "deterministic actions." The ZeptoClaw README opens: "Fast, small, secure, and local-first personal AI assistant infrastructure." The architectural claim that follows is "ZeptoClaw is one Rust binary for running personal AI agents locally, at the edge, or on a VPS." What the binary contains is then enumerated in the README as workspace memory, long-term key-value store, conversation history, and the ability to "delegate to sub-agents with parallel fan-out, aggregation, and cost-aware routing." A batch mode exists ("process hundreds of prompts from text/JSONL files"), but it is one feature among many, not the project's identity. peterwoods's role-assignment is the inverse of the project's actual stance.
726:OpenClaw is gateway-centered with persistent sessions and continuous lifespan. Multi-channel access flows through one always-on control plane; sessions persist as JSONL transcripts, routed by origin into per-agent workspaces, optionally sandboxed. The sessions are persistent, but they are not adaptation memory in the skill-creation sense; the agent doesn't rewrite its own toolset between turns from what those sessions contain. OpenClaw sits at gateway on the surface dial, daemon-or-continuous on the lifespan dial, and persistent-sessions (not skill-creation) on the adaptation dial.
738:Now Hermes. OpenClaw's persistence keeps routing coherent: sessions persist so a Slack conversation on Tuesday picks up where it left off on Monday, and the right inbound message lands in the right session every time. Hermes's persistence is different. It mutates future behavior from past task history. That is the v4 rung the team's rollout reached at the end of Act 1: the agent stops repeating last week's mistakes because it codified them. A session in OpenClaw is a transcript; a session in Hermes is training data the agent learns from between turns. The dial Hermes was designed around is adaptation.
819:Two of the four loop arcs name the same thing from different angles. The first is "autonomous skill creation after complex tasks." After a multi-step interaction the user judged successful, Hermes can write that interaction up as a reusable skill: a named procedure with parameters and the steps that produced the answer. The next time a similar task comes around, the agent invokes the skill rather than re-deriving the procedure from scratch.
825:Skills in Hermes follow an external standard. The README describes Hermes as "Compatible with the [agentskills.io](https://agentskills.io) open standard." The standard's overview page describes its lineage: "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." Compatibility with `agentskills.io` is broad-industry table stakes for agent products in 2026, not a Hermes-specific moat. What is Hermes-specific is the *production* of skills: skills appear because the agent decided to write them, not only because the user authored them.
835:[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.
860:<text x="300" y="176" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">indexed JSONL transcripts; lookup by similarity, not by tag</text>
875:<text x="312" y="263" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">top-K matched snippets</text>
897:<figcaption><strong>Fig 9.</strong> The recall pipeline. A new task triggers an FTS5 query against the SQLite-backed session store; matching transcripts (here, last week's session-bbb) come back as top-K snippets; the LLM summarizes those snippets; the summary lands in the current context, while the raw transcripts do not. The mechanism is what makes session boundaries soft: recall reaches across closed sessions on demand, without those sessions ever having been tagged for the topic. Recall is uncompressed experience the agent searches by query, distinct from a named skill the agent invokes.</figcaption>
900:Recall is not the same as skills. Skills are *codified procedures*; recall is *uncompressed experience the agent searches through on demand*. Both belong to the adaptation dial, but they earn their rungs differently: skills are explicit knowledge, retrievable by name; recall is implicit knowledge, retrievable by query.
914:The footnote that matters: aggregate extras such as `all` and `termux` include `hermes-agent[honcho]`. Install paths that go through those aggregates bring Honcho with them without a separate Honcho-specific opt-in. So "is Hermes's user-modeling stack AGPL?" depends on which install path you use. The base wheel and standalone extras are MIT; the aggregate extras pull in an AGPL-3.0 component. For most personal-assistant deployments the answer is "the user model is AGPL because you took the convenience-extra," but the architecture intentionally separates the licensing surfaces so you can opt out by changing the install command.
997:The closed loop has to run somewhere. Skills execute against tools, recall queries hit the session store, subagents fork from the main agent: Hermes's tool stack and backend list are the execution substrates the loop's arcs run on. The README's headline claim is "40+ tools, toolset system, terminal backends." That's the README's own marketing-flavored summary; the official docs page enumerates eight toolset categories rather than a flat 40-item list (web; terminal and files; browser; media; agent orchestration; memory and recall; automation and delivery; integrations). The 40 number is real but unaudited at the docs layer; readers wanting an inventory should look at the categories and the per-category tool lists in the docs.
1119:Hermes sits at daemon-or-continuous on the lifespan dial, gateway on the surface dial (the always-on control plane is the architectural bet, the same as OpenClaw's), and skill-creation / self-improvement on the adaptation dial. That last rung is the one the team's coding-agent rollout reached at v4 in Act 1: skills compound, recall reaches across sessions, the user model accumulates, and the agent rewrites its own toolset between turns.
1121:The contrast with §11's OpenClaw placement is sharp at exactly one rung. *Lifespan*: both daemon-or-continuous; the agent stays running. *Surface*: both gateway; the always-on control plane owns sessions, channels, and tools. *Adaptation*: OpenClaw at persistent-sessions, Hermes at skill-creation. The two architectures live in the same neighborhood on two dials and split decisively on the third.

 succeeded in 0ms:
   715	<figcaption><strong>Fig 7.</strong> The five frameworks placed on the three dials. The four Claw variants scatter: they don't share a center on any dial, and four of their distinctive bets (container minimalism, hardware portability, deploy-anywhere posture, feature breadth) sit off the dial map entirely. The legend names each variant's off-axis bet alongside the role peterwoods.online assigns it; three of those role-assignments contradict the variant's own README, and the fourth is a partial match.</figcaption>
   716	</figure>
   717	
   718	The contradictions, the language scatter, and the disavowals all point to the same thing: the shared `*Claw` namespace invites taxonomy that the projects don't actually share. Trying to place the four variants on the three-dial map shows the scatter, and several of their distinctive bets sit off the map entirely. NanoClaw's distinctive concern is container minimalism. sipeed/PicoClaw's is hardware portability. ZeroClaw's is deploy-anywhere posture. ZeptoClaw's is feature breadth: a wide capability set in one binary. Those are footprint and runtime concerns the lifespan / surface / adaptation framework doesn't capture. Where they appear, the figure annotates the off-axis bet alongside the in-axis placement; the dial map handles what it can.
   719	
   720	Migration tooling lands here too. Hermes Agent, Act 3's subject, ships a first-party command for importing an OpenClaw setup, including the legacy `~/.clawdbot/` and `~/.moltbot/` directories from earlier names. The tooling exists because Nous Research expected enough migration traffic to be worth supporting. The *amount* of migration is unsourced; the *existence* of the tooling is real evidence that "what comes after OpenClaw" is a question being asked.
   721	
   722	{/* Reader can now: see how third-party taxonomies fill a vacuum when an ecosystem shares a name pattern but no maintainership; recognize that the three-dial framework itself doesn't explain every variant's distinctive bet (and that's part of the taxonomy-failure story). */}
   723	
   724	### 11. Where OpenClaw and the Claw family land on the dial map
   725	
   726	OpenClaw is gateway-centered with persistent sessions and continuous lifespan. Multi-channel access flows through one always-on control plane; sessions persist as JSONL transcripts, routed by origin into per-agent workspaces, optionally sandboxed. The sessions are persistent, but they are not adaptation memory in the skill-creation sense; the agent doesn't rewrite its own toolset between turns from what those sessions contain. OpenClaw sits at gateway on the surface dial, daemon-or-continuous on the lifespan dial, and persistent-sessions (not skill-creation) on the adaptation dial.
   727	
   728	The four Claw variants don't share that center. Their best-fit placements on the three dials scatter, and several of their distinctive bets sit off the dial map entirely: sipeed/PicoClaw on hardware portability, NanoClaw on container minimalism, ZeroClaw on deploy-anywhere posture, ZeptoClaw on feature breadth. The Claw namespace is shared; the architectures aren't, and not all of them even live on the same axes. That is another reason a single ladder always misranks them.
  1043	The matrix backs one specific semantic claim about a subset of the backends: per the docs, "Daytona and Modal offer serverless persistence: your agent's environment hibernates when idle and wakes on demand." That is the only documented per-backend behavior of that shape; the others' execution-location and persistence semantics aren't characterized in the same way and the post doesn't infer them.
  1044	
  1045	Subagent isolation. The README's feature entry is "Spawn isolated subagents for parallel workstreams." Two distinct mechanisms back this claim. The first is `delegate_task`, a tool that spawns process-and-context-isolated subagents inside the existing backend. The second is `hermes -w`, added in the v0.2.0 release as "Git Worktree Isolation": `hermes -w` launches isolated agent sessions in git worktrees, so two subagents working on the same repo don't step on each other's working trees. Process isolation and filesystem isolation: the same word, two different mechanisms.
  1046	
  1047	<figure>
  1048	<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" width="100%">
  1049	
  1050	<defs>
  1051	  <marker id="f12arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
  1052	    <path d="M0,0 L10,5 L0,10 z" fill="#6B6258"/>
  1053	  </marker>
  1054	</defs>
  1055	
  1056	<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SUBAGENT ISOLATION: TWO MECHANISMS</text>
  1057	<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">"isolated subagents" can mean process isolation or filesystem isolation</text>
  1058	
  1059	<rect x="20" y="60" width="310" height="240" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
  1060	<text x="175" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">PROCESS ISOLATION</text>
  1061	<text x="175" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">delegate_task tool</text>
  1062	
  1063	<rect x="40" y="116" width="270" height="124" fill="#F4EEE3" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="4,2" rx="3"/>
  1064	<text x="175" y="132" font-family="JetBrains Mono" font-size="9" fill="#2563EB" text-anchor="middle">SAME BACKEND CONTAINER</text>
  1065	
  1066	<rect x="60" y="142" width="100" height="42" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
  1067	<text x="110" y="160" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">parent</text>
  1068	<text x="110" y="174" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">process</text>
  1069	
  1070	<line x1="162" y1="163" x2="188" y2="163" stroke="#6B6258" stroke-width="1.4" marker-end="url(#f12arrow)"/>
  1071	<text x="175" y="156" font-family="JetBrains Mono" font-size="7" fill="#6B6258" text-anchor="middle">delegate</text>
  1072	
  1073	<rect x="190" y="142" width="100" height="42" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
  1074	<text x="240" y="160" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A" text-anchor="middle">subagent</text>
  1075	<text x="240" y="174" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">process</text>
  1076	
  1077	<rect x="60" y="194" width="230" height="38" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" rx="2"/>
  1078	<text x="175" y="210" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">SHARED WORKSPACE</text>
  1079	<text x="175" y="223" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">both processes read/write the same files</text>
  1080	
  1081	<text x="175" y="262" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">boundary at the OS-process level;</text>
  1082	<text x="175" y="276" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">contexts isolated, files shared.</text>
  1083	<text x="175" y="290" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">parallel workstreams in one container.</text>
  1084	
  1085	<rect x="350" y="60" width="310" height="240" fill="#F9F5EB" stroke="#8F8578" stroke-width="1" rx="4"/>
  1086	<text x="505" y="84" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FILESYSTEM ISOLATION</text>
  1087	<text x="505" y="100" font-family="serif" font-size="10" font-style="italic" fill="#6B6258" text-anchor="middle">hermes -w (git worktree, v0.2.0+)</text>
  1088	
  1089	<rect x="370" y="116" width="130" height="80" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
  1090	<text x="435" y="134" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">parent worktree</text>
  1091	<text x="435" y="150" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle">{"~/repo/main/"}</text>
  1092	<text x="435" y="170" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">parent agent</text>
  1093	<text x="435" y="184" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">working on main</text>
  1094	
  1095	<rect x="510" y="116" width="130" height="80" fill="#EDE5D4" stroke="#8F8578" stroke-width="0.8" rx="2"/>
  1096	<text x="575" y="134" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle">child worktree</text>
  1097	<text x="575" y="150" font-family="JetBrains Mono" font-size="9" fill="#6B6258" text-anchor="middle">{"~/repo/feature/"}</text>
  1098	<text x="575" y="170" font-family="serif" font-size="10" fill="#1A1A1A" text-anchor="middle">subagent</text>
  1099	<text x="575" y="184" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">working on feature</text>
  1100	
  1101	<rect x="370" y="206" width="270" height="42" fill="#FBE9CE" stroke="#B8651A" stroke-width="0.8" stroke-dasharray="3,2" rx="2"/>
  1102	<text x="505" y="222" font-family="JetBrains Mono" font-size="9" fill="#92400E" text-anchor="middle">SAME GIT REPO (.git)</text>
  1103	<text x="505" y="235" font-family="serif" font-size="9" font-style="italic" fill="#92400E" text-anchor="middle">different working directories; no file collision</text>
  1104	
  1105	<text x="505" y="262" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">boundary at the working-directory level;</text>
  1106	<text x="505" y="276" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">two subagents on the same repo</text>
  1107	<text x="505" y="290" font-family="serif" font-size="9" font-style="italic" fill="#6B6258" text-anchor="middle">don't step on each other's edits.</text>
  1108	
  1109	</svg>
  1110	<figcaption><strong>Fig 12.</strong> Two mechanisms hide behind one phrase. *Process isolation* (the `delegate_task` tool) spawns a subagent process inside the same backend container; the parent and child are different OS processes but share the workspace filesystem. The boundary protects the *agent context* (each gets its own working memory and tool history). *Filesystem isolation* (`hermes -w`, added in v0.2.0) launches a subagent in a separate git worktree of the same repo; the boundary protects the *working tree* so two subagents editing the same project don't collide. Different problems, different walls.</figcaption>
  1111	</figure>
  1112	
  1113	The point of the tool stack and the backend list is what the closed loop sits on. Skills run inside one of the seven backends. Subagents run inside a (possibly different) one of the seven. The agent's adaptation surface scales with what the backends allow, and the backends' diversity is the deployment knob.
  1114	
  1115	{/* Reader can now: identify the seven README-listed backends and the documented Daytona/Modal serverless-persistence niche per row 34. */}
  1130	
  1131	### 18. All three frameworks on one map
  1132	
  1133	<figure>
  1134	<svg viewBox="0 0 680 560" xmlns="http://www.w3.org/2000/svg" width="100%">
  1135	
  1136	<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SIX FRAMEWORKS, SIX PLACEMENTS</text>
  1137	<text x="340" y="40" font-family="serif" font-size="11" font-style="italic" fill="#6B6258" text-anchor="middle">no framework sits at the top of every dial; the placements scatter</text>
  1138	
  1139	<rect x="20" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
  1140	<text x="125" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">LIFESPAN</text>
  1141	
  1142	<g font-family="serif" font-size="11" fill="#1A1A1A">
  1143	  <text x="38" y="124">scheduled</text>
  1144	  <text x="38" y="188">daemon</text>
  1145	  <text x="38" y="252">session</text>
  1146	  <text x="38" y="316">one-shot</text>
  1147	</g>
  1148	<g stroke="#C9BEAA" stroke-width="0.5" stroke-dasharray="2,3">
  1149	  <line x1="38" y1="130" x2="222" y2="130"/>
  1150	  <line x1="38" y1="322" x2="222" y2="322"/>
  1151	</g>
  1152	
  1153	<circle cx="146" cy="184" r="5" fill="#2563EB"/>
  1154	<circle cx="174" cy="184" r="5" fill="#B8651A"/>
  1155	<circle cx="188" cy="184" r="5" fill="#0E7490"/>
  1156	<circle cx="202" cy="184" r="5" fill="#9333EA"/>
  1157	<circle cx="216" cy="184" r="5" fill="#92400E"/>
  1158	
  1159	<circle cx="160" cy="248" r="5" fill="#059669"/>
  1160	
  1161	<rect x="235" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
  1162	<text x="340" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">SURFACE</text>
  1163	
  1164	<g font-family="serif" font-size="11" fill="#1A1A1A">
  1165	  <text x="253" y="124">multi-channel</text>
  1166	  <text x="253" y="220">gateway</text>
  1167	  <text x="253" y="316">CLI / API</text>
  1168	</g>
  1169	
  1170	<circle cx="389" cy="120" r="5" fill="#B8651A"/>
  1171	<circle cx="417" cy="120" r="5" fill="#9333EA"/>
  1172	
  1173	<circle cx="361" cy="216" r="5" fill="#2563EB"/>
  1174	<circle cx="431" cy="216" r="5" fill="#92400E"/>
  1175	
  1176	<circle cx="375" cy="312" r="5" fill="#059669"/>
  1177	<circle cx="403" cy="312" r="5" fill="#0E7490"/>
  1178	
  1179	<rect x="450" y="56" width="210" height="280" fill="#F9F5EB" stroke="#C9BEAA" stroke-width="1" rx="4"/>
  1180	<text x="555" y="78" font-family="JetBrains Mono" font-size="10" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">ADAPTATION</text>
  1181	
  1182	<g font-family="serif" font-size="11" fill="#1A1A1A">
  1183	  <text x="468" y="124">skill creation</text>
  1184	  <text x="468" y="220">persistent memory</text>
  1185	  <text x="468" y="316">stateless</text>
  1186	</g>
  1187	
  1188	<circle cx="646" cy="120" r="5" fill="#92400E"/>
  1189	
  1190	<circle cx="576" cy="216" r="5" fill="#2563EB"/>
  1191	<circle cx="632" cy="216" r="5" fill="#9333EA"/>
  1192	<text x="591" y="232" font-family="serif" font-size="8" font-style="italic" fill="#2563EB">*sessions</text>
  1193	
  1194	<circle cx="590" cy="312" r="5" fill="#059669"/>
  1195	<circle cx="604" cy="312" r="5" fill="#B8651A"/>
  1196	<circle cx="618" cy="312" r="5" fill="#0E7490"/>
  1197	
  1198	<rect x="20" y="354" width="640" height="200" fill="#F4EEE3" stroke="#C9BEAA" stroke-width="0.8" rx="3"/>
  1199	<text x="340" y="374" font-family="JetBrains Mono" font-size="9" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">FRAMEWORK LEGEND AND OFF-AXIS BETS</text>
  1200	
  1201	<circle cx="44" cy="396" r="5" fill="#2563EB"/>
  1202	<text x="58" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">OpenClaw</text>
  1203	<text x="58" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: gateway control plane. *adaptation = persistent sessions.</text>
  1204	
  1205	<circle cx="44" cy="436" r="5" fill="#92400E"/>
  1206	<text x="58" y="440" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">Hermes Agent</text>
  1207	<text x="58" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">on-dial bet: adaptation (skills, mid-use refinement, FTS5 recall, user model).</text>
  1208	
  1209	<circle cx="44" cy="476" r="5" fill="#059669"/>
  1210	<text x="58" y="480" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">NanoClaw</text>
  1211	<text x="58" y="494" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: container minimalism (per-session-database isolation).</text>
  1212	
  1213	<circle cx="44" cy="516" r="5" fill="#B8651A"/>
  1214	<text x="58" y="520" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">sipeed/PicoClaw</text>
  1215	<text x="58" y="534" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: hardware portability (sub-$10 boards, RISC-V/ARM/MIPS).</text>
  1216	
  1217	<circle cx="384" cy="396" r="5" fill="#0E7490"/>
  1218	<text x="398" y="400" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeroClaw</text>
  1219	<text x="398" y="414" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: deploy-anywhere (systemd / launchctl / Windows Service).</text>
  1220	
  1221	<circle cx="384" cy="436" r="5" fill="#9333EA"/>
  1222	<text x="398" y="440" font-family="serif" font-size="11" font-weight="600" fill="#1A1A1A">ZeptoClaw</text>
  1223	<text x="398" y="454" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">off-axis bet: feature breadth (workspace memory, swarms, plugins, batch).</text>
  1224	
  1225	<text x="398" y="492" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A">Tool choice falls out of the dial that matters,</text>
  1226	<text x="398" y="508" font-family="serif" font-size="10" font-weight="600" fill="#1A1A1A">or, for some variants, the off-axis concern.</text>
  1227	<text x="398" y="524" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">OpenClaw and Hermes have no off-axis annotation; their distinctive</text>
  1228	<text x="398" y="538" font-family="serif" font-size="9" font-style="italic" fill="#6B6258">bets sit on the dials (gateway and adaptation, respectively).</text>
  1229	
  1230	</svg>
  1231	<figcaption><strong>Fig 13.</strong> All six frameworks on the same map. None sits at the v4 corner with all three dials at the top rung; each picks its own placement. OpenClaw owns the gateway rung; Hermes owns the skill-creation rung. The four Claw variants scatter, and four of their distinctive concerns (container minimalism, hardware portability, deploy-anywhere, feature breadth) sit off the map entirely. The dial map captures what it can; the off-axis annotations close the rest.</figcaption>
  1232	</figure>
  1233	
  1234	The dial map is finished now. Six architectures, six placements. None of them sit at the v4 corner where all three dials are at the top rung; each picks its own placement, and several of the variants pick at least one off-axis concern the dial map can't represent.
  1235	
  1236	OpenClaw lives where the Gateway-as-control-plane lives. It is the architecture you reach for when reach is the problem: when the agent needs to be addressable from every channel the team already uses, with sessions per channel, agents per workspace, and sandboxing tunable per session.
  1237	
  1238	Hermes Agent lives where adaptation lives. It is the architecture you reach for when *learning* is the problem: when you want skills that compound, recall that crosses sessions, and a user model that accumulates. The closed loop is the bet.
  1239	
  1240	The four Claw variants don't share a center. NanoClaw answers "how thin can you make the agent's blast radius and codebase," sipeed/PicoClaw answers "how cheap a board can run a personal AI assistant," ZeroClaw answers "how to deploy one binary anywhere," ZeptoClaw answers "how much can fit in one Rust binary." Those are real questions, just not the same question the dial map is built around. Where they show up on the map at all, the map captures part of them. The off-axis annotations capture the rest.
  1241	
  1242	Tool choice falls out of which dial your use case actually needs, or which off-axis concern. If reach is the problem, OpenClaw is the answer. If skill creation and cross-session memory are the problem, Hermes is the answer. If you are running a personal agent on a sub-$10 board, sipeed/PicoClaw is the answer the others can't give. The single ladder couldn't represent any of those questions; the dial map gets you most of the way, and the off-axis annotations close the rest.
  1243	
  1244	*Companion to [Hand Tools, Power Tools, and the AI Coding Debate](/blog/hand-tools-power-tools-ai-coding-debate), written May 2026.*
  1245	

exec
/bin/zsh -lc 'rg -n "github.com/NousResearch/hermes-agent/commit|api.github.com/repos|sqlite.org|v2026.5.7|releases/tag/v2026.5.7|releases/tag/v2026.3.12|docs/user-guide/features/tools|docs/user-guide/configuration|docs/guides/migrate" src/content/blog/openclaw-and-hermes-agent/index.mdx notes/openclaw-and-hermes-agent.md' in /Users/vic/dev/augusteo.com-astro
 succeeded in 0ms:
src/content/blog/openclaw-and-hermes-agent/index.mdx:740:OpenClaw and Hermes Agent answer different questions. OpenClaw asks how to make an always-available assistant *reachable* across the channels you already use. Hermes asks how to make one *improve* from its own task history. Hermes Agent v0.13.0, the "Tenacity Release" published May 7 2026, opens its [README](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md) with the answer to that second question.
src/content/blog/openclaw-and-hermes-agent/index.mdx:835:[FTS5](https://sqlite.org/fts5.html) is the full-text-search module shipped with SQLite. The README doesn't say "SQLite" explicitly, but FTS5 isn't a generic term; per SQLite's official documentation, it refers specifically to SQLite's version-5 FTS extension, so the session store is implicitly a SQLite database with FTS-indexed transcripts. For any new task, the agent can ask whether something close came up before, get matching session transcripts back, and feed those matches through an LLM that summarizes the relevant pieces into the current context.
src/content/blog/openclaw-and-hermes-agent/index.mdx:912:There is licensing nuance worth being clear about. Hermes Agent itself is [MIT-licensed](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE). Honcho is AGPL-3.0. Honcho ships as an optional extra in Hermes's `pyproject.toml`, not as an unconditional dependency: `honcho = ["honcho-ai>=2.0.1,<3"]` lives under `[project.optional-dependencies]`. A user who installs base Hermes does not pull AGPL-3.0 code along.
src/content/blog/openclaw-and-hermes-agent/index.mdx:999:The terminal backends are the more interesting piece. The README at v2026.5.7 lists seven: local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox. (The marketing landing page still says five; the docs index says six. The README is authoritative for v0.13.0; the surface inconsistencies are legacy framings.)
src/content/blog/openclaw-and-hermes-agent/index.mdx:1004:<text x="340" y="22" font-family="JetBrains Mono" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1.2">HERMES TERMINAL BACKENDS (v2026.5.7 README ORDER)</text>
src/content/blog/openclaw-and-hermes-agent/index.mdx:1040:<figcaption><strong>Fig 11.</strong> The seven terminal backends in v2026.5.7 README order. Only Daytona and Modal carry the documented "serverless persistence" semantics: idle hibernation, on-demand wake. The other backends' per-backend execution-location and persistence semantics are not characterized that way in the docs, so the figure does not extrapolate them onto a 2D grid.</figcaption>
src/content/blog/openclaw-and-hermes-agent/index.mdx:1269:- [NousResearch/hermes-agent on GitHub](https://github.com/NousResearch/hermes-agent). Repository: README, [LICENSE](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE), [pyproject.toml](https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml), release notes. Tag v2026.5.7 (v0.13.0, "The Tenacity Release"), 2026-05-07.
src/content/blog/openclaw-and-hermes-agent/index.mdx:1271:- [Hermes Agent v0.2.0 release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12). First public tagged release; introduced git-worktree isolation. 2026-03-12.
notes/openclaw-and-hermes-agent.md:77:**Release cadence.** README "Development channels" section: stable = tagged `vYYYY.M.D` or `vYYYY.M.D-<patch>` (npm dist-tag `latest`); beta = `vYYYY.M.D-beta.N` (npm dist-tag `beta`); dev = moving head of `main`. The date-based scheme began with `v2026.1.5` on 2026-01-05. **Latest stable at research time: `v2026.5.7` (2026-05-07).**
notes/openclaw-and-hermes-agent.md:99:**Version pinning.** Marketing label "v0.13.0" maps to git tag `v2026.5.7` ("The Tenacity Release," published 2026-05-07T16:23:08Z). Date-based tags are uncommon enough to warrant explicit footnoting if the post quotes the SemVer label. Pinned source: `https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md`. (Repo case is `NousResearch/hermes-agent`, not `nousresearch/hermes-agent`.)
notes/openclaw-and-hermes-agent.md:101:**Closed learning loop.** README at v2026.5.7 verbatim:
notes/openclaw-and-hermes-agent.md:111:**40+ tools.** README feature list: "40+ tools, toolset system, terminal backends." The official docs at `/docs/user-guide/features/tools` enumerate **8 toolset categories** (Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations) but do not list 40+ individual tools. Treat the "40+" as the README's own marketing-flavored summary, not an audited count.
notes/openclaw-and-hermes-agent.md:113:**Seven terminal backends.** README at v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Docs corroborate persistence semantics: "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." Surface inconsistency: marketing landing page (`hermes-agent.nousresearch.com/`) still says **5** backends; docs index says **6**; README says **7**. **README is authoritative.** Vercel Sandbox is the most recently added; if the prose leans on backend evolution, walk CHANGELOG.md for the exact "Vercel Sandbox added in v…" commit.
notes/openclaw-and-hermes-agent.md:121:**License + author + launch.** Hermes is MIT-licensed (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`), built by Nous Research. Repo `created_at` per gh API: 2025-07-22T22:22:28Z (private dev period). **First public release: tag `v2026.3.12` (v0.2.0) published 2026-03-12** — release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." A Nous Research X post is reported to date 2026-02-25 (announcement); could not be directly fetched (X returned HTTP 402). **Defensible single date: "first public tagged release on 2026-03-12 (v0.2.0)."**
notes/openclaw-and-hermes-agent.md:123:**Install.** README Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`. Docs add: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." **Platforms in v0.13.0 (tag v2026.5.7, 2026-05-07): Linux / macOS / WSL2 / Android via Termux.** Per Gate 0 Run 1 + Run 2 fixes: native Windows is **NOT** in v0.13.0 — the v2026.5.7 README directs Windows users to WSL2. A native-Windows installer commit (`b7fe7ed7bd1740b01315c4bd15b254aa738124e5`, "feat(windows-install): bundle portable MinGit instead of relying on winget") landed **post-release** on 2026-05-08 and is not yet in any tagged release. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, awaiting next tagged release," not "added in v0.13.0."
notes/openclaw-and-hermes-agent.md:184:| 9 | Latest stable OpenClaw release at research time: v2026.5.7 (2026-05-07) | gh API release tag `v2026.5.7` published_at 2026-05-07 | github.com/openclaw/openclaw/releases/tag/v2026.5.7 | passes |
notes/openclaw-and-hermes-agent.md:190:| 15 | OpenClaw live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 369,911 | gh API `repos/openclaw/openclaw` field `stargazers_count: 369911` | api.github.com/repos/openclaw/openclaw accessed 2026-05-09 (was 369,860 on 2026-05-08; +51 day-over-day; not load-bearing in prose) | passes |
notes/openclaw-and-hermes-agent.md:205:| 27 | Hermes Agent v0.13.0 (git tag `v2026.5.7`) "The Tenacity Release" published 2026-05-07 | gh API release tag `v2026.5.7`, name "Hermes Agent v0.13.0 (2026.5.7) — The Tenacity Release", published_at 2026-05-07T16:23:08Z | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
notes/openclaw-and-hermes-agent.md:206:| 28 | Hermes "closed learning loop": agent-curated memory, autonomous skill creation after complex tasks, mid-use skill self-improvement, FTS5 session search with LLM summarization for cross-session recall | "**A closed learning loop** — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
notes/openclaw-and-hermes-agent.md:207:| 29 | Hermes builds "a deepening model of who you are across sessions" via the closed loop | "it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions" | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
notes/openclaw-and-hermes-agent.md:208:| 30 | Hermes uses external library Honcho (Plastic Labs, AGPL-3.0) for "dialectic user modeling" — exposed via Honcho's `/peers/{peer_id}/chat` endpoint | Hermes README: "Honcho dialectic user modeling." Honcho README: "Honcho is an open source memory library with a managed service for building stateful agents." Honcho version 3.0.6 (2026-05-07). | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/plastic-labs/honcho accessed 2026-05-08 | passes |
notes/openclaw-and-hermes-agent.md:209:| 31 | Hermes's own code is MIT-licensed; Honcho is AGPL-3.0 and packaged as the optional `honcho` extra in Hermes's `pyproject.toml`, NOT as an unconditional core dependency. **However**, aggregate extras `all` and `termux` include `hermes-agent[honcho]` — so install paths using those aggregates bring Honcho along without a Honcho-specific opt-in. (Per Gate 0 Run 1 finding 3 + Run 3 finding 1.) Prose must say "Honcho ships as an optional extra; aggregate `all`/`termux` extras include it," NOT "Hermes depends on AGPL Honcho" and NOT "users must explicitly opt in to Honcho." | Hermes LICENSE = MIT (`https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE`). Honcho LICENSE = AGPL-3.0 (`gh api repos/plastic-labs/honcho` returns `license.spdx_id: AGPL-3.0`). Hermes `pyproject.toml` `[project.optional-dependencies]` (codex Runs 1+3 verified): `honcho = ["honcho-ai>=2.0.1,<3"]`; `all` and `termux` extras both include `hermes-agent[honcho]`. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/LICENSE; github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml; gh API repos/plastic-labs/honcho | passes |
notes/openclaw-and-hermes-agent.md:210:| 32 | Hermes README claims "40+ tools, toolset system, terminal backends" — README is the source; docs page enumerates 8 toolset *categories* not 40+ items | README at v2026.5.7 verbatim "40+ tools…" Docs `/docs/user-guide/features/tools` lists 8 categories: Web; Terminal & Files; Browser; Media; Agent orchestration; Memory & recall; Automation & delivery; Integrations. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/user-guide/features/tools | marginal — README is authoritative on the count but unaudited at docs layer; quote the README's exact phrasing rather than extrapolating |
notes/openclaw-and-hermes-agent.md:211:| 33 | Hermes runs on **seven** terminal backends per README (local, Docker, SSH, Singularity, Modal, Daytona, Vercel Sandbox); marketing site says 5, docs index says 6 — README is authoritative | README v2026.5.7: "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox." Open issue #5995 corroborates Daytona, SSH, Singularity, Modal as the four remote backends. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; github.com/NousResearch/hermes-agent/issues/5995 | passes (with surface-inconsistency note) |
notes/openclaw-and-hermes-agent.md:212:| 34 | Daytona and Modal offer "serverless persistence — your agent's environment hibernates when idle and wakes on demand" | "Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand." | hermes-agent.nousresearch.com/docs/user-guide/configuration accessed 2026-05-08 | passes |
notes/openclaw-and-hermes-agent.md:213:| 35 | Hermes can spawn isolated subagents (process / context isolation via `delegate_task`); separately, `hermes -w` provides git-worktree filesystem isolation | README: "Spawn isolated subagents for parallel workstreams." v0.2.0 release notes: "Git Worktree Isolation — `hermes -w` launches isolated agent sessions in git worktrees for safe parallel work on the same repo." | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; releases/tag/v2026.3.12 | passes |
notes/openclaw-and-hermes-agent.md:214:| 36 | Python RPC scripting: "Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns" (README's own framing) | README v2026.5.7 verbatim | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes (quote README; do not over-extrapolate "zero-context-cost") |
notes/openclaw-and-hermes-agent.md:215:| 37 | Hermes's Skills Hub is compatible with the agentskills.io open standard (originally developed by Anthropic; released as an open standard; adopted by **multiple** AI agent products — specific adopter count NOT primary-backed in agentskills.io spec or Hermes docs; Run 1 codex finding dropped the "30+" number; Run 2 codex finding fixed the source page from `/specification` to `/` overview). | Hermes README: "Compatible with the agentskills.io open standard." agentskills.io overview/home page (`https://agentskills.io/`): "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products." (Note: the lineage quote lives on the overview/home page; `/specification` is a separate page describing the file-format spec; `/clients` shows adopters but does not enumerate to a specific 30+ count.) | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; agentskills.io/ (overview/home) accessed 2026-05-08 | passes — count claim removed; Anthropic-origin and open-standard claims primary-backed; correct page cited |
notes/openclaw-and-hermes-agent.md:216:| 38 | First public Hermes Agent release: v0.2.0 (git tag `v2026.3.12`) on 2026-03-12; pre-public v0.1.0 internal phase preceded it | Release notes: "First tagged release since v0.1.0 (the initial pre-public foundation). In just over two weeks, Hermes Agent went from a small internal project to a full-featured AI agent platform." Repo created_at 2025-07-22 (private dev). | github.com/NousResearch/hermes-agent/releases/tag/v2026.3.12; gh API repos/NousResearch/hermes-agent | passes |
notes/openclaw-and-hermes-agent.md:217:| 39a | Hermes v0.13.0 (tag v2026.5.7) single-curl install supports Linux / macOS / WSL2 / Android (Termux). **Native Windows is NOT supported in v0.13.0 — the README directs Windows users to WSL2.** (Per Gate 0 Run 1 finding 1: the original row claimed Windows was added in v0.13.0; codex verified it isn't.) | README v2026.5.7 Quick Install: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh \| bash`. Docs Installation: "The installer handles **everything**: `uv`, Python 3.11, Node.js 22, `ripgrep`, `ffmpeg`." Per the v2026.5.7 README, Windows users are directed to WSL2; native Windows is not in the release. | github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md; hermes-agent.nousresearch.com/docs/getting-started/installation accessed 2026-05-08 | passes |
notes/openclaw-and-hermes-agent.md:218:| 39b | A native Windows installer commit landed **post-v0.13.0** on 2026-05-08 (commit `b7fe7ed7bd1740b01315c4bd15b254aa738124e5`) — NOT in any tagged release as of today. If prose mentions native Windows, it must attribute to "post-v0.13.0 commit, not yet in a tagged release." | Commit `b7fe7ed7bd` message: "feat(windows-install): bundle portable MinGit instead of relying on winget" — committed 2026-05-08, AFTER the v2026.5.7 release tag of 2026-05-07. | github.com/NousResearch/hermes-agent/commit/b7fe7ed7bd1740b01315c4bd15b254aa738124e5 | passes (post-release commit; will become a tagged-release fact at the next Hermes release) |
notes/openclaw-and-hermes-agent.md:219:| 40 | Hermes live star count on 2026-05-09 (publication-date snapshot, refreshed during Phase 7): 139,371 | gh API `repos/NousResearch/hermes-agent` field `stargazers_count: 139371` | api.github.com/repos/NousResearch/hermes-agent accessed 2026-05-09 (was 139,109 on 2026-05-08; +262 day-over-day; not load-bearing in prose) | passes |
notes/openclaw-and-hermes-agent.md:220:| 41 | First-party migration tooling: `hermes claw migrate` imports OpenClaw / `~/.clawdbot/` / `~/.moltbot/` setups (settings, memories, skills, API keys) | "If you're coming from OpenClaw, Hermes can automatically import your settings, memories, skills, and API keys." "`hermes claw migrate` imports your OpenClaw (or legacy Clawdbot/Moldbot) setup into Hermes." "Reads from `~/.openclaw/` by default. Legacy `~/.clawdbot/` or `~/.moltbot/` directories are detected automatically." | hermes-agent.nousresearch.com/docs/guides/migrate-from-openclaw; github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md | passes |
notes/openclaw-and-hermes-agent.md:222:| 43 | v0.13.0 release scale: 864 commits, 588 merged PRs, 282 issues closed (13 P0, 36 P1), 295 community contributors | Release notes for `v2026.5.7` | github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7 | passes |
notes/openclaw-and-hermes-agent.md:411:- Verbatim quote from README v0.13.0 / tag v2026.5.7 (rows 27, 28): "A closed learning loop — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall."
notes/openclaw-and-hermes-agent.md:451:- README at v2026.5.7 (row 33): "Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox."
notes/openclaw-and-hermes-agent.md:645:| OpenClaw repo HEAD + latest release | rows 1–17, 25 | `gh api repos/openclaw/openclaw/releases` + `pushed_at` | Latest release still `v2026.5.7` (2026-05-07T20:57Z); main HEAD pushed 2026-05-09T02:31Z but the matrix pins to commit `91ed160` and tag `v2026.5.7`, both immutable. No claim affected. |
notes/openclaw-and-hermes-agent.md:646:| Hermes Agent repo HEAD + latest release | rows 27–43 | `gh api repos/NousResearch/hermes-agent/releases` + `pushed_at` | Latest release still `v2026.5.7` (Hermes Agent v0.13.0, 2026-05-07T16:23Z). main HEAD pushed 2026-05-09T01:50Z; matrix pins to tag `v2026.5.7`. No claim affected. |
notes/openclaw-and-hermes-agent.md:647:| Hermes post-release Windows commit `b7fe7ed7bd` (row 39b) | row 39b | `gh api compare/v2026.5.7...b7fe7ed7bd` → `status` | Returned `ahead` — commit is reachable from main but not from the v2026.5.7 tag, so it's still "post-v0.13.0, not yet in a tagged release." Row 39b's wording stays exact. |

codex
**Findings**

1. **STRUCTURAL — Hermes is placed on the gateway/control-plane surface dial without a matrix row.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:1119) says Hermes is “gateway on the surface dial” and “the same as OpenClaw’s”; line 1121 says the always-on control plane owns “sessions, channels, and tools.” The matrix rows for Hermes cover closed learning loop, Honcho, tools, terminal backends, subagents, install, migration, and release facts, but no row establishes Hermes as a Gateway/control-plane architecture comparable to OpenClaw rows 1–4. This is a load-bearing final-map claim and currently unsupported.

2. **STRUCTURAL — Hermes sessions are described as “training data,” which builds the wrong mental model.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:738) says “a session in Hermes is training data the agent learns from between turns.” Rows 28–29 support skill creation, skill self-improvement, FTS5 recall, and user modeling. They do not support “training data,” and that phrase implies model training/fine-tuning rather than retrieval, summarization, and skill codification.

3. **STRUCTURAL — The FTS5 section overclaims the storage mechanism.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:835) says the “session store is implicitly a SQLite database with FTS-indexed transcripts”; Fig. 9 then says “indexed JSONL transcripts,” “top-K matched snippets,” and “raw transcripts do not” land in context. Matrix row 28 only supports “FTS5 session search with LLM summarization.” The notes explicitly warned that SQLite is an inference, but the prose turns that into a concrete session-store design and adds JSONL/top-K/raw-exclusion details with no row.

4. **STRUCTURAL — Skill creation/refinement mechanics drift past row 28.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:819) adds “After a multi-step interaction the user judged successful,” “named procedure with parameters,” and “steps that produced the answer.” Row 28 supports “autonomous skill creation after complex tasks” and “skills self-improve during use,” not user judgment, parameterization, or this write-up workflow.

5. **STRUCTURAL — The Honcho licensing paragraph adds unsupported deployment-frequency claims.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:914) says “For most personal-assistant deployments” the user model is AGPL because users take the convenience extra. Row 31 only supports the dependency topology: base MIT, `honcho` optional, aggregate `all`/`termux` include Honcho. It does not support “most deployments” or general behavior around convenience extras.

6. **STRUCTURAL — Migration tooling is used as evidence for an unstated adoption/intention claim.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:720) says the tooling exists because Nous “expected enough migration traffic to be worth supporting.” Row 41 supports the existence and scope of `hermes claw migrate`; row 42 explicitly blocks unsupported migration-wave framing. This sentence infers internal motivation/demand from tooling existence.

7. **STRUCTURAL — New SQLite source is not in the matrix or References.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:835) links SQLite’s FTS5 docs as support for a mechanism claim. That source is absent from the claim-source matrix and from `## References`. Either add a matrix row and References entry, or reduce the prose back to row 28’s exact README claim.

8. **COSMETIC — Inline named-source links are inconsistent in §16.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:997) names “the official docs page” and line 999 names “The README at v2026.5.7” without linking those named sources inline. The References section has grouped entries, but the gate requires inline named-source mentions to hyperlink to the same URL.

**Freshness**

No freshness regression found. The notes’ Phase 7 pass says all rows remain inside the 2025-05-09 cutoff, and my live spot-check found the latest GitHub release pages still showing OpenClaw `v2026.5.7` and Hermes `v2026.5.7` as latest: [OpenClaw releases](https://github.com/openclaw/openclaw/releases), [Hermes releases](https://github.com/NousResearch/hermes-agent/releases).

**Related Posts / References**

Related augusteo.com cross-links pass URL-form rules: prose uses root-relative links, and References uses full `https://augusteo.com/...` links. The main References gap is the new SQLite source introduced outside the matrix.


2026-05-09T02:39:55.230747Z ERROR codex_core::session: failed to record rollout items: thread 019e0a98-dbcf-7223-8d47-05452d198697 not found
tokens used
176,013
**Findings**

1. **STRUCTURAL — Hermes is placed on the gateway/control-plane surface dial without a matrix row.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:1119) says Hermes is “gateway on the surface dial” and “the same as OpenClaw’s”; line 1121 says the always-on control plane owns “sessions, channels, and tools.” The matrix rows for Hermes cover closed learning loop, Honcho, tools, terminal backends, subagents, install, migration, and release facts, but no row establishes Hermes as a Gateway/control-plane architecture comparable to OpenClaw rows 1–4. This is a load-bearing final-map claim and currently unsupported.

2. **STRUCTURAL — Hermes sessions are described as “training data,” which builds the wrong mental model.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:738) says “a session in Hermes is training data the agent learns from between turns.” Rows 28–29 support skill creation, skill self-improvement, FTS5 recall, and user modeling. They do not support “training data,” and that phrase implies model training/fine-tuning rather than retrieval, summarization, and skill codification.

3. **STRUCTURAL — The FTS5 section overclaims the storage mechanism.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:835) says the “session store is implicitly a SQLite database with FTS-indexed transcripts”; Fig. 9 then says “indexed JSONL transcripts,” “top-K matched snippets,” and “raw transcripts do not” land in context. Matrix row 28 only supports “FTS5 session search with LLM summarization.” The notes explicitly warned that SQLite is an inference, but the prose turns that into a concrete session-store design and adds JSONL/top-K/raw-exclusion details with no row.

4. **STRUCTURAL — Skill creation/refinement mechanics drift past row 28.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:819) adds “After a multi-step interaction the user judged successful,” “named procedure with parameters,” and “steps that produced the answer.” Row 28 supports “autonomous skill creation after complex tasks” and “skills self-improve during use,” not user judgment, parameterization, or this write-up workflow.

5. **STRUCTURAL — The Honcho licensing paragraph adds unsupported deployment-frequency claims.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:914) says “For most personal-assistant deployments” the user model is AGPL because users take the convenience extra. Row 31 only supports the dependency topology: base MIT, `honcho` optional, aggregate `all`/`termux` include Honcho. It does not support “most deployments” or general behavior around convenience extras.

6. **STRUCTURAL — Migration tooling is used as evidence for an unstated adoption/intention claim.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:720) says the tooling exists because Nous “expected enough migration traffic to be worth supporting.” Row 41 supports the existence and scope of `hermes claw migrate`; row 42 explicitly blocks unsupported migration-wave framing. This sentence infers internal motivation/demand from tooling existence.

7. **STRUCTURAL — New SQLite source is not in the matrix or References.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:835) links SQLite’s FTS5 docs as support for a mechanism claim. That source is absent from the claim-source matrix and from `## References`. Either add a matrix row and References entry, or reduce the prose back to row 28’s exact README claim.

8. **COSMETIC — Inline named-source links are inconsistent in §16.**  
   [index.mdx](/Users/vic/dev/augusteo.com-astro/src/content/blog/openclaw-and-hermes-agent/index.mdx:997) names “the official docs page” and line 999 names “The README at v2026.5.7” without linking those named sources inline. The References section has grouped entries, but the gate requires inline named-source mentions to hyperlink to the same URL.

**Freshness**

No freshness regression found. The notes’ Phase 7 pass says all rows remain inside the 2025-05-09 cutoff, and my live spot-check found the latest GitHub release pages still showing OpenClaw `v2026.5.7` and Hermes `v2026.5.7` as latest: [OpenClaw releases](https://github.com/openclaw/openclaw/releases), [Hermes releases](https://github.com/NousResearch/hermes-agent/releases).

**Related Posts / References**

Related augusteo.com cross-links pass URL-form rules: prose uses root-relative links, and References uses full `https://augusteo.com/...` links. The main References gap is the new SQLite source introduced outside the matrix.


