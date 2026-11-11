import { HeaderMotif } from '../components/art.tsx'
import { Magnetic, Reveal, SplitHeadline } from '../components/motion.tsx'
import { ButtonLink, Container, Eyebrow } from '../components/ui.tsx'
import { site } from '../data/site.ts'

export default function NotFound() {
  return (
    <>
      <title>{`Page not found | ${site.name}`}</title>
      <Container className="grid min-h-[70vh] items-center gap-12 py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal y={12}>
            <Eyebrow>Error 404</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-6xl sm:text-7xl">
            <SplitHeadline segments={[{ text: 'This page has' }, { text: 'moved on.', italic: true, className: 'text-clay' }]} />
          </h1>
          <Reveal delay={0.4} as="p" className="mt-6 max-w-md text-lg">
            The page you’re looking for doesn’t exist or is no longer here.
          </Reveal>
          <Reveal delay={0.55} className="mt-10 inline-block">
            <Magnetic>
              <ButtonLink to="/">Return home</ButtonLink>
            </Magnetic>
          </Reveal>
        </div>
        <HeaderMotif variant={3} className="mx-auto w-full max-w-xs lg:col-span-4 lg:col-start-9" />
      </Container>
    </>
  )
}
