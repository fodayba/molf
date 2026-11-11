import { useLenis } from 'lenis/react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { ease } from '../lib/motion.ts'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
import SmoothScroll from './SmoothScroll.tsx'

function Page() {
  const location = useLocation()
  const outlet = useOutlet()
  const lenis = useLenis()

  // Jump to the top only once the old page has faded out, so it never visibly flicks.
  const resetScroll = () => {
    if (window.location.hash) return
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={resetScroll}>
      <motion.main
        key={location.pathname}
        id="main"
        className="flex-1"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.3, ease: 'easeIn' } }}
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  )
}

export default function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <div className="flex min-h-screen flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <Header />
          <Page />
          <Footer />
        </div>
      </SmoothScroll>
    </MotionConfig>
  )
}
