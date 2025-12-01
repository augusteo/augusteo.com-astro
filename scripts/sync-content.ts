import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CONFIG, type Category } from "./config.js";

interface ObsidianFrontmatter {
  // New full schema fields
  title?: string;
  description?: string;
  pubDate?: string | Date;
  updatedDate?: string | Date;
  heroImage?: string;
  heroAlt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  slug?: string;
  // Legacy fields for backwards compatibility
  date?: string | Date;
  summary?: string;
}

interface AstroFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  heroImage?: string;
  heroAlt: string;
  category: Category;
  tags?: string[];
  featured: boolean;
  draft: boolean;
}

// Parse Obsidian wikilink images: ![[image-name.jpg]] or ![[image-name.png]]
const WIKILINK_IMAGE_REGEX = /!\[\[([\w\s\-_.]+\.(jpg|jpeg|png|gif|webp|svg))\]\]/gi;

// Parse wikilink external URLs: ![[https://example.com/image.jpg]]
const WIKILINK_EXTERNAL_URL_REGEX = /!\[\[(https?:\/\/[^\]]+)\]\]/gi;

// Parse standard markdown images for fallback
const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

function extractImages(content: string): string[] {
  const images: string[] = [];
  let match: RegExpExecArray | null;

  // Extract wikilink images
  while ((match = WIKILINK_IMAGE_REGEX.exec(content)) !== null) {
    images.push(match[1]);
  }

  return images;
}

function transformContent(content: string, slug: string): string {
  // Convert wikilink images to standard markdown with alias path to assets folder
  let transformed = content.replace(WIKILINK_IMAGE_REGEX, (_, imageName) => {
    return `![${imageName}](@assets/blog/${slug}/${imageName})`;
  });

  // Convert wikilink external URLs to standard markdown images
  transformed = transformed.replace(WIKILINK_EXTERNAL_URL_REGEX, (_, url) => {
    // Extract filename from URL for alt text, or use generic alt
    const urlPath = url.split('/').pop() || 'image';
    const altText = urlPath.replace(/[-_]/g, ' ').replace(/\.\w+$/, '') || 'Image';
    return `![${altText}](${url})`;
  });

  // Trim leading/trailing whitespace
  transformed = transformed.trim();

  return transformed;
}

function extractTitle(content: string, filename: string): string {
  // Try to extract from first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  // Fallback to filename
  return filename.replace(/\.md$/, "").replace(/-/g, " ");
}

function mapCategory(tags: string[] | undefined): Category {
  if (!tags || tags.length === 0) {
    return CONFIG.defaultCategory;
  }

  for (const tag of tags) {
    const mapped = CONFIG.categoryMap[tag];
    if (mapped && CONFIG.validCategories.includes(mapped as Category)) {
      return mapped as Category;
    }
  }

  return CONFIG.defaultCategory;
}

