---
name: experiment-design
description: Design a structured experiment with clear test cases and success criteria. Use after /tech-scout or when you know what to test.
---

# Experiment Design Skill

Design a structured experiment with clear test cases, baselines, and success criteria.

**Experiments location**: `~/dev/experiments/[name]/`
**Experiments repo**: https://github.com/augusteo/experiments

## When to Use

- After `/tech-scout` identified test cases
- "Let's design an experiment for [technology]"
- "How should I test [specific capability]?"
- "Plan the test structure for [feature]"

## Phase 1: Gather Context

If coming from `/tech-scout`:
- Read `~/dev/experiments/[experiment-name]/scout.md`
- Review the recommended test cases
- Confirm which ones to pursue

If starting fresh:
- Ask what technology/capability to test
- Ask what the hypothesis is
- Ask what would count as success
- Establish the experiment name (kebab-case)

## Phase 2: Define Experiment Structure

### Hypothesis
State what you expect to find. Be specific:
- BAD: "The new model is better"
- GOOD: "Gemini 3 Flash with code execution will correctly count objects in 8/10 images where the base model fails"

### Test Cases
For each test case, define:
1. **Name**: Short, descriptive
2. **Input**: Exactly what will be fed to the system
3. **Expected output**: What success looks like
4. **Failure mode**: What failure looks like
5. **Baseline**: What to compare against (old model, no feature, competitor)

### Input Dataset
Specify exactly what inputs are needed:
- File types and quantities
- Where to source them (create, download, screenshot)
- Any preprocessing required

For each input, clarify who provides it:
- **Claude can generate**: code, synthetic data, API calls
- **Claude can download**: public images, datasets, files from URLs
- **Victor must provide**: proprietary data, API keys, specific files

**Action items for Victor** (list explicitly):
- [ ] [Specific thing to provide]

**Action items for Claude** (in experiment-run):
- [ ] [What Claude will generate/download]

### Success Criteria
Quantifiable metrics:
- Accuracy percentage
- Pass/fail counts
- Comparison delta vs. baseline

## Phase 3: Plan Code Architecture

Define what code needs to be written:
- API calls required
- Input/output handling
- Result storage format
- Any visualization needed

## Phase 3: Create Experiment Structure

Before writing design.md, ensure the folder structure exists:

```bash
mkdir -p ~/dev/experiments/[experiment-name]/{code,inputs,outputs/raw,outputs/screenshots}
touch ~/dev/experiments/[experiment-name]/.env
```

Then create `design.md` and the initial Python script.

## Output Format

Write to `~/dev/experiments/[experiment-name]/design.md`:

```markdown
## Experiment: [Name]

**Date**: YYYY-MM-DD
**Technology**: [What's being tested]
**Location**: ~/dev/experiments/[experiment-name]/

### Hypothesis

[One clear statement of what you expect to find]

### Test Cases

| # | Test Case | Input | Expected | Baseline |
|---|-----------|-------|----------|----------|
| 1 | [Name] | [Description] | [Pass criteria] | [Comparison] |
| 2 | ... | ... | ... | ... |

### Detailed Test Definitions

#### Test 1: [Name]

**Input**: [Specific file or input description]
**Process**: [What to do with it]
**Success**: [Exact criteria]
**Failure**: [What failure looks like]
**Baseline**: [What to compare against]

#### Test 2: [Name]
...

### Input Dataset

| File | Source | Purpose |
|------|--------|---------|
| [filename] | [where to get it] | [which test] |

### Success Criteria

- [ ] [Metric 1]: [Target]
- [ ] [Metric 2]: [Target]
- Overall: [Summary threshold]

### Code Plan

**Files to create:**
- `code/run_experiment.py` - Main experiment runner
- `code/api_client.py` - API wrapper (if needed)

**API calls:**
- [Endpoint]: [Purpose]

**Output format:**
- Save responses to `outputs/[test_name]_response.json`
- Save any images to `outputs/[test_name]_result.png`

### Environment Setup

```bash
# Required in .env
API_KEY=your_key_here
```

**Dependencies:**
```
requests
python-dotenv
[other packages]
```

**How to determine dependencies:**
- Check API client library docs (e.g., `google-generativeai` for Gemini)
- Always include: `python-dotenv` for environment variables
- For image handling: `Pillow`
- For API calls: `requests` (if not using official client)
- For data manipulation: `pandas` (if processing results)

### Next Step

Run `/experiment-run` to execute this experiment.
```

## Files Created

This skill creates:
- `~/dev/experiments/[experiment-name]/design.md` - The experiment plan
- `~/dev/experiments/[experiment-name]/.env` - Template for API keys
- Folder structure: `code/`, `inputs/`, `outputs/raw/`, `outputs/screenshots/`

## Folder Structure

Experiments live in `~/dev/experiments/`:

```
~/dev/experiments/[experiment-name]/
├── design.md           # This document
├── results.md          # Created by experiment-run
├── code/
│   └── run_experiment.py
├── inputs/
│   └── [test files]
├── outputs/
│   └── [results]
└── .env                # API keys (gitignored)
```

## Quality Checklist

Before delivering:
- [ ] Hypothesis is specific and falsifiable
- [ ] Each test case has clear pass/fail criteria
- [ ] Baseline comparison is defined
- [ ] Input dataset is specific (not vague)
- [ ] Success criteria are quantifiable
- [ ] Code plan covers all test cases
- [ ] Environment requirements are listed
