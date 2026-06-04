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
    line: 'We exist to make ambitious brands impossible to ignore.',
    sub: 'A focused studio of creatives, strategists, and technologists. AI-powered and built for the way people actually choose a jeweller, a clinic, a boutique. The truth, told well, is the whole brand.',
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
      role: 'Co-founder & Creative Director',
      bio: 'Vaibhav leads strategy and creative direction across every project. He built Wings Mediaa so ambitious local brands could access studio-grade marketing without metro-price waste. When you work with us, you work with the person whose name is on your results.',
      accent: '#FF3D2E',
      location: 'KANPUR',
    },
    {
      name: 'Creative & Content',
      role: 'Storytelling · Video · Copy',
      bio: 'Our creative team handles every touchpoint: scripts, visuals, social content, and brand voice. Studio-grade output built around what your specific audience actually responds to.',
      accent: '#FF8C42',
      location: 'KANPUR',
    },
    {
      name: 'Digital Strategy',
      role: 'Campaigns · SEO · Growth',
      bio: 'Data-informed strategy that turns attention into customers. We plan, execute, and optimise every campaign around one goal: measurable, real growth for your brand.',
      accent: '#4ECDC4',
      location: 'KANPUR',
    },
    {
      name: 'Web & Technology',
      role: 'Design · Build · Optimise',
      bio: 'Fast, beautiful websites built for conversion and local search. We design, develop, and maintain digital experiences that work as hard as the rest of your brand.',
      accent: '#8B5CF6',
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
