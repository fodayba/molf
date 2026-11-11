/*
 * Decorative SVG artwork: abstract motifs drawn from Sierra Leonean textiles
 * (country cloth) and landscape (sun, hills, leaves). The rising
 * pill-shaped figures echo the three bars of the logo. Animated with Motion.
 */
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useId, type ReactNode } from 'react'
import { ease } from '../lib/motion.ts'
import { palette as C } from '../lib/palette.ts'

const useSvgId = (prefix: string) => `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, '')}`

const LEAF = 'M0 0 C 10 -14, 30 -16, 44 -6 C 30 4, 12 6, 0 0 Z'

/* ---------- animation wrappers ---------- */

/** Rocks gently from its base, like a plant in a breeze. */
function Sway({ children, duration = 6, delay = 0, amount = 3 }: { children: ReactNode; duration?: number; delay?: number; amount?: number }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      initial={{ rotate: -amount }}
      animate={{ rotate: amount }}
      transition={{ duration, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      {children}
    </motion.g>
  )
}

/** Grows up from its base on first render. */
function Grow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.g
      style={{ originX: 0.5, originY: 1 }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, ease, delay }}
    >
      {children}
    </motion.g>
  )
}

/** Bobs slowly up and down. */
function Float({ children, delay = 0, distance = 8, duration = 5 }: { children: ReactNode; delay?: number; distance?: number; duration?: number }) {
  return (
    <motion.g
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.g>
  )
}

/* ---------- shapes ---------- */

/** A stem with alternating leaves, drawn upward from (x, y). */
function Sprig({
  x,
  y,
  rotate = 0,
  scale = 1,
  mirror = false,
  color,
}: {
  x: number
  y: number
  rotate?: number
  scale?: number
  mirror?: boolean
  color: string
}) {
  const leaves: [number, number, number][] = [
    [2, -40, -35],
    [-2, -48, 215],
    [3, -88, -42],
    [-3, -96, 220],
    [0, -134, -52],
    [-4, -140, 228],
    [-6, -172, -82],
  ]
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${mirror ? -scale : scale} ${scale})`} fill={color}>
      <path d="M0 0 C 4 -60, 2 -120, -6 -172" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      {leaves.map(([lx, ly, r]) => (
        <path key={`${lx}${ly}`} d={LEAF} transform={`translate(${lx} ${ly}) rotate(${r})`} />
      ))}
    </g>
  )
}

/** Three pill-shaped figures with round heads, rising left to right. */
function Figures({
  x,
  base,
  scale = 1,
  color,
  animated = false,
  delay = 0,
}: {
  x: number
  base: number
  scale?: number
  color: string
  animated?: boolean
  delay?: number
}) {
  const w = 40 * scale
  const gap = 30 * scale
  const heights = [110, 150, 190].map((h) => h * scale)
  return (
    <g fill={color}>
      {heights.map((h, i) => {
        const cx = x + i * (w + gap)
        const shape = (
          <>
            <rect x={cx - w / 2} y={base - h} width={w} height={h} rx={w / 2} />
            <circle cx={cx} cy={base - h - 30 * scale} r={19 * scale} />
          </>
        )
        if (!animated) return <g key={h}>{shape}</g>
        return (
          <motion.g
            key={h}
            initial={{ y: 320 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 13, delay: delay + i * 0.14 }}
          >
            <Float delay={1.5 + i * 0.7} distance={5} duration={4 + i}>
              {shape}
            </Float>
          </motion.g>
        )
      })}
    </g>
  )
}

/** A thin outline that draws itself in. */
function DrawPath({ d, delay = 0, duration = 2.4 }: { d: string; delay?: number; duration?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={C.ink}
      strokeOpacity="0.16"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, ease, delay }}
    />
  )
}

/* ---------- compositions ---------- */

/**
 * Home page hero: a sun rising inside an indigo arch over three figures.
 * Pass pointer motion values (-1..1) for parallax; the sun also sinks as the page scrolls.
 */
export function HeroArt({
  className = '',
  pointerX,
  pointerY,
}: {
  className?: string
  pointerX?: MotionValue<number>
  pointerY?: MotionValue<number>
}) {
  const id = useSvgId('hero')
  const zero = useMotionValue(0)
  const px = pointerX ?? zero
  const py = pointerY ?? zero
  const { scrollY } = useScroll()

  const sunX = useTransform(px, (v) => v * 16)
  const sunY = useTransform([py, scrollY], ([p, s]: number[]) => p * 10 + Math.min(s, 900) * 0.14)
  const ringX = useTransform(px, (v) => v * 8)
  const hillX = useTransform(px, (v) => v * -10)
  const figureX = useTransform(px, (v) => v * 5)
  const leafX = useTransform(px, (v) => v * -18)
  const dotX = useTransform(px, (v) => v * 24)
  const dotY = useTransform(py, (v) => v * 16)

  return (
    <svg viewBox="0 0 600 680" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${id}a`}>
          <path d="M80 680 V300 A220 220 0 0 1 520 300 V680 Z" />
        </clipPath>
      </defs>

      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <g clipPath={`url(#${id}a)`}>
          <rect width="600" height="680" fill={C.indigo} />
          <motion.g style={{ x: ringX }}>
            {[172, 212].map((r, i) => (
              <motion.circle
                key={r}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke={C.ochre}
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4 - i * 0.2, 0.12, 0.4 - i * 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 7, delay: 1.2 + i, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </motion.g>
          <motion.g style={{ x: sunX, y: sunY }}>
            <motion.circle
              cx="300"
              cy="300"
              r="124"
              fill={C.ochre}
              initial={{ y: 260 }}
              animate={{ y: 0 }}
              transition={{ duration: 2.2, ease, delay: 0.35 }}
            />
          </motion.g>
          <motion.g style={{ x: hillX }}>
            <motion.ellipse
              cx="170"
              cy="705"
              rx="290"
              ry="190"
              fill={C.forest}
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease, delay: 0.55 }}
            />
            <motion.ellipse
              cx="480"
              cy="725"
              rx="280"
              ry="200"
              fill={C.clay}
              initial={{ y: 220 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease, delay: 0.7 }}
            />
          </motion.g>
          <motion.g style={{ x: figureX }}>
            <Figures x={230} base={610} color={C.paper} animated delay={1} />
          </motion.g>
        </g>
      </motion.g>

      <DrawPath d="M58 680 V300 A242 242 0 0 1 542 300 V680" delay={0.2} />

      <motion.g style={{ x: leafX }}>
        <Grow delay={0.9}>
          <Sway duration={6} amount={2.5}>
            <Sprig x={70} y={680} rotate={-10} scale={1.45} color={C.forest} />
          </Sway>
        </Grow>
        <Grow delay={1.1}>
          <Sway duration={7} delay={0.8} amount={3}>
            <Sprig x={532} y={680} rotate={12} scale={1.25} mirror color={C.clay} />
          </Sway>
        </Grow>
      </motion.g>

      <motion.g style={{ x: dotX, y: dotY }}>
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 1.4 }} style={{ originX: 0.5, originY: 0.5 }}>
          <Float distance={10} duration={6}>
            <circle cx="104" cy="104" r="16" fill={C.clay} />
          </Float>
        </motion.g>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }}>
          <Float distance={6} duration={4} delay={0.4}>
            <circle cx="512" cy="88" r="7" fill={C.ochre} />
          </Float>
          <Float distance={8} duration={5} delay={1}>
            <circle cx="540" cy="122" r="4" fill={C.ochre} />
          </Float>
          <Float distance={5} duration={3.5} delay={0.2}>
            <circle cx="556" cy="72" r="3" fill={C.ochre} />
          </Float>
        </motion.g>
      </motion.g>
    </svg>
  )
}

