import { site } from '@/lib/site';
import { photos, allPhotos, type SitePhoto } from '@/lib/photos';

/**
 * Sitemap with Google image extensions.
 *
 * Written as a route handler rather than Next's `sitemap.ts` convention because
 * MetadataRoute.Sitemap in Next 14 has no `images` field — that arrived in
 * Next 15, and passing it here is silently dropped rather than rejected.
 *
 * Listing images gives Image Search a direct route to files it would otherwise
 * reach slowly: they are lazy-loaded and most sit well down the page.
 */
export const dynamic = 'force-static';

const routes: { path: string; priority: number; images: SitePhoto[] }[] = [
  { path: '', priority: 1, images: [photos.heroSofa, photos.armchairDetail] },
  { path: '/services', priority: 0.9, images: [] },
  { path: '/residential', priority: 0.7, images: [photos.fabricChair] },
  {
    path: '/commercial', priority: 0.7,
    images: [photos.boutiqueInterior, photos.diningSeating, photos.interiorLounge],
  },
  // The portfolio renders the full set.
  { path: '/portfolio', priority: 0.7, images: allPhotos },
  {
    path: '/craftsmanship', priority: 0.7,
    images: [photos.workshopDetail, photos.velvetSeating, photos.armchairDetail],
  },
  { path: '/contact', priority: 0.9, images: [] },
];

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const lastmod = new Date().toISOString();
  const body = routes
    .map(({ path, priority, images }) => {
      const loc = xmlEscape(`${site.url}${path}`);
      const imgs = images
        .map((i) => `    <image:image><image:loc>${xmlEscape(`${site.url}${i.src}`)}</image:loc></image:image>`)
        .join('\n');
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${priority}</priority>`,
        imgs,
        '  </url>',
      ].filter(Boolean).join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
