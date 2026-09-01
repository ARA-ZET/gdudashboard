'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { WhatsAppButton, whatsappHref } from './WhatsAppButton';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-navy transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 shadow-[0_2px_20px_-8px_rgba(4,22,50,0.55)]' : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-[70px] items-center justify-between gap-4">
          <Logo light />

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {site.nav.map((item) => {
              const href = item.href as string;
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[14px] font-medium transition-colors ${
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${site.contact.phoneHref}`} className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-gold">
              <Icon name="phone" className="h-4 w-4" />
              <span className="hidden xl:inline">{site.contact.phone}</span>
            </a>
            <a
              href={whatsappHref('site header')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
            </a>
            <Link href="/contact" className="btn btn-gold">Get a Free Quote</Link>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer. Kept a sibling of <header>, not a child: any filter,
          backdrop-filter or transform on the header would make it the containing
          block for fixed-position descendants, collapsing this panel to zero
          height so its background never paints and the links spill onto the page. */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[70px] bottom-0 z-40 overflow-y-auto overscroll-contain bg-navy text-white transition-[transform,visibility] duration-300 ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 pb-12 pt-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl text-white"
            >
              {item.label}
              <Icon name="arrow" className="h-5 w-5 text-gold" />
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/contact" className="btn btn-gold w-full">Get a Free Quote</Link>
            <WhatsAppButton context="mobile menu" className="w-full" />
            <a href={`tel:${site.contact.phoneHref}`} className="btn btn-outline-light w-full">
              <Icon name="phone" className="h-4 w-4" /> {site.contact.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
