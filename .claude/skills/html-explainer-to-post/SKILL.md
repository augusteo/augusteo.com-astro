---
name: html-explainer-to-post
description: DEPRECATED stub. Routes to the merged explainer-authoring skill in HTML-import mode. Triggers preserved for harness-routing safety include "convert this html to a post", "import this explainer", and any path to vision_*.html / *_explainer.html.
---

# DEPRECATED — use `explainer-authoring`

This skill has been merged into `explainer-authoring`. The new skill auto-detects HTML-import mode when Vic's message contains a path to a `*.html` file (anywhere in the message), and runs the full pipeline: HTML conversion → fact-check → claim-source matrix → three codex gates → playwright review → ship.

**If you reach this skill, immediately invoke `explainer-authoring` instead** and pass the same HTML path. Do not run any conversion logic from this stub — the merged skill's `html-import.md` companion is the canonical playbook.

```
Skill tool: explainer-authoring
args: <pass Vic's original message verbatim, including the HTML path>
```

The merged skill is at `.claude/skills/explainer-authoring/`. The HTML-conversion playbook is `.claude/skills/explainer-authoring/html-import.md`.
