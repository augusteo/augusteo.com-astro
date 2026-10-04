# Energy research for AI environmental-impact explainer

Verified 2026-10-04 against primary sources. This is research input for the main matrix, not publishable prose. Only this file was edited by the energy researcher.

## Findings that matter to the draft

- The latest IEA follow-up is April 16, 2026. It estimates all-data-center electricity at **485 TWh in 2025**, with a central projection of **950 TWh in 2030**, about **3% of projected global electricity demand**. It reports 17% growth for all data centers in 2025 versus 50% for AI-focused centers, and projects AI-focused consumption to triple during 2025–2030. These are estimates/projections, not direct meter totals or AI-only sector totals.
- Primary 2026 announcements substantiate the size ladder: Prometheus **1 GW of capacity once complete**, Hyperion **5 GW of compute capacity after expansion**, and PORTS-Pike **approximately 8 GW-IT contracted future capacity**, with the first **800 MW expected in 2028**. Meta's two pages do not explicitly reconcile IT versus facility power. Keep their exact capacity labels and do not give them calculated water totals as if those were predictions.
- A much better household electricity denominator than the stale EIA FAQ is **863 kWh/month per US residential customer in 2024**, from EIA Table 5.a. Multiplying its rounded monthly value gives **10,356 kWh/year**. Publication date is October 7, 2025, within the skill's twelve-month bar on October 4, 2026, but close to expiry. EIA's current landing page still lists 2024 data and next release October 2026. Recheck if publication slips beyond October 7. This is a residential customer-account benchmark, not an observed two-adult/two-child household or total household end use including onsite solar.
- The 2026 IEA report supports explaining variation between simple text queries and reasoning, video, and agentic tasks without inventing a universal per-prompt cost. Its executive summary says the latter can need hundreds or thousands of times the electricity of simple text generation. Do not turn that into a fixed ratio for every model or task.
- A current GHG Protocol consultation document explicitly reproduces the existing location-based and market-based definitions. It makes the accounting distinction possible without treating the 2015 guidance alone as a current source. The proposed hourly-matching/deliverability requirements are proposals, not automatically enacted requirements.

## Source registry

