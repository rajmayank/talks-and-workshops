# Browser deck validation

Original deck checks: 2026-10-05. Current source: 50-slide interactive HTML deck. Latest audience edits checked on 2026-10-07. Earlier slide counts and numbers below identify the build checked at that time.

## Passed

- The original deck was reviewed visually during its rebuild. The expanded case slides were reviewed in the portable HTML in the in-app browser and Chrome. A sheet-music control initially crossed the footer; its placement was corrected and checked again.
- Portable HTML loads all images from its own embedded assets. No missing images or browser console errors in the final package.
- Memo experiment: Copy D recovered; whitespace normalization removes the issued copy ID.
- Text experiment: default marked score 6.62; plain-text view 6.62; edited wording 1.33; wrong-key control −2.52. These are descriptive toy scores.
- Token animation: candidate probabilities sum to one, and its choices match the underlying sampler. Step, play/pause, and reset controls are present; stepping and playback state were checked.
- StegaStamp author GIFs: all three play/pause controls checked. Pausing captures the current frame.
- Distortion illustration: angle, light, and crop controls are wired to the illustration; lighting and animation play/pause checked in the browser. It does not run a decoder.
- Pixel experiment: embedded copy ID 2048 recovered; an actual JPEG encode/decode round trip removes the valid ID in this sample.
- Four focused automated checks pass: memo identity/normalization, keyed token behavior, pixel payload/corruption, and animation/sampler consistency.
- StegaStamp YouTube video opened in Chrome Premium and played at the mechanism cue. Exact clip ranges are recorded in `slides/video-cues.md`.
- Source links are visible on the relevant slides. Research figures and author animations have attribution; reported stories are distinguished from verified experiments.
- Supplied paper GIF is copied unchanged, embedded in the portable HTML, and autoplays on slide 7. Its 101 frames run for 10.1 seconds and loop. Opening slide and updated video controls fit within the slide bounds.
- Sampler, author GIFs, and distortion illustration autoplay on entry. The sampler loops; distortion cycles through angle, lighting, and crop. Leaving a slide stops its animation; a manual pause survives leaving and returning.
- Before the label cleanup, paper animation pause/replay, blackout pause/resume, reduced-motion manual playback, and presenter-view suppression were checked in the browser. No console errors on the updated portable opening slide.
- YouTube muted autoplay and native pause coordination checked in Chrome. Narrated clips play once; sound remains a presenter control.
- The two supplied UV GIFs are copied unchanged and embedded in slides 2 and 3. Both were checked for loading and autoplay in the previous 37-slide build and are preserved in the expanded deck. Their original 10.1-second infinite loops remain intact. The opening GIFs now use the `P` shortcut for pause/resume, with no visible controls.
- Both new slides reviewed visually. The wartime slide's image, copy, link and controls fit above the footer. The National Archives source opens in the browser and includes the actual letter, heat-development account, and troop-movement details. The supplied UV illustration is distinguished from that historical method in the slide and notes.

## Expanded historical cases

- Baker's stage photograph and supplied music, Musk's supplied post, the Genius exhibit, Google's original screenshots, and all three printer states were visually reviewed. Supplied screenshots were copied unchanged and verified by file hashes. All are embedded in the portable deck.
- Genius whole-exhibit selection and the full-image dialog open/close behavior were checked. Evidence controls share one implementation with the Baker and Musk images.
- Printer controls were checked through all three states. The portable Chrome package responds to clicks and displays EFF's documented date, time, and both serial-number interpretations. This is an annotated source example, not a pixel decoder.
- Denton's supplied footage plays in Chrome. Replay reveals the Morse reading guide; First pass hides it. Pause, resume, and sound controls work. The guide is not a frame-aligned blink transcription.
- The generalized video player was checked with Denton and StegaStamp in the portable deck. The StegaStamp mechanism cue requests 00:59–01:27; leaving a clip removes its player. Denton's audio state does not carry into StegaStamp.
- Historical wording was checked against the Spy Museum, National Archives, U.S. Navy, Google and Microsoft's statements, and EFF. Notes distinguish secret communication, copy tracing, device identification, and AI watermarking.
- Expanded timing totals 210–225 minutes, including 60–75 minutes for history and use cases. The facilitator guide, workshop README, and video cue sheet reflect the expansion.

## Audience slide cleanup

- Removed production captions from slides 2, 3, 7, 23 and 27. Their context remains in presenter notes.
- Opening GIFs have no visible animation controls. Portable slide 2 loads its GIF automatically; `P` switches to a still frame and resumes playback. Slides 3 and 7 also load without captions or buttons.
- Browser checks confirm the removed text is absent and the rebuilt deck has no console errors.

## Still needs rehearsal

