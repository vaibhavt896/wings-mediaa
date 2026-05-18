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
  /** Mumbai or Delhi. */
  location: 'MUMBAI' | 'DELHI' | 'REMOTE';
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
    eyebrow: 'PART 02 — WHO WE ARE',
    line: 'A studio for the brief that says “make it move.”',
    sub: 'Wings Mediaa is a 12-person motion-led studio based in Mumbai with a small wing in Delhi. We work with founders, CMOs and product teams who treat attention like a craft, not a budget line.',
  },

  // Display XXL char-reveal manifesto pull
  manifesto:
    'Attention is the only currency that compounds. We help brands earn it without spending it twice.',

  story: {
    eyebrow: 'THE STORY',
    paragraphs: [
      'Wings Mediaa started in a one-room office in Bandra in 2022 with a single belief — that India’s creative agencies were leaving the most valuable thing on the table: the feeling a brand can give you in fifteen seconds.',
      'We didn’t want to be a content shop, a media agency, or a brand consultancy. We wanted to be the studio you call when the brief says “make it move” — and you mean it about feeds, funnels, and the page itself.',
      'Four years later, we’re still a small studio. The team is twelve people. We pick four to six clients a quarter. We say “no” to retainers that don’t come with a real creative mandate. The work has paid for itself by being unmissable.',
    ],
  },

  team: [
    {
      name: 'Vaibhav Tiwari',
      role: 'Founder · Creative Direction',
      bio: 'Spent six years writing brand films before founding Wings Mediaa. Leads brand and the studio’s creative point of view.',
      accent: '#FF3D2E',
      location: 'MUMBAI',
    },
    {
      name: 'Priya Menon',
      role: 'Performance Lead',
      bio: 'Built the performance arm. 18 D2C launches in the last 24 months. Treats every ad like a short film.',
      accent: '#E6FF3C',
      location: 'MUMBAI',
    },
    {
      name: 'Aditya Devarajan',
      role: 'Director · Film',
      bio: 'Directs the studio’s commercial and brand-film output. Came up shooting documentary in Kerala.',
      accent: '#FF884F',
      location: 'MUMBAI',
    },
    {
      name: 'Rhea Choudhury',
      role: 'Editor · Post',
      bio: 'Cuts every piece of film the studio ships. Worked at three production houses before joining in 2024.',
      accent: '#15151C',
      location: 'MUMBAI',
    },
    {
      name: 'Kabir Iyer',
      role: 'Cinematographer',
      bio: 'Shoots brand films and commercials. Two-time CSSDA-cited DP. Based in Delhi, ships everywhere.',
      accent: '#8A8A95',
      location: 'DELHI',
    },
    {
      name: 'Mira Shenoy',
      role: 'Copy · Strategy',
      bio: 'Writes the studio’s scripts, taglines and tone-of-voice systems. Ex-Ogilvy.',
      accent: '#FF3D2E',
      location: 'MUMBAI',
    },
    {
      name: 'Parvati Subramaniam',
      role: 'Director · Brand',
      bio: 'Leads the branding practice. Identity systems for D2C, tech, hospitality.',
      accent: '#FF884F',
      location: 'MUMBAI',
    },
    {
      name: 'Nikhil Bhattacharya',
      role: 'Engineering · Motion',
      bio: 'Builds the studio’s web and WebGL work. The reason this page loads under two seconds.',
      accent: '#E6FF3C',
      location: 'REMOTE',
    },
  ],

  press: [
    'Awwwards Site of the Day · Mar 2026',
    'CSSDA Best of the Month · Q4 2025',
    'Brand New “Noted” · Sep 2025',
    'Type Directors Club Selection · 2026',
    'IT’S NICE THAT — Featured · Jan 2026',
  ],

  careers: {
    eyebrow: 'CAREERS',
    headline: 'We’re hiring.',
    italicWord: 'hiring.',
    blurb:
      'We’re always reading résumés from people who treat the craft like a religion. Open roles get posted at the link below; speculative applications go straight to the founder.',
    primary: { label: 'See open roles →', href: 'mailto:careers@wingsmediaa.com?subject=Wings%20Mediaa%20%E2%80%94%20Careers' },
    secondary: { label: 'Speculative →', href: 'mailto:hello@wingsmediaa.com?subject=Speculative%20application' },
  },

  locations: [
    {
      city: 'MUMBAI',
      tz: 'Asia/Kolkata',
      address: 'Studio A · 3rd floor · Bandra West · Mumbai 400050',
    },
    { city: 'DELHI', tz: 'Asia/Kolkata', address: 'C-103 · DLF Phase 2 · Gurugram 122002' },
  ],
};
