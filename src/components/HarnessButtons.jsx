import { Btn, Box } from './Wire.jsx'

// The three one-click MCP installs that already exist under Integrations (slide 10). Key is created on
// page load and injected; the old snippet modal is collapsed under "Or call it raw".
const HARNESSES = ['Claude Code', 'Cursor', 'VS Code']

export default function HarnessButtons({ onConnect }) {
  return (
    <div className="stack">
      <div className="row">
        {HARNESSES.map((h) => (
          <Btn primary key={h} onClick={() => onConnect(h)}>
            <Box label="icon" h={18} w={18} style={{ padding: 0, borderColor: '#fff', color: '#fff' }} /> {h}
          </Btn>
        ))}
      </div>
      <p className="small muted">Key created and injected · Also: Codex, Windsurf, any MCP client</p>
      <details>
        <summary className="small">Or call it raw</summary>
        <div className="cmd" style={{ marginTop: 8 }}>
          <div className="head"><span>Python / JavaScript</span></div>
          <pre>pip install backboard-sdk   ·   npm i backboard-sdk{'\n'}BACKBOARD_API_KEY=bb_live_•••• (created for you, already in the snippet)</pre>
        </div>
      </details>
    </div>
  )
}
