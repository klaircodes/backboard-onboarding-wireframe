import { Link, useNavigate } from 'react-router-dom'
import { Page, Btn, Field } from '../components/Wire.jsx'
import { getAccount } from '../lib/track.js'

// Returning users never see the cards.
export default function SignIn() {
  const navigate = useNavigate()
  const go = () => navigate(getAccount() ? '/dashboard' : '/signup')
  return (
    <Page narrow>
      <div className="auth stack" style={{ maxWidth: 440, margin: '0 auto' }}>
        <h2>Sign in</h2>
        <Btn full onClick={go}>Continue with Google</Btn>
        <Btn full onClick={go}>Continue with GitHub</Btn>
        <p className="or mono">or</p>
        <Field type="email" placeholder="Work email" />
        <Btn primary full onClick={go}>Sign in</Btn>
        <p className="alt">New to Backboard? <Link to="/signup">Create an account</Link></p>
      </div>
    </Page>
  )
}
