import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Factory, Cog, Warehouse, Ship } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { CountUp } from '@/components/count-up'
import { company, IMAGES } from '@/lib/site'
import { localizePath, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

type AboutPageBodyProps = {
  locale: Locale
  dictionary: Dictionary
}

const CAPABILITY_ICONS: Record<string, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  Factory,
  Cog,
  Warehouse,
  Ship,
}

export function AboutPageBody({ locale, dictionary }: AboutPageBodyProps) {
  const { about: pageContent, shared } = dictionary.content
  return (
    <>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main>
        <PageHero
          eyebrow={dictionary.pages.about.eyebrow}
          title={dictionary.pages.about.title}
          description={dictionary.pages.about.description}
          image={IMAGES.factoryExterior}
          crumbs={[
            { label: dictionary.navigation.home, href: '/' },
            { label: dictionary.navigation.about },
          ]}
          locale={locale}
          dictionary={dictionary}
        />

        {/* ── Story ────────────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28" aria-labelledby="about-story">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={IMAGES.productionWorkshop}
                    alt={pageContent.workshopImageAlt}
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
                    {pageContent.storyLabel}
                  </p>
                  <h2
                    id="about-story"
                    className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                  >
                    {pageContent.storyTitle}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-[#5a7085]">
                    {pageContent.storyParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph.replace('{year}', company.founded)}</p>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {pageContent.values.map((v) => (
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
        <section className="bg-[#0d4077] py-14" aria-label={pageContent.statsAriaLabel}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {shared.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <dl className="border-l-2 border-[#e8a020] pl-4">
                    <dt className="text-3xl font-bold tabular-nums text-white lg:text-4xl">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 text-xs font-bold uppercase tracking-widest text-white/70">
                      {s.label}
                    </dd>
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Facility photo ───────────────────────────────────────── */}
        <section className="bg-[#f0f4f8] py-20 lg:py-28" aria-labelledby="facility-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8a5600]">
                <span className="h-px w-5 bg-[#e8a020]" aria-hidden />
                {pageContent.facilityLabel}
              </p>
              <h2
                id="facility-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
              >
                {pageContent.facilityTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a7085]">
                {pageContent.facilityDescription}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {([
                { src: IMAGES.factoryExterior, ...pageContent.gallery[0] },
                { src: IMAGES.productionWorkshop, ...pageContent.gallery[1] },
                { src: IMAGES.employeeCanteen, ...pageContent.gallery[2] },
              ] as const).map((img, i) => (
                <Reveal key={img.src} delay={i * 0.08}>
                  <figure className="overflow-hidden rounded-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.alt}
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
                  {pageContent.capabilityLabel}
                </p>
                <h2
                  id="capabilities-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#0f1b2d] text-balance sm:text-4xl"
                >
                  {pageContent.capabilityTitle}
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pageContent.capabilities.map((c, i) => {
                const Icon = CAPABILITY_ICONS[c.icon]
                return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="h-full rounded-lg border border-[#d8e1eb] bg-[#f0f4f8] p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded bg-[#0d4077]/10 text-[#0d4077]">
                      {Icon && <Icon className="h-6 w-6" aria-hidden />}
                    </span>
                    <h3 className="mt-5 text-base font-bold text-[#0f1b2d]">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a7085]">
                      {c.description}
                    </p>
                  </div>
                </Reveal>
                )
              })}
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
                {pageContent.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 text-pretty">
                {pageContent.ctaDescription}
              </p>
              <Link
                href={localizePath('/contact', locale)}
                className="mt-8 inline-flex items-center gap-2 rounded bg-[#e8a020] px-7 py-3.5 text-sm font-bold text-[#3a2200] transition-colors hover:bg-[#d89018]"
              >
                {dictionary.navigation.contact}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  )
}
