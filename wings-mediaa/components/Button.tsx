'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Magnetic from './Magnetic';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  /** Disable the magnetic wrapper (useful inside dense forms). Default false. */
  noMagnet?: boolean;
  children: ReactNode;
  className?: string;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>;

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

const variantClass: Record<Variant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
};

/**
 * Button — primary/secondary/ghost. Magnetic on hover by default.
 * Accepts `href` to render as a Next.js <Link> (or <a> if external).
 * All buttons carry data-cur="link" so the global cursor swaps to the link state.
 */
const Button = forwardRef<HTMLElement, AnchorProps | ButtonProps>(function Button(
  props,
  ref
) {
  const { variant = 'primary', noMagnet = false, children, className, ...rest } = props;
  const classes = cn(variantClass[variant], className);

  let core: ReactNode;
  if ('href' in props && props.href) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    if (external || /^https?:\/\//.test(href) || href.startsWith('mailto:')) {
      core = (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          data-cur="link"
          className={classes}
          {...anchorRest}
        >
          {children}
        </a>
      );
    } else {
      core = (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          data-cur="link"
          className={classes}
          {...anchorRest}
        >
          {children}
        </Link>
      );
    }
  } else {
    const { type = 'button', ...buttonRest } = rest as ButtonProps;
    core = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        data-cur="link"
        className={classes}
        {...buttonRest}
      >
        {children}
      </button>
    );
  }

  if (noMagnet) return <>{core}</>;
  return <Magnetic>{core}</Magnetic>;
});

export default Button;
