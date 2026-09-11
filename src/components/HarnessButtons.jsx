import { useState } from 'react'
import { Btn } from './Wire.jsx'

// Three one-click MCP installs. The chosen one fills black.
const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

export default function HarnessButtons({ onConnect }) {
  const [active, setActive] = useState(null)
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="harness">
        {HARNESSES.map((h, i) => (
          <Btn key={h} className={`enter d${i + 2}`} primary={active === h} onClick={() => { setActive(h); onConnect(h) }}>{h}</Btn>
        ))}
      </div>
      <p className="mono muted">Also: Codex, Windsurf, any MCP client</p>
    </div>
  )
}
