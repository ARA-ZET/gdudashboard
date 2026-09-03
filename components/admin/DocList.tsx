'use client';
import { useEffect, useState } from 'react';
import { AdminShell } from './AdminShell';
import { Card, EmptyState, Input, LinkButton, StatusBadge } from './ui';
import { Icon } from '@/components/Icon';
import { subscribeDocs, money, type BusinessDoc } from '@/lib/db';
import Link from 'next/link';

export function DocList({ kind }: { kind: 'quote' | 'invoice' }) {
  const [docs, setDocs] = useState<BusinessDoc[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const label = kind === 'quote' ? 'Quote' : 'Invoice';

  useEffect(() => subscribeDocs(kind, (d) => { setDocs(d); setLoaded(true); }), [kind]);

  const filtered = docs.filter((d) =>
    [d.number, d.clientName, d.status].join(' ').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminShell title={`${label}s`} actions={<LinkButton href={`/${kind}s/new`} variant="gold"><Icon name="plus" className="h-4 w-4" /> New {kind}</LinkButton>}>
      <div className="mb-4 max-w-sm">
        <Input placeholder={`Search ${kind}s…`} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {!loaded ? (
        <p className="text-ink-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={docs.length === 0 ? `No ${kind}s yet` : 'No matches'}
          hint={docs.length === 0 ? `Create your first ${kind} to get started.` : 'Try a different search.'}
          action={docs.length === 0 ? <LinkButton href={`/${kind}s/new`} variant="gold"><Icon name="plus" className="h-4 w-4" /> New {kind}</LinkButton> : undefined}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-outline-variant/60 bg-surface-dim text-[11px] uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Number</th>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 text-right font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {filtered.map((d) => (
                  <tr key={d.id} className="cursor-pointer hover:bg-surface-dim/50">
                    <td className="px-4 py-3"><Link href={`/${kind}s/${d.id}`} className="font-semibold text-navy hover:text-gold-700">{d.number}</Link></td>
                    <td className="px-4 py-3 text-navy">{d.clientName}</td>
                    <td className="px-4 py-3 text-ink-muted">{d.date}</td>
                    <td className="px-4 py-3 text-right font-semibold text-navy">{money(d.total, d.currency)}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AdminShell>
  );
}
