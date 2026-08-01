# Task 6 local verification report

Date: 2026-08-01 (Asia/Shanghai)

Worktree: `D:\Cursor\Grand\kinggood-packaging\.worktrees\codex-kinggood-hero-i18n`

Branch: `codex/kinggood-hero-i18n`

Verified fix commit: `ef6c6b687d032fc72567cd1df51024ff58486712`

## Scope and safety boundary

This pass performed the requested exhaustive local verification and committed only locally verified defects. It did **not** push, merge `main`, mutate a Vercel Production deployment, perform a real external inquiry, log in with production customer credentials, change Supabase data, or update Feishu. Those actions remain controller-only per the Task 6 dispatch.

## Outcome

- Local unit tests, TypeScript, ESLint, Next production build, and `git diff --check` pass.
- Playwright Production-mode verification passes across EN/ZH/DE/ES at desktop and mobile sizes.
- All seven locally available product details pass in all four locales and both viewports.
- Hero autoplay, controls, pause, complete-image foreground, and reduced-motion behavior pass.
- Local metadata, canonical, reciprocal hreflang, `x-default`, Open Graph, Twitter Card, `lang`, JSON-LD, robots, sitemap, and admin route protection checks pass within the limits of local data.
- Lighthouse accessibility is `1.00` on all six audited pages, with zero failed binary accessibility audits.
- Source/static text contains no prohibited warranty/guarantee terms in EN/ZH/DE/ES.
- The implementation commit leaves the tracked worktree clean before this report-only commit.

## Verified defects fixed

### 1. Next 16 proxy migration and admin protection regression coverage

- Renamed `middleware.ts` to `proxy.ts` and exported `proxy()`.
- Preserved `/admin/:path*` matcher and the `hq_admin_session` cookie contract.
- Added `tests/proxy.test.mjs` using real `NextRequest` objects.
- Regression coverage proves:
  - unauthenticated `/admin/products` redirects to `/admin/login` with HTTP 307;
  - a request carrying `hq_admin_session` passes through;
  - `/admin/login` and `/admin/logout` remain public.
- Next build still reports `ƒ Proxy (Middleware)` and no longer emits the `middleware` deprecation warning.

### 2. Nested-worktree Turbopack root warning

- Configured `turbopack.root` from `next.config.mjs`'s own absolute path using `fileURLToPath(import.meta.url)`.
- This is deployment-safe because it resolves at runtime in the current checkout/Vercel project rather than embedding the local worktree path.
- Repeated production builds no longer infer the outer checkout or emit the multiple-lockfile workspace-root warning.

### 3. Mobile translated-home overflow

- Playwright reproduced a stable `423px` document width in a `390px` viewport on all four homepages.
- DOM bounds traced the extra 64px to the right-entering `Reveal x={64}` process cards.
- Added horizontal clipping to the owning process section.
- The expanded final browser matrix reports no document-level horizontal overflow in any tested locale/page/viewport combination, including long German headings.

### 4. Reduced-motion hydration failure

- A fresh production reload with `prefers-reduced-motion: reduce` reliably produced React hydration error `#418`.
- Development React diff showed that SSR rendered `Pause carousel`, while the first client render immediately rendered a disabled `Play carousel` button and different SVG.
- Added `useHydratedReducedMotion()`, using `useSyncExternalStore` server/client snapshots so hydration starts from the SSR-safe value and the actual media preference is applied immediately after hydration.
- Updated Hero, HeroCarousel, Reveal, and CountUpStat to use the hydration-safe hook.
- Reverification proves zero console/page errors, a disabled localized Play control under reduced motion, no carousel autoplay after 6.5 seconds, and stable full metric values.

### 5. Lighthouse accessibility findings

The first Lighthouse run scored `0.93` on EN/ZH/DE homepages and identified the same three failures:

