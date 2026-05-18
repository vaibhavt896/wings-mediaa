'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CaseTile from '@/components/CaseTile';
import Button from '@/components/Button';
import { home } from '@/lib/content/home';

/**
 * Beat 4 — Selected Work.
 * Two-up grid; tiles mask-reveal on scroll-in-view with 120ms diagonal stagger.
 * Hovering a tile shifts neighbor 8px (handled by CSS sibling rules below).
 * Cursor swaps to VIEW pill on hover (CaseTile sets data-cur="media").
 */
export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null);

  // Reveal the section header + tile mask-reveal stagger on scroll-in-view.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Reduced motion: snap all tiles open immediately.
      root.querySelectorAll<HTMLElement>('[data-sw-tile]').forEach((el) => {
        el.style.clipPath = 'inset(0 0 0 0)';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Header — eyebrow + title + sub fade-up with 60ms stagger.
      gsap.from('[data-reveal]', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });

      // Tiles — coordinated mask-reveal with 120ms diagonal stagger (spec).
      const tiles = root.querySelectorAll<HTMLElement>('[data-sw-tile]');
      gsap.set(tiles, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(tiles, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.9,
        ease: 'expo.out',
        stagger: { each: 0.12, from: 'start' },
        scrollTrigger: { trigger: '[data-sw-grid]', start: 'top 80%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section">
      <div className="container-page">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-s6 mb-s8">
          <div>
            <div
              data-reveal
              className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5"
            >
              <span className="block w-9 h-px bg-crimson" />
              04 / 09 — SELECTED WORK
            </div>
            <h2
              data-reveal
              className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1] text-bone max-w-[9ch]"
            >
              The <span className="ital">work.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-[460px] text-body-m text-bone/70">
            Four pieces that show the spine of what we do — D2C launches, brand films, performance
            rewrites. Each opens into its own film.
          </p>
        </div>

        {/* 2-up grid with neighbor-shift on hover. data-sw-grid is the stagger trigger;
            each tile is wrapped in a data-sw-tile div so the parent owns the 120ms mask-reveal stagger. */}
        <div data-sw-grid className="sw-grid grid grid-cols-1 md:grid-cols-2 gap-s7 md:gap-s8">
          {home.selectedWork.map((c) => (
            <div key={c.slug} data-sw-tile>
              <CaseTile
                href={`/work/${c.slug}`}
                title={c.title}
                caption={c.caption}
                indexLabel={c.indexLabel}
                accent={c.accent}
                reveal={false}
              />
            </div>
          ))}
        </div>

        {/* See all work CTA */}
        <div className="mt-s8 flex justify-end">
          <Button variant="ghost" href="/work">
            See all work →
          </Button>
        </div>
      </div>

      <style jsx>{`
        @media (hover: hover) and (min-width: 768px) {
          [data-sw-tile] {
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .sw-grid:has([data-sw-tile] a:hover) > [data-sw-tile]:not(:has(a:hover)) {
            transform: translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}
