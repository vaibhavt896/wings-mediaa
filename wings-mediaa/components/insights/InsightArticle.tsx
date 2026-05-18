'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import type { Insight, InsightBlock } from '@/lib/content/insights';

interface InsightArticleProps {
  insight: Insight;
  next: Insight;
}

/**
 * /insights/[slug] body. Generous editorial column (max 720px), big leading, mono rail.
 * Body blocks render via a small block switcher.
 */
export default function InsightArticle({ insight, next }: InsightArticleProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ins-h-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.15,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const dateLong = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(insight.publishedAt));

  return (
    <article ref={ref}>
      {/* Hero — cover gradient + metadata rail + title */}
      <section className="relative isolate pt-[140px] pb-s9 px-5 md:px-9 overflow-hidden">
        <div className="container-page max-w-[1100px]">
          <div
            data-ins-h-reveal
            className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex flex-wrap items-center gap-s4 mb-s7"
          >
            <span className="block w-9 h-px bg-crimson" />
            <span>{insight.kind}</span>
            <span aria-hidden>·</span>
            <time dateTime={insight.publishedAt} className="tabular-nums">{dateLong}</time>
            <span aria-hidden>·</span>
            <span>{insight.readTime} MIN READ</span>
            <span aria-hidden>·</span>
            <span className="text-bone">{insight.author}</span>
          </div>

          <h1
            data-ins-h-reveal
            className="font-display font-extrabold text-bone leading-[1.0] tracking-[-0.04em] max-w-[20ch]"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
          >
            {insight.title}
          </h1>

          <p
            data-ins-h-reveal
            className="mt-s7 max-w-[640px] text-body-l text-bone/75 leading-[1.6]"
          >
            {insight.summary}
          </p>

          {/* Cover gradient — under the lede */}
          <div
            data-ins-h-reveal
            className="mt-s9 relative aspect-[21/9] rounded-r4 overflow-hidden border border-hair bg-ink-2"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(120deg, ${insight.accent}55 0%, transparent 55%),
                  radial-gradient(circle at 75% 45%, rgba(230,255,60,0.16), transparent 60%),
                  linear-gradient(135deg, ${insight.accent} 0%, #15151C 100%)
                `,
              }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 md:px-9 py-s9 border-t border-hair">
        <div className="container-page max-w-[720px] flex flex-col gap-s6">
          {insight.body.map((block, i) => (
            <BlockSwitch key={i} block={block} />
          ))}
        </div>

        {/* Footer rail */}
        <div className="container-page max-w-[720px] mt-s9 pt-s7 border-t border-hair font-mono text-[11px] tracking-[0.16em] uppercase text-mute flex flex-wrap items-center gap-s4">
          <span>FILED · {insight.kind}</span>
          <span aria-hidden>·</span>
          <time dateTime={insight.publishedAt} className="tabular-nums">
            {dateLong}
          </time>
          <span aria-hidden>·</span>
          <span className="text-bone">{insight.author}</span>
        </div>
      </section>

      {/* Next */}
      <section className="px-5 md:px-9 py-s10 border-t border-hair bg-ink relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background: `
              radial-gradient(60vmax 50vmax at 80% 50%, ${next.accent}33, transparent 65%)
            `,
          }}
          aria-hidden
        />
        <div className="container-page max-w-[1100px] flex flex-col gap-s6">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
            <span className="block w-9 h-px bg-crimson" />
            <span>NEXT FIELD NOTE</span>
          </div>
          <Link
            href={`/insights/${next.slug}`}
            data-cur="link"
            className="group block focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4 rounded-r4 -mx-s4 px-s4 py-s3"
          >
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute mb-s3 group-hover:text-crimson transition-colors">
              {next.kind} · {next.readTime} MIN
            </div>
            <h2 className="font-display font-extrabold text-bone leading-[1.0] tracking-[-0.03em] group-hover:text-crimson transition-colors max-w-[20ch]" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              {next.title}
            </h2>
          </Link>
        </div>
      </section>
    </article>
  );
}

/* ---- block switch ---- */

function BlockSwitch({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-body-l text-bone/85 leading-[1.7]">{block.text}</p>
      );
    case 'h2':
      return (
        <h2 className="font-display font-bold text-d-m text-bone tracking-[-0.02em] leading-[1.2] mt-s5">
          {block.text}
        </h2>
      );
    case 'pull':
      return (
        <blockquote
          className={cn(
            'my-s5 border-l-2 border-crimson pl-s6',
            'font-serif italic text-[28px] md:text-[36px] leading-[1.3] text-bone tracking-[-0.01em]'
          )}
        >
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="flex flex-col gap-s4 my-s4">
          {block.items.map((it, i) => (
            <li key={i} className="text-body-l text-bone/85 leading-[1.6] grid grid-cols-[auto_1fr] gap-s4">
              <span className="text-crimson font-mono text-[11px] tracking-[0.16em] mt-1 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {it}
            </li>
          ))}
        </ul>
      );
    case 'mono':
      return (
        <div className="my-s4 px-s5 py-s5 rounded-r3 border border-hair bg-ink-2 font-mono text-[12px] tracking-[0.14em] uppercase text-bone/85 leading-[1.7]">
          {block.text}
        </div>
      );
  }
}
