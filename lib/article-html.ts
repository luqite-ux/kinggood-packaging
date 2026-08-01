import sanitizeHtml from 'sanitize-html'

const ARTICLE_TAGS = [
  'h2',
  'h3',
  'h4',
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'em',
  'blockquote',
  'a',
  'img',
  'figure',
  'figcaption',
  'br',
  'hr',
  'pre',
  'code',
]

export function sanitizeArticleHtml(value: string) {
  return sanitizeHtml(value, {
    allowedTags: ARTICLE_TAGS,
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'loading'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
      img: ['http', 'https'],
    },
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    nonTextTags: ['style', 'script', 'textarea', 'option', 'xmp', 'noscript'],
    transformTags: {
      a(tagName, attributes) {
        const safeAttributes = { ...attributes }
        if (safeAttributes.target === '_blank') {
          safeAttributes.rel = 'noopener noreferrer'
        } else {
          delete safeAttributes.target
          delete safeAttributes.rel
        }
        return { tagName, attribs: safeAttributes }
      },
      img(tagName, attributes) {
        const safeAttributes = { ...attributes }
        if (safeAttributes.loading !== 'lazy' && safeAttributes.loading !== 'eager') {
          delete safeAttributes.loading
        }
        return { tagName, attribs: safeAttributes }
      },
    },
  })
}
