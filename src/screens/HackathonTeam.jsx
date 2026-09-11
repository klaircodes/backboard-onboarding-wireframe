import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Split, Btn, Field, TeamIllo } from '../components/Wizard.jsx'
import { getDraft, setDraft } from '../lib/draft.js'
import { isPath } from '../data/paths.js'

// Step 2: who is building. Teammates become chips; the panel shows the team growing.
export default function HackathonTeam() {
  const navigate = useNavigate()
  const fromUrl = new URLSearchParams(window.location.search).get('path')
  const draft = getDraft().path ? getDraft() : isPath(fromUrl) ? setDraft({ path: fromUrl }) : getDraft()
  const [first, setFirst] = useState(draft.first || '')
  const [last, setLast] = useState(draft.last || '')
  const [email, setEmail] = useState(draft.email || '')
  const [school, setSchool] = useState(draft.school || '')
  const [mates, setMates] = useState(draft.mates || [])
  const [mateInput, setMateInput] = useState('')
  if (!draft.path) return <Navigate to="/hackathon" replace />

  const addMate = () => {
    const v = mateInput.trim()
    if (!v || mates.includes(v)) return
    setMates([...mates, v])
    setMateInput('')
  }
  const ready = first.trim() && last.trim() && email.trim() && school.trim()
  const next = (e) => {
    e.preventDefault()
    if (!ready) return
    setDraft({ first, last, email, school, mates })
    navigate('/hackathon/code')
  }

  return (
    <Split
      step={2}
      title="Who's on your team?"
      sub="Everyone you add gets their own account under your hackathon code."
      aside={<TeamIllo count={1 + mates.length} names={[first || email, ...mates]} />}
      footer={<Btn primary full disabled={!ready} onClick={next}>Continue</Btn>}
    >
      <form className="wz-controls" onSubmit={next}>
        <div className="grid-2">
          <Field label="First name" value={first} onChange={(e) => setFirst(e.target.value)} autoFocus />
          <Field label="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
        </div>
        <Field label="Email" type="email" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="School or company" value={school} onChange={(e) => setSchool(e.target.value)} />
        <div className="field">
          <span className="field-label">Teammates <span className="muted">(optional)</span></span>
          <div className="add-row">
            <Field type="email" placeholder="teammate@school.edu" value={mateInput} onChange={(e) => setMateInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMate() } }} />
            <Btn onClick={addMate} disabled={!mateInput.trim()}>Add</Btn>
          </div>
          {mates.length ? (
            <div className="mates" style={{ marginTop: 4 }}>
              {mates.map((m) => (
                <span key={m} className="mate">{m}<button type="button" aria-label={`Remove ${m}`} onClick={() => setMates(mates.filter((x) => x !== m))}>×</button></span>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    </Split>
  )
}
