import { Building2, CalendarHeart, GraduationCap, HandHeart } from 'lucide-react'
import { Magnetic, Reveal, RevealGroup, RevealItem, Spotlight } from '../components/motion.tsx'
import { ArrowLink, ButtonLink, Eyebrow, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { fundraisingActivities, pastEvents, site } from '../data/site.ts'
import { formatDate } from '../lib/utils.ts'

const ways = [
  {
    icon: HandHeart,
    title: 'Become a member',
    text: 'Our members fund our work through monthly contributions. Join our network of members and associate members.',
    cta: 'Ask about membership',
    subject: 'Membership',
  },
  {
    icon: GraduationCap,
    title: 'Sponsor a child',
    text: 'Give a child a lifetime wealth: an education. Sponsorship provides scholarships, uniforms, stationery and other school essentials.',
    cta: 'Sponsor a child',
    subject: 'Sponsorship',
  },
  {
    icon: CalendarHeart,
    title: 'Attend our events',
    text: 'Join family and friends at our fun days and barbecues, day outings, dinner and dance, and awards nights.',
    cta: 'Ask about upcoming events',
    subject: 'Events',
  },
  {
    icon: Building2,
    title: 'Partner with us',
    text: 'Sponsors and partners such as Orange Foundation, Frenzy Network Sierra Leone, Focus 1000 and Pikin Bizness help make our work possible.',
    cta: 'Discuss a partnership',
    subject: 'Partnership',
  },
]

export default function GetInvolved() {
  return (
    <>
      <title>{`Get Involved | ${site.name}`}</title>
      <PageHeader
        eyebrow="Get involved"
        title="Join us in educating children for a better tomorrow."
        intro="MOL Foundation is funded by its members, donations from patrons and fundraising activities. Here is how you can help."
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

      {/* Fundraising and events */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Fundraising"
              title="How we raise funds"
              intro="We organise fundraising activities to meet the huge financial obligations of educating our future leaders."
            />
            <RevealGroup as="ul" className="mt-10 border-t border-ink/10" stagger={0.06}>
              {fundraisingActivities.map((a) => (
                <RevealItem as="li" key={a} className="border-b border-ink/10 py-3.5 text-ink">
                  {a}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>Past events</Eyebrow>
            </Reveal>
            <RevealGroup className="mt-6 space-y-5" stagger={0.12}>
              {pastEvents.map((e) => (
                <RevealItem key={e.title} as="article" className="rounded-3xl bg-paper p-8">
                  <p className="text-xs text-muted">
                    <time dateTime={e.date}>{formatDate(e.date)}</time>
                    <span className="mx-2" aria-hidden="true">
                      /
                    </span>
                    {e.time}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-normal">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.location}</p>
                  <p className="mt-4">{e.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-8">
              <ArrowLink to="/news">See photos from past events</ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="indigo">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            title="Prefer to give a gift?"
            intro="Every donation helps a child in Sierra Leone get the education they deserve."
          />
          <Reveal delay={0.2} className="shrink-0">
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
