import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — 180×180. Used on iOS "Add to Home Screen."
 * Same composition as the favicon, slight padding so it doesn't crop on iOS rounded mask.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 110,
          letterSpacing: -6,
          lineHeight: 1,
        }}
      >
        W<span style={{ color: '#FF3D2E', margin: '0 2px' }}>·</span>M
      </div>
    ),
    { ...size }
  );
}
