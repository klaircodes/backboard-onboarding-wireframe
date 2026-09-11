// Embedded walkthrough placeholder. Real build: youtube-nocookie iframe, autoplay muted, captions on.
export default function VideoEmbed({ id, label = 'Walkthrough, 90 sec', h = 180, className = '' }) {
  return (
    <div className={`video ${className}`} style={{ height: h }}>
      <div className="play" role="button" aria-label="Play" />
      <span className="mono cap">{label} · youtu.be/{id}</span>
    </div>
  )
}
