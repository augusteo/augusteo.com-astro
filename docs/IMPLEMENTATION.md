# Augusteo Blog - Technical Implementation Guide

## Overview

Build a personal blog with a **watercolor + ballpoint pen aesthetic** using Astro 5, Tailwind CSS v4, and MDX. The design features organic shapes, hand-drawn SVG textures, and a warm paper-like feel.

**Live Design Reference:** See `blog-design-v2.html` for the complete visual mockup with all CSS.

---

## Tech Stack

| Component | Technology | Version | Notes |
|-----------|------------|---------|-------|
| Framework | Astro | 5.x (latest) | Static site generator |
| Styling | Tailwind CSS | 4.x | Via `@tailwindcss/vite` plugin |
| Content | MDX | 3.x | Via `@astrojs/mdx` |
| Fonts | Google Fonts | - | Caveat, Spectral, JetBrains Mono |
| Deployment | Vercel | - | Zero-config |

---

## Project Setup

### 1. Initialize Project

```bash
npm create astro@latest augusteo-blog
cd augusteo-blog

# Select: Empty project, TypeScript (strict), Install dependencies
```

### 2. Install Dependencies

```bash
# Core
npm install @astrojs/mdx @astrojs/sitemap @astrojs/rss

# Tailwind v4 (use Vite plugin, NOT @astrojs/tailwind)
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography
```

### 3. Configure Astro

**`astro.config.mjs`**
```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://augusteo.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
```

---

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── BaseHead.astro        # <head> with meta, fonts, OG tags
│   │   ├── Header.astro          # Navigation
│   │   ├── Footer.astro          # Footer
│   │   ├── PostCard.astro        # Blog list card
│   │   ├── FeaturedCard.astro    # Homepage featured post card
│   │   ├── CategoryFilter.astro  # Filter buttons (client-side JS)
│   │   ├── Button.astro          # Organic button component
│   │   └── WatercolorTextures.astro  # SVG texture definitions
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell
│   │   ├── PageLayout.astro      # Standard page (home, about)
│   │   └── PostLayout.astro      # Blog post layout
│   │
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog list with filtering
│   │   │   └── [...slug].astro   # Dynamic post pages
│   │   ├── about.astro           # About page
│   │   ├── resources.astro       # Resources page
│   │   ├── rss.xml.js            # RSS feed
│   │   └── 404.astro             # 404 page
│   │
│   ├── content/
│   │   ├── config.ts             # Content collection schema
│   │   └── blog/                 # MDX blog posts
│   │       ├── el-salvador-family-trip-2025.mdx
│   │       └── ...
│   │
│   ├── styles/
│   │   ├── global.css            # Tailwind imports + custom CSS
│   │   └── watercolor.css        # SVG texture definitions as CSS
│   │
│   └── lib/
│       └── utils.ts              # Helper functions
│
├── public/
│   ├── fonts/                    # Self-hosted fonts (optional)
│   ├── images/                   # Static images
│   │   └── hero/                 # Post hero images (OG images)
│   ├── favicon.svg
│   └── robots.txt
│
└── package.json
```

---

## Content Collection Schema

**`src/content/config.ts`**
```typescript
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(), // Used for meta description + excerpt
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(), // Required - also used as OG image
      heroAlt: z.string(),
      category: z.enum(["travels", "tech", "books", "philosophy"]),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().default(false), // For "Popular Posts"
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
};
```

---

## Styling Architecture

### Global CSS Structure

**`src/styles/global.css`**
```css
@import "tailwindcss";

