// Below the win on every hackathon start page. URLs are placeholders until provided.
const LINKS = ['Submit your project', 'Judging criteria', 'Mentor channel', 'Docs']

export default function HackathonLinks() {
  return (
    <div style={{ marginTop: 24 }}>
      <p className="mono muted" style={{ marginBottom: 10 }}>Hackathon</p>
      <div className="links" style={{ fontSize: 16 }}>
        {LINKS.map((l, i) => (
          <span key={l} className="row" style={{ gap: 10 }}>
            <a href="#" className="accent" onClick={(e) => e.preventDefault()}>{l}</a>
            {i < LINKS.length - 1 ? <span className="muted">·</span> : null}
          </span>
        ))}
      </div>
    </div>
  )
}
