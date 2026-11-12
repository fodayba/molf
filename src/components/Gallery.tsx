import { Expand } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import Lightbox from './Lightbox.tsx'

/**
 * Thumbnail grid that opens photos in a <Lightbox>. The open photo lives in the URL
 * (?photo=3), so photos can be shared and the browser or phone Back button closes the
 * viewer. Closing returns focus to the thumbnail that opened it, without moving the page.
 */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const opener = useRef<number | null>(null)
  const pushedEntry = useRef(false)

  const n = Number(params.get('photo'))
  const index = Number.isInteger(n) && n >= 1 && n <= images.length ? n - 1 : null

  const setPhoto = (i: number | null, replace: boolean) =>
    setParams(
      (p) => {
        if (i === null) p.delete('photo')
        else p.set('photo', String(i + 1))
        return p
      },
      { replace, preventScrollReset: true },
    )

  function open(i: number) {
    opener.current = i
    pushedEntry.current = true
    setPhoto(i, false)
  }

  function close() {
    // If opening added a history entry, step back over it so Back doesn't reopen the viewer.
    if (pushedEntry.current) navigate(-1)
    else setPhoto(null, true)
  }

  // Once closed (by any route, including the Back button) and the fade-out has finished
  // (the page is inert until then), hand focus back to the thumbnail that opened it.
  useEffect(() => {
    if (index === null) pushedEntry.current = false
  }, [index])

  function restoreFocus() {
    if (opener.current === null) return
    const thumb = document.querySelector<HTMLButtonElement>(`[data-gallery-index="${opener.current}"]`)
    thumb?.focus({ preventScroll: true })
    opener.current = null
  }

  const alt = (i: number) => `Photo ${i + 1} of ${images.length}: ${title}`

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              data-gallery-index={i}
              onClick={() => open(i)}
              aria-label={`Open ${alt(i)}`}
              aria-haspopup="dialog"
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-sand"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" aria-hidden="true" />
              <span
                className="absolute right-3 bottom-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <Expand className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence onExitComplete={restoreFocus}>
        {index !== null && (
          <Lightbox
            images={images}
            index={index}
            alt={alt}
            onChange={(i) => setPhoto(i, true)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  )
}
