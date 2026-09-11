import { Link, useLocation } from 'react-router-dom'

// Site shell: sticky nav, page content, footer.
export function Page({ children, narrow = false }) {
  return (
    <div className="page">
      <Nav />
      <main className="site">{narrow ? <section className="section"><div className="container narrow">{children}</div></section> : children}</main>
      <Footer />
    </div>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const onLanding = pathname === '/hackathon'
  return (
    <header className="nav">
      <Logo />
      <nav className="links">
        <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Pricing</a>
        <Link to="/signin">Sign in</Link>
        {onLanding ? <a href="#pick" className="btn small primary" style={{ textDecoration: 'none' }}>Get free credits</a> : <span className="tag">Hackathon access</span>}
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="stack" style={{ gap: 10 }}>
          <Logo />
          <span className="copy">Memory, 17,000+ models, RAG and threads behind one key.</span>
        </div>
        <div className="links">
          <a href="#" onClick={(e) => e.preventDefault()}>Submit a project</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Judging criteria</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Mentor channel</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Docs</a>
        </div>
      </div>
    </footer>
  )
}

export function Logo() {
  return (
    <Link to="/hackathon" className="logo">
      <span className="mark" aria-hidden="true">
        <i style={{ height: 6 }} /><i style={{ height: 14 }} /><i style={{ height: 16 }} /><i style={{ height: 9 }} />
      </span>
      backboard.io
    </Link>
  )
}

export function StepBar({ current }) {
  const steps = ['Pick a path', 'Sign up', 'Start building']
  return (
    <div className="stepbar enter">
      {steps.map((label, i) => {
        const n = i + 1
        const cls = n < current ? 'done' : n === current ? 'on' : ''
        return (
          <div key={label} className={`step ${cls}`}>
            <span className="fill" />
            <b>{n}</b>{label}
          </div>
        )
      })}
    </div>
  )
}

export function Btn({ primary, full, small, chip, className = '', ...rest }) {
  const cls = ['btn', primary && 'primary', full && 'full', small && 'small', chip && 'chip', className].filter(Boolean).join(' ')
  return <button type="button" className={cls} {...rest} />
}

export function Field({ className = '', label, hint, ...rest }) {
  return (
    <div className="field">
      {label ? <label>{label}</label> : null}
      <input className={className} {...rest} />
      {hint ? <p className="hint">{hint}</p> : null}
    </div>
  )
}

export function Thumb({ size, className = '', style }) {
  const dims = size ? { width: size, height: size } : {}
  return <div className={`thumb ${className}`} style={{ ...dims, ...style }} aria-hidden="true" />
}

export function Check() {
  return (
    <span className="check" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  )
}
