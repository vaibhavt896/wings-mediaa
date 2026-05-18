import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/content/services';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Five disciplines, one studio. Performance, social, branding, web & motion, SEO/AEO.',
};

/**
 * /services — index of the five service detail pages.
 * Layout: hero header + 5 large stacked cards (one per service) — each card links to /services/[slug].
 * Each card carries its service accent and a quick blurb. Branding's card gets the light register
 * preview so the index hints at the inside art direction.
 */
export default function ServicesIndexPage() {
  return (
    <>
      {/* Header */}
      <section className="relative isolate pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden">
        <div className="ambient-glow" aria-hidden />
        <div className="container-page">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
            <span className="block w-9 h-px bg-crimson" />
            INDEX — SERVICES
          </div>
          <h1 className="font-display font-extrabold text-xxl leading-[0.92] tracking-[-0.04em] text-bone">
            Five <span className="ital">disciplines.</span>
            <br />
            One studio.
          </h1>
          <p className="mt-s7 max-w-[620px] text-body-l text-bone/80">
            Each one is a working piece of the same machine — the funnel, the brand, and the feel
            that holds them together. Click a service to see how we make it the proof.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="px-5 md:px-9 pb-s10">
        <div className="container-page flex flex-col gap-s5 md:gap-s6">
          {services.map((s, i) => {
            const light = s.register === 'bone';
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-cur="link"
                className={`group relative isolate overflow-hidden rounded-r4 border ${
                  light ? 'bg-bone text-ink border-hair-l' : 'bg-ink-2 text-bone border-hair'
                } px-s7 md:px-s8 py-s7 md:py-s8 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4`}
              >
                {/* Accent tint background */}
                <div
                  className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background: `
                      radial-gradient(40vmax 40vmax at 100% 50%, ${s.accentA}22, transparent 70%),
                      radial-gradient(30vmax 30vmax at 0% 50%, ${s.accentB}18, transparent 70%)
                    `,
                  }}
                  aria-hidden
                />

                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-s6 md:gap-s7 items-start md:items-center">
                  {/* Index */}
                  <div
                    className={`font-mono text-[11px] tracking-[0.18em] uppercase ${
                      light ? 'text-ink/55' : 'text-mute'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')} / 05
                  </div>

                  {/* Title + blurb */}
                  <div className="flex flex-col gap-s3">
                    <h2 className="font-display font-bold text-d-l md:text-[64px] tracking-[-0.03em] leading-[1.0]">
                      {s.title}.
                    </h2>
                    <p
                      className={`text-body-m max-w-[60ch] ${light ? 'text-ink/70' : 'text-bone/70'}`}
                    >
                      {s.indexBlurb}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`font-mono text-[12px] tracking-[0.18em] uppercase whitespace-nowrap flex items-center gap-s3 ${
                      light ? 'text-ink/70 group-hover:text-crimson' : 'text-bone group-hover:text-crimson'
                    } transition-colors duration-200`}
                  >
                    Explore
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="container-page mt-s9 flex flex-wrap items-center gap-s5">
          <Button variant="primary" href="/contact">
            Start a project →
          </Button>
          <Button variant="ghost" href="/work">
            See the work
          </Button>
        </div>
      </section>
    </>
  );
}
