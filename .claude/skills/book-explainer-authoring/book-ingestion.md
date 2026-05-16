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

EPUBs are zips of XHTML. The skill has **three** extraction options. **Option C (direct unzip + XHTML parse) is the recommended default** — it needs no Homebrew installs, preserves print page numbers via embedded pagebreak markers, and gives the agent direct control over chapter boundaries and footnote linkage. Use Option A / B only when you specifically want plain-text rendering for quick scanning.

#### Option C: direct unzip + XHTML parse (recommended)

Works on any system with `unzip` + `rg` (or `grep`). No installs needed beyond standard Unix tools.

```bash
# Step 1: find the OPF (package file) path via container.xml.
# Path varies across EPUBs — OEBPS/, OPS/, root — so DON'T hardcode "OEBPS/content.opf".
OPF_PATH=$(unzip -p input.epub META-INF/container.xml | \
  rg -oP 'full-path="\K[^"]+' | head -1)
echo "OPF: $OPF_PATH"

# Step 2: read Dublin Core metadata from the OPF.
unzip -p input.epub "$OPF_PATH" | \
  rg '<dc:(title|creator|identifier|date|publisher|rights)' 

# Step 3: read the spine (reading order, in <itemref> form).
unzip -p input.epub "$OPF_PATH" | rg -oP 'idref="\K[^"]+'

# Step 4: read the manifest (each spine id maps to an href).
unzip -p input.epub "$OPF_PATH" | rg '<item '

# Step 5: locate the nav file (EPUB3 TOC) for full chapter titles + print-page list.
# nav.xhtml is the modern TOC + landmark + page-list source. Don't depend on NCX.
NAV_PATH=$(unzip -p input.epub "$OPF_PATH" | \
  rg -oP 'href="\K[^"]+"[^>]*properties="[^"]*nav"' | rg -oP '^[^"]+' | head -1)
# Some EPUBs use uppercase / different attribute order; if the above is empty try:
#   unzip -p input.epub "$OPF_PATH" | rg -oP 'href="\K[^"]+\.xhtml(?=[^>]*nav)' | head -1

# Step 6: extract all spine XHTML to a working directory.
EXTRACT=/tmp/<slug>-extract
rm -rf "$EXTRACT" && mkdir -p "$EXTRACT"
unzip -q input.epub 'OEBPS/*.xhtml' -d "$EXTRACT" 2>/dev/null || \
  unzip -q input.epub 'OPS/*.xhtml' -d "$EXTRACT" 2>/dev/null || \
  unzip -q input.epub '*.xhtml' -d "$EXTRACT"

# Step 7 (optional): SHA-256 the source file. This is the canonical edition fingerprint.
shasum -a 256 input.epub
```

XHTML body files use a small set of stable structural patterns (publisher-conventions vary, but these markers are near-universal):

- `<h1 class="x01-FM-Head">` / `<h2 class="x03-Chapter-Title">` / `<h3 class="x05-Head-A">` — heading hierarchy (the class names are publisher-specific; the `<h1>` / `<h2>` / `<h3>` levels are stable).
- `<p class="x04-Body-Text">` — body paragraphs.
- `<span epub:type="pagebreak" id="page_N"/>` — **print-page markers**. Stable across EPUB3 publishers. Use these to populate `locator.page` in the ledger; they map your locator to citable print pages even though EPUB is reflowable.
- `<a href="..._Notes.xhtml#EndnoteNumberN" id="SuperscriptNumberN"><sup class="endnote">N</sup></a>` — endnote reference in prose. The endnote target is typically a single `_Notes.xhtml` file.
- `<a epub:type="noteref" href="..._Footnote.xhtml#footnote_N" role="doc-noteref">*</a>` — inline-footnote (asterisk-style) reference. Footnotes are often split into individual `_Footnote.xhtml` files, one per footnote.
- `<i>`, `<b>`, `<blockquote>`, inline `<span>` — emphasis and quotes. **These break anchor grep verification under `rg -F` — see "Anchor verification" below.**

#### Option A: pandoc (preserves plain text + heading hierarchy)

```bash
pandoc input.epub -t plain --wrap=preserve -o /tmp/<slug>.txt
pandoc input.epub --extract-media=/tmp/<slug>-media -t markdown -o /tmp/<slug>.md
```

Useful for quick text-scanning. Pandoc strips inline emphasis tags, which means anchors built from pandoc output may not match the raw XHTML — prefer Option C for ledger anchor extraction.

#### Option B: epub2txt (fallback)

