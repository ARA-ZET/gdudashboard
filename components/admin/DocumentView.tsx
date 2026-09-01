'use client';
import Image from 'next/image';
import { site } from '@/lib/site';
import { defaultBusiness } from '@/lib/business';
import { money, lineTotal, type BusinessDoc, type BusinessSettings } from '@/lib/db';

/**
 * Print-ready A4 quote/invoice. Business + banking details come from Settings
 * (Firestore meta/business) with sensible fallbacks to lib/site.ts.
 * Wrapped in `.printable` so print CSS shows only this, sized to A4.
 */
export function DocumentView({ doc, business = {} }: { doc: BusinessDoc; business?: BusinessSettings }) {
  const isQuote = doc.kind === 'quote';
  const title = isQuote ? 'QUOTE' : 'INVOICE';
  const dateLabel = isQuote ? 'Valid until' : 'Due date';

  // Saved Settings (Firestore) override the built-in defaults.
  const b: BusinessSettings = { ...defaultBusiness, ...business };
  const name = b.name || site.name;
  const addressLines = b.addressLines
    || `${site.contact.address.street}, ${site.contact.address.area}, ${site.contact.address.postalCode}`;
  const phone = b.phone || site.contact.phone;
  const email = b.email || '';

  const hasBanking = !!(b.bankName || b.accountNumber || b.accountName);

  return (
    <div className="printable a4-sheet mx-auto bg-white text-ink shadow-card ring-1 ring-outline-variant/50 print:shadow-none print:ring-0">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-navy pb-6">
        <div>
          {/* `priority` matters here: a lazy image may still be unloaded when the
              print dialog opens, which prints the document with a blank logo. */}
          <Image src="/logo/gdulogo-long-dark.webp" alt={name} width={225} height={48} priority className="h-12 w-auto" />
          <div className="mt-4 whitespace-pre-line text-[12px] leading-relaxed text-ink-muted">
            {addressLines}
            {'\n'}{phone}{email ? ` · ${email}` : ''}
            {b.website ? `\n${b.website}` : ''}
            {b.regNo ? `\nReg: ${b.regNo}` : ''}
            {b.vatNo ? `  ·  VAT: ${b.vatNo}` : ''}
          </div>
        </div>
        <div className="text-right">
          <div className="font-serif text-3xl font-bold tracking-tight text-navy">{title}</div>
          <div className="mt-1 text-[14px] font-semibold text-gold-700">{doc.number}</div>
          <table className="mt-4 ml-auto text-[12px]">
            <tbody>
              <tr><td className="pr-3 text-ink-muted">Date</td><td className="text-right font-medium text-navy">{doc.date}</td></tr>
              {doc.dueDate && <tr><td className="pr-3 text-ink-muted">{dateLabel}</td><td className="text-right font-medium text-navy">{doc.dueDate}</td></tr>}
              <tr><td className="pr-3 text-ink-muted">Status</td><td className="text-right font-semibold uppercase text-navy">{doc.status}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill to */}
      <div className="mt-6">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{isQuote ? 'Prepared for' : 'Bill to'}</div>
        <div className="mt-1 font-serif text-lg font-bold text-navy">{doc.clientName}</div>
        {doc.clientAddress && <div className="whitespace-pre-line text-[13px] text-ink-muted">{doc.clientAddress}</div>}
        {doc.clientEmail && <div className="text-[13px] text-ink-muted">{doc.clientEmail}</div>}
      </div>

      {/* Items */}
      <table className="mt-6 w-full text-[13px]">
        <thead>
          <tr className="border-b border-outline-variant text-left text-[11px] uppercase tracking-wide text-ink-muted">
            <th className="py-2 font-semibold">Description</th>
            <th className="py-2 text-right font-semibold">Qty</th>
            <th className="py-2 text-right font-semibold">Unit price</th>
            <th className="py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {doc.items.map((it, i) => (
            <tr key={i} className="border-b border-outline-variant/50 align-top">
              <td className="py-3 pr-4 text-navy">{it.description}</td>
              <td className="py-3 text-right text-ink-muted">{it.qty}</td>
              <td className="py-3 text-right text-ink-muted">{money(it.unitPrice)}</td>
              <td className="py-3 text-right font-medium text-navy">{money(lineTotal(it))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-5 flex justify-end">
        <table className="w-64 text-[13px]">
          <tbody>
            <tr><td className="py-1 text-ink-muted">Subtotal</td><td className="py-1 text-right font-medium text-navy">{money(doc.subtotal)}</td></tr>
            <tr className="border-t-2 border-navy"><td className="py-2 text-[15px] font-bold text-navy">Total ({doc.currency})</td><td className="py-2 text-right text-[15px] font-bold text-navy">{money(doc.total)}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Banking + Notes */}
      {/* Unconditional two columns, never a `sm:` breakpoint. The sheet is always
          210mm wide, but Tailwind's responsive prefixes key off the viewport, so
          a breakpoint here would stack on a narrow screen while still printing
          side by side — the preview would stop matching the page. */}
      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-outline-variant/60 pt-5">
        {hasBanking ? (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Banking details</div>
            <table className="mt-2 text-[12px]">
              <tbody className="align-top">
                {b.bankName && <tr><td className="pr-3 text-ink-muted">Bank</td><td className="font-medium text-navy">{b.bankName}</td></tr>}
                {b.accountName && <tr><td className="pr-3 text-ink-muted">Account name</td><td className="font-medium text-navy">{b.accountName}</td></tr>}
                {b.accountNumber && <tr><td className="pr-3 text-ink-muted">Account no.</td><td className="font-medium text-navy">{b.accountNumber}</td></tr>}
                {b.branchCode && <tr><td className="pr-3 text-ink-muted">Branch code</td><td className="font-medium text-navy">{b.branchCode}</td></tr>}
                {b.accountType && <tr><td className="pr-3 text-ink-muted">Type</td><td className="font-medium text-navy">{b.accountType}</td></tr>}
                <tr><td className="pr-3 text-ink-muted">Reference</td><td className="font-medium text-navy">{doc.number}</td></tr>
              </tbody>
            </table>
          </div>
        ) : <div />}
        {doc.notes && (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Notes &amp; terms</div>
            <p className="mt-2 whitespace-pre-line text-[12px] leading-relaxed text-ink-muted">{doc.notes}</p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-outline-variant/60 pt-4 text-center text-[11px] text-ink-muted">
        Thank you for choosing {name}. {isQuote ? 'This quote is subject to our standard terms.' : 'Please use the invoice number as your payment reference.'}
      </div>

      {/* Developer credit — prints with the document, so the bare domain is
          spelled out rather than the full link target. */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-wide text-ink-muted">
        <span>Designed &amp; built by</span>
        <Image src={site.developer.logoDark} alt={site.developer.name} width={59} height={16} priority className="h-4 w-auto" />
        <span>{new URL(site.developer.url).hostname}</span>
      </div>
    </div>
  );
}
