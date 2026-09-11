import { Link, useNavigate } from 'react-router-dom'

export const STEPS = ['Path', 'Team', 'Code', 'Start']

// Top bar: back, logo, step breadcrumb with a progress line, help.
export function TopBar({ step }) {
  const navigate = useNavigate()
  const back = () => (step === 2 ? navigate('/hackathon') : navigate(-1))
  return (
    <header className="wz-top">
      <div className="wz-top-left">
        {step > 1 && step < 4 ? (
          <button type="button" className="wz-back" onClick={back} aria-label="Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ) : null}
        <Link to="/hackathon" className="wz-logo">
          <span className="mark" aria-hidden="true"><i style={{ height: 6 }} /><i style={{ height: 14 }} /><i style={{ height: 16 }} /><i style={{ height: 9 }} /></span>
          backboard
        </Link>
        <span className="domain">app.backboard.io</span>
      </div>
      <nav className="wz-steps" aria-label="Progress">
        {STEPS.map((s, i) => {
          const n = i + 1
          const cls = n < step ? 'done' : n === step ? 'on' : ''
          return (
            <span key={s} className="wz-step-wrap">
              <span className={`wz-step ${cls}`}>{s}</span>
              {i < STEPS.length - 1 ? <span className="wz-sep" aria-hidden="true">›</span> : null}
            </span>
          )
        })}
      </nav>
      <div className="wz-top-right">
        <a href="#" onClick={(e) => e.preventDefault()}>Help</a>
      </div>
      <span className="wz-progress" style={{ transform: `scaleX(${step / STEPS.length})` }} aria-hidden="true" />
    </header>
  )
}

// Split layout: content column (question, controls, Continue pinned at the bottom) and a panel for the illustration.
export function SplitBody({ title, sub, children, footer, aside, animKey }) {
  return (
    <div className="wz-body">
      <section className="wz-main" key={animKey}>
        <div className="wz-content">
          <h1>{title}</h1>
          {sub ? <p className="wz-sub">{sub}</p> : null}
          <div className="wz-controls">{children}</div>
        </div>
        <div className="wz-footer">{footer}</div>
      </section>
      <aside className="wz-aside" aria-hidden="true">{aside}</aside>
    </div>
  )
}

export function Split({ step, ...rest }) {
  return (
    <div className="wz">
      <TopBar step={step} />
      <SplitBody animKey={step} {...rest} />
    </div>
  )
}

export function Btn({ primary, full, className = '', ...rest }) {
  const cls = ['btn', primary && 'primary', full && 'full', className].filter(Boolean).join(' ')
  return <button type="button" className={cls} {...rest} />
}

export function Field({ label, hint, className = '', ...rest }) {
  return (
    <label className="field">
      {label ? <span className="field-label">{label}</span> : null}
      <input className={className} {...rest} />
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  )
}

// Buffer-style option row: icon box, title + one line, radio on the right.
export function OptionRow({ icon, title, sub, selected, onSelect }) {
  return (
    <button type="button" className={`opt ${selected ? 'selected' : ''}`} onClick={onSelect} role="radio" aria-checked={selected}>
      <span className="opt-icon">{icon}</span>
      <span className="opt-text">
        <span className="opt-title">{title}</span>
        <span className="opt-sub">{sub}</span>
      </span>
      <span className="opt-radio" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  )
}

/* Small line icons for the option rows ------------------------------ */
const ico = { width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const Icons = {
  studio: <svg {...ico}><rect x="2" y="3" width="14" height="11" rx="1.5" /><path d="M2 6.5h14M6 6.5v7.5" /><path d="M7 16.5h4" /></svg>,
  rcli: <svg {...ico}><rect x="2" y="3" width="14" height="12" rx="1.5" /><path d="m5 7 2.5 2L5 11M9 11h4" /></svg>,
  api: <svg {...ico}><path d="M6 5 2.5 9 6 13M12 5l3.5 4L12 13" /><path d="M10 3.5 8 14.5" /></svg>,
}

/* Illustrations for the right panel --------------------------------- */
const line = { stroke: '#000', strokeWidth: 1.25, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
const soft = { stroke: '#C4C4C4', strokeWidth: 1.25, fill: 'none', strokeLinecap: 'round' }

const SCALE = 1.35
function Window({ children, w = 320, h = 220, title }) {
  return (
    <svg width={w * SCALE} height={h * SCALE} viewBox={`0 0 ${w} ${h}`} className="illo-svg">
      <rect x="0.5" y="0.5" width={w - 1} height={h - 1} rx="10" {...line} fill="#fff" />
      <path d={`M0.5 30 H${w - 0.5}`} {...line} />
      <circle cx="16" cy="15.5" r="3" fill="#000" /><circle cx="28" cy="15.5" r="3" fill="#000" /><circle cx="40" cy="15.5" r="3" fill="#000" />
      {title ? <text x={w / 2} y="19" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, Menlo, monospace" fill="#6B6B6B">{title}</text> : null}
      {children}
    </svg>
  )
}

export function StudioIllo() {
  return (
    <Window title="Backboard Studio">
      <path d="M78 30V219" {...line} />
      {[52, 70, 88, 106].map((y) => <rect key={y} x="14" y={y} width="50" height="6" rx="3" fill={y === 52 ? '#000' : '#DADADA'} />)}
      <rect x="96" y="50" width="150" height="8" rx="4" fill="#000" />
      {[74, 90, 106].map((y) => <rect key={y} x="96" y={y} width={200 - (y - 74)} height="6" rx="3" fill="#DADADA" />)}
      <rect x="96" y="150" width="208" height="48" rx="8" {...line} fill="#fff" />
      <rect x="108" y="166" width="120" height="6" rx="3" fill="#DADADA" />
      <rect x="270" y="160" width="24" height="28" rx="6" fill="#000" />
      <path d="M279 174h6M282 171l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </Window>
  )
}

export function RcliIllo() {
  return (
    <Window title="terminal">
      <text x="18" y="62" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#000">$ curl -fsSL backboard.io/cli | bash</text>
      <text x="18" y="88" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#6B6B6B">installed backboard 1.4.2</text>
      <text x="18" y="118" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#000">$ backboard login</text>
      <text x="18" y="144" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#6B6B6B">open app.backboard.io/device   code 8F2K-QT</text>
      <text x="18" y="170" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#000">✓ signed in as you@school.edu</text>
      <text x="18" y="198" fontSize="11.5" fontFamily="ui-monospace, Menlo, monospace" fill="#000">$</text>
      <rect x="30" y="188" width="8" height="13" fill="#000" className="cursor" />
    </Window>
  )
}

export function ApiIllo() {
  return (
    <Window title="editor">
      <rect x="0.5" y="30" width="320" height="18" fill="#F3F3F3" />
      <text x="14" y="43" fontSize="10.5" fontFamily="ui-monospace, Menlo, monospace" fill="#000">agent.py</text>
      <text x="80" y="43" fontSize="10.5" fontFamily="ui-monospace, Menlo, monospace" fill="#9A9A9A">.env</text>
      {[66, 82, 98, 130, 146].map((y, i) => <rect key={y} x="18" y={y} width={[120, 180, 90, 160, 70][i]} height="6" rx="3" fill="#DADADA" />)}
      <rect x="12" y="108" width="240" height="14" rx="3" fill="#000" />
      <text x="18" y="118.5" fontSize="10.5" fontFamily="ui-monospace, Menlo, monospace" fill="#fff">BACKBOARD_API_KEY = "bb_live_••••••••"</text>
      <g fontSize="10" fontFamily="-apple-system, Helvetica, sans-serif" fill="#000">
        <rect x="18" y="170" width="86" height="30" rx="6" {...line} fill="#fff" /><text x="61" y="189" textAnchor="middle">Claude Code</text>
        <rect x="116" y="170" width="86" height="30" rx="6" {...soft} fill="#fff" /><text x="159" y="189" textAnchor="middle" fill="#9A9A9A">Cursor</text>
        <rect x="214" y="170" width="86" height="30" rx="6" {...soft} fill="#fff" /><text x="257" y="189" textAnchor="middle" fill="#9A9A9A">VS Code</text>
      </g>
      <path d="M61 122v48M159 122v48M257 122v48" {...soft} strokeDasharray="2 4" />
    </Window>
  )
}

const CAPTION = {
  studio: 'Everything in one window. Sign in once and build.',
  rcli: 'Install, log in, and the harness is ready in your terminal.',
  api: 'Your key is created for you and dropped into the editor you use.',
}

function FloatCard({ children, className = '' }) {
  return <div className={`float-card ${className}`}>{children}</div>
}

export function PathIllo({ path }) {
  return (
    <div className="illo-scene">
      <div className="illo-stack">
        <div className={`illo ${path === 'studio' ? 'show' : ''}`}>
          <StudioIllo />
          <FloatCard className="fc-br">
            <span className="fc-dot" /> <b>Memory on</b><span className="fc-sub">3 documents indexed</span>
          </FloatCard>
        </div>
        <div className={`illo ${path === 'rcli' ? 'show' : ''}`}>
          <RcliIllo />
          <FloatCard className="fc-br">
            <span className="qr" aria-hidden="true" /><b>Device code</b><span className="fc-sub mono">8F2K-QT</span>
          </FloatCard>
        </div>
        <div className={`illo ${path === 'api' ? 'show' : ''}`}>
          <ApiIllo />
          <FloatCard className="fc-br">
            <span className="fc-check" aria-hidden="true">✓</span><b>Connected</b><span className="fc-sub">first thread created</span>
          </FloatCard>
        </div>
        <div className={`illo idle ${!path ? 'show' : ''}`}>
          <div className="illo-fan">
            <div className="fan a"><StudioIllo /></div>
            <div className="fan b"><RcliIllo /></div>
            <div className="fan c"><ApiIllo /></div>
          </div>
        </div>
      </div>
      <p className="illo-cap" key={path || 'idle'}>{path ? CAPTION[path] : 'Pick a path to see what you get.'}</p>
    </div>
  )
}

export function TeamIllo({ count, names = [] }) {
  const shown = Math.min(count, 5)
  return (
    <div className="illo-scene">
      <div className="team-illo">
      <div className="avatars">
        {Array.from({ length: shown }).map((_, i) => (
          <span key={i} className="avatar" style={{ zIndex: 10 - i }}>{(names[i] || '?').slice(0, 1).toUpperCase()}</span>
        ))}
        {count > 5 ? <span className="avatar more">+{count - 5}</span> : null}
      </div>
      </div>
      <p className="illo-cap">{count === 1 ? 'Just you so far. Add teammates and they get their own accounts.' : `Team of ${count}. Everyone gets their own account.`}</p>
    </div>
  )
}

export function CodeIllo({ valid, code }) {
  return (
    <div className="illo-scene">
    <div className={`ticket ${valid ? 'valid' : ''}`}>
      <div className="ticket-top">
        <span className="ticket-label">Hackathon code</span>
        <span className="ticket-code">{code || '— — — —'}</span>
      </div>
      <div className="ticket-cut" />
      <div className="ticket-bottom">
        <span className="ticket-check" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span>{valid ? 'Covers your whole team' : 'Enter the code your organizer gave you'}</span>
      </div>
    </div>
      <p className="illo-cap">{valid ? 'Looks good. Create the account and you are in.' : 'One code per team. No card, nothing to cancel.'}</p>
    </div>
  )
}
