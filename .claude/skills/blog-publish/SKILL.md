---
name: blog-publish
description: Use when ready to publish a blog post to LinkedIn and Hacker News - generates platform versions and saves to social-media folder for easy copy-paste
---

# Blog Publisher

Generate LinkedIn and Hacker News versions of a finished blog post, then save everything to a markdown file for easy copy-paste posting.

## When to Use

- After completing `/writing-coach`
- "Publish this post"
- "Post this to social media"
- "Share this on LinkedIn"
- "Let's distribute this post"
- "Help me share this"
- "Post this to HN"

## Platform Requirements

### LinkedIn

| Limit | Value |
|-------|-------|
| Max chars | 3,000 |
| "See more" cutoff | 210 chars (140 mobile) |

**Rules:**
- First 210 chars are the "hook" (visible before "see more")
- Mobile shows only ~140 chars before truncation
- Professional tone, but personal stories perform well
- No native bold/italic; use line breaks for visual hierarchy

### Hacker News

| Limit | Value |
|-------|-------|
| Title max | ~80 chars (fits without truncation) |
| Submission type | URL only (no text body for link posts) |

**Rules:**
- HN link submissions are title-only; no accompanying text field exists
- Use original article title unless it's misleading or clickbait
- Factual, not sensational
- No ALL CAPS or exclamation points
- Remove inflated "10 Ways..." patterns
- Add [video] or [pdf] tags if linking to those formats

---

## Phase 1: Post Verification

Before generating social versions, verify the post is ready:

1. **Read the post** (if not already in context)
2. **Check frontmatter** for required fields:
   - title
   - description
   - pubDate
   - category
3. **Confirm slug** (auto-generates from filename if empty)

If anything is missing, flag it before proceeding.

**Recommendation check:** Has this post been through `/writing-coach`? If not, suggest doing that first.

---

## Phase 2: Generate Platform Versions

### LinkedIn Version (~2,500 chars max)

Structure:
1. **Hook (first 210 chars)**: Must stand alone and compel clicking "see more"
   - Lead with the most surprising or valuable insight
   - Create curiosity without clickbait
   - Mobile-safe: first 140 chars should work independently
2. **Body**: Condensed version preserving:
   - Key insights or lessons
   - One memorable quote or line from the post
   - The narrative arc (abbreviated)
3. **CTA**: End with a hook to the full post (link goes in first comment, but don't say that)
   - "I wrote more about this on my blog."
   - Or: "Full story with [specific detail] on my blog."

**Voice rules (from WRITING-PLAYBOOK Part 6):**
- **The Friend Test:** Read it aloud. If it sounds like a conference talk or press release, rewrite it. Should sound like Victor texting a friend about something interesting.
- **Open with personal anecdote, not thesis statement.** Bad: "The future of AI coding is here." Good: "I watched Claude Code switch to npm in my Dockerfile."
- **Kill the moral.** Don't wrap up with an inspirational line. Let it just... stop.
- **No performative vulnerability or humble-brags.** "I never expected [impressive thing]" is a LinkedIn cliche.
- **No "I'm excited to announce" / "Thrilled to share" openings.**
- **One insight per post.** Pick the one thing that surprised Victor or changed his mind.
- **CTA is always understated.** "I wrote more about this on my blog." Never "Don't miss this!"

**Format tips:**
- Use line breaks for visual hierarchy (no bold/italic available)
- Keep paragraphs to 2-3 lines
- One idea per paragraph

**Link placement:** Always put the blog link in the first comment, never in the post body. This avoids the 40-60% reach penalty for external links. Don't mention "link in comments" in the post itself (LinkedIn detects this as manipulation).

### Hacker News Title

Generate 3 title options optimized for HN:

- **Option A:** Original blog title (if not clickbait)
- **Option B:** Factual reframe focusing on key insight
- **Option C:** "How I..." or technical angle (if applicable)

**Guidelines:**
- Max ~80 characters (fits without truncation)
- No clickbait, ALL CAPS, or exclamation points
- Avoid "10 Ways..." patterns
- Lead with the interesting technical detail
- Add [video] or [pdf] if linking to those formats

---

## Phase 3: Write Output File

After generating and approving the social versions, write everything to a markdown file for easy copy-paste posting.

**Output location:** `social-media/{slug}.md`

Create the `social-media/` folder if it doesn't exist:
```bash
mkdir -p "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/social-media"
```

### Output File Template

Write this format to `social-media/{slug}.md`:

```markdown
# {Post Title}

**Blog URL:** https://augusteo.com/blog/{slug}
**Date:** {pubDate}

---

## LinkedIn Post

{character count} / 3,000 chars

```
{Full LinkedIn post - ready to copy}
```

**First comment (post this after):**
```
https://augusteo.com/blog/{slug}
```

---

## Hacker News

Title Options:
1. {Original or best option}
2. {Alternative angle}
3. {Technical/factual variant}

URL: https://augusteo.com/blog/{slug}

Best posting times: 9am-12pm Pacific, weekdays
```

### After Writing the File

Tell Victor:
- The file is ready at `social-media/{slug}.md`
- Open it to copy content for each platform

---

## Post-Publish Checklist

Remind Victor to:

1. Update pubDate if it was empty

---

## Quality Checklist

Before writing the output file, verify:

- [ ] LinkedIn hook is under 210 chars and compelling
- [ ] LinkedIn total is under 3,000 chars
- [ ] LinkedIn ends with blog mention (link goes in comment)
- [ ] HN titles are ≤80 chars each
- [ ] HN titles have no clickbait patterns, ALL CAPS, or exclamation points
- [ ] Preserved Victor's voice (not too corporate)
- [ ] No em dashes (matching blog style)

---

## Updated Blog Workflow

```
[Idea] → /blog-brainstorm → /blog-write → /writing-coach → /blog-publish → [Live]
```
