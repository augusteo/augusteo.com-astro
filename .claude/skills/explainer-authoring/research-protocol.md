# Research protocol

Phase 2 of the explainer pipeline. The post stands or falls on this phase. Density and correctness of intuition both depend on the research being thorough.

This file covers: the primary-source decision tree, the per-claim recency rule, the search strategy, the claim-source matrix, the throughline ladder, the fact-check mode (HTML-import), and the Phase 7 freshness re-check.

## The primary-source decision tree

A primary source describes the mechanism from inside, by someone who built or measured it. Walk this tree for every source before adding it to the matrix:

```
Is this source a primary source?

1. Original research paper (arxiv, conference proceedings, journal) → YES.
2. Official documentation from the system's authors / maintainers
   (PyTorch docs, Postgres docs, official blog from the team that built
   the system) → YES.
3. First-party postmortem / engineering blog from the team that
   experienced the incident or built the feature → YES.
4. Source code, commit, or GitHub issue authored by maintainers → YES.
5. Reproducible benchmark with public methodology and code → YES.
6. Standards document (RFC, IEEE, W3C) → YES if directly relevant.
7. Third-party blog summarizing primary work → NO. Find the primary.
8. Wikipedia → NO. Useful for orientation; not citable.
9. News article about a paper / system → NO. Read the underlying source.
10. Vendor marketing post → NO unless authored by the engineering team
    that built the thing AND it contains primary technical detail. NVIDIA
    blog posts are case-by-case.
11. Tutorial / Stack Overflow / Reddit → NO.
12. AI-generated content (including from this LLM) → NO. Flag as
    adversarial; do not cite.

If unsure, treat as NOT primary and either find a primary backing the
same claim or flag the claim in the matrix.
```

## What does not count

- Wikipedia. Useful for getting oriented; not citable.
- Tutorials by anonymous bloggers, no matter how popular. They often telephone-game subtle points.
- LLM summaries. Including this LLM. Quote the source directly; don't paraphrase a thing you haven't actually read.
- Marketing posts from vendors. Verify technical claims against the framework docs.
- News articles about a paper. Read the paper.
- A paper from before the topic settled. Multi-GPU training has changed enormously since 2019. Pre-2024 sources should be used only for foundational concepts that haven't changed.

## Topic-evolution classification

Set in the `## Spec` section during Phase 1. Locked once approved by Vic. Two values:

- **actively-evolving:** ML / AI / cloud infra / new compiler tech / anything where 2024 practice differs materially from 2026 practice. Recency bar: **12 months.**
- **stable:** Postgres internals, OS fundamentals, classical algorithms, well-settled systems primitives. Recency bar: **18 months.**

If a topic straddles (e.g. "how Postgres MVCC interacts with logical replication on GPU-accelerated query engines"): classify per the *load-bearing* part. The component the post earns its claims on dictates the bar.

## Per-claim recency rule

Recency is computed **per matrix row**, not as a global "three sources newer than X" check. Each row's recency-status column records:

- The source date (arxiv v1 date for a paper; access date for docs and blogs; commit date for repos).
- The applicable bar (12 months actively-evolving / 18 months stable).
- The pass/fail outcome.

A matrix with **any STALE row** is a Gate-0 halt unless Vic explicitly accepts the staleness for that row. Acceptance is recorded in the matrix as a "stable enough; <reason>" annotation.

Why per-claim, not per-source-count: three recent sources can satisfy a "3 sources < 12 months" check while the actual load-bearing claims still rely on stale or secondary material. The matrix forces the recency check to land where the claim lands.

How to verify recency:

- arxiv: check the v1 date. A v2 dated 2026 with v1 from 2022 is a 2022 source for purposes of this rule (the claim being made is the v1 claim).
- GitHub: check the repo's `git log --since=<bar-cutoff-date>`. If the latest substantial work on the relevant subsystem is older, the claim is older.
- Framework docs: check the version selector. Read the docs for the version you're writing about, with the access date recorded.
- Blog posts / writeups: look for an "updated" date; if none, use publication date.

## What counts as a load-bearing claim

The claim-source matrix only includes **load-bearing claims**. Decoration doesn't earn a row. Definition: a claim is load-bearing if **removing it would change what the reader walks away believing about the mechanism**. Use this decision tree:

