/*
 * Reusable motion primitives built on Motion (motion.dev).
 * All transform animations respect the visitor's reduced-motion setting via
 * <MotionConfig reducedMotion="user"> in Layout, plus explicit checks for loops.
 */
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from 'motion/react'
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { ease } from '../lib/motion.ts'

const tags = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
  article: motion.article,
  figure: motion.figure,
  figcaption: motion.figcaption,
  p: motion.p,
}
type Tag = keyof typeof tags

type BaseProps = { children: ReactNode; as?: Tag; className?: string; id?: string }

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, as = 'div', className, id, delay = 0, y = 32 }: BaseProps & { delay?: number; y?: number }) {
  const Component = tags[as] as typeof motion.div
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </Component>
  )
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
}

/** Container that reveals its <RevealItem> children one after another. */
export function RevealGroup({ children, as = 'div', className, stagger = 0.1, delay = 0 }: BaseProps & { stagger?: number; delay?: number }) {
  const Component = tags[as] as typeof motion.div
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ children, as = 'div', className, id }: BaseProps) {
  const Component = tags[as] as typeof motion.div
  return (
    <Component id={id} className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}

type Segment = { text: string; italic?: boolean; className?: string }

/** Unveils an image (or placeholder) with a rising mask and a slow settle. */
export function ImageReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`overflow-hidden rounded-2xl ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4, ease, delay }}
    >
      <motion.div
        className="h-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Headline whose words slide up from behind a mask, one by one. */
export function SplitHeadline({ segments, delay = 0.1 }: { segments: Segment[]; delay?: number }) {
  let index = 0
  return segments.map((seg, s) => {
    const words = seg.text.split(' ').map((word) => {
      const i = index++
      return (
        <span key={i} className="-mx-[0.05em] -mb-[0.12em] inline-block overflow-hidden px-[0.05em] pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      )
    })
    const spaced = words.flatMap((w, i) => (i === 0 ? [w] : [' ', w]))
    const content = seg.italic ? <em className={seg.className}>{spaced}</em> : <span className={seg.className}>{spaced}</span>
    return (
      <span key={s}>
        {s > 0 && ' '}
        {content}
      </span>
    )
  })
}

/** Counts from zero to a value like "1,200+" when it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value)
  const prefix = match?.[1] ?? ''
  const suffix = match?.[3] ?? ''
  const target = match ? Number(match[2].replace(/,/g, '')) : null
  const [display, setDisplay] = useState(target === null ? value : `${prefix}0${suffix}`)

  useEffect(() => {
    if (!inView || target === null) return
    const controls = animate(0, target, {
      duration: reduce ? 0 : 2.2,
      ease,
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v).toLocaleString('en-GB')}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, target, prefix, suffix, reduce])

  // The invisible copy reserves the final width so the layout never shifts.
  return (
    <span ref={ref} className="inline-grid">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {value}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

const softSpring = { stiffness: 180, damping: 16, mass: 0.5 }

/** Pulls its child gently toward the cursor (mouse only). */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, softSpring)
  const y = useSpring(0, softSpring)

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Tilts its child in 3D toward the cursor (mouse only). */
export function Tilt({ children, className = '', max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), softSpring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), softSpring)

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', ...softSpring }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Soft ochre glow that follows the cursor across a card. Parent needs `relative group overflow-hidden`. */
export function Spotlight() {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgb(211 154 44 / 0.16), transparent 65%)`

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background }}
      ref={(el) => {
        const parent = el?.parentElement
        if (!parent) return
        const onMove = (e: globalThis.PointerEvent) => {
          const r = parent.getBoundingClientRect()
          mx.set(e.clientX - r.left)
          my.set(e.clientY - r.top)
        }
        parent.addEventListener('pointermove', onMove)
        return () => parent.removeEventListener('pointermove', onMove)
      }}
    />
  )
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** Endless horizontal ticker that speeds up and reverses with scroll velocity. Decorative. */
export function Marquee({ children, baseVelocity = -1.2 }: { children: ReactNode; baseVelocity?: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)
  const paused = useRef(false)

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) direction.current = -1
    else if (velocityFactor.get() > 0) direction.current = 1
    moveBy += direction.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      className="overflow-hidden"
      aria-hidden="true"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  )
}
