import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { saveAccount, track } from '../lib/track.js'
import { Btn, Field } from './Wire.jsx'

// Inline sign-up that opens under the cards once a path is chosen. Promo code first: it is what grants access.
export default function ClaimForm({ path }) {
  const navigate = useNavigate()
  const p = PATHS[path]
  const [promo, setPromo] = useState('')
  const [email, setEmail] = useState('')
  const [mateInput, setMateInput] = useState('')
  const [mates, setMates] = useState([])

  const addMate = () => {
    const v = mateInput.trim()
    if (!v || mates.includes(v)) return
    setMates([...mates, v])
    setMateInput('')
  }
  const submit = (e) => {
    e.preventDefault()
    const team = 1 + mates.length
    saveAccount({ path, hackathon: true, team, activated: false, email })
    track('signup_completed', { path, hackathon: true, team })
    navigate(`/hackathon/start/${path}`)
  }

  return (
    <div className="claim" id="claim">
      <form className="stack" style={{ gap: 16 }} onSubmit={submit}>
        <div>
          <h3>Set up your team</h3>
          <p className="sub">About a minute. Everyone you add gets their own account, covered by the same code.</p>
        </div>
        <Field className="emph" label="Promo code" placeholder="From your hackathon organizer" value={promo} onChange={(e) => setPromo(e.target.value)} hint="Required. Your organizer's code covers the whole team." required />
        <div className="grid-2">
          <Field label="First name" placeholder="Ada" required />
          <Field label="Last name" placeholder="Lovelace" required />
        </div>
        <div className="grid-2">
          <Field label="Email" type="email" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Field label="School or company" placeholder="University of Waterloo" required />
        </div>
        <div className="field">
          <label>Teammates <span className="muted" style={{ fontWeight: 400 }}>· optional</span></label>
          <div className="row" style={{ gap: 8 }}>
            <input style={{ flex: 1 }} type="email" placeholder="teammate@school.edu, then Enter" value={mateInput} onChange={(e) => setMateInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMate() } }} />
            <Btn small onClick={addMate} disabled={!mateInput.trim()}>Add</Btn>
          </div>
          {mates.length ? (
            <div className="chips" style={{ marginTop: 10 }}>
              {mates.map((m) => (
                <span key={m} className="chip-tag">{m}<button type="button" aria-label={`Remove ${m}`} onClick={() => setMates(mates.filter((x) => x !== m))}>×</button></span>
              ))}
            </div>
          ) : null}
          <p className="team-line" style={{ marginTop: 8 }}>Team of {1 + mates.length}{mates.length ? ' · everyone is covered' : ' · add teammates so they are covered too'}</p>
        </div>
        <Btn primary full type="submit" disabled={!promo.trim()}>{p.hackButton} →</Btn>
        <p className="muted small" style={{ textAlign: 'center' }}>No credit card. You're in the moment you submit.</p>
      </form>

      <aside className="side">
        <h4>WHAT HAPPENS NEXT</h4>
        <ol className="next">
          <li><span className="num">01</span><div><b>Your account is created</b><span>Covered by your hackathon code.</span></div></li>
          <li><span className="num">02</span><div><b>{p.cta}</b><span>{p.steps[0].detail}</span></div></li>
          <li><span className="num">03</span><div><b>Start building</b><span>Submit from the same page when you are done.</span></div></li>
        </ol>
        <p className="muted small" style={{ marginTop: 16 }}>Already have an account? <a href="/signin">Sign in</a> and add the promo code in Settings.</p>
      </aside>
    </div>
  )
}
