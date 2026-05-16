---
name: blog-brainstorm
description: Use when Victor wants to brainstorm a blog post - either from a URL he found interesting or from scratch on a topic
---

# Blog Brainstorming Skill

Help Victor brainstorm and plan blog posts that match his authentic voice.

## When to Use

- "I want to write a blog post"
- "Help me brainstorm a post"
- "I found this interesting: [URL]"
- "I want to link blog this"
- "What should I write about"
- Any mention of blog topic ideas or URLs to share

## Notion Learning Database

Victor's "Learning" database in Notion contains curated summaries and learnings from web sources (TikTok, Reddit, YouTube, HN). Use it as a second brain during brainstorming.

**How to access:**
1. **Search** with `mcp__notion__notion-search` using `data_source_url: "collection://7656b667-bd5b-4696-a5a6-6024c9f7abe7"` and a keyword query
2. **Fetch full content** with `mcp__notion__notion-fetch` using the page ID from search results

Always search Notion when relevant. Skip silently when no results are found.

## Phase 1: Input Detection

**Did Victor provide a URL or topic?**

→ **URL provided (Link Post)**: Go to Phase 2A (Fetch & Understand)
→ **Topic provided, no URL (Original Post)**: Go to Phase 2B (Topic Discovery)
→ **No URL AND no topic** ("What should I write about?"): Go to Phase 2C (Notion Browse)

---

## Phase 2A: Fetch & Understand (Link Posts)

When Victor shares a URL:

1. **Fetch the content** using WebFetch
2. **Identify key elements**:
   - Main thesis/argument
   - Most quotable passages (2-4 candidates)
   - Who made it and their credibility
   - What's novel or surprising about it

3. **Summarize back** to Victor:
   > "This is [author]'s piece about [topic]. The main argument is [X]. A few things stood out: [Y, Z]. What caught your attention about it?"

4. **Cross-reference Notion**: Search the Learning database for entries related to the URL's topic. If related entries exist, mention them: "You also have notes on [related topic] in your Learning database that could add depth." Skip silently if nothing relevant is found.

Then proceed to Phase 3 (Interview).

---

## Phase 2B: Topic Discovery (Original Posts)

Ask across all three categories to surface the best material:

**Experience-based**: "What happened recently that surprised you or taught you something?"

**Learning-based**: "What did you figure out that others probably don't know yet?"

**Opinion-based**: "What frustrates you that people consistently get wrong?"

Let Victor talk freely. Listen for:
- Specific numbers and names (his posts thrive on these)
- Moments of strong emotion (frustration, surprise, satisfaction)
- Contrarian takes backed by personal experience

Once a topic direction emerges, **search the Notion Learning database** for related entries. If 3+ entries cluster around the theme, flag the pattern: "You've been collecting thoughts on this. You have [N] entries about [theme], which suggests this is something you've been thinking about for a while." Skip silently if nothing relevant is found.

Then proceed to Phase 3 (Research & Interview).

---

## Phase 2C: Notion Browse (No Topic Yet)

When Victor has no URL or topic and wants inspiration:

1. **Search the Learning database** across broad categories (AI, coding, culture, productivity, etc.) using `mcp__notion__notion-search` with `data_source_url: "collection://7656b667-bd5b-4696-a5a6-6024c9f7abe7"`
2. **Present 5-8 promising entries** grouped by post potential:

   **Patterns** (multiple entries sharing a theme)
   - "You have 3 entries about [theme]. Together they could make a post about [angle]."

   **Strong standalone takes**
   - Entries where Victor captured a clear opinion or insight worth expanding

   **Link post candidates**
   - Entries with strong source material that could become quick link posts

3. When Victor picks a direction, **fetch full content** of chosen entries with `mcp__notion__notion-fetch` and proceed to Phase 3

---

## Phase 3: Research & Interview

### For Link Posts

Ask 3-5 quick questions to draw out Victor's angle:

1. **"What made you want to share this?"** - The hook
2. **"What's the key insight you'd want someone to take away?"** - The value-add
3. **"Does this connect to anything you've written about or experienced?"** - Personal relevance
4. **"Is there a quote that captures it?"** - Let Victor pick or suggest from fetched content
5. **"Who would find this most useful?"** - Audience framing

Keep it conversational. Link posts should feel effortless.

### For Original Posts

1. **Fetch Notion entries** - If related Notion entries were found in Phase 2B/2C, fetch full content with `mcp__notion__notion-fetch`. Extract insights, quotes, data points, and source links. Skip if no Notion entries are relevant.
2. **Web search** for context on the topic (fills gaps beyond what Notion provides)
3. **Find existing coverage** - what have others written? (to differentiate)
4. **Gather supporting data** - numbers, stats, trends that strengthen the angle

