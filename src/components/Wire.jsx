import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearAccount, getAccount } from '../lib/track.js'

// Screen frame: top bar with the route, main column, notes panel with spec bullets + live event log.
export function Screen({ route, title, notes = [], children }) {
  return (
    <>
      <div className="wire-bar">
        <Link to="/">← Flow map</Link>
        <span className="route">{route}</span>
        <span>{title}</span>
        <span className="spacer" />
        <AccountBadge />
      </div>
      <div className="screen">
        <main>{children}</main>
        <aside>
          <Notes notes={notes} />
        </aside>
      </div>
    </>
  )
}

function AccountBadge() {
  const [account, setAccount] = useState(getAccount())
  useEffect(() => {
    const sync = () => setAccount(getAccount())
    window.addEventListener('bb:account', sync)
    return () => window.removeEventListener('bb:account', sync)
  }, [])
  if (!account) return <span className="muted">no account yet</span>
  return (
    <span className="row small">
      <span>
        account · path_selected = <span className="mono">{account.path}</span>
        {account.hackathon ? ' · hackathon' : ''}
        {account.activated ? ' · activated' : ''}
      </span>
      <button className="link" onClick={() => clearAccount()}>reset</button>
    </span>
  )
}

export function Notes({ notes }) {
  const [events, setEvents] = useState(window.__events || [])
  useEffect(() => {
    const sync = () => setEvents([...(window.__events || [])])
    window.addEventListener('bb:track', sync)
    window.addEventListener('bb:account', sync)
    return () => {
      window.removeEventListener('bb:track', sync)
      window.removeEventListener('bb:account', sync)
    }
  }, [])
  return (
    <div className="notes">
      <h4>Spec notes</h4>
      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      <h4>Events fired (this session)</h4>
      {events.length === 0 ? (
        <p className="muted">none yet</p>
      ) : (
        <ul className="events">
          {events
            .slice()
            .reverse()
            .map((e, i) => (
              <li key={i}>
                {e.event}
                {Object.keys(e)
                  .filter((k) => k !== 'event' && k !== 'at')
                  .map((k) => ` ${k}=${String(e[k])}`)
                  .join('')}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

// Dashed placeholder for images, video, icons, screenshots.
export function Box({ label, h = 120, w, style, className = '' }) {
  return (
    <div className={`box ${className}`} style={{ height: h, width: w, ...style }}>
      {label}
    </div>
  )
}

export function Btn({ primary, full, small, ghost, className = '', ...rest }) {
  const cls = ['btn', primary && 'primary', full && 'full', small && 'small', ghost && 'ghost', className]
    .filter(Boolean)
    .join(' ')
  return <button className={cls} {...rest} />
}

export function Field({ label, required, ...rest }) {
  return (
    <div className="field">
      <label>
        {label} {required ? <span className="req">(required)</span> : null}
      </label>
      <input {...rest} />
    </div>
  )
}
