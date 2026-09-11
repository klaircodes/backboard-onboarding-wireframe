import { Btn } from './Wire.jsx'

// OS-detected primary download; other platforms as text links (slide 8).
function detect() {
  const ua = navigator.userAgent || ''
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Mac/i.test(ua)) return 'macOS (Apple Silicon)'
  if (/Linux/i.test(ua)) return 'Linux'
  return 'macOS (Apple Silicon)'
}

const ALL = ['macOS (Apple Silicon)', 'macOS Intel', 'Windows', 'Linux']

export default function DownloadButtons({ onPrimary }) {
  const primary = detect()
  const others = ALL.filter((p) => p !== primary)
  return (
    <div className="stack">
      <Btn primary onClick={() => onPrimary(primary)} style={{ alignSelf: 'flex-start' }}>
        Download for {primary}
      </Btn>
      <p className="small muted">
        Also:{' '}
        {others.map((p, i) => (
          <span key={p}>
            <button className="link" onClick={() => onPrimary(p)}>
              {p}
            </button>
            {i < others.length - 1 ? ' · ' : ''}
          </span>
        ))}
        {' · '}Studio opens already signed in
      </p>
    </div>
  )
}
