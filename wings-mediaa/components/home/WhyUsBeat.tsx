import { home } from '@/lib/content/home';

/**
 * Why Wings Mediaa — four differentiator blocks in a two-up grid.
 * The studio's case for itself: AI edge, founder access, local intelligence, monthly clarity.
 */
export default function WhyUsBeat() {
  const { whyUs } = home;
  return (
    <section
      aria-labelledby="whyus-label"
      className="section border-t border-hair bg-ink-2"
    >
      <div className="container-page">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span id="whyus-label">{whyUs.eyebrow}</span>
        </div>

        <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.02] text-bone max-w-[22ch] mb-s9">
          {whyUs.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-s8 md:gap-s9">
          {whyUs.items.map((it, i) => (
            <div key={i} className="flex flex-col gap-s4">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-crimson">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display font-bold text-d-m text-bone tracking-[-0.02em] leading-[1.15] max-w-[24ch]">
                {it.title}
              </h3>
              <p className="text-body-m text-bone/70 leading-[1.6] max-w-[52ch]">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
