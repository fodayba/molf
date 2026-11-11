import { ArrowRight, ImageIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClass, type ButtonVariant } from '../lib/utils.ts'
import { HeaderMotif } from './art.tsx'
import { Reveal, RevealGroup, RevealItem, SplitHeadline } from './motion.tsx'

/*
 * Spacing rhythm used across the site:
 *   Section padding        py-20 / sm:py-24 / lg:py-28
 *   Heading -> content     mt-12 / lg:mt-16
 *   Grid gaps              gap-10 (cards), gap-12 / lg:gap-16 (columns)
 *   Inside text blocks     eyebrow -> title mt-5, title -> paragraph mt-5/6
 */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}

type Tone = 'paper' | 'sand' | 'ink' | 'indigo'

const tones: Record<Tone, string> = {
  paper: 'bg-paper',
  sand: 'bg-sand',
  ink: 'bg-ink text-paper/70',
  indigo: 'bg-indigo text-paper/75',
}

export function Section({
  children,
  tone = 'paper',
  className = '',
  id,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, light = false, center = false }: { children: ReactNode; light?: boolean; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] uppercase ${
        light ? 'text-paper/60' : 'text-muted'
      } ${center ? 'justify-center' : ''}`}
    >
      <span className={`h-0.5 w-8 rounded-full ${light ? 'bg-ochre' : 'bg-clay'}`} aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
  light?: boolean
}) {
  return (
    <RevealGroup className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`} stagger={0.08}>
      {eyebrow && (
        <RevealItem>
          <Eyebrow light={light} center={center}>
            {eyebrow}
          </Eyebrow>
        </RevealItem>
      )}
      <RevealItem>
        <h2 className={`mt-5 text-4xl leading-[1.08] sm:text-5xl ${light ? 'text-paper' : ''}`}>{title}</h2>
      </RevealItem>
      {intro && (
        <RevealItem>
          <p className={`mt-6 text-lg ${light ? 'text-paper/70' : 'text-ink-soft'}`}>{intro}</p>
        </RevealItem>
      )}
    </RevealGroup>
  )
}

/** Heading block at the top of every inner page, with a decorative motif. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  motif = 0,
}: {
  eyebrow: string
  title: string
  intro?: string
  motif?: number
}) {
  return (
    <header className="overflow-hidden border-b border-line">
      <Container className="grid items-end gap-10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="pb-14 sm:pb-20 lg:col-span-8">
          <Reveal y={12}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            <SplitHeadline segments={[{ text: title }]} delay={0.15} />
          </h1>
          {intro && (
            <Reveal delay={0.5} className="mt-6 max-w-xl text-lg text-ink-soft" as="p">
              {intro}
            </Reveal>
          )}
        </div>
        <HeaderMotif
          variant={motif}
          className="-mb-px hidden w-full max-w-[19rem] justify-self-end sm:block lg:col-span-4"
        />
      </Container>
    </header>
  )
}

export function ButtonLink({
  to,
  variant = 'primary',
  children,
  className = '',
}: {
  to: string
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`${buttonClass(variant)} ${className}`}>
      {children}
    </Link>
  )
}

/** Understated text link with an arrow that nudges on hover. */
export function ArrowLink({
  to,
  children,
  light = false,
  label,
}: {
  to: string
  children: ReactNode
  light?: boolean
  label?: string
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`group relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] inline-flex items-center gap-2 border-b pb-1 text-sm font-medium transition-colors duration-300 ${
        light ? 'border-paper/30 text-paper hover:border-paper' : 'border-ink/20 text-ink hover:border-ink'
      }`}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </Link>
  )
}

/** Stand-in for photography until real images are added. Use `surface="paper"` on sand sections. */
export function ImagePlaceholder({
  label,
  className = '',
  surface = 'sand',
}: {
  label: string
  className?: string
  surface?: 'sand' | 'paper'
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line text-muted/70 ${
        surface === 'paper' ? 'bg-paper' : 'bg-sand'
      } ${className}`}
    >
      <ImageIcon className="h-6 w-6" strokeWidth={1} aria-hidden="true" />
      <span className="px-6 text-center text-[0.65rem] font-medium tracking-[0.22em] uppercase">{label}</span>
    </div>
  )
}
