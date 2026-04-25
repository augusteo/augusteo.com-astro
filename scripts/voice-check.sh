#!/usr/bin/env bash
# Voice rules grep for any text file Vic intends to publish.
# Implements the full banned-word and punctuation list from
# .claude/skills/interactive-explainer/voice-rules.md.
#
# Usage:  scripts/voice-check.sh <file> [<file>...]
# Exit:   non-zero if any banned hit is found in any file.
#
# Notes:
# - The list is intentionally aggressive. False positives in technical
#   prose are expected (e.g. "robust statistics" is a real term). When you
#   hit a justified case, leave a one-line comment in the source explaining
#   why and re-run; the grep does not auto-skip comments, so spelling the
#   exception once means it'll only show up in your manual review.
# - Word boundaries (\b) prevent matching inside code identifiers like
#   `forge_robust_estimator`. Hyphenated forms (e.g. "cutting-edge") are
#   matched literally.

set -uo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: $0 <file> [<file>...]" >&2
  exit 2
fi

# Em dash detector. Em dash is U+2014 (—). En dash U+2013 (–) is fine for
# numeric ranges and stays untouched.
EM_DASH=$'\xe2\x80\x94'

# Banned word stems. Grouped by category for grep readability.
# Word-boundary-anchored, case-insensitive.
BANNED_VERBS='\b(delve|leverage|leverages|leveraged|leveraging|utilize|utilizes|utilized|utilizing|foster|fosters|fostered|fostering|embark|embarks|embarked|embarking|underscore|underscores|underscored|underscoring|showcase|showcases|showcased|showcasing|harness|harnesses|harnessed|harnessing|facilitate|facilitates|facilitated|facilitating|streamline|streamlines|streamlined|streamlining|garner|garners|garnered|garnering|spearhead|spearheads|spearheaded|spearheading|bolster|bolsters|bolstered|bolstering)\b'

BANNED_ADJECTIVES='\b(crucial|vital|pivotal|robust|comprehensive|multifaceted|intricate|seamless|seamlessly|holistic|meticulous|meticulously|vibrant|profound|profoundly|enduring|invaluable|paramount|transformative|innovative|groundbreaking|bespoke|tailored)\b|\bcutting-edge\b'

BANNED_NOUNS='\b(tapestry|realm|realms|testament|cornerstone|hallmark|symphony)\b'

BANNED_FIGURATIVE='\b(landscape\s+of|landscape\s+is|evolving\s+landscape|journey\s+of|journey\s+to|navigate\s+the|navigate\s+complex|unlock\s+the|unlock\s+potential|elevate\s+(your|the|our)|ecosystem\s+of)\b'

BANNED_TRANSITIONS='(^|\.\s+|\n\s*)(Furthermore|Moreover|Additionally|In\s+conclusion|In\s+summary|Ultimately)\b'

BANNED_FILLERS='(it\s+is\s+worth\s+noting|it\s+is\s+important\s+to\s+note|that\s+said,|indeed,)'

BANNED_STOCK='(in\s+today.s\s+(fast.paced|rapidly.evolving)|in\s+the\s+ever.evolving|at\s+its\s+core,|when\s+it\s+comes\s+to|in\s+the\s+realm\s+of|plays\s+a\s+(key|pivotal)\s+role|stands\s+as\s+a\s+testament|a\s+rich\s+tapestry|navigate\s+the\s+complexities|unlock\s+the\s+potential|take\s+a\s+deep\s+dive|at\s+the\s+end\s+of\s+the\s+day|the\s+beauty\s+of\s+\S+\s+lies\s+in)'

# Combined banned-word regex.
BANNED_RE="${BANNED_VERBS}|${BANNED_ADJECTIVES}|${BANNED_NOUNS}|${BANNED_FIGURATIVE}|${BANNED_TRANSITIONS}|${BANNED_FILLERS}|${BANNED_STOCK}"

exit_code=0

for f in "$@"; do
  if [[ ! -f "$f" ]]; then
    echo "voice-check: not a file: $f" >&2
    exit_code=2
    continue
  fi

  hit=0

  # Em dash check.
  if grep -nF "$EM_DASH" "$f" >/dev/null 2>&1; then
    echo "==> em dashes in $f:"
    grep -nF "$EM_DASH" "$f"
    hit=1
  fi

  # Banned words / patterns.
  if grep -niEn "$BANNED_RE" "$f" >/dev/null 2>&1; then
    echo "==> banned words/patterns in $f:"
    grep -niE "$BANNED_RE" "$f"
    hit=1
  fi

  # Curly quotes (a smaller AI tell, but on the list).
  if grep -nP '[\x{201C}\x{201D}\x{2018}\x{2019}]' "$f" >/dev/null 2>&1; then
    echo "==> curly quotes in $f (use straight quotes):"
    grep -nP '[\x{201C}\x{201D}\x{2018}\x{2019}]' "$f"
    hit=1
  fi

  if [[ $hit -eq 0 ]]; then
    echo "voice-check OK: $f"
  else
    exit_code=1
  fi
done

exit $exit_code
