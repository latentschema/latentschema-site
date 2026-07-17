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

export default function WhitepaperGate({ title, href, children }: WhitepaperGateProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function closeAndReset() {
    setOpen(false)
    setError(false)
    formRef.current?.reset()
  }

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
      window.open(`${import.meta.env.BASE_URL}${href}`, '_blank', 'noopener,noreferrer')
      closeAndReset()
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
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Share a few details and the whitepaper opens right away in a new tab.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 text-left">
            <input type="hidden" name="_subject" value={`Whitepaper request: ${title}`} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
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
              {submitting ? 'Unlocking…' : 'Unlock Whitepaper'}
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
        </div>
      </Modal>
    </>
  )
}
