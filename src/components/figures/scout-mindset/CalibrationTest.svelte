<script lang="ts">
  // Section 6 calibration self-tester. 10 binary trivia statements; each gets a
  // confidence pick (55/65/75/85/95). After completion, plot mean accuracy
  // per confidence bucket vs. the ideal diagonal. Mirrors the kind of
  // calibration exercise Galef recommends in Ch 6 + Appendix B.

  interface Q {
    text: string;
    answer: boolean; // true if the statement is true
    note?: string;
  }

  const questions: Q[] = [
    {
      text: "The Pacific Ocean covers more area than all of Earth's land combined.",
      answer: true,
      note: "Pacific ≈ 165 M km²; total land ≈ 149 M km².",
    },
    {
      text: "Hot water freezes faster than cold water under typical household conditions.",
      answer: false,
      note: "The Mpemba effect is real in narrow setups but not the typical case.",
    },
    {
      text: "Mount Everest is the tallest mountain on Earth measured from base to summit.",
      answer: false,
      note: "Mauna Kea, measured from its undersea base, is taller (about 10,210 m).",
    },
    {
      text: "Bananas are technically berries; strawberries are not.",
      answer: true,
      note: "Botanical definition: berries develop from a single ovary with a fleshy pericarp.",
    },
    {
      text: "Humans have more bones at birth than as adults.",
      answer: true,
      note: "About 300 at birth, fusing to 206 in adulthood.",
    },
    {
      text: "The Great Wall of China is visible from low Earth orbit with the unaided eye.",
      answer: false,
      note: "NASA astronauts have generally said no; too thin relative to viewing distance.",
    },
    {
      text: "Sharks have existed longer than trees have.",
      answer: true,
      note: "Sharks: ~420 Mya; trees: ~390 Mya.",
    },
    {
      text: "The shortest war in recorded history lasted less than an hour.",
      answer: true,
      note: "Anglo-Zanzibar War, 1896: about 38 minutes.",
    },
    {
      text: "Octopuses have one heart.",
      answer: false,
      note: "They have three: two for the gills and one for the body.",
    },
    {
      text: "Australia is wider east-to-west than the Moon's diameter.",
      answer: true,
      note: "Australia ~4,000 km east-to-west; Moon diameter ~3,474 km.",
    },
  ];

  const buckets = [55, 65, 75, 85, 95] as const;
  type Bucket = (typeof buckets)[number];

  let idx = $state(0);
  let answers: { pick: boolean; conf: Bucket | null }[] = $state(
    questions.map(() => ({ pick: false, conf: null })),
  );
  let done = $state(false);

  const current = $derived(questions[idx]);

  function answer(pick: boolean, conf: Bucket) {
    answers[idx] = { pick, conf };
    if (idx + 1 < questions.length) idx += 1;
    else done = true;
  }

  function reset() {
    answers = questions.map(() => ({ pick: false, conf: null }));
    idx = 0;
    done = false;
  }

  const result = $derived.by(() => {
    if (!done) return null;
    const per: Record<Bucket, { correct: number; total: number }> = {
      55: { correct: 0, total: 0 },
      65: { correct: 0, total: 0 },
      75: { correct: 0, total: 0 },
      85: { correct: 0, total: 0 },
      95: { correct: 0, total: 0 },
    };
    answers.forEach((a, i) => {
      if (a.conf == null) return;
      const ok = a.pick === questions[i].answer;
      per[a.conf].total += 1;
      if (ok) per[a.conf].correct += 1;
    });
    return per;
  });

  function pct(b: Bucket): number | null {
    if (!result) return null;
    const r = result[b];
    if (r.total === 0) return null;
    return (r.correct / r.total) * 100;
  }
</script>

