import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import LenisProvider from './providers/lenis-provider';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { site } from '@/lib/seo/site';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import '@/styles/globals.css';

/**
 * Free fallback stack — proxies the paid Pangram licenses in the spec.
 * Inter → PP Neue Montreal. Instrument Serif → PP Editorial New. JetBrains Mono → unchanged.
 *
 * Phase G: dropped Inter 300/600/900 — none of the rendered tokens use them.
 * Net savings: ~80KB of font payload at first load.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Motion-led studio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  keywords: [
    'D2C marketing India',
    'Performance marketing studio',
    'Brand films India',
    'Mumbai creative studio',
    'Motion design',
    'Web design Mumbai',
    'SEO AEO',
  ],
  authors: [{ name: site.founder, url: site.url }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Motion-led studio`,
    description: site.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Motion-led studio`,
    description: site.tagline,
    creator: '@wingsmediaa',
  },
  alternates: {
    canonical: site.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Global JSON-LD: Organization + WebSite. Per-route schemas (CreativeWork,
            Article, Service, BreadcrumbList) are injected inside their page files. */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="bg-ink text-bone antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
