import { Box } from './Wire.jsx'

// Placeholder for the embedded walkthrough (slide 18): youtube-nocookie, autoplay muted, captions on,
// never navigates away. Real build: <iframe src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&mute=1&cc_load_policy=1">
export default function VideoEmbed({ id, label = 'Walkthrough, 90 sec', h = 260 }) {
  return (
    <Box
      h={h}
      label={`${label} · youtu.be/${id} · embedded, autoplay muted, captions on`}
      style={{ width: '100%' }}
    />
  )
}
