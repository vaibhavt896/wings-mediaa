import { ImageResponse } from 'next/og';
import { getInsight, insights } from '@/lib/content/insights';
import { site } from '@/lib/seo/site';

/** Per-insight OG image. Article-style card with author + read time + accent gradient. */
export const alt = 'Wings Mediaa — Field note';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return insights.map((i) => ({
    id: i.slug,
    alt: `${i.title} — ${site.name}`,
    size,
    contentType,
  }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const i = getInsight(params.slug);
  if (!i) {
    return new ImageResponse(<div>Insight not found</div>, size);
  }

  const dateStr = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(i.publishedAt));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0F',
          backgroundImage: `linear-gradient(135deg, ${i.accent}44 0%, transparent 50%), radial-gradient(60% 60% at 75% 30%, rgba(230,255,60,0.12), transparent 60%)`,
          padding: '64px 80px',
          color: '#F4F4F1',
        }}
      >
        {/* Metadata rail */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontFamily: 'sans-serif',
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: 'rgba(244,244,241,0.7)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', width: 56, height: 2, background: '#FF3D2E' }} />
          <div style={{ display: 'flex' }}>{i.kind}</div>
          <div style={{ display: 'flex' }}>·</div>
          <div style={{ display: 'flex' }}>{dateStr}</div>
          <div style={{ display: 'flex' }}>·</div>
          <div style={{ display: 'flex' }}>{`${i.readTime} MIN READ`}</div>
        </div>

        {/* Title + summary */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1050,
            }}
          >
            {i.title}
          </div>
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 24,
              lineHeight: 1.5,
              color: 'rgba(244,244,241,0.7)',
              maxWidth: 900,
              display: 'flex',
            }}
          >
            {i.summary}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#8A8A95',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', fontWeight: 900, color: '#F4F4F1', letterSpacing: 6 }}>
            <span style={{ display: 'flex' }}>WINGS</span>
            <span style={{ display: 'flex', color: '#FF3D2E', margin: '0 6px' }}>·</span>
            <span style={{ display: 'flex' }}>MEDIAA</span>
          </span>
          <span style={{ display: 'flex', color: '#F4F4F1' }}>{`By ${i.author}`}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
