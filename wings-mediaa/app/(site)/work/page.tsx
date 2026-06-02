import type { Metadata } from 'next';
import MosaicGrid from '@/components/work/MosaicGrid';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Real brands we are growing: Solitaire, Skin Mantraa. No borrowed logos, no invented numbers.',
};

/**
 * /work — the index. Mosaic of project tiles in varying aspect ratios with a Flip-animated filter.
 * Per spec: "case studies are the product. The home page launches them; this index is where they live."
 */
export default function WorkIndexPage() {
  return (
    <>
      {/* Header */}
      <section className="relative isolate pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden">
        <div className="ambient-glow" aria-hidden />
        <div className="container-page">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
            <span className="block w-9 h-px bg-crimson" />
            INDEX · THE WORK
          </div>
          <h1 className="font-display font-extrabold text-xxl leading-[0.92] tracking-[-0.04em] text-bone">
            Real brands. Real <span className="ital">growth.</span>
            <br />
            No borrowed logos.
          </h1>
          <p className="mt-s7 max-w-[620px] text-body-l text-bone/80">
            We take on a limited number of brands at a time. Only real clients, only real numbers,
            plugged in as the results land.
          </p>
        </div>
      </section>

      {/* Mosaic + filter */}
      <section className="px-5 md:px-9 pb-s10">
        <div className="container-page">
          <MosaicGrid />
        </div>
      </section>
    </>
  );
}
