import { getSupabaseClient } from '@/lib/supabase'

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  publishedAt: string | null
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!supabase || !tenantId) return []
  const { data, error } = await supabase.from('articles')
    .select('slug,title,title_en,excerpt,excerpt_en,content,content_en,featured_image,published_at')
    .eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  if (error || !data) return []
  return data.map((row) => ({
    slug: row.slug,
    title: row.title_en || row.title,
    excerpt: row.excerpt_en || row.excerpt || '',
    content: row.content_en || row.content || '',
    coverImage: row.featured_image,
    publishedAt: row.published_at,
  }))
}

export async function getArticleBySlug(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug) || null
}
