'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Reduced motion: bail to native scroll entirely.
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        // smoothTouch: false is the default — native scroll on mobile feels better
        wheelMultiplier: 1,
      }}
    >
      <ScrollRig>{children}</ScrollRig>
    </ReactLenis>
  );
}

/**
 * Hooks Lenis into GSAP's ticker so ScrollTrigger reads from Lenis time,
 * not browser scroll. Without this bridge, scrub animations stutter.
 */
function ScrollRig({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    const onTick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return <>{children}</>;
}
