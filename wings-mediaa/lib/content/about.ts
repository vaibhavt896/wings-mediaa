/**
 * About page content. Calmest register on the site — editorial pacing.
 */

export interface TeamMember {
  name: string;
  role: string;
  /** Short bio, 1–2 sentences. */
  bio: string;
  /** Optional portrait image path. Falls back to a tone-on-tone gradient. */
  portrait?: string;
  /** Accent hex for the portrait fallback gradient. */
  accent: string;
  /** Studio location label. */
  location: 'KANPUR' | 'REMOTE';
}

export interface AboutContent {
  hero: {
    eyebrow: string;
    line: string;
    italicWord?: string;
    sub: string;
  };
  manifesto: string;
  story: {
    eyebrow: string;
    paragraphs: string[];
  };
  team: TeamMember[];
  press: string[];
  careers: {
    eyebrow: string;
    headline: string;
    italicWord?: string;
    blurb: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  locations: Array<{ city: string; tz: string; address?: string }>;
}

export const about: AboutContent = {
  hero: {
    eyebrow: 'ABOUT',
    line: 'We exist to make ambitious local brands impossible to ignore.',
    sub: 'Founder-led, AI-powered, and built for the way people actually choose a jeweller, a clinic, a boutique. The truth, told well, is the whole brand.',
  },

  // Display XXL char-reveal manifesto pull
  manifesto:
    'Great work deserves to be seen. Closing that gap is the entire job.',

  story: {
    eyebrow: 'WHY WE STARTED',
    paragraphs: [
      'Wings Mediaa began with a clear observation.',
      'Across Kanpur, exceptional businesses, jewellers, clinics, boutiques, restaurants, were being out-marketed by lesser ones. Not beaten on quality. Beaten on visibility. The brands that knew how to be seen were winning customers they had not earned.',
      'The studios that could fix it sat in the metros, charging metro prices and treating smaller brands as smaller accounts.',
      'So we built the studio we wished existed: AI-powered, so the work is world-class without the world-class bill. Local, so the strategy actually fits the market. And founder-led, so you reach the person whose name is on your results.',
    ],
  },

  team: [
    {
      name: 'Vaibhav Tiwari',
      role: 'Founder',
      bio: 'Vaibhav built Wings Mediaa to bring AI-powered, studio-grade marketing to the brands that need it most: the local businesses building real things. He leads strategy, builds the websites, and stays personally accountable for every client’s growth. Work with Wings Mediaa and you work directly with him.',
      accent: '#FF3D2E',
      location: 'KANPUR',
    },
  ],

  press: [
    'Visibility is the gap, and it is fixable',
    'Premium is in the details',
    'Honesty is the strategy',
    'AI is the unfair advantage',
    'We win when you win',
  ],

  careers: {
    eyebrow: 'START',
    headline: 'Let us build something the whole city notices.',
    italicWord: 'notices.',
    blurb:
      'We take on a limited number of brands at a time. If you are serious about how yours is seen, the first conversation is free, direct, and zero-pressure.',
    primary: { label: 'Start your project →', href: '/contact' },
    secondary: { label: 'See the work →', href: '/work' },
  },

  locations: [
    {
      city: 'KANPUR',
      tz: 'Asia/Kolkata',
      address: 'Tilak Nagar, Kanpur, Uttar Pradesh',
    },
    { city: 'INDIA', tz: 'Asia/Kolkata', address: 'Working with brands across the country.' },
  ],
};
