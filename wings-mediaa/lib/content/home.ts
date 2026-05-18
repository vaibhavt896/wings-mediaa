/**
 * Homepage content — single source of truth for v1 (hardcoded demo data).
 * Phase D will swap this for `import { home } from '@/lib/sanity'` with the same shape.
 * Keep types stable; field names mirror the planned Sanity `homepage` singleton.
 */

export interface HeroBlock {
  lines: string[];
  italicWord: string;
  sub: string;
}

export interface CaseRef {
  slug: string;
  title: string;
  caption: string;
  indexLabel: string;
  accent: string;
}

export interface NumberBlock {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  eyebrow: string;
  label: string;
}

export interface ServiceBlock {
  slug: string;
  word: string; // pinned headline word
  title: string;
  blurb: string;
  accentA: string;
  accentB: string;
}

export interface ProcessStep {
  n: string;
  label: string;
  blurb: string;
}

export interface Voice {
  text: string;
  name: string;
  role: string;
  company: string;
  lime?: boolean;
}

export const home = {
  hero: {
    lines: ['We make brands', 'move — in feeds,', 'in funnels, on screen.'],
    italicWord: 'move',
    sub: 'A motion-led studio for D2C, brand and performance. We grow brands by making attention move — in feeds, in funnels, and on the page itself.',
  } satisfies HeroBlock,

  proof: [
    'KORA · NUDE',
    'TRANQUIL TEAS',
    'IXANA',
    'VALOR',
    'SOLEIL',
    'OBSCURA',
    'NORTH FOLK',
    'AMBER & ASH',
  ],

  selectedWork: [
    {
      slug: 'kora',
      title: 'Kora — D2C launch reel',
      caption: '01 · D2C · MUMBAI · ROAS 7.4×',
      indexLabel: 'CASE · 001',
      accent: '#FF3D2E',
    },
    {
      slug: 'tranquil-teas',
      title: 'Tranquil Teas — Funnel rewrite',
      caption: '02 · D2C · 2026 · +312% REVENUE',
      indexLabel: 'CASE · 002',
      accent: '#E6FF3C',
    },
    {
      slug: 'valor',
      title: 'Valor — Brand film',
      caption: '03 · BRAND FILM · 30s SPOT',
      indexLabel: 'CASE · 003',
      accent: '#FF884F',
    },
    {
      slug: 'ixana',
      title: 'Ixana — Wearable launch',
      caption: '04 · TECH · MUMBAI · 1.5M IMPRESSIONS',
      indexLabel: 'CASE · 004',
      accent: '#15151C',
    },
  ] satisfies CaseRef[],

  numbers: [
    { value: 7.4, suffix: '×', eyebrow: 'ROAS', label: 'AVERAGE · D2C · 2025–2026' },
    { value: 312, prefix: '+', suffix: '%', eyebrow: 'REVENUE', label: 'CLIENT GROWTH · 12 WEEKS' },
    { value: 1500000, suffix: '+', eyebrow: 'IMPRESSIONS', label: 'CAMPAIGN-AVG · MONTHLY' },
  ] as NumberBlock[],

  services: [
    {
      slug: 'performance-marketing',
      word: 'convert.',
      title: 'Performance Marketing',
      blurb: 'Paid media built around your funnel, not the platform. Meta, Google, programmatic.',
      accentA: '#FF3D2E',
      accentB: '#15151C',
    },
    {
      slug: 'social-content',
      word: 'feel.',
      title: 'Social & Content',
      blurb: 'Short-form that earns the second view. Always-on systems for Instagram, TikTok, YouTube.',
      accentA: '#E6FF3C',
      accentB: '#15151C',
    },
    {
      slug: 'branding',
      word: 'stick.',
      title: 'Branding',
      blurb: 'Identity systems with feel. Naming, wordmarks, visual language, voice.',
      accentA: '#FF884F',
      accentB: '#15151C',
    },
    {
      slug: 'web-motion',
      word: 'move.',
      title: 'Web & Motion',
      blurb: 'Sites that load fast and behave like films. Next.js, Lenis, GSAP, WebGL.',
      accentA: '#FF3D2E',
      accentB: '#E6FF3C',
    },
    {
      slug: 'seo-aeo',
      word: 'find.',
      title: 'SEO / AEO',
      blurb: 'Discoverability for the search box and the chat box. Schema, structure, signal.',
      accentA: '#15151C',
      accentB: '#FF3D2E',
    },
  ] satisfies ServiceBlock[],

  process: [
    {
      n: '01',
      label: 'LISTEN.',
      blurb:
        'A 90-minute deep-listen — your goals, your audience, the constraints nobody else asked about.',
    },
    {
      n: '02',
      label: 'SKETCH.',
      blurb:
        'Two creative routes, drawn fast, presented loud. The point is to find the spine, not the polish.',
    },
    {
      n: '03',
      label: 'BUILD.',
      blurb:
        'Production at agency speed with studio craft. Daily standups, weekly screenings, no surprises.',
    },
    {
      n: '04',
      label: 'SHIP.',
      blurb:
        'Launch is day one, not day zero. Performance is tracked, creative is iterated, the work keeps moving.',
    },
  ] satisfies ProcessStep[],

  voices: [
    {
      text: 'Working with Wings Mediaa was the first time our creative agency understood the funnel.',
      name: 'Priya M',
      role: 'CMO',
      company: 'TRANQUIL TEAS',
    },
    {
      text: "They didn't just ship a film. They shipped a feeling that our customers screenshot and post back at us.",
      name: 'Aman Rao',
      role: 'Founder',
      company: 'KORA D2C',
      lime: true,
    },
  ] satisfies Voice[],

  cta: {
    heading: 'Make it move.',
    primary: { label: 'Start a project', href: '/contact' },
    secondary: { label: 'Book a call →', href: '/contact#calendar' },
  },
};

export type HomeContent = typeof home;
