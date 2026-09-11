import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Btn, Field } from '../components/Hack.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

function Check() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

// app.backboard.io/hackathon/signup — slide 14, grouped: about you, your team, hackathon code.
export default function HackathonSignup() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [mates, setMates] = useState([])
  const [promo, setPromo] = useState('')
  if (!path) return <Navigate to="/hackathon" replace />
  const p = PATHS[path]
  const Shot = SHOTS[path]

  const team = 1 + mates.filter((m) => m.trim()).length
  const codeOk = promo.replace(/[^A-Z0-9]/gi, '').length >= 6
  const ready = first.trim() && last.trim() && email.trim() && school.trim() && codeOk
  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    saveAccount({ path, hackathon: true, team, activated: false, email, first })
    track('signup_completed', { path, hackathon: true, team })
    navigate(`/hackathon/start/${path}`)
  }

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <form className="signup" onSubmit={submit}>
          <header className="signup-head">
            <h1>Create your team's account</h1>
            <p className="sub">One promo code covers everyone. Each teammate you add gets their own login.</p>
          </header>

          <div className="path-row">
            <span className="path-thumb"><Shot /></span>
            <span className="path-text">
              <b>{p.title}</b>
              <span className="muted">{p.tagline}</span>
            </span>
            <Btn small onClick={() => navigate(`/hackathon?path=${path}`)}>Change</Btn>
          </div>

          <section className="group">
            <div className="group-head"><h2>About you</h2></div>
            <div className="two">
              <Field label="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoFocus />
              <Field label="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
            </div>
            <div className="two">
              <Field label="Email" type="email" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field label="School or company" value={school} onChange={(e) => setSchool(e.target.value)} />
            </div>
          </section>

          <section className="group">
            <div className="group-head"><h2>Your team</h2><span className="meta">{team === 1 ? 'Just you so far' : `${team} people`}</span></div>
            <div className="roster">
              <div className="roster-row you">
                <span className="avatar">{(first || email || '?').slice(0, 1).toUpperCase()}</span>
                <span className="roster-text">{first || last ? `${first} ${last}`.trim() : 'You'}<span className="muted">{email || 'your email above'}</span></span>
                <span className="tag">You</span>
              </div>
              {mates.map((m, i) => (
                <div className="roster-row" key={i}>
                  <span className="avatar">{(m || '?').slice(0, 1).toUpperCase()}</span>
                  <input className="input" type="email" placeholder="teammate@school.edu" value={m} autoFocus onChange={(e) => setMates(mates.map((x, j) => (j === i ? e.target.value : x)))} />
                  <button type="button" className="remove" aria-label="Remove teammate" onClick={() => setMates(mates.filter((_, j) => j !== i))}>×</button>
                </div>
              ))}
              <button type="button" className="add-mate" onClick={() => setMates([...mates, ''])}>+ Add a teammate</button>
            </div>
          </section>

          <section className="group">
            <div className="group-head"><h2>Hackathon code</h2><span className="meta">Required</span></div>
            <div className={`code-wrap ${codeOk ? 'ok' : ''}`}>
              <Field className="code" placeholder="XXXX-XXXX" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} />
              <span className="code-check" aria-hidden="true"><Check /></span>
            </div>
            <p className="help">{codeOk ? `Looks good. This issues credits for ${team === 1 ? 'you' : `all ${team} of you`}, no card needed.` : 'From your organizer. It issues the credits for your whole team, no card needed.'}</p>
          </section>

          <div className="signup-foot">
            <Btn primary full type="submit" disabled={!ready}>{p.hackButton}</Btn>
            <p className="fine">Creates {team === 1 ? 'your account' : `${team} accounts`} and issues credits instantly.</p>
          </div>
        </form>
        <p className="fine below"><a href="#" onClick={(e) => e.preventDefault()}>Looking to submit a project?</a></p>
      </main>
    </div>
  )
}
