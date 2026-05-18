'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Performance Marketing demo — "The Dashboard."
 *
 * Pins for ~120vh of scroll. As you scroll, the campaign visibly runs:
 *  - ROAS counts up from 0 → 7.4
 *  - CAC counts down from ₹820 → ₹476
 *  - Conversions tick up
 *  - 4 horizontal "creative" bars fill with their ROI lengths
 *  - Spend allocation pie wedges rotate into place
 *
 * Reduced motion: snaps to final state on mount, no pin.
 */
export default function PerformanceDemo() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const roasEl = root.querySelector<HTMLElement>('[data-perf="roas"]');
    const cacEl = root.querySelector<HTMLElement>('[data-perf="cac"]');
    const convEl = root.querySelector<HTMLElement>('[data-perf="conv"]');
    const bars = root.querySelectorAll<HTMLElement>('[data-perf-bar]');
    const wedge = root.querySelector<HTMLElement>('[data-perf-wedge]');
    const progressEl = root.querySelector<HTMLElement>('[data-perf-progress]');

    const setFinal = () => {
      if (roasEl) roasEl.textContent = '7.4';
      if (cacEl) cacEl.textContent = '₹476';
      if (convEl) convEl.textContent = '24,318';
      bars.forEach((el) => {
        const target = Number(el.dataset.target) || 100;
        el.style.width = `${target}%`;
      });
      if (wedge) wedge.style.transform = 'rotate(108deg)';
      if (progressEl) progressEl.style.height = '100%';
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
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = proxy.p;
          const eased = 1 - Math.pow(1 - p, 2);
          if (roasEl) roasEl.textContent = (7.4 * eased).toFixed(1);
          if (cacEl) cacEl.textContent = `₹${Math.round(820 - 344 * eased)}`;
          if (convEl) convEl.textContent = Math.round(24318 * eased).toLocaleString('en-IN');
          bars.forEach((el) => {
            const target = Number(el.dataset.target) || 100;
            el.style.width = `${target * eased}%`;
          });
          if (wedge) wedge.style.transform = `rotate(${108 * eased}deg)`;
          if (progressEl) progressEl.style.height = `${p * 100}%`;
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const creatives = [
    { name: 'KORA · 30s', kind: 'VIDEO', target: 92 },
    { name: 'KORA · STILL A', kind: 'IMAGE', target: 76 },
    { name: 'KORA · CAROUSEL', kind: 'CAROUSEL', target: 58 },
    { name: 'KORA · UGC', kind: 'UGC', target: 84 },
  ];

  return (
    <section
      ref={wrap}
      className="relative h-screen bg-ink-2 overflow-hidden border-y border-hair"
      aria-label="Performance marketing — live dashboard demo"
    >
      <div className="absolute inset-0 px-5 md:px-9 py-s9 flex flex-col">
        {/* Dashboard chrome */}
        <div className="flex items-center justify-between mb-s7">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute flex items-center gap-s3">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
            CAMPAIGN · KORA · Q1 2026 · LIVE
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute hidden md:flex items-center gap-s4">
            <span>SOURCE: META + GOOGLE</span>
            <span aria-hidden>·</span>
            <span>WINDOW: 12 WEEKS</span>
          </div>
        </div>

        {/* Top metric row */}
        <div className="grid grid-cols-3 gap-s5 md:gap-s7 mb-s7">
          <Metric
            eyebrow="ROAS"
            valueEl={<span data-perf="roas" className="tabular-nums">0.0</span>}
            unit="×"
            note="BLENDED"
          />
          <Metric
            eyebrow="CAC"
            valueEl={<span data-perf="cac" className="tabular-nums">₹820</span>}
            unitTone="mute"
            note="-42% VS START"
          />
          <Metric
            eyebrow="CONVERSIONS"
            valueEl={<span data-perf="conv" className="tabular-nums">0</span>}
            unitTone="mute"
            note="PURCHASES · ALL CHANNELS"
          />
        </div>

        {/* Creative bars */}
        <div className="flex-1 flex flex-col gap-s4 mb-s7">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-s2">
            CREATIVE ROI · BY ASSET
          </div>
          {creatives.map((c) => (
            <div key={c.name} className="grid grid-cols-[1fr_auto] gap-s5 items-center">
              <div>
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute mb-s2 flex items-center gap-s3">
                  <span className="text-bone">{c.name}</span>
                  <span aria-hidden>·</span>
                  <span>{c.kind}</span>
                </div>
                <div className="h-2 rounded-pill bg-hair overflow-hidden">
                  <div
                    data-perf-bar
                    data-target={c.target}
                    className="h-full bg-crimson rounded-pill"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone tabular-nums min-w-[3em] text-right">
                {c.target}%
              </div>
            </div>
          ))}
        </div>

        {/* Spend wedge + scale tag */}
        <div className="flex items-center justify-between gap-s5">
          <div className="flex items-center gap-s4">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-hair overflow-hidden">
              <div
                data-perf-wedge
                className="absolute inset-0 origin-center"
                style={{
                  background: 'conic-gradient(var(--crimson) 0deg, var(--crimson) 30%, transparent 30%)',
                  transform: 'rotate(0deg)',
                  transition: 'transform 0s linear',
                }}
              />
            </div>
            <div className="font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-mute leading-[1.4]">
              <div className="text-bone">30%</div>
              <div>WINNING CREATIVES</div>
              <div>OF SPEND</div>
            </div>
          </div>
          <div className="hidden md:block font-mono text-[10px] tracking-[0.14em] uppercase text-mute">
            UPDATED · LIVE · 04 SEC AGO
          </div>
        </div>
      </div>

      {/* Right-edge scrub progress */}
      <div
        className="absolute right-3 md:right-5 top-s8 bottom-s8 w-px bg-hair pointer-events-none"
        aria-hidden
      >
        <div data-perf-progress className="w-full bg-crimson origin-top" style={{ height: '0%' }} />
      </div>
    </section>
  );
}

function Metric({
  eyebrow,
  valueEl,
  unit,
  unitTone = 'crimson',
  note,
}: {
  eyebrow: string;
  valueEl: React.ReactNode;
  unit?: string;
  unitTone?: 'crimson' | 'mute';
  note: string;
}) {
  return (
    <div className="flex flex-col gap-s2">
      <div className="font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-mute">
        {eyebrow}
      </div>
      <div className="font-display font-extrabold leading-none tracking-[-0.03em] text-bone text-[clamp(28px,5vw,64px)]">
        {valueEl}
        {unit && (
          <span className={unitTone === 'crimson' ? 'text-crimson' : 'text-mute'}>{unit}</span>
        )}
      </div>
      <div className="font-mono text-[9px] md:text-[11px] tracking-[0.18em] uppercase text-mute">
        {note}
      </div>
    </div>
  );
}
