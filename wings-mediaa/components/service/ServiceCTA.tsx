'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { nextService, type ServiceContent } from '@/lib/content/services';

interface ServiceCTAProps {
  current: ServiceContent;
  /** Tag the contact form with the source service via query param. */
  prefillService?: boolean;
}

/**
 * Service page close — magnetic primary CTA + "next service" magnetic link.
 * Background gradient uses the current service's accents for visual continuity
 * with the demo above it.
 */
export default function ServiceCTA({ current, prefillService = true }: ServiceCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const light = current.register === 'bone';
  const next = nextService(current.slug);
  const ctaHref = prefillService ? `/contact?service=${current.slug}` : '/contact';

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-cta-reveal]', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden border-t px-5 md:px-9 py-s10',
        light ? 'bg-bone text-ink border-hair-l' : 'bg-ink text-bone border-hair'
      )}
      aria-labelledby="svc-cta-label"
    >
      {/* Accent tint background */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background: `
            radial-gradient(60vmax 60vmax at 20% 50%, ${current.accentA}33, transparent 60%),
            radial-gradient(50vmax 50vmax at 80% 50%, ${current.accentB}22, transparent 60%)
          `,
        }}
        aria-hidden
      />

      <div className="container-page flex flex-col gap-s8">
        <div
          data-cta-reveal
          className={cn(
            'font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-s4',
            light ? 'text-ink/60' : 'text-mute'
          )}
        >
          <span className="block w-9 h-px bg-crimson" />
          <span id="svc-cta-label">START · {current.title.toUpperCase()}</span>
        </div>

        <h2
          data-cta-reveal
          className={cn(
            'font-display font-extrabold leading-[0.95] tracking-[-0.04em] max-w-[18ch]',
            'text-[clamp(48px,9vw,128px)]',
            light ? 'text-ink' : 'text-bone'
          )}
        >
          Want this for your{' '}
          <span className="ital">{current.italicWord.replace('.', '')}</span>?
        </h2>

        <div data-cta-reveal className="flex flex-wrap items-center gap-s5 mt-s4">
          <Button variant="primary" href={ctaHref}>
            Start a project →
          </Button>
          <Button variant={light ? 'ghost' : 'secondary'} href={`/services/${next.slug}`}>
            Next: {next.title} →
          </Button>
        </div>
      </div>
    </section>
  );
}
