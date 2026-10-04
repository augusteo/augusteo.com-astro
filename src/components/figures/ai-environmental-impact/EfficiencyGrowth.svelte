<script lang="ts">
  import { onMount } from 'svelte';
  import Canvas2D from '../../figure/Canvas2D.svelte';
  import Slider from '../../figure/Slider.svelte';
  import { draw } from '../../../figures/ai-environmental-impact/growth';
  import { growth, number } from '../../../figures/ai-environmental-impact/model';
  import './figure.css';
  let tasks = $state(3);
  let fraction = $state(0.5);
  let ready = $state(false);
  onMount(() => { ready = true; });
  const data = $derived({ tasks, fraction });
  const values = $derived(growth(tasks, fraction));
  const description = $derived(`Fixed-workload scenario: ${tasks} times the tasks at ${number(fraction * 100)}% of baseline IT energy per task requires ${number(values.requiredMultiple, 2)} times total IT energy, or ${number(values.requiredTwh, 2)} TWh against an 8.76 TWh baseline. The curve is energy per task equal to one divided by task growth; points below use less total electricity.`);
</script>

<div class="ai-figure" data-figure="growth">
  <p class="scenario">Repeat the same defined workload and hold its mix fixed. Baseline IT electricity budget: 8.76 TWh. No water footprint is calculated.</p>
  <div class="chart" role="img" aria-label={description}><Canvas2D {draw} {data} width={400} height={270} ariaLabel={description} /></div>
  <fieldset class="controls" disabled={!ready}>
    <Slider label="Task count / baseline" bind:value={tasks} min={1} max={10} step={0.1} format={(v) => `${number(v)}×`} />
    <Slider label="IT energy per task / baseline" bind:value={fraction} min={0.1} max={1} step={0.01} format={(v) => `${number(v * 100, 0)}%`} />
  </fieldset>
  <dl>
    <div><dt>Required IT electricity / baseline</dt><dd>{number(values.requiredMultiple, 2)}×</dd></div>
    <div><dt>Required IT electricity</dt><dd>{number(values.requiredTwh, 2)} TWh</dd></div>
    <div><dt>Per-task limit to keep electricity flat</dt><dd>{number(values.thresholdFraction * 100)}% of baseline</dd></div>
  </dl>
  <p class="result" aria-live="polite">{values.exceedsBaseline ? 'Required electricity exceeds the baseline budget. It needs additional capacity or more elapsed time than the original full-load campus year.' : 'Required electricity fits the baseline energy budget. This arithmetic does not establish hardware throughput or ecological effects.'}</p>
  <p class="source">Curve: energy/task fraction = 1 ÷ task-count multiple. Points below require less total IT electricity; points above require more. This mathematical scenario doesn't explain or predict the IEA forecast.</p>
  <noscript><p>Default energy requirements appear above. Enable JavaScript to explore the threshold.</p></noscript>
</div>
