# Water citation and freshness audit

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
