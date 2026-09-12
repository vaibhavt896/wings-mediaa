import Image from 'next/image';
import { cn } from '@/lib/utils';

interface QuoteProps {
  text: string;
  name: string;
  role?: string;
  company?: string;
  /** Optional portrait — circular, Wings-graded. */
  portrait?: string;
  /** Pull this testimonial in lime instead of bone — reserved (one per case). */
  lime?: boolean;
  /** Size — 'l' (default) or 'xl' for hero use. */
  size?: 'l' | 'xl';
  className?: string;
}

/**
 * Quote / pull-quote per §05 component lib.
 * Italic editorial serif (Instrument Serif), mono attribution row beneath.
 * `lime` variant is the reserved one-of-one moment (one per case interior max).
 */
export default function Quote({
  text,
  name,
  role,
  company,
  portrait,
  lime,
  size = 'l',
  className,
}: QuoteProps) {
  return (
    <figure
      className={cn(
        'flex flex-col gap-s5',
        lime ? 'text-lime' : 'text-bone',
        className
      )}
    >
      <blockquote
        className={cn(
          'font-serif italic font-normal leading-[1.25] tracking-[-0.01em]',
          size === 'xl' ? 'text-d-l' : 'text-d-m md:text-[32px]'
        )}
      >
        <span className="text-crimson" aria-hidden>
          “
        </span>
        {text}
        <span className="text-crimson" aria-hidden>
          ”
        </span>
      </blockquote>

      <figcaption className="flex items-center gap-s4 mt-s2">
        {portrait && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-ink-2 shrink-0">
            <Image src={portrait} alt={name} fill sizes="48px" className="object-cover grayscale" />
          </div>
        )}
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute leading-[1.5]">
          <span className={lime ? 'text-lime' : 'text-bone'}>{name}</span>
          {role && <> · {role}</>}
          {company && <> · {company}</>}
        </div>
      </figcaption>
    </figure>
  );
}
