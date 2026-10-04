# AI's environmental impact: numbers in context

## Spec

Started: 2026-10-04. Topic mode. Brainstorm and source discovery completed; full authoring authorized on 2026-10-04. Vic accepted the contextual direction with scope edits: cover multiple data-center sizes, including gigawatt campuses and industry totals in terawatt-hours; use coded interactive visualizations; use an aggressive, declarative title. No further scope approval should be requested merely to repeat these choices.

Audience: everyday AI users assessing environmental claims. Scope: water, electricity, emissions, local constraints, accounting boundaries, and uncertainty. Target approximately 2,500-3,500 words, subject to evidence and visual pacing. Topic-evolution classification: actively-evolving; current operational claims need current sources. Historical benchmarks must retain their actual observation dates.

Working title recommendation: **Millions of gallons don't prove AI is an environmental disaster**. Alternative: **The AI water debate is getting the math wrong**. Titles are proposals, not user-selected. A broad allegation about the entire debate needs documented examples; do not force the research to vindicate a headline.

## Throughline

Follow the same environmental questions across a 100 MW illustrative facility, a 1 GW cluster, multi-gigawatt campuses, and global annual electricity totals. Lincoln is one opening example, not a representative mature facility. Return to household and city comparisons as readers learn why volume equivalents are not equivalent environmental impacts.

Alternate throughline: a reader assessing a headline about water use asks what was measured, over what period, where the water came from, where it went, and what changes at full buildout.

## Research notes

Verified 2026-10-04; actively evolving;12-month bar applies to evolving empirical claims.


### E1: EPA household reference

