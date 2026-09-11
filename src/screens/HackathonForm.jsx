import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Page, Btn, Field } from '../components/Wire.jsx'
import PathChip from '../components/PathChip.jsx'
import { PATHS } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

// Slide 14. The form you already have, plus the path chip. Promo code required.
export default function HackathonForm() {
  const navigate = useNavigate()
  const [path] = usePathParam()
  const [members, setMembers] = useState([])
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
    <Page panelClass="form">
      <form className="stack" onSubmit={submit}>
        <div className="between" style={{ marginBottom: 6 }}>
          <h2 style={{ margin: 0 }}>Hackathon access</h2>
          <PathChip path={path} />
        </div>
        <div className="grid-2">
          <Field placeholder="First name" required />
          <Field placeholder="Last name" required />
        </div>
        <div className="grid-2">
          <Field type="email" placeholder="Email" required />
          <Field placeholder="School or company" required />
        </div>
        <div className="between" style={{ marginTop: 6 }}>
          <span>Team members</span>
          <Btn small onClick={() => setMembers([...members, ''])}>+ Add team member</Btn>
        </div>
        {members.length ? (
          <div className="team">
            {members.map((m, i) => (
              <div className="member" key={i}>
                <Field type="email" placeholder="Teammate email" value={m} onChange={(e) => setMembers(members.map((x, j) => (j === i ? e.target.value : x)))} />
                <Btn small onClick={() => setMembers(members.filter((_, j) => j !== i))}>Remove</Btn>
              </div>
            ))}
          </div>
        ) : null}
        <Field className="accent-border" placeholder="Promo code (required for credits)" value={promo} onChange={(e) => setPromo(e.target.value)} required />
        <Btn primary full type="submit" disabled={!promo.trim()}>{PATHS[path].hackButton}</Btn>
        <p className="mono muted" style={{ textAlign: 'center' }}>Credits issued instantly. No credit card.</p>
        <p className="text-2" style={{ textAlign: 'center' }}><a href="#" style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a></p>
      </form>
    </Page>
  )
}
