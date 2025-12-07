import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import matter from "gray-matter";
import crypto from "crypto";
import { CONFIG } from "./config.js";

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
  tags: string[];
  featured: boolean;
  draft: boolean;
}

// Parse Obsidian wikilink images: ![[image-name.jpg]] or ![[image-name.png]]
const WIKILINK_IMAGE_REGEX = /!\[\[([\w\s\-_.]+\.(jpg|jpeg|png|gif|webp|svg))\]\]/gi;

// Parse wikilink external URLs: ![[https://example.com/image.jpg]]
const WIKILINK_EXTERNAL_URL_REGEX = /!\[\[(https?:\/\/[^\]]+)\]\]/gi;

// Parse standard markdown images with external URLs
const MARKDOWN_EXTERNAL_IMAGE_REGEX = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;

// Track downloaded images to avoid re-downloading
const downloadedImages = new Map<string, string>();

/**
 * Generate a filename from URL - uses hash to ensure uniqueness while keeping extension
 */
function generateLocalFilename(url: string): string {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  // Get the original extension
  const extMatch = pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
  const ext = extMatch ? extMatch[0].toLowerCase() : '.jpg';

  // Create a short hash of the URL for uniqueness
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);

  // Try to get a readable name from the URL path
  const pathParts = pathname.split('/').filter(Boolean);
  let baseName = pathParts[pathParts.length - 1] || 'image';

  // Clean up the base name
  baseName = baseName
    .replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 50); // Limit length

  return `${baseName}-${hash}${ext}`;
}

/**
 * Download an image from URL to local path
 */
async function downloadImage(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AstroSync/1.0)'
      },
      timeout: 30000
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          // Handle relative redirects
          const absoluteRedirect = redirectUrl.startsWith('http')
            ? redirectUrl
            : new URL(redirectUrl, url).toString();
          downloadImage(absoluteRedirect, destPath).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.warn(`    Warning: Failed to download ${url} (status: ${response.statusCode})`);
        resolve(false);
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {}); // Clean up partial file
        console.warn(`    Warning: Error writing ${destPath}: ${err.message}`);
        resolve(false);
      });
    });

    request.on('error', (err) => {
      console.warn(`    Warning: Error downloading ${url}: ${err.message}`);
      resolve(false);
    });

    request.on('timeout', () => {
      request.destroy();
      console.warn(`    Warning: Timeout downloading ${url}`);
      resolve(false);
    });
  });
}

/**
 * Extract external image URLs from content
 */
function extractExternalUrls(content: string): string[] {
  const urls: string[] = [];
  let match: RegExpExecArray | null;

  // Reset regex state
  WIKILINK_EXTERNAL_URL_REGEX.lastIndex = 0;
  MARKDOWN_EXTERNAL_IMAGE_REGEX.lastIndex = 0;

  // Extract from wikilink format: ![[https://...]]
  while ((match = WIKILINK_EXTERNAL_URL_REGEX.exec(content)) !== null) {
    urls.push(match[1]);
  }

  // Extract from standard markdown format: ![alt](https://...)
  while ((match = MARKDOWN_EXTERNAL_IMAGE_REGEX.exec(content)) !== null) {
    urls.push(match[2]);
  }

  return [...new Set(urls)]; // Remove duplicates
}

/**
 * Download all external images for a post and return URL -> local filename mapping
 */
async function downloadExternalImages(urls: string[], slug: string): Promise<Map<string, string>> {
  const urlToLocal = new Map<string, string>();

  if (urls.length === 0) return urlToLocal;

  const imageDir = path.join(CONFIG.imageOutputDir, slug);
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  for (const url of urls) {
    // Check if already downloaded in this session
    if (downloadedImages.has(url)) {
      urlToLocal.set(url, downloadedImages.get(url)!);
      continue;
    }

    const localFilename = generateLocalFilename(url);
    const destPath = path.join(imageDir, localFilename);

    const success = await downloadImage(url, destPath);
    if (success) {
      urlToLocal.set(url, localFilename);
      downloadedImages.set(url, localFilename);
    }
  }

  return urlToLocal;
}

function extractImages(content: string): string[] {
  const images: string[] = [];
  let match: RegExpExecArray | null;

  // Extract wikilink images
  while ((match = WIKILINK_IMAGE_REGEX.exec(content)) !== null) {
    images.push(match[1]);
  }

  return images;
}

