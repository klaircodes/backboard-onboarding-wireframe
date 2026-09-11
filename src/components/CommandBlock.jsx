import { useState } from 'react'
import { Btn } from './Wire.jsx'

// Three commands with copy buttons and the expected output under each (slide 9).
// Windows tab swaps in the PowerShell one-liner. [PLACEHOLDER] marks values that must come from docs.
const UNIX = [
  { n: 1, label: 'Install (macOS / Linux)', cmd: 'curl -fsSL https://app.backboard.io/api/cli | bash', out: '[expected terminal output — real, from a fresh install]' },
  { n: 2, label: 'Sign in from the terminal', cmd: 'backboard login', out: '[prints a URL, a short code and a QR code; approval lands on this account]' },
  { n: 3, label: 'Verify', cmd: 'backboard --version', out: '[expected version output]' },
]
const WIN = [
  { n: 1, label: 'Install (Windows PowerShell)', cmd: '[PowerShell one-liner from docs]', out: '[expected output]' },
  { n: 2, label: 'Sign in from the terminal', cmd: 'backboard login', out: '[prints a URL, a short code and a QR code]' },
  { n: 3, label: 'Verify', cmd: 'backboard --version', out: '[expected version output]' },
]

export default function CommandBlock({ onCopy }) {
  const [tab, setTab] = useState('unix')
  const list = tab === 'unix' ? UNIX : WIN
  const copy = (cmd) => {
    navigator.clipboard?.writeText(cmd).catch(() => {})
    onCopy?.(cmd)
  }
  return (
    <div>
      <div className="tabs">
        <button className={tab === 'unix' ? 'on' : ''} onClick={() => setTab('unix')}>macOS / Linux</button>
        <button className={tab === 'win' ? 'on' : ''} onClick={() => setTab('win')}>Windows PowerShell</button>
      </div>
      {list.map((c) => (
        <div className="cmd" key={c.n}>
          <div className="head">
            <span>{c.n}. {c.label}</span>
            <Btn small ghost onClick={() => copy(c.cmd)}>Copy</Btn>
          </div>
          <pre>{c.cmd}</pre>
          <pre className="out">{c.out}</pre>
        </div>
      ))}
    </div>
  )
}