```bash
epub2txt input.epub > /tmp/<slug>.txt
```

#### Page-list extraction from nav.xhtml

The nav file's page-list (EPUB3) maps every print page number to a `xhtml#page_N` anchor. This lets you cite by **stable print page numbers** even though EPUB is reflowable. Extract:

```bash
unzip -p input.epub "$NAV_PATH" | \
  rg '<li><a href="[^"]+#page_[^"]+"' | head -20
```

A single sweep of the page-list gives you chapter-to-page-range mapping (group by xhtml filename, min/max page numbers). This is how the Scout Mindset ingestion populated `start_locator.page` and `end_locator.page` for every chapter without OCR or manual page-counting.

#### Chapter-coverage cross-check

Independent verification that your spine extraction matches the TOC:

```bash
# Count items in the spine
SPINE_COUNT=$(unzip -p input.epub "$OPF_PATH" | rg -c '<itemref')
echo "Spine items: $SPINE_COUNT"

# If NCX exists (EPUB2 legacy), count navPoints too
NCX_PATH=$(dirname "$OPF_PATH")/$(unzip -p input.epub "$OPF_PATH" | \
  rg -oP 'href="\K[^"]+\.ncx' | head -1)
unzip -p input.epub "$NCX_PATH" 2>/dev/null | grep -c '<navPoint' || echo "no NCX"
```

Don't assume `OEBPS/content.opf`. Many EPUBs put the package at `OPS/content.opf` (Apple / iBooks convention) or at the zip root (some indie publishers). The container.xml lookup in Step 1 is the only reliable starting point.

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
# CLI tools (none of these are required for EPUB Option C — see below)
for tool in pandoc pdftotext ocrmypdf ebook-convert epub2txt tesseract; do
  command -v "$tool" >/dev/null 2>&1 && echo "$tool: yes" || echo "$tool: no"
done

# pdfplumber is a Python package, not a CLI — detect via import
python3 -c "import pdfplumber" 2>/dev/null && echo "pdfplumber: yes" || echo "pdfplumber: no"
```

**EPUB ingestion has no tool dependency** beyond `unzip` + `rg` (which are universally available). The agent should always be able to ingest an EPUB via Option C without halting for installs. Halt-for-install only applies to:

- **PDF (scanned)**: needs `ocrmypdf` or `tesseract`. Halt if neither is present.
- **MOBI**: needs `ebook-convert` (from calibre). Halt if calibre is missing — though Vic can sometimes convert MOBI → EPUB on another machine and re-supply the file.
- **PDF (text-extractable)**: needs `pdftotext` (from poppler) OR Python `pdfplumber`. Halt if neither is present.

If a required tool is missing for a PDF/MOBI input, halt and ask Vic to install it. On macOS:

```bash
# pandoc: text conversion (optional for EPUB; useful for PDF)
# poppler: provides pdftotext (NOT poppler-utils on macOS Homebrew)
# ocrmypdf: PDF OCR
# tesseract: per-page OCR confidence (needed for scanned PDFs)
# calibre: provides ebook-convert (MOBI → EPUB fallback)
brew install pandoc poppler ocrmypdf tesseract calibre

