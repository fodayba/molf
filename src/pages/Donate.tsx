import { Check, Copy, Landmark, Smartphone } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { ArrowLink, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { donationMethods, impactTiers, site } from '../data/site.ts'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard may be unavailable (insecure context); the value stays visible to copy by hand.
    }
  }

  const Icon = copied ? Check : Copy
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full p-1.5 text-muted transition-colors duration-300 hover:bg-sand hover:text-ink"
      aria-label={copied ? 'Copied' : `Copy ${value}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
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
    <div className="rounded-3xl border border-line bg-paper p-8 sm:p-10">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-3xl font-normal">{title}</h3>
        {icon}
      </div>
      <div className="mt-6">{children}</div>
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
        <div className="mt-12 grid border-t border-line md:grid-cols-3 lg:mt-16">
          {impactTiers.map((t, i) => (
            <div
              key={t.amount}
              className={`border-b border-line py-10 md:border-b-0 md:py-12 ${
                i > 0 ? 'md:border-l md:pl-10' : ''
              } ${i < impactTiers.length - 1 ? 'md:pr-10' : ''}`}
            >
              <p className="font-serif text-5xl text-ink">{t.amount}</p>
              <p className="mt-4">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Methods */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="How to give"
          title="Ways to donate"
          intro="Please include your name in the payment reference so we can thank you and send a receipt."
        />
        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          <MethodCard title="Bank transfer" icon={<Landmark className={iconClass} strokeWidth={1.25} aria-hidden="true" />}>
            <dl className="border-t border-line">
              <DetailRow label="Bank" value={bank.bankName} />
              <DetailRow label="Account name" value={bank.accountName} />
              <DetailRow label="Account number" value={bank.accountNumber} copyable />
              <DetailRow label="Branch" value={bank.branch} />
              <DetailRow label="SWIFT / BIC" value={bank.swift} copyable />
            </dl>
          </MethodCard>

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
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Giving from abroad, or on behalf of an organisation?"
            intro="We can arrange international transfers, corporate gifts and in-kind donations."
          />
          <div className="shrink-0">
            <ArrowLink to="/contact?subject=Donation">Contact us about giving</ArrowLink>
          </div>
        </div>
      </Section>
    </>
  )
}
