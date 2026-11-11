import { Building2, HandHeart, Megaphone, UserRoundCheck } from 'lucide-react'
import { ArrowLink, ButtonLink, PageHeader, Section } from '../components/ui.tsx'
import { site } from '../data/site.ts'

const ways = [
  {
    icon: HandHeart,
    title: 'Volunteer',
    text: 'Help run workshops, events and community forums in Freetown and across the provinces.',
    cta: 'Apply to volunteer',
    subject: 'Volunteering',
  },
  {
    icon: UserRoundCheck,
    title: 'Mentor',
    text: 'Guide an emerging leader for twelve months, in person or online. Professionals at home and in the diaspora are welcome.',
    cta: 'Apply to mentor',
    subject: 'Mentoring',
  },
  {
    icon: Building2,
    title: 'Partner',
    text: 'Schools, businesses and organisations can co-host programmes, sponsor cohorts or offer internships.',
    cta: 'Discuss a partnership',
    subject: 'Partnership',
  },
  {
    icon: Megaphone,
    title: 'Advocate',
    text: 'Follow our work, share our stories and tell young people about the opportunities we offer.',
    cta: 'Get in touch',
    subject: 'General enquiry',
  },
]

export default function GetInvolved() {
  return (
    <>
      <title>{`Get Involved | ${site.name}`}</title>
      <PageHeader
        eyebrow="Get involved"
        title="Lend your time, your experience, your voice."
        intro="There are many ways to support young leaders in Sierra Leone. Choose the one that suits you."
        motif={1}
      />

      <Section>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {ways.map(({ icon: Icon, title, text, cta, subject }) => (
            <div key={title} className="flex flex-col bg-paper p-8 sm:p-12">
              <Icon className="h-7 w-7 text-forest" strokeWidth={1.25} aria-hidden="true" />
              <h2 className="mt-8 text-4xl">{title}</h2>
              <p className="mt-4 max-w-sm flex-1">{text}</p>
              <div className="mt-8">
                <ArrowLink to={`/contact?subject=${encodeURIComponent(subject)}`}>{cta}</ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="indigo">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-[1.1] text-paper sm:text-5xl">Prefer to give a gift?</h2>
            <p className="mt-6 text-lg">Every donation funds training, materials and mentorship for young leaders.</p>
          </div>
          <ButtonLink to="/donate" variant="light">
            Donate
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