/**
 * Escape curly braces in text that would be interpreted as JSX expressions in MDX.
 * Only escapes braces outside of code blocks and inline code.
 */
function escapeCurlyBraces(content: string): string {
  const lines = content.split('\n');
  let inCodeBlock = false;
  const result: string[] = [];

  for (const line of lines) {
    // Check for code block delimiters
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // For regular lines, escape curly braces outside of inline code
    // Split by inline code segments (backticks)
    const segments = line.split(/(`[^`]+`)/g);
    const escapedSegments = segments.map((segment, i) => {
      // Odd indexes are inline code (captured groups), keep as-is
      if (segment.startsWith('`') && segment.endsWith('`')) {
        return segment;
      }
      // Escape curly braces in regular text using MDX escape syntax
      return segment
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}');
    });
    result.push(escapedSegments.join(''));
  }

  return result.join('\n');
}

function transformContent(content: string, slug: string, urlToLocal: Map<string, string>): string {
  // Convert wikilink images to standard markdown with alias path to assets folder
  let transformed = content.replace(WIKILINK_IMAGE_REGEX, (_, imageName) => {
    return `![${imageName}](@assets/blog/${slug}/${imageName})`;
  });

  // Convert wikilink external URLs to local images (if downloaded) or standard markdown
  transformed = transformed.replace(WIKILINK_EXTERNAL_URL_REGEX, (_, url) => {
    const localFilename = urlToLocal.get(url);
    if (localFilename) {
      const altText = localFilename.replace(/[-_]/g, ' ').replace(/\.\w+$/, '').replace(/-[a-f0-9]{8}$/, '');
      return `![${altText}](@assets/blog/${slug}/${localFilename})`;
    }
    // Fallback to external URL if download failed
    const urlPath = url.split('/').pop() || 'image';
    const altText = urlPath.replace(/[-_]/g, ' ').replace(/\.\w+$/, '') || 'Image';
    return `![${altText}](${url})`;
  });

  // Convert standard markdown external URLs to local images (if downloaded)
  transformed = transformed.replace(MARKDOWN_EXTERNAL_IMAGE_REGEX, (match, alt, url) => {
    const localFilename = urlToLocal.get(url);
    if (localFilename) {
      return `![${alt || localFilename}](@assets/blog/${slug}/${localFilename})`;
    }
    // Keep original if download failed
    return match;
  });

  // Escape curly braces to prevent MDX from interpreting them as JSX
  transformed = escapeCurlyBraces(transformed);

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

function ensureTags(tags: string[] | undefined): string[] {
  if (!tags || tags.length === 0) {
    return [CONFIG.defaultTag];
  }
  return tags;
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

async function processPost(filePath: string): Promise<void> {
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

  // Extract and download external images
  const externalUrls = extractExternalUrls(rawContent);
  const urlToLocal = await downloadExternalImages(externalUrls, slug);

  // Ensure tags exist (use default if none provided)
  const tags = ensureTags(fm.tags);

  // Transform content (convert wikilinks and replace external URLs with local paths)
  const transformedContent = transformContent(rawContent, slug, urlToLocal);

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
    tags,
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
tags: ${JSON.stringify(astroFm.tags)}
featured: ${astroFm.featured}
draft: ${astroFm.draft}
---

${transformedContent}`;

  // Write the MDX file
  const outputPath = path.join(postDir, "index.mdx");
  fs.writeFileSync(outputPath, mdxContent);

  const downloadedCount = urlToLocal.size;
  const imageInfo = downloadedCount > 0
    ? `${imagesCopied} local, ${downloadedCount} downloaded`
    : `${imagesCopied} images`;
  console.log(`  ✓ ${slug}/ (${imageInfo})`);
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

async function syncContent(): Promise<void> {
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
      await processPost(filePath);
      processed++;
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err);
      errors++;
    }
  }

  const totalDownloaded = downloadedImages.size;
  const downloadInfo = totalDownloaded > 0 ? ` (${totalDownloaded} external images downloaded)` : '';
  console.log(`\n✅ Sync complete: ${processed} posts processed, ${errors} errors${downloadInfo}\n`);
}

// Run sync
syncContent().catch(console.error);
