import fs from "fs";
import path from "path";
import matter from "gray-matter";

const OBSIDIAN_BASE = "/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/augusteo.com-blog";

const CATEGORY_MAP: Record<string, string> = {
  "Travels": "travels",
  "Travel": "travels",
  "Tech": "tech",
  "Technology": "tech",
  "Book": "books",
  "Books": "books",
  "Philosophy": "philosophy",
  "AI Generated": "tech",
};

const VALID_CATEGORIES = ["travels", "tech", "books", "philosophy"];

interface ParsedFrontmatter {
  date?: string | Date;
  tags?: string[];
  slug?: string;
  summary?: string;
  title?: string;
  description?: string;
  pubDate?: string | Date;
  heroImage?: string;
  heroAlt?: string;
  category?: string;
  featured?: boolean;
  draft?: boolean;
  updatedDate?: string | Date;
}

interface NewFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  slug: string;
}

function extractTitle(content: string, filename: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  return filename.replace(/\.md$/, "");
}

function mapCategory(tags: string[] | undefined): string {
  if (!tags || tags.length === 0) {
    return "tech";
  }
  for (const tag of tags) {
    const mapped = CATEGORY_MAP[tag];
    if (mapped && VALID_CATEGORIES.includes(mapped)) {
      return mapped;
    }
  }
  return "tech";
}

function formatDate(date: string | Date | undefined): string {
  if (!date) {
    return new Date().toISOString().split("T")[0];
  }
  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }
  return date.split("T")[0];
}

function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse file that may have:
// 1. Standard format: ---frontmatter---\ncontent
// 2. Obsidian format: # Title\n---frontmatter---\ncontent
// 3. Already updated format: ---new frontmatter---\n# Title\n---old frontmatter---\ncontent
function parseObsidianFile(fileContent: string, filename: string): {
  frontmatter: ParsedFrontmatter;
  content: string;
  title: string;
} {
  let content = fileContent;
  let frontmatter: ParsedFrontmatter = {};
  let title = "";

  // Check if file starts with H1 heading (Obsidian style)
  const h1AtStartMatch = content.match(/^#\s+(.+)\n/);
  if (h1AtStartMatch) {
    title = h1AtStartMatch[1].trim();
    content = content.slice(h1AtStartMatch[0].length).trimStart();
  }

  // Try to parse frontmatter at the current position
  if (content.startsWith("---")) {
    const parsed = matter(content);
    frontmatter = { ...frontmatter, ...parsed.data as ParsedFrontmatter };
    content = parsed.content;
  }

  // Check for another H1 in content (may have been duplicated)
  const h1InContentMatch = content.match(/^#\s+(.+)\n/);
  if (h1InContentMatch) {
    if (!title) {
      title = h1InContentMatch[1].trim();
    }
    content = content.slice(h1InContentMatch[0].length).trimStart();
  }

  // Check for ANOTHER frontmatter block in content (old/duplicate)
  if (content.startsWith("---")) {
    const secondParsed = matter(content);
    // Merge, but prefer values from the FIRST frontmatter for new fields
    // and from the SECOND frontmatter for old fields (date, tags, slug, summary)
    const secondFm = secondParsed.data as ParsedFrontmatter;

    // If first frontmatter was empty/default, prefer second for these fields
    if (!frontmatter.description && secondFm.summary) {
      frontmatter.description = secondFm.summary;
    }
    if (!frontmatter.category && secondFm.tags) {
      frontmatter.category = mapCategory(secondFm.tags);
    }
    if ((!frontmatter.tags || frontmatter.tags.length === 0) && secondFm.tags) {
      frontmatter.tags = secondFm.tags;
    }
    if (!frontmatter.pubDate && secondFm.date) {
      frontmatter.pubDate = secondFm.date;
    }
    if (!frontmatter.slug && secondFm.slug) {
      frontmatter.slug = secondFm.slug;
    }

    content = secondParsed.content;
  }

  // Final title extraction if still missing
  if (!title) {
    title = extractTitle(content, filename);
  }

  // Clean up any remaining H1 that duplicates the title
  content = content.replace(/^#\s+.+\n+/, "").trim();

  return { frontmatter, content, title };
}

function processFile(filePath: string, isDraft: boolean): { updated: boolean; error?: string } {
  const filename = path.basename(filePath);

  try {
    // Read from backup if it exists, to get original data
    const backupPath = filePath + ".bak";
    let fileContent: string;

    if (fs.existsSync(backupPath)) {
      // Use backup (original file) for source data
      fileContent = fs.readFileSync(backupPath, "utf-8");
    } else {
      fileContent = fs.readFileSync(filePath, "utf-8");
      // Create backup
      fs.copyFileSync(filePath, backupPath);
    }

    const { frontmatter: fm, content, title } = parseObsidianFile(fileContent, filename);

    // Build new frontmatter with proper merging
    const newFm: NewFrontmatter = {
      title: fm.title || title,
      description: fm.description || fm.summary || "",
      pubDate: formatDate(fm.pubDate || fm.date),
      heroImage: fm.heroImage || "",
      heroAlt: fm.heroAlt || "",
      category: fm.category || mapCategory(fm.tags),
      tags: fm.tags || [],
      featured: fm.featured ?? false,
      draft: fm.draft ?? isDraft,
      slug: fm.slug || generateSlug(filename),
    };

    if (fm.updatedDate) {
      newFm.updatedDate = formatDate(fm.updatedDate);
    }

    // Write updated file with clean content
    const newContent = matter.stringify(content, newFm);
    fs.writeFileSync(filePath, newContent);

    return { updated: true };
  } catch (err) {
    return { updated: false, error: String(err) };
  }
}

function processFolder(folderPath: string, isDraft: boolean): void {
  const folderName = isDraft ? "drafts" : "published";

  if (!fs.existsSync(folderPath)) {
    console.log(`  Folder not found: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".md"));
  console.log(`\nProcessing ${files.length} files in ${folderName}/\n`);

  let updated = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const result = processFile(filePath, isDraft);

    if (result.updated) {
      console.log(`  ✓ ${file}`);
      updated++;
    } else {
      console.log(`  ✗ ${file}: ${result.error}`);
      errors++;
    }
  }

  console.log(`\n  ${folderName}: ${updated} updated, ${errors} errors`);
}

function main(): void {
  console.log("\n📝 Updating Obsidian frontmatter to full Astro schema...\n");
  console.log(`Base path: ${OBSIDIAN_BASE}`);

  processFolder(path.join(OBSIDIAN_BASE, "published"), false);
  processFolder(path.join(OBSIDIAN_BASE, "drafts"), true);

  console.log("\n✅ Done! Backups preserved with .bak extension\n");
}

main();
