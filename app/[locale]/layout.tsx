import { notFound, permanentRedirect } from 'next/navigation'
import '../globals.css'
import { SiteDocument } from '@/app/_components/site-document'
import { siteMetadata } from '@/app/_components/site-metadata'
import { defaultLocale, isLocale, locales } from '@/lib/i18n/config'
import { siteViewport } from '@/lib/seo'

export const metadata = siteMetadata
export const viewport = siteViewport

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }))
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === defaultLocale) permanentRedirect('/')
  return <SiteDocument locale={locale}>{children}</SiteDocument>
}
