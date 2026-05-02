# Narrative template

The structural pattern for ciechanow.ski-style explainers, plus reader-direction phrasing for each beat. Use this as a scaffold in phase 3.

## The shape

Every long explainer follows the same three-act shape:

1. **Set up the problem.** What can't you do today? What's broken about the obvious approach? Make the reader feel the gap before you fill it. One section, no more.
2. **Decompose into isolated mechanisms.** This is the bulk of the post. Each mechanism gets its own section, its own figure, its own self-contained intuition. They are not yet connected.
3. **Reassemble.** Show how the mechanisms compose into the full system. The final figure is the climax: everything earlier shown working together.

A short coda after the reassembly is fine. It's the only place you talk about what's changing right now in the field, what's open, what the reader should look at next.

## Throughline rhythm

The post's `## Throughline` (set in Phase 1, locked) is a real-world scenario the reader returns to in every act. It is the *concrete* layer underneath the *abstract* mechanisms. Without it, each section is a fact card; with it, each section is a step in one continuous story.

For each act, follow this rhythm:

1. **Open the act with a throughline reference.** Concrete, no preamble. "We left the 1024-H100 cluster sitting at 47% MFU..." or "Andres Freund's first instinct after seeing 600ms latency was..." The reader should know within one sentence which scenario the act is anchored to.
2. **Inside the act, run the mechanism.** This is the abstract / decompositional content — the actual teaching.
3. **Close the act with what the throughline now looks like differently.** "After this section the cluster sits at 64% MFU; the next act will explain the comm pattern that took it there." Not a summary; a concrete update to the running scenario.

Anti-pattern: dropping the throughline in the middle of the post and bringing it back at the very end. If an act doesn't visibly carry the throughline, Gate 1 will flag it.

When the throughline number changes inside an act (the cluster's MFU rises, the latency drops, the failed query succeeds), name the change explicitly in prose. Don't make the reader infer it from a figure.

## Section-connection check

After drafting each section in Phase 4, write a one-line HTML comment in the MDX immediately after the section's last paragraph:

```mdx
{/* Reader can now: <one-line description of what they can predict, see, or do that they couldn't before this section> */}
```

Examples:
- `{/* Reader can now: predict why the bubble shrinks as microbatch count rises */}`
- `{/* Reader can now: tell the difference between contrastive and autoregressive losses by looking at the loss term */}`
- `{/* Reader can now: see why a 70B model can't fit on 8 H100s without sharding */}`

If you can't write that line for a section, the section isn't pulling weight — halt and rework before drafting the next.

The comment stays in the source MDX (it's stripped from rendered HTML). It serves three purposes: a working forcing-function during drafting, a Gate-2 cross-check (each section's "what reader now sees" should chain into the next section's claim), and a resume-aid (a future agent picking up the post can scan the chain quickly).

## The per-section rhythm

Inside each decomposition section, follow this rhythm:

1. **State the claim.** First sentence is what this section is about. No scene-setting.
2. **Drop the figure.** Right after the claim, before the long explanation. The figure goes inside the prose, not in a sidebar.
3. **Tell the reader what to do.** "Drag the slider to add GPUs," "scrub through one step," "toggle column vs row." Use second person. Be specific about which control.
4. **Tell the reader what they should notice.** "As you add GPUs, the per-GPU work shrinks but the comm overhead grows," "watch the bubble shrink as you raise the microbatch count." Don't leave it to them.
5. **Explain why.** Now you can write the actual mechanism. The reader has seen it move; the explanation lands harder.
6. **Hand off.** End with a sentence that points at the next section. No "in summary."

Each section is 300–800 words depending on the mechanism's depth. If a section runs past 800, decompose further or move some of it to a footnote.

## Phrasing patterns

These are the verbal moves that make the figures land. Borrow them.

**To direct the reader at a control:**

- "Drag the slider for GPUs."
- "Scrub through the step."
- "Toggle between column and row."
- "Click any GPU to highlight its comm groups."

**To point them at what to see:**

- "Notice that the bubble shrinks as you raise the microbatch count."
- "As N grows past 16, the comm time crosses the compute time."
- "Watch the second pass of the ring: each GPU now holds the full reduced chunk."

**To explain a mechanism:**

- "The reason this works is..."
- "The cost of this trick is..."
- "This is what the all-gather buys you."
- Avoid "This works because" followed by a long abstract justification. Show the move, then explain it concretely.

**To hand off to the next section:**

- "That's enough about all-reduce on its own. The interesting question is what happens when the model itself doesn't fit on one GPU."
- "Pipeline parallelism solves the model-too-big problem from the other direction. The bubble is what we'll have to fight."

## Voice anchors

These five sentences from `unified-vision-stack` show the voice. Match it.

> "Before anything else, we have to agree on what a computer vision model is supposed to produce."

(Direct opening. No throat-clearing.)

> "The label is not really what the model makes. The label is what a tiny head stapled onto the model makes, using what the model actually produces: a pile of numbers."

(Concrete, plain words. "A pile of numbers" beats "a high-dimensional representation.")

> "And yet."

(One-sentence paragraph. Use these for narrative pivots.)

> "Get the IR right and every downstream pass gets easier. Get it wrong and you pay for it forever."

(Two short sentences with the same shape. The repetition is on purpose.)

> "The phenomenon is called *dense feature collapse*, and it only really shows up at scale."

(Italicizing the key term, not bolding it. Naming it in the middle of a sentence, not as a bullet.)

## Pacing rules

- Vary paragraph length on purpose. Some six sentences. Some one sentence. If every paragraph is the same shape, rewrite.
- Keep figures dense. Don't surround a figure with three paragraphs of buildup; one is enough.
- Don't restate the figure in prose. The figure shows the thing; your prose explains why.
- Move fast through the obvious parts. The reader is an engineer; they don't need every step spelled out.

## What the opening looks like

Three good openings, all from real ciechanow.ski-style essays:

- "When most people think of the Moon, they think of a place." (Concrete, almost casual, immediately positions the reader.)
- "Before anything else, we have to agree on what a computer vision model is supposed to produce." (Sets the stake.)
- "A modern model doesn't fit on one GPU. That's the whole problem." (Two sentences, the second naming the entire post.)

What an opening should never look like:

- "In today's rapidly evolving landscape of AI, multi-GPU training has emerged as a critical capability..."
- "GPUs are powerful processors that have transformed many fields. In this post, we'll explore..."

Both of these say nothing. Cut them. Start with the claim.

## What the closing looks like

The closing is two sentences, maybe three. End on a small, concrete point. Examples:

- "FSDP eats the world. Megatron is what the world looks like after FSDP loses its appetite."
- "Multi-GPU training is mostly a comm story, and the comm pattern you pick decides which scaling law you get to follow."

What the closing should never look like:

- "In summary, multi-GPU training is a complex topic that requires careful consideration of many factors..."
- "We've covered a lot of ground. Hopefully this gives you a foundation to build on."

Both of these are restatements. Cut them. End on the last real point.
