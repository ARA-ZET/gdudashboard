import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { hasTestimonials } from '@/lib/content';
import { pageMeta, breadcrumbSchema, serviceSchema } from '@/lib/seo';
import { Icon } from '@/components/Icon';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { photos } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, Breadcrumbs, SectionHeading, ProcessSteps, Testimonials, QuoteCTA } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Residential Upholstery Cape Town',
  path: '/residential',
  description:
    'Reupholster your couch, sofa, armchair or dining chairs in Cape Town. Free home visits, premium fabrics, collection and delivery. Get a free quote today.',
});

const offerings = [
  { icon: 'sofa', t: 'Sofas & lounge suites', d: 'Full re-covers and rebuilds that return your favourite seating to better-than-new.' },
  { icon: 'crown', t: 'Armchairs & wingbacks', d: 'From modern occasional chairs to classic wingbacks and recliners.' },
  { icon: 'bed', t: 'Headboards & beds', d: 'Made-to-measure upholstered headboards and bed bases in any fabric.' },
  { icon: 'wrench', t: 'Repairs & refreshes', d: 'Sagging seats, worn foam, loose frames and tired cushions, revived.' },
  { icon: 'layers', t: 'Loose covers & cushions', d: 'Tailored slipcovers and scatter cushions for an easy seasonal refresh.' },
  { icon: 'diamond', t: 'Dining chairs', d: 'Re-cover a full set in hard-wearing, easy-clean fabrics or leather.' },
];

export default function ResidentialPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Residential', path: '/residential' }]),
        serviceSchema('Residential Upholstery', 'Reupholstery, repair and custom furniture for Cape Town homes.', '/residential'),
      ]} />

      <PageHero
        eyebrow="For the Cape home"
        title={<>Elevating <span className="text-gold">Cape elegance</span>, one room at a time</>}
        intro="We reupholster and repair the furniture in Cape Town homes, build custom headboards and seating to order, and restore family pieces that are worth keeping."
      >
        <Link href="/contact" className="btn btn-gold">Book a Free Home Visit <Icon name="arrow" className="h-4 w-4" /></Link>
        <WhatsAppButton context="Residential page" intent="I’d like a quote for furniture in my home." />
        <Link href="/portfolio" className="btn btn-outline-light">See residential work</Link>
      </PageHero>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Residential', path: '/residential' }]} />

      {/* OFFERINGS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="What we do for homes" title="Every piece in the house" intro="Whether it’s a single tired armchair or a whole living room, we bring the same care to every commission." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <Reveal key={o.t} delay={i * 70} className="card p-7">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-navy text-gold"><Icon name={o.icon as any} className="h-6 w-6" /></span>
                <h3 className="mt-5 text-base md:text-lg font-semibold text-navy">{o.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{o.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE RESTORATION FEATURE */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-xl shadow-ambient ring-1 ring-black/5">
            <Photo id={photos.fabricChair} variant="navy" alt="Heritage upholstered chair restored by Golden Diamond Upholstery, Cape Town" className="aspect-[5/4] w-full" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Heritage restoration" title="Family heirlooms, faithfully renewed" intro="Historic Cape Dutch finds and treasured family pieces carry a narrative that mass-production can’t replicate. We preserve that story — every scratch and contour honoured — while renewing comfort for generations to come." />
            <ul className="mt-6 space-y-3">
              {['Structural assessment & stabilisation', 'Traditional coil-spring & stuffed foundations', 'Refinishing, conservation & insurance quotes'].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-navy"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="The residential journey" title="Considered, collaborative, unhurried" intro="A transparent journey from the first spark of inspiration to the moment your piece returns home." />
          <div className="mt-12"><ProcessSteps /></div>
        </div>
      </section>

      {/* TESTIMONIALS — hidden until at least one genuine review is added. */}
      {hasTestimonials && (
        <section className="section-sm bg-surface-dim">
          <div className="container-x">
            <SectionHeading center eyebrow="Homeowner stories" title="Loved by Cape Town homes" />
            <div className="mt-12"><Testimonials /></div>
          </div>
        </section>
      )}

      <QuoteCTA context="Residential page" title="Ready to refresh your home?" intro="Book a free in-home assessment anywhere in Cape Town. We’ll bring fabric samples and honest advice." />
    </>
  );
}
