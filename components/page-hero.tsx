import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  image: string
  crumbs?: Crumb[]
}

export function PageHero({ eyebrow, title, description, image, crumbs }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-ink text-white lg:min-h-[60vh]">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/60" />
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20">
        {crumbs && (
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-white/60">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70 text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
