export default function DevBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 px-4"
      style={{ height: '32px', background: '#F59E0B' }}
    >
      <span
        className="block w-1.5 h-1.5 rounded-full bg-ink animate-pulse flex-shrink-0"
        aria-hidden
      />
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink font-medium text-center">
        Under Development &middot; We are building something great &middot; Launching soon
      </p>
    </div>
  );
}
