import { watch } from "chokidar";
import { spawn, ChildProcess } from "child_process";
import path from "path";
import { CONFIG } from "./config.js";

let syncProcess: ChildProcess | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const DEBOUNCE_MS = 500;

function runSync(): void {
  // Cancel any pending sync
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Kill any running sync process
  if (syncProcess) {
    syncProcess.kill();
    syncProcess = null;
  }

  debounceTimer = setTimeout(() => {
    console.log("\n🔄 Changes detected, syncing...");

    syncProcess = spawn("bun", ["scripts/sync-content.ts"], {
      stdio: "inherit",
      shell: true,
    });

    syncProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Sync complete\n");
      } else {
        console.error(`❌ Sync failed with code ${code}\n`);
      }
      syncProcess = null;
    });
  }, DEBOUNCE_MS);
}

function startWatching(): void {
  console.log("\n👀 Watching for changes...\n");
  console.log(`   📁 ${CONFIG.obsidianPublished}`);
  console.log(`   📁 ${CONFIG.obsidianDrafts}`);
  console.log(`   📁 ${CONFIG.obsidianFiles}\n`);
  console.log("Press Ctrl+C to stop\n");

  // Watch for markdown file changes in published and drafts folders
  const mdWatcher = watch([
    path.join(CONFIG.obsidianPublished, "**/*.md"),
    path.join(CONFIG.obsidianDrafts, "**/*.md"),
  ], {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  // Watch for image changes in Files folder
  const imageWatcher = watch(
    path.join(CONFIG.obsidianFiles, "**/*.{jpg,jpeg,png,gif,webp,svg}"),
    {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    }
  );

  const handleChange = (event: string) => (filePath: string) => {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`📝 ${event}: ${relativePath}`);
    runSync();
  };

  mdWatcher
    .on("add", handleChange("Added"))
    .on("change", handleChange("Changed"))
    .on("unlink", handleChange("Deleted"));

  imageWatcher
    .on("add", handleChange("Image added"))
    .on("change", handleChange("Image changed"))
    .on("unlink", handleChange("Image deleted"));

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n\n👋 Stopping watcher...");
    mdWatcher.close();
    imageWatcher.close();
    if (syncProcess) {
      syncProcess.kill();
    }
    process.exit(0);
  });
}

startWatching();
