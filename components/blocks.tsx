import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { processSteps, trustPillars, publishedTestimonials, type Service } from '@/lib/content';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';
import { Swatch } from './Swatch';
import { ReviewCarousel } from './ReviewCarousel';
import { WhatsAppButton } from './WhatsAppButton';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-h2 ${light ? '!text-white' : ''}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-ink-muted'}`}>{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 texture-tufted opacity-60" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-navy-600/40 blur-3xl" />
      <div className="container-x relative py-20 md:py-28">
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-display !text-white">{title}</h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/75">{intro}</p>
          {children && <div className="mt-9 flex flex-wrap items-center gap-4">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-outline-variant/50 bg-surface">
      <ol className="container-x flex flex-wrap items-center gap-2 py-3 text-[13px] text-ink-muted">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span className="text-outline">/</span>}
            {i < items.length - 1 ? (
              <Link href={it.path} className="hover:text-navy">{it.name}</Link>
            ) : (
              <span className="font-medium text-navy">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StatsBand({ light = false }: { light?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-px overflow-hidden rounded-lg lg:grid-cols-4 ${light ? 'bg-white/10' : 'bg-outline-variant/40'}`}>
      {site.stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 80} className={`${light ? 'bg-navy' : 'bg-surface-white'} p-6 lg:p-8`}>
          <div className={`font-serif text-3xl font-bold lg:text-4xl ${light ? 'text-gold' : 'text-navy'}`}>{s.value}</div>
          <div className={`mt-1 text-[14px] font-semibold ${light ? 'text-white' : 'text-navy'}`}>{s.label}</div>
          <div className={`mt-0.5 text-[12px] ${light ? 'text-white/50' : 'text-ink-muted'}`}>{s.sub}</div>
        </Reveal>
      ))}
    </div>
  );
}

export function TrustPillars() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {trustPillars.map((p, i) => (
        <Reveal key={p.title} delay={i * 80} className="card p-7">
          <span className="grid h-12 w-12 place-items-center rounded-md bg-navy text-gold">
            <Icon name={p.icon as IconName} className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-base md:text-lg font-semibold text-navy">{p.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{p.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function ProcessSteps({ light = false }: { light?: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <Reveal key={step.title} delay={i * 90}>
          <div className="flex items-center gap-4">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-serif text-base md:text-lg font-bold ${light ? 'bg-gold text-navy' : 'bg-navy text-gold'}`}>{i + 1}</span>
            <span className={`h-px flex-1 ${light ? 'bg-white/15' : 'bg-outline-variant'}`} />
          </div>
          <h3 className={`mt-5 text-base md:text-lg font-semibold ${light ? 'text-white' : 'text-navy'}`}>{step.title}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${light ? 'text-white/65' : 'text-ink-muted'}`}>{step.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Testimonials() {
  return <ReviewCarousel reviews={publishedTestimonials} />;
}

export function QuoteCTA({
  title = 'Ready to bring your furniture back to life?',
  intro = 'Book a free, no-obligation quote or in-home assessment anywhere in Cape Town. Our master upholsterers will guide you from fabric to finish.',
  context = 'quote section',
}: {
  title?: string;
  intro?: string;
  /** Names this CTA in the prefilled WhatsApp message, e.g. 'Commercial page'. */
  context?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 texture-tufted opacity-50" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gold/10 to-transparent" />
      <div className="container-x relative py-20 text-center md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-h2 !text-white">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/70">{intro}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">Get a Free Quote <Icon name="arrow" className="h-4 w-4" /></Link>
            <WhatsAppButton context={context} />
            <a href={`tel:${site.contact.phoneHref}`} className="btn btn-outline-light">
              <Icon name="phone" className="h-4 w-4" /> {site.contact.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div id={service.slug} className="card group scroll-mt-28 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient-lg">
      <span className="grid h-14 w-14 place-items-center rounded-md bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
        <Icon name={service.icon as IconName} className="h-7 w-7" />
      </span>
      <h3 className="mt-6 text-h3">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{service.description}</p>
      <ul className="mt-5 space-y-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-navy">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FabricStrip() {
  const swatches = ['navy', 'gold', 'emerald', 'rust', 'sand', 'bone'];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {swatches.map((s) => (
        <Swatch key={s} variant={s} className="h-12 w-12 rounded-md ring-1 ring-black/5" />
      ))}
    </div>
  );
}
