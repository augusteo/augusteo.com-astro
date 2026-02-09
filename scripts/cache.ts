import fs from "fs";
import path from "path";
import crypto from "crypto";

// Schema version - increment when cache structure changes
export const CACHE_VERSION = 1;

// Cache file path (relative to project root)
export const CACHE_PATH = ".sync-cache.json";

export interface ExternalImageState {
  url: string;
  localFilename: string; // e.g., "image-a1b2c3d4.jpg"
  contentHash: string; // SHA-256 of downloaded file
  downloadedAt: string;
  size: number;
}

export interface FileState {
  sourceFile: string; // Relative path (filename)
  sourceHash: string; // SHA-256 of content
  sourceMtime: number; // Unix timestamp (ms)
  slug: string;
  localImages: string[];
  externalImageUrls: string[];
}

export interface SyncCache {
  version: number; // Schema version for invalidation
  lastSync: string; // ISO timestamp
  files: Record<string, FileState>; // Keyed by source filename
  externalImages: Record<string, ExternalImageState>; // Keyed by URL
}

/**
 * Load cache from disk
 * Returns null if cache is missing, invalid, or version mismatch
 */
export function loadCache(): SyncCache | null {
  const cachePath = path.resolve(CACHE_PATH);

  if (!fs.existsSync(cachePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(cachePath, "utf-8");
    const cache = JSON.parse(content) as SyncCache;

    // Validate version
    if (cache.version !== CACHE_VERSION) {
      console.log(`  Cache version mismatch (${cache.version} vs ${CACHE_VERSION}), rebuilding...`);
      return null;
    }

    // Basic structure validation
    if (!cache.files || !cache.externalImages || !cache.lastSync) {
      console.log("  Cache structure invalid, rebuilding...");
      return null;
    }

    return cache;
  } catch (err) {
    console.log("  Cache corrupted or unreadable, rebuilding...");
    return null;
  }
}

/**
 * Save cache to disk atomically via temp file + rename
 */
export function saveCache(cache: SyncCache): void {
  const cachePath = path.resolve(CACHE_PATH);
  const tempPath = `${cachePath}.tmp`;

  try {
    // Write to temp file
    fs.writeFileSync(tempPath, JSON.stringify(cache, null, 2));
    // Atomic rename
    fs.renameSync(tempPath, cachePath);
  } catch (err) {
    // Clean up temp file if rename failed
    try {
      fs.unlinkSync(tempPath);
    } catch {
      // Ignore cleanup errors
    }
    throw err;
  }
}

/**
 * Create a new empty cache
 */
export function createEmptyCache(): SyncCache {
  return {
    version: CACHE_VERSION,
    lastSync: new Date().toISOString(),
    files: {},
    externalImages: {},
  };
}

/**
 * Compute SHA-256 hash of a string
 */
export function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

/**
 * Compute SHA-256 hash of a file
 */
export function hashFile(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

/**
 * Get file mtime in milliseconds
 */
export function getFileMtime(filePath: string): number {
  const stat = fs.statSync(filePath);
  return stat.mtimeMs;
}

/**
 * Check if a source file has changed since last sync
 * Uses mtime as fast path, falls back to content hash
 */
export function hasSourceChanged(
  filePath: string,
  filename: string,
  cache: SyncCache | null
): boolean {
  // No cache = everything is new
  if (!cache) {
    return true;
  }

  const cached = cache.files[filename];

  // New file not in cache
  if (!cached) {
    return true;
  }

  // Fast path: check mtime first
  const currentMtime = getFileMtime(filePath);
  if (currentMtime === cached.sourceMtime) {
    return false; // mtime unchanged, skip expensive hash
  }

  // mtime changed - could be iCloud touching file without content change
  // Fall back to content hash
  const content = fs.readFileSync(filePath, "utf-8");
  const currentHash = hashContent(content);

  return currentHash !== cached.sourceHash;
}

/**
 * Check if an external image needs to be downloaded
 * Returns true if URL not in cache or local file is missing/corrupted
 */
export function needsDownload(
  url: string,
  slug: string,
  imageOutputDir: string,
  cache: SyncCache | null
): boolean {
  if (!cache) {
    return true;
  }

  const cached = cache.externalImages[url];
  if (!cached) {
    return true; // Not in cache
  }

  // Check if local file exists
  const localPath = path.join(imageOutputDir, slug, cached.localFilename);
  if (!fs.existsSync(localPath)) {
    return true; // File missing
  }

  // Verify file integrity via hash
  try {
    const currentHash = hashFile(localPath);
    if (currentHash !== cached.contentHash) {
      return true; // File corrupted
    }
  } catch {
    return true; // Can't read file
  }

  return false; // Cached and valid
}

/**
 * Create a FileState entry for the cache
 */
export function createFileState(
  filename: string,
  content: string,
  mtime: number,
  slug: string,
  localImages: string[],
  externalImageUrls: string[]
): FileState {
  return {
    sourceFile: filename,
    sourceHash: hashContent(content),
    sourceMtime: mtime,
    slug,
    localImages,
    externalImageUrls,
  };
}

/**
 * Create an ExternalImageState entry for the cache
 */
export function createExternalImageState(
  url: string,
  localFilename: string,
  localPath: string
): ExternalImageState {
  const stat = fs.statSync(localPath);
  return {
    url,
    localFilename,
    contentHash: hashFile(localPath),
    downloadedAt: new Date().toISOString(),
    size: stat.size,
  };
}

/**
 * Find orphaned slugs (files in cache that no longer exist in source)
 */
export function findOrphanedSlugs(
  currentFiles: string[],
  cache: SyncCache | null
): string[] {
  if (!cache) {
    return [];
  }

  const currentSet = new Set(currentFiles);
  const orphanedSlugs: string[] = [];

  for (const [filename, state] of Object.entries(cache.files)) {
    if (!currentSet.has(filename)) {
      orphanedSlugs.push(state.slug);
    }
  }

  return orphanedSlugs;
}

/**
 * Clean up orphaned output directories for a deleted source file
 */
export function cleanupOrphanedSlug(
  slug: string,
  outputDir: string,
  imageOutputDir: string,
  publicImageDir?: string
): void {
  const contentDir = path.join(outputDir, slug);
  const assetDir = path.join(imageOutputDir, slug);

  if (fs.existsSync(contentDir)) {
    fs.rmSync(contentDir, { recursive: true });
    console.log(`  🗑️  Removed orphaned content: ${slug}/`);
  }

  if (fs.existsSync(assetDir)) {
    fs.rmSync(assetDir, { recursive: true });
    console.log(`  🗑️  Removed orphaned assets: ${slug}/`);
  }

  if (publicImageDir) {
    const publicDir = path.join(publicImageDir, slug);
    if (fs.existsSync(publicDir)) {
      fs.rmSync(publicDir, { recursive: true });
    }
  }
}