/* ========================================
   THEME CONFIGURATION
======================================== */
@theme {
  /* Colors - Watercolor Palette */
  --color-paper: #fdfbf7;
  --color-paper-warm: #f9f5ed;
  --color-ink: #2d3436;
  --color-ink-light: #636e72;
  --color-ink-faint: #b2bec3;
  
  /* Watercolor Washes (with transparency) */
  --color-wash-sky: oklch(0.8 0.08 220 / 0.3);
  --color-wash-sage: oklch(0.7 0.1 140 / 0.28);
  --color-wash-terracotta: oklch(0.7 0.12 60 / 0.22);
  --color-wash-ocean: oklch(0.65 0.08 200 / 0.25);
  --color-wash-sunset: oklch(0.8 0.1 80 / 0.2);
  
  /* Accent Colors */
  --color-accent-green: #6b8e23;
  --color-accent-blue: #4682b4;
  --color-accent-terracotta: #cd5c5c;
  --color-accent-ochre: #daa520;
  
  /* Typography */
  --font-hand: "Caveat", cursive;
  --font-body: "Spectral", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;
  
  /* Spacing */
  --content-width: 720px;
  --wide-width: 1100px;
  --photo-width: 1000px;
  --max-photo-width: 1500px;
}

/* ========================================
   BASE STYLES
======================================== */
@layer base {
  html {
    font-size: 18px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: var(--font-body);
    color: var(--color-ink);
    background: var(--color-paper);
    line-height: 1.7;
  }
  
  /* Paper texture overlay */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,..."); /* noise texture */
    z-index: 9999;
  }
}

/* ========================================
   TYPOGRAPHY PLUGIN OVERRIDES
======================================== */
@layer components {
  .prose {
    --tw-prose-body: var(--color-ink);
    --tw-prose-headings: var(--color-ink);
    --tw-prose-links: var(--color-accent-blue);
    --tw-prose-code: var(--color-ink);
    max-width: var(--content-width);
  }
  
  .prose h2 {
    font-family: var(--font-hand);
    font-size: 2rem;
    position: relative;
    padding-left: 1.25rem;
  }
  
  /* Watercolor accent line for h2 */
  .prose h2::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: url("data:image/svg+xml,..."); /* ochre brushstroke */
    background-size: 100% 100%;
  }
  
  .prose h3 {
    font-family: var(--font-hand);
    font-size: 1.5rem;
  }
  
  /* Wide images - break out of content column */
  .prose figure {
    width: calc(100vw - 4rem);
    max-width: var(--max-photo-width);
    margin-left: 50%;
    transform: translateX(-50%);
  }
  
  .prose figure img {
    border-radius: 8px 16px 12px 20px / 12px 8px 20px 16px;
  }
  
  .prose figcaption {
    font-family: var(--font-hand);
    text-align: center;
    /* watercolor wash background via SVG */
  }
  
  /* Blockquote with watercolor background */
  .prose blockquote {
    position: relative;
    font-style: italic;
    border-left: none;
    padding: 1.5rem 2rem;
  }
  
  .prose blockquote::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,..."); /* sage wash */
    z-index: -1;
  }
  
  /* Code blocks */
  .prose pre {
    border-radius: 8px 16px 12px 20px / 20px 12px 16px 8px;
    background: #1a1a2e;
  }
  
  /* Inline code with watercolor blob */
  .prose code:not(pre code) {
    position: relative;
    font-family: var(--font-mono);
  }
  
  .prose code:not(pre code)::before {
    content: "";
    position: absolute;
    inset: -2px -4px;
    background: url("data:image/svg+xml,..."); /* sage blob */
    z-index: -1;
  }
}
```

### SVG Watercolor Textures

Create reusable SVG textures as CSS custom properties or inline in components. Key textures needed:

1. **Navigation stripe** - Gradient wavy line
2. **Button blob** - Organic pill shape with wash fill
3. **Card border** - Wobbly rectangle outline
4. **Accent line** - Vertical brushstroke for headings
5. **Blockquote wash** - Rectangular wash with edge variation
6. **Horizontal rule** - Wavy line with center ornament
7. **Category pill** - Small ellipse wash

See `blog-design-v2.html` for all SVG definitions.

---

## Component Specifications

### 1. Header (`Header.astro`)

```astro
---
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
];
---

