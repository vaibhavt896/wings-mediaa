import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cases, getCase, nextCase } from '@/lib/content/cases';
import CaseHero from '@/components/case/CaseHero';
import CaseBlocks from '@/components/case/CaseBlocks';
import CreditsBlock from '@/components/case/CreditsBlock';
import NextCase from '@/components/case/NextCase';
import { JsonLd, creativeWorkJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';

interface Params {
  slug: string;
}

/** Statically generate the four case pages at build time. */
export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: 'Case study not found' };
  return {
    title: c.title,
    description: c.brief.slice(0, 160),
    openGraph: {
      title: `${c.title} · Wings Mediaa`,
      description: c.brief.slice(0, 160),
      type: 'article',
    },
  };
}

/**
 * /work/[slug] — case study as a film.
 *
 *  CaseHero        cover + client metadata
 *  Brief           italic editorial paragraph
 *  CaseBlocks      variable art direction — poster/gallery/quote/metrics/scrub/embed/text
 *  CreditsBlock    mono two-column role/name list
 *  NextCase        magnetic next-case CTA
 */
export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const next = nextCase(slug);

  return (
    <>
      <JsonLd data={creativeWorkJsonLd(c)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: c.title, path: `/work/${c.slug}` },
        ])}
      />
      <CaseHero c={c} />

      {/* Brief — italic editorial paragraph, max prose width */}
      <section className="px-5 md:px-9 py-s10">
        <div className="container-page max-w-[820px]">
          <p className="font-serif italic text-d-m md:text-[32px] leading-[1.3] text-bone/90">
            <span className="text-crimson" aria-hidden>
              “
            </span>
            {c.brief}
            <span className="text-crimson" aria-hidden>
              ”
            </span>
          </p>
        </div>
      </section>

      <CaseBlocks blocks={c.sections} />

      <CreditsBlock credits={c.credits} />

      <NextCase next={next} />
    </>
  );
}
