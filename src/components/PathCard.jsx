import { PATHS } from '../data/paths.js'
import { Thumb, Check } from './Wire.jsx'

// Sign-up row (kept for the app flow).
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

// Hackathon tile: thumbnail, title, one line, Choose / Selected. A check pops in when selected.
export function PathTile({ path, selected, onSelect, delay = '' }) {
  const p = PATHS[path]
  return (
    <div
      className={`tile enter ${delay} ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(path)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}
    >
      {selected ? <Check /> : null}
      <Thumb />
      <div>
        <h3>{p.title}</h3>
        <p className="line">{p.line}</p>
      </div>
      <button type="button" className={`btn choose ${selected ? 'primary' : ''}`} tabIndex={-1}>
        {selected ? 'Selected' : 'Choose'}
      </button>
    </div>
  )
}
