<script lang="ts">
  // Galef's double-standard test: would you accept this argument if it were
  // about someone else? Swap the actor in a vignette; verdict tends to shift.
  // Anchored to Ch 5's "imagine the same evidence with sides reversed" frame.

  type Side = "A" | "B";
  let side: Side = $state("A");

  const cases = [
    {
      title: "A founder defending an aggressive layoff",
      a: {
        actor: "A founder you admire, at a company you root for,",
        body: "lays off 15% of staff a year before profitability, citing 'discipline that protects the long-term mission.'",
        verdict: "Tough but probably necessary.",
      },
      b: {
        actor: "A founder you don't trust, at a competitor,",
        body: "lays off 15% of staff a year before profitability, citing 'discipline that protects the long-term mission.'",
        verdict: "Looks like cost-cutting dressed up as principle.",
      },
    },
    {
      title: "A study citing convenient findings",
      a: {
        actor: "A research group on your side of an issue",
        body: "publishes one study (n=82, p=0.04) supporting your preferred conclusion.",
        verdict: "Useful evidence. Add it to the pile.",
      },
      b: {
        actor: "A research group on the opposing side",
        body: "publishes one study (n=82, p=0.04) supporting their preferred conclusion.",
        verdict: "Small sample. Probably won't replicate.",
      },
    },
    {
      title: "A policy proposal framed as 'just common sense'",
      a: {
        actor: "A political coalition you broadly agree with",
        body: "proposes a measure described as 'just common sense, anyone reasonable would support it.'",
        verdict: "Refreshingly direct.",
      },
      b: {
        actor: "A political coalition you broadly disagree with",
        body: "proposes a measure described as 'just common sense, anyone reasonable would support it.'",
        verdict: "Aggressive framing. Worth a closer look.",
      },
    },
  ];

  let caseIdx = $state(0);
  const current = $derived(cases[caseIdx]);
  const view = $derived(side === "A" ? current.a : current.b);

  function onSwapKey(e: KeyboardEvent) {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      side = "A";
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      side = "B";
    }
  }
</script>

<div class="wrap">
  <div class="case-picker">
    {#each cases as c, i (c.title)}
      <button
        type="button"
        class:active={i === caseIdx}
        onclick={() => (caseIdx = i)}
      >
        {i + 1}. {c.title}
      </button>
    {/each}
  </div>

  <div class="vignette">
    <p class="body">
      <span class="actor">{view.actor}</span>
      {view.body}
    </p>
    <div class="verdict">
      <span class="verdict-label">Common reaction:</span>
      <span class="verdict-text">"{view.verdict}"</span>
    </div>
  </div>

  <div class="swap-row">
    <span class="swap-label" id="swap-label">Swap who's doing it:</span>
    <div
      class="swap-group"
      role="radiogroup"
      aria-labelledby="swap-label"
      onkeydown={onSwapKey}
    >
      <button
        type="button"
        role="radio"
        aria-checked={side === "A"}
        tabindex={side === "A" ? 0 : -1}
        class:active={side === "A"}
        onclick={() => (side = "A")}
      >
        Side A (your side)
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={side === "B"}
        tabindex={side === "B" ? 0 : -1}
        class:active={side === "B"}
        onclick={() => (side = "B")}
      >
        Side B (the other side)
      </button>
    </div>
  </div>

  <p class="note">
    The same evidence, same structure. If your verdict shifts when only the
    actor changes, that's the asymmetry Galef's test is designed to surface.
    Passing the test isn't proof you're right; failing it tells you to keep
    looking.
  </p>
</div>

<style>
  .wrap {
    width: 100%;
    max-width: 640px;
    color: #1a1a1a;
    font-family:
      "Source Serif 4", "Source Serif Pro", Iowan Old Style, Georgia, serif;
  }
  .case-picker {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
  .case-picker button {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    background: #faf8f4;
    color: #6b6258;
    border: 1px solid #c9beaa;
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.12s,
      color 0.12s;
  }
  .case-picker button:hover {
    background: #ebe2cd;
  }
  .case-picker button.active {
    background: #6b6258;
    color: #f4eee3;
    border-color: #6b6258;
  }
  .vignette {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.9rem 1rem;
    margin-bottom: 0.9rem;
  }
  .body {
    margin: 0 0 0.6rem 0;
    font-size: 0.95rem;
    line-height: 1.55;
  }
  .actor {
    font-weight: 600;
  }
  .verdict {
    border-top: 1px dashed #c9beaa;
    padding-top: 0.5rem;
    font-size: 0.9rem;
  }
  .verdict-label {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: #6b6258;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-right: 0.4rem;
  }
  .verdict-text {
    font-style: italic;
    color: #1a1a1a;
  }
  .swap-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }
  .swap-label {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #6b6258;
    letter-spacing: 0.04em;
  }
  .swap-group {
    display: inline-flex;
    border: 1px solid #c9beaa;
    border-radius: 4px;
    overflow: hidden;
  }
  .swap-group button {
    padding: 0.3rem 0.7rem;
    background: #faf8f4;
    color: #6b6258;
    border: none;
    border-right: 1px solid #c9beaa;
    cursor: pointer;
    font: inherit;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    transition:
      background 0.12s,
      color 0.12s;
  }
  .swap-group button:last-child {
    border-right: none;
  }
  .swap-group button:hover {
    background: #ebe2cd;
  }
  .swap-group button.active {
    background: #5a7b6b;
    color: #f4eee3;
  }
  .note {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.55;
    color: #4a4239;
    font-style: italic;
  }
</style>
