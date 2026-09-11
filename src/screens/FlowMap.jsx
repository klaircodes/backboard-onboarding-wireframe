import { Link } from 'react-router-dom'
import { ENTRY_POINTS, PATHS, PATH_ORDER } from '../data/paths.js'
import { clearAccount } from '../lib/track.js'

const APP = [
  { route: '/signup?path=rcli', title: 'Sign-up page', desc: 'Three path cards + auth, one screen. Arrives with ?path= pre-selected.' },
  { route: '/signup', title: 'Sign-up page, no path', desc: 'Nothing selected, button disabled until a card is picked. The one place the question is asked.' },
  { route: '/signin', title: 'Sign in (returning)', desc: 'Never shows the cards.' },
  { route: '/start/studio', title: 'Start page, Studio', desc: 'OS-detected download, auth handoff, video.' },
  { route: '/start/rcli', title: 'Start page, R-CLI', desc: 'curl, backboard login, verify. Windows tab.' },
  { route: '/start/api', title: 'Start page, Unified API', desc: 'Connect Claude Code / Cursor / VS Code. Key auto-created.' },
  { route: '/dashboard', title: 'Dashboard', desc: 'Path section open by default, connected state, 24h banner, change path.' },
]
const HACK = [
  { route: '/hackathon', title: 'Step 1, watch then pick', desc: 'Hero video, three cards (no default), three columns.' },
  { route: '/hackathon/signup?path=rcli', title: 'Step 2, form', desc: 'Existing form + path chip. Promo code required.' },
  { route: '/hackathon/start/studio', title: 'Step 3, Studio', desc: 'Credits banner, download, video, hackathon links.' },
  { route: '/hackathon/start/rcli', title: 'Step 3, R-CLI', desc: 'Credits banner, commands, video, hackathon links.' },
  { route: '/hackathon/start/api', title: 'Step 3, Unified API', desc: 'Credits banner, connect editor, video, hackathon links.' },
]
const EVENTS = [
  ['path_selected', 'Card picked on sign-up or hackathon page. source = url | click | default', 'All'],
  ['signup_completed', 'Account created. Carries path and hackathon flag', 'All'],
  ['start_cta_clicked', 'Primary CTA on the start page', 'All'],
  ['studio_signed_in', 'Studio reports first sign-in for this account', 'Studio'],
  ['rcli_login_completed', 'backboard login device flow approves', 'R-CLI'],
  ['editor_connected / first_api_call', 'First MCP handshake, or first request on the key', 'Unified API'],
]

function Group({ title, items }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2>{title}</h2>
      <div className="map-grid">
        {items.map((s) => (
          <div className="map-card" key={s.route}>
            <span className="route">{s.route}</span>
            <Link to={s.route}>{s.title}</Link>
            <p className="small muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function FlowMap() {
  return (
    <div className="map">
      <h1>Backboard onboarding, wireframe</h1>
      <p className="lede">
        Sign-up asks one question (Studio, R-CLI, Unified API), stores it as <span className="mono">path_selected</span>, and lands the
        user on <span className="mono">/start/{'{path}'}</span>, the win, instead of the dashboard. The hackathon reuses the same cards
        and start pages. Every screen is clickable end to end; the notes panel on each screen lists the spec and the events it fires.
      </p>
      <p className="small muted" style={{ marginBottom: 32 }}>
        Source: Backboard_Onboarding_Flow_v2_Sept2026. Grey boxes are placeholders for real product screenshots and videos.{' '}
        <button className="link" onClick={() => clearAccount()}>Reset demo account</button>
      </p>

      <Group title="Hackathon flow (ship first)" items={HACK} />
      <Group title="App sign-up flow" items={APP} />

      <section style={{ marginBottom: 40 }}>
        <h2>Paths</h2>
        <table className="spec">
          <thead>
            <tr><th>Path</th><th>Card title</th><th>One line</th><th>Best for</th><th>Sign-up button</th><th>Start page</th><th>Activation event</th><th>Video</th></tr>
          </thead>
          <tbody>
            {PATH_ORDER.map((k) => {
              const p = PATHS[k]
              return (
                <tr key={k}>
                  <td className="mono">?path={k}</td><td>{p.title}</td><td>{p.line}</td><td>{p.bestFor}</td><td>{p.button}</td>
                  <td className="mono">/start/{k}</td><td className="mono">{p.activation}</td><td className="mono">youtu.be/{p.video}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2>Entry points</h2>
        <table className="spec">
          <thead><tr><th>Where the click comes from</th><th>Path it carries</th></tr></thead>
          <tbody>
            {ENTRY_POINTS.map((e) => (
              <tr key={e.from}><td>{e.from}</td><td className="mono">{e.path === null ? 'none (cards unselected)' : e.path}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="small muted" style={{ marginTop: 8 }}>Rule: no CTA on any Backboard property links to bare /signup. Returning users hitting Sign in never see the cards.</p>
      </section>

      <section>
        <h2>Events</h2>
        <table className="spec">
          <thead><tr><th>Event</th><th>Fires when</th><th>Path</th></tr></thead>
          <tbody>
            {EVENTS.map((e) => (
              <tr key={e[0]}><td className="mono">{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="small muted" style={{ marginTop: 8 }}>Activation = activation event within 24 hours of signup_completed. Report Studio, R-CLI and API side by side, app vs hackathon.</p>
      </section>
    </div>
  )
}
