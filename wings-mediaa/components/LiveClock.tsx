'use client';

import { useEffect, useState } from 'react';

/**
 * Live Kanpur clock — used by Nav, Footer, and the Contact page.
 * Formats as HH:MM:SS in Asia/Kolkata timezone.
 * Pauses for prefers-reduced-motion (still shows current time, just no per-second updates).
 */
export default function LiveClock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string>('--:--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} aria-label={`Kanpur local time ${time}`}>
      {time}
    </span>
  );
}
