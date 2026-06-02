/**
 * Service pages — single source of truth.
 * Shape mirrors `studio/schemas/service.ts`. Phase F migration is one import change.
 *
 * Each service has its own art-direction register (light vs dark canvas, accent palette).
 * The `demoKey` tells the page which demo component to render — keeps the page template
 * generic while every demo gets its own distinctive component. WhatsApp & Automation
 * reuses the social demo until it earns its own.
 */

export type ServiceSlug =
  | 'social-content'
  | 'performance-marketing'
  | 'web-motion'
  | 'seo-aeo'
  | 'whatsapp-automation'
  | 'branding';

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
    slug: 'social-content',
    title: 'Social & Content',
    eyebrow: 'SERVICE 01 / 06',
    heroLines: ['Social that makes people stop, look, and', 'remember.'],
    italicWord: 'remember.',
    sub: 'Most business pages are forgettable. Yours will not be. We turn your product and your story into reels and posts that look premium, build trust, and quietly turn followers into buyers.',
    demoKey: 'social',
    demoCaption: 'A feed that does not stop scrolling. Every card is a real-shaped post.',
    deliverables: [
      'Content plan',
      'Scroll-stopping reels',
      'Designed posts',
      'Consistent posting',
      'Captions & hashtags',
      'Community & engagement',
    ],
    register: 'ink',
    accentA: '#E6FF3C',
    accentB: '#15151C',
    order: 1,
    indexBlurb:
      'People check your page before they decide to trust you. We make that first impression close the deal.',
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Ads',
    eyebrow: 'SERVICE 02 / 06',
    heroLines: ['Ads that bring customers and prove every', 'rupee.'],
    italicWord: 'rupee.',
    sub: 'Likes do not pay rent. Customers do. We run targeted ads on Instagram, Facebook and Google that reach people ready to buy near you, and we show you exactly what each rupee returned.',
    demoKey: 'performance',
    demoCaption: 'A live-feeling dashboard. Scroll the page; the campaign runs.',
    deliverables: [
      'Audience targeting',
      'Ad creative',
      'Daily management',
      'Conversion tracking',
      'Clear reporting',
      'Meta & Google',
    ],
    register: 'ink',
    accentA: '#FF3D2E',
    accentB: '#15151C',
    order: 2,
    indexBlurb:
      'The fastest path from marketing to money. Done right, ads pay for themselves.',
  },
  {
    slug: 'web-motion',
    title: 'Websites',
    eyebrow: 'SERVICE 03 / 06',
    heroLines: ['A website that works harder than your best', 'salesperson.'],
    italicWord: 'salesperson.',
    sub: 'Open 24 hours, never off, talking to every curious customer. We build fast, premium, easy sites that make you look established and turn visitors into calls, bookings and orders.',
    demoKey: 'web-motion',
    demoCaption: 'This is the demo. The page you are on is the proof.',
    deliverables: [
      'Mobile-first design',
      'Fast loading',
      'Conversion layout',
      'WhatsApp & call buttons',
      'Built to be found',
      'CMS handover',
    ],
    register: 'ink',
    accentA: '#FF3D2E',
    accentB: '#E6FF3C',
    order: 3,
    indexBlurb:
      'A weak or missing site makes a strong business look small. A great one does the opposite.',
  },
  {
    slug: 'seo-aeo',
    title: 'SEO & AI Search',
    eyebrow: 'SERVICE 04 / 06',
    heroLines: ['Be the first name found, on Google, and on', 'AI.'],
    italicWord: 'AI.',
    sub: 'When someone in your city searches for what you sell, you want to be first. We make that happen on Google Search, on Maps, and when people ask ChatGPT and Gemini for a recommendation, the part most agencies still ignore.',
    demoKey: 'seo',
    demoCaption: 'A search and an AI answer panel, side by side. Scroll to watch the same query render twice.',
    deliverables: [
      'Google Business Profile',
      'On-site SEO',
      'Answer-engine content',
      'Maps & near-me',
      'More reviews',
      'Reporting',
    ],
    register: 'ink',
    accentA: '#15151C',
    accentB: '#FF3D2E',
    order: 4,
    indexBlurb:
      'The person searching right now is ready to buy. The only question is whether they find you, or the competitor.',
  },
  {
    slug: 'whatsapp-automation',
    title: 'WhatsApp & Automation',
    eyebrow: 'SERVICE 05 / 06',
    heroLines: ['Never lose a customer to a missed', 'message.'],
    italicWord: 'message.',
    sub: 'Most enquiries die because no one replied fast enough. We set up WhatsApp automation and AI assistants that answer instantly, share details, and book customers, day or night.',
    demoKey: 'social',
    demoCaption: 'Replies that never sleep. Every message answered before it goes cold.',
    deliverables: [
      'Instant replies',
      'AI assistant',
      'Automatic follow-ups',
      'Booking flows',
      'Trained on your business',
      'Less time on your phone',
    ],
    register: 'ink',
    accentA: '#E6FF3C',
    accentB: '#FF3D2E',
    order: 5,
    indexBlurb:
      'Speed wins sales. The brand that replies first usually gets the customer.',
  },
  {
    slug: 'branding',
    title: 'Branding',
    eyebrow: 'SERVICE 06 / 06',
    heroLines: ['Look like the most trusted name in your', 'category.'],
    italicWord: 'category.',
    sub: 'People judge you in two seconds, by how you look. We craft your logo, colours, voice and visuals so the brand feels premium, consistent, and impossible to forget.',
    demoKey: 'branding',
    demoCaption: 'One wordmark, many identities. Scroll to watch the system bend without breaking.',
    deliverables: [
      'Logo & identity',
      'Colour system',
      'Brand voice',
      'Packaging & social',
      'Templates',
      'Guidelines',
    ],
    register: 'bone',
    accentA: '#FF3D2E',
    accentB: '#E9E9E2',
    order: 6,
    indexBlurb:
      'Looking premium is the first reason people trust you enough to pay more.',
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
