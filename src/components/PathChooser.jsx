import { PATH_ORDER } from '../data/paths.js'
import { PathRow, PathTile } from './PathCard.jsx'

export function SignupChooser({ selected, onSelect }) {
  return (
    <div className="card-list">
      {PATH_ORDER.map((k) => (
        <PathRow key={k} path={k} selected={selected === k} onSelect={onSelect} />
      ))}
    </div>
  )
}

export function HackathonChooser({ selected, onSelect }) {
  const delays = ['d2', 'd3', 'd4']
  return (
    <div className="cards-3">
      {PATH_ORDER.map((k, i) => (
        <PathTile key={k} path={k} selected={selected === k} onSelect={onSelect} delay={delays[i]} />
      ))}
    </div>
  )
}
