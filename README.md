# Backboard onboarding wireframe

Black-and-white interactive wireframe of the hackathon sign-up flow from
`Backboard_Onboarding_Flow_v2_Sept2026` (slides 12–17), laid out as a real site: nav, hero with the
walkthrough video, pick-a-path cards, how it works, footer. `/` opens on the hackathon page. Picking a card
changes the button, completing a step lands where the real one will. The app sign-up screens (slides 5,
8–10) are still reachable by URL.

Dashed boxes stand in for real product screenshots and the embedded walkthrough videos. `[bracketed]` text
is a value that has to come from docs or the organizer.

## Run

```bash
npm install
npm run dev
```

`/` is the hackathon page. The logo always goes back to it.

## Screens

| Route | Screen | Slide |
|---|---|---|
| `/hackathon` | Step 1: hero video, three cards (no default), Continue, three columns | 13 |
| `/hackathon/signup?path=…` | Step 2: the existing form + path chip; promo code required | 14 |
| `/hackathon/start/studio` · `rcli` · `api` | Step 3: credits banner, the win, video, hackathon links | 15–17 |
| `/signup?path=studio` · `rcli` · `api` | Sign-up with the path pre-selected; button label follows | 5 |
| `/signup` | Sign-up with no path: nothing selected, button disabled | 5 |
| `/signin` | Returning user, no cards | — |
| `/start/studio` · `rcli` · `api` | Start page after auth | 8–10 |
| `/dashboard` | After the win: path section open, one banner if not activated | — |

## Behaviour that's wired

- `?path=` pre-selects a card; without it the sign-up button reads "Sign up" and is disabled. "Not sure?"
  picks Unified API.
- Account creation stores `path_selected` (here `localStorage`) and redirects to `/start/{path}`.
- Hackathon: pick → form (promo code required, team members add/remove) → `/hackathon/start/{path}` with
  the team size in the credits banner.
- Copy buttons copy. Windows PowerShell swaps the install line. Download button follows the OS.
- Spec events (`path_selected`, `signup_completed`, `start_cta_clicked`) log to the console.

## Where things live

- `src/data/paths.js` — card copy, button labels, video IDs, activation events (verbatim from slide 6).
- `src/components/` — `PathCard` (sign-up row + hackathon tile), `AuthBlock`, `DownloadButtons`,
  `CommandBlock`, `HarnessButtons`, `VideoEmbed`, `CreditsBanner`, `PathChip`, `HackathonLinks`,
  `StartBody` (shared by both start pages), `Wire` (page shell, logo, button, field).
- `src/screens/` — one file per route. `src/wire.css` — theme tokens and layout.

## Making it real

`AuthBlock` → real auth, write `path_selected` at account creation · `VideoEmbed` →
`youtube-nocookie.com/embed/{id}` (autoplay muted, captions on) · `DownloadButtons` → per-platform Studio
URLs + auth handoff · `CommandBlock` → PowerShell one-liner and real expected output · `HarnessButtons` →
the existing one-click MCP installs, key created on page load · form → promo code → credits · `track()` →
analytics.

Open before build: Studio download URLs, PowerShell one-liner, MCP install links, hackathon submit/mentor
URLs, real screenshots for the cards, the four videos cut to 60–90 s.