Then ask 5-10 targeted questions based on post type:

**Travel posts**:
- What sensory details stand out? (smells, sounds, textures)
- What specific moment captured the place?
- What went wrong or surprised you?

**Tech/How-to posts**:
- What problem were you solving?
- What options did you consider and reject?
- What would you do differently?

**Personal/Opinion posts**:
- What changed your mind on this?
- What's the strongest counterargument?
- When did you first realize this?

---

## Phase 4: Angle Development

Victor's posts work because of personal experience + specific details. Find the angle:

1. **Identify the unique hook** - What does Victor know from experience that others don't?
2. **Synthesize across Notion entries** - When multiple Notion entries are in play, look for connecting threads across them. The best posts connect dots nobody else has connected. Skip if no Notion entries were used.
3. **Generate 3-5 title options** optimized for HN/Reddit:
   - Specific numbers when possible ("How I Read 62 Books in a Year")
   - Clear benefit or insight
   - Avoid clickbait - deliver on the promise
4. **Write a one-sentence hook** - The opening line that pulls readers in

---

## Phase 5: Outline

Draft the post structure:

1. **Section headers** - Clear, scannable structure
2. **Key anecdotes needed** - What stories illustrate each point?
3. **Quotes to include** - For link posts, which quotes from the source?
4. **Interview questions** - What details do we need Victor to provide for the writing phase?

---

## Output Format

### For Link Posts

```
## Topic Summary
[1-2 sentences on what this links to and Victor's angle]

## Title Options
1. [Primary recommendation]
2. [Alternative]
3. [Alternative]

## Key Quotes from Source
> "[Quote 1]"

> "[Quote 2]"

## Hook
[One-sentence opening that grabs attention]

## Outline

### Opening
- What this is and why it caught Victor's attention

### Commentary
- Victor's take on why this matters
- Connection to personal experience (if any)

### Closing
- Implication or call-to-action

## Attribution
(via [Source Name](URL)) - if Victor found this via someone else

## Notion Sources Used
- [Entry title](Notion page ID) - how it informed the brainstorm
(Omit this section entirely if no Notion entries were used)

## Interview Questions for Writing Phase
1. [Specific question about reaction]
2. [Question about connection to experience]
3. [Question about who should see this]
```

### For Original Posts

```
## Topic Summary
[1-2 sentences on what this post is about]

## Title Options
1. [Primary recommendation]
2. [Alternative]
3. [Alternative]
4. [Alternative - different angle]
5. [Alternative - more provocative]

## Hook
[One-sentence opening that grabs attention]

## Outline

### [Section 1 Title]
- Key point
- Anecdote needed: [description]

### [Section 2 Title]
- Key point
- Data/example needed: [description]

[Continue for all sections]

## Notion Sources Used
- [Entry title](Notion page ID) - how it informed the brainstorm
(Omit this section entirely if no Notion entries were used)

## Interview Questions for Writing Phase
1. [Specific question to draw out details]
2. [Question about a moment/experience]
3. [Question about what went wrong/surprised]
[5-10 questions total]
```

---

## Quick Mode (Link Posts Only)

If Victor just wants to share something fast without much interview:

"Quick link post mode - just give me the URL and one sentence on why it's interesting, and I'll draft something."

This skips the full interview for when he just wants to capture something quickly.

---

## Browse Mode (No Topic Yet)

When presenting Notion entries in Phase 2C, use this three-tier format:

```
## Patterns (multiple entries, one theme)

### [Theme Name]
- **[Entry 1 title]** - [one-line summary]
- **[Entry 2 title]** - [one-line summary]
- **[Entry 3 title]** - [one-line summary]
→ Post angle: "[suggested angle connecting the dots]"

## Strong Standalone Ideas

- **[Entry title]** - [Victor's take that could expand into a full post]
- **[Entry title]** - [clear opinion worth developing]

## Raw Material (link post candidates)

- **[Entry title]** - [strong source worth sharing with commentary]
- **[Entry title]** - [interesting finding worth a quick link post]
```

Present the strongest patterns first. Victor picks a direction, then proceed to Phase 3.

---

## Victor's Voice Reminders

When developing angles and titles, remember:
- He uses specific numbers and names
- He's honest about failures ("Lesson learned:", "Big mistake.")
- No corporate speak ("leverage", "ecosystem")
- No hedging ("I think maybe")
- Gets to the point fast - no long intros
- Uses parentheses (not em dashes)
- Always uses contractions
