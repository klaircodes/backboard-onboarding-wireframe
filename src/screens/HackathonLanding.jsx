import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page, Btn } from '../components/Wire.jsx'
import { HackathonChooser } from '../components/PathChooser.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
import { HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { track } from '../lib/track.js'

// Step 1. Hero with the walkthrough, pick a path, how it works, what each path gives you.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = useState(null)
  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  return (
    <Page>
      <section className="hero">
        <div className="container">
          <h1 className="enter">Build with Backboard this weekend.</h1>
          <p className="lede enter d1">Memory, 17,000+ models, RAG and threads for your hackathon team. Free credits, no credit card.</p>
          <VideoEmbed id={HACKATHON_VIDEO} label="Hackathon walkthrough, 90 sec" className="enter d2" />
        </div>
      </section>

      <section className="section" id="pick">
        <div className="container">
          <div className="section-head enter">
            <h2>Pick how you want to build.</h2>
            <p>One choice. Credits are issued on the next step, and you land on a page built for the tool you picked.</p>
          </div>
          <HackathonChooser selected={path} onSelect={select} />
          <div className="continue enter d5">
            <Btn primary disabled={!path} onClick={() => navigate(`/hackathon/signup?path=${path}`)}>
              {path ? `Continue with ${PATHS[path].title} →` : 'Pick a path to continue'}
            </Btn>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head enter">
            <h2>How it works.</h2>
          </div>
          <div className="how">
            <div className="enter d1"><p className="n">01</p><h3>Pick a path</h3><p>Studio, R-CLI or the Unified API. You can change it later in Settings.</p></div>
            <div className="enter d2"><p className="n">02</p><h3>Sign up with your promo code</h3><p>Name, email, school or company, teammates. The promo code from your organizer issues the credits instantly.</p></div>
            <div className="enter d3"><p className="n">03</p><h3>Start building</h3><p>Download Studio, install R-CLI, or connect Claude Code, Cursor or VS Code. Then submit your project from the same page.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head enter">
            <h2>What you get with each path.</h2>
          </div>
          <div className="columns-3">
            {PATH_ORDER.map((k, i) => (
              <div key={k} className={`enter d${i + 1}`}>
                <h3>{PATHS[k].title}</h3>
                <p>{PATHS[k].column}</p>
                <a href="#" className="more" onClick={(e) => e.preventDefault()}>Watch the {PATHS[k].title} walkthrough →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
