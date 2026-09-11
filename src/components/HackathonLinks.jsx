const LINKS = ['Submit your project', 'Judging criteria', 'Mentor channel', 'Docs']

export default function HackathonLinks() {
  return (
    <div className="hack-links enter d5">
      <p className="label" style={{ marginBottom: 10 }}>Hackathon</p>
      <div className="links">
        {LINKS.map((l, i) => (
          <span key={l} className="row" style={{ gap: 14 }}>
            <a href="#" onClick={(e) => e.preventDefault()}>{l}</a>
            {i < LINKS.length - 1 ? <span>·</span> : null}
          </span>
        ))}
      </div>
    </div>
  )
}
