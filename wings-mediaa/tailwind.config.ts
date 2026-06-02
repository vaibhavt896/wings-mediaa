import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0F',
        'ink-2': '#15151C',
        bone: '#F4F4F1',
        'bone-2': '#E9E9E2',
        crimson: '#FF3D2E',
        'crimson-2': '#FF5547',
        lime: '#E6FF3C',
        mute: '#8A8A95',
        hair: '#1F1F26',
        'hair-l': '#D7D7D2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xxl: ['clamp(48px, 6.5vw, 112px)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'd-xl': ['clamp(48px, 6vw, 112px)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'd-l': ['clamp(36px, 4.5vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'd-m': ['clamp(22px, 2vw, 28px)', { lineHeight: '1.2' }],
        'body-l': ['clamp(18px, 1.4vw, 22px)', { lineHeight: '1.55' }],
        'body-m': ['clamp(15px, 1.1vw, 18px)', { lineHeight: '1.6' }],
        cap: ['14px', { lineHeight: '1.5' }],
        mono: ['13px', { lineHeight: '1.5', letterSpacing: '0.06em' }],
      },
      spacing: {
        s2: '4px',
        s3: '8px',
        s4: '12px',
        s5: '16px',
        s6: '24px',
        s7: '40px',
        s8: '64px',
        s9: '96px',
        s10: '160px',
      },
      borderRadius: {
        r2: '8px',
        r3: '14px',
        r4: '18px',
        pill: '9999px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slow-ease': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      maxWidth: {
        container: '1280px',
        prose: '60ch',
      },
    },
  },
  plugins: [],
};

export default config;
