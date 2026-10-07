# Facilitator guide

Mark My Words. And Pixels.

Expanded preparation plan: 210 to 225 minutes. The history and use-case section is intentionally longer at Mayank’s request. The original target was 180 minutes; the published event slot remains 150 minutes.

## Timing

History and use cases 60 to 75m; AI and research 40m; setup 10m; text lab 40m; image lab 35m; challenge 15m; questions 10m.

For a hard 150-minute slot, select a smaller set of cases and use the earlier 30 / 30 / 5 / 30 / 30 / 15 / 10 allocation. Showing every expanded case plus both builds needs the longer plan.

## Case-study run sheet

Childhood UV pen and Muller 5m; Baker’s stage photograph and music 8m; Denton first pass and decoded replay 7m; paper watermarking 5m; memo and Tesla 10m; Genius 8m; Google/Bing 8m; printer dots 7m; discussion and transition 2 to 17m.

For each case, let the room see the carrier first, ask what it could reveal, then explain the signal and the limit of the conclusion. Baker and Denton concern covert communication; Google’s experiment plants a canary; the other examples identify sources or copies. The examples are historical evidence that these use cases exist beyond AI, not claims about every current product.

## Playback

Denton: watch the supplied 41-second YouTube upload on the first slide, then advance to the separate decoded replay slide. Both start from the beginning, with no on-slide buttons. P pauses or resumes; M toggles sound; R restarts. The Morse guide is a reading aid for the documented message, not frame-synchronised eye tracking. Treat the account seriously and leave a pause afterwards. No automatic loop.

StegaStamp: 00:00–00:59 for the physical demonstration; optional mechanism 00:59–01:27; physical tests 01:27–01:50. Direct YouTube links need a manual stop. Chrome Premium is the preferred fallback.

## Hands-on flow

Use demos/text-watermark-lab.ipynb for the four-word warm-up, then demos/text-watermark-part-2.ipynb for real-model generation and detection. The 40-minute text block includes both. The image block uses demos/image-watermark-lab.ipynb: four bits in known pixels, PNG save/reload and JPEG comparison. Each beginner exercise has a runnable solution. VideoSeal remains a research example and optional extension, not the included image lab.

## Rehearsal

The current beginner text and image notebooks passed fresh Colab CPU runs in the browser, including saved-file checks and exercise solutions. Text Part 2 passed local real-model CPU execution with cached weights, repeatability checks and detector callbacks. It has not been run in a fresh Colab session; its installer, model download and text-box rendering remain unverified there. Earlier model-based Jupyter checks applied to the archived notebooks. Attendee concurrency, venue timing and any live print-camera setup also remain separate checks. See exports/notebook-validation.md and exports/validation.md.

## Automatic playback

The supplied invisible-ink GIFs, paper GIF, author GIFs, token walkthrough and image distortions start on active-slide entry and loop. Animations pause off-slide, in hidden tabs or under blackout. The three opening GIFs have no on-slide playback controls. Press P to pause or resume the active opening animation. Other demos retain their controls. A deliberate pause is remembered until playback is resumed. Reduced-motion settings and presenter windows start still, with manual play available. YouTube clips start muted and play once. Timers, evidence inspection and audience reveals remain presenter-controlled.

## Optional video production

See slides/video-cues.md for clips and optional Veo prompts. Generated clips are conceptual illustrations only.
## Presentation controls

The audience sees no page counter or navigation bar. Press ? (Shift+/), Cmd+P or Ctrl+P to open presentation controls. Escape closes the panel. Arrow keys navigate; N opens notes; O opens the map; B blanks the screen; F toggles full screen.


## Slide notes

### 1. Mark My Words. And Pixels.

Open with the brief AI disclaimer and agenda, then the childhood invisible-ink question. We’re going to hide information in a memo, in generated text, and in an image. Then we’ll make changes and see what survives. Shreya and I will switch between the examples and the notebooks. The expanded preparation plan is 210 to 225 minutes, with 60 to 75 minutes for history and use cases. The user approved extending this section; the published slot remains 150 minutes. The cover image is conceptual artwork.

