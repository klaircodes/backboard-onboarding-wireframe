import { useNavigate } from 'react-router-dom'
import { SiteNav, Btn, Placeholder, PathCard } from '../components/Hack.jsx'
import { HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { track } from '../lib/track.js'

const LABEL = { studio: 'Studio', rcli: 'R-CLI', api: 'Unified API' }

// backboard.io/hackathon — deck slide 13: video first, pick a path, then what each is.
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
        <Placeholder video label={`Hackathon walkthrough · youtu.be/${HACKATHON_VIDEO}`} className="hero-video" />

        <section className="intro">
          <h1>Build with Backboard this weekend.</h1>
          <p className="sub">Pick how you want to build. Credits are issued on the next step.</p>
        </section>

        <div className="cards" role="radiogroup" aria-label="Path">
          {PATH_ORDER.map((k) => <PathCard key={k} path={k} selected={path === k} onSelect={select} />)}
        </div>

        <div className={`go ${path ? 'ready' : ''}`}>
          <Btn primary disabled={!path} onClick={handoff}>{path ? `Continue with ${PATHS[path].title}` : 'Choose a path to continue'}</Btn>
          <span className="hint">Sign-up continues on app.backboard.io.</span>
        </div>

        <section className="cols">
          {PATH_ORDER.map((k) => (
            <div key={k}>
              <h4>{LABEL[k]}</h4>
              <p>{PATHS[k].column}</p>
              <a href="#" onClick={(e) => e.preventDefault()}>Watch the {LABEL[k]} walkthrough</a>
            </div>
          ))}
        </section>

        <footer className="foot">
          <a href="#" onClick={(e) => e.preventDefault()}>Looking to submit? Click here</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        </footer>
      </main>
    </div>
  )
}
