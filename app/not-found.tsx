import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Analytics } from '@/components/Analytics';

export default function NotFound() {
  return (
    <section className="bg-navy text-white">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="font-serif text-7xl font-bold text-gold">404</div>
        <h1 className="mt-4 text-h2 !text-white">This page has been re-covered</h1>
        <p className="mt-4 max-w-md text-white/70">
          The page you’re looking for isn’t here. Let’s get you back to something beautiful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-gold">Back to home <Icon name="arrow" className="h-4 w-4" /></Link>
          <Link href="/services" className="btn btn-outline-light">Browse services</Link>
        </div>
      </div>
      <Analytics />
    </section>
  );
}
