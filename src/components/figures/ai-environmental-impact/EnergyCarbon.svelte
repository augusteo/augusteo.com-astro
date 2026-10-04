<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas2D from '../../figure/Canvas2D.svelte';
  import Slider from '../../figure/Slider.svelte';
  import { draw } from '../../../figures/ai-environmental-impact/carbon';
  import { carbon, number } from '../../../figures/ai-environmental-impact/model';
  import './figure.css';
  let load = $state(100);
  let pue = $state(1.2);
  let intensity = $state(400);
  let ready = $state(false);
  onMount(() => { ready = true; });
  const data = $derived({ load, pue, intensity });
  const values = $derived(carbon(load, pue, intensity));
  const description = $derived(`Hypothetical 1 GW IT capacity at ${load}% average electrical load and PUE ${pue}, with an illustrative emissions factor of ${intensity} grams CO2e per kWh. Annual facility energy is ${number(values.facilityTwh, 3)} TWh; inventory emissions are ${number(values.millionTonnes, 2)} million metric tonnes. No actual grid or marginal emissions are being estimated.`);
</script>

<div class="ai-figure" data-figure="carbon">
  <p class="scenario">Fixed 1 GW IT capacity. The chosen carbon factor is illustrative and represents no particular grid.</p>
  <div class="chart" role="img" aria-label={description}><Canvas2D {draw} {data} width={400} height={255} ariaLabel={description} /></div>
  <fieldset class="controls" disabled={!ready}>
    <Slider label="Average electrical load" bind:value={load} min={10} max={100} format={(v) => `${v}%`} />
    <Slider label="PUE: facility energy / IT energy" bind:value={pue} min={1} max={1.5} step={0.01} format={(v) => v.toFixed(2)} />
    <Slider label="Chosen factor (g CO2e / kWh)" bind:value={intensity} min={0} max={800} step={10} />
  </fieldset>
  <dl>
    <div><dt>Annual facility electricity</dt><dd>{number(values.facilityTwh, 3)} TWh</dd></div>
    <div><dt>Electricity-inventory emissions</dt><dd>{number(values.millionTonnes, 2)} million tonnes CO2e</dd></div>
    <div><dt>US residential-account energy-years</dt><dd>About {number(values.accountYears, 0)}</dd></div>
  </dl>
  <p class="source">Facility kWh = IT kWh × PUE. Grams CO2e = facility kWh × chosen factor. A million metric tonnes is 10¹² grams. Construction, manufacturing, and the power system's response aren't calculated.</p>
  <noscript><p>Default inventory values appear above. Enable JavaScript to explore other inputs.</p></noscript>
</div>
