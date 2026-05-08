# Codex research review — Gate 0 Run 1 — 2026-05-08

Verbatim codex output from `/codex consult` invoked at end of Phase 2 with the full Spec + Throughline + Research notes + Claim-source matrix embedded. Findings count: **6 STRUCTURAL, 1 COSMETIC.** Status: structural fixes applied; Run 2 pending.

---

```
Structural issues found. Do not draft from this matrix yet.

1. **STRUCTURAL: row 39 is false as written.**
   Claim: "native Windows added in v0.13.0." The pinned `v2026.5.7` README says native Windows is **not** supported and tells users to use WSL2. The cited commit `b7fe7ed7bd` exists, but it is dated **2026-05-08**, after the **2026-05-07** v0.13.0 release, and it changes the Windows installer/Git Bash story. Fix the row to separate `v0.13.0` support from the later commit. Source checked: [Hermes README v2026.5.7](https://raw.githubusercontent.com/NousResearch/hermes-agent/v2026.5.7/README.md), [commit b7fe7ed7bd](https://github.com/NousResearch/hermes-agent/commit/b7fe7ed7bd1740b01315c4bd15b254aa738124e5).

2. **STRUCTURAL: row 14 is secondary-source laundering.**
   `star-history.com` is a third-party blog, not a primary source. It can be cited as "Star History claimed X," but it cannot satisfy the primary-source rule for "most-starred non-aggregator software project." GitHub API can support live counts; it cannot by itself define "non-aggregator" or the ranking methodology. Source checked: [Star History post](https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software/).

3. **STRUCTURAL: row 31 overstates the Honcho licensing/dependency claim.**
   Hermes is MIT, and Honcho is AGPL-3.0, but `honcho-ai` is an optional extra in `pyproject.toml`, not an unconditional core dependency. If the post makes a licensing claim, it must say "Hermes exposes/ships a Honcho memory plugin/extra" or prove the default install pulls it. Current row wording "depends on AGPL-3.0 Honcho" is too broad.

4. **STRUCTURAL: row 37 contains an unsupported number.**
   AgentSkills' own overview supports "originally developed by Anthropic" and "open standard," but the visible Client Showcase page I could access did not substantiate "30+ adopters"; it only says agent products support the format. Either produce a primary enumerated adopter list/snapshot or drop the number. Sources checked: [Agent Skills overview](https://agentskills.io/home), [Client Showcase](https://agentskills.io/clients).

5. **STRUCTURAL: row 24 is not a valid matrix row yet.**
   "peterwoods.online taxonomy contradicted on 3 of 4 projects" is a verdict, not a claim-source mapping. The row points to "verdict tables in Research notes," not quoted primary excerpts. Break this into explicit subclaims: Woods says Nano/Pico/Zero/Zepto occupy roles A/B/C/D; primary source says each project self-frames differently. Otherwise the draft will inherit an un-auditable editorial conclusion.

6. **STRUCTURAL: Act 1 has promised load-bearing examples with no rows.**
   Throughline says each dial gets "a concrete failure case from a degenerate position." The matrix has rows for project capabilities, but no rows for those failure cases. If those are hypothetical, mark them as author-constructed examples. If real, source them. Do not let the draft invent operational failures under a truth-first contract.

7. **COSMETIC but fix before final matrix: several rows are not quote rows.**
   Rows 7, 9, 10, 11, 16, 17, 19, 24, 25, 26, 31, 40, and 42 use summaries like "gh API," "per-session DBs + cron jobs," or "quoted in research notes" instead of the actual excerpt. That is not a claim-source matrix; it is a pointer list. It blocks quote verification.

No stale-row issue found in the sampled sources: the cited dated sources I checked are within the 2025-05-08 cutoff. The bigger problem is not staleness; it is attribution discipline.
```

---

## Fixes applied (Run 1 → Run 2)

