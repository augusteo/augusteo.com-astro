codex
**Structural Findings**

1. **Unsupported figure claim: “~70-80% of patches at 16×16 are blank or near-blank.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:158](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:158)  
No matrix row supports measured patch blankness for Sanibel A102 or construction sheets generally. This is load-bearing because §4’s MAE argument relies on whitespace-heavy masking. Either remove the number or add a row with an actual patch-stat measurement.

2. **C-RADIOv4 drift: prose and Fig 9 still say “no SSL aux loss” / “only training signal.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1401](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1401), [1440](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1440), [1468](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1468), [1479](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1479)  
Matrix row 25 explicitly says C-RADIOv4 adds MESA, a self-supervised regularizer. The prose can say AM-RADIO has no SSL auxiliary loss and the RADIO line is primarily teacher imitation, but it cannot say the whole line has no SSL aux loss or teacher activations are the only signal.

3. **Unsupported absence claim: “None of these teachers has been published with construction-document weights.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1473](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1473)  
The next paragraph admits the matrix cannot cover that absence claim. This sentence needs deletion or a matrix row with an exhaustive source. Current support only establishes no canonical bake-off / no reported construction-document transfer, not no published teacher weights.

4. **Fig 12 misstates Lahrichi: “MAE-IN ≥ MAE-GN on 5/6.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1796](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1796)  
Matrix row 32 says **MAE-IN→GN** beats MAE-GN on 5/6. The figure drops the two-stage condition and changes the claim. That materially alters the continual-from-natural argument.

5. **The final advice becomes prescriptive after saying the post does not prescribe.**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:2013](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:2013), [2017](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:2017)  
The coda says it does not prescribe a continual-pretraining recipe, then tells practitioners to “budget for a continual-pretraining A/B.” That is stronger than the matrix: row 32 supports adjacent-domain evidence, not a construction-document recommendation. Rephrase as “the experiment to budget for, if you can afford it,” not practical advice.

6. **Freshness regression not actually closed for rows the matrix itself marks outside-bar.**  
[notes/ssl-pretraining-recipes.md:377](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:377), [378](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:378), [380](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:380)  
Row 29 says the 18-month stable bar fails. Row 30 is 13 months old at pubDate. Row 32’s Lahrichi source is 14 months old. The debt-closure text says “Remaining marginal: none,” but these are still marginal/failing by the stated bars. I verified current arXiv pages: Medical 3D MAE v3 is 2025-04-04, C-RADIOv4 is v1 2026-01-24, GLARE v2 is 2026-01-29, Lahrichi is v1 2025-02-15, DINOv3 is v1 2025-08-13.

7. **Inline named-source link rule is not satisfied inside figures.**  
Examples: [src/content/blog/ssl-pretraining-recipes/index.mdx:1106](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1106), [1786](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1786), [1810](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1810), [1910](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1910)  
“Darcet et al. 2024,” “Lahrichi 2025,” “GLARE 2026,” etc. appear as plain SVG text. Captions often link them, but the named-source mention itself is not a markdown hyperlink. Either relax the rule for SVG labels or remove source names from SVG text and keep linked names in captions.

**Cosmetic**

- [src/content/blog/ssl-pretraining-recipes/index.mdx:1065](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1065) says §7 ended on DINOv2 as “the recipe that produces the strongest frozen-backbone dense features in the post’s coverage.” That reads false once DINOv3 is in coverage. Say “strongest so far” or “strongest in §7.”

Sources checked: [DINOv3 arXiv](https://arxiv.org/abs/2508.10104), [C-RADIOv4 arXiv](https://arxiv.org/abs/2601.17237), [GLARE arXiv](https://arxiv.org/abs/2509.17816), [Lahrichi 2025 arXiv](https://arxiv.org/abs/2502.10669), [Medical 3D MAE arXiv](https://arxiv.org/abs/2410.23132), [RADIOv2.5 arXiv](https://arxiv.org/abs/2412.07679), [MIM-Refiner arXiv](https://arxiv.org/abs/2402.10093), [SimMIM arXiv](https://arxiv.org/abs/2111.09886).


2026-05-05T05:38:21.923590Z ERROR codex_core::session: failed to record rollout items: thread 019df6a3-0d50-75b2-b0f6-d1e2f12ddb6e not found
tokens used
269,226
**Structural Findings**

1. **Unsupported figure claim: “~70-80% of patches at 16×16 are blank or near-blank.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:158](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:158)  
No matrix row supports measured patch blankness for Sanibel A102 or construction sheets generally. This is load-bearing because §4’s MAE argument relies on whitespace-heavy masking. Either remove the number or add a row with an actual patch-stat measurement.

