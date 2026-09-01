import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Icon } from '@/components/Icon';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { photos } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, Breadcrumbs, SectionHeading, StatsBand, QuoteCTA } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Craftsmanship & Materials',
  path: '/craftsmanship',
  description:
    'How we build: kiln-dried hardwood frames, 8-way hand-tied springs and hard-wearing fabrics. The methods behind our upholstery work in Cape Town.',
});

const pillars = [
  {
    eyebrow: 'Foundation',
    icon: 'building',
    title: 'The skeleton of excellence',
    body: 'True luxury is structural. We begin with kiln-dried hardwoods, precision-cut and joined with time-honoured mortise-and-tenon techniques — a framework that resists warping and provides a lifetime of stability.',
    points: [
      ['Kiln-dried hardwood', 'Controlled thermal processing removes ~93% of moisture, eliminating seasonal expansion and warping over decades.'],
      ['Mortise & tenon', 'Heritage joinery for superior load-bearing capacity and architectural integrity.'],
    ],
    v: 'navy',
    img: photos.workshopDetail,
  },
  {
    eyebrow: 'Performance',
    icon: 'shield',
    title: 'Fabric engineering',
    body: 'We source the world’s most resilient textiles — tested for commercial-grade endurance without sacrificing tactile luxury.',
    points: [
      ['Stain resistance', 'Advanced nanocoatings repel liquids and resist soiling, even in high-traffic environments.'],
      ['100k+ double rubs', 'Select fabrics endure over 100,000 double rubs on the Wyzenbeek scale.'],
      ['Fade resistance', 'Solution-dyed acrylics and UV-stabilised yarns hold their hue under the intense Cape sun.'],
    ],
    v: 'gold',
    img: photos.velvetSeating,
  },
  {
    eyebrow: 'Mastery',
    icon: 'crown',
    title: 'The artisan’s touch',
    body: 'Technology provides the materials; human hands provide the soul. Every piece is hand-tied, hand-tufted and meticulously tailored by master upholsterers — a commitment to perfection that cannot be automated.',
    points: [
      ['8-way hand-tied springs', 'Heavy-gauge steel coils interlocked in eight directions with premium Italian twine for adaptive, lifelong suspension.'],
      ['Precision pattern matching', 'Flawless alignment of complex fabric patterns across every seam and cushion.'],
    ],
    v: 'rust',
    img: photos.armchairDetail,
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Craftsmanship', path: '/craftsmanship' }])} />

      <PageHero
        eyebrow="The architecture of comfort"
        title={<>Where heritage technique meets <span className="text-gold">modern durability</span></>}
        intro="Every Golden Diamond piece is engineered from the frame out — traditional methods, scientifically tested materials and master hand-finishing that together earn our lifetime frame guarantee."
      >
        <Link href="/contact" className="btn btn-gold">Commission a Piece <Icon name="arrow" className="h-4 w-4" /></Link>
        <WhatsAppButton context="Craftsmanship page" intent="I’d like to commission a piece." />
      </PageHero>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Craftsmanship', path: '/craftsmanship' }]} />

      {/* PILLARS */}
      <section className="section space-y-20 lg:space-y-28">
        {pillars.map((p, idx) => (
          <div key={p.title} className="container-x">
            <div className={`grid items-center gap-12 lg:grid-cols-2 ${idx % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="overflow-hidden rounded-xl shadow-ambient ring-1 ring-black/5">
                <Photo id={p.img} variant={p.v} alt={`${p.title} — Golden Diamond upholstery craftsmanship, Cape Town`} className="aspect-[5/4] w-full" />
              </Reveal>
              <div>
                <SectionHeading eyebrow={p.eyebrow} title={p.title} intro={p.body} />
                <div className="mt-7 space-y-5">
                  {p.points.map(([t, d]) => (
                    <div key={t} className="flex gap-4">
                      <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-gold"><Icon name="check" className="h-4 w-4" /></span>
                      <div>
                        <div className="text-[15px] font-semibold text-navy">{t}</div>
                        <div className="mt-1 text-[14px] leading-relaxed text-ink-muted">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* STATS */}
      <section className="section-sm bg-navy text-white">
        <div className="container-x">
          <SectionHeading light center eyebrow="Proven quality" title="Craft you can measure" />
          <div className="mt-10"><StatsBand light /></div>
        </div>
      </section>

      {/* PEOPLE + SUSTAINABILITY */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal className="card p-8">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-navy text-gold"><Icon name="crown" className="h-6 w-6" /></span>
            <h3 className="mt-5 text-h3">Meet the artisans</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              Behind every custom piece is a team of dedicated South African craftspeople. Many of our master upholsterers come from families with deep roots in the Cape’s furniture-making heritage, passing down specialised techniques over decades — precision and passion in equal measure.
            </p>
          </Reveal>
          <Reveal delay={100} className="card p-8">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-navy text-gold"><Icon name="leaf" className="h-6 w-6" /></span>
            <h3 className="mt-5 text-h3">Ethical sourcing</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              We partner with sustainable forestry initiatives for responsibly harvested Cape timber, and source top-grain leathers from renowned local tanneries — ensuring environmentally responsible manufacturing and ethical supply chains across every material we touch.
            </p>
          </Reveal>
        </div>
      </section>

      <QuoteCTA context="Craftsmanship page" />
    </>
  );
}
