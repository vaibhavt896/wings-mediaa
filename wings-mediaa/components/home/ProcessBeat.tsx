'use client';

import PinScrub from '@/components/PinScrub';
import { home } from '@/lib/content/home';

/**
 * Beat 7 — Process. Horizontal scroll inside a vertical page.
 * Each step card is a poster: huge number, short label, 2-line description.
 * Reduced motion: PinScrub no-ops and the section becomes a horizontal-overflow scroll-snap row.
 */
export default function ProcessBeat() {
  return (
    <section aria-labelledby="process-label" className="relative border-t border-hair bg-ink">
      {/* Eyebrow + headline strip — visible above the pinned section */}
      <div className="container-page px-5 md:px-9 pt-s9 pb-s7">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
          <span className="block w-9 h-px bg-crimson" />
          <span id="process-label">07 / 09 — HOW WE WORK</span>
        </div>
        <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1] text-bone">
          Four <span className="ital">moves.</span> One studio.
        </h2>
      </div>

      <PinScrub
        mode="horizontal"
        innerClassName="gap-s6 md:gap-s8 pl-5 md:pl-9 pr-s9"
      >
        {home.process.map((step, i) => (
          <article
            key={step.n}
            className="shrink-0 w-[88vw] sm:w-[70vw] md:w-[58vw] lg:w-[44vw] h-screen flex flex-col justify-center gap-s6 border-l border-hair pl-s7 pr-s5"
          >
            <div className="font-display font-extrabold text-[clamp(96px,18vw,220px)] leading-none tracking-[-0.04em] text-bone">
              {step.n}
            </div>
            <h3 className="font-display font-bold text-d-l text-bone tracking-[-0.02em]">
              <span className="text-crimson">{step.label}</span>
            </h3>
            <p className="text-body-l text-bone/70 max-w-[40ch]">{step.blurb}</p>
            <div className="mt-s4 font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
              STEP 0{i + 1} / 04
            </div>
          </article>
        ))}

        {/* Tail card — calm landing after the four posters */}
        <article className="shrink-0 w-[60vw] md:w-[40vw] h-screen flex flex-col justify-center gap-s4 pl-s7">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
            04 STEPS · ONE LOOP
          </div>
          <p className="font-display font-bold text-d-m text-bone tracking-[-0.02em] leading-[1.1]">
            We don&apos;t hand off the work. We <span className="ital">stay with it.</span>
          </p>
        </article>
      </PinScrub>
    </section>
  );
}
