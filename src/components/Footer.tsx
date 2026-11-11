import { Link } from 'react-router'
import { navLinks, site } from '../data/site.ts'
import Logo from './Logo.tsx'
import { Container } from './ui.tsx'

const currentYear = new Date().getFullYear()

const socialLinks = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'X', href: site.social.x },
]

const headingClass = 'text-[0.7rem] font-medium tracking-[0.22em] text-paper/40 uppercase'
const linkClass = 'text-sm text-paper/70 transition-colors duration-300 hover:text-paper'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <div className="cloth-stripe h-2" aria-hidden="true" />
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-20 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-5">
          <Logo light />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-paper/60">{site.description}</p>
        </div>

        <div className="lg:col-span-2 lg:col-start-7">
          <h2 className={`${headingClass} font-sans`}>Explore</h2>
          <ul className="mt-6 space-y-3">
            {[...navLinks.slice(1), { to: '/donate', label: 'Donate' }].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className={`${headingClass} font-sans`}>Follow</h2>
          <ul className="mt-6 space-y-3">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <h2 className={`${headingClass} font-sans`}>Contact</h2>
          <address className="mt-6 space-y-4 text-sm not-italic">
            {site.contact.offices.map((office) => (
              <p key={office.name}>
                <span className="block text-paper">{office.name}</span>
                {office.address.join(', ')}
                <a href={`tel:${office.phones[0].replace(/[^+\d]/g, '')}`} className={`${linkClass} block`}>
                  {office.phones[0]}
                </a>
              </p>
            ))}
            <a href={`mailto:${site.contact.email}`} className={`${linkClass} block break-all`}>
              {site.contact.email}
            </a>
          </address>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-8 text-xs text-paper/40 sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {site.name}
          </p>
          <p>London, United Kingdom · Freetown, Sierra Leone</p>
        </Container>
      </div>
    </footer>
  )
}
