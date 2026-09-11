import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
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

function Check() {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// app.backboard.io/hackathon/start/{path} — slides 15–17: you're in, the win as numbered steps, video, links.
export default function HackathonStart() {
  const { path } = useParams()
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  const [done, setDone] = useState({})
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const account = getAccount()
  const team = account?.hackathon ? account.team : 3
  const first = account?.first?.trim()
  const mark = (i) => setDone((d) => ({ ...d, [i]: true }))
  const cta = (detail, i) => { track('start_cta_clicked', { path, hackathon: true, detail }); if (i !== undefined) mark(i) }
  const doneCount = Object.values(done).filter(Boolean).length

  const heading = { studio: 'Get Backboard Studio', rcli: 'Install Backboard R-CLI', api: 'Connect your coding harness' }[path]

  return (
    <div className="page">
      <AppBar step={3} />
      <main className="wrap narrow">
        <div className="start2">
          <header className="done">
            <h1>{first ? `You're in, ${first}.` : "You're in."}</h1>
            <p className="sub">Hackathon credits are on your account{team === 1 ? '.' : `, and on your ${team - 1} teammate${team > 2 ? "s'" : "'s"} too.`}</p>
            <dl className="stats">
              <div><dt>Path</dt><dd>{p.title}</dd></div>
              <div><dt>Accounts</dt><dd>{team}</dd></div>
              <div><dt>Setup time</dt><dd>About {p.setup}</dd></div>
            </dl>
          </header>

          <section className="group">
            <div className="group-head"><h2>{heading}</h2><span className="meta">{doneCount} of {p.steps.length} done</span></div>
            <ol className="steps">
              {p.steps.map((s, i) => (
                <li key={s.title} className={done[i] ? 'is-done' : ''}>
                  <button type="button" className="chk" onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))} role="checkbox" aria-checked={!!done[i]} aria-label={`Mark "${s.title}" done`}>
                    <Check />
                  </button>
                  <div className="step-body">
                    <div className="step-title">{s.title}{done[i] ? <span className="step-done">Done</span> : null}</div>
                    <p className="step-detail">{s.detail}</p>
                    {path === 'studio' && i === 0 ? (
                      <div className="two">
                        <Btn primary onClick={() => cta('macos', 0)}>Download for macOS</Btn>
                        <Btn onClick={() => cta('windows', 0)}>Download for Windows</Btn>
                        <p className="help" style={{ gridColumn: '1 / -1' }}>Apple Silicon by default. Also available for macOS Intel and Linux.</p>
                      </div>
                    ) : null}
                    {s.harness ? (
                      <div className="three">
                        {HARNESSES.map((h) => <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h, i) }}>{h}</Btn>)}
                      </div>
                    ) : null}
                    {s.cmd && path === 'rcli' && i === 0 ? (
                      <>
                        <Copy cmd={windows ? s.winCmd : s.cmd} onCopy={() => cta('copy-install', 0)} />
                        <p className="help"><button type="button" className="link" onClick={() => setWindows(!windows)}>{windows ? 'Show the macOS / Linux command' : 'On Windows? Show the PowerShell command'}</button></p>
                      </>
                    ) : s.cmd ? <Copy cmd={s.cmd} onCopy={() => cta(`copy-${i}`, i)} /> : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="group">
            <div className="group-head"><h2>Watch the walkthrough</h2><span className="meta">90 sec</span></div>
            <Video path={path} caption={`${p.title} walkthrough`} className="start-video" />
          </section>

          <section className="group">
            <div className="group-head"><h2>When you're ready</h2></div>
            <div className="ready">
              {READY.map(([t, d]) => (
                <a key={t} href="#" className="ready-tile" onClick={(e) => e.preventDefault()}>
                  <b>{t}</b><span>{d}</span>
                </a>
              ))}
            </div>
          </section>

          <div className="end-row">
            <div>
              <b>All set?</b>
              <span className="help">You can come back to this page any time from Settings.</span>
            </div>
            <Link to="/dashboard" className="btn primary">Open the dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
