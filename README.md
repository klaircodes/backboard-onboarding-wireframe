# Backboard onboarding wireframe

Black-and-white interactive wireframe of the hackathon sign-up flow from
`Backboard_Onboarding_Flow_v2_Sept2026`, built as an onboarding wizard: one question per screen, a step
breadcrumb with a progress line, and a panel on the right that previews whatever you pick.

`/` opens on step 1. Picking an option updates the preview; Continue moves to the next step; Back is in the
top bar. Grey boxes stand in for the real product screenshots and videos. `[bracketed]` text is a value
that has to come from docs or the organizer.

## Run

```bash
npm install
npm run dev
```

## Steps

| Route | Screen |
|---|---|
| `/hackathon` (also `?path=studio\|rcli\|api`) | 1 · Path: How do you want to build? Three option rows; the preview switches between Studio, terminal and editor illustrations. "Not sure? Start with the API." |
| `/hackathon/team` | 2 · Team: name, email, school, teammates as chips; the preview shows the team growing. |
| `/hackathon/code` | 3 · Code: the hackathon code on its own screen; the ticket on the right confirms when it's entered. Create account. |
| `/hackathon/start/studio\|rcli\|api` | 4 · Start: "You're in", a checklist to the first result (download / commands with copy / connect editor), video and submit links. |

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
