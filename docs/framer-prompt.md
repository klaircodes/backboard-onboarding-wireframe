# Prompt for the Framer agent: build `/hackathon` (step 1 only)

Paste everything below the line into the Framer agent in the Backboard site project.

---

Build one new page at `/hackathon` in this project. It is step 1 of the hackathon onboarding flow. Steps 2 and 3 (sign-up and start) live on app.backboard.io, so this page ends with links out. Do not build anything past this page.

Reference: https://klaircodes.github.io/backboard-onboarding-wireframe/hackathon — match its structure, order and copy exactly. Ignore the pages it links to.

**Styles.** Use only this project's existing colour and text styles and components; do not create new ones. Background /Dark/Background/Base. Surfaces /Dark/Surface/Primary and /Dark/Surface/Secondary. Hairlines /Dark/Border/Subtle. Text /Dark/Text/Primary, /Dark/Text/Secondary, /Dark/Text/Muted. /Dark/Accent/Cyan is used once, for the progress line. Headings use the Geist heading styles: the homepage hero style for the h1, text-h2 for section titles, text-h3 for card and column titles. Body uses the Manrope paragraph styles: text-body-lg for the lede, text-body for paragraphs, text-body-sm for captions and hints. Buttons are the project's Button component: Secondary variant at rest, DefaultButton (teal) for primary. Radius 12 on cards, 5 on buttons. No gradients, no glows, no strokes on cards, no textures.

**Layout.** Use the site's global Nav and Footer. Content column max 960px with 32px side padding, single column, left-aligned. Breakpoints: Desktop 1200, Tablet, Phone. Layer names are two-word PascalCase (HeroSection, LogoStrip, PathCards, PathCard, ProductColumns).

**Sections, top to bottom.**

1. **ProgressStrip** under the nav, 56px tall, hairline below. Centred breadcrumb "Pick a path › Sign up › Start building" in text-body-sm: first item Text/Primary, separators and the rest Text/Muted. A 2px cyan line sits on the strip's bottom edge and spans the first third of the width.

2. **HeroSection**, 56px top padding.
   h1: "Backboard for your hackathon." (max 620px)
   Lede, text-body-lg, Text/Secondary, max 580px: "Persistent memory, 17,000+ models, retrieval and threads, free for your team this weekend. Pick how you want to build and you're set up in a minute."

3. **LogoStrip**, 26px below the lede. One row of the white model logos already in this project's homepage LogoTicker, in this order: ChatGPT, Claude, Grok, DeepSeek, Cohere, OpenRouter, then ElevenLabs. Marks about 20px tall (adjust each so they read at one weight), 32px gap, 78% opacity, left-aligned, wrapping to a second line on phone. 14px below it, text-body-sm in Text/Muted: "Every frontier model on one account, and 17,000 more through the Unified API."

4. **HeroVideo**, 28px below. YouTube embed of `8I5QLZTdbXo`, aspect 16:7.5 on desktop and 16:9 on phone, radius 12, 1px /Dark/Border/Strong. Bottom-left caption pill "Hackathon walkthrough" (text-body-sm, Surface/Primary at 88%, 1px Border/Strong, pill radius).

5. **PickSection**, 64px top padding.
   h2: "Pick how you want to build."
   Line under it, text-body, Text/Muted: "Credits are issued on the next step. You can switch later."
   **PathCards**: three cards in one row on desktop and tablet, stacked on phone, 16px gap. Each card is a link (the whole card, not just the button). Card: Surface/Primary, radius 12, padding 10, no border, no shadow. Inside, top to bottom: a 16:10 product image with its own 8px rounded corners and nothing behind it; then 16px padding with title in text-h3, a one-line description in Text/Muted, and a full-width Secondary button.
   - Backboard Studio — "The desktop IDE with everything built in." — button "Sign up and download Studio" — links to https://app.backboard.io/hackathon/signup?path=studio — image: Studio window.
   - Backboard R-CLI — "An open-source coding harness for the terminal." — button "Sign up and install R-CLI" — links to https://app.backboard.io/hackathon/signup?path=rcli — image: terminal.
   - Unified API — "One key, inside the editor you already use." — button "Sign up and connect your editor" — links to https://app.backboard.io/hackathon/signup?path=api — image: code editor.
   Hover: the card scales to 1.02 over 320ms with an ease-out curve (no spring, no bounce) and its button switches to the DefaultButton variant. Nothing else changes. There is no selected state on this page.
   Images: use the real product screenshots as 16:10 crops. If they are not in the project yet, leave an empty image frame named StudioShot, TerminalShot and EditorShot.
   20px below the cards, centred, text-body-sm in Text/Muted: "Picking one takes you to sign-up on app.backboard.io. Not sure? Start with the API" where "Start with the API" is an underlined link to the api URL above.

6. **ProductColumns**, 64px above, hairline on top, 40px padding top and 72px bottom. Three equal columns (stack on phone), 32px gap. Each: title in text-h3, then a lead line in Text/Primary, then a paragraph in text-body Text/Muted.
   - Backboard Studio — "You want to ship an app, not live in a terminal." — "The desktop IDE. Memory, 17,000+ models, documents, and the R-CLI harness in one app. Open it, sign in, build."
   - Backboard R-CLI — "You live in the terminal and want an agent that ships." — "Open source recursive coding harness. 84.3% on Terminal Bench 2.1, above every published result. Any model, including open ones."
   - Unified API — "You are already in Claude Code, Cursor or VS Code." — "One key. Memory (#1 on LoCoMo and LongMemEval), routing across 17,000+ models, agentic RAG, threads, tools. Python and JS."

7. The site's global Footer.

Copy is final; do not rewrite it. No eyebrow labels, no numbered markers, no icons, no arrows on links or buttons. Motion: only the card hover above and a single fade-up of the hero on load.
