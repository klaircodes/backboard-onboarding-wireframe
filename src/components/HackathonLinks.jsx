// Below the win on every hackathon start page. URLs are placeholders until provided.
const LINKS = ['Submit your project', 'Judging criteria', 'Mentor channel', 'Docs']

export default function HackathonLinks() {
  return (
    <div className="stack">
      <h3>Hackathon</h3>
      <div className="hack-links">
        {LINKS.map((l) => (
          <a key={l} href="#" onClick={(e) => e.preventDefault()}>
            {l} → <span className="muted">[URL]</span>
          </a>
        ))}
      </div>
    </div>
  )
}
