import { ArrowLeft } from 'lucide-react'
import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { ImageReveal, Reveal, RevealGroup, RevealItem, SplitHeadline } from '../components/motion.tsx'
import NewsCard from '../components/NewsCard.tsx'
import { Container, Eyebrow } from '../components/ui.tsx'
import { newsPosts, site } from '../data/site.ts'
import { formatDate } from '../lib/utils.ts'
import Gallery from '../components/Gallery.tsx'
import NotFound from './NotFound.tsx'

export default function NewsPost() {
  const { slug } = useParams()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const post = newsPosts.find((p) => p.slug === slug)

  if (!post) return <NotFound />
  const more = newsPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <title>{`${post.title} | ${site.name}`}</title>

      {/* Reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-clay"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <article ref={ref} className="pt-12 pb-20 sm:pt-16 sm:pb-28">
        <Container className="max-w-3xl">
          <Reveal y={8}>
            <Link
              to="/news"
              className="group relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              All news
            </Link>
          </Reveal>
          <Reveal delay={0.1} as="p" className="mt-12 text-xs text-muted">
            <span className="text-ink">{post.category}</span>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </Reveal>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">
            <SplitHeadline segments={[{ text: post.title }]} delay={0.15} />
          </h1>
          <Reveal delay={0.5} as="p" className="mt-6 text-xl text-ink-soft">
            {post.excerpt}
          </Reveal>
        </Container>
        <Container className="mt-12 max-w-5xl sm:mt-16">
          <ImageReveal className="aspect-[16/9] bg-sand" delay={0.4}>
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </ImageReveal>
        </Container>
        <Container className="mt-12 max-w-3xl sm:mt-16">
          <RevealGroup className="space-y-6 text-lg">
            {post.body.map((para, i) => (
              <RevealItem as="p" key={i}>
                {para}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
        {post.gallery.length > 0 && (
          <Container className="mt-16 max-w-5xl sm:mt-20">
            <Reveal>
              <Eyebrow>Photos</Eyebrow>
            </Reveal>
            <Gallery images={post.gallery} title={post.title} />
          </Container>
        )}
      </article>

      {more.length > 0 && (
        <section className="border-t border-line bg-sand py-20 sm:py-24">
          <Container>
            <Reveal>
              <Eyebrow>Keep reading</Eyebrow>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10" stagger={0.12}>
              {more.map((p) => (
                <RevealItem key={p.slug}>
                  <NewsCard post={p} surface="paper" />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}
    </>
  )
}
