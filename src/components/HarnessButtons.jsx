import { useState } from 'react'
import { Btn } from './Wire.jsx'

// Three one-click MCP installs (slide 10). Claude Code is the default primary; clicking one makes it primary.
const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

export default function HarnessButtons({ onConnect }) {
  const [active, setActive] = useState('Claude Code')
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="harness">
        {HARNESSES.map((h) => (
          <Btn key={h} primary={active === h} onClick={() => { setActive(h); onConnect(h) }}>{h}</Btn>
        ))}
      </div>
      <p className="mono muted">Also: Codex, Windsurf, any MCP client</p>
    </div>
  )
}
