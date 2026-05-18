import Marquee from '@/components/Marquee';
import { home } from '@/lib/content/home';

/**
 * Beat 3 — Proof marquee. Client wordmarks in mono caps, constant velocity,
 * crimson ticks separate items. Pause on hover. Reduced-motion freezes.
 */
export default function ProofMarquee() {
  return (
    <section aria-labelledby="proof-label" className="bg-ink-2">
      <h2 id="proof-label" className="sr-only">
        Clients
      </h2>
      <Marquee variant="mono" speed={70} items={home.proof} />
    </section>
  );
}
