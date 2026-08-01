import type { Locale } from '@/lib/i18n/config'

type ArticleText = {
  title: string
  excerpt: string
  content: string
}

type ArticleI18nField = Partial<Record<Locale, string>>

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
  title_i18n: unknown
  excerpt: string | null
  excerpt_en: string | null
  excerpt_i18n: unknown
  content: string | null
  content_en: string | null
  content_i18n: unknown
  featured_image: string | null
  published_at: string | null
}

function textOrFallback(value: string | null | undefined, fallback: string): string {
  return value?.trim() ? value : fallback
}

function localizedText(value: string | null | undefined): string | undefined {
  return value?.trim() ? value : undefined
}

const articleLocales = ['en', 'zh', 'de', 'es'] as const satisfies readonly Locale[]

function sanitizeArticleI18nField(value: unknown): ArticleI18nField {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const source = value as Record<string, unknown>
  return Object.fromEntries(
    articleLocales.flatMap((locale) => {
      const localized = source[locale]
      return typeof localized === 'string' && localized.trim()
        ? [[locale, localized]]
        : []
    }),
  )
}

export function mapArticleRow(row: ArticleRow): Article {
  const titles = sanitizeArticleI18nField(row.title_i18n)
  const excerpts = sanitizeArticleI18nField(row.excerpt_i18n)
  const contents = sanitizeArticleI18nField(row.content_i18n)
  const title = textOrFallback(titles.en, textOrFallback(row.title_en, row.title || ''))
  const excerpt = textOrFallback(excerpts.en, textOrFallback(row.excerpt_en, row.excerpt || ''))
  const content = textOrFallback(contents.en, textOrFallback(row.content_en, row.content || ''))

  return {
    slug: row.slug,
    title,
    excerpt,
    content,
    coverImage: row.featured_image,
    publishedAt: row.published_at,
    translations: {
      zh: {
        title: localizedText(titles.zh) || localizedText(row.title),
        excerpt: localizedText(excerpts.zh) || localizedText(row.excerpt),
        content: localizedText(contents.zh) || localizedText(row.content),
      },
      de: {
        title: localizedText(titles.de),
        excerpt: localizedText(excerpts.de),
        content: localizedText(contents.de),
      },
      es: {
        title: localizedText(titles.es),
        excerpt: localizedText(excerpts.es),
        content: localizedText(contents.es),
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
    .select('slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,content,content_en,content_i18n,featured_image,published_at')
    .eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  if (error || !data) return []
  return (data as ArticleRow[]).map(mapArticleRow)
}

export async function getArticleBySlug(slug: string) {
  return (await getPublishedArticles()).find((article) => article.slug === slug) || null
}
