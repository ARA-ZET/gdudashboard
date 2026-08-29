import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    'upholstery Cape Town', 'reupholstery Cape Town', 'upholstery repair', 'furniture upholstery',
    'couch reupholstery', 'headboards Cape Town', 'antique restoration', 'commercial upholstery',
    'bespoke furniture Cape Town', 'lounge suite reupholstery',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website', locale: 'en_ZA', url: site.url, siteName: site.name,
    title: `${site.name} | ${site.tagline}`, description: site.description,
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: '#041632',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
