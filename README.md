# Golden Diamond Upholstery — Website

Marketing website for **Golden Diamond Upholstery**, a Cape Town upholstery repair,
reupholstery and bespoke-furniture atelier. Built with **Next.js (App Router) +
TypeScript + Tailwind CSS**, designed to deploy on **Firebase App Hosting**.

Navy `#041632` + golden yellow `#feb700`, Playfair Display + Inter — matching the
`stitch` design system, extended with trust/track-record content and full SEO.

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, services, heritage, trust, process, portfolio preview, testimonials, FAQ |
| `/services` | Full service catalogue (reupholstery, repairs, headboards, loose covers, antiques, outdoor, bespoke, commercial) + service areas + FAQ |
| `/residential` | Homeowner-focused offering + heritage restoration |
| `/commercial` | Contract-grade work for hotels, restaurants, offices |
| `/portfolio` | Track record + project case studies by collection |
| `/craftsmanship` | Techniques, materials, durability, team, sourcing |
| `/contact` | Free-quote form + direct contact + hours |
| `/api/quote` | Form submission endpoint (see “Contact form” below) |

Plus `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, and a dynamic 404.

## SEO built in

- Unique title + meta description per page; canonical URLs; Open Graph + Twitter cards.
- JSON-LD structured data: `HomeAndConstructionBusiness` (with geo, opening hours,
  `areaServed` for 22 Cape Town suburbs), `Service`, `FAQPage`, `BreadcrumbList`.
- Semantic HTML, accessible focus states, skip-link, reduced-motion support.
- All pages statically pre-rendered → fast, crawlable. Local-SEO keyword copy.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Node 18+ recommended.

## Deploy to Firebase App Hosting

1. Install the CLI and sign in: `npm i -g firebase-tools && firebase login`.
2. In the Firebase console, create an **App Hosting** backend and connect this
   Git repository (App Hosting builds from your repo on every push).
3. `apphosting.yaml` (included) sets runtime resources and the public site URL
   env var. Update `NEXT_PUBLIC_SITE_URL` there to your real domain — it feeds
   canonical tags, the sitemap and structured data.
4. Push to the connected branch; App Hosting runs `npm run build` and deploys.

> Firebase App Hosting natively supports Next.js SSR — no `firebase.json` hosting
> rewrite or static export is needed. (The old Flutter `firebase.json` has been
> archived; see `_flutter_archive/`.)

---

## ⚠️ Before you go live — replace the placeholders

The site ships with **placeholder content** drawn from the design mockups. Search
the code for `PLACEHOLDER` and update:

- **Business details** — `lib/site.ts`: phone, WhatsApp, email, street address,
  map coordinates (`geo`), opening hours, founding year, social links.
- **Statistics** — `lib/site.ts` `stats`: use your real, verifiable numbers
  (years, pieces restored, projects). Don’t publish invented figures.
- **Testimonials** — `lib/content.ts` `testimonials`: replace every one with a
  **genuine** client review (name + area). Fake reviews breach advertising rules.
- **Portfolio projects** — `lib/content.ts` `projects`: swap in your real projects.
- **Photos** — the portfolio/hero currently use on-brand fabric-texture tiles
  (`components/Swatch.tsx`) as elegant stand-ins. Add real photos to
  `public/images/` and render them with `next/image` where you want photography.
- **Logo** — `components/Logo.tsx` uses a diamond monogram; drop in your real logo.
- **OG image** — `public/images/og.png` is auto-generated; regenerate with your
  branding/photography for nicer social-share previews.

## Contact form → email (Resend)

`app/api/quote/route.ts` **emails you each quote request via Resend**, and always
logs submissions to the App Hosting logs as a fallback. To turn email on:

1. Create a free account at [resend.com](https://resend.com) and generate an API key.
2. Verify your sending domain in Resend (so email can come from
   `quotes@goldendiamondupholstery.co.za`). Until then it uses Resend’s `onboarding@resend.dev`.
3. Add the secret + variables (see `apphosting.yaml`):
   - `RESEND_API_KEY` — store in Cloud Secret Manager and reference it.
   - `CONTACT_TO` — the inbox that should receive leads.
   - `CONTACT_FROM` *(optional)* — a branded from-address once your domain is verified.

The form always shows direct phone / WhatsApp / email options on success, so no
lead is lost even before the key is set. Prefer storing leads in Firestore
(your `gdu-dashboard` project) instead? The handler is a single file — easy to swap.

---

## Admin area — login, clients, quotes & invoices

A private admin app lives on its own subdomain —
**`https://app.goldendiamondupholstery.co.za`** (login at `/login`). It uses your
existing Firebase project **`gdu-dashboard`** (Firebase Auth + Firestore) and is
hidden from search engines (`noindex` metadata, an `X-Robots-Tag` header, and a
`Disallow: /` robots.txt served only on that host).

