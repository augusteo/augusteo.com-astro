## Part 1

### (a) The three rejected sentences

1. “It’s slow by an amount somebody wrote down.”

Rule 2, “Fake-plain folksiness,” catches it. The diagnosis is mostly right, but “folksy register” is only part of the problem.

The sentence withholds the useful information. “An amount” replaces a number, “somebody” replaces a source, and “wrote down” replaces measured or reported. It turns evidence into a coy joke. That is why it feels written: the sentence sacrifices precision to advertise informality.

“Ding and Suel measured 225.7 ms per query” is better because it restores the missing subject, method, and result. The real rule should be: never make a technical claim less specific in order to sound casual.

2. “Here is the part that took me a while to see.”

Rule 1, “The false reveal,” catches it, and the stated reason is correct. The sentence creates anticipation without supplying information. It also borrows credibility from an undocumented personal struggle: this took me a while, therefore it must be subtle.

Rule 11 also applies because this is a process aside that does not change what the reader should believe.

The deletion test is good here. Cut the sentence. Nothing is lost.

3. “In the cases I found, the thing each generation gave up was not the thing its benchmark measured.”

The new rules do not properly catch this one.

It is not a false reveal, folksiness, a significance tail, a rhetorical question, or an honesty flourish. The general self-check might object to it, but that is too vague to enforce.

The sentence fails because it compresses a concrete historical comparison into a thesis-shaped riddle:

- “the cases” replaces named cases;
- “the thing” appears twice instead of naming either property;
- “each generation” gives a vague category human agency;
- the mirrored “the thing X was not the thing Y” construction makes the sentence sound engineered for profundity;
- “its benchmark” obscures who designed the benchmark and what it measured.

The real problem is aphoristic abstraction. The writer has found a neat sentence shape and removed the nouns needed to understand it.

Even a generic rewrite is clearer: “Each new system lost a capability that its benchmark did not measure.” A finished draft should name the systems, capabilities, and benchmarks.

This omission matters. The section says it was added in response to all three sentences, but one of the three still has no matching rule.

### (b) Common model-prose failures it misses

#### 13. The thesis-shaped abstraction

Compressing a concrete relationship into a symmetrical sentence full of placeholders.

- Bad: “The thing each generation gave up was not the thing its benchmark measured.”
- Bad: “What the system gained in scale, it lost in legibility.”
- Bad: “The constraint became the capability.”
- Better: name both sides. “Lucene reduced index size, but phrase queries became slower because positions had to be decoded from a denser representation.”

The test: circle “thing,” “what,” “this,” “that,” “capability,” “constraint,” and other abstract nouns. If the reader must unpack two or more of them to recover the claim, replace them with the actual nouns.

#### 14. The synthetic aphorism

Writing a portable maxim where the argument needs a bounded claim.

- Bad: “Every optimization is a bet about the future.”
- Bad: “Abstractions do not remove complexity. They move it.”
- Bad: “A benchmark is a theory wearing numbers.”
- Better: state exactly what happened in this case. “The benchmark weighted indexing speed heavily and did not test deletion, so implementations optimized for append-only workloads.”

The test: could the sentence appear as a pull quote, LinkedIn graphic, or conference slide without its surrounding paragraph? If yes, check whether it is doing explanatory work or merely sounding quotable.

#### 15. The appositive stack

Loading a sentence with successive renamings that pretend to add precision.

- Bad: “BM25, the classic probabilistic ranking function, a fixture of modern search systems, remains the baseline.”
- Bad: “The cache, a small local layer, an escape hatch from repeated computation, changes the economics.”
- Better: “BM25 remains the baseline in many search evaluations. It ranks documents using term frequency, document length, and inverse document frequency.”

The test: if a noun is followed by two comma-delimited descriptions before the main verb arrives, split the sentence.

#### 16. Tour-guide transitions

Narrating movement through the article instead of making the next claim.

- Bad: “To understand why, we need to step back.”
- Bad: “This brings us to the second problem.”
- Bad: “With that foundation in place, we can now turn to indexing.”
- Bad: “Let’s unpack what is happening.”
- Better: begin the next paragraph with the cause, problem, or example.

The test: delete the transition. If the section still makes sense, leave it deleted.

#### 17. Reader stage directions

Telling the reader what to notice, remember, imagine, or feel.

- Bad: “Notice what happened here.”
- Bad: “Keep that number in mind.”
- Bad: “Imagine, for a moment, that the index disappears.”
- Bad: “It is easy to miss how strange this is.”
- Better: put the important fact where it will be noticed, and refer to the number again when it becomes relevant.

The test: search for commands addressed to the reader. Keep only commands required to perform an actual procedure.

#### 18. The fragment drumroll

Using fragments to simulate confidence or drama.

