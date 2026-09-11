import { useState } from 'react'

// Commands with copy buttons. Windows swaps the install line. Compact layout used on hackathon step 3.
const UNIX_INSTALL = 'curl -fsSL https://app.backboard.io/api/cli | bash'
const WIN_INSTALL = '[PowerShell one-liner from docs]'

function Cmd({ cmd, onCopy, delay = '' }) {
  const [done, setDone] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(cmd).catch(() => {})
    onCopy?.(cmd)
    setDone(true)
    setTimeout(() => setDone(false), 1400)
  }
  return (
    <div className={`cmd enter ${delay}`}>
      <span>{cmd}</span>
      <button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button>
    </div>
  )
}

export default function CommandBlock({ onCopy, compact = false, windows = false }) {
  const install = windows ? WIN_INSTALL : UNIX_INSTALL
  if (compact) {
    return (
      <div className="stack" style={{ gap: 10 }}>
        <Cmd cmd={install} onCopy={onCopy} delay="d2" />
        <div className="grid-2">
          <Cmd cmd="backboard login" onCopy={onCopy} delay="d3" />
          <Cmd cmd="backboard --version" onCopy={onCopy} delay="d4" />
        </div>
      </div>
    )
  }
  return (
    <div>
      <p className="step-label mono">1. Install ({windows ? 'Windows PowerShell' : 'macOS / Linux'})</p>
      <Cmd cmd={install} onCopy={onCopy} delay="d2" />
      <p className="step-label mono">2. Sign in from the terminal</p>
      <Cmd cmd="backboard login" onCopy={onCopy} delay="d3" />
      <p className="step-label mono">3. Verify</p>
      <Cmd cmd="backboard --version" onCopy={onCopy} delay="d4" />
    </div>
  )
}
