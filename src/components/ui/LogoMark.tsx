interface LogoMarkProps {
  size?: number
  className?: string
}

export default function LogoMark({ size = 40, className = '' }: LogoMarkProps) {
  const diamond = size * 0.62

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }} aria-hidden>
      {/* left diamond — latent, unstructured data */}
      <div
        className="absolute rounded-[3px] bg-slate-400/30"
        style={{
          width: diamond,
          height: diamond,
          left: 0,
          top: size / 2 - diamond / 2,
          transform: 'rotate(45deg)',
        }}
      />
      {/* right diamond — cobalt vector frame */}
      <div
        className="absolute rounded-[3px] border-[1.5px] border-cobalt-bright"
        style={{
          width: diamond,
          height: diamond,
          right: 0,
          top: size / 2 - diamond / 2,
          transform: 'rotate(45deg)',
        }}
      />
      {/* intersection glow */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: size * 0.13,
          height: size * 0.13,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow:
            '0 0 10px 3px rgba(255,255,255,0.85), 0 0 22px 8px rgba(59,130,246,0.55)',
        }}
      />
    </div>
  )
}
