# Codex Gate 1 (outline review) — verbatim findings

Date: 2026-05-08. Codex CLI v0.125.0, model gpt-5.5, reasoning effort `medium`. Workdir: `/Users/vic/dev/augusteo.com-astro`. Sandbox: read-only.

Findings produced against `notes/openclaw-and-hermes-agent.md` post-Phase-3 outline + figure list (commit 80cc7c8).

## Run 1 — verbatim output

```
**Findings**

1. **STRUCTURAL — §10, §11, Figure 7, Figure 10.**
   The outline says the Claw variants "all sit clustered along the surface/control-plane dial" and that the dial they were designed around is gateway. The matrix does not support that. NanoClaw is container isolation + minimalism (rows 18–19), sipeed/PicoClaw is hardware portability (row 21), ZeroClaw is deploy-anywhere supervised autonomy (row 22), ZeptoClaw is local-first assistant infrastructure with memory/swarms/plugins/gateway (row 23). The supported claim is "the shared `*Claw` namespace invites bad taxonomy," not "these are gateway-centered variants."

2. **STRUCTURAL — §17.**
   "The rest" is dead-weight bundling. §18 lands without it: Hermes still lands on daemon lifespan, gateway-ish surface, and adaptation from §§12–16. §17 mixes subagents, RPC, install platforms, Windows post-release status, stars, release scale, migration tooling, and unsupported "migration wave" cleanup. That is an appendix/sidebar, not a rung in the intuition ramp.

3. **STRUCTURAL — §9.**
   §9 is mostly dead weight for §10. The rename sequence may help explain taxonomy vacuum, but author nationality, OpenAI/foundation status, star count, and Star History attribution do not make the Claw-family contradiction land. If §9 stays, reduce it to the naming-history context needed for §10, or move the scale/governance material to a short note outside the main ramp.

4. **STRUCTURAL — §16, Figure 9.**
   Figure 9 introduces a "cost / portability" axis for Hermes terminal backends, but the matrix backs only the backend list and Daytona/Modal persistence (rows 33–34). There is no matrix row for relative cost or portability ordering. Either add rows for those tradeoffs or change the figure to sourced dimensions only, e.g. local/remote execution surface × persistence semantics.

5. **STRUCTURAL — §2–§5.**
   Act 1 uses three separate author-constructed failure cases, but not one escalating motivating case. The reader gets three vocabulary lessons, then is asked to accept the combined map in §5. That is a missing rung in the intuition ramp. A single running scenario should fail first on lifespan, then on surface/control-plane, then on adaptation, so the map feels earned rather than declared.

6. **STRUCTURAL — Figure 5.**
   The OpenClaw architecture figure names concrete channels like Discord, Telegram, terminal, and web, but the cited rows only establish channels/accounts/peers and a gateway control plane (rows 1–4, 16). If those channel labels are real OpenClaw-supported surfaces, add a row. If they are illustrative, label them generically or mark them as examples not source-backed claims.

7. **STRUCTURAL — §13 cross-reference.**
   "Vic's existing setup uses the same agentskills.io standard" is not backed by the matrix. Row 37 backs Hermes compatibility with agentskills.io and the standard's lineage, not the claim that the existing Claude Code plugin-stack post uses that same standard. Either add a source row from the existing post / repo context, or weaken the link to "related skills/plugin background" instead of "same standard."

8. **COSMETIC — Figure density / duplication.**
   Ten figures is not automatically too many for ~10K words, but Figures 1–4 risk feeling like four versions of the same setup diagram. If Act 1 gets a single running scenario, consider merging Figures 1–3 into Figure 4 as three stacked dials with the failure annotations attached. No type change needed.

No **TYPE-CHANGE STRUCTURAL** findings. The static-svg choice is defensible for every listed figure under the stated override rules.
```

Tokens used: 56,741.

## Fixes applied (Run 1 → outline revision)

- **F1 (§10/§11/Fig 4/Fig 7 framing).** Rewrote §10/§11 prose and Figure 4/Figure 7 specs to drop the "cluster on the gateway axis" framing. Replaced with the matrix-supported claim: the Claw variants scatter across the dial map, each variant's distinctive bet sits on a different axis, and that's *why* a single ladder misranks them. §11 close line revised accordingly.
- **F2 (§17 dropped, content redistributed).** Section dropped from the main intuition ramp. Subagents (row 35) folded into §16 as a sub-paragraph. Migration tooling `hermes claw migrate` (row 41) folded into §10 as the "even Nous expected migration traffic" callback. Python RPC (row 36), install platforms (rows 39a, 39b), live star count (row 40), release scale (row 43), first public release (row 38) — dropped from prose; matrix retains the rows for traceability. "Migration wave" framing (row 42) was already not in prose. Section count: 19 → 18.
- **F3 (§9 trimmed).** Reduced to naming history (rows 10, 11) plus a single sentence on the foundation announcement (row 13) framing the vacuum that third-party taxonomies filled. Dropped: nationality (row 12), star count (row 15), Star History attribution (row 14). Matrix retains all rows for traceability.
- **F4 (Fig 6 axes resourced).** Hermes terminal backends figure axes changed from "cost / portability × persistence" to **execution surface (local vs remote) × persistence semantics (ephemeral vs serverless-persistent)**. Both axes now backed by rows 33 (the 7 backends) + 34 (Daytona + Modal serverless persistence). No editorial-axis overlay.
- **F5 (Act 1 single running scenario).** §2-§5 collapse three separate failure cases into one running scenario: a team's coding-agent rollout from CLI script (v1) → sessioned per-PR (v2) → multi-channel Gateway (v3) → skills + memory (v4). Each section walks one rung climb in the same scenario. §5 (the dial-map close) annotates v1/v2/v3/v4 placements on the unified map. Failure cases stay author-constructed-pedagogical per spec § "Act 1 failure-case sourcing."
- **F6 (Fig 2 generic channel labels).** OpenClaw architecture figure no longer names specific channel adapters that aren't in the matrix. Discord (matrix-backed via row 7's deny-list mention) is the only specifically named adapter; other channels labeled by routing categories drawn from row 16 (DM / group chat / cron) which the matrix supports.
- **F7 (§13 cross-reference weakened).** Replaced "uses the same agentskills.io standard" with "is the natural skill/plugin counterpart in the adaptation lane" — drops the unsupported standard-identity claim while preserving the cross-reference per Phase 2 anchor point.
- **F8 (figures merged per COSMETIC).** Figures 1, 2, 3 (per-dial figures) merged into Figure 4 (now Figure 1) — the dial map IS the single Act 1 figure, with the three rung axes drawn together and the running scenario's failure points annotated on each axis. Figure count: 10 → 7. Renumbering: ThreeDialMap → Fig 1; OpenClawArchitecture → Fig 2; OpenClawSandboxTiers → Fig 3; ClawFamilyOnDials → Fig 4; HermesClosedLoop → Fig 5; HermesTerminalBackends → Fig 6; FinalDialMap → Fig 7.

Re-running Gate 1 against the revised outline (Run 2) per the gate-runner protocol.
