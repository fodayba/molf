import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Container, ImagePlaceholder } from '../components/ui.tsx'
import { newsPosts, site } from '../data/site.ts'
import { formatDate } from '../lib/utils.ts'
import NotFound from './NotFound.tsx'

export default function NewsPost() {
  const { slug } = useParams()
  const post = newsPosts.find((p) => p.slug === slug)

  if (!post) return <NotFound />

  return (
    <>
      <title>{`${post.title} | ${site.name}`}</title>
      <article className="pt-12 pb-20 sm:pt-16 sm:pb-28">
        <Container className="max-w-3xl">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            All news
          </Link>
          <p className="mt-12 text-xs text-muted">
            <span className="text-ink">{post.category}</span>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl text-ink-soft">{post.excerpt}</p>
        </Container>
        <Container className="mt-12 max-w-5xl sm:mt-16">
          <ImagePlaceholder label="Article photograph" className="aspect-[16/9]" />
        </Container>
        <Container className="mt-12 max-w-3xl space-y-6 text-lg sm:mt-16">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </Container>
      </article>
    </>
  )
}