<nav class="sticky top-0 z-50 bg-paper">
  <div class="nav-inner max-w-wide mx-auto px-8 py-4 flex justify-between items-center">
    <a href="/" class="logo font-hand text-3xl font-semibold relative">
      augusteo
      <!-- Watercolor underline via ::after -->
    </a>
    <ul class="flex gap-8">
      {navLinks.map(link => (
        <li>
          <a href={link.href} class="font-hand text-xl text-ink-light hover:text-ink">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
  <!-- Watercolor stripe via ::after pseudo-element -->
</nav>
```

**Key styling:**
- Sticky positioning
- Logo has ochre watercolor underline
- Nav links have terracotta wavy underline on hover
- Bottom border is wavy gradient SVG stripe

### 2. Button (`Button.astro`)

```astro
---
interface Props {
  href?: string;
  variant?: "sky" | "sage" | "terracotta";
  class?: string;
}

const { href, variant = "sky", class: className } = Astro.props;
const Element = href ? "a" : "button";
---

<Element
  href={href}
  class:list={[
    "btn-organic",
    `btn-${variant}`,
    "font-hand text-xl px-5 py-2 relative inline-block",
    "transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5",
    className,
  ]}
>
  <slot />
</Element>

<style>
  .btn-organic::before {
    content: "";
    position: absolute;
    inset: -4px -8px;
    z-index: -1;
    transition: transform 0.2s;
    /* SVG watercolor blob with hand-drawn outline */
  }
  
  .btn-organic:hover::before {
    transform: translate(2px, 2px);
  }
  
  .btn-sky::before { /* sky blue wash */ }
  .btn-sage::before { /* sage green wash */ }
  .btn-terracotta::before { /* terracotta wash */ }
</style>
```

### 3. PostCard (`PostCard.astro`)

```astro
---
import { Image } from "astro:assets";

interface Props {
  title: string;
  description: string;
  pubDate: Date;
  heroImage: ImageMetadata;
  heroAlt: string;
  category: string;
  slug: string;
}

const { title, description, pubDate, heroImage, heroAlt, category, slug } = Astro.props;

const formattedDate = pubDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
---

<a
  href={`/blog/${slug}`}
  class="post-card group grid grid-cols-[320px_1fr] gap-6 p-5 relative"
  data-category={category}
>
  <!-- Organic border (hidden, shown on hover) -->
  
  <div class="post-card-image aspect-[16/10] overflow-hidden">
    <Image
      src={heroImage}
      alt={heroAlt}
      class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-103"
      style="border-radius: 6px 12px 8px 10px / 10px 8px 12px 6px;"
      widths={[400, 640, 800]}
      sizes="320px"
    />
  </div>
  
  <div class="flex flex-col justify-center pr-4">
    <div class="flex gap-4 items-center mb-2">
      <span class="post-card-category font-mono text-xs uppercase tracking-wider px-2.5 py-1 relative">
        {category}
        <!-- Watercolor pill background -->
      </span>
      <span class="font-mono text-xs text-ink-light">{formattedDate}</span>
    </div>
    
    <h2 class="font-hand text-3xl font-medium leading-tight mb-3">
      {title}
    </h2>
    
    <p class="text-ink-light leading-relaxed">
      {description}
    </p>
    
    <span class="mt-auto pt-3 font-hand text-lg text-accent-blue inline-flex items-center gap-2">
      Read more
      <span class="transition-transform group-hover:translate-x-1">→</span>
    </span>
  </div>
  
  <!-- Category accent line (left edge, shown on hover) -->
</a>
```

**Responsive:** On mobile (`< 900px`), switch to single column layout.

### 4. FeaturedCard (`FeaturedCard.astro`)

Similar to PostCard but:
- Vertical layout (image on top)
- 16:10 aspect ratio image
- Watercolor fade at bottom of image
- Used on homepage in 2x2 grid

### 5. CategoryFilter (`CategoryFilter.astro`)

```astro
---
const categories = ["all", "travels", "tech", "books", "philosophy"];
---

<div class="filters flex gap-2 flex-wrap mb-8">
  {categories.map((cat, i) => (
    <button
      class:list={[
        "filter-btn font-hand text-lg px-4 py-1.5 relative",
        "text-ink-light hover:text-ink transition-colors",
        i === 0 && "active text-ink",
      ]}
      data-category={cat}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
      <!-- Watercolor pill background (opacity 0, 1 on hover/active) -->
    </button>
  ))}
</div>

<script>
  // Client-side filtering
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      
      // Update active state
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Filter posts
      document.querySelectorAll(".post-card").forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "grid";
          card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
        } else {
          card.style.display = "none";
        }
      });
    });
  });
