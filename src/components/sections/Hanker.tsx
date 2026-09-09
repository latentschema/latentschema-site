import Button from '../ui/Button'
import HankerLogo from '../ui/HankerLogo'
import ScrollCue from '../ui/ScrollCue'
import FeatureCard from './FeatureCard'

const AMBER = '#B47828'
const CONTACT_HREF = 'mailto:contact@fnbpulse.com?subject=Hanker%20for%20my%20kitchen'
// TODO: swap to https://hanker.food once production is live
const HANKER_SITE_HREF = 'https://staging.hanker.food/'

const FEATURES = [
  {
    title: 'Zero Commission Ordering',
    description:
      'Independent kitchens keep 100% of every order — no per-order cut, unlike third-party delivery marketplaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M12 3v18m5-14H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H7"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Live Kitchen Board',
    description:
      'Every order moves through New → Preparing → Ready on one screen, with a chime and web push the moment it lands.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M4 5h16v14H4V5zm0 5h16M9 15h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Powered by fnbPulse',
    description:
      'Built on the same LatentPulse engine as fnbPulse, so margin auditing and menu intelligence come standard, not bolted on.',
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

interface HankerProps {
  nextHref?: string
}

export default function Hanker({ nextHref = '#waitlist' }: HankerProps) {
  return (
    <section
      id="hanker"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center border-y border-white/10 bg-base-900/40 px-6 py-16 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(180,120,40,0.14),transparent_50%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ borderColor: `${AMBER}4d`, backgroundColor: `${AMBER}0d`, color: AMBER }}
          >
            Product
          </span>

          <a
            href={HANKER_SITE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 transition-opacity hover:opacity-80"
          >
            <HankerLogo scale={1.6} />
          </a>

          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: AMBER }}>
            Zero Commission. Zero Middleman.
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Ordering, <span className="text-gradient-amber">Built for Your Kitchen</span>, Not the
            Marketplace.
          </h2>

          <p className="text-lg leading-relaxed text-slate-400">
            Hanker is LatentSchema's direct-to-diner ordering product for independent restaurants —
            a commission-free storefront and live kitchen board built on LatentPulse, the same engine
            behind fnbPulse. Take orders straight from your own customers, with margin intelligence
            built in from day one.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <a href={HANKER_SITE_HREF} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full sm:w-auto">
                Visit hanker.food
              </Button>
            </a>

            <a
              href={CONTACT_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold tracking-tight text-base-950 shadow-[0_0_24px_rgba(180,120,40,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
              style={{ borderColor: `${AMBER}99`, backgroundColor: AMBER }}
            >
              Bring Hanker to My Kitchen
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

      <ScrollCue to={nextHref} />
    </section>
  )
}
