import { ImageResponse } from 'next/og';
import { getCase, cases } from '@/lib/content/cases';
import { site } from '@/lib/seo/site';

/**
 * Per-case OG image. Generated statically for all four case slugs at build time
 * via generateImageMetadata. Each one uses the case's own `cover.accent` so the
 * social card visually matches the case page.
 */
export const alt = 'Wings Mediaa · Case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return cases.map((c) => ({
    id: c.slug,
    alt: `${c.title} · ${site.name}`,
    size,
    contentType,
  }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug);
  if (!c) {
    return new ImageResponse(<div>Case not found</div>, size);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0F',
          backgroundImage: `linear-gradient(120deg, ${c.cover.accent}66 0%, transparent 55%), radial-gradient(60% 60% at 80% 30%, rgba(230,255,60,0.14), transparent 60%), linear-gradient(135deg, ${c.cover.accent}33 0%, transparent 70%)`,
          padding: '64px 80px',
          color: '#F4F4F1',
        }}
      >
        {/* Eyebrow row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            fontFamily: 'sans-serif',
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: 'rgba(244,244,241,0.7)',
          }}
        >
          <div style={{ display: 'flex', width: 56, height: 2, background: '#FF3D2E' }} />
          <div style={{ display: 'flex' }}>{c.indexLabel}</div>
          <div style={{ display: 'flex' }}>·</div>
          <div style={{ display: 'flex' }}>{c.client.toUpperCase()}</div>
          <div style={{ display: 'flex' }}>·</div>
          <div style={{ display: 'flex' }}>{String(c.year)}</div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: -3,
              maxWidth: 1050,
            }}
          >
            {c.title}
          </div>
          <div
            style={{
              marginTop: 32,
              fontFamily: 'sans-serif',
              fontSize: 24,
              lineHeight: 1.45,
              color: 'rgba(244,244,241,0.75)',
              maxWidth: 900,
              display: 'flex',
            }}
          >
            {c.brief.length > 180 ? c.brief.slice(0, 180) + '…' : c.brief}
          </div>
        </div>

        {/* Bottom strip */}
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
          <div style={{ display: 'flex', gap: 16 }}>
            {c.verticals.slice(0, 3).map((v) => (
              <span
                key={v}
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  border: '1px solid rgba(244,244,241,0.25)',
                  borderRadius: 9999,
                  fontSize: 14,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
