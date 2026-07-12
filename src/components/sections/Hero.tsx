import Button from '../ui/Button'
import LogoMark from '../ui/LogoMark'
import ScrollCue from '../ui/ScrollCue'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col items-center justify-center overflow-hidden px-6 py-14 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-60"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-base-950 via-transparent to-base-950"
      />
      <div className="pointer-events-none absolute -right-32 -top-32 opacity-[0.07] blur-[1px]">
        <LogoMark size={420} />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
          Autonomous Insights from Fragmented Data
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
          The Foundational{' '}
          <span className="text-gradient-cobalt">Intelligence Layer</span> for
          Fragmented Enterprise Data.
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          LatentSchema synthesizes disparate, legacy datasets into low-compute,
          domain-specific machine intelligence. We eliminate complex database
          migrations to deliver autonomous business intelligence at scale.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <a href="#waitlist">
            <Button variant="primary" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </a>
          <a
            href={`${import.meta.env.BASE_URL}latentschema-whitepaper.html`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" className="w-full sm:w-auto">
              Read Technical Whitepaper
            </Button>
          </a>
        </div>
      </div>

      <ScrollCue to="#fnbpulse" />
    </section>
  )
}
