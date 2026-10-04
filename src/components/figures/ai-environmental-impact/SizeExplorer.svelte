<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas2D from '../../figure/Canvas2D.svelte';
  import Slider from '../../figure/Slider.svelte';
  import { draw } from '../../../figures/ai-environmental-impact/size';
  import { campus, number } from '../../../figures/ai-environmental-impact/model';
  import './figure.css';
  let mw = $state(1000);
  let load = $state(100);
  let wue = $state(0.12);
  let ready = $state(false);
  onMount(() => { ready = true; });
  const data = $derived({ mw, load, wue });
  const values = $derived(campus(mw, load, wue));
  const description = $derived(`Scenario: ${mw} MW IT capacity at ${load}% average electrical load and ${wue} liters withdrawn per IT kWh gives ${number(values.twh, 3)} TWh IT energy and ${number(values.millionGallons)} million gallons withdrawn yearly. Withdrawal rises linearly with intensity. The vertical axis rescales with the selected load.`);
</script>

<div class="ai-figure" data-figure="size">
  <p class="scenario">Hypothetical IT load, 365 days. Site withdrawals only. No named campus is being forecast.</p>
  <div class="chart" role="img" aria-label={description}><Canvas2D {draw} {data} width={400} height={255} ariaLabel={description} /></div>
  <fieldset class="controls" disabled={!ready}>
    <Slider label="IT capacity" bind:value={mw} min={100} max={10000} step={100} format={(v) => v < 1000 ? `${v} MW` : `${number(v / 1000, 1)} GW`} />
    <Slider label="Average electrical load" bind:value={load} min={10} max={100} format={(v) => `${v}%`} />
    <Slider label="Liters withdrawn / IT kWh" bind:value={wue} min={0} max={3} step={0.01} format={(v) => v.toFixed(2)} />
  </fieldset>
  <dl>
    <div><dt>Annual IT electricity</dt><dd>{number(values.twh, 3)} TWh</dd></div>
    <div><dt>Annual site withdrawals</dt><dd>{number(values.millionGallons)} million gal</dd></div>
    <div><dt>Four-person household volume-years</dt><dd>About {number(values.householdYears, 0)}</dd></div>
    <div><dt>US residential-account energy-years</dt><dd>About {number(values.accountYears, 0)}</dd></div>
  </dl>
  <p class="source">Default intensity: <a href="https://sustainability.aboutamazon.com/products-services/aws-cloud">AWS 2025 global withdrawal WUE, 0.12 L/IT kWh</a>. Plot scale follows capacity and load. Household and account benchmarks are the ones defined in the text.</p>
  <noscript><p>Default scenario values appear above. Enable JavaScript to explore the assumptions.</p></noscript>
</div>
