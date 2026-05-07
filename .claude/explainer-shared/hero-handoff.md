# Hero image hand-off

Shared workflow for adding a hero image to a blog post. Used by both `explainer-authoring` (Phase 7 hero hand-off step) and `html-explainer-to-post` (Phase 2). The flow is identical; only the timing differs.

The hand-off has two halves: a **prompt template** that the skill outputs for Vic to feed into an image model, and a **post-image flow** that copies the result into the repo and updates the MDX frontmatter.

## When to invoke

- `explainer-authoring`: Phase 7, after the final codex gate (Gate 2) passes and the prose is locked. Hero is the last thing added before Vic's ship commit.
- `html-explainer-to-post`: Phase 2, after the MDX has been written and Phase 1 has reported. Hero is optional in this skill — Vic can say "skip" to ship heroless.

## The prompt template

Output this verbatim with every bracketed slot filled in. Use a fenced code block in the chat so Vic can copy cleanly. The image model only sees this prompt — give it enough context to *understand the post*, not just paint a generic scene. Every slot below is required (no slot may be left empty or replaced with "n/a").

**Treat composing this prompt like writing a brief, not filling in a label.** Re-read the MDX (intro paragraph, act dividers, callouts, References) and pull from it. A short, generic prompt produces a generic image. Aim for the entire prompt to be ~25-40 lines once filled in.

For interactive posts, the `[VISUAL ANCHORS]` and `[KEY THEMES]` slots can nod at interactivity if a control or animation is part of the post's identity ("a slider as a magnifying glass over the dataset," "a scrubber pulling time across two curves"). The template stays the same; just fill the slots with concepts that feel like the post.

```
You are a "Blog Post Hero Image Generator"

[STYLE DESCRIPTION]: Hero image in the style of watercolor and ink line-and-wash illustration, rendered like a loose, expressive urban sketch or travel-journal entry. The artwork features sketchy black ink pen outlines with visible hatching and scribbles for texture. Translucent, blended watercolor washes in soft, earthy greens, browns, blues, and warm orange-pinks fill the forms, showing wet-on-wet bleed and paper texture. The composition feels organic, atmospheric, and captured in the moment — not crisp or digital.

Write the title of the blog post with hand-lettered, casual sans-serif text, written with the same ink pen, integrated into the upper middle portion of the composition.

Add 'augusteo.com' below the title in smaller size font.

[TITLE]: <post title verbatim from the MDX frontmatter>

[ASPECT RATIO]: 16:9 (landscape)

[POST SUMMARY]: <4-6 sentences describing what this specific post is about. State the central thesis or argument, the key technical concepts it walks the reader through, and what new understanding the reader walks away with. Quote or paraphrase a memorable line from the post if one exists. Avoid generic descriptions that could fit any AI/ML post — be specific to *this* post.>

[KEY THEMES]: <3-6 short bullet points naming the conceptual threads, technical ideas, analogies, or recurring motifs the post leans on. Pull these from the actual section headings, callouts, and key terms. Examples of good themes: "the lens vs. the painter as two ways of seeing", "self-supervised learning at scale", "dense feature collapse". Examples of bad themes: "AI", "machine learning", "technology".>

[TONE & MOOD]: <2-3 sentences capturing the emotional register and intellectual posture of the piece. Is it wry curiosity? Hard-won technical clarity? Quiet revelation? Skeptical investigation? Awe at scale? Mention pacing too — is the post a slow build, a punchy argument, a meditation? This tells the model what *feeling* the image should evoke.>

[SCENE DESCRIPTION]: <4-6 sentences describing a metaphorical / symbolic scene that captures the post's central idea. Lean abstract for technical posts (ML / AI / engineering — picture the *concept* as a sketch, not a literal screenshot, UI, or org chart). Describe the spatial composition: foreground, middle ground, background. Describe what the viewer's eye lands on first. Describe lighting, mood, and any movement implied. Do NOT request specific real people, brand logos, or copyrighted imagery.>

[VISUAL ANCHORS]: <3-5 concrete objects that should appear in the image, each tied to a specific concept from the post. Format as `object — what it represents`. Examples: "a magnifying glass over an unfinished sketch — the patch-level view", "two overlapping lenses — the dual-pathway architecture", "a half-developed Polaroid — features mid-formation". The image model will use these as compositional anchors, so make them paintable (physical objects, not abstract nouns).>

[WHAT TO AVOID]: <1-2 sentences naming visual clichés that would weaken this specific image — e.g., "no glowing brains, no neural-net node-and-edge diagrams, no robots, no 'futuristic' chrome surfaces." Tailor this list to the post: a post about model training should avoid different clichés than a post about developer tooling.>
```

## The post-image flow

After Vic supplies a path to a generated image (or says "skip"):

1. **On skip:** report the hero step as skipped. The post ships without a hero. For `html-explainer-to-post` this is acceptable; for `explainer-authoring` the placeholder `heroAlt` should be replaced with an empty string before final commit, otherwise the literal "TODO: hero image not yet selected" string ends up in the rendered alt attribute.

2. **Validate the source path exists.** Use the `Bash` tool's `ls` or a `Read` to confirm. If the path is invalid, ask Vic to recheck.

3. **Copy the image to `src/assets/blog/<post-slug>/hero.<ext>`** where `<ext>` matches the source (`png`, `jpg`, `jpeg`, `webp`). Vic's convention is the literal filename `hero.<ext>`, not the auto-generated upstream name (e.g. Gemini outputs like `image_abc123.png` get renamed to `hero.png` on copy). Make sure the destination directory exists; create it if not.

4. **View the destination image** with the `Read` tool — Claude Code reads PNG/JPG files visually. Look at what is *actually* in the painting, not what the prompt asked for.

5. **Propose a one-sentence `heroAlt`** based on what the image shows. The alt text should describe the visible content, not restate the post title or the prompt's themes. Aim for ~80-140 chars. Read it back to Vic for confirmation if it feels uncertain.

6. **Edit the MDX frontmatter:** add (or replace) `heroImage: "@assets/blog/<post-slug>/hero.<ext>"` and update `heroAlt` with the proposed text.

7. **Report final result:** post path, asset path, hero filename, proposed alt, and `http://localhost:4321/blog/<post-slug>` as the preview URL. The dev server should be running by this point in either pipeline.

## Notes on the prompt template

- The watercolor + ink style is Vic's house style; do not propose alternatives.
- The "augusteo.com" footer line and the in-image title are part of the brand. Both must appear.
- Aspect ratio is always 16:9. The site renders the hero as a wide card.
- Do not request real people, brand logos, or copyrighted imagery in `[SCENE DESCRIPTION]`. The image model will refuse or produce a degraded image.
- Length matters. A 10-line prompt produces a generic image. A 25-40-line prompt produces an image that feels like the post.
