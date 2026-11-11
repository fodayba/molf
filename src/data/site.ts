/**
 * Central content file for the site.
 *
 * Content is copied from the foundation's previous website (makeourleaders.org,
 * Wayback Machine snapshots from 2026). Photos live in public/images.
 */

export const site = {
  name: 'Make Our Leaders Foundation',
  shortName: 'MOL Foundation',
  tagline: 'Educate a Child, Build a Nation.',
  description:
    'Make Our Leaders (MOL) Foundation is a charitable organisation that supports school-going children in Sierra Leone to achieve their educational objectives.',
  founded: 2013,
  contact: {
    email: 'info@makeourleaders.org',
    /** Main number, used for the "Call us" button in the mobile menu. */
    phone: '+44 7880 344408',
    offices: [
      {
        name: 'United Kingdom',
        note: 'Headquarters',
        address: ['6 Quenington Court, Ebley Close', 'London SE15 6BE'],
        phones: ['+44 7880 344408', '+44 7404 895106'],
      },
      {
        name: 'Sierra Leone',
        note: 'Freetown branch',
        address: ['7 Goderich Road, Lumley', 'Freetown'],
        phones: ['+232 77 744955', '+232 78 554427'],
      },
    ],
    /** Not stated on the previous website. Confirm before publishing. */
    hours: 'Monday to Friday, 9:00 to 17:00 GMT',
  },
  social: {
    facebook: 'https://www.facebook.com/Molfoundation2013/',
    instagram: 'https://www.instagram.com/makeourleaders',
    x: 'https://x.com/makeourleaders',
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
  { value: String(new Date().getFullYear() - site.founded), label: `Years of support since ${site.founded}` },
  { value: '3', label: 'Schools supported in Kambia' },
  { value: '10', label: 'Children fully sponsored by 2014' },
  { value: '2', label: 'Chapters, in London and Freetown' },
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
    slug: 'school-essentials',
    title: 'Scholarships & school essentials',
    summary:
      'Scholarships, uniforms, stationery and other school essentials for the children we sponsor in Kambia.',
    description:
      'Each December we present school essentials to the children we support at Kolenten Secondary, SLMB and KDEC schools in Kambia town, in the northern province where our founder first saw children of school age working instead of learning.',
    highlights: ['Kolenten Secondary, SLMB and KDEC schools', 'Uniforms, stationery and essentials', 'Annual presentation in December'],
    icon: 'graduation',
  },
  {
    slug: 'study-centre',
    title: 'Kambia study & resource centre',
    summary: 'Building a study and resource centre so the children of Kambia have a good place to learn.',
    description:
      'Proceeds from our fundraising events, including our Family & Friends Fun Day, go towards the centre. We made a site visit on 24 December 2019, when completion was planned for December 2020.',
    highlights: ['Kambia, Northern Province', 'Funded by members and patrons', 'Site visit in December 2019'],
    icon: 'landmark',
  },
  {
    slug: 'reach-for-the-stars',
    title: 'Reach for the Stars awards',
    summary: 'Education achievement awards that honour high-achieving students and teachers across Sierra Leone.',
    description:
      'Inspired by Kofi Annan’s words, “Literacy is a bridge from misery to hope”, the awards recognise students and teachers for their hard work through the academic year, to motivate others to strive for excellence.',
    highlights: ['Students and teachers honoured', 'With Frenzy Network SL, Focus 1000 and Pikin Bizness', 'Celebrating academic excellence'],
    icon: 'users',
  },
  {
    slug: 'hunger-and-relief',
    title: 'Fighting hunger & crisis relief',
    summary: 'Food, nutrition and emergency support for children and communities in times of need.',
    description:
      'We donated food and essentials to victims of the Ebola outbreak and the mudslide disaster, provided breakfast with Orange Foundation at Ola During Children’s Hospital in Freetown, and supported the Sierra Leone COVID-19 Rapid Response Team in the UK.',
    highlights: ['Ebola and mudslide relief', 'Breakfast at Ola During Children’s Hospital', 'COVID-19 support in the UK'],
    icon: 'briefcase',
  },
]

export type TeamMember = {
  name: string
  role: string
  bio: string[]
  photo: string
}