- Bad: “No migration. No fallback. No second chance.”
- Bad: “The result? Total failure.”
- Bad: “Not faster. Different.”
- Better: “The migration had no fallback, so a failed deployment would leave the old index unavailable.”

The test: join the fragments into a normal sentence. If no meaning disappears, the fragmentation was theatrical.

#### 19. Anaphora by template

Repeating the same opening because repetition sounds deliberate.

- Bad: “It works because the data is small. It works because the writes are rare. It works because nobody deletes anything.”
- Bad: “You can cache it. You can shard it. You can replicate it.”
- Better: express the relationship once, then vary the syntax according to the ideas.

The test: underline the first four words of each sentence in a paragraph. Three matching openings need a substantive rhetorical reason, not just rhythm.

#### 20. The concession reflex

Using “yes,” “of course,” or “to be fair” to stage an imaginary objection.

- Bad: “Yes, the model is faster. But speed is not the whole story.”
- Bad: “Of course, this does not mean relational databases are obsolete.”
- Bad: “To be fair, the original authors could not have predicted this workload.”
- Better: state the relevant limitation when it becomes relevant. Do not invent a debate partner.

The test: ask who made the objection and whether answering it changes the argument. If nobody did, cut the exchange.

#### 21. Synonym rotation

Changing terms to avoid repetition and accidentally implying distinctions.

- Bad: calling the same component “the engine,” “the platform,” “the system,” “the layer,” and “the machinery” within a page.
- Better: call the indexer “the indexer” every time unless the referent genuinely changes.

The test: make a term list for each major component. If several labels refer to the same thing, choose one.

#### 22. Generic personification

Giving technical objects motives because motive-shaped prose is easy to generate.

- Bad: “The benchmark wants throughput.”
- Bad: “The architecture refuses to express locality.”
- Bad: “The cache knows which objects matter.”
- Better: “The benchmark rewards throughput.” “The API has no way to specify locality.” “The cache retains objects using an access-frequency counter.”

The test: if a nonhuman subject “wants,” “knows,” “believes,” “prefers,” “forgets,” or “refuses,” identify the actual mechanism.

#### 23. Fake quotations from an imagined reader

- Bad: “You might be thinking, ‘Why not just add another index?’”
- Bad: “At this point you may ask whether any of this matters.”
- Better: state the objection directly if it is real: “A second index would double write amplification.”

The test: remove “you might ask” and write the supposed objection declaratively. If the objection still deserves space, answer it. Otherwise delete it.

#### 24. Exhaustive preview prose

Announcing the contents of a section before presenting them.

- Bad: “This section examines the architecture, performance characteristics, and operational tradeoffs of the system.”
- Bad: “We will first look at indexing, then retrieval, and finally evaluation.”
- Better: start with indexing.

The test: if the next few headings already provide the same map, delete the preview.

### (c) Rules that overreach

Several rules confuse frequency problems with absolute prohibitions.

The one-line-paragraph quota is the clearest mistake. “At most one per 3,000 words” is arbitrary and easy to game. A 16,000-word essay could legitimately contain six sharp turns. Another essay might contain one one-line paragraph and still use it badly. Judge function, not acreage.

The process-aside quota has the same problem. Two useful disclosures are not automatically better than three. Keep a process note when it does at least one of these:

- explains why evidence was excluded;
- reveals a material correction;
- defines the limit of the author’s knowledge;
- helps the reader avoid repeating a mistake.

Cut it when it merely acts out diligence, surprise, or humility.

The intensifier rule is directionally useful but badly phrased. “Cut unless the sentence is false without it” treats prose as Boolean logic. Intensifiers can express degree, correction, irritation, or voice:

- “The allocator is really slow under contention” may be natural but needs a number.
- “The file is completely empty” distinguishes zero bytes from nearly empty.
- “That result genuinely surprised me” can be legitimate in a personal account, although models overuse it.

The better test is whether the intensifier adds a measurable distinction, corrects an expectation, or reflects speech the author would naturally use. If it merely requests emphasis, cut it.

The blanket ban on “quiet,” “hidden,” and “invisible” is reckless in technical writing. Hidden state, invisible Unicode characters, hidden layers, quiet periods, and silent data corruption can be exact terms. Ban the atmospheric use, not the words.

The absolute em-dash ban is a detector hack, not a writing principle. Models overuse em dashes. Human writers also use them well. If the goal is Vic’s house style, an absolute ban is defensible as house style. Calling the mark itself an AI tell mistakes correlation for bad prose.

The “not X, but Y” quota and rule-of-three suspicion are also too mechanical. Both constructions are normal. The failure is predictable, ornamental symmetry. A genuine correction often needs “not X, but Y”: “The limit is memory bandwidth, not CPU time.” That is clearer than avoiding the construction to satisfy a quota.

