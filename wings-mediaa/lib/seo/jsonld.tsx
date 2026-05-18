/**
 * JSON-LD structured data helpers.
 *
 * Output is serialized to a `<script type="application/ld+json">` tag.
 * Google reads these for rich-results cards. We ship the load-bearing set:
 *
 *   Organization   — global, in root layout
 *   WebSite        — global, in root layout (enables sitelinks search box)
 *   BreadcrumbList — per deep route
 *   Article        — per /insights/[slug]
 *   CreativeWork   — per /work/[slug]
 *   Service        — per /services/[slug]
 *
 * Use `<JsonLd data={...} />` to render. Keep payloads small — Google ignores
 * fields it doesn't recognize, but every byte is wire weight.
 */

import { site } from './site';
import type { Case } from '@/lib/content/cases';
import type { Insight } from '@/lib/content/insights';
import type { ServiceContent } from '@/lib/content/services';

const BASE = site.url.replace(/\/$/, '');

/* ----------------------------- ORGANIZATION ------------------------------- */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: site.name,
    url: BASE,
    logo: `${BASE}/icon`,
    description: site.description,
    foundingDate: String(site.foundedYear),
    founder: { '@type': 'Person', name: site.founder },
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      ...site.address,
    },
    sameAs: Object.values(site.social),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      areaServed: site.country,
      availableLanguage: ['en'],
    },
  };
}

/* ------------------------------- WEBSITE ---------------------------------- */

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    name: site.name,
    url: BASE,
    description: site.tagline,
    publisher: { '@id': `${BASE}/#organization` },
    inLanguage: 'en-IN',
  };
}

/* ------------------------------ BREADCRUMB -------------------------------- */

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path.startsWith('/') ? c.path : `/${c.path}`}`,
    })),
  };
}

/* ------------------------------- ARTICLE ---------------------------------- */

export function articleJsonLd(insight: Insight) {
  const url = `${BASE}/insights/${insight.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.summary,
    url,
    mainEntityOfPage: url,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    author: { '@type': 'Person', name: insight.author },
    publisher: { '@id': `${BASE}/#organization` },
    image: `${BASE}/insights/${insight.slug}/opengraph-image`,
    articleSection: insight.kind,
    wordCount: estimateWordCount(insight),
  };
}

function estimateWordCount(insight: Insight): number {
  return insight.body.reduce((sum, b) => {
    if ('text' in b) return sum + (b.text?.split(/\s+/).length ?? 0);
    if ('items' in b) return sum + b.items.reduce((s, t) => s + t.split(/\s+/).length, 0);
    return sum;
  }, 0);
}

/* ----------------------------- CREATIVE WORK ------------------------------ */

export function creativeWorkJsonLd(c: Case) {
  const url = `${BASE}/work/${c.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    description: c.brief.slice(0, 240),
    url,
    image: `${BASE}/work/${c.slug}/opengraph-image`,
    creator: { '@id': `${BASE}/#organization` },
    datePublished: `${c.year}-01-01`,
    keywords: [...c.verticals, ...c.services].join(', '),
    about: c.client,
    inLanguage: 'en-IN',
  };
}

/* -------------------------------- SERVICE --------------------------------- */

export function serviceJsonLd(s: ServiceContent) {
  const url = `${BASE}/services/${s.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    serviceType: s.title,
    description: s.sub,
    url,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: site.country,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.title} deliverables`,
      itemListElement: s.deliverables.map((d) => ({
        '@type': 'OfferCatalog',
        name: d,
      })),
    },
  };
}

/* ------------------------------- COMPONENT -------------------------------- */

/**
 * Render a JSON-LD `<script>` tag. Always render in `<head>` or top of `<body>`.
 *
 * Multiple JSON-LD blocks per page are fine — each is parsed independently.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — these payloads contain no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
