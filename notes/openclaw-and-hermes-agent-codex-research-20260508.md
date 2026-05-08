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