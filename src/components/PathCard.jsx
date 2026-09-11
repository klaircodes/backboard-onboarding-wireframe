import { PATHS } from '../data/paths.js'
import { Thumb, Check } from './Wire.jsx'

// App sign-up row (kept).
export function PathRow({ path, selected, onSelect }) {
  const p = PATHS[path]
  return (
    <button type="button" className={`path-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} aria-pressed={selected}>
      <Thumb size={72} />
      <div className="copy">
        <h3>{p.title}</h3>
        <p>{p.line} Best for: {p.bestForInline}</p>
      </div>
      <span className="dot" aria-hidden="true" />
    </button>
  )
}

// Hackathon card. Decision-first: what it is, best if, what you get, setup time. Dims when another is chosen.
export function PathTile({ path, selected, anySelected, onSelect, delay = '' }) {
  const p = PATHS[path]
  return (
    <div
      className={`tile enter ${delay} ${selected ? 'selected' : ''} ${anySelected && !selected ? 'dim' : ''}`}
      onClick={() => onSelect(path)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}
    >
      {selected ? <Check /> : null}
      <Thumb />
      <div>
        <div className="meta">
          <h3>{p.title}</h3>
          <span className="setup">{p.setup} setup</span>
        </div>
        <p className="best">{p.bestIf}</p>
      </div>
      <ul>
        {p.youGet.map((g) => <li key={g}>{g}</li>)}
      </ul>
      <button type="button" className={`btn choose ${selected ? 'primary' : ''}`} tabIndex={-1}>
        {selected ? 'Selected' : `Choose ${p.short}`}
      </button>
    </div>
  )
}
