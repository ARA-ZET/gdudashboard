import { NextResponse, type NextRequest } from 'next/server';

/**
 * Redirect the www host to the apex.
 *
 * App Hosting is configured to SERVE this app on www as well as the apex, which
 * made the site a complete duplicate: every www page rendered fine and pointed
 * its canonical at the apex, so Search Console reported www URLs as "Alternate
 * page with proper canonical tag" and indexed none of them.
 *
 * This lives in middleware rather than `redirects()` in next.config because the
 * config matcher tests the `Host` header, and behind Google's frontend that is
 * the internal Cloud Run host, not the hostname the visitor typed — so the rule
 * matched in local testing and silently never fired in production. The public
 * hostname arrives in `x-forwarded-host`, with `host` as the fallback for
 * running directly (`next start`).
 *
 * The apex is derived by stripping the leading `www.`, so this keeps working if
 * the domain ever changes.
 */
export function middleware(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? request.headers.get('host') ?? '').toLowerCase();

  if (!host.startsWith('www.')) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = 'https:';
  url.host = host.replace(/^www\./, '');
  url.port = '';

  // 308 keeps the method and body; Google treats it as a permanent redirect
  // exactly like a 301.
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip Next's own static output and the icon files browsers request directly;
  // everything else, including pages and the API, is checked.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
