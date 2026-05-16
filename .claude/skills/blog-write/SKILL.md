---
name: blog-write
description: Use when Victor wants to write a blog post, has a draft, or has completed brainstorming and is ready to write
---

# Blog Writing Skill

Help Victor write blog posts in his authentic voice.

## When to Use

- "Let's write this post"
- "Help me write about [topic]"
- "I have a draft for [topic]"
- After completing blog-brainstorm
- After completing experiment-run (TIL-style post)
- "Write up these experiment results"
- "TIL post about [topic]"
- Any request to turn ideas into a written post

## Phase 1: Interview

Identify the post type and ask 5-10 targeted questions to draw out Victor's voice and specific details.

### By Post Type

**Travel posts**:
- What sensory details stand out? (smells, sounds, textures)
- What specific moment captured the place?
- What went wrong or surprised you?
- Specific prices, names, or numbers?

**Tech/How-to posts**:
- What problem were you solving?
- What options did you consider and reject?
- What was the decision criteria?
- What would you do differently?

**Personal/Opinion posts**:
- What changed your mind on this?
- What's the strongest counterargument?
- When did you first realize this?
- Who disagrees and why are they wrong?

**Book/Media posts**:
- What's the key takeaway that stuck with you?
- Who should definitely read this?
- What surprised you most?
- What do you disagree with?

**Link posts** (from brainstorming with a URL):
- What made you want to share this?
- What's the key insight you'd want someone to take away?
- Does this connect to anything you've written about or experienced?
- Who would find this most useful?

**TIL/Experiment posts** (from running experiments):

First, load the experiment context:
1. Read `~/dev/experiments/[experiment-name]/results.md`
2. Read `~/dev/experiments/[experiment-name]/design.md` for hypothesis
3. Check `outputs/screenshots/` for visuals to include

**Experiments repo**: https://github.com/augusteo/experiments - link to experiment folder when writing TIL posts

Then ask Victor (referencing the results):
- I see the hypothesis was [X]. Was the result what you expected?
- Test [N] showed [surprising result]. Why do you think that happened?
- The "Blog-Worthy Moments" section notes [finding]. How would you explain this to someone unfamiliar with [technology]?
- What's the one thing you want readers to take away?
- Would you use this technology for [use case] based on these results?

## Phase 2: Writing

Follow Victor's style guide strictly:

### Structure
- **Short paragraphs**: 1-3 sentences max
- **Specific details**: Names, numbers, prices, places
- **Honest reactions**: Include failures, mistakes, what went wrong
- **Flow**: Chronological OR Problem → Process → Conclusion

### Voice
- Personal and anecdotal
- Conversational tone
- Contractions always ("don't" not "do not")
- Parentheses for asides (not em dashes)
- Direct practical advice backed by experience

### Avoid
- Corporate speak ("leverage", "ecosystem", "synergy")
- Hedging language ("I think maybe", "it seems like")
- Generic observations ("It was great", "It was nice")
- Excessive exclamation points
- Long intros before getting to the point
- Em dashes (use parentheses instead)

### Link Post Specifics

For posts based on a URL:
- **Quote-then-comment structure**: The core pattern is quote from source → Victor's commentary → quote → commentary. Repeat this pattern throughout.
- **Liberal quoting**: Include 3-6 substantial quotes from the source. This proves you read it and gives readers the original argument before your take.
- **Commentary after each quote**: Don't just quote and move on. React to each quote with your perspective, experience, or counterargument.
- **Attribution**: Use `(via [Source Name](URL))` if Victor found it via someone else

Link post structure:
```markdown
[1-2 sentence intro: what this is and why it caught your attention]

> "[Key quote from the source]"

[Your commentary on this quote: 2-4 sentences]

> "[Another quote - a different claim or insight]"

[Your reaction, counterargument, or connection to experience]

> "[Another quote if needed]"

[More commentary]

[Closing thought or implication]
```

The rhythm is: **quote → react → quote → react**. This creates a dialogue with the source material.

### TIL/Experiment Post Specifics

For posts based on experiment results (from `/experiment-run`):

