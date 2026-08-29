import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { faqs } from '@/lib/content';
import { pageMeta, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { JsonLd } from '@/components/JsonLd';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';
import { PageHero, Breadcrumbs, SectionHeading } from '@/components/blocks';

export const metadata: Metadata = pageMeta({
  title: 'Contact & Free Quote',
  path: '/contact',
  description:
    'Get a free upholstery quote in Cape Town. Call, WhatsApp or send us photos of your piece for a fast estimate — or book an in-home assessment. Golden Diamond Upholstery, serving the Western Cape.',
  keywords: ['upholstery quote Cape Town', 'upholstery contact', 'free upholstery quote'],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
        faqSchema(faqs.slice(0, 4)),
      ]} />

      <PageHero
        eyebrow="Get in touch"
        title={<>Begin your <span className="text-gold">free quote</span></>}
        intro="Tell us about your piece and our team will guide you from fabric to finish. Prefer to talk? Call or WhatsApp us directly — we’re happy to help."
      />
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div>
            <SectionHeading eyebrow="Request a quote" title="Send us the details" intro="The more you tell us, the more accurate your estimate. Fields marked are required." />
            <div className="mt-8"><ContactForm /></div>
          </div>

          {/* DIRECT CONTACT */}
          <div className="space-y-6">
            <div className="card p-8">
              <h3 className="text-h3">Direct contact</h3>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-gold"><Icon name="pin" className="h-5 w-5" /></span>
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-label text-gold-700">Atelier</div>
                    <div className="mt-1 text-[15px] text-navy">{site.contact.address.street}<br />{site.contact.address.area}, {site.contact.address.postalCode}</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-gold"><Icon name="phone" className="h-5 w-5" /></span>
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-label text-gold-700">Phone</div>
                    <a href={`tel:${site.contact.phoneHref}`} className="mt-1 block text-[15px] text-navy hover:text-gold-700">{site.contact.phone}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-gold"><Icon name="mail" className="h-5 w-5" /></span>
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-label text-gold-700">Email</div>
                    <a href={`mailto:${site.contact.email}`} className="mt-1 block break-all text-[15px] text-navy hover:text-gold-700">{site.contact.email}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-gold"><Icon name="whatsapp" className="h-5 w-5" /></span>
                  <div>
                    <div className="text-[13px] font-semibold uppercase tracking-label text-gold-700">WhatsApp</div>
                    <a href={`https://wa.me/${site.contact.whatsappHref}`} className="mt-1 block text-[15px] text-navy hover:text-gold-700">Message us</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-8">
              <h3 className="flex items-center gap-2 text-h3"><Icon name="clock" className="h-6 w-6 text-gold" /> Opening hours</h3>
              <ul className="mt-5 space-y-3">
                {site.contact.hours.map((h) => (
                  <li key={h.days} className="flex items-center justify-between border-b border-outline-variant/50 pb-3 text-[15px] last:border-0 last:pb-0">
                    <span className="text-ink-muted">{h.days}</span>
                    <span className="font-semibold text-navy">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] leading-relaxed text-ink-muted">
                Showroom consultations are by appointment — you’ll receive one-on-one guidance from our master upholsterers and access to our full fabric library.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm bg-surface-dim">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before you book" title="Quick answers" />
          <FAQ faqs={faqs.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
