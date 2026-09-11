import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { SHOTS, HeroStill } from './Illos.jsx'

const STEPS = ['Pick a path', 'Sign up', 'Start building']

// Progress across both domains: a plain breadcrumb (done · current · next) and a line under the bar that fills.
export function Stepper({ step }) {
  return (
    <>
      <nav className="crumbs" aria-label={`Step ${step} of ${STEPS.length}`}>
        {STEPS.map((label, i) => {
          const n = i + 1
          const state = n < step ? 'done' : n === step ? 'on' : ''
          return (
            <span key={label} className="crumb-wrap">
              <span className={`crumb ${state}`} aria-current={n === step ? 'step' : undefined}>{label}</span>
              {i < STEPS.length - 1 ? <span className="crumb-sep" aria-hidden="true">›</span> : null}
            </span>
          )
        })}
      </nav>
      <span className="bar-progress" style={{ transform: `scaleX(${step / STEPS.length})` }} aria-hidden="true" />
    </>
  )
}

export function SiteNav() {
  return (
    <header className="bar">
      <div className="bar-left">
        <Link to="/hackathon" className="logo"><Mark />backboard</Link>
        <span className="domain">backboard.io</span>
      </div>
      <Stepper step={1} />
      <nav className="bar-links">
        <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Sign in</a>
      </nav>
    </header>
  )
}

export function AppBar({ step = 2 }) {
  return (
    <header className="bar">
      <div className="bar-left">
        <Link to="/hackathon" className="logo"><Mark />backboard</Link>
        <span className="domain">app.backboard.io</span>
      </div>
      <Stepper step={step} />
      <a href="#" className="bar-help" onClick={(e) => e.preventDefault()}>Help</a>
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

export function Field({ label, className = '', ...rest }) {
  return (
    <label className="fld">
      {label ? <span>{label}</span> : null}
      <input className={`input ${className}`} {...rest} />
    </label>
  )
}

// Video still with a play button. `path` picks the product mock-up; no path = the hero composition.
export function Video({ path, caption, className = '' }) {
  const Shot = path ? SHOTS[path] : HeroStill
  return (
    <div className={`video ${className}`}>
      <Shot />
      <span className="play" role="button" aria-label="Play" />
      {caption ? <span className="caption">{caption}</span> : null}
    </div>
  )
}

// Deck slide 13 card, with a real mock-up instead of a box.
export function PathCard({ path, selected, onSelect }) {
  const p = PATHS[path]
  const Shot = SHOTS[path]
  return (
    <div className={`pcard ${selected ? 'selected' : ''}`} role="radio" aria-checked={selected} tabIndex={0}
      onClick={() => onSelect(path)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}>
      <div className="pcard-shot"><Shot /></div>
      <div className="pcard-body">
        <div className="pcard-title">
          <h3>{p.title}</h3>
          <span className="pick-mark" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
        <p>{p.tagline}</p>
      </div>
    </div>
  )
}

export function Copy({ cmd, onCopy }) {
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
