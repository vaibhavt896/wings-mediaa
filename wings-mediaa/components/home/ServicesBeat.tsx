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
            <span id="services-label">04 · WHAT WE DO</span>
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
            Six disciplines, run as one machine, so nothing falls between a designer, an ads guy, and
            a website freelancer who never talk to each other.
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

      {/* 4-second visual scene — interactive SaaS illustration */}
      <div
        className="relative w-full aspect-[16/9] max-w-[560px] rounded-r4 overflow-hidden border border-hair"
        aria-hidden
      >
        <ServiceVisual slug={svc.slug} index={index} />
        <div className="absolute left-s5 bottom-s4 font-mono text-[10px] tracking-[0.14em] uppercase text-bone/60 mix-blend-difference">
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

/* -------------------- DYNAMIC SAAS ILLUSTRATION VIEWS -------------------- */

function ServiceVisual({ slug, index }: { slug: string; index: number }) {
  switch (slug) {
    case 'performance-marketing':
      return <PerformanceVisual />;
    case 'social-content':
      return <SocialVisual />;
    case 'branding':
      return <BrandingVisual />;
    case 'web-motion':
      return <WebMotionVisual />;
    case 'seo-aeo':
      return <SeoAeoVisual />;
    case 'whatsapp-automation':
      return <SocialVisual />;
    default:
      return (
        <div
          className="absolute inset-0 bg-ink-2"
          style={{
            background: 'linear-gradient(135deg, var(--crimson) 0%, var(--ink-2) 100%)',
          }}
        />
      );
  }
}

