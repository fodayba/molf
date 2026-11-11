import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { ImageReveal, Reveal, RevealGroup, RevealItem } from '../components/motion.tsx'
import { Eyebrow, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { founderStatement, milestones, mission, site, story, team, values, vision } from '../data/site.ts'

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
        title="Every child should be educated and given a fair chance."
        intro={site.description}
      />

      {/* Story */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <ImageReveal className="aspect-[4/5] lg:sticky lg:top-28 lg:col-span-5">
            <img
              src="/images/about/children-kambia.jpg"
              alt="Schoolchildren in blue uniforms waving at the camera"
              className="h-full w-full object-cover"
            />
          </ImageReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Our story" title="Why we began" />
            <RevealGroup className="mt-8 space-y-6 text-lg" delay={0.2}>
              {story.map((para, i) => (
                <RevealItem as="p" key={i}>
                  {para}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="sand">
        <RevealGroup className="grid gap-12 md:grid-cols-2 md:gap-0" stagger={0.2}>
          <RevealItem className="md:pr-12 lg:pr-16">
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">{mission}</p>
          </RevealItem>
          <RevealItem className="border-t border-ink/10 pt-12 md:border-t-0 md:border-l md:pt-0 md:pl-12 lg:pl-16">
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-6 font-serif text-3xl leading-snug text-ink sm:text-4xl">{vision}</p>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Founder's statement */}
      <Section tone="indigo">
        <figure className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow light>Founder’s statement</Eyebrow>
          </Reveal>
          <Reveal delay={0.1} as="p" className="mx-auto mt-8 max-w-2xl text-lg text-paper/80">
            {founderStatement.text}
          </Reveal>
          <blockquote className="mt-10 font-serif text-3xl leading-snug text-balance text-paper sm:text-[2.5rem] sm:leading-[1.2]">
            <Reveal delay={0.2}>“{founderStatement.quote}”</Reveal>
          </blockquote>
          <Reveal delay={0.3} as="figcaption" className="mt-10 text-sm text-paper/60">
            <span className="text-paper">{founderStatement.name}</span>, {founderStatement.role}
          </Reveal>
        </figure>
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
          title="Meet the team"
          intro="Our trustees and members in the UK and Sierra Leone."
        />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {team.map((member, i) => (
            <div key={member.name} className="group">
              <ImageReveal className="aspect-[4/5] bg-sand" delay={(i % 4) * 0.1}>
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-[50%_42%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </ImageReveal>
              <Reveal delay={0.2 + (i % 4) * 0.1}>
                <h3 className="mt-6 font-serif text-2xl font-normal">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                <div className="mt-4 space-y-3 text-sm">
                  {member.bio.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
