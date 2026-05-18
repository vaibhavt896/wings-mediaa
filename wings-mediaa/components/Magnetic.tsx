'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  /** Activation radius around element center in px. Default 120 per handoff §04. */
  radius?: number;
  /** Coefficient applied to cursor offset. Default 0.18 per handoff §04. */
  coeff?: number;
  /** Optional className passed through to the wrapper. */
  className?: string;
  /** Optional inline style passed through. */
  style?: CSSProperties;
  /** Render as inline-block (default) or block. */
  as?: 'inline-block' | 'block';
}

/**
 * Magnetic wrapper — translates children toward cursor within `radius`.
 * Pure CSS transform updated on each mousemove (no rAF needed — events ≤ frame rate).
 * Respects reduced-motion + touch: no-ops because there is no mousemove event.
 */
export default function Magnetic({
  children,
  radius = 120,
  coeff = 0.18,
  className,
  style,
  as = 'inline-block',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < radius) {
      el.style.transform = `translate3d(${dx * coeff}px, ${dy * coeff}px, 0)`;
    }
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        display: as,
        transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