```
Is this claim load-bearing?

1. Is it a specific number (params, GPUs, latency, percentage, throughput,
   memory size, dates, version numbers)? → YES.
2. Is it a causal claim ("X happens because Y")? → YES.
3. Is it a capability claim ("X supports Y", "X can do Z",
   "X is implemented as W")? → YES.
4. Is it a comparison ("X is faster/cheaper/larger than Y")? → YES.
5. Is it a vendor / system / paper attribution
   ("Llama 3 used FSDP", "DeepSeek-V3 routes via X")? → YES.
6. Is it a throughline number or claim referenced in the post's
   `## Throughline` section? → YES (per-number row required).
7. Is it a figure label that asserts a specific quantity or behavior? → YES.
8. Is it an analogy meant to build intuition (without an external
   referent)? → NO. Analogies are voice, not claims.
9. Is it pure prose framing ("the question", "the puzzle",
   "what's interesting") with no external referent? → NO.
10. Is it a cross-reference to another section of the same post? → NO.

If none of 1-7 apply, the claim is decoration and skips the matrix.
If multiple apply, it's load-bearing.
```

**Ambiguous cases default to load-bearing.** If you're unsure whether a claim earns a row, add the row. Codex Gate 0 will flag a row that didn't need to exist (cheap fix); a missing row that should exist will surface only at Gate 2 and be expensive.

**YES clauses beat NO clauses.** A claim that satisfies any of clauses 1-7 is load-bearing even if it also touches clauses 8-10. Example: "X is faster than Y" is both a comparison (clause 4: YES) and could be framed as prose framing (clause 9: NO); it earns a row because comparison wins. Same for analogies that contain a specific number — the number triggers clause 1 and earns a row even though the analogy itself wouldn't.

## Viable primary source

Phase 1's "< 3 viable primary sources triggers fallback" rule needs "viable" defined to avoid the 3-marginal-sources cliff:

```
A source is VIABLE for backing a claim if:

1. It passes the primary-source decision tree (above).
2. It is current per the topic's recency bar (12 months actively-evolving
   / 18 months stable) at the time of Phase 1 — OR it's a foundational
   reference whose status is locked by the field (e.g., the original
   transformer paper for transformer-arch claims).
3. It has a quotable section that directly states the claim, not just
   a section that's adjacent to or compatible with the claim.

A source is MARGINAL if it passes (1) but fails (2) or (3) by a small
margin (e.g., source is 14 months old for a 12-month bar; or the source
discusses the topic but only states the claim in figure-caption text
or a footnote).

A source FAILS if it doesn't pass (1).
```

**Phase 1 fallback gradient** (replaces the binary `< 3` rule):

- **3+ viable sources**: proceed to spec synthesis.
- **2 viable + 1 marginal**: proceed, but the marginal-backed claim must be flagged in the spec for Phase 2 to either upgrade or hedge.
- **2 viable, no marginal**: halt and ask Vic (current behavior).
- **3+ marginal, 0 viable**: halt and ask Vic. Three weak sources don't compound to one strong one.

Marginal sources go in the matrix with `recency status: marginal — <reason>` so Gate 0 sees them.

### Marginal-source closure rule

A `marginal` recency status is a debt that must be closed before Gate 0 can pass. The matrix may not contain `marginal` rows at the moment Gate 0 fires its acceptance — Gate 0 treats any unclosed `marginal` row as a STRUCTURAL halt. Closure options, in order of preference:

1. **Upgrade.** Phase 2 research finds an additional primary source for the same claim that meets the recency bar (or finds a quotable section in the existing source). Update the matrix row from `marginal — <reason>` to `passes`.
2. **Hedge.** Rewrite the prose claim from a strong assertion to a weaker one that the marginal source DOES directly support. Update the matrix row to reflect the hedged claim. The hedge still needs a primary source; "common pattern" needs a citation just as much as "the standard pattern" does.
3. **Vic-accept (per-row).** Vic explicitly annotates the row as `marginal-but-stable-enough; <one-sentence reason>`. This is a documented exception, not a default. Annotate the corresponding `Codex history` outcome as `cosmetic-only with marginal-acceptances: N`.
4. **Drop.** Remove the claim from the post (and its matrix row). Only viable if the claim was decoration anyway.

Gate 0's STRUCTURAL halt rule is updated: `unclosed marginal row` is added to the existing list (fabricated quote, misattributed source, etc.). The post does not advance to Phase 3 with marginal debt.

## The claim-source matrix

A required Phase 2 deliverable. Built alongside `## Research notes`. Format:

