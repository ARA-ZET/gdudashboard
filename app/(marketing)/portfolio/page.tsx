import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/lib/content';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { photos } from '@/lib/photos';
import { Icon } from '@/components/Icon';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Reveal } from '@/components/Reveal';
import { Photo } from '@/components/Photo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero, Breadcrumbs, SectionHeading, StatsBand, QuoteCTA } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Upholstery Portfolio',
  path: '/portfolio',
  description:
    'Upholstery and furniture restoration projects completed across Cape Town — residential, commercial and heritage pieces, with the materials used on each.',
});

const collections = [
  { name: 'Sofas & Seating', tagline: 'Curved sofas, benches and lounge pieces built on shaped frames and finished by hand.' },
  { name: 'Headboards & Beds', tagline: 'Made-to-measure headboards and bed bases — buttoned, channel-tufted or woven.' },
  { name: 'Chairs', tagline: 'Tub chairs and occasional seating, upholstered to order.' },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])} />

      <PageHero
        eyebrow="Gallery of prestige"
        title={<>A portfolio built on <span className="text-gold">proof</span></>}
        intro="Each project below showcases a specific craftsmanship challenge — the materials, techniques and problem-solving behind pieces that preserve heritage and elevate modern spaces."
        photo={photos.boutiqueInterior}
      >
        <Link href="/contact" className="btn btn-gold"><span className="sm:hidden">Start Now</span><span className="hidden sm:inline">Start Your Project</span> <Icon name="arrow" className="h-4 w-4" /></Link>
        <WhatsAppButton intent="I saw your portfolio and would like a quote." />
      </PageHero>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }]} />

      {/* TRACK RECORD STATS */}
      <section className="section-sm">
        <div className="container-x">
          <SectionHeading center eyebrow="Our track record" title="Two decades of measurable craft" intro="Numbers that reflect the trust placed in us across the Western Cape." />
          <div className="mt-10"><StatsBand /></div>
          <p className="mt-6 text-center text-[12px] text-ink-muted">Figures shown are illustrative placeholders — update them to your verified totals before launch.</p>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="pb-20">
        <div className="container-x space-y-16">
          {collections.map((col) => {
            const items = projects.filter((p) => p.category === col.name);
            if (items.length === 0) return null;
            return (
              <div key={col.name}>
                <div className="mb-8 max-w-2xl">
                  <h2 className="text-h2">{col.name}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">{col.tagline}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 80} className="card group flex flex-col overflow-hidden">
                      <div className="relative">
                        <Photo photo={p.image} variant={p.swatch} alt={`${p.title} — ${p.category.toLowerCase()} upholstery project by Golden Diamond Upholstery, Cape Town`} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                        <span className="absolute left-3 top-3 rounded bg-navy/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-gold">{p.category}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-base md:text-lg font-semibold text-navy">{p.title}</h3>
                        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">{p.summary}</p>
                        <div className="mt-5 border-t border-outline-variant/60 pt-4">
                          <div className="text-[11px] font-semibold uppercase tracking-label text-gold-700">Materials</div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {p.materials.map((m) => (
                              <span key={m} className="rounded bg-surface-dim px-2 py-1 text-[11px] font-medium text-navy">{m}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <QuoteCTA title="Let’s build your vision" intro="Whether it’s restoring a cherished heirloom or outfitting a flagship venue, our master upholsterers are ready to bring your project to life." />
    </>
  );
}
