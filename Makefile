.PHONY: help dev build preview sync watch install clean texture

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
	@echo "  sync     One-time sync from Obsidian to Astro"
	@echo "  watch    Watch Obsidian folders for changes"
	@echo ""
	@echo "Utilities:"
	@echo "  install  Install dependencies"
	@echo "  clean    Remove build artifacts"
	@echo "  texture  Generate noise texture"

dev:
	bun run dev

build:
	bun run build

preview:
	bun run preview

sync:
	bun run sync

watch:
	bun run watch:content

install:
	bun install

clean:
	rm -rf dist

texture:
	bun scripts/generate-noise-texture.js
