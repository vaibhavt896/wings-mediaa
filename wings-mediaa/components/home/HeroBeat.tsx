'use client';

import { useEffect, useRef, useState } from 'react';
import HeroStatement from '@/components/HeroStatement';
import { home } from '@/lib/content/home';

/**
 * Beat 1 + 2 combined.
 * Beat 1 — Display XXL kinetic hero. Waits for `wm:preloader-done` to start its reveal.
 * Beat 2 — Sub-anchor copy + mono "01 / 09" counter + pulsing scroll affordance.
 *
 * Layout: full viewport height, ambient gradient drift behind, grain overlay (global).
 */
export default function HeroBeat() {
  const [ready, setReady] = useState(false);
  const subRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);

  // Sub-anchor + foot reveal — fires 1.5s after preloader done (whether real or skipped).
  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener('wm:preloader-done', onDone, { once: true });
    return () => window.removeEventListener('wm:preloader-done', onDone);
  }, []);

  return (
    <section className="relative isolate min-h-screen pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col justify-center">
      <div className="ambient-glow" aria-hidden />

      <div className="container-page flex-1 flex flex-col justify-center">
        {/* Beat 2a — eyebrow with "01 / 09" counter */}
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span className="block w-9 h-px bg-crimson" />
          <span>01 / 09 — THE STATEMENT</span>
        </div>

        {/* Beat 1 — kinetic statement */}
        <HeroStatement
          lines={home.hero.lines}
          italicWord={home.hero.italicWord}
          waitForPreloader
        />

        {/* Beat 2b — sub-anchor */}
        <div
          ref={subRef}
          className="mt-s7 max-w-[640px] transition-all duration-[900ms]"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(20px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: ready ? '0.6s' : '0s',
          }}
        >
          <p className="text-body-l text-bone/80 leading-[1.55]">{home.hero.sub}</p>
        </div>
      </div>

      {/* Beat 2c — foot: live · scroll affordance */}
      <div
        ref={footRef}
        className="container-page mt-s8 transition-opacity duration-[900ms]"
        style={{
          opacity: ready ? 1 : 0,
          transitionDelay: ready ? '1s' : '0s',
        }}
      >
        <div className="flex flex-wrap items-center gap-s5 font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          <span
            className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson"
            aria-hidden
          />
          <span className="text-bone">LIVE · MUMBAI</span>
          <span aria-hidden>·</span>
          <span>SCROLL TO ENTER</span>
          <span aria-hidden className="flex-1 max-w-32 h-px bg-hair mx-s3 hidden md:block" />
          <ScrollHint />
        </div>
      </div>
    </section>
  );
}

/** Animated chevron — bounces gently to invite scroll. */
function ScrollHint() {
  return (
    <span
      className="inline-flex items-center gap-s2 text-bone/80"
      style={{ animation: 'bounce-down 2.4s ease-in-out infinite' }}
      aria-hidden
    >
      ↓
      <style jsx>{`
        @keyframes bounce-down {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </span>
  );
}
