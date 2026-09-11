import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/Wire.jsx'
import { SignupChooser } from '../components/PathChooser.jsx'
import AuthBlock from '../components/AuthBlock.jsx'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

// Slide 5. ?path= pre-selects a card; no path → nothing selected and the button is disabled.
export default function SignUp() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const tracked = useRef(false)

  useEffect(() => {
    if (path && !tracked.current) {
      tracked.current = true
      track('path_selected', { path, source: 'url' })
    }
  }, [path])

  const select = (next, source = 'click') => {
    setPath(next)
    track('path_selected', { path: next, source })
  }

  const complete = (provider) => {
    saveAccount({ path, hackathon: false, provider, activated: false })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }

  return (
    <Page>
      <div className="signup">
        <div>
          <h2>What are you here for?</h2>
          <SignupChooser selected={path} onSelect={select} />
          <p className="text-2" style={{ marginTop: 22 }}>
            Not sure? <button className="link" onClick={() => select('api', 'default')}>Start with the Unified API.</button>
          </p>
        </div>
        <div className="divider-v" />
        <AuthBlock path={path} onComplete={complete} />
      </div>
    </Page>
  )
}
