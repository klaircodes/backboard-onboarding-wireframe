import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../data/paths.js'
import { track } from '../lib/track.js'
import DownloadButtons from './DownloadButtons.jsx'
import CommandBlock from './CommandBlock.jsx'
import HarnessButtons from './HarnessButtons.jsx'
import VideoEmbed from './VideoEmbed.jsx'

// Shared body of /start/{path} and /hackathon/start/{path}.
export default function StartBody({ path, hackathon = false }) {
  const navigate = useNavigate()
  const [windows, setWindows] = useState(false)
  const p = PATHS[path]
  const cta = (detail) => track('start_cta_clicked', { path, hackathon, detail })
  const skip = () => navigate('/dashboard')

  if (path === 'studio') {
    return (
      <div className="start">
        <h1 className="enter d1">Get Backboard Studio</h1>
        <p className="lede enter d2">{hackathon ? 'Open it, sign in, start your project. Studio opens already signed in to this account.' : 'Your account is already signed in. Open Studio and you are live.'}</p>
        <div className="enter d3"><DownloadButtons onPick={cta} /></div>
        <VideoEmbed id={p.video} label="Studio walkthrough, 90 sec" h={180} className="enter d4" />
        {hackathon ? null : <p className="enter d5" style={{ marginTop: 22 }}><button className="link" onClick={skip}>Skip, go to dashboard</button></p>}
      </div>
    )
  }

  if (path === 'rcli') {
    return (
      <div className="start">
        <h1 className="enter d1">Install Backboard R-CLI</h1>
        <p className="lede enter d2">Three commands. Copy each one.</p>
        <CommandBlock onCopy={cta} compact={hackathon} windows={windows} />
        <div className="links enter d5" style={{ margin: '18px 0 24px' }}>
          <button onClick={() => setWindows(!windows)}>{windows ? 'Show macOS / Linux' : 'Windows PowerShell'}</button>
          <span>·</span>
          <button onClick={() => cta('watch')}>Watch 90 sec</button>
          {hackathon ? null : (<><span>·</span><button onClick={skip}>Skip</button></>)}
        </div>
        <VideoEmbed id={p.video} label="R-CLI walkthrough, 90 sec" h={180} className="enter d5" />
      </div>
    )
  }

  return (
    <div className="start">
      <h1 className="enter d1">Connect your coding harness</h1>
      <p className="lede enter d2">Same key, same memory, same 17,000+ models, inside the tool you open every day.</p>
      <HarnessButtons onConnect={cta} />
      <p className="step-label mono enter d5">Or call it raw</p>
      <div className="cmd enter d5"><span>pip install backboard-sdk   ·   npm i backboard-sdk</span></div>
      <p className="text-2 enter d5" style={{ marginTop: 14 }}>Your API key was created and is in the snippet. Python and JavaScript, same as today.</p>
      <div className="links enter d6" style={{ margin: '22px 0 24px' }}>
        <button onClick={() => cta('watch')}>Watch 90 sec</button><span>·</span>
        <a href="#" onClick={(e) => e.preventDefault()}>Read the docs</a>
        {hackathon ? null : (<><span>·</span><button onClick={skip}>Skip</button></>)}
      </div>
      <VideoEmbed id={p.video} label="Unified API walkthrough, 90 sec" h={180} className="enter d6" />
    </div>
  )
}
