import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Split, Btn } from '../components/Wizard.jsx'
import { isPath, PATHS, PATH_ORDER } from '../data/paths.js'
import { getAccount, track } from '../lib/track.js'

const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

function Cmd({ cmd }) {
  const [done, setDone] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(cmd).catch(() => {})
    setDone(true)
    setTimeout(() => setDone(false), 1400)
  }
  return (
    <div className="cmd">
      <span>{cmd}</span>
      <button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button>
    </div>
  )
}

// Step 4: you're in. A short checklist to the first result; video and submit info on the right.
export default function HackathonStart() {
  const { path } = useParams()
  const [done, setDone] = useState({})
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const account = getAccount()
  const team = account?.hackathon ? account.team : 1
  const toggle = (i) => setDone({ ...done, [i]: !done[i] })
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: true, detail })
  const doneCount = Object.values(done).filter(Boolean).length

  return (
    <Split
      step={4}
      title="You're in."
      sub={`Here's the fastest way to a first result with ${p.title}.`}
      aside={
        <div className="aside-stack">
          <div className="video"><div className="play" role="button" aria-label="Play" /><span className="small">{p.title} walkthrough, 90 sec</span></div>
          <div className="aside-card">
            <h3>When you're ready to submit</h3>
            <p>Submissions go through the hackathon portal. Judging criteria and the mentor channel are open all weekend.</p>
            <div className="links">
              <a href="#" onClick={(e) => e.preventDefault()}>Submit a project</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Judging criteria</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Mentor channel</a>
            </div>
          </div>
        </div>
      }
      footer={
        <>
          <Btn primary full onClick={() => cta('dashboard')}>Open the dashboard</Btn>
          <span className="hint">{doneCount} of {p.steps.length} done. Prefer a different path? {PATH_ORDER.filter((k) => k !== path).map((k, i) => <span key={k}><Link to={`/hackathon/start/${k}`}>{PATHS[k].short}</Link>{i === 0 ? ' or ' : ''}</span>)}</span>
        </>
      }
    >
      <div className="summary">
        <span>{team === 1 ? 'Just you' : `Team of ${team}`}</span>
        <span>{p.title}</span>
        <span>about {p.setup}</span>
      </div>
      <ul className="checklist">
        {p.steps.map((s, i) => (
          <li key={s.title} className={done[i] ? 'done' : ''}>
            <span className="box" role="checkbox" aria-checked={!!done[i]} tabIndex={0} onClick={() => toggle(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(i)}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div>
              <div className="t">{s.title}</div>
              <p className="d">{s.detail}</p>
              {path === 'studio' && i === 0 ? (
                <div className="grid-2">
                  <Btn primary onClick={() => { cta('download'); toggle(0) }}>Download for macOS</Btn>
                  <Btn onClick={() => { cta('download-win'); toggle(0) }}>Download for Windows</Btn>
                </div>
              ) : null}
              {s.harness ? (
                <div className="choice-row">
                  {HARNESSES.map((h) => (
                    <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h); toggle(0) }}>{h}</Btn>
                  ))}
                </div>
              ) : null}
              {s.cmd && path === 'rcli' && i === 0 ? (
                <>
                  <div className="mini-tabs">
                    <button type="button" className={!windows ? 'on' : ''} onClick={() => setWindows(false)}>macOS / Linux</button>
                    <button type="button" className={windows ? 'on' : ''} onClick={() => setWindows(true)}>Windows</button>
                  </div>
                  <Cmd cmd={windows ? s.winCmd : s.cmd} />
                </>
              ) : s.cmd ? <Cmd cmd={s.cmd} /> : null}
            </div>
          </li>
        ))}
      </ul>
    </Split>
  )
}
