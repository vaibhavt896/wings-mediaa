'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { AboutContent } from '@/lib/content/about';

interface AIEngineProps {
  data: NonNullable<AboutContent['aiEngine']>;
}

/**
 * AI Engine section — demystifies what "AI-powered" actually means for the client.
 * Explains how AI provides an unfair speed and ROI advantage across 4 core operational pillars.
 */
export default function AIEngine({ data }: AIEngineProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-ai-card]', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="ai-engine-label"
      className="px-5 md:px-9 py-s10 md:py-[120px] border-t border-hair bg-ink relative overflow-hidden"
    >
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-s6 mb-s9">
          <div>
            <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
              <span className="block w-9 h-px bg-crimson" />
              <span id="ai-engine-label">{data.eyebrow}</span>
            </div>
            <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.05] text-bone max-w-[18ch]">
              Why we move <span className="ital text-crimson">5x faster</span> than traditional agencies.
            </h2>
          </div>
          <p className="max-w-[440px] text-body-m text-bone/70 leading-[1.65]">
            {data.intro}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-s6 md:gap-s7">
          {data.pillars.map((pillar, i) => (
            <div
              key={i}
              data-ai-card
              className="relative isolate overflow-hidden rounded-r4 border border-hair bg-ink-2 p-s7 md:p-s8 flex flex-col justify-between transition-colors duration-300 hover:border-hair-strong group"
            >
              {/* Subtle accent hover glow */}
              <div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(40vmax 40vmax at 90% 10%, rgba(255,61,46,0.08), transparent 70%)',
                }}
                aria-hidden
              />

              <div className="flex items-center justify-between gap-s4 mb-s6">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-crimson">
                  {pillar.tag}
                </span>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase px-s3 py-1 rounded-full bg-bone/5 border border-hair text-bone/80">
                  {pillar.metric}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.2] mb-s4 group-hover:text-crimson transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-body-m text-bone/70 leading-[1.65]">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-s7 pt-s4 border-t border-hair/60 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-mute">
                <span>SYSTEM SPEED</span>
                <span className="text-bone/80">ACTIVE ARCHITECTURE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Operating Standards Strip */}
        <div className="mt-s9 p-s6 md:p-s7 rounded-r4 border border-hair bg-ink-2/60 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s6">
          {[
            { metric: '48H', title: 'Sprint Turnaround', sub: 'No weeks lost in bureaucratic agency approval delays' },
            { metric: '100%', title: 'Direct Accountability', sub: 'Senior creative & strategists own every brief directly' },
            { metric: 'AEO', title: 'Answer Engine Ready', sub: 'Engineered for ChatGPT, Perplexity & Google AI search' },
            { metric: 'ZERO', title: 'Vanity Metrics', sub: 'Tracked on revenue, qualified leads and local market share' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-s2 border-l-2 border-crimson/50 pl-s4">
              <span className="font-display font-extrabold text-d-m text-bone tracking-tight">
                {item.metric}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone">
                {item.title}
              </span>
              <span className="text-[13px] text-bone/60 leading-[1.5]">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
