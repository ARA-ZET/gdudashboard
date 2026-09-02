'use client';
import { useState } from 'react';
import type { SitePhoto } from '@/lib/photos';
import { Swatch } from './Swatch';

/**
 * Renders one of our own photographs, falling back to the on-brand fabric
 * texture panel if the file ever fails to load.
 *
 * Pass `photo` (an entry from lib/photos) to get its intrinsic width/height and
 * default alt text, or `src` + `alt` for a one-off image. The width/height
 * attributes matter: App Hosting serves these files unoptimised, so the browser
 * needs the intrinsic size to reserve space and avoid layout shift, which is a
 * Core Web Vitals signal.
 */
export function Photo({
  photo,
  src,
  alt,
  variant = 'navy',
  className = '',
  priority = false,
}: {
  photo?: SitePhoto;
  src?: string;
  /** Overrides the photo's own alt text when this instance needs different wording. */
  alt?: string;
  variant?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const url = src ?? photo?.src;
  const altText = alt ?? photo?.alt ?? '';

  if (failed || !url) {
    return <Swatch variant={variant} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={altText}
      width={photo?.width}
      height={photo?.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
}
