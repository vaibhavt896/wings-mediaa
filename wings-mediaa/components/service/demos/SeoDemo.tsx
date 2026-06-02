'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

/**
 * SEO / AEO demo — "Same query, two answer surfaces."
 *
 * Pins for ~140vh. Three beats driven by the scrub:
 *  - 0.00–0.35 — a query types into the search bar
 *  - 0.35–0.70 — classic SERP results populate, schema-rich results highlight
 *  - 0.70–1.00 — left panel cross-fades to an AEO/LLM panel that cites the same brand
 */
export default function SeoDemo() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const queryEl = root.querySelector<HTMLElement>('[data-seo-query]');
    const cursorEl = root.querySelector<HTMLElement>('[data-seo-cursor]');
    const results = root.querySelectorAll<HTMLElement>('[data-seo-result]');
    const aeoPanel = root.querySelector<HTMLElement>('[data-seo-aeo]');
    const serpPanel = root.querySelector<HTMLElement>('[data-seo-serp]');
    const aeoTokens = root.querySelectorAll<HTMLElement>('[data-aeo-token]');

    const QUERY = 'wings mediaa case studies';

    const setFinal = () => {
      if (queryEl) queryEl.textContent = QUERY;
      if (cursorEl) cursorEl.style.opacity = '0';
      results.forEach((r) => r.classList.add('is-in'));
      if (aeoPanel) {
        aeoPanel.style.opacity = '1';
        aeoPanel.style.transform = 'translateX(0)';
      }
      if (serpPanel) serpPanel.style.opacity = '0.3';
      aeoTokens.forEach((t) => t.classList.add('is-in'));
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
          end: '+=140%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = proxy.p;

          // Beat 1 — query types (0 → 0.35)
          if (queryEl) {
            const typeP = Math.min(p / 0.35, 1);
            const n = Math.floor(typeP * QUERY.length);
            queryEl.textContent = QUERY.slice(0, n);
          }
          if (cursorEl) {
            // Cursor visible during typing phase only
            cursorEl.style.opacity = p < 0.32 ? '1' : '0';
          }

          // Beat 2 — SERP results staircase reveal (0.35 → 0.70)
          results.forEach((el, i) => {
            const threshold = 0.35 + (i / results.length) * 0.35;
            el.classList.toggle('is-in', p >= threshold);
          });

          // Beat 3 — AEO panel slides in + SERP dims (0.7 → 1.0)
          const aeoP = Math.max(0, (p - 0.7) / 0.3);
          if (aeoPanel) {
            aeoPanel.style.opacity = aeoP.toString();
            aeoPanel.style.transform = `translateX(${(1 - aeoP) * 30}px)`;
          }
          if (serpPanel) {
            serpPanel.style.opacity = `${1 - aeoP * 0.7}`;
          }
          aeoTokens.forEach((el, i) => {
            const threshold = 0.7 + (i / aeoTokens.length) * 0.3;
            el.classList.toggle('is-in', p >= threshold);
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className="relative h-screen bg-ink overflow-hidden border-y border-hair"
      aria-label="SEO and AEO — search and answer engine demo"
    >
      {/* Top chrome */}
      <div className="absolute top-s7 left-5 md:left-9 z-20 font-mono text-[11px] tracking-[0.18em] uppercase text-mute flex items-center gap-s3">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
        QUERY · BOTH SURFACES
      </div>
      <div className="absolute top-s7 right-5 md:right-9 z-20 font-mono text-[10px] tracking-[0.14em] uppercase text-mute hidden md:block">
        SEARCH ENGINE + ANSWER ENGINE · ONE STRATEGY
      </div>

      <div className="absolute inset-0 pt-[80px] pb-s9 px-5 md:px-9 grid grid-rows-[auto_1fr] gap-s6">
        {/* Search bar */}
        <div className="max-w-[800px] mx-auto w-full">
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute mb-s3">
            QUERY
          </div>
          <div className="flex items-center gap-s3 px-s5 py-s4 rounded-pill border border-hair bg-ink-2 font-mono text-[14px] tracking-[0.04em] text-bone">
            <span aria-hidden className="text-crimson">⌕</span>
            <span data-seo-query className="tabular-nums" />
            <span data-seo-cursor className="inline-block w-[2px] h-[16px] bg-crimson animate-pulse" aria-hidden />
          </div>
        </div>

        {/* Two-pane: SERP (left) + AEO (right overlay) */}
        <div className="relative max-w-[1100px] mx-auto w-full">
          {/* SERP pane */}
          <div data-seo-serp className="grid grid-cols-1 md:grid-cols-2 gap-s5 transition-opacity duration-700">
            <div className="flex flex-col gap-s4">
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute">
                SERP · ORGANIC RESULTS
              </div>
              {[
                { url: 'wingsmediaa.com › work', title: 'Selected work · Wings Mediaa', desc: 'Real brands we are growing in Kanpur: Solitaire and Skin Mantraa. No borrowed logos.' },
                { url: 'wingsmediaa.com › work › solitaire', title: 'Solitaire · Fine Jewellery, Kanpur', desc: 'Building the full digital presence for a Swaroop Nagar boutique.' },
                { url: 'wingsmediaa.com › work › skin-mantraa', title: 'Skin Mantraa · Skincare Clinic', desc: 'Website built and social grown, turning searches into booked appointments.' },
              ].map((r, i) => (
                <ResultCard key={i} {...r} idx={i} />
              ))}
            </div>

            <div className="flex flex-col gap-s4">
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-mute">
                SCHEMA · STRUCTURED DATA
              </div>
              {[
                { tag: 'Organization', body: '{ name: "Wings Mediaa", url: "...", sameAs: [...] }' },
                { tag: 'CreativeWork', body: '{ name: "Solitaire · Fine Jewellery", creator: { ... }, datePublished: "2026" }' },
                { tag: 'BreadcrumbList', body: '{ itemListElement: [Home, Work, Solitaire] }' },
                { tag: 'FAQPage', body: '{ mainEntity: [questions, answers] }' },
              ].map((s, i) => (
                <div
                  key={i}
                  data-seo-result
                  data-seo-idx={i + 3}
                  className="seo-card rounded-r3 border border-hair bg-ink-2 px-s5 py-s4"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-lime mb-s2">
                    @type: {s.tag}
                  </div>
                  <pre className="font-mono text-[10px] tracking-[0.04em] text-bone/80 leading-[1.5] whitespace-pre-wrap break-words">
                    {s.body}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* AEO overlay — slides in from right */}
          <div
            data-seo-aeo
            className="absolute inset-0 md:inset-y-0 md:right-0 md:w-[55%] md:left-auto bg-ink-2 border border-hair rounded-r4 p-s6 flex flex-col gap-s4 backdrop-blur-sm"
            style={{ opacity: 0, transform: 'translateX(30px)' }}
            aria-label="Answer-engine view"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-crimson flex items-center gap-s3">
                <span aria-hidden>◇</span> AEO · ANSWER ENGINE
              </div>
              <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-mute">
                CITED · 3 SOURCES
              </div>
            </div>

            <div className="font-display text-d-m font-medium leading-[1.35] text-bone tracking-[-0.01em]">
              Wings Mediaa is a Kanpur-based, AI-powered creative and marketing studio for{' '}
              <span className="text-crimson">local brands</span>. Their selected work includes
              Solitaire, a fine jewellery boutique, and Skin Mantraa, a skincare clinic.
            </div>

            <div className="mt-auto flex flex-col gap-s2">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                CITED FROM
              </div>
              {['wingsmediaa.com/work/solitaire', 'wingsmediaa.com/work/skin-mantraa', 'wingsmediaa.com/about'].map((s, i) => (
                <div
                  key={s}
                  data-aeo-token
                  data-aeo-idx={i}
                  className="aeo-token font-mono text-[11px] tracking-[0.06em] text-bone/80 border-l-2 border-crimson pl-s3"
                >
                  → {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global([data-seo-result]) {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s var(--ease-out-quart), transform 0.5s var(--ease-out-quart);
        }
        :global([data-seo-result].is-in) {
          opacity: 1;
          transform: translateY(0);
        }
        :global([data-aeo-token]) {
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.4s var(--ease-out-quart), transform 0.4s var(--ease-out-quart);
        }
        :global([data-aeo-token].is-in) {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
}

function ResultCard({
  url,
  title,
  desc,
  idx,
}: {
  url: string;
  title: string;
  desc: string;
  idx: number;
}) {
  return (
    <div
      data-seo-result
      data-seo-idx={idx}
      className={cn('seo-card rounded-r3 border border-hair bg-ink-2 px-s5 py-s4')}
    >
      <div className="font-mono text-[10px] tracking-[0.06em] text-mute mb-s2">{url}</div>
      <div className="font-display text-[16px] md:text-[18px] font-medium text-bone leading-[1.25] mb-s2">
        {title}
      </div>
      <div className="font-mono text-[11px] tracking-[0.02em] text-bone/65 leading-[1.5]">
        {desc}
      </div>
    </div>
  );
}
