/**
 * Insights — field notes from the studio.
 * Single chronological list with featured pins. No tag-heavy index.
 *
 * `body` is a discriminated union of block types so the renderer can switch
 * cleanly. The Sanity migration uses Portable Text → same shape post-transform.
 */

export type InsightBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'mono'; text: string };

export interface Insight {
  slug: string;
  title: string;
  /** Eyebrow category — used in the metadata rail, NOT a filter (no taxonomy). */
  kind: 'ESSAY' | 'FIELD NOTE' | 'CASE NOTES' | 'PROCESS';
  author: string;
  /** ISO 8601 date. */
  publishedAt: string;
  /** Read time in minutes. */
  readTime: number;
  /** Short summary for the index card. */
  summary: string;
  /** Cover accent hex (gradient fallback). */
  accent: string;
  /** Cover image (optional). */
  cover?: string;
  /** Featured = pinned at the top of the index. */
  featured?: boolean;
  body: InsightBlock[];
}

export const insights: Insight[] = [
  {
    slug: 'why-scroll-velocity-is-roas',
    title: 'Why your scroll velocity is your ROAS.',
    kind: 'ESSAY',
    author: 'Vaibhav Tiwari',
    publishedAt: '2026-04-22',
    readTime: 6,
    summary:
      'A single number predicts whether your ad will scale or not — and it has nothing to do with creative testing.',
    accent: '#FF3D2E',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Every D2C founder we work with asks the same first question: which creative will scale? We used to answer the same way every other agency does — “let the data decide.” Then we noticed a pattern that shrank every brief we ran by about three weeks.',
      },
      {
        type: 'p',
        text: 'The single best predictor of whether an ad will hit profitable scale isn’t the click-through rate, the engagement, or even the first-day ROAS. It’s the speed at which a user’s thumb decelerates when they encounter the ad in the feed. Slow the thumb by half a second on average — and the ad scales. Fail to slow it, and no amount of budget will save it.',
      },
      {
        type: 'h2',
        text: 'How we test for it.',
      },
      {
        type: 'p',
        text: 'There are two ways. The first is a heatmap study: instrument a beta landing page, watch the dwell-time distribution, and back-fit which creative variants the highest-dwell users came from. The second is much faster and works inside Meta’s own dashboards — the “average watch percent” metric, applied not to the whole ad set but to the first three-second cohort, is a near-perfect proxy for thumb-deceleration.',
      },
      {
        type: 'pull',
        text: 'Slow the thumb by half a second on average — and the ad scales.',
      },
      {
        type: 'h2',
        text: 'What changes when you measure this.',
      },
      {
        type: 'p',
        text: 'Three things. First, the creative team stops chasing CTR — a metric that, in 2026, is mostly a measure of who has the cheaper offer. Second, performance and creative start speaking the same language: “did this ad earn its first second?” Third, budget allocation becomes legible to the founder; it’s no longer a black box of Meta optimization, it’s a craft decision.',
      },
      {
        type: 'p',
        text: 'We’ve run this framework across 18 D2C launches now. The ones that adopted it averaged 6.4× blended ROAS in their first quarter. The ones that didn’t averaged 2.1×. It is the cheapest piece of performance advice we give.',
      },
    ],
  },
  {
    slug: 'we-stopped-using-stock',
    title: 'We stopped using stock, and our funnels caught fire.',
    kind: 'CASE NOTES',
    author: 'Priya Menon',
    publishedAt: '2026-04-08',
    readTime: 4,
    summary:
      'A six-week experiment across three D2C accounts: removing stock photography from every ad in the funnel.',
    accent: '#E6FF3C',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'In Q1 we ran a controlled six-week experiment across three D2C accounts: Kora, Tranquil Teas, and a clothing brand we won’t name. The hypothesis was simple — modern Indian audiences have learned to detect stock photography in under a second, and that detection costs us money.',
      },
      {
        type: 'p',
        text: 'We removed every piece of stock from the ad accounts. Replaced it with a mix of in-house shoots, founder-led UGC, and AI-supervised image generation where the brand voice was clearly the source. The shoot budget went up. The performance went up more.',
      },
      {
        type: 'mono',
        text: 'AVG CAC ↓ 38% · AVG CTR ↑ 2.1× · AVG ROAS ↑ 1.7× · ATTRIBUTION WINDOW: 7-DAY-CLICK',
      },
      {
        type: 'h2',
        text: 'The detection threshold.',
      },
      {
        type: 'p',
        text: 'What surprised us most was how fast the detection happens. We ran an eye-tracking study (n=42) and found that users could identify stock-vs-original in 280ms on average — well under the threshold of conscious thought. That means the “cheapening effect” of stock isn’t a creative critique — it’s a physical, pre-cognitive signal that the brand isn’t serious.',
      },
      {
        type: 'pull',
        text: 'Stock isn’t a creative critique. It’s a pre-cognitive signal that the brand isn’t serious.',
      },
    ],
  },
  {
    slug: 'the-1-2-second-loader',
    title: 'The 1.2-second loader is the most important second of your site.',
    kind: 'PROCESS',
    author: 'Nikhil Bhattacharya',
    publishedAt: '2026-03-20',
    readTime: 5,
    summary:
      'Why we treat the preloader like the first frame of a film — and how we built ours under a 220KB budget.',
    accent: '#FF884F',
    body: [
      {
        type: 'p',
        text: 'When we sit down to design a preloader, we don’t treat it as a loading state. We treat it as the opening frame of a film — the one image you carry with you for the rest of the visit. Get it right and the user reads the whole site as “premium”; get it wrong and the rest of the work has to fight your first impression for the next forty-five seconds.',
      },
      {
        type: 'p',
        text: 'Our budget is firm: 1.2 seconds total, end to end. Letter assembly: 0.55s. Hold: 0.1s. Curtain up: 0.55s. That’s it. Any longer and the user feels punished. Any shorter and the moment doesn’t land.',
      },
      {
        type: 'h2',
        text: 'What we ship inside the 1.2 seconds.',
      },
      {
        type: 'list',
        items: [
          'A physics tease — each letter falls into place with a slight overshoot. Reads as “hand-made.”',
          'A single color hold — one frame on the dark canvas before the curtain rises. Reads as “composed.”',
          'A curtain exit — the overlay slides up using expo.inOut so the page below feels like it was waiting.',
        ],
      },
      {
        type: 'p',
        text: 'The trick is that none of it is decoration. Every animation has a reason: the physics tease establishes the brand’s relationship with motion; the color hold establishes the discipline; the curtain establishes the cinematic register the rest of the site will live in.',
      },
    ],
  },
  {
    slug: 'five-years-of-d2c-2026',
    title: 'Five years of D2C: what works in 2026.',
    kind: 'FIELD NOTE',
    author: 'Vaibhav Tiwari',
    publishedAt: '2026-02-12',
    readTime: 7,
    summary:
      'A short audit of what scaled and what stalled across 60+ Indian D2C launches between 2021 and 2026.',
    accent: '#15151C',
    body: [
      {
        type: 'p',
        text: 'In the last five years we have either led, advised on, or watched closely the launches of more than sixty Indian direct-to-consumer brands. About fifteen of them are still profitable. About five of them are doing meaningfully well. The rest are either gone or surviving on founder runway. The pattern in the survivors is so specific that we’re going to write it down before it stops being true.',
      },
      {
        type: 'h2',
        text: '1. The category wedge has to be a feeling, not a feature.',
      },
      {
        type: 'p',
        text: 'Every founder we’ve worked with came in with a feature wedge — “our serum has 5% more retinol,” “our tea has a rarer leaf,” “our wearable has lower latency.” Every one of those decks got rewritten before launch. The brands that scaled positioned themselves on a feeling first (calm, confidence, defiance) and brought the feature in as proof.',
      },
      {
        type: 'h2',
        text: '2. The funnel is one document.',
      },
      {
        type: 'p',
        text: 'We’ve stopped using the word “funnel” internally. We say “the document.” Every ad, landing page, email, post-purchase sequence and customer-support reply is one continuous piece of writing. When the document is consistent, the math works. When the document breaks, CAC creeps up by 30% over two quarters and the founder thinks it’s a “creative problem.”',
      },
      {
        type: 'h2',
        text: '3. Brand spend pays for performance spend.',
      },
      {
        type: 'p',
        text: 'Every brand we’ve watched scale spent at least 20% of its Q1 budget on something that didn’t have a direct attribution chain — a brand film, a sponsored editorial, a physical event. That spend made the performance spend cheaper for the next six quarters. We have charts.',
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function nextInsight(slug: string): Insight {
  const idx = insights.findIndex((i) => i.slug === slug);
  if (idx < 0) return insights[0];
  return insights[(idx + 1) % insights.length];
}

export const featuredInsights = insights.filter((i) => i.featured);
