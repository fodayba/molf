import { useLenis } from 'lenis/react'
import { Check } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { ProgramArt } from '../components/art.tsx'
import { Magnetic, Reveal, RevealGroup, RevealItem } from '../components/motion.tsx'
import { ButtonLink, Container, Eyebrow, PageHeader, Section, SectionHeading } from '../components/ui.tsx'
import { programs, site, type Program } from '../data/site.ts'

/** Sticky in-page menu that highlights the programme currently on screen. */
function ProgrammeNav({ active }: { active: string }) {
  const listRef = useRef<HTMLUListElement>(null)

  // Keep the active pill visible when the menu scrolls sideways on small screens.
  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`)
    if (!list || !item) return
    list.scrollTo({ left: item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <div className="sticky top-16 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container>
        <nav aria-label="Programmes">
          <ul ref={listRef} className="-mx-2 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {programs.map((p) => {
              const isActive = p.slug === active
              return (
                <li key={p.slug} data-slug={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="programme-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{p.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </div>
  )
}

function ProgrammeArticle({ programme: p, index: i }: { programme: Program; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const artRotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const flip = i % 2 === 1

  return (
    <article
      ref={ref}
      id={p.slug}
      className="grid scroll-mt-32 items-center gap-10 border-b border-line py-20 last:border-b-0 sm:py-24 lg:grid-cols-12 lg:gap-16"
    >
      <Reveal
        className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-sand lg:col-span-6 ${
          flip ? 'lg:order-2 lg:col-start-7' : ''
        }`}
      >
        <motion.div style={{ y: artY, rotate: artRotate }} className="h-3/5">
          <ProgramArt index={i} className="h-full w-auto" />
        </motion.div>
      </Reveal>
      <RevealGroup className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`} stagger={0.08}>
        <RevealItem>
          <Eyebrow>Programme 0{i + 1}</Eyebrow>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-6 text-4xl leading-[1.1] sm:text-5xl">{p.title}</h2>
        </RevealItem>
        <RevealItem as="p" className="mt-6 text-lg text-ink">
          {p.summary}
        </RevealItem>
        <RevealItem as="p" className="mt-4">
          {p.description}
        </RevealItem>
        <RevealItem as="ul" className="mt-8 border-t border-line">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 border-b border-line py-3.5 text-sm text-ink">
              <Check className="h-4 w-4 text-forest" strokeWidth={1.5} aria-hidden="true" />
              {h}
            </li>
          ))}
        </RevealItem>
      </RevealGroup>
    </article>
  )
}

export default function Programs() {
  const [active, setActive] = useState(programs[0].slug)
  const { hash } = useLocation()
  const lenis = useLenis()

  // Scrollspy: mark the programme crossing the middle of the viewport as active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    programs.forEach((p) => {
      const el = document.getElementById(p.slug)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Arriving from another page with #programme: scroll there once the page has rendered.
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!el) return
    const t = window.setTimeout(() => {
      // Offset comes from the article's scroll-margin-top (scroll-mt-32), which Lenis honours.
      if (lenis) lenis.scrollTo(el)
      else el.scrollIntoView()
    }, 250)
    return () => window.clearTimeout(t)
  }, [hash, lenis])

  return (
    <>
      <title>{`Programmes | ${site.name}`}</title>
      <PageHeader
        eyebrow="Programmes"
        title="Supporting children through school, and beyond."
        intro="In partnership with our sponsors, we provide scholarships and school essentials, campaign against hunger, and give under-privileged young people the hope of becoming future leaders."
        motif={1}
      />

      <ProgrammeNav active={active} />

      <Container>
        {programs.map((p, i) => (
          <ProgrammeArticle key={p.slug} programme={p} index={i} />
        ))}
      </Container>

      <Section tone="indigo">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            title="Partner with us."
            intro="We work alongside sponsors and partners including Orange Foundation, Frenzy Network Sierra Leone, Focus 1000 and Pikin Bizness."
          />
          <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row">
            <Magnetic className="flex [&>*]:flex-1">
              <ButtonLink to="/contact?subject=Partnership" variant="light">
                Partner with us
              </ButtonLink>
            </Magnetic>
            <Magnetic className="flex [&>*]:flex-1">
              <ButtonLink to="/donate" variant="outline-light">
                Fund a programme
              </ButtonLink>
            </Magnetic>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
