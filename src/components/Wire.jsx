import { Link } from 'react-router-dom'

// Page shell matching the deck mockups: logo top-left, one centered panel on a dark background.
export function Page({ children, right, panelClass = '', bare = false }) {
  return (
    <div className="page">
      <div className="page-top">
        <Logo />
        {right ? <span className="mono muted">{right}</span> : null}
      </div>
      <div className="page-body">
        {bare ? children : <div className={`panel ${panelClass}`}>{children}</div>}
      </div>
    </div>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo" title="Screen index">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
        <rect x="0" y="6" width="2" height="6" rx="1" fill="#1b93bb" />
        <rect x="4" y="2" width="2" height="14" rx="1" fill="#1b93bb" />
        <rect x="8" y="0" width="2" height="18" rx="1" fill="#2aa8d2" />
        <rect x="12" y="5" width="2" height="8" rx="1" fill="#1b93bb" />
      </svg>
      backboard.io
    </Link>
  )
}

export function Btn({ primary, full, small, chip, className = '', ...rest }) {
  const cls = ['btn', primary && 'primary', full && 'full', small && 'small', chip && 'chip', className].filter(Boolean).join(' ')
  return <button type="button" className={cls} {...rest} />
}

export function Field({ className = '', ...rest }) {
  return (
    <div className="field">
      <input className={className} {...rest} />
    </div>
  )
}

export function Thumb({ size = 84, className = '' }) {
  return <div className={`thumb ${className}`} style={{ width: size, height: size }} aria-hidden="true" />
}