</script>
```

---

## Page Implementations

### Homepage (`src/pages/index.astro`)

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../layouts/BaseLayout.astro";
import FeaturedCard from "../components/FeaturedCard.astro";
import Button from "../components/Button.astro";

// Get featured posts (manually curated via frontmatter)
const featuredPosts = await getCollection("blog", ({ data }) => {
  return data.featured === true && !data.draft;
});

// Sort by date, take 4
const posts = featuredPosts
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 4);
---

<BaseLayout title="Victor Augusteo" description="Personal blog about travels, tech, books, and philosophy">
  <!-- Hero Section -->
  <section class="hero max-w-content mx-auto px-8 py-20 grid grid-cols-[1fr_200px] gap-12 items-start relative">
    <!-- Watercolor blob background -->
    
    <div class="hero-text">
      <h1 class="font-hand text-6xl font-semibold leading-tight mb-6">
        Hi, I'm <span class="relative inline-block">Victor<!-- highlight --></span>
      </h1>
      <p class="text-lg text-ink-light mb-6">
        Head of Engineering at Boon AI. I write about travels with my family,
        technology & AI, books I've read, and the occasional philosophical rambling.
        This is my corner of the internet.
      </p>
      <div class="flex flex-wrap gap-3">
        <Button href="/blog">Read the Blog</Button>
        <Button href="/about" variant="sage">About Me</Button>
        <Button href="/resources" variant="terracotta">Resources</Button>
      </div>
    </div>
    
    <div class="hero-portrait relative">
      <!-- Watercolor splash behind -->
      <img
        src="/images/portrait.jpg"
        alt="Victor"
        class="w-44 h-44 object-cover relative z-10"
        style="border-radius: 50% 45% 55% 48% / 48% 50% 45% 52%; border: 2px solid var(--color-ink);"
      />
    </div>
  </section>
  
  <!-- Divider -->
  <div class="divider max-w-content mx-auto px-8 h-8">
    <!-- SVG wavy line with ornament -->
  </div>
  
  <!-- Popular Posts -->
  <section class="max-w-wide mx-auto px-8 py-12">
    <h2 class="section-title font-hand text-3xl mb-6 relative inline-block">
      Popular Posts
      <!-- Underline + star decoration -->
    </h2>
    
    <div class="grid grid-cols-2 gap-8">
      {posts.map((post) => (
        <FeaturedCard
          title={post.data.title}
          description={post.data.description}
          heroImage={post.data.heroImage}
          heroAlt={post.data.heroAlt}
          category={post.data.category}
          slug={post.slug}
        />
      ))}
    </div>
  </section>
</BaseLayout>
```

### Blog List (`src/pages/blog/index.astro`)

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import PostCard from "../../components/PostCard.astro";
import CategoryFilter from "../../components/CategoryFilter.astro";

const posts = await getCollection("blog", ({ data }) => !data.draft);
const sortedPosts = posts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="Blog | Victor Augusteo" description="All blog posts">
  <div class="max-w-wide mx-auto px-8 pt-12 pb-4">
    <h1 class="font-hand text-5xl mb-6">All Posts</h1>
    <CategoryFilter />
  </div>
  
  <div class="blog-grid max-w-wide mx-auto px-8 pb-16 grid gap-10">
    {sortedPosts.map((post) => (
      <PostCard
        title={post.data.title}
        description={post.data.description}
        pubDate={post.data.pubDate}
        heroImage={post.data.heroImage}
        heroAlt={post.data.heroAlt}
        category={post.data.category}
        slug={post.slug}
      />
    ))}
  </div>
</BaseLayout>
```

### Blog Post (`src/pages/blog/[...slug].astro`)

```astro
---
import { getCollection, render } from "astro:content";
import { Image } from "astro:assets";
import PostLayout from "../../layouts/PostLayout.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const post = Astro.props;
const { Content } = await render(post);

