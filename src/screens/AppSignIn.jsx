import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAccount } from '../lib/track.js'

export default function AppSignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const go = () => navigate(getAccount() ? '/dashboard' : '/signup')
  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <nav className="bar-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
          <Link to="/signup">Sign up</Link>
        </nav>
      </header>
      <main className="wrap narrow" style={{ paddingTop: 48, paddingBottom: 88, maxWidth: 440 }}>
        <h1 style={{ fontSize: 30, marginBottom: 20 }}>Sign in</h1>
        <div className="app-auth">
          <button type="button" className="btn full" onClick={go}>Continue with Google</button>
          <button type="button" className="btn full" onClick={go}>Continue with GitHub</button>
          <p className="app-or">or</p>
          <input className="input" type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" className="btn primary full" onClick={go}>Sign in</button>
          <p className="app-alt">New to Backboard? <Link to="/signup">Create an account</Link></p>
        </div>
      </main>
    </div>
  )
}
