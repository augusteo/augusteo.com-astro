# Water citation and freshness audit

**Latest check: PASS.** Post and seven implemented figures inspected again on October 4, including the final AWS trims. The initial findings below are historical; current findings appear in the final addendum and closure. KOLN identity is repaired, Alston attribution fits, DOE's mechanism citation is verified, and AWS's final repeated source-derived text fits its budget.

Audit date: **2026-10-04**. Inspected current `src/content/blog/ai-environmental-impact/index.mdx`, main claim matrix, and planned figure defaults. No MDX or main-note changes. All nine cited water/unit sources checked; additional arXiv metadata checked for versions. Figure placeholders remain in the inspected draft, so this audit verifies planned numerical inputs and prose, not implementation behavior.

## Findings requiring repair

1. **Source identity, cosmetic:** Section 1 calls KOLN a newspaper. KOLN is the broadcaster publishing the linked news article. Change that phrase to **news report**. The numerical claim is otherwise carefully and correctly attributed.
2. **Source word budget:** Five paragraphs drawing on Alston total approximately **234 words**: withdrawal/consumption definitions 48; cooling boundary 45; explicit preprint explanation 63; operational/lifecycle boundaries 36; explicit local-risk citation 42. Those counts strip link URLs. The paper has a 200-word attributed limit. Counting additional explanations derived from its framework or figure captions would increase that total. Tighten these passages to **at most 170 words together**, leaving room for reference/caption material and restatements; alternatively source some foundational definitions to a genuinely independent primary reference. This is a conservative attribution tally, not a claim of verbatim copying. No source quotation appears in the public water prose.
3. **Reader traceability, recommended:** The Nebraska link loads the generic JavaScript records viewer, not the replacement filing itself. The reference names facility 90045 and page 2, so it is not a fabricated citation. Nevertheless the direct document URL below would make verification much easier. A current direct fetch succeeded and matches the retained original exactly.

No substantive source drift, false numerical default, or unsupported water conclusion was identified. All environmental judgments are appropriately conditional; hypothetical scenarios remain distinct from measured or reported facility records.

## Link-by-link verification

