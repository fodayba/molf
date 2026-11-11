import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '../components/motion.tsx'
import { Eyebrow, ImagePlaceholder, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { milestones, site, team, values } from '../data/site.ts'

/** Milestones list with a line that fills as the reader scrolls through it. */
function Timeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <ol ref={ref} className="relative lg:col-span-8">
      <span className="absolute top-0 bottom-0 left-[5px] w-px bg-ink/10" aria-hidden="true" />
      <motion.span
        className="absolute top-0 bottom-0 left-[5px] w-px origin-top bg-clay"
        style={{ scaleY }}
        aria-hidden="true"
      />
      {milestones.map((m, i) => (
        <Reveal
          as="li"
          key={m.year}
          delay={i * 0.05}
          className="relative grid grid-cols-[5rem_1fr] gap-6 py-6 pl-10 sm:grid-cols-[8rem_1fr]"
        >
          <span className="absolute top-1/2 left-0 h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 border-sand bg-clay" aria-hidden="true" />
          <span className="font-serif text-3xl text-ink">{m.year}</span>
          <span className="self-center">{m.text}</span>
        </Reveal>
      ))}
    </ol>
  )
}

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
          <ImageReveal className="aspect-[4/5] lg:col-span-5">
            <ImagePlaceholder label="Photo: the founding team" className="h-full rounded-none border-0" />
          </ImageReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Our story" title="Why we began" />
            <RevealGroup className="mt-8 space-y-6 text-lg" delay={0.2}>
              <RevealItem as="p">
                {site.name} was founded in Freetown in {site.founded} by people who believed Sierra Leone’s young
                people deserve the chance to lead. Replace this paragraph with the foundation’s founding story.
              </RevealItem>
              <RevealItem as="p">
                Today we work with schools, community groups and partners across the country to give young people
                the skills, mentors and opportunities they need.
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="sand">
        <RevealGroup className="grid gap-12 md:grid-cols-2 md:gap-0" stagger={0.2}>
          <RevealItem className="md:pr-12 lg:pr-16">
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              To identify, train and mentor young Sierra Leoneans to become ethical, capable leaders.
            </p>
          </RevealItem>
          <RevealItem className="border-t border-ink/10 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-16">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              A Sierra Leone where every community is led by people of integrity and compassion.
            </p>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading eyebrow="What guides us" title="Our values" />
        <RevealGroup
          className="mt-12 grid gap-x-10 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          stagger={0.1}
        >
          {values.map((v, i) => (
            <RevealItem key={v.title} className="group">
              <span className="font-serif text-lg text-muted transition-colors duration-500 group-hover:text-clay">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-2xl font-normal">{v.title}</h3>
              <span
                className="mt-4 block h-px w-8 origin-left bg-clay transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[4]"
                aria-hidden="true"
              />
              <p className="mt-4">{v.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Milestones */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Our journey" title="Milestones" />
          </div>
          <Timeline />
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
          {team.map((member, i) => (
            <div key={member.role} className="group">
              <ImageReveal className="aspect-[4/5]" delay={i * 0.1}>
                <ImagePlaceholder
                  label="Portrait"
                  className="h-full rounded-none border-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </ImageReveal>
              <Reveal delay={0.2 + i * 0.1}>
                <h3 className="mt-6 font-serif text-2xl font-normal">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                <p className="mt-4 text-sm">{member.bio}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