/** Small emblem for each programme, used on cards and the Programmes page. */
export function ProgramArt({ index, className = '' }: { index: number; className?: string }) {
  const variant = index % 4

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      {variant === 0 && (
        <>
          <path d="M40 228 V120 A80 80 0 0 1 200 120 V228 Z" fill={C.indigo} />
          <circle cx="120" cy="122" r="36" fill={C.ochre} />
          <Figures x={88} base={228} scale={0.42} color={C.paper} />
        </>
      )}

      {variant === 1 && (
        <>
          <circle cx="92" cy="122" r="64" fill={C.clay} />
          <circle cx="148" cy="122" r="64" fill={C.indigo} fillOpacity="0.92" />
          <circle cx="120" cy="40" r="10" fill={C.ochre} />
          <Sprig x={120} y={232} scale={0.5} color={C.forest} />
        </>
      )}

      {variant === 2 && (
        <>
          <rect x="36" y="150" width="52" height="78" rx="8" fill={C.ochre} />
          <rect x="94" y="108" width="52" height="120" rx="8" fill={C.clay} />
          <rect x="152" y="66" width="52" height="162" rx="8" fill={C.indigo} />
          <circle cx="178" cy="34" r="14" fill={C.forest} />
        </>
      )}

      {variant === 3 && (
        <>
          {Array.from({ length: 9 }, (_, i) => {
            const a = ((200 + i * 17.5) * Math.PI) / 180
            return (
              <line
                key={i}
                x1={120 + Math.cos(a) * 96}
                y1={210 + Math.sin(a) * 96}
                x2={120 + Math.cos(a) * 128}
                y2={210 + Math.sin(a) * 128}
                stroke={C.ochre}
                strokeWidth="6"
                strokeLinecap="round"
              />
            )
          })}
          <path d="M36 210 A84 84 0 0 1 204 210 Z" fill={C.forest} />
          <circle cx="120" cy="178" r="20" fill={C.clay} />
          <rect x="30" y="214" width="180" height="10" rx="5" fill={C.ink} fillOpacity="0.85" />
        </>
      )}
    </svg>
  )
}

