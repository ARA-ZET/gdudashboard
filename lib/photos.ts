/**
 * Real photographs of Golden Diamond Upholstery's own work.
 *
 * Sources live in /public/images/work as pre-sized WebP. Firebase App Hosting
 * does not deploy the Next image optimizer (/_next/image 404s), so nothing is
 * resized at request time — these files ARE the delivered assets. Longest edge
 * is capped at 1600px and each file is quality-tuned to stay under ~145KB.
 *
 * Every file carries the gold Golden Diamond wordmark bottom-right, stamped by
 * scripts/watermark-photos.py, so a saved or hot-linked copy still names the
 * business. Run that script against the originals in /public/pictures — never
 * against these, which are already compressed.
 *
 * `alt` is stored alongside each image so the same honest description is reused
 * everywhere the photo appears, which is what Google Images indexes against.
 * Describe what is actually in the frame; do not keyword-stuff.
 */

export type SitePhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const W = '/images/work';

export const photos = {
  heroSofa: {
    src: `${W}/curved-sofa-cream-scalloped-back.webp`,
    width: 1277, height: 725,
    alt: 'Cream scalloped curved sofa upholstered by Golden Diamond Upholstery, Cape Town',
  },
  velvetSeating: {
    src: `${W}/curved-sofa-gold-crushed-velvet.webp`,
    width: 1193, height: 1038,
    alt: 'Gold crushed-velvet curved sofa custom made by Golden Diamond Upholstery, Cape Town',
  },
  interiorLounge: {
    src: `${W}/bench-seat-grey-channel-tufted.webp`,
    width: 1600, height: 1133,
    alt: 'Grey channel-tufted velvet bench seat with brass legs, upholstered in Cape Town',
  },
  armchairDetail: {
    src: `${W}/tub-armchair-gold-velvet.webp`,
    width: 949, height: 799,
    alt: 'Gold velvet tub armchair custom built by Golden Diamond Upholstery, Cape Town',
  },
  livingRoom: {
    src: `${W}/curved-sofa-cream-with-matching-bed-base.webp`,
    width: 1084, height: 581,
    alt: 'Cream curved sofa and matching upholstered bed base made in Cape Town',
  },
  fabricChair: {
    src: `${W}/tub-chair-cream-scalloped.webp`,
    width: 1280, height: 959,
    alt: 'Cream scalloped tub chair upholstered by Golden Diamond Upholstery, Cape Town',
  },
  workshopDetail: {
    src: `${W}/upholstered-headboard-installation.webp`,
    width: 720, height: 1088,
    alt: 'Upholsterer fitting a diamond-buttoned headboard in a Cape Town bedroom',
  },
  modernSofa: {
    src: `${W}/curved-sofa-charcoal-table-mountain-view.webp`,
    width: 1316, height: 1600,
    alt: 'Charcoal curved sofa in a Cape Town apartment with a Table Mountain view',
  },
  diningSeating: {
    src: `${W}/velvet-sofa-navy-buttoned.webp`,
    width: 1270, height: 824,
    alt: 'Navy buttoned velvet sofa on a metal frame, built in the Cape Town workshop',
  },
  boutiqueInterior: {
    src: `${W}/velvet-sofa-collection-teal-navy-gold.webp`,
    width: 768, height: 768,
    alt: 'Teal, navy and gold velvet sofas from a Golden Diamond Upholstery collection',
  },
  loungeSuite: {
    src: `${W}/crescent-sofa-olive-green-velvet.webp`,
    width: 1502, height: 1600,
    alt: 'Olive green curved crescent sofa custom made by Golden Diamond Upholstery',
  },
  basketweaveHeadboard: {
    src: `${W}/upholstered-headboard-grey-basketweave.webp`,
    width: 1214, height: 835,
    alt: 'Grey basket-weave upholstered headboard with built-in plug points, made to measure',
  },
  tuftedBed: {
    src: `${W}/upholstered-bed-cream-channel-tufted.webp`,
    width: 1280, height: 959,
    alt: 'Cream channel-tufted upholstered bed and headboard in a Cape Town bedroom',
  },
  diamondHeadboard: {
    src: `${W}/upholstered-headboard-black-and-cream-diamond-buttoned.webp`,
    width: 1221, height: 723,
    alt: 'Black and cream diamond-buttoned headboard custom made in Cape Town',
  },
  buttonedHeadboardRoom: {
    src: `${W}/upholstered-headboard-grey-buttoned-bedroom.webp`,
    width: 944, height: 873,
    alt: 'Tall grey buttoned headboard in a styled Cape Town bedroom',
  },
  upholsteredBedSuite: {
    src: `${W}/upholstered-bed-suite-cream.webp`,
    width: 1280, height: 959,
    alt: 'Cream upholstered bed suite with channel-tufted headboard and base, Cape Town',
  },
} satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photos;

/** Every photo, for the image sitemap and any gallery that shows the lot. */
export const allPhotos: SitePhoto[] = Object.values(photos);
