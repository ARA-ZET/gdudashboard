'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from './AdminShell';
import { Button, Card, Field, Input, Textarea, Select } from './ui';
import { Icon } from '@/components/Icon';
import {
  subscribeClients, subscribeBusiness, createBusinessDoc, updateBusinessDoc, money, lineTotal, computeTotals,
  todayISO, type Client, type BusinessDoc, type LineItem,
} from '@/lib/db';
import { commonLineItems } from '@/lib/business';

const blankItem = (): LineItem => ({ description: '', qty: 1, unitPrice: 0 });

export function DocumentEditor({ kind, existing }: { kind: 'quote' | 'invoice'; existing?: BusinessDoc }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState(existing?.clientId ?? '');
  const [date, setDate] = useState(existing?.date ?? todayISO());
  // Invoices default the due date to the creation date (today); still editable. Quotes leave "valid until" blank.
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? (kind === 'invoice' ? todayISO() : ''));
  const [items, setItems] = useState<LineItem[]>(existing?.items?.length ? existing.items : [blankItem()]);
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [busy, setBusy] = useState(false);

  useEffect(() => subscribeClients(setClients), []);
  useEffect(() => subscribeBusiness((b) => {
    if (!existing && b.paymentTerms) setNotes((n) => (n ? n : b.paymentTerms!));
  }), [existing]);

  const { subtotal, total } = useMemo(() => computeTotals(items), [items]);
  const isQuote = kind === 'quote';
  const label = isQuote ? 'Quote' : 'Invoice';

  const setItem = (i: number, patch: Partial<LineItem>) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const addItem = () => setItems((a) => [...a, blankItem()]);
  const addPreset = (desc: string) => { if (desc) setItems((a) => [...a, { description: desc, qty: 1, unitPrice: 0 }]); };
  const removeItem = (i: number) => setItems((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a));

  async function save() {
    const client = clients.find((c) => c.id === clientId);
    if (!client) { alert('Please choose a client.'); return; }
    const cleanItems = items.filter((it) => it.description.trim() || it.unitPrice > 0);
    if (cleanItems.length === 0) { alert('Add at least one line item.'); return; }
    setBusy(true);
    const payload = {
      clientId, clientName: client.name, clientEmail: client.email ?? '', clientAddress: client.address ?? '',
      date, dueDate, items: cleanItems, notes,
      status: existing?.status ?? (isQuote ? 'draft' : 'unpaid'),
      currency: 'ZAR',
    } as const;
    try {
      if (existing?.id) {
        await updateBusinessDoc(kind, existing.id, payload);
        router.push(`/admin/${kind}s/${existing.id}`);
      } else {
        const { id } = await createBusinessDoc(kind, payload as any);
        router.push(`/admin/${kind}s/${id}`);
      }
    } finally { setBusy(false); }
  }

  return (
    <AdminShell
      title={existing ? `Edit ${label} ${existing.number}` : `New ${label}`}
      actions={
        <>
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="gold" onClick={save} disabled={busy}>{busy ? 'Saving…' : `Save ${label.toLowerCase()}`}</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Client" required>
                <Select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                  <option value="">Select a client…</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
              <Field label={`${label} date`}>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
              <Field label={isQuote ? 'Valid until' : 'Due date'}>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </Field>
            </div>
            {clients.length === 0 && (
              <p className="mt-3 text-[13px] text-ink-muted">No clients yet — <a href="/admin/clients" className="font-semibold text-navy underline decoration-gold">add one first</a>.</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-serif text-lg font-bold text-navy">Line items</h3>
            <div className="space-y-3">
              {items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 items-start gap-2">
                  <div className="col-span-12 sm:col-span-6">
                    <Input list="gd-line-suggestions" placeholder="Description (e.g. Reupholstery — 2-seater sofa)" value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} />
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <Input type="number" min={0} step="1" placeholder="Qty" value={it.qty} onChange={(e) => setItem(i, { qty: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    <Input type="number" min={0} step="0.01" placeholder="Unit price" value={it.unitPrice} onChange={(e) => setItem(i, { unitPrice: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2 pt-2.5">
                    <span className="text-[13px] font-semibold text-navy">{money(lineTotal(it))}</span>
                    <button onClick={() => removeItem(i)} aria-label="Remove line" className="text-ink-muted hover:text-red-600"><Icon name="close" className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
            <datalist id="gd-line-suggestions">
              {commonLineItems.map((s) => <option key={s} value={s} />)}
            </datalist>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={addItem} className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy hover:text-gold-700">
                <Icon name="plus" className="h-4 w-4" /> Add line
              </button>
              <span className="text-outline-variant">·</span>
              <Select
                aria-label="Add a common service"
                value=""
                onChange={(e) => { addPreset(e.target.value); e.currentTarget.value = ''; }}
                className="w-auto max-w-xs"
              >
                <option value="">+ Add common service…</option>
                {commonLineItems.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          </Card>

          <Card className="p-6">
            <Field label="Notes / terms" hint="Shown on the printed document — e.g. deposit terms, lead time, banking details.">
              <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="50% deposit to confirm. Balance on completion. Lead time 1–3 weeks." />
            </Field>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24 p-6">
            <h3 className="font-serif text-lg font-bold text-navy">Summary</h3>
            <dl className="mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between"><dt className="text-ink-muted">Subtotal</dt><dd className="font-semibold text-navy">{money(subtotal)}</dd></div>
              <div className="flex justify-between border-t border-outline-variant/60 pt-3 text-[16px]"><dt className="font-bold text-navy">Total</dt><dd className="font-bold text-navy">{money(total)}</dd></div>
            </dl>
            <p className="mt-3 text-[12px] text-ink-muted">ZAR · VAT not applied</p>
            <Button variant="gold" onClick={save} disabled={busy} className="mt-5 w-full">{busy ? 'Saving…' : `Save ${label.toLowerCase()}`}</Button>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
