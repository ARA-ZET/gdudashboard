import { NextResponse, type NextRequest } from 'next/server';
import { site } from '@/lib/site';

/**
 * Host-based routing. Two rules, both keyed off the hostname the visitor typed:
 *
 *   www.example.com/*  → 308 to the apex — the site is one property, not two.
 *   app.example.com/*  → the staff admin, rewritten onto the `/admin` routes so
 *                        the prefix never appears in the address bar.
 *   example.com/admin* → 308 to the admin host, so the dashboard has exactly
 *                        one address.
 *
 * This lives in middleware rather than `redirects()` / `rewrites()` in
 * next.config because a `has: [{ type: 'host' }]` matcher there tests the
 * `Host` header, and behind Google's frontend that is the internal Cloud Run
 * host, not the hostname the visitor typed — so such a rule matches in local
 * testing and silently never fires in production. The public hostname arrives
 * in `x-forwarded-host`, with `host` as the fallback for running directly
 * (`next start`, `next dev`).
 *
 * Locally the admin is reachable at http://app.localhost:3000 — browsers
 * resolve every `*.localhost` name to the loopback address without any hosts
 * file entry.
 */

/** `app.` — see `site.adminSubdomain`. */
const ADMIN_HOST_PREFIX = `${site.adminSubdomain}.`;

/**
 * Paths the admin host serves unchanged: the form endpoint and anything that
 * looks like a file (`/favicon.ico`, `/logo/*.webp`, `/icon.png`). Rewriting
 * those onto `/admin/...` would only 404 them.
 */
const PASS_THROUGH = /^\/api\/|\.[a-z0-9]+$/i;

export function middleware(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? request.headers.get('host') ?? '').toLowerCase();
  const { pathname } = request.nextUrl;

  if (host.startsWith(ADMIN_HOST_PREFIX)) return adminHost(request, host, pathname);

  // Any other host: the admin has moved to its own, and www folds into the apex.
  const apex = host.replace(/^www\./, '');

  if (isAdminPath(pathname)) {
    // 308 keeps the method and body; Google treats it as a permanent redirect
    // exactly like a 301.
    return NextResponse.redirect(
      urlOn(request, ADMIN_HOST_PREFIX + apex, stripAdmin(pathname)),
      308,
    );
  }

  if (apex !== host) return NextResponse.redirect(urlOn(request, apex, pathname), 308);

  return NextResponse.next();
}

/** Requests arriving on `app.<domain>`. */
function adminHost(request: NextRequest, host: string, pathname: string) {
  // Bookmarks and old links still carry the prefix the rewrite hides.
  if (isAdminPath(pathname)) {
    return NextResponse.redirect(urlOn(request, host, stripAdmin(pathname)), 308);
  }

  // Nothing here is public. app/robots.ts describes the marketing site and
  // would otherwise invite crawlers to index the sign-in page at this host.
  if (pathname === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  if (PASS_THROUGH.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.rewrite(url);
  // Belt and braces alongside the `noindex` metadata in app/admin/layout.tsx:
  // this also covers responses that carry no HTML head.
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

const isAdminPath = (pathname: string) => pathname === '/admin' || pathname.startsWith('/admin/');

const stripAdmin = (pathname: string) => pathname.slice('/admin'.length) || '/';

/**
 * The same URL on another host. The scheme comes from `x-forwarded-proto` so
 * this stays on http when running locally and on https behind App Hosting.
 */
function urlOn(request: NextRequest, host: string, pathname: string) {
  const url = request.nextUrl.clone();
  const proto = request.headers.get('x-forwarded-proto')?.split(',')[0].trim();
  if (proto) url.protocol = `${proto}:`;
  // The `host` setter keeps the existing port unless the new value carries one.
  if (!host.includes(':')) url.port = '';
  url.host = host;
  url.pathname = pathname;
  return url;
}

export const config = {
  // Skip Next's own static output; everything else, including pages and the
  // API, is checked.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
