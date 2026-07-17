import LogoMark from './LogoMark'

interface LogoProps {
  markSize?: number
  showTagline?: boolean
  wordmarkClassName?: string
}

export default function Logo({ markSize = 36, showTagline = false, wordmarkClassName = 'text-lg' }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={markSize} />
      <div className="flex flex-col justify-center">
        <span className={`font-extrabold tracking-tight ${wordmarkClassName}`}>
          <span className="text-white">LATENT</span>
          <span className="text-cobalt-bright">SCHEMA</span>
        </span>
        {showTagline && (
          <span
            className="block whitespace-nowrap text-[10px] font-semibold uppercase text-slate-300 sm:text-[13px]"
            style={{ textAlign: 'justify', textAlignLast: 'justify' }}
          >
            Uncovering Intelligence. Driving Action.
          </span>
        )}
      </div>
    </div>
  )
}
