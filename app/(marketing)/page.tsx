import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { services, faqs } from '@/lib/content';
import { pageMeta, faqSchema } from '@/lib/seo';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { photos } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { FAQ } from '@/components/FAQ';
import {
  SectionHeading, StatsBand, TrustPillars, ProcessSteps, Testimonials, QuoteCTA, ServiceCard, Eyebrow,
} from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Upholstery Cape Town',
  path: '/',
  description:
    'Golden Diamond Upholstery — expert reupholstery, upholstery repair, bespoke furniture and heritage restoration for homes and businesses across Cape Town. Free quotes, home visits, lifetime frame guarantee.',
});

const chips = ['Reupholstery', 'Repairs', 'Headboards', 'Loose covers', 'Antiques', 'Commercial'];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 texture-tufted opacity-50" />
        <div className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <Eyebrow light>Cape Town&apos;s premier upholstery atelier</Eyebrow>
            <h1 className="mt-5 text-display !text-white">
              Masterful upholstery for <span className="text-gold">home &amp; hospitality</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/75">
              Expert reupholstery, repairs and bespoke furniture — where heritage craftsmanship meets modern durability. Serving discerning homes and businesses across the Western Cape since {site.foundedYear}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-gold">Get a Free Quote <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/portfolio" className="btn btn-outline-light">View Our Work</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/60">
              <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-gold" /> Free home visits</span>
              <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-gold" /> Collection &amp; delivery</span>
              <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-gold" /> Lifetime frame guarantee</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-xl shadow-ambient-lg ring-1 ring-white/10">
              <Photo id={photos.heroSofa} priority width={1400} alt="Bespoke velvet sofa reupholstered by Golden Diamond Upholstery, Cape Town" className="aspect-[4/3] w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-44 rounded-lg bg-surface-white p-5 text-navy shadow-ambient-lg">
              <div className="font-serif text-3xl font-bold text-navy">20+</div>
              <div className="text-[13px] font-semibold">Years of craft</div>
              <div className="text-[11px] text-ink-muted">Serving the Cape since {site.foundedYear}</div>
            </div>
            <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-lg bg-gold px-4 py-3 text-navy shadow-ambient-lg">
              <Icon name="shield" className="h-5 w-5" />
              <span className="text-[13px] font-bold leading-tight">Lifetime<br />Frame Guarantee</span>
            </div>
          </Reveal>
        </div>

        {/* service chips */}
        <div className="relative border-t border-white/10 bg-navy-800/60">
          <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-4 text-[13px] text-white/70">
            <span className="font-semibold uppercase tracking-label text-gold-400">What we do</span>
            {chips.map((c) => <span key={c} className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-gold" />{c}</span>)}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our services"
              title="From a simple repair to a full bespoke build"
              intro="Whatever your furniture needs, our master upholsterers bring it back to its best — or build it new from the frame up."
            />
            <Link href="/services" className="link-underline group text-navy">
              All services <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* HERITAGE + STATS */}
      <section className="section bg-navy text-white">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <Photo id={photos.armchairDetail} variant="rust" alt="Restored heritage armchair in the Golden Diamond Cape Town atelier" className="aspect-[5/4] w-full" />
              </div>
              <div className="absolute -right-5 -top-5 hidden rounded-lg bg-surface-white p-5 text-navy shadow-ambient-lg sm:block">
                <div className="max-w-[13rem] font-serif text-base md:text-lg italic leading-snug">“Craftsmanship is not a technique — it is a devotion.”</div>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHeading
                light
                eyebrow="Rooted in the Cape"
                title="Two decades of uncompromising craft"
                intro="From our Cape Town atelier we draw on the region’s rich heritage — partnering with local artisans and sourcing sustainable materials to deliver world-class upholstery for the most discerning clients."
              />
              <ul className="mt-7 space-y-4">
                {[
                  'Kiln-dried hardwood frames, hand-tied 8-way coil springs',
                  'Traditional techniques applied with modern durability testing',
                  'A curated library of premium local &amp; imported fabrics',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/80">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-[15px]" dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
              <Link href="/craftsmanship" className="btn btn-gold mt-8">Our craftsmanship <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="mt-16">
            <StatsBand light />
          </div>
        </div>
      </section>

      {/* TRUST PILLARS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Why Golden Diamond"
            title="The white-glove standard"
            intro="We don’t just re-cover furniture — we engineer legacies. Every stitch, spring and frame is scrutinised to exceed the demands of luxury living."
          />
          <div className="mt-12"><TrustPillars /></div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x">
          <SectionHeading center eyebrow="How it works" title="A simple, transparent process" intro="Four considered steps from first enquiry to white-glove delivery." />
          <div className="mt-12"><ProcessSteps /></div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured work" title="Signature projects" intro="A glimpse of recent commissions across the Cape — homes, hotels and heritage pieces." />
            <Link href="/portfolio" className="link-underline group text-navy">
              View portfolio <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: 'Constantia Estate', c: 'Residential', v: 'emerald', img: photos.velvetSeating, d: 'Heirloom restoration in Italian mohair velvet over hand-tied coil springs.' },
              { t: 'Boutique Hotel Refit', c: 'Commercial', v: 'gold', img: photos.boutiqueInterior, d: 'Lobby statement pieces and 40+ guest-suite chairs in contract-grade fabric.' },
              { t: 'Cape Dutch Heirloom', c: 'Heritage', v: 'rust', img: photos.armchairDetail, d: 'Antique yellowwood chair, traditionally rebuilt beneath textured wool.' },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 90} className="card group overflow-hidden">
                <div className="relative">
                  <Photo id={p.img} variant={p.v} alt={`${p.t} — ${p.c.toLowerCase()} upholstery project, Cape Town`} className="aspect-[4/3] w-full" />
                  <span className="absolute left-3 top-3 rounded bg-navy/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-gold">{p.c}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-base md:text-lg font-semibold text-navy">{p.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x">
          <SectionHeading center eyebrow="Client stories" title="Trusted by homeowners &amp; businesses" intro="Craftsmanship our clients return to — and recommend." />
          <div className="mt-12"><Testimonials /></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" intro="Everything you need to know before you book. Still unsure? We’re a call away." />
          <FAQ faqs={faqs.slice(0, 5)} />
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
