import { PATH_ORDER } from '../data/paths.js'
import { PathRow } from './PathCard.jsx'

// Used by the app sign-up screen (/signup) only.
export function SignupChooser({ selected, onSelect }) {
  return (
    <div className="card-list">
      {PATH_ORDER.map((k) => (
        <PathRow key={k} path={k} selected={selected === k} onSelect={onSelect} />
      ))}
    </div>
  )
}
