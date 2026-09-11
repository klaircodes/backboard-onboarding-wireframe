import { useState } from 'react'
import { PATHS } from '../data/paths.js'
import { SHOTS, HeroStill } from './Illos.jsx'
import { track } from '../lib/track.js'

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
      <div className="bar-left" />
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
      <div className="bar-left" />
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

// Video slot. `youtube` = a real video: poster + play, the player loads on click. Otherwise a product mock-up still.
const poster = (id, size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`
export function Video({ path, youtube, caption, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const [img, setImg] = useState(youtube ? poster(youtube, 'maxresdefault') : null)
  const Shot = path ? SHOTS[path] : HeroStill
  const play = () => {
    if (!youtube) return
    track('video_played', { id: youtube })
    setPlaying(true)
  }
  if (youtube && playing) {
    return (
      <div className={`video ${className}`}>
        <iframe src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`} title={caption || 'Video'} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    )
  }
  return (
    <div className={`video ${className}`}>
      {youtube ? <img src={img} alt="" onError={() => setImg(poster(youtube, 'hqdefault'))} /> : <Shot />}
      <button type="button" className="play" aria-label="Play" onClick={play} />
      {caption ? <span className="caption">{caption}</span> : null}
    </div>
  )
}

// Deck slide 13 card, with a real mock-up instead of a box. Clicking it is the step: the parent navigates.
export function PathCard({ path, selected, onSelect }) {
  const p = PATHS[path]
  const Shot = SHOTS[path]
  return (
    <div className={`pcard ${selected ? 'selected' : ''}`} role="radio" aria-checked={selected} tabIndex={0}
      onClick={() => onSelect(path)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(path)}>
      <div className="pcard-shot"><Shot /></div>
      <div className="pcard-body">
        <h3>{p.title}</h3>
        <p>{p.tagline}</p>
        <span className={`btn full ${selected ? 'primary' : ''}`}>{p.button}</span>
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
