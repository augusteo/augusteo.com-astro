# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with content sync + file watching
npm run build        # Build for production (syncs content first)
npm run sync         # One-time sync from Obsidian to Astro
npm run preview      # Preview production build
```

## Architecture

This is an Astro 5 blog that syncs content from an Obsidian vault. The site uses Tailwind CSS 4 and MDX for content.

### Content Pipeline

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

Blog posts use these frontmatter fields (defined in `src/content/config.ts`):

```typescript
title: string
description: string
pubDate: Date
heroImage?: image()    // Uses @assets alias, e.g., "@assets/blog/slug/image.jpg"
heroAlt: string
category: "travels" | "tech" | "books" | "philosophy"
tags?: string[]
featured: boolean
draft: boolean
```

### Path Alias

`@assets` resolves to `/src/assets` (configured in astro.config.mjs). Use this for image imports in MDX frontmatter.

### Categories

Valid categories are defined in `scripts/config.ts` and must match `src/content/config.ts`. To add a new category:
1. Add to `validCategories` array in `scripts/config.ts`
2. Add tag mapping in `categoryMap`
3. Add to the zod enum in `src/content/config.ts`
