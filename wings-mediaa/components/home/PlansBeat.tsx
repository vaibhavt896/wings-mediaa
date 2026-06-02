import Link from 'next/link';
import Button from '@/components/Button';
import { home } from '@/lib/content/home';
import { cn } from '@/lib/utils';

/**
 * Plans — premium framing, not a price grid. Three tiers, the middle one featured.
 * "Start where you are. Scale when you're ready." Every plan starts with a free conversation.
 */
export default function PlansBeat() {
  const { plans } = home;
  return (
    <section
      aria-labelledby="plans-label"
      className="section border-t border-hair"
    >
      <div className="container-page">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span id="plans-label">{plans.eyebrow}</span>
        </div>

        <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.02] text-bone max-w-[18ch] mb-s9">
          {plans.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-s6">
          {plans.items.map((p) => (
            <div
              key={p.name}
              className={cn(
                'relative isolate flex flex-col gap-s5 rounded-r4 border px-s7 py-s8 overflow-hidden',
                p.featured ? 'border-crimson bg-ink-2' : 'border-hair bg-ink-2/60'
              )}
            >
              {p.featured && (
                <div
                  className="absolute inset-0 -z-10 opacity-40"
                  aria-hidden
                  style={{
                    background:
                      'radial-gradient(40vmax 40vmax at 50% 0%, rgba(255,61,46,0.18), transparent 70%)',
                  }}
                />
              )}
              <div className="flex items-center justify-between gap-s4">
                <h3 className="font-display font-bold text-d-m text-bone tracking-[-0.02em] leading-[1.1]">
                  {p.name}
                </h3>
                {p.featured && (
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-crimson border border-crimson rounded-pill px-s3 py-1 shrink-0">
                    Most chosen
                  </span>
                )}
              </div>
              <p className="text-body-m text-bone/75 leading-[1.6]">{p.blurb}</p>
              <p className="mt-auto font-mono text-[11px] tracking-[0.14em] uppercase text-mute leading-[1.5]">
                {p.tagline}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-s9 flex flex-wrap items-center gap-s5">
          <Button variant="primary" href="/contact">
            Get a plan built for your business →
          </Button>
          <Link
            href="/contact"
            data-cur="link"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute hover:text-bone transition-colors"
          >
            {plans.footnote}
          </Link>
        </div>
      </div>
    </section>
  );
}
