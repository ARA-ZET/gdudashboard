/**
 * TEMPORARY stock imagery (Unsplash) for look-and-feel only.
 *
 * These load from Unsplash's CDN at runtime in the visitor's browser. They are
 * placeholders — replace them with your own project photos before/soon after
 * launch by dropping files in /public/images and pointing these at local paths
 * (e.g. '/images/portfolio/constantia.jpg'), or by editing the ids below.
 *
 * Every <Photo> falls back to an on-brand fabric-texture panel if an image
 * fails to load, so the site never breaks.
 */

const P = 'https://images.unsplash.com/photo-';

/** Build a sized, cropped Unsplash URL. */
export function stock(id: string, w = 1200): string {
  return `${P}${id}?auto=format&fit=crop&w=${w}&q=70`;
}

// Verified live Unsplash photo IDs (furniture / interiors / upholstery).
export const photos = {
  heroSofa: '1555041469-a586c61ea9bc',
  velvetSeating: '1506898667547-42e22a46e125',
  interiorLounge: '1560185007-cde436f6a4d0',
  armchairDetail: '1541558949596-1d9103f64840',
  livingRoom: '1464564531096-f0163633a18a',
  fabricChair: '1517858818796-d31fc694c92a',
  workshopDetail: '1557618159-7d6fe547ae20',
  modernSofa: '1630585308572-f53438fc684f',
  diningSeating: '1616627547584-bf28cee262db',
  boutiqueInterior: '1567016432779-094069958ea5',
  loungeSuite: '1615800001964-5afd0ae8e49a',
} as const;
