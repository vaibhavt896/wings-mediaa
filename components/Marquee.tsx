'use client';

import { cn } from '@/lib/utils';
import { useState, type CSSProperties, type ReactNode } from 'react';

interface MarqueeProps {
  items: ReactNode[];
  /** Pixels per second. Handoff §04 marquee token range: 60–100. Default 80. */
  speed?: number;
  /** Reverse direction. Default false (left-to-right consumption, i.e. content slides left). */
  reverse?: boolean;
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean;
  /** Separator between items (Crimson dot by default). Pass `null` to disable. */
  separator?: ReactNode | null;
  /** Variant — `display` (big bone Display text) or `mono` (small uppercase mute). Default 'display'. */
  variant?: 'display' | 'mono';
  /** Extra className for the outer wrapper. */
  className?: string;
}

const defaultSeparator = (
  <span className="text-crimson text-[12px] inline-flex items-center" aria-hidden>
    ●
  </span>
);

/**
 * Marquee — constant-velocity horizontal scroll.
 * Renders items twice so the loop seams perfectly at -50% translation.
 * Duration is derived from `speed` + measured width via CSS calc + animation.
 * Pause on hover via animation-play-state. Reduced motion freezes via globals.css rule.
 */
export default function Marquee({
  items,
  speed = 80,
  reverse = false,
  pauseOnHover = true,
  separator = defaultSeparator,
  variant = 'display',
  className,
}: MarqueeProps) {
  // We render the items twice so the -50% translation loop is seamless.
  // Duration is approximate (using an estimated width per item) — animation drives the loop.
  // Estimate width: 280px per item for display, 200px for mono. Tweakable.
  const estPerItem = variant === 'display' ? 280 : 200;
  const totalWidth = items.length * estPerItem;
  const duration = totalWidth / speed; // seconds

  const itemClass =
    variant === 'display'
      ? 'font-display font-bold text-[28px] tracking-[-0.02em] text-bone'
      : 'font-mono text-[13px] tracking-[0.18em] uppercase text-mute';

  const [paused, setPaused] = useState(false);
  const trackStyle: CSSProperties & Record<string, string> = {
    '--marquee-duration': `${duration}s`,
    '--marquee-direction': reverse ? 'reverse' : 'normal',
  };

  return (
    <div
      className={cn('overflow-hidden hairline-top hairline-bottom bg-ink-2', className)}
      role="marquee"
      aria-label="Scrolling content strip"
    >
      <div
        className="marquee-track py-s6"
        style={trackStyle}
        data-paused={pauseOnHover && paused ? 'true' : 'false'}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        {/* Render twice for seamless -50% loop */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-s8 items-center shrink-0" aria-hidden={copy === 1}>
            {items.map((it, i) => (
              <span key={`${copy}-${i}`} className={cn(itemClass, 'inline-flex items-center gap-s5')}>
                {it}
                {separator}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
