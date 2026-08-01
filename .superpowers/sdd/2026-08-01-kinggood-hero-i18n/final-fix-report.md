# KINGGOOD multilingual final-fix report

Date: 2026-08-01 (Asia/Shanghai)

Worktree: `D:\Cursor\Grand\kinggood-packaging\.worktrees\codex-kinggood-hero-i18n`

Branch: `codex/kinggood-hero-i18n`

Base reviewed: `06c7ffb`

Implementation commit: `148802165ef65886416f4d5b9fe1d0a2fa12b38d` (`fix: close multilingual final review gaps`)

## Outcome

All final-review findings were fixed in one local implementation wave. The implementation was not pushed, deployed, or merged, and no external database, production login, inquiry, Vercel, or Feishu state was changed.

Fresh final verification passed with 72/72 Node tests, standalone TypeScript, ESLint, Next.js Production build, the approved multilingual prohibited-term scan, and both staged and unstaged diff checks. An independent read-only reviewer found no Critical, Important, or verified Minor issues and returned a READY verdict.

## Findings to fixes

### 1. Customer-domain admin login posted off-origin

Root cause: `app/(default)/admin/login/page.tsx` derived the form action from `NEXT_PUBLIC_ADMIN_URL`, so configured deployments posted credentials to the shared admin origin and received cookies scoped to that origin.

Fix:

- Added the tested same-origin form contract in `lib/admin-login.ts`.
- The login page now consumes `{ action: '/api/auth/login', method: 'post' }` and no longer reads `NEXT_PUBLIC_ADMIN_URL`.
- `NEXT_PUBLIC_ADMIN_URL` remains limited to the existing `next.config.mjs` admin rewrites.

Regression: `tests/admin-login.test.mjs` resolves the form destination from the formal customer-domain login URL while an upstream admin URL exists and requires the resulting origin to remain `https://kinggoodpackaging.com`.

### 2. Global administrator lookup could cross tenant boundaries

Root cause: the service-role query filtered only by email, then assigned the KINGGOOD tenant cookie after password verification.

Fix:

- The handler resolves and trims `NEXT_PUBLIC_TENANT_ID` before creating or querying the Supabase client.
- The `admin_users` query filters by both normalized email and exact `tenant_id`.
- The selected row includes `tenant_id`, which is defensively compared again before password acceptance.
- Existing cookie names remain unchanged: `hq_admin_session` and `hq_tenant_id`.
- The service-role client remains reachable only from the server Route Handler dependency; no key or privileged client crosses a client boundary.

Regression: a fluent in-memory Supabase fixture contains a valid active administrator from another tenant with a real bcrypt hash. The test requires invalid credentials and zero session inserts. A separate test requires zero administrator queries when the tenant configuration is missing.

### 3. Session persistence failures still issued cookies

Root cause: the Route Handler awaited `admin_user_sessions.insert()` but ignored its returned Supabase error and always constructed success cookies.

Fix:

- `authenticateTenantAdmin()` checks the insert response's `error` field.
- Session credentials are returned only after persistence succeeds.
- Returned or thrown persistence failures map to a generic same-origin login failure.
- `NextResponse` cookies are constructed only from the success branch.

Regression: one test requires the authentication result to contain no token after a returned insert error; a response-level test requires HTTP 303 back to `/admin/login`, the generic error, and no `Set-Cookie` header.

### 4. Hero hover and focus shared one state at the carousel sibling

Root cause: pointer and focus handlers lived on the absolutely positioned carousel layer and wrote one shared boolean. A pointer leave could resume autoplay while focus remained, and CTA focus outside that sibling was not covered.

Fix:

- Added a typed production reducer with independent `pointerInside` and `focusWithin` state.
- Moved pointer and focus handlers to the enclosing Hero `<section>`, which contains both carousel controls and both Hero CTAs.
- Autoplay receives the logical OR of the two interaction states, in addition to manual pause, document visibility, and reduced motion.
- Focus transitions within the Hero remain paused; only focus leaving the enclosing section clears the focus state.
- Removed the English-only `aria-roledescription`; the localized region label remains.

