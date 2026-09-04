import { Inter } from 'next/font/google'
import type { Locale } from '@/lib/i18n/config'
import { company } from '@/lib/site'
import { localizedStructuredData, serializeJsonLd } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export function SiteDocument({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: Locale
}) {
  const organization = localizedStructuredData(locale, {
    kind: 'organization',
    name: company.legalName,
    alternateName: company.brand,
    logo: '/kinggood-logo.png',
    image: '/factory-exterior.png',
    foundingDate: company.founded,
    email: company.email,
    telephone: company.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: 'Nantong',
      addressRegion: 'Jiangsu',
      addressCountry: 'CN',
    },
  })

  return (
    <html lang={locale} className={`bg-background ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organization) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
          <script
            async
            src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
          />
        )}
      </body>
    </html>
  )
}
