.PHONY: help dev build preview sync sync-force sync-clean watch install install-hooks clean texture

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  dev      Start dev server with content sync + file watching"
	@echo "  preview  Preview production build"
	@echo ""
	@echo "Build:"
	@echo "  build    Build for production"
	@echo ""
	@echo "Content:"
	@echo "  sync        Incremental sync from Obsidian to Astro"
	@echo "  sync-force  Force full sync, ignoring cache"
	@echo "  sync-clean  Clear sync cache"
	@echo "  watch       Watch Obsidian folders for changes"
	@echo ""
	@echo "Utilities:"
	@echo "  install        Install dependencies"
	@echo "  install-hooks  Point git at .githooks/ (pre-push runs astro build)"
	@echo "  clean          Remove build artifacts and sync cache"
	@echo "  texture        Generate noise texture"

dev:
	bun run dev

build:
	bun run build

preview:
	bun run preview

sync:
	bun run sync

sync-force:
	bun run sync:force

sync-clean:
	rm -f .sync-cache.json
	@echo "Sync cache cleared"

watch:
	bun run watch:content

install:
	bun install

install-hooks:
	@current=$$(git config --get core.hooksPath || true); \
	if [ -n "$$current" ] && [ "$$current" != ".githooks" ]; then \
	  echo "✗ core.hooksPath is already set to '$$current'."; \
	  echo "  Run 'git config --unset core.hooksPath' first, or set it to .githooks manually."; \
	  exit 1; \
	fi
	git config core.hooksPath .githooks
	@echo "✓ git hooks now point at .githooks/ (pre-push runs astro build)"

clean:
	rm -rf dist .sync-cache.json

texture:
	bun scripts/generate-noise-texture.js
