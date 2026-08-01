# KINGGOOD Hero Carousel and Multilingual Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a two-image factory Hero carousel and complete English, Simplified Chinese, German, and Spanish website routes without breaking the existing Supabase, admin, SEO, or deployment flows.

**Architecture:** Keep English on the existing unprefixed routes and render `zh`, `de`, and `es` through a validated `[locale]` route tree. Shared page components consume typed dictionaries; product and article data remain server-fetched from Supabase with explicit English fallback. The Hero uses a focused client carousel while copy, metadata, structured data, sitemap generation, and locale routing remain server-side.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Supabase, Node test runner, Vercel.

## Global Constraints

- English remains on existing unprefixed URLs; `/en/...` permanently redirects to the equivalent unprefixed path.
- Supported locales are exactly `en`, `zh`, `de`, and `es`.
- Hero images are exactly `/factory-exterior.png` and `/factory-production.png`.
- Hero foreground images use complete-image presentation; no factory subject may be cropped.
- No runtime translation API and no paid translation dependency.
- Missing localized product or article content falls back to English and never renders an empty page.
- Existing product slugs, tenant ID, Supabase queries, inquiry writes, `/admin` proxy, and formal domain remain unchanged.
- Canonical URLs, reciprocal hreflang, `x-default`, Open Graph, JSON-LD, robots, and sitemap must use `https://kinggoodpackaging.com`.
- All visible Chinese copy remains UTF-8.
- Do not modify `huanqiu-admin` shared authentication, permissions, navigation, or other tenants.

---

## File Structure

- `lib/i18n/config.ts`: supported locale types, parsing, prefix, alternate URL, and locale-path helpers.
- `lib/i18n/dictionaries/{en,zh,de,es}.ts`: typed navigation, shared UI, page, form, and product presentation copy.
- `lib/i18n/get-dictionary.ts`: server dictionary loader with English fallback.
- `lib/i18n/products.ts`: localized product-field overlay keyed by stable product slug.
- `components/i18n/language-switcher.tsx`: accessible locale navigation.
- `components/home/hero-carousel.tsx`: image index, timing, pause, manual navigation, and reduced-motion behavior.
- `components/home/hero.tsx`: localized Hero content shell using the carousel.
- `components/localized/*`: shared localized page bodies used by English and prefixed routes.
- `app/[locale]/**`: thin validated route adapters for non-English pages.
- `app/en/[[...path]]/route.ts`: permanent redirect from duplicate English-prefixed URLs.
- `app/sitemap.ts`, metadata helpers, and JSON-LD producers: localized search output.
- `tests/i18n.test.mjs`, `tests/hero-carousel.test.mjs`, `tests/seo-locales.test.mjs`: deterministic coverage.

---

### Task 1: Typed locale core and dictionaries

**Files:**
- Create: `lib/i18n/config.ts`
- Create: `lib/i18n/types.ts`
- Create: `lib/i18n/get-dictionary.ts`
- Create: `lib/i18n/dictionaries/en.ts`
- Create: `lib/i18n/dictionaries/zh.ts`
- Create: `lib/i18n/dictionaries/de.ts`
- Create: `lib/i18n/dictionaries/es.ts`
- Create: `tests/i18n.test.mjs`

**Interfaces:**
- Produces: `Locale = 'en' | 'zh' | 'de' | 'es'`.
- Produces: `isLocale(value: string): value is Locale`.
- Produces: `localizePath(path: string, locale: Locale): string`.
- Produces: `getAlternateLanguages(path: string): Record<string, string>`.
- Produces: `getDictionary(locale: Locale): Promise<Dictionary>`.

- [ ] **Step 1: Write failing locale tests**

