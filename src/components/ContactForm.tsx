import { Check, LoaderCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { site } from '../data/site.ts'
import { ease } from '../lib/motion.ts'
import { buttonClass } from '../lib/utils.ts'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'mt-2 block h-12 w-full rounded-xl border border-line bg-white/60 px-4 text-[0.95rem] text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-muted/60 hover:border-ink/30 focus:border-ink focus:shadow-[0_0_0_4px_rgb(28_26_23/0.06)] focus:outline-none'

function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block text-sm text-ink">
      {label}
      {optional && <span className="ml-1 text-muted">(optional)</span>}
      {children}
    </label>
  )
}

/** Subject picker as selectable chips; submits as a normal radio group named "subject". */
function SubjectChips({ subjects, value, onChange }: { subjects: string[]; value: string; onChange: (s: string) => void }) {
  return (
    <fieldset>
      <legend className="text-sm text-ink">What is this about?</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {subjects.map((s) => {
          const checked = s === value
          return (
            <label
              key={s}
              className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                checked ? 'border-ink text-paper' : 'border-line text-ink hover:border-ink/40'
              }`}
            >
              <input
                type="radio"
                name="subject"
                value={s}
                checked={checked}
                onChange={() => onChange(s)}
                className="sr-only"
              />
              {checked && (
                <motion.span
                  layoutId="subject-chip"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{s}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * Contact form that posts to Formspree. Set VITE_FORMSPREE_ID in .env.local.
 * `defaultSubject` lets other pages (e.g. Get Involved) preselect a topic.
 */
export default function ContactForm({ subjects, defaultSubject }: { subjects: string[]; defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [subject, setSubject] = useState(
    defaultSubject && subjects.includes(defaultSubject) ? defaultSubject : subjects[0],
  )
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

  const swap = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'sent' ? (
        <motion.div key="sent" className="py-12" role="status" {...swap}>
          <motion.span
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-paper"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
          >
            <Check className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </motion.span>
          <h3 className="mt-6 font-serif text-3xl font-normal">Thank you.</h3>
          <p className="mt-3 max-w-md">We’ve received your message and will reply within a few working days.</p>
          <button type="button" onClick={() => setStatus('idle')} className={`${buttonClass('outline')} mt-8`}>
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" {...swap}>
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

          <SubjectChips subjects={subjects} value={subject} onChange={setSubject} />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Full name">
              <input name="name" type="text" required autoComplete="name" className={fieldClass} />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </Field>
          </div>
          <Field label="Phone" optional>
            <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
          </Field>

          <Field label="Message">
            <textarea name="message" required rows={6} className={`${fieldClass} h-auto py-3`} />
          </Field>

          {/* Honeypot field for spam bots; Formspree discards submissions that fill it. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <AnimatePresence>
            {status === 'error' && (
              <motion.p
                className="text-sm text-clay"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                Something went wrong. Please try again or email {site.contact.email}.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={!configured || status === 'sending'}
            className={`${buttonClass('primary')} w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto`}
          >
            {status === 'sending' && <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.5} aria-hidden="true" />}
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
