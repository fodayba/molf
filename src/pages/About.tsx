import { Eyebrow, ImagePlaceholder, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { milestones, site, team, values } from '../data/site.ts'

export default function About() {
  return (
    <>
      <title>{`About | ${site.name}`}</title>
      <PageHeader
        eyebrow="About us"
        title="A foundation built on the belief that leaders are made."
        intro="We develop young Sierra Leoneans into leaders who serve their communities with integrity and skill."
      />

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ImagePlaceholder label="Photo: the founding team" className="aspect-[4/5] lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Our story" title="Why we began" />
            <div className="mt-8 space-y-6 text-lg">
              <p>
                {site.name} was founded in Freetown in {site.founded} by people who believed Sierra Leone’s young
                people deserve the chance to lead. Replace this paragraph with the foundation’s founding story.
              </p>
              <p>
                Today we work with schools, community groups and partners across the country to give young people
                the skills, mentors and opportunities they need.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="sand">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12 lg:pr-16">
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              To identify, train and mentor young Sierra Leoneans to become ethical, capable leaders.
            </p>
          </div>
          <div className="border-t border-ink/10 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-16">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              A Sierra Leone where every community is led by people of integrity and compassion.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading eyebrow="What guides us" title="Our values" />
        <div className="mt-12 grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title}>
              <span className="font-serif text-lg text-muted">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-2xl font-normal">{v.title}</h3>
              <p className="mt-3">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Milestones */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Our journey" title="Milestones" />
          </div>
          <ol className="border-t border-ink/10 lg:col-span-8">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[5rem_1fr] gap-6 border-b border-ink/10 py-6 sm:grid-cols-[8rem_1fr]">
                <span className="font-serif text-3xl text-ink">{m.year}</span>
                <span className="self-center">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Team */}
      <Section>
        <SectionHeading
          eyebrow="Our people"
          title="Leadership team"
          intro="Sierra Leoneans committed to building leadership in our communities."
        />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.role}>
              <ImagePlaceholder label="Portrait" className="aspect-[4/5]" />
              <h3 className="mt-6 font-serif text-2xl font-normal">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
              <p className="mt-4 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
