# Task 5 Report — Localized SEO, structured data, robots, and sitemap

Date: 2026-08-01
Branch: `codex/kinggood-hero-i18n`
Code commit: `07fd08e2aff8ec26b9e16a7204952e96da1f2912` (`feat: add multilingual SEO and sitemap`)
Push: not performed

## Delivered

- Added `localizedMetadata(path, locale, input)` with the formal `https://kinggoodpackaging.com` origin, English unprefixed canonicals, `zh/de/es` prefixed canonicals, reciprocal `en/zh/de/es` alternates plus `x-default`, localized Open Graph locales/URLs, Twitter cards, and absolute HTTPS images.
- Added localized Organization, Product, NewsArticle, and BreadcrumbList JSON-LD. The confirmed Organization legal name is unchanged; product/article presentation and breadcrumb names/URLs follow the route locale. English article fallback content is marked as English in structured data.
- Split the English/default and `[locale]` route families into two legal root layouts. Each response now has exactly one `<html>` element with the correct `lang`; no request-header lookup or nested document exists, and public list routes retain static generation/60-second ISR.
- Added localized metadata to every public static, product-detail, and article-detail route. Homepage titles are absolute to avoid double branding. Admin login is `noindex, nofollow` and does not inherit public canonical/hreflang metadata.
- Expanded sitemap generation across all four valid language routes. The sitemap uses strict active-product data, published articles only, real product/article timestamps when available, and excludes `/en`, admin/API, invalid, inactive, and draft routes. A successful empty active-product query remains empty rather than loading frontend fallback products.
- Kept the formal robots sitemap and excluded `/admin`, `/api`, and `/en`.
- Preserved shared viewport theme/color behavior and localized product category labels.

## TDD evidence

1. Clean baseline:

   ```powershell
   pnpm test
   ```

   Result: exit `0`; 42 tests passed.

2. Initial localized SEO RED:

   ```powershell
   node --test tests/seo-locales.test.mjs tests/seo.test.mjs
   ```

   Result: exit `1`; nine new tests failed because `localizedMetadata`, `expandLocalizedUrls`, `buildLocalizedSitemapEntries`, `documentLocaleFromPathname`, and `localizedStructuredData` did not exist.

3. Product category regression RED:

   ```powershell
   node --test tests/i18n.test.mjs
   ```

   Result before fix: exit `1`; German structured product data received `Pallets` instead of `Holzpaletten`. After localizing `categoryLabel` at the product localization source, the same command passed 24/24.

4. ISR regression RED:

   ```powershell
   $response = Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:3199/products'
   $response.Headers['Cache-Control']
   $manifest = Get-Content -LiteralPath '.next/prerender-manifest.json' -Raw -Encoding UTF8 | ConvertFrom-Json
   [bool]$manifest.routes.'/products'
   ```

   Result before the root-layout fix: `private, no-cache, no-store`; `/products` absent from the prerender manifest. After the route-layout split: `s-maxage=60, stale-while-revalidate=31535940`; `/products` and `/de/products` present with `initialRevalidateSeconds = 60`.

5. Additional RED/GREEN cases covered absolute homepage titles, strict empty sitemap records, and preservation of the shared viewport contract.

## Final verification commands and results

```powershell
node --test tests/seo-locales.test.mjs tests/seo.test.mjs
```

Exit `0`: 14 passed, 0 failed.

```powershell
pnpm test
```

Exit `0`: 54 passed, 0 failed.

```powershell
pnpm exec tsc --noEmit
```

Exit `0`, no diagnostics.

```powershell
pnpm lint
```

Exit `0`, no ESLint findings.

```powershell
pnpm build
```

Exit `0`: compiled successfully; 34 static-generation targets completed. `/products`, `/news`, `/zh|de|es/products`, and `/zh|de|es/news` are static/SSG with one-minute revalidation.

```powershell
rg -ni --hidden -g '!*.map' -g '!node_modules/**' -g '!.next/**' "warranty|warranties|guarantee|guaranteed|质保|保修|Garantie|Gewähr|garantía" app components lib public
```

Exit `1` as expected for no matches; normalized result: `NO_PROHIBITED_SOURCE_MATCHES`.

```powershell
git diff --check
```

Exit `0`; no whitespace errors. Git emitted only the repository's existing LF-to-CRLF checkout notices.

## Production-server artifact checks

Started the built artifact with:

```powershell
pnpm start --port 3199
```

Then used `Invoke-WebRequest -UseBasicParsing` against the generated sitemap and every URL it listed, plus the German fallback product detail and admin login. Final results:

- Sitemap: 28 unique static-language URLs in the no-Supabase local environment; 0 bad statuses, 0 invalid/duplicate/private URLs.
- Every sitemap URL: correct `html lang`, exact canonical, five reciprocal language links including `x-default`, and 0 prohibited service-promise matches.
- German product detail: localized name/category, `inLanguage = de`, localized canonical/breadcrumb graph, and five reciprocal language links.
- `/products`: `Cache-Control: s-maxage=60, stale-while-revalidate=31535940`.
- `/admin/login`: `noindex, nofollow`, 0 public canonical links, 0 hreflang links.
- Theme color meta restored as `#0d4077`.
- `/en/about`: 308 to `/about`; `/fr/about`: 404.

## Review

An independent read-only reviewer initially found two Important issues: root `headers()` disabled ISR, and an empty active-product set could leak fallback products into the sitemap. Both were fixed and re-reviewed. Final reviewer verdict: no Critical or Important issues; Ready: Yes. Its last minor viewport-preservation note was also fixed and regression-tested.

## Concerns / limitations

- The local environment intentionally had no Supabase tenant credentials, so runtime sitemap verification exercised the strict empty-data mode (28 static language URLs). Unit tests verify four-language product/article URL expansion and timestamp preservation; production data inclusion still depends on the existing Supabase environment.
- Product/article detail routes remain on-demand dynamic routes in the Next build, matching the inherited route behavior; Task 5 did not change their data-loading model.
- `pnpm build` continues to emit two non-fatal repository/tooling warnings: multiple workspace lockfiles affect inferred root selection, and Next 16 marks the existing project-standard `middleware.ts` convention as deprecated in favor of `proxy.ts`.
- No deployment, external data mutation, merge, or push was performed.
