import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AppBar, Btn, Video, Copy } from '../components/Hack.jsx'
import { isPath, PATHS } from '../data/paths.js'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']
const READY = [
  ['Submit your project', 'Through the hackathon portal, any time before the deadline.'],
  ['Judging criteria', 'What the judges look for, so you can build toward it.'],
  ['Mentor channel', 'Backboard engineers are in the channel all weekend.'],
  ['Docs', 'Every command and endpoint, with examples.'],
]

// app.backboard.io/hackathon/start/{path} — slides 15–17: you're in, the win as numbered steps, video, links.
export default function HackathonStart() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const account = getAccount()
  const team = account?.hackathon ? account.team : 3
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: true, detail })

  const heading = { studio: 'Get Backboard Studio', rcli: 'Install Backboard R-CLI', api: 'Connect your coding harness' }[path]

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <div className="start2">
          <header className="done">
            <span className="check-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 9.5 7.5 13.5 14.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <h1>You're in.</h1>
            <p className="sub">Hackathon credits are on your account. {team === 1 ? 'Just you for now.' : `Team of ${team}, everyone is covered.`}</p>
            <div className="pills">
              <span>{p.title}</span>
              <span>{team === 1 ? '1 account' : `${team} accounts`}</span>
              <span>About {p.setup} to set up</span>
            </div>
          </header>

          <section className="group">
            <h2>{heading}</h2>
            <ol className="steps">
              {p.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{i + 1}</span>
                  <div className="step-body">
                    <div className="step-title">{s.title}</div>
                    <p className="step-detail">{s.detail}</p>
                    {path === 'studio' && i === 0 ? (
                      <div className="two">
                        <Btn primary onClick={() => cta('macos')}>Download for macOS (Apple Silicon)</Btn>
                        <Btn onClick={() => cta('windows')}>Download for Windows</Btn>
                        <p className="help" style={{ gridColumn: '1 / -1' }}>Also available for macOS Intel and Linux.</p>
                      </div>
                    ) : null}
                    {s.harness ? (
                      <div className="three">
                        {HARNESSES.map((h) => <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h) }}>{h}</Btn>)}
                      </div>
                    ) : null}
                    {s.cmd && path === 'rcli' && i === 0 ? (
                      <>
                        <Copy cmd={windows ? s.winCmd : s.cmd} onCopy={cta} />
                        <p className="help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show the macOS / Linux command' : 'On Windows? Show the PowerShell command'}</button></p>
                      </>
                    ) : s.cmd ? <Copy cmd={s.cmd} onCopy={cta} /> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="group">
            <h2>Watch the walkthrough</h2>
            <Video path={path} caption={`${p.title}, 90 sec`} className="start-video" />
          </section>

          <section className="group">
            <h2>When you're ready</h2>
            <div className="ready">
              {READY.map(([t, d]) => (
                <a key={t} href="#" className="ready-tile" onClick={(e) => e.preventDefault()}>
                  <b>{t}</b><span>{d}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
