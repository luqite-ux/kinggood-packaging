import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  PencilRuler,
  Factory,
  ClipboardCheck,
  Wrench,
  TrendingDown,
  ChevronDown,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/home/hero'
import { Marquee } from '@/components/home/marquee'
import { CountUpStat } from '@/components/home/count-up-stat'
import { Reveal } from '@/components/reveal'
import {
  productsWithShortName as defaultProducts,
  type Product,
  company,
  IMAGES,
} from '@/lib/site'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'
import { buildHomeProductCategories } from '@/lib/home-product-categories'

type HomePageBodyProps = {
  locale: Locale
  dictionary: Dictionary
  products?: Product[]
}

const ICON_MAP: Record<string, React.FC<{ className?: string; 'aria-hidden'?: boolean }>> = {
  PencilRuler:   (p) => <PencilRuler {...p} />,
  Ruler:         (p) => <PencilRuler {...p} />,
  Factory:       (p) => <Factory {...p} />,
  ClipboardCheck:(p) => <ClipboardCheck {...p} />,
  Wrench:        (p) => <Wrench {...p} />,
  TrendingDown:  (p) => <TrendingDown {...p} />,
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${dark ? 'text-[#e8a020]' : 'text-[#8a5600]'}`}>
      <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
      {children}
    </p>
  )
}

export function HomePageBody({
  locale,
  dictionary,
  products = defaultProducts,
}: HomePageBodyProps) {
  const { home, shared } = dictionary.content
  const productCategories = buildHomeProductCategories(shared.categories, products)

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>

        {/* ── 1. Hero ──────────────────────────────────────────────────── */}
        <Hero locale={locale} dictionary={dictionary} />

        {/* ── 2. Marquee ──────────────────────────────────────────────── */}
        <Marquee items={home.marquee} />

        {/* ── 3. Product categories ───────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="categories-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionLabel>{home.products.label}</SectionLabel>
              <h2
                id="categories-heading"
                className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                {home.products.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                {home.products.description}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productCategories.map((cat, i) => (
                <Reveal key={cat.key} delay={i * 0.08}>
                  <div className="group flex flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all duration-300 hover:border-[#0d4077]/40 hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f4f8]">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/65 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-base font-bold text-white">
                        {cat.name}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex-1 text-sm leading-relaxed text-[#5a7085]">
                        {cat.description}
                      </p>
                      <ul
                        className="mt-4 space-y-2"
                        aria-label={home.products.productListLabel.replace('{category}', cat.name)}
                      >
                        {cat.products.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={localizePath(`/products/${p.slug}`, locale)}
                              className="flex items-center gap-2 text-sm text-[#0d4077] hover:underline focus-visible:underline"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-[#e8a020]" aria-hidden />
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={localizePath('/products', locale)}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline focus-visible:underline"
                      >
                        {dictionary.actions.exploreProducts}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Capability metrics ───────────────────────────────────── */}
        <section className="bg-[#0d4077] py-14" aria-label={home.metricsAriaLabel}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
              {shared.stats.map((m) => (
                <div key={m.label} className="border-l-2 border-[#e8a020] pl-4">
                  <dt className="text-2xl font-bold tabular-nums text-white">
                    <CountUpStat value={m.value} suffix={m.suffix} />
                  </dt>
                  <dd className="mt-1 text-xs font-bold uppercase tracking-widest text-white/70">
                    {m.label}
                  </dd>
                  {m.note && (
                    <dd className="mt-0.5 text-[11px] leading-snug text-white/70">{m.note}</dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 5. Why KINGGOOD ────────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="why-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionLabel>{home.why.label}</SectionLabel>
              <h2
                id="why-heading"
                className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                {home.why.title}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {shared.advantages.map((item, i) => {
                const Icon = ICON_MAP[item.icon]
                return (
                  <Reveal key={item.title} delay={i * 0.07}>
                    <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 h-full">
                      {Icon && (
                        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded bg-[#0d4077]/8">
                          <Icon className="h-5 w-5 text-[#0d4077]" aria-hidden />
                        </span>
                      )}
                      <h3 className="text-base font-bold text-[#0f1b2d]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 6. Custom packaging process ────────────────────────────── */}
        <section className="overflow-x-hidden bg-white py-20 lg:py-28" aria-labelledby="process-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
              <Reveal x={-64} y={0}>
                <SectionLabel>{home.process.label}</SectionLabel>
                <h2
                  id="process-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  {home.process.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a7085]">
                  {home.process.description}
                </p>
                <Link
                  href={localizePath('/custom-packaging', locale)}
                  className="mt-8 inline-flex items-center gap-2 rounded bg-[#0d4077] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260] focus-visible:outline-2 focus-visible:outline-[#0d4077]"
                >
                  {dictionary.actions.learnMore}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>

              <div className="mt-12 space-y-4 lg:mt-0">
                {shared.customPackagingSteps.slice(0, 4).map((step, i) => (
                  <Reveal key={step.step} delay={i * 0.09} x={64} y={0}>
                    <div className="flex gap-4 rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-5">
                      <span
                        className="mt-0.5 shrink-0 text-sm font-bold tabular-nums text-[#8a5600]"
                        aria-label={home.process.stepLabel.replace('{step}', step.step)}
                      >
                        {step.step}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#0f1b2d]">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#5a7085]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. Industries ──────────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="industries-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <SectionLabel>{home.industries.label}</SectionLabel>
                <h2
                  id="industries-heading"
                  className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  {home.industries.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  href={localizePath('/industries', locale)}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline"
                >
                  {home.industries.all}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shared.industries.map((ind, i) => (
                <Reveal key={ind.key} delay={i * 0.06}>
                  <div className="rounded-lg border border-[#d8e1eb] bg-white p-6 h-full">
                    <h3 className="text-base font-bold text-[#0f1b2d]">{ind.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                      {ind.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. Factory environment ─────────────────────────────────── */}
        <section
          className="bg-[#071829] py-20 lg:py-28"
          aria-labelledby="factory-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionLabel dark>{home.facility.label}</SectionLabel>
              <h2
                id="factory-heading"
                className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl"
              >
                {home.facility.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                {home.facility.description}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {([
                { src: IMAGES.factoryExterior, label: home.facility.images.factoryExterior },
                { src: IMAGES.productionWorkshop, label: home.facility.images.productionWorkshop },
                { src: IMAGES.crateWarehouse, label: home.facility.images.warehouse },
              ] as const).map((img, i) => (
                <Reveal key={img.src} delay={i * 0.08}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/55 to-transparent" />
                    <p className="absolute bottom-3 left-4 text-xs font-semibold text-white/80">
                      {img.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mt-10 text-center">
              <Link
                href={localizePath('/about', locale)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
              >
                {home.facility.more}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── 9. Quality & delivery ──────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="quality-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <Reveal>
                <SectionLabel>{home.quality.label}</SectionLabel>
                <h2
                  id="quality-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  {home.quality.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a7085]">
                  {home.quality.description}
                </p>
                <ul className="mt-6 space-y-3" aria-label={home.quality.ariaLabel}>
                  {home.quality.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-[#3a5068]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a020]" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="mt-12 lg:mt-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={IMAGES.productionWorkshop}
                    alt={home.quality.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 10. FAQ preview ────────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <SectionLabel>{home.faq.label}</SectionLabel>
              <h2
                id="faq-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] sm:text-4xl"
              >
                {home.faq.title}
              </h2>
            </Reveal>

            <div className="mt-12 space-y-3">
              {shared.faqPreview.map((item) => (
                  <Reveal key={item.q}>
                    <details className="group rounded-lg border border-[#d8e1eb] bg-white">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-[#0f1b2d] hover:bg-[#f7f9fc]">
                        {item.q}
                        <ChevronDown
                          className="h-4 w-4 shrink-0 text-[#5a7085] transition-transform group-open:rotate-180"
                          aria-hidden
                        />
                      </summary>
                      <div className="border-t border-[#d8e1eb] px-5 pb-5 pt-4 text-sm leading-relaxed text-[#5a7085]">
                        {item.a}
                      </div>
                    </details>
                  </Reveal>
                ))}
            </div>

            <Reveal delay={0.1} className="mt-8 text-center">
              <Link
                href={localizePath('/contact', locale)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline"
              >
                {dictionary.navigation.contact}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── RFQ CTA ────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-[#0d4077] py-20 lg:py-28"
          aria-labelledby="rfq-cta-heading"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="rfq-cta-heading"
                className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl"
              >
                {home.cta.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 text-pretty">
                {home.cta.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={localizePath('/contact', locale)}
                  className="inline-flex items-center gap-2 rounded bg-[#e8a020] px-8 py-3.5 text-sm font-bold text-[#3a2200] hover:bg-[#d89018]"
                >
                  {dictionary.actions.requestQuote}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"
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
