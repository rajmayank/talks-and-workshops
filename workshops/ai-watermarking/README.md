# Mark My Words. And Pixels.

AI watermarking with open-source tools. Mayank Raj and Shreya Agrahari.

- [Portable interactive deck](exports/mark-my-words.html)
- [Facilitator guide and sources](slides/facilitator-guide.md)
- [Video cues and optional Veo prompts](slides/video-cues.md)
- [Hands-on setup and lab flow](demos/README.md)
- [Beginner text notebook](demos/text-watermark-lab.ipynb)
- [Text Part 2: real LLM](demos/text-watermark-part-2.ipynb)
- [Image notebook](demos/image-watermark-lab.ipynb)

50 slides. Expanded cases include Josephine Baker, Jeremiah Denton, Tesla, Genius, Google/Bing, and EFF’s printer-dot work. Both text and image builds remain. The expanded plan is 210 to 225 minutes, including 60 to 75 minutes for history and use cases. A shorter selection for the published 150-minute slot is described in the facilitator guide.

## Present

Open `exports/mark-my-words.html` in Chrome. The portable file includes the research images, author GIFs, styles, scripts and Colab QR codes. Scan or click **Open in Colab** on the setup and lab slides to open a notebook from the public repository's `main` branch. The hosted presentation does not need notebook files beside it. YouTube and first-time Colab/model downloads need internet. The local browser experiments do not.

For the editable source preview, from the repository root:

```sh
python3 shared/presentation/serve.py
```

Open http://127.0.0.1:8765/workshops/ai-watermarking/slides/ in Chrome. The preview server blocks `research/` and hidden paths.

Left/right move between slides. `O` opens the map, `N` opens notes, `B` blanks the screen, `F` enters fullscreen. Press `?` (Shift+/), `Cmd+P` or `Ctrl+P` to open the hidden controls. The Presenter window action opens synchronized notes in a second window. No page counter or navigation bar appears on the audience screen. Use separate displays to keep notes off the projector. Timers continue until paused/reset.

The workshop is delivered as an interactive browser deck. The two opening invisible-ink GIFs, paper GIF, token walkthrough, author GIFs, and distortion illustration autoplay on entry and loop. The distortion illustration cycles through angle, light, and crop. The three opening GIFs have no visible playback controls; press `P` to pause or resume them. The other demos keep their controls, including Step and Reset for the token walkthrough. Animations pause off-slide or when the tab is hidden. Reduced-motion settings and presenter windows start still, with manual play available. Videos start muted and play once; Enable sound turns on narration. Denton’s first slide shows the footage alone. The next slide replays it beside the decoded message and a Morse guide, without claiming frame-level alignment. These slides have no on-slide playback buttons; `P` pauses/resumes, `M` toggles sound and `R` restarts. Tesla and Genius screenshots have detail, whole-image and full-size views. The printer case has white-light, magnified blue-light and documented-readout steps. Slide transitions run automatically when navigating. Timers and audience reveals stay manual.

## Demos and limits

The browser includes a fictional memo fingerprint, a transparent toy token sampler, an animated sampling walkthrough, a distortion illustration, and a fragile pixel LSB experiment. They compute results and support controls. The sampler is not an LLM. The pixel exercise is not VideoSeal or StegaStamp.

There are three notebooks: a four-word text warm-up, a real-LLM follow-on, and a four-bit image lab. The beginner notebooks introduce Python through complete short cells, small exercises and runnable solutions. Text Part 2 generates repeatable ordinary and marked continuations, then checks pasted text. The image lab saves and reopens a PNG, reads its four bits, and compares a JPEG. VideoSeal remains an optional extension beyond this lab.

The beginner text and image notebooks passed fresh Colab CPU runs in the browser, including saved-file checks and exercise solutions. Text Part 2 passed local CPU inference with cached weights; its fresh Colab setup and text-box rendering have not been run. Current results and environment details are in the [notebook validation record](exports/notebook-validation.md). Classroom timing and any live StegaStamp printer/camera setup still need rehearsal; the authors' video is available as a fallback.

## Rebuild and reuse

```sh
node shared/presentation/build.cjs
node --test workshops/ai-watermarking/demos/lab.test.cjs
```

Edit `slides/slides.js` for content and speaker notes, `slides/workshop.css` for the visual theme, and `demos/lab.js` for interactions. The shared engine lives in `shared/presentation/`. Rebuild the portable HTML after content or style changes.

[Validation record](exports/validation.md) distinguishes deck checks from outstanding workshop rehearsal. Local source materials and temporary renders stay under the Git-ignored `research/` directory.
