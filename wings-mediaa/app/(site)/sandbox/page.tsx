'use client';

import HeroStatement from '@/components/HeroStatement';
import Marquee from '@/components/Marquee';
import Metric from '@/components/Metric';
import CountUp from '@/components/CountUp';
import CaseTile from '@/components/CaseTile';
import PinScrub from '@/components/PinScrub';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import Quote from '@/components/Quote';
import Field from '@/components/Field';

/**
 * Sandbox — every Phase B component in isolation.
 * Not linked from anywhere. Used for visual QA before wiring into the homepage.
 */
export default function Sandbox() {
  return (
    <>
      {/* HeroStatement */}
      <section className="section relative isolate overflow-hidden">
        <div className="ambient-glow" />
        <div className="container-page">
          <SectionLabel n="01" title="HERO STATEMENT" />
          <HeroStatement
            lines={['We make brands', 'move — in feeds,', 'in funnels, on screen.']}
            italicWord="move"
          />
          <p className="mt-s7 max-w-[640px] text-body-l text-bone/80">
            Headline animates on mount: each word rises from a hidden mask, 60ms stagger, 1.1s
            expo-out. Italic accent word renders in Instrument Serif + crimson.
          </p>
        </div>
      </section>

      {/* Buttons + Magnetic */}
      <section className="section">
        <div className="container-page">
          <SectionLabel n="02" title="BUTTONS · MAGNETIC" />
          <div className="flex flex-wrap items-center gap-s5">
            <Button variant="primary" href="/contact">
              Start a project →
            </Button>
            <Button variant="secondary" href="/work">
              See the work
            </Button>
            <Button variant="ghost" href="/about">
              Read the manifesto →
            </Button>
            <Button variant="primary" onClick={() => alert('clicked')}>
              Click handler
            </Button>
          </div>
          <p className="mt-s6 text-mute text-body-m max-w-prose">
            All buttons are magnetic — they translate toward the cursor by 18% of cursor offset
            within a 120px radius. Crimson primary, outlined secondary, underlined ghost.
          </p>

          <div className="mt-s8 flex flex-wrap items-center gap-s7">
            <Magnetic radius={140} coeff={0.3}>
              <div
                className="w-32 h-32 rounded-pill bg-crimson grid place-items-center text-ink font-mono text-[11px] tracking-[0.14em] uppercase font-bold"
                data-cur="link"
              >
                MAGNET
              </div>
            </Magnetic>
            <Magnetic radius={120} coeff={0.18}>
              <div className="px-s7 py-s6 border border-bone text-bone font-mono text-[11px] tracking-[0.18em] uppercase rounded-r4">
                Custom wrapper
              </div>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="section">
        <div className="container-page mb-s7">
          <SectionLabel n="03" title="MARQUEE" />
        </div>
        <Marquee
          items={[
            'PERFORMANCE MARKETING',
            'SOCIAL & CONTENT',
            'BRANDING',
            'WEB & MOTION',
            'SEO / AEO',
            'CREATIVE STRATEGY',
          ]}
          speed={80}
        />
        <div className="container-page mt-s6">
          <p className="text-mute text-body-m max-w-prose">
            Constant velocity (80 px/s default). Pauses on hover. Reduced-motion freezes it.
          </p>
        </div>
        <div className="mt-s7">
          <Marquee
            variant="mono"
            speed={60}
            reverse
            items={['KORA · NUDE', 'TRANQUIL TEAS', 'IXANA', 'VALOR', 'SOLEIL', 'OBSCURA']}
          />
        </div>
      </section>

      {/* CountUp + Metric */}
      <section className="section">
        <div className="container-page">
          <SectionLabel n="04" title="COUNT UP · METRIC" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s7">
            <Metric value={7.4} suffix="×" eyebrow="ROAS" label="KORA D2C · Q1 2026" />
            <Metric value={312} prefix="+" suffix="%" eyebrow="REVENUE" label="VALOR · 12 WEEKS" />
            <Metric value={1500000} suffix="+" eyebrow="IMPRESSIONS" label="TRANQUIL TEAS LAUNCH" />
          </div>

          <div className="mt-s8 flex items-baseline gap-s5">
            <span className="font-display font-extrabold text-d-xl text-bone leading-none">
              <CountUp to={9.8} suffix="×" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
              Inline CountUp
            </span>
          </div>
        </div>
      </section>

      {/* Case tiles */}
      <section className="section">
        <div className="container-page">
          <SectionLabel n="05" title="CASE TILE" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-s7">
            <CaseTile
              href="/work/kora"
              title="Kora — D2C launch reel"
              caption="01 · D2C · MUMBAI · ROAS 7.4×"
              indexLabel="CASE · 001"
              accent="#FF3D2E"
            />
            <CaseTile
              href="/work/valor"
              title="Valor — Brand film"
              caption="03 · BRAND FILM · 2026 · 30s SPOT"
              indexLabel="CASE · 003"
              accent="#E6FF3C"
            />
          </div>
          <p className="mt-s6 text-mute text-body-m max-w-prose">
            Hover scales 1.04 with overshoot, mask-reveals on scroll-into-view (clip-path 100% →
            0). Cursor swaps to the VIEW pill via <code className="font-mono text-[11px]">data-cur=&quot;media&quot;</code>.
          </p>
        </div>
      </section>

      {/* PinScrub — horizontal */}
      <section className="container-page mb-s8 px-5 md:px-9">
        <SectionLabel n="06" title="PINSCRUB · HORIZONTAL" />
      </section>
      <PinScrub mode="horizontal" innerClassName="gap-s8 px-9">
        {['LISTEN', 'SKETCH', 'BUILD', 'SHIP'].map((step, i) => (
          <div
            key={step}
            className="w-[80vw] md:w-[60vw] shrink-0 h-screen flex flex-col justify-center gap-s5 border-l border-hair pl-s7"
          >
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-crimson">
              STEP 0{i + 1}
            </div>
            <h3 className="font-display font-extrabold text-d-l text-bone tracking-[-0.02em]">
              {step}.
            </h3>
            <p className="text-body-l text-bone/70 max-w-[40ch]">
              {step === 'LISTEN' &&
                'We start with a 90-minute deep-listen — your goals, your audience, the constraints nobody else asked about.'}
              {step === 'SKETCH' &&
                'Two creative routes, drawn fast, presented loud. The point is to find the spine, not the polish.'}
              {step === 'BUILD' &&
                'Production at agency-speed with studio-craft. Daily standups, weekly screenings.'}
              {step === 'SHIP' &&
                'Launch is day one, not day zero. Performance is tracked, creative is iterated, the work keeps moving.'}
            </p>
          </div>
        ))}
      </PinScrub>

      {/* Quote */}
      <section className="section">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-s7">
          <Quote
            text="Working with Wings Mediaa was the first time our creative agency understood the funnel."
            name="Priya M"
            role="CMO"
            company="TRANQUIL TEAS"
          />
          <Quote
            lime
            text="They didn't just ship a film. They shipped a feeling that our customers screenshot and post back at us."
            name="Aman Rao"
            role="Founder"
            company="KORA D2C"
          />
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container-page max-w-[640px]">
          <SectionLabel n="07" title="FIELDS · FORM" />
          <form
            className="flex flex-col gap-s7 mt-s7"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Submitted (sandbox)');
            }}
          >
            <Field label="Your name" name="name" placeholder="Type here…" autoComplete="name" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="hello@yourbrand.com"
              autoComplete="email"
            />
            <Field
              as="textarea"
              label="Tell us about the project"
              name="brief"
              placeholder="Goals, audience, timeline…"
              hint="A few lines is plenty — we'll come back with questions."
            />
            <div className="pt-s4">
              <Button variant="primary" type="submit">
                Send brief →
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
      <span className="block w-9 h-px bg-crimson" />
      {n} — {title}
    </div>
  );
}
