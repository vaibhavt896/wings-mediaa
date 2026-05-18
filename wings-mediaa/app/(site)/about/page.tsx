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
    'Wings Mediaa is a 12-person motion-led studio in Mumbai with a wing in Delhi. We make brands move — in feeds, in funnels, on screen.',
  openGraph: {
    title: 'About · Wings Mediaa',
    description: 'A motion-led studio for D2C, brand and performance.',
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
