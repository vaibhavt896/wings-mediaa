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
            lines={['We make local brands', 'impossible to ignore.']}
            italicWord="impossible"
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
              Start your project →
            </Button>
            <Button variant="secondary" href="/work">
              See the work
            </Button>
            <Button variant="ghost" href="/about">
              Read the story →
            </Button>
            <Button variant="primary" onClick={() => alert('clicked')}>
              Click handler
            </Button>
          </div>
          <p className="mt-s6 text-mute text-body-m max-w-prose">
            All buttons are magnetic: they translate toward the cursor by 18% of cursor offset
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
            'SOCIAL & CONTENT',
            'PERFORMANCE ADS',
            'WEBSITES',
            'SEO & AI SEARCH',
            'WHATSAPP & AUTOMATION',
            'BRANDING',
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
            items={['SOLITAIRE · FINE JEWELLERY', 'SKIN MANTRAA · SKINCARE CLINIC']}
          />
        </div>
      </section>

      {/* CountUp + Metric */}
      <section className="section">
        <div className="container-page">
          <SectionLabel n="04" title="COUNT UP · METRIC" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s7">
            <Metric value={2} eyebrow="REAL CLIENTS" label="KANPUR · 2026" />
            <Metric value={6} eyebrow="SERVICES" label="ONE STUDIO" />
            <Metric value={1} eyebrow="FOUNDER-LED" label="ACCOUNTABLE" />
          </div>

          <div className="mt-s8 flex items-baseline gap-s5">
            <span className="font-display font-extrabold text-d-xl text-bone leading-none">
              <CountUp to={100} suffix="%" />
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
              href="/work/solitaire"
              title="Solitaire"
              caption="01 · FINE JEWELLERY · SWAROOP NAGAR"
              indexLabel="CASE · 001"
              accent="#FF3D2E"
            />
            <CaseTile
              href="/work/skin-mantraa"
              title="Skin Mantraa"
              caption="02 · SKINCARE CLINIC · KANPUR"
              indexLabel="CASE · 002"
              accent="#E6FF3C"
            />
          </div>
          <p className="mt-s6 text-mute text-body-m max-w-prose">
            Hover scales 1.04 with overshoot, mask-reveals on scroll-into-view (clip-path 100% to
            0). Cursor swaps to the VIEW pill via <code className="font-mono text-[11px]">data-cur=&quot;media&quot;</code>.
          </p>
        </div>
      </section>

      {/* PinScrub — horizontal */}
      <section className="container-page mb-s8 px-5 md:px-9">
        <SectionLabel n="06" title="PINSCRUB · HORIZONTAL" />
      </section>
      <PinScrub mode="horizontal" innerClassName="gap-s8 px-9">
        {['LISTEN', 'PLAN', 'BUILD', 'GROW'].map((step, i) => (
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
                'A short, focused conversation about your business, your customer, and what you want more of. Free, and genuinely useful.'}
              {step === 'PLAN' &&
                'A clear, honest plan: what we would do, what it costs, what to expect. If we are not the right fit, we say so.'}
              {step === 'BUILD' &&
                'We get to work on strategy, content, ads, the system. You see progress, not promises.'}
              {step === 'GROW' &&
                'As customers come in, we scale what works. Your results become our portfolio.'}
            </p>
          </div>
        ))}
      </PinScrub>

      {/* Quote */}
      <section className="section">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-s7">
          <Quote
            text="I started Wings Mediaa because Kanpur is full of brilliant businesses being out-marketed by lesser ones. The difference is never the product. It is who knows how to be seen."
            name="Vaibhav Tiwari"
            role="Founder"
            company="WINGS MEDIAA"
          />
          <Quote
            lime
            text="Real client testimonials land here as the work compounds. We feature words only once they are genuinely ours."
            name="Sample"
            role="Placeholder"
            company="LANDING SOON"
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
              label="Tell us about your brand"
              name="brief"
              placeholder="What do you want more of?"
              hint="A few lines is plenty. We will come back with questions."
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
      {n} · {title}
    </div>
  );
}
