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
  /** Location label. */
  location: 'KANPUR' | 'REMOTE';
  /** Key capability tags */
  deliverables?: string[];
  /** Badge label, e.g. DIRECTION or SQUAD · 01 */
  badge?: string;
}

export interface AIEnginePillar {
  tag: string;
  title: string;
  desc: string;
  metric: string;
}

export interface AboutContent {
  hero: {
    eyebrow: string;
    line: string;
    italicWord?: string;
    sub: string;
  };
  manifesto: string;
  aiEngine?: {
    eyebrow: string;
    title: string;
    italicWord?: string;
    intro: string;
    pillars: AIEnginePillar[];
  };
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
    sub: 'A hyper-fast, AI-powered agency of strategists, creatives, and growth technologists. Built to give ambitious brands actual results, dominant visibility, and measurable return.',
  },

  // Display XXL char-reveal manifesto pull
  manifesto:
    'Great work deserves to be seen. Closing that gap is the entire job.',

  aiEngine: {
    eyebrow: 'THE AI ADVANTAGE',
    title: 'Why we move 5x faster than traditional agencies.',
    italicWord: '5x faster',
    intro:
      'We do not use AI as a novelty or to generate generic text. We deploy proprietary AI-accelerated workflows across production, search intelligence, and conversion systems to eliminate bloated agency timelines and slash wasted ad spend.',
    pillars: [
      {
        tag: '01 · PRODUCTION SPEED',
        title: 'Hyper-Velocity Creative Engine',
        desc: 'Rapid-iteration video scripting, automated dynamic resizing, and AI-accelerated visual rendering. What takes traditional agencies 3 weeks to ship, we test and deploy within 48 hours.',
        metric: '48H Sprints',
      },
      {
        tag: '02 · NEXT-GEN SEARCH',
        title: 'Answer Engine Optimization (AEO)',
        desc: 'Consumers increasingly search on ChatGPT, Perplexity, and Google AI Overviews. We engineer your digital presence so AI engines cite and recommend your brand first when buyers ask for recommendations.',
        metric: 'AI-First Visibility',
      },
      {
        tag: '03 · AD PERFORMANCE',
        title: 'Predictive Creative & Audience Testing',
        desc: 'We use algorithmic testing to trial dozens of creative hooks and messaging angles simultaneously, identifying high-converting winners early and cutting cost-per-acquisition.',
        metric: '-35% Target CAC',
      },
      {
        tag: '04 · CONVERSION TECH',
        title: '24/7 Intelligent Customer Capture',
        desc: 'Automated WhatsApp routing and conversational qualification pipelines capture enquiries instantly. Your leads get handled in seconds, even while your competitors are asleep.',
        metric: '< 60s Lead Response',
      },
    ],
  },

  story: {
    eyebrow: 'WHY WE STARTED',
    paragraphs: [
      'Wings Mediaa began with a clear observation.',
      'Across Kanpur, exceptional businesses, jewellers, clinics, boutiques, restaurants, were being out-marketed by lesser ones. Not beaten on quality. Beaten on visibility. The brands that knew how to be seen were winning customers they had not earned.',
      'The slow agencies that claimed they could fix it sat in the metros, charging metro prices, moving at snail speed, and delivering vague reports instead of actual results.',
      'So we built the agency we wished existed: hyper-fast, AI-powered, and obsessed with actual results. Local, so the strategy fits your market. And directly accountable, so you work with senior strategists dedicated to your growth.',
    ],
  },

  team: [
    {
      name: 'Vaibhav Tiwari',
      role: 'Creative Director & Lead Strategist',
      bio: 'Vaibhav directs brand strategy and high-velocity creative across client accounts. He structured Wings Mediaa as a hyper-fast, AI-powered agency designed to deliver actual, measurable revenue growth without big-agency waste or junior handoffs.',
      accent: '#FF3D2E',
      location: 'KANPUR',
      deliverables: ['Brand Strategy', 'Creative Direction', 'Growth Architecture'],
      badge: 'DIRECTION',
    },
    {
      name: 'Creative & Production',
      role: 'Viral Video · Motion Reels · Copywriting',
      bio: 'Our high-velocity production squad moves at hyper-speed across every touchpoint: viral video scripts, high-impact visuals, and brand voice designed for maximum audience retention and conversion.',
      accent: '#FF8C42',
      location: 'KANPUR',
      deliverables: ['Viral Reels & Video', 'Ad Creatives', 'Brand Voice & Scripts'],
      badge: 'SQUAD · 01',
    },
    {
      name: 'Growth & Performance',
      role: 'Meta & Google Ads · AEO & SEO · Funnels',
      bio: 'Data-informed media buyers and search strategists focused on turning attention into paying customers with relentless testing, tracking, and customer acquisition cost (CAC) reduction.',
      accent: '#4ECDC4',
      location: 'KANPUR',
      deliverables: ['Paid Acquisition', 'AEO Search', 'Funnel Optimization'],
      badge: 'SQUAD · 02',
    },
    {
      name: 'Technology & Systems',
      role: 'Conversion Sites · WhatsApp AI · Automation',
      bio: 'Engineers building sub-second websites and automated lead-routing pipelines. We ensure every lead captured from ads is qualified, tracked, and nurtured automatically 24/7.',
      accent: '#8B5CF6',
      location: 'KANPUR',
      deliverables: ['Conversion Sites', 'WhatsApp AI Bots', 'CRM Pipelines'],
      badge: 'SQUAD · 03',
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
    secondary: { label: 'Explore services →', href: '/services' },
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
