# Backboard onboarding wireframe

Black-and-white interactive wireframe of the hackathon sign-up flow from
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

Each top bar shows its domain. `/` opens on the site page. Monochrome product mock-ups
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
- `src/screens/HackathonLanding.jsx`, `HackathonSignup.jsx`, `HackathonStart.jsx` — one file per page.
- `src/lib/track.js` — logs the spec's analytics events to the console and keeps the fake account.
- `src/wire.css` — tokens, layout, motion.

The app sign-up screens from the deck (`/signup`, `/signin`, `/start/{path}`, `/dashboard`) are still in
the repo and reachable by URL.

## Making it real

Site page → Framer (native layers; the card selection and Continue link carry `?path=`). Form → the
existing hackathon form with the chip added; promo code → credits; teammates → invites. Start page → real
Studio download URLs, the PowerShell one-liner, the existing one-click MCP installs with the key created
on page load; video boxes → `youtube-nocookie.com/embed/{id}`, autoplay muted, captions on; `track()` →
analytics.
