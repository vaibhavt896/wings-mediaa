import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';
import { cases } from '@/lib/content/cases';
import { services } from '@/lib/content/services';
import { insights } from '@/lib/content/insights';

/**
 * Generates /sitemap.xml at build time.
 *
 * Priorities are intentional, not default:
 *   Home/Work/Services         1.0   (top of funnel)
 *   Case studies / Service pages 0.8 (the product)
 *   Insights / About / Contact   0.6 (supporting)
 *   Individual insights           0.5
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    // Use the article's actual publish date as lastModified.
    lastModified: new Date(i.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...caseRoutes, ...serviceRoutes, ...insightRoutes];
}
