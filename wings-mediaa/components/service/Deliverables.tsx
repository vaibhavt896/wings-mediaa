'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface DeliverablesProps {
  items: string[];
  /** Section register — light bone canvas for Branding, dark ink otherwise. */
  register?: 'ink' | 'bone';
  /** Eyebrow above the list. */
  eyebrow?: string;
}

/**
 * Mono-pill deliverables row. Items reveal with a small upward stagger on scroll-in.
 */
export default function Deliverables({
  items,
  register = 'ink',
  eyebrow = 'WHAT YOU GET',
}: DeliverablesProps) {
  const ref = useRef<HTMLElement>(null);
  const light = register === 'bone';

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-deliverable]', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'px-5 md:px-9 py-s10 border-t',
        light ? 'bg-bone text-ink border-hair-l' : 'bg-ink text-bone border-hair'
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            'font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-s4 mb-s7',
            light ? 'text-ink/60' : 'text-mute'
          )}
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>{eyebrow}</span>
        </div>

        <ul className="flex flex-wrap gap-s3">
          {items.map((item) => (
            <li
              key={item}
              data-deliverable
              className={cn(
                'inline-flex items-center px-s5 py-s3 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase',
                light
                  ? 'border border-hair-l text-ink/80 hover:border-crimson hover:text-crimson transition-colors duration-200'
                  : 'border border-hair text-bone/80 hover:border-crimson hover:text-crimson transition-colors duration-200'
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
