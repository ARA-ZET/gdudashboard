'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/components/admin/AuthProvider';
import { Button, Field, Input } from '@/components/admin/ui';
import { Icon } from '@/components/Icon';

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && user) router.replace('/admin'); }, [loading, user, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await signIn(email, password);
      router.replace('/admin');
    } catch (err: any) {
      const code = err?.code || '';
      setError(
        code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')
          ? 'Incorrect email or password.'
          : code.includes('too-many-requests')
          ? 'Too many attempts — please wait a moment and try again.'
          : 'Could not sign in. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-navy p-5 texture-tufted">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo/gdulogo-small-gold.webp" alt="Golden Diamond Upholstery" width={154} height={112} priority className="h-28 w-auto" />
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-400">Admin</p>
          <p className="mt-1 text-[14px] text-white/60">Sign in to manage quotes & invoices</p>
        </div>
        <form onSubmit={onSubmit} className="rounded-lg bg-white p-7 shadow-ambient-lg">
          <div className="space-y-4">
            <Field label="Email" required>
              <Input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@goldendiamond.co.za" />
            </Field>
            <Field label="Password" required>
              <Input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </Field>
          </div>
          {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-[13px] text-red-700">{error}</p>}
          <Button type="submit" variant="gold" disabled={busy} className="mt-6 w-full">
            {busy ? 'Signing in…' : 'Sign in'} <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-5 text-center text-[12px] text-white/40">
          Staff accounts are created in the Firebase console. Contact your administrator for access.
        </p>
      </div>
    </div>
  );
}
