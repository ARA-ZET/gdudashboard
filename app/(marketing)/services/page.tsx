import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { services, faqs } from '@/lib/content';
import { pageMeta, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo';
import { photos } from '@/lib/photos';
import { Icon } from '@/components/Icon';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { FAQ } from '@/components/FAQ';
import { PageHero, Breadcrumbs, SectionHeading, ServiceCard, ProcessSteps, QuoteCTA } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Upholstery Services Cape Town',
  path: '/services',
  description:
    'Reupholstery, upholstery repair, headboards, loose covers, antique restoration and custom furniture in Cape Town. Free quotes, collection and delivery.',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
        faqSchema(faqs),
        ...services.map((s) => serviceSchema(s.title, s.description, `/services#${s.slug}`)),
      ]} />

      <PageHero
        eyebrow="Upholstery repair & services"
        title={<>Upholstery services in <span className="text-gold">Cape Town</span></>}
        intro="From a quick seam repair to a full custom build, our Cape Town workshop covers every kind of upholstery work — for homes and businesses alike."
        photo={photos.velvetSeating}
      >
        <Link href="/contact" className="btn btn-gold"><span className="sm:hidden">Free Quote</span><span className="hidden sm:inline">Get a Free Quote</span> <Icon name="arrow" className="h-4 w-4" /></Link>
        <WhatsAppButton />
        <a href={`tel:${site.contact.phoneHref}`} className="btn btn-outline-light"><Icon name="phone" className="h-4 w-4 shrink-0" /><span className="sm:hidden">Call</span><span className="hidden sm:inline">{site.contact.phone}</span></a>
      </PageHero>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />

      {/* SERVICES GRID */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="What we offer" title="Comprehensive upholstery, one trusted workshop" intro="Browse our core services below. Not sure what you need? Send us a photo and we’ll advise — honestly — on the most cost-effective route." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* MATERIALS / QUALITY STRIP */}
      <section className="section-sm bg-navy text-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeading light eyebrow="Built to last" title="Materials that earn their place" />
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
            {[
              { n: '100k+', l: 'Double-rub fabrics', s: 'Contract-grade weaves tested on the Wyzenbeek scale' },
              { n: '8-way', l: 'Hand-tied springs', s: 'The gold standard for lifelong, adaptive support' },
              { n: '93%', l: 'Moisture removed', s: 'Kiln-dried frames that resist warping for decades' },
            ].map((m, i) => (
              <Reveal key={m.l} delay={i * 80} className="border-l-2 border-gold/40 pl-5">
                <div className="font-serif text-4xl font-bold text-gold">{m.n}</div>
                <div className="mt-1 text-[15px] font-semibold text-white">{m.l}</div>
                <div className="mt-1 text-[13px] text-white/55">{m.s}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading center eyebrow="How it works" title="From enquiry to delivery" intro="A transparent, four-step process designed around your convenience." />
          <div className="mt-12"><ProcessSteps /></div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x">
          <SectionHeading eyebrow="Where we work" title="Serving Cape Town &amp; the Western Cape" intro="We collect and deliver across the metro and beyond. A selection of the areas we regularly serve:" />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {site.serviceAreas.map((a) => (
              <span key={a} className="rounded-md border border-outline-variant bg-surface-white px-3.5 py-2 text-[13px] font-medium text-navy">{a}</span>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-ink-muted">Don’t see your suburb? <Link href="/contact" className="font-semibold text-navy underline decoration-gold underline-offset-2">Get in touch</Link> — chances are we cover it.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Questions" title="Upholstery, answered" intro="The things clients most often ask before booking." />
          <FAQ faqs={faqs} />
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