2. **C-RADIOv4 drift: prose and Fig 9 still say “no SSL aux loss” / “only training signal.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1401](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1401), [1440](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1440), [1468](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1468), [1479](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1479)  
Matrix row 25 explicitly says C-RADIOv4 adds MESA, a self-supervised regularizer. The prose can say AM-RADIO has no SSL auxiliary loss and the RADIO line is primarily teacher imitation, but it cannot say the whole line has no SSL aux loss or teacher activations are the only signal.

3. **Unsupported absence claim: “None of these teachers has been published with construction-document weights.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1473](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1473)  
The next paragraph admits the matrix cannot cover that absence claim. This sentence needs deletion or a matrix row with an exhaustive source. Current support only establishes no canonical bake-off / no reported construction-document transfer, not no published teacher weights.

4. **Fig 12 misstates Lahrichi: “MAE-IN ≥ MAE-GN on 5/6.”**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:1796](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1796)  
Matrix row 32 says **MAE-IN→GN** beats MAE-GN on 5/6. The figure drops the two-stage condition and changes the claim. That materially alters the continual-from-natural argument.

5. **The final advice becomes prescriptive after saying the post does not prescribe.**  
[src/content/blog/ssl-pretraining-recipes/index.mdx:2013](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:2013), [2017](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:2017)  
The coda says it does not prescribe a continual-pretraining recipe, then tells practitioners to “budget for a continual-pretraining A/B.” That is stronger than the matrix: row 32 supports adjacent-domain evidence, not a construction-document recommendation. Rephrase as “the experiment to budget for, if you can afford it,” not practical advice.

6. **Freshness regression not actually closed for rows the matrix itself marks outside-bar.**  
[notes/ssl-pretraining-recipes.md:377](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:377), [378](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:378), [380](/Users/vic/dev/augusteo.com-astro/notes/ssl-pretraining-recipes.md:380)  
Row 29 says the 18-month stable bar fails. Row 30 is 13 months old at pubDate. Row 32’s Lahrichi source is 14 months old. The debt-closure text says “Remaining marginal: none,” but these are still marginal/failing by the stated bars. I verified current arXiv pages: Medical 3D MAE v3 is 2025-04-04, C-RADIOv4 is v1 2026-01-24, GLARE v2 is 2026-01-29, Lahrichi is v1 2025-02-15, DINOv3 is v1 2025-08-13.

7. **Inline named-source link rule is not satisfied inside figures.**  
Examples: [src/content/blog/ssl-pretraining-recipes/index.mdx:1106](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1106), [1786](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1786), [1810](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1810), [1910](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1910)  
“Darcet et al. 2024,” “Lahrichi 2025,” “GLARE 2026,” etc. appear as plain SVG text. Captions often link them, but the named-source mention itself is not a markdown hyperlink. Either relax the rule for SVG labels or remove source names from SVG text and keep linked names in captions.

**Cosmetic**

- [src/content/blog/ssl-pretraining-recipes/index.mdx:1065](/Users/vic/dev/augusteo.com-astro/src/content/blog/ssl-pretraining-recipes/index.mdx:1065) says §7 ended on DINOv2 as “the recipe that produces the strongest frozen-backbone dense features in the post’s coverage.” That reads false once DINOv3 is in coverage. Say “strongest so far” or “strongest in §7.”

Sources checked: [DINOv3 arXiv](https://arxiv.org/abs/2508.10104), [C-RADIOv4 arXiv](https://arxiv.org/abs/2601.17237), [GLARE arXiv](https://arxiv.org/abs/2509.17816), [Lahrichi 2025 arXiv](https://arxiv.org/abs/2502.10669), [Medical 3D MAE arXiv](https://arxiv.org/abs/2410.23132), [RADIOv2.5 arXiv](https://arxiv.org/abs/2412.07679), [MIM-Refiner arXiv](https://arxiv.org/abs/2402.10093), [SimMIM arXiv](https://arxiv.org/abs/2111.09886).


---
