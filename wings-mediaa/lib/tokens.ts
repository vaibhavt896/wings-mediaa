/**
 * Wings Mediaa — typed design tokens.
 * Source of truth: handoff §02. Names match Figma + CSS vars + Tailwind keys.
 */

export const color = {
  ink: '#0A0A0F',
  ink2: '#15151C',
  bone: '#F4F4F1',
  bone2: '#E9E9E2',
  crimson: '#FF3D2E',
  crimson2: '#FF5547',
  lime: '#E6FF3C',
  mute: '#8A8A95',
  hair: '#1F1F26',
  hairL: '#D7D7D2',
  tintGlow: 'rgba(255,61,46,0.12)',
} as const;

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  overshoot: [0.34, 1.56, 0.64, 1] as const,
  slowEase: [0.65, 0, 0.35, 1] as const,
  outExpoCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outQuartCss: 'cubic-bezier(0.25, 1, 0.5, 1)',
  overshootCss: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  slowEaseCss: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

export const motion = {
  entrance: { distance: 32, duration: 0.8, stagger: 0.06 },
  hoverLift: { scale: 1.04, duration: 0.28 },
  magnetic: { radius: 120, coeff: 0.18 },
  maskReveal: { duration: 0.8 },
  marquee: { speedPxPerSec: 80 },
  pageTransition: { in: 0.7, out: 0.6 },
  cursor: { lerp: 0.16, dot: 8, halo: 36, label: 72 },
  countUp: { duration: 1.2 },
} as const;

export const breakpoint = {
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920,
} as const;

export type Color = keyof typeof color;
export type Ease = keyof typeof ease;
