'use client';
import { useRef, useState } from 'react';
import { site } from '@/lib/site';
import { Icon } from './Icon';
import { WhatsAppLink } from './WhatsAppButton';

const serviceOptions = [
  'Reupholstery', 'Upholstery repair', 'Headboards & beds', 'Loose covers',
  'Antique / heritage restoration', 'Outdoor & patio', 'Custom furniture',
  'Commercial / contract', 'Not sure yet',
];

/**
 * Nothing a human types can beat this: the form has six fields to read and
 * fill. Kept deliberately low because a lost real lead costs far more than a
 * junk row costs.
 */
const MIN_FILL_MS = 1500;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'fallback'>('idle');
  // Honeypot: off-screen, unlabelled, skipped by keyboard and screen readers,
  // so only a bot filling every input it finds will put anything in it. Held in
  // a ref rather than form state so its value can never reach the payload.
  const honeypot = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', property: 'Residential', message: '' });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Show the normal thank-you rather than an error, so a bot cannot learn
    // which submissions were rejected and adapt.
    const trapped = Boolean(honeypot.current?.value);
    const tooFast = Date.now() - mountedAt.current < MIN_FILL_MS;
    if (trapped || tooFast) {
      setStatus('done');
      return;
    }

    setStatus('submitting');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    // Firestore is the record of the lead; the email is only a notification.
    // Writing here first means a lead survives any email misconfiguration, and
    // it shows up in the admin either way.
    let stored = false;
    try {
      // Imported here, not at module scope: the Firebase SDK is ~170KB and this
      // is the page most mobile visitors convert on. Loading it only when
      // someone actually submits keeps it out of the initial bundle.
      const { createLead } = await import('@/lib/db');
      await createLead({ ...form, pageUrl });
      stored = true;
    } catch (err) {
      console.error('[quote] could not save lead', err);
    }

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pageUrl, stored }),
      });
    } catch {
      // Notification only — the lead is already saved.
    }

    // If neither path worked the customer still needs a way through, so the
    // success panel always offers phone and WhatsApp.
    setStatus(stored ? 'done' : 'fallback');
  }

  if (status === 'done' || status === 'fallback') {
    const failed = status === 'fallback';
    return (
      <div className="card p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-navy">
          <Icon name={failed ? 'phone' : 'check'} className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-h3">
          {failed ? 'Please reach us directly' : `Thank you, ${form.name.split(' ')[0] || 'there'}!`}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          {failed
            ? 'We could not submit your request just now. Call or WhatsApp us and we will help you straight away.'
            : 'We’ve received your request and will be in touch shortly. For a faster response, reach us directly:'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href={`tel:${site.contact.phoneHref}`} className="btn btn-primary"><Icon name="phone" className="h-4 w-4" /> Call us</a>
          <WhatsAppLink className="btn btn-whatsapp"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</WhatsAppLink>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-md border border-outline-variant bg-surface-white px-4 py-3 text-[15px] text-navy placeholder:text-ink-muted/60 transition-colors focus:border-navy focus:ring-2 focus:ring-gold/40 focus:outline-none';
  const labelCls = 'mb-1.5 block text-[13px] font-semibold text-navy';

  return (
    <form onSubmit={onSubmit} className="card relative p-7 md:p-9">
      {/* Honeypot. Clipped to a 1px box rather than display:none, which some
          bots skip. aria-hidden and tabIndex={-1} keep it away from screen
          readers and the keyboard, so no real visitor can reach it. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" name="company-website" type="text" ref={honeypot} tabIndex={-1} autoComplete="off" />
      </div>

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
        Tip: photos of your piece speed up your quote — send them to us on{' '}
        <WhatsAppLink className="font-semibold text-navy underline decoration-gold underline-offset-2">WhatsApp</WhatsAppLink>.
      </p>

      <button type="submit" disabled={status === 'submitting'} className="btn btn-gold mt-6 w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Request My Free Quote'} <Icon name="arrow" className="h-4 w-4" />
      </button>
    </form>
  );
}
