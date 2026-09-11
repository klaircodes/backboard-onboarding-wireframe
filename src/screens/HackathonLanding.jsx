import { useEffect, useRef } from 'react'
import { Page, Btn } from '../components/Wire.jsx'
import { HackathonChooser } from '../components/PathChooser.jsx'
import ClaimForm from '../components/ClaimForm.jsx'
import VideoEmbed from '../components/VideoEmbed.jsx'
import { FAQ, HACKATHON_VIDEO } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { track } from '../lib/track.js'

// One page: hero → pick a path → the sign-up opens right there → how it works → FAQ.
export default function HackathonLanding() {
  const [path, setPath] = usePathParam()
  const claimRef = useRef(null)

  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }

  // When a path is chosen, bring the form into view.
  useEffect(() => {
    if (path && claimRef.current) {
      const t = setTimeout(() => claimRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      return () => clearTimeout(t)
    }
  }, [path])

  return (
    <Page>
      <section className="hero2">
        <div className="container">
          <div>
            <h1 className="enter">Ship something real this weekend.</h1>
            <p className="lede enter d1">
              Backboard for hackathon teams: persistent memory, 17,000+ models, RAG and threads, in the desktop app,
              the terminal, or behind one API key. Your organizer's code covers the cost. Pick a path and you're
              building in minutes.
            </p>
            <div className="cta-row enter d2">
              <a href="#pick" className="btn primary" style={{ textDecoration: 'none' }}>Start building</a>
              <a href="#video" className="btn" style={{ textDecoration: 'none' }}>Watch the 90-sec walkthrough</a>
            </div>
            <div className="proof enter d3">
              <div><div className="n">#1</div><div className="l">on LoCoMo and LongMemEval, the two memory benchmarks</div></div>
              <div><div className="n">84.3%</div><div className="l">on Terminal Bench 2.1 with R-CLI</div></div>
              <div><div className="n">17,000+</div><div className="l">models behind one key</div></div>
            </div>
          </div>
          <div id="video">
            <VideoEmbed id={HACKATHON_VIDEO} label="Hackathon walkthrough, 90 sec" className="enter d2" />
          </div>
        </div>
      </section>

      <section className="section" id="pick">
        <div className="container">
          <div className="pick-head enter">
            <div>
              <h2>How do you want to build?</h2>
              <p>Pick the one that matches how you already work. You can switch later.</p>
            </div>
            {!path ? (
              <Btn onClick={() => select('api')}>Not sure? Take the API</Btn>
            ) : (
              <button className="link small" onClick={() => setPath(null)}>Clear choice</button>
            )}
          </div>
          <HackathonChooser selected={path} onSelect={select} />
          <div ref={claimRef} style={{ scrollMarginTop: 90 }}>
            {path ? <ClaimForm key={path} path={path} /> : null}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head enter">
            <h2>Three steps, no waiting.</h2>
          </div>
          <div className="how">
            <div className="enter d1"><p className="n">01</p><h3>Pick a path</h3><p>Studio for an app, R-CLI for the terminal, the API for the editor you already use.</p></div>
            <div className="enter d2"><p className="n">02</p><h3>Enter your promo code</h3><p>Name, email, school and teammates. The code from your organizer covers everyone you add, instantly.</p></div>
            <div className="enter d3"><p className="n">03</p><h3>Start building</h3><p>You land on a page built for your path, with a checklist that gets you to a first result. Submit from the same page.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><div style={{ maxWidth: 760 }}>
          <div className="section-head enter"><h2>Questions teams ask.</h2></div>
          <div className="faq enter d1">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="a">{f.a}</p>
              </details>
            ))}
          </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
