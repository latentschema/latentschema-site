import Button from '../ui/Button'
import FnbPulseLogo from '../ui/FnbPulseLogo'
import ScrollCue from '../ui/ScrollCue'
import FeatureCard from './FeatureCard'

const FEATURES = [
  {
    title: 'Seamless Ingestion',
    description:
      'Automated pipelines that plug directly into Clover and Xero infrastructure in minutes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4m-16 5l8 4 8-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'AI Margin Advisor',
    description:
      'Natural language interface to instantly surface anomalies in ingredient costs, supplier price spikes, and labor variance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.24 6.24l-2.12-2.12M8.88 8.88L6.76 6.76m10.48 0l-2.12 2.12M8.88 15.12l-2.12 2.12M12 8a4 4 0 100 8 4 4 0 000-8z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Daily Pulse Score',
    description:
      'A combined, deterministic health index tracking real-time food cost control, operational waste, and shift efficiency.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M3 12h4l3-8 4 16 3-8h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function FnbPulse() {
  return (
    <section
      id="fnbpulse"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center border-y border-white/10 bg-base-900/40 px-6 py-16 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,111,255,0.14),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            Flagship Product
          </span>

          <a
            href="https://www.fnbpulse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="my-4 transition-opacity hover:opacity-80"
          >
            <FnbPulseLogo scale={1.6} />
          </a>

          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Autonomous Business{' '}
            <span className="sm:whitespace-nowrap">Intelligence for Modern Hospitality.</span>
          </h2>

          <p className="text-lg leading-relaxed text-slate-400">
            Built directly on top of the LatentSchema engine, fnbPulse 360
            bridges your scattered restaurant tech stack—automatically
            reconciling data between Clover POS systems and Xero accounting
            metrics to protect your margins from inflationary pressures.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <a href="https://www.fnbpulse.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="w-full sm:w-auto">
                Request Demo
              </Button>
            </a>

            <a
              href={`${import.meta.env.BASE_URL}fnbpulse-whitepaper.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-slate-100 transition-all duration-200 hover:border-cobalt-bright/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
            >
              Read the Whitepaper
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      <ScrollCue to="#top" direction="up" />
      <ScrollCue to="#architecture" />
    </section>
  )
}
