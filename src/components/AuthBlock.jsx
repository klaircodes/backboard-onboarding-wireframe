import { Link } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { Btn, Field } from './Wire.jsx'

// Right column of the sign-up page (slide 5). Button label follows the path; disabled until one is picked.
export default function AuthBlock({ path, onComplete }) {
  const disabled = !path
  return (
    <div className="auth stack">
      <h2>Create your account</h2>
      <Btn full disabled={disabled} onClick={() => onComplete('google')}>Continue with Google</Btn>
      <Btn full disabled={disabled} onClick={() => onComplete('github')}>Continue with GitHub</Btn>
      <p className="or mono">or</p>
      <Field type="email" placeholder="Work email" disabled={disabled} />
      <Btn primary full disabled={disabled} onClick={() => onComplete('email')}>
        {path ? PATHS[path].button : 'Sign up'}
      </Btn>
      <p className="fine mono">Free. $5 memory credits. No credit card.</p>
      <p className="alt">
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  )
}
