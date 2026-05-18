'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface HeroStatementProps {
  /** Lines of the headline. Each will be a separate masked line. */
  lines: string[];
  /** Optional word(s) to render as Instrument Serif italic crimson — first match per line. */
  italicWord?: string;
  /** Heading level. Default 'h1'. */
  as?: 'h1' | 'h2';
  className?: string;
  /** Delay before reveal (sec). Default 0.2. Increase to wait for a preloader. */
  delay?: number;
  /** Trigger on scroll into view instead of mount. Default false (hero usage). */
  scrollTrigger?: boolean;
  /** Wait for the `wm:preloader-done` event before revealing. Use this on the home Beat 1. */
  waitForPreloader?: boolean;
}

/**
 * HeroStatement — Display XXL kinetic statement.
 * Each line is masked (overflow:hidden); words inside translate from yPercent 110 → 0
 * with 60ms stagger, 1.1s duration, expo-out. Matches handoff §07 hero pattern.
 */
export default function HeroStatement({
  lines,
  italicWord,
  as: Tag = 'h1',
  className,
  delay = 0.2,
  scrollTrigger = false,
  waitForPreloader = false,
}: HeroStatementProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const words = root.querySelectorAll<HTMLElement>('.hs-word');
    if (!words.length) return;

    // Respect reduced motion — set final state and bail.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(words, { yPercent: 110 });

    let anim: gsap.core.Tween | null = null;
    const start = () => {
      anim = gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        delay,
        ...(scrollTrigger
          ? {
              scrollTrigger: {
                trigger: root,
                start: 'top 80%',
                once: true,
              },
            }
          : {}),
      });
    };

    let cleanupListener: (() => void) | null = null;
    if (waitForPreloader) {
      const onDone = () => {
        start();
      };
      window.addEventListener('wm:preloader-done', onDone, { once: true });
      cleanupListener = () => window.removeEventListener('wm:preloader-done', onDone);
    } else {
      start();
    }

    return () => {
      anim?.kill();
      cleanupListener?.();
      if (scrollTrigger) {
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === root)
          .forEach((st) => st.kill());
      }
    };
  }, [delay, scrollTrigger, waitForPreloader, lines, italicWord]);

  return (
    <div ref={rootRef}>
      <Tag
        className={cn(
          'font-display font-extrabold text-xxl leading-[0.92] tracking-[-0.04em]',
          className
        )}
      >
        {lines.map((line, li) => (
          <span key={li} className="block overflow-hidden">
            <span className="inline-block">{splitWords(line, italicWord)}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/** Split a line into spaced word spans. The first occurrence of `italicWord` is wrapped in .ital. */
function splitWords(line: string, italicWord?: string) {
  const tokens = line.split(/(\s+)/); // keep whitespace
  let italicConsumed = false;
  return tokens.map((tok, i) => {
    if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
    const cleanMatch =
      italicWord &&
      !italicConsumed &&
      tok.replace(/[^\p{L}\p{N}-]/gu, '').toLowerCase() === italicWord.toLowerCase();
    if (cleanMatch) {
      italicConsumed = true;
      return (
        <span key={i} className="hs-word inline-block">
          <span className="ital">{tok}</span>
        </span>
      );
    }
    return (
      <span key={i} className="hs-word inline-block">
        {tok}
      </span>
    );
  });
}
