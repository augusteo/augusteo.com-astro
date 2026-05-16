<script lang="ts">
  // Section 14: Bryan Caplan's Ideological Turing Test, as a reader exercise.
  // Two short passages per round; reader guesses which side wrote each.
  // Reveal explains the tells. Pairs are deliberately constructed (not real
  // citations); the point is the diagnostic, not the rhetorical content.

  type Pos = "X" | "Y";
  interface Pair {
    topic: string;
    a: { side: Pos; text: string; tell: string };
    b: { side: Pos; text: string; tell: string };
    legend: { X: string; Y: string };
  }

  const pairs: Pair[] = [
    {
      topic: "Minimum wage",
      legend: { X: "Pro-raise", Y: "Anti-raise" },
      a: {
        side: "Y",
        text: "Raising the wage floor sounds compassionate, but the cost lands on the lowest-skilled workers, who are priced out of jobs they would have taken. Small businesses are forced to cut hours, automate, or close. The intended beneficiaries pay the bill.",
        tell: "Frames the policy as compassion-with-bad-outcomes, a standard anti-raise rhetorical move that leads with intent vs. effect.",
      },
      b: {
        side: "X",
        text: "When a full-time job doesn't keep a family above the poverty line, the wage isn't doing what it's supposed to. The strongest evidence is that modest increases in the floor raise earnings without measurably reducing employment, and the labor market shifts toward higher-productivity allocations.",
        tell: "Leads with a worker-dignity frame and cites the modest-employment-effect literature, the typical pro-raise argumentative shape.",
      },
    },
    {
      topic: "Effective altruism",
      legend: { X: "Sympathetic", Y: "Skeptical" },
      a: {
        side: "X",
        text: "The core idea is just: where your charitable dollar does the most good is a question with an answer, and we should look for it. Bednets, deworming, GiveDirectly transfers; these are well-evidenced and cost-effective relative to their counterfactuals. The movement's mistakes have been in scaling beyond what its epistemics support.",
        tell: "Defends the core, distinguishes from the institutional failures, the inside-critic posture.",
      },
      b: {
        side: "Y",
        text: "The whole project is utilitarian arithmetic dressed up in good-faith language. It launders moral seriousness into spreadsheet optimization, prioritizes hypothetical future people over present obligations, and consistently produces communities that defer to their richest member's pet projects. The bednets are a fig leaf.",
        tell: "Targets the meta-shape (utilitarian framing, deference to funders) rather than specific cause areas, the typical outside-critic structure.",
      },
    },
    {
      topic: "Working from home",
      legend: { X: "Pro-WFH", Y: "Anti-WFH" },
      a: {
        side: "Y",
        text: "Junior employees lose the apprenticeship that only happens in person. Culture is the accumulation of small unplanned conversations, which Zoom can't reproduce. The data on productivity is contaminated by selection: people who succeeded at WFH self-selected into it. The honest answer is that we don't yet know what we're trading away.",
        tell: "Concedes the productivity data is mixed, then redirects to mentorship and culture, the more defensible anti-WFH frame.",
      },
      b: {
        side: "X",
        text: "Remote work returns the commute, the autonomy, and the focused hours that office work systematically destroys. The companies that committed to it earliest are outperforming peers on retention and recruiting. The 'return to office' push is mostly real-estate cope from firms that signed long leases.",
        tell: "Leads with worker-time/autonomy framing and reads RTO as managerial signaling, the typical pro-WFH structure.",
      },
    },
  ];

  let roundIdx = $state(0);
  let guessA: Pos | null = $state(null);
  let guessB: Pos | null = $state(null);
  let revealed = $state(false);

  const round = $derived(pairs[roundIdx]);
  const correct = $derived(
    revealed && guessA === round.a.side && guessB === round.b.side,
  );

  function reset() {
    guessA = null;
    guessB = null;
    revealed = false;
  }

  function next() {
    roundIdx = (roundIdx + 1) % pairs.length;
    reset();
  }

  function reveal() {
    if (guessA && guessB) revealed = true;
  }
</script>

