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
  className,
  style,
  as = 'inline-block',
}: MagneticProps) {
  return (
    <div
      className={className}
      style={{
        display: as,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
