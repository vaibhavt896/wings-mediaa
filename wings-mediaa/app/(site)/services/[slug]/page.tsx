import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getService } from '@/lib/content/services';
import ServiceHero from '@/components/service/ServiceHero';
import DemoSwitch from '@/components/service/DemoSwitch';
import Deliverables from '@/components/service/Deliverables';
import RelatedCases from '@/components/service/RelatedCases';
import ServiceCTA from '@/components/service/ServiceCTA';
import { JsonLd, serviceJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';

interface Params {
  slug: string;
}

/** Statically generate all 5 service pages at build time. */
export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: 'Service not found' };
  return {
    title: s.title,
    description: s.sub,
    openGraph: {
      title: `${s.title} · Wings Mediaa`,
      description: s.sub,
      type: 'website',
    },
  };
}

/**
 * /services/[slug] — service page template.
 * Template order per spec:
 *   1. Hero claim
 *   2. Pinned demo (the proof — never bullet points)
 *   3. Deliverables list
 *   4. Three case cards (related)
 *   5. CTA
 */
export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd data={serviceJsonLd(s)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: s.title, path: `/services/${s.slug}` },
        ])}
      />
      <ServiceHero s={s} />
      <DemoSwitch demoKey={s.demoKey} />
      <Deliverables items={s.deliverables} register={s.register} />
      <RelatedCases serviceSlug={s.slug} register={s.register} />
      <ServiceCTA current={s} />
    </>
  );
}
