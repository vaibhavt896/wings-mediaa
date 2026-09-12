import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { insights, getInsight, nextInsight } from '@/lib/content/insights';
import InsightArticle from '@/components/insights/InsightArticle';
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getInsight(slug);
  if (!i) return { title: 'Field note not found' };
  return {
    title: i.title,
    description: i.summary,
    openGraph: {
      title: `${i.title} · Wings Mediaa`,
      description: i.summary,
      type: 'article',
      publishedTime: i.publishedAt,
      authors: [i.author],
    },
  };
}

/**
 * /insights/[slug] — long-form editorial column with cover, mono rail, body blocks,
 * and a magnetic next-article CTA.
 */
export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const next = nextInsight(slug);

  return (
    <>
      <JsonLd data={articleJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ])}
      />
      <InsightArticle insight={insight} next={next} />
    </>
  );
}