Regression: Hero tests prove CTA-style focus pauses without pointer presence and that leaving either pointer or focus alone cannot resume autoplay while the other state remains active.

### 5. Default English product-backed pages used static component defaults

Root cause: English home, contact, and industries adapters loaded only the dictionary, while localized adapters loaded active Supabase products.

Fix:

- Added `loadDefaultProductPageData()` to load the English dictionary and `fetchProductsData(defaultLocale)` concurrently.
- `/`, `/contact`, and `/industries` now pass the returned products into their shared page bodies.
- All three adapters declare the literal `export const revalidate = 60` required by Next.js route-segment static analysis.

Regression: a sentinel product loader proves the default locale is passed to both loaders and that the exact database product array reaches the returned page data. The Production build reports `Revalidate 1m` for all three English routes.

### 6. A successful zero-active-product result republished fallback products

Root cause: `fetchProductsData()` treated `data.length === 0` like a query failure.

Fix:

- `resolveProductRows()` uses fallback data only for a missing result caused by configuration/query failure.
- A successful `[]` stays `[]`, so list pages are empty and product detail lookup returns `null` when every product is inactive.
- The existing strict Sitemap behavior remains consistent and also preserves a successful empty set.

Regression: the product data test requires `resolveProductRows([], null)` to return `[]` and still permits fallback on an actual query error. Existing localized Sitemap tests remain green.

### 7. Database article HTML reached `dangerouslySetInnerHTML` unsanitized

Root cause: both legacy article fields and localized JSONB content were mapped verbatim.

Fix:

- Added server-side `sanitize-html` `2.17.5` plus community TypeScript definitions `2.16.1`; `package.json` and `pnpm-lock.yaml` were updated together.
- The strict allowlist permits only article rich-text structure: `h2`-`h4`, paragraphs, lists, emphasis, blockquotes, links, images, figures, line rules/breaks, and code blocks.
- Only limited link and image attributes survive. URL schemes are restricted; protocol-relative URLs, event handlers, inline styles, scripts, frames, and other executable markup are removed.
- New-window links receive `rel="noopener noreferrer"`.
- `mapArticleRow()` sanitizes legacy, English, Chinese, German, and Spanish content before an `Article` leaves the server data layer. Sanitized-empty localized values continue through the existing English fallback policy.

Regression: malicious fixtures require removal of script blocks, `on*` handlers, inline styles, embedded frames, and executable URLs while preserving permitted headings, paragraphs, ordered/unordered lists, safe links, and safe images. A second test proves both legacy and localized database fields are sanitized.

### 8. Production builds ignored TypeScript errors

Root cause: `next.config.mjs` set `typescript.ignoreBuildErrors: true`.

Fix: removed the override entirely.

Regression: `tests/next-config.test.mjs` requires the effective config not to suppress TypeScript errors. The final Production build visibly ran and completed its TypeScript phase.

## TDD and focused regression evidence

Each behavior test was written and observed failing before its production fix:

| Focused command | Red reason | Final result |
|---|---|---|
| `node --test tests/admin-login.test.mjs` | login helper/handler absent | PASS — 5/5 |
| `node --test tests/hero-carousel.test.mjs tests/hero-motion.test.mjs` | interaction reducer exports absent | PASS — 10/10 |
| `node --test tests/default-product-page-data.test.mjs` | default server data loader absent | PASS — 1/1 |
| `node --test tests/product-sitemap.test.mjs` | successful-empty resolver absent | PASS — 4/4 |
| `node --test tests/article-html.test.mjs tests/i18n.test.mjs` | sanitizer absent, then server wiring incomplete | PASS — 26/26 |
| `node --test tests/next-config.test.mjs` | `ignoreBuildErrors` was `true` | PASS — 1/1 |

