import { ArrowUpRight } from 'lucide-react'
import { useSpring } from 'motion/react'
import type { PointerEvent } from 'react'
import { Link } from 'react-router'
import { Chevrons, HeroArt, MotifPanel, ProgramArt } from '../components/art.tsx'
import {
  CountUp,
  Magnetic,
  Marquee,
  Reveal,
  RevealGroup,
  RevealItem,
  SplitHeadline,
  Tilt,
} from '../components/motion.tsx'
import NewsCard from '../components/NewsCard.tsx'
import { ArrowLink, ButtonLink, Container, Eyebrow, Section, SectionHeading } from '../components/ui.tsx'
import { newsPosts, programs, site, stats, values } from '../data/site.ts'
import { palette as C } from '../lib/palette.ts'

const invitations = [
  {
    eyebrow: 'Give your time',
    title: 'Volunteer or mentor',
    text: 'Share your experience with young leaders, in Freetown or online from anywhere in the world.',
    to: '/get-involved',
    cta: 'Ways to get involved',
    art: 'forest' as const,
  },
  {
    eyebrow: 'Give a gift',
    title: 'Fund a future leader',
    text: 'Your support pays for training, materials and mentorship for students across all 16 districts.',
    to: '/donate',
    cta: 'Make a donation',
    art: 'clay' as const,
  },
]

const marqueeWords = [...values.map((v) => v.title), 'Leadership', 'Community']

function SunMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0 sm:h-10 sm:w-10" aria-hidden="true">
      <circle cx="16" cy="16" r="7" fill={C.ochre} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line
            key={i}
            x1={16 + Math.cos(a) * 11}
            y1={16 + Math.sin(a) * 11}
            x2={16 + Math.cos(a) * 15}
            y2={16 + Math.sin(a) * 15}
            stroke={C.ochre}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function Home() {
  // Pointer position over the hero, -1..1 on each axis, smoothed for the parallax artwork.
  const pointerX = useSpring(0, { stiffness: 60, damping: 20 })
  const pointerY = useSpring(0, { stiffness: 60, damping: 20 })

  function onHeroMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    pointerX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    pointerY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  return (
    <>
      <title>{`${site.name} | Freetown, Sierra Leone`}</title>

      {/* Hero */}
      <section
        className="overflow-hidden"
        onPointerMove={onHeroMove}
        onPointerLeave={() => {
          pointerX.set(0)
          pointerY.set(0)
        }}
      >
        <Container className="grid items-end gap-12 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24">
          <div className="pb-4 lg:col-span-7 lg:pb-28">
            <Reveal y={12}>
              <Eyebrow>Freetown, Sierra Leone · Est. {site.founded}</Eyebrow>
            </Reveal>
            <h1 className="mt-8 text-[3.25rem] leading-[1] sm:text-7xl lg:text-[5.75rem]">
              <SplitHeadline
                delay={0.2}
                segments={[
                  { text: 'Cultivating the leaders' },
                  { text: 'Sierra Leone', italic: true, className: 'text-clay' },
                  { text: 'deserves.' },
                ]}
              />
            </h1>
            <Reveal delay={0.75} as="p" className="mt-8 max-w-md text-lg">
              {site.description}
            </Reveal>
            <Reveal delay={0.9} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="flex [&>*]:flex-1">
                <ButtonLink to="/programmes">Explore our programmes</ButtonLink>
              </Magnetic>
              <Magnetic className="flex [&>*]:flex-1">
                <ButtonLink to="/donate" variant="outline">
                  Support our work
                </ButtonLink>
              </Magnetic>
            </Reveal>
          </div>
          <HeroArt
            pointerX={pointerX}
            pointerY={pointerY}
            className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          />
        </Container>
      </section>

      {/* Stats */}
      <section aria-label="Our impact" className="bg-indigo text-paper">
        <Container>
          <RevealGroup as="dl" className="grid grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {stats.map((s, i) => (
              <RevealItem
                key={s.label}
                className={`flex flex-col-reverse py-10 sm:py-12 ${i % 2 === 1 ? 'border-l border-paper/15 pl-6 sm:pl-10' : ''} ${
                  i > 0 ? 'lg:border-l lg:border-paper/15 lg:pl-10' : ''
                } ${i < 2 ? 'border-b border-paper/15 lg:border-b-0' : ''}`}
              >
                <dt className="mt-2 text-sm text-paper/60">{s.label}</dt>
                <dd className="font-serif text-5xl sm:text-6xl">
                  <CountUp value={s.value} />
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Introduction */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="Leadership begins in the community." />
            <Chevrons className="mt-10 hidden h-12 w-auto lg:block" />
          </div>
          <RevealGroup className="space-y-6 text-lg lg:col-span-6 lg:col-start-7 lg:pt-12" delay={0.15}>
            <RevealItem as="p">
              Sierra Leone’s future depends on leaders who are principled, skilled and committed to service. We
              find young people with that potential, wherever they are, and give them the training, mentors and
              opportunities to grow.
            </RevealItem>
            <RevealItem as="p">
              Our work is patient and personal. Small cohorts, long-term mentoring and real responsibility in their
              own communities.
            </RevealItem>
            <RevealItem className="pt-2">
              <ArrowLink to="/about">Our story</ArrowLink>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      {/* Values ticker: speeds up and reverses with scrolling */}
      <div className="border-y border-line py-8 sm:py-10">
        <Marquee>
          {marqueeWords.map((word, i) => (
            <span key={word} className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
              <span
                className={`font-serif text-5xl whitespace-nowrap sm:text-7xl ${
                  i % 2 === 1 ? 'text-muted italic' : 'text-ink'
                }`}
              >
                {word}
              </span>
              <SunMark />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Programmes */}
      <Section tone="sand" >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="What we do" title="Four programmes. One purpose." />
          <Reveal>
            <ArrowLink to="/programmes">All programmes</ArrowLink>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4" stagger={0.12}>
          {programs.map((p, i) => (
            <RevealItem key={p.slug} className="h-full">
              <Tilt className="h-full">
                <Link
                  to={`/programmes#${p.slug}`}
                  className="group flex h-full flex-col rounded-t-[10rem] rounded-b-3xl bg-paper px-7 pt-10 pb-8 shadow-[0_1px_0_0_var(--color-line)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(28_26_23/0.35)]"
                >
                  <ProgramArt
                    index={i}
                    className="mx-auto h-36 w-36 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-3"
                  />
                  <span className="mt-8 font-serif text-lg text-muted">0{i + 1}</span>
                  <h3 className="mt-1 font-serif text-[1.7rem] leading-tight font-normal">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm">{p.summary}</p>
                  <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Quote */}
      <Section tone="indigo">
        <figure className="mx-auto max-w-4xl text-center">
          <Reveal y={20}>
            <span className="block font-serif text-8xl leading-none text-ochre" aria-hidden="true">
              “
            </span>
          </Reveal>
          <blockquote className="-mt-4 font-serif text-3xl leading-snug text-balance text-paper sm:text-[2.75rem] sm:leading-[1.2]">
            <Reveal delay={0.1}>
              Every community has leaders waiting to be discovered. Our work is to find them, and to help them grow.
            </Reveal>
          </blockquote>
          <Reveal delay={0.25} as="figcaption" className="mt-10 text-sm text-paper/60">
            <span className="text-paper">[Founder Name]</span>, Founder &amp; Executive Director
          </Reveal>
        </figure>
      </Section>

      {/* Get involved */}
      <Section>
        <RevealGroup className="grid gap-14 lg:grid-cols-2 lg:gap-16" stagger={0.15}>
          {invitations.map((item) => (
            <RevealItem key={item.title}>
              <Link to={item.to} className="group block overflow-hidden rounded-3xl" tabIndex={-1} aria-hidden="true">
                <MotifPanel
                  variant={item.art}
                  className="aspect-[3/2] w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </Link>
              <div className="mt-8">
                <Eyebrow>{item.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-serif text-4xl font-normal">{item.title}</h3>
                <p className="mt-4 max-w-md">{item.text}</p>
                <div className="mt-6">
                  <ArrowLink to={item.to}>{item.cta}</ArrowLink>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* News */}
      <Section tone="sand">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Journal" title="News & stories" />
          <Reveal>
            <ArrowLink to="/news">All news</ArrowLink>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-16 lg:gap-10" stagger={0.12}>
          {newsPosts.slice(0, 3).map((post) => (
            <RevealItem key={post.slug}>
              <NewsCard post={post} surface="paper" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing call to action */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading center light title="Invest in the next generation." />
          <Reveal delay={0.2} as="p" className="mx-auto mt-6 max-w-lg text-lg">
            Join the people and partners helping young Sierra Leoneans become the leaders their communities need.
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Magnetic className="flex [&>*]:flex-1">
              <ButtonLink to="/donate" variant="light">
                Donate
              </ButtonLink>
            </Magnetic>
            <Magnetic className="flex [&>*]:flex-1">
              <ButtonLink to="/contact?subject=Partnership" variant="outline-light">
                Become a partner
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