| Source | Current identity/date and retrieval | Actual citing claim and audit outcome |
|---|---|---|
| [KOLN article](https://www.1011now.com/2026/09/30/more-questions-than-answers-about-lincolns-google-data-center-water-electricity-usage/) | Madison Pitsch, published/updated September 30, 2026; loads | Reports Agate 13.299 megagallons and explains faulty-redaction extraction. Already supplies a comparison with Lincoln daily use. Draft correctly describes reported values, not independently verified metering. Broadcaster identity repair above. |
| [Nebraska viewer](https://ecmp.nebraska.gov/PublicAccess/index.html?MyQueryID=340) | Loads JavaScript shell | Underlying replacement filing identifies Agate/Google/Lincoln and records receipt October 1, 2026. Page 2 supplies the 2025 water/peak-demand fields, both redacted. Draft's label/year claim passes; meter value remains unverified. |
| [EPA WaterSense](https://www.epa.gov/watersense/statistics-and-facts) | March 11, 2026 update unchanged; loads | 82 gallons/person/day explicitly traces to USGS 2015. Outdoor use is part of the household context. Draft preserves historical year and illustrative household assumption. |
| [Lincoln 2025 report](https://www.lincoln.ne.gov/files/sharedassets/public/v/12/ltu/utilities/water-system/water-quality-report.pdf) | Web tool blocked; fresh urllib download succeeds and matches original hash | PDF page 3 gives about 37.6 million gallons/day in 2025. Draft accurately labels municipal supply, not domestic-only use or spare capacity. |
| [NYC DEP drinking water](https://www.nyc.gov/site/dep/water/drinking-water.page) | Current undated documentation; loads | Daily delivery exceeds a billion gallons and covers customers throughout New York state. Draft correctly uses broader-system reference and under-twenty-minute approximation. No exact city-only 2025 number is claimed. |
| [Google Nebraska](https://datacenters.google/locations/nebraska/) | Current documentation; timeline unchanged; loads | Lists Lincoln coming online in 2026. Draft correctly rejects mature-rate inference from reported 2025 use without inventing commissioning details. |
| [Alston, Love, Haider](https://arxiv.org/html/2609.25437v1) | September 21, 2026 preprint; full HTML loads; [metadata](https://arxiv.org/abs/2609.25437) still lists only v1 | Withdrawal/consumption distinction, internal liquid cooling versus external heat rejection, direct versus generator water, and location/time framework supported. Draft accurately identifies Michigan modeling, assumed inputs and limits. Word-budget repair required above. |
| [AWS original regional dataset](https://sustainability.aboutamazon.com/products-services/aws-cloud) | Current page still reports 2025 annual averages; loads | Definition remains withdrawal liters per IT kWh. Stockholm 0.02, Tokyo 1.22, Singapore 1.57, Jakarta 2.85 and global 0.12 unchanged. Draft correctly avoids consumption, matched-prompt, scarcity-ranking, or named-campus prediction claims. |
| [NIST Handbook 44 Appendix C](https://www.nist.gov/document/2026-nist-handbook-44-appendix-c) | 2026 edition PDF loads | Exact inch and US liquid gallon definitions support derived 3.785411784 liters/gallon. Relevant exact entries are printed C-21 and C-25. The existing main notes' C-24 locator for the gallon appears one page early; fix locator if reproduced publicly. Public reference has no incorrect page number. |

The 2026 NYC conservation PDF is not linked or used in the current draft. Its unresolved 989/990 MGD internal discrepancy therefore does not affect a published claim or default.

## Verified original filing and municipal report

[Direct Agate replacement PDF](https://ecmp.nebraska.gov/PublicAccess/api/Document/AYimuQjG9171eKVkJbG0rp4quwyyCgutClh928eX4czTNB4fWuexY8MMCRq7AUs2rWHsmTfIi9KDNWB4d4%C3%81BJXM%3D/) re-fetched this audit: 106,531 bytes, SHA256 `74340e20e90e59328f83731c2bb026df4ebd35786ad1a3a6a35392ddcfc6b7df`, identical to `/tmp/agate-redacted-2025.pdf`. Page 2 checked directly with pypdf. Redacted values remain absent. This closes freshness for the actual filing, rather than merely inspecting an old saved copy.

Lincoln PDF re-fetched this audit: 6,575,828 bytes, SHA256 `18a0c4658e5dc04375b495ba103f5b023936ad1c27fef216e9de65081dfeb977`, identical to `/tmp/lincoln-water-2025.pdf`. Page 3 checked directly. No report replacement detected despite web-tool access errors.

## Planned figure arithmetic and boundaries

| Figure | Independently recalculated default / bounds | Result |
|---|---|---|
| 1: VolumeScale | 82 × 4 = 328 gal/day; ×365 =119,720/year. 13,299,000 /119,720 =111.0842 household-years. /37,600,000 ×24 =8.4887 hours. /1 billion ×1440 =19.15056 minutes. | PASS. Nominal NYC denominator gives approximate duration; actual greater delivery is shorter. Family size1–8 and daily50–150 are chosen sensitivity bounds, not demographic measurements. |
| 2: WaterBalance | Both withdraw100; returns20/80, evaporation80/20. 80/20=4. | PASS. Explicit toy balances within the same source environment and accounting period. No inference about household plumbing or Google. |
| 3: RegionWater | Source values0.02/1.22/1.57/2.85; selected max/min2.85/.02=142.5. Global reference .12. | PASS. Roughly140-fold is suitable rounding, limited to displayed regions. Units must remain withdrawal liters per IT kWh. |
| 4: SizeExplorer | 1,000 MW ×8,760 h ×100%=8.76 billion IT kWh. ×0.12=1.0512 billion liters. /3.785411784=277.697661 million US gallons. /119,720=2,319.56 household-years. | PASS. 100–10,000MW,10–100%load,0–3WUE are hypothetical controls. Zero site-withdrawal intensity does not imply zero indirect water. |
| 5: LocalHeadroom | Rounded277.7million/year /365=.7608219million/day. Peak2×=1.5216438. Remaining9 equal-duration months need2/3 average=.5072146. Weighted3/12×peak+9/12×offpeak preserves total. | PASS. At maxpeak4, offpeak reaches zero, not negative. Headroom1million/day and100%utility supply are explicitly invented. Below threshold does not establish watershed safety. |
| 6: Electricity/carbon coupling | 8.76TWhIT×1.2=10.512TWhfacility. Annual withdrawals remain277.7million because WUE denominator is IT energy. | PASS for water boundary. Do not multiply site water again by PUE; power-generation water excluded. |
| 7: EfficiencyGrowth | Fixed-workload arithmetic concerns electricity; no water result asserted. | PASS for water scope; no implied constant WUE or coupled reductions. |

NIST derivation: `231 × 2.54³ /1000 =3.785411784` liters per US liquid gallon. No water-use empirical assumption enters the conversion.

## Attribution and quote audit

The MDX water passages contain no purported verbatim source quotation, so no spliced quotation was identified. Their numerical and conceptual claims have traceable primary support except the deliberately attributed KOLN figure. News attribution does not become a verified operational measurement through contextual calculations.

AWS's explicit source description occupies approximately120 words, safely below200. Adjacent scenario arithmetic is original calculation, but should still preserve input citation and all-workload boundary. EPA, Lincoln, NYC, Google timeline, Nebraska and NIST are comfortably below their individual200-word budgets. Alston requires the reduction identified above. Avoid adding new excerpts to already-budgeted sources merely to decorate the figures.

All actively evolving factual rows in this audit remain current as of October4. Historical household observations retain their2015 year. No unchecked water source remains.

## Final implemented-figure and bounded-attribution addendum

Re-read the complete current MDX, all five Svelte interactives, the three water draw functions, and the shared scenario model. The two static SVGs are in MDX. The public KOLN description now says news report; earlier source-identity defect is closed.

### DOE mechanism citation: PASS

Freshly fetched [DOE's cooling-water engineering guide](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers). Its Direct Liquid Cooling Systems section describes heat transfer from IT equipment into a recirculating loop, through a coolant distribution unit and then an external cooling system. It also describes hybrid heat rejection that switches between cooling towers and air cooling. This supports the new paragraph distinguishing internal liquid cooling from final outdoor heat rejection. No current industry performance average is borrowed. Source remains official engineering guidance for a foundational mechanism; do not imply its 2019 diagram is a 2026 performance survey.

New DOE paragraph has39 words; reference22. Approximately61 attributed words, no verbatim quotation: safely below200.

### Alston attribution: PASS for present bounded core

Exact URL-stripped counts of the four remaining source-derived explanatory paragraphs:

| Passage | Words |
|---|---:|
| Withdrawal/consumption definition paragraph |48|
| Explicit Michigan preprint paragraph |42|
| Operational and construction/manufacturing boundaries |36|
| Explicit monthly availability/local-risk paragraph |42|
| Total core prose |168|
| Reference entry, including bibliographic metadata |27|
| Total conservative bounded allocation |195|

Cooling-loop paragraph now belongs to independently verified DOE guidance, not Alston. No figure copies the paper's quantitative result or its model. The toy water balance and toy delivery profile are original arithmetic. General statements evaluating those invented cases are original reasoning rather than additional summaries of Alston's findings. Preserve this allocation: only five words remain if reference metadata is counted. Adding another paper summary or caption would exceed the conservative budget.

### AWS attribution after figures: repetition to tighten

The previous prose-only audit did not include the now-implemented diagram and accessibility text. They repeat the source's empirical facts and therefore affect the budget. Candidate blocks to count are:

- Definition and four-region prose:55 words.
- Figure3 caption: approximately44 words of prose, including duplicated region/year/metric facts and scope restrictions.
- Figure3 aria-label: approximately29 words, again stating the four observed values, year and unit.
- Figure3 visible city/value labels:8 tokens, plus metric label.
- Operator-reporting/boundary paragraph:40 words. Some of its last sentence is original interpretation, but the reporting scope is sourced.
- Global-default part of the worked-example paragraph: approximately25 words. **Do not attribute its independently derived electricity/liters/gallons arithmetic to AWS.**
- SizeExplorer's default-intensity/source sentence: approximately25 words before its independent chart/benchmark explanation.
- AWS reference entry: approximately18 words.

Counting these explanatory blocks conservatively produces approximately240–260 words before excluding original framing and deductions. An aggressively narrow facts-only tally might fit, but relying on that would obscure what was actually drawn from the source. Recommended repair: remove repeated numerical values from the Figure3 caption (the diagram and aria-label already supply them), shorten the reporting/boundary paragraph, and shorten the repeated default source/reference wording. This preserves every scientific disclosure while reducing repetition. Then re-count the final empirical source-derived blocks, with original calculation explicitly separate. No source quotations or copied passages were found.

### Implemented numerical and accounting boundaries: PASS

- **Figure1 / VolumeScale:** reports KOLN's fixed volume as news reporting and compares supplied-water volume. Household slider/year formula, constant Lincoln daily denominator and nominal NYC denominator match the prior verified arithmetic. Current component explicitly says actual NYC delivery exceeds the nominal reference, implying a shorter duration.
- **Figure2 SVG:** accessible text and caption explicitly identify invented100-unit withdrawals, returns to the same immediate source within the modeled period, and evaporative consumption80/20. No household return fraction or facility estimate is implied.
- **Figure3 SVG:** zero-based linear axis, exact AWS2025 regional values, liters withdrawn per IT kWh, all-workload and local-harm limitations. Coordinates map values accurately to the0–3 axis. Scientific scope passes; repeat-word budget is the issue above.
- **Figure4 / SizeExplorer:** default1000MW IT,100% average electrical load,.12 withdrawal WUE. `campus()` uses IT kWh directly, exact gallon conversion and supply-volume household equivalents. Visible and accessible outputs explicitly say withdrawals; no consumption or PUE water multiplier appears. Regional intensity is an input illustration, not a forecast for another campus.
- **Figure5 / LocalHeadroom:** shared `season()` preserves annual volume using three equal-duration peak blocks and nine compensating blocks. Component/caption identify100% supply by the utility; dashed threshold is delivery headroom after existing users/reserves. Under-threshold accessible result explicitly requests a separate ecological water balance. Sliders cap peak at4, where remaining-month flow iszero, preventing negative demand.
- **Figure6 / EnergyCarbon:** overhead applies to facility electricity only; no water result appears, so it cannot recast AWS withdrawal WUE as facility-energy intensity or consumption.
- **Figure7 / EfficiencyGrowth:** explicitly calculates no water footprint. Required IT electricity can exceed the baseline only with more capacity/time; no implicitly constant water intensity is asserted.

The present changes require no new water-source freshness rerun beyond DOE: source facts and underlying numerical defaults remain those checked earlier October4. No unsupported environmental mechanism or default was found. Complete the AWS repetition reduction before treating all source budgets as closed.

### Final AWS trim closure: PASS

Re-read the actual MDX after the author's reductions to the Figure3 caption, operator-boundary paragraph and reference. Counted words as whitespace-separated tokens, treating a decimal number and a hyphenated word as one word; stripped link destinations/markup. This is a conservative allocation: complete source-related blocks include some original framing and derived comparison reasoning, rather than counting only empirical facts.

| Final source-related block | Words |
|---|---:|
| Definition and regional prose |51|
| Figure3 caption |20|
| Figure3 aria-label |22|
| Visible regional city/value labels |8|
| Visible unit label |5|
| Operator/scope paragraph |18|
| Complete global-input sentence before original arithmetic |20|
| Complete SizeExplorer default-intensity source sentence |10|
| AWS reference |5|
| **Total** |**159**|

The worked-example numerical outputs, mathematical curve/formula and dynamic scenario readouts are original calculations, not AWS findings. They continue to cite the independently verified input and label withdrawals correctly. Retained accessibility text accurately supplies all four regional measurements. The shortened caption no longer duplicates those values. At159 words the sourced blocks leave41 words of buffer, so modest differences in counting punctuation or bibliographic labels do not threaten the200-word limit.

**Final outcome:** no remaining required water-citation, source-budget or accounting-boundary repair. DOE paragraph supported; Alston conservative195-word allocation and AWS159-word allocation fit. All seven implemented figures preserve the distinctions verified above. The generic Nebraska viewer remains a traceability recommendation, not a false claim or broken URL. Audit completed October4,2026.
