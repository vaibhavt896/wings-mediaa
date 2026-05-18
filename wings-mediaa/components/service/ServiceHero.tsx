'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { ServiceContent } from '@/lib/content/services';
import { cn } from '@/lib/utils';

interface ServiceHeroProps {
  s: ServiceContent;
}

/**
 * Service page hero. The eyebrow + headline + sub reveal on mount with the
 * standard 60ms expo-out word stagger. The italic word lands in Crimson serif.
 *
 * Light register (bone canvas) only swaps the text color — typography sizing
 * is shared with all other service heroes.
 */
export default function ServiceHero({ s }: ServiceHeroProps) {
  const wrap = useRef<HTMLElement>(null);
  const light = s.register === 'bone';

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-svc-hero-reveal]', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className={cn(
        'relative isolate min-h-screen pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col justify-center',
        light ? 'bg-bone text-ink' : 'bg-ink text-bone'
      )}
    >
      {!light && <div className="ambient-glow" aria-hidden />}

      <div className="container-page">
        <div
          data-svc-hero-reveal
          className={cn(
            'font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-s4 mb-s7',
            light ? 'text-ink/60' : 'text-mute'
          )}
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>{s.eyebrow}</span>
        </div>

        <h1
          className={cn(
            'font-display font-extrabold text-xxl leading-[0.92] tracking-[-0.04em]',
            light ? 'text-ink' : 'text-bone'
          )}
        >
          {s.heroLines.map((line, i) => {
            const trimmed = line.trim();
            const isItalic = trimmed === s.italicWord;
            return (
              <span key={i} data-svc-hero-reveal className="block overflow-hidden">
                <span className="inline-block">
                  {isItalic ? <span className="ital">{line}</span> : line}
                </span>
              </span>
            );
          })}
        </h1>

        <p
          data-svc-hero-reveal
          className={cn(
            'mt-s7 max-w-[640px] text-body-l leading-[1.55]',
            light ? 'text-ink/75' : 'text-bone/80'
          )}
        >
          {s.sub}
        </p>

        <div
          data-svc-hero-reveal
          className={cn(
            'mt-s8 flex items-center gap-s4 font-mono text-[11px] tracking-[0.16em] uppercase',
            light ? 'text-ink/50' : 'text-mute'
          )}
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
          <span>{s.demoCaption}</span>
        </div>
      </div>
    </section>
  );
}
