import Link from 'next/link';
import { insights } from '@/lib/content/insights';

/**
 * Insight-specific not-found. Lists all current field notes so the user lands somewhere useful.
 */
export default function InsightNotFound() {
  return (
    <section className="relative isolate min-h-screen bg-ink text-bone pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col">
      <div className="container-page flex-1 flex flex-col justify-center max-w-[900px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span className="block w-9 h-px bg-crimson" />
          <span>FIELD NOTE · NOT FOUND</span>
        </div>

        <h1
          className="font-display font-extrabold text-bone leading-[0.92] tracking-[-0.04em] max-w-[16ch]"
          style={{ fontSize: 'clamp(56px, 9vw, 128px)' }}
        >
          That note isn&apos;t <span className="ital">filed.</span>
        </h1>

        <p className="mt-s7 max-w-[58ch] text-body-l text-bone/75 leading-[1.65]">
          The ones that are:
        </p>

        <ul className="mt-s8 flex flex-col gap-0 max-w-[58ch]">
          {insights.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/insights/${i.slug}`}
                data-cur="link"
                className="group block py-s5 border-t border-hair last:border-b grid grid-cols-1 md:grid-cols-[1fr_auto] gap-s3 md:gap-s5 items-baseline"
              >
                <span className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.2] group-hover:text-crimson transition-colors">
                  {i.title}
                </span>
                <span aria-hidden className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute group-hover:text-crimson transition-colors">
                  {i.kind} · {i.readTime} MIN
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
