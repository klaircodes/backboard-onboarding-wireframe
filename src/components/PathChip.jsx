import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { Btn } from './Wire.jsx'

// Path carried from step 1, shown on the form with "change" (slide 14).
export default function PathChip({ path }) {
  const navigate = useNavigate()
  return (
    <Btn chip onClick={() => navigate('/hackathon')}>
      {PATHS[path].title} · change
    </Btn>
  )
}
