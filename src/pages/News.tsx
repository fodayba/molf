import NewsCard from '../components/NewsCard.tsx'
import { PageHeader, Section } from '../components/ui.tsx'
import { newsPosts, site } from '../data/site.ts'

export default function News() {
  const posts = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date))

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
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  )
}
