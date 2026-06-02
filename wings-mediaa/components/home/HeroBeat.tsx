'use client';

import { useEffect, useRef, useState } from 'react';
import HeroStatement from '@/components/HeroStatement';
import { home } from '@/lib/content/home';
import Button from '@/components/Button';

/**
 * Beat 1 + 2 combined.
 * Beat 1 — Display XXL kinetic hero. Waits for `wm:preloader-done` to start its reveal.
 * Beat 2 — Sub-anchor copy + mono "01 / 09" counter + pulsing scroll affordance.
 *
 * Layout: full viewport height, ambient gradient drift behind, grain overlay (global).
 */
export default function HeroBeat() {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);

  // Coordinate tracking with lerp-like CSS transition smooth delay
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const nx = (x / rect.width) - 0.5;
      const ny = (y / rect.height) - 0.5;
      
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--tilt-x', `${ny * 8}deg`);
      el.style.setProperty('--tilt-y', `${nx * -8}deg`);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Sub-anchor + foot reveal — fires 1.5s after preloader done
  useEffect(() => {
    const onDone = () => setReady(true);
    window.addEventListener('wm:preloader-done', onDone, { once: true });
    return () => window.removeEventListener('wm:preloader-done', onDone);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-screen pt-[100px] md:pt-[125px] lg:pt-[110px] pb-s6 lg:pb-s7 px-5 md:px-9 overflow-hidden flex flex-col justify-center"
      style={{
        // Seed default positions for CSS variables
        ['--mx' as any]: '50%',
        ['--my' as any]: '50%',
        ['--tilt-x' as any]: '0deg',
        ['--tilt-y' as any]: '0deg',
      }}
    >
      <div className="ambient-glow" aria-hidden />

      {/* Modern Motion Graphics Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-25 pointer-events-none select-none"
        aria-hidden
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* 3D Interactive Matrix Spotlight Grid */}
      <HeroInteractiveMatrix />

      <div className="container-page flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-y-s5 lg:gap-x-s8 items-center z-10 w-full">
        {/* Left Column: Brand Copy & Actions */}
        <div className="flex flex-col justify-center">
          {/* Beat 2a — eyebrow with "01 / 09" counter */}
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s4">
            <span className="block w-9 h-px bg-crimson" />
            <span>01 · THE STATEMENT</span>
          </div>

          {/* Beat 1 — kinetic statement */}
          <HeroStatement
            lines={home.hero.lines}
            italicWord={home.hero.italicWord}
            waitForPreloader
          />

          {/* Beat 2b — sub-anchor */}
          <div
            ref={subRef}
            className="mt-s4 max-w-[540px] transition-all duration-[900ms]"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: ready ? '0.6s' : '0s',
            }}
          >
            <p className="text-body-l text-bone/80 leading-[1.55]">{home.hero.sub}</p>
          </div>

          {/* Action Row */}
          <div
            className="flex flex-wrap gap-s5 mt-s5 transition-all duration-[900ms]"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: ready ? '0.8s' : '0s',
            }}
          >
            <Button variant="primary" href="/contact">
              Start your project
            </Button>
            <Button variant="secondary" href="/work">
              See the work
            </Button>
          </div>
        </div>

        {/* Right Column: Premium Interactive SaaS Control Center */}
        <div
          className="w-full flex items-center justify-center lg:justify-end transition-all duration-[1200ms]"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'scale(1) translate3d(0, 0, 0)' : 'scale(0.96) translate3d(15px, 0, 0)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: ready ? '0.7s' : '0s',
          }}
        >
          <HeroSaaSDashboard />
        </div>
      </div>

      {/* Beat 2c — foot: live · scroll affordance */}
      <div
        ref={footRef}
        className="container-page mt-s5 transition-opacity duration-[900ms]"
        style={{
          opacity: ready ? 1 : 0,
          transitionDelay: ready ? '1s' : '0s',
        }}
      >
        <div className="flex flex-wrap items-center gap-s5 font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          <span
            className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson"
            aria-hidden
          />
          <span className="text-bone">LIVE · KANPUR</span>
          <span aria-hidden>·</span>
          <span>SCROLL TO ENTER</span>
          <span aria-hidden className="flex-1 max-w-32 h-px bg-hair mx-s3 hidden md:block" />
          <ScrollHint />
        </div>
      </div>
    </section>
  );
}

