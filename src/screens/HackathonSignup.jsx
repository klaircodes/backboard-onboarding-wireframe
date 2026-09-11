import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppBar, Btn, Field } from '../components/Hack.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

// app.backboard.io/hackathon/signup — deck slide 14: the form you already have, plus the path chip.
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

  const ready = first.trim() && last.trim() && email.trim() && school.trim() && promo.trim()
  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    const team = 1 + mates.filter((m) => m.trim()).length
    saveAccount({ path, hackathon: true, team, activated: false, email })
    track('signup_completed', { path, hackathon: true, team })
    navigate(`/hackathon/start/${path}`)
  }

  return (
    <div className="page">
      <AppBar />
      <main className="wrap narrow">
        <form className="card form" onSubmit={submit}>
          <div className="form-head">
            <h1>Hackathon access</h1>
            <button type="button" className="chip" onClick={() => navigate(`/hackathon?path=${path}`)}>
              {p.title}<span className="chip-change">change</span>
            </button>
          </div>
          <div className="two">
            <Field placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoFocus />
            <Field placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
          </div>
          <div className="two">
            <Field type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Field placeholder="School or company" value={school} onChange={(e) => setSchool(e.target.value)} />
          </div>
          <div className="team-head">
            <span className="label">Team members</span>
            <Btn small onClick={() => setMates([...mates, ''])}>+ Add team member</Btn>
          </div>
          {mates.map((m, i) => (
            <div className="member" key={i}>
              <Field type="email" placeholder="Teammate email" value={m} onChange={(e) => setMates(mates.map((x, j) => (j === i ? e.target.value : x)))} />
              <button type="button" className="remove" aria-label="Remove" onClick={() => setMates(mates.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
          <Field className="promo" placeholder="Promo code (required for credits)" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <Btn primary full type="submit" disabled={!ready}>{p.hackButton}</Btn>
          <p className="fine">Credits issued instantly. No credit card.</p>
          <p className="fine"><a href="#" onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a></p>
        </form>
      </main>
    </div>
  )
}
