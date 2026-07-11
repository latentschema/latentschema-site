import ScrollCue from '../ui/ScrollCue'

const SPECS = [
  { label: 'Model class', value: 'Sub-3B parameter SLMs' },
  { label: 'Tokenization', value: 'Proprietary, transaction-native' },
  { label: 'Data locality', value: 'On-prem / VPC deployable' },
  { label: 'Inference profile', value: 'Ultra-low latency, low compute' },
]

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center px-6 py-24 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            Deep-Tech Architecture
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Moving Past <span className="text-gradient-cobalt">API Wrappers</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            While others build fragile prompt wrappers around generic models,
            LatentSchema is training custom, low-compute sub-3B parameter Small
            Language Models (SLMs). By engineering proprietary tokenization
            spaces for unstructured transactional metrics, we deliver localized
            data privacy, ultra-low latency, and mathematically predictable
            operational insights.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((spec) => (
            <div
              key={spec.label}
              className="panel rounded-xl p-6 transition-colors hover:border-cobalt-bright/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                {spec.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-100">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      <ScrollCue to="#fnbpulse" direction="up" />
      <ScrollCue to="#team" />
    </section>
  )
}