```markdown
## Claim-source matrix

| # | Claim (load-bearing assertion in plain English) | Quoted source (excerpt) | Source ID (arxiv / URL / commit + date) | Recency status |
|---|---|---|---|---|
| 1 | "Llama 3 70B was trained on 1024 H100s" | "...trained on 1024 NVIDIA H100 GPUs..." | arxiv:2407.21783 (2024-07-31) | actively-evolving / 12-month bar / passes |
| 2 | "FSDP shards optimizer state across DP ranks" | "...optimizer state is sharded across data-parallel ranks..." | arxiv:2304.11277 (2023-04-22) | stable / 18-month bar / passes |
| 3 | "All-reduce bandwidth-optimal cost is 2(N-1)/N × M" | "...the bandwidth-optimal algorithm for all-reduce is a ring algorithm, which achieves a per-node bandwidth cost of 2(N-1)/N × M..." | Patarasuk & Yuan 2009 | stable / 18-month bar / passes (foundational) |
```

The matrix is the contract. Phase 4 drafting may not introduce a new load-bearing claim without first adding a row. Gate 0 attacks the matrix directly. Gate 2 cross-checks every prose claim against a matrix row.

**A "load-bearing claim" is one whose removal would change what the reader walks away believing.** Decoration ("multi-GPU training is hard") is not load-bearing. Specifics ("FSDP saves N× memory at world-size W") are.

## Search strategy

Start with the seed resources Vic provides. From each, follow:

1. **Citations.** Pull up every paper they cite that's relevant. Read at least the abstract and any figure that looks load-bearing.
2. **Implementations.** If they reference a repo, read the file that implements the core thing.
3. **Successors.** Search arxiv and Google Scholar for papers citing this one in the recency window.

Targeted web queries:

- `<technique> 2026 site:arxiv.org`
- `<framework> <feature> documentation`
- `<technique> reference implementation github`
- `<technique> benchmark <year>`
- `<technique> postmortem` / `<technique> incident`

Avoid generic `how does <technique> work` searches. They surface tutorials, not primaries.

## What the notes file looks like

Append to `notes/<post-slug>.md` under `## Research notes`. Group by sub-topic, not by source. For each entry:

```markdown
### Sub-topic: ring all-reduce bandwidth cost

The standard formula is 2(N-1)/N × payload, derived in Patarasuk and Yuan 2009.

> "The bandwidth-optimal algorithm for all-reduce is a ring algorithm,
> which achieves a per-node bandwidth cost of 2(N-1)/N × M, where N is the
> number of nodes and M is the payload size."
>
> Source: Patarasuk and Yuan, "Bandwidth Optimal All-reduce Algorithms for Clusters of Workstations," 2009.

NCCL's implementation lives in `src/collectives/all_reduce.cc` of the NCCL repo
(checked at v2.21, May 2025). Ring for small-to-mid messages, double-binary-tree
for larger ones.

Cross-reference: PyTorch's DDP wraps NCCL via `torch.distributed.all_reduce`,
docs at https://pytorch.org/docs/stable/distributed.html#torch.distributed.all_reduce
(version 2.5, accessed 2026-04-30).
```

Quote the actual source. Cite the page or section. Note the date you accessed it.

## Fact-check mode (HTML-import only)

In HTML-import mode, Phase 2 fact-checks an existing draft rather than building research from scratch. The deliverables (`## Research notes` + `## Claim-source matrix`) are the same; the subagent prompts differ.

Subagent framing:

> "Here is a draft post making the following load-bearing claims: [LIST EXTRACTED FROM IMPORTED MDX]. For each claim, find a primary source that backs or refutes it. If no primary source can be found, classify the claim as UNSUPPORTED. If a source disagrees with the claim, classify as CONTRADICTED."

For each claim, the subagent returns:
- **SUPPORTED:** primary source quoted in the matrix.
- **UNSUPPORTED:** no primary source found.
- **CONTRADICTED:** primary source disagrees with the imported claim.

For UNSUPPORTED or CONTRADICTED claims, the skill applies the **unsupported-claim repair workflow** in `html-import.md`. The skill repairs the prose. Vic does not.

## The throughline ladder

Phase 1 picks a real-world scenario the post returns to in every act. Try in order; the first that succeeds is locked:

