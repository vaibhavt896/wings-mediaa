'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CaseTile from '@/components/CaseTile';
import Button from '@/components/Button';
import { cases, type Case } from '@/lib/content/cases';
import { cn } from '@/lib/utils';

interface RelatedCasesProps {
  /** Service slug — we filter cases that include this slug in their `services` array. */
  serviceSlug: string;
  /** Max number of cases to show. Default 3. */
  limit?: number;
  register?: 'ink' | 'bone';
  /** Eyebrow above the row. */
  eyebrow?: string;
}

/**
 * 3 case cards filtered by service. Reuses CaseTile so hover scale + cursor=media
 * behaviour stays identical with the homepage and /work mosaic.
 */
export default function RelatedCases({
  serviceSlug,
  limit = 3,
  register = 'ink',
  eyebrow = 'WORK IN THIS SERVICE',
}: RelatedCasesProps) {
  const ref = useRef<HTMLElement>(null);
  const light = register === 'bone';

  const related: Case[] = cases.filter((c) => c.services.includes(serviceSlug)).slice(0, limit);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-rel-reveal]', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  if (related.length === 0) {
    return (
      <section
        className={cn(
          'px-5 md:px-9 py-s10 border-t',
          light ? 'bg-bone text-ink border-hair-l' : 'bg-ink text-bone border-hair'
        )}
      >
        <div className="container-page">
          <p className={cn('font-mono text-[12px] tracking-[0.16em] uppercase', light ? 'text-ink/50' : 'text-mute')}>
            No published cases for this service yet. Check{' '}
            <Button variant="ghost" href="/work" noMagnet>
              all work
            </Button>{' '}
            instead.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn(
        'px-5 md:px-9 py-s10 border-t',
        light ? 'bg-bone text-ink border-hair-l' : 'bg-ink text-bone border-hair'
      )}
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-s6 mb-s8">
          <div>
            <div
              data-rel-reveal
              className={cn(
                'font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-s4 mb-s5',
                light ? 'text-ink/60' : 'text-mute'
              )}
            >
              <span className="block w-9 h-px bg-crimson" />
              {eyebrow}
            </div>
            <h2
              data-rel-reveal
              className="font-display font-bold text-d-l tracking-[-0.03em] leading-[1] max-w-[12ch]"
            >
              The <span className="ital">proof.</span>
            </h2>
          </div>
          <Button variant="ghost" href="/work">
            See all work →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-s6 md:gap-s7">
          {related.map((c) => (
            <div key={c.slug} data-rel-reveal>
              <CaseTile
                href={`/work/${c.slug}`}
                title={c.title}
                caption={c.summary}
                indexLabel={c.indexLabel}
                accent={c.cover.accent}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