<div class="wrap">
  <div class="header">
    <span class="topic-label">Topic:</span>
    <span class="topic">{round.topic}</span>
    <span class="legend">
      <span class="chip x">{round.legend.X}</span>
      <span class="chip y">{round.legend.Y}</span>
    </span>
  </div>

  <div class="passages">
    <div class="passage" class:correct={revealed && guessA === round.a.side} class:wrong={revealed && guessA !== round.a.side}>
      <div class="badge">A</div>
      <p>{round.a.text}</p>
      <div class="picker" class:locked={revealed}>
        <button
          type="button"
          class:active={guessA === "X"}
          disabled={revealed}
          onclick={() => (guessA = "X")}
        >
          {round.legend.X}
        </button>
        <button
          type="button"
          class:active={guessA === "Y"}
          disabled={revealed}
          onclick={() => (guessA = "Y")}
        >
          {round.legend.Y}
        </button>
      </div>
      {#if revealed}
        <p class="tell">
          <strong>Tell:</strong> {round.a.tell}
        </p>
      {/if}
    </div>

    <div class="passage" class:correct={revealed && guessB === round.b.side} class:wrong={revealed && guessB !== round.b.side}>
      <div class="badge">B</div>
      <p>{round.b.text}</p>
      <div class="picker" class:locked={revealed}>
        <button
          type="button"
          class:active={guessB === "X"}
          disabled={revealed}
          onclick={() => (guessB = "X")}
        >
          {round.legend.X}
        </button>
        <button
          type="button"
          class:active={guessB === "Y"}
          disabled={revealed}
          onclick={() => (guessB = "Y")}
        >
          {round.legend.Y}
        </button>
      </div>
      {#if revealed}
        <p class="tell">
          <strong>Tell:</strong> {round.b.tell}
        </p>
      {/if}
    </div>
  </div>

  <div class="actions">
    {#if !revealed}
      <button
        type="button"
        class="primary"
        disabled={!guessA || !guessB}
        onclick={reveal}
      >
        Reveal
      </button>
    {:else}
      <span class="result">
        {correct ? "Both right." : "Check the tells. Then try the next pair."}
      </span>
      <button type="button" class="primary" onclick={next}>
        Next pair
      </button>
    {/if}
  </div>

  <p class="note">
    Caplan's diagnostic asks whether you can write the other side's case
    convincingly enough that an actual believer wouldn't tell you apart.
    Reading-it-and-spotting-it is the easy half; <em>writing</em> the better
    version is the harder one. Use this as a journaling prompt, not a
    credential.
  </p>
</div>

<style>
  .wrap {
    width: 100%;
    max-width: 680px;
    color: #1a1a1a;
    font-family:
      "Source Serif 4", "Source Serif Pro", Iowan Old Style, Georgia, serif;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.85rem;
    flex-wrap: wrap;
  }
  .topic-label {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: #6b6258;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .topic {
    font-weight: 600;
    font-size: 1rem;
  }
  .legend {
    margin-left: auto;
    display: flex;
    gap: 0.4rem;
  }
  .chip {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    border: 1px solid #c9beaa;
    color: #6b6258;
  }
  .chip.x {
    background: #e6efe9;
    border-color: #9cb89e;
  }
  .chip.y {
    background: #f6e6d4;
    border-color: #d9a671;
  }
  .passages {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
    margin-bottom: 0.85rem;
  }
  @media (max-width: 600px) {
    .passages {
      grid-template-columns: 1fr;
    }
  }
  .passage {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.85rem 0.95rem;
    position: relative;
    transition:
      background 0.2s,
      border-color 0.2s;
  }
  .passage.correct {
    background: #e6efe9;
    border-color: #5a7b6b;
  }
  .passage.wrong {
    background: #f6e6d4;
    border-color: #b91c1c;
  }
  .passage .badge {
    position: absolute;
    top: -10px;
    left: 12px;
    background: #6b6258;
    color: #f4eee3;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
  }
  .passage p {
    margin: 0.2rem 0 0.7rem 0;
    font-size: 0.88rem;
    line-height: 1.55;
  }
  .picker {
    display: flex;
    gap: 0.3rem;
  }
  .picker button {
    flex: 1;
    padding: 0.35rem 0.5rem;
    background: #faf8f4;
    color: #6b6258;
    border: 1px solid #c9beaa;
    border-radius: 4px;
    cursor: pointer;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    transition: background 0.12s;
  }
  .picker button:not(:disabled):hover {
    background: #ebe2cd;
  }
  .picker button.active {
    background: #6b6258;
    color: #f4eee3;
    border-color: #6b6258;
  }
  .picker.locked button {
    cursor: default;
  }
  .tell {
    margin-top: 0.6rem !important;
    padding-top: 0.55rem;
    border-top: 1px dashed #c9beaa;
    font-size: 0.83rem !important;
    color: #4a4239;
    font-style: italic;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 0.85rem;
    flex-wrap: wrap;
  }
  .primary {
    padding: 0.45rem 0.9rem;
    background: #5a7b6b;
    color: #f4eee3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .primary:disabled {
    background: #c9beaa;
    cursor: not-allowed;
  }
  .result {
    font-size: 0.9rem;
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
