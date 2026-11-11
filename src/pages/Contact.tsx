import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import ContactForm from '../components/ContactForm.tsx'
import { Reveal, RevealGroup, RevealItem } from '../components/motion.tsx'
import { PageHeader, Section } from '../components/ui.tsx'
import { site } from '../data/site.ts'

const subjects = ['General enquiry', 'Membership', 'Sponsorship', 'Partnership', 'Donation', 'Events', 'Media']

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Freetown',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})
const partsFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Freetown', weekday: 'short', hour: 'numeric', hourCycle: 'h23' })

/** Live local time in Freetown, with whether the office is open (Mon to Fri, 09:00 to 17:00). */
function FreetownClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])

  const parts = Object.fromEntries(partsFormat.formatToParts(now).map((p) => [p.type, p.value]))
  const hour = Number(parts.hour)
  const open = !['Sat', 'Sun'].includes(parts.weekday) && hour >= 9 && hour < 17

  return (
    <div className="rounded-2xl bg-sand p-6">
      <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">Now in Freetown</p>
      <p className="mt-3 font-serif text-5xl text-ink tabular-nums">
        <time dateTime={now.toISOString()}>{timeFormat.format(now)}</time>
      </p>
      <p className="mt-3 flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? 'bg-forest' : 'bg-muted'}`} />
        </span>
        {open ? 'Our office is open' : 'Our office is closed. Leave a message and we’ll reply soon.'}
      </p>
    </div>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const { offices, email, hours } = site.contact
  const linkClass =
    'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 hover:bg-[length:100%_1px]'

  return (
    <>
      <title>{`Contact | ${site.name}`}</title>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        intro="Questions about membership, sponsoring a child, partnerships or donations? We’d be glad to hear from you."
        motif={3}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <FreetownClock />
            </Reveal>
            <RevealGroup as="dl" className="mt-8 border-t border-line" stagger={0.08}>
              {offices.map((office) => (
                <RevealItem key={office.name} className="border-b border-line py-6">
                  <dt className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
                    {office.name} <span className="normal-case tracking-normal">· {office.note}</span>
                  </dt>
                  <dd className="mt-2 text-ink">
                    <address className="not-italic">
                      {office.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <span className="mt-3 flex flex-col gap-1">
                      {office.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className={`self-start ${linkClass}`}>
                          {phone}
                        </a>
                      ))}
                    </span>
                  </dd>
                </RevealItem>
              ))}
              <RevealItem className="border-b border-line py-6">
                <dt className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">Write</dt>
                <dd className="mt-2 break-words text-ink">
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                </dd>
              </RevealItem>
              <RevealItem className="border-b border-line py-6">
                <dt className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">Hours</dt>
                <dd className="mt-2 text-ink">{hours}</dd>
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-4xl">Send a message</h2>
            <div className="mt-10">
              <ContactForm subjects={subjects} defaultSubject={params.get('subject') ?? undefined} />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
