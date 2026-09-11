import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { track, updateAccount } from '../lib/track.js'
import DownloadButtons from './DownloadButtons.jsx'
import CommandBlock from './CommandBlock.jsx'
import HarnessButtons from './HarnessButtons.jsx'
import VideoEmbed from './VideoEmbed.jsx'
import { Btn } from './Wire.jsx'

// Shared body of /start/{path} and /hackathon/start/{path}. The "win" per path, then the video.
// The grey "Simulate" button stands in for the real activation signal (Studio sign-in, device-flow
// approval, MCP handshake) so the flow can be walked end to end in the wireframe.
export default function StartBody({ path, hackathon = false, hideSkip = false }) {
  const navigate = useNavigate()
  const p = PATHS[path]

  const cta = (detail) => track('start_cta_clicked', { path, hackathon, detail })
  const activate = () => {
    track(p.activation, { path, hackathon })
    updateAccount({ activated: true })
    navigate('/dashboard')
  }

  return (
    <div className="start stack" style={{ gap: 24 }}>
      {path === 'studio' ? (
        <>
          <div>
            <h1>Get Backboard Studio</h1>
            <p className="lede">Your account is already signed in. Open Studio and you are live.</p>
          </div>
          <DownloadButtons onPrimary={(platform) => cta(platform)} />
          <p className="small muted">Next: open Studio, sign in, start your project</p>
        </>
      ) : null}

      {path === 'rcli' ? (
        <>
          <div>
            <h1>Install Backboard R-CLI</h1>
            <p className="lede">Three commands. Copy each one.</p>
          </div>
          <CommandBlock onCopy={(cmd) => cta(cmd)} />
        </>
      ) : null}

      {path === 'api' ? (
        <>
          <div>
            <h1>Connect your coding harness</h1>
            <p className="lede">Same key, same memory, same 17,000+ models, inside the tool you open every day.</p>
          </div>
          <HarnessButtons onConnect={(h) => cta(h)} />
        </>
      ) : null}

      <VideoEmbed id={p.video} label={`${p.title} walkthrough, 90 sec`} />

      <div className="row small">
        <a href="#" onClick={(e) => e.preventDefault()}>Read the docs</a>
        {hideSkip ? null : (
          <>
            <span className="muted">·</span>
            <button className="link" onClick={() => navigate('/dashboard')}>Skip, go to dashboard</button>
          </>
        )}
      </div>

      <div className="card row small" style={{ borderStyle: 'dashed' }}>
        <span className="muted">Wireframe only — stands in for the real signal:</span>
        <Btn small ghost onClick={activate}>Simulate {p.activation}</Btn>
      </div>
    </div>
  )
}
