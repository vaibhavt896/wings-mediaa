'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import type { TeamMember } from '@/lib/content/about';

interface TeamProps {
  members: TeamMember[];
}

/**
 * The team grid — 8 leadership portraits, 2-up on tablet and 4-up on desktop.
 * Restrained art direction: single-light tone-on-tone gradients as portrait
 * fallback. Real photos drop into /public/images/team/{slug}.jpg later.
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
              <span id="team-label">WHO BUILDS YOUR BRAND</span>
            </div>
            <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1] text-bone max-w-[12ch]">
              The <span className="ital">team.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-body-m text-bone/65 leading-[1.6]">
            A focused studio where creative, strategy, and technology work as one team on your brand. No handoffs to juniors. No lost context. Just the right people, built around your growth.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s6 md:gap-s7">
          {members.map((m) => (
            <li
              key={m.name}
              data-team-card
              className="flex flex-col gap-s4 sm:col-span-1"
            >
              {/* Portrait — single light source, off-white seamless feel via tone-on-tone gradient. */}
              <div className="relative aspect-[4/5] rounded-r4 overflow-hidden border border-hair bg-ink-2">
                {m.portrait ? (
                  <Image
                    src={m.portrait}
                    alt={m.name}
                    fill
                    sizes="(max-width: 720px) 50vw, 22vw"
                    className="object-cover grayscale"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(60% 65% at 50% 35%, ${m.accent}33, transparent 70%),
                        radial-gradient(40% 40% at 50% 100%, ${m.accent}22, transparent 60%),
                        linear-gradient(180deg, #1F1F26 0%, #0A0A0F 100%)
                      `,
                    }}
                    aria-hidden
                  />
                )}
                <div className="absolute left-s4 bottom-s4 font-mono text-[10px] tracking-[0.16em] uppercase text-bone/75">
                  {m.location}
                </div>
              </div>

              <div className="flex flex-col gap-s2">
                <div className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.15]">
                  {m.name}
                </div>
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-crimson">
                  {m.role}
                </div>
                <p className="text-body-m text-bone/65 leading-[1.55]">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
