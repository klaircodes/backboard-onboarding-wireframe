import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen, Btn } from '../components/Wire.jsx'
import PathChooser from '../components/PathChooser.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
import { HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { track } from '../lib/track.js'

const NOTES = [
  'Hackathon walkthrough video is the hero. Autoplay muted, captions on, full width above the fold.',
  'Three chooser cards directly under the video. No default. Selecting one enables Continue and carries the path into the form.',
  'Below the cards: three columns, one per surface. What it is, one proof point, who it is for. Each ends with its own walkthrough link.',
  'Old feature list and stale memory claim are gone. Every claim comes from the claims guardrails.',
  'Dark theme in the real build (matches the app). Footer keeps "Looking to submit" and Docs.',
]

export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = useState(null)
  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  return (
    <Screen route="/hackathon" title="Hackathon, step 1" notes={NOTES}>
      <div className="stack" style={{ gap: 28 }}>
        <div>
          <p className="small muted">Hackathon access</p>
          <h1>Build with Backboard this weekend.</h1>
          <p className="lede">Pick how you want to build. Credits are issued on the next step.</p>
        </div>
        <VideoEmbed id={HACKATHON_VIDEO} label="Hackathon walkthrough" h={320} />
        <PathChooser selected={path} onSelect={select} variant="hackathon" />
        <div className="row">
          <Btn primary disabled={!path} onClick={() => navigate(`/hackathon/signup?path=${path}`)}>
            Continue
          </Btn>
          {!path ? <span className="small muted">Pick a card to continue</span> : null}
        </div>
        <hr className="rule" />
        <div className="columns">
          {PATH_ORDER.map((k) => (
            <div key={k} className="stack">
              <h3>{PATHS[k].title}</h3>
              <p>{PATHS[k].column}</p>
              <a href="#" className="small" onClick={(e) => e.preventDefault()}>Watch the {PATHS[k].title} walkthrough → <span className="muted">youtu.be/{PATHS[k].video}</span></a>
            </div>
          ))}
        </div>
        <hr className="rule" />
        <div className="row small">
          <a href="#" onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a>
          <span className="muted">·</span>
          <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        </div>
      </div>
    </Screen>
  )
}
