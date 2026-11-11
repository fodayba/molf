import { ButtonLink, Container, Eyebrow } from '../components/ui.tsx'
import { site } from '../data/site.ts'

export default function NotFound() {
  return (
    <>
      <title>{`Page not found | ${site.name}`}</title>
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 text-6xl sm:text-7xl">This page has moved on.</h1>
        <p className="mt-6 max-w-md text-lg">The page you’re looking for doesn’t exist or is no longer here.</p>
        <ButtonLink to="/" className="mt-10">
          Return home
        </ButtonLink>
      </Container>
    </>
  )
}
