import { Btn } from './Wire.jsx'

function detect() {
  const ua = navigator.userAgent || ''
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return 'Linux'
  return 'macOS (Apple Silicon)'
}

// OS-detected primary; the other desktop OS as a secondary button; the rest as text.
export default function DownloadButtons({ onPick }) {
  const primary = detect()
  const secondary = primary === 'Windows' ? 'macOS (Apple Silicon)' : 'Windows'
  const rest = ['macOS (Apple Silicon)', 'macOS Intel', 'Windows', 'Linux'].filter((p) => p !== primary && p !== secondary)
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="grid-2">
        <Btn primary onClick={() => onPick(primary)}>Download for {primary}</Btn>
        <Btn onClick={() => onPick(secondary)}>Download for {secondary}</Btn>
      </div>
      <p className="muted small">Also: {rest.join(' · ')}</p>
    </div>
  )
}