- **Lead with the finding**: Use the "One-sentence hook" from Blog-Worthy Moments
- **Short is fine**: 300-800 words is typical for TIL posts
- **Show don't tell**: Include actual results, outputs, screenshots
- **Code blocks for what you ran**: But only the interesting parts, not boilerplate
- **Honest about failures**: What didn't work is often more interesting than what did
- **Include images**: Copy screenshots from `~/dev/experiments/[name]/outputs/screenshots/` to blog's `Files/` folder

TIL post structure (maps to results.md):
```markdown
[Hook: Use "One-sentence hook" from Blog-Worthy Moments]

[Brief context: What you were testing (from hypothesis) and why you cared]

## What I Tested

[Summarize test cases - 2-3 sentences max]
[Code snippet from experiment showing the key API call]

## Results

[Present findings using pass/fail data but make it narrative]
[Example: "Out of 10 images, the model correctly counted objects in 8..."]
[Include screenshots: ![[experiment-result.png]]]
[Quote interesting model outputs from Blog-Worthy Moments]

## What This Means

[Interpretation from Key Findings, in your own words]
[Practical implications - who should care and why]

## What I'd Test Next

[From Next Steps in results.md, but conversational]
```

The rhythm is: **finding → evidence → interpretation**. Keep it punchy.

**Simon Willison's "unhappy publishing" rule**: Aim to publish while still slightly dissatisfied with the post. TIL posts are about documenting what you learned, not comprehensive analysis.

Why this matters:
- You'll learn more by running the next experiment than perfecting this post
- Readers value fresh findings over polished prose
- Momentum matters: 10 rough TILs beat 1 perfect analysis
- You can always update the post later

300-800 words is typical. Get it out there.

### TIL Frontmatter Pattern

```yaml
---
title: "TIL: [Technology] Can/Cannot [Capability]"
description: What I discovered testing [technology's] [feature]
pubDate: YYYY-MM-DD
heroImage: "experiment-result.png"
heroAlt: "Screenshot showing [result]"
category: tech
tags:
  - Tech
  - TIL
  - [Technology Name]
featured: false
draft: false
slug: til-technology-capability
---
```

## Output Format

**IMPORTANT: Always save the final post to `published/` folder, not `drafts/`.** Use the slug as the filename (e.g., `published/ai-learning-study-curiosity.md`).

Deliver to Victor:

```
## Title Options
1. [Primary]
2. [Alternative]
3. [Alternative]

## One-Sentence Description
[For meta/social sharing]

## Suggested Slug
[url-friendly-slug]

---

## Blog Post

[Complete markdown with frontmatter]
```

### Frontmatter Format

Always follow this exact format (matches published posts):

```yaml
---
title: "Title Here"
description: One sentence description without quotes
pubDate: YYYY-MM-DD
heroImage: ""
heroAlt: ""
category: tech
tags:
  - Tech
  - AnotherTag
featured: false
draft: false
slug: url-slug-here
---
```

**Field notes:**
- `title`: quoted string
- `description`: unquoted string
- `pubDate`: YYYY-MM-DD, no quotes. **IMPORTANT: Check today's date from the system context (shown in the env block at conversation start). Do not assume or hardcode the year.**
- `heroImage`: empty string if no image, otherwise just filename (e.g., my-image.jpg)
- `heroAlt`: always include (empty string if no image)
- `category`: one of `travels`, `tech`, `books`, `philosophy` (no quotes)
- `tags`: YAML array format with dashes, not JSON array
- `featured`: boolean, default false
- `draft`: boolean, default false
- `slug`: no quotes

## Quality Checklist

Before delivering, verify:
- [ ] `pubDate` uses the correct current year (check system date in env block)
- [ ] Specific numbers and names included
- [ ] No corporate speak or hedging
- [ ] Short paragraphs throughout
- [ ] Contractions used consistently
- [ ] Parentheses (not em dashes) for asides
- [ ] Hook is strong in first line
- [ ] For link posts: 3-6 quotes from source with commentary after each
- [ ] For TIL/experiment posts: leads with finding, includes evidence, 300-800 words