### 2. Disclaimer

Acknowledge using AI to help create this workshop and its slides. I’m a developer by heart. I would probably have made a Word document before. Now I can spend more time turning the examples into something we can see and try together. Keep this spoken and brief; the slide only says Disclaimer.

### 3. What we’ll cover

We’ll start with examples. Then we’ll go back to where watermarking started, agree on what we mean by it, and look at why these uses still matter. Finally, we’ll build and test both text and image watermarks. Keep the detailed timings off this slide.

### 4. How many of you used this in your childhood?

How many of you used this in your childhood? The pen with a little UV torch on the cap. Give the room a moment to respond while the clip loops. You write something that looks invisible under ordinary light, then the torch reveals it. The message was on the page the whole time. This supplied illustration shows UV fluorescence. Use this as a short audience warm-up before the three planned demos.

### 5. Spies used invisible ink, too

People also used invisible writing to pass intelligence during war. In 1915, German spy Karl Muller sent apparently ordinary letters to Rotterdam. Between the visible lines, he wrote intelligence about British troop movements in lemon juice. British postal censors flagged the destination; an MI5 officer revealed the hidden writing with a warm iron. Open the National Archives story to show the actual letter. The newspaper GIF is a supplied illustration: its UV light and map are not a reconstruction of Muller’s method or document. This is secret writing, a form of steganography: concealing a message’s existence. Watermarking uses embedded information for purposes such as identifying a source or tracing a copy. Keep that distinction as we turn to paper makers.

