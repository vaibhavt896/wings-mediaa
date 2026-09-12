import Link from 'next/link';
import { cases } from '@/lib/content/cases';

/**
 * Case-specific not-found. Renders when /work/[slug] receives an unknown slug.
 * Distinct from the site-wide lime 404 — this one stays on the dark canvas and
 * points the user at all four cases directly.
 */
export default function CaseNotFound() {
  return (
    <section className="relative isolate min-h-screen bg-ink text-bone pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col">
      <div className="container-page flex-1 flex flex-col justify-center max-w-[900px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span className="block w-9 h-px bg-crimson" />
          <span>CASE · NOT FOUND</span>
        </div>

        <h1
          className="font-display font-extrabold text-bone leading-[0.92] tracking-[-0.04em] max-w-[14ch]"
          style={{ fontSize: 'clamp(56px, 9vw, 144px)' }}
        >
          That case isn&apos;t <span className="ital">here.</span>
        </h1>

        <p className="mt-s7 max-w-[58ch] text-body-l text-bone/75 leading-[1.65]">
          It may have moved or never existed. The cases that are live:
        </p>

        <ul className="mt-s8 flex flex-col gap-0 max-w-[58ch]">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                data-cur="link"
                className="group block py-s5 border-t border-hair last:border-b grid grid-cols-[auto_1fr_auto] gap-s5 items-baseline"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
                  {c.indexLabel}
                </span>
                <span className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.2] group-hover:text-crimson transition-colors">
                  {c.title}
                </span>
                <span aria-hidden className="font-mono text-[12px] tracking-[0.16em] uppercase text-mute group-hover:text-crimson group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
