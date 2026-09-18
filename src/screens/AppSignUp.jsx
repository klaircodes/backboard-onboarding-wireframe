import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { SHOTS } from '../components/Illos.jsx'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

function PathRow({ path, selected, onSelect }) {
  const p = PATHS[path]
  const Shot = SHOTS[path]
  return (
    <button type="button" className={`app-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} aria-pressed={selected}>
      <span className="app-row-thumb"><Shot /></span>
      <span className="app-row-text">
        <b>{p.title}</b>
        <span>{p.line}</span>
        <span className="app-row-best">Best for: {p.bestForInline}</span>
      </span>
      <span className="app-row-dot" />
    </button>
  )
}

export default function AppSignUp() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const tracked = useRef(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (path && !tracked.current) { tracked.current = true; track('path_selected', { path, source: 'url' }) }
  }, [path])

  const select = (next, source = 'click') => { setPath(next); track('path_selected', { path: next, source }) }

  const complete = (provider) => {
    if (!path) return
    saveAccount({ path, hackathon: false, provider, activated: false })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <nav className="bar-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
          <Link to="/signin">Sign in</Link>
        </nav>
      </header>
      <main className="wrap mid" style={{ paddingTop: 48, paddingBottom: 88 }}>
        <div className="app-signup">
          <div className="app-signup-left">
            <h1>What are you here for?</h1>
            <div className="app-rows">
              {PATH_ORDER.map((k) => <PathRow key={k} path={k} selected={path === k} onSelect={select} />)}
            </div>
            <p className="app-hint">Not sure? <button type="button" className="link" onClick={() => select('api', 'default')}>Start with the Unified API.</button></p>
          </div>
          <div className="app-signup-divider" />
          <div className="app-signup-right">
            <h2>Create your account</h2>
            <div className="app-auth">
              <button type="button" className="btn full" disabled={!path} onClick={() => complete('google')}>Continue with Google</button>
              <button type="button" className="btn full" disabled={!path} onClick={() => complete('github')}>Continue with GitHub</button>
              <p className="app-or">or</p>
              <input className="input" type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!path} />
              <button type="button" className="btn primary full" disabled={!path} onClick={() => complete('email')}>
                {path ? PATHS[path].button : 'Sign up'}
              </button>
              <p className="app-fine">Free. $5 memory credits. No credit card.</p>
              <p className="app-alt">Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
