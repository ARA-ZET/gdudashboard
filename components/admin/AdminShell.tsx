'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { Icon, type IconName } from '@/components/Icon';

const nav: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'Dashboard', icon: 'building' },
  { href: '/admin/clients', label: 'Clients', icon: 'crown' },
  { href: '/admin/quotes', label: 'Quotes', icon: 'layers' },
  { href: '/admin/invoices', label: 'Invoices', icon: 'verified' },
  { href: '/admin/settings', label: 'Settings', icon: 'ruler' },
];

export function AdminShell({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/admin/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-navy text-white">
        <div className="flex items-center gap-3 text-white/70">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-gold" />
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dim lg:grid lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      {/* Column layout keeps the footer pinned to the bottom without absolute
          positioning, which previously let it sit on top of a long nav. */}
      <aside className={`no-print fixed inset-y-0 left-0 z-40 flex w-[240px] transform flex-col bg-navy text-white transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
          <Image src="/logo/gdulogo-long-gold.webp" alt="Golden Diamond Upholstery" width={131} height={28} priority className="h-6 w-auto" />
          <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-400">Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-2.5">
          {nav.map((n) => {
            const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className={`mb-0.5 flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${active ? 'bg-gold text-navy' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
                <Icon name={n.icon} className="h-4 w-4 shrink-0" /> {n.label}
              </Link>
            );
          })}
        </nav>
        {/* Same grid as the nav rows — icon box + gap — so every label in the
            sidebar starts on one vertical line. */}
        <div className="shrink-0 border-t border-white/10 p-2.5">
          <div className="mb-1.5 truncate px-3 text-[11px] text-white/50">{user.email}</div>
          <button onClick={() => logout()} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium text-white/75 hover:bg-white/10 hover:text-white">
            <Icon name="arrow-left" className="h-4 w-4 shrink-0" /> Sign out
          </button>
          <Link href="/" className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[12px] text-white/50 hover:bg-white/10 hover:text-white">
            <Icon name="arrow" className="h-4 w-4 shrink-0" /> View website
          </Link>
        </div>
      </aside>

      {open && <div className="no-print fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="min-w-0">
        {/* min-h rather than a fixed height, so action buttons that wrap onto a
            second row stay inside the bar instead of overflowing it. */}
        <header className="no-print sticky top-0 z-20 flex min-h-14 flex-wrap items-center gap-x-3 gap-y-2 border-b border-outline-variant/60 bg-surface-white px-4 py-2 lg:px-6">
          <button className="lg:hidden shrink-0" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" className="h-5 w-5 text-navy" /></button>
          <h1 className="min-w-0 flex-1 truncate font-serif text-lg font-bold text-navy">{title}</h1>
          <div className="flex flex-wrap items-center justify-end gap-2">{actions}</div>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
