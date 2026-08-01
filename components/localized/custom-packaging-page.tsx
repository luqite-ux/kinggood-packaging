import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { company, IMAGES } from '@/lib/site'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type CustomPackagingPageBodyProps = {
  locale: Locale
  dictionary: Dictionary
}

export function CustomPackagingPageBody({ locale, dictionary }: CustomPackagingPageBodyProps) {
  const { customPackaging: pageContent, shared } = dictionary.content
  const productImages = [IMAGES.palletSingle, IMAGES.openFrameCrates, IMAGES.cableReelLarge]
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <PageHero
          eyebrow={dictionary.pages.customPackaging.eyebrow}
          title={dictionary.pages.customPackaging.title}
          description={dictionary.pages.customPackaging.description}
          image={IMAGES.productionWorkshop}
          crumbs={[
            { label: dictionary.navigation.home, href: '/' },
            { label: dictionary.navigation.customPackaging },
          ]}
          locale={locale}
          dictionary={dictionary}
        />

        {/* ── Intro ─────────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="custom-intro">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  {pageContent.introLabel}
                </p>
                <h2
                  id="custom-intro"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  {pageContent.introTitle}
                </h2>
                {pageContent.introParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-relaxed text-[#5a7085]">
                    {paragraph}
                  </p>
                ))}

                <ul className="mt-8 space-y-3">
                  {pageContent.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-[#3a5068]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8a5600]" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="mt-12 lg:mt-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={IMAGES.crateWarehouse}
                    alt={pageContent.warehouseImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Process steps ─────────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                {pageContent.processLabel}
              </p>
              <h2
                id="process-heading"
                className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                {pageContent.processTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                {pageContent.processDescription}
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shared.customPackagingSteps.map((step, i) => (
                <Reveal key={step.step} delay={(i % 3) * 0.07}>
                  <div className="flex flex-col rounded-lg border border-[#d8e1eb] bg-white p-7 h-full">
                    <span className="text-3xl font-bold tabular-nums text-[#8a5600]">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-base font-bold text-[#0f1b2d]">{step.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a7085]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we can build ─────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="products-custom">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                {pageContent.productsLabel}
              </p>
              <h2
                id="products-custom"
                className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                {pageContent.productsTitle}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageContent.productCards.map((card, i) => (
                <Reveal key={card.title} delay={i * 0.07}>
                  <div className="group flex flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all hover:border-[#0d4077]/40 hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f4f8]">
                      <Image
                        src={productImages[i]}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-base font-bold text-white">{card.title}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex-1 text-sm leading-relaxed text-[#5a7085]">{card.description}</p>
                      <Link
                        href={localizePath(card.href, locale)}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline"
                      >
                        {dictionary.actions.viewProduct}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RFQ CTA ───────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-[#0d4077] py-20 lg:py-24"
          aria-labelledby="custom-cta"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="custom-cta"
                className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl"
              >
                {pageContent.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {pageContent.ctaDescription}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={localizePath('/contact', locale)}
                  className="inline-flex items-center gap-2 rounded bg-[#e8a020] px-7 py-3.5 text-sm font-bold text-[#3a2200] hover:bg-[#d89018]"
                >
                  {dictionary.actions.requestQuote}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"
                >
                  {company.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}
