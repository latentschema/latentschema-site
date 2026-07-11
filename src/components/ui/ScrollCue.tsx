interface ScrollCueProps {
  to: string
  direction?: 'up' | 'down'
}

export default function ScrollCue({ to, direction = 'down' }: ScrollCueProps) {
  const isUp = direction === 'up'

  return (
    <a
      href={to}
      aria-label={isUp ? 'Scroll to previous section' : 'Scroll to next section'}
      className={`absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 text-slate-400 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright ${
        isUp ? 'top-6' : 'bottom-6 animate-bounce'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className={`h-5 w-5 ${isUp ? 'rotate-180' : ''}`}>
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
