import { Check, Copy, Landmark, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { Reveal, RevealGroup, RevealItem, Spotlight } from '../components/motion.tsx'
import { ArrowLink, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { donationMethods, site } from '../data/site.ts'

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
      className="relative -my-2 inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-muted transition-colors duration-300 hover:bg-sand hover:text-ink"
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

export default function Donate() {
  const { bank } = donationMethods
  const iconClass = 'h-6 w-6 text-forest'

  return (
    <>
      <title>{`Donate | ${site.name}`}</title>
      <PageHeader
        eyebrow="Donate"
        title="We need your support."
        intro="We welcome all would-be patrons, donors and well-wishers to join us towards our goal of educating children for a better tomorrow."
        motif={2}
      />

      {/* Why give */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Your support" title={site.tagline} />
          </div>
          <RevealGroup className="space-y-6 text-lg lg:col-span-6 lg:col-start-7 lg:pt-12" delay={0.15}>
            <RevealItem as="p">
              We organise fundraising activities to meet the huge financial obligations of educating our future
              leaders. Your gift helps provide scholarships, uniforms, stationery and other school essentials, and
              supports our campaign against hunger.
            </RevealItem>
            <RevealItem as="p">
              Education is the greatest asset one can give to anyone. Do not hesitate to sponsor a child to acquire
              this lifetime wealth, which benefits not only the child and their family but the nation as a whole.
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      {/* Methods */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="How to give"
          title="Ways to donate"
          intro="Please include your name in the payment reference so we can thank you."
        />
        <RevealGroup className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8" stagger={0.15}>
          <RevealItem>
            <MethodCard title="Bank transfer" icon={<Landmark className={iconClass} strokeWidth={1.25} aria-hidden="true" />}>
              <dl className="border-t border-line">
                <DetailRow label="Bank" value={bank.bankName} />
                <DetailRow label="Account name" value={bank.accountName} />
                <DetailRow label="Account number" value={bank.accountNumber} copyable />
                <DetailRow label="Sort code" value={bank.sortCode} copyable />
              </dl>
            </MethodCard>
          </RevealItem>

          <RevealItem>
            <MethodCard title="In person" icon={<Phone className={iconClass} strokeWidth={1.25} aria-hidden="true" />}>
              <p className="text-sm">Please call and a member of our team will be happy to help you.</p>
              <div className="mt-6 space-y-8">
                {site.contact.offices.map((office) => (
                  <div key={office.name}>
                    <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">{office.name}</p>
                    <ul className="mt-3 border-t border-line">
                      {office.phones.map((phone) => (
                        <li key={phone} className="border-b border-line py-4 text-sm">
                          <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="text-ink hover:text-forest">
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>
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
            title="Want to sponsor a child, or give on behalf of an organisation?"
            intro="Send us a message and a member of our team will be happy to help."
          />
          <Reveal delay={0.2} className="shrink-0">
            <ArrowLink to="/contact?subject=Donation">Contact us about giving</ArrowLink>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
