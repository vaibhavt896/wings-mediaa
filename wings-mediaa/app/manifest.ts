import type { MetadataRoute } from 'next';
import { site } from '@/lib/seo/site';

/**
 * Web app manifest. Installable PWA-lite — not a full PWA (no service worker),
 * just enough that "Add to Home Screen" on mobile picks up the right icons
 * and theme color.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    orientation: 'portrait',
    categories: ['business', 'design', 'productivity'],
    icons: [
      { src: '/icon', sizes: '256x256', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
