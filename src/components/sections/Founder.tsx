import ScrollCue from '../ui/ScrollCue'

export default function Founder() {
  return (
    <section
      id="team"
      className="relative flex min-h-[calc(100dvh-var(--header-h,88px))] scroll-mt-[var(--header-h,88px)] flex-col justify-center px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
          Leadership
        </span>
        <h2 className="mt-4 text-center text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
          Behind the Schema
        </h2>

        <div className="panel mt-12 flex flex-col items-center gap-6 rounded-2xl p-10 text-center sm:p-12">
          <img
            src={`${import.meta.env.BASE_URL}images/nandu-mahajan.jpg`}
            alt="Nandu Mahajan"
            className="h-24 w-24 shrink-0 rounded-full border border-cobalt-bright/30 object-cover shadow-glow-cobalt"
          />

          <div>
            <p className="text-lg font-semibold text-slate-50">Nandu Mahajan</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-cobalt-bright">
              Founder &amp; Principal Architect
            </p>
          </div>

          <blockquote className="max-w-xl text-lg italic leading-relaxed text-slate-400">
            &ldquo;We founded LatentSchema to move past fragile prompt
            wrappers and build true, localized data intelligence—deploying
            custom machine intelligence into hospitality's margins, turning
            chaotic data into autonomous business infrastructure.&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/nandu-mahajan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            
            <a
              href="https://github.com/latentschema"
              aria-label="GitHub / Research"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cobalt-bright/50 hover:text-cobalt-bright"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.435.375.825 1.096.825 2.22 0 1.6-.015 2.888-.015 3.28 0 .32.215.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            
          </div>
        </div>
      </div>

      <ScrollCue to="#waitlist" />
    </section>
  )
}
