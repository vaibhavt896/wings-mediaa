/**
 * Site-wide canonical constants. One place to change the URL + social handles
 * before deploy. Consumed by sitemap, robots, manifest, JSON-LD, OG images.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wingsmediaa.com',
  name: 'Wings Mediaa',
  shortName: 'Wings · Mediaa',
  tagline: 'The hyper-fast, AI-powered agency that delivers actual results for brands that refuse to be ignored.',
  description:
    'We make brands impossible to ignore. A hyper-fast AI-powered agency delivering actual results across social, performance ads, web, and AI search. Results-driven, Kanpur.',
  locale: 'en_IN',
  country: 'IN',
  email: 'contact@wingsmediaa.com',
  whatsapp: '+919580467746',
  phone: '+919580467746',
  secondaryPhone: '+919897030027',
  founder: 'Vaibhav Tiwari',
  foundedYear: 2025,
  social: {
    instagram: 'https://www.instagram.com/wingsmediaa.in/',
    facebook: 'https://facebook.com/wingsmediaa',
    linkedin: 'https://linkedin.com/company/wingsmediaa',
  },
  address: {
    streetAddress: 'Tilak Nagar',
    addressLocality: 'Kanpur',
    addressRegion: 'UP',
    postalCode: '208002',
    addressCountry: 'IN',
  },
  themeColor: '#0A0A0F',
  brandAccent: '#FF3D2E',
} as const;

export type Site = typeof site;
