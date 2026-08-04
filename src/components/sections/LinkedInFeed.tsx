import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollCue from '../ui/ScrollCue'
import {
  FALLBACK_POSTS,
  LINKEDIN_SHEET_CSV_URL,
  linkedinProfiles,
  parseLinkedInPostsCsv,
} from '../../lib/linkedinPosts'

const CARD_WIDTH = 420
const CARD_GAP = 24

export default function LinkedInFeed() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [posts, setPosts] = useState(FALLBACK_POSTS)

  useEffect(() => {
    if (!LINKEDIN_SHEET_CSV_URL) return

    let cancelled = false
    fetch(LINKEDIN_SHEET_CSV_URL)
      .then((response) => response.text())
      .then((csv) => {
        const parsed = parseLinkedInPostsCsv(csv)
        if (!cancelled && parsed.length > 0) setPosts(parsed)
      })
      .catch(() => {
        // keep FALLBACK_POSTS on failure
      })

    return () => {
      cancelled = true
    }
  }, [])

  function scrollByCard(direction: 1 | -1) {
    trackRef.current?.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GAP),
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="linkedin"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center border-y border-white/10 bg-base-900/40 px-6 py-12 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            From LinkedIn
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            Follow the Build
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Updates from LatentSchema and our founder, straight from
            LinkedIn.
          </p>
        </div>

        {posts.length > 0 && (
          <div className="relative mt-12">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {posts.map((post) => (
                <div
                  key={post.src}
                  className="panel w-full flex-none snap-center overflow-hidden rounded-xl sm:w-[420px]"
                >
                  <iframe
                    src={post.src}
                    title={post.title}
                    loading="lazy"
                    className="h-[460px] w-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>

            {posts.length > 1 && (
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous post"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next post"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {linkedinProfiles.company && (
            <a
              href={linkedinProfiles.company}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-medium text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
            >
              Follow LatentSchema
            </a>
          )}
          {linkedinProfiles.founder && (
            <a
              href={linkedinProfiles.founder}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center rounded-md border border-white/15 px-5 text-sm font-medium text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
            >
              Follow Nandu Mahajan
            </a>
          )}
        </div>
      </div>

      <ScrollCue to="#waitlist" />
    </section>
  )
}
