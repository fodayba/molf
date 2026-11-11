import { palette as C } from '../lib/palette.ts'

/** Placeholder wordmark: three rising strokes in the brand accents, set beside a serif name. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${light ? 'text-paper' : 'text-ink'}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? C.paper : C.ink} />
        <path d="M10 23V16" stroke={C.ochre} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 23V12" stroke={C.clay} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 23V8" stroke={light ? C.indigo : C.paper} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem]">Make Our Leaders</span>
        <span className={`mt-1 text-[0.58rem] font-medium tracking-[0.32em] uppercase ${light ? 'text-paper/50' : 'text-muted'}`}>
          Foundation
        </span>
      </span>
    </span>
  )
}