const formattedDate = post.data.pubDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

// Calculate reading time (rough estimate)
const words = post.body.split(/\s+/).length;
const readingTime = Math.ceil(words / 200);
---

<PostLayout
  title={post.data.title}
  description={post.data.description}
  heroImage={post.data.heroImage}
  pubDate={post.data.pubDate}
>
  <!-- Hero Image -->
  <div class="post-hero relative h-[55vh] min-h-[350px] max-h-[550px] overflow-hidden">
    <Image
      src={post.data.heroImage}
      alt={post.data.heroAlt}
      class="w-full h-full object-cover"
      widths={[800, 1200, 1600, 2000]}
      sizes="100vw"
    />
    <!-- Watercolor fade overlay at bottom -->
  </div>
  
  <!-- Header (overlaps hero) -->
  <header class="post-header max-w-content mx-auto -mt-24 px-8 relative z-10">
    <span class="category font-mono text-xs uppercase tracking-wider px-3 py-1.5 relative inline-block mb-4">
      {post.data.category}
      <!-- Watercolor pill background -->
    </span>
    
    <h1 class="font-hand text-5xl font-semibold leading-tight mb-4">
      {post.data.title}
    </h1>
    
    <div class="meta flex gap-6 items-center font-mono text-xs text-ink-light mb-8">
      <span>📅 {formattedDate}</span>
      <span>⏱ {readingTime} min read</span>
      {post.data.tags && (
        <span>🏷 {post.data.tags.join(", ")}</span>
      )}
    </div>
  </header>
  
  <!-- Content -->
  <article class="post-content prose max-w-content mx-auto px-8 py-8">
    <Content />
  </article>
</PostLayout>
```

---

## OpenGraph / Social Sharing

The hero image doubles as the OG image. Configure in `BaseHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string; // URL to hero image
}

const { title, description, image = "/images/default-og.png" } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.site)} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image, Astro.site)} />
```

For blog posts, pass the hero image URL:

```astro
<BaseHead
  title={post.data.title}
  description={post.data.description}
  image={post.data.heroImage.src}
/>
```

---

## Image Handling

### Hero Images (OG Images)

- Store in `src/content/blog/` alongside MDX files, or in `public/images/hero/`
- Recommended size: **1200x630px** (optimal for social sharing)
- Use Astro's `<Image>` component for optimization
- Generate responsive srcset for different viewports

### In-Post Images

- Use MDX syntax with custom component for wide images:

```mdx
import WideImage from "../../components/WideImage.astro";

<WideImage src="./photo.jpg" alt="Description" caption="Optional caption" />
```

**`WideImage.astro`**
```astro
---
import { Image } from "astro:assets";

interface Props {
  src: ImageMetadata;
  alt: string;
  caption?: string;
}

const { src, alt, caption } = Astro.props;
---

<figure class="wide-image my-12" style="width: calc(100vw - 4rem); max-width: 1500px; margin-left: 50%; transform: translateX(-50%);">
  <Image
    src={src}
    alt={alt}
    class="w-full"
    style="border-radius: 8px 16px 12px 20px / 12px 8px 20px 16px;"
    widths={[800, 1200, 1500]}
    sizes="(max-width: 1500px) calc(100vw - 4rem), 1500px"
  />
  {caption && (
    <figcaption class="font-hand text-lg text-ink-light text-center py-3 relative">
      {caption}
      <!-- Watercolor wash background -->
    </figcaption>
  )}
</figure>
```

---

## RSS Feed

**`src/pages/rss.xml.js`**
```javascript
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  
  return rss({
    title: "Victor Augusteo",
    description: "Personal blog about travels, tech, books, and philosophy",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
  });
}
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Build settings (auto-detected):
   - Build command: `astro build`
   - Output directory: `dist`
4. Add environment variables if needed
5. Deploy

---

## Sample Blog Post

