'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Quote from '@/components/Quote';
import CountUp from '@/components/CountUp';
import type { CaseBlock } from '@/lib/content/cases';
import { cn } from '@/lib/utils';

/* ------------------------- RENDERER --------------------------------------- */

/**
 * Renders the array of case body blocks. Each block is its own art-direction sandbox —
 * the wrapper (page) is the constant; the block decides everything inside.
 */
export default function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockSwitch key={i} block={b} index={i} />
      ))}
    </>
  );
}

function BlockSwitch({ block, index }: { block: CaseBlock; index: number }) {
  switch (block.type) {
    case 'poster':
      return <PosterBlock block={block} index={index} />;
    case 'gallery':
      return <GalleryBlock block={block} index={index} />;
    case 'quote':
      return <QuoteBlock block={block} index={index} />;
    case 'metricsRow':
      return <MetricsRowBlock block={block} index={index} />;
    case 'scrub':
      return <ScrubBlock block={block} index={index} />;
    case 'embed':
      return <EmbedBlock block={block} index={index} />;
    case 'text':
      return <TextBlock block={block} index={index} />;
  }
}

/* ------------------------- HELPERS ---------------------------------------- */

/** Wrapper that fades children up on scroll-in-view. Honors reduced motion. */
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function sectionClass(bg?: 'ink' | 'bone') {
  return cn(
    'px-5 md:px-9 py-s9',
    bg === 'bone' ? 'bg-bone text-ink' : 'bg-ink text-bone'
  );
}

/* ------------------------- BLOCKS ----------------------------------------- */

