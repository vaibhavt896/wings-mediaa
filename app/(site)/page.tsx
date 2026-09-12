import Preloader from '@/components/Preloader';
import HeroBeat from '@/components/home/HeroBeat';
import NumbersBeat from '@/components/home/NumbersBeat';
import ProblemBeat from '@/components/home/ProblemBeat';
import ShiftBeat from '@/components/home/ShiftBeat';
import ServicesBeat from '@/components/home/ServicesBeat';
import WhyUsBeat from '@/components/home/WhyUsBeat';
import ProcessBeat from '@/components/home/ProcessBeat';
import VoicesBeat from '@/components/home/VoicesBeat';
import PlansBeat from '@/components/home/PlansBeat';
import FaqBeat from '@/components/home/FaqBeat';
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
      {/* ProofMarquee and SelectedWork hidden until client list is ready */}
      <NumbersBeat />
      <ProblemBeat />
      <ShiftBeat />
      <ServicesBeat />
      <WhyUsBeat />
      <ProcessBeat />
      <VoicesBeat />
      <PlansBeat />
      <FaqBeat />
      <CTABeat />
    </>
  );
}