# pdfplumber is Python-only
python3 -m pip install pdfplumber
```

On Linux/Debian the package is `poppler-utils`; on macOS Homebrew it is `poppler`. The agent should detect the platform (`uname -s`) and suggest the right command.

## Edition metadata capture

Captured once, stored as ledger entry id `0`. Always include `source_sha256` (the SHA-256 of the source file as canonical edition fingerprint — different printings / ebook editions have different hashes; this is the only reliable way to confirm an edition match across runs).

Sources by format:

- **EPUB**: container.xml lookup → OPF → Dublin Core. Do NOT hardcode `OEBPS/content.opf`:
  ```bash
  OPF_PATH=$(unzip -p input.epub META-INF/container.xml | rg -oP 'full-path="\K[^"]+' | head -1)
  unzip -p input.epub "$OPF_PATH" | rg '<dc:(title|creator|identifier|date|publisher|rights)'
  # The OPF also has <meta content="..." name="imprint"/> for publisher imprint.
  shasum -a 256 input.epub
  ```
- **PDF**: `pdfinfo input.pdf` — pulls title / author / creation date. Edition is often missing; ask Vic if not detected. SHA-256 with `shasum -a 256`.
- **MOBI**: converted to EPUB, then EPUB extraction. SHA-256 the ORIGINAL .mobi, not the converted .epub.
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

### Anti-Part-collapse warning

A specific failure mode the skill exists to prevent: when a book is organized into Parts (e.g., five Parts × three chapters), it is tempting to compress claims to one-per-Part instead of one-per-chapter, on the theory that "Part IV is one cohesive theme." **Do NOT do this** unless the book itself treats the Part as a single claim with chapters as sub-claims.

The Scout Mindset Phase 1 caught this exact failure: the agent collapsed Ch 10–12 ("Changing Your Mind") and Ch 13–15 ("Rethinking Identity") into one mega-claim each. Gate A invocation 1 flagged it as `LOW-CONFIDENCE INGESTION` because:

1. The book introduces updating (Ch 10), leaning-into-confusion (Ch 11), and echo-chamber-escape (Ch 12) as three distinct claims with three distinct evidence pools (Tetlock; Darwin/Klein; Bail et al.). Merging them gives Phase 2 a single matrix row covering five-plus separate studies — not evaluable.
2. The book introduces identity-as-barrier (Ch 13), hold-lightly (Ch 14), and scout-identity-flywheel (Ch 15) similarly distinctly (HIV-via-breastmilk; Caplan ITT + AIDS activists; Blackmore / Harris / Buterin).

**Rule**: one candidate claim per body chapter when the book has chapter-distinct claims. The 5–12 candidate count guideline yields to book granularity when they conflict — 15 majors for a 15-chapter book is the correct shape even though it's outside the guideline range. Use the guideline as a sanity check, not a hard cap.

If you find yourself writing a candidate claim whose `claim` text contains the word "and" connecting two distinct empirical findings, ask: would Phase 2's fact-check matrix evaluate these as one row or two? If two, split now.

### Heuristics

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

## Anchor verification: use `rg -F` (fixed strings), not regex

Phase 7's ledger-integrity check verifies each `anchor_excerpt` grep-matches the source XHTML. **Use `rg -F` (fixed-string mode), not default `rg`.** Default `rg` treats the anchor as a regex, which can produce false positives when the source has inline emphasis tags inside what you think is a continuous phrase.

Common failure pattern (encountered on Scout Mindset Phase 1, caught at Gate A invocation 2):

- Anchor: `"competence ratings ... predominantly based on how much social confidence they displayed"` (looks like normal prose).
- Source XHTML: `competence ratings ... predominantly based on how much <i>social confidence</i> they displayed`.
- Default `rg`: appears to match (rg's regex mode treats whitespace/punctuation flexibly enough that the tag-wrapped phrase falsely looks like a hit on some sample-sized greps).
- `rg -F`: fails. No continuous matching string exists in the raw XHTML; the `<i>` tags break it up.

Phase 7's ledger-integrity check uses `rg -F`, so any anchor that only matches under default regex `rg` will fail at ship time. Catching this at Phase 1 (via a `rg -F` sweep at end-of-ingestion) is the only way to avoid surprise Gate D failures later.

### How to pick a clean anchor

1. Read the source XHTML around the locator.
2. Identify a contiguous span of ≥ 8 words that contains NO inline tags (`<i>`, `<b>`, `<span>`, `<a>`, `<blockquote>`).
3. Quote that span verbatim, preserving curly quotes (U+2019 right single quotation mark `’`, U+201C / U+201D curly double quotes `“`/`”`, em-dashes `—` U+2014).
4. Verify with `rg -F -l "<anchor>" /tmp/<slug>-extract/OEBPS/xhtml/` — should return exactly one file.

If the locator paragraph has italics in the middle, look for an adjacent sentence in the same paragraph or section that does NOT cross a tag boundary. The anchor doesn't have to be the most quotable sentence; it has to be a uniquely-locating, tag-free fragment.

### Phase 1 anchor sweep (end-of-ingestion verification)

Before declaring Phase 1 done, sweep every claim anchor against the source under `rg -F`:

```bash
jq -r 'select(.kind=="claim") | "\(.id)\t\(.anchor_excerpt)"' \
  notes/<slug>.ledger.jsonl | while IFS=$'\t' read -r id anchor; do
    count=$(rg -F -l "$anchor" /tmp/<slug>-extract/OEBPS/xhtml/ 2>/dev/null | wc -l | tr -d ' ')
    printf "  id %s: [%s match]\n" "$id" "$count"
  done
```

Every row should print `[1 match]`. Any `[0 match]` is a STRUCTURAL Phase 1 defect that must be fixed before Gate A. Any `[2+ match]` means the anchor isn't specific enough — pick a longer or more distinctive fragment.

This sweep is cheap (sub-second) and catches the rg -F gotcha early.

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
