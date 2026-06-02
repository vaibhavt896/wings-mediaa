/**
 * Case studies — single source of truth for v1.
 * Shape mirrors `studio/schemas/case.ts` 1:1, so the future Sanity swap is one import change.
 *
 * Block types in `sections` form a discriminated union so the renderer can switch on `type`
 * and each art direction can mix blocks freely.
 *
 * Only real clients live here. No invented numbers — result blocks stay as honest
 * placeholders until Solitaire and Skin Mantraa hand us real metrics to feature.
 */

export type Vertical = 'brand' | 'd2c' | 'performance' | 'content' | 'tech';
export type CoverKind = 'still' | 'video' | '3d';
export type TileAspect = '16:10' | '9:16' | '4:3' | '1:1' | '21:9';

export interface CaseMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  eyebrow: string;
  label: string;
}

export interface Credit {
  role: string;
  name: string;
}

export type CaseBlock =
  | {
      type: 'poster';
      image?: string;
      videoSrc?: string;
      caption?: string;
      accent?: string;
      aspect?: '16:9' | '21:9' | '4:3' | '9:16' | '1:1';
      bg?: 'ink' | 'bone';
    }
  | {
      type: 'gallery';
      images: { src?: string; alt: string; accent?: string; caption?: string }[];
      bg?: 'ink' | 'bone';
    }
  | {
      type: 'quote';
      text: string;
      name: string;
      role?: string;
      company?: string;
      lime?: boolean;
    }
  | {
      type: 'metricsRow';
      metrics: CaseMetric[];
    }
  | {
      type: 'scrub';
      lines: string[];
      accent?: string;
    }
  | {
      type: 'embed';
      src: string;
      poster?: string;
      aspect?: '16:9' | '21:9' | '4:3' | '9:16';
    }
  | {
      type: 'text';
      eyebrow?: string;
      body: string;
      size?: 'sm' | 'lg';
      bg?: 'ink' | 'bone';
    };

export interface Case {
  slug: string;
  title: string;
  client: string;
  year: number;
  verticals: Vertical[];
  services: string[]; // service slugs
  cover: {
    kind: CoverKind;
    accent: string;
    image?: string;
    videoSrc?: string;
    poster?: string;
  };
  /** Short tag for the tile caption row. */
  summary: string;
  /** Editorial italic paragraph at the top of the case. */
  brief: string;
  aspect: TileAspect;
  /** "CASE · 003" — shown on the tile. */
  indexLabel: string;
  metrics: CaseMetric[];
  sections: CaseBlock[];
  credits: Credit[];
}

