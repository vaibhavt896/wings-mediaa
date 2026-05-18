'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Global error boundary. Catches runtime errors anywhere in the route tree.
 * Must be a client component per Next.js convention.
 *
 * On-brand layout: ink canvas (NOT lime — that's reserved for 404 only),
 * crimson accent rule, a reset button, and links back to safety.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[wings-mediaa] route error:', error);
  }, [error]);

  return (
    <section className="relative isolate min-h-screen bg-ink text-bone pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col">
      <div className="ambient-glow" aria-hidden />

      <div className="container-page flex-1 flex flex-col justify-center max-w-[900px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span className="block w-9 h-px bg-crimson" />
          <span>SOMETHING <span className="text-crimson">BROKE</span></span>
        </div>

        <h1
          className="font-display font-extrabold text-bone leading-[0.92] tracking-[-0.04em] max-w-[16ch]"
          style={{ fontSize: 'clamp(56px, 9vw, 144px)' }}
        >
          We hit a <span className="ital">snag.</span>
        </h1>

        <p className="mt-s7 max-w-[60ch] text-body-l text-bone/75 leading-[1.65]">
          That&apos;s on us. Try again, or head somewhere safe. If you keep landing here, write to{' '}
          <a
            href="mailto:hello@wingsmediaa.com"
            className="text-bone border-b border-mute hover:text-crimson hover:border-crimson transition-colors"
          >
            hello@wingsmediaa.com
          </a>{' '}
          and we&apos;ll dig in.
        </p>

        {error?.digest && (
          <div className="mt-s5 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
            ERROR · {error.digest}
          </div>
        )}

        <div className="mt-s8 flex flex-wrap items-center gap-s5">
          <button
            type="button"
            onClick={() => reset()}
            data-cur="link"
            className="btn btn-primary"
          >
            Try again →
          </button>
          <Link href="/" data-cur="link" className="btn btn-secondary">
            Take me home
          </Link>
          <Link href="/work" data-cur="link" className="btn btn-ghost">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
