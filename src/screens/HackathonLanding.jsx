import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteNav, Video, PathCard } from '../components/Hack.jsx'
import { HACKATHON_VIDEO, PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { track } from '../lib/track.js'

// backboard.io/hackathon. Deck order kept: walkthrough, pick a path, what each one is, footer.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const leaving = useRef(false)
  // Picking a card is the whole step: it selects, then hands off to sign-up on app.backboard.io.
  // Real build: window.location = `https://app.backboard.io/hackathon/signup?path=${next}`
  const select = (next) => {
    if (leaving.current) return
    leaving.current = true
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
    setTimeout(() => navigate(`/hackathon/signup?path=${next}`), 360)
  }

  return (
    <div className="page">
      <SiteNav />
      <main className="wrap">
        <section className="hero">
          <h1>Backboard for your hackathon.</h1>
          <p className="sub">Persistent memory, 17,000+ models, retrieval and threads, free for your team this weekend. Pick how you want to build and you're set up in a minute.</p>
          <Video youtube={HACKATHON_VIDEO} caption="Hackathon walkthrough" className="hero-video" />
        </section>

        <section className="pick" id="pick">
          <div className="sec-head">
            <h2>Pick how you want to build.</h2>
            <p>Credits are issued on the next step. You can switch later.</p>
          </div>
          <div className="cards" role="radiogroup" aria-label="Path" data-pick={path || undefined}>
            {PATH_ORDER.map((k) => <PathCard key={k} path={k} selected={path === k} onSelect={select} />)}
          </div>
          <p className="go hint">Picking one takes you to sign-up on app.backboard.io. Not sure? <button type="button" className="link" onClick={() => select('api')}>Start with the API</button></p>
        </section>

        <section className="cols">
          {PATH_ORDER.map((k) => (
            <div key={k} className="col">
              <h3>{PATHS[k].title}</h3>
              <p className="lead">{PATHS[k].bestIf}</p>
              <p>{PATHS[k].column}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="foot-brand">Backboard</span>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Looking to submit?</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
