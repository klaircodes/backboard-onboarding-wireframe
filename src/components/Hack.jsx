import { useRef, useState } from 'react'
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
      <div className="bar-left"><a href="#" className="wordmark" onClick={(e) => e.preventDefault()}>Backboard</a></div>
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
      <div className="bar-left"><a href="#" className="wordmark" onClick={(e) => e.preventDefault()}>Backboard</a></div>
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

// Video slot. `youtube` = the real video, autoplaying muted and looping with YouTube's bar hidden; our own
// Unmute / Fullscreen buttons appear on hover and drive the player through the iframe API. Otherwise a mock-up still.
const YT_ORIGIN = 'https://www.youtube-nocookie.com'
export function Video({ path, youtube, caption, className = '' }) {
  const [muted, setMuted] = useState(true)
  const box = useRef(null)
  const frame = useRef(null)
  const Shot = path ? SHOTS[path] : HeroStill
  const send = (func) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), YT_ORIGIN)
  const toggleMute = () => { send(muted ? 'unMute' : 'mute'); setMuted(!muted) }
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : box.current?.requestFullscreen?.())
  if (youtube) {
    const origin = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : ''
    const src = `${YT_ORIGIN}/embed/${youtube}?autoplay=1&mute=1&loop=1&playlist=${youtube}&controls=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1${origin}`
    return (
      <div className={`video ${className}`} ref={box}>
        <iframe ref={frame} src={src} title={caption || 'Video'} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
          onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), YT_ORIGIN)} />
        <div className="vctl">
          <button type="button" onClick={toggleMute}>{muted ? 'Unmute' : 'Mute'}</button>
          <button type="button" onClick={fullscreen}>Fullscreen</button>
        </div>
      </div>
    )
  }
  return (
    <div className={`video ${className}`}>
      <Shot />
      <span className="play" role="button" aria-label="Play" />
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

// Model-provider strip above the hero video. PNGs are the white logos from backboard.io's homepage ticker;
// ElevenLabs is drawn to match. Heights are tuned per mark so they read at one visual weight.
const LOGOS = [
  ['chatgpt', 'ChatGPT', 20], ['claude', 'Claude', 17], ['grok', 'Grok', 20], ['deepseek', 'DeepSeek', 17], ['cohere', 'Cohere', 15], ['openrouter', 'OpenRouter', 15], ['bytedance', 'ByteDance', 16],
]
export function Logos() {
  const base = import.meta.env.BASE_URL
  return (
    <div className="logos" role="list" aria-label="Models available on Backboard">
      {LOGOS.map(([file, name, h]) => <img key={file} role="listitem" src={`${base}logos/${file}.png`} alt={name} style={{ height: h }} />)}
      <svg role="listitem" viewBox="0 0 156 24" style={{ height: 16 }} aria-label="ElevenLabs">
        <rect x="0" y="1" width="5.5" height="22" fill="currentColor" />
        <rect x="9.5" y="1" width="5.5" height="22" fill="currentColor" />
        <text x="22" y="20.5" fontFamily="Geist, Manrope, sans-serif" fontWeight="600" fontSize="23" letterSpacing="-0.5" fill="currentColor">ElevenLabs</text>
      </svg>
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
