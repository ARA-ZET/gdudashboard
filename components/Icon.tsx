import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export type IconName =
  | 'sofa' | 'wrench' | 'bed' | 'layers' | 'crown' | 'sun' | 'ruler' | 'building'
  | 'shield' | 'leaf' | 'arrow' | 'arrow-left' | 'star' | 'check' | 'phone'
  | 'mail' | 'pin' | 'clock' | 'menu' | 'close' | 'facebook' | 'instagram'
  | 'whatsapp' | 'quote' | 'diamond' | 'spring' | 'scissors' | 'plus' | 'minus'
  | 'upload' | 'verified';

const paths: Record<IconName, JSX.Element> = {
  sofa: <><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" /><path d="M2 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3h12v-3a2 2 0 0 1 4 0v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" /><path d="M6 19v2M18 19v2" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6a1.4 1.4 0 0 0 2 2l6-6a4 4 0 0 0 5-5.4l-2.3 2.3-2.1-.5-.5-2.1Z" />,
  bed: <><path d="M3 8v11M3 13h18M21 19v-6a3 3 0 0 0-3-3H8v3" /><path d="M21 19H3" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5M3 17l9 5 9-5" /></>,
  crown: <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  ruler: <><path d="M3 15 15 3l6 6L9 21l-6-6Z" /><path d="M7 11l2 2M11 7l2 2M15 11l1 1" /></>,
  building: <><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V9h4a1 1 0 0 1 1 1v11M2 21h20" /><path d="M8 8h3M8 12h3M8 16h3" /></>,
  shield: <><path d="M12 2 5 5v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V5l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  leaf: <path d="M4 20c8 2 16-4 16-14 0 0-6-1-11 4-3.5 3.5-3 8-3 8l-2 2m6-8-3 3" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  star: <path d="m12 2 3 6.5 7 .8-5.2 4.7 1.4 6.9L12 17.5 5.4 20.9l1.4-6.9L1.6 9.3l7-.8L12 2Z" />,
  check: <path d="m20 6-11 11-5-5" />,
  phone: <path d="M6 3c1 0 2 .3 2.5 2l.8 2.5c.2.8 0 1.5-.6 2l-1 1a13 13 0 0 0 5.3 5.3l1-1c.5-.6 1.2-.8 2-.6l2.5.8C21 17 21 18 21 19a2 2 0 0 1-2 2C9.6 21 3 14.4 3 5a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  pin: <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  whatsapp: <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm-3 5c.2 0 .5 0 .7.5l.7 1.6c.1.3 0 .5-.1.7l-.5.6c-.2.2-.2.4 0 .7a7 7 0 0 0 2.8 2.5c.3.2.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.4.4.6 0 1-1.4 1.8-2 1.8a8 8 0 0 1-7-7c0-.6.8-2 1.8-2Z" />,
  quote: <path d="M7 7h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2H7V7Zm8 0h4v6a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2h-2V7Z" fill="currentColor" stroke="none" />,
  diamond: <path d="M12 2 4 9l8 13 8-13-8-7Zm0 0v20M4 9h16" />,
  spring: <path d="M6 4h12M6 20h12M8 4c0 3 8 3 8 6s-8 3-8 6" />,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.5 8.5 20 18M8.5 15.5 20 6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  upload: <><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></>,
  verified: <><path d="m12 2 2.4 1.8 3 .1 1 2.8 2.4 1.7-.9 2.9.9 2.9-2.4 1.7-1 2.8-3 .1L12 22l-2.4-1.8-3-.1-1-2.8L3.2 15.6l.9-2.9-.9-2.9L5.6 8l1-2.8 3-.1L12 2Z" /><path d="m9 12 2 2 4-4" /></>,
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
