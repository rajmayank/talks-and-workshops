# Workshop notebook validation

The beginner text and image notebooks now target people writing code for the first time. They replace the earlier model-based labs at the same file paths. A separate Text Part 2 adds real-model generation. Previous notebooks and their model rehearsal record are preserved in ignored local research storage.

## Beginner scope

- Text: four-word sampling simulation, a biased choice list, word counts, file save/reload and replacement.
- Images: a generated flat-colour picture, four bits in four pixel positions, PNG save/reload and JPEG comparison.
- No neural models, statistics dashboards, custom functions, widgets or model downloads.
- Every code cell is complete, with no more than seven lines. Text contains 48 code lines across 12 cells; images contain 57 across 14 cells.

## Checks completed

All code cells executed in order in separate local working folders using Python 3.12.14 and Pillow 11.3.0. The current beginner text and image notebooks then passed fresh Colab CPU runs through the browser. Their displayed counts, file reloads, JPEG comparison and exercise answers matched the results below.

| Check | Observed result |
| --- | --- |
| Normal text, preferred words | 23 out of 40 |
| Marked text, preferred words | 33 out of 40 |
| Saved and reopened text | 33 out of 40 |
| Text after both replacements | 0 out of 40 |
| Text exercise with equal tickets | 23 out of 40 |
| Message read from PNG | `[1, 0, 1, 1]`, exact match |
| Bits read from original image | `[0, 0, 0, 0]` |
| Bits after JPEG quality 20 | `[1, 1, 1, 1]`, no match |
| Image exercise, saved and reopened | `[0, 1, 0, 1]`, exact match |

The marked image changed three red-channel values by one and preserved the green and blue channels. Notebook schema, Python syntax, empty published outputs and cell-length limits passed.

## Limits and remaining rehearsal

The text count is an illustration of sampling preference, not an authorship classifier. The four image bits are a fragile teaching example, not a robust identity system. The notebook wording makes these assumptions explicit.

Fresh Colab execution is verified for these two beginner notebooks. A timed walkthrough with a first-time programmer and classroom concurrency still need rehearsal. Earlier model-based Jupyter checks apply only to archived notebooks. No PDF work is part of this validation.

## Text Part 2: real LLM and repeatability

`demos/text-watermark-part-2.ipynb` is a separate follow-on notebook. It exposes `SEED`, `STARTING_WORDS` and `NEW_TOKENS` together near the top. Setup and the provided detector/interface cells are collapsed; generation and comparisons remain visible.

Local CPU rehearsal used PyTorch 2.6.0, Transformers 4.51.3 and the cached SmolLM2-360M-Instruct revision `a10cc1512eabd3dde888204e902eca88bddb4951`. All 16 code cells after the installer ran successfully in sequential Python execution. The installer was skipped because the required dependencies were already present. Deterministic operations and the eager attention implementation were enabled.

- Two ordinary generations with seed 42 and `The old lighthouse suddenly went` had identical token sequences and text.
- Two marked generations also had identical token sequences. They differed from the ordinary continuation.
- Zero watermark bias reproduced the ordinary token sequence exactly.
- Seed 99 produced another repeatable pair, different from the seed-42 example.
- The five-word beginning `A tiny robot found something` also produced a repeatable pair.
- The ordinary sample scored 0.05 and the marked sample scored 4.68 against a classroom threshold of 3, using distinct token pairs.
- Both text-box callbacks returned the expected result. Empty, highly repetitive and oversized inputs returned useful messages.

This was a local CPU check with cached weights. Text Part 2 was not run in a fresh Colab session; its installer, first model download and text-box rendering remain unverified there. The beginner Colab runs do not establish those results. Scores demonstrate this example; they are not a calibrated attribution guarantee. The detector code counts token-pair values explicitly, avoiding the repeated-ngram counting issue previously reproduced in the pinned library detector.
