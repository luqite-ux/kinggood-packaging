import { notFound, permanentRedirect } from 'next/navigation'
import { CustomPackagingPageBody } from '@/components/localized/custom-packaging-page'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

export default async function LocalizedCustomPackagingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  if (locale === 'en') permanentRedirect('/custom-packaging')

  return (
    <CustomPackagingPageBody locale={locale} dictionary={await getDictionary(locale)} />
  )
}
