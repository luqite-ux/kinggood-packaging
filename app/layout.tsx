import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
    siteName: 'KINGGOOD Packaging',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0d4077',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-background ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
