# Reusable browser presentation shell

Dependency-free HTML, CSS and JavaScript. Slides use a fixed 1280 × 720 design space and scale to the viewport.

`motion.js` provides active-slide playback, manual pause state, visibility suspension, reduced-motion handling, and presenter suppression. Session widgets register start/stop handlers through `DeckMotion.create(stage)`.

`video.js` provides independent YouTube clips through `DeckVideo.mount(stage, motion)`. A `.video-case` supplies `data-video-id`, `data-video-start`, `data-video-end`, a `.video-screen`, and play/sound controls. Clips autoplay muted on entry, respect the motion lifecycle, and support presenter-selected cue ranges.

`deck.js` provides navigation, hash links, a slide map, notes, synchronized presenter windows, fullscreen and blanking. `deck.css` contains the common typography/layout tokens. Session-specific content, styles, assets and demos live with each talk or workshop.

The audience canvas has no page counter or persistent control bar. Press `?` (`Shift + /`) or `Cmd + P` / `Ctrl + P` to open presentation controls and keyboard help. `Escape` closes the panel and returns focus to the deck. Previous, Next, Notes, Workshop map, Presenter window and Full screen are available there. Arrow keys and Space navigate; `N` opens notes, `O` opens the map, `B` blanks the screen and `F` toggles fullscreen. `P` pauses or resumes the opening animations. `M` toggles video sound and `R` replays the active clip. Shortcuts do not interrupt text entry, and modified keys do not trigger ordinary slide or animation actions.

A session supplies `window.WORKSHOP` with `id`, `title`, `slides` and optional `sources` and `guideIntro`. Give each workshop a unique `id` for presenter synchronization. Each slide can provide `title`, `eyebrow`, `theme`, `className`, `body`, `notes`, and `sources`. Use `html` for a custom cover. Optional `window.WorkshopLab.mount(stage)` attaches interactions after rendering.

To reuse, copy the AI watermarking `slides/index.html` shell and content manifest into another session, update its title/id/content, replace or remove the demo script, and keep its paths relative to that session. Override CSS variables in the session stylesheet. Avoid editing the shared engine for content changes.

```sh
node shared/presentation/build.cjs path/to/slides/index.html path/to/exports/deck.html
```

The builder inlines local styles/scripts and `../assets/` raster references. It also generates a facilitator guide from the manifest. Put session timing and preparation notes in `guideIntro`; the shared builder does not hardcode workshop content. No external assets are fetched during the build.

For publishing, build a directory instead of the large self-contained export:

```sh
node shared/presentation/build-dist.cjs
# Or build another session / choose its destination:
node shared/presentation/build-dist.cjs --input path/to/slides/index.html --output path/to/dist
node --test shared/presentation/build-dist.test.cjs
```

The default output is `workshops/ai-watermarking/dist/`. Copy only that directory's contents to the hosting repository, such as SudoMeet's `public/presentation/ai-watermarking/`. The resulting page is served at `/presentation/ai-watermarking/`; hash links and presenter windows stay under that path.

The distribution contains `index.html`, a generated runtime bundle, a CSS bundle, content-addressed media and a checksum manifest. The runtime includes the slide content and presenter notes needed by the browser. It excludes separate authoring manifests, research, Markdown, notebooks, build scripts and source maps. External Colab and GitHub notebook links, including their QR cards, stay in the hosted deck and launch notebooks from the public source repository. Local `.ipynb` and ZIP download links are removed in this hosted build; notebook files are never copied to the hosting repository. The authoring deck and portable export retain their original links. In-browser demo downloads still work.

Media are copied once per content hash, with references rewritten across slide markup, CSS and demo code. Each output file must be at most 25 MiB. The builder verifies referenced media and JavaScript syntax before replacing an earlier generated distribution, and refuses to overwrite a directory with unrelated files. Its manifest records each output file's size and SHA-256 without local source paths. A rebuild produces the same filenames and checksums for unchanged inputs.

The hosted deck still needs internet access for YouTube playback and external research links. Local media and browser demos are included. Check the deployed path in a browser after publishing, including navigation, notes, animations, video playback and image demo export.

Run `python3 shared/presentation/serve.py` from any directory. It binds only to localhost and blocks research and hidden paths. The optional `--capture` switch is for local authoring exports, not needed for normal presentation.

For isolated visual testing add `?qa=1`; it disables presenter synchronization so tests do not move the audience deck. Use browser screenshots to inspect every slide after changes. Widgets can listen for `deck:slidechange` on the stage to pause when their slide is hidden.
