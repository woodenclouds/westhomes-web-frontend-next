import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full min-h-11 rounded-full border border-border bg-surface px-5 py-2.5 text-base text-charcoal placeholder:text-muted/80 focus:border-wood focus:outline-none focus:ring-1 focus:ring-wood";

type FieldProps = {
  label: string;
  id: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  id,
  error,
  hint,
  className = "",
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <input id={id} className={`${fieldClass} ${className}`} {...props} />
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}

export function Textarea({
  label,
  id,
  error,
  hint,
  className = "",
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <textarea
        id={id}
        className={`w-full min-h-28 rounded-2xl border border-border bg-surface px-4 py-3 text-base text-charcoal placeholder:text-muted/80 focus:border-wood focus:outline-none focus:ring-1 focus:ring-wood resize-y ${className}`}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}

const selectClass =
  "w-full h-11 min-h-11 appearance-none rounded-full border border-border bg-surface bg-[length:1rem] bg-[right_1.1rem_center] bg-no-repeat py-0 pl-5 pr-11 text-base leading-none text-charcoal focus:border-wood focus:outline-none focus:ring-1 focus:ring-wood";

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%236B635A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

export function Select({
  label,
  id,
  error,
  hint,
  children,
  className = "",
  style,
  ...props
}: FieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <select
        id={id}
        className={`${selectClass} ${className}`}
        style={{ backgroundImage: selectChevron, ...style }}
        {...props}
      >
        {children}
      </select>
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
