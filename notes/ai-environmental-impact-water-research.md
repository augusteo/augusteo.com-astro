# Water research for AI environmental-impact explainer

Accessed 2026-10-04. Isolated research output; no MDX or main tracker edits. All quoted excerpts below are short and verbatim, with fewer than 25 quoted words per source. Source IDs refer to the linked sources, not browser-internal IDs. Quantities are US gallons where gallons appear.

## Source records and bounded evidence

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


### N1: NYC broad system denominator

[NYC DEP drinking-water page](https://www.nyc.gov/site/dep/water/drinking-water.page), current documentation, accessed 2026-10-04. Excerpt: “more than 1 billion gallons”. The daily delivery figure covers customers across New York state, not city residents alone. Use **roughly one billion gallons/day for NYC's broader supply system**, or “under twenty minutes” for the reported Lincoln amount. Do not imply NYC consumes precisely one billion gallons daily.

Quality: primary municipal documentation. Recency: current documentation access passes; exact observation/publication year not given.

### N2: NYC city-only candidate; unresolved internal discrepancy

[June 2026 Water Demand Management Update](https://www.nyc.gov/assets/dep/downloads/pdf/water/drinking-water/water-conservation-report2026.pdf), search-indexed primary PDF. Its page 5 table gives **990 million gallons/day for 2025**, but chart text on the same spread labels **989 MGD**. Direct web fetch errors and Python fetch 403 prevented visual inspection. Therefore do not silently select a precise value or treat search extracts as complete verification. Both imply roughly one billion daily, so N1 supplies a safer approximate comparison. Exact table/graph disagreement needs full-file review before a city-only precise preset is used.

Quality: primary report, but direct verification incomplete. Recency: passes; verification status unresolved.

### A1: AWS regional withdrawal intensity

[AWS Sustainability data](https://sustainability.aboutamazon.com/products-services/aws-cloud), **2025 annual observations**, current page read directly 2026-10-04. Excerpt: “the volume of water withdrawn per kWh of IT load within a data center”. The table covers annual regional averages. Verified 2025 WUE values in **liters withdrawn per IT kWh**: global **0.12**, Stockholm **0.02**, Jakarta **2.85**, Singapore **1.57**, Tokyo **1.22**. Stockholm PUE is **1.09**; Jakarta **1.29**; global **1.14**. Their WUE ratio is **142.5**, a derived ratio of rounded reported figures. Label it roughly **140-fold**.

Quality: first-party operational dataset with technical definition and annual table, not independent audit. Although hosted on a corporate sustainability page, these are original operator measurements, not third-party marketing comparisons. Do not use its industry-comparison claim: AWS derives a withdrawal baseline from another study's consumption baseline and an assumed cooling concentration factor. The regional dataset is all AWS workloads, not AI-specific, and cannot predict identical-task water demand or local ecological harm.

Recency: current reporting for 2025 passes; precise publication day absent.

### U1: Water definitions, foundational reference

[USGS Water Science Glossary](https://www.usgs.gov/water-science-school/science/water-science-glossary), dated **2018-06-15**, read 2026-10-04. Excerpts: “water removed from a ground- or surface-water source for use” and “removed from the immediate water environment”. First defines withdrawal; second is part of consumption definition. Consumption includes evaporation and other ways water stops being immediately available locally. USGS defines domestic water use to include household tasks and watering lawns/gardens.

Quality: authoritative government foundational definitions; not new original science. Recency: old publication, foundational stable terms. If the gate does not permit this foundational status, use P1's directly stated 2026 withdrawal/consumption definitions instead. Do not relabel 2018 as newly published.

### P1: New integrated water/energy research

[Alston, Love, Haider, arXiv:2609.25437v1](https://arxiv.org/html/2609.25437v1), **2026-09-21**, read abstract, model sections, discussion, and limitations. Excerpt from §2.1.4: “does not establish whether heat is then rejected from the facility through a cooling tower”. This concerns the label liquid cooled. §1 directly distinguishes withdrawal from water not returned locally. §§4–5 model changes in indirect generator water and subbasin depletion, and explain why annual volume alone cannot establish local risk.

Quality: original research **preprint**, Michigan modeling study, not universal measured effect or established peer-reviewed finding. Limitations include assumed facility intensities, simplified load profiles and grid, mixed historical input years, and possible source-basin misassignment. It models facility operation plus generation; excludes manufacturing/construction/supply-chain water. No numerical tradeoff should be generalized to all cooling systems. Recency: passes 12-month bar.

### D1: DOE cooling guide, mechanism only

[DOE FEMP cooling-water guide](https://www.energy.gov/cmei/femp/cooling-water-efficiency-opportunities-federal-data-centers). Excerpt: “WUE = (Annual Site Water Usage (liters))/(IT Equipment Annual Energy Use (kWh))”. Directly read. Explains recirculating internal cooling loops transferring heat to a cooling tower; therefore an internal liquid loop does not settle the external water-rejection question. Current page includes newer related links but a diagram dated **2019-01-09**. Do not infer a 2026 publication date from its sidebar. Prefer A1 for exact withdrawal WUE and P1 for current cooling-boundary mechanisms. Do not reuse its old claims about average PUE as current industry performance.

Quality: official engineering guidance; foundational mechanism, dated performance values unsuitable. Recency: publication ambiguous; no evolving empirical claims should depend on it.

## Claim-source matrix

“Excerpt E1”, etc., points to the literal bounded quotation above, avoiding repeated verbatim passages.

| ID | Proposed claim | Source / locator / excerpt | Status and permitted boundary |
|---|---|---|---|
| W01 | Historical household illustration: 82 gallons/person/day | E1 first bullet; excerpt E1 | SUPPORTED as EPA's USGS 2015 reference; page updated 2026, not a 2026 survey |
| W02 | Four people: 328 gal/day, 119,720 gal/365 days | W01 × 4 × 365 | DERIVED; illustrative household assumption, including outdoors |
| W03 | Lincoln 2025 supply exceeded 13.7 billion gal, averaged 37.6 million/day | L1 p3; excerpt L1 | SUPPORTED primary 2026 report / 2025 observations |
| W04 | Google lists Lincoln online in 2026 | G1 timeline; excerpt G1 | SUPPORTED current first-party documentation; mature 2025 rate inference invalid |
| W05 | News reports 13.299 million gal and 52.65 MW peak for Agate | K1; excerpt K1 | SUPPORTED news attribution; measurements PRIMARY-UNVERIFIED |
| W06 | Reported volume equals 111 household-years or 8.49 hours of Lincoln average supply | W05 / W02; W05 / W03 × 24 | DERIVED CONDITIONAL on reported figure; volumes only |
| W07 | Reported Agate volume is less than 0.0971% of Lincoln annual pumping | W05 / W03 lower bound × 100 | DERIVED CONDITIONAL; inequality, not harm share |
| W08 | Broader NYC system delivers more than 1 billion gal/day | N1 paragraph 1; excerpt N1 | SUPPORTED current city documentation; includes upstate customers |
| W09 | Reported volume corresponds to roughly 19 minutes at nominal 1 billion/day | W05 / 1 billion × 1440 = 19.15056 | DERIVED CONDITIONAL; actual greater delivery implies shorter duration |
| W10 | Withdrawal and consumption differ; evaporation counts as local consumption | U1; current P1 §1 corroboration | SUPPORTED stable definitions / current research |
| W11 | AWS 2025 Stockholm 0.02, Jakarta 2.85 liters withdrawn per IT kWh | A1 definition and regional table; excerpt A1 | SUPPORTED first-party dataset; not consumption or AI-only |
| W12 | AWS regional withdrawal intensities differ about 140-fold | W11: 2.85 / 0.02 = 142.5 | DERIVED; rounded values, matched provider/year/metric |
| W13 | AWS global 0.12, Singapore 1.57, Tokyo 1.22 liters withdrawn per IT kWh | A1 tables | SUPPORTED scenario presets; not predictions |
| W14 | Liquid-cooled servers require a heat-rejection method beyond the internal loop | P1 §2.1.4; excerpt P1 | SUPPORTED mechanism; not all such facilities evaporate water |
| W15 | Cooling changes can shift water between facility and generators | P1 §§4.1, 5.1 | SUPPORTED modeled mechanism; universal numerical effect unsupported |
| W16 | Local risk depends on existing uses and availability, which change with time | P1 §§4.4–4.5, 5.1 | SUPPORTED model framework; city annual volume is not spare capacity |
| W17 | IT kWh × withdrawal WUE yields site withdrawals; facility kWh requires PUE reconciliation | A1 definition; P1 equations 1–4 | SUPPORTED; AWS withdrawal metric cannot become consumption |


## Calculation inputs for coded figures

Use a explicitly hypothetical **IT** power selector, not named-project load unless its boundary is independently established. With `p` in GW IT and `f` an average load fraction, annual IT kWh = `p × 1,000,000 × 8,760 × f`; total facility kWh = IT kWh × PUE. This is a 365-day mathematical scenario. Site withdrawal liters = IT kWh × AWS-style WUE; US gallons = liters / 3.785411784 (exact unit conversion). Named AWS regional values serve as intensity illustrations, not matched transplanted cooling designs.

At 1 GW IT and 100% average year-round load: Stockholm-style 0.02 produces **46.3 million gal/year**; global 0.12 **277.7 million**; Singapore 1.57 **3.63 billion**; Jakarta 2.85 **6.60 billion**. At 5 GW multiply each by 5; at 8 GW multiply by 8. Mark every output as a scenario, and label WUE as withdrawal. The low-intensity 1 GW scenario equals approximately 387 four-person household-years; the high-intensity case approximately 55,090. Contextualization should not become dismissal.

## Editorial implications / contradictions

- The motivating KOLN article **already contextualizes** its figure against Lincoln daily use. Do not accuse that specific story of reporting only gallons or manufacture a missing denominator.
- Agate's reported 2025 volume plus the 2026 online timeline prevents treating 2025 as a mature full-capacity year. Neither parent notes nor this research establishes mature annual demand.
- Household supply and tower evaporation have different return flows. Household equivalence must remain volume equivalence. Preserve period and metric qualifiers.
- AWS annual WUE supports an intensity illustration, not a scarcity score. Site withdrawals do not determine source watershed, potability, monthly peak, consumptive fraction, discharge quality, or counterfactual grid effects.
- Neither a small city share nor a large household equivalent independently establishes acceptable impact. Supply capacity and peak constraints require local engineering records.
- NYC's 2025 table value 990 versus chart value 989 MGD remains unresolved. Use the approximate broader-system billion-gallons default until the full report is inspected.
- No news claim may quietly become an independently verified facility measurement.