- Text Part 2 fresh Colab installation and browser rendering, notebook download completion and attendee concurrency. Beginner text and image notebooks passed actual fresh Colab CPU runs. Text Part 2 passed local real-model CPU execution with cached weights. See the [notebook rehearsal record](notebook-validation.md) for the exact scope. GPU execution is not required by the current labs.
- Any live StegaStamp printer/camera setup. Current physical-world evidence is the authors’ video and animations.
- Venue internet, projector readability, audio, and embedded YouTube playback. Direct YouTube links provide a Chrome fallback.

## Scope

The user removed PDF export and its verification from the requirements. It is not a deliverable or completion check. Private materials, working notes, and temporary authoring files remain under the ignored `research/` folder.

## 2026-10-07 audience edits

- Removed the event/workshop label from the cover and page counts throughout the audience deck. Removed the persistent navigation bar; controls now open with ? / Shift+/ or Cmd/Ctrl+P.
- Added a single-word Disclaimer slide, a four-part agenda and two short use-case transitions before the watermark definition. Expanded the paper slide’s continuity point. Removed the requested sampler and resources subtitles.
- Split Denton into a first-pass video slide and a separate decoded replay slide. Both have no custom buttons; the player requests hidden native controls. The decoded guide remains a static reading aid, not frame-aligned transcription.
- Inspected the cover, disclaimer, agenda, both Denton layouts, paper history and use-case slides visually. The 48-slide browser sweep found no text/control overflow or missing loaded images. No browser error logs were reported in the final pass.
- Browser checks passed for ? and Cmd+P, notes transfer, Escape and focus return. Denton footage played muted in the first-pass frame. Advancing removed the previous iframe and created an independent replay at zero; P removed/resumed the active player and M changed its mute state.
- Isolated lifecycle checks cover Cmd/Ctrl modifiers, dialog guards, navigation bounds, blackout, video source/origin filtering, off-slide cleanup and existing StegaStamp buttons. All four existing workshop demo tests pass.
- Cue sheet and generated facilitator notes reflect the new slide order. Venue video playback remains a rehearsal item.

## Notebook alignment

- Real-model setup and generation slides link to `text-watermark-part-2.ipynb`. The four-word beginner notebook is linked as the warm-up.
- Image lab slides follow the current notebook: four known pixels, PNG save/reload, JPEG comparison and a second message. VideoSeal remains an optional learned-model extension in the research section.
- Text exercises now match the prepared repeatability, zero-bias and pasted-text checks. The image comparison slide reports the observed beginner notebook result rather than an illustrative 256-bit registry result.
- The README and facilitator notes distinguish current sequential execution from archived notebook browser checks. The portable deck and hosted build have been rebuilt and checked in the browser.

## 2026-10-07 presentation release

- Added clickable Open in Colab QR cards to slides 36, 37 and 41. Their three static SVGs decode to the exact public GitHub-backed Colab URLs. The deck needs no QR generation service.
- Built the portable HTML and a separate hosting distribution. Ten focused tests pass across the browser demos and both builders, including SVG embedding, external notebook links and local-download removal.
- The hosting distribution contains 35 files, approximately 36.2 MB total. The largest asset is 12.73 MB, below Cloudflare Pages' 25 MiB file limit. It contains generated HTML, JavaScript, CSS, media and a checksum manifest. No notebooks, research or separate authoring files are copied to SudoMeet.
- SudoMeet production build passes. Its generated routes exclude `/presentation/*` from the application worker, allowing the static deck and media to load at `/presentation/ai-watermarking/`.
- The packaged deck was checked through the local Cloudflare Pages preview at the final path. All 49 slides load, with no missing images or text/control overflow. Two enlarged evidence images deliberately extend inside clipped viewing windows.
- QR layouts on slides 36, 37 and 41 were visually reviewed. All launch links point directly to Colab's GitHub loader; there are no local notebook download links in the hosted output. `?` opens the hidden controls, and Escape closes them.
- Source materials remain Git-ignored. Production deployment is separate from the requested SudoMeet PR.

## Presenter introduction

- Added slide 2 introducing Mayank Raj and Shreya Agrahari with their published workshop portraits. Mayank's LinkedIn remains clickable; Shreya's LinkedIn is omitted as requested.
- Added large static QR cards for `https://x.com/mayank9856` and `https://sudomeet.com`. Each SVG was rasterized and independently decoded at its displayed 232-pixel size with ZXing. Both payloads match exactly.
- The packaged slide was reviewed at 1280 × 720 in the browser. All four images load and all portraits, text, links and QR cards fit the slide.
- Rebuilt the portable export, facilitator guide and 50-slide hosting distribution. The hosting build now contains 39 generated files, with no notebook or authoring files. Updated video cue slide numbers after the insertion.
