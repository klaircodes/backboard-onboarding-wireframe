import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AppBar, Btn, Video, Copy } from '../components/Hack.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']
const LINKS = ['Submit your project', 'Judging criteria', 'Mentor channel', 'Docs']

// app.backboard.io/hackathon/start/{path} — credits banner, the win, the video, hackathon links (slides 15–17).
export default function HackathonStart() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const account = getAccount()
  const team = account?.hackathon ? account.team : 3
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: true, detail })

  return (
    <div className="page">
      <AppBar />
      <main className="wrap mid">
        <div className="card start">
          <div className="credits"><b>You are in.</b> Hackathon credits are on your account. Team of {team}.</div>

          {path === 'studio' ? (
            <>
              <h1>Get Backboard Studio</h1>
              <p className="sub">Download, open, sign in. Studio opens already signed in to this account.</p>
              <div className="two">
                <Btn primary onClick={() => cta('macos')}>Download for macOS (Apple Silicon)</Btn>
                <Btn onClick={() => cta('windows')}>Download for Windows</Btn>
              </div>
              <p className="note">Also available for macOS Intel and Linux.</p>
            </>
          ) : null}

          {path === 'rcli' ? (
            <>
              <h1>Install Backboard R-CLI</h1>
              <p className="sub">Three commands. Copy each one.</p>
              <Copy cmd={windows ? '[PowerShell one-liner from docs]' : 'curl -fsSL https://app.backboard.io/api/cli | bash'} onCopy={cta} />
              <div className="two">
                <Copy cmd="backboard login" onCopy={cta} />
                <Copy cmd="backboard --version" onCopy={cta} />
              </div>
              <p className="note">
                <button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show macOS / Linux' : 'On Windows? Use PowerShell'}</button>
                {' '}backboard login prints a URL, a short code and a QR code. Approve in the browser and you are in.
              </p>
            </>
          ) : null}

          {path === 'api' ? (
            <>
              <h1>Connect your coding harness</h1>
              <p className="sub">Same key, same memory, same 17,000+ models, inside the tool you open every day.</p>
              <div className="three">
                {HARNESSES.map((h) => <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h) }}>{h}</Btn>)}
              </div>
              <p className="note">Your key was created for you and is already in the install link. Also works with Codex, Windsurf and any MCP client.</p>
              <p className="note">Or call it raw: <span className="mono">pip install backboard-sdk</span> or <span className="mono">npm i backboard-sdk</span></p>
            </>
          ) : null}

          <Video path={path} caption={`${p.title} walkthrough, 90 sec`} className="start-video" />

          <div className="hack">
            <span className="label">Hackathon</span>
            <div className="hack-links">
              {LINKS.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l}</a>)}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
