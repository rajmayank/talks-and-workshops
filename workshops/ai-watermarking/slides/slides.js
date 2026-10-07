/* Workshop content. Rendering and interactions are reusable modules. */
window.WORKSHOP = {
  "id": "mark-my-words-v5",
  "title": "Mark My Words. And Pixels.",
  "slides": [
    {
      "title": "Mark My Words. And Pixels.",
      "className": "cover",
      "eyebrow": "",
      "html": "<img class=\"cover-art\" src=\"../assets/paper-signal.png\" alt=\"Sculptural paper illuminated by green light\"><div class=\"cover-copy\"><h1>Mark My<br>Words.<br><span class=\"accent\">And Pixels.</span></h1><p class=\"subtitle\">AI watermarking with open-source tools</p><p class=\"presenters\">Mayank Raj &nbsp; / &nbsp; Shreya Agrahari</p><p class=\"cover-date\">08 October 2026 · Bengaluru</p></div>",
      "notes": "Open with the brief AI disclaimer and agenda, then the childhood invisible-ink question. We’re going to hide information in a memo, in generated text, and in an image. Then we’ll make changes and see what survives. Shreya and I will switch between the examples and the notebooks. The expanded preparation plan is 210 to 225 minutes, with 60 to 75 minutes for history and use cases. The user approved extending this section; the published slot remains 150 minutes. The cover image is conceptual artwork.",
      "section": "Mark My Words. And Pixels."
    },
    {
      "title": "Disclaimer",
      "theme": "signal",
      "className": "disclaimer-slide",
      "html": "<h1>Disclaimer</h1>",
      "notes": "Acknowledge using AI to help create this workshop and its slides. I’m a developer by heart. I would probably have made a Word document before. Now I can spend more time turning the examples into something we can see and try together. Keep this spoken and brief; the slide only says Disclaimer."
    },
    {
      "title": "What we’ll cover",
      "eyebrow": "Today",
      "className": "agenda-overview",
      "body": "<ol class=\"agenda-blocks\"><li><span>A few examples</span></li><li><span>Long before AI</span></li><li><span>What a watermark does today</span></li><li><span>Text and image labs</span></li></ol>",
      "notes": "We’ll start with examples. Then we’ll go back to where watermarking started, agree on what we mean by it, and look at why these uses still matter. Finally, we’ll build and test both text and image watermarks. Keep the detailed timings off this slide."
    },
    {
      "title": "How many of you used this in your childhood?",
      "eyebrow": "Remember this?",
      "className": "paper-intro ink-intro",
      "html": "<figure class=\"animated-figure paper-film\" data-animation=\"../assets/invisible-ink-pen.gif\" data-poster=\"../assets/invisible-ink-pen-poster.jpg\"><img src=\"../assets/invisible-ink-pen-poster.jpg\" alt=\"An invisible-ink pen writes on paper, then UV light makes the hidden writing glow\"><div class=\"film-shade\"></div></figure><div class=\"paper-heading\"><div class=\"eyebrow\">Remember this?</div><h2>How many of you used this<br>in your childhood?</h2></div>",
      "notes": "How many of you used this in your childhood? The pen with a little UV torch on the cap. Give the room a moment to respond while the clip loops. You write something that looks invisible under ordinary light, then the torch reveals it. The message was on the page the whole time. This supplied illustration shows UV fluorescence. Use this as a short audience warm-up before the three planned demos."
    },
    {
      "title": "Spies used invisible ink, too",
      "eyebrow": "Secret writing / World War I",
      "className": "ink-history",
      "body": "<div class=\"ink-layout\"><figure class=\"animated-figure ink-figure\" data-animation=\"../assets/invisible-ink-newspaper.gif\" data-poster=\"../assets/invisible-ink-newspaper-poster.jpg\"><img src=\"../assets/invisible-ink-newspaper-poster.jpg\" alt=\"A conceptual newspaper scene where UV light reveals a hidden map\"></figure><div class=\"ink-story\"><p class=\"ink-case\">1915 · Karl Muller</p><p>Troop movements.<br>Between the lines<br>of a business letter.</p><p class=\"ink-method\">Lemon juice.<br>Revealed with a warm iron.</p><a class=\"source-link\" href=\"https://www.nationalarchives.gov.uk/explore-the-collection/stories/karl-muller-and-the-fatal-lemon/\" target=\"_blank\" rel=\"noopener\">See the actual letter <span aria-hidden=\"true\">↗</span></a></div></div>",
      "notes": "People also used invisible writing to pass intelligence during war. In 1915, German spy Karl Muller sent apparently ordinary letters to Rotterdam. Between the visible lines, he wrote intelligence about British troop movements in lemon juice. British postal censors flagged the destination; an MI5 officer revealed the hidden writing with a warm iron. Open the National Archives story to show the actual letter. The newspaper GIF is a supplied illustration: its UV light and map are not a reconstruction of Muller’s method or document. This is secret writing, a form of steganography: concealing a message’s existence. Watermarking uses embedded information for purposes such as identifying a source or tracing a copy. Keep that distinction as we turn to paper makers.",
      "sources": [
        {
          "label": "The National Archives · Karl Muller and the fatal lemon · 1915 letter",
          "url": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/karl-muller-and-the-fatal-lemon/"
        }
      ]
    },
    {
      "title": "Josephine Baker",
      "eyebrow": "On stage in Oran / 1943",
      "className": "baker-stage-slide",
      "body": "<div class=\"baker-layout\"><figure><img src=\"../assets/baker-stage.jpg\" alt=\"Josephine Baker sings on stage with an orchestra in Oran, Algeria, on 17 May 1943\"><figcaption>U.S. National Archives · 111-SC-175237 · Public domain</figcaption></figure><div class=\"baker-question\">What would nobody question her carrying across a border?<a class=\"source-link\" href=\"https://catalog.archives.gov/id/531160\" target=\"_blank\" rel=\"noopener\">Open the photograph <span aria-hidden=\"true\">↗</span></a></div></div>",
      "notes": "This is Josephine Baker, performing in Oran in 1943. Before showing the next slide, ask: What would nobody question her carrying across a border? Give people time to answer. A travelling performer has a natural reason to carry sheet music. That makes the carrier itself part of the concealment. This photograph documents a performance; it does not depict an intelligence handover.",
      "sources": [
        {
          "label": "U.S. National Archives · Josephine Baker on stage in Oran, 17 May 1943 · 111-SC-175237",
          "url": "https://catalog.archives.gov/id/531160"
        },
        {
          "label": "International Spy Museum · Josephine Baker’s sheet music",
          "url": "https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/"
        }
      ]
    },
    {
      "title": "Her sheet music carried another message",
      "eyebrow": "Secret writing / World War II",
      "theme": "light",
      "className": "baker-music-slide",
      "body": "<div class=\"music-layout\" data-evidence><div><img src=\"../assets/baker-sheet-music.png\" alt=\"Voluptuosa sheet music from the International Spy Museum collection, supplied by the presenter\"></div><div class=\"music-copy\"><p>Invisible ink.<br>Intelligence for the Allies.</p><p class=\"credit\">Sheet music from the<br>International Spy Museum collection.</p><a class=\"source-link\" href=\"https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/\" target=\"_blank\" rel=\"noopener\">Read the museum’s account <span aria-hidden=\"true\">↗</span></a><br><button data-open-evidence>Open full image</button></div></div>",
      "notes": "Baker worked for French intelligence during World War II. The Spy Museum describes her carrying Allied intelligence about German plans and troop movements in invisible ink on sheet music. The museum presents music like this as the carrier. We are looking at its collection image, not claiming that we have recovered a secret message from this particular page. The useful question is why the object would look ordinary in her hands. This is covert communication: hide the existence of a message inside something that fits the situation.",
      "sources": [
        {
          "label": "International Spy Museum · Josephine Baker’s sheet music",
          "url": "https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/"
        }
      ]
    },
    {
      "title": "Watch his eyes",
      "eyebrow": "Jeremiah Denton / Captivity interview / 1966",
      "className": "denton-slide denton-watch",
      "body": "<div class=\"video-case denton-first-pass\" data-video-id=\"rufnWLVQcKg\" data-video-start=\"0\" data-video-end=\"41\" data-video-controls=\"hidden\" data-video-title=\"Jeremiah Denton’s 1966 captivity interview\"><div class=\"video-screen\" aria-label=\"Jeremiah Denton’s 1966 captivity interview\"><div class=\"denton-placeholder\">Jeremiah Denton · 1966</div></div></div>",
      "notes": "Introduce this soberly: Jeremiah Denton was a U.S. Navy officer held prisoner in North Vietnam. Ask: Can you notice anything in this video? Do you notice anything happening here? Let the footage play without supplying the answer. Advance to the next slide to explain the message and replay it. P pauses or resumes, M toggles sound, R restarts. The supplied 41-second upload contains publisher graphics; the original footage is not a clean silent puzzle. Do not treat this as a game or invite applause for guessing. Sources and direct playback links remain in these notes.",
      "sources": [
        {
          "label": "U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview",
          "url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/"
        },
        {
          "label": "U.S. National Archives · Jeremiah Denton eyewitness account",
          "url": "https://www.archives.gov/exhibits/eyewitness/html.php?section=8"
        },
        {
          "label": "Supplied Denton footage · Audie Murphy American Legend upload",
          "url": "https://www.youtube.com/watch?v=rufnWLVQcKg"
        }
      ]
    },
    {
      "title": "He was blinking a message",
      "eyebrow": "Jeremiah Denton / 1966",
      "className": "denton-slide denton-decoded",
      "body": "<div class=\"video-case denton-layout\" data-video-id=\"rufnWLVQcKg\" data-video-start=\"0\" data-video-end=\"41\" data-video-controls=\"hidden\" data-video-title=\"Jeremiah Denton’s 1966 captivity interview\"><div class=\"video-screen\" aria-label=\"Jeremiah Denton’s 1966 captivity interview\"><div class=\"denton-placeholder\">Jeremiah Denton · 1966</div></div><div class=\"denton-sidebar\"><div class=\"morse-guide\"><h3>TORTURE</h3><table aria-label=\"TORTURE in Morse code\"><tr><td>T</td><td>−</td></tr><tr><td>O</td><td>−−−</td></tr><tr><td>R</td><td>·−·</td></tr><tr><td>T</td><td>−</td></tr><tr><td>U</td><td>··−</td></tr><tr><td>R</td><td>·−·</td></tr><tr><td>E</td><td>·</td></tr></table></div></div></div>",
      "notes": "During the filmed interview on 2 May 1966, Denton blinked TORTURE in Morse code. This slide replays the clip from the beginning with the documented message beside it. The guide shows the Morse spelling; it is not a frame-timed transcription or automated eye tracking. Keep a serious tone and leave a pause afterwards. This is communication under coercion, not a watermark embedded in the video. The Navy and National Archives establish the history; the supplied YouTube upload is a later edit. P pauses or resumes, M toggles sound and R restarts the clip.",
      "sources": [
        {
          "label": "U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview",
          "url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/"
        },
        {
          "label": "U.S. National Archives · Jeremiah Denton eyewitness account",
          "url": "https://www.archives.gov/exhibits/eyewitness/html.php?section=8"
        },
        {
          "label": "Supplied Denton footage · Audie Murphy American Legend upload",
          "url": "https://www.youtube.com/watch?v=rufnWLVQcKg"
        }
      ]
    },
    {
      "title": "Hold it against the light.",
      "eyebrow": "Watermarking / Paper",
      "className": "paper-intro",
      "html": "<figure class=\"animated-figure paper-film\" data-animation=\"../assets/paper-watermark.gif\" data-poster=\"../assets/paper-watermark-poster.jpg\"><img src=\"../assets/paper-watermark-poster.jpg\" alt=\"Light passes through handmade paper, revealing its fibers and a subtle pattern\"><div class=\"film-shade\"></div></figure><div class=\"paper-heading\"><div class=\"eyebrow\">Watermarking / Paper</div><h2>Hold it against the light.</h2></div>",
      "notes": "Now go further back, to paper makers. Secret writing hides a message; a maker’s watermark can identify where a sheet came from. Show the supplied paper animation. It plays and loops automatically. The light helps us see structure inside the sheet. This clip is a conceptual reconstruction; the next slide shows the historical watermark photograph from the Library of Congress. Press P to pause or resume while explaining the difference between adding ink and changing the paper itself."
    },
    {
      "title": "This started with actual paper.",
      "theme": "light",
      "eyebrow": "Before AI",
      "className": "media-slide history-slide",
      "body": "<div class=\"media-split\"><div class=\"photo-mat\"><img class=\"\" src=\"../assets/historical-watermark.jpg\" alt=\"Historical watermark depicting a human figure with bird-like features\"></div><div class=\"talk-column\"><p>Watermarking goes back centuries.</p><p>A maker’s mark, built into the paper itself.</p><p>The uses and methods keep changing.</p><p class=\"credit\">Fabriano paper research<br>Photo courtesy Sylvia Albro / Library of Congress</p></div></div><div class=\"source-dock\"><a class=\"source-link\" href=\"https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/\" target=\"_blank\" rel=\"noopener\">Open the collection <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://museodellacarta.com/en/watermark_tecnique.html\" target=\"_blank\" rel=\"noopener\">See how it is made <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "Watermarking was around long before AI. This is why we began with those examples: people have been hiding messages, identifying sources and tracing copies for a long time, for different reasons. The uses and means have changed. A wire pattern in the mould changes the paper’s thickness, so the maker’s mark becomes visible against light. This is a real watermark from the Fabriano paper research shared by the Library of Congress. The pattern comes from the way the paper is made. You do not need a computer to carry information inside an object. It can help identify a papermaking workshop. That is the idea we will keep, even as the material changes.",
      "sources": [
        {
          "label": "Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro",
          "url": "https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/"
        },
        {
          "label": "Fabriano Paper and Watermark Museum · Watermark technique",
          "url": "https://museodellacarta.com/en/watermark_tecnique.html"
        }
      ]
    },
    {
      "title": "Four copies. Which one came back?",
      "eyebrow": "Reveal 1 / The memo",
      "className": "demo-slide",
      "body": "<div id=\"memo-lab\" class=\"memo-lab\"><div><label for=\"memo-copy\">Issue a copy</label><select id=\"memo-copy\"><option value=\"37\">Copy A</option><option value=\"82\">Copy B</option><option value=\"149\">Copy C</option><option value=\"202\">Copy D</option></select><button id=\"memo-download\">Save this memo</button><p class=\"caption\">A volunteer can return one of the saved text files.</p><div class=\"memo-result\" id=\"memo-result\" aria-live=\"polite\">Which copy came back?</div><div class=\"button-row\"><button id=\"memo-reveal\" class=\"primary\">Reveal the copy</button><button id=\"memo-normalize\">Normalize spaces</button></div></div><div><label for=\"memo-text\">Returned memo · paste a copy here</label><textarea id=\"memo-text\" spellcheck=\"false\"></textarea><div id=\"memo-bits\" class=\"bit-row\" aria-label=\"Spacing pattern\"></div></div></div><div class=\"print-only print-memo\"><div class=\"columns\"><div><p class=\"caption\">THE RETURNED MEMO</p><p class=\"printed-paper\" id=\"print-memo-text\"></p></div><div><p class=\"caption\">SPACING PATTERN</p><p class=\"print-binary\">00100101</p><p class=\"big accent\">Copy A</p><p class=\"subtitle\">Normalize the spaces.<br>The identifier disappears.</p></div></div></div>",
      "notes": "I’m giving four people what looks like the same memo. Pick a copy, save it, and return the raw text. Let’s see whether we can identify the copy. This is a fictional example we can inspect, based on the idea behind a reported Tesla story. After revealing the ID, normalize the spaces and run the check again. The result identifies a copy, not the person who leaked it.",
      "sources": [
        {
          "label": "Musk’s 2022 account of a 2008 Tesla incident · NDTV",
          "url": "https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802"
        }
      ]
    },
    {
      "title": "The difference is in the spaces.",
      "theme": "light",
      "eyebrow": "Look at the first eight gaps",
      "className": "spacing-slide",
      "body": "<div class=\"spacing-explainer\"><div class=\"gap-example\">Project<span class=\"gap single\">·</span>Lantern <small>one space → 0</small></div><div class=\"gap-example\">Project<span class=\"gap double\">··</span>Lantern <small>two spaces → 1</small></div><div class=\"spacing-code\" aria-label=\"Copy A binary code\"><span style=\"--i:0\">0</span><span style=\"--i:1\">0</span><span style=\"--i:2\">1</span><span style=\"--i:3\">0</span><span style=\"--i:4\">0</span><span style=\"--i:5\">1</span><span style=\"--i:6\">0</span><span style=\"--i:7\">1</span><strong>37 → Copy A</strong></div></div><p class=\"under-visual\">Normalizing the spaces removes this code.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802\" target=\"_blank\" rel=\"noopener\">Open the Tesla story <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "We use one space for zero and two for one. Eight gaps give us an eight-bit number. In our demo, 37 maps to Copy A. That works only while the gaps survive. Paste through something that normalizes whitespace and the code disappears. It is a simple recipient fingerprint, not a secure identity system.",
      "sources": [
        {
          "label": "Musk’s 2022 account of a 2008 Tesla incident · NDTV",
          "url": "https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802"
        }
      ]
    },
    {
      "title": "Musk says Tesla used a version of this.",
      "eyebrow": "A 2008 incident, recounted in 2022",
      "className": "musk-evidence-slide",
      "body": "<div class=\"evidence-layout\"><div class=\"post-proof\" data-evidence data-view=\"detail\"><div class=\"evidence-window\"><img src=\"../assets/musk-post.png\" alt=\"Supplied screenshot of Elon Musk’s 9 October 2022 reply describing one or two spaces between sentences in Tesla emails\"></div><div class=\"evidence-controls\"><button data-evidence-view=\"detail\" aria-pressed=\"true\">Enlarge reply</button><button data-evidence-view=\"full\" aria-pressed=\"false\">Whole screenshot</button><button data-open-evidence>Open full image</button></div></div><div class=\"evidence-context\"><p>One space.<br>Two spaces.<br>A different copy.</p><p class=\"credit\">His 2022 account<br>of a 2008 incident.</p><a class=\"source-link\" href=\"https://twitter.com/elonmusk/status/1579101966453858305\" target=\"_blank\" rel=\"noopener\">Open the post <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802\" target=\"_blank\" rel=\"noopener\">Read the report <span aria-hidden=\"true\">↗</span></a></div></div>",
      "notes": "Show the supplied screenshot, starting with the enlarged reply. The Whole screenshot and Open full image controls preserve the conversation around it. Musk says the emails used one or two spaces between sentences. Our teaching memo uses gaps between words, so it demonstrates the principle rather than recreating his exact implementation. His post is an account of the incident, not an independently available investigation. The technical point is recipient fingerprinting: issue distinguishable copies and compare the leaked version. Matching a copy does not by itself prove who disclosed it.",
      "sources": [
        {
          "label": "Elon Musk · 9 October 2022 post",
          "url": "https://twitter.com/elonmusk/status/1579101966453858305"
        },
        {
          "label": "Musk’s 2022 account of a 2008 Tesla incident · NDTV",
          "url": "https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802"
        }
      ]
    },
    {
      "title": "Genius did it with apostrophes.",
      "theme": "light",
      "eyebrow": "2019 / A copying dispute",
      "className": "apostrophe-slide",
      "body": "<div class=\"apostrophe-pair\"><div><span>'</span><p>Straight apostrophe</p></div><div><span>’</span><p>Curly apostrophe</p></div></div><div class=\"morse-line\">·−· &nbsp; · &nbsp; −·· &nbsp; / &nbsp; ···· &nbsp; ·− &nbsp; −· &nbsp; −·· &nbsp; · &nbsp; −··</div><p class=\"under-visual\">The pattern spelled “red handed”.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf\" target=\"_blank\" rel=\"noopener\">Open Genius’s submission <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/\" target=\"_blank\" rel=\"noopener\">Read Google’s response <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "Genius described alternating straight and curly apostrophes to encode a pattern. Its congressional submission is worth opening because it shows the allegation directly. Google said it received lyrics from providers and investigated that supply chain. The mark can help trace a copy; it does not, on its own, settle who copied from whom. The displayed Morse sequence spells RED HANDED, the phrase stated in the submission.",
      "sources": [
        {
          "label": "Genius · Statement to the US House Judiciary Committee · 2019",
          "url": "https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf"
        },
        {
          "label": "Google · How we help you find lyrics on Google Search",
          "url": "https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/"
        }
      ]
    },
    {
      "title": "Here’s the example Genius submitted",
      "eyebrow": "Copy tracing / Genius / 2019",
      "theme": "light",
      "className": "genius-evidence-slide",
      "body": "<div class=\"evidence-layout\"><div class=\"genius-proof\" data-evidence data-view=\"detail\"><div class=\"evidence-window\"><img src=\"../assets/genius-watermark.png\" alt=\"Supplied Genius Attachment A showing a Google lyrics result beside the straight and curly apostrophe mapping to RED HANDED\"></div><div class=\"evidence-controls\"><button data-evidence-view=\"detail\" aria-pressed=\"true\">Enlarge the pattern</button><button data-evidence-view=\"full\" aria-pressed=\"false\">Whole exhibit</button><button data-open-evidence>Open full image</button></div></div><div class=\"evidence-context\"><p>The words read normally.<br>The punctuation carries the pattern.</p><p class=\"credit\">Genius’s evidence in a copying dispute.</p><a class=\"source-link\" href=\"https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf\" target=\"_blank\" rel=\"noopener\">Open the submission <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/\" target=\"_blank\" rel=\"noopener\">Google’s response <span aria-hidden=\"true\">↗</span></a></div></div>",
      "notes": "This is the supplied Attachment A image from Genius’s submission. The full exhibit can be opened without altering the original. Follow the highlighted apostrophes across to the Morse table. Straight maps to dot, curly maps to dash, and the sequence spells RED HANDED. The screenshot is evidence Genius presented; it does not independently establish the whole copying chain. Google said it licensed lyrics from providers and was investigating those providers. The use case is tracing reuse of content that can look unchanged to a reader.",
      "sources": [
        {
          "label": "Genius · Statement to the US House Judiciary Committee · 2019",
          "url": "https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf"
        },
        {
          "label": "Google · How we help you find lyrics on Google Search",
          "url": "https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/"
        }
      ]
    },
    {
      "title": "What should “hiybbprqag” return?",
      "eyebrow": "Copy tracing / A planted result / 2011",
      "theme": "light",
      "className": "google-query-slide",
      "body": "<figure class=\"query-figure\"><img src=\"../assets/google-bing-query.png\" alt=\"Google’s screenshot of hiybbprqag returning an unrelated Wiltern theatre seating page\"><figcaption>Original screenshot from Google’s experiment.</figcaption></figure><div class=\"query-comment\"><p>Google gave this nonsense query a specific answer.</p><a class=\"source-link\" href=\"https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html\" target=\"_blank\" rel=\"noopener\">Open the experiment <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "Ask what this invented query should return. Google deliberately inserted an unrelated real page as its top result. This screenshot shows a Wiltern theatre seating page. That arbitrary pairing is the signal. Google described about 100 synthetic queries and 20 engineers searching and clicking with Internet Explorer 8 and Bing Toolbar. This is a planted canary, related to watermarking through the goal of tracing reuse. It is not a hidden payload embedded in the page.",
      "sources": [
        {
          "label": "Google · Microsoft’s Bing uses Google search results · 1 February 2011",
          "url": "https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html"
        },
        {
          "label": "Microsoft Bing · Setting the record straight · 2 February 2011",
          "url": "https://blogs.bing.com/search/2011/2/Setting-the-record-straight/"
        }
      ]
    },
    {
      "title": "Then the same answer appeared in Bing",
      "eyebrow": "Google’s experiment / Microsoft’s response",
      "className": "google-result-slide",
      "body": "<div class=\"search-comparison\"><div class=\"search-pair\"><figure><figcaption>Google’s planted result</figcaption><img src=\"../assets/google-bing-query.png\" alt=\"Google screenshot with the arbitrary hiybbprqag to Wiltern seating result\"></figure><figure><figcaption>Bing result shown in Google’s report</figcaption><img src=\"../assets/google-bing-result.png\" alt=\"Bing screenshot showing the same hiybbprqag query and Wiltern seating result\"></figure></div><div class=\"search-explanation\"><p>Same query.<br>Same unrelated page.</p><p class=\"dispute\">Microsoft disputed copying Google’s results and pointed to clickstream signals.</p><a class=\"source-link\" href=\"https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html\" target=\"_blank\" rel=\"noopener\">Google’s account <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://blogs.bing.com/search/2011/2/Setting-the-record-straight/\" target=\"_blank\" rel=\"noopener\">Microsoft’s response <span aria-hidden=\"true\">↗</span></a></div></div>",
      "notes": "Google reported that some of its planted results appeared in Bing within weeks. The matching nonsense query and unrelated answer make this more informative than two engines returning a popular page. Microsoft disputed the copying accusation and said anonymous opt-in clickstream data was one of many ranking signals. It described the test as manipulation of that signal. Show both primary accounts. The comparison supports discussion of reuse through a data pathway; it is not evidence that all Bing results came from Google. Ask: What makes a useful tracer? It should be distinguishable from what ordinary independent behavior would produce.",
      "sources": [
        {
          "label": "Google · Microsoft’s Bing uses Google search results · 1 February 2011",
          "url": "https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html"
        },
        {
          "label": "Microsoft Bing · Setting the record straight · 2 February 2011",
          "url": "https://blogs.bing.com/search/2011/2/Setting-the-record-straight/"
        }
      ]
    },
    {
      "title": "Your printer can leave a signature",
      "eyebrow": "Device identification / EFF / 2005",
      "className": "printer-case-slide",
      "body": "<div class=\"printer-case\"></div>",
      "notes": "Begin with EFF’s faint white-light photograph. Ask what the page appears to reveal. Look closer switches to the blue-light photograph and enlarges it, making the repeating pattern easier to see. Read the code brings up EFF’s annotated sample and documented readout: 21 June 2005 at 12:50, serial 21052857 or 052857 depending on how the serial is read. The time comes from the printer’s clock. The mechanism encodes date, time and device information in yellow tracking dots. This identifies a device, not the person pressing Print. These are EFF’s DocuColor photographs and interpretation, not a universal printer decoder. The case also raises a privacy question: who chooses whether this signal is added?",
      "sources": [
        {
          "label": "EFF · DocuColor tracking dot decoding guide · 2005",
          "url": "https://w2.eff.org/Privacy/printers/docucolor/"
        },
        {
          "label": "EFF · Investigating Machine Identification Code Technology",
          "url": "https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers"
        }
      ]
    },
    {
      "title": "Why spend this long on the examples?",
      "eyebrow": "Before we write code",
      "className": "why-context",
      "body": "<p class=\"context-lead\">Adding a mark is the easy part.</p><p class=\"context-question\">What should it help us<br>find out?</p>",
      "notes": "We could have started with an encoder and a detector. A basic embed-and-detect demo is straightforward. Deciding where it belongs, what it should establish and what happens when it fails is harder. I wanted to give you a wider sense of what is possible before we choose an implementation. Robust watermarking still takes real engineering; easy here means getting the first demo running."
    },
    {
      "title": "The use case changes what we build",
      "theme": "light",
      "eyebrow": "What do we need to know?",
      "className": "use-case-bridge",
      "body": "<div class=\"case-questions\"><div><span>Paper makers</span><p>Where did this come from?</p></div><div><span>Tesla’s emails</span><p>Which copy came back?</p></div><div><span>AI-generated content</span><p>Did our system generate this?</p></div></div><p class=\"case-conclusion\">That decides what we embed, what must survive, and what a match means.</p>",
      "notes": "The paper makers, Tesla and Genius give us concrete reasons to put information into content. These are examples to connect the ideas, not claims that every system uses the same scheme. AI adds the same source-identification question at much greater volume. A detector needs a particular scheme and compatible key; this is not a universal test for AI authorship. Secret messages like Baker’s and Denton’s have another purpose again. Choosing the question first helps us choose the signal and evaluate whether the result is useful."
    },
    {
      "title": "So what are we calling a watermark?",
      "theme": "light",
      "eyebrow": "One definition for the rest of the workshop",
      "className": "definition-slide",
      "body": "<p class=\"definition\">Information deliberately embedded in content, so a compatible method can detect or recover it later.</p><div class=\"object-flow\"><div>Content</div><b>+</b><div>Signal</div><b>→</b><div class=\"highlight-node\">Marked content</div><b>→</b><div>Detector</div></div><p class=\"under-visual\">The result depends on the scheme, the key, and what happened to the content.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://proceedings.mlr.press/v202/kirchenbauer23a.html\" target=\"_blank\" rel=\"noopener\">Text watermarking paper <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://c2pa.org/faqs/\" target=\"_blank\" rel=\"noopener\">Compare with provenance <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "We have seen several related ideas with different jobs. Baker and Denton concealed communication. Google planted a canary to investigate reuse. The memo and Genius examples distinguish copies, while printer dots identify a device. Those goals should not be conflated. The deliberate part matters. We are adding a signal and later testing for that signal. That is different from guessing whether text sounds like an LLM. It is also different from a signed record of how a file was created. Neither a watermark nor a signature tells us whether the content is true.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        },
        {
          "label": "C2PA · Frequently asked questions",
          "url": "https://c2pa.org/faqs/"
        }
      ]
    },
    {
      "title": "We’ll build both versions.",
      "eyebrow": "The rest of the session",
      "className": "route-slide",
      "body": "<div class=\"workbench-pair\"><div><p class=\"caption\">TEXT</p><p class=\"sample-sentence\">We <mark>carefully</mark> compare <mark>hidden</mark> signals.</p><p>Add a preference while the model chooses tokens.</p></div><div><img class=\"\" src=\"../assets/stamp-original.png\" alt=\"Sample image from the StegaStamp authors\"><p>Put a copy ID into an image, then export and check it.</p></div></div><div class=\"time-strip\"><span>Research · 40m</span><span>Break · 10m</span><span>Text · 40m</span><span>Image · 35m</span><span>Challenge + Q&A · 25m</span></div>",
      "notes": "The expanded case-study block can take 60 to 75 minutes. Continue when the room understands the uses and boundaries. Next we’ll look at the mechanisms, then build text and image examples in Colab. Start text with a four-word warm-up, then use a real model in Part 2. The image lab writes four bits into pixels and tests a saved PNG and JPEG. These images are StegaStamp examples, a separate learned method. There is time at the end to edit the content and compare results.",
      "sources": [
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        }
      ]
    },
    {
      "title": "Let’s slow down one token.",
      "eyebrow": "Choosing the next token",
      "className": "sampler-slide",
      "body": "<div id=\"sampler-animation\"><div class=\"sampler-top\"><div><label>Previous token</label><strong id=\"sampler-context\">&lt;start&gt;</strong></div><div><label>Shared key</label><strong>15485863</strong></div><div><label>Bias</label><strong>+2</strong></div><div class=\"button-row\"><button id=\"sampler-play\" class=\"primary\">Play choices</button><button id=\"sampler-step\">Step</button><button id=\"sampler-reset\">Reset</button></div></div><div class=\"sampler-work\"><div id=\"sampler-bars\" class=\"sampler-bars\"></div><div class=\"sampler-explanation\"><p id=\"sampler-status\" aria-live=\"polite\">The key and previous token select four preferred candidates.</p><p class=\"caption\">Gray = before bias<br>Green = preferred candidate<br>Outline = sampled token</p></div></div><div id=\"sampler-output\" class=\"sampler-output\" aria-label=\"Generated tokens\"></div></div><div class=\"source-dock\"><a class=\"source-link\" href=\"https://proceedings.mlr.press/v202/kirchenbauer23a.html\" target=\"_blank\" rel=\"noopener\">Open KGW’s method <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "Each bar is one candidate for the next token. In this toy, their starting scores are equal. The key and previous token select four candidates to prefer. We add a bias, normalize, and sample. Watch the preferred set change with the context. A preferred token is more likely, not guaranteed. This is a transparent simulator, so we can see every step before using a real model. The animation starts on entry and loops through the same seeded sequence. Pause or Step to discuss one choice.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        }
      ]
    },
    {
      "title": "Changing the font won’t change the words.",
      "eyebrow": "Reveal 2 / Strip formatting, then edit the text",
      "className": "demo-slide token-slide",
      "body": "<div id=\"token-lab\"><div class=\"token-controls\"><label>Bias <input id=\"token-bias\" type=\"range\" min=\"0\" max=\"3\" step=\"0.1\" value=\"2\"><output id=\"bias-value\">2.0</output></label><label>Key <input id=\"token-key\" type=\"number\" min=\"1\" max=\"2147483647\" value=\"15485863\"></label><button id=\"token-generate\" class=\"primary\">Generate</button><button id=\"token-plain\">Plain text</button><button id=\"token-edit\">Edit words</button><button id=\"token-wrong\">Wrong key</button></div><div class=\"token-grid\"><div><label for=\"token-text\">Generated passage · edit it directly</label><textarea id=\"token-text\" spellcheck=\"false\"></textarea><p class=\"caption\">Scripted grammar, keyed token preferences. No neural model.</p></div><div><div class=\"metric\"><strong id=\"token-z\">0.00</strong><span>z-score for the selected key</span></div><div id=\"token-chart\" class=\"token-chart\"></div><div id=\"token-stats\" class=\"caption\" aria-live=\"polite\"></div><div id=\"token-highlights\" class=\"token-highlights\"></div></div></div></div><div class=\"print-only print-token\"><div class=\"columns\"><div><p class=\"caption\">SCRIPTED GENERATION · EXCERPT</p><p class=\"printed-paper\" id=\"print-token-text\"></p></div><div><p class=\"caption\">COMPUTED TOY EXAMPLE · 180 WORDS</p><p class=\"big accent\">6.62</p><p class=\"subtitle\">Marked passage z-score</p><table><tr><td>Plain-text copy</td><td>6.62</td></tr><tr><td>Edited words</td><td>1.33</td></tr><tr><td>Wrong key</td><td>−2.52</td></tr></table></div></div><p class=\"aside-note\">Descriptive toy scores, not a calibrated probability of AI authorship.</p></div>",
      "notes": "Generate with the default key and bias. First remove the highlighting with Plain text. The words and score stay the same. Now edit the words. The score changes because the choices and contexts changed. Try the wrong key too. This is the toy sampler from the previous slide, not a detector for arbitrary AI text. Its score is descriptive and uncalibrated.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        }
      ]
    },
    {
      "title": "There’s a trade-off in the paper too.",
      "theme": "light",
      "eyebrow": "Kirchenbauer et al. / ICML 2023 / Figure 2",
      "className": "media-slide research-chart",
      "body": "<img class=\"wide-figure\" src=\"../assets/kgw-tradeoff.png\" alt=\"Figure 2 from Kirchenbauer et al., plotting watermark z-score against oracle-model perplexity for different sampling settings\"><div class=\"figure-comment\"><p>Stronger preference can change text quality.</p><p>Sampling strategy changes the trade-off.</p></div><div class=\"source-dock\"><a class=\"source-link\" href=\"https://proceedings.mlr.press/v202/kirchenbauer23a.html\" target=\"_blank\" rel=\"noopener\">Open paper and experiment settings <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "These are the authors’ measurements, not our notebook results. The vertical axis is the average detection score. The horizontal axis is perplexity under an oracle model, with lower values to the right. Look at how the points move as the bias changes. The right plot uses greedy and beam search settings, so we should not read it as the same experiment as the left. These results used roughly 200 generated tokens per sample.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        }
      ]
    },
    {
      "title": "The wrapper goes before sampling.",
      "theme": "light",
      "eyebrow": "No model retraining in this lab",
      "className": "wrapper-slide",
      "body": "<div class=\"pipeline\"><div><span>01</span><strong>Model</strong><p>Next-token scores</p></div><b>→</b><div class=\"highlight-node\"><span>02</span><strong>Watermark wrapper</strong><p>Key + context + bias</p></div><b>→</b><div><span>03</span><strong>Sampler</strong><p>Next token</p></div></div><div class=\"access-pair\"><p><b>Open weights</b><br>We control this step in Colab.</p><p><b>Hosted API</b><br>The endpoint must expose a compatible watermark option.</p></div><div class=\"source-dock\"><a class=\"source-link\" href=\"https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking\" target=\"_blank\" rel=\"noopener\">Open the generation API <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "This answers the wrapper question. We keep the model weights fixed and change scores just before sampling. Open weights give us control of that step. A hosted model can also work if its endpoint implements the matching watermark scheme. If all we receive is completed text, we cannot insert this same generation-time method afterward.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        },
        {
          "label": "Hugging Face · Watermark generation and detection",
          "url": "https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking"
        }
      ]
    },
    {
      "title": "SynthID Text takes a different sampling route.",
      "eyebrow": "Dathathri et al. / Nature 2024",
      "className": "synth-slide",
      "body": "<div class=\"tournament\" aria-label=\"Conceptual tournament sampling diagram\"><div class=\"candidate-cloud\"><span>token A</span><span>token B</span><span>token C</span><span>token D</span></div><div class=\"tournament-stage\"><span>A vs B</span><span>C vs D</span></div><div class=\"tournament-stage\"><strong>Selected token</strong></div></div><p class=\"under-visual\">Repeated sampling tournaments. The model’s weights stay fixed.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://www.nature.com/articles/s41586-024-08025-4\" target=\"_blank\" rel=\"noopener\">Open the Nature paper <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/google-deepmind/synthid-text\" target=\"_blank\" rel=\"noopener\">Open the reference code <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "SynthID Text uses tournament sampling to influence token selection. This is a schematic, not an exact four-candidate implementation. The layers mentioned in this method are sampling stages, not new trained neural layers inside the LLM. The reference code includes a weighted-mean detector and a Bayesian detector with different setup needs. Open code does not give us a provider’s secret keys or a universal detector.",
      "sources": [
        {
          "label": "Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024",
          "url": "https://www.nature.com/articles/s41586-024-08025-4"
        },
        {
          "label": "Google DeepMind · SynthID Text reference code",
          "url": "https://github.com/google-deepmind/synthid-text"
        }
      ]
    },
    {
      "title": "Now take the image off the computer.",
      "eyebrow": "Reveal 3 / StegaStamp",
      "className": "video-slide",
      "body": "<div class=\"video-case video-layout\" data-video-id=\"E8OqgNDBGO0\" data-video-start=\"0\" data-video-end=\"59\" data-video-title=\"StegaStamp authors’ demonstration\"><div class=\"video-screen\"><div class=\"video-placeholder\"><img class=\"\" src=\"../assets/stamp-overview.png\" alt=\"StegaStamp overview from the authors\"><div class=\"video-overlay\"><span>AUTHORS’ DEMONSTRATION</span><button class=\"primary\" data-video-start=\"0\" data-video-end=\"59\">Play 00:00–00:59</button></div></div></div><div class=\"video-cues\"><p>Print the image.<br>Point a camera at it.<br>Recover the link.</p><a class=\"source-link\" href=\"https://www.youtube.com/watch?v=E8OqgNDBGO0&t=0s\" target=\"_blank\" rel=\"noopener\">Open in YouTube <span aria-hidden=\"true\">↗</span></a><div class=\"video-playback-controls\"><button class=\"video-toggle\">Play clip</button><button class=\"video-sound\">Enable sound</button></div><p class=\"credit\">Matthew Tancik<br>StegaStamp · CVPR 2020</p><button data-video-start=\"59\" data-video-end=\"87\">Watch mechanism · 00:59–01:27</button></div></div>",
      "notes": "This is the authors’ StegaStamp demonstration. Watch the link survive the move from a digital image to a physical photograph and a camera view. Pause after the opening minute. We should only call a live print-and-camera version our demo after rehearsing our own hardware. If the embed fails, open the YouTube link in the signed-in Chrome session and pause at 00:59. The mechanism animation is 00:59 to 01:27. The opening clip starts muted on slide entry. Enable sound when narrating the authors’ video. Narrated clips play once rather than looping. A presenter window does not autoplay a second copy.",
      "sources": [
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        },
        {
          "label": "Matthew Tancik · StegaStamp overview video",
          "url": "https://www.youtube.com/watch?v=E8OqgNDBGO0"
        }
      ]
    },
    {
      "title": "Here’s what they tested in the room.",
      "theme": "light",
      "eyebrow": "StegaStamp / Author animations",
      "className": "animation-slide",
      "body": "<div class=\"animation-grid\"><figure class=\"animated-figure\" data-animation=\"../assets/stamp-angle.gif\" data-poster=\"../assets/stamp-angle-poster.jpg\"><img class=\"\" src=\"../assets/stamp-angle-poster.jpg\" alt=\"Camera angle test from the StegaStamp authors\"><figcaption>Camera angle</figcaption><button class=\"animation-toggle\">Play animation</button></figure><figure class=\"animated-figure\" data-animation=\"../assets/stamp-lighting.gif\" data-poster=\"../assets/stamp-lighting-poster.jpg\"><img class=\"\" src=\"../assets/stamp-lighting-poster.jpg\" alt=\"Changing light test from the StegaStamp authors\"><figcaption>Changing light</figcaption><button class=\"animation-toggle\">Play animation</button></figure><figure class=\"animated-figure\" data-animation=\"../assets/stamp-occlusion.gif\" data-poster=\"../assets/stamp-occlusion-poster.jpg\"><img class=\"\" src=\"../assets/stamp-occlusion-poster.jpg\" alt=\"Partial occlusion test from the StegaStamp authors\"><figcaption>Partial occlusion</figcaption><button class=\"animation-toggle\">Play animation</button></figure></div><p class=\"credit\">Numbers shown in the authors’ animations describe recovered bits in those examples.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://www.matthewtancik.com/stegastamp\" target=\"_blank\" rel=\"noopener\">Open all examples <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://www.youtube.com/watch?v=E8OqgNDBGO0&t=87s\" target=\"_blank\" rel=\"noopener\">Watch 01:27–01:50 <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "These three clips start together and loop on entry. Pause individual clips to focus the discussion. Look at angle, light, and how much of the image is visible. These are the authors’ examples, not a guarantee for every camera or print. The displayed percentages concern recovered bits in these examples, not the probability that an image is AI-generated. The controls play and pause the locally included author GIFs.",
      "sources": [
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        },
        {
          "label": "Matthew Tancik · StegaStamp overview video",
          "url": "https://www.youtube.com/watch?v=E8OqgNDBGO0"
        }
      ]
    },
    {
      "title": "The encoder changes the image itself.",
      "theme": "light",
      "eyebrow": "StegaStamp / Original, encoded, residual",
      "className": "comparison-slide",
      "body": "<div class=\"triptych\"><figure><img class=\"\" src=\"../assets/stamp-original.png\" alt=\"Original dinosaur illustration\"><figcaption>Original</figcaption></figure><figure><img class=\"\" src=\"../assets/stamp-marked.png\" alt=\"StegaStamp encoded dinosaur illustration\"><figcaption>Encoded</figcaption></figure><figure><img class=\"\" src=\"../assets/stamp-residual.png\" alt=\"StegaStamp residual visualization supplied by the authors\"><figcaption>Residual visualization</figcaption></figure></div><p class=\"under-visual\">The differences are much easier to inspect in the residual.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://www.matthewtancik.com/stegastamp\" target=\"_blank\" rel=\"noopener\">Open the image comparisons <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "These are the original, encoded image, and residual visualization from the StegaStamp project page. The image carries the signal; it is not just a metadata field. The residual makes changes easier to inspect, so do not confuse its visible intensity with what viewers see in the encoded image. Our beginner notebook will expose the pixel changes directly. VideoSeal is an optional learned-model extension.",
      "sources": [
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        }
      ]
    },
    {
      "title": "What changes in nine pixels?",
      "eyebrow": "RGB, up close",
      "className": "pixel-residual-slide",
      "body": "<div class=\"pixel-residual-demo\"><section class=\"pixel-panel\" data-pixel-panel=\"original\"><h3>Original</h3><p>The starting RGB values</p><div class=\"pixel-grid\"><button class=\"pixel-cell is-selected\" type=\"button\" data-pixel=\"0\" data-rgb=\"120,85,60\" aria-label=\"Original, pixel row 1, column 1: red 120, green 85, blue 60\" aria-pressed=\"true\" style=\"background:rgb(120,85,60);color:#fff\"><span><small>R</small><b class=\"positive\">120</b></span><span><small>G</small><b class=\"positive\">85</b></span><span><small>B</small><b class=\"positive\">60</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"1\" data-rgb=\"136,98,68\" aria-label=\"Original, pixel row 1, column 2: red 136, green 98, blue 68\" aria-pressed=\"false\" style=\"background:rgb(136,98,68);color:#fff\"><span><small>R</small><b class=\"positive\">136</b></span><span><small>G</small><b class=\"positive\">98</b></span><span><small>B</small><b class=\"positive\">68</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"2\" data-rgb=\"154,114,78\" aria-label=\"Original, pixel row 1, column 3: red 154, green 114, blue 78\" aria-pressed=\"false\" style=\"background:rgb(154,114,78);color:#101310\"><span><small>R</small><b class=\"positive\">154</b></span><span><small>G</small><b class=\"positive\">114</b></span><span><small>B</small><b class=\"positive\">78</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"3\" data-rgb=\"102,76,57\" aria-label=\"Original, pixel row 2, column 1: red 102, green 76, blue 57\" aria-pressed=\"false\" style=\"background:rgb(102,76,57);color:#fff\"><span><small>R</small><b class=\"positive\">102</b></span><span><small>G</small><b class=\"positive\">76</b></span><span><small>B</small><b class=\"positive\">57</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"4\" data-rgb=\"124,94,68\" aria-label=\"Original, pixel row 2, column 2: red 124, green 94, blue 68\" aria-pressed=\"false\" style=\"background:rgb(124,94,68);color:#fff\"><span><small>R</small><b class=\"positive\">124</b></span><span><small>G</small><b class=\"positive\">94</b></span><span><small>B</small><b class=\"positive\">68</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"5\" data-rgb=\"146,111,81\" aria-label=\"Original, pixel row 2, column 3: red 146, green 111, blue 81\" aria-pressed=\"false\" style=\"background:rgb(146,111,81);color:#101310\"><span><small>R</small><b class=\"positive\">146</b></span><span><small>G</small><b class=\"positive\">111</b></span><span><small>B</small><b class=\"positive\">81</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"6\" data-rgb=\"85,90,88\" aria-label=\"Original, pixel row 3, column 1: red 85, green 90, blue 88\" aria-pressed=\"false\" style=\"background:rgb(85,90,88);color:#fff\"><span><small>R</small><b class=\"positive\">85</b></span><span><small>G</small><b class=\"positive\">90</b></span><span><small>B</small><b class=\"positive\">88</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"7\" data-rgb=\"104,112,106\" aria-label=\"Original, pixel row 3, column 2: red 104, green 112, blue 106\" aria-pressed=\"false\" style=\"background:rgb(104,112,106);color:#fff\"><span><small>R</small><b class=\"positive\">104</b></span><span><small>G</small><b class=\"positive\">112</b></span><span><small>B</small><b class=\"positive\">106</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"8\" data-rgb=\"126,131,120\" aria-label=\"Original, pixel row 3, column 3: red 126, green 131, blue 120\" aria-pressed=\"false\" style=\"background:rgb(126,131,120);color:#101310\"><span><small>R</small><b class=\"positive\">126</b></span><span><small>G</small><b class=\"positive\">131</b></span><span><small>B</small><b class=\"positive\">120</b></span></button></div></section><section class=\"pixel-panel\" data-pixel-panel=\"encoded\"><h3>Encoded</h3><p>The final image</p><div class=\"pixel-grid\"><button class=\"pixel-cell is-selected\" type=\"button\" data-pixel=\"0\" data-rgb=\"122,84,61\" aria-label=\"Encoded, pixel row 1, column 1: red 122, green 84, blue 61\" aria-pressed=\"true\" style=\"background:rgb(122,84,61);color:#fff\"><span><small>R</small><b class=\"positive\">122</b></span><span><small>G</small><b class=\"positive\">84</b></span><span><small>B</small><b class=\"positive\">61</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"1\" data-rgb=\"135,100,68\" aria-label=\"Encoded, pixel row 1, column 2: red 135, green 100, blue 68\" aria-pressed=\"false\" style=\"background:rgb(135,100,68);color:#fff\"><span><small>R</small><b class=\"positive\">135</b></span><span><small>G</small><b class=\"positive\">100</b></span><span><small>B</small><b class=\"positive\">68</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"2\" data-rgb=\"154,112,79\" aria-label=\"Encoded, pixel row 1, column 3: red 154, green 112, blue 79\" aria-pressed=\"false\" style=\"background:rgb(154,112,79);color:#101310\"><span><small>R</small><b class=\"positive\">154</b></span><span><small>G</small><b class=\"positive\">112</b></span><span><small>B</small><b class=\"positive\">79</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"3\" data-rgb=\"103,76,55\" aria-label=\"Encoded, pixel row 2, column 1: red 103, green 76, blue 55\" aria-pressed=\"false\" style=\"background:rgb(103,76,55);color:#fff\"><span><small>R</small><b class=\"positive\">103</b></span><span><small>G</small><b class=\"positive\">76</b></span><span><small>B</small><b class=\"positive\">55</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"4\" data-rgb=\"122,95,70\" aria-label=\"Encoded, pixel row 2, column 2: red 122, green 95, blue 70\" aria-pressed=\"false\" style=\"background:rgb(122,95,70);color:#fff\"><span><small>R</small><b class=\"positive\">122</b></span><span><small>G</small><b class=\"positive\">95</b></span><span><small>B</small><b class=\"positive\">70</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"5\" data-rgb=\"148,110,81\" aria-label=\"Encoded, pixel row 2, column 3: red 148, green 110, blue 81\" aria-pressed=\"false\" style=\"background:rgb(148,110,81);color:#101310\"><span><small>R</small><b class=\"positive\">148</b></span><span><small>G</small><b class=\"positive\">110</b></span><span><small>B</small><b class=\"positive\">81</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"6\" data-rgb=\"85,91,87\" aria-label=\"Encoded, pixel row 3, column 1: red 85, green 91, blue 87\" aria-pressed=\"false\" style=\"background:rgb(85,91,87);color:#fff\"><span><small>R</small><b class=\"positive\">85</b></span><span><small>G</small><b class=\"positive\">91</b></span><span><small>B</small><b class=\"positive\">87</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"7\" data-rgb=\"103,110,107\" aria-label=\"Encoded, pixel row 3, column 2: red 103, green 110, blue 107\" aria-pressed=\"false\" style=\"background:rgb(103,110,107);color:#fff\"><span><small>R</small><b class=\"positive\">103</b></span><span><small>G</small><b class=\"positive\">110</b></span><span><small>B</small><b class=\"positive\">107</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"8\" data-rgb=\"127,133,118\" aria-label=\"Encoded, pixel row 3, column 3: red 127, green 133, blue 118\" aria-pressed=\"false\" style=\"background:rgb(127,133,118);color:#101310\"><span><small>R</small><b class=\"positive\">127</b></span><span><small>G</small><b class=\"positive\">133</b></span><span><small>B</small><b class=\"positive\">118</b></span></button></div></section><section class=\"pixel-panel\" data-pixel-panel=\"residual\"><h3>Residual</h3><p>Encoded − original</p><div class=\"pixel-grid\"><button class=\"pixel-cell is-selected\" type=\"button\" data-pixel=\"0\" data-rgb=\"2,-1,1\" aria-label=\"Residual, pixel row 1, column 1: red 2, green -1, blue 1\" aria-pressed=\"true\"><span><small>R</small><b class=\"positive\">+2</b></span><span><small>G</small><b class=\"negative\">−1</b></span><span><small>B</small><b class=\"positive\">+1</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"1\" data-rgb=\"-1,2,0\" aria-label=\"Residual, pixel row 1, column 2: red -1, green 2, blue 0\" aria-pressed=\"false\"><span><small>R</small><b class=\"negative\">−1</b></span><span><small>G</small><b class=\"positive\">+2</b></span><span><small>B</small><b class=\"zero\">0</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"2\" data-rgb=\"0,-2,1\" aria-label=\"Residual, pixel row 1, column 3: red 0, green -2, blue 1\" aria-pressed=\"false\"><span><small>R</small><b class=\"zero\">0</b></span><span><small>G</small><b class=\"negative\">−2</b></span><span><small>B</small><b class=\"positive\">+1</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"3\" data-rgb=\"1,0,-2\" aria-label=\"Residual, pixel row 2, column 1: red 1, green 0, blue -2\" aria-pressed=\"false\"><span><small>R</small><b class=\"positive\">+1</b></span><span><small>G</small><b class=\"zero\">0</b></span><span><small>B</small><b class=\"negative\">−2</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"4\" data-rgb=\"-2,1,2\" aria-label=\"Residual, pixel row 2, column 2: red -2, green 1, blue 2\" aria-pressed=\"false\"><span><small>R</small><b class=\"negative\">−2</b></span><span><small>G</small><b class=\"positive\">+1</b></span><span><small>B</small><b class=\"positive\">+2</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"5\" data-rgb=\"2,-1,0\" aria-label=\"Residual, pixel row 2, column 3: red 2, green -1, blue 0\" aria-pressed=\"false\"><span><small>R</small><b class=\"positive\">+2</b></span><span><small>G</small><b class=\"negative\">−1</b></span><span><small>B</small><b class=\"zero\">0</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"6\" data-rgb=\"0,1,-1\" aria-label=\"Residual, pixel row 3, column 1: red 0, green 1, blue -1\" aria-pressed=\"false\"><span><small>R</small><b class=\"zero\">0</b></span><span><small>G</small><b class=\"positive\">+1</b></span><span><small>B</small><b class=\"negative\">−1</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"7\" data-rgb=\"-1,-2,1\" aria-label=\"Residual, pixel row 3, column 2: red -1, green -2, blue 1\" aria-pressed=\"false\"><span><small>R</small><b class=\"negative\">−1</b></span><span><small>G</small><b class=\"negative\">−2</b></span><span><small>B</small><b class=\"positive\">+1</b></span></button><button class=\"pixel-cell\" type=\"button\" data-pixel=\"8\" data-rgb=\"1,2,-2\" aria-label=\"Residual, pixel row 3, column 3: red 1, green 2, blue -2\" aria-pressed=\"false\"><span><small>R</small><b class=\"positive\">+1</b></span><span><small>G</small><b class=\"positive\">+2</b></span><span><small>B</small><b class=\"negative\">−2</b></span></button></div></section></div><div class=\"pixel-calculation\"><div class=\"pixel-calculation-heading\"><span data-pixel-position>Pixel (1, 1)</span><span>Pick any pixel to compare it.</span></div><div class=\"pixel-equation\" aria-live=\"polite\"><div><span>Encoded</span><strong data-pixel-term=\"encoded\">(122, 84, 61)</strong></div><b>−</b><div><span>Original</span><strong data-pixel-term=\"original\">(120, 85, 60)</strong></div><b>=</b><div><span>Residual</span><strong data-pixel-term=\"residual\">(+2, −1, +1)</strong></div></div></div>",
      "notes": "Each square is one pixel with red, green and blue values. This is a hand-chosen 3 × 3 arithmetic example, not a crop of the dinosaur or output from StegaStamp. Start at the top-left pixel: (120, 85, 60) becomes (122, 84, 61). Subtract the original from the encoded pixel and the residual is (+2, -1, +1). Click any square, or use Tab and Enter, to highlight the same position in all three grids. The original and encoded cells use their actual RGB colours. The residual grid prints signed channel differences on a neutral background; those negative values are not displayable RGB colours. Encoded is the final image, not an intermediate before another output. This example illustrates the arithmetic only. A trained encoder chooses a coordinated pattern of changes to carry message bits across a much larger image. No message is encoded or decoded by these nine hand-chosen changes.",
      "sources": [
        {
          "label": "StegaStamp · Original, encoded image and residual examples",
          "url": "https://www.matthewtancik.com/stegastamp"
        }
      ]
    },
    {
      "title": "Training includes the changes we expect.",
      "theme": "light",
      "eyebrow": "StegaStamp / Why simulate distortions?",
      "className": "distortion-slide",
      "body": "<div class=\"distortion-layout\"><figure><img src=\"../assets/stamp-marked.png\" alt=\"StegaStamp encoded dinosaur illustration\"><figcaption>Encoded image</figcaption></figure><b>→</b><figure><div class=\"distortion-window\"><img id=\"distortion-image\" src=\"../assets/stamp-marked.png\" alt=\"Illustration of image distortions\"></div><figcaption id=\"distortion-label\">Simulated camera angle</figcaption></figure><b>→</b><div class=\"decode-target\"><p>Train the decoder<br>to recover the<br>same message.</p><code>1010…001</code></div></div><div class=\"distortion-controls\"><button id=\"distortion-play\" class=\"primary\">Animate changes</button><button data-distortion=\"angle\">Angle</button><button data-distortion=\"light\">Light</button><button data-distortion=\"crop\">Crop</button></div><div class=\"source-dock\"><a class=\"source-link\" href=\"https://www.matthewtancik.com/stegastamp\" target=\"_blank\" rel=\"noopener\">Open the training method ↗</a></div>",
      "notes": "The encoder and decoder are trained with image distortions between them. That exposes them to the kinds of changes the authors want the message to survive. This animation only illustrates angle, light, and cropping; it does not execute the authors’ differentiable training transforms or run a decoder. In the actual method, successful recovery is a training objective. Real-world performance still depends on what the system was trained and tested against. The animation automatically cycles through angle, light, and crop. The controls can select an effect or pause it.",
      "sources": [
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        }
      ]
    },
    {
      "title": "A learned encoder is the next step.",
      "eyebrow": "VideoSeal / Optional extension",
      "className": "image-plan",
      "body": "<div class=\"image-route\"><img class=\"\" src=\"../assets/stamp-original.png\" alt=\"Example input image\"><div><p class=\"tag\">COPY 2048</p><strong>Encoder</strong><p>Image + 256-bit payload</p></div><div class=\"file-card\">copy.png</div><div><strong>Detector</strong><p>Recovered message</p></div></div><p class=\"under-visual\">Our lab starts with four pixels. VideoSeal learns where to put a larger message.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://github.com/facebookresearch/videoseal\" target=\"_blank\" rel=\"noopener\">Open VideoSeal <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md\" target=\"_blank\" rel=\"noopener\">Open the inference guide <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "VideoSeal is a next step after the beginner lab, not the notebook we run today. Its official image model embeds a 256-bit payload with a learned encoder. A separate application could map that payload to a copy record. The image shown here is a StegaStamp example, not a VideoSeal output. The included image notebook instead changes four known red-channel values, saves a PNG, reloads it and checks a JPEG. That small example does not establish learned-model or print-camera robustness.",
      "sources": [
        {
          "label": "Meta · VideoSeal repository and models",
          "url": "https://github.com/facebookresearch/videoseal"
        },
        {
          "label": "VideoSeal · Official TorchScript inference guide",
          "url": "https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md"
        },
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        }
      ]
    },
    {
      "title": "A positive result still has a boundary.",
      "theme": "light",
      "eyebrow": "Two papers and one useful distinction",
      "className": "research-links-slide",
      "body": "<div class=\"reading-cards\"><a href=\"https://arxiv.org/abs/2402.19361\" target=\"_blank\" rel=\"noopener\"><span>ICML 2024</span><h3>Watermark stealing</h3><p>What can an attacker learn from marked outputs?</p><b>Open paper ↗</b></a><a href=\"https://arxiv.org/abs/2402.14904\" target=\"_blank\" rel=\"noopener\"><span>NeurIPS 2024</span><h3>Radioactive data</h3><p>Can a training set leave a detectable trace?</p><b>Open paper ↗</b></a><a href=\"https://c2pa.org/faqs/\" target=\"_blank\" rel=\"noopener\"><span>PROVENANCE</span><h3>C2PA</h3><p>A signed history answers a different question.</p><b>Open explainer ↗</b></a></div><p class=\"under-visual\">No detected watermark does not prove human authorship.</p>",
      "notes": "These are useful places to continue the discussion. Watermark stealing studies whether outputs let an attacker approximate a scheme. Radioactivity asks whether training on watermarked text can leave a statistical trace in another model. C2PA records signed provenance. These have different threat models. A mark can also be added to human-created content, and a missing mark has several possible explanations.",
      "sources": [
        {
          "label": "Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024",
          "url": "https://arxiv.org/abs/2402.19361"
        },
        {
          "label": "Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024",
          "url": "https://arxiv.org/abs/2402.14904"
        },
        {
          "label": "C2PA · Frequently asked questions",
          "url": "https://c2pa.org/faqs/"
        }
      ]
    },
    {
      "title": "Let’s get Colab ready.",
      "theme": "signal",
      "eyebrow": "10-minute break / Setup",
      "className": "timer-slide colab-launch",
      "body": "<div class=\"colab-lab-layout\"><div class=\"colab-lab-copy\"><div class=\"timer\" data-minutes=\"10\"><div class=\"timer-face\">10:00</div><div class=\"button-row\"><button class=\"timer-toggle\">Start timer</button><button class=\"timer-reset\">Reset</button></div></div><p class=\"colab-setup-copy\">Open Text Part 2.<br>Run setup while we take a break.</p><p class=\"colab-subline\">Basic laptop. No API key.</p></div><div class=\"colab-launchcards single\"><a class=\"colab-card\" href=\"https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/text-watermark-part-2.ipynb\" target=\"_blank\" rel=\"noopener\" aria-label=\"Open Text Part 2 · Real LLM in Google Colab\"><span class=\"colab-card-label\">Text Part 2 · Real LLM</span><img src=\"../assets/colab-text-watermark-part-2.svg\" alt=\"QR code to open Text Part 2 · Real LLM in Google Colab\"><span class=\"colab-badge\"><span class=\"colab-mark\" aria-hidden=\"true\">&lt;&gt;</span>Open in Colab<span aria-hidden=\"true\">↗</span></span><span class=\"colab-scan-hint\">Scan or click</span></a></div></div>",
      "notes": "Scan or click the Open in Colab card for Text Part 2. The link opens the public notebook on the repository’s main branch. Run its setup cells now; the first model download is about 0.7 GB. Start the beginner text warm-up while that runs, then return to Part 2. If a runtime is unavailable, pair up and keep the browser simulator open. The beginner text and image notebooks passed fresh Colab CPU runs in the browser. Text Part 2 has local CPU evidence with cached weights; its fresh Colab setup and text-box rendering have not been run. Venue timing remains a separate rehearsal check."
    },
    {
      "title": "Let’s add the text wrapper.",
      "eyebrow": "Text lab / 40 minutes",
      "className": "lab-start colab-launch",
      "body": "<div class=\"colab-lab-layout\"><div class=\"colab-lab-copy\"><p class=\"colab-lab-step\">01 / TEXT</p><p class=\"colab-outcome\">Start with four words.<br>Then try a real model.</p><p class=\"colab-subline\">Generate. Add a preference.<br>Check what changed.</p></div><div class=\"colab-launchcards\"><a class=\"colab-card\" href=\"https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/text-watermark-lab.ipynb\" target=\"_blank\" rel=\"noopener\" aria-label=\"Open Part 1 · Four words in Google Colab\"><span class=\"colab-card-label\">Part 1 · Four words</span><img src=\"../assets/colab-text-watermark-lab.svg\" alt=\"QR code to open Part 1 · Four words in Google Colab\"><span class=\"colab-badge\"><span class=\"colab-mark\" aria-hidden=\"true\">&lt;&gt;</span>Open in Colab<span aria-hidden=\"true\">↗</span></span><span class=\"colab-scan-hint\">Scan or click</span></a><a class=\"colab-card\" href=\"https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/text-watermark-part-2.ipynb\" target=\"_blank\" rel=\"noopener\" aria-label=\"Open Part 2 · Real LLM in Google Colab\"><span class=\"colab-card-label\">Part 2 · Real LLM</span><img src=\"../assets/colab-text-watermark-part-2.svg\" alt=\"QR code to open Part 2 · Real LLM in Google Colab\"><span class=\"colab-badge\"><span class=\"colab-mark\" aria-hidden=\"true\">&lt;&gt;</span>Open in Colab<span aria-hidden=\"true\">↗</span></span><span class=\"colab-scan-hint\">Scan or click</span></a></div></div>",
      "notes": "Scan or click either Open in Colab card to open its notebook directly from the public repository. Use the beginner text notebook for a five to ten minute warm-up: favour two of four words, save the text, then count and edit the pattern. Continue in Text Part 2 with a small open-weight model. Generate twice with the same seed and five starting words, compare token sequences, then add the watermark configuration and repeat. Model loading and detector code are provided. The short generation cells and small experiments are what we work through together."
    },
    {
      "title": "This is the part we add.",
      "theme": "light",
      "eyebrow": "Text lab / Generation hook",
      "body": "<pre class=\"code\">watermark = WatermarkingConfig(\n    bias=2.0, hashing_key=15485863\n)\n\nmarked = model.generate(\n    **inputs,\n    do_sample=True,\n    watermarking_config=watermark\n)</pre><p class=\"aside-note\">The underlying model is pretrained. The sampler changes.</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking\" target=\"_blank\" rel=\"noopener\">Open the API reference <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "This is the compact version of the notebook code. The watermark configuration changes generation. The detector must use the same tokenizer and watermark settings. We score the generated continuation, not the prompt. Keep the key and device choices aligned. The exact code in the notebook handles those details.",
      "sources": [
        {
          "label": "Hugging Face · Watermark generation and detection",
          "url": "https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking"
        },
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        }
      ]
    },
    {
      "title": "Run the controls before trusting the score.",
      "eyebrow": "Text lab / Compare these inputs",
      "body": "<table><thead><tr><th>Sample</th><th>Change</th><th>Question</th></tr></thead><tbody><tr><td>Marked baseline</td><td>None</td><td>Does our key find its signal?</td></tr><tr><td>Unmarked control</td><td>Disable the wrapper</td><td>What does the baseline look like?</td></tr><tr><td>Zero bias</td><td>Remove the preference</td><td>Does the ordinary output return?</td></tr><tr><td>Short excerpt</td><td>Keep fewer tokens</td><td>How much evidence is left?</td></tr><tr><td>Edited passage</td><td>Change the wording</td><td>What survives rewriting?</td></tr></tbody></table>",
      "notes": "Use Text Part 2 to compare the unmarked and marked continuations. Repeat each with the same seed before changing anything. Try zero watermark bias, a short excerpt, and edited wording in the check box. Rerun the configuration and detector cells when changing the bias. A short or repetitive passage can return too little varied text. If the basic pair does not behave as expected, debug it before testing edits. The score is not a probability of AI authorship.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        },
        {
          "label": "Hugging Face · Watermark generation and detection",
          "url": "https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking"
        }
      ]
    },
    {
      "title": "Pause here. Compare two outputs.",
      "theme": "signal",
      "eyebrow": "Text lab / Work together",
      "className": "timer-slide",
      "body": "<div class=\"columns\"><div><div class=\"timer\" data-minutes=\"10\"><div class=\"timer-face\">10:00</div><div class=\"button-row\"><button class=\"timer-toggle\">Start timer</button><button class=\"timer-reset\">Reset</button></div></div></div><div class=\"talk-column\"><p>Generate with and without the wrapper.</p><p>Compare the text and the detector output.</p><p>Set the bias to zero, or edit a sentence. What changed?</p></div></div>",
      "notes": "Give pairs ten minutes to get one marked and one ordinary continuation and run the checks in Text Part 2. Ask a pair to show the actual text, not just the score. If the marked sample is awkward, discuss the bias and sampling settings. If the result is weak, look at length, configuration, and repetition before changing the threshold. The final exercise removes the preference while keeping the seed and generation settings fixed."
    },
    {
      "title": "Now hide four bits in an image.",
      "eyebrow": "Image lab / 35 minutes",
      "className": "lab-start colab-launch",
      "body": "<div class=\"colab-lab-layout\"><div class=\"colab-lab-copy\"><p class=\"colab-lab-step\">02 / IMAGE</p><p class=\"colab-outcome\">Change four pixels.<br>Save it. Reload it.<br>Read the bits.</p><p class=\"colab-subline\">Keep the original.<br>Then try a JPEG.</p></div><div class=\"colab-launchcards single\"><a class=\"colab-card\" href=\"https://colab.research.google.com/github/rajmayank/talks-and-workshops/blob/main/workshops/ai-watermarking/demos/image-watermark-lab.ipynb\" target=\"_blank\" rel=\"noopener\" aria-label=\"Open Image · Four bits in Google Colab\"><span class=\"colab-card-label\">Image · Four bits</span><img src=\"../assets/colab-image-watermark-lab.svg\" alt=\"QR code to open Image · Four bits in Google Colab\"><span class=\"colab-badge\"><span class=\"colab-mark\" aria-hidden=\"true\">&lt;&gt;</span>Open in Colab<span aria-hidden=\"true\">↗</span></span><span class=\"colab-scan-hint\">Scan or click</span></a></div></div>",
      "notes": "Scan or click Open in Colab to open the beginner image notebook directly from the public repository. We make a flat-colour picture and store [1, 0, 1, 1] in the parity of its first four red-channel values. Save the image as a PNG, reopen the saved file, and read the bits back. Keep the unmarked original to compare. Four bits are a teaching example and can match by chance; this is not a copy registry or an identity detector.",
      "sources": []
    },
    {
      "title": "First, try the simplest pixel trick.",
      "eyebrow": "Browser warm-up / Low-bit encoding",
      "className": "demo-slide image-slide",
      "body": "<div id=\"image-lab\"><div class=\"image-controls\"><label>Copy ID <input id=\"image-id\" type=\"number\" min=\"1\" max=\"65535\" value=\"2048\"></label><button id=\"image-mark\" class=\"primary\">Embed ID</button><button id=\"image-jpeg\">JPEG round trip</button><button id=\"image-reset\">Reset</button><button id=\"image-save\">Save PNG</button><label class=\"upload-label\">Load image <input id=\"image-upload\" type=\"file\" accept=\"image/png,image/jpeg,image/webp\"></label></div><div class=\"image-grid\"><figure><canvas id=\"image-original\" width=\"512\" height=\"288\"></canvas><figcaption>Original</figcaption></figure><figure><canvas id=\"image-marked\" width=\"512\" height=\"288\"></canvas><figcaption>Current exported / transformed pixels</figcaption></figure></div><div class=\"image-result\"><strong id=\"image-result\" aria-live=\"polite\">No workshop ID found</strong><span id=\"image-detail\">A deliberately fragile baseline.</span></div></div><div class=\"print-only print-image\"><div class=\"image-grid\"><figure><canvas id=\"print-image-original\" width=\"512\" height=\"288\"></canvas><figcaption>Original image</figcaption></figure><figure><canvas id=\"print-image-marked\" width=\"512\" height=\"288\"></canvas><figcaption>48 red-channel low bits changed at most</figcaption></figure></div><p class=\"subtitle accent\">Copy ID 2048 is carried in the pixels.</p><p class=\"aside-note\">The browser performs an actual embed, decode and JPEG round trip.<br>The notebook builds a smaller four-bit version.</p></div>",
      "notes": "This browser version writes a header, a copy ID, and a checksum into the low bits of the first 48 red-channel values. Embed the ID and save the PNG. Reload it and check the result. Then run a real JPEG round trip. The beginner notebook uses the same parity idea with only four bits in four known pixels, so attendees can follow every line. The two formats are different; do not use this browser decoder to validate the notebook image."
    },
    {
      "title": "Put four bits into four pixels.",
      "theme": "light",
      "eyebrow": "Image lab / The code we write",
      "body": "<pre class=\"code\">message = [1, 0, 1, 1]\nmarked_picture = picture.copy()\nfor x in range(4):\n    red = 200 + message[x]\n    marked_picture.putpixel((x, 0), (red, 210, 230))\n\nmarked_picture.save(\"marked.png\")\nreceived_picture = Image.open(\"marked.png\")</pre><p class=\"aside-note\">Even red value: 0. Odd red value: 1.</p>",
      "notes": "This is the code from the beginner image notebook. The generated picture starts at RGB (200, 210, 230), so adding each bit changes only the first four red values to 200 or 201. It is a deliberately limited form of low-bit encoding for this known starting image. The next notebook step reads each saved red value modulo two. Run the saved-file check before trying JPEG. Attendees then choose another four-bit message; a complete solution follows the exercise.",
      "sources": []
    },
    {
      "title": "One changed bit. A different message.",
      "eyebrow": "Image lab / PNG versus JPEG",
      "className": "bits-slide",
      "body": "<div class=\"bit-summary\"><p><strong>1 0 1 1</strong>Saved PNG</p><p><strong>1 <span style=\"color:#ed765a\">1</span> 1 1</strong>After JPEG</p></div><p class=\"under-visual\">The picture can look fine while the message changes.</p>",
      "notes": "These are the observed results of the current beginner notebook using its unchanged flat-colour image, [1, 0, 1, 1] message and JPEG quality 20. The PNG preserves the bits; the JPEG reads [1, 1, 1, 1] in the local Pillow 11.3.0 rehearsal. Different input images, messages, codecs and quality settings can give different results. We compare the four values directly. There is no registry, correction code or calibrated watermark detector.",
      "sources": []
    },
    {
      "title": "Check the file after each change.",
      "theme": "light",
      "eyebrow": "Image lab / Test matrix",
      "body": "<table><thead><tr><th>File</th><th>Question</th><th>Check</th></tr></thead><tbody><tr><td>original.png</td><td>What was there before?</td><td>Four even red values → 0 0 0 0</td></tr><tr><td>marked.png</td><td>Did the saved message survive?</td><td>Read and compare all four bits</td></tr><tr><td>compressed.jpg</td><td>What did JPEG change?</td><td>Read the same four pixels</td></tr><tr><td>practice.png</td><td>Can you choose another message?</td><td>Save, reopen and compare again</td></tr></tbody></table>",
      "notes": "These are the four files the image notebook creates. Verify each after reopening it, not just while it is in memory. For the original sample, expect zero bits before marking and the selected message in the PNG. For the JPEG, show the actual result rather than assuming a particular failure. In the final exercise, attendees choose a new four-bit message and rerun the save-and-read sequence. Further transformations are optional experiments, not prepared notebook controls.",
      "sources": []
    },
    {
      "title": "Try to remove the mark without ruining the content.",
      "theme": "signal",
      "eyebrow": "Team challenge / 15 minutes",
      "className": "timer-slide challenge-slide",
      "body": "<div class=\"columns\"><div><div class=\"timer\" data-minutes=\"15\"><div class=\"timer-face\">15:00</div><div class=\"button-row\"><button class=\"timer-toggle\">Start timer</button><button class=\"timer-reset\">Reset</button></div></div></div><div class=\"talk-column\"><p>Rewrite the text, or change the JPEG quality.</p><p>Keep the before and after files.</p><p>Show us the edit, the settings, and the result.</p></div></div>",
      "notes": "Use the workshop’s own examples. Choose text or image. For text, edit the generated continuation and use the check box in Part 2. For images, change the JPEG quality and rerun the four-pixel read. Save before and after versions and record the exact change. A failed check alone is not enough; establish that the starting example worked. Cropping, learned encoders and stronger payloads are optional extensions after the prepared exercises."
    },
    {
      "title": "Show us what changed.",
      "eyebrow": "Compare two or three experiments",
      "className": "debrief-slide",
      "body": "<div class=\"before-after\"><div><span>BEFORE</span><p>Your original sample</p></div><b>→</b><div><span>AFTER</span><p>Your edited sample</p></div></div><div class=\"debrief-prompts\"><p>What did you change?</p><p>What did the detector report?</p><p>Is the content still useful?</p></div>",
      "notes": "Open two or three attendee examples. Start with the actual content and edit, then inspect the detector output. If a result is surprising, check the baseline and configuration together. We are comparing specific experiments, not deciding that a whole watermark family is solved or broken."
    },
    {
      "title": "What would you need before shipping this?",
      "theme": "light",
      "eyebrow": "Questions / 10-minute buffer",
      "className": "closing-v2",
      "body": "<div class=\"closing-list\"><p>A detector calibrated on your data.</p><p>A clear statement of what a match means.</p><p>A plan for keys, edits, and false matches.</p></div><p class=\"closing-names\">Mayank Raj &nbsp; / &nbsp; Shreya Agrahari</p><div class=\"source-dock\"><a class=\"source-link\" href=\"https://proceedings.mlr.press/v202/kirchenbauer23a.html\" target=\"_blank\" rel=\"noopener\">Text research <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/facebookresearch/videoseal\" target=\"_blank\" rel=\"noopener\">Image extension <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://c2pa.org/faqs/\" target=\"_blank\" rel=\"noopener\">Provenance <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "The notebook shows the mechanism and gives us an evaluation starting point. Shipping it adds calibration, key management, quality evaluation, operational ownership, and decisions about ambiguous matches. What would those look like in your use case? Use the remaining time for questions and notebook recovery."
    },
    {
      "title": "Papers and demos.",
      "theme": "light",
      "eyebrow": "Keep these links",
      "className": "resources-v2",
      "body": "<div class=\"resource-grid\"><a class=\"source-link\" href=\"https://proceedings.mlr.press/v202/kirchenbauer23a.html\" target=\"_blank\" rel=\"noopener\">Text watermarking · KGW <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://www.nature.com/articles/s41586-024-08025-4\" target=\"_blank\" rel=\"noopener\">SynthID Text · paper <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/google-deepmind/synthid-text\" target=\"_blank\" rel=\"noopener\">SynthID Text · code <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://www.matthewtancik.com/stegastamp\" target=\"_blank\" rel=\"noopener\">StegaStamp · examples <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://www.youtube.com/watch?v=E8OqgNDBGO0\" target=\"_blank\" rel=\"noopener\">StegaStamp · video <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/facebookresearch/videoseal\" target=\"_blank\" rel=\"noopener\">VideoSeal · code <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://github.com/facebookresearch/audioseal\" target=\"_blank\" rel=\"noopener\">AudioSeal · extension <span aria-hidden=\"true\">↗</span></a><a class=\"source-link\" href=\"https://c2pa.org/faqs/\" target=\"_blank\" rel=\"noopener\">C2PA · provenance <span aria-hidden=\"true\">↗</span></a></div>",
      "notes": "These links open the original sources. The workshop demos folder has three notebooks: the beginner text warm-up, Text Part 2 with a real LLM, and the four-bit image lab. VideoSeal and AudioSeal are optional extensions, not included hands-on builds. Current beginner Colab results and Text Part 2 local CPU results are in exports/notebook-validation.md. Text Part 2 fresh Colab execution and venue video playback remain separate checks.",
      "sources": [
        {
          "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
          "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
        },
        {
          "label": "Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024",
          "url": "https://www.nature.com/articles/s41586-024-08025-4"
        },
        {
          "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
          "url": "https://www.matthewtancik.com/stegastamp"
        },
        {
          "label": "Matthew Tancik · StegaStamp overview video",
          "url": "https://www.youtube.com/watch?v=E8OqgNDBGO0"
        },
        {
          "label": "Meta · VideoSeal repository and models",
          "url": "https://github.com/facebookresearch/videoseal"
        },
        {
          "label": "VideoSeal · Official TorchScript inference guide",
          "url": "https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md"
        },
        {
          "label": "Hugging Face · Watermark generation and detection",
          "url": "https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking"
        },
        {
          "label": "Musk’s 2022 account of a 2008 Tesla incident · NDTV",
          "url": "https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802"
        },
        {
          "label": "Genius · Statement to the US House Judiciary Committee · 2019",
          "url": "https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf"
        },
        {
          "label": "Google · How we help you find lyrics on Google Search",
          "url": "https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/"
        },
        {
          "label": "EFF · Investigating Machine Identification Code Technology",
          "url": "https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers"
        },
        {
          "label": "Fabriano Paper and Watermark Museum · Watermark technique",
          "url": "https://museodellacarta.com/en/watermark_tecnique.html"
        },
        {
          "label": "C2PA · Frequently asked questions",
          "url": "https://c2pa.org/faqs/"
        },
        {
          "label": "Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024",
          "url": "https://arxiv.org/abs/2402.19361"
        },
        {
          "label": "Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024",
          "url": "https://arxiv.org/abs/2402.14904"
        },
        {
          "label": "Meta · AudioSeal",
          "url": "https://github.com/facebookresearch/audioseal"
        },
        {
          "label": "Google DeepMind · SynthID Text reference code",
          "url": "https://github.com/google-deepmind/synthid-text"
        },
        {
          "label": "Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro",
          "url": "https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/"
        }
      ]
    }
  ],
  "sources": {
    "kgw": {
      "label": "Kirchenbauer et al. · A Watermark for Large Language Models · ICML 2023",
      "url": "https://proceedings.mlr.press/v202/kirchenbauer23a.html"
    },
    "synth": {
      "label": "Dathathri et al. · Scalable watermarking for identifying large language model outputs · Nature 2024",
      "url": "https://www.nature.com/articles/s41586-024-08025-4"
    },
    "stamp": {
      "label": "Tancik, Mildenhall & Ng · StegaStamp · CVPR 2020",
      "url": "https://www.matthewtancik.com/stegastamp"
    },
    "video": {
      "label": "Matthew Tancik · StegaStamp overview video",
      "url": "https://www.youtube.com/watch?v=E8OqgNDBGO0"
    },
    "meta": {
      "label": "Meta · VideoSeal repository and models",
      "url": "https://github.com/facebookresearch/videoseal"
    },
    "jit": {
      "label": "VideoSeal · Official TorchScript inference guide",
      "url": "https://github.com/facebookresearch/videoseal/blob/main/docs/torchscript.md"
    },
    "hf": {
      "label": "Hugging Face · Watermark generation and detection",
      "url": "https://huggingface.co/docs/transformers/v4.51.3/en/generation_features#watermarking"
    },
    "musk": {
      "label": "Musk’s 2022 account of a 2008 Tesla incident · NDTV",
      "url": "https://www.ndtv.com/world-news/elon-musk-explains-how-tesla-caught-employee-leaking-data-3433802"
    },
    "genius": {
      "label": "Genius · Statement to the US House Judiciary Committee · 2019",
      "url": "https://docs.house.gov/meetings/JU/JU05/20190716/109793/HHRG-116-JU05-20190716-SD008.pdf"
    },
    "google": {
      "label": "Google · How we help you find lyrics on Google Search",
      "url": "https://blog.google/products-and-platforms/products/search/how-we-help-you-find-lyrics-google-search/"
    },
    "eff": {
      "label": "EFF · Investigating Machine Identification Code Technology",
      "url": "https://www.eff.org/wp/investigating-machine-identification-code-technology-color-laser-printers"
    },
    "paper": {
      "label": "Fabriano Paper and Watermark Museum · Watermark technique",
      "url": "https://museodellacarta.com/en/watermark_tecnique.html"
    },
    "c2pa": {
      "label": "C2PA · Frequently asked questions",
      "url": "https://c2pa.org/faqs/"
    },
    "steal": {
      "label": "Jovanović et al. · Watermark Stealing in Large Language Models · ICML 2024",
      "url": "https://arxiv.org/abs/2402.19361"
    },
    "radio": {
      "label": "Sander et al. · Watermarking Makes Language Models Radioactive · NeurIPS 2024",
      "url": "https://arxiv.org/abs/2402.14904"
    },
    "audio": {
      "label": "Meta · AudioSeal",
      "url": "https://github.com/facebookresearch/audioseal"
    },
    "synthcode": {
      "label": "Google DeepMind · SynthID Text reference code",
      "url": "https://github.com/google-deepmind/synthid-text"
    },
    "loc": {
      "label": "Library of Congress · Fabriano paper · photograph courtesy Sylvia Albro",
      "url": "https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/"
    },
    "secretInk": {
      "label": "The National Archives · Karl Muller and the fatal lemon · 1915 letter",
      "url": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/karl-muller-and-the-fatal-lemon/"
    },
    "baker": {
      "label": "International Spy Museum · Josephine Baker’s sheet music",
      "url": "https://www.spymuseum.org/exhibition-experiences/about-the-collection/collection-highlights/josephine-baker-s-sheet-music/"
    },
    "bakerPhoto": {
      "label": "U.S. National Archives · Josephine Baker on stage in Oran, 17 May 1943 · 111-SC-175237",
      "url": "https://catalog.archives.gov/id/531160"
    },
    "denton": {
      "label": "U.S. Navy · Jeremiah A. Denton Jr. and the 1966 interview",
      "url": "https://www.navy.mil/Press-Office/News-Stories/display-news/Article/2781298/censecfor-honors-jeremiah-a-denton-jr-on-national-powmia-recognition-day/"
    },
    "dentonArchive": {
      "label": "U.S. National Archives · Jeremiah Denton eyewitness account",
      "url": "https://www.archives.gov/exhibits/eyewitness/html.php?section=8"
    },
    "dentonVideo": {
      "label": "Supplied Denton footage · Audie Murphy American Legend upload",
      "url": "https://www.youtube.com/watch?v=rufnWLVQcKg"
    },
    "googleCanary": {
      "label": "Google · Microsoft’s Bing uses Google search results · 1 February 2011",
      "url": "https://googleblog.blogspot.com/2011/02/microsofts-bing-uses-google-search.html"
    },
    "bingResponse": {
      "label": "Microsoft Bing · Setting the record straight · 2 February 2011",
      "url": "https://blogs.bing.com/search/2011/2/Setting-the-record-straight/"
    },
    "muskPost": {
      "label": "Elon Musk · 9 October 2022 post",
      "url": "https://twitter.com/elonmusk/status/1579101966453858305"
    },
    "effDecode": {
      "label": "EFF · DocuColor tracking dot decoding guide · 2005",
      "url": "https://w2.eff.org/Privacy/printers/docucolor/"
    }
  },
  "guideIntro": "Expanded preparation plan: 210 to 225 minutes. The history and use-case section is intentionally longer at Mayank’s request. The original target was 180 minutes; the published event slot remains 150 minutes.\n\n## Timing\n\nHistory and use cases 60 to 75m; AI and research 40m; setup 10m; text lab 40m; image lab 35m; challenge 15m; questions 10m.\n\nFor a hard 150-minute slot, select a smaller set of cases and use the earlier 30 / 30 / 5 / 30 / 30 / 15 / 10 allocation. Showing every expanded case plus both builds needs the longer plan.\n\n## Case-study run sheet\n\nChildhood UV pen and Muller 5m; Baker’s stage photograph and music 8m; Denton first pass and decoded replay 7m; paper watermarking 5m; memo and Tesla 10m; Genius 8m; Google/Bing 8m; printer dots 7m; discussion and transition 2 to 17m.\n\nFor each case, let the room see the carrier first, ask what it could reveal, then explain the signal and the limit of the conclusion. Baker and Denton concern covert communication; Google’s experiment plants a canary; the other examples identify sources or copies. The examples are historical evidence that these use cases exist beyond AI, not claims about every current product.\n\n## Playback\n\nDenton: watch the supplied 41-second YouTube upload on the first slide, then advance to the separate decoded replay slide. Both start from the beginning, with no on-slide buttons. P pauses or resumes; M toggles sound; R restarts. The Morse guide is a reading aid for the documented message, not frame-synchronised eye tracking. Treat the account seriously and leave a pause afterwards. No automatic loop.\n\nStegaStamp: 00:00–00:59 for the physical demonstration; optional mechanism 00:59–01:27; physical tests 01:27–01:50. Direct YouTube links need a manual stop. Chrome Premium is the preferred fallback.\n\n## Hands-on flow\n\nUse demos/text-watermark-lab.ipynb for the four-word warm-up, then demos/text-watermark-part-2.ipynb for real-model generation and detection. The 40-minute text block includes both. The image block uses demos/image-watermark-lab.ipynb: four bits in known pixels, PNG save/reload and JPEG comparison. Each beginner exercise has a runnable solution. VideoSeal remains a research example and optional extension, not the included image lab.\n\n## Rehearsal\n\nThe current beginner text and image notebooks passed fresh Colab CPU runs in the browser, including saved-file checks and exercise solutions. Text Part 2 passed local real-model CPU execution with cached weights, repeatability checks and detector callbacks. It has not been run in a fresh Colab session; its installer, model download and text-box rendering remain unverified there. Earlier model-based Jupyter checks applied to the archived notebooks. Attendee concurrency, venue timing and any live print-camera setup also remain separate checks. See exports/notebook-validation.md and exports/validation.md.\n\n## Automatic playback\n\nThe supplied invisible-ink GIFs, paper GIF, author GIFs, token walkthrough and image distortions start on active-slide entry and loop. Animations pause off-slide, in hidden tabs or under blackout. The three opening GIFs have no on-slide playback controls. Press P to pause or resume the active opening animation. Other demos retain their controls. A deliberate pause is remembered until playback is resumed. Reduced-motion settings and presenter windows start still, with manual play available. YouTube clips start muted and play once. Timers, evidence inspection and audience reveals remain presenter-controlled.\n\n## Optional video production\n\nSee slides/video-cues.md for clips and optional Veo prompts. Generated clips are conceptual illustrations only.\n## Presentation controls\n\nThe audience sees no page counter or navigation bar. Press ? (Shift+/), Cmd+P or Ctrl+P to open presentation controls. Escape closes the panel. Arrow keys navigate; N opens notes; O opens the map; B blanks the screen; F toggles full screen.\n\n"
};
