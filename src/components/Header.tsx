import { useLenis } from 'lenis/react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router'
import { navLinks, site } from '../data/site.ts'
import { ease } from '../lib/motion.ts'
import { buttonClass } from '../lib/utils.ts'
import Logo from './Logo.tsx'
import { Magnetic } from './motion.tsx'
import { Container } from './ui.tsx'

const spring = { type: 'spring', stiffness: 380, damping: 32 } as const

const socials = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'X', href: site.social.x },
]

/** Two lines that morph into a cross. */
function MenuIcon({ open }: { open: boolean }) {
  const line = 'absolute left-0 h-[1.5px] w-full rounded-full bg-ink'
  return (
    <span className="relative block h-3 w-6" aria-hidden="true">
      <motion.span className={line} initial={false} animate={open ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }} transition={spring} />
      <motion.span
        className={line}
        initial={false}
        animate={open ? { top: 5, rotate: -45, width: '100%' } : { top: 10, rotate: 0, width: '65%' }}
        transition={spring}
      />
    </span>
  )
}

/**
 * Full-screen mobile menu. Rendered in a portal on <body> so it is never trapped
 * inside the header (a backdrop-filter on an ancestor would clip a fixed element).
 */
function MobileMenu({ headerHeight, onClose }: { headerHeight: number; onClose: () => void }) {
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    firstLink.current?.focus({ preventScroll: true })
  }, [])

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  }

  return createPortal(
    <motion.div
      id="mobile-menu"
      data-lenis-prevent
      className="fixed inset-x-0 top-0 z-40 h-dvh overflow-y-auto overscroll-contain bg-paper lg:hidden"
      style={{ paddingTop: headerHeight }}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }}
      transition={{ duration: 0.7, ease }}
    >
      <Container className="flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <nav aria-label="Mobile">
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } } }}
          >
            {navLinks.map((link, i) => (
              <motion.li key={link.to} variants={item} className="border-b border-line">
                <NavLink
                  ref={i === 0 ? firstLink : undefined}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  className="group flex min-h-16 items-center gap-5 py-3"
                >
                  {({ isActive }) => (
                    <>
                      <span className="w-6 font-serif text-sm text-muted">0{i + 1}</span>
                      <span
                        className={`flex-1 font-serif text-[2.1rem] leading-none transition-colors duration-300 ${
                          isActive ? 'text-ink' : 'text-ink/55 group-active:text-ink'
                        }`}
                      >
                        {link.label}
                      </span>
                      {isActive ? (
                        <span className="h-2 w-2 rounded-full bg-clay" aria-label="Current page" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-muted" strokeWidth={1.25} aria-hidden="true" />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <motion.div
          className="mt-auto pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
        >
          <Link to="/donate" onClick={onClose} className={`${buttonClass('primary')} h-14 w-full text-base`}>
            Donate
          </Link>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <a
              href={`mailto:${site.contact.email}`}
              className="flex min-h-12 items-center gap-2 rounded-2xl border border-line px-4 text-ink"
            >
              <Mail className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} aria-hidden="true" />
              Email us
            </a>
            <a
              href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
              className="flex min-h-12 items-center gap-2 rounded-2xl border border-line px-4 text-ink"
            >
              <Phone className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.5} aria-hidden="true" />
              Call us
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </motion.div>,
    document.body,
  )
}

export default function Header() {
  const { pathname } = useLocation()
  // The menu belongs to the page it was opened on, so any navigation (links, back button) closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpenOn(null)
  const headerHeight = scrolled ? 64 : 80

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  // While open: lock page scroll, make the page behind inert, close on Escape or when widening to desktop.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const behind = [document.getElementById('main'), document.querySelector('body > #root footer')]
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    const onWiden = (e: MediaQueryListEvent) => e.matches && setOpenOn(null)

    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    behind.forEach((el) => el?.setAttribute('inert', ''))
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onWiden)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      behind.forEach((el) => el?.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onWiden)
      toggle?.focus({ preventScroll: true })
    }
  }, [open, lenis])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
          open
            ? 'border-line bg-paper'
            : scrolled
              ? 'border-line bg-paper/85 backdrop-blur-md'
              : 'border-transparent bg-paper'
        }`}
      >
        <Container
          className={`flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-20'}`}
        >
          <Link to="/" onClick={close} aria-label="Make Our Leaders Foundation, home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {navLinks.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm transition-colors duration-300 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-ink" transition={spring} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Magnetic strength={0.35}>
              <Link to="/donate" className={`${buttonClass('primary')} h-10 px-6`}>
                Donate
              </Link>
            </Magnetic>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <AnimatePresence initial={false}>
              {!open && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="hidden min-[400px]:block"
                >
                  <Link to="/donate" className={`${buttonClass('primary')} h-10 px-5`}>
                    Donate
                  </Link>
                </motion.span>
              )}
            </AnimatePresence>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center rounded-full"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpenOn(open ? null : pathname)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>{open && <MobileMenu headerHeight={headerHeight} onClose={close} />}</AnimatePresence>
    </>
  )
}
