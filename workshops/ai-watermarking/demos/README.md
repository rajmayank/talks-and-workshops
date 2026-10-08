# Workshop notebooks

Start with the beginner text notebook, then continue to Part 2 for a real LLM. The beginner text and image notebooks assume no coding experience and keep every code cell to seven lines or fewer. Part 2 provides its setup and detector code in collapsed cells.

| Notebook | What we do | Launch |
| --- | --- | --- |
| [Text watermarking](text-watermark-lab.ipynb) | Pick from four words, favour two of them, save the text, then count and edit the pattern | [Open in Colab](https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/text-watermark-lab.ipynb) |
| [Text Part 2: real LLM](text-watermark-part-2.ipynb) | Set a seed and five starting words, generate twice, add a watermark preference, then check pasted text | [Open in Colab](https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/text-watermark-part-2.ipynb) |
| [Image watermarking](image-watermark-lab.ipynb) | Make a plain picture, hide four bits in its pixels, save a PNG, then see what JPEG changes | [Open in Colab](https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/image-watermark-lab.ipynb) |

## Run a lab

1. Use **Open in Colab** above, or scan the matching QR code on the lab slide. Each opens the notebook from this repository's `main` branch. Local Jupyter is also supported.
2. Run one cell at a time with **Shift + Enter**. In Colab, the play button works too.
3. Read the result together before continuing. Each step explains the new Python syntax it uses.
4. Try the small exercise at the end. A complete runnable answer follows it.

The beginner text notebook uses Python's built-in tools. Images use Pillow. Neither needs model downloads or widgets. If Pillow is missing, the image notebook explains how to install it.

Part 2 checks its dependency versions before loading the model. If the installer requests a session restart, restart and run from the top; it will reuse the installed packages. The text lab removes optional vision/audio packages to avoid incompatible imports and uses official PyTorch CPU wheels on Colab. A missing `HF_TOKEN` warning can be ignored for its public model.

Part 2 uses PyTorch, Transformers and a small language model. The first run downloads about 0.7 GB of model weights. Only its final paste-and-check box uses widgets; a plain code-cell alternative is included. All three notebooks use CPU and require no paid API key.

## Teach it slowly

Use beginner text as a 5 to 10 minute guided warm-up, allowing more time if attendees type every line themselves. Continue to Part 2 once the preference-and-count idea is clear. The deck allocates 40 minutes across both text notebooks and roughly 35 minutes for the image lesson, including typing and questions. These are planning allowances, not measured classroom timings.

Show the code, ask attendees to predict the result, then run it. Pause after the first loop. Let everyone reach a working saved file before trying the edit.

The beginner text model is a four-word simulation; Part 2 uses a real LLM. The image method deliberately relies on a plain starting colour and four known pixel positions. These assumptions are stated in the notebooks. The browser's larger pixel demo has its own header and checksum, so it cannot decode the notebook's four-bit files. StegaStamp and VideoSeal explain learned methods in the research section; neither is part of the beginner image build.

The beginner notebooks passed fresh Colab CPU runs in the browser, including their exercise answers and saved-file checks. Part 2 passed a local CPU real-model rehearsal; its fresh Colab setup and text-box rendering have not been run. See the [validation record](../exports/notebook-validation.md). A timed walkthrough with beginners remains to be rehearsed.
