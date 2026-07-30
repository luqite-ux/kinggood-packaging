import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { categories, company, IMAGES } from '@/lib/site'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Wooden pallets, heavy-duty wood crates and cable reels — configured around your cargo, handling equipment and destination requirements.',
}

export default async function ProductsPage() {
  const dbProducts = await fetchProductsData()
  const productCategories = categories.map((category) => ({
    ...category,
    products: dbProducts.filter((product) => product.category === category.key),
  }))
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Products"
          title="Wood packaging for every logistics requirement"
          description="Standard pallets, engineered crates and cable reel structures — each available in standard configurations or designed to project-specific dimensions and structural requirements."
          image={IMAGES.crateWarehouse}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        />

        {productCategories.map((cat, catIndex) => (
          <section
            key={cat.key}
            id={cat.key}
            className={`py-20 lg:py-24 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-[#f0f4f8]'}`}
            aria-labelledby={`cat-${cat.key}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  {catIndex === 0 ? 'Pallets' : catIndex === 1 ? 'Crates' : 'Cable Reels'}
                </p>
                <h2
                  id={`cat-${cat.key}`}
                  className="mt-3 text-2xl font-bold tracking-tight text-[#0f1b2d] sm:text-3xl"
                >
                  {cat.name}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                  {cat.description}
                </p>
              </Reveal>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.products.map((product, i) => (
                  <Reveal key={product.slug} delay={(i % 3) * 0.07}>
                    <article className="group flex flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all duration-300 hover:border-[#0d4077]/40 hover:shadow-lg">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f4f8]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded bg-[#0d4077] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                          {product.categoryLabel}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-base font-bold text-[#0f1b2d]">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                          {product.tagline}
                        </p>

                        {/* 3 highlights */}
                        <ul className="mt-4 flex-1 space-y-1.5">
                          {product.highlights.slice(0, 3).map((h) => (
                            <li
                              key={h.title}
                              className="flex items-start gap-2 text-sm text-[#3a5068]"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#e8a020]"
                                aria-hidden
                              />
                              {h.title}
                            </li>
                          ))}
                        </ul>

                        {/* Actions */}
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1.5 rounded bg-[#0d4077] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0b3260]"
                          >
                            View Details
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                          <Link
                            href={`/contact?product=${product.slug}`}
                            className="inline-flex items-center gap-1.5 rounded border border-[#d8e1eb] px-4 py-2 text-xs font-semibold text-[#0d4077] transition-colors hover:border-[#0d4077] hover:bg-[#f0f4f8]"
                          >
                            Request a Quote
                          </Link>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* RFQ CTA */}
        <section className="bg-[#071829] py-16 lg:py-20" aria-labelledby="products-cta">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="products-cta"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Not sure which product suits your requirement?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                Share your cargo weight, dimensions and destination. We will identify the right
                product and confirm specifications for your project.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded bg-[#e8a020] px-7 py-3.5 text-sm font-bold text-[#3a2200] hover:bg-[#d89018]"
                >
                  Request a Quote
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
      <SiteFooter />
    </>
  )
}
