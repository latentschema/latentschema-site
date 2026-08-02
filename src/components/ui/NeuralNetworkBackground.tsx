const NODES = [
  { x: 80, y: 120 }, { x: 220, y: 60 }, { x: 340, y: 180 }, { x: 150, y: 300 },
  { x: 60, y: 420 }, { x: 240, y: 480 }, { x: 420, y: 80 }, { x: 520, y: 220 },
  { x: 380, y: 380 }, { x: 480, y: 520 }, { x: 620, y: 140 }, { x: 700, y: 320 },
  { x: 780, y: 480 }, { x: 860, y: 200 }, { x: 960, y: 80 }, { x: 1040, y: 260 },
  { x: 1120, y: 420 }, { x: 1000, y: 520 }, { x: 1180, y: 140 }, { x: 1260, y: 300 },
  { x: 1340, y: 460 }, { x: 1220, y: 540 }, { x: 900, y: 600 }, { x: 300, y: 600 },
  { x: 150, y: 560 }, { x: 700, y: 600 },
] as const

const CENTER = { x: 170, y: 380 }

function buildEdges(nodes: readonly { x: number; y: number }[], maxDist: number) {
  const edges: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      if (Math.sqrt(dx * dx + dy * dy) < maxDist) edges.push([i, j])
    }
  }
  return edges
}

const EDGES = buildEdges(NODES, 220)

const CENTER_LINKS = NODES.map((n, i) => ({
  i,
  dist: Math.hypot(n.x - CENTER.x, n.y - CENTER.y),
}))
  .sort((a, b) => a.dist - b.dist)
  .slice(0, 6)
  .map((n) => n.i)

function LogoMarkSymbol() {
  const size = 190
  const diamond = size * 0.62
  const leftX = CENTER.x - size / 2 + diamond / 2
  const rightX = CENTER.x + size / 2 - diamond / 2

  return (
    <g>
      <rect
        x={-diamond / 2}
        y={-diamond / 2}
        width={diamond}
        height={diamond}
        rx={6}
        fill="#94a3b8"
        fillOpacity="0.25"
        transform={`translate(${leftX}, ${CENTER.y}) rotate(45)`}
      />
      <rect
        x={-diamond / 2}
        y={-diamond / 2}
        width={diamond}
        height={diamond}
        rx={6}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
        transform={`translate(${rightX}, ${CENTER.y}) rotate(45)`}
      />
      <circle cx={CENTER.x} cy={CENTER.y} r={34} fill="#3B82F6" opacity="0.55" filter="url(#heroDotGlow)" />
      <circle cx={CENTER.x} cy={CENTER.y} r={20} fill="#ffffff" opacity="0.75" filter="url(#heroDotGlow)" />
      <circle cx={CENTER.x} cy={CENTER.y} r={10} fill="#ffffff" filter="url(#heroDotGlow)" />
    </g>
  )
}

function BrainSymbol() {
  const { x, y } = CENTER
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M -60 -10 C -66 -34 -46 -52 -22 -50 C -14 -62 10 -62 18 -50 C 42 -54 64 -34 56 -10 C 68 2 66 22 50 30 C 52 46 34 58 18 52 C 8 62 -12 62 -22 52 C -40 58 -56 46 -52 30 C -68 22 -70 2 -60 -10 Z"
        fill="#3B82F6"
        fillOpacity="0.08"
        stroke="#22D3EE"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M -30 -20 L -30 0 L -10 0 L -10 20 L 15 20 L 15 5 L 35 5"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx={-30} cy={-20} r={3} fill="#22D3EE" />
      <circle cx={-10} cy={20} r={3} fill="#3B82F6" />
      <circle cx={35} cy={5} r={3} fill="#22D3EE" />
      <circle cx={0} cy={0} r={6} fill="#ffffff" className="hero-neural-node" />
    </g>
  )
}

function ChipSymbol() {
  const { x, y } = CENTER
  const half = 34
  const pins = [-24, -8, 8, 24]
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pins.map((p) => (
        <g key={`pin-${p}`}>
          <line x1={p} y1={-half} x2={p} y2={-half - 14} stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
          <line x1={p} y1={half} x2={p} y2={half + 14} stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
          <line x1={-half} y1={p} x2={-half - 14} y2={p} stroke="#22D3EE" strokeWidth="2" opacity="0.5" />
          <line x1={half} y1={p} x2={half + 14} y2={p} stroke="#22D3EE" strokeWidth="2" opacity="0.5" />
        </g>
      ))}
      <rect
        x={-half}
        y={-half}
        width={half * 2}
        height={half * 2}
        rx={6}
        fill="#0F1626"
        stroke="#3B82F6"
        strokeWidth="2"
        opacity="0.8"
      />
      {[-16, 0, 16].map((gx) =>
        [-16, 0, 16].map((gy) => (
          <circle key={`${gx}-${gy}`} cx={gx} cy={gy} r={2} fill={gx === 0 && gy === 0 ? '#ffffff' : '#22D3EE'} opacity={gx === 0 && gy === 0 ? 1 : 0.6} />
        )),
      )}
    </g>
  )
}

const SYMBOLS = {
  logomark: LogoMarkSymbol,
  brain: BrainSymbol,
  chip: ChipSymbol,
  none: null,
} as const

interface NeuralNetworkBackgroundProps {
  symbol?: keyof typeof SYMBOLS
}

export default function NeuralNetworkBackground({ symbol = 'none' }: NeuralNetworkBackgroundProps) {
  const SymbolComponent = SYMBOLS[symbol]

  return (
    <svg
      aria-hidden
      viewBox="0 0 1400 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="heroDotGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g opacity="0.55">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#3B82F6"
            strokeWidth="1.5"
            className="hero-neural-edge"
          />
        ))}
        {SymbolComponent &&
          CENTER_LINKS.map((i) => (
            <line
              key={`center-${i}`}
              x1={NODES[i].x}
              y1={NODES[i].y}
              x2={CENTER.x}
              y2={CENTER.y}
              stroke="#22D3EE"
              strokeWidth="1.5"
              className="hero-neural-edge"
            />
          ))}
        {NODES.map((n, i) => {
          const color = i % 2 === 0 ? '#3B82F6' : '#22D3EE'
          const major = i % 3 === 0
          const innerR = major ? 10 : 6.5
          return (
            <g
              key={i}
              className="hero-neural-node"
              style={{ animationDelay: `${(i % 7) * 0.4}s` }}
            >
              <circle cx={n.x} cy={n.y} r={innerR + 7} fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
              <circle cx={n.x} cy={n.y} r={innerR + 13} fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
              <circle cx={n.x} cy={n.y} r={innerR} fill={color} />
            </g>
          )
        })}
      </g>
      {SymbolComponent && <SymbolComponent />}
    </svg>
  )
}
