import { forwardRef, useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import ScrollCue from '../ui/ScrollCue'

// react-pageflip's TS types mark every StPageFlip setting as required, even
// though the underlying library defaults them at runtime — cast the import
// so we can pass only the props we care about.
const FlipBook = HTMLFlipBook as unknown as React.ComponentType<Record<string, unknown>>

const SCREENS = [
  {
    src: '/images/product/0-fnbpulse-score.png',
    title: 'Pulse Score',
    description:
      'A single 0-100 health score combining food cost, labor cost, margin, and prime cost against warning and critical thresholds, with a weekly profit-leak chart flagging which days need attention.',
  },
  {
    src: '/images/product/1-fnbpulse-managers-cockpit.png',
    title: "Manager's Cockpit",
    description:
      'Revenue, profit, COGS, and labor-cost dashboard across all branches, with a "Needs Attention" feed flagging dishes running over target food cost.',
    highlight: true,
  },
  {
    src: '/images/product/2-fnbpulse-sales-analytics.png',
    title: 'Sales Analytics',
    description:
      'Revenue, COGS, and margin by menu item or ingredient, grouped by category with month-over-month trend and margin tracking.',
  },
  {
    src: '/images/product/3-fnbpulse-consumption-analytics.png',
    title: 'Consumption Analytics',
    description:
      'Revenue attributed to every raw ingredient, surfacing which ones drive the most sales across the whole menu.',
  },
  {
    src: '/images/product/4-fnbpulse-inventory-analytics.png',
    title: 'Inventory Analytics',
    description:
      'Opening, purchased, sold, and closing inventory value tracked by month, with a full line-by-line breakdown per ingredient.',
  },
  {
    src: '/images/product/5-fnbpulse-spend-analytics.png',
    title: 'Supply Analytics',
    description:
      'Ingredient and supplier spend trends with price-anomaly detection, aggregated by category or by supplier.',
  },
  {
    src: '/images/product/6-fnbpulse-menu-analytics.png',
    title: 'Menu Analytics',
    description:
      'A Stars / Plowhorses / Puzzles / Dogs profitability matrix scoring every dish on popularity and margin, with suggested price actions.',
    highlight: true,
  },
  {
    src: '/images/product/7-fnbpulse-sales.png',
    title: 'Sales Ledger',
    description:
      'Full receipt-level sales history across branches, drillable down to line items and payment detail for any transaction.',
  },
  {
    src: '/images/product/8-fnbpulse-purchases.png',
    title: 'Purchases',
    description:
      'Purchase history across suppliers and branches, reconciled invoice-by-invoice with subtotal, tax, and total.',
  },
  {
    src: '/images/product/9-fnbpulse-invoice.jpg',
    title: 'Invoice Processing',
    description:
      'OCR and AI-based invoice coding: scanned supplier invoices are read automatically and matched line-by-line to ingredients, updating inventory quantities and cost with no manual entry.',
    highlight: true,
  },
  {
    src: '/images/product/10-fnbpulse-inventory-overview.png',
    title: 'Inventory Overview',
    description:
      'Stock movement per ingredient — opening, purchased, sold, and closing — with a rolling chart and monthly ledger.',
  },
  {
    src: '/images/product/11-fnbpulse-inventory-prices.png',
    title: 'Price History',
    description:
      'Full price history per ingredient by supplier and invoice, with automatic flagging of unusual price jumps.',
  },
  {
    src: '/images/product/12-fnbpulse-menu-catalog.png',
    title: 'Menu Catalog',
    description:
      'Every dish with live price, cost, and food-cost %, color-coded against target.',
  },
  {
    src: '/images/product/13-fnbpulse-menu-cogs.png',
    title: 'Recipe Costing',
    description:
      'Bill-of-materials costing for each dish, with an ingredient-level breakdown and an auto-suggested price to hit target food cost.',
  },
  {
    src: '/images/product/14-fnbpulse-cost-simlulator.png',
    title: 'Cost Simulator',
    description:
      '"What if this ingredient\'s price changed?" — a what-if simulator showing exactly which dishes are affected before it actually happens.',
  },
  {
    src: '/images/product/15-fnbpulse-labour-roster.png',
    title: 'Labor Roster',
    description:
      'Weekly labor scheduling by role, cost, and shift, benchmarked against expected demand per branch.',
  },
  {
    src: '/images/product/16-fnbpulse-branch-manager.png',
    title: 'Branch Manager',
    description:
      'A single-branch daily view for on-site managers — that day\'s sales, scheduled shifts, and low-stock alerts, with one-tap actions to log inventory counts or create purchase orders.',
  },
]

type Screen = (typeof SCREENS)[number]

interface FlipPageProps {
  screen: Screen
}

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(function FlipPage({ screen }, ref) {
  return (
    <div
      ref={ref}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-base-900 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-white p-2">
        <img
          src={screen.src}
          alt={screen.title}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-slate-50 sm:text-base">{screen.title}</h3>
        <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
          {screen.description}
        </p>
      </div>
    </div>
  )
})

interface ProductWalkthroughProps {
  nextHref?: string
  compact?: boolean
}

export default function ProductWalkthrough({
  nextHref,
  compact = false,
}: ProductWalkthroughProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const screens = compact ? SCREENS.filter((screen) => screen.highlight) : SCREENS
  const bookRef = useRef<{ pageFlip: () => { flipPrev: () => void; flipNext: () => void } }>(
    null,
  )

  function flipPrev() {
    bookRef.current?.pageFlip().flipPrev()
  }

  function flipNext() {
    bookRef.current?.pageFlip().flipNext()
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') flipNext()
      if (event.key === 'ArrowLeft') flipPrev()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)')
    setIsMobile(query.matches)
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const bookSize = isMobile
    ? { width: 320, height: 330, minWidth: 220, maxWidth: 340, minHeight: 260, maxHeight: 370 }
    : { width: 780, height: 580, minWidth: 500, maxWidth: 780, minHeight: 420, maxHeight: 620 }

  return (
    <section
      id="product"
      className={`relative scroll-mt-[var(--header-h,88px)] px-6 lg:px-8 ${
        compact ? 'py-16' : 'py-24'
      }`}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00E676]/30 bg-[#00E676]/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-[#00E676]">
            Product Walkthrough &middot; Live App
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Inside <span className="text-gradient-emerald">fnbPulse</span>, Today
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Screens from the live product, currently deployed for early restaurant
            customers.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-white/10 bg-base-900/60 p-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#00E676]">
            Current Stage
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Core product is built and live &mdash; fnbPulse is deployed for early restaurant
            customers, with automated Xero accounting sync running in production
            today. POS integrations, including Clover, are rolling out as we
            onboard new operators.
          </p>
        </div>

        <div className="relative mt-12 flex flex-col items-center">
          <div className="relative flex w-full max-w-4xl items-center justify-center">
            <button
              type="button"
              onClick={flipPrev}
              aria-label="Previous page"
              className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-base-950/90 text-slate-300 backdrop-blur transition-colors hover:border-[#00E676]/50 hover:text-[#00E676] sm:-translate-x-14"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <FlipBook
              key={isMobile ? 'mobile' : 'desktop'}
              ref={bookRef}
              width={bookSize.width}
              height={bookSize.height}
              size="stretch"
              minWidth={bookSize.minWidth}
              maxWidth={bookSize.maxWidth}
              minHeight={bookSize.minHeight}
              maxHeight={bookSize.maxHeight}
              maxShadowOpacity={0.5}
              drawShadow
              showCover={false}
              usePortrait
              mobileScrollSupport
              showPageCorners
              swipeDistance={30}
              flippingTime={700}
              renderOnlyPageLengthChange
              className="product-flipbook"
              onFlip={(event: { data: number }) => setCurrentPage(event.data)}
            >
              {screens.map((screen) => (
                <FlipPage key={screen.src} screen={screen} />
              ))}
            </FlipBook>

            <button
              type="button"
              onClick={flipNext}
              aria-label="Next page"
              className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-white/15 bg-base-950/90 text-slate-300 backdrop-blur transition-colors hover:border-[#00E676]/50 hover:text-[#00E676] sm:translate-x-14"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Page {currentPage + 1} of {screens.length} &middot; drag a corner to flip
          </p>
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <a
              href="/fnbpulse.html#product"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#00E676]/60 bg-[#00E676] px-6 py-3 text-sm font-semibold tracking-tight text-base-950 shadow-[0_0_24px_rgba(0,230,118,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            >
              See the Full Product Walkthrough
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        )}
      </div>

      {nextHref && <ScrollCue to={nextHref} />}
    </section>
  )
}
