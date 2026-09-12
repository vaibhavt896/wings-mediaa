'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import type { TeamMember } from '@/lib/content/about';

interface TeamProps {
  members: TeamMember[];
}

/**
 * Leadership & Squads — high-craft grid detailing senior direction and specialized squads.
 * Clear deliverables, tangible capabilities, and transparent accountability.
 */
export default function Team({ members }: TeamProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-team-card]', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="team-label"
      className="px-5 md:px-9 py-s10 border-t border-hair"
    >
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-s6 mb-s8">
          <div>
            <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
              <span className="block w-9 h-px bg-crimson" />
              <span id="team-label">WHO DELIVERS YOUR RESULTS</span>
            </div>
            <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1] text-bone max-w-[14ch]">
              Leadership &amp; <span className="ital">Squads.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-body-m text-bone/70 leading-[1.6]">
            A hyper-fast AI-powered agency where creative direction, media buying, and growth engineering operate as dedicated squads on your account. Direct senior accountability with zero junior handoffs.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s6 md:gap-s7">
          {members.map((m, idx) => (
            <li
              key={m.name}
              data-team-card
              className="flex flex-col gap-s4 sm:col-span-1"
            >
              {/* Squad visual badge area */}
              <div className="relative aspect-[4/5] rounded-r4 overflow-hidden border border-hair bg-ink-2 flex flex-col justify-between p-s5">
                {m.portrait ? (
                  <Image
                    src={m.portrait}
                    alt={m.name}
                    fill
                    sizes="(max-width: 720px) 50vw, 22vw"
                    className="object-cover grayscale"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 -z-10"
                      style={{
                        background: `
                          radial-gradient(60% 65% at 50% 35%, ${m.accent}2a, transparent 70%),
                          radial-gradient(40% 40% at 50% 100%, ${m.accent}18, transparent 60%),
                          linear-gradient(180deg, #181820 0%, #0A0A0F 100%)
                        `,
                      }}
                      aria-hidden
                    />

                    {/* Top status indicator & badge */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: m.accent }}
                        />
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-bone/60">
                          ACTIVE
                        </span>
                      </div>
                      {m.badge && (
                        <span className="font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded bg-bone/5 border border-hair text-bone/80">
                          {m.badge}
                        </span>
                      )}
                    </div>

                    {/* Center monogram / squad symbol */}
                    <div className="my-auto text-center z-10">
                      {idx === 0 ? (
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-crimson/40 bg-crimson/10 font-display font-extrabold text-bone text-2xl tracking-tighter">
                          VT
                        </div>
                      ) : idx === 1 ? (
                        <div className="font-mono text-3xl text-bone/80 tracking-widest">
                          CREATIVE
                        </div>
                      ) : idx === 2 ? (
                        <div className="font-mono text-3xl text-bone/80 tracking-widest">
                          GROWTH
                        </div>
                      ) : (
                        <div className="font-mono text-3xl text-bone/80 tracking-widest">
                          SYSTEMS
                        </div>
                      )}
                    </div>

                    {/* Bottom strip */}
                    <div className="z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-bone/60 pt-s2 border-t border-hair/50">
                      <span>{m.location}</span>
                      <span className="text-crimson">DELIVERY SQUAD</span>
                    </div>
                  </>
                )}
              </div>

              {/* Text metadata */}
              <div className="flex flex-col gap-s2">
                <div className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.15]">
                  {m.name}
                </div>
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-crimson">
                  {m.role}
                </div>
                <p className="text-body-m text-bone/65 leading-[1.55]">{m.bio}</p>

                {/* Deliverables tags */}
                {m.deliverables && (
                  <div className="flex flex-wrap gap-1.5 mt-s2">
                    {m.deliverables.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[10px] tracking-[0.08em] px-2 py-0.5 rounded bg-bone/5 border border-hair text-bone/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
