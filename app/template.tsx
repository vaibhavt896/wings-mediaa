'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

/**
 * Page-transition: color-flood.
 * Crimson panel scaleY 1 → 0 (top origin) on enter; 0 → 1 on exit.
 * Total: 700ms in, 600ms out, slow-ease cubic-bezier(0.65, 0, 0.35, 1).
 * Matches handoff §04 page-transition motion token.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname}>
        {children}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            transformOrigin: 'top',
            background: 'var(--crimson)',
            zIndex: 99,
            pointerEvents: 'none',
          }}
          aria-hidden
        />
      </motion.div>
    </AnimatePresence>
  );
}
