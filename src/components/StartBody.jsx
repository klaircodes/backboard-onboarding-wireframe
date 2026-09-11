import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { track } from '../lib/track.js'
import DownloadButtons from './DownloadButtons.jsx'
import CommandBlock from './CommandBlock.jsx'
import HarnessButtons from './HarnessButtons.jsx'
import VideoEmbed from './VideoEmbed.jsx'

// Shared body of /start/{path} (slides 8–10) and /hackathon/start/{path} (slides 15–17).
export default function StartBody({ path, hackathon = false }) {
  const navigate = useNavigate()
  const [windows, setWindows] = useState(false)
  const p = PATHS[path]
  const cta = (detail) => track('start_cta_clicked', { path, hackathon, detail })
  const skip = () => navigate('/dashboard')

  if (path === 'studio') {
    return (
      <div className="start">
        <h1>Get Backboard Studio</h1>
        {hackathon ? null : <p className="lede">Your account is already signed in. Open Studio and you are live.</p>}
        <div style={{ marginTop: hackathon ? 20 : 0 }}>
          <DownloadButtons onPick={cta} note={hackathon ? 'Also: macOS Intel · Linux   ·   Studio opens already signed in' : 'Also: macOS Intel · Linux'} />
        </div>
        {hackathon ? <p className="mono muted" style={{ marginTop: 18 }}>Next: open Studio, sign in, start your project</p> : null}
        <VideoEmbed id={p.video} label={hackathon ? 'Embedded walkthrough, 90 sec' : 'Embedded video, 90 sec'} h={170} className="" />
        {hackathon ? null : (
          <p style={{ marginTop: 22 }}><button className="link" onClick={skip}>Skip, go to dashboard</button></p>
        )}
      </div>
    )
  }

  if (path === 'rcli') {
    return (
      <div className="start">
        <h1>Install Backboard R-CLI</h1>
        {hackathon ? null : <p className="lede">Three commands. Copy each one.</p>}
        <div style={{ marginTop: hackathon ? 20 : 0 }}>
          <CommandBlock onCopy={cta} compact={hackathon} windows={windows} />
        </div>
        <div className="links mono" style={{ margin: '16px 0 22px' }}>
          <button onClick={() => setWindows(!windows)}>{windows ? 'macOS / Linux' : 'Windows PowerShell'}</button>
          <span>·</span>
          <button onClick={() => cta('watch')}>Watch 90 sec</button>
          {hackathon ? null : (<><span>·</span><button onClick={skip}>Skip</button></>)}
        </div>
        <VideoEmbed id={p.video} h={170} />
      </div>
    )
  }

  return (
    <div className="start">
      <h1>Connect your coding harness</h1>
      {hackathon ? null : <p className="lede">Same key, same memory, same 17,000+ models, inside the tool you open every day.</p>}
      <div style={{ marginTop: hackathon ? 20 : 0 }}>
        <HarnessButtons onConnect={cta} />
      </div>
      {hackathon ? (
        <p className="mono muted" style={{ marginTop: 14 }}>Key created and injected   ·   Or call it raw: pip install backboard-sdk   ·   npm i backboard-sdk</p>
      ) : (
        <>
          <p className="step-label mono">Or call it raw</p>
          <div className="cmd"><span>pip install backboard-sdk   ·   npm i backboard-sdk</span></div>
          <p className="text-2" style={{ marginTop: 14 }}>Your API key was created and is in the snippet. Python and JavaScript, same as today.</p>
          <div className="links" style={{ margin: '22px 0 22px', fontSize: 16 }}>
            <button onClick={() => cta('watch')}>Watch 90 sec</button><span>·</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Read the docs</a><span>·</span>
            <button onClick={skip}>Skip</button>
          </div>
        </>
      )}
      <VideoEmbed id={p.video} h={170} className={hackathon ? '' : ''} />
    </div>
  )
}