- `aria-prohibited-attr`: `aria-label` on generic count-up spans;
- `label-content-name-mismatch`: logo link accessible name omitted visible `PACKAGING` text;
- `target-size`: 10px-high carousel dot buttons.

Fixes:

- count-up metrics now expose stable `sr-only` text and keep animated text `aria-hidden`;
- the logo link accessible name contains the visible brand lockup plus localized Home label;
- carousel dots retain their visual size inside 24×24px button hit targets.

Final Lighthouse results:

| Page | Accessibility | Failed binary audits |
|---|---:|---:|
| `/` | 1.00 | 0 |
| `/zh` | 1.00 | 0 |
| `/de` | 1.00 | 0 |
| `/es` | 1.00 | 0 |
| `/products/eu-standard-solid-wood-pallet` | 1.00 | 0 |
| `/zh/contact` | 1.00 | 0 |

On this Windows host, some Lighthouse CLI invocations returned `EPERM` only while deleting their temporary Chrome profile after the report had been written. Every JSON report was successfully parsed, contained a complete accessibility category, and produced the results above. Runs without the cleanup race exited normally.

## Commands and fresh results

### Required local gates

| Command | Result |
|---|---|
| `node --test tests/*.test.mjs` | PASS — 60 tests, 60 pass, 0 fail/skipped/todo |
| `pnpm exec tsc --noEmit` | PASS — exit 0 |
| `pnpm lint` | PASS — exit 0, no warnings/errors after temporary verification scripts were removed |
| `pnpm build` | PASS — exit 0; 34 static pages generated; no root/middleware warnings |
| `git diff --check` | PASS — exit 0 (Git only printed expected Windows LF→CRLF advisory messages) |

### Prohibited content scan

Scanned `app`, `components`, `lib`, and `public` textual files using a case-insensitive EN/ZH/DE/ES expression covering:

`warranty`, `warranties`, `guarantee`, `guaranteed`, `质保`, `保修`, `质量保证`, `garantía(s)`, `garantizado/a`, `Garantie`, `garantiert`, `garantieren`, `Gewährleistung`, and `gewähr`.

Result: `NO_PROHIBITED_TERMS_IN_SOURCE_OR_STATIC_TEXT`.

The product/factory screenshots and source imagery were also visually reviewed; no prohibited service promise was observed.

## Browser verification

Server: fresh `pnpm build` followed by `pnpm start --hostname 127.0.0.1 --port 3100`.

Browser: real Chromium through Playwright CLI, headed mode.

Viewports:

- desktop: `1440 × 1000`;
- mobile: `390 × 844`.

### Page matrix

The final matrix performed 112 page/viewport inspections:

- locales: EN `/`, ZH `/zh`, DE `/de`, ES `/es`;
- static/list pages: home, products, news, contact, about, custom packaging, industries;
- detail pages: all seven locally rendered fallback product slugs;
- both desktop and mobile viewports.

Every inspection required:

- HTTP 200;
- exactly one H1;
- expected document `lang`;
- visible `main` and footer landmarks;
- document scroll width no larger than viewport width;
- no captured browser console or page errors.

The local environment intentionally has no Supabase runtime variables. Therefore news lists render their designed empty state and no local news detail slug exists. Published news detail verification remains an online/controller check.

### Hero

- Both approved images render as a sharp complete-image `object-contain` foreground over an independently blurred fill.
- Foreground computed transform is `none`; only the blurred background is scaled/animated.
- Slide 1→2 automatic switch occurs after the specified six-second interval.
- Manual Pause keeps the active slide unchanged for 6.5 seconds.
- Next and Previous controls switch and restore the expected slide.
- Dot controls and accessible labels are localized.
- Reduced motion disables autoplay and the Play control, avoids hydration errors, and keeps the active slide stable for 6.5 seconds.
- Manual screenshot review confirmed readable foreground text/control contrast over both slides.

### Language switching, wrapping, forms, and shared chrome

