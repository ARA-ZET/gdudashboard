import Link from 'next/link';
import Image from 'next/image';

/** Official Golden Diamond Upholstery wordmark. `light` = for dark backgrounds. */
export function Logo({ light = false }: { light?: boolean }) {
  // On dark/navy surfaces use the gold logo; on light surfaces use the dark logo.
  const src = light ? '/logo/gdulogo-long-gold.webp' : '/logo/gdulogo-long-dark.webp';
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Golden Diamond Upholstery — home">
      {/* Firebase App Hosting does not deploy the Next image optimizer
          (/_next/image 404s), so next/image serves `src` as-is. The .webp files
          are therefore pre-sized to 2x their rendered height; width/height here
          just reserve the box to avoid layout shift. */}
      <Image src={src} alt="Golden Diamond Upholstery" width={187} height={40} priority className="h-9 w-auto md:h-10" />
    </Link>
  );
}
