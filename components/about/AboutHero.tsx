'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { AboutContent } from '@/lib/content/about';

/**
 * About hero — calm register. Larger leading on the headline, slower stagger,
 * NO ambient glow (the about page should breathe rather than swirl).
 */
export default function AboutHero({ hero }: { hero: AboutContent['hero'] }) {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-about-reveal]', {
        y: 24,
        opacity: 0,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.12, // slower stagger than other heroes
        delay: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className="relative isolate pt-[140px] pb-s9 px-5 md:px-9 min-h-[72vh] flex flex-col justify-center"
    >
      <div className="container-page max-w-[1100px]">
        <div
          data-about-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>{hero.eyebrow}</span>
        </div>

        <h1
          data-about-reveal
          className="font-display font-extrabold text-bone tracking-[-0.03em] leading-[1.05] max-w-[18ch]"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
        >
          {hero.line}
        </h1>

        <p
          data-about-reveal
          className="mt-s8 max-w-[60ch] text-body-l text-bone/75 leading-[1.65]"
        >
          {hero.sub}
        </p>
      </div>
    </section>
  );
}
