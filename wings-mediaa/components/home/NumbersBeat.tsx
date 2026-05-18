'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { home } from '@/lib/content/home';

/**
 * Beat 5 — Numbers.
 * Pinned for one scroll-screen (~80vh). Numbers count from 0 → target SCROLL-BOUND
 * (a scrub timeline, not a one-shot intersection trigger). Right-edge progress line
 * grows with the same scrub. Reduced motion: section renders flat, numbers show targets.
 */
export default function NumbersBeat() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const numEls = Array.from(root.querySelectorAll<HTMLElement>('[data-num]'));
    const progressEl = root.querySelector<HTMLElement>('[data-progress]');
    if (!numEls.length || !progressEl) return;

    // Reduced motion: snap to final state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      numEls.forEach((el) => {
        const target = Number(el.dataset.num);
        el.textContent = formatNum(target, el.dataset.dec ? Number(el.dataset.dec) : 0);
      });
      progressEl.style.height = '100%';
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
          end: '+=120%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
        onUpdate: () => {
          // Apply same scrub progress to every number + the progress line.
          numEls.forEach((el) => {
            const target = Number(el.dataset.num);
            const dec = el.dataset.dec ? Number(el.dataset.dec) : 0;
            // Slight out-quart shaping so the last 20% feels heavier
            const eased = 1 - Math.pow(1 - proxy.p, 2);
            el.textContent = formatNum(target * eased, dec);
          });
          progressEl.style.height = `${proxy.p * 100}%`;
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      aria-labelledby="numbers-label"
      className="section relative isolate overflow-hidden h-screen flex flex-col justify-center"
    >
      <div className="container-page relative">
        {/* Eyebrow as a real h2 — same visual, fixes the heading outline. */}
        <h2
          id="numbers-label"
          className="font-mono text-[12px] font-normal tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
        >
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span>05 / 09 — THE NUMBERS</span>
        </h2>

        {/* Three metrics, scrub-bound */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-s8">
          {home.numbers.map((n, i) => {
            const dec = n.decimals ?? (Number.isInteger(n.value) ? 0 : 1);
            return (
              <div key={i} className="flex flex-col gap-s4">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
                  {n.eyebrow}
                </div>
                <div className="font-display font-extrabold text-d-xl tracking-[-0.03em] leading-none text-bone">
                  {n.prefix}
                  <span
                    data-num={n.value}
                    data-dec={dec}
                    className="tabular-nums inline-block min-w-[3ch]"
                  >
                    0
                  </span>
                  {n.suffix && <span className="text-crimson">{n.suffix}</span>}
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute leading-[1.5]">
                  {n.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right-edge tall thin progress line */}
      <div className="absolute right-5 md:right-9 top-[120px] bottom-[120px] w-px bg-hair" aria-hidden>
        <div data-progress className="w-full bg-crimson origin-top" style={{ height: '0%' }} />
      </div>
    </section>
  );
}

function formatNum(v: number, dec: number) {
  const useThousands = dec === 0;
  return useThousands
    ? Math.round(v).toLocaleString('en-IN')
    : v.toFixed(dec);
}
