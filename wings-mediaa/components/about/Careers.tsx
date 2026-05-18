'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '@/components/Button';
import type { AboutContent } from '@/lib/content/about';

interface CareersProps {
  careers: AboutContent['careers'];
  press: AboutContent['press'];
}

/**
 * Careers + press strip — tail of the About page.
 * "We're hiring." is big and warm. Press strip below is mono caps in a single row.
 */
export default function Careers({ careers, press }: CareersProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-careers-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Build a marquee-ready string of press mentions repeated twice.
  const pressDuration = Math.max(press.length * 6, 24); // seconds at ~100px/s

  return (
    <section
      ref={ref}
      aria-labelledby="careers-label"
      className="relative isolate overflow-hidden border-t border-hair"
    >
      {/* Careers block */}
      <div className="px-5 md:px-9 py-s10">
        <div className="container-page max-w-[1100px] flex flex-col gap-s7">
          <div
            data-careers-reveal
            className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4"
          >
            <span className="block w-9 h-px bg-crimson" />
            <span id="careers-label">{careers.eyebrow}</span>
          </div>

          <h2
            data-careers-reveal
            className="font-display font-extrabold text-bone leading-[0.95] tracking-[-0.04em] max-w-[15ch]"
            style={{ fontSize: 'clamp(56px, 10vw, 144px)' }}
          >
            {careers.italicWord ? (
              <>
                {careers.headline.replace(careers.italicWord, '')}
                <span className="ital">{careers.italicWord}</span>
              </>
            ) : (
              careers.headline
            )}
          </h2>

          <p
            data-careers-reveal
            className="max-w-[60ch] text-body-l text-bone/75 leading-[1.65]"
          >
            {careers.blurb}
          </p>

          <div data-careers-reveal className="flex flex-wrap items-center gap-s5 mt-s2">
            <Button variant="primary" href={careers.primary.href} external={careers.primary.href.startsWith('mailto:')}>
              {careers.primary.label}
            </Button>
            <Button variant="ghost" href={careers.secondary.href} external={careers.secondary.href.startsWith('mailto:')}>
              {careers.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Press strip — mono caps marquee */}
      <div className="border-t border-hair bg-ink-2 overflow-hidden">
        <div
          className="marquee-track py-s5"
          style={{
            ['--marquee-duration' as string]: `${pressDuration}s`,
            ['--marquee-direction' as string]: 'normal',
          } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-s8 shrink-0" aria-hidden={copy === 1}>
              {press.map((p, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute inline-flex items-center gap-s5"
                >
                  {p}
                  <span className="text-crimson" aria-hidden>●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
