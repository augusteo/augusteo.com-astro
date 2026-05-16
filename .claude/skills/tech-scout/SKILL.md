---
name: tech-scout
description: Use when researching new technology to identify what makes a good experiment. Takes a URL/announcement and outputs test case recommendations.
---

# Tech Scout Skill

Research new technology and identify what makes a good experiment.

**Experiments location**: `~/dev/experiments/[name]/`
**Experiments repo**: https://github.com/augusteo/experiments

## When to Use

- "Check out this new [technology/model/tool]"
- "What's interesting about [announcement URL]?"
- "I want to test [new tech], what should I try?"
- Any URL to a tech announcement, blog post, or documentation
- Starting point for the tech experiment workflow

## Phase 1: Fetch & Understand

If given a URL:

1. **Fetch the announcement/documentation** using WebFetch
2. **Extract key claims**:
   - What's new or improved?
   - What specific capabilities are mentioned?
   - What benchmarks or metrics are cited?
   - What use cases are highlighted?
3. **Check access requirements**:
   - Does this require API keys? Which ones?
   - Are there free tier limits?
   - Do you already have access or need to sign up?

If given a topic without URL:

1. **WebSearch** for recent announcements and documentation
2. **WebFetch** on the best result URL
3. Extract claims as above
4. Check access requirements as above

## Phase 2: Research Prior Limitations

1. **Search for known limitations** in this technology area
2. **Example search queries**:
   - "[technology] benchmark failures"
   - "[technology] edge cases"
   - "[previous version] vs [new version] comparison"
   - "problems with [technology]"
   - "[technology] reddit" (for community pain points)
3. **Look for**:
   - Previous benchmark failures
   - Edge cases that broke older versions
   - Community complaints or bug reports
   - Academic papers on failure modes
3. **Common limitation categories to check**:
   - Vision AI: handwriting, distortions, counting, dense tables, low quality, uncommon scripts
   - Language models: reasoning chains, math, code generation edge cases
   - Audio: accents, background noise, overlapping speech
   - APIs: rate limits, latency, cost per call

## Phase 3: Generate Test Ideas

Based on claims vs. known limitations, generate test ideas:

**Strong test cases**:
- Directly challenge a specific claim
- Test a known failure mode
- Have clear pass/fail criteria
- Can be run quickly (minutes, not hours)
- Produce visual or quotable results

**Weak test cases** (avoid):
- Vague or subjective evaluation
- Require extensive setup
- No clear baseline comparison
- Already well-documented in official benchmarks

## Output Format

Save this report to `~/dev/experiments/[experiment-name]/scout.md`.

```markdown
## Tech Scout: [Technology Name]

### Experiment Name
[kebab-case-name] → folder: `~/dev/experiments/[kebab-case-name]/`

### Source
[URL or search query used]

### Access Requirements
- API key needed: [Yes/No - which one?]
- Free tier available: [Yes/No - limits?]
- Sign-up required: [Yes/No - link?]

### Key Claims
1. [Claim with specific metric if available]
2. [Claim]
3. [Claim]

### Known Limitations (Prior Art)
1. [Limitation with source]
2. [Limitation]
3. [Limitation]

### Recommended Test Cases

#### High Priority
1. **[Test name]**: [What to test] → [Expected vs. claimed behavior]
   - Input: [Type of input needed]
   - Success metric: [How to measure]

2. **[Test name]**: ...

#### Medium Priority
3. **[Test name]**: ...

#### Nice to Have
4. **[Test name]**: ...

### Input Dataset Ideas
- [Specific images/inputs to gather]
- [Where to source them]

### Next Step
Run `/experiment-design` to plan the experiment structure.
```

## File Output

After completing research, create the experiment folder and save the report:

```bash
mkdir -p ~/dev/experiments/[experiment-name]
```

Then write the scout report to `~/dev/experiments/[experiment-name]/scout.md`.

## Examples of Good Test Cases

**For Vision AI**:
- Handwritten cursive text recognition
- Counting objects in cluttered scenes (fingers, items)
- Reading rotated/skewed text
- Dense table extraction accuracy
- Low-quality/noisy image handling

**For Language Models**:
- Multi-step reasoning with trap answers
- Code that looks correct but has subtle bugs
- Tasks requiring precise counting or tracking

**For APIs**:
- Latency under load
- Edge cases in input formats
- Cost efficiency vs. competitors

## Quality Checklist

Before delivering:
- [ ] Key claims have specific metrics where available
- [ ] At least 3 test cases with clear success criteria
- [ ] Test cases target claims vs. known limitations gap
- [ ] Input requirements are specific enough to gather
- [ ] Sources linked for limitations research
