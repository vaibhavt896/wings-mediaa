/**
 * Service pages — single source of truth.
 * Shape mirrors `studio/schemas/service.ts`. Phase F migration is one import change.
 *
 * Each service has its own art-direction register (light vs dark canvas, accent palette).
 * The `demoKey` tells the page which demo component to render — keeps the page template
 * generic while every demo gets its own distinctive component.
 */

export type ServiceSlug =
  | 'performance-marketing'
  | 'social-content'
  | 'branding'
  | 'web-motion'
  | 'seo-aeo';

export type DemoKey =
  | 'performance'
  | 'social'
  | 'branding'
  | 'web-motion'
  | 'seo';

export type Register = 'ink' | 'bone';

export interface ServiceContent {
  slug: ServiceSlug;
  title: string;
  /** Hero claim lines. The italic word is rendered in crimson serif. */
  heroLines: string[];
  italicWord: string;
  /** Sub copy under the hero. */
  sub: string;
  /** Short eyebrow shown above the hero. */
  eyebrow: string;
  /** Demo component key — picks the right demo from `components/service/demos/`. */
  demoKey: DemoKey;
  /** "We make the demo the proof" — short caption above the pinned demo. */
  demoCaption: string;
  /** Deliverable tags rendered as mono pills. */
  deliverables: string[];
  /** Canvas register for the interior. Each service gets its own. */
  register: Register;
  /** Primary accent (defaults shown — used for gradients and chip accents). */
  accentA: string;
  accentB: string;
  /** Order in the services index (lower = earlier). */
  order: number;
  /** Short blurb for the index page card. */
  indexBlurb: string;
}

export const services: ServiceContent[] = [
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    eyebrow: 'SERVICE 01 / 05',
    heroLines: ['We make funnels', 'convert.'],
    italicWord: 'convert.',
    sub: 'Paid media built around your funnel — not the platform. Meta, Google, programmatic, retail. Performance as a craft, not a control panel.',
    demoKey: 'performance',
    demoCaption: 'A live-feeling dashboard. Scroll the page; the campaign runs.',
    deliverables: [
      'Media planning',
      'Creative testing',
      'Funnel design',
      'Conversion tracking',
      'Attribution',
      'Reporting',
      'Audience strategy',
    ],
    register: 'ink',
    accentA: '#FF3D2E',
    accentB: '#15151C',
    order: 1,
    indexBlurb:
      'Paid that thinks in funnels, not channels. Average 6.1× ROAS across 18 D2C clients in 2025–2026.',
  },
  {
    slug: 'social-content',
    title: 'Social & Content',
    eyebrow: 'SERVICE 02 / 05',
    heroLines: ['We make content', 'feel.'],
    italicWord: 'feel.',
    sub: 'Short-form that earns the second view. Always-on systems for Instagram, TikTok, YouTube — built by a studio that thinks in film, not in posts.',
    demoKey: 'social',
    demoCaption: 'A feed that doesn’t stop scrolling. Every card is a real-shaped post.',
    deliverables: [
      'Content strategy',
      'Always-on creative',
      'Short-form video',
      'Reels & shorts',
      'Community',
      'Influencer matchmaking',
    ],
    register: 'ink',
    accentA: '#E6FF3C',
    accentB: '#15151C',
    order: 2,
    indexBlurb:
      'An always-on creative engine — not a campaign-by-campaign scramble. Built around the feed your audience actually opens.',
  },
  {
    slug: 'branding',
    title: 'Branding',
    eyebrow: 'SERVICE 03 / 05',
    heroLines: ['We make brands', 'stick.'],
    italicWord: 'stick.',
    sub: 'Identity systems with feel. Naming, wordmarks, visual language, voice — written so the second-year designer can hold the line.',
    demoKey: 'branding',
    demoCaption: 'One wordmark, five identities. Scroll to watch the system bend without breaking.',
    deliverables: [
      'Naming',
      'Wordmarks',
      'Visual language',
      'Color systems',
      'Voice & tone',
      'Guidelines',
      'Brand films',
    ],
    register: 'bone',
    accentA: '#FF3D2E',
    accentB: '#E9E9E2',
    order: 3,
    indexBlurb:
      'Identity systems built like operating systems — every artifact is a function of one consistent core.',
  },
  {
    slug: 'web-motion',
    title: 'Web & Motion',
    eyebrow: 'SERVICE 04 / 05',
    heroLines: ['We make websites', 'move.'],
    italicWord: 'move.',
    sub: 'Sites that load fast and behave like films. Next.js, Lenis, GSAP, WebGL. The whole studio in one URL bar — including the one you’re reading.',
    demoKey: 'web-motion',
    demoCaption: 'This is the demo. The page you’re on is the proof.',
    deliverables: [
      'Web design',
      'Motion design',
      'WebGL / 3D',
      'CMS integration',
      'Site engineering',
      'Performance budgets',
      'Page transitions',
    ],
    register: 'ink',
    accentA: '#FF3D2E',
    accentB: '#E6FF3C',
    order: 4,
    indexBlurb:
      'A motion-led studio for the web. We ship sites that load under 2 seconds and feel like a director cut the timeline.',
  },
  {
    slug: 'seo-aeo',
    title: 'SEO / AEO',
    eyebrow: 'SERVICE 05 / 05',
    heroLines: ['We make brands', 'found.'],
    italicWord: 'found.',
    sub: 'Discoverability for the search box and the chat box. Schema, structure, signal — built for both the SERP and the LLM citation.',
    demoKey: 'seo',
    demoCaption: 'A search and an AEO panel, side by side. Scroll to watch the same query render twice.',
    deliverables: [
      'Technical SEO',
      'Content SEO',
      'Schema markup',
      'Answer-Engine Optimization',
      'Core Web Vitals',
      'Internal linking',
      'Reporting',
    ],
    register: 'ink',
    accentA: '#15151C',
    accentB: '#FF3D2E',
    order: 5,
    indexBlurb:
      'Discoverability for both the search engine and the answer engine. Schema-first work that compounds quarter over quarter.',
  },
];

export function getService(slug: string): ServiceContent | undefined {
  return services.find((s) => s.slug === slug);
}

export function nextService(slug: string): ServiceContent {
  const i = services.findIndex((s) => s.slug === slug);
  if (i < 0) return services[0];
  return services[(i + 1) % services.length];
}
