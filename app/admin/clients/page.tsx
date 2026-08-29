'use client';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { Button, Card, Field, Input, Textarea, EmptyState, LinkButton } from '@/components/admin/ui';
import { Icon } from '@/components/Icon';
import { subscribeClients, createClient, updateClient, deleteClient, type Client } from '@/lib/db';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => subscribeClients((c) => { setClients(c); setLoaded(true); }), []);

  const filtered = clients.filter((c) =>
    [c.name, c.email, c.phone].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase()),
  );

  function openNew() { setEditing(null); setShowForm(true); }
  function openEdit(c: Client) { setEditing(c); setShowForm(true); }

  return (
    <AdminShell title="Clients" actions={<Button variant="gold" onClick={openNew}><Icon name="plus" className="h-4 w-4" /> New client</Button>}>
      <div className="mb-4 max-w-sm">
        <Input placeholder="Search clients…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {!loaded ? (
        <p className="text-ink-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={clients.length === 0 ? 'No clients yet' : 'No matches'}
          hint={clients.length === 0 ? 'Add your first client to start creating quotes and invoices.' : 'Try a different search.'}
          action={clients.length === 0 ? <Button variant="gold" onClick={openNew}><Icon name="plus" className="h-4 w-4" /> Add client</Button> : undefined}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="border-b border-outline-variant/60 bg-surface-dim text-[12px] uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-dim/50">
                    <td className="px-4 py-3 font-semibold text-navy">{c.name}</td>
                    <td className="px-4 py-3 text-ink-muted">{c.email || '—'}</td>
                    <td className="px-4 py-3 text-ink-muted">{c.phone || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(c)} className="text-navy hover:text-gold-700" aria-label="Edit"><Icon name="ruler" className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showForm && <ClientForm client={editing} onClose={() => setShowForm(false)} />}
    </AdminShell>
  );
}

function ClientForm({ client, onClose }: { client: Client | null; onClose: () => void }) {
  const [form, setForm] = useState<Client>(client ?? { name: '', email: '', phone: '', address: '', notes: '' });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const data = { name: form.name.trim(), email: form.email?.trim() || '', phone: form.phone?.trim() || '', address: form.address?.trim() || '', notes: form.notes?.trim() || '' };
    try {
      if (client?.id) await updateClient(client.id, data);
      else await createClient(data);
      onClose();
    } finally { setBusy(false); }
  }

  async function remove() {
    if (!client?.id) return;
    if (!confirm(`Delete ${client.name}? This cannot be undone.`)) return;
    await deleteClient(client.id); onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-xl bg-white p-6 shadow-ambient-lg sm:rounded-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-navy">{client ? 'Edit client' : 'New client'}</h2>
          <button onClick={onClose} aria-label="Close"><Icon name="close" className="h-5 w-5 text-ink-muted" /></button>
        </div>
        <form onSubmit={save} className="space-y-4">
          <Field label="Name" required><Input required value={form.name} onChange={set('name')} placeholder="e.g. Jane Adams" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email"><Input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></Field>
            <Field label="Phone"><Input value={form.phone} onChange={set('phone')} placeholder="082 123 4567" /></Field>
          </div>
          <Field label="Address"><Textarea rows={2} value={form.address} onChange={set('address')} placeholder="Street, suburb, city" /></Field>
          <Field label="Notes"><Textarea rows={2} value={form.notes} onChange={set('notes')} /></Field>
          <div className="flex items-center justify-between pt-2">
            {client ? <Button type="button" variant="danger" onClick={remove}><Icon name="close" className="h-4 w-4" /> Delete</Button> : <span />}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="gold" disabled={busy || !form.name.trim()}>{busy ? 'Saving…' : 'Save client'}</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
