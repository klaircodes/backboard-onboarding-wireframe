import { useState } from 'react'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { isPath, PATHS } from '../data/paths.js'
import { Video, Copy } from '../components/Hack.jsx'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

function detect() {
  const ua = navigator.userAgent || ''
  if (/Windows/i.test(ua)) return 'windows'
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return 'linux'
  return 'mac'
}

export default function AppStart() {
  const { path } = useParams()
  const navigate = useNavigate()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/signup" replace />
  const p = PATHS[path]
  const account = getAccount()
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: false, detail })
  const skip = () => navigate('/dashboard')

  return (
    <div className="page">
      <header className="bar">
        <div className="bar-left"><a href="/" className="wordmark">Backboard</a></div>
        <nav className="bar-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Help</a>
        </nav>
      </header>
      <main className="wrap narrow">
        <div className="app-start">
          <h1>{path === 'studio' ? 'Get Backboard Studio' : path === 'rcli' ? 'Install Backboard R-CLI' : 'Connect your coding harness'}</h1>
          <p className="sub">{path === 'studio' ? 'Your account is already signed in. Open Studio and you are live.' : path === 'rcli' ? 'Three commands. Copy each one.' : 'Same key, same memory, same 17,000+ models, inside the tool you open every day.'}</p>

          {path === 'studio' && (
            <div className="app-start-group">
              <div className="two">
                <button type="button" className="btn primary" onClick={() => cta(detect() === 'mac' ? 'macos' : detect())}>Download for {detect() === 'mac' ? 'macOS' : detect() === 'windows' ? 'Windows' : 'Linux'}</button>
                <button type="button" className="btn" onClick={() => cta(detect() !== 'mac' ? 'macos' : 'windows')}>{detect() !== 'mac' ? 'Download for macOS' : 'Download for Windows'}</button>
              </div>
              <p className="help">Apple Silicon by default. Also available for macOS Intel and Linux.</p>
            </div>
          )}

          {path === 'rcli' && (
            <div className="app-start-group">
              <div className="app-steps">
                <div><span className="app-step-n">1</span><span className="app-step-label">Install ({windows ? 'Windows PowerShell' : 'macOS / Linux'})</span></div>
                <Copy cmd={windows ? '[PowerShell one-liner from docs]' : 'curl -fsSL https://app.backboard.io/api/cli | bash'} onCopy={() => cta('copy-install')} />
                <div><span className="app-step-n">2</span><span className="app-step-label">Sign in from the terminal</span></div>
                <Copy cmd="backboard login" onCopy={() => cta('copy-login')} />
                <div><span className="app-step-n">3</span><span className="app-step-label">Verify</span></div>
                <Copy cmd="backboard --version" onCopy={() => cta('copy-verify')} />
              </div>
              <p className="help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show the macOS / Linux command' : 'On Windows? Show the PowerShell command'}</button></p>
            </div>
          )}

          {path === 'api' && (
            <div className="app-start-group">
              <div className="three">
                {HARNESSES.map((h) => <button key={h} type="button" className={`btn ${harness === h ? 'primary' : ''}`} onClick={() => { setHarness(h); cta(h) }}>{h}</button>)}
              </div>
              <p className="help">Also: Codex, Windsurf, any MCP client</p>
              <div className="app-steps" style={{ marginTop: 20 }}>
                <span className="app-step-label">Or call it raw</span>
                <Copy cmd="pip install backboard-sdk   ·   npm i backboard-sdk" onCopy={() => cta('copy-sdk')} />
              </div>
              <p className="help" style={{ marginTop: 8 }}>Your API key was created and is in the snippet. Python and JavaScript, same as today.</p>
            </div>
          )}

          <section className="group" style={{ marginTop: 32 }}>
            <div className="group-head"><h2>Watch the walkthrough</h2></div>
            <Video youtube={p.video} caption={`${p.title} walkthrough`} className="start-video" />
          </section>

          <div className="app-skip">
            <button type="button" className="link" onClick={skip}>Skip, go to dashboard</button>
          </div>
        </div>
      </main>
    </div>
  )
}
