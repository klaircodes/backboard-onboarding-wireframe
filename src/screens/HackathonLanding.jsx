import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page, Btn } from '../components/Wire.jsx'
import { HackathonChooser } from '../components/PathChooser.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
import { HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { track } from '../lib/track.js'

const LABELS = { studio: 'Studio', rcli: 'R-CLI', api: 'Unified API' }

// Slide 13. Video first, pick a path, then what each is.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = useState(null)
  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  return (
    <Page right="Hackathon access">
      <VideoEmbed id={HACKATHON_VIDEO} label="Hackathon walkthrough" h={200} play className="hero-video" />
      <h2 style={{ marginBottom: 6 }}>Build with Backboard this weekend.</h2>
      <p className="text-2" style={{ marginBottom: 20 }}>Pick how you want to build. Credits are issued on the next step.</p>
      <HackathonChooser selected={path} onSelect={select} />
      <div className="row" style={{ marginTop: 20 }}>
        <Btn primary disabled={!path} onClick={() => navigate(`/hackathon/signup?path=${path}`)}>Continue</Btn>
        {!path ? <span className="mono muted">Pick a path to continue</span> : null}
      </div>
      <div className="columns-3">
        {PATH_ORDER.map((k) => (
          <div key={k}>
            <p className="label mono">{LABELS[k]}</p>
            <p>{PATHS[k].column}</p>
            <p style={{ marginTop: 10 }}><a href="#" className="small" style={{ color: '#2aa8d2', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>Watch the {LABELS[k]} walkthrough →</a></p>
          </div>
        ))}
      </div>
      <div className="footer-links links">
        <a href="#" onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a>
        <span>·</span>
        <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
      </div>
    </Page>
  )
}
