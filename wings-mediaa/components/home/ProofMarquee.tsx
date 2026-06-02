import Marquee from '@/components/Marquee';
import { home } from '@/lib/content/home';

/**
 * Beat 3 — Proof marquee. Client wordmarks in mono caps, constant velocity,
 * crimson ticks separate items. Pause on hover. Reduced-motion freezes.
 */
export default function ProofMarquee() {
  return (
    <section aria-labelledby="proof-label" className="bg-ink-2">
      <div className="container-page px-5 md:px-9 pt-s7 pb-s4">
        <h2
          id="proof-label"
          className="font-mono text-[12px] font-normal tracking-[0.22em] uppercase text-mute flex items-center gap-s4"
        >
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span>TRUSTED BY BRANDS THAT CARE HOW THEY&apos;RE SEEN</span>
        </h2>
      </div>
      <Marquee variant="mono" speed={70} items={home.proof} />
    </section>
  );
}
