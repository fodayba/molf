import { Check } from 'lucide-react'
import { ProgramArt } from '../components/art.tsx'
import { ButtonLink, Container, Eyebrow, PageHeader, Section } from '../components/ui.tsx'
import { programs, site } from '../data/site.ts'

export default function Programs() {
  return (
    <>
      <title>{`Programmes | ${site.name}`}</title>
      <PageHeader
        eyebrow="Programmes"
        title="Leadership, practised at every stage."
        intro="From secondary school classrooms to community town halls, each programme builds on the last."
        motif={1}
      />

      <Container>
        {programs.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="grid scroll-mt-20 items-center gap-10 border-b border-line py-20 last:border-b-0 sm:py-24 lg:grid-cols-12 lg:gap-16"
          >
            <div
              className={`flex aspect-[4/3] items-center justify-center rounded-3xl bg-sand bg-gara-ink lg:col-span-6 ${
                i % 2 === 1 ? 'lg:order-2 lg:col-start-7' : ''
              }`}
            >
              <ProgramArt index={i} className="h-3/5 w-auto" />
            </div>
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
              <Eyebrow>Programme 0{i + 1}</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.1] sm:text-5xl">{p.title}</h2>
              <p className="mt-6 text-lg text-ink">{p.summary}</p>
              <p className="mt-4">{p.description}</p>
              <ul className="mt-8 border-t border-line">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 border-b border-line py-3.5 text-sm text-ink">
                    <Check className="h-4 w-4 text-forest" strokeWidth={1.5} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Container>

      <Section tone="indigo">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-[1.1] text-paper sm:text-5xl">Bring a programme to your community.</h2>
            <p className="mt-6 text-lg">
              We partner with schools, community organisations and businesses across Sierra Leone.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contact?subject=Partnership" variant="light">
              Partner with us
            </ButtonLink>
            <ButtonLink to="/donate" variant="outline-light">
              Fund a programme
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