[EPA WaterSense: Statistics and Facts](https://www.epa.gov/watersense/statistics-and-facts). Page updated **2026-03-11**, observed data **2015**, read directly. Excerpt: “Each American uses an average of 82 gallons of water a day at home”. The page explicitly attributes this to USGS, *Estimated Use of Water in the United States in 2015*. It also identifies outdoor watering as part of household use. This is an official currently maintained benchmark, with an old observation year; not a measurement of a typical family in 2026. Four equal per-person allowances are a calculator assumption, not an empirically measured two-adult/two-child household.

Quality: government documentation, referencing an original government estimate. Recency: current page passes 12-month source freshness; keep 2015 observation explicit.

### L1: Lincoln municipal supply

[2025 Annual Drinking Water Quality Report](https://www.lincoln.ne.gov/files/sharedassets/public/v/12/ltu/utilities/water-system/water-quality-report.pdf), **printed/PDF page 3**. Current report covering 2025, published in 2026 according to search metadata. Directly retrieved with Python urllib and extracted with pypdf after intermittent web-tool 403s. Excerpt: “more than 13.7 billion gallons of water were pumped from these wells”. Same paragraph reports average daily use around **37.6 million gallons**. Source wells are along the Platte River near Ashland; supply is approximately half groundwater and half groundwater influenced directly by surface water. The relevant denominator is municipal supply, not household-only use or a measurement of spare capacity.

Quality: primary municipal operational reporting. Recency: passes; 2025 observations and 2026 report. Exact publication day not established.

### G1: Lincoln operating stage

[Google Nebraska data-center timeline](https://datacenters.google/locations/nebraska/), current page, accessed 2026-10-04. Under **2026**: “The Lincoln, Nebraska data center comes online.”

Quality: primary company timeline for its own development status, not independent environmental performance evidence. Recency: current documentation passes. It contradicts treating 2025 as a normal full-operating year. The page does not explain which 2025 activities used water; commissioning or construction explanations remain hypotheses.

### K1: Lincoln reported resource numbers

[KOLN report](https://www.1011now.com/2026/09/30/more-questions-than-answers-about-lincolns-google-data-center-water-electricity-usage/), published/updated **2026-09-30**. Excerpt: “52.65 megawatts of electricity during peak electrical demand and 13.299 megagallons of water”. The article describes extracting text from faulty PDF redactions. Its water boundary spans cooling towers, evaporative equipment, and site operations. It separately reports **547.88 million gallons** for Papillion/Fireball in 2025. Do not infer water efficiency by comparing those facilities.

Quality: secondary reporting; values not independently verified against accessible original filing. Recency passes, primary-quality requirement does not. A permissible use is to describe what the motivating news article reported, with calculations conditional on that reported volume. It cannot become a verified metered observation merely because the arithmetic checks.

### R1: Current replacement Agate filing

[Agate replacement compliance report, received October 1, 2026](https://ecmp.nebraska.gov/PublicAccess/api/Document/AYimuQjG9171eKVkJbG0rp4quwyyCgutClh928eX4czTNB4fWuexY8MMCRq7AUs2rWHsmTfIi9KDNWB4d4%C3%81BJXM%3D/). Directly downloaded with urllib and extracted using pypdf on 2026-10-04. PDF page 2 labels “2025 Annual Water Consumption” and defines peak demand as “Max observed demand”. Both numeric values are redacted. The water note covers tower, evaporative-system, and site-operation volumes, but gives no separate returns, withdrawals, evaporation, monthly use, annual electricity, or utilization. Page 1 identifies Agate as owned by Google and located in Lincoln.

Quality: primary company filing maintained by Nebraska, received stamp 2026-10-01. Recency passes. Verifies reporting year and stated accounting labels, **does not verify KOLN's numerical extraction**. The original September filing remains unavailable. Calling the field consumption does not supply a hydrological reconciliation.


### R1: Current replacement Agate filing

[Agate replacement compliance report, received October 1, 2026](https://ecmp.nebraska.gov/PublicAccess/api/Document/AYimuQjG9171eKVkJbG0rp4quwyyCgutClh928eX4czTNB4fWuexY8MMCRq7AUs2rWHsmTfIi9KDNWB4d4%C3%81BJXM%3D/). Directly downloaded with urllib and extracted using pypdf on 2026-10-04. PDF page 2 labels “2025 Annual Water Consumption” and defines peak demand as “Max observed demand”. Both numeric values are redacted. The water note covers tower, evaporative-system, and site-operation volumes, but gives no separate returns, withdrawals, evaporation, monthly use, annual electricity, or utilization. Page 1 identifies Agate as owned by Google and located in Lincoln.

Quality: primary company filing maintained by Nebraska, received stamp 2026-10-01. Recency passes. Verifies reporting year and stated accounting labels, **does not verify KOLN's numerical extraction**. The original September filing remains unavailable. Calling the field consumption does not supply a hydrological reconciliation.


### N1: NYC broad system denominator

[NYC DEP drinking-water page](https://www.nyc.gov/site/dep/water/drinking-water.page), current documentation, accessed 2026-10-04. Excerpt: “more than 1 billion gallons”. The daily delivery figure covers customers across New York state, not city residents alone. Use **roughly one billion gallons/day for NYC's broader supply system**, or “under twenty minutes” for the reported Lincoln amount. Do not imply NYC consumes precisely one billion gallons daily.

Quality: primary municipal documentation. Recency: current documentation access passes; exact observation/publication year not given.

### N2: NYC city-only candidate; unresolved internal discrepancy

[June 2026 Water Demand Management Update](https://www.nyc.gov/assets/dep/downloads/pdf/water/drinking-water/water-conservation-report2026.pdf), search-indexed primary PDF. Its page 5 table gives **990 million gallons/day for 2025**, but chart text on the same spread labels **989 MGD**. Researcher fetch was blocked; independent Gate0 reviewer subsequently fetched the PDF and confirmed both numbers. Therefore do not silently select a precise value or treat search extracts as complete verification. Both imply roughly one billion daily, so N1 supplies a safer approximate comparison. Exact table/graph disagreement needs full-file review before a city-only precise preset is used.

Quality: primary report, but direct verification incomplete. Recency: passes; verification status unresolved.

### A1: AWS regional withdrawal intensity

[AWS Sustainability data](https://sustainability.aboutamazon.com/products-services/aws-cloud), **2025 annual observations**, current page read directly 2026-10-04. Excerpt: “the volume of water withdrawn per kWh of IT load within a data center”. The table covers annual regional averages. Verified 2025 WUE values in **liters withdrawn per IT kWh**: global **0.12**, Stockholm **0.02**, Jakarta **2.85**, Singapore **1.57**, Tokyo **1.22**. Stockholm PUE is **1.09**; Jakarta **1.29**; global **1.14**. Their WUE ratio is **142.5**, a derived ratio of rounded reported figures. Label it roughly **140-fold**.

Quality: first-party operational dataset with technical definition and annual table, not independent audit. Although hosted on a corporate sustainability page, these are original operator measurements, not third-party marketing comparisons. Do not use its industry-comparison claim: AWS derives a withdrawal baseline from another study's consumption baseline and an assumed cooling concentration factor. The regional dataset is all AWS workloads, not AI-specific, and cannot predict identical-task water demand or local ecological harm.

Recency: current reporting for 2025 passes; precise publication day absent.

### P1: New integrated water/energy research

[Alston, Love, Haider, arXiv:2609.25437v1](https://arxiv.org/html/2609.25437v1), **2026-09-21**, read abstract, model sections, discussion, and limitations. Excerpt from §2.1.4: “does not establish”. This concerns the label liquid cooled. §1 directly distinguishes withdrawal from water not returned locally. §§4–5 model changes in indirect generator water and subbasin depletion, and explain why annual volume alone cannot establish local risk.

Quality: original research **preprint**, Michigan modeling study, not universal measured effect or established peer-reviewed finding. Limitations include assumed facility intensities, simplified load profiles and grid, mixed historical input years, and possible source-basin misassignment. It models facility operation plus generation; excludes manufacturing/construction/supply-chain water. No numerical tradeoff should be generalized to all cooling systems. Recency: passes 12-month bar.


### Energy primary source registry


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



### NIST26: exact unit conversion

[NIST Handbook44–2026 AppendixC](https://www.nist.gov/document/2026-nist-handbook-44-appendix-c),2026edition. PrintedC-9/C-21: “2.54 centimeters (exactly)” per inch; C-25: “231 cubic inches (exactly)” per US liquid gallon. Thus231×(2.54^3)/1000=3.785411784L exactly. Fundamental unit derivation in current2026reference. No empirical environmental assumption.

### Local primary-PDF verification artifacts

Root retrieved both PDF URLs on2026-10-04, outside reviewer's restricted network, after reviewer reported access limits. PDF content is primary source, not a paraphrase. Read-only reviewer can inspect local copies directly. Do not claim reviewer fetched public URLs independently.
- `/tmp/lincoln-water-2025.pdf` SHA256 `18a0c4658e5dc04375b495ba103f5b023936ad1c27fef216e9de65081dfeb977`; extracted page text `/tmp/lincoln-water-2025.txt`.
- `/tmp/agate-redacted-2025.pdf` SHA256 `74340e20e90e59328f83731c2bb026df4ebd35786ad1a3a6a35392ddcfc6b7df`; extracted page text `/tmp/agate-redacted-2025.txt`.

### D1: DOE cooling mechanism documentation

[DOE FEMP cooling-water guide](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers), undated current government engineering documentation accessed2026-10-04. Direct liquid cooling section: “heat is transferred to the condenser water loop”. Explains recirculating internalloop andexternalheat rejection. Diagramdated2019doesnotbecome2026performanceevidence. No measuredPUE/WUEvalues fromthisguide used. Undateddocumentation uses accessdateperprotocol; foundational mechanismonly.

## Claim-source matrix


“Excerpt E1”, etc., points to the literal bounded quotation above, avoiding repeated verbatim passages.

| ID | Proposed claim | Source / locator / excerpt | Status and permitted boundary |
|---|---|---|---|
| W01 | Historical household illustration: 82 gallons/person/day | E1 first bullet; excerpt E1 | SUPPORTED as EPA's USGS 2015 reference; page updated 2026, not a 2026 survey |
| W02 | Four people: 328 gal/day, 119,720 gal/365 days | W01 × 4 × 365 | DERIVED; illustrative household assumption, including outdoors |
| W03 | Lincoln2025municipal supply averaged37.6milliongal/day | L1p3, daily-average phrase: “37.6 million”; original PDF /tmp/lincoln-water-2025.pdf | PRIMARY verified by researcher+root retrieval and pypdf; independent reviewer network blocked, local copy supplied |
| W04 | Google lists Lincoln online in 2026 | G1 timeline; excerpt G1 | SUPPORTED current first-party documentation; mature 2025 rate inference invalid |
| W05 | News reports 13.299 million gal and 52.65 MW peak for Agate | K1; excerpt K1 | SUPPORTED news attribution; measurements PRIMARY-UNVERIFIED |
| W19 | KOLN already supplies a city daily-water comparison | K1 article context paragraph: “less than half”; links Lincoln2026-09-29 water record | Claim about what the news article says, not new operational measurement |
| W18 | Agate replacement report identifies2025 annualwater andpeak electricaldemand; valuesredacted | R1p2: “2025 Annual Water”, “Max observed demand”, “[ REDACTED ]”; p1stamp2026-10-01 | Primary original PDF fetched root2026-10-04, localcopy supplied; labels do not verify KOLN numericvalues |
| W06 | Reported volume equals 111 household-years or 8.49 hours of Lincoln average supply | W05 / W02; W05 / W03 × 24 | DERIVED CONDITIONAL on reported figure; volumes only |
| W08 | Broader NYC system delivers more than 1 billion gal/day | N1 paragraph 1; excerpt N1 | SUPPORTED current city documentation; includes upstate customers |
| W09 | Reported volume corresponds to roughly 19 minutes at nominal 1 billion/day | W05 / 1 billion × 1440 = 19.15056 | DERIVED CONDITIONAL; actual greater delivery implies shorter duration |
| W10 | Withdrawal differs from consumption; evaporation is one consumptive cooling pathway | P1§1: “not returned to the immediate water environment”; §1: “Evaporative cooling” | Current2026 model describes these foundational definitions/mechanisms; no numerical tradeoff extrapolation |
| W11 | AWS 2025 Stockholm 0.02, Jakarta 2.85 liters withdrawn per IT kWh | A1 table: “0.02”, “2.85”; definition excerpt A1 (withdrawals / IT kWh) | SUPPORTED first-party dataset; not consumption or AI-only |
| W12 | AWS regional withdrawal intensities differ about 140-fold | W11: 2.85 / 0.02 = 142.5 | DERIVED; rounded values, matched provider/year/metric |
| W13 | AWS global 0.12, Singapore 1.57, Tokyo 1.22 liters withdrawn per IT kWh | A1 tables: “0.12”, “1.57”, “1.22”; definition excerpt A1 | SUPPORTED scenario presets; not predictions |
| W14 | Liquid-cooled servers require a heat-rejection method beyond the internal loop | P1 §2.1.4; excerpt P1; D1 direct-liquid-cooling section excerpt | SUPPORTED mechanism; not all such facilities evaporate water |
| W15 | Cooling changes can shift water between facility and generators | P1 §§4.1, 5.1: “indirect consumption”; compare modeled cooling counterfactuals in surrounding paragraph | SUPPORTED modeled mechanism; universal numerical effect unsupported |
| W16 | Local risk depends on existing uses and availability, which change with time | P1 §1: “existing consumption and available water”; §4.4: “month to month”; complete paragraphs checked | SUPPORTED model framework; city annual volume is not spare capacity |
| W17 | WithdrawalWUE per ITkWh requires matching IT energy; facility energy needs PUE reconciliation | A1 definition excerpt A1, E11 overhead definition; dimensional arithmetic | DERIVED; no AWS consumption output |



### Energy claims


Quoted excerpts are intentionally capped at 25 total quoted words per distinct source across this file. Related rows use locators and paraphrases instead of adding quotations.

| Claim ID | Claim or figure input | Evidence / minimal quote | Status and limits |
|---|---|---|---|
| E01 | All data centers: estimated 485 TWh in 2025; central 950 TWh in 2030, around 3% global electricity in 2030 | IEA26 updated-outlook paragraph: “485 TWh in 2025 to 950 TWh in 2030” | Current; same E01 paragraph “3%”; modeled sector totals and central forecast. 3% denominator is projected global electricity demand in 2030, not 2025 energy use. |
| E04 | Task choice matters: reasoning, video and agents can require far more energy than simple text | IEA26 query-energy section: “hundreds or thousands of times more energy” | Current agency synthesis; no universal numerical prompt default, and no task-specific gCO2 or mL inferred. |
| E05 | Prometheusannounced1GWcapacity oncecomplete | META1 excerpt META1 “Once it’s complete”, “1-gigawatt of capacity” | Future announcedcapacity, IT/facilityboundaryunspecified |
| E06 | Hyperion: expanded Richland Parish project targets 5 GW compute capacity | META5 opening: “to 5 GW in compute capacity” | Current provider announcement. IT/facility boundary not fully defined. No annual MWh, WUE or metered water supplied. |
| E07 | PORTS-Pikecontracts~8GWIT futurecapacity; first800MWexpected2028 | OAI8excerptE07 “approximately 8 gigawatts-IT” and first800MW2028 excerpt | Future phasedcapacity; no measuredusage |
| E08 | PORTS developer says closed-loop air-cooled cooling; final expected water quantities still to be disclosed | OAI8 cooling bullet: “closed-loop, air-cooled”; subsequent quantitative-disclosure sentence | Current operator expectation. Do not infer zero total water or offsite power-generation water. This row deliberately adds no quotation beyond E07's same-source quota. |
| E16 | PORTS-Pike later buildout requires new power plants, including natural gas generation | OAI8 paragraph beginning “The first 800”: “natural gas generation” | Future developer plan; direct-water reduction cannot establish low electricity emissions |
| E09 | US residential-account electricity benchmark: 863 kWh/month in 2024, approximately 10,356 kWh/year | EIAHOME page 2: “U.S. Total 143,144,185 863 16.48 142.26”; landing: “Release date: October 7, 2025” | Current release / historical data year. Annual value derived from rounded monthly column; exclude claims about a particular household's makeup. Recheck if publishing later than October 7, 2026. |
| E10 | GW is power; GWh/TWh is energy over time | EIAUNIT: “One Watthour is the energy of one Watt used for one hour.” | Stable definition; undated publication explicitly flagged. Derivation uses calendar hours rather than announced-site measurement. |
| E11 | Total-facility electricity includes cooling, power distribution, and other overhead; PUE converts matched IT energy into total energy | GOOGPUE footnote example: “a PUE of 2.0 means that for every watt of IT power, an additional watt is consumed” | Current page, exact update date unavailable. Algebra below is definition/example-derived. PUE is not AI productivity or carbon intensity. No Google PUE assigned to Meta/OpenAI projects. |
| E12 | Location-based carbon uses geographically averaged generation factors; market-based attributes electricity through contractual instruments | GHGCUR printed page 7 existing definitions: “average energy generation emission factors”; “contractual instruments, or contractual instruments on their own” | Current document quotes existing definitions; proposed future changes do not erase accounting distinction. Do not claim certificates directly measure local marginal emissions. |
| E13 | Inventory accounting and consequential effects of added electricity demand answer different questions | GHGCUR printedp4: “consequential accounting”; full section distinguishes inventory from consequential metrics | Current2025methoddocument; no quantified netimpact asserted |
| E14 | Same electricity can have different emissions in different grid mixes | EPAGRID Q9: “CO2 output emission rates may fluctuate on an annual basis due to a change in the resource mix” | Current official explanation; no asserted measured 2026 regional factors. Illustrative 50/400/800 gCO2e/kWh values, if used, must be labeled hypothetical. |
| E15 | Efficiency gains do not mathematically guarantee total resource reduction | Scenario algebra: total = task count × average resource use/task. IEA26 E01+E04 provide evolving-world context | Mathematical conditional. A plot can show a 50% cost decrease with 3× volume -> 1.5× total. It does not establish a causal rebound effect or a real forecast. |


### Original mathematical and editorial claims

| ID | Claim | Evidence / scope |
|---|---|---|
| M01 | GW times 8760h times average electrical-load fraction gives annual IT energy | Unit definitions E10; 365-day calendar; derived, not observed project demand |
| M02 | Site withdrawal in US gallons = ITkWh × compatible withdrawalWUE /3.785411784 | W17 plus NIST26 exact definitions; derived conversion 231×2.54³/1000; arithmetic |
| M03 | 100MW/1/5/8/10GW full IT load yields .876/8.76/43.8/70.08/87.6TWh | M01; generic scenarios |
| M04 | 1GWIT full-load at0.12L/kWh yields277.7milliongal/year | M01/M02/W13; site withdrawal scenario, not prediction |
| M05 | 1GWIT scenario corresponds to about850000 residential-account years | M01/E09;2024account denominator, not family-specific |
| M06 | Three summer months at peak factorp and nine at(12-3p)/9 preserve annual volume, p=1..4 | Original hypothetical scenario; monthly equal-duration approximation explicitly labeled, no actual facility seasonal curve |
| M07 | All sitewithdrawals supplied100% by modeledutility; hypothetical spare utility delivery supply means utility DELIVERY capacity remaining AFTER existing users and reserves | Definition of scenario; compare seasonal demands with fixed hypothetical headroom, cannot infer actual city capacity |
| M08 | ElectricityCO2e = ITkWh ×PUE ×chosen gCO2e/kWh; metric-tonne conversion1e6 | E11/E14; inventory scenario, not marginal causal estimate; exclude embodied effects |
| M09 | Required normalized IT electricity =task-count multiple × ITenergy/task fraction; fixed workloadmix, abovebaseline needsadditionalcapacity/time | Algebra; no empirical rebound causality claim |
| M10 | 1TW continuous load would yield8760TWh/year; no verified singleTWcampus located | M01; arithmetic only. Use sector TWh rather than imply operating terawatt campus |
| M11 | A household/city volume equivalent cannot settle environmental harm | W10/W16: unknown returned fraction, source, season, local headroom. Editorial inference, explicitly argued |
| M12 | Operational water accounting excludes construction and equipment manufacturing | P1§2: “manufacturing”, paragraph states these activities outside model scope | Scope boundary, not quantified lifecyclefootprint |
| M13 | A universal prompt footprint cannot be obtained from capacity announcement or averageWUE alone | E04/W17: need taskenergy, routing, metric boundary; inference |
| M15 | All water supplied100% by modeledutility. Worked1GWIT scenario:8.76TWhIT,10.512TWhfacility atPUE1.2,277.7MGsitewithdrawalatWUE.12;summer2×average1.52MG/day exceeds chosen1MG/day headroom;400g/kWh yields4.2048MtCO2e | M01,M04,M06,M07,M08; all hypothetical jointinputs, no namedsiteforecast |
| M14 | Disclosure request includes definedworkload/meanresourcepermatchedtask and year, monthly sitewithdrawal/consumption/source, IT and facilitykWh, load, build stage, grid/carbonmethod, local capacity | Editorial recommendation based W04/W10/W16/W17/E07/E11/E12/E13; no legal requirement asserted |

Quotes are evidence snippets, not prose to repeat. W05 proves what KOLN reported, NOT the truth of underlying measurements. KOLN is the motivating news event, not a primary operational dataset. All numeric operations based on it remain explicitly conditional. Current government/operator pages may describe historical observations; dates are retained. Undated EIA unit definition is used as a definition and arithmetic anchor, not an evolving empirical observation. No USGS2018/DOE2019 evolving empirical row remains load-bearing.
## Related posts on augusteo.com



## Outline

Working title locked for drafting: **Millions of gallons don't prove AI is an environmental disaster**. Vic requested aggressive declarative framing; this claim is bounded to the evidentiary limits of a volume alone. No assertion of zero environmental harm or universal media wrongdoing.

AI attribution boundary: Lincolnreportedsitevolume, AWSregionalWUE, and IEAsectorTWh contain non-AI workloads or unknown AI allocation. Explicitlystateatopeningthisis infrastructure-accountingcontext forAIclaims, not an estimate ofAI-onlytotalfootprint. Repeatatsectorforecastandpromptcoda.

Reader throughline: Act1(§§1–2) assess one reported annual water amount, translate it, identify what it measures, Act2(§§3–6) then test a larger campus under varying engineering and local conditions. Act3(§§7–8) finish with the same reader evaluating their own AI use and demanding useful facility disclosures.

| Section / heading | Reader's unresolved question and resulting intuition | Claims / visuals |
|---|---|---|
|1. Thirteen million gallons in household and city units|Reported Lincoln amount becomes111four-person household-years,8.5hLincolnsupply,<20min broaderNYC supply. Acknowledges KOLN already supplies a city comparison, numerical values remain attributed. The amount is2025 before operator-listed2026online; cannot mature-runrate extrapolate.|W01–W06,W08,W09,W18,W19;Fig1|
|2. Where the water goes|Equal supply volumes can yield different local depletion. Distinguish withdrawals, return, consumption and offsitegeneration. Consumption means no return to the immediate source environment; do not make a global persistence assertion. Two toy cases withdraw100units from the same depicted sourceenvironment:20returnthere/80evaporateversus80returnthere/20evaporate. The destination and timing of returns are explicit. No assumed fraction transfers to Lincoln or the1GWscenario. Liquid cooling inside servers does not settle external heat rejection.|W10,W14,W15,M11,M12;Fig2|
|3. From100megawatts to8gigawatts|Lincoln cannot establish full-buildout impact elsewhere. Capacity is power; annualenergy requires time and averageelectricalload. ExplainITboundary andPUEoverhead. Generic100MW/1/5/8/10GWenergytable plusresidentialaccount equivalents. Named1/5/8GWannouncements table clearlyfuture;MetaITboundaryunspecified.|E05,E06,E07,E09,E10,E11,M01,M03,M05|
|4. A gigawatt doesn't specify a water bill|Water still needscompatibleintensity. AWSmatchedregion/year/methodshowsvariation. ExplainwithdrawalWUEperITkWh andfull-load1GW .12scenario277.7MGyr; neitherAWSregionaldata norcalculatorpredictsnamedcampuses. Power/load/WUE sweeptranslatesmegawattstogallons visibly.|W11–W13,W17,M02,M04;Figs3and4|
|5. The summer demand a yearly total hides|Evencomputedannualwater cannotestablishharm: comparedemandwith sparewatercapacityafterexistingusers/reserves. Assumefacilityobtains100%ofwaterfromthisutility. DefineheadroomasUTILITYDELIVERYcapacityafterexistingusersandreserves, NOTsource-basinavailabilityorpermittedabstraction. Belowline doesnot proveecologicalsafety; returnfractions/basinseasonalitystillunknown. Toycurvepreservesannualvolume, threeequal-durationmonthspeak andninecompensate; originalarithmeticdemonstratescapacitythresholdwithoutclaimactualseasonalprofile. Explainflow/monthely availability andreturnlimits.|W16,M06,M07,M11;Fig5|
|6. Electricity supply and carbon accounting|Lowdirectwater cannot settleenvironmentalassessment. PORTSclosedloopplanstillrequiresgenerationincludingnaturalgas. PUE×ITenergy givesfacilityenergy; chosen inventorycarbonfactorillustratesvariation. Explainmarketvslocationaccounting, averagefactorvsmarginalcausalimpact. Calculatornoembodiedhardware/netbenefits.|E08,E11–E14,E16,M08,M12;Fig6|
|7. From sector electricity to a prompt|Campuscapacityscenarioisnotindustryannualmeasurement. IEA485TWh2025estimate,950TWh2030centralforecast~3%global electricity2030,allDCnotAIalone. Terawattpower≠TWhenergy;noverifiedsingleTWcampus. Introduce E04 task variation BEFORE the efficiency model: energy depends on definedtask, outputlength, model and routing. Define one modeledtask as one repetition of the SAME fixed workload and hold workload mixconstant. Then ask whether improved efficiency alone defeats an aggregate growth concern. Normalize the same1GWscenarioresourcebudget and exploreexactefficiencyneededat2×/3×/5×workloadvolumetomaintainit; offsetcurveanswersspecificunknownbudgetquestion. Algebra doesnotexplain orpredictIEAforecast.|E01,E04,E10,E15,M09,M10;Fig7|
|8. The measurements I want published|First return to same1GWITscenario:277.7MG/year,summer2×average1.52MG/dayversuschosen1MG/daydeliveryheadroom;PUE1.2and400g/kWhyield4.20MtCO2e. Stateconditionaldeliveryconstraint, actualwaterconsumption/source/localhydrologyunknown,carboninventorynotmarginalimpact. Applyeachcheckratherthanleavingreaderwithalist. Then use §7result: estimating aggregate electricity requires a defined workload basket and mean energy/task, and estimating oneprompt requires its own taskenergy/location/accounting. CampuscapacityandregionalWUEprovide neither. Thisiswhy workload-definition and resource/defined-taskmean belong in disclosure requests. Writer'sexplicitjudgment:assessusefulnessandscope;environmentalverificationrequiresmonthlywithdrawal/consumption/source,operatingstage,kWh/loadandlocalheadroom,carbonmethod. No inventedpersonaltesting. ReassessoriginalLincoln headline:111householdvolumeyears isstill aconditionalvolumecomparison,notAI-onlyuseorlocalharm;2025observationstillnotmature2026operation. Endwithconcretedisclosurerequestincludingdefined-taskintensity.|E04,M13–M15|

### Locked figure table

All axes/values accessible in HTML readouts or caption. Existing paper palette; text#1A1A1A. Initial default rendered server-side; each island hydration independent. User requested multiple coded visualizations. Interactive overrides are genuine continuous sweeps with changed outputs, no decorative animation.

|#|Name / type|Specific mechanism and implementation contract|Inputs / default / boundaries|Override / source|
|---|---|---|---|---|
|1|VolumeScale /interactive-canvas|Reciprocal household-equivalent changes with householdsizeanddailyusage; samevolume staysfixed, city durationsfixed. Draw reciprocal household-years curve against per-persondailyhomewater50–150; fixedreportedvolume, curvechangeswithhouseholdsize andselectedpointmoveswithdailywater. Captionexplainswhythecomparisondependsonchosenbenchmark; full accessibletext.|Reported13.299MGfixed; household1–8default4; dailyhome50–150gal/persondefault82. Year365days.|Continuous sensitivity to denominator;W01,W06,W09|
|2|WaterBalance /static-svg|Two source→site→atmosphere/return-to-same-source flow diagrams; eachwithdraws100, localreturns20versus80, localconsumption80versus20. Clearlyhypothetical; noGooglemeasurement orhouseholdreturnrate.|100unitswithdrawninbothcases;returns20/80toIMMEDIATEsourceenvironmentonmodeledperiod;evaporation80/20. Arbitrarytoybalances; defs adjacent.|Static mechanism;W10,M11|
|3|RegionWater /static-svg|AWS2025regions Stockholm.02,Tokyo1.22,Singapore1.57,Jakarta2.85 onzero-to3L/ITkWhlinearaxis;textsamevalues outsidepoints, global.12referencecaption.|Withdrawals,allworkloads,operator-reportedannualregion averages; nottaskmatchedharm.|Static matchedcomparison;W11–W13|
|4|SizeExplorer /interactive-canvas|ITcapacity×hours×load→ITenergy;compatiblewithdrawalintensity→sitewater. Plotannualwithdrawalsagainstcontinuouscoolingintensity0–3, selectedpointchangeswaterintensity, capacity/loadchangeabsolutevolumescaleandaccessibleTWh/gallons/householdreadouts; showthecompatibleITdenominatorinthechart. Noactualsiteforecast.|IT100–10000MWdefault1000; averageelectricalload10–100%default100;withdrawalWUE0–3L/kWhdefault.12. ShowTWh,MG/year,householdvolumeyears,accountenergyyears.|Continuous scale/load/intensitysweep;M01–M05,W13,W17|
|5|LocalHeadroom /interactive-canvas|Sameannualvolumecangeneratepeakdemandabovehypotheticalfixed utilityDELIVERYheadroom. Plotmonthlyflows andcapacitythreshold;durationapproxexplicit.|Annualsitewithdrawals100–2000MGdefault277.7, supplied100%bydepictedutility; peak1–4default2;utilitydeliveryheadroom.1–5MG/daydefault1;threeequal-durationpeakmonths.|Continuouspeakandcapacitysweep;M06,M07,W16|
|6|EnergyCarbon /interactive-canvas|Atfixed1GWIT,loadandPUEgivefacilityenergy;inventoryintensityconvertsitintoMtCO2e. Lineargraphintensity0–800,currentpoint.|Averageelectricalload10–100%default100;PUE1–1.5default1.2;illustrativeintensity0–800gCO2e/kWhdefault400. Inventoryarithmetic,noempiricalgridpresetorcausalimpact.|Continuousenergy/intensitysweep;E11,E14,M08|
|7|EfficiencyGrowth /interactive-canvas|Normalizedtotals=taskmultiple×resourceper-taskfraction;iso-totalcurve resource/task=1/taskmultiple, currentpointabove/belowcurve givesincrease/decrease; readersfindexactefficiencyneededtooffsetgrowth. ShowREQUIREDITELECTRICITYrelative to baseline, notwater. >1×requiresadditionalcapacityor moreelapsedtime; notrealizableannualconsumption withinunchangedfull-load1GWsite. Originalworkloadscenario,notforecast.|Taskcount1–10×default3;per-taskITelectricityfraction.1–1default.5;requiredITelectricitydefault1.5× (13.14TWh demandedagainst8.76TWhbaseline; additionalcapacity/time required).|Continuoussweepofproduct;E15,M09|

Transitions locked: §1volume→§2unknownwaterboundary; §2bounded2025observation→§3unknownmaturebuildout and energy; §3ITenergy→§4unknownwithdrawalintensity; §4annualwithdrawals→§5unknownmonthlydeliveryandbasinconditions; §5waterassessment→§6unresolvedgenerationandcarbon; §6onecampus→§7unknownaggregateindustrygrowth; §7sectoraggregate→§8reassess1GWscenariousingallchecksandthenaskwhetheritcanallocateaprompt.

Related-post scan: no published environment/data-center post found. Multi-GPU training is an unpublished draft; avoid linking readers to a route not available on public site. Related-posts section intentionally empty.

## Codex research review

### Invocation1

**Gate 0 has STRUCTURAL issues. The matrix is not ready for drafting.**

1. **STRUCTURAL — W10: undefined source and incomplete evidence for the central water distinction.**  
   “Withdrawal and consumption differ; evaporation counts as local consumption” cites **U1**, which appears nowhere in the source registry. P1’s introduction supports the withdrawal/consumption distinction, but the notes contain no bounded quotation supporting it or the evaporation clause. The only recorded P1 excerpt concerns heat rejection. Define U1 or replace it, and attach evidence covering both assertions. This gap propagates into M11 and the water-flow illustration. [P1](https://arxiv.org/html/2609.25437v1)

2. **STRUCTURAL — W03, W06 and W07: the Lincoln denominator remains independently unverifiable in this review.**  
   Direct retrieval of L1 returned HTTP 403; the Python fallback failed because network name resolution was unavailable. Search-indexed text corroborates the quoted pumping figure and daily average, but I could not inspect the original PDF. **W03 must be flagged UNVERIFIABLE here**, rather than independently verified. W06 and W07 inherit that verification gap in addition to their explicitly conditional KOLN numerator. This is an access limitation, not evidence of fabrication. [Lincoln report](https://www.lincoln.ne.gov/files/sharedassets/public/v/12/ltu/utilities/water-system/water-quality-report.pdf)

3. **STRUCTURAL — R1 has no matrix row, despite supplying load-bearing qualifications for the opening example.**  
   The notes use R1 to establish **2025 as the reporting year**, identify the reporting fields, explain their boundaries, and distinguish the replacement filing from KOLN’s numerical extraction. Those assertions change what readers can infer from W05–W07, yet none has a corresponding row. Add rows for the reporting period and accounting boundaries.  
   
   R1 also remained **UNVERIFIABLE** in this review: both retrieval routes failed. Its excerpts and redaction status cannot receive independent verification from this audit.

4. **STRUCTURAL — multiple empirical rows violate the quoted-evidence contract.**  
   Locators and paraphrases are not quoted excerpts. The following rows lack recorded quotations covering their load-bearing assertions:

   | Rows | Evidence missing from the recorded excerpts |
   |---|---|
   | W11, W13 | AWS regional numerical values; A1’s excerpt defines WUE but contains none of these values |
   | W15, W16 | Cooling tradeoffs and spatial/temporal water risk |
   | W17 | The equations and PUE reconciliation |
   | E03 | AI-focused electricity tripling |
   | E08 | Planned cooling configuration and pending water disclosure |
   | E13 | Inventory versus consequential accounting |
   | M12 | Construction/manufacturing outside the operational boundary |

   Several compound rows also have **partial** excerpts: W03 omits its daily average; E01 omits the 3% denominator; E02 omits AI-focused growth; E05 omits the multiple-building scope; E07 omits buildout through 2032 and its contingencies.

   I found the AWS values in the operator’s table and the energy assertions in their cited sources. The defect is the matrix’s evidence contract: **“SUPPORTED” labels cannot substitute for the missing passages.** Attach bounded excerpts or explicitly link each assertion to an excerpt elsewhere in the notes. [AWS dataset](https://sustainability.aboutamazon.com/products-services/aws-cloud), [IEA summary](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary), [Scope 2 consultation](https://ghgprotocol.org/sites/default/files/2025-10/GHG-Protocol-Scope2-Public-Consultation.pdf)

5. **STRUCTURAL — M02: the exact gallon conversion has no source.**  
   The constant **3.785411784 liters per US liquid gallon** feeds every gallon-based scenario, including M04. It is an external unit definition, not an original mathematical assumption. Neither W17 nor the cited energy-unit definition establishes it. Add an authoritative conversion source and excerpt.

6. **COSMETIC — E06–E08: asymmetric selection of campus evidence.**  
   The matrix retains capacity announcements and PORTS-Pike’s cooling plan while omitting relevant electricity-supply details from those same sources. Meta’s announcement describes funding **seven new natural-gas generating plants** alongside other resources; OpenAI says further development requires new generation **including natural gas**. These deserve rows if the campus examples carry into the emissions discussion. They do not contradict the narrow claim that gallons alone cannot establish harm, but leaving them out weakens the promised accounting context. [Meta announcement](https://datacenters.atmeta.com/2026/07/deepening-our-investment-in-richland-parish-louisiana/), [OpenAI announcement](https://openai.com/index/openai-joins-ports-pike-project/)

7. **COSMETIC — N2’s verification status is outdated.**  
   The PDF was retrievable during this review. Its extracted text contains **990 MGD in the table and 989 MGD in the chart**, confirming the internal discrepancy. Update the access-status note while retaining the prohibition on silently choosing a precise value. N2’s exclusion from the calculator is documented, not a silently dropped contradicting source. [NYC report](https://www.nyc.gov/assets/dep/downloads/pdf/water/drinking-water/water-conservation-report2026.pdf)

8. **COSMETIC — M08: specify metric tonnes.**  
   Dividing grams by \(10^6\) yields **metric tonnes**, not US short tons. “Ton conversion” leaves the calculator’s output unit ambiguous.

No fabricated quotation was identified among the accessible passages. **W05/K1 fails the primary-source tree for operational measurements**, as already disclosed; its actual claim is news attribution, so that alone is not a structural defect. [KOLN article](https://www.1011now.com/2026/09/30/more-questions-than-answers-about-lincolns-google-data-center-water-electricity-usage/)

The recency cutoff is **2025-10-04**. No established dated source is older than that cutoff: EIAHOME is 362 days old, GHGCUR 349, and GHGFAQ 321. Undated documentation uses the protocol’s recorded access date; U1 has no assessable provenance. W01 and E09 are explicitly historical benchmarks, not claims about measured 2026 household use. EIAHOME requires rechecking if publication occurs after October 7. [EIA release record](https://www.eia.gov/electricity/sales_revenue_price/)

Repair: undefinedsource removed; necessary claims split/trimmed and bounded excerpts supplied; unnecessary AI-growth rows removed; new NIST26unit derivation; primaryPDFlocalcopies provided to resolve reviewer network limitations. News numbers still conditional. Fossil-generationrow E16added, metrictonnes specified. Invocation2passed: no structural issues found. Local primary originals resolved network-access limitation.

### Invocation2

no structural issues found

## Codex outline review

### Invocation1

Review identified missing reassembly, unclear utility/basin capacity boundary, missing AI workload attribution, weak transitions and return destination, and three suggested static conversions. Narrative and boundary repairs applied, including a joint1GW worked example and explicit AI-attribution limits. Figure2 now depicts two equal-withdrawal cases returning to the same source environment. Headings made literal.

[Full findings](ai-environmental-impact-codex-outline-20261004.md)

Findings:11 STRUCTURAL (including3 type suggestions),1 COSMETIC.

Type suggestions addressed without a re-type: Vic explicitly requested coded interactive visualizations and household/city contextual exploration. The developer instruction permits routine implementation decisions within that already authorized scope without re-requesting permission. Retain interactive-canvas contracts for figures1,6,7; figure1 now plots the reciprocal curve, figure7 plots the nonlinear iso-total threshold, figure6 remains a transparent carbon sensitivity calculator with explicitly illustrative inputs. These are continuous parameter sweeps covered by the skill's override clause. Static comparisons can also explain them, but that alone does not negate the user's chosen interactive format. No type changed; no truthfulness finding overridden. Rerun adjudicates revised mechanisms and connected outline.

### Invocation2

1. **STRUCTURAL — §7 / Figure 7: the normalized resource model has an undefined physical boundary.**  
   §7 anchors the graph to the same **1 GW, full-load scenario**, but Figure 7 defaults to **1.5× total resources**. If that output means annual IT electricity, it requires **13.14 TWh**, exceeding that campus’s **8.76 TWh annual capacity** under M01/M03. The contract never distinguishes required resources across additional capacity from realizable consumption at the original campus.

   It also proposes showing “water/energy” with one resource-per-task fraction. E15/M09 support the multiplication for an individually defined resource; they do not establish that water and electricity change together. Earlier sections explicitly vary their conversion factors independently.

   **Fix:** define the output as **required IT electricity relative to the baseline**, with values above 1× requiring more capacity or more elapsed time. If showing water too, explicitly hold WUE fixed and identify that as a hypothetical assumption. Retain the interactive sweep; clarify its model.

2. **STRUCTURAL — §§7–8 / Figure 7: the efficiency branch fails the deletion test.**  
   Remove §7 and §8 still delivers its worked water/carbon assessment, explains why facility totals cannot allocate a prompt, and requests disclosures. Neither the sector forecast nor the efficiency threshold supplies a prerequisite that §8 uses. The transition “sector aggregate → can it allocate a prompt?” names a change of scale without making the preceding efficiency mechanism necessary.

   Worse, Figure 7 introduces an average resource cost per “task” **before §8 introduces the enormous differences between tasks through E04**. Readers manipulate an undefined workload unit, then learn why that unit is unstable.

   **Fix:** retain the required sector totals, but introduce task definition, workload mix, and E04 before the efficiency sweep. Then carry its result into the ending: an aggregate resource target requires a specified workload mix and average resource intensity; campus capacity and regional WUE do not provide either. Reorder or merge the efficiency discussion accordingly.

Repair: model output now required IT electricity relative to fixed baseline, not realizable consumption within unchanged1GWcampus. Morethan1× needs additionalcapacity or elapsedtime. Figure7 moved after currenttask-variation discussion and explicitfixed-workloaddefinition. It now addresses the electricity-budget threshold used by the disclosure coda. No water output and no implicitconstantWUE.


### Invocation3

1. **STRUCTURAL — §5 / Figure 5 / §8 / M07 and M15: site withdrawals are compared with utility delivery capacity without a supply-source assumption.**

   Figure 5 takes **total annual site withdrawals** as its input but compares the resulting seasonal flow with **spare utility delivery capacity**. Nothing specifies that the utility supplies all those withdrawals. Defining the headroom precisely does not establish a matching numerator.

   This affects the ending’s worked conclusion: **1.52 million gallons/day exceeds 1 million gallons/day of headroom only if enough of that demand reaches the utility.** With a hypothetical 50% utility share, utility demand would be approximately **0.76 million gallons/day**.

   **Fix:** explicitly assume the toy facility obtains **100% of its water from the depicted utility**, and carry that assumption through Figure 5, M15, and §8. Alternatively, introduce a utility-supplied fraction and compare only that flow with delivery headroom. Keep source-basin availability and ecological effects separate. The missing assumption needs a matrix entry or an amendment to M15.

Repair applied: toy facility obtains100% of its withdrawal volume from the depicted utility. That explicit source assumption now travels through M07/M15, figure5caption and workedexample. This is a minor clarification of an original hypothetical input, not new empirical research, a type change or a narrative restructure. Gate1's specific instruction says rerun if substantial; no fourth full invocation performed. Finaldraftreview will verify this assumption in actualprose and code. No claim that invocation3returned clean.

## Voice gate

### Invocation1

The title, frontmatter description, dek, and every heading pass. Findings below use the matching repository file’s line numbers.

[src/content/blog/ai-environmental-impact/index.mdx:48](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:48)  
SENTENCE: The cooling label also needs a boundary.  
FAMILY: withheld-referent  
MISSING: The liquid-cooling label and the distinction between transferring heat inside a server and releasing it outdoors.  
REWRITE: Liquid cooling inside a server doesn't specify how the facility releases heat outdoors.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:64](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:64)  
SENTENCE: Cooling and other facility overhead come later.  
FAMILY: reader-choreography  
MISSING: Whether cooling and facility overhead are included in the stated IT capacity.  
REWRITE: IT capacity excludes cooling and other facility overhead.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:88](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:88)  
SENTENCE: Now we can estimate IT electricity under stated assumptions.  
FAMILY: reader-choreography  
MISSING: The operation that converts capacity and average load into annual electricity use.  
REWRITE: Annual IT electricity equals IT capacity multiplied by the year's average electrical-load fraction and the number of hours in the year.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:146](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:146)  
SENTENCE: Carbon reports add another distinction.  
FAMILY: withheld-referent  
MISSING: Location-based versus market-based emissions accounting.  
REWRITE: Carbon reports distinguish location-based emissions from market-based emissions.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:150](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:150)  
SENTENCE: Apply the checks together to our reference scenario.  
FAMILY: reader-choreography  
MISSING: The comparison used to test delivery capacity and the multiplication used to calculate emissions.  
REWRITE: The utility-capacity test compares summer water demand with delivery headroom; the emissions calculation multiplies annual facility electricity by the chosen emissions factor.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:152](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:152)  
SENTENCE: I can state those limits without pretending either the water or electricity demand is harmless.  
FAMILY: staged-significance  
MISSING: The remaining assessments of local water loss and changes in electricity generation. The sentence announces the writer's caution instead.  
REWRITE: The calculated water withdrawals and electricity use still require assessments of local water loss and the power system's response.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:162](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:162)  
SENTENCE: This is where terawatt-hours are useful.  
FAMILY: staged-significance  
MISSING: The annual industry electricity use being expressed in that unit.  
REWRITE: The IEA expresses annual data-center electricity use in terawatt-hours.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:166](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:166)  
SENTENCE: That affects the efficiency argument too.  
FAMILY: withheld-referent  
MISSING: How workload mix changes average electricity per task independently of efficiency improvements.  
REWRITE: A changing workload mix can alter mean electricity per task even if each workload's energy requirement stays the same.  
TOUCHES-SOURCED-CLAIM: no

[src/content/blog/ai-environmental-impact/index.mdx:194](/Users/vic/dev/augusteo.com-astro/src/content/blog/ai-environmental-impact/index.mdx:194)  
SENTENCE: Return to Lincoln's reported 13.299 million gallons.  
FAMILY: reader-choreography  
MISSING: A direct statement of the reported quantity, source, and reporting year instead of an instruction to revisit it.  
REWRITE: KOLN's reported 2025 water total for Google's Lincoln site is 13.299 million gallons.  
TOUCHES-SOURCED-CLAIM: no

The paragraph scan found no additional cases of concrete nouns or causal detail being replaced by quotable formulations.

| Section | Result | Findings |
|---|---|---:|
| Frontmatter and dek | PASS | 0 |
| 1. Thirteen million gallons in household and city units | PASS | 0 |
| 2. Where the water goes | FAIL | 1 |
| 3. From 100 megawatts to eight gigawatts | FAIL | 2 |
| 4. A gigawatt doesn't specify a water bill | PASS | 0 |
| 5. The summer demand a yearly total hides | PASS | 0 |
| 6. Electricity supply and carbon accounting | FAIL | 3 |
| 7. From sector electricity to a prompt | FAIL | 2 |
| 8. The measurements I want published | FAIL | 1 |
| References | PASS | 0 |

**Total: 9 findings.**

Applied9 literal, mechanistic repairs (all labeled TOUCHES-SOURCED-CLAIM:no), with plain synonyms where helpful. Findings were isolated leading or transition sentences, and reviewer explicitly found no paragraph-level substitution or heading/dek failures. This supports routine prose repair within Vic's already explicit request to write in his voice; no invented anecdotes or claim changes. Invocation2pending on finalfigures/captions.

## Link and freshness audit

All external sources re-fetched2026-10-04. Water PDF hashesunchanged, arxiv remainsv1; energydata/sourceclaimsunchanged. See [water audit](ai-environmental-impact-water-link-audit.md) and [energy audit](ai-environmental-impact-energy-link-audit.md). KOLNidentitycorrectedtonewsreport. CoolingmechanismmovedtocurrentDOEgovernmentdocumentation andAlston-derivedprosetrimmed; source-budgetcheckwillbe repeatedaftercaptions. EIArelease mustberechecked if publicationfallsafterOct7. Figurecode/renderverificationis separate, stillpending.

## Resume here

Last touched: 2026-10-04.

### Phase status

| Phase | Status | Output |
|---|---|---|
| 1. Lock-in | scope revised by Vic; title provisional | Spec and Throughline |
| 2. Research / fact-check | done | Matrix passed Gate0 after repairs; source bounds explicit |
| 3. Outline + figure list | repaired | ThreeGate1reviews; final utility-source assumption clarified; types retained |
| 4. Draft prose | done | Eight sections drafted with citations; voice check clean |
| 5. Implement figures | in progress | Seven contracted figures; prose placeholders ready |
| 6. Playwright review | pending | None |
| 7. Pre-ship review | pending | None |

### Codex history

| Date | Gate | Outcome | Findings file |
|---|---|---|---|
|2026-10-04|0 (research), invocation1|structural repairs applied|## Codex research review|
|2026-10-04|0 (research), invocation2|clean; structural-fixed|## Codex research review|
|2026-10-04|1 (outline), invocation1|structural repairs applied|notes/ai-environmental-impact-codex-outline-20261004.md|
|2026-10-04|1 (outline), invocation2|two new model-boundary/placement repairs applied|## Codex outline review|
|2026-10-04|1 (outline), invocation3|one utility-source assumption clarified; finaldraft verification pending|## Codex outline review|

### Suggested next batch

Draft all eightsections; implementsevenfigures; verifyactualproseandfigureassumptions in finalreview. Do not request another approval simply to repeat Vic's accepted scope edits. Title selection can remain open while research proceeds.

### How to resume from a fresh context

Read this file, explainer-authoring SKILL.md, and the canonical project memory pointer. This session completed brainstorming and source discovery, not a full blog draft. Preserve the user's desire for contextual comparisons, scientific evidence, multiple scales, coded interactive visuals, and a forceful title. Leave drafts unpublished; Vic controls draft:false.

### Hard rules to keep applying

Keep estimates, measured values, capacity announcements, and hypothetical scenarios distinct. Reconcile water and power accounting boundaries. Water volume comparisons do not determine local harm. Preserve old data years. Never invent Vic's personal experiences. No em dashes. Do not change unrelated existing edits in scripts/sync-content.ts.
