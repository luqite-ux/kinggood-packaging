import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Factory, Cog, Warehouse, Ship } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CountUp } from '@/components/count-up'
import { company, stats, IMAGES } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'KINGGOOD Packaging Materials (Nantong) Co., Ltd. — a full-chain wood packaging manufacturer since 2010 with a 36,300 m² facility and 12 production lines in Nantong, Jiangsu.',
}

const capabilities = [
  {
    icon: Factory,
    title: '5 Production Workshops',
    description:
      'A 36,300 m² facility organised into five dedicated workshops covering the full pallet and crate manufacturing process.',
  },
  {
    icon: Cog,
    title: '12 Production Lines',
    description:
      '5 fully automated lines plus 7 customised lines to balance high-volume output with bespoke orders.',
  },
  {
    icon: Warehouse,
    title: '3,000+ Pallets / Day',
    description:
      'High daily pallet capacity with flexible scheduling for peak-season restocking and urgent export orders.',
  },
  {
    icon: Ship,
    title: 'Global Export Logistics',
    description:
      'Door-to-door freight partnerships from factory to overseas warehouse, with combined container shipping.',
  },
]

const values = [
  'ISPM 15 compliant heat treatment support',
  'Full log-to-assembly localised supply chain',
  'CNC precision cutting and automatic hot-pressing',
  'Eco-friendly adhesives meeting target market standards',
  'Flexible customisation for any cargo dimension',
  'Stable supply with controllable raw material cost',
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About KINGGOOD"
          title="A full-chain export wood packaging manufacturer"
          description={`${company.legalName} has engineered wooden pallets and heavy-duty crates for global trade since ${company.founded}.`}
          image={IMAGES.factoryExterior}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        />

        {/* ── Story ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="about-story">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={IMAGES.productionWorkshop}
                    alt="KINGGOOD production workshop"
                    width={800}
                    height={640}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                    <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                    Our story
                  </p>
                  <h2
                    id="about-story"
                    className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                  >
                    Built for export from the ground up
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5a7085]">
                    <p>
                      Founded in {company.founded}, KINGGOOD grew alongside China&apos;s most
                      concentrated wood-processing regions. That location gives us a rare
                      advantage: a complete local chain from log drying and cutting to assembly
                      and treatment — all under our control.
                    </p>
                    <p>
                      Today our 36,300 m² facility runs five workshops and twelve production
                      lines, shipping ISPM-compliant pallets and crates to buyers across Europe,
                      North America and beyond. We combine scale, precision and compliance so
                      your cargo clears customs and arrives protected.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {values.map((v) => (
                      <li key={v} className="flex items-start gap-2.5 text-sm text-[#3a5068]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8a5600]" aria-hidden />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats band ───────────────────────────────────────────── */}
        <section className="bg-[#0d4077] py-14" aria-label="Company statistics">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="border-l-2 border-[#e8a020] pl-4">
                    <dt className="text-3xl font-bold tabular-nums text-white lg:text-4xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 text-xs font-bold uppercase tracking-widest text-white/70">
                      {s.label}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Facility photo ───────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="facility-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                Our facility
              </p>
              <h2
                id="facility-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                36,300 m² in Nantong, Jiangsu
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                Our facility integrates the complete production chain — from raw material
                processing through component machining, assembly, treatment and finished goods
                storage — under one roof in Hai&apos;an, Nantong.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {([
                { src: IMAGES.factoryExterior,    label: 'Factory exterior',            caption: 'Nantong facility exterior' },
                { src: IMAGES.productionWorkshop, label: 'Production workshop',         caption: 'Automated production lines' },
                { src: IMAGES.employeeCanteen,    label: 'Employee facilities',          caption: 'Employee canteen and welfare facilities' },
              ] as const).map((img, i) => (
                <Reveal key={img.src} delay={i * 0.08}>
                  <figure className="overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs text-[#5a7085]">{img.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities ─────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="capabilities-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                  <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                  Manufacturing capability
                </p>
                <h2
                  id="capabilities-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  Scale and precision under one roof
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="h-full rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded bg-[#0d4077]/10 text-[#0d4077]">
                      <c.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-[#0f1b2d]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                      {c.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0d4077] py-20 lg:py-24" aria-labelledby="about-cta">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-25" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Reveal>
              <h2
                id="about-cta"
                className="text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl"
              >
                Partner with a manufacturer, not a middleman
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 text-pretty">
                Source directly from our factory for better cost, quality control and lead times
                on every export order.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded bg-[#e8a020] px-7 py-3.5 text-sm font-bold text-[#3a2200] transition-colors hover:bg-[#d89018]"
              >
                Contact our team
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  )
}
