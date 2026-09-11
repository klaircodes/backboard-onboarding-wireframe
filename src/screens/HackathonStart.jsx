import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Page, Btn } from '../components/Wire.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
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

// "You're in": confirmation, a checklist that gets to the first result, video and submit info beside it.
export default function HackathonStart() {
  const { path } = useParams()
  const [done, setDone] = useState({})
  const [windows, setWindows] = useState(false)
  const [harness, setHarness] = useState(null)
  if (!isPath(path)) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const account = getAccount()
  const team = account?.hackathon ? account.team : 3
  const toggle = (i) => setDone({ ...done, [i]: !done[i] })
  const cta = (detail) => track('start_cta_clicked', { path, hackathon: true, detail })
  const doneCount = Object.values(done).filter(Boolean).length

  return (
    <Page>
      <section className="section">
        <div className="container youre-in">
          <div>
            <div className="badge-check enter" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M6 13.5 11 18.5 20 8" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h1 className="enter d1">You're in.</h1>
            <p className="lede enter d1" style={{ marginBottom: 0 }}>Your team is set up. Here's the fastest way to a first result with {p.title}.</p>
            <div className="summary enter d2">
              <div className="item"><div className="k">Team</div><div className="v">{team} {team === 1 ? 'person' : 'people'} · all covered</div></div>
              <div className="item"><div className="k">Path</div><div className="v">{p.title}</div></div>
              <div className="item"><div className="k">Setup</div><div className="v">about {p.setup}</div></div>
            </div>

            <ul className="checklist">
              {p.steps.map((s, i) => (
                <li key={s.title} className={`enter d${i + 2} ${done[i] ? 'done' : ''}`}>
                  <span className="box" role="checkbox" aria-checked={!!done[i]} tabIndex={0} onClick={() => toggle(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle(i)}>
                    {done[i] ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
                  </span>
                  <div>
                    <div className="t">{s.title}</div>
                    <p className="d">{s.detail}</p>
                    {path === 'studio' && i === 0 ? (
                      <div className="grid-2">
                        <Btn primary onClick={() => { cta('download'); toggle(0) }}>Download for macOS (Apple Silicon)</Btn>
                        <Btn onClick={() => { cta('download-win'); toggle(0) }}>Download for Windows</Btn>
                        <p className="muted small" style={{ gridColumn: '1 / -1' }}>Also: macOS Intel · Linux</p>
                      </div>
                    ) : null}
                    {s.harness ? (
                      <div className="harness">
                        {HARNESSES.map((h) => (
                          <Btn key={h} primary={harness === h} onClick={() => { setHarness(h); cta(h) }}>{h}</Btn>
                        ))}
                      </div>
                    ) : null}
                    {s.cmd && path === 'rcli' && i === 0 ? (
                      <>
                        <div className="mini-tabs">
                          <button className={!windows ? 'on' : ''} onClick={() => setWindows(false)}>macOS / Linux</button>
                          <button className={windows ? 'on' : ''} onClick={() => setWindows(true)}>Windows PowerShell</button>
                        </div>
                        <Cmd cmd={windows ? s.winCmd : s.cmd} />
                      </>
                    ) : s.cmd ? <Cmd cmd={s.cmd} /> : null}
                  </div>
                </li>
              ))}
            </ul>
            <p className="muted small enter d5" style={{ marginTop: 14 }}>
              {doneCount === p.steps.length ? 'All set. Go build.' : `${doneCount} of ${p.steps.length} done`} · Prefer a different path?{' '}
              {PATH_ORDER.filter((k) => k !== path).map((k, i) => (
                <span key={k}><Link to={`/hackathon/start/${k}`}>{PATHS[k].short}</Link>{i === 0 ? ' or ' : ''}</span>
              ))}
            </p>
          </div>

          <div>
            <VideoEmbed id={p.video} label={`${p.title} walkthrough, 90 sec`} h={230} className="enter d2" />
            <div className="aside-card enter d3" style={{ marginTop: 16 }}>
              <h3>When you're ready to submit</h3>
              <p>Submissions go through the hackathon portal. Judging criteria and the mentor channel are one click away, all weekend.</p>
              <div className="links">
                <a href="#" onClick={(e) => e.preventDefault()}>Submit a project</a><span>·</span>
                <a href="#" onClick={(e) => e.preventDefault()}>Judging criteria</a><span>·</span>
                <a href="#" onClick={(e) => e.preventDefault()}>Mentor channel</a>
              </div>
            </div>
            <div className="aside-card enter d4">
              <h3>Stuck?</h3>
              <p>The docs cover every step above, and mentors are in the channel all weekend.</p>
              <div className="links"><a href="#" onClick={(e) => e.preventDefault()}>Read the docs</a></div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
