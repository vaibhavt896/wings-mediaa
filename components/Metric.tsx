import { cn } from '@/lib/utils';
import CountUp from './CountUp';

interface MetricProps {
  /** Numeric target for the count-up. */
  value: number;
  /** Number suffix in Crimson (e.g. '×', '%', 'M'). */
  suffix?: string;
  /** Optional prefix (e.g. '+'). */
  prefix?: string;
  /** Decimals override. */
  decimals?: number;
  /** Eyebrow above the number (e.g. 'RETURN ON AD SPEND'). */
  eyebrow?: string;
  /** Label/context below the number. */
  label: string;
  /** Display size — 'l' (default, ~62px) or 'xl' (huge homepage usage). */
  size?: 'l' | 'xl';
  className?: string;
}

/**
 * Metric block per §05 component library.
 * Mono eyebrow → big Display number with CountUp + crimson unit → mono label below.
 * Counts up once on scroll into view.
 */
export default function Metric({
  value,
  suffix,
  prefix,
  decimals,
  eyebrow,
  label,
  size = 'l',
  className,
}: MetricProps) {
  return (
    <div className={cn('flex flex-col gap-s3', className)}>
      {eyebrow && (
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
          {eyebrow}
        </div>
      )}
      <div
        className={cn(
          'font-display font-extrabold leading-none tracking-[-0.03em] text-bone',
          size === 'xl' ? 'text-d-xl' : 'text-d-l'
        )}
      >
        <CountUp to={value} suffix={suffix} prefix={prefix} decimals={decimals} />
      </div>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
        {label}
      </div>
    </div>
  );
}
