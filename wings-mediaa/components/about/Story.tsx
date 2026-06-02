'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LiveClock from '@/components/LiveClock';
import type { AboutContent } from '@/lib/content/about';

/**
 * The story — generous editorial column with the live locations strip at the bottom.
 * Quieter than the rest of the site on purpose: smaller max-width, taller leading,
 * eyebrow + paragraphs only — no images, no scrub, no decoration.
 */
export default function Story({
  story,
  locations,
}: {
  story: AboutContent['story'];
  locations: AboutContent['locations'];
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-story-reveal]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="story-label"
      className="px-5 md:px-9 py-s10 border-t border-hair"
    >
      <div className="container-page max-w-[820px]">
        <div
          data-story-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span id="story-label">{story.eyebrow}</span>
        </div>

        <div className="flex flex-col gap-s6">
          {story.paragraphs.map((p, i) => (
            <p
              key={i}
              data-story-reveal
              className="text-body-l text-bone/85 leading-[1.7] max-w-[64ch]"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Locations strip */}
        <div
          data-story-reveal
          className="mt-s9 pt-s7 border-t border-hair flex flex-col md:flex-row md:items-start md:justify-between gap-s5 font-mono text-[11px] tracking-[0.14em] uppercase text-mute"
        >
          <div className="flex items-center gap-s3">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
            <LiveClock className="text-bone tabular-nums" /> · KANPUR
          </div>
          {locations.map((loc) => (
            <div key={loc.city} className="flex flex-col gap-s2 max-w-[320px]">
              <span className="text-bone">{loc.city}</span>
              {loc.address && <span className="text-mute normal-case tracking-[0.04em]">{loc.address}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
