import Link from 'next/link';

/** Official Golden Diamond Upholstery wordmark. `light` = for dark backgrounds. */
export function Logo({ light = false }: { light?: boolean }) {
  // On dark/navy surfaces use the gold logo; on light surfaces use the dark logo.
  const src = light ? '/logo/gdulogo-long-gold.png' : '/logo/gdulogo-long-dark.png';
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Golden Diamond Upholstery — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Golden Diamond Upholstery" className="h-9 w-auto md:h-10" />
    </Link>
  );
}
