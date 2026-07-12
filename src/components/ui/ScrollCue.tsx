interface ScrollCueProps {
  to: string
}

export default function ScrollCue({ to }: ScrollCueProps) {
  return (
    <a
      href={to}
      aria-label="Scroll to next section"
      className="absolute bottom-6 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-white/15 text-slate-400 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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