- On `/products/eu-standard-solid-wood-pallet`, the switch sequence EN→ZH→DE→ES→EN preserved the complete nested path each time.
- German desktop and mobile pages show natural wrapping and no global horizontal overflow.
- Empty submission on each localized contact page produced three localized validation alerts (`name`, `email`, `message`), set the correct fields `aria-invalid`, and did not enter a busy/submitting state.
- No real inquiry was sent.
- Header navigation, mobile menu availability, footer navigation/contact content, product/news lists, product details, and localized empty news states were present in the matrix.

## Local SEO and route evidence

### robots and sitemap

- `/robots.txt`: HTTP 200.
- Confirmed `Disallow: /admin`, `Disallow: /api`, `Disallow: /en`.
- Confirmed formal sitemap declaration: `https://kinggoodpackaging.com/sitemap.xml`.
- `/sitemap.xml`: HTTP 200 and valid XML.
- Local sitemap contained 28 URLs (seven static routes × four locales); every URL mapped to the local Production server returned HTTP 200 and every `<loc>` used `https://kinggoodpackaging.com`.
- Product/article sitemap queries deliberately return a strict empty active set without Supabase configuration; the seven local fallback products are not incorrectly inserted into the formal dynamic sitemap.

### rendered metadata

For representative EN/ZH/DE/ES homepages and localized product details, browser-rendered HTML confirmed:

- localized unique title and description;
- formal HTTPS canonical;
- reciprocal `en`, `zh`, `de`, `es`, and `x-default` alternates;
- Open Graph title, description, type, URL, and absolute HTTPS image;
- Twitter card, title, description, and absolute HTTPS image;
- correct `<html lang>`;
- valid JSON-LD parsing;
- `Organization` on shared documents;
- `Product` and `BreadcrumbList` within product-detail `@graph`.

NewsArticle JSON-LD and published-article fallback behavior are covered by unit tests, but must be verified against actual online Supabase articles.

### admin and duplicate-English routes

- local `/admin/login`: HTTP 200;
- local unauthenticated `/admin`: HTTP 307 to `/admin/login`;
- `/en/products`: HTTP 307/308 to the unprefixed English route;
- authenticated pass-through behavior is covered by the real `NextRequest` proxy regression test.

## Screenshots

All screenshots were captured from the fresh local Production build and are committed with the fix:

- `task-6-artifacts/hero-en-desktop-slide-1.png`
- `task-6-artifacts/hero-en-desktop-slide-2.png`
- `task-6-artifacts/hero-de-mobile.png`
- `task-6-artifacts/contact-zh-mobile.png`

Manual review: both desktop Hero slides have complete foreground imagery and readable overlays; German mobile content wraps without clipping; the Chinese contact/footer theme remains readable. The full-page contact capture was taken before scrolling each below-fold Reveal into view, so below-fold form content can appear transparent in that static capture; the interactive form was separately scrolled, clicked, and validated successfully by Playwright.

## Intentional article fallback

- German and Spanish article presentation intentionally falls back to English field-by-field when no localized database field exists.
- Localized JSONB fields are used when present.
- The UI exposes the localized English-content fallback notice.
- Unit tests cover available localized fields, partial fallback, malformed JSONB, and German/Spanish fallback marking.

## Remaining controller-only external checks

These steps were deliberately not performed locally and are required before delivery completion:

1. **Push/deploy**
   - Review and push the final branch HEAD (including this report commit) with the company `luqite-ux` credential.
   - Confirm the resulting Vercel Production deployment is `READY` and its Git SHA exactly matches the pushed HEAD.

