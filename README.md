# Backboard onboarding wireframe

Live: https://klaircodes.github.io/backboard-onboarding-wireframe/ (deploys from `main` via GitHub Actions)

Interactive wireframe of the hackathon sign-up flow from
`Backboard_Onboarding_Flow_v2_Sept2026`, following the deck's page structure (slides 13–17). Two domains,
one handoff:

- **backboard.io/hackathon** (marketing site, Framer) — slide 13: walkthrough video, "Build with Backboard
  this weekend.", three path cards with Choose / Selected, Continue, the three product columns, footer.
  Continue links to `app.backboard.io/hackathon/signup?path=studio|rcli|api`.
- **app.backboard.io/hackathon/signup** — slide 14: the existing form plus the path chip (change goes back
  to the site page). Promo code required. Submit creates the account and lands on the start page.
- **app.backboard.io/hackathon/start/{path}** — slides 15–17: credits banner with team size, the win
  (download buttons / three commands with copy and a Windows toggle / three editor buttons), the
  walkthrough video, hackathon links.

`/` opens on the site page. Product mock-ups in the app's dark palette
(`src/components/Illos.jsx`) stand in for the real screenshots and video stills; swap them for real media.
`[bracketed]` text is a value that has to come from docs or the organizer.

## Run

```bash
npm install
npm run dev
```

## Where things live

- `src/data/paths.js` — per-path copy (verbatim from slide 6 where the deck has it), button labels, video
  IDs, activation events.
- `src/components/Hack.jsx` — site nav, app bar, path card, video still, buttons, fields, copy row.
- `src/components/Illos.jsx` — SVG mock-ups: Studio, terminal, editor, and the hero composition.
- `public/logos/` — the white model-provider logos from backboard.io's homepage ticker (ChatGPT, Claude, Grok,
  DeepSeek, Cohere, OpenRouter); ElevenLabs is drawn inline in `Hack.jsx`. Shown above the hero video.
- `src/screens/HackathonLanding.jsx`, `HackathonSignup.jsx`, `HackathonStart.jsx` — one file per page.
- `src/lib/track.js` — logs the spec's analytics events to the console and keeps the fake account.
- `src/wire.css` — design tokens (below), layout, motion.

The app sign-up screens from the deck (`/signup`, `/signin`, `/start/{path}`, `/dashboard`) are still in
the repo and reachable by URL.

## Design tokens

Everything is styled from the Backboard design system, taken from the Framer project's colour and text styles.
The variables sit at the top of `src/wire.css`; use the same values in the real build.

| Token | Value | Framer style |
| --- | --- | --- |
| `--base` | `#05070B` | /Dark/Background/Base |
| `--s1` / `--s2` / `--s3` | `#101116` / `#14161C` / `#1A1C23` | /Dark/Surface/Primary, Secondary, Tertiary |
| `--line` / `--line-2` | `rgba(255,255,255,.08)` / `.14` | /Dark/Border/Subtle, Strong |
| `--text` / `--text-2` / `--text-3` | `#F8FAFC` / `#CBD5E1` / `#8B97A8` | /Dark/Text/Primary, Secondary, Muted |
| `--cyan` | `#38BDF8` | /Dark/Accent/Cyan (progress line, selected card, done checks only) |
| `--teal` / `--teal-2` | `#0B556B` / `#086B88` | Button / Default and its hover |
| `--btn-2` | `#171D25` | Button / Secondary |

Type follows the site's text styles: **Geist** 500 for headings (h1 44px, -0.03em, 1.05; h2 30px 400, -0.025em; h3 18px 500,
-0.02em), **Manrope** 400 for body (15px, 1.6; lede 17px, -0.01em; labels 13px 500), **Geist Mono** for commands. Buttons are
Manrope 500 on a 5px radius; cards and inputs use 6–10px.

## Making it real

Site page → Framer (native layers; the card selection and Continue link carry `?path=`). Form → the
existing hackathon form with the chip added; promo code → credits; teammates → invites. Start page → real
Studio download URLs, the PowerShell one-liner, the existing one-click MCP installs with the key created
on page load; video boxes → `youtube-nocookie.com/embed/{id}`, autoplay muted, captions on; `track()` →
analytics.
