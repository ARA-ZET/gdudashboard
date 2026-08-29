'use client';
import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import type { DocStatus } from '@/lib/db';

const inputBase =
  'rounded-md border border-outline-variant bg-white px-3 py-2 text-[13px] text-navy placeholder:text-ink-muted/50 transition-colors focus:border-navy focus:ring-2 focus:ring-gold/40 focus:outline-none disabled:bg-surface-dim';

export const inputCls = `w-full ${inputBase}`;

/**
 * Fields default to full width, but a caller passing its own width (`w-40`)
 * must win. Both are plain utilities, so class order in the attribute does not
 * decide it — whichever Tailwind emits later in the stylesheet does. So drop
 * `w-full` when the caller supplied a width of its own.
 */
function fieldCls(className = '') {
  const hasWidth = /(^|\s)(w-|min-w-|max-w-)/.test(className);
  return `${hasWidth ? inputBase : inputCls} ${className}`.trim();
}

export function Field({ label, children, hint, required }: { label: string; children: ReactNode; hint?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-navy">{label}{required && <span className="text-gold-700"> *</span>}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink-muted">{hint}</span>}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldCls(props.className)} />;
}
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={fieldCls(props.className)} />;
}
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={fieldCls(props.className)} />;
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'gold' | 'outline' | 'danger' | 'ghost' };
export function Button({ variant = 'primary', className = '', ...rest }: BtnProps) {
  // Every variant carries a border (transparent where it isn't drawn) so filled
  // and outlined buttons are the same height and line up on a shared row.
  const v = {
    primary: 'border border-transparent bg-navy text-white hover:bg-navy-800',
    gold: 'border border-transparent bg-gold text-navy hover:bg-gold-400',
    outline: 'border border-outline-variant text-navy hover:bg-surface-dim',
    danger: 'border border-red-300 text-red-700 hover:bg-red-50',
    ghost: 'border border-transparent text-navy hover:bg-surface-dim',
  }[variant];
  return <button {...rest} className={`inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors disabled:opacity-50 ${v} ${className}`} />;
}

export function LinkButton({ href, variant = 'primary', className = '', children }: { href: string; variant?: 'primary' | 'gold' | 'outline' | 'ghost'; className?: string; children: ReactNode }) {
  // Matches Button exactly — the two are mixed on the same action rows.
  const v = {
    primary: 'border border-transparent bg-navy text-white hover:bg-navy-800',
    gold: 'border border-transparent bg-gold text-navy hover:bg-gold-400',
    outline: 'border border-outline-variant text-navy hover:bg-surface-dim',
    ghost: 'border border-transparent text-navy hover:bg-surface-dim',
  }[variant];
  return <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors ${v} ${className}`}>{children}</Link>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-outline-variant/60 bg-white shadow-card ${className}`}>{children}</div>;
}

const statusStyles: Record<string, string> = {
  draft: 'bg-surface-container text-ink-muted',
  sent: 'bg-blue-50 text-blue-700',
  accepted: 'bg-emerald-50 text-emerald-700',
  declined: 'bg-red-50 text-red-700',
  unpaid: 'bg-amber-50 text-amber-700',
  paid: 'bg-emerald-50 text-emerald-700',
};
export function StatusBadge({ status }: { status: DocStatus }) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[status] ?? 'bg-surface-container text-ink-muted'}`}>{status}</span>;
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-outline-variant bg-white/50 p-10 text-center">
      <p className="font-serif text-base font-semibold text-navy">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-sm text-[13px] text-ink-muted">{hint}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
