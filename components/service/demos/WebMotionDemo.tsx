'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Magnetic from '@/components/Magnetic';

/**
 * Web & Motion demo — "The Motion Reel."
 *
 * Pins for ~120vh. A column of motion-token mini-demos translates upward; whichever
 * mini-demo is in the center "stage" gets its `is-active` state and plays its
 * micro-animation (fully CSS so it stays in sync with the scrub).
 *
 * Meta-proof: every primitive on display is one of the actual tokens shipping on
 * this very site. The page is the demo.
 */

const TOKENS = [
  { name: 'MASK REVEAL', spec: 'clip-path inset 100→0 · 800ms · expo-out', kind: 'mask' },
  { name: 'MAGNETIC CTA', spec: 'translate × 0.18 · 120px radius · spring(220, 26)', kind: 'magnet' },
  { name: 'COUNT-UP', spec: '0 → target · 1.2s · out-quart', kind: 'count' },
  { name: 'MARQUEE', spec: 'linear 60–100 px/s · pause-on-hover', kind: 'marquee' },
  { name: 'CURSOR · LINK', spec: 'lerp 0.16 · halo 36 → 74px · mix-blend difference', kind: 'cursor' },
  { name: 'GRADIENT DRIFT', spec: '30s alternate · 8° rotation · 40px blur', kind: 'drift' },
] as const;

type Kind = (typeof TOKENS)[number]['kind'];

export default function WebMotionDemo() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const track = root.querySelector<HTMLElement>('[data-motion-track]');
    const items = root.querySelectorAll<HTMLElement>('[data-motion-item]');
    if (!track || !items.length) return;

    const setFinal = () => {
      // Final state — all items revealed, last one active
      items.forEach((el, i) => {
        el.classList.toggle('is-active', i === items.length - 1);
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFinal();
      return;
    }

    const ctx = gsap.context(() => {
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = proxy.p;
          const distance = Math.max(track.scrollHeight - window.innerHeight + 300, 0);
          track.style.transform = `translate3d(0, ${-distance * p}px, 0)`;
          // Mark the item nearest to vertical center as active
          const viewportCenter = window.innerHeight / 2;
          let nearestIdx = 0;
          let nearestDist = Infinity;
          items.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const c = (r.top + r.bottom) / 2;
            const d = Math.abs(c - viewportCenter);
            if (d < nearestDist) {
              nearestDist = d;
              nearestIdx = i;
            }
          });
          items.forEach((el, i) => el.classList.toggle('is-active', i === nearestIdx));
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className="relative h-screen bg-ink overflow-hidden border-y border-hair"
      aria-label="Web and motion — motion reel demo"
    >
      <div className="ambient-glow" aria-hidden />

      {/* Top chrome */}
      <div className="absolute top-s7 left-5 md:left-9 z-20 font-mono text-[11px] tracking-[0.18em] uppercase text-mute flex items-center gap-s3">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
        MOTION REEL · LIVE TOKENS
      </div>
      <div className="absolute top-s7 right-5 md:right-9 z-20 font-mono text-[10px] tracking-[0.14em] uppercase text-mute hidden md:block">
        EVERY PRIMITIVE BELOW IS SHIPPING · RIGHT HERE
      </div>

      {/* Reel track */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div
          data-motion-track
          className="w-full max-w-[820px] flex flex-col gap-s7 pt-[36vh] px-5 will-change-transform"
        >
          {TOKENS.map((t) => (
            <MotionItem key={t.name} name={t.name} spec={t.spec} kind={t.kind as Kind} />
          ))}
        </div>
      </div>

      {/* Center stage marker — visible hairlines top and bottom of the active row */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120px] pointer-events-none z-10 border-y border-hair/60" aria-hidden />

      {/* Bottom strip */}
      <div className="absolute inset-x-0 bottom-0 px-5 md:px-9 py-s5 border-t border-hair bg-ink z-10 flex flex-wrap items-center justify-between gap-s4 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-mute">
        <span>STACK · NEXT.JS 15 · GSAP · LENIS · MOTION</span>
        <span className="hidden md:inline">LCP TARGET · &lt;2.0s · 60FPS ON PIXEL 6</span>
      </div>

      <style jsx>{`
        :global([data-motion-item]) {
          opacity: 0.32;
          transition: opacity 0.5s var(--ease-out-quart);
        }
        :global([data-motion-item].is-active) {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

/* ---- One row per motion token ---- */

function MotionItem({ name, spec, kind }: { name: string; spec: string; kind: Kind }) {
  return (
    <div
      data-motion-item
      className="grid grid-cols-[1fr_auto] gap-s6 items-center px-s5 md:px-s7 py-s5 rounded-r4 border border-hair bg-ink-2/60 backdrop-blur-sm pointer-events-auto"
    >
      <div className="flex flex-col gap-s2 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-crimson">
          {name}
        </div>
        <div className="font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-mute truncate">
          {spec}
        </div>
      </div>
      <div className="shrink-0">
        <MicroDemo kind={kind} />
      </div>
    </div>
  );
}

function MicroDemo({ kind }: { kind: Kind }) {
  if (kind === 'mask') {
    return (
      <div className="relative w-[100px] h-[44px] overflow-hidden rounded-r3 bg-crimson">
        <div className="absolute inset-0 bg-ink demo-mask" />
      </div>
    );
  }
  if (kind === 'magnet') {
    return (
      <Magnetic radius={80} coeff={0.35}>
        <span className="inline-flex items-center px-s5 py-s3 rounded-pill bg-crimson text-ink font-mono text-[10px] tracking-[0.18em] uppercase font-bold cursor-none">
          HOVER
        </span>
      </Magnetic>
    );
  }
  if (kind === 'count') {
    return (
      <div className="font-display font-extrabold text-[28px] tracking-[-0.03em] text-bone leading-none tabular-nums">
        100<span className="text-crimson">%</span>
      </div>
    );
  }
  if (kind === 'marquee') {
    return (
      <div className="w-[120px] h-[28px] overflow-hidden rounded-pill border border-hair">
        <div className="flex gap-s5 whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase text-bone leading-[28px] demo-marquee">
          <span>WINGS · MEDIAA · WINGS · MEDIAA</span>
          <span aria-hidden>WINGS · MEDIAA · WINGS · MEDIAA</span>
        </div>
      </div>
    );
  }
  if (kind === 'cursor') {
    return (
      <div className="relative w-[44px] h-[44px] rounded-full border border-crimson grid place-items-center">
        <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-crimson">VIEW</span>
      </div>
    );
  }
  // drift
  return (
    <div
      className="w-[70px] h-[44px] rounded-r3 demo-drift"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(255,61,46,0.6), transparent 60%), radial-gradient(circle at 70% 70%, rgba(230,255,60,0.4), transparent 60%), #15151C',
      }}
      aria-hidden
    />
  );
}
