import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Split, Btn, Field, CodeIllo } from '../components/Wizard.jsx'
import { getDraft, clearDraft } from '../lib/draft.js'
import { saveAccount, track } from '../lib/track.js'

// Step 3: the hackathon code. This is what grants access for the whole team, so it gets its own screen.
export default function HackathonCode() {
  const navigate = useNavigate()
  const draft = getDraft()
  const [code, setCode] = useState('')
  if (!draft.path || !draft.email) return <Navigate to="/hackathon" replace />

  const valid = code.trim().length >= 4
  const team = 1 + (draft.mates?.length || 0)
  const create = (e) => {
    e.preventDefault()
    if (!valid) return
    saveAccount({ path: draft.path, hackathon: true, team, activated: false, email: draft.email })
    track('signup_completed', { path: draft.path, hackathon: true, team })
    clearDraft()
    navigate(`/hackathon/start/${draft.path}`)
  }

  return (
    <Split
      step={3}
      title="Enter your hackathon code."
      sub="Your organizer gave one to your team. It covers everyone you added, and there's no card to enter."
      aside={<CodeIllo valid={valid} code={code} />}
      footer={
        <>
          <Btn primary full disabled={!valid} onClick={create}>Create account</Btn>
          <span className="hint">You're in as soon as you press this. {team > 1 ? `Your ${team - 1} teammate${team > 2 ? 's' : ''} get an email.` : ''}</span>
        </>
      }
    >
      <form className="wz-controls" onSubmit={create}>
        <Field className="big" placeholder="XXXX-XXXX" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} autoFocus hint="Case doesn't matter." />
      </form>
    </Split>
  )
}
