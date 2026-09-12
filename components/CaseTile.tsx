'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CaseTileProps {
  href: string;
  /** Client / project title. */
  title: string;
  /** Mono caption row e.g. "01 · D2C · 2026 · ROAS 7.4×". */
  caption?: string;
  /** Image source — use a real asset; gradient fallback applies if omitted. */
  image?: string;
  imageAlt?: string;
  /** Optional accent color for transition flood + gradient fallback. Default crimson. */
  accent?: string;
  /** Optional index label "CASE · 003" — defaults to derived. */
  indexLabel?: string;
  /** Reveal on scroll into view? Default true. */
  reveal?: boolean;
  className?: string;
  /** Override aspect ratio. Default 16/10 per spec. */
  aspect?: '16/10' | '9/16' | '4/3' | '1/1';
}

const aspectClass: Record<NonNullable<CaseTileProps['aspect']>, string> = {
  '16/10': 'aspect-[16/10]',
  '9/16': 'aspect-[9/16]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
};

/**
 * CaseTile — work-grid tile per handoff §05.
 * - 16:10 default media block with gradient fallback (uses `accent`)
 * - Hover: scale 1.04 with overshoot, neighbor-shift handled by parent grid
 * - data-cur="media" → cursor swaps to the VIEW pill state
 * - mask-reveal on scroll into view (clip-path inset 100% → 0)
 */
export default function CaseTile({
  href,
  title,
  caption,
  image,
  imageAlt,
  accent = '#FF3D2E',
  indexLabel,
  reveal = true,
  className,
  aspect = '16/10',
}: CaseTileProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!reveal) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.clipPath = 'inset(0 0 0 0)';
      return;
    }
    el.style.clipPath = 'inset(0 100% 0 0)';
    el.style.transition = 'clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1)';

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.clipPath = 'inset(0 0 0 0)';
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);

  return (
    <Link
      ref={ref}
      href={href}
      data-cur="media"
      className={cn(
        'group block relative isolate overflow-hidden rounded-r4',
        'focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4',
        className
      )}
      aria-label={`View case study: ${title}`}
    >
      {/* Media block */}
      <div className={cn('relative w-full overflow-hidden rounded-r4 bg-ink-2', aspectClass[aspect])}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 720px) 100vw, 50vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
            style={{
              background: `
                linear-gradient(120deg, ${accent}44 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(230,255,60,0.18), transparent 60%),
                linear-gradient(135deg, ${accent} 0%, #15151C 100%)
              `,
            }}
          />
        )}

        {/* Bottom hairline + index label on the media itself */}
        {indexLabel && (
          <div className="absolute left-s5 bottom-s4 font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90 z-10">
            {indexLabel}
          </div>
        )}
      </div>

      {/* Caption row below the tile */}
      <div className="mt-s4 flex flex-col gap-s2">
        <div className="font-display font-bold text-d-m text-bone leading-[1.1] tracking-[-0.01em]">
          {title}
        </div>
        {caption && (
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
            {caption}
          </div>
        )}
      </div>
    </Link>
  );
}
