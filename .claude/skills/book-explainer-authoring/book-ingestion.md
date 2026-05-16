# Book ingestion

How Phase 1 turns a book file into a chapter-structured **book-source ledger** plus a candidate claim list. The ledger is the load-bearing artifact for faithfulness — every claim, quote, and paraphrase the post makes must anchor back to a ledger entry. If a chunk of text has no ledger entry, it cannot ship in the post.

This file covers:

1. The ledger schema (JSONL format, one entry per line).
2. Toolchain choices per input format (EPUB / PDF / MOBI / plain text).
3. Edition metadata capture.
4. Chapter structure extraction.
5. Claim candidate extraction.
6. OCR confidence handling (PDF inputs).
7. Footnote / endnote linking.
8. Fair-use excerpt bounds (copyright safety).
9. Output structure (the two files Phase 1 writes).

## The ledger schema

`notes/<book-slug>.ledger.jsonl` is a JSON-Lines file. One entry per line. The first entry is always the book metadata (id `0`); subsequent entries are chapters, claims, quotes, paraphrases, and endnotes.

```jsonc
// Entry 0: book metadata (always id 0)
{
  "id": 0,
  "kind": "book",
  "title": "The Scout Mindset: Why Some People See Things Clearly and Others Don't",
  "author": "Julia Galef",
  "edition": "First Edition",
  "isbn": "978-0735217553",
  "year": 2021,
  "publisher": "Portfolio",
  "source_format": "epub",
  "source_path": "/Users/vic/Downloads/scout-mindset.epub",
  "source_sha256": "a3f5...",
  "ingested_at": "2026-05-15T14:32:00Z"
}

// Entry N: chapter
{
  "id": 12,
  "kind": "chapter",
  "chapter_number": 3,
  "chapter_title": "Two types of confidence",
  "start_locator": { "chapter": 3, "section": null, "paragraph": 1 },
  "end_locator":   { "chapter": 3, "section": null, "paragraph": 47 }
}

// Entry N: claim (extracted from a chapter)
{
  "id": 42,
  "kind": "claim",
  "claim": "Calibration training reliably improves probability estimation",
  "locator": { "chapter": 5, "section": 2, "paragraph": 18, "page": 87 },
  "anchor_excerpt": "Studies of weather forecasters and bookmakers find that with focused feedback, people can become well-calibrated within a few weeks of practice.",
  "source_quality": "cited-single-study",
  "ocr_confidence": null
}

// Entry N: direct quote (used in the post via [L#42])
{
  "id": 73,
  "kind": "direct-quote",
  "quote": "The scout's job is not to attack or defend. The scout's job is to understand.",
  "locator": { "chapter": 1, "section": 3, "paragraph": 4, "page": 22 },
  "anchor_excerpt": "The scout's job is not to attack or defend. The scout's job is to understand.",
  "word_count": 16
}

// Entry N: paraphrase (used in the post via [L#42])
{
  "id": 104,
  "kind": "paraphrase",
  "paraphrase": "Galef contrasts the soldier's defensive reasoning with the scout's truth-seeking",
  "locator": { "chapter": 1, "section": null, "paragraph": 12, "page": null },
  "anchor_excerpt": "Where soldiers fight to defend their existing beliefs, scouts look for what's actually true, even if it costs them"
}

// Entry N: endnote
{
  "id": 198,
  "kind": "endnote",
  "endnote_number": 14,
  "referencing_locator": { "chapter": 5, "section": 2, "paragraph": 18 },
  "endnote_text": "Murphy & Winkler (1977) on weather-forecaster calibration; see also Lichtenstein et al. (1982) for the experimental setup",
  "external_references": [
    "Murphy, A. H., & Winkler, R. L. (1977). Reliability of subjective probability forecasts of precipitation and temperature. Applied Statistics, 26(1), 41-47.",
    "Lichtenstein, S., Fischhoff, B., & Phillips, L. D. (1982). Calibration of probabilities: The state of the art to 1980."
  ]
}

// Entry N: figure caption (used in the post via [L#42] on figure captions)
{
  "id": 211,
  "kind": "figure-caption",
  "concept": "The scout vs. soldier mindset",
  "anchor_excerpt": "...the scout's job is to understand the territory, not defend a position...",
  "locator": { "chapter": 1, "section": 3, "paragraph": 4 }
}
```

**Rules:**

