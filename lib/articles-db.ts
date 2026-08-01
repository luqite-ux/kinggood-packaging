import type { Locale } from '@/lib/i18n/config'

type ArticleText = {
  title: string
  excerpt: string
  content: string
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  publishedAt: string | null
  translations?: Partial<Record<Exclude<Locale, 'en'>, Partial<ArticleText>>>
}

export type ArticleRow = {
  slug: string
  title: string | null
  title_en: string | null
  excerpt: string | null
  excerpt_en: string | null
  content: string | null
  content_en: string | null
  featured_image: string | null
  published_at: string | null
}

function textOrFallback(value: string | null | undefined, fallback: string): string {
  return value?.trim() ? value : fallback
}

function localizedText(value: string | null | undefined): string | undefined {
  return value?.trim() ? value : undefined
}

export function mapArticleRow(row: ArticleRow): Article {
  const title = textOrFallback(row.title_en, row.title || '')
  const excerpt = textOrFallback(row.excerpt_en, row.excerpt || '')
  const content = textOrFallback(row.content_en, row.content || '')

  return {
    slug: row.slug,
    title,
    excerpt,
    content,
    coverImage: row.featured_image,
    publishedAt: row.published_at,
    translations: {
      zh: {
        title: localizedText(row.title),
        excerpt: localizedText(row.excerpt),
        content: localizedText(row.content),
      },
    },
  }
}

export function getLocalizedArticle(
  article: Article,
  locale: Locale,
): { article: Article; isFallback: boolean } {
  const translation = locale === 'en' ? undefined : article.translations?.[locale]
  const hasLocalizedContent = Boolean(translation?.content?.trim())

  return {
    article: {
      ...article,
      title: textOrFallback(translation?.title, article.title),
      excerpt: textOrFallback(translation?.excerpt, article.excerpt),
      content: textOrFallback(translation?.content, article.content),
      translations: article.translations
        ? Object.fromEntries(
            Object.entries(article.translations).map(([key, value]) => [
              key,
              value ? { ...value } : value,
            ]),
          ) as Article['translations']
        : undefined,
    },
    isFallback: locale !== 'en' && !hasLocalizedContent,
  }
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { getSupabaseClient } = await import('@/lib/supabase')
  const supabase = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!supabase || !tenantId) return []
  const { data, error } = await supabase.from('articles')
    .select('slug,title,title_en,excerpt,excerpt_en,content,content_en,featured_image,published_at')
    .eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  if (error || !data) return []
  return (data as ArticleRow[]).map(mapArticleRow)
}

export async function getArticleBySlug(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug) || null
}
