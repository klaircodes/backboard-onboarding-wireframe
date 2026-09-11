// Embedded walkthrough placeholder (slide 18). Real build: youtube-nocookie iframe, autoplay muted, captions on.
export default function VideoEmbed({ id, label = 'Embedded walkthrough, 90 sec', h = 170, play = false, className = '' }) {
  return (
    <div className={`video ${className}`} style={{ height: h }}>
      {play ? <div className="play" aria-hidden="true" /> : null}
      <span className="mono">{label} · youtu.be/{id}</span>
    </div>
  )
}
