/**
 * Site-wide canonical constants. One place to change the URL + social handles
 * before deploy. Consumed by sitemap, robots, manifest, JSON-LD, OG images.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wingsmediaa.com',
  name: 'Wings Mediaa',
  shortName: 'Wings · Mediaa',
  tagline: 'The AI-powered creative and marketing studio for brands that refuse to be ignored.',
  description:
    'We make local brands impossible to ignore. Premium social, ads, websites and AI search, powered by AI. Founder-led, Kanpur.',
  locale: 'en_IN',
  country: 'IN',
  email: 'hello@wingsmediaa.com',
  whatsapp: '+919999999999',
  founder: 'Vaibhav Tiwari',
  foundedYear: 2025,
  social: {
    instagram: 'https://instagram.com/wingsmediaa',
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
