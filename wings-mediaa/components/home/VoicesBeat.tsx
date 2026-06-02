'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Quote from '@/components/Quote';
import { home } from '@/lib/content/home';

/**
 * Beat 8 — Voices.
 * Two testimonial pull-quotes. Slow editorial pacing, no scrubs.
 * Per spec: "the page slows here on purpose."
 */
export default function VoicesBeat() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-fade]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.18,
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-labelledby="voices-label" className="section">
      <div className="container-page">
        <h2
          id="voices-label"
          data-fade
          className="font-mono text-[12px] font-normal tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s8"
        >
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span>06 · WHY WE EXIST</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-s8 md:gap-s10">
          {home.voices.map((v, i) => (
            <div key={i} data-fade>
              <Quote
                size="xl"
                text={v.text}
                name={v.name}
                role={v.role}
                company={v.company}
                lime={v.lime}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
