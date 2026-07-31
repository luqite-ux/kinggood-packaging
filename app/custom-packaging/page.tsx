import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { customPackagingSteps, company, IMAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Custom Packaging',
  description:
    'KINGGOOD designs custom wood packaging around your cargo dimensions, load requirements and destination. Non-standard pallets, crates and cable reels from enquiry to delivery.',
  alternates: { canonical: '/custom-packaging' },
  openGraph: { url: '/custom-packaging', type: 'website' },
}

const capabilities = [
  'Any cargo dimension — we work to your footprint, not ours',
  'Solid wood, plywood or combination structures',
  'Treatment and documentation per destination requirements',
  'Phytosanitary treatment (ISPM 15) support where applicable',
  'Drawing or sample approval before mass production',
  'Third-party inspection support at the factory',
  'Freight coordination from factory to destination',
]

export default function CustomPackagingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Custom Packaging"
          title="Packaging designed around your cargo"
          description="Non-standard pallets, custom crates and wooden cable reels — built to your exact dimensions, load requirements and export documentation needs."
          image={IMAGES.productionWorkshop}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Custom Packaging' }]}
        />

        {/* ── Intro ─────────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="custom-intro">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
              <Reveal>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  Why custom packaging
                </p>
                <h2
                  id="custom-intro"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  Standard sizes don&apos;t fit every cargo
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a7085]">
                  Many export operations require packaging that matches the exact footprint of
                  the goods, the handling equipment in use and the inner dimensions of the
                  containers or trucks. Standard pallet and crate sizes may leave gaps, create
                  overhang or fail to meet the regulatory requirements of the destination market.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#5a7085]">
                  KINGGOOD&apos;s customised manufacturing capacity handles everything from a
                  slightly off-standard pallet dimension through to fully engineered, multi-piece
                  crates for industrial machinery.
                </p>

                <ul className="mt-8 space-y-3">
                  {capabilities.map((c) => (
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
                    alt="KINGGOOD finished goods warehouse"
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
                Our process
              </p>
              <h2
                id="process-heading"
                className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                From requirements to finished packaging
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                Every custom order follows a structured process. Lead time, MOQ and exact costs
                depend on design complexity, material, quantity and delivery requirements.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {customPackagingSteps.map((step, i) => (
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
                Products available
              </p>
              <h2
                id="products-custom"
                className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                Custom options across all product lines
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {([
                {
                  title: 'Custom Pallets',
                  body: 'Solid wood or plywood pallets matched to your carton layout, forklift tine spread, AGV requirements and container inner dimensions.',
                  image: IMAGES.palletSingle,
                  href: '/products/custom-sized-pallet',
                },
                {
                  title: 'Custom Crates',
                  body: 'Solid wood, plywood or open-frame crates for oversized machinery, precision instruments and cargo that cannot be enclosed in a standard box.',
                  image: IMAGES.openFrameCrates,
                  href: '/products/open-frame-crate',
                },
                {
                  title: 'Cable Reels',
                  body: 'Wooden reel structures sized to the cable specification, coil weight and paying-off equipment in use at the destination.',
                  image: IMAGES.cableReelLarge,
                  href: '/products/wooden-cable-reels',
                },
              ] as const).map((card, i) => (
                <Reveal key={card.title} delay={i * 0.07}>
                  <div className="group flex flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all hover:border-[#0d4077]/40 hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f4f8]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071829]/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-base font-bold text-white">{card.title}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex-1 text-sm leading-relaxed text-[#5a7085]">{card.body}</p>
                      <Link
                        href={card.href}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077] hover:underline"
                      >
                        Product details
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
                Ready to discuss your custom requirement?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Share your cargo dimensions, weight and destination. We will propose a structure,
                confirm materials and prepare a competitive quotation.
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
