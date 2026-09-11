import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Screen, Btn, Box } from '../components/Wire.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { getAccount, updateAccount, track } from '../lib/track.js'

const NOTES = [
  'Path section open by default in the sidebar (Integrations already lists Backboard Desktop, R-CLI, Cursor, VS Code, Claude Code).',
  'Connected state once the activation event fires.',
  'No activation in 24h: one banner for the user\'s path with the same start-page CTA. E2 email repeats it. Nothing else nags.',
  'Change path in Settings re-opens the start page for the new path.',
]

const SIDEBAR = [
  { key: 'studio', label: 'Backboard Desktop (Studio)' },
  { key: 'rcli', label: 'R-CLI' },
  { key: 'api', label: 'Cursor · VS Code · Claude Code' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [account, setAccount] = useState(getAccount())
  useEffect(() => {
    const sync = () => setAccount(getAccount())
    window.addEventListener('bb:account', sync)
    return () => window.removeEventListener('bb:account', sync)
  }, [])

  if (!account) {
    return (
      <Screen route="/dashboard" title="Dashboard" notes={NOTES}>
        <p>No account in this wireframe session yet. <Link to="/signup?path=api">Go through sign-up</Link>.</p>
      </Screen>
    )
  }

  const p = PATHS[account.path]
  const changePath = (next) => {
    updateAccount({ path: next, activated: false })
    track('path_selected', { path: next, source: 'settings' })
    navigate(`/start/${next}`)
  }

  return (
    <Screen route="/dashboard" title="Dashboard" notes={NOTES}>
      {!account.activated ? (
        <div className="banner" style={{ marginBottom: 20 }}>
          <span>
            <strong>Finish setting up {p.title}.</strong> <span className="muted">{p.win}</span>
          </span>
          <Btn primary small onClick={() => navigate(`${account.hackathon ? '/hackathon' : ''}/start/${account.path}`)}>
            {p.button.replace('Sign up and ', '').replace(/^./, (c) => c.toUpperCase())}
          </Btn>
        </div>
      ) : null}

      <div className="dash">
        <nav className="side">
          <div className="group"><h5>WORKSPACE</h5><div className="item">Threads</div><div className="item">Memory</div><div className="item">Documents</div></div>
          <div className="group">
            <h5>INTEGRATIONS</h5>
            {SIDEBAR.map((s) => (
              <div key={s.key} className={`item ${s.key === account.path ? 'on' : ''}`}>
                {s.label}
                {s.key === account.path ? <span className="muted small"> · {account.activated ? 'connected' : 'set up'}</span> : null}
              </div>
            ))}
          </div>
          <div className="group"><h5>ACCOUNT</h5><div className="item">API keys</div><div className="item">Settings</div></div>
        </nav>
        <div className="stack" style={{ gap: 20 }}>
          <div>
            <h1>{account.activated ? `${p.title} connected` : 'Dashboard'}</h1>
            <p className="lede">
              {account.activated
                ? `The ${p.title} section is open. First thread it created shows here.`
                : 'Zeros until the path is activated. The banner above is the only nag.'}
            </p>
          </div>
          <Box h={180} label={account.activated ? 'First thread / usage for the connected path' : 'Empty state, zeros'} />
          <div className="card stack">
            <h3>Settings · Change path</h3>
            <div className="row">
              {PATH_ORDER.map((k) => (
                <Btn key={k} small ghost={k !== account.path} disabled={k === account.path} onClick={() => changePath(k)}>
                  {PATHS[k].title}
                </Btn>
              ))}
            </div>
            <p className="small muted">Re-opens the start page for the new path.</p>
          </div>
        </div>
      </div>
    </Screen>
  )
}
