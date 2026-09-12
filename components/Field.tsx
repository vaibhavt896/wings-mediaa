"use client";

import {
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  label: string;
  /** Optional helper / error text below the input. */
  hint?: string;
  /** Error state — flips underline + hint to crimson. */
  error?: boolean;
  className?: string;
}

type InputProps = BaseFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    as?: "input";
  };

type TextareaProps = BaseFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> & {
    as: "textarea";
  };

/**
 * Field — underline-only input/textarea per §05 component lib.
 * No rounded boxes. Floating mono label above. Underline grows to crimson on focus.
 * Accessible: every input has a real <label htmlFor=...>; aria-invalid on error.
 */
export default function Field(props: InputProps | TextareaProps) {
  const { label, hint, error, className } = props;
  const reactId = useId();
  const id = props.id ?? reactId;

  const wrapperClass = cn("flex flex-col gap-s2", className);
  const labelClass =
    "font-mono text-[11px] tracking-[0.16em] uppercase text-mute";
  const fieldClass = cn(
    "w-full bg-transparent border-0 border-b text-bone py-s3 text-body-l outline-none",
    "placeholder:text-mute placeholder:font-normal",
    "transition-colors duration-200",
    error
      ? "border-crimson focus:border-crimson"
      : "border-mute hover:border-bone/60 focus:border-crimson",
  );
  const hintClass = cn(
    "font-mono text-[11px] tracking-[0.14em] uppercase mt-s2",
    error ? "text-crimson" : "text-mute",
  );

  if (props.as === "textarea") {
    const {
      as,
      label: _l,
      hint: _h,
      error: _e,
      className: _c,
      ...rest
    } = props;
    return (
      <div className={wrapperClass}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <textarea
          id={id}
          aria-invalid={error || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          rows={4}
          {...rest}
          className={fieldClass}
        />
        {hint && (
          <span id={`${id}-hint`} className={hintClass}>
            {hint}
          </span>
        )}
      </div>
    );
  }

  const {
    as: _as,
    label: _l,
    hint: _h,
    error: _e,
    className: _c,
    type = "text",
    ...rest
  } = props;
  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={error || undefined}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...rest}
        className={fieldClass}
      />
      {hint && (
        <span id={`${id}-hint`} className={hintClass}>
          {hint}
        </span>
      )}
    </div>
  );
}