export const cases: Case[] = [
  // ---------------------------------------------------------------------------
  {
    slug: 'solitaire',
    title: 'Solitaire',
    client: 'Solitaire · Fine Jewellery',
    year: 2026,
    verticals: ['brand', 'content'],
    services: ['social-content', 'branding'],
    cover: { kind: 'still', accent: '#FF3D2E' },
    summary: '01 · FINE JEWELLERY · SWAROOP NAGAR',
    brief:
      'A boutique with genuinely beautiful, hand-selected pieces, and an online presence that did not reflect the craftsmanship. The work deserved a far bigger audience than foot traffic alone.',
    aspect: '4:3',
    indexLabel: 'CASE · 001',
    metrics: [],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE BRIEF',
        body: 'Solitaire is a Swaroop Nagar boutique with pieces that deserved the whole city’s attention, and an online presence that was not showing them. The craftsmanship was already there. The visibility was not.',
        size: 'lg',
      },
      {
        type: 'poster',
        accent: '#FF3D2E',
        caption: 'BUILDING THE DIGITAL PRESENCE',
        aspect: '21:9',
      },
      {
        type: 'text',
        eyebrow: 'WHAT WE ARE DOING',
        body: 'Building the entire digital presence from the ground up: a premium content style that does justice to the jewellery, a consistent Instagram and Facebook rhythm, and a plan to make Solitaire the name Kanpur thinks of for fine jewellery.',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Content direction 1', accent: '#FF3D2E' },
          { alt: 'Content direction 2', accent: '#FF5547' },
          { alt: 'Content direction 3', accent: '#FF884F' },
          { alt: 'Content direction 4', accent: '#15151C' },
        ],
      },
      {
        type: 'scrub',
        accent: '#FF3D2E',
        lines: ['Real pieces.', 'Real craftsmanship.', 'A feed that finally', 'does them justice.'],
      },
      {
        type: 'text',
        eyebrow: 'THE RESULT',
        body: 'Results are landing now. We feature real numbers only once they are real: reel views, enquiries, followers, and walk-ins who mention Instagram. This space fills with proof as the work compounds.',
        size: 'lg',
      },
    ],
    credits: [
      { role: 'STRATEGY & BUILD', name: 'Wings Mediaa' },
      { role: 'FOUNDER', name: 'Vaibhav Tiwari' },
      { role: 'CLIENT', name: 'Solitaire · Swaroop Nagar, Kanpur' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'skin-mantraa',
    title: 'Skin Mantraa',
    client: 'Skin Mantraa · Skincare Clinic',
    year: 2026,
    verticals: ['brand', 'content'],
    services: ['web-motion', 'social-content', 'seo-aeo'],
    cover: { kind: 'still', accent: '#E6FF3C' },
    summary: '02 · SKINCARE CLINIC · KANPUR',
    brief:
      'A results-driven clinic whose reputation lived in word-of-mouth, invisible to the people searching online for exactly what it offers.',
    aspect: '9:16',
    indexLabel: 'CASE · 002',
    metrics: [],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE BRIEF',
        body: 'Skin Mantraa is a clinic whose results lived in word-of-mouth, invisible to the people searching for exactly what it offers. The trust was real. The reach was not.',
        size: 'lg',
      },
      {
        type: 'poster',
        accent: '#E6FF3C',
        caption: 'WEBSITE BUILT FROM THE GROUND UP',
        aspect: '21:9',
      },
      {
        type: 'text',
        eyebrow: 'WHAT WE ARE DOING',
        body: 'Built the website from the ground up, and growing Instagram and Facebook to reach people actively looking for trusted skincare, turning searches into booked appointments.',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Website screen 1', accent: '#E6FF3C' },
          { alt: 'Website screen 2', accent: '#15151C' },
          { alt: 'Social direction', accent: '#8A8A95' },
        ],
      },
      {
        type: 'scrub',
        accent: '#E6FF3C',
        lines: ['A site that is live.', 'A presence that grows.', 'Searches turning into', 'booked appointments.'],
      },
      {
        type: 'text',
        eyebrow: 'THE RESULT',
        body: 'Results are landing now. We feature real numbers only once they are real: site traffic, WhatsApp enquiries, follower growth, and new bookings. This space fills with proof as the work compounds.',
        size: 'lg',
      },
    ],
    credits: [
      { role: 'WEBSITE & STRATEGY', name: 'Wings Mediaa' },
      { role: 'FOUNDER', name: 'Vaibhav Tiwari' },
      { role: 'CLIENT', name: 'Skin Mantraa · Kanpur' },
    ],
  },
];

/** Vertical filter chips for the /work mosaic. */
export const verticalFilters: Array<{ value: 'all' | Vertical; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'brand', label: 'Brand' },
  { value: 'content', label: 'Content' },
];

/** Helper: given a slug, return the next case (wraps around). Used by the case page's "next case" CTA. */
export function nextCase(slug: string): Case {
  const idx = cases.findIndex((c) => c.slug === slug);
  if (idx < 0) return cases[0];
  return cases[(idx + 1) % cases.length];
}

/** Helper: lookup a case by slug, returns undefined if not found (used by the page for notFound). */
export function getCase(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}
