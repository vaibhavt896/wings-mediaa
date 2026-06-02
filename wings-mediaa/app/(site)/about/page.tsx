import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import Manifesto from '@/components/about/Manifesto';
import Team from '@/components/about/Team';
import Story from '@/components/about/Story';
import Careers from '@/components/about/Careers';
import { about } from '@/lib/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'We make ambitious local brands impossible to ignore. Founder-led, AI-powered, honest marketing built for the way people actually choose. Kanpur.',
  openGraph: {
    title: 'About · Wings Mediaa',
    description: 'Founder-led, AI-powered studio for ambitious local brands. Kanpur.',
  },
};

/**
 * /about — the calmest register on the site (Principle: "restraint is also bold").
 *
 *   1  Hero           — slower stagger, no ambient glow, generous max-width
 *   2  Manifesto      — Display XXL char-reveal pull
 *   3  Team           — 8 leadership portraits, tone-on-tone gradient fallback
 *   4  Story          — generous editorial column + live locations strip
 *   5  Careers + Press — "We're hiring." + mono press marquee
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero hero={about.hero} />
      <Manifesto text={about.manifesto} />
      <Team members={about.team} />
      <Story story={about.story} locations={about.locations} />
      <Careers careers={about.careers} press={about.press} />
    </>
  );
}
