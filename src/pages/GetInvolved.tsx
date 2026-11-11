import { Building2, HandHeart, Megaphone, UserRoundCheck } from 'lucide-react'
import { Magnetic, Reveal, RevealGroup, RevealItem, Spotlight } from '../components/motion.tsx'
import { ArrowLink, ButtonLink, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
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
        <RevealGroup className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2" stagger={0.1}>
          {ways.map(({ icon: Icon, title, text, cta, subject }, i) => (
            <RevealItem key={title} className="group relative flex flex-col overflow-hidden bg-paper p-8 sm:p-12">
              <Spotlight />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-line text-forest transition-all duration-500 group-hover:-rotate-6 group-hover:border-forest group-hover:bg-forest group-hover:text-paper">
                    <Icon className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-lg text-muted">0{i + 1}</span>
                </div>
                <h2 className="mt-8 text-4xl">{title}</h2>
                <p className="mt-4 max-w-sm flex-1">{text}</p>
                <div className="mt-8">
                  <ArrowLink to={`/contact?subject=${encodeURIComponent(subject)}`}>{cta}</ArrowLink>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="indigo">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            title="Prefer to give a gift?"
            intro="Every donation funds training, materials and mentorship for young leaders."
          />
          <Reveal delay={0.2}>
            <Magnetic className="flex [&>*]:flex-1">
              <ButtonLink to="/donate" variant="light">
                Donate
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
