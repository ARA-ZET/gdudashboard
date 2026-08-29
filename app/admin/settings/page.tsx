'use client';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { Button, Card, Field, Input, Textarea } from '@/components/admin/ui';
import { Icon } from '@/components/Icon';
import { subscribeBusiness, saveBusiness, type BusinessSettings } from '@/lib/db';
import { defaultBusiness } from '@/lib/business';

export default function SettingsPage() {
  const [form, setForm] = useState<BusinessSettings>({});
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => subscribeBusiness((b) => {
    // Prefill with real defaults; any saved values take precedence.
    setForm((prev) => (loaded ? prev : { ...defaultBusiness, ...b }));
    setLoaded(true);
  }), [loaded]);

  const set = (k: keyof BusinessSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value })); setSaved(false);
  };

  async function save() {
    setBusy(true);
    try { await saveBusiness(form); setSaved(true); } finally { setBusy(false); }
  }

  return (
    <AdminShell
      title="Settings"
      actions={<Button variant="gold" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save settings'}</Button>}
    >
      {!loaded ? (
        <p className="text-ink-muted">Loading…</p>
      ) : (
        <div className="max-w-3xl space-y-6">
          <p className="text-[13px] text-ink-muted">
            These details appear on every quote and invoice. Fill them in once — you can update them anytime.
          </p>

          <Card className="p-6">
            <h3 className="mb-4 font-serif text-base font-bold text-navy">Business details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Field label="Business name" hint="Defaults to “Golden Diamond Upholstery” if left blank."><Input value={form.name ?? ''} onChange={set('name')} placeholder="Golden Diamond Upholstery" /></Field></div>
              <div className="sm:col-span-2"><Field label="Address"><Textarea rows={2} value={form.addressLines ?? ''} onChange={set('addressLines')} placeholder="45 Bree Street, Cape Town CBD, 8001" /></Field></div>
              <Field label="Phone"><Input value={form.phone ?? ''} onChange={set('phone')} placeholder="+27 21 555 0199" /></Field>
              <Field label="Email"><Input value={form.email ?? ''} onChange={set('email')} placeholder="hello@goldendiamond.co.za" /></Field>
              <Field label="Website"><Input value={form.website ?? ''} onChange={set('website')} placeholder="goldendiamond.co.za" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Company reg. no."><Input value={form.regNo ?? ''} onChange={set('regNo')} placeholder="2024/123456/07" /></Field>
                <Field label="VAT no. (optional)"><Input value={form.vatNo ?? ''} onChange={set('vatNo')} placeholder="—" /></Field>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-1 font-serif text-base font-bold text-navy">Banking details</h3>
            <p className="mb-4 text-[12px] text-ink-muted">Shown on invoices (and quotes) so clients can pay you. The document number is used as the payment reference.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Bank"><Input value={form.bankName ?? ''} onChange={set('bankName')} placeholder="First National Bank" /></Field>
              <Field label="Account name"><Input value={form.accountName ?? ''} onChange={set('accountName')} placeholder="Golden Diamond Upholstery" /></Field>
              <Field label="Account number"><Input value={form.accountNumber ?? ''} onChange={set('accountNumber')} placeholder="62000000000" /></Field>
              <Field label="Branch code"><Input value={form.branchCode ?? ''} onChange={set('branchCode')} placeholder="250655" /></Field>
              <Field label="Account type"><Input value={form.accountType ?? ''} onChange={set('accountType')} placeholder="Business Cheque" /></Field>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-1 font-serif text-base font-bold text-navy">Default terms</h3>
            <p className="mb-4 text-[12px] text-ink-muted">Prefilled into the notes/terms of every new quote & invoice (you can still edit per document).</p>
            <Field label="Default notes / terms">
              <Textarea rows={3} value={form.paymentTerms ?? ''} onChange={set('paymentTerms')} placeholder="50% deposit to confirm. Balance due on completion. Lead time 1–3 weeks." />
            </Field>
          </Card>

          <div className="flex items-center gap-3">
            <Button variant="gold" onClick={save} disabled={busy}><Icon name="check" className="h-4 w-4" /> {busy ? 'Saving…' : 'Save settings'}</Button>
            {saved && <span className="text-[13px] font-medium text-emerald-700">Saved ✓</span>}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
