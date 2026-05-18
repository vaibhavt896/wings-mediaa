import { ImageResponse } from 'next/og';
import { site } from '@/lib/seo/site';

/**
 * Default OG image — used by all routes that don't have their own opengraph-image.tsx.
 * 1200×630 brand card: ink canvas, crimson accent rule, wordmark, tagline, address strip.
 * Generated statically at build time (no `runtime = 'edge'` flag needed for static OG).
 */
export const alt = `${site.name} — Motion-led studio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0F',
          backgroundImage:
            'radial-gradient(60% 60% at 18% 30%, rgba(255,61,46,0.32), transparent 60%), radial-gradient(50% 50% at 88% 80%, rgba(230,255,60,0.10), transparent 60%)',
          padding: '64px 80px',
          color: '#F4F4F1',
          position: 'relative',
        }}
      >
        {/* Top — eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            fontFamily: 'sans-serif',
            fontSize: 18,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#8A8A95',
          }}
        >
          <div style={{ width: 56, height: 2, background: '#FF3D2E' }} />
          <div>MOTION · LED STUDIO · MUMBAI</div>
        </div>

        {/* Middle — headline */}
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
              fontFamily: 'sans-serif',
              fontWeight: 900,
              fontSize: 124,
              lineHeight: 1.0,
              letterSpacing: -4,
              color: '#F4F4F1',
              maxWidth: 1050,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '0 18px',
            }}
          >
            <span style={{ display: 'flex' }}>We make brands</span>
            <span style={{ display: 'flex', fontStyle: 'italic', fontWeight: 400, color: '#FF3D2E' }}>move.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: 'sans-serif',
              fontSize: 30,
              lineHeight: 1.4,
              color: 'rgba(244, 244, 241, 0.7)',
              maxWidth: 880,
              display: 'flex',
            }}
          >
            {site.tagline}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 900, color: '#F4F4F1', letterSpacing: 6 }}>
              <span style={{ display: 'flex' }}>WINGS</span>
              <span style={{ display: 'flex', color: '#FF3D2E', margin: '0 6px' }}>·</span>
              <span style={{ display: 'flex' }}>MEDIAA</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#FF3D2E',
                  display: 'flex',
                }}
              />
              <span style={{ display: 'flex' }}>{`LIVE · ${site.address.addressLocality.toUpperCase()}`}</span>
            </span>
            <span style={{ display: 'flex', color: '#F4F4F1' }}>{site.email}</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
