'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const WORDMARK = 'WINGS·MEDIAA';
const STORAGE_KEY = 'wm-preloader-seen';
export const PRELOADER_DONE_EVENT = 'wm:preloader-done';

/** Fire the done event safely. Listeners include HeroBeat for reveal coordination. */
function emitDone() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
  }
}

/**
 * Preloader per Beat 0 (handoff storyboard).
 * 1.0–1.2s wordmark assembly: each letter starts offset with random rotation/opacity,
 * settles into position with a slight overshoot, then the whole overlay curtains up.
 * Plays once per session — sessionStorage flag prevents replay on back-nav.
 * Reduced motion: skipped entirely (component returns null on mount).
 */
export default function Preloader() {
  const [active, setActive] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  // Decide whether to mount the preloader at all (avoids flash for reduced-motion users)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (reduced || seen) {
      setActive(false);
      document.body.style.overflow = '';
      // Skipped path — fire immediately so HeroBeat can reveal without delay.
      // Defer to next tick so any subscribers mounted in the same frame catch it.
      window.setTimeout(emitDone, 0);
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  // Run the assembly animation, then exit
  useEffect(() => {
    if (!active) return;
    const letters = lettersRef.current?.querySelectorAll<HTMLElement>('.pl-letter');
    if (!letters || !letters.length) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        document.body.style.overflow = '';
        setActive(false);
        emitDone();
      },
    });

    // Randomize start positions / rotation
    letters.forEach((el) => {
      el.dataset.y = String(-80 - Math.random() * 60);
      el.dataset.r = String((Math.random() - 0.5) * 30);
    });

    tl.set(letters, {
      y: (_i, el) => Number((el as HTMLElement).dataset.y),
      rotate: (_i, el) => Number((el as HTMLElement).dataset.r),
      opacity: 0,
    });

    // Total budget ≈ 1.2s per Beat 0 storyboard: 0.55s assembly + 0.1s hold + 0.55s curtain.
    tl.to(letters, {
      y: 0,
      rotate: 0,
      opacity: 1,
      duration: 0.55,
      ease: 'back.out(1.4)',
      stagger: { each: 0.035, from: 'start' },
    });

    // Brief hold
    tl.to({}, { duration: 0.1 });

    // Curtain up — overlay slides up + fades
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.55,
      ease: 'expo.inOut',
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
      style={{ pointerEvents: 'auto' }}
      aria-hidden
    >
      <div
        ref={lettersRef}
        className="font-display font-extrabold text-[clamp(36px,8vw,96px)] tracking-[0.12em] text-bone flex"
      >
        {WORDMARK.split('').map((ch, i) => (
          <span key={i} className="pl-letter inline-block">
            {ch === '·' ? <span className="text-crimson mx-1.5">·</span> : ch}
          </span>
        ))}
      </div>
    </div>
  );
}
