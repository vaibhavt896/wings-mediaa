'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/Button';
import { home } from '@/lib/content/home';

/**
 * Beat 9 — CTA close.
 * Oversized wordmark fills the viewport at the bottom (mask-reveal char-by-char on scroll-in).
 * Magnetic primary CTA + secondary calendar link beneath.
 */
export default function CTABeat() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Wordmark chars rise letter-by-letter (already wrapped in spans).
      gsap.from('[data-cta-letter]', {
        yPercent: 110,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: root, start: 'top 65%', once: true },
      });
      // CTAs fade up after the wordmark.
      gsap.from('[data-cta-action]', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 65%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const wordmark = 'WINGS·MEDIAA';

  return (
    <section
      ref={ref}
      aria-labelledby="cta-label"
      className="relative isolate overflow-hidden border-t border-hair px-5 md:px-9 py-s10"
    >
      <div className="ambient-glow" aria-hidden />

      <div className="container-page flex flex-col items-start gap-s9">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
          <span className="block w-9 h-px bg-crimson" />
          <span id="cta-label">07 · START</span>
        </div>

        <h2 className="font-display font-extrabold text-bone leading-[0.92] tracking-[-0.04em] text-[clamp(60px,13vw,200px)]">
          Get found. Get <span className="ital">chosen.</span>
        </h2>

        {/* Oversized wordmark — the brand mark scales to fill */}
        <div
          aria-hidden
          className="w-full overflow-hidden text-bone leading-none font-display font-extrabold tracking-[0.04em]"
          style={{ fontSize: 'clamp(48px, 14vw, 220px)' }}
        >
          <span className="inline-flex items-center">
            {wordmark.split('').map((ch, i) => (
              <span
                key={i}
                data-cta-letter
                className="inline-block"
                style={{ minWidth: ch === '·' ? '0.4em' : undefined }}
              >
                {ch === '·' ? <span className="text-crimson">·</span> : ch}
              </span>
            ))}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-s5 mt-s4">
          <div data-cta-action>
            <Button variant="primary" href={home.cta.primary.href}>
              {home.cta.primary.label} →
            </Button>
          </div>
          <div data-cta-action>
            <Button variant="ghost" href={home.cta.secondary.href}>
              {home.cta.secondary.label}
            </Button>
          </div>
          <div data-cta-action className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute md:ml-s5">
            <span className="text-bone">hello@wingsmediaa.com</span>
            <span className="mx-s3" aria-hidden>·</span>
            <span>Kanpur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
