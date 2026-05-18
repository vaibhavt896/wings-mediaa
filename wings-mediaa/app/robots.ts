import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';

/**
 * Generates /robots.txt at build time.
 * - Allows everything by default
 * - Blocks /api/* + /sandbox (internal QA page) from being indexed
 * - References the sitemap
 */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sandbox', '/_next/', '/studio/'],
      },
      // Bots we explicitly want to invite — none excluded specifically yet.
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
