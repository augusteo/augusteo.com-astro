**Gate 1 has structural issues. Do not draft yet.**

1. **STRUCTURAL — §5 / Figure 5: the capacity threshold has no defined environmental boundary.**  
   Figure 5 compares **site withdrawals** with “spare capacity.” Spare capacity of what: utility delivery, permitted abstraction, or water available in the source basin after ecological requirements? Those are different constraints. Exceeding hypothetical utility headroom demonstrates a supply constraint; it does not establish ecological depletion. Conversely, staying below that line does not establish acceptable environmental impact.

   Define the constraint explicitly. Carry the withdrawal/consumption distinction from §2 into §5, including where and when returns occur. **W16, M07 and M11** support the qualification; they do not make gross withdrawals interchangeable with basin depletion.

2. **STRUCTURAL — §§6–8 / Figure 7: there is no reassembly.**  
   The reader learns volume comparison, water accounting, energy conversion, withdrawal intensity, seasonal constraints, and carbon accounting. The outline never applies those mechanisms together to one case. Its final figure instead introduces a separate task-count equation.

   Before the user coda, return to the same illustrative **1 GW IT facility**. Show what its stated assumptions establish, what changes under different local conditions, and what remains unknown. Keep site withdrawals, local consumption, supply constraints, and electricity emissions as separate outputs. Use **M01–M08, M11 and M14**. The reader needs to perform the assessment promised by the title, not merely receive a disclosure checklist.

3. **STRUCTURAL — §§1, 7 and 8: the AI attribution boundary is missing from the narrative.**  
   **W05** supplies a reported Google site total, without an AI workload allocation. **E01** supplies all-data-center electricity estimates. **W11–W13** cover all AWS workloads. None establishes AI’s share of those quantities.

   The outline preserves several individual caveats but never explains their collective implication: this evidence teaches environmental accounting for infrastructure that can host AI; it does not measure AI’s total footprint or allocate that footprint to an individual user.

   Make that boundary explicit before moving from the Lincoln example to AI conclusions. Any quantitative AI attribution would require new matrix rows. Otherwise, narrow the conclusions accordingly.

4. **STRUCTURAL — §7 / Figure 7: the efficiency argument is dead weight in its current position.**  
   Remove the normalized efficiency argument and §8 still lands: campus totals cannot determine a prompt footprint, task choice matters, and useful disclosures are needed. None of those conclusions requires **E15/M09**.

   The IEA sector totals satisfy the accepted industry-scale scope. The separate efficiency lesson does not yet advance the running assessment. Either connect it to a specific unresolved question about the sector projection, with the mathematical conditional clearly distinguished from the forecast, or move it to a short aside. It should not occupy the concluding figure.

5. **STRUCTURAL — section transitions: the mechanisms form parallel branches rather than a ramp.**  
   Several sections pass the deletion test:

   - Remove **§2**, and §3’s power-to-energy explanation still works.
   - Remove **§5**, and §6’s electricity/carbon explanation still works.
   - Remove **§6**, and §7’s industry totals and efficiency algebra still work.
   - Remove **§7**, and §8’s prompt-allocation argument still works.

   These are essential subjects presented as independent lessons. Rewrite the handoffs around failures of the preceding assessment: volume lacks an accounting boundary; the bounded observation lacks a mature operating rate; projected annual withdrawals lack seasonal constraints; the water assessment leaves electricity effects unresolved; one campus does not establish sector demand. Each next section must answer the question the preceding section exposes.

6. **STRUCTURAL — throughline, especially §§6–8: the running case disappears.**  
   §6 switches to PORTS-Pike and a separate fixed-1-GW calculator. §7 switches to global totals and normalized tasks. §8 switches to personal-use advice. None explicitly updates the Lincoln headline assessment or a consistently defined larger-facility scenario.

   Mark the act boundaries and state the concrete throughline return in each act. Establish a stable reference case for Figures 4–6, even if their controls remain independent. End by reassessing what the original reported amount can establish after all these distinctions. “Campus totals” is a category, not a concrete return to the scenario.

7. **TYPE-CHANGE STRUCTURAL — Figure 6, EnergyCarbon: a linear calculator does not justify interaction.**  
   The plotted relationship is a straight line: fixed energy multiplied by an emissions factor. Load scaling repeats Figure 4; PUE adds another multiplier. Three static examples and the equation preserve the specified intuition.

   Re-type to **static-svg** under the current contract. A stronger figure would distinguish location-based inventory, market-based inventory, and consequential effects using **E12/E13**, because those distinctions carry §6’s reasoning. Adding sliders to multiplication does not teach them.

8. **TYPE-CHANGE STRUCTURAL — Figure 1, VolumeScale: denominator sensitivity needs no continuous sweep.**  
   The mechanism is reciprocal division. Two-, four-, and eight-person examples make the dependence visible; city durations remain fixed. The reader does not need to explore dozens of combinations to understand that changing the comparison household changes the equivalence.

   Re-type to **static-svg**. Show the reported volume alongside the household and city conversions. Label alternative household assumptions as hypothetical, retaining the **2015** benchmark date. **W01, W02, W06 and W09** already support the central comparison.

9. **TYPE-CHANGE STRUCTURAL — Figure 7, EfficiencyGrowth: three rectangles deliver the entire mechanism.**  
   Baseline use, halved resource use per task, and three times as many tasks producing 1.5 times total use demonstrate **M09** completely. The specified interaction reveals no behavior beyond multiplication that the reader cannot simulate mentally.

   Re-type to **static-svg**, or delete if the dead-weight finding above is resolved by cutting the argument. Label the result a mathematical scenario, without implying that it explains the IEA projection.

10. **STRUCTURAL — Figure 2: “returned” lacks the boundary needed for its lesson.**  
    The single 100/20/80 split explains subtraction but leaves the important question unresolved: returned **where**? The source environment matters to the consumption definition in **W10** and the local-risk argument in **W16/M11**.

    Draw the source environment, site, atmospheric transfer, and return destination explicitly. Two equal-withdrawal cases with different local returns would directly carry §2’s claim that equal volumes can produce different local consumption. Keep both hypothetical; do not transfer their fractions into later scenarios as measured inputs.

11. **STRUCTURAL — §1 and §2: two explicit assertions have no corresponding matrix claim.**  
    - **§1:** “KOLN already supplies a city comparison.” **W05** records reported resource numbers; **W06** records this post’s conditional calculations. Neither records what comparison KOLN itself made. Add a row if this assertion remains part of the opening’s framing.
    - **§2:** “Water does not vanish globally.” **W10** establishes local consumption and evaporation, not this broader assertion. Add a bounded row explaining the relevant transfer to the atmosphere, or replace the sentence with the supported local-return distinction. Global persistence must not become an implied mitigation of local loss.

12. **COSMETIC — §§6–8: headings conceal or blur their payload.**  
    Use literal replacements:

    - **§6:** “Electricity has its own local cost” → **“Electricity supply and carbon accounting”**. “Cost” leaves the reader expecting an unspecified economic or physical measure.
    - **§7:** “The industry grows in terawatt-hours” → **“Data-center electricity estimates and the 2030 forecast”**. This names the population and separates an estimate from a projection.
    - **§8:** “What that means for an AI user” → **“What facility totals cannot tell you about a prompt”**. “That” hides the section’s actual conclusion.

    The `<noun phrase>, and <wh-clause>` template appears in **0 of the 8 section headings**. Template repetition is not the heading problem here.