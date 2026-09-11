import { Link } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { Btn, Box, Field } from './Wire.jsx'

// Google / GitHub / work email. Button label follows the path; disabled until a path is picked (slide 5).
export default function AuthBlock({ path, onComplete }) {
  const label = path ? PATHS[path].button : 'Sign up'
  const disabled = !path
  return (
    <div className="card stack">
      <h2>Create your account</h2>
      <Btn full disabled={disabled} onClick={() => onComplete('google')}>
        <Box label="icon" h={18} w={18} style={{ padding: 0 }} /> Continue with Google
      </Btn>
      <Btn full disabled={disabled} onClick={() => onComplete('github')}>
        <Box label="icon" h={18} w={18} style={{ padding: 0 }} /> Continue with GitHub
      </Btn>
      <p className="small muted" style={{ textAlign: 'center' }}>or</p>
      <Field label="Work email" type="email" placeholder="you@company.com" disabled={disabled} />
      <Btn primary full disabled={disabled} onClick={() => onComplete('email')}>
        {label}
      </Btn>
      <p className="small muted">Free. $5 memory credits. No credit card.</p>
      <p className="small">
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  )
}
