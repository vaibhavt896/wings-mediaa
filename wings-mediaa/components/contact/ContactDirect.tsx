import Button from '@/components/Button';
import LiveClock from '@/components/LiveClock';

/**
 * Right column of /contact — direct paths: email, WhatsApp, location with
 * live clock, and the Calendly-style book-a-call link.
 */
export default function ContactDirect() {
  return (
    <aside aria-labelledby="direct-label" className="flex flex-col gap-s8">
      <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
        <span className="block w-9 h-px bg-crimson" />
        <span id="direct-label">DIRECT</span>
      </div>

      {/* Email + WhatsApp */}
      <div className="flex flex-col gap-s5">
        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute mb-s2">
            Email
          </div>
          <a
            href="mailto:contact@wingsmediaa.com"
            className="font-display font-bold text-d-m text-bone tracking-[-0.01em] hover:text-crimson border-b border-mute hover:border-crimson transition-colors duration-200 inline-block leading-[1.2]"
            data-cur="link"
          >
            contact@wingsmediaa.com
          </a>
          <p className="mt-s2 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
            For detailed briefs and partnerships.
          </p>
        </div>

        <div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute mb-s2">
            WhatsApp <span className="text-crimson normal-case tracking-[0.04em]">(fastest)</span>
          </div>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer noopener"
            className="font-display font-bold text-d-m text-bone tracking-[-0.01em] hover:text-crimson border-b border-mute hover:border-crimson transition-colors duration-200 inline-block leading-[1.2]"
            data-cur="link"
          >
            +91 99999 99999
          </a>
          <p className="mt-s2 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
            The quickest way to reach us. Usually a reply within a few hours.
          </p>
        </div>
      </div>

      {/* Call slot */}
      <div className="border-t border-hair pt-s7 flex flex-col gap-s4">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          OR · CALL
        </div>
        <p className="text-body-m text-bone/75 leading-[1.55] max-w-[40ch]">
          Prefer to talk? Reach us in working hours. The first conversation is free, direct, and
          zero-pressure.
        </p>
        <div>
          <Button variant="secondary" href="tel:+919999999999" external>
            +91 99999 99999
          </Button>
        </div>
      </div>

      {/* Location strip */}
      <div className="border-t border-hair pt-s7 flex flex-col gap-s3 font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
        <div className="flex items-center gap-s3">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-crimson" aria-hidden />
          <span>
            <LiveClock className="text-bone tabular-nums" /> · KANPUR
          </span>
        </div>
        <div className="text-mute normal-case tracking-[0.04em] max-w-[40ch]">
          Tilak Nagar, Kanpur, Uttar Pradesh. By appointment.
        </div>
        <div className="text-mute normal-case tracking-[0.04em] max-w-[40ch]">
          Working with brands across India.
        </div>
      </div>
    </aside>
  );
}