“Use small idiosyncrasies” is dangerous advice to a model. It invites manufactured humanity, including the exact false intimacy that Vic rejected. “I’ll be honest,” self-corrections, cute parentheticals, and references to rewriting are already favorite model costumes. Preserve idiosyncrasies that arise from the author’s actual experience. Do not add them as texture.

“Humans do abrupt” and similar claims are too broad. Models can imitate abruptness in seconds. Unevenness is not proof of authorship, and deliberately roughening prose can produce mannered prose just as easily as polishing it can.

The regex is useful as a lint check, but it cannot enforce a rhetorical rule. It will catch stored phrases and miss paraphrases. It will also flag legitimate technical uses of words such as “hidden,” “exactly,” and “quiet.” The file should say that explicitly.

The line is simple: ban empty performance, not emphasis, rhythm, personality, or ordinary syntax. The question is whether the device carries information or merely changes the lighting.

### (d) Cadence uniformity

Rule 12 is not actionable enough. “Within a few words” is undefined, and sentence length is only one part of cadence. Ten sentences can vary from 10 to 30 words and still sound machine-made if all ten use the same syntax:

> Subject + verb + object, followed by a qualifying clause.

A mechanical short-medium-long pattern is no better. It merely replaces one generated rhythm with another.

Use a concrete editing pass:

1. Take two representative pages, not just the opening.
2. Mark each sentence S, M, or L: 1–8 words, 9–20 words, or 21+ words.
3. Underline each sentence opening and mark its basic shape: declaration, dependent-clause opening, list, question, fragment, or compound sentence.
4. Flag four consecutive sentences in the same length band.
5. Also flag three consecutive sentences with the same opening or clause structure.
6. Read the paragraph aloud before changing it.
7. Revise according to the argument: combine sentences that develop one thought, shorten the actual conclusion, and split sentences that contain separate claims.

Do not vary lengths merely to make the chart look noisy. The desired cadence should follow the reasoning: explanation tends to lengthen; findings and consequences can be short; qualifications should sit beside the claim they qualify.

## Part 2

A one-sentence paragraph is good when the paragraph boundary marks a real change in the argument. It might deliver a conclusion, reverse the previous claim, state a consequence, or leave a fact isolated because the next paragraph begins a different job.

“And yet.” can work when everything before it establishes one expectation and everything after it demonstrates the exception. The words are not carrying the meaning alone. The structure on both sides earns the pause.

It becomes an LLM tic when isolation is used to manufacture importance:

- the sentence is vague enough to fit anywhere;
- the surrounding prose has not earned the drama;
- several sections use the same beat;
- the isolated line previews the next point instead of making one;
- putting it back into the previous paragraph changes nothing;
- the line sounds designed for quotation.

Use this test:

1. Put the sentence back into the preceding paragraph.
2. Read both versions aloud.
3. Identify the exact conceptual boundary represented by the paragraph break.
4. Ask what information the white space adds.

If the answer is merely “more emphasis,” keep it in the paragraph. If the break marks a conclusion, reversal, consequence, or change of subject that would otherwise be blurred, isolation may be justified.

Then apply a substitution test: could another punchy sentence from the essay occupy the same spot without damaging the logic? If yes, the break is probably decorative.

Delete the quota. Keep a repetition check. Two good one-line paragraphs can sit close together if the argument requires them. One bad one is already too many.

## Part 3

### 13. Do not hide the mechanism in a smooth causal sentence

Models are good at producing sentences in which one fact “drives,” “enables,” “leads to,” or “results in” another. These sentences often sound explanatory while omitting the operation that connects cause and effect. In a technical explainer, that missing operation is usually the part the reader came to understand.

- Bad: “The denser representation improves performance by reducing overhead.”
- Bad: “Caching enables the system to scale more efficiently.”
- Bad: “This design leads to better retrieval quality.”
- Bad: “The architecture trades flexibility for speed.”
- Better: “The index stores document IDs as gaps between adjacent values. The smaller integers need fewer bytes, so each posting list requires fewer cache-line reads.”
- Better: “The cache stores parsed syntax trees under a hash of the file contents. Unchanged files skip parsing on the next build; in the test repository, that removed 8.4 seconds from a 12-second build.”
- Better: “The retriever adds phrase positions to the postings list. That lets it distinguish ‘New York’ from documents where the two words appear far apart, which raised recall on the quoted-query set from 0.71 to 0.79.”

The test: underline every causal connector and causal verb: “because,” “therefore,” “so,” “allows,” “enables,” “drives,” “leads to,” “results in,” “improves,” “reduces,” and “trades.” For each one, ask: what concrete operation carries A into B? If the sentence does not name that operation, the explanation has skipped a step.