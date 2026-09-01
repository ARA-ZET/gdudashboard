import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { services } from '@/lib/content';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { whatsappHref } from './WhatsAppButton';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white/70">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/60">
              Expert reupholstery, repair and custom furniture for homes and businesses across Cape Town and the Western Cape. Crafted for excellence since {site.foundedYear}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href={site.social.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:border-gold hover:text-gold transition-colors"><Icon name="facebook" className="h-4 w-4" /></a>
              <a href={site.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:border-gold hover:text-gold transition-colors"><Icon name="instagram" className="h-4 w-4" /></a>
              <a href={whatsappHref('site footer')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:border-gold hover:text-gold transition-colors"><Icon name="whatsapp" className="h-4 w-4" /></a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-label text-gold-400">Services</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-semibold uppercase tracking-label text-gold-400">Explore</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {site.nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-label text-gold-400">Visit the Workshop</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>{site.contact.address.street}, {site.contact.address.area}, {site.contact.address.postalCode}</span></li>
              <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${site.contact.phoneHref}`} className="hover:text-white">{site.contact.phone}</a></li>
              <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${site.contact.email}`} className="hover:text-white break-all">{site.contact.email}</a></li>
              <li className="flex gap-3"><Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span>Mon–Fri 09:00–17:00 · Sat 09:00–13:00</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 sm:flex-row sm:items-center">
          <p>© {year} {site.name}. All rights reserved. Crafted for excellence.</p>
          <p>Reupholstery · Repairs · Custom-made · Restoration — Cape Town</p>
        </div>

        <div className="mt-8 flex justify-center sm:justify-end">
          <a
            href={site.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-label text-white/35 transition-colors hover:text-white/70"
          >
            <span>Designed &amp; built by</span>
            <Image
              src={site.developer.logoLight}
              alt={site.developer.name}
              width={74}
              height={20}
              className="h-5 w-auto opacity-70 transition-opacity group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
