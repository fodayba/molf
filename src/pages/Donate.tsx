import { Check, Copy, Landmark, Smartphone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { HeaderMotif } from '../components/art.tsx'
import { Reveal, RevealGroup, RevealItem, Spotlight } from '../components/motion.tsx'
import { ArrowLink, Eyebrow, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { donationMethods, impactTiers, site } from '../data/site.ts'
import { ease } from '../lib/motion.ts'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard may be unavailable (insecure context); the value stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="relative inline-flex h-7 items-center rounded-full px-1.5 text-muted transition-colors duration-300 hover:bg-sand hover:text-ink"
      aria-label={copied ? 'Copied' : `Copy ${value}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            className="flex items-center gap-1 text-xs text-forest"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function DetailRow({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line py-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="flex items-center gap-1 text-sm text-ink">
        {value}
        {copyable && <CopyButton value={value} />}
      </dd>
    </div>
  )
}

function MethodCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-paper p-8 sm:p-10">
      <Spotlight />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-3xl font-normal">{title}</h3>
          <span className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">{icon}</span>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

/** Pick a gift amount to see what it pays for. */
function ImpactPicker() {
  const [active, setActive] = useState(1)
  const tier = impactTiers[active]

  return (
    <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <p className="text-sm text-muted" id="tier-label">
          Choose an amount
        </p>
        <div className="mt-4 inline-flex flex-wrap gap-1 rounded-full border border-line p-1" role="group" aria-labelledby="tier-label">
          {impactTiers.map((t, i) => (
            <button
              key={t.amount}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                i === active ? 'text-paper' : 'text-ink hover:text-ink/70'
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="tier-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.amount}</span>
            </button>
          ))}
        </div>
        <p className="mt-8 max-w-sm">
          Every gift, whatever its size, goes directly to programmes for young people across Sierra Leone.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="relative overflow-hidden rounded-3xl bg-indigo bg-gara p-8 text-paper sm:p-12 lg:col-span-7">
        <HeaderMotif variant={0} className="pointer-events-none absolute -right-10 -bottom-2 w-48 opacity-30 sm:w-64" />
        <div className="relative min-h-56" aria-live="polite">
          <Eyebrow light>Your gift</Eyebrow>
          <AnimatePresence mode="wait">
            <motion.div
              key={tier.amount}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="mt-6 font-serif text-7xl text-paper sm:text-8xl">{tier.amount}</p>
              <p className="mt-6 max-w-sm text-lg text-paper/80">{tier.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </div>
  )
}

export default function Donate() {
  const { bank, mobileMoney } = donationMethods
  const iconClass = 'h-6 w-6 text-forest'

  return (
    <>
      <title>{`Donate | ${site.name}`}</title>
      <PageHeader
        eyebrow="Donate"
        title="Invest in a young leader."
        intro="Your gift funds training, mentorship and opportunity for young people across Sierra Leone."
        motif={2}
      />

      {/* Impact */}
      <Section>
        <SectionHeading eyebrow="Your impact" title="What your gift makes possible" />
        <ImpactPicker />
      </Section>

      {/* Methods */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="How to give"
          title="Ways to donate"
          intro="Please include your name in the payment reference so we can thank you and send a receipt."
        />
        <RevealGroup className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8" stagger={0.15}>
          <RevealItem>
            <MethodCard title="Bank transfer" icon={<Landmark className={iconClass} strokeWidth={1.25} aria-hidden="true" />}>
              <dl className="border-t border-line">
                <DetailRow label="Bank" value={bank.bankName} />
                <DetailRow label="Account name" value={bank.accountName} />
                <DetailRow label="Account number" value={bank.accountNumber} copyable />
                <DetailRow label="Branch" value={bank.branch} />
                <DetailRow label="SWIFT / BIC" value={bank.swift} copyable />
              </dl>
            </MethodCard>
          </RevealItem>

          <RevealItem>
            <MethodCard title="Mobile money" icon={<Smartphone className={iconClass} strokeWidth={1.25} aria-hidden="true" />}>
              <div className="space-y-8">
                {mobileMoney.map((m) => (
                  <div key={m.provider}>
                    <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">{m.provider}</p>
                    <dl className="mt-3 border-t border-line">
                      <DetailRow label="Number" value={m.number} copyable />
                      <DetailRow label="Name" value={m.name} />
                    </dl>
                  </div>
                ))}
              </div>
            </MethodCard>
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Giving from abroad, or on behalf of an organisation?"
            intro="We can arrange international transfers, corporate gifts and in-kind donations."
          />
          <Reveal delay={0.2} className="shrink-0">
            <ArrowLink to="/contact?subject=Donation">Contact us about giving</ArrowLink>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
