import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { nav, company, productsWithShortName as products, IMAGES } from '@/lib/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#071829] text-[#f0f4f8]">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src={IMAGES.logo}
              alt={`${company.brand} logo`}
              width={176}
              height={64}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#f0f4f8]/60">
              {company.legalName} — manufacturers of wooden pallets, heavy-duty wood crates and
              cable reels for global logistics. Founded {company.founded}.
            </p>
            {/* Contact quick links */}
            <ul className="mt-6 space-y-3 text-sm text-[#f0f4f8]/60">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <a
                  href={`tel:${company.phoneRaw}`}
                  className="transition-colors hover:text-white focus-visible:text-white"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white focus-visible:text-white"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e8a020]" aria-hidden />
                <address className="not-italic leading-relaxed">{company.address}</address>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#f0f4f8]/60 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-[#f0f4f8]/60 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services / quick links */}
          <div>
            <h3 className="eyebrow text-xs font-bold uppercase tracking-widest text-[#e8a020]">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'Custom Packaging', href: '/custom-packaging' },
                { label: 'Industries Served', href: '/industries' },
                { label: 'Request a Quote', href: '/contact' },
                { label: 'News', href: '/news' },
                { label: 'About Us', href: '/about' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#f0f4f8]/60 transition-colors hover:text-white focus-visible:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#f0f4f8]/70 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {year} {company.legalName}. All rights reserved.</p>
          <p>Nantong, Jiangsu, China</p>
        </div>
      </div>
    </footer>
  )
}