- `id` is monotonically increasing per file. Once assigned, never reuse.
- `anchor_excerpt` is ≤ 50 words. Its purpose is grep-verifiability: Phase 7's ledger-integrity check greps the source for the anchor excerpt to confirm the entry is still pointing at the right place.
- `quote` (for `direct-quote`) ≤ 50 words. **Prefer paraphrase if a passage exceeds 50 words.** Don't split a long quote across multiple `direct-quote` entries to defeat the cap — that satisfies the per-entry rule but violates fair-use posture in aggregate. Split only when each fragment is independently load-bearing in the post.
- `word_count` on `direct-quote` enforces the fair-use cap (see below).
- `source_quality` is required on `kind: claim` entries. Values: `cited-RCT` / `cited-single-study` / `cited-meta-analysis` / `cited-replicated-body` / `expert-quote` / `anecdote` / `personal-experience` / `assertion`. The matrix's Source-quality column reads from this field; if a Phase 1 claim is created before the source quality can be determined, set `source_quality: "unknown"` and Phase 2 must upgrade it before Gate B.
- `paraphrase` text is the post's wording; `anchor_excerpt` is the book's wording. They differ.
- `locator.page` is `null` when the source format doesn't preserve page numbers (most EPUBs); the chapter/section/paragraph anchor is canonical.
- `ocr_confidence` is `null` unless OCR was used on a PDF.

## Toolchain by input format

The skill picks the toolchain at run time based on what's available on the host. The agent uses Bash to invoke whichever tools are installed. Prefer the simpler tool when it suffices.

### EPUB

```bash
# Option A: pandoc (preferred — preserves heading hierarchy + footnote markers).
pandoc input.epub -t plain --wrap=preserve -o /tmp/<slug>.txt
pandoc input.epub --extract-media=/tmp/<slug>-media -t markdown -o /tmp/<slug>.md

# Option B: epub2txt (fallback if pandoc unavailable).
epub2txt input.epub > /tmp/<slug>.txt
```

EPUBs are XHTML under a zip; pandoc resolves chapter breaks and TOC reliably. To confirm chapter count independently, locate the EPUB's package file via `META-INF/container.xml` (which is at a fixed path), then use the `<rootfile>` href to find `content.opf`, and read the spine + manifest from there:

```bash
# Step 1: find content.opf path (varies across EPUBs — OEBPS/, OPS/, root, etc.)
OPF_PATH=$(unzip -p input.epub META-INF/container.xml | \
  rg -oP 'full-path="\K[^"]+' | head -1)

# Step 2: count chapters from the spine
unzip -p input.epub "$OPF_PATH" | rg -c '<itemref'

# Step 3 (optional): find toc.ncx via the manifest, then count navPoints
NCX_PATH=$(dirname "$OPF_PATH")/$(unzip -p input.epub "$OPF_PATH" | \
  rg -oP 'href="\K[^"]+\.ncx' | head -1)
unzip -p input.epub "$NCX_PATH" 2>/dev/null | grep -c '<navPoint' || echo "no NCX"
```

Don't assume `OEBPS/content.opf` — many EPUBs put the package at `OPS/content.opf` or at the zip root. The container.xml lookup is the only reliable starting point.

### PDF (text-extractable)

```bash
# Option A: pdftotext with -layout to preserve column structure.
pdftotext -layout input.pdf /tmp/<slug>.txt

# Option B: pdfplumber for richer extraction (tables, footnotes).
python3 - <<'PY'
import pdfplumber
with pdfplumber.open("input.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        print(f"--- PAGE {i+1} ---")
        print(page.extract_text())
PY
```

### PDF (scanned / OCR needed)

OCR confidence extraction is best-effort and toolchain-dependent. `ocrmypdf`'s `--sidecar` produces a plain-text transcript, NOT per-page confidence scores. To get per-page confidence:

