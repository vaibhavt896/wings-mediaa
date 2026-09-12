'use client';

import dynamic from 'next/dynamic';
import type { DemoKey } from '@/lib/content/services';

/**
 * DemoSwitch — picks the right demo component for a service.
 * Each demo is dynamically imported with no SSR, since they all rely on ScrollTrigger
 * + browser-only APIs. Static skeleton (a hairlined h-screen box) holds layout space
 * during the brief load while the chunk arrives.
 */

const PerformanceDemo = dynamic(() => import('./demos/PerformanceDemo'), { ssr: false, loading: () => <DemoSkeleton /> });
const SocialDemo = dynamic(() => import('./demos/SocialDemo'), { ssr: false, loading: () => <DemoSkeleton /> });
const BrandingDemo = dynamic(() => import('./demos/BrandingDemo'), { ssr: false, loading: () => <DemoSkeleton light /> });
const WebMotionDemo = dynamic(() => import('./demos/WebMotionDemo'), { ssr: false, loading: () => <DemoSkeleton /> });
const SeoDemo = dynamic(() => import('./demos/SeoDemo'), { ssr: false, loading: () => <DemoSkeleton /> });

export default function DemoSwitch({ demoKey }: { demoKey: DemoKey }) {
  switch (demoKey) {
    case 'performance':
      return <PerformanceDemo />;
    case 'social':
      return <SocialDemo />;
    case 'branding':
      return <BrandingDemo />;
    case 'web-motion':
      return <WebMotionDemo />;
    case 'seo':
      return <SeoDemo />;
  }
}

function DemoSkeleton({ light }: { light?: boolean }) {
  return (
    <div
      className={`relative h-screen border-y overflow-hidden ${
        light ? 'bg-bone border-hair-l' : 'bg-ink border-hair'
      }`}
      aria-hidden
    >
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
            light ? 'text-ink/40' : 'text-mute'
          }`}
        >
          LOADING DEMO…
        </span>
      </div>
    </div>
  );
}
