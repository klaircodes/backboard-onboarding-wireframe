import { Link } from 'react-router-dom'
import { PATHS } from '../data/paths.js'

// Path carried from hackathon step 1, shown on the form with a change link (slide 14).
export default function PathChip({ path }) {
  return (
    <span className="chip">
      {PATHS[path].title} · <Link to="/hackathon">change</Link>
    </span>
  )
}
