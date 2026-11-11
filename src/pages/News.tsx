import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Reveal } from '../components/motion.tsx'
import NewsCard from '../components/NewsCard.tsx'
import { PageHeader, Section } from '../components/ui.tsx'
import { newsPosts, site } from '../data/site.ts'
import { ease } from '../lib/motion.ts'

const ALL = 'All stories'

export default function News() {
  const posts = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date))
  const categories = [ALL, ...new Set(posts.map((p) => p.category))]
  const [filter, setFilter] = useState(ALL)
  const visible = filter === ALL ? posts : posts.filter((p) => p.category === filter)

  return (
    <>
      <title>{`News | ${site.name}`}</title>
      <PageHeader
        eyebrow="Journal"
        title="News & stories"
        intro="Updates from our programmes, our partners and the young leaders we serve."
        motif={2}
      />
      <Section>
        <Reveal>
          <div role="group" aria-label="Filter stories by category" className="-mx-1 flex flex-wrap gap-1">
            {categories.map((c) => {
              const active = c === filter
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active ? 'text-paper' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="news-filter"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay: i * 0.08 } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
                transition={{ layout: { duration: 0.6, ease } }}
              >
                <NewsCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </>
  )
}