const motifs = [
  { arch: C.indigo, sun: C.ochre, leaf: C.forest },
  { arch: C.forest, sun: C.ochre, leaf: C.clay },
  { arch: C.clay, sun: C.paper, leaf: C.forest },
  { arch: C.ink, sun: C.clay, leaf: C.forest },
]

/** Compact arch-and-sun motif shown in inner page headers. */
export function HeaderMotif({ variant = 0, className = '' }: { variant?: number; className?: string }) {
  const id = useSvgId('hdr')
  const m = motifs[variant % motifs.length]
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`${id}c`}>
          <path d="M50 320 V170 A110 110 0 0 1 270 170 V320 Z" />
        </clipPath>
      </defs>
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      >
        <g clipPath={`url(#${id}c)`}>
          <rect width="320" height="320" fill={m.arch} />
          <motion.circle
            cx="160"
            cy="180"
            r="54"
            fill={m.sun}
            initial={{ y: 160 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, ease, delay: 0.5 }}
          />
        </g>
      </motion.g>
      <DrawPath d="M32 320 V170 A128 128 0 0 1 288 170 V320" delay={0.3} duration={2} />
      <Grow delay={0.8}>
        <Sway duration={6} amount={3}>
          <Sprig x={44} y={320} rotate={-8} scale={0.85} color={m.leaf} />
        </Sway>
      </Grow>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
        <Float distance={6} duration={4}>
          <circle cx="270" cy="44" r="7" fill={C.ochre} />
        </Float>
        <Float distance={5} duration={5} delay={0.6}>
          <circle cx="294" cy="70" r="4" fill={C.clay} />
        </Float>
      </motion.g>
    </svg>
  )
}

/** Full-bleed artwork panel used in place of photos for calls to action. Animates when scrolled into view. */
export function MotifPanel({ variant, className = '' }: { variant: 'clay' | 'forest'; className?: string }) {
  const bg = variant === 'clay' ? C.clay : C.forest
  const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -15% 0px' } } as const

  return (
    <motion.svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" {...inView}>
      <rect width="600" height="400" fill={bg} />
      {variant === 'clay' ? (
        <>
          {[180, 140, 100, 60].map((r, i) => (
            <motion.path
              key={r}
              d={`M${300 - r} 400 A${r} ${r} 0 0 1 ${300 + r} 400`}
              fill="none"
              stroke={i % 2 === 0 ? C.paper : C.ochre}
              strokeWidth="16"
              variants={{
                hidden: { pathLength: 0 },
                show: { pathLength: 1, transition: { duration: 1.6, ease, delay: 0.15 * i } },
              }}
            />
          ))}
          <motion.g
            variants={{ hidden: { y: 60, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 1.6, ease, delay: 0.5 } } }}
          >
            <Float distance={10} duration={6}>
              <circle cx="470" cy="110" r="42" fill={C.ochre} />
            </Float>
          </motion.g>
          <Float distance={6} duration={4} delay={1}>
            <circle cx="120" cy="90" r="9" fill={C.paper} />
          </Float>
        </>
      ) : (
        <>
          <motion.circle
            cx="300"
            cy="250"
            r="128"
            fill={C.ochre}
            variants={{ hidden: { y: 120 }, show: { y: 0, transition: { duration: 1.8, ease } } }}
          />
          <motion.circle
            cx="300"
            cy="250"
            r="168"
            fill="none"
            stroke={C.ochre}
            strokeOpacity="0.4"
            strokeWidth="1.5"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Sway duration={5} amount={2.5}>
            <Sprig x={300} y={400} scale={1.55} color={C.paper} />
          </Sway>
          <Float distance={8} duration={5}>
            <circle cx="110" cy="96" r="14" fill={C.clay} />
          </Float>
        </>
      )}
    </motion.svg>
  )
}

/** Paired chevrons, a nod to the bold arrows in West African print. Draws in on scroll. */
export function Chevrons({ className = '', color = C.clay }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="none" aria-hidden="true">
      {['M8 8 L32 32 L8 56', 'M40 8 L64 32 L40 56'].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, x: -8 }}
          whileInView={{ pathLength: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.2 + i * 0.2 }}
        />
      ))}
    </svg>
  )
}
