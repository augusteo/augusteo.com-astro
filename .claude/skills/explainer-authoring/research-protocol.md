# Research protocol

Phase 2 of the explainer pipeline. The post stands or falls on this phase. Density and correctness of intuition both depend on the research being thorough.

## What counts as a primary source

A primary source describes the mechanism from inside, by someone who built or measured it. In rough order of authority:

1. **The original paper or RFC** that introduced the technique. For ML: arxiv preprint, conference paper. For systems: RFC, original release notes, original commit.
2. **A follow-up paper** by the same group, or by a group that re-implemented and benchmarked the technique. Useful when the original paper was vague on a detail.
3. **The official framework documentation** from the people who maintain the implementation. PyTorch docs, JAX docs, NCCL docs, Megatron-LM README, FSDP user guide.
4. **A reference implementation** in code: a small repo that demonstrates the technique cleanly, by an author who knows it. Bonus if it has unit tests.
5. **A blog post by a primary author** explaining their own work, with concrete numbers and code.

## What does not count

- Wikipedia. Useful for getting oriented; not citable in a phase-2 notes file.
- Tutorials by anonymous bloggers, no matter how popular. They often telephone-game subtle points.
- LLM summaries. Including this LLM. Quote the source directly; don't paraphrase a thing you haven't actually read.
- Marketing posts from vendors. NVIDIA blog posts can be useful but verify the technical claims against the framework docs.
- News articles about a paper. Read the paper.
- A paper from before the topic settled. Multi-GPU training has changed enormously since 2019. Pre-2024 sources should be used only for foundational concepts that haven't changed.

## Recency: the 18-month rule

For any topic that's actively researched (anything ML in 2026 qualifies), at least three primary sources must be **newer than 18 months** at the time of writing.

Why: practices shift. The "right" way to do tensor parallelism in 2022 is not the same as in 2026. FSDP-2, MoE comm patterns, async all-reduce, ring vs interconnect-aware schedules: all of this evolved past mid-2024. A post written from 2022 sources will get the intuition wrong even if the math checks out.

How to verify recency:

- arxiv: check the v1 date. A v2 dated 2026 with v1 from 2022 is a 2022 source for purposes of this rule.
- GitHub: check the repo's `git log --since=2024-10`. If the latest substantial work is older, the claim is older.
- Framework docs: check the version selector. Read the docs for the version you're writing about.

If after honest searching you can't find three primary sources newer than 18 months for the topic, **halt and ask the user**. Two paths from there:

- Proceed with older sources, with a note in the post saying "this reflects best practice as of <date>."
- Pick a different angle on the topic that does have current sources.

Do not silently lower the bar.

## Search strategy

Start with the seed resources the user provides. From each, follow:

1. **Citations.** Pull up every paper they cite that's relevant to the chunk you're writing about. Read at least the abstract and any figure that looks load-bearing.
2. **Implementations.** If they reference a repo, clone it (or read on GitHub). Find the file that implements the core thing. Read it.
3. **Successors.** Search arxiv and Google Scholar for papers that cite this one and were published in the last 18 months.

Then run targeted web queries:

- `<technique> 2026 site:arxiv.org`
- `<framework> <feature> documentation`
- `<technique> reference implementation github`
- `<technique> benchmark <year>`

Avoid generic searches like `how does <technique> work`. They surface tutorials, not primary sources.

## What the notes file looks like

Append to `notes/<post-slug>.md` under a `## Research notes` section. Group by sub-topic, not by source. For each entry:

```markdown
### Sub-topic: ring all-reduce bandwidth cost

The standard formula is 2(N-1)/N × payload, derived in Patarasuk and Yuan 2009.

> "The bandwidth-optimal algorithm for all-reduce is a ring algorithm,
> which achieves a per-node bandwidth cost of 2(N-1)/N × M, where N is the
> number of nodes and M is the payload size."
>
> Source: Patarasuk and Yuan, "Bandwidth Optimal All-reduce Algorithms for Clusters of Workstations," 2009.

NCCL's implementation lives in `src/collectives/all_reduce.cc` of the NCCL repo
(checked at v2.21, May 2025). It uses ring for small-to-mid messages and a
double-binary-tree algorithm for larger ones.

Cross-reference: PyTorch's DDP wraps NCCL via `torch.distributed.all_reduce`,
docs at https://pytorch.org/docs/stable/distributed.html#torch.distributed.all_reduce
(version 2.5, current as of 2026-04).
```

Quote the actual source. Cite the page or section. Note the date you accessed it.

## Run the implementation when you can

For any technique with a clean reference implementation, run a 50-line version yourself before drafting. The point isn't to publish the script; it's to make sure you understand what's actually happening.

For multi-GPU training: `torch.distributed.all_reduce` and `FSDP` both run on a single multi-GPU box, no cluster needed. Run a tiny example, time it, log the comm calls. Notes from that run end up much closer to truth than reading the paper alone.

If the user has GPUs, ask. If not, run a CPU-only version where possible (`gloo` backend instead of `nccl`).

## Citing in the post

In prose, name the source explicitly the first time it shows up:

> "The bandwidth-optimal ring algorithm (Patarasuk and Yuan, 2009) sends each chunk N-1 times around the ring."

Subsequent mentions can be implicit. Avoid "experts argue" or "studies have shown." Either name the source or speak in your own voice.

For the post's References section, follow the format used by `unified-vision-stack`'s closing references list: title, link, year. No formal citation style; just useful links.
