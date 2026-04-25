<script lang="ts" generics="T extends string | number">
  interface Props<T> {
    label?: string;
    value: T;
    options: { value: T; label: string }[];
  }

  let { label, value = $bindable(), options }: Props<T> = $props();
</script>

<div class="toggle">
  {#if label}<span class="label-text">{label}</span>{/if}
  <div class="group" role="radiogroup">
    {#each options as opt (opt.value)}
      <button
        type="button"
        role="radio"
        aria-checked={value === opt.value}
        class:active={value === opt.value}
        onclick={() => (value = opt.value)}
      >
        {opt.label}
      </button>
    {/each}
  </div>
</div>

<style>
  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #6b6258;
  }
  .label-text {
    letter-spacing: 0.04em;
  }
  .group {
    display: inline-flex;
    border: 1px solid #c9beaa;
    border-radius: 4px;
    overflow: hidden;
  }
  button {
    padding: 0.25rem 0.7rem;
    background: #f4eee3;
    color: #6b6258;
    border: none;
    border-right: 1px solid #c9beaa;
    cursor: pointer;
    font: inherit;
    transition:
      background 0.12s,
      color 0.12s;
  }
  button:last-child {
    border-right: none;
  }
  button:hover {
    background: #ebe2cd;
  }
  button.active {
    background: #6b6258;
    color: #f4eee3;
  }
  button:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: -2px;
  }
</style>
