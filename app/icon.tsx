import { ImageResponse } from 'next/og';

/**
 * Site favicon — 256×256 generated at build time.
 * Ink canvas + crimson "W" wordmark fragment.
 */
export const size = { width: 256, height: 256 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0F',
          color: '#F4F4F1',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 168,
          letterSpacing: -8,
          lineHeight: 1,
        }}
      >
        W<span style={{ color: '#FF3D2E', margin: '0 4px' }}>·</span>M
      </div>
    ),
    { ...size }
  );
}
