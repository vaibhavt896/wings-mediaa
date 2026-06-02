import { home } from '@/lib/content/home';

/**
 * The Shift — the after. "When the marketing matches the business."
 * Calm counterpoint to ProblemBeat. Lime-tinted ambient to mark the turn.
 */
export default function ShiftBeat() {
  const { shift } = home;
  return (
    <section
      aria-labelledby="shift-label"
      className="section border-t border-hair relative isolate overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 opacity-50"
        aria-hidden
        style={{
          background:
            'radial-gradient(50vmax 50vmax at 85% 30%, rgba(230,255,60,0.10), transparent 60%)',
        }}
      />
      <div className="container-page max-w-[1000px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span id="shift-label">{shift.eyebrow}</span>
        </div>

        <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.02] text-bone max-w-[18ch]">
          {shift.heading}
        </h2>

        <div className="mt-s8 flex flex-col gap-s5 max-w-[64ch]">
          {shift.paragraphs.map((p, i) => (
            <p key={i} className="text-body-l text-bone/80 leading-[1.65]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