function PosterBlock({ block }: { block: Extract<CaseBlock, { type: 'poster' }>; index: number }) {
  const aspect = block.aspect ?? '16:9';
  const aspectClass =
    aspect === '21:9'
      ? 'aspect-[21/9]'
      : aspect === '9:16'
        ? 'aspect-[9/16] max-w-[480px] mx-auto'
        : aspect === '4:3'
          ? 'aspect-[4/3]'
          : aspect === '1:1'
            ? 'aspect-square'
            : 'aspect-video';

  return (
    <section className={sectionClass(block.bg)}>
      <div className="container-page">
        <Reveal>
          <div className={cn('relative w-full overflow-hidden rounded-r4 bg-ink-2', aspectClass)}>
            {block.videoSrc ? (
              <video
                src={block.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : block.image ? (
              <Image
                src={block.image}
                alt={block.caption ?? 'Case study image'}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(120deg, ${block.accent ?? '#FF3D2E'}55 0%, transparent 55%),
                    radial-gradient(circle at 75% 50%, rgba(230,255,60,0.18), transparent 60%),
                    linear-gradient(135deg, ${block.accent ?? '#FF3D2E'} 0%, #15151C 100%)
                  `,
                }}
              />
            )}

            {block.caption && (
              <div className="absolute left-s5 bottom-s4 z-10 font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90">
                {block.caption}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryBlock({ block }: { block: Extract<CaseBlock, { type: 'gallery' }>; index: number }) {
  return (
    <section className={sectionClass(block.bg)}>
      <div className="container-page">
        <Reveal>
          {/* Horizontal scrollable row on overflow; on desktop displays as a 16:10 row of varying widths */}
          <div className="flex gap-s5 md:gap-s6 overflow-x-auto snap-x snap-mandatory pb-s4 -mx-5 md:mx-0 px-5 md:px-0">
            {block.images.map((img, i) => (
              <div
                key={i}
                className="snap-start shrink-0 w-[80vw] sm:w-[60vw] md:w-[42vw] lg:w-[34vw] aspect-[4/3] relative overflow-hidden rounded-r4 bg-ink-2"
              >
                {img.src ? (
                  <Image src={img.src} alt={img.alt} fill sizes="40vw" className="object-cover" />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(135deg, ${img.accent ?? '#FF3D2E'}cc 0%, #15151C 100%)
                      `,
                    }}
                  />
                )}
                <div className="absolute left-s4 bottom-s3 font-mono text-[10px] tracking-[0.14em] uppercase text-bone/80">
                  {String(i + 1).padStart(2, '0')} / {String(block.images.length).padStart(2, '0')}
                  {img.caption && (
                    <>
                      {' · '}
                      <span className="text-bone/90">{img.caption}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuoteBlock({ block }: { block: Extract<CaseBlock, { type: 'quote' }>; index: number }) {
  return (
    <section className="px-5 md:px-9 py-s10 bg-ink">
      <div className="container-page max-w-[840px]">
        <Reveal>
          <Quote
            size="xl"
            text={block.text}
            name={block.name}
            role={block.role}
            company={block.company}
            lime={block.lime}
          />
        </Reveal>
      </div>
    </section>
  );
}

function MetricsRowBlock({ block }: { block: Extract<CaseBlock, { type: 'metricsRow' }>; index: number }) {
  return (
    <section className="px-5 md:px-9 py-s9 bg-ink border-y border-hair">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s7">
            {block.metrics.map((m, i) => (
              <div key={i} className="flex flex-col gap-s3">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
                  {m.eyebrow}
                </div>
                <div className="font-display font-extrabold text-d-l tracking-[-0.03em] leading-none text-bone">
                  <CountUp
                    to={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                  />
                </div>
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute leading-[1.5]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScrubBlock({ block }: { block: Extract<CaseBlock, { type: 'scrub' }>; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-scrub-line]', {
        y: 60,
        opacity: 0,
        stagger: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 60%',
          end: 'bottom 30%',
          scrub: 0.6,
        },
      });
    }, root);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === root)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative px-5 md:px-9 py-s10 bg-ink isolate overflow-hidden"
      style={{
        backgroundImage: block.accent
          ? `radial-gradient(60vmax 50vmax at 50% 50%, ${block.accent}26, transparent 65%)`
          : undefined,
      }}
    >
      <div className="container-page">
        <div className="flex flex-col gap-s5">
          {block.lines.map((line, i) => (
            <div
              key={i}
              data-scrub-line
              className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.05] text-bone"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmbedBlock({ block }: { block: Extract<CaseBlock, { type: 'embed' }>; index: number }) {
  const aspect = block.aspect ?? '16:9';
  const aspectClass =
    aspect === '21:9'
      ? 'aspect-[21/9]'
      : aspect === '9:16'
        ? 'aspect-[9/16] max-w-[480px] mx-auto'
        : aspect === '4:3'
          ? 'aspect-[4/3]'
          : 'aspect-video';

  return (
    <section className="px-5 md:px-9 py-s9 bg-ink">
      <div className="container-page">
        <Reveal>
          <div
            className={cn(
              'relative w-full overflow-hidden rounded-r4 bg-ink-2 border border-hair',
              aspectClass
            )}
          >
            {block.src ? (
              /youtube|vimeo/i.test(block.src) ? (
                <iframe
                  src={block.src}
                  title="Case embed"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  allow="autoplay; fullscreen"
                />
              ) : (
                <video
                  src={block.src}
                  poster={block.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-mute font-mono text-[12px] tracking-[0.16em] uppercase">
                EMBED · PLACEHOLDER
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TextBlock({ block }: { block: Extract<CaseBlock, { type: 'text' }>; index: number }) {
  const isLg = block.size === 'lg';
  const bg = block.bg ?? 'ink';
  return (
    <section className={sectionClass(bg)}>
      <div className="container-page max-w-[800px]">
        <Reveal className="flex flex-col gap-s5">
          {block.eyebrow && (
            <div
              className={cn(
                'font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-s4',
                bg === 'bone' ? 'text-ink/60' : 'text-mute'
              )}
            >
              <span className="block w-9 h-px bg-crimson" />
              {block.eyebrow}
            </div>
          )}
          <p
            className={cn(
              'leading-[1.55]',
              isLg ? 'text-d-m md:text-[28px] font-display font-medium tracking-[-0.01em]' : 'text-body-l',
              bg === 'bone' ? 'text-ink/80' : 'text-bone/85'
            )}
          >
            {block.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
