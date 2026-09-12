'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import type { Insight } from '@/lib/content/insights';

interface IndexLayoutProps {
  featured: Insight[];
  rest: Insight[];
}

/**
 * Insights index — featured pin(s) at the top, full chronological list beneath.
 * No tag filters per spec ("we do not run a tag-heavy index").
 */
export default function IndexLayout({ featured, rest }: IndexLayoutProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-ins-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="px-5 md:px-9 pb-s10">
      {/* Featured pins */}
      {featured.length > 0 && (
        <div className="container-page mb-s10">
          <div
            data-ins-reveal
            className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
          >
            <span className="block w-9 h-px bg-crimson" />
            <span>FEATURED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-s7 md:gap-s8">
            {featured.map((f) => (
              <FeaturedCard key={f.slug} insight={f} />
            ))}
          </div>
        </div>
      )}

      {/* Chronological list */}
      <div className="container-page max-w-[1100px]">
        <div
          data-ins-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>ALL FIELD NOTES · {rest.length + featured.length}</span>
        </div>

        <ul className="flex flex-col">
          {[...featured, ...rest]
            .slice()
            .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
            .map((i) => (
              <ListRow key={i.slug} insight={i} />
            ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- featured card ---- */

function FeaturedCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-ins-reveal
      data-cur="media"
      className="group block focus-visible:outline-2 focus-visible:outline-crimson focus-visible:outline-offset-4 rounded-r4"
    >
      <div className="relative aspect-[4/3] rounded-r4 overflow-hidden border border-hair bg-ink-2 mb-s5">
        <div
          className="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          style={{
            background: `
              linear-gradient(135deg, ${insight.accent}aa 0%, #15151C 100%),
              radial-gradient(circle at 70% 30%, rgba(230,255,60,0.14), transparent 60%)
            `,
          }}
          aria-hidden
        />
        <div className="absolute left-s5 bottom-s4 font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90">
          {insight.kind}
        </div>
      </div>

      <div className="flex flex-col gap-s3">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute flex items-center gap-s3 flex-wrap">
          <DateLine iso={insight.publishedAt} />
          <span aria-hidden>·</span>
          <span className="text-mute">{insight.readTime} MIN READ</span>
          <span aria-hidden>·</span>
          <span className="text-mute">{insight.author}</span>
        </div>
        <h2 className="font-display font-bold text-d-l text-bone tracking-[-0.02em] leading-[1.1] group-hover:text-crimson transition-colors duration-300">
          {insight.title}
        </h2>
        <p className="text-body-m text-bone/65 leading-[1.55] max-w-[50ch]">{insight.summary}</p>
      </div>
    </Link>
  );
}

/* ---- list row ---- */

function ListRow({ insight }: { insight: Insight }) {
  return (
    <li data-ins-reveal>
      <Link
        href={`/insights/${insight.slug}`}
        data-cur="link"
        className="group block py-s6 border-t border-hair last:border-b grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-s4 md:gap-s7 items-baseline transition-colors duration-200"
      >
        <DateLine
          iso={insight.publishedAt}
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute"
        />
        <div className="flex flex-col gap-s2">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-crimson">
            {insight.kind}
          </div>
          <div className={cn(
            'font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.2]',
            'group-hover:text-crimson transition-colors duration-200'
          )}>
            {insight.title}
          </div>
        </div>
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute whitespace-nowrap">
          {insight.readTime} MIN · {insight.author}
        </div>
      </Link>
    </li>
  );
}

/* ---- shared ---- */

function DateLine({ iso, className }: { iso: string; className?: string }) {
  // Use a fixed UTC formatter so SSR and client agree.
  const d = new Date(iso);
  const fmt = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <time dateTime={iso} className={cn('tabular-nums uppercase', className)}>
      {fmt.format(d)}
    </time>
  );
}