export const team: TeamMember[] = [
  {
    name: 'Isatu Mansaray',
    role: 'Founder & Executive Director',
    bio: [
      'Isatu Mansaray is a graduate of the Institute of Public Administration and Management (IPAM) with a degree in Business Administration (Hons), and holds a master’s degree in Corporate Governance (Merit) from London South Bank University.',
      'Highly energetic and forward thinking, with a wealth of knowledge in management, marketing, customer service and banking, and years of experience in humanitarian work. Passionate about giving back and contributing to society.',
    ],
    photo: '/images/team/isatu-mansaray.jpg',
  },
  {
    name: 'Patrick Pratt',
    role: 'Deputy Executive Director',
    bio: [
      'Patrick Alfred Pratt, an ex-military serviceman in the British Army, is an Area Regional Manager for Ultimate Security Services (Bidvest). He is also an experienced Support Worker and a Global Goodwill Ambassador (GGA), UK.',
      'He holds a BSc (Hons) in Security Management and Policies from the Open University, a BA (Hons) in International Relations and Politics from London Metropolitan University, and an MA in Human Rights, International Conflict and Social Justice.',
      'A great team leader with a high level of fitness. Kind hearted, with an excellent sense of humour and a passion for humanity.',
    ],
    photo: '/images/team/patrick-pratt.jpg',
  },
  {
    name: 'Hawa Nadia Sumah',
    role: 'National Co-ordinator',
    bio: [
      'Hawa Sumah is an IT Service Desk Research Analyst with experience in the legal and mining industries.',
      'She has excellent research and analytical skills, is customer oriented, has wide knowledge of Microsoft packages, and is a good team player: hard working, versatile and an all-rounder.',
      'She is keen on fashion design and is studying Garment Construction and Pattern Cutting. Hawa is a graduate of Arden University, UK.',
    ],
    photo: '/images/team/hawa-nadia-sumah.jpg',
  },
  {
    name: 'Patricia Macauley',
    role: 'Financial Secretary',
    bio: [
      'Patricia Macauley is a motivated Compliance Specialist working in the recruitment industry, with previous experience in banking, humanitarian work, customer service and sales.',
      'A graduate of Fourah Bay College, University of Sierra Leone, with a bachelor’s degree in Sociology. A people’s person with great empathy and passion for the less privileged.',
    ],
    photo: '/images/team/patricia-macauley.jpg',
  },
  {
    name: 'Saphibatu Conteh',
    role: 'Secretary',
    bio: [
      'Saphibatu Conteh is a dedicated Customer Service Supervisor who holds a BSc (Hons) in Business Management from the University of Northampton.',
      'She is hard working, flexible, adaptable and responsible, and offers a wide range of skills and experience. She is passionate about young people and believes that securing them a better future secures us a better world.',
    ],
    photo: '/images/team/saphibatu-conteh.jpg',
  },
  {
    name: 'Albert Gbassah',
    role: 'Member',
    bio: [
      'Albert Gbassah holds a Certificate in Community Development and a BSc (Hons) in Social Work. He works as an Advanced Practitioner in a Child Protection Team and has always been passionate about making a difference in people’s lives, through advocacy and empowerment in his community.',
      'He hopes to use this platform to advocate for and challenge policies and legislation on behalf of children and young people in Sierra Leone, in a strategic and operational way that will make a difference in our beloved country.',
    ],
    photo: '/images/team/albert-gbassah.jpg',
  },
  {
    name: 'Balogun S. Lewis',
    role: 'Member',
    bio: [
      'Balogun S. Lewis is the Managing Director of Baltic Interiors: a professional, experienced interior designer with extensive knowledge of all types of floor installation and interior design.',
      'Excellent at customer relations, with great attention to detail, and passionate about giving back to society. A graduate of the London College of Building, Lambeth.',
    ],
    photo: '/images/team/balogun-lewis.jpg',
  },
  {
    name: 'Hawa Turay',
    role: 'Member',
    bio: [
      'Hawa Turay is a compassionate and hard-working person who is always ready to help others. She has worked in the care industry, helping vulnerable adults in their day-to-day lives, and previously worked in a financial institution as a banker.',
    ],
    photo: '/images/team/hawa-turay.jpg',
  },
  {
    name: 'Henrietta Ngegba',
    role: 'Member',
    bio: [
      'Henrietta Ngegba is a Senior Healthcare Professional with over 10 years’ experience in the domiciliary and residential care sector, providing assistance to the elderly with compassion and tact.',
      'She handles difficult situations with great precision, is very organised and committed, and takes a lot of pride in her vocation. She is passionate about doing her bit for a world with equal opportunities for all, regardless of background or circumstances.',
    ],
    photo: '/images/team/henrietta-ngegba.jpg',
  },
  {
    name: 'Patricia Williams-Janneh',
    role: 'Member',
    bio: [
      'Patricia Williams-Janneh is an experienced manager with a history of working in the hospital and healthcare and banking industries, skilled in Microsoft packages, customer service and people management.',
      'A graduate of the Institute of Public Administration and Management (IPAM), University of Sierra Leone.',
    ],
    photo: '/images/team/patricia-williams-janneh.jpg',
  },
]

