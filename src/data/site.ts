/**
 * Central content file for the site.
 *
 * Everything in this file is PLACEHOLDER content. Replace it with the
 * foundation's real details (mission, programmes, team, contact info, bank
 * details) before publishing. Values in [square brackets] must be replaced.
 */

export const site = {
  name: 'Make Our Leaders Foundation',
  shortName: 'MOLF',
  tagline: 'Raising ethical, capable leaders for Sierra Leone.',
  description:
    'Make Our Leaders Foundation is a Freetown-based non-profit that equips young Sierra Leoneans with the skills, character and opportunities to lead in their communities and beyond.',
  founded: 2020,
  contact: {
    address: ['[Street address]', 'Freetown', 'Sierra Leone'],
    phone: '+232 [XX XXX XXX]',
    email: 'info@[makeourleaders.org]',
    hours: 'Monday to Friday, 9:00 to 17:00 GMT',
  },
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    x: 'https://x.com/',
    linkedin: 'https://linkedin.com/',
  },
  /**
   * Formspree form ID for the contact and volunteer forms.
   * Create a form at https://formspree.io, then set VITE_FORMSPREE_ID in a
   * .env.local file. The forms show a setup notice until it is set.
   */
  formspreeId: import.meta.env.VITE_FORMSPREE_ID as string | undefined,
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programmes', label: 'Programmes' },
  { to: '/news', label: 'News' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/contact', label: 'Contact' },
] as const

export const stats = [
  { value: '1,200+', label: 'Young people trained' },
  { value: '45', label: 'Partner schools' },
  { value: '16', label: 'Districts reached' },
  { value: '300+', label: 'Active volunteers' },
]

export type Program = {
  slug: string
  title: string
  summary: string
  description: string
  highlights: string[]
  icon: 'graduation' | 'users' | 'briefcase' | 'landmark'
}

export const programs: Program[] = [
  {
    slug: 'youth-leadership-academy',
    title: 'Youth Leadership Academy',
    summary:
      'A year-long programme for secondary school students on public speaking, critical thinking and ethical decision-making.',
    description:
      'Students meet weekly in small cohorts guided by trained facilitators. Each cohort designs and delivers a community project, putting leadership into practice from day one.',
    highlights: ['Ages 14 to 19', 'Weekly cohort sessions', 'Community capstone project'],
    icon: 'graduation',
  },
  {
    slug: 'mentorship-network',
    title: 'Mentorship Network',
    summary:
      'Pairs emerging leaders with experienced professionals across Sierra Leone and the diaspora.',
    description:
      'Mentees receive one-to-one guidance on education, careers and personal growth through monthly meetings, in person or online.',
    highlights: ['One-to-one mentoring', 'Local and diaspora mentors', '12-month commitment'],
    icon: 'users',
  },
  {
    slug: 'skills-for-work',
    title: 'Skills for Work',
    summary:
      'Practical training in digital literacy, entrepreneurship and financial skills for young adults.',
    description:
      'Short, hands-on courses help young people find jobs or start businesses. Graduates get ongoing support and access to our partner network.',
    highlights: ['Digital and business skills', 'Ages 18 to 30', 'Job and enterprise support'],
    icon: 'briefcase',
  },
  {
    slug: 'civic-engagement',
    title: 'Civic Engagement',
    summary:
      'Community forums and workshops that help citizens understand governance and hold leaders accountable.',
    description:
      'We run town halls, debates and civic education sessions with community leaders, building trust and participation in local decision-making.',
    highlights: ['Town halls and debates', 'Civic education', 'Community partnerships'],
    icon: 'landmark',
  },
]

export type TeamMember = {
  name: string
  role: string
  bio: string
}

export const team: TeamMember[] = [
  {
    name: '[Full Name]',
    role: 'Founder & Executive Director',
    bio: 'Leads the foundation’s strategy and partnerships. Replace with a short bio.',
  },
  {
    name: '[Full Name]',
    role: 'Programmes Director',
    bio: 'Oversees the design and delivery of all programmes. Replace with a short bio.',
  },
  {
    name: '[Full Name]',
    role: 'Finance & Operations Lead',
    bio: 'Manages finances, compliance and day-to-day operations. Replace with a short bio.',
  },
  {
    name: '[Full Name]',
    role: 'Community Outreach Coordinator',
    bio: 'Builds relationships with schools and communities. Replace with a short bio.',
  },
]

export const values = [
  {
    title: 'Integrity',
    text: 'We act honestly and transparently, and we teach leadership grounded in strong ethics.',
  },
  {
    title: 'Service',
    text: 'Leadership means serving others. Our programmes put community needs first.',
  },
  {
    title: 'Inclusion',
    text: 'Leaders come from every background. We reach young people across all districts, genders and abilities.',
  },
  {
    title: 'Excellence',
    text: 'We hold ourselves and our participants to high standards and measure our impact.',
  },
]

export const milestones = [
  { year: '2020', text: 'Foundation established in Freetown.' },
  { year: '2021', text: 'First Youth Leadership Academy cohort graduates.' },
  { year: '2023', text: 'Mentorship Network launched with diaspora partners.' },
  { year: '2025', text: 'Programmes expanded to all 16 districts.' },
]

export type NewsPost = {
  slug: string
  title: string
  date: string // ISO date
  category: string
  excerpt: string
  body: string[]
}

export const newsPosts: NewsPost[] = [
  {
    slug: 'academy-cohort-graduates',
    title: 'Our latest Youth Leadership Academy cohort graduates',
    date: '2026-10-18',
    category: 'Programmes',
    excerpt:
      'Students from schools across Freetown presented their community projects at this year’s graduation ceremony.',
    body: [
      'This is placeholder text for a news article. Replace it with the real story.',
      'Describe the event, quote participants and partners, and share photos to bring the story to life.',
    ],
  },
  {
    slug: 'mentorship-network-expands',
    title: 'Mentorship Network welcomes new diaspora mentors',
    date: '2026-08-02',
    category: 'Partnerships',
    excerpt:
      'Professionals from the Sierra Leonean diaspora have joined to mentor emerging leaders back home.',
    body: [
      'This is placeholder text for a news article. Replace it with the real story.',
      'Explain the partnership, who is involved and how readers can take part.',
    ],
  },
  {
    slug: 'civic-forum-bo',
    title: 'Community forum brings citizens and leaders together',
    date: '2026-05-21',
    category: 'Civic Engagement',
    excerpt:
      'Residents and local officials met for an open dialogue on youth priorities and accountability.',
    body: [
      'This is placeholder text for a news article. Replace it with the real story.',
      'Summarise the key discussions, outcomes and next steps from the forum.',
    ],
  },
]

/** Donation details shown on the Donate page. Replace with real accounts. */
export const donationMethods = {
  bank: {
    bankName: '[Bank name]',
    accountName: 'Make Our Leaders Foundation',
    accountNumber: '[Account number]',
    branch: '[Branch], Freetown',
    swift: '[SWIFT/BIC code]',
  },
  mobileMoney: [
    { provider: 'Orange Money', number: '+232 [XX XXX XXX]', name: 'Make Our Leaders Foundation' },
    { provider: 'Afrimoney', number: '+232 [XX XXX XXX]', name: 'Make Our Leaders Foundation' },
  ],
}

export const impactTiers = [
  { amount: 'Le 250', text: 'Provides learning materials for one Academy student for a term.' },
  { amount: 'Le 1,000', text: 'Funds a community civic forum for 50 participants.' },
  { amount: 'Le 5,000', text: 'Sponsors one student through a full year of the Academy.' },
]
