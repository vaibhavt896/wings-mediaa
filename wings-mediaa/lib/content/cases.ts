/**
 * Case studies — single source of truth for v1.
 * Shape mirrors `studio/schemas/case.ts` 1:1, so the future Sanity swap is one import change.
 *
 * Block types in `sections` form a discriminated union so the renderer can switch on `type`
 * and each art direction can mix blocks freely.
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
    slug: 'kora',
    title: 'Kora — D2C launch reel',
    client: 'Kora · Nude',
    year: 2026,
    verticals: ['d2c', 'performance', 'content', 'brand'],
    services: ['performance-marketing', 'social-content', 'web-motion', 'branding', 'seo-aeo'],
    cover: { kind: 'still', accent: '#FF3D2E' },
    summary: '01 · D2C · MUMBAI · ROAS 7.4×',
    brief:
      'A nude beauty brand needed to launch and hit 7.4× ROAS in 12 weeks. We built the funnel, the films, and the always-on creative engine that kept it shipping after we left the room.',
    aspect: '4:3',
    indexLabel: 'CASE · 001',
    metrics: [
      { value: 7.4, suffix: '×', eyebrow: 'ROAS', label: '12-WEEK AVERAGE · META + GOOGLE' },
      { value: 312, prefix: '+', suffix: '%', eyebrow: 'REVENUE', label: 'MOM GROWTH · LAUNCH QUARTER' },
      { value: 1500000, suffix: '+', eyebrow: 'IMPRESSIONS', label: 'PAID + ORGANIC · MONTH 1' },
    ],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE BRIEF',
        body: 'Launch a 12-SKU nude beauty line in India with no existing audience. The category is brutal — every player from Glossier-clones to drugstore brands wants the same eye-share. The goal was simple: hit positive ROAS in week 6 and 7×+ ROAS by week 12.',
        size: 'lg',
      },
      {
        type: 'poster',
        accent: '#FF3D2E',
        caption: 'COVER · 30s LAUNCH FILM',
        aspect: '21:9',
      },
      {
        type: 'text',
        eyebrow: 'THE APPROACH',
        body: 'We stopped thinking like an ad agency and started thinking like an A/B testing lab with a film studio attached. Twelve creative routes in week one. Six survived to week three. By week six, three creative families were doing 80% of the spend at 6×+ ROAS.',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Hero film still 1', accent: '#FF3D2E' },
          { alt: 'Hero film still 2', accent: '#FF5547' },
          { alt: 'Hero film still 3', accent: '#FF884F' },
          { alt: 'Hero film still 4', accent: '#15151C' },
        ],
      },
      {
        type: 'scrub',
        accent: '#FF3D2E',
        lines: ['Twelve weeks.', 'Twelve creatives a week.', 'One unfair advantage:', 'we shipped the next test before the last one finished.'],
      },
      {
        type: 'quote',
        text: 'They didn’t just ship a film. They shipped a feeling that our customers screenshot and post back at us.',
        name: 'Aman Rao',
        role: 'Founder',
        company: 'KORA D2C',
        lime: true,
      },
      {
        type: 'metricsRow',
        metrics: [
          { value: 7.4, suffix: '×', eyebrow: 'ROAS', label: 'BLENDED · 12 WEEKS' },
          { value: 42, prefix: '−', suffix: '%', eyebrow: 'CAC', label: 'VS. CATEGORY AVG' },
          { value: 312, prefix: '+', suffix: '%', eyebrow: 'REVENUE', label: 'QUARTER-OVER-QUARTER' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'THE TAKEAWAY',
        body: 'Performance is craft. The brands that win are the ones that treat every ad like a short film and every funnel like a screenplay. Kora hit profitable scale in week 6 because we never separated brand and performance.',
        size: 'lg',
      },
    ],
    credits: [
      { role: 'CREATIVE DIRECTION', name: 'Wings Mediaa Studio' },
      { role: 'PERFORMANCE', name: 'Wings Mediaa Performance Team' },
      { role: 'DIRECTOR', name: 'A. Devarajan' },
      { role: 'EDIT', name: 'R. Choudhury' },
      { role: 'MUSIC', name: 'Distant Light' },
      { role: 'CLIENT', name: 'Aman Rao · Kora D2C' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'tranquil-teas',
    title: 'Tranquil Teas — Funnel rewrite',
    client: 'Tranquil Teas',
    year: 2026,
    verticals: ['d2c', 'performance'],
    services: ['performance-marketing', 'seo-aeo', 'web-motion'],
    cover: { kind: 'still', accent: '#E6FF3C' },
    summary: '02 · D2C · 2026 · +312% REVENUE',
    brief:
      'An eight-year-old D2C tea brand had stopped growing. We rewrote the funnel from the search box to the second purchase — without changing the product, the packaging, or the headcount.',
    aspect: '9:16',
    indexLabel: 'CASE · 002',
    metrics: [
      { value: 312, prefix: '+', suffix: '%', eyebrow: 'REVENUE', label: 'YEAR-OVER-YEAR · NEW FUNNEL' },
      { value: 42, prefix: '−', suffix: '%', eyebrow: 'CAC', label: 'FIRST-ORDER ACQUISITION' },
      { value: 6.1, suffix: '×', eyebrow: 'ROAS', label: 'BLENDED · POST-RELAUNCH' },
    ],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE PROBLEM',
        body: 'Eight years of brand equity, flatlining revenue. The funnel had been built in 2018 — every line of copy was older than the buyer. We started by reading the entire customer-support inbox.',
        size: 'lg',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Before / after landing 1', accent: '#E6FF3C' },
          { alt: 'Before / after landing 2', accent: '#15151C' },
          { alt: 'Before / after landing 3', accent: '#8A8A95' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'THE REWRITE',
        body: 'Every page rewritten in 12 days. New IA. New checkout. New post-purchase sequence. The catalog stayed identical — the story didn’t.',
      },
      {
        type: 'scrub',
        accent: '#E6FF3C',
        lines: ['Same product.', 'Same SKU count.', 'New funnel.', '+312% revenue in 90 days.'],
      },
      {
        type: 'quote',
        text: 'Working with Wings Mediaa was the first time our creative agency understood the funnel.',
        name: 'Priya M',
        role: 'CMO',
        company: 'TRANQUIL TEAS',
      },
      {
        type: 'metricsRow',
        metrics: [
          { value: 312, prefix: '+', suffix: '%', eyebrow: 'REVENUE', label: '90-DAY POST-LAUNCH' },
          { value: 42, prefix: '−', suffix: '%', eyebrow: 'CAC', label: 'BLENDED CHANNEL' },
          { value: 6.1, suffix: '×', eyebrow: 'ROAS', label: 'PAID MEDIA · POST-RELAUNCH' },
        ],
      },
    ],
    credits: [
      { role: 'CREATIVE DIRECTION', name: 'Wings Mediaa Studio' },
      { role: 'COPY', name: 'M. Shenoy' },
      { role: 'WEB', name: 'Wings Mediaa Web Team' },
      { role: 'PERFORMANCE', name: 'Wings Mediaa Performance Team' },
      { role: 'CLIENT', name: 'Priya M · Tranquil Teas' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'valor',
    title: 'Valor — Brand film',
    client: 'Valor',
    year: 2026,
    verticals: ['brand', 'content'],
    services: ['branding', 'social-content'],
    cover: { kind: 'video', accent: '#FF884F' },
    summary: '03 · BRAND FILM · 30s SPOT',
    brief:
      'A thirty-second spot for a youth fitness brand. Written, shot, and shipped in four weeks. It became their highest-performing ad of the year by week two.',
    aspect: '16:10',
    indexLabel: 'CASE · 003',
    metrics: [
      { value: 8.2, suffix: 'M', eyebrow: 'VIEWS', label: 'FIRST 30 DAYS · PAID + ORGANIC' },
      { value: 180, prefix: '+', suffix: '%', eyebrow: 'FOLLOWERS', label: 'INSTAGRAM · MONTH 1' },
      { value: 1, suffix: 'st', eyebrow: 'CATEGORY', label: 'TOP-PERFORMING AD · 2026 H1' },
    ],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE BRIEF',
        body: 'Make 18–26-year-olds in three Indian metros feel like Valor was made for them — in thirty seconds, with no celebrity, no voiceover, and no platform-specific tricks.',
        size: 'lg',
      },
      {
        type: 'embed',
        src: '',
        aspect: '16:9',
      },
      {
        type: 'poster',
        accent: '#FF884F',
        caption: 'BEHIND THE FILM · 4-WEEK SHOOT',
        aspect: '21:9',
      },
      {
        type: 'text',
        body: 'We wrote it the way we’d write a short. Three beats, one cut, no narration. The brand showed up in the gait of the runner, not in a logo bug.',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Set still 1', accent: '#FF884F' },
          { alt: 'Set still 2', accent: '#FF3D2E' },
          { alt: 'Set still 3', accent: '#15151C' },
          { alt: 'Set still 4', accent: '#E6FF3C' },
          { alt: 'Set still 5', accent: '#8A8A95' },
        ],
      },
      {
        type: 'scrub',
        accent: '#FF884F',
        lines: ['Four weeks.', 'No script-to-shoot delay.', 'One cinematographer.', 'A film that ran for a year.'],
      },
      {
        type: 'metricsRow',
        metrics: [
          { value: 8.2, suffix: 'M', eyebrow: 'VIEWS', label: 'PAID + ORGANIC · MONTH 1' },
          { value: 180, prefix: '+', suffix: '%', eyebrow: 'FOLLOWERS', label: 'INSTAGRAM · MONTH 1' },
          { value: 4.6, suffix: '×', eyebrow: 'ROAS', label: 'BRAND FILM ADAPTATIONS' },
        ],
      },
    ],
    credits: [
      { role: 'CREATIVE DIRECTION', name: 'Wings Mediaa Studio' },
      { role: 'DIRECTOR', name: 'P. Subramaniam' },
      { role: 'DP', name: 'K. Iyer' },
      { role: 'EDIT', name: 'R. Choudhury' },
      { role: 'SOUND', name: 'Distant Light' },
      { role: 'CLIENT', name: 'V. Sharma · Valor' },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'ixana',
    title: 'Ixana — Wearable launch',
    client: 'Ixana',
    year: 2026,
    verticals: ['brand', 'performance', 'content', 'd2c', 'tech'],
    services: ['branding', 'performance-marketing', 'social-content', 'web-motion', 'seo-aeo'],
    cover: { kind: '3d', accent: '#15151C' },
    summary: '04 · TECH · MUMBAI · 1.5M IMPRESSIONS',
    brief:
      'A wearable hardware launch in a market that has never trusted Indian hardware. We built the brand, the launch film, and the paid engine — then watched 22,000 people pre-order before the product had a public price.',
    aspect: '21:9',
    indexLabel: 'CASE · 004',
    metrics: [
      { value: 1500000, suffix: '+', eyebrow: 'IMPRESSIONS', label: 'LAUNCH WEEK · ALL CHANNELS' },
      { value: 22000, suffix: '+', eyebrow: 'PRE-ORDERS', label: 'BEFORE PUBLIC PRICING' },
      { value: 4.8, suffix: '×', eyebrow: 'ROAS', label: 'LAUNCH-WEEK PAID MEDIA' },
    ],
    sections: [
      {
        type: 'text',
        eyebrow: 'THE BRIEF',
        body: 'Launch a piece of consumer hardware designed in Mumbai — in a market that has never trusted Indian hardware. Build the brand, the launch film, the funnel, and the paid engine. Six weeks.',
        size: 'lg',
      },
      {
        type: 'poster',
        accent: '#15151C',
        caption: 'BRAND FILM · 60s · DIRECTOR’S CUT',
        aspect: '21:9',
        bg: 'ink',
      },
      {
        type: 'gallery',
        images: [
          { alt: 'Brand system 1', accent: '#15151C' },
          { alt: 'Brand system 2', accent: '#FF3D2E' },
          { alt: 'Brand system 3', accent: '#8A8A95' },
        ],
        bg: 'bone',
      },
      {
        type: 'text',
        eyebrow: 'THE BRAND',
        body: 'Quiet typography. One accent color. A product that earned the confidence to whisper. The brand system never used the word "innovative" — a small discipline that compounded across every surface.',
        bg: 'bone',
      },
      {
        type: 'scrub',
        accent: '#15151C',
        lines: ['Six weeks to launch.', '22,000 pre-orders.', 'Zero discounting.', 'A category that didn’t exist in India last year.'],
      },
      {
        type: 'quote',
        text: 'They didn’t treat us like a startup. They treated us like a film.',
        name: 'N. Bhattacharya',
        role: 'Founder',
        company: 'IXANA',
      },
      {
        type: 'metricsRow',
        metrics: [
          { value: 1.5, suffix: 'M', eyebrow: 'IMPRESSIONS', label: 'LAUNCH WEEK' },
          { value: 22, suffix: 'K', eyebrow: 'PRE-ORDERS', label: 'BEFORE PUBLIC PRICING' },
          { value: 4.8, suffix: '×', eyebrow: 'ROAS', label: 'LAUNCH-WEEK PAID' },
        ],
      },
    ],
    credits: [
      { role: 'BRAND DIRECTION', name: 'Wings Mediaa Studio' },
      { role: 'DIRECTOR', name: 'P. Subramaniam' },
      { role: 'PERFORMANCE', name: 'Wings Mediaa Performance Team' },
      { role: '3D / WEBGL', name: 'Wings Mediaa Motion Team' },
      { role: 'COPY', name: 'M. Shenoy' },
      { role: 'CLIENT', name: 'N. Bhattacharya · Ixana' },
    ],
  },
];

/** Vertical filter chips for the /work mosaic. */
export const verticalFilters: Array<{ value: 'all' | Vertical; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'brand', label: 'Brand' },
  { value: 'd2c', label: 'D2C' },
  { value: 'performance', label: 'Performance' },
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
