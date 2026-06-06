# Gate 2 (final draft) — codex findings, 2026-06-05

Model: gpt-5.5, internet-enabled. 11 STRUCTURAL + 4 COSMETIC. All addressed.

## Structural (all fixed)
1. **DPO implicit-reward inconsistency.** Prose said implicit reward = β·log-ratio; Fig 5 labeled the bare log-ratio "the implicit reward"; caption wrongly said "log-prob divided by log-prob." → FIXED: Fig 5 now says r(y)=log-ratio and "β·r is the implicit reward"; caption corrected to "β times its log-ratio: how much more probability the model puts on it than the reference does." Prose + inline equation + figure now consistent.
2. **"the exact DPO from section 4, run on 3D shapes"** overstates (SAM 3D's DPO is over a generative/flow objective). → FIXED: "the same preference-optimization pattern from section 4, adapted to a 3D generator the way Diffusion-DPO adapted it to images."
3. **"reward-guided video generation at CVPR 2026"** unsourced + contaminates the preference throughline. → FIXED: cut; coda now keeps only Pref-GRPO (row 29, preference-based, hyperlinked).
4. **"two extra networks... both roughly policy-sized"** — only the critic is ~policy-sized (row 6). → FIXED: "a reward model and a critic (the critic about as big as the policy)"; "serving" → "training."
5. **"first system to make preference tuning work at scale was InstructGPT"** conflicts with Stiennon (row 4). → FIXED: "the recipe that made preference tuning a standard tool was InstructGPT... (building on an earlier clean result, Stiennon et al 2020)." Dropped "first useful ChatGPT."
6. **"Preference tuning bought a hundred-fold scale-up"** overclaims causality (row 2). → FIXED: "On that comparison the preference-tuned small model simply won."
7. **"the hardest version of the data gap"** violates the don't-say-hardest rule (row 18). → FIXED: "a data gap with no easy way around it."
8. **Freshness annotations** rows 25/26/16. → FIXED: row 25 = canonical counterweight field-locked (at boundary); row 26 = MO-GRPO fresh + Dr. GRPO field-locked; row 16 = background analogy, not load-bearing (12-mo bar N/A).
9. **Bradley-Terry bare citation** in References. → FIXED: hyperlinked to JSTOR.
10. **"human reserved for cases the machine is unsure about"** not in row 28. → FIXED: cut the allocation clause.
11. (Part of #1.)

## Cosmetic (all fixed)
- dek "thumbs-up" + §1 "whether it is good enough" → "verdict" / "rating how good it is" (avoid binary-SAM-3D simplification).
- §9 "showed up first in plain 2D" → "showed up in plain 2D as well."
- **image-generators-vision-models missing from prose** → ADDED inline link in §7 (the strongest companion; hard rule 11).
- coda "the loss function barely changed" → "the skeleton of the loss barely changed."
