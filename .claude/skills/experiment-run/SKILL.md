---
name: experiment-run
description: Execute an experiment, capture results, and document findings. Use after /experiment-design.
---

# Experiment Run Skill

Execute the experiment, capture results, and document the process for blog writing.

**Experiments location**: `~/dev/experiments/[name]/`
**Experiments repo**: https://github.com/augusteo/experiments

## When to Use

- After `/experiment-design` created a plan
- "Run the experiment"
- "Execute the test cases"
- "Let's test this"

## Phase 1: Setup Verification

1. **Load experiment design**
   - Read `~/dev/experiments/[experiment-name]/design.md`
   - Confirm test cases and success criteria

2. **Check environment**
   - Verify `.env` exists with required API keys
   - Confirm input files are in place

3. **Test API connectivity FIRST**
   ```python
   # Run a simple test call before the full experiment
   try:
       response = test_api_connection()
       print("API connection successful")
   except Exception as e:
       print(f"API connection failed: {e}")
       print("Fix the issue before running the full experiment")
       # Stop here - don't run tests with broken API
   ```

4. **Create output structure** (if not already created by experiment-design)
   ```
   outputs/
   ├── raw/           # Raw API responses
   ├── processed/     # Any processed results
   └── screenshots/   # Visual captures
   ```

## Phase 2: Execute Tests

For each test case:

1. **Announce**: "Running Test N: [Name]"
2. **Execute**: Run the API call or code
3. **Capture**: Save raw response to `outputs/raw/`
4. **Evaluate**: Compare against success criteria
5. **Document**: Note result and any observations

### Error Handling

If a test fails to run (not fails the test):
- Log the error
- Continue to next test
- Note in results which tests couldn't execute

If ALL tests are failing with the same error:
- Stop and diagnose (likely API key, model name, or rate limit issue)
- Don't burn through API credits on doomed tests

### Resource Limits

Before starting, estimate:
- API cost per test (check pricing docs)
- Expected runtime per test

If a test exceeds limits:
- **Cost limit**: Stop if a single test costs more than expected
- **Time limit**: Note timeout and move on after reasonable wait

### Progress Tracking

Keep a running log:
```
Test 1: PASS - [Brief note]
Test 2: FAIL - [Why]
Test 3: ERROR - [Couldn't execute because...]
```

## Phase 3: Document Results

Create `results.md` in the experiment folder:

```markdown
## Experiment Results: [Name]

**Date**: YYYY-MM-DD
**Location**: ~/dev/experiments/[name]/

### Summary

| Metric | Target | Actual |
|--------|--------|--------|
| Tests passed | X/Y | Z/Y |
| [Other metric] | [Target] | [Actual] |

**Verdict**: [HYPOTHESIS CONFIRMED / REFUTED / MIXED]

### Results by Test Case

#### Test 1: [Name]
**Status**: PASS / FAIL / ERROR
**Input**: [What was tested]
**Expected**: [What we expected]
**Actual**: [What happened]
**Notes**: [Any observations]

#### Test 2: [Name]
...

### Key Findings

1. **[Most surprising result]**: [Details]
2. **[Confirmation or refutation]**: [Details]
3. **[Unexpected behavior]**: [Details]

### Code That Produced Results

```python
# Key API call or code snippet
# Include only the interesting parts, not boilerplate
```

### Raw Outputs

Files in `outputs/`:
- `raw/test1_response.json`
- `processed/test1_analysis.txt`
- `screenshots/test1_result.png`

### Blog-Worthy Moments (for /blog-write handoff)

**One-sentence hook**:
[The most surprising finding in one sentence - this becomes the TIL opening]

**Surprising results** (what you didn't expect):
- [Specific unexpected behavior with evidence]
- [Metric that defied hypothesis]

**Visual evidence** (screenshots worth showing):
- `outputs/screenshots/[filename]` - [What it shows]

**Quote-worthy outputs** (from model responses):
> "[Exact quote that's funny/interesting/revealing]"

**Technical insight** (for tech-focused readers):
- [API behavior pattern discovered]
- [Performance characteristic worth noting]

### Next Steps

- [ ] Run `/blog-brainstorm` with these results
- [ ] Consider additional tests: [ideas]
```

## Python Code Patterns

### Basic API Call Structure

```python
import os
import json
from pathlib import Path
from dotenv import load_dotenv

# Setup
load_dotenv()
EXPERIMENT_DIR = Path(__file__).parent.parent
OUTPUTS_DIR = EXPERIMENT_DIR / "outputs"
OUTPUTS_DIR.mkdir(exist_ok=True)

def save_result(test_name: str, result: dict):
    """Save raw API response"""
    output_path = OUTPUTS_DIR / "raw" / f"{test_name}.json"
    output_path.parent.mkdir(exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(result, f, indent=2)

def run_test(test_name: str, input_data):
    """Run a single test case"""
    print(f"Running: {test_name}")
    try:
        # API call here
        result = call_api(input_data)
        save_result(test_name, result)
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "error": str(e)}
```

### Common API Clients

**Google Gemini:**
```python
import google.generativeai as genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content([image, prompt])
```

**OpenAI:**
```python
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": [...]}]
)
```

**Anthropic:**
```python
import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    messages=[...]
)
```

## Quality Checklist

Before finishing:
- [ ] All test cases attempted
- [ ] Raw outputs saved
- [ ] Results.md created with all sections
- [ ] Key findings highlighted
- [ ] Blog-worthy moments identified
- [ ] Code snippets included (not full dumps)
- [ ] Pass/fail status clear for each test

## Phase 4: Prepare Blog Assets

After documenting results, copy key images to the blog Files directory for use in the post.

### Image Selection

Choose images that:
- **Show the finding**: Before/after comparisons, model outputs with annotations
- **Are visually interesting**: Zoomed regions, cropped areas the model examined
- **Support claims**: Visual evidence for specific statements in the post

Skip images that:
- Are redundant (pick best of similar crops)
- Don't add to understanding
- Are just test inputs without interesting results

### Copy to Blog Files

```bash
BLOG_FILES="/Users/vic/Library/Mobile Documents/iCloud~md~obsidian/Documents/VicDefault/Files"

# Copy with descriptive names for the blog
cp ~/dev/experiments/[name]/inputs/[interesting-input].jpg "$BLOG_FILES/[experiment]-[description].jpg"
cp ~/dev/experiments/[name]/outputs/screenshots/[result].png "$BLOG_FILES/[experiment]-[description].png"
```

### Naming Convention

Format: `{experiment-slug}-{description}.{ext}`

Examples:
- `gemini-vision-woodworker.jpg` (input image)
- `gemini-vision-worker-zoom.png` (model's cropped region)
- `gemini-vision-rebar-comparison.png` (side-by-side result)

### Document in Results.md

Add to Blog-Worthy Moments section:

```markdown
**Images copied to blog Files/**:
- `gemini-vision-woodworker.jpg` - Input image (model hallucinated 60 rebar here)
- `gemini-vision-worker-zoom.png` - Model's zoomed crop showing wood, not rebar
```

### Reference in Blog Post

In Astro/Obsidian, reference by filename only:

```markdown
![Woodworker image where Gemini hallucinated 60 rebar](gemini-vision-woodworker.jpg)
```

## Handoff to Blog Writing

After completing, suggest:

> Experiment complete. Key findings:
> 1. [Finding 1]
> 2. [Finding 2]
>
> Images copied to blog Files/: [list]
>
> Ready to write about this? Run `/blog-brainstorm` to turn these results into a TIL post.
