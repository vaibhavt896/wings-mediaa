import Link from 'next/link';

/**
 * Site-wide 404 — the lime moment.
 *
 * Per Principle 04 ("color is a weapon, not a wardrobe") + Principle 10
 * (lime is reserved: 404, post-book-call confirmation, one testimonial per case),
 * this page is the canonical "we noticed you noticed" beat. Calm, confident,
 * routes the user back somewhere useful.
 *
 * Note: this is a root-level not-found, so it does NOT inherit the (site) route
 * group's Nav + Footer + Cursor — those live in app/layout.tsx and apply globally.
 */
export default function NotFound() {
  return (
    <section className="relative isolate min-h-screen bg-lime text-ink overflow-hidden flex flex-col">
      {/* Subtle background drift — keeps the page alive without screaming. */}
      <div
        className="absolute inset-0 -z-10 opacity-60"
        aria-hidden
        style={{
          background:
            'radial-gradient(60vmax 50vmax at 20% 80%, rgba(255,61,46,0.18), transparent 60%), radial-gradient(50vmax 40vmax at 80% 30%, rgba(10,10,15,0.08), transparent 60%)',
          animation: 'drift 30s linear infinite alternate',
        }}
      />

      <div className="flex-1 px-5 md:px-9 pt-[140px] pb-s8 flex flex-col justify-center container-page">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-ink/60 flex items-center gap-s4 mb-s7">
          <span className="block w-9 h-px bg-crimson" />
          <span>404 · NOT FOUND</span>
        </div>

        <h1
          className="font-display font-extrabold text-ink leading-[0.88] tracking-[-0.05em] max-w-[14ch]"
          style={{ fontSize: 'clamp(96px, 22vw, 360px)' }}
        >
          404.
        </h1>

        <p className="mt-s7 max-w-[44ch] text-body-l text-ink/75 leading-[1.55]">
          The page you wanted isn&apos;t here. The page you didn&apos;t know you wanted, however, is
          probably one of these:
        </p>

        <nav aria-label="Recovery links" className="mt-s8 flex flex-col gap-s4 max-w-[44ch]">
          {[
            { href: '/work', label: 'The work', sub: '4 selected case studies' },
            { href: '/services', label: 'The services', sub: '5 disciplines, one studio' },
            { href: '/about', label: 'About', sub: 'Who is making this' },
            { href: '/', label: 'Home', sub: 'Start at the top' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cur="link"
              className="group grid grid-cols-[1fr_auto] gap-s5 items-baseline py-s4 border-t border-ink/15 last:border-b focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4"
            >
              <div className="flex flex-col gap-s2">
                <div className="font-display font-bold text-d-m text-ink tracking-[-0.01em] leading-[1.15] group-hover:text-crimson transition-colors duration-200">
                  {l.label}
                </div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/60">
                  {l.sub}
                </div>
              </div>
              <span
                aria-hidden
                className="font-mono text-[12px] tracking-[0.16em] uppercase text-ink/70 group-hover:text-crimson group-hover:translate-x-1 transition-all duration-300"
              >
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Reserved-moment signoff */}
        <div className="mt-s9 font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55 flex items-center gap-s3">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
          <span>WE NOTICED YOU NOTICED</span>
        </div>
      </div>
    </section>
  );
}
