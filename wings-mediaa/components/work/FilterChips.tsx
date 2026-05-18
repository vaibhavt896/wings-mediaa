'use client';

import { cn } from '@/lib/utils';
import { verticalFilters, type Vertical } from '@/lib/content/cases';

export type FilterValue = 'all' | Vertical;

interface FilterChipsProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  /** Optional per-filter counts shown as a mono suffix. */
  counts?: Partial<Record<FilterValue, number>>;
  className?: string;
}

/**
 * FilterChips — pill-style filter row. Each chip is a button (real keyboard target).
 * Active chip = crimson background + ink text. Inactive = hairline border + bone text.
 */
export default function FilterChips({ value, onChange, counts, className }: FilterChipsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter work by vertical"
      className={cn('flex flex-wrap items-center gap-s3', className)}
    >
      {verticalFilters.map((f) => {
        const active = f.value === value;
        const count = counts?.[f.value];
        return (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={active}
            data-cur="link"
            onClick={() => onChange(f.value)}
            className={cn(
              'inline-flex items-center gap-s3 px-s5 py-s3 rounded-pill text-[12px] font-mono uppercase tracking-[0.16em]',
              'transition-colors duration-200',
              active
                ? 'bg-crimson text-ink'
                : 'border border-hair text-bone/80 hover:border-bone hover:text-bone'
            )}
          >
            {f.label}
            {count !== undefined && (
              <span
                className={cn(
                  'inline-block tabular-nums text-[10px]',
                  active ? 'text-ink/70' : 'text-mute'
                )}
              >
                {String(count).padStart(2, '0')}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
