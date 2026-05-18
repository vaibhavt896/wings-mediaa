'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { home, type ServiceBlock } from '@/lib/content/home';

/**
 * Beat 6 — Services.
 * Left column = sticky pinned headline; the trailing word swaps per service with a clip-mask rotate.
 * Right column = 5 service entries, each ~80vh tall, each with its own 4-second scene (gradient).
 * IntersectionObserver on each right-column entry sets the active service.
 *
 * Mobile (< md): stacks naturally — each service gets its own headline above the scene.
 */
export default function ServicesBeat() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const entries = Array.from(root.querySelectorAll<HTMLElement>('[data-svc-i]'));
    if (!entries.length) return;

    const io = new IntersectionObserver(
      (records) => {
        // Pick the entry with the highest intersection ratio that's currently intersecting.
        let best: { i: number; ratio: number } | null = null;
        records.forEach((r) => {
          if (!r.isIntersecting) return;
          const i = Number((r.target as HTMLElement).dataset.svcI);
          if (!best || r.intersectionRatio > best.ratio) {
            best = { i, ratio: r.intersectionRatio };
          }
        });
        if (best) setActive((best as { i: number; ratio: number }).i);
      },
      {
        // Trigger when entry center crosses viewport center.
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.5, 1],
      }
    );

    entries.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-labelledby="services-label"
      className="relative border-t border-hair"
    >
      <div className="md:grid md:grid-cols-2">
        {/* LEFT — sticky headline (desktop) */}
        <div className="hidden md:block md:sticky md:top-0 md:h-screen md:flex md:flex-col md:justify-center px-9 border-r border-hair">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
            <span className="block w-9 h-px bg-crimson" />
            <span id="services-label">06 / 09 — WHAT WE DO</span>
          </div>
          <h2 className="font-display font-extrabold text-d-xl leading-[0.95] tracking-[-0.03em] text-bone">
            We make brands
            <br />
            <span className="block relative h-[1.1em] overflow-hidden">
              {home.services.map((s, i) => (
                <span
                  key={s.slug}
                  className="absolute inset-0 transition-all duration-[700ms]"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: `translateY(${(i - active) * 110}%)`,
                    opacity: i === active ? 1 : 0,
                  }}
                  aria-hidden={i !== active}
                >
                  <span className="ital">{s.word}</span>
                </span>
              ))}
            </span>
          </h2>
          <p className="mt-s7 text-body-m text-bone/60 max-w-[40ch]">
            Five disciplines, one studio. Each service is a working piece of the same machine — the
            funnel, the brand, and the feel that holds them together.
          </p>
        </div>

        {/* RIGHT — scrolling stack */}
        <div>
          {home.services.map((s, i) => (
            <ServiceEntry key={s.slug} svc={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceEntry({ svc, index }: { svc: ServiceBlock; index: number }) {
  return (
    <div
      data-svc-i={index}
      className="min-h-[80vh] md:min-h-screen px-5 md:px-9 py-s9 md:py-0 flex flex-col justify-center gap-s6 border-b border-hair md:border-b-0"
    >
      {/* Mobile-only word display per service */}
      <div className="md:hidden font-display font-extrabold text-d-l text-bone leading-none">
        <span className="ital">{svc.word}</span>
      </div>

      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute flex items-center gap-s3">
        <span>0{index + 1}</span>
        <span aria-hidden>·</span>
        <span>SERVICE</span>
      </div>

      <h3 className="font-display font-bold text-d-m md:text-d-l text-bone tracking-[-0.02em] leading-[1.05]">
        {svc.title}.
      </h3>

      <p className="text-body-l text-bone/70 max-w-[44ch]">{svc.blurb}</p>

      {/* 4-second visual scene — generated gradient placeholder */}
      <div
        className="relative w-full aspect-[16/9] max-w-[560px] rounded-r4 overflow-hidden border border-hair"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 80% at 30% 30%, ${svc.accentA}40, transparent 65%),
              radial-gradient(50% 70% at 75% 70%, ${svc.accentB}55, transparent 60%),
              linear-gradient(135deg, ${svc.accentA} 0%, ${svc.accentB} 100%)
            `,
            animation: 'drift 18s ease-in-out infinite alternate',
          }}
        />
        <div className="absolute left-s5 bottom-s4 font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90">
          SCENE · {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <Link
        href={`/services/${svc.slug}`}
        className="btn btn-ghost self-start"
        data-cur="link"
      >
        Explore {svc.title} →
      </Link>
    </div>
  );
}
