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
  /** When set, the band shows this text instead of a counted number (honest placeholder). */
  placeholder?: string;
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

export interface PlanBlock {
  name: string;
  tagline: string;
  blurb: string;
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const home = {
  hero: {
    lines: ['We make local brands', 'impossible to ignore.'],
    italicWord: 'impossible',
    sub: 'Wings Mediaa is the studio ambitious businesses trust to get found, get followed, and get chosen. Premium marketing, powered by AI, built to grow what you have already built.',
  } satisfies HeroBlock,

  proof: [
    'SOLITAIRE · FINE JEWELLERY · SWAROOP NAGAR',
    'SKIN MANTRAA · SKINCARE CLINIC · KANPUR',
  ],

  selectedWork: [
    {
      slug: 'solitaire',
      title: 'Solitaire',
      caption: '01 · FINE JEWELLERY · SWAROOP NAGAR',
      indexLabel: 'CASE · 001',
      accent: '#FF3D2E',
    },
    {
      slug: 'skin-mantraa',
      title: 'Skin Mantraa',
      caption: '02 · SKINCARE CLINIC · KANPUR',
      indexLabel: 'CASE · 002',
      accent: '#E6FF3C',
    },
  ] satisfies CaseRef[],

  numbers: [
    { value: 2, eyebrow: 'REAL CLIENTS', label: 'SOLITAIRE & SKIN MANTRAA · KANPUR' },
    { value: 1, eyebrow: 'FOUNDER-LED', label: 'ONE STUDIO · ONE ACCOUNTABLE TEAM' },
    { value: 0, placeholder: 'SOON', eyebrow: 'RESULTS', label: 'FIRST METRICS · LANDING NOW' },
  ] as NumberBlock[],

  services: [
    {
      slug: 'social-content',
      word: 'seen.',
      title: 'Social & Content',
      blurb: 'Reels, posts and stories that look premium and earn the second view, turning followers into customers, not just numbers.',
      accentA: '#E6FF3C',
      accentB: '#15151C',
    },
    {
      slug: 'performance-marketing',
      word: 'chosen.',
      title: 'Performance Ads',
      blurb: 'Meta and Google ads aimed at the exact people ready to buy near you. Every rupee tracked, every result shown.',
      accentA: '#FF3D2E',
      accentB: '#15151C',
    },
    {
      slug: 'web-motion',
      word: 'convert.',
      title: 'Websites',
      blurb: 'Fast, beautiful sites that make the right first impression and turn visitors into calls, bookings and orders.',
      accentA: '#FF3D2E',
      accentB: '#E6FF3C',
    },
    {
      slug: 'seo-aeo',
      word: 'found.',
      title: 'SEO & AI Search',
      blurb: 'Be the first name found on Google, Maps, and when people ask ChatGPT or Gemini for a recommendation. Most agencies are not doing the AI part yet. We are.',
      accentA: '#15151C',
      accentB: '#FF3D2E',
    },
    {
      slug: 'whatsapp-automation',
      word: 'reply.',
      title: 'WhatsApp & Automation',
      blurb: 'Instant replies and AI assistants that answer, follow up, and book customers, even while you sleep.',
      accentA: '#E6FF3C',
      accentB: '#FF3D2E',
    },
    {
      slug: 'branding',
      word: 'trusted.',
      title: 'Branding',
      blurb: 'Logo, colour, voice and visuals that make you look like the most trusted name in your category.',
      accentA: '#FF3D2E',
      accentB: '#15151C',
    },
  ] satisfies ServiceBlock[],

  process: [
    {
      n: '01',
      label: 'LISTEN.',
      blurb:
        'A short, focused conversation about your business, your customer, and what you want more of. Free, and genuinely useful even if we never work together.',
    },
    {
      n: '02',
      label: 'PLAN.',
      blurb:
        'A clear, honest plan: what we would do, what it costs, what to expect. If we are not the right fit, we say so.',
    },
    {
      n: '03',
      label: 'BUILD.',
      blurb:
        'We get to work on strategy, content, ads, the system. You see progress, not promises.',
    },
    {
      n: '04',
      label: 'GROW.',
      blurb:
        'As customers come in, we scale what works. Your results become our portfolio, so our interests and yours are the same.',
    },
  ] satisfies ProcessStep[],

  voices: [
    {
      text: 'I started Wings Mediaa because Kanpur is full of brilliant businesses being out-marketed by lesser ones. The difference is never the product. It is who knows how to be seen. We use AI to close that gap, and we give local brands the kind of craft they would otherwise have to go to a metro for. When you work with us, you work with me. Your growth is personal.',
      name: 'Vaibhav Tiwari',
      role: 'Founder',
      company: 'WINGS MEDIAA',
    },
  ] as Voice[],

  problem: {
    eyebrow: 'THE REAL REASON',
    heading: 'Your competitor is not better than you. They are just better at being seen.',
    paragraphs: [
      'You have spent years getting the product right. The service, the quality, the reputation in person. That part, you have already won.',
      'But the customer deciding today is not standing in your shop. They are on a screen, comparing. And the brand that looks sharper, shows up first, and replies faster usually wins, even when their work is ordinary.',
      'That is the gap. Not your business. Your visibility. And it is the most fixable problem you have.',
    ],
  },

  shift: {
    eyebrow: 'WHAT CHANGES',
    heading: 'When the marketing matches the business.',
    paragraphs: [
      'Enquiries arrive on WhatsApp before you open. New customers walk in already sold, because they have watched you online for weeks. Your name is the first one Kanpur sees when it searches for what you sell.',
      'This is not louder posting. It is a system: strategy, content, ads, and search working together. Building that system is the entire job we do.',
    ],
  },

  whyUs: {
    eyebrow: 'WHY US',
    heading: 'Studio-grade work. Built for your market. Powered by AI.',
    items: [
      {
        title: 'AI is our edge, and yours.',
        body: 'We use the smartest AI tools the way a craftsman uses the finest instruments: to deliver more, faster, for less. It is how a Kanpur business gets work that used to cost big-city lakhs, at a price that makes sense.',
      },
      {
        title: 'You get the person who owns the result.',
        body: 'You do not get passed to an intern who forgets your brand by Friday. You work directly with the people accountable for your growth. That access is a premium most agencies cannot offer, and we lead with it.',
      },
      {
        title: 'We understand your customer, because they are ours too.',
        body: 'We build for the way people actually choose a jeweller, a clinic, a boutique. Local intelligence you cannot outsource to a metro.',
      },
      {
        title: 'Clarity, every month.',
        body: 'One simple report: what we did, what it brought in, what is next. No jargon, no hiding. If something is not working, you hear it from us first.',
      },
    ],
  },

  plans: {
    eyebrow: 'HOW TO WORK WITH US',
    heading: 'Start where you are. Scale when you are ready.',
    items: [
      {
        name: 'Get Seen',
        tagline: 'For businesses getting serious online.',
        blurb: 'Your brand active, consistent, and looking premium. Social and content, handled.',
      },
      {
        name: 'Get Customers',
        tagline: 'For businesses ready for real growth.',
        blurb: 'Everything above, plus ads and search that bring measurable enquiries and walk-ins.',
        featured: true,
      },
      {
        name: 'Own Your Market',
        tagline: 'For businesses that intend to be number one in their category.',
        blurb: 'The full system: social, ads, website, automation, AI. We become your marketing department.',
      },
    ] satisfies PlanBlock[],
    footnote: 'Every plan starts with a free conversation.',
  },

  faq: {
    eyebrow: 'STRAIGHT ANSWERS',
    items: [
      {
        q: 'Will this work for my type of business?',
        a: 'If you have customers, you have an audience online: jewellery, skincare, food, fashion, services. Our entire approach is built around local brands, not faraway online startups.',
      },
      {
        q: 'I worked with a marketing person before and got nothing. Why is this different?',
        a: 'You deal directly with the people accountable for your results, and we work month to month. We earn the next month every month. No contract holds you. The work does.',
      },
      {
        q: 'Is a studio expensive?',
        a: 'AI is exactly why we can deliver premium work without premium overhead. There is a plan for most serious budgets. The free conversation finds yours.',
      },
      {
        q: 'I do not understand all this online stuff.',
        a: 'You do not need to. That is the job. We handle it and explain it in plain language, so you always know what is happening, and why.',
      },
      {
        q: 'How fast will I see results?',
        a: 'Ads and enquiries can move within weeks. Trust, followers and search rankings build over months. We tell you honestly what to expect, and when.',
      },
    ] satisfies FaqItem[],
  },

  cta: {
    heading: 'Get found. Get chosen.',
    primary: { label: 'Start your project', href: '/contact' },
    secondary: { label: 'Message us on WhatsApp', href: 'https://wa.me/919999999999' },
  },
};

export type HomeContent = typeof home;
