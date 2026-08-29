'use client';
import { useState } from 'react';
import { stock } from '@/lib/photos';
import { Swatch } from './Swatch';

/**
 * Renders a stock/real photo with a graceful fallback to the on-brand fabric
 * texture panel if the image fails to load. Use `id` for an Unsplash id (from
 * lib/photos) or `src` for a direct/local URL.
 */
export function Photo({
  id,
  src,
  alt,
  variant = 'navy',
  className = '',
  width = 1200,
  priority = false,
}: {
  id?: string;
  src?: string;
  alt: string;
  variant?: string;
  className?: string;
  width?: number;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const url = src ?? (id ? stock(id, width) : undefined);

  if (failed || !url) {
    return <Swatch variant={variant} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} object-cover`}
    />
  );
}
