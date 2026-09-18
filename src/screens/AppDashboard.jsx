import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

const INTEGRATIONS = [
  { key: 'studio', label: 'Backboard Desktop' },
  { key: 'rcli', label: 'Backboard R-CLI' },
  { key: 'api', label: 'Cursor · VS Code · Claude Code' },
]

export default function AppDashboard() {
  const navigate = useNavigate()
  const [account, setAccount] = useState(getAccount())
  useEffect(() => {
    const sync = () => setAccount(getAccount())
    window.addEventListener('bb:account', sync)
    return () => window.removeEventListener('bb:account', sync)
  }, [])
  const p = account ? PATHS[account.path] : null

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <nav className="bar-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Help</a>
        </nav>
      </header>
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 88 }}>
        {!account ? (
          <p className="sub">No account yet. <Link to="/signup">Sign up</Link> or <Link to="/hackathon">try the hackathon flow</Link>.</p>
        ) : (
          <>
            {!account.activated && (
              <div className="app-banner">
                <span><b>Finish setting up {p.title}.</b> {p.win}</span>
                <button type="button" className="btn small primary" onClick={() => navigate(`/start/${account.path}`)}>Open start page</button>
              </div>
            )}
            <div className="app-dash">
              <nav className="app-side">
                <span className="app-side-section">TRAFFIC</span>
                <span className="app-side-item active">Dashboard</span>
                <span className="app-side-item">Memories</span>
                <span className="app-side-item">API Calls</span>
                <span className="app-side-item">Documents</span>
                <span className="app-side-item">Chat</span>
                <span className="app-side-section">INTEGRATIONS</span>
                {INTEGRATIONS.map((i) => <span key={i.key} className={`app-side-item ${i.key === account.path ? 'active' : ''}`}>{i.label}</span>)}
              </nav>
              <div className="app-main">
                <h1 style={{ fontSize: 28 }}>Dashboard</h1>
                <p className="sub" style={{ marginBottom: 24 }}>Key usage metrics and analytics</p>
                <div className="two">
                  <div className="app-stat"><span className="app-stat-label">Total Memories</span><span className="app-stat-n">0</span></div>
                  <div className="app-stat"><span className="app-stat-label">API Calls</span><span className="app-stat-n">0</span></div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
