import EngineArchitectureDiagram from '../ui/EngineArchitectureDiagram'
import ScrollCue from '../ui/ScrollCue'

interface EngineBridgeProps {
  nextHref?: string
}

export default function EngineBridge({ nextHref = '#fnbpulse' }: EngineBridgeProps) {
  return (
    <section
      id="engine"
      className="relative scroll-mt-[var(--header-h,88px)] border-t border-white/10 px-6 pb-24 pt-16 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            The Engine
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            One Engine, <span className="text-gradient-cobalt">Built to Generalize</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            LatentSchema is the underlying engine: small, domain-specific
            models trained on your own data, no migration required.
            fnbPulse is its first deployment — proof it extends into other
            transaction-heavy verticals.
          </p>
        </div>

        <EngineArchitectureDiagram />
      </div>

      <ScrollCue to={nextHref} />
    </section>
  )
}
