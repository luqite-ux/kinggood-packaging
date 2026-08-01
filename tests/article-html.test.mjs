import assert from 'node:assert/strict'
import test from 'node:test'

const articleHtmlModule = await import('../lib/article-html.ts').catch(() => ({}))
const { sanitizeArticleHtml } = articleHtmlModule
const { mapArticleRow } = await import('../lib/articles-db.ts')

test('strips executable article HTML while preserving strict rich-text elements', () => {
  assert.equal(typeof sanitizeArticleHtml, 'function')
  const dirty = [
    '<h2 onclick="run()">Safe heading <em>with emphasis</em></h2>',
    '<p style="position:fixed">Safe paragraph <strong>with strength</strong><script>alert(1)</script></p>',
    '<ul><li>Unordered item</li></ul><ol><li>Ordered item</li></ol>',
    '<a href="javascript:alert(2)" onmouseover="run()">Unsafe link</a>',
    '<a href="https://example.com/spec" target="_blank">Safe link</a>',
    '<img src="javascript:alert(3)" onerror="run()" alt="Unsafe image">',
    '<img src="https://cdn.example.com/factory.jpg" alt="Factory" loading="lazy">',
    '<iframe src="https://example.com/embed"></iframe>',
  ].join('')

  const clean = sanitizeArticleHtml(dirty)

  assert.match(clean, /<h2>Safe heading <em>with emphasis<\/em><\/h2>/)
  assert.match(clean, /<p>Safe paragraph <strong>with strength<\/strong><\/p>/)
  assert.match(clean, /<ul><li>Unordered item<\/li><\/ul>/)
  assert.match(clean, /<ol><li>Ordered item<\/li><\/ol>/)
  assert.match(clean, /href="https:\/\/example\.com\/spec"/)
  assert.match(clean, /rel="noopener noreferrer"/)
  assert.match(clean, /<img src="https:\/\/cdn\.example\.com\/factory\.jpg" alt="Factory" loading="lazy" \/>/)
  assert.doesNotMatch(clean, /script|iframe|on[a-z]+\s*=|style\s*=|javascript:/i)
})

test('sanitizes both legacy and localized database article content', () => {
  const baseRow = {
    slug: 'safe-article',
    title: 'Article',
    title_en: null,
    title_i18n: null,
    excerpt: 'Excerpt',
    excerpt_en: null,
    excerpt_i18n: null,
    featured_image: null,
    published_at: '2026-08-01T00:00:00.000Z',
    updated_at: '2026-08-01T00:00:00.000Z',
  }
  const legacy = mapArticleRow({
    ...baseRow,
    content: '<p onclick="run()">Legacy body</p><script>alert(1)</script>',
    content_en: null,
    content_i18n: null,
  })
  const localized = mapArticleRow({
    ...baseRow,
    content: '<p>Legacy fallback</p>',
    content_en: null,
    content_i18n: {
      en: '<h2>English body</h2><a href="javascript:run()">Bad URL</a>',
      zh: '<p onmouseover="run()">中文正文</p><img src="https://cdn.example.com/zh.jpg" alt="中文图片">',
    },
  })

  assert.equal(legacy.content, '<p>Legacy body</p>')
  assert.equal(localized.content, '<h2>English body</h2><a>Bad URL</a>')
  assert.equal(
    localized.translations.zh.content,
    '<p>中文正文</p><img src="https://cdn.example.com/zh.jpg" alt="中文图片" />',
  )
})
