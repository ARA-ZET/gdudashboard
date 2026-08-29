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
    <div className="min-h-screen bg-surface-dim lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className={`no-print fixed inset-y-0 left-0 z-40 w-[260px] transform bg-navy text-white transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <Image src="/logo/gdulogo-long-gold.webp" alt="Golden Diamond Upholstery" width={131} height={28} priority className="h-7 w-auto" />
          <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold-400">Admin</span>
        </div>
        <nav className="p-3">
          {nav.map((n) => {
            const active = n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-[14px] font-medium transition-colors ${active ? 'bg-gold text-navy' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
                <Icon name={n.icon} className="h-[18px] w-[18px]" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-3">
          <div className="mb-2 truncate px-3 text-[12px] text-white/50">{user.email}</div>
          <button onClick={() => logout()} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[14px] font-medium text-white/75 hover:bg-white/10 hover:text-white">
            <Icon name="arrow-left" className="h-[18px] w-[18px]" /> Sign out
          </button>
          <Link href="/" className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] text-white/50 hover:text-white">
            View website ↗
          </Link>
        </div>
      </aside>

      {open && <div className="no-print fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="min-w-0">
        <header className="no-print sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-outline-variant/60 bg-surface-white px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" className="h-6 w-6 text-navy" /></button>
          <h1 className="font-serif text-xl font-bold text-navy">{title}</h1>
          <div className="ml-auto flex items-center gap-2">{actions}</div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
