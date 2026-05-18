'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Target numeric value (e.g. 7.4, 312, 1500000). */
  to: number;
  /** Decimal places. Default: auto (1 if `to` has decimals, else 0). */
  decimals?: number;
  /** Optional prefix (e.g. "+", "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "%", "×", "K"). Renders in crimson via .unit class. */
  suffix?: string;
  /** Format with thousand separators (locale 'en-IN'). Default true for ints. */
  thousands?: boolean;
  /** Duration in ms. Default 1200 per handoff §04 count-up token. */
  duration?: number;
  className?: string;
}

/**
 * CountUp — animates 0 → `to` when scrolled into view.
 * 1.2s outQuart easing (1 - (1-p)^4). Runs once per mount.
 */
export default function CountUp({
  to,
  decimals,
  prefix = '',
  suffix = '',
  thousands,
  duration = 1200,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const runRef = useRef(false);

  const dec = decimals ?? (Number.isInteger(to) ? 0 : 1);
  const useThousands = thousands ?? Number.isInteger(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: set the final value, skip the tween.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      runRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || runRef.current) return;
        runRef.current = true;
        let start: number | null = null;
        const step = (t: number) => {
          if (start === null) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4); // outQuart
          setValue(to * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted = useThousands
    ? value.toLocaleString('en-IN', {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      })
    : value.toFixed(dec);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{formatted}</span>
      {suffix && <span className="text-crimson">{suffix}</span>}
    </span>
  );
}
