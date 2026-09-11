import { useNavigate } from 'react-router-dom'
import { Nav, Footer } from '../components/Wire.jsx'
import { SplitBody, Btn, OptionRow, Icons, PathIllo } from '../components/Wizard.jsx'
import { FAQ, HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { track } from '../lib/track.js'

// backboard.io/hackathon: the information page. The path pick sits above the fold and hands off to the app.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()

  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  // Real build: window.location = `https://app.backboard.io/hackathon/team?path=${chosen}`
  const handoff = (chosen) => navigate(`/hackathon/team?path=${chosen}`)

  return (
    <div className="page">
      <Nav />
      <main className="site">
        <SplitBody
          animKey="site"
          title="Build with Backboard this weekend."
          sub="Persistent memory, 17,000+ models, RAG and threads for your hackathon team. Pick how you want to build and sign up in a minute."
          aside={<PathIllo path={path} />}
          footer={
            <>
              <Btn primary full disabled={!path} onClick={() => handoff(path)}>{path ? `Sign up with ${PATHS[path].title}` : 'Sign up'}</Btn>
              <span className="hint">Continues on app.backboard.io. Not sure? <button type="button" className="link" onClick={() => { select('api'); handoff('api') }}>Start with the API</button></span>
            </>
          }
        >
          <div role="radiogroup" aria-label="Path" className="wz-controls">
            {PATH_ORDER.map((k) => (
              <OptionRow key={k} icon={Icons[k]} title={PATHS[k].title} sub={`${PATHS[k].tagline} ${PATHS[k].setup} setup.`} selected={path === k} onSelect={() => select(k)} />
            ))}
          </div>
        </SplitBody>

        <section className="section info" id="watch">
          <div className="container info-grid">
            <div>
              <h2>What you get</h2>
              <p className="text-2">One hackathon code covers your whole team. No card, nothing to cancel afterwards. Every path gives you the same Backboard underneath: memory that persists across sessions, 17,000+ models behind one key, retrieval over your own documents, and threads your agents can share.</p>
            </div>
            <div className="video"><div className="play" role="button" aria-label="Play" /><span className="small">Hackathon walkthrough, 90 sec</span></div>
          </div>
        </section>

        <section className="section info">
          <div className="container">
            <h2>Three ways in</h2>
            <div className="ways">
              {PATH_ORDER.map((k) => (
                <div key={k} className="way">
                  <span className="opt-icon">{Icons[k]}</span>
                  <h3>{PATHS[k].title}</h3>
                  <p className="text-2">{PATHS[k].bestIf}</p>
                  <ul>{PATHS[k].youGet.map((g) => <li key={g}>{g}</li>)}</ul>
                  <button type="button" className="link" onClick={() => { select(k); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Pick {PATHS[k].short}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section info">
          <div className="container info-grid">
            <div>
              <h2>How it works</h2>
              <ol className="how-list">
                <li><div><b>Pick a path here.</b><span>Studio, R-CLI or the API. You can switch later in the app.</span></div></li>
                <li><div><b>Sign up on app.backboard.io.</b><span>Your name, school and teammates, then the hackathon code from your organizer.</span></div></li>
                <li><div><b>Start building.</b><span>A short checklist gets you to a first result. Submit from the same page.</span></div></li>
              </ol>
            </div>
            <div>
              <h2>Questions teams ask</h2>
              <div className="faq">
                {FAQ.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p className="a">{f.a}</p></details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
