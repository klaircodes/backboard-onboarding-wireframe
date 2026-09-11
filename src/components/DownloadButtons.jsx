import { Btn } from './Wire.jsx'

// OS-detected primary download, the other desktop OS as a secondary button, the rest as mono text (slide 8).
function detect() {
  const ua = navigator.userAgent || ''
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return 'Linux'
  return 'macOS (Apple Silicon)'
}

export default function DownloadButtons({ onPick, note = 'Also: macOS Intel · Linux' }) {
  const primary = detect()
  const secondary = primary === 'Windows' ? 'macOS (Apple Silicon)' : 'Windows'
  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="grid-2">
        <Btn primary onClick={() => onPick(primary)}>Download for {primary}</Btn>
        <Btn onClick={() => onPick(secondary)}>Download for {secondary}</Btn>
      </div>
      <p className="mono muted">{note}</p>
    </div>
  )
}
