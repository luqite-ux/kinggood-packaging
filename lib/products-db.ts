import { products as fallbackProducts, type Product } from './site.ts'
import { getSupabaseClient } from './supabase.ts'
import { defaultLocale, type Locale } from './i18n/config.ts'
import { localizeProduct } from './i18n/products.ts'
import { strictSitemapRecords } from './seo.ts'

type ProductRow = {
  slug: string
  updated_at: string | null
  name: string
  description: string | null
  overview: string | null
  image_url: string | null
  category_slug: Product['category'] | null
  features: string[] | null
  applications: string[] | null
  specs: Record<string, string> | null
  extra_data: Record<string, unknown> | null
}

function mapProduct(row: ProductRow): Product {
  const fallback = fallbackProducts.find((item) => item.slug === row.slug)
  const extra = row.extra_data || {}
  return {
    ...(fallback || fallbackProducts[0]),
    slug: row.slug,
    updatedAt: row.updated_at,
    name: row.name,
    summary: row.description || fallback?.summary || '',
    overview: row.overview || fallback?.overview || '',
    image: row.image_url || fallback?.image || '/placeholder.svg',
    category: row.category_slug || fallback?.category || 'pallets',
    categoryLabel: (extra.categoryLabel as string) || fallback?.categoryLabel || '',
    gallery: (extra.gallery as string[]) || fallback?.gallery || [],
    tagline: (extra.tagline as string) || fallback?.tagline || '',
    highlights: (extra.highlights as Product['highlights']) || fallback?.highlights || [],
    materials: (extra.materials as string[]) || fallback?.materials || [],
    dimensions: (extra.dimensions as string) || fallback?.dimensions || '',
    handlingNotes: (extra.handlingNotes as string[]) || fallback?.handlingNotes || [],
    applications: row.applications || fallback?.applications || [],
    specs: Object.entries(row.specs || {}).map(([label, value]) => ({ label, value })),
  }
}

export function resolveProductRows(
  data: ProductRow[] | null,
  error: unknown,
): Product[] {
  if (error || !data) return fallbackProducts
  return data.map(mapProduct)
}

export async function fetchProductsData(locale: Locale = defaultLocale): Promise<Product[]> {
  const supabase = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!supabase || !tenantId) {
    return fallbackProducts.map((product) => localizeProduct(product, locale))
  }
  const { data, error } = await supabase.from('products')
    .select('slug,updated_at,name,description,overview,image_url,category_slug,features,applications,specs,extra_data')
    .eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  const products = resolveProductRows(data as ProductRow[] | null, error)
  return products.map((product) => localizeProduct(product, locale))
}

type SitemapProduct = Pick<Product, 'slug' | 'updatedAt'>
type SitemapProductRow = {
  slug: string
  updated_at: string | null
}

function validUpdatedAt(value: string | null): string | undefined {
  return value && !Number.isNaN(Date.parse(value)) ? value : undefined
}

export function mapSitemapProductRow(row: SitemapProductRow): SitemapProduct {
  return {
    slug: row.slug,
    updatedAt: validUpdatedAt(row.updated_at),
  }
}

export async function getProductBySlug(slug: string, locale: Locale = defaultLocale) {
  return (await fetchProductsData(locale)).find((product) => product.slug === slug) || null
}

export async function fetchActiveProductsForSitemap(): Promise<SitemapProduct[]> {
  const supabase = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!supabase || !tenantId) return []

  const { data, error } = await supabase.from('products')
    .select('slug,updated_at')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('sort_order')

  return strictSitemapRecords(data as SitemapProductRow[] | null, error)
    .map(mapSitemapProductRow)
}
