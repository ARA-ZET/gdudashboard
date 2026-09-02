/**
 * Golden Diamond Upholstery — single source of truth for business data.
 *
 * ⚠️  PLACEHOLDERS: The contact details, testimonials, project case studies and
 *     statistics below are illustrative placeholders drawn from the design mockups.
 *     Replace the items marked `PLACEHOLDER` with your real business information,
 *     genuine client reviews, and real project photos before going live.
 *     Do NOT publish invented reviews or statistics as if they were real.
 */

export const site = {
  name: 'Golden Diamond Upholstery',
  shortName: 'Golden Diamond',
  tagline: 'Reupholstery, repairs & custom furniture in Cape Town',

  /**
   * SEO title for the home page. Kept under ~60 characters so Google shows it
   * whole, and led by the phrase people actually search ("upholstery Cape
   * Town") rather than by the brand, which nobody is searching for yet.
   */
  seoTitle: 'Upholstery Cape Town | Reupholstery & Repairs | Golden Diamond',

  /**
   * Meta description — under ~155 characters so it is not truncated in results.
   * Names the service, the place, and the reason to click.
   */
  metaDescription:
    'Expert reupholstery, upholstery repair and custom furniture in Cape Town. Free quotes, free home visits, collection and delivery across the Cape.',

  /** Longer prose description — used for schema.org and the web app manifest. */
  description:
    'Golden Diamond Upholstery is a Cape Town upholstery workshop specialising in reupholstery, upholstery repair, custom headboards, loose covers, antique restoration and custom furniture for homes and businesses across the Western Cape.',
  foundedYear: 2004, // PLACEHOLDER — confirm your real founding year
  // The canonical site URL. Overridden at build/runtime by NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://goldendiamondupholstery.co.za',

  contact: {
    phone: '+27 81 572 3431',
    phoneHref: '27815723431',
    whatsapp: '+27 81 572 3431',
    whatsappHref: '27815723431',
    // Blank until a mailbox exists on the domain — the MX record currently
    // points at the web server, so anything sent here bounces. Every place that
    // shows an email address hides it while this is empty; fill it in to
    // restore the footer row, the contact card and the schema.org field.
    email: '',
    address: {
      street: 'Khayelitsha Training Centre, Shop 2, Block C',
      area: '50 Lwandle Rd, Village 2 North',
      city: 'Cape Town',
      region: 'Western Cape',
      postalCode: '7784',
      country: 'ZA',
    },
    // Approx. geo for Khayelitsha — update to your exact shop location if needed.
    geo: { lat: -34.0345, lng: 18.6776 },
    hours: [
      { days: 'Monday – Friday', time: '09:00 – 17:00' },
      { days: 'Saturday', time: '09:00 – 13:00' },
      { days: 'Sunday & Public Holidays', time: 'By appointment' },
    ],
    // Structured opening hours for schema.org (24h, ISO day codes).
    openingHours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
      { days: ['Saturday'], opens: '09:00', closes: '13:00' },
    ],
  },

  /**
   * The studio that designed and built this site. Credited in the site footer
   * and on quote/invoice documents.
   * `logoDark` is the dark artwork for light surfaces; `logoLight` is the white
   * artwork for dark surfaces.
   */
  developer: {
    name: 'ARAZET DESIGN',
    url: 'https://arazetdesign.co.za/portfolio',
    logoDark: '/logo/arazet-long-dark.webp',
    logoLight: '/logo/arazet-long-white.webp',
  },

  social: {
    facebook: 'https://facebook.com/', // PLACEHOLDER
    instagram: 'https://instagram.com/', // PLACEHOLDER
    google: 'https://www.google.com/maps', // PLACEHOLDER — Google Business Profile
  },

  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Residential', href: '/residential' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Contact', href: '/contact' },
  ],

  // High-level trust stats shown across the site.
  // PLACEHOLDER numbers — update to your real figures.
  stats: [
    { value: '20+', label: 'Years of craft', sub: 'Serving the Cape since 2004' },
    { value: '3,500+', label: 'Pieces restored', sub: 'Homes & businesses' },
    { value: '150+', label: 'Commercial projects', sub: 'Hotels, restaurants & offices' },
    { value: 'Lifetime', label: 'Frame guarantee', sub: 'On kiln-dried hardwood frames' },
  ],

  // Suburbs & areas served — used for local SEO copy and schema areaServed.
  serviceAreas: [
    // Local catchment first — the workshop is in Khayelitsha, and these are the
    // nearest searches, so they are both the most winnable and the cheapest to serve.
    'Khayelitsha', 'Mitchells Plain', 'Mfuleni', 'Delft', 'Blue Downs', 'Eerste River',
    'Strand', 'Gordon\u2019s Bay', 'Somerset West', 'Kuils River', 'Brackenfell',
    // Southern Suburbs
    'Wynberg', 'Claremont', 'Kenilworth', 'Rondebosch', 'Newlands', 'Constantia',
    'Bergvliet', 'Tokai', 'Plumstead', 'Diep River', 'Muizenberg', 'Athlone',
    // City Bowl & Atlantic Seaboard
    'City Bowl', 'Woodstock', 'Observatory', 'Sea Point', 'Green Point', 'Camps Bay', 'Hout Bay',
    // Northern Suburbs & beyond
    'Pinelands', 'Goodwood', 'Parow', 'Bellville', 'Durbanville', 'Milnerton',
    'Century City', 'Table View', 'Kraaifontein', 'Stellenbosch',
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
