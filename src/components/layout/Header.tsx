import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent } from 'react'
import Logo from '../ui/Logo'

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  function closeOnBlur(event: FocusEvent<HTMLDivElement>) {
    if (!productsRef.current?.contains(event.relatedTarget as Node | null)) {
      setProductsOpen(false)
    }
  }

  function closeOnEscape(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') setProductsOpen(false)
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
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-base-950/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <a href="#top">
          <Logo showTagline markSize={72} wordmarkClassName="text-4xl" />
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
                className="group/item flex items-center justify-between gap-3 rounded-lg px-3.5 py-3 transition-colors hover:bg-white/5"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-100 group-hover/item:text-cobalt-bright">
                    fnbPulse 360
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Autonomous BI for hospitality
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 shrink-0 text-slate-500 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-cobalt-bright"
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
      </div>
    </header>
  )
}
