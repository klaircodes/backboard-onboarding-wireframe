import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { Btn } from './Wire.jsx'

export default function PathChip({ path }) {
  const navigate = useNavigate()
  return (
    <Btn chip onClick={() => navigate('/hackathon')}>
      {PATHS[path].title} · change
    </Btn>
  )
}
