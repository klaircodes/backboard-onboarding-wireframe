# Backboard onboarding wireframe

Black-and-white interactive wireframe of the hackathon sign-up flow from
`Backboard_Onboarding_Flow_v2_Sept2026`. Two domains, one handoff:

- **backboard.io/hackathon** (marketing site, Framer) — the information page. The path pick sits above
  the fold; "Sign up with …" links to `app.backboard.io/hackathon/team?path=…`. Below it: what you get,
  the three paths, how it works, FAQ.
- **app.backboard.io** — the wizard: Team → Code (creates the account) → Start ("You're in", checklist).
  Step breadcrumb with a progress line; a panel on the right previews whatever you pick.

Each screen shows its domain in the top bar. `/` opens on the website page. Grey boxes stand in for the
real product screenshots and videos. `[bracketed]` text is a value that has to come from docs or the
organizer.

## Run

```bash
npm install
npm run dev
```

## Steps

| Route | Screen |
|---|---|
| `/hackathon` (also `?path=studio\|rcli\|api`) | backboard.io · Information page with the path pick: three option rows, preview switches between Studio, terminal and editor; "Sign up with …" hands off to the app. Sections below: what you get, three ways in, how it works, FAQ. |
| `/hackathon/team?path=…` | app.backboard.io · Team: name, email, school, teammates as chips; the preview shows the team growing. |
| `/hackathon/code` | app.backboard.io · Code: the hackathon code on its own screen; the ticket on the right confirms when it's entered. Create account. |
| `/hackathon/start/studio\|rcli\|api` | app.backboard.io · Start: "You're in", a checklist to the first result (download / commands with copy / connect editor), video and submit links. |

The app sign-up screens from the deck (`/signup`, `/signin`, `/start/{path}`, `/dashboard`) are still in
the repo and reachable by URL but are not part of the wizard.

## Where things live

- `src/data/paths.js` — per-path copy, setup time, checklist steps, video IDs, activation events.
- `src/components/Wizard.jsx` — top bar with breadcrumb and progress, split layout, option row, buttons,
  fields, and the monochrome illustrations (Studio window, terminal, editor, team avatars, code ticket).
- `src/screens/Hackathon*.jsx` — one file per step. `src/lib/draft.js` keeps what's been entered between
  steps; `src/lib/track.js` logs the spec's analytics events to the console.
- `src/wire.css` — tokens, layout and motion.

## Making it real

Step 2/3 → real account creation with `path_selected` stored; the code → promo/credits backend; teammates
→ invites; step 4 buttons → real Studio download URLs, PowerShell one-liner, the existing one-click MCP
installs (key created on page load); video boxes → `youtube-nocookie.com/embed/{id}`, autoplay muted,
captions on; `track()` → analytics.
