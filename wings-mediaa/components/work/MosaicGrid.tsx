'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import TransitionLink from './TransitionLink';
import FilterChips, { type FilterValue } from './FilterChips';
import { cases, type Case, type TileAspect } from '@/lib/content/cases';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

/**
 * MosaicGrid — varying-aspect-ratio work mosaic.
 *
 * Layout — CSS Grid with `auto-flow: dense` (browsers pack short tiles next to tall ones).
 * Each tile spans columns according to its `aspect` field.
 *
 * Filtering — GSAP Flip records the layout, the state changes, and Flip animates each
 * tile from its old bounding box to the new one. Hidden tiles fade out, new tiles fade in.
 *
 * Each tile uses TransitionLink so clicking morphs the tile box into the case hero
 * via the View Transitions API (slug-keyed view-transition-name).
 */
export default function MosaicGrid() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const prevFilterRef = useRef<FilterValue>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return cases;
    return cases.filter((c) => c.verticals.includes(filter));
  }, [filter]);

  const counts = useMemo(() => {
    const out: Partial<Record<FilterValue, number>> = { all: cases.length };
    for (const c of cases) {
      for (const v of c.verticals) {
        out[v] = (out[v] ?? 0) + 1;
      }
    }
    return out;
  }, []);

  // GSAP Flip for filter transitions
  useEffect(() => {
    if (prevFilterRef.current === filter) return;
    prevFilterRef.current = filter;

    const root = gridRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiles = root.querySelectorAll<HTMLElement>('[data-mosaic-tile]');
    const state = Flip.getState(tiles, { props: 'opacity' });
    // Force layout reflow then animate to it.
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.04,
        absolute: true,
        scale: false,
        onEnter: (els: Element[]) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }),
        onLeave: (els: Element[]) => gsap.to(els, { opacity: 0, duration: 0.3, ease: 'expo.out' }),
      });
    });
  }, [filter]);

  return (
    <>
      <FilterChips value={filter} onChange={setFilter} counts={counts} className="mb-s8" />

      <div
        ref={gridRef}
        data-mosaic-grid
        className="grid grid-cols-2 md:grid-cols-6 gap-s5 md:gap-s6 auto-rows-[120px] md:auto-rows-[140px]"
        style={{ gridAutoFlow: 'dense' }}
      >
        {filtered.map((c, i) => (
          <MosaicTile key={c.slug} c={c} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-s7 font-mono text-[12px] tracking-[0.16em] uppercase text-mute">
          Nothing here yet. Try another filter.
        </p>
      )}
    </>
  );
}

/* ----------------------------- TILE --------------------------------------- */

/**
 * Map our tile aspect token → Tailwind grid-span classes.
 * Each tile occupies different column/row spans on the 6-col grid.
 * Mobile (2-col): everything collapses to col-span-2 with aspect-driven row-span.
 */
const TILE_LAYOUT: Record<TileAspect, { col: string; row: string }> = {
  '16:10': { col: 'col-span-2 md:col-span-4', row: 'row-span-2 md:row-span-3' },
  '4:3': { col: 'col-span-2 md:col-span-3', row: 'row-span-2' },
  '1:1': { col: 'col-span-2 md:col-span-3', row: 'row-span-2 md:row-span-3' },
  '9:16': { col: 'col-span-2 md:col-span-2', row: 'row-span-3 md:row-span-4' },
  '21:9': { col: 'col-span-2 md:col-span-6', row: 'row-span-2 md:row-span-2' },
};

function MosaicTile({ c, index }: { c: Case; index: number }) {
  const layout = TILE_LAYOUT[c.aspect] ?? TILE_LAYOUT['16:10'];

  return (
    <article
      data-mosaic-tile
      data-slug={c.slug}
      className={cn('relative isolate group', layout.col, layout.row)}
    >
      <TransitionLink
        href={`/work/${c.slug}`}
        data-cur="media"
        viewTransitionName={`case-hero-${c.slug}`}
        className="block relative w-full h-full overflow-hidden rounded-r4 focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4"
        aria-label={`View case study: ${c.title}`}
      >
        {/* Media — gradient fallback if no image, scales 1.04 on hover */}
        {c.cover.image ? (
          <Image
            src={c.cover.image}
            alt={c.title}
            fill
            sizes="(max-width: 720px) 100vw, 50vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
            priority={index < 2}
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
            style={{
              background: `
                linear-gradient(120deg, ${c.cover.accent}55 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(230,255,60,0.16), transparent 60%),
                linear-gradient(135deg, ${c.cover.accent} 0%, #15151C 100%)
              `,
            }}
          />
        )}

        {/* Bottom-left overlay: index + title */}
        <div className="absolute inset-x-0 bottom-0 p-s5 z-10 flex flex-col gap-s2 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent">
          <div className="font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-bone/85">
            {c.indexLabel}
          </div>
          <div className="font-display font-bold text-[14px] md:text-d-m text-bone tracking-[-0.01em] leading-[1.15]">
            {c.title}
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-mute mt-s2 hidden md:block">
            {c.summary}
          </div>
        </div>

        {/* Vertical chip on top-right */}
        <div className="absolute top-s4 right-s4 z-10 flex flex-wrap items-center gap-s2 max-w-[70%] justify-end">
          {c.verticals.slice(0, 2).map((v) => (
            <span
              key={v}
              className="font-mono text-[10px] tracking-[0.16em] uppercase px-s3 py-1 rounded-pill bg-ink/55 backdrop-blur-sm text-bone/85 border border-hair"
            >
              {v}
            </span>
          ))}
        </div>
      </TransitionLink>
    </article>
  );
}
