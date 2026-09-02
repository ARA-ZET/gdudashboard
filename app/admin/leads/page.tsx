'use client';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { Button, Card, EmptyState } from '@/components/admin/ui';
import { Icon } from '@/components/Icon';
import { subscribeLeads, setLeadRead, deleteLead, type Lead } from '@/lib/db';

type Filter = 'all' | 'unread' | 'read';

function when(l: Lead) {
  const d = l.createdAt?.toDate?.();
  if (!d) return '—';
  return d.toLocaleString('en-ZA', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => subscribeLeads((l) => { setLeads(l); setLoaded(true); }), []);

  const unread = leads.filter((l) => !l.read).length;
  const shown = leads.filter((l) => (filter === 'all' ? true : filter === 'unread' ? !l.read : l.read));

  /** Expanding a lead counts as opening it. */
  function toggle(l: Lead) {
    const next = openId === l.id ? null : l.id!;
    setOpenId(next);
    if (next && !l.read) setLeadRead(l.id!, true).catch(() => {});
  }

  return (
    <AdminShell
      title="Enquiries"
      actions={
        <div className="flex items-center gap-2">
          {(['all', 'unread', 'read'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-2 text-[12px] font-semibold capitalize transition-colors ${
                filter === f ? 'bg-navy text-white' : 'border border-outline-variant text-navy hover:border-navy'
              }`}
            >
              {f}
              {f === 'unread' && unread > 0 && (
                <span className="ml-1.5 rounded bg-gold px-1.5 py-0.5 text-[11px] text-navy">{unread}</span>
              )}
            </button>
          ))}
        </div>
      }
    >
      {!loaded ? (
        <p className="text-ink-muted">Loading…</p>
      ) : shown.length === 0 ? (
        <EmptyState
          title={leads.length === 0 ? 'No enquiries yet' : `No ${filter} enquiries`}
          hint={
            leads.length === 0
              ? 'Quote requests from the website contact form land here the moment they are submitted.'
              : 'Try a different filter.'
          }
        />
      ) : (
        <div className="space-y-3">
          {shown.map((l) => {
            const isOpen = openId === l.id;
            return (
              <Card key={l.id} className={`overflow-hidden ${!l.read ? 'border-l-4 border-l-gold' : ''}`}>
                <button
                  type="button"
                  onClick={() => toggle(l)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-dim"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${l.read ? 'bg-outline-variant' : 'bg-gold'}`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[14px] ${l.read ? 'text-navy' : 'font-bold text-navy'}`}>
                      {l.name}
                      <span className="ml-2 font-normal text-ink-muted">{l.service || 'Enquiry'}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] text-ink-muted">
                      {l.phone}{l.phone && l.email ? ' · ' : ''}{l.email}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-[12px] text-ink-muted sm:block">{when(l)}</span>
                  <span className="sr-only">{l.read ? 'Opened' : 'Not opened'}</span>
                  <Icon name={isOpen ? 'minus' : 'plus'} className="h-4 w-4 shrink-0 text-ink-muted" />
                </button>

                {isOpen && (
                  <div className="border-t border-outline-variant/60 p-5">
                    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Phone</dt>
                        <dd className="mt-1 text-[14px]">
                          {l.phone ? <a className="text-navy underline decoration-gold" href={`tel:${l.phone}`}>{l.phone}</a> : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Email</dt>
                        <dd className="mt-1 break-all text-[14px]">
                          {l.email ? <a className="text-navy underline decoration-gold" href={`mailto:${l.email}`}>{l.email}</a> : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Property</dt>
                        <dd className="mt-1 text-[14px]">{l.property || '—'}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Received</dt>
                        <dd className="mt-1 text-[14px]">{when(l)}</dd>
                      </div>
                      {l.pageUrl && (
                        <div className="sm:col-span-2">
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Sent from</dt>
                          <dd className="mt-1 break-all text-[14px]">
                            <a className="text-navy underline decoration-gold" href={l.pageUrl} target="_blank" rel="noopener noreferrer">{l.pageUrl}</a>
                          </dd>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">Message</dt>
                        <dd className="mt-1 whitespace-pre-wrap text-[14px] leading-relaxed">{l.message || '—'}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-outline-variant/60 pt-4">
                      {l.phone && (
                        <a className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer"
                           href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '').replace(/^0/, '27')}`}>
                          <Icon name="whatsapp" className="h-4 w-4" /> Reply on WhatsApp
                        </a>
                      )}
                      <Button variant="outline" onClick={() => setLeadRead(l.id!, !l.read)}>
                        Mark as {l.read ? 'unopened' : 'opened'}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => { if (confirm(`Delete the enquiry from ${l.name}? This cannot be undone.`)) deleteLead(l.id!); }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
