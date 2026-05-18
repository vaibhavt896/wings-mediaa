'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface PinScrubProps {
  children: ReactNode;
  /**
   * 'horizontal' (default) — pins section, translates inner row by `distance`.
   *   Used by Beat 7 process band.
   * 'pin' — pins section for a duration; children stay anchored (useful with custom scrub timelines inside).
   *   Used by Beats 5 / 6 (numbers / services stack).
   */
  mode?: 'horizontal' | 'pin';
  /** Scroll distance the pin lasts, expressed as scroll-screen multiplier. Default 2 (= '+=200%'). */
  duration?: number;
  /** Scrub smoothing (0 = direct, 1 = laggy). Handoff §04 spec is 0.6. */
  scrub?: number | boolean;
  /** Optional className for the outer section. */
  className?: string;
  /** Optional className for the inner moving row (horizontal mode). */
  innerClassName?: string;
}

/**
 * PinScrub — wraps ScrollTrigger pin+scrub patterns.
 * Reduced motion: section renders flat with normal vertical scroll, no pinning.
 */
export default function PinScrub({
  children,
  mode = 'horizontal',
  duration = 2,
  scrub = 0.6,
  className,
  innerClassName,
}: PinScrubProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    if (reduced) return;

    const ctx = gsap.context(() => {
      if (mode === 'horizontal') {
        const inner = root.querySelector<HTMLElement>('[data-pin-inner]');
        if (!inner) return;
        // Calculate how far to translate: full inner width minus viewport.
        const distance = () => -(inner.scrollWidth - window.innerWidth);

        gsap.to(inner, {
          x: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${Math.max(inner.scrollWidth - window.innerWidth, window.innerHeight)}`,
            pin: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // 'pin' mode — just pin the section for a vertical scroll window.
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: `+=${duration * 100}%`,
          pin: true,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [mode, duration, scrub, reduced]);

  if (mode === 'horizontal') {
    // Reduced-motion fallback: keep the horizontal layout but let users scroll it natively
    // with scroll-snap, so every card remains reachable.
    return (
      <section
        ref={wrap}
        className={cn(
          reduced ? 'overflow-x-auto snap-x snap-mandatory' : 'overflow-hidden',
          className
        )}
      >
        <div
          data-pin-inner
          className={cn(
            'flex flex-nowrap items-stretch',
            reduced && '[&>*]:snap-start',
            innerClassName
          )}
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className={className}>
      {children}
    </section>
  );
}
