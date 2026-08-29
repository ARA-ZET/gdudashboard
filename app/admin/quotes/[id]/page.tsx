'use client';
import { useParams } from 'next/navigation';
import { DocumentDetail } from '@/components/admin/DocumentDetail';
export default function QuoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <DocumentDetail kind="quote" id={id} />;
}