- [The National Archives · Karl Muller and the fatal lemon · 1915 letter](https://www.nationalarchives.gov.uk/explore-the-collection/stories/karl-muller-and-the-fatal-lemon/)

### 6. Josephine Baker

This is Josephine Baker, performing in Oran in 1943. Before showing the next slide, ask: What would nobody question her carrying across a border? Give people time to answer. A travelling performer has a natural reason to carry sheet music. That makes the carrier itself part of the concealment. This photograph documents a performance; it does not depict an intelligence handover.

- [U.S. National Archives · Josephine Baker on stage in Oran, 17 May 1943 · 111-SC-175237](https://catalog.archives.gov/id/531160)
- [International Spy Museum · Josephine Baker’s sheet music](https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/)

### 7. Her sheet music carried another message

Baker worked for French intelligence during World War II. The Spy Museum describes her carrying Allied intelligence about German plans and troop movements in invisible ink on sheet music. The museum presents music like this as the carrier. We are looking at its collection image, not claiming that we have recovered a secret message from this particular page. The useful question is why the object would look ordinary in her hands. This is covert communication: hide the existence of a message inside something that fits the situation.

- [International Spy Museum · Josephine Baker’s sheet music](https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/)

### 8. Watch his eyes

Introduce this soberly: Jeremiah Denton was a U.S. Navy officer held prisoner in North Vietnam. Ask: Can you notice anything in this video? Do you notice anything happening here? Let the footage play without supplying the answer. Advance to the next slide to explain the message and replay it. P pauses or resumes, M toggles sound, R restarts. The supplied 41-second upload contains publisher graphics; the original footage is not a clean silent puzzle. Do not treat this as a game or invite applause for guessing. Sources and direct playback links remain in these notes.

- [U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview](https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/)
- [U.S. National Archives · Jeremiah Denton eyewitness account](https://www.archives.gov/exhibits/eyewitness/html.php?section=8)
- [Supplied Denton footage · Audie Murphy American Legend upload](https://www.youtube.com/watch?v=rufnWLVQcKg)

### 9. He was blinking a message

During the filmed interview on 2 May 1966, Denton blinked TORTURE in Morse code. This slide replays the clip from the beginning with the documented message beside it. The guide shows the Morse spelling; it is not a frame-timed transcription or automated eye tracking. Keep a serious tone and leave a pause afterwards. This is communication under coercion, not a watermark embedded in the video. The Navy and National Archives establish the history; the supplied YouTube upload is a later edit. P pauses or resumes, M toggles sound and R restarts the clip.

- [U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview](https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/)
- [U.S. National Archives · Jeremiah Denton eyewitness account](https://www.archives.gov/exhibits/eyewitness/html.php?section=8)
- [Supplied Denton footage · Audie Murphy American Legend upload](https://www.youtube.com/watch?v=rufnWLVQcKg)

### 10. Hold it against the light.

Now go further back, to paper makers. Secret writing hides a message; a maker’s watermark can identify where a sheet came from. Show the supplied paper animation. It plays and loops automatically. The light helps us see structure inside the sheet. This clip is a conceptual reconstruction; the next slide shows the historical watermark photograph from the Library of Congress. Press P to pause or resume while explaining the difference between adding ink and changing the paper itself.

### 11. This started with actual paper.

Watermarking was around long before AI. This is why we began with those examples: people have been hiding messages, identifying sources and tracing copies for a long time, for different reasons. The uses and means have changed. A wire pattern in the mould changes the paper’s thickness, so the maker’s mark becomes visible against light. This is a real watermark from the Fabriano paper research shared by the Library of Congress. The pattern comes from the way the paper is made. You do not need a computer to carry information inside an object. It can help identify a papermaking workshop. That is the idea we will keep, even as the material changes.

- [Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro](https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/)
- [Fabriano Paper and Watermark Museum · Watermark technique](https://museodellacarta.com/en/watermark_tecnique.html)

### 12. Four copies. Which one came back?

I’m giving four people what looks like the same memo. Pick a copy, save it, and return the raw text. Let’s see whether we can identify the copy. This is a fictional example we can inspect, based on the idea behind a reported Tesla story. After revealing the ID, normalize the spaces and run the check again. The result identifies a copy, not the person who leaked it.

- [Musk’s 2022 account of a 2008 Tesla incident · NDTV](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802)

### 13. The difference is in the spaces.

We use one space for zero and two for one. Eight gaps give us an eight-bit number. In our demo, 37 maps to Copy A. That works only while the gaps survive. Paste through something that normalizes whitespace and the code disappears. It is a simple recipient fingerprint, not a secure identity system.

- [Musk’s 2022 account of a 2008 Tesla incident · NDTV](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802)

### 14. Musk says Tesla used a version of this.

Show the supplied screenshot, starting with the enlarged reply. The Whole screenshot and Open full image controls preserve the conversation around it. Musk says the emails used one or two spaces between sentences. Our teaching memo uses gaps between words, so it demonstrates the principle rather than recreating his exact implementation. His post is an account of the incident, not an independently available investigation. The technical point is recipient fingerprinting: issue distinguishable copies and compare the leaked version. Matching a copy does not by itself prove who disclosed it.

- [Elon Musk · 9 October 2022 post](https://twitter.com/elonmusk/status/1579101966453858305)
- [Musk’s 2022 account of a 2008 Tesla incident · NDTV](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802)

### 15. Genius did it with apostrophes.

Genius described alternating straight and curly apostrophes to encode a pattern. Its congressional submission is worth opening because it shows the allegation directly. Google said it received lyrics from providers and investigated that supply chain. The mark can help trace a copy; it does not, on its own, settle who copied from whom. The displayed Morse sequence spells RED HANDED, the phrase stated in the submission.

- [Genius · Statement to the US House Judiciary Committee · 2019](https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf)
- [Google · How we help you find lyrics on Google Search](https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/)

### 16. Here’s the example Genius submitted

This is the supplied Attachment A image from Genius’s submission. The full exhibit can be opened without altering the original. Follow the highlighted apostrophes across to the Morse table. Straight maps to dot, curly maps to dash, and the sequence spells RED HANDED. The screenshot is evidence Genius presented; it does not independently establish the whole copying chain. Google said it licensed lyrics from providers and was investigating those providers. The use case is tracing reuse of content that can look unchanged to a reader.

- [Genius · Statement to the US House Judiciary Committee · 2019](https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf)
- [Google · How we help you find lyrics on Google Search](https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/)

### 17. What should “hiybbprqag” return?

Ask what this invented query should return. Google deliberately inserted an unrelated real page as its top result. This screenshot shows a Wiltern theatre seating page. That arbitrary pairing is the signal. Google described about 100 synthetic queries and 20 engineers searching and clicking with Internet Explorer 8 and Bing Toolbar. This is a planted canary, related to watermarking through the goal of tracing reuse. It is not a hidden payload embedded in the page.

- [Google · Microsoft’s Bing uses Google search results · 1 February 2011](https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html)
- [Microsoft Bing · Setting the record straight · 2 February 2011](https://blogs.bing.com/search/2011/2/Setting-the-record-straight/)

### 18. Then the same answer appeared in Bing

Google reported that some of its planted results appeared in Bing within weeks. The matching nonsense query and unrelated answer make this more informative than two engines returning a popular page. Microsoft disputed the copying accusation and said anonymous opt-in clickstream data was one of many ranking signals. It described the test as manipulation of that signal. Show both primary accounts. The comparison supports discussion of reuse through a data pathway; it is not evidence that all Bing results came from Google. Ask: What makes a useful tracer? It should be distinguishable from what ordinary independent behavior would produce.

- [Google · Microsoft’s Bing uses Google search results · 1 February 2011](https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html)
- [Microsoft Bing · Setting the record straight · 2 February 2011](https://blogs.bing.com/search/2011/2/Setting-the-record-straight/)

### 19. Your printer can leave a signature

Begin with EFF’s faint white-light photograph. Ask what the page appears to reveal. Look closer switches to the blue-light photograph and enlarges it, making the repeating pattern easier to see. Read the code brings up EFF’s annotated sample and documented readout: 21 June 2005 at 12:50, serial 21052857 or 052857 depending on how the serial is read. The time comes from the printer’s clock. The mechanism encodes date, time and device information in yellow tracking dots. This identifies a device, not the person pressing Print. These are EFF’s DocuColor photographs and interpretation, not a universal printer decoder. The case also raises a privacy question: who chooses whether this signal is added?

- [EFF · DocuColor tracking dot decoding guide · 2005](https://w2.eff.org/Privacy/printers/docucolor/)
- [EFF · Investigating Machine Identification Code Technology](https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers)

### 20. Why spend this long on the examples?

We could have started with an encoder and a detector. A basic embed-and-detect demo is straightforward. Deciding where it belongs, what it should establish and what happens when it fails is harder. I wanted to give you a wider sense of what is possible before we choose an implementation. Robust watermarking still takes real engineering; easy here means getting the first demo running.

### 21. The use case changes what we build

The paper makers, Tesla and Genius give us concrete reasons to put information into content. These are examples to connect the ideas, not claims that every system uses the same scheme. AI adds the same source-identification question at much greater volume. A detector needs a particular scheme and compatible key; this is not a universal test for AI authorship. Secret messages like Baker’s and Denton’s have another purpose again. Choosing the question first helps us choose the signal and evaluate whether the result is useful.

### 22. So what are we calling a watermark?

We have seen several related ideas with different jobs. Baker and Denton concealed communication. Google planted a canary to investigate reuse. The memo and Genius examples distinguish copies, while printer dots identify a device. Those goals should not be conflated. The deliberate part matters. We are adding a signal and later testing for that signal. That is different from guessing whether text sounds like an LLM. It is also different from a signed record of how a file was created. Neither a watermark nor a signature tells us whether the content is true.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)
- [C2PA · Frequently asked questions](https://c2pa.org/faqs/)

### 23. We’ll build both versions.

The expanded case-study block can take 60 to 75 minutes. Continue when the room understands the uses and boundaries. Next we’ll look at the mechanisms, then build text and image examples in Colab. Start text with a four-word warm-up, then use a real model in Part 2. The image lab writes four bits into pixels and tests a saved PNG and JPEG. These images are StegaStamp examples, a separate learned method. There is time at the end to edit the content and compare results.

- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)

### 24. Let’s slow down one token.

Each bar is one candidate for the next token. In this toy, their starting scores are equal. The key and previous token select four candidates to prefer. We add a bias, normalize, and sample. Watch the preferred set change with the context. A preferred token is more likely, not guaranteed. This is a transparent simulator, so we can see every step before using a real model. The animation starts on entry and loops through the same seeded sequence. Pause or Step to discuss one choice.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)

### 25. Changing the font won’t change the words.

Generate with the default key and bias. First remove the highlighting with Plain text. The words and score stay the same. Now edit the words. The score changes because the choices and contexts changed. Try the wrong key too. This is the toy sampler from the previous slide, not a detector for arbitrary AI text. Its score is descriptive and uncalibrated.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)

### 26. There’s a trade-off in the paper too.

These are the authors’ measurements, not our notebook results. The vertical axis is the average detection score. The horizontal axis is perplexity under an oracle model, with lower values to the right. Look at how the points move as the bias changes. The right plot uses greedy and beam search settings, so we should not read it as the same experiment as the left. These results used roughly 200 generated tokens per sample.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)

### 27. The wrapper goes before sampling.

This answers the wrapper question. We keep the model weights fixed and change scores just before sampling. Open weights give us control of that step. A hosted model can also work if its endpoint implements the matching watermark scheme. If all we receive is completed text, we cannot insert this same generation-time method afterward.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)
- [Hugging Face · Watermark generation and detection](https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking)

### 28. SynthID Text takes a different sampling route.

SynthID Text uses tournament sampling to influence token selection. This is a schematic, not an exact four-candidate implementation. The layers mentioned in this method are sampling stages, not new trained neural layers inside the LLM. The reference code includes a weighted-mean detector and a Bayesian detector with different setup needs. Open code does not give us a provider’s secret keys or a universal detector.

- [Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024](https://www.nature.com/articles/s41586-024-08025-4)
- [Google DeepMind · SynthID Text reference code](https://github.com/google-deepmind/synthid-text)

### 29. Now take the image off the computer.

This is the authors’ StegaStamp demonstration. Watch the link survive the move from a digital image to a physical photograph and a camera view. Pause after the opening minute. We should only call a live print-and-camera version our demo after rehearsing our own hardware. If the embed fails, open the YouTube link in the signed-in Chrome session and pause at 00:59. The mechanism animation is 00:59 to 01:27. The opening clip starts muted on slide entry. Enable sound when narrating the authors’ video. Narrated clips play once rather than looping. A presenter window does not autoplay a second copy.

- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)
- [Matthew Tancik · StegaStamp overview video](https://www.youtube.com/watch?v=E8OqgNDBGO0)

### 30. Here’s what they tested in the room.

These three clips start together and loop on entry. Pause individual clips to focus the discussion. Look at angle, light, and how much of the image is visible. These are the authors’ examples, not a guarantee for every camera or print. The displayed percentages concern recovered bits in these examples, not the probability that an image is AI-generated. The controls play and pause the locally included author GIFs.

- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)
- [Matthew Tancik · StegaStamp overview video](https://www.youtube.com/watch?v=E8OqgNDBGO0)

### 31. The encoder changes the image itself.

These are the original, encoded image, and residual visualization from the StegaStamp project page. The image carries the signal; it is not just a metadata field. The residual makes changes easier to inspect, so do not confuse its visible intensity with what viewers see in the encoded image. Our beginner notebook will expose the pixel changes directly. VideoSeal is an optional learned-model extension.

- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)

### 32. What changes in nine pixels?

Each square is one pixel with red, green and blue values. This is a hand-chosen 3 × 3 arithmetic example, not a crop of the dinosaur or output from StegaStamp. Start at the top-left pixel: (120, 85, 60) becomes (122, 84, 61). Subtract the original from the encoded pixel and the residual is (+2, -1, +1). Click any square, or use Tab and Enter, to highlight the same position in all three grids. The original and encoded cells use their actual RGB colours. The residual grid prints signed channel differences on a neutral background; those negative values are not displayable RGB colours. Encoded is the final image, not an intermediate before another output. This example illustrates the arithmetic only. A trained encoder chooses a coordinated pattern of changes to carry message bits across a much larger image. No message is encoded or decoded by these nine hand-chosen changes.

- [StegaStamp · Original, encoded image and residual examples](https://www.matthewtancik.com/stegastamp)

### 33. Training includes the changes we expect.

The encoder and decoder are trained with image distortions between them. That exposes them to the kinds of changes the authors want the message to survive. This animation only illustrates angle, light, and cropping; it does not execute the authors’ differentiable training transforms or run a decoder. In the actual method, successful recovery is a training objective. Real-world performance still depends on what the system was trained and tested against. The animation automatically cycles through angle, light, and crop. The controls can select an effect or pause it.

- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)

### 34. A learned encoder is the next step.

VideoSeal is a next step after the beginner lab, not the notebook we run today. Its official image model embeds a 256-bit payload with a learned encoder. A separate application could map that payload to a copy record. The image shown here is a StegaStamp example, not a VideoSeal output. The included image notebook instead changes four known red-channel values, saves a PNG, reloads it and checks a JPEG. That small example does not establish learned-model or print-camera robustness.

- [Meta · VideoSeal repository and models](https://github.com/facebookresearch/videoseal)
- [VideoSeal · Official TorchScript inference guide](https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md)
- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)

### 35. A positive result still has a boundary.

These are useful places to continue the discussion. Watermark stealing studies whether outputs let an attacker approximate a scheme. Radioactivity asks whether training on watermarked text can leave a statistical trace in another model. C2PA records signed provenance. These have different threat models. A mark can also be added to human-created content, and a missing mark has several possible explanations.

- [Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024](https://arxiv.org/abs/2402.19361)
- [Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024](https://arxiv.org/abs/2402.14904)
- [C2PA · Frequently asked questions](https://c2pa.org/faqs/)

### 36. Let’s get Colab ready.

Scan or click the Open in Colab card for Text Part 2. The link opens the public notebook on the repository’s main branch. Run its setup cells now; the first model download is about 0.7 GB. Start the beginner text warm-up while that runs, then return to Part 2. If a runtime is unavailable, pair up and keep the browser simulator open. The beginner text and image notebooks passed fresh Colab CPU runs in the browser. Text Part 2 has local CPU evidence with cached weights; its fresh Colab setup and text-box rendering have not been run. Venue timing remains a separate rehearsal check.

### 37. Let’s add the text wrapper.

Scan or click either Open in Colab card to open its notebook directly from the public repository. Use the beginner text notebook for a five to ten minute warm-up: favour two of four words, save the text, then count and edit the pattern. Continue in Text Part 2 with a small open-weight model. Generate twice with the same seed and five starting words, compare token sequences, then add the watermark configuration and repeat. Model loading and detector code are provided. The short generation cells and small experiments are what we work through together.

### 38. This is the part we add.

This is the compact version of the notebook code. The watermark configuration changes generation. The detector must use the same tokenizer and watermark settings. We score the generated continuation, not the prompt. Keep the key and device choices aligned. The exact code in the notebook handles those details.

- [Hugging Face · Watermark generation and detection](https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking)
- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)

### 39. Run the controls before trusting the score.

Use Text Part 2 to compare the unmarked and marked continuations. Repeat each with the same seed before changing anything. Try zero watermark bias, a short excerpt, and edited wording in the check box. Rerun the configuration and detector cells when changing the bias. A short or repetitive passage can return too little varied text. If the basic pair does not behave as expected, debug it before testing edits. The score is not a probability of AI authorship.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)
- [Hugging Face · Watermark generation and detection](https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking)

### 40. Pause here. Compare two outputs.

Give pairs ten minutes to get one marked and one ordinary continuation and run the checks in Text Part 2. Ask a pair to show the actual text, not just the score. If the marked sample is awkward, discuss the bias and sampling settings. If the result is weak, look at length, configuration, and repetition before changing the threshold. The final exercise removes the preference while keeping the seed and generation settings fixed.

### 41. Now hide four bits in an image.

Scan or click Open in Colab to open the beginner image notebook directly from the public repository. We make a flat-colour picture and store [1, 0, 1, 1] in the parity of its first four red-channel values. Save the image as a PNG, reopen the saved file, and read the bits back. Keep the unmarked original to compare. Four bits are a teaching example and can match by chance; this is not a copy registry or an identity detector.

### 42. First, try the simplest pixel trick.

This browser version writes a header, a copy ID, and a checksum into the low bits of the first 48 red-channel values. Embed the ID and save the PNG. Reload it and check the result. Then run a real JPEG round trip. The beginner notebook uses the same parity idea with only four bits in four known pixels, so attendees can follow every line. The two formats are different; do not use this browser decoder to validate the notebook image.

### 43. Put four bits into four pixels.

This is the code from the beginner image notebook. The generated picture starts at RGB (200, 210, 230), so adding each bit changes only the first four red values to 200 or 201. It is a deliberately limited form of low-bit encoding for this known starting image. The next notebook step reads each saved red value modulo two. Run the saved-file check before trying JPEG. Attendees then choose another four-bit message; a complete solution follows the exercise.

### 44. One changed bit. A different message.

These are the observed results of the current beginner notebook using its unchanged flat-colour image, [1, 0, 1, 1] message and JPEG quality 20. The PNG preserves the bits; the JPEG reads [1, 1, 1, 1] in the local Pillow 11.3.0 rehearsal. Different input images, messages, codecs and quality settings can give different results. We compare the four values directly. There is no registry, correction code or calibrated watermark detector.

### 45. Check the file after each change.

These are the four files the image notebook creates. Verify each after reopening it, not just while it is in memory. For the original sample, expect zero bits before marking and the selected message in the PNG. For the JPEG, show the actual result rather than assuming a particular failure. In the final exercise, attendees choose a new four-bit message and rerun the save-and-read sequence. Further transformations are optional experiments, not prepared notebook controls.

### 46. Try to remove the mark without ruining the content.

Use the workshop’s own examples. Choose text or image. For text, edit the generated continuation and use the check box in Part 2. For images, change the JPEG quality and rerun the four-pixel read. Save before and after versions and record the exact change. A failed check alone is not enough; establish that the starting example worked. Cropping, learned encoders and stronger payloads are optional extensions after the prepared exercises.

### 47. Show us what changed.

Open two or three attendee examples. Start with the actual content and edit, then inspect the detector output. If a result is surprising, check the baseline and configuration together. We are comparing specific experiments, not deciding that a whole watermark family is solved or broken.

### 48. What would you need before shipping this?

The notebook shows the mechanism and gives us an evaluation starting point. Shipping it adds calibration, key management, quality evaluation, operational ownership, and decisions about ambiguous matches. What would those look like in your use case? Use the remaining time for questions and notebook recovery.

### 49. Papers and demos.

These links open the original sources. The workshop demos folder has three notebooks: the beginner text warm-up, Text Part 2 with a real LLM, and the four-bit image lab. VideoSeal and AudioSeal are optional extensions, not included hands-on builds. Current beginner Colab results and Text Part 2 local CPU results are in exports/notebook-validation.md. Text Part 2 fresh Colab execution and venue video playback remain separate checks.

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)
- [Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024](https://www.nature.com/articles/s41586-024-08025-4)
- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)
- [Matthew Tancik · StegaStamp overview video](https://www.youtube.com/watch?v=E8OqgNDBGO0)
- [Meta · VideoSeal repository and models](https://github.com/facebookresearch/videoseal)
- [VideoSeal · Official TorchScript inference guide](https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md)
- [Hugging Face · Watermark generation and detection](https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking)
- [Musk’s 2022 account of a 2008 Tesla incident · NDTV](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802)
- [Genius · Statement to the US House Judiciary Committee · 2019](https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf)
- [Google · How we help you find lyrics on Google Search](https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/)
- [EFF · Investigating Machine Identification Code Technology](https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers)
- [Fabriano Paper and Watermark Museum · Watermark technique](https://museodellacarta.com/en/watermark_tecnique.html)
- [C2PA · Frequently asked questions](https://c2pa.org/faqs/)
- [Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024](https://arxiv.org/abs/2402.19361)
- [Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024](https://arxiv.org/abs/2402.14904)
- [Meta · AudioSeal](https://github.com/facebookresearch/audioseal)
- [Google DeepMind · SynthID Text reference code](https://github.com/google-deepmind/synthid-text)
- [Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro](https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/)

## Full source index

- [Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023](https://proceedings.mlr.press/v202/kirchenbauer23a.html)
- [Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024](https://www.nature.com/articles/s41586-024-08025-4)
- [Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020](https://www.matthewtancik.com/stegastamp)
- [Matthew Tancik · StegaStamp overview video](https://www.youtube.com/watch?v=E8OqgNDBGO0)
- [Meta · VideoSeal repository and models](https://github.com/facebookresearch/videoseal)
- [VideoSeal · Official TorchScript inference guide](https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md)
- [Hugging Face · Watermark generation and detection](https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking)
- [Musk’s 2022 account of a 2008 Tesla incident · NDTV](https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802)
- [Genius · Statement to the US House Judiciary Committee · 2019](https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf)
- [Google · How we help you find lyrics on Google Search](https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/)
- [EFF · Investigating Machine Identification Code Technology](https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers)
- [Fabriano Paper and Watermark Museum · Watermark technique](https://museodellacarta.com/en/watermark_tecnique.html)
- [C2PA · Frequently asked questions](https://c2pa.org/faqs/)
- [Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024](https://arxiv.org/abs/2402.19361)
- [Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024](https://arxiv.org/abs/2402.14904)
- [Meta · AudioSeal](https://github.com/facebookresearch/audioseal)
- [Google DeepMind · SynthID Text reference code](https://github.com/google-deepmind/synthid-text)
- [Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro](https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/)
- [The National Archives · Karl Muller and the fatal lemon · 1915 letter](https://www.nationalarchives.gov.uk/explore-the-collection/stories/karl-muller-and-the-fatal-lemon/)
- [International Spy Museum · Josephine Baker’s sheet music](https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/)
- [U.S. National Archives · Josephine Baker on stage in Oran, 17 May 1943 · 111-SC-175237](https://catalog.archives.gov/id/531160)
- [U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview](https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/)
- [U.S. National Archives · Jeremiah Denton eyewitness account](https://www.archives.gov/exhibits/eyewitness/html.php?section=8)
- [Supplied Denton footage · Audie Murphy American Legend upload](https://www.youtube.com/watch?v=rufnWLVQcKg)
- [Google · Microsoft’s Bing uses Google search results · 1 February 2011](https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html)
- [Microsoft Bing · Setting the record straight · 2 February 2011](https://blogs.bing.com/search/2011/2/Setting-the-record-straight/)
- [Elon Musk · 9 October 2022 post](https://twitter.com/elonmusk/status/1579101966453858305)
- [EFF · DocuColor tracking dot decoding guide · 2005](https://w2.eff.org/Privacy/printers/docucolor/)
