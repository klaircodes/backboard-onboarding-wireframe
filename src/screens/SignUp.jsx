import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Screen } from '../components/Wire.jsx'
import PathChooser from '../components/PathChooser.jsx'
import AuthBlock from '../components/AuthBlock.jsx'
import { usePathParam } from '../lib/usePath.js'
import { saveAccount, track } from '../lib/track.js'

const NOTES = [
  'One screen: pick a path, then authenticate. No other questions.',
  'Arrived with ?path= → that card is pre-selected and the button label follows the path (source=url).',
  'No path in URL → nothing selected, button reads "Sign up" and is disabled until a card is picked.',
  '"Not sure?" selects Unified API (source=default).',
  'path_selected is written at account creation. It drives the start-page redirect, sidebar default, customer.io E1 branch and the activation metric.',
  'Card images are 1:1 crops of the real product. Optional 3s silent loop on hover.',
]

export default function SignUp() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()
  const [source, setSource] = useState(path ? 'url' : null)

  useEffect(() => {
    if (path && source === 'url') track('path_selected', { path, source: 'url' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const select = (next, how = 'click') => {
    setPath(next)
    setSource(how)
    track('path_selected', { path: next, source: how })
  }

  const complete = (provider) => {
    saveAccount({ path, hackathon: false, provider, activated: false })
    track('signup_completed', { path, hackathon: false, provider })
    navigate(`/start/${path}`)
  }

  return (
    <Screen route={path ? `/signup?path=${path}` : '/signup'} title="Sign-up page" notes={NOTES}>
      <div className="split">
        <div>
          <h1>What are you here for?</h1>
          <p className="lede">Pick one. You can change it later in Settings.</p>
          <PathChooser selected={path} onSelect={select} notSure />
        </div>
        <AuthBlock path={path} onComplete={complete} />
      </div>
    </Screen>
  )
}
