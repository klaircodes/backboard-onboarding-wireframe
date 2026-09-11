# Backboard onboarding wireframe

Clickable grayscale wireframe of the sign-up + hackathon flow from
`Backboard_Onboarding_Flow_v2_Sept2026`. Built for handoff: every screen is a route, every spec rule is
in the notes panel beside the screen, and every analytics event from the spec fires (to the console and
the notes panel) so the flow can be walked end to end.

Grey dashed boxes are placeholders for real product screenshots, icons and the embedded walkthrough
videos. `[bracketed]` text is a value that has to come from docs or the organizer (PowerShell one-liner,
expected terminal output, hackathon links).

## Run

```bash
npm install
npm run dev
```

Open the flow map at `/`. Use **Reset demo account** (top bar or flow map) to start over.

## Screens

| Route | Screen | Spec slide |
|---|---|---|
| `/` | Flow map: all screens, path copy, entry points, events | 4, 6, 7, 20 |
| `/signup?path=studio\|rcli\|api` | Sign-up: three cards + auth, path pre-selected | 5 |
| `/signup` | Sign-up with no path: nothing selected, button disabled | 5, 19 |
| `/signin` | Returning user: no cards | 19 |
| `/start/studio` | Start page, Studio: OS-detected download | 8 |
| `/start/rcli` | Start page, R-CLI: curl, login, verify, Windows tab | 9 |
| `/start/api` | Start page, Unified API: connect Claude Code / Cursor / VS Code | 10 |
| `/dashboard` | Path section open, connected state, 24h banner, change path | 4, 19 |
| `/hackathon` | Hackathon step 1: hero video, three cards (no default), three columns | 13 |
| `/hackathon/signup?path=…` | Hackathon step 2: existing form + path chip, promo required | 14 |
| `/hackathon/start/studio\|rcli\|api` | Hackathon step 3: credits banner + start page + hackathon links | 15–17 |

## How the path flows

1. Every CTA into sign-up carries `?path=`. No path → the cards are unselected and the button is disabled
   until one is picked. "Not sure?" selects `api`.
2. On account creation `path_selected` is stored (here: `localStorage`, key `bb_wire_account`) and the
   user is redirected to `/start/{path}`. The dashboard comes after the win.
3. The start page fires `start_cta_clicked` on the primary action. The grey **Simulate** button stands in
   for the real activation signal (`studio_signed_in`, `rcli_login_completed`,
   `editor_connected` / `first_api_call`) and moves the account to the connected dashboard state.
4. Hackathon: `/hackathon` → pick → `/hackathon/signup?path=` (promo code required) →
   `/hackathon/start/{path}`. Same components, `hackathon=true` on every event.

## Where things live

- `src/data/paths.js` — final card copy, button labels, video IDs, activation events, entry points.
  Copy is verbatim from slide 6; change it here only.
- `src/lib/track.js` — `track(event, props)` and the fake account record.
- `src/components/` — `PathCard`, `PathChooser`, `AuthBlock`, `DownloadButtons`, `CommandBlock`,
  `HarnessButtons`, `VideoEmbed`, `CreditsBanner`, `PathChip`, `HackathonLinks`, `StartBody` (the
  shared body of both start pages), `Wire` (screen frame, notes panel, placeholder box, button, field).
- `src/screens/` — one file per route.

## Making it real (what to swap)

- `AuthBlock` → real Google / GitHub / email auth. Write `path_selected` at account creation.
- `VideoEmbed` → `youtube-nocookie.com/embed/{id}` iframe, autoplay muted, captions on, `?si=` stripped.
- `DownloadButtons` → real per-platform Studio URLs + the auth handoff.
- `CommandBlock` → PowerShell one-liner and real expected output from docs.
- `HarnessButtons` → the existing one-click MCP installs under Integrations; create the key on page load.
- `HackathonLinks`, `HackathonForm` → real submit / judging / mentor URLs; promo code → credits.
- `track()` → the analytics pipeline. Event names and properties are already the spec's.
- Theme: the wireframe is grayscale on purpose. The real build is dark, matching the app.

## Open before build (from slide 21)

Studio download URLs per platform · Windows PowerShell R-CLI one-liner · exact MCP install links for
Claude Code, Cursor, VS Code · hackathon submit and mentor links · real product screenshots for the cards ·
the four videos cut to 60–90 s.
