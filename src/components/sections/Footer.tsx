import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../ui/Button'
import ScrollCue from '../ui/ScrollCue'

const inputStyles =
  'w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cobalt-bright/60 focus:outline-none focus:ring-2 focus:ring-cobalt-bright/20'

export default function Footer() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer
      id="waitlist"
      className="relative scroll-mt-[var(--header-h,88px)] border-t border-white/10 bg-base-900/60 px-6 py-24 lg:px-8"
    >
      <ScrollCue to="#team" direction="up" />
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
          Contact Us
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
          Let's Collaborate
        </h2>
        <p className="mt-3 text-slate-400">
          See what fnbPulse can do for your business, or talk to us about
          building on the LatentSchema engine together.
        </p>

        {submitted ? (
          <p className="mt-10 rounded-md border border-cobalt-bright/30 bg-cobalt-bright/5 px-6 py-4 text-cobalt-bright">
            Thanks — you're on the list. We'll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 text-left">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Company Name"
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className={inputStyles}
              />
            </div>
            <Button type="submit" variant="primary" className="mt-2 w-full">
              Let's Collaborate
            </Button>
          </form>
        )}

        <div className="mt-16 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-sm text-slate-500">
          <span className="font-extrabold tracking-tight">
            <span className="text-slate-400">LATENT</span>
            <span className="text-cobalt-bright">SCHEMA</span>
          </span>
          <span>&copy; {new Date().getFullYear()} LatentSchema, Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
