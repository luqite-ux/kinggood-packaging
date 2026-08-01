import type { Metadata } from 'next'
import { ContactPageBody } from '@/components/localized/contact-page'
import { loadDefaultProductPageData } from '@/lib/default-product-page-data'
import { defaultLocale } from '@/lib/i18n/config'
import { localizedMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = localizedMetadata('/contact', defaultLocale, {
  title: 'Contact',
  description:
    'Get in touch with KINGGOOD for export wooden pallets and wood crates. Request a quote by phone, email or enquiry form.',
  image: '/factory-exterior.png',
  imageAlt: 'KINGGOOD Packaging manufacturing facility',
})

export default async function ContactPage() {
  const { dictionary, products } = await loadDefaultProductPageData()
  return <ContactPageBody locale={defaultLocale} dictionary={dictionary} products={products} />
}
