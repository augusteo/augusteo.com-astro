<script lang="ts">
  // Section 8 bets as belief clarifier. Galef's chapter-8 frame, after Hubbard's
  // equivalent-bet test (Ch 6) and Kurzban's press-secretary metaphor:
  // your stated probability implies fair odds; if you wouldn't take those odds,
  // the stated probability isn't your real belief.

  let stated = $state(70); // stated confidence in %
  let minOdds = $state(2); // minimum payout multiple ($X return per $1 bet)

  const fairMultiple = $derived(100 / Math.max(1, stated));
  const impliedConf = $derived((1 / Math.max(1, minOdds)) * 100); // revealed confidence, %
  // Probability-point gap: positive means you SAY more than you'd actually back.
  const gapPts = $derived(stated - impliedConf);
  const threshold = 4; // percentage points
  const honest = $derived(Math.abs(gapPts) < threshold);
  const overstated = $derived(gapPts >= threshold);
  const understated = $derived(gapPts <= -threshold);

  function fmt(n: number): string {
    if (!isFinite(n)) return "∞";
    if (n >= 10) return n.toFixed(1);
    return n.toFixed(2);
  }
</script>

<div class="wrap">
  <div class="row">
    <div class="col">
      <label class="slider">
        <span class="label-text">your stated confidence</span>
        <input type="range" bind:value={stated} min={50} max={99} step={1} />
        <span class="value">{stated}%</span>
      </label>
      <p class="hint">
        Fair payout on a $1 bet (you lose if wrong, win otherwise):
        <strong class="num">${fmt(fairMultiple)}</strong>
      </p>
    </div>
    <div class="col">
      <label class="slider">
        <span class="label-text">minimum payout you'd accept</span>
        <input type="range" bind:value={minOdds} min={1.1} max={20} step={0.1} />
        <span class="value">${fmt(minOdds)}</span>
      </label>
      <p class="hint">
        Implied honest confidence:
        <strong class="num">{impliedConf.toFixed(0)}%</strong>
      </p>
    </div>
  </div>

  <div class="verdict" class:honest class:overstated class:understated>
    {#if honest}
      <span class="badge">Calibrated</span>
      <span class="text">
        Your stated and revealed confidence line up. The press secretary and
        the board are on the same page.
      </span>
    {:else if overstated}
      <span class="badge over">Overstated</span>
      <span class="text">
        You say {stated}% but wouldn't take fair {fmt(fairMultiple)}× odds. Your
        revealed confidence is closer to {impliedConf.toFixed(0)}%. The
        press secretary is louder than the board.
      </span>
    {:else}
      <span class="badge under">Understated</span>
      <span class="text">
        You'd accept odds the {stated}% level wouldn't justify. Your revealed
        confidence is more like {impliedConf.toFixed(0)}%. Useful when
        you notice you're hedging out loud but betting boldly inside.
      </span>
    {/if}
  </div>

  <p class="note">
    Hubbard's equivalent-bet test (Ch 6) and Kurzban's press-secretary
    metaphor (Ch 8) point at the same trick. The thing that turns "I'm fairly
    sure" into a checkable claim is whether you'd take the bet your number
    implies.
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
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 520px) {
    .row {
      grid-template-columns: 1fr;
    }
  }
  .col {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.75rem 0.9rem;
  }
  .slider {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .label-text {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: #6b6258;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
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
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #6b6258;
    border: 2px solid #f4eee3;
    cursor: grab;
  }
  .value {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: #1a1a1a;
    font-weight: 600;
  }
  .hint {
    margin: 0.55rem 0 0 0;
    font-size: 0.85rem;
    line-height: 1.45;
    color: #4a4239;
  }
  .num {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    color: #1a1a1a;
  }
  .verdict {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.75rem 0.9rem;
    border-radius: 6px;
    margin-bottom: 0.85rem;
    border: 1px solid #c9beaa;
    background: #faf8f4;
  }
  .verdict.overstated {
    background: #f6e6d4;
    border-color: #d9a671;
  }
  .verdict.understated {
    background: #e6efe9;
    border-color: #9cb89e;
  }
  .verdict.honest {
    background: #ebe2cd;
    border-color: #c9beaa;
  }
  .badge {
    align-self: flex-start;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.18rem 0.5rem;
    border-radius: 3px;
    background: #6b6258;
    color: #f4eee3;
  }
  .badge.over {
    background: #92400e;
  }
  .badge.under {
    background: #5a7b6b;
  }
  .text {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #1a1a1a;
  }
  .note {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.55;
    color: #4a4239;
    font-style: italic;
  }
</style>
