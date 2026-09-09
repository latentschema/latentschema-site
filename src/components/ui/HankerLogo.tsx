interface HankerLogoProps {
  scale?: number
}

const AMBER = '#B47828'
const CREAM = '#f4efe2'

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="80 10 360 430"
      fill="none"
      aria-hidden="true"
    >
      <g fill={AMBER}>
        <rect x="150" y="190" width="60" height="230" rx="30" />
        <rect x="290" y="190" width="60" height="230" rx="30" />
        <path d="M 100 390 C 120 340, 190 300, 260 300 C 330 300, 390 280, 420 225 C 415 280, 350 350, 270 350 C 190 350, 130 370, 100 390 Z" />
        <path d="M 250 245 C 220 220, 205 170, 220 120 C 240 85, 270 60, 280 30 C 275 60, 255 90, 245 130 C 235 175, 255 210, 250 245 Z" />
        <path d="M 285 195 C 270 175, 265 140, 275 105 C 285 75, 305 50, 312 30 C 308 55, 292 80, 288 110 C 282 145, 292 170, 285 195 Z" />
      </g>
    </svg>
  )
}

export default function HankerLogo({ scale = 1 }: HankerLogoProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        userSelect: 'none',
      }}
    >
      <span style={{ display: 'inline-flex', transform: 'translateY(-8px)' }}>
        <LogoMark size={37} />
      </span>
      <span
        style={{
          fontFamily: "'Comfortaa', cursive, sans-serif",
          fontWeight: 700,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          fontSize: 25,
          lineHeight: 1,
        }}
      >
        <span style={{ color: CREAM }}>hanker</span>
        <span style={{ color: AMBER }}>.food</span>
      </span>
    </div>
  )
}