```bash
# Option A (preferred when tesseract is available directly): run tesseract per
# page with hOCR output, which contains x_wconf attributes for word-level
# confidence. Pull pages out of the PDF first.
pdftoppm -r 300 input.pdf /tmp/<slug>-page -png
for page in /tmp/<slug>-page-*.png; do
  page_num=$(basename "$page" | rg -oP '\d+')
  tesseract "$page" - -c tessedit_create_hocr=1 hocr 2>/dev/null > \
    /tmp/<slug>-page-${page_num}.hocr
done
# Extract per-page mean word confidence:
for hocr in /tmp/<slug>-page-*.hocr; do
  page_num=$(basename "$hocr" | rg -oP '\d+')
  confs=$(rg -oP 'x_wconf \K\d+' "$hocr")
  if [ -n "$confs" ]; then
    mean=$(echo "$confs" | awk '{s+=$1; n++} END {if(n>0) print s/n/100; else print 0}')
    echo "page $page_num: $mean"
  fi
done

# Option B (when only ocrmypdf is available): use ocrmypdf, accept that
# confidence is unavailable, and treat the whole document as confidence=null.
# The candidate claim list then proceeds without per-page exclusion. Phase 2
# fact-checking still catches the bad claims (anchor mismatch via Gate B).
ocrmypdf --output-type pdf input.pdf /tmp/<slug>.ocr.pdf
```

If Option A is unavailable AND OCR was needed (i.e., the PDF has no text layer), the agent halts and asks Vic whether to proceed without confidence scoring or to install `tesseract` first (`brew install tesseract` on macOS).

Pages with mean word confidence < 0.85 are flagged; their claims get `ocr_confidence: <value>` in the ledger AND are excluded from the candidate claim list. If > 20% of pages are below threshold, halt and ask Vic for a higher-quality source.

### MOBI

```bash
# Option A: convert via calibre's ebook-convert.
ebook-convert input.mobi /tmp/<slug>.epub
# Then process as EPUB above.

# Option B: kindleunpack (advanced).
kindleunpack input.mobi /tmp/<slug>-mobi/
```

MOBI ingestion always routes through EPUB (calibre converts losslessly). Don't ingest MOBI directly.

### Plain text

```bash
# Direct read. Chapter detection by heading pattern (## or CHAPTER N).
cat input.txt | rg -n '^(## |CHAPTER )' > /tmp/<slug>.toc.txt
```

Plain text loses footnote/endnote structure; the ingestion will note this in the spec ("source-format: txt; endnote linkage may be incomplete").

### Toolchain detection

At ingestion start, the agent detects available tools. CLI tools use `command -v`; Python packages (pdfplumber) need a Python import check:

```bash
# CLI tools
for tool in pandoc pdftotext ocrmypdf ebook-convert epub2txt; do
  command -v "$tool" >/dev/null 2>&1 && echo "$tool: yes" || echo "$tool: no"
done

# pdfplumber is a Python package, not a CLI — detect via import
python3 -c "import pdfplumber" 2>/dev/null && echo "pdfplumber: yes" || echo "pdfplumber: no"
```

If a required tool is missing for the input format, halt and ask Vic to install it. On macOS:

```bash
# pandoc: text conversion
# poppler: provides pdftotext (NOT poppler-utils on macOS Homebrew)
# ocrmypdf: PDF OCR
# calibre: provides ebook-convert (MOBI → EPUB fallback)
brew install pandoc poppler ocrmypdf calibre

# pdfplumber is Python-only
python3 -m pip install pdfplumber
```

On Linux/Debian the package is `poppler-utils`; on macOS Homebrew it is `poppler`. The agent should detect the platform (`uname -s`) and suggest the right command.

## Edition metadata capture

Captured once, stored as ledger entry id `0`. Sources by format:

- **EPUB**: `unzip -p input.epub OEBPS/content.opf | rg '<dc:title|<dc:creator|<dc:identifier|<dc:date|<dc:publisher'` — pulls Dublin Core metadata.
- **PDF**: `pdfinfo input.pdf` — pulls title / author / creation date. Edition is often missing; ask Vic if not detected.
- **MOBI**: converted to EPUB, then EPUB extraction.
- **Plain text**: ask Vic for title / author / edition / ISBN.

Edition matters because citations and pagination shift between editions. The ledger records the specific edition the post is anchored to.

## Chapter structure extraction

For each format:

1. Identify chapter boundaries (TOC for EPUB; outline / bookmarks for PDF; heading regex for plain text).
2. For each chapter, record `chapter_number`, `chapter_title`, `start_locator`, `end_locator`.
3. Write one `kind: chapter` entry per chapter, in order.

If chapter detection fails (TOC missing, no clear heading pattern), halt and ask Vic to confirm chapter count + provide a heading regex.

## Claim candidate extraction

Per-chapter pass to identify candidate claims. The agent reads each chapter and extracts claims following these heuristics:

