'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface Identity {
  name: string;
  wordmark: string;
  category: string;
  fontFamily: 'display' | 'serif' | 'mono';
  weight: 'extralight' | 'normal' | 'bold' | 'black';
  letterSpacing: string;
  fg: string;
  bg: string;
  accent: string;
  tone: 'WHISPER' | 'CONFIDENT' | 'EDITORIAL' | 'SYSTEM' | 'BOLD';
}

const IDENTITIES: Identity[] = [
  {
    name: 'KORA',
    wordmark: 'KORA',
    category: 'NUDE BEAUTY · D2C',
    fontFamily: 'display',
    weight: 'black',
    letterSpacing: '-0.04em',
    fg: '#0A0A0F',
    bg: '#F4F4F1',
    accent: '#FF3D2E',
    tone: 'BOLD',
  },
  {
    name: 'Tranquil',
    wordmark: 'Tranquil',
    category: 'TEA · D2C · 8-YEAR-OLD BRAND',
    fontFamily: 'serif',
    weight: 'normal',
    letterSpacing: '0.02em',
    fg: '#15151C',
    bg: '#E9E9E2',
    accent: '#E6FF3C',
    tone: 'EDITORIAL',
  },
  {
    name: 'VALOR',
    wordmark: 'VALOR',
    category: 'YOUTH FITNESS · BRAND FILM',
    fontFamily: 'display',
    weight: 'black',
    letterSpacing: '0.18em',
    fg: '#F4F4F1',
    bg: '#0A0A0F',
    accent: '#FF884F',
    tone: 'BOLD',
  },
  {
    name: 'ixana',
    wordmark: 'ixana',
    category: 'WEARABLE · TECH',
    fontFamily: 'mono',
    weight: 'normal',
    letterSpacing: '0.32em',
    fg: '#0A0A0F',
    bg: '#F4F4F1',
    accent: '#8A8A95',
    tone: 'SYSTEM',
  },
  {
    name: 'Soleil',
    wordmark: 'Soleil',
    category: 'WELLNESS · CONFIDENT',
    fontFamily: 'serif',
    weight: 'bold',
    letterSpacing: '-0.02em',
    fg: '#FF3D2E',
    bg: '#F4F4F1',
    accent: '#FF3D2E',
    tone: 'CONFIDENT',
  },
];

/**
 * Branding demo — "Five identities, one studio."
 *
 * Light bone canvas (the interior register for Branding). The viewport pins for
 * ~150vh while a single brand mark center-stage cycles through 5 identities.
 * Background, type, weight, tracking, and the accent strip all change per identity.
 */
export default function BrandingDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;

    const progressEl = root.querySelector<HTMLElement>('[data-brand-progress]');
    const total = IDENTITIES.length;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(0);
      if (progressEl) progressEl.style.width = '100%';
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
          end: '+=160%',
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = proxy.p;
          // Map scroll progress → discrete identity index (0..total-1)
          const i = Math.min(Math.floor(p * total), total - 1);
          setActive(i);
          if (progressEl) progressEl.style.width = `${p * 100}%`;
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const id = IDENTITIES[active];
  const fontClass =
    id.fontFamily === 'serif' ? 'font-serif' : id.fontFamily === 'mono' ? 'font-mono' : 'font-display';
  const weightClass =
    id.weight === 'black'
      ? 'font-black'
      : id.weight === 'bold'
        ? 'font-bold'
        : id.weight === 'extralight'
          ? 'font-extralight'
          : 'font-normal';

  return (
    <section
      ref={wrap}
      className="relative h-screen overflow-hidden border-y border-hair-l transition-colors duration-700"
      style={{ background: id.bg }}
      aria-label="Branding — identity morph demo"
    >
      {/* Top chrome */}
      <div
        className="absolute top-s7 left-5 md:left-9 z-20 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-700"
        style={{ color: id.fg, opacity: 0.55 }}
      >
        <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-crimson align-middle mr-s3" aria-hidden />
        IDENTITY · {String(active + 1).padStart(2, '0')} / 05 · {id.tone}
      </div>

      <div
        className="absolute top-s7 right-5 md:right-9 z-20 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-700"
        style={{ color: id.fg, opacity: 0.5 }}
      >
        {id.category}
      </div>

      {/* The wordmark, centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 md:px-9">
        <div
          key={id.name}
          className={cn(
            fontClass,
            weightClass,
            'leading-none transition-colors duration-500'
          )}
          style={{
            fontSize: 'clamp(72px, 16vw, 240px)',
            letterSpacing: id.letterSpacing,
            color: id.fg,
            animation: 'brand-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {id.wordmark}
        </div>

        {/* Accent rule beneath */}
        <div
          className="mt-s7 h-1 transition-all duration-700"
          style={{
            width: 'clamp(80px, 12vw, 200px)',
            background: id.accent,
          }}
          aria-hidden
        />
      </div>

      {/* Identity rail at bottom — shows all 5, highlights active */}
      <div className="absolute inset-x-0 bottom-s8 z-10 px-5 md:px-9 flex items-center justify-center gap-s4 flex-wrap">
        {IDENTITIES.map((iden, i) => (
          <div
            key={iden.name}
            className={cn(
              'font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase transition-all duration-500',
              i === active ? 'opacity-100' : 'opacity-25'
            )}
            style={{ color: id.fg }}
          >
            {String(i + 1).padStart(2, '0')} · {iden.name.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Bottom progress rail */}
      <div
        className="absolute inset-x-0 bottom-0 h-px transition-colors duration-700"
        style={{ background: id.fg, opacity: 0.18 }}
        aria-hidden
      >
        <div
          data-brand-progress
          className="h-full origin-left transition-colors duration-700"
          style={{ width: '0%', background: id.accent }}
        />
      </div>

      <style jsx>{`
        @keyframes brand-rise {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*='brand-rise'] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
