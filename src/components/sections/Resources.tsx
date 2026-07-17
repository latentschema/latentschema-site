import ScrollCue from '../ui/ScrollCue'

const WHITEPAPERS = [
  {
    title: 'LatentSchema Technical Whitepaper',
    description:
      'How our sub-3B parameter Small Language Models replace fragile prompt wrappers with proprietary, transaction-native intelligence.',
    href: 'latentschema-whitepaper.html',
  },
  {
    title: 'fnbPulse Whitepaper',
    description:
      'The engine behind autonomous business intelligence for hospitality — Clover and Xero reconciliation, margin protection, and the Daily Pulse Score.',
    href: 'fnbpulse-whitepaper.html',
  },
]

export default function Resources() {
  return (
    <section
      id="resources"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center border-y border-white/10 bg-base-900/40 px-6 py-24 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            Resources
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Whitepapers for Clients &amp; Investors
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Deep-dive documentation on the LatentSchema engine and the
            products we're building on top of it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {WHITEPAPERS.map((paper) => (
            <a
              key={paper.href}
              href={`${import.meta.env.BASE_URL}${paper.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-base-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt-bright/40 hover:shadow-glow-cobalt"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cobalt-bright/30 bg-cobalt-bright/10 text-cobalt-bright">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M7 3.5h7l4 4V19a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19V5A1.5 1.5 0 017.5 3.5z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                  />
                  <path d="M14 3.5V8h4" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
                  <path d="M9 12.5h6M9 15.5h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-50">{paper.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{paper.description}</p>
              </div>

              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cobalt-bright">
                Read Whitepaper
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7v8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <ScrollCue to="#team" />
    </section>
  )
}
