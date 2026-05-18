'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Manifesto pull — single Display XXL statement, char-by-char reveal as the
 * section scrolls into view. Tail is intentionally generous so the line lands
 * with the same weight as a section title.
 */
export default function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const chars = root.querySelectorAll<HTMLElement>('[data-manifesto-char]');
    if (!chars.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(chars, { yPercent: 110, opacity: 0 });
    const ctx = gsap.context(() => {
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.008,
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Split into words then chars so we don't break word-wrap.
  const words = text.split(' ');

  return (
    <section className="px-5 md:px-9 py-s10 md:py-[160px] border-t border-hair">
      <div ref={ref} className="container-page max-w-[1300px]">
        <h2
          className="font-display font-extrabold text-bone leading-[1.0] tracking-[-0.04em] max-w-[18ch]"
          style={{ fontSize: 'clamp(56px, 9vw, 144px)' }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap mr-[0.18em]">
              {word.split('').map((ch, ci) => (
                <span key={ci} className="inline-block overflow-hidden">
                  <span data-manifesto-char className="inline-block">
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
