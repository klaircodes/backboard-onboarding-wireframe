import { useNavigate } from 'react-router-dom'
import { Split, Btn, OptionRow, Icons, PathIllo } from '../components/Wizard.jsx'
import { PATHS, PATH_ORDER } from '../data/paths.js'
import { usePathParam } from '../lib/usePath.js'
import { setDraft } from '../lib/draft.js'
import { track } from '../lib/track.js'

// Step 1: one question. The panel on the right previews whatever is selected.
export default function HackathonLanding() {
  const navigate = useNavigate()
  const [path, setPath] = usePathParam()

  const select = (next) => {
    setPath(next)
    track('path_selected', { path: next, source: 'click', hackathon: true })
  }
  const go = (chosen) => {
    setDraft({ path: chosen })
    navigate('/hackathon/team')
  }

  return (
    <Split
      step={1}
      title="How do you want to build this weekend?"
      sub="Pick the one closest to how you already work. You can switch later."
      aside={<PathIllo path={path} />}
      footer={
        <>
          <Btn primary full disabled={!path} onClick={() => go(path)}>Continue</Btn>
          <button type="button" className="link" onClick={() => { select('api'); go('api') }}>Not sure? Start with the API</button>
        </>
      }
    >
      <div role="radiogroup" aria-label="Path" className="wz-controls">
        {PATH_ORDER.map((k) => (
          <OptionRow
            key={k}
            icon={Icons[k]}
            title={PATHS[k].title}
            sub={`${PATHS[k].tagline} ${PATHS[k].setup} setup.`}
            selected={path === k}
            onSelect={() => select(k)}
          />
        ))}
      </div>
    </Split>
  )
}
