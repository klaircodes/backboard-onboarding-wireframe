import { Link } from 'react-router-dom'
import { Logo } from '../components/Wire.jsx'
import { clearAccount } from '../lib/track.js'

const HACK = [
  ['/hackathon', 'Step 1 · watch, then pick'],
  ['/hackathon/signup?path=rcli', 'Step 2 · form with path chip'],
  ['/hackathon/start/studio', 'Step 3 · Studio'],
  ['/hackathon/start/rcli', 'Step 3 · R-CLI'],
  ['/hackathon/start/api', 'Step 3 · Unified API'],
]
const APP = [
  ['/signup?path=rcli', 'Sign-up · arrived with ?path=rcli'],
  ['/signup', 'Sign-up · no path, nothing selected'],
  ['/signin', 'Sign in · returning user'],
  ['/start/studio', 'Start page · Studio'],
  ['/start/rcli', 'Start page · R-CLI'],
  ['/start/api', 'Start page · Unified API'],
  ['/dashboard', 'Dashboard · after the win'],
]

export default function FlowMap() {
  return (
    <div className="index">
      <div style={{ marginBottom: 32 }}><Logo /></div>
      <h1>Onboarding screens</h1>
      <p className="lede">
        Interactive mockups of the sign-up and hackathon flow. Pick a card and the button follows; complete a
        step and it lands where the real one will. <button className="link" onClick={() => clearAccount()}>Reset demo account</button>
      </p>
      <h2>Hackathon</h2>
      <div className="index-list">
        {HACK.map(([r, t]) => (<Link key={r} to={r}><span>{t}</span><span className="route mono">{r}</span></Link>))}
      </div>
      <h2>App sign-up</h2>
      <div className="index-list">
        {APP.map(([r, t]) => (<Link key={r} to={r}><span>{t}</span><span className="route mono">{r}</span></Link>))}
      </div>
    </div>
  )
}