```js
import assert from 'node:assert/strict'
import test from 'node:test'
import { isLocale, localizePath, getAlternateLanguages } from '../lib/i18n/config.ts'

test('validates only supported locales', () => {
  assert.equal(isLocale('de'), true)
  assert.equal(isLocale('fr'), false)
})

test('keeps English unprefixed and prefixes other languages', () => {
  assert.equal(localizePath('/products/example', 'en'), '/products/example')
  assert.equal(localizePath('/products/example', 'zh'), '/zh/products/example')
})

test('builds reciprocal language URLs with English x-default', () => {
  const links = getAlternateLanguages('/products/example')
  assert.equal(links.en, 'https://kinggoodpackaging.com/products/example')
  assert.equal(links.zh, 'https://kinggoodpackaging.com/zh/products/example')
  assert.equal(links.de, 'https://kinggoodpackaging.com/de/products/example')
  assert.equal(links.es, 'https://kinggoodpackaging.com/es/products/example')
  assert.equal(links['x-default'], links.en)
})
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `node --test tests/i18n.test.mjs`  
Expected: FAIL because `lib/i18n/config.ts` does not exist.

- [ ] **Step 3: Implement locale helpers and dictionary type**

```ts
export const locales = ['en', 'zh', 'de', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localizePath(path: string, locale: Locale) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return locale === 'en' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`
}
```

Define `Dictionary` in `types.ts` with explicit keys for navigation, shared actions, Hero, footer, forms, page headings, error states, carousel controls, and product overlays. Export an English object satisfying `Dictionary`; make the other three dictionaries use `satisfies Dictionary` so missing keys fail TypeScript.

- [ ] **Step 4: Write complete human-reviewed dictionaries**

Populate English, Simplified Chinese, German, and Spanish copy for every key. Preserve technical terms such as ISPM 15, IPPC, ISO, EUR/EPAL, MOQ, RFQ, and product dimensions. Do not translate company or brand names into invented forms.

- [ ] **Step 5: Verify dictionaries and commit**

Run: `node --test tests/i18n.test.mjs && pnpm exec tsc --noEmit`  
Expected: PASS.

```powershell
git add lib/i18n tests/i18n.test.mjs
git commit -m "feat: add typed multilingual dictionaries"
```

---

### Task 2: Complete-image factory Hero carousel

**Files:**
- Create: `lib/hero-carousel.ts`
- Create: `components/home/hero-carousel.tsx`
- Modify: `components/home/hero.tsx`
- Modify: `lib/hero-motion.ts`
- Create: `tests/hero-carousel.test.mjs`

**Interfaces:**
- Consumes: `Dictionary['hero']`, `Dictionary['carousel']`.
- Produces: `HERO_SLIDES` with two fixed authentic image paths.
- Produces: `nextSlide(index, count)` and `previousSlide(index, count)`.
- Produces: `<HeroCarousel labels={...} />`.

- [ ] **Step 1: Write failing carousel logic tests**

```js
import assert from 'node:assert/strict'
import test from 'node:test'
import { HERO_SLIDES, nextSlide, previousSlide } from '../lib/hero-carousel.ts'

test('uses the two approved customer factory images', () => {
  assert.deepEqual(HERO_SLIDES.map((slide) => slide.src), [
    '/factory-exterior.png',
    '/factory-production.png',
  ])
})

test('wraps manual navigation', () => {
  assert.equal(nextSlide(1, 2), 0)
  assert.equal(previousSlide(0, 2), 1)
})
```

- [ ] **Step 2: Run test and confirm failure**

Run: `node --test tests/hero-carousel.test.mjs`  
Expected: FAIL because the carousel module does not exist.

- [ ] **Step 3: Implement pure slide logic**

Create two immutable slide records with localized alt-key identifiers. Implement modular next/previous helpers that handle a positive count and never mutate shared state.

- [ ] **Step 4: Implement accessible carousel UI**

Use Framer Motion `AnimatePresence` for crossfade. For every slide render:

```tsx
<Image fill src={slide.src} alt="" className="scale-110 object-cover blur-xl" aria-hidden />
<Image fill src={slide.src} alt={localizedAlt} className="object-contain" priority={index === 0} />
<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071829]/95 via-[#071829]/75 to-[#071829]/35" />
```

Use a six-second timer. Pause on pointer enter, focus within, hidden document, or pause-button activation. Disable autoplay and scale animation under `prefers-reduced-motion`. Add previous, next, dot, and pause controls with visible focus styles and translated ARIA labels.

- [ ] **Step 5: Integrate localized copy into Hero**

Change `Hero` to receive `locale` and `dictionary`. Keep the existing headline hierarchy, quote/product actions, and metrics; use `localizePath()` for internal links.

- [ ] **Step 6: Verify and commit**

Run: `node --test tests/hero-carousel.test.mjs tests/hero-motion.test.mjs && pnpm exec tsc --noEmit`  
Expected: PASS.

```powershell
git add lib/hero-carousel.ts lib/hero-motion.ts components/home/hero-carousel.tsx components/home/hero.tsx tests/hero-carousel.test.mjs
git commit -m "feat: add complete-image factory hero carousel"
```

---

### Task 3: Language-aware shared navigation and page components

**Files:**
- Create: `components/i18n/language-switcher.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/page-hero.tsx`
- Modify: `components/contact-form.tsx`
- Create: `components/localized/home-page.tsx`
- Create: `components/localized/products-page.tsx`
- Create: `components/localized/product-detail-page.tsx`
- Create: `components/localized/about-page.tsx`
- Create: `components/localized/contact-page.tsx`
- Create: `components/localized/custom-packaging-page.tsx`
- Create: `components/localized/industries-page.tsx`
- Create: `components/localized/news-page.tsx`
- Create: `components/localized/news-article-page.tsx`

**Interfaces:**
- Consumes: `locale: Locale`, `dictionary: Dictionary`, existing product/article records.
- Produces: reusable server page bodies for unprefixed English and prefixed languages.
- Produces: `<LanguageSwitcher locale currentPath />`.

- [ ] **Step 1: Add language-switcher path tests to `tests/i18n.test.mjs`**

Test the home path, nested product path, query-free localized paths, current-language state, and unsupported-locale rejection.

- [ ] **Step 2: Implement the language selector**

Render four real links (`EN`, `中文`, `DE`, `ES`) with `hrefLang`, `lang`, visible focus styles, and `aria-current="page"` for the active locale. Preserve the current normalized path. On click, set a `kinggood_locale` cookie with `SameSite=Lax`, one-year max age, and `/` path; URL remains authoritative.

- [ ] **Step 3: Localize shared chrome and forms**

Pass `locale` and `dictionary` through header, footer, PageHero, and ContactForm. Translate labels, placeholders, validation, submit progress, success, and failure messages. Internal links must use `localizePath`; `/admin` and external links must remain unprefixed.

- [ ] **Step 4: Extract reusable localized page bodies**

Move JSX from current route files into focused `components/localized/*` server components. Route files become data/metadata adapters. Do not duplicate complete JSX trees across languages.

- [ ] **Step 5: Verify and commit**

Run: `node --test tests/i18n.test.mjs && pnpm exec tsc --noEmit`  
Expected: PASS.

```powershell
git add components/i18n components/localized components/site-header.tsx components/site-footer.tsx components/page-hero.tsx components/contact-form.tsx tests/i18n.test.mjs
git commit -m "feat: localize shared site interface"
```

---

### Task 4: Localized product overlays and route tree

**Files:**
- Create: `lib/i18n/products.ts`
- Modify: `lib/products-db.ts`
- Modify: `lib/articles-db.ts`
- Modify: `app/page.tsx`
- Modify: `app/products/page.tsx`
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/custom-packaging/page.tsx`
- Modify: `app/industries/page.tsx`
- Modify: `app/news/page.tsx`
- Modify: `app/news/[slug]/page.tsx`
- Create: `app/[locale]/page.tsx`
- Create: `app/[locale]/products/page.tsx`
- Create: `app/[locale]/products/[slug]/page.tsx`
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/custom-packaging/page.tsx`
- Create: `app/[locale]/industries/page.tsx`
- Create: `app/[locale]/news/page.tsx`
- Create: `app/[locale]/news/[slug]/page.tsx`
- Create: `app/en/[[...path]]/route.ts`
- Modify: `middleware.ts`

**Interfaces:**
- Produces: `localizeProduct(product: Product, locale: Locale): Product`.
- Produces: `getLocalizedArticle(article: Article, locale: Locale)` with `isFallback`.
- Consumes: shared localized page bodies from Task 3.

- [ ] **Step 1: Add failing product fallback tests**

```js
test('uses translated product presentation while preserving the stable slug', () => {
  const result = localizeProduct(product, 'de')
  assert.equal(result.slug, product.slug)
  assert.notEqual(result.name, '')
})

test('falls back to English for an unknown localized product field', () => {
  assert.equal(localizeProduct(product, 'es').dimensions, product.dimensions)
})
```

- [ ] **Step 2: Implement product overlays**

Create slug-keyed translations for name, tagline, summary, overview, highlights, materials, handling notes, applications, and specification labels. Never translate numeric specification values or mutate the Supabase record.

- [ ] **Step 3: Implement thin English route adapters**

Existing routes load the English dictionary and render shared page bodies. Preserve current `revalidate = 60`, `dynamicParams = true`, Supabase calls, not-found behavior, and admin/inquiry logic.

- [ ] **Step 4: Implement validated prefixed route adapters**

Every `[locale]` route calls `isLocale`; `en` redirects to the unprefixed equivalent; invalid locales call `notFound()`. Valid non-English routes load the selected dictionary and reuse the same server page body and Supabase data.

- [ ] **Step 5: Add duplicate-English redirect**

The `/en` catch-all route maps `/en`, `/en/products`, and nested paths to `/`, `/products`, and corresponding unprefixed paths with status 308. Preserve safe path segments only; ignore query parameters not already present.

- [ ] **Step 6: Implement article fallback notice**

For `de` and `es`, return English content until localized database fields exist and set `isFallback: true`. Render the translated notice above article content. Do not call DeepSeek during requests.

- [ ] **Step 7: Verify all routes and commit**

Run: `node --test tests/i18n.test.mjs && pnpm exec tsc --noEmit && pnpm build`  
Expected: all four locale route sets build; invalid locales remain 404.

```powershell
git add lib/i18n/products.ts lib/products-db.ts lib/articles-db.ts app components/localized tests/i18n.test.mjs middleware.ts
git commit -m "feat: add localized site routes and product content"
```

---

### Task 5: Localized metadata, hreflang, JSON-LD, robots, and sitemap

**Files:**
- Modify: `lib/seo.ts`
- Modify: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`
- Modify: all public page metadata exports/generators
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Create: `tests/seo-locales.test.mjs`

**Interfaces:**
- Produces: `localizedMetadata(path, locale, input): Metadata`.
- Produces: `localizedStructuredData(locale, data)`.
- Produces: sitemap entries for all valid locale/page combinations.

- [ ] **Step 1: Write failing localized SEO tests**

```js
test('German metadata uses German canonical and reciprocal hreflang', () => {
  const metadata = localizedMetadata('/products/example', 'de', input)
  assert.equal(metadata.alternates.canonical, 'https://kinggoodpackaging.com/de/products/example')
  assert.equal(metadata.alternates.languages['x-default'], 'https://kinggoodpackaging.com/products/example')
})

test('sitemap expansion emits four unique URLs per public path', () => {
  const urls = expandLocalizedUrls('/about')
  assert.equal(new Set(urls).size, 4)
})
```

- [ ] **Step 2: Implement shared metadata builder**

Set localized title, description, canonical, reciprocal language alternatives, Open Graph URL/locale, Twitter Card, and absolute HTTPS image. Use `en_US`, `zh_CN`, `de_DE`, and `es_ES` Open Graph locales.

- [ ] **Step 3: Set document language correctly**

Ensure rendered pages expose the correct `lang` value without duplicating nested `<html>` elements. Use request-derived locale information at the root layout or a supported Next.js route layout pattern; verify actual HTML rather than relying on React props alone.

- [ ] **Step 4: Localize structured data**

Keep the Organization legal identity unchanged. Localize Product name/description/category and NewsArticle headline/description when localized content exists. Breadcrumb names and URLs follow the current locale.

- [ ] **Step 5: Expand sitemap**

Generate four language variants for every public static page and active product detail. Generate article variants only when the route is accessible under the defined fallback policy. Preserve real `lastModified` values and exclude `/admin`, API, invalid locales, and `/en` duplicates.

- [ ] **Step 6: Verify and commit**

Run: `node --test tests/seo-locales.test.mjs tests/seo.test.mjs && pnpm exec tsc --noEmit && pnpm build`  
Expected: PASS.

```powershell
git add lib/seo.ts app tests/seo-locales.test.mjs
git commit -m "feat: add multilingual SEO and sitemap"
```

---

### Task 6: Full verification, deployment, and delivery update

**Files:**
- Modify only files required by verified defects.
- Update: Feishu customer row only if the existing fields support recording multilingual delivery status.

**Interfaces:**
- Consumes: completed site, Vercel project, formal domain, Cloudflare DNS, Feishu sync credentials.
- Produces: a clean `main`, READY Production deployment, and evidence-backed delivery report.

- [ ] **Step 1: Run complete local verification**

Run:

```powershell
node --test tests/*.test.mjs
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

Expected: all commands succeed; only documented Node module-type warnings may remain.

- [ ] **Step 2: Run browser verification on desktop and mobile**

Verify `/`, `/zh`, `/de`, and `/es`; every public list/detail page; Hero full-image composition; six-second switching; manual controls; pause; reduced motion; language switching; German wrapping; form states; footer; and no horizontal overflow.

- [ ] **Step 3: Run accessibility checks**

Run axe or Lighthouse on the four homepages and representative product/contact pages. Fix error-level contrast, accessible-name, heading, focus, or form-label defects. Manually verify the overlay remains readable on both Hero slides.

- [ ] **Step 4: Commit verified fixes and push**

Stage only task files—never `git add .`—then push `main` using the company `luqite-ux` credential. Confirm the resulting Vercel Production deployment is `READY` and matches the pushed commit SHA.

- [ ] **Step 5: Verify formal-domain SEO and all sitemap URLs**

Fetch `https://kinggoodpackaging.com/robots.txt` and `/sitemap.xml`. Request every sitemap URL and require HTTP 200. For representative EN/ZH/DE/ES pages, parse HTML and verify title, description, canonical, reciprocal hreflang, `x-default`, Open Graph, Twitter Card, correct `lang`, and JSON-LD types.

- [ ] **Step 6: Reverify operational flows**

Perform a real login at `https://kinggoodpackaging.com/admin/login` and confirm `hq_admin_session`, `hq_tenant_id`, and `/admin` HTTP 200. Submit one production inquiry from a localized contact page and confirm the Supabase row is tenant-scoped and visible in the backend; remove the test record afterward if the existing delivery procedure permits.

- [ ] **Step 7: Update and read back Feishu**

If no dedicated language field exists, keep A–L semantics unchanged and update only an existing project/status note field when available. Never overwrite A–L with unrelated language notes. API-read the customer row afterward and reconfirm all 12 required columns, links, admin account, password presence, and tenant ID.

- [ ] **Step 8: Final handoff**

Report formal URLs, languages, Hero behavior, test/build totals, deployment SHA, sitemap URL count, accessibility findings, backend verification, and any intentional English article fallback. Confirm the customer repository is clean.