**`src/content/blog/el-salvador-family-trip-2025.mdx`**
```mdx
---
title: "El Salvador with Kids: 5 Days of Adventure, Vomit, and Unexpected Familiarity"
description: "Our family of four spends 5 days in El Salvador on a budget, navigating rental car chaos, armed security everywhere, two vomiting kids, and discovers a country in the middle of a post-gang renaissance that feels surprisingly like Indonesia."
pubDate: 2025-11-29
heroImage: "./el-salvador-hero.png"
heroAlt: "Watercolor illustration of El Salvador landscape with volcano and village"
category: "travels"
tags: ["El Salvador", "family travel", "Central America"]
featured: true
draft: false
---

import WideImage from "../../components/WideImage.astro";

**We never planned to go to El Salvador.** It started the way a lot of our family trips do: opening Google Flights during the kids' Thanksgiving break, looking for somewhere warm and cheap.

## Day 1: The Airport Adventure Begins

We landed around 6-7am after a red-eye from San Jose. The airport was surprisingly modern—we even took the obligatory photo with the country seal. And then things got interesting.

> Lesson learned: don't cheap out on car rentals in El Salvador. But also, it's an adventure.

<WideImage
  src="./san-salvador-drive.jpg"
  alt="View of San Salvador outskirts"
  caption="The drive into San Salvador proper was my first 'wait, is this Indonesia?' moment."
/>

## A Quick Code Example

Here's how I used Claude to batch out activities:

```javascript
const regions = ['San Salvador', 'Lake Coatepeque', 'El Sunzal'];

const activities = await Promise.all(
  regions.map(region => 
    claude.complete({
      prompt: `List family-friendly activities in ${region}`,
      max_tokens: 500
    })
  )
);
```

## Final Thoughts

**Three words for El Salvador:** Raw, cheap, surprisingly familiar.

---

*Trip stats: 5 days, 2 vomiting children, 1 Google Maps near-disaster, pupusas everywhere.*
```

---

## Key SVG Textures to Implement

Extract these from `blog-design-v2.html` and convert to reusable CSS:

| Texture | Usage | CSS Class |
|---------|-------|-----------|
| Nav stripe | Navigation bottom border | `.nav-stripe::after` |
| Logo underline | Logo decoration | `.logo::after` |
| Button blob | All buttons | `.btn-organic::before` |
| Card border | Post cards, featured cards | `.card-border::before` |
| Category pill | Category tags | `.category-pill::before` |
| H2 accent | Post heading accents | `.prose h2::before` |
| Blockquote wash | Blockquote background | `.prose blockquote::before` |
| Code blob | Inline code | `.prose code::before` |
| Figcaption wash | Image captions | `.prose figcaption::before` |
| Horizontal rule | Post dividers | `.sketch-hr` |
| Divider line | Section dividers | `.divider-line` |

---

## Checklist

- [ ] Initialize Astro 5 project
- [ ] Configure Tailwind v4 with Vite plugin
- [ ] Set up content collection schema
- [ ] Create base layout with fonts
- [ ] Implement SVG watercolor textures as CSS
- [ ] Build Header component with organic styling
- [ ] Build Footer component
- [ ] Build Button component (3 variants)
- [ ] Build PostCard component
- [ ] Build FeaturedCard component
- [ ] Build CategoryFilter with client-side JS
- [ ] Build WideImage MDX component
- [ ] Create homepage
- [ ] Create blog list page with filtering
- [ ] Create blog post template
- [ ] Configure OG meta tags
- [ ] Add RSS feed
- [ ] Add sitemap
- [ ] Test responsive design
- [ ] Deploy to Vercel

---

## Notes

- **No dark mode** - Light theme only as per design spec
- **Organic shapes** - All borders, buttons, and decorative elements should avoid sharp 90° angles
- **Watercolor aesthetic** - Use SVG filters (feTurbulence, feDisplacementMap) to create paint-like edges
- **Typography** - Caveat for headings/UI, Spectral for body, JetBrains Mono for code
- **Image width** - In-post images break out to max 1500px, capped for ultrawide monitors
- **Performance** - All watercolor textures are inline SVG data URIs to avoid extra requests
