<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas2D from '../../figure/Canvas2D.svelte';
  import Slider from '../../figure/Slider.svelte';
  import { draw } from '../../../figures/ai-environmental-impact/season';
  import { season, number } from '../../../figures/ai-environmental-impact/model';
  import './figure.css';
  let annual = $state(277.7);
  let peak = $state(2);
  let headroom = $state(1);
  let ready = $state(false);
  onMount(() => { ready = true; });
  const data = $derived({ annual, peak, headroom });
  const values = $derived(season(annual, peak, headroom));
  const description = $derived(`Toy utility-delivery model: all ${annual} million annual gallons come from this utility. Three peak months need ${number(values.summer, 2)} million gallons a day versus ${headroom} million delivery headroom. The other nine months compensate to preserve annual volume. This is not a watershed depletion model.`);
</script>

<div class="ai-figure" data-figure="season">
  <p class="scenario">Toy utility-delivery model. The utility supplies 100% of site water. Headroom is capacity left after other users and reserves.</p>
  <div class="chart" role="img" aria-label={description}><Canvas2D {draw} {data} width={400} height={250} ariaLabel={description} /></div>
  <fieldset class="controls" disabled={!ready}>
    <Slider label="Annual withdrawals (million gal)" bind:value={annual} min={100} max={2000} step={0.1} format={(v) => number(v)} />
    <Slider label="Three-month peak / annual average" bind:value={peak} min={1} max={4} step={0.1} format={(v) => `${number(v)}×`} />
    <Slider label="Delivery headroom (million gal/day)" bind:value={headroom} min={0.1} max={5} step={0.1} format={(v) => number(v)} />
  </fieldset>
  <dl>
    <div><dt>Year-average utility demand</dt><dd>{number(values.average, 2)} million gal/day</dd></div>
    <div><dt>Three-month peak demand</dt><dd>{number(values.summer, 2)} million gal/day</dd></div>
  </dl>
  <p class="result" aria-live="polite">{values.exceeds ? `Peak utility demand is ${number(values.excess, 2)} million gallons/day above the chosen delivery headroom.` : 'Peak utility demand fits the chosen delivery headroom. Ecological effects still need a separate local water balance.'}</p>
  <p class="source">Equal-duration month blocks preserve the annual total. Headroom and seasonal demand are hypothetical inputs; source-basin availability and returned water aren't modeled.</p>
  <noscript><p>The default summer scenario appears above. Enable JavaScript to change it.</p></noscript>
</div>