The initial auth response-level expectation was corrected to parse the redirect URL rather than requiring one equivalent space-encoding representation. This was a test expectation correction; the asserted origin, path, decoded message, status, and cookie absence remained unchanged.

## Fresh final verification

The following commands were rerun after the final whitespace-only correction and before the implementation commit:

| Command | Result |
|---|---|
| `node --test tests/*.test.mjs` | PASS — 72 tests, 72 pass, 0 fail/cancelled/skipped/todo |
| `pnpm exec tsc --noEmit` | PASS — exit 0 |
| `pnpm lint` | PASS — exit 0, no warnings/errors |
| `pnpm build` | PASS — Next.js 16.2.6/Turbopack; compiled, TypeScript passed, 34/34 static pages generated |
| approved EN/ZH/DE/ES prohibited-term scan across `app`, `components`, `lib`, and `public` | PASS — zero matches |
| `git diff --check` and `git diff --cached --check` | PASS — exit 0 |

Production build route evidence:

- `/`, `/contact`, and `/industries` each report `Revalidate 1m`.
- Existing localized home/contact/industries routes retain `Revalidate 1m`.
- `/api/auth/login` remains a dynamic Route Handler.
- Product/news detail routes, robots, Sitemap, duplicate-English redirect, and Proxy continue to build.

## Scope and staging audit

- The worktree began clean.
- Exactly 22 implementation/test/dependency files were staged by explicit path; no broad `git add .` or `git add -A` was used.
- The first cached diff check identified only four extra EOF blank lines in newly created files. Those lines were removed, the four exact files were restaged, and the entire final verification set was rerun.
- The implementation commit contains 754 insertions and 58 deletions across the intended final-fix files only.
- This report is intentionally separated from the implementation commit so it can record the immutable implementation SHA.

## Self-review

Security:

- Tenant resolution precedes every privileged administrator query.
- Both the lookup filter and the returned row enforce the exact tenant.
- No success token escapes a failed session insert, and cookie creation is unreachable on every failure branch.
- Cookie names and secure/httpOnly/sameSite/path/expiry behavior remain compatible with the existing proxy.
- Article markup is constrained by tag, attribute, target, and protocol policy before the server returns it.

Next.js and React:

- English database reads remain in server page adapters with 60-second ISR.
- Independent reads use `Promise.all` rather than a waterfall.
- The sanitizer and privileged Supabase client remain in Node/server modules; no non-serializable values cross into client components.
- Hero interaction state is derived during render from two independent reducer fields; no effect is used to mirror derived state.
- Existing locale metadata, canonical/hreflang, JSON-LD, robots, Sitemap, and runtime-translation behavior were not altered. Their existing tests are included in the 72-test run.

Test quality:

- Cross-tenant failure is observable from a fixture that honors every query filter; removing the tenant filter would make the test accept the other tenant row.
- Session persistence is tested at the final HTTP response boundary, not only through a mock call count.
- Sanitizer expectations are hand-derived from malicious and allowed HTML fixtures.
- Successful-empty product behavior is tested independently from strict Sitemap behavior.
- Reducer tests cover the combined pointer/focus state mutation that caused the Hero bug.

Independent review:

- A separate read-only reviewer inspected the complete tracked and untracked diff against this final-fix brief.
- Verdict: no Critical issues, no Important issues, no verified Minor issues; READY.

## Concerns and external boundaries

- No push was performed, as required.
- No production deployment, formal-domain browser run, real administrator credential, Supabase mutation, real inquiry, or Feishu write/readback was performed in this local final-fix wave.
- Local tests use controlled tenant fixtures; the actual production tenant and session schema must still be exercised by the controller's approved production login check after deployment.
- The final build verifies server bundling of the pinned sanitizer dependency. Production dependency updates should continue through the repository's normal reviewed update process.
- No unresolved local code concern remains after the full verification and independent review.