export const story = [
  'Make Our Leaders (MOL) Foundation was founded in 2013 by Isatu Mansaray, a Sierra Leonean philanthropist who worked as an Assistant Service Manager for one of the health providers in the UK. Ms Mansaray has always had the passion to make a difference in the lives of underprivileged children in her community, from when she lived in Sierra Leone. After high school she worked for Grassroots Empowerment for Self-Reliance, a non-governmental organisation in Sierra Leone, where she continued helping and working with children.',
  'The passion grew stronger on a visit to Kambia town, in the Northern Province of Sierra Leone. There she saw children of school-going age working as labourers on a construction site, carrying firewood or fetching water while their peers were in school. Against this background, Ms Mansaray founded MOL Foundation in London as a non-governmental organisation to support underprivileged children, giving them a fair chance to achieve their educational potential.',
  'MOL Foundation is a registered charity in the UK and Sierra Leone, with a Board of Trustees who supervise the management and affairs of the organisation. Our headquarters is in London, with a branch in Freetown. We are funded by our members through monthly contributions, donations from patrons and fundraising activities.',
]

export const mission =
  'In partnership with our sponsors, we provide educational support in the form of scholarships and other educational essentials, campaign against hunger, and give under-privileged young people opportunities and the hope of becoming future leaders.'

export const vision = 'Every child should be educated and given a fair chance to become self-reliant.'

export const founderStatement = {
  text: 'Education is the greatest asset one can give to anyone. Therefore, do not hesitate to sponsor a child to acquire a lifetime wealth, education, which can benefit not only themselves and their families but the nation as a whole.',
  quote: 'Giving is the master key to success, in all application of human life, for it is in giving that we receive.',
  name: 'Isatu Mansaray',
  role: 'Founder & Executive Director',
}

export const values = [
  {
    title: 'Education',
    text: 'Being born into poverty is no reason to deprive a child of the basic human right to an education.',
  },
  {
    title: 'Nutrition',
    text: 'Children also have a right to healthcare and proper nutrition, which is why we campaign against hunger.',
  },
  {
    title: 'Excellence',
    text: 'We inspire students and teachers to strive for academic excellence by nurturing every gift, talent and potential.',
  },
  {
    title: 'Self-reliance',
    text: 'We empower young people to become independent and useful citizens with a fair chance in life.',
  },
]

export const milestones = [
  { year: '2013', text: 'MOL Foundation founded in London by Isatu Mansaray.' },
  { year: '2014', text: 'Supporting KDEC and SLMB primary schools in Kambia, with 10 children fully sponsored.' },
  { year: '2015', text: 'Uniforms and stationery presented to the children we sponsor.' },
  { year: '2018', text: 'Reach for the Stars achievement awards, with Frenzy Network SL, Focus 1000 and Pikin Bizness.' },
  { year: '2019', text: 'Site visit for the Kambia study and resource centre, and school essentials for three Kambia schools.' },
  { year: '2020', text: '£500 and water donated to the Sierra Leone COVID-19 Rapid Response Team in the UK.' },
  { year: '2021', text: 'Sierra Leone chapter launched, and breakfast for Ola During Children’s Hospital with Orange Foundation.' },
  { year: '2023', text: 'First Youth Education & Empowerment Workshop in the UK.' },
]

