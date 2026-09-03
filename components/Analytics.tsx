'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

/**
 * Google Analytics 4.
 *
 * Inert until NEXT_PUBLIC_GA_ID is set, so nothing loads — and no console
 * errors appear — before the property exists. See apphosting.yaml.
 *
 * Two deliberate choices:
 *
 * 1. `send_page_view: false`. GA's automatic page_view fires once, on the first
 *    document load. This is a client-routed app, so every later navigation
 *    would go uncounted. Page views are sent from an effect instead, which
 *    fires on mount (the first view) and on every route change after it.
 *
 * 2. It is mounted by the marketing layout and the 404 page, never by the root
 *    layout, so the staff admin on app.<domain> loads no analytics at all and
 *    running the dashboard does not pollute the numbers with your own visits.
 *    (A 404 *inside* the admin renders the shared not-found page and so is
 *    counted — rare enough to be worth keeping 404 tracking on the real site.)
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. No-ops when analytics is not configured or not yet loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

/** `useSearchParams` needs a Suspense boundary, hence the split component. */
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    const qs = searchParams?.toString();
    window.gtag('event', 'page_view', {
      page_path: pathname + (qs ? `?${qs}` : ''),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
      </Script>
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}
