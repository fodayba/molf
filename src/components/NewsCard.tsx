import { Link } from 'react-router'
import type { NewsPost } from '../data/site.ts'
import { formatDate } from '../lib/utils.ts'
import { ImagePlaceholder } from './ui.tsx'

export default function NewsCard({ post, surface = 'sand' }: { post: NewsPost; surface?: 'sand' | 'paper' }) {
  return (
    <article className="group">
      <Link to={`/news/${post.slug}`} className="block">
        <ImagePlaceholder
          label="News photo"
          surface={surface}
          className="aspect-[4/3] transition-opacity duration-500 group-hover:opacity-80"
        />
        <p className="mt-6 text-xs text-muted">
          <span className="text-ink">{post.category}</span>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-snug font-normal text-balance">{post.title}</h3>
      </Link>
    </article>
  )
}
