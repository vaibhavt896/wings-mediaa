import type { Metadata } from 'next';
import IndexLayout from '@/components/insights/IndexLayout';
import { insights, featuredInsights } from '@/lib/content/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Field notes from Wings Mediaa — essays on motion, performance, branding, and the craft of moving attention.',
};

/**
 * /insights — single chronological list with featured pins. No taxonomy.
 */
export default function InsightsIndexPage() {
  const featured = featuredInsights;
  const rest = insights.filter((i) => !i.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden">
        <div className="container-page">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
            <span className="block w-9 h-px bg-crimson" />
            INDEX — FIELD NOTES
          </div>
          <h1 className="font-display font-extrabold text-xxl leading-[0.92] tracking-[-0.04em] text-bone">
            What we&apos;re <span className="ital">noticing.</span>
          </h1>
          <p className="mt-s7 max-w-[620px] text-body-l text-bone/80">
            Field notes written between projects — on motion, performance, branding, and what
            scales in India in 2026.
          </p>
        </div>
      </section>

      <IndexLayout featured={featured} rest={rest} />
    </>
  );
}
