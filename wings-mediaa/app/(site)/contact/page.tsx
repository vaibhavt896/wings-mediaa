import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactDirect from '@/components/contact/ContactDirect';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Wings Mediaa. Send a brief or book a 25-minute call with one of the founders.',
};

/**
 * /contact — two-column layout. Left: project-brief form (reads ?service= from URL).
 * Right: direct paths (email, WhatsApp, calendar, location).
 *
 * The form needs `useSearchParams` which requires a Suspense boundary at build time —
 * if it isn't suspended Next.js bails out of static generation for the entire route.
 */
export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden">
        <div className="ambient-glow" aria-hidden />
        <div className="container-page">
          <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s5">
            <span className="block w-9 h-px bg-crimson" />
            <span>START · A PROJECT</span>
          </div>
          <h1 className="font-display font-extrabold text-bone leading-[0.92] tracking-[-0.04em] max-w-[16ch]" style={{ fontSize: 'clamp(56px, 9vw, 144px)' }}>
            Tell us about <span className="ital">the project.</span>
          </h1>
          <p className="mt-s7 max-w-[640px] text-body-l text-bone/80 leading-[1.6]">
            A few sentences is plenty. We&apos;ll come back with questions inside 24 hours — or
            you can book a 25-minute call directly.
          </p>
        </div>
      </section>

      {/* Two-column */}
      <section className="px-5 md:px-9 pb-s10 border-t border-hair pt-s9">
        <div className="container-page grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-s9 lg:gap-s10">
          {/* Form column */}
          <Suspense fallback={<FormSkeleton />}>
            <ContactForm />
          </Suspense>

          {/* Direct column */}
          <ContactDirect />
        </div>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-s7" aria-hidden>
      <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
        <span className="block w-9 h-px bg-crimson" />
        <span>THE BRIEF</span>
      </div>
      <div className="h-24 rounded-r3 border border-hair bg-ink-2" />
      <div className="h-24 rounded-r3 border border-hair bg-ink-2" />
      <div className="h-32 rounded-r3 border border-hair bg-ink-2" />
      <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">LOADING…</div>
    </div>
  );
}
