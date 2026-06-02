'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface FeedPost {
  brand: string;
  type: 'REEL' | 'POST' | 'STORY' | 'CAROUSEL';
  accent: string;
  views: number;
  engagement: number;
  caption: string;
  duration?: string;
}

// Illustrative sample feed — neutral specimen brands, not real client data.
const FEED: FeedPost[] = [
  { brand: 'AURUM', type: 'REEL', accent: '#FF3D2E', views: 1240000, engagement: 8.4, duration: '0:28', caption: 'tutorial · launch week' },
  { brand: 'FORGE', type: 'POST', accent: '#FF884F', views: 612000, engagement: 6.1, caption: 'campaign still · day 2' },
  { brand: 'LUMIÈRE', type: 'CAROUSEL', accent: '#E6FF3C', views: 318000, engagement: 9.2, caption: '5 cards · weekly ritual' },
  { brand: 'NODES', type: 'REEL', accent: '#15151C', views: 2840000, engagement: 11.6, duration: '0:14', caption: 'launch teaser · loop' },
  { brand: 'AURUM', type: 'STORY', accent: '#FF5547', views: 84200, engagement: 4.2, caption: 'sticker · poll' },
  { brand: 'BLOOM', type: 'REEL', accent: '#FF884F', views: 1100000, engagement: 7.8, duration: '0:22', caption: 'cinematic · 22s cut' },
];

/**
 * Social & Content demo — "The Feed."
 *
 * Pins for ~140vh. As you scroll, the column of stylized posts translates upward
 * (the feed scrolls past you), each post's view-count ticks up, and the engagement
 * percentage on the active post pulses.
 */
export default function SocialDemo() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const track = root.querySelector<HTMLElement>('[data-social-track]');
    const counters = root.querySelectorAll<HTMLElement>('[data-views]');
    if (!track || !counters.length) return;

    const setFinal = () => {
      track.style.transform = `translateY(${-(track.scrollHeight - window.innerHeight + 200)}px)`;
      counters.forEach((el) => {
        const target = Number(el.dataset.target) || 0;
        el.textContent = format(target);
      });
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
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = proxy.p;
          // Translate feed track
          const distance = Math.max(track.scrollHeight - window.innerHeight + 280, 0);
          track.style.transform = `translate3d(0, ${-distance * p}px, 0)`;
          // Tick view counts
          counters.forEach((el) => {
            const target = Number(el.dataset.target) || 0;
            el.textContent = format(target * p);
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
      aria-label="Social and content — feed demo"
    >
      {/* Side rail — chrome */}
      <div className="absolute top-s7 left-5 md:left-9 z-20 font-mono text-[11px] tracking-[0.18em] uppercase text-mute flex items-center gap-s3">
        <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-lime" aria-hidden />
        FEED · ALWAYS-ON
      </div>
      <div className="absolute top-s7 right-5 md:right-9 z-20 font-mono text-[11px] tracking-[0.14em] uppercase text-mute hidden md:block">
        SAMPLE FEED · ILLUSTRATIVE
      </div>

      {/* Feed track — column of posts */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center pointer-events-none">
        <div
          data-social-track
          className="w-full max-w-[420px] flex flex-col gap-s5 pt-[28vh] px-5 will-change-transform"
        >
          {FEED.map((p, i) => (
            <PostCard key={i} post={p} />
          ))}
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-center py-s7">
            · END OF WEEK · LOOP RESTART ·
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute inset-x-0 bottom-0 px-5 md:px-9 py-s5 border-t border-hair bg-ink z-10 flex flex-wrap items-center justify-between gap-s4 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-mute">
        <span>
          ALWAYS-ON · <span className="text-bone">SAMPLE</span>
        </span>
        <span>
          ILLUSTRATIVE · <span className="text-bone">NOT CLIENT DATA</span>
        </span>
        <span className="hidden md:inline">
          FORMATS · REEL · POST · CAROUSEL
        </span>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: FeedPost }) {
  const isReel = post.type === 'REEL';
  const aspect = isReel ? 'aspect-[9/16]' : post.type === 'STORY' ? 'aspect-[9/16]' : 'aspect-square';

  return (
    <article className="rounded-r4 border border-hair bg-ink-2 overflow-hidden">
      {/* Author strip */}
      <div className="flex items-center gap-s3 px-s4 py-s3 border-b border-hair">
        <div className="w-7 h-7 rounded-full" style={{ background: post.accent }} aria-hidden />
        <div className="flex-1 font-mono text-[10px] tracking-[0.14em] uppercase text-bone">
          {post.brand}
        </div>
        <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-mute">
          {post.type}
        </div>
      </div>

      {/* Media */}
      <div className={cn('relative w-full', aspect, 'overflow-hidden')}>
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, ${post.accent}80 0%, #15151C 100%),
              radial-gradient(circle at 30% 70%, rgba(230,255,60,0.12), transparent 60%)
            `,
          }}
          aria-hidden
        />
        {isReel && (
          <div className="absolute top-s3 left-s3 font-mono text-[10px] tracking-[0.14em] uppercase bg-ink/60 backdrop-blur-sm px-s3 py-1 rounded-pill text-bone">
            ▶ {post.duration ?? '0:30'}
          </div>
        )}
        <div className="absolute bottom-s3 right-s3 flex items-center gap-s2 font-mono text-[10px] tracking-[0.14em] uppercase text-bone bg-ink/55 backdrop-blur-sm px-s3 py-1 rounded-pill">
          <span className="text-crimson">●</span>
          <span className="tabular-nums" data-views data-target={post.views}>
            0
          </span>
          <span>views</span>
        </div>
      </div>

      {/* Caption strip */}
      <div className="flex items-center justify-between px-s4 py-s3 border-t border-hair">
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-mute truncate">
          {post.caption}
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-lime tabular-nums shrink-0 ml-s3">
          {post.engagement.toFixed(1)}%
        </div>
      </div>
    </article>
  );
}

function format(v: number): string {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M';
  if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
  return Math.round(v).toString();
}
