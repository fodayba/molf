import { Check, ChevronDown } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { site } from '../data/site.ts'
import { buttonClass } from '../lib/utils.ts'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'mt-2 block h-12 w-full rounded-xl border border-line bg-white/60 px-4 text-[0.95rem] text-ink transition-colors duration-300 placeholder:text-muted/60 hover:border-ink/30 focus:border-ink focus:outline-none'

function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block text-sm text-ink">
      {label}
      {optional && <span className="ml-1 text-muted">(optional)</span>}
      {children}
    </label>
  )
}

/**
 * Contact form that posts to Formspree. Set VITE_FORMSPREE_ID in .env.local.
 * `defaultSubject` lets other pages (e.g. Get Involved) preselect a topic.
 */
export default function ContactForm({ subjects, defaultSubject }: { subjects: string[]; defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const configured = Boolean(site.formspreeId)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!configured) return
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-12" role="status">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-forest">
          <Check className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-3xl font-normal">Thank you.</h3>
        <p className="mt-3 max-w-md">We’ve received your message and will reply within a few working days.</p>
        <button type="button" onClick={() => setStatus('idle')} className={`${buttonClass('outline')} mt-8`}>
          Send another message
        </button>
      </div>
    )
  }

  const initialSubject = defaultSubject && subjects.includes(defaultSubject) ? defaultSubject : subjects[0]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!configured && (
        <p className="rounded-xl border border-line bg-sand px-5 py-4 text-sm">
          This form isn’t connected yet. Add <code className="text-ink">VITE_FORMSPREE_ID</code> to{' '}
          <code className="text-ink">.env.local</code> to enable it. Until then, write to{' '}
          <a href={`mailto:${site.contact.email}`} className="text-ink underline underline-offset-4">
            {site.contact.email}
          </a>
          .
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name">
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field label="Phone" optional>
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </Field>
        <Field label="Subject">
          <span className="relative block">
            <select name="subject" defaultValue={initialSubject} className={`${fieldClass} appearance-none pr-10`}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 mt-1 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </Field>
      </div>

      <Field label="Message">
        <textarea name="message" required rows={6} className={`${fieldClass} h-auto py-3`} />
      </Field>

      {/* Honeypot field for spam bots; Formspree discards submissions that fill it. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === 'error' && (
        <p className="text-sm text-ink" role="alert">
          Something went wrong. Please try again or email {site.contact.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={!configured || status === 'sending'}
        className={`${buttonClass('primary')} w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto`}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
