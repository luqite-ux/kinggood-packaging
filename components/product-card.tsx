import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/site'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#d8e1eb] bg-white transition-all duration-300 hover:border-[#0d4077]/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f4f8]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded bg-white/90 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0d4077] backdrop-blur">
          {product.categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-bold leading-snug text-[#0f1b2d]">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5a7085]">
          {product.tagline}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d4077]">
          View details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
