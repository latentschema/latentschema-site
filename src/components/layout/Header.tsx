import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react'
import Logo from '../ui/Logo'

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  function closeOnBlur(event: FocusEvent<HTMLDivElement>) {
    if (!productsRef.current?.contains(event.relatedTarget as Node | null)) {
      setProductsOpen(false)
    }
  }

  function closeOnEscape(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') setProductsOpen(false)
  }

  function navigateFromMobileMenu(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    setMobileOpen(false)
    // wait for the panel to actually collapse and the layout to settle
    // before scrolling, otherwise the browser measures the target's
    // position while the panel is still pushing the page down.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
    })
  }

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
    }

    setHeaderHeight()
    const observer = new ResizeObserver(setHeaderHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base-950/80 backdrop-blur-md">
      <div
        ref={headerRef}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
      >
        <a href="#top" className="shrink-0">
          <span className="hidden sm:block">
            <Logo showTagline markSize={72} wordmarkClassName="text-4xl" />
          </span>
          <span className="sm:hidden">
            <Logo showTagline markSize={52} wordmarkClassName="text-2xl" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <div ref={productsRef} className="relative" onBlur={closeOnBlur} onKeyDown={closeOnEscape}>
            <button
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((open) => !open)}
              className="flex items-center gap-1 text-sm font-medium text-slate-200 transition-colors hover:text-cobalt-bright"
            >
              Products
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-3.5 w-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`absolute left-0 top-full mt-3 w-64 origin-top rounded-xl border border-white/10 bg-base-900 p-1.5 shadow-glow-cobalt transition-all duration-150 ${
                productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              <a
                href="#fnbpulse"
                onClick={() => setProductsOpen(false)}
                className="group/item flex items-center justify-between gap-3 rounded-lg px-3.5 py-3 transition-colors hover:bg-[#00E676]/10"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-100 group-hover/item:text-[#00E676]">
                    fnbPulse
                  </span>
                  <span className="mt-0.5 block text-xs text-white">
                    Autonomous BI for hospitality
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-slate-500 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-[#00E676]"
                >
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

          <a
            href="#architecture"
            className="text-sm font-medium text-slate-200 transition-colors hover:text-cobalt-bright"
          >
            What's coming?
          </a>

          <a
            href="#team"
            className="text-sm font-medium text-slate-200 transition-colors hover:text-cobalt-bright"
          >
            About Us
          </a>

          <a
            href="#waitlist"
            className="text-sm font-medium text-slate-200 transition-colors hover:text-cobalt-bright"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-200 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-base-950/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <a
              href="#fnbpulse"
              onClick={(event) => navigateFromMobileMenu(event, 'fnbpulse')}
              className="rounded-lg px-3.5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-[#00E676]/10 hover:text-[#00E676]"
            >
              fnbPulse
            </a>

            <a
              href="#architecture"
              onClick={(event) => navigateFromMobileMenu(event, 'architecture')}
              className="rounded-lg px-3.5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cobalt-bright"
            >
              What's coming?
            </a>

            <a
              href="#team"
              onClick={(event) => navigateFromMobileMenu(event, 'team')}
              className="rounded-lg px-3.5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cobalt-bright"
            >
              About Us
            </a>

            <a
              href="#waitlist"
              onClick={(event) => navigateFromMobileMenu(event, 'waitlist')}
              className="rounded-lg px-3.5 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-cobalt-bright"
            >
              Contact
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
