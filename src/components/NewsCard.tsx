import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import type { NewsPost } from '../data/site.ts'
import { formatDate } from '../lib/utils.ts'

export default function NewsCard({ post, surface = 'sand' }: { post: NewsPost; surface?: 'sand' | 'paper' }) {
  return (
    <article className="group">
      <Link to={`/news/${post.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-2xl ${surface === 'paper' ? 'bg-paper' : 'bg-sand'}`}>
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <span className="absolute top-4 right-4 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
        <p className="mt-6 text-xs text-muted">
          <span className="text-ink">{post.category}</span>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-snug font-normal text-balance">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </h3>
      </Link>
    </article>
  )
}
