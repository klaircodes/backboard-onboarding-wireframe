import { PATHS } from '../data/paths.js'
import { Box } from './Wire.jsx'

// One path card. `variant="hackathon"` uses the short one-liner and a Choose / Selected pill (slide 13).
export default function PathCard({ path, selected, onSelect, variant = 'signup' }) {
  const p = PATHS[path]
  const hack = variant === 'hackathon'
  return (
    <button
      type="button"
      className={`path-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(path)}
      aria-pressed={selected}
    >
      <Box className="shot" label={`Real product screenshot · 1:1 crop · ${p.title}`} h={120} />
      <h3>{p.title}</h3>
      <p>{hack ? p.shortLine : p.line}</p>
      {hack ? null : <p className="best">Best for: {p.bestFor}</p>}
      {hack ? <span className="state">{selected ? 'Selected' : 'Choose'}</span> : null}
    </button>
  )
}
