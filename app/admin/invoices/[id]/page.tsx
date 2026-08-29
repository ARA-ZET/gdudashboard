'use client';
import { useParams } from 'next/navigation';
import { DocumentDetail } from '@/components/admin/DocumentDetail';
export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <DocumentDetail kind="invoice" id={id} />;
}
