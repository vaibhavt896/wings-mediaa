import Link from 'next/link';
import LiveClock from './LiveClock';

/**
 * Footer per §06 page architecture.
 * Five-column: brand mark, sitemap, services, social, newsletter pulse.
 * Always-anchored, always-alive: live Mumbai clock + "now playing" line.
 */

const sitemap = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  { href: '/services/social-content', label: 'Social & Content' },
  { href: '/services/performance-marketing', label: 'Performance Ads' },
  { href: '/services/web-motion', label: 'Websites' },
  { href: '/services/seo-aeo', label: 'SEO & AI Search' },
  { href: '/services/whatsapp-automation', label: 'WhatsApp & Automation' },
  { href: '/services/branding', label: 'Branding' },
];

const social = [
  { href: 'https://instagram.com/wingsmediaa', label: 'Instagram' },
  { href: 'https://facebook.com/wingsmediaa', label: 'Facebook' },
  { href: 'https://linkedin.com/company/wingsmediaa', label: 'LinkedIn' },
  { href: 'mailto:hello@wingsmediaa.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-hair bg-ink text-bone px-5 md:px-9 pt-s9 pb-s7 relative">
      <div className="container-page">
        {/* Top: 5-column block */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-s6 md:gap-s7">
          {/* Brand mark */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="font-display font-extrabold text-[18px] tracking-[0.18em] uppercase text-bone block mb-s5"
            >
              WINGS<span className="text-crimson mx-0.5">·</span>MEDIAA
            </Link>
            <p className="text-bone/60 text-body-m max-w-prose">
              The AI-powered creative & marketing studio for brands that refuse to be ignored. Kanpur · Working with brands across India.
            </p>
          </div>

          {/* Sitemap */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-s5">
              Sitemap
            </div>
            <ul className="flex flex-col gap-s3">
              {sitemap.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-bone/80 hover:text-crimson transition-colors text-body-m"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-s5">
              Services
            </div>
            <ul className="flex flex-col gap-s3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-bone/80 hover:text-crimson transition-colors text-body-m"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-3">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-s5">
              Social
            </div>
            <ul className="flex flex-col gap-s3">
              {social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="text-bone/80 hover:text-crimson transition-colors text-body-m"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: live strip + legal */}
        <div className="mt-s8 pt-s6 border-t border-hair flex flex-col md:flex-row md:items-center md:justify-between gap-s4 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
          <div className="flex flex-wrap items-center gap-s5">
            <span className="flex items-center gap-2">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
              <LiveClock className="text-bone tabular-nums" /> · KANPUR
            </span>
            <span>● LIVE · KANPUR</span>
            <span className="hidden md:inline">● NOW WORKING WITH SOLITAIRE & SKIN MANTRAA</span>
          </div>
          <div className="flex items-center gap-s5">
            <span>© {new Date().getFullYear()} Wings Mediaa</span>
            <span>·</span>
            <span>Built in Kanpur</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
