import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../ui/Button'

const inputStyles =
  'rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-cobalt-bright/60 focus:outline-none focus:ring-2 focus:ring-cobalt-bright/20'

const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
]

export default function Footer() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const form = event.currentTarget
    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@latentschema.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer
      id="waitlist"
      className="relative scroll-mt-[var(--header-h,88px)] border-t border-white/10 bg-base-900/60 px-6 py-24 lg:px-8"
    >
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
            <input type="hidden" name="_subject" value="New LatentSchema contact form submission" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
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
                className={`${inputStyles} w-full`}
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
                className={`${inputStyles} w-full`}
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
                className={`${inputStyles} w-full`}
              />
            </div>
            <div className="flex gap-2">
              <label htmlFor="phoneCountryCode" className="sr-only">
                Country Code
              </label>
              <select
                id="phoneCountryCode"
                name="phoneCountryCode"
                defaultValue=""
                className={`${inputStyles} w-40 shrink-0 appearance-none`}
              >
                <option value="" disabled className="bg-base-900 text-slate-500">
                  Country Code
                </option>
                {countryCodes.map(({ code, country, flag }) => (
                  <option key={country} value={code} className="bg-base-900 text-slate-100">
                    {flag} {country} ({code})
                  </option>
                ))}
              </select>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number (optional)"
                className={`${inputStyles} min-w-0 flex-1`}
              />
            </div>
            <Button type="submit" variant="primary" className="mt-2 w-full" disabled={submitting}>
              {submitting ? 'Sending…' : "Let's Collaborate"}
            </Button>
            {error && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email us directly at{' '}
                <a href="mailto:contact@latentschema.com" className="underline">
                  contact@latentschema.com
                </a>
                .
              </p>
            )}
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
