import '../globals.css'
import { defaultLocale } from '@/lib/i18n/config'
import { SiteDocument } from '@/app/_components/site-document'
import { siteMetadata } from '@/app/_components/site-metadata'
import { siteViewport } from '@/lib/seo'

export const metadata = siteMetadata
export const viewport = siteViewport

export default function DefaultRootLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale={defaultLocale}>{children}</SiteDocument>
}
