'use client';
import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, setDoc,
  onSnapshot, query, orderBy, runTransaction, serverTimestamp, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

/* ----------------------------- Types ----------------------------- */

export type Client = {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt?: Timestamp;
};

export type LineItem = {
  description: string;
  qty: number;
  unitPrice: number;
};

export type DocStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'unpaid' | 'paid';

export type BusinessDoc = {
  id?: string;
  number: string;
  kind: 'quote' | 'invoice';
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  date: string;        // ISO yyyy-mm-dd
  dueDate?: string;    // invoices: due; quotes: valid-until
  items: LineItem[];
  notes?: string;
  status: DocStatus;
  subtotal: number;
  total: number;
  currency: string;    // 'ZAR'
  sourceQuoteId?: string;
  convertedInvoiceId?: string;
  paidAt?: string | null;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

/* -------------------- Business / banking settings -------------------- */

export type BusinessSettings = {
  name?: string;
  addressLines?: string;   // free text, multi-line
  phone?: string;
  email?: string;
  website?: string;
  regNo?: string;          // company registration number
  vatNo?: string;          // VAT number (optional)
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  branchCode?: string;
  accountType?: string;
  paymentTerms?: string;   // default notes/terms prefilled on new documents
};

export function subscribeBusiness(cb: (b: BusinessSettings) => void) {
  return onSnapshot(doc(db, 'meta', 'business'), (snap) => cb((snap.exists() ? (snap.data() as BusinessSettings) : {})));
}
export async function getBusiness(): Promise<BusinessSettings> {
  const d = await getDoc(doc(db, 'meta', 'business'));
  return d.exists() ? (d.data() as BusinessSettings) : {};
}
export async function saveBusiness(data: BusinessSettings) {
  return setDoc(doc(db, 'meta', 'business'), data, { merge: true });
}

/* --------------------------- Utilities --------------------------- */

export function money(n: number, currency = 'ZAR'): string {
  const value = Number.isFinite(n) ? n : 0;
  const formatted = value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return currency === 'ZAR' ? `R ${formatted}` : `${currency} ${formatted}`;
}

export function lineTotal(it: LineItem): number {
  return (Number(it.qty) || 0) * (Number(it.unitPrice) || 0);
}

export function computeTotals(items: LineItem[]) {
  const subtotal = items.reduce((s, it) => s + lineTotal(it), 0);
  // No VAT for now (ZAR). total === subtotal; structure kept for future VAT.
  return { subtotal, total: subtotal };
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/* ---------------------------- Clients ---------------------------- */

export function subscribeClients(cb: (clients: Client[]) => void) {
  const q = query(collection(db, 'clients'), orderBy('name'));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Client) }))));
}

export async function getClient(id: string): Promise<Client | null> {
  const d = await getDoc(doc(db, 'clients', id));
  return d.exists() ? ({ id: d.id, ...(d.data() as Client) }) : null;
}

export async function createClient(data: Omit<Client, 'id' | 'createdAt'>) {
  return addDoc(collection(db, 'clients'), { ...data, createdAt: serverTimestamp() });
}

export async function updateClient(id: string, data: Partial<Client>) {
  return updateDoc(doc(db, 'clients', id), data);
}

export async function deleteClient(id: string) {
  return deleteDoc(doc(db, 'clients', id));
}

/* ------------------------ Sequential numbers ------------------------ */

async function nextNumber(kind: 'quote' | 'invoice'): Promise<string> {
  const ref = doc(db, 'meta', 'counters');
  const field = kind === 'quote' ? 'quoteSeq' : 'invoiceSeq';
  const prefix = kind === 'quote' ? 'QT' : 'INV';
  const seq = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current = (snap.exists() ? (snap.data() as any)[field] : 0) || 0;
    const next = current + 1;
    if (snap.exists()) tx.update(ref, { [field]: next });
    else tx.set(ref, { [field]: next });
    return next;
  });
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${String(seq).padStart(4, '0')}`;
}

/* ------------------------ Quotes & Invoices ------------------------ */

function coll(kind: 'quote' | 'invoice') {
  return collection(db, kind === 'quote' ? 'quotes' : 'invoices');
}

export function subscribeDocs(kind: 'quote' | 'invoice', cb: (docs: BusinessDoc[]) => void) {
  const q = query(coll(kind), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as BusinessDoc) }))));
}

export async function getBusinessDoc(kind: 'quote' | 'invoice', id: string): Promise<BusinessDoc | null> {
  const d = await getDoc(doc(db, kind === 'quote' ? 'quotes' : 'invoices', id));
  return d.exists() ? ({ id: d.id, ...(d.data() as BusinessDoc) }) : null;
}

export async function createBusinessDoc(
  kind: 'quote' | 'invoice',
  data: Omit<BusinessDoc, 'id' | 'number' | 'kind' | 'subtotal' | 'total' | 'createdAt' | 'updatedAt'>,
) {
  const number = await nextNumber(kind);
  const { subtotal, total } = computeTotals(data.items);
  const ref = await addDoc(coll(kind), {
    ...data, kind, number, subtotal, total,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  return { id: ref.id, number };
}

export async function updateBusinessDoc(kind: 'quote' | 'invoice', id: string, data: Partial<BusinessDoc>) {
  const patch: any = { ...data, updatedAt: serverTimestamp() };
  if (data.items) {
    const { subtotal, total } = computeTotals(data.items);
    patch.subtotal = subtotal; patch.total = total;
  }
  return updateDoc(doc(db, kind === 'quote' ? 'quotes' : 'invoices', id), patch);
}

export async function deleteBusinessDoc(kind: 'quote' | 'invoice', id: string) {
  return deleteDoc(doc(db, kind === 'quote' ? 'quotes' : 'invoices', id));
}

export async function setStatus(kind: 'quote' | 'invoice', id: string, status: DocStatus) {
  const patch: any = { status, updatedAt: serverTimestamp() };
  if (kind === 'invoice') patch.paidAt = status === 'paid' ? todayISO() : null;
  return updateDoc(doc(db, kind === 'quote' ? 'quotes' : 'invoices', id), patch);
}

/** Turn an accepted quote into a new invoice; links both ways. */
export async function convertQuoteToInvoice(quote: BusinessDoc): Promise<{ id: string; number: string }> {
  const number = await nextNumber('invoice');
  const { subtotal, total } = computeTotals(quote.items);
  const due = new Date(); due.setDate(due.getDate() + 14);
  const ref = await addDoc(coll('invoice'), {
    number, kind: 'invoice',
    clientId: quote.clientId, clientName: quote.clientName,
    clientEmail: quote.clientEmail ?? '', clientAddress: quote.clientAddress ?? '',
    date: todayISO(), dueDate: due.toISOString().slice(0, 10),
    items: quote.items, notes: quote.notes ?? '',
    status: 'unpaid', subtotal, total, currency: quote.currency || 'ZAR',
    sourceQuoteId: quote.id ?? '', paidAt: null,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  if (quote.id) {
    await updateDoc(doc(db, 'quotes', quote.id), { convertedInvoiceId: ref.id, status: 'accepted', updatedAt: serverTimestamp() });
  }
  return { id: ref.id, number };
}
