'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminShell } from './AdminShell';
import { DocumentEditor } from './DocumentEditor';
import { DocumentView } from './DocumentView';
import { A4Preview } from './A4Preview';
import { Button, Card, Select, StatusBadge } from './ui';
import { Icon } from '@/components/Icon';
import {
  getBusinessDoc, setStatus, deleteBusinessDoc, convertQuoteToInvoice, subscribeBusiness,
  type BusinessDoc, type DocStatus, type BusinessSettings,
} from '@/lib/db';

export function DocumentDetail({ kind, id }: { kind: 'quote' | 'invoice'; id: string }) {
  const router = useRouter();
  const [doc, setDoc] = useState<BusinessDoc | null | undefined>(undefined);
  const [business, setBusiness] = useState<BusinessSettings>({});
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const isQuote = kind === 'quote';

  async function load() { setDoc(await getBusinessDoc(kind, id)); }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [kind, id]);
  useEffect(() => subscribeBusiness(setBusiness), []);

  if (doc === undefined) {
    return <AdminShell title="Loading…"><p className="text-ink-muted">Loading…</p></AdminShell>;
  }
  if (doc === null) {
    return <AdminShell title="Not found"><p className="text-ink-muted">This {kind} could not be found. <Link href={`/${kind}s`} className="font-semibold text-navy underline">Back to {kind}s</Link>.</p></AdminShell>;
  }
  if (editing) {
    return <DocumentEditor kind={kind} existing={doc} />;
  }

  const quoteStatuses: DocStatus[] = ['draft', 'sent', 'accepted', 'declined'];

  async function changeStatus(status: DocStatus) { setBusy(true); await setStatus(kind, id, status); await load(); setBusy(false); }
  async function togglePaid() { setBusy(true); await setStatus(kind, id, doc!.status === 'paid' ? 'unpaid' : 'paid'); await load(); setBusy(false); }
  async function remove() {
    if (!confirm(`Delete ${doc!.number}? This cannot be undone.`)) return;
    await deleteBusinessDoc(kind, id); router.push(`/${kind}s`);
  }
  async function convert() {
    setBusy(true);
    const { id: invId } = await convertQuoteToInvoice(doc!);
    router.push(`/invoices/${invId}`);
  }

  return (
    <AdminShell
      title={`${isQuote ? 'Quote' : 'Invoice'} ${doc.number}`}
      actions={
        <div className="no-print flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => setEditing(true)}><Icon name="ruler" className="h-4 w-4" /> Edit</Button>
          <Button variant="gold" onClick={() => window.print()}><Icon name="upload" className="h-4 w-4" /> Print / PDF</Button>
        </div>
      }
    >
      {/* Action bar */}
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <StatusBadge status={doc.status} />
        {isQuote ? (
          <>
            <Select value={doc.status} disabled={busy} onChange={(e) => changeStatus(e.target.value as DocStatus)} className="w-40">
              {quoteStatuses.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </Select>
            {doc.convertedInvoiceId ? (
              <Link href={`/invoices/${doc.convertedInvoiceId}`} className="text-[12px] font-semibold text-navy underline decoration-gold">View linked invoice →</Link>
            ) : (
              <Button variant="primary" onClick={convert} disabled={busy}><Icon name="arrow" className="h-4 w-4" /> Convert to invoice</Button>
            )}
          </>
        ) : (
          <>
            <Button variant={doc.status === 'paid' ? 'outline' : 'primary'} onClick={togglePaid} disabled={busy}>
              <Icon name={doc.status === 'paid' ? 'close' : 'check'} className="h-4 w-4" />
              {doc.status === 'paid' ? 'Mark unpaid' : 'Mark paid'}
            </Button>
            {doc.sourceQuoteId && <Link href={`/quotes/${doc.sourceQuoteId}`} className="text-[12px] font-semibold text-navy underline decoration-gold">From quote →</Link>}
          </>
        )}
        <div className="ml-auto">
          <Button variant="danger" onClick={remove}><Icon name="close" className="h-4 w-4" /> Delete</Button>
        </div>
      </div>

      <A4Preview>
        <DocumentView doc={doc} business={business} />
      </A4Preview>
    </AdminShell>
  );
}
