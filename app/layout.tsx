import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { company } from '@/lib/site'
import { absoluteUrl, serializeJsonLd, SITE_URL } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kinggood-packaging.vercel.app'),
  title: {
    default: 'KINGGOOD | Engineered Wood Packaging for Global Logistics',
    template: '%s | KINGGOOD Packaging',
  },
  description:
    'Kinggood Packaging Materials (Nantong) Co., Ltd. — manufacturer of wooden pallets, heavy-duty wood crates and cable reels for international transportation, warehousing and export logistics. 36,300 m² facility, Nantong, Jiangsu, China.',
  keywords: [
    'wooden pallets',
    'EU pallet manufacturer',
    'ISO pallet',
    'wood crates',
    'plywood crate',
    'cable reels',
    'export packaging',
    'KINGGOOD',
    'China wood packaging',
    'industrial packaging',
  ],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'KINGGOOD | Engineered Wood Packaging for Global Logistics',
    description:
      'Wooden pallets, heavy-duty wood crates and cable reels for global logistics. 36,300 m² manufacturing facility in Nantong, Jiangsu.',
    type: 'website',
    url: '/',
    siteName: 'KINGGOOD Packaging',
    images: [{ url: '/factory-exterior.png', alt: 'KINGGOOD Packaging manufacturing facility' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KINGGOOD | Engineered Wood Packaging for Global Logistics',
    description: 'Wooden pallets, heavy-duty wood crates and cable reels for global logistics.',
    images: ['/factory-exterior.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0d4077',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.brand,
    url: SITE_URL,
    logo: absoluteUrl('/kinggood-logo.png'),
    image: absoluteUrl('/factory-exterior.png'),
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
  }
  return (
    <html lang="en" className={`bg-background ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organization) }} />
        {children}
      </body>
    </html>
  )
}