/** 1. Performance Marketing Chart */
function PerformanceVisual() {
  return (
    <div className="w-full h-full bg-ink-2 flex flex-col justify-between p-s5 relative overflow-hidden group">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.06] pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border-t border-l border-bone" />
        ))}
      </div>
      
      {/* Chrome header */}
      <div className="flex justify-between items-center z-10">
        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-mute">SCALABLE FUNNEL</span>
        <span className="font-mono text-[10px] text-lime font-bold tracking-wider animate-pulse">EVERY RUPEE TRACKED</span>
      </div>

      {/* SVG Wave */}
      <div className="relative flex-1 w-full mt-s4">
        <svg className="w-full h-[85%] overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--crimson)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--crimson)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Shaded Area */}
          <path
            d="M0 120 C 50 100, 80 115, 130 85 C 180 55, 200 75, 250 45 C 300 15, 330 25, 370 5 C 385 0, 395 0, 400 0 L 400 120 Z"
            fill="url(#chartGrad)"
          />
          
          {/* Growth Curve */}
          <path
            d="M0 120 C 50 100, 80 115, 130 85 C 180 55, 200 75, 250 45 C 300 15, 330 25, 370 5 C 385 0, 395 0, 400 0"
            fill="none"
            stroke="var(--crimson)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="chart-line-draw"
          />

          {/* Traveling glow point */}
          <circle r="6" fill="var(--lime)" className="chart-pulse-point" />
        </svg>
      </div>

      <style jsx>{`
        .chart-line-draw {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawChart 4s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
        .chart-pulse-point {
          animation: movePoint 4s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
          offset-path: path("M0 120 C 50 100, 80 115, 130 85 C 180 55, 200 75, 250 45 C 300 15, 330 25, 370 5 C 385 0, 395 0, 400 0");
        }
        @keyframes drawChart {
          to { stroke-dashoffset: 0; }
        }
        @keyframes movePoint {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}

/** 2. Social & Content Mobile Feed */
function SocialVisual() {
  const cards = [
    { color: 'var(--crimson)', text: 'REEL · BRAND FILM', progress: 'w-11/12' },
    { color: 'var(--lime)', text: 'UGC · CONVERSION', progress: 'w-4/5' },
    { color: 'var(--mute)', text: 'CAROUSEL · ENGAGE', progress: 'w-2/3' },
  ];
  // Repeat twice for seamless looping
  const items = [...cards, ...cards];

  return (
    <div className="w-full h-full bg-ink-2 flex items-center justify-center p-s4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(230,255,60,0.06),transparent_50%)]" />
      
      {/* Mobile Mockup */}
      <div className="w-[150px] h-[210px] rounded-[24px] border-2 border-hair bg-ink relative overflow-hidden flex flex-col pt-s4 px-s3">
        {/* Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-hair" />
        
        {/* Vertical Feed Container */}
        <div className="flex-1 flex flex-col gap-s3 overflow-hidden relative mt-s3">
          <div className="feed-track flex flex-col gap-s3">
            {items.map((c, i) => (
              <div key={i} className="w-full rounded-r3 bg-ink-2 border border-hair/80 p-s3 flex flex-col gap-s2 shrink-0">
                <div className="flex items-center gap-s2">
                  <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="w-12 h-1.5 rounded-full bg-mute/30" />
                </div>
                <div className="h-14 w-full rounded-r2 bg-hair/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-crimson/5 to-lime/5 animate-pulse" />
                </div>
                <div className="font-mono text-[6px] tracking-wider text-mute/70">{c.text}</div>
                <div className={`h-1 bg-mute/20 rounded-full ${c.progress}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .feed-track {
          animation: scrollFeed 10s linear infinite;
        }
        @keyframes scrollFeed {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

/** 3. Branding Morphing Canvas */
function BrandingVisual() {
  return (
    <div className="w-full h-full bg-ink-2 flex items-center justify-center p-s5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(255,61,46,0.06),transparent_50%)]" />
      
      {/* Morphing symbols */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Outer orbital rings */}
        <div className="absolute inset-0 rounded-full border border-hair/60 animate-spin-slow" />
        <div className="absolute inset-s4 rounded-full border border-dashed border-mute/25 animate-spin-reverse" />
        
        {/* Core morphing vector */}
        <div className="w-16 h-16 rounded-[40%] bg-gradient-to-br from-crimson to-lime/30 opacity-70 backdrop-blur-[2px] animate-morph mix-blend-screen" />
        
        {/* Vector node handles */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border border-mute rounded-full" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-mute rounded-full" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border border-mute" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-mute" />
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: orbitSpin 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: orbitSpin 12s linear infinite reverse;
        }
        @keyframes orbitSpin {
          to { transform: rotate(360deg); }
        }
        .animate-morph {
          animation: morphShape 8s ease-in-out infinite alternate;
        }
        @keyframes morphShape {
          0% {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
            transform: scale(0.92) rotate(0deg);
          }
          33% {
            border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%;
            transform: scale(1.04) rotate(120deg);
          }
          66% {
            border-radius: 30% 70% 60% 40% / 50% 60% 40% 50%;
            transform: scale(0.92) rotate(240deg);
          }
          100% {
            border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%;
            transform: scale(1.04) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

/** 4. Web & Motion Layout */
function WebMotionVisual() {
  return (
    <div className="w-full h-full bg-ink-2 flex items-center justify-center p-s5 relative overflow-hidden group">
      {/* Mock browser container */}
      <div className="w-[280px] h-[160px] rounded-r3 border border-hair bg-ink flex flex-col overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:border-mute/40">
        {/* Browser header tab */}
        <div className="h-6 border-b border-hair bg-ink-2/30 px-s3 flex items-center gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-crimson/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-lime/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-mute/30" />
          <div className="w-24 h-2 rounded-full bg-hair/60 mx-auto" />
        </div>
        
        {/* Wireframe grids */}
        <div className="flex-1 p-s3 grid grid-cols-3 gap-s3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-r2 border border-hair/70 bg-ink-2/20 p-s3 flex flex-col gap-s2 transition-transform duration-500 hover-card"
              style={{
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="w-5 h-5 rounded bg-gradient-to-br from-crimson/20 to-transparent flex items-center justify-center">
                <span className="font-mono text-[8px] text-crimson font-bold">W{i+1}</span>
              </div>
              <div className="w-full h-1 bg-mute/25 rounded-full" />
              <div className="w-2/3 h-1 bg-mute/25 rounded-full" />
              <div className="w-1/2 h-1 bg-mute/30 rounded-full mt-auto" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .group:hover .hover-card {
          transform: translateY(-4px);
          border-color: rgba(255, 61, 46, 0.25);
        }
      `}</style>
    </div>
  );
}

/** 5. SEO & AEO Citations Network */
function SeoAeoVisual() {
  return (
    <div className="w-full h-full bg-ink-2 flex flex-col justify-between p-s5 relative overflow-hidden group">
      {/* Top search mock */}
      <div className="w-full max-w-[280px] mx-auto rounded-pill border border-hair bg-ink px-s4 py-1.5 flex items-center gap-s2 shrink-0 z-10 transition-colors duration-300 group-hover:border-crimson/40">
        <span className="text-crimson text-[10px] shrink-0 font-bold">⌕</span>
        <div className="font-mono text-[9px] text-bone/60 tracking-wider overflow-hidden whitespace-nowrap border-r border-crimson/60 pr-1 animate-typing">
          wings mediaa case studies
        </div>
      </div>

      {/* Network Nodes */}
      <div className="flex-1 w-full relative mt-s3">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
          {/* Connector lines */}
          <line x1="50" y1="40" x2="130" y2="25" stroke="var(--hair)" strokeWidth="1.5" />
          <line x1="50" y1="40" x2="130" y2="55" stroke="var(--hair)" strokeWidth="1.5" />
          
          <line x1="130" y1="25" x2="230" y2="15" stroke="var(--hair)" strokeWidth="1.5" />
          <line x1="130" y1="25" x2="230" y2="40" stroke="var(--hair)" strokeWidth="1.5" />
          <line x1="130" y1="55" x2="230" y2="65" stroke="var(--hair)" strokeWidth="1.5" />
          
          {/* Signal pulses */}
          <circle r="3.5" fill="var(--crimson)" className="pulse-1" />
          <circle r="3.5" fill="var(--lime)" className="pulse-2" />
          <circle r="3.5" fill="var(--crimson)" className="pulse-3" />

          {/* Root node */}
          <circle cx="50" cy="40" r="6" fill="var(--ink)" stroke="var(--mute)" strokeWidth="1.5" />
          
          {/* Middle hubs */}
          <circle cx="130" cy="25" r="5.5" fill="var(--ink)" stroke="var(--crimson)" strokeWidth="1.5" />
          <circle cx="130" cy="55" r="5.5" fill="var(--ink)" stroke="var(--mute)" strokeWidth="1.5" />
          
          {/* Citation leaves */}
          <circle cx="230" cy="15" r="4.5" fill="var(--lime)" />
          <circle cx="230" cy="40" r="4.5" fill="var(--bone)" />
          <circle cx="230" cy="65" r="4.5" fill="var(--bone)" />
        </svg>
      </div>

      <style jsx>{`
        .animate-typing {
          animation: typeIn 5s steps(25) infinite alternate;
          width: 0;
        }
        @keyframes typeIn {
          0%, 15% { width: 0; }
          75%, 100% { width: 145px; }
        }
        .pulse-1 {
          animation: sig1 4s infinite linear;
          offset-path: path("M50 40 L130 25 L230 15");
        }
        .pulse-2 {
          animation: sig2 4s infinite linear;
          animation-delay: 1.2s;
          offset-path: path("M50 40 L130 25 L230 40");
        }
        .pulse-3 {
          animation: sig3 4s infinite linear;
          animation-delay: 2s;
          offset-path: path("M50 40 L130 55 L230 65");
        }
        @keyframes sig1 {
          0% { offset-distance: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes sig2 {
          0% { offset-distance: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes sig3 {
          0% { offset-distance: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