/** Premium 3D Interactive Spotlight Grid & Particle beams */
function HeroInteractiveMatrix() {
  return (
    <div className="interactive-matrix pointer-events-none" aria-hidden>
      {/* Spot Gradient Backdrop */}
      <div className="matrix-spotlight" />

      {/* Deep Base Grid */}
      <div className="matrix-grid">
        {/* Traveling light rays nested within grid 3D projection (always visible!) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute h-[2.5px] w-[35%] bg-gradient-to-r from-transparent via-crimson to-transparent animate-beam-h"
            style={{ top: '25%', animationDelay: '0s' }}
          />
          <div
            className="absolute w-[2.5px] h-[35%] bg-gradient-to-b from-transparent via-lime to-transparent animate-beam-v"
            style={{ left: '45%', animationDelay: '1.2s' }}
          />
          <div
            className="absolute h-[2.5px] w-[30%] bg-gradient-to-r from-transparent via-crimson to-transparent animate-beam-h-rev"
            style={{ top: '65%', animationDelay: '2.5s' }}
          />
        </div>
      </div>

      {/* Active Spotlight Glowing Grid */}
      <div className="matrix-grid-glow" />
    </div>
  );
}

/** Animated chevron — bounces gently to invite scroll. */
function ScrollHint() {
  return (
    <span
      className="inline-flex items-center gap-s2 text-bone/80"
      style={{ animation: 'bounce-down 2.4s ease-in-out infinite' }}
      aria-hidden
    >
      ↓
      <style jsx>{`
        @keyframes bounce-down {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </span>
  );
}

/** 60FPS CSS-Animated SaaS Control Center dashboard mockup with 3D Parallax Tilt */
function HeroSaaSDashboard() {
  const [conversions, setConversions] = useState(18420);
  const [logs, setLogs] = useState<string[]>([
    'SYS // Booting Attention Engine v2.0',
    'SYS // Listening to live search traffic',
    'AI  // Initializing dynamic optimization modules'
  ]);
  const [logIndex, setLogIndex] = useState(0);

  const LOGS_POOL = [
    'SYS // Ingesting local search signal near you',
    'AI  // Drafting ad copy variants for review',
    'ADS // Balancing budget across Meta and Google',
    'WA  // Auto-replying to a new WhatsApp enquiry',
    'SEO // Tuning the page for a near-me query',
    'AI  // Shaping a reel hook for the second view',
    'SYS // Booking a customer while you sleep'
  ];

  useEffect(() => {
    // Tick conversions up
    const convInterval = setInterval(() => {
      setConversions((c) => c + Math.floor(Math.random() * 2) + 1);
    }, 1500);

    // Roll logs
    const logInterval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1), LOGS_POOL[logIndex % LOGS_POOL.length]];
        return next;
      });
      setLogIndex((i) => i + 1);
    }, 2200);

    return () => {
      clearInterval(convInterval);
      clearInterval(logInterval);
    };
  }, [logIndex]);

  return (
    <div
      className="w-full max-w-[480px] rounded-r4 border border-hair/80 bg-[#0A0A0F]/65 backdrop-blur-xl p-s4 flex flex-col gap-s3 relative overflow-hidden group shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 hover:border-mute/30"
      style={{
        transform: 'rotateX(calc(var(--tilt-x, 0deg) * 0.5)) rotateY(calc(var(--tilt-y, 0deg) * 0.5)) translate3d(0, 0, 0)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1), border-color 0.3s ease',
      }}
    >
      {/* Top Gloss Reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-hair/50 pb-s3 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-crimson animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-lime" />
          <div className="w-2.5 h-2.5 rounded-full bg-mute/30" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-mute">
          ATTENTION_CONTROL_CENTER_v2.0
        </span>
      </div>

      {/* Widgets row */}
      <div className="flex-1 grid grid-cols-2 gap-s3">
        {/* Metric A: Live conversions counter */}
        <div className="rounded-r3 border border-hair bg-ink/80 p-s4 flex flex-col justify-between relative group/metric overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-lime/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-mute z-10">AI CONVERSIONS</span>
          <div className="font-display font-extrabold text-[26px] md:text-[30px] tracking-[-0.02em] leading-none text-lime tabular-nums z-10 my-1">
            {conversions.toLocaleString('en-IN')}
          </div>
          <span className="font-mono text-[7px] tracking-[0.14em] uppercase text-mute z-10 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" /> LIVE IN FEED
          </span>
        </div>

        {/* Metric B: Retention gauge */}
        <div className="rounded-r3 border border-hair bg-ink/80 p-s4 flex flex-col justify-between relative group/metric overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-crimson/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-mute z-10">ATTENTION RETENTION</span>
          
          <div className="flex items-center gap-2.5 z-10 my-1">
            <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-hair"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-crimson dial-ring"
                  strokeWidth="3.5"
                  strokeDasharray="98.6, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute font-mono text-[8px] font-bold text-bone">98%</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-mono text-[9px] text-bone font-bold leading-tight">ACTIVE</div>
              <div className="font-mono text-[7px] text-mute uppercase tracking-wide">OPTIMIZING</div>
            </div>
          </div>
          <span className="font-mono text-[7px] tracking-[0.14em] uppercase text-crimson z-10">RETENTION FLOW</span>
        </div>

        {/* Multi-channel Traffic Sparklines */}
        <div className="col-span-2 rounded-r3 border border-hair bg-ink/80 px-s4 py-s3 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-mute">ATTENTION CHANNELS</span>
              <div className="font-mono text-[10px] text-bone font-bold flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 text-[8px] text-lime">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" /> ORGANIC
                </span>
                <span className="flex items-center gap-1 text-[8px] text-crimson">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" /> PAID PIPELINE
                </span>
              </div>
            </div>
            <span className="font-mono text-[7px] text-mute uppercase tracking-widest">REALTIME SCANS</span>
          </div>

          {/* Sparkline Graphic Window */}
          <div className="w-full h-[54px] relative overflow-hidden z-10 mt-1 border-t border-hair/40 pt-1">
            <div className="absolute inset-0 bg-[radial-gradient(#1f1f26_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            <div className="scan-bar" />
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50" preserveAspectRatio="none">
              {/* Lime line (Organic) */}
              <path
                d="M0 40 Q 50 35, 100 25 T 200 12 T 300 6"
                fill="none"
                stroke="var(--lime)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="sparkline-draw-lime"
              />
              
              {/* Crimson line (Paid) */}
              <path
                d="M0 35 Q 60 15, 120 30 T 240 8 T 300 2"
                fill="none"
                stroke="var(--crimson)"
                strokeWidth="2"
                strokeLinecap="round"
                className="sparkline-draw-paid"
              />
              
              <circle cx="300" cy="6" r="2" fill="var(--lime)" className="sparkline-pulse" />
              <circle cx="300" cy="2" r="2.5" fill="var(--crimson)" className="sparkline-pulse" />
            </svg>
          </div>
        </div>

        {/* Live log ticker console */}
        <div className="col-span-2 h-[56px] overflow-hidden font-mono text-[8px] tracking-wider leading-[18px] text-mute/80 bg-black/40 border border-hair rounded-r2 p-s3 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35 pointer-events-none z-10" />
          <div className="flex flex-col">
            {logs.map((log, idx) => (
              <div
                key={log + idx}
                className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis log-item"
              >
                <span className="text-crimson font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dial-ring {
          stroke-dashoffset: 100;
          animation: drawDial 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .sparkline-draw-lime {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawSparkLime 4s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
        .sparkline-draw-paid {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawSparkPaid 5s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
        }
        .sparkline-pulse {
          animation: pulseScale 1s ease-in-out infinite alternate;
        }
        .scan-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1.5px;
          background: var(--crimson);
          box-shadow: 0 0 8px var(--crimson);
          animation: scan 4s linear infinite;
          opacity: 0.7;
          pointer-events: none;
        }
        .log-item {
          animation: logFade 0.4s ease-out forwards;
        }
        @keyframes drawDial {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawSparkLime {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawSparkPaid {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulseScale {
          to { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes scan {
          0% { left: 0%; opacity: 0; }
          5% { opacity: 0.7; }
          95% { opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes logFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
