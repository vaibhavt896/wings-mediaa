/**
 * Site-wide canonical constants. One place to change the URL + social handles
 * before deploy. Consumed by sitemap, robots, manifest, JSON-LD, OG images.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wingsmediaa.com',
  name: 'Wings Mediaa',
  shortName: 'Wings · Mediaa',
  tagline: 'A motion-led studio for D2C, brand and performance.',
  description:
    'Wings Mediaa is a motion-led studio for D2C, brand and performance. We grow brands by making attention move — in feeds, in funnels, and on the page itself.',
  locale: 'en_IN',
  country: 'IN',
  email: 'hello@wingsmediaa.com',
  whatsapp: '+919999999999',
  founder: 'Vaibhav Tiwari',
  foundedYear: 2022,
  social: {
    instagram: 'https://instagram.com/wingsmediaa',
    linkedin: 'https://linkedin.com/company/wingsmediaa',
    x: 'https://x.com/wingsmediaa',
    youtube: 'https://youtube.com/@wingsmediaa',
  },
  address: {
    streetAddress: 'Studio A, 3rd floor, Bandra West',
    addressLocality: 'Mumbai',
    addressRegion: 'MH',
    postalCode: '400050',
    addressCountry: 'IN',
  },
  themeColor: '#0A0A0F',
  brandAccent: '#FF3D2E',
} as const;

export type Site = typeof site;
