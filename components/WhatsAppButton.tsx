import { site } from '@/lib/site';
import { Icon } from './Icon';

/**
 * Builds a wa.me link that opens WhatsApp with the message already typed.
 *
 * `context` names where on the site the reader tapped, so the enquiry arrives
 * saying which page it came from — a commercial lead and a sagging-couch repair
 * then land in the same inbox already told apart.
 */
export function whatsappHref(context: string, intent = 'I’d like a free quote for my furniture.') {
  const text = `Hi ${site.name}, ${intent} (Sent from the ${context} on your website.)`;
  return `https://wa.me/${site.contact.whatsappHref}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppButton({
  context,
  intent,
  label = 'WhatsApp us',
  className = '',
}: {
  context: string;
  intent?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(context, intent)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whatsapp ${className}`}
    >
      <Icon name="whatsapp" className="h-4 w-4" />
      {label}
    </a>
  );
}
