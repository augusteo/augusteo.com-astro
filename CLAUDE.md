# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start dev server with content sync + file watching
bun run build        # Build for production
bun run sync         # One-time sync from Obsidian to Astro
bun run preview      # Preview production build
```

## Architecture

This is an Astro 5 blog with two content pipelines. The site uses Tailwind CSS 4 and MDX for content.

### Post types

The blog has two kinds of posts, each with its own pipeline:

1. **Obsidian-synced posts** — written in Vic's Obsidian vault, with a hero image and inline images embedded in the post folder. Use this for normal posts. The sync script transforms wikilinks, copies images, and generates frontmatter. See "Content Pipeline" below.

2. **HTML-explainer posts** — long-form essays generated as standalone HTML files (typically saved to `~/Downloads/vision_*.html` or `*_explainer.html`), with custom CSS classes (`.callout`, `.aside`, `.act-divider`, `.lead`, `.keyterm`) and inline SVG illustrations. These set `essay: true` to opt into the 3-tier heading hierarchy (chapter / section / subsection). Convert via the `html-explainer-to-post` skill at `.claude/skills/html-explainer-to-post/`. The skill drafts the MDX with `draft: true` and then prompts Vic for a hero image as a separate step.

### Content Pipeline (Obsidian-synced posts)

Content flows from Obsidian to Astro via a sync script:

1. **Source**: Obsidian vault at `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog/published/`
2. **Sync**: `scripts/sync-content.ts` transforms Obsidian markdown to Astro MDX
3. **Output**: MDX files go to `src/content/blog/[slug]/index.mdx`, images to `src/assets/blog/[slug]/`

The sync script handles:
- Converting Obsidian wikilink images (`![[image.jpg]]`) to standard markdown with `@assets` alias
- Extracting title from H1 heading
- Mapping Obsidian tags to blog categories
- Generating frontmatter with heroImage, pubDate, category, etc.

### Key Directories

- `scripts/` - Content sync pipeline (config.ts, sync-content.ts, watch.ts)
- `src/content/blog/` - Generated MDX files (don't edit directly, they're overwritten by sync)
- `src/assets/blog/` - Generated images (also overwritten by sync)
- `src/pages/blog/` - Blog routes: index.astro (listing), [slug].astro (post page)
- `src/components/` - Astro components (PostCard, FeaturedCard, Header, Footer, etc.)

### Content Schema

Blog posts use these frontmatter fields (defined in `src/content.config.ts`):

```typescript
title: string
description: string
pubDate: Date
heroImage?: image()    // Uses @assets alias, e.g., "@assets/blog/slug/image.jpg"
heroAlt: string
tags: string[]         // Required, at least one tag. First tag is used as primary tag for display/filtering
featured: boolean
draft: boolean
essay: boolean         // Opts into 3-tier heading hierarchy for long-form posts (HTML-explainer pipeline)
```

### Path Alias

`@assets` resolves to `/src/assets` (configured in astro.config.mjs). Use this for image imports in MDX frontmatter.

### Tags

Tags are freeform strings defined in your Obsidian frontmatter. The first tag is used as the primary tag for display and filtering. If no tags are provided, the sync script defaults to "Tech".
