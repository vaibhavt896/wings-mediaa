import type { Credit } from '@/lib/content/cases';

interface CreditsBlockProps {
  credits: Credit[];
}

/**
 * Credits — mono two-column row per credit (role on left, name on right).
 * Always at the tail of the case page, before the next-case CTA.
 */
export default function CreditsBlock({ credits }: CreditsBlockProps) {
  return (
    <section
      aria-labelledby="credits-label"
      className="px-5 md:px-9 py-s10 bg-ink border-t border-hair"
    >
      <div className="container-page">
        <h2
          id="credits-label"
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
        >
          <span className="block w-9 h-px bg-crimson" />
          CREDITS
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-s4 max-w-[840px]">
          {credits.map((c) => (
            <div
              key={`${c.role}-${c.name}`}
              className="contents md:contents font-mono text-[12px] tracking-[0.14em] uppercase"
            >
              <dt className="text-mute py-s2 border-b border-hair pr-s5">{c.role}</dt>
              <dd className="text-bone py-s2 border-b border-hair">{c.name}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
