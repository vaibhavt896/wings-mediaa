'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import Field from '@/components/Field';
import Button from '@/components/Button';
import { services } from '@/lib/content/services';
import { cn } from '@/lib/utils';

const BUDGETS = [
  { value: 'under-5L', label: 'Under ₹5L' },
  { value: '5-15L', label: '₹5L–₹15L' },
  { value: '15-50L', label: '₹15L–₹50L' },
  { value: '50L+', label: '₹50L+' },
  { value: 'tbd', label: 'Not sure yet' },
] as const;

const TIMELINES = [
  { value: 'this-quarter', label: 'This quarter' },
  { value: 'next-quarter', label: 'Next quarter' },
  { value: 'planning', label: 'Planning ahead' },
] as const;

type Budget = (typeof BUDGETS)[number]['value'];
type Timeline = (typeof TIMELINES)[number]['value'];

interface FormState {
  name: string;
  email: string;
  company: string;
  selectedServices: string[];
  budget: Budget | '';
  timeline: Timeline | '';
  brief: string;
}

interface Errors {
  name?: string;
  email?: string;
  brief?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Project-brief form. Underline-only fields, magnetic submit, multi-select
 * service chips, single-select budget + timeline chips. On submit (currently
 * simulated) the entire form is replaced by a Display L success line.
 *
 * Reads `?service=slug` from the URL to pre-select a service chip.
 */
export default function ContactForm() {
  const params = useSearchParams();
  const initialService = params.get('service');
  const successRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const [state, setState] = useState<FormState>(() => ({
    name: '',
    email: '',
    company: '',
    selectedServices: initialService && services.some((s) => s.slug === initialService) ? [initialService] : [],
    budget: '',
    timeline: '',
    brief: '',
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reveal success line when it appears
  useEffect(() => {
    if (!submitted) return;
    const el = successRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-success-reveal]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
      });
    }, el);
    return () => ctx.revert();
  }, [submitted]);

  const toggleService = (slug: string) => {
    setState((s) => ({
      ...s,
      selectedServices: s.selectedServices.includes(slug)
        ? s.selectedServices.filter((x) => x !== slug)
        : [...s.selectedServices, slug],
    }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!state.name.trim()) e.name = 'Your name, please.';
    if (!state.email.trim()) e.email = 'We need an email to reply.';
    else if (!EMAIL_RE.test(state.email.trim())) e.email = 'That email looks off. Double-check?';
    if (!state.brief.trim() || state.brief.trim().length < 10)
      e.brief = 'A few sentences. What do you want more of?';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      // Focus the first invalid field
      const first = (Object.keys(v) as Array<keyof Errors>)[0];
      const el = document.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }
    setSubmitting(true);
    // Simulate submission. Replace with `await fetch('/api/contact', ...)` in production.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div ref={successRef} className="flex flex-col gap-s6 py-s6">
        <div
          data-success-reveal
          className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4"
        >
          <span className="block w-9 h-px bg-crimson" />
          <span>BRIEF RECEIVED</span>
        </div>
        <p
          data-success-reveal
          className="font-display font-extrabold text-bone leading-[0.95] tracking-[-0.03em] max-w-[16ch]"
          style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
        >
          We&apos;ll be in your inbox in <span className="ital">24 hours.</span>
        </p>
        <p
          data-success-reveal
          className="max-w-[60ch] text-body-l text-bone/70 leading-[1.6]"
        >
          Vaibhav reads every brief himself, usually inside the working day, sometimes by
          the next morning. If you haven&apos;t heard from us in 48 hours, write directly to{' '}
          <a
            href="mailto:contact@wingsmediaa.com"
            className="text-bone hover:text-crimson border-b border-mute hover:border-crimson transition-colors"
          >
            contact@wingsmediaa.com
          </a>
          .
        </p>
        <div data-success-reveal className="flex flex-wrap gap-s5 mt-s4">
          <Button
            variant="primary"
            onClick={() => {
              setSubmitted(false);
              setState({
                name: '',
                email: '',
                company: '',
                selectedServices: [],
                budget: '',
                timeline: '',
                brief: '',
              });
              setErrors({});
            }}
          >
            Send another →
          </Button>
          <Button variant="ghost" href="/work">
            See the work
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-s8" noValidate>
      <div className="font-mono text-[12px] tracking-[0.22em] uppercase text-mute flex items-center gap-s4">
        <span className="block w-9 h-px bg-crimson" />
        <span>THE BRIEF</span>
      </div>

      {/* Identity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-s6">
        <Field
          label="Your name"
          name="name"
          autoComplete="name"
          value={state.name}
          onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
          error={!!errors.name}
          hint={errors.name}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="hello@yourbrand.com"
          value={state.email}
          onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
          error={!!errors.email}
          hint={errors.email}
          required
        />
      </div>

      <Field
        label="Company or brand"
        name="company"
        autoComplete="organization"
        value={state.company}
        onChange={(e) => setState((s) => ({ ...s, company: e.target.value }))}
      />

      {/* Service chips (multi-select) */}
      <fieldset className="flex flex-col gap-s4">
        <legend className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          What you need
          <span className="ml-s3 text-mute/80 normal-case tracking-[0.04em]">
            (pick all that apply)
          </span>
        </legend>
        <div role="group" className="flex flex-wrap gap-s3">
          {services.map((s) => {
            const active = state.selectedServices.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={active}
                data-cur="link"
                onClick={() => toggleService(s.slug)}
                className={cn(
                  'inline-flex items-center px-s5 py-s3 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200',
                  active
                    ? 'bg-crimson text-ink border border-crimson'
                    : 'border border-hair text-bone/80 hover:border-bone hover:text-bone'
                )}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Budget — single select */}
      <fieldset className="flex flex-col gap-s4">
        <legend className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          Budget range
        </legend>
        <div role="radiogroup" className="flex flex-wrap gap-s3">
          {BUDGETS.map((b) => {
            const active = state.budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                role="radio"
                aria-checked={active}
                data-cur="link"
                onClick={() => setState((s) => ({ ...s, budget: b.value }))}
                className={cn(
                  'inline-flex items-center px-s5 py-s3 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200',
                  active
                    ? 'bg-crimson text-ink border border-crimson'
                    : 'border border-hair text-bone/80 hover:border-bone hover:text-bone'
                )}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Timeline — single select */}
      <fieldset className="flex flex-col gap-s4">
        <legend className="font-mono text-[11px] tracking-[0.16em] uppercase text-mute">
          Timeline
        </legend>
        <div role="radiogroup" className="flex flex-wrap gap-s3">
          {TIMELINES.map((t) => {
            const active = state.timeline === t.value;
            return (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={active}
                data-cur="link"
                onClick={() => setState((s) => ({ ...s, timeline: t.value }))}
                className={cn(
                  'inline-flex items-center px-s5 py-s3 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200',
                  active
                    ? 'bg-crimson text-ink border border-crimson'
                    : 'border border-hair text-bone/80 hover:border-bone hover:text-bone'
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Brief textarea */}
      <Field
        as="textarea"
        label="Tell us about the project"
        name="brief"
        placeholder="What do you want more of? More walk-ins, more enquiries, a stronger brand?"
        value={state.brief}
        onChange={(e) => setState((s) => ({ ...s, brief: e.target.value }))}
        error={!!errors.brief}
        hint={errors.brief || 'A few sentences is plenty. We will come back with questions.'}
        required
      />

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-s5 pt-s2">
        <Button variant="primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send brief →'}
        </Button>
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-mute">
          We reply within 24 hours · contact@wingsmediaa.com
        </span>
      </div>
    </form>
  );
}
