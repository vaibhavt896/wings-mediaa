import Preloader from '@/components/Preloader';
import HeroBeat from '@/components/home/HeroBeat';
import ProofMarquee from '@/components/home/ProofMarquee';
import SelectedWork from '@/components/home/SelectedWork';
import NumbersBeat from '@/components/home/NumbersBeat';
import ServicesBeat from '@/components/home/ServicesBeat';
import ProcessBeat from '@/components/home/ProcessBeat';
import VoicesBeat from '@/components/home/VoicesBeat';
import CTABeat from '@/components/home/CTABeat';

/**
 * Homepage — the 9-beat scroll-scrubbed reel.
 *
 *   0  Preloader      — 1.2s wordmark assembly, session-gated.
 *   1  Hero           — Display XXL kinetic statement, italic crimson "move".
 *   2  Sub-anchor     — eyebrow + sub copy + live · scroll affordance.
 *   3  Proof marquee  — client wordmarks, mono caps, constant velocity.
 *   4  Selected work  — 2-up grid, mask-reveal, neighbor-shift on hover.
 *   5  Numbers        — pinned section, scrub-bound count-up + right-edge progress.
 *   6  Services       — sticky headline (word clip-mask rotate) + scrolling stack.
 *   7  Process        — horizontal scroll, four poster steps.
 *   8  Voices         — two pull-quotes, slow editorial pacing.
 *   9  CTA close      — oversized wordmark + magnetic CTA + secondary calendar.
 *
 * Beats 1+2 are merged in HeroBeat to share one viewport.
 */
export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeroBeat />
      <ProofMarquee />
      <SelectedWork />
      <NumbersBeat />
      <ServicesBeat />
      <ProcessBeat />
      <VoicesBeat />
      <CTABeat />
    </>
  );
}