- **Finding 1 (row 39, Windows in v0.13.0)** — corrected. v0.13.0 README documents Linux/macOS/WSL2/Termux only; native Windows is NOT in v0.13.0. Commit b7fe7ed7bd is dated 2026-05-08 (post-release). Row split into platform-support claim (v0.13.0 + four platforms) plus a separate row for the post-release Windows-installer commit awaiting next tag.
- **Finding 2 (row 14, Star History laundering)** — corrected. Row 14 now explicitly attributes the "passed React" / "most-starred non-aggregator software project" framing to Star History as secondary analysis, not primary fact. The 250K-by-2026-03-01 milestone is preserved with an explicit "secondary attribution" recency note. Prose must cite "per Star History's analysis" if the comparison is used.
- **Finding 3 (row 31, Honcho dependency)** — corrected. Row 31 now reads "Hermes exposes/ships an optional Honcho memory extra (`honcho-ai` listed as optional in pyproject.toml); default install does not unconditionally pull AGPL-3.0 Honcho." Prose softens to "AGPL-3.0 Honcho is shipped as an optional memory extra," not "Hermes depends on AGPL Honcho."
- **Finding 4 (row 37, 30+ adopters number)** — corrected. Row 37 drops the unsourced "30+ adopters" count. Retains the Anthropic-origination + open-standard claim (both supported by agentskills.io/specification). Prose must say "compatible with the agentskills.io open standard, originally developed by Anthropic and adopted by multiple AI agent products."
- **Finding 5 (row 24, verdict-as-claim)** — corrected. Row 24 split into four explicit subclaims (24a-d), one per Claw project, each pairing peterwoods.online's quoted role-assignment with the project's quoted primary contradiction.
- **Finding 6 (Act 1 failure-case rows)** — addressed via Throughline annotation. Throughline section now explicitly notes that Act 1's per-dial failure cases will be **author-constructed pedagogical examples** (toy-but-realistic per `research-protocol.md`'s throughline ladder rung 3), not primary-sourced operational incidents. They do not earn matrix rows because they are illustrations, not load-bearing primary-source claims about specific systems.
- **Finding 7 (COSMETIC, summary cells in matrix)** — partially addressed (highest-impact rows expanded with actual excerpts; remaining rows annotated as "data-point not quote" where the cell value IS the data, e.g., gh API stargazers_count). Run 2 will surface any rows still missing real quotes.

---

# Gate 0 Run 2 — 2026-05-08

Re-fired with the Run 1 fixes applied. Codex found **5 STRUCTURAL + 1 COSMETIC**. All 5 STRUCTURAL findings were research-notes prose drift — the matrix rows were correctly fixed, but the original wording survived in `## Research notes` and contradicted the fixed rows.