<div class="wrap">
  {#if !done}
    <div class="progress">
      <span class="progress-label">Question {idx + 1} of {questions.length}</span>
      <div class="bar">
        <div class="fill" style:width="{((idx) / questions.length) * 100}%"></div>
      </div>
    </div>

    <div class="card">
      <p class="question">{current.text}</p>
      <p class="prompt">Pick true or false, and your confidence in that pick.</p>
      <div class="grid">
        {#each buckets as b (b)}
          <div class="bucket">
            <div class="bucket-label">{b}% confident</div>
            <div class="row">
              <button
                type="button"
                class="t"
                aria-label={`True, at ${b}% confidence`}
                onclick={() => answer(true, b)}
              >
                True
              </button>
              <button
                type="button"
                class="f"
                aria-label={`False, at ${b}% confidence`}
                onclick={() => answer(false, b)}
              >
                False
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="result-grid">
      <div class="plot-box">
        <svg viewBox="0 0 360 280" width="100%" role="img" aria-label="Calibration plot: stated confidence on x-axis, observed accuracy on y-axis. Ideal diagonal is drawn; user's points are plotted per bucket.">
          <rect x="0" y="0" width="360" height="280" fill="#FAF8F4"/>
          <!-- gridlines -->
          <g stroke="#D6D1C7" stroke-width="0.5" stroke-dasharray="2,2">
            <line x1="60" y1="40" x2="340" y2="40"/>
            <line x1="60" y1="100" x2="340" y2="100"/>
            <line x1="60" y1="160" x2="340" y2="160"/>
            <line x1="60" y1="220" x2="340" y2="220"/>
          </g>
          <!-- axes -->
          <line x1="60" y1="40" x2="60" y2="240" stroke="#1A1A1A" stroke-width="1"/>
          <line x1="60" y1="240" x2="340" y2="240" stroke="#1A1A1A" stroke-width="1"/>
          <!-- ideal diagonal: confidence p maps to accuracy p, so x=60 (conf=50%) → y=140, x=340 (conf=100%) → y=40 -->
          <line x1="60" y1="140" x2="340" y2="40" stroke="#9CB89E" stroke-width="1.5" stroke-dasharray="5,3"/>
          <text x="305" y="55" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#5A7B6B">ideal</text>
          <!-- x-axis labels -->
          <g font-family="JetBrains Mono, monospace" font-size="10" fill="#6B6258" text-anchor="middle">
            <text x="88" y="258">55</text>
            <text x="144" y="258">65</text>
            <text x="200" y="258">75</text>
            <text x="256" y="258">85</text>
            <text x="312" y="258">95</text>
          </g>
          <!-- y-axis labels -->
          <g font-family="JetBrains Mono, monospace" font-size="10" fill="#6B6258" text-anchor="end">
            <text x="54" y="244">0</text>
            <text x="54" y="184">25</text>
            <text x="54" y="124">50</text>
            <text x="54" y="64">75</text>
            <text x="54" y="44">100</text>
          </g>
          <!-- axis titles -->
          <text x="200" y="274" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle">stated confidence (%)</text>
          <text x="20" y="140" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#1A1A1A" text-anchor="middle" transform="rotate(-90, 20, 140)">observed accuracy (%)</text>
          <!-- user points -->
          {#each buckets as b, i (b)}
            {@const p = pct(b)}
            {#if p !== null}
              {@const cx = 88 + i * 56}
              {@const cy = 240 - (p / 100) * 200}
              <line x1={cx} y1={240 - (b / 100) * 200} x2={cx} y2={cy} stroke="#92400E" stroke-width="0.8" stroke-dasharray="2,2"/>
              <circle {cx} {cy} r="5" fill="#92400E" stroke="#1A1A1A" stroke-width="1"/>
              <text x={cx} y={cy - 10} font-family="JetBrains Mono, monospace" font-size="9" fill="#1A1A1A" text-anchor="middle">{Math.round(p)}%</text>
            {/if}
          {/each}
        </svg>
      </div>
      <div class="readout">
        <h4>Your calibration</h4>
        <ul>
          {#each buckets as b (b)}
            {@const p = pct(b)}
            {@const r = result?.[b]}
            <li>
              <span class="b-lab">{b}%:</span>
              {#if p === null}
                <span class="b-val empty">no picks</span>
              {:else}
                <span class="b-val">{r?.correct}/{r?.total} correct ({Math.round(p)}%)</span>
              {/if}
            </li>
          {/each}
        </ul>
        <p class="readout-note">
          A well-calibrated set sits on the green diagonal: when you say
          75%, you're right ~75% of the time. Points <em>below</em> the line
          mean overconfidence; <em>above</em> means underconfidence.
        </p>
        <button type="button" class="reset" onclick={reset}>Reset</button>
      </div>
    </div>

    <details class="answers">
      <summary>See the answers and notes</summary>
      <ol>
        {#each questions as q, i (q.text)}
          {@const a = answers[i]}
          {@const ok = a.pick === q.answer}
          <li class:correct={ok} class:wrong={!ok}>
            <strong>{q.text}</strong>
            <div class="meta">
              You picked <em>{a.pick ? "true" : "false"}</em> at {a.conf}%.
              Actual: <em>{q.answer ? "true" : "false"}</em>.
              {#if q.note}<span class="ans-note">{q.note}</span>{/if}
            </div>
          </li>
        {/each}
      </ol>
    </details>
  {/if}

  <p class="note">
    Within-domain calibration is the part of Ch 6 that holds up best. The
    ten items above are general-knowledge trivia, so the takeaway is
    directional, not diagnostic: if every bucket sits far below the diagonal,
    your confidence-words don't mean what their numbers imply.
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
  .progress {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 0.85rem;
  }
  .progress-label {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #6b6258;
  }
  .bar {
    height: 4px;
    background: #d6cdb6;
    border-radius: 2px;
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: #5a7b6b;
    transition: width 0.2s;
  }
  .card {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 1rem 1.1rem;
  }
  .question {
    margin: 0 0 0.8rem 0;
    font-size: 1rem;
    line-height: 1.55;
    font-weight: 500;
  }
  .prompt {
    margin: 0 0 0.85rem 0;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: #6b6258;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
  }
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .bucket {
    background: #f4eee3;
    border: 1px solid #c9beaa;
    border-radius: 4px;
    padding: 0.4rem 0.4rem 0.45rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .bucket-label {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    color: #1a1a1a;
    text-align: center;
    font-weight: 600;
  }
  .row {
    display: flex;
    gap: 0.25rem;
  }
  .row button {
    flex: 1;
    padding: 0.3rem;
    border: 1px solid #c9beaa;
    border-radius: 3px;
    cursor: pointer;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    background: #faf8f4;
    color: #1a1a1a;
    transition: background 0.12s;
  }
  .row button.t:hover {
    background: #e6efe9;
  }
  .row button.f:hover {
    background: #f6e6d4;
  }
  .result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: start;
    margin-bottom: 0.9rem;
  }
  @media (max-width: 600px) {
    .result-grid {
      grid-template-columns: 1fr;
    }
  }
  .plot-box {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.5rem;
  }
  .readout {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.85rem 1rem;
  }
  .readout h4 {
    margin: 0 0 0.5rem 0;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #1a1a1a;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .readout ul {
    list-style: none;
    padding: 0;
    margin: 0 0 0.7rem 0;
  }
  .readout li {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    padding: 0.2rem 0;
    border-bottom: 1px dashed #ebe2cd;
  }
  .b-lab {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    color: #6b6258;
  }
  .b-val {
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    color: #1a1a1a;
  }
  .b-val.empty {
    color: #c9beaa;
    font-style: italic;
  }
  .readout-note {
    margin: 0 0 0.7rem 0;
    font-size: 0.83rem;
    line-height: 1.5;
    color: #4a4239;
    font-style: italic;
  }
  .reset {
    background: #6b6258;
    color: #f4eee3;
    border: none;
    border-radius: 4px;
    padding: 0.35rem 0.8rem;
    cursor: pointer;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .answers {
    background: #faf8f4;
    border: 1px solid #c9beaa;
    border-radius: 6px;
    padding: 0.6rem 0.9rem;
    margin-bottom: 0.9rem;
  }
  .answers summary {
    cursor: pointer;
    font-family: "JetBrains Mono", ui-monospace, Menlo, monospace;
    font-size: 11px;
    color: #1a1a1a;
    letter-spacing: 0.04em;
  }
  .answers ol {
    margin: 0.6rem 0 0 0;
    padding-left: 1.25rem;
  }
  .answers li {
    margin-bottom: 0.55rem;
    font-size: 0.88rem;
    line-height: 1.5;
  }
  .answers li.correct strong {
    color: #5a7b6b;
  }
  .answers li.wrong strong {
    color: #b91c1c;
  }
  .meta {
    font-size: 0.82rem;
    color: #4a4239;
    margin-top: 0.15rem;
  }
  .ans-note {
    display: block;
    color: #6b6258;
    font-style: italic;
    margin-top: 0.2rem;
  }
  .note {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.55;
    color: #4a4239;
    font-style: italic;
  }
</style>
