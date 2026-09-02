import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';
import { Analytics } from '@/components/Analytics';

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
  // Unlimited snippet length and large image previews. Google's AI features
  // draw on the same snippet a page is eligible to show in Search, so a
  // `max-snippet` cap would quietly reduce what AI Overviews can quote.
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // favicon.svg is deliberately not listed: it draws a generic diamond outline
  // rather than the real emblem, and browsers prefer an SVG icon over PNG when
  // both are offered, so declaring it would override the actual logo.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
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
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
