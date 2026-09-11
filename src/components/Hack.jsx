import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../data/paths.js'

// App top bar (app.backboard.io): logo, domain, Hackathon access, Help.
export function AppBar() {
  return (
    <header className="bar">
      <div className="bar-left">
        <Link to="/hackathon" className="logo"><Mark />backboard</Link>
        <span className="domain">app.backboard.io</span>
      </div>
      <span className="bar-title">Hackathon access</span>
      <a href="#" className="bar-help" onClick={(e) => e.preventDefault()}>Help</a>
    </header>
  )
}

// Site nav (backboard.io).
export function SiteNav() {
  return (
    <header className="bar">
      <div className="bar-left">
        <Link to="/hackathon" className="logo"><Mark />backboard</Link>
        <span className="domain">backboard.io</span>
      </div>
      <span className="bar-title">Hackathon access</span>
      <nav className="bar-links">
        <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Sign in</a>
      </nav>
    </header>
  )
}

export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <i style={{ height: 6 }} /><i style={{ height: 14 }} /><i style={{ height: 16 }} /><i style={{ height: 9 }} />
    </span>
  )
}

export function Btn({ primary, full, small, className = '', ...rest }) {
  const cls = ['btn', primary && 'primary', full && 'full', small && 'small', className].filter(Boolean).join(' ')
  return <button type="button" className={cls} {...rest} />
}

export function Field({ className = '', ...rest }) {
  return <input className={`input ${className}`} {...rest} />
}

// Crossed placeholder for screenshots and video.
export function Placeholder({ label, video = false, className = '', style }) {
  return (
    <div className={`ph ${video ? 'ph-video' : ''} ${className}`} style={style}>
      {video ? <span className="play" aria-hidden="true" /> : null}
      {label ? <span className="ph-label">{label}</span> : null}
    </div>
  )
}

// Deck slide 13 card: screenshot, title, one line, Choose / Selected.
export function PathCard({ path, selected, onSelect }) {
  const p = PATHS[path]
  return (
    <div className={`pcard ${selected ? 'selected' : ''}`} role="radio" aria-checked={selected} tabIndex={0}
      onClick={() => onSelect(path)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}>
      <Placeholder label={`${p.title} screenshot`} />
      <div className="pcard-text">
        <h3>{p.title}</h3>
        <p>{p.shortLine}</p>
      </div>
      <span className={`btn full ${selected ? 'primary' : ''}`}>{selected ? 'Selected' : 'Choose'}</span>
    </div>
  )
}

export function Copy({ cmd, onCopy }) {
  return <CopyRow cmd={cmd} onCopy={onCopy} />
}

function CopyRow({ cmd, onCopy }) {
  const [done, setDone] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(cmd).catch(() => {})
    onCopy?.(cmd)
    setDone(true)
    setTimeout(() => setDone(false), 1400)
  }
  return (
    <div className="cmd">
      <span>{cmd}</span>
      <button type="button" className={`copy-btn ${done ? 'done' : ''}`} onClick={copy}>{done ? 'Copied' : 'Copy'}</button>
    </div>
  )
}
