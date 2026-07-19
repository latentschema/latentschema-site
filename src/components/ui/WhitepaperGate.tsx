import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import Modal from './Modal'
import Button from './Button'
import { countryCodes, inputStyles } from '../../lib/contactForm'

interface WhitepaperGateProps {
  title: string
  href: string
  children: (openGate: () => void) => ReactNode
}

const WHITEPAPER_API_URL = import.meta.env.VITE_WHITEPAPER_API_URL as string | undefined

export default function WhitepaperGate({ title, href, children }: WhitepaperGateProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function closeAndReset() {
    setOpen(false)
    setError(false)
    setSent(false)
    formRef.current?.reset()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const form = event.currentTarget
    const data = new FormData(form)
    const countryCode = String(data.get('phoneCountryCode') ?? '')
    const phoneNumber = String(data.get('phone') ?? '').trim()

    try {
      const response = await fetch(`${WHITEPAPER_API_URL}/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          company: data.get('company'),
          email: data.get('email'),
          phone: phoneNumber ? `${countryCode} ${phoneNumber}`.trim() : '',
          resource: href.replace(/\.html$/, ''),
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {children(() => setOpen(true))}
      <Modal open={open} onClose={closeAndReset}>
        <div className="mx-auto w-full max-w-md p-4 sm:p-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-bright/30 bg-cobalt-bright/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-cobalt-bright">
            Whitepaper Access
          </span>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-50">{title}</h3>

          {sent ? (
            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <p className="text-sm leading-relaxed text-slate-300">
                Check your inbox — we&apos;ve sent a link to confirm your email and open the
                whitepaper. It expires in 30 minutes.
              </p>
              <Button type="button" variant="secondary" onClick={closeAndReset}>
                Done
              </Button>
            </div>
          ) : (
            <>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Share a few details and we&apos;ll email you a link to the whitepaper.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 text-left">
                <div>
                  <label htmlFor={`wp-name-${href}`} className="sr-only">
                    Name
                  </label>
                  <input
                    id={`wp-name-${href}`}
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    className={`${inputStyles} w-full`}
                  />
                </div>
                <div>
                  <label htmlFor={`wp-company-${href}`} className="sr-only">
                    Company Name
                  </label>
                  <input
                    id={`wp-company-${href}`}
                    name="company"
                    type="text"
                    required
                    placeholder="Company Name"
                    className={`${inputStyles} w-full`}
                  />
                </div>
                <div>
                  <label htmlFor={`wp-email-${href}`} className="sr-only">
                    Email Address
                  </label>
                  <input
                    id={`wp-email-${href}`}
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className={`${inputStyles} w-full`}
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor={`wp-phone-code-${href}`} className="sr-only">
                    Country Code
                  </label>
                  <select
                    id={`wp-phone-code-${href}`}
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
                  <label htmlFor={`wp-phone-${href}`} className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id={`wp-phone-${href}`}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className={`${inputStyles} min-w-0 flex-1`}
                  />
                </div>
                <Button type="submit" variant="primary" className="mt-2 w-full" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Email Me the Whitepaper'}
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
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
