'use client';

import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    /** view-transition-name applied via inline style. Browsers without the API ignore it. */
    viewTransitionName?: string;
  };

/**
 * TransitionLink — wraps Next.js <Link> with the View Transitions API.
 * On supported browsers (Chrome 111+, Safari TP 2026), navigation is wrapped in
 * `document.startViewTransition` which snapshots the source DOM and animates from it.
 * On unsupported browsers, falls through to the native Link (which then triggers the
 * site-wide crimson color-flood from app/template.tsx).
 *
 * Pair this with `viewTransitionName` on both source AND destination elements so the
 * browser knows what to morph. Each name must be unique per page (slug-keyed for cases).
 */
const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { children, onClick, href, viewTransitionName, style, ...rest },
  ref
) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (typeof document === 'undefined') return;
    const startVT = (document as unknown as { startViewTransition?: (cb: () => void) => unknown })
      .startViewTransition;
    if (typeof startVT !== 'function') return; // fallback: native Link will handle navigation

    e.preventDefault();
    const target = typeof href === 'string' ? href : '';
    startVT.call(document, () => {
      router.push(target);
    });
  };

  const mergedStyle = viewTransitionName
    ? ({ ...style, viewTransitionName } as React.CSSProperties)
    : style;

  return (
    <Link ref={ref} href={href} onClick={handleClick} style={mergedStyle} {...rest}>
      {children}
    </Link>
  );
});

export default TransitionLink;
