'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'link' | 'drag' | 'media' | 'hidden';

/**
 * Two-element cursor (dot + halo) with five states.
 * Pure CSS transforms updated by rAF; no React state per frame.
 * - default: dot 8px + halo 36px, mix-blend-mode difference
 * - link:    over a/button/[data-cur=link] → halo grows to 74px, accent border
 * - media:   over [data-cur=media] → halo becomes 96px with "VIEW" label
 * - drag:    over [data-cur=drag]  → halo becomes horizontal pill "◀ DRAG ▶"
 * - hidden:  touch / prefers-reduced-motion → component returns null
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    if (reduced || touch) {
      setMode('hidden');
      return;
    }

    let mx = -100;
    let my = -100;
    let hx = -100;
    let hy = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
    };

    const loop = () => {
      // Lerp 0.16 per handoff §04 cursor-lerp token
      hx += (mx - hx) * 0.16;
      hy += (my - hy) * 0.16;
      if (haloRef.current) {
        const w = haloRef.current.offsetWidth || 36;
        const h = haloRef.current.offsetHeight || 36;
        haloRef.current.style.transform = `translate3d(${hx - w / 2}px, ${hy - h / 2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    // State detection — walks up the tree on mouseover for each event target.
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-cur="drag"]')) setMode('drag');
      else if (t.closest('[data-cur="media"]')) setMode('media');
      else if (t.closest('a, button, [data-cur="link"], [role="button"]')) setMode('link');
      else setMode('default');
    };
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (mode === 'hidden') return null;

  const stateClass = mode === 'default' ? '' : mode;

  return (
    <>
      <div ref={dotRef} className={`cur-dot ${stateClass}`} aria-hidden />
      <div ref={haloRef} className={`cur-halo ${stateClass}`} aria-hidden />
    </>
  );
}
