import { PATH_ORDER } from '../data/paths.js'
import PathCard from './PathCard.jsx'

// Three cards. `notSure` renders the "Not sure? Start with the Unified API" default (sign-up only).
export default function PathChooser({ selected, onSelect, notSure = false, variant = 'signup' }) {
  return (
    <div className="stack">
      <div className="cards">
        {PATH_ORDER.map((key) => (
          <PathCard key={key} path={key} selected={selected === key} onSelect={onSelect} variant={variant} />
        ))}
      </div>
      {notSure ? (
        <p className="small muted">
          Not sure?{' '}
          <button className="link" onClick={() => onSelect('api', 'default')}>
            Start with the Unified API
          </button>
        </p>
      ) : null}
    </div>
  )
}
