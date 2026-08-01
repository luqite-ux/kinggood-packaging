import { notFound, permanentRedirect } from 'next/navigation'
import { AboutPageBody } from '@/components/localized/about-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/about')

  return <AboutPageBody locale={locale} dictionary={await getDictionary(locale)} />
}
