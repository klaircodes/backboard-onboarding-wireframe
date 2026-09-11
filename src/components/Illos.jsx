// Product mock-ups used as placeholder imagery, drawn in the app's own dark palette. Pure SVG, scale to their container.
// The card shots fill their frame edge to edge, so the tile needs no background of its own.
const UI = '"Manrope", -apple-system, Helvetica, Arial, sans-serif'
const MONO = '"Geist Mono", ui-monospace, Menlo, monospace'
const G = {
  base: '#05070b', s1: '#101116', s2: '#14161c', s3: '#1a1c23',
  line: 'rgba(255,255,255,0.10)', line2: 'rgba(255,255,255,0.16)',
  bar: '#2b3140', bar2: '#3b4353',
  ink: '#f8fafc', ink2: '#cbd5e1', mid: '#8b97a8',
  teal: '#0b556b', cyan: '#38bdf8',
}

function Frame({ vb, children, className = '' }) {
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMid slice" className={`shot ${className}`} aria-hidden="true">
      {children}
    </svg>
  )
}

function Chrome({ x, y, w, h, title, dark = false, r = 12 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={G.base} stroke={G.line2} strokeWidth="1.5" />
      <line x1={x} y1={y + 36} x2={x + w} y2={y + 36} stroke={G.line} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => <circle key={i} cx={x + 18 + i * 14} cy={y + 18} r="4" fill={G.bar2} />)}
      {title ? <text x={x + w / 2} y={y + 22} textAnchor="middle" fontFamily={UI} fontSize="12" fill={G.mid}>{title}</text> : null}
    </g>
  )
}

