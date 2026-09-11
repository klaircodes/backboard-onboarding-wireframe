import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, Btn } from '../components/Wire.jsx'
import { PATHS } from '../data/paths.js'
import { getAccount } from '../lib/track.js'

// Minimal dashboard after the win: the user's path section is open; one banner if not yet activated.
const INTEGRATIONS = [
  { key: 'studio', label: 'Backboard Desktop' },
  { key: 'rcli', label: 'Backboard R-CLI' },
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

  const p = account ? PATHS[account.path] : null
  return (
    <Page>
      <section className="section">
        <div className="container">
          {!account ? (
            <p className="text-2">No account yet. <Link to="/hackathon">Go through the hackathon sign-up</Link>.</p>
          ) : (
            <>
              <div className="banner enter">
                <span><strong>Finish setting up {p.title}.</strong> <span className="text-2">{p.win}</span></span>
                <Btn primary small onClick={() => navigate(`${account.hackathon ? '/hackathon' : ''}/start/${account.path}`)}>Open start page</Btn>
              </div>
              <div className="dash enter d1">
                <nav className="side">
                  <h5>TRAFFIC</h5>
                  <div className="item on">Dashboard</div><div className="item">Memories</div><div className="item">API Calls</div><div className="item">Documents</div><div className="item">Chat</div>
                  <h5>INTEGRATIONS</h5>
                  {INTEGRATIONS.map((i) => (
                    <div key={i.key} className={`item ${i.key === account.path ? 'on' : ''}`}>{i.label}</div>
                  ))}
                </nav>
                <div>
                  <h1 style={{ fontSize: 32 }}>Dashboard</h1>
                  <p className="text-2" style={{ marginBottom: 24 }}>Key usage metrics and analytics</p>
                  <div className="grid-2">
                    <div className="stat"><span className="text-2">Total Memories</span><div className="n">0</div></div>
                    <div className="stat"><span className="text-2">API Calls</span><div className="n">0</div></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </Page>
  )
}
