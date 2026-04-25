<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    caption?: string;
    figNum?: number | string;
    children?: Snippet;
    controls?: Snippet;
  }

  let { caption, figNum, children, controls }: Props = $props();
</script>

<figure>
  <div class="content">
    {@render children?.()}
  </div>

  {#if controls}
    <div class="controls">
      {@render controls()}
    </div>
  {/if}

  {#if caption}
    <figcaption>
      {#if figNum !== undefined}<strong>Fig {figNum}.</strong>{" "}{/if}{caption}
    </figcaption>
  {/if}
</figure>

<style>
  figure {
    margin: 2rem 0;
    background: #f4eee3;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 1rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .controls {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.25rem;
    align-items: center;
    justify-content: center;
  }
  figcaption {
    margin-top: 0.75rem;
    font-family:
      "Source Serif 4", "Source Serif Pro", Iowan Old Style, Georgia, serif;
    font-style: italic;
    font-size: 0.9rem;
    color: #6b6258;
    line-height: 1.5;
  }
  figcaption :global(strong) {
    font-style: normal;
    font-weight: 600;
    color: #4a4239;
  }
</style>
