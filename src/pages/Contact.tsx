import { useSearchParams } from 'react-router'
import ContactForm from '../components/ContactForm.tsx'
import { PageHeader, Section } from '../components/ui.tsx'
import { site } from '../data/site.ts'

const subjects = ['General enquiry', 'Volunteering', 'Mentoring', 'Partnership', 'Donation', 'Media']

export default function Contact() {
  const [params] = useSearchParams()
  const { address, phone, email, hours } = site.contact

  const details = [
    { label: 'Visit', value: address.join(', ') },
    { label: 'Call', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}` },
    { label: 'Write', value: email, href: `mailto:${email}` },
    { label: 'Hours', value: hours },
  ]

  return (
    <>
      <title>{`Contact | ${site.name}`}</title>
      <PageHeader
        eyebrow="Contact"
        title="We’d be glad to hear from you."
        intro="Questions, partnerships or press enquiries. We reply to every message within a few working days."
        motif={3}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <dl className="border-t border-line lg:col-span-4">
            {details.map(({ label, value, href }) => (
              <div key={label} className="border-b border-line py-6">
                <dt className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">{label}</dt>
                <dd className="mt-2 break-words text-ink">
                  {href ? (
                    <a href={href} className="underline-offset-4 transition-colors duration-300 hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="text-4xl">Send a message</h2>
            <div className="mt-10">
              <ContactForm subjects={subjects} defaultSubject={params.get('subject') ?? undefined} />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