function generateSlug(filename: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) {
    return frontmatterSlug;
  }

  // Generate from filename
  return filename
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function copyImage(imageName: string, slug: string): boolean {
  const sourcePath = path.join(CONFIG.obsidianFiles, imageName);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  Warning: Image not found: ${imageName}`);
    return false;
  }

  // Copy to src/assets/blog/[slug]/
  const imageDir = path.join(CONFIG.imageOutputDir, slug);
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const destPath = path.join(imageDir, imageName);
  fs.copyFileSync(sourcePath, destPath);
  return true;
}

function parseObsidianFile(fileContent: string): { title: string; frontmatter: ObsidianFrontmatter; content: string } {
  // Obsidian format: # Title\n\n---\nfrontmatter\n---\n\ncontent
  // OR standard: ---\nfrontmatter\n---\n\n# Title\n\ncontent

  let title = "";
  let frontmatter: ObsidianFrontmatter = {};
  let content = fileContent;

  // Check if file starts with H1 heading
  const h1AtStartMatch = fileContent.match(/^#\s+(.+)\n/);
  if (h1AtStartMatch) {
    title = h1AtStartMatch[1].trim();
    content = fileContent.slice(h1AtStartMatch[0].length);
  }

  // Trim leading whitespace before parsing frontmatter (gray-matter needs --- at start)
  content = content.trimStart();

  // Now try to parse frontmatter from remaining content
  const { data, content: remainingContent } = matter(content);
  frontmatter = data as ObsidianFrontmatter;
  content = remainingContent;

  // If title wasn't at start, check for H1 in content
  if (!title) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
      // Remove the title from content
      content = content.replace(/^#\s+.+\n+/, "");
    }
  }

  // Remove any leading # heading from content (often duplicated after frontmatter)
  content = content.replace(/^#\s+.+\n+/, "");

  return { title, frontmatter, content };
}

function processPost(filePath: string): void {
  const filename = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Parse the Obsidian file format
  const { title: extractedTitle, frontmatter: fm, content: rawContent } = parseObsidianFile(fileContent);

  // Use frontmatter title, extracted title, or fallback to filename
  const title = fm.title || extractedTitle || filename.replace(/\.md$/, "").replace(/-/g, " ");

  // Generate slug
  const slug = generateSlug(filename, fm.slug);

  // Extract all images from content
  const images = extractImages(rawContent);
  // Use frontmatter heroImage or first image from content
  const heroImageFromContent = images[0] || null;

  // Map category from frontmatter or tags
  const category = (fm.category && CONFIG.validCategories.includes(fm.category as Category))
    ? fm.category as Category
    : mapCategory(fm.tags);

  // Transform content (convert wikilinks)
  const transformedContent = transformContent(rawContent, slug);

  // Format date as YYYY-MM-DD string - prefer pubDate over legacy date field
  let pubDate: string;
  const dateSource = fm.pubDate || fm.date;
  if (dateSource) {
    if (dateSource instanceof Date) {
      pubDate = dateSource.toISOString().split("T")[0];
    } else if (typeof dateSource === "string") {
      pubDate = dateSource.split("T")[0];
    } else {
      pubDate = new Date().toISOString().split("T")[0];
    }
  } else {
    pubDate = new Date().toISOString().split("T")[0];
  }

  // Determine hero image - use frontmatter heroImage if set and not empty
  const heroImage = (fm.heroImage && fm.heroImage.trim() !== "")
    ? fm.heroImage
    : heroImageFromContent;

  // Build Astro frontmatter
  const astroFm: AstroFrontmatter = {
    title,
    description: fm.description || fm.summary || `${title} - a blog post by Victor Augusteo`,
    pubDate,
    heroImage: heroImage ? `@assets/blog/${slug}/${heroImage}` : undefined,
    heroAlt: fm.heroAlt || (heroImage
      ? heroImage.replace(/[-_]/g, " ").replace(/\.\w+$/, "")
      : title),
    category,
    tags: fm.tags,
    featured: fm.featured ?? false,
    draft: fm.draft ?? false,
  };

  // Create output directory for this post
  const postDir = path.join(CONFIG.outputDir, slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  // Copy all referenced images to assets folder
  let imagesCopied = 0;
  for (const img of images) {
    if (copyImage(img, slug)) {
      imagesCopied++;
    }
  }

  // Also copy heroImage from frontmatter if it's not already in the content images
  if (heroImage && !images.includes(heroImage)) {
    if (copyImage(heroImage, slug)) {
      imagesCopied++;
    }
  }

  // If no hero image found, create a placeholder notice
  if (!heroImage) {
    console.warn(`  Warning: No hero image found for "${title}"`);
  }

  // Build the MDX file content
  const heroImageLine = astroFm.heroImage ? `heroImage: "${astroFm.heroImage}"\n` : "";
  const mdxContent = `---
title: "${astroFm.title.replace(/"/g, '\\"')}"
description: "${astroFm.description.replace(/"/g, '\\"')}"
pubDate: ${astroFm.pubDate}
${heroImageLine}heroAlt: "${astroFm.heroAlt.replace(/"/g, '\\"')}"
category: "${astroFm.category}"
${astroFm.tags ? `tags: ${JSON.stringify(astroFm.tags)}` : ""}
featured: ${astroFm.featured}
draft: ${astroFm.draft}
---

${transformedContent}`;

  // Write the MDX file
  const outputPath = path.join(postDir, "index.mdx");
  fs.writeFileSync(outputPath, mdxContent);

  console.log(`  ✓ ${slug}/ (${imagesCopied} images)`);
}

function cleanOutputDirs(): void {
  // Clean content directory
  if (fs.existsSync(CONFIG.outputDir)) {
    fs.rmSync(CONFIG.outputDir, { recursive: true });
  }
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  // Clean assets directory
  if (fs.existsSync(CONFIG.imageOutputDir)) {
    fs.rmSync(CONFIG.imageOutputDir, { recursive: true });
  }
  fs.mkdirSync(CONFIG.imageOutputDir, { recursive: true });
}

function syncContent(): void {
  console.log("\n📝 Syncing content from Obsidian...\n");
  console.log(`Source: ${CONFIG.obsidianPublished}`);
  console.log(`Output: ${CONFIG.outputDir}\n`);

  // Clean and recreate output directories
  cleanOutputDirs();

  // Get all markdown files
  const files = fs.readdirSync(CONFIG.obsidianPublished).filter((f) => f.endsWith(".md"));

  console.log(`Found ${files.length} posts to process:\n`);

  let processed = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(CONFIG.obsidianPublished, file);
    try {
      processPost(filePath);
      processed++;
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err);
      errors++;
    }
  }

  console.log(`\n✅ Sync complete: ${processed} posts processed, ${errors} errors\n`);
}

// Run sync
syncContent();