const Bar = ({ x, y, w, h = 8, fill = G.bar }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />

export function StudioShot() {
  return (
    <Frame vb="0 0 640 400">
      <rect width="640" height="400" fill={G.s2} />
      <Chrome x={1} y={1} w={638} h={398} r={18} title="Backboard Studio" />
      {/* sidebar */}
      <line x1="170" y1="37" x2="170" y2="400" stroke={G.line} strokeWidth="1.5" />
      <rect x="34" y="70" width="122" height="26" rx="6" fill={G.s3} />
      <Bar x={46} y={79} w={70} fill={G.ink} />
      {[110, 136, 162, 188].map((y, i) => <Bar key={y} x={46} y={y} w={[84, 64, 96, 56][i]} fill={G.bar2} />)}
      <text x="46" y="240" fontFamily={UI} fontSize="11" fill={G.mid}>Memory</text>
      {[254, 276, 298].map((y, i) => <Bar key={y} x={46} y={y} w={[92, 70, 80][i]} />)}
      {/* thread */}
      <text x="192" y="78" fontFamily={UI} fontSize="13" fill={G.ink} fontWeight="600">hackathon-agent</text>
      <rect x="360" y="96" width="240" height="44" rx="10" fill={G.teal} />
      <Bar x={376} y={110} w={180} fill="rgba(255,255,255,0.85)" />
      <Bar x={376} y={124} w={120} fill="rgba(255,255,255,0.45)" />
      <rect x="192" y="156" width="330" height="88" rx="10" fill={G.s1} stroke={G.line} strokeWidth="1.5" />
      {[172, 190, 208, 226].map((y, i) => <Bar key={y} x={208} y={y} w={[290, 260, 280, 170][i]} fill={G.bar2} />)}
      <rect x="192" y="256" width="150" height="20" rx="10" fill={G.s3} />
      <circle cx="206" cy="266" r="3.5" fill={G.cyan} />
      <text x="216" y="270" fontFamily={UI} fontSize="10.5" fill={G.ink2}>3 memories used</text>
      {/* composer */}
      <rect x="192" y="330" width="408" height="50" rx="12" fill={G.s1} stroke={G.line2} strokeWidth="1.5" />
      <Bar x={210} y={351} w={200} fill={G.bar2} />
      <rect x="552" y="339" width="36" height="32" rx="8" fill={G.teal} />
      <path d="M565 355h10M571 350l4 5-4 5" stroke={G.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

export function TerminalShot() {
  const lines = [
    ['$ curl -fsSL https://app.backboard.io/api/cli | bash', G.ink],
    ['installed backboard 1.4.2', G.mid],
    ['$ backboard login', G.ink],
    ['open app.backboard.io/device   code 8F2K-QT', G.mid],
    ['✓ signed in as you@school.edu', G.cyan],
    ['$ backboard run agent.py', G.ink],
    ['> thinking with gpt-5 · memory on', G.mid],
  ]
  return (
    <Frame vb="0 0 640 400">
      <rect width="640" height="400" fill={G.s2} />
      <Chrome x={1} y={1} w={638} h={398} r={18} title="terminal" dark />
      {lines.map(([t, c], i) => <text key={i} x="44" y={82 + i * 30} fontFamily={MONO} fontSize="13" fill={c}>{t}</text>)}
      <rect x="44" y="294" width="9" height="16" fill={G.ink} className="blink" />
    </Frame>
  )
}

export function EditorShot() {
  return (
    <Frame vb="0 0 640 400">
      <rect width="640" height="400" fill={G.s2} />
      <Chrome x={1} y={1} w={638} h={398} r={18} />
      {/* tabs */}
      <rect x="1" y="37" width="638" height="30" fill={G.s1} />
      <rect x="20" y="37" width="110" height="30" fill={G.base} />
      <text x="36" y="56" fontFamily={MONO} fontSize="11" fill={G.ink}>agent.py</text>
      <text x="150" y="56" fontFamily={MONO} fontSize="11" fill={G.mid}>.env</text>
      <text x="196" y="56" fontFamily={MONO} fontSize="11" fill={G.mid}>README.md</text>
      {/* gutter + code */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <text key={i} x="40" y={110 + i * 24} fontFamily={MONO} fontSize="11" fill={G.bar2}>{i + 1}</text>)}
      {[[70, 150], [70, 220], [86, 90], [0, 0], [70, 260], [86, 170], [86, 120], [70, 40]].map(([x, w], i) =>
        w ? <Bar key={i} x={x} y={103 + i * 24} w={w} fill={G.bar2} /> : null)}
      <rect x="62" y="170" width="380" height="20" rx="4" fill={G.s3} />
      <rect x="62" y="170" width="2" height="20" fill={G.cyan} />
      <text x="72" y="184" fontFamily={MONO} fontSize="11.5" fill={G.ink}>BACKBOARD_API_KEY = "bb_live_••••••••••••"</text>
      {/* connected editors */}
      <line x1="1" y1="316" x2="639" y2="316" stroke={G.line} strokeWidth="1.5" />
      {[['Claude Code', true], ['Cursor', false], ['VS Code', false]].map(([n, on], i) => (
        <g key={n}>
          <rect x={40 + i * 190} y="334" width="170" height="40" rx="6" fill={on ? G.teal : G.s1} stroke={on ? G.teal : G.line2} strokeWidth="1.5" />
          <text x={125 + i * 190} y="359" textAnchor="middle" fontFamily={UI} fontSize="12" fill={on ? G.ink : G.ink2}>{on ? `${n}  ·  connected` : n}</text>
        </g>
      ))}
    </Frame>
  )
}

// Wide still for the hackathon walkthrough video: Studio in front, terminal peeking behind.
export function HeroStill() {
  return (
    <Frame vb="0 0 1200 560">
      <rect width="1200" height="560" fill={G.s2} />
      {/* terminal behind */}
      <g transform="translate(700 150)">
        <Chrome x={0} y={0} w={440} h={300} title="terminal" dark />
        {['$ backboard login', 'open app.backboard.io/device', 'code 8F2K-QT', '✓ signed in', '$ backboard run agent.py'].map((t, i) => (
          <text key={i} x="24" y={66 + i * 32} fontFamily={MONO} fontSize="14" fill={i === 3 ? G.cyan : i % 2 ? G.mid : G.ink}>{t}</text>
        ))}
      </g>
      {/* studio in front */}
      <g transform="translate(120 70)">
        <rect x="10" y="18" width="740" height="460" rx="14" fill="#000" opacity="0.55" />
        <Chrome x={0} y={0} w={740} h={460} title="Backboard Studio" r={14} />
        <line x1="190" y1="36" x2="190" y2="460" stroke={G.line} strokeWidth="1.5" />
        <rect x="18" y="56" width="154" height="30" rx="7" fill={G.s3} />
        <Bar x={32} y={67} w={80} fill={G.ink} />
        {[104, 134, 164, 194].map((y, i) => <Bar key={y} x={32} y={y} w={[110, 80, 120, 70][i]} fill={G.bar2} h={9} />)}
        <text x="32" y="250" fontFamily={UI} fontSize="12" fill={G.mid}>Memory</text>
        {[266, 292, 318].map((y, i) => <Bar key={y} x={32} y={y} w={[120, 90, 104][i]} h={9} />)}
        <text x="216" y="80" fontFamily={UI} fontSize="15" fill={G.ink} fontWeight="600">hackathon-agent</text>
        <rect x="430" y="104" width="290" height="52" rx="12" fill={G.teal} />
        <Bar x={450} y={120} w={220} h={9} fill="rgba(255,255,255,0.85)" />
        <Bar x={450} y={137} w={140} h={9} fill="rgba(255,255,255,0.45)" />
        <rect x="216" y="176" width="420" height="110" rx="12" fill={G.s2} stroke={G.line} strokeWidth="1.5" />
        {[196, 218, 240, 262].map((y, i) => <Bar key={y} x={234} y={y} w={[370, 330, 350, 210][i]} h={9} fill={G.bar2} />)}
        <rect x="216" y="300" width="190" height="24" rx="12" fill={G.s3} />
        <circle cx="232" cy="312" r="4" fill={G.cyan} />
        <text x="244" y="316" fontFamily={UI} fontSize="12" fill={G.ink2}>3 memories used</text>
        <rect x="216" y="380" width="504" height="58" rx="14" fill={G.s1} stroke={G.line2} strokeWidth="1.5" />
        <Bar x={238} y={405} w={240} h={9} fill={G.bar2} />
        <rect x="664" y="391" width="42" height="36" rx="9" fill={G.teal} />
        <path d="M679 409h12M686 403l6 6-6 6" stroke={G.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* floating chip */}
      <g transform="translate(900 60)">
        <rect x="0" y="0" width="230" height="56" rx="12" fill={G.s1} stroke={G.line2} strokeWidth="1.5" />
        <circle cx="26" cy="28" r="8" fill={G.cyan} />
        <text x="46" y="24" fontFamily={UI} fontSize="13" fill={G.ink} fontWeight="600">Memory on</text>
        <text x="46" y="42" fontFamily={UI} fontSize="12" fill={G.mid}>3 documents indexed</text>
      </g>
    </Frame>
  )
}

export const SHOTS = { studio: StudioShot, rcli: TerminalShot, api: EditorShot }
