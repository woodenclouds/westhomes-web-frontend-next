import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-base text-charcoal placeholder:text-muted/80 focus:border-wood focus:outline-none focus:ring-1 focus:ring-wood";

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
        className={`${fieldClass} min-h-28 resize-y ${className}`}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}

export function Select({
  label,
  id,
  error,
  hint,
  children,
  className = "",
  ...props
}: FieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {props.required ? <span className="text-error"> *</span> : null}
      </label>
      <select id={id} className={`${fieldClass} ${className}`} {...props}>
        {children}
      </select>
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
