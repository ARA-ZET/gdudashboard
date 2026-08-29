import Link from 'next/link';
import Image from 'next/image';

/** Official Golden Diamond Upholstery wordmark. `light` = for dark backgrounds. */
export function Logo({ light = false }: { light?: boolean }) {
  // On dark/navy surfaces use the gold logo; on light surfaces use the dark logo.
  const src = light ? '/logo/gdulogo-long-gold.png' : '/logo/gdulogo-long-dark.png';
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Golden Diamond Upholstery — home">
      {/* Sized to the rendered height (source art is 1853x396); next/image emits
          a resized AVIF/WebP srcset rather than the full-size PNG. */}
      <Image src={src} alt="Golden Diamond Upholstery" width={187} height={40} priority className="h-9 w-auto md:h-10" />
    </Link>
  );
}
