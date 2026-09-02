import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { pageMeta, breadcrumbSchema, serviceSchema } from '@/lib/seo';
import { Icon } from '@/components/Icon';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { photos } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, Breadcrumbs, SectionHeading, QuoteCTA } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Commercial & Contract Upholstery',
  path: '/commercial',
  description:
    'Contract upholstery for Cape Town hotels, restaurants, bars and offices. Hard-wearing fabrics, volume production and on-site installation. Request a quote.',
});

const standards = [
  { icon: 'verified', t: '100k+ double-rub fabrics', d: 'Commercial-grade weaves that withstand excessive wear without pilling or fading.' },
  { icon: 'shield', t: 'Fire-retardant & compliant', d: 'Ignition-resistant, contract-grade materials that meet safety standards.' },
  { icon: 'building', t: '100+ rooms scaled', d: 'Production lines for high-volume, simultaneous manufacturing without losing detail.' },
  { icon: 'sun', t: 'Stain & moisture barriers', d: 'Hydrophobic, easy-clean treatments built for tourism-grade traffic.' },
];

const sectors = [
  { t: 'Hospitality', d: 'From grand lobby statement pieces to meticulous guest-suite seating, engineered for 24/7 use while staying pristine and welcoming.', items: ['Lobby & public-area seating', 'Guest-suite furniture', 'Headboards & ottomans'], v: 'gold', img: photos.boutiqueInterior },
  { t: 'Dining & nightlife', d: 'Banquettes and booths are the architectural anchor of Cape Town’s top venues. We engineer them to survive spills, friction and heavy use.', items: ['Banquettes & booths', 'Bar & lounge seating', 'Custom profiling to your floor plan'], v: 'navy', img: photos.diningSeating },
  { t: 'Workplace & retail', d: 'Boardroom, reception and office seating re-covered or built to brief — durable, on-brand and comfortable through the working day.', items: ['Office & boardroom chairs', 'Reception & breakout seating', 'Retail & showroom pieces'], v: 'rust', img: photos.interiorLounge },
];

export default function CommercialPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Commercial', path: '/commercial' }]),
        serviceSchema('Commercial Upholstery', 'Contract-grade upholstery for Cape Town hotels, restaurants, offices and venues.', '/commercial'),
      ]} />

      <PageHero
        eyebrow="Commercial excellence"
        title={<>Upholstery for <span className="text-gold">hotels &amp; venues</span></>}
        intro="High-performance upholstery for Cape Town’s leading hotels, restaurants and vineyards — unmatched high-traffic durability for tourism-heavy venues, without compromising on finish."
        photo={photos.basketweaveHeadboard}
      >
        <Link href="/contact" className="btn btn-gold"><span className="sm:hidden">Enquire</span><span className="hidden sm:inline">Discuss Your Project</span> <Icon name="arrow" className="h-4 w-4" /></Link>
        <WhatsAppButton intent="I’d like to discuss a commercial upholstery project." />
        <Link href="/portfolio" className="btn btn-outline-light"><span className="sm:hidden">Case studies</span><span className="hidden sm:inline">View case studies</span></Link>
      </PageHero>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Commercial', path: '/commercial' }]} />

      {/* STANDARDS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="Uncompromising standards" title="Artisanal craft at industrial scale" intro="Every piece in a 100-room refit matches the exact quality of the first prototype." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((s, i) => (
              <Reveal key={s.t} delay={i * 70} className="card p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-navy text-gold"><Icon name={s.icon as any} className="h-6 w-6" /></span>
                  <h3 className="text-[16px] font-semibold text-navy">{s.t}</h3>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x space-y-6">
          <SectionHeading eyebrow="Sectors we serve" title="Built for how your space is used" />
          <div className="grid gap-6 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <Reveal key={s.t} delay={i * 80} className="card overflow-hidden">
                <Photo photo={s.img} variant={s.v} alt={`${s.t} commercial upholstery by Golden Diamond, Cape Town`} className="aspect-[16/9] w-full" />
                <div className="p-7">
                  <h3 className="text-h3">{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{s.d}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14px] text-navy"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="From prototype to installation" title="A managed commercial process" intro="Our dedicated commercial team manages every project end to end." />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Consultation & spec', d: 'Material selection based on foot-traffic analysis.' },
              { t: 'Prototyping', d: 'Single-unit builds for physical review and testing.' },
              { t: 'Volume production', d: 'Consistent quality control across hundreds of units.' },
              { t: 'Installation', d: 'White-glove delivery and on-site assembly.' },
            ].map((step, i) => (
              <Reveal key={step.t} delay={i * 80}>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-serif text-base md:text-lg font-bold text-gold">{i + 1}</span>
                  <span className="h-px flex-1 bg-outline-variant" />
                </div>
                <h3 className="mt-5 text-base md:text-lg font-semibold text-navy">{step.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{step.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA
        title="Transform your commercial space"
        intro="Whether it’s a multi-floor hotel refit or a flagship tasting room, our commercial team will manage it from prototype to installation."
      />
    </>
  );
}