1. **Canonical real:** a public, named, well-documented scenario with citable numbers.
   - Examples: "training Llama 3 70B on a 1024-H100 cluster" (arxiv'd numbers); "Andres Freund's xz backdoor discovery" (well-documented public timeline); "the Mattermost Postgres outage" (public postmortem with metrics).
   - **Every concrete number used must cite a public source.** No fabricated precision.
2. **Composite-with-public-numbers:** a synthetic scenario combining numbers from multiple public sources, explicitly labeled as composite.
   - Example: "a 64-H100 cluster training a 7B model" — not a specific real cluster, but every component number (per-H100 TFLOPs, model size, batch size, communication cost) cites.
   - Label the throughline as composite in the notes file: "Composite: numbers from <source A> + <source B>".
3. **Toy-but-realistic:** a deliberately small example with realistic structure.
   - Example: "a 4-GPU cluster running a 1.3B model" with no claim of being a real run, just a worked example.
   - Use this when canonical-real and composite both fail (e.g., the topic is too niche for public benchmarks).
4. **Halt and ask Vic** for a candidate scenario. The skill cannot proceed past Phase 1 without a throughline.

For HTML-import mode, the extraction-or-synthesis flow in `html-import.md` runs first; the ladder is the fallback if extraction returns nothing.

## Run the implementation when you can

For any technique with a clean reference implementation, run a 50-line version yourself before drafting. The point isn't to publish the script; it's to make sure you understand what's actually happening.

For multi-GPU training: `torch.distributed.all_reduce` and FSDP both run on a single multi-GPU box, no cluster needed. Run a tiny example, time it, log the comm calls.

If Vic has GPUs, ask. If not, run a CPU-only version where possible (`gloo` backend instead of `nccl`).

## Citing in the post

In prose, name the source explicitly the first time it shows up:

> "The bandwidth-optimal ring algorithm (Patarasuk and Yuan, 2009) sends each chunk N-1 times around the ring."

Subsequent mentions can be implicit. Avoid "experts argue" or "studies have shown." Either name the source or speak in your own voice.

For the post's `## References` section: title, link, year. Every entry must be a markdown hyperlink (`[title](url)`), never a bare title-and-author string. The reader must be able to trace every load-bearing claim to a source without reading the private notes file.

## Project-memory schema

The pipeline writes a project-memory entry at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_post.md` and a one-line pointer in `MEMORY.md` at the same directory. Both are required and verified at end of Phase 1; halt if either is missing.

**`project_<slug>_post.md` schema:**

```markdown
---
name: <Post Title> (in-flight explainer)
description: <one-line summary, ~120 chars>
type: project
---

**Slug:** <slug>
**Started:** YYYY-MM-DD
**Status:** active / halted-phase-N-YYYY-MM-DD / shipped-YYYY-MM-DD
**Tracker:** notes/<slug>.md `## Resume here`
**Mode entered as:** topic / HTML-import / resume

**One-paragraph summary:** what the post is about, who it's for, what
the reader walks away with.

**Key locked-in choices** (set at Phase 1 approval):
- Topic-evolution classification: actively-evolving / stable
- Throughline: <name + how it threads>
- Figure mix: <fraction static, fraction interactive, count>
- Length: <approx minutes>

**Halt notes** (append on each halt; oldest first):
- YYYY-MM-DD halt-phase-N: <one paragraph: what triggered, what would unblock>
```

**`MEMORY.md` pointer line format:**

```
- [<Post Title>](project_<slug>_post.md) — <status>, <one-line hook for fresh-context discovery>
```

Pointer stays in `MEMORY.md` until Phase 7 ships. On ship, optionally remove the pointer (the project file stays as a build record).

**Canonical paths (absolute, restated for fresh-context agents):**

- Project file: `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_post.md`
- MEMORY.md: `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/MEMORY.md`

Both live in the same directory. Do NOT write either file to the repo root, to `notes/`, to the cwd, or anywhere else. The `-Users-vic-dev-augusteo-com-astro` prefix is the project-key form Claude Code uses to namespace project memory; it must match exactly.

**Failure-repair procedure.** If verification at end of Phase 1 finds either file missing or malformed at the canonical path:

1. **Project file missing**: write the file from the schema above using the just-approved spec to the canonical path `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/project_<slug>_post.md`. Re-run `ls -la <canonical-path>` to verify the file exists at that exact path. If `ls` shows the file at any other path (e.g., the agent wrote to `./project_<slug>_post.md` by mistake), `mv` it to the canonical location and re-verify.
2. **Project file present but malformed** (e.g., bad YAML frontmatter, missing required field): rewrite the file from the schema at the same canonical path. Old contents preserved as a `## Old contents` section at the bottom for inspection if needed.
3. **MEMORY.md exists but pointer line is malformed**: open `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/MEMORY.md` (use the absolute path; do NOT search for a MEMORY.md elsewhere — there may be other MEMORY.md files in the repo that are unrelated). Replace the offending line with the canonical format above. Other lines untouched.
4. **MEMORY.md doesn't exist at the canonical path**: write a new file at `~/.claude/projects/-Users-vic-dev-augusteo-com-astro/memory/MEMORY.md` with just this post's pointer line. Other in-flight posts' lines are not the responsibility of this skill.

After any repair, re-run `ls -la` on both canonical paths and confirm both files exist at exactly the right location. If verification still fails after one repair attempt, halt and surface to Vic with the exact `ls -la` output of the canonical directory so Vic can debug the path mismatch.

## Phase 7 freshness re-check

Before Gate 2 fires (Phase 7), re-query every source in the matrix to detect new versions:

```
For each row in ## Claim-source matrix:

1. arxiv: query for newer versions of the cited arxiv ID.
   - If a newer v exists AND the cited claim is in a section that changed,
     halt and update the row + the prose.
   - If the newer v exists but the claim is unchanged, bump the access date
     and proceed.

2. Blog post / writeup / docs page: re-fetch the URL.
   - If the page has an "updated" date newer than the cited access date,
     re-read the relevant section. If the claim still holds, bump the
     access date. If the claim has shifted, halt and update.

3. Repo / commit: check `git log --since=<cited-access-date>` on the
   relevant subsystem.
   - If substantive commits have landed AND the cited mechanism is in the
     touched files, halt and update.
   - Otherwise bump the access date.

4. Force pubDate := today in the post's frontmatter so the publication
   date matches the freshness check's reference point.
```

The freshness re-check is mandatory. Skipping it breaks "current at date of publication" — the first hard rule.

If the re-check finds a newer source version that changes a claim, the matrix row updates, the prose updates, voice-check re-runs, and Gate 2 fires on the updated draft. Don't ship with stale rows.

### Freshness budget

To prevent runaway re-querying on a 30-source matrix:

```
Hard budget for the freshness re-check:

- Max 1 Explore agent (foreground; this is verification, not research).
- Max 2 web queries per source (one to find current version, one to read it).
- Max 5-min wall clock for the entire pass.
- For matrices with > 12 sources: prioritize sources cited for actively-evolving
  claims first; stable-claim sources only if budget remains.

Sampling rule on budget exhaustion:
- If the budget is exhausted before every source is checked, re-check at
  minimum: every source backing a claim in the post's last 3 acts (most likely
  to be load-bearing); plus every source whose original cited date is within
  6 months of the bar boundary (most likely to have just gone stale).
- Surface the unchecked sources to Vic with a "checked: N of M" note.

Failure handling:
- A source URL that 404s or arxiv ID that returns no record: flag the matrix
  row as `recency status: source-unreachable-at-publication` and surface to
  Vic. Don't ship with broken citations.
- Network/rate-limit errors mid-budget: retry once with 30s backoff, then move
  on. Don't burn the wall-clock on a single flaky source.
```

The budget is intentionally tight. Phase 7 should not become a research phase; it's a verification phase.

### Unchecked-row closure rule

When the budget exhausts before every load-bearing row is re-checked, the unchecked rows do NOT silently pass. Each row not reached by the freshness pass is annotated in the matrix as `recency status: unchecked-at-publication-<YYYY-MM-DD>` (the date is today's date — pubDate).

**Gate 2's halt rule covers these.** Gate 2 (which fires immediately after the freshness pass in Phase 7) treats every `unchecked-at-publication-*` row as a STRUCTURAL halt unless one of the following applies:

1. **Vic per-row accepts.** Vic explicitly converts the row to `unchecked-but-stable-enough; <one-sentence reason>`. Per-row annotation; no blanket accept-all option. Each acceptance is a deliberate Vic call recorded in the matrix.
2. **Re-run the freshness pass.** Vic extends the budget (override the max-1-agent / max-12-source limits for one more pass) and re-runs Phase 7's freshness re-check. If the second pass clears the unchecked rows, the matrix is updated and Gate 2 fires normally.
3. **Drop the row.** Remove the claim from the prose if it's decoration. Only viable for decoration claims.

Without one of these three, Gate 2 halts the post and surfaces the unchecked rows to Vic. **The "checked: N of M" surface alone is not enough to ship.** "Truthfulness first" means unchecked is treated as untrue until Vic decides otherwise.

The budget is tight specifically so Phase 7 doesn't blow up on long matrices. The closure rule is what keeps the budget honest: tight budget + per-row Gate 2 review = "current at date of publication" actually delivered.
