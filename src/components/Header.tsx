import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { navLinks } from '../data/site.ts'
import { ease } from '../lib/motion.ts'
import { buttonClass } from '../lib/utils.ts'
import Logo from './Logo.tsx'
import { Magnetic } from './motion.tsx'
import { Container } from './ui.tsx'

const spring = { type: 'spring', stiffness: 380, damping: 32 } as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const close = () => setOpen(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  // Freeze page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent bg-paper'
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-20'}`}
      >
        <Link to="/" onClick={close} aria-label="Make Our Leaders Foundation, home">
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
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
                      transition={spring}
                    />
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

        <button
          type="button"
          className="-mr-2 p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'open'}
              className="block"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {open ? <X className="h-6 w-6" strokeWidth={1.25} /> : <Menu className="h-6 w-6" strokeWidth={1.25} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 overflow-y-auto bg-paper lg:hidden"
            style={{ top: scrolled ? 64 : 80 }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <Container className="flex min-h-full flex-col py-8">
              <motion.ul
                className="divide-y divide-line border-y border-line"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                    }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={close}
                      className={({ isActive }) =>
                        `block py-5 font-serif text-3xl transition-colors ${isActive ? 'text-ink' : 'text-ink/50'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.55 }}
              >
                <Link to="/donate" onClick={close} className={`${buttonClass('primary')} mt-10 w-full`}>
                  Donate
                </Link>
              </motion.div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
