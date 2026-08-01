import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Phone, Mail, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { company, type Product } from '@/lib/site'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type ProductDetailPageBodyProps = {
  locale: Locale
  dictionary: Dictionary
  product: Product
  related: Product[]
}

export function ProductDetailPageBody({
  locale,
  dictionary,
  product,
  related,
}: ProductDetailPageBodyProps) {
  const slug = product.slug
  const pageContent = dictionary.content.productDetail

  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>

        {/* ── Hero / intro ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#071829] pt-24 text-white lg:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
          <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">

            {/* Breadcrumb */}
            <nav aria-label={pageContent.breadcrumb} className="mb-8 flex items-center gap-2 text-sm text-white/70">
              <Link href={localizePath('/', locale)} className="hover:text-white">
                {dictionary.navigation.home}
              </Link>
              <span aria-hidden>/</span>
              <Link href={localizePath('/products', locale)} className="hover:text-white">
                {dictionary.navigation.products}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              {/* Main image */}
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Gallery thumbnails */}
                {product.gallery && product.gallery.length > 1 && (
                  <div className="mt-3 flex gap-2">
                    {product.gallery.slice(1).map((src, i) => (
                      <div
                        key={src}
                        className="relative h-16 w-20 shrink-0 overflow-hidden rounded border border-white/10"
                      >
                        <Image
                          src={src}
                          alt={pageContent.galleryView
                            .replace('{product}', product.name)
                            .replace('{number}', String(i + 2))}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>

              {/* Copy */}
              <Reveal delay={0.1}>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e8a020]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  {product.categoryLabel}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {product.tagline}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`${localizePath('/contact', locale)}?product=${encodeURIComponent(product.slug)}`}
                    className="inline-flex items-center gap-2 rounded bg-[#e8a020] px-6 py-3.5 text-sm font-bold text-[#3a2200] transition-colors hover:bg-[#d89018] focus-visible:outline-2 focus-visible:outline-[#e8a020]"
                  >
                    {dictionary.actions.requestQuote}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {company.phone}
                  </a>
                </div>

                {/* Spec chips */}
                <dl className="mt-8 grid grid-cols-2 gap-3">
                  {product.specs.slice(0, 4).map((s) => (
                    <div
                      key={s.label}
                      className="rounded border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-white/70">
                        {s.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Product Overview ─────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-24" aria-labelledby={`${slug}-overview`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Reveal>
                  <h2
                    id={`${slug}-overview`}
                    className="text-2xl font-bold tracking-tight text-[#0f1b2d] sm:text-3xl"
                  >
                    {pageContent.overview}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#5a7085]">
                    {product.summary}
                  </p>
                </Reveal>

                {/* Key Advantages */}
                <Reveal delay={0.05} className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-[#0f1b2d]">
                    {pageContent.advantages}
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {product.highlights.map((h) => (
                      <div
                        key={h.title}
                        className="rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-5"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#0d4077]/10">
                            <Check className="h-4 w-4 text-[#0d4077]" aria-hidden />
                          </span>
                          <h3 className="text-sm font-bold text-[#0f1b2d]">{h.title}</h3>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[#5a7085]">
                          {h.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Materials */}
                <Reveal delay={0.08} className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-[#0f1b2d]">
                    {dictionary.productOverlays.materials}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.materials.map((m) => (
                      <li key={m} className="flex items-start gap-3 text-sm text-[#5a7085]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a020]" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Dimensions */}
                <Reveal delay={0.08} className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-[#0f1b2d]">
                    {dictionary.productOverlays.dimensions}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#5a7085]">
                    {product.dimensions}
                  </p>
                </Reveal>

                {/* Applications */}
                <Reveal delay={0.08} className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-[#0f1b2d]">
                    {dictionary.productOverlays.applications}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.applications.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-sm text-[#5a7085]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8a020]" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Handling notes */}
                <Reveal delay={0.08} className="mt-12">
                  <h2 className="text-xl font-bold tracking-tight text-[#0f1b2d]">
                    {dictionary.productOverlays.handlingNotes}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.handlingNotes.map((n) => (
                      <li key={n} className="flex items-start gap-3 text-sm text-[#5a7085]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d4077]" aria-hidden />
                        {n}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* Sticky spec card */}
              <div className="lg:col-span-1">
                <Reveal delay={0.1}>
                  <div className="sticky top-24 rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-7">
                    <h3 className="text-base font-bold text-[#0f1b2d]">
                      {dictionary.productOverlays.specifications}
                    </h3>
                    <p className="mt-1 text-xs text-[#5a7085]">
                      {pageContent.specificationNote}
                    </p>
                    <dl className="mt-5 divide-y divide-[#d8e1eb]">
                      {product.specs.map((s) => (
                        <div key={s.label} className="flex justify-between gap-4 py-3">
                          <dt className="text-xs text-[#5a7085]">{s.label}</dt>
                          <dd className="text-right text-xs font-semibold text-[#0f1b2d]">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      href={`${localizePath('/contact', locale)}?product=${encodeURIComponent(product.slug)}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#0d4077] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b3260]"
                    >
                      {dictionary.actions.requestQuote}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <a
                      href={`mailto:${company.email}`}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-[#d8e1eb] px-4 py-3 text-sm font-semibold text-[#0d4077] transition-colors hover:border-[#0d4077] hover:bg-white"
                    >
                      <Mail className="h-4 w-4" aria-hidden />
                      {company.email}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related products ─────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-[#f0f4f8] py-16 lg:py-20" aria-labelledby={`${slug}-related`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2
                  id={`${slug}-related`}
                  className="text-xl font-bold tracking-tight text-[#0f1b2d] sm:text-2xl"
                >
                  {pageContent.related}
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.07}>
                    <Link
                      href={localizePath(`/products/${p.slug}`, locale)}
                      className="group flex items-center gap-5 rounded-lg border border-[#d8e1eb] bg-white p-4 transition-all hover:border-[#0d4077]/40 hover:shadow-md"
                    >
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded bg-[#f0f4f8]">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="112px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0f1b2d]">{p.name}</h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#5a7085]">
                          {p.tagline}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0d4077]">
                          {dictionary.actions.viewProduct}
                          <ArrowRight className="h-3 w-3" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back link ─────────────────────────────────────────────── */}
        <div className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={localizePath('/products', locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d4077] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {dictionary.actions.backToProducts}
            </Link>
          </div>
        </div>

      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}
