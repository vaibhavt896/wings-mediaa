/**
 * Global loading state. Renders while a route segment is suspending (e.g. during
 * dynamic-import resolution or RSC streaming). Visible only fleetingly in production
 * because every route is statically generated; useful in dev + edge-case slow networks.
 *
 * Layout matches the hero rhythm so the loading state doesn't visually thrash
 * before the page paints.
 */
export default function Loading() {
  return (
    <section
      className="relative isolate min-h-screen pt-[140px] pb-s8 px-5 md:px-9 overflow-hidden flex flex-col justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="ambient-glow" aria-hidden />

      <div className="container-page flex flex-col gap-s7">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
          <span className="block w-9 h-px bg-crimson" />
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-crimson align-middle" aria-hidden />
          <span>LOADING…</span>
        </div>

        {/* Skeleton headline — three lines */}
        <div className="flex flex-col gap-s4 max-w-[18ch]">
          <div className="h-[clamp(48px,9vw,128px)] w-full rounded-r3 bg-ink-2/80" />
          <div className="h-[clamp(48px,9vw,128px)] w-[80%] rounded-r3 bg-ink-2/80" />
          <div className="h-[clamp(48px,9vw,128px)] w-[60%] rounded-r3 bg-ink-2/80" />
        </div>

        <div className="h-6 w-[60%] max-w-[640px] rounded-r2 bg-ink-2/60 mt-s7" />
        <div className="h-6 w-[40%] max-w-[480px] rounded-r2 bg-ink-2/60" />
      </div>

      <span className="sr-only">Loading page content</span>
    </section>
  );
}
