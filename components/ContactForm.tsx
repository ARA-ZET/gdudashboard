'use client';
import { useState } from 'react';
import { site } from '@/lib/site';
import { Icon } from './Icon';

const serviceOptions = [
  'Reupholstery', 'Upholstery repair', 'Headboards & beds', 'Loose covers',
  'Antique / heritage restoration', 'Outdoor & patio', 'Bespoke furniture',
  'Commercial / contract', 'Not sure yet',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', property: 'Residential', message: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailto = () => {
    const subject = encodeURIComponent(`Quote request — ${form.service || 'Upholstery'} (${form.property})`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProperty: ${form.property}\nService: ${form.service}\n\nDetails:\n${form.message}`,
    );
    return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('done');
    } catch {
      // Never lose the lead — fall through to the direct-contact fallback.
      setStatus('done');
    }
  }

  if (status === 'done') {
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-navy">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-h3">Thank you, {form.name.split(' ')[0] || 'there'}!</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          We’ve received your request and will be in touch shortly. For a faster response, reach us directly:
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href={`tel:${site.contact.phoneHref}`} className="btn btn-primary"><Icon name="phone" className="h-4 w-4" /> Call us</a>
          <a href={`https://wa.me/${site.contact.whatsappHref}`} className="btn btn-outline"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
          <a href={mailto()} className="btn btn-ghost">Send via email app</a>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-md border border-outline-variant bg-surface-white px-4 py-3 text-[15px] text-navy placeholder:text-ink-muted/60 transition-colors focus:border-navy focus:ring-2 focus:ring-gold/40 focus:outline-none';
  const labelCls = 'mb-1.5 block text-[13px] font-semibold text-navy';

  return (
    <form onSubmit={onSubmit} className="card p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Full name</label>
          <input id="name" required value={form.name} onChange={update('name')} className={inputCls} placeholder="Jane Adams" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone</label>
          <input id="phone" required value={form.phone} onChange={update('phone')} className={inputCls} placeholder="082 123 4567" inputMode="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" type="email" required value={form.email} onChange={update('email')} className={inputCls} placeholder="you@email.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>Service needed</label>
          <select id="service" value={form.service} onChange={update('service')} className={inputCls}>
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelCls}>Property type</legend>
        <div className="flex gap-3">
          {['Residential', 'Commercial'].map((p) => (
            <label key={p} className={`flex-1 cursor-pointer rounded-md border px-4 py-3 text-center text-[14px] font-medium transition-colors ${form.property === p ? 'border-navy bg-navy text-white' : 'border-outline-variant text-navy hover:border-navy'}`}>
              <input type="radio" name="property" value={p} checked={form.property === p} onChange={update('property')} className="sr-only" />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>Tell us about your project</label>
        <textarea id="message" rows={4} value={form.message} onChange={update('message')} className={inputCls} placeholder="e.g. Two-seater couch needs re-covering in velvet; some sagging in the seat cushions." />
      </div>

      <p className="mt-4 text-[12px] text-ink-muted">
        Tip: attaching photos of your piece speeds up your quote — you can email them to{' '}
        <a href={`mailto:${site.contact.email}`} className="font-semibold text-navy underline decoration-gold underline-offset-2">{site.contact.email}</a>.
      </p>

      <button type="submit" disabled={status === 'submitting'} className="btn btn-gold mt-6 w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Request My Free Quote'} <Icon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}
