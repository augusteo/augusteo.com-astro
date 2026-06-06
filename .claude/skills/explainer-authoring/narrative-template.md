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

## Math, made intuitive

The reader of these posts is usually an engineer who is fluent in *some* math but not the specific math of this subfield. A backend engineer reading an RL post knows what a function is; they may not have a working feel for a log-ratio, a KL term, or an expectation. So the rule is: **a formula a reader can't read is worse than no formula.** Intuition comes before notation, always. Every formula, symbol, and named mathematical object has to be reachable by someone who has never seen it.

This is not "dumbing down." The equation still appears in full — you are adding the plain-language read alongside it, not removing the rigor. The density rule still holds; you make the math *land*, you don't pad it.

When a formula, equation, or named object appears (a Greek symbol, a log-ratio, a sigmoid, a KL penalty, an ELBO, an expectation, an argmax, a norm), run this checklist in the prose right where it appears:

1. **Say what it's for before you show it.** One plain sentence naming what the quantity *wants*. "We need a single number for how much better the winning answer is than the losing one." Then the formula.
2. **Name every symbol on first sight, in words.** Greek letters especially. "σ (sigma) is the S-shaped squashing curve from Fig 2." "π (pi) is the model's probability of producing an answer; π_ref is the frozen reference's." Never let a symbol sit on the page unglossed, not even once.
3. **Read the line out in plain English.** Translate the whole equation into a sentence someone could say aloud. The DPO loss isn't "L = −log σ(β(r_w − r_l))"; it's "push the winner's score above the loser's, run the gap through the S-curve, and the loss falls as the model gets more confident it picked right."
4. **Ground the operation, not just the symbol.** The audience may not have intuition for the *operations*, not only the letters. Hand over the working feel in one clause, no derivation: a *ratio* is "how many times more likely"; a *log* "is zero when the two match, positive when the top is bigger, negative when smaller, and turns multiplying into adding"; an *expectation* is "the average over many tries"; an *argmax* is "whichever choice scores highest." Give the intuition the reader needs to keep reading, not the proof.
5. **Explain the behavior at the extremes.** This is where the intuition actually lives. What happens when the input is zero, tiny, or huge? "Equal scores → the sigmoid is 0.5, a coin flip. A big gap → it saturates near 1." Extremes anchor the shape better than the middle does.
6. **Anchor to the metaphor already running.** Tie the math back to the post's live images: the leash, the yardstick, the vote, the judge. The symbol and the metaphor should click together.
7. **One concrete instance, where it's cheap.** Plug in a tiny number so the reader sees it move. "If the model is twice as likely as the reference, the ratio is 2 and the log-ratio is about +0.7."

What not to do: don't **derive** (intuition, not proof — the reader doesn't need the algebra from the RLHF objective to the DPO loss, only what the result means); don't define a symbol three sentences after using it; don't assume `log` / `exp` / expectation / gradient are "obvious"; don't let the only copy of the equation live inside a figure SVG (the accessibility rule in `illustration-style.md` — the intuitive read belongs in prose or caption).

**Calibrate to the stated audience.** The depth of this treatment is set by the `## Spec` audience line, not applied uniformly. An ML-researcher audience needs only symbol-naming and can skip the log/ratio primer; an "engineers who know deep learning but not much RL" audience gets the full ramp; a general-technical audience gets even more grounding. Read the Spec, then dial it.

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
