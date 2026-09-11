import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Btn, Field } from '../components/Hack.jsx'
import { SHOTS } from '../components/Illos.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

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
  const ready = first.trim() && last.trim() && email.trim() && school.trim() && promo.trim()
  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    saveAccount({ path, hackathon: true, team, activated: false, email })
    track('signup_completed', { path, hackathon: true, team })
    navigate(`/hackathon/start/${path}`)
  }

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <form className="signup" onSubmit={submit}>
          <header className="signup-head">
            <h1>Hackathon access</h1>
            <p className="sub">One promo code covers your whole team. Everyone you add gets their own account.</p>
          </header>

          <button type="button" className="path-row" onClick={() => navigate(`/hackathon?path=${path}`)}>
            <span className="path-thumb"><Shot /></span>
            <span className="path-text">
              <span className="muted">You're signing up for</span>
              <b>{p.title}</b>
            </span>
            <span className="path-change">Change</span>
          </button>

          <section className="group">
            <h2>About you</h2>
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
            <h2>Your team</h2>
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
            <h2>Hackathon code</h2>
            <Field className="code" placeholder="XXXX-XXXX" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} />
            <p className="help">From your organizer. It issues the credits for all {team === 1 ? 'of you' : `${team} of you`}, no card needed.</p>
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
