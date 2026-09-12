'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TransitionLink from '@/components/work/TransitionLink';
import Magnetic from '@/components/Magnetic';
import type { Case } from '@/lib/content/cases';

interface NextCaseProps {
  next: Case;
}

/**
 * Next-case CTA — full-bleed cover of the next case, wordmark headline, magnetic link.
 * Clicking it triggers the same View Transition as the work index → case page expand,
 * so chain-clicking through cases feels like sequential film cuts.
 */
export default function NextCase({ next }: NextCaseProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-next-reveal]', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="next-case-label"
      className="relative isolate overflow-hidden bg-ink border-t border-hair"
    >
      {/* Background — accent tint */}
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background: `
            radial-gradient(60vmax 60vmax at 80% 50%, ${next.cover.accent}55, transparent 60%),
            linear-gradient(135deg, ${next.cover.accent}10 0%, #0A0A0F 100%)
          `,
        }}
        aria-hidden
      />

      <div className="container-page px-5 md:px-9 py-s10 flex flex-col gap-s7">
        <div
          data-next-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span id="next-case-label">NEXT CASE</span>
        </div>

        <TransitionLink
          href={`/work/${next.slug}`}
          viewTransitionName={`case-hero-${next.slug}`}
          data-cur="media"
          className="block group focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4 rounded-r4"
        >
          <div
            data-next-reveal
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/70 mb-s4 group-hover:text-crimson transition-colors duration-200"
          >
            {next.indexLabel} · {next.client} · {next.year}
          </div>
          <h2
            data-next-reveal
            className="font-display font-extrabold text-xxl leading-[0.95] tracking-[-0.04em] text-bone group-hover:text-crimson transition-colors duration-300"
          >
            {next.title}
          </h2>
        </TransitionLink>

        <div data-next-reveal>
          <Magnetic>
            <TransitionLink
              href={`/work/${next.slug}`}
              className="btn btn-primary"
              data-cur="link"
            >
              View the case →
            </TransitionLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
