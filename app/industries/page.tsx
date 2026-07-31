import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cog, Car, Zap, Cpu, Package, Maximize } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { industries, products, company, IMAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Industries Served',
  description:
    'KINGGOOD supplies wooden pallets, custom crates and cable reels to machinery, automotive, electrical, electronics and logistics industries worldwide.',
  alternates: { canonical: '/industries' },
  openGraph: { url: '/industries', type: 'website' },
}

const ICON_MAP: Record<string, React.FC<{ className?: string; 'aria-hidden'?: boolean }>> = {
  Cog:      (p) => <Cog {...p} />,
  Car:      (p) => <Car {...p} />,
  Zap:      (p) => <Zap {...p} />,
  Cpu:      (p) => <Cpu {...p} />,
  Package:  (p) => <Package {...p} />,
  Maximize: (p) => <Maximize {...p} />,
}

// Map each industry to 2–3 relevant products
const INDUSTRY_PRODUCTS: Record<string, string[]> = {
  machinery:    ['solid-wood-crate', 'open-frame-crate', 'plywood-crate'],
  automotive:   ['eu-standard-solid-wood-pallet', 'solid-wood-crate', 'custom-sized-pallet'],
  electrical:   ['wooden-cable-reels', 'cable-drum-flanges', 'plywood-crate'],
  electronics:  ['plywood-crate', 'solid-wood-crate', 'custom-sized-pallet'],
  logistics:    ['eu-standard-solid-wood-pallet', 'iso-standard-solid-wood-pallet', 'custom-sized-pallet'],
  oversized:    ['open-frame-crate', 'solid-wood-crate', 'custom-sized-pallet'],
}

export default function IndustriesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Industries Served"
          title="Packaging configured to your industry"
          description="KINGGOOD works with manufacturers, exporters and logistics companies across a wide range of sectors. Each industry has specific cargo, handling and regulatory requirements — our products are configured accordingly."
          image={IMAGES.crateWarehouse}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        />

        {/* Industry cards */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="industries-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                Sectors
              </p>
              <h2
                id="industries-heading"
                className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                Industries we supply
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                Each sector card links to the products most commonly configured for that industry.
                For non-standard requirements, share your cargo details and we will advise.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind, i) => {
                const Icon = ICON_MAP[ind.icon]
                const relatedSlugs = INDUSTRY_PRODUCTS[ind.key] ?? []
                const relatedProducts = relatedSlugs
                  .map((slug) => products.find((p) => p.slug === slug))
                  .filter(Boolean) as typeof products

                return (
                  <Reveal key={ind.key} delay={(i % 3) * 0.07}>
                    <div className="flex h-full flex-col rounded-lg border border-[#d8e1eb] bg-white p-7 transition-all duration-300 hover:border-[#0d4077]/30 hover:shadow-lg">
                      {Icon && (
                        <span className="flex h-12 w-12 items-center justify-center rounded bg-[#0d4077]/8">
                          <Icon className="h-6 w-6 text-[#0d4077]" aria-hidden />
                        </span>
                      )}
                      <h3 className="mt-5 text-base font-bold text-[#0f1b2d]">{ind.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a7085]">
                        {ind.description}
                      </p>

                      {relatedProducts.length > 0 && (
                        <div className="mt-5 border-t border-[#d8e1eb] pt-5">
                          <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-[#5a7085]">
                            Related products
                          </p>
                          <ul className="space-y-1.5">
                            {relatedProducts.map((p) => (
                              <li key={p.slug}>
                                <Link
                                  href={`/products/${p.slug}`}
                                  className="flex items-center gap-2 text-sm text-[#0d4077] hover:underline focus-visible:underline"
                                >
                                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#e8a020]" aria-hidden />
                                  {p.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Common requirements band */}
        <section className="bg-[#f0f4f8] py-20 lg:py-24" aria-labelledby="requirements-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  Common requirements
                </p>
                <h2
                  id="requirements-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  What most customers ask us to address
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a7085]">
                  Across all industries, the recurring questions centre on weight capacity,
                  compliance, lead time and the ability to repeat a confirmed specification
                  reliably over multiple orders.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-4">
                  {[
                    {
                      q: 'ISPM 15 / IPPC compliance',
                      a: 'Heat treatment and fumigation support for all destinations that require phytosanitary treatment of wood packaging.',
                    },
                    {
                      q: 'Precise load capacity',
                      a: 'Static and dynamic load ratings are confirmed per design based on cargo weight, stacking height and handling method.',
                    },
                    {
                      q: 'Consistent repeat supply',
                      a: 'Once a specification is confirmed, subsequent orders are produced to the same drawing — no dimension creep or material substitution without approval.',
                    },
                    {
                      q: 'Short and predictable lead times',
                      a: 'Standard products from confirmed stock have shorter lead times; custom items are scheduled from approval. Lead times are confirmed per order.',
                    },
                  ].map((item) => (
                    <li
                      key={item.q}
                      className="rounded-lg border border-[#d8e1eb] bg-white p-5"
                    >
                      <p className="text-sm font-bold text-[#0f1b2d]">{item.q}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#5a7085]">{item.a}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#071829] py-16 lg:py-20" aria-labelledby="industries-cta">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="industries-cta"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Not sure which product fits your industry?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                Share your cargo details — weight, dimensions, destination and handling method —
                and our team will identify the right product for your application.
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