```
**STRUCTURAL findings**

1. **Rows 14 / research notes still launder Star History as "primary."**
   Matrix row 14 is fixed, but notes/openclaw-and-hermes-agent.md:95 still says "Star History primary post." Star History is third-party analysis, not primary OpenClaw evidence. This keeps the original row 14 problem alive outside the matrix. The matrix's `secondary-attribution-only` wording is correct; the research notes should match it. Source checked: Star History article is by Star History/Bytebase, not OpenClaw/Steinberger.

2. **Rows 30/31 / research notes still say Hermes "depends on" AGPL Honcho.**
   Matrix row 31 correctly fixes Honcho as optional, but notes/openclaw-and-hermes-agent.md:109 still says "its dialectic user-modeling layer depends on AGPL-licensed Honcho." That can leak into drafting and reintroduce the Run 1 overstatement. The v2026.5.7 `pyproject.toml` lists `honcho-ai` under `[project.optional-dependencies]`, `honcho = ["honcho-ai>=2.0.1,<3"]`, not core dependencies. Source checked: Hermes `pyproject.toml` and README.

3. **Row 37 / cited page is wrong for the Anthropic/open-standard quote.**
   The claim is basically sound after dropping "30+," but row 37 cites `agentskills.io/specification` for the sentence "originally developed by Anthropic…" That quote is on the Agent Skills overview/home page, not the specification page. The specification page describes the file format; it does not carry that lineage/adoption sentence. Fix the source cell to `agentskills.io/home` or `agentskills.io/` overview. Sources checked: Agent Skills overview and specification pages.

4. **Row 37 / research notes still preserve the unsupported "30+ products" claim.**
   Matrix row 37 drops the count, but notes/openclaw-and-hermes-agent.md:119 still says "adopted by 30+ products including…" That is the original Run 1 issue still present in the full notes file. Remove the number there too, or mark it explicitly unsupported.

5. **Rows 39a/39b / research notes still contain the false native-Windows-in-v0.13.0 claim.**
   Matrix rows 39a/39b correctly close the Windows issue, but notes/openclaw-and-hermes-agent.md:123 still says native Windows was "added in v0.13.0." The v2026.5.7 README says Windows native is not supported and directs users to WSL2; the Windows installer commit is post-release. This is a structural contamination risk for Phase 4 drafting. Source checked: Hermes v2026.5.7 README and v2026.5.7 release page.

**COSMETIC**

Rows 17, 19, 25, and 26 still need inline excerpts if Phase 4 drafting expects matrix-only quote verification. They point to research-note summaries or broad README walks rather than quoted cells. I would not block Phase 2 on that if the research notes are treated as the quote bank, but for a strict "every row has its quote in-cell" rule, these are the remaining weak rows.

Sources used:
Hermes README v2026.5.7: https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/README.md
Hermes pyproject v2026.5.7: https://github.com/NousResearch/hermes-agent/blob/v2026.5.7/pyproject.toml
Hermes release v2026.5.7: https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7
Agent Skills overview/spec: https://agentskills.io/ and https://agentskills.io/specification
Star History article: https://www.star-history.com/blog/openclaw-surpasses-react-most-starred-software/
```

## Fixes applied (Run 2 → Run 3)

- **Run 2 finding 1 (Star History "primary post" wording, line 95)** — corrected. Research notes now explicitly call Star History "third-party analysis, NOT primary," cite Bytebase as the operator, and route prose to attribute the comparison to Star History as analysis rather than primary fact.
- **Run 2 finding 2 (Honcho "depends on" wording, line 109)** — corrected. Research notes now describe Honcho as "shipped as an **optional** memory extra in Hermes's `pyproject.toml` under `[project.optional-dependencies]` (`honcho = ["honcho-ai>=2.0.1,<3"]`), not as an unconditional core dependency." Prose-routing instruction added: "must say 'Hermes ships an optional Honcho memory extra,' not 'Hermes depends on AGPL-3.0 Honcho.'"
- **Run 2 finding 3 (row 37 cited wrong page)** — corrected. Row 37 source cell now cites `agentskills.io/` (overview/home) where the lineage sentence actually lives. The `/specification` page reference removed from the source ID. Quote cell explicitly identifies the overview page as the source.
- **Run 2 finding 4 (research notes "30+ products" still present)** — corrected. Research notes now drop the count entirely; replaced with "adopted by a growing number of agent products" + a note that the count is unsupported. The list of named adopters is preserved as illustrative.
- **Run 2 finding 5 (research notes "native Windows added in v0.13.0")** — corrected. Research notes now read: "Platforms in v0.13.0 (tag v2026.5.7, 2026-05-07): Linux / macOS / WSL2 / Android via Termux. Native Windows is **NOT** in v0.13.0 — the v2026.5.7 README directs Windows users to WSL2. A native-Windows installer commit (b7fe7ed7bd...) landed **post-release** on 2026-05-08 and is not yet in any tagged release."
- **Run 2 cosmetic finding (rows 17/19/25/26)** — partially addressed. Rows 17 and 25 fully expanded with verbatim quotes from primary sources. Rows 19 and 26 honestly downgraded with explicit "Phase 4 drafting must re-quote actual README phrasing" annotation, since the Phase 2 subagent did not capture verbatim primary excerpts for those specific structural details (rather than fabricating a quote). This is the truthful state per `research-protocol.md`'s "no fabricated quotes" rule.