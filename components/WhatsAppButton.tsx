'use client';

import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';
import { Icon } from './Icon';

const DEFAULT_INTENT = 'I’d like a free quote for my furniture.';

/**
 * Builds a wa.me link that opens WhatsApp with the message already typed,
 * ending in the URL of the page the reader tapped from.
 *
 * The link is more useful than naming the page in prose: it is tappable, so the
 * enquiry arrives with the exact piece or service the customer was looking at
 * one tap away, and WhatsApp renders a preview card for it.
 *
 * `usePathname` is why this is a client component — the header and footer appear
 * on every page, so their buttons cannot know the page at build time.
 */
export function useWhatsAppHref(intent: string = DEFAULT_INTENT) {
  const pathname = usePathname();
  const pageUrl = `${site.url}${pathname === '/' ? '' : pathname}`;
  // A blank line keeps the URL on its own line, which is where WhatsApp looks
  // for something to build a preview card from.
  return `https://wa.me/${site.contact.whatsappHref}?text=${encodeURIComponent(
    `Hi ${site.name}, ${intent}\n\n${pageUrl}`,
  )}`;
}

export function WhatsAppButton({
  intent,
  label = 'WhatsApp us',
  shortLabel = 'WhatsApp',
  className = '',
}: {
  intent?: string;
  label?: string;
  /** Used below `sm`, where three CTAs share one row. */
  shortLabel?: string;
  className?: string;
}) {
  const href = useWhatsAppHref(intent);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-whatsapp ${className}`}>
      <Icon name="whatsapp" className="h-4 w-4 shrink-0" />
      <span className="sm:hidden">{shortLabel ?? label}</span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

/** Bare WhatsApp link for icon-only or inline placements (header, footer). */
export function WhatsAppLink({
  intent,
  className = '',
  children,
  ...rest
}: {
  intent?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>) {
  const href = useWhatsAppHref(intent);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}
