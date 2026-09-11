import { PATHS } from '../data/paths.js'
import { Thumb } from './Wire.jsx'

// Sign-up card (slide 5): horizontal row, thumbnail + copy, cyan border and dot when selected.
export function PathRow({ path, selected, onSelect }) {
  const p = PATHS[path]
  return (
    <button type="button" className={`path-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} aria-pressed={selected}>
      <Thumb size={84} />
      <div className="copy">
        <h3>{p.title}</h3>
        <p>
          {p.line} Best for: {p.bestForInline}
        </p>
      </div>
      <span className="dot" aria-hidden="true" />
    </button>
  )
}

// Hackathon card (slide 13): vertical tile, short one-liner, Choose / Selected button.
export function PathTile({ path, selected, onSelect }) {
  const p = PATHS[path]
  return (
    <div className={`path-tile ${selected ? 'selected' : ''}`} onClick={() => onSelect(path)} role="button" tabIndex={0} aria-pressed={selected}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}>
      <div className="top">
        <Thumb size={56} />
        <div>
          <h3>{p.title}</h3>
          <p>{p.shortLine}</p>
        </div>
      </div>
      <button type="button" className={`btn choose ${selected ? 'primary' : ''}`} tabIndex={-1}>
        {selected ? 'Selected' : 'Choose'}
      </button>
    </div>
  )
}