The pages still live under `app/admin/**` in this repo; `middleware.ts` routes by
hostname, so the `/admin` prefix never appears in the address bar. It also sends
`goldendiamondupholstery.co.za/admin/*` to the matching page on `app.` with a
308, so the dashboard has exactly one address and old bookmarks keep working.

Features: client list, quotes (line items, statuses, printable/PDF), invoices
(mark paid/unpaid, printable/PDF), one-click **quote → invoice**, sequential
numbering (`QT-YYYY-0001`, `INV-YYYY-0001`), ZAR, no VAT, and a dashboard
(outstanding, paid-this-month, open quotes, clients).

**To make invoicing/PDF work, the “Print / PDF” button opens your browser’s
print dialog — choose “Save as PDF”.**

### One-time subdomain setup
The admin is served by the **same** App Hosting backend as the website — one
deploy, one bill. It just needs the extra hostname pointed at it:

1. **Add the custom domain** — Firebase console → *App Hosting → your backend →
   Domains → Add custom domain* → `app.goldendiamondupholstery.co.za`.
2. **Add the DNS record** your registrar needs, as shown by that dialog (an `A`
   record for the apex-style setup, or the `CNAME` it gives you), then wait for
   the certificate to go green. Until it does, the admin is unreachable — the
   `/admin` redirect points at a host that does not resolve yet, so finish this
   step before announcing the new address.
3. **Authorize the host for login** — *Authentication → Settings → Authorized
   domains* → add `app.goldendiamondupholstery.co.za`. Firebase Auth refuses to
   sign anyone in from a host that is not on this list.

To use a different subdomain, change `adminSubdomain` in `lib/site.ts` — the
middleware derives everything else from it and from the domain in the request.

### One-time Firebase setup
1. **Enable Email/Password sign-in** — Firebase console → *Authentication → Sign-in method → Email/Password → Enable*.
2. **Create your staff login(s)** — *Authentication → Users → Add user* (email + password). There is no public sign-up; you add each staff member here.
3. **Authorize your domains** — *Authentication → Settings → Authorized domains* → add the admin host `app.goldendiamondupholstery.co.za` (and the App Hosting URL) so login works in production.
4. **Deploy the Firestore security rules** (locks all data to signed-in staff):
   ```bash
   firebase deploy --only firestore:rules
   ```
   (or paste `firestore.rules` into console → *Firestore → Rules*).
5. Visit `https://app.goldendiamondupholstery.co.za/login` and sign in.

### Running the admin locally
`npm run dev` serves the website at `http://localhost:3000` and the admin at
**`http://app.localhost:3000`** — browsers resolve every `*.localhost` name to
the loopback address, so no hosts-file entry is needed. Add that host to
Firebase's authorized domains too if you want to sign in while developing.

The Firebase **web** config is public and already wired in `lib/firebase.ts`
(override with `NEXT_PUBLIC_FIREBASE_*` env vars if you ever switch projects).

> Data model (Firestore collections): `clients`, `quotes`, `invoices`, and a
> `meta/counters` doc for sequential numbers. Your company details on documents
> come from `lib/site.ts` — update the address/phone/email there.

---

Crafted for excellence.
