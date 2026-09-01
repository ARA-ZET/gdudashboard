import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website', locale: 'en_ZA', url: site.url, siteName: site.name,
    title: site.seoTitle, description: site.metaDescription,
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