1. **One claim per major assertion** the book makes. Major = the chapter would lose its point without it.
2. **Skip claims that are pure summary / setup** ("In this chapter, I'll argue that..."). Look for the actual asserted thing.
3. **Empirical claims first**: cited studies, statistics, "research shows that X". These get top priority.
4. **Conceptual / framework claims** the book returns to repeatedly. E.g., the scout / soldier framing in The Scout Mindset.
5. **Practical / action claims** the book explicitly recommends ("you should X" or "people who do X get Y").
6. **Anecdotes promoted to claims** ONLY if the book itself treats them as load-bearing evidence — not if they're illustrative.
7. **Each candidate gets**: the claim text (in the agent's words, faithful), the locator (chapter/section/paragraph), the anchor excerpt (the book's literal sentence the claim derives from), and an initial `kind: claim` ledger entry.

After the per-chapter sweep, synthesize the **major claim list** (5–12 entries) — these become the sections in the final post. Use `claim-spine.md`'s criteria for promotion to major.

## OCR confidence handling

See "PDF (scanned / OCR needed)" above for the concrete extraction commands. Summary:

- Per-page confidence comes from tesseract's `x_wconf` attributes in hOCR output, NOT from `ocrmypdf` (which doesn't expose per-page confidence in a usable form).
- If tesseract is unavailable AND OCR was required, the agent halts and asks Vic before proceeding (option to install tesseract, option to accept ocrmypdf without confidence scoring).
- Pages with mean word confidence < 0.85 are flagged. Claims from flagged pages get `ocr_confidence: <value>` in the ledger AND are excluded from the candidate claim list.
- If > 20% of pages are below threshold, halt and ask Vic for a higher-quality source — bad OCR fabricates claims silently.
- Re-OCR with `--redo-ocr --oversample 600` may help when ocrmypdf is in use; try this once before halting.

## Footnote / endnote linking

Books often put their real citations in endnotes, detached from the prose. The ingestion preserves the link:

1. Detect footnote / endnote markers in the prose (`[14]`, `*`, `†`, superscript numbers).
2. For each marker, find the corresponding note (usually in a notes section at end-of-chapter or end-of-book).
3. Write a `kind: endnote` ledger entry with `referencing_locator` pointing back to the prose location.
4. Parse the endnote text for external references (e.g., "Smith 2019" → "Smith, J. (2019). Title. Journal, 12(3), 45-67.").
5. External references in endnotes become inputs to the Phase 2 evidence-check (these are what the book itself claims as source).

If the book lacks endnotes / footnotes (a stylistic choice in some pop-science books), note this in the spec: "source-quality-inside-the-book defaults to `assertion` for unsourced claims".

## Fair-use excerpt bounds

Copyright safety:

- **Per-quote cap**: ≤ 50 words for `kind: direct-quote` entries. `word_count` is enforced.
- **Per-chapter cap**: ≤ 200 words of total direct quotation across all `direct-quote` entries with that locator's chapter.
- **Anchor excerpts**: ≤ 50 words, used for grep-verifiability only. They live in the ledger but are NOT rendered to the post unless they also appear as a `direct-quote` entry.
- **No large copied chunks**: never store full paragraphs / pages of the book in the ledger. The locator + short anchor is enough.

If a passage genuinely needs more than 50 words quoted to be faithful, split it into multiple sequential `direct-quote` entries OR rewrite as a paraphrase with the anchor excerpt covering the relevant sentence.

The MDX itself is also bounded: total direct quotation across the post must respect fair use. Phase 7's Gate D includes a quotation-budget check.

## Output structure (what Phase 1 writes)

```
notes/<book-slug>.md                  # text notes file with sections:
                                      #   ## Spec
                                      #   ## Chapter summaries
                                      #   ## Candidate claim list
                                      #   ## Boundary conditions
                                      #   ## Resume here
notes/<book-slug>.ledger.jsonl        # the book-source ledger
notes/<book-slug>.ingestion-preview.md  # written ONLY if Gate A surfaces low-confidence
```

The ledger and the notes file are co-equal artifacts. The ledger is the machine-readable source of truth (for Codex gates, for grep verification). The notes file is the human-readable working state (for Vic to scan).

## Halt conditions

- Required tool missing for the input format.
- OCR confidence below threshold on > 20% of pages.
- Chapter detection fails (no TOC, no clear heading pattern).
- Edition metadata not detectable AND Vic hasn't supplied it.
- Candidate claim list has fewer than 3 viable claims after the per-chapter sweep (the book is too thin to warrant a long-form post).
- Source file SHA-256 changes between ingestion start and end (file was modified mid-run; restart).
