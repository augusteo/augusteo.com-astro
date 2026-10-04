<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas2D from '../../figure/Canvas2D.svelte';
  import Slider from '../../figure/Slider.svelte';
  import { draw } from '../../../figures/ai-environmental-impact/volume';
  import { volume, number } from '../../../figures/ai-environmental-impact/model';
  import './figure.css';
  let people = $state(4);
  let daily = $state(82);
  let ready = $state(false);
  onMount(() => { ready = true; });
  const data = $derived({ people, daily });
  const values = $derived(volume(people, daily));
  const description = $derived(`The reported 13.299 million gallons equals ${number(values.householdYears)} household-years at ${people} people and ${daily} gallons per person per day. The curve falls as household water demand rises.`);
</script>

<div class="ai-figure" data-figure="volume">
  <p class="scenario">Fixed volume: 13.299 million gallons, as reported by KOLN. Comparisons describe supplied-water volume.</p>
  <div class="chart" role="img" aria-label={description}>
    <Canvas2D {draw} {data} width={400} height={250} ariaLabel={description} />
  </div>
  <fieldset class="controls" disabled={!ready}>
    <Slider label="People in household" bind:value={people} min={1} max={8} />
    <Slider label="Gallons / person / day" bind:value={daily} min={50} max={150} />
  </fieldset>
  <dl>
    <div><dt>Household water / year</dt><dd>{number(values.householdYear, 0)} gallons</dd></div>
    <div><dt>Equivalent household-years</dt><dd>{number(values.householdYears)}</dd></div>
    <div><dt>Lincoln average supply</dt><dd>{number(values.lincolnHours)} hours</dd></div>
    <div><dt>NYC broader system at 1 billion gal/day</dt><dd>{number(values.nycMinutes)} minutes</dd></div>
  </dl>
  <p class="source">Default household allowance: <a href="https://www.epa.gov/watersense/statistics-and-facts">EPA's 82 gallons/person/day</a>, using 2015 observations. The NYC system delivers more than the reference rate, so its actual duration would be shorter.</p>
  <noscript><p>Default comparisons appear above. Enable JavaScript to change the assumptions.</p></noscript>
</div>
