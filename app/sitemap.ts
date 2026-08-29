import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/residential', '/commercial', '/portfolio', '/craftsmanship', '/contact'];
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'monthly' : 'monthly',
    priority: path === '' ? 1 : path === '/services' || path === '/contact' ? 0.9 : 0.7,
  }));
}
