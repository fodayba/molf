import { useLenis } from 'lenis/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ease } from '../lib/motion.ts'

type Props = {
  images: string[]
  index: number
  /** Accessible description for an image, e.g. "Photo 3 of 11: Kambia building project". */
  alt: (i: number) => string
  onChange: (i: number) => void
  onClose: () => void
}

const SWIPE_DISTANCE = 80
const SWIPE_VELOCITY = 500

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.98 }),
}

const control =
  'inline-flex h-11 w-11 items-center justify-center rounded-full text-paper/80 transition-colors duration-300 hover:bg-paper/10 hover:text-paper'

/**
 * Full-screen photo viewer. Cycles with arrow keys, swipe, the arrow buttons or the
 * filmstrip, and wraps around at either end. Rendered in a portal on <body>; while open
 * the rest of the page is inert and does not scroll, so closing leaves the reader exactly
 * where they were.
 */
export default function Lightbox({ images, index, alt, onChange, onClose }: Props) {
  const lenis = useLenis()
  const closeRef = useRef<HTMLButtonElement>(null)
  const stripRef = useRef<HTMLUListElement>(null)
  const [direction, setDirection] = useState(0)
  const count = images.length
  const many = count > 1

  const go = (step: number) => {
    setDirection(step)
    onChange((index + step + count) % count)
  }
  const jump = (i: number) => {
    setDirection(i > index ? 1 : -1)
    onChange(i)
  }

  // Lock the page behind, take focus, and listen for keys while open.
  useEffect(() => {
    const root = document.getElementById('root')
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    root?.setAttribute('inert', '')
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      root?.removeAttribute('inert')
    }
  }, [lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (many && e.key === 'ArrowRight') go(1)
      else if (many && e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Warm the cache for the neighbouring photos so cycling feels instant.
  useEffect(() => {
    if (!many) return
    for (const i of [index + 1, index - 1]) new Image().src = images[(i + count) % count]
  }, [index, images, count, many])

  // Keep the active thumbnail centred in the filmstrip.
  useEffect(() => {
    const strip = stripRef.current
    const thumb = strip?.children[index] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' })
  }, [index])

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
  }

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      data-lenis-prevent
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-paper backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-6">
        <p className="font-serif text-xl tabular-nums" aria-live="polite">
          {index + 1}
          <span className="mx-1.5 text-paper/40">/</span>
          <span className="text-paper/60">{count}</span>
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className={control} aria-label="Close gallery">
          <X className="h-6 w-6" strokeWidth={1.25} />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 sm:px-20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={alt(index)}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease }}
            drag={many ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            draggable={false}
            className="max-h-full max-w-full cursor-grab touch-pan-y rounded-lg object-contain select-none active:cursor-grabbing"
          />
        </AnimatePresence>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className={`${control} absolute top-1/2 left-4 hidden -translate-y-1/2 border border-paper/15 sm:inline-flex`}
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className={`${control} absolute top-1/2 right-4 hidden -translate-y-1/2 border border-paper/15 sm:inline-flex`}
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>

      {/* Bottom: arrows on phones, filmstrip everywhere */}
      {many && (
        <div className="pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-center gap-8 pb-3 sm:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${control} border border-paper/15`}>
              <ChevronLeft className="h-6 w-6" strokeWidth={1.25} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${control} border border-paper/15`}>
              <ChevronRight className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </div>
          <ul
            ref={stripRef}
            className="flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:justify-center sm:px-6 [&::-webkit-scrollbar]:hidden"
            aria-label="All photos"
          >
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`block h-14 w-14 overflow-hidden rounded-md transition-all duration-300 sm:h-16 sm:w-16 ${
                    i === index ? 'opacity-100 ring-2 ring-paper ring-offset-2 ring-offset-ink' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>,
    document.body,
  )
}
