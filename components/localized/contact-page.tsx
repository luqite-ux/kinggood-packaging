import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { company, IMAGES, type Product } from '@/lib/site'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type ContactPageBodyProps = {
  locale: Locale
  dictionary: Dictionary
  products?: Product[]
}

export function ContactPageBody({ locale, dictionary, products }: ContactPageBodyProps) {
  const pageContent = dictionary.content.contact
  const details = [
    { icon: MapPin, label: dictionary.footer.location, value: company.address },
    { icon: Phone, label: pageContent.phoneWeChat, value: company.phone, href: `tel:${company.phoneRaw}` },
    { icon: Mail, label: dictionary.forms.email, value: company.email, href: `mailto:${company.email}` },
    { icon: Clock, label: pageContent.businessHours, value: pageContent.businessHoursValue },
  ]

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <PageHero
          eyebrow={dictionary.pages.contact.eyebrow}
          title={dictionary.pages.contact.title}
          description={dictionary.pages.contact.description}
          image={IMAGES.factoryExterior}
          crumbs={[
            { label: dictionary.navigation.home, href: '/' },
            { label: dictionary.navigation.contact },
          ]}
          locale={locale}
          dictionary={dictionary}
        />

        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Info */}
              <div className="lg:col-span-2">
                <Reveal>
                  <h2 className="text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl">
                    {dictionary.navigation.contact}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#5a7085] text-pretty">
                    {pageContent.introduction}
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
                  <ContactForm locale={locale} dictionary={dictionary} products={products} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}
