import { home } from '@/lib/content/home';

/**
 * The Problem — sharp, confident. "Your competitor isn't better. Just better at being seen."
 * Static section (no scrub): a hard claim that earns a slow read.
 */
export default function ProblemBeat() {
  const { problem } = home;
  return (
    <section
      aria-labelledby="problem-label"
      className="section border-t border-hair"
    >
      <div className="container-page max-w-[1000px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s7">
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span id="problem-label">{problem.eyebrow}</span>
        </div>

        <h2 className="font-display font-bold text-d-l md:text-d-xl tracking-[-0.03em] leading-[1.02] text-bone max-w-[20ch]">
          {problem.heading}
        </h2>

        <div className="mt-s8 flex flex-col gap-s5 max-w-[64ch]">
          {problem.paragraphs.map((p, i) => (
            <p key={i} className="text-body-l text-bone/75 leading-[1.65]">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
