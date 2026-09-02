import type { Metadata } from 'next';
import { site } from './site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string; // e.g. '/services'
};

/** Build consistent per-page metadata (title, canonical, Open Graph, Twitter). */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;
  // Home uses an absolute title (bypasses the layout template); inner pages pass
  // the bare page title and let the root template append the brand exactly once.
  const titleField = path === '/' ? { absolute: site.seoTitle } : title;
  const ogTitle = path === '/' ? site.seoTitle : `${title} | ${site.name}`;
  return {
    title: titleField,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: ogTitle,
      description,
      locale: 'en_ZA',
      images: [{ url: '/images/og.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: ['/images/og.png'],
    },
  };
}

/** schema.org LocalBusiness (HomeAndConstructionBusiness) for the whole site. */
export function localBusinessSchema() {
  const { contact } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: contact.phone,
    ...(contact.email ? { email: contact.email } : {}),
    image: `${site.url}/images/og.png`,
    logo: `${site.url}/logo/gdulogo-long-dark.png`,
    foundingDate: String(site.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    openingHoursSpecification: contact.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: `${a}, Western Cape, South Africa` })),
    sameAs: [site.social.facebook, site.social.instagram, site.social.google].filter(Boolean),
    knowsAbout: [
      'Reupholstery', 'Upholstery repair', 'Furniture restoration',
      'Custom furniture', 'Antique restoration', 'Commercial upholstery',
    ],
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}/#business` },
    areaServed: { '@type': 'City', name: 'Cape Town, Western Cape, South Africa' },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === '/' ? '' : it.path}`,
    })),
  };
}
