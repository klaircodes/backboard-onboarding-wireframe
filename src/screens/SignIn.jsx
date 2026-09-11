import { useNavigate, Link } from 'react-router-dom'
import { Screen, Btn, Box, Field } from '../components/Wire.jsx'
import { getAccount } from '../lib/track.js'

const NOTES = [
  'Returning users never see the cards.',
  'After sign-in: dashboard, with the user\'s path section open by default.',
  'Change path lives in Settings and re-opens the start page for the new path.',
]

export default function SignIn() {
  const navigate = useNavigate()
  const account = getAccount()
  const go = () => navigate(account ? '/dashboard' : '/signup')
  return (
    <Screen route="/signin" title="Sign in (returning user)" notes={NOTES}>
      <div style={{ maxWidth: 420 }} className="card stack">
        <h1>Sign in</h1>
        <Btn full onClick={go}><Box label="icon" h={18} w={18} style={{ padding: 0 }} /> Continue with Google</Btn>
        <Btn full onClick={go}><Box label="icon" h={18} w={18} style={{ padding: 0 }} /> Continue with GitHub</Btn>
        <p className="small muted" style={{ textAlign: 'center' }}>or</p>
        <Field label="Work email" type="email" placeholder="you@company.com" />
        <Btn primary full onClick={go}>Sign in</Btn>
        <p className="small">New here? <Link to="/signup">Create an account</Link></p>
        {!account ? <p className="small muted">Wireframe: no demo account yet, so sign-in will route to sign-up.</p> : null}
      </div>
    </Screen>
  )
}
