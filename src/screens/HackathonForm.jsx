import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Screen, Btn, Field } from '../components/Wire.jsx'
import PathChip from '../components/PathChip.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

const NOTES = [
  'The form you already have, plus the path chip. Keep: first/last name, email, school or company, team members, promo code, instant credits, submit link.',
  'Path chip comes from step 1 and can be changed. Promo code stays required: it is how credits are issued.',
  'Button label follows the path. Submit redirects to /hackathon/start/{path}.',
  'Every team member is emailed hackathon E1 for the chosen path.',
]

export default function HackathonForm() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [members, setMembers] = useState([''])
  const [promo, setPromo] = useState('')
  if (!path) return <Navigate to="/hackathon" replace />

  const submit = (e) => {
    e.preventDefault()
    const team = 1 + members.filter((m) => m.trim()).length
    saveAccount({ path, hackathon: true, team, activated: false })
    track('signup_completed', { path, hackathon: true, team })
    navigate(`/hackathon/start/${path}`)
  }

  return (
    <Screen route={`/hackathon/signup?path=${path}`} title="Hackathon, step 2" notes={NOTES}>
      <form className="stack" style={{ maxWidth: 520, gap: 16 }} onSubmit={submit}>
        <div>
          <p className="small muted">Hackathon access</p>
          <h1>Create your account</h1>
          <PathChip path={path} />
        </div>
        <div className="row" style={{ alignItems: 'stretch' }}>
          <div style={{ flex: 1 }}><Field label="First name" required /></div>
          <div style={{ flex: 1 }}><Field label="Last name" required /></div>
        </div>
        <Field label="Email" type="email" required />
        <Field label="School or company" required />
        <div className="field">
          <label>Team members <span className="req">(emails, optional)</span></label>
          <div className="team">
            {members.map((m, i) => (
              <div className="member" key={i}>
                <input value={m} placeholder="teammate@school.edu" onChange={(e) => setMembers(members.map((x, j) => (j === i ? e.target.value : x)))} />
                {members.length > 1 ? <Btn small ghost type="button" onClick={() => setMembers(members.filter((_, j) => j !== i))}>Remove</Btn> : null}
              </div>
            ))}
            <button type="button" className="link small" onClick={() => setMembers([...members, ''])} style={{ alignSelf: 'flex-start' }}>+ Add team member</button>
          </div>
        </div>
        <Field label="Promo code" required value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="From your hackathon organizer" />
        <Btn primary full type="submit" disabled={!promo.trim()}>{PATHS[path].hackButton}</Btn>
        <p className="small muted">Credits issued instantly. No credit card.</p>
        <p className="small"><a href="#" onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a></p>
      </form>
    </Screen>
  )
}
