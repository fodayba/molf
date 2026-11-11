import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** Inertial smooth scrolling via Lenis. Off for visitors who prefer reduced motion. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{children}</>
  return (
    <ReactLenis root options={{ lerp: 0.09, autoRaf: true, anchors: true }}>
      {children}
    </ReactLenis>
  )
}
