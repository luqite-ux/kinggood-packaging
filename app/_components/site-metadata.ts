import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KINGGOOD Packaging',
    template: '%s | KINGGOOD Packaging',
  },
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
}
