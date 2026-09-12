import { home } from '@/lib/content/home';

/**
 * FAQ — straight answers. Native <details>/<summary> so it works without JS and
 * stays keyboard-accessible. The crimson marker rotates open via CSS.
 */
export default function FaqBeat() {
  const { faq } = home;
  return (
    <section
      aria-labelledby="faq-label"
      className="section border-t border-hair"
    >
      <div className="container-page max-w-[900px]">
        <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4 mb-s8">
          <span aria-hidden className="block w-9 h-px bg-crimson" />
          <span id="faq-label">{faq.eyebrow}</span>
        </div>

        <div className="flex flex-col">
          {faq.items.map((item, i) => (
            <details
              key={i}
              className="group border-t border-hair last:border-b py-s5"
            >
              <summary className="flex items-start justify-between gap-s5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-display font-bold text-d-m text-bone tracking-[-0.01em] leading-[1.2] group-hover:text-crimson transition-colors">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[18px] text-crimson shrink-0 mt-1 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-s5 max-w-[64ch] text-body-l text-bone/75 leading-[1.65]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