2. **Formal domain, production robots, and full live sitemap**
   - Fetch `https://kinggoodpackaging.com/robots.txt` and `https://kinggoodpackaging.com/sitemap.xml`.
   - Require HTTP 200 and valid content.
   - Request every live sitemap URL and require HTTP 200.
   - Confirm the live URL count includes every active Supabase product and every published article in all four locales, with database-backed `lastModified` values and no drafts/inactive records.
   - Reparse representative live EN/ZH/DE/ES HTML for title, description, canonical, reciprocal hreflang, `x-default`, OG, Twitter, `lang`, and JSON-LD.
   - Explicitly verify every live product and news detail page, including `Product`, `NewsArticle`, and `BreadcrumbList` data.

3. **Supabase prohibited-term scan**
   - Read the production tenant UUID from the deployment configuration; do not infer it.
   - Run tenant-scoped checks over complete rows (including JSONB), for example:

```sql
select 'products' as source, id::text
from products
where tenant_id = '<exact tenant uuid>'
  and to_jsonb(products)::text ~* '(warrant(y|ies)?|guarantee(d)?|质保|保修|质量保证|garant(i|í)a(s)?|garantizad[oa]s?|garantie|garantiert|garantieren|gewährleistung|gewähr)'
union all
select 'product_categories', id::text
from product_categories
where tenant_id = '<exact tenant uuid>'
  and to_jsonb(product_categories)::text ~* '(warrant(y|ies)?|guarantee(d)?|质保|保修|质量保证|garant(i|í)a(s)?|garantizad[oa]s?|garantie|garantiert|garantieren|gewährleistung|gewähr)'
union all
select 'articles', id::text
from articles
where tenant_id = '<exact tenant uuid>'
  and to_jsonb(articles)::text ~* '(warrant(y|ies)?|guarantee(d)?|质保|保修|质量保证|garant(i|í)a(s)?|garantizad[oa]s?|garantie|garantiert|garantieren|gewährleistung|gewähr)'
union all
select 'tenants', id::text
from tenants
where id = '<exact tenant uuid>'
  and to_jsonb(tenants)::text ~* '(warrant(y|ies)?|guarantee(d)?|质保|保修|质量保证|garant(i|í)a(s)?|garantizad[oa]s?|garantie|garantiert|garantieren|gewährleistung|gewähr)';
```

   - Require zero rows.
   - Download every live sitemap HTML response and scan decoded visible text/metadata/JSON-LD with the same expression. Manually review meaningful text embedded in published images.

4. **Real admin login**
   - Log in at `https://kinggoodpackaging.com/admin/login` with the actual delivered account.
   - Confirm `hq_admin_session` and `hq_tenant_id` cookies are set and scoped correctly.
   - Confirm authenticated `/admin` returns HTTP 200 through the production rewrite and shows only this tenant.

5. **Real localized inquiry**
   - Submit exactly one approved test inquiry from a localized production contact page.
   - Confirm the UI submitting/success state and form reset.
   - Confirm the inserted Supabase row uses the exact tenant UUID and is visible in the customer backend.
   - Remove the test row only if the established delivery procedure permits it.

6. **Feishu A–L update/readback**
   - Preserve the fixed A–L column semantics.
   - Add multilingual status only to an existing compatible project/status note field; do not overwrite A–L with language notes.
   - API-read the customer row after updating and reconfirm all 12 columns, valid D/E/F/I links, separate J/K account/password fields, and `Supabase / <tenant_id>` in L.

## Concerns and limitations

- Local runtime intentionally lacked Supabase credentials, so the formal local sitemap contained only its 28 static localized URLs. Product and published-news sitemap population can only be validated against the configured production tenant.
- No local news detail existed for browser inspection; online published articles and their intended fallback notices remain mandatory controller checks.
- Lighthouse accessibility was intentionally limited to the requested accessibility category; it did not constitute a performance/best-practices audit. Next development mode emitted a non-blocking LCP hint for an external product image even though the above-fold image already has the existing priority behavior; this did not affect accessibility or production build success.
- The production admin rewrite destination was not configured locally, so local verification proves login availability, unauthenticated redirect behavior, and unit-level authenticated pass-through—not the external backend proxy response.
- No external state changed during this task.
