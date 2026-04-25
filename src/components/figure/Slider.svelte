<script lang="ts">
  interface Props {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    format?: (v: number) => string;
  }

  let {
    label,
    value = $bindable(),
    min,
    max,
    step = 1,
    format,
  }: Props = $props();

  const display = $derived(format ? format(value) : String(value));
</script>

<label class="slider">
  <span class="label-text">{label}</span>
  <input type="range" bind:value {min} {max} {step} />
  <span class="value">{display}</span>
</label>

<style>
  .slider {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #6b6258;
  }
  .label-text {
    user-select: none;
    letter-spacing: 0.04em;
  }
  .value {
    min-width: 2.5em;
    text-align: right;
    color: #4a4239;
    font-variant-numeric: tabular-nums;
  }
  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    width: 140px;
    height: 4px;
    background: #d6cdb6;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #6b6258;
    border: 2px solid #f4eee3;
    cursor: grab;
  }
  input[type="range"]::-webkit-slider-thumb:active {
    cursor: grabbing;
  }
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #6b6258;
    border: 2px solid #f4eee3;
    cursor: grab;
  }
  input[type="range"]:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 4px;
  }
</style>