export type NewsPost = {
  slug: string
  title: string
  date: string // ISO date
  category: 'Our Work' | 'Community Outreach' | 'Events'
  excerpt: string
  body: string[]
  image: string
  gallery: string[]
}

/** Paths to a post's gallery photos: /images/news/<slug>/01.jpg … */
const photos = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/news/${slug}/${String(i + 1).padStart(2, '0')}.jpg`)

const cover = (slug: string) => `/images/news/${slug}/cover.jpg`

/** Newest first. */
export const newsPosts: NewsPost[] = [
  {
    slug: 'youth-education-empowerment-workshop',
    title: 'Youth Education & Empowerment Workshop',
    date: '2023-01-25',
    category: 'Our Work',
    excerpt: 'Our first workshop on empowering young people in Black and ethnic minority communities in the UK.',
    body: [
      'Make Our Leaders Foundation (MOL) on Saturday 21 January 2023 held its first workshop on empowering youths within the Black and ethnic minority communities in the UK. The aim of the workshop is to educate and empower our children to succeed in their various communities amidst adversity. The session was educative, informative, interactive and useful.',
      'Key outcomes will be posted at the end of our last workshop, which is scheduled for May 2023.',
    ],
    image: cover('youth-education-empowerment-workshop'),
    gallery: photos('youth-education-empowerment-workshop', 18),
  },
  {
    slug: 'new-mol-chapter-in-sierra-leone',
    title: 'New MOL chapter in Sierra Leone',
    date: '2021-12-31',
    category: 'Our Work',
    excerpt: 'On 26 December 2021 we launched the Sierra Leone chapter of MOL Foundation.',
    body: [
      'Make Our Leaders Foundation on Sunday 26 December 2021 launched the Sierra Leone chapter. Many thanks to the families, friends, sponsors and partners of MOL Foundation. Together we can make a difference.',
    ],
    image: cover('new-mol-chapter-in-sierra-leone'),
    gallery: photos('new-mol-chapter-in-sierra-leone', 8),
  },
  {
    slug: 'breakfast-with-orange-foundation',
    title: 'Providing breakfast in partnership with Orange Foundation',
    date: '2021-12-12',
    category: 'Our Work',
    excerpt: 'With Orange Foundation, we presented breakfast items to the children at Ola During Children’s Hospital in Freetown.',
    body: [
      'Make Our Leaders Foundation, in partnership with Orange Foundation, today presented breakfast items to the children in Ola During Children’s Hospital, Freetown.',
      'We believe that breakfast is the most important meal of the day, as it replenishes the supply of glucose to boost energy levels. It also provides essential nutrients needed for good health and general well-being.',
      'We want to extend our appreciation to all those who made this possible. “Each of us can make a difference… Together we make a change.”',
    ],
    image: cover('breakfast-with-orange-foundation'),
    gallery: photos('breakfast-with-orange-foundation', 11),
  },
  {
    slug: 'covid-19-rapid-response-team',
    title: 'Supporting the Sierra Leone COVID-19 Rapid Response Team in the UK',
    date: '2020-04-20',
    category: 'Community Outreach',
    excerpt: 'Our members donated £500 and ten packs of water to the Sierra Leone COVID-19 Rapid Response Team in the UK.',
    body: [
      'The coronavirus outbreak is one of the greatest global health emergencies in living memory, and it has greatly affected the way we all go about our daily lives. In these uncertain times, small acts of kindness can make a huge difference.',
      'For the past six years, Make Our Leaders Foundation has organised a series of programmes here in the UK to support our vision of providing education for underprivileged children in Sierra Leone. We have also made timely interventions during crises in Sierra Leone, donating food and other essentials to victims of the Ebola outbreak and the mudslide disaster.',
      'The ongoing, ever-changing COVID-19 pandemic is no exception. On Saturday 18 April, our network of incredible members and associate members donated £500 (five hundred pounds) and ten packs of water to support the unique and incredible work the Sierra Leone COVID-19 Rapid Response Team is doing in these scary and uncertain times.',
      'The presentation was made by our Director of Operations, Patrick Pratt, and Associate Member Alieu Koroma to Isata Sesay Jalloh, Lead Coordinator of the team. The team provides vital humanitarian and individual support for the most vulnerable in the community. We hope our donation will help make a difference in people’s lives in these unprecedented times.',
      'Long live MOL Foundation!',
    ],
    image: cover('covid-19-rapid-response-team'),
    gallery: [],
  },
  {
    slug: 'kambia-building-project',
    title: 'MOL Foundation building project',
    date: '2020-01-08',
    category: 'Our Work',
    excerpt: 'Thanks to your donations, the children of Kambia will have a study and resource centre.',
    body: [
      'Make Our Leaders Foundation wishes to thank all those who have supported our fundraising activities and made generous donations towards our projects.',
      'Because of your support, it will be possible for the children in Kambia to have a conducive study and resource centre, which will contribute immensely to their learning.',
      'Site visit: 24 December 2019. Proposed building completion: December 2020.',
      'We appeal to all those who believe in us to continue to support us, so that together we can bring this work to completion.',
    ],
    image: cover('kambia-building-project'),
    gallery: photos('kambia-building-project', 11),
  },
  {
    slug: 'annual-school-presentation-2019',
    title: 'Annual school presentation',
    date: '2020-01-03',
    category: 'Our Work',
    excerpt: 'School essentials for the children at Kolenten Secondary, SLMB and KDEC schools in Kambia.',
    body: [
      'As part of our commitment to support children in education, Make Our Leaders Foundation on 24 December 2019 presented school essentials to children at Kolenten Secondary, SLMB and KDEC schools in Kambia town.',
    ],
    image: cover('annual-school-presentation-2019'),
    gallery: photos('annual-school-presentation-2019', 19),
  },
  {
    slug: 'family-friends-fun-day-2019',
    title: 'Family & Friends Fun Day & BBQ 2019',
    date: '2019-06-25',
    category: 'Events',
    excerpt: 'An invitation to one of our signature events, on 6 July 2019 in London.',
    body: [
      'You are cordially invited to join us for our Family & Friends Fun Day on 6 July 2019. This is one of our signature events and, thanks to your patronage, we have always managed to make it a success.',
      'This year, 50% of the entrance fee will go towards entertainment for all the children attending: a bouncy castle, face painting and a tombola, with lots of beautiful prizes to be won. The remaining 50% will go towards the completion of our study centre. Please come out and support a worthy cause.',
      'Entrance fee: adults £10, children free. Bells Gardens Community Centre, 19 Buller Close, London SE15 6UJ, from 14:00 to 22:00.',
      'Make Our Leaders Foundation: Educate a Child, Build a Nation. Let’s build our nation together.',
    ],
    image: cover('family-friends-fun-day-2019'),
    gallery: [],
  },
  {
    slug: 'reach-for-the-stars-awards',
    title: 'Reach for the Stars: Achievement Awards Night',
    date: '2018-11-07',
    category: 'Events',
    excerpt: 'Our education achievement awards honour high-achieving students and teachers across Sierra Leone.',
    body: [
      'The Reach for the Stars Education Achievement Awards are MOL Foundation’s contribution to promoting education in our beloved country, Sierra Leone.',
      'Our inspiration came from Kofi Annan, who once said: “Literacy is a bridge from misery to hope.” And: “Education is a human right with immense power to transform. On its foundation rest the cornerstones of freedom, democracy and sustainable human development.” This is what we aim to achieve by motivating our future leaders to strive for excellence, through the education achievement awards.',
      'The event honours high-achieving students and teachers across the country for their hard work throughout the academic year. We believe such recognition will motivate and inspire others to strive for excellence. We continue to appeal to our patrons to support this initiative celebrating people in academia.',
      'MOL Foundation will be working in collaboration with Frenzy Network Sierra Leone, Focus 1000 and Pikin Bizness to present this event, celebrating children who have done exceptionally well this academic year.',
      'Make Our Leaders Foundation: Educate a Child, Build a Nation. Let’s build our nation together.',
    ],
    image: cover('reach-for-the-stars-awards'),
    gallery: [],
  },
  {
    slug: 'fundraising-gala-dinner-2016',
    title: 'MOL Fundraising Gala Dinner',
    date: '2016-10-25',
    category: 'Events',
    excerpt: 'Thank you to everyone who joined us at our Fundraising Gala Dinner.',
    body: [
      'What a delight it was to see you all at our Fundraising Gala Dinner. Simply put, if it wasn’t for supporters like you, we wouldn’t have made such an impact. We are grateful that you believe in our work. Thank you for supporting us.',
      'Our next fundraising Dinner & Dance is on 8 July 2017. Please save the date.',
      'May God bless us all.',
    ],
    image: cover('fundraising-gala-dinner-2016'),
    gallery: photos('fundraising-gala-dinner-2016', 11),
  },
  {
    slug: 'school-essentials-2015',
    title: 'Presentation of school essentials',
    date: '2015-12-28',
    category: 'Our Work',
    excerpt: 'Uniforms and stationery for the children we sponsor.',
    body: [
      'As we build our relationship with our beneficiaries, we are reminded how much we have to be grateful to God for His provision. The things we take for granted are the same things that many people are trusting God for.',
      'On 22 December, we presented school essentials, including uniforms and stationery, to the children we sponsor. MOL Foundation would like to thank all members and sponsors. Together we made this happen.',
    ],
    image: cover('school-essentials-2015'),
    gallery: photos('school-essentials-2015', 9),
  },
  {
    slug: 'help-a-child-in-need-bbq',
    title: 'Help A Child In Need BBQ',
    date: '2015-07-20',
    category: 'Events',
    excerpt: 'Our annual BBQ raised funds to help more children go to school.',
    body: [
      'On Saturday 18 July, friends of MOL Foundation joined us for our annual BBQ. The theme this year was Help a Child in Need, and proceeds from the event will go towards our goals.',
      'The event was a success thanks to our many patrons, their support and their generous contributions. Thank you all: through us, you have provided the means for more children to go to school. As always, we’re grateful.',
    ],
    image: cover('help-a-child-in-need-bbq'),
    gallery: photos('help-a-child-in-need-bbq', 8),
  },
  {
    slug: 'mol-christmas-2014',
    title: 'A Very MOL Christmas 2014',
    date: '2014-12-22',
    category: 'Community Outreach',
    excerpt: 'Christmas gifts for the children we support in Kambia.',
    body: [
      'On 21 December, Miss Hawa Sumah, our National Coordinator, presented Christmas gifts to our children to put a smile on their faces this Christmas. This was in addition to the rice and cash donations made to the children under our foundation during the three-day lockdown.',
      'We are currently working in Kambia town, supporting two primary schools (KDEC and SLMB), with 10 children entirely under our umbrella. Our vision is that every child must go to school.',
      'In partnership with our sponsors, we aim to provide educational support in the form of scholarships and other educational essentials.',
      'We would like to thank our board members, Miss Sumah and Mr Nabie Turay (our Local Coordinator). MOL Foundation could not have done this without your support. Let us continue to work together for the good of the children of Sierra Leone.',
    ],
    image: cover('mol-christmas-2014'),
    gallery: photos('mol-christmas-2014', 8),
  },
]

/** Ways the foundation raises funds (from the previous "Support Us" page). */
export const fundraisingActivities = [
  'Members’ monthly contributions',
  'Day outings',
  'Dinner and dance',
  'Field trips',
  'Barbecue fun day events',
  'Appeal letters for financial support',
]

export type FoundationEvent = {
  title: string
  date: string // ISO date
  time: string
  location: string
  text: string
}

/** Most recent events listed on the previous website. */
export const pastEvents: FoundationEvent[] = [
  {
    title: 'Outing to Southend Beach',
    date: '2019-07-20',
    time: '09:00',
    location: 'Southend-on-Sea',
    text: 'A great day out for family and friends of Make Our Leaders Foundation. The coach departed from Burgess Park at 9am prompt.',
  },
  {
    title: 'Family & Friends Fun Day & BBQ',
    date: '2019-07-06',
    time: '14:00 to 22:00',
    location: 'Bells Gardens Community Centre, 19 Buller Close, London SE15 6UJ',
    text: 'One of our signature events. Half of the entrance fee paid for children’s entertainment and half went towards completing our study centre.',
  },
]

/** Donation details shown on the Donate page. */
export const donationMethods = {
  bank: {
    bankName: 'Santander',
    accountName: 'MOL LIMITED',
    accountNumber: '81397441',
    sortCode: '09-01-28',
  },
}
