#!/usr/bin/env bun
/**
 * Syncs photos from PHOTO_SOURCE_DIR (default: ~/Downloads/portfolio/radiantpicture)
 * into src/assets/photos/[album]/. Hash-cached change detection. Optional orphan pruning.
 *
 * Usage:
 *   bun scripts/sync-photos.ts                          # sync (warn-only on orphans)
 *   bun scripts/sync-photos.ts --prune                  # print prune plan
 *   bun scripts/sync-photos.ts --prune --prune-confirm  # actually delete orphans
 *
 * Env:
 *   PHOTO_SOURCE_DIR - override source dir
 */

import { readdir, mkdir, copyFile, stat, readFile, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import { join, extname } from "path";
import { createHash } from "crypto";

const PHOTO_SOURCE_DIR =
  process.env.PHOTO_SOURCE_DIR ?? "/Users/vic/Downloads/portfolio/radiantpicture";
const DEST_DIR = "./src/assets/photos";
const CACHE_FILE = "./.sync-photos-cache.json";

const ARGS = process.argv.slice(2);
const FLAGS = new Set(ARGS.filter((a) => !a.includes("=")));
const PRUNE = FLAGS.has("--prune");
const PRUNE_CONFIRM = FLAGS.has("--prune-confirm");
const ALBUMS_FILTER = (() => {
  const arg = ARGS.find((a) => a.startsWith("--albums="));
  if (!arg) return null;
  return new Set(arg.slice("--albums=".length).split(",").filter(Boolean));
})();

const IGNORE_FILES = new Set(["_page.html", "_urls.txt", "download.sh", ".DS_Store"]);

// Renames "001_<anything>.jpg" -> "001.jpg". Adobe Portfolio uses several suffix
// patterns: "001_<uuid>.jpg", "001_cover_<uuid>.jpg", etc. Match the leading number
// and drop anything between the underscore and the extension.
const UUID_RENAME = /^(\d+)_.+\.(jpg|jpeg)$/i;

type CacheEntry = { hash: string; size: number; mtime: number };
type Cache = Record<string, CacheEntry>;

async function loadCache(): Promise<Cache> {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

async function saveCache(cache: Cache) {
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function hashFile(path: string): Promise<string> {
  const buf = await readFile(path);
  return createHash("sha256").update(buf).digest("hex");
}

function destFileName(srcName: string): string {
  const m = srcName.match(UUID_RENAME);
  if (m) return `${m[1]}.${m[2].toLowerCase() === "jpeg" ? "jpg" : m[2].toLowerCase()}`;
  return srcName.toLowerCase().replace(/\.jpeg$/, ".jpg");
}

function isImageFile(name: string): boolean {
  if (IGNORE_FILES.has(name)) return false;
  if (name.startsWith(".")) return false;
  const ext = extname(name).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg";
}

async function listAlbums(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();
}

async function syncAlbum(
  album: string,
  cache: Cache,
): Promise<{ copied: number; skipped: number; destFiles: Set<string> }> {
  const srcDir = join(PHOTO_SOURCE_DIR, album);
  const destDir = join(DEST_DIR, album);
  await mkdir(destDir, { recursive: true });

  const entries = await readdir(srcDir, { withFileTypes: true });
  let copied = 0;
  let skipped = 0;
  const destFiles = new Set<string>();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!isImageFile(entry.name)) continue;

    const srcPath = join(srcDir, entry.name);
    const destName = destFileName(entry.name);
    const destPath = join(destDir, destName);
    destFiles.add(destName);

    const srcStat = await stat(srcPath);
    const cached = cache[srcPath];

    // Fast path: size + mtime match, dest exists → skip.
    if (
      cached &&
      cached.size === srcStat.size &&
      cached.mtime === srcStat.mtimeMs &&
      existsSync(destPath)
    ) {
      skipped++;
      continue;
    }

    // Slow path: hash to confirm whether contents actually changed.
    const hash = await hashFile(srcPath);
    if (cached && cached.hash === hash && existsSync(destPath)) {
      // Same content, different mtime (e.g. a touch). Refresh cache, skip copy.
      cache[srcPath] = { hash, size: srcStat.size, mtime: srcStat.mtimeMs };
      skipped++;
      continue;
    }

    await copyFile(srcPath, destPath);
    cache[srcPath] = { hash, size: srcStat.size, mtime: srcStat.mtimeMs };
    copied++;
  }

  return { copied, skipped, destFiles };
}

async function findOrphans(album: string, expectedFiles: Set<string>): Promise<string[]> {
  const destDir = join(DEST_DIR, album);
  if (!existsSync(destDir)) return [];
  const entries = await readdir(destDir);
  return entries.filter((name) => !expectedFiles.has(name));
}

async function main() {
  console.log(`📷 Syncing photos from ${PHOTO_SOURCE_DIR}`);
  console.log(`   → ${DEST_DIR}\n`);

  if (!existsSync(PHOTO_SOURCE_DIR)) {
    console.error(`❌ Source directory does not exist: ${PHOTO_SOURCE_DIR}`);
    process.exit(1);
  }

  console.log(
    "ℹ️  Note: if `astro dev` is running, bulk file changes in src/assets/ may trigger HMR thrash.\n",
  );

  const cache = await loadCache();
  let albums = await listAlbums(PHOTO_SOURCE_DIR);
  if (ALBUMS_FILTER) {
    albums = albums.filter((a) => ALBUMS_FILTER.has(a));
    console.log(`Filter active: syncing only ${albums.join(", ")}\n`);
  }
  console.log(`${albums.length} albums to sync.\n`);

  let totalCopied = 0;
  let totalSkipped = 0;
  const orphansByAlbum: Record<string, string[]> = {};

  for (const album of albums) {
    const { copied, skipped, destFiles } = await syncAlbum(album, cache);
    totalCopied += copied;
    totalSkipped += skipped;
    const orphans = await findOrphans(album, destFiles);
    if (orphans.length > 0) {
      orphansByAlbum[album] = orphans;
    }
    const orphanStr = orphans.length > 0 ? `, ${orphans.length} orphaned` : "";
    console.log(`  📁 ${album}: ${copied} copied, ${skipped} unchanged${orphanStr}`);
  }

  await saveCache(cache);

  console.log(`\n✅ Sync complete: ${totalCopied} copied, ${totalSkipped} unchanged`);

  if (Object.keys(orphansByAlbum).length > 0) {
    console.log(`\n🗑️  Orphaned files (in dest but not in source):`);
    for (const [album, files] of Object.entries(orphansByAlbum)) {
      console.log(`  ${album}/`);
      for (const f of files) console.log(`    - ${f}`);
    }
    if (PRUNE) {
      if (!PRUNE_CONFIRM) {
        console.log(`\n⚠️  --prune given without --prune-confirm. No files deleted.`);
        console.log(`   Re-run with --prune --prune-confirm to actually delete.`);
      } else {
        let pruned = 0;
        for (const [album, files] of Object.entries(orphansByAlbum)) {
          for (const f of files) {
            await unlink(join(DEST_DIR, album, f));
            pruned++;
          }
        }
        console.log(`\n🗑️  Pruned ${pruned} orphaned files.`);
      }
    } else {
      console.log(`\n(Use --prune --prune-confirm to delete orphans.)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
