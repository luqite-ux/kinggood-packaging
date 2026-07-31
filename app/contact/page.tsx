import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { company, IMAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with KINGGOOD for export wooden pallets and wood crates. Request a quote by phone, email or enquiry form.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', type: 'website' },
}

const details = [
  {
    icon: MapPin,
    label: 'Factory address',
    value: company.address,
  },
  {
    icon: Phone,
    label: 'Phone / WeChat',
    value: company.phone,
    href: `tel:${company.phoneRaw}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: Clock,
    label: 'Business hours',
    value: 'Mon – Sat, 8:30 – 18:00 (GMT+8)',
  },
]

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Contact us"
          title="Let's talk about your export packaging"
          description="Share your cargo details and destination — our team will recommend the right pallet or crate and prepare a competitive quote."
          image={IMAGES.factoryExterior}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Info */}
              <div className="lg:col-span-2">
                <Reveal>
                  <h2 className="text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl">
                    Get in touch
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#5a7085] text-pretty">
                    We work with importers, distributors and manufacturers worldwide. Reach out
                    directly or send an enquiry and we&apos;ll respond within one business day.
                  </p>
                </Reveal>

                <div className="mt-10 space-y-4">
                  {details.map((d, i) => (
                    <Reveal key={d.label} delay={i * 0.06}>
                      <div className="flex items-start gap-4 rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#0d4077]/10 text-[#0d4077]">
                          <d.icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#5a7085]">
                            {d.label}
                          </p>
                          {d.href ? (
                            <a
                              href={d.href}
                              className="mt-1 block text-sm font-semibold text-[#0f1b2d] transition-colors hover:text-[#0d4077]"
                            >
                              {d.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm font-semibold text-[#0f1b2d]">{d.value}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <Reveal delay={0.1}>
                  <ContactForm />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