| ID | Primary source | Date and recency | Locator and scope |
|---|---|---|---|
| IEA26 | [IEA executive summary](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary), [report landing page](https://www.iea.org/reports/key-questions-on-energy-and-ai) | Published 2026-04-16; current | Summary headings on query energy, updated demand outlook, and social concerns. International agency estimates/projections. All data centers unless AI-focused explicitly named. |
| META1 | [Meta engineering: Prometheus](https://engineering.fb.com/2026/02/09/data-center-engineering/building-prometheus-how-backend-aggregation-enables-gigawatt-scale-ai-clusters/) | 2026-02-09; current | Introductory paragraph following bullets. Provider announcement, future completed capacity; cluster spans multiple buildings. |
| META5 | [Meta: Richland Parish expansion](https://datacenters.atmeta.com/2026/07/deepening-our-investment-in-richland-parish-louisiana/) | 2026-07-13; current | Opening paragraph; sustainability section. Provider announcement, future expanded compute capacity. |
| OAI8 | [OpenAI: PORTS-Pike](https://openai.com/index/openai-joins-ports-pike-project/) | 2026-08-17; current | Opening paragraph; cooling bullet; paragraphs beginning “The first 800 megawatts” and “SB Energy will build”. Contracted future IT capacity and expected buildout. |
| EIAHOME | [EIA Table 5.a, 2024 residential monthly bills](https://www.eia.gov/electricity/sales_revenue_price/pdf/table_5A.pdf), [release metadata](https://www.eia.gov/electricity/sales_revenue_price/) | Published 2025-10-07, observed 2024; current release but nearly twelve months old | PDF printed page 2, final “U.S. Total” row. 143,144,185 residential customers; monthly kWh is rounded. Latest page says next release October 2026. |
| EIAUNIT | [EIA: Measuring electricity](https://www.eia.gov/energyexplained/electricity/measuring-electricity.php) | Publication/update date not displayed; current authoritative unit definition | Sections “Electricity use over time is measured in Watthours” and larger power units. Timeless definition, not new measured data. Obtain dated replacement if gate strictly requires a dated source for unit definitions. |
| GOOGPUE | [Google data-center efficiency](https://datacenters.google/efficiency/) | Current page includes Q1 and Q2 2026 results and links 2026 Environmental Report; exact page update date absent | Introductory PUE explanation and footnote 1. Its PUE 2.0 example correctly specifies one extra watt overhead per IT watt. Current reported values are provider data, not independent certification. |
| GHGCUR | [GHG Protocol Scope 2 consultation PDF](https://ghgprotocol.org/sites/default/files/2025-10/GHG-Protocol-Scope2-Public-Consultation.pdf), [publication record](https://ghgprotocol.org/public-consultation-scope-2) | Released October 2025 (page date October 20); current. PDF includes later change log | Printed page 7 / PDF index 6 reproduces existing location/market definitions alongside proposals. Printed page 4 distinguishes inventory and consequential accounting. |
| GHGFAQ | [GHG Protocol consultation FAQ](https://ghgprotocol.org/blog/frequently-asked-questions-scope-2-and-electricity-sector-consequential-accounting-public) | 2025-11-17; current | Questions 2, 6, 20, 21. Proposal retains dual reporting; asks for time/geographic alignment; no guaranteed quantified impact for every purchase. |
| EPAGRID | [EPA eGRID FAQ](https://www.epa.gov/egrid/frequent-questions-about-egrid) | Page last updated 2026-07-28; current methods explanation. Underlying latest dataset still eGRID2023, released/revised 2025 | Questions 9, 11, 12, 13. Regional mix affects average emissions; inventory average factors differ from marginal/avoided-emissions uses. Do not present old grid-year factors as measured 2026 intensity. |

## Claim-source matrix inputs

Quoted excerpts are intentionally capped at 25 total quoted words per distinct source across this file. Related rows use locators and paraphrases instead of adding quotations.

| Claim ID | Claim or figure input | Evidence / minimal quote | Status and limits |
|---|---|---|---|
| E01 | All data centers: estimated 485 TWh in 2025; central 950 TWh in 2030, around 3% global electricity in 2030 | IEA26 updated-outlook paragraph: “485 TWh in 2025 to 950 TWh in 2030” | Current; modeled sector totals and central forecast. 3% denominator is projected global electricity demand in 2030, not 2025 energy use. |
| E02 | Sector electricity grew 17% in 2025; AI-focused centers grew 50% | IEA26 query-energy section: “grew by 17% in 2025”; immediately following sentence provides AI-focused result | Current agency assessment; not growth of an identical fixed set of AI tasks. |
| E03 | AI-focused electricity triples 2025–2030 in the central outlook | IEA26 updated-outlook paragraph following E01 | Current projection; do not assign the 485/950 TWh all-center totals to AI alone. |
| E04 | Task choice matters: reasoning, video and agents can require far more energy than simple text | IEA26 query-energy section: “hundreds or thousands of times more energy” | Current agency synthesis; no universal numerical prompt default, and no task-specific gCO2 or mL inferred. |
| E05 | Prometheus: future 1 GW cluster capacity across several buildings | META1 intro: “Once it’s complete” and “1-gigawatt of capacity” | Current provider announcement. IT/facility boundary unspecified in this page. No measured annual energy or water, and no assumption completion happened since announcement. |
| E06 | Hyperion: expanded Richland Parish project targets 5 GW compute capacity | META5 opening: “to 5 GW in compute capacity” | Current provider announcement. IT/facility boundary not fully defined. No annual MWh, WUE or metered water supplied. |
| E07 | PORTS-Pike: contracted approximately 8 GW IT; staged construction, first 800 MW expected in 2028; buildout through 2032 | OAI8 opening: “approximately 8 gigawatts-IT”; staging paragraph: “first 800 megawatts are expected to become available in 2028” | Current company agreement/expectation. Not an 8 GW operating site today; contingent on permits, environmental reviews, infrastructure, financing. Initial credit-supported shell buildout is 4.25 IT-GW, not additional to the eight. |
| E08 | PORTS developer says closed-loop air-cooled cooling; final expected water quantities still to be disclosed | OAI8 cooling bullet and following quantitative-disclosure sentence | Current operator expectation. Do not infer zero total water or offsite power-generation water. This row deliberately adds no quotation beyond E07's same-source quota. |
| E09 | US residential-account electricity benchmark: 863 kWh/month in 2024, approximately 10,356 kWh/year | EIAHOME page 2: “U.S. Total 143,144,185 863 16.48 142.26”; landing: “Release date: October 7, 2025” | Current release / historical data year. Annual value derived from rounded monthly column; exclude claims about a particular household's makeup. Recheck if publishing later than October 7, 2026. |
| E10 | GW is power; GWh/TWh is energy over time | EIAUNIT: “One Watthour is the energy of one Watt used for one hour.” | Stable definition; undated publication explicitly flagged. Derivation uses calendar hours rather than announced-site measurement. |
| E11 | Total-facility electricity includes cooling, power distribution, and other overhead; PUE converts matched IT energy into total energy | GOOGPUE footnote example: “a PUE of 2.0 means that for every watt of IT power, an additional watt is consumed” | Current page, exact update date unavailable. Algebra below is definition/example-derived. PUE is not AI productivity or carbon intensity. No Google PUE assigned to Meta/OpenAI projects. |
| E12 | Location-based carbon uses geographically averaged generation factors; market-based attributes electricity through contractual instruments | GHGCUR printed page 7 existing definitions: “average energy generation emission factors”; “contractual instruments, or contractual instruments on their own” | Current document quotes existing definitions; proposed future changes do not erase accounting distinction. Do not claim certificates directly measure local marginal emissions. |
| E13 | Average-grid inventory emissions and consequential emissions of added demand answer different questions | GHGCUR printed page 4 and GHGFAQ Q20/Q21; EPA EPAGRID Q12/Q13 | Current methods. Physical harm attribution may require counterfactual dispatch/expansion modeling; a simple intensity calculator illustrates operational accounting, not net causation. |
| E14 | Same electricity can have different emissions in different grid mixes | EPAGRID Q9: “CO2 output emission rates may fluctuate on an annual basis due to a change in the resource mix” | Current official explanation; no asserted measured 2026 regional factors. Illustrative 50/400/800 gCO2e/kWh values, if used, must be labeled hypothetical. |
| E15 | Efficiency gains do not mathematically guarantee total resource reduction | Scenario algebra: total = task count × average resource use/task. IEA26 E02+E04 provide evolving-world context | Mathematical conditional. A plot can show a 50% cost decrease with 3× volume -> 1.5× total. It does not establish a causal rebound effect or a real forecast. |

## Checked calculations for illustrations

Use a 365-day year, or visibly change hours if modeling a leap year. Define the operating fraction as **annual average electrical load divided by stated IT capacity**, not GPU utilization. GPU utilization is not interchangeable with this electrical fraction.

`IT_kWh = IT_GW × 1,000,000 kW/GW × 8,760 h/year × load_fraction`

`IT_TWh = IT_GW × 8.76 × load_fraction`

`facility_kWh = IT_kWh × annual_energy_PUE`

`site_water_L = IT_kWh × compatible_WUE_L_per_IT_kWh`

`electricity_emissions_t_CO2e = facility_kWh × grid_g_CO2e_per_kWh / 1,000,000`

The water equation must use a WUE dataset with the same withdrawal/consumption definition as the output. Electricity-related water is separate. PUE assumptions and WUE assumptions may correlate in real cooling designs; independently adjustable controls illustrate arithmetic sensitivity, not physically validated design choices.

| Illustrative continuous IT load | IT energy at 100% average load | Equivalent residential customer-account years at 10,356 kWh/year |
|---|---:|---:|
| 100 MW | 0.876 TWh/year | 84,588.6 |
| 1 GW | 8.76 TWh/year | 845,886.4 |
| 5 GW | 43.8 TWh/year | 4,229,432.2 |
| 8 GW | 70.08 TWh/year | 6,767,091.5 |
| 10 GW | 87.6 TWh/year | 8,458,864.4 |

Round household readouts to two meaningful significant figures, e.g. 1 GW continuously = about **850,000 US residential accounts' annual electricity**. At a hypothetical PUE 1.2, total-facility use is 10.512 TWh/year, equivalent to about **1.0 million** account-years. These are calculations for a generic continuous load, not actual annual usage at Prometheus or any named campus.

For contextual conversion, global 485 TWh/year corresponds arithmetically to an average electrical load of 55.37 GW (485/8.76), while 950 TWh/year is 108.45 GW. Neither is a single campus or peak facility capacity. A hypothetical continuous 1 TW load would use 8,760 TWh/year, about eighteen times the IEA 2025 all-center estimate. Avoid displaying this as an existing/projected one-terawatt facility: no primary source for one was identified.

Example carbon calculator at a generic 1 GW IT continuous load and assumed PUE 1.2: 50, 400 and 800 gCO2e/kWh produce 0.5256, 4.2048 and 8.4096 million tonnes/year respectively. Label all three as chosen scenarios, with generation-related operational emissions only. No construction, chip manufacturing, embodied lifecycle emissions, upstream methane, or avoided-emissions benefit is calculated unless separately researched.

## Remaining limits and repair notes

- Obtain dated unit/PUE primary definitions only if Gate 0 treats every stable definition as subject to the evolving-topic publication-date bar. The unit math is correct, and Google’s current page includes 2026 observations, but inventing a publication date would be wrong.
- Annual average capacity utilization remains unreported for the named announced projects. Do not silently choose an operating fraction and call it expected demand.
- No universal per-prompt water/energy number is needed. If writing about prompt counts, use an explicitly hypothetical arithmetic mean and a defined task distribution, not Google's historical median as though it were the mean.
- Grid carbon scenarios illustrate sensitivity. They do not certify clean-energy procurement, match contracts by hour, estimate marginal added-load emissions, or settle local power-supply consequences.
- Current GHG consultation PDF verifies definitions; if naming proposed regulatory requirements, perform another standards-status check during Phase 7.
