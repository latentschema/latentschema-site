interface FnbPulseLogoProps {
  scale?: number
}

const GREEN = '#00E676'

interface LogoMarkProps {
  size?: number
  color?: string
  ring?: boolean
}

function LogoMark({ size = 20, color = '#fff', ring = false }: LogoMarkProps) {
  const k = ring ? 1.0 : 1.16

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ring && <circle cx="12" cy="12" r="11.5" stroke={color} strokeWidth="0.8" fill="none" />}
      <g transform={`translate(12 12) scale(${k}) translate(-12 -12)`}>
        <g transform="rotate(-35 12 12)" fill={color}>
          <rect x="10.0" y="2.7" width="0.78" height="4.5" rx="0.39" />
          <rect x="11.19" y="2.7" width="0.78" height="4.7" rx="0.39" />
          <rect x="12.38" y="2.7" width="0.78" height="4.7" rx="0.39" />
          <rect x="13.57" y="2.7" width="0.78" height="4.5" rx="0.39" />
          <path d="M10.0 6.6 H14.35 C14.52 8.2 13.35 9.25 12.72 9.78 C12.56 9.92 12.48 10.1 12.48 10.32 V11.1 H11.87 V10.32 C11.87 10.1 11.79 9.92 11.63 9.78 C11.0 9.25 9.83 8.2 10.0 6.6 Z" />
          <path d="M11.9 10.9 H12.45 C12.6 13.4 12.92 16.4 12.92 18.9 A0.74 0.74 0 0 1 11.44 18.9 C11.44 16.4 11.75 13.4 11.9 10.9 Z" />
        </g>
        <g transform="rotate(35 12 12)" fill={color}>
          <path d="M12.6 2.6 C10.5 4.6 9.8 8.1 11.25 11.0 L12.6 11.0 Z" />
          <rect x="11.35" y="11.3" width="1.28" height="10.0" rx="0.64" />
        </g>
      </g>
    </svg>
  )
}

export default function FnbPulseLogo({ scale = 1 }: FnbPulseLogoProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        userSelect: 'none',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: 37,
          height: 37,
          flexShrink: 0,
          borderRadius: '50%',
          background: GREEN,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }}
      >
        <LogoMark size={27} color="#ffffff" ring />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: '-0.3px',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#ffffff', fontStyle: 'italic', fontWeight: 600, marginRight: 3 }}>
            fnb
          </span>
          <span style={{ color: GREEN }}>Pulse</span>
        </div>
        <svg
          width="100%"
          height="10"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          style={{ marginTop: 1 }}
          aria-hidden="true"
        >
          <path
            d="M0 5 H40 L44 0 L48 10 L52 0 L56 5 H100"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}
