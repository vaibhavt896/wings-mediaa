'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import type { Case } from '@/lib/content/cases';

interface CaseHeroProps {
  c: Case;
}

/**
 * Case cover hero — full-bleed media + over-the-top title block.
 *
 * The cover element carries `view-transition-name: case-hero-${slug}` to receive the
 * tile→hero morph from /work. Inside, title + metadata fade up after a short delay.
 *
 * For kind=video, renders a muted autoplay loop; for kind=still, the cover image;
 * for kind=3d, a placeholder canvas surface (real WebGL deferred to Phase B follow-up).
 * Without real assets, falls back to a generated gradient using `cover.accent`.
 */
export default function CaseHero({ c }: CaseHeroProps) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 32,
        opacity: 0,
        duration: 1.0,
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
      className="relative isolate min-h-screen pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col"
    >
      {/* Cover media — the view-transition-name target */}
      <div
        className="relative w-full rounded-r4 overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-ink-2 mb-s8"
        style={{ viewTransitionName: `case-hero-${c.slug}` } as React.CSSProperties}
      >
        {c.cover.kind === 'video' && c.cover.videoSrc ? (
          <video
            src={c.cover.videoSrc}
            poster={c.cover.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : c.cover.image ? (
          <Image
            src={c.cover.image}
            alt={c.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          /* Gradient fallback */
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(120deg, ${c.cover.accent}55 0%, transparent 50%),
                radial-gradient(circle at 80% 30%, rgba(230,255,60,0.16), transparent 60%),
                linear-gradient(135deg, ${c.cover.accent} 0%, #15151C 100%)
              `,
            }}
          />
        )}

        {/* Bottom-left overlay strip */}
        <div className="absolute inset-x-0 bottom-0 p-s7 z-10 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent">
          <div
            data-hero-reveal
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/85"
          >
            {c.indexLabel}
          </div>
        </div>
      </div>

      {/* Title + metadata */}
      <div className="container-page flex flex-col gap-s7">
        <div
          data-hero-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>{c.indexLabel}</span>
          <span aria-hidden>·</span>
          <span>{c.client}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{c.year}</span>
        </div>

        <h1
          data-hero-reveal
          className="font-display font-extrabold text-xxl leading-[0.95] tracking-[-0.04em] text-bone max-w-[18ch]"
        >
          {c.title}
        </h1>

        <div data-hero-reveal className="flex flex-wrap items-center gap-s3 mt-s2">
          {c.verticals.map((v) => (
            <span
              key={v}
              className="font-mono text-[11px] tracking-[0.16em] uppercase px-s4 py-s2 rounded-pill border border-hair text-bone/85"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
