import { useNavigate } from 'react-router-dom'
import { SiteNav, Btn, Video, PathCard } from '../components/Hack.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { track } from '../lib/track.js'

// backboard.io/hackathon. Deck order kept: walkthrough, pick a path, what each one is, footer.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  // Real build: window.location = `https://app.backboard.io/hackathon/signup?path=${path}`
  const handoff = () => navigate(`/hackathon/signup?path=${path}`)

  return (
    <div className="page">
      <SiteNav />
      <main className="wrap">
        <section className="hero">
          <h1>Build with Backboard this weekend.</h1>
          <p className="sub">Persistent memory, 17,000+ models, retrieval and threads for your hackathon team. Watch the walkthrough, pick how you want to build, and you're set up in a minute.</p>
          <Video caption="Hackathon walkthrough, 90 sec" className="hero-video" />
        </section>

        <section className="pick" id="pick">
          <div className="sec-head">
            <h2>Pick how you want to build.</h2>
            <p>Credits are issued on the next step. You can switch later.</p>
          </div>
          <div className={`cards ${path ? 'has-choice' : ''}`} role="radiogroup" aria-label="Path">
            {PATH_ORDER.map((k) => <PathCard key={k} path={k} selected={path === k} onSelect={select} />)}
          </div>
          <div className="go">
            <Btn primary disabled={!path} onClick={handoff}>{path ? `Continue with ${PATHS[path].title}` : 'Choose a path to continue'}</Btn>
            <span className="hint">Sign-up continues on app.backboard.io. Not sure? <button type="button" className="link" onClick={() => select('api')}>Start with the API</button></span>
          </div>
        </section>

        <section className="cols">
          {PATH_ORDER.map((k) => (
            <div key={k} className="col">
              <h3>{PATHS[k].title}</h3>
              <p className="lead">{PATHS[k].bestIf}</p>
              <p>{PATHS[k].column}</p>
              <a href="#" onClick={(e) => e.preventDefault()}>Watch the {PATHS[k].short} walkthrough</a>
            </div>
          ))}
        </section>
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="logo"><span className="mark" aria-hidden="true"><i style={{ height: 6 }} /><i style={{ height: 14 }} /><i style={{ height: 16 }} /><i style={{ height: 9 }} /></span>backboard</span>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Looking to submit?</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Judging criteria</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Mentor channel</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
