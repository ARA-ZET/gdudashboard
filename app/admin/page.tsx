'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { Card, LinkButton, StatusBadge } from '@/components/admin/ui';
import { Icon } from '@/components/Icon';
import { subscribeDocs, subscribeClients, money, type BusinessDoc, type Client } from '@/lib/db';

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<BusinessDoc[]>([]);
  const [quotes, setQuotes] = useState<BusinessDoc[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const u1 = subscribeDocs('invoice', setInvoices);
    const u2 = subscribeDocs('quote', setQuotes);
    const u3 = subscribeClients(setClients);
    return () => { u1(); u2(); u3(); };
  }, []);

  const stats = useMemo(() => {
    const ym = new Date().toISOString().slice(0, 7);
    const outstanding = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.total, 0);
    const paidThisMonth = invoices.filter((i) => i.status === 'paid' && (i.paidAt || '').slice(0, 7) === ym).reduce((s, i) => s + i.total, 0);
    const openQuotes = quotes.filter((q) => q.status === 'draft' || q.status === 'sent').length;
    return { outstanding, paidThisMonth, openQuotes };
  }, [invoices, quotes]);

  const recent = useMemo(
    () => [...invoices, ...quotes]
      .sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
      .slice(0, 6),
    [invoices, quotes],
  );

  const cards = [
    { label: 'Outstanding', value: money(stats.outstanding), sub: `${invoices.filter((i) => i.status !== 'paid').length} unpaid invoice(s)`, icon: 'verified' as const },
    { label: 'Paid this month', value: money(stats.paidThisMonth), sub: 'Invoices marked paid', icon: 'check' as const },
    { label: 'Open quotes', value: String(stats.openQuotes), sub: 'Draft or sent', icon: 'layers' as const },
    { label: 'Clients', value: String(clients.length), sub: 'On file', icon: 'crown' as const },
  ];

  return (
    <AdminShell
      title="Dashboard"
      actions={
        <>
          <LinkButton href="/admin/quotes/new" variant="outline"><Icon name="plus" className="h-4 w-4" /> Quote</LinkButton>
          <LinkButton href="/admin/invoices/new" variant="gold"><Icon name="plus" className="h-4 w-4" /> Invoice</LinkButton>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-ink-muted">{c.label}</span>
              <span className="grid h-9 w-9 place-items-center rounded-md bg-navy text-gold"><Icon name={c.icon} className="h-5 w-5" /></span>
            </div>
            <div className="mt-3 font-serif text-xl font-bold text-navy">{c.value}</div>
            <div className="mt-0.5 text-[11px] text-ink-muted">{c.sub}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-base font-bold text-navy">Recent activity</h2>
          <Link href="/admin/invoices" className="text-[12px] font-semibold text-navy hover:text-gold-700">All invoices →</Link>
        </div>
        {recent.length === 0 ? (
          <Card className="p-8 text-center text-ink-muted">
            Nothing yet. Start by <Link href="/admin/clients" className="font-semibold text-navy underline decoration-gold">adding a client</Link>, then create a quote or invoice.
          </Card>
        ) : (
          <Card className="divide-y divide-outline-variant/50">
            {recent.map((d) => (
              <Link key={`${d.kind}-${d.id}`} href={`/admin/${d.kind}s/${d.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-dim/50">
                <span className={`grid h-9 w-9 place-items-center rounded-md ${d.kind === 'invoice' ? 'bg-navy text-gold' : 'bg-surface-container text-navy'}`}>
                  <Icon name={d.kind === 'invoice' ? 'verified' : 'layers'} className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-navy">{d.number} · {d.clientName}</div>
                  <div className="text-[11px] capitalize text-ink-muted">{d.kind} · {d.date}</div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-navy">{money(d.total, d.currency)}</span>
                  <StatusBadge status={d.status} />
                </div>
              </Link>
            ))}
          </Card>
        )}
      </div>
    </AdminShell>
  );
}
